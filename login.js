<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Login</title>
<script src="https://cdn.tailwindcss.com"></script>
<script src="auth.js"></script>
</head>
<body class="bg-gray-50 flex items-center justify-center h-screen">

<div class="bg-white p-8 rounded shadow w-96">
  <h2 class="text-xl font-semibold mb-4">Login</h2>
  <form id="loginForm">
    <input type="email" id="email" placeholder="Email" class="w-full border px-3 py-2 mb-3 rounded" required>
    <input type="password" id="password" placeholder="Password" class="w-full border px-3 py-2 mb-3 rounded" required>
    <button type="submit" class="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Login</button>
  </form>
</div>

<script>
document.getElementById("loginForm").addEventListener("submit", async e => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if(await loginUser(email,password)) {
    window.location.href = "dashboard.html";
  }
});
</script>
</body>
</html>
