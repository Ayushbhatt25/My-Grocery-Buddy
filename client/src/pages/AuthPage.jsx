import React, { useEffect } from "react";
import { useAppContext } from "../context/AppContext.jsx";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import toast from "react-hot-toast";
import { GoogleLogin } from '@react-oauth/google';
import { assets } from "../assets/assets.js";

function AuthPage() {
    const { setUser, axios, navigate, fetchUser, user } = useAppContext();

    const [state, setState] = React.useState("login");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    useEffect(() => {
        if (user) {
            navigate('/home');
        }
    }, [user, navigate]);

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const { data } = await axios.post(`/api/user/${state}`, { name, email, password });
            if (data.success) {
                await fetchUser();
                navigate('/home');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const googleLoginSuccess = async (credentialResponse) => {
        try {
            const { data } = await axios.post('/api/user/google-login', { token: credentialResponse.credential });
            if (data.success) {
                await fetchUser();
                navigate('/home');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="mb-8 flex flex-col items-center gap-2">
                <img src={assets.logo} alt="My Grocery Buddy Logo" className="h-12" />
                <h1 className="text-3xl font-bold text-white">My Grocery Buddy</h1>
            </div>

            <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md border border-gray-700">
                <p className="text-2xl font-medium text-center mb-6 text-white">
                    <span className="text-primary">User</span>{" "}
                    {state === "login" ? "Login" : "Sign Up"}
                </p>

                <form onSubmit={onSubmitHandler} className="flex flex-col gap-4">
                    {state === "register" && (
                        <div className="relative">
                            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input onChange={(e) => setName(e.target.value)} value={name} placeholder="Enter Name"
                                className="border border-gray-600 bg-gray-700 text-white rounded w-full pl-10 pr-3 py-2 outline-none focus:ring-2 focus:ring-primary placeholder-gray-400"
                                type="text" required />
                        </div>
                    )}

                    <div className="relative">
                        <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Enter Email"
                            className="border border-gray-600 bg-gray-700 text-white rounded w-full pl-10 pr-3 py-2 outline-none focus:ring-2 focus:ring-primary placeholder-gray-400"
                            type="email" required />
                    </div>

                    <div className="relative">
                        <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Enter Password"
                            className="border border-gray-600 bg-gray-700 text-white rounded w-full pl-10 pr-3 py-2 outline-none focus:ring-2 focus:ring-primary placeholder-gray-400"
                            type="password" required />
                    </div>

                    {state === "register" ? (
                        <p className="text-sm text-gray-400"> Already have account?{" "}
                            <span onClick={() => setState("login")} className="text-primary cursor-pointer font-medium hover:underline">
                                Login here </span>
                        </p>
                    ) : (
                        <p className="text-sm text-gray-400"> Create an account?{" "}
                            <span onClick={() => setState("register")} className="text-primary cursor-pointer font-medium hover:underline">
                                Register here </span>
                        </p>
                    )}

                    <button className="bg-white text-gray-900 border-2 border-primary hover:bg-primary hover:text-white transition-all font-bold w-full py-2 rounded-md cursor-pointer mt-2">
                        {state === "register" ? "Create Account" : "Login"}
                    </button>

                    <div className="flex justify-center mt-4">
                        <GoogleLogin
                            onSuccess={googleLoginSuccess}
                            onError={() => {
                                toast.error('Google Login Failed');
                            }}
                        />
                    </div>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-700 text-center">
                    <p className="text-sm text-gray-400 mb-3">Are you a seller?</p>
                    <button
                        onClick={() => navigate('/seller')}
                        className="bg-white text-gray-900 border-2 border-primary hover:bg-primary hover:text-white transition-all font-medium w-full py-2 rounded-md cursor-pointer"
                    >
                        Admin Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AuthPage;
