import { useEffect, useState } from "react";
import { useAppContext } from '../context/AppContext.jsx';
import { assets, dummyAddress } from "../assets/assets.js";
import toast from "react-hot-toast";

const Cart = () => {
    const { products, currency, cartItems, setCartItems, removeFromCart, getCartCount, updateCartItem,
        navigate, getCartAmount, axios, user } = useAppContext();

    const [cartArray, setCartArray] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [showAddress, setShowAddress] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [paymentOption, setPaymentOption] = useState("COD");

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: "My Grocery Buddy",
            description: "Order Payment",
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                try {
                    const { data } = await axios.post('/api/order/verifyRazorpay', {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        orderId: order.receipt.split('_')[1] ? null : order.id,
                        userId: user._id
                    });
                    if (data.success) {
                        toast.success(data.message);
                        setCartItems({});
                        navigate('/my-orders');
                    } else {
                        toast.error(data.message);
                    }
                } catch (error) {
                    console.log(error);
                    toast.error(error.message);
                }
            }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    }

    const placeOrder = async () => {
        try {
            if (!selectedAddress) {
                return toast.error("Please select an address");
            }
            // Place order with COD
            if (paymentOption === 'COD') {
                const { data } = await axios.post('/api/order/cod', {
                    userId: user._id,
                    items: cartArray.map(item => ({ product: item._id, quantity: item.quantity })),
                    address: selectedAddress._id
                });
                if (data.success) {
                    toast.success(data.message);
                    setCartItems({});
                    navigate('/my-orders');
                } else {
                    toast.error(data.message);
                }
            }
            // Place order with Razorpay
            else if (paymentOption === 'Razorpay') {
                const { data } = await axios.post('/api/order/razorpay', {
                    userId: user._id,
                    items: cartArray.map(item => ({ product: item._id, quantity: item.quantity })),
                    address: selectedAddress._id
                });
                if (data.success) {
                    initPay(data.order);
                } else {
                    toast.error(data.message);
                }
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const getCart = () => {
        let tempArray = [];
        for (const key in cartItems) {
            const product = products.find((item) => item._id === key);
            if (product) {
                product.quantity = cartItems[key];
                tempArray.push(product);
            }
        }
        setCartArray(tempArray);
    }

    const getUserAddress = async () => {
        try {
            const { data } = await axios.get('/api/address/get');
            if (data.success) {
                setAddresses(data.addresses);
                if (data.addresses.length > 0) {
                    setSelectedAddress(data.addresses[0]);
                }
                else {
                    toast.error(data.message);
                }
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if (products.length > 0 && cartItems) {
            getCart();
        }
    }, [products, cartItems]);

    useEffect(() => {
        if (user) {
            getUserAddress();
        }
    }, [user]);

    return products.length > 0 && cartItems ? (
        <div className="flex flex-col md:flex-row mt-12">
            <div className='flex-1 max-w-4xl'>
                <h1 className="text-3xl font-medium mb-6">
                    Shopping Cart <span className="text-sm text-primary-dull">{getCartCount()} Items</span>
                </h1>

                <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-300 text-base font-medium pb-3">
                    <p className="text-left">Product Details</p>
                    <p className="text-center">Subtotal</p>
                    <p className="text-center">Action</p>
                </div>

                {cartArray.map((product, index) => (
                    <div key={index} className="grid grid-cols-[2fr_1fr_1fr] text-gray-300 items-center text-sm md:text-base font-medium pt-3">
                        <div className="flex items-center md:gap-6 gap-3">
                            <div onClick={() => { navigate(`/products/${product.category.toLowerCase()}/${product._id}`); scrollTo(0, 0) }}
                                className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden">
                                <img className="max-w-full h-full object-cover" src={product.images[0]} alt={product.name} />
                            </div>
                            <div>
                                <p className="hidden md:block font-semibold">{product.name}</p>
                                <div className="font-normal text-gray-400">
                                    <p>Weight: <span>{product.weight || "N/A"}</span></p>
                                    <div className='flex items-center'>
                                        <p>Qty:</p>
                                        <select onChange={e => updateCartItem(product._id, Number(e.target.value))}
                                            value={cartItems[product._id]} className='outline-none'>
                                            {Array(cartItems[product._id] > 9 ? cartItems[product._id] : 9).fill('').map((_, index) => (
                                                <option key={index} value={index + 1}>{index + 1}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-center">{currency}{product.offerPrice * product.quantity}</p>
                        <button onClick={() => removeFromCart(product._id)} className="cursor-pointer mx-auto">
                            <img src={assets.remove_icon} alt="remove icon" className="inline-block w-6 h-6" />
                        </button>
                    </div>)
                )}

                <button onClick={() => { navigate("/products"); scrollTo(0, 0); }} className="btn-white-pink-shadow group flex items-center gap-2 mt-8 px-6 py-3 rounded-md">
                    <img src={assets.arrow_right_icon_colored} className="w-4 h-4 group-hover:-translate-x-1 transition" alt="arrow icon" />
                    Continue Shopping
                </button>

            </div>

            <div className="max-w-[360px] w-full bg-gray-800 p-5 max-md:mt-16 border border-gray-700 rounded-md">
                <h2 className="text-xl md:text-xl font-medium text-white">Order Summary</h2>
                <hr className="border-gray-700 my-5" />

                <div className="mb-6">
                    <p className="text-sm font-medium uppercase text-gray-300">Delivery Address</p>
                    <div className="relative flex justify-between items-start mt-2">
                        <p className="text-gray-300"> {selectedAddress ? `${selectedAddress.street}, 
                            ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
                            : "No address found"}
                        </p>
                        <button onClick={() => setShowAddress(!showAddress)} className="text-primary hover:underline cursor-pointer">
                            Change
                        </button>
                        {showAddress && (
                            <div className="absolute top-12 py-1 bg-gray-700 border border-gray-600 text-sm w-full rounded shadow-lg z-10">
                                {addresses.map((address, index) => (
                                    <p onClick={() => { setSelectedAddress(address); setShowAddress(false) }}
                                        className="text-gray-300 p-2 hover:bg-gray-600 cursor-pointer">
                                        {address.street}, {address.city}, {address.state}, {address.country}.
                                    </p>))}
                                <p onClick={() => navigate("/add-address")} className="text-primary text-center cursor-pointer p-2 hover:bg-gray-600">
                                    Add address
                                </p>
                            </div>
                        )}
                    </div>

                    <p className="text-sm font-medium uppercase mt-6 text-gray-300">Payment Method</p>

                    <select onChange={e => setPaymentOption(e.target.value)} className="w-full border border-gray-600 bg-gray-700 text-white px-3 py-2 mt-2 outline-none rounded">
                        <option value="COD">Cash On Delivery</option>
                        <option value="Razorpay">Razorpay</option>
                    </select>
                </div>

                <hr className="border-gray-700" />

                <div className="text-gray-300 mt-4 space-y-2">
                    <p className="flex justify-between">
                        <span>Price</span><span>{currency}{getCartAmount()}</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Shipping Fee</span><span className="text-green-500">Free</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Tax (2%)</span><span>{currency}{getCartAmount() * 2 / 100}</span>
                    </p>
                    <p className="flex justify-between text-lg font-medium mt-3 text-white">
                        <span>Total Amount:</span>
                        <span>{currency}{getCartAmount() + getCartAmount() * 2 / 100}</span>
                    </p>
                </div>

                <button onClick={placeOrder} className="w-full py-3 mt-6 cursor-pointer bg-primary text-white font-medium hover:bg-primary-dull transition rounded shadow-lg shadow-primary/30">
                    {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
                </button>
            </div>
        </div>
    ) : null;
}

export default Cart;