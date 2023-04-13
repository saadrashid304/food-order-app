import React, { useReducer } from "react";
import CartContext from "./cart-context";

const initialCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM_TO_CART":
      const updatedTotalAmount =
        state.totalAmount + action.payload.price * action.payload.amount;
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      const existingItem = state.items[existingItemIndex];
      let updatedItems;
      if (existingItem) {
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount + action.payload.amount,
        };
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.payload);
      }
      return { items: updatedItems, totalAmount: updatedTotalAmount };

    case "REMOVE_ITEM_FROM_CART":
      const existingRemoveItemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );
      const existingRemoveItem = state.items[existingRemoveItemIndex];
      const updatedTotalAmountRemove =
        state.totalAmount - existingRemoveItem.price;
      let updatedRemoveItems;
      if (existingRemoveItem.amount > 1) {
        const updatedItem = {
          ...existingRemoveItem,
          amount: existingRemoveItem.amount - 1,
        };
        updatedRemoveItems = [...state.items];
        updatedRemoveItems[existingRemoveItemIndex] = updatedItem;
      } else {
        updatedRemoveItems = [...state.items];
        updatedRemoveItems.splice(existingRemoveItemIndex, 1);
      }
      return {
        items: updatedRemoveItems,
        totalAmount: updatedTotalAmountRemove,
      };
    default:
      return initialCartState;
  }
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    initialCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD_ITEM_TO_CART", payload: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE_ITEM_FROM_CART", payload: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
