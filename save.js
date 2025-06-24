// Display all the posts
 function displayPosts() {
    fetch("http://localhost:3000/posts")
    .then(response => {
        return(response.json())
    })
    .then(data => {
        const postContainer = document.getElementById("display-blog");
      postContainer.innerHTML = ""; // Clear previous content

      data.forEach(post => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");
        postElement.id = `post-${post.id}`;

        postElement.innerHTML = `
          <img src="${post.image}" alt="${post.title}" class="post-image">
          <h2>${post.title}</h2>
          <p>${post.content}</p>
          <p><strong>Author:</strong> ${post.author}</p>
        `;

        postContainer.appendChild(postElement);
      });
    })
    .catch(error => {
      console.error("Error fetching posts:", error);
    });
}

displayPosts();