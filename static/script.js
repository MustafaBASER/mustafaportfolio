function showMessage() {
    alert("Welcome to my portfolio! Feel free to explore my CV.");
}

// AI Chatbot
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatLog = document.getElementById("chat-log");

if (chatForm) {
    chatForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const message = chatInput.value.trim();

        if (!message) return;

        // Display user's message
        const userMessage = document.createElement("p");
        userMessage.textContent = "You: " + message;
        chatLog.appendChild(userMessage);

        chatInput.value = "";

        // Loading message
        const loadingMessage = document.createElement("p");
        loadingMessage.textContent = "AI Assistant: Thinking...";
        chatLog.appendChild(loadingMessage);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: message
                })
            });

            const data = await response.json();

            loadingMessage.textContent = response.ok
                ? "AI Assistant: " + data.reply
                : "AI Assistant: " + (data.error || "Something went wrong.");

        } catch (error) {
            loadingMessage.textContent =
                "AI Assistant: Could not connect to the server. Please try again.";
        }
    });
}