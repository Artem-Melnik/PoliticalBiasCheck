document.getElementById("grabText").addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "grabText" });
});
