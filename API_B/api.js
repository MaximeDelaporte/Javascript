$(document).ready(function()
{
  var url = "https://api.punkapi.com/v2/beers"
  var htmlRender = "";
  $.ajax({
    url: "https://api.punkapi.com/v2/beers?per_page=50"
  }).done(function(data){
    htmlRender += "<ul id='beers'>";
    $.each(data, function(index, value)
    {
      htmlRender += "<li data-url ='" + url + "/" + value.id + "'>" + value.name +"</li>";
    });
    htmlRender += "</ul>";
    $('[data-use="list"]').append(htmlRender);
    $('#beers').html(
    $('#beers').children('LI').sort(function (a, b)
    {
      return $(a).text().toUpperCase().localeCompare(
        $(b).text().toUpperCase());
    })
    );
  });
  $('body').on('click', '[data-use="list"] li', function()
  {
      var url = $(this).data('url');
      $.ajax({
        url:url
      }).done(function(data){

        var htmlRender = "";
        var name = data[0].name;
        var tagline = data[0].tagline;
        var first_brewed = data[0].first_brewed;
        //var img = data[0].image_url;
        var description = data[0].description;
        var food_pairing = data[0].food_pairing;
        var brewers_tips = data[0].brewers_tips;
        htmlRender += "<h2 class='beer-name'>" + name + "</h2>";
        htmlRender += "<div class='beer-info'>";
        //htmlRender += "<img url='" + img + "' alt='" + name + "'>";
        htmlRender += "<p class='tagline'>" + tagline + "</p>";
        htmlRender += "<span class='first-brewed'>First brewed : <span class='small'>" + first_brewed + "</span></span>";
        htmlRender += "<p class='description'>" + description + "</p>";
        htmlRender +="</div>";
        htmlRender +="<div class='beer-details'>"
        htmlRender +="<div class='food-pairing'>" + "<h3>Better with : </h3>" + "<p>" + food_pairing + "</p></div>"
        htmlRender +="<div class='brewers-tips'>" + "<h3>Brewers tips : </h3>" + "<p>"+ brewers_tips + "</p></div>"
        htmlRender +="</div>";

        $('[data-use="detail"]').html(htmlRender);
      });
  });
});
