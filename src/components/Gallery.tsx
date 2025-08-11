import React from 'react';
import { Heart, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useData } from '../contexts/DataContext';

export const Gallery = () => {
  const { t } = useLanguage();
  const { photos } = useData();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <img
              src={photo.url}
              alt={photo.caption}
              className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white font-medium line-clamp-2">{photo.caption}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1 text-white">
                    <Heart className="h-4 w-4" />
                    <span className="text-sm">42</span>
                  </div>
                  <div className="flex items-center space-x-1 text-white">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-sm">8</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;