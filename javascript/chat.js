document.addEventListener('DOMContentLoaded', () => {
    const userInfoForm = document.querySelector('#user-info form');
    const chatForm = document.querySelector('#chat form');
    const chatSection = document.getElementById('chat');
    const calenderSection = document.getElementById('calender-section');
    const chatMessages = document.getElementById('chat-messages');
    const infoSubmitButton = document.getElementById('info-submit-button');

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userInput = document.getElementById('user-input');
        const message = document.createElement('div');

        let userInfo = sessionStorage.getItem("userInfo");

        let parse = JSON.parse(userInfo);
        const userInfoWithQuery = {
            gender: parse.gender,
            age: parse.age,
            weight: parse.weight,
            bloodSugar: parse.bloodSugar,
            userQuery: userInput.value
        };

        console.log(userInfoWithQuery);

        fetch('http://127.0.0.1:3000/foods', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfoWithQuery)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('성공:', data);
            })
            .catch((error) => {
                console.error('실패:', error);
            });

        message.textContent = `User: ${userInput.value}`;
        chatMessages.appendChild(message);
        userInput.value = '';
    });

    infoSubmitButton.addEventListener('click', (e) => {
        e.preventDefault();
        saveToStorage();
    });

    function saveToStorage() {
        const gender = document.getElementById("gender").value;
        const age = document.getElementById("age").value;
        const weight = document.getElementById("weight").value;
        const bloodSugar = document.getElementById("blood-sugar").value;

        // 사용자 정보를 객체로 생성
        const userInfo = {
            gender: gender,
            age: parseInt(age),
            weight: parseFloat(weight),
            bloodSugar: parseFloat(bloodSugar)
        };

        // 객체를 JSON 문자열로 변환
        const userInfoJSON = JSON.stringify(userInfo);

        // Session Storage에 JSON 문자열을 저장
        sessionStorage.setItem("userInfo", userInfoJSON);

        chatSection.hidden = false;
        userInfoForm.parentElement.hidden = true;
        calenderSection.hidden = false;
    }
});