// payment.js — checkout form validation + order placement.

(function () {
  "use strict";

  // ---------- Validators ----------
  function notEmpty(v) {
    return typeof v === "string" && v.trim().length > 0;
  }
  function isFullName(v) {
    // At least two words, only letters / spaces / hyphens / apostrophes
    return /^[A-Za-z][A-Za-z\s\-']{1,}\s+[A-Za-z][A-Za-z\s\-']{1,}$/.test(v.trim());
  }
  function isCardNumber(v) {
    const digits = v.replace(/[\s-]/g, "");
    return /^\d{13,19}$/.test(digits) && luhnCheck(digits);
  }
  function luhnCheck(digits) {
    let sum = 0;
    let alt = false;
    for (let i = digits.length - 1; i >= 0; i--) {
      let n = parseInt(digits.charAt(i), 10);
      if (alt) {
        n *= 2;
        if (n > 9) n -= 9;
      }
      sum += n;
      alt = !alt;
    }
    return sum % 10 === 0;
  }
  function isPostCode(v) {
    // Australian postcode: 4 digits.
    return /^\d{4}$/.test(v.trim());
  }

  const RULES = [
    { name: "fullName",   validate: isFullName,
      empty: "Please enter your full name.",
      bad:   "Please enter both first and last name (letters only)." },
    { name: "cardNumber", validate: isCardNumber,
      empty: "Please enter your card number.",
      bad:   "That card number doesn't look right." },
    { name: "address",    validate: notEmpty,
      empty: "Please choose a delivery option.",
      bad:   "Please choose a delivery option." },
    { name: "postCode",   validate: isPostCode,
      empty: "Please enter your postcode.",
      bad:   "Postcode must be 4 digits." }
  ];

  function getField(name) {
    return document.querySelector(`[name='${name}']`);
  }
  function getFieldEl(name) {
    return getField(name).closest(".field");
  }
  function getErrorEl(name) {
    return getFieldEl(name).querySelector(".field__error");
  }

  function showError(name, msg) {
    getFieldEl(name).classList.add("field--invalid");
    getErrorEl(name).textContent = msg;
  }
  function clearError(name) {
    getFieldEl(name).classList.remove("field--invalid");
    getErrorEl(name).textContent = "";
  }

  function validateAll() {
    let firstBadField = null;
    RULES.forEach(rule => {
      const el = getField(rule.name);
      if (!el) return;
      const val = el.value || "";
      if (!notEmpty(val)) {
        showError(rule.name, rule.empty);
        if (!firstBadField) firstBadField = el;
      } else if (!rule.validate(val)) {
        showError(rule.name, rule.bad);
        if (!firstBadField) firstBadField = el;
      } else {
        clearError(rule.name);
      }
    });
    return firstBadField;
  }

  function makeOrderNumber() {
    // 5-digit pseudo-random — good enough for a mock confirmation.
    return Math.floor(10000 + Math.random() * 90000);
  }

  function placeOrder() {
    if (window.STRAND_CART.itemCount() === 0) {
      window.STRAND_APP.toast("Your bag is empty.");
      window.location.href = "search.html";
      return;
    }
    const orderNo = makeOrderNumber();
    sessionStorage.setItem("strand_last_order", String(orderNo));
    window.STRAND_CART.clear();
    window.location.href = "confirm.html";
  }

  document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("[data-slot='payment-form']");
    if (!form) return;

    // Clear errors on input
    RULES.forEach(rule => {
      const el = getField(rule.name);
      if (!el) return;
      el.addEventListener("input",  () => clearError(rule.name));
      el.addEventListener("change", () => clearError(rule.name));
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const firstBad = validateAll();
      if (firstBad) {
        firstBad.focus();
        return;
      }
      placeOrder();
    });
  });
})();
