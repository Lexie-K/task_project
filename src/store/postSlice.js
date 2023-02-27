import { createSlice } from '@reduxjs/toolkit';
import data from '../data/data.json';

const initialState = {
  data: data.data,
  currentCategories: {},
  selectedApplications: [],
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    selectApplication(state, action) {
      state.selectedApplications = [
        ...state.selectedApplications,
        ...action.payload,
      ];
    },
    resetApplication(state, action) {
      state.selectedApplications = [];
    },
  },
});

// Extract and export each action creator by name
export const { selectApplication, resetApplication } = postSlice.actions;
// Export the reducer, either as a default or named export
export default postSlice.reducer;

export const dataSelector = state => state.posts.data;
export const applicationSelector = state =>
  state.posts.data.filter(item =>
    state.posts.selectedApplications.length > 0
      ? state.posts.selectedApplications.includes(item.application)
      : true
  );
