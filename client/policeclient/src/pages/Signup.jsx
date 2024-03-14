import React, { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

const Signup = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
    fullname: "",
    phone: "",
    station_address: "",
    station_name: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      fullname,
      username,
      email,
      password,
      cpassword,
      phone,
      station_address,
      station_name,
    } = user;

    // Check if password and confirm password match
    if (password !== cpassword) {
      setError("Password and Confirm Password do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/auth/v2/police/signup",
        {
          fullname,
          username,
          email,
          password,
          phone,
          station_address,
          station_name,
        }
      );

      console.log(user);
      console.log(fullname);
      toast.success("Account Created. Please LogIn");
      const data = await response.data;
      console.log(data);
      window.location.href = "/login";
    } catch (error) {

      setError(
        error.response
          ? error.response.data
          : "Signup failed. Please try again."
      );
      toast.error(error);
    }
  };

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({ ...user, [name]: value });
  };
  return (
    <div>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-5 text-center text-2xl font-bold leading-0 tracking-tight text-dark-green">
            Signup to login and continue
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto bg-[#fff] w-2/3 shadow-xl border-2  p-8 rounded-xl">
          <form
            action=""
            onSubmit={(e) => handleSubmit(e)}
            className="space-y-6"
            method="POST"
          >
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="name"
                  onChange={handleInputs}
                  autoComplete="username"
                  placeholder="Enter your username"
                  required
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset px-4 text-gray focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6"
              >
                Email Address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={handleInputs}
                  autoComplete="email"
                  placeholder="Enter your email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset px-4 text-gray focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="flex gap-5 justify-between ">
              <div className="w-full">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={handleInputs}
                    autoComplete="password"
                    placeholder="Enter your password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset px-4 text-gray focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="w-full">
                <label
                  htmlFor="cpassword"
                  className="block text-sm font-medium leading-6"
                >
                  Confirm Password
                </label>
                <div className="mt-2">
                  <input
                    id="cpassword"
                    name="cpassword"
                    type="password"
                    onChange={handleInputs}
                    autoComplete="cpassword"
                    placeholder="Confirm Password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset px-4 text-gray focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-5 justify-between">
              <div className="w-full">
                <label
                  htmlFor="oname"
                  className="block text-sm font-medium leading-6"
                >
                  Officer Name
                </label>
                <div className="mt-2">
                  <input
                    id="oname"
                    name="fullname"
                    type="oname"
                    onChange={handleInputs}
                    autoComplete="oname"
                    placeholder="Police Station Name"
                    required
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset px-4 text-gray focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="w-full">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium leading-6"
                >
                  Precinct Contact
                </label>
                <div className="mt-2">
                  <input
                    id="phone"
                    name="phone"
                    type="phone"
                    onChange={handleInputs}
                    autoComplete="phone"
                    placeholder="Police Station Phone Number"
                    required
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset px-4 text-gray focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="sname"
                className="block text-sm font-medium leading-6"
              >
                Precinct Name
              </label>
              <div className="mt-2">
                <input
                  id="sname"
                  name="station_name"
                  type="sname"
                  onChange={handleInputs}
                  autoComplete="sname"
                  placeholder="Police Station Name"
                  required
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset px-4 text-gray focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium leading-6"
              >
                Precinct Address
              </label>
              <div className="mt-2">
                <input
                  id="address"
                  name="station_address"
                  type="address"
                  onChange={handleInputs}
                  autoComplete="address"
                  placeholder="Police Station address"
                  required
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset px-4 text-gray focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-dark-green px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-light-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            </div>
          </form>
          <div className="flex justify-center text-red-500">{error}</div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
