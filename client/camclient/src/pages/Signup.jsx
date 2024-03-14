import React from "react";
import { useState } from "react";
import axios from "axios";
const Signup = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    fullname: "",
    phone: "",
    locale_address: "",
    locale_name: "",
    locale_type: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      fullname,
      email,
      password,
      phone,
      locale_address,
      locale_name,
      locale_type,
    } = user;
    // console.log(firstname,lastname,email,password)
    // setloading(true);
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/v2/user/signup",
        {
          fullname,
          email,
          password,
          phone,
          locale_address,
          locale_name,
          locale_type,
        }
      );

      console.log(user);
      console.log(fullname);
      const data = await response.data;
      console.log(data);
      window.location.href = "/login";
    } catch (error) {
      console.error(
        "Login failed:",
        error.response ? error.response.data : error.message
      );
    }
  };
  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(user);
    // console.log(name,value)

    setUser({ ...user, [name]: value });
  };

  return (
    <div className="">
      <div className="flex min-h-full flex-col justify-center px-6 py-8 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-5 text-center text-2xl font-bold leading-0 tracking-tight text-dark-green">
            Signup to Login and Continue
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto bg-[#fff] w-2/3 shadow-xl border-2  p-8 rounded-xl">
          <form
            action=""
            onSubmit={(e) => handleSubmit(e)}
            className="space-y-6 "
            method="POST"
          >
           
            
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
            <div className="flex gap-5 justify-between ">
              <div className="w-full">
                <label
                  htmlFor="oname"
                  className="block text-sm font-medium leading-6"
                >
                  Full Name
                </label>
                <div className="mt-2">
                  <input
                    id="oname"
                    name="fullname"
                    type="oname"
                    onChange={handleInputs}
                    autoComplete="oname"
                    placeholder="Your Full Name"
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
                  Phone No.
                </label>
                <div className="mt-2">
                  <input
                    id="phone"
                    name="phone"
                    type="phone"
                    onChange={handleInputs}
                    autoComplete="phone"
                    placeholder="Phone No."
                    required
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset px-4 text-gray focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 py-1">Locale Type:</label>
              <select name="locale_type" onChange={handleInputs} className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset px-4 text-gray focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                <option disabled selected>--select locale type--</option>
                <option value="home">Home</option>
                <option value="shop">Shop</option>
                <option value="institution">Institution</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium leading-6"
              >
                Locale Name
              </label>
              <div className="mt-2">
                <input
                  id="address"
                  name="locale_name"
                  type="address"
                  onChange={handleInputs}
                  autoComplete="address"
                  placeholder="Locale address"
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
                Locale Address
              </label>
              <div className="mt-2">
                <input
                  id="address"
                  name="locale_address"
                  type="address"
                  onChange={handleInputs}
                  autoComplete="address"
                  placeholder="Locale address"
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
        </div>
      </div>
    </div>
  );
};

export default Signup;
