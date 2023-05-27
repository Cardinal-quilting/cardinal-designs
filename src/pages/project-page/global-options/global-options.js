import React, { Component } from "react";

import BackgroundImageOptions from "./background-image-options";

class GlobalOptions extends Component {
    render() {
        return ( 
            <div>
                <BackgroundImageOptions
                    title="Background image"
                />
            </div>
        )
    }
}

export default GlobalOptions;