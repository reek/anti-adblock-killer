XenForo.rellect = XenForo.rellect || {};
!function (b, h, n, p) {
  XenForo.rellect.AdBlockDetector = {
    start : function () {
      $AdBlockDetector = this;
      if (XenForo.rellect.AdBlockDetectorParams !== p && h.self == h.top) {
        if (b('link[href*="admuncher.com"]').length)
          return $AdBlockDetector.triggerError();
        var a = $AdBlockDetector.scriptLoad,
        f = $AdBlockDetector.scriptError;
        $AdBlockDetector.isBlocked() ? XenForo.rellect.AdBlockDetectorParams.loadScript("//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", a, f) : a()
      }
    },
    scriptError : function (a, b) {
      $AdBlockDetector.triggerError()
    },
    scriptLoad : function () {
      var a = b('<ins class="adsbygoogle" />').css({
          position : "absolute",
          color : "transparent",
          fontSize : "1px",
          width : "1px",
          height : "1px",
          overflow : "hidden",
          display : "block"
        });
      XenForo.isRTL() ? a.css("right", "-999px") : a.css("left", "-999px");
      a.appendTo("body");
      var f = !1,
      c = function () {
        a.is(":hidden") && (console.log("AdBlock detector activated by css test."), $AdBlockDetector.triggerError(), clearInterval(insRepeat), a.remove(), f = !0)
      };
      setTimeout(function () {
        c();
        if (!f)
          var b = 0, d = setInterval(function () {
              c();
              b++;
              4 == b && (clearInterval(d), a.remove())
            }, 3E3)
      }, 300)
    },
    isBlocked : function () {
      return h.adsbygoogle && "object" == typeof adsbygoogle ? !1 : !0
    },
    triggerEvent : function (a) {
      b(n).triggerHandler(a);
      b("." + a).show()
    },
    triggerError : function () {
      "none" != XenForo.rellect.AdBlockDetectorParams.type && $AdBlockDetector.showAlert(XenForo.rellect.AdBlockDetectorParams.type);
      $AdBlockDetector.triggerEvent("AdBlockOn")
    },
    setCookie : function () {
      var a = new Date;
      a.setTime(a.getTime() + 1E3 * XenForo.rellect.AdBlockDetectorParams.expiry);
      b.setCookie("adblock_alert",
        XenForo.rellect.AdBlockDetectorParams.hours, a)
    },
    dismissed : function () {
      -1 != XenForo.rellect.AdBlockDetectorParams.hours && $AdBlockDetector.setCookie()
    },
    getAlertTypes : function () {
      return ["overlay", "float", "notice", "notification"]
    },
    showAlert : function (a) {
      var f = String(XenForo.rellect.AdBlockDetectorParams.phrases.title || "Missing phrase"),
      c = String(XenForo.rellect.AdBlockDetectorParams.phrases.message || "Missing phrase"),
      l = String(XenForo.rellect.AdBlockDetectorParams.phrases.close || "Missing phrase");
      switch (a) {
      case "overlay":
        a =
          XenForo.alert(c, f);
        c = c.replace(/[^a-z0-9_]/gi, "_") + parseInt(!1);
        XenForo.rellect.AdBlockDetectorParams.canDismiss || a.find(".close").remove();
        b(XenForo._OverlayCache[c]).bind("onBeforeClose", function () {
          if (!XenForo.rellect.AdBlockDetectorParams.canDismiss)
            return !1;
          $AdBlockDetector.dismissed()
        });
        break;
      case "float":
        var d = b('<div class="adblock_detector adblock_floating_message" style="display:none"><div class="errorDetails"><div class="alertIcon"></div><a class="close" title="' + l + '">&times;</a><div class="errorMessage">' +
            c + "</div></div></div>"),
        e = d.appendTo("body"),
        k = e.height(),
        c = e.find(".close"),
        m = b("html");
        XenForo.isTouchBrowser() && d.css("position", "absolute");
        XenForo.rellect.AdBlockDetectorParams.canDismiss ? (e.xfActivate(), c.click(function () {
            e.slideUp(XenForo.speed.fast);
            m.animate({
              paddingTop : 0
            }, XenForo.speed.fast);
            $AdBlockDetector.dismissed()
          })) : c.remove();
        m.animate({
          paddingTop : k
        }, {
          duration : XenForo.speed.fast,
          queue : !1
        });
        e.slideDown({
          duration : XenForo.speed.fast,
          queue : !1
        });
        b(h).bind("resize orientationchange", function () {
          k !=
          e.height() && (k = e.height(), m.css("padding-top", k))
        });
        break;
      case "notice":
        d = b('<div class="adblock_detector adblock_notice" style="display:none"><div class="errorDetails"><div class="alertIcon"></div><a class="close" title="' + l + '">&times;</a><div class="errorMessage">' + c + "</div></div></div>");
        e = d.insertAfter(".breadBoxTop");
        XenForo.rellect.AdBlockDetectorParams.canDismiss || d.find(".close").remove();
        e.xfFadeDown(XenForo.speed.fast, function () {
          XenForo.rellect.AdBlockDetectorParams.canDismiss && b(this).find(".close").click(function () {
            e.xfFadeUp(XenForo.speed.fast,
              function () {
              $AdBlockDetector.dismissed()
            })
          })
        });
        break;
      case "notification":
        var d = b('<li class="adblock_detector adblock_notification DismissParent" style="display:none"><div class="adblock_notification_content"><a class="close" title="' + l + '">&times;</a>' + c + "</div></li>"),
        g = b("#StackAlerts"),
        c = d.find(".close");
        g.length || (g = b('<ul id="StackAlerts"></ul>').appendTo("body"));
        d.prependTo(g.show()).fadeIn(XenForo.speed.normal);
        XenForo.rellect.AdBlockDetectorParams.canDismiss ? (d.xfActivate(), c.click(function () {
            d.xfFadeUp(XenForo.speed.slow,
              function () {
              b(this).empty().remove();
              g.children().length || g.hide();
              $AdBlockDetector.dismissed()
            })
          })) : c.remove();
        break;
      case "random":
        c = $AdBlockDetector.getAlertTypes(),
        $AdBlockDetector.showAlert(c[Math.floor(Math.random() * c.length)])
      }
    }
  };
  b(function () {
    XenForo.rellect.AdBlockDetector.start()
  })
}
(jQuery, this, document);
