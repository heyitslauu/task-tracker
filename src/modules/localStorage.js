// import { tasksInit, projectsInit } from "./init";

export class LocalStorage {
    setStorageItem(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    getStorageItem(key) {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    }

    setInitialStorage(key, value) {
        if (!localStorage.getItem(key)) {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }
}