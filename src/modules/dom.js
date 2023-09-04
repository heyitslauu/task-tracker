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

    const taskManager = new Tasks();
    const taskArray = taskManager.getTasks();
    
    const projects = new Project();
    const projectsArray = projects.getProjects();

    // Function to Render Tasks
    function renderTasks() {
        let text = ''
        taskContent.innerHTML = '';
        taskArray.forEach((task, index) => {
            text += `<div class="task">
            <input type="checkbox" id="horns" name="horns" />
            <p class="task-name">${task.title}</p>

            <p class="task-details task-detail" data-index="${index}">Details</p>
            <i class="fa-regular fa-pen-to-square task-item__controls task-edit" data-index="${index}"></i>
            <i class="fa-solid fa-trash-can task-item__controls task-delete" data-index="${index}"></i>
        </div>`
        })

        taskContent.innerHTML = text

        const taskDetails = document.querySelectorAll('.task-detail');
        const taskDelete = document.querySelectorAll('.task-delete');
        
        // Attach click-events on all details button
        taskDetails.forEach(task => {
            task.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index'); // Get the index from data-index attribute
                showDetails(index);
                detailsDialog.classList.add('active')
            });
        })
        // Attach click-events on all delete button
        taskDelete.forEach((task) => {
            task.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index'); // Get the index from data-index attribute
                taskManager.removeTask(index)

                // Call render task to show changes every deletion
                renderTasks();
            })
        })
    }   

    // Show details dialog
    function showDetails(index) { 
        detailsInfo.innerHTML = ''
        const details = document.createElement('div');

        let taskInfo = taskManager.showTask(index);

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
                projects.addProject(projectName)
                

                btnProject.classList.remove('active')
                renderProjects();
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
        
        renderTasks();

        //Close the form
        formDialog.classList.toggle('active')
    })


    return { renderTasks, renderProjects }
})();

export default DomModule;