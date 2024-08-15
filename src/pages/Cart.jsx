import CartProduct from "../components/CartProduct";
import { ShopContext } from "../context/ShopContext";
import { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";


const Cart = () => {
  const [discount, setDiscount] = useState(false);
  const { cartItems, subtotal, totalPrice } = useContext(ShopContext);
  const [dcode, setDcode] = useState("");
  const navigate=useNavigate();

  const handledis = () => {
    if (dcode.trim() === "WELCOME10") {
      toast.success("Coupon successfully applied");
      setDiscount(!discount);
    } else {
      setDiscount(false);
      setDcode("");
      toast.error("Invalid Discount coupon");
    }
  };

  const handledcode = (e) => {
    setDcode(e.target.value);
  };

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row lg:justify-between">
      <Toaster />
      {cartItems.length > 0 ? (
        <div className="w-full lg:w-[90%] mx-auto flex flex-col lg:flex-row lg:items-start lg:justify-between min-h-screen lg:gap-4">
          <div className="w-full lg:w-[60%] flex flex-col gap-3 p-2">
            <h1 className="font-bold text-4xl mt-5">Shopping Cart</h1>
            {cartItems.map((item) => (
              <CartProduct product={item} key={item.id} />
            ))}
          </div>
          <div className="w-full lg:w-[40%] h-[340px] lg:mt-24 lg:mr-3 rounded-lg bg-gray-200 flex flex-col gap-6 p-4 border">
            <div className="heading">
              <h1 className="font-semibold">Order Summary</h1>
            </div>
            <div className="prices flex flex-col gap-5">
              <div className="item1 p-1 flex w-full justify-between border-b border-gray-400">
                <h1>Subtotal</h1>
                <h1>₹{subtotal}</h1>
              </div>
              <div className="item1 p-1 mt-1 flex w-full justify-between border-b border-gray-400">
                <h1>Shipping</h1>
                <h1>FREE</h1>
              </div>
              <div className="item1 p-1 items-center flex w-full gap-5 border-b border-gray-400 justify-between">
                <h1>Discount:</h1>
                <div className="flex rounded-md items-center border-black border w-[66%]">
                  <input
                    type="text"
                    onChange={handledcode}
                    className="resize w-full rounded-md rounded-r-none h-[32px] border-black p-1"
                    placeholder="WELCOME10"
                  />
                  <button
                    onClick={handledis}
                    className="bg-deep-purple-500 hover:bg-deep-purple-600 text-white p-1 rounded-md rounded-l-none"
                  >
                    {discount ? "Remove" : "Apply"}
                  </button>
                </div>
                <h1>{discount ? "10%" : "0%"}</h1>
              </div>
            </div>
            <div className="order-total flex flex-col gap-2">
              <div className="item1 flex w-full justify-between">
                <h1 className="font-semibold">Order Total</h1>
                <h1 className="font-medium">₹{discount ? totalPrice : subtotal}</h1>
              </div>
              <button className="p-2 w-full text-white font-medium rounded-md bg-deep-purple-500 hover:bg-deep-purple-600">
                Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2 text-center">
            Your cart is empty
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl font-medium mb-4 text-center">
            Please go to the shop to add more items.
          </p>
          <p className="text-base md:text-lg text-gray-500 text-center">
            Happy Shopping! 😊
          </p>
          <button onClick={()=>navigate('/')} className="p-2 mt-3 rounded-md bg-deep-purple-500 hover:bg-deep-purple-600 font-medium text-white gap-3 flex items-center" >Shop<FaArrowLeftLong/></button>
        </div>
      )}
    </div>
  );
};

export default Cart;
