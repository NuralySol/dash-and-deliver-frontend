
import './DeliveryComponent.css';

const Modal = ({ isOpen, message, onClose, deliveryTime }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="modal-title">Order Confirmation</h2>
                <p className="modal-message">{message}</p>
                {deliveryTime && <p className="modal-delivery-time">Your order will be delivered in approximately {deliveryTime} minutes.</p>}
                <button className="modal-button" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Modal;