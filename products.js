document.addEventListener('DOMContentLoaded', () => {
        const postsContainer = document.getElementById('posts-container');
        const paginationContainer = document.getElementById('pagination');
        const POSTS_PER_PAGE = 3;
        let currentPage = 1;
        let posts = [];

        function displayPosts(page) {
            postsContainer.innerHTML = '';

            const start = (page - 1) * POSTS_PER_PAGE;
            const end = start + POSTS_PER_PAGE;
            const pagePosts = posts.slice(start, end);

            if (pagePosts.length === 0) {
                postsContainer.innerHTML = '<p>Not Products Yet.</p>';
                return;
            }

            pagePosts.forEach(post => {
                const postCard = document.createElement('div');
                postCard.classList.add('post-card');
                postCard.setAttribute('data-id', post.id);
                postCard.innerHTML = `
                    <h3>${post.title}</h3>
                    <p class="author-date">${post.author}</p>
                    <div class="post-image-container">
                        <img src="${post.image}" alt="${post.title}" style="max-width: 100%; height: auto;">
                    </div>
                    <p class="post-excerpt">${post.description}</p>
                `;
                postsContainer.appendChild(postCard);
            });
        }

        function createPaginationButtons(totalPages) {
            paginationContainer.innerHTML = '';

            for (let i = 1; i <= totalPages; i++) {
                const btn = document.createElement('button');
                btn.textContent = i;
                btn.classList.toggle('active', i === currentPage);

                btn.addEventListener('click', () => {
                    currentPage = i;
                    displayPosts(currentPage);
                    createPaginationButtons(totalPages);
                });

                paginationContainer.appendChild(btn);
            }
        }

        function loadPosts() {
            const storedPosts = localStorage.getItem('products');
            if (storedPosts) {
                posts = JSON.parse(storedPosts);
                const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
                displayPosts(currentPage);
                createPaginationButtons(totalPages);
            } else {
                postsContainer.innerHTML = '<p>Not Products Yet</p>';
            }
        }

        loadPosts();
    });