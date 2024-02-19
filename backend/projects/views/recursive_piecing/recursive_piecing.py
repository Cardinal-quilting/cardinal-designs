from rest_framework.views import APIView 
from rest_framework.response import Response 
from django.core.exceptions import ObjectDoesNotExist

from projects.models.project_model import Project
from projects.models.recursive_piecing.recursive_piecing import RecursivePiecing
from projects.serializers.recursive_piecing_serializer import RecursivePiecingSerializer
from projects.models.recursive_piecing.panels import Panel

class LoadRecursivePiecing(APIView):
    def get(self, request, project_id):
        project = Project.objects.get(id=project_id) 
        data = RecursivePiecingSerializer(project.recursive_piecing).data

        # try:
        #     data["active_panel"] = project.recursive_piecing.active_panel.name
        # except ObjectDoesNotExist:
        #     data["active_panel"] = None
        data["active_panel"] = None

        return Response(data)

class GetAllRecursivePiecingSettings(APIView):
    def get(self, request):
        def get_field(rp, name):
            if name=="project":
                return rp.project.id
            if name=="active_panel":
                try:
                    return rp.active_panel.name                 
                except ObjectDoesNotExist:
                    return None
            return getattr(rp, name)

        # the field name "recursive_piecing_nodes/lines/panels" comes from the nodes/lines/panels that are associated with this project
        detail = [ { field.name: get_field(rp, field.name) 
                    for field in RecursivePiecing._meta.get_fields() 
                    if (field.name!="recursive_piecing_nodes") & (field.name!="recursive_piecing_lines") & (field.name!="recursive_piecing_panels")
                    } 
                    for rp in RecursivePiecing.objects.all() ]

        return Response(detail)

class SaveRecursivePiecingSettings(APIView):
    def post(self, request, project_id):
        # get the project that will be associated with this recursive piecing
        request.data["project"] = project_id

        # if there is an active panel, pop it off the data. this field is set when we save the panels 
        request.data.pop("active_panel", None)

        serializer = RecursivePiecingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({ "success": True, "project_id": project_id })
        return Response({ "success": False, "project_id": project_id, "message": "FAILED: Unable to save recursive piecing settings." })
    