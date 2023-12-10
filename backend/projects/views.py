from django.shortcuts import render
from rest_framework.views import APIView 
from rest_framework.response import Response 

from .models import Project
from .serializer import ProjectSerializer

class ProjectNamesView(APIView):
    def get(self, request):
        detail = [ { 
            "project_id": detail.project_id, 
            "project_name": detail.project_name
            } for detail in Project.objects.all() ] 
        
        return Response(detail) 

class DeleteProjectView(APIView):
    def delete(self, request, project_id):
        existing_project = Project.objects.get(project_id=project_id)
        existing_project.delete()
        return Response() 
    
class LoadProjectView(APIView): 
    def get(self, request, project_id): 
        project = Project.objects.get(project_id=project_id)
        serializer = ProjectSerializer(project)
        return Response(serializer.data)
  
class SaveProjectView(APIView): 
    def post(self, request): 
        # check to see if we have a project with this id
        existing_project = Project.objects.filter(project_id=request.data.get("project_id"))
        assert(len(existing_project) in {0, 1})

        # delete if it exists (we are about to overwrite it)
        if len(existing_project)>0:
            existing_project[0].delete()

        # check to see if we have a project with this name
        existing_project = Project.objects.filter(project_name=request.data.get("project_name"))
        print(existing_project)
        assert(len(existing_project) in {0, 1})

        # a project with this name already exists, return an error
        if len(existing_project)>0:
            return Response({ "success": False, "message": f"""Project "{existing_project[0].project_name}" already exists.""" }) 

        # save the project to the database
        serializer = ProjectSerializer(data=request.data) 
        if serializer.is_valid(raise_exception=True): 
            serializer.save()
            # return the project id
            return Response({ "success": True, "project_id": serializer.data["project_id"] }) 