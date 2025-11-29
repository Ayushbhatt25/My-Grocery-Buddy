import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext.jsx'
import toast from 'react-hot-toast';

function SellerLogin() {
  const { isSeller, setIsSeller, navigate, axios } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post('/api/seller/login', { email, password });
      if (data.success) {
        setIsSeller(true);
        navigate('/seller');
      }
      else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if (isSeller) {
      navigate("/seller");
    }
  }, [isSeller]);

  return !isSeller && (
    <form onSubmit={onSubmitHandler} className='min-h-screen flex items-center text-sm text-primary'>
      <div className='flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-700 bg-gray-900'>
        <p className='text-2xl font-medium m-auto text-primary'>
          <span className='text-primary'>
            Seller {" "}
          </span>
          Login
        </p>
        <div className='w-full'>
          <p>Email:</p>
          <input onChange={(e) => setEmail(e.target.value)} value={email}
            type='email' placeholder='Enter Email' required className='border border-gray-600 bg-gray-800 text-white placeholder-gray-400
                rounded w-full p-2 mt-1 outline-none focus:border-primary' />
        </div>
        <div className='w-full'>
          <p>Password:</p>
          <input onChange={(e) => setPassword(e.target.value)} value={password}
            type='password' placeholder='Enter Password' required className='border border-gray-600 bg-gray-800 text-white placeholder-gray-400
                rounded w-full p-2 mt-1 outline-none focus:border-primary' />
        </div>
        <button className='bg-white text-gray-900 border-2 border-primary hover:bg-primary hover:text-white transition-all font-bold w-full py-2 rounded-md cursor-pointer'>Login</button>
      </div>
    </form>
  )
}

export default SellerLogin
