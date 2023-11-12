import React from 'react';

import facebookPost from '../../assets/facebookPost.png';
import threedots from '../../assets/threedots.png';
import firstList from '../../assets/firstList.png';
import submit from '../../assets/submit.png';

function ReportPostGuide() {
    const steps = [
        {
            title: 'Step 1: Enter the post',
            text: 'Locate the post you want to report.',
            image: facebookPost,
        },
        {
            title: 'Step 2: Initiate Report',
            text: 'Click on the "..." and select "Report post".',
            image: threedots,
        },
        {
            title: 'Step 3: Choose Report Reason',
            text: 'Select the problem from the list provided.',
            image: firstList,
        },
        {
            title: 'Step 4: Confirm Report',
            text: 'Review your report and confirm by clicking "Submit".',
            image: submit,
        },
    ];

    return (
        <div className="max-w-2xl mx-auto p-5 bg-white rounded-lg shadow-lg my-10 space-y-10 divide-y divide-gray-200 font-inter">
            <h2 className="text-center text-3xl font-semibold text-gray-800 mb-8">How to Report a Post on Social Media</h2>
            {steps.map((step, index) => (
                <div key={index} className="pt-10">
                    <h3 className="text-xl text-blue-600 font-semibold mb-3">{step.title}</h3>
                    <p className="text-md text-gray-700 mb-4">{step.text}</p>
                    <img src={step.image} alt={`Screenshot for ${step.title}`} className="w-full rounded" />
                </div>
            ))}
            <p className="text-center text-lg text-green-600 font-semibold pt-10">End of guide. Thank you for helping to keep our community safe.</p>
        </div>
    );
}

export default ReportPostGuide;
