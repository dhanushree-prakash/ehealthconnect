let currentPage = 1;
const reportsPerPage = 5; // Number of reports to show per page

// Function to download the report
function downloadReport(fileUrl) {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileUrl.split('/').pop(); // Extracts the file name from the URL
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Function to view the report
function viewReport(fileUrl) {
    window.open(fileUrl, '_blank'); // Opens the file in a new tab
}

// Function to update the report (e.g., open a dialog for updating)
function updateReport(fileUrl) {
    // Here you could open a dialog to let users update the report
    // For now, we'll just show an alert
    alert(`Update functionality for ${fileUrl} is not yet implemented.`);
}

// Function to delete the report
function deleteReport(button, fileUrl) {
    if (confirm('Are you sure you want to delete this report?')) {
        // Optionally, you can also send a request to the server to delete the file
        // Example: 
        // fetch('/delete-report', { method: 'POST', body: JSON.stringify({ fileUrl }) });
        
        const reportItem = button.parentElement;
        reportItem.remove();
        displayReports(); // Refresh the report list after deletion
    }
}

// Function to display reports based on the current page
function displayReports() {
    const reports = document.querySelectorAll('.report-item');
    const totalReports = reports.length;
    const totalPages = Math.ceil(totalReports / reportsPerPage);

    // Hide all reports initially
    reports.forEach(report => {
        report.style.display = 'none';
    });

    // Calculate the start and end index for the current page
    const startIndex = (currentPage - 1) * reportsPerPage;
    const endIndex = Math.min(startIndex + reportsPerPage, totalReports);

    // Show the reports for the current page
    for (let i = startIndex; i < endIndex; i++) {
        reports[i].style.display = 'block';
    }

    // Update page info
    const pageInfo = document.getElementById('page-info');
    if (pageInfo) {
        pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    }
    
    // Disable/Enable navigation buttons
    const prevButton = document.querySelector('.pagination .prev');
    const nextButton = document.querySelector('.pagination .next');
    if (prevButton && nextButton) {
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages;
    }
}

// Function to go to the previous page
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        displayReports();
    }
}

// Function to go to the next page
function nextPage() {
    const totalReports = document.querySelectorAll('.report-item').length;
    const totalPages = Math.ceil(totalReports / reportsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayReports();
    }
}

// Additional functions for search and filter (if needed)
function searchReports() {
    const searchQuery = document.getElementById('search-bar')?.value.toLowerCase();
    const reports = document.querySelectorAll('.report-item');
    
    reports.forEach(report => {
        const textContent = report.textContent.toLowerCase();
        if (textContent.includes(searchQuery)) {
            report.style.display = 'block';
        } else {
            report.style.display = 'none';
        }
    });
    
    // Reset pagination
    currentPage = 1;
    displayReports();
}

function filterByDate() {
    const filterDate = document.getElementById('filter-date')?.value;
    const reports = document.querySelectorAll('.report-item');
    
    reports.forEach(report => {
        const reportDate = report.querySelector('p')?.textContent.split(': ')[1]; // Assumes date is in the second <p> tag
        if (filterDate === '' || filterDate === reportDate) {
            report.style.display = 'block';
        } else {
            report.style.display = 'none';
        }
    });
    
    // Reset pagination
    currentPage = 1;
    displayReports();
}

// Initial call to display the reports on page load
window.onload = function() {
    displayReports();
};

// Adjust pagination button states on page load
document.addEventListener('DOMContentLoaded', () => {
    const prevButton = document.querySelector('.pagination .prev');
    const nextButton = document.querySelector('.pagination .next');
    if (prevButton) {
        prevButton.addEventListener('click', prevPage);
    }
    if (nextButton) {
        nextButton.addEventListener('click', nextPage);
    }
});
