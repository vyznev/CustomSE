// ==UserScript==
// @name        Search SE sites with Google
// @namespace   https://github.com/normalhuman/CustomSE
// @description Pressing Alt-Enter in SE search box invokes Google search in a new tab.
// @match       *://*.askubuntu.com/*
// @match       *://*.mathoverflow.net/*
// @match       *://*.serverfault.com/*
// @match       *://*.stackapps.com/*
// @match       *://*.stackexchange.com/*
// @match       *://*.stackoverflow.com/*
// @match       *://*.superuser.com/*
// @exclude     *://chat.*
// @grant       GM_openInTab
// @run-at      document-end
// @version     17.7.1
// ==/UserScript==


var smallBox = document.querySelector("#search input");
if (smallBox) {
  smallBox.addEventListener("keydown", function(e) {
    if (e.keyCode == 13 && e.altKey) {
      google(smallBox.value);
    }
  });
}

var largeBox = document.querySelector("#bigsearch input");
if (largeBox) {
  largeBox.addEventListener("keydown", function(e) {
    if (e.keyCode == 13 && e.altKey) {
      google(largeBox.value);
    }
  });
}


function google(string) {
  var host = window.location.hostname;
  var param = " site:" + host + (host == "meta.stackexchange.com" ? " -site:*.meta.stackexchange.com" : "");
  var url = encodeURI("https://google.com/search?q=" + string + param).replace(/\+/g,"%2B");
  GM_openInTab(url);
}
