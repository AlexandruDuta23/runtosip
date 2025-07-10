import React, { useState, useEffect } from 'react';
import { Instagram, Heart, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const INSTAGRAM_USERNAME = 'runtosip';

const Gallery = () => {
  const { t } = useLanguage();
  const [photos, setPhotos] = useState<any[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Try to fetch latest 6 posts from Instagram (public scraping or API)
    // For demo, fallback to static if fetch fails
    const fetchInstagram = async () => {
      try {
        // This is a placeholder for a real Instagram API call or public scraping
        // Instagram API requires authentication, so in production use a backend proxy or service
        const response = await fetch(`https://www.instagram.com/${INSTAGRAM_USERNAME}/?__a=1&__d=dis`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        // Instagram's public API is not officially supported, so structure may change
        const edges = data.graphql.user.edge_owner_to_timeline_media.edges;
        const latest = edges.slice(0, 6).map((edge: any) => ({
          url: edge.node.display_url,
          caption: edge.node.edge_media_to_caption.edges[0]?.node.text || '',
          likes: edge.node.edge_liked_by.count,
          comments: edge.node.edge_media_to_comment.count,
          postUrl: `https://www.instagram.com/p/${edge.node.shortcode}/`
        }));
        setPhotos(latest);
      } catch (e) {
        setError(true);
        // fallback to static
        setPhotos([
          {
            url: 'https://images.pexels.com/photos/2526878/pexels-photo-2526878.jpeg?auto=compress&cs=tinysrgb&w=400',
            caption: 'Sunday morning run through Herastrau Park',
            likes: 42,
            comments: 8,
            postUrl: 'https://www.instagram.com/runtosip/'
          },
          {
            url: 'https://images.pexels.com/photos/1571939/pexels-photo-1571939.jpeg?auto=compress&cs=tinysrgb&w=400',
            caption: 'Post-run coffee celebration',
            likes: 35,
            comments: 5,
            postUrl: 'https://www.instagram.com/runtosip/'
          },
          {
            url: 'https://images.pexels.com/photos/1671327/pexels-photo-1671327.jpeg?auto=compress&cs=tinysrgb&w=400',
            caption: 'Our amazing running community',
            likes: 50,
            comments: 10,
            postUrl: 'https://www.instagram.com/runtosip/'
          },
          {
            url: 'https://images.pexels.com/photos/1556691/pexels-photo-1556691.jpeg?auto=compress&cs=tinysrgb&w=400',
            caption: 'Exploring Old Town Bucharest',
            likes: 28,
            comments: 4,
            postUrl: 'https://www.instagram.com/runtosip/'
          },
          {
            url: 'https://images.pexels.com/photos/2402846/pexels-photo-2402846.jpeg?auto=compress&cs=tinysrgb&w=400',
            caption: 'Coffee time after a great run',
            likes: 31,
            comments: 6,
            postUrl: 'https://www.instagram.com/runtosip/'
          },
          {
            url: 'https://images.pexels.com/photos/1571940/pexels-photo-1571940.jpeg?auto=compress&cs=tinysrgb&w=400',
            caption: 'Team spirit and friendship',
            likes: 39,
            comments: 7,
            postUrl: 'https://www.instagram.com/runtosip/'
          }
        ]);
      }
    };
    fetchInstagram();
  }, []);

  return (
    <section id="events" className="py-20 bg-gradient-to-br from-gray-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('memoriesInMotion')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t('galleryDescription')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {photos.map((photo, index) => (
            <a
              key={index}
              href={photo.postUrl}
              target="_blank"
              rel="noopener noreferrer"
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
                      <span className="text-sm">{photo.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-white">
                      <MessageCircle className="h-4 w-4" />
                      <span className="text-sm">{photo.comments}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-white">
                      <Instagram className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
        {error && (
          <div className="text-center text-red-500 mt-4">
            Could not fetch Instagram posts. Showing sample photos.
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;