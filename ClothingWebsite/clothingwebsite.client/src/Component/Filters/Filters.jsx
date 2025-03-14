import React, { useEffect, useState } from 'react';
import './Filters.css';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import 'bootstrap/dist/css/bootstrap.css';

function Filters() {
    const [posts, setPosts] = useState([]);
    const [loading      , setLoading]       = useState(false);
    const [styleFilter  , setStyleFilter] = useState('');
    const [sizeFilter   , setSizeFilter]    = useState('');
    const [loaiFilter   , setLoaiFilter]    = useState('');
    const [mauFilter, setMauFilter] = useState('');
    const [priceRange, setPriceRange] = useState([0, 100]);
    const handleStyleChange = (newStyle) => {if (setStyleFilter === newStyle) {setStyleFilter('');}setStyleFilter(newStyle);};
    const handleSizeChange = (newStyle) => {if (setSizeFilter === newStyle) {setSizeFilter('');}setSizeFilter(newStyle);};
    const handleTypeChange = (newStyle) => {if (setLoaiFilter === newStyle) {setLoaiFilter('');}setLoaiFilter(newStyle);};
    const handleColorChange = (newStyle) => {if (setMauFilter === newStyle) {setMauFilter('');}setMauFilter(newStyle);};
    
        const [value, setValue] = useState([0, 300]);
        const minDistance = 10;
      
        const handlePriceChange = (event, newValue, activeThumb) => {
          if (!Array.isArray(newValue)) return;
      
          if (activeThumb === 0) {
            setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
          } else {
            setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
          }
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
                <ListItem><h1>Filters</h1></ListItem><img className='Filter-icon' src="src/assets/Filter/filter.png" alt="*" />
            </ListItem>
            <Divider variant="middle" component="li" />            
                    <ListItem className='list-content'><ListItem><a className="btnType" onClick={() => handleTypeChange('Hoodie')}> Hoodie</a></ListItem><img className='Filter-icon' src="src/assets/Filter/bracket.svg" alt="*" /></ListItem>
                    <ListItem className='list-content'><ListItem><a className="btnType" onClick={() => handleTypeChange('Jeans')}> Jeans</a></ListItem><img className='Filter-icon' src="src/assets/Filter/bracket.svg"  alt="*" /></ListItem>
                    <ListItem className='list-content'><ListItem><a className="btnType" onClick={() => handleTypeChange('Shirts')}> Shirts</a></ListItem><img className='Filter-icon' src="src/assets/Filter/bracket.svg"  alt="*" /></ListItem>
                    <ListItem className='list-content'><ListItem><a className="btnType" onClick={() => handleTypeChange('Shorts')}> Shorts</a></ListItem><img className='Filter-icon' src="src/assets/Filter/bracket.svg"  alt="*" /></ListItem>
                    <ListItem className='list-content'><ListItem><a className="btnType" onClick={() => handleTypeChange('T-Shirt')}> T-Shirt</a></ListItem>   <img className='Filter-icon' src="src/assets/Filter/bracket.svg"  alt="*" /></ListItem>                                                
            <Divider variant="middle" component="li" />
                    <ListItem><h1>Price</h1></ListItem>
                    <ListItem>
                        <Box sx={{ width: 300 }}>
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
                                    '&:before': {
                                        display: 'none'
                                    }
                                    }
                                }}
                                />
                        </ListItem>
                        </Box> 
                    </ListItem>              
            <Divider variant="middle" component="li" />
                <h1>Colors</h1>
                <div className="container">
                    <button className="btn-btnColor" id="C1" onClick={() => handleColorChange('1')}     />
                    <button className="btn-btnColor" id="C2" onClick={() => handleColorChange('2')}     />
                    <button className="btn-btnColor" id="C3" onClick={() => handleColorChange('3')}     />
                    <button className="btn-btnColor" id="C4" onClick={() => handleColorChange('4')}     />
                    <button className="btn-btnColor" id="C5" onClick={() => handleColorChange('5')}     />
                    <br />
                    <button className="btn-btnColor" id="C6" onClick={() => handleColorChange('6')}     />
                    <button className="btn-btnColor" id="C7" onClick={() => handleColorChange('7')}     />
                    <button className="btn-btnColor" id="C8" onClick={() => handleColorChange('8')}     />
                    <button className="btn-btnColor" id="C9" onClick={() => handleColorChange('9')}     />
                    <button className="btn-btnColor" id="C10" onClick={() => handleColorChange('10')}   />
                </div>
            <Divider variant="middle" component="li" />
            <ListItem>
                <div>
                    <h1>Size</h1>
                    
                        <button className="btn-btnSize" onClick={() => handleSizeChange('XXS')}>XX-Small</button>
                        <button className="btn-btnSize" onClick={() => handleSizeChange('XS')}>X-Small</button>
                        <button className="btn-btnSize" onClick={() => handleSizeChange('S')}>Small</button>
                        <button className="btn-btnSize" onClick={() => handleSizeChange('M')}>Medium</button>
                        <button className="btn-btnSize" onClick={() => handleSizeChange('L')}>Large</button>
                        <button className="btn-btnSize" onClick={() => handleSizeChange('XL')}>X-Large</button>
                        <button className="btn-btnSize" onClick={() => handleSizeChange('XXL')}>XX-Large</button>
                        <button className="btn-btnSize" onClick={() => handleSizeChange('XXXL')}>3X-Large</button>
                        <button className="btn-btnSize" onClick={() => handleSizeChange('XXXXL')}>4X-Large</button>                    
                </div>
            </ListItem>
            <Divider variant="middle" component="li" />            
                    <ListItem className='list-content'><ListItem><a className="btnStyle" onClick={() => handleStyleChange('Casual')}>Casual</a></ListItem><img className='Filter-icon' src="src/assets/Filter/bracket.svg" alt="*" /></ListItem>
                    <ListItem className='list-content'><ListItem><a className="btnStyle" onClick={() => handleStyleChange('Formal')}>Formal</a></ListItem><img className='Filter-icon' src="src/assets/Filter/bracket.svg" alt="*" /></ListItem>
                    <ListItem className='list-content'><ListItem><a className="btnStyle" onClick={() => handleStyleChange('Gym')}>Gym</a></ListItem><img className='Filter-icon' src="src/assets/Filter/bracket.svg" alt="*" /></ListItem>
                    <ListItem className='list-content'><ListItem><a className="btnStyle" onClick={() => handleStyleChange('Party')}>Party</a></ListItem><img className='Filter-icon' src="src/assets/Filter/bracket.svg" alt="*" /></ListItem>
            </List>
        </>
    );
}

export default Filters;