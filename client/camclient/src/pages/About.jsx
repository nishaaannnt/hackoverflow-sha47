import React from 'react'

const About = () => {
  return (
    <div className="container mx-auto p-10 md:p-20 text-lg text-gray-700 leading-relaxed">

      {/* Header */}
      <div className="mb-8 bg-green-700 text-white p-6 rounded-md">
        <h1 className="text-3xl font-bold">About Us</h1>
      </div>

      {/* Rest of the content */}
      <p className="mb-8 ">
        Drishti - A project by SHA - 47 Team to safeguard and monitor surrounding in a more friendly way
      </p>

    </div>
  )
}

export default About