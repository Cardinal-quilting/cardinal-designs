import React from 'react';

import { useLocation } from "react-router-dom";

import ProjectDisplay from 'user-interface/project-display';

import NavigationBar from 'infrastructure/navigation-bar';

import Project from 'projects/project';

import 'styles/pages/project-page.css';

function ProjectPage() {
    const location = useLocation();

    //const project_info = JSON.parse(new URLSearchParams(location.search).get("info"));
    //console.log(project_info);
        
    // create a new project
    //var project = new Project(JSON.parse(location.state));

    return (
        <div className="Project-body">
        {/* put a navation bar at the top of the page */}
        <NavigationBar />
        
        <div className="top-menu">
            VIEWS
        </div>        
        <div className="row">
        <div className="left-menu">
            PROJECT MODES
        </div>
        <ProjectDisplay />
        <div className="right-menu">
            LOCAL OPTIONS
        </div>
        </div>        
        <div className="bottom-menu">
            DIAGNOSTIC INFORMATION
        </div>
        </div>
    )
}

export default ProjectPage;