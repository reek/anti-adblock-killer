// ==UserScript==
// @name Anti-Adblock Killer | Reek
// @description Anti-Adblock Killer removes many protections used on some website that force the user to disable the AdBlocker. So you can continue to visit this website without having to disable your AdBlocker. Compatible with the browsers Firefox and Chrome.
// @author Reek | http://reeksite.com/
// @version 5.0
// @license Creative Commons BY-NC-SA
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
// @exclude http*://*chromeactions.com/*
// @grant GM_info
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_xmlhttpRequest
// @grant GM_registerMenuCommand
// @grant GM_addStyle
// @run-at document-start
// ==/UserScript==
/*=====================================================
  THANKS
=======================================================

Coding helpful:
  InfinityCoding, Couchy, Dindog, Floxflob, U Bless 
  
Donors:
  Mike Howard
  
Users:
  Thank you to all those who use Anti Adblock Killer, who report problems, who write the review, which add to their favorites, making donations, which support the project and help in its development or promote.

=======================================================
  CHANGELOG
=======================================================  

  http://userscripts.org/topics/129396
  for more informations consult olders script versions.
  
=======================================================
  VARS
======================================================*/

// Script URLs
var downloadURL = "http://userscripts.org/scripts/source/155840.meta.js";
var updateURL = "http://userscripts.org/scripts/source/155840.meta.js";

// Ad Blocker is Disabled
var abIsDisabledJs = "https://raw.github.com/reek/anti-adblock-killer/master/abIsDisabled.js";
var abIsDisabled = function () {
var isloaded = true; /* receive-sms.com */
var awm = true; /* freezedownload.com,  thebesttrainers.net */
var pub = true; /* notre-planete.info */
var gwloaded = true; /* filesdld.com */
var adNotBlocked = true; /* mgcash.com */
var adblock = false; /* must use */
var adblocker = false;
var adb = false; /* afreesms.com */
var isBlockAds = false; /* kissanime.com */
var IsAdBlockEnabled = false; /* coursdeprofs.fr */
var ascfrgbujnkop = false; /* m6replay */
var do_check = false; /* voyageforum.com */
jQuery.adblocker = false; /* pro-zik.ws */
}

// For Antiblock.org
var abId = /^[a-z0-9]{4,10}$/i;
var abNodeName1 = /(div|span|b|i|font|strong|center)/i;
var abNodeName2 = /[abisuqp]{1}/i;
var abWords1 = /ad blocker|ad block|ad-block|adblocker|ad-blocker|adblock|bloqueur|bloqueador|Werbeblocker|adblockert|آدبلوك بلس/i;
var abWords2 = /disable|désactivez|désactiver|desactivez|desactiver|desative|desactivar|desactive|desactiva|deaktiviere|disabilitare|απενεργοποίηση|запрещать|állítsd le/i;


// Disable Overlay Facebook
setCookie('visited', true);
setCookie('popup_user_login', 'yes');
setCookie('arevico_lb', 1);
setCookie('fbshow', true);

// Disable Overlay Disclaimer
setCookie('disclaimer', 1);


/*=====================================================
  GM MENU
======================================================*/

GM_registerMenuCommand("Anti-AdBlock Killer | Notify User Box", function() { 
  notifyUser.menuCommand();
});


/*=====================================================
  CSS
======================================================*/

GM_addStyle('#aak-notify-user { color:#fff!important; background-color: #000 !important; background-image:url("http://i.imgur.com/enQ4HT4.png"); background-repeat:no-repeat; background-position:5px center; display:block !important; width:100% !important; position:fixed !important; z-index: 9999 !important; left: 0; top: 0;  text-align: left; vertical-align:middle; padding:5px 3px 5px 48px !important; margin:0 !important;  font-size:12px !important; font-family:arial !important; border-bottom:4px solid #fc0 !important; line-height:1.2 !important;}');
GM_addStyle('#aak-notify-user a { color: #fc0 !important; }');


