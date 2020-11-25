const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Show Loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loader
function complete() {
  if (!loading.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Get Quote from API
async function getQuote() {
  loading();
  const proxyUrl = 'https://whispering-tor-04671.herokuapp.com/';
  // const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  // const apiURL =
  //   'https://thesimpsonsquoteapi.glitch.me/quotes?method=getQuote&lang=en&format=json';
  const apiURL =
    'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  // const apiURL = 'https://thesimpsonsquoteapi.glitch.me/quotes?count=num';

  try {
    const response = await fetch(proxyUrl + apiURL);
    const data = await response.json();
    // If author is blank add 'Unknown
    if (data.quoteAuthor === '') {
      authorText.innerText = 'Unknown';
    } else {
      authorText.innerText = data.quoteAuthor;
    }
    // Reduce font size for long quotes
    if (data.quoteText.length > 120) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = data.quoteText;
    // Stop Loader, Show Quote
    complete();
  } catch (e) {
    // Catch Error Here
    getQuote();
  }
}

// Twitter Post Quote Function
function twitterTweet() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const tweetUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(tweetUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', twitterTweet);

// On Load
getQuote();

// https://thesimpsonsquoteapi.glitch.me/quotes

// https://thesimpsonsquoteapi.glitch.me/quotes?count=num
