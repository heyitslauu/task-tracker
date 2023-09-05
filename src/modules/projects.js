export class Project {
    constructor(name) {
        this.name = name;
        this.projects = [
            {
                id: 1000,
                name: "JavaScript Calculator Project",
                tasks: [
                    {
                        id: 11,
                        title: 'Design UI',
                        details: 'Create a user-friendly interface for the calculator.',
                        dueDate: '2023-09-10',
                        priorityLevel: 3,
                    },
                    {
                        id: 21,
                        title: 'Implement Basic Functions',
                        details: 'Add functionality for addition, subtraction, multiplication, and division.',
                        dueDate: '2023-09-15',
                        priorityLevel: 2,
                    },
                    {
                        id: 31,
                        title: 'Advanced Features',
                        details: 'Incorporate scientific functions like square root and trigonometric calculations.',
                        dueDate: '2023-09-30',
                        priorityLevel: 1,
                    },
                    {
                        id: 41,
                        title: 'Testing and Bug Fixing',
                        details: 'Thoroughly test the calculator and fix any bugs or issues.',
                        dueDate: '2023-10-05',
                        priorityLevel: 2,
                    },
                ]
            },
            {
                id: 2000,
                name: "Python Web Scraper Project",
                tasks: [
                    {
                        id: 110,
                        title: 'Research and Planning',
                        details: 'Identify target websites and plan the data scraping process.',
                        dueDate: '2023-09-08',
                        priorityLevel: 2,
                    },
                    {
                        id: 210,
                        title: 'Scraping Implementation',
                        details: 'Write Python code to scrape data from selected websites.',
                        dueDate: '2023-09-20',
                        priorityLevel: 3,
                    },
                    {
                        id: 310,
                        title: 'Data Parsing and Storage',
                        details: 'Parse the scraped data and store it in a structured format (e.g., CSV or database).',
                        dueDate: '2023-09-30',
                        priorityLevel: 2,
                    },
                    {
                        id: 410,
                        title: 'Automation and Scheduling',
                        details: 'Implement automation to regularly update the data and schedule scraping tasks.',
                        dueDate: '2023-10-10',
                        priorityLevel: 1,
                    },
                ]
            },
            {
                id: 3000,
                name: "React To-Do List App",
                tasks: [
                    {
                        id: 111,
                        title: 'Component Setup',
                        details: 'Create React components for the to-do list, input form, and task items.',
                        dueDate: '2023-09-12',
                        priorityLevel: 2,
                    },
                    {
                        id: 211,
                        title: 'State Management',
                        details: 'Implement state management to add, delete, and update tasks.',
                        dueDate: '2023-09-18',
                        priorityLevel: 3,
                    },
                    {
                        id: 311,
                        title: 'User Authentication',
                        details: 'Add user authentication for personalized to-do lists.',
                        dueDate: '2023-09-28',
                        priorityLevel: 2,
                    },
                    {
                        id: 411,
                        title: 'Styling and Testing',
                        details: 'Apply CSS styles and perform testing to ensure functionality and usability.',
                        dueDate: '2023-10-05',
                        priorityLevel: 3,
                    },
                ]
            }
        ];
        
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

        formObject.id = this.nextId++;

        this.projects[index].tasks.push(formObject)

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
        
        return this.projects[projectIndex];

    }

    deleteTaskProject(projectId, taskId) {
        const projectIndex = this.projects.findIndex((project) => project.id == projectId);
        const taskIndex = this.projects[projectIndex].tasks.findIndex((task) => task.id == taskId)
        
        this.projects[projectIndex].tasks.splice(taskIndex, 1);
        return this.projects[projectIndex];
    }
    
    getProjects() {
        return this.projects;
    }
    
}
