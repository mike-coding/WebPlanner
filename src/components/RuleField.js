import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useAppContext } from './AppContext';
import DatePicker from './DatePicker';
import { useCategories } from './UseCategories';

export function RuleField({ index, rule, categoryId, updateRuleInCategory, deleteRuleFromCategory }) {
  const [hovered, setHovered] = useState(false);
  const [confirmingDeletion, setConfirmingDeletion] = useState(false);

  const handleDelete = () => {
    deleteRuleFromCategory(categoryId, rule.id);
  };

  return (
    <div
      key={index}
      className="flex flex-row w-full odd:bg-gray-200 even:bg-white rounded-md font-sans font-semibold "
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setConfirmingDeletion(false);
      }}
    >
      {confirmingDeletion ? (
        <ConfirmDeleteRuleBody
          rule={rule}
          setConfirmingDeletion={setConfirmingDeletion}
          categoryId={categoryId}
        />
      ) : (
        <StandardRuleBody
          rule={rule}
          hovered={hovered}
          setConfirmingDeletion={setConfirmingDeletion}
          categoryId={categoryId}
        />
      )}
    </div>
  );
}

function formatDate(date) {
  if (!date) return 'Forever';
  return new Date(date).toLocaleDateString(); // You can customize the format as needed
}

export function StandardRuleBody({
    rule,
    hovered,
    setConfirmingDeletion,
    categoryId
  }) {
    return (
      <div className="grid grid-cols-7 w-full rounded-md py-4 px-1 font-sans font-semibold ">
        {/* Name - occupies 2 columns */}
        <div className="col-span-2 flex items-center justify-start pl-3 border-r border-gray-400">
          <span>{rule.name}</span>
        </div>
  
        {/* Start Date - occupies 2 columns */}
        <div className="col-span-2 flex items-center justify-left border-r border-gray-400">
          <span className='pl-2 pr-2'>From: </span>
          <span className="bg-gray-400 rounded-md p-1/2 text-white">{formatDate(rule.start)}</span>
        </div>
  
        {/* End Date - occupies 2 columns */}
        <div className="col-span-2 flex items-center justify-center border-r border-gray-400">
          <span>Until: </span>
          <span>{formatDate(rule.end)}</span>
        </div>
  
        {/* Repeat Rate - occupies 1 column */}
        <div className="col-span-1 flex items-center justify-around ">
          {/* Edit Button */}
          <button className="bg-transparent rounded-md ">
                {/* SVG for edit icon */}
                <svg
                className="stroke-stone-400 size-5 border-0"
                viewBox="0 -100 600 600"
                fill="#a8a29e"
                onMouseEnter={(e) => e.currentTarget.setAttribute('fill', '#57534e')}
                onMouseLeave={(e) => e.currentTarget.setAttribute('fill', '#a8a29e')}>
                {/* SVG path for edit icon */}
                <path
                    d="M478.409,116.617c-0.368-4.271-3.181-7.94-7.2-9.403c-4.029-1.472-8.539-0.47-11.57,2.556l-62.015,62.011
                    l-68.749-21.768l-21.768-68.748l62.016-62.016c3.035-3.032,4.025-7.543,2.563-11.565c-1.477-4.03-5.137-6.837-9.417-7.207
                    c-37.663-3.245-74.566,10.202-101.247,36.887c-36.542,36.545-46.219,89.911-29.083,135.399
                    c-1.873,1.578-3.721,3.25-5.544,5.053L19.386,373.152c-0.073,0.071-0.145,0.149-0.224,0.219
                    c-24.345,24.346-24.345,63.959,0,88.309c24.349,24.344,63.672,24.048,88.013-0.298c0.105-0.098,0.201-0.196,0.297-0.305
                    L301.104,252.456c1.765-1.773,3.404-3.628,4.949-5.532c45.5,17.167,98.9,7.513,135.474-29.056
                    C467.202,191.181,480.658,154.275,478.409,116.617z M75.98,435.38c-8.971,8.969-23.5,8.963-32.47,0
                    c-8.967-8.961-8.967-23.502,0-32.466c8.97-8.963,23.499-8.963,32.47,0C84.947,411.878,84.947,426.419,75.98,435.38z"
                    strokeWidth={1}
                    strokeLinecap="round"
                    strokeLinejoin="square" />
                </svg>
          </button>
  
          {/* Delete Button */}
          <button
            className="bg-transparent rounded-md "
            onClick={() => setConfirmingDeletion(true)}
          >
            {/* SVG for delete icon */}
            <svg
              className="stroke-stone-400 size-5 border-0"
              viewBox="-2 -4 50 50"
              fill="#a8a29e"
              onMouseEnter={(e) => e.currentTarget.setAttribute('fill', '#57534e')}
              onMouseLeave={(e) => e.currentTarget.setAttribute('fill', '#a8a29e')}>
              {/* SVG path for trash icon */}
              <path
                  d="M36.335,5.668h-8.167V1.5c0-0.828-0.672-1.5-1.5-1.5h-12c-0.828,0-1.5,0.672-1.5,1.5v4.168H5.001
                  c-1.104,0-2,0.896-2,2s0.896,2,2,2h2.001v29.168c0,1.381,1.119,2.5,2.5,2.5h22.332c1.381,0,2.5-1.119,2.5-2.5V9.668h2.001
                  c1.104,0,2-0.896,2-2S37.438,5.668,36.335,5.668z M14.168,35.67c0,0.828-0.672,1.5-1.5,1.5s-1.5-0.672-1.5-1.5v-21
                  c0-0.828,0.672-1.5,1.5-1.5s1.5,0.672,1.5,1.5V35.67z M22.168,35.67c0,0.828-0.672,1.5-1.5,1.5s-1.5-0.672-1.5-1.5v-21
                  c0-0.828,0.672-1.5,1.5-1.5s1.5,0.672,1.5,1.5V35.67z M30.168,35.67c0,0.828-0.672,1.5-1.5,1.5s-1.5-0.672-1.5-1.5v-21
                  c0-0.828,0.672-1.5,1.5-1.5s1.5,0.672,1.5,1.5V35.67z"
                  strokeWidth={1}
                  strokeLinecap="round"
                  strokeLinejoin="square"
              />
              </svg>
          </button>
          
        </div>
      </div>
    );
}

