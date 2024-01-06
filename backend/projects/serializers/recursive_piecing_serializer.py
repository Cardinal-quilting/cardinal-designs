from rest_framework import serializers 

from projects.models.project_model import Project

from projects.models.recursive_piecing.recursive_piecing_model import RecursivePiecing
from projects.models.recursive_piecing.nodes import Node
from projects.models.recursive_piecing.lines import Line

class RecursivePiecingSerializer(serializers.ModelSerializer):
    project = serializers.PrimaryKeyRelatedField(queryset=Project.objects.all())

    class Meta:
        model = RecursivePiecing
        fields = "__all__"

class NodeSerializer(serializers.ModelSerializer):
    recursive_piecing_project = serializers.PrimaryKeyRelatedField(queryset=RecursivePiecing.objects.all())

    class Meta:
        model = Node
        fields = "__all__"

class LineSerializer(serializers.ModelSerializer):
    recursive_piecing_project = serializers.PrimaryKeyRelatedField(queryset=RecursivePiecing.objects.all())

    class Meta:
        model = Line
        fields = "__all__"