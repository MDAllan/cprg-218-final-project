document.addEventListener("DOMContentLoaded", function () {
 
 
  //  Weather API Section 
  const apiKey = "4e5e576e864142e780a45600252403";
  const apiURL = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Cancun`;

  fetch(apiURL)
    .then(response => {
      if (!response.ok) throw new Error("Network response was not OK");
      return response.json();
    })
    .then(data => {
      const cityEl = document.getElementById("city");
      const tempEl = document.getElementById("temp");
      const windEl = document.getElementById("wind");

      if (cityEl) cityEl.innerHTML = `${data.location.name}, ${data.location.country}`;
      if (tempEl) tempEl.innerHTML = `Temperature: ${data.current.temp_c}°C`;
      if (windEl) windEl.innerHTML = `Wind Speed: ${data.current.wind_kph} km/h`;
    })
    .catch(error => {
      console.error("Fetch error:", error);
      const cityEl = document.getElementById("city");
      const tempEl = document.getElementById("temp");
      const windEl = document.getElementById("wind");

      if (cityEl) cityEl.innerHTML = "Weather data unavailable";
      if (tempEl) tempEl.innerHTML = "";
      if (windEl) windEl.innerHTML = "";
    });


  //  FAQ Toggle Functionality 
  document.querySelectorAll(".faq-question").forEach(button => {
    button.addEventListener("click", function () {
      const faqItem = this.parentElement;
      const arrow = this.querySelector(".arrow");

      faqItem.classList.toggle("active");
      arrow.style.transform = faqItem.classList.contains("active") ? "rotate(180deg)" : "rotate(0deg)";
    });
  });


  //Sub-service Options 
  const subServiceOptions = {
    rooms: ["Ocean View Deluxe Room", "Beachfront Suite", "Garden View Family Room", "Premium Oceanfront Suite with Plunge Pool", "Private Beach Hut", "King-sized Bedroom", "Queen-sized Bedroom", "Double-sized Bedroom", "Twin Bedroom", "Single Bedroom", "Accessible Bedroom"],
    spa: ["Shangri La Signature Massage", "Deep Tissue Massage", "Hot Stones Therapy", "Aromatherapy Massage", "Swedish Massage", "Couple Massage", "Sea Salt Body Scrub", "Tropical Body Wrap", "LED Light Therapy", "Sun Relief Wrap", "Shangri-La Deluxe Manicure", "Shangri-La Deluxe Pedicure", "Classic Manicure", "Classic Pedicure", "Scalp Massage", "Eye Treatment", "Foot Reflexology"],
    dining: ["The Beach House", "The Sand Bar", "The Poolside Cafe", "The Lobby Lounge"],
    activities: ["Guided Yoga Classes", "Guided Meditation Sessions", "Beachside Relaxation", "Infinity Pool Retreat", "Snorkeling in Crystal Water", "Beach Volleyball Tournaments", "Island Cooking Classes", "Paddleboarding on Water", "Guided Waterfall Hikes", "Local Market Tour", "Sunset Boat Cruise", "Evening Cultural Show"]
  };

  function showSubOptions() {
    const service = document.getElementById("service")?.value;
    const subServiceSelect = document.getElementById("sub-service");
    const subOptionsDiv = document.getElementById("sub-options");

    if (!service || !subServiceSelect || !subOptionsDiv) return;

    if (subServiceOptions[service]) {
      subServiceSelect.innerHTML = "";
      subServiceOptions[service].forEach(option => {
        const opt = document.createElement("option");
        opt.value = option;
        opt.textContent = option;
        subServiceSelect.appendChild(opt);
      });
      subOptionsDiv.style.display = "block";
    } else {
      subOptionsDiv.style.display = "none";
    }
  }


  // Add event listener to trigger sub-service update when service changes
  const serviceDropdown = document.getElementById("service");
  if (serviceDropdown) {
    serviceDropdown.addEventListener("change", showSubOptions);
    showSubOptions();
  }

  

  //  Mobile Menu Toggle 
  window.toggleMenu = function () {
    const nav = document.querySelector("nav ul");
    if (nav) nav.classList.toggle("show-menu");
  };
});
