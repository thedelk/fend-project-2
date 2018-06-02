//  Variables
const arrIcons = ['burn', 'burn', 'infinity', 'infinity', 'moon', 'moon', 'skull', 'skull', 'code-branch', 'code-branch', 'terminal', 'terminal', 'crow', 'crow', 'seedling', 'seedling'];
let arrIconsOpen = [];
let $deck = $('.deck');
// let $matches = $('.match').length / 2;
let $moves = $('.moves');
let $movesLabel = $('.moves-label');
let $reset = $('.fa-redo');
let movesCount = 0;


//////////////////////////////////////////////////////////////////////
//  COMPLETE
//////////////////////////////////////////////////////////////////////

//  Create squares
function createSquares() {
  let icons = shuffle(arrIcons);
  for (let icon of icons) {
    $deck.append($('<li class="col-3 p-3"><div class="square p-3 d-flex align-items-center justify-content-center animated"><i class="fas fa-' + icon + '"></i></div></li>'));
  }
};

//  Shuffle icons
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



//////////////////////////////////////////////////////////////////////
//  WORKING
//////////////////////////////////////////////////////////////////////

function hoverSquare() {
  $('.square:not(.open)').hover(function () {
    $(this).toggleClass('square-hover');
    // $(this).css('transform', 'scale(1.04)');
  }, function () {
    $(this).toggleClass('square-hover');
    // $(this).css('transform', 'scale(1)');
  });
};



//  Flip squares
function flipSquares() {
  let $this = $(this);
  let $thisClass = $this[0].firstChild.classList[1];

  //  Prevent flipping over more than two cards at once
  if ($this.hasClass('open') || $this.hasClass('match') || $('.open').length === 2) {
    return;
  }

  if (arrIconsOpen.length < 2) {
    $this.addClass('open show flipInY');
    arrIconsOpen.push($thisClass);
  }

  if (arrIconsOpen.length === 2) {
    checkMatch();
  }
};



//  Check if squares match
function checkMatch() {


  if (arrIconsOpen[0] === arrIconsOpen[1]) {
    $deck.find('.open').removeClass('open show flipInY shake').addClass('match rubberBand');
  } else {
    $deck.find('.open').addClass('shake');
    setTimeout(function () {
      $deck.find('.open').removeClass('open show flipInY');
    }, 600);
  }

  let $matches = $('.match').length / 2;

  if ($matches === 2) {
    console.log('entered wincon if statement: ' + $matches);
    winGame();
  }
  arrIconsOpen = [];
  moveCounter();
};



function winGame() {
  let starCount = $('.fas.fa-star').length;
  vex.dialog.confirm({
    message: `Way to go! You just won the game with ${starCount}/3 star rating. Do you want to play again?`,
    callback: function (value) {
      if (value) {
        resetGame();
      }
    }
  });
}



function removeStar() {
  let $star = $('.fas.fa-star:last');
  $star.toggleClass('fas far');
};



// Increment moves
function moveCounter() {
  movesCount++;

  console.log(movesCount);

  switch (movesCount) {
    case 1:
      console.log('Case 1: ' + $movesLabel.html());
      $movesLabel.html('Move');
      break;
    case 3:
      removeStar();
      break;
    case 6:
      removeStar();
      break;
    case 25:
      removeStar();
      break;
    default:
      $movesLabel.html('Moves');
  }

  // if (movesCount === 1) {
  //   $movesLabel.html('Move');
  // } else {
  //   $movesLabel.html('Moves');
  // }

  // if (movesCount === 3 || movesCount === 6 || movesCount === 25) {
  //   removeStar();
  // }

  $moves.html(movesCount);
};

function resetGameWarning() {
  vex.dialog.confirm({
    message: `Are you sure you wish to reset?`,
    callback: function (value) {
      if (value) {
        resetGame();
      }
    }
  });
};

function resetGame() {
  $deck.empty();
  movesCount = -1;
  moveCounter();
  console.log('resetGame after moveCounter ' + movesCount);
  $('.far.fa-star').toggleClass('fas far');
  arrIconsOpen = [];
  init();
};



//  Document ready - initialize
function init() {
  createSquares();

  let $square = $('.square');

  hoverSquare();
  $square.click(flipSquares);
  vex.defaultOptions.className = 'vex-theme-default';
  vex.dialog.buttons.YES.text = 'Yes';
  vex.dialog.buttons.NO.text = 'No';
};

$(document).ready(function () {
  init();
  $reset.click(resetGameWarning);
});