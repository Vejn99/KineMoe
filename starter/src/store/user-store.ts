import axios from "axios";
import { create } from "zustand";
import { ApiStoreInterface, MovieInterface } from "./types";

const apiUrl = "http://localhost:5001/movies";

const userToken = localStorage.getItem("email&pass");

export const useUserStore = create((set) => ({
  user: userToken ? JSON.parse(userToken) : null,
  setUser: (userPayload: any) =>
    set(() => ({
      user: userPayload,
    })),
}));

export const useApiStore = create<ApiStoreInterface>((set) => {
  const fetchMovies = async () => {
    set({ loading: true });
    try {
      const response = await axios.get<MovieInterface[]>(apiUrl);
      set({ movies: response.data, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  };

  return {
    movies: null,
    loading: false,
    error: null,
    fetchMovies,
  };
});
