/*
Folosind API-ul https://randomuser.me/api/, 
afisati la apasarea unui buton("Genereaza utilizator") 
următoarele detalii ale unui utilizator random: picture, name, gender, e-mail și age
*/

const URL = "https://randomuser.me/api/";

async function getRandomUserData() {
  document.getElementById("photo").setAttribute("src", "loader.gif");
  const result = await fetch(URL);
  const data = await result.json();
  console.log(data);
  document
    .getElementById("photo")
    .setAttribute("src", data.results[0].picture.large);
  document.getElementById("name").innerHTML =
    "Nume: " + data.results[0].name.first + " " + data.results[0].name.last;
  document.getElementById("gender").innerHTML =
    "Nume: " + data.results[0].gender;
  document.getElementById("email").innerHTML =
    "Email :" + data.results[0].email;
  document.getElementById("age").innerHTML =
    "Varsta :" + data.results[0].dob.age;
}

document.getElementById("fetch").addEventListener("click", getRandomUserData);
