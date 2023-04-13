// Get the search query from the Google search page
const query = document.querySelector('input[name="q"]').value;

// Create a card element to display the API results
const card = document.createElement("div");
card.classList.add("card");
const title = document.createElement("h1");
title.textContent = "Your searched question is: " + query;
card.appendChild(title);

// Make a request to the OpenAI API to get results for the search query
const apiKey = "your_openai_api_key_here";
const url = "https://api.openai.com/v1/completions";
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${apiKey}`,
};
const data = JSON.stringify({
  prompt: query,
  temperature: 0.5,
  max_tokens: 100,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
});
fetch(url, { method: "POST", headers: headers, body: data })
  .then((response) => response.json())
  .then((data) => {
    // Display the API results in the card element
    const p = document.createElement("p");
    p.textContent = data.choices[0].text;
    card.appendChild(p);

    // Insert the card element at the top of the search page
    const searchResults = document.querySelector("#search");
    searchResults.insertBefore(card, searchResults.firstChild);
  })
  .catch((error) => {
    console.error(error);
    const p = document.createElement("p");
    p.textContent = "Error retrieving results from OpenAI API.";
    card.appendChild(p);

    // Insert the card element at the top of the search page
    const searchResults = document.querySelector("#search");
    searchResults.insertBefore(card, searchResults.firstChild);
  });
