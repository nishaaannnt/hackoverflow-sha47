import React from 'react';
// GPT GENERATED
const HomePage = () => {
  
  return (
    <div className="bg-gray-100 ">
      <main className="container mx-auto min-h-[81vh] py-8 px-8">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1: Geotagging */}
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-4">Geotagging</h2>
            <p className="text-gray-700">
              Enhance your CCTV footage with geospatial data to map and track locations effectively.
            </p>
          </div>

          {/* Feature 2: Video Analysis */}
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-4">Video Analysis</h2>
            <p className="text-gray-700">
              Utilize advanced video analytics to extract meaningful insights and enhance security monitoring.
            </p>
          </div>

          {/* Additional Features */}
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-4">More Features</h2>
            <ul className="list-disc pl-4 text-gray-700">
              <li>Real-time Alerts</li>
              <li>Secured Systems</li>
              <li>Integration with Maps</li>
            </ul>
          </div>
        </section>
        <img src="police.jpg" alt="" className='rounded-xl mt-8'/>
      </main>

      <footer className="bg-dark-green text-white text-center py-4 mt-8">
        <p>&copy; 2023 SHA - 47. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
