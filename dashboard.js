const addListener = (selector, event, callback) => {
    document.querySelectorAll(selector).forEach(el => el.addEventListener(event, callback));
};


document.querySelector('.Addcontact-btn').addEventListener('click', function (event) {
    event.preventDefault();
    if (confirm('Do you wish to proceed to create a new contact?')) {
        window.location.href = this.getAttribute('href');
    }
});


addListener('.filter-btn', 'click', function (event) {
    event.preventDefault();
    const filter = this.getAttribute('href').split('=')[1];
    const rows = document.querySelectorAll('.contacts-table tbody tr');

    rows.forEach(row => {
        const type = row.querySelector('.type-badge').textContent.trim().toLowerCase();
        row.style.display = (filter === 'All' || type.includes(filter.toLowerCase())) ? '' : 'none';
    });

    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    this.classList.add('active');
});


addListener('.view-link', 'click', function (event) {
    event.preventDefault();
    const cells = this.closest('tr').cells;
    alert(`Name: ${cells[0].textContent.trim()}\nEmail: ${cells[1].textContent.trim()}\nCompany: ${cells[2].textContent.trim()}\nType: ${cells[3].textContent.trim()}`);
});


addListener('nav a', 'click', function () {
    alert(`Redirecting to the ${this.textContent.trim().toLowerCase()} page.`);
});
