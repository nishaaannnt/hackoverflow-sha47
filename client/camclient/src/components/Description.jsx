import React from 'react'

const Description = () => {
  return (
    <div className=" p-8 mt-10 flex flex-col h-full justify-between shadow-r-lg">
            <div>
              <h2 className="text-xl text-center font-medium mb-4 border-b-2 py-3">
                Description
              </h2>
              <ul className="list-disc">
                <li>Check your camera packaging for all the details</li>
                <li>
                  Camera Name can be HikVision, Aditya Infotech, Videocon etc.
                </li>
                <li>Camera Range can be 20 to 60 </li>
                <li>Camera Type list is provided</li>
                <li>Record Capacity of a camera can be in GBs or TBs </li>
                <li className="py-5">
                  Contact the CCTV provider of yours if still in doubt
                </li>
              </ul>
            </div>
            
          </div>
  )
}

export default Description
