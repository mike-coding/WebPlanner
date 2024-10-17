import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { useAppContext } from './AppContext';
import { createPortal } from 'react-dom';
import { emojiList } from '../utils/emojiList'; // Import the emoji list
import { CategoryField, CategoryEntry } from './CategoryField';
import { RuleField, RuleEntry} from './RuleField';

function CategoryEditorDialog({ isOpen, onClose, editingCategoryId }) {
  const { categories } = useAppContext();
  const [localEditingCategoryId, setLocalEditingCategoryId] = useState(null);

  useEffect(() => {
    if (editingCategoryId) {
      setLocalEditingCategoryId(editingCategoryId);
    } else {
      setLocalEditingCategoryId(null);
    }
  }, [editingCategoryId]);

  const handleCancel = () => {
    onClose();
    setLocalEditingCategoryId(null);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Dialog
      open={isOpen}
      onClose={handleCancel}
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={handleCancel}
    >
      <DialogBackdrop className="fixed inset-0 bg-black opacity-50" />
      <DialogPanel className="bg-white rounded-md shadow-md w-3/5 max-h-[80vh] overflow-auto relative">
        {localEditingCategoryId ? (
          <CategoryEditor
            categoryId={localEditingCategoryId}
            onClose={() => setLocalEditingCategoryId(null)}
          />
        ) : (
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4 flex flex-row justify-between items-center">
              Categories
              <button onClick={onClose} className="ml-10 p-1 rounded-sm bg-gray-200">
                <svg
                  className="w-6 h-6 text-gray-500 hover:text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <line x1="18" y1="6" x2="6" y2="18" strokeWidth="2" strokeLinecap="round" />
                  <line x1="6" y1="6" x2="18" y2="18" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </h2>
            <hr className="my-4" />

            {/* Existing Categories and Category Entry */}
            <div className="flex flex-col w-full">
              {/* Category Entry with index for styling */}
              <CategoryEntry index={0} />

              {[...categories].reverse().map((category, index) => {
                const originalIndex = categories.length -1 - index;
                return (
                  <CategoryField
                    setEditingCategoryId={setLocalEditingCategoryId}
                    category={category}
                    index={originalIndex}
                    key={category.id}
                  />
                );
              })}
            </div>
          </div>
        )}
      </DialogPanel>
    </Dialog>
  );
}

function CategoryEditor({ categoryId, onClose }) {
  const {
    categories,
    updateCategory,
    deleteCategory,
    taskTypes,
    addRuleToCategory,
    updateRuleInCategory,
    deleteRuleFromCategory,
  } = useAppContext();

  const category = categories.find((cat) => cat.id === categoryId);
  const [confirmingDeletion, setConfirmingDeletion] = useState(false);

  const [categoryName, setCategoryName] = useState(category.name);
  const [categorySymbol, setCategorySymbol] = useState(category.symbol);
  const [selectedType, setSelectedType] = useState(category.type);

  // Emoji picker state
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const emojiButtonRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const [emojiPickerPosition, setEmojiPickerPosition] = useState({ top: 0, left: 0 });

  // Task type selector state
  const [showTaskTypeSelector, setShowTaskTypeSelector] = useState(false);
  const taskTypeButtonRef = useRef(null);
  const taskTypeSelectorRef = useRef(null);
  const [taskTypeSelectorPosition, setTaskTypeSelectorPosition] = useState({
    top: 0,
    left: 0,
  });

  // Close emoji picker when clicking outside
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

  // Close task type selector when clicking outside
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

  useEffect(() => {
    setCategoryName(category.name);
    setCategorySymbol(category.symbol);
    setSelectedType(category.type);
  }, [category]);

  // Update category name immediately
  const handleCategoryNameChange = (e) => {
    const newName = e.target.value;
    setCategoryName(newName);
  
    const updatedCategory = {
      ...category,
      name: newName.trim(),
    };
    updateCategory(updatedCategory);
  };

  // Update category symbol immediately
  const handleCategorySymbolChange = (newSymbol) => {
    setCategorySymbol(newSymbol);

    const updatedCategory = {
      ...category,
      name: categoryName.trim(),
      symbol: newSymbol,
      type: selectedType,
      rules: category.rules,
    };
    updateCategory(updatedCategory);
  };

  // Update category type immediately
  const handleCategoryTypeChange = (newType) => {
    setSelectedType(newType);

    const updatedCategory = {
      ...category,
      name: categoryName.trim(),
      symbol: categorySymbol,
      type: newType,
      rules: category.rules,
    };
    updateCategory(updatedCategory);
  };

  return (
    <div className="w-full max-h-[90vh] overflow-auto relative">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-gray-200">
        {/* Emoji Picker Button */}
        <div className="flex items-center">
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
            className="px-1 py-1/2 rounded-md text-2xl border border-gray-300 bg-white focus:outline-none"
          >
            {categorySymbol || '😀'}
          </button>

          {/* Category Name Input */}
          <input
            type="text"
            value={categoryName}
            onChange={handleCategoryNameChange}
            className="ml-4 text-xl font-semibold focus:outline-none"
            placeholder="Category Name"
          />
        </div>

        {/* Task Type Selector */}
        <div className="flex items-center">
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

          {/* Close Button */}
          <button onClick={onClose} className="ml-10 bg-gray-200 rounded-sm p-1">
            {/* SVG for close icon */}
            <svg
              className="w-6 h-6 text-gray-500 hover:text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <line x1="18" y1="6" x2="6" y2="18" strokeWidth="2" strokeLinecap="round" />
              <line x1="6" y1="6" x2="18" y2="18" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-row divide-x divide-gray-200 h-96">
        {/* Tasks Table */}
        <div className="w-1/4 p-4 overflow-auto">
          <h3 className="text-lg font-semibold mb-2 flex flex-row justify-center pb-2 border-b">
            Tasks
          </h3>
          {/* Implement tasks table here */}
          <br/>
          <p className="text-gray-500 text-center">No tasks yet.</p>
        </div>

        {/* Rules Table */}
        <div className="w-3/4 p-4 overflow-auto">
          <h3 className="text-lg font-semibold mb-2 flex flex-row justify-center pb-2 border-b">
            Rules
          </h3>
          <div className="flex flex-col w-full px-2">
            <RuleEntry
              index={0}
              categoryId={categoryId}
              addRuleToCategory={addRuleToCategory}
            />

            {[...category.rules].reverse().map((rule, index) => {
              return (
                <RuleField
                  key={rule.id}
                  index={index}
                  rule={rule}
                  categoryId={categoryId}
                  updateRuleInCategory={updateRuleInCategory}
                  deleteRuleFromCategory={deleteRuleFromCategory}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      {confirmingDeletion ? (
        <div className="bg-gray-100 px-6 py-3 flex justify-end space-x-5 shadow-inner">
          <span className="pt-3/2 pr-4 font-sans font-semibold">Confirm Deletion:</span>
          <button
            type="button"
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500"
            onClick={() => {
              deleteCategory(category.name);
              onClose();
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
            onClick={() => setConfirmingDeletion(true)}
          >
            Delete Category
          </button>
          {/* Removed Save Button */}
        </div>
      )}

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
                    handleCategorySymbolChange(emoji);
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
                    handleCategoryTypeChange(type);
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

export default CategoryEditorDialog;