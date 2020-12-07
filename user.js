// ==UserScript==
// @name        Neptune
// @namespace   Violentmonkey Scripts
// @include        https://*neptun*/*hallgato*/*
// @include        https://*neptun*/*Hallgatoi*/*
// @include        https://*neptun*/*oktato*/*
// @include        https://*hallgato*.*neptun*/*
// @include        https://*oktato*.*neptun*/*
// @include        https://netw*.nnet.sze.hu/hallgato/*
// @include        https://nappw.dfad.duf.hu/hallgato/*
// @include        https://host.sdakft.hu/*
// @include        https://neptun.ejf.hu/ejfhw/*
// @grant       none
// @version     2.0
// @author      --
// @description 11/24/2020, 3:09:00 PM
// ==/UserScript==

var $ = window.jQuery;
var ChooseBase = window.dochangeSkin;

var css = document.createElement("link");
css.rel = "stylesheet";
css.type = "text/css";
css.href = "";

var selector = document.createElement('select');
selector.id = 'skinSelectorDropdown';
selector.style.width = "100px";
selector.onchange = function() {
  javascript: SkinChoose(this.value);
  return false;
}

var arrow_up = $("[src$=\"searchpanel_up.png\"]")[0];
var arrow_down = $("[src$=\"searchpanel_down.png\"]")[0];
var arrow_right = $("#mainfunctionarrow")[0];
var crosses = $('[src$="16_ghb_close.png"]');
var refreshers = $('[src$="16_ghb_refresh.png"]');

const base_url = "https://gitcdn.link/repo/Balint66/NeptunSkins/master/";
var skins = ["Neptune", "Yotsuba"];

var commoncss = document.createElement("link"); 
commoncss.rel = "stylesheet";
commoncss.type = "text/css";
commoncss.href = base_url + "common/main.css";

var updatePanelBase = window.Sys.WebForms.PageRequestManager.prototype._updatePanel;

window.Sys.WebForms.PageRequestManager.prototype._updatePanel = function(a, b) {
  var currentTheme = getCurrentTheme();
  b = b.replace(/"\S+16_ghb_close\.png"/gm, `"${base_url + currentTheme + '/16_ghb_close.svg'}" style="height: 16px;"`);
  b = b.replace(/"\S+16_ghb_refresh\.png"/gm, `"${base_url + currentTheme + '/16_ghb_refresh.svg'}" style="height: 16px;"`);
  updatePanelBase(a, b);
}

    window.CountDown = start;

function getCurrentTheme() {
  if (window.localStorage.getItem('CustomSkin') !== 'null') {
    return 'Skin_Neptun_Custom_' + window.localStorage.getItem('CustomSkin');
  } else {
    var head = $('head')[0];
    var theme = head.innerHTML.match(/(?<=App_Themes\/)Skin_Neptun_\S+(?=\/(s|S)kin_(n|N)eptun_\S+\.css)/)[0];
    console.log(theme);
    return theme;
  }
}

function showHideThemeChooser() {

  var col = $('.skinchooserimgcollapsed')
  var selector = $('#skinSelectorDropdown');

  if (col != null && col.length !== 0) {
    var cho = $('.skinchooserimg')
    cho.width("100px");
    cho.animate({height : "0px"}, 300);
    cho.animate({height : "20px"}, 150);
    col.toggleClass("skinchooserimgcollapsed skinchooserimgexpanded", 300);
    selector[0].style.visibility = 'visible';
  } else {
    $('.skinchooserimgexpanded').toggleClass("skinchooserimgexpanded skinchooserimgcollapsed", 300);
    selector[0].style.visibility = 'hidden';
  }

  state = !state;
  selector.attr('aria-hidden', state);
}

window.dochangeSkin = function(href, skin) {
  for (var option in selector.options) {
    if (option.value === skin) {
      option.selected = true;
    } else if (option.selected) {
      option.selected = false;
    }
  }

  if (!((String)(skin)).startsWith("Skin_Neptun_Custom")) {
    window.localStorage.setItem('CustomSkin', null);
    return ChooseBase(href, skin)
  }

  var ls = skin.split('_');
  var skinName = ls[ls.length - 1];

  window.localStorage.setItem('CustomSkin', skinName);

  selectSkin(skinName)
}

function selectSkin(skinName) {
  css.href = base_url + skinName + "/main.css?v=1";
  arrow_right.src = base_url + skinName + "/right_arrow.png";
  if (arrow_up !== undefined) {
    arrow_up.src = base_url + skinName + "/searchpanel_up.png";
  }
  if (arrow_down !== undefined) {
    arrow_down.src = base_url + skinName + "/searchpanel_down.png"
  }
  for (var i = 0; i < crosses.length; i += 1) {
    crosses[i].src = base_url + skinName + "/16_ghb_close.svg";
    crosses[i].style = "height: 16px;";
  }
  for (var j = 0; j < refreshers.length; j += 1) {
    refreshers[j].src = base_url + skinName + "/16_ghb_refresh.svg";
    refreshers[j].style = "height: 16px;";
  }
}

