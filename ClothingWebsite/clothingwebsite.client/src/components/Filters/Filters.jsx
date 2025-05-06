import React, { useState } from 'react';
import './Filters.css';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Slider from '@mui/material/Slider';
import Casual from '../Casual/Casual.jsx';

function Filters({ onApply }) {
    const [openSections, setOpenSections] = useState({
        styles: true,
        price: true,
        colors: true,
        sizes: true,
        dressStyle: true,
        types: true,
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
    const [priceRange, setPriceRange] = useState([0, 200000]);
    const [typeFilter, setTypeFilter] = useState('');

    const handlePriceChange = (event, newValue) => {
        const minDistance = 10000; // Minimum distance between the two thumbs
        const [minPrice, maxPrice] = newValue;

        if (maxPrice - minPrice >= minDistance) {
            setPriceRange(newValue);
        } else if (minPrice === priceRange[0]) {
            setPriceRange([minPrice, minPrice + minDistance]);
        } else {
            setPriceRange([maxPrice - minDistance, maxPrice]);
        }
    };

    const handleApplyFilters = () => {
        // Check if all filters are at their default values
        const isDefault =
            !styleFilter &&
            !sizeFilter &&
            !colorFilter &&
            priceRange[0] === 0 &&
            priceRange[1] === 200000;

        if (isDefault) {
            // Send an empty filter object to reset and get the full list
            if (onApply) {
                onApply({});
            }
            return;
        }

        const filters = {
            maSanPham: "",
            tenSanPham: "",
            maLoai: 0,
            maMau: 0,
            maSize: 0,
            maStyle: 0,
            hinhAnh: "",
            soLuong: 0,
            minGia: priceRange[0],
            maxGia: priceRange[1]
        };

        if (styleFilter) {
            const styleMap = {
                "Casual": 20,
                "Formal": 21,
                "Party": 22,
                "Gym": 23
            };
            filters.maStyle = styleMap[styleFilter] || 0;
        }

        if (sizeFilter) {
            const sizeMap = {
                "XX-Small": 111,
                "X-Small": 112,
                "Small": 113,
                "Medium": 114,
                "Large": 115,
                "X-Large": 116,
                "XX-Large": 117,
                "3X-Large": 118,
                "4X-Large": 119
            };
            filters.maSize = sizeMap[sizeFilter] || 0;
        }

        if (typeFilter) {
            const typeMap = {
                "T-Shirts": 1,
                "Shorts": 2,
                "Shirts": 3,
                "Hoodie": 4,
                "Jeans": 5
            };
            filters.maLoai = typeMap[typeFilter] || 0;
        }

        if (colorFilter) {
            const colorMap = {
                "White": 9,
                "Black": 10,
                "Green": 11,
                "Red": 12,
                "Yellow": 13,
                "Orange": 14,
                "LightBlue": 15,
                "Blue": 16,
                "Purple": 17,
                "Pink": 18
            };
            filters.maMau = colorMap[colorFilter] || 0;
        }

        if (onApply) {
            onApply(filters);
        }
    };

    const colorLabels = [
        { name: "White", code: "White", display: "White" },
        { name: "Black", code: "Black", display: "Black" },
        { name: "Green", code: "Green", display: "Green" },
        { name: "Red", code: "Red", display: "Red" },
        { name: "Yellow", code: "Yellow", display: "Yellow" },
        { name: "Orange", code: "Orange", display: "Orange" },
        { name: "LightBlue", code: "LightBlue", display: "Light Blue" },
        { name: "Blue", code: "Blue", display: "Blue" },
        { name: "Purple", code: "Purple", display: "Purple" },
        { name: "Pink", code: "Pink", display: "Pink" }
    ];

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
                                valueLabelDisplay="off"
                                min={0}
                                max={200000}
                                step={10000}
                                sx={{
                                    color: "#000", // Makes the slider track and thumb black
                                    '& .MuiSlider-thumb': {
                                        backgroundColor: '#000',
                                    },
                                    '& .MuiSlider-track': {
                                        backgroundColor: '#000',
                                    },
                                    '& .MuiSlider-rail': {
                                        backgroundColor: '#ccc',
                                    }
                                }}
                            />
                            <div className="price-labels">
                                <span
                                    style={{
                                        position: 'absolute',
                                        left: `${(priceRange[0] / 200000) * 100}%`,
                                        transform: priceRange[1] - priceRange[0] < 10000 ? 'translateX(-100%)' : 'translateX(-50%)',
                                        textAlign: 'center',
                                    }}
                                >
                                    ${priceRange[0]}
                                </span>
                                <span
                                    style={{
                                        position: 'absolute',
                                        left: `${(priceRange[1] / 200000) * 100}%`,
                                        transform: priceRange[1] - priceRange[0] < 10000 ? 'translateX(0%)' : 'translateX(-50%)',
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
                            {colorLabels.map((color) => (
                                <button
                                    key={color.code}
                                    id={color.code}
                                    className={`btn color-btn ${colorFilter === color.code ? 'selected' : ''}`}
                                    onClick={() => setColorFilter(colorFilter === color.code ? '' : color.code)}
                                >
                                    {/* No text inside the button */}
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