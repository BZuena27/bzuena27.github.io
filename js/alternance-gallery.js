const gallery = document.querySelector(".alternance-gallery");

if (gallery) {
  const mainImage = gallery.querySelector(".alternance-gallery-image");
  const caption = gallery.querySelector(".alternance-gallery-caption");
  const lightbox = gallery.querySelector(".alternance-gallery-lightbox");
  const lightboxImage = gallery.querySelector(".alternance-gallery-lightbox-image");
  const closeButton = gallery.querySelector(".alternance-gallery-close");
  const thumbnails = Array.from(gallery.querySelectorAll(".alternance-gallery-thumb"));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let currentIndex = 0;

  const showImage = (index) => {
    currentIndex = (index + thumbnails.length) % thumbnails.length;
    const thumbnail = thumbnails[currentIndex];
    const image = thumbnail.querySelector("img");

    mainImage.src = image.src;
    mainImage.alt = thumbnail.dataset.caption || "Photo de l'environnement professionnel";
    caption.textContent = thumbnail.dataset.caption || "Environnement professionnel";
    thumbnails.forEach((item, itemIndex) => {
      const isActive = itemIndex === currentIndex;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });
  };

  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", () => showImage(index));
  });

  gallery.querySelector(".alternance-gallery-open").addEventListener("click", () => {
    lightboxImage.src = mainImage.src;
    lightboxImage.alt = mainImage.alt;
    lightbox.showModal();
  });

  closeButton.addEventListener("click", () => lightbox.close());
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) lightbox.close();
  });

  if (!reduceMotion.matches) {
    window.setInterval(() => {
      if (!lightbox.open && !gallery.matches(":hover, :focus-within")) {
        showImage(currentIndex + 1);
      }
    }, 5000);
  }
}
