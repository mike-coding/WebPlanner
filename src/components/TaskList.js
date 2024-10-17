import React, { useState, useEffect } from 'react';
import { Menu, MenuButton } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import TaskItem from './TaskItem';
import TodoEntry from './TaskEntry';
import { useAppContext } from './AppContext';

export default function TaskList() {
  const { tasks, categories } = useAppContext();
  const [timeFilter, setTimeFilter] = useState('today'); // Default filter is 'Today'
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [includeNoCategory, setIncludeNoCategory] = useState(true);
  const [includeNoDueDate, setIncludeNoDueDate] = useState(true);
  const [includeOverdue, setIncludeOverdue] = useState(true); // New state variable

  // Initialize category filters to include all categories
  useEffect(() => {
    setCategoryFilters(categories.map((c) => c.id));
  }, [categories]);

  // Toggle category selection
  const toggleCategoryFilter = (categoryId) => {
    if (categoryFilters.includes(categoryId)) {
      setCategoryFilters(categoryFilters.filter((id) => id !== categoryId));
    } else {
      setCategoryFilters([...categoryFilters, categoryId]);
    }
  };

  // Get the label for the time filter button
  const getTimeFilterLabel = () => {
    const now = new Date();
    switch (timeFilter) {
      case 'today':
        return 'Today';
      case 'thisWeek':
        return 'This Week';
      case 'thisMonth':
        return now.toLocaleDateString('default', { month: 'long' }); // e.g., 'October'
      case 'upcoming':
        return 'Upcoming';
      default:
        return 'Filter';
    }
  };

  // Filter tasks based on time and category
  const getFilteredTasks = () => {
    const now = new Date();
    let startDate = new Date();
    let endDate = new Date();

    switch (timeFilter) {
      case 'today':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        break;
      case 'thisWeek':
        startDate = new Date(now);
        startDate.setDate(now.getDate() - now.getDay()); // Start of the week (Sunday)
        endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 7);
        break;
      case 'thisMonth':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        break;
      case 'upcoming':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 14);
        break;
      default:
        break;
    }

    // Filter tasks
    return Object.values(tasks).filter((task) => {
      const taskDate = task.dueDate ? new Date(task.dueDate) : null;
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const isOverdue = taskDate && taskDate < todayStart;
      const isInSelectedTimeRange = taskDate && taskDate >= startDate && taskDate < endDate;
      const isUndated = !taskDate;

      const inTimeRange =
        (includeOverdue && isOverdue) ||
        isInSelectedTimeRange ||
        (includeNoDueDate && isUndated);

      const inCategory =
        (task.category && categoryFilters.includes(task.category)) ||
        (includeNoCategory && !task.category);

      return inTimeRange && inCategory;
    });
  };

  const filteredTasks = getFilteredTasks();

  return (
    <div className="flex flex-col w-full items-center justify-center">
      {/* Filter Button and Dropdown */}
      <Menu as="div" className="relative inline-block text-left py-5">
        {({ open }) => (
          <>
            <div>
              <MenuButton className="inline-flex justify-center items-center w-full rounded-md border border-gray-300 shadow-sm px-6 py-3 bg-white text-base font-medium text-gray-700 hover:bg-gray-50">
                {getTimeFilterLabel()}
                <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
              </MenuButton>
            </div>
            {open && (
              <Menu.Items
                static
                className="origin-top absolute left-1/2 transform -translate-x-1/2 mt-2 w-96 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
              >
                <div className="py-1 flex">
                  {/* Time Filters */}
                  <div className="w-1/2 border-r border-gray-200">
                    {['today', 'thisWeek', 'thisMonth', 'upcoming'].map((filterKey) => (
                      <Menu.Item key={filterKey}>
                        {({ active }) => (
                          <button
                            onClick={() => {
                              setTimeFilter(filterKey);
                            }}
                            className={`block px-4 py-2 text-sm w-full text-left ${
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                            }`}
                          >
                            {filterKey === 'today'
                              ? 'Today'
                              : filterKey === 'thisWeek'
                              ? 'This Week'
                              : filterKey === 'thisMonth'
                              ? 'This Month'
                              : 'Upcoming'}
                          </button>
                        )}
                      </Menu.Item>
                    ))}
                    {/* Include tasks with no due date */}
                    <div className="flex items-center px-4 py-2">
                      <input
                        type="checkbox"
                        checked={includeNoDueDate}
                        onChange={() => setIncludeNoDueDate(!includeNoDueDate)}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">Show Undated</span>
                    </div>

                    {/* Include tasks with no category */}
                    <div className="flex items-center px-4 py-2">
                      <input
                        type="checkbox"
                        checked={includeNoCategory}
                        onChange={() => setIncludeNoCategory(!includeNoCategory)}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">Show Uncategorized</span>
                    </div>

                    {/* Include overdue tasks */}
                    <div className="flex items-center px-4 py-2">
                      <input
                        type="checkbox"
                        checked={includeOverdue}
                        onChange={() => setIncludeOverdue(!includeOverdue)}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">Show Overdue</span>
                    </div>
                  </div>

                  {/* Category Filters */}
                  <div className="w-1/2 pl-4">
                    {/* Categories */}
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center px-4 py-2">
                        <input
                          type="checkbox"
                          checked={categoryFilters.includes(category.id)}
                          onChange={() => toggleCategoryFilter(category.id)}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">
                          {category.symbol} {category.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Menu.Items>
            )}
          </>
        )}
      </Menu>

      {/* Task List */}
      <dl className="flex flex-col items-center justify-center w-full py-5">
        <TodoEntry />
        {filteredTasks
          .filter((task) => !task.isCompleted)
          .map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
      </dl> 

      <hr className="w-1/4 border-t-4 border-white my-4 opacity-60 shadow-3xl" />

      <dl className="flex flex-col items-center justify-center w-full py-5">
        {filteredTasks
          .filter((task) => task.isCompleted)
          .map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
      </dl>
    </div>
  );
}