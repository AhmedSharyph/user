// Google Apps Script Web App URL
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwk3eL74-PFX7acEUU3ddiPnGrHW8zBgVRNG4mQPT1v_CbV1ctc2dPxewEGIQqLnwBncA/exec";

// Register user
async function registerUser(email, password, confirm) {
  if(password !== confirm){
    alert("Passwords do not match!");
    return false;
  }

  const formData = new URLSearchParams({ action: "register", email, password });
  const res = await fetch(WEB_APP_URL, { method: "POST", body: formData });
  const result = await res.json();
  alert(result.message);
  return result.success;
}

// Login user
async function loginUser(email, password) {
  const formData = new URLSearchParams({ action: "login", email, password });
  const res = await fetch(WEB_APP_URL, { method: "POST", body: formData });
  const result = await res.json();
  alert(result.message);
  if(result.success){
    localStorage.setItem("loggedIn", email);
    localStorage.setItem("lastActivity", Date.now());
  }
  return result.success;
}

// Check session & auto-logout after 10 min inactivity
function checkSession() {
  const last = localStorage.getItem("lastActivity");
  if(!localStorage.getItem("loggedIn") || (last && Date.now()-last>10*60*1000)) {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("lastActivity");
    window.location.href = "login.html";
  } else {
    localStorage.setItem("lastActivity", Date.now());
  }
}

// Logout function
function logoutUser() {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("lastActivity");
  window.location.href = "login.html";
}
