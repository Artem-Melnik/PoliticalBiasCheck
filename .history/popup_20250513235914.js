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
        let postsLimit = null;

        //TODO: Fix getting multiple tweets without comments (determine location of tweets only, without comments)
        if (window.location.host == "x.com") {
            query = '[data-testid="tweetText"] > span';
            if (window.location.href.includes("/status/")) {
                postsLimit = 1;
            }

        } else if (window.location.host == "bsky.app") {
            query = '[data-testid="postText"], [data-testid="postThreadItem-by-nytimes.com"] > div:nth-child(2) > div > div';
            if (window.location.href.includes("/post/")) {
                postsLimit = 1;
            }
        }

        const posts = document.querySelectorAll(query);
        if (!postsLimit) {
            postsLimit = posts.length;
        }
        const texts = [];

        for (let i = 0; i < postsLimit; i++) {
            const textContent = posts[i].textContent.trim();
            if (textContent) {
                texts.push("" + (i + 1) + ": " + textContent);
            }
        }

        if (texts.length > 0) {
            alert("Tweet Texts:\n" + texts.join("\n"));
        } else {
            alert("No tweet text elements found.");
        }

    }
});