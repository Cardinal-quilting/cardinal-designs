import { Component } from "react";

class RecursivePiecing extends Component {
    render() {
        const [height, width] = this.props.project_dimensions();
        const height_px = String(height) + "px", width_px = String(width) + "px";

        return (
            <div
            style={{
                position: "absolute",
                alignItems: "center",
                justifyContent: "center",
                display: "grid",
                minWidth: width_px, 
                maxWidth: width_px,
                minHeight: height_px, 
                maxHeight: height_px,
            }}
            >
                <div
                    style={{
                        borderRadius: "100%",
                        width: "10px", 
                        height: "10px",
                        backgroundColor: "red",
                        transform: `translate(${width/2.0}px, ${height/2.0}px)`,                
                    }}
                >

                </div>
            </div>
        );
    }
}

export default RecursivePiecing;