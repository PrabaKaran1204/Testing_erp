// const original_toolbar_make = frappe.ui.toolbar.Toolbar.prototype.make;

// frappe.ui.toolbar.Toolbar.prototype.make = function () {
//     original_toolbar_make.apply(this, arguments);

//     // Check if the button already exists
//     if (!$('#checkin-btn').length) {
//         // Create the check-in button
//         const $checkinButton = $('<button id="checkin-btn" class="btn btn-success">Check In</button>');

//         // Create a span element to display the timer next to the button
//         const $timerDisplay = $('<span id="timer-display" style="margin-left: 10px;">00:00:00</span>');

//         // Find the parent container of the search bar
//         const $searchBarParent = $(".form-inline");

//         // Insert the button and timer before the search bar
//         $checkinButton.insertBefore($(".search-bar", $searchBarParent));
//         $timerDisplay.insertAfter($checkinButton);  // Add timer next to the button

//         // Load saved state from localStorage
//         const savedState = JSON.parse(localStorage.getItem('checkInOutState'));
//         if (savedState && savedState.isCheckedIn) {
//             // Restore Check Out state and start the timer
//             $checkinButton.removeClass('btn-success').addClass('btn-danger').text('Check Out');
//             checkinTime = new Date(savedState.startTime);
//             startTimer();
//         }

//         // Add a click event for the button
//         $checkinButton.on('click', function () {
//             handleCheckInOut();
//         });
//     }
// };

// let timerInterval;
// let checkinTime;

// function handleCheckInOut() {
//     const btn = $('#checkin-btn');
//     const timerDisplay = $('#timer-display');  // Get the timer display element

//     if (btn.hasClass('btn-success')) {
//         // Check In action
//         checkinTime = new Date();  // Record check-in time
//         frappe.call({
//             method: "praba.www.api.create_checkin",
//             args: { checkin_time: checkinTime },
//             callback: function () {
//                 btn.removeClass('btn-success').addClass('btn-danger').text('Check Out');
//                 startTimer();

//                 // Save state to localStorage
//                 localStorage.setItem('checkInOutState', JSON.stringify({ isCheckedIn: true, startTime: checkinTime.toISOString() }));
//             }
//         });

//     } else {
//         // Check Out action
//         const currentDate = new Date(); // Record check-out time

//         const year = currentDate.getFullYear();
//         const month = String(currentDate.getMonth() + 1).padStart(2, '0');
//         const day = String(currentDate.getDate()).padStart(2, '0');
//         const hours = String(currentDate.getHours()).padStart(2, '0');
//         const minutes = String(currentDate.getMinutes()).padStart(2, '0');
//         const seconds = String(currentDate.getSeconds()).padStart(2, '0');

//         // Format as 'YYYY-MM-DD HH:MM:SS'
//         const checkoutTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

//         frappe.call({
//             method: "praba.www.api.create_checkout",
//             args: { checkin_time: checkinTime.toISOString(), checkout_time: checkoutTime },
//             callback: function (response) {
//                 const totalHoursWorked = response.message; // Get total hours worked
//                 btn.removeClass('btn-danger').addClass('btn-success').text('Check In');
//                 stopTimer();
//                 timerDisplay.text('00:00:00'); // Reset timer display

//                 // Clear state from localStorage
//                 localStorage.removeItem('checkInOutState');
//             }
//         });
//     }
// }

// function startTimer() {
//     const timerDisplay = $('#timer-display');  // Get the timer display element

//     timerInterval = setInterval(function () {
//         const now = new Date();
//         const elapsedTime = Math.floor((now - checkinTime) / 1000);  // Calculate elapsed time in seconds

//         // Convert seconds into hours, minutes, and seconds
//         const hours = String(Math.floor(elapsedTime / 3600)).padStart(2, '0');
//         const minutes = String(Math.floor((elapsedTime % 3600) / 60)).padStart(2, '0');
//         const seconds = String(elapsedTime % 60).padStart(2, '0');

