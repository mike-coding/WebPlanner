import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { useAppContext } from './AppContext';
import TaskTypeSelector from './TaskTypeSelector';
import { createPortal } from 'react-dom';
import { emojiList } from '../utils/emojiList'; // Import the emoji list

export function CategoryField({ index, category, setEditingCategoryId }) {
    const { taskTypes } = useAppContext();
    const [hovered, setHovered] = useState(false);
    const [confirmingDeletion, setConfirmingDeletion] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
  
    return (
      <div
        key={index}
        className="flex flex-row w-full odd:bg-gray-200 even:bg-white rounded-sm py-4 px-1 font-sans font-semibold w-full"
        onMouseEnter={() => {
          if (!settingsOpen) setHovered(true);
        }}
        onMouseLeave={() => {
          setHovered(false);
          setConfirmingDeletion(false);
        }}
        onClick={() => {
          if (!confirmingDeletion) {
            setSettingsOpen(true);
            setHovered(false);
          } else {
            setConfirmingDeletion(false);
          }
        }}
      >
        {confirmingDeletion ? (
          <ConfirmDeleteCategoryBody
            category={category}
            setConfirmingDeletion={setConfirmingDeletion}
          />
        ) : (
          <StandardCategoryBody
            category={category}
            hovered={hovered}
            setEditingCategoryId={setEditingCategoryId}
            setConfirmingDeletion={setConfirmingDeletion}
            taskTypes={taskTypes}
          />
        )}
      </div>
    );
}
  
export function ConfirmDeleteCategoryBody({ category, setConfirmingDeletion }) {
const { deleteCategory } = useAppContext();
return (
    <div className="grid grid-cols-7 w-full">
    <span className="col-span-1 flex flex-row justify-center items-center">Delete:</span>
    <span className="col-span-3 flex flex-row justify-center items-center">{category.symbol} {category.name}</span>
    <div className="col-span-3 flex flex-row justify-end pr-3">
        <button
        className="bg-red-700 font-sans font-medium text-center rounded px-6 py-1 text-sm text-white"
        onClick={(e) => {
            e.stopPropagation(); // Prevent triggering the onClick of the parent div
            deleteCategory(category.id);
            setConfirmingDeletion(false);
        }}
        >
        Delete Category
        </button>
    </div>
    </div>
);
}

export function StandardCategoryBody({
category,
hovered,
setEditingCategoryId,
setConfirmingDeletion,
taskTypes,
}) {
return (
    <>
    <div className="grid grid-cols-7 w-full">
        {/* Symbol - occupies 1 column */}
        <div className="col-span-1 flex flex-row justify-center items-center border-r border-gray-400">
            <span className="px-2 pr-5 text-lg">{category.symbol}</span>
            </div>

            {/* Name - occupies 3 columns */}
            <div className="col-span-3 flex flex-row justify-center items-center border-r border-gray-400">
            <span>{category.name}</span>
        </div>

        {/* Type */}
        <div className="col-span-1 flex flex-row justify-center items-center">
            <span
                style={{ backgroundColor: taskTypes[category.type].color }}
                className="rounded-md px-2 py-1 text-sm font-semibold text-white"
            >
                {category.type}
            </span>
        </div>

        {/* RuleCount */}
        <div className="col-span-1 flex flex-row justify-center pr-6 items-center border-r border-gray-400">
            <span
                style={{ backgroundColor: "#3a7ae0" }}
                className="flex flex-row justify-center rounded-md px-2 py-1 text-sm font-semibold text-white"
            >
                <span className="pr-2">RULES</span>
                <div className="">
                    <span
                        style={{ backgroundColor: "white", color: "#336fcc" }}
                        className="rounded-md px-2 text-sm font-bold "
                    >
                        {category?.rules?.length || 0}
                    </span>
                </div>
            </span>
        </div>

        {/* Edit and Delete Buttons - occupies 1 column */}
        <div className="col-span-1 flex items-center justify-around">
        {/* Edit Button */}
        <button
            className={`bg-transparent rounded-md py-1 px-3 `}
            onClick={() => setEditingCategoryId(category.id)}
        >
            {/* SVG for the edit icon */}
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
            className={`bg-transparent rounded-md py-1 px-3`}
            onClick={(event) => {
            event.stopPropagation();
            setConfirmingDeletion(true);
            }}
        >
            {/* SVG for the trash icon */}
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
    </>
);
}

