const carouselWindow = document.querySelector(".alternance-carousel-window");
const carouselTrack = document.querySelector(".alternance-carousel-track");
const carouselSlides = Array.from(
  document.querySelectorAll(".alternance-carousel-slide")
);
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (carouselWindow && carouselTrack && carouselSlides.length && !reduceMotion.matches) {
  const slidesPerRun = carouselSlides.length / 3;
  let currentIndex = slidesPerRun;

  const centerSlide = (index, animate = true) => {
    const slide = carouselSlides[index];
    if (!slide) return;

    const trackBounds = carouselTrack.getBoundingClientRect();
    const slideBounds = slide.getBoundingClientRect();
    const slideOffset = slideBounds.left - trackBounds.left;
    const offset = carouselWindow.clientWidth / 2
      - slideOffset
      - slideBounds.width / 2;

    carouselTrack.style.transition = animate
      ? "transform 850ms cubic-bezier(.22, .61, .36, 1)"
      : "none";
    carouselTrack.style.setProperty("--carousel-offset", `${offset}px`);
    carouselSlides.forEach((item, itemIndex) => {
      item.classList.toggle("is-current", itemIndex === index);
    });
  };

  centerSlide(currentIndex, false);
  window.addEventListener("resize", () => centerSlide(currentIndex, false));

  window.setInterval(() => {
    if (currentIndex === slidesPerRun * 2 - 1) {
      centerSlide(slidesPerRun * 2);
      window.setTimeout(() => {
        currentIndex = slidesPerRun;
        centerSlide(currentIndex, false);
      }, 900);
      return;
    }
    currentIndex += 1;
    centerSlide(currentIndex);
  }, 3600);
}
