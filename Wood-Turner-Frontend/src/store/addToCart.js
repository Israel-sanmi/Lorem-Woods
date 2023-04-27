import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const addToCart = (set, get) => ({
  cartProduct: [],
  addToCartFunction: (item) => {
    const exist = get().cartProduct.find((x) => x?.id === item?.id);
    if (exist) {
      set((state) => ({
        ...state,
        cartProduct: state.cartProduct.map((x) =>
          x?.id === item?.id ? { ...exist, qty: exist.qty + 1 } : x
        ),
      }));
      toast.success(`${item.name} qty increased`);
    } else {
      set((state) => ({
        ...state,
        cartProduct: [...state.cartProduct, { ...item, qty: 1 }],
      }));
      toast.success(`${item.name} added to cart`);
    }
  },

  removeFromCart: (item) => {
    const exist = get().cartProduct.find((x) => x.id == item.id);
    if (exist.qty === 1) {
      set((state) => ({
        ...state,
        cartProduct: state.cartProduct.filter((x) => x.id !== item.id),
      }));
      toast.error(`${item.name} removed from cart`);
    } else {
      set((state) => ({
        ...state,
        cartProduct: state.cartProduct.map((x) =>
          x?.id == item?.id ? { ...exist, qty: exist.qty - 1 } : x
        ),
      }));
      toast.error(`${item.name} qty reduced in cart`);
    }
  },
  deleteProduct: (item) => {
    set((state) => ({
      ...state,
      cartProduct: state.cartProduct.filter((x) => x.id !== item.id),
    }));
    toast.error(`${item.name} deleted from cart`);
  },
  emptyCart: () => {
    set((state) => ({
      ...state,
      cartProduct: (state.cartProduct = []),
    }));
    // toast.error("Cart Empitied");
  },
});

export default addToCart;
