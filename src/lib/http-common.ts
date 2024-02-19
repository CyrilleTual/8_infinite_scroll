import axiosInitial from "axios";

export const axios = axiosInitial.create({
  baseURL: process.env.NEXT_PUBLIC_UNSPLASH_URL,
  headers: {
    "Content-type": "application/json",
  },
});

 