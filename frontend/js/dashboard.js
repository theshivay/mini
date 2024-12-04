document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "index.html";
  });
  
  const token = localStorage.getItem("token");
  if (!token) window.location.href = "index.html"; // Redirect to login page if not authenticated
  
  // Decode the JWT to get user details (you can use a library like jwt-decode for better JWT handling)
  const jwtDecode = (token) => {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
  };
  
  // Get user details from the decoded JWT token
  const user = jwtDecode(token);
  
  // Display user info
  document.getElementById("username").textContent = user.username || "User";
  document.getElementById("roles").textContent = user.roles.join(", ") || "No role assigned";
  
  // Optional: Display specific content based on the user's role
  if (user.roles.includes("Admin")) {
    // Show Admin-specific content
    const adminContent = document.createElement("div");
    adminContent.className = "alert alert-info mt-4";
    adminContent.textContent = "You have Admin access. You can manage users and roles.";
    document.querySelector(".container").appendChild(adminContent);
  }
  
  if (user.roles.includes("User")) {
    // Show User-specific content
    const userContent = document.createElement("div");
    userContent.className = "alert alert-success mt-4";
    userContent.textContent = "You are a regular user. Enjoy exploring the app!";
    document.querySelector(".container").appendChild(userContent);
  }
   // Replace with dynamic roles fetched from API

const apiBaseUrl = "http://localhost:5500/api";
let currentPage = 1;
let totalPages = 1;

document.getElementById("prevPageBtn").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    fetchUsers();
  }
});

document.getElementById("nextPageBtn").addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    fetchUsers();
  }
});

const fetchUsers = async () => {
  try {
    const response = await fetch(`${apiBaseUrl}/users?page=${currentPage}`);
    const data = await response.json();
    
    totalPages = data.totalPages;
    renderUsers(data.users);
    updatePaginationControls();
  } catch (error) {
    console.error("Error fetching users", error);
  }
};

const renderUsers = (users) => {
  const tableBody = document.getElementById("userTableBody");
  tableBody.innerHTML = ""; // Clear existing rows

  users.forEach((user, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${(currentPage - 1) * 10 + index + 1}</td>
      <td>${user.username}</td>
      <td>${user.email}</td>
      <td>${user.role}</td>
      <td><button class="btn btn-danger">Delete</button></td>
    `;
    tableBody.appendChild(row);
  });
};

const updatePaginationControls = () => {
  document.getElementById("pageIndicator").textContent = `Page ${currentPage} of ${totalPages}`;
  document.getElementById("prevPageBtn").disabled = currentPage === 1;
  document.getElementById("nextPageBtn").disabled = currentPage === totalPages;
};

// Initial data fetch
fetchUsers();
