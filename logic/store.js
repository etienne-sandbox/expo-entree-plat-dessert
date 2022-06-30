import create from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { nanoid } from "nanoid/non-secure";

export const STORAGE_KEY = "entree-plat-dessert";

export const useStore = create(
  persist(
    (set, get) => ({
      groups: [
        {
          id: nanoid(10),
          name: "Famille Rousseau",
          people: { adults: 2, children: 2 },
          food: { starter: 0, dish: 6, dessert: 0, drink: 0 },
        },
        {
          id: nanoid(10),
          name: "Alex & Déborah",
          people: { adults: 2, children: 0 },
          food: { starter: 0, dish: 0, dessert: 0, drink: 12 },
        },
        {
          id: nanoid(10),
          name: "Famille Bonnel",
          people: { adults: 2, children: 4 },
          food: { starter: 10, dish: 0, dessert: 6, drink: 4 },
        },
        {
          id: nanoid(10),
          name: "Famille Rousseau",
          people: { adults: 2, children: 2 },
          food: { starter: 0, dish: 6, dessert: 0, drink: 0 },
        },
        {
          id: nanoid(10),
          name: "Alex & Déborah",
          people: { adults: 2, children: 0 },
          food: { starter: 0, dish: 0, dessert: 0, drink: 12 },
        },
        {
          id: nanoid(10),
          name: "Famille Bonnel",
          people: { adults: 2, children: 4 },
          food: { starter: 10, dish: 0, dessert: 6, drink: 4 },
        },
      ],
      setGroupName: (id, name) => {
        set((state) => {
          return {
            groups: state.groups.map((group) => {
              if (group.id === id) {
                return { ...group, name };
              }
              return group;
            }),
          };
        });
      },
      setGroupPeople: (id, peopleKey, people) => {
        set((state) => {
          return {
            groups: state.groups.map((group) => {
              if (group.id === id) {
                return { ...group, people: { ...group.people, [peopleKey]: people } };
              }
              return group;
            }),
          };
        });
      },
      setGroupFood: (id, foodKey, food) => {
        set((state) => {
          return {
            groups: state.groups.map((group) => {
              if (group.id === id) {
                return { ...group, food: { ...group.food, [foodKey]: food } };
              }
              return group;
            }),
          };
        });
      },
      deleteGroup: (id) => {
        set((state) => {
          return {
            groups: state.groups.filter((group) => group.id !== id),
          };
        });
      },
      addGroup: () => {
        const id = nanoid(10);
        set((state) => {
          return {
            groups: [
              ...state.groups,
              { id, name: "Nouveau groupe", people: { adults: 0, children: 0 }, food: { starter: 0, dish: 0, dessert: 0, drink: 0 } },
            ],
          };
        });
        return id;
      },
    }),
    {
      name: STORAGE_KEY,
      getStorage: () => AsyncStorage,
      version: 4,
    }
  )
);
