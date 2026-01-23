/* =====================
FLOATING HEARTS
===================== */

/* =====================
   FLOATING HEARTS (MUSIC CONTROLLED)
===================== */

const heartsContainer = document.createElement("div");
heartsContainer.className = "floating-hearts";
document.body.appendChild(heartsContainer);

const heartEmojis = ["💗", "💖", "💘", "💝","<3"];
let heartsInterval = null;

function startHearts() {
  if (heartsInterval) return; // already running

  heartsInterval = setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "heart-float";
    heart.innerText =
      heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = 18 + Math.random() * 22 + "px";
    heart.style.animationDuration = 6 + Math.random() * 6 + "s";
    heartsContainer.appendChild(heart);

    setTimeout(() => heart.remove(), 12000);
  }, 700);
}

function stopHearts() {
  clearInterval(heartsInterval);
  heartsInterval = null;
}

const envelope = document.getElementById("envelope");

if (envelope) {
  const openBtn = document.getElementById("open");
  const resetBtn = document.getElementById("reset");

  /* OPEN button */
  if (openBtn) {
    openBtn.onclick = (e) => {
      e.stopPropagation();
      envelope.classList.add("open");
      envelope.classList.remove("close");
    };
  }

  /* CLOSE button */
  if (resetBtn) {
    resetBtn.onclick = (e) => {
      e.stopPropagation();

      // If already closed → go to questionnaire
      if (envelope.classList.contains("close")) {
        window.location.href = "questions.html";
        return;
      }

      // Otherwise just close it
      envelope.classList.add("close");
      envelope.classList.remove("open");
    };
  }

  /* ENVELOPE CLICK BEHAVIOR */
  envelope.addEventListener("click", () => {
    if (envelope.classList.contains("open")) {
      // Open → message
      window.location.href = "special.html";
    } else if (envelope.classList.contains("close")) {
      // Closed → collage
      window.location.href = "memories.html";
    }
  });
}





/* =====================
   QUESTIONS PAGE LOGIC
===================== */

const questionText = document.getElementById("questionText");

if (questionText) {
  const questions = [
    "Are you the cutest baby in the whole world?",
    "Do you make my heart feel at home?",
    "Is there something you want to know?",
    "Do you know that your Nigesh loves you the most?",
    "Are you ready, then?"
  ];

  let index = 0;
  questionText.innerText = questions[index];

  window.nextQuestion = function () {
    index++;
    if (index < questions.length) {
      questionText.innerText = questions[index];
    } else {
      document.getElementById("questionCard").style.display = "none";
      document.getElementById("finalLetter").style.display = "block";
    }
  };

  const yesBtn = document.getElementById("finalYes");
  const noBtn = document.getElementById("finalNo");

  let noCount = 0;
  const noLines = [
    "Are you suree?",
    "Think about itt…",
    "That hurtsss",
    "Last chancee!",
    "Pweaseeeeeeee"
  ];

  if (noBtn && yesBtn) {
    noBtn.onclick = () => {
      noCount++;
      yesBtn.style.transform = `scale(${1 + noCount * 0.35})`;
      noBtn.innerText = noLines[noCount % noLines.length];
      noBtn.style.transform = `translateX(${Math.random() * 60 - 30}px)`;
    };

    yesBtn.onclick = () => {
      yesBtn.innerText = "AWW I love you <3";
      noBtn.style.display = "none";
    };
  }
}

/* =====================
   BACKGROUND MUSIC
===================== */
let music = null;
const musicBtn = document.getElementById("musicControl");

if (musicBtn) {
  if (localStorage.getItem("musicPlaying") === "true") {
    musicBtn.textContent = "⏸";
  }

  musicBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    if (!music) {
      music = new Audio("music.mp3");
      music.loop = true;
    }

    if (music.paused) {
      music.play().then(() => {
        musicBtn.textContent = "⏸";
        localStorage.setItem("musicPlaying", "true");
        startHearts(); // ❤️ START HEARTS
      }).catch(err => console.error(err));
    } else {
      music.pause();
      musicBtn.textContent = "▶️";
      localStorage.setItem("musicPlaying", "false");
      stopHearts(); // 💔 STOP HEARTS
    }
  });
}

