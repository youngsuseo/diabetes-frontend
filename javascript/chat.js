document.addEventListener('DOMContentLoaded', () => {
    const userInfoForm = document.querySelector('#user-info form');
    const chatForm = document.querySelector('#chat form');
    const chatSection = document.getElementById('chat');
    const calenderSection = document.getElementById('calender-section');
    const chatMessages = document.getElementById('chat-messages');
    const infoSubmitButton = document.getElementById('info-submit-button');
    const calendarButton = document.getElementById('calendar-button');
    const makeMealsButton = document.getElementById('make-meals-button');

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userInput = document.getElementById('user-input');
        const message = document.createElement('div');

        message.textContent = `User: ${userInput.value}`;
        chatMessages.appendChild(message);

        console.log(userInput.value);

        fetch('http://127.0.0.1:3000/foods', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"userQuery": userInput.value}),
        })
            .then((response) => response.json())
            .then((data) => {

                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                // I want to show the error message right side of the chat
                successMessage.style.alignItems = 'right';
                successMessage.style.color = 'white';
                successMessage.style.background = '#2e62a7';
                successMessage.textContent = `System: ${data}`;
                chatMessages.appendChild(successMessage);
            })
            .catch((error) => {
                // I want to show the error message right side of the chat
                const failMessage = document.createElement('div');
                failMessage.style.right = '0';
                failMessage.style.color = 'red';
                failMessage.textContent = `System: ${error}`;
                chatMessages.appendChild(failMessage);
            });

        userInput.value = '';
    });
});