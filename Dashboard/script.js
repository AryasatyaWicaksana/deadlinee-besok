// dashboard.js - Fungsionalitas khusus dashboard

document.addEventListener('DOMContentLoaded', function() {
    initDashboard();
});

function initDashboard() {
    // Check if user is logged in
    checkLoginStatus();
    
    // Initialize event listeners
    initEventListeners();
    
    // Load dashboard data
    loadDashboardData();
    
    console.log('Dashboard initialized successfully');
}

function checkLoginStatus() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const currentUser = sessionStorage.getItem('currentUser');
    
    if (!isLoggedIn || !currentUser) {
        // Redirect to login if not authenticated
        window.location.href = '../index.html';
        return;
    }
    
    // You can display user info in the dashboard if needed
    console.log(`Welcome, ${currentUser}!`);
}

function initEventListeners() {
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    // Search functionality
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    // Navigation active state
    highlightCurrentPage();
}

function handleLogout() {
    // Clear session storage
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('currentUser');
    
    // Show logout message
    showMessage('Logout successful! Redirecting to login...', 'success');
    
    // Redirect to login page
    setTimeout(() => {
        window.location.href = '../index.html';
    }, 1500);
}

function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    const tableRows = document.querySelectorAll('.table tbody tr');
    
    tableRows.forEach(row => {
        const rowText = row.textContent.toLowerCase();
        if (rowText.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop();
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        if (link) {
            const href = link.getAttribute('href');
            if (href === currentPage) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        }
    });
}

function loadDashboardData() {
    // Simulate loading data from API
    console.log('Loading dashboard data...');
    
    // In a real application, you would fetch data from your backend here
    // For now, we'll just simulate with a timeout
    setTimeout(() => {
        updateDashboardStats();
        console.log('Dashboard data loaded successfully');
    }, 1000);
}

function updateDashboardStats() {
    // This function would update the dashboard with real data
    // For now, we're using static data from the HTML
    
    // Example of dynamic update (you can replace this with real API calls)
    const stats = {
        employees: 15,
        materials: 32,
        transactions: 117,
        inventoryValue: 'Rp 10.000.00'
    };
    
    console.log('Dashboard stats updated:', stats);
}

function showMessage(message, type) {
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `alert alert-${type === 'success' ? 'success' : 'danger'} alert-dismissible fade show`;
    messageEl.style.position = 'fixed';
    messageEl.style.top = '20px';
    messageEl.style.right = '20px';
    messageEl.style.zIndex = '9999';
    messageEl.style.minWidth = '300px';
    messageEl.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Add to page
    document.body.appendChild(messageEl);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (messageEl.parentNode) {
            messageEl.remove();
        }
    }, 5000);
}

// Export functions for global access if needed
window.dashboardModule = {
    initDashboard,
    handleLogout,
    showMessage
};