export const sliderProps = {
  type: "carousel",
  startAt: "center",
  peek: 88,
  gap: 16,
  startAt: 1,
  perView: 4,
  wrapperSize: 100,
  breakpoints: {
    480: {
      perView: 1,
      type: "slider",
      peek: {
        before: 16,
        after: 40
      }
    },
    768: {
      perView: 1,
      type: "slider",
      peek: {
        before: 16,
        after: 40
      }
    },
    1200: {
      perView: 2,
      type: "slider",
      startAt: 1,
      peek: {
        before: 40,
        after: 40
      }
    },
    1440: { perView: 3 }
  }
};
