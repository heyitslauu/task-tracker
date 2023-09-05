export class Tasks {
    constructor() {
        this.tasks = [
            {
                id: 1000,
                title: 'Read a Book',
                details: 'Read the latest novel you purchased.',
                dueDate: '2023-09-10',
                priorityLevel: 3,
            },
            {
                id: 2000,
                title: 'Walk the Dog',
                details: 'Take your dog for a walk in the park for at least 30 minutes.',
                dueDate: '2023-09-05',
                priorityLevel: 1,
            },
            {
                id: 3000,
                title: 'Grocery Shopping',
                details: 'Make a list and buy groceries for the week.',
                dueDate: '2023-09-07',
                priorityLevel: 2,
            },
            {
                id: 4000,
                title: 'Write a Journal Entry',
                details: 'Reflect on your day and write a journal entry about your thoughts and experiences.',
                dueDate: '2023-09-04',
                priorityLevel: 3,
            },
            {
                id: 5000,
                title: 'Exercise Session',
                details: 'Complete a 30-minute workout session to stay healthy and fit.',
                dueDate: '2023-09-06',
                priorityLevel: 2,
            },
            {
                id: 6000,
                title: 'Work on a Coding Project',
                details: 'Spend 2 hours working on your personal coding project or learning a new programming language.',
                dueDate: '2023-09-08',
                priorityLevel: 1,
            },
            {
                id: 7000,
                title: 'Prepare for a Meeting',
                details: 'Review meeting agenda and gather necessary documents for tomorrow\'s meeting.',
                dueDate: '2023-09-05',
                priorityLevel: 2,
            },
            {
                id: 8000,
                title: 'Call a Friend',
                details: 'Catch up with a friend or family member over the phone for at least 20 minutes.',
                dueDate: '2023-09-10',
                priorityLevel: 3,
            },
            {
                id: 9000,
                title: 'Home Renovation',
                details: 'Plan and start renovations for the living room.',
                dueDate: '2023-09-15',
                priorityLevel: 1,
            },
            {
                id: 10000,
                title: 'Learn a New Language',
                details: 'Begin learning a new language for personal or professional growth.',
                dueDate: '2023-09-20',
                priorityLevel: 2,
            },
            {
                id: 11000,
                title: 'Write a Blog Post',
                details: 'Create an informative blog post on a topic of your choice.',
                dueDate: '2023-09-12',
                priorityLevel: 3,
            },
            {
                id: 12000,
                title: 'Volunteer at a Local Shelter',
                details: 'Spend a few hours volunteering at an animal shelter or food bank.',
                dueDate: '2023-09-08',
                priorityLevel: 2,
            },
            {
                id: 13000,
                title: 'Hiking Adventure',
                details: 'Plan a hiking trip to explore a new trail and enjoy the outdoors.',
                dueDate: '2023-09-18',
                priorityLevel: 1,
            },
            {
                id: 14000,
                title: 'Financial Review',
                details: 'Review your monthly budget and financial goals.',
                dueDate: '2023-09-11',
                priorityLevel: 3,
            },
            {
                id: 15000,
                title: 'Cook a New Recipe',
                details: 'Try cooking a new and challenging recipe for dinner.',
                dueDate: '2023-09-09',
                priorityLevel: 2,
            },
            {
                id: 16000,
                title: 'Photography Session',
                details: 'Spend an afternoon taking photographs in your favorite location.',
                dueDate: '2023-09-14',
                priorityLevel: 1,
            },
            {
                id: 17000,
                title: 'Plan a Road Trip',
                details: 'Plan a road trip to visit a nearby city or tourist destination.',
                dueDate: '2023-09-25',
                priorityLevel: 2,
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
}