document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.querySelector('#chat form');
    const chatMessages = document.getElementById('chat-messages');

    function onSpinner() {
        document.getElementById('loader').style.display = "block";
    }

    function offSpinner() {
        document.getElementById('loader').style.display = "none";
    }

    let userMessages = [];
    let assistantMessages = [];
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const userInput = document.getElementById('user-input');
        const message = document.createElement('div');

        onSpinner();

        message.textContent = `${userInput.value}`;
        chatMessages.appendChild(message);
        userMessages.push(userInput.value);

        console.log(userInput.value);

        fetch('https://jk69r0npih.execute-api.ap-northeast-2.amazonaws.com/prod/foods', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "userMessages": userMessages,
                "assistantMessages": assistantMessages,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                assistantMessages.push(data);

                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                // I want to show the error message right side of the chat
                successMessage.style.alignItems = 'right';
                successMessage.style.color = 'white';
                successMessage.style.background = '#2e62a7';
                successMessage.textContent = `${data}`;
                chatMessages.appendChild(successMessage);
                offSpinner();
            })
            .catch((error) => {
                // I want to show the error message right side of the chat
                const failMessage = document.createElement('div');
                failMessage.style.right = '0';
                failMessage.style.color = 'red';
                failMessage.textContent = `${error}`;
                chatMessages.appendChild(failMessage);
                offSpinner();
            });

        userInput.value = '';
    });
});