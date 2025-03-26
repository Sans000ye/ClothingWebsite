import React, { useState } from 'react';
import './Filters.css';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Slider from '@mui/material/Slider';
import 'bootstrap/dist/css/bootstrap.css';
import { Button } from 'bootstrap';

function Filters() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [styleFilters, setStyleFilters] = useState([]); // Array for multiple styles
    const [sizeFilters, setSizeFilters] = useState([]); // Array for multiple sizes
    const [loaiFilter, setLoaiFilter] = useState('');
    const [mauFilter, setMauFilter] = useState('');
    const [value, setValue] = useState([0, 300]);
    const minDistance = 10;

    const toggleStyleFilter = (newStyle) => {
        setStyleFilters(prev => 
            prev.includes(newStyle) ? prev.filter(style => style !== newStyle) : [...prev, newStyle]
        );
    };

    const toggleSizeFilter = (newSize) => {
        setSizeFilters(prev => 
            prev.includes(newSize) ? prev.filter(size => size !== newSize) : [...prev, newSize]
        );
    };

    const handlePriceChange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) return;

        if (activeThumb === 0) {
            setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
        } else {
            setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
        }
    };

    const buildQueryString = () => {
        const params = new URLSearchParams();
        if (styleFilters.length > 0) params.append('styles', JSON.stringify(styleFilters));
        if (sizeFilters.length > 0) params.append('sizes', JSON.stringify(sizeFilters));
        if (loaiFilter) params.append('loai', loaiFilter);
        if (mauFilter) params.append('mau', mauFilter);
        params.append('minPrice', value[0]);
        params.append('maxPrice', value[1]);
        return params.toString();
    };

    const fetchProducts = () => {
        setLoading(true);
        const queryString = buildQueryString();
        fetch(`https://localhost:7193/api/SanPham?${queryString}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((json) => {
                setPosts(json);
                setLoading(false);
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
                setLoading(false);
            });
    };

    const handleApplyFilters = () => {
        fetchProducts(); // Call fetchProducts when the button is clicked
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <List>
            <ListItem>
                <ListItemText primary={<h1>Filters</h1>} />
                <img className='Filter-icon-header' src="src/assets/Filter/Setting.svg" alt="*" />
            </ListItem>
            <Divider variant="middle" sx={{bgcolor:"primary.light",margin:2.4}}/>
            <div className="style-button-container">
                {['Hoodie', 'Jeans', 'Shirts', 'Shorts', 'T-Shirts'].map(style => (
                    <div key={style} className='list-content'>
                        <button 
                            className={`btnType ${styleFilters[0] === style ? 'selected' : ''}`} 
                            onClick={() => setStyleFilters([style])} // Set the selected style
                        >
                            {style} <img src="src/assets/Filter/bracket.svg" alt="logo" className="Filter-icon" />
                        </button>
                    </div>
                ))}
            </div>
            <Divider variant="middle" sx={{bgcolor:"primary.light",margin:2.4}}/>
            <ListItem>
                <h1>Price</h1>
            </ListItem>
            <ListItem>
                <Slider
                    value={value}
                    onChange={handlePriceChange}
                    valueLabelDisplay="on"
                    valueLabelFormat={(value) => `$${value}`}
                    disableSwap
                    step={10}
                    min={0}
                    max={300}
                    sx={{
                        color: 'black',
                        '& .MuiSlider-track': {
                            backgroundColor: 'black'
                        },
                        '& .MuiSlider-thumb': {
                            backgroundColor: 'black',
                            '&:hover, &.Mui-focusVisible': {
                                boxShadow: '0 0 0 8px rgba(0, 0, 0, 0.16)'
                            }
                        },                            
                        '& .MuiSlider-valueLabel': {
                            top: 30,
                            backgroundColor: 'transparent',
                            color: 'text.primary',
                            fontSize: '0.75rem',
                            marginTop: 2,
                            textAlign: 'center',
                            '&:before': {
                                display: 'none'
                            }
                        }
                    }}
                />
            </ListItem>
            
            <Divider variant="middle" sx={{bgcolor:"primary.light",margin:2.4}}/>

            <ListItem>
                <h1>Colors</h1>
            </ListItem>
            <div className="container">
                {[...Array(10)].map((_, index) => (
                    <button 
                        key={index} 
                        className={`btn-btnColor ${mauFilter === `${index + 1}` ? 'selected' : ''}`} 
                        id={`C${index + 1}`} 
                        onClick={() => setMauFilter(`${index + 1}`)} // Set the selected color
                    />                       
                ))}                
            </div>
            
            <Divider variant="middle" sx={{bgcolor:"primary.light",margin:2.4}}/>
            
            <ListItem>
                <h2>Sizes</h2>
            </ListItem>
            <div className="size-button-container">
                {['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'XXXXL'].map(size => (
                    <button 
                        key={size} 
                        className={`btn-btnSize ${sizeFilters.includes(size) ? 'selected' : ''}`} 
                        onClick={() => toggleSizeFilter(size)}
                    >
                        {size} 
                    </button>
                ))}
            </div>

            <Divider variant="middle" sx={{bgcolor:"primary.light",margin:2.4}}/>
            <ListItem>
                <h2>Dress Style</h2>
            </ListItem>
            <div className="style-button-container">
                {['Casual', 'Formal', 'Gym', 'Party'].map(style => (
                    <div key={style} className='list-content'>
                        <button 
                            className={`btnStyle ${loaiFilter === style ? 'selected' : ''}`} 
                            onClick={() => setLoaiFilter(style)} // Set the selected dress style
                        >
                            {style} <img src="src/assets/Filter/bracket.svg" alt="logo" className="Filter-icon" />
                        </button>
                    </div>
                ))}
            </div>
            <ListItem>
                <button className="Apply" onClick={handleApplyFilters}>Apply Filter</button>
            </ListItem>
        </List>
    );
}

export default Filters;