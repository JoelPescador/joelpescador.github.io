document.addEventListener("DOMContentLoaded", function () {
  const list = document.querySelector("#carrusel1 .list");
  const items = document.querySelectorAll("#carrusel1 .item");
  const carousel = document.querySelector("#carrusel1"); // Select the carousel container
  const expandButton = document.querySelector(".button--expand");
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
    expandButton.classList.toggle("fullscreen");
    // Use requestAnimationFrame to force a reflow and apply layout changes
    requestAnimationFrame(() => {
      updateItemWidth();
    });
    const isFullscreen = carousel.classList.toggle("fullscreen");

    if (isFullscreen) {
      // Apply fullscreen styles to the expand button
      expandButton.style.top = "80%";
      expandButton.style.left = "85%";
      expandButton.style.right = "0";
    } else {
      // Revert to default styles
      expandButton.style.top = "95%";
      expandButton.style.right = "1rem";
    }
  }

  // Event listeners for navigation buttons
  document
    .querySelector("#carrusel1 .button--previous")
    .addEventListener("click", function () {
      handleClick("previous");
    });

  document
    .querySelector("#carrusel1 .button--next")
    .addEventListener("click", function () {
      handleClick("next");
    });

  // Add click event to toggle fullscreen
  document
    .querySelector("#carrusel1 .button--expand")
    .addEventListener("click", toggleFullscreen);

  // Update item width on window resize
  window.addEventListener("resize", updateItemWidth);
});
