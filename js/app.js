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
  console.log(res);

  let userToken = res.data.token;
  // Store Token as cookie
  Cookies.set("loginToken", `${userToken}`);
  // show user login success message
  responseDiv.innerText = "You have successfully logged in";
  // send user to second page
  setTimeout(() => {
    window.open("https://reqres.in/", "_self");
  }, 5000);
}

function userLoginFail(err) {
  console.log(err);
  responseDiv.innerText = `Login Failed \n ${err}`;
}

let responseDiv = document.getElementById("loginResponse");
let loginButton = document.getElementById("loginButton");

loginButton.addEventListener("click", loginUser);
