//MenuComponent.jsx
import './MenuComponent.css'

const MenuComponent = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className='menu-overlay'>
            <div className='menu-content'>
                <button className='menu-close-button' onClick={onClose}>X</button>
                {children}
            </div>
        </div>
    )
}

export default MenuComponent