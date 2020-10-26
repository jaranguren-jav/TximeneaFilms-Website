
import React, { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom';
import './carrousel.scss';
import backgroundVideo_1 from './assets/video/backgroundvideo_1.mp4';
import backgroundVideo_2 from './assets/video/backgroundvideo_2.mp4';
import backgroundVideo_3 from './assets/video/backgroundvideo_3.mp4';
import backgroundVideo_4 from './assets/video/backgroundvideo_4.mp4';
import backgroundVideo_5 from './assets/video/backgroundvideo_5.mp4';
import pic1 from './assets/images/pic_1.png'
import pic2 from './assets/images/pic_2.png'
import pic3 from './assets/images/pic_3.png'
import pic4 from './assets/images/pic_4.png'
import pic5 from './assets/images/pic_5.png'
import disp from './assets/images/disp.jpg'

import switchEffect from "./hover-effect.js";

function Carrousel({ currentPage, setCurrentPage }) {

    const [isfirstTime, changeFirstTime] = useState(true)

    const images = [pic1, pic1, pic2, pic3, pic4, pic5]
    const videos = [backgroundVideo_1, backgroundVideo_2, backgroundVideo_3, backgroundVideo_4, backgroundVideo_5]
    const titles = ['7 OF JULY', 'IN THE FLOKA', 'TOC', 'IVORY TUSK','']
    let imageSwitch = useRef(null);
    let videoSwitch = useRef(null);
    let arrowPrev = useRef(null);
    let arrowNext = useRef(null);

    useEffect(() => {

        videoSwitch.current.load()

        new switchEffect({
            parent: imageSwitch.current,
            currentImg: images[currentPage],
            nextImg: images[currentPage + 1],
            displacementImage: disp,
            imagesRatio: 0.6,
            speedIn: 1,
            speedOut: 1,
            page: currentPage,
            isfirstTime: isfirstTime
        });

    }, [currentPage, isfirstTime, images]);


    return (
        <div className="carrousel">
            <div className={currentPage - 1 < 0 ? "carrousel_noClick" : "carrousel_prev"} ref={arrowPrev} onClick={() => { setCurrentPage(currentPage - 1); currentPage - 1 < -1 ? changeFirstTime(true) : changeFirstTime(false); }}></div>
            <h1 className="carrousel_title">{titles[currentPage]}</h1>
            {currentPage === 4 ? <div className="carrousel_image" ref={imageSwitch}><canvas></canvas></div>:
            <Link to="/project" className="carrousel_image" ref={imageSwitch}>
                <canvas></canvas>
            </Link>}
            <div className={currentPage + 1 > 4 ? "carrousel_noClick" : "carrousel_next"} ref={arrowNext} onClick={() => { currentPage + 1 > 4 ? setCurrentPage(currentPage) : setCurrentPage(currentPage + 1); changeFirstTime(false); }}></div>
            <video autoPlay loop muted className="carrousel_background" ref={videoSwitch}>
                <source src={videos[currentPage]} type='video/mp4' poster={images[currentPage]} />
            </video>
        </div>
    );
}

export default Carrousel;
