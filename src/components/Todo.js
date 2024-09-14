import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import TodoItem from './TodoItem';

export default function Todo() {
    return (
        <dl className="flex-grow items-center justify-center divide-y divide-gray-400 ">
            <TodoItem/>
            <TodoItem/>
            <TodoItem/>
            <TodoItem/>
        </dl>
    )
}