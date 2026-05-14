// cart-page.js — render cart items with qty controls + remove.

(function () {
  "use strict";

  function render() {
    const root = document.querySelector("[data-slot='cart']");
    if (!root) return;

    const items = window.STRAND_CART.detailedItems();

    if (items.length === 0) {
      root.innerHTML = `
        <div class="cart-empty">
          <p>Your bag is empty.</p>
          <a class="btn btn--primary" href="search.html" style="margin-top:24px;">
            Continue Shopping
          </a>
        </div>`;
      return;
    }

    const itemsHTML = items.map(it => `
      <div class="cart-item" data-cart-row="${it.id}">
        <div class="cart-item__media">
          <img src="${it.image}" alt="${it.name}">
        </div>
        <div class="cart-item__body">
          <div class="cart-item__name">${it.name}</div>
          <div class="cart-item__price">$${it.price}</div>
          <div class="cart-item__qty">
            <button class="qty-btn" type="button"
                    data-qty-dec aria-label="Decrease quantity">−</button>
            <span data-qty-val>${it.qty}</span>
            <button class="qty-btn" type="button"
                    data-qty-inc aria-label="Increase quantity">+</button>
          </div>
          <button class="cart-item__remove" type="button" data-remove>remove</button>
        </div>
      </div>
    `).join("");

    const subtotal = window.STRAND_CART.subtotal();

    root.innerHTML = `
      <div class="cart-list">${itemsHTML}</div>
      <div class="cart-summary">
        <div class="cart-summary__label">summary</div>
        <div class="cart-summary__total">Subtotal <strong>$${subtotal}</strong></div>
        <a class="btn btn--primary btn--lg" href="payment.html">check out</a>
      </div>
    `;

    bindRowEvents(root);
  }

  function bindRowEvents(root) {
    root.querySelectorAll("[data-cart-row]").forEach(row => {
      const id = row.getAttribute("data-cart-row");

      row.querySelector("[data-qty-inc]").addEventListener("click", function () {
        const current = window.STRAND_CART.detailedItems().find(i => i.id === id);
        if (!current) return;
        window.STRAND_CART.setQty(id, current.qty + 1);
        render();
      });

      row.querySelector("[data-qty-dec]").addEventListener("click", function () {
        const current = window.STRAND_CART.detailedItems().find(i => i.id === id);
        if (!current) return;
        window.STRAND_CART.setQty(id, current.qty - 1);
        render();
      });

      row.querySelector("[data-remove]").addEventListener("click", function () {
        window.STRAND_CART.remove(id);
        render();
      });
    });
  }

  document.addEventListener("DOMContentLoaded", render);
})();
