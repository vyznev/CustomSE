// ==UserScript==
// @name        Anonymize short links
// @namespace   https://github.com/normalhuman/CustomSE
// @description Removes UserId from the href attributes of "share" buttons on Stack Exchange.  
// @match       *://*.askubuntu.com/questions/*
// @match       *://*.mathoverflow.net/questions/*
// @match       *://*.serverfault.com/questions/*
// @match       *://*.stackapps.com/questions/*
// @match       *://*.stackexchange.com/questions/*
// @match       *://*.stackoverflow.com/questions/*
// @match       *://*.superuser.com/questions/*
// @grant       none
// @run-at      document-end
// @version     15.7.2
// ==/UserScript==

var share = document.getElementsByClassName('short-link');
for (var i=0; i<share.length; i++) {
  share[i].href = /\/[qa]\/\d+/.exec(share[i].href)[0];
}
