import { Fragment, useState, useContext, useEffect } from "react";
import {
  Dialog,
  Popover,
  RadioGroup,
  Tab,
  Transition,
} from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  CheckCircleIcon,
  ChevronDownIcon,
  TrashIcon,
  ArrowLeftIcon,
  ShoppingCartIcon,
} from "@heroicons/react/20/solid";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Redux-toolkit/store";
import index, { ModalValue } from ".";
import {
  increment,
  decrement,
  calculateTotal,
  deleteProduct,
} from "../../Redux-toolkit/features/checkoutSlice";
import { useRouter } from "next/router";
import Image from "next/image";
import Navbar from "../../components/Navbar";

export default function CheckOut() {
  const { setModal } = useContext(ModalValue);

  const [total, setTotal] = useState(0);
  const cartItems = useSelector((state: RootState) => state.checkout.cartItems);
  const SubTotal = useSelector((state: RootState) => state.checkout.subTotal);
  const dispatch = useDispatch();
  const noOfItems = cartItems ? cartItems.length : 0;
  const router = useRouter();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    dispatch(calculateTotal());
    const total = SubTotal + (SubTotal * 13) / 100;
    setTotal(total);
  });

  return (
    <div className="bg-gray-50">
      <Navbar Text="Continue Shopping" />
      <main className="mx-auto max-w-7xl px-4 pt-10 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <h1 className="sr-only">Checkout</h1>

          <div className="">
            {/* Order summary */}
            <div className="mt-10 lg:mt-0">
              <h2 className="text-lg font-medium text-gray-900">
                Order summary
              </h2>
              <h3> {noOfItems} item in cart </h3>

              <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
                <h3 className="sr-only">Items in your cart</h3>

                <ul role="list" className="divide-y divide-gray-200">
                  {cartItems &&
                    cartItems.map((product, index) => (
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
                                  dispatch(deleteProduct(product.id));
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
                                <div className="counter flex">
                                  <button
                                    className=" border border-gray-600 text-gray-700 px-1 text-xl font-bold "
                                    onClick={() => {
                                      const data = {
                                        id: product.id,
                                        price: product.price,
                                      };

                                      dispatch(increment(data));
                                    }}
                                  >
                                    +
                                  </button>
                                  <input
                                    readOnly
                                    className="w-5 mx-1 pl-1"
                                    value={product.quantity}
                                  ></input>
                                  <button
                                    className=" border border-gray-600 px-1 text-xl text-gray-700 font-bold "
                                    onClick={() => {
                                      const data = {
                                        id: product.id,
                                        price: product.price,
                                      };

                                      if (product.quantity === 1) {
                                        dispatch(deleteProduct(product.id));
                                      }
                                      dispatch(decrement(data));
                                    }}
                                  >
                                    -
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </ul>
                <dl className="space-y-6 border-t border-gray-200 py-6 px-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm">Subtotal</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {SubTotal}
                    </dd>
                  </div>

                  <div className="flex items-center justify-between">
                    <dt className="text-sm">Taxes</dt>
                    <dd className="text-sm font-medium text-gray-900"> 13%</dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                    <dt className="text-base font-medium">Total</dt>
                    <dd className="text-base font-medium text-gray-900">
                      {" "}
                      ${total}{" "}
                    </dd>
                  </div>
                </dl>

                <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                  <button
                    type="submit"
                    onClick={() => {
                      setModal(true);
                    }}
                    className="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  >
                    Confirm order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
