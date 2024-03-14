import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {setLoggedIn, setUser} = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/auth/v2/police/login', {
        username,
        password,
      });

      console.log(response);

      if (response.status === 200) {
        const data = await response.data;
        //console.log('Login successful!');
        toast.success('Login successful!');
        localStorage.setItem('token', data.token);
        setLoggedIn(true);
        window.location.href='/';
        console.log(response.data[0]);
        setUser(response.data[0]);
        setError('');
        // TODO: Handle successful login (e.g., redirect to another page, update state, etc.).
      } else {
        console.error('Login failed:', response.data);
        toast.error('Incorrect.Check username and password!');
        setError('Login failed. Please check your username and password.');
      }
    } catch (error) {
      toast.error("Invalid Credentials");
      console.error('Login failed:', error.response ? error.response.data : error.message);
      setError('Please check that you have signed up.');
    }
  };

  return (
    <div>
      <div className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <h2 className='mt-10 text-center text-2xl font-bold leading-0 tracking-tight text-dark-green'>
            Login to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto  w-1/3 border-2  p-8 rounded-xl">
          <form
            action=""
            onSubmit={(e) => handleSubmit(e)}
            className="space-y-6"
            method='POST'
          >
            <div>
              <label htmlFor="username" className='block text-sm font-medium leading-6'>Username</label>
              <div className="mt-2">
                <input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  name="username"
                  type="name"
                  autoComplete='username'
                  placeholder='Enter your username'
                  required
                  className='block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset px-4 text-gray focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className='block text-sm font-medium leading-6'>Password</label>
              <div className="mt-2">
                <input
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  type="password"
                  autoComplete='password'
                  placeholder='Enter your password'
                  required
                  className='block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset px-4 text-gray focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>
            <div className='flex justify-center'> 
              <button
                type="submit"
                className='flex w-full justify-center rounded-md bg-dark-green px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-light-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                Log In
              </button>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
};

export default Login;
