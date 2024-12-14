export function PopupPanel({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <>
      <div className="popup-overlay">
        <div className="popup-content">
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
          {children}
        </div>
      </div>
    </>
  );
}
