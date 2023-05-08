const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
	event.preventDefault();

	const petName = document.getElementById('pet-name').value;
	const ownerName = document.getElementById('owner-name').value;
	const phoneNumber = document.getElementById('phone-number').value;
	const email = document.getElementById('email').value;
	const appointmentDate = document.getElementById('appointment-date').value;
	const appointmentTime = document.getElementById('appointment-time').value;
	const reasonForVisit = document.getElementById('reason-for-visit').value;

	const appointment = {
		petName,
		ownerName,
		phoneNumber,
		email,
		appointmentDate,
		appointmentTime,
		reasonForVisit
	};

	console.log(appointment);

	// Add code to send appointment data to server or store in database
}
