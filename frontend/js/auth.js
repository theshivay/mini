const { login, register } = "./api.js";

document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const response = await login(email, password);
  if (response.token) {
    localStorage.setItem("token", response.token);
    window.location.href = "dashboard.html";
  } else {
    alert(response.message);
  }
});

document.getElementById("registerForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const response = await register(username, email, password);
  if (response.message === "User registered successfully") {
    window.location.href = "login.html";
  } else {
    alert(response.error);
  }
});
