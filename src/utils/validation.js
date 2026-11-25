export const validateHotelForm = (values) => {
  const errors = {};

  // Title validation
  if (!values.title || !values.title.trim()) {
    errors.title = 'Hotel title is required.';
  } else if (values.title.trim().length < 3) {
    errors.title = 'Hotel title must be at least 3 characters long.';
  } else if (values.title.trim().length > 100) {
    errors.title = 'Hotel title cannot exceed 100 characters.';
  }

  // Description validation
  if (!values.description || !values.description.trim()) {
    errors.description = 'Description is required.';
  } else if (values.description.trim().length < 15) {
    errors.description = 'Please provide a descriptive snippet (minimum 15 characters).';
  }

  // Price validation
  if (values.price === '' || values.price === null || values.price === undefined) {
    errors.price = 'Price per night is required.';
  } else {
    const numPrice = Number(values.price);
    if (isNaN(numPrice) || numPrice <= 0) {
      errors.price = 'Price must be a valid number greater than 0.';
    } else if (numPrice > 50000) {
      errors.price = 'Price cannot exceed $50,000 per night.';
    }
  }

  // Latitude validation (-90 to 90)
  if (values.latitude === '' || values.latitude === null || values.latitude === undefined) {
    errors.latitude = 'Latitude is required.';
  } else {
    const lat = Number(values.latitude);
    if (isNaN(lat)) {
      errors.latitude = 'Latitude must be a valid decimal number.';
    } else if (lat < -90 || lat > 90) {
      errors.latitude = 'Latitude must be between -90 and 90 degrees.';
    }
  }

  // Longitude validation (-180 to 180)
  if (values.longitude === '' || values.longitude === null || values.longitude === undefined) {
    errors.longitude = 'Longitude is required.';
  } else {
    const lng = Number(values.longitude);
    if (isNaN(lng)) {
      errors.longitude = 'Longitude must be a valid decimal number.';
    } else if (lng < -180 || lng > 180) {
      errors.longitude = 'Longitude must be between -180 and 180 degrees.';
    }
  }

  // Image validation
  if (!values.image || !values.image.trim()) {
    errors.image = 'An image is required. Please upload an image or provide an image URL.';
  } else if (
    !values.image.startsWith('data:image/') &&
    !values.image.startsWith('blob:') &&
    !values.image.startsWith('http://') &&
    !values.image.startsWith('https://')
  ) {
    errors.image = 'Image must be a valid HTTP/HTTPS URL or uploaded image file.';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

