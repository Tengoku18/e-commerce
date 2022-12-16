import {
  ShoppingCartIcon,
  HeartIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "../Redux-toolkit/store";

const Navbar: React.FC<{ Text: string }> = ({ Text }) => {
  const ProductsNumber = useSelector(
    (state: RootState) => state.checkout.cartItems
  );
  const FavouriteItemNumber = useSelector(
    (state: RootState) => state.shop.Favourites
  );
  const router = useRouter();

  return (
    <div className="mx-auto max-w-7xl flex justify-between w-full px-4 pt-10 sm:px-6 lg:px-8">
      <div
        className="flex  hover:cursor-pointer  "
        onClick={() => {
          router.push("/products");
        }}
      >
        <ArrowLeftIcon className="h-8 w-8" />
        <h2 className="text-xl ml-3 font-semibold text-gray-500 "> {Text}</h2>
      </div>

      <div className=" flex justify-between  ">
        {" "}
        <div
          onClick={() => {
            router.push("/favourites");
          }}
        >
          <HeartIcon className="h-6 w-6 absolute text-gray-700 mr-4  hover:text-gray-800 hover:cursor-pointer" />
          {FavouriteItemNumber.length > 0 ? (
            <h3 className="relative bg-red-600 h-5 w-5 -right-5 -top-2 rounded-full text-sm text-white text-center ">
              {" "}
              {FavouriteItemNumber.length}
            </h3>
          ) : null}{" "}
        </div>
        <div
          className="ml-7"
          onClick={() => {
            router.push("/checkout");
          }}
        >
          <ShoppingCartIcon className="h-6 w-6 absolute text-gray-700 hover:text-gray-800 hover:cursor-pointer" />
          {ProductsNumber.length > 0 ? (
            <h3 className="relative bg-red-600 h-5 w-5 -right-5 -top-2 rounded-full text-sm text-white text-center ">
              {" "}
              {ProductsNumber.length}
            </h3>
          ) : null}
        </div>{" "}
      </div>
    </div>
  );
};

export default Navbar;
