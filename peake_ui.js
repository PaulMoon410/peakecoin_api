/*
  peake_ui.js
  Lightweight UI helpers for PeakeCoin websites.
*/
(function (global) {
  const PeakeUI = {
    injectDefaultStyles(cssUrl = "peake_ui.css") {
      if (typeof document === "undefined") return;
      const existing = document.querySelector(`link[data-peake-ui="1"]`);
      if (existing) return existing;

      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = cssUrl;
      link.setAttribute("data-peake-ui", "1");
      document.head.appendChild(link);
      return link;
    },

    init(options = {}) {
      if (options.autoStyles) {
        this.injectDefaultStyles(options.cssUrl || "peake_ui.css");
      }
      this.setupReveal(options.revealSelector || ".reveal, [data-reveal]");
      this.setupThemeToggle(options.themeToggleSelector || "[data-theme-toggle]");
      if (options.backgroundEffects) {
        this.addSparkles(options.sparkleTarget || document.body, options.sparkleCount || 24);
      }
    },

    setupReveal(selector = ".reveal, [data-reveal]", threshold = 0.15) {
      if (typeof document === "undefined") return;
      const elements = Array.from(document.querySelectorAll(selector));
      if (!elements.length) return;

      if (!("IntersectionObserver" in global)) {
        elements.forEach((el) => el.classList.add("is-visible"));
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold }
      );

      elements.forEach((el) => observer.observe(el));
    },

    setupThemeToggle(selector = "[data-theme-toggle]") {
      if (typeof document === "undefined") return;
      const btn = document.querySelector(selector);
      if (!btn) return;

      const storageKey = "peake-theme";
      const root = document.documentElement;
      const saved = localStorage.getItem(storageKey);
      if (saved === "light" || saved === "dark") {
        root.setAttribute("data-theme", saved);
      }

      btn.addEventListener("click", () => {
        const current = root.getAttribute("data-theme") === "light" ? "light" : "dark";
        const next = current === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", next);
        localStorage.setItem(storageKey, next);
      });
    },

    mountHeader(target, { brand = "PeakeCoin", links = [] } = {}) {
      const el = this._resolveElement(target);
      if (!el) return null;

      const navLinks = links
        .map((link) => `<a href="${link.href}" class="pk-nav-link">${link.label}</a>`)
        .join("");

      el.innerHTML = `
        <header class="pk-header reveal">
          <div class="pk-header-inner">
            <a href="/" class="pk-brand">${brand}</a>
            <nav class="pk-nav">${navLinks}</nav>
            <button class="pk-btn pk-btn-ghost" type="button" data-theme-toggle>Theme</button>
          </div>
        </header>
      `;

      this.setupThemeToggle("[data-theme-toggle]");
      this.setupReveal(".reveal");
      return el;
    },

    mountFooter(target, { text = "Built with PeakeUI" } = {}) {
      const el = this._resolveElement(target);
      if (!el) return null;

      el.innerHTML = `
        <footer class="pk-footer reveal">
          <div class="pk-footer-inner">${text}</div>
        </footer>
      `;

      this.setupReveal(".reveal");
      return el;
    },

    addSparkles(target = document.body, count = 24) {
      if (typeof document === "undefined") return null;
      const el = this._resolveElement(target);
      if (!el) return null;

      const layer = document.createElement("div");
      layer.className = "pk-sparkle-layer";

      for (let i = 0; i < count; i += 1) {
        const dot = document.createElement("span");
        dot.className = "pk-spark";
        dot.style.left = `${Math.random() * 100}%`;
        dot.style.top = `${Math.random() * 100}%`;
        dot.style.animationDelay = `${Math.random() * 5}s`;
        dot.style.animationDuration = `${4 + Math.random() * 6}s`;
        layer.appendChild(dot);
      }

      el.appendChild(layer);
      return layer;
    },

    _resolveElement(target) {
      if (typeof document === "undefined") return null;
      if (!target) return null;
      if (typeof target === "string") return document.querySelector(target);
      return target;
    },
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = PeakeUI;
  }
  global.PeakeUI = PeakeUI;
})(typeof window !== "undefined" ? window : globalThis);
