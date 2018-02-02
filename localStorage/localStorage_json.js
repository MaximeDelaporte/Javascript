var data = {
  "name":"jean-louis",
  "age":20,
  "passions";{
    "jeux": 24,
    "films": 12
  }
};
localStorage.setItem('test', JSON.stringify(data));

var result = localStorage.getItem('test');
debugger;