//         // Update the timer display with the formatted time
//         timerDisplay.text(`${hours}:${minutes}:${seconds}`);
//     }, 1000);
// }

// function stopTimer() {
//     clearInterval(timerInterval);
//     checkinTime = null;
// }


"+================================================"

const original_toolbar_make = frappe.ui.toolbar.Toolbar.prototype.make;

frappe.ui.toolbar.Toolbar.prototype.make = function () {
    original_toolbar_make.apply(this, arguments);


    // Check if the button already exists
    if (!$('#checkin-btn').length) {
        // Create the check-in button
        const $checkinButton = $('<button id="checkin-btn" class="btn btn-success">Check In</button>');

        // Create a span element to display the timer next to the button
        const $timerDisplay = $('<span id="timer-display" style="margin-left: 10px;">00:00:00</span>');

        // Find the parent container of the search bar
        const $searchBarParent = $(".form-inline");

        // Insert the button and timer before the search bar
        $checkinButton.insertBefore($(".search-bar", $searchBarParent));
        $timerDisplay.insertAfter($checkinButton);  // Add timer next to the button

        // Load saved state from localStorage
        const savedState = JSON.parse(localStorage.getItem('checkInOutState'));
        if (savedState && savedState.isCheckedIn) {
            // Restore Check Out state and start the timer
            $checkinButton.removeClass('btn-success').addClass('btn-danger').text('Check Out');
            checkinTime = new Date(savedState.startTime);
            startTimer();
        }

        // Add a click event for the button
        $checkinButton.on('click', function () {
            handleCheckInOut();
        });
    }
};

let timerInterval;
let checkinTime;

function handleCheckInOut() {
    const btn = $('#checkin-btn');
    const timerDisplay = $('#timer-display');  // Get the timer display element
    console.log("step-1");
    if (btn.hasClass('btn-success')) {
        console.log("step-2");
        // Check In action
        checkinTime = new Date();  // Record check-in time
        frappe.call({
            method: "praba.www.api.create_checkin",
            args: { checkin_time: checkinTime },
            callback: function () {
                btn.removeClass('btn-success').addClass('btn-danger').text('Check Out');
                startTimer();

                // Save state to localStorage
                localStorage.setItem('checkInOutState', JSON.stringify({ isCheckedIn: true, startTime: checkinTime.toISOString() }));
            }
        });

    } else {
        console.log("step-3");
        // Check Out action
        const currentDate = new Date(); // Record check-out time

        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        const seconds = String(currentDate.getSeconds()).padStart(2, '0');

        // Format as 'YYYY-MM-DD HH:MM:SS'
        const checkoutTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        console.log(checkinTime);
        frappe.call({
            method:"praba.www.api.create_checkout",
            args: { checkin_time: checkinTime, checkout_time: checkoutTime },
            callback: function (response) {
                const totalHoursWorked = response.message; // Get total hours worked
                btn.removeClass('btn-danger').addClass('btn-success').text('Check In');
                stopTimer();
                timerDisplay.text('00:00:00'); // Reset timer display

                // Clear state from localStorage
                localStorage.removeItem('checkInOutState');
            }
        });
    }
}

function startTimer() {
    const timerDisplay = $('#timer-display');  // Get the timer display element

    timerInterval = setInterval(function () {
        const now = new Date();
        const elapsedTime = Math.floor((now - checkinTime) / 1000);  // Calculate elapsed time in seconds

        // Convert seconds into hours, minutes, and seconds
        const hours = String(Math.floor(elapsedTime / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((elapsedTime % 3600) / 60)).padStart(2, '0');
        const seconds = String(elapsedTime % 60).padStart(2, '0');

        // Update the timer display with the formatted time
        timerDisplay.text(`${hours}:${minutes}:${seconds}`);
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    checkinTime = null;
}