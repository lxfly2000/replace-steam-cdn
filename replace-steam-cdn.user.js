// ==UserScript==
// @name         Replace Steam CDN
// @namespace    https://github.com/lxfly2000/replace-steam-cdn/raw/master/replace-steam-cdn.user.js
// @version      1.0
// @updateURL    https://github.com/lxfly2000/replace-steam-cdn/raw/master/replace-steam-cdn.user.js
// @downloadURL  https://github.com/lxfly2000/replace-steam-cdn/raw/master/replace-steam-cdn.user.js
// @description  Replace Steam CDN
// @author       lxfly2000
// @match        *://steamcommunity.com/*
// @match        *://steamdb.info/*
// @match        *://steamcardexchange.net/*
// @match        *://*.steamcardexchange.net/*
// @icon         https://store.steampowered.com/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 将所有cdn.cloudflare.steamstatic.com的链接换成media.st.dl.pinyuncloud.com
    // Akamai的链接暂时还不需要换……
    var doms=document.getElementsByTagName("img");
    for(var dom of doms){
        dom.src=dom.src.replace("cdn.cloudflare.steamstatic.com","media.st.dl.pinyuncloud.com");
    }
    doms=document.getElementsByTagName("a");
    for(dom of doms){
        dom.href=dom.href.replace("cdn.cloudflare.steamstatic.com","media.st.dl.pinyuncloud.com");
    }
})();
