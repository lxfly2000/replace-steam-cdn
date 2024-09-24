// ==UserScript==
// @name         Replace Steam CDN
// @namespace    https://github.com/lxfly2000/replace-steam-cdn/raw/master/replace-steam-cdn.user.js
// @version      1.3.5
// @updateURL    https://github.com/lxfly2000/replace-steam-cdn/raw/master/replace-steam-cdn.user.js
// @downloadURL  https://github.com/lxfly2000/replace-steam-cdn/raw/master/replace-steam-cdn.user.js
// @description  Replace Steam CDN
// @author       lxfly2000
// @match        *://*.steampowered.com/*
// @match        *://steamcommunity.com/*
// @match        *://steamdb.info/*
// @match        *://steamcardexchange.net/*
// @match        *://*.steamcardexchange.net/*
// @icon         https://store.steampowered.com/favicon.ico
// @grant        GM_xmlhttpRequest
// @connect      *
// ==/UserScript==

var substitutions=[
    {a:"community.cloudflare.steamstatic.com",b:"community.akamai.steamstatic.com"},
    {a:"avatars.cloudflare.steamstatic.com",b:"avatars.st.dl.eccdnx.com"},
    {a:"cdn.cloudflare.steamstatic.com",b:"media.st.dl.eccdnx.com"},
    {a:"cdn.akamai.steamstatic.com",b:"media.st.dl.eccdnx.com"},
    {a:"avatars.akamai.steamstatic.com",b:"avatars.st.dl.eccdnx.com"}
];
var asyncloadHosts=[
    "steamdb.info"
];

function ReplaceSteamCDN_setAttribute(dom,attr,value){
    ReplaceSteamCDN_StopObserve();
    dom.setAttribute(attr,value);
    ReplaceSteamCDN_StartObserve();
}

function ReplaceSteamCDN_AsyncReplace(dom,repAttr,repA,repB){
    GM_xmlhttpRequest({
        context:dom,
        method:"GET",
        url:dom.src.replace(repA,repB),
        headers:{
            "Accept-Encoding": "gzip, deflate, br"
        },
        responseType:"blob",
        onload:function(param){
            const fileReader=new FileReader();
            fileReader.readAsDataURL(param.response);
            fileReader.onload=e=>ReplaceSteamCDN_setAttribute(param.context,repAttr,e.target.result);
        }
    });
}

function ReplaceSteamCDN_Replace(){
    "use strict";
    ReplaceSteamCDN_StopObserve();
    console.log("正在替换链接……");
    // 将所有cdn.cloudflare.steamstatic.com的链接换成media.st.dl.pinyuncloud.com
    // Akamai的链接暂时还不需要换……
    var doms=document.getElementsByTagName("a");
    for(var dom of doms){
        for(s of substitutions){
            dom.href=dom.href.replace(s.a,s.b);
        }
    }
    doms=document.getElementsByTagName("img");
    for(dom of doms){
        for(var s of substitutions){
            if(ReplaceSteamCDN_asyncload){
                if(dom.src.search(s.a)!=-1||dom.src.search(s.b)!=-1){
                    ReplaceSteamCDN_AsyncReplace(dom,"src",s.a,s.b);
                }
            }else{
                dom.src=dom.src.replace(s.a,s.b);
            }
        }
    }
    doms=document.getElementsByTagName("video");
    for(dom of doms){
        for(s of substitutions){
            dom.src=dom.src.replace(s.a,s.b);
        }
    }
    ReplaceSteamCDN_StartObserve();
}

let ReplaceSteamCDN_mo=new MutationObserver(mutations=>ReplaceSteamCDN_Replace());
var ReplaceSteamCDN_asyncload=false;

function ReplaceSteamCDN_StartObserve(){
    ReplaceSteamCDN_mo.observe(document.getRootNode(),{attributes:false,childList:false,subtree:true});
}

function ReplaceSteamCDN_StopObserve(){
    ReplaceSteamCDN_mo.disconnect();
}

(function() {
    'use strict';

    for(var s of asyncloadHosts){
        if(s==location.host){
            ReplaceSteamCDN_asyncload=true;
            break;
        }
    }
    ReplaceSteamCDN_Replace();
})();
