document.getElementById('loginForm').addEventListener('submit', function(event) {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email === '' || password === '') {
        event.preventDefault();
        alert('Please fill in all fields');
    }

    // Further validation can be added here
});
