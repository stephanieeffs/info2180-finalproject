// Function to toggle visibility of sections
function loginUser() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch("login.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
    })
    .then(response => response.json())
    .then(data => {
        console.log("Login Response:", data);

        if (data.success) {
            // Use showSection to toggle the dashboard
            showSection('dashboard');
            console.log("Dashboard displayed successfully.");
            loadDashboardContacts();
        } else {
            document.getElementById("login-error").style.display = "block";
        }
    })
    .catch(error => console.error("Fetch error:", error));
}

function loadDashboardContacts() {
    console.log("Fetching contacts...");
    fetch('dashboard.php?action=fetch_contacts')
    .then(response => response.json())
    .then(data => {
        console.log("Contacts Response:", data);

        const tableBody = document.getElementById('contacts-table-body');

        if (!tableBody) {
            console.error("#contacts-table-body not found.");
            return;
        }

        tableBody.innerHTML = ""; // Clear any existing rows

        data.forEach(contact => {
            const row = `
                <tr>
                    <td>${contact.firstname} ${contact.lastname}</td>
                    <td>${contact.email}</td>
                    <td>${contact.company}</td>
                    <td><span class="type-badge">${contact.type}</span></td>
                    <td><a href="#" class="view-link">View</a></td>
                </tr>
            `;
            tableBody.insertAdjacentHTML('beforeend', row);
        });

        // Event delegation for "View" links
        tableBody.addEventListener('click', function (event) {
            if (event.target.classList.contains('view-link')) {
                event.preventDefault();
                const row = event.target.closest('tr').cells;
                alert(`Name: ${row[0].textContent.trim()}
Email: ${row[1].textContent.trim()}
Company: ${row[2].textContent.trim()}
Type: ${row[3].textContent.trim()}`);
            }
        });

    })
    .catch(error => console.error("Error fetching contacts:", error));
}
