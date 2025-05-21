document.addEventListener("DOMContentLoaded", () => {
    const grabTextButton = document.getElementById("grabText");

    if (!grabTextButton) {
        console.error("Button not found");
        return;
    }

    grabTextButton.addEventListener("click", async () => {
        try {
            const [tab] = await chrome.tabs.query({active: true, currentWindow: true});

            if (tab.id) {
                await chrome.scripting.executeScript({
                    target: {tabId: tab.id},
                    func: grabTextFromPage
                });
            }
        } catch (error) {
            console.error("Error executing script:", error);
        }
    });


    function grabTextFromPage() {
        let apiKey = 'INSERT API KEY HERE';

        async function getGeminiSummary(text, summaryType) {
            // Truncate very long texts to avoid API limits (typically around 30K tokens)
            const maxLength = 20000;
            const truncatedText =
                text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

            let prompt;
            switch (summaryType) {
                case "brief":
                    prompt = `Provide a brief summary of the following article in 2-3 sentences:\n\n${truncatedText}`;
                    break;
                case "detailed":
                    prompt = `Provide a detailed summary of the following article, covering all main points and key details:\n\n${truncatedText}`;
                    break;
                case "bullets":
                    prompt = `Summarize the following article in 5-7 key points. Format each point as a line starting with "- " (dash followed by a space). Do not use asterisks or other bullet symbols, only use the dash. Keep each point concise and focused on a single key insight from the article:\n\n${truncatedText}`;
                    break;
                default:
                    prompt = `Summarize the following article:\n\n${truncatedText}`;
            }

            try {
                const res = await fetch(
                    //`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
                    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
                    {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({
                            contents: [
                                {
                                    parts: [{text: prompt}],
                                },
                            ],
                            generationConfig: {
                                temperature: 0.2,
                            },
                        }),
                    }
                );

                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.error?.message || "API request failed");
                }

                const data = await res.json();
                return (
                    data?.candidates?.[0]?.content?.parts?.[0]?.text ||
                    "No summary available."
                );
            } catch (error) {
                console.error("Error calling Gemini API:", error);
                throw new Error("Failed to generate summary. Please try again later.");
            }
        }

        let query = "";
        let postsLimit = null;

        //console.log("grabTextFromPage");

        //TODO: Fix getting multiple tweets without comments (determine location of tweets only, without comments)
        if (window.location.host === "x.com") {
            query = '[data-testid="tweetText"] > span';
            if (window.location.href.includes("/status/")) {
                postsLimit = 1;
            }

        } else if (window.location.host === "bsky.app") {
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
            getGeminiSummary(texts.join("\n")).then((aiSummary) => alert("Summary: \n" + aiSummary));
            //alert("Summary:\n" + (await getGeminiSummary(texts.join("\n"))));
            alert("Tweet Texts:\n" + texts.join("\n"));
        } else {
            alert("No tweet text elements found.");
        }
    }
});