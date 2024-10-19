import React, { useState } from 'react';
import { useAppContext } from './AppContext';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

function Calendar() {
  const [viewMode, setViewMode] = useState('month'); // 'month' or 'week'
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate);

  // Get data and functions from context
  const {
    categories,
    tasks,
    addTask,
    taskTypes,
    getTaskByParentRuleCategoryAndDueDate,
    getTasksDueOnDate,
  } = useAppContext();

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

  // Function to determine if a rule applies on a given date
  const doesRuleApplyOnDate = (rule, date) => {
    const dateTime = date.getTime();
    const start = rule.start ? new Date(rule.start).getTime() : null;
    const end = rule.end ? new Date(rule.end).getTime() : null;

    if (start && dateTime < start) {
      return false;
    }
    if (end && dateTime > end) {
      return false;
    }

    // Check if month matches
    if (rule.MONTHS && rule.MONTHS.length > 0) {
      if (!rule.MONTHS.includes(date.getMonth() + 1)) {
        // Months are 1-based
        return false;
      }
    }

    // Now check repeat options
    if (rule.MONTHLY_WEEKDAYS && rule.MONTHLY_WEEKDAYS.length > 0) {
      // Check MONTHLY_WEEKDAYS
      for (let i = 0; i < rule.MONTHLY_WEEKDAYS.length; i++) {
        const pair = rule.MONTHLY_WEEKDAYS[i];
        const weekNumber = pair.number; // e.g., 1st week, 2nd week
        const weekday = pair.weekday; // e.g., 'SUN', 'MON', etc.

        // Map 'SUN' to 0, 'MON' to 1, etc.
        const weekdayMap = {
          SUN: 0,
          MON: 1,
          TUE: 2,
          WED: 3,
          THU: 4,
          FRI: 5,
          SAT: 6,
        };

        const dateWeekday = date.getDay();

        if (weekdayMap[weekday] !== dateWeekday) {
          continue;
        }

        // Find the week number of the date in the month
        const dateInMonth = date.getDate();
        const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const firstWeekdayOfMonth = firstDayOfMonth.getDay();

        const weekOfMonth = Math.floor((dateInMonth + firstWeekdayOfMonth - 1) / 7) + 1;

        if (weekNumber === weekOfMonth) {
          return true;
        }
      }
      return false; // If MONTHLY_WEEKDAYS is specified but date doesn't match any
    } else if (rule.MONTHLY_DATES && rule.MONTHLY_DATES.length > 0) {
      // Check MONTHLY_DATES
      if (rule.MONTHLY_DATES.includes(date.getDate())) {
        return true;
      }
      return false;
    } else if (rule.WEEKLY_DAYS && rule.WEEKLY_DAYS.length > 0) {
      // Check WEEKLY_DAYS
      const dateWeekday = date.getDay(); // 0-6, Sunday=0
      const weekdayMap = {
        0: 'SUN',
        1: 'MON',
        2: 'TUE',
        3: 'WED',
        4: 'THU',
        5: 'FRI',
        6: 'SAT',
      };
      const dateWeekdayStr = weekdayMap[dateWeekday];

      if (rule.WEEKLY_DAYS.includes(dateWeekdayStr)) {
        return true;
      }
      return false;
    } else {
      // No repeat option specified, so rule does not apply
      return false;
    }
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
          <div
            key={`empty-${cellIndex}`}
            className="h-24 border border-stone-200 bg-stone-50"
          ></div>
        );
      } else {
        const isToday =
          dayNumber === currentDate.getDate() &&
          month === currentDate.getMonth() &&
          year === currentDate.getFullYear();

        const date = new Date(year, month, dayNumber);

        // For each category and rule, check if rule applies on this date
        categories.forEach((category) => {
          category.rules.forEach((rule) => {
            if (doesRuleApplyOnDate(rule, date)) {
              // Check if task already exists
              const existingTask = getTaskByParentRuleCategoryAndDueDate(
                rule.id,
                category.id,
                date
              );
              if (!existingTask) {
                // Create new task
                const taskType =
                  category.type === 'TASK'
                    ? taskTypes.AUTO_TASK
                    : taskTypes.AUTO_EVENT;
                addTask({
                  label: rule.name,
                  parentRuleId: rule.id,
                  parentCategoryId: category.id,
                  category: category.id,
                  dueDate: date,
                  type: taskType,
                });
              }
            }
          });
        });

        // Get tasks for this date
        const tasksForDay = getTasksDueOnDate(date);

        days.push(
          <div
            key={dayNumber}
            className={`h-24 border border-stone-200 flex flex-col items-start p-1 ${
              isToday ? 'bg-blue-100' : 'bg-white'
            } hover:bg-stone-100`}
          >
            <span className="font-medium text-stone-700 mr-1 w-4">
              {dayNumber}
            </span>
            {/* Render tasks */}
            <div className="flex flex-col w-full h-full pb-1 overflow-hidden">
              {tasksForDay.map((task, index) => (
                <div
                  key={index}
                  className="text-xs flex mb-0.5 p-0.5 rounded-md items-center truncate"
                  title={`${task.label}`}
                >
                  <span className="mr-1">
                    {
                      categories.find((cat) => cat.id === task.category)
                        ?.symbol || ''
                    }
                  </span>
                  <span className="truncate">{task.label}</span>
                </div>
              ))}
            </div>
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

      const isToday = dayDate.toDateString() === currentDate.toDateString();

      // For each category and rule, check if rule applies on this date
      categories.forEach((category) => {
        category.rules.forEach((rule) => {
          if (doesRuleApplyOnDate(rule, dayDate)) {
            // Check if task already exists
            const existingTask = getTaskByParentRuleCategoryAndDueDate(
              rule.id,
              category.id,
              dayDate
            );
            if (!existingTask) {
              // Create new task
              const taskType =
                category.type === 'TASK'
                  ? taskTypes.AUTO_TASK
                  : taskTypes.AUTO_EVENT;
              addTask({
                label: rule.name,
                parentRuleId: rule.id,
                parentCategoryId: category.id,
                category: category.id,
                dueDate: dayDate,
                type: taskType,
              });
            }
          }
        });
      });

      // Get tasks for this date
      const tasksForDay = getTasksDueOnDate(dayDate);

      days.push(
        <div
          key={i}
          className={`h-64 border border-stone-200 flex flex-col items-start p-2 ${
            isToday ? 'bg-blue-100' : 'bg-white'
          } hover:bg-stone-100`}
        >
          <div className="mb-1">
            <span className="text-sm text-stone-500">
              {dayDate.toLocaleDateString('en-US', { weekday: 'short' })}
            </span>
            <span className="font-medium text-stone-700 block">
              {dayDate.getDate()}
            </span>
          </div>
          {/* Render tasks */}
          <div className="flex flex-col flex-grow overflow-hidden">
            {tasksForDay.map((task, index) => (
              <div
                key={index}
                className="text-xs flex items-center truncate mb-0.5"
                title={`${task.label}`}
              >
                <span className="mr-1">
                  {
                    categories.find((cat) => cat.id === task.category)
                      ?.symbol || ''
                  }
                </span>
                <span className="truncate">{task.label}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <p className="font-sans font-bold text-stone-700 text-2xl py-5">Calendar</p>
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
              {currentMonth.toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
              })}
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
            <div
              key={day}
              className="py-2 text-center font-medium text-stone-600"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Body */}
        {viewMode === 'month' ? (
          <div className="grid grid-cols-7">{generateMonthView()}</div>
        ) : (
          <div className="grid grid-cols-7">{generateWeekView()}</div>
        )}
      </div>
    </div>
  );
}

export default Calendar;