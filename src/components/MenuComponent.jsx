import './MenuComponent.css';

const MenuComponent = ({ isOpen, onClose, children, restaurantName }) => {
    if (!isOpen) return null;

    return (
        <div className='menu-overlay'>
            <div className='menu-content'>
                <div className='menu-header'>
                    <h2>{restaurantName}</h2>
                    <button className='menu-close-button' onClick={onClose}>X</button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default MenuComponent;