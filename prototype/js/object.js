// var people = {
//   name:"Jean-Patrick",
//   age:"42",
//   loves:["Football", "Curling"],
//   dislikes:["people", "things"],
//   presentation: function() {
//     console.log("jme présente, je m'appelle " + this.name);
//     return true;
//   }
// }
function insult() {
  console.log('Jvais tbuter fils de chienne');
}
function createNewPeople(nom, age){
  var obj = {};
  this.nom = nom;
  this.age = age;
  obj.salutation = function() {
    console.log('Coucou je suis ' + this.name + "et j'ai " + this.age  )
  }
}
var patrick = new createNewPeople('Patrick', '53');
var pololo = new createNewPeople('Paul', '17');
var jeanne = new createNewPeople('Jeanne', '41');
pololo.salutation = function () {
  console.log("Yesh Mad'moi'zelle, t'es bonne, j'te baise");
};
pololo.insult = insult;
createNewPeople.prototype.deal = function () {
  console.log('Tveux dla beuh');
};
var pololoBis = Object.create(pololo);
pololoBis.name = 'Fabien';
pololoBis.age = '14';

debugger;
