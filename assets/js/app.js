// =========================================
// Global glue:
//  - Inject the shared header & footer.
//  - Keep the cart badge in sync with state.
//  - Tiny toast helper used by other pages.
// =========================================

(function () {
  "use strict";

  const HEADER_HTML = `
    <div class="promo-strip">New season essentials now online</div>
    <header class="site-header" role="banner">
      <div class="site-header__inner">
        <div class="site-header__left">
          <button class="icon-btn" type="button" aria-label="Open menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="1.6" stroke-linecap="round">
              <line x1="4"  y1="7"  x2="20" y2="7"/>
              <line x1="4"  y1="12" x2="20" y2="12"/>
              <line x1="4"  y1="17" x2="20" y2="17"/>
            </svg>
          </button>
        </div>
        <a class="site-header__brand" href="index.html">STRAND</a>
        <div class="site-header__right">
          <a class="icon-btn" href="search.html" aria-label="Search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="1.6" stroke-linecap="round">
              <circle cx="11" cy="11" r="7"/>
              <line x1="16.5" y1="16.5" x2="21" y2="21"/>
            </svg>
          </a>
          <a class="icon-btn" href="cart.html" aria-label="Shopping bag">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 8h12l-1 12H7L6 8z"/>
              <path d="M9 8a3 3 0 1 1 6 0"/>
            </svg>
            <span class="cart-badge" data-cart-badge>0</span>
          </a>
        </div>
      </div>
    </header>
  `;

  const FOOTER_HTML = `
    <footer class="site-footer" role="contentinfo">
      <div class="site-footer__pills">
        <span>Free shipping</span>
        <span>Easy returns</span>
        <span>New season styles</span>
      </div>
    </footer>
  `;

  function mountChrome() {
    const headerSlot = document.querySelector("[data-slot='header']");
    const footerSlot = document.querySelector("[data-slot='footer']");
    if (headerSlot) headerSlot.outerHTML = HEADER_HTML;
    if (footerSlot) footerSlot.outerHTML = FOOTER_HTML;
  }

  function refreshCartBadge() {
    const badge = document.querySelector("[data-cart-badge]");
    if (!badge) return;
    const count = window.STRAND_CART.itemCount();
    badge.textContent = String(count);
    badge.classList.toggle("is-visible", count > 0);
  }

  // ---------- Toast ----------
  let toastTimer = null;
  function toast(message) {
    let el = document.querySelector(".toast");
    if (!el) {
      el = document.createElement("div");
      el.className = "toast";
      document.body.appendChild(el);
    }
    el.textContent = message;
    requestAnimationFrame(() => el.classList.add("is-visible"));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("is-visible"), 1800);
  }

  // ---------- Money helper ----------
  function formatMoney(n) {
    return "$" + Number(n).toFixed(0);
  }

  function wireBackLinks() {
    document.querySelectorAll(".back-link").forEach(function (link) {
      link.addEventListener("click", function (e) {
        // Prefer real browser history; fall back to the hard-coded
        // href when the page was opened directly (no history to go to).
        if (window.history.length > 1) {
          e.preventDefault();
          window.history.back();
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    mountChrome();
    wireBackLinks();
    refreshCartBadge();
    window.STRAND_CART.subscribe(refreshCartBadge);
  });

  // Expose helpers on a single namespace.
  window.STRAND_APP = {
    toast: toast,
    formatMoney: formatMoney
  };
})();
