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

var ChooseBase = window.dochangeSkin;
var cssElement = document.createElement("link");
cssElement.rel = "stylesheet";
cssElement.type = "text/css";
cssElement.href = "";

window.dochangeSkin = function(href, skin)
{
	if(!((String)(skin)).startsWith("Skin_Neptun_Anime"))
	{
		alert('Yep');
        window.localStorage.setItem('CustomSkin',null);
		alert(window.localStorage.getItem('CustomSkin'));
        return ChooseBase(href, skin)
    }

    var ls = skin.split('_');
    var skinName = ls[ls.length - 1];

    window.localStorage.setItem('CustomSkin',skinName);

    selectSkin(skinName)

}

function selectSkin(skinName)
{
    if(skinName === "Anime1")
    {
        cssElement.href = "https://gitcdn.link/repo/Balint66/NeptunSkins/master/Neptune/main.css";
    }
}

function createButton({name='', alt=null})
{
    var neptune = document.createElement("input");
    neptune.type = "image";
    neptune.name = "btnskin" + name;
    neptune.id = "btnskin" + name;
    neptune.tabIndex = 7;
    neptune.classList = ["skinchooserimg"];
    neptune.onblur = function(event){};
    neptune.onfocus = function(event){};
    neptune.src = "App_Themes/New_Common_Images/skin_pink_new.png";
    neptune.alt = alt || "Anime";
    neptune.style = "height: 20px; margin-bottom: 5px; cursor: pointer; width: 20px;"
    neptune.setAttribute("aria-hidden", "false");
    neptune.onclick = function(event){
        javascript: SkinChoose('Skin_Neptun_'+name);
        return false;
    }
    neptune.onmouseover = window.showSkinPreview.bind(neptune, { data: {skinName: name}});
    neptune.onmouseout = window.hideSkinPreview.bind(neptune, { data: {skinName: name}});
    return neptune;
}

function addPreviewsto({parent, alt, name='',src=''})
{
    var labelNeptune = document.createElement("label");
    labelNeptune.classList = ["hiddenforlabel"];
    labelNeptune.setAttribute("for", "image"+name);
    labelNeptune.innerHTML = alt || "Neptune";

    parent.appendChild(labelNeptune);

    var neptunePreview = document.createElement("input");
    neptunePreview.type = "image";
    neptunePreview.alt = alt || "Neptune";
    neptunePreview.id = "image"+name;
    neptunePreview.style = "display: none;"
    neptunePreview.src = src;
    neptunePreview.height = 60;
    parent.appendChild(neptunePreview);
}

window.addEventListener('load', function() {

    var h = document.querySelectorAll('head')[0];

    h.appendChild(cssElement);

    if( window.localStorage.getItem('CustomSkin') !== 'null')
    {
		selectSkin(window.localStorage.getItem('CustomSkin'));
    }

    var skinChooser = ( document.getElementsByClassName("skinchooserimgcollapsed") || document.getElementsByClassName("skinchooserimgexpanded") )[0];

    skinChooser.children[0].appendChild(createButton({name: "Anime1"}));

    var previewColl = document.getElementsByClassName("skinsmallimage")[0];

    addPreviewsto({parent: previewColl, name:"Anime1", src:"https://i.imgur.com/2HVmKTd.png"})


}, false);