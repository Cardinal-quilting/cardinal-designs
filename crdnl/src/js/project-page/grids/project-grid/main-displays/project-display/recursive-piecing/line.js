import DrawLine from "js/infrastructure/draw_line";

class RecursivePiecingLine extends DrawLine {
    project_to_line(x, y) {
        const x1pos = this.props.start_point.x, y1pos = this.props.start_point.y,
              x2pos = this.props.end_point.x, y2pos = this.props.end_point.y;
  
        // compute the distance to the line
        const xdiff = x2pos - x1pos, ydiff = y2pos - y1pos;
        const nrm2 = ydiff*ydiff + xdiff*xdiff;
        const distance = Math.abs(ydiff*x - xdiff*y + x2pos*y1pos - y2pos*x1pos)/Math.sqrt(nrm2);
  
        // did the user click the line
        const on_line = distance<0.5*this.props.thickness/Math.min(this.props.project_height, this.props.project_width)
  
        // calculate the dot product of the vector (x1pos, y1pos)->(x, y) and the direction vector
        var dot = ((x-x1pos)*xdiff + (y-y1pos)*ydiff) / nrm2;
  
        // clamp the dot product to the range [0, 1] to ensure the projected point lies on the line segment
        dot = Math.max(0.0, Math.min(1.0, dot));
  
        // calculate the coordinates of the projected point
        var projx = x1pos + dot * xdiff;
        var projy = y1pos + dot * ydiff;
  
        return {on_line: on_line, distance: distance, point: {x: projx, y: projy}};
    }
}

export default RecursivePiecingLine;