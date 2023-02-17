import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
    },
    closeModal: (state, action) => {
      state.isOpen = false;
    },
  },
});

// Extract and export each action creator by name
export const { openModal, closeModal } = modalSlice.actions;
// Export the reducer, either as a default or named export
export default modalSlice.reducer;

export const selectData = state => state.posts.data;
