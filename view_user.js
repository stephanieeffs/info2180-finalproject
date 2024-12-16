// Function to fetch and display users in a table
function loadViewUsers() {
    fetch("view_users.php") // Request to your PHP script
        .then((response) => response.json()) // Parse response as JSON
        .then((data) => {
            if (data.success) {
                const tableBody = document.getElementById("userTableBody"); // Target table body
                tableBody.innerHTML = ""; // Clear any existing table content

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
                alert("Error: " + data.error); // Display error message
            }
        })
        .catch((error) => {
            console.error("Error fetching users:", error); // Log any errors
        });
}

// Automatically load users when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    loadViewUsers();
});
