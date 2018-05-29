$(document).ready(function () {

    /*
     * Create a list that holds all of your cards
     */
    const icons = ['fire', 'fire', 'leaf', 'leaf', 'cube', 'cube', 'anchor', 'anchor', 'code', 'code', 'bolt', 'bolt', 'bomb', 'bomb', 'diamond', 'diamond'];

    const $deck = $('.deck');
    /*
     * Display the cards on the page
     *   - shuffle the list of cards using the provided "shuffle" method below
     *   - loop through each card and create its HTML
     *   - add each card's HTML to the page
     */

    // Shuffle function from http://stackoverflow.com/a/2450976
    function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    /*
     * set up the event listener for a card. If a card is clicked:
     *  - display the card's symbol (put this functionality in another function that you call from this one)
     *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
     *  - if the list already has another card, check to see if the two cards match
     *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
     *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
     *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
     *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
     */




    function begin() {
        let allCards = shuffle(icons);
        $deck.empty();

        // The game starts with no matching cards and zero moves
        match = 0;
        moves = 0;
        // $moves.text('0');

        // A for loop creates 16  <li> tags with the class of card for every <i> tag
        // A class of fa fa- and a name of each object from the objects=[] array
        for (let i = 0; i < allCards.length; i++) {
            $deck.append($('<li class="col-3 p-2"><div class="cards p-4"><i class="fa fa-' + allCards[i] + '"></i></div></li>'))
        }
    }

    begin();

})