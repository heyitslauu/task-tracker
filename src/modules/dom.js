import { Tasks, Project } from './tasks';

const DomModule = (() => {

    //TODO:  Group the element selectors
    const btnAdd = document.getElementById('btn-add');
    const btnProject = document.getElementById('btn-project')
    const formDialog = document.getElementById('formDialog')
    const detailsDialog =  document.getElementById('detailsDialog');

    const detailsInfo = document.getElementById('details-info')
    const taskContent = document.getElementById('task-content')
    const btnClose = document.querySelector('.btn-close');
    const projContainer = document.querySelector('.projects-container');

    const sideBarNav = document.querySelectorAll('.side-items');

    const taskManager = new Tasks();
    const taskArray = taskManager.getTasks();
    
    const projects = new Project();
    const projectsArray = projects.getProjects();

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
    function renderProjects() {
        let text = '';
        projContainer.innerHTML = '';

        projectsArray.forEach((project) => {
            text += `<div class="flex project-item">
            <i class="fa-regular fa-folder"></i>
            <p>${project}</p>
        </div>`
        })

        projContainer.innerHTML = text

        const projectItems = document.querySelectorAll('.project-item');
        projectItems.forEach((item) => {
            item.addEventListener('click', () => {
                console.log("clicked");
            })
        })
    }

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

    btnAdd.addEventListener('click', () => {
        formDialog.classList.toggle('active')
    })

    btnClose.addEventListener('click', () => {
        formDialog.classList.toggle('active')
    })

    btnProject.addEventListener('click', () => {

        if(!btnProject.classList.contains('active')) {
            const newProjectDiv = document.createElement('div');
            const projectInput = document.createElement('input')
            const projectSubmit = document.createElement('button');
            projectInput.type = 'text';
            projectInput.style.width = '100%'
            projectInput.required = true;
            projectInput.setAttribute('id', 'project_name')
            projectInput.placeholder = "New project"
            projectSubmit.type = 'button';
            projectSubmit.classList.add('btn-create')
            projectSubmit.textContent = 'Add'
            newProjectDiv.classList.add('flex')
            newProjectDiv.append(projectInput,projectSubmit)
            
            projContainer.prepend(newProjectDiv)
            projectInput.focus();
            btnProject.classList.add('active')
            
            const btnNewProject = document.querySelector('.btn-create');

            //Add new Project
            btnNewProject.addEventListener('click', () => {
                const projectName = document.getElementById('project_name').value

                // Temp solution for empty project name
                if(projectName) {
                    projects.addProject(projectName)
                    btnProject.classList.remove('active')
                    renderProjects();
                }
                else {
                    alert("Project name should not be empty")
                }
                
                
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