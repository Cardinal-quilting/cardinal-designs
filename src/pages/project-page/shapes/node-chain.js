import React, { Component } from "react";

import Node from "pages/project-page/shapes/node";
import Line from "pages/project-page/shapes/line";

import 'styles/pages/project-page/shapes/node-chain.css';

class NodeChain extends Component {
    render() {
        const enabled = this.props.enabled===undefined? true : this.props.enabled;

        const nodes = this.props.points.map( (p) => {
            const point = this.props.access_point(p);

            return (
            <Node 
            z_index={this.props.z_index}
                get_display_info = {this.props.get_display_info}
                display={this.props.display}
                initial_pos={point.position}
                key={point.id}
                enabled={enabled}
                draggable={enabled && point.moveable}
            />
            );
        });

        const lines = this.props.points.map( (p1, index, elements) => {
            const point1 = this.props.access_point(p1);
            const point2 = this.props.access_point(elements[++index%this.props.points.length]);

            return (
            <Line
                z_index={this.props.z_index}
                enabled={enabled}
                get_display_info = {this.props.get_display_info}
                aspect_ratio={this.props.aspect_ratio}
                display={this.props.display}
                point1={point1}
                point2={point2}
                key={point1.id + "-" + point2.id}
            >
            </Line>
            );
        });
        
        return (
            <div
                className="node-chain"
            >                
                { lines.map( (l) => l) }
                { nodes.map( (d) => d) }                    
            </div>
        );
    }
}

export default NodeChain;