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

/*
 * Create a list that holds all of your cards
 */
const iconsAll = ['fire', 'fire', 'leaf', 'leaf', 'cube', 'cube', 'anchor', 'anchor', 'code', 'code', 'bolt', 'bolt', 'bomb', 'bomb', 'diamond', 'diamond'];
let iconsOpen = [];

const $deck = $('.deck');

function flip() {
    $('.cards').click(function () {
        let $this = $(this);
        let card = $this.html();
        // console.log(card);

        if (iconsOpen.length < 2) {
            iconsOpen.push($this);
            $this.toggleClass('open show');
        }

        if (iconsOpen.length === 2) {
            // console.log(iconsOpen[0]);
            // console.log(iconsOpen[1]);
            checkMatch();
        }

        // if ($this.hasClass('show') || $this.hasClass('open')) {
        //     return true;
        // };

        // if (flipped.length < 2) {
        //     $this.toggleClass('open show');
        //     flipped.push($this);
        // }

        // if (flipped.length > 1) {
        //     if (card === flipped[0]) {
        //         setMatch($this);
        //     } else {
        //         setNotMatch($this);
        //     }
        //     flipped = [];
        // }
    })
};

function getClassFromCard(card){
    return card[0].firstChild.className;
}

function checkMatch() {
    // var childOne = getClassFromCard(iconsOpen[0]);
    // var childTwo = getClassFromCard(iconsOpen[1]);
    // console.log(childOne);
    // console.log(childTwo);

    console.log('Entered checkMatch');
    console.log(iconsOpen[0].firstChild.className);
    if (getClassFromCard(iconsOpen[0]) === getClassFromCard(iconsOpen[1])) {
    // if (iconsOpen[0] === iconsOpen[1]) {
        console.log('Confirmed match');
        $('.deck').find('.open').toggleClass('open show match');
    } else {
        console.log('No match');
        setTimeout(function() {
            $('.deck').find('.open').toggleClass('open show');
        }, 1000);
    }
    iconsOpen = [];
};

function setMatch($this) {
    $this.addClass('match').removeClass('open show flipInY');
};

function setNotMatch($this) {
    setTimeout(function () {
        $this.removeClass('open show rubberBand');
    }, 1000);
};

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
};

function createSquares() {
    let icons = shuffle(iconsAll);
    for (let icon of icons) {
        $deck.append($('<li class="col-3 p-3"><div class="cards p-3 animated"><i class="fa fa-' + icon + '"></i></div></li>'));
    }
};

function initialize() {
    $deck.empty();
    createSquares();
    flip();
};

$(document).ready(function () {
    initialize();
})