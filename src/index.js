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

// diplay all the titles
function displayTitles(posts) {
    const titleContainer = document.getElementById("title-list");
    // console.log(titleContainer);
    titleContainer.innerHTML = ""; // Clear previous content

    posts.forEach(posts => {
        const titleLi = document.createElement("li");
        titleLi.classList.add("title-item");
        titleLi.textContent = posts.title;

        titleContainer.appendChild(titleLi);
    })
}

displayPosts();