// ==UserScript==
// @name        Redirect short links to comments
// @namespace   https://github.com/normalhuman/CustomSE
// @description Redirects from site/c/12345 to site/posts/comments/12345 which leads to the comment with Id 12345
// @match       *://*.askubuntu.com/c/*
// @match       *://*.mathoverflow.net/c/*
// @match       *://*.serverfault.com/c/*
// @match       *://*.stackexchange.com/c/*
// @match       *://*.stackoverflow.com/c/*
// @match       *://*.superuser.com/c/*
// @grant       none
// @run-at      document-start
// @version     17.1.1
// ==/UserScript==

window.location.replace(window.location.href.replace(/\/c\//, "/posts/comments/"));
