import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

const Gallery = () => {
  const [albumsData, setAlbumsData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeImage, setActiveImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Workshops', 'Hackathons', 'Guest Lectures', 'Team Activities'];

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await api.getGallery();
        if (res.success) {
          setAlbumsData(res.data);
        }
      } catch (err) {
        console.error('Failed to load gallery', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const filteredAlbums = albumsData.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.album.category === selectedCategory;
  });

  return (
    <div className="container py-5">
      {/* Title Header */}
      <div className="text-center mx-auto mb-5" style={{ maxWidth: '720px' }}>
        <span className="badge-acm mb-3 d-inline-block">Photo Archives</span>
        <h1 className="display-4 fw-bolder text-white font-heading mb-3">
          Activity <span className="text-gradient-acm">Gallery</span>
        </h1>
        <p className="text-secondary lead fs-6">
          Memories and highlights from hackathons, workshops, and student tech gatherings at <strong className="text-white">MITS ACM STUDENT CHAPTER</strong>.
        </p>
      </div>

      {/* Category Pills */}
      <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`btn btn-sm ${selectedCategory === cat ? 'btn-acm-primary' : 'btn-acm-outline'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-5 text-secondary">
          <div className="spinner-border text-info" role="status"></div>
          <p className="small mt-2">Loading gallery albums...</p>
        </div>
      ) : filteredAlbums.length === 0 ? (
        <div className="acm-card text-center p-5">
          <p className="text-secondary">No photos found in this category.</p>
        </div>
      ) : (
        <div className="d-flex flex-column gap-5">
          {filteredAlbums.map(({ album, images }) => (
            <div key={album.id}>
              <div className="d-flex align-items-center justify-content-between pb-3 mb-4 border-bottom border-secondary border-opacity-25">
                <div>
                  <h3 className="text-white font-heading fw-bold mb-1">{album.title}</h3>
                  {album.description && <p className="text-secondary small mb-0">{album.description}</p>}
                </div>
                <span className="badge bg-primary bg-opacity-25 text-info border border-info border-opacity-25">
                  {album.category}
                </span>
              </div>

              <div className="row g-4">
                {images.map((img) => (
                  <div key={img.id} className="col-12 col-sm-6 col-md-4">
                    <div
                      onClick={() => setActiveImage(img)}
                      className="acm-card overflow-hidden position-relative cursor-pointer"
                      style={{ height: '260px', cursor: 'pointer' }}
                    >
                      <img
                        src={img.image_url}
                        alt={img.caption || album.title}
                        className="w-100 h-100 object-fit-cover"
                        loading="lazy"
                      />
                      <div
                        className="position-absolute bottom-0 start-0 end-0 p-3"
                        style={{ background: 'linear-gradient(to top, rgba(3,7,18,0.9), transparent)' }}
                      >
                        <p className="text-white small fw-semibold mb-0">{img.caption || album.title}</p>
                        {img.date_taken && (
                          <span className="text-secondary opacity-75" style={{ fontSize: '0.7rem' }}>{img.date_taken}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {activeImage && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
          style={{ background: 'rgba(0,0,0,0.9)', zIndex: 1060 }}
          onClick={() => setActiveImage(null)}
        >
          <div className="position-relative text-center" style={{ maxWidth: '850px' }} onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setActiveImage(null)}
              className="btn btn-dark position-absolute top-0 end-0 m-2 rounded-circle"
              style={{ width: '38px', height: '38px' }}
            >
              <i className="bi bi-x-lg"></i>
            </button>
            <img
              src={activeImage.image_url}
              alt={activeImage.caption || 'Preview'}
              className="img-fluid rounded-4 shadow-lg border border-secondary border-opacity-50"
              style={{ maxHeight: '80vh' }}
            />
            {activeImage.caption && (
              <div className="mt-3 text-light small fw-medium bg-dark p-2 rounded-3 border border-secondary border-opacity-25">
                {activeImage.caption}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
