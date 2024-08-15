import Product from "../components/Product"
import {PRODUCTS} from '../assets/products'
import { Carousel, Typography, } from "@material-tailwind/react";
import carouselimg from '../assets/images/c2.png'
import carouselimg1 from '../assets/images/c3.png'
import { Toaster } from 'react-hot-toast';
const Shop = () => {
  return (
    <div className="w-full flex flex-col items-center  mb-5">
      <Toaster/>
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
        <Carousel>
          <div className="relative h-full w-full">
            <img
              src={carouselimg}
              alt="image 2"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 grid h-full w-full items-top justify-end bg-black/25">
              <Typography
                variant="h1"
                color="white"
                className="text-3xl"
              >
                SUMMER SALE!!
              </Typography>
            </div>
          </div>
          <img
            src={carouselimg1}
            alt="image 3"
            className="h-full w-full object-cover"
          />
        </Carousel>
      </div>
        <div className="shoptitle text-3xl font-bold">
            Our Best Products...
        </div>
        <div className="products w-[90%] flex flex-col items-center justify-center lg:grid lg:grid-cols-4 gap-10 mt-5 md:grid md:grid-cols-2 md:gap-y-10 md:gap-x-0 md:justify-items-center">
            {PRODUCTS.map((pro)=>(
                <Product product={pro} key={pro.id}/>
            ))}
        </div>
    </div>
  )
}

export default Shop