// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"redditapi.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  search: function search(searchTerm, searchLimit, sortBy) {
    return fetch("http://www.reddit.com/search.json?q=".concat(searchTerm, "&sort=").concat(sortBy, "&limit=").concat(searchLimit)).then(function (res) {
      return res.json();
    }).then(function (data) {
      return data.data.children.map(function (data) {
        return data.data;
      });
    }).catch(function (err) {
      return console.log(err);
    });
  }
};
exports.default = _default;
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _redditapi = _interopRequireDefault(require("./redditapi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var searchForm = document.getElementById('search-form');
var searchInput = document.getElementById('search-input');
searchForm.addEventListener('submit', function (e) {
  // Get search term
  var searchTerm = searchInput.value; // Get sort

  var sortBy = document.querySelector('input[name="sortby"]:checked').value; // Get limit

  var searchLimit = document.getElementById('limit').value; // Input validation

  if (searchTerm === '') {
    // Show a message
    showMessage('Please add a search term', 'alert-danger'); // Takes the message + class
  } // Search Reddit


  _redditapi.default.search(searchTerm, searchLimit, sortBy).then(function (results) {
    var output = '<div class="card-columns">'; // Loop through posts

    results.forEach(function (post) {
      // Check for image 
      var image = post.preview ? post.preview.images[0].source.url : 'data:image/png;base64,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';
      output += "\n\t\t\t\t<div class=\"card\">\n\t\t\t\t  <a target=\"_blank\" href=\"".concat(post.url, "\"><img src=\"").concat(image, "\" class=\"card-img-top\" alt=\"...\"></a>\n\t\t\t\t  <div class=\"card-body\">\n\t\t\t\t    <h5 class=\"card-title\">").concat(post.title, "</h5>\n\t\t\t\t    <p class=\"card-text\">").concat(truncateText(post.selftext, 100), "</p>\n\t\t\t\t    <a target=\"_blank\" href=\"").concat(post.url, "\" class=\"btn btn-sm\" style=\"background-color: #FF5700; color:white;\">Read More...</a>\n\t\t\t\t    <hr>\n\t\t\t\t    <span class=\"badge badge-secondary\">Subreddit: <a target=\"_blank\" href=\"https://reddit.com/r/").concat(post.subreddit, "\">").concat(post.subreddit, "</a></span>\n\t\t\t\t    <span class=\"badge badge-dark\">Score: ").concat(post.score, "</span>\n\t\t\t\t  </div>\n\t\t\t\t</div>\n\t\t\t");
    });
    output += '</div>';
    document.getElementById('results').innerHTML = output;
  });

  e.preventDefault();
});

function showMessage(message, className) {
  // Create the div
  var div = document.createElement('div'); // Add class

  div.className = "alert ".concat(className); // Add text

  div.appendChild(document.createTextNode(message)); // Get parent container 

  var searchContainer = document.getElementById('search-container'); // Get search 

  var search = document.getElementById('search'); // Insert 

  searchContainer.insertBefore(div, search); // Timeout alert

  setTimeout(function () {
    return document.querySelector('.alert').remove();
  }, 3000);
}

function truncateText(text, limit) {
  var shortened = text.indexOf(' ', limit);

  if (shortened == -1) {
    return text;
  }

  return text.substring(0, shortened);
}
},{"./redditapi":"redditapi.js"}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55290" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/Findit.e31bb0bc.js.map