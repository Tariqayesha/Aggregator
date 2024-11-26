document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '612dbf002b934d019edf74d21da3325c'; // Replace with your NewsAPI key
    const categories = ['technology', 'sports', 'health', 'business', 'entertainment', 'science'];
    const userPreferences = {
        'technology': 3,
        'sports': 2,
        'health': 1,
        'business': 0,
        'entertainment': 0,
        'science': 0
    };

    // Function to fetch and display news for each category
    async function fetchAndDisplayNews(category) {
        const url = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${apiKey}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.articles) {
                displayNews(data.articles, category);
            }
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    }

    // Function to display news articles
    function displayNews(articles, category) {
        const newsContainer = document.getElementById('news-container');
        const categoryHeader = document.createElement('h2');
        categoryHeader.textContent = `${category.charAt(0).toUpperCase() + category.slice(1)} News`;
        newsContainer.appendChild(categoryHeader);

        articles.slice(0, 5).forEach(article => {
            const articleElement = document.createElement('div');
            articleElement.classList.add('news-article');
            articleElement.innerHTML = `
                <h2>${article.title}</h2>
                <p>${article.description || 'No description available.'}</p>
                <a href="${article.url}" target="_blank">Read more</a>
            `;
            newsContainer.appendChild(articleElement);
        });
    }

    // Sort categories based on user preferences and fetch news
    const sortedCategories = Object.entries(userPreferences)
        .sort((a, b) => b[1] - a[1])
        .map(entry => entry[0]);

    sortedCategories.forEach(category => {
        if (userPreferences[category] > 0) {
            fetchAndDisplayNews(category);
        }
    });
});
