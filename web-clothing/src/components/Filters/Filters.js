import React, { useState } from 'react';
import './Filters.css';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Slider from '@mui/material/Slider';



function Filters({ onApply }) {
    const [openSections, setOpenSections] = useState({
        styles: true,
        price: true,
        colors: true,
        sizes: true,
        dressStyle: true,
    });

    const toggleSection = (section) => {
        setOpenSections((prev) => ({
            ...prev,
            [section]: !prev[section], // Toggle the specific section
        }));
    };

    const [styleFilter, setStyleFilter] = useState('');
    const [sizeFilter, setSizeFilter] = useState('');
    const [colorFilter, setColorFilter] = useState('');
    const [priceRange, setPriceRange] = useState([0, 300]);

    const handlePriceChange = (event, newValue) => {
        const minDistance = 10; // Minimum distance between the two thumbs
        const [minPrice, maxPrice] = newValue;

        if (maxPrice - minPrice >= minDistance) {
            setPriceRange(newValue);
        } else if (minPrice === priceRange[0]) {
            // If the left thumb is being moved, enforce the minimum distance
            setPriceRange([minPrice, minPrice + minDistance]);
        } else {
            // If the right thumb is being moved, enforce the minimum distance
            setPriceRange([maxPrice - minDistance, maxPrice]);
        }
    };
    

    const handleApplyFilters = () => {
        const filters = {};
        if (styleFilter) filters.Style = styleFilter;
        if (sizeFilter) filters.Size = sizeFilter;
        if (colorFilter) filters.Mau = colorFilter;
        if (priceRange[0] !== 0) filters.MinPrice = priceRange[0];
        if (priceRange[1] !== 300) filters.MaxPrice = priceRange[1];
    
        console.log("📤 Filters gửi về parent:", filters);
    
        if (onApply) {
            onApply(filters); // ✅ gọi fetchProducts từ Casual.jsx
        }
    };
    

    return (
        <div className="Filters-container">
            <List className="Filters">
                <ListItem>
                    <h1>Filters</h1>
                </ListItem>
                <Divider variant="middle"/>

                {/* Styles Section */}
                <section>
                    <h2
                        onClick={() => toggleSection('styles')}
                        className="dropdown-header"
                    >
                        Styles
                    </h2>
                    <div className={`dropdown-content ${openSections.styles ? 'open' : ''}`}>
                        <div className="button-container">
                            {['Hoodie', 'Jeans', 'Shirts', 'Shorts', 'T-Shirts'].map((style) => (
                                <button
                                    key={style}
                                    className={`btn ${styleFilter === style ? 'selected' : ''}`}
                                    onClick={() => setStyleFilter(styleFilter === style ? '' : style)}
                                >
                                    {style}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
                <Divider variant="middle"/>

                {/* Price Section */}
                <section>
                    <h2
                        onClick={() => toggleSection('price')}
                        className="dropdown-header"
                    >
                        Price
                    </h2>
                    <div className={`dropdown-content price ${openSections.price ? 'open' : ''}`}>
                        <div style={{ position: 'relative', height: '50px' }}>
                            <Slider
                                value={priceRange}
                                onChange={handlePriceChange}
                                valueLabelDisplay="off" /* Disable the default labels */
                                min={0}
                                max={300}
                            />
                            {/* Price Labels */}
                            <div className="price-labels">
                                <span
                                    style={{
                                        position: 'absolute',
                                        left: `${(priceRange[0] / 300) * 100}%`,
                                        transform: priceRange[1] - priceRange[0] < 10 ? 'translateX(-100%)' : 'translateX(-50%)',
                                        textAlign: 'center',
                                    }}
                                >
                                    ${priceRange[0]}
                                </span>
                                <span
                                    style={{
                                        position: 'absolute',
                                        left: `${(priceRange[1] / 300) * 100}%`,
                                        transform: priceRange[1] - priceRange[0] < 10 ? 'translateX(0%)' : 'translateX(-50%)',
                                        textAlign: 'center',
                                    }}
                                >
                                    ${priceRange[1]}
                                </span>
                            </div>
                        </div>
                    </div>
                </section>
                <Divider variant="middle"/>

                {/* Colors Section */}
                <section>
                    <h2
                        onClick={() => toggleSection('colors')}
                        className="dropdown-header"
                    >
                        Colors
                    </h2>
                    <div className={`dropdown-content ${openSections.colors ? 'open' : ''}`}>
                        <div className="button-container">
                            {['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10'].map((colorId) => (
                                <button
                                    key={colorId}
                                    id={colorId}
                                    className={`btn color-btn ${colorFilter === colorId ? 'selected' : ''}`}
                                    onClick={() => setColorFilter(colorFilter === colorId ? '' : colorId)}
                                >
                                    {/* No ">" symbol here */}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
                <Divider variant="middle"/>

                {/* Sizes Section */}
                <section>
                    <h2
                        onClick={() => toggleSection('sizes')}
                        className="dropdown-header"                >
                        Sizes
                    </h2>
                    <div className={`dropdown-content ${openSections.sizes ? 'open' : ''}`}>
                        <div className="button-container">
                            {['XX-Small', 'X-Small', 'Small', 'Medium', 'Large', 'X-Large', 'XX-Large', '3X-Large', '4X-Large'].map((size) => (
                                <button
                                    key={size}
                                    className={`size-btn ${sizeFilter === size ? 'selected' : ''}`}
                                    onClick={() => setSizeFilter(sizeFilter === size ? '' : size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
                <Divider variant="middle"/>

                {/* Dress Style Section */}
                <section>
                    <h2
                        onClick={() => toggleSection('dressStyle')}
                        className="dropdown-header"
                    >
                        Dress Style
                    </h2>
                    <div className={`dropdown-content ${openSections.dressStyle ? 'open' : ''}`}>
                        <div className="button-container">
                            {['Casual', 'Formal', 'Gym', 'Party'].map((style) => (
                                <button
                                    key={style}
                                    className={`btn ${styleFilter === style ? 'selected' : ''}`}
                                    onClick={() => setStyleFilter(styleFilter === style ? '' : style)}
                                >
                                    {style}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
                <Divider variant="middle"/>

                {/* Apply Filters Button */}
                <ListItem>
                    <button className="apply-btn" onClick={handleApplyFilters}>
                        Apply Filters
                    </button>
                </ListItem>
            </List>
        </div>
    );
}

export default Filters;