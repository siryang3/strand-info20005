// =========================================
// Cart state. Persisted in localStorage so
// items survive page navigation.
// Shape: [{ id, qty }]
// =========================================

window.STRAND_CART = (function () {
  "use strict";

  const KEY = "strand_cart_v1";

  function read() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      return [];
    }
  }

  function write(items) {
    localStorage.setItem(KEY, JSON.stringify(items));
    notify();
  }

  function add(id, qty) {
    qty = qty || 1;
    const items = read();
    const existing = items.find(it => it.id === id);
    if (existing) {
      existing.qty += qty;
    } else {
      items.push({ id: id, qty: qty });
    }
    write(items);
  }

  function setQty(id, qty) {
    const items = read();
    const target = items.find(it => it.id === id);
    if (!target) return;
    if (qty <= 0) {
      remove(id);
      return;
    }
    target.qty = qty;
    write(items);
  }

  function remove(id) {
    const items = read().filter(it => it.id !== id);
    write(items);
  }

  function clear() {
    localStorage.removeItem(KEY);
    notify();
  }

  function itemCount() {
    return read().reduce((sum, it) => sum + it.qty, 0);
  }

  function detailedItems() {
    const data = window.STRAND_DATA;
    return read()
      .map(line => {
        const product = data.findById(line.id);
        if (!product) return null;
        return {
          id:       product.id,
          name:     product.name,
          price:    product.price,
          image:    product.image,
          qty:      line.qty,
          subtotal: product.price * line.qty
        };
      })
      .filter(Boolean);
  }

  function subtotal() {
    return detailedItems().reduce((sum, it) => sum + it.subtotal, 0);
  }

  // Pub/sub so the header badge can re-render after any mutation.
  const listeners = [];
  function subscribe(fn) {
    listeners.push(fn);
    return () => {
      const idx = listeners.indexOf(fn);
      if (idx >= 0) listeners.splice(idx, 1);
    };
  }
  function notify() {
    listeners.forEach(fn => {
      try { fn(); } catch (e) { /* ignore */ }
    });
  }

  // Cross-tab sync: if another tab changes the cart, refresh listeners here.
  window.addEventListener("storage", function (e) {
    if (e.key === KEY) notify();
  });

  return {
    add,
    setQty,
    remove,
    clear,
    read,
    itemCount,
    detailedItems,
    subtotal,
    subscribe
  };
})();