export function CategoryEntry({ index }) {
const { addCategory, taskTypes} = useAppContext();
const [categoryName, setCategoryName] = useState('');
const [categorySymbol, setCategorySymbol] = useState('');
const [selectedType, setSelectedType] = useState('TASK');
const [showTaskTypeSelector, setShowTaskTypeSelector] = useState(false);

const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
const emojiButtonRef = useRef(null);
const emojiPickerRef = useRef(null);
const taskTypeButtonRef = useRef(null);
const taskTypeSelectorRef = useRef(null);

const [emojiPickerPosition, setEmojiPickerPosition] = useState({ top: 0, left: 0 });
const [taskTypeSelectorPosition, setTaskTypeSelectorPosition] = useState({ top: 0, left: 0 });

// Close the emoji picker when clicking outside
useEffect(() => {
    function handleClickOutside(event) {
    if (
        emojiPickerOpen &&
        emojiButtonRef.current &&
        !emojiButtonRef.current.contains(event.target) &&
        (!emojiPickerRef.current || !emojiPickerRef.current.contains(event.target))
    ) {
        setEmojiPickerOpen(false);
    }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
    document.removeEventListener('mousedown', handleClickOutside);
    };
}, [emojiPickerOpen]);

// Close the task type selector when clicking outside
useEffect(() => {
    function handleClickOutside(event) {
    if (
        showTaskTypeSelector &&
        taskTypeSelectorRef.current &&
        !taskTypeSelectorRef.current.contains(event.target) &&
        !event.target.closest('.task-type-button')
    ) {
        setShowTaskTypeSelector(false);
    }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
    document.removeEventListener('mousedown', handleClickOutside);
    };
}, [showTaskTypeSelector]);

const handleSave = () => {
    if (categoryName.trim() && categorySymbol) {
    addCategory(categorySymbol, categoryName.trim(), selectedType);
    handleResetWorkingCategory();
    }
};

const handleResetWorkingCategory = () => {
    setCategoryName('');
    setCategorySymbol('');
    setSelectedType('TASK');
};

// Determine background color based on index (even/odd)
const bgColor = index % 2 === 0 ? 'bg-gray-200' : 'bg-white';

return (
    <div
    className={`grid grid-cols-7 rounded-md py-3 px-1 font-sans font-semibold w-full relative ${bgColor}`}
    >
    {/* Emoji Picker Button - occupies 1 column */}
    <div className="col-span-1 flex items-center justify-center pr-3 border-r border-gray-400">
        <button
        ref={emojiButtonRef}
        onClick={() => {
            if (!emojiPickerOpen) {
            const rect = emojiButtonRef.current.getBoundingClientRect();
            setEmojiPickerPosition({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
            });
            }
            setEmojiPickerOpen(!emojiPickerOpen);
        }}
        className="px-1 py-1/2 rounded-md text-xl border border-gray-300 bg-white focus:outline-none"
        >
        {categorySymbol || '😀'}
        </button>
    </div>

    {/* Category Name Input - occupies 3 columns */}
    <div className="col-span-3 flex flex-row justify-center items-center border-r border-gray-400">
        <input
        type="text"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        className={`w-full pl-2 text-center focus:outline-none focus:border-blue-500 ${bgColor}`}
        placeholder="New Category"
        />
    </div>

    {/* Task Type Selector Button - occupies 2 columns */}
    <div className="col-span-2 flex items-center justify-center border-r border-gray-400">
        <button
        ref={taskTypeButtonRef}
        onClick={() => {
            if (!showTaskTypeSelector) {
            const rect = taskTypeButtonRef.current.getBoundingClientRect();
            const dropdownWidth = 150; // Adjust if needed
            setTaskTypeSelectorPosition({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX + rect.width / 2 - dropdownWidth / 2,
            });
            }
            setShowTaskTypeSelector(!showTaskTypeSelector);
        }}
        style={{ backgroundColor: taskTypes[selectedType].color }}
        className="task-type-button rounded-md px-2 py-1 text-sm font-semibold text-white focus:outline-none"
        >
        {selectedType}
        </button>
    </div>

    {/* Add Category Button - occupies 1 column */}
    <div className="col-span-1 pl-2 flex items-center justify-center pr-2">
        <button
        onClick={() =>{if (categoryName.trim() && categorySymbol) handleSave();}}
        className="focus:outline-none"
        >
        {/* SVG for plus icon */}
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke= '#a8a29e'
            strokeWidth="3"
            strokeLinecap="square"
            strokeLinejoin="round"
            className="w-6 h-6"
            onMouseEnter={(e) => e.currentTarget.setAttribute('stroke', '#57534e')}
            onMouseLeave={(e) => e.currentTarget.setAttribute('stroke', '#a8a29e')}
        >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        </button>
    </div>

    {/* Emoji Picker */}
    {emojiPickerOpen &&
        createPortal(
        <div
            ref={emojiPickerRef}
            className="absolute z-50 bg-white border border-gray-300 rounded-md shadow-md p-2"
            style={{
            top: emojiPickerPosition.top,
            left: emojiPickerPosition.left,
            position: 'absolute',
            maxHeight: '300px',
            overflowY: 'scroll',
            overflowX: 'clip',
            width: '336px',
            }}
        >
            <div className="grid grid-cols-7 ">
            {emojiList.map((emoji, index) => (
                <button
                key={index}
                onClick={() => {
                    setCategorySymbol(emoji);
                    setEmojiPickerOpen(false);
                }}
                className="text-xl hover:bg-gray-200 rounded-md p-1"
                >
                {emoji}
                </button>
            ))}
            </div>
        </div>,
        document.body
        )}

    {/* Task Type Selector Dropdown */}
    {showTaskTypeSelector &&
        createPortal(
        <div
            ref={taskTypeSelectorRef}
            className="absolute z-50 border border-gray-300 rounded-md shadow-lg"
            style={{
            top: taskTypeSelectorPosition.top,
            left: taskTypeSelectorPosition.left + 44,
            position: 'absolute',
            }}
        >
            {/* Render task type options directly, excluding 'SUBTASK' */}
            {Object.keys(taskTypes)
            .filter((type) => !type.includes('SUBTASK'))
            .map((type) => (
                <button
                key={type}
                onClick={() => {
                    setSelectedType(type);
                    setShowTaskTypeSelector(false);
                }}
                style={{ backgroundColor: taskTypes[type].color }}
                className="block w-full text-center px-2 py-1 text-sm font-semibold rounded-sm text-white hover:font-bold focus:outline-none"
                >
                {type}
                </button>
            ))}
        </div>,
        document.body
        )}
    </div>
);
}