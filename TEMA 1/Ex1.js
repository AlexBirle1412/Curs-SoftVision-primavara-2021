/*Creați clasa AngajatIT cu următoarele:
     Proprietăți: CNP, nume, prenume, vechime, departament
     Metode: afiseazaVarsta, afișeazăAnulAngajarii, lucrează ( va afișa mesajul "Neimplementat")
     Din clasa creată extindeți clasele QA și Developer, adăugați mesaje specifice pentru metoda 
     lucrează a acestora ( ex. "testează software", "scrie cod")
*/

class AngajatIT {
  #nume;
  #prenume;
  #CNP;
  #vechime;
  #department;
  constructor(props) {
    this.#nume = props.nume;
    this.#prenume = props.prenume;
    this.#CNP = props.CNP;
    this.#vechime = props.vechime;
    this.#department = props.department;
  }
  afiseazaVarsta() {
    let auxiliar = this.#CNP.split("");
    var an = [auxiliar[1], auxiliar[2]].join("");
    var luna = [auxiliar[3], auxiliar[4]].join("");
    var zi = [auxiliar[5], auxiliar[6]].join("");
    var years;

    if (auxiliar[0] == "1" || auxiliar[0] == "2")
      years = moment().diff("19" + an + "-" + luna + "-" + zi, "years", false);
    else
      years = moment().diff("20" + an + "-" + luna + "-" + zi, "years", false);
    console.log("VARSTA = ");
    console.log(years);
  }
  afișeazăAnulAngajarii() {
    var today = new Date();
    var year = today.getFullYear();
    console.log("VECHIME = ");
    console.log(year - this.#vechime);
  }
  lucreaza() {
    console.log("Neimplementat inca");
  }
}

class QA extends AngajatIT {
  constructor(props) {
    super(props);
  }
  lucreaza() {
    //super.lucreaza();
    console.log("Testeaza softweare");
  }
}

class Developer extends AngajatIT {
  constructor(props) {
    super(props);
  }
  lucreaza() {
    //super.lucreaza();
    console.log("Scrie cod");
  }
}

let firstPerson = new AngajatIT({
  nume: "Birle",
  prenume: "Alex",
  CNP: "2980109245035",
  vechime: 3,
  departament: "IT",
});
firstPerson.afiseazaVarsta();
firstPerson.afișeazăAnulAngajarii();
firstPerson.lucreaza();

let secondPerson = new QA({
  nume: "Chira",
  prenume: "Dumitru",
  CNP: "1930109245035",
  vechime: 5,
  departament: "IT",
});
secondPerson.lucreaza();

let thirdPerson = new Developer({
  nume: "Bob",
  prenume: "Dylan",
  CNP: "1570109245035",
  vechime: 25,
  departament: "IT",
});
thirdPerson.lucreaza();
