import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface favouriteInterface {
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
  Favourites: Array<favouriteInterface>;
}

const initialState: CounterState = {
  Favourites: [],
};

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    addToFavourites: (state, action: PayloadAction<favouriteInterface>) => {
      state.Favourites.push(action.payload);
    },
    deleteFromFavourites: (state, action) => {
      const filteredData = state.Favourites.filter((item) => {
        if (item.id != action.payload) {
          return item;
        }
      });

      state.Favourites = filteredData;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToFavourites, deleteFromFavourites } = shopSlice.actions;

export default shopSlice.reducer;
