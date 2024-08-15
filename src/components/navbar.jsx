import { Link } from "react-router-dom"
import { FaShoppingCart } from "react-icons/fa";
import { ShopContext } from "../context/ShopContext"
import { useContext } from "react"

const Navbar = () => {
  const {totalItems} = useContext(ShopContext);

  return (
    <div className="w-full shadow-md bg-gray-300 h-12 flex items-center justify-around p-2 font-semibold text-lg">
        SHOPMASTER
        <div className="links flex gap-3 items-center">
            <Link to='/' className="p-1  rounded-md hover:bg-gray-400 hover:text-black"> Shop</Link>
            <Link to='/cart' className="p-2  rounded-md hover:bg-gray-400 hover:text-black flex"><FaShoppingCart />
            <span className="rounded-full bg-red-600 text-white text-sm w-5 h-5 text-center">{totalItems<9?totalItems:('9+')}</span>
            </Link>
        </div>
    </div>
  )
}

export default Navbar