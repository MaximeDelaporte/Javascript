$(document).ready(function()
{
  var favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  var baseURL = "http://api.tvmaze.com/";
  var nameSerie = "";
  var urlSerie = "";
  var idSerie = "";
  /*showFavorite();

function showFavorite(){

  data = JSON.parse(localStorage.getItem('favorites'));
  htmlRender = "";
  htmlRender +="<ul class='favorites-list'>"
  $.each(data, function(index, value){
    url = baseURL + "shows/" + value;
    $.ajax({
      url:url
    }).done(function(dataBis){
    htmlRender += "<li>" + dataBis.name + "</li>"
    });
  });
  htmlRender += "</ul>"
  $('[data-use="favorite-list"]').html(htmlRender);
}*/

  $('body').on('click', '#search', function(){
    var search = $('[data-use="searchbox"]').val();
    var htmlRender = "";
    url = baseURL + "search/shows?q=" +search;
    $.ajax({
      url: url
    }).done(function(data){
      $('[data-use="searchbox"]').val("");
      htmlRender += "<ul class=result>";
      $.each(data, function(index, value){
        htmlRender += "<li data-id='" + value.show.id + "'>" + value.show.name + "</li>";
      })
      htmlRender += "</li>";
      $('[data-use="list"]').html(htmlRender);
    });
  })
  $('body').on('click', '[data-use="list"] li', function()
  {
      urlSerie = "";
      var id = $(this).data('id');
      urlSerie = baseURL + "show/" + id;
      $.ajax({
        url: baseURL + "shows/" + id
      }).done(function(data){
        var htmlRender = "";
        var name = data.name;
        nameSerie = name;
        idSerie = data.id;
        var status = data.status;
        if(data.image){
          if (data.image["medium"])
          {
            var img = data.image["medium"];
          }
        }
        else {
          var img = "./no-image.jpeg";
        }
        var summary = data.summary;
        var premiered = data.premiered;
        var officialWebsite = data.officialSite;
        htmlRender += "<h2 class='name'>" + name + "</h2>";
        htmlRender += "<div class='serie-info'>";
        htmlRender += "<img src='" + img + "' alt='" + name + "'>";
        htmlRender += "<ul class='genre'>";
        htmlRender += "<p>Genres : </p>"
        $.each(data.genres, function(index, value){
          htmlRender +="<li>" + value + " </li>"
        });
        htmlRender +="</ul>";
        htmlRender += "<p class='summary'>" + summary + "</p>";
        htmlRender +="<input type='checkbox' value='favourite'>Favourite</input>"
        htmlRender +="</div>";
        htmlRender +="<div class='serie-details'>"
        htmlRender += "<span class='status'>Status : <span class='small'>" + status + "</span></span>";
        htmlRender +="<p class='premiered'>" + premiered + "</p>";
        htmlRender +="<a href='" + officialWebsite + "'> Official Website</a>";
        htmlRender +="</div>";

        $('[data-use="detail"]').html(htmlRender);
      });
  });
  $('body').on('click', '[value="favourite"]', function(){
    var checkbox = $('[value="favourite"]');

    if (checkbox[0].checked == true)
    {
      if(!(localStorage.getItem('favorite series')))
      {
        localStorage.setItem('favorite series','');
      }
    var index = favorites.indexOf(idSerie);
    if (index == -1)
    {
      favorites.push(idSerie);
    }
    }
    else
    {
      if (index != -1)
      {
        favorites.pop(index);
      }
    }
    localStorage.setItem('favorites', JSON.stringify([favorites]));
  });
});
