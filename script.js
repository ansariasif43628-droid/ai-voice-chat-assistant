const micButton = document.getElementById("micButton");
const status = document.getElementById("status");
const userText = document.getElementById("userText");
const assistantText = document.getElementById("assistantText");

const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
    status.innerText = "Speech recognition is not supported.";
} else {

    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    micButton.addEventListener("click", () => {
        recognition.start();
        status.innerText = "🎧 Listening...";
    });

    recognition.onresult = (event) => {

        const text = event.results[0][0].transcript;

        userText.innerText = text;

        assistantReply(text);
    };

    recognition.onend = () => {
        status.innerText = "Click the microphone and speak";
    };
}

function assistantReply(text) {

    let reply = "";

    if (text.toLowerCase().includes("hello")) {
        reply = "Hello! How are you?";
    }

    else if (text.toLowerCase().includes("your name")) {
        reply = "I am your AI voice assistant.";
    }

    else if (text.toLowerCase().includes("time")) {
        reply = "The current time is " + new Date().toLocaleTimeString();
    }

    else {
        reply = "I heard you say: " + text;
    }

    assistantText.innerText = reply;

    const speech = new SpeechSynthesisUtterance(reply);
    speech.lang = "en-IN";

    window.speechSynthesis.speak(speech);
}
