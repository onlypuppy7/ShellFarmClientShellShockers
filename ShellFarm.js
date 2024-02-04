// ==UserScript==
// @name         ShellFarm - Utilities for Shell Shockers.
// @description  Some useful mods for Shell Shockers, including infinite history, FOV and more. Bindable too.
// @author       onlypuppy7
// @namespace    https://github.com/onlypuppy7/ShellFarmClientShellShockers/
// @supportURL   https://github.com/onlypuppy7/ShellFarmClientShellShockers/issues/
// @license      GPL-3.0
// @run-at       document-start
// @grant        GM_info
// @icon         https://github.com/onlypuppy7/ShellFarmClientShellShockers/blob/main/icon.png?raw=true
// @require      https://cdn.jsdelivr.net/npm/tweakpane@3.1.10/dist/tweakpane.min.js
// @downloadURL  https://update.greasyfork.org/scripts/485745/ShellFarm%20-%20Utilities%20for%20Shell%20Shockers.user.js
// @updateURL    https://update.greasyfork.org/scripts/485745/ShellFarm%20-%20Utilities%20for%20Shell%20Shockers.meta.js

// version naming:
    //3.#.#-pre[number] for development versions, increment for every commit (not full release)
    //3.#.#-release for release
//this ensures that each version of the script is counted as different

// @version      1.0.4

// @match        *://shellshock.io/*
// @match        *://algebra.best/*
// @match        *://algebra.vip/*
// @match        *://biologyclass.club/*
// @match        *://deadlyegg.com/*
// @match        *://deathegg.world/*
// @match        *://eggboy.club/*
// @match        *://eggboy.xyz/*
// @match        *://eggcombat.com/*
// @match        *://egg.dance/*
// @match        *://eggfacts.fun/*
// @match        *://egghead.institute/*
// @match        *://eggisthenewblack.com/*
// @match        *://eggsarecool.com/*
// @match        *://geometry.best/*
// @match        *://geometry.monster/*
// @match        *://geometry.pw/*
// @match        *://geometry.report/*
// @match        *://hardboiled.life/*
// @match        *://hardshell.life/*
// @match        *://humanorganising.org/*
// @match        *://mathactivity.xyz/*
// @match        *://mathactivity.club/*
// @match        *://mathdrills.info/*
// @match        *://mathdrills.life/*
// @match        *://mathfun.rocks/*
// @match        *://mathgames.world/*
// @match        *://math.international/*
// @match        *://mathlete.fun/*
// @match        *://mathlete.pro/*
// @match        *://overeasy.club/*
// @match        *://scrambled.tech/*
// @match        *://scrambled.today/*
// @match        *://scrambled.us/*
// @match        *://scrambled.world/*
// @match        *://shellshockers.club/*
// @match        *://shellshockers.life/*
// @match        *://shellshockers.site/*
// @match        *://shellshockers.us/*
// @match        *://shellshockers.world/*
// @match        *://shellshockers.xyz/*
// @match        *://shellsocks.com/*
// @match        *://softboiled.club/*
// @match        *://urbanegger.com/*
// @match        *://violentegg.club/*
// @match        *://violentegg.fun/*
// @match        *://yolk.best/*
// @match        *://yolk.life/*
// @match        *://yolk.rocks/*
// @match        *://yolk.tech/*
// @match        *://yolk.quest/*
// @match        *://yolk.today/*
// @match        *://zygote.cafe/*
// ==/UserScript==

