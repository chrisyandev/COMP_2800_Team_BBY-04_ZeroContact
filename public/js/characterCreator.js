//Objects --------------------------------------------------
function Character() {
    this.playerName = "Alan Smithee";
    this.playerGender = "M";
    this.playerAge = 20;
    this.playerSprite = "placeholder";
    this.pandemic = "";
}

//Runtime------------------------------------------------------
let player;

function loadCharacterPage() {
    document.getElementById("create").value = "Next Character";
    generateProfile();
    genPandemic();
    drawCharacter();
    document.getElementById("profile").style = "display: inline-block";
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
    //loading values into inputs
    document.getElementById("sendName").value = "" + player.playerName;
    document.getElementById("sendGender").value = "" + player.playerGender;
    document.getElementById("sendAge").value = "" + player.playerAge;
    document.getElementById("sendPandemicName").value = "" + player.pandemic;
}

//Informtion Generation---------------------------------------------------------------
function genNum(base, range) {
    return Math.round(Math.random() * range + base);
}

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
    let searchFirst = Math.round(Math.random() * (nameList.length - 1));
    let searchSecond = Math.round(Math.random() * (nameList.length - 1));
    return nameList[searchFirst] + " " + nameList[searchSecond];
}

function genPandemic() {
    let nameType = Math.random();
    let wordLength = 0;

    let panName = "";
    //Two different types of naming
    if (nameType > 0.5) {
        wordLength = 4;
        //[Letter][Number][Letter][Number]
        for (let i = 0; i < wordLength; i++) {
            if (i % 2 == 0) {
                panName += lettersUpper[Math.round(Math.random() * (lettersUpper.length - 1))];
            } else {
                panName += Math.round(Math.random() * 9)
            }
        }
    } else {
        wordLength = Math.round(Math.random() * 5) + 4;
        //Start name with capital
        panName += lettersUpper[Math.round(Math.random() * (lettersUpper.length - 1))];
        //Attempting to add alternating vowels in an attempt to make a more realistic name
        for (let i = 0; i < (wordLength - 1); i++) {
            if (i % 2 == 0) {
                panName += vowels[Math.round(Math.random() * (vowels.length - 1))];
            } else {
                panName += lettersLower[Math.round(Math.random() * (lettersLower.length - 1))];
            }
        }
    }
    player.pandemic = panName;
    document.getElementById("pandemic").innerHTML = "Pandemic: " + panName;
}
//--------------- Dump ---------------------------------------------
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
//Arrays for generating Pandemic name
let lettersLower = "abcdefghijklmnopqrstuvwxyz".split('');

let lettersUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

let vowels = "aeiou".split('');