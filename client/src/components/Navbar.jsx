import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets.js'
import { useAppContext } from '../context/AppContext.jsx'
import { useState } from 'react'
import toast from 'react-hot-toast'

function Navbar() {
    const [open, setOpen] = useState(false);
    const { user, setUser, setShowUserLogin, navigate, setSearchQuery,
        searchQuery, getCartAmount, getCartCount, axios } = useAppContext();

    const logout = async () => {
        try {
            const { data } = await axios.get('/api/user/logout', { withCredentials: true });
            if (data.success) {
                toast.success(data.message);
                setUser(null);
                navigate('/');
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if (searchQuery.length > 0) {
            navigate("/products");
        }
    }, [searchQuery]);

    return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-white/10 bg-primary/90 backdrop-blur-xl relative transition-all z-50 shadow-lg shadow-black/20">
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
            <NavLink to='/home' onClick={() => setOpen(false)} className="flex items-center gap-2 group">
                <img className='h-9 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]' src={assets.logo} alt='logo' />
                <span className="font-bold text-2xl text-black transition-all duration-300 whitespace-nowrap">My Grocery Buddy</span>
            </NavLink>
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-2 ml-7 text-black font-medium">
                <NavLink to="/home" className="navbar-link">
                    Home
                </NavLink>

                <NavLink to="/products" className="navbar-link">
                    All Products
                </NavLink>

                <NavLink to="/" className="navbar-link">
                    Contact
                </NavLink>

                {/* Search Bar */}
                <div className="hidden lg:flex items-center text-sm gap-2 border border-white/10 px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 focus-within:border-primary/50 focus-within:bg-white/10 focus-within:shadow-[0_0_15px_rgba(16,185,129,0.1)] w-64">
                    <input onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-transparent outline-none placeholder-black text-black"
                        type="text" placeholder="Search products..." />
                    <img src={assets.search_icon} alt='search' className='w-4 h-4 opacity-70' />
                </div>

                {/* Cart Icon */}
                <div onClick={() => navigate("/cart")} className="relative cursor-pointer group">
                    <div className="p-2 rounded-full hover:bg-white/10 transition-colors duration-300">
                        <img src={assets.nav_cart_icon} alt='cart' className='w-6 group-hover:scale-110 transition-transform duration-300' />
                    </div>
                    <span className="absolute top-0 right-0 text-[10px] font-bold text-white bg-primary-dull w-5 h-5 flex items-center justify-center rounded-full shadow-lg shadow-primary/40 border border-gray-900 group-hover:scale-110 transition-transform duration-300">{getCartCount()}</span>
                </div>

                {/* Login Button */}
                {!user ? (
                    <button onClick={() => {
                        setOpen(false);
                        setShowUserLogin(true);
                    }}
                        className="group px-8 py-2.5 bg-gray-900 rounded-full text-white cursor-pointer active:scale-95 transition-all duration-300 hover:bg-primary-dull shadow-lg shadow-black/20 hover:shadow-black/40">
                        <div className="relative h-6 overflow-hidden">
                            <span className="block transition-transform duration-300 group-hover:-translate-y-full">Login</span>
                            <span className="absolute top-full left-0 w-full block transition-transform duration-300 group-hover:-translate-y-full">Login</span>
                        </div>
                    </button>) : (
                    <div className='relative group border-2 border-white/10 rounded-full p-0.5 hover:border-primary/50 transition-colors duration-300 cursor-pointer'>
                        <img src={assets.profile_icon} className='w-9 h-9 rounded-full object-cover' alt='profile icon' />
                        <ul className='hidden group-hover:block absolute top-10 right-0 bg-gray-900/95 backdrop-blur-xl shadow-xl shadow-black/40 border border-white/10 py-3 w-40 rounded-xl text-sm z-40 text-gray-300 overflow-hidden'>
                            <li onClick={() => navigate("my-profile")} className='px-4 py-2.5 hover:bg-white/10 hover:text-white cursor-pointer transition-colors flex items-center gap-2'>
                                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                                My Profile
                            </li>
                            <li onClick={() => navigate("my-orders")} className='px-4 py-2.5 hover:bg-white/10 hover:text-white cursor-pointer transition-colors flex items-center gap-2'>
                                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                                My Orders
                            </li>
                            <li onClick={logout} className='px-4 py-2.5 hover:bg-white/10 hover:text-red-400 cursor-pointer transition-colors flex items-center gap-2'>
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                                Logout
                            </li>
                        </ul>
                    </div>
                )}
            </div>

            <div className='flex items-center gap-6 sm:hidden'>
                <div onClick={() => navigate("/cart")} className="relative cursor-pointer group">
                    <img src={assets.nav_cart_icon} alt='cart' className='w-6' />
                    <span className="absolute -top-2 -right-2 text-[10px] font-bold text-white bg-primary-dull w-4 h-4 flex items-center justify-center rounded-full shadow-lg">{getCartCount()}</span>
                </div>
                <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                    <img src={assets.menu_icon} alt='menu' className="invert w-6 h-6" />
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className={`${open ? 'flex' : 'hidden'} absolute top-full left-0 w-full bg-gray-900/95 backdrop-blur-xl shadow-2xl border-t border-white/10 py-6 flex-col items-start gap-1 px-6 text-sm md:hidden text-gray-300 animate-in slide-in-from-top-5 duration-300`}>
                    <NavLink to='/home' onClick={() => setOpen(false)} className="hover:text-white hover:bg-white/5 py-3 px-4 rounded-lg w-full transition-all duration-300 flex items-center gap-3">
                        <span className="w-1 h-4 bg-primary rounded-full"></span>
                        Home
                    </NavLink>
                    <NavLink to='/products' onClick={() => setOpen(false)} className="hover:text-white hover:bg-white/5 py-3 px-4 rounded-lg w-full transition-all duration-300 flex items-center gap-3">
                        <span className="w-1 h-4 bg-primary rounded-full"></span>
                        All Products
                    </NavLink>
                    {user && (
                        <NavLink to='/my-orders' onClick={() => setOpen(false)} className="hover:text-white hover:bg-white/5 py-3 px-4 rounded-lg w-full transition-all duration-300 flex items-center gap-3">
                            <span className="w-1 h-4 bg-primary rounded-full"></span>
                            My Orders
                        </NavLink>
                    )}
                    <NavLink to='/' onClick={() => setOpen(false)} className="hover:text-white hover:bg-white/5 py-3 px-4 rounded-lg w-full transition-all duration-300 flex items-center gap-3">
                        <span className="w-1 h-4 bg-primary rounded-full"></span>
                        Contact
                    </NavLink>

                    {!user ? (
                        <button onClick={() => { setOpen(false); setShowUserLogin(true); }} className="group cursor-pointer px-6 py-3 mt-4 bg-gray-900 text-white font-medium rounded-xl shadow-lg shadow-black/20 w-full active:scale-95 transition-all hover:bg-primary">
                            <div className="relative h-6 overflow-hidden">
                                <span className="block transition-transform duration-300 group-hover:-translate-y-full">Login</span>
                                <span className="absolute top-full left-0 w-full block transition-transform duration-300 group-hover:-translate-y-full">Login</span>
                            </div>
                        </button>
                    ) : (
                        <button onClick={logout} className="cursor-pointer px-6 py-3 mt-4 bg-white/10 hover:bg-white/20 border border-white/10 text-white font-medium rounded-xl w-full active:scale-95 transition-all">
                            Logout
                        </button>
                    )}
                </div>
            )}
        </nav>
    )
}

export default Navbar;
