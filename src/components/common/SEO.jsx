import React from 'react';
import { Helmet } from 'react-helmet-async';

export const SEO = ({
  title = 'HotelHub - Premium Hotel Listings & CRUD',
  description = 'Browse, search, and manage world-class luxury hotels and resorts with live interactive maps and real-time CRUD operations.',
  keywords = 'hotels, resort, luxury stay, hotel bookings, travel, hotel management, CRUD',
  image = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
  url = window.location.href,
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

