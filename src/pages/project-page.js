import React, { Component } from 'react'

import './../styles/pages/project-page.css';

import NavigationBar from '../infrastructure/navigation-bar';
import DropdownMenu from '../infrastructure/dropdown-menu';


class ProjectPage extends Component {
    render() {
        return (
            <div className="Project-body">        
            <NavigationBar />
            
            <div className="top-menu">
            <DropdownMenu name="hi"/>
            </div>        
            <div className="row">
            <div className="left-menu"></div>
            <div className="project-display"></div>
            <div className="right-menu"></div>
            </div>
            <div className="bottom-menu">
            </div>        
            </div>
        )
    }
}

export default ProjectPage;