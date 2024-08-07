"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { firestore } from "@/firebase";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";

// Async thunks for firestore operations
export const fetchPantry = createAsyncThunk("pantry/fetchPantry", async () => {
  const snapshot = await getDocs(collection(firestore, "pantry"));
  const pantryList = [];
  snapshot.forEach((doc) => {
    pantryList.push({ name: doc.id, ...doc.data() });
  });
  return pantryList;
});

export const addItem = createAsyncThunk(
  "pantry/addItem",
  async ({ item, quantity }, { dispatch }) => {
    const docRef = doc(collection(firestore, "pantry"), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity: currentQuantity } = docSnap.data();
      await setDoc(docRef, { quantity: currentQuantity + quantity });
    } else {
      await setDoc(docRef, { quantity });
    }
    dispatch(fetchPantry());
  }
);

export const removeItem = createAsyncThunk(
  "pantry/removeItem",
  async (item, { dispatch }) => {
    const docRef = doc(collection(firestore, "pantry"), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }
    dispatch(fetchPantry());
  }
);

export const deleteItem = createAsyncThunk(
  "pantry/deleteItem",
  async (item, { dispatch }) => {
    const docRef = doc(collection(firestore, "pantry"), item);
    await deleteDoc(docRef);
    dispatch(fetchPantry());
  }
);

// Slice
const pantrySlice = createSlice({
  name: "pantry",
  initialState: {
    items: [],
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPantry.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPantry.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchPantry.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default pantrySlice.reducer;
