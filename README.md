# HotelHub - Luxury Hotel Listing & Management (SPA)

> Developed for the **NamlaTech India Private Limited** Frontend Assignment: **Hotel List Page (CRUD Form with Responsive UI)**.

A modern, responsive Single Page Application (SPA) built using **React 18**, **Redux Toolkit**, **React Router DOM v6**, **Tailwind CSS**, and **Leaflet / OpenStreetMap**, with HTML5 **Geolocation API** and **React Helmet** for dynamic SEO metadata.

---

## 🌟 Key Features

### 1. Reusable Add / Edit Hotel Form
- **Form Reuse**: Single reusable component (`HotelForm.jsx`) handles both creation and editing of hotels.
- **Image Upload & Preview**:
  - Live local file upload via HTML5 `FileReader` with instant preview.
  - Optional direct image URL support.
- **Form Validation**:
  - Hotel Title (required, min 3 chars).
  - Hotel Description (required, min 15 chars).
  - Nightly Price (required, valid positive numeric amount).
  - Latitude (-90 to +90) and Longitude (-180 to +180) coordinate validation.
  - Image presence validation.
- **GPS Auto-Fill**:
  - One-click **"Use My Current GPS"** button that leverages the browser's `navigator.geolocation` API to auto-fill latitude and longitude.

### 2. Hotel List Page with Filtering & Pagination (Sample UI Alignment)
- **Sample UI Fidelity**: Matches the MDBootstrap e-Commerce / catalog layout.
- **Horizontal Item Cards**:
  - Left: Thumbnail image with SEO `alt` tag.
  - Middle: Star rating, reviews count, hotel title, description snippet, amenities tags, coordinates.
  - Right: Formatted nightly price (`$XXX.XX`), "Free cancellation" tag, "View Details", "Edit", and "Delete" buttons.
- **Search & Filters**:
  - Search by hotel name, destination, or description.
  - Price range min/max filter inputs and apply button.
  - Star rating selector (5.0 stars, 4.0+, 3.0+).
- **Pagination**:
  - Numbered page selector (`< 1 2 3 >`) with previous and next controls.
  - Total items indicator ("XX items found").
  - Sorting: Best match, Price (Low to High), Price (High to Low), Top Rated.

### 3. Hotel Detail Page with Interactive Leaflet Map
- Accessible at `/hotel/:id`.
- Full property showcase with hero photo, full description, amenities grid, specifications.
- **Interactive OpenStreetMap (Leaflet)**:
  - Custom pin positioned at the hotel's exact latitude and longitude.
  - **"Calculate Distance to My Location"** button calling the **Geolocation API** and calculating geodesic distance in kilometers via the Haversine formula.
  - Direct external link to open location in Google Maps.

### 4. Delete Flow with Feedback
- Delete button opens a custom confirmation modal (`ConfirmModal.jsx`).
- Upon confirmation, deletes the item from Redux state and `localStorage`.
- Displays a floating green success toast notification popup.

### 5. SEO Optimization
- Uses `react-helmet-async` on all views (`HotelListPage`, `HotelDetailPage`, `AddHotelPage`, `EditHotelPage`).
- Injects dynamic `<title>`, `<meta name="description">`, keywords, and Open Graph tags (`og:title`, `og:image`, `og:description`).
- All `<img>` tags include semantic `alt` attributes for accessibility and SEO.

---

## 📁 Project Folder Structure

```
hotel-management-app/
├── public/
│   ├── favicon.svg             # SVG favicon
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   │   ├── ConfirmModal.jsx # Delete confirmation dialog
│   │   │   ├── Footer.jsx       # Multi-column footer matching Sample UI
│   │   │   ├── Navbar.jsx       # Navigation header with search & "+ Add Hotel"
│   │   │   ├── Pagination.jsx   # Reusable pagination controls
│   │   │   ├── RatingStars.jsx  # 5-star visual rating component
│   │   │   ├── SEO.jsx          # Dynamic React Helmet meta tags
│   │   │   ├── SubHeader.jsx    # Blue banner with breadcrumbs matching Sample UI
│   │   │   └── Toast.jsx        # Floating animated success/error popup
│   │   └── hotels/
│   │       ├── HotelCard.jsx    # Horizontal hotel card
│   │       ├── HotelFilterSidebar.jsx # Left sidebar filters (price, rating, perks)
│   │       ├── HotelForm.jsx    # Reusable Add & Edit form with validation & GPS
│   │       ├── HotelMap.jsx     # Interactive Leaflet map & Geolocation
│   │       └── HotelSortBar.jsx # Results counter & sorting dropdown
│   ├── data/
│   │   └── initialHotels.js     # 12 seed luxury hotels across the world
│   ├── hooks/
│   │   ├── useDebounce.js       # Search input debouncer
│   │   └── useGeolocation.js    # Browser Geolocation API hook
│   ├── pages/
│   │   ├── AddHotelPage.jsx     # /add-hotel
│   │   ├── EditHotelPage.jsx    # /edit-hotel/:id
│   │   ├── HotelDetailPage.jsx  # /hotel/:id
│   │   ├── HotelListPage.jsx    # / (catalog)
│   │   └── NotFoundPage.jsx     # 404
│   ├── redux/
│   │   ├── slices/
│   │   │   ├── filterSlice.js   # Search, price min/max, sort, page state
│   │   │   ├── hotelSlice.js    # CRUD async thunks & state
│   │   │   └── uiSlice.js       # Toast notifications & modal state
│   │   └── store.js             # Configured Redux store
│   ├── services/
│   │   └── hotelApi.js          # Async mock API layer with localStorage persistence
│   ├── utils/
│   │   ├── formatters.js        # Currency, text truncation, distance formulas
│   │   └── validation.js        # Hotel form field validators
│   ├── App.jsx                  # Main application layout and routes
│   ├── index.css                # Tailwind directives & custom CSS
│   └── main.jsx                 # Application entry point
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build & Preview
```bash
npm run build
npm run preview
```

