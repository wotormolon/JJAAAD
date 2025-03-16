document.addEventListener("DOMContentLoaded", function () {
    // Initialize Map
    var map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Location Dropdown Handling
    document.getElementById("location").addEventListener("change", function () {
        let selectedLocation = this.value;
        
        if (selectedLocation === "current") {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var lat = position.coords.latitude;
                    var lng = position.coords.longitude;
                    map.setView([lat, lng], 15);
                    L.marker([lat, lng]).addTo(map).bindPopup("Your Current Location").openPopup();
                });
            } else {
                alert("Geolocation is not supported by this browser.");
            }
        } else if (selectedLocation === "example1") {
            map.setView([40.7128, -74.0060], 15);
            L.marker([40.7128, -74.0060]).addTo(map).bindPopup("Example Location 1 (New York)").openPopup();
        } else if (selectedLocation === "example2") {
            map.setView([34.0522, -118.2437], 15);
            L.marker([34.0522, -118.2437]).addTo(map).bindPopup("Example Location 2 (Los Angeles)").openPopup();
        }
    });
});

// Back Button Function
function goBack() {
    window.location.href = "index.html";
}
