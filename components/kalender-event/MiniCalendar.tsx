// components/kalender-acara/MiniCalendar.tsx
import React from 'react';
import { CalendarDay } from './types';

const MiniCalendar: React.FC = () => {
  // Data contoh - idealnya ini akan dinamis
  const currentMonth = "Mei 2025";
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S']; // Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday
  const calendarDays: CalendarDay[] = [
    { day: null, isCurrentMonth: false }, { day: null, isCurrentMonth: false }, { day: null, isCurrentMonth: false }, { day: 1, isCurrentMonth: true }, { day: 2, isCurrentMonth: true }, { day: 3, isCurrentMonth: true }, { day: 4, isCurrentMonth: true },
    { day: 5, isCurrentMonth: true }, { day: 6, isCurrentMonth: true, isSelected: true }, { day: 7, isCurrentMonth: true }, { day: 8, isCurrentMonth: true }, { day: 9, isCurrentMonth: true }, { day: 10, isCurrentMonth: true }, { day: 11, isCurrentMonth: true },
    { day: 12, isCurrentMonth: true }, { day: 13, isCurrentMonth: true }, { day: 14, isCurrentMonth: true }, { day: 15, isCurrentMonth: true }, { day: 16, isCurrentMonth: true }, { day: 17, isCurrentMonth: true }, { day: 18, isCurrentMonth: true },
    { day: 19, isCurrentMonth: true }, { day: 20, isCurrentMonth: true }, { day: 21, isCurrentMonth: true }, { day: 22, isCurrentMonth: true }, { day: 23, isCurrentMonth: true }, { day: 24, isCurrentMonth: true }, { day: 25, isCurrentMonth: true },
    { day: 26, isCurrentMonth: true }, { day: 27, isCurrentMonth: true }, { day: 28, isCurrentMonth: true }, { day: 29, isCurrentMonth: true }, { day: 30, isCurrentMonth: true }, { day: 31, isCurrentMonth: true }, { day: null, isCurrentMonth: false },
  ];

  return (
    <div className="bg-white p-4 shadow rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-3">
        <button className="text-gray-600 hover:text-gray-800">&lt;</button>
        <h3 className="font-semibold text-sm text-gray-700">{currentMonth}</h3>
        <button className="text-gray-600 hover:text-gray-800">&gt;</button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 mb-2">
        {/* 👇 Corrected line: Use day and index for a unique key */}
        {daysOfWeek.map((day, index) => <div key={`${day}-${index}`}>{day}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {calendarDays.map((dayObj, index) => (
          <div
            key={index} // Index is fine here as the list is static and won't reorder
            className={`p-1 rounded-full flex items-center justify-center h-7 w-7
              ${!dayObj.isCurrentMonth ? 'text-gray-300' : 'text-gray-700'}
              ${dayObj.isSelected ? 'bg-blue-500 text-white' : ''}
              ${dayObj.isToday && !dayObj.isSelected ? 'bg-blue-100 text-blue-600' : ''}
              ${dayObj.day && dayObj.isCurrentMonth && !dayObj.isSelected ? 'hover:bg-gray-100 cursor-pointer' : ''}
            `}
          >
            {dayObj.day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiniCalendar;