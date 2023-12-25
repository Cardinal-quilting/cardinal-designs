from rest_framework import serializers 

from projects.models.project_model import Project

from projects.models.recursive_piecing.recursive_piecing_model import RecursivePiecing

class RecursivePiecingSerializer(serializers.ModelSerializer):
    project = serializers.PrimaryKeyRelatedField(queryset=Project.objects.all())

    class Meta:
        model = RecursivePiecing
        fields = "__all__"