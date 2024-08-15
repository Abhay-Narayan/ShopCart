import CartProduct from "../components/CartProduct";
import { ShopContext } from "../context/ShopContext";
import { useContext, useState } from "react";
import toast from "react-hot-toast";

const Cart = () => {
  const [discount, setDiscount] = useState(false);
  const { cartItems, subtotal, totalPrice } =
    useContext(ShopContext);
  const [dcode, setDcode] = useState("");


  const handledis = () => {
    if (
      dcode === "WELCOME10" ||
      dcode === "WELCOME10 " ||
      dcode === " WELCOME10"
    ) {
      setDiscount(!discount);
    } else {
      setDiscount(false);
      toast.error("Invalild Discount coupon");
      setDcode("");
    }
  };

  const handledcode = (e) => {
    setDcode(e.target.value);
  };
  return (
    <div className="w-full lg:w-[90%] mx-auto flex-col flex lg:flex-row items-center lg:items-start lg:justify-between justify-center min-h-screen lg:gap-2 ">
      <div className="w-full flex flex-col gap-3 p-2">
        <h1 className="font-bold text-4xl mt-5">Shopping Cart</h1>
        {cartItems.length > 0 ? (
          cartItems.map((item) => {
            return <CartProduct product={item} key={item.id} />;
          })
        ) : (
          <>
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-xl font-semibold">
                Your cart is empty, Please go to the shop to add more items
              </h1>
              <h2 className="font-medium">Happy Shopping :) </h2>
            </div>
          </>
        )}
      </div>
      {cartItems.length > 0 && (
        
          <div className="w-full flex lg:w-[40%] h-[330px] lg:mt-24 lg:mr-3 rounded-lg bg-gray-200 flex-col gap-6 p-4 border ">
            <div className="heading">
              <h1 className="font-semibold">Order Summary</h1>
            </div>
            <div className="prices flex flex-col gap-5">
              <div className="item1 p-1 flex w-full justify-between border-b border-gray-400">
                <h1>Subtotal</h1>
                <h1>₹{subtotal}</h1>
              </div>
              <div className="item1 p-1 mt-1 flex w-full justify-between border-b border-gray-400">
                <h1>Shipping Charges</h1>
                <h1>₹0</h1>
              </div>
              <div className="item1 p-1 items-center flex w-full gap-5 border-b border-gray-400 justify-between">
                <h1>Discount:</h1>
                <div className="flex rounded-md items-center border-black border">
                  <textarea onChange={handledcode} className="resize rounded-md rounded-r-none h-[32px] border-black p-1 " placeholder="WELCOME10" rows={1} />
                  <button onClick={handledis} className="bg-deep-purple-500 hover:bg-deep-purple-600 text-white p-1 rounded-md rounded-l-none" >{discount?'Remove':'Apply'}</button>
                </div>
                <h1>{discount?'10%':'0'}</h1>
              </div>
            </div>
            <div className="order-total flex flex-col gap-2">
              <div className="item1 flex w-full justify-between ">
                <h1 className="font-semibold">Order Total</h1>
                <h1 className="font-medium">₹{discount?totalPrice:subtotal}</h1>
              </div>
              <button className="p-2 w-full text-white font-medium rounded-md bg-deep-purple-500 hover:bg-deep-purple-600">Checkout</button>
            </div>
          </div>
      )}
    </div>
  );
};

export default Cart;
