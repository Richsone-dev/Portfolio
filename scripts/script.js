  const navbar = document.getElementById("navbar");
  const bg = navbar.querySelector("::before"); // on va simuler ce comportement

  const images = [
    "images/dark1.jpg",
    "images/dark2.jpg",
    "images/dark3.jpg"
    "images/dark4.jpg"
    "images/dark5.jpg"
  ];

  let index = 0;
  let currentBg = document.createElement("div");
  let nextBg = document.createElement("div");

  [currentBg, nextBg].forEach(bg => {
    bg.style.position = "absolute";
    bg.style.inset = 0;
    bg.style.backgroundSize = "cover";
    bg.style.backgroundPosition = "center";
    bg.style.transition = "opacity 3s ease-in-out";
    bg.style.zIndex = -1;
    navbar.appendChild(bg);
  });

  currentBg.style.backgroundImage = `url('${images[index]}')`;
  currentBg.style.opacity = 1;
  nextBg.style.opacity = 0;

  setInterval(() => {
    index = (index + 1) % images.length;
    nextBg.style.backgroundImage = `url('${images[index]}')`;
    nextBg.style.opacity = 1;
    currentBg.style.opacity = 0;

    // swap les références
    [currentBg, nextBg] = [nextBg, currentBg];
  }, 8000); // toutes les 8 secondes