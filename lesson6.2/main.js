window.onload = function() {
    var form = document.getElementsByTagName("form")[0];
    var comment = document.getElementById("comment"),
        counter = document.getElementById("count"),
        countText = counter.getElementsByTagName("span")[0];
        maxNum = counter.getElementsByTagName("span")[1];
    var userName = document.getElementById("userName"),
        sendButton = document.getElementById("send");
    var listUl = document.getElementById("list").getElementsByTagName("ul")[0],
        listItem = listUl.getElementsByTagName("li");
    var avatars = document.getElementById("avatarList").getElementsByTagName("img");
    var avatarSrc = "img/icon1.jpg";
    var i = 0, l = 0;
    var timer = null;

    function confine() {
        var len = 0;
        for (i = 0, l = comment.value.length; i < l; i++) {
            if (/[^\x00-\xff]/g.test(comment.value.charAt(i))) {
                len += 1;
            } else {
                len += 0.5;
            }
        }
        len = 140 - Math.floor(len);
        if (len < 0 ) {
            countText.innerHTML = "已超出";
            maxNum.innerHTML = -len;
            maxNum.style.color = "#f60";
            sendButton.className = "disabled";
        } else {
            countText.innerHTML = "还剩下";
            maxNum.style.color = "#999";
            maxNum.innerHTML = len;
        }
    }

    function format(num) {
        if (("" + num).length === 2) {
            return "" + num;
        } else {
            return "0" + num;
        }
    }

    function chooseAvatar() {
        for (i = 0, l = avatars.length; i < l; i++) {
            avatars[i].className = "";
        }
        this.className = "current";
        avatarSrc = this.src;
    }

    function send() {
        if (/^\s*$/g.test(userName.value)) {
            alert("请填写姓名");
        } else if (!/^[u4e00-\u9fa5\w]{2,8}$/g.test(userName.value)) {
            alert("请输入2-8位中文、英文、数字或下划线");
        } else if (/^\s*$/g.test(comment.value)) {
            alert("请填写留言");
        } else if (sendButton.className === "disabled") {
            alert("已超出字数限制");
        } else {
            var newLi = document.createElement("li");
            var now = new Date();
            newLi.innerHTML = "<div class='avatar'><img src='" + avatarSrc + "' alt='" +
            "@" + userName.value +
            "'></div><div class='content'><div class='userName'><a href='javascript:;'>" +
            "@" + userName.value +
            "</a>:</div><div class='msg'>" + comment.value +
            "</div><div class='time'><span>" + format(now.getMonth() + 1) + "月" +
            format(now.getDate()) + "日 " + format(now.getHours()) + ":" + format(now.getMinutes()) +
            "</span><a href='javascript:;' class='del'>删除</a></div></div>"
            if (listItem.length > 0) {
                listUl.insertBefore(newLi, listItem[0]);
            } else {
                listUl.appendChild(newLi);
            }

            if(window.getComputedStyle) {
                var oldHeight = newLi.clientHeight - parseFloat(getComputedStyle(newLi, null)["paddingTop"]) -
                parseFloat(getComputedStyle(newLi, null)["paddingBottom"]);
            } else {
                var oldHeight = newLi.clientHeight - 20;
            }
            var height = 0;
            var heightMin = oldHeight * 0.1;
            var alpha = 0;
            newLi.style.height = 0;
            newLi.style.opacity = 0;
            newLi.style.filter = "alpha(opacity=0)";

            timer = setInterval(function() {
                alpha += 10;
                height += heightMin;
                newLi.style.opacity = alpha / 100;
                newLi.style.filter = "alpha(opacity=" + alpha + ")";
                newLi.style.height = height + "px";
                if (height >= oldHeight) {
                    clearInterval(timer);
                }
            }, 50);

            addDel();
            form.reset();
            for (i = 0, l = avatars.length; i < l; i++) {
                avatars[i].className = "";
            }
            avatars[0].className = "current";
            avatarSrc = "img/icon1.jpg";
            confine();
        }
    }

    function addDel() {
        var delButtons = [];
        var temp = listUl.getElementsByTagName("a");
        for (i = 0, l = temp.length; i < l; i++) {
            if (temp[i].className === "del") {
                delButtons.push(temp[i]);
            }
        }
        for (i = 0, l = delButtons.length; i < l; i++) {
            delButtons[i].onclick = function() {
                var parent = this.parentNode.parentNode.parentNode;
                var alpha = 100;
                var height = parent.clientHeight;
                var heightMin = height * 0.1;
                timer = setInterval(function() {
                    alpha -= 10;
                    height -= heightMin;
                    parent.style.opacity = alpha / 100;
                    parent.style.filter = "alpha(opacity=" + alpha + ")";
                    parent.style.height = height + "px";
                    if (height <= 0) {
                        clearInterval(timer);
                        listUl.removeChild(parent);
                    }
                }, 50);
                this.onclick = null;
            };
        }
    }

    document.onkeyup = function(event) {
        var ev = event || window.event;
        if (ev.ctrlKey && ev.keyCode === 13) {
            send();
        }
    };
    comment.onkeyup = confine;
    comment.change = confine;
    comment.focus = confine;
    sendButton.onclick = send;
    for (i = 0, l = avatars.length; i < l; i++) {
        avatars[i].onclick = chooseAvatar;
    }
    confine();
    addDel();
};
