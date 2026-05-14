// confirm.js — show the order number persisted by payment.js.

(function () {
  "use strict";
  document.addEventListener("DOMContentLoaded", function () {
    const slot = document.querySelector("[data-slot='order-no']");
    if (!slot) return;
    const stored = sessionStorage.getItem("strand_last_order");
    // Fallback to the A2 mock number if someone navigates here directly.
    const orderNo = stored || "20481";
    slot.textContent = "Order #" + orderNo;
  });
})();
