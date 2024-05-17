document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;

    if (currentPath.endsWith('search-results.html')) {
        fetchHotels().then(renderHotels).catch(console.error);
    } else if (currentPath.endsWith('booking-details.html')) {
        populateBookingDetails();
    } else if (currentPath.endsWith('payment-details.html')) {
        populatePaymentDetails();
    }
});

function searchHotels() {
    // Fetch search parameters
    const location = document.getElementById('location').value;
    const dateRange = document.getElementById('date-range').value;
    const travelers = document.getElementById('travelers').value;

    // Perform search using fetched parameters (dummy example)
    window.location.href = 'search-results.html';
}

function renderHotels(hotels) {
    const hotelList = document.getElementById('hotel-list');
    hotelList.innerHTML = ''; // Clear previous results

    hotels.forEach(hotel => {
        const hotelItem = document.createElement('div');
        hotelItem.classList.add('hotel-item');

        hotelItem.innerHTML = `
            <img src="${hotel.image}" alt="${hotel.name}">
            <div class="hotel-info">
                <h3>${hotel.name}</h3>
                <p>${hotel.roomType}</p>
                <p>Rating: ${hotel.rating}</p>
                <p>${hotel.currency} ${hotel.price}</p>
                <button onclick="selectHotel('${hotel.id}')">See availability</button>
            </div>
        `;

        hotelList.appendChild(hotelItem);
    });

    document.getElementById('result-title').textContent = `${hotels.length} properties found`;
}

function selectHotel(hotelId) {
    // Save selected hotel ID to localStorage (for simplicity)
    localStorage.setItem('selectedHotelId', hotelId);
    window.location.href = 'booking-details.html';
}

function populateBookingDetails() {
    const selectedHotelId = localStorage.getItem('selectedHotelId');

    if (!selectedHotelId) {
        alert('No hotel selected');
        window.location.href = 'search-results.html';
        return;
    }

    fetchHotelById(selectedHotelId).then(hotel => {
        if (!hotel) {
            alert('Selected hotel not found');
            window.location.href = 'search-results.html';
            return;
        }

        document.getElementById('hotel-name').textContent = hotel.name;
        document.getElementById('hotel-address').textContent = hotel.address;
        document.getElementById('hotel-rating').textContent = `Rating: ${hotel.rating}`;
        document.getElementById('hotel-amenities').textContent = hotel.amenities.join(', ');

        // Populate booking details
        document.getElementById('check-in-date').textContent = localStorage.getItem('checkInDate');
        document.getElementById('check-out-date').textContent = localStorage.getItem('checkOutDate');
        document.getElementById('total-stay').textContent = localStorage.getItem('totalStay');
        document.getElementById('room-selection').textContent = localStorage.getItem('roomSelection');

        // Populate price summary
        document.getElementById('original-price').textContent = `${hotel.currency} ${hotel.originalPrice}`;
        document.getElementById('discount').textContent = `- ${hotel.currency} ${hotel.discount}`;
        document.getElementById('total-price').textContent = `${hotel.currency} ${hotel.price}`;
        document.getElementById('price-breakdown').textContent = hotel.priceBreakdown.join(', ');
        document.getElementById('cancellation-cost').textContent = `${hotel.currency} ${hotel.cancellationCost}`;
    }).catch(console.error);
}

function proceedToPayment() {
    // Save additional booking details to localStorage
    const specialRequests = document.getElementById('special-requests').value;
    const arrivalTime = document.getElementById('arrival-time').value;

    localStorage.setItem('specialRequests', specialRequests);
    localStorage.setItem('arrivalTime', arrivalTime);

    window.location.href = 'payment-details.html';
}

function populatePaymentDetails() {
    const selectedHotelId = localStorage.getItem('selectedHotelId');

    if (!selectedHotelId) {
        alert('No hotel selected');
        window.location.href = 'search-results.html';
        return;
    }

    fetchHotelById(selectedHotelId).then(hotel => {
        if (!hotel) {
            alert('Selected hotel not found');
            window.location.href = 'search-results.html';
            return;
        }

        document.getElementById('hotel-name').textContent = hotel.name;
        document.getElementById('hotel-address').textContent = hotel.address;
        document.getElementById('hotel-rating').textContent = `Rating: ${hotel.rating}`;
        document.getElementById('hotel-amenities').textContent = hotel.amenities.join(', ');

        // Populate booking details
        document.getElementById('check-in-date').textContent = localStorage.getItem('checkInDate');
        document.getElementById('check-out-date').textContent = localStorage.getItem('checkOutDate');
        document.getElementById('total-stay').textContent = localStorage.getItem('totalStay');
        document.getElementById('room-selection').textContent = localStorage.getItem('roomSelection');

        // Populate price summary
        document.getElementById('original-price').textContent = `${hotel.currency} ${hotel.originalPrice}`;
        document.getElementById('discount').textContent = `- ${hotel.currency} ${hotel.discount}`;
        document.getElementById('total-price').textContent = `${hotel.currency} ${hotel.price}`;
        document.getElementById('price-breakdown').textContent = hotel.priceBreakdown.join(', ');
        document.getElementById('cancellation-cost').textContent = `${hotel.currency} ${hotel.cancellationCost}`;
    }).catch(console.error);
}

function payWithMetaMask() {
    // Simulate payment with MetaMask (dummy example)
    alert('Payment successful with MetaMask!');
    window.location.href = 'confirmation.html';
}
