// ==UserScript==
// @name        Redirect SE homepage to search
// @namespace   https://github.com/normalhuman/CustomSE
// @description Redirects from the home page of an SE site to search page
// @match       *://*.askubuntu.com
// @match       *://*.mathoverflow.net
// @match       *://*.serverfault.com
// @match       *://*.stackexchange.com
// @match       *://*.stackoverflow.com
// @match       *://*.superuser.com
// @exclude     *://area51.*
// @exclude     *://discuss.area51.*
// @exclude     *://blog.*
// @exclude     *://careers.*
// @exclude     *://chat.*
// @exclude     *://data.*
// @exclude     *://api.*
// @exclude     *://openid.*
// @exclude     *://elections.*
// @exclude     *://winterbash*
// @exclude     *://modnewsletter*
// @exclude     *://business.stackoverflow.*
// @grant       none
// @run-at      document-start
// @version     16.3.3
// ==/UserScript==

window.location.replace(window.location.href + "search");
