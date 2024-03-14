import React from "react";
import { useState } from "react";

const UserTable = ({ userData }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [filtereduserData, setFilterData] = useState();

  const handleSearch = (e) => {
    const keyword = e.target.value;
    setSearchQuery(keyword);
    if (keyword.length < 3) {
      setSearching(false);
      setFilterData({});
      return;
    }
    setSearching(true);
    const filtereduserData = userData.filter((user) =>
      Object.values(user).some((value) =>
        value.toString().toLowerCase().includes(keyword.toLowerCase())
      )
    );
    setFilterData(filtereduserData);
  };

  return (
    <div className="flex flex-col">
      <div className="w-full flex items-center justify-between mb-4">
        <p className="font-bold">Hello Admin,</p>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearch}
          className="my-3 px-4 py-2 border border-gray-700 rounded-md"
        />
      </div>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
        <tr className="bg-gray-200">
            <th className="border border-gray-300 py-2 px-4">User ID</th>
            <th className="border border-gray-300 py-2 px-4">Email</th>
            <th className="border border-gray-300 py-2 px-4">Full Name</th>
            <th className="border border-gray-300 py-2 px-4">Phone</th>
            <th className="border border-gray-300 py-2 px-4">Locale Name</th>
            <th className="border border-gray-300 py-2 px-4">Locale Address</th>
            <th className="border border-gray-300 py-2 px-4">Locale Type</th>
          </tr>
        </thead>
        <tbody>
          {searching
            ? filtereduserData.map((user) => (
                <tr key={user.userid}>
                  <td className="border border-gray-300 py-2 px-4">
                    {user.userid}
                  </td>
                  <td className="border border-gray-300 py-2 px-4">
                    {user.email}
                  </td>
                  <td className="border border-gray-300 py-2 px-4">
                    {user.fullname}
                  </td>
                  <td className="border border-gray-300 py-2 px-4">
                    {user.phone}
                  </td>
                  <td className="border border-gray-300 py-2 px-4">
                    {user.locale_name}
                  </td>
                  <td className="border border-gray-300 py-2 px-4">
                    {user.locale_address}
                  </td>
                  <td className="border border-gray-300 py-2 px-4">
                    {user.locale_type}
                  </td>
                </tr>
              ))
            : userData.map((user) => (
                <tr key={user.userid}>
                  <td className="border border-gray-300 py-2 px-4">
                    {user.userid}
                  </td>
                  <td className="border border-gray-300 py-2 px-4">
                    {user.email}
                  </td>
                  <td className="border border-gray-300 py-2 px-4">
                    {user.fullname}
                  </td>
                  <td className="border border-gray-300 py-2 px-4">
                    {user.phone}
                  </td>
                  <td className="border border-gray-300 py-2 px-4">
                    {user.locale_name}
                  </td>
                  <td className="border border-gray-300 py-2 px-4">
                    {user.locale_address}
                  </td>
                  <td className="border border-gray-300 py-2 px-4">
                    {user.locale_type}
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
