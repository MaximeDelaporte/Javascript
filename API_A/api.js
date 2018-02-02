var htmlRender = "";
const req = new XMLHttpRequest();

req.onreadystatechange = function(event) {
    // XMLHttpRequest.DONE === 4
    if (this.readyState === XMLHttpRequest.DONE) {
        if (this.status === 200)
        {
          var data = JSON.parse(this.responseText);
          htmlRender += "<ul>";
          for (var i = 0; i < data.length; i++)
          {
            if(data.name != "")
            {
                htmlRender += "<li data-url ='" + data.url + "'> "+ value.name  + "</li>";
            }
            else
            {
              htmlRender += "<li data-url ='"+ data.url +"'>" + data.aliases[0] + "</li>";
            }
          }
          htmlRender += "</ul>";
          document.querySelector('[data-use="list"]').innerHTML = htmlRender;
        }
        else
        {
          console.log("Status de la réponse: %d (%s)", this.status, this.statusText);
        }
    }
};

req.open('GET', 'https://anapioficeandfire.com/api/characters?pageSize=50', true);
req.send(null);
document.addEventListener('click', function(event){
  if(event.target.tagName == 'LI' && event.target.dataset.url)
  {
      var url = event.target.dataset.url();
      const reqBis = new XMLHttpRequest();

      reqBis.onreadystatechange = function(event)
      {
        if (this.readyState === XMLHttpRequest.DONE)
        {
          if (this.status === 200)
          {
            var data = JSON.parse(this.responseText);
            var htmlRender = "";
            var name = data.name != "" ? data.name:data.aliases[0]
            document.querySelector('[data-use="detail"]').innerHTML= htmlRender;
            htmlRender += "<h1>" + name + "</h1>"
          }
          else
          {
            console.log("Status de la réponse: %d (%s)", this.status, this.statusText);
          }
        }
      };
      reqBis.open('GET', url, true);
      reqBis.send(null);
  }
});
