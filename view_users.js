function loadViewUsers() {
    fetch("view_users.php") 
        .then((response) => response.json()) 
        .then((data) => {
            const tableBody = document.getElementById("userTableBody"); 
            tableBody.innerHTML = ""; 

            if (data.success) {
                
                data.data.forEach((user) => {
                    const row = document.createElement("tr"); 
                    row.innerHTML = `
                        <td>${user.firstname} ${user.lastname}</td>
                        <td>${user.email}</td>
                        <td>${user.role}</td>
                        <td>${user.created_at}</td>
                    `;
                    tableBody.appendChild(row); 
                });
            } else {
              
                tableBody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: red;">${data.error}</td></tr>`;
            }
        })
        .catch((error) => {
            console.error("Error fetching users:", error);
            const tableBody = document.getElementById("userTableBody");
            tableBody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: red;">Failed to load users.</td></tr>`;
        });
}


function showSection(section) {
  
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('dashboard').classList.add('hidden');
    document.getElementById('viewUsers-section').classList.add('hidden');

 
    document.getElementById(`${section}-section`).classList.remove('hidden');

    if (section === "viewUsers") {
        loadViewUsers();
    }
}
