import DomModule from "./modules/dom";

document.addEventListener('DOMContentLoaded', () => {
    DomModule.renderTasks();
    DomModule.renderProjects();
})