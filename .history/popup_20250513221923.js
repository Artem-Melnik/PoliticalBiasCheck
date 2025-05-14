document.addEventListener("DOMContentLoaded", () => {
    const grabTextButton = document.getElementById("grabText");

    if (!grabTextButton) {
        console.error("Button not found");
        return;
    }



    grabTextButton.addEventListener("click", async () => {
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });


            // if (tab?.url) {
            //     alert("Current URL:" + tab.url);
            //     grabTextFromPage(tab.url); // Pass the tab object
            // } else {
            //     console.warn("No active tab URL found.");
            // }

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


    function grabTextFromPage(url) {
        let query = "";

        if (window.location.href.includes("://x.com")) {
            query = '[data-testid="tweetText"] > span';

        } else if (window.location.href.includes("://bsky.app")) {
            query = '[data-testid="postText"], [data-testid="postThreadItem-by-nytimes.com"] > div:nth-child(2) > div > div';
        }

        const posts = document.querySelectorAll(query);
        const texts = [];

        for (let i = 0; i < posts.length; i++) {
            const textContent = posts[i].textContent.trim();
            if (textContent) {
                texts.push(textContent);
            }
        }

        if (texts.length > 0) {
            alert("Tweet Texts:\n" + texts + "\n");
        } else {
            alert("No tweet text elements found.");
        }

    }
});

//     grabTextButton.addEventListener("click", async () => {

//         // function grabTextFromPage() {
//         // const textElements = document.getElementsByClassName("css-1jxf684 r-bcqeeo r-1ttztb7 r-qvutc0 r-poiln3");


//         // if (tab.url.include("x.com")) {

//         const tweetContainers = document.querySelectorAll('[data-testid="tweetText"]');

//         if (tweetContainers.length === 0) {
//             alert("No tweet text elements found.");
//             return;
//         }

//         for (let i = 0; i < 10; i++) {
//             const spans = tweetContainers[i].querySelectorAll('span');

//             let texts = [];

//             for (let j = 0; j < spans.length; j++) {
//                 if (spans[j].textContent.trim()) {
//                     texts.push(spans[j].textContent.trim());
//                 }
//             }

//             if (texts.length > 0) {
//                 alert(texts.join("\n"));
//             } else {
//                 alert("No tweet text elements found.");
//             }

//             // tweetContainers.
//             //     texts.push(textElements[i].innerText);
//         }
//         // }

//         // }

//     });





// grabTextButton.addEventListener("click", async () => {
//     try {
//         const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
//         if (tab.url) {
//             document.getElementById("urlOutput").textContent = `Current URL: ${tab.url}`;
//             console.log("Current URL:", tab.url);


//         } else {
//             document.getElementById("urlOutput").textContent = "No active tab URL found.";


//             // let url = tab.url;
//             // console.log(url);

//             if (tab.url) {
//                 urlOutput.textContent = `Current URL: ${tab.url}`;
//                 console.log("Current URL:", tab.url);
//             } else {
//                 urlOutput.textContent = "No active tab URL found.";
//             }
//         }
//     } catch (error) {
//         console.error("Error getting URL:", error);
//         urlOutput.textContent = "Error: " + error.message;
//     }
// });



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
//     chrome.runtime.sendmessage({ action: "grabtext" });