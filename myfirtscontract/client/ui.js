const taskForm = document.querySelector("#taskForm");

document.addEventListener("DOMContentLoaded", () => {
    App.init() 
})

taskForm.addEventListener("submit", e => {
    e.preventDefault();
    
    var startup = document.getElementById("startupsSelect").value;

    if (startup == "") {
        alert("Select a Startup")
    } else {
        console.log(startup);
        console.log(taskForm["amount"].value);
        App.createTask(startup, taskForm["amount"].value);
        // App.createTask(taskForm["title"].value, taskForm["description"].value);
    }
})
