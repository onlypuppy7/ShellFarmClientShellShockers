// ==UserScript==
// @name         ShellFarm V2 - Utilities for Shell Shockers.
// @description  FIXED! Some useful mods for Shell Shockers, including infinite history, FOV, Custom SFX, skyboxes and more. Bindable too.
// @author       onlypuppy7
// @namespace    https://github.com/onlypuppy7/ShellFarmClientShellShockers/
// @supportURL   https://github.com/onlypuppy7/ShellFarmClientShellShockers/issues/
// @license      GPL-3.0
// @run-at       document-start
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_listValues
// @grant        GM_info
// @grant        GM_setClipboard
// @grant        GM_openInTab
// @icon         https://github.com/onlypuppy7/ShellFarmClientShellShockers/blob/main/icon.png?raw=true

// @require      https://cdn.jsdelivr.net/npm/tweakpane@3.1.10/dist/tweakpane.min.js
// @require      https://cdn.jsdelivr.net/npm/@tweakpane/plugin-essentials@0.1.8/dist/tweakpane-plugin-essentials.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/jszip/3.7.1/jszip.min.js

// version naming:
    //2.#.#-pre[number] for development versions, increment for every commit (not full release)
    //2.#.#-release for release
//this ensures that each version of the script is counted as different

// @version      2.0.0

// @match        *://*.shellshock.io/*
// @match        *://*.shell.onlypuppy7.online/*
// @match        *://*.algebra.best/*   
// @match        *://*.algebra.vip/*
// @match        *://*.biologyclass.club/*
// @match        *://*.deadlyegg.com/*
// @match        *://*.deathegg.world/*
// @match        *://*.eggboy.club/*
// @match        *://*.eggboy.xyz/*
// @match        *://*.eggcombat.com/*
// @match        *://*.egg.dance/*
// @match        *://*.eggfacts.fun/*
// @match        *://*.egghead.institute/*
// @match        *://*.eggisthenewblack.com/*
// @match        *://*.eggsarecool.com/*
// @match        *://*.geometry.best/*
// @match        *://*.geometry.monster/*
// @match        *://*.geometry.pw/*
// @match        *://*.geometry.report/*
// @match        *://*.hardboiled.life/*
// @match        *://*.hardshell.life/*
// @match        *://*.humanorganising.org/*
// @match        *://*.mathactivity.xyz/*
// @match        *://*.mathactivity.club/*
// @match        *://*.mathdrills.info/*
// @match        *://*.mathdrills.life/*
// @match        *://*.mathfun.rocks/*
// @match        *://*.mathgames.world/*
// @match        *://*.math.international/*
// @match        *://*.mathlete.fun/*
// @match        *://*.mathlete.pro/*
// @match        *://*.overeasy.club/*
// @match        *://*.risenegg.com/*
// @match        *://*.scrambled.tech/*
// @match        *://*.scrambled.today/*
// @match        *://*.scrambled.us/*
// @match        *://*.scrambled.world/*
// @match        *://*.shellshockers.club/*
// @match        *://*.shellshockers.life/*
// @match        *://*.shellshockers.site/*
// @match        *://*.shellshockers.us/*
// @match        *://*.shellshockers.world/*
// @match        *://*.shellshockers.xyz/*
// @match        *://*.shellsocks.com/*
// @match        *://*.softboiled.club/*
// @match        *://*.urbanegger.com/*
// @match        *://*.violentegg.club/*
// @match        *://*.violentegg.fun/*
// @match        *://*.yolk.best/*
// @match        *://*.yolk.life/*
// @match        *://*.yolk.rocks/*
// @match        *://*.yolk.tech/*
// @match        *://*.yolk.quest/*
// @match        *://*.yolk.today/*
// @match        *://*.zygote.cafe/*
// @match        *://*.shellshockers.best/*
// @match        *://*.eggboy.me/*
// @downloadURL  https://update.greasyfork.org/scripts/485745/shellfarm-utilities-for-shell-shockers.user.js
// @updateURL    https://update.greasyfork.org/scripts/485745/shellfarm-utilities-for-shell-shockers.meta.js
// ==/UserScript==

// {{CRACKEDSHELL}}
// require:"https://cdn.jsdelivr.net/npm/tweakpane@3.1.10/dist/tweakpane.min.js"
// require:"https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"
// require:"https://cdnjs.cloudflare.com/ajax/libs/jszip/3.7.1/jszip.min.js"
// {{!CRACKEDSHELL}}

let attemptedInjection = false;
console.log("ShellFarm: running (before function)");

