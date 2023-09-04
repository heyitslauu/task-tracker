import DomModule from "./modules/dom";
import { Tasks, Project } from "./modules/tasks";

document.addEventListener('DOMContentLoaded', () => {
    const taskManager = new Tasks();
    DomModule.renderTasks(taskManager.getTasks());
    DomModule.renderProjects();
})