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

const postsPerPage = 10;
let currentPage = 1;

function displayPosts(page) {
    const container = document.getElementById("announcements-container");
    container.innerHTML = "";
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = Math.min(startIndex + postsPerPage, posts.length);
    const fragment = document.createDocumentFragment();
    for (let i = startIndex; i < endIndex; i++) {
        const post = posts[i];
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <span class="date">${post.date}</span>
            <div class="card-header">
                <h3 class="card-title">${post.title}</h3>
            </div>
            <div class="card-body">
                <p class="card-text">${post.content}</p>
            </div>
        `;
        fragment.appendChild(card);
    }
    container.appendChild(fragment);
}

function displayPagination() {
    const controls = document.getElementById("pagination-controls");
    controls.innerHTML = "";
    const totalPages = Math.ceil(posts.length / postsPerPage);
    const paginationDiv = document.createElement("div");
    paginationDiv.classList.add("pagination");
    
    const prevLink = document.createElement("a");
    prevLink.innerHTML = "&laquo;";
    prevLink.href = "#";
    prevLink.classList.toggle("disabled", currentPage === 1);
    prevLink.onclick = (event) => {
        event.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            updateUI();
        }
    };
    paginationDiv.appendChild(prevLink);
    
    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement("a");
        pageLink.textContent = i;
        pageLink.href = "#";
        if (i === currentPage) {
            pageLink.classList.add("active");
        }
        pageLink.onclick = (event) => {
            event.preventDefault();
            currentPage = i;
            updateUI();
        };
        paginationDiv.appendChild(pageLink);
    }
    
    const nextLink = document.createElement("a");
    nextLink.innerHTML = "&raquo;";
    nextLink.href = "#";
    nextLink.classList.toggle("disabled", currentPage >= totalPages);
    nextLink.onclick = (event) => {
        event.preventDefault();
        if (currentPage < totalPages) {
            currentPage++;
            updateUI();
        }
    };
    paginationDiv.appendChild(nextLink);
    
    controls.appendChild(paginationDiv);
}

function updateUI() {
    displayPosts(currentPage);
    displayPagination();
}

document.addEventListener("DOMContentLoaded", () => {
    updateUI();
});