/*=====================================================
  FUNCTIONS
======================================================*/

notifyUser = {
  box : function (msg, tout) {
    if (window.top != window.self) {return;}
	// Create Advert Message
    var node = document.createElement('div');
    node.innerHTML = '<b>Anti-AdBlock Killer</b> | <a href="http://userscripts.org/scripts/show/155840">Home</a> | <a href="http://userscripts.org/guides/869">Report</a> | <a href="http://userscripts.org/topics/129396">Changelog</a> |<br/>' + msg;
    node.setAttribute('id', 'aak-notify-user');
    document.documentElement.appendChild(node);

    // Remove Advert Message
    setTimeout(function () {
      var obj = document.getElementById('aak-notify-user');
      obj.parentNode.removeChild(obj);
    }, tout);
  },
  useFirefox : function () {
    this.box('<i>This protection can only be killed with Firefox + Greasemonkey !</i>', 5000);
  },
  menuCommand : function () {
    this.box('<a href="http://userscripts.org/scripts/source/155840.user.js">Update</a> | Anti-Adblock Killer (force an update)<br/><a href="abp:subscribe?location=https://raw.github.com/reek/anti-adblock-killer/master/anti-adblock-killer-filters.txt&title=Anti-Adblock Killer | Filters for Adblockers">Subscribe</a> | Anti-Adblock Killer | Filters for Adblockers', 5000);
  }
};

function getChangelog() {
	GM_xmlhttpRequest({
		method : "GET",
		url : "http://userscripts.org/topics/129396",
		headers : {
			"User-Agent" : "Mozilla/5.0",
			"Accept" : "text/html"
		},
		onload : function (response) {
			var res = response.responseText;
			var parser = new DOMParser();
			var dom = parser.parseFromString(res, "text/html");
			var elem = dom.querySelector("#post-body-505690");
			alert(elem.textContent);
		}
	});
}

