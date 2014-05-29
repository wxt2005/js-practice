(function() {
    var skin = document.getElementById("skin");
    var buttons = skin.getElementsByTagName("li");
    var link = document.getElementById("skinlink");

    //event listner
    var buttonListener = function(event) {
        var event = event || window.event;
        var target = event.target || event.srcElement;

        if (target.tagName.toLowerCase() === "li") {
            for (var i = 0, l = buttons.length; i < l; i++) {
                if (buttons[i] === target) {
                    buttons[i].className = "current";
                    link.href = "css\/" + target.id + ".css";  
                } else {
                    buttons[i].className = "";
                }
            }
        }
    };

    if(skin.addEventListener) {
        skin.addEventListener("click", buttonListener, false);
    } else {
        //IE 6 only
        skin.attachEvent("onclick", buttonListener);
    }
})();
