import { INITIAL_HOTELS } from '../data/initialHotels';

const STORAGE_KEY = 'namlatech_hotel_listings_data_v1';

// Helper to simulate network latency for realistic async frontend feel
const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

const getStoredHotels = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_HOTELS));
      return INITIAL_HOTELS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_HOTELS;
  } catch (e) {
    console.error('Error reading localStorage:', e);
    return INITIAL_HOTELS;
  }
};

const saveStoredHotels = (hotels) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(hotels));
  } catch (e) {
    console.error('Error writing to localStorage:', e);
  }
};

export const hotelApi = {
  async getHotels() {
    await delay();
    return getStoredHotels();
  },

  async getHotelById(id) {
    await delay();
    const hotels = getStoredHotels();
    const hotel = hotels.find((h) => String(h.id) === String(id));
    if (!hotel) {
      throw new Error(`Hotel with ID "${id}" was not found.`);
    }
    return hotel;
  },

  async createHotel(newHotelData) {
    await delay();
    const hotels = getStoredHotels();
    const newHotel = {
      ...newHotelData,
      id: `h-${Date.now()}`,
      rating: newHotelData.rating || 4.5,
      reviewsCount: newHotelData.reviewsCount || 1,
      amenities: newHotelData.amenities?.length ? newHotelData.amenities : ["Free Wi-Fi", "Air Conditioning"],
      tags: newHotelData.tags?.length ? newHotelData.tags : ["New Listing", "Free Cancellation"]
    };
    const updated = [newHotel, ...hotels];
    saveStoredHotels(updated);
    return newHotel;
  },

  async updateHotel(id, updatedData) {
    await delay();
    const hotels = getStoredHotels();
    const index = hotels.findIndex((h) => String(h.id) === String(id));
    if (index === -1) {
      throw new Error(`Hotel with ID "${id}" was not found.`);
    }
    const updatedHotel = {
      ...hotels[index],
      ...updatedData,
      id: hotels[index].id, // preserve immutable ID
    };
    hotels[index] = updatedHotel;
    saveStoredHotels(hotels);
    return updatedHotel;
  },

  async deleteHotel(id) {
    await delay();
    const hotels = getStoredHotels();
    const target = hotels.find((h) => String(h.id) === String(id));
    if (!target) {
      throw new Error(`Hotel with ID "${id}" was not found.`);
    }
    const filtered = hotels.filter((h) => String(h.id) !== String(id));
    saveStoredHotels(filtered);
    return { id, title: target.title };
  },

  async resetDefaults() {
    await delay();
    saveStoredHotels(INITIAL_HOTELS);
    return INITIAL_HOTELS;
  }
};

