import { useState, useEffect } from "react";
import "../styles/ImageModal.css";

// Store scroll outside component (shared across re-renders)
let previousScrollY = 0;

const ImageModal = ({ isOpen, imageUrl, onClose }) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [imgSrc, setImgSrc] = useState('');
  const [isClosing, setIsClosing] = useState(false);

  // Set image src from string or imported image
  useEffect(() => {
    if (imageUrl) {
      if (typeof imageUrl === 'string') {
        setImgSrc(imageUrl);
      } else if (typeof imageUrl === 'object') {
        setImgSrc(imageUrl.default || imageUrl);
      }
    }
  }, [imageUrl]);

  // Handle image zoom
  const handleImageClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const image = e.currentTarget.querySelector('img');
    if (!image) return;

    if (zoomLevel === 1) {
      const rect = image.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setZoomPosition({ x, y });
      setZoomLevel(2.5);
    } else {
      setZoomLevel(1);
      setZoomPosition({ x: 0, y: 0 });
    }
  };

  // 🔥 Modal Close with scroll restore
  const handleClose = () => {
    setIsClosing(true);

    // Remove scroll lock styles
    document.body.style.removeProperty('position');
    document.body.style.removeProperty('top');
    document.body.style.removeProperty('width');
    document.body.style.removeProperty('overflow');
    document.body.style.removeProperty('height');

    // Scroll back to original position
    window.scrollTo(0, previousScrollY);

    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  // Reset zoom when modal reopens
  useEffect(() => {
    if (isOpen) {
      setZoomLevel(1);
      setZoomPosition({ x: 0, y: 0 });
      setIsClosing(false);
    }
  }, [isOpen, imageUrl]);

  // 🔒 Lock scroll when modal opens
  useEffect(() => {
    if (isOpen) {
      previousScrollY = window.scrollY;

      // Lock the body at current scroll position
      document.body.style.position = 'fixed';
      document.body.style.top = `-${previousScrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100%';
    }

    return () => {
      // Restore scroll manually here too in case of unmount
      if (!isOpen) {
        document.body.style.removeProperty('position');
        document.body.style.removeProperty('top');
        document.body.style.removeProperty('width');
        document.body.style.removeProperty('overflow');
        document.body.style.removeProperty('height');
        window.scrollTo(0, previousScrollY);
      }
    };
  }, [isOpen]);

  // Escape key closes modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;

  return (
    <div
      className={`image-modal-overlay ${isClosing ? 'closing' : ''}`}
      onClick={handleClose}
    >
      <div
        className={`image-modal-content ${isClosing ? 'closing' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="image-modal-close" onClick={handleClose}>
          &times;
        </button>
        <div
          className={`image-modal-container ${zoomLevel > 1 ? 'zoomed' : ''}`}
          onClick={handleImageClick}
        >
          <img
            src={imgSrc || imageUrl}
            alt="Preview"
            className="modal-image"
            style={{
              transform: `scale(${zoomLevel})`,
              transformOrigin:
                zoomLevel > 1
                  ? `${zoomPosition.x}% ${zoomPosition.y}%`
                  : 'center center',
              maxHeight: '90vh',
              maxWidth: '90vw',
            }}
            title={zoomLevel === 1 ? 'Click to zoom in' : 'Click to zoom out'}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
