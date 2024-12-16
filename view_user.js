// Function to fetch and display users in a table
function loadViewUsers() {
    fetch("view_users.php") // Request to your PHP script
        .then((response) => response.json()) // Parse response as JSON
        .then((data) => {
            const tableBody = document.getElementById("userTableBody"); // Target table body
            tableBody.innerHTML = ""; // Clear any existing table content

            if (data.success) {
                // Loop through each user object and create table rows
                data.data.forEach((user) => {
                    const row = document.createElement("tr"); // Create table row
                    row.innerHTML = `
                        <td>${user.firstname} ${user.lastname}</td>
                        <td>${user.email}</td>
                        <td>${user.role}</td>
                        <td>${user.created_at}</td>
                    `;
                    tableBody.appendChild(row); // Add row to the table
                });
            } else {
                // Display an error message in the table
                tableBody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: red;">${data.error}</td></tr>`;
            }
        })
        .catch((error) => {
            console.error("Error fetching users:", error);
            const tableBody = document.getElementById("userTableBody");
            tableBody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: red;">Failed to load users.</td></tr>`;
        });
}

// Function to handle section visibility and load users when navigating
function showSection(section) {
    // Hide all sections
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('dashboard').classList.add('hidden');
    document.getElementById('viewUsers-section').classList.add('hidden');

    // Show the selected section
    document.getElementById(`${section}-section`).classList.remove('hidden');

    // Load user data only when the "viewUsers" section is shown
    if (section === "viewUsers") {
        loadViewUsers();
    }
}
