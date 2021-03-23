// Asynchronous Code in JavaScript

// Part 1: Number Facts
const number = 29;
const url = "http://numbersapi.com";

// 1. Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. (Make sure you get back JSON by including the json query key, specific to this API. Details.
axios.get(`${url}/${number}?json`)
    .then(res => $("#q1").append(`<li>${res.data.text}</li>`))
    .catch(err => console.log("ERROR!!", err));


// 2. Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.
axios.get(`${url}/1..3?json`)
    .then(res => $("#q2-1").append(`<li>${res.data[1]}</li><li>${res.data[2]}</li><li>${res.data[3]}</li>`))
    .catch(err => console.log("ERROR!!", err));

// 3. Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page.It’s okay if some of the facts are repeats.
axios.get(`${url}/${number}?json`)
    .then(res => {
        $("#q3-1").append(`<li>${res.data.text}</li>`);
        return axios.get(`${url}/${number}?json`);
    })
    .then(res => {
        $("#q3-2").append(`<li>${res.data.text}</li>`);
        return axios.get(`${url}/${number}?json`);
    })
    .then(res => {
        $("#q3-3").append(`<li>${res.data.text}</li>`);
        return axios.get(`${url}/${number}?json`);
    })
    .then(res => {
        $("#q3-4").append(`<li>${res.data.text}</li>`);
        return axios.get(`${url}/${number}?json`);
    })
    .catch(err => console.log("ERROR!!", err));


// Part 2: Deck of Cards
// 1. Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. Once you have the card, console.log the value and the suit(e.g.“5 of spades”, “queen of diamonds”).
let card_url = "https://deckofcardsapi.com/api/deck/new/draw/?count=1";
axios.get(card_url)
    .then(res => {
        $("#card-info").append(`<li>${res.data.cards[0].value} of ${res.data.cards[0].suit}</li>`);
        console.log(res.data.cards[0].value);
        console.log(res.data.cards[0].suit);
    })
    .catch(err => console.log("ERROR!!", err));

// 2. Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the same deck.
axios.get(card_url)
    .then(res => {
        $("#card-1").append(`<li>${res.data.cards[0].value} of ${res.data.cards[0].suit}</li>`);
        console.log(res.data.cards[0].value);
        console.log(res.data.cards[0].suit);
        return axios.get(card_url);
    })
    .then(res => {
        $("#card-2").append(`<li>${res.data.cards[0].value} of ${res.data.cards[0].suit}</li>`);
        console.log(res.data.cards[0].value);
        console.log(res.data.cards[0].suit);
        return axios.get(card_url);
    })
    .catch(err => console.log("ERROR!!", err));

// 3. Build an HTML page that lets you draw cards from a deck.When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card.Every time you click the button, display a new card, until there are no cards left in the deck
function createNewDeck() {
    let url = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
    axios.get(url)
        .then(res => {
            let deck_id = res.data.deck_id;
            $('.btn').click(function () {
                axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
                    .then(res => {
                        let image = res.data.cards[0].images.png;
                        let angle = Math.random() * 90 - 45;
                        let randomX = Math.random() * 40 - 20;
                        let randomY = Math.random() * 40 - 20;
                        $('#cardTable').append(
                            $(`<img src=${image} alt="Playing card" height="150" width="100" 
                    style="transform: translate(${randomX}px, ${randomY}px) rotate(${angle}deg)"</>`));
                        console.log(res.data.remaining);
                        if (res.data.remaining === 0) {
                            $('.btn').remove();
                        };
                    })
                    .catch(err => console.log("ERROR!!", err));

            });
        });
}

createNewDeck();