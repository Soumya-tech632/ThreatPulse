async function checkSystemStatus() {
    const statusElement = document.getElementById("systemStatus");

    try {
        const response = await fetch("/api/health");

        if (!response.ok) {
            throw new Error("Health check failed");
        }

        const data = await response.json();

        if (data.phishguard && data.deepfake) {
            statusElement.textContent = "● All Systems Online";
            statusElement.style.background = "#166534";
        }
        else if (data.phishguard) {
            statusElement.textContent = "● PhishGuard Online";
            statusElement.style.background = "#2563eb";
        }
        else if (data.deepfake) {
            statusElement.textContent = "● Deepfake Detection Online";
            statusElement.style.background = "#7c3aed";
        }
        else {
            statusElement.textContent = "● Systems Offline";
            statusElement.style.background = "#991b1b";
        }

    } catch (error) {
        console.error("System status error:", error);

        statusElement.textContent = "● Integration Offline";
        statusElement.style.background = "#991b1b";
    }
}


// Check when page loads
checkSystemStatus();


// Check again every 10 seconds
setInterval(checkSystemStatus, 10000);