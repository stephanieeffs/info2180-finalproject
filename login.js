function loginUser() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch("login.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                // Hide login form and display dashboard
                document.getElementById("login-form").style.display = "none";
                document.getElementById("dashboard").classList.remove("hidden");

                // Fetch and load contacts for the dashboard
                loadContacts();
            } else {
                document.getElementById("login-error").style.display = "block";
            }
        })
        .catch((error) => console.error("Error:", error));
}

function logoutUser() {
    // Simple reload for now
    location.reload();
}

function loadContacts() {
    fetch("dashboard.php?action=fetch_contacts&filter=all")
        .then((response) => response.json())
        .then((contacts) => {
            const tableBody = document.getElementById("contacts-table-body");
            tableBody.innerHTML = ""; // Clear previous data

            contacts.forEach((contact) => {
                const row = `
                    <tr>
                        <td>${contact.firstname} ${contact.lastname}</td>
                        <td>${contact.email}</td>
                        <td>${contact.company}</td>
                        <td><span class="type-badge">${contact.type}</span></td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        })
        .catch((error) => console.error("Error loading contacts:", error));
}
