import React, { useState } from 'react';
import { useAppContext } from './AppContext';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

function Calendar() {
  const [viewMode, setViewMode] = useState('month'); // 'month' or 'week'
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate);

  // Function to switch months
  const handlePrevMonth = () => {
    const prevMonth = new Date(currentMonth);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setCurrentMonth(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentMonth(nextMonth);
  };

  // Function to generate days for the month view
  const generateMonthView = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = firstDayOfMonth.getDay();

    const totalCells = Math.ceil((firstDayIndex + daysInMonth) / 7) * 7;
    const days = [];

    for (let cellIndex = 0; cellIndex < totalCells; cellIndex++) {
      const dayNumber = cellIndex - firstDayIndex + 1;

      if (cellIndex < firstDayIndex || dayNumber > daysInMonth) {
        // Empty cells before the first day and after the last day
        days.push(
          <div key={`empty-${cellIndex}`} className="h-24 border border-stone-200 bg-stone-50"></div>
        );
      } else {
        const isToday =
          dayNumber === currentDate.getDate() &&
          month === currentDate.getMonth() &&
          year === currentDate.getFullYear();

        days.push(
          <div
            key={dayNumber}
            className={`h-24 border border-stone-200 flex flex-col items-center p-1 ${
              isToday ? 'bg-blue-100' : 'bg-white'
            } hover:bg-stone-100`}
          >
            <span className="font-medium text-stone-700">{dayNumber}</span>
            {/* Placeholder for events/tasks */}
          </div>
        );
      }
    }

    return days;
  };

  // Function to generate days for the week view
  const generateWeekView = () => {
    const days = [];
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

    for (let i = 0; i < 7; i++) {
      const dayDate = new Date(startOfWeek);
      dayDate.setDate(dayDate.getDate() + i);

      const isToday =
        dayDate.toDateString() === currentDate.toDateString();

      days.push(
        <div
          key={i}
          className={`h-64 border border-stone-200 flex flex-col items-center p-2 ${
            isToday ? 'bg-blue-100' : 'bg-white'
          } hover:bg-stone-100`}
        >
          <span className="text-sm text-stone-500">
            {dayDate.toLocaleDateString('en-US', { weekday: 'short' })}
          </span>
          <span className="font-medium text-stone-700">{dayDate.getDate()}</span>
          {/* Placeholder for events/tasks */}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
        <p className="font-sans font-bold text-stone-700 text-2xl py-5"> da Calendar ,</p>
      <div className="p-6 bg-white rounded shadow-md w-11/12">
        {/* Header with Month and View Toggle */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={handlePrevMonth}
              className="p-1 rounded hover:bg-stone-200"
            >
              <ChevronLeftIcon className="h-5 w-5 text-stone-600" />
            </button>
            <h2 className="text-xl font-semibold text-stone-700">
              {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            <button
              onClick={handleNextMonth}
              className="p-1 rounded hover:bg-stone-200"
            >
              <ChevronRightIcon className="h-5 w-5 text-stone-600" />
            </button>
          </div>
          <button
            onClick={() => setViewMode(viewMode === 'month' ? 'week' : 'month')}
            className="px-4 py-2 bg-stone-500 text-white rounded hover:bg-stone-600"
          >
            Switch to {viewMode === 'month' ? 'Week' : 'Month'} View
          </button>
        </div>

        {/* Calendar Header */}
        <div className="grid grid-cols-7 border-b border-stone-300">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="py-2 text-center font-medium text-stone-600">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Body */}
        {viewMode === 'month' ? (
          <div className="grid grid-cols-7">
            {generateMonthView()}
          </div>
        ) : (
          <div className="grid grid-cols-7">
            {generateWeekView()}
          </div>
        )}
      </div>
    </div>
  );
}

export default Calendar;