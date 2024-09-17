document.addEventListener('DOMContentLoaded', function() {
    // Initialize Calendar
    const calendarEl = document.getElementById('calendar');
    let calendar;
    if (calendarEl) {
        calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            nowIndicator: true,
            events: [
                {
                    title: 'Doctor Appointment',
                    start: '2024-09-20',
                    end: '2024-09-20'
                },
                {
                    title: 'Medication Reminder',
                    start: '2024-09-22T10:00:00',
                    end: '2024-09-22T10:30:00'
                },
                {
                    title: 'Health Checkup',
                    start: '2024-09-25',
                    end: '2024-09-25'
                }
                // Add more events here
            ]
        });
        calendar.render();
    }

    // Initialize Water Intake Chart
    const waterChartEl = document.getElementById('waterChart');
    if (waterChartEl) {
        const waterCtx = waterChartEl.getContext('2d');
        window.waterChart = new Chart(waterCtx, {
            type: 'doughnut',
            data: {
                labels: ['Consumed', 'Remaining'],
                datasets: [{
                    data: [1.5, 1.0], // Example values
                    backgroundColor: ['#00aaff', '#f0f0f0']
                }]
            }
        });
    }

    // Initialize Progress Chart
    const progressChartEl = document.getElementById('progressChart');
    if (progressChartEl) {
        const progressCtx = progressChartEl.getContext('2d');
        new Chart(progressCtx, {
            type: 'line',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                datasets: [{
                    label: 'Progress',
                    data: [70, 80, 80, 80, 90, 95],
                    borderColor: '#007bff',
                    backgroundColor: 'rgba(0, 123, 255, 0.2)'
                }]
            }
        });
    }

    // Clock Update
    function updateClock() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const clockEl = document.getElementById('clock');
        if (clockEl) {
            clockEl.textContent = `${hours}:${minutes}:${seconds}`;
        }
    }
    setInterval(updateClock, 1000);
    updateClock(); // Initial call to set the time immediately

    // Notification Dropdown
    const notificationBtn = document.querySelector('.notifications .notification-btn');
    const notificationDropdown = document.querySelector('.notifications .dropdown');

    if (notificationBtn && notificationDropdown) {
        notificationBtn.addEventListener('click', function() {
            notificationDropdown.style.display = notificationDropdown.style.display === 'block' ? 'none' : 'block';
        });
    }

    // Dialog Management Functions
    window.openDialog = function(dialogId) {
        const dialogEl = document.getElementById(dialogId);
        if (dialogEl) {
            dialogEl.style.display = 'block';
        }
    }

    window.closeDialog = function(dialogId) {
        const dialogEl = document.getElementById(dialogId);
        if (dialogEl) {
            dialogEl.style.display = 'none';
        }
    }

    // Add Appointment
    window.addAppointment = function() {
        const title = document.getElementById('appointment-title').value;
        const date = document.getElementById('appointment-date').value;
        if (title && date) {
            const eventData = {
                title: title,
                start: date,
                end: date
            };

            // Update Calendar
            if (calendar) {
                calendar.addEvent(eventData);
            }

            // Update Appointment List
            const appointmentsList = document.getElementById('appointments-list');
            if (appointmentsList) {
                const newListItem = document.createElement('li');
                newListItem.textContent = `${title} - ${date}`;
                appointmentsList.appendChild(newListItem);
            }

            alert(`Appointment Added: ${title} on ${date}`);
            closeDialog('appointment-dialog');
        } else {
            alert('Please fill in both Title and Date.');
        }
    }

    // Add Medication
    window.addMedication = function() {
        const name = document.getElementById('medication-name').value;
        const time = document.getElementById('medication-time').value;
        if (name && time) {
            const medicationList = document.querySelector('.medication-list');
            if (medicationList) {
                const newListItem = document.createElement('li');
                newListItem.innerHTML = `
                    <input type="checkbox" id="${name.replace(/\s+/g, '-').toLowerCase()}">
                    <label for="${name.replace(/\s+/g, '-').toLowerCase()}">${name} - ${time}</label>
                `;
                medicationList.appendChild(newListItem);
            }
            alert(`Medication Added: ${name} at ${time}`);
            closeDialog('medication-dialog');
        } else {
            alert('Please fill in both Name and Time.');
        }
    }

    // Water Intake Update
    window.updateWaterIntake = function() {
        const consumed = document.getElementById('water-intake').value;
        if (consumed && window.waterChart) {
            const remaining = 2.5 - parseFloat(consumed); // Assuming daily goal is 2.5 liters
            window.waterChart.data.datasets[0].data = [consumed, remaining];
            window.waterChart.update();
            alert(`Water Intake Updated: ${consumed} liters`);
            closeDialog('water-dialog');
        } else {
            alert('Please enter a valid water intake.');
        }
    }

    // Diet Plan Update
    window.updateDiet = function() {
        const dietPlan = document.getElementById('diet-plan').value;
        const dietPlanDisplay = document.getElementById('diet-plan-display'); // Element to display the updated plan

        if (dietPlan) {
            // Update the display box with the new diet plan
            if (dietPlanDisplay) {
                dietPlanDisplay.textContent = `Current Diet Plan: ${dietPlan}`;
            }

            alert(`Diet Plan Updated: ${dietPlan}`);
            closeDialog('diet-dialog');
        } else {
            alert('Please enter a valid diet plan.');
        }
    }

    // Profile Update
    window.updateProfile = function() {
        const name = document.getElementById('profile-name').value;
        const email = document.getElementById('profile-email').value;
        if (name && email) {
            alert(`Profile Updated: ${name}, ${email}`);
            closeDialog('profile-update-dialog');
        } else {
            alert('Please fill in both Name and Email.');
        }
    }

    // Event Listeners for Dialog Buttons
    const updateWaterBtn = document.querySelector('.update-water-btn');
    const updateDietBtn = document.querySelector('.update-diet-btn');
    const updateProfileBtn = document.querySelector('.update-profile-btn');
    const addAppointmentBtn = document.querySelector('.add-appointment-btn');
    const addMedicationBtn = document.querySelector('.add-medication-btn');

    if (updateWaterBtn) {
        updateWaterBtn.addEventListener('click', () => openDialog('water-dialog'));
    }

    if (updateDietBtn) {
        updateDietBtn.addEventListener('click', () => openDialog('diet-dialog'));
    }

    if (updateProfileBtn) {
        updateProfileBtn.addEventListener('click', () => openDialog('profile-update-dialog'));
    }

    if (addAppointmentBtn) {
        addAppointmentBtn.addEventListener('click', () => openDialog('appointment-dialog'));
    }

    if (addMedicationBtn) {
        addMedicationBtn.addEventListener('click', () => openDialog('medication-dialog'));
    }
});

// Function to open a new window/tab
function openNewWindow(url) {
    window.open(url, '_blank');
}
