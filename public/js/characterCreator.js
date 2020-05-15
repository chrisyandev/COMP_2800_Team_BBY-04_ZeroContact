//Objects --------------------------------------------------
function Character() {
    this.playerName = "Alan Smithee";
    this.playerGender = "M";
    this.playerAge = 20;
    this.playerSprite = "placeholder";
    this.health = 100;
    this.mental = 100;
    this.wealth = 100;
    this.supplies = 100;
    this.familySize = 0;
    this.status = "pleaceholder"; //State of Health i.e. health, sick, terminal
    this.familyMembers = [];
}

function family(name, gender, relation, age) {
    this.name = name;
    this.gender = gender;
    this.relation = relation;
    this.age = age;
    this.status = "placeholder";
}
//Runtime------------------------------------------------------
let player;

function loadCharacterPage() {
    document.getElementById("create").value = "Next Character";
    //Placeholder
    let famSize = 1;
    generateProfile();
    player.familySize = famSize;
    drawCharacter();
    addFamily(famSize);
    drawFamily(famSize);
    document.getElementById("profile").style = "display: block";
    document.getElementById("seeFamily").style = "display: block";
}
//Creates main character
function generateProfile() {
    player = new Character();
    player.playerName = genName();
    player.playerGender = getGender();
    player.playerAge = genNum(25, 55);
}
//Puts main character info onto html
function drawCharacter() {
    document.getElementById("name").innerHTML = "Name: " + player.playerName;
    document.getElementById("gender").innerHTML = "Gender: " + player.playerGender;
    document.getElementById("age").innerHTML = "Age: " + player.playerAge;
    document.getElementById("family").innerHTML = "Family Size: " + player.familySize;
    document.getElementById("familyLabel").innerHTML = "Family Members:";
    
}
//Generates famil members
function createFamily() {
    let name = "Alan Smithee";
    let age = 667;
    let relate = "Creator";
    let gender = "Anonymous";
    console.log(age + "/" + relate + "/" + gender);
    player.familyMembers.push(new family(
        name, gender, relate, age
    ));
}
//Runs for as many times as there are family members
function addFamily(size) {
    console.log("-----")
    for (let i = 0; i < size; i++) {
        createFamily();
    }
}
//Renders family members onto the page
function drawFamily(size) {
    if (size == 0) {
        document.getElementById("familyDisplay").innerHTML = "None.";
    } else {
        document.getElementById("familyDisplay").innerHTML = "";
        console.log(player.familyMembers)
        for (let i = 0; i < size; i++) {
            document.getElementById("familyDisplay").innerHTML += "<br>Name: " + player.familyMembers[i].name + "<br>";
            document.getElementById("familyDisplay").innerHTML += "Gender: " + player.familyMembers[i].gender + "<br>";
            document.getElementById("familyDisplay").innerHTML += "Relation: " + player.familyMembers[i].relation + "<br>";
            document.getElementById("familyDisplay").innerHTML += "Age: " + player.familyMembers[i].age + "<br>";
            document.getElementById("familyDisplay").innerHTML += " ";
        }
    }
}

let displayFlag = true;

function seeNext() {
    if (displayFlag) {
        displayFlag = !displayFlag;
        document.getElementById("familyDisplay").style = "display: block";
    } else {
        displayFlag = !displayFlag;
        document.getElementById("familyDisplay").style = "display: none";
    }

}

//Informtion Generation---------------------------------------------------------------
function genNum(base, range) {
    return Math.round(Math.random() * range + base);
}
//Variable used to check family member's gender based on relationship
let genderCheck = 0;

function getGender() {
    let gender = "";
    if (Math.round(Math.random()) == 0) {
        gender = "M";
    } else {
        gender = "F";
    }
    return gender;
}


