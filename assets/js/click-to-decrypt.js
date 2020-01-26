"use strict";

var ClickToDecrypt = (function() {
  var api = {};

  //storage functions, you can modify these to use localStorage, sessionStorage or cookies
  var storage = {
    put: function(key, value) {
      localStorage.setItem(key, value);
    },
    get: function(key) {//return undefined if it gets {key: "none"}
      return key == 'none' ? undefined : localStorage.getItem(key);
    },
    clear: function(){
      localStorage.clear();
    }
  };

  function getAttributeOrDefault(elem, attr, defaultValue) {
    var tmp = elem.getAttribute(attr);
    return tmp ? tmp : defaultValue;
  }

  function tryDecrypt(pwd, ciphertext) {
    var ret = undefined;
    try {
      ret = sjcl.decrypt(pwd, ciphertext);
    } catch (err) {}
    return ret;
  }


  function findPasswordForElement(e, tries) {
    var ciphertext = e.getAttribute("data-encrypted");
    if (!ciphertext) {
      console.log("Warning: Missing 'data-encrypted' attribute");
      return undefined;
    }
    ciphertext = window.atob(ciphertext)

    var passwordCookie = getAttributeOrDefault(e, "data-pwd-cookie", "none");

    return findPasswordFor(ciphertext, "", passwordCookie, tries);
  }

  function findPasswordFor(ciphertext, passwordGuess, passwordCookie, tries, promptText = "Password") {
    var cookiePwd = storage.get(passwordCookie);
    if (tryDecrypt(cookiePwd, ciphertext)) {
      return cookiePwd;
    } else if (tryDecrypt(passwordGuess, ciphertext)) {
      return passwordGuess;
    } else {
      tries = tries == -1 ? api.passwordTries : tries;

      for (var i = 0; i < tries; i++) {
        var pwd = prompt(promptText);
        if (!pwd) {
          break; //user pressed cancel
        }
        if (tryDecrypt(pwd, ciphertext)) {
          return pwd;
        }
      }
    }
    return undefined;
  }

  //the real code that does stuff
  function decryptElement(elem, password) {
    try {
      var replaceScope = getAttributeOrDefault(elem, "data-replace-scope", "inner")
        .trim().toLowerCase(); //make it easy to compare
      var ciphertext = elem.getAttribute("data-encrypted");

      if (ciphertext) {
        var plainText = tryDecrypt(password, window.atob(ciphertext));
        if (plainText) {
          if (api.useStorage == true) {
            var passwordCookie = getAttributeOrDefault(elem, "data-pwd-cookie", "none");
            if (passwordCookie !== "none") {
              storage.put(passwordCookie, password);
            }
          }

          if (replaceScope === "outer") {
            try {
              elem.outerHTML = plainText;
            } catch (err) {
              console.log('[click-to-decrypt] Outer replace failed!');
              elem.innerHTML = plainText; //fallback
            }
          } else { //inner is the default case
            elem.innerHTML = plainText;
          }
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  var api = {
    useStorage: true,
    passwordTries: 3,

    byClass: function(matchClass, tries = -1) {
      var list = document.getElementsByClassName(matchClass);
      if (list.length > 0) {
        var pwd = findPasswordForElement(list[0], tries);
        for (var i = 0; i < list.length; i++) {
          decryptElement(list[i], pwd);
        }
      }
    },

    byId: function(elemId, tries = -1) {
      api.element(document.getElementById(elemId), tries);
    },

    element: function(elem, tries = -1) {
      decryptElement(elem, findPasswordForElement(elem, tries));
    },

    putDefaultPassword: function(key, value) {
      if (!storage.get(key)){
        storage.put(key, value);
      }
    },

    forgetAllPasswords: function() {
      storage.clear();
    }
  };
  return api;
}());
