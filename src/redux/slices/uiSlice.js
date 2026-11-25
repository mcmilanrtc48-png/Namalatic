import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  toasts: [],
  deleteModal: {
    isOpen: false,
    hotelId: null,
    hotelTitle: '',
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    addToast(state, action) {
      const newToast = {
        id: `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        type: action.payload.type || 'success', // 'success' | 'error' | 'info'
        message: action.payload.message,
      };
      state.toasts.push(newToast);
    },
    removeToast(state, action) {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
    openDeleteModal(state, action) {
      state.deleteModal = {
        isOpen: true,
        hotelId: action.payload.id,
        hotelTitle: action.payload.title,
      };
    },
    closeDeleteModal(state) {
      state.deleteModal = {
        isOpen: false,
        hotelId: null,
        hotelTitle: '',
      };
    },
  },
});

export const { addToast, removeToast, openDeleteModal, closeDeleteModal } = uiSlice.actions;
export default uiSlice.reducer;

