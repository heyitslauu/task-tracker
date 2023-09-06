import { LocalStorage } from "./localStorage";
const storage = new LocalStorage();

export class Project {
    constructor(name) {
        this.name = name;
        this.projects = storage.getStorageItem('projects') || [];
        
        this.nextId = 1
    }
    // Create new Project/Folder
    addProject(formObject) {
        const newProject = {
            id: this.nextId++,
            name: formObject.projectName,
            tasks: []
        }

        this.projects.push(newProject)

        storage.setStorageItem('projects', this.getProjects())
    }
    // Find which specific project to add the task
    taskToProject(id, formObject) {
        const index = this.projects.findIndex((project) => project.id == id);

        formObject.done = false
        formObject.id = this.nextId++;

        this.projects[index].tasks.push(formObject)
        storage.setStorageItem('projects', this.getProjects())
        return this.projects[index];
    }
    // show specific object in the projects array
    showProject(id) {
        const index = this.projects.findIndex((project) => project.id == id);

        return this.projects[index];
    }

    showTaskProject(projectId, taskId) {
        const projectIndex = this.projects.findIndex((project) => project.id == projectId);
        const taskIndex = this.projects[projectIndex].tasks.findIndex((task) => task.id == taskId)


        return this.projects[projectIndex].tasks[taskIndex]
    }

    editTaskProject(projectId, taskId, formObject) {
        const projectIndex = this.projects.findIndex((project) => project.id == projectId);
        const taskIndex = this.projects[projectIndex].tasks.findIndex((task) => task.id == taskId)

        
        this.projects[projectIndex].tasks[taskIndex].title = formObject.title;
        this.projects[projectIndex].tasks[taskIndex].details = formObject.details;
        this.projects[projectIndex].tasks[taskIndex].dueDate = formObject.dueDate;
        this.projects[projectIndex].tasks[taskIndex].priorityLevel = formObject.priority;
       
        storage.setStorageItem('projects', this.getProjects())
        return this.projects[projectIndex];

    }

    markCompleted(projectId, taskId) {
        const projectIndex = this.projects.findIndex((project) => project.id == projectId);
        const taskIndex = this.projects[projectIndex].tasks.findIndex((task) => task.id == taskId)

        this.projects[projectIndex].tasks[taskIndex].done = !this.projects[projectIndex].tasks[taskIndex].done; 

        storage.setStorageItem('projects', this.getProjects())
        return this.projects[projectIndex];
    }

    deleteTaskProject(projectId, taskId) {
        const projectIndex = this.projects.findIndex((project) => project.id == projectId);
        const taskIndex = this.projects[projectIndex].tasks.findIndex((task) => task.id == taskId)
        
        this.projects[projectIndex].tasks.splice(taskIndex, 1);
        
        storage.setStorageItem('projects', this.getProjects())
        
        return this.projects[projectIndex];
    }
    
    getProjects() {
        return this.projects;
    }

    setProjects() {
        this.projects = storage.getStorageItem('projects')
    }
    
}
