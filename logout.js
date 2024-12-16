function logoutUser() {
    const confirmLogout = confirm("Are you sure you want to log out?");
    
    if (confirmLogout) {
        // Send a POST request to logout.php to destroy the session
        fetch("logout.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                alert("Logout successful!");
                window.location.href = "login.html";
            } else {
                alert("Logout failed: " + data.error);
            }
        })
        .catch((error) => {
            console.error("Fetch error:", error);
            alert("An error occurred while logging out. Please try again.");
        });
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
