// Base URL de la  NASA Imágenes
const apiUrl = 'https://images-api.nasa.gov/search';

document.getElementById('searchButton').addEventListener('click', async () => {
  const searchTerm = document.getElementById('searchInput').value.trim();
  if (!searchTerm) {
    alert('Please enter a search term');
    return;
  }

  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = '<p>Loading...</p>';

  try {
    const response = await fetch(`${apiUrl}?q=${encodeURIComponent(searchTerm)}&media_type=image`);
    if (!response.ok) {
      throw new Error('Failed to fetch data from NASA API');
    }
    const data = await response.json();
    displayResults(data.collection.items);
  } catch (error) {
    resultsContainer.innerHTML = `<p class="text-danger">Error: ${error.message}</p>`;
  }
});

function displayResults(items) {
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = '';

  if (!items || items.length === 0) {
    resultsContainer.innerHTML = '<p>No results found</p>';
    return;
  }

  items.forEach(item => {
    const imageUrl = item.links?.[0]?.href;
    const title = item.data?.[0]?.title || 'No title available';
    const description = item.data?.[0]?.description || 'No description available';

    const card = document.createElement('div');
    card.classList.add('col-md-4');

    card.innerHTML = `
      <div class="card">
        <img src="${imageUrl}" class="card-img-top" alt="${title}">
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text">${description}</p>
        </div>
      </div>
    `;
    resultsContainer.appendChild(card);
  });
}






