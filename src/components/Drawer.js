import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/solid';
import { useAppContext } from '../contexts/AppContext';
import CategoryEditorDialog from './category/CategoryEditorDialog';
import DB_ConnectWidget from './DB_ConnectionTester';

function Drawer({ isOpen, setIsOpen }) {
  const { categories } = useAppContext();

  const [showOutsideToggle, setShowOutsideToggle] = useState(!isOpen);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);

  // New state variable to track the category being edited
  const [editingCategoryId, setEditingCategoryId] = useState(null);

  // Handle drawer close
  const handleDrawerClose = () => {
    setIsOpen(false);
    setShowOutsideToggle(false); // Hide the outside toggle button until after animation
  };

  // Handle drawer open
  const handleDrawerOpen = () => {
    setIsOpen(true);
    setShowOutsideToggle(false); // Hide the outside toggle button immediately
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={handleDrawerClose}
        ></div>
      )}

      {/* Drawer */}
      <Transition
        show={isOpen}
        enter="transition-transform duration-300"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition-transform duration-300"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
        className="fixed inset-y-0 left-0 z-50 flex"
        afterLeave={() => setShowOutsideToggle(true)}
      >
        <div className="bg-white backdrop-blur-xl backdrop-brightness-120 backdrop-saturate-60 backdrop-contrast-70 shadow-xl w-64 p-6 flex flex-col">
          {/* Toggle Button */}
          <div className="absolute top-2 right-[-40px]">
            <button
              onClick={handleDrawerClose}
              className="bg-white backdrop-blur-xl backdrop-brightness-120 backdrop-saturate-60 backdrop-contrast-70 p-2 rounded-r-md focus:outline-none"
            >
              <ChevronLeftIcon className="h-6 w-6 text-stone-700" />
            </button>
          </div>

          {/* Overview Section */}
          <div className="mb-6 flex flex-row justify-center items-center w-full">
            <div className="text-xl bg-stone-500 p-3 pt-2 px-4 rounded-md font-semibold text-white hover:bg-stone-600">
              <DB_ConnectWidget/>
            </div>
          </div>

          {/* View Section */}
          <div className="mb-6">
            <h2 className="text-md font-semibold text-stone-700 mb-2">
              View
            </h2>
            <hr className="flex w-full border-t-2 pb-4 border-stone-300 opacity-70 shadow-3xl" />
            <div className="flex flex-col space-y-2">
              <button className="text-stone-600 hover:text-blue-500 text-left">
                Today
              </button>
              <button className="text-stone-600 hover:text-blue-500 text-left">
                This Week
              </button>
              <button className="text-stone-600 hover:text-blue-500 text-left">
                This Month
              </button>
            </div>
          </div>

          {/* Categories Section */}
          <div className="mb-6 flex-grow">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-md font-semibold text-stone-700">
                Categories
              </h2>
              <button
                onClick={() => {
                  setIsCategoryDialogOpen(true);
                  setEditingCategoryId(null); // Open dialog without editing a specific category
                }}
                className="text-stone-600 hover:text-blue-500"
              >
                <svg className={`opacity-100 size-7 border-1`} viewBox="-265 80 300 300" fill="#766F6B"
                  onMouseEnter={(e) => e.currentTarget.setAttribute('fill', '#57534e')}
                  onMouseLeave={(e) => e.currentTarget.setAttribute('fill', '#766F6B')}>
                  <path
                    d="M-189.47 311.552c-1.322-.68-3.347-2.505-4.5-4.058-2.079-2.798-2.1-3.463-2.366-76.737-.297-81.609-.485-78.985 5.959-82.914 3.161-1.928 4.964-2.019 40.06-2.022l36.75-.004v13h-70V300.83l70.75-.256 70.75-.257.263-35.25.263-35.25h11.974v37.05c0 31.16-.241 37.515-1.517 39.983-3.202 6.191-.143 5.968-81.683 5.952-56.979-.011-74.86-.303-76.703-1.25m49.33-53.5c-2.671-1.83-2.09-5.088 4.095-22.99l6.47-18.726 31.246-31.256 31.244-31.257 14.762 14.738 14.763 14.738-31.67 31.681-31.67 31.682-17.681 6.078c-18.02 6.194-19.675 6.602-21.559 5.312m91.823-92.476c-7.837-7.856-14.25-14.736-14.25-15.29 0-1.334 19.89-20.94 22.685-22.36 3.515-1.785 6.047-.084 18.065 12.14 7.82 7.954 11.25 12.152 11.25 13.766 0 1.626-3.525 5.879-11.75 14.175l-11.75 11.853z"
                    stroke="#766F6B" strokeWidth={1} strokeLinecap="round" strokeLinejoin="square"/>
                  </svg>
              </button>
            </div>
            <hr className="flex w-full border-t-2 pb-4 border-stone-300 opacity-70 shadow-3xl" />
            <div className="flex flex-col space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className="text-stone-600 hover:text-blue-500 text-left"
                  onClick={() => {
                    setIsCategoryDialogOpen(true);
                    setEditingCategoryId(category.id);
                  }}
                >
                  {category.symbol} {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Profile Section */}
          <div className="mt-auto">
            <button className="flex items-center space-x-3 hover:text-blue-500">
              <svg className="size-10" viewBox="0 0 500 500"> <path d="M335.7 88.94c-4.742.194-9.563 1.486-14.204 4.165-38.934 22.48-89.77 21.953-127.79.002-6.09-3.516-12.285-4.61-18.145-3.892 5.914 7.778 9.438 17.572 9.438 28.09 
                0 23.15-17.037 42.83-39.176 45.095-12.775 14.92-21.553 31.807-24.386 49.983 44.73-23.79 90.947-35.572 137.064-35.508 46.15.064 92.197 11.987 136.56 
                35.62-2.69-18.15-11.216-35.043-23.794-49.92-.585.026-1.17.048-1.76.048-24.18 0-43.447-20.7-43.447-45.318 0-10.64 3.6-20.543 9.64-28.364zm-194.15 3.216c-12.67 0-23.277 
                10.85-23.277 25.15 0 14.297 10.608 25.147 23.278 25.147 12.67 0 23.276-10.85 23.276-25.148s-10.606-25.15-23.275-25.15zm227.956 0c-12.67 0-23.277 10.85-23.277 25.15 0 14.297 
                10.607 25.147 23.276 25.147 12.67 0 23.277-10.85 23.277-25.148s-10.608-25.15-23.277-25.15zm67.572 93.367c-8.525.088-17.893 1.546-27.853 4.243 6.926 19.457 8.57 40.725 2.695 
                62.656-4.26 15.896.933 37.475 11.7 54.758l4.69 7.53-7.02 5.43c-19.765 15.28-36.44 25.107-46.104 35.264-9.664 10.158-13.887 19.59-10.915 40.875l1.525 10.91c3.596 4.7 7.678 
                9.43 12.142 14.06 19.876-14.55 36.01-23.887 68.344-4.094-6.738-18.804 15.938-29.762 46.72-29.78-36.91-15.88-64.98-25.62-86.438-30.376 67.492-72.188 97.182-127.96 
                66-159.188-8.172-8.183-19.356-12.034-33.28-12.28-.73-.014-1.463-.016-2.204-.01zm-361.617.002c-.806-.01-1.606-.008-2.397.006-13.925.248-25.14 4.1-33.313 12.282-31.182 
                31.227-1.492 87 66 159.188-21.456 4.756-49.528 14.497-86.438 30.375 30.782.02 53.458 10.977 46.72 29.78 32.332-19.792 48.468-10.454 68.343 4.095 6.713-6.962 12.572-14.146 
                17.188-21.12l.537-3.85c2.972-21.283-1.25-30.716-10.914-40.874-9.664-10.157-26.34-19.984-46.106-35.265l-7.02-5.427 4.692-7.53c10.73-17.228 15.858-39.233 
                11.7-54.76-5.782-21.572-4.185-42.44 2.536-61.56-11.336-3.388-21.954-5.216-31.527-5.338zm183.038 9.66c-46.096-.065-92.3 12.827-137.574 38.846.47 4.387 1.292 8.825 2.494 
                13.31v.002c5.453 20.354.593 42.93-9.484 62.297 15.89 11.634 30.343 20.526 41.478 32.23 10.36 10.89 16.795 25.132 16.955 43.712-1.096 16.308-9.157 39.273-22.347 59.244 
                24.59-14.237 42.134-15.333 45.29 3.492 14.097-17.783 25.698-20.386 
                38.985-8.035-3.745-31.452-11.117-52.887-17.258-65.097-14.896-36.567-42.816-61.484-73.742-83.424l11.36-16.014c38.788 27.517 76.798 62.663 89.124 119.566 9.628.705 19.25.65 
                28.85-.16 12.362-56.81 50.334-91.918 89.085-119.408l11.36 16.016c-31.19 22.127-59.333 47.28-74.13 84.363-6.045 12.357-13.14 33.493-16.793 64.158 13.29-12.35 24.89-9.748 
                38.987 8.035 3.153-18.825 20.697-17.73 45.288-3.492-13.51-20.455-21.645-44.058-22.42-60.424.415-18.01 6.81-31.872 16.95-42.533 11.135-11.705 25.586-20.595 
                41.474-32.23-10.064-19.29-14.99-41.736-9.48-62.302 1.198-4.467 2.028-8.89 2.51-13.266-44.85-25.79-90.852-38.82-136.964-38.886z"/></svg>
              <span className="text-stone-700 font-semibold">
                Doc Frogman
              </span>
            </button>
          </div>
        </div>
      </Transition>

      {/* Toggle Button */}
      {showOutsideToggle && (
        <div className="fixed top-2 z-50">
          <button
            onClick={handleDrawerOpen}
            className="bg-white backdrop-blur-xl backdrop-brightness-120 backdrop-saturate-60 backdrop-contrast-70 shadow-xl p-2 rounded-r-md focus:outline-none"
          >
            <ChevronRightIcon className="h-6 w-6 text-stone-700" />
          </button>
        </div>
      )}

      {/* Category Editor Dialog */}
      <CategoryEditorDialog
        isOpen={isCategoryDialogOpen}
        onClose={() => {
          setIsCategoryDialogOpen(false);
          setEditingCategoryId(null); // Reset editing category ID
        }}
        editingCategoryId={editingCategoryId} // Pass the editing category ID
      />
    </>
  );
}

export default Drawer;






