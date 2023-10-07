'use client'

import React, { useState } from "react";

export default function Model() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="w-screen h-screen flex flex-col items-center">
      <button className='bg-indigo-600 text-white font-[Poppins] py-2 px-6 rounded md:ml-8 hover:bg-indigo-400 duration-500'
        onClick={() => { setModalOpen(true) }}>Submit Exam</button>

      {modalOpen && 
        <div className="absolute inset-0 bg-skin-on-fill w-64 h-fit py-12 px-6 border space-y-3">
          <div className="relative top-0 right-0">
            <button onClick={() => { setModalOpen(false) }}>X</button>
          </div>
          <div className="text-3xl font-bold">
            <h1>Are You Sure You Want Submit the Exam ?</h1>
          </div>
          <div className="flex justify-between">
            <button className="bg-red-300 px-3 py-1 rounded-md border" onClick={() => { setModalOpen(false) }} >Cancel</button>
            <button className="bg-green-300 px-3 py-1 rounded-md border">Yes</button>
          </div>
        </div>}
    </div>
  );
}
