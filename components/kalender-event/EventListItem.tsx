
import React from 'react';
import { EventListItemData } from './types';

interface EventListItemProps {
  event: EventListItemData;
}

const EventListItem: React.FC<EventListItemProps> = ({ event }) => {
  const isFeatured = event.type === "Webinar";

  return (
    <div className={`bg-white p-4 shadow rounded-lg border border-gray-200 ${isFeatured ? 'border-l-4 border-secondary' : ''}`}>
      <div className="flex items-start space-x-3">
        <div className="text-center shrink-0">
          <p className="text-2xl font-bold text-secondary">{event.day}</p>
          <p className="text-xs text-gray-500">{event.monthYear.substring(0,3)}</p>
          <p className="text-xs text-gray-500">{event.monthYear.substring(4)}</p>
        </div>
        <div className="flex-grow">
          <p className={`text-xs font-semibold ${isFeatured ? 'text-secondary' : 'text-gray-500'}`}>{event.type.toUpperCase()}</p>
          <h4 className="font-semibold text-gray-800 mb-1">{event.title}</h4>
          <p className="text-xs text-gray-600 mb-2">{event.description}</p>
        </div>
      </div>
      <button className={`mt-2 w-full flex items-center justify-center px-3 py-2 text-xs font-medium rounded-md
        ${isFeatured ? 'bg-secondary text-white hover:bg-green-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
      >
        Click to view detail
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 ml-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  );
};

export default EventListItem;