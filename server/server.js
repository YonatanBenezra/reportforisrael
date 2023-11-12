const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Post = require("./models/post");
const PORT = 3001;
const cors = require("cors");

// Enable All CORS Requests for development
app.use(cors());

// For later use--
// app.use(cors({
//   origin: 'http://localhost:5173' // or the domain from which you expect to make requests
// }));

let browser;
let page;

mongoose
  .connect(
    "mongodb+srv://yonatanbenezra1:ThisisReportForIsrael@cluster0.tiigzpp.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

async function startBrowser() {
  browser = await puppeteer.launch({ headless: "new" });
  const context = browser.defaultBrowserContext();
  context.overridePermissions("https://www.facebook.com", [
    "geolocation",
    "notifications",
  ]);
  page = await browser.newPage();
  await page.goto("https://www.facebook.com/<PAGE_NAME>");
  await page.setViewport({ width: 1200, height: 800 });
}

async function loginToFacebook() {
  await page.type("#email", "kailinjaner@gmail.com");
  await page.type("#pass", "Dimoy2023");
  await page.click("#loginbutton");
  await page.waitForNavigation();
}

async function scrollToBottom() {
  try {
    await page.waitForSelector('div[role="article"]'); // Wait for at least one post to load
    let lastHeight = await page.evaluate("document.body.scrollHeight");
    while (true) {
      await page.evaluate("window.scrollTo(0, document.body.scrollHeight)");
      await page.waitForTimeout(2000); // Wait for 2 seconds
      let newHeight = await page.evaluate(
        "document.body ? document.body.scrollHeight : 0"
      );
      if (newHeight === lastHeight) {
        break; // No new content, exit loop
      }
      lastHeight = newHeight;
    }
  } catch (error) {
    console.error("Error in scrollToBottom:", error);
    throw error; // Rethrow the error for handling in savePosts
  }
}
async function scrapePosts() {
  const content = await page.content();
  const $ = cheerio.load(content);
  const posts = [];

  $('div[role="article"]').each((index, element) => {
    // Find the account name
    let title = $(element).find("h3 > span > span a").first().text().trim();
    if (!title) {
      // Fallback to another possible structure
      title = $(element).find("h3 a").first().text().trim();
    }

    const textContent = $(element)
      .find('[data-ad-preview="message"]')
      .first()
      .text()
      .trim();

    // Extract the media URL
    let mediaHref;
    if ($(element).find("img").length > 0) {
      mediaHref = $(element).find("img").first().attr("src");
    } else if ($(element).find("video").length > 0) {
      mediaHref = $(element).find("video").first().attr("src");
    }

    // Extract the post's direct link (usually associated with the timestamp)
    const postLink = $(element)
      .find('a[role="link"][href*="/posts/"], a[role="link"][href*="/photos/"]')
      .first()
      .attr("href");
    const fullPostLink = postLink ? postLink : null;

    if (title) {
      posts.push({
        title,
        textContent,
        mediaHref,
        postLink: fullPostLink,
      });
    }
  });
  for (const post of posts) {
    try {
      const newPost = new Post(post);
      await newPost.save();
    } catch (error) {
      if (error.code === 11000) {
        // Duplicate key error
        console.log("Duplicate post skipped:", post.postLink);
      } else {
        throw error; // Rethrow the error if it's not a duplicate key error
      }
    }
  }

  return posts;
}
async function savePosts(keyword) {
  try {
    await startBrowser();
    await loginToFacebook();
    await page.goto(`https://www.facebook.com/search/top?q=${keyword}`, {
      waitUntil: "networkidle2", // Wait for network to be idle
    });
    await scrollToBottom();
    await scrapePosts();
    console.log("Data scraping and insertion completed.");
  } catch (error) {
    console.error("An error occurred in savePosts:", error);
    return []; // Return empty array or handle the error as needed
  } finally {
    await browser.close();
  }
}

app.get("/", async (req, res) => {
  res.json("hello");
});
// server.js
app.get("/api/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).send("Error fetching posts");
  }
});

app.get("/api/saveposts/:keyword", async (req, res) => {
  const posts = await savePosts(req.params.keyword);
  res.json(posts);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
