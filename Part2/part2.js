//1. Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).
//https://deckofcardsapi.com/

async function drawOneCard() {
    let response = await axios.get('https://deckofcardsapi.com/api/deck/new/draw/?count=1');
    console.log(response)
    let value = response.data.cards[0].value;
    let suit = response.data.cards[0].suit;
    console.log(`${value} of ${suit}`)
}

drawOneCard();

//2. Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the **same** deck.  Once you have both cards, ***console.log*** the values and suits of both cards.

async function drawTwoCards() {
    let responseDeck = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
    console.log(responseDeck);
    let deckID = responseDeck.data.deck_id;
    console.log(deckID);
    let response1 = await axios.get(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`);
    let value1 = response1.data.cards[0].value;
    let suit1 = response1.data.cards[0].suit;
    let response2 = await axios.get(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`);
    let value2 = response2.data.cards[0].value;
    let suit2 = response2.data.cards[0].suit;
    console.log(`${value1} of ${suit1} and ${value2} of ${suit2}`)
}

drawTwoCards();

//3. Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.

let btn = $('button')
let div = $('div')
let deckid = ''
async function getDeck() {
    let resp = await axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`);
    deckid = resp.data.deck_id;
    console.log(deckid)
}

getDeck();




async function drawCard() {
    //###################################
    btn.on('click', async function () {
        let response = await axios.get(`https://deckofcardsapi.com/api/deck/${deckid}/draw/?count=1`);
        let cardImage = response.data.cards[0].image;
        div.append(`<img src='${cardImage}'>`)
    
        if (response.remaining === 0) {
            btn.remove();
        };
    });
}

drawCard();
