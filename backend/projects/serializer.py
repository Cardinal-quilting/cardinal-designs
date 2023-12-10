from rest_framework import serializers 

from .models import Project

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = [
            "project_id", 
            "project_name", 
            "background_image_zoom",
            "background_image_opacity",
            "background_image_max_zoom", 
            "background_image_wheel_sensitivity",
            "background_image_translation",
            "background_image_disable_movement",
            "background_image_display", 
            "aspect_ratio"
        ]
