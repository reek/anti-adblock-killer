// ==UserScript==
// @name Anti-Adblock Killer | Reek
// @description Anti-Adblock Killer removes many protections used on some website that force the user to disable the AdBlocker. So you can continue to visit this website without having to disable your AdBlocker. Compatible with the browsers Firefox and Chrome.

// @author Reek | http://reeksite.com/
// @version 3.4
// @license GPL version 3
// @encoding utf-8
// @icon http://www.gravatar.com/avatar/afb8376a9f634cd3501af4387de6425f.png
// @namespace https://userscripts.org/scripts/show/155840
// @updateURL https://userscripts.org/scripts/source/155840.meta.js
// @downloadURL https://userscripts.org/scripts/source/155840.user.js

// @include http*://*
// @exclude http*://*google.*
// @exclude http*://*youtube.com/*
// @exclude http*://*facebook.com/*
// @exclude http*://*twitter.com/*
// @exclude http*://*reeksite.com/*
// @exclude http*://*userscripts.org/*
// @run-at document-start
// ==/UserScript==
/*=====================================================
  THANKS
=======================================================
  
  Dindog, Floxflob, Couchy, U Bless and all who support this project and help its development.

=======================================================
  CHANGELOG
=======================================================  

  http://userscripts.org/topics/129396
  for more informations consult olders script versions.
  
=======================================================
  NOTES
=======================================================

  Wordpress Plugins
  No Adblock -> Ineffective against Adblock Plus
  Wordpress Adblock Blocker - Ineffective against Adblock Plus
  Adblock Blocker -> Ineffective against Adblock Plus

=======================================================
  VARS
======================================================*/

// For Antiblock.org
var reId = /^[a-z0-9]{4}$/i;
var reAdvertMsg = /(So please Help us and DISABLE it on our website|You are using an Ad Block on our website|Si tu ne veux pas regarder mes pubs, tu ne pourra non plus regarder mon site|You are using an Ad Block on our website)/i;
var reAdBlock = /ad blocker|ad block|ad-block|adblocker|ad-blocker|adblock|bloqueur|bloqueador|Werbeblocker/i;
var reDisable = /disable|désactivez|désactiver|desactivez|desactiver|desative|desactivar|desactive|desactiva|deaktiviere|disabilitare|απενεργοποίηση|запрещать/i;
var reAds = /pubs|pub|publicités|publicites|publicidade|anuncios||||/i;

// No Layer Facebook
setCookie('visited', true);
setCookie('popup_user_login', 'yes');
setCookie('arevico_lb', 1);

// No Layer Disclaimer
setCookie('disclaimer', 1);

/*=====================================================
  FUNCTIONS
======================================================*/

