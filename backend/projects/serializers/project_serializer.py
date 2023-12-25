from rest_framework import serializers 

from projects.models.project_model import Project

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"
