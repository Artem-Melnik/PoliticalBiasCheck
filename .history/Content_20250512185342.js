let bobRossImages = [
    "https://bit.ly/3Ck6DTU",
    "https://bit.ly/3ozQCVk",
    "https://bit.ly/3omYDN6",
    "https://bit.ly/3osrfoi",
    "https://bit.ly/3qCPjax",
    "https://bit.ly/3CkRXE6",
];


function changeImages() {
    const imgs = document.getElementsByTagName("img");
    const text = document.getElementsByClassName("css-1jxf684 r-bcqeeo r-1ttztb7 r-qvutc0 r-poiln3");

    console.log('test', imgs.length);
    console.log('text:', text);

    for (var i = 0; i < text.length; i++) {
        var price = priceEls[i].innerText;
        alert("Price: " + price);

        if (text) {
            console.log("Text by ID:", text.textContent);
        }

        for (image of imgs) {
            const index = Math.floor(Math.random() * bobRossImages.length);
            image.src = bobRossImages[index];
        }

    }

    setTimeout(changeImages, 10000);



// Search Labs | AI Overview
// Learn more
// To replace images on dynamic websites using a JavaScript Chrome extension, you'll need to modify the src attribute of the img tags. You can achieve this by injecting a content script into the webpage that iterates through all img tags and updates their src attribute with a new image path. This approach allows you to replace images dynamically as they load into the page, even if they are added through JavaScript.
// Here's a step-by-step guide:
// 1. Create a Chrome Extension Manifest:
// Create a manifest.json file in your project directory. This file defines the extension's metadata, including the name, version, and permissions.
// Specify the content_scripts section to inject your JavaScript file into the target websites.
// Grant the webRequest permission if you need to intercept and modify network requests (e.g., to change the image loading URL).
// 2. Create a Content Script (content.js):
// This script will be injected into the web page.
// Use JavaScript to iterate through all img tags on the page using methods like document.getElementsByTagName('img') or document.querySelectorAll('img').
// For each img tag, modify the src attribute to point to your desired image URL.
// If the website dynamically adds images, you may need to use a mutation observer to detect changes in the DOM and update the src attributes of newly added img tags.
// 3. Implement a Popup or Background Script (Optional):
// You can use a popup or background script to handle user interaction and pass data to the content script.
// For example, you could allow the user to select a replacement image from a dropdown in the popup, then send the selected image URL to the content script.
// You can use Chrome's messaging API (chrome.runtime.sendMessage) to communicate between the popup/background script and the content script.
// 4. Load the Extension in Chrome:
// Open Chrome and navigate to chrome://extensions/, Enable "Developer mode", and Click "Load unpacked" and select your extension's directory.
// Example Content Script (content.js):
// JavaScript

// function replaceImages() {
//     var imgElements = document.getElementsByTagName('img');
//     for (var i = 0; i < imgElements.length; i++) {
//         imgElements[i].src = "your_replacement_image_url"; // Replace with your desired image URL
//     }
// }

// replaceImages();

// Option to handle dynamically added images (using mutation observer)
// const observer = new MutationObserver(replaceImages);
// const targetNode = document.body;
// const config = { childList: true, subtree: true };
// observer.observe(targetNode, config);
// Key Considerations:
// Dynamic Sites:
// Websites that dynamically load images using JavaScript might require you to use a mutation observer to detect and update the src attribute of newly added img tags.
//     Permissions:
// Be mindful of the permissions you request in your manifest.Excessive permissions can raise user concerns.
// Network Interception:
// If you need to modify the images before they are loaded, you may need to use the webRequest permission and implement a network request listener.
//     Cross - Origin Issues:
// Make sure your replacement image URLs are not subject to cross - origin restrictions.
// This approach provides a foundation for replacing images on dynamic websites using a Chrome extension.You can customize the code and functionality further based on your specific needs.





// let images = [
//     "https://images.unsplash.com/photo-1480497490787-505ec076689f?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
// ];

// const imgs = document.getElementsByTagName("img");

// for (image of imgs) {
//     image.src = images[0];
// }