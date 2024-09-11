document.addEventListener("DOMContentLoaded", function () {
  // Function to initialize a carousel
  function initializeCarousel(carousel) {
    const list = carousel.querySelector(".list");
    const items = carousel.querySelectorAll(".item");
    const expandButton = carousel.querySelector(".button--expand");
    const previousNext = carousel.querySelectorAll(
      ".button--previous, .button--next"
    );

    const mediaQueryCondition = window.matchMedia("(max-width: 576px)");

    const imageContainers = carousel.querySelectorAll(
      ".carousel-image-container"
    );
    let itemWidth = items[0].offsetWidth;
    let currentIndex = 0;

    // Function to update item width and reposition list
    function updateItemWidth() {
      itemWidth = items[0].offsetWidth;
      list.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }

    // Function to handle carousel item navigation
    function handleClick(direction) {
      if (direction === "previous") {
        currentIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
      } else {
        currentIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
      }
      list.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }

    // Function to toggle fullscreen mode
    function toggleFullscreen() {
      const isFullscreen = carousel.classList.toggle("fullscreen");

      if (isFullscreen) {
        // Expand to fullscreen
        carousel.style.position = "fixed";
        carousel.style.top = "0";
        carousel.style.left = "0";
        carousel.style.width = "100vw";
        carousel.style.height = "100vh";
        carousel.style.zIndex = "1000";
        list.style.height = "100%";

        // Resize each image container
        imageContainers.forEach((container) => {
          container.style.height = "100%";
          container.style.width = "auto";
          container.style.border = "2px solid black";
          container.style.boxShadow = "0 0 10px black";
          if (mediaQueryCondition.matches) {
            container.style.height = "30%";
          }
        });

        // Style expand button in fullscreen mode
        expandButton.style.position = "fixed";
        expandButton.style.bottom = "10%";
        expandButton.style.right = "10%";
        expandButton.style.backgroundColor = "white";
        expandButton.style.border = "none";
        expandButton.style.padding = "0.5rem";
        expandButton.style.borderRadius = "50%";
        expandButton.style.zIndex = "1001";

        if (mediaQueryCondition.matches) {
          expandButton.style.right = "7%";
          expandButton.style.top = "35%";

          // Loop through the previous and next buttons and apply the top style
          previousNext.forEach((button) => {
            button.style.top = "15%";
          });
        }

        // Style SVG to be white and 25% bigger
        const svg = expandButton.querySelector("svg");
        if (svg) {
          svg.style.fill = "white";
          svg.style.width = "20px";
          svg.style.height = "20px";
          svg.style.transform = "scale(1)";
        }
      } else {
        // Revert to default styles
        carousel.style.position = "";
        carousel.style.top = "";
        carousel.style.left = "";
        carousel.style.width = "";
        carousel.style.height = "300px";
        carousel.style.zIndex = "";
        list.style.height = "100%";

        // Reset each image container size
        imageContainers.forEach((container) => {
          container.style.height = "300px";
          container.style.width = "auto";
          container.style.border = "2px solid white";
          container.style.boxShadow = "none";
        });

        // Reset expand button styles in normal mode
        expandButton.style.position = "";
        expandButton.style.bottom = "";
        expandButton.style.right = "";
        expandButton.style.top = "";
        expandButton.style.backgroundColor = "";
        expandButton.style.border = "";
        expandButton.style.padding = "";
        expandButton.style.borderRadius = "";
        expandButton.style.zIndex = "";

        // Reset the top style for the previous and next buttons
        previousNext.forEach((button) => {
          button.style.top = "";
        });

        // Reset SVG styles
        const svg = expandButton.querySelector("svg");
        if (svg) {
          svg.style.fill = "";
          svg.style.width = "";
          svg.style.height = "";
          svg.style.transform = "";
        }
      }

      requestAnimationFrame(() => {
        updateItemWidth();
      });
    }

    // Event listeners for navigation buttons
    carousel
      .querySelector(".button--previous")
      .addEventListener("click", function () {
        handleClick("previous");
      });

    carousel
      .querySelector(".button--next")
      .addEventListener("click", function () {
        handleClick("next");
      });

    // Add click event to toggle fullscreen
    expandButton.addEventListener("click", toggleFullscreen);

    // Update item width on window resize
    window.addEventListener("resize", updateItemWidth);

    // Event listener to handle closing fullscreen on click outside of carousel
    document.body.addEventListener("click", function (event) {
      if (
        !carousel.contains(event.target) &&
        carousel.classList.contains("fullscreen")
      ) {
        toggleFullscreen();
      }
    });
  }

  // Initialize all carousels
  const carousels = document.querySelectorAll(".list-wrapper");
  carousels.forEach((carousel) => initializeCarousel(carousel));
});
