// ==UserScript==
// @name         Scroll review screen down to buttons
// @namespace    http://tampermonkey.net/
// @version      17.1.2
// @description  Review page jumps to top of the page every time I move to another item. But there is nothing to see above the four big buttons.
// @description  This script moves the page to maximize the amount of text visible without scrolling. 
// @author       Shog9, http://chat.meta.stackexchange.com/transcript/message/5690756#5690756
// @author       modified by zaq
// @match       *://*.askubuntu.com/review/*
// @match       *://*.mathoverflow.net/review/*
// @match       *://*.serverfault.com/review/*
// @match       *://*.stackapps.com/review/*
// @match       *://*.stackexchange.com/review/*
// @match       *://*.stackoverflow.com/review/*
// @match       *://*.superuser.com/review/*
// @grant        none
// ==/UserScript==

(function() {
'use strict';

$(document).ajaxSuccess(function(event, XMLHttpRequest, ajaxOptions) {
  if (ajaxOptions.url.indexOf("/review/next-task") === 0 || ajaxOptions.url.indexOf("/review/task-reviewed") === 0) {
	document.querySelector('.review-bar').id = 'scroll_here';
    setTimeout(function() {
      location.hash="#scroll_here";
    }, 100);
 }
});

})();