function
init() {

  //add common css
  var h = document.querySelector('head');
  h.appendChild(commoncss);
  // fixing the chooser function by replacing the element.
  var chooserButton = $('#imgSkinChooser')[0];

  var clone = chooserButton.cloneNode(true);
  clone.onclick = showHideThemeChooser;
  chooserButton.parentElement.replaceChild(clone, chooserButton);

  // Theme chooser fix
  window.ShowHideThemeChooser = showHideThemeChooser;

  var skinchooserimg_blue = $('.skinchooserimg_blue');
  var skinchooserimg_green = $('.skinchooserimg_green');
  var skinchooserimg_pink = $('.skinchooserimg_pink');
  var skinchooserimg_orange = $('.skinchooserimg_orange');
  var skinchooserimg_teacher = $('.skinchooserimg_teacher');
  var skinchooserimg_purple = $('.skinchooserimg_purple');
  var skinchooserimg_szte = $('.skinchooserimg_szte');

  setSkinImageUrl();

  skinchooserimg_blue.bind('mouseover', {skinName : 'Blue'}, showSkinPreview);
  skinchooserimg_green.bind('mouseover', {skinName : 'Green'}, showSkinPreview);
  skinchooserimg_pink.bind('mouseover', {skinName : 'Pink'}, showSkinPreview);
  skinchooserimg_orange.bind('mouseover', {skinName : 'Orange'},
                             showSkinPreview);
  skinchooserimg_teacher.bind('mouseover', {skinName : 'Teacher'},
                              showSkinPreview);
  skinchooserimg_purple.bind('mouseover', {skinName : 'Purple'},
                             showSkinPreview);
  skinchooserimg_szte.bind('mouseover', {skinName : 'SZTE'}, showSkinPreview);

  skinchooserimg_blue.bind('mouseout', {skinName : 'Blue'}, hideSkinPreview);
  skinchooserimg_green.bind('mouseout', {skinName : 'Green'}, hideSkinPreview);
  skinchooserimg_pink.bind('mouseout', {skinName : 'Pink'}, hideSkinPreview);
  skinchooserimg_orange.bind('mouseout', {skinName : 'Orange'},
                             hideSkinPreview);
  skinchooserimg_teacher.bind('mouseout', {skinName : 'Teacher'},
                              hideSkinPreview);
  skinchooserimg_purple.bind('mouseout', {skinName : 'Purple'},
                             hideSkinPreview);
  skinchooserimg_szte.bind('mouseout', {skinName : 'SZTE'}, hideSkinPreview);

  // Custom themes
  var skinChooser =
      (document.getElementsByClassName("skinchooserimgcollapsed") ||
       document.getElementsByClassName("skinchooserimgexpanded"))[0];

  var ch = skinChooser.children[0].children;

  var reg = /Skin_Neptun_\S+(?='|")/g
  var selectedTheme = getCurrentTheme();

  for (var i = 0; i < ch.length; i++) {
    var option = document.createElement('option');
    var name = ch[i].onclick.toString().match(reg)[0];
    option.value = name;
    option.innerHTML = name.split('_').slice(-1)[0];
    if (selectedTheme.toLowerCase() === name.toLowerCase()) {
      option.selected = true;
    }
    selector.appendChild(option);
  }

  for (var skin in skins) {
    selector.appendChild(createOption({name : skins[skin]}));
  }
  document.getElementsByClassName("langskinpartially")[0].innerHTML = "";
  document.getElementsByClassName("langskinpartially")[0].appendChild(selector);

  // Footer addition
  var footer = $('.footer')[0];
  var logo = footer.children[footer.children.length - 2];
  var PTLogo = document.createElement('td');
  PTLogo.classList = [ 'footer_sda_logo' ];
  logo.insertAdjacentHTML('afterend', PTLogo.outerHTML);
}

function createOption({name = ''}) {
  var neptune = document.createElement('option');
  neptune.onmouseover = window.showSkinPreview.bind(neptune, {data : {skinName : name}});
  neptune.onmouseout = window.hideSkinPreview.bind(neptune, {data : {skinName : name}});
  neptune.value = 'Skin_Neptun_Custom_' + name;
  neptune.selected = ('Skin_Neptun_Custom_' + name) === getCurrentTheme();
  neptune.innerHTML = name;
  return neptune;
}

function
start() {
  var h = document.querySelector('head');

  h.appendChild(css);

  var skin = window.localStorage.getItem('CustomSkin') || "Neptune";
  selectSkin(skin);
}

init();

