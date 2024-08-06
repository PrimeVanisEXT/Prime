// ==UserScript==
// @name         Prime
// @version      1.1
// @description  Vanis Multibox Client
// @match        *://vanis.io/*
// @author       Patrick
// @run-at       document-end
// ==/UserScript==

if ("?vanilla" === location.search) return;
location.pathname !== '/rise' && (location.pathname = '/rise');

(async a => {
    "use strict";

    // Function to load an external CSS file
    function loadCSS(url) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        document.head.appendChild(link);
    }

    // Function to inject custom UI
    function injectCustomUI() {
        // Custom CSS
        const style = document.createElement('style');
        style.textContent = `
            html {
                background-color: rgb(5, 5, 5);
                color: #dadada;
                font-family: 'Nunito', sans-serif;
            }
            body {
                overflow: hidden;
                padding: 0;
            }
            .loading-screen {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                background-color: #064b66;
            }
            .loading-screen .loader {
                border: 16px solid #f3f3f3;
                border-radius: 50%;
                border-top: 16px solid #3498db;
                width: 120px;
                height: 120px;
                animation: spin 2s linear infinite;
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            .hud {
                position: absolute;
                top: 10px;
                left: 10px;
                color: white;
            }
            .hud .cell-info {
                margin-bottom: 10px;
            }
            .button {
                padding: 10px 20px;
                background-color: #1cb9d4;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 16px;
            }
            .button:hover {
                background-color: #17a2b8;
            }
        `;
        document.head.appendChild(style);

        // Custom HTML
        const loadingScreen = document.createElement('div');
        loadingScreen.className = 'loading-screen';
        loadingScreen.id = 'loadingScreen';
        loadingScreen.innerHTML = '<div class="loader"></div>';
        document.body.appendChild(loadingScreen);

        const hud = document.createElement('div');
        hud.className = 'hud';
        hud.id = 'hud';
        hud.style.display = 'none';
        hud.innerHTML = `
            <div class="cell-info" id="cell1Info">Cell 1: ...</div>
            <div class="cell-info" id="cell2Info">Cell 2: ...</div>
        `;
        document.body.appendChild(hud);

        const startButton = document.createElement('button');
        startButton.className = 'button';
        startButton.id = 'startButton';
        startButton.style.display = 'none';
        startButton.textContent = 'Start Game';
        document.body.appendChild(startButton);

        // JavaScript to hide the loading screen and show the start button and HUD
        window.addEventListener('load', function() {
            document.getElementById('loadingScreen').style.display = 'none';
            document.getElementById('startButton').style.display = 'block';
            document.getElementById('hud').style.display = 'block';
        });
    }

    async function loadScripts(baseURL) {
        for (let script of ["vendor.js", "main.js"]) {
            await fetch(`${baseURL}/js/${script}?v=${Math.random()}`)
                .then(response => response.text())
                .then(text => {
                    let scriptElement = document.createElement("script");
                    scriptElement.type = "text/javascript";
                    scriptElement.textContent = text;
                    document.head.appendChild(scriptElement);
                });
        }
    }

    document.open();
    await fetch(`${a}/index.html`)
        .then(response => response.text())
        .then(text => document.write(text));
    document.close();

    await loadScripts(a);
    injectCustomUI();
})("https://raw.githubusercontent.com/PrimeVanisEXT/Prime/main");
