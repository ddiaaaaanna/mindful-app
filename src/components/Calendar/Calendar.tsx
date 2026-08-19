import { useState } from "react";
import "./Calendar.css";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";

function Calendar() {
  const [displayedDate, setDisplayedDate] = useState(new Date());
  const today = new Date();
  const yearToday = today.getFullYear();
  const monthToday = today.getMonth();
  const year = displayedDate.getFullYear();
  const month = displayedDate.getMonth();
  const monthName = displayedDate.toLocaleDateString("default", {
    month: "long",
  });
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const offset = startDay === 0 ? 6 : startDay - 1;
  const offsetArray = Array.from({ length: offset });

  const weekdays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

  const activeDays = JSON.parse(localStorage.getItem("activeDays") ?? "[]");

  function nextMonth() {
    setDisplayedDate(new Date(year, month + 1, 1));
  }

  function prevMonth() {
    setDisplayedDate(new Date(year, month - 1, 1));
  }

  return (
    <div className="calendar">
      <p className="description">Active days</p>
      <div className="calendar-container">
        <div className="calendar-header">
          <div className="calendar-controls">
            <button className="" onClick={prevMonth}>
              <MdKeyboardArrowLeft />
            </button>
            <p className="description">{monthName}</p>

            <button
              className={
                year === yearToday && month === monthToday ? "unavailable" : ""
              }
              onClick={nextMonth}
            >
              <MdKeyboardArrowRight />
            </button>
          </div>
        </div>
        <div className="calendar-content">
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
    </div>
  );
}

export default Calendar;
