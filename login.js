
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
                alert("Login successful!");
                document.getElementById("login-form").classList.add("hidden");
                document.getElementById("add-user-form").classList.remove("hidden");
            } else {
                alert("Login failed: " + data.error);
            }
        })
        .catch((error) => console.error("Fetch error:", error));
}


function addUser() {
    const firstName = document.getElementById("first_name").value;
    const lastName = document.getElementById("last_name").value;
    const email = document.getElementById("new_email").value;
    const password = document.getElementById("new_password").value;
    const role = document.getElementById("role").value;

    fetch("add_user.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `first_name=${encodeURIComponent(firstName)}&last_name=${encodeURIComponent(lastName)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&role=${encodeURIComponent(role)}`,
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                document.getElementById("add-user-success").style.display = "block";
                document.getElementById("add-user-error").style.display = "none";
            } else {
                document.getElementById("add-user-error").style.display = "block";
                document.getElementById("add-user-success").style.display = "none";
            }
        });
}