notifyUser = { // DOMContentLoaded
  box : function (msg, tcolor, bcolor, tout) {
    window.addEventListener('load', function () {
	  if(window.top != window.self){return;}
      var node = document.createElement('div');
      node.innerHTML = '<b>Anti-AdBlock Killer</b> | <a style="color: #fc0 !important;" href="http://userscripts.org/scripts/discuss/155840">Report</a> | <a style="color: #fc0 !important;" href="http://userscripts.org/scripts/show/155840">Home</a> | <br/>' + msg;
      node.setAttribute('id', 'aak-notice');
      node.setAttribute('style', 'color:' + tcolor + '; background-color: ' + bcolor + ' !important; background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAqcAAAKnAH00t8SAAADq0lEQVRYw73XW4iVVRQH8N8+jrfJ8VZZzxl0IS08X2lG2ZWiSIoiKHsJIkp6KF9KNCwySl8Kw8isl4ooeomUCkFFMkk4JyRLi0Dq1cmpvMx4GefrwXWa7WkuR/O04IPD/vb51lr//d//tVYqy1LLVk8XosACXIEL4s1f2INt+DYVulv9ZBo1gHqahvvwOK7BBKRhdpc4il34AJ+kwh9nF0A9dWARluISdDgzO4Ef8DI2pMLJ1gM4lfUaPIjxTW8H0IseHIusOzEVEzGmaX8v1mNZKvSOHkA9XYk3cVOW9UCc81dYh52pcPQ07GsmYA6exl2Ygkq8PomtWJwKvwwfQD11YhOuw9jI7jg24LlU2NcK9mXNLKzGLRgXnDkeQdyfCn2NvZXM+Xi8hXmReYnfgwOPqpb7WmZ2YTcW4rVAroxAbsXqsjZ4TIMI1NPDeC/OsYwzfkS13PTP5pTyLKdjBvanQs8IaCzE+5gcSPRiUSp8NojAqfv9fFwxAdeLufMhbAf24kBZ01PWhkXjc7yO/liaiBfKmq78CB7A5RnhvsTbZ3DlpmX/H8pWh0g1CHcVbs8DeCxIJ6Bfplr2j+J0C37Onv0jcKIPS3AklsbiCehQTxdjVrZ/o2q5p4Wst2ROPx6JBw1iljXbcWcszS1rpldwfSY2AyEardhKrIhnb5ByNFsfPgQp51RCcFKmWnVnZzNaRK0vk4D5FVyabTigWh7TJkuFP3EwW5pd4TTo2uY8syM5apXsahihzLYNlAoOZwud/4PTrux3dwU/ZgtToiC1xcqaycH+htUq+Do7hk5c28bsFzRd+W0VfJORr9JQqDbZU5n6HsLuimrZje+zTQvV08w2wF/gxmxpZyocbETzTlSrhPOw9lxyoawZh1Xx7Ua1XZsXo0/xa3Ah4WY8eQ4BeDWyT+HjO2weDKBaHsKzIcWN7mWperp3hI/Oj9mg8fw0TPYPRTIdmRCtbDSozT3h2uj/x0UgvXhDtVze3BG1AHsXlgfxJmXN6Sq8lAonhgpgKj7CbVl/0B8NyopU2NWi88uCV/Oy7xzH5lS4Z7S2fCbejSpZye7s4ahm67A9FacpqLLmfNwR13hutF4pc/4FnkmF31qdjNZEp9TZVCMGQjd64jzHhLx2hchUmka1vugJX2meJUYLYALujmb16gzKVq0/ZH5JKmz9L8PppGijFodMdzZl2Ty2HcR2fIiNQ41jZxbAv2fGObgBs3FRwNwdndQO7IrGoyX7G6Z/MPqACYE2AAAAAElFTkSuQmCC); background-repeat:no-repeat; background-position:5px center; display:block; width:100%; position:fixed; z-index: 9999; left: 0; top: 0;  text-align: left; vertical-align:middle; padding:5px 3px 5px 48px; margin:0;  font-size:12px !important; font-family:arial !important; border-bottom:4px solid #fc0;');
      document.body.appendChild(node);

      // Remove Advert Message
      setTimeout(function () {
        var obj = document.getElementById('aak-notice');
        obj.parentNode.removeChild(obj);
      }, tout);
    });
  },
  useFirefox : function () {
    this.box('<i>This protection can only be killed with Firefox + Greasemonkey !</i>', '#fff', '#000', 5000);
  },
  addAbFilter : function (filters) { // Arraay
    var filters = filters.join('<br/>');
    this.box('<u>Add filter(s) on your Ad Blocker</u> <br/><code> ' + filters + '</code> ', '#fff', '#000', 7000);
  }
};

// Test if a string is part of another one
String.prototype.contains = function (testString) {
  if (this.indexOf(testString) != -1) {
    return true;
  } else {
    return false;
  }
};

// Remove Element
function removeElement(o) {
  if (typeof o === "object") {
    return o.parentNode.removeChild(o);
  } else if (typeof o === "string") {
    var elem = document.querySelector(o);
    if (elem) {
      return elem.parentNode.removeChild(elem);
    }
  }

}

// Get Element
function getElement(selector) {
  var elem = document.querySelector(selector);
  if (elem) {
    return elem;
  } else {
    return false;
  }
}

function eventElement(e) {
  return e.target;
}

function scriptHTML(e) {
  return eventElement(e).innerHTML;
}

function scriptCancel(e) {
  e.preventDefault();
  e.stopPropagation();
  e.returnValue = false;
}

function addJS(s) {
  if (/\.js$/.test(s)) { // External
    document.head.appendChild(document.createElement('script')).src = s;
  } else { // inline
    document.head.appendChild(document.createElement('script')).innerHTML = s.toString().replace(/^function.*{|}$/g, '');
  }
}

function addElement(id) { // documentElement
  addJS('function() { document.documentElement.appendChild(document.createElement(\'div\')).id = "' + id + '";  }');
}

