!function (a, b, c) {
  c.UNIADS_TELEVISION = "desktop.preroll",
  c.UNIADS_REPLAY = "desktop.replay",
  c.UNIADS_INFLOW = "desktop.inflow",
  c.UNIADS_TRAILER = "desktop.trailer",
  c.TVPLAYER = "desktop.playtv"
}
(window, window.document, window.ptv || (window.ptv = {})), function (a, b, c) {
  c.Models = {},
  c.Models.Instances = {},
  c.Collections = {},
  c.Collections.Instances = {},
  c.Views = {},
  c.Views.Instances = {},
  c.Routers = {},
  c.Routers.Instances = {},
  c.Events = {},
  c.Events.Instances = {},
  c.Intervals = {},
  c.Intervals.Instances = {},
  c.Firewalls = {}

}
(window, window.document, window.ptv || (window.ptv = {})), function (a) {
  a.Browser = {
    visit : function (a) {
      window.location.href = a
    }
  }
}
(window), function (a, b, c) {
  c.Carousel = {
    $carousel : 0,
    $images : 0,
    $triggers : 0,
    selected : 0,
    initialize : function () {
      var a = this;
      if (a.$images = a.$carousel.children("li"), a.$triggers = $("#carousel-triggers li"), 1 === this.$carousel.length && 0 !== this.$images.length) {
        this.$triggers.each(function (c, d) {
          var e = $(d);
          e.on("click", function (d) {
            d.which > 1 || (d.preventDefault(), null !== b && (clearInterval(b), b = null), a.slide(c))
          }),
          e.children("a").on("click", function (a) {
            a.which < 2 && a.preventDefault()
          })
        });
        var b = window.setInterval(function () {
            a.slide()
          }, 3e3)
      }
    },
    slide : function (a) {
      var b = this;
      if (a !== b.selected) {
        "undefined" == typeof a && (a = b.selected + 1),
        a === b.$images.length && (a = 0);
        var c = b.$images.eq(a).position().left;
        b.$triggers.filter(".selected").removeClass("selected"),
        b.$triggers.eq(a).addClass("selected"),
        b.$carousel.stop().animate({
          left : (0 !== c ? "-" + c : 0) + "px"
        }, 300, null, function () {
          b.selected = a
        })
      }
    }
  }
}
(window, window.document, window.ptv || (window.ptv = {})), function (a, b, c) {
  c.Clock = {
    delta : 0,
    setDelta : function () {
      "undefined" != typeof ppl.vars.datetime && (this.delta = moment() - moment(ppl.vars.datetime))
    },
    getTime : function () {
      return moment().subtract("milliseconds", this.delta)
    }
  }
}
(window, window.document, window.ptv || (window.ptv = {})), function (a, b, c) {
  c.Form = {
    supportPlaceholderForLegacyBrowser : function () {
      Modernizr.input.placeholder || ($("[placeholder]").focus(function () {
          var a = $(this);
          a.val() == a.attr("placeholder") && (a.val(""), a.removeClass("placeholder"))
        }).blur(function () {
          var a = $(this);
          ("" === a.val() || a.val() === a.attr("placeholder")) && (a.addClass("placeholder"), a.val(a.attr("placeholder")))
        }).blur(), $("[placeholder]").parents("form").submit(function () {
          $(this).find("[placeholder]").each(function () {
            var a = $(this);
            a.val() == a.attr("placeholder") && a.val("")
          })
        }))
    },
    manageButtonCursor : function () {
      $(".js-button-cursor").click(function (a) {
        a.preventDefault();
        var b = this,
        c = $(b),
        d = c.children();
        c.hasClass("is-active") ? (d.val(!1), c.removeClass("is-active")) : (d.val(!0), c.addClass("is-active"))
      })
    }
  }
}
(window, window.document, window.ptv || (window.ptv = {})), function (a, b, c) {
  c.InflowPopin = {
    init : function () {
      var a = this;
      a.$html = $("html"),
      a.$sqrpub = $(".sqrpub"),
      a.$uprInflow = $("#ptv-UprInflow"),
      a.domain = "." + window.location.host,
      a.cookieName = "__ptv_inflow",
      a.counterCookieName = "__ptv_inflow_request_counter",
      a.$colorbox = $.colorbox({
          overlayClose : !1,
          escKey : !1,
          transition : "none",
          html : '<div id="cboxLoadingGraphic" style="float: left;"></div>',
          width : "672",
          height : "505",
          scrolling : "false",
          className : "ptv-InflowPopin",
          top : "0px",
          left : "0px",
          reposition : !1,
          fixed : !0,
          trapFocus : !1,
          onLoad : function () {
            a.onLoad()
          },
          onComplete : function () {
            a.onComplete()
          },
          onClosed : function () {
            a.onClosed()
          }
        }),
      a.colorboxClose = $.colorbox.close,
      $.colorbox.close = function () {}

    },
    addContext : function () {
      this.$html.addClass("ptv--inflowPopin")
    },
    removeContext : function () {
      this.$html.removeClass("ptv--inflowPopin")
    },
    hideAds : function () {
      this.$sqrpub.addClass("ptv-SqrPub--hidden")
    },
    showAds : function () {
      this.$sqrpub.removeClass("ptv-SqrPub--hidden")
    },
    showCloseButton : function () {
      var a = this;
      a.removeNoAdsKiller(),
      a.addCapping(),
      a.addPlayedAdsKiller(),
      $.colorbox.close = a.colorboxClose,
      a.$cboxClose.show().on("click", function () {
        a.close()
      })
    },
    isActive : function () {
      return $("html").hasClass("ptv--inflowPopin")
    },
    close : function () {
      $.colorbox.close(),
      this.killFlash()
    },
    onLoad : function () {
      var a = this;
      a.$cboxClose = $("#cboxClose"),
      a.$cboxClose.off().hide(),
      a.addContext(),
      window.scrollTo(0, 0),
      a.addNoAdsKiller(),
      a.callRequestCounter()
    },
    onComplete : function () {
      this.hideAds(),
      this.moveFlash()
    },
    onClosed : function () {
      var a = this;
      a.showAds(),
      a.removeContext(),
      a.active = !1
    },
    killFlash : function () {
      "undefined" != typeof this.$uprInflow && this.$uprInflow.remove()
    },
    moveFlash : function () {
      this.$uprInflow.addClass("ptv-UprInflow--popin")
    },
    addCapping : function () {
      var a = this;
      Cookie.set(a.cookieName, 1, {
        domain : a.domain,
        path : "/",
        expires : moment().endOf("day")
      }),
      Cookie.remove(a.counterCookieName, {
        path : "/",
        domain : a.domain
      })
    },
    addPlayedAdsKiller : function () {
      var a = this;
      window.setTimeout(function () {
        $.colorbox.close = a.colorboxClose,
        a.close()
      }, 25e3)
    },
    addNoAdsKiller : function () {
      var a = this;
      this.noAdsKillerTimeout = window.setTimeout(function () {
          $.colorbox.close = a.colorboxClose,
          a.close()
        }, 1e4)
    },
    removeNoAdsKiller : function () {
      var a = this;
      window.clearTimeout(a.noAdsKillerTimeout)
    },
    callRequestCounter : function () {
      var a = this,
      b = 0;
      "string" == typeof Cookie.get(a.counterCookieName) && (b = Cookie.get(a.counterCookieName)),
      b = parseInt(b, 10),
      b >= 3 ? this.addCapping() : (b++, Cookie.set(a.counterCookieName, b, {
          path : "/",
          domain : a.domain,
          expires : moment().endOf("day")
        }))
    }
  };
  var d = "inflow:open",
  e = "inflow:button",
  f = "uniads:finished",
  g = _.extend({}, Backbone.Events);
  g.listenTo(c.InternalFlashManager.Events, d, function () {
    c.InflowPopin.init()
  }),
  g.listenTo(c.InternalFlashManager.Events, e, function () {
    c.InflowPopin.showCloseButton()
  }),
  g.listenTo(c.InternalFlashManager.Events, f, function (a) {
    1 === a.code && c.InflowPopin.isActive() && c.InflowPopin.close()
  })
}
(window, window.document, window.ptv || (window.ptv = {})), function () {
  function a(a) {
    var b = a.serializeObject(),
    c = "",
    d = a.find("*[type=submit]"),
    e = !0;
    _.each(b, function (a) {
      c += a
    }),
    c.length > 0 && (e = !1),
    d.attr("disabled", e)
  }
  $.fn.handleSubmit = function () {
    var b = this;
    setTimeout(function () {
      a(b)
    }, 200),
    this.on("keyup change", function () {
      a($(this))
    })
  },
  $.fn.handleInputError = function () {
    var a = this;
    a.each(function () {
      var a = this;
      $(a).find("input").on("focus", function () {
        var a = this,
        b = $(a);
        b.removeClass("ptv-Input--error")
      })
    })
  }
}
();
var layout_update;
!function () {
  var a = "tab-active",
  b = "tab-selected",
  c = "tab-disabled";
  $(document).ready(function () {
    var a = $("#bottombar");
    1 === a.length && setTimeout(function () {
      a.animate({
        bottom : 0
      }, 300)
    }, 1600),
    d(),
    $(".row.fluid").masonry({
      itemSelector : "div[class^=span]"
    }),
    setInterval(update_durations, 5e3),
    layout_update(!0)
  }),
  update_durations = function () {
    $("*[data-duration='true']").each(function (a, b) {
      var c = $(b),
      d = c.data("timestamp");
      if ("undefined" != typeof d) {
        var e = ppl.time.get() - d;
        c.html(ppl.time.duration(e))
      }
    })
  },
  layout_update = function (a) {
    "undefined" != typeof a && a === !0 && e(),
    $(".row .sep").each(function (a, b) {
      var c = $(b);
      if (c.is(":hidden") !== !0) {
        var d = c.parents(".row");
        d.eq(0).css("height", "auto").css("height", d.eq(d.length - 1).height() + "px")
      }
    })
  };
  var d = function () {
    var a = $("#search-input-advanced");
    if (0 === a.length) {
      a = $(".search-action").on("click", function () {
          $(this).children("input").focus()
        }).children("input");
      var b = .7;
      a.on("focus", function () {
        $(this).fadeTo(0, 1).parent().fadeTo(0, 1)
      }).on("blur", function () {
        $(this).fadeTo(0, b).parent().fadeTo(0, b)
      }).fadeTo(0, b).parent().fadeTo(0, b)
    }
    a.parents("form:eq(0)").on("submit", function (b) {
      "" === $.trim(a.val()) && (a.val("").focus(), b.preventDefault())
    })
  },
  e = function () {
    var d = $("ul#tabs > li"),
    e = null,
    f = "undefined" != typeof ppl.url.hashs[0] ? ppl.url.hashs[0] : null,
    g = null,
    h = null;
    if (d.each(function (a, i) {
        var j = $(i),
        k = a + 1;
        i.className = i.className === b ? b : "";
        var l = $("#tab" + k);
        return g = j.children("a").attr("data-hash"),
        0 === a && (h = i),
        1 !== l.length ? (j.unbind().find("a").on("click", function (a) {
            return a.preventDefault()
          }), void(i.className = c)) : (i.className === b && null !== e ? ($("#tab" + e).hide(), d.eq(e - 1)[0].className = "", i.className = b, l.show(), e = k) : null === e ? null !== f && void 0 !== g ? f === g ? (e = k, i.className = b, l.show()) : (d.eq(k - 1)[0].className = "", l.hide()) : (e = k, i.className = b, l.show()) : l.hide(), void j.children("a").on("click", function (a) {
            if (e !== k) {
              $("#tab" + e).hide(),
              d.eq(e - 1)[0].className = "",
              i.className = b,
              l.show(),
              l.find(".row.fluid").masonry("reload"),
              e = k,
              new_hash = j.children("a").attr("data-hash"),
              void 0 !== new_hash && (location.hash = new_hash),
              layout_update();
              var c = $(a.currentTarget).attr("data-event-tracker");
              "undefined" != typeof c && tracking.events(c.split("-"))
            }
            return a.preventDefault()
          }))
      }), null === e && null !== f && null !== h) {
      var i = $("#tab1");
      e = 1,
      h.className = b,
      i.show()
    }
    $(".sub-menu ul > li, ul.tabs > li").each(function (b, d) {
      var e = $(d),
      f = e.children("a");
      e.on("mousedown", function (b) {
        b.which < 2 && e.hasClass(a) === !1 && d.className !== c && e.addClass(a)
      }).on("mouseup", function () {
        e.hasClass(a) === !0 && e.removeClass(a)
      }).on("mouseout", function () {
        e.hasClass(a) === !0 && e.removeClass(a)
      }),
      d.className === c && (e.unbind(), f.unbind().on("click", function (a) {
          return a.preventDefault()
        })),
      e.mouseover(function () {
        "undefined" != typeof f.attr("title") && f.data("title", f.attr("title")).attr("title", "")
      })
    })
  }
}
(), function () {
  var a,
  b,
  c,
  d = {},
  e = null,
  f = null,
  g = null,
  h = ".tooltip";
  d.add_events = function () {
    $("*[data-tooltip]").each(function () {
      var a = $(this),
      b = a.attr("title");
      a.data("tooltip", a.attr("data-tooltip")).removeAttr("data-tooltip").attr("title", "").data("title", "undefined" == typeof b ? "" : b).on("mouseenter" + h, d.enter).on("mouseleave" + h + " click" + h, d.leave),
      $(window).on("scroll" + h + " resize" + h, d.leave)
    }),
    a = $('<div id="tooltips" />').appendTo("body")
  },
  $(document).ready(d.add_events),
  d.enter = function () {
    var a = this;
    return "undefined" != typeof c && a === c[0] ? $.proxy(d.display, a)() : (d.remove(), null !== e && (e.abort(), e = null), clearTimeout(f), clearTimeout(g), void(f = setTimeout(function () {
            $.proxy(d.display, a)()
          }, 500)))
  },
  d.leave = function () {
    null !== e && (e.abort(), e = null),
    clearTimeout(f),
    clearTimeout(g),
    d.hide()
  },
  d.display = function () {
    if (c = $(this), "undefined" != typeof b && null !== b)
      return d.position(), b.show();
    var f = c.data("tooltip");
    switch (b = $("<div />").clone().addClass("tooltip").css({
          top : 0,
          left : 0
        }).fadeTo(0, .96), f) {
    case "title":
      var g = c.data("title");
      if ("undefined" == typeof g || "" === g)
        return;
      b.html($("<div />").addClass("content").html('<p class="smaller"><strong>' + g + "</strong></p>"));
      break;
    case "live":
    case "hashtag":
      g = c.data("channel");
      var h = 180,
      i = c.attr("data-programs"),
      j = c.attr("data-alias") || c.attr("data-channel-alias"),
      k = c.attr("data-hashtag"),
      l = '<p class="clear-grey">Programme inconnu.</p>';
      if ("live" === f) {
        if ("undefined" == typeof g || "undefined" == typeof j)
          return;
        $("<div />").addClass("foot").html("En direct sur <strong>" + g + "</strong>").appendTo(b)
      }
      if ("undefined" == typeof i || "1" === i) {
        b.addClass("loading");
        var m = $("<div />").addClass("content").html("<p>Chargement</p>").prependTo(b);
        e = ppl.ajax("television", "tooltip", [j]).success(function (a) {
            if (_.isEmpty(a))
              m.html(l);
            else {
              if (k = a.hashtag || k, "hashtag" === f) {
                if ("undefined" == typeof k || "undefined" == typeof j)
                  return;
                $("<div />").addClass("foot").html("<strong>#" + k + "</strong>").appendTo(b)
              }
              if (null === a)
                return void m.html(l);
              if (m.empty(), null !== a.gender && null !== a.gender_id) {
                var c = '<span class="program-gender-icon program-gender-icon' + a.gender_id + '"></span>' + a.gender;
                $("<p />").html('<span class="program-gender small">' + c + "</span>").appendTo(m)
              }
              var d = '<span class="clear-grey">' + ppl.time.getMySQL("H:i", a.start) + '</span> <span class="red">' + a.title + "</span>";
              $("<p />").html('<strong class="bigger">' + d + "</strong>").appendTo(m),
              null !== a.subtitle && $("<p />").html('<span class="smaller clear-grey">' + a.subtitle + "</span>").appendTo(m)
            }
          }).error(function () {
            m.html(l)
          }).complete(function () {
            b.removeClass("loading"),
            e = null
          }).exec()
      } else
        $("<div />").addClass("content").html(l).prependTo(b)
    }
    d.position(h),
    b.appendTo(a)
  },
  d.position = function (a) {
    var d = $(window),
    e = d.height(),
    f = d.scrollTop(),
    g = c.offset(),
    h = c.width();
    b.removeClass("north east south west"),
    a = "undefined" != typeof a ? a : parseInt(b.css("width"), 10);
    var i = g.top + c.height() + 6 - f,
    j = "auto",
    k = g.left + 2;
    k + a >= d.width() ? (k = g.left - a + h, b.addClass("east")) : b.addClass("west"),
    g.top + 200 > e + f ? (i = "auto", j = e - g.top + 6 + f, b.addClass("south")) : b.addClass("north"),
    b.css({
      top : i,
      bottom : j,
      left : k,
      width : a
    })
  },
  d.hide = function () {
    "undefined" != typeof b && null !== b && b.hide()
  },
  d.remove = function () {
    "undefined" != typeof b && null !== b && (b.remove(), b = null)
  }
}
();
var tracking = {};
tracking.pageview = function (a) {
  "undefined" != typeof _gaq && _gaq.push("string" == typeof a ? ["_trackPageview", a] : ["_trackPageview"]),
  "undefined" != typeof _eStat && _eStat.push(["eStat_tag.post", "m"])
}, tracking.events = function (a) {
  "undefined" != typeof _gaq && ("object" != typeof a && a.length < 2 || "string" == typeof a[0] && "string" == typeof a[1] && _gaq.push("string" == typeof a[2] ? ["_trackEvent", a[0], a[1], a[2]] : ["_trackEvent", a[0], a[1]]))
}, tracking.setCustomVar = function (a) {
  var b = {};
  b.index = a.index || null,
  b.name = a.name || null,
  b.value = a.value || null,
  b.scope = a.scope || null,
  _gaq.push(["_setCustomVar", b.index, b.name, b.value, b.scope])
}, function () {
  setInterval(function () {
    if ("undefined" != typeof _eStat && "undefined" != typeof _PJS && 1 === _PJS)
      for (; "object" == typeof _eStat[0]; ) {
        if (2 !== _eStat[0].length)
          return;
        var a = /([^.]+)\.([^.]+)?$/.exec(_eStat[0][0]);
        if ("object" == typeof a && 3 === a.length && "object" == typeof window[a[1]] && "function" == typeof window[a[1]][a[2]]) {
          window[a[1]][a[2]](_eStat[0][1]),
          delete _eStat[0];
          var b = _eStat;
          _eStat = [];
          for (var c in b)
            _eStat[_eStat.length] = b[c]
        }
      }
  }, 750)
}
(), function () {
  function a() {
    c.each(function (a, e) {
      var f = $(e);
      if (f.on("mouseenter", function () {
          c.stop().fadeTo(0, .6),
          f.stop().fadeTo(0, 1)
        }).on("mouseleave", function () {
          c.fadeTo(300, 1)
        }), "A" === f[0].nodeName) { {
          var g = f.attr("class").substr(d.length);
          b(g)
        }
        f.on("click", function (a) {
          tracking.events(["SHARING", g]);
          var c = b(g);
          window.open(c.href, "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600"),
          a.preventDefault()
        })
      }
    })
  }
  function b(a) {
    var b = document.location.toString().replace(/\/#([^/] + ) \  / $ / ,
    "/$1/"),
    c = encodeURIComponent(b),
    d = encodeURIComponent(document.title),
    e = {
      href : null,
      onclick : null
    };
    switch (a) {
    case "facebook":
      e.href = "https://www.facebook.com/sharer.php?u=" + c;
      break;
    case "twitter":
      e.href = "https://twitter.com/intent/tweet?text=" + d + " " + c + " via @playtv_fr";
      break;
    case "googleplus":
      e.href = "https://plus.google.com/share?url=" + c + "&hl=fr";
      break;
    case "mail":
      var f = encodeURIComponent("Télévision gratuite et en direct sur internet!"),
      g = "%0a%0a",
      h = encodeURIComponent("Salut! j'ai découvert ce site pour regarder la télé en direct sur Internet...");
      h += g + c,
      h += g + encodeURIComponent("À bientôt !"),
      e.href = "mailto:?subject=" + f + "&body=" + h
    }
    return e
  }
  var c,
  d = "share-";
  $(document).ready(function () {
    c = $("#sharing > *"),
    a()
  })
}
(), function () {
  $(document).ready(function () {
    var b = $("#replay-slider"),
    c = b.find("#prev"),
    d = b.find("#next"),
    e = b.find(".slider"),
    f = (e.find("li"), $("#replay-description")),
    g = f.find(".description"),
    h = parseInt(e.attr("data-start"), 10),
    i = 0,
    j = 0,
    k = e.bxSlider({
        minSlides : 4,
        maxSlides : 4,
        slideWidth : 5e3,
        pager : !1,
        controls : !1,
        speed : 200,
        infiniteLoop : !1,
        moveSlides : 1,
        startSlide : h,
        onSliderLoad : function (a) {
          i = k.getSlideCount(),
          j = a
        },
        onSlideBefore : function () {
          g.hide(),
          f.find(".description[data-id=" + j + "]").fadeIn("slow"),
          1 === j ? c.removeClass("active") : j === parseInt(i - 2, 10) ? d.removeClass("active") : (c.addClass("active"), d.addClass("active"))
        }
      });
    if (g.not(":eq(" + h + ")").hide(), c.click(function (a) {
        a.preventDefault(),
        $(this).hasClass("active") && (j = parseInt(j - 1, 10), k.goToSlide(j))
      }), d.click(function (a) {
        a.preventDefault(),
        $(this).hasClass("active") && (j = parseInt(j + 1, 10), k.goToSlide(j))
      }), $("a.popup").on("click", function (a) {
        if (!(a.which > 1)) {
          var b = document.location.protocol + "//" + document.location.hostname + $(this).attr("href");
          window.open(b, "share", "width=750,height=540,toolbar=0,scrollbars=1,status=0,resizable=1,location=0,menubar=0,top=30,left=30"),
          a.preventDefault()
        }
      }), a(), "replay_tv" === ppl.vars.controller && "undefined" != typeof popup) {
      var l = _.extend({}, Backbone.Events),
      m = new ptv.FlashUniads({
          configUrl : ppl.vars.hosts.uniads + "/config/",
          notifier : !1,
          $element : $("#inflow"),
          width : "300px",
          height : "250px",
          channelId : channel_id,
          appZone : ptv.UNIADS_REPLAY
        });
      l.listenTo(m, "finished", function () {
        ppl.redirect(url)
      }),
      m.build()
    }
  });
  var a = function () {
    var a = $("#replay-channels-list"),
    b = $("#replay-channels-expand");
    0 !== a.length && 0 !== b.length && (b.children("a").on("click", function (a) {
        a.preventDefault()
      }), b.on("click", function (b) {
        $(this).remove(),
        a.css({
          height : "auto"
        }),
        b.preventDefault()
      }))
  }
}
(), function () {
  var a,
  b,
  c,
  d,
  e,
  f,
  g,
  h,
  i,
  j,
  k = [],
  l = null,
  m = 0,
  n = "tvplayer",
  o = 610,
  p = 384,
  q = null,
  r = 0,
  s = !1,
  t = "television",
  u = "data-live-program-by-channel",
  v = !1,
  w = null,
  x = 90,
  y = "undefined" != typeof history.pushState,
  z = !1,
  A = _.extend({}, Backbone.Events),
  B = function (a) {
    if ("string" != typeof a)
      return null;
    for (var b = 0; b < k.length; b++)
      if (k[b].alias === a)
        return k[b];
    return null
  },
  C = function (a) {
    var b = $(a),
    c = b.children("a"),
    d = "data-";
    b = b.extend({
        play : E,
        get_infos : D,
        id : parseInt(c.attr(d + "id"), 10),
        alias : c.attr(d + "alias"),
        title : c.attr(d + "channel"),
        playerid : c.attr(d + "playerid"),
        page : b.parent().prevAll().length,
        is_played : function () {
          return null === l ? !1 : this.id === l.id
        },
        program : {
          start : null,
          end : null,
          title : null,
          gender : null,
          subgender : null
        },
        progress : function () {
          var a = ppl.time.get();
          if (null === this.program.start || null === this.program.end)
            return 0;
          if (this.program.end < a)
            return 100;
          var b = this.program.end - this.program.start;
          if (0 > b)
            return 0;
          var c = Math.floor((a - this.program.start) / b * 100);
          return c
        },
        player_progression : function () {
          var a = null === this.program.start ? "?" : ppl.time.getMySQL("H:i", this.program.start),
          b = null === this.program.end ? "?" : ppl.time.getMySQL("H:i", this.program.end),
          c = this.progress(),
          d = this.program.gender,
          e = this.program.subgender,
          f = this.program.title;
          return this.program.end < ppl.time.get() && (a = b = "?", c = d = e = f = null),
          tvplayer.progressbar(a, b, c, d, e, f)
        }
      }),
    k.push(b),
    c.on("click", function (a) {
      a.preventDefault()
    }).on("mouseup", function (a) {
      a.which > 1 || (b.removeClass("pressed"), b.is_played() === !1 ? b.play() : null === q && b.get_infos(), $tweets.attr("data-channel-alias", b.alias), livetweet.empty(), livetweet.update(), livetweet.manageTweetNumber())
    }).on("mousedown", function (a) {
      a.which > 1 || b.addClass("pressed")
    }).on("mouseout", function () {
      b.removeClass("pressed")
    }),
    c.removeAttr(d + "id").removeAttr(d + "playerid")
  },
  D = function () {
    var a = this;
    null !== q && (q.abort(), q = null);
    var b = ppl.ajax(t, u, [a.alias, z]).options({
        dataType : "json",
        timeout : 8e3
      });
    b.before(function () {
      e.hide(),
      f.show()
    });
    var c = function () {
      r++
    };
    return b.error(c),
    b.success(function (b) {
      return null !== b.live_program.end && b.live_program.end < ppl.time.get() ? c() : (r = 0, e.html(a.title), $("#tabs li").removeClass("tab-selected"), "undefined" != typeof livetweet && livetweet.parse_tweets(), "function" == typeof layout_update && layout_update(!0), a.program = {
          start : b.live_program.start,
          end : b.live_program.end,
          title : b.live_program.title,
          gender : b.live_program.gender,
          subgender : b.live_program.subgender
        }, a.player_progression(), $.get("/television/block-live-program-by-channel/" + a.alias + "/", function (a) {
          $tvProgrammeLive.html(a),
          layout_update(!0)
        }), void $.get("/television/block-next-programs-by-channel/" + a.alias + "/", function (a) {
          $tvProgrammeNext.html(a),
          layout_update(!0)
        }))
    }),
    b.complete(function () {
      q = null,
      e.show(),
      f.hide()
    }),
    q = b.exec(),
    a
  },
  E = function () {
    "undefined" != typeof ptv.Views.Instances.Notifier && ptv.Views.Instances.Notifier.close();
    var a = this;
    if (null !== l && (l[0].className = ""), a[0].className = "played", "undefined" != typeof tvplayer && tvplayer.destroy(), document.title = "Regarder " + a.title + " en direct sur internet – Play TV", y === !1 ? setTimeout(function () {
        return ppl.redirect("/" + t + "/#" + a.alias + "/")
      }, 300) : history.replaceState({}, a.title, "/" + t + "/" + a.alias + "/"), y !== !1 || "undefined" == typeof ppl.url.params[1]) {
      tracking.pageview("/" + t + "/" + a.alias + "/"),
      a.get_infos(),
      l = a,
      tvplayer.onflashrequired = function () {
        F('Pour regarder la télévision\nvous devez mettre à jour\nou installer gratuitement\n<a href="http://get.adobe.com/fr/flashplayer/" target="_blank" rel="nofollow">Adobe Flash Player</a>', "flashplayer")
      },
      tvplayer.onerror = function (a) {
        5 !== a && 6 !== a && (F('Oups ! Une erreur\ninconnue est survenue\n<a href="" id="television-retry">Ré-essayer</a>', "error"), $("#television-retry").on("click", function (a) {
            b(),
            a.preventDefault()
          }))
      },
      "undefined" != typeof i && clearInterval(i),
      tvplayer.isready(function () {
        a.player_progression(),
        i = setInterval(function () {
            a.player_progression(),
            s === !1 && a.progress() >= 100 && 3 >= r && a.get_infos()
          }, 5e3),
        J(a)
      }).play(function () {
        a.player_progression(),
        tracking.events(["TELEVISION", "play", a.title]),
        H(!0)
      }).stop(function () {
        tracking.events(["TELEVISION", "stop", a.title]),
        H(!1)
      }).fullscreen(function (b) {
        s = b,
        tracking.events(["TELEVISION", (b === !0 ? "enter" : "exit") + "Fullscreen", a.title]),
        H(b === !1),
        "undefined" != typeof livetweet && livetweet.auto_update(b === !1),
        b === !0 ? h = $(".sqrpub > iframe").remove() : $(".sqrpub").html(h)
      });
      var b = function () {
        F(null, "loading");
        var a = {
          controls : 1,
          background : 1579032,
          esms : "playtv.fr",
          report : "/aide/support/",
          bwt : "/aide/bandwidth/",
          volume_cookie : !0
        };
        tvplayer.build(n, l.playerid, o, p, a)
      };
      "undefined" == typeof j && (F(null, "loading"), j = new ptv.FlashUniads({
            configUrl : ppl.vars.hosts.uniads + "/config/",
            $element : $("#" + n),
            channelId : a.id,
            appZone : ptv.UNIADS_TELEVISION
          }), "undefined" != typeof ads_unique_id && j.set({
          $companion : $("#" + ads_unique_id)
        }, {
          silent : !0
        }), "undefined" != typeof tmp_banner_url && j.set({
          companionUrl : tmp_banner_url
        }, {
          silent : !0
        }), A.listenTo(j, "finished", function () {
          j.remove(),
          A.stopListening(j),
          j = void 0,
          b()
        }), A.listenTo(j, "flash:error", function () {
          tvplayer.onflashrequired()
        }), j.build())
    }
  },
  F = function (a, b) {
    var c = $('<div id="' + n + '" />').css("visibility", "visible");
    if ("string" == typeof a && "" !== $.trim(a)) {
      for (var e = $('<div id="big-text" />'), f = a.split("\n"), g = 0; g < f.length; g++)
        e.append("<p><strong>" + $.trim(f[g]) + "</strong></p>");
      c.html(e)
    }
    "string" == typeof b && (c[0].className = b),
    d.empty().append(c)
  },
  G = function (d) {
    m !== d && (b.attr("class", ""), b[d].className = "selected", a.animate({
        left : d * -c
      }, 200, null, function () {
        m = d
      }))
  },
  H = function (a) {
    var b = 0,
    c = ".cinemaMode",
    d = function () {
      b = 0,
      I(!1)
    };
    I(!1),
    clearInterval(w),
    w = null,
    $("body").off(c),
    $(window).off(c),
    a !== !1 && ($("body").on("mousemove" + c + " click" + c, d), $(window).on("keydown" + c + " focus" + c + " scroll" + c, d), w = setInterval(function () {
          b++,
          b === x && I(!0)
        }, 1200))
  },
  I = function (a) {
    ptv.Views.Instances.Popin.isActive() && (a = !1),
    a = "undefined" == typeof a ? !0 : a;
    var b = "cinema-mode",
    c = $("#" + b);
    if (a !== v) {
      if (v === !0 && a === !1)
        return c.stop().fadeTo(200, 0, function () {
          c.remove()
        }), void(v = !1);
      var e = $("body"),
      f = d.offset(),
      g = d.width(),
      h = d.height() - 40,
      i = $("<div>").css({
          background : "#000000",
          position : "absolute"
        });
      c = $('<div id="' + b + '">').css({
          position : "absolute",
          top : 0,
          left : 0,
          zIndex : 1e5,
          width : "100%",
          height : "100%"
        }).fadeTo(0, 0),
      i.clone().css({
        left : 0,
        top : 0,
        width : "100%",
        height : f.top
      }).appendTo(c),
      i.clone().css({
        left : 0,
        top : f.top,
        width : f.left,
        height : h
      }).appendTo(c),
      i.clone().css({
        left : f.left + g,
        top : f.top,
        width : e.width() - (f.left + g),
        height : h
      }).appendTo(c),
      i.clone().css({
        left : 0,
        top : f.top + h,
        width : "100%",
        height : e.height() - (f.top + h)
      }).appendTo(c),
      c.appendTo(e).fadeTo(3e3, .9),
      v = !0
    }
  },
  J = function (a) {
    var b = ppl.ajax("ad", "television", [a.alias]).options({
        dataType : "html",
        timeout : 8e3
      });
    b.success(function (a) {
      $(".span-sidebar").html(a)
    });
    b.exec()
  };
  $(document).ready(function () {
    var h;
    if (d = $("#player"), a = $("#mosaic-channels .container"), 0 !== a.length) {
      g = $("#content .container .row > .span-page"),
      e = $("#tv-channel-title"),
      f = $("#update-loading");
      var i = 0;
      $tvProgrammeLive = $(".ptv-js-TvProgramme-live"),
      $tvProgrammeNext = $(".ptv-js-TvProgramme-next"),
      $tweets = $("#tweets"),
      a.find("li").each(function (a, b) {
        C(b)
      });
      var j = "undefined" != typeof ppl.url.params[1] ? ppl.url.params[1] : null,
      k = "undefined" != typeof ppl.url.hashs[0] ? ppl.url.hashs[0] : null;
      if (null !== j) {
        if (h = B(j), y === !1 && null !== h)
          return ppl.redirect("/" + t + "/#" + j + "/")
      } else if (null !== k && (h = B(k), y === !0 || null === h))
        return ppl.redirect("/" + t + "/" + k + "/");
      "undefined" != typeof h && null !== h && 1 === h.length ? h.play() : tracking.pageview(),
      c = a.children("ul:eq(0)").width(),
      b = $("#mosaic-slider a"),
      b.each(function (a, b) {
        $(b).on("click", function (b) {
          G(a),
          b.preventDefault()
        })
      }),
      $("#mosaic-cache-left").on("click", function () {
        0 !== m && 0 !== b.length && G(m - 1)
      }),
      null !== l && l.page !== m && setTimeout(function () {
        G(l.page)
      }, 300),
      z = !0,
      $("#tabs #live-tab").on("click", function () {
        tracking.events("undefined" != typeof h && null !== h && 1 === h.length ? ["TELEVISION", "showTabDirect", h.title] : ["TELEVISION", "showTabDirect"])
      }),
      $("#tabs #following-tab").on("click", function () {
        tracking.events("undefined" != typeof h && null !== h && 1 === h.length ? ["TELEVISION", "showTabNext", h.title] : ["TELEVISION", "showTabNext"])
      }),
      $("#tabs #livetweet-tab").on("click", function () {
        tracking.events("undefined" != typeof h && null !== h && 1 === h.length ? ["TELEVISION", "showTabLiveTweets", h.title] : ["TELEVISION", "showTabLiveTweets"])
      }),
      window.setInterval(function () {
        if (0 !== i) {
          var a = i / 60,
          b = parseInt(a, 10),
          c = i - 60 * b;
          10 > b && (b = "0" + b),
          10 > c && (c = "0" + c),
          duration_time = b + ":" + c,
          tracking.events(["DURATION", "showTV", duration_time])
        }
        i += 10
      }, 6e5)
    }
  })
}
(), function () {
  $(document).ready(function () {
    a()
  });
  var a = function () {
    var a = $(".dropdown, .bar-dropdown");
    a.each(function (b, c) {
      var d = $(c),
      e = d.children(".list-values");
      d.hasClass("bar-dropdown") === !0 && e.css("width", e.width() + 1 + "px"),
      e.on("click", function (a) {
        return a.stopPropagation()
      }),
      d.on("click", function (b) {
        return d.hasClass("open") === !0 ? d.removeClass("open") : (a.removeClass("open"), d.addClass("open")),
        b.stopPropagation()
      })
    }),
    $(document).on("click", function () {
      a.removeClass("open")
    })
  }
}
();
var livetweet = {};
!function (a, b) {
  var c = $("#tweets"),
  d = null,
  e = null,
  f = 6e4,
  g = ("undefined" != typeof history.pushState, $(".ptv-js-Tweet-moreLink")),
  h = $(".ptv-js-Tweet-numberTweet");
  b.Events.Instances.SocialTv = {},
  _.extend(b.Events.Instances.SocialTv, Backbone.Events),
  a.parse_tweets = function () {
    clearInterval(e),
    c = $("#tweets[data-auto-update='true']"),
    i() !== !1 && this.auto_update(!0)
  },
  a.auto_update = function (a) {
    a === !0 ? e = setInterval(o, f) : a === !1 && clearInterval(e)
  },
  a.update = function () {
    o()
  },
  a.empty = function () {
    c.empty(),
    c.html('<li class="ptv-Tweet-loader"><i></i><li>')
  },
  a.manageNewTweets = function () {
    0 !== k() || n() || $(".ptv-js-Tweet-moreLink").trigger("click")
  },
  a.enable = function () {
    c.removeAttr("data-disabled")
  },
  a.disable = function () {
    c.attr("data-disabled", !0)
  },
  a.manageTweetNumber = function () {
    var a = m(),
    b = a >= 100 ? "99+" : a;
    h.html(b),
    0 === a ? h.addClass("is-empty") : h.removeClass("is-empty"),
    a > 0 && g.removeClass("ptv-Tweet-moreLink--hidden")
  };
  var i = function () {
    return 1 === c.length
  },
  j = function () {
    var a = /[0-9]+/.exec(c.children("li:eq(0)").attr("id"));
    if (null !== a)
      return a[0]
  },
  k = function () {
    return c.find(".tweet:not(.tweet-status-new)").size()
  },
  l = function () {
    return c.find(".tweet").size()
  },
  m = function () {
    return c.find(".tweet-status-new").size()
  },
  n = function () {
    return c.attr("data-disabled") && "true" === c.attr("data-disabled") ? !0 : !1
  },
  o = function () {
    if (d = j(), i() !== !1) {
      "object" == typeof xhr && xhr.abort();
      var e = [];
      "undefined" != typeof(channel_alias = c.attr("data-channel-alias")) && e.push(channel_alias);
      var f = {},
      g = c.attr("data-context");
      "undefined" != typeof g && (f.context = g),
      "undefined" != typeof d && (f.since_id = d),
      0 === e.length && (e = void 0),
      xhr = ppl.ajax("live-tweets", "block-social-tv-posts", e).options({
          dataType : "html",
          data : f
        }).success(function (d) {
          if (null !== d && "" !== $.trim(d)) {
            var e = $(d).filter("li").hasClass("ptv-js-SocialTv-noPost"),
            f = c.find(".ptv-js-SocialTv-noPost");
            if (!0 === e && 0 === l())
              f.length < 1 && c.html(d);
            else {
              f.remove(); {
                $(d).filter("li:not(.ptv-js-SocialTv-noPost)").addClass("tweet-status-new").prependTo(c)
              }
              a.manageTweetNumber(),
              c.children("li:gt(99)").remove(),
              a.manageNewTweets()
            }
            b.Events.Instances.SocialTv.trigger("change")
          }
        }).exec()
    }
  }
}
(livetweet, window.ptv || (window.ptv = {})), $(document).ready(function () {
  livetweet.parse_tweets(),
  $(".ptv-js-Tweet-moreLink").on("click", function (a) {
    a.preventDefault(),
    $(this).addClass("ptv-Tweet-moreLink--hidden"),
    $("#tweets").find(".tweet-status-new").removeClass("tweet-status-new"),
    $(".ptv-js-Tweet-numberTweet").html(0).addClass("is-empty")
  }),
  $("#tweets .tweet-retweet, #tweets .tweet-no-retweets").on("click", function () {
    tracking.events("undefined" != typeof $channel && null !== $channel && 1 === $channel.length ? ["LIVETWEETS", "RT", $channel.title] : ["LIVETWEETS", "RT"])
  })
});
var programs;
$(document).ready(function () {
  programs()
}), function () {
  programs = function () {
    var a = $("#programs-timeslot");
    if (1 === a.length) {
      var b = $("#programs-timeslot-up"),
      c = $("#programs-timeslot-hours"),
      d = (a.offset().left, c.offset().top - c.position().top),
      e = function () {
        var a = $(window).scrollTop() - 3 - d;
        0 >= a ? (b.hide(), c.removeClass("is-fixed")) : (b.show(), c.addClass("is-fixed"))
      };
      "undefined" != typeof $.browser.webkit && $.browser.webkit || (e(), $(window).scroll(e)),
      b.on("click", function (a) {
        window.scrollTo(0, 0),
        b.hide(),
        a.preventDefault()
      });
      var f = $("#programs-timeslot-now-icon"),
      g = $("#programs-timeslot-now");
      if (1 === f.length && 1 === g.length) {
        var h = function () {
          return 185 + 4 * Math.floor((ppl.time.get() - parseInt(from_time, 10)) / 60)
        },
        i = function () {
          var b = h();
          a.find(".programs .container").each(function (a, c) {
            var d = $(c),
            e = d.position().left;
            d.find(".program ").each(function (a, c) {
              var d = $(c),
              f = d.position().left + e + 105,
              g = d.width();
              b >= f && g + f > b && d.hasClass("program-unknow") === !1 ? d.addClass("program-live") : d.removeClass("program-live")
            })
          })
        };
        i(),
        setInterval(function () {
          var a = h();
          a >= 905 && ppl.redirect("/programmes-tv/en-ce-moment/"),
          a != parseInt(f.css("left"), 10) && (i(), f.css("left", a).text(ppl.time.getMySQL("H:i", ppl.time.get())), g.css("left", a))
        }, 800)
      }
    }
  }
}
(jQuery), function () {
  $(document).ready(function () {
    a(),
    b()
  });
  var a = function () {
    if ("undefined" != typeof swfobject) {
      var a = swfobject.getFlashPlayerVersion();
      0 !== a.major && ($(".flash-version:not(input)").text(a.major + "." + a.minor + "." + a.release), $(".flash-version:input").val(a.major + "." + a.minor + "." + a.release))
    }
    $(".local-date:input").val(ppl.time.getMySQL("Y-m-d H:i:s", ppl.time.getLocal()))
  },
  b = function () {
    var a = $("#support-form"),
    b = $("#support-sent"),
    c = a.find("button[type=submit]:eq(0)");
    if (0 !== a.length && 0 !== b.length && 0 !== c) {
      var d = function () {
        var a = "disabled";
        "undefined" == typeof c.attr(a) ? c.attr(a, a).addClass(a).parent().css("background", "url('/assets/images/animate/icon-loading.gif') no-repeat 0 50%") : c.removeAttr(a).removeClass(a).parent().css("background", "")
      };
      a.submit(function (c) {
        var e = !0,
        f = a.serializeArray();
        if ($.each(f, function (b, c) {
            switch (c.name) {
            case "email":
            case "message":
              if ("" === $.trim(c.value))
                return a.find("*[name=" + c.name + "]")
                  .focus(), e = !1, !1
              }
            }), e === !1)return c.preventDefault();
        ppl.ajax("aide", "support").options({
          type : "POST",
          data : a.serialize()
        }).before(d).complete(d).success(function (c) {
          switch (c.status) {
          case "email":
          case "message":
            var d = a.find("*[name=" + c.status + "]");
            d.focus();
            break;
          case !0:
            a.hide(),
            b.show()
          }
        }).exec();
        c.preventDefault()
      })
    }
  }
}
(), this.jst = this.jst || {}, this.jst.notifierAccountTimer = Handlebars.template(function (a, b, c, d, e) {
    function f(a, b) {
      var d,
      e = "";
      return e += " (",
      (d = c.timer) ? d = d.call(a, {
          hash : {},
          data : b
        }) : (d = a.timer, d = typeof d === i ? d.apply(a) : d),
      e += j(d) + ")"
    }
    this.compilerInfo = [4, ">= 1.0.0"],
    c = this.merge(c, a.helpers),
    e = e || {};
    var g,
    h = "",
    i = "function",
    j = this.escapeExpression,
    k = this;
    return h += '<div class="container">\n  <p class="ptv-js-Notifier-sentence">Pour profiter de la télévision en illimité, <a href="/connexion/" class="ptv-js-AccountStarter">connectez-vous</a> ou <a href="/inscription/" class="ptv-js-AccountStarter">abonnez-vous</a>, c\'est gratuit !',
    g = c["if"].call(b, b.timer, {
        hash : {},
        inverse : k.noop,
        fn : k.program(1, f, e),
        data : e
      }),
    (g || 0 === g) && (h += g),
    h += "</p>\n</div>\n"
  }), this.jst.notifierIndex = Handlebars.template(function (a, b, c, d, e) {
    this.compilerInfo = [4, ">= 1.0.0"],
    c = this.merge(c, a.helpers),
    e = e || {};
    var f,
    g = "",
    h = "function";
    return g += '<div class="container">\n  <p>',
    (f = c.content) ? f = f.call(b, {
        hash : {},
        data : e
      }) : (f = b.content, f = typeof f === h ? f.apply(b) : f),
    (f || 0 === f) && (g += f),
    g += "</p>\n</div>\n"
  }), this.jst.notifierOldBrowser = Handlebars.template(function (a, b, c, d, e) {
    return this.compilerInfo = [4, ">= 1.0.0"],
    c = this.merge(c, a.helpers),
    e = e || {},
    '<div class="container">\n  <p>Vous utilisez un navigateur dépassé et risqué, il est temps de <a href="/pages/browser-choice/">changer</a>. <a class="ptv-js-OldBrowserNotifier-close ptv-Notifier-close" href="#">X</a></p>\n</div>\n'
  }), this.jst.popinIndex = Handlebars.template(function (a, b, c, d, e) {
    function f(a, b) {
      var d,
      e = "";
      return e += '\n  <section class="ptv-PopinInner-actions ptv-PopinInnerActions">\n    ',
      d = c["if"].call(a, a.cancel, {
          hash : {},
          inverse : l.noop,
          fn : l.program(2, g, b),
          data : b
        }),
      (d || 0 === d) && (e += d),
      e += '\n    <button class="ptv-Button ptv-Button--success ptv-PopinInnerActions-button ptv-js-Popin-confirm">',
      (d = c.confirm) ? d = d.call(a, {
          hash : {},
          data : b
        }) : (d = a.confirm, d = typeof d === j ? d.apply(a) : d),
      e += k(d) + "</button>\n  </section>\n  "
    }
    function g(a, b) {
      var d,
      e = "";
      return e += '<button class="ptv-Button ptv-Button--link ptv-PopinInnerActions-button ptv-js-Popin-cancel">',
      (d = c.cancel) ? d = d.call(a, {
          hash : {},
          data : b
        }) : (d = a.cancel, d = typeof d === j ? d.apply(a) : d),
      e += k(d) + "</button>"
    }
    this.compilerInfo = [4, ">= 1.0.0"],
    c = this.merge(c, a.helpers),
    e = e || {};
    var h,
    i = "",
    j = "function",
    k = this.escapeExpression,
    l = this;
    return i += '<div class="ptv-PopinInner">\n  <h2 class="ptv-PopinInner-heading">',
    (h = c.title) ? h = h.call(b, {
        hash : {},
        data : e
      }) : (h = b.title, h = typeof h === j ? h.apply(b) : h),
    (h || 0 === h) && (i += h),
    i += '</h2>\n  <section class="ptv-PopinInner-content">\n    ',
    (h = c.content) ? h = h.call(b, {
        hash : {},
        data : e
      }) : (h = b.content, h = typeof h === j ? h.apply(b) : h),
    (h || 0 === h) && (i += h),
    i += "\n  </section>\n  ",
    h = c["if"].call(b, b.confirm, {
        hash : {},
        inverse : l.noop,
        fn : l.program(1, f, e),
        data : e
      }),
    (h || 0 === h) && (i += h),
    i += "\n</div>\n"
  }), 
  
  
  function () {
  var a = {
    x : "b",
    y : "a"
  },
  b = a.y + "d" + a.x,
  c = b + "lock";
  $(document).ready(function () {
    var a = $('<div id="' + b + '" />').append('<span id="banner468x60" />');
    a.children("span").css({
      display : "block",
      visible : "visible",
      width : "2px",
      height : "2px"
    }),
    a.appendTo("body"),
    setTimeout(function () {
      var b = e();
      if (window.location.pathname === "/" + c + "/")
        "undefined" != typeof console && console.log("Please, disable your adblocker.");
      else if ("/aide/support/" === window.location.pathname) {
        var f = $("#support-form input.adb");
        b === !0 && f.val(1),
        b === !1 && f.val(0)
      } else
        b === !0 && -1 !== window.location.pathname.search(/\/television\/+/) && d();
      "undefined" != typeof a && a.remove()
    }, 15e3)
  });
  
  var d = function () {
    $("#television .notice-adb-container > div:eq(1)").remove(),
    document.location.replace("/" + c + "/")
  },
  
  e = function () {
    var a = $("#" + b + ">*"),
    c = !1;
    if (0 !== a.length)
      return a.each(function (a, b) {
        var d = $(b);
        try {
          if (0 === d.width() || "undefined" != typeof d[0].clientWidth && 0 === d[0].clientWidth || 0 === parseInt(d.css("width"), 10) || "none" === d.css("display") || "hidden" === d.css("visibility") || -1 !== d.css("-moz-binding").search(/about:abp-elemhidehit+/))
            return c = !0, !1
        } catch (e) {
          return
        }
      }), c
  }
}
()


