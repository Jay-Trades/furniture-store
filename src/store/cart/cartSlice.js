import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0, //total price no tax
  shipping: 500,
  tax: 0, //tax cost
  orderTotal: 0, //total order cost + tax
};

const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("cart")) || defaultState;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getCartFromLocalStorage(),
  reducers: {
    addItem(state, action) {
      //   console.log(state.cartItems);
      const newItem = action.payload;
      //   console.log(newItem);
      //find if there is an existing item
      const existingItem = state.cartItems.find(
        (item) => item.cartId === newItem.cartId
      );

      if (!existingItem) {
        state.cartItems = [...state.cartItems, newItem];
      } else {
        existingItem.quantity += newItem.quantity;
      }

      state.numItemsInCart += newItem.quantity; //add into total quantity
      state.cartTotal += newItem.quantity * newItem.price;
      console.log(state.cartTotal);
      cartSlice.caseReducers.calculateTotals(state);
      //calling a reducer within a reducer we will do this to reduce repeated code

      localStorage.setItem("cart", JSON.stringify(state));
      toast.success("Item added to cart");

      //   console.log(state.cartItems);
      //   console.log(
      //     "Cart State (Debug):",
      //     JSON.parse(JSON.stringify(state.cartItems))
      //   );
    },
    removeItem(state, action) {
      const { cartId } = action.payload;
      const product = state.cartItems.find((i) => i.cartId === cartId);
      state.cartItems = state.cartItems.filter((i) => i.cartId !== cartId);

      state.numItemsInCart -= product.quantity;
      state.cartTotal -= product.price * product.quantity;
      cartSlice.caseReducers.calculateTotals(state);
      toast.error("Item removed from cart");

      //   const { cartId } = action.payload;
      //   const existingItem = state.cartItems.find(
      //     (item) => item.cartId === cartId
      //   );
      //   state.cartItems = state.cartItems.filter(
      //     (item) => item.cartId !== cartId
      //   );

      //   state.numItemsInCart -= existingItem.quantity; //add into total quantity
      //   state.cartTotal -= existingItem.price * existingItem.quantity;
      //   localStorage.setItem("cart", JSON.stringify(state));
      //   toast.error("Item removed to cart");
    },
    clearCart(state) {
      state.cartItems = [];
      state.numItemsInCart = 0;
      state.cartTotal = 0;
      state.tax = 0;
      state.orderTotal = 0;
      localStorage.removeItem("cart");
    },
    editItem(state, action) {
      const editItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.cartId === editItem.cartId
      );

      state.numItemsInCart += editItem.quantity - existingItem.quantity;
      state.cartTotal +=
        existingItem.price * (editItem.quantity - existingItem.quantity);
      existingItem.quantity = editItem.quantity;
      cartSlice.caseReducers.calculateTotals(state);
      toast.success("Succesfuly updated cart");
    },

    //put repeated code into a seperate reducer function (basically DRY don't repeate yourself)
    calculateTotals: (state) => {
      //   console.log("in calculate totals");
      //   console.log(state.cartTotal);
      state.tax = 0.1 * state.cartTotal;
      state.orderTotal = state.cartTotal + state.shipping + state.tax;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addItem, removeItem, editItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
