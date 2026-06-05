import "./Calendar.css";

function Calendar() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const offset = startDay === 0 ? 6 : startDay - 1;
  const offsetArray = Array.from({ length: offset });

  const weekdays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

  const activeDays = JSON.parse(localStorage.getItem("activeDays") ?? "[]");

  return (
    <div className="calendar">
      <p className="description">Active days</p>
      <div className="calendar-container">
        {weekdays.map((day) => (
          <p key={day} className="weekday">
            {day}
          </p>
        ))}

        {offsetArray.map((_, i) => (
          <div key={i}></div>
        ))}

        {days.map((day) => (
          <p
            key={day}
            className={`day ${
              activeDays.includes(
                new Date(year, month, day).toLocaleDateString(),
              )
                ? "active-day"
                : ""
            }`}
          >
            {day}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
