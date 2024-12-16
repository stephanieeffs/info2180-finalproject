// Function to toggle visibility of sections
function showSection(section) {
    document.getElementById("login-form").classList.add("hidden");
    document.getElementById("dashboard").classList.add("hidden");

    const sectionElement = document.getElementById(section);
    if (sectionElement) {
        sectionElement.classList.remove("hidden");
    } else {
        console.error(`Section ${section} not found in DOM.`);
    }
}

// Logout Functionality
function logoutUser() {
    const confirmLogout = confirm("Are you sure you want to log out?");
    
    if (confirmLogout) {
        fetch("logout.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                alert("Logout successful!");
                showSection('login-form'); // Show login form after logout
            } else {
                alert("Logout failed: " + data.error);
            }
        })
        .catch((error) => {
            console.error("Fetch error:", error);
            alert("An error occurred while logging out. Please try again.");
        });
    }
}

// Add event listener for the logout button
document.addEventListener("DOMContentLoaded", () => {
    const logoutButton = document.getElementById("logout-button");
    if (logoutButton) {
        logoutButton.addEventListener("click", logoutUser);
    }
});

function logoutUser() {
    const confirmLogout = confirm("Are you sure you want to log out?");
    
    if (confirmLogout) {
        fetch("logout.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                alert("Logout successful!");
                showSection('login-form'); // Show login form
            } else {
                alert("Logout failed: " + data.error);
            }
        })
        .catch((error) => {
            console.error("Fetch error:", error);
            alert("An error occurred while logging out. Please try again.");
        });
    } else {
        console.log("Logout cancelled.");
    }
}

// Add event listener to the logout button
document.addEventListener("DOMContentLoaded", () => {
    const logoutButton = document.getElementById("logout-button");
    if (logoutButton) {
        logoutButton.addEventListener("click", logoutUser);
    }
});
