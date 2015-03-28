// ==UserScript==
// @name Anti-Adblock Killer | Reek
// @namespace https://userscripts.org/scripts/show/155840
// @description Anti-Adblock Killer removes many protections used on some website that force the user to disable the AdBlocker. So you can continue to visit this website without having to disable your Adblocker. Compatible with the browsers Firefox and Chrome.
// @author Reek | http://reeksite.com/
// @version 7.0
// @license Creative Commons BY-NC-SA
// @encoding utf-8
// @icon https://raw.github.com/reek/anti-adblock-killer/master/anti-adblock-killer-icon.png
// @include http*://*
// @exclude http*://*google.*
// @exclude http*://*yahoo.*/*
// @exclude http*://*youtube.com/*
// @exclude http*://*facebook.com/*
// @exclude http*://*twitter.com/*
// @exclude http*://*reeksite.com/*
// @exclude http*://*chromeactions.com/*
// @exclude http*://*preloaders.net/*
// @exclude http*://*imgur.com/*
// @exclude http*://*jsbin.com/*
// @exclude http*://*jsfiddle.net/*
// @exclude http*://*reddit.com/*
// @exclude http*://*baidu.com/*
// @exclude http*://*wikipedia.org/*
// @exclude http*://*linkedin.com/*
// @exclude http*://*live.com/*
// @exclude http*://*amazon.com/*
// @exclude http*://*bing.com/*
// @exclude http*://*ebay.com/*
// @exclude http*://*pinterest.com/*
// @exclude http*://*ask.com/*
// @exclude http*://*msn.com/*
// @exclude http*://*instagram.com/*
// @exclude http*://*tumblr.com/*
// @exclude http*://*microsoft.com/*
// @exclude http*://*paypal.com/*
// @exclude http*://*imdb.com/*
// @exclude http*://*apple.com/*
// @exclude http*://*stackoverflow.com/*
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
  InfinityCoding, Couchy, Dindog, Floxflob, U Bless, Watilin, @prdonahue, Hoshie, 3lf3nLi3d
  
Donors:
  Mike Howard, Shunjou, Charmine, Kierek93, George Barnard, Henry Young, Seinhor9, ImGlodar, Ivanosevitch
  
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



/*=====================================================
  GM MENU
======================================================*/

GM_registerMenuCommand("Anti-AdBlock Killer | Update", function() { 
  Aak.requiresupdate();
});


/*=====================================================
  FUNCTIONS
======================================================*/

