import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import "../styles/ImageModal.css";

// Helper for scroll locking
const lockScroll = () => {
  // Save the current scroll position
  const scrollY = window.scrollY;
  
  // Add inline styles to body to lock at current position
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollY}px`;
  document.body.style.width = '100%';
  
  // Return a function to unlock scroll
  return () => {
    // Restore the original styles
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    
    // Restore scroll position
    window.scrollTo(0, scrollY);
  };
};

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

  // Modal Close with scroll restore
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 200);
  };

  // Reset zoom when modal reopens
  useEffect(() => {
    if (isOpen) {
      setZoomLevel(1);
      setZoomPosition({ x: 0, y: 0 });
      setIsClosing(false);
    }
  }, [isOpen, imageUrl]);

  // Lock scroll when modal opens, unlock when it closes
  useEffect(() => {
    let unlockScroll;
    
    if (isOpen) {
      unlockScroll = lockScroll();
    }
    
    return () => {
      if (unlockScroll) unlockScroll();
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

  // Don't render anything if modal is not open and not closing
  if (!isOpen && !isClosing) return null;
  
  // Use createPortal to render modal outside normal DOM flow
  return createPortal(
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
    </div>,
    document.body // Render directly to the body
  );
};

export default ImageModal;
