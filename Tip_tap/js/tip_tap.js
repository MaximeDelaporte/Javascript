var horizontalMax;
var verticalMax;
var lives = 5;
var score = 0;
var miss;
var missBonus;
var game;
var apparenceBonus;
var increment = 10;
var apparenceTimer = 2000;
var apparenceTimerBonus = 5000;
var disapparenceTimerBonus = 1500;
var disapparenceTimer = 1800;
$(document).ready(function()
{

  renderGameboard();
  displayMenu();
  playSound('./assets/sounds/background.mp3');
  game = setInterval(displayTarget, apparenceTimer);

  //Create the game board
  function renderGameboard(x = 4, y = 4)
  {
    horizontalMax = x;
    verticalMax = y;
    var gameBoard = "";
    for(var i = 1; i <=y; i++)
    {
      gameBoard += "<div data-vertical='" + i + "'>";
      for(var j = 1; j <= x; j++)
      {
        gameBoard += "<div style='height:" + 80/ y + "vh;width:"+ 80/ x + "%;' data-horizontal='" + j + "'></div>";
      }
      gameBoard += "</div>";
    }
    $('section[data-use="gameboard"]').html(gameBoard);
  }
  function playSound(sound)
  {
    $('body').append('<audio src="' + sound + '"autoplay></audio>');
  }
  function displayMenu()
  {
    var menu;
    menu = "<p class='score'>Score :" + score + "</p><div class='lives-display'><img src='./assets/img/coffee.png' style='width: 40px; height:40px;'><p class='lives'>  x " + lives + "</p></div>";
    $('section[data-use="menu"]').html(menu);
  }
  //Display the target randomly
  function displayTarget()
  {
    var rot = Math.floor(Math.random() * 360);
    var hor = 1 + Math.floor(Math.random()* horizontalMax);
    var ver = 1 + Math.floor(Math.random()* verticalMax);
    if ($('div[data-vertical="' + ver +'"] div[data-horizontal ="' + hor + '"]').hasClass('occuped'))
    {
      displayTarget();
    }
    else {
      $('div[data-vertical="' + ver +'"] div[data-horizontal ="' + hor + '"]').html('<div id="target"class="imgDiv occuped"><img style="transform:rotate('+ rot +'deg)" src="./assets/img/target.png"></div>');
      miss = setTimeout(function(){removeTarget(false)}, disapparenceTimer);
    }
  }
  function displayBonus ()
  {
    var hor = 1 + Math.floor(Math.random()* horizontalMax);
    var ver = 1 + Math.floor(Math.random()* verticalMax);
    if ($('div[data-vertical="' + ver +'"] div[data-horizontal ="' + hor + '"]').hasClass('occuped'))
    {
      displayBonus();
    }
    else
    {
      $('div[data-vertical="' + ver +'"] div[data-horizontal ="' + hor + '"]').html('<div id="bonus" class="occuped imgDivBonus"><img src="./assets/img/coffee.png"></div>');
      missBonus = setTimeout(function(){removeBonus(false)}, disapparenceTimerBonus);
    }
  }
  function removeBonus(status)
  {
      $('#bonus').remove();
      if (status)
      {
        gainLife();
      }
  }
  //Destroy the target, check if miss or click
  function removeTarget(status)
  {
    $('#target').remove();

    if (status)
    {
      playSound('./assets/sounds/success.mp3');
      incrementScore();
      displayMenu();
    }
    else
    {
      loseLife();
    }
    if (score == 100)
    {
      apparenceBonus = setInterval(displayBonus, apparenceTimerBonus);
    }
  }
  function incrementScore()
  {
    score = score + increment;

    if (disapparenceTimer > 700)
    {
      disapparenceTimer -= 50;
      apparenceTimer -= 50;
      clearInterval(game);
      game = setInterval(displayTarget, apparenceTimer);
    }
  }
  function popBonus()
  {
    if (disapparenceTimerBonus > 500)
    {
      apparenceTimerBonus += 100;
      disapparenceTimerBonus -= 100;
    }
  clearInterval(apparenceBonus);
  apparenceBonus = setInterval(displayBonus, apparenceTimerBonus);
}
  //Increase lives stock or gain score
  function gainLife()
  {
    if(lives >= 5)
    {
      score = score + (increment * 2);
    }
    else
    {
      lives++;
    }
    popBonus();
    displayMenu();
  }
  //Decrease lives stock
  function loseLife()
  {
    lives --;
    playSound('./assets/sounds/miss.mp3');
    displayMenu();
    if (lives <= 0)
    {
      gameOver();
    }
  }

  //End the game
  function gameOver()
  {
    alert('Game Over');
    clearInterval(game);
    clearInterval(apparenceBonus);
  }
  //Remove the target on click
  $('body').on('click', '#target img', function(){
    clearTimeout(miss);
    removeTarget(true);
  });
  $('body').on('click', '#bonus img', function(){
    clearTimeout(missBonus);
    removeBonus(true);
  });
});
