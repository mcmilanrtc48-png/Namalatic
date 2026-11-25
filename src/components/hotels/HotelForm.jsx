import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createHotel, updateHotel } from '../../redux/slices/hotelSlice';
import { addToast } from '../../redux/slices/uiSlice';
import { validateHotelForm } from '../../utils/validation';
import { useGeolocation } from '../../hooks/useGeolocation';
import {
  Upload,
  Image as ImageIcon,
  DollarSign,
  MapPin,
  FileText,
  Building,
  Navigation,
  Loader2,
  CheckCircle,
  X,
  AlertCircle
} from 'lucide-react';

export const HotelForm = ({ initialData = null, isEdit = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getCurrentLocation, location: userGps, loading: gpsLoading, error: gpsError } = useGeolocation();

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    latitude: '',
    longitude: '',
    image: '',
    locationName: '',
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageMode, setImageMode] = useState('upload'); // 'upload' | 'url'

  // Pre-fill if editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        price: initialData.price || '',
        latitude: initialData.latitude !== undefined ? String(initialData.latitude) : '',
        longitude: initialData.longitude !== undefined ? String(initialData.longitude) : '',
        image: initialData.image || '',
        locationName: initialData.locationName || '',
      });
      setImagePreview(initialData.image || '');
    }
  }, [initialData]);

  // Handle GPS coordinate detection
  useEffect(() => {
    if (userGps) {
      setFormData((prev) => ({
        ...prev,
        latitude: userGps.latitude.toFixed(6),
        longitude: userGps.longitude.toFixed(6),
      }));
      setErrors((prev) => ({ ...prev, latitude: undefined, longitude: undefined }));
      dispatch(addToast({ type: 'info', message: 'Current GPS coordinates detected and filled!' }));
    }
  }, [userGps, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }

    if (name === 'image') {
      setImagePreview(value);
    }
  };

  // Image file upload handler with FileReader
  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrors((prev) => ({ ...prev, image: 'Please select a valid image file (PNG, JPG, WEBP).' }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, image: 'Image size should not exceed 5MB.' }));
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result;
      setImagePreview(base64Data);
      setFormData((prev) => ({ ...prev, image: base64Data }));
      setErrors((prev) => ({ ...prev, image: undefined }));
    };
    reader.readAsDataURL(file);
  };

  const handleClearImage = () => {
    setImagePreview('');
    setFormData((prev) => ({ ...prev, image: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form inputs
    const { isValid, errors: validationErrors } = validateHotelForm(formData);
    if (!isValid) {
      setErrors(validationErrors);
      dispatch(addToast({ type: 'error', message: 'Please correct the highlighted form errors.' }));
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        price: Number(formData.price),
        latitude: Number(formData.latitude),
        longitude: Number(formData.longitude),
        image: formData.image,
        locationName: formData.locationName.trim() || 'Global Destination',
      };

      if (isEdit && initialData?.id) {
        await dispatch(updateHotel({ id: initialData.id, hotelData: payload })).unwrap();
        dispatch(
          addToast({
            type: 'success',
            message: `"${payload.title}" updated successfully!`,
          })
        );
        navigate(`/hotel/${initialData.id}`);
      } else {
        const created = await dispatch(createHotel(payload)).unwrap();
        dispatch(
          addToast({
            type: 'success',
            message: `"${payload.title}" created successfully!`,
          })
        );
        navigate('/');
      }
    } catch (err) {
      dispatch(addToast({ type: 'error', message: err || 'Submission failed. Please try again.' }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 1. Hotel Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-bold text-slate-800 mb-1">
          Hotel Name / Title <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Building size={17} />
          </div>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. The Grand Palace Hotel & Spa"
            className={`w-full pl-10 pr-3 py-2.5 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 transition ${
              errors.title
                ? 'border-red-400 focus:ring-red-300'
                : 'border-slate-300 focus:ring-blue-500'
            }`}
          />
        </div>
        {errors.title && <p className="mt-1 text-xs text-red-600 font-medium">{errors.title}</p>}
      </div>

      {/* 2. Location Destination Name (City, Country) */}
      <div>
        <label htmlFor="locationName" className="block text-sm font-bold text-slate-800 mb-1">
          Location / City Name (Optional)
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <MapPin size={17} />
          </div>
          <input
            id="locationName"
            name="locationName"
            type="text"
            value={formData.locationName}
            onChange={handleChange}
            placeholder="e.g. Paris, France or Bali, Indonesia"
            className="w-full pl-10 pr-3 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* 3. Price per Night */}
      <div>
        <label htmlFor="price" className="block text-sm font-bold text-slate-800 mb-1">
          Price per Night ($ USD) <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <DollarSign size={17} />
          </div>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            value={formData.price}
            onChange={handleChange}
            placeholder="e.g. 299.00"
            className={`w-full pl-10 pr-3 py-2.5 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 transition ${
              errors.price
                ? 'border-red-400 focus:ring-red-300'
                : 'border-slate-300 focus:ring-blue-500'
            }`}
          />
        </div>
        {errors.price && <p className="mt-1 text-xs text-red-600 font-medium">{errors.price}</p>}
      </div>

      {/* 4. Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-bold text-slate-800 mb-1">
          Description <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <textarea
            id="description"
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            placeholder="Write a captivating summary of the hotel, its key highlights, services, and guest experience..."
            className={`w-full p-3 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 transition ${
              errors.description
                ? 'border-red-400 focus:ring-red-300'
                : 'border-slate-300 focus:ring-blue-500'
            }`}
          />
        </div>
        {errors.description && (
          <p className="mt-1 text-xs text-red-600 font-medium">{errors.description}</p>
        )}
      </div>

      {/* 5. Latitude & Longitude with Geolocation Auto-Detection */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <MapPin size={16} className="text-blue-600" />
              Geolocation Coordinates <span className="text-red-500">*</span>
            </h4>
            <p className="text-xs text-slate-500">
              Used to place the hotel on the interactive map on the detail page.
            </p>
          </div>

          <button
            type="button"
            onClick={getCurrentLocation}
            disabled={gpsLoading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-100/80 hover:bg-blue-200 rounded-md transition disabled:opacity-50"
          >
            {gpsLoading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Navigation size={14} />
            )}
            Use My Current GPS
          </button>
        </div>

        {gpsError && (
          <div className="flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 p-2 rounded border border-amber-200">
            <AlertCircle size={14} />
            <span>{gpsError}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="latitude" className="block text-xs font-semibold text-slate-700 mb-1">
              Latitude (-90 to +90)
            </label>
            <input
              id="latitude"
              name="latitude"
              type="number"
              step="any"
              value={formData.latitude}
              onChange={handleChange}
              placeholder="e.g. 48.8584"
              className={`w-full px-3 py-2 bg-white border rounded-lg text-xs focus:outline-none focus:ring-2 ${
                errors.latitude ? 'border-red-400 focus:ring-red-300' : 'border-slate-300 focus:ring-blue-500'
              }`}
            />
            {errors.latitude && (
              <p className="mt-1 text-[11px] text-red-600 font-medium">{errors.latitude}</p>
            )}
          </div>

          <div>
            <label htmlFor="longitude" className="block text-xs font-semibold text-slate-700 mb-1">
              Longitude (-180 to +180)
            </label>
            <input
              id="longitude"
              name="longitude"
              type="number"
              step="any"
              value={formData.longitude}
              onChange={handleChange}
              placeholder="e.g. 2.2945"
              className={`w-full px-3 py-2 bg-white border rounded-lg text-xs focus:outline-none focus:ring-2 ${
                errors.longitude ? 'border-red-400 focus:ring-red-300' : 'border-slate-300 focus:ring-blue-500'
              }`}
            />
            {errors.longitude && (
              <p className="mt-1 text-[11px] text-red-600 font-medium">{errors.longitude}</p>
            )}
          </div>
        </div>
      </div>

      {/* 6. Image Upload & Preview Section */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <ImageIcon size={16} className="text-blue-600" />
            Hotel Image with Live Preview <span className="text-red-500">*</span>
          </label>
          <div className="flex rounded-md shadow-xs bg-slate-200 p-0.5 text-xs">
            <button
              type="button"
              onClick={() => setImageMode('upload')}
              className={`px-2.5 py-1 rounded font-medium transition ${
                imageMode === 'upload' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600'
              }`}
            >
              Upload File
            </button>
            <button
              type="button"
              onClick={() => setImageMode('url')}
              className={`px-2.5 py-1 rounded font-medium transition ${
                imageMode === 'url' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600'
              }`}
            >
              Image URL
            </button>
          </div>
        </div>

        {imageMode === 'upload' ? (
          <div>
            <label
              htmlFor="image-file"
              className="border-2 border-dashed border-slate-300 hover:border-blue-500 bg-white rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition text-center group"
            >
              <Upload size={28} className="text-slate-400 group-hover:text-blue-600 transition mb-2" />
              <span className="text-xs font-semibold text-slate-700">
                Click to browse and upload hotel photo
              </span>
              <span className="text-[11px] text-slate-400 mt-1">
                Supports PNG, JPG, WEBP up to 5MB
              </span>
              <input
                id="image-file"
                type="file"
                accept="image/*"
                onChange={handleImageFileChange}
                className="hidden"
              />
            </label>
          </div>
        ) : (
          <div>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Paste direct image link (e.g. https://images.unsplash.com/...)"
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {errors.image && <p className="text-xs text-red-600 font-medium">{errors.image}</p>}

        {/* Live Preview Card */}
        {imagePreview && (
          <div className="relative mt-3 rounded-lg overflow-hidden border border-slate-200 bg-black/5 aspect-video max-h-56 w-full flex items-center justify-center">
            <img
              src={imagePreview}
              alt="Uploaded hotel preview"
              className="w-full h-full object-cover"
              onError={() => setErrors((prev) => ({ ...prev, image: 'Image failed to load. Please check file/URL.' }))}
            />
            <button
              type="button"
              onClick={handleClearImage}
              aria-label="Remove image"
              className="absolute top-2 right-2 bg-slate-900/80 hover:bg-slate-900 text-white p-1 rounded-full backdrop-blur-xs transition"
            >
              <X size={16} />
            </button>
            <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[11px] font-medium px-2 py-0.5 rounded backdrop-blur-xs">
              Live Preview
            </span>
          </div>
        )}
      </div>

      {/* Form Submission Buttons */}
      <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md shadow-blue-500/25 flex items-center gap-2 transition disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <CheckCircle size={16} />
              <span>{isEdit ? 'Update Hotel' : 'Create Hotel Listing'}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

