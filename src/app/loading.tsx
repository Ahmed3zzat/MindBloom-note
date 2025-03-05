import React from 'react'

export default function loading() {
  return (
    <div className="fixed left-1/2 top-1/2 -translate-1/2 flex items-center justify-center min-h-screen bg-[#F8E9E9]">
    <div className="flex flex-col items-center space-y-4">
      <div className="w-12 h-12 border-4 border-[#69995D] border-t-[#CBAC88] rounded-full animate-spin"></div>

      <p className="text-[#394648] text-lg font-semibold">Loading your notes...</p>
    </div>
  </div>
  )
}
