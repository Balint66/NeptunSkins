// ==UserScript==
// @name           Neptune
// @namespace      Violentmonkey Scripts
// @include        https://*neptun*/*hallgato*/*
// @include        https://*neptun*/*Hallgatoi*/*
// @include        https://*neptun*/*oktato*/*
// @include        https://*hallgato*.*neptun*/*
// @include        https://*oktato*.*neptun*/*
// @include        https://netw*.nnet.sze.hu/hallgato/*
// @include        https://nappw.dfad.duf.hu/hallgato/*
// @include        https://host.sdakft.hu/*
// @include        https://neptun.ejf.hu/ejfhw/*
// @grant          none
// @version        2.0.1
// @author         --
// @icon           https://balint66.github.io/NeptunSkins/repo_assets/icon.webp
// @description    11/24/2020, 3:09:00 PM
// @downloadURL    https://raw.githubusercontent.com/Balint66/NeptunSkins/master/neptune.user.js
// ==/UserScript==

const $ = window.jQuery;
var ChooseBase = window.dochangeSkin;

const css = document.createElement("link");
css.rel = "stylesheet";
css.type = "text/css";
css.href = "";

const skin_selector = document.createElement('select');
skin_selector.id = 'skinSelectorDropdown';
skin_selector.style.width = "100px";
skin_selector.onchange = function() {
  javascript: SkinChoose(this.value);
  return false;
}

const language_selector = document.createElement('select');
language_selector.id = 'languageSelectorDropdown';
language_selector.style.width = "100px";
language_selector.onchange = function() {
  if (this.value == "HU") {
    dochangeLanguage('0', '1038')
  } else if (this.value == "EN") {
    dochangeLanguage('1', '1033')
  } else if (this.value == "DE") {
    dochangeLanguage('2', '1031')
  }
  return false;
}

const help_link = $('#lnkHelp')[0];

var arrow_up = $("[src$=\"searchpanel_up.png\"]")[0];
var arrow_down = $("[src$=\"searchpanel_down.png\"]")[0];
var arrow_right = $("#mainfunctionarrow")[0];
var crosses = $('[src$="16_ghb_close.png"]');
var refreshers = $('[src$="16_ghb_refresh.png"]');

const base_url = "https://Balint66.github.io/NeptunSkins/";
const skins = ["Neptune", "Yotsuba", "Menhera-dark", "Menhera-light", "PinkPanther", "Lain"];

var commoncss = document.createElement("link");
commoncss.rel = "stylesheet";
commoncss.type = "text/css";
commoncss.href = base_url + "common/main.css";

var updatePanelBase = window.Sys.WebForms.PageRequestManager.prototype._updatePanel;

