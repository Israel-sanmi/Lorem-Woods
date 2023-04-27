import { createClient } from "@sanity/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import addToCart from "./addToCart";

export const client = createClient({
  projectId: "27z98egi",
  dataset: "production",
  useCdn: true,
  apiVersion: "2022-08-12",
});

//fetch function / process
const useStore = create((set, get) => ({
  products: [],
  loading: false,
  fetchProducts: async () => {
    try {
      const data = await client.fetch(
        `*[_type == 'product'] {
          name,
          description,
          "gallery": gallery[].asset -> url,
          "slug" : slug.current,
          price,
          "id": _id,
          "mainImage": mainImage.asset->url
        }`
      );
      set((state) => ({ ...state, products: data, loading: true }));
    } catch (error) {
      console.error(error);
    }
  },
  selectedProduct: {},
  selectProductBySlug: async (slug) => {
    try {
      const data = await client.fetch(
        `*[_type == 'product' && slug.current == $slug] {
          name,
          description,
          "gallery": gallery[].asset -> url,
          "slug" : slug.current,
          price,
          "id": _id,
          "mainImage": mainImage.asset->url
        }`,
        { slug }
      );
      set((state) => ({ ...state, selectedProduct: data[0] }));
    } catch (error) {
      console.error(error);
    }
  },
  clearSelectedProduct: () => {
    set((state) => ({ ...state, selectedProduct: {} }));
  },
  ...addToCart(set, get),
}));

export default useStore;
