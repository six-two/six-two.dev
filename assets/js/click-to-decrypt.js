"use strict";

var ClickToDecrypt = (function() {
  var api = {};

  // Storage functions. You can modify these to use localStorage, sessionStorage, cookies
  // or whatever technologies will be invented in the future
  var my_storage_implementation = {
    put: function(key, value) {
      localStorage.setItem(key, value);
    },
    get: function(key) {
      return localStorage.getItem(key);
    },
    clear: function(){
      localStorage.clear();
    }
  };

  function getAttributeOr(elem, attr, defaultValue) {
    var tmp = elem.getAttribute(attr);
    return tmp ? tmp : defaultValue;
  }

  function decrypt(ciphertext, cookieName, promptText, maxTries) {
    if (cookieName) {
      // Try the password stored in the cookie cookie.
      // The method is called with cookieName=null, since the cookie does not need to be updated
      var plaintext = tryDecrypt(ciphertext, api.storage.get(cookieName), null);
      if (plaintext) {
        return plaintext;
      }
    }
    // Let the user try up to maxTries passwords
    for (var i = 0; i < maxTries; i++) {
      // Get a password from the user
      var pwd = prompt(promptText);
      if (!pwd) {
        // The user pressed cancel
        return null;
      }
      // Try the user supplied password, update the cookie on success
      var plaintext = tryDecrypt(ciphertext, pwd, cookieName);
      if (plaintext) {
        return plaintext;
      }
    }
    // The user cound not guess the password
    return null;
  }


  function tryDecrypt(ciphertext, pwd, cookieName) {
    try {
      // Try to decrypt
      var plaintext = sjcl.decrypt(pwd, ciphertext);
      if (plaintext) {
        // Update the cookie if a name was supplied
        if (cookieName) {
          api.storage.put(cookieName, pwd)
        }
        return plaintext
      }
    } catch (err) {
    }
    // Inform the caller, that the decryption failed
    return null;
  }

  function internalDecryptClass(className) {
    var list = document.getElementsByClassName(className);
    list = Array.from(list);
    console.debug(`Decrypting ${list.length} elements with class "${className}"`);

    while (list.length > 0) {
      // remove and return first element
      var e = list.shift();

      // decrypt the element. Exit this method if the decryption failed
      // (for example because it was cancelled by the user)
      if (!internalDecryptElement(e)) {
        console.warn(`Failed element decryption. The other ${list.length} remaining elements will not be decrypted`);
        return;
      }
    }
  }

  function internalDecryptElement(e) {
    var enc_data = e.getAttribute("ctd-data");
    if (!enc_data) {
      console.error("No data to decrypt");
    } else {
      // Load all the required data from the elements attributes
      var ciphertext = window.atob(enc_data);
      var cookieName = getAttributeOr(e, "ctd-cookie", null);
      var promptText = getAttributeOr(e, "ctd-prompt", api.defaultPrompt);
      var maxTries = getAttributeOr(e, "ctd-tries", api.defaultTries);

      var plaintext = decrypt(ciphertext, cookieName, promptText, maxTries);
      if (plaintext) {
        try {
          e.outerHTML = plaintext;
        } catch (err) {
          console.error("Failed replacing the elements outer HTML. Cause:", err)
        }
      }
    }
  }


  var api = {
    // Data
    storage: my_storage_implementation,
    defaultTries: 3,
    defaultPrompt: 'Password:',

    // Functions
    decryptClass: internalDecryptClass,
    decryptElement: internalDecryptElement,
    decryptId: function(elemId) {
      var e = document.getElementById(elemId)
      if (e) {
        internalDecryptElement(document.getElementById(elemId));
      } else {
        console.error(`No element with id "${elemId}"`)
      }
    },
    forgetAllPasswords: function() {
      storage.clear();
    }
  };
  return api;
}());