window.Sys.WebForms.PageRequestManager.prototype._updatePanel = function(a, b) {
  var currentTheme = getCurrentTheme().split('_').slice(-1);
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

function getCurrentLang() {
  return (help_link.href || 'help/hweb_de.pdf').match(/(?<=help\/hweb_)\S+(?=\.pdf)/)[0];
}

function showHideThemeChooser() {

  var col = $('.skinchooserimgcollapsed')
  var selector = $('#skinSelectorDropdown');

  if (col != null && col.length !== 0) {
    var cho = $('.skinchooserimg')
    cho.width("100px");
    cho.animate({
      height: "0px"
    }, 300);
    cho.animate({
      height: "20px"
    }, 150);
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
  for (var option in skin_selector.options) {
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
  /* Now with the selection replacement thi si redundant.
  var chooserButton = $('#imgSkinChooser')[0];

  var clone = chooserButton.cloneNode(true);
  clone.onclick = showHideThemeChooser;
  chooserButton.parentElement.replaceChild(clone, chooserButton);*/

  // this is for NPU compatibility
  $("#panCloseHeader").show();
  $("table.top_menu_wrapper").css("margin-top", "0px").css("margin-bottom", "0px");
  if ($('#panCloseHeader').attr('class') == "CloseHeader") {
    $("#panHeader, #panCloseHeader").show();
    $("#span_changeproject").parent().show();
  }

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

  skinchooserimg_blue.bind('mouseover', {
    skinName: 'Blue'
  }, showSkinPreview);
  skinchooserimg_green.bind('mouseover', {
    skinName: 'Green'
  }, showSkinPreview);
  skinchooserimg_pink.bind('mouseover', {
    skinName: 'Pink'
  }, showSkinPreview);
  skinchooserimg_orange.bind('mouseover', {
      skinName: 'Orange'
    },
    showSkinPreview);
  skinchooserimg_teacher.bind('mouseover', {
      skinName: 'Teacher'
    },
    showSkinPreview);
  skinchooserimg_purple.bind('mouseover', {
      skinName: 'Purple'
    },
    showSkinPreview);
  skinchooserimg_szte.bind('mouseover', {
    skinName: 'SZTE'
  }, showSkinPreview);

  skinchooserimg_blue.bind('mouseout', {
    skinName: 'Blue'
  }, hideSkinPreview);
  skinchooserimg_green.bind('mouseout', {
    skinName: 'Green'
  }, hideSkinPreview);
  skinchooserimg_pink.bind('mouseout', {
    skinName: 'Pink'
  }, hideSkinPreview);
  skinchooserimg_orange.bind('mouseout', {
      skinName: 'Orange'
    },
    hideSkinPreview);
  skinchooserimg_teacher.bind('mouseout', {
      skinName: 'Teacher'
    },
    hideSkinPreview);
  skinchooserimg_purple.bind('mouseout', {
      skinName: 'Purple'
    },
    hideSkinPreview);
  skinchooserimg_szte.bind('mouseout', {
    skinName: 'SZTE'
  }, hideSkinPreview);

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
    skin_selector.appendChild(option);
  }

  for (var skin in skins) {
    skin_selector.appendChild(createOption({
      name: skins[skin]
    }));
  }

  var currentLang = getCurrentLang();

  var hu = document.createElement('option');
  hu.value = 'HU';
  hu.innerHTML = 'Magyar';
  if (currentLang == 'hu') {
    hu.selected = true;
  }
  var en = document.createElement('option');
  en.value = 'EN';
  en.innerHTML = 'English';
  if (currentLang == 'en') {
    en.selected = true;
  }
  var de = document.createElement('option');
  de.value = 'DE';
  de.innerHTML = 'Deutsch';
  if (currentLang == 'de') {
    de.selected = true;
  }

  language_selector.appendChild(hu);
  language_selector.appendChild(en);
  language_selector.appendChild(de);

  document.getElementsByClassName("langskinpartially")[0].innerHTML = "";
  document.getElementsByClassName("langskinpartially")[0].appendChild(language_selector);
  document.getElementsByClassName("langskinpartially")[0].appendChild(skin_selector);

  const modernCssRegex = /(?<=\<link href=")(App_Themes\/Skin_Neptun_\S+\/neptun-modern\.css)(?=" type="text\/css" rel="stylesheet"\>)/g;

  h.innerHTML = h.innerHTML.replace(modernCssRegex, 'https://unpkg.com/normalize.css/normalize.css');

  // Footer addition
  var footer = $('.footer')[0];
  var logo = footer.children[footer.children.length - 2];
  var PTLogo = document.createElement('td');
  PTLogo.classList = ['footer_sda_logo'];
  logo.insertAdjacentHTML('afterend', PTLogo.outerHTML);
}

function createOption({
  name = ''
}) {
  var skin_option = document.createElement('option');
  skin_option.onmouseover = window.showSkinPreview.bind(skin_option, {
    data: {
      skinName: name
    }
  });
  skin_option.onmouseout = window.hideSkinPreview.bind(skin_option, {
    data: {
      skinName: name
    }
  });
  skin_option.value = 'Skin_Neptun_Custom_' + name;
  skin_option.selected = ('Skin_Neptun_Custom_' + name) === getCurrentTheme();
  skin_option.innerHTML = name;
  return skin_option;
}

function
start() {
  var h = document.querySelector('head');

  h.appendChild(css);

  var skin = window.localStorage.getItem('CustomSkin') || "Neptune";
  selectSkin(skin);
}

init();
