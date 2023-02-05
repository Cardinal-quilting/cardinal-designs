import React, { Component } from 'react'

import './../styles/project-page.css';

import NavigationBar from '../infrastructure/navigation-bar';

class ProjectPage extends Component {
    render() {
        return (
            <div>
            <NavigationBar />
            <body class="Project-body">
            </body>
          </div>
        )
    }
}

export default ProjectPage;