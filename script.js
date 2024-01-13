const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const chatbotToggler = document.querySelector(".chatbot-toggler");
const chatbotCloseBtn = document.querySelector(".close-btn");

let userMessage;

const inputIniHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", className);
  // let chatContent =
  //   className === "outgoing"
  //     ? `<p></p>`
  //     : ` <span class="material-symbols-outlined">Smart_toy</span><p></p>`;
  let chatContent =
  className === "outgoing"
    ? `<p>${message}</p>`
    : `<span class="material-symbols-outlined">Smart_toy</span><p>${message}</p>`;

  chatLi.innerHTML = chatContent;
  chatLi.querySelector("p").textContent = message;
  return chatLi;
};

const generateResponse = () => {
  
  const companyKeywords = [

    {keywords:["cnc machine","cncmachine"],response:"A CNC (Computer Numerical Control) machine is a computer-controlled manufacturing tool used for precision shaping, cutting, and machining of materials like metal, plastic, and wood."}, 
   
    { keywords: ["spindle repair", "spindle repairs","spindlerepair","spindlerepairs","spindle","spindles"], response: "Expert restoration of spindle assemblies, addressing wear, balancing, and ensuring peak machining equipment performance." },

    {keywords: ["ball screw", "ballscrews","ballscrew"], response: "Ball screw repair involves disassembly, cleaning, assessing damage, replacing worn parts, reassembling, and ensuring proper lubrication. Precision is crucial, and damaged components like ball bearings or nuts may need replacement. Seek professional help if unsure, as improper repair can affect performance. Regular maintenance and lubrication can extend ball screw life." },

    { keywords: ["servo motor", "servo motors", "servomotor", "servomotors"], response: "A servo motor is a rotary actuator that maintains precise control of its angular position. It uses feedback mechanisms like encoders to achieve accurate and controlled movement. Servos are widely used in robotics, automation, and various electronic devices for their precision and ability to maintain a set position." },


    {keywords:["drive repair","driverepair","driverepairs","drive repairs","driverepaired","drive repaired"],response:"For drive repair, first, identify the issue (hardware or software). For software problems, run disk checks or use repair utilities. If it's a hardware issue, consult professional services or replace faulty components. Always back up data before attempting any repairs."},

    {keywords:["cnc machine preventive maintenance","cnc preventive maintenance"],response:"Perform regular lubrication of moving parts, inspect and tighten fasteners, calibrate axes for accuracy, check electrical connections, clean debris, and monitor spindle performance. Keep a detailed maintenance log and follow the manufacturer's guidelines for preventive measures."},


    { keywords: ["product", "products"], response: "We offer spindle repair, ball screw repair, servo motors, CNC machine maintenance, retrofitting of CNC machines, and more." },

    { keywords: ["service", "services"], response: "Our services include CNC drilling and routing machine services, spindle services, collets, tool stations, servo motors and drivers, and linear guide services." },

    {keywords:["cnc"],response:"CNC is a company specializing in CNC (Computer Numerical Control) machines and related products such as spindle repair, ball screw repair, servo motors and drive repair, CNC machine preventive maintenance, CNC machine breakdown maintenance, retrofitting of CNC machines. Additionally, they provide services including CNC drilling and routing machine, spindles, collets, tool stations, servo motors and drivers, and linear guide."}, 

    {keywords:["contact us","contact details","contact"],response:"Email: m_rahane@yahoo.com, Ph No. 9810113459"},

    {keywords:["enquiry","enquiry form"],response:"Enquiry gives information, clarification, or details about Concept N Controls, Visit Enquiry form to know more.."},
    
    {keywords:["price","prices"],response:" Visit 'Our Products' to know more.."},

   
{keywords:["location"],response:" Office 1: SHREE APARTMENT, NEHRU GARDEN, LOKRUCHINAGAR, RAHATA, DIST. AHMEDNAGAR-423107;<br> Office 2:4311, STREET NO. 9, AJITNAGAR, GANDHINAGAR, DELHI-110031"},
  ];
  const userWords = userMessage.toLowerCase().split(" ").map(word => word.trim());

  
  for (const category of companyKeywords) {
    const found = category.keywords.some(keyword => {
      const keywordWords = keyword.toLowerCase().split(" ");
      return keywordWords.every(word => userWords.includes(word));
    });

    if (found) {
      return category.response;
    }
  }

  // Responses for greetings
  if (userWords.includes("hi") || userWords.includes("hello")) {
    return "Hello! How can I help you today?";
  }

  // Default response for minimal questions
return `<div class="defaultResponse">I'm sorry, I couldn't find information related to your question.<br>If you have a specific inquiry or need assistance, feel free to provide more details, and I'll do my best to help!<br><br><li><button value="Flagship product features?" onclick="data(this)">Flagship product features?</button></li><br><li><button value="Services you offer?" onclick="data(this)">Services you offer?</button></li>
<li><button value="Best contact method?" onclick="data(this)">Best contact method?</button></li></div>`;
  
};




const handleChat = () => {
  userMessage = chatInput.value.trim();
  if (!userMessage) return;
  chatInput.value = "";
  chatInput.style.height = `${inputIniHeight}px`;

  const outgoingChatLi = createChatLi(userMessage, "outgoing");
  chatbox.appendChild(outgoingChatLi);
  chatbox.scrollTo(0, chatbox.scrollHeight);

  setTimeout(() => {
    const incomingChatLi = createChatLi("Thinking...", "incoming");
    chatbox.appendChild(incomingChatLi);

    const response = generateResponse();
    // incomingChatLi.querySelector("p").textContent = response;
    incomingChatLi.querySelector("p").innerHTML= response;

    if (response === "I have added an Enquiry button below. Click it to open the enquiry form.") {
      const enquiryLi = createEnquiryButton(); // Use the new function
      chatbox.removeChild(incomingChatLi); // Remove the "Thinking..." message
      chatbox.appendChild(enquiryLi); // Append the new li containing the button
    }
    
    

    chatbox.scrollTo(0, chatbox.scrollHeight);
  }, 600);
};





chatInput.addEventListener("input", () => {
  chatInput.style.height = `${inputIniHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
    e.preventDefault();
    handleChat();
  }
});

sendChatBtn.addEventListener("click", handleChat);
chatbotCloseBtn.addEventListener("click", () =>
  document.body.classList.remove("show-chatbot")
);
chatbotToggler.addEventListener("click", () =>
  document.body.classList.toggle("show-chatbot")
);



function data(obj) {
  // Assuming chatInput is the textarea where the user types
  const chatInput = document.querySelector(".chat-input textarea");

  // Get the value attribute of the clicked link
  const linkValue = obj.getAttribute("value");

  // Append the link value to the user's input
  chatInput.value += ` ${linkValue}`;

  // Optionally, you can focus on the input after adding the link
  chatInput.focus();
}