(function () {
    //script info
    const name="ShellFarm";
    const version=GM_info.script.version;
    const menuTitle=name + " v" + version;
    //startup sequence
    const startUp=function () {
        mainLoop()
        injectScript()
        document.addEventListener("DOMContentLoaded", function () {
            initMenu();
            applyStylesAddElements(); //set font and change menu cass, and other stuff to do with the page
            const intervalId1 = setInterval(everySecond, 1000);
            const intervalId2 = setInterval(everyDecisecond, 100);
        });
    };
    //INIT WEBSITE LINKS: store them here so they are easy to maintain and update!
    const discordURL = "https://discord.gg/mPa95HB7Q6";
    //INIT VARS
    unsafeWindow.newGame=false
    let binding=false;
    const allModules=[];
    const allFolders=[];
    const F=[];
    const functionNames=[];
    const isKeyToggled={};
    let onlinePlayersArray=[];
    let bindsArray={};
    const H={}; // obfuscated shit lol
    const tp={}; // <-- tp = tweakpane
    let ss,msgElement,resetModules,noPointerPause,playersInGame,coordElement,gameInfoElement,playerstatsElement,ranOneTime,lastWeaponBox,lastChatItemLength,configMain;
    let previousDetail;

    //menu interaction functions
    const extract = function (variable,shouldUpdate) {
        if (shouldUpdate) {updateConfig()};
        return configMain[variable];
    };
    const beginBinding = function (value) {
        if (binding == false) {
            binding=value;
            tp[binding+"BindButton"].title="PRESS KEY";
        };
    };
    const change = function (module,newValue) { //its important to note that every module must have a unique name
        const labels = document.querySelectorAll('.tp-lblv_l');
        const moduleButton=module+"Button";
        const moduleLabel=tp[moduleButton].label;
        for (const label of labels) {
            if (label.textContent.includes(moduleLabel)) {
                const inputContainer = label.nextElementSibling;
                const currentValue=extract(module);
                // check for checkbox
                const checkbox = inputContainer.querySelector('.tp-ckbv_i');
                if (checkbox) {
                    if (newValue==undefined) {
                        newValue=(!currentValue);
                    };
                    if (newValue!==!(!currentValue)) {
                        checkbox.click(); // Toggle checkbox
                    };
                    console.log(module,"checkbox",currentValue,newValue);
                    return extract(module,true);
                };
                // check for button
                const button = inputContainer.querySelector('.tp-btnv_b');
                if (button) {
                    button.click(); // Trigger button click
                    console.log(module,"button",currentValue,newValue);
                    return ("NOMSG"); //no change of state, dont show pop up message
                };
                // check for dropdown
                const dropdown = inputContainer.querySelector('.tp-lstv_s');
                if (dropdown) {
                    if (newValue==undefined) { //if youre going to set a list to a certain value, use the int value of the list item
                        newValue=(dropdown.selectedIndex+1) % dropdown.options.length;
                    };
                    dropdown.selectedIndex = newValue;
                    dropdown.dispatchEvent(new Event('change')); // trigger change event for dropdown
                    console.log(module,"dropdown",currentValue,newValue);
                    return extract(module,true);
                };
                // check for text input
                const textInput = inputContainer.querySelector('.tp-txtv_i');
                if (textInput) {
                    textInput.value = newValue;
                    textInput.dispatchEvent(new Event('change')); // trigger change event for dropdown
                    return extract(module,true);
                };
            };
        };
    };
    const findKeyByValue = function(obj, value) {
        for (const key in obj) {
            if (obj[key] === value) {
                return key;
            };
        };
        return null; // Return null if the value is not found
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
        event=(event.code.replace("Key",""));
        isKeyToggled[event]=true;
        if (event=="Escape") { noPointerPause=false; unsafeWindow.document.onpointerlockchange() };
    });
    document.addEventListener("keyup", function (event) {
        event=(event.code.replace("Key",""));
        isKeyToggled[event]=false;
        if (document.activeElement&&document.activeElement.tagName==='INPUT' ) {
            return;
        } else if (binding!=false) {
                if (event=="Delete") { event="Set Bind" };
                tp[binding+"BindButton"].title=event;
                bindsArray[binding]=event;
                localStorage.setItem(binding+"Bind",JSON.stringify(event));
                createPopup("Binded "+tp[binding+"Button"].label+" to key: "+event);
                binding=false;
        } else {
            Object.keys(bindsArray).forEach(function (module) {
                if ((bindsArray[module] == event) && module!="zoom") {
                    let state=change(module)
                    let popupText=state
                    if (state!="NOMSG") {
                        if (state===true||state===false||state===undefined) {state=(state?"ON":"OFF")};
                        popupText="Set "+module+" to: "+state;
                    } else {
                        switch (module) {
                            case ("hide"):
                                popupText="Toggled ShellFarm Panel"; break;
                            case ("panic"):
                                popupText="Exiting to set URL..."; break;
                        };
                    };
                    createPopup(popupText);
                };
            });
        };
    });
    const initTab = function(tab) {
        tp[tab.storeAs]=tab.location.addTab({
            pages: [
                {title: 'Modules'},
                {title: 'Binds'},
            ],
        });
    };
    const initFolder = function(folder) {
        tp[folder.storeAs]=folder.location.addFolder({
            title: folder.title,
            expanded: JSON.parse(localStorage.getItem(folder.storeAs)) !== null ? JSON.parse(localStorage.getItem(folder.storeAs)) : false
        });
        allFolders.push(folder.storeAs);
    };
    const initModule = function (module) {
        const value={};
        value[module.storeAs]=(module.defaultValue !== undefined ? module.defaultValue : false);

        if (!(module.slider&&module.slider.step)) {module.slider={}};
        const config={
            label: module.title,
            options: module.dropdown,
            min: module.slider.min,
            max: module.slider.max,
            step: module.slider.step,
            title: module.button,
        };
        if (module.button) {
            tp[(module.storeAs+"Button")]=module.location.addButton({
                label: module.title,
                title: module.button,
            }).on("click", (value) => {
                if (module.clickFunction!==undefined) {module.clickFunction(value)};
                if (module.botParam!==undefined) {updateBotParams(module.botParam)};
            });
        } else if (module.monitor) {
            monitorObjects[module.storeAs]="Text Goes Here";
            tp[(module.storeAs+"Button")]=module.location.addMonitor(monitorObjects,module.storeAs,{
                label: '',
                expanded: true,
                multiline: true,
                lineCount: module.monitor,
            });
            setInterval(() => {
                tp[(module.storeAs+"Button")].refresh();
            }, 1000);
        } else {
            tp[(module.storeAs+"Button")]=module.location.addInput(value,module.storeAs,config
            ).on("change", (value) => {
                if (module.changeFunction!==undefined) {module.changeFunction(value)};
                if (module.botParam!==undefined) {
                    setTimeout(() => {
                        updateBotParams(module.botParam);
                    }, 500);
                };
                setTimeout(() => {
                    saveConfig();
                }, 500);
            });
        };
        allModules.push(name.replace("Button",""));
        if (module.bindLocation) {initBind(module)};
    };
    const initBind = function (module) {
        if (resetModules) { localStorage.removeItem(module.storeAs+"Bind") };
        const theBind=(JSON.parse(localStorage.getItem(module.storeAs+"Bind")) || module.defaultBind || "Set Bind");
        tp[(module.storeAs+"BindButton")]=module.bindLocation.addButton({
            label: module.title,
            title: theBind,
        }).on("click", (value) => {
            beginBinding(module.storeAs);
        });
        bindsArray[module.storeAs]=theBind;
    };
    const initMenu = function (reset) {
        //INIT MENU
        //init tp.mainPanel

        resetModules = reset;

        if (tp.mainPanel) { tp.mainPanel.dispose() };

        tp.mainPanel = new Tweakpane.Pane();
        tp.mainPanel.title = menuTitle;
        //RENDER MODULES
        initFolder({ location: tp.mainPanel, title: "Render", storeAs: "renderFolder",});
        initTab({ location: tp.renderFolder, storeAs: "renderTab" });
            initModule({ location: tp.renderTab.pages[0], title: "FOV", storeAs: "fov", slider: {min: 0, max: 360, step: 3}, defaultValue: 72,});
            initModule({ location: tp.renderTab.pages[0], title: "Zoom FOV", storeAs: "zoom", slider: {min: 0, max: 72, step: 1}, defaultValue: 15, bindLocation: tp.renderTab.pages[1], defaultBind: "C",});
            tp.renderTab.pages[0].addSeparator();
            initModule({ location: tp.renderTab.pages[0], title: "Egg Size", storeAs: "eggSize", slider: {min: 0, max: 10, step: 0.25}, defaultValue: 1,});
            tp.renderTab.pages[0].addSeparator();
            initModule({ location: tp.renderTab.pages[0], title: "Set Detail", storeAs: "setDetail", bindLocation: tp.renderTab.pages[1], dropdown: [{text: "Disabled", value: "disabled"}, {text: "Auto Detail", value: "autodetail"}, {text: "No Details", value: "nodetails"}, {text: "Shadows", value: "shadows"}, {text: "High Res", value: "highres"}, {text: "Shadows+High Res", value: "shadowshighres"}], defaultValue: "disabled"});
            initModule({ location: tp.renderTab.pages[0], title: "Textures", storeAs: "enableTextures", bindLocation: tp.renderTab.pages[1], defaultValue: true,});
        //HUD MODULES
        initFolder({ location: tp.mainPanel, title: "HUD", storeAs: "hudFolder",});
        initTab({ location: tp.hudFolder, storeAs: "hudTab" });
            initModule({ location: tp.hudTab.pages[0], title: "Co-ords", storeAs: "showCoordinates", bindLocation: tp.hudTab.pages[1],});
            initModule({ location: tp.hudTab.pages[0], title: "HP Display", storeAs: "playerStats", bindLocation: tp.hudTab.pages[1],});
            initModule({ location: tp.hudTab.pages[0], title: "GameInfo", storeAs: "gameInfo", bindLocation: tp.hudTab.pages[1],});
        //CHAT MODULES
        initFolder({ location: tp.mainPanel, title: "Chat", storeAs: "chatFolder",});
        initTab({ location: tp.chatFolder, storeAs: "chatTab" });
            initModule({ location: tp.chatTab.pages[0], title: "InfiniHistory", storeAs: "chatExtend", bindLocation: tp.chatTab.pages[1],});
            initModule({ location: tp.chatTab.pages[0], title: "HighlightTxt", storeAs: "chatHighlight", bindLocation: tp.chatTab.pages[1],});
            initModule({ location: tp.chatTab.pages[0], title: "Max Ingame", storeAs: "maxChat", slider: {min: 0, max: 30, step: 1}, defaultValue: 5,});
            initModule({ location: tp.chatTab.pages[0], title: "ShowFiltered", storeAs: "disableChatFilter", bindLocation: tp.chatTab.pages[1],});
            tp.chatTab.pages[0].addSeparator();
            initFolder({ location: tp.chatTab.pages[0], title: "Join/Leave Msgs Options", storeAs: "joinLeaveFolder",});
                initModule({ location: tp.joinLeaveFolder, title: "Join Msgs", storeAs: "joinMessages", bindLocation: tp.chatTab.pages[1],});
                initModule({ location: tp.joinLeaveFolder, title: "Leave Msgs", storeAs: "leaveMessages", bindLocation: tp.chatTab.pages[1],});
        //MISC MODULES
        initFolder({ location: tp.mainPanel, title: "Misc", storeAs: "miscFolder",});
        initTab({ location: tp.miscFolder, storeAs: "miscTab" })
            initModule({ location: tp.miscTab.pages[0], title: "Unlock Skins", storeAs: "unlockSkins", bindLocation: tp.miscTab.pages[1],});
            tp.miscTab.pages[0].addSeparator();
            initModule({ location: tp.miscTab.pages[0], title: "Switch Focus", storeAs: "unfocus", bindLocation: tp.miscTab.pages[1], button: "FOCUS/UNFOCUS", defaultBind: "P", clickFunction: function(){
                if (document.pointerLockElement !== null) { //currently locked
                    noPointerPause=true; unsafeWindow.document.exitPointerLock();
                } else if (noPointerPause) { //already unlocked?
                    noPointerPause=false; canvas.requestPointerLock();
                };
            },});
        //CLIENT MODULES
        initFolder({ location: tp.mainPanel, title: "Client & About", storeAs: "clientFolder",});
        initTab({ location: tp.clientFolder, storeAs: "clientTab" })
            initModule({ location: tp.clientTab.pages[0], title: "Hide GUI", storeAs: "hide", bindLocation: tp.clientTab.pages[1], button: "Hide!", clickFunction: function(){tp.mainPanel.hidden=!tp.mainPanel.hidden}, defaultBind:"H",});
            initModule({ location: tp.clientTab.pages[0], title: "Pop-ups", storeAs: "popups", bindLocation: tp.clientTab.pages[1], defaultValue: true,});
            tp.clientTab.pages[0].addSeparator();
            initModule({ location: tp.clientTab.pages[0], title: "Panic", storeAs: "panic", bindLocation: tp.clientTab.pages[1], button: "EXIT!", clickFunction: function(){if (extract("enablePanic")) { unsafeWindow.location.replace(extract("panicURL")) }}, defaultBind:"X",});
            initFolder({ location: tp.clientTab.pages[0], title: "Panic Options", storeAs: "panicFolder",});
                initModule({ location: tp.panicFolder, title: "Enable", storeAs: "enablePanic", bindLocation: tp.clientTab.pages[1], defaultValue: true,});
                initModule({ location: tp.panicFolder, title: "Set URL", storeAs: "panicURL", defaultValue: "https://classroom.google.com/",});
            tp.clientTab.pages[0].addSeparator();
            initModule({ location: tp.clientTab.pages[0], title: "Discord", storeAs: "discord", button: "Link", clickFunction: function(){unsafeWindow.open(discordURL)},});
            tp.clientTab.pages[0].addSeparator();
            initModule({ location: tp.clientTab.pages[0], title: "Reset", storeAs: "clear", button: "DELETE", clickFunction: function(){
                const userConfirmed=confirm("Are you sure you want to continue? This will clear all stored module states and keybinds.");
                if (userConfirmed) {
                    initMenu(true);
                    userConfirmed=alert("Reset to defaults.");
                };
            },});
        tp.mainPanel.addSeparator();

        if ((!localStorage.getItem("ShellFarmConfigMainPanel")) || reset) {
            saveConfig();
        } else {
            console.log("##############################################")
            tp.mainPanel.importPreset(JSON.parse(localStorage.getItem("ShellFarmConfigMainPanel")));
        };

        updateConfig();

        makeDraggable(tp.mainPanel.containerElem_);
    };
    //visual functions
    const createPopup = function (text,type) {
        console.log("Creating Popup Type:",type,"With Text:",text);
        try {
            if (extract("popups")) {
                const messageContainer = document.getElementById('message-container');
                const messages = messageContainer.getElementsByClassName('msg');
                if (messages.length > 5) {
                    messageContainer.removeChild(messages[0]);
                };
                const clonedMsgElement = msgElement.cloneNode(true);
                clonedMsgElement.innerText = text;
                switch (type) {
                    case ("success"):
                        clonedMsgElement.style.border='2px solid rgba(0, 255, 0, 0.5)'; break;
                    case ("error"):
                        clonedMsgElement.style.border='2px solid rgba(255, 0, 0, 0.5)'; break;
                };
                clonedMsgElement.style.display='none';
                const messageOffset=(messages.length+1)*50;
                clonedMsgElement.style.bottom=messageOffset+"px";
                void clonedMsgElement.offsetWidth;
                clonedMsgElement.style.display='';
                messageContainer.appendChild(clonedMsgElement);
                //reorder such that newest is lowest
                for (let i=messages.length-1;i>=0;i--) {
                    messages[i].style.bottom=(((messages.length-i)*50)-40)+"px";
                };
            };
        } catch (error) {
            // Handle the error and display an error message onscreen
            console.error("An error occurred:", error);
            alert("Bollocks! If you're getting this message, injection probably failed. To solve this, perform CTRL+F5 - this performs a hard reload. If this does not work, contact the moderators.");
        }
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
            .tp-dfwv, .tp-sglv_i, .tp-rotv_t, .tp-fldv_t, .tp-ckbv_l, .tp-txtv_i, .tp-lblv_l, .tp-tbiv_t, .msg, .coords, .gameinfo, .playerstats, .playerinfo, .automated {
                font-family: 'Bahnschrift', sans-serif !important;
                font-size: 16px;
                z-index: 9999 !important;
            }
            .tp-rotv_m, .tp-fldv_m {
                display: none;
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
                width: 246px;
                margin-left: -86px !important;
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

        //initiate message div and css and shit
        msgElement = document.createElement('div'); // create the element directly
        msgElement.classList.add('msg');
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
            z-index: 999999;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
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
            top: -2px;
            left: -2px;
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
            bottom: -2px;
            left: -2px;
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
            position: fixed;
            top: 20px;
            left: 280px;
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

        
        const rootTheme = `
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
        --tp-monitor-foreground-color: hsla(0, 0%, 100%, 0.50);`;    

        //menu customisation (apply font, button widths, adjust checkbox right slightly, make menu appear on top, add anim to message)
        const themeElement = document.createElement('style');
        themeElement.textContent = `
            :root { ${rootTheme} }
        `;
        document.head.appendChild(themeElement);
    };
    const makeDraggable = function(element,notMenu) {
        if (element) {
            let offsetX, offsetY;
            element.addEventListener('mousedown', function(e) {
                const dragElement = function(e) {
                    const x = (e.clientX - offsetX) / unsafeWindow.innerWidth * 100;
                    const y = (e.clientY - offsetY) / unsafeWindow.innerHeight * 100;
                    const maxX = 100 - (element.offsetWidth / unsafeWindow.innerWidth * 100);
                    const maxY = 100 - (element.offsetHeight / unsafeWindow.innerHeight * 100);
                    element.style.left = `${Math.max(0, Math.min(x, maxX))}%`;
                    element.style.top = `${Math.max(0, Math.min(y, maxY))}%`;
                };
                if (notMenu||e.target.classList.contains('tp-rotv_t')) {
                    offsetX = e.clientX - element.getBoundingClientRect().left;
                    offsetY = e.clientY - element.getBoundingClientRect().top;
                    document.addEventListener('mousemove', dragElement);
                    document.addEventListener('mouseup', function() {
                        document.removeEventListener('mousemove', dragElement);
                    });
                    e.preventDefault(); // Prevent text selection during drag
                };
            });
        };
    };
    //1337 H4X
    const distancePlayers = function (player,yMultiplier) {
        yMultiplier=yMultiplier||1;
        let vector = getDirectionVectorFacingTarget(player);
        return Math.hypot(vector.x,vector.y*yMultiplier,vector.z); //pythagoras' theorem in 3 dimensions. no one owns maths, zert.
    };
    const setPrecision = function (value) { return Math.round(value * 8192) / 8192 }; //required precision
    const calculateYaw = function (pos) {
        return setPrecision(Math.mod(Math.atan2(pos.x,pos.z), Math.PI2));
    };
    const calculatePitch = function (pos) {
        return setPrecision(-Math.atan2(pos.y,Math.hypot(pos.x,pos.z))%1.5);
    };
    const getAngularDifference = function (obj1,obj2) {
        return Math.abs(obj1.yaw-obj2.yaw)+Math.abs(obj1.pitch-obj2.pitch);
    };
    const getDirectionVectorFacingTarget = function (target,vectorPassed,offsetY) {
        target = vectorPassed ? target : target[H.actor].mesh.position;
        offsetY=offsetY||0;
        return {
            x: target.x - ss.MYPLAYER[H.actor].mesh.position.x,
            y: target.y - ss.MYPLAYER[H.actor].mesh.position.y+offsetY,
            z: target.z - ss.MYPLAYER[H.actor].mesh.position.z,
        };
    };
    const reverse_string = function (str) { return str.split("").reverse().join("") };
    const isPartialMatch = function (array, searchString) {
        return array.some(item => item !== "" && searchString.toLowerCase().includes(item.toLowerCase()));
    };
    const randomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    const radianAngleDiff = function (angle1,angle2) {
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
    const getScrambled=function(){return Array.from({length: 10}, () => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('')}
    clientID=(getScrambled()+"noID");
    const createAnonFunction=function(name,func){
        const funcName=getScrambled();
        unsafeWindow[funcName]=func;
        F[name]=unsafeWindow[funcName];
        functionNames[name]=funcName
    };
    const processChatItem = function (text,playerName,playerTeam,highlightColor) {
        let chatItem = document.createElement("div");
        let playerNameSpan = document.createElement("span");
        let playerInfoContainer = document.createElement("div");
        let serverIcon = document.createElement("i");

        chatItem.classList.add("chat-item");
        playerInfoContainer.style.display = "inline-block";

        playerNameSpan.classList.add("chat-player-name", "ss_marginright_xs");
        playerNameSpan.textContent = playerName + " ";

        playerInfoContainer.style.color = ss.TEAMCOLORS.text[playerTeam];
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
        allFolders.forEach(function (name) {
            localStorage.setItem(name,JSON.stringify(tp[name].expanded));
        });
        if (unsafeWindow.extern.inGame) {
            if (extract("gameInfo")) {
                let gameInfoText=ss.GAMECODE+" | "+playersInGame+"/18 | "+(18-playersInGame)+" slots remaining. | Server: "+unsafeWindow.vueData.currentRegionId+" | Gamemode: "+findKeyByValue(unsafeWindow.extern.GameType,unsafeWindow.vueApp.game.gameType)+" | Map: "+unsafeWindow.vueApp.game.mapName;
                gameInfoElement.innerText = gameInfoText;
                void gameInfoElement.offsetWidth;
                gameInfoElement.style.display = '';
            };
        };
        if ((!document.getElementById("progressBar"))) {
            if ((extract("setDetail")!==previousDetail)&&(extract("setDetail")!=="disabled")) {
                unsafeWindow.vueApp.settingsUi.togglers.misc[3].value=false;
                if (extract("setDetail")=="autodetail") {
                    unsafeWindow.vueApp.settingsUi.togglers.misc[3].value=true;
                } else if (extract("setDetail")=="nodetails") {
                    unsafeWindow.vueApp.settingsUi.togglers.misc[4].value=false;
                    unsafeWindow.vueApp.settingsUi.togglers.misc[5].value=false;
                } else if (extract("setDetail")=="shadows") {
                    unsafeWindow.vueApp.settingsUi.togglers.misc[4].value=true;
                    unsafeWindow.vueApp.settingsUi.togglers.misc[5].value=false;
                } else if (extract("setDetail")=="highres") {
                    unsafeWindow.vueApp.settingsUi.togglers.misc[4].value=false;
                    unsafeWindow.vueApp.settingsUi.togglers.misc[5].value=true;
                } else if (extract("setDetail")=="shadowshighres") {
                    unsafeWindow.vueApp.settingsUi.togglers.misc[4].value=true;
                    unsafeWindow.vueApp.settingsUi.togglers.misc[5].value=true;
                };
                unsafeWindow.extern.applyUiSettings(unsafeWindow.vueApp.settingsUi);
            };
            previousDetail=extract("setDetail");
        };
        //block ads or something kek
        localStorage.timesPlayed = 0;
    };
    const everyDecisecond = function () {
        updateConfig();

        if (unsafeWindow.extern.inGame) {
            //innertext stuff, fairly resource intensive. disable these for performance
            if (extract("playerStats")) {
                let playerStates="";
                ss.PLAYERS.forEach(player=>{
                    if (player && (player!==ss.MYPLAYER) && player[H.playing] && (player.hp>0) && ((!ss.MYPLAYER.team)||( player.team!==ss.MYPLAYER.team))) {
                        playerStates=playerStates+player.name+": "+Math.round(player.hp)+" HP\n";
                    };
                });
                if (playerStates=="") {playerStates="No Enemy Players"};
                playerstatsElement.innerText = playerStates;
                void playerstatsElement.offsetWidth;
                playerstatsElement.style.display = '';
            };
            if (extract("showCoordinates")) {
                const fonx = Number((ss.MYPLAYER[H.actor].mesh.position.x).toFixed(3));
                const fony = Number((ss.MYPLAYER[H.actor].mesh.position.y).toFixed(3));
                const fonz = Number((ss.MYPLAYER[H.actor].mesh.position.z).toFixed(3));
                const yaw = Number((ss.MYPLAYER.yaw).toFixed(3)); //could i function this? yea
                const pitch = Number((ss.MYPLAYER.pitch).toFixed(3));
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
    const saveConfig = function () {
        localStorage.setItem("ShellFarmConfigMainPanel",JSON.stringify(tp.mainPanel.exportPreset()));
    };
    const injectScript = function () {
        //TODO: replace with anon functions
        unsafeWindow.fixCamera = function () {
            return isKeyToggled[bindsArray.zoom] && (extract("zoom")*(Math.PI / 180)) || (extract("fov")*(Math.PI/180)) || 1.25;
        };
        unsafeWindow.getChatLimit = function () {
            return (extract("chatExtend")&&999999)||4;
        };
        unsafeWindow.getDisableChatFilter = function () {
            return extract("disableChatFilter");
        };
        unsafeWindow.getSkinHack = function () {
            return extract("unlockSkins");
        };
        unsafeWindow.getPointerEscape = function () {
            return noPointerPause;
        };
        const originalXHROpen = XMLHttpRequest.prototype.open; //wtf??? libertymutual collab??????
        const originalXHRGetResponse = Object.getOwnPropertyDescriptor(XMLHttpRequest.prototype, 'response');
        let shellshockjs
        XMLHttpRequest.prototype.open = function(...args) {
            const url = args[1];
            if (url && url.includes("js/shellshock.js")) {
                shellshockjs = this;
            };
            originalXHROpen.apply(this, args);
        };
        Object.defineProperty(XMLHttpRequest.prototype, 'response', {
            get: function() {
                if (this===shellshockjs) {
                    return applyShellFarm(originalXHRGetResponse.get.call(this));
                };
                return originalXHRGetResponse.get.call(this);
            }
        });
        const applyShellFarm = function(js) {
            console.log('%cATTEMPTING TO START SHELLFARM', 'color: magenta; font-weight: bold; font-size: 1.5em; text-decoration: underline;');
            const allFuncName={};
            let vars=[];
            let injectionString="";
            let match;
            const getVar=function(name,regex){
                const varName=eval(new RegExp(regex)+`.exec(js)[1]`);
                vars[name]=varName;
                injectionString=injectionString+name+": ("+varName+")||undefined,";
                console.log('%cFound var! Saved '+varName+' as '+name, 'color: green; font-weight: bold;');
            };
            console.log('%cSHELLFARM INJECTION STAGE 1: GATHER VARS', 'color: yellow; font-weight: bold; font-size: 1.2em; text-decoration: underline;');
            try {
                getVar("PLAYERS", '([a-zA-Z]+)\\[[a-zA-Z]+\\]\\.hp=100');
                getVar("MYPLAYER", '\\),([a-zA-Z]+)\\.pitch=Math\\.clamp\\(');
                getVar("TEAMCOLORS", '\\{([a-zA-Z_$]+)\\.themClass\\[');
                getVar("GAMECODE", '\\{crazyShare:([a-zA-Z]+)\\}');

                createPopup("ShellFarm Script injected!","success");
                console.log(injectionString,allFuncName);
            } catch (err) {
                createPopup("Error! Scipt injection failed! See console.","error")
                alert( 'Oh bollocks! Looks like the script is out of date. Report this data to the original developers and any errors in the console.\n' + JSON.stringify( allFuncName, undefined, 2 ) );
                console.log(err);
                return js;
            };

            const modifyJS = function(find,replace) {
                let oldJS = js;
                js = js.replace(find,replace);
                if (oldJS !== js) {
                    console.log("%cReplacement successful! Injected code: "+replace, 'color: green; font-weight: bold; font-size: 0.6em; text-decoration: italic;');
                } else {
                    console.log("%cReplacement failed! Attempted to replace "+find+" with: "+replace, 'color: red; font-weight: bold; font-size: 0.6em; text-decoration: italic;');
                };
            };

            console.log('%cSHELLFARM INJECTION STAGE 2: INJECT VAR RETRIEVAL FUNCTION AND MAIN LOOP', 'color: yellow; font-weight: bold; font-size: 1.2em; text-decoration: underline;');
            //hook for main loop function in render loop
            match=js.match(/\.engine\.([a-zA-Z]+)\(\(function\(\)\{!/);
            console.log(match);
            modifyJS('.engine.'+match[1]+'((function(){',`.engine.${match[1]}((function(){if(window["${functionNames.retrieveFunctions}"]({${injectionString}},true)){return};`);
            modifyJS('console.log("After Game Ready"),', `console.log("After Game Ready: ShellFarm is also trying to add vars..."),window["${functionNames.retrieveFunctions}"]({${injectionString}}),`);
            console.log('%cSuccess! Variable retrieval and main loop ss.', 'color: green; font-weight: bold;');
            //hook for fov mods
            modifyJS(/\.fov\s*=\s*1\.25/g, '.fov = window.fixCamera()');
            modifyJS(/\.fov\s*\+\s*\(1\.25/g, '.fov + (window.fixCamera()');
            //chat mods: disable chat culling
            const somethingLength=/\.length>4&&([a-zA-Z]+)\[0\]\.remove\(\),/.exec(js)[1];
            modifyJS(new RegExp(`\\.length>4&&${somethingLength}\\[0\\]\\.remove\\(\\),`),`.length>window.getChatLimit()&&${somethingLength}[0].remove(),`);
            //chat mods: disable filter (credit to A3+++ for this finding)
            const filterFunction=/\|\|([a-zA-Z]+)\([a-zA-Z]+.normalName/.exec(js)[1];
            const thingInsideFilterFunction=new RegExp(`!${filterFunction}\\(([a-zA-Z]+)\\)`).exec(js)[1];
            modifyJS(`!${filterFunction}(${thingInsideFilterFunction})`,`((!${filterFunction}(${thingInsideFilterFunction}))||window.getDisableChatFilter())`);
            //chat mods: make filtered text red
            let [_, elm, str] = js.match(/\)\),([a-zA-Z]+)\.innerHTML=([a-zA-Z]+),/);
            modifyJS(_, _ + `${filterFunction}(${str})&&!arguments[2]&&(${elm}.style.color="red"),`);
            //skins
            match = js.match(/inventory\[[A-z]\].id===[A-z].id\)return!0;return!1/);
            if (match) modifyJS(match[0], match[0] + `||window.getSkinHack()`);
            //reset join/leave msgs
            modifyJS(',console.log("joinGame()',',window.newGame=true,console.log("value changed, also joinGame()');
            //get rid of tutorial popup because its a stupid piece of shit
            modifyJS(',vueApp.onTutorialPopupClick()','');
            //pointer escape
            modifyJS('onpointerlockchange=function(){','onpointerlockchange=function(){if (window.getPointerEscape()) {return};');

            modifyJS('console.log("startShellShockers"),', `console.log("SHELLFARM ACTIVE!"),`);
            console.log(js);

            H.playing = js.match(/this\.hp=[a-zA-Z]+\.hp,this\.([a-zA-Z]+)=[a-zA-Z]+\.[a-zA-Z]+,this/)[1];

            return js;
        };
    };

    const findKeyWithProperty = function(obj, propertyToFind) {
        for (const key in obj) {
            if (obj[key] === null || obj[key] === undefined) {
                continue;
            };
            if (!!obj[key] && (typeof(obj[key])=='object' || typeof(obj[key])=='function') && obj[key].hasOwnProperty(propertyToFind)) {
                return key;
            };
        };
        // Property not found
        return null;
    };

    const mainLoop = function () {
        const oneTime = function () {
            H.actor = findKeyWithProperty(ss.MYPLAYER,"mesh");
            ranOneTime=true;
        };
        const initVars = function () {
            if (unsafeWindow.newGame) {
                onlinePlayersArray=[];
            };
            username=ss.MYPLAYER?.name;

            const weaponBox = document.getElementById("weaponBox");
            const chatContainer = document.getElementById('chatOut');
            const chatItems = chatContainer.getElementsByClassName('chat-item');
            if ((weaponBox.style.display!=lastWeaponBox)||(chatItems.length!=lastChatItemLength)) {
                lastWeaponBox=weaponBox.style.display;
                lastChatItemLength=chatItems.length;

                const maxChat = extract("maxChat");
                const maxMessages = (weaponBox.style.display === "block" && maxChat) || 9999999;

                const startIndex = Math.max(0, chatItems.length - maxMessages);

                for (let i = chatItems.length - 1; i >= 0; i--) {
                    const chatIndex = i - startIndex;
                    const isInRange = chatIndex >= 0 && chatIndex < maxMessages;
                    chatItems[i].style.display = isInRange ? '' : 'none';
                };
            };

            ss.MYPLAYER[H.actor].scene.texturesEnabled=extract("enableTextures");
        };
        const iterateOverPlayers = function () {
            const objExists=Date.now();

            ss.PLAYERS.forEach(player=>{
                if (player && (player!==ss.MYPLAYER) && player[H.playing] && (player.hp>0) && ((!ss.MYPLAYER.team)||( player.team!==ss.MYPLAYER.team))) {
                    if (player[H.actor]) {
                        eggSize=extract("eggSize");
                        player[H.actor].bodyMesh.scaling = {x:eggSize, y:eggSize, z:eggSize};
                    };
                    player.exists=objExists;
                };
                if (player) {
                    if (!player.logged) {
                        player.logged=true;
                        if (extract("debug")) { playerLogger.push(player);console.log("Logged player: "+player.name,player) }
                        if (extract("joinMessages") && (!unsafeWindow.newGame)) {
                            processChatItem("joined.",player.name,player.team,"rgba(0, 255, 0, 0.2)");
                        };
                        onlinePlayersArray.push([player,player.name,player.team]);
                    };
                    player.isOnline=objExists;
                };
            });
            playersInGame=onlinePlayersArray.length;
            for ( let i=0;i<onlinePlayersArray.length;i++) {
                if (onlinePlayersArray[i][0] && onlinePlayersArray[i][0].isOnline==objExists) { //player still online
                    onlinePlayersArray[i][2]=onlinePlayersArray[i][0].team;
                } else {
                    if (extract("leaveMessages") && (!unsafeWindow.newGame)) {
                        processChatItem("left.",onlinePlayersArray[i][1],onlinePlayersArray[i][2],"rgba(255, 0, 0, 0.2)");
                    };
                    onlinePlayersArray.splice(i,1);
                };
            };
        };
        unsafeWindow.newGame=false;
        createAnonFunction("retrieveFunctions",function(vars,doShellFarm) { ss=vars ; if (doShellFarm) {F.SHELLFARM()} });
        createAnonFunction("SHELLFARM",function(){

            if ( !ranOneTime ) { oneTime() };

            initVars();
            
            iterateOverPlayers();

            if ( extract("chatHighlight") ) {
                document.getElementById("chatOut").style.userSelect="text"
            };
        });
    };

    //start init thingamajigs
    startUp();
})();
