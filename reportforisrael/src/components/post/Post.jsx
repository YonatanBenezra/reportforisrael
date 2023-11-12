import React from "react";
import ProfileImage from "./default-profile.png"; // Ensure this is the correct path to your default profile image

function Post({
  title,
  textContent,
  mediaHref,
  postLink,
  profileImage = ProfileImage,
  timestamp,
}) {
  const isVideo = mediaHref && mediaHref.endsWith(".mp4"); // Simple check for video

  return (
    <div className="bg-white border border-gray-300 rounded-lg overflow-hidden max-w-4xl mx-auto mb-10">
      <div className="flex items-center p-4">
        <img
          src={profileImage}
          alt="Profile"
          className="w-16 h-16 rounded-full mr-4"
        />
        <div className="flex flex-col">
          <a
            href={postLink}
            className="font-bold text-blue-800 hover:underline"
          >
            {title}
          </a>
          <span className="text-gray-600 text-sm">{timestamp}</span>
        </div>
      </div>
      <div className="px-4 pb-4">
        <div className="mb-4 text-lg">{textContent}</div>
        <div className="w-full h-80 overflow-hidden">
          {isVideo ? (
            <video controls className="w-full h-full object-cover">
              <source src={mediaHref} type="video/mp4" />
            </video>
          ) : (
            <img
              src={mediaHref}
              alt="Post media"
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>
      <div className="bg-blue-600 text-white text-center p-3 hover:bg-blue-700 transition duration-300">
        <a
          href={postLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          Report on Facebook
        </a>
      </div>
    </div>
  );
}

export default Post;
