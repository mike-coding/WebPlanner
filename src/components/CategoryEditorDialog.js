// components/CategoryEditorDialog.js
import React, { useState } from 'react';
import { useTasks } from './TaskContext';
import TaskTypeSelector from './TaskTypeSelector';

function CategoryEditorDialog({ isOpen, onClose }) {
  const { categories, addCategory, deleteCategory, taskTypes } = useTasks();
  const [categoryName, setCategoryName] = useState('');
  const [selectedType, setSelectedType] = useState('TASK');

  const handleSave = () => {
    if (categoryName.trim()) {
      addCategory(categoryName.trim(), selectedType);
      setCategoryName('');
      setSelectedType('TASK');
    }
  };

  const handleCancel = () => {
    setCategoryName('');
    setSelectedType('TASK');
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleCancel}
    >
      <div
        className="bg-white p-6 rounded-md shadow-md w-96 max-h-[80vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-4">Edit Categories</h2>

        {/* Existing Categories */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Existing Categories</h3>
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-2 py-1 hover:bg-gray-100 rounded"
            >
              <div className="flex items-center space-x-2">
                <span>{category.name}</span>
                {/* Unclickable colored button indicating task type */}
                <span
                  style={{ backgroundColor: taskTypes[category.type].color }}
                  className="rounded-md px-2 py-1 text-sm font-semibold text-white"
                >
                  {category.type}
                </span>
              </div>
              <button
                onClick={() => deleteCategory(category.name)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        <hr className="my-4" />

        {/* Add New Category */}
        <h3 className="font-semibold mb-2">Add New Category</h3>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 mb-2"
          placeholder="Category Name"
        />

        {/* Select Obligatory Task Type */}
        <label className="block mb-1">Category Task Type:</label>
        <TaskTypeSelector
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          disabled={false}
        />

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
          >
            Close
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Category
          </button>
        </div>
      </div>
    </div>
  );
}

export default CategoryEditorDialog;