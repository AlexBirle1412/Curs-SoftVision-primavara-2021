/*
Se dă un array cu numere de la 0 la 10
Parcurgeți array-ul și afișați fiecare număr adunat cu 15 * numărul respectiv ( pentru 2 se va afișa 32),
folosind atat VanillaJS cât și arrow functions și iteratori specifici ES6.
Folosind destructuring copiați array-ul și modificați elementele astfel: 
2 va deveni 22, 6 va deveni 66. Afișați ambele array-uri.
*/

const firstArray = [1, 2, 3, 4, 5, 6, 8, 9, 10];
//1 VanillaJS
for (let i = 0; i < firstArray.length; i++)
  console.log(firstArray[i] + 15 * firstArray[i]);
//2 Arraw functions
firstArray.forEach((element) => console.log(element + 15 * element));
//iteratori specifici
var newArray = firstArray.map((element) => {
  return element + 15 * element;
});
console.log(newArray);
