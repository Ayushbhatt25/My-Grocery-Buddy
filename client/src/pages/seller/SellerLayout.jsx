import React from 'react'
import { useAppContext } from '../../context/AppContext.jsx'
import { assets } from '../../assets/assets.js';
import { Link, NavLink, Outlet } from 'react-router-dom';
import toast from 'react-hot-toast';

function SellerLayout() {
    const { setIsSeller, navigate, axios } = useAppContext();

    const sidebarLinks = [
        { name: "Add Product", path: "/seller", icon: assets.add_icon },
        { name: "Product List", path: "/seller/product-list", icon: assets.product_list_icon },
        { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
    ];

    const logout = async () => {
        try {
            const { data } = await axios.get('/api/seller/logout');
            if (data.success) {
                toast.success(data.message);
                setIsSeller(false);
                navigate('/');
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <>
            <div className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-white/10 bg-primary/90 backdrop-blur-xl relative z-50 shadow-lg shadow-black/20">
                <Link to='/' className="flex items-center gap-2 group">
                    <img className="cursor-pointer h-9 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" src={assets.logo} alt="Logo" />
                    <span className="font-bold text-2xl text-black transition-all duration-300 whitespace-nowrap">My Grocery Buddy</span>
                </Link>
                <div className="flex items-center gap-5 text-black font-medium">
                    <p>Hi! Admin</p>
                    <button onClick={logout} className='border border-black text-black hover:bg-black hover:text-white transition-all rounded-full text-sm px-4 py-1 cursor-pointer'>Logout</button>
                </div>
            </div>
            <div className='flex'>
                <div className="md:w-64 w-16 border-r h-[95vh] text-base border-gray-700 bg-gray-900 pt-4 flex flex-col text-gray-300">
                    {sidebarLinks.map((item) => (
                        <NavLink to={item.path} key={item.name} end={item.path === "/seller"}
                            className={({ isActive }) => `flex items-center py-3 px-4 gap-3 
                            ${isActive ? "border-r-4 md:border-r-[6px] bg-primary/10 border-primary text-primary"
                                    : "hover:bg-gray-800 border-gray-900"}`}>
                            <img src={item.icon} alt='icon' className='w-7 h-7' />
                            <p className="md:block hidden text-center">{item.name}</p>
                        </NavLink>
                    ))}
                </div>
                <Outlet />
            </div>
        </>
    )
}

export default SellerLayout
