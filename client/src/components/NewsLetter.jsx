import React from 'react'

function NewsLetter() {
  return (
    <div className="w-full bg-primary/90 border border-primary/30 px-4 sm:px-6 lg:px-8 text-center py-12 sm:py-16 lg:py-20 flex flex-col items-center justify-center mt-6 rounded-lg">

      {/* Heading */}
      <p className="text-gray-300 font-bold text-xl sm:text-2xl lg:text-3xl">
        Get Updated!
      </p>
      <h1 className="max-w-lg font-semibold text-2xl sm:text-3xl lg:text-4xl leading-snug sm:leading-snug lg:leading-[44px] mt-3 px-2 text-white">
        Subscribe to our Newsletter & Get the Latest News
      </h1>

      {/* Input + Button */}
      <div className="flex flex-col sm:flex-row items-center justify-center mt-8 sm:mt-10 border-2 border-primary focus-within:outline focus-within:outline-primary text-sm rounded-full h-auto sm:h-14 max-w-md w-full overflow-hidden">
        <input
          type="text"
          className="bg-primary-dull/50 outline-none px-4 py-3 sm:py-0 flex-1 text-sm sm:text-base w-full text-white placeholder-gray-300"
          placeholder="Enter your email address"
        />
        <button className="bg-primary hover:bg-primary-dull cursor-pointer text-white font-medium rounded-full h-11 px-6 sm:px-8 w-full sm:w-auto mt-3 sm:mt-0 sm:mr-1 flex items-center justify-center">
          Subscribe Now
        </button>
      </div>
    </div>
  )
}

export default NewsLetter
