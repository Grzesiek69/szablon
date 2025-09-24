import { c as cssClasses } from "./cssClasses-aee656ec.js";
const selectors = {
  section: ".js-product-benefits",
  textFeatureItem: ".js-text-feature-item"
};
const ProductBenefits = () => {
  function init(sectionId) {
    const options = {
      threshold: 0.3
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const items = entry.target.querySelectorAll(selectors.textFeatureItem);
          items.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add(cssClasses.active);
            }, index * 400);
          });
        }
      });
    }, options);
    const sections = [...document.querySelectorAll(selectors.section)].filter((section) => !sectionId || section.closest(`#shopify-section-${sectionId}`));
    if (sections.length > 0) {
      sections.forEach((section) => {
        observer.observe(section);
      });
    }
  }
  return Object.freeze({
    init
  });
};
const action = () => {
  window.themeCore.ProductBenefits = window.themeCore.ProductBenefits || ProductBenefits();
  window.themeCore.utils.register(window.themeCore.ProductBenefits, "product-promo");
};
if (window.themeCore && window.themeCore.loaded) {
  action();
} else {
  document.addEventListener("theme:all:loaded", action, { once: true });
}