// Cancel Alert Box
var cancelAlert = function () {
  window.alert = function () {
    return true
  };
};

// Stop redirect
var cancelRedirect = function () {
  document.writeln = function (str) {
    throw new Error(str);
  };
};

var abIsDisabledJs = 'https://raw.github.com/reek/gm/master/aak.js';

var abIsDisabled = function () {
  var adblock = false;
  var adblocker = false;
  var adb = false;
  var isloaded = true;
  var awm = true;
  var gwloaded = true;
  jQuery.adblocker = false;
}

// Cookie (load)
function getCookie(sName) {
  var oRegex = new RegExp("(?:; )?" + sName + "=([^;]*);?");
  if (oRegex.test(document.cookie)) {
    return decodeURIComponent(RegExp["$1"]);
  } else {
    return null;
  }
}

// Cookie (save)
function setCookie(sName, sValue, sTime) {
  sTime = (sTime) ? sTime : 365 * 24 * 60 * 60 * 1000;
  var today = new Date(),
  expires = new Date();
  expires.setTime(today.getTime() + sTime); // 365*24*60*60*1000
  document.cookie = sName + "=" + encodeURIComponent(sValue) + ";expires=" + expires.toGMTString() + ";path=/";
}

var hjhj = function () {
  //if(location.pathname.indexOf('/television/') != -1) {
  window.onbeforeunload = function () {
    return ("stop");
  }
  //}
}

/*=====================================================
  RULES
======================================================*/

