///////////////////////////////////////////////////////////////////////////////
//  MASTER JS
//
//
//
//  INFORMATION
//  Project.................Memory Game
//  Purpose.................Udacity Front-End Nanodegree Program
//                          Project 2
//  Creator.................Ryan Delk
//  Last Change.............June 5, 2018
//
//
//
//  CONTENTS
//  1. INITIALIZATION
//    a. Ready..............Functions to call on $(document).ready
//    b. Start..............Functions to start the game
//    c. Reset..............Reset current game
//
//  2. SQUARES
//    a. Matching...........Functions to determine matches
//    b. Styling............Functions to style the squares upon interaction
//
//  3. SCORING
//    a. Stars..............Functions to decrement stars
//    b. Timer..............Functions to time the current game
//    c. Win................Declare when game is won
//
//
//
//  NOTES
//    To jump to a specific section, search (CTRL + F) for the
//    section's primary heading number, followed by its
//    subsection's letter.
//
//    e.g. Search for "2b" to go to the Squares/Styling section
//
///////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////
//  1a. Ready
///////////////////////////////////////

// Variables
const arrIcons = ['burn', 'burn', 'infinity', 'infinity', 'moon', 'moon', 'skull', 'skull', 'code-branch', 'code-branch', 'terminal', 'terminal', 'crow', 'crow', 'seedling', 'seedling'];
let $deck = $('.deck'),
  $moves = $('.moves'),
  $movesLabel = $('.moves-label'),
  $reset = $('.fa-redo'),
  $timer = $('.timer'),
  $timerLabel = $('.timer-label'),
  arrIconsOpen = [],
  movesCount = 0,
  paused = false,
  started = false,
  timeCount = 0;

// Run after the page has finished loading
$(document).ready(function () {

  // Call function to create game elements
  init();

  // Reset the game when button is clicked
  $reset.click(resetGameWarning);
});



///////////////////////////////////////
//  1b. Start
///////////////////////////////////////

// Call functions to enable game functionality, establish global variables
function init() {

  // Squares need to exist before their classes can be selected
  createSquares();

  // Variables for selectors that can only be called after squares are created
  let $square = $('.square');

  // Enable functionality for square interaction
  hoverSquare();
  $square.click(flipSquares);

  // Properties for "Reset" and "Win" dialog boxes
  vex.defaultOptions.className = 'vex-theme-default';
  vex.dialog.buttons.YES.text = 'Yes';
  vex.dialog.buttons.NO.text = 'No';
};

// Shuffle the icons, then create li items ($('.square')) for each
function createSquares() {
  let icons = shuffle(arrIcons);
  for (let icon of icons) {
    $deck.append($('<li class="col-3 p-3"><div class="square p-3 d-flex align-items-center justify-content-center animated"><i class="fas fa-' + icon + '"></i></div></li>'));
  };
};

// Function to shuffle array items
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



///////////////////////////////////////
//  1c. Reset
///////////////////////////////////////

// Reset game to initialization state
function resetGame() {
  $deck.empty();
  movesCount = -1;
  moveCounter();
  paused = false;
  $timerLabel.html('Seconds');
  $('.far.fa-star').toggleClass('fas far');
  arrIconsOpen = [];
  resetTimer();
  init();
};

// Modal dialog to confirm reset
function resetGameWarning() {
  paused = true;

  vex.dialog.confirm({
    message: `Are you sure you wish to reset?`,
    callback: function (value) {
      if (value) {
        resetGame();
      } else {
        paused = false;
      }
    }
  });
};



///////////////////////////////////////
//  2a. Matching
///////////////////////////////////////

//  Check if the two open squares match
function checkMatch() {

  // If the array elements are the same
  if (arrIconsOpen[0] === arrIconsOpen[1]) {
    $deck.find('.open').removeClass('open show flipInY shake').addClass('match rubberBand');
  } else {
    setTimeout(function () {
      $deck.find('.open').addClass('shake').removeClass('open show flipInY');
    }, 500);
  };

  // Increment move count
  moveCounter();

  // If all squares have been matched, win the game
  if ($('.match').length === 16) {
    winGame();
  };

  // Clear temp array
  arrIconsOpen = [];
};



///////////////////////////////////////
//  2b. Styling
///////////////////////////////////////

// When a square is clicked, do this stuff
function flipSquares() {

  // Working with currently clicked square
  let $this = $(this);

  // Traverse DOM element for this square's icon class
  let $thisClass = $this[0].firstChild.classList[1];

  // Prevent flipping over more than two cards at once
  if ($this.hasClass('open') || $this.hasClass('match') || $('.open').length === 2) {
    return;
  };

  // Start timer when first square is clicked
  if (started === false) {
    startTimer();
  };

  // If the temporary array doesn't yet have two items in it
  if (arrIconsOpen.length < 2) {
    $this.addClass('open show flipInY');

    // Add class of clicked square to the temp array
    arrIconsOpen.push($thisClass);
  };

  // If two squares have been flipped, check to see if they match
  if (arrIconsOpen.length === 2) {
    checkMatch();
  };
};

// Styling when hovering over a square that hasn't been flipped
function hoverSquare() {
  $('.square:not(.open)').hover(function () {
    $(this).toggleClass('square-hover');
  }, function () {
    $(this).toggleClass('square-hover');
  });
};


///////////////////////////////////////
//  3a. Stars
///////////////////////////////////////

// Change solid star icon class to outlined version when a star is removed
function removeStar() {
  let $star = $('.fas.fa-star:last');
  $star.toggleClass('fas far');

  // // Get current star count
  // let starCount = $('.fas.fa-star').length;
};

// Increment moves
function moveCounter() {

  // Increase move count by one
  movesCount++;

  // Grammar check so score doesn't read "1 Moves"
  if (movesCount === 1) {
    $movesLabel.html('Move');
  } else {
    $movesLabel.html('Moves');
  }

  // Star removal when specific move counts are hit
  switch (movesCount) {
    case 15:
      removeStar();
      break;
    case 20:
      removeStar();
      break;
    default:
      break;
  }

  // Update page display of move count
  $moves.html(movesCount);
};



///////////////////////////////////////
//  3b. Timer
///////////////////////////////////////

// Start the timer
function startTimer() {

  // Increment the counter every second
  timeCountVar = setInterval(function () {

    // Only increment if the game isn't "paused" (a modal window is open)
    if (paused === false) {
      timeCount++;

      // Grammar check so timer doesn't read "1 Seconds"
      if (timeCount === 1) {
        $timerLabel.html('Second');
      } else {
        $timerLabel.html('Seconds');
      }
      $timer.html(timeCount);
    }
  }, 1000);

  // Game has been started
  started = true;
};

// Clear the timer when game is reset
function resetTimer() {
  started = false;
  timeCount = 0;
  $timer.html(timeCount);

  clearInterval(timeCountVar);
};



///////////////////////////////////////
//  3c. Win
///////////////////////////////////////

// Modal dialog to announce that game has been won
function winGame() {

  // Pause the timer
  paused = true;

  // Reach for the stars
  let starCount = $('.fas.fa-star').length;

  // Announcement and option to reset
  vex.dialog.confirm({
    // message: 'You win with ' + (3 - $('.star').length) + ' or ' + starCount + ' stars',
    unsafeMessage: `<div class="text-center"><p>Way to go!</p>` +
      `<p>You just won the game with ${starCount}/3 star rating.</p>` +
      `<p>It took you ${timeCount} seconds to complete.</p>` +
      `<p>Would you like to play again?</p></div>`,
    callback: function (value) {
      if (value) {
        resetGame();
      }
    }
  });
};