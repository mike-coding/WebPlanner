import React, { useState, useRef, useEffect } from 'react';
import { Input, Dialog, DialogBackdrop, DialogPanel, Textarea} from '@headlessui/react';
import { useAppContext } from './AppContext';
import Checkbox from './checkbox';
import DatePicker from './DatePicker'
import { createPortal } from 'react-dom';
import TaskTypeSelector from './TaskTypeSelector';

export default function TaskEditor({ task, settingsOpen, setSettingsOpen }) {
    const { deleteTask, changeTaskAttribute, toggleTaskCompletion } = useAppContext();
    const [confirmingDeletion, setConfirmingDeletion] = useState(false);
    const [currentTaskCompleted, setCurrentTaskCompleted] = useState(task.isCompleted);
    const handleToggleCompletion = () => {
        setCurrentTaskCompleted(!currentTaskCompleted); // Toggle the completed state
    };
    //deleteTask(task); setSettingsOpen(false); 
    return (
      <Dialog
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        className="relative z-10"
      >
        <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-30 backdrop-blur-sm" />
        <div className="fixed inset-0 flex items-center justify-center">
          <DialogPanel className="transform overflow-auto rounded-sm bg-white text-left shadow-xl w-1/2 h-[62vh] transition-all flex flex-col">
            {/* Your content here */}
            <div className="flex items-center px-6 py-5 pt-7">
              <div className="px-5 pr-8 pt-1">
                <Checkbox
                  className="shadow-md mr-4"
                  checked={currentTaskCompleted}
                  onChange={handleToggleCompletion}
                />
              </div>
              <Input
                className="font-sans font-bold text-stone-700 py-1 text-2xl flex-grow outline-none"
                value={task.label}
                onChange={(e) => changeTaskAttribute(task, 'label', e.target.value)}
                autoComplete="off"
              />
            </div>
            <hr className="flex w-full border-t-2 border-stone-300 opacity-70 shadow-3xl" />
            <table className="flex flex-col flex-grow w-full py-5 shadow-inner">
              <TaskSetting task={task} attribute="description" />
              <TaskSetting task={task} attribute="dueDate" />
              <TaskSetting task={task} attribute="type" />
              <TaskSetting task={task} attribute="category" />
            </table>
            {confirmingDeletion ? (
              <div className="bg-gray-100 px-6 py-3 flex justify-end space-x-5 shadow-inner">
                <span className="pt-3/2 pr-4 font-sans font-semibold">Confirm Deletion:</span>
                <button
                  type="button"
                  className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500"
                  onClick={() => {
                    deleteTask(task);
                    setSettingsOpen(false);
                  }}
                >
                  Yes, Delete
                </button>
                <button
                  type="button"
                  className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  onClick={() => setConfirmingDeletion(false)}
                >
                  Nevermind
                </button>
              </div>
            ) : (
              <div className="bg-gray-100 px-6 py-3 flex justify-end space-x-5 shadow-inner">
                <button
                  type="button"
                  className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500"
                  onClick={() => {
                    setConfirmingDeletion(true);
                  }}
                >
                  Delete Task
                </button>
                <button
                  type="button"
                  className="rounded-md bg-white px-10 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  onClick={() => {
                    setSettingsOpen(false);
                    changeTaskAttribute(task, 'isCompleted', currentTaskCompleted);
                  }}
                >
                  OK
                </button>
              </div>
            )}
          </DialogPanel>
        </div>
      </Dialog>
    );
}

function TaskSetting({task, attribute}){
    function formatAttribute(attribute) {
        let formatted = attribute.charAt(0).toUpperCase() + attribute.slice(1);
        formatted = formatted.replace(/([A-Z])/g, (match, p1, offset) => {
            return offset === 0 ? match : ' ' + match;
        });
        return formatted;
    }
    const title = formatAttribute(attribute);
    function getAttributeWidget(attribute) {
        switch (attribute) {
            case "type":
                return <TaskTypeWidget task={task} />;
            case "dueDate":
                return <TaskDateWidget task={task} />;
            case "description":
                return <TaskDescriptionWidget task={task}/>;
            case 'category':
                return <TaskCategoryWidget task={task} />;
            default:
                return <span>I'm still working on this 👺</span>; 
        }
    }

    const attributeWidget = getAttributeWidget(attribute);
    return (
        <tr className="odd:bg-gray-200 even:bg-white py-4 px-3 font-sans font-semibold w-full flex-row flex justify-around">
            <td className="px-5 w-2/5 text-center">{title}:</td>
            <td className="w-3/5 flex-row flex justify-center">{attributeWidget}</td>
        </tr>
    )
}

