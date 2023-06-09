document.addEventListener('DOMContentLoaded', function () {
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'timeGridWeek',
        headerToolbar: {
            left: 'prev,next',
            right: 'timeGridWeek,timeGridDay' // user can switch between the two
        },
    });
    calendar.render();

    function onSpinner() {
        document.getElementById('loader').style.display = "block";
    }

    function offSpinner() {
        document.getElementById('loader').style.display = "none";
    }

    document.getElementById('addMeals').addEventListener('click', function () {
        const chatMessage = document.getElementById('chat-messages');

        onSpinner();

        fetch('https://jk69r0npih.execute-api.ap-northeast-2.amazonaws.com/prod/meals', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"chatMessage": chatMessage.innerText}),
        })
        .then((response) => response.json())
        .then((data) => {
            JSON.parse(data).forEach(event => {
                calendar.addEvent(event);
            });
            offSpinner();
        })
        .catch((error) => {
            console.log(error);
            alert("식단을 조회하는 과정에서 에러가 발생하였습니다.");
            offSpinner();
        });
    });
});