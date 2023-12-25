class ProjectSettings {
    project_id = undefined;
    project_name = undefined;

    has_recursive_piecing = false;

    background_image_zoom = 1.0;
    background_image_opacity = 0.5;
    background_image_max_zoom = 5.0;
    background_image_wheel_sensitivity = 0.00025;
    background_image_translation = { x: 0, y: 0 }; // relative to the center of the project
    background_image_disable_movement = false;
    background_image_display = true;

    aspect_ratio = 1.0;
}

export default ProjectSettings;