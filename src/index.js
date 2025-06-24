 function displayPosts() {
    fetch("http://localhost:3000/posts")
    .then(response => {
        return(response.json())
    })
    .then(data => {
        posts = data;
        displayTitles(posts);
    })
    .catch(error => {
        console.error("Error fetching posts:", error);
    });
}

// display all the titles
function displayTitles(posts) {
    const titleContainer = document.getElementById("title-list");
    // console.log(titleContainer);
    titleContainer.innerHTML = ""; // Clear previous content

    posts.forEach(posts => {
        const titleLi = document.createElement("li");
        titleLi.classList.add("title-item");
        titleLi.textContent = posts.title;

        titleContainer.appendChild(titleLi);

        titleLi.addEventListener("click", () => handlePostClick(posts));
    })
}
// Click on a post title from the ul and see its details

function handlePostClick(posts) {
    const postContainer = document.getElementById("display-blog");
    postContainer.innerHTML = ""; // Clear previous content

    const postElement = document.createElement("div");
    postElement.classList.add("post");
    postElement.id = `post-${posts.id}`;

    postElement.innerHTML = `
        <img src="${posts.image}" alt="${posts.title}" class="post-image">
        <h2>${posts.title}</h2>
        <p>${posts.content}</p>
        <p><strong>Author:</strong> ${posts.author}</p>
    `;

    postContainer.appendChild(postElement);
}

displayPosts();