(function () {

    let originalReplace = String.prototype.replace;
    let originalReplaceAll = String.prototype.replaceAll;

    String.prototype.originalReplace = function () {
        return originalReplace.apply(this, arguments);
    };
    String.prototype.originalReplaceAll = function () {
        return originalReplaceAll.apply(this, arguments);
    };

    console.log("ShellFarm: running (after function)");
    //script info
    const name = "ShellFarm Client";
    const version = typeof (GM_info) !== 'undefined' ? GM_info.script.version : "3";
    const menuTitle = name + " v" + version;
    //INIT WEBSITE LINKS: store them here so they are easy to maintain and update!
    const discordURL = "https://dsc.gg/sfnetwork";
    const githubURL = "https://github.com/onlypuppy7/ShellFarmClientShellShockers";

    const babylonURL = "https://cdn.jsdelivr.net/npm/babylonjs@3.3.0/babylon.min.js";

    const sfxURL = "https://api.github.com/repos/Hydroflame522/StateFarmClient/contents/soundpacks/sfx";
    const skyboxURL = "https://raw.githubusercontent.com/xynacore/skybox/master/";

    const jsArchiveURL = 'https://raw.githubusercontent.com/onlypuppy7/ShellShockJSArchives/main/js_archive/';
    const clientKeysURL = "https://raw.githubusercontent.com/StateFarmNetwork/client-keys/main/shellfarm_";

    //startup sequence
    const startUp = function () {
        console.log("ShellFarm: mainLoop()");
        mainLoop();
        console.log("ShellFarm: injectScript()");
        injectScript();
        document.addEventListener("DOMContentLoaded", function () {
            console.log("ShellFarm: DOMContentLoaded, fetching sfx");
            fetch(sfxURL)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Failed to fetch folder contents');
                    };
                })
                .then(data => {
                    data.forEach((file, index) => {
                        retrievedSFX.push({ text: file.name.replace(".zip", ""), value: JSON.stringify(file.download_url) })
                    });
                    onContentLoaded();
                })
                .catch(error => {
                    console.error('Error:', error);
                    onContentLoaded();
                });
        });
    };
    //INIT VARS
    const inbuiltPresets = {
    };
    const presetStorageLocation = "ShellFarmUserPresets";
    let hudElementPositions = {};
    let blacklistedGameCodes = [];
    const storageKey = "ShellFarm_" + (unsafeWindow.document.location.host.replaceAll(".", "")) + "_";
    console.log("Save key:", storageKey);
    let binding = false;
    let previousFrame = 0;
    let startTime = Date.now();
    let currentFrameIndex = 0;
    let deciSecondsPassed = 0;
    let timeJoinedGame = 0;
    let lastSentMessage = "";
    let spamDelay = 0;
    let URLParams = "";
    let retrievedSFX = [{ text: "Default", value: "default" }];
    let soundsSFC = {};
    let targetingComplete = false;
    let firstExecution = false;
    let username = "";
    let autoStrafeValue = [0, 0, "left"];
    let TEAMCOLORS = ["#fed838", "#40e0ff", "#ffc0a0"];
    let autoLeaveReminder = 9999;
    const allModules = [];
    const allFolders = [];
    const F = [];
    const createAudioContext = function () { return new (window.AudioContext || window.webkitAudioContext)() };
    const audioContexts = {
        "BGM": createAudioContext(),
        "KOTC": createAudioContext(),
        "OTHER": createAudioContext(),
        "SOUNDS": createAudioContext(),
    };
    const divertContexts = {
        "KOTC": ["kotc_capture", "kotc_capturing_opponents", "kotc_capturing_player", "kotc_contested", "kotc_pointscore", "kotc_roundend", "kotc_zonespawn"],
    };
    const L = {};
    const functionNames = [];
    const isKeyToggled = {};
    let onlinePlayersArray = [];
    let bindsArray = {};
    let H = {}; // obfuscated shit lol
    const tp = {}; // <-- tp = tweakpane
    // blank variables
    let ss = {};
    let msgElement, initialisedCustomSFX, automatedBorder, clientID, didShellFarm, menuInitiated, GAMECODE, noPointerPause, resetModules, amountOnline, errorString, playersInGame, loggedGameMap, startUpComplete, isBanned, attemptedAutoUnban, coordElement, gameInfoElement, playerstatsElement, firstUseElement, minangleCircle, redCircle, crosshairsPosition, currentlyTargeting, ammo, ranOneTime, lastWeaponBox, lastChatItemLength, configMain;
    let whitelistPlayers, scrambledMsgEl, accountStatus, oldGa, newGame, previousDetail, previousTitleAnimation, blacklistPlayers, playerLookingAt, forceControlKeys, forceControlKeysCache, playerNearest, enemyLookingAt, enemyNearest, AUTOMATED, ranEverySecond
    let cachedCommand = "", cachedCommandTime = Date.now();
    let activePath, findNewPath, activeNodeTarget;
    let pathfindingTargetOverride = undefined;
    let isFirstFrameAttemptingToPathfind = true;
    let despawnIfNoPath = false;
    let isLeftButtonDown = false;
    let isRightButtonDown = false;
    let configNotSet = true;
    const weaponArray = { //this could be done differently but i cba
        eggk47: 0,
        scrambler: 1,
        freeranger: 2,
        rpegg: 3,
        whipper: 4,
        crackshot: 5,
        trihard: 6,
        random: 3, // :trol_fancy:
    };
    const antiAFKString = "AntiAFK Message. This message is not visible to others. || ";
    const filteredList = [ //a selection of filtered words for antiafk. brimslate reports afk messages, so have fun reporting this and trying to explain this to the "eggforcers"
        'date', 'dick', 'fuck', 'fuk', 'suck', 'piss', 'hate', 'nude', 'fux', 'hate', 'pussy',
    ]; //filteredList[randomInt(0,filteredList.length-1)]
    let proxyList = [
        'shellshock.io', 'algebra.best', 'algebra.vip', 'biologyclass.club', 'deadlyegg.com', 'deathegg.world', 'eggboy.club', 'eggboy.xyz', 'eggcombat.com', 'egg.dance',
        'eggfacts.fun', 'egghead.institute', 'eggisthenewblack.com', 'eggsarecool.com', 'geometry.best', 'geometry.monster', 'geometry.pw', 'geometry.report', 'hardboiled.life',
        'hardshell.life', 'humanorganising.org', 'mathactivity.xyz', 'mathactivity.club', 'mathdrills.info', 'mathdrills.life', 'mathfun.rocks', 'mathgames.world', 'math.international',
        'mathlete.fun', 'mathlete.pro', 'overeasy.club', 'risenegg.com', 'scrambled.tech', 'scrambled.today', 'scrambled.us', 'scrambled.world', 'shellshockers.club', 'shellshockers.life', 'shellshockers.site',
        'shellshockers.us', 'shellshockers.world', 'shellshockers.xyz', 'shellsocks.com', 'softboiled.club', 'urbanegger.com', 'violentegg.club', 'violentegg.fun', 'yolk.best', 'yolk.life',
        'yolk.rocks', 'yolk.tech', 'yolk.quest', 'yolk.today', 'zygote.cafe', 'shellshockers.best', 'eggboy.me'
    ];
    proxyList = proxyList.filter(item => item !== unsafeWindow.location.hostname);
    proxyList = [...proxyList].sort(() => Math.random() - 0.5);
    let proxyListIndex = 0;
    const monitorObjects = {};
    
    const getScrambled = function () { return Array.from({ length: 10 }, () => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('') };
    let skyboxName = getScrambled();

    //menu interaction functions
    //menu extraction
    const extract = function (variable, shouldUpdate) {
        if (shouldUpdate) { updateConfig() };
        return configMain[variable];
    };
    const extractDropdownList = function (variable) {
        return tp[variable + "Button"].controller_.binding.value.constraint_.constraints[0].options;
    };
    const extractAsDropdownInt = function (variable) {
        const options = extractDropdownList(variable);
        const state = extract(variable);
        for (let i = 0; i < options.length; i++) {
            if (options[i].value === state) {
                return i;
            };
        };
    };

    const beginBinding = function (value) {
        if (binding == false) {
            binding = value;
            tp[binding + "BindButton"].title = "PRESS KEY";
        };
    };
    //one day i should make this unshit. dom is not the correct way to go about this.
    //unfortunately tweakpane is a pain in the ass and has barely anything for actually extracting/changing vars
    //a way it could be done is export preset => change value => import preset
    //but doesnt account for it being a button... and dropdowns wouldnt switch properly too. laziness. the problem is that this works fine.
    //suppose i could always just log the type of module and refer to it later. you can also get the parent object from the tp object, that would save iterating over everything.
    const change = function (module, newValue) { //its important to note that every module must have a unique name (the title of the module, NOT the storeAs)
        const labels = document.querySelectorAll('.tp-lblv_l');
        const moduleButton = module + "Button";
        const moduleLabel = tp[moduleButton].label;
        for (const label of labels) {
            if (label.textContent.includes(moduleLabel)) {
                const inputContainer = label.nextElementSibling;
                const currentValue = extract(module);
                // check for checkbox
                const checkbox = inputContainer.querySelector('.tp-ckbv_i');
                if (checkbox) {
                    if (newValue == undefined) {
                        newValue = (!currentValue);
                    };
                    if (newValue !== (!!currentValue)) {
                        checkbox.click(); // Toggle checkbox
                    };
                    console.log(module, "checkbox", currentValue, newValue);
                    return extract(module, true);
                };
                // check for button
                const button = inputContainer.querySelector('.tp-btnv_b');
                if (button) {
                    button.click(); // Trigger button click
                    console.log(module, "button", currentValue, newValue);
                    return ("NOMSG"); //no change of state, dont show pop up message
                };
                // check for dropdown
                const dropdown = inputContainer.querySelector('.tp-lstv_s');
                if (dropdown) {
                    if (newValue == undefined) { //if youre going to set a list to a certain value, use the int value of the list item
                        newValue = (dropdown.selectedIndex + 1) % dropdown.options.length;
                    };
                    dropdown.selectedIndex = newValue;
                    dropdown.dispatchEvent(new Event('change')); // trigger change event for dropdown
                    console.log(module, "dropdown", currentValue, newValue);
                    return extract(module, true);
                };
                // check for text input
                const textInput = inputContainer.querySelector('.tp-txtv_i');
                if (textInput) {
                    textInput.value = newValue;
                    textInput.dispatchEvent(new Event('change')); // trigger change event for dropdown
                    return extract(module, true);
                };
            };
        };
    };
    document.addEventListener('mousedown', function (event) {
        if (event.button === 2) {
            isRightButtonDown = true;
        } else if (event.button === 0) {
            isLeftButtonDown = true;
        };
    });
    document.addEventListener('mouseup', function (event) {
        if (event.button === 2) {
            isRightButtonDown = false;
        } else if (event.button === 0) {
            isLeftButtonDown = false;
        };
    });
    //menu
    document.addEventListener("keydown", function (event) {
        event = (event.code.originalReplace("Key", ""));
        isKeyToggled[event] = true;
        if (event == "Escape") { noPointerPause = false; unsafeWindow.document.onpointerlockchange() };
    });
    document.addEventListener("keyup", function (event) {
        event = (event.code.originalReplace("Key", ""));
        isKeyToggled[event] = false;
        if (document.activeElement && document.activeElement.tagName === 'INPUT') {
            return;
        } else if (binding != false) {
            if (event == "Delete") { event = "Set Bind" };
            tp[binding + "BindButton"].title = event;
            bindsArray[binding] = event;
            save(binding + "Bind", event);
            createPopup("Binded " + tp[binding + "Button"].label + " to key: " + event);
            binding = false;
        } else {
            Object.keys(bindsArray).forEach(function (module) {
                if ((bindsArray[module] == event) && module != "zoom") {
                    let state = change(module)
                    let popupText = state
                    if (state != "NOMSG") {
                        if (state === true || state === false || state === undefined) { state = (state ? "ON" : "OFF") };
                        popupText = "Set " + module + " to: " + state;
                        if (extract("announcer")) {
                            sendChatMessage("I just set " + module + " to " + state + "!");
                        };
                    } else {
                        switch (module) {
                            case ("hide"):
                                popupText = "Toggled ShellFarm Panel"; break;
                            case ("panic"):
                                popupText = "Exiting to set URL..."; break;
                        };
                    };
                    createPopup(popupText);
                };
            });
        };
    });
    const initTabs = function (tab, guideData) {
        tp[tab.storeAs] = tab.location.addTab({
            pages: [
                { title: 'Modules' },
                { title: 'Binds' },
                { title: 'Guide' },
            ],
        });
        if (guideData) {
            const thePages = [];
            guideData.forEach(aPage => {
                thePages.push({ title: aPage.title });
            });
            tp[tab.storeAs + "Guide"] = tp[tab.storeAs].pages[2].addTab({ pages: thePages }); //is there a one liner for this? uhhh probabyl
            //tp[tab.storeAs + "Guide"] = tab.location.addTab({ thePages: guideData.map(page => ({ title: page.title })) });
            for (let i = 0; i < guideData.length; i++) {
                const storeAs = tab.storeAs + "Guide" + i;
                const text = (guideData[i].content || "Not set up correctly lmao");
                initModule({ location: tp[tab.storeAs + "Guide"].pages[i], storeAs: storeAs, monitor: (text.split('\n').length + 0.25), });
                monitorObjects[storeAs] = text;
                const infoElement = tp[storeAs + "Button"].controller_.view.element.children[1].children[0];
                infoElement.style.width = "270px";
                infoElement.style.setProperty("margin-left", "-110px", "important");
            };
        };
    };
    const initFolder = function (folder) {
        tp[folder.storeAs] = folder.location.addFolder({
            title: folder.title,
            expanded: load(folder.storeAs) !== null ? load(folder.storeAs) : false
        });
        allFolders.push(folder.storeAs);
    };
    const initModule = function (module) {
        if (module.requirements) {

        };

        const value = {};
        value[module.storeAs] = (module.defaultValue !== undefined ? module.defaultValue : false);

        tp[module.storeAs + "TiedModules"] = {
            showConditions: (module.showConditions || false),
            hideConditions: (module.hideConditions || false),
            enableConditions: (module.enableConditions || false),
            disableConditions: (module.disableConditions || false), //why have disable when there is already enable? enable acts like an AND operator, whereas having conditions for the opposite allows for an OR operation. it is messy, but hey it works lmao?
        };

        if (!(module.slider && module.slider.step)) { module.slider = {} };
        const config = {
            label: module.title,
            options: module.dropdown,
            min: module.slider.min,
            max: module.slider.max,
            step: module.slider.step,
            title: module.button,
        };
        if (module.button) {
            tp[(module.storeAs + "Button")] = module.location.addButton({
                label: module.title,
                title: module.button,
            }).on("click", (value) => {
                if (module.clickFunction !== undefined) { module.clickFunction(value) };
            });
        } else if (module.monitor) {
            monitorObjects[module.storeAs] = "Text Goes Here";
            tp[(module.storeAs + "Button")] = module.location.addMonitor(monitorObjects, module.storeAs, {
                label: '',
                expanded: true,
                multiline: true,
                lineCount: module.monitor,
            });
            setInterval(() => {
                tp[(module.storeAs + "Button")].refresh();
            }, 1000);
        } else {
            tp[module.storeAs + "Button"] = module.location.addInput(value, module.storeAs, config
            ).on("change", (value) => {
                if (module.changeFunction !== undefined) { module.changeFunction(value) };
                setTimeout(() => {
                    updateHiddenAndDisabled();
                    saveConfig();
                }, 150);
            });
        };
        allModules.push(module.storeAs);
        if (module.bindLocation) { initBind(module) };
    };
    const initBind = function (module) {
        if (resetModules) { remove(module.storeAs + "Bind") };
        const theBind = (load(module.storeAs + "Bind") || module.defaultBind || "Set Bind");
        tp[(module.storeAs + "BindButton")] = module.bindLocation.addButton({
            label: module.title,
            title: theBind,
        }).on("click", (value) => {
            beginBinding(module.storeAs);
        });
        bindsArray[module.storeAs] = theBind;
    };
    const initMenu = function (reset) {
        //INIT MENU
        //init tp.mainPanel

        resetModules = reset;
        menuInitiated = false;

        if (tp.mainPanel) { tp.mainPanel.dispose() };

        tp.mainPanel = new Tweakpane.Pane(); // eslint-disable-line
        tp.mainPanel.title = menuTitle;
        //RENDER MODULES
        initFolder({ location: tp.mainPanel, title: "Render", storeAs: "renderFolder", });
        initTabs({ location: tp.renderFolder, storeAs: "renderTab" }, [
            {
                title: "WIP", content:
`Sorry! No guide yet!`},
        ]);
            initModule({ location: tp.renderTab.pages[0], title: "FOV", storeAs: "fov", slider: { min: 0, max: 360, step: 3 }, defaultValue: 72, });
            initModule({ location: tp.renderTab.pages[0], title: "Zoom FOV", storeAs: "zoom", slider: { min: 0, max: 72, step: 1 }, defaultValue: 15, bindLocation: tp.renderTab.pages[1], defaultBind: "C", });
            tp.renderTab.pages[0].addSeparator();
            initModule({ location: tp.renderTab.pages[0], title: "Wireframe", storeAs: "wireframe", bindLocation: tp.renderTab.pages[1], });
            initModule({ location: tp.renderTab.pages[0], title: "Egg Size", storeAs: "eggSize", slider: { min: 0, max: 10, step: 0.25 }, defaultValue: 1, });
            tp.renderTab.pages[0].addSeparator();
            initModule({ location: tp.renderTab.pages[0], title: "Set Detail", storeAs: "setDetail", bindLocation: tp.renderTab.pages[1], dropdown: [{ text: "Disabled", value: "disabled" }, { text: "Auto Detail", value: "autodetail" }, { text: "No Details", value: "nodetails" }, { text: "Shadows", value: "shadows" }, { text: "High Res", value: "highres" }, { text: "Shadows+High Res", value: "shadowshighres" }], defaultValue: "disabled" });
            initModule({ location: tp.renderTab.pages[0], title: "Textures", storeAs: "enableTextures", bindLocation: tp.renderTab.pages[1], defaultValue: true, });
            initModule({ location: tp.renderTab.pages[0], title: "Render Delay", storeAs: "renderDelay", slider: { min: 0, max: 30000, step: 10 }, defaultValue: 0, });
        //HUD MODULES
        initFolder({ location: tp.mainPanel, title: "HUD", storeAs: "hudFolder", });
        initTabs({ location: tp.hudFolder, storeAs: "hudTab" }, [
            {
                title: "WIP", content:
`Sorry! No guide yet!`},
        ]);
            initModule({ location: tp.hudTab.pages[0], title: "Co-ords", storeAs: "showCoordinates", bindLocation: tp.hudTab.pages[1], });
            initModule({ location: tp.hudTab.pages[0], title: "HP Display", storeAs: "playerStats", bindLocation: tp.hudTab.pages[1], });
            initModule({ location: tp.hudTab.pages[0], title: "GameInfo", storeAs: "gameInfo", bindLocation: tp.hudTab.pages[1], });
            initModule({ location: tp.hudTab.pages[0], title: "ShowStream", storeAs: "showStreams", bindLocation: tp.hudTab.pages[1], });
        //CHAT MODULES
        initFolder({ location: tp.mainPanel, title: "Chat", storeAs: "chatFolder", });
        initTabs({ location: tp.chatFolder, storeAs: "chatTab" }, [
            {
                title: "WIP", content:
`Sorry! No guide yet!`},
        ]);
            initModule({ location: tp.chatTab.pages[0], title: "InfiniHistory", storeAs: "chatExtend", bindLocation: tp.chatTab.pages[1], });
            initModule({ location: tp.chatTab.pages[0], title: "HighlightTxt", storeAs: "chatHighlight", bindLocation: tp.chatTab.pages[1], });
            initModule({ location: tp.chatTab.pages[0], title: "Max Ingame", storeAs: "maxChat", slider: { min: 0, max: 30, step: 1 }, defaultValue: 5, });
            initModule({ location: tp.chatTab.pages[0], title: "ShowFiltered", storeAs: "disableChatFilter", bindLocation: tp.chatTab.pages[1], });
            tp.chatTab.pages[0].addSeparator();
            initFolder({ location: tp.chatTab.pages[0], title: "Join/Leave Msgs Options", storeAs: "joinLeaveFolder", });
                initModule({ location: tp.joinLeaveFolder, title: "Join Msgs", storeAs: "joinMessages", bindLocation: tp.chatTab.pages[1], });
                initModule({ location: tp.joinLeaveFolder, title: "Leave Msgs", storeAs: "leaveMessages", bindLocation: tp.chatTab.pages[1], });
        //AUTOMATION MODULES
        initFolder({ location: tp.mainPanel, title: "Automation", storeAs: "automationFolder", });
        initTabs({ location: tp.automationFolder, storeAs: "automationTab" }, [
            {
                title: "WIP", content:
`Sorry! No guide yet!`},
        ]);
            initModule({ location: tp.automationTab.pages[0], title: "Auto Walk", storeAs: "autoWalk", bindLocation: tp.automationTab.pages[1], });
            tp.automationTab.pages[0].addSeparator();
            initModule({ location: tp.automationTab.pages[0], title: "AutoWeapon", storeAs: "autoWeapon", bindLocation: tp.automationTab.pages[1], dropdown: [{ text: "Disabled", value: "disabled" }, { text: "EggK-47", value: "eggk47" }, { text: "Scrambler", value: "scrambler" }, { text: "Free Ranger", value: "freeranger" }, { text: "RPEGG", value: "rpegg" }, { text: "Whipper", value: "whipper" }, { text: "Crackshot", value: "crackshot" }, { text: "Tri-Hard", value: "trihard" }, { text: "Randomised", value: "random" }], defaultValue: "disabled" });
            tp.automationTab.pages[0].addSeparator();
            initFolder({ location: tp.automationTab.pages[0], title: "Auto Join Options", storeAs: "autoJoinFolder", });
                initModule({ location: tp.autoJoinFolder, title: "Auto Join", storeAs: "autoJoin", bindLocation: tp.automationTab.pages[1], });
                initModule({ location: tp.autoJoinFolder, title: "Join Code", storeAs: "joinCode", defaultValue: "CODE", enableConditions: [["autoJoin", true]], });
                initModule({ location: tp.autoJoinFolder, title: "Get Code", storeAs: "getCode", button: "Retrieve", clickFunction: function () { change("joinCode", GAMECODE) }, enableConditions: [["autoJoin", true]], });
            initFolder({ location: tp.automationTab.pages[0], title: "Auto Name Options", storeAs: "autoNamesFolder", });
                initModule({ location: tp.autoNamesFolder, title: "Use Name", storeAs: "useCustomName", bindLocation: tp.automationTab.pages[1], });
                initModule({ location: tp.autoNamesFolder, title: "New Name", storeAs: "usernameAutoJoin", defaultValue: "ShellFarmer", enableConditions: [["useCustomName", true]], });
                //the name usernameAutoJoin is only kept for compatability
                initModule({ location: tp.autoNamesFolder, title: "Copy Name", storeAs: "copyName", button: "Steal Name", enableConditions: [["useCustomName", true]], bindLocation: tp.automationTab.pages[1], clickFunction: function(){
                    const copiedName = retrieveCopiedName();
                    console.log("Retrieved copied name:",copiedName);
                    change("usernameAutoJoin",(copiedName||"ShellFarmer"));
                },});
                initModule({ location: tp.autoNamesFolder, title: "Random Name", storeAs: "randomName", button: "Randomise Name", enableConditions: [["useCustomName", true]], bindLocation: tp.automationTab.pages[1], clickFunction: function(){
                    const randomisedName = unsafeWindow.extern.generateRandomName();
                    change("usernameAutoJoin",(randomisedName||"ShellFarmer"));
                },});
            tp.automationTab.pages[0].addSeparator();
            initModule({ location: tp.automationTab.pages[0], title: "AutoRespawn", storeAs: "autoRespawn", bindLocation: tp.automationTab.pages[1], });
            initModule({ location: tp.automationTab.pages[0], title: "Auto Team", storeAs: "autoTeam", bindLocation: tp.automationTab.pages[1], dropdown: [{ text: "Disabled", value: "disabled" }, { text: "Red Team", value: "red" }, { text: "Blue Team", value: "blue" }, { text: "Random Team", value: "random" }], defaultValue: "disabled" });
            tp.automationTab.pages[0].addSeparator();
            initFolder({ location: tp.automationTab.pages[0], title: "Game Blacklist Settings", storeAs: "gameBlacklistFolder", });//Game Blacklist Folder
                initModule({ location: tp.gameBlacklistFolder, title: "Blacklist On", storeAs: "gameBlacklist", bindLocation: tp.automationTab.pages[1], });
                initModule({ location: tp.gameBlacklistFolder, title: "Codes:", storeAs: "gameBlacklistCodes", defaultValue: "", });
                initModule({ location: tp.gameBlacklistFolder, title: "Get BL Code", storeAs: "getCodeBlacklist", button: "Retrieve", bindLocation: tp.automationTab.pages[1], clickFunction: function(){
                    if (GAMECODE != undefined && GAMECODE != null){
                        extract("gameBlacklistCodes") != undefined ? change("gameBlacklistCodes", extract("gameBlacklistCodes")+GAMECODE+",") : change("gameBlacklistCodes", GAMECODE+",");
                    } else {
                        createPopup("Join a game first");
                    };
                },});
            tp.automationTab.pages[0].addSeparator();
            initModule({ location: tp.automationTab.pages[0], title: "LeaveGame", storeAs: "leaveGame", button: "Unjoin Game", bindLocation: tp.automationTab.pages[1], clickFunction: function () { unsafeWindow.vueApp.onLeaveGameConfirm() }, });
            initModule({ location: tp.automationTab.pages[0], title: "LeaveEmpty", storeAs: "leaveEmpty", bindLocation: tp.automationTab.pages[1], });
            initModule({ location: tp.automationTab.pages[0], title: "Auto Leave", storeAs: "autoLeave", bindLocation: tp.automationTab.pages[1], });
            initModule({ location: tp.automationTab.pages[0], title: "Delay (s)", storeAs: "autoLeaveDelay", slider: { min: 0, max: 3600, step: 1 }, defaultValue: 300, enableConditions: [["autoLeave", true]] });
            tp.automationTab.pages[0].addSeparator();
            initModule({ location: tp.automationTab.pages[0], title: "Gamemode", storeAs: "autoGamemode", bindLocation: tp.automationTab.pages[1], dropdown: [{ text: "Disabled", value: "disabled" }, { text: "FFA", value: "ffa" }, { text: "Teams", value: "teams" }, { text: "Captula", value: "captula" }, { text: "KotC", value: "kotc" }, { text: "Randomised", value: "random" }], defaultValue: "disabled" });
            initModule({ location: tp.automationTab.pages[0], title: "Auto Region", storeAs: "autoRegion", bindLocation: tp.automationTab.pages[1], dropdown: [{ text: "Disabled", value: "disabled" }, { text: "Chile", value: "santiago" }, { text: "Germany", value: "germany" }, { text: "Singapore", value: "singapore" }, { text: "Sydney", value: "sydney" }, { text: "US Central", value: "uscentral" }, { text: "US East", value: "useast" }, { text: "US West", value: "uswest" }, { text: "Randomised", value: "random" }], defaultValue: "disabled" });
            tp.automationTab.pages[0].addSeparator();
            initModule({ location: tp.automationTab.pages[0], title: "Egg Colour", storeAs: "eggColour", bindLocation: tp.automationTab.pages[1], dropdown: [{ text: "Disabled", value: "disabled" }, { text: "White", value: "white" }, { text: "Light Blue", value: "lightblue" }, { text: "Light Eggshell", value: "lighteggshell" }, { text: "Eggshell", value: "eggshell" }, { text: "Dark Eggshell", value: "darkeggshell" }, { text: "Darker Eggshell", value: "darkereggshell" }, { text: "Darkest Eggshell", value: "darkesteggshell" }, { text: "Red (VIP)", value: "red" }, { text: "Purple (VIP)", value: "purple" }, { text: "Pink (VIP)", value: "pink" }, { text: "Yellow (VIP)", value: "yellow" }, { text: "Blue (VIP)", value: "blue" }, { text: "Green (VIP)", value: "green" }, { text: "Lime (VIP)", value: "lime" }, /*{text: "Randomised", value: "random"}*/], defaultValue: "disabled" });
            initModule({ location: tp.automationTab.pages[0], title: "Auto Stamp", storeAs: "autoStamp", bindLocation: tp.automationTab.pages[1], dropdown: [{ text: "Disabled", value: "disabled" }, { text: "Target Stamp", value: "target" }, { text: "No Sign Stamp", value: "nosign" }, { text: "Question Mark Stamp?", value: "question" }, { text: "Peace Stamp", value: "peace" }, { text: "Thumbs Up Stamp", value: "thumbsup" }, { text: "Pablo Smile Stamp", value: "pablosmile" }], defaultValue: "disabled" });
            initModule({ location: tp.automationTab.pages[0], title: "Auto Hat", storeAs: "autoHat", bindLocation: tp.automationTab.pages[1], dropdown: [{ text: "Disabled", value: "disabled" }, { text: "Ball Cap", value: "ballcap" }, { text: "Boat Fedora", value: "boatfedora" }, { text: "Top Hat", value: "tophat" }, { text: "Derby Hat", value: "derbyhat" }, { text: "Mountie Hat", value: "mountiehat" }, { text: "Pablo Hat", value: "pablohat" }], defaultValue: "disabled" });
        //THEMING MODULES
        initFolder({ location: tp.mainPanel, title: "Theming", storeAs: "themingFolder", });
        initTabs({ location: tp.themingFolder, storeAs: "themingTab" }, [
            {
                title: "WIP", content:
`Sorry! No guide yet!`},
        ]);            
            initModule({ location: tp.themingTab.pages[0], title: "Skybox", storeAs: "skybox", bindLocation: tp.themingTab.pages[1], dropdown: [
                    { text: 'Default', value: 'default' },
                    { text: 'aurora', value: 'aurora' },
                    { text: 'green', value: 'green' },
                    { text: 'moonlight', value: 'moonlight' },
                    { text: 'morning', value: 'morning' },
                    { text: 'space explosion', value: 'space-explosion' },
                    { text: 'sunrise', value: 'sunrise' },
                    { text: 'sunset', value: 'sunset' }
                ], changeFunction: (newSkybox) => {
                    if (!unsafeWindow[skyboxName]) return;

                    unsafeWindow[skyboxName].material.reflectionTexture = new L.BABYLON.CubeTexture(`${skyboxURL}${newSkybox.value}/skybox`, ss.SCENE);
                    unsafeWindow[skyboxName].material.reflectionTexture.coordinatesMode = L.BABYLON.Texture.SKYBOX_MODE;
                }});
            tp.themingTab.pages[0].addSeparator();
            initFolder({ location: tp.themingTab.pages[0], title: "Audio Settings", storeAs: "audioFolder", });
                initModule({ location: tp.audioFolder, title: "Mute Game", storeAs: "muteGame", bindLocation: tp.themingTab.pages[1], });
                initModule({ location: tp.audioFolder, title: "DistanMult", storeAs: "distanceMult", slider: { min: 0.01, max: 2, step: 0.01 }, defaultValue: 1, });
                tp.audioFolder.addSeparator();
                initModule({ location: tp.audioFolder, title: "CustomSFX", storeAs: "customSFX", bindLocation: tp.themingTab.pages[1], enableConditions: [["muteGame", false]], dropdown: retrievedSFX, });
            tp.themingTab.pages[0].addSeparator();
            initModule({ location: tp.themingTab.pages[0], title: "Client Theme", storeAs: "themeType", bindLocation: tp.themingTab.pages[1], dropdown: [
                {text: "Default", value: "defaultTheme"},
                {text: "ShellFarm", value: "shellFarmTheme"},
                {text: "Iceberg", value: "icebergTheme"},
                {text: "Jet Black", value: "jetblackTheme"},
                {text: "Light", value: "lightTheme"},
                {text: "Retro", value: "retroTheme"},
                {text: "Translucent", value: "translucentTheme"},
                {text: "Blurple", value: "blurpleTheme"},
            ], defaultValue: "shellFarmTheme", changeFunction: function(value) {
                applyTheme(value.value);
            }});
        //ACCOUNT MODULES
        initFolder({ location: tp.mainPanel, title: "Accounts", storeAs: "accountsFolder", });
        initTabs({ location: tp.accountsFolder, storeAs: "accountsTab" }, [
            {
                title: "Basics", content:
`This is the accounts tab. Here you will find
options relating to logging into accounts.`},
        ]);
            initFolder({ location: tp.accountsTab.pages[0], title: "Account Login (Basic)", storeAs: "loginFolder", });
                initModule({ location: tp.loginFolder, title: 'Email:Pass', storeAs: 'loginEmailPass', defaultValue: "ex@gmail.com:passwd" });
                initModule({ location: tp.loginFolder, title: 'Login Account', storeAs: 'loginLogin', button: 'LOGIN', bindLocation: tp.accountsTab.pages[1], clickFunction: function () {
                    let emailPass = extract("loginEmailPass");
                    if (emailPass.includes(":")) {
                        loginOrCreateWithEmailPass(emailPass);
                    } else {
                        emailPass = prompt('Your email:pass isn\'t valid. Enter your combo below or input the correct one in the box.', '');
                        if (emailPass.includes(":")) {
                            loginOrCreateWithEmailPass(emailPass);
                        }; //else fuck you. im not doing anything with that.
                    };
                } });
            tp.accountsTab.pages[0].addSeparator();
        //MISC MODULES
        initFolder({ location: tp.mainPanel, title: "Misc", storeAs: "miscFolder", });
        initTabs({ location: tp.miscFolder, storeAs: "miscTab" }, [
            {
                title: "WIP", content:
`Sorry! No guide yet!`},
        ]);
            initModule({ location: tp.miscTab.pages[0], title: "Ad Block", storeAs: "adBlock", bindLocation: tp.miscTab.pages[1], });
            initModule({ location: tp.miscTab.pages[0], title: "VIP Spoof", storeAs: "spoofVIP", bindLocation: tp.miscTab.pages[1], });
            initModule({ location: tp.miscTab.pages[0], title: "Unlock Skins", storeAs: "unlockSkins", bindLocation: tp.miscTab.pages[1], });
            initModule({ location: tp.miscTab.pages[0], title: "Admin Spoof", storeAs: "adminSpoof", bindLocation: tp.miscTab.pages[1], });
            tp.miscTab.pages[0].addSeparator();
            initModule({ location: tp.miscTab.pages[0], title: "New Proxy", storeAs: "newProxy", bindLocation: tp.miscTab.pages[1], button: "NEW PROXY", clickFunction: function(){
                const userConfirmed=confirm("Switching to a proxy URL. By proceeding, you will enter another URL for Shell Shockers but your data doesn't get transferred.");
                if (userConfirmed) {
                    newProxy();
                };
            },});
            initModule({ location: tp.miscTab.pages[0], title: "Reload Page", storeAs: "reload", bindLocation: tp.miscTab.pages[1], button: "RELOAD NOW", clickFunction: function(){
                reloadPage();
            },});
            tp.miscTab.pages[0].addSeparator();
            initModule({ location: tp.miscTab.pages[0], title: "Switch Focus", storeAs: "unfocus", bindLocation: tp.miscTab.pages[1], button: "FOCUS/UNFOCUS", defaultBind: "P", clickFunction: function(){
                if (document.pointerLockElement !== null) { //currently locked
                    noPointerPause=true; unsafeWindow.document.exitPointerLock();
                } else if (noPointerPause) { //already unlocked?
                    noPointerPause=false;
                    unsafeWindow.canvas.requestPointerLock();
                };
            },});
            tp.miscTab.pages[0].addSeparator();
            initModule({ location: tp.miscTab.pages[0], title: "FastChickenWinner", storeAs: "chickenWinner", bindLocation: tp.miscTab.pages[1], button: "Force Play", clickFunction: function(){
                extern.chwTryPlay();
                const eggElement = document.getElementById("eggOne");
                eggElement.click();eggElement.click();eggElement.click();eggElement.click();eggElement.click();eggElement.click();eggElement.click();eggElement.click();eggElement.click();
                let chicknWinnerElementLoaded = false;
                const checkInterval = setInterval(() => {
                    const chicknWinnerElement = document.getElementById('chicknWinner');
                    chicknWinnerElementLoaded = (chicknWinnerElement?.style?.display == ''); //idk, this is kind of shit? but who actually cares that much...
                    if (chicknWinnerElementLoaded) {
                        const gotWinnerOkElement = document.getElementById('gotWinnerOk');
                        if (gotWinnerOkElement) {
                            gotWinnerOkElement.click();
                        };
                        if (chicknWinnerElement.style.display == 'none') {
                            console.log("ermm, found");
                            clearInterval(checkInterval);
                            accountStatus = "chwDone";
                        };
                    };
                }, 100);
            },});
            initModule({ location: tp.miscTab.pages[0], title: "AutoChickenWinner", storeAs: "autoChickenWinner", bindLocation: tp.miscTab.pages[1],});
            tp.miscTab.pages[0].addSeparator();
            initModule({ location: tp.miscTab.pages[0], title: "Custom Macro", storeAs: "customMacro", defaultValue: "console.log('cool');" });
            initModule({ location: tp.miscTab.pages[0], title: "Execute Macro", storeAs: "executeMacro", bindLocation: tp.miscTab.pages[1], button: "EXECUTE", clickFunction: function(){
                //use at your own risk, i guess. but is this really any more dangerous than pasting something into console? not really.
                (async () => {
                    try {
                        console.log(extract("customMacro"));
                        await eval(extract("customMacro")); //stay safe out there. this runs in the **userscript** environment. make sure to use unsafeWindow for whatever reason you may need the window object
                    } catch (error) {
                        console.error("Error executing code:", error);
                    }
                })();
            },}); //but yes, as you can see "macros" are just scripts you can execute for whatever purposes you need. reminds me of userscripts...
            initModule({ location: tp.miscTab.pages[0], title: "Do At Startup", storeAs: "autoMacro", bindLocation: tp.miscTab.pages[1],});
        //CLIENT MODULES
        initFolder({ location: tp.mainPanel, title: "Client & About", storeAs: "clientFolder", });
        initTabs({ location: tp.clientFolder, storeAs: "clientTab" }, [
            {
                title: "WIP", content:
`Sorry! No guide yet!`},
        ]);
            initModule({ location: tp.clientTab.pages[0], title: "Hide GUI", storeAs: "hide", bindLocation: tp.clientTab.pages[1], button: "Hide!", clickFunction: function () { tp.mainPanel.hidden = !tp.mainPanel.hidden }, defaultBind: "H", });
            initModule({ location: tp.clientTab.pages[0], title: "Pop-ups", storeAs: "popups", bindLocation: tp.clientTab.pages[1], defaultValue: true, });
            tp.clientTab.pages[0].addSeparator();
            initModule({ location: tp.clientTab.pages[0], title: "Panic", storeAs: "panic", bindLocation: tp.clientTab.pages[1], button: "EXIT!", clickFunction: function () { if (extract("enablePanic")) { unsafeWindow.location.replace(extract("panicURL")) } }, defaultBind: "X", enableConditions: [["enablePanic", true]], });
            initFolder({ location: tp.clientTab.pages[0], title: "Panic Options", storeAs: "panicFolder", });
                initModule({ location: tp.panicFolder, title: "Enable", storeAs: "enablePanic", bindLocation: tp.clientTab.pages[1], defaultValue: true, });
                initModule({ location: tp.panicFolder, title: "Set URL", storeAs: "panicURL", defaultValue: "https://classroom.google.com/", enableConditions: [["enablePanic", true]], });
            tp.clientTab.pages[0].addSeparator();
            let presetList = [];
            Object.entries(inbuiltPresets).forEach(([key, value]) => {//Get all presets from inbuilt presets var
                let options = {};
                options.text = key;//not the best way to add things to a dictionary, but the only way i could get to work
                options.value = key; // idiot could've not violated eslint smfh
                presetList.push(options);
            });
            //PRESETS: OakSwingZZZ 😎
            initFolder({ location: tp.clientTab.pages[0], title: "Presets", storeAs: "presetFolder",});
                initModule({ location: tp.presetFolder, title: "Preset List", storeAs: "selectedPreset", defaultValue: "onlypuppy7's Config", bindLocation: tp.clientTab.pages[1], dropdown: presetList, });
                initModule({ location: tp.presetFolder, title: "Apply", storeAs: "applyPreset", button: "Apply Preset", clickFunction: function () {
                    const userConfirmed = confirm( "Are you sure you want to continue? This will replace most of your current config." );
                        if (userConfirmed) { applySettings(inbuiltPresets[extract("selectedPreset")], true); };
                    },
                });
                tp.presetFolder.addSeparator();
                initModule({ location: tp.presetFolder, title: "Save", storeAs: "savePreset", button: "Save As Preset", clickFunction: function () {
                    console.log("Config Main: ", configMain);
                    let saveString = '';
                    const addParam = function(module,setTo) {saveString=saveString+module+">"+JSON.stringify(setTo)+"<"};
                    Object.entries(configMain).forEach(([key, value]) => {
                        console.log(key, value);
                        if (typeof(value) == 'string') {
                            try {
                                let dropdown = extractAsDropdownInt(key)
                                value = dropdown;
                            } catch (error) {
                                //dont care lmaoooo
                            };
                        };
                        if (!presetIgnore.includes(key)){
                            addParam(key, value);
                        }
                    });
                    saveString = saveString.substring(0, saveString.length - 1);
                    let presetName = prompt("Name of preset:"); // asks user for name of preset
                    if (presetName == "" || presetName == null) {
                        console.log("User cancelled save");
                    } else {
                        let result = saveUserPreset(presetName, saveString);//saves user preset
                        addUserPresets(loadUserPresets()); //updates inbuiltPresets to include
                        console.log("Saved Preset: ", saveString);
                        console.log("User Preset Result: ", result);
                    };
                    console.log("InbuiltPrests:");
                    console.log(inbuiltPresets);
                    initMenu(false); //Reloads menu to add to dropdown list
                },});
                initModule({ location: tp.presetFolder, title: "Delete", storeAs: "deletePreset", button: "Remove Preset", clickFunction: function () { // Function won't do anything if they select a preset that was loaded in the gamecode
                    let currUserPresets = loadUserPresets(); //gets current presets from storage
                    delete currUserPresets[extract("selectedPreset")];//deletes
                    delete inbuiltPresets[extract("selectedPreset")];//deletes
                    save(presetStorageLocation, currUserPresets); // saves cnages to file.
                    console.log("Current User Presets: ",currUserPresets);
                    initMenu(false); //reloads menu
                },});
                tp.presetFolder.addSeparator();
                initModule({ location: tp.presetFolder, title: "Import", storeAs: "importPreset", button: "Import Preset", clickFunction: function () {
                    let preset = prompt("Paste preset here:"); // asks user to paste preset
                    if (preset == "" || preset == null) {
                        console.log("User cancelled save");
                    } else {
                        const pattern = /([a-zA-Z]*>[^<]*<)+[a-zA-Z]*>[^<]*/;
                        if (pattern.test(preset)){
                            let presetName = prompt("Name of preset:"); // asks user for name of preset
                            if (presetName == "" || presetName == null) {
                                console.log("User cancelled save");
                            } else {
                                let result = saveUserPreset(presetName, preset);//saves user preset
                                addUserPresets(loadUserPresets()); //updates inbuiltPresets to include
                                console.log("Saved Preset: ", preset);
                                console.log("User Preset Result: ", result);
                            }
                        } else {
                            alert("Not A Valid Preset!");
                            console.log("Preset Not Valid");
                        };
                        initMenu(false);
                    };
                },});
                initModule({ location: tp.presetFolder, title: "Export", storeAs: "exportPreset", button: "Copy To Clipboard", clickFunction: function () {
                    let saveString = '';
                    const addParam = function(module,setTo) {saveString=saveString+module+">"+JSON.stringify(setTo)+"<"};
                    Object.entries(configMain).forEach(([key, value]) => {
                        console.log(key, value);
                        if (typeof(value) == 'string') {
                            try {
                                let dropdown = extractAsDropdownInt(key)
                                value = dropdown;
                            } catch (error) {
                                //dont care lmaoooo
                            };
                        };
                        if (!presetIgnore.includes(key)){
                            addParam(key, value);
                        }
                    });
                    saveString = saveString.substring(0, saveString.length - 1);
                    GM_setClipboard(saveString, "text", () => console.log("Clipboard set!"));
                    createPopup("Preset copied to clipboard...");
                },});
            tp.clientTab.pages[0].addSeparator();
            initFolder({ location: tp.clientTab.pages[0], title: "Creator's Links", storeAs: "linksFolder",});
                initModule({ location: tp.linksFolder, title: "Discord", storeAs: "discord", button: "Link", clickFunction: () => GM_openInTab(discordURL, { active: true }) });
                initModule({ location: tp.linksFolder, title: "GitHub", storeAs: "github", button: "Link", clickFunction: () => GM_openInTab(githubURL, { active: true }) });
            tp.clientTab.pages[0].addSeparator();
            initModule({ location: tp.clientTab.pages[0], title: "Reset", storeAs: "clear", button: "DELETE", clickFunction: function(){
                const userConfirmed=confirm("Are you sure you want to continue? This will clear all stored module states and keybinds.");
                if (userConfirmed) {
                    initMenu(true);
                    alert("Reset to defaults.");
                };
            },});
            initModule({ location: tp.clientTab.pages[0], title: "Debug", storeAs: "debug", bindLocation: tp.clientTab.pages[1], });


        if (!AUTOMATED) {
            if (!load("ShellFarmConfigMainPanel") || reset) {
                saveConfig();
            } else {
                console.log("##############################################")
                tp.mainPanel.importPreset(load("ShellFarmConfigMainPanel"));
            };
        };

        updateConfig();

        setTimeout(() => {
            if (AUTOMATED) { //why after 500ms? perhaps we'll never know. maybe because it gives a visual indication that SHELLFARM is SHELLFARMing.
                tp.mainPanel.hidden = true;
            };
            updateHiddenAndDisabled();
        }, 500);

        menuInitiated = true;

        makeDraggable(tp.mainPanel.containerElem_);
    };
    const onContentLoaded = function () {
        console.log("ShellFarm: initMenu()");
        initMenu();
        console.log("ShellFarm: applyStylesAddElements()");
        applyStylesAddElements(); //set font and change menu cass, and other stuff to do with the page
        const intervalId1 = setInterval(everySecond, 1000);
        const intervalId2 = setInterval(everyDecisecond, 100);
    };
    //visual functions
    const createPopup = function (text, type) {
        console.log("Creating Popup Type:", type, "With Text:", text);
        try {
            if (extract("popups")) {
                const messageContainer = document.getElementById('message-container');
                const messages = messageContainer.getElementsByClassName(scrambledMsgEl);
                if (messages.length > 5) {
                    messageContainer.removeChild(messages[0]);
                };
                const clonedMsgElement = msgElement.cloneNode(true);
                clonedMsgElement.innerText = text;
                switch (type) {
                    case ("success"):
                        clonedMsgElement.style.border = '2px solid rgba(0, 255, 0, 0.5)'; break;
                    case ("error"):
                        clonedMsgElement.style.border = '2px solid rgba(255, 0, 0, 0.5)'; break;
                };
                clonedMsgElement.style.display = 'none';
                const messageOffset = (messages.length + 1) * 50;
                clonedMsgElement.style.bottom = messageOffset + "px";
                void clonedMsgElement.offsetWidth;
                clonedMsgElement.style.display = '';
                messageContainer.appendChild(clonedMsgElement);
                //reorder such that newest is lowest
                for (let i = messages.length - 1; i >= 0; i--) {
                    messages[i].style.bottom = (((messages.length - i) * 50) - 40) + "px";
                };
            };
        } catch (error) {
            // Handle the error and display an error message onscreen
            console.error("An error occurred:", error);
            alert("Bollocks! If you're getting this message, injection probably failed. To solve this, perform CTRL+F5 - this performs a hard reload. If this does not work, contact the developers.");
        };
    };

    const applyStylesAddElements = function (themeToApply = "null") {
        const head = document.head || document.getElementsByTagName('head').pages[0];

        //menu customisation (apply font, button widths, adjust checkbox right slightly, make menu appear on top, add anim to message)
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            @font-face {
                font-family: "Bahnschrift";
                src: url("https://db.onlinewebfonts.com/t/0a6ee448d1bd65c56f6cf256a7c6f20a.eot");
                src: url("https://db.onlinewebfonts.com/t/0a6ee448d1bd65c56f6cf256a7c6f20a.eot?#iefix")format("embedded-opentype"),
                url("https://db.onlinewebfonts.com/t/0a6ee448d1bd65c56f6cf256a7c6f20a.woff2")format("woff2"),
                url("https://db.onlinewebfonts.com/t/0a6ee448d1bd65c56f6cf256a7c6f20a.woff")format("woff"),
                url("https://db.onlinewebfonts.com/t/0a6ee448d1bd65c56f6cf256a7c6f20a.ttf")format("truetype"),
                url("https://db.onlinewebfonts.com/t/0a6ee448d1bd65c56f6cf256a7c6f20a.svg#Bahnschrift")format("svg");
            }
            .tp-dfwv, .tp-sglv_i, .tp-rotv_t, .tp-fldv_t, .tp-ckbv_l, .tp-txtv_i, .tp-lblv_l, .tp-tbiv_t, .coords, .gameinfo, .playerstats {
                font-family: 'Bahnschrift', sans-serif !important;
                font-size: 16px;
                z-index: 9999 !important;
            }
            .tp-rotv_m, .tp-fldv_m {
                display: none;
            }
            .tp-dfwv {
                min-width: 300px;
            }
            .tp-rotv_t {
                cursor: move;
                user-select: none;
            }
            .tp-tbiv_t {
                font-family: 'Bahnschrift';
                font-size: 13px;
            }
            .tp-lblv_v, .tp-lstv, .tp-btnv_b, .tp-btnv_t {
                font-family: 'Bahnschrift';
                font-size: 12px;
            }
            .tp-mllv {
                font-family: 'Bahnschrift';
                font-size: 12px;
                letter-spacing: -1px;
                width: 290px;
                margin-left: -130px !important;
            }
            .tp-mllv_i::-webkit-scrollbar-thumb {
                background-color: #888; /* Adjust the color as needed */
                border: 2px solid #555; /* Change the color of the border and adjust the width as needed */
            }
            .tp-mllv_i::-webkit-scrollbar-track {
                background-color: #000; /* Change the color as needed */
            }
            .tp-lblv_l {
                font-size: 14px;
                letter-spacing: -1px;
            }
            .tp-btnv {
                width: 100px;
                margin-left: 60px !important;
            }
            .tp-ckbv_w {
                margin-left: 4px !important;
            }
            .tp-dfwv, .tp-rotv, .tp-rotv_c, .tp-fldv, .tp-fldv_c, .tp-lblv, .tp-lstv, .tp-btnv, .tp-sldv {
                z-index: 99999 !important;
                white-space: nowrap !important;
            }
            @keyframes msg {
                from {
                    transform: translate(-120%, 0);
                    opacity: 0;
                }
                to {
                    transform: none;
                    opacity: 1;
                }
            }
        `;

        document.head.appendChild(styleElement);
        applyTheme();

        //initiate message div and css and shit
        msgElement = document.createElement('div'); // create the element directly
        scrambledMsgEl = getScrambled();
        msgElement.classList.add(scrambledMsgEl);
        msgElement.setAttribute('style', `
            position: absolute;
            left: 10px;
            color: #fff;
            background: rgba(0, 0, 0, 0.7);
            font-weight: normal;
            padding: 10px;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            border: 2px solid rgba(255, 255, 255, 0.5);
            animation: msg 0.5s forwards, msg 0.5s reverse forwards 3s;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
            font-family: 'Bahnschrift', sans-serif !important;
            font-size: 16px;
            z-index: 9999 !important;
        `);
        document.body.appendChild(msgElement);
        msgElement.style.display = 'none';
        const messageContainer = document.createElement('div'); //so it can be cloned. i think.
        messageContainer.id = 'message-container';
        document.body.appendChild(messageContainer);
        //initiate coord div and css and shit
        coordElement = document.createElement('div'); // create the element directly
        coordElement.classList.add('coords');
        coordElement.setAttribute('style', `
            position: fixed;
            top: 0px;
            left: 0px;
            height: auto;
            max-height: 30px;
            min-height: 30px;
            text-wrap: nowrap;
            color: #fff;
            background: rgba(0, 0, 0, 0.6);
            font-weight: bolder;
            padding: 2px;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            border: 2px solid rgba(255, 255, 255, 0.5);
            z-index: 999999;
        `);
        document.body.appendChild(coordElement);
        coordElement.style.display = 'none';
        //initiate game info div and css and shit
        gameInfoElement = document.createElement('div'); // create the element directly
        gameInfoElement.classList.add('gameinfo');
        gameInfoElement.setAttribute('style', `
            position: fixed;
            bottom: 0px;
            left: 0px;
            height: auto;
            max-height: 30px;
            min-height: 30px;
            text-wrap: nowrap;
            color: #fff;
            background: rgba(0, 0, 0, 0.6);
            font-weight: bolder;
            padding: 2px;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            border: 2px solid rgba(255, 255, 255, 0.5);
            z-index: 999999;
        `);
        document.body.appendChild(gameInfoElement);
        gameInfoElement.style.display = 'none';
        //initiate hp div and css and shit
        playerstatsElement = document.createElement('div'); // create the element directly
        playerstatsElement.classList.add('playerstats');
        playerstatsElement.setAttribute('style', `
            position: absolute;
            top: 20px;
            left: 280px;
            height: auto;
            min-height: 30px;
            text-wrap: nowrap;
            color: #fff;
            background: rgba(0, 0, 0, 0.6);
            font-weight: bolder;
            padding: 10px;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            border: 2px solid rgba(255, 255, 255, 0.5);
            z-index: 999999;
        `);
        document.body.appendChild(playerstatsElement);
        playerstatsElement.style.display = 'none';

        if (load("HUD-Positions") == null) {
            hudElementPositions.coordElement = { top: coordElement.getBoundingClientRect().top, left: coordElement.getBoundingClientRect().left };
            hudElementPositions.gameInfoElement = { top: gameInfoElement.getBoundingClientRect().top, left: gameInfoElement.getBoundingClientRect().left };
            hudElementPositions.playerstatsElement = { top: playerstatsElement.getBoundingClientRect().top, left: playerstatsElement.getBoundingClientRect().left };
            save("HUD-Positions", hudElementPositions);
        } else {
            hudElementPositions = load("HUD-Positions");

            coordElement.style.top = hudElementPositions.coordElement.top + "px";
            gameInfoElement.style.top = hudElementPositions.gameInfoElement.top + "px";
            playerstatsElement.style.top = hudElementPositions.playerstatsElement.top + "px";

            coordElement.style.left = hudElementPositions.coordElement.left + "px";
            gameInfoElement.style.left = hudElementPositions.gameInfoElement.left + "px";
            playerstatsElement.style.left = hudElementPositions.playerstatsElement.left + "px";
        };
    };

    const makeDraggable = function (element, notMenu) {
        if (element) {
            let offsetX, offsetY;
            element.addEventListener('mousedown', function (e) {
                const dragElement = function (e) {
                    const x = (e.clientX - offsetX) / unsafeWindow.innerWidth * 100;
                    const y = (e.clientY - offsetY) / unsafeWindow.innerHeight * 100;
                    const maxX = 100 - (element.offsetWidth / unsafeWindow.innerWidth * 100);
                    const maxY = 100 - (element.offsetHeight / unsafeWindow.innerHeight * 100);
                    element.style.left = `${Math.max(0, Math.min(x, maxX))}%`;
                    element.style.top = `${Math.max(0, Math.min(y, maxY))}%`;
                };
                if (notMenu || e.target.classList.contains('tp-rotv_t')) {
                    offsetX = e.clientX - element.getBoundingClientRect().left;
                    offsetY = e.clientY - element.getBoundingClientRect().top;
                    document.addEventListener('mousemove', dragElement);
                    document.addEventListener('mouseup', function () {
                        document.removeEventListener('mousemove', dragElement);
                    });
                    e.preventDefault(); // Prevent text selection during drag
                };
            });
        };
    };

    const makeHudElementDragable = function (element) {
        if (element.getAttribute("drag-true") != "true") {
            element.addEventListener("mousedown", function (e) {
                let offsetX = e.clientX - parseInt(window.getComputedStyle(this).left);
                let offsetY = e.clientY - parseInt(window.getComputedStyle(this).top);

                function mouseMoveHandler(e) {
                    let newX = e.clientX - offsetX;
                    let newY = e.clientY - offsetY;
                    if (newX >= 0 && newX + element.getBoundingClientRect().width <= window.innerWidth) {
                        element.style.left = newX + "px";
                    };
                    if (newY >= 0 && newY + element.getBoundingClientRect().height <= window.innerHeight) {
                        element.style.top = newY + "px";
                    };
                };

                function reset() {
                    window.removeEventListener("mousemove", mouseMoveHandler);
                    window.removeEventListener("mouseup", reset);

                    //saves new positions
                    hudElementPositions.coordElement = { "top": coordElement.getBoundingClientRect().top, "left": coordElement.getBoundingClientRect().left };
                    hudElementPositions.gameInfoElement = { "top": gameInfoElement.getBoundingClientRect().top, "left": gameInfoElement.getBoundingClientRect().left };
                    hudElementPositions.playerstatsElement = { "top": playerstatsElement.getBoundingClientRect().top, "left": playerstatsElement.getBoundingClientRect().left };
                    save("HUD-Positions", hudElementPositions);
                };

                window.addEventListener("mousemove", mouseMoveHandler);
                window.addEventListener("mouseup", reset);
            });

            element.setAttribute("drag-true", "true");
        };
    };

    const applyTheme = function (setTheme) {
        setTheme = (setTheme || extract("themeType") || "defaultTheme");
        let rootTheme
        switch (setTheme) {
            case ("defaultTheme"):
                rootTheme = `
                --tp-base-background-color: hsla(230, 7%, 17%, 1.00);
                --tp-base-shadow-color: hsla(0, 0%, 0%, 0.2);
                --tp-button-background-color: hsla(230, 7%, 70%, 1.00);
                --tp-button-background-color-active: hsla(230, 7%, 85%, 1.00);
                --tp-button-background-color-focus: hsla(230, 7%, 80%, 1.00);
                --tp-button-background-color-hover: hsla(230, 7%, 75%, 1.00);
                --tp-button-foreground-color: hsla(230, 7%, 17%, 1.00);
                --tp-container-background-color: hsla(230, 7%, 75%, 0.10);
                --tp-container-background-color-active: hsla(230, 7%, 75%, 0.25);
                --tp-container-background-color-focus: hsla(230, 7%, 75%, 0.20);
                --tp-container-background-color-hover: hsla(230, 7%, 75%, 0.15);
                --tp-container-foreground-color: hsla(230, 7%, 75%, 1.00);
                --tp-groove-foreground-color: hsla(230, 7%, 75%, 0.10);
                --tp-input-background-color: hsla(230, 7%, 75%, 0.10);
                --tp-input-background-color-active: hsla(230, 7%, 75%, 0.25);
                --tp-input-background-color-focus: hsla(230, 7%, 75%, 0.20);
                --tp-input-background-color-hover: hsla(230, 7%, 75%, 0.15);
                --tp-input-foreground-color: hsla(230, 7%, 75%, 1.00);
                --tp-label-foreground-color: hsla(230, 7%, 75%, 0.70);
                --tp-monitor-background-color: hsla(230, 7%, 0%, 0.20);
                --tp-monitor-foreground-color: hsla(230, 7%, 75%, 0.70);`; break;
            case ("icebergTheme"):
                rootTheme = `
                --tp-base-background-color: hsla(230, 20%, 11%, 1.00);
                --tp-base-shadow-color: hsla(0, 0%, 0%, 0.2);
                --tp-button-background-color: hsla(230, 10%, 80%, 1.00);
                --tp-button-background-color-active: hsla(230, 10%, 95%, 1.00);
                --tp-button-background-color-focus: hsla(230, 10%, 90%, 1.00);
                --tp-button-background-color-hover: hsla(230, 10%, 85%, 1.00);
                --tp-button-foreground-color: hsla(230, 20%, 11%, 1);
                --tp-container-background-color: hsla(230, 25%, 16%, 1.00);
                --tp-container-background-color-active: hsla(230, 25%, 31%, 1.00);
                --tp-container-background-color-focus: hsla(230, 25%, 26%, 1.00);
                --tp-container-background-color-hover: hsla(230, 25%, 21%, 1.00);
                --tp-container-foreground-color: hsla(230, 10%, 80%, 1.00);
                --tp-groove-foreground-color: hsla(230, 20%, 8%, 1.00);
                --tp-input-background-color: hsla(230, 20%, 8%, 1.00);
                --tp-input-background-color-active: hsla(230, 28%, 23%, 1.00);
                --tp-input-background-color-focus: hsla(230, 28%, 18%, 1.00);
                --tp-input-background-color-hover: hsla(230, 20%, 13%, 1.00);
                --tp-input-foreground-color: hsla(230, 10%, 80%, 1.00);
                --tp-label-foreground-color: hsla(230, 12%, 48%, 1.00);
                --tp-monitor-background-color: hsla(230, 20%, 8%, 1.00);
                --tp-monitor-foreground-color: hsla(230, 12%, 48%, 1.00);`; break;
            case ("jetblackTheme"):
                rootTheme = `
                --tp-base-background-color: hsla(0, 0%, 0%, 1.00);
                --tp-base-shadow-color: hsla(0, 0%, 0%, 0.2);
                --tp-button-background-color: hsla(0, 0%, 70%, 1.00);
                --tp-button-background-color-active: hsla(0, 0%, 85%, 1);
                --tp-button-background-color-focus: hsla(0, 0%, 80%, 1.00);
                --tp-button-background-color-hover: hsla(0, 0%, 75%, 1.00);
                --tp-button-foreground-color: hsla(0, 0%, 0%, 1.00);
                --tp-container-background-color: hsla(0, 0%, 10%, 1.00);
                --tp-container-background-color-active: hsla(0, 0%, 25%, 1.00);
                --tp-container-background-color-focus: hsla(0, 0%, 20%, 1.00);
                --tp-container-background-color-hover: hsla(0, 0%, 15%, 1.00);
                --tp-container-foreground-color: hsla(0, 0%, 50%, 1.00);
                --tp-groove-foreground-color: hsla(0, 0%, 10%, 1.00);
                --tp-input-background-color: hsla(0, 0%, 10%, 1.00);
                --tp-input-background-color-active: hsla(0, 0%, 25%, 1.00);
                --tp-input-background-color-focus: hsla(0, 0%, 20%, 1.00);
                --tp-input-background-color-hover: hsla(0, 0%, 15%, 1.00);
                --tp-input-foreground-color: hsla(0, 0%, 70%, 1.00);
                --tp-label-foreground-color: hsla(0, 0%, 50%, 1.00);
                --tp-monitor-background-color: hsla(0, 0%, 8%, 1.00);
                --tp-monitor-foreground-color: hsla(0, 0%, 48%, 1.00);`; break;
            case ("lightTheme"):
                rootTheme = `
                --tp-base-background-color: hsla(230, 5%, 90%, 1.00);
                --tp-base-shadow-color: hsla(0, 0%, 0%, 0.10);
                --tp-button-background-color: hsla(230, 7%, 75%, 1.00);
                --tp-button-background-color-active: hsla(230, 7%, 60%, 1.00);
                --tp-button-background-color-focus: hsla(230, 7%, 65%, 1.00);
                --tp-button-background-color-hover: hsla(230, 7%, 70%, 1.00);
                --tp-button-foreground-color: hsla(230, 10%, 30%, 1.00);
                --tp-container-background-color: hsla(230, 15%, 30%, 0.20);
                --tp-container-background-color-active: hsla(230, 15%, 30%, 0.32);
                --tp-container-background-color-focus: hsla(230, 15%, 30%, 0.28);
                --tp-container-background-color-hover: hsla(230, 15%, 30%, 0.24);
                --tp-container-foreground-color: hsla(230, 10%, 30%, 1.00);
                --tp-groove-foreground-color: hsla(230, 15%, 30%, 0.10);
                --tp-input-background-color: hsla(230, 15%, 30%, 0.10);
                --tp-input-background-color-active: hsla(230, 15%, 30%, 0.22);
                --tp-input-background-color-focus: hsla(230, 15%, 30%, 0.18);
                --tp-input-background-color-hover: hsla(230, 15%, 30%, 0.14);
                --tp-input-foreground-color: hsla(230, 10%, 30%, 1.00);
                --tp-label-foreground-color: hsla(230, 10%, 30%, 0.70);
                --tp-monitor-background-color: hsla(230, 15%, 30%, 0.10);
                --tp-monitor-foreground-color: hsla(230, 10%, 30%, 0.50);`; break;
            case ("retroTheme"):
                rootTheme = `
                --tp-base-background-color: hsla(40, 3%, 90%, 1.00);
                --tp-base-shadow-color: hsla(0, 0%, 0%, 0.30);
                --tp-button-background-color: hsla(40, 3%, 70%, 1.00);
                --tp-button-background-color-active: hsla(40, 3%, 55%, 1.00);
                --tp-button-background-color-focus: hsla(40, 3%, 60%, 1.00);
                --tp-button-background-color-hover: hsla(40, 3%, 65%, 1.00);
                --tp-button-foreground-color: hsla(40, 3%, 20%, 1.00);
                --tp-container-background-color: hsla(40, 3%, 70%, 1.00);
                --tp-container-background-color-active: hsla(40, 3%, 55%, 1.00);
                --tp-container-background-color-focus: hsla(40, 3%, 60%, 1.00);
                --tp-container-background-color-hover: hsla(40, 3%, 65%, 1.00);
                --tp-container-foreground-color: hsla(40, 3%, 20%, 1.00);
                --tp-groove-foreground-color: hsla(40, 3%, 40%, 1.00);
                --tp-input-background-color: hsla(120, 3%, 20%, 1.00);
                --tp-input-background-color-active: hsla(120, 3%, 35%, 1.00);
                --tp-input-background-color-focus: hsla(120, 3%, 30%, 1.00);
                --tp-input-background-color-hover: hsla(120, 3%, 25%, 1.00);
                --tp-input-foreground-color: hsla(120, 40%, 60%, 1.00);
                --tp-label-foreground-color: hsla(40, 3%, 50%, 1.00);
                --tp-monitor-background-color: hsla(120, 3%, 20%, 1.00);
                --tp-monitor-foreground-color: hsla(120, 40%, 60%, 0.80);`; break;
            case ("translucentTheme"):
                rootTheme = `
                --tp-base-background-color: hsla(0, 0%, 10%, 0.80);
                --tp-base-shadow-color: hsla(0, 0%, 0%, 0.20);
                --tp-button-background-color: hsla(0, 0%, 80%, 1.00);
                --tp-button-background-color-active: hsla(0, 0%, 100%, 1.00);
                --tp-button-background-color-focus: hsla(0, 0%, 95%, 1.00);
                --tp-button-background-color-hover: hsla(0, 0%, 85%, 1.00);
                --tp-button-foreground-color: hsla(0, 0%, 0%, 0.80);
                --tp-container-background-color: hsla(0, 0%, 0%, 0.30);
                --tp-container-background-color-active: hsla(0, 0%, 0%, 0.60);
                --tp-container-background-color-focus: hsla(0, 0%, 0%, 0.50);
                --tp-container-background-color-hover: hsla(0, 0%, 0%, 0.40);
                --tp-container-foreground-color: hsla(0, 0%, 100%, 0.50);
                --tp-groove-foreground-color: hsla(0, 0%, 0%, 0.20);
                --tp-input-background-color: hsla(0, 0%, 0%, 0.30);
                --tp-input-background-color-active: hsla(0, 0%, 0%, 0.60);
                --tp-input-background-color-focus: hsla(0, 0%, 0%, 0.50);
                --tp-input-background-color-hover: hsla(0, 0%, 0%, 0.40);
                --tp-input-foreground-color: hsla(0, 0%, 100%, 0.50);
                --tp-label-foreground-color: hsla(0, 0%, 100%, 0.50);
                --tp-monitor-background-color: hsla(0, 0%, 0%, 0.30);
                --tp-monitor-foreground-color: hsla(0, 0%, 100%, 0.30);`; break;
            case ("blurpleTheme"):
                rootTheme = `
                --tp-base-background-color: hsla(255, 68%, 39%, 1.00);
                --tp-base-shadow-color: hsla(0, 0%, 0%, 0.2);
                --tp-button-background-color: hsla(0, 0%, 100%, 1.00);
                --tp-button-background-color-active: hsla(0, 0%, 85%, 1.00);
                --tp-button-background-color-focus: hsla(0, 0%, 90%, 1.00);
                --tp-button-background-color-hover: hsla(0, 0%, 95%, 1.00);
                --tp-button-foreground-color: hsla(230, 20%, 11%, 1.00);
                --tp-container-background-color: hsla(0, 0%, 0%, 0.20);
                --tp-container-background-color-active: hsla(0, 0%, 0%, 0.35);
                --tp-container-background-color-focus: hsla(0, 0%, 0%, 0.30);
                --tp-container-background-color-hover: hsla(0, 0%, 0%, 0.25);
                --tp-container-foreground-color: hsla(0, 0%, 100%, 0.90);
                --tp-groove-foreground-color: hsla(0, 0%, 0%, 0.50);
                --tp-input-background-color: hsla(0, 0%, 0%, 0.50);
                --tp-input-background-color-active: hsla(0, 0%, 0%, 0.65);
                --tp-input-background-color-focus: hsla(0, 0%, 0%, 0.60);
                --tp-input-background-color-hover: hsla(0, 0%, 0%, 0.55);
                --tp-input-foreground-color: hsla(0, 0%, 100%, 0.90);
                --tp-label-foreground-color: hsla(0, 0%, 100%, 0.90);
                --tp-monitor-background-color: hsla(0, 0%, 0%, 0.50);
                --tp-monitor-foreground-color: hsla(0, 0%, 100%, 0.50);`; break;
            case ("shellFarmTheme"):
                rootTheme = `
                --tp-base-background-color: hsla(198, 100%, 50%, 1.00);
                --tp-base-shadow-color: hsla(0, 0%, 0%, 0.2);
                --tp-button-background-color: hsla(0, 0%, 100%, 1.00);
                --tp-button-background-color-active: hsla(0, 0%, 85%, 1.00);
                --tp-button-background-color-focus: hsla(0, 0%, 90%, 1.00);
                --tp-button-background-color-hover: hsla(0, 0%, 95%, 1.00);
                --tp-button-foreground-color: hsla(230, 20%, 11%, 1.00);
                --tp-container-background-color: hsla(0, 0%, 0%, 0.20);
                --tp-container-background-color-active: hsla(0, 0%, 0%, 0.35);
                --tp-container-background-color-focus: hsla(0, 0%, 0%, 0.30);
                --tp-container-background-color-hover: hsla(0, 0%, 0%, 0.25);
                --tp-container-foreground-color: hsla(0, 0%, 100%, 0.90);
                --tp-groove-foreground-color: hsla(0, 0%, 0%, 0.50);
                --tp-input-background-color: hsla(0, 0%, 0%, 0.50);
                --tp-input-background-color-active: hsla(0, 0%, 0%, 0.65);
                --tp-input-background-color-focus: hsla(0, 0%, 0%, 0.60);
                --tp-input-background-color-hover: hsla(0, 0%, 0%, 0.55);
                --tp-input-foreground-color: hsla(0, 0%, 100%, 0.90);
                --tp-label-foreground-color: hsla(0, 0%, 100%, 0.90);
                --tp-monitor-background-color: hsla(0, 0%, 0%, 0.50);
                --tp-monitor-foreground-color: hsla(0, 0%, 100%, 0.50);`; break;
        };

        //menu customisation (apply font, button widths, adjust checkbox right slightly, make menu appear on top, add anim to message)
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            :root { ${rootTheme} }
        `;
        document.head.appendChild(styleElement);
    };
    const fetchTextContent = function (url) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.send();
        if (xhr.status === 200) {
            return xhr.responseText;
        } else {
            console.error("Error fetching " + url);
            return null;
        };
    };
    const findKeyByValue = function (obj, value) {
        for (const key in obj) {
            if (obj[key] === value) {
                return key;
            };
        };
        return null; // Return null if the value is not found
    };
    const newProxy = function () {
        unsafeWindow.location.replace(unsafeWindow.location.href.replace(unsafeWindow.location.hostname, proxyList[3]));
    };
    const reloadPage = function () {
        unsafeWindow.location.reload(true);
    };

    const hexToRgb = function (hex) {
        hex = hex.replace(/^#/, '');
        const bigint = parseInt(hex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return [r / 255, g / 255, b / 255];
    };
    const fadeBetweenColors = function (color1, color2, progress) {
        const rgb1 = hexToRgb(color1);
        const rgb2 = hexToRgb(color2);
        const resultRgb = [
            rgb1[0] + (rgb2[0] - rgb1[0]) * progress,
            rgb1[1] + (rgb2[1] - rgb1[1]) * progress,
            rgb1[2] + (rgb2[2] - rgb1[2]) * progress
        ];
        return resultRgb;
    };
    const distancePlayers = function (player, yMultiplier) {
        yMultiplier = yMultiplier || 1;
        let vector = getDirectionVectorFacingTarget(player);
        return Math.hypot(vector.x, vector.y * yMultiplier, vector.z); //pythagoras' theorem in 3 dimensions. no one owns maths, zert.
    };
    const setPrecision = function (value) { return Math.round(value * 8192) / 8192 }; //required precision
    const calculateYaw = function (pos) {
        return setPrecision(Math.mod(Math.atan2(pos.x, pos.z), Math.PI2));
    };
    const calculatePitch = function (pos) {
        return setPrecision(-Math.atan2(pos.y, Math.hypot(pos.x, pos.z)) % 1.5);
    };
    const getDirectionVectorFacingTarget = function (target, vectorPassed, offsetY) {
        target = vectorPassed ? target : target[H.actor][H.mesh].position;
        offsetY = offsetY || 0;
        return {
            x: target.x - ss.MYPLAYER[H.actor][H.mesh].position.x,
            y: target.y - ss.MYPLAYER[H.actor][H.mesh].position.y + offsetY,
            z: target.z - ss.MYPLAYER[H.actor][H.mesh].position.z,
        };
    };
    const isPartialMatch = function (array, searchString) {
        return array.some(item => item !== "" && searchString.toLowerCase().includes(item.toLowerCase()));
    };
    const playAudio = function (name, panner, contextName) {
        contextName = findStringInLists(divertContexts, name) || "OTHER";
        let audioContext;
        audioContext = audioContexts[contextName];
        let source = audioContext.createBufferSource();
        source.buffer = soundsSFC[name];

        const newPanner = audioContext.createPanner();
        audioContext.listener.setPosition(0, 0, 0);

        if (panner) {
            newPanner.context.listener.setPosition(panner.context.listener.positionX.value, panner.context.listener.positionY.value, panner.context.listener.positionZ.value);
            newPanner.setPosition(
                panner.context.listener.positionX.value - ((panner.context.listener.positionX.value - panner.positionX.value) * extract("distanceMult")),
                panner.context.listener.positionY.value - ((panner.context.listener.positionY.value - panner.positionY.value) * extract("distanceMult")),
                panner.context.listener.positionZ.value - ((panner.context.listener.positionZ.value - panner.positionZ.value) * extract("distanceMult")),
            );
            newPanner.setOrientation(panner.orientationX.value, panner.orientationY.value, panner.orientationZ.value);
            newPanner.refDistance = panner.refDistance;
            newPanner.maxDistance = panner.maxDistance;
            newPanner.rolloffFactor = panner.rolloffFactor;
            newPanner.coneInnerAngle = panner.coneInnerAngle;
            newPanner.coneOuterAngle = panner.coneOuterAngle;
            newPanner.coneOuterGain = panner.coneOuterGain;
        };
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        };
        console.log(contextName);
        source.connect(newPanner);
        newPanner.connect(audioContext.destination);
        source.start();
    };
    const playerMatchesList = function (array, player) {
        let nameMatched = isPartialMatch(array, player.name);
        let idMatched = isPartialMatch(array, player.uniqueId);
        return nameMatched || idMatched;
    };
    const randomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    const radianAngleDiff = function (angle1, angle2) {
        const fullCircle = 2 * Math.PI;
        // Normalize angles to be within [0, 2π)
        angle1 = (angle1 % fullCircle + fullCircle) % fullCircle;
        angle2 = (angle2 % fullCircle + fullCircle) % fullCircle;
        // Find the absolute angular difference
        let diff = Math.abs(angle1 - angle2);
        // Ensure the difference is within [0, π)
        diff = Math.min(diff, fullCircle - diff);
        // Determine the sign of the difference correctly
        if ((angle1 - angle2 + fullCircle) % fullCircle > Math.PI) {
            return -diff;
        } else {
            return diff;
        };
    };
    clientID = (getScrambled() + "noID");
    const createAnonFunction = function (name, func) {
        const funcName = getScrambled();
        unsafeWindow[funcName] = func;
        F[name] = unsafeWindow[funcName];
        functionNames[name] = funcName
    };
    const processChatItem = function (text, playerName, playerTeam, highlightColor) {
        let chatItem = document.createElement("div");
        let playerNameSpan = document.createElement("span");
        let playerInfoContainer = document.createElement("div");
        let serverIcon = document.createElement("i");

        chatItem.classList.add("chat-item");
        playerInfoContainer.style.display = "inline-block";

        playerNameSpan.classList.add("chat-player-name", "ss_marginright_xs");
        playerNameSpan.textContent = playerName + " ";

        playerInfoContainer.style.color = TEAMCOLORS[playerTeam];
        playerInfoContainer.appendChild(serverIcon);
        playerInfoContainer.appendChild(playerNameSpan);

        let messageSpan = document.createElement("span");
        messageSpan.innerHTML = text;
        chatItem.style.fontStyle = "italic";
        messageSpan.style.backgroundColor = highlightColor;
        playerInfoContainer.style.backgroundColor = highlightColor;

        chatItem.appendChild(playerInfoContainer);
        chatItem.appendChild(messageSpan);

        document.getElementById("chatOut").appendChild(chatItem);

        if (document.querySelector(".chat-container")) {
            document.querySelector(".chat-container").scrollTop = document.querySelector(".chat-container").scrollHeight;
        };
    };
    const everySecond = function () {
        if (extract("debug")) {
            unsafeWindow.globalSS = {};
            unsafeWindow.globalSS.ss = ss;
            unsafeWindow.globalSS.H = H;
            unsafeWindow.globalSS.F = F;
            unsafeWindow.globalSS.L = L;
            unsafeWindow.globalSS.tp = tp;
            unsafeWindow.globalSS.initMenu = initMenu;
            unsafeWindow.globalSS.extractAsDropdownInt = extractAsDropdownInt;
            unsafeWindow.globalSS.extract = extract;
            unsafeWindow.globalSS.extractDropdownList = extractDropdownList;
            unsafeWindow.globalSS.save = save;
            unsafeWindow.globalSS.load = load;
            unsafeWindow.globalSS.remove = remove;
            unsafeWindow.globalSS.change = change;
            unsafeWindow.globalSS.GM_listValues = GM_listValues;
            unsafeWindow.globalSS.GM_getValue = GM_getValue;
            unsafeWindow.globalSS.GM_setValue = GM_setValue;
            unsafeWindow.globalSS.getScrambled = getScrambled;
            unsafeWindow.globalSS.soundsSFC = soundsSFC;
            unsafeWindow.globalSS.createPopup = createPopup;
        };
        startUpComplete = (!document.getElementById("progressBar"));

        allFolders.forEach(function (name) {
            save(name, tp[name].expanded);
        });

        coordElement.style.display = "none";
        gameInfoElement.style.display = "none";
        playerstatsElement.style.display = "none";
        makeHudElementDragable(coordElement);
        makeHudElementDragable(gameInfoElement);
        makeHudElementDragable(playerstatsElement);
        if (extract("gameBlacklistCodes") != "" && extract("gameBlacklistCodes") != undefined) {
            let input = extract("gameBlacklistCodes");
            input = input.split(",");
            input.forEach(function (code) {
                if (code != "" && code.length == 7) {
                    blacklistedGameCodes.push(code);
                }
            });
        };

        if (extract('spoofVIP') && document.getElementById("chickenBadge")) document.getElementById("chickenBadge").style.display = "block";
        else if (!extract('spoofVIP') && document.getElementById("chickenBadge")) document.getElementById("chickenBadge").style.display = 'none';

        const fetchAndProcessAudioFromZip = async function (zipURL) {
            try {
                const response = await fetch(zipURL);
                if (!response.ok) {
                    throw new Error('Failed to fetch ZIP:', response.statusText);
                };
                const arrayBuffer = await response.arrayBuffer();
                const zip = await JSZip.loadAsync(arrayBuffer); // eslint-disable-line
                const mp3Files = Object.keys(zip.files).filter(fileName => fileName.endsWith('.mp3'));
                const jsonFiles = Object.keys(zip.files).filter(fileName => fileName.endsWith('.json'));
                const totalRequests = mp3Files.length + jsonFiles.length;
                let config = {};

                if (jsonFiles.length > 0) {
                    const jsonFileData = await zip.file(jsonFiles[0]).async('string');
                    config = { ...config, ...JSON.parse(jsonFileData) };
                };

                let loadedCount = 0;

                mp3Files.forEach(async (fileName, index) => {
                    const fileData = await zip.file(fileName).async('arraybuffer');
                    const audioBuffer = await audioContexts.SOUNDS.decodeAudioData(fileData);
                    const key = fileName.replace('.mp3', '');
                    audioBuffer.disablePanning = !!config.disablePanning;
                    soundsSFC[key] = audioBuffer;
                    console.log("Loaded sound for:", key);
                    loadedCount++;

                    if (loadedCount === totalRequests) {
                        createPopup("Loaded Custom SFX!", "success");
                        console.log("LOADED!");
                    };
                });
            } catch (error) {
                console.error('Error fetching/decoding audio from ZIP:', error);
            };
        };

        if (initialisedCustomSFX !== extract("customSFX")) {
            initialisedCustomSFX = extract("customSFX");
            console.log("STARTING TO LOAD CUSTOM SFX...", initialisedCustomSFX);
            soundsSFC = {};
            if (initialisedCustomSFX !== true && initialisedCustomSFX !== "default") {
                createPopup("Loading Custom SFX...");

                // Make the request to fetch and process audio data from the ZIP file
                fetchAndProcessAudioFromZip(JSON.parse(initialisedCustomSFX));
            };
        };

        if (startUpComplete && ss && ss.MYPLAYER && unsafeWindow.extern.inGame) {
            if (extract("gameInfo")) {
                let gameInfoText = GAMECODE + " | " + playersInGame + "/18 | " + (18 - playersInGame) + " slots remaining. | Server: " + unsafeWindow.vueData.currentRegionId + " | Gamemode: " + findKeyByValue(unsafeWindow.extern.GameType, unsafeWindow.vueApp.game.gameType) + " | Map: " + unsafeWindow.vueApp.game.mapName + " | Time in game: " + (Math.floor((Date.now() - timeJoinedGame) / 1000)) + "s" + (extract("autoLeave") ? " | AutoLeave: " + (Math.ceil(((timeJoinedGame + (1000 * extract("autoLeaveDelay"))) - Date.now()) / 1000)) + "s" : "");
                gameInfoElement.innerText = gameInfoText;
                void gameInfoElement.offsetWidth;
                gameInfoElement.style.display = '';
            };
            if (extract("leaveEmpty")) {
                if (playersInGame == 1 || playersInGame == 2) { //if literally empty or there is one person remaining
                    createPopup("Left empty game. [LeaveEmpty]")
                    change("leaveGame");
                    playersInGame = 0;
                };
            };
            if (extract("autoLeave")) {
                const remaining = ((timeJoinedGame + (1000 * extract("autoLeaveDelay"))) - Date.now()) / 1000;
                if (remaining <= 0) {
                    createPopup("AutoLeave: Leaving now...");
                    change("leaveGame");
                } else if (autoLeaveReminder > 5 && remaining <= 5) {
                    createPopup("AutoLeave: 5 seconds remaining!");
                } else if (autoLeaveReminder > 10 && remaining <= 10) {
                    createPopup("AutoLeave: 10 seconds remaining");
                };
                // console.log(autoLeaveReminder, remaining);
                autoLeaveReminder = remaining;
            };

            //credits: @2lars and @macintosh2 in the discord :)
            if ((extract("autoTeam") !== "disabled") && ss.MYPLAYER.team !== 0) {
                if ((extract("autoTeam") == "random") ||
                    (extract("autoTeam") == "red") && (ss.MYPLAYER.team == 1) ||
                    (extract("autoTeam") == "blue") && (ss.MYPLAYER.team == 2)) {
                    unsafeWindow.extern.switchTeam();
                };
            };
            if (!ss.MYPLAYER[H.playing]) {
                GAMECODE = unsafeWindow.vueApp.game.shareLinkPopup.url.slice(-7);
                if (extract("autoRespawn")) {
                    var button = document.querySelector('.ss_button.btn_big.btn-dark-bevel.btn-respawn.ss_button.btn_green.bevel_green');
                    if (button) {
                        button.click();
                    };
                };
            };
            addStreamsToInGameUI();
        } else {
            if ((!document.getElementById("progressBar"))) {
                if (extract("autoJoin")) {
                    unsafeWindow.vueApp.externPlayObject(
                        (extract("joinCode").length === 7) ? 2 : 0,
                        unsafeWindow.vueApp.currentGameType,
                        unsafeWindow.vueApp.playerName,
                        -1,
                        extract("joinCode")
                    );
                };
            };
            if (extract("autoRegion") !== "disabled") {
                const region = (extract("autoRegion") == "random" ? extractDropdownList("autoRegion")[randomInt(1, 7)].value : extract("autoRegion"));
                unsafeWindow.vueData.currentRegionId = region;
            };
            if (extract("autoGamemode") !== "disabled") {
                const gamemode = ((extract("autoGamemode") == "random") ? randomInt(0, 3) : (extractAsDropdownInt("autoGamemode") - 1));
                unsafeWindow.vueApp.onGameTypeChanged(gamemode);
            };
        };

        if (startUpComplete) {
            if ((extract("setDetail") !== previousDetail) && (extract("setDetail") !== "disabled")) {
                unsafeWindow.vueApp.settingsUi.togglers.misc[3].value = false;
                if (extract("setDetail") == "autodetail") {
                    unsafeWindow.vueApp.settingsUi.togglers.misc[3].value = true;
                } else if (extract("setDetail") == "nodetails") {
                    unsafeWindow.vueApp.settingsUi.togglers.misc[4].value = false;
                    unsafeWindow.vueApp.settingsUi.togglers.misc[5].value = false;
                } else if (extract("setDetail") == "shadows") {
                    unsafeWindow.vueApp.settingsUi.togglers.misc[4].value = true;
                    unsafeWindow.vueApp.settingsUi.togglers.misc[5].value = false;
                } else if (extract("setDetail") == "highres") {
                    unsafeWindow.vueApp.settingsUi.togglers.misc[4].value = false;
                    unsafeWindow.vueApp.settingsUi.togglers.misc[5].value = true;
                } else if (extract("setDetail") == "shadowshighres") {
                    unsafeWindow.vueApp.settingsUi.togglers.misc[4].value = true;
                    unsafeWindow.vueApp.settingsUi.togglers.misc[5].value = true;
                };
                unsafeWindow.extern.applyUiSettings(unsafeWindow.vueApp.settingsUi);
            };
            previousDetail = extract("setDetail");
        };

        if (extract("eggColour") !== "disabled" && ss?.USERDATA) {
            const colour = extract("eggColour") == "random" ? randomInt(0, 6) : extractAsDropdownInt("eggColour") - 1;
            if (colour !== ss.USERDATA.playerAccount.colorIdx) {
                unsafeWindow.extern.setShellColor(colour);
                unsafeWindow.vueApp.onBackClick();
            };
        };
        if (extract("autoStamp") !== "disabled" && ss?.USERDATA) {
            const stampID = 2000 + (extract("autoStamp") == "random" ? randomInt(1, 6) : extractAsDropdownInt("autoStamp"));
            if (ss.USERDATA && ss.USERDATA.playerAccount) {
                if (stampID !== ((ss.USERDATA.playerAccount.stampItem && ss.USERDATA.playerAccount.stampItem?.id) || -1)) {
                    ss.USERDATA.playerAccount.stampItem = unsafeWindow.extern.catalog.findItemById(stampID);
                    unsafeWindow.vueApp.onBackClick();
                };
            };
        };
        if (extract("autoHat") !== "disabled" && ss?.USERDATA) {
            const hatID = 1000 + (extract("autoHat") == "random" ? randomInt(1, 6) : extractAsDropdownInt("autoHat"));
            if (ss.USERDATA && ss.USERDATA.playerAccount) {
                if (hatID !== ((ss.USERDATA.playerAccount.hatItem && ss.USERDATA.playerAccount.hatItem?.id) || -1)) {
                    ss.USERDATA.playerAccount.hatItem = unsafeWindow.extern.catalog.findItemById(hatID);
                    unsafeWindow.vueApp.onBackClick();
                };
            };
        };
        if (extract("useCustomName")) {
            unsafeWindow.vueApp.setPlayerName(extract("usernameAutoJoin"));
        };
        if ((!ranEverySecond) && startUpComplete) {
            if (extract("autoChickenWinner")) {
                console.log("automatically do chw");
                change("chickenWinner");
            };
            if (extract("autoMacro")) {
                console.log("automatically do your macro");
                change("executeMacro");
            };

            ranEverySecond = true;
        };

        //block ads or something kek
        localStorage.timesPlayed = 0;
    };
    const everyDecisecond = function () {
        updateConfig(); deciSecondsPassed += 1;

        if (ss && ss.MYPLAYER && unsafeWindow.extern.inGame) {
            //innertext stuff, fairly resource intensive. disable these for performance
            if (extract("playerStats")) {
                let playerStates = "";
                ss.PLAYERS.forEach(player => {
                    if (player && (player !== ss.MYPLAYER) && (player[H.hp] > 0) && ((!ss.MYPLAYER.team) || (player.team !== ss.MYPLAYER.team))) {
                        playerStates = playerStates + player.name + ": " + Math.round(player[H.hp]) + " HP\n";
                    };
                });
                if (playerStates == "") { playerStates = "No Enemy Players" };
                playerstatsElement.innerText = playerStates;
                void playerstatsElement.offsetWidth;
                playerstatsElement.style.display = '';
            };
            if (ss.MYPLAYER && ss.MYPLAYER[H.actor] && ss.MYPLAYER[H.actor][H.mesh] && extract("showCoordinates")) {
                const fonx = Number((ss.MYPLAYER[H.actor][H.mesh].position.x).toFixed(3));
                const fony = Number((ss.MYPLAYER[H.actor][H.mesh].position.y).toFixed(3));
                const fonz = Number((ss.MYPLAYER[H.actor][H.mesh].position.z).toFixed(3));
                const yaw = Number((ss.MYPLAYER[H.yaw]).toFixed(3)); //could i function this? yea
                const pitch = Number((ss.MYPLAYER[H.pitch]).toFixed(3));
                const personalCoordinate = `XYZ: ${fonx}, ${fony}, ${fonz} Rot: ${yaw}, ${pitch}`;
                coordElement.innerText = personalCoordinate;
                void coordElement.offsetWidth;
                coordElement.style.display = '';
            };
        };
    };
    const updateConfig = function () {
        configMain = tp.mainPanel.exportPreset();
    };
    const updateHiddenAndDisabledHelper = function (array) { //determines if all conditions are met
        let conditionMet = false;
        array.forEach(condition => {
            if ((extract(condition[0]) ? extract(condition[0]) : false) !== condition[1]) {
                conditionMet = true;
                return;
            };
        });
        return conditionMet;
    }
    const updateHiddenAndDisabled = function () {
        //the format for hidden/disabled modules is as follows:
        //hidden/disabled is an array of arrays. within each of the items, there is the condition required for the module to be shown
        if (menuInitiated) {
            allModules.forEach(module => {
                const tiedModules = tp[module + "TiedModules"];
                if (tiedModules) {
                    if (tiedModules.showConditions) {
                        tp[module + "Button"].hidden = updateHiddenAndDisabledHelper(tiedModules.showConditions);
                    };
                    if (tiedModules.hideConditions) {
                        tp[module + "Button"].hidden = !updateHiddenAndDisabledHelper(tiedModules.hideConditions);
                    };
                    if (tiedModules.enableConditions) {
                        tp[module + "Button"].disabled = updateHiddenAndDisabledHelper(tiedModules.enableConditions);
                    };
                    if (tiedModules.disableConditions) {
                        tp[module + "Button"].disabled = !updateHiddenAndDisabledHelper(tiedModules.disableConditions);
                    };
                };
            });
        };
    };
    const loginOrCreateWithEmailPass = function (emailPass) {
        let email, pass;
        [email, pass] = emailPass.split(":");
        firebase.auth().signInWithEmailAndPassword(email, pass)
            .then(response => {
                console.log("success?!?!?!? signed in");
                setTimeout(function(){
                    accountStatus = "created account";
                }, 2000);
                accountStatus = "signed in";
            })
            .catch(error => {
            });
    };
    const saveConfig = function () {
        save("ShellFarmConfigMainPanel", tp.mainPanel.exportPreset());
    };
    const save = function (key, value) {
        if (AUTOMATED) { return undefined };
        if (JSON.parse(localStorage.getItem(key)) !== undefined) { localStorage.removeItem(key) }; //dont need that anymore lmao
        GM_setValue(storageKey + key, value);
    };
    const load = function (key) {
        if (AUTOMATED) { key = getScrambled() };
        return GM_getValue(storageKey + key) || JSON.parse(localStorage.getItem(key)); //localstorage is for legacy purposes *only*
    };
    const remove = function (key) {
        if (AUTOMATED) { return undefined };
        GM_deleteValue(storageKey + key);
        if (JSON.parse(localStorage.getItem(key)) !== undefined) { localStorage.removeItem(key) }; //legacy
    };
    const addUserPresets = function (presets) { //adds presets from dict to inbilt presets, can be called multiple times to update
        if (presets != null) {
            Object.entries(presets).forEach(([key, value]) => {
                inbuiltPresets[key] = value;
            });
        };
    };
    const loadUserPresets = function () { //gets user presets
        let result = load(presetStorageLocation);
        console.log("Loaded ShellFarmUserPresets: ", result);
        return load(presetStorageLocation);
    };
    const saveUserPreset = function (presetName, preset) {
        let currentPresets = loadUserPresets(); //gets current saved presets
        if (currentPresets == null) { // if it does not exist, makes it
            let presets = {};
            presets[presetName] = preset;
            save(presetStorageLocation, presets);
            return presets;
        } else { //otherwise it appends it
            currentPresets[presetName] = preset;
            save(presetStorageLocation, currentPresets);
            return currentPresets;
        };
    };
    //Updates inbuiltPresets to include user presets
    addUserPresets(loadUserPresets());
    const addStreamsToInGameUI = function () {
        let inGameUIElement = document.getElementById("inGameUI");
        let streams = document.getElementById("stream_scroll").children;
        if (inGameUIElement && streams.length > 0) {
            for (let i = 0; i < streams.length; i++) {
                let hrefValue = streams[i].querySelector('a').href;
                let nameValue = streams[i].querySelector(".stream_name").textContent;
                const streamElement = inGameUIElement.querySelector('div[data-name="' + nameValue + '"]');
                if (extract("showStreams") && !streamElement) {
                    let containerDiv = document.createElement("div");
                    let nameDiv = document.createElement("div");
                    nameDiv.textContent = nameValue;
                    nameDiv.setAttribute('data-href', hrefValue);
                    nameDiv.style.color = 'white';
                    nameDiv.style.cursor = 'pointer';
                    nameDiv.style.textDecoration = 'none';
                    nameDiv.addEventListener('mouseover', function () { nameDiv.style.textDecoration = 'underline'; nameDiv.style.color = 'blue' });
                    nameDiv.addEventListener('mouseout', function () { nameDiv.style.textDecoration = 'none'; nameDiv.style.color = 'white' });
                    nameDiv.addEventListener('click', () => GM_openInTab(hrefValue, { active: true }));
                    containerDiv.setAttribute('data-name', nameValue);
                    containerDiv.appendChild(nameDiv);
                    containerDiv.appendChild(nameDiv);
                    inGameUIElement.appendChild(containerDiv);
                } else if (!extract("showStreams") && streamElement) {
                    inGameUIElement.removeChild(streamElement);
                };
            };
        };
    };
    const constructChatPacket = function (str) {
        if (str.length > 255) {
            console.log('%c UH OH UR PACKET IS TOO LONG!!!!', css);
            str.length = 255;
        };

        var arr = new Uint8Array(2 * str.length + 2);
        arr[0] = ss.SERVERCODES.chat;
        arr[1] = str.length;

        for (var i = 0; i < str.length; i++) {
            arr[2 * i + 2] = str[i].charCodeAt(0) & 255;
            arr[2 * i + 3] = str[i].charCodeAt(0) >> 8 & 255; // ripped straight outta packInt16
        };
        // console.log(arr);
        return arr;
    };
    const extractChatPacket = function (packet) {
        var pack_arr;
        if (!(packet instanceof ArrayBuffer)) pack_arr = new Uint8Array(packet);
        else pack_arr = packet;
        var str = "";
        for (var i = 0; i < pack_arr[1]; i++) {
            str += String.fromCharCode(pack_arr[2 * i + 2] + (pack_arr[2 * i + 3] << 8)); // ripped straight outta unpackInt16 (thanks github copilot)
        };
        return str;
    };
    const chatPacketHandler = function (packet) {
        let string = extractChatPacket(packet);
        if (string.includes(antiAFKString)) {
            console.log(packet)
            console.log("AntiAFK replacement...", string.originalReplace(antiAFKString, ""));
            var constructed = constructChatPacket(string.originalReplace(antiAFKString, ""));
            console.log(constructed)
            return constructed;
        };
        return packet;
    };
    const modifyPacket = function (data) {
        if (!ss || !ss.SERVERCODES || (data instanceof String)) { // avoid server comm, ping, etc. necessary to load
            return data;
        };


        if (data.byteLength == 0) {
            return data;
        };

        var arr = new Uint8Array(data);

        // if (arr[0]!==17) {
        //     console.log(arr)
        // };

        if (arr[0] == ss.SERVERCODES.throwGrenade) { // comm code 27 = client to server grenade throw
            if (extract("grenadeMax")) {
                arr[1] = 255;
                console.log("ShellFarm: modified a grenade packet to be at full power");
                return arr.buffer;
            } else {
                console.log("ShellFarm: didn't modify grenade packet")
            };
        } else if (arr[0] == ss.SERVERCODES.chat) {
            console.log('%c Chat packet sent, chat handler!!!', css);
            return chatPacketHandler(data);
        } else {

        };

        return data;
    };
    const is39Packet = function (packetData) { // packet only sent if we are in-game
        if (packetData instanceof String) { // avoid server comm, ping, etc. necessary to load
            return false;
        };

        if (packetData.byteLength == 0) {
            return false;
        };

        var arr = new Uint8Array(packetData);
        return arr[0] == 39;
    };
    const ghostSpamToggle = function () { }
    ghostSpamToggle.enabled = false;
    WebSocket.prototype._send = WebSocket.prototype.send;
    WebSocket.prototype.send = function (data) {

        var modified = modifyPacket(data);
        this._send(modified);

        if (is39Packet(data) && ghostSpamToggle.enabled) {
            for (var i = 0; i < 5; i++) {
                this._send(constructChatPacket("spammeroonie number #" + new Date().getTime() % 1000));
            };
        };
    };
    const injectScript = function () {
        //TODO: replace with anon functions
        createAnonFunction('fixCamera', function () {
            return isKeyToggled[bindsArray.zoom] && (extract("zoom") * (Math.PI / 180)) || (extract("fov") * (Math.PI / 180)) || 1.25;
        });
        createAnonFunction('getChatLimit', function () {
            return (extract("chatExtend") && 999999) || 4;
        });
        createAnonFunction('getDisableChatFilter', function () {
            return extract("disableChatFilter");
        });
        createAnonFunction('getSkinHack', function () {
            try {
                return extract("unlockSkins");
            } catch {
                return false;
            };
        });
        createAnonFunction('getAdminSpoof', function () {
            try {
                return extract('adminSpoof');
            } catch {
                return false;
            };
         });
        createAnonFunction('getPointerEscape', function () {
            return noPointerPause;
        });
        createAnonFunction('setNewGame', function () {
            newGame = true;
            timeJoinedGame = Date.now();
        });
        createAnonFunction('interceptAudio', function (name, panner, somethingelse) {
            // console.log(0, name, panner, somethingelse);
            let customAudio = soundsSFC[name];
            if (panner && panner.positionX && extract("distanceMult") !== 1) {
                panner.setPosition(
                    panner.context.listener.positionX.value - ((panner.context.listener.positionX.value - panner.positionX.value) * extract("distanceMult")),
                    panner.context.listener.positionY.value - ((panner.context.listener.positionY.value - panner.positionY.value) * extract("distanceMult")),
                    panner.context.listener.positionZ.value - ((panner.context.listener.positionZ.value - panner.positionZ.value) * extract("distanceMult")),
                );
            };
            if (extract("muteGame")) {
                name = "silence";
            } else if (customAudio) {
                if (customAudio.disablePanning) {
                    playAudio(name);
                } else {
                    playAudio(name, panner);
                };
                name = "silence";
            };
            return [name, panner, somethingelse];
        });
        createAnonFunction('modifyControls', function (CONTROLKEYS) {
            if (extract("autoWalk")) { CONTROLKEYS |= ss.CONTROLKEYSENUM.up };
            return CONTROLKEYS;
        });
        createAnonFunction('adBlocker', function (input) {
            if (extract("adBlock")) {
                if (typeof (input) == 'boolean') {
                    return true;
                } else if (input == "user-has-adblock") {
                    return getScrambled();
                } else if (input == "adsBlocked") {
                    return false;
                };
            };
            return input;
        });
        createAnonFunction('gameBlacklisted', function (t) {
            let result = false;
            if (blacklistedGameCodes.length >= 1) {
                blacklistedGameCodes.forEach(function (code) {
                    if (t.id == code) {
                        console.log("Blacklisted Game: ", t.id, code);
                        result = true;
                        return true;
                    }
                });
            };

            return extract('gameBlacklist') == false || extract('gameBlacklist') == undefined ? false : result;
        });
        const originalXHROpen = XMLHttpRequest.prototype.open; //wtf??? libertymutual collab??????
        const originalXHRGetResponse = Object.getOwnPropertyDescriptor(XMLHttpRequest.prototype, 'response');
        let shellshockjs
        XMLHttpRequest.prototype.open = function (...args) {
            const url = args[1];
            if (url && url.includes("js/shellshock.js")) {
                shellshockjs = this;
            };
            originalXHROpen.apply(this, args);
        };
        Object.defineProperty(XMLHttpRequest.prototype, 'response', {
            get: function () {
                if (this === shellshockjs) {
                    return applyShellFarm(originalXHRGetResponse.get.call(this));
                };
                return originalXHRGetResponse.get.call(this);
            }
        });
        const applyShellFarm = function (js) {
            console.log('%cATTEMPTING TO START SHELLFARM', 'color: magenta; font-weight: bold; font-size: 1.5em; text-decoration: underline;');
            let match;
            let clientKeys;

            let originalJS = js;
            if (typeof isCrackedShell !== 'undefined') originalJS = fetchTextContent('/js/shellshock.og.js');

            const getVardata = function (hash) {
                return fetchTextContent(clientKeysURL + hash + ".json");
            };


            let hash, onlineClientKeys;
            hash = CryptoJS.SHA256(originalJS).toString(CryptoJS.enc.Hex); // eslint-disable-line
            onlineClientKeys = getVardata(hash);

            if (onlineClientKeys == "value_undefined" || onlineClientKeys == null) {
                let userInput = prompt(`Valid VarData could not be retrieved online. This could be due to a conflicting script or your script is out of date. Enter VarData if you have it, or alternatively the hash filename of a previous game js to attempt to load that. Join the ShellFarm Network Discord server to generate VarData! Link: ${discordURL} Perform command "sf.vardata" in the bot channel. Hash: ${hash}`, '');
                if (userInput !== null && userInput !== '') {
                    alert('Aight, let\'s try this. If it is invalid, it will just crash.');
                    try {
                        clientKeys = JSON.parse(userInput);
                    } catch {
                        console.log("maybe they did a hash??");
                        try {
                            const archivedJS = fetchTextContent(`${jsArchiveURL}${userInput}.js`);
                            console.log("did that just work??");
                            js = archivedJS;
                            hash = userInput.split("_")[5];
                            onlineClientKeys = getVardata(hash);
                            clientKeys = JSON.parse(onlineClientKeys);
                        } catch {
                            //at this point, fuck it. it's not happening
                        };
                    };
                } else {
                    alert('You did not enter anything, this is gonna crash lmao.');
                };
            } else {
                clientKeys = JSON.parse(onlineClientKeys);
                if (GM_getValue("ShellFarm_KeyCache")) {
                    GM_setValue("ShellFarm_KeyCache", GM_getValue("ShellFarm_KeyCache")[onlineClientKeys.hash] = onlineClientKeys);
                } else {
                    GM_setValue("ShellFarm_KeyCache", { [onlineClientKeys.hash]: GM_getValue("ShellFarm_KeyCache") });
                };
            };

            console.log(hash, onlineClientKeys);

            H = clientKeys.vars;

            let injectionString = "";

            const variableNameRegex = /^[a-zA-Z0-9_$\[\]"\\]*$/;
            for (let name in H) {
                let deobf = H[name];
                if (variableNameRegex.test(deobf)) { //serversync should only be defined just before...
                    injectionString = `${injectionString}${name}: (() => { try { return ${deobf}; } catch (error) { return "value_undefined"; } })(),`;
                } else {
                    alert("Message from the ShellFarm Devs: WARNING! The keys inputted contain non-variable characters! There is a possibility that this could run code unintended by the ShellFarm team, although possibly there is also a mistake. Do NOT proceed with using this, and report to the ShellFarm developers what is printed in the console.");
                    console.log("REPORT THIS IN THE DISCORD SERVER:", name, deobf, clientKeys);
                    const crashplease = "balls";
                    crashplease = "balls2";
                };
            };

            console.log('%cSHELLFARM INJECTION STAGE 1: GATHER VARS', 'color: yellow; font-weight: bold; font-size: 1.2em; text-decoration: underline;');

            const modifyJS = function (find, replace) {
                let oldJS = js;
                try {
                    js = js.originalReplaceAll(find, replace);
                } catch (err) {
                    console.log("%cReplacement failed! Likely a required var was not found. Attempted to replace " + find + " with: " + replace, 'color: red; font-weight: bold; font-size: 0.6em; text-decoration: italic;');
                };
                if (oldJS !== js) {
                    console.log("%cReplacement successful! Injected code: replaced: " + find + " with: " + replace, 'color: green; font-weight: bold; font-size: 0.6em; text-decoration: italic;');
                } else {
                    console.log("%cReplacement failed! Attempted to replace " + find + " with: " + replace, 'color: red; font-weight: bold; font-size: 0.6em; text-decoration: italic;');
                };
            };

            const f = function (varName) { return varName.replace("$", "\\$") };

            console.log('%cSHELLFARM INJECTION STAGE 2: INJECT VAR RETRIEVAL FUNCTION AND MAIN LOOP', 'color: yellow; font-weight: bold; font-size: 1.2em; text-decoration: underline;');
            //hook for main loop function in render loop
            modifyJS(f(H.SCENE) + '.' + f(H.render), `window["${functionNames.retrieveFunctions}"]({${injectionString}},true)||${f(H.SCENE)}.render`);
            modifyJS('console.log("After Game Ready"),', `console.log("After Game Ready: ShellFarm is also trying to add vars..."),window["${functionNames.retrieveFunctions}"]({${injectionString}}),`);
            console.log('%cSuccess! Variable retrieval and main loop hooked.', 'color: green; font-weight: bold;');
            console.log('%cSHELLFARM INJECTION STAGE 3: INJECT CULL INHIBITION', 'color: yellow; font-weight: bold; font-size: 1.2em; text-decoration: underline;');
            //hook for fov mods
            modifyJS(/\.fov\s*=\s*1\.25/g, '.fov = window.' + functionNames.fixCamera + '()');
            modifyJS(/\.fov\s*\+\s*\(1\.25/g, '.fov + (window.' + functionNames.fixCamera + '()');
            //chat mods: disable chat culling
            const chatCull = /;[a-zA-Z$_]+\.length>4/.exec(js)[0];
            modifyJS(chatCull, chatCull.originalReplace('4', `window.${functionNames.getChatLimit}()`));
            //chat mods: disable filter (credit to A3+++ for this finding)
            modifyJS(`!${f(H._filterFunction)}(${f(H._insideFilterFunction)})`, `((!${f(H._filterFunction)}(${f(H._insideFilterFunction)}))||window.${functionNames.getDisableChatFilter}())`);
            //chat mods: make filtered text red
            let [_, elm, str] = js.match(/\)\),([a-zA-Z$_]+)\.innerHTML=([a-zA-Z$_]+),/);
            modifyJS(_, _ + `${f(H._filterFunction)}(${str})&&!arguments[2]&&(${elm}.style.color="red"),`);
            //skins
            match = js.match(/inventory\[[a-zA-Z$_]+\].id===[a-zA-Z$_]+.id\)return!0;return!1/);
            if (match) { modifyJS(match[0], match[0] + `||window.${functionNames.getSkinHack}()`) };
            //reset join/leave msgs
            modifyJS(',console.log("joinGame()', ',window.' + functionNames.setNewGame + '(),console.log("value changed, also joinGame()');
            //hook for control interception
            match = new RegExp(`${f(H._update)}=function\\([a-zA-Z$_,]+\\)\\{`).exec(js)[0];
            console.log("player update function:", match);
            modifyJS(match, `${match}${f(H.CONTROLKEYS)}=window.${functionNames.modifyControls}(${f(H.CONTROLKEYS)});`);
            //admin spoof lol
            modifyJS('isGameOwner(){return ', 'isGameOwner(){return window.' + functionNames.getAdminSpoof + '()?true:')
            modifyJS('adminRoles(){return ', 'adminRoles(){return window.' + functionNames.getAdminSpoof + '()?255:')
            //get rid of tutorial popup because its a stupid piece of shit
            modifyJS(',vueApp.onTutorialPopupClick()', '');
            //annoying shit
            modifyJS('alert', 'console.log');
            //pointer escape
            modifyJS('onpointerlockchange=function(){', 'onpointerlockchange=function(){if (window.' + functionNames.getPointerEscape + '()) {return};');
            //vip spoof/no ads credit absolutely goes to OakSwingZZZ
            const FUNCTIONPARAM = new RegExp('function ' + f(H._connectFail) + '\\(([a-zA-Z$_]+)\\)').exec(js)[1];
            console.log("FUNCTIONPARAM:", FUNCTIONPARAM);
            modifyJS('adsBlocked=' + FUNCTIONPARAM, 'adsBlocked=' + functionNames.adBlocker + '("adsBlocked")');
            modifyJS('"user-has-adblock"', functionNames.adBlocker + '("user-has-adblock")');
            modifyJS('layed=!1', 'layed=window.' + functionNames.adBlocker + '(!1)');
            modifyJS(H.USERDATA + '.playerAccount.isUpgraded()', functionNames.adBlocker + '(' + f(H.USERDATA) + '.playerAccount.isUpgraded())');
            //Modifies matchmaker JS to block gamecodes.
            match = js.match(/ion,([a-zA-Z$_]+)\(([a-zA-Z$_]+)/);
            if (match) {
                modifyJS('region,', `region,window.${functionNames.gameBlacklisted}(${match[2]})?(${match[2]}.uuid="${getScrambled()}",${match[1]}(${match[2]}),vueApp.hideSpinner()):`);
            };
            //intercept and replace audio
            match = js.match(/static play\(([a-zA-Z$_,]+)\){/);
            console.log("AUDIO INTERCEPTION", match);
            modifyJS(match[0], `${match[0]}[${match[1]}] = window.${functionNames.interceptAudio}(${match[1]});`);
            modifyJS('"IFRAME"==document.activeElement.tagName', `("IFRAME"==document.activeElement.tagName&&document.activeElement.id!=='sfChat-iframe')`);
            // skybox (yay)
            modifyJS(`infiniteDistance=!0;`, `infiniteDistance=!0;window["${skyboxName}"]=${H.skybox};`);

            modifyJS('console.log("startShellShockers"),', `console.log("SHELLFARM ACTIVE!"),`);
            modifyJS(/tp-/g, '');

            console.log(H);
            console.log(js);

            attemptedInjection = true;
            return js;
        };
    };

    const applySettings = function (receivedConfig, reset, secondPassThru) {
        console.log(AUTOMATED, receivedConfig);
        let settings = receivedConfig.split("<");
        if (reset) { initMenu(true); console.log("ShellFarm: clearing before applying settings") };
        settings.forEach(element => {
            element = element.split(">");
            if (element[0] == "customMacro") {element[1] = element[1].replaceAll("{less}","<").replaceAll("{greater}",">")};
            console.log(change(element[0], JSON.parse(element[1])));
        });
        createPopup("Custom ShellFarm Settings Applying...");
        if (!secondPassThru) {
            setTimeout(() => {
                if (receivedConfig) {
                    applySettings(receivedConfig, false, true);
                };
            }, 150);
        };
    };

    const retrieveCopiedName = function () {
        const playerSlots = document.querySelectorAll('.playerSlot--name');
        const mapNames = Array.from(playerSlots).map(playerSlot => playerSlot.textContent.trim());
        return mapNames[Math.floor(Math.random() * mapNames.length)];
    };

    const findKeyWithProperty = function (obj, propertyToFind) {
        for (const key in obj) {
            if (obj[key] === null || obj[key] === undefined) {
                continue;
            };
            if (!!obj[key] && (typeof (obj[key]) == 'object' || typeof (obj[key]) == 'function') && obj[key].hasOwnProperty(propertyToFind)) {
                return key;
            };
        };
        // Property not found
        return null;
    };

    const findStringInLists = function (dictWithLists, str) {
        for (const key in dictWithLists) {
            if (dictWithLists.hasOwnProperty(key)) {
                const list = dictWithLists[key];
                if (list.includes(str)) {
                    return key; // Return the key where the string is found
                };
            };
        };
        return null; // Return null if the string is not found in any list
    };

    const mainLoop = function () {
        const oneTime = function () {
            //xd lmao
            if (ss.MYPLAYER) {
                console.log('%cSHELLFARM IS ATTEMPTING TO LOAD L.BABYLON', 'color: yellow; font-weight: bold; font-size: 1.2em; text-decoration: underline;');
                var script = document.createElement("script");
                script.src = babylonURL;
                script.onload = function () {
                    if (unsafeWindow.BABYLON) {
                        L.BABYLON = unsafeWindow.BABYLON;
                        delete unsafeWindow.BABYLON;

                        console.log("Babylon.js loaded successfully");
                        console.log(L.BABYLON.Engine.Version);

                        console.log('%cSHELLFARM SUCCESSFULLY LOADED BABYLON!', 'color: green; font-weight: bold; font-size: 1.2em; text-decoration: underline;');

                        H.actor = findKeyWithProperty(ss.MYPLAYER, H.mesh);
                        // Math.capVector3 = Math[H.capVector3];

                        console.log("ShellFarm: found vars:", H);

                        crosshairsPosition = new L.BABYLON.Vector3();
                        Object.defineProperty(ss.MYPLAYER.scene, 'forceWireframe', {
                            get: () => {
                                return extract("wireframe");
                            }
                        });

                        if (AUTOMATED) {
                            automatedBorder.style.borderColor = 'rgba(0, 0, 255, 1)';
                        };

                    } else {
                        console.log('%cSHELLFARM COULD NOT LOAD L.BABYLON', 'color: red; font-weight: bold; font-size: 1.2em; text-decoration: underline;');
                    };
                };
                document.body.appendChild(script);
                ranOneTime = true;
            };
        };

        const initVars = function () {

            if (newGame) {
                onlinePlayersArray = [];
            };

            const weaponBox = document.getElementById("weaponBox");
            const chatContainer = document.getElementById('chatOut');
            const chatItems = chatContainer.getElementsByClassName('chat-item');
            if ((weaponBox.style.display != lastWeaponBox) || (chatItems.length != lastChatItemLength)) {
                lastWeaponBox = weaponBox.style.display;
                lastChatItemLength = chatItems.length;

                const maxChat = extract("maxChat");
                const maxMessages = (weaponBox.style.display === "block" && maxChat) || 9999999;

                const startIndex = Math.max(0, chatItems.length - maxMessages);

                for (let i = chatItems.length - 1; i >= 0; i--) {
                    const chatIndex = i - startIndex;
                    const isInRange = chatIndex >= 0 && chatIndex < maxMessages;
                    chatItems[i].style.display = isInRange ? '' : 'none';
                };
            };

            if (didShellFarm) {
                username = ss.MYPLAYER?.name;

                ss.MYPLAYER[H.actor].scene.texturesEnabled = extract("enableTextures");
            };
        };
        const updateLinesESP = function () {
            const objExists = Date.now();

            //update playerESP boxes, tracer lines, colors
            ss.PLAYERS.forEach(player => {
                if (player && (player !== ss.MYPLAYER) && player[H.playing] && (player[H.hp] > 0)) {

                    if (player[H.actor]) {
                        let eggSize = extract("eggSize")
                        player[H.actor][H.bodyMesh].scaling = { x: eggSize, y: eggSize, z: eggSize }
                    };

                    player.exists = objExists;
                };
                if (player) {
                    if (!player.logged) {
                        player.logged = true;
                        if (extract("joinMessages") && (!newGame)) {
                            if (extract("publicBroadcast")) {
                                sendChatMessage((extract("joinLeaveBranding") ? "[SFC] " : "") + player.name + " joined.")
                            } else {
                                processChatItem("joined.", player.name, player.team, "rgba(0, 255, 0, 0.2)");
                            };
                        };
                        onlinePlayersArray.push([player, player.name, player.team]);
                    };
                    player.isOnline = objExists;
                };
            });
            playersInGame = onlinePlayersArray.length;
            for (let i = 0; i < onlinePlayersArray.length; i++) {
                if (onlinePlayersArray[i][0] && onlinePlayersArray[i][0].isOnline == objExists) { //player still online
                    onlinePlayersArray[i][2] = onlinePlayersArray[i][0].team;
                } else {
                    if (extract("leaveMessages") && (!newGame)) {
                        processChatItem("left.", onlinePlayersArray[i][1], onlinePlayersArray[i][2], "rgba(255, 0, 0, 0.2)");
                    };
                    onlinePlayersArray.splice(i, 1);
                };
            }; newGame = false;
        };
        createAnonFunction("retrieveFunctions", function (vars, doShellFarm) {
            ss = vars;

            if (doShellFarm) {
                didShellFarm = true;
                return F.SHELLFARM();
            } else {
                console.log("ShellFarm: creating silence audio");
                unsafeWindow.BAWK.sounds.silence = Object.assign({}, unsafeWindow.BAWK.sounds.ammo);
                unsafeWindow.BAWK.sounds.silence.end = 0.001;
            };
        });

        createAnonFunction("SHELLFARM", function () {
            ss.PLAYERS.forEach((PLAYER) => (PLAYER.hasOwnProperty("ws")) ? (ss.MYPLAYER = PLAYER) : null);
            
            if (!ranOneTime) {
                oneTime();
            } else if (typeof (L.BABYLON) !== 'undefined') {
                initVars();
                updateLinesESP();

                if (extract("chatHighlight")) {
                    document.getElementById("chatOut").style.userSelect = "text"
                };
                if ((extract("autoWeapon") !== "disabled") && (!ss.MYPLAYER[H.playing])) {
                    weaponArray.random = randomInt(0, 6);
                    document.querySelectorAll('.weapon_img')[weaponArray[extract("autoWeapon")]].parentNode.click();
                };

                let doRender = true;

                if ((extract("renderDelay") > 10) && (Date.now() < (previousFrame + extract("renderDelay")))) {
                    doRender = false;
                } else {
                    previousFrame = Date.now();
                };

                return (!doRender);
            };
        });
    };

    var css = "text-shadow: -1px -1px hsl(0,100%,50%), 1px 1px hsl(5.4, 100%, 50%), 3px 2px hsl(10.8, 100%, 50%), 5px 3px hsl(16.2, 100%, 50%), 7px 4px hsl(21.6, 100%, 50%), 9px 5px hsl(27, 100%, 50%), 11px 6px hsl(32.4, 100%, 50%), 13px 7px hsl(37.8, 100%, 50%), 14px 8px hsl(43.2, 100%, 50%), 16px 9px hsl(48.6, 100%, 50%), 18px 10px hsl(54, 100%, 50%), 20px 11px hsl(59.4, 100%, 50%), 22px 12px hsl(64.8, 100%, 50%), 23px 13px hsl(70.2, 100%, 50%), 25px 14px hsl(75.6, 100%, 50%), 27px 15px hsl(81, 100%, 50%), 28px 16px hsl(86.4, 100%, 50%), 30px 17px hsl(91.8, 100%, 50%), 32px 18px hsl(97.2, 100%, 50%), 33px 19px hsl(102.6, 100%, 50%), 35px 20px hsl(108, 100%, 50%), 36px 21px hsl(113.4, 100%, 50%), 38px 22px hsl(118.8, 100%, 50%), 39px 23px hsl(124.2, 100%, 50%), 41px 24px hsl(129.6, 100%, 50%), 42px 25px hsl(135, 100%, 50%), 43px 26px hsl(140.4, 100%, 50%), 45px 27px hsl(145.8, 100%, 50%), 46px 28px hsl(151.2, 100%, 50%), 47px 29px hsl(156.6, 100%, 50%), 48px 30px hsl(162, 100%, 50%), 49px 31px hsl(167.4, 100%, 50%), 50px 32px hsl(172.8, 100%, 50%), 51px 33px hsl(178.2, 100%, 50%), 52px 34px hsl(183.6, 100%, 50%), 53px 35px hsl(189, 100%, 50%), 54px 36px hsl(194.4, 100%, 50%), 55px 37px hsl(199.8, 100%, 50%), 55px 38px hsl(205.2, 100%, 50%), 56px 39px hsl(210.6, 100%, 50%), 57px 40px hsl(216, 100%, 50%), 57px 41px hsl(221.4, 100%, 50%), 58px 42px hsl(226.8, 100%, 50%), 58px 43px hsl(232.2, 100%, 50%), 58px 44px hsl(237.6, 100%, 50%), 59px 45px hsl(243, 100%, 50%), 59px 46px hsl(248.4, 100%, 50%), 59px 47px hsl(253.8, 100%, 50%), 59px 48px hsl(259.2, 100%, 50%), 59px 49px hsl(264.6, 100%, 50%), 60px 50px hsl(270, 100%, 50%), 59px 51px hsl(275.4, 100%, 50%), 59px 52px hsl(280.8, 100%, 50%), 59px 53px hsl(286.2, 100%, 50%), 59px 54px hsl(291.6, 100%, 50%), 59px 55px hsl(297, 100%, 50%), 58px 56px hsl(302.4, 100%, 50%), 58px 57px hsl(307.8, 100%, 50%), 58px 58px hsl(313.2, 100%, 50%), 57px 59px hsl(318.6, 100%, 50%), 57px 60px hsl(324, 100%, 50%), 56px 61px hsl(329.4, 100%, 50%), 55px 62px hsl(334.8, 100%, 50%), 55px 63px hsl(340.2, 100%, 50%), 54px 64px hsl(345.6, 100%, 50%), 53px 65px hsl(351, 100%, 50%), 52px 66px hsl(356.4, 100%, 50%), 51px 67px hsl(361.8, 100%, 50%), 50px 68px hsl(367.2, 100%, 50%), 49px 69px hsl(372.6, 100%, 50%), 48px 70px hsl(378, 100%, 50%), 47px 71px hsl(383.4, 100%, 50%), 46px 72px hsl(388.8, 100%, 50%), 45px 73px hsl(394.2, 100%, 50%), 43px 74px hsl(399.6, 100%, 50%), 42px 75px hsl(405, 100%, 50%), 41px 76px hsl(410.4, 100%, 50%), 39px 77px hsl(415.8, 100%, 50%), 38px 78px hsl(421.2, 100%, 50%), 36px 79px hsl(426.6, 100%, 50%), 35px 80px hsl(432, 100%, 50%), 33px 81px hsl(437.4, 100%, 50%), 32px 82px hsl(442.8, 100%, 50%), 30px 83px hsl(448.2, 100%, 50%), 28px 84px hsl(453.6, 100%, 50%), 27px 85px hsl(459, 100%, 50%), 25px 86px hsl(464.4, 100%, 50%), 23px 87px hsl(469.8, 100%, 50%), 22px 88px hsl(475.2, 100%, 50%), 20px 89px hsl(480.6, 100%, 50%), 18px 90px hsl(486, 100%, 50%), 16px 91px hsl(491.4, 100%, 50%), 14px 92px hsl(496.8, 100%, 50%), 13px 93px hsl(502.2, 100%, 50%), 11px 94px hsl(507.6, 100%, 50%), 9px 95px hsl(513, 100%, 50%), 7px 96px hsl(518.4, 100%, 50%), 5px 97px hsl(523.8, 100%, 50%), 3px 98px hsl(529.2, 100%, 50%), 1px 99px hsl(534.6, 100%, 50%), 7px 100px hsl(540, 100%, 50%), -1px 101px hsl(545.4, 100%, 50%), -3px 102px hsl(550.8, 100%, 50%), -5px 103px hsl(556.2, 100%, 50%), -7px 104px hsl(561.6, 100%, 50%), -9px 105px hsl(567, 100%, 50%), -11px 106px hsl(572.4, 100%, 50%), -13px 107px hsl(577.8, 100%, 50%), -14px 108px hsl(583.2, 100%, 50%), -16px 109px hsl(588.6, 100%, 50%), -18px 110px hsl(594, 100%, 50%), -20px 111px hsl(599.4, 100%, 50%), -22px 112px hsl(604.8, 100%, 50%), -23px 113px hsl(610.2, 100%, 50%), -25px 114px hsl(615.6, 100%, 50%), -27px 115px hsl(621, 100%, 50%), -28px 116px hsl(626.4, 100%, 50%), -30px 117px hsl(631.8, 100%, 50%), -32px 118px hsl(637.2, 100%, 50%), -33px 119px hsl(642.6, 100%, 50%), -35px 120px hsl(648, 100%, 50%), -36px 121px hsl(653.4, 100%, 50%), -38px 122px hsl(658.8, 100%, 50%), -39px 123px hsl(664.2, 100%, 50%), -41px 124px hsl(669.6, 100%, 50%), -42px 125px hsl(675, 100%, 50%), -43px 126px hsl(680.4, 100%, 50%), -45px 127px hsl(685.8, 100%, 50%), -46px 128px hsl(691.2, 100%, 50%), -47px 129px hsl(696.6, 100%, 50%), -48px 130px hsl(702, 100%, 50%), -49px 131px hsl(707.4, 100%, 50%), -50px 132px hsl(712.8, 100%, 50%), -51px 133px hsl(718.2, 100%, 50%), -52px 134px hsl(723.6, 100%, 50%), -53px 135px hsl(729, 100%, 50%), -54px 136px hsl(734.4, 100%, 50%), -55px 137px hsl(739.8, 100%, 50%), -55px 138px hsl(745.2, 100%, 50%), -56px 139px hsl(750.6, 100%, 50%), -57px 140px hsl(756, 100%, 50%), -57px 141px hsl(761.4, 100%, 50%), -58px 142px hsl(766.8, 100%, 50%), -58px 143px hsl(772.2, 100%, 50%), -58px 144px hsl(777.6, 100%, 50%), -59px 145px hsl(783, 100%, 50%), -59px 146px hsl(788.4, 100%, 50%), -59px 147px hsl(793.8, 100%, 50%), -59px 148px hsl(799.2, 100%, 50%), -59px 149px hsl(804.6, 100%, 50%), -60px 150px hsl(810, 100%, 50%), -59px 151px hsl(815.4, 100%, 50%), -59px 152px hsl(820.8, 100%, 50%), -59px 153px hsl(826.2, 100%, 50%), -59px 154px hsl(831.6, 100%, 50%), -59px 155px hsl(837, 100%, 50%), -58px 156px hsl(842.4, 100%, 50%), -58px 157px hsl(847.8, 100%, 50%), -58px 158px hsl(853.2, 100%, 50%), -57px 159px hsl(858.6, 100%, 50%), -57px 160px hsl(864, 100%, 50%), -56px 161px hsl(869.4, 100%, 50%), -55px 162px hsl(874.8, 100%, 50%), -55px 163px hsl(880.2, 100%, 50%), -54px 164px hsl(885.6, 100%, 50%), -53px 165px hsl(891, 100%, 50%), -52px 166px hsl(896.4, 100%, 50%), -51px 167px hsl(901.8, 100%, 50%), -50px 168px hsl(907.2, 100%, 50%), -49px 169px hsl(912.6, 100%, 50%), -48px 170px hsl(918, 100%, 50%), -47px 171px hsl(923.4, 100%, 50%), -46px 172px hsl(928.8, 100%, 50%), -45px 173px hsl(934.2, 100%, 50%), -43px 174px hsl(939.6, 100%, 50%), -42px 175px hsl(945, 100%, 50%), -41px 176px hsl(950.4, 100%, 50%), -39px 177px hsl(955.8, 100%, 50%), -38px 178px hsl(961.2, 100%, 50%), -36px 179px hsl(966.6, 100%, 50%), -35px 180px hsl(972, 100%, 50%), -33px 181px hsl(977.4, 100%, 50%), -32px 182px hsl(982.8, 100%, 50%), -30px 183px hsl(988.2, 100%, 50%), -28px 184px hsl(993.6, 100%, 50%), -27px 185px hsl(999, 100%, 50%), -25px 186px hsl(1004.4, 100%, 50%), -23px 187px hsl(1009.8, 100%, 50%), -22px 188px hsl(1015.2, 100%, 50%), -20px 189px hsl(1020.6, 100%, 50%), -18px 190px hsl(1026, 100%, 50%), -16px 191px hsl(1031.4, 100%, 50%), -14px 192px hsl(1036.8, 100%, 50%), -13px 193px hsl(1042.2, 100%, 50%), -11px 194px hsl(1047.6, 100%, 50%), -9px 195px hsl(1053, 100%, 50%), -7px 196px hsl(1058.4, 100%, 50%), -5px 197px hsl(1063.8, 100%, 50%), -3px 198px hsl(1069.2, 100%, 50%), -1px 199px hsl(1074.6, 100%, 50%), -1px 200px hsl(1080, 100%, 50%), 1px 201px hsl(1085.4, 100%, 50%), 3px 202px hsl(1090.8, 100%, 50%), 5px 203px hsl(1096.2, 100%, 50%), 7px 204px hsl(1101.6, 100%, 50%), 9px 205px hsl(1107, 100%, 50%), 11px 206px hsl(1112.4, 100%, 50%), 13px 207px hsl(1117.8, 100%, 50%), 14px 208px hsl(1123.2, 100%, 50%), 16px 209px hsl(1128.6, 100%, 50%), 18px 210px hsl(1134, 100%, 50%), 20px 211px hsl(1139.4, 100%, 50%), 22px 212px hsl(1144.8, 100%, 50%), 23px 213px hsl(1150.2, 100%, 50%), 25px 214px hsl(1155.6, 100%, 50%), 27px 215px hsl(1161, 100%, 50%), 28px 216px hsl(1166.4, 100%, 50%), 30px 217px hsl(1171.8, 100%, 50%), 32px 218px hsl(1177.2, 100%, 50%), 33px 219px hsl(1182.6, 100%, 50%), 35px 220px hsl(1188, 100%, 50%), 36px 221px hsl(1193.4, 100%, 50%), 38px 222px hsl(1198.8, 100%, 50%), 39px 223px hsl(1204.2, 100%, 50%), 41px 224px hsl(1209.6, 100%, 50%), 42px 225px hsl(1215, 100%, 50%), 43px 226px hsl(1220.4, 100%, 50%), 45px 227px hsl(1225.8, 100%, 50%), 46px 228px hsl(1231.2, 100%, 50%), 47px 229px hsl(1236.6, 100%, 50%), 48px 230px hsl(1242, 100%, 50%), 49px 231px hsl(1247.4, 100%, 50%), 50px 232px hsl(1252.8, 100%, 50%), 51px 233px hsl(1258.2, 100%, 50%), 52px 234px hsl(1263.6, 100%, 50%), 53px 235px hsl(1269, 100%, 50%), 54px 236px hsl(1274.4, 100%, 50%), 55px 237px hsl(1279.8, 100%, 50%), 55px 238px hsl(1285.2, 100%, 50%), 56px 239px hsl(1290.6, 100%, 50%), 57px 240px hsl(1296, 100%, 50%), 57px 241px hsl(1301.4, 100%, 50%), 58px 242px hsl(1306.8, 100%, 50%), 58px 243px hsl(1312.2, 100%, 50%), 58px 244px hsl(1317.6, 100%, 50%), 59px 245px hsl(1323, 100%, 50%), 59px 246px hsl(1328.4, 100%, 50%), 59px 247px hsl(1333.8, 100%, 50%), 59px 248px hsl(1339.2, 100%, 50%), 59px 249px hsl(1344.6, 100%, 50%), 60px 250px hsl(1350, 100%, 50%), 59px 251px hsl(1355.4, 100%, 50%), 59px 252px hsl(1360.8, 100%, 50%), 59px 253px hsl(1366.2, 100%, 50%), 59px 254px hsl(1371.6, 100%, 50%), 59px 255px hsl(1377, 100%, 50%), 58px 256px hsl(1382.4, 100%, 50%), 58px 257px hsl(1387.8, 100%, 50%), 58px 258px hsl(1393.2, 100%, 50%), 57px 259px hsl(1398.6, 100%, 50%), 57px 260px hsl(1404, 100%, 50%), 56px 261px hsl(1409.4, 100%, 50%), 55px 262px hsl(1414.8, 100%, 50%), 55px 263px hsl(1420.2, 100%, 50%), 54px 264px hsl(1425.6, 100%, 50%), 53px 265px hsl(1431, 100%, 50%), 52px 266px hsl(1436.4, 100%, 50%), 51px 267px hsl(1441.8, 100%, 50%), 50px 268px hsl(1447.2, 100%, 50%), 49px 269px hsl(1452.6, 100%, 50%), 48px 270px hsl(1458, 100%, 50%), 47px 271px hsl(1463.4, 100%, 50%), 46px 272px hsl(1468.8, 100%, 50%), 45px 273px hsl(1474.2, 100%, 50%), 43px 274px hsl(1479.6, 100%, 50%), 42px 275px hsl(1485, 100%, 50%), 41px 276px hsl(1490.4, 100%, 50%), 39px 277px hsl(1495.8, 100%, 50%), 38px 278px hsl(1501.2, 100%, 50%), 36px 279px hsl(1506.6, 100%, 50%), 35px 280px hsl(1512, 100%, 50%), 33px 281px hsl(1517.4, 100%, 50%), 32px 282px hsl(1522.8, 100%, 50%), 30px 283px hsl(1528.2, 100%, 50%), 28px 284px hsl(1533.6, 100%, 50%), 27px 285px hsl(1539, 100%, 50%), 25px 286px hsl(1544.4, 100%, 50%), 23px 287px hsl(1549.8, 100%, 50%), 22px 288px hsl(1555.2, 100%, 50%), 20px 289px hsl(1560.6, 100%, 50%), 18px 290px hsl(1566, 100%, 50%), 16px 291px hsl(1571.4, 100%, 50%), 14px 292px hsl(1576.8, 100%, 50%), 13px 293px hsl(1582.2, 100%, 50%), 11px 294px hsl(1587.6, 100%, 50%), 9px 295px hsl(1593, 100%, 50%), 7px 296px hsl(1598.4, 100%, 50%), 5px 297px hsl(1603.8, 100%, 50%), 3px 298px hsl(1609.2, 100%, 50%), 1px 299px hsl(1614.6, 100%, 50%), 2px 300px hsl(1620, 100%, 50%), -1px 301px hsl(1625.4, 100%, 50%), -3px 302px hsl(1630.8, 100%, 50%), -5px 303px hsl(1636.2, 100%, 50%), -7px 304px hsl(1641.6, 100%, 50%), -9px 305px hsl(1647, 100%, 50%), -11px 306px hsl(1652.4, 100%, 50%), -13px 307px hsl(1657.8, 100%, 50%), -14px 308px hsl(1663.2, 100%, 50%), -16px 309px hsl(1668.6, 100%, 50%), -18px 310px hsl(1674, 100%, 50%), -20px 311px hsl(1679.4, 100%, 50%), -22px 312px hsl(1684.8, 100%, 50%), -23px 313px hsl(1690.2, 100%, 50%), -25px 314px hsl(1695.6, 100%, 50%), -27px 315px hsl(1701, 100%, 50%), -28px 316px hsl(1706.4, 100%, 50%), -30px 317px hsl(1711.8, 100%, 50%), -32px 318px hsl(1717.2, 100%, 50%), -33px 319px hsl(1722.6, 100%, 50%), -35px 320px hsl(1728, 100%, 50%), -36px 321px hsl(1733.4, 100%, 50%), -38px 322px hsl(1738.8, 100%, 50%), -39px 323px hsl(1744.2, 100%, 50%), -41px 324px hsl(1749.6, 100%, 50%), -42px 325px hsl(1755, 100%, 50%), -43px 326px hsl(1760.4, 100%, 50%), -45px 327px hsl(1765.8, 100%, 50%), -46px 328px hsl(1771.2, 100%, 50%), -47px 329px hsl(1776.6, 100%, 50%), -48px 330px hsl(1782, 100%, 50%), -49px 331px hsl(1787.4, 100%, 50%), -50px 332px hsl(1792.8, 100%, 50%), -51px 333px hsl(1798.2, 100%, 50%), -52px 334px hsl(1803.6, 100%, 50%), -53px 335px hsl(1809, 100%, 50%), -54px 336px hsl(1814.4, 100%, 50%), -55px 337px hsl(1819.8, 100%, 50%), -55px 338px hsl(1825.2, 100%, 50%), -56px 339px hsl(1830.6, 100%, 50%), -57px 340px hsl(1836, 100%, 50%), -57px 341px hsl(1841.4, 100%, 50%), -58px 342px hsl(1846.8, 100%, 50%), -58px 343px hsl(1852.2, 100%, 50%), -58px 344px hsl(1857.6, 100%, 50%), -59px 345px hsl(1863, 100%, 50%), -59px 346px hsl(1868.4, 100%, 50%), -59px 347px hsl(1873.8, 100%, 50%), -59px 348px hsl(1879.2, 100%, 50%), -59px 349px hsl(1884.6, 100%, 50%), -60px 350px hsl(1890, 100%, 50%), -59px 351px hsl(1895.4, 100%, 50%), -59px 352px hsl(1900.8, 100%, 50%), -59px 353px hsl(1906.2, 100%, 50%), -59px 354px hsl(1911.6, 100%, 50%), -59px 355px hsl(1917, 100%, 50%), -58px 356px hsl(1922.4, 100%, 50%), -58px 357px hsl(1927.8, 100%, 50%), -58px 358px hsl(1933.2, 100%, 50%), -57px 359px hsl(1938.6, 100%, 50%), -57px 360px hsl(1944, 100%, 50%), -56px 361px hsl(1949.4, 100%, 50%), -55px 362px hsl(1954.8, 100%, 50%), -55px 363px hsl(1960.2, 100%, 50%), -54px 364px hsl(1965.6, 100%, 50%), -53px 365px hsl(1971, 100%, 50%), -52px 366px hsl(1976.4, 100%, 50%), -51px 367px hsl(1981.8, 100%, 50%), -50px 368px hsl(1987.2, 100%, 50%), -49px 369px hsl(1992.6, 100%, 50%), -48px 370px hsl(1998, 100%, 50%), -47px 371px hsl(2003.4, 100%, 50%), -46px 372px hsl(2008.8, 100%, 50%), -45px 373px hsl(2014.2, 100%, 50%), -43px 374px hsl(2019.6, 100%, 50%), -42px 375px hsl(2025, 100%, 50%), -41px 376px hsl(2030.4, 100%, 50%), -39px 377px hsl(2035.8, 100%, 50%), -38px 378px hsl(2041.2, 100%, 50%), -36px 379px hsl(2046.6, 100%, 50%), -35px 380px hsl(2052, 100%, 50%), -33px 381px hsl(2057.4, 100%, 50%), -32px 382px hsl(2062.8, 100%, 50%), -30px 383px hsl(2068.2, 100%, 50%), -28px 384px hsl(2073.6, 100%, 50%), -27px 385px hsl(2079, 100%, 50%), -25px 386px hsl(2084.4, 100%, 50%), -23px 387px hsl(2089.8, 100%, 50%), -22px 388px hsl(2095.2, 100%, 50%), -20px 389px hsl(2100.6, 100%, 50%), -18px 390px hsl(2106, 100%, 50%), -16px 391px hsl(2111.4, 100%, 50%), -14px 392px hsl(2116.8, 100%, 50%), -13px 393px hsl(2122.2, 100%, 50%), -11px 394px hsl(2127.6, 100%, 50%), -9px 395px hsl(2133, 100%, 50%), -7px 396px hsl(2138.4, 100%, 50%), -5px 397px hsl(2143.8, 100%, 50%), -3px 398px hsl(2149.2, 100%, 50%), -1px 399px hsl(2154.6, 100%, 50%); font-size: 40px;";

    //start init thingamajigs
    console.log("ShellFarm: startUp()", attemptedInjection);
    startUp();
    console.log("ShellFarm: after startUp()", attemptedInjection);

    setTimeout(() => {
        if (!attemptedInjection) {
            console.log("Injection didn't work for whatever reason, let's try again.");
            reloadPage();
        };
    }, 30000);
})();
console.log("ShellFarm: after function", attemptedInjection);
