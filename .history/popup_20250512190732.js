console.log("MutationObserver:Start");

const onMutation = (mutations) => {
    // mo.disconnect();
    for (const { addedNodes } of mutations) {
        for (const node of addedNodes) {
            if (node) {
                if (node.dataset && node.dataset.testid) {
                    // console.log("node.dataset.testid=" + node.dataset.testid)
                    if (node.dataset.testid == "cellInnerDiv") {
                        const tweets = node.querySelectorAll("[data-testid='tweetText']");
                        console.log(tweets);
                    }
                }
            }
        }
    }
    // observe();
}

const observe = () => {
    mo.observe(document, {
        subtree: true,
        childList: true,
    });
}

const mo = new MutationObserver(onMutation);

observe();


document.getElementById("grabText").addEventListener("click", () => {
    alert("text");
    chrome.runtime.sendMessage({ action: "grabText" });
});