, function (a, b, c) {
  c.Events.Main = {},
  _.extend(c.Events.Main, Backbone.Events)
}
(window, window.document, window.ptv || (window.ptv = {})), function (a, b, c) {
  c.Events.TvPlayer = {},
  _.extend(c.Events.TvPlayer, Backbone.Events),
  c.Events.TvPlayer.listenTo(c.Events.Main, "account:logout", function () {
    tvplayer.command("USER_LOGOUT")
  })
}
(window, window.document, window.ptv || (window.ptv = {})), function (a, b, c) {
  c.Models.GuideChoice = Backbone.Model.extend({
      url : function () {
        return "/television/block-live-programs/"
      }
    })
}
(window, window.document, window.ptv || (window.ptv = {})), function (a, b, c) {
  c.Models.ProgrammePreview = Backbone.Model.extend({
      url : function () {
        return "/television/block-live-program-by-channel/" + this.get("alias") + "/?context=social_tv"
      }
    })
}
(window, window.document, window.ptv || (window.ptv = {})), function (a, b, c) {
  c.Routers.Router = Backbone.Router.extend({
      routes : {
        "television/*_" : "runTelevision",
        "live-tweet/*_" : "runLivetweet",
        "programme-tv/*_" : "runProgrammeTv",
        "mon-compte/profil/*_" : "runAccountProfile",
        "*_" : "runHomepage"
      },
      before : function () {
        c.Views.Instances.Main = new c.Views.Main,
        c.Firewalls.Secured = !1
      },
      runHomepage : function () {
        this.before(),
        c.Carousel.$carousel = $("#carousel-images ul"),
        1 === c.Carousel.$carousel.length && c.Carousel.initialize()
      },
      runTelevision : function () {
        this.before(),
        c.Views.Instances.TelevisionSubmenu = new c.Views.TelevisionSubmenu,
        c.Views.Instances.RemoteControl = new c.Views.RemoteControl
      },
      runLivetweet : function () {
        this.before(),
        "undefined" == typeof c.Views.Instances.LivetweetFilter && (c.Views.Instances.LivetweetFilter = new c.Views.LivetweetFilter),
        "undefined" == typeof c.Views.Instances.Tweet && (c.Views.Instances.Tweet = new c.Views.Tweet),
        void 0 !== c.Views.Instances.Tweet.getContext() && (window.location.hash = c.Views.Instances.Tweet.getContext(), c.Views.Instances.LivetweetFilter.manageTitles(), c.Views.Instances.LivetweetFilter.manageLink())
      },
      runProgrammeTv : function () {
        this.before(),
        c.Views.Instances.Trailer = new c.Views.Trailer
      },
      runAccountProfile : function () {
        this.before(),
        c.Firewalls.Secured = !0,
        c.Views.Instances.AccountProfile = new c.Views.AccountProfile,
        c.Views.Instances.AccountThirdPartyFacebook = new c.Views.AccountThirdPartyFacebook
      }
    })
}
(window, window.document, window.ptv || (window.ptv = {})), function (a, b, c) {
  c.Views.AccountHeader = Backbone.View.extend({
      el : ".ptv-js-AccountHeader",
      initialize : function () {
        var a = this;
        c.Views.Instances.AccountMenu = new c.Views.AccountMenu,
        this.listenTo(c.Events.Main, "account:login", function () {
          a.render()
        }),
        this.listenTo(c.Events.Main, "account:logout", function () {
          a.render()
        })
      },
      render : function () {
        var a = this;
        return $.ajax({
          url : "/ui/block-account-header/"
        }).done(function (b) {
          a.$el.html(b),
          c.Views.Instances.AccountMenu.remove(),
          c.Views.Instances.AccountMenu = new c.Views.AccountMenu
        }).fail(function () {}),
        this
      }
    })
}
(window, window.document, window.ptv || (window.ptv = {})), function (a, b, c) {
  c.Views.AccountMenu = Backbone.View.extend({
      el : ".ptv-js-AccountMenu",
      events : {
        click : "clickElement"
      },
      initialize : function () {
        var a = this;
        a.active = !1,
        a.$box = $(".ptv-js-AccountMenu-box"),
        a.$notifier = $(".ptv-js-AccountMenuNotifier"),
        a.$notifierLink = $(".ptv-js-AccountMenuNotifier-link"),
        a.$accountLogout = a.$box.find(".ptv-js-AccountLogout"),
        a.bindOutsideClick(),
        a.$accountLogout.on("click", a.onLogout),
        a.bindNotifierLink(),
        a.listenTo(c.Events.Main, "account:logout", a.hideBox)
      },
      remove : function () {
        var a = this;
        a.$accountLogout.off("click", a.onLogout),
        a.$notifierLink.off("click", a.sendValidationMail),
        a.stopListening()
      },
      bindNotifierLink : function () {
        var a = this;
        a.$notifierLink = $(".ptv-js-AccountMenuNotifier-link"),
        a.$notifierLink.on("click", _.bind(a.sendValidationMail, a))
      },
      bindOutsideClick : function () {
        var a = this;
        $(document.documentElement).on("click", function () {
          a.unactiveElement(),
          a.hideBox()
        }),
        $.merge($(".ptv-js-AccountMenu-box"), a.$el).on("click", function (a) {
          a.stopPropagation()
        })
      },
      clickElement : function (a) {
        a.preventDefault(),
        this.handleElement()
      },
      handleElement : function () {
        this.active ? (this.unactiveElement(), this.hideBox()) : (this.activeElement(), this.showBox())
      },
      activeElement : function () {
        this.$el.addClass("active"),
        this.active = !0
      },
      unactiveElement : function () {
        this.$el.removeClass("active"),
        this.active = !1
      },
      showBox : function () {
        this.$box.addClass("ptv-AccountMenuBox--active")
      },
      hideBox : function () {
        this.$box.removeClass("ptv-AccountMenuBox--active")
      },
      onLogout : function (a) {
        a.preventDefault();
        var b = "/deconnexion/";
        c.Firewalls.Secured && (window.location.href = b),
        $.ajax({
          url : b
        }).done(function () {
          c.Events.Main.trigger("account:logout")
        }).fail(function () {
          window.location.href = b
        })
      },
      sendValidationMail : function (a) {
        var b = this;
        a.preventDefault(),
        $.ajax({
          url : "/account/request-another-confirmation-email/"
        }).done(function (a) {
          b.$notifier.html(a.content),
          b.$notifier.removeClass("ptv-Tooltip--error ptv-AccountMenu-notifier--mailNotSent"),
          b.$notifier.addClass("ptv-Tooltip--success ptv-AccountMenu-notifier--mailSent")
        }).fail(function (a) {
          b.$notifier.html(JSON.parse(a.responseText).message),
          b.$notifier.removeClass("ptv-Tooltip--success ptv-AccountMenu-notifier--mailSent"),
          b.$notifier.addClass("ptv-Tooltip--error ptv-AccountMenu-notifier--mailNotSent"),
          b.bindNotifierLink()
        })
      }
    })
}
(window, window.document, window.ptv || (window.ptv = {})), function (a, b, c) {
  c.Views.AccountPopin = Backbone.View.extend({
      el : ".ptv-js-AccountPopin",
      events : {
        "submit .ptv-js-AccountPopin-loginForm" : "submitLogin",
        "submit .ptv-js-AccountPopin-registerForm" : "submitRegister",
        "submit .ptv-js-AccountPopin-forgotPasswordForm" : "submitForgotPassword",
        "submit .ptv-js-AccountPopin-requestConfirmationEmailForm" : "submitRequestConfirmationEmail",
        "click .ptv-js-DialogFacebook" : "onDialogFacebook"
      },
      initialize : function () {
        this.$alert = this.$(".ptv-js-AccountPopinContent-alert"),
        this.$colorbox = $("#colorbox"),
        this.$loginForm = this.$(".ptv-js-AccountPopin-loginForm"),
        this.$registerForm = this.$(".ptv-js-AccountPopin-registerForm"),
        this.$forgotPasswordForm = this.$(".ptv-js-AccountPopin-forgotPasswordForm"),
        this.$requestConfirmationEmailForm = this.$(".ptv-js-AccountPopin-requestConfirmationEmailForm"),
        1 === this.$registerForm.length && tracking.events(["ACCOUNT", "EMAIL", "click"]),
        this.$loginForm.handleSubmit(),
        this.$registerForm.handleSubmit(),
        this.$forgotPasswordForm.handleSubmit(),
        this.$requestConfirmationEmailForm.handleSubmit(),
        this.$loginForm.handleInputError(),
        this.$registerForm.handleInputError(),
        this.$forgotPasswordForm.handleInputError(),
        this.$requestConfirmationEmailForm.handleInputError(),
        c.Form.supportPlaceholderForLegacyBrowser()
      },
      showAlert : function () {
        this.$alert.addClass("ptv-AccountPopinContent-alert--active")
      },
      hideAlert : function () {
        this.$alert.removeClass("ptv-AccountPopinContent-alert--active")
      },
      submitLogin : function (a) {
        a.preventDefault(),
        this.submitForm(a, this.loginSuccess)
      },
      submitRegister : function (a) {
        a.preventDefault(),
        this.submitForm(a, this.registerSuccess)
      },
      submitForgotPassword : function (a) {
        a.preventDefault(),
        this.submitForm(a, this.forgotPasswordSuccess)
      },
      submitRequestConfirmationEmail : function (a) {
        a.preventDefault(),
        this.submitForm(a, this.requestConfirmationEmailSuccess)
      },
      submitForm : function (a, b) {
        var c = a.currentTarget,
        d = $(c),
        e = this,
        f = d.attr("method"),
        g = d.attr("action"),
        h = d.serialize();
        $.ajax({
          type : f,
          url : g,
          data : h,
          dataType : "json",
          success : _.bind(b, e),
          error : function (a) {
            e.errorCallback(a)
          }
        })
      },
      errorCallback : function (a) {
        var b = "Oops, une erreur s'est produite. Veuillez réessayer.",
        c = "undefined" != typeof a && "undefined" != typeof a.responseText ? JSON.parse(a.responseText) : null,
        d = this;
        if (null !== c) {
          var e = document.createDocumentFragment();
          _.each(c, function (a, b) {
            d.$("*[name=" + b + "]").addClass("ptv-Input--error");
            var c = document.createElement("li");
            c.innerHTML = a,
            e.appendChild(c)
          }),
          b = e
        }
        d.shake(),
        d.$alert.html(b),
        d.showAlert(),
        $.colorbox.resize()
      },
      shake : function () {
        this.removeShake(),
        this.$colorbox[0].offsetWidth = this.$colorbox[0].offsetWidth,
        this.$colorbox.addClass("animated shake")
      },
      removeShake : function () {
        this.$colorbox.removeClass("animated shake")
      },
      loginSuccess : function () {
        $.colorbox.close(),
        c.Events.Main.trigger("account:login")
      },
      registerSuccess : function () {
        c.Views.Instances.Popin.set({
          body : {
            content : '<div style="width: 454px; text-align: center; height: 60px;"><p>Un email de confirmation vous a été envoyé.</p> <p style="font-size: 15px; margin-bottom: 0px;">Vérifiez vos emails pour valider votre inscription.</p></div>'
          },
          mode : "success"
        }),
        c.Views.Instances.Popin.render(),
        c.Events.Main.trigger("account:login"),
        tracking.events(["ACCOUNT", "EMAIL", "confirmation_email"])
      },
      forgotPasswordSuccess : function (a) {
        c.Views.Instances.Popin.set({
          body : {
            title : a.title,
            content : a.content
          }
        }),
        c.Views.Instances.Popin.render()
      },
      requestConfirmationEmailSuccess : function (a) {
        c.Views.Instances.Popin.set({
          body : {
            title : a.title,
            content : a.content
          }
        }),
        c.Views.Instances.Popin.render()
      },
      onDialogFacebook : function (b) {
        function c(a) {
          a && "connected" === a.status ? FB.api("/me?fields=id,first_name,last_name,username,gender,verified,email,birthday", function (b) {
            d.handleOauthFacebookFlow(b, a.authResponse)
          }) : tracking.events(["ACCOUNT", "FACEBOOK", "abort"])
        }
        var d = this;
        FB.login(c, {
          scope : a.facebookScope.join(",")
        }),
        tracking.events(["ACCOUNT", "FACEBOOK", "click"]),
        b.preventDefault()
      },
      handleOauthFacebookFlow : function (a, b) {
        var d = this;
        _.assign(a, b),
        $.ajax({
          url : "/oauth/facebook/",
          type : "post",
          data : a
        }).fail(function () {
          d.errorCallback()
        }).done(function (a) {
          var b = a || null;
          $.colorbox.close(),
          c.Events.Main.trigger("account:login"),
          "undefined" != typeof b.flow && tracking.events(["ACCOUNT", "FACEBOOK", b.flow])
        })
      }
    })
}
(window, window.document, window.ptv || (window.ptv = {})), function (a, b, c) {
  c.Views.AccountProfileInfo = Backbone.View.extend({
      el : ".ptv-js-AccountProfileInfo",
      events : {
        "submit .ptv-js-AccountProfileInfo-form" : "submitForm"
      },
      initialize : function () {
        this.$alert = this.$(".ptv-js-AccountProfileInfo-alert"),
        this.$form = this.$(".ptv-js-AccountProfileInfo-form").handleInputError()
      },
      submitForm : function (a) {
        a.preventDefault();
        var b = a.currentTarget,
        c = $(b),
        d = this,
        e = c.attr("method"),
        f = c.attr("action"),
        g = c.serialize();
        $.ajax({
          type : e,
          url : f,
          data : g,
          dataType : "json",
          success : _.bind(this.formSuccess, d),
          error : function (a) {
            d.errorCallback(a)
          }
        })
      },
      formSuccess : function () {
        var a = "Votre profil a bien été mis à jour.",
        b = this;
        b.$alert.html(a),
        b.showAlertSuccess()
      },
      errorCallback : function (a) {
        var b = "Oops, une erreur s'est produite. Veuillez réessayer.",
        c = "undefined" != typeof a && "undefined" != typeof a.responseText ? JSON.parse(a.responseText) : null,
        d = this;
        if (null !== c) {
          var e = document.createDocumentFragment();
          _.each(c, function (a, b) {
            d.$("*[name=" + b + "]").addClass("ptv-Input--error");
            var c = document.createElement("li");
            c.innerHTML = a,
            e.appendChild(c)
          }),
          b = e
        }
        d.$alert.html(b),
        d.showAlertError()
      },
      showAlertSuccess : function () {
        this.showAlert(),
        this.$alert.addClass("ptv-Alert--success")
      },
      showAlertError : function () {
        this.showAlert(),
        this.$alert.addClass("ptv-Alert--error")
      },
      showAlert : function () {
        this.hideAlert(),
        this.$alert.addClass("ptv-Alert--active")
      },
      hideAlert : function () {
        this.$alert.removeClass("ptv-Alert--active ptv-Alert--error ptv-Alert--success")
      }
    })
}
(window, window.document, window.ptv || (window.ptv = {})), function (a, b, c) {
  c.Views.AccountProfilePassword = Backbone.View.extend({
      el : ".ptv-js-AccountProfilePassword",
      events : {
        "submit .ptv-js-AccountProfilePassword-form" : "submitForm",
        "click .ptv-js-AccountProfilePassword-forgotPasswordLink" : "clickForgotPasswordLink"
      },
      initialize : function () {
        this.$alert = this.$(".ptv-js-AccountProfilePassword-alert"),
        this.$form = this.$(".ptv-js-AccountProfilePassword-form").handleInputError(),
        this.$forgotPasswordUpdater = this.$("#forgot-password-updater")
      },
      clickForgotPasswordLink : function (a) {
        a.preventDefault();
        var b = this;
        $.ajax({
          type : "post",
          url : "/mot-de-passe-oublie/",
          dataType : "json"
        }).fail(function (a) {
          var c = "undefined" != typeof a && "undefined" != typeof a.responseText ? JSON.parse(a.responseText) : null;
          "undefined" != typeof c.message && b.$forgotPasswordUpdater.append(c.message)
        }).done(function (a) {
          b.$forgotPasswordUpdater.empty(),
          setTimeout(function () {
            b.$forgotPasswordUpdater.html(a.message)
          }, 200)
        })
      },
      submitForm : function (a) {
        a.preventDefault();
        var b = a.currentTarget,
        c = $(b),
        d = this,
        e = c.attr("method"),
        f = c.attr("action"),
        g = c.serialize();
        $.ajax({
          type : e,
          url : f,
          data : g,
          dataType : "json",
          success : _.bind(this.formSuccess, d),
          error : function (a) {
            d.errorCallback(a)
          }
        })
      },
      formSuccess : function () {
        var a = "Votre mot de passe a bien été mis à jour.",
        b = this;
        b.$alert.html(a),
        b.showAlertSuccess()
      },
      errorCallback : function (a) {
        var b = "Oops, une erreur s'est produite. Veuillez réessayer.",
        c = "undefined" != typeof a && "undefined" != typeof a.responseText ? JSON.parse(a.responseText) : null,
        d = this;
        if (null !== c) {
          var e = document.createDocumentFragment();
          _.each(c, function (a, b) {
            d.$("*[name=" + b + "]").addClass("ptv-Input--error");
            var c = document.createElement("li");
            c.innerHTML = a,
            e.appendChild(c)
          }),
          b = e
        }
        d.$alert.html(b),
        d.showAlertError()
      },
      showAlertSuccess : function () {
        this.showAlert(),
        this.$alert.addClass("ptv-Alert--success")
      },
      showAlertError : function () {
        this.showAlert(),
        this.$alert.addClass("ptv-Alert--error")
      },
      showAlert : function () {
        this.hideAlert(),
        this.$alert.addClass("ptv-Alert--active")
      },
      hideAlert : function () {
        this.$alert.removeClass("ptv-Alert--active ptv-Alert--error ptv-Alert--success")
      }
    })
}
(window, window.document, window.ptv || (window.ptv = {})), function (a, b, c) {
  c.Views.AccountProfile = Backbone.View.extend({
      el : ".ptv-js-AccountProfile",
      events : {
        "click .ptv-js-AccountProfile-disableLink" : "disableAccount"
      },
      initialize : function () {
        c.Views.Instances.AccountProfileInfo = new c.Views.AccountProfileInfo,
        c.Views.Instances.AccountProfilePassword = new c.Views.AccountProfilePassword
      },
      disableAccount : function (a) {
        a.preventDefault();
        var b = this,
        d = a.currentTarget,
        e = $(d),
        f = e.attr("href");
        c.Views.Instances.Popin.set({
          mode : "confirm",
          body : {
            title : "Suppression de compte",
            content : "Êtes-vous sûr(e) de vouloir supprimer votre compte&nbsp;?"
          }
        }),
        b.listenTo(c.Views.Instances.Popin, "popin:confirm", function (a) {
          b.stopListening(c.Views.Instances.Popin),
          a ? Browser.visit(f) : c.Views.Instances.Popin.close()
        }),
        c.Views.Instances.Popin.render()
      }
    })
}
(window, window.document, window.ptv || (window.ptv = {})), function (a, b, c) {
  c.Views.AccountThirdPartyFacebook = Backbone.View.extend({
      el : ".ptv-js-AccountThirdPartiesFacebook",
      events : {
        "click .ptv-js-DialogFacebook" : "onDialogFacebook"
      },
      initialize : function () {},
      render : function () {
        var a = this;
        return $.ajax({
          url : "/ui/block-account-facebook-connect/"
        }).done(function (b) {
          a.$el.html(b)
        }).fail(function () {}),
        this
      },
      onDialogFacebook : function (b) {
        function c(a) {
          a && a.authResponse && "connected" === a.status && d.handleOauthFacebookConnectFlow(a.authResponse)
        }
        var d = this;
        FB.login(c, {
          scope : a.facebookScope.join(",")
        }),
        b.preventDefault()
      },
      handleOauthFacebookConnectFlow : function (a) {
        var b = this;
        $.ajax({
          url : "/oauth/facebook/connect/",
          type : "post",
          data : a
        }).fail(function () {}).done(function () {
          b.render()
        })
      }
    })
}
(window, window.document, window.ptv || (window.ptv = {})), function (a, b, c) {
  c.Views.LivetweetFilter = Backbone.View.extend({
      el : ".js-ptv-LivetweetFilter",
      events : {
        "click .js-ptv-LivetweetFilter-item" : "changeFilter"
      },
      initialize : function () {
        var a = this;
        this.$list = this.$("#livetweet-channels-list"),
        this.$slider = this.$(".js-ptv-LivetweetSlider"),
        this.$items = this.$slider.find(".js-ptv-LivetweetFilter-item"),
        this.$currentItem = this.$items.filter(".is-active"),
        this.currentItemNumber = this.$currentItem.index() || 0,
        this.currentSlide = Math.floor(this.currentItemNumber / 16),
        this.slider = this.$slider.bxSlider({
            maxSlides : 16,
            slideWidth : 40,
            slideMargin : 18,
            pager : !1,
            infiniteLoop : !1,
            hideControlOnEnd : !0,
            responsive : !1,
            startSlide : a.currentSlide,
            moveSlides : 10
          }),
        this.$slider.removeClass("ptv-LivetweetFilter-slider--hidden"),
        this.ProgrammePreviewView = new c.Views.ProgrammePreview,
        this.ProgrammePreviewView.initializeElements(),
        this.$mainTitle = $(".ptv-js-LivetweetFilter-mainTitle"),
        this.$secondTitle = $(".ptv-js-LivetweetFilter-secondTitle"),
        this.$link = $(".ptv-js-LivetweetFilter-link")
      },
      changeFilter : function (a) {
        a.preventDefault(),
        this.currentItem = a.currentTarget,
        this.$currentItem = $(this.currentItem),
        this.$currentItemChild = this.$currentItem.children(),
        this.channelId = this.$currentItemChild.attr("data-channel-id"),
        this.channelName = this.$currentItemChild.attr("data-channel-name"),
        this.channelAlias = this.$currentItemChild.attr("data-channel-alias"),
        this.ProgrammePreviewView.stopListening(),
        this.ProgrammePreviewView.render(this.channelAlias),
        this.manageTitles(),
        this.manageLink(),
        this.manageFilterSelector(),
        this.trigger("change:id", this.channelId),
        this.trigger("change:alias", this.channelAlias),
        livetweet.update()
      },
      manageFilterSelector : function () {
        this.$items.removeClass("is-active"),
        this.$currentItem.addClass("is-active")
      },
      manageLink : function () {
        var a = c.Views.Instances.Tweet.getContext(),
        b = "/live-tweet/";
        "undefined" != typeof this.channelAlias && (b += this.channelAlias + "/"),
        "trending" === a && (b += "#trending"),
        this.$link.attr("href", b)
      },
      manageTitles : function () {
        var a = c.Views.Instances.Tweet.getContext(),
        b = this.channelName ? " de " + this.channelName : "";
        "trending" === a ? (this.$mainTitle.text("Hot tweets" + b), this.$secondTitle.text("Voir les hot tweets")) : (this.$mainTitle.text("Derniers tweets" + b), this.$secondTitle.text("Voir les tweets en direct"))
      }
    })
}
(window, window.document, window.ptv || (window.ptv = {})), function (a, b, c) {
  c.Views.Main = Backbone.View.extend({
      el : "html",
      events : {
        "click .js-switcher" : "switchElement",
        "keyup .js-character-counter-target" : "countCharacters",
        "click .js-ptv-Link--pushstate" : "navigate",
        "click .ptv-js-AccountStarter" : "clickAccountStarter"
      },
      initialize : function () {
        var a = this;
        this.startInflow(),
        this.initializeCharacterCounter(),
        $(".ptv-js-Tab").each(function (a) {
          c.Views.Instances["Tabs" + a] = new c.Views.Tab({
              el : $(this)
            })
        }),
        c.Views.Instances.Notifier = new c.Views.Notifier,
        c.Views.Instances.Popin = new c.Views.Popin,
        c.Views.Instances.AccountHeader = new c.Views.AccountHeader,
        a.handleNotifierForOldBrowser(),
        a.listenTo(c.InternalFlashManager.Events, "notifier:requireAccount", function (a) {
          c.Views.Instances.Notifier.trigger("requireAccount", a.duration)
        }),
        c.Form.supportPlaceholderForLegacyBrowser(),
        c.Form.manageButtonCursor(),
        this.on("flow:register", function () {
          a.startAccount("/inscription/")
        }),
        this.on("flow:login", function () {
          a.startAccount("/connexion/")
        }),
        this.on("flow:forgotPassword", function () {
          a.startAccount("/mot-de-passe-oublie/")
        })
      },
      switchElement : function (a) {
        var b = a.currentTarget,
        c = $(b);
        c.hasClass("is-active") ? c.removeClass("is-active") : c.addClass("is-active")
      },
      handleNotifierForOldBrowser : function () {
        this.$el.hasClass("lt-ie10") && "pages/browser-choice/" !== Backbone.history.fragment && !Cookie.get("__ptv_old_browser_hide_message") && (c.Views.Instances.OldBrowserNotifier = new c.Views.Notifier({
              el : ".ptv-js-OldBrowserNotifier"
            }), c.Views.Instances.OldBrowserNotifier.renderOldBrowser())
      },
      startInflow : function () {
        if (!Cookie.get("__ptv_inflow") && "undefined" != typeof ppl.vars.iefInflow && ppl.vars.iefInflow) {
          var a = new c.FlashUniads({
              configUrl : ppl.vars.hosts.uniads + "/config/",
              $element : $("#ptv-UprInflow"),
              width : 610,
              height : 384,
              channelId : 0,
              appZone : c.UNIADS_INFLOW,
              mode : "inflow",
              notifier : !1
            });
          a.build()
        }
      },
      initializeCharacterCounter : function () {
        this.$characterNumber = $(".js-character-counter");
        var a = $(".js-add-hashtag");
        a.each(function () {
          var a = $(this),
          b = a.attr("data-hashtag");
          a.on("focusout", function () {
            0 === a.val().length && a.attr("data-add-hashtag", "true")
          }),
          a.on("keydown", function () {
            var c = a.attr("data-add-hashtag"),
            d = a.val();
            0 === d.length && "true" === c && (a.val(d + " " + b), a[0].setSelectionRange(0, 0), a.attr("data-add-hashtag", "false"))
          })
        })
      },
      countCharacters : function (a) {
        this.characterNumberTarget = a.currentTarget;
        var b = this.characterNumberTarget.textLength,
        c = 255,
        d = c - b;
        this.$characterNumber.html(d),
        d > 127 ? this.$characterNumber.removeClass("low done out") : 127 >= d && d > 0 ? (this.$characterNumber.addClass("low"), this.$characterNumber.removeClass("done out")) : 0 === d ? (this.$characterNumber.addClass("done"), this.$characterNumber.removeClass("low out")) : (this.$characterNumber.addClass("out"), this.$characterNumber.removeClass("done low"))
      },
      navigate : function (a) {
        a.preventDefault();
        var d = a.currentTarget,
        e = $(d),
        f = e.attr("href"),
        g = e.attr("data-title");
        b.title = g,
        c.Routers.Instances.Router.navigate(f, !0)
      },
      startAccount : function (a) {
        var b = this;
        $.colorbox({
          href : a,
          className : "ptv-AccountPopin",
          closeButton : !1,
          transition : "none",
          fixed : !0,
          initialWidth : 0,
          initialHeight : 0,
          onComplete : function () {
            b.accountPopinView = new c.Views.AccountPopin
          },
          onClosed : function () {
            "undefined" != typeof b.accountPopinView && (b.accountPopinView.removeShake(), b.accountPopinView.remove(), delete b.accountPopinView)
          }
        })
      },
      clickAccountStarter : function (a) {
        a.preventDefault();
        var b = a.currentTarget,
        c = $(b),
        d = c.attr("href");
        this.startAccount(d)
      }
    })
}
(window, window.document, window.ptv || (window.ptv = {})), function (a, b, c) {
  c.Views.Notifier = Backbone.View.extend({
      el : ".ptv-js-Notifier",
      template : this.jst,
      initialize : function () {
        var a = this;
        a.opened = !1,
        this.view = {},
        this.on("requireAccount", function (b) {
          a.renderAccountTimer(b)
        }),
        this.$el.hasClass("ptv-js-OldBrowserNotifier") || this.listenTo(c.Events.Main, "account:login", function () {
          a.close()
        })
      },
      render : function (a) {
        return _.extend(this.view, a),
        this.tpl = this.tpl || this.template.notifierIndex,
        this.show(),
        this.$el.html(this.tpl(this.view)),
        this
      },
      renderAccountTimer : function (a) {
        var b = this;
        b.tpl = b.template.notifierAccountTimer,
        "undefined" != typeof c.Intervals.Instances.NotifierTimer && clearInterval(c.Intervals.Instances.NotifierTimer),
        "undefined" == typeof a || 1 > a ? (b.render(), b.show(), c.Views.Instances.Main.trigger("flow:register")) : (c.Intervals.Instances.NotifierTimer = setInterval(function () {
              0 >= a && (clearInterval(c.Intervals.Instances.NotifierTimer), c.Views.Instances.Popin.isActive() || c.Views.Instances.Main.trigger("flow:register")),
              b.handleSecondes(a),
              b.render(),
              a--
            }, 1e3), b.handleSecondes(a), b.render(), b.show(), a--)
      },
      renderOldBrowser : function () {
        var a = this;
        a.tpl = a.template.notifierOldBrowser,
        a.$el.addClass("ptv-Notifier--warning"),
        a.render(),
        a.$(".ptv-js-OldBrowserNotifier-close").on("click", function (b) {
          b.preventDefault(),
          Cookie.set("__ptv_old_browser_hide_message", 1, {
            path : "/",
            expires : +new Date + 93 * Cookie.DAY
          }),
          a.close()
        })
      },
      close : function () {
        "undefined" != typeof c.Intervals.Instances.NotifierTimer && clearInterval(c.Intervals.Instances.NotifierTimer),
        this.hide()
      },
      show : function () {
        this.$el.addClass("ptv-Notifier--active"),
        this.opened = !0
      },
      hide : function () {
        this.$el.removeClass("ptv-Notifier--active"),
        this.opened = !1
      },
      isOpened : function () {
        return this.opened
      },
      handleSecondes : function (a) {
        var b = this;
        b.view.timer = 0 >= a ? "" : 2 > a ? a + " seconde" : a + " secondes"
      }
    })
}
(window, window.document, window.ptv || (window.ptv = {})), function (a, b, c) {
  var d = ["success", "info", "warning", "confirm", "alert"];
  c.Views.Popin = Backbone.View.extend({
      el : "#colorbox",
      template : this.jst,
      initialize : function (a) {
        this.set(a)
      },
      _reset : function () {
        this.options = {
          className : "",
          mode : null,
          close : !0,
          body : {}

        }
      },
      set : function (a) {
        this._reset(),
        _.extend(this.options, a),
        this._handleMode()
      },
      render : function () {
        var a = this,
        b = "Ok",
        c = "Annuler";
        a.view = {},
        ("alert" === a.options.mode || "confirm" === a.options.mode) && (a.view.confirm = a.options.confirmContent || b, a.options.close = !1),
        "confirm" === a.options.mode && (a.view.cancel = a.options.cancelContent || c),
        a.view.title = a.options.body.title,
        a.view.content = a.options.body.content,
        $.colorbox({
          className : " " + a.options.className,
          html : a.template.popinIndex(a.view),
          closeButton : a.options.close,
          initialWidth : 0,
          initialHeight : 0,
          onComplete : function () {
            a.$confirm = a.$(".ptv-js-Popin-confirm"),
            a.$cancel = a.$(".ptv-js-Popin-cancel"),
            a.$confirm.on("click", function () {
              a.confirmAction()
            }),
            a.$cancel.on("click", function () {
              a.cancelAction()
            })
          }
        })
      },
      isActive : function () {
        return "block" == this.$el.css("display") ? !0 : !1
      },
      confirmAction : function () {
        this.trigger("popin:confirm", !0)
      },
      cancelAction : function () {
        this.trigger("popin:confirm", !1)
      },
      close : function () {
        this.stopListening(),
        $.colorbox.close()
      },
      _handleMode : function () {
        var a = this,
        b = a.options.mode;
        if (null !== b) {
          if (!_.contains(d, b))
            throw new Error("Mode available: " + d);
          a._removeMode(),
          a.options.className = "" !== a.options.className ? a.options.className + " ptv-Popin--" + b : "ptv-Popin--" + b
        }
      },
      _removeMode : function () {
        var a = this;
        _.each(d, function (b) {
          a.options.className = a.options.className.replace("ptv-Popin--" + b, "")
        })
      }
    })
}
(window, window.document, window.ptv || (window.ptv = {})), function (a, b, c) {
  c.Views.ProgrammePreview = Backbone.View.extend({
      el : ".js-ptv-ProgrammePreview",
      initialize : function () {
        this.model = new c.Models.ProgrammePreview
      },
      initializeElements : function () {
        var b = this;
        this.$bar = this.$(".js-ptv-ProgrammePreview-bar"),
        0 !== this.$bar.length && (this.on("ptv.progress_bar_change", this.manageRefresh, this), this.$livetweetFilter = $(".js-ptv-LivetweetFilter"), this.$programStart = this.$(".js-ptv-ProgrammePreview-programStart"), this.$programEnd = this.$(".js-ptv-ProgrammePreview-programEnd"), this.$bar = this.$(".js-ptv-ProgrammePreview-bar"), this.programStartValue = moment(this.$programStart.data("value")).format("X"), this.programEndValue = moment(this.$programEnd.data("value")).format("X"), this.progressBarValue = 0, "undefined" != typeof this.progressBarInterval && a.clearInterval(b.progressBarInterval), this.progressBarInterval = a.setInterval(function () {
              b.clock = c.Clock.getTime(),
              b.progressBarValue = b.calculateBarPercent(b.clock.format("X"), b.programStartValue, b.programEndValue),
              b.renderBarPercentage(b.progressBarValue),
              b.trigger("ptv.progress_bar_change")
            }, 6e4))
      },
      calculateBarPercent : function (a, b, c) {
        var d = c - b,
        e = a - b,
        f = 100 * e / d;
        return f
      },
      renderBarPercentage : function (a) {
        this.$bar.css("width", a + "%")
      },
      render : function (a) {
        var b = this;
        "undefined" == typeof a ? b.$el.empty() : (this.model.set("alias", a), this.model.fetch().complete(function (a) {
            b.$el.html(a.responseText),
            b.initializeElements()
          }))
      },
      manageRefresh : function () {
        this.progressBarValue >= 100 && this.render(this.getChannelId())
      },
      getChannelId : function () {
        return this.$livetweetFilter.find(".js-ptv-LivetweetFilter-item.is-active").children().data("channel-id")
      }
    })
}
(window, window.document, window.ptv || (window.ptv = {})), function (a, b, c) {
  c.Views.RemoteControl = Backbone.View.extend({
      el : ".ptv-js-RemoteControl",
      events : {
        "click .js-tab" : "clickTab",
        "click .ptv-js-GuideChoice-item" : "clickChannel",
        "mouseup #mosaic-channels .channel-button" : "clickMosaicChannel"
      },
      guideChoiceSeen : !1,
      socialTvSeen : !1,
      $currentEl : void 0,
      $currentChannel : void 0,
      currentChannelAlias : void 0,
      currentTabNumber : 0,
      initialize : function () {
        var a = this;
        this.listenToOnce(c.Events.Instances.SocialTv, "change", this.firstRefresh),
        this.$guideChoice = this.$(".ptv-js-GuideChoice"),
        this.$mosaic = this.$(".ptv-js-Mosaic"),
        this.$guideChoiceList = this.$guideChoice.find(".ptv-js-GuideChoice-list"),
        this.$choiceContainer = this.$(".js-choice-container"),
        this.$tweetScrollbar = this.$(".ptv-js-Tweet-scrollbar"),
        this.$tab = this.$(".js-tab"),
        this.$tweetCounter = this.$(".ptv-js-Tweet-counter"),
        this.manageGuideChoice(),
        this.$tweetScrollbar.mCustomScrollbar({
          scrollInertia : 0
        }),
        c.Models.Instances.GuideChoice = new c.Models.GuideChoice,
        this.refreshGuideChoiceInterval = window.setInterval(function () {
            1 == a.currentTabNumber && a.refreshGuideChoice()
          }, 6e4),
        livetweet.update()
      },
      firstRefresh : function () {
        livetweet.disable()
      },
      clickTab : function (a) {
        a.preventDefault(),
        this.$currentEl = $(a.currentTarget),
        this.currentTabNumber = this.$currentEl.attr("data-tab");
        var b = this.$currentEl.attr("data-event-tracker");
        this.manageTab(),
        "undefined" != typeof b && tracking.events(b.split("-"))
      },
      manageTab : function () {
        livetweet.disable(),
        this.showMainContainer(),
        this.selectTab(),
        this.manageGuideChoice(),
        this.manageSocialTv()
      },
      manageGuideChoice : function () {
        1 != this.currentTabNumber || this.guideChoiceSeen || (this.$(".television-list").mCustomScrollbar({
            scrollInertia : 0
          }), this.guideChoiceSeen = !0)
      },
      manageSocialTv : function () {
        var a = this;
        2 == this.currentTabNumber && (livetweet.enable(), livetweet.manageNewTweets(), a.$tweetScrollbar.mCustomScrollbar("update"), "undefined" != typeof this.socialTvScrollbarInterval && window.clearInterval(this.socialTvScrollbarInterval), this.socialTvScrollbarInterval = window.setInterval(function () {
              a.$tweetScrollbar.mCustomScrollbar("update")
            }, 1e3))
      },
      selectTab : function () {
        this.$tab.removeClass("is-active"),
        this.$currentEl.addClass("is-active")
      },
      showMainContainer : function () {
        this.$choiceContainer.removeClass("is-active"),
        this.$choiceContainer.eq(this.currentTabNumber).addClass("is-active")
      },
      refreshGuideChoice : function () {
        var a = this;
        this.currentChannelAlias = this.$(".ptv-js-GuideChoice-item.is-active").attr("data-alias"),
        c.Models.Instances.GuideChoice.fetch({
          data : {
            active : a.currentChannelAlias
          }
        }).complete(function (b) {
          a.$guideChoice.html(b.responseText),
          a.guideChoiceSeen = !1,
          a.manageGuideChoice()
        })
      },
      clickChannel : function (a) {
        a.preventDefault(),
        this.$currentChannel = $(a.currentTarget),
        this.$(".ptv-js-GuideChoice-item").removeClass("is-active"),
        this.$currentChannel.addClass("is-active"),
        this.currentChannelAlias = this.$currentChannel.attr("data-alias"),
        this.$mosaic.find("a[data-alias=" + this.currentChannelAlias + "]").trigger("mouseup")
      },
      clickMosaicChannel : function (a) {
        a.preventDefault(),
        livetweet.enable(),
        this.listenToOnce(c.Events.Instances.SocialTv, "change", this.firstRefresh),
        this.$currentChannel = $(a.currentTarget),
        this.currentChannelAlias = this.$currentChannel.attr("data-alias"),
        this.$(".ptv-js-GuideChoice-item").removeClass("is-active"),
        this.$guideChoice.find("a[data-alias=" + this.currentChannelAlias + "]").addClass("is-active")
      }
    })
}
(window, window.document, window.ptv || (window.ptv = {})), function (a, b, c) {
  c.Views.Tab = Backbone.View.extend({
      el : ".ptv-js-Tab",
      events : {
        "click .ptv-js-Tab-item" : "clickTab"
      },
      initialize : function () {
        var a = this;
        a.$tabs = a.$(".ptv-js-Tab-item"),
        a.$tabContents = a.$(".ptv-js-Tab-content")
      },
      clickTab : function (a) {
        a.preventDefault();
        var b = this,
        c = $(a.currentTarget),
        d = c.attr("data-value"),
        e = c.attr("href"),
        f = c.attr("data-event-tracker");
        c.hasClass("ptv-Tab-item--active") && (window.location.href = e),
        b.$tabs.removeClass("ptv-Tab-item--active"),
        c.addClass("ptv-Tab-item--active"),
        b.$tabContents.addClass("ptv-Tab-content--hidden"),
        b.$tabContents.filter("[data-value=" + d + "]").removeClass("ptv-Tab-content--hidden"),
        "undefined" != typeof f && tracking.events(f.split("-"))
      }
    })
}
(window, window.document, window.ptv || (window.ptv = {})), function (a, b, c) {
  c.Views.TelevisionSubmenu = Backbone.View.extend({
      el : "#television-menu",
      events : {
        "click #want-to-tweet" : "clickWantToTweet",
        "click #close-tweet" : "clickCloseComment",
        "click #comment" : "clickComment"
      },
      initialize : function () {
        var a = this;
        $("html").click(function () {
          a.hideComment()
        }),
        this.$wantToTweet = this.$("#want-to-tweet"),
        this.$tweetOptions = this.$("#tweet-options"),
        this.$closeTweet = this.$("#close-tweet"),
        this.$publishTweet = this.$("#publish-tweet"),
        this.$comment = this.$("#comment"),
        this.$tweetOptions.find(".js-button-cursor, #publish-tweet").click(function (a) {
          a.stopPropagation()
        })
      },
      clickWantToTweet : function (a) {
        a.preventDefault(),
        a.stopPropagation(),
        this.showComment()
      },
      clickCloseComment : function (a) {
        a.preventDefault(),
        this.hideComment()
      },
      showComment : function () {
        this.$wantToTweet.removeClass("is-active"),
        this.$tweetOptions.addClass("is-active"),
        this.$comment.addClass("is-active")
      },
      hideComment : function () {
        this.$tweetOptions.removeClass("is-active"),
        this.$comment.removeClass("is-active"),
        this.$wantToTweet.addClass("is-active")
      },
      clickComment : function (a) {
        a.stopPropagation()
      }
    })
}
(window, window.document, window.ptv || (window.ptv = {})), function (a, b, c) {
  c.Views.Trailer = Backbone.View.extend({
      el : ".ptv-js-Trailer",
      events : {
        "click .ptv-js-Trailer-action" : "clickAction"
      },
      initialize : function () {
        var b = this;
        this.collect(),
        $(a).bind("hashchange", function () {
          b.$el.empty(),
          window.clearTimeout(b.willKillTheTrailerDudeTimeout),
          "#resume" === window.location.hash && b.render()
        })
      },
      collect : function () {
        var a = this;
        this.$action = this.$(".ptv-js-Trailer-action"),
        this.$iframe = this.$(".ptv-js-Trailer-iframe"),
        this.$uniAds = this.$(".ptv-js-Trailer-uniAds"),
        this.title = this.$el.attr("data-title") ? this.$el.attr("data-title") : "",
        this.subtitle = this.$el.attr("data-subtitle") ? this.$el.attr("data-subtitle") : "",
        this.trailerId = this.$el.attr("data-id") ? this.$el.attr("data-id") : "",
        this.flashUniads = new c.FlashUniads({
            configUrl : ppl.vars.hosts.uniads + "/config/",
            $element : $("#ptv-Trailer-uniAds"),
            width : "488px",
            height : "275px",
            notifier : !1,
            appZone : c.UNIADS_TRAILER
          }),
        a.listenTo(a.flashUniads, "finished", function () {
          a.showTrailer()
        })
      },
      render : function () {
        var a = this;
        return $.ajax({
          url : "/trailer/block-trailer/" + this.trailerId + "/",
          type : "get"
        }).done(function (b) {
          a.$el.html(b),
          a.collect()
        }),
        this
      },
      clickAction : function (a) {
        a.preventDefault(),
        this.buildUniAds(),
        this.hideAction(),
        this.showUniAds()
      },
      hideAction : function () {
        this.$action.addClass("ptv-Trailer-action--hidden")
      },
      showIframe : function () {
        this.$iframe.removeClass("ptv-Trailer-iframe--hidden")
      },
      showUniAds : function () {
        this.$uniAds.removeClass("ptv-Trailer-uniAds--hidden")
      },
      hideUniAds : function () {
        this.$uniAds.addClass("ptv-Trailer-uniAds--hidden")
      },
      replaceIframeSrc : function () {
        var a = this.$iframe.attr("data-src");
        this.$iframe.attr("src", a),
        this.$iframe.removeAttr("data-src")
      },
      buildUniAds : function () {
        this.flashUniads.build()
      },
      showTrailer : function () {
        this.replaceIframeSrc(),
        this.hideUniAds(),
        this.flashUniads.remove(),
        this.showIframe(),
        tracking.events(["TRAILER", "play", this.title + " " + this.subtitle]),
        this.willKillTheTrailerDude()
      },
      willKillTheTrailerDude : function () {
        var a = this;
        this.willKillTheTrailerDudeTimeout = window.setTimeout(function () {
            tracking.events(["TRAILER", "exitTimeout", a.title + " " + a.subtitle]),
            a.render()
          }, 3e5)
      }
    })
}
(window, window.document, window.ptv || (window.ptv = {})), function (a, b, c) {
  c.Views.Tweet = Backbone.View.extend({
      el : ".js-ptv-Tweet",
      events : {
        "click .js-ptv-Tweet-filter" : "clickFilter"
      },
      initialize : function () {
        _.bindAll(this, "changeChannel"),
        this.currentEl = void 0,
        this.context = void 0,
        this.listenTo(c.Views.Instances.LivetweetFilter, "change:alias", this.changeChannel),
        this.$list = this.$(".js-ptv-Tweet-list"),
        this.$filters = this.$(".js-ptv-Tweet-filter"),
        "#trending" === window.location.hash && (this.$currentEl = this.$(".js-ptv-Tweet-filter.hot-tweets"), this.manageFilter())
      },
      changeChannel : function (a) {
        livetweet.empty(),
        "undefined" != typeof a ? this.$list.attr("data-channel-alias", a) : this.$list.removeAttr("data-channel-alias")
      },
      clickFilter : function (a) {
        a.preventDefault(),
        this.currentEl = a.currentTarget,
        this.$currentEl = $(this.currentEl),
        this.manageFilter(),
        c.Views.Instances.LivetweetFilter.manageTitles(),
        c.Views.Instances.LivetweetFilter.manageLink();
        var b = this.$currentEl.attr("data-event-tracker");
        "undefined" != typeof b && tracking.events(b.split("-"))
      },
      manageFilter : function () {
        var a = this.$currentEl.attr("href");
        this.context = "#trending" === a ? "trending" : void 0,
        window.location.hash = a,
        this.changeFilterStatus(),
        livetweet.empty(),
        this.changeListFilter(this.context),
        livetweet.update()
      },
      changeListFilter : function (a) {
        "trending" === a ? this.$list.attr("data-context", "trending") : this.$list.removeAttr("data-context")
      },
      changeFilterStatus : function () {
        this.$filters.removeClass("is-active"),
        this.$currentEl.addClass("is-active")
      },
      getContext : function () {
        return "undefined" != typeof this.context ? this.context : this.$list.attr("data-context")
      }
    })
}
(window, window.document, window.ptv || (window.ptv = {})), function (a, b, c) {
  var d = $(b),
  e = new UAParser,
  f = e.getResult(),
  g = f.browser.name.replace(/\s+/g, "-").toLowerCase() + " " + f.os.name.replace(/\s+/g, "-").toLowerCase();
  $("html").addClass(g),
  d.ready(function () {
    c.Clock.setDelta(),
    c.Routers.Instances.Router = new c.Routers.Router,
    Backbone.history.start({
      pushState : !0,
      hashChange : !1
    })
  })
}
(window, window.document, window.ptv || (window.ptv = {}));
//# sourceMappingURL=/assets/scripts/main.1390496945865.js.map
