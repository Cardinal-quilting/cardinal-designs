import React from "react";

import Popup from "infrastructure/popup";

import "styles/pages/launch-page/load-project-popup.css";

import Button from "infrastructure/button";

//import Dialog from 'electron-dialog';
//import { remote } from "electron";
//const fs = require("fs");




/**
 * A popup window that loads an existing project.
 */
class LoadProjectPopup extends Popup {
    constructor(props) {
        super(props);

        this.file_input_ref = React.createRef();
        this.upload_file = this.upload_file.bind(this);
    }

    upload_file() {
        this.file_input_ref.current.click();
    }

    get_file(event) {
        var info = JSON.stringify({
            name: event.target.files[0].name
        });
        window.location.href = `/project?info=${info}`;
    }

    /**
     * @returns The JSX for the object that submits the form 
     */
    submit() {
        return (
                <Button 
                    name="Choose file"
                    font_size="5vmin"
                    font_weight="bold"
                    on_click={this.upload_file}
                    background_color={getComputedStyle(document.documentElement).getPropertyValue("--dark-red-theme")}  
                    margin={{
                        x: "5vw",
                        y: "1vh"
                    }}
                    key="choose-file-button"
                >
                    {/*<input directory="" webkitdirectory="" type="file" />*/}

                    <input
                        className="file-input" 
                        id="file-input" 
                        type="file" 
                        ref={this.file_input_ref}
                        onChange={this.get_file}
                        style={{
                            display: "none"
                        }}/>
                </Button>
            
            
            
        );
    }
}

export default LoadProjectPopup; 