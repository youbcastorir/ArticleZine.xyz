// ArticleZine.xyz — Main App Logic
// Print On Demand Morocco

(function () {
  "use strict";

  // ─── STATE ────────────────────────────────────────────────────
  const state = {
    lang: localStorage.getItem("az-lang") || "ar",
    theme: localStorage.getItem("az-theme") || "light",
    currentCategory: "all",
    currentSubcat: "all",
    searchQuery: "",
    selectedProduct: null,
    selectedSize: null,
    selectedColor: null,
    selectedQty: 1,
    selectedGallery: 0,
    blogLang: null,
    blogVisible: 6,
  };

  // ─── DOM REFS ─────────────────────────────────────────────────
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);

  // ─── INIT ─────────────────────────────────────────────────────
  function init() {
    applyTheme(state.theme);
    applyLang(state.lang);
    renderNav();
    renderHero();
    renderTrustBadges();
    renderCategories();
    renderProducts();
    renderCustomSection();
    renderBlog();
    renderCities();
    renderFooter();
    bindGlobalEvents();
    state.blogLang = state.lang;
  }

  // ─── APPLY THEME ──────────────────────────────────────────────
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    state.theme = theme;
    localStorage.setItem("az-theme", theme);
    const btn = $("#theme-toggle");
    if (btn) btn.title = theme === "dark" ? t("lightMode") : t("darkMode");
  }

  // ─── APPLY LANGUAGE ───────────────────────────────────────────
  function applyLang(lang) {
    state.lang = lang;
    localStorage.setItem("az-lang", lang);
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", TRANSLATIONS[lang].dir);
    document.title = `ArticleZine — ${TRANSLATIONS[lang].tagline}`;
    updateMetaTags(lang);
  }

  function t(key, sub) {
    const tx = TRANSLATIONS[state.lang];
    if (sub) return tx[key]?.[sub] || key;
    return tx[key] || key;
  }

  function updateMetaTags(lang) {
    const tx = TRANSLATIONS[lang];
    const desc = {
      ar: "ArticleZine — منصة الطباعة حسب الطلب في المغرب. تيشرتات مخصصة، هوديز، ملابس مطبوعة. اطلب عبر واتساب.",
      fr: "ArticleZine — Impression à la demande au Maroc. T-shirts personnalisés, hoodies, vêtements imprimés. Commandez via WhatsApp.",
      en: "ArticleZine — Print On Demand Morocco. Custom T-Shirts, Hoodies, Printed Apparel. Order via WhatsApp.",
    };
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = desc[lang];
  }

  // ─── NAV ──────────────────────────────────────────────────────
  function renderNav() {
    const tx = TRANSLATIONS[state.lang];
    const nav = $("#nav-links");
    if (!nav) return;
    nav.innerHTML = Object.entries(tx.nav)
      .map(([key, label]) => `<a href="#${key}" class="${key === "home" ? "active" : ""}" data-section="${key}">${label}</a>`)
      .join("");

    // Lang buttons
    const langWrap = $("#lang-buttons");
    if (langWrap) {
      langWrap.innerHTML = ["ar", "fr", "en"]
        .map(
          (l) =>
            `<button class="lang-btn ${state.lang === l ? "active" : ""}" data-lang="${l}">${l.toUpperCase()}</button>`
        )
        .join("");
    }

    // Bind nav links
    nav.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", (e) => {
        e.preventDefault();
        navigateTo(a.dataset.section);
        nav.querySelectorAll("a").forEach((x) => x.classList.remove("active"));
        a.classList.add("active");
        // close mobile
        $("#mobile-menu")?.classList.remove("open");
        $("#hamburger")?.classList.remove("open");
      })
    );

    renderMobileMenu();
  }

  function renderMobileMenu() {
    const tx = TRANSLATIONS[state.lang];
    const menu = $("#mobile-menu");
    if (!menu) return;
    menu.innerHTML = Object.entries(tx.nav)
      .map(([key, label]) => `<a href="#${key}" data-section="${key}">${label}</a>`)
      .join("");
    menu.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", (e) => {
        e.preventDefault();
        navigateTo(a.dataset.section);
        menu.classList.remove("open");
        $("#hamburger")?.classList.remove("open");
      })
    );
  }

  function navigateTo(section) {
    $$(".page-section").forEach((s) => s.classList.remove("active"));
    const el = $(`#section-${section}`);
    if (el) {
      el.classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  // ─── HERO ─────────────────────────────────────────────────────
  function renderHero() {
    const tx = TRANSLATIONS[state.lang];
    const el = $("#hero-content");
    if (!el) return;
    el.innerHTML = `
      <div class="hero-badge">${tx.tagline}</div>
      <h1 class="hero-title">${tx.heroTitle.replace(/([^—]+)$/, "<em>$1</em>")}</h1>
      <p class="hero-sub">${tx.heroSub}</p>
      <div class="hero-actions">
        <button class="btn-primary" onclick="navigateSection('products')">${tx.heroBtn}
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
        <button class="btn-wa" onclick="navigateSection('custom')">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M11.996 2C6.472 2 2 6.477 2 12.008c0 1.777.465 3.448 1.279 4.9L2 22l5.236-1.266A9.96 9.96 0 0011.996 22C17.52 22 22 17.523 22 12.008 22 6.481 17.52 2 11.996 2z"/></svg>
          ${tx.heroBtn2}
        </button>
      </div>
      <div class="hero-stats">
        <div class="hero-stat"><h3>500+</h3><p>${state.lang === "ar" ? "تصميم متاح" : state.lang === "fr" ? "Designs disponibles" : "Designs available"}</p></div>
        <div class="hero-stat"><h3>24h</h3><p>${state.lang === "ar" ? "وقت التسليم" : state.lang === "fr" ? "Délai de livraison" : "Delivery time"}</p></div>
        <div class="hero-stat"><h3>6+</h3><p>${state.lang === "ar" ? "مدن المغرب" : state.lang === "fr" ? "Villes au Maroc" : "Moroccan cities"}</p></div>
      </div>
    `;
  }

  // ─── TRUST BADGES ─────────────────────────────────────────────
  function renderTrustBadges() {
    const badges = {
      ar: [
        { icon: "🚚", title: "توصيل سريع", text: "لجميع مدن المغرب" },
        { icon: "🎨", title: "جودة طباعة عالية", text: "ألوان ثابتة لا تبهت" },
        { icon: "📱", title: "طلب عبر واتساب", text: "سهل وسريع" },
        { icon: "💰", title: "أسعار تنافسية", text: "أسعار الجملة متاحة" },
      ],
      fr: [
        { icon: "🚚", title: "Livraison rapide", text: "Partout au Maroc" },
        { icon: "🎨", title: "Impression haute qualité", text: "Couleurs durables" },
        { icon: "📱", title: "Commande via WhatsApp", text: "Simple et rapide" },
        { icon: "💰", title: "Prix compétitifs", text: "Prix de gros disponibles" },
      ],
      en: [
        { icon: "🚚", title: "Fast Delivery", text: "Across Morocco" },
        { icon: "🎨", title: "High Quality Print", text: "Long-lasting colors" },
        { icon: "📱", title: "Order via WhatsApp", text: "Easy and fast" },
        { icon: "💰", title: "Competitive Prices", text: "Wholesale available" },
      ],
    };
    const el = $("#trust-grid");
    if (!el) return;
    el.innerHTML = badges[state.lang]
      .map(
        (b) => `
      <div class="trust-item">
        <div class="trust-icon">${b.icon}</div>
        <div><h4>${b.title}</h4><p>${b.text}</p></div>
      </div>`
      )
      .join("");
  }

  // ─── CATEGORIES ───────────────────────────────────────────────
  function renderCategories() {
    const tx = TRANSLATIONS[state.lang];
    const strip = $("#cat-strip");
    if (!strip) return;
    const cats = ["all", "men", "women", "kids", "accessories"];
    strip.innerHTML = cats
      .map(
        (c) =>
          `<button class="cat-btn ${state.currentCategory === c ? "active" : ""}" data-cat="${c}">${tx.categories[c]}</button>`
      )
      .join("");
    strip.querySelectorAll(".cat-btn").forEach((btn) =>
      btn.addEventListener("click", () => {
        state.currentCategory = btn.dataset.cat;
        state.currentSubcat = "all";
        strip.querySelectorAll(".cat-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        renderSubcats();
        renderProducts();
      })
    );
    renderSubcats();
  }

  function renderSubcats() {
    const tx = TRANSLATIONS[state.lang];
    const strip = $("#subcat-strip");
    if (!strip) return;

    const subcatMap = {
      all: [],
      men: ["tshirts", "polo", "hoodies", "sweatshirts", "jackets", "sportswear"],
      women: ["tshirts", "hoodies", "dresses", "sweatshirts", "sportswear"],
      kids: ["tshirts", "hoodies", "school", "baby"],
      accessories: ["caps", "totebags", "mugs", "phonecases", "stickers"],
    };

    const subs = subcatMap[state.currentCategory] || [];
    if (subs.length === 0) {
      strip.innerHTML = "";
      return;
    }

    strip.innerHTML = [`<button class="subcat-btn ${state.currentSubcat === "all" ? "active" : ""}" data-sub="all">${tx.categories.all}</button>`]
      .concat(
        subs.map(
          (s) =>
            `<button class="subcat-btn ${state.currentSubcat === s ? "active" : ""}" data-sub="${s}">${tx.subcategories[s]}</button>`
        )
      )
      .join("");

    strip.querySelectorAll(".subcat-btn").forEach((btn) =>
      btn.addEventListener("click", () => {
        state.currentSubcat = btn.dataset.sub;
        strip.querySelectorAll(".subcat-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        renderProducts();
      })
    );
  }

  // ─── PRODUCTS ─────────────────────────────────────────────────
  function getFilteredProducts() {
    return PRODUCTS.filter((p) => {
      const catOk = state.currentCategory === "all" || p.category === state.currentCategory;
      const subOk = state.currentSubcat === "all" || p.sub === state.currentSubcat;
      const q = state.searchQuery.toLowerCase();
      const nameOk =
        !q ||
        p.name.ar.includes(q) ||
        p.name.fr.toLowerCase().includes(q) ||
        p.name.en.toLowerCase().includes(q);
      return catOk && subOk && nameOk;
    });
  }

  function renderProducts() {
    const grid = $("#product-grid");
    if (!grid) return;
    const products = getFilteredProducts();
    const tx = TRANSLATIONS[state.lang];

    if (products.length === 0) {
      grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--text2);">${tx.search.noResults} "${state.searchQuery || tx.categories[state.currentCategory]}"</div>`;
      return;
    }

    grid.innerHTML = products
      .map((p) => {
        const name = p.name[state.lang];
        const img = p.images[0];
        const topColors = p.colors.slice(0, 4);
        return `
        <div class="product-card" data-id="${p.id}" onclick="openProduct('${p.id}')">
          <div class="card-img">
            <img src="${img}" alt="${name}" loading="lazy">
            <div class="card-badge">
              ${p.trending ? `<span class="badge badge-trend">🔥 ${tx.product.trending}</span>` : ""}
              ${p.isNew ? `<span class="badge badge-new">✨ ${tx.product.new}</span>` : ""}
            </div>
            <a href="${buildWhatsAppMessage(p, "M", p.colors[0], 1, state.lang)}" target="_blank" class="card-wa-quick" onclick="event.stopPropagation()">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M11.996 2C6.472 2 2 6.477 2 12.008c0 1.777.465 3.448 1.279 4.9L2 22l5.236-1.266A9.96 9.96 0 0011.996 22C17.52 22 22 17.523 22 12.008 22 6.481 17.52 2 11.996 2z"/></svg>
            </a>
          </div>
          <div class="card-body">
            <div class="card-name">${name}</div>
            <div class="card-price">${p.price} <span>${tx.product.currency}</span></div>
            <div class="card-colors">
              ${topColors.map((c) => `<div class="color-dot" style="background:${COLORS[c]?.hex || c}" title="${COLORS[c]?.[state.lang] || c}"></div>`).join("")}
              ${p.colors.length > 4 ? `<div class="color-dot" style="background:var(--surface2);font-size:0.6rem;display:flex;align-items:center;justify-content:center;color:var(--text2)">+${p.colors.length - 4}</div>` : ""}
            </div>
          </div>
        </div>`;
      })
      .join("");
  }

  // ─── PRODUCT MODAL ────────────────────────────────────────────
  window.openProduct = function (id) {
    const p = PRODUCTS.find((x) => x.id === id);
    if (!p) return;
    state.selectedProduct = p;
    state.selectedSize = p.sizes[0];
    state.selectedColor = p.colors[0];
    state.selectedQty = 1;
    state.selectedGallery = 0;
    renderModal(p);
    $("#product-modal").classList.add("open");
    document.body.style.overflow = "hidden";
  };

  function renderModal(p) {
    const tx = TRANSLATIONS[state.lang];
    const name = p.name[state.lang];
    const cat = tx.categories[p.category];

    // Gallery
    const galleryEl = $("#modal-gallery-img");
    if (galleryEl) galleryEl.src = p.images[state.selectedGallery];

    const thumbs = $("#modal-thumbs");
    if (thumbs) {
      thumbs.innerHTML = p.images
        .map(
          (img, i) =>
            `<div class="modal-thumb ${i === state.selectedGallery ? "active" : ""}" onclick="switchGallery(${i})"><img src="${img}" alt=""></div>`
        )
        .join("");
    }

    // Info
    const info = $("#modal-info");
    if (!info) return;

    const waUrl = buildWhatsAppMessage(p, state.selectedSize, state.selectedColor, state.selectedQty, state.lang);

    info.innerHTML = `
      <div class="modal-cat">${cat} / ${tx.subcategories[p.sub]}</div>
      <h2 class="modal-name">${name}</h2>
      <div class="modal-price">${p.price} <span style="font-size:1rem;font-weight:500;color:var(--text2)">${tx.product.currency}</span></div>
      
      <div>
        <div class="modal-label">${tx.product.size}</div>
        <div class="size-grid" id="modal-sizes">
          ${p.sizes.map((s) => `<button class="size-btn ${s === state.selectedSize ? "active" : ""}" data-size="${s}">${s}</button>`).join("")}
        </div>
      </div>

      <div>
        <div class="modal-label">${tx.product.color}: <span id="color-label" style="font-weight:400;text-transform:none">${COLORS[state.selectedColor]?.[state.lang] || state.selectedColor}</span></div>
        <div class="color-grid" id="modal-colors">
          ${p.colors.map((c) => `<div class="color-select ${c === state.selectedColor ? "active" : ""}" style="background:${COLORS[c]?.hex || "#ccc"}" data-color="${c}" title="${COLORS[c]?.[state.lang] || c}"></div>`).join("")}
        </div>
      </div>

      <div>
        <div class="modal-label">${tx.product.qty}</div>
        <div class="qty-row">
          <button class="qty-btn" id="qty-minus">−</button>
          <span class="qty-val" id="qty-val">${state.selectedQty}</span>
          <button class="qty-btn" id="qty-plus">+</button>
        </div>
      </div>

      <a href="${waUrl}" target="_blank" class="btn-order-wa" id="modal-order-btn">
        <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M11.996 2C6.472 2 2 6.477 2 12.008c0 1.777.465 3.448 1.279 4.9L2 22l5.236-1.266A9.96 9.96 0 0011.996 22C17.52 22 22 17.523 22 12.008 22 6.481 17.52 2 11.996 2z"/></svg>
        ${tx.product.orderWhatsApp}
      </a>

      <div class="modal-desc">${p.desc(state.lang)}</div>
    `;

    // Bind size buttons
    info.querySelectorAll(".size-btn").forEach((btn) =>
      btn.addEventListener("click", () => {
        state.selectedSize = btn.dataset.size;
        info.querySelectorAll(".size-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        refreshModalOrderUrl();
      })
    );

    // Bind color selectors
    info.querySelectorAll(".color-select").forEach((dot) =>
      dot.addEventListener("click", () => {
        state.selectedColor = dot.dataset.color;
        info.querySelectorAll(".color-select").forEach((d) => d.classList.remove("active"));
        dot.classList.add("active");
        const lbl = $("#color-label");
        if (lbl) lbl.textContent = COLORS[state.selectedColor]?.[state.lang] || state.selectedColor;
        refreshModalOrderUrl();
      })
    );

    // Qty
    $("#qty-minus")?.addEventListener("click", () => {
      if (state.selectedQty > 1) {
        state.selectedQty--;
        $("#qty-val").textContent = state.selectedQty;
        refreshModalOrderUrl();
      }
    });
    $("#qty-plus")?.addEventListener("click", () => {
      state.selectedQty++;
      $("#qty-val").textContent = state.selectedQty;
      refreshModalOrderUrl();
    });
  }

  function refreshModalOrderUrl() {
    const btn = $("#modal-order-btn");
    if (!btn || !state.selectedProduct) return;
    btn.href = buildWhatsAppMessage(
      state.selectedProduct,
      state.selectedSize,
      state.selectedColor,
      state.selectedQty,
      state.lang
    );
  }

  window.switchGallery = function (idx) {
    state.selectedGallery = idx;
    const img = $("#modal-gallery-img");
    if (img && state.selectedProduct) {
      img.src = state.selectedProduct.images[idx] || state.selectedProduct.images[0];
    }
    $$(".modal-thumb").forEach((t, i) => t.classList.toggle("active", i === idx));
  };

  window.navigateSection = function (sec) {
    navigateTo(sec);
    $$(".nav-links a").forEach((a) => a.classList.toggle("active", a.dataset.section === sec));
  };

  // ─── CUSTOM SECTION ───────────────────────────────────────────
  function renderCustomSection() {
    const tx = TRANSLATIONS[state.lang];
    const el = $("#custom-content");
    if (!el) return;
    el.innerHTML = `
      <div class="custom-grid">
        <div>
          <h2 class="section-title" style="color:#fff">${tx.custom.title}</h2>
          <p class="section-sub">${tx.custom.sub}</p>
          <div class="custom-features">
            ${tx.custom.features.map((f) => `<div class="custom-feature">${f}</div>`).join("")}
          </div>
        </div>
        <div class="custom-form">
          <label class="upload-zone" for="upload-logo">
            <input type="file" id="upload-logo" accept="image/*,.pdf,.ai,.svg,.eps">
            <div class="upload-icon">🖼️</div>
            <strong>${tx.custom.uploadLogo}</strong>
            <p>PNG, JPG, SVG, PDF — max 10MB</p>
          </label>
          <label class="upload-zone" for="upload-art">
            <input type="file" id="upload-art" accept="image/*,.pdf,.ai,.svg,.eps">
            <div class="upload-icon">🎨</div>
            <strong>${tx.custom.uploadArt}</strong>
            <p>PNG, JPG, SVG, PDF — max 10MB</p>
          </label>
          <textarea class="form-textarea" id="custom-notes" placeholder="${tx.custom.notesPlaceholder}"></textarea>
          <button class="btn-wa" id="custom-send-btn" style="width:100%;justify-content:center">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M11.996 2C6.472 2 2 6.477 2 12.008c0 1.777.465 3.448 1.279 4.9L2 22l5.236-1.266A9.96 9.96 0 0011.996 22C17.52 22 22 17.523 22 12.008 22 6.481 17.52 2 11.996 2z"/></svg>
            ${tx.custom.sendWhatsApp}
          </button>
        </div>
      </div>`;

    // Upload feedback
    ["upload-logo", "upload-art"].forEach((id) => {
      const input = document.getElementById(id);
      input?.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) showToast(`✅ ${file.name}`);
      });
    });

    // Custom send
    document.getElementById("custom-send-btn")?.addEventListener("click", () => {
      const notes = document.getElementById("custom-notes")?.value || "";
      window.open(buildCustomWhatsAppMessage(notes || tx.custom.notesPlaceholder, state.lang), "_blank");
    });
  }

  // ─── BLOG ─────────────────────────────────────────────────────
  function renderBlog() {
    const tx = TRANSLATIONS[state.lang];
    const el = $("#blog-content");
    if (!el) return;
    const blogLang = state.blogLang || state.lang;
    const articles = BLOG_ARTICLES[blogLang] || BLOG_ARTICLES.ar;
    const visible = articles.slice(0, state.blogVisible);

    el.innerHTML = `
      <div class="section-header">
        <div>
          <h2 class="section-title">${tx.blog.title}</h2>
          <p class="section-sub">${tx.blog.sub}</p>
        </div>
      </div>
      <div class="blog-lang-tabs">
        ${["ar", "fr", "en"].map((l) => `<button class="blog-lang-tab ${blogLang === l ? "active" : ""}" data-blang="${l}">${l.toUpperCase()}</button>`).join("")}
      </div>
      <div class="blog-grid">
        ${visible
          .map(
            (a) => `
          <article class="blog-card">
            <div class="blog-meta">
              <span class="blog-cat-tag">${tx.blog.categories[a.cat] || a.cat}</span>
              <span>${a.date}</span>
            </div>
            <h3 class="blog-title">${a.title}</h3>
            <p class="blog-excerpt">${a.excerpt}</p>
            <div class="blog-tags">${a.tags.map((tg) => `<span class="blog-tag">#${tg}</span>`).join("")}</div>
            <button class="blog-read-more" onclick="openBlogArticle('${a.id}')">
              ${tx.blog.readMore}
              <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </article>`
          )
          .join("")}
      </div>
      ${
        visible.length < articles.length
          ? `<div class="blog-load-more"><button class="btn-outline" id="blog-load-more-btn">+ ${state.lang === "ar" ? "عرض المزيد" : state.lang === "fr" ? "Voir plus" : "Load More"}</button></div>`
          : ""
      }`;

    el.querySelectorAll(".blog-lang-tab").forEach((btn) =>
      btn.addEventListener("click", () => {
        state.blogLang = btn.dataset.blang;
        state.blogVisible = 6;
        renderBlog();
      })
    );

    document.getElementById("blog-load-more-btn")?.addEventListener("click", () => {
      state.blogVisible += 6;
      renderBlog();
    });
  }

  window.openBlogArticle = function (id) {
    const all = [...BLOG_ARTICLES.ar, ...BLOG_ARTICLES.fr, ...BLOG_ARTICLES.en];
    const art = all.find((a) => a.id === id);
    if (!art) return;
    const tx = TRANSLATIONS[state.lang];
    const modal = document.getElementById("product-modal");
    if (modal) {
      const box = modal.querySelector(".modal-box");
      if (box) {
        box.innerHTML = `
          <button class="modal-close" id="blog-modal-close">✕</button>
          <div style="grid-column:1/-1;padding:40px;max-width:700px;margin:0 auto;">
            <div class="blog-meta" style="margin-bottom:16px"><span class="blog-cat-tag">${tx.blog.categories[art.cat] || art.cat}</span><span>${art.date}</span></div>
            <h1 style="font-family:var(--font-head);font-size:1.8rem;font-weight:800;margin-bottom:16px;line-height:1.25">${art.title}</h1>
            <p style="color:var(--text2);line-height:1.8;margin-bottom:24px">${art.excerpt}</p>
            <p style="color:var(--text2);line-height:1.8">
              ${generateArticleBody(art, state.lang)}
            </p>
            <div class="blog-tags" style="margin-top:24px">${art.tags.map((tg) => `<span class="blog-tag">#${tg}</span>`).join("")}</div>
            <a href="https://wa.me/212602321305" target="_blank" class="btn-wa" style="margin-top:24px;display:inline-flex">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M11.996 2C6.472 2 2 6.477 2 12.008c0 1.777.465 3.448 1.279 4.9L2 22l5.236-1.266A9.96 9.96 0 0011.996 22C17.52 22 22 17.523 22 12.008 22 6.481 17.52 2 11.996 2z"/></svg>
              ${state.lang === "ar" ? "اطلب الآن" : state.lang === "fr" ? "Commander maintenant" : "Order Now"}
            </a>
          </div>`;
        document.getElementById("blog-modal-close")?.addEventListener("click", closeModal);
      }
      modal.classList.add("open");
      document.body.style.overflow = "hidden";
    }
  };

  function generateArticleBody(art, lang) {
    const templates = {
      ar: `في هذا المقال نستعرض بالتفصيل موضوع "${art.title}" وأهميته في سوق الطباعة المغربي. تُعدّ ArticleZine المنصة الأولى في المغرب للطباعة حسب الطلب، حيث نوفر أفضل الحلول لطباعة الملابس والإكسسوارات بجودة عالية وبأسعار تنافسية. نخدم عملاءنا في الدار البيضاء والرباط ومراكش وطنجة وأكادير وجميع مدن المغرب. تواصل معنا عبر واتساب للحصول على عرض مخصص لاحتياجاتك.`,
      fr: `Dans cet article, nous examinons en détail "${art.title}" et son importance sur le marché marocain de l'impression. ArticleZine est la première plateforme d'impression à la demande au Maroc. Nous livrons à Casablanca, Rabat, Marrakech, Tanger, Agadir et dans toute la ville du Maroc. Contactez-nous via WhatsApp pour un devis personnalisé.`,
      en: `In this article, we explore "${art.title}" and its importance in Morocco's print market. ArticleZine is Morocco's leading Print On Demand platform. We serve customers in Casablanca, Rabat, Marrakech, Tangier, Agadir and across Morocco. Contact us via WhatsApp for a custom quote.`,
    };
    return templates[lang] || templates.en;
  }

  // ─── CITIES ───────────────────────────────────────────────────
  function renderCities() {
    const cities = {
      ar: [
        { name: "الدار البيضاء", sub: "Casablanca", icon: "🏙️" },
        { name: "الرباط", sub: "Rabat", icon: "🏛️" },
        { name: "مراكش", sub: "Marrakech", icon: "🌹" },
        { name: "طنجة", sub: "Tanger", icon: "⚓" },
        { name: "أكادير", sub: "Agadir", icon: "🌊" },
        { name: "فاس", sub: "Fès", icon: "🕌" },
      ],
      fr: [
        { name: "Casablanca", sub: "الدار البيضاء", icon: "🏙️" },
        { name: "Rabat", sub: "الرباط", icon: "🏛️" },
        { name: "Marrakech", sub: "مراكش", icon: "🌹" },
        { name: "Tanger", sub: "طنجة", icon: "⚓" },
        { name: "Agadir", sub: "أكادير", icon: "🌊" },
        { name: "Fès", sub: "فاس", icon: "🕌" },
      ],
      en: [
        { name: "Casablanca", sub: "الدار البيضاء", icon: "🏙️" },
        { name: "Rabat", sub: "الرباط", icon: "🏛️" },
        { name: "Marrakech", sub: "مراكش", icon: "🌹" },
        { name: "Tangier", sub: "طنجة", icon: "⚓" },
        { name: "Agadir", sub: "أكادير", icon: "🌊" },
        { name: "Fès", sub: "فاس", icon: "🕌" },
      ],
    };

    const el = $("#cities-strip");
    if (!el) return;
    const list = cities[state.lang] || cities.ar;
    el.innerHTML = list
      .map(
        (c) => `
      <div class="city-chip">
        <div class="city-icon">${c.icon}</div>
        <strong>${c.name}</strong>
        <span>${c.sub}</span>
      </div>`
      )
      .join("");
  }

  // ─── FOOTER ───────────────────────────────────────────────────
  function renderFooter() {
    const tx = TRANSLATIONS[state.lang];
    const el = $("#footer-content");
    if (!el) return;
    el.innerHTML = `
      <div class="footer-grid">
        <div>
          <div class="footer-logo">Article<span>Zine</span></div>
          <p class="footer-about">${tx.footer.aboutText}</p>
          <p class="footer-cities">📍 ${tx.footer.cities}</p>
        </div>
        <div class="footer-col">
          <h4>${tx.footer.links}</h4>
          <ul>
            ${Object.entries(tx.nav).map(([k, v]) => `<li><a href="#${k}" onclick="navigateSection('${k}')">${v}</a></li>`).join("")}
          </ul>
        </div>
        <div class="footer-col">
          <h4>${state.lang === "ar" ? "التصنيفات" : state.lang === "fr" ? "Catégories" : "Categories"}</h4>
          <ul>
            ${["men", "women", "kids", "accessories"].map((c) => `<li><a href="#" onclick="filterCat('${c}')">${tx.categories[c]}</a></li>`).join("")}
          </ul>
        </div>
        <div class="footer-col">
          <h4>${tx.footer.contact}</h4>
          <div class="footer-contact-item">
            <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            <a href="mailto:salatrir@gmail.com">salatrir@gmail.com</a>
          </div>
          <div class="footer-contact-item">
            <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
            <span>+212 6 02 32 13 05</span>
          </div>
          <a href="https://wa.me/212602321305" target="_blank" class="footer-wa-btn">
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M11.996 2C6.472 2 2 6.477 2 12.008c0 1.777.465 3.448 1.279 4.9L2 22l5.236-1.266A9.96 9.96 0 0011.996 22C17.52 22 22 17.523 22 12.008 22 6.481 17.52 2 11.996 2z"/></svg>
            WhatsApp
          </a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} ArticleZine.xyz — ${tx.footer.rights}</span>
        <span>${tx.tagline}</span>
      </div>`;
  }

  window.filterCat = function (cat) {
    navigateTo("products");
    state.currentCategory = cat;
    state.currentSubcat = "all";
    renderCategories();
    renderProducts();
    $$(".nav-links a").forEach((a) => a.classList.toggle("active", a.dataset.section === "products"));
  };

  // ─── SEARCH ───────────────────────────────────────────────────
  function handleSearch(query) {
    state.searchQuery = query.trim();
    const tx = TRANSLATIONS[state.lang];
    const results = PRODUCTS.filter((p) => {
      const q = state.searchQuery.toLowerCase();
      return (
        p.name.ar.includes(q) ||
        p.name.fr.toLowerCase().includes(q) ||
        p.name.en.toLowerCase().includes(q)
      );
    }).slice(0, 8);

    const el = $("#search-results");
    if (!el) return;

    if (!state.searchQuery) {
      el.innerHTML = "";
      return;
    }

    if (results.length === 0) {
      el.innerHTML = `<div class="no-results">${tx.search.noResults} "${state.searchQuery}"</div>`;
      return;
    }

    el.innerHTML = results
      .map(
        (p) => `
      <div class="search-result-item" onclick="selectSearchResult('${p.id}')">
        <img src="${p.images[0]}" alt="${p.name[state.lang]}">
        <div>
          <strong>${p.name[state.lang]}</strong><br>
          <span>${p.price} ${tx.product.currency}</span>
        </div>
      </div>`
      )
      .join("");
  }

  window.selectSearchResult = function (id) {
    $("#search-overlay").classList.remove("open");
    document.body.style.overflow = "";
    openProduct(id);
  };

  // ─── GLOBAL EVENTS ────────────────────────────────────────────
  function bindGlobalEvents() {
    // Theme toggle
    $("#theme-toggle")?.addEventListener("click", () => {
      applyTheme(state.theme === "dark" ? "light" : "dark");
    });

    // Lang buttons (event delegation on nav-actions)
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".lang-btn");
      if (btn && btn.dataset.lang) {
        const lang = btn.dataset.lang;
        applyLang(lang);
        // Re-render all text
        renderNav();
        renderHero();
        renderTrustBadges();
        renderCategories();
        renderProducts();
        renderCustomSection();
        renderBlog();
        renderCities();
        renderFooter();
        $$(".lang-btn").forEach((b) => b.classList.toggle("active", b.dataset.lang === lang));
      }
    });

    // Search toggle
    $("#search-btn")?.addEventListener("click", () => {
      const overlay = $("#search-overlay");
      overlay?.classList.add("open");
      document.body.style.overflow = "hidden";
      setTimeout(() => $("#search-input")?.focus(), 100);
    });

    // Search input
    $("#search-input")?.addEventListener("input", (e) => handleSearch(e.target.value));

    // Close search
    $("#search-overlay")?.addEventListener("click", (e) => {
      if (e.target === e.currentTarget) {
        e.currentTarget.classList.remove("open");
        document.body.style.overflow = "";
      }
    });

    // Close modal
    $("#modal-close")?.addEventListener("click", closeModal);
    $("#product-modal")?.addEventListener("click", (e) => {
      if (e.target === e.currentTarget) closeModal();
    });

    // Hamburger
    $("#hamburger")?.addEventListener("click", () => {
      const open = !$("#hamburger").classList.contains("open");
      $("#hamburger").classList.toggle("open", open);
      $("#mobile-menu").classList.toggle("open", open);
    });

    // Navbar scroll
    window.addEventListener("scroll", () => {
      $("#navbar")?.classList.toggle("scrolled", window.scrollY > 20);
    });

    // Keyboard
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeModal();
        $("#search-overlay")?.classList.remove("open");
        document.body.style.overflow = "";
      }
    });

    // Show correct section on init
    navigateTo("home");
  }

  function closeModal() {
    const modal = $("#product-modal");
    if (modal) {
      modal.classList.remove("open");
      document.body.style.overflow = "";
      // restore modal box to original structure
      const box = modal.querySelector(".modal-box");
      if (box && !box.querySelector("#modal-gallery-img")) {
        box.innerHTML = `
          <button class="modal-close" id="modal-close">✕</button>
          <div class="modal-gallery">
            <img id="modal-gallery-img" src="" alt="">
            <div class="modal-thumbs" id="modal-thumbs"></div>
          </div>
          <div class="modal-info" id="modal-info"></div>`;
        document.getElementById("modal-close")?.addEventListener("click", closeModal);
      }
    }
  }

  // ─── TOAST ────────────────────────────────────────────────────
  window.showToast = function (msg) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
  };

  // ─── START ───────────────────────────────────────────────────
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
