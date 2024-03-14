// ActivityPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const ActivityPage = () => {
  // Sample activity logs, replace it with real data from your context or API
  const [activityLogs, setActivityLogs] = useState([]);
  const { user, isloggedin } = useAuth();

  useEffect(() => {
    const fetchActivityLogs = async () => {
      // Example: Fetch data from an API endpoint
      const response = await axios.get(`http://localhost:3001/api/logs/all`);
      setActivityLogs(response.data);
      console.log(activityLogs);
    };

    fetchActivityLogs();
  }, []);

  return (
    <>
      {isloggedin ? (
        <div className="container mx-auto my-8 p-8 bg-gray-100 rounded-lg">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Activity Logs for all users
          </h2>

          {activityLogs.length === 0 ? (
            <p className="text-center text-gray-600">No activity logs found.</p>
          ) : (
            <table className="min-w-full border bg-white border-gray-300 rounded">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 py-2 px-4">User ID</th>
                  <th className="border border-gray-300 py-2 px-4">Cam ID</th>
                  <th className="border border-gray-300 py-2 px-4">
                    Timestamp
                  </th>
                  <th className="border border-gray-300 py-2 px-4">Message</th>
                </tr>
              </thead>
              <tbody>
                {activityLogs.map((log) => (
                  <tr key={log.id}>
                    <td className="border border-gray-300 py-2 px-4">
                      {log.userid}
                    </td>
                    <td className="border border-gray-300 py-2 px-4">
                      {log.camid}
                    </td>
                    <td className="border border-gray-300 py-2 px-4">
                      {new Date(log.timestamp).toLocaleString("en-IN", {
                        timeZone: "Asia/Kolkata",
                      })}
                    </td>
                    <td className="border border-gray-300 py-2 px-4">
                      {log.message}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ) : (
        <p className="text-center text-green-700 font-bold text-3xl hover:text-green-900 mt-16">
          <Link to={"/login"}>Click to Login and continue</Link>
        </p>
      )}
    </>
  );
};

export default ActivityPage;
