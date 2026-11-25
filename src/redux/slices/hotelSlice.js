import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { hotelApi } from '../../services/hotelApi';

// Async Thunks
export const fetchHotels = createAsyncThunk(
  'hotels/fetchHotels',
  async (_, { rejectWithValue }) => {
    try {
      const data = await hotelApi.getHotels();
      return data;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to fetch hotels');
    }
  }
);

export const fetchHotelById = createAsyncThunk(
  'hotels/fetchHotelById',
  async (id, { rejectWithValue }) => {
    try {
      const data = await hotelApi.getHotelById(id);
      return data;
    } catch (err) {
      return rejectWithValue(err.message || 'Hotel not found');
    }
  }
);

export const createHotel = createAsyncThunk(
  'hotels/createHotel',
  async (hotelData, { rejectWithValue }) => {
    try {
      const data = await hotelApi.createHotel(hotelData);
      return data;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to create hotel');
    }
  }
);

export const updateHotel = createAsyncThunk(
  'hotels/updateHotel',
  async ({ id, hotelData }, { rejectWithValue }) => {
    try {
      const data = await hotelApi.updateHotel(id, hotelData);
      return data;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to update hotel');
    }
  }
);

export const deleteHotel = createAsyncThunk(
  'hotels/deleteHotel',
  async (id, { rejectWithValue }) => {
    try {
      const result = await hotelApi.deleteHotel(id);
      return result;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to delete hotel');
    }
  }
);

export const resetHotelsToDefault = createAsyncThunk(
  'hotels/resetHotelsToDefault',
  async (_, { rejectWithValue }) => {
    try {
      const data = await hotelApi.resetDefaults();
      return data;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to reset default hotels');
    }
  }
);

const initialState = {
  items: [],
  selectedHotel: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  actionStatus: 'idle', // 'idle' | 'pending' | 'success' | 'error'
  error: null,
};

const hotelSlice = createSlice({
  name: 'hotels',
  initialState,
  reducers: {
    clearSelectedHotel(state) {
      state.selectedHotel = null;
    },
    clearError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // fetchHotels
      .addCase(fetchHotels.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchHotels.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchHotels.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // fetchHotelById
      .addCase(fetchHotelById.pending, (state) => {
        state.actionStatus = 'pending';
        state.error = null;
      })
      .addCase(fetchHotelById.fulfilled, (state, action) => {
        state.actionStatus = 'success';
        state.selectedHotel = action.payload;
      })
      .addCase(fetchHotelById.rejected, (state, action) => {
        state.actionStatus = 'error';
        state.error = action.payload;
      })

      // createHotel
      .addCase(createHotel.pending, (state) => {
        state.actionStatus = 'pending';
      })
      .addCase(createHotel.fulfilled, (state, action) => {
        state.actionStatus = 'success';
        state.items.unshift(action.payload);
      })
      .addCase(createHotel.rejected, (state, action) => {
        state.actionStatus = 'error';
        state.error = action.payload;
      })

      // updateHotel
      .addCase(updateHotel.pending, (state) => {
        state.actionStatus = 'pending';
      })
      .addCase(updateHotel.fulfilled, (state, action) => {
        state.actionStatus = 'success';
        const index = state.items.findIndex((h) => String(h.id) === String(action.payload.id));
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        if (state.selectedHotel && String(state.selectedHotel.id) === String(action.payload.id)) {
          state.selectedHotel = action.payload;
        }
      })
      .addCase(updateHotel.rejected, (state, action) => {
        state.actionStatus = 'error';
        state.error = action.payload;
      })

      // deleteHotel
      .addCase(deleteHotel.fulfilled, (state, action) => {
        state.items = state.items.filter((h) => String(h.id) !== String(action.payload.id));
        if (state.selectedHotel && String(state.selectedHotel.id) === String(action.payload.id)) {
          state.selectedHotel = null;
        }
      })

      // resetHotelsToDefault
      .addCase(resetHotelsToDefault.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export const { clearSelectedHotel, clearError } = hotelSlice.actions;
export default hotelSlice.reducer;

