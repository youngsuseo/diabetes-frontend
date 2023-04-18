document.addEventListener('DOMContentLoaded', function () {
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'ko',
        navLinks: true, // 날짜를 선택하면 Day 캘린더나 Week 캘린더로 링크
        editable: true, // 수정 가능?
        selectable: true, // 달력 일자 드래그 설정가능
        nowIndicator: true, // 현재 시간 마크
        dayMaxEvents: true, // 이벤트가 오버되면 높이 제한 (+ 몇 개식으로 표현)
        select: function(arg) { // 캘린더에서 드래그로 이벤트를 생성할 수 있다.
            var title = prompt('Event Title:');
            if (title) {
                calendar.addEvent({
                    title: title,
                    start: arg.start,
                    end: arg.end,
                    allDay: arg.allDay
                })
            }
            calendar.unselect()
        },
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

        fetch('http://127.0.0.1:3000/meals', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify(userInfoWithQuery)
        })
            .then((response) => response.json())
            .then((data) => {
                const event = {
                    title: data.title,
                    start: data.start,
                    allDay: true
                };

                // 캘린더에 이벤트를 추가합니다.
                calendar.addEvent(event);
            })
            .catch((error) => {
                alert("식단을 조회하는 과정에서 에러가 발생하였습니다.");
            });
    });
});