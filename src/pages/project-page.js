import React, { Component } from 'react';

import ProjectDisplay from 'user-interface/project-display';

import NavigationBar from 'infrastructure/navigation-bar';

import 'styles/pages/project-page.css';

/**
 * The top page for a user to interact with a Cardinal Designs project
 */
class ProjectPage extends Component {
    render() {
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
}

export default ProjectPage;