Rules = {
  // ----------------------------------------------------
  // All Browsers & Specific Hosts
  // ----------------------------------------------------
  Uptobox : {
    Host : ['uptobox.com'],
    Inject : function () {
      GM_addStyle(".middle-content + .middle-content div[id] { height: 12px !important; }");
    },
    BeforeFix : function () {},
    Before : function (e) {
      if (scriptHTML(e).contains('window.location = "/pages/adblock.html"')) {
        scriptCancel(e);
      }
    }
  },
  MultiUp : {
    Host : ['multiup.org', 'streamupload.org'],
    Inject : function () {
      GM_addStyle("#crazy { height: 3px !important; }");
    }
  },
  Picstwist : {
    Host : ['picstwist.com'],
    Inject : function () {
      GM_addStyle("#zd, #xd { height: 1px !important; visibility: visible !important;  display: block  !important; }");
      addElement('zd');
      addElement('xd');
    }
  },
  Interfans : { // http://www.interfans.org/forum/
    Host : ['interfans.org'],
    Inject : function () {
      GM_addStyle(".ad_global_header { height: 1px !important; display: none !important; }");
    }
  },
  Topzonelt : {
    Host : ['topzone.lt'],
    Inject : function () {
      GM_addStyle(".forumAd { height: 1px !important; display: none !important; }");
    }
  },
  Automobilesportivecom : {
    Host : ['automobile-sportive.com'],
    Inject : function () {
      GM_addStyle(".myTestAd { height: 51px !important; display: none !important; }");
    }
  },  
  Leetgamerz : {
    Host : ['leetgamerz.net'],
    // @@||leetgamerz.net/js/advertisement.js
    // document.write('<div id="pikachu">an adverstisment</div>');
    Inject : function () {
      addElement('pikachu');
    }
  },
  Osoarcadecom : {
    Host : ['osoarcade.com'],
    Inject : function () {
      addElement('tester');
    }
  },
  Freegamehostingnl : {
    Host : ['freegamehosting.nl'],
    Inject : function () {
      addElement('adtest');
    }
  },  
  Filecom : {
    Host : ['filecom.net', 'upshare.org', 'skippyfile.com'],
    // @@||filecom.net/advertisement.js
    // document.write('<div id="add"></div>');
    Inject : function () {
      addElement('add');
    }
  },
  Kissanime : {
    Host : ['kissanime.com'],
    BeforeFix : function () {
      addElement('kABTest');
      addElement('adsIfrme');
      addJS(cancelAlert);
      /*
      var c = document.getElementById("container");
      var v = document.getElementById("centerDivVideo");
      var vclone = v.parentNode.cloneNode(true);
      c.appendChild(vclone);
      removeElement(v);
       */
      // kissanime.com#@##adsIfrme
      // kissanime.com#@##kABTest
      notifyUser.addAbFilter(['kissanime.com#@##adsIfrme', 'kissanime.com#@##kABTest']);
    },
    Before : function (e) {
      if (scriptHTML(e).contains('Please disable AdBlock to watch anime on KissAnime')) {
        scriptCancel(e);
      }
    },
    Loaded : function () {
      /*
      var tz = document.createElement('div');
      tz.id = "kABTest";
      var tz2 = document.createElement('div');
      tz2.id = "adsIfrme";

      document.body.insertBefore(tz, document.body.firstChild);
      document.body.insertBefore(tz2, document.body.firstChild);
       */
    }
  },
  Drivearabia : {
    Host : ['drivearabia.com'],
    Inject : function () {
      addJS(cancelAlert);
    }
  },
  Bitcoiner : {
    Host : ['bitcoiner.net'],
    Loaded : function () {
      // Hide Notice
      removeElement('#adblock-info');
      var btSend = getElement('#submit');
      if (btSend) { // Skip timer
        btSend.setAttribute('disabled', false);
        btSend.setAttribute('value', 'Send!');
      }
    }
  },
  Gamespowerita : {
    Host : ['gamespowerita.com'],
    Loaded : function () {
      removeElement('#some_ad_block_key_popup');
      removeElement('#document_modal');
    }
  },
  cpgnet : {
    Host : ['cp-g.net'],
    Loaded : function () {
      removeElement('#adblock_layer');
    }
  },
  Mixdj : {
    Host : ['mix.dj'],
    Loaded : function () {
      removeElement('.classAds');
      removeElement('#maskads');
    }
  },  
  Rireetchansons : { // Just Remove Popup Newsletter
    Host : ['rireetchansons.fr'],
    Loaded : function () {
      removeElement('#popins');
      removeElement('#upsell');
    }
  },
  Rapidebrideur : {
    Host : ['rapidebrideur.com'],
    BeforeFix : function () {
      addJS(cancelRedirect);
    },
    Before : function (e) {
      if (scriptHTML(e).contains('window.location = "../pages/adblock.html";')) {
        scriptCancel(e);
      }
    },
    Loaded : function () {
      removeElement('#blockblockA');
      if (getElement('#blockblockB')) {
        getElement('#blockblockB').style.display = "block";
      }
    }
  },
  MegaDebridEu : {
    Host : ['mega-debrid.eu'],
    Loaded : function () {
      // Protection are in button submit
      var btDebrid = getElement('.realbutton');
      if (btDebrid) {
        btDebrid.setAttribute('onclick', '');
        btDebrid.setAttribute('type', 'submit');
      }
    }
  },
  Bokepspotcom : {
    Host : ['bokepspot.com'],
    Inject : function () {
      // Hide Disclaimer
      setCookie('hideDialog', 'hide');
    },
    Loaded : function () {
      // Remove Disable AdBlock
      removeElement('#tupiklan');
    }
  },
  picload : {
    Host : ['picload.org'],
    Inject : function () {
      // No AdBlocker
      setCookie('pl_adblocker', false);
    }
  },
  Nowvideo : {
    Host : ['nowvideo'],
    Loaded : function () {
      removeElement('#aad');
      removeElement('#aad2');
    }
  },
  VideobugNet : {
    Host : ['videobug.net'],
    Inserted : function (e) {
      if (eventElement(e).nextSibling.id == 'flowplayer_api' && eventElement(e).style && eventElement(e).innerHTML.contains('Please dont use A.dblock, its very expensive to maintain video hosting. Thank you')) {
        //console.log(eventElement(e));
        removeElement(eventElement(e));
      }
    }
  },
  Gamecopyworld : {
    Host : ['gamecopyworld.com', 'gamecopyworld.eu'],
    Loaded : function () {
      removeElement('#confirmOverlay');
    }
  },
  Senmanga : {
    Host : ['senmanga.com'],
    Loaded : function () {
      removeElement('p[class=no]');
    }
  },
  IlixIn : {
    Host : ['ilix.in','urlink.at','priva.us'],
    Loaded : function () {
      removeElement('.backk');
      removeElement('#blockMsg');
    }
  },
  Eventhubs : { // just hide
    Host : ['eventhubs.com'],
    Loaded : function () {
      removeElement('div[style*="border-color: blue; border-style: dotted; border-width: 10px;"]');
    }
  },
  Scanmangacom : {
    Host : ['scan-manga.com'],
    Loaded : function () {
      // Remove Advert Message
      removeElement('#pub_f0');
    }
  },
  Instantmangacom : {
    Host : ['instantmanga.com'],
    Loaded : function () {
      removeElement('#notice');
    }
  },  
  Skyrock : { // Direct to Player
    Host : ['skyrock.fm'],
    Loaded : function () {
      var anchors = document.querySelectorAll('a[onclick="return openPlayer();"]');

      for (i in anchors) {
        anchors[i].onclick = '';
        anchors[i].href = 'http://www.skyrock.fm/ourownplayer/player.php';
      }
    }
  },
  Xxxdownloadsfree : {
    Host : ['xxxdownloadsfree.blogspot.kr'],
    Loaded : function () {
      var el = document.querySelector('div[style*="position:fixed;width:100%;top:0px;height:100%;background-color:black;z-index:100;"]');
      // Remove Advert Message
      removeElement(el);
    }
  },
  Toussportstv : {
    Host : ['tous-sports.tv'],
    Loaded : function () {
      // Remove Advert Message
      removeElement('#blockblockA');
    }
  },
  Adfly : {
    Host : ['adf.ly', 'q.gs', 'j.gs', 'u.bb', '9.bb', 'go.phpnulledscripts.com'],
    Loaded : function () {
      var btContinue = getElement('button[id=abC]');
      var btSkip = getElement('#skip_button');

      var forcing = function () {
        if (btContinue) {
          btContinue.click();
        }
        if (btSkip && btSkip.href) {
          window.clearInterval(runSetInt)
          window.location.href = btSkip.href;
        }
      };

      var runSetInt = setInterval(forcing, 0);
      runSetInt;

    }
  },
  Go4up : {
    Host : ['go4up.com'],
    BeforeFix : function () {
      addJS(cancelRedirect);
    },
    Before : function (e) {
      if (scriptHTML(e).contains('window.location = "http://go4up.com/adblock.php')) {
        scriptCancel(e);
      }
    }
  },
  Preemlinks : {
    Host : ['preemlinks.com'],
    BeforeFix : function () {
      addJS(cancelRedirect);
    },
    Before : function (e) {
      if (scriptHTML(e).contains('window.location = "why.php"')) {
        scriptCancel(e);
      }
    }
  },
  Playtv : { // Still no solution
    Host : ['playtv.fr', 'sporttv.pt'],
    Inject : function () {
      // http://playtv.fr/adblock
      //addJS(hjhj);
      //addJS(cancelRedirect);
      /*
      ppl.vars.adb="sp"+"ons"+"ored"+"-features";

       */
    },
    Before : function (e) {
      if (scriptHTML(e).contains('ppl.vars.adb="sp"+"ons"+"ored"+"-features";')) {
        //scriptCancel(e);
      }
    }
  },
  // ----------------------------------------------------
  // Mozilla Firefox & Specific Hosts
  // ----------------------------------------------------
  Watcharabcom : {
    Host : ['watcharab.com'],
    Before : function (e) {
      if (scriptHTML(e).contains('|Adblock|You|are|software|')) {
        scriptCancel(e);
      }
    }
  },
  Elahmad : { 
    // document.getElementsByTagName("iframe").item(0)
    Host : ['elahmad.com'],
    Before : function (e) {
      if (scriptHTML(e).contains("alert('You use the software Adblock')")) {
        scriptCancel(e);
      }
    },
    Loaded : function () {
      var v = document.getElementById("adv_right");
	      v.setAttribute('id','');
      var vclone = v.cloneNode(true);
      document.body.appendChild(vclone);
      removeElement(v);
    }
  },  
  File4go : {
    Host : ['file4go.com'],
    // Add Rule to AdBlock for stop anti-adblock
    // /jquery.adblock-detector.js$script
    Before : function (e) {
      if (scriptHTML(e).contains('window.location.replace("http://www.file4go.com/adblock.php");')) {
        scriptCancel(e);
      }
    }
  },
  Freezedownload : {
    // if (!awm) { window.location = 'http://loxtk.com/help/removeAB.php'; }
    // var awm = false; must be true
    Host : ['freezedownload.com'],
    BeforeFix : function () {
      // Experimental solution
      addJS(abIsDisabled);
      addJS(abIsDisabledJs);
    },
    Before : function (e) {
      if (scriptHTML(e).contains("window.location = 'http://loxtk.com/help/removeAB.php'") || scriptHTML(e).contains("awm = false;")) {
        scriptCancel(e);
      }
    }
  },
  Receivesms : {
    // if (!isloaded) { window.location = 'http://www.cpalead.com/abp'; }
    // var isloaded = false; must be true
    Host : ['receive-sms.com'],
    BeforeFix : function () {
      // Experimental solution
      addJS(abIsDisabled);
      addJS(abIsDisabledJs);
    },
    Before : function (e) {
      if (scriptHTML(e).contains("window.location = 'http://www.cpalead.com/abp';")) {
        scriptCancel(e);
      }
    }
  },
  Prozik : {
    // http://www.pro-zik.ws/js/check.js
    // jQuery.adblocker = false; $.adblocker = false;
    Host : ['pro-zik.ws', 'pro-tect.ws', 'pro-ddl.ws', 'pro-sport.ws'],
    Inject : function () {
      setCookie('visitedf', true);
      setCookie('visitedh', true);
    },
    Before : function (e) {
      if (eventElement(e).src.contains('js/check.js')) {
        scriptCancel(e);
      }
    },
    BeforeFix : function () {
      // Experimental solution
      addJS(abIsDisabled);
      addJS(abIsDisabledJs);
    }
  },
  Afreesms : {
    Host : ['afreesms.com'],
    /* var adb = false;
    @@||afreesms.com/js/adblock.js */
    Inject : function () {
      // Hide Facebook Box
      setCookie('fbshow', false);
    },
    BeforeFix : function () {
      // Experimental solution
      addJS(abIsDisabled);
      addJS(abIsDisabledJs);
    },
    Before : function (e) {
      if (scriptHTML(e).contains('if(adb)xajax_adBlock();')) {
        scriptCancel(e);
      }
    }
  },
  Filesdldcom : {
    Host : ['filesdld.com'],
    // window.location = "http://adscendmedia.com/gateway_adblock.php
    // var gwloaded = false; must be true
    BeforeFix : function () {
      // Experimental solution
      addJS(abIsDisabled);
      addJS(abIsDisabledJs);
    },
    Before : function (e) {
      if (scriptHTML(e).contains("http://adscendmedia.com/gateway_adblock.php") || scriptHTML(e).contains("http://adworkmedia.com/help/removeAB.php")) {
        scriptCancel(e);
      }
    }
  },
  TreeSixNullhaven : {
    /* @@|http://www.360haven.com/adframe.js
    adblock=false; */
    Host : ['360haven.com'],
    Before : function (e) { // Have 2 Protections
      if (scriptHTML(e).contains("adblock|href|location|if|http|360haven|forums|com|html|www'.split('|'),0,{}))") || scriptHTML(e).contains("whitelist|adblocking|software|using|You|your|Hello|there|Ads|function|general|way|cover|15pt|Adblock|Detected|Software")) {
        scriptCancel(e);
      }
    },
    BeforeFix : function () {
      // Experimental solution
      addJS(abIsDisabled);
      addJS(abIsDisabledJs);
    }
  },
  Btcflow : {
    /* ||btcflow.net/js/adb.js */
    Host : ['btcflow.net', 'bitcointree.net'],
    Before : function (e) {
      if (eventElement(e).src.contains('js/adb.js')); {
        scriptCancel(e);
      }
    }
  },
  Sawlive : {
    Host : ['sawlive.tv'],
    Before : function (e) {
      // Find timer and proceed
      if (scriptHTML(e).contains('function closeMyAd(){')) {
        scriptCancel(e);

        document.getElementById("sawdiv").innerHTML = "";
        document.getElementById("sawdiv").style.display = "none";
        document.getElementById("splay").style.visibility = "visible";
        document.getElementById("sloading").innerHTML = "";
        unsafeWindow.active = 1;
        unsafeWindow.so.write("jwplayer1");
      }
    }
  },
  Dinozap : {
    Host : ['dinozap.tv'],
    Before : function (e) {
      if (scriptHTML(e).contains('window.location = "http://www.dinozap.tv/noadsblock.html"') || scriptHTML(e).contains('window.location = "http://cache.hdcastream.com/noadsblock.html"')) {
        scriptCancel(e);
      }
    }
  },
  Bigdownloader : {
    Host : ['bigdownloader.com'],
    Before : function (e) {
      if (scriptHTML(e).contains('adblockblock = function()')) {
        scriptCancel(e);
      }
    }
  },
  RisikoGesundheit : {
    Host : ['risiko-gesundheit.de'],
    Before : function (e) {
      if (scriptHTML(e).contains('Bitte deaktiviere Deinen Werbeblocker')) {
        scriptCancel(e);
      }
    }
  },
  // ----------------------------------------------------
  // All Hosts
  // ----------------------------------------------------
  RapidLeech : {
    Host : ['.*?'],
    Loaded : function () {
      if (getElement('#blockdiv') && getElement('#blockdiv').innerHTML.contains('disable ad blocking or use another browser without any adblocker when you visit')) {
        removeElement('#blockdiv');
      }
    }
  },
  RTKAntiAdblock : {
    Host : ['.*?'],
    Before : function (e) {
      // For testing
      //console.log(e);
      if (eventElement(e).src.contains('blockcake.js') || scriptHTML(e).contains('window.location.replace("adblockalert.html")')) {
        scriptCancel(e);
      }
    }
  },
  AntiAdBuster : { // anti-ad-blocker.blogspot.kr
    Host : ['.*?'],
    Before : function (e) {
      if (eventElement(e).src.contains('anti-ad-buster.js')) {
        scriptCancel(e);
      }
    }
  },
  AntiBlockOrg : {
    Host : ['.*?'],
    Loaded : function () {
      var divs = document.querySelectorAll('div[id]');
      for (i in divs) {
        currDiv = divs[i];
        if (currDiv.id && reId.test(currDiv.id) && /(Please enable \/ Bitte aktiviere JavaScript|Veuillez desactiver vos \/ Por favor desactiva el Javascript)/i.test(currDiv.innerHTML)) {
          // Remove Please enable javascript
          removeElement(currDiv);
        }
      }
    },
    Inserted : function (e) {
      // For testing
      //console.log(eventElement(e));

      // Antiblock.org
      if (eventElement(e).id &&
        reId.test(eventElement(e).id) &&
        eventElement(e).style) {

        // Version 3.xx
        if (eventElement(e).firstChild.firstChild.nodeName == 'IMG' && eventElement(e).firstChild.firstChild.src.contains('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA')) {
          removeElement(eventElement(e));
        }
        // Version 2.xx
        else if (reAdvertMsg.test(scriptHTML(e))) {
          removeElement(eventElement(e));
        }
        // Version 2.xx (Heuristic)
        else if (reAdBlock.test(scriptHTML(e)) && reDisable.test(scriptHTML(e)) || reAds.test(scriptHTML(e))) {
          removeElement(eventElement(e));
        }
      }
      // Better Stop Adblock (Fork of AntiBlock)
      else if (eventElement(e).nodeName == 'FONT' && /^[a-z0-9]{10}$/i.test(eventElement(e).id) && eventElement(e).innerHTML.contains('<div id="bsa-credits">')) {
        removeElement(eventElement(e));
      }
    }
  }

}

/*=====================================================
  RUN
======================================================*/

for (var i in Rules) {
  currRule = Rules[i];
  // RegExp Host
  var reHost = new RegExp(currRule.Host.join('|'), 'i');
  // If domains is
  if (reHost.test(document.domain)) {

    // Add Js / Css / Cookie
    if (currRule.Inject) {
      currRule.Inject();
    }

    // Cancel Js Script
    if (currRule.Before) {
      // Mozilla Firefox
      if ('onbeforescriptexecute' in window) {
        window.addEventListener('beforescriptexecute', currRule.Before);
      }
      // Others Browsers
      else if (currRule.BeforeFix) {
        currRule.BeforeFix();
      }
      // Alert just solution for Firefox
      else if (currRule.Host != '.*?') {
        notifyUser.useFirefox();
      }
    }

    // When Window Load
    if (currRule.Loaded) { // DOMContentLoaded
      window.addEventListener('DOMContentLoaded', currRule.Loaded);
    }
    // When DOM Elements are Insered in Document
    if (currRule.Inserted) {
      window.addEventListener('DOMNodeInserted', currRule.Inserted);
    }

  }
}