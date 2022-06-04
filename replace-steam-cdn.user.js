// ==UserScript==
// @name         Replace Steam CDN
// @namespace    https://github.com/lxfly2000/replace-steam-cdn/raw/master/replace-steam-cdn.user.js
// @version      1.2.1
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

function ReplaceSteamCDN_Replace(){
    "use strict";
    ReplaceSteamCDN_mo.disconnect();
    console.log("正在替换链接……");
    // 将所有cdn.cloudflare.steamstatic.com的链接换成media.st.dl.pinyuncloud.com
    // Akamai的链接暂时还不需要换……
    var substitutions=[
        {a:"community.cloudflare.steamstatic.com",b:"community.akamai.steamstatic.com"},
        {a:"cdn.cloudflare.steamstatic.com",b:"media.st.dl.pinyuncloud.com"}];
    var doms=document.getElementsByTagName("img");
    for(var dom of doms){
        for(var s of substitutions){
            dom.src=dom.src.replace(s.a,s.b);
        }
    }
    doms=document.getElementsByTagName("video");
    for(dom of doms){
        for(s of substitutions){
            dom.src=dom.src.replace(s.a,s.b);
        }
    }
    doms=document.getElementsByTagName("a");
    for(dom of doms){
        for(s of substitutions){
            dom.href=dom.href.replace(s.a,s.b);
        }
    }
    ReplaceSteamCDN_mo.observe(document.getRootNode(),{attributes:true,childList:true,subtree:true});
}

let ReplaceSteamCDN_mo=new MutationObserver(mutations=>ReplaceSteamCDN_Replace());

(function() {
    'use strict';

    ReplaceSteamCDN_Replace();
})();
