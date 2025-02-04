import React, { useState, useEffect } from 'react';
import './ImageCarousel.css';  // Add this import
import image1 from '../pictures/image1.jpg';  // Changed path to pictures folder
import image2 from '../pictures/image2.jpg';
import image3 from '../pictures/image3.jpg';
import image4 from '../pictures/image4.jpg';

function ImageCarousel() {
    const imagenes = [
        { src: image1, id: 1 },
        { src: image2, id: 2 },
        { src: image3, id: 3 },
        { src: image4, id: 4 }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // useEffect(() =>{
    //     const interval = setInterval(() => {
    //         setCurrentIndex((prevIndex)=> prevIndex === imagenes.length -1 ? 0 : prevIndex +1);
    //     }, 4000);
    //     return () => clearInterval(interval);
    // }, [imagenes.length]);

    useEffect(()=> {
        if (!isPaused){
            const timer = setInterval(() => {
                setCurrentIndex((prevIndex)=>(prevIndex+1) % imagenes.length);
            }, 4000);
            return () => clearInterval(timer);
        }
    },[isPaused,imagenes.length]);

    useEffect (() => {
        if (currentIndex >= imagenes.length) {
            setCurrentIndex(0);
        }
    },[imagenes]);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>(prevIndex === 0 ? imagenes.length -1 : prevIndex -1))
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === imagenes.length-1 ? 0 : prevIndex +1));
    }

    return (
        <div className='carousel'>
            <div className="carousel-container">
                <button 
                    onClick={handlePrev}
                    className='carousel-handle-button'
                >
                    ←
                </button>
                
                <img 
                    className='carousel-image'
                    src={imagenes[currentIndex].src} 
                    alt={`Imagen ${currentIndex + 1}`}
                />
                
                <button 
                    onClick={handleNext}
                    className='carousel-handle-button'
                >
                    →
                </button>
            </div>
            
            <div className="button-group">
                <button onClick={() => setIsPaused(true)} className='carousel-paused-button'>
                    Pausar
                </button>
                <button onClick={() => setIsPaused(false)} className='carousel-paused-button'>
                    Reanudar
                </button>
            </div>
        </div>
    );
}

export default ImageCarousel;
