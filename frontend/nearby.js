document.addEventListener('DOMContentLoaded', function() {
    // Sample data for nearby doctors and hospitals with images
    const data = {
        hospitals: [
            { name: "Chennai Medical College", type: "Government", phone: "044-1234-5678", openNow: true, image: "image/chennai-medical.jpg" },
            { name: "Venkatesh Hospital", type: "Private", phone: "044-2345-6789", openNow: false, image: "image/venkatesh-hospital.jpg" },
            { name: "Sriram Health Center", type: "Government", phone: "044-3456-7890", openNow: true, image: "image/sriram-health.jpg" },
            { name: "Ravi Clinic", type: "Private", phone: "044-4567-8901", openNow: true, image: "image/ravi-clinic.jpg" },
            { name: "Kumar Hospitals", type: "Government", phone: "044-5678-9012", openNow: false, image: "image/kumar-hospitals.jpg" },
            { name: "Meenakshi Medical Center", type: "Private", phone: "044-6789-0123", openNow: true, image: "image/meenakshi-medical.jpg" },
            { name: "Natarajan Clinic", type: "Government", phone: "044-7890-1234", openNow: true, image: "image/natarajan-clinic.jpg" },
            { name: "Anand Specialist Hospital", type: "Private", phone: "044-8901-2345", openNow: true, image: "image/anand-specialist.jpg" }
        ],
        doctors: [
            { name: "Dr. Arvind Kumar", specialty: "Cardiology", phone: "044-4567-8901", available: true, image: "image/dr-aravind.jpg" },
            { name: "Dr. Priya Ramesh", specialty: "Orthopedics", phone: "044-5678-9012", available: false, image: "image/dr-priya.jpg" },
            { name: "Dr. Santhosh Suresh", specialty: "Dermatology", phone: "044-6789-0123", available: true, image: "image/dr-santhosh.jpg" },
            { name: "Dr. Meera Rao", specialty: "Pediatrics", phone: "044-7890-1234", available: true, image: "image/dr-meera.jpg" },
            { name: "Dr. Rajesh Babu", specialty: "Neurology", phone: "044-8901-2345", available: false, image: "image/dr-rajesh.jpg" }
        ]
    };

    function renderResults() {
        const resultsEl = document.getElementById('results');
        resultsEl.innerHTML = ''; // Clear previous results

        const showGovt = document.getElementById('show-govt').checked;
        const showPrivate = document.getElementById('show-private').checked;
        const showDoctors = document.getElementById('show-doctors').checked;

        // Helper function to create status indicators
        function createStatusIndicator(status, type) {
            const statusEl = document.createElement('div');
            statusEl.className = 'status-indicator';
            if (type === 'hospital') {
                statusEl.textContent = status ? 'Open Now' : 'Closed';
                statusEl.classList.add(status ? 'available' : 'unavailable');
            } else if (type === 'doctor') {
                statusEl.textContent = status ? 'Available' : 'Not Available';
                statusEl.classList.add(status ? 'available' : 'unavailable');
            }
            return statusEl;
        }

        // Render government hospitals
        if (showGovt) {
            data.hospitals.filter(h => h.type === 'Government').forEach(h => {
                const itemEl = document.createElement('div');
                itemEl.className = 'results-item';
                itemEl.innerHTML = `
                    <img src="${h.image}" alt="${h.name}">
                    <div class="info">
                        <h3>${h.name}</h3>
                        <p>Type: ${h.type}</p>
                        <p>Phone: ${h.phone}</p>
                    </div>
                `;
                itemEl.appendChild(createStatusIndicator(h.openNow, 'hospital'));
                resultsEl.appendChild(itemEl);
            });
        }

        // Render private hospitals
        if (showPrivate) {
            data.hospitals.filter(h => h.type === 'Private').forEach(h => {
                const itemEl = document.createElement('div');
                itemEl.className = 'results-item';
                itemEl.innerHTML = `
                    <img src="${h.image}" alt="${h.name}">
                    <div class="info">
                        <h3>${h.name}</h3>
                        <p>Type: ${h.type}</p>
                        <p>Phone: ${h.phone}</p>
                    </div>
                `;
                itemEl.appendChild(createStatusIndicator(h.openNow, 'hospital'));
                resultsEl.appendChild(itemEl);
            });
        }

        // Render doctors
        if (showDoctors) {
            data.doctors.forEach(d => {
                const itemEl = document.createElement('div');
                itemEl.className = 'results-item';
                itemEl.innerHTML = `
                    <img src="${d.image}" alt="${d.name}">
                    <div class="info">
                        <h3>${d.name}</h3>
                        <p>Specialty: ${d.specialty}</p>
                        <p>Phone: ${d.phone}</p>
                    </div>
                `;
                itemEl.appendChild(createStatusIndicator(d.available, 'doctor'));
                resultsEl.appendChild(itemEl);
            });
        }
    }

    // Function to apply filters
    function applyFilters() {
        renderResults(); // Call renderResults when filters are applied
    }

    // Listen for checkbox changes to apply filters
    document.getElementById('show-govt').addEventListener('change', applyFilters);
    document.getElementById('show-private').addEventListener('change', applyFilters);
    document.getElementById('show-doctors').addEventListener('change', applyFilters);

    // Initial render on page load
    renderResults();
});
