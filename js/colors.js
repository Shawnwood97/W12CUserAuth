userEmail = Cookies.get("userEmailAddress");
userToken = Cookies.get("loginToken");

console.log(userEmail, userToken);
if (userToken) {
  document.getElementById(
    "welcomeMsg"
  ).innerHTML = `<h2>Welcome to the COLORS page, <span id="valid">${userEmail}</span></h2>`;
} else {
  document.getElementById(
    "welcomeMsg"
  ).innerHTML = `<h2>Please Log in to see a fancy message here!</h2><h4 id="homeLink"><a href="/index.html">Click Here To Login<a></div>`;
}
axios
  .request({
    method: "GET",
    url: "https://reqres.in/api/unknown",
  })
  .then(getColorsSucc)
  .catch(getColorsFail);

function getColorsSucc(res) {
  console.log(res);
  let colorsContainer = document.getElementById("colorsContainer");
  let colorData = res.data.data;

  for (let i = 0; i < colorData.length; i++) {
    var createDiv = document.createElement("div");
    var createP = document.createElement("p");
    var createDiv = document.createElement("div");
    createDiv.classList.add("color");
    createDiv.style.backgroundColor = `${colorData[i].color}`;

    console.log(colorData[i].color);

    colorsContainer
      .appendChild(createDiv)
      .appendChild(
        createP
      ).innerHTML = `<b>Color Name:</b> ${colorData[i].name} <br> <b>Year Created:</b> ${colorData[i].year}`;
  }
}
function getColorsFail(err) {}
