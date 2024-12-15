function logoutUser() {
    // Show a confirmation prompt
    const confirmLogout = confirm("Are you sure you want to log out?");
    
    if (confirmLogout) {
        fetch("logout.php", {
            method: "POST", // Sends a POST request to destroy the session
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    alert("Logout successful!");
                    window.location.href = "login.html"; // Redirect to the login page
                } else {
                    alert("Logout failed: " + data.error);
                }
            })
            .catch((error) => console.error("Fetch error:", error));
    } else {
        alert("Logout canceled."); // User canceled the logout
    }
}

// Add event listener to the logout button
document.addEventListener("DOMContentLoaded", () => {
    const logoutButton = document.getElementById("logout-button");
    if (logoutButton) {
        logoutButton.addEventListener("click", logoutUser);
    }
});
