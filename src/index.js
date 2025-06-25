 let posts = [];
 document.addEventListener("DOMContentLoaded", () => {
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
        // See the details for the first post as soon as the page loads 
        if (posts.length > 0) {
            handlePostClick(posts[0]);
        } 
        // Update the number of posts displayed
        updatePostCount(posts);

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
        <button id="edit-button" data-id="${posts.id}">Edit</button>
        <button id="delete-button" data-id="${posts.id}">Delete</button>
    `;

    postContainer.appendChild(postElement);
    const deleteButton = document.getElementById("delete-button");
    deleteButton.addEventListener("click", () => {
        deletePost(posts.id);
    });
    const editButton = document.getElementById("edit-button");
    editButton.addEventListener("click", () => {
        editPost(posts);
    })
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

// Update the number of posts displayed
function updatePostCount(posts) {
    const postCountElement = document.getElementById("num-blogs");
    //console.log(postCountElement);
    postCountElement.textContent = `${posts.length} posts`;
}

// Delete a post by clicking the delete button
function deletePost(postId) {
    fetch(`http://localhost:3000/posts/${postId}`, {
    method: "DELETE"
  })
    .then(() => {
      // Remove from local array
      posts = posts.filter(post => post.id !== postId);
      displayTitles(posts);
      updatePostCount(posts);
      document.getElementById("display-blog").innerHTML = "";
    })
    .catch(error => {
      console.error("Error deleting post:", error);
    });
}

// Edit a post by clicking the edit button - chosen to use prompt
function editPost(post) {
    const newTitle = prompt("Edit Title:", post.title);
    const newContent = prompt("Edit Content:", post.content);
    const newAuthor = prompt("Edit Author:", post.author);
    const newImage = prompt("Edit Image URL:", post.image);

    if (newTitle && newContent && newAuthor && newImage) {
        const updatedPost = {
      title: newTitle,
      content: newContent,
      author: newAuthor,
      image: newImage
    };

    fetch(`http://localhost:3000/posts/${post.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(updatedPost)
    })
    .then(res => res.json())
    .then(updated => {
      const index = posts.findIndex(p => p.id === post.id);
      posts[index] = updated;

      displayTitles(posts);
      handlePostClick(updated);
    })
    .catch(error => {
      console.error("Error updating post:", error);
    });
    }
}