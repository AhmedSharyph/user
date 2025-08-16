// ========== CONFIG ==========
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzvPuBw19Zy-f-I8S8rpO4WlHHygHFeWc-MyAKTlEfy5bVTvc2Id31Fu6Yb7dy2KnXW2Q/exec";

// ========== SESSION MANAGEMENT ==========
function checkSession() {
  const loggedIn = localStorage.getItem("loggedIn");
  const userEmail = localStorage.getItem("userEmail");

  if (!loggedIn || !userEmail) {
    // Redirect to login page
    window.location.href = "index.html";
    return false;
  }

  // Show user email in dashboard
  const emailSpan = document.getElementById("userEmail");
  if (emailSpan) emailSpan.textContent = userEmail;

  return true;
}

// Logout function
function logout() {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("userEmail");
  window.location.href = "index.html";
}

// Auto-logout after 10 minutes of inactivity
let inactivityTime = function () {
  let timer;
  function resetTimer() {
    clearTimeout(timer);
    timer = setTimeout(logout, 10 * 60 * 1000); // 10 minutes
  }

  window.onload = resetTimer;
  document.onmousemove = resetTimer;
  document.onkeydown = resetTimer;
};

inactivityTime();

// ========== DYNAMIC HEADER ==========
function loadHeader() {
  const header = document.getElementById("header-placeholder");
  if (!header) return;

  header.innerHTML = `
    <header class="bg-blue-500 text-white p-4 flex justify-between items-center">
      <h1 class="text-xl font-bold">Shaviyani Health Directory</h1>
      <button onclick="logout()" class="bg-white text-blue-500 px-4 py-1 rounded hover:bg-gray-200">Logout</button>
    </header>
  `;
}

// ========== OPTIONAL: FETCH USER DATA ==========
async function fetchUserData() {
  const email = localStorage.getItem("userEmail");
  if (!email) return;

  const formData = new URLSearchParams({
    action: "getUserData",
    email: email
  });

  try {
    const response = await fetch(WEB_APP_URL, {
      method: "POST",
      body: formData
    });
    const result = await response.json();

    if (result.success) {
      // Example: populate user details somewhere in the page
      const profileEl = document.getElementById("userProfile");
      if (profileEl) profileEl.textContent = `Welcome ${result.data.email}`;
    } else {
      console.warn("No user data found or session expired.");
    }
  } catch (err) {
    console.error("Error fetching user data:", err);
  }
}

// ========== INITIALIZE ==========
document.addEventListener("DOMContentLoaded", () => {
  if (checkSession()) {
    loadHeader();
    fetchUserData(); // fetch optional data
  }
});
