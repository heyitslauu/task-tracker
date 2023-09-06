import { LocalStorage } from "./localStorage";
const storage = new LocalStorage();


export class Tasks {
    constructor() {
        this.tasks = storage.getStorageItem('tasks') || [];
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
            done: false
        };
        this.tasks.push(newTask);

        storage.setStorageItem('tasks', this.getTasks())
    }

    // Returns the whole object based on the index
    showTask(arr,index) {
        return arr[index];
    }
    
    // Gets the index and removes from the array
    removeTask(arr, id) {
        const index = this.tasks.findIndex((task) => task.id == id);
    
        // BUG: Return the array based on the active filter
        const currentArrIndex = arr.findIndex((task) => task.id == id);
        this.tasks.splice(index, 1)// Remove from tasks array

        storage.setStorageItem('tasks', this.getTasks())
        return this.getTasks();

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
            default:
              return this.getTasks();
          }
    }

    markCompleted(id) {
        const index = this.tasks.findIndex((task) => task.id == id);
        this.tasks[index].done = !this.tasks[index].done;
        storage.setStorageItem('tasks', this.getTasks())
        return this.getTasks();
    }
    editTask(id) {
        const index = this.tasks.findIndex((task) => task.id == id);

        return this.tasks[index];
    }

    updateTask(id, formObject) {
        const index = this.tasks.findIndex((task) => task.id == id);

        this.tasks[index].title = formObject.title
        this.tasks[index].details = formObject.details
        this.tasks[index].dueDate = formObject.dueDate
        this.tasks[index].priorityLevel = formObject.priority
        storage.setStorageItem('tasks', this.getTasks())
        return this.getTasks();
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

    setTasks() {
        this.tasks = storage.getStorageItem('tasks')
    }
}