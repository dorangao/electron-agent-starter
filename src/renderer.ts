import './index.css';

// Define the interface for the exposed API
interface ChatAPI {
  sendMessage: (text: string) => Promise<{ reply: string, usage: any }>;
  saveApiKey: (key: string) => Promise<boolean>;
  checkApiKey: (callback: (hasKey: boolean) => void) => void;
}

declare global {
  interface Window {
    chat: ChatAPI;
  }
}

const messageList = document.getElementById("messageList") as HTMLElement;
const userInput = document.getElementById("userInput") as HTMLInputElement;
const sendBtn = document.getElementById("sendBtn") as HTMLButtonElement;
const settingsModal = document.getElementById("settingsModal") as HTMLElement;
const apiKeyInput = document.getElementById("apiKeyInput") as HTMLInputElement;
const saveKeyBtn = document.getElementById("saveKeyBtn") as HTMLButtonElement;
const usageStats = document.getElementById("usageStats") as HTMLElement;

function addMessage(text: string, sender: "user" | "assistant") {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", sender);
  msgDiv.textContent = text;
  messageList.appendChild(msgDiv);
  messageList.scrollTop = messageList.scrollHeight;
}

// Check API key on load
window.chat.checkApiKey((hasKey: boolean) => {
  if (!hasKey) {
    settingsModal.style.display = "flex";
  }
});

// Send message logic
async function handleSend() {
  const text = userInput.value.trim();
  if (!text) return;

  addMessage(text, "user");
  userInput.value = "";

  userInput.disabled = true;
  sendBtn.disabled = true;
  sendBtn.textContent = "...";

  try {
    const result = await window.chat.sendMessage(text);
    if (result && result.reply) {
      addMessage(result.reply, "assistant");
      // Update usage stats
      if (result.usage) {
        usageStats.textContent = `Tokens (turn): ${result.usage.total} | Total Session: ${result.usage.totalSoFar}`;
      }
    }
  } catch (err: any) {
    console.error(err);
    addMessage("Error: " + (err.message || String(err)), "assistant");
  } finally {
    userInput.disabled = false;
    sendBtn.disabled = false;
    sendBtn.textContent = "Send";
    userInput.focus();
  }
}

sendBtn.addEventListener("click", handleSend);

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleSend();
});

// Save API key
saveKeyBtn.addEventListener("click", () => {
  const key = apiKeyInput.value.trim();
  if (key) {
    // Basic validation could go here
    window.chat.saveApiKey(key).then(() => {
      settingsModal.style.display = "none";
      // Optional feedback
      // alert("API Key saved!"); 
    });
  }
});
