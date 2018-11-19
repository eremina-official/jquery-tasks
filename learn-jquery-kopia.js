$(document).ready(function() {
  'use strict';
  console.log('ready');

//toggle answers
  /* const toggleAnswersObj = {
    
    cacheDom: function() {
      this.$document = $(document);
      //console.log(this);
    },
    toggleAnswer: function() {
      //console.log(this);
      $(this).next().toggle();
    },
    bindEvent: function() { 
      this.$document.on('click', '.question', this.toggleAnswer);
    },
    init: function() {
      this.cacheDom();
      this.bindEvent();
    }
  }
  toggleAnswersObj.init(); */


const toggleAnswers = (function() {
  function toggleAnswer() {
  $(this).next().fadeToggle(400);
  }
  const $document = $(document);
  $document.on('click', '.question', toggleAnswer);
})();

//toggle colors
const toggleColors = (function() {

  const $pElem = $('#jq-toggle-color');
  $pElem.on('click', togglePElemColor);
  //console.log($pElem);
  //console.log($pElem.css('color'));
  function togglePElemColor() {
    if ($pElem.css('color') === 'rgb(0, 0, 0)') {
      $pElem.css('color', 'red');
    } else {$pElem.css('color', 'black');}
  }

  const $button = $('#jq-toggle-bg');
  const $sectionBg = $('#jq-section-bg');
  $button.on('click', toggleBg);
  function toggleBg() {
    if ($sectionBg.hasClass('bg-light')) {
      $sectionBg.removeClass('bg-light').addClass('bg-dark');
    } else {$sectionBg.removeClass('bg-dark').addClass('bg-light');}
  }
})();

//simple ToDo list
const simpleToDoList = (function() {
  //cache DOM
  const $newEntry = $('#new-entry');
  const $button = $('#add-entry-button');
  const $list = $('#list');
  const $document = $(document);

  //bind events
  $button.on('click', addNewEntry);
  $(document).on('click', '.remove-entry', removeEntry);

  function addNewEntry() {
    $list.append('<li class="">' + $newEntry.val() + '<span class="remove-entry">×</span></li>');
  }

  function removeEntry() {
    $(this).parent().remove();
  }
})();


//animation
const animationFromLeft = (function() {

  let $animatedFromLeft = $('.animated-from-left');
  
  $(window).on('scroll', animate);
  function animate() {
    //console.log(window.innerHeight);
    //console.log($animatedFromLeft.offset().top); relative to document!
    //console.log($animatedFromLeft.scrollTop());
    //console.log($('#list').scrollTop());
    //console.log($animatedFromLeft[0].getBoundingClientRect().top);
    if ($animatedFromLeft[0].getBoundingClientRect().top <= window.innerHeight * 0.99 && 
    $animatedFromLeft[0].getBoundingClientRect().top > 0) {
      //console.log('works');
      //$animatedFromLeft.animate({
      //  marginLeft: '0px'
      //}, 1000);
      $animatedFromLeft.addClass('active');
    }
   }
   if ($('.active').length > 0) {
     $(window).off('scroll', animate);
   }
})();

/* the same animation from left in pure JS
(function() {
const animatedBtns = document.querySelectorAll('.animated-from-left');
    function animateInViewport() {
      if (document.querySelectorAll('.active').length>0) return;
      for (const animatedBtn of animatedBtns) {
        if (animatedBtn.getBoundingClientRect().top <= window.innerHeight * 0.9
        && animatedBtn.getBoundingClientRect().top > 0) {
          animatedBtn.classList.add('active');
        }
      }
    }
window.onscroll = function() {
  animateInViewport();
}
})(); */

//Grid random color
const randomColor = (function() {
  //cache DOM
  const $gridContainer = $('#grid-container');
  let $gridContainerItems = $('.grid-container__item');
  let $rgbText = $('.grb-text');
  //bind events
  $gridContainer.on('click', changeGridItemBg);
  function getRandomNumber() {
    return Math.floor(Math.random() * 256);
  }
  //function declarations
  /* try to make makeRGB() function with for loop and with recursion */
  function makeRGB() {
    let i = 0;
    let rgb = getRandomNumber();
    //console.log(rgb);
    do {
      i = i + 1;
      let rgbNumber = ", " + getRandomNumber();
      rgb = rgb + rgbNumber;    
    } while (i < 2);
    return rgb;
    //console.log(rgb);
  }

  function changeGridItemBg() {
    $gridContainerItems.each(function(index) {
    let randomRGB = 'background-color:rgb(' + makeRGB() + ')';
    //console.log(randomRGB);
    $(this).attr({style: randomRGB});
    $(this).find('p').text(randomRGB);
    });
  }
})();


//scrollable image gallery with fixed width
const modal = (function() {
//cache DOM
const $imageGallery = $('#img-gallery');
const $arrowBackwards = $('#arrow-backwards');
const $arrowForwards = $('#arrow-forwards');
let $imageGalleryItems = $('.img-gallery__item');
const $modal = $('#modal');
let scrollWidth = $('#img-gallery-container').width();
//const fixedContainerWidth = 700;
let $imageGalleryFullWidth = 0;
let counter = 0;
const $modalImage = $('#modal-image');
const $modalImages = $('#modal-image img');
const $modalArrowBackwards = $('#modal-arrow-backwards');
const $modalArrowForwards = $('#modal-arrow-forwards');
//console.log($('#img-gallery div'));
//console.log($imageGallery.width());
//console.log($($imageGalleryItems[1]).width());
//console.log($('#img-gallery-container').width());

//bind events
$arrowBackwards.on('click', moveBackwards);
$arrowForwards.on('click', moveForwards);
$(document).on('keyup', moveBackwardsOnKey);
$(document).on('keyup', moveForwardsOnKey);
$(document).on('keyup', modalOnKey);
$(document).on('click', '.img-gallery__item img', showModal);
$(document).on('click', '#btn-close-modal', closeModal);
$modalArrowBackwards.on('click', moveModalBackwards);
$modalArrowForwards.on('click', moveModalForwards);
//window.addEventListener('resize', resizeImageGallery);

//function declarations for scrollable gallery

/* this function was used when the image gallery was moved with margin-left property
function resizeImageGallery() {
  $imageGallery.animate({'margin-left': '0px'}, 300);
  //console.log('resize');
  counter = 0;
  $imageGalleryFullWidth = 0;
  currentWidth = findWidth();
  currentStep = findStep();
  currentModulus = findModulus();
} */
function findWidth() {
  for (let i = 0; i < $imageGalleryItems.length; i++) {
    /*$imageGalleryItem[i] is not a jQuery object but a DOM element, therefore we have to wrap it as jQuery object to be able to call width() */
    $imageGalleryFullWidth = $imageGalleryFullWidth + $($imageGalleryItems[i]).width();
  }
  let $imageGalleryWidth = $imageGalleryFullWidth - $('#img-gallery-container').width();
  return $imageGalleryWidth;
}
let currentWidth = findWidth();

function findStep() {
   console.log(currentWidth);
  let stepNumber = Math.floor(currentWidth / +scrollWidth);
  //console.log(stepNumber);
  return stepNumber;
  /* return {
    stepNumber: stepNumber,
    modulusStepLength: modulusStepLength
  }; */
};
function findModulus() {
    //console.log($imageGalleryWidth);
  let modulusStepLength = currentWidth % +scrollWidth;
  let modulusStepLengthPercent = modulusStepLength * 100 / scrollWidth;
    console.log(modulusStepLength);
    console.log(modulusStepLengthPercent);
  return modulusStepLengthPercent;
};
let currentStep = findStep();
let currentModulus = findModulus();

let runCounter = function(arg) {
  counter = counter + arg;
  //console.log(counter);
  return counter;
}
function moveForwards() {
  if (counter === currentStep + 1) {
    //console.log('14+1 calculated');
    return;
  }
  if (counter === currentStep) {
    $imageGallery.animate({'left': '-='+currentModulus + '%'}, 300);
    //console.log('small 15 step');
    runCounter(+1);
    return;
  }
  runCounter(+1);
  //console.log('big step f +1');
  $imageGallery.animate({'left': '-=100%'}, 300);
}
function moveBackwards() {
  if (counter === 0) {
    //console.log('no move to left');
    return;
  }
  if (counter === 1) {
    $imageGallery.animate({'left': '+='+currentModulus + '%'}, 300);
    //console.log('small 15 step');
    runCounter(-1);
    return;
  }
  runCounter(-1);
  //console.log('big step b -1');
  $imageGallery.animate({'left': '+=100%'}, 300);
}
function moveForwardsOnKey(event) {
  if ($('#img-gallery:hover').length > 0 && event.which == 39) {
  //console.log('movebackwardsonkey');
    moveForwards();
  }
}
function moveBackwardsOnKey(event) {
  if ($('#img-gallery:hover').length > 0 && event.which == 37) {
    moveBackwards();
  }
}

//function declarations for modal
function showModal() {
  $modal.removeClass('modal-hidden').addClass('modal-active');
  let $activeImage = $('.image-active');
  let imageIndex = $('.img-gallery__item img').index($(this));
  let $modalImageIndex = $modalImages.eq(imageIndex);
  $activeImage.removeClass('image-active');
  $modalImageIndex.addClass('image-active');
  adjustModalSize();
  //let clickedImage = $(this).html();
  //console.log(clickedImage);
  //$('#modal-image').html(clickedImage);
}
function closeModal() {
  $modal.removeClass('modal-active').addClass('modal-hidden');
}
function moveModalBackwards() {
  let $activeImage = $('.image-active');
  let $firstImage = $modalImages.filter(':first');
  if ($activeImage.is($firstImage)) {
    return;
  } else {
    $activeImage.removeClass('image-active').prev().addClass('image-active');
    adjustModalSize();
  }
}
function moveModalForwards() {
  let $activeImage = $('.image-active');
  let $lastImage = $modalImages.filter(':last');
  /* the $() function always creates a new object, therefore the equality check(===) will not work in the if loop. The .is() function does not create a new object, but allows to test the content of jQuery object without modification. */
  if ($activeImage.is($lastImage)) {
    return;
  } else {
    $activeImage.removeClass('image-active').next().addClass('image-active');
    adjustModalSize();
  }
}
function modalOnKey(event) {
  if ($modal.hasClass('modal-active') && event.which == 39) {
    moveModalForwards();
  }
  if ($modal.hasClass('modal-active') && event.which == 37) {
    moveModalBackwards();
  } 
}
function adjustModalSize() {
  let $activeImage = $('.image-active');
  let currentModalWidth = $activeImage.css('width');
  let currentModalHeight = $activeImage.css('height');
  $modalImage.css({
    width: currentModalWidth,
    height: currentModalHeight
  });
}
})();


/* slideshow image gallery */
const slideshowGallery = (function() {
//cache DOM
const $slideshow = $('#slideshow');
const $slideshowGalleryContainer = $slideshow.find('#slideshow__gallery__container');
const $arrowPrevious = $slideshow.find('#arrow-previous');
const $arrowNext = $slideshow.find('#arrow-next');
let $mainImage = $slideshow.find('#main-image');
let images = $('.slideshow-image');
let counter = 0;

//bind events
$arrowPrevious.on('click', moveGallery);
$arrowNext.on('click', moveGallery);
images.on('click', showCurrentImage);

//function declarations
function findSlideScroll() {
  let slideWidth = 160;
  if ($('#slideshow').width() < 600) {
    slideWidth = 260;
  }
  return slideWidth;
}
let slideScroll = findSlideScroll();
function findScrollNumber() {
  let number = 6;
  if ($('#slideshow').width() < 600) {
    number = 5;
  }
  return number;
}
let scrollNumber = findScrollNumber();

function moveGallery() {
  if ($(this).is($arrowPrevious) && counter > 0) {
    $slideshowGalleryContainer.animate({'margin-left': '+='+slideScroll}, 300);
    counter = counter - 1;
  }
  if ($(this).is($arrowNext) && counter < scrollNumber) {
    $slideshowGalleryContainer.animate({'margin-left': '-='+slideScroll}, 300);
    counter = counter + 1;
    //console.log(counter);
  }
}
function showCurrentImage() {
  //let $clickedImage = $(this).index();
  let clickedImageSrc = $(this).attr('src');
  $mainImage.attr('src', clickedImageSrc);
}

/* The problem with this approach is that when clicking on arrows very fast the gallery does not stop scrolling
function moveGallery() {
  let marginLeft = parseInt($slideshowGalleryContainer.css('margin-left'), 10);
  if ($(this).is($arrowPrevious) && marginLeft < 0) {
    $slideshowGalleryContainer.animate({'margin-left': '+='+160}, 300);
  }
  if ($(this).is($arrowNext) && marginLeft > -960) {
    $slideshowGalleryContainer.animate({'margin-left': '-='+160}, 300);
  }
} 
function moveGalleryPrevious() {
  let marginLeft = parseInt($slideshowGalleryContainer.css('margin-left'), 10);
  if (marginLeft >= 0) {
    return;
  } else {
    $slideshowGalleryContainer.animate({'margin-left': '+='+160}, 300);
    console.log('previous');
  }
}
function moveGalleryNext() {
  let marginLeft = parseInt($slideshowGalleryContainer.css('margin-left'), 10);
  if (marginLeft > -960) {
    $slideshowGalleryContainer.animate({'margin-left': '-='+160}, 300);
    console.log('next');

  }
}*/
})();

/* Solution for scrollable image gallery without fixed width, not ajusted to small screen
//cache DOM
const $imgGallery = $('#img-gallery');
const $arrowBackwards = $('#arrow-backwards');
const $arrowForwards = $('#arrow-forwards');
const $lastItem = $('#img-gallery img').last();
//bind events
$arrowBackwards.on('click', moveBackwards);
$arrowForwards.on('click', moveForwards);
$(document).on('keyup', moveBackwardsOnKey);
$(document).on('keyup', moveForwardsOnKey);
//function declarations
function moveForwards() {
  let $currentItem = $('.current-item');
  if ($lastItem.offset().left <= $('#img-gallery-container').width() - $lastItem.width()) {
    return;
  }
  let width = $currentItem.width() + 'px';
  $imgGallery.animate({'margin-left': '-='+width}, 300);
  $currentItem.removeClass('current-item').next().addClass('current-item');
  // console.log($lastItem.offset().left);
  // console.log($lastItem.position().left);
  // console.log($('#img-gallery-container').width());
  // let test = $('#img-gallery-container').width() - $lastItem.width();
  // console.log(test);

}
function moveBackwards() {
  let $currentItem = $('.current-item');
  if ($currentItem.is(':first-child')) { 
    return;
  }
  $currentItem.removeClass('current-item').prev().addClass('current-item');
  let width = $('.current-item').width() + 'px';
  $imgGallery.animate({'margin-left': '+='+width}, 300);
}
function moveForwardsOnKey(event) {
  if (event.which == 39) {
console.log('movebackwardsonkey');
    moveForwards();
  }
}
function moveBackwardsOnKey(event) {
  if (event.which == 37) {
    moveBackwards();
  }
} */






//close $().ready()
});

