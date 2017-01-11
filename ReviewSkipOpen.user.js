// ==UserScript==
// @name        Review: skip + open in another tab
// @namespace   https://github.com/normalhuman/CustomSE
// @description Adds "+skip" next to "link" in review, which not only opens the post, but also skips it in review. 
// @match       *://*.askubuntu.com/review/*
// @match       *://*.mathoverflow.net/review/*
// @match       *://*.serverfault.com/review/*
// @match       *://*.stackapps.com/review/*
// @match       *://*.stackexchange.com/review/*
// @match       *://*.stackoverflow.com/review/*
// @match       *://*.superuser.com/review/*
// @grant       none
// @run-at      document-end
// @version     15.7.1
// ==/UserScript==

window.setInterval(skip, 200);

function skip() {
  var link = document.querySelector('.label-key a');
  if (link && !link.classList.contains('skipping')) {
    link.classList.add('skipping');
    var skiplink = newElem('a', '', '', '+skip');
    skiplink.href = link.href;
    skiplink.target = "_blank";
    skiplink.onclick = function() {
      var actions = document.querySelector('.review-actions').children;
      actions[actions.length-1].click();
    };
    link.parentElement.appendChild(skiplink);
  }
}

function newElem(eType,eId,eClass,eText) {
  var e = document.createElement(eType);
  if (eId.length>0) {e.id = eId;}
  if (eClass.length>0) {e.classList.add(eClass);}
  if (eText.length>0) {e.textContent = eText;}
  return e;
}
