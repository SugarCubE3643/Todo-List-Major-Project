// Setting the minimum for due date as current date as it cannot be a date before today
const datePicker = document.querySelector('input[type="date"][name="dueDate"]');
datePicker.min = new Date().toLocaleDateString('en-ca');