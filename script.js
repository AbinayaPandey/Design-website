const cards = document.querySelectorAll(".album-card");
const row = document.querySelector(".album-row");
cards.forEach((card) => {
  const button = card.querySelector(".play-btn");
  const audio = card.querySelector("audio");

  button.addEventListener("click", (e) => {
    e.stopPropagation();

    // Reset others
    cards.forEach((c) => {
      if (c !== card) {
        c.classList.remove("active");
        c.querySelector("audio").pause();
        c.querySelector("audio").currentTime = 0;
      }
    });

    // Toggle active state
    const isActive = card.classList.toggle("active");

    // Play / Stop
    if (isActive) {
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  });
});
