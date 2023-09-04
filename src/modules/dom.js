import { Tasks } from './tasks';
import { Project } from './projects';

const DomModule = (() => {

    //TODO:  Group the element selectors

    //Buttons
    const btnAdd = document.getElementById('btn-add');
    const btnProject = document.getElementById('btn-project')
    const btnClose = document.querySelector('.btn-close');
    const projectClose = document.getElementById('btnProj-close');

    //Dialogs
    const formDialog = document.getElementById('formDialog')
    const projectDialog = document.getElementById('projectDialog')
    const detailsDialog =  document.getElementById('detailsDialog');

    //Containers
    const taskContent = document.getElementById('task-content')
    const projContainer = document.querySelector('.projects-container');
    const detailsInfo = document.getElementById('details-info')
    
    //Form
    const taskInput = document.getElementById('task-input');
    
    //Side items nav 
    const sideBarNav = document.querySelectorAll('.side-items');

    const taskManager = new Tasks();
    const taskArray = taskManager.getTasks();
    
    const projects = new Project();

    // Default active project
    let activeProjectId = ''

    // Render tasks based on which array
    function renderTasks(arr) {
        let text = ''
        taskContent.innerHTML = '';
        
        arr.forEach((task, index) => {
            text += `<div class="task">

            <p class="task-name">${task.title}</p>

            <p class="task-details task-detail" data-index="${index}">Details</p>
            <i class="fa-regular fa-pen-to-square task-item__controls task-edit" data-index="${index}"></i>
            <i class="fa-solid fa-trash-can task-item__controls task-delete" data-id="${task.id}"></i>
        </div>`
        })

        taskContent.innerHTML = text

        const taskDetails = document.querySelectorAll('.task-detail');
        const taskDelete = document.querySelectorAll('.task-delete');
        
        // Attach click-events on all details button
        taskDetails.forEach(task => {
            task.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index'); 

                //Pass the current array to find the index in it
                showDetails(arr, index);
                detailsDialog.classList.add('active')
            });
        })
        // Attach click-events on all delete button
        taskDelete.forEach((task) => {
            task.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-id');
                taskManager.removeTask(arr, index);

                renderTasks(arr);
            })
        })

        //TODO: Edit button
    }   

    function showDetails(arr, index) { 
        detailsInfo.innerHTML = ''
        const details = document.createElement('div');

        let taskInfo = taskManager.showTask(arr, index);

        details.innerHTML = `<div class="flex project-header">
                <h3>${taskInfo.title}</h3>
                <div>${taskInfo.dueDate}</div>
            </div>
            <div>
                ${taskInfo.details}
            </div>
        `
        detailsInfo.append(details)

        detailsInfo.addEventListener('click', () => {
            detailsDialog.classList.remove('active')
        })
    }
    
    // Render side-bar projects
    function renderProjects(arr) {
        let text = '';
        projContainer.innerHTML = '';

        arr.forEach((project) => {
            text += `<div class="flex project-item" data-id="${project.id}">
            <i class="fa-regular fa-folder"></i>
            <p>${project.name}</p>
        </div>`
        })

        projContainer.innerHTML = text

        const projectItems = document.querySelectorAll('.project-item');
        projectItems.forEach((item) => {
            item.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
              
                let projectItem = projects.showProject(id)
                activeProjectId = projectItem.id;
                renderProjectContent(projectItem);
            })
        })
    }

    function renderProjectContent(projectItem) {
        let projectTaskName = projectItem.name
        let projectTasks = projectItem.tasks;

        taskContent.innerHTML = ''

        let text = `<div class="project">
            <div class="flex project-header">
                <div class="flex">
                    <i class="fa-regular fa-folder"></i>
                    <h2>${projectItem.name}</h2>
                </div>
                <button class="project-task btn-create" id="project-task"> Add Task</button>
            </div>
        </div>`

        taskContent.innerHTML = text;

        projectTasks.forEach((task, index) => {
            const divItem = document.createElement('div');
            divItem.innerHTML = `<div class="task">
                <p class="task-name">${task.title}</p>
                <p class="task-details task-detail" data-index="${index}">Details</p>
                <i class="fa-regular fa-pen-to-square task-item__controls task-edit" data-index="${index}"></i>
                <i class="fa-solid fa-trash-can task-item__controls task-delete" data-id="${task.id}"></i>
            </div>`
            taskContent.appendChild(divItem)
        })


        const createProjectTask = document.getElementById('project-task');
        const projectDialog = document.getElementById('projectDialog');
        
        createProjectTask.addEventListener('click', () => {
            projectDialog.classList.toggle('active')
        })


        //TODO: Show details, Edit, Delete button
        
    }

    taskInput.addEventListener('submit', (e) => {
        e.preventDefault();

        // Form fields
        const title = document.getElementById('proj-title').value;
        const details = document.getElementById('proj-details').value;
        const dueDate = document.getElementById('proj-dueDate').value;
        const priority = document.getElementById('proj-priority').value;

        const formObject = {
            title,
            details,
            dueDate,
            priority,
        };

        // Add task to specific project
        // attach activeProjectId to search which project it belongs
        let newProjectItems = projects.taskToProject(activeProjectId, formObject);

        //Render the new value of specific project updated
        renderProjectContent(newProjectItems)

        // Reset form
        document.getElementById('proj-title').value = ''
        document.getElementById('proj-details').value = ''
        document.getElementById('proj-dueDate').value = ''
        document.getElementById('proj-priority').value = 1

        projectDialog.classList.remove('active')
    })      


    
    // Filter by nav choice (All or Filtered)
    sideBarNav.forEach((nav) => {
        nav.addEventListener('click', (e) => {
            sideBarNav.forEach((item) => {
                item.classList.remove('active');
            });
    
            const routeItem = e.target.getAttribute('data-title');
            let taskItems = taskManager.filterTask(routeItem);
            nav.classList.toggle('active')
            renderTasks(taskItems)
        })
    })


    //Dialog Togglers
    btnAdd.addEventListener('click', () => {
        formDialog.classList.toggle('active')
    })

    btnClose.addEventListener('click', () => {
        formDialog.classList.toggle('active')
    })

    projectClose.addEventListener('click', () => {
        projectDialog.classList.toggle('active')
    })

    btnProject.addEventListener('click', () => {
        // Add new Project on side bar
        if(!btnProject.classList.contains('active')) {
            const newProjectDiv = document.createElement('div');
            newProjectDiv.classList.add('flex')

            let text = ''

            text += `<form autocomplete="off" class="flex" id="form-project">
                <input type="text" name="" id="project_name" placeholder="New Project" required>
                <button type="submit" class="btn-create">Add</button>
            </form>`

            newProjectDiv.innerHTML = text;
            projContainer.prepend(newProjectDiv)

            const projectInput = document.getElementById('project_name');
            
            projectInput.focus();
            btnProject.classList.add('active')
            

            const formProject = document.getElementById('form-project');

            formProject.addEventListener('submit', (e) => {
                e.preventDefault();

                const projectName = document.getElementById('project_name').value

                const formObject = {
                    projectName: projectName
                }

                projects.addProject(formObject)
                btnProject.classList.remove('active')
                
                renderProjects(projects.getProjects());
            })
        }
    })

    formDialog.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const title = document.getElementById('title').value;
        const details = document.getElementById('details').value;
        const dueDate = document.getElementById('dueDate').value;
        const priority = document.getElementById('priority').value;

        const formObject = {
            title,
            details,
            dueDate,
            priority,
        };

        taskManager.addTask(formObject); 

        // Reset the form
        document.getElementById('title').value = '';
        document.getElementById('details').value = '';
        document.getElementById('dueDate').value = '';
        document.getElementById('priority').value = '1';
        
        renderTasks(taskArray);

        //Close the form
        formDialog.classList.toggle('active')
    })


    return { renderTasks, renderProjects }
})();

export default DomModule;