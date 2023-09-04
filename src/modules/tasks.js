class Tasks {
    constructor() {
        this.tasks = [
            {
                title: 'Title',
                details: 'Details',
                dueDate: '2/2/2023',
                priorityLevel: 1,
            },
            {
                title: 'Title2',
                details: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae molestias odit vel deserunt.',
                dueDate: '2/2/2023',
                priorityLevel: 1,
            },
        ];
    }

    // Creates Object and pushes to the tasks array
    addTask(formObject){
        const newTask = {
            title: formObject.title,
            details: formObject.details,
            dueDate: formObject.dueDate,
            priorityLevel: formObject.priority,
        };

        this.tasks.push(newTask);
    }

    // Returns the whole object based on the index
    showTask(index) {
        return this.tasks[index];
    }
    
    // Gets the index and removes from the array
    removeTask(index) {
        this.tasks.splice(index, 1)
    }

    // Returns all the tasks in the array
    getTasks() {
        return this.tasks;
    }
}

class Project {
    constructor(name) {
        this.name = name;
        this.projects = [];
    }

    addProject(formObject) {
        this.projects.push(formObject)
    }


    getProjects() {
        return this.projects;
    }
    
}

export { Tasks, Project };