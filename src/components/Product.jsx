import { useContext } from "react"
import { ShopContext } from "../context/ShopContext"
import PropTypes from "prop-types";
import toast from 'react-hot-toast';

const Product = ({product}) => {
  const {addToCart, cartItems}= useContext(ShopContext);
  const handleAdd=()=>{
    addToCart(product.id);
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <img
                className="h-10 w-10 rounded-full"
                src={product.imglink}
                alt=""
              />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">
                {product.name}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Item added to cart
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.remove(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Close
          </button>
        </div>
      </div>
    ),
    {duration: 1000}
  )
  }
  const amount=cartItems.find((item)=>item.id===product.id);
  return (
    <div className="border rounded-md w-[250px] h-[320px] flex flex-col items-start hover:scale-105 transition-all duration-500 gap-2 ">
      
      <img src={product.imglink} className=" w-[250px] h-[240px] rounded-t-md" ></img>
      <div className="flex w-full justify-between">
        <div className="title ">{product.name}</div>
        <span className="font-medium">₹{product.price}</span>
      </div>
      <div className="desc mt-1 flex items-center justify-center gap-3 font-medium w-full">
        <button onClick={handleAdd} className=" p-2 bg-gray-300 w-full font-medium text-sm hover:bg-gray-400 rounded-b-md">Add to Cart {amount && amount.quantity > 0 && <>({amount.quantity})</>}</button>
      </div>
    </div>
  )
}
 
Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    imglink: PropTypes.string.isRequired,
  }).isRequired,
};

export default Product