Aak = {
  home: 'http://userscripts.org/scripts/show/155840',
  changelog: 'http://userscripts.org/topics/129396',
  report: 'http://userscripts.org/guides/869',
  update: 'http://userscripts.org/scripts/source/155840.meta.js',
  download: 'http://userscripts.org/scripts/source/155840.user.js',
  filters: 'http://bc.vc/jGFxOb',
  icon: 'https://raw.github.com/reek/anti-adblock-killer/master/anti-adblock-killer-icon.png',
  box : function (message, delay) {
  
    // Not displayed in iframes
    if (window.top != window.self) {return;}
	
	// Style
	GM_addStyle('#aak-notify-box { color:#000 !important; background-color: #eee !important; display:block !important; width:100% !important; position:fixed !important; z-index: 99999 !important; left: 0; top: 0;  text-align: left; vertical-align:middle; margin:0 !important; font-size:14px !important; font-family:arial !important; border-bottom:2px solid #000 !important; line-height:1.2 !important; font-variant:small-caps;}');
    
	GM_addStyle('#aak-notify-head { padding:0px 10px 0px 112px !important; background-color: #000 !important; }');
	GM_addStyle('#aak-notify-head a { padding:5px !important; color: #fff !important; display:inline-block; text-decoration: none; }');
	GM_addStyle('#aak-notify-head a:hover { color: #000 !important; background-color: #eee !important; }');
	GM_addStyle('#aak-notify-close { padding:5px !important; color: #fff !important; background-color: #c00 !important; display:inline-block; text-decoration: none; }');
	
	GM_addStyle('#aak-notify-body { padding:10px 0px 10px 112px !important;  background-image:url("'+ Aak.icon +'"); background-repeat:no-repeat; background-position:20px 10px; background-size:72px; height:72px;}');
    GM_addStyle('#aak-notify-body a { color: #c00 !important; text-decoration: none; }');
    GM_addStyle('#aak-notify-body a:hover { text-decoration: underline; }');
	
	// Box
    var boxNode = document.createElement('div');
	boxNode.setAttribute('id', 'aak-notify-box');
    boxNode.innerHTML = '<div id="aak-notify-head"><a title="Visit Homepage." href="'+ Aak.home +'">Homepage</a> | <a title="Report new site, fix site or bug." href="'+ Aak.report +'">Report</a> | <a title="See changes" id="aak-notify-changelog" href="'+ Aak.changelog +'">Changelog</a> | <a title="Make a donation to support the project." href="'+ Aak.home +'">Donate</a> | <a title="Submit a new feature." href="http://userscripts.org/scripts/discuss/155840">Suggest Features</a> | <a title="Close" href="javascript:void(0);" id="aak-notify-close">Close</a></div><div id="aak-notify-body"><div style="font-size: 20px;">Anti-AdBlock Killer v'+GM_info.script.version+'</div>' + message +'</div>';
    document.documentElement.appendChild(boxNode);
	
	// close manually
	boxNode.onclick = function () {Aak.closebox();}
	
    // close automatically
    setTimeout(function () { Aak.closebox(); }, delay);
  },
  closebox : function () {
    var obj = document.querySelector('#aak-notify-box');
    obj.parentNode.removeChild(obj);
  },
  requiresfirefox : function () {
    Aak.box('This protection can not be neutralized by using the browser Mozilla Firefox.', 5000);
  },
  requiresfilters : function () {
    Aak.box('It seems that you have not subscribed to the list <b>Anti-Adblock Killer - Filters for Adblockers</b>, this list is necessary for the proper functioning of Anti-Adblock Killer. <a href="'+ Aak.filters +'" target="_blank">Subscribe</a>', 60000);
  },  
  requiresupdate : function () {
    Aak.box('<a href="'+ Aak.download +'" target="_blank">Update</a> | Anti-Adblock Killer - Userscript<br/><a href="'+ Aak.filters +'" target="_blank">Subscribe</a> | Anti-Adblock Killer - Filters for Adblockers', 60000);
  }, 
  detectfilters : function () {
    window.addEventListener('load', function () {
      var elem = document.createElement("div");
      elem.id = "k2Uw7isHrMm5JXP1Vwdxc567ZKc1aZ4I";
      elem.innerHTML = "<br/>";
      document.documentElement.appendChild(elem);

      setTimeout(function () {
        if (elem.clientHeight) {
          Aak.requiresfilters();
        }
      }, 5000);
    });
  },
  detectupdate : function () {
    var localVersion = GM_info.script.version;
    var currCheck = new Date().getTime();

    // Determines whether a value is an illegal number
    if (isNaN(GM_getValue('nextCheck'))) {
      GM_setValue('nextCheck', 0);
    }

    // Check
    if (Number(GM_getValue('nextCheck')) < currCheck) {
      GM_xmlhttpRequest({
        method : "GET",
        url : Aak.update,
        headers : {
          "User-Agent" : navigator.userAgent,
          "Accept" : "text/html"
        },
        onload : function (response) {
          // No display in iframes
          if (window.top != window.self) {
            return;
          }
          // Request finished and response is ready
          if (response.status == 200 && response.readyState == 4) {
            var res = response.responseText;
            var remoteVersion = res.match(/@version\s+(\d+\.\d+)/)[1];
            if (Number(localVersion) < Number(remoteVersion)) {
              Aak.box('<a title="Install latest version" href="' + Aak.download + '" target="_blank">Update</a> The version ' + remoteVersion + ' is now available. <b style="color:#CC0000;">New version</b><br/><a title="Additional rules for adblockers to increase compatibility between browsers." href="' + Aak.filters + '" target="_blank">Update</a> Filters for Adblockers. <b style="color:#CC0000;">New version</b>', 60000);
            }
            // Store timestamp for next check
            GM_setValue('nextCheck', (currCheck + (24 * 60 * 60 * 1000)).toString());
          }
        }
      });
    }
  },
  getchangelog : function () {
    GM_xmlhttpRequest({
      method : "GET",
      url : Aak.changelog,
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
};



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
    for (var i = 0; i < elem.length; i++) {
	  console.info("AntiAdblockKiller: Remove ", elem[i]);
      elem[i].parentNode.removeChild(elem[i]);
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
  addJS('function() { document.documentElement.appendChild(document.createElement("div")).id = "' + id + '"; }');
} 

function addIframe(id) {
  addJS('function() { document.documentElement.appendChild(document.createElement("iframe")).id = "' + id + '"; }');
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

// Get Style
function getStyle(el, styleProp) {
	if (el.currentStyle)
		return el.currentStyle[styleProp];
	else if (window.getComputedStyle)
		return document.defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
}

function AakPlayer(file, width, height) {

  if (/^streamer/.test(file)) {
    var flashvars = file;
  } else {
    var flashvars = "file=" + file;
  }
  // Create player  // 480x270
  var player = document.createElement("object");
  player.setAttribute("data", "http://player.longtailvideo.com/player5.9.swf");
  player.setAttribute("height", height);
  player.setAttribute("width", width);
  player.setAttribute("type", "application/x-shockwave-flash");
  player.setAttribute("id", 'Aak-jwPlayer');
  player.setAttribute('allowscriptaccess', 'always');
  player.setAttribute("allowfullscreen", 'true'); ;
  player.setAttribute("bgcolor", "#000000");
  player.setAttribute("wmode", "opaque");
  player.setAttribute("seamlesstabbing", "true");
  player.setAttribute("flashvars", flashvars);
  return player;
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
		GM_addStyle("div.ad-leader > div[id] { height: 12px !important; }");
  	},
	Loaded : function () {
	  // https://developer.mozilla.org/fr/docs/DOM/element.clientHeight
	  /*
	  console.log(document.getElementById("rhcqzrc20ogq").clientHeight);
	  console.log(document.getElementById("rhcqzrc20ogq").style.height);
	  console.log(document.getElementById("rhcqzrc20ogq").style.position);
      */
	},
  	BeforeFix : function () {},
  	Before : function (e) {
  		if (scriptHTML(e).contains('window.location = "/pages/adblock.html"')) {
  			scriptCancel(e);
  		}
  	}
  },
  elahmad : {
    Host : ['elahmad.com'],
    Inject : function () {
      GM_addStyle("#adblock { height: 1px !important; }");
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
	  GM_addStyle(".blocked { display: none !important; }");
    },
    Loaded : function () {
	  removeElement('.blocked');
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
  hentaito : {
  	Host : ['hentai.to'],
    Inject : function () {
      GM_addStyle("#hentaito123 { height: 11px !important; }");
    }
  }, 
  prototurk : {
  	Host : ['prototurk.com'],
    Inject : function () {
      GM_addStyle("#reklam { height: 1px !important; }");
    }
  },   
  freedomip : {
  	Host : ['freedom-ip.com'],
    Inject : function () {
      GM_addStyle(".pub_vertical ins, .pub_vertical div { height: 11px !important; }");
    }
  },
  wakanim : {
    Host : ['wakanim.tv'],
    Inject : function () {
      GM_addStyle("#detector { display: none !important; }");
	  GM_addStyle("#nopub { display: block !important; }");
    }
  }, 
  divIdZdXd : { // packed function eval
    Host : ['picstwist.com','pornblogy.com','imgboo.me','urlgalleries.net','camelstyle.net','filmovizija.com','imgleech.com'],
    Inject : function () {
      GM_addStyle("#zd, #xd { height: 1px !important; visibility: visible !important;  display: block  !important; }");
      addElement('zd');
      addElement('xd');
    }
  },
  divIdWdGd : { // packed function eval
    Host : ['onlyteensx.net'],
    Inject : function () {
      GM_addStyle("#wd, #gd { height: 1px !important; visibility: visible !important;  display: block  !important; }");
      addElement('wd');
      addElement('gd');
    }
  },
  divIdTester : {
    Host : ['osoarcade.com','d3brid4y0u.info','fileice.net','filmovizija.com','nosteam.ro','openrunner.com','chine-informations.com','easybillets.com','spox.fr','yovoyages.com','tv3.co.nz','freeallmusic.info','putlocker.com','sockshare.com','dramapassion.com'],
    Inject : function () {
      addElement('tester');
    }
  },
  divIdAdd : {
    Host : ['filecom.net','upshare.org','skippyfile.com','mwfiles.net','up-flow.org'],
    // @@||filecom.net/advertisement.js
    // document.write('<div id="add"></div>');
    Inject : function () {
      addElement('add');
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
  primeshare : {
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
  jkanime : {
    Host : ['jkanime.net'],
    // @@||jkanime.net/assets/js/advertisement2.js
    Inject : function () {
      addElement('reco');
    }
  },
  _720pmkv : {
    Host : ['720pmkv.com'],
    Inject : function () {
      addElement('advert');
    }
  }, 
  eventhubs : {
    Host : ['eventhubs.com'],
    Inject : function () {
	  addElement('blahyblaci1');
	  unsafeWindow.clearInterval(tid);  
    },	
	Loaded : function () {
	  unsafeWindow.clearInterval(tid);  
	}
  }, 
  kissanime : {
  	Host : ['kissanime.com'],
  	Loaded : function () {
	
  		if (/id=[\d]+$/.test(location.href)) {
	      setTimeout(function () {
		  
		    // All Players [flashvars*="googlevideo.com"][id]
  			var players = document.querySelectorAll('embed');
			console.log(players);
			
  			// Clear document
  			if (players.length > 0) {
  				document.head.innerHTML = "";
  				document.body.innerHTML = "";

  				// Insert Players
  				for (var v = 0; v < players.length; v++) {
				    //player[v].src = "http://www.youtube.com/get_player?enablejsapi=1&modestbranding=1&autohide=1";
					
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
    Host : ['drivearabia.com','putlocker.com','doatoolsita.altervista.org','sockshare.com','free-movie-home.com','pc.online143.com','pregen.net','kooora.com','str3amtv.co.nr','str3amtv.altervista.org','str3am.altervista.org'],
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
  seekingalpha : {
    Host : ['seekingalpha.com'],
    Loaded : function () {
      unsafeWindow.SA.Pages.Article.is_gnikcolbda = function () {
        return false;
      }
    }
  },
  anisearch : { // solution on filter list
    Host : ['anisearch.com'],
    Loaded : function () {
	  //unsafeWindow.is_loaded = true;
	  //removeElement('.box-error');
    }
  },
  userscripts : {
    Host : ['userscripts.org'],
    Loaded : function () {
      if (/155840$/.test(location.pathname)) {
        if (getElement('#install_script')) {
          document.querySelector('#install_script').innerHTML = '<a class="userjs" href="http://bc.vc/NRzHOf" title="Anti-Adblock Killer | Userscript">Install</a><a class="userjs" href="http://bc.vc/jGFxOb" title="Anti-Adblock Killer | Filters for Adblockers">Subscribe</a>';
        }
      }
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
	  var dfrm = getElement('form[name="dfrm"]');
      if(dfrm) {
	    removeElement('.error');
	    dfrm.submit();
	  }
    }
  },  
  ilive : {
    Host : ['ilive.to'],
    Loaded : function () { // just remove ad
      //removeElement('#ad_overlay');
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
      var realbutton = getElement('.realbutton');
      if (realbutton) {
        realbutton.setAttribute('onclick', '');
        realbutton.setAttribute('type', 'submit');
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
    Inserted : function (insertedNode) {
      if (insertedNode.nextSibling.id == 'flowplayer_api' && insertedNode.style && insertedNode.innerHTML.contains('Please dont use A.dblock, its very expensive to maintain video hosting. Thank you')) {
        //console.log(insertedNode);
        removeElement(insertedNode);
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
  rapid8 : {
    Host : ['rapid8.com'],
    Loaded : function () {
        removeElement('div.backk + #blcokMzg');
        removeElement('div.backk');
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
  tekdomains : {
    Host : ['tek.no', 'hardware.no', 'akam.no', 'teknojobb.no', 'amobil.no', 'gamer.no', 'teknofil.no'],
    Loaded : function () {

      unsafeWindow.Tek = false;
      localStorage.clear();
      sessionStorage.clear();

    }
  },
  livesoccerhq : {
    Host : ['livesoccerhq.com', 'lvshd.altervista.org'],
    Loaded : function () {
      if ("http://livesoccerhq.com/" == location.href) {
        location.href = 'http://livesoccerhq.com/programacao.php';
      } else {
        var matches = location.href.match(/link=([\w]+)/i);
        if (matches[1]) {
          console.log(atob(matches[1]));
          location.href = atob(matches[1]);
        }
      }
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
  // ----------------------------------------------------
  // Video Players Anti Adblockers
  // ----------------------------------------------------
  abola : {
    Host : ['miragens.abola.pt'],
    Loaded : function () {
      //http://www.miragens.abola.pt/videosdetalhe.aspx?id=19695
      //http://www.miragens.abola.pt/vabolaoffice/uploads/19/69/5/19695.flv

      // video
	  if (location.pathname !== '/videosdetalhe.aspx') { return false; }
      var videoid = location.href.match(/videosdetalhe.aspx[\?]id=([\d]+)/)[1];
      var videodir = videoid.match(/.{1,2}/g).join('/');
      var videofile = 'http://www.miragens.abola.pt/vabolaoffice/uploads/' + videodir + '/' + videoid + '.flv';
      var oldPlayer = document.querySelector("#flvplayerIE");
      var newPlayer = AakPlayer(videofile, '500', '281');
      var divPlayer = oldPlayer.parentNode;

      // replace player
      divPlayer.replaceChild(newPlayer, oldPlayer);

    }
  },
  voxnow : {
    Host : ['voxnow.de', 'rtl-now.rtl.de', 'rtl2now.rtl2.de', 'n-tvnow.de', 'superrtlnow.de', 'rtlnitronow.de'],
    Loaded : function () {

      var player = document.querySelector("#videoplayer");
      var parent = player.parentNode;
      var clone = player.cloneNode(true);

      // change flashvars
      var flashvars = clone.querySelector('param[name="flashvars"]');
      flashvars.value = flashvars.value.replace('abcheck_enabled=1', 'abcheck_enabled=0');

      // replace player
      parent.replaceChild(clone, player);

    }
  },
  playtv : {
    Host : ['playtv.fr'],
    Inject : function () {},
    Loaded : function () {
      
	  /*
      unsafeWindow.setInterval(function () {
        removeElement('#adb');
      }, 0);
      */
	  
	  // request user confirmation
      //window.onbeforeunload = function () { return ''; };

	  /*
      var ptvContainer = document.querySelector(".notice-adb-container");
      var ptvPlayer = document.querySelector("#player");
      ptvContainer.appendChild(ptvPlayer);
      */
	  
      if ("playtv.fr" == location.host) {
        location.href = 'http://m.playtv.fr/';
      }
	  
    }
  },
  myspass : {
    Host : ['myspass.de'],
    Loaded : function () {

      var videoid = location.pathname.match(/\/(\d+)\/$/)[1];
	  
      if (!videoid) return false;
      
      GM_xmlhttpRequest({
        method : "GET",
        url : 'http://www.myspass.de/myspass/includes/apps/video/getvideometadataxml.php?id=' + videoid,
        headers : {
          'User-agent' : navigator.userAgent,
          'Content-Type' : 'application/xml',
        },
        onload : function (result) {
          var res = result.responseText;
          //console.log(res);

          // parser xml
          parser = new DOMParser();
          xmlDoc = parser.parseFromString(res, "application/xml");

          // video
          var videofile = xmlDoc.getElementsByTagName("url_flv").item(0).textContent;
          var oldPlayer = document.querySelector('embed#player');
          var newPlayer = AakPlayer(videofile, '640', '360');
          var divPlayer = document.querySelector('div#player');

          // replace
          divPlayer.innerHTML = '';
          divPlayer.appendChild(newPlayer);
          //divVideo.replaceChild(newPlayer, oldVideo);

        }
      });

    }
  },  
  ilive : {
    Host : ['ilive.to'],
    Loaded : function () {
      if (/^\/embedplayer.php/i.test(location.pathname)) {
	  
	  var close = setInterval(function () {
	    document.querySelector("#ad_overlay_close").click();
	  }, 1000);
	  
 	  setTimeout(function () {
	    clearInterval(close);
	  }, 5000);      

      }
    }
  },  
  sharecast : {
    Host : ['sharecast.to'],
    Loaded : function () {
      if (/^\/embed.php/i.test(location.pathname)) {

        unsafeWindow.popundrInit = false;
        unsafeWindow.popundrBlur = false;
        unsafeWindow.popundrOpenCloseWindow = false;

        var oldPlayer = document.querySelector("object#container");
        var flashvars = oldPlayer.querySelector('param[name="flashvars"]').value;
        var flashvars = flashvars.replace("&stretching=uniform&controlbar.position=over", "");
        var newPlayer = AakPlayer(flashvars, '600', '400');
        var divPlayer = oldPlayer.parentNode;
        
		// remove head
        document.querySelector('head').innerHTML = '';

        // replace player
        divPlayer.replaceChild(newPlayer, oldPlayer);
      }
    }
  },
  kingofplayers : {
    Host : ['kingofplayers.com66'],
    Loaded : function () {
      if (/^\/stream[\d]+.html/i.test(location.pathname)) {

        var oldPlayer = document.querySelector("object#playerflash");
        var flashvars = oldPlayer.querySelector('param[name="flashvars"]').value;
        var flashvars = flashvars.replace("&stretching=uniform&controlbar.position=over", "");
        var newPlayer = AakPlayer(flashvars, '600', '400');
        var divPlayer = oldPlayer.parentNode;
        
		// remove head
        document.querySelector('head').innerHTML = '';

        // replace player
        divPlayer.replaceChild(newPlayer, oldPlayer);
      }
    }
  },
  flowplayer : {
    Host : ['videofun.me','play44.net'],
    Loaded : function () {
	
      if (/^\/embed/i.test(location.pathname)) {
        setTimeout(function () {

          var player = document.querySelector("#flowplayer_api");
		  console.log(location.pathname);
          var parent = player.parentNode;
          var clone = player.cloneNode(true);
          clone.querySelector('param[name="allowfullscreen"]').value = true;

          // replace player
          parent.replaceChild(clone, player);

        }, 1000);
      }
    },
    Inserted : function (insertedNode) { // Allow video fullscreen
	  
	  console.log('insertedNode', insertedNode);
	  
	  /* 
      if (insertedNode.id && /flowplayer_api/.test(insertedNode.id)) {
        var allowfullscreen = insertedNode.querySelector('param[name="allowfullscreen"]');
        allowfullscreen.value = true;
      }
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
  sporttvdireto : {
  	Host : ['sporttvdireto.com', 'tvdesporto.com'],
    Inject : function () { 
	   // this solution dont works
	   // document.getElementById('ads1').clientHeight < 20
	   addElement('ads1');
	   GM_addStyle("#ads1 { height: 30px !important; }");
    },
    Before : function (e) {
      if (scriptHTML(e).contains('location.href = \'http://tvdesporto.com/chorar.php\';')) {
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
  str3amtv : { // remove ads
    Host : ['str3amtv'],
    Loaded : function () {
      removeElement('div[id^="floatLayer"]');
    }
  },
  prozik : {
    Host : ['pro-zik.ws', 'pro-tect.ws', 'pro-ddl.ws', 'pro-sport.ws'],
    Inject : function () {
      setCookie('visitedf', true);
      setCookie('visitedh', true);
    }
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
    Loaded : function (e) {
	  setTimeout(function () { window.stop(); }, 5000);
    }
  },
  // ----------------------------------------------------
  // All Hosts
  // ----------------------------------------------------
  generic : {
    Host : ['.*?'],
    Inject : function () {
      // Adunblock - http://adunblock.com/
      setCookie("adblock", 0);
      unsafeWindow.adblock_antib = false;
      unsafeWindow.adblock = !1;
    },	
    Loaded : function () {
      // Adunblock - http://adunblock.com/
      setCookie("adblock", 0);
      unsafeWindow.adblock_antib = false;
      unsafeWindow.adblock = !1;

      // Better Stop Adblock
	  //unsafeWindow.audio_file = false;

      // Unknow Anti AdBlock system
      if (getElement('#blockdiv') && getElement('#blockdiv').innerHTML.contains('disable ad blocking or use another browser without any adblocker when you visit')) {
        removeElement('#blockdiv');
      }

      // Antiblock - http://antiblock.org/
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
            //console.log(id);
            localStorage.antiblockid = id.substring(1);
          }
        }
      }
    },
  	Inserted : function (insertedNode) {

  	  // All Nodes
  	  //console.log(insertedNode);
	  

  	  // Adunblock - http://adunblock.com/
	  var reId = /^[a-z]{8}$/;
	  var reClass = /^[a-z]{8} [a-z]{8}$/;
	  var reStyle = /top: -?[\d]+px; opacity: [\d]; visibility: visible;/;
	  var reBg = /^[a-z]{8}-bg$/;
	  var reMessage = /Il semblerait que vous utilisiez un bloqueur de publicité !/;
	  
  	  // Full Screen Message (Premium)
  	  if (insertedNode.id &&
	    insertedNode.className &&
  	    insertedNode.style &&
		reId.test(insertedNode.id) &&
  	    reClass.test(insertedNode.className) &&
  	    reStyle.test(insertedNode.style.cssText) &&
  	    reMessage.test(insertedNode.innerHTML) &&
  	    insertedNode.nextSibling.nodeName == 'DIV' &&
  	    insertedNode.nextSibling.className &&
  	    reBg.test(insertedNode.nextSibling.className)) {

  	    // Remove Message
  	    console.info("AntiAdblockKiller: Remove AdUnBlock.com (Premium)");
  	    removeElement(insertedNode.nextSibling);
  	    removeElement(insertedNode);
  	  }
  	  // Top bar Message (Free)
  	  else if (insertedNode.id &&
  	    reId.test(insertedNode.id) &&
  	    reMessage.test(insertedNode.innerHTML)) {
		
  	    // Remove Message
  	    console.info("AntiAdblockKiller: Remove AdUnBlock.com (Free)");
  	    removeElement(insertedNode);
  	  }

	  
  	  // Antiblock - http://antiblock.org/
  	  var reId = /^[a-z0-9]{4,10}$/i;
  	  var reName1 = /(div|span|b|i|font|strong|center)/i;
  	  var reName2 = /[abisuqp]{1}/i;
  	  var reWords1 = /ad blocker|ad block|ad-block|adblocker|ad-blocker|adblock|bloqueur|bloqueador|Werbeblocker|adblockert|آدبلوك بلس/i;
  	  var reWords2 = /disable|désactivez|désactiver|desactivez|desactiver|desative|desactivar|desactive|desactiva|deaktiviere|disabilitare|απενεργοποίηση|запрещать|állítsd le/i;
  	  var reImg = /data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAA|data:image\/gif;base64,R0lGODlhMwLKAPcAAAAAAIAAAACAAICAAAAA|filmovizija.com\/kodee.png|dbzog.de\/Bilder\/dbzogb1.png/;

  	    // Communs
  	    if (insertedNode.id &&
  	      insertedNode.style &&
  	      insertedNode.firstChild &&
  	      reId.test(insertedNode.id) &&
  	      reName1.test(insertedNode.nodeName) &&
  	      reName2.test(insertedNode.firstChild.nodeName)) {
  	      //console.log(insertedNode);

		  
         // Better Stop Adblock
         if (/Better Stop Adblock/.test(insertedNode.innerHTML) &&
           insertedNode.id.length == 10) {

           var nodes = document.body.childNodes;
           for (var i = 0; i < nodes.length; i++) {
             if (nodes[i].nodeName == 'DIV') {
               nodes[i].style.display = "block";
               //console.log(nodes[i].nodeName);
             }
           }
		   // Remove
           removeElement(insertedNode);
           console.info("AntiAdblockKiller: Remove Better Stop Adblock");
         }

  	      // Antiblock.org v2
  	      else if (reWords1.test(insertedNode.innerHTML) &&
  	        reWords2.test(insertedNode.innerHTML)) {
			
  	        // Remove
  	        console.info("AntiAdblockKiller: Remove Antiblock.org v2");
  	        removeElement(insertedNode);
  	        //console.log(insertedNode);
  	      }
  	      // Antiblock.org v3
  	      else if (insertedNode.firstChild.firstChild &&
  	        insertedNode.firstChild.firstChild.nodeName == "IMG" &&
  	        reImg.test(insertedNode.firstChild.firstChild.src)) {
			
  	        // Remove
  	        console.info("AntiAdblockKiller: Remove Antiblock.org v3");
  	        removeElement(insertedNode);
  	        //console.log(insertedNode);
  	      }
  	      // Alternative solution to disable all versions
  	      else if (localStorage.antiblockid != false &&
  	        insertedNode.id == localStorage.antiblockid) {
			
  	        // Remove
  	        console.info("AntiAdblockKiller: Remove Antiblock.org v2 & v3");
  	        removeElement(insertedNode);
  	        //console.log(insertedNode);
  	      }
  	      //  Many false positive
  	      else {
  	        //removeElement(insertedNode);
  	      }

  	    }

  	}
  }
}


/*=====================================================
  DETECT
======================================================*/

// Detect Filters
//Aak.detectfilters();

// Detect Update
Aak.detectupdate();

// Detect & Kill
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
        Aak.requiresfirefox();
      }
    }
    // When Window Load
    if (currRule.Loaded) { // DOMContentLoaded
      window.addEventListener('DOMContentLoaded', currRule.Loaded);
    }
    // When DOM Elements are Insered in Document
    if (currRule.Inserted) {

	  // Mutation Events [Deprecated]
      //window.addEventListener('DOMNodeInserted', currRule.Inserted);
	  
	  // Mutation Observer
      var MutationObserver = window.MutationObserver || WebKitMutationObserver;

      // Create an observer instance
      var obs = new MutationObserver(function (mutations) {  
        // We can safely use `forEach` because we already use mutation  
        // observers that are more recent than `forEach`. (source: MDN)  
        mutations.forEach(function (mut) {  
          // we want only added nodes  
          if (!mut.addedNodes) {return;}  
          Array.prototype.forEach.call(mut.addedNodes, function (addedNode) {  

	        //console.log(addedNode);
			currRule.Inserted(addedNode);
		  
          });  
        });  
      });  
	  
	  // Observer 
      obs.observe(document.documentElement, {childList : true, subtree : true});  

    }
  }
}