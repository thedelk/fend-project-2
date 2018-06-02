//  Variables
const arrIcons = ['fire', 'fire', 'leaf', 'leaf', 'cube', 'cube', 'anchor', 'anchor', 'code', 'code', 'bolt', 'bolt', 'bomb', 'bomb', 'diamond', 'diamond'];
let arrIconsOpen = [];
let $deck = $('.deck');
let moves = 0;


//////////////////////////////////////////////////////////////////////
//  COMPLETE
//////////////////////////////////////////////////////////////////////

//  Create squares
function createSquares() {
  let icons = shuffle(arrIcons);
  for (let icon of icons) {
    $deck.append($('<li class="col-3 p-3"><div class="square p-3 animated"><i class="fa fa-' + icon + '"></i></div></li>'));
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
    setTimeout(function() {
      $deck.find('.open').removeClass('open show flipInY');
    }, 600);
  }
  arrIconsOpen = [];
  moveCounter();
};



function removeStar() {
  let $star = $('.fa-star:last');
  $star.toggleClass('fa-star fa-star-o');
};



// Increment moves
function moveCounter() {
  moves++;

  if (moves === 1) {
    $('.moves-label').html('Move');
  } else {
    $('.moves-label').html('Moves');
  }

  if (moves === 10 || moves === 15) {
    removeStar();
  }

  $('.moves').html(moves);
};



//  Document ready - initialize
function init() {
  $deck.empty();
  createSquares();
  hoverSquare();
  $('.square').click(flipSquares);
};

$(document).ready(function () {
  init();
})