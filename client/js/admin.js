window.onload = function() {
    document.getElementById("transactions").innerHTML = Math.floor(Math.random() * 100000);
    
    var today = new Date();
    var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    document.getElementById("date").innerHTML = dateTime;

    document.getElementById("ip").innerHTML = (Math.floor(Math.random() * 255) + 1)+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255));;
}

function reload() {
    location.reload();
}
