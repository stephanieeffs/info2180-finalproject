document.addEventListener('DOMContentLoaded', function () {
    console.log("Dashboard JS loaded and DOM ready.");

    // Add Contact Button Logic
    const addContactBtn = document.querySelector('.Addcontact-btn');
    if (addContactBtn) {
        addContactBtn.addEventListener('click', function (event) {
            event.preventDefault();
            if (confirm('Do you wish to proceed to create a new contact?')) {
                window.location.href = this.getAttribute('href');
            }
        });
    }

    // Filter Button Logic
    document.querySelectorAll('.filter-btn').forEach(filterButton => {
        filterButton.addEventListener('click', function (event) {
            event.preventDefault();
            const filter = this.getAttribute('href').split('=')[1].toLowerCase();
            const rows = document.querySelectorAll('.contacts-table tbody tr');

            rows.forEach(row => {
                const type = row.querySelector('.type-badge').textContent.trim().toLowerCase();
                row.style.display = filter === 'all' || type.includes(filter) ? '' : 'none';
            });

            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // View Link Logic
    const contactsTableBody = document.querySelector('.contacts-table tbody');
    if (contactsTableBody) {
        contactsTableBody.addEventListener('click', function (event) {
            if (event.target.classList.contains('view-link')) {
                event.preventDefault();
                const row = event.target.closest('tr');
                const cells = row.cells;

                // Extract and display details of the selected row
                alert(`Name: ${cells[0].textContent.trim()}
Email: ${cells[1].textContent.trim()}
Company: ${cells[2].textContent.trim()}
Type: ${cells[3].textContent.trim()}`);
            }
        });
    }
});
