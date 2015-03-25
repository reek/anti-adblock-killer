// ==UserScript==
// @name Anti-Adblock Killer | Reek
// @description Anti-Adblock Killer removes many protections used on some website that force the user to disable the AdBlocker. So you can continue to visit this website without having to disable your AdBlocker. Compatible with the browsers Firefox and Chrome.
// @author Reek | http://reeksite.com/
// @version 6.0
// @license Creative Commons BY-NC-SA
// @encoding utf-8
// @icon https://raw.github.com/reek/anti-adblock-killer/master/icon120x120.png
// @resource icon https://raw.github.com/reek/anti-adblock-killer/master/icon48x48.png
// @namespace https://userscripts.org/scripts/show/155840
// @updateURL https://userscripts.org/scripts/source/155840.meta.js
// @downloadURL https://userscripts.org/scripts/source/155840.user.js
// @include http*://*
// @exclude http*://*google.*
// @exclude http*://*youtube.com/*
// @exclude http*://*facebook.com/*
// @exclude http*://*twitter.com/*
// @exclude http*://*reeksite.com/*
// @exclude http*://*chromeactions.com/*
// @grant GM_info
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_xmlhttpRequest
// @grant GM_registerMenuCommand
// @grant GM_addStyle
// @grant GM_getResourceURL
// @run-at document-start
// ==/UserScript==
/*=====================================================
  THANKS
=======================================================

Coding helpful:
  InfinityCoding, Couchy, Dindog, Floxflob, U Bless 
  
Donors:
  Mike Howard, shunjou
  
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

// For Antiblock.org
var abId = /^[a-z0-9]{4,10}$/i;
var abNodeName1 = /(div|span|b|i|font|strong|center)/i;
var abNodeName2 = /[abisuqp]{1}/i;
var abWords1 = /ad blocker|ad block|ad-block|adblocker|ad-blocker|adblock|bloqueur|bloqueador|Werbeblocker|adblockert|آدبلوك بلس/i;
var abWords2 = /disable|désactivez|désactiver|desactivez|desactiver|desative|desactivar|desactive|desactiva|deaktiviere|disabilitare|απενεργοποίηση|запрещать|állítsd le/i;
var abImg = /data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAA|data:image\/gif;base64,R0lGODlhMwLKAPcAAAAAAIAAAACAAICAAAAA|filmovizija.com\/kodee.png/


/*=====================================================
  GM MENU
======================================================*/

GM_registerMenuCommand("Anti-AdBlock Killer | Notify Box", function() { 
  aak.menuCommand();
});


/*=====================================================
  FUNCTIONS
======================================================*/

aak = {
  home: 'https://userscripts.org/scripts/show/155840',
  update: 'http://userscripts.org/scripts/source/155840.meta.js',
  download: 'http://userscripts.org/scripts/source/155840.user.js',
  changelog: 'http://userscripts.org/topics/129396',
  report: 'http://userscripts.org/guides/869',
  icon: GM_getResourceURL("icon"),
  filters: 'https://raw.github.com/reek/anti-adblock-killer/master/anti-adblock-killer-filters.txt',
  box : function (m, t) {
    if (window.top != window.self) {return;}
	// Style Box
	GM_addStyle('#aak-notify-box { color:#fff!important; background-color: #000 !important; background-image:url("'+ aak.icon +'"); background-repeat:no-repeat; background-position:5px center; display:block !important; width:100% !important; position:fixed !important; z-index: 9999 !important; left: 0; top: 0;  text-align: left; vertical-align:middle; padding:5px 5px 5px 58px !important; margin:0 !important;  font-size:12px !important; font-family:arial !important; border-bottom:4px solid #f00 !important; line-height:1.2 !important;}');
    GM_addStyle('#aak-notify-box a { color: #f00 !important; }');
	
	// Create Advert Message
    var node = document.createElement('div');
    node.innerHTML = '<b>Anti-AdBlock Killer</b> | <a href="'+ aak.home +'">Home</a> | <a href="'+ aak.report +'">Report</a> | <a href="'+ aak.changelog +'">Changelog</a> |<br/>' + m;
    node.setAttribute('id', 'aak-notify-box');
    document.documentElement.appendChild(node);

    // Remove Advert Message
    setTimeout(function () {
      var obj = document.getElementById('aak-notify-box');
      obj.parentNode.removeChild(obj);
    }, t);
  },
  useFirefox : function () {
    this.box('<i>This protection can only be killed with Firefox + Greasemonkey !</i>', 10000);
  },
  menuCommand : function () {
    this.box('<a href="'+ aak.download +'">Update</a> | Anti-Adblock Killer (force an update)<br/><a href="abp:subscribe?location='+ aak.filters +'&title=Anti-Adblock Killer | Filters for Adblockers">Subscribe</a> | Anti-Adblock Killer | Filters for Adblockers', 10000);
  }
};

