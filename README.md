# Simple Blog Manager
## By **Cynthia Mugo** | June, 2025

## Description
Welcome to the **Simple Blog Manager** – a delightful single-page application where recipes meet functionality! This is your cozy corner for managing and browsing blog posts that are all about one thing: **glorious food**.


## Features
- JSON Server API: Fetches and posts data using json-server
- Dynamic Sidebar: Automatically updates with each blog post title.
- Instant Display: Click a title to view the full blog post.
- Create Blog Posts: Add a title, author, image, and content using the form.

## Built with
- **HTML** – Markup structure
- **CSS** – Flexbox for layout and styling
- **JavaScript** (ES6) – DOM manipulation and fetch API
- **json-server** – Local REST API for data handling

## JSON Structure

Sample `db.json`:

```json
{
  "posts": [
    {
      "id": 1,
      "title": "This Spicy Mango Salsa Changed My Taco Nights Forever",
      "content": "This salsa is a vibrant fusion of sweet mangoes and fiery chilies...",
      "author": "Cynthia Mugo",
      "image": "https://www.themealdb.com/images/media/meals/uwxqwy1483389553.jpg"
    }
  ]
}
```
## How to use
1. Clone the repo
```
git clone https://github.com/CynthiaMugo/simple-blog-manager.git
cd simple-blog-manager
```
2. Install and Run json-server
```
npm install -g json-server
json-server --watch db.json
```
3. Open index.html in your browser and start posting!

# MVP Goals
1. Fetch all blog posts and display titles dynamically

2. Display post details on title click

3. Add a new post using a form and POST it to the API

4. Automatically update UI without refreshing

## Known Bugs
There are currently no known bugs.
If you encounter any issues or have suggestions for improvements, feel free to open an issue or create a pull request.

## Support and contact details
If you’d like to contribute or have questions, you can reach out via:
GitHub: @cynthiamugo

### License
MIT License

Copyright (c) 2025 Cynthia Mugo

