export class Project {
    constructor(name) {
        this.name = name;
        this.projects = [];
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
    }
    // Find which specific project to add the task
    taskToProject(id, formObject) {
        const index = this.projects.findIndex((project) => project.id == id);

        this.projects[index].tasks.push(formObject)

        return this.projects[index];
    }
    // show specific object in the projects array
    showProject(id) {
        const index = this.projects.findIndex((project) => project.id == id);

        return this.projects[index];
    }
    getProjects() {
        return this.projects;
    }
    
}
