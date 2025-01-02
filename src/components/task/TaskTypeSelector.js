import React from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { Input, Dialog, DialogBackdrop, DialogPanel, MenuButton, MenuItems, MenuItem, Menu, Textarea} from '@headlessui/react';

function TaskTypeSelector({ selectedType, setSelectedType, disabled }) {
  const { taskTypes } = useAppContext();

  const availableTypes = Object.values(taskTypes).filter(
    (type) => !type.label.includes('SUBTASK')
  );

  const currentType = availableTypes.find((type) => type.label === selectedType);

  return (
    <Menu as="div" className="relative inline-block text-left w-full">
      <MenuButton
        style={{ backgroundColor: currentType.color }}
        className="block rounded-md px-4 py-2 text-sm font-semibold text-white w-full text-center"
        disabled={disabled}
      >
        {currentType.label}
      </MenuButton>
      <MenuItems className="absolute w-full rounded-sm shadow-lg bg-white focus:outline-none z-10">
        {availableTypes
          .filter((type) => type.label !== currentType.label)
          .map((type) => (
            <MenuItem key={type.label}>
              {({ active }) => (
                <button
                  onClick={() => setSelectedType(type.label)}
                  className={`${
                    active ? 'bg-gray-100' : ''
                  } flex items-center justify-center w-full py-2 text-sm`}
                >
                  <span
                    style={{ backgroundColor: type.color }}
                    className="rounded-md px-4 py-2 text-sm font-semibold text-white w-full text-center"
                  >
                    {type.label}
                  </span>
                </button>
              )}
            </MenuItem>
          ))}
      </MenuItems>
    </Menu>
  );
}

export default TaskTypeSelector;