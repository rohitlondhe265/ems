import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const userStore = (set) => ({
  userName: 0,
  email: 0,
  image: "",
  isSaved: false,

  setUser: (newName, newEmail, newImage, newIsSaved) => {
    set({
      userName: newName,
      email: newEmail,
      image: newImage,
      isSaved: newIsSaved,
    });
  },

  deleteEverything: () => set({}, true),
});

const useUserStore = create(
  devtools(
    persist(userStore, {
      name: "User",
    })
  )
);
export default useUserStore;
