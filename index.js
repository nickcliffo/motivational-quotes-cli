const axios = require("axios");

// local backup quotes in case the API fails
const localQuotes = [
  {
    q: "The future depends on what you do today.",
    a: "Mahatma Gandhi",
  },
  {
    q: "Success is the sum of small efforts, repeated day in and day out.",
    a: "Robert Collier",
  },
  {
    q: "Believe you can and you're halfway there.",
    a: "Theodore Roosevelt",
  },
  {
    q: "The only way to do great work is to love what you do.",
    a: "Steve Jobs",
  },
];

async function getQuote() {
  const url = "https://zenquotes.io/api/random";

  try {
    const response = await axios.get(url);

    
    const data = response.data;

    if (Array.isArray(data) && data.length > 0) {
      const quoteObj = data[0];
      const quoteText = quoteObj.q;
      const quoteAuthor = quoteObj.a;

      console.log("Here's a motivational quote for you:\n");
      console.log(`"${quoteText}" - ${quoteAuthor}`);
    } else {
      // If the response structure is unexpected, fall back to local quote
      showFallbackQuote();
    }
  } catch (error) {
    // If API call fails, either log the simple message
    console.log("Could not fetch a quote. Try again later.");

    showFallbackQuote();
  }
}

function showFallbackQuote() {
  if (!localQuotes.length) return; 

  const randomIndex = Math.floor(Math.random() * localQuotes.length);
  const fallback = localQuotes[randomIndex];

  console.log("\n(Here's a backup quote instead:)");
  console.log(`"${fallback.q}" - ${fallback.a}`);
}

getQuote();