function genName() {
    let searchFirst = Math.round(Math.random() * nameList.length);
    let searchSecond = Math.round(Math.random() * nameList.length);
    return nameList[searchFirst] + " " + nameList[searchSecond];
}
//--------------- TEMP ---------------------------------------------
let nameList = [
    "Adam", "Alex", "Aaron", "Ben", "Carl", "Dan", "David",
    "Edward", "Fred", "Frank", "George", "Hal", "Hank", "Ike",
    "John", "Jack", "Joe", "Larry", "Monte", "Matthew", "Mark",
    "Nathan", "Otto", "Paul", "Peter", "Roger", "Roger", "Steve",
    "Thomas", "Tim", "Ty", "Victor", "Walter", "Haise", "Hayato",
    "Ren", "Seyren", "Windsor", "Sakura", "Masamune", "Yukinari",
    "Luciela", "Len", "Fortuna", "Kotowari", "Rinne", "Seiran", "Yakumo",
    "FengHua", "Kazehana", "Lin", "Wang", "Huang", "Ling", "Wong", "Tang",
    "San", "Ichi", "Itou", "Tanaka", "Yumesaki", "Miyano", "Mamoru",
    "Sugita", "Tomokazu", "Matt", "Mullholland", "Yukihime", "Yuki",
    "Lycoris", "Hana", "Megumi", "Toyota", "Niisan", "Honda", "Hyundai",
    "Kang", "Lee", "Hyuk", "So", "Hyung", "Zarathustra", "Reinhardt",
    "Tristan", "Eugen", "Heydrich", "Valerian", "Trifa", "Ryan", "Liu",
    "Setsuna f Seisei", "Minato Aqua", "Hoshimachi", "Suisei", "Kaisei",
    "Ting Yu", "GN001 Exia", "ZGMF-X10A Freedom", "Eva Unit-01", "RX-0 Unicorn",
    "RX-93 v Gundam", "Feng", "Tokiyomi", "Kusunoki", "Loki", "Odin", "Amaterasu",
    "Izanagi", "Izanami", "Silverio Vendetta", "Mercurius", "Amakasu", "Masahiko",
    "Hiiragi", "Yoshiya", "Nakiri", "Kuubou", "Paradise", "Hajun", "Nobunaga",
    "Nobuhime", "Oda", "Kaziklu Bey", "Lloyd", "Matsunaga", "Tsubame", "Casual",
    "Anderson", "Ashwoon", "Aikin", "Bateman", "Bongard",
    "Bowers", "Boyd", "Cannon", "Cast", "Deitz", "Dewalt",
    "Ebner", "Frick", "Hancock", "Haworth", "Hesch", "Hoffman",
    "Kassing", "Knutson", "Lawless", "Lawicki", "Mccord",
    "McCormack", "Miller", "Myers", "Nugent", "Ortiz", "Orwig",
    "Ory", "Paiser", "Pak", "Pettigrew", "Quinn", "Quizoz",
    "Ramachandran", "Resnick", "Sagar", "Schickowski",
    "Schiebel", "Sellon", "Severson", "Shaffer", "Solberg",
    "Soloman", "Sonderling", "Soukup", "Soulis", "Stahl",
    "Sweeney", "Tandy", "Trebil", "Trusela", "Trussel", "Turco",
    "Uddin", "Uflan", "Ulrich", "Upson", "Vader", "Vail", "Valente",
    "Van Zandt", "Vanderpoel", "Ventotla", "Vogal", "Wagle", "Wagner",
    "Wakefield", "Weinstein", "Weiss", "Woo", "Yang", "Yates", "Yocum",
    "Zeaser", "Zeller", "Ziegler", "Bauer", "Baxster", "Casal", "Cataldi",
    "Caswell", "Celedon", "Chambers", "Chapman", "Christensen", "Darnell",
    "Davidson", "Davis", "DeLorenzo", "Dinkins", "Doran", "Dugelman", "Dugan",
    "Duffman", "Eastman", "Ferro", "Ferry", "Fletcher", "Fietzer", "Hylan",
    "Hydinger", "Illingsworth", "Ingram", "Irwin", "Jagtap", "Jenson",
    "Johnson", "Johnsen", "Jones", "Jurgenson", "Kalleg", "Kaskel",
    "Keller", "Leisinger", "LePage", "Lewis", "Linde", "Lulloff",
    "Maki", "Martin", "McGinnis", "Mills", "Moody", "Moore", "Napier",
    "Nelson", "Norquist", "Nuttle", "Olson", "Ostrander", "Reamer",
    "Reardon", "Reyes", "Rice", "Ripka", "Roberts", "Rogers",
    "Root", "Sandstrom", "Sawyer", "Schlicht", "Schmitt", "Schwager",
    "Schutz", "Schuster", "Tapia", "Thompson", "Tiernan", "Tisler"
];