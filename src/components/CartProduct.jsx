import { ShopContext } from "../context/ShopContext"
import { useContext } from "react"
import PropTypes from "prop-types";

const CartProduct = ({product}) => {
  const {addToCart, removeFromCart }= useContext(ShopContext);
  const handleAdd=()=>{
    addToCart(product.id);
  }
  const handleminus=()=>{
    removeFromCart(product.id)
  }
  // const amount=cartItems.find((item)=>item.id===product.id);
  const amount= product.quantity
  return (
    <div className='flex items-center p-2 gap-4 w-full h-[170px] justify-between border-t mt-3'>
        <img src={product.imglink} className="h-[140px] w-[140px] rounded-md"></img>
        <div className='flex h-full items-center justify-between w-[80%]'>
            <div className='flex flex-col h-full justify-start gap-3 mt-3'>
                <h1 className='font-medium'>{product.name}</h1>
                <h2 className='font-medium'>₹{product.price}</h2>
            </div>
            <div className='flex items-center gap-3'>
                <button onClick={handleminus} className='p-1 bg-gray-300 hover:bg-gray-400 font-semibold text-lg rounded-md w-[40px]'>
                  -
                </button>
                <span className='font-semibold'>{amount}</span>
                <button onClick={handleAdd} className='p-1 bg-gray-300 hover:bg-gray-400 font-semibold text-lg rounded-md w-[40px]'>
                    +
                </button>
                
            </div>
        </div>
    </div>
  )
}

CartProduct.propTypes = {
    product: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      imglink: PropTypes.string.isRequired,
      quantity:PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }).isRequired,
  };

export default CartProduct