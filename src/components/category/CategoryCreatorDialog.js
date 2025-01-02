import React, { useState } from 'react';

function CategoryCreatorDialog({ isOpen, onClose, onSave }) {
  const [categoryName, setCategoryName] = useState('');

  const handleSave = () => {
    if (categoryName.trim()) {
      onSave(categoryName.trim());
      setCategoryName('');
    }
  };

  const handleCancel = () => {
    setCategoryName('');
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleCancel} // Close when clicking outside
    >
      <div
        className="bg-white p-6 rounded-md shadow-md"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <h2 className="text-lg font-semibold mb-4">Add New Category</h2>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
          placeholder="Category Name"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default CategoryCreatorDialog;