export function ConfirmDeleteRuleBody({ rule, categoryId, setConfirmingDeletion }) {
    const { deleteRuleFromCategory } = useAppContext();
  
    return (
      <div className="grid grid-cols-7 w-full py-3">
        <span className="col-span-3 flex items-center justify-center">
          Delete Rule: {rule.name}?
        </span>
        <div className="col-span-4 flex items-center justify-end pr-3 space-x-2">
          <button
            className="bg-red-600 text-white rounded px-4 py-1"
            onClick={() => {
              deleteRuleFromCategory( categoryId, rule.id);
              setConfirmingDeletion(false);
            }}
          >
            Delete
          </button>
          <button
            className="bg-gray-300 rounded px-4 py-1"
            onClick={() => setConfirmingDeletion(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    );
}

export function RuleEntry({ index, categoryId, addRuleToCategory }) {
    const [ruleName, setRuleName] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [repeatRate, setRepeatRate] = useState('');
  
    const { categories } = useAppContext();
    const category = categories.find((cat) => cat.id === categoryId);

    const handleSave = () => {
      if (ruleName.trim()) {
        const nextID = category.rules.reduce((maxId, rule) => Math.max(maxId, rule.id), 0) + 1;
        const newRule = {
          id: nextID,
          name: ruleName.trim(),
          start: startDate,
          end: endDate,
          repeat: repeatRate,
          childTasks: []
        };
        addRuleToCategory(categoryId, newRule);
        resetFields();
      }
    };
  
    const resetFields = () => {
      setRuleName('');
      setStartDate(null);
      setEndDate(null);
      setRepeatRate('');
    };
  
    const bgColor = index % 2 === 0 ? 'bg-gray-200' : 'bg-white';
  
    return (
      <div
        className={`grid grid-cols-7 py-3 px-1 font-sans rounded-sm font-semibold w-full ${bgColor}`}
      >
        {/* Name Input - occupies 2 columns */}
        <div className={`col-span-2 flex items-center justify-center border-r border-gray-400 ${bgColor}`}>
          <input
            type="text"
            value={ruleName}
            onChange={(e) => setRuleName(e.target.value)}
            className={`w-full px-2 py-1 ${bgColor} focus:outline-none`}
            placeholder="Rule Name"
          />
        </div>
  
        {/* Start Date Button - occupies 2 columns */}
        <div className="col-span-2 flex items-center justify-center border-r border-gray-400">
          <DatePickerButton
            date={startDate}
            setDate={setStartDate}
            label="Start Date"
          />
        </div>
  
        {/* End Date Button - occupies 2 columns */}
        <div className="col-span-2 flex items-center justify-center border-r border-gray-400">
          <DatePickerButton
            date={endDate}
            setDate={setEndDate}
            label="End Date"
          />
        </div>
  
        {/* Add Rule Button - occupies 1 column */}
        <div className="col-span-1 flex items-center justify-center">
          <button onClick={handleSave} className="focus:outline-none">
            {/* Plus Icon */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#a8a29e"
              strokeWidth="3"
              strokeLinecap="square"
              strokeLinejoin="round"
              className="w-6 h-6"
              onMouseEnter={(e) =>
                e.currentTarget.setAttribute('stroke', '#57534e')
              }
              onMouseLeave={(e) =>
                e.currentTarget.setAttribute('stroke', '#a8a29e')
              }
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </div>
      </div>
    );
}

function DatePickerButton({ date, setDate, label }) {
    const { changeTaskAttribute } = useAppContext(); // Remove if not needed
    const [hovered, setHovered] = useState(false);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const buttonRef = useRef(null);
    const [dropdownPosition, setDropdownPosition] = useState(null);
  
    useEffect(() => {
      if (isCalendarOpen && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const dropdownWidth = 380; // Adjust as needed
        let left =
          rect.left + rect.width / 2 - dropdownWidth / 2 + window.scrollX;
  
        // Ensure the dropdown doesn't go off-screen
        left = Math.max(0, Math.min(left, window.innerWidth - dropdownWidth));
  
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
      setDate(newDate);
      setIsCalendarOpen(false);
    };
  
    return (
      <>
        <div className="inline-block text-left">
          <button
            ref={buttonRef}
            className="flex justify-center items-center rounded-md py-2 text-sm font-semibold bg-white w-full"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
          >
            <div className="flex items-center justify-center">
              <span className={`pr-2 ${hovered ? 'text-black' : 'text-stone-500'}`}>
                {formatDate(date ? new Date(date) : null)}
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
                initialDate={date}
                onDateChange={handleDateChange}
              />
            </div>,
            document.body
          )}
      </>
    );
}