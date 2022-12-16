import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";

interface cartInterface {
  id: number;
  size: string;
  color: string;
  name: string;
  price: number;
  quantityPrice: number;
  imageSrc: string;
  imageAlt: string;
  quantity: number;
}

export interface CounterState {
  cartItems: Array<cartInterface>;
  subTotal: number;
}

const initialState: CounterState = {
  cartItems: [],
  subTotal: 0,
};

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<cartInterface>) => {
      state.cartItems.push(action.payload);
      console.log(state.cartItems);
    },
    increment: (state, action) => {
      const { id, price } = action.payload;
      const selectedProduct = state.cartItems.map((currentElem) => {
        if (currentElem.id === id) {
          currentElem.quantity = currentElem.quantity + 1;
          currentElem.quantityPrice = currentElem.quantity * price;
        } else {
          return currentElem;
        }
      });
    },
    decrement: (state, action) => {
      const selectedProduct = state.cartItems.map((currentElem) => {
        const { id, price } = action.payload;
        if (currentElem.id === id) {
          currentElem.quantity = currentElem.quantity - 1;

          currentElem.quantityPrice = currentElem.quantity * price;
        } else {
          return currentElem;
        }
      });
    },
    deleteProduct: (state, action) => {
      const filteredData = state.cartItems.filter((item) => {
        if (item.id != action.payload) {
          return item;
        }
      });
      state.cartItems = filteredData;
    },

    calculateTotal: (state) => {
      let { subTotal } = state.cartItems.reduce(
        (accum, curVal) => {
          let { quantityPrice } = curVal;
          accum.subTotal += quantityPrice;

          return accum;
        },
        { subTotal: 0 }
      );

      return { ...state, subTotal };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addToCart,
  increment,
  decrement,
  calculateTotal,
  deleteProduct,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
