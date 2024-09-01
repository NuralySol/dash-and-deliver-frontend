import './MenuComponent.css'

const MenuComponent = ({ isOpen, onClose, menuItems }) => {
    if (!isOpen) return null;

    return (
        <div className='menu-overlay'>
            <div className='menu-content'>
                <button className='menu-close-button' onClick={onClose}>X</button>
                <h3>Menu</h3>
                <ul>
                    {menuItems.length > 0 ? (
                        menuItems.map(item => (
                            <li key={item._id}>  {/* Ensure each list item has a unique key */}
                                {item.item_name} - ${item.price}
                            </li>
                        ))
                    ) : (
                        <p>No menu items available.</p>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default MenuComponent;