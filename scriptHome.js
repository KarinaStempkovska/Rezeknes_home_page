let slideIndex = 1;
showSlides(slideIndex);

// Автопереключение каждые 5 секунд
setInterval(() => {
  plusSlides(1);
}, 5000);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

function processFile(text) {
  const lines = text.trim().split('\n').map(line => line.trim());
  if (lines.length < 2) {
      console.error("Invalid file format");
      return "";
  }
  const date = lines[0];
  const title = lines[1];
  const mainText = lines.slice(2).filter(line => line.trim() !== '');
  let html = `
      <div class="card">
          <span class="date">${date}</span>
          <div class="card-header">
              <h3 class="card-title">${title}</h3>
          </div>
          <div class="card-body">
  `;
  mainText.forEach(paragraph => {
      html += `<p class="card-text">${paragraph}</p>\n`;
  });
  html += `      </div>
      </div>`;
  return html;
}
const posts = [
  { date: "22.03.2025", title: "Post 1", content: "Content of post 1" },
  { date: "23.03.2025", title: "Post 2", content: "Content of post 2" },
  { date: "24.03.2025", title: "Post 3", content: "Content of post 3" },
  { date: "25.03.2025", title: "Post 4", content: "Content of post 4" },
  { date: "26.03.2025", title: "Post 5", content: "Content of post 5" },
  { date: "27.03.2025", title: "Post 6", content: "Content of post 6" },
  { date: "28.03.2025", title: "Post 7", content: "Content of post 7" },
  { date: "29.03.2025", title: "Post 8", content: "Content of post 8" },
  { date: "30.03.2025", title: "Post 9", content: "Content of post 9" },
  { date: "31.03.2025", title: "Post 10", content: "Content of post 10" },
  { date: "01.04.2025", title: "Post 11", content: "Content of post 11" },
];

function displayPosts() {
    const container = document.getElementById("announcements-container");
    container.innerHTML = "";

    // Берем только 3 последних поста
    const latestPosts = posts.slice(-3);

    latestPosts.forEach(post => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <span class="date">${post.date}</span>
            <div class="card-header"><h3 class="card-title">${post.title}</h3></div>
            <div class="card-body"><p class="card-text">${post.content}</p></div>
        `;
        container.appendChild(card);
    });
}

// Вызываем загрузку постов при загрузке страницы
document.addEventListener("DOMContentLoaded", displayPosts);
