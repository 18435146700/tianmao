;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-liebiao" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M968.687616 71.903232l-625.152 0c-31.38048 0-56.839168 25.458688-56.839168 56.839168l0 28.419072c0 31.379456 25.458688 56.838144 56.839168 56.838144l625.152 0c31.378432 0 56.838144-25.459712 56.838144-56.838144l0-28.419072C1025.52576 97.36192 1000.065024 71.903232 968.687616 71.903232zM968.687616 441.280512l-625.152 0c-31.38048 0-56.839168 25.458688-56.839168 56.838144l0 28.419072c0 31.38048 25.458688 56.838144 56.839168 56.838144l625.152 0c31.378432 0 56.838144-25.457664 56.838144-56.838144l0-28.419072C1025.52576 466.7392 1000.065024 441.280512 968.687616 441.280512zM968.687616 810.732544l-625.152 0c-31.38048 0-56.839168 25.4208-56.839168 56.80128l0 28.419072c0 31.418368 25.458688 56.839168 56.839168 56.839168l625.152 0c31.378432 0 56.838144-25.4208 56.838144-56.839168l0-28.419072C1025.52576 836.153344 1000.065024 810.732544 968.687616 810.732544zM87.79776 71.903232 59.377664 71.903232c-31.379456 0-56.80128 25.458688-56.80128 56.839168l0 28.419072c0 31.379456 25.422848 56.838144 56.80128 56.838144l28.419072 0c31.38048 0 56.838144-25.459712 56.838144-56.838144l0-28.419072C144.635904 97.36192 119.177216 71.903232 87.79776 71.903232zM87.79776 810.732544 59.377664 810.732544c-31.379456 0-56.80128 25.4208-56.80128 56.80128l0 28.419072c0 31.418368 25.422848 56.839168 56.80128 56.839168l28.419072 0c31.38048 0 56.838144-25.4208 56.838144-56.839168l0-28.419072C144.635904 836.153344 119.177216 810.732544 87.79776 810.732544zM87.79776 441.280512 59.377664 441.280512c-31.379456 0-56.80128 25.458688-56.80128 56.838144l0 28.419072c0 31.38048 25.422848 56.838144 56.80128 56.838144l28.419072 0c31.38048 0 56.838144-25.457664 56.838144-56.838144l0-28.419072C144.635904 466.7392 119.177216 441.280512 87.79776 441.280512z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)