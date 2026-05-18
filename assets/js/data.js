// =========================================
// data.js — product catalogue.
// All products live as plain JS objects so the
// site stays 100% client-side (no backend needed,
// per A3 "Vanilla only" rule).
// =========================================

window.STRAND_DATA = (function () {
  "use strict";

  const CATEGORIES = [
    { id: "bags",        name: "Bags"        },
    { id: "wallets",     name: "Wallets"     },
    { id: "accessories", name: "Accessories" },
    { id: "sale",        name: "Sale"        }
  ];

  // Colour palettes reused on the Product Detail page.
  const PALETTE_TOTE = [
    { name: "Cream",     hex: "#F0E8DA" },
    { name: "Mustard",   hex: "#D2A24C" },
    { name: "Tangerine", hex: "#D45A3A" },
    { name: "Blush",     hex: "#E5B8BE" },
    { name: "Mint",      hex: "#5DC9B0" },
    { name: "Olive",     hex: "#8A8654" }
  ];

  const PRODUCTS = [
    {
      id:       "everyday-tote",
      name:     "Everyday Tote",
      category: "bags",
      price:    129,
      image:    "assets/img/everyday-tote-mint.png",
      description:
        "A structured everyday tote designed for work, travel, and daily essentials. " +
        "Soft canvas exterior with a roomy interior pocket and reinforced handles.",
      colors:   PALETTE_TOTE,
      specs: {
        Material:   "Cotton canvas with leather trim",
        Dimensions: "38 × 32 × 12 cm",
        Care:       "Spot clean with a damp cloth"
      },
      tags:     ["new", "tote", "everyday"]
    },
    {
      id:       "mini-crossbody",
      name:     "Mini Crossbody",
      category: "bags",
      price:    99,
      image:    "assets/img/mini-crossbody-brown.png",
      description:
        "A compact crossbody in soft full-grain leather. Adjustable strap and " +
        "magnetic closure — fits a phone, cards and lipstick.",
      colors: [
        { name: "Tan",   hex: "#8C5A3C" },
        { name: "Black", hex: "#1A1A1A" }
      ],
      specs: {
        Material:   "Full-grain leather",
        Dimensions: "18 × 12 × 5 cm",
        Care:       "Condition with leather balm"
      },
      tags: ["new", "crossbody"]
    },
    {
      id:       "pokemon-tote",
      name:     "Limited Edition Tote",
      category: "bags",
      price:    189,
      image:    "assets/img/pokemon-tote-hero.png",
      description:
        "A playful capsule collaboration. Hand-finished leather body with embroidered " +
        "character patches and a detachable charm.",
      colors: [
        { name: "Caramel", hex: "#B07A4D" }
      ],
      specs: {
        Material:   "Hand-finished leather, embroidered patches",
        Dimensions: "34 × 28 × 14 cm",
        Care:       "Keep dry; wipe with a soft cloth"
      },
      tags: ["limited", "featured"]
    },
    {
      id:       "soft-leather-wallet",
      name:     "Soft Leather Wallet",
      category: "wallets",
      price:    129,
      image:    "assets/img/soft-leather-wallet.png",
      description:
        "Long bi-fold wallet in supple leather. Six card slots, two note " +
        "compartments and a hidden zip pocket.",
      colors: [
        { name: "Teal",  hex: "#3E8E80" },
        { name: "Blush", hex: "#D78B85" }
      ],
      specs: {
        Material:   "Supple cow leather",
        Dimensions: "19 × 10 × 2 cm",
        Care:       "Avoid prolonged moisture"
      },
      tags: ["wallet"]
    },
    {
      id:       "charm-loop",
      name:     "Charm Loop",
      category: "accessories",
      price:    39,
      image:    "assets/img/charm-loop-pink.png",
      description:
        "Leather key loop with a brass heart charm. Clip it onto a bag handle or " +
        "use it as a standalone keyring.",
      colors: [
        { name: "Pink",  hex: "#D78B85" },
        { name: "Black", hex: "#1A1A1A" },
        { name: "Tan",   hex: "#B07A4D" }
      ],
      specs: {
        Material:   "Leather strap, brass charm",
        Dimensions: "11 cm drop",
        Care:       "Polish brass with a dry cloth"
      },
      tags: ["accessory", "gift"]
    },
    {
      id:       "candy-novelty",
      name:     "Monster Candy Tin",
      category: "sale",
      price:    12,
      originalPrice: 18,
      image:    "assets/img/monster-candy.png",
      description:
        "A limited novelty tin of assorted candy swirls. A playful add-on at the " +
        "register — perfect for gifting.",
      colors: [
        { name: "Original", hex: "#E0413B" }
      ],
      specs: {
        Material:   "Assorted candy, tin packaging",
        Dimensions: "10 × 6 × 6 cm",
        Care:       "Store in a cool, dry place"
      },
      tags: ["sale", "gift"]
    }
  ];

  function findById(id) {
    return PRODUCTS.find(p => p.id === id) || null;
  }

  function listByCategory(catId) {
    if (!catId) return PRODUCTS.slice();
    return PRODUCTS.filter(p => p.category === catId);
  }

  function search(query) {
    if (!query) return PRODUCTS.slice();
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.tags || []).some(t => t.toLowerCase().includes(q))
    );
  }

  return { CATEGORIES, PRODUCTS, findById, listByCategory, search };
})();
