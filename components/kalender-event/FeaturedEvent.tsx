
import React from 'react';
import Image from 'next/image'; 
import { FeaturedEventData } from './types';


const ZoomIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
    <path d="M10 16.5l6-4.5-6-4.5v9zM5 20.156A2.146 2.146 0 012.844 18V6A2.146 2.146 0 015 3.844h14A2.146 2.146 0 0121.156 6v12a2.146 2.146 0 01-2.156 2.156H5z" />
  </svg>
);

interface FeaturedEventProps {
  event: FeaturedEventData;
}

const FeaturedEvent: React.FC<FeaturedEventProps> = ({ event }) => {
 
  const imagePath = event.backgroundImageUrl;

  return (
    <div className="relative rounded-lg shadow-lg overflow-hidden h-full">
     
      
      <Image
          src={imagePath} 
          alt={event.title || "Background acara"}
          fill 
          className="z-0 object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"            
      />

      <div className="relative z-20 p-6 md:p-8 flex flex-col justify-between h-full text-black">
        <div> 
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-[shadow:1px_1px_3px_rgba(255,255,255,1)]">{event.title}</h2>
          <div className="space-y-2 text-md mb-4">
            <p className="font-semibold">{event.fullDate}</p>
            <p>{event.time}</p>
            <div className="flex items-center">
              {event.platformIcon || <ZoomIcon />}
              <p>{event.platform}</p>
            </div>
          </div>
          <div>
            <p className="font-semibold mb-1">Pembicara:</p>
            <ul className="list-disc list-inside text-md text-[shadow:1px_1px_3px_rgba(255,255,255,1)]">
              {event.speakers.map(speaker => <li key={speaker}>{speaker}</li>)}
            </ul>
          </div>
        </div>

        <div className="mt-6"> 
          <a
            href={event.registrationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-secondary hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-150"
          >
            Daftar sekarang: [{event.registrationLink.split('/').pop()}]
          </a>
        </div>
      </div>
    </div>
  );
};

export default FeaturedEvent;