(function() {
    var inner = document.getElementById("inner");
    var outer = document.getElementById("outer");

    //if the css value does not exist, then add it.
    var addCss = function(target, cssVal) {
        var re = new RegExp(cssVal, "i");
        if (!re.test(target.style.cssText)) {
            target.style.cssText += cssVal;
        }
    };

    //use outer div to listen all button onclick event.
    var buttonListener = function(event) {
        var target = event.target;
        switch(target.value) {
            case "变宽":
                addCss(inner, "width:200px;");
                break;
            case "变高":
                addCss(inner, "height:200px;");
                break;
            case "变色":
                addCss(inner, "background-color:red;");
                break;
            case "隐藏":
                addCss(inner, "display:none;");
                break;
            case "重置":
                inner.style.cssText = "";
                break;
        }
    };

    //add listener.
    outer.addEventListener("click", buttonListener, false);
})();
