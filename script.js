const chatInput = document.querySelector(".chat-input textarea");
const sendChatbtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox")

let API_KEY = "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";
let userMessage;

const generateResponse = () => {
    const API_URL = "https://api.openai.com/v1/chat/completions";

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: userMessage}],
        })
    }

    fetch(API_URL,requestOptions).then(res => res.json()).then(data => {
        console.log(data);
    }).catch((error) => {
        console.log(error)
    })
}



const createChatli = (message, className) => {
    const chatli = document.createElement("li");
    chatli.classList.add('chat',className);
    let chatcontent = className === 'outgoing' ? `<p>${message}</p>` : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
    chatli.innerHTML = chatcontent;
    return chatli;
}

function handleChat() {
    userMessage = chatInput.value.trim();
    if(!userMessage) return;
    chatbox.appendChild(createChatli(userMessage,"outgoing"));

    setTimeout(function() {
        const str = "Thinking...";
        chatbox.appendChild(createChatli(str,"incoming"));
        generateResponse();
    },600)
}

sendChatbtn.addEventListener('click',handleChat);