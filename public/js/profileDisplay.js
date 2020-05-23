//getting request for info
function getUserDetails(username) {
  let result = $.ajax({
    type: "GET",
    url: "/user",
    data: {
      username: username
    },
    async: false
  });

  return result.responseJSON;
}

var modal = document.getElementById("myProfile");

function getP() {
  modal.style.display = "block";
}

function closeProfile() {
  modal.style.display = "none";
}

//Script is on this page to get username for indexing
let username = document.getElementById("user").innerHTML;
let playerObj = getUserDetails(username);
let playerName = playerObj.playerName;
console.log(playerObj);

//Shortening name for spacing
function getFirstName(name) {
  let nameArray = name.split(" ");
  return nameArray[0];
}


//Rendering information on page [TEMP]
document.getElementById("characterName").innerHTML = "Name: " + playerName;
document.getElementById("characterAge").innerHTML = "Age: " + playerObj.age;
document.getElementById("characterGender").innerHTML = "Gender: " + playerObj.gender;
document.getElementById("pandemicGenerated").innerHTML = "Pandemic: " + playerObj.pandemic;
console.log(getFirstName("1" + playerName));
document.getElementById("getProfile").value = "" + getFirstName(playerName);