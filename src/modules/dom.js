import { Tasks } from './tasks';
import { Project } from './projects';
import { LocalStorage } from './localStorage';
import { tasksInit, projectsInit } from './init';

const DomModule = (() => {

    //TODO: Delete Project 

    //FIXME: Refactor localStorage to follow SOLID 

    //Buttons
    const btnAdd = document.getElementById('btn-add');
    const btnProject = document.getElementById('btn-project')
    const btnClose = document.querySelector('.btn-close');
    const projectClose = document.getElementById('btnProj-close');
    const drawerToggler = document.getElementById('drawer-toggler')

    const btnCancel = document.querySelector('.btn-cancel ');
    const btnProjCancel = document.querySelector('.btnProj-cancel')

    const localStorage = new LocalStorage();
    //Dialogs
    const formDialog = document.getElementById('formDialog')
    const projectDialog = document.getElementById('projectDialog')
    const detailsDialog =  document.getElementById('detailsDialog');
    const editDialog =  document.getElementById('editDialog');
    const projectEditDialog =  document.getElementById('projecEditDialog');

    //Containers
    const taskContent = document.getElementById('task-content')
    const projContainer = document.querySelector('.projects-container');
    const detailsInfo = document.getElementById('details-info')
    const sideBar = document.querySelector('.sidebar');
    //Form
    const taskInput = document.getElementById('task-input');
    const editForm = document.getElementById('edit-input')
    const projectEditForm = document.getElementById('projectEdit-input');
    //Side items nav 
    const sideBarNav = document.querySelectorAll('.side-items');

    const taskManager = new Tasks();
    const projects = new Project();



    // Default pointers for ids
    let activeProjectId = ''
    let editTaskId;
    let editProjectTaskId;

    // Render tasks based on which array
    function renderTasks(arr) {
        let text = ''
        taskContent.innerHTML = '';
        
        arr.forEach((task, index) => {
            text += `<div class="task prio-${task.priorityLevel} ${task.done == true ? 'completed' : ''}">
            <input type="checkbox" class="task-checkbox" data-index="${task.id}"} ${task.done == true? 'checked' : ''}>
            <p class="task-name ${task.done == true ? 'done' : ''}">${task.title}</p>

            <p class="task-details task-detail" data-index="${index}">Details</p>
            <i class="fa-regular fa-pen-to-square task-item__controls task-edit button-items" data-id="${task.id}"></i>
            <i class="fa-solid fa-trash-can task-item__controls task-delete button-items" data-id="${task.id}"></i>
        </div>`
        })

        taskContent.innerHTML = text

        const taskDetails = document.querySelectorAll('.task-detail');
        const taskDelete = document.querySelectorAll('.task-delete');
        const taskEdit = document.querySelectorAll('.task-edit');
        const taskCheckBox = document.querySelectorAll('.task-checkbox');
        
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
                
                let returnedArr = taskManager.removeTask(arr, index);

                renderTasks(returnedArr);
            })
        })
        taskEdit.forEach((task) =>  {
            task.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                const taskToEdit = taskManager.editTask(id);
            
                editTaskId = taskToEdit.id

                document.getElementById('edit-title').value = taskToEdit.title;
                document.getElementById('edit-details').value = taskToEdit.details;
                document.getElementById('edit-dueDate').value = taskToEdit.dueDate;
                document.getElementById('edit-priority').value = taskToEdit.priorityLevel;
                
                editDialog.classList.add('active')
            
            })
        })

        taskCheckBox.forEach((cbox) => {
            cbox.style.cursor = 'pointer'
            cbox.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-index')
                let returnedArr = taskManager.markCompleted(id)
                renderTasks(returnedArr)
            })
        })

        btnCancel.addEventListener('click', () => {
            editDialog.classList.remove('active')
        })
        
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
            const projectName = project.name.length > 17 ? project.name.substring(0, 17) + '...' : project.name;
            text += `<div class="flex project-item" data-id="${project.id}">
            <i class="fa-regular fa-folder"></i>
            <p>${projectName}</p>
        </div>`
        })

        projContainer.innerHTML = text

        const projectItems = document.querySelectorAll('.project-item');
        projectItems.forEach((item) => {
            item.addEventListener('click', (e) => {

                sideBarNav.forEach((nav) => {
                    nav.classList.remove('active');

                    if (window.innerWidth <= 800) {
                        // Close the sidebar
                        sideBar.classList.remove('active');
                    }

                });
        
                
                projectItems.forEach((x) => {
                    x.classList.remove('active');

                    if (window.innerWidth <= 800) {
                        // Close the sidebar
                        sideBar.classList.remove('active');
                    }
                });

                const id = e.currentTarget.getAttribute('data-id');

                let projectItem = projects.showProject(id)
                activeProjectId = projectItem.id;

                item.classList.toggle('active')

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
                    <h2>${projectTaskName}</h2>
                </div>
                <div class="flex">
                    <button class="project-task btn-create button-items" id="project-task"> Add Task</button>
                    <button class="project-task btn-trash button-items" id="project-task"> <i class="fa-regular fa-trash-can"></i></button>
                </div>
            </div>
        </div>`

        taskContent.innerHTML = text;

        projectTasks.forEach((task, index) => {
            const divItem = document.createElement('div');
            divItem.innerHTML = `<div class="task prio-${task.priorityLevel} ${task.done == true ? 'completed' : ''}">
                <input type="checkbox" class="project-checkbox" data-index="${task.id}"} ${task.done == true ? 'checked' : ''}>
                <p class="task-name">${task.title}</p>
                <p class="task-details project-detail" data-id="${task.id}">Details</p>
                <i class="fa-regular fa-pen-to-square task-item__controls project-edit button-items" data-id="${task.id}"></i>
                <i class="fa-solid fa-trash-can task-item__controls project-delete button-items" data-id="${task.id}"></i>
            </div>`
            taskContent.appendChild(divItem)
        })


        const createProjectTask = document.getElementById('project-task');
        const projectDialog = document.getElementById('projectDialog');
        
        createProjectTask.addEventListener('click', () => {
            projectDialog.classList.toggle('active')
        })

        const projectDetails = document.querySelectorAll('.project-detail');
        const projectDelete = document.querySelectorAll('.project-delete');
        const projectEdit = document.querySelectorAll('.project-edit');
        const projectCheckbox = document.querySelectorAll('.project-checkbox');

        projectDetails.forEach((detail) => {
            detail.addEventListener('click', (e) =>  {
                const id = e.target.getAttribute('data-id');


                let projectTaskContent = projects.showTaskProject(activeProjectId, id)

                detailsInfo.innerHTML = ''
                const details = document.createElement('div');

                details.innerHTML = `<div class="flex project-header">
                        <h3>${projectTaskContent.title}</h3>
                        <div>${projectTaskContent.dueDate}</div>
                    </div>
                    <div>
                        ${projectTaskContent.details}
                    </div>
                `
                detailsInfo.append(details)
                detailsDialog.classList.add('active')
                detailsInfo.addEventListener('click', () => {
                    detailsDialog.classList.remove('active')
                })
            })
        })

        projectDelete.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');

                let returnedArr = projects.deleteTaskProject(activeProjectId, id)
                renderProjectContent(returnedArr)


            })
        });
    
        projectEdit.forEach((editBtn) => {
            editBtn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id')
                
                let projectTaskContent = projects.showTaskProject(activeProjectId, id)
                
                editProjectTaskId  = projectTaskContent.id;

                document.getElementById('projectEdit-title').value = projectTaskContent.title;
                document.getElementById('projectEdit-details').value = projectTaskContent.details;
                document.getElementById('projectEdit-dueDate').value = projectTaskContent.dueDate;
                document.getElementById('projectEdit-priority').value = projectTaskContent.priorityLevel;
                
                projectEditDialog.classList.add('active')
            })
        })

        btnProjCancel.addEventListener('click', () => {
            projectEditDialog.classList.remove('active')
        })
        
        projectCheckbox.forEach((pbox) => {
            pbox.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-index')
                let returnedArr = projects.markCompleted(activeProjectId, id)
                renderProjectContent(returnedArr)
            })
        })
    }

    taskInput.addEventListener('submit', (e) => {
        e.preventDefault();

        // Form fields
        const title = document.getElementById('proj-title').value;
        const details = document.getElementById('proj-details').value;
        const dueDate = document.getElementById('proj-dueDate').value;
        const priority = Number(document.getElementById('proj-priority').value)

        const formObject = {
            title,
            details,
            dueDate,
            priorityLevel: priority,
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
            const projectItems = document.querySelectorAll('.project-item');
            projectItems.forEach((item) => {
                item.classList.remove('active');
                if (window.innerWidth <= 800) {
                    // Close the sidebar
                    sideBar.classList.remove('active');
                }
            });
            sideBarNav.forEach((item) => {
                item.classList.remove('active');
                if (window.innerWidth <= 800) {
                    // Close the sidebar
                    sideBar.classList.remove('active');
                }
            });
            const routeItem = e.currentTarget.getAttribute('data-title');
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
                <button type="submit" class="btn-create button-items">Add</button>
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
        
        renderTasks(taskManager.getTasks());

        //Close the form
        formDialog.classList.toggle('active')
    })

    editForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('edit-title').value
        const details = document.getElementById('edit-details').value
        const dueDate= document.getElementById('edit-dueDate').value
        const priority = document.getElementById('edit-priority').value

        const formObject = {
            title,
            details,
            dueDate,
            priority,
        };

        let returnedArr = taskManager.updateTask(editTaskId, formObject)
        renderTasks(returnedArr)
        editDialog.classList.remove('active')
    })

    projectEditForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('projectEdit-title').value
        const details = document.getElementById('projectEdit-details').value
        const dueDate= document.getElementById('projectEdit-dueDate').value
        const priority = document.getElementById('projectEdit-priority').value

        const formObject = {
            title,
            details,
            dueDate,
            priority,
        };

        let returnedArr = projects.editTaskProject(activeProjectId, editProjectTaskId, formObject)

        renderProjectContent(returnedArr)
        projectEditDialog.classList.remove('active')
    })

    drawerToggler.addEventListener('click', () => {
        sideBar.classList.toggle('active')
    })

    function initLocalStorage() {
        //Set the taskInit to respective keys
        localStorage.setInitialStorage('tasks', tasksInit)
        localStorage.setInitialStorage('projects', projectsInit)

        // set the initial keys to constructor array
        taskManager.setTasks();
        projects.setProjects();

        // render newly updated task and projects
        renderTasks(taskManager.getTasks())
        renderProjects(projects.getProjects())
    }

    return { initLocalStorage }
})();

export default DomModule;