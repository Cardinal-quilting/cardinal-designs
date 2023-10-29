import { Component } from "react";

import logo from "logos/CardinalQuiltsSmallLogo.png"

class Project extends Component {
    static defaultProps = {
        display_scale_factor: 1.0,
    }

    render() {
        return ( 
        <div>
            <img src={logo} className="logo" alt="logo"
                style={{
                    transform: `scale(${this.props.display_scale_factor})`,
                    height: "50vh",
                
            }}/>
        </div>
        );
    }
}

export default Project;