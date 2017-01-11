// ==UserScript==
// @name        NAA links under answers; UNC and VLQ under questions
// @namespace   https://github.com/normalhuman/CustomSE
// @description Adds a link for not-an-answer flag under answers, and "close/unclear" under questions (only if can close)
// @match       *://*.askubuntu.com/questions/*
// @match       *://*.mathoverflow.net/questions/*
// @match       *://*.serverfault.com/questions/*
// @match       *://*.stackapps.com/questions/*
// @match       *://*.stackexchange.com/questions/*
// @match       *://*.stackoverflow.com/questions/*
// @match       *://*.superuser.com/questions/*
// @grant       none
// @run-at      document-end
// @version     16.8.1
// ==/UserScript==

var elem, uncAdded = false, answers = document.querySelectorAll('.answercell .post-menu');
for (var i=0; i<answers.length; i++) {
  elem = newElem('a', '', 'naa-link', 'naa');
  elem.style.cursor = 'pointer';
  elem.style['margin-left'] = '30px';
  elem.onclick = function(e) {flagNAA(e.target);};
  answers[i].appendChild(elem);
}
var question = document.querySelector('.postcell .post-menu');
var closeLink = document.querySelector('.close-question-link');
if (closeLink && closeLink.innerText.charAt(0)==='c' && closeLink.title.charAt(0)!=='Y') {
  elem = newElem('a', '', 'unc-link', 'unc');
  elem.style.cursor = 'pointer';
  elem.style['margin-left'] = '30px';
  elem.onclick = function(e) {closeUnclear(e.target);};
  question.appendChild(elem);
  uncAdded = true;
}
elem = newElem('a', '', 'vlq-link', 'vlq');
elem.style.cursor = 'pointer';
elem.style['margin-left'] = (uncAdded ? '5px' : '30px');
elem.onclick = function(e) {flagVLQ(e.target);};
question.appendChild(elem);


function flagNAA(post) {
  post.parentNode.querySelector('.flag-post-link').click();
  window.setTimeout(pickOption, 200, 2);
}


function flagVLQ(post) {
  post.parentNode.querySelector('.flag-post-link').click();
  window.setTimeout(pickVLQ, 200);
}


function pickVLQ() {
  var opts = document.querySelectorAll('.action-list input');
  if (opts.length === 0) {
    window.setTimeout(pickVLQ, 200);
    return;
  }
  for (var i = 0; i < opts.length; i++) {
    if (opts[i].value == 'PostLowQuality') {
      pickOption(i);
      break;
    }
  }
}


function closeUnclear(post) {
  var elem = post.parentNode.querySelector('.close-question-link');
  if (elem) {
    elem.click();
    window.setTimeout(pickOption, 200, 2);
  }
}


function pickOption(n) {
  var opts = document.getElementsByClassName('action-desc');
  if (opts.length) {
    opts[n].click();
    window.setTimeout(confirm, 200);
  }
  else {
    window.setTimeout(pickOption, 200, n);
  }
}


function confirm() {
  if (document.getElementsByClassName('already-flagged').length === 0) {
    document.querySelector('.popup-submit').click();
  }
}


function newElem(eType,eId,eClass,eText) {
  var e = document.createElement(eType);
  if (eId.length > 0) {
    e.id = eId;
  }
  if (eClass.length > 0) {
    e.classList.add(eClass);
  }
  if (eText.length > 0) {
    e.textContent = eText;
  }
  return e;
}
