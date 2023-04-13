// Find the search results container
const results = document.querySelector('#search');

// Get the search query from the search bar
const query = document.querySelector('input[name="q"]').value;

// Create the h1 element with the search query as its text content
const h1 = document.createElement('h1');
h1.textContent = query;

// Create the card element and append the h1 element to it
const card = document.createElement('div');
card.classList.add('card');
card.style.border = '1px solid #ccc'; // add a border
card.style.padding = '10px'; // add some padding
card.style.marginBottom = '20px'; // add spacing
card.appendChild(h1);

// Make a request to the ChatGPT API to get results for the search query
const url = `https://api.chatgpt.com/search?q=${encodeURIComponent(query)}`;
fetch(url)
  .then(response => response.json())
  .then(data => {
    // Display the API results in the card element
    const p = document.createElement('p');
    p.textContent = data.result;
    card.appendChild(p);
  })
  .catch(error => {
    console.error(error);
    const p = document.createElement('p');
    p.textContent = 'Error retrieving results from ChatGPT API.';
    card.appendChild(p);
  });

// Insert the card element before the search results
results.parentNode.insertBefore(card, results);
