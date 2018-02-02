if(!localStorage.getItem('startSlide'))
{
  localStorage.setItem('startSlide', 1);
}
var slides = document.querySelectorAll('section[data-slide]');
displaySlides();
function displaySlides()
{
  for(var i = 0; i<slides.length;i++)
  {
    if (slides[i].dataset.slide != localStorage.getItem('startSlide'))
    {
      slides[i].classList.add('hidden');
    }
    else
    {
      slides[i].classList.remove('hidden');
    }
  }
}
function moveSlides(direction)
{
  var currentSlide = localStorage.getItem('startSlide');
  switch(direction)
  {
    case '+':
      var startSlide = parseInt(currentSlide) + 1 <= slides.length ? parseInt(currentSlide) + 1 : 1;
      localStorage.setItem('startSlide', startSlide);
      break;
    case '-':
      var startSlide = parseInt(currentSlide) - 1 >= 1 ? parseInt(currentSlide) - 1 : slides.length;
      localStorage.setItem('startSlide', startSlide);
      break;
  }
  displaySlides();
}
document.addEventListener('keydown', function(event)
{
  //right arrow
  if (event.keyCode == 39)
    {
      moveSlides('+');
    }
    //left arrow
  else if (event.keyCode == 37)
    {
      moveSlides('-');
    }
})
