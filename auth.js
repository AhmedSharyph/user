// auth.js
window.addEventListener("DOMContentLoaded", () => {
  const loginPage = window.location.pathname.includes("login.html"); // skip login page
  const loggedIn = localStorage.getItem("loggedIn");

  if(!loggedIn && !loginPage){
    alert("❌ You must login first!");
    window.location.href = "login.html"; // redirect to login page
  }
});
