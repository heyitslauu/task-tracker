class Tasks {
    constructor() {
        this.tasks = [
            {
                id: 1,
                title: 'Important 1',
                details: 'Details',
                dueDate: '2023-09-04',
                priorityLevel: 3,
            },
            {
                id: 2,
                title: 'Important 2',
                details: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae molestias odit vel deserunt.',
                dueDate: '2023-09-04',
                priorityLevel: 1,
            },
            {
                id: 3,
                title: 'Mid Important',
                details: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae molestias odit vel deserunt.',
                dueDate: '2023-09-07',
                priorityLevel: 2,
            },
            {
                id: 4,
                title: 'Low Important',
                details: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae molestias odit vel deserunt.',
                dueDate: '2023-09-04',
                priorityLevel: 3,
            },
        ];
        this.nextId = 1// Initialize an id counter
    }

    // Creates Object and pushes to the tasks array
    addTask(formObject){
        const newTask = {
            id: this.nextId++, //
            title: formObject.title,
            details: formObject.details,
            dueDate: formObject.dueDate,
            priorityLevel: formObject.priority,
        };

        // console.log(newTask);
        this.tasks.push(newTask);
    }

    // Returns the whole object based on the index
    showTask(arr,index) {
        return arr[index];
    }
    
    // Gets the index and removes from the array
    removeTask(arr, id) {
        //Find index from the collection
        const index = this.tasks.findIndex((task) => task.id == id);

        //Find index from the current array populated
        const currentArrIndex = arr.findIndex((task) => task.id == id);

        this.tasks.splice(index, 1)// Remove from tasks array
        arr.splice(currentArrIndex, 1)// remove from current populated array
    }

    filterTask(category) {
        const currentDate = new Date(); // Get the current date
        const thisWeek = new Date();

        thisWeek.setDate(new Date().getDate() + 7)

        switch(category) {
            case 'today':
                return this.tasks.filter((task) => task.dueDate == this.formatDate(currentDate));
                break;
            case 'week':
                return this.tasks.filter(task => task.dueDate >= this.formatDate(currentDate) && task.dueDate <= this.formatDate(thisWeek));
                break;
            case 'important':
                return this.tasks.filter(task => task.priorityLevel == 1)
                break;   
            case 'all':
                return this.tasks;
                break;    
            default:
              return this.getTasks();
          }
    }

    formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
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