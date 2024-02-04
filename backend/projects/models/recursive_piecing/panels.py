#from cachetools import cached

from django.db import models

from projects.models.recursive_piecing.recursive_piecing_model import RecursivePiecing

from projects.models.recursive_piecing.nodes import Node
from projects.models.recursive_piecing.lines import Line

class TopPanel(models.Model):
    """
    The top panel of the binary tree that defines the recursive piecing project. 
    The top panel is always the entire project.
    """
    recursive_piecing_project = models.OneToOneField(RecursivePiecing, on_delete=models.CASCADE, related_name="top_panel")

    nodes = models.ManyToManyField(Node)
    lines = models.ManyToManyField(Line)

    name = models.CharField(max_length=100)