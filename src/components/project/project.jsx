import React from 'react';
import './project.scss';
import data from "./data.json"
import config from "./config.json"
import Particles from 'react-particles-js';

import { withRouter} from 'react-router-dom';
import {isBrowser} from "react-device-detect";


function Project({currentPage, history}) {

  let project = data.projects[currentPage];

  return (
      <div className="project">
        <div className={isBrowser ? "project_wrapper" : "project_wrapper_mobile"}>
        {isBrowser ? <div className="project_backBtn" onClick={(e) => {e.preventDefault();history.goBack()}}>&larr; GO BACK</div> : <div className="project_backBtn_mobile" onClick={(e) => {e.preventDefault();history.goBack()}}></div>}
          <iframe title="Vimeo" className="project_vimeo" src={project.video_link} frameBorder="0" allow="autoplay; fullscreen" allowFullScreen></iframe>
        </div>
        <div className="project_description">
          <h1>{project.title}</h1>
          <div className={isBrowser ? "project_description_synopsis" : "project_description_synopsis_mobile"}>{project.synopsis}</div>
          <ul className="project_description_cast">
            <li><b>Direction: </b>{project.cast.direction}</li>
            <li><b>Script: </b>{project.cast.script}</li>
            <li><b>Photography: </b>{project.cast.photography}</li>
            <li><b>Actors: </b>{project.cast.actors.map((actor => actor.name + actor.role))}</li>
          </ul>
        </div>
        {isBrowser ? <Particles params={config} className="project_background"/> : ""}
      </div>
  );
}

export default withRouter(Project);
