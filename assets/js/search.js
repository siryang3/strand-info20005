// search.js — search results page (filter + sort).

(function () {
  "use strict";

  // Page state
  const state = {
    query:  "",
    cat:    "",      // category filter
    sort:   "default"  // default | price-asc | price-desc | name
  };

  function getQS() {
    const params = new URLSearchParams(window.location.search);
    state.query = params.get("q")   || "";
    state.cat   = params.get("cat") || "";
  }

  function applyFilters() {
    let list = window.STRAND_DATA.PRODUCTS.slice();

    if (state.cat) {
      list = list.filter(p => p.category === state.cat);
    }
    if (state.query) {
      const q = state.query.trim().toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.tags || []).some(t => t.toLowerCase().includes(q))
      );
    }

    if (state.sort === "price-asc")  list.sort((a, b) => a.price - b.price);
    if (state.sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (state.sort === "name")       list.sort((a, b) => a.name.localeCompare(b.name));

    return list;
  }

  function render() {
    // Header summary
    const subEl = document.querySelector("[data-slot='search-sub']");
    const countEl = document.querySelector("[data-slot='search-count']");
    if (subEl) {
      const cat = window.STRAND_DATA.CATEGORIES.find(c => c.id === state.cat);
      subEl.textContent = cat ? cat.name : (state.query ? `"${state.query}"` : "All items");
    }

    const list = applyFilters();
    if (countEl) countEl.textContent = `${list.length} items`;

    const grid = document.querySelector("[data-slot='search-results']");
    if (!grid) return;

    if (list.length === 0) {
      grid.innerHTML = `<div class="search-empty">No products match your search.</div>`;
      return;
    }

    grid.innerHTML = list.map(p => `
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

    // Reflect query in input + URL (no full reload).
    const searchInput = document.querySelector("[data-search-input]");
    if (searchInput) searchInput.value = state.query;
  }

  function bindEvents() {
    const input = document.querySelector("[data-search-input]");
    if (input) {
      input.addEventListener("input", function (e) {
        state.query = e.target.value;
        render();
      });
    }

    document.querySelectorAll("[data-sort]").forEach(btn => {
      btn.addEventListener("click", function () {
        // Cycle through sort options when user clicks "Sort"
        const order = ["default", "price-asc", "price-desc", "name"];
        const i = order.indexOf(state.sort);
        state.sort = order[(i + 1) % order.length];
        btn.textContent = labelFor(state.sort);
        render();
      });
    });

    document.querySelectorAll("[data-filter]").forEach(btn => {
      btn.addEventListener("click", function () {
        // Cycle category filter
        const cats = ["", "bags", "wallets", "accessories", "sale"];
        const i = cats.indexOf(state.cat);
        state.cat = cats[(i + 1) % cats.length];
        btn.textContent = state.cat
          ? "Filter: " + capitalise(state.cat)
          : "Filter";
        render();
      });
    });
  }

  function labelFor(sort) {
    switch (sort) {
      case "price-asc":  return "Sort: $ low→high";
      case "price-desc": return "Sort: $ high→low";
      case "name":       return "Sort: A–Z";
      default:           return "Sort";
    }
  }

  function capitalise(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  document.addEventListener("DOMContentLoaded", function () {
    getQS();
    bindEvents();
    render();
  });
})();
