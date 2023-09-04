import DomModule from "./modules/dom";
import { Tasks } from "./modules/tasks";
import { Project } from "./modules/projects";

document.addEventListener('DOMContentLoaded', () => {
    const taskManager = new Tasks();
    const projectManager = new Project();
    DomModule.renderTasks(taskManager.getTasks());
    DomModule.renderProjects(projectManager.getProjects());
})