// Test if contains text
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
		var elem = document.querySelectorAll(o);
		if (elem.length) {
			for (var i in elem) {
				return elem[i].parentNode.removeChild(elem[i]);
			}
		} else {
			return false;
		}
	} else {
		return false;
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

function addElement(id) {
  addJS('function() { document.documentElement.appendChild(document.createElement(\'div\')).id = "' + id + '";  }');
}

// Stop redirect
var cancelRedirect = function () {
  document.writeln = function (str) {
    throw new Error(str);
  };
};

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

// Get Style
function getStyle(el, styleProp) {
	if (el.currentStyle)
		return el.currentStyle[styleProp];
	else if (window.getComputedStyle)
		return document.defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
}


/*=====================================================
  RULES
======================================================*/

Rules = {
  // ----------------------------------------------------
  // All Browsers & Specific Hosts
  // ----------------------------------------------------
  uptobox : {
  	Host : ['uptobox.com'],
  	Inject : function () {
	    // Solution 1
  		var id = location.pathname.match(/[0-9a-z]{12}/);
  		if (id) { GM_addStyle("#" + id[0] + " { height: 12px !important; }"); }
		// Solution 2
  		GM_addStyle(".middle-content + .middle-content div[id] { height: 12px !important; }");
  	},
  	BeforeFix : function () {},
  	Before : function (e) {
  		if (scriptHTML(e).contains('window.location = "/pages/adblock.html"')) {
  			scriptCancel(e);
  		}
  	}
  },
  multiup : {
    Host : ['multiup.org', 'streamupload.org'],
    Inject : function () {
      GM_addStyle("#crazy { height: 3px !important; }");
    }
  },
  myTestAd : { // http://thepcspy.com/read/how_to_block_adblock/
    Host : ['go4up.com','thepcspy.com'],
    Inject : function () {
      GM_addStyle(".myTestAd { height: 1px !important; }");
    }
  }, 
  automobilesportive : {
    Host : ['automobile-sportive.com'],
    Inject : function () {
      GM_addStyle(".myTestAd { height: 51px !important; display: none !important; }");
    }
  },
  interfans : { // http://www.interfans.org/forum/
    Host : ['interfans.org'],
    Inject : function () {
      GM_addStyle(".ad_global_header { height: 1px !important; display: none !important; }");
    }
  },
  topzone : {
    Host : ['topzone.lt'],
    Inject : function () {
      GM_addStyle(".forumAd { height: 1px !important; display: none !important; }");
    }
  },
  debrideurstream : {
    Host : ['debrideurstream.fr'],
    Inject : function () {
      GM_addStyle("#content div[id][align=center] { height: 12px !important; }");
    }
  },  
  wakanim : {
    Host : ['wakanim.tv'],
    Inject : function () {
      GM_addStyle("#detector { display: none !important; }");
	  GM_addStyle("#nopub { display: block !important; }");
    }
  }, 
  zdxd : { // packed function eval
    Host : ['picstwist.com','pornblogy.com','imgboo.me'],
    Inject : function () {
      GM_addStyle("#zd, #xd { height: 1px !important; visibility: visible !important;  display: block  !important; }");
      addElement('zd');
      addElement('xd');
    }
  },
  IDtester : {
    Host : ['osoarcade.com','d3brid4y0u.info','fileice.net','filmovizija.com','nosteam.ro','openrunner.com','chine-informations.com','easybillets.com','spox.fr','yovoyages.com','tv3.co.nz','freeallmusic.info','putlocker.com','sockshare.com'],
    Inject : function () {
      addElement('tester');
    }
  },
  freegamehosting : {
    Host : ['freegamehosting.nl'],
    Inject : function () {
      addElement('adtest');
    }
  },
  theweatherspace : {
    Host : ['theweatherspace.com'],
    Inject : function () {
      addElement('ab-bl-advertisement');
    }
  },
  leaguesecretary : {
    // @@||teknogods.com/advert.js
    // <div id="adpbtest">;
    Host : ['leaguesecretary.com','teknogods.com'],
    Inject : function () {
      addElement('adpbtest');
    }
  },
  divIDadblock : {
    Host : ['primeshare.tv'],
    Inject : function () {
      addElement('adblock');
    }
  },
  freesportsbet : {
    Host : ['freesportsbet.com'],
    Inject : function () {
      addElement('ad-tester');
    }
  },
  divIDadd : {
    Host : ['filecom.net','upshare.org','skippyfile.com','mwfiles.net','up-flow.org'],
    // @@||filecom.net/advertisement.js
    // document.write('<div id="add"></div>');
    Inject : function () {
      addElement('add');
    }
  },  
  jkanime : {
    Host : ['jkanime.net'],
    // @@||jkanime.net/assets/js/advertisement2.js
    Inject : function () {
      addElement('reco');
    }
  },
  leetgamerz : {
    Host : ['leetgamerz.net'],
    // @@||leetgamerz.net/js/advertisement.js
    // document.write('<div id="pikachu">an adverstisment</div>');
    Inject : function () {
      addElement('pikachu');
    }
  }, 
  kissanime : {
  	Host : ['kissanime.com'],
  	Loaded : function () {
  		if (/kissanime.com\/Anime\/.+\/(OVA|Episode)-.+/i.test(location.href)) {

  			// All Players [flashvars*="googlevideo.com"][id]
  			var players = document.querySelectorAll('embed');

  			// Clear document
  			if (players.length > 0) {
  				document.head.innerHTML = "";
  				document.body.innerHTML = "";

  				// Insert Players
  				for (var v = 0; v < players.length; v++) {
  					players[v].style.display = "block";
  					document.documentElement.appendChild(players[v]);
  				}
  			}

  		}
  	},
  	BeforeFix : function () {},
  	Before : function (e) {
  		var code = scriptHTML(e);
  		if (/kissanime.com\/Anime\/.+\/(OVA|Episode)-.+/i.test(location.href) &&
  			/(adblock|ad block|adblocker|adblockers|ad blocker|ad blockers)/i.test(code) &&
  			/setTimeout\(/i.test(code) &&
  			/\.getScript\(/i.test(code) &&
  			/\.load\(function/i.test(code) &&
  			/\.hide\(\)/i.test(code) &&
  			/\.html\(/i.test(code) &&
  			/\.length/i.test(code)) {
  			scriptCancel(e);
  		}
  	}
  },
  antennesport : { 
    Host : ['antennesport.com','serverhd.eu'],
    Loaded : function () { // for antennesport
      window.open('embed.php','embed');
      return false; 
	  // http://www.antennesport.com/embed/embed.php
    },
    Before : function (e) { // for serverhd
      if (scriptHTML(e).contains('http://xaxa.juanantoniogonza.netdna-cdn.com/noadsblock.html')) {
        scriptCancel(e);
      }
	}  
  },
  disableAlert : {
    Host : ['drivearabia.com','putlocker.com','doatoolsita.altervista.org','sockshare.com'],
    Inject : function () {
	  unsafeWindow.alert = false;
    }
  }, 
  vgunetwork : {
    Host : ['vgunetwork.com'],
    Loaded : function () {
	  setCookie('stopIt', 1);
	  var close = getElement('#some_ad_block_key_close');
	  if(close) close.click();
    }
  },  
  aidemu : { 
    Host : ['aidemu.fr'],
    Inject : function () {
      setCookie('adblockPopup', true);
    }
  },
  ziddu : {
    Host : ['ziddu.com'],
    Loaded : function () {
	  // Redirect to captcha page
	  var formDl = getElement('form[name="dfrm"]');
      if(formDl) {
	    removeElement('.error');
	    formDl.submit();
	  }
    }
  },  
   bitcoiner : {
    Host : ['bitcoiner.net'],
    Loaded : function () {
      // Remove notice
      removeElement('#adblock-info');
	  // Skip timer
      var btSend = getElement('#submit');
      if (btSend) { 
        btSend.setAttribute('disabled', false);
        btSend.setAttribute('value', 'Send!');
      }
    }
  },
  bigdownloader : {
    Host : ['bigdownloader.com'],
    Loaded : function () {
      removeElement('#anti_adblock');
    }
  }, 
   gametrailers : {
    Host : ['gametrailers.com'],
    Loaded : function () {
      removeElement('#ad_blocking');
    }
  }, 
  debrastagi : {
    Host : ['debrastagi.com'],
    Loaded : function () {
      removeElement('#stp-main');
	  removeElement('#stp-bg');
    }
  },    
  rapidebrideur : {  
    Host : ['rapidebrideur.com'],
    Inject : function () {
	  GM_addStyle("html body div.container-fluid div.row-fluid div.span9 div div[id] { height: 12px !important;  display: block  !important; }");
    },
    BeforeFix : function () { },	
    Before : function (e) {
      if (scriptHTML(e).contains('window.location = "../pages/adblock.html";')) {
        scriptCancel(e);
      }
    }
  },
   blockblockA : {  
     // http://sport-show.fr/js/advertisement-AdBlock.js
    Host : ['sport-show.fr','vipflash.net'],
    Inject : function () {
	  GM_addStyle("#blockblockA {visibility:invisible!important;display:none!important;}#blockblockA td {visibility:invisible!important;display:none!important;}#blockblockA td p {visibility:invisible!important;display:none!important;}#blockblockB {visibility:visible!important;display:block!important;}");
    }
  },
  megadebrid : {
    Host : ['mega-debrid.eu'],
    Inject : function () {
      unsafeWindow.alert = false;
    },
    Loaded : function () {
      // Activate button debrid
      var btDebrid = getElement('.realbutton');
      if (btDebrid) {
        btDebrid.setAttribute('onclick', '');
        btDebrid.setAttribute('type', 'submit');
      }
    }
  },
  bokepspot : {
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
  videobug : {
    Host : ['videobug.net'],
    Inserted : function (e) {
      if (eventElement(e).nextSibling.id == 'flowplayer_api' && eventElement(e).style && eventElement(e).innerHTML.contains('Please dont use A.dblock, its very expensive to maintain video hosting. Thank you')) {
        //console.log(eventElement(e));
        removeElement(eventElement(e));
      }
    }
  },
  freezedownload : {
  	Host : ['freezedownload.com'],
  	Loaded : function () {
  		if (/freezedownload.com\/download\//.test(location.href)) {
  			removeElement('body > div[id]');
  		}
  	}
  },
  adfly : {
  	Host : ['adf.ly', 'q.gs', 'j.gs', 'u.bb', '9.bb', 'go.phpnulledscripts.com'],
  	Loaded : function () {

  		// Disable onbeforeunload
  		window.onbeforeunload = false;

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
  preemlinks : { // dead
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
  tvdez : { 
    // (document.getElementById('pubfooter').clientHeight < 20)
  	Host : ['tvdez.com','casadossegredos.tv','estadiofutebol.com','televisaofutebol.com'],
    Inject : function () {
      GM_addStyle("#pubfooter, #pub2 { height: 30px !important; display: block !important; }");
	  setCookie("adblock", null, 0);
    },	
  	BeforeFix : function () {
      /* solved with filter list */
  	},
  	Before : function (e) {
  		if (scriptHTML(e).contains("location.href = 'adblock.php';")) {
  			scriptCancel(e);
  		}
  	}
  },  
  /*
  playtv : { // Still no solution
    Host : ['playtv.fr'],
    Loaded : function () { },
    BeforeFix : function () { },
    Before : function (e) {
      if (scriptHTML(e).contains('')) {
        scriptCancel(e);
      }
    }
  },
   */
  gamespowerita : {
  	Host : ['gamespowerita.com'],
  	BeforeFix : function () {
      /* solved with filter list */
  	},
    Before : function (e) {
      if (scriptHTML(e).contains('(document.getElementById("test" + id_2).style.height < 1)') || scriptHTML(e).contains('if(typeof(window.google_jobrunner)=="undefined" || document.getElementById("test" + id_2).style.height < 1)') || scriptHTML(e).contains('if(typeof(window.google_jobrunner)=="undefined")')) {
        scriptCancel(e);
      }
    }
  },  
  // ----------------------------------------------------
  // Mozilla Firefox & Specific Hosts
  // ----------------------------------------------------
  watcharab : {
    Host : ['watcharab.com'],
    Before : function (e) {
      if (scriptHTML(e).contains('|Adblock|You|are|software|')) {
        scriptCancel(e);
      }
    }
  },
  privateinsta : {
    Host : ['privateinsta.com'],
    Loaded : function () {
	  // AdScendMedia
      unsafeWindow.unscroll = false;
      removeElement("#gw_overlay");
    }
  },
  elahmad : {
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
  prozik : {
    Host : ['pro-zik.ws', 'pro-tect.ws', 'pro-ddl.ws', 'pro-sport.ws'],
    Inject : function () {
      setCookie('visitedf', true);
      setCookie('visitedh', true);
    },
  },
  filesdld : { // dead
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
   zeb89altervista : {
    Host : ['zeb89.altervista.org'],
    // greasemonkey/addons4.js
    BeforeFix : function () {
      // Google
    },
    Before : function (e) {
      if (scriptHTML(e).contains('typeof GM_addonsStartup !== "undefined"')) {
	    scriptCancel(e);
      }
    }
  }, 
  sawlive : { // to check
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
  dinozap : { // to check
    Host : ['dinozap.tv'],
    Before : function (e) {
      if (scriptHTML(e).contains('window.location = "http://www.dinozap.tv/noadsblock.html"') || scriptHTML(e).contains('window.location = "http://cache.hdcastream.com/noadsblock.html"')) {
        scriptCancel(e);
      }
    }
  },
  risikogesundheit : {
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
  rapidleech : {
    Host : ['.*?'],
    Loaded : function () {
      if (getElement('#blockdiv') && getElement('#blockdiv').innerHTML.contains('disable ad blocking or use another browser without any adblocker when you visit')) {
        removeElement('#blockdiv');
      }
    }
  },
  AntiBlockOrg : {
  	Host : ['.*?'],
  	Loaded : function () {

  		localStorage.antiblockid = false;
  		var allStyles = document.querySelectorAll('style');
  		for (var i in allStyles) {
  			var currStyle = allStyles[i];
  			//console.log(currStyle);
  			if (typeof currStyle == "object") {
  				var contStyle = currStyle.innerHTML.replace(/[\n\r\t\s]+/g, "");

  				var patt = new RegExp("#[0-9a-z]{4,10}\{.*position:fixed!important;.+document.documentElement.scrollTop[\?]document.documentElement.scrollTop:document.body.scrollTop.+\}#", "i");
  				var out = contStyle.match(patt);
  				//console.log(out);
  				if (out) {
  					var id = out[0].match(/#[0-9a-z]{4,10}/i)[0];
  					console.log(id);
  					localStorage.antiblockid = id.substring(1);
  				}
  			}
  		}
  	},
  	Inserted : function (e) {

  		var elem = eventElement(e);

  		// Communs
  		if (elem.id &&
  			elem.style &&	
  			elem.firstChild &&			
  			abId.test(elem.id) &&
			abNodeName1.test(elem.nodeName) &&					
			abNodeName2.test(elem.firstChild.nodeName)) {
  			//console.log(elem);

  			// Kill v2.xx
  			if (abWords1.test(scriptHTML(e)) &&
  				abWords2.test(scriptHTML(e))) {
  				removeElement(elem);
				//console.log(elem);
  			}
  			// Kill v3.xx
  			else if (elem.firstChild.firstChild && 
			    elem.firstChild.firstChild.nodeName == "IMG" &&
  				elem.firstChild.firstChild.src.contains("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA")) {
  				removeElement(elem);
				//console.log(elem);
  			}
  			// Kill v2 and v3
  			else if (localStorage.antiblockid != false &&
  				elem.id == localStorage.antiblockid) {
  				removeElement(elem);
				//console.log(elem);
  			}
			//  Many false positive
			else {
			   //removeElement(elem);
			}
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


/*======================================================
  AUTO CHECK UPDATE
======================================================*/

var localVersion = GM_info.script.version;
var currCheck = new Date().getTime();

// Determines whether a value is an illegal number
if (isNaN(GM_getValue('nextCheck'))) {
	GM_setValue('nextCheck', 0);
}

// Checking
if (Number(GM_getValue('nextCheck')) < currCheck) {
	GM_xmlhttpRequest({
		method : "GET",
		url : updateURL,
		onload : function (response) {
			// No display in iframes
			if (window.top != window.self) {return;}
			// Request finished and response is ready
			if (response.status == 200 && response.readyState == 4) {
				var res = response.responseText;
				var remoteVersion = res.match(/@version\s+(\d+\.\d+)/)[1];
				if (Number(localVersion) < Number(remoteVersion)) {
					notifyUser.box('The version ' + remoteVersion + ' is now available | <a  href="' + downloadURL + '">Install</a><br/><b style="color:pink;">Required:</b> Anti-Adblock Killer | Filters for Adblockers - <a title="Subscribe only if you have not yet done." href="abp:subscribe?location=https://raw.github.com/reek/anti-adblock-killer/master/anti-adblock-killer-filters.txt&title=Anti-Adblock Killer | Filters for Adblockers">Subscribe</a>', 20000);
				}
				// Store timestamp last checking 
				GM_setValue('nextCheck', (currCheck + (1 * 60 * 60 * 1000)).toString() );
			}
		}
	});
}

