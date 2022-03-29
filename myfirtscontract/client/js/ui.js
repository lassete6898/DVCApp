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
        // console.log(startup);
        // console.log(taskForm["amount"].value);
        App.createTask(startup, taskForm["amount"].value);
        // App.createTask(taskForm["title"].value, taskForm["description"].value);
    }
})

function info() {
    Swal.fire({
        title: '<h1> Soluciones MedX </h1>',
        icon: 'info',
        html:
          '<p align="justify"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sem purus, rutrum ut ipsum eget, rhoncus finibus libero. Fusce eleifend varius suscipit. Nullam sit amet commodo ante. raesent vitae luctus mi, at faucibus arcu. </p>',
        showCloseButton: true,
        showConfirmButton: false
      })
}