import React from 'react';
import download from '../assets/download.png';
import {downloadImage} from '../utils';

export default function Card({ _id, name, prompt, photo }) {    
  return (
    <div className="rounded-xl group relative">
      <img
        className="w-full h-auto object-cover rounded-xl"
        src={photo}
        alt={prompt}
      />
      <div className='group-hover:flex flex-col max-h-[94.5%] bg-slate-600 hidden rounded-lg absolute bottom-0 right-0 left-0 p-4'>
          <div className='flex justify-between items-center'>
             <div className='flex items-center'>
                <div className="w-7 h-7 rounded-full object-cover bg-pink-700 mr-2 flex justify-center items-center text-white text-xs font-bold">{name[0]}</div>
                <p className="text-white text-sm">{name}</p>
             </div>
             <button type="button" onClick={() => downloadImage(_id, photo)} className="outline-none bg-transparent border-none">
                <img src={download} alt="download" className="w-6 h-6 object-contain invert" />
             </button>
          </div>  
      </div>
    </div>
  );
}
