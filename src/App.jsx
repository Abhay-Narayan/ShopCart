import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/navbar"
import Cart from "./pages/Cart"
import Shop from "./pages/Shop"
import ShopContextProvider from "./context/ShopContext"

function App() {

  return (
    <div className="font-mos">
      <ShopContextProvider>
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path='/' element={<Shop/>} />
          <Route exact path='/cart' element={<Cart/>} />
        </Routes>
      </Router>
      </ShopContextProvider>
    </div>
  )
}

export default App