function getChangelog() {
	GM_xmlhttpRequest({
		method : "GET",
		url : aak.changelog,
		headers : {
			"User-Agent" : navigator.userAgent,
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
  mrtzcmp3 : {
    Host : ['mrtzcmp3.net'],
    Inject : function () {
      GM_addStyle(".rtm_ad { height: 1px !important; }");
    }
  },  
  go4up : {
    Host : ['go4up.com'],
    Inject : function () {
      GM_addStyle(".myTestAd { height: 1px !important; }");
    }
  },  
  thepcspy : { // http://thepcspy.com/read/how_to_block_adblock/
    Host : ['thepcspy.com'],
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
  snswus : {
    Host : ['snsw.us'],
    Inject : function () {
      GM_addStyle("#ad_1 { height: 1px !important; }");
    }
  },
  interfans : { // http://www.interfans.org/forum/
    Host : ['interfans.org'],
    Inject : function () {
      GM_addStyle(".ad_global_header { height: 1px !important; display: none !important; }");
    }
  },
  maxdebrideur : {
    Host : ['maxdebrideur.com'],
    Inject : function () {
      GM_addStyle(".clear + div[id] { height: 12px !important; }");
    }
  },
  topzone : {
    Host : ['topzone.lt'],
    Inject : function () {
      GM_addStyle(".forumAd { height: 1px !important; display: none !important; }");
    }
  },
  tweaktown : {
    Host : ['tweaktown.com'],
    Inject : function () {
      GM_addStyle("#div-gpt-ad-1378071706813-0, #div-gpt-ad-1378150878492-1 { height: 3px !important; display: none !important; }");
    }
  },
  debrideurstream : {
    Host : ['debrideurstream.fr'],
    Inject : function () {
      GM_addStyle("#content div[id][align=center] { height: 12px !important; }");
    }
  },  
  preemlinks : {
  	Host : ['preemlinks.com'],
    Inject : function () {
      GM_addStyle("#divads { height: 1px !important; }");
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
    Host : ['picstwist.com','pornblogy.com','imgboo.me','urlgalleries.net','camelstyle.net'],
    Inject : function () {
      GM_addStyle("#zd, #xd { height: 1px !important; visibility: visible !important;  display: block  !important; }");
      addElement('zd');
      addElement('xd');
    }
  },
  wdgd : { // packed function eval
    Host : ['onlyteensx.net'],
    Inject : function () {
      GM_addStyle("#wd, #gd { height: 1px !important; visibility: visible !important;  display: block  !important; }");
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
  eventhubs : {
    Host : ['eventhubs.com'],
    Inject : function () {
	  unsafeWindow.clearInterval(tid);  
    },	
	Loaded : function () { 
	  unsafeWindow.clearInterval(tid);  
	},
    Inserted : function (e) {
    /*     
	 if (eventElement(e).id && eventElement(e).id.contains("blahyblaci1")) {
        removeElement(eventElement(e));
      }
	*/
    }
  },
  kooora : {
    Host : ['kooora.com'],
    Inject : function () {
	  //unsafeWindow.g207 = false;
	  //unsafeWindow.Fun1 = false;
	  //unsafeWindow.g = true;
	  unsafeWindow.alert = false;
    },	
	Loaded : function () { 
	  //unsafeWindow.g207 = false;
	  //unsafeWindow.Fun1 = false;
	  //unsafeWindow.g = true;
	  unsafeWindow.alert = false;
	}
  },  
  kissanime : {
  	Host : ['kissanime.com'],
  	Loaded : function () {
	
  		if (/id=[\d]+$/.test(location.href)) {
	      setTimeout(function () {
		    // All Players [flashvars*="googlevideo.com"][id]
  			var players = document.querySelectorAll('embed');
			//console.log(players);
			
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
			
	      }, 3000);
  		}
  	},
  	BeforeFix : function () {},
  	Before : function (e) {
  		var code = scriptHTML(e);
  		if (/id=[\d]+$/.test(location.href) &&
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
    Host : ['antennesport.com', 'serverhd.eu'],
    Loaded : function () { // for antennesport
      // Remove Pub
      removeElement("#pub .pubclose");
      // Redirect to Player
      document.querySelector("#pub .embed iframe").src = "/embed/embed.php";
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
  videofun : {
    Host : ['videofun.me'],
    Inserted : function (e) {
      if (eventElement(e).id && eventElement(e).id == 'flowplayer_api') {
        var allowfullscreen = eventElement(e).querySelector('param[name="allowfullscreen"]');
        allowfullscreen.value = true;
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
  filmovizija : {
    Host : ['filmovizija.com'],
    Loaded : function () {
      removeElement('#jebi-se-adblock');
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
   blockblockA : {// Solution was also added to AAK-Filters
    // http://sport-show.fr/js/advertisement-AdBlock.js
	// http://www.2site.me/advertisement-AdBlock.js
    Host : ['sport-show.fr','vipflash.net','2site.me'],
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
  		unsafeWindow.onbeforeunload = false;
		unsafeWindow.onunload = false;

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
  playtv : {
    Host : ['playtv.fr'],
    Loaded : function () {
	
      unsafeWindow.ppl.redirect = false;
      unsafeWindow.ppl.vars.adb = null;
	  
	  var nac = document.querySelector(".notice-adb-container");
	  var player = document.querySelector(".notice-adb + div[id] #player");
      nac.appendChild(player);
    }
  },
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
   dizimag : { 
     Host : ['dizi-mag.com'],
     Loaded : function () {
	   /*
       html = document.body.innerHTML;
       dynVar = html.match(/([a-z]+[0-9]+x)/)[1];
	   console.log(dynVar);
       unsafeWindow[dynVar] = 1;
	   */
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
   zeb89altervista : {
    Host : ['zeb89.altervista.org'],
    // greasemonkey/addons4.js
    BeforeFix : function () {
      // No need for Chrome, Opera, Safari
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
        //console.log(elem);
		
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
  				abImg.test(elem.firstChild.firstChild.src)) {
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
        aak.useFirefox();
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
		url : aak.update,
        headers : {
			"User-Agent" : navigator.userAgent,
			"Accept" : "text/html"
		},
		onload : function (response) {
			// No display in iframes
			if (window.top != window.self) {return;}
			// Request finished and response is ready
			if (response.status == 200 && response.readyState == 4) {
				var res = response.responseText;
				var remoteVersion = res.match(/@version\s+(\d+\.\d+)/)[1];
				if (Number(localVersion) < Number(remoteVersion)) {
					aak.box('The version ' + remoteVersion + ' is now available | <a  href="' + aak.download + '">Install</a><br/><b style="color:pink;">Required:</b> Anti-Adblock Killer | Filters for Adblockers - <a title="Subscribe only if you have not yet done." href="abp:subscribe?location='+ aak.filters +'&title=Anti-Adblock Killer | Filters for Adblockers">Subscribe</a>', 20000);
				}
				// Store timestamp last checking 
				GM_setValue('nextCheck', (currCheck + (1 * 60 * 60 * 1000)).toString() );
			}
		}
	});
}


