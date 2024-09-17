document.addEventListener("DOMContentLoaded", function() {
    // Attach event listener to the form submit event
    document.getElementById("loginForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default form submission

        // Get values from form inputs
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;

        // Basic validation checks
        if (username === "" || password === "") {
            alert("Please enter both username and password.");
            return;
        }

        // Simulate authentication (replace with real server-side check in production)
        if (authenticateUser(username, password)) {
            // Store the username in sessionStorage
            sessionStorage.setItem("username", username);

            // Redirect to the dashboard page
            window.location.href = "dash.html";
        } else {
            alert("Invalid credentials, please try again.");
        }
    });

    // Simulate authentication function
    function authenticateUser(username, password) {
        // Simulated user database (for testing)
        const userDatabase = {
            "dhanu": "1234",
            "abi": "abcd",
            "admin": "admin"
        };

        // Check if user exists and password matches
        return userDatabase[username] && userDatabase[username] === password;
    }
});