function TaskTypeWidget({ task }) {
    const { changeTaskAttribute, taskTypes } = useAppContext();
    const hasCategory = task.category!=null;
  
    const handleTypeChange = (newTypeLabel) => {
      const newType = taskTypes[newTypeLabel];
      changeTaskAttribute(task, 'type', {
        label: newType.label,
        color: newType.color,
      });
    };
  
    return (
        <div className="w-48">
        <TaskTypeSelector
        selectedType={task.type.label}
        setSelectedType={handleTypeChange}
        disabled={hasCategory}
        />
        </div>
    );
}

function TaskDateWidget({ task }) {
    const { changeTaskAttribute } = useAppContext();
    const [hovered, setHovered] = useState(false);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const buttonRef = useRef(null);
    const [dropdownPosition, setDropdownPosition] = useState(null);

    useEffect(() => {
        if (isCalendarOpen && buttonRef.current) {
          const rect = buttonRef.current.getBoundingClientRect();
          const dropdownWidth = 380; // Width in pixels (w-80 is 20rem * 16px = 320px)
          let left =
            rect.left +
            rect.width / 2 -
            dropdownWidth / 2 +
            window.scrollX;
    
          // Ensure the dropdown doesn't go off-screen
          const minLeft = 0;
          const maxLeft = window.innerWidth - dropdownWidth;
          left = Math.max(minLeft, Math.min(left, maxLeft));
    
          setDropdownPosition({
            top: rect.bottom + window.scrollY,
            left: left,
          });
        } else {
          setDropdownPosition(null);
        }
      }, [isCalendarOpen]);

    function formatDate(date) {
      if (!date) return 'No Date';
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${month}-${day}-${year}`;
    }

    function CalendarIcon({color}) {
        return (
            <svg 
                fill={color}
                width="18px"
                height="18px"
                viewBox="0 0 488 488"
                stroke={color}>
                <g>
                    <g>
                    <path d="M177.854,269.311c0-6.115-4.96-11.069-11.08-11.069h-38.665c-6.113,0-11.074,4.954-11.074,11.069v38.66
                        c0,6.123,4.961,11.079,11.074,11.079h38.665c6.12,0,11.08-4.956,11.08-11.079V269.311L177.854,269.311z"/>
                    <path d="M274.483,269.311c0-6.115-4.961-11.069-11.069-11.069h-38.67c-6.113,0-11.074,4.954-11.074,11.069v38.66
                        c0,6.123,4.961,11.079,11.074,11.079h38.67c6.108,0,11.069-4.956,11.069-11.079V269.311z"/>
                    <path d="M371.117,269.311c0-6.115-4.961-11.069-11.074-11.069h-38.665c-6.12,0-11.08,4.954-11.08,11.069v38.66
                        c0,6.123,4.96,11.079,11.08,11.079h38.665c6.113,0,11.074-4.956,11.074-11.079V269.311z"/>
                    <path d="M177.854,365.95c0-6.125-4.96-11.075-11.08-11.075h-38.665c-6.113,0-11.074,4.95-11.074,11.075v38.653
                        c0,6.119,4.961,11.074,11.074,11.074h38.665c6.12,0,11.08-4.956,11.08-11.074V365.95L177.854,365.95z"/>
                    <path d="M274.483,365.95c0-6.125-4.961-11.075-11.069-11.075h-38.67c-6.113,0-11.074,4.95-11.074,11.075v38.653
                        c0,6.119,4.961,11.074,11.074,11.074h38.67c6.108,0,11.069-4.956,11.069-11.074V365.95z"/>
                    <path d="M371.117,365.95c0-6.125-4.961-11.075-11.069-11.075h-38.67c-6.12,0-11.08,4.95-11.08,11.075v38.653
                        c0,6.119,4.96,11.074,11.08,11.074h38.67c6.108,0,11.069-4.956,11.069-11.074V365.95L371.117,365.95z"/>
                    <path d="M440.254,54.354v59.05c0,26.69-21.652,48.198-48.338,48.198h-30.493c-26.688,0-48.627-21.508-48.627-48.198V54.142
                        h-137.44v59.262c0,26.69-21.938,48.198-48.622,48.198H96.235c-26.685,0-48.336-21.508-48.336-48.198v-59.05
                        C24.576,55.057,5.411,74.356,5.411,98.077v346.061c0,24.167,19.588,44.015,43.755,44.015h389.82
                        c24.131,0,43.755-19.889,43.755-44.015V98.077C482.741,74.356,463.577,55.057,440.254,54.354z M426.091,422.588
                        c0,10.444-8.468,18.917-18.916,18.917H80.144c-10.448,0-18.916-8.473-18.916-18.917V243.835c0-10.448,8.467-18.921,18.916-18.921
                        h327.03c10.448,0,18.916,8.473,18.916,18.921L426.091,422.588L426.091,422.588z"/>
                    <path d="M96.128,129.945h30.162c9.155,0,16.578-7.412,16.578-16.567V16.573C142.868,7.417,135.445,0,126.29,0H96.128
                        C86.972,0,79.55,7.417,79.55,16.573v96.805C79.55,122.533,86.972,129.945,96.128,129.945z"/>
                    <path d="M361.035,129.945h30.162c9.149,0,16.572-7.412,16.572-16.567V16.573C407.77,7.417,400.347,0,391.197,0h-30.162
                        c-9.154,0-16.577,7.417-16.577,16.573v96.805C344.458,122.533,351.881,129.945,361.035,129.945z"/>
                    </g>
                </g>
            </svg>
        );
    }

    const handleDateChange = (newDate) => {
        changeTaskAttribute(task, 'dueDate', newDate);
        setIsCalendarOpen(false);
        };

        return (
            <>
              <div className="inline-block text-left">
                <button
                  ref={buttonRef}
                  className="flex justify-center items-center rounded-md py-2 text-sm font-semibold bg-white w-48"
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                  onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                >
                  <div className="flex items-center justify-center">
                    <span className={`pr-2 ${hovered ? 'text-black' : 'text-stone-500'}`}>
                      {formatDate(task.dueDate ? new Date(task.dueDate) : null)}
                    </span>
                    <CalendarIcon color={hovered ? '#000000' : '#737373'} />
                  </div>
                </button>
              </div>
        
              {isCalendarOpen && dropdownPosition &&
                createPortal(
                  <div
                    className="absolute mt-2 w-80 bg-white rounded-md shadow-lg z-50"
                    style={{
                      position: 'absolute',
                      top: dropdownPosition.top,
                      left: dropdownPosition.left,
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <DatePicker
                      initialDate={task.dueDate ? new Date(task.dueDate) : null}
                      onDateChange={handleDateChange}
                    />
                  </div>,
                  document.body
                )}
            </>
          );
}

function TaskDescriptionWidget({ task }){
    const {changeTaskAttribute }= useAppContext();
    return (
        <Textarea
        className="w-[28rem] h-[9rem] px-2 py-1 rounded-md resize-none"
        onChange={(e) => changeTaskAttribute(task, "description", e.target.value)}
        value={task.description}
      />
    );
}

function TaskCategoryWidget({ task }) {
    const { changeTaskAttribute, categories, taskTypes } = useAppContext();
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef(null);
    const [dropdownPosition, setDropdownPosition] = useState(null);
  
    // Find the current category
    const category = categories.find((cat) => cat.name === task.category);
    const currentCategory = category ? `${category.symbol} ${category.name}` : 'None';
  
    useEffect(() => {
      if (isOpen && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const dropdownWidth = 192; // Width in pixels
        const itemHeight = 40; // Approximate height per item
        const totalItems = categories.length + 1; // Categories plus 'No Category' option
        const dropdownHeight = totalItems * itemHeight;
  
        let left =
          rect.left + rect.width / 2 - dropdownWidth / 2 + window.scrollX;
        let top = rect.bottom + window.scrollY;
  
        // Ensure the dropdown doesn't go off-screen horizontally
        const minLeft = 0;
        const maxLeft = window.innerWidth - dropdownWidth;
        left = Math.max(minLeft, Math.min(left, maxLeft));
  
        // Ensure the dropdown doesn't go off-screen vertically
        const maxTop = window.innerHeight - dropdownHeight;
        if (top > maxTop) {
          top = rect.top - dropdownHeight + window.scrollY;
        }
  
        setDropdownPosition({
          top: top,
          left: left,
        });
      } else {
        setDropdownPosition(null);
      }
    }, [isOpen, categories.length]);
  
    return (
      <>
        <div className="inline-block text-center">
          <button
            ref={buttonRef}
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex justify-center w-48 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
            {currentCategory}
            <svg
              className="-mr-1 ml-2 h-5 w-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06-.02L10 10.694l3.71-3.507a.75.75 0 111.04 1.084l-4.25 4a.75.75 0 01-1.04 0l-4.25-4a.75.75 0 01-.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
  
        {isOpen &&
          dropdownPosition &&
          createPortal(
            <div
              className="absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
              style={{
                position: 'absolute',
                top: dropdownPosition.top,
                left: dropdownPosition.left,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="py-1">
                {/* 'No Category' option */}
                <button
                  onClick={() => {
                    changeTaskAttribute(task, 'category', null);
                    setIsOpen(false);
                  }}
                  className="text-gray-700 block px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
                  role="menuitem"
                >
                  None
                </button>
  
                {/* Divider */}
                <div className="border-t border-gray-200 my-1"></div>
  
                {/* List of categories */}
                {categories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      changeTaskAttribute(task, 'category', category.name);
                      changeTaskAttribute(task, 'type', {
                        label: category.type,
                        color: taskTypes[category.type].color,
                      });
                      setIsOpen(false);
                    }}
                    className="text-gray-700 block px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
                    role="menuitem"
                  >
                    {category.symbol} {category.name}
                  </button>
                ))}
              </div>
            </div>,
            document.body
          )}
      </>
    );
}