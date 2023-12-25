import React from "react";
//mui
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
const QuestionDiv = () => {
  const questions = [
    "What do I need to create a virtual tour?",
    "I don't have a 360º camera. What do I do?",
    "What differentiates Floorfy from other platforms?",
    "What happens if a rental camera breaks?",
    "Can I create videos?",
    "Why monthly or annual subscriptions and not one-time payments?",
    "If I stop paying for the subscription, do I lose the virtual tours?",
    'What does "Active Virtual Tours" mean?',
    "Can I share virtual tours on real estate portals?",
    "Is the 3D Dollhouse included?",
    "Is the bounded floor plan included?",
    "Can I impersonate my watermark?",
    "What is the difference between an Open-House and a Video Call?",
    "What is a mp4 video commercial?",
    "How can I download an mp4 video commercial?",
  ];
  const answers = [
    "All you need is a tripod, a 360° camera, a mobile phone and our app.",
    "There are currently many 360º cameras on the market. But after trying hundreds of them, we recommend the Ricoh Theta brand. In our opinion: they are the best. That's why we became an official partner of Ricoh Theta and we include their cameras alongside our monthly subscriptions (plus free shipping and no permanent contract needed).",
    "We want to make virtual reality simple and affordable for those who look to buy and rent a property. We want them to find their dream home quickly yet successfully. Therefore, we work with thousands of estates agents and develop technologies that help them to focus on their clients, creating a personal experience for each of them through virtual tours.",
    "In case of breakage, loss or non-return, the full amount will be charged. Remember that the camera must be returned as it was delivered, inside its box with all the accessories (case, cable...), otherwise, €20 will be charged to replace them.",
    "Yes, you can automatically create videos that will simulate the experience of a virtual visit.",
    "We pride ourselves on keeping virtual tours active 24/7 and all year round in our servers. In this way you can pause your subscription at any time and we will archive your tours. However, they will be unavailable to you until you activate your account again.",
    "No, they will remain archived in your account. To activate them you must re-subscribe and activate your account again.",
    "Active tours are virtual tours that are published and visible to your clients. If you reach the limit of active tours that your subscription allows, you can extend your plan or archive a tour making another available to you.",
    "Yes, of course. Our virtual tours are compatible with our partners. You will notice a field saying ‘link to the Virtual Tour’, copy the link that we give you. If you notice that the link is not activated on the platform, write to the agent asking if they can activate it (let us know if you face any difficulties with this).",
    "It is not included. But it can be generated automatically for only 15 euros.",
    "It is not included. But it can be generated automatically for only 15 euros.",
    "Yes, the software allows you to personalise the watermark to your own logo. To change the logo, follow these steps: 1) Go to “My Profile” (from clicking your username on the top right) and click the ‘viewer’ option. 2) Upload your business logo and save it (the recommended measurements are 400x400).",
    "The Open House allows you to make a videoconference from within the virtual tour during presentations of up to 3000 participants. The video-call is a videoconference between two people where the agent and client interact during a virtual tour.",
    "An mp4 video commercial includes the videos that we retrieve from the 360º photographs, creating panoramas of different rooms in the property. Normally, agencies display this MP4 video on their web page to give a preview of the 360º virtual tour.",
    "To download the MP4 videos you need to follow these steps: 1) Enter the tour (on the pencil icon marked “editor”). 2) Then click the icon that is marked “instant videos” located on the top left. 3) Up on the right you will see an arrow pointing downwards, when you click on it the mp4 video should start downloading. If the option is available, please contact one of our agents so they can help you.",
  ];
  return questions?.map((question, index) => (
    <div id="questionDiv">
      <Accordion
        style={{
          boxShadow: `${questions.length - 1 === index && "none"} `,
        }}
      >
        <AccordionSummary
          expandIcon={<i className="fa-solid fa-angle-down"></i>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className="qaccordDiv">
            <p>{question}</p>
            {/*   <div
                className="hr"
                style={{
                  margin: "20px 0 20px 0",
                }}
              /> */}
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="qaccorddetailDiv">
            <p>{answers[index]}</p>
          </div>
        </AccordionDetails>
      </Accordion>
      {/*     <div
        className="hr"
        style={{
          margin: "20px 0 20px 0",
        }}
      /> */}
    </div>
  ));
};

export default QuestionDiv;
