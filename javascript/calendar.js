document.addEventListener('DOMContentLoaded', function () {
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'ko',
        events: [
            {
                title: '이벤트 1',
                start: '2023-05-01'
            },
            {
                title: '이벤트 2',
                start: '2023-05-05',
                end: '2023-05-07'
            },
            {
                title: '이벤트 3',
                start: '2023-05-09T16:00:00'
            }
        ]
    });
    calendar.render();

    document.getElementById('addEvent').addEventListener('click', function () {
        // 이벤트 객체를 생성합니다.
        const event = {
            title: '새 이벤트',
            start: '2023-05-01',
            allDay: true
        };

        // 캘린더에 이벤트를 추가합니다.
        calendar.addEvent(event);
    });
});