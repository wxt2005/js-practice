(function() {
    var skin = document.getElementById("skin");
    var buttons = skin.getElementsByTagName("li");
    var link = document.getElementById("skinlink");

    //event listner
    var buttonListener = function(event) {
        if (event.target.tagName.toLowerCase() === "li") {
            for (var i = 0, l = buttons.length; i < l; i++) {
                if (buttons[i] === event.target) {
                    buttons[i].className = "current";
                    link.href = "css\/" + event.target.id + ".css";  
                } else {
                    buttons[i].className = "";
                }
            }
        }
    };

    skin.addEventListener("click", buttonListener, false);
})();
