/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

// $(document).ready(function () {

/*
 * Create a list that holds all of your cards
 */
const icons = ['fire', 'fire', 'leaf', 'leaf', 'cube', 'cube', 'anchor', 'anchor', 'code', 'code', 'bolt', 'bolt', 'bomb', 'bomb', 'diamond', 'diamond'];

const $deck = $('.deck');
$open = $('.open');
// const $card = $('.cards');
let flipped = [];

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

function initialize() {
    let allIcons = shuffle(icons);
    $deck.empty();

    for (let icon of allIcons) {
        $deck.append($('<li class="col-3 p-3"><div class="cards p-3"><i class="fa fa-' + icon + '"></i></div></li>'));
    }

    flip();
};

function flip() {
    const $card = $('.cards');
    $card.click(function () {
        console.log($open);
        let $this = $(this);

        // if ($this.hasClass('show') || $this.hasClass('match')) {
        //     return true;
        //     console.log('Returned true');
        // }

        let card = $this.html();
        $this.addClass('open show');
        flipped.push(card);

        if (flipped.length > 1) {
            if (card === flipped[0]) {
                $('.open').addClass('match');
                setTimeout(function () {
                    $deck.find('.open').removeClass('open show');
                }, 420);
            } else {
                // $('.open').removeClass('open');
                setTimeout(function () {
                    $deck.find('.open').removeClass('open show');
                }, 210);
            }
            flipped = [];
        }

    })
}


initialize();

// })