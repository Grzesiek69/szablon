const Ticker = (tickerContainer) => {
  const cssClasses = window.themeCore.utils.cssClasses;
  const selectors = {
    container: ".js-ticker-container",
    contentContainer: ".js-ticker-content-container"
  };
  const modificators = {
    hideAfterElement: "after-hidden"
  };
  let contentContainer;
  let tickers = [];
  function init() {
    if (!tickerContainer) {
      return;
    }
    contentContainer = tickerContainer.querySelector(selectors.contentContainer);
    if (!contentContainer) {
      return;
    }
    tickers = [];
    tickers.push({
      tickerContainer,
      items: [
        ...tickerContainer.querySelectorAll(
          selectors.contentContainer
        )
      ],
      contentWidth: tickerContainer.querySelector(
        selectors.contentContainer
      ).clientWidth
    });
    setContentWidth();
    setEventListeners();
  }
  function setContentWidth() {
    tickers.forEach((ticker) => {
      if (ticker.contentWidth < window.innerWidth) {
        ticker.items.forEach((item) => {
          item.style.minWidth = "100vw";
          item.classList.add(cssClasses.full);
          hideLastChildAfterElement(item);
        });
      } else {
        ticker.items.forEach((item) => {
          item.style.minWidth = "unset";
          item.classList.remove(cssClasses.full);
          showLastChildAfterElement(item);
        });
      }
    });
  }
  function showLastChildAfterElement(element) {
    element.classList.remove(modificators.hideAfterElement);
  }
  function hideLastChildAfterElement(element) {
    element.classList.add(modificators.hideAfterElement);
  }
  function setEventListeners() {
    window.addEventListener("resize", setContentWidth);
  }
  return Object.freeze({
    init
  });
};
export {
  Ticker as T
};
