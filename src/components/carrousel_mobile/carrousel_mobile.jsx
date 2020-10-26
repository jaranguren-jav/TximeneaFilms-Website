import React, { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom';
import './carrousel_mobile.scss';
import pic1 from './assets/images/pic_1.png'
import pic2 from './assets/images/pic_2.png'
import pic3 from './assets/images/pic_3.png'
import pic4 from './assets/images/pic_4.png'
import pic5 from './assets/images/pic_5.png'
import disp from './assets/images/disp.jpg'

import switchEffect from "./hover-effect.js";

function CarrouselMobile({ currentPage, setCurrentPage }) {

    const [isfirstTime, changeFirstTime] = useState(true)
    const images = [pic1, pic1, pic2, pic3, pic4, pic5]
    const titles = ['7 OF JULY', 'THE FLOKA', 'TOC', 'IVORY TUSK', '']
    let imageSwitch = useRef(null);

    useEffect(() => {

        new switchEffect({
            parent: imageSwitch.current,
            currentImg: images[currentPage],
            nextImg: images[currentPage + 1],
            displacementImage: disp,
            imagesRatio: 0.55,
            speedIn: 1,
            speedOut: 1,
            page: currentPage,
            isfirstTime: isfirstTime
        });

    }, [currentPage, isfirstTime, images]);


    return (
        <div className="carrousel_mobile">
            <h1 className="carrousel_mobile_title">{titles[currentPage]}</h1>
            <Link to="/project" className="carrousel_mobile_image" ref={imageSwitch}>
                <canvas></canvas>
            </Link>
            <div className="carrousel_mobile_next" onClick={() => { currentPage + 1 > 4 ? setCurrentPage(0) : setCurrentPage(currentPage + 1); changeFirstTime(false); }}></div>
        </div>
    );
}

export default CarrouselMobile;
