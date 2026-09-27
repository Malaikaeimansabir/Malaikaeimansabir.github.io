const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
const progress = document.getElementById("progress");
const topBtn = document.getElementById("topBtn");

menuBtn.addEventListener("click", () => nav.classList.toggle("open"));
document.querySelectorAll("#nav a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

const words = ["beautiful websites.", "responsive UIs.", "clean web experiences."];
let word = 0, char = 0, deleting = false;
const typing = document.getElementById("typing");

function typeEffect() {
  const current = words[word];
  typing.textContent = deleting ? current.substring(0, char--) : current.substring(0, char++);
  if (!deleting && char > current.length) {
    deleting = true;
    setTimeout(typeEffect, 1200);
    return;
  }
  if (deleting && char < 0) {
    deleting = false;
    word = (word + 1) % words.length;
    char = 0;
  }
  setTimeout(typeEffect, deleting ? 45 : 80);
}
typeEffect();

function updateScroll() {
  const scrollTop = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${height ? (scrollTop / height) * 100 : 0}%`;
  topBtn.classList.toggle("show", scrollTop > 500);
}
window.addEventListener("scroll", updateScroll);

topBtn.addEventListener("click", () => window.scrollTo({top:0, behavior:"smooth"}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, {threshold:0.12});

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const first = this.firstName.value.trim();
  const email = this.email.value.trim();
  const message = this.message.value.trim();
  const note = document.getElementById("formNote");

  if (!first || !email || !message) {
    note.textContent = "Please fill in the required fields.";
    return;
  }

  const subject = encodeURIComponent(`Portfolio inquiry from ${first}`);
  const body = encodeURIComponent(
    `${message}\n\nName: ${first} ${this.lastName.value.trim()}\nEmail: ${email}`
  );
  window.location.href = `mailto:malaikasabir03@gmail.com?subject=${subject}&body=${body}`;
  note.textContent = "Opening your email app...";
});
