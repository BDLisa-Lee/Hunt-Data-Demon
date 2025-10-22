
const images = {
  top_left: "images/ghost.png",
  top_right: "images/scribble.png",
  middle_left: "images/delay.png",
  middle_right: "images/copy.png",
  bottom_left: "images/typo.png",
  bottom_right: "images/missing.png"
};

const completedSlots = JSON.parse(localStorage.getItem("completedSlots")) || [];

completedSlots.forEach(slot => {
  const cell = document.getElementById(slot);
  if (cell) {
    cell.innerHTML = `<img src="${images[slot]}" alt="${slot}" />`;
  }
});

const params = new URLSearchParams(window.location.search);
const slot = params.get("slot");
if (slot && images[slot]) {
  if (!completedSlots.includes(slot)) {
    completedSlots.push(slot);
    localStorage.setItem("completedSlots", JSON.stringify(completedSlots));
  }
  const cell = document.getElementById(slot);
  if (cell) {
    cell.innerHTML = `<img src="${images[slot]}" alt="${slot}" />`;
  }
}

if (completedSlots.length === 6) {
  showPopup();
  launchConfetti();
}

document.getElementById("reset").addEventListener("click", () => {
  localStorage.removeItem("completedSlots");
  window.location.href = "index.html";
});

function showPopup() {
  document.getElementById("popup").classList.remove("hidden");
}

function closePopup() {
  document.getElementById("popup").classList.add("hidden");
}

function launchConfetti() {
  const duration = 5000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 10,
      angle: 60,
      spread: 90,
      origin: { x: 0 },
      colors: ['#ff0', '#0ff', '#f0f', '#fff', '#ff5733', '#33ff57']
    });
    confetti({
      particleCount: 10,
      angle: 120,
      spread: 90,
      origin: { x: 1 },
      colors: ['#ff0', '#0ff', '#f0f', '#fff', '#ff5733', '#33ff57']
    });
    confetti({
      particleCount: 20,
      spread: 360,
      origin: { x: 0.5, y: 0.5 },
      colors: ['#ff0', '#0ff', '#f0f', '#fff', '#ff5733', '#33ff57']
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}
