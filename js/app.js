function loginUser(eventDetails) {
  axios
    .request({
      method: "POST",
      url: "https://reqres.in/api/login",
      headers: { "Content-Type": "application/json" },
      data: {
        email: document.getElementById("usernameInput").value,
        password: document.getElementById("passwordInput").value,
      },
    })
    .then(userLoginSuccess)
    .catch(userLoginFail);
}

function userLoginSuccess(res) {
  // console.log(res);
  let userEmail = document.getElementById("usernameInput").value;
  let userToken = res.data.token;
  // Store Token as cookie
  Cookies.set("loginToken", `${userToken}`);

  // get email to store in cookie for page 2 greeting
  Cookies.set("userEmailAddress", `${userEmail}`);
  // show user login success message
  responseDiv.innerText = `You have successfully logged in, ${userEmail}`;
  // send user to second page
  setTimeout(() => {
    window.open("/pages/colors.html", "_self");
  }, 1000);

  // console.log(userToken);
}

function userLoginFail(err) {
  // console.log(err);
  responseDiv.innerText = `Login Failed \n ${err}`;
}

let responseDiv = document.getElementById("loginResponse");
let loginButton = document.getElementById("loginButton");

loginButton.addEventListener("click", loginUser);

// Doesn't feel right that I have to get the cookies here after setting them in the function above
// maybe this is how it needs to be done, but I feel like there may be a more intuitive way.
let userLoggedIn = Cookies.get("userEmailAddress");
let userToken = Cookies.get("loginToken");
if (userToken) {
  document.getElementById("loginForm").remove();
  responseDiv.innerHTML = `You have successfully logged in as ${userLoggedIn} <button onclick="userLogout()" id="logout">Logout</button>`;
}

// not sure if this is the ideal way to do this, but it gets the job done for now!
function userLogout() {
  Cookies.remove("loginToken");
  Cookies.remove("userEmailAddress");
  responseDiv.innerText = `You have successfully logged out!`;
  setTimeout(() => {
    location.reload();
  }, 1000);
}
