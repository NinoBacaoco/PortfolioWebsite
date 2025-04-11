import { useState, useEffect } from "react";
import "../styles/ImageModal.css";

const ImageModal = ({ isOpen, imageUrl, onClose }) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [imgSrc, setImgSrc] = useState('');
  const [isClosing, setIsClosing] = useState(false);

  // Set image source when imageUrl changes
  useEffect(() => {
    if (imageUrl) {
      if (typeof imageUrl === 'string') {
        setImgSrc(imageUrl);
      } else if (typeof imageUrl === 'object') {
        setImgSrc(imageUrl.default || imageUrl);
      }
    }
  }, [imageUrl]);

  // Handle zoom functionality
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

  // Custom close with animation and scroll restoration
  const handleClose = () => {
    const scrollY = parseInt(document.body.style.top || '0') * -1;

    // Restore scroll before unmounting
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.height = '';

    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300); // Sync with your CSS animation
  };

  // Reset zoom when modal reopens
  useEffect(() => {
    if (isOpen) {
      setZoomLevel(1);
      setZoomPosition({ x: 0, y: 0 });
      setIsClosing(false);
    }
  }, [isOpen, imageUrl]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    const preventDefault = (e) => e.preventDefault();

    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';

      window.addEventListener('wheel', preventDefault, { passive: false });
      window.addEventListener('touchmove', preventDefault, { passive: false });
    }

    return () => {
      window.removeEventListener('wheel', preventDefault);
      window.removeEventListener('touchmove', preventDefault);
      // No scroll restoration here anymore
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
              transformOrigin: zoomLevel > 1 ? `${zoomPosition.x}% ${zoomPosition.y}%` : 'center center',
              maxHeight: '90vh',
              maxWidth: '90vw'
            }}
            title={zoomLevel === 1 ? "Click to zoom in" : "Click to zoom out"}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
