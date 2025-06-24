 document.addEventListener("DOMContentLoaded", () => {
    // Initialize the posts array
    let posts = [];

    // Fetch and display posts & / Add event listener for new post submission
    displayPosts();
    addNewPostListener();
 })

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
    const titleContainer = document.getElementById("post-list");
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
    postContainer.innerHTML = "";

    const postElement = document.createElement("div");
    postElement.classList.add("post");

    postElement.innerHTML = `
        <h2>${posts.title}</h2>
        <p><strong>Author:</strong> ${posts.author}</p>
        <img src="${posts.image}" alt="${posts.title}" class="post-image">
        <p>${posts.content}</p>
    `;

    postContainer.appendChild(postElement);
}


// Add event listener to the form submission
// Add a new blog post. Attach a submit event listener to the form with the ID of new-post-form

function addNewPostListener() {
    const newPostForm = document.getElementById("new-post-form");
    newPostForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const title = document.getElementById("input-title").value;
        const author = document.getElementById("input-author").value;
        const content = document.getElementById("input-content").value;
        const image = document.getElementById("input-image").value;

        const newPost = {title, author, content, image};

        fetch("http://localhost:3000/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body:JSON.stringify(newPost)
        })
        .then(res => res.json())
        .then(addedPost => {
        posts.push(addedPost);
        displayTitles(posts);
        // Load the new post details
        handlePostClick(addedPost);
        // Reset the form after submission
        newPostForm.reset();
});
        
    })
}
