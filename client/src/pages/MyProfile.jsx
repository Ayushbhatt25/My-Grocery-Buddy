import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { assets } from '../assets/assets';

const MyProfile = () => {
    const { user } = useAppContext();
    const [isEdit, setIsEdit] = useState(false);
    const [userData, setUserData] = useState({
        name: user?.name || "User Name",
        email: user?.email || "user@example.com",
        phone: "+1 123 456 7890",
        address: {
            line1: "123 Main St",
            line2: "Apt 4B",
            city: "New York",
            state: "NY",
            country: "USA"
        },
        gender: "Not Selected",
        dob: "2000-01-01"
    });

    return (
        <div className='max-w-lg mx-auto mt-10 p-6 bg-gray-800/50 backdrop-blur-md border border-white/10 rounded-xl shadow-xl text-gray-300'>
            <div className='flex flex-col items-center gap-4 mb-8'>
                <div className='relative group'>
                    <img className='w-24 h-24 rounded-full object-cover border-4 border-primary/20 group-hover:border-primary transition-colors duration-300' src={assets.profile_icon} alt="Profile" />
                    {isEdit && (
                        <div className='absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity'>
                            <span className='text-xs text-white'>Edit</span>
                        </div>
                    )}
                </div>
                {isEdit ? (
                    <input
                        className='bg-gray-700 text-2xl font-medium text-center text-white outline-none border-b border-primary w-full max-w-[200px]'
                        type="text"
                        value={userData.name}
                        onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
                    />
                ) : (
                    <p className='text-2xl font-medium text-white'>{userData.name}</p>
                )}
            </div>

            <hr className='border-gray-700 mb-6' />

            <div className='space-y-6'>
                <div>
                    <p className='text-gray-400 underline mb-3 text-sm uppercase tracking-wider'>Contact Information</p>
                    <div className='grid grid-cols-[1fr_3fr] gap-y-3 text-sm'>
                        <p className='font-medium'>Email:</p>
                        <p className='text-primary'>{userData.email}</p>

                        <p className='font-medium'>Phone:</p>
                        {isEdit ? (
                            <input
                                className='bg-gray-700 text-white outline-none px-2 py-1 rounded border border-gray-600 focus:border-primary'
                                type="text"
                                value={userData.phone}
                                onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                            />
                        ) : (
                            <p>{userData.phone}</p>
                        )}

                        <p className='font-medium'>Address:</p>
                        {isEdit ? (
                            <div className='space-y-1'>
                                <input
                                    className='bg-gray-700 text-white outline-none px-2 py-1 rounded border border-gray-600 focus:border-primary w-full'
                                    type="text"
                                    value={userData.address.line1}
                                    onChange={e => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                                />
                                <input
                                    className='bg-gray-700 text-white outline-none px-2 py-1 rounded border border-gray-600 focus:border-primary w-full'
                                    type="text"
                                    value={userData.address.line2}
                                    onChange={e => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                                />
                            </div>
                        ) : (
                            <p>
                                {userData.address.line1} <br />
                                {userData.address.line2}
                            </p>
                        )}
                    </div>
                </div>

                <div>
                    <p className='text-gray-400 underline mb-3 text-sm uppercase tracking-wider'>Basic Information</p>
                    <div className='grid grid-cols-[1fr_3fr] gap-y-3 text-sm'>
                        <p className='font-medium'>Gender:</p>
                        {isEdit ? (
                            <select
                                className='bg-gray-700 text-white outline-none px-2 py-1 rounded border border-gray-600 focus:border-primary'
                                value={userData.gender}
                                onChange={e => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        ) : (
                            <p>{userData.gender}</p>
                        )}

                        <p className='font-medium'>Birthday:</p>
                        {isEdit ? (
                            <input
                                className='bg-gray-700 text-white outline-none px-2 py-1 rounded border border-gray-600 focus:border-primary'
                                type="date"
                                value={userData.dob}
                                onChange={e => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                            />
                        ) : (
                            <p>{userData.dob}</p>
                        )}
                    </div>
                </div>
            </div>

            <div className='mt-10 flex justify-center'>
                {isEdit ? (
                    <button
                        className='bg-primary hover:bg-primary-dull text-white px-8 py-2 rounded-full font-medium transition-all shadow-lg shadow-primary/30 hover:-translate-y-0.5'
                        onClick={() => setIsEdit(false)}
                    >
                        Save Information
                    </button>
                ) : (
                    <button
                        className='border border-primary text-primary hover:bg-primary hover:text-white px-8 py-2 rounded-full font-medium transition-all shadow-lg shadow-primary/10 hover:shadow-primary/30 hover:-translate-y-0.5'
                        onClick={() => setIsEdit(true)}
                    >
                        Edit Profile
                    </button>
                )}
            </div>
        </div>
    );
};

export default MyProfile;
