// ==UserScript==
// @name         STBG Controller Support Script
// @namespace    https://stb-gaming.github.io
// @version      0.1.0
// @description  A script that uses the JS Gamepad API to add controller support to Denki's online Sky Games
// @author       cobaltgit
// @run-at       document-start
// @match        https://denki.co.uk/sky/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=denki.co.uk
// @require      https://github.com/STB-Gaming/userscripts/raw/master/sky-remote.user.js
// ==/UserScript==


(function () {
	'use strict';
	const uWindow = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;

    let
        gamepads,
        start,
        buttonNumbers = [73, 75, 76, 74, 8, 13, 81, 82, 69, 87, 84]

    function mainLoop() {
        gamepads = navigator.getGamepads();
        if (!gamepads) return;

        const gamepad = gamepads[0];
        const buttons = gamepad.buttons;

        switch (true) {
            case buttons[12].pressed:
                SkyRemote.pressButton("up"); // d-pad up
                break;
            case buttons[13].pressed:
                SkyRemote.pressButton("down"); // d-pad down
                break;
            case buttons[15].pressed:
                SkyRemote.pressButton("right"); // d-pad right
                break;
            case buttons[14].pressed:
                SkyRemote.pressButton("left"); // d-pad left
                break;
            case buttons[9].pressed:
                SkyRemote.pressButton("backup"); // start (back up)
                break;
            case buttons[0].pressed:
                SkyRemote.pressButton("select"); // A (select)
                break;
            case buttons[1].pressed:
                SkyRemote.pressButton("red"); // B (red)
                break;
            case buttons[2].pressed:
                SkyRemote.pressButton("blue"); // X (blue)
                break;
            case buttons[3].pressed:
                SkyRemote.pressButton("yellow"); // Y (yellow)
                break;
            case buttons[8].pressed:
                SkyRemote.pressButton("green"); // select (green)
                break;
            case buttons[11].pressed:
                SkyRemote.pressButton("help"); // right stick down (help)
                break;
            default:
                SkyRemote.listButtons().forEach(button => SkyRemote.releaseButton(button));
        }

        start = uWindow.requestAnimationFrame(mainLoop)
    }

    uWindow.addEventListener("gamepadconnected", event => {
        mainLoop();
    });

    uWindow.addEventListener("gamepaddisconnected", event => {
        uWindow.cancelAnimationFrame(start);
    });
})();
