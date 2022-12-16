import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Redux-toolkit/store";
import Image from "next/image";
import { deleteFromFavourites } from "../../Redux-toolkit/features/shopSlice";
import {
  TrashIcon,
  HeartIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";
import Navbar from "../../components/Navbar";

const Index = () => {
  const favouritesItems = useSelector(
    (state: RootState) => state.shop.Favourites
  );
  const dispatch = useDispatch();

  return (
    <div className="max-w-7xl mx-auto  ">
      <Navbar Text="Continue Shopping" />
      {favouritesItems.length > 0 ? (
        <div className="mt-10 lg:mt-0  ">
          <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
            <ul role="list" className="divide-y divide-gray-200">
              {favouritesItems &&
                favouritesItems.map((product, index) => (
                  <div key={index}>
                    <div className="flex py-6 px-4 sm:px-6">
                      <div className="flex-shrink-0">
                        <Image
                          src={product.imageSrc}
                          height={200}
                          width={200}
                          alt={product.imageAlt}
                        />
                      </div>

                      <div className="ml-6 flex flex-1 flex-col">
                        <div className="flex">
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm">{product.name}</h4>
                            <p className="mt-1 text-sm text-gray-500">
                              {product.color}
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                              {product.size}
                            </p>
                          </div>

                          <div
                            className="ml-4 flow-root flex-shrink-0"
                            onClick={() => {
                              dispatch(deleteFromFavourites(product.id));
                            }}
                          >
                            <button
                              type="button"
                              className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                            >
                              <span className="sr-only">Remove</span>
                              <TrashIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>

                        <div className="flex flex-1 items-end justify-between pt-2">
                          <p className="mt-1 text-sm font-medium text-gray-900">
                            $ {product.quantityPrice}
                          </p>

                          <div className="ml-4">
                            <label htmlFor="quantity" className="sr-only">
                              Quantity
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="h-screen max-w-7xl mx-auto   flex justify-center items-center bg-gray-50 rounded-md  shrink my-3">
          {" "}
          <h2 className="text-2xl font-mono font-semibold text-gray-800 ">
            {" "}
            No Items in Favourites.{" "}
          </h2>{" "}
        </div>
      )}
    </div>
  );
};

export default Index;
