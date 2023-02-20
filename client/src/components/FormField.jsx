import React from 'react'

export default function FormField({label,name,type,placeholder,value,handleChange}) {
  return (
    <div>
      <label htmlFor={name} className='block text-sm font-medium text-gray-900'>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
      />
    </div>
  );
}
