import React from 'react';
import { Gallery } from '../components/Gallery';

const GalleryPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Gallery</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Capture the spirit of our running community through beautiful moments and memories from our adventures.
          </p>
        </div>
        <Gallery />
      </div>
    </div>
  );
};

export default GalleryPage; 