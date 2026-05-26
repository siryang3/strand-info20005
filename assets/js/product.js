// product.js — product detail page: gallery, colour swatches, Add to Bag.

(function () {
  "use strict";

  function currentProduct() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id") || "everyday-tote"; // default fallback
    return window.STRAND_DATA.findById(id);
  }

  function render() {
    const product = currentProduct();
    const root = document.querySelector("[data-slot='product']");
    if (!product) {
      root.innerHTML = `<p class="search-empty">Product not found.</p>`;
      return;
    }

    const catName = (window.STRAND_DATA.CATEGORIES.find(c => c.id === product.category) || {}).name || "";

    root.innerHTML = `
      <div class="product-gallery">
        <div class="product-gallery__main">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-gallery__swatches" role="radiogroup" aria-label="Colour">
          ${product.colors.map((c, i) => `
            <button class="swatch ${i === 0 ? "is-active" : ""}"
                    type="button"
                    role="radio"
                    aria-checked="${i === 0}"
                    data-swatch="${c.name}"
                    style="background:${c.hex};"
                    title="${c.name}">
              <span class="sr-only">${c.name}</span>
            </button>
          `).join("")}
        </div>
      </div>
      <div class="product-info">
        <div class="product-info__breadcrumb">${catName} · ${product.colors.length} colour(s)</div>
        <h1 class="product-info__name">${product.name}</h1>
        <div class="product-info__price">$${product.price}</div>
        <p class="product-info__desc">${product.description}</p>
        ${product.specs ? `
          <dl class="product-specs">
            ${Object.keys(product.specs).map(k => `
              <div class="product-specs__row">
                <dt>${k}</dt><dd>${product.specs[k]}</dd>
              </div>
            `).join("")}
          </dl>
        ` : ""}
        <button class="btn btn--primary btn--block btn--lg" type="button" data-add-to-bag>
          Add to Bag
        </button>
        <p class="product-info__meta">Free shipping over $100  ·  Easy returns</p>
      </div>
    `;

    // Bind swatches
    const swatches = root.querySelectorAll(".swatch");
    swatches.forEach(sw => sw.addEventListener("click", function () {
      swatches.forEach(s => {
        s.classList.remove("is-active");
        s.setAttribute("aria-checked", "false");
      });
      sw.classList.add("is-active");
      sw.setAttribute("aria-checked", "true");
    }));

    // Bind Add to Bag
    const addBtn = root.querySelector("[data-add-to-bag]");
    if (addBtn) {
      let resetTimer = null;
      addBtn.addEventListener("click", function () {
        // Guard against rapid double-tap during the 1.2s feedback window
        if (addBtn.disabled) return;
        addBtn.disabled = true;

        window.STRAND_CART.add(product.id, 1);
        window.STRAND_APP.toast(`Added "${product.name}" to bag`);

        addBtn.classList.add("btn--added");
        addBtn.textContent = "Added ✓";
        clearTimeout(resetTimer);
        resetTimer = setTimeout(function () {
          addBtn.classList.remove("btn--added");
          addBtn.textContent = "Add to Bag";
          addBtn.disabled = false;
        }, 1200);
      });
    }
  }

  document.addEventListener("DOMContentLoaded", render);
})();
