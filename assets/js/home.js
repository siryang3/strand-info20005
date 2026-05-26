// home.js — populate New Arrivals grid on the home page.

(function () {
  "use strict";

  function renderNewArrivals() {
    const slot = document.querySelector("[data-slot='new-arrivals']");
    if (!slot) return;

    const newOnes = window.STRAND_DATA.PRODUCTS.filter(p =>
      (p.tags || []).includes("new")
    );

    slot.innerHTML = newOnes.map(p => `
      <a class="product-card" href="product.html?id=${p.id}">
        <div class="product-card__media">
          <img src="${p.image}" alt="${p.name}" loading="lazy">
        </div>
        <div class="product-card__body">
          <div class="product-card__row">
            <span class="product-card__name">${p.name}</span>
            <span class="product-card__price">$${p.price}</span>
          </div>
          <span class="product-card__cta">View</span>
        </div>
      </a>
    `).join("");
  }

  function renderCategoryTiles() {
    const slot = document.querySelector("[data-slot='categories']");
    if (!slot) return;
    slot.innerHTML = window.STRAND_DATA.CATEGORIES.map(c => {
      const count = window.STRAND_DATA.listByCategory(c.id).length;
      return `
        <a class="cat-tile" href="search.html?cat=${c.id}">
          ${c.name}
          <span class="cat-tile__count">${count} item${count === 1 ? "" : "s"}</span>
        </a>
      `;
    }).join("");
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderCategoryTiles();
    renderNewArrivals();
  });
})();
