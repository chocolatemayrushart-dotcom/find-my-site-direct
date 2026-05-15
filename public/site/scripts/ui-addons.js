(function () {
  const CART_KEY = "perceptve_cart_v1";
  const POPUP_KEY = "perceptve_popup_seen_v1";

  const css = `
  .pv-overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:99998;display:none;align-items:center;justify-content:center;font-family:'Metropolis Regular',Arial,sans-serif;padding:12px;box-sizing:border-box}
  .pv-overlay.open{display:flex}
  .pv-modal{background:#fff;max-width:300px;width:100%;max-height:calc(100vh - 24px);overflow:auto;padding:18px 18px 14px;border-radius:4px;position:relative;text-align:center;box-sizing:border-box}
  .pv-close{position:absolute;top:6px;right:8px;background:none;border:0;font-size:18px;cursor:pointer;color:#000;line-height:1;padding:4px}
  .pv-modal h2{font-size:22px;margin:4px 0 2px;font-weight:800;letter-spacing:.5px;color:#000}
  .pv-modal p.sub{font-size:10px;letter-spacing:2px;color:#000;margin:0}
  .pv-modal p.sub2{font-size:10px;letter-spacing:2px;color:#000;margin:0 0 10px}
  .pv-phone{display:flex;align-items:center;width:100%;border:1px solid #000;border-radius:30px;padding:4px 12px;margin-bottom:8px;box-sizing:border-box;gap:6px}
  .pv-phone .pv-cc{display:flex;align-items:center;gap:4px;font-size:12px;color:#000;border-right:1px solid #ddd;padding-right:6px;flex-shrink:0}
  .pv-phone .pv-cc .pv-flag{width:18px;height:12px;background:linear-gradient(to bottom,#b22234 0 20%,#fff 20% 40%,#b22234 40% 60%,#fff 60% 80%,#b22234 80%);position:relative;border-radius:2px;overflow:hidden}
  .pv-phone .pv-cc .pv-flag::before{content:"";position:absolute;top:0;left:0;width:8px;height:7px;background:#3c3b6e}
  .pv-phone input{flex:1;border:0;padding:6px 2px;font-size:12px;outline:none;color:#000;background:transparent;min-width:0}
  .pv-phone input::placeholder{color:#666}
  .pv-modal .pv-disc{font-size:8px;color:#333;line-height:1.4;margin:0 0 8px;text-align:center}
  .pv-modal .pv-disc a{color:#000;text-decoration:underline;font-weight:600}
  .pv-btn{background:#000;color:#fff;border:0;border-radius:30px;padding:9px 18px;font-size:12px;cursor:pointer;width:100%;font-weight:600}
  .pv-btn small{display:block;font-size:9px;font-weight:400;opacity:.85;margin-top:1px}
  .pv-no{background:none;border:0;margin-top:6px;cursor:pointer;color:#000;font-size:11px;text-decoration:underline}
  .pv-logo{font-family:'Pinyon Script',cursive;font-size:32px;color:#000;line-height:1}
  .pv-success{color:#0a7d2c;font-size:12px;margin-top:8px}

  .pv-cart-overlay{position:fixed;inset:0;background:rgba(0,0,0,.4);z-index:99996;display:none}
  .pv-cart-overlay.open{display:block}
  .pv-cart{position:fixed;top:0;right:0;height:100vh;width:380px;max-width:100%;background:#fff;z-index:99997;transform:translateX(100%);transition:transform .3s ease;display:flex;flex-direction:column;font-family:'Metropolis Regular',Arial,sans-serif}
  .pv-cart.open{transform:translateX(0)}
  .pv-cart-head{display:flex;align-items:center;justify-content:space-between;padding:22px 24px;border-bottom:1px solid #eee}
  .pv-cart-head h3{margin:0;font-size:18px;font-weight:700;letter-spacing:1px;color:#000}
  .pv-cart-body{flex:1;overflow-y:auto;padding:18px 24px}
  .pv-cart-empty{text-align:center;color:#666;margin-top:40px;font-size:14px}
  .pv-line{display:flex;gap:14px;padding:14px 0;border-bottom:1px solid #f0f0f0}
  .pv-line img{width:70px;height:90px;object-fit:cover;background:#f5f5f5}
  .pv-line .info{flex:1;font-size:13px;color:#000}
  .pv-line .info .name{font-weight:700;text-transform:uppercase;font-size:12px}
  .pv-line .info .price{margin:4px 0 8px}
  .pv-qty{display:inline-flex;align-items:center;gap:10px}
  .pv-qty button{width:22px;height:22px;border:1px solid #ccc;background:#fff;cursor:pointer;border-radius:50%;line-height:1;color:#000}
  .pv-line .remove{background:none;border:0;text-decoration:underline;font-size:11px;cursor:pointer;padding:6px 0;color:#000;display:block;margin-top:6px;text-transform:uppercase;letter-spacing:1px}
  .pv-cart-foot{padding:20px 24px;border-top:1px solid #eee}
  .pv-total{display:flex;justify-content:space-between;font-weight:700;margin-bottom:14px;color:#000;letter-spacing:1px;font-size:14px}
  .pv-checkout{display:block;text-align:center;background:#000;color:#fff;padding:16px;text-decoration:none;font-weight:700;letter-spacing:2px;font-size:13px;border:0;width:100%;cursor:pointer}
  .pv-toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#000;color:#fff;padding:12px 22px;border-radius:30px;z-index:99999;font-size:13px;opacity:0;transition:opacity .3s;pointer-events:none;font-family:'Metropolis Regular',Arial,sans-serif}
  .pv-toast.show{opacity:1}
  `;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  // ---------- Cart ----------
  function readCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); } catch { return []; }
  }
  function writeCart(c) {
    localStorage.setItem(CART_KEY, JSON.stringify(c));
    updateCartCount();
  }
  function updateCartCount() {
    const cart = readCart();
    const n = cart.reduce((s, i) => s + i.qty, 0);
    document.querySelectorAll("[data-cart-count], .cart-count, .header-cart-count, a[href*='cart']").forEach(el => {
      const txt = el.textContent || "";
      if (/cart\s*\(\d+\)/i.test(txt)) {
        el.innerHTML = el.innerHTML.replace(/cart\s*\(\d+\)/i, "CART (" + n + ")");
      }
    });
  }

  const cartOverlay = document.createElement("div");
  cartOverlay.className = "pv-cart-overlay";
  const cartEl = document.createElement("aside");
  cartEl.className = "pv-cart";
  cartEl.innerHTML = `
    <div class="pv-cart-head"><h3>YOUR CART</h3><button class="pv-close" aria-label="Close">&times;</button></div>
    <div class="pv-cart-body"></div>
    <div class="pv-cart-foot">
      <div class="pv-total"><span>TOTAL:</span><span class="pv-total-val">$0.00 USD</span></div>
      <button class="pv-checkout">CHECKOUT</button>
    </div>`;
  document.body.appendChild(cartOverlay);
  document.body.appendChild(cartEl);

  function renderCart() {
    const cart = readCart();
    const body = cartEl.querySelector(".pv-cart-body");
    if (!cart.length) {
      body.innerHTML = '<p class="pv-cart-empty">Your cart is empty.</p>';
    } else {
      body.innerHTML = cart.map((i, idx) => `
        <div class="pv-line">
          ${i.img ? `<img src="${i.img}" alt="">` : ""}
          <div class="info">
            <div class="name">${i.name}${i.variant ? " - " + i.variant : ""}</div>
            <div class="price">$${i.price.toFixed(2)} USD</div>
            <div class="pv-qty">
              <button data-act="dec" data-i="${idx}">-</button>
              <span>${i.qty}</span>
              <button data-act="inc" data-i="${idx}">+</button>
            </div>
            <button class="remove" data-act="rem" data-i="${idx}">REMOVE</button>
          </div>
        </div>`).join("");
    }
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    cartEl.querySelector(".pv-total-val").textContent = "$" + total.toFixed(2) + " USD";
  }

  function openCart() { renderCart(); cartOverlay.classList.add("open"); cartEl.classList.add("open"); }
  function closeCart() { cartOverlay.classList.remove("open"); cartEl.classList.remove("open"); }

  cartOverlay.addEventListener("click", closeCart);
  cartEl.querySelector(".pv-close").addEventListener("click", closeCart);
  cartEl.querySelector(".pv-checkout").addEventListener("click", function () {
    if (!readCart().length) { toast("Your cart is empty"); return; }
    toast("Checkout coming soon");
  });
  cartEl.querySelector(".pv-cart-body").addEventListener("click", function (e) {
    const btn = e.target.closest("button[data-act]");
    if (!btn) return;
    const cart = readCart();
    const i = parseInt(btn.dataset.i, 10);
    if (btn.dataset.act === "inc") cart[i].qty++;
    if (btn.dataset.act === "dec") { cart[i].qty--; if (cart[i].qty < 1) cart.splice(i, 1); }
    if (btn.dataset.act === "rem") cart.splice(i, 1);
    writeCart(cart); renderCart();
  });

  // Toast
  const toastEl = document.createElement("div");
  toastEl.className = "pv-toast";
  document.body.appendChild(toastEl);
  let toastT;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastT);
    toastT = setTimeout(() => toastEl.classList.remove("show"), 1800);
  }

  // Intercept cart links + add-to-cart buttons
  document.addEventListener("click", function (e) {
    const cartLink = e.target.closest("a[href*='cart']");
    if (cartLink && /cart/i.test(cartLink.textContent)) {
      e.preventDefault(); openCart(); return;
    }
    const addBtn = e.target.closest(".product-info__cart-btn, [name='add'], button[data-add-to-cart]");
    if (addBtn) {
      e.preventDefault();
      const root = addBtn.closest("body") || document;
      const name = (root.querySelector(".product-info__title, h1")?.textContent || "Item").trim();
      let priceText = (addBtn.textContent.match(/\$[\d.,]+/) || root.querySelector("[data-product-price-current], .product-price__current")?.textContent || "0").toString();
      const price = parseFloat((priceText.match(/[\d.]+/) || ["0"])[0]) || 0;
      const img = root.querySelector(".product__item-img, .figureImg img, #gallery img")?.src || "";
      const variant = (root.querySelector(".option-value.active")?.textContent || "").trim();
      const cart = readCart();
      const key = name + "|" + variant;
      const ex = cart.find(i => i.key === key);
      if (ex) ex.qty++; else cart.push({ key, name, variant, price, qty: 1, img });
      writeCart(cart);
      toast("Added to cart");
      setTimeout(openCart, 300);
    }
  }, true);

  updateCartCount();

  // ---------- 10% off popup ----------
  if (localStorage.getItem(POPUP_KEY) !== "dismissed") {
    setTimeout(showPopup, 1200);
  }

  function showPopup() {
    const overlay = document.createElement("div");
    overlay.className = "pv-overlay open";
    overlay.innerHTML = `
      <div class="pv-modal">
        <button class="pv-close" aria-label="Close">&times;</button>
        <div class="pv-logo">P</div>
        <p class="sub">UNLOCK</p>
        <h2>10% OFF</h2>
        <p class="sub2">YOUR ORDER</p>
        
        <div class="pv-phone">
          <div class="pv-cc"><span class="pv-flag"></span><span>+1</span><span style="font-size:9px">▼</span></div>
          <input type="tel" placeholder="What is your phone number?" />
        </div>
        <p class="pv-disc">*By providing your number and clicking the button, you agree to receive recurring auto-dialed marketing SMS (including cart reminders; AI content; artificial or prerecorded voices) and our <a href="#">TERMS OF SERVICE</a> (including arbitration). Consent is not required to purchase. Msg & data rates may apply. Msg frequency varies. Reply HELP for help; STOP to opt-out. View <a href="#">PRIVACY POLICY</a>.</p>
        <button class="pv-btn">Sign up now<small>to subscribe to texts</small></button>
        <button class="pv-no">No Thanks</button>
        <p class="pv-success" style="display:none">Thanks! Use code <b>WELCOME10</b> at checkout.</p>
      </div>`;
    document.body.appendChild(overlay);
    function dismiss() { overlay.remove(); localStorage.setItem(POPUP_KEY, "dismissed"); }
    function done() { overlay.remove(); localStorage.setItem(POPUP_KEY, "dismissed"); }
    overlay.querySelector(".pv-close").onclick = dismiss;
    overlay.querySelector(".pv-no").onclick = dismiss;
    overlay.addEventListener("click", e => { if (e.target === overlay) dismiss(); });
    overlay.querySelector(".pv-btn").onclick = function () {
      const v = overlay.querySelector("input").value.trim();
      if (v.length < 6) { overlay.querySelector("input").focus(); return; }
      overlay.querySelector(".pv-success").style.display = "block";
      setTimeout(done, 2200);
    };
  }
})();
