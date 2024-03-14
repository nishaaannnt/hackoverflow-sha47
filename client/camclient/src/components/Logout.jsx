import React from 'react'

const Logout = () => {

    const handleLogout=()=>{
        localStorage.removeItem('token');
        window.location.href='/';
    }

  return (
    <div className="bg-[#006e43] p-1 px-4 py-2 rounded-lg text-white hover:text-gray-300 hover:cursor-pointer" onClick={handleLogout}>Logout</div>
  )
}

export default Logout