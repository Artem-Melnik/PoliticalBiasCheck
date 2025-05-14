document.getElementById("grabText").addEventListener("click", () => {
    alert("text");
    chrome.runtime.sendMessage({ action: "grabText" });
});
