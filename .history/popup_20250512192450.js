document.addEventListener("DOMContentLoaded", () => {
    const grabTextButton = document.getElementById("grabText");

    if (!grabTextButton) {
        console.error("Button not found");
        return;
    }

    grabTextButton.addEventListener("click", async () => {
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

            if (tab.id) {
                await chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    func: grabTextFromPage
                });
            }
        } catch (error) {
            console.error("Error executing script:", error);
        }
    });
});

// This function will be executed in the context of the webpage
function grabTextFromPage() {
    const textElements = document.getElementsByClassName("css-1jxf684 r-bcqeeo r-1ttztb7 r-qvutc0 r-poiln3");
    const texts = [];

    for (let i = 0; i < textElements.length; i++) {
        texts.push(textElements[i].innerText);
    }

    if (texts.length > 0) {
        alert("Texts: " + texts.join(", "));
    } else {
        alert("No text elements found.");
    }
}




// document.getElementById("grabText").addEventListener("click", () => {
//     const textElements = document.getElementsByClassName("css-1jxf684 r-bcqeeo r-1ttztb7 r-qvutc0 r-poiln3");
//     console.log('Number of text elements:', textElements.length);

//     for (let i = 0; i < textElements.length; i++) {
//         let innerText = textElements[i].innerText;
//         alert("Text: " + innerText);
//     }
// });



// console.log("MutationObserver:Start");

// const onMutation = (mutations) => {
//     // mo.disconnect();
//     for (const { addedNodes } of mutations) {
//         for (const node of addedNodes) {
//             if (node) {
//                 if (node.dataset && node.dataset.testid) {
//                     // console.log("node.dataset.testid=" + node.dataset.testid)
//                     if (node.dataset.testid == "cellInnerDiv") {
//                         const tweets = node.querySelectorAll("[data-testid='tweetText']");
//                         console.log(tweets);
//                     }
//                 }
//             }
//         }
//     }
//     // observe();
// }

// const observe = () => {
//     mo.observe(document, {
//         subtree: true,
//         childList: true,
//     });
// }

// const mo = new MutationObserver(onMutation);

// observe();


// document.getElementById("grabText").addEventListener("click", () => {
//     alert("text");
//     chrome.runtime.sendMessage({ action: "grabText" });
// });
