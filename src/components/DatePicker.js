import React, { useState, useEffect } from 'react';

function DatePicker({ initialDate, onDateChange }) {
    const today = new Date();
    const [currentDate, setCurrentDate] = useState(
      initialDate || new Date()
    );
    const [selectedDate, setSelectedDate] = useState(initialDate || null);
    const [showMonthDropdown, setShowMonthDropdown] = useState(false);
    const [showYearDropdown, setShowYearDropdown] = useState(false);

  useEffect(() => {
    const handleClickOutside = () => {
      setShowMonthDropdown(false);
      setShowYearDropdown(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const goToPreviousYear = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1)
    );
  };

  const goToNextYear = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), 1)
    );
  };

  const handleDateClick = (day) => {
    const newSelectedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    setSelectedDate(newSelectedDate);
    if (onDateChange) {
      onDateChange(newSelectedDate);
    }
  };

  const clearDate = () => {
    setSelectedDate(null);
    if (onDateChange) {
      onDateChange(null);
    }
  };

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }


  const LeftArrow = ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M12.707 15.707a1 1 0 01-1.414 0L6.586 11l4.707-4.707a1 1 0 011.414 1.414L9.414 11l3.293 3.293a1 1 0 010 1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
  
  const RightArrow = ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M7.293 4.293a1 1 0 011.414 0L13.414 9l-4.707 4.707a1 1 0 01-1.414-1.414L10.586 9 7.293 5.707a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
  
  const DoubleLeftArrow = ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M11.707 17.707a1 1 0 01-1.414 0L4.586 12l5.707-5.707a1 1 0 111.414 1.414L7.414 12l4.293 4.293a1 1 0 010 1.414z" />
      <path d="M18.707 17.707a1 1 0 01-1.414 0L11.586 12l5.707-5.707a1 1 0 011.414 1.414L14.414 12l4.293 4.293a1 1 0 010 1.414z" />
    </svg>
  );
  
  const DoubleRightArrow = ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12.293 6.293a1 1 0 011.414 0L18.414 11l-4.707 4.707a1 1 0 01-1.414-1.414L15.586 11l-3.293-3.293a1 1 0 010-1.414z" />
      <path d="M5.293 6.293a1 1 0 011.414 0L11.414 11l-4.707 4.707a1 1 0 01-1.414-1.414L8.586 11 5.293 7.707a1 1 0 010-1.414z" />
    </svg>
  );

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="bg-white rounded-sm shadow-xl font-sans w-96">
      {/* Calendar Header */}
      <div className="grid grid-cols-3 items-center px-4 py-2 bg-white">
        {/* Left Navigation Buttons */}
        <div className="flex items-center space-x-2 justify-start">
          <button
            onClick={goToPreviousYear}
            className="bg-stone-200 text-stone-700 hover:bg-stone-300 p-2 rounded-md w-8 h-8 flex items-center justify-center"
          >
            <DoubleLeftArrow className="w-4 h-4" />
          </button>
          <button
            onClick={goToPreviousMonth}
            className="bg-stone-200 text-stone-700 hover:bg-stone-300 p-2 rounded-md w-8 h-8 flex items-center justify-center"
          >
            <LeftArrow className="w-4 h-4" />
          </button>
        </div>

        {/* Month and Year Display */}
        <div className="flex items-center justify-center">
          <span className="text-lg font-bold text-stone-700">
            {currentDate.toLocaleString('default', { month: 'long' })}
          </span>
          <span className="text-lg font-semibold text-stone-500 ml-1">
            {currentDate.getFullYear()}
          </span>
        </div>

        {/* Right Navigation Buttons */}
        <div className="flex items-center space-x-2 justify-end">
          <button
            onClick={goToNextMonth}
            className="bg-stone-200 text-stone-700 hover:bg-stone-300 p-2 rounded-md w-8 h-8 flex items-center justify-center"
          >
            <RightArrow className="w-4 h-4" />
          </button>
          <button
            onClick={goToNextYear}
            className="bg-stone-200 text-stone-700 hover:bg-stone-300 p-2 rounded-md w-8 h-8 flex items-center justify-center"
          >
            <DoubleRightArrow className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Days of the Week */}
      <div className="grid grid-cols-7 text-center text-sm font-semibold text-stone-500 uppercase border-b-2 border-stone-300">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 text-center">
        {calendarDays.map((day, index) => {
          const isToday =
            day &&
            today.getDate() === day &&
            today.getMonth() === currentDate.getMonth() &&
            today.getFullYear() === currentDate.getFullYear();

          const isSelected =
            day &&
            selectedDate &&
            selectedDate.getDate() === day &&
            selectedDate.getMonth() === currentDate.getMonth() &&
            selectedDate.getFullYear() === currentDate.getFullYear();

          return (
            <div key={index} className="h-10 flex items-center justify-center">
              {day && (
                <button
                  onClick={() => handleDateClick(day)}
                  className={`w-8 h-8 flex items-center justify-center rounded-md font-semibold ${
                    isSelected
                      ? 'bg-blue-500 text-white'
                      : isToday
                      ? 'bg-stone-300 text-white'
                      : 'text-stone-700'
                  } hover:bg-stone-200`}
                >
                  <span>{day}</span>
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* 'No Date' and 'Today' Buttons */}
      <div className="flex justify-center space-x-4 py-2">
        <button
          onClick={clearDate}
          className="text-sm text-white hover:text-black font-semibold bg-stone-300 px-4 py-2 rounded-md"
        >
          No Date
        </button>
        <button
          onClick={goToToday}
          className="text-sm text-white hover:text-black font-semibold bg-stone-300 px-4 py-2 rounded-md"
        >
          Today
        </button>
      </div>
    </div>
  );
}

export default DatePicker;