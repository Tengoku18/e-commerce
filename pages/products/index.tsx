/* eslint-disable @next/next/no-img-element */

import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import person from "../../public/person.jpg";
import { useSelector, useDispatch } from "react-redux";
import { Products } from "../../components/Products";
import { RootState } from "../../Redux-toolkit/store";
import { addToCart } from "../../Redux-toolkit/features/checkoutSlice";
import { useRouter } from "next/router";
import { addToFavourites } from "../../Redux-toolkit/features/shopSlice";
import Navbar from "../../components/Navbar";

export default function Example() {
  const ProductsNumber = useSelector(
    (state: RootState) => state.checkout.cartItems
  );
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div className="bg-white">
      <Navbar Text="Products" />
      <div className="mx-auto max-w-2xl  px-4 py-8 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {Products.map((product) => (
            <div key={product.id} className={` relative  `}>
              <div
                className={`flex flex-col justify-between py-4 h-4/5 absolute z-10  w-full   opacity-0 hover:opacity-100 `}
              >
                <div
                  className="self-end mx-3 bg-gray-300 h-8 w-8 rounded-full flex justify-center items-center hover:cursor-pointer hover:bg-gray-400"
                  onClick={() => {
                    dispatch(addToFavourites(product));
                  }}
                >
                  {" "}
                  <HeartIcon className="h-6 w-6 text-white" />{" "}
                </div>
                <div
                  className="flex justify-center bg-slate-400 py-2 hover:cursor-pointer hover:bg-slate-500 "
                  onClick={() => {
                    console.log("surprise ");
                    dispatch(addToCart(product));
                  }}
                >
                  <div className="bg-gray-300 h-8 w-8 rounded-full flex justify-center items-center  ">
                    <ShoppingCartIcon className="h-6 w-6 text-white " />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-100 ml-1">
                    Add to cart
                  </h3>
                </div>
              </div>

              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                <Image
                  src={product.imageSrc}
                  height={300}
                  width={300}
                  alt={product.imageAlt}
                />
              </div>
              <div className="flex justify-center items-center flex-col">
                <h3 className=" mt-4 text-md font-semibold text-gray-700">
                  {" "}
                  {product.name}{" "}
                </h3>
                <h3 className=" text-sm text-gray-700">{product.size}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  ${product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
