$(document).ready(function()
{
  var htmlRender = "";
  $.ajax({
    url: "https://anapioficeandfire.com/api/characters?pageSize=50"
    }).done(function(data){
      htmlRender += "<ul>";
      $.each(data, function(index, value){
        if(value.name != "")
        {
            htmlRender += "<li data-url ='" + value.url + "'><div>" + value.name + "</div></li>";
        }
        else
        {
          htmlRender += "<li data-url ='"+ value.url + "'><div>" + value.aliases[0] + "</div></li>";
        }
      });
      htmlRender += "</ul>";
      $('[data-use="list"]').append(htmlRender);
    });
  $('body').on('click', '[data-use="list"] li', function()
  {
    var url = $(this).data('url');
    $.ajax({
      url:url
    }).done(function(data){
      var htmlRender = "";
      var name = data.name != "" ? data.name:data.aliases[0];
      htmlRender += "<h1>" + name + "</h1>";
      $('[data-use="detail"]').html(htmlRender);
    });
  });
});
