import React from 'react';
import background_video from './background_video.mp4';
import './about.scss';
import { isBrowser } from "react-device-detect";

function About() {
  return (
    <div className={isBrowser ? "about" : "about_mobile"}>
      <div className="about_description">
        <h1>ABOUT US</h1>
        <h3>We are Tximenea Films, and we are a creative production company based in <b>Barcelona</b>.<br /><br />Its founders lived their childhoods in a little neighborhood of Pamplona called Mendillorri, that place it's known for industrial past wich left a giant chimney (aka <b>Tximenea</b>) that inspires our Name.<br /><br />We like to think of Tximenea films as a industrial chimney, <i>It doesn't STOP</i></h3>
      </div>
      <video autoPlay loop muted className="about_background">
        <source src={background_video} type='video/mp4' />
      </video>
    </div>
  );
}

export default About;
