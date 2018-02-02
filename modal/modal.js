// var title = document.querySelector('#title');
// //title.classList.add('color-base');
// //title.className += ' color-base';
// //title.className -= ' color-base';
// //title.classList.remove('color-base');
// //title.style.color = 'red';
// title.addEventListener('click', function()
// {
//     changeColor(this, 'red');
// });
// document.querySelector('p').addEventListener('click', function()
// {
//     changeColor(this, 'blue');
// });
// function changeColor(selected, color)
// {
//   selected.style.color = color;
// }
function modal(args)
{
  var button = document.querySelector('[data-modal="show"]');
  var modal = document.querySelector('.modal');
  var childModal = document.querySelector('.modal-child');
  var close = document.querySelector('.close');

  modal.style.backgroundColor = args.parentModal.backgroundColor ? args.parentModal.backgroundColor:"grey";
  childModal.style.backgroundColor = args.childModal.backgroundColor ? args.childModal.backgroundColor:"white"
  for(var i = 0; i < childModal.children.length; i++)
  {
    var currentTag = childModal.children[i].tagName;
    if(args.content[currentTag])
    {
      childModal.children[i].style.color = args.content[currentTag].color;
    }
  }
  button.addEventListener('click', function()
  {
    modal.style.visibility = "visible";
  });
  close.onclick = function()
  {
    modal.style.visibility = "hidden";
  }
  document.onclick = function(event)
  {
    if (event.target == modal)
    {
      modal.style.visibility = "hidden";
    }
  }
  document.addEventListener('keyup', function(e)
  {
    if (e.keyCode === 27)
    modal.style.visibility = "hidden";
  });
}
