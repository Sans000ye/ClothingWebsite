import React, { useEffect, useState } from 'react';
import './Filters.css';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function Filters() {
    const [posts, setPosts] = useState([]);
    const [loading      , setLoading]       = useState(false);
    const [styleFilter  , setStyleFilter] = useState('');
    const [sizeFilter   , setSizeFilter]    = useState('');
    const [loaiFilter   , setLoaiFilter]    = useState('');
    const [mauFilter, setMauFilter] = useState('');
    const [priceRange, setPriceRange] = useState([0, 100]);
    

    const handleStyleChange = (newStyle) => {
        if (setStyleFilter === newStyle) {
            setStyleFilter('');
        }
        setStyleFilter(newStyle);
    };
    const handleSizeChange = (newStyle) => {
        if (setSizeFilter === newStyle) {
            setSizeFilter('');
        }
        setSizeFilter(newStyle);
    };
    const handleTypeChange = (newStyle) => {
        if (setLoaiFilter === newStyle) {
            setLoaiFilter('');
        }
        setLoaiFilter(newStyle);
    };
    const handleColorChange = (newStyle) => {
        if (setMauFilter === newStyle) {
            setMauFilter('');
        }
        setMauFilter(newStyle);
    };
    const handlePriceChange = (event, newValue) => {
        setPriceRange(newValue);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        setLoading(true);
        fetch('https://localhost:7193/api/SanPham')
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

    if (loading) {
        return <div>Loading...</div>;
    }

    const filteredPosts = posts.filter(post => {
        return (
            (styleFilter ? post.Style === styleFilter : true) &&
            (sizeFilter ? post.Size === sizeFilter : true) &&
            (loaiFilter ? post.Loai === loaiFilter : true) &&
            (mauFilter ? post.Mau === mauFilter : true) &&
            (post.Price >= priceRange[0] && post.Price <= priceRange[1])
        );
    }); 

    return (
        <><List>
            <ListItem>
                <h1>Filters</h1>
            </ListItem>
            <Divider variant="middle" component="li" />            
                    <ListItem><a className="btnType" onClick={() => handleTypeChange('Hoodie')}> Hoodie</a></ListItem>
                    <ListItem><a className="btnType" onClick={() => handleTypeChange('Jeans')}> Jeans</a></ListItem>
                    <ListItem><a className="btnType" onClick={() => handleTypeChange('Shirts')}> Shirts</a></ListItem>
                    <ListItem><a className="btnType" onClick={() => handleTypeChange('Shorts')}> Shorts</a></ListItem>
                    <ListItem><a className="btnType" onClick={() => handleTypeChange('T-Shirt')}> T-Shirt</a></ListItem>                                                      
            <Divider variant="middle" component="li" />
                    <ListItem><h2>Price</h2></ListItem>
                    <ListItem>
                        <Box sx={{ width: 300 }}>
                        <Slider
                            value={priceRange}
                            onChange={handlePriceChange}
                            valueLabelDisplay="auto"
                            min={0}
                            max={100}
                        />
                        </Box> 
                    </ListItem>               
            <Divider variant="middle" component="li" />
                <ListItem><h1>Colors</h1></ListItem>
                <ListItem>
                    <ListItem><button className="btnColor" id="C1" onClick={() => handleColorChange('1')} /></ListItem>
                    <ListItem><button className="btnColor" id="C2" onClick={() => handleColorChange('2')} /></ListItem>
                    <ListItem><button className="btnColor" id="C3" onClick={() => handleColorChange('3')} /></ListItem>
                    <ListItem><button className="btnColor" id="C4" onClick={() => handleColorChange('4')} /></ListItem>
                    <ListItem><button className="btnColor" id="C5" onClick={() => handleColorChange('5')} /></ListItem>
                </ListItem>
                <ListItem>
                    <ListItem><button className="btnColor" id="C6" onClick={() => handleColorChange('6')} /></ListItem>
                    <ListItem><button className="btnColor" id="C7" onClick={() => handleColorChange('7')} /></ListItem>
                    <ListItem><button className="btnColor" id="C8" onClick={() => handleColorChange('8')} /></ListItem>
                    <ListItem><button className="btnColor" id="C9" onClick={() => handleColorChange('9')} /></ListItem>
                    <ListItem><button className="btnColor" id="C10" onClick={() => handleColorChange('10')} /></ListItem>       
                </ListItem>         
            <Divider variant="middle" component="li" />
            <ListItem>
                <div>
                    <ListItem><h1>Size</h1></ListItem>
                    <ListItem><a className="btnSize" onClick={() => handleSizeChange('XXS')}>XX-Small</a></ListItem>
                    <ListItem><a className="btnSize" onClick={() => handleSizeChange('XS')}>X-Small</a></ListItem>
                    <ListItem><a className="btnSize" onClick={() => handleSizeChange('S')}>Small</a></ListItem>
                    <ListItem><a className="btnSize" onClick={() => handleSizeChange('M')}>Medium</a></ListItem>
                    <ListItem><a className="btnSize" onClick={() => handleSizeChange('L')}>Large</a></ListItem>
                    <ListItem><a className="btnSize" onClick={() => handleSizeChange('XL')}>X-Large</a></ListItem>
                    <ListItem><a className="btnSize" onClick={() => handleSizeChange('XXL')}>XX-Large</a></ListItem>
                    <ListItem><a className="btnSize" onClick={() => handleSizeChange('XXXL')}>3X-Large</a></ListItem>
                    <ListItem><a className="btnSize" onClick={() => handleSizeChange('XXXXL')}>4X-Large</a></ListItem>
                </div>
            </ListItem>
            <Divider variant="middle" component="li" />
            <ListItem>
                <div>
                    <ListItem><h1>Dress Style</h1></ListItem>
                    <ListItem><a className="btnStyle" onClick={() => handleStyleChange('Casual')}>Casual</a></ListItem>
                    <ListItem><a className="btnStyle" onClick={() => handleStyleChange('Formal')}>Formal</a></ListItem>
                    <ListItem><a className="btnStyle" onClick={() => handleStyleChange('Gym')}>Gym</a></ListItem>
                    <ListItem><a className="btnStyle" onClick={() => handleStyleChange('Party')}>Party</a></ListItem>
                </div>
            </ListItem>
        </List>
            </>
    );
}

export default Filters;