var main = document.querySelector('#main');
var root = document.querySelector('#wrapper');
var foot = document.querySelector('.foot');


//添加任务
function addList(event) {
    var e = event || window.event;

    if (e.keyCode === 13 && main.value) {
        var newList = document.createElement('div');
        newList.setAttribute('class', 'list');

        var newHook = document.createElement('div');
        newHook.setAttribute('class', 'hook');

        var newP = document.createElement('p');
        newP.setAttribute('class', 'content');

        var newOut = document.createElement('img');
        newOut.setAttribute('class', 'out');
        newOut.setAttribute('src', 'out.png');

        var newRevise = document.createElement('img');
        newRevise.setAttribute('class', 'revise');
        newRevise.setAttribute('src', 'change.png');

        //root.append(newList);
        root.insertBefore(newList, foot);
        newList.append(newHook);
        newList.append(newP);
        newList.append(newOut);
        newList.append(newRevise);

        sendData();

        var addValue = main.value;
        newP.innerHTML = addValue;
        main.value = '';

        //计数器
        var count = document.querySelector('strong');
        var num = count.innerHTML;
        count.innerHTML = parseInt(num) + 1;

        var list = document.querySelectorAll('.list');
        var img = document.querySelectorAll('img');

        root.addEventListener('mouseover', function(event) {
            var e = event || window.event;
            var el = e.target || e.srcElememt;

            if (el.className === 'list' || el.parentNode.className === 'list') {
                if (el.children.length === 4) {
                    el.children[3].style.display = el.children[2].style.display = 'block';
                } else {
                    el.parentNode.children[3].style.display = el.parentNode.children[2].style.display = 'block';
                }

            }
        }, false);

        root.addEventListener('mouseout', function(event) {
            var e = event || window.event;
            var el = e.target || e.srcElememt;

            if (el.className === 'list' || el.parentNode.className === 'list') {
                if (el.children.length === 4) {
                    el.children[3].style.display = el.children[2].style.display = 'none';
                } else {
                    el.parentNode.children[3].style.display = el.parentNode.children[2].style.display = 'none';
                }

            }
        }, false);

    }

}



function btn(event) {
    var e = event || window.event;
    var el = e.target || e.srcElememt;

    switch (el.className) {

        case 'hook':
            el.style.backgroundImage = 'url(hook.png)';
            el.parentNode.children[1].className = 'done';
            el.className = 'selected';

            var count = document.querySelector('strong');
            var num = count.innerHTML;
            count.innerHTML = parseInt(num) - 1;
            break;

        case 'selected':
            el.style.backgroundImage = '';
            el.parentNode.children[1].className = 'content';
            el.className = 'hook';

            var count = document.querySelector('strong');
            var num = count.innerHTML;
            count.innerHTML = parseInt(num) + 1;
            break;

        case 'revise':
            el.parentNode.children[1].innerHTML = '<input type="text" class = "change" />';
            el.parentNode.lastChild.className = 'sure';
            el.parentNode.lastChild.src = 'sure.png';
            break;

        case 'out':
            el.parentNode.parentNode.removeChild(el.parentNode);

            var count = document.querySelector('strong');
            var num = count.innerHTML;
            count.innerHTML = parseInt(num) - 1;
            break;

        case 'sure':
            var newValue = el.parentNode.children[1].firstChild.value;
            if (el.parentNode.children[1].firstChild.value) {
                el.parentNode.children[1].innerHTML = '<p class="content"></p>';
                el.parentNode.children[1].innerHTML = newValue;
                el.parentNode.lastChild.className = 'revise';
                el.parentNode.lastChild.src = 'change.png';
            } else {
                alert('输入不能为空！');
            }
            break;

    }
}


main.addEventListener('keydown', addList, false);
wrapper.addEventListener('click', btn, false);


var undone = document.querySelector('.undone');
var compeleted = document.querySelector('.compeleted');
var clear = document.querySelector('.clear');

//只显示未完成的
undone.addEventListener('click', function() {

    var compeletedList = document.querySelectorAll('.selected');

    for (var i = 0; i < compeletedList.length; i++) {
        root.removeChild(compeletedList[i].parentNode);
    }
}, false);

//只显示已完成的
compeleted.addEventListener('click', function() {
    var undoneList = document.querySelectorAll('.hook');

    for (var i = 0; i < undoneList.length; i++) {
        root.removeChild(undoneList[i].parentNode);
    }
}, false);


//发送数据
function sendData() {
    var event = main.value;
    var checked = 0;

    ajax({
        method: 'POST',
        url: 'mysql.php',
        data: {
            'event': event,
            'checked': checked,

        },
        success: success,
    });
}

function success(data) {
    //console.log(data);
}

//获取数据
function getData() {
    ajax({
        method: 'POST',
        url: 'getData.php',
        /* data: {
             'event': event,
             'checked': checked,
             
         },*/
        success: show,
    });
}


function show(data) {
    console.log(data);
    var dataArr = data.split(';');
    console.log(dataArr);
    var l = dataArr.length - 1;
    console.log(l);

    for (var i = l; i > 0; i--) {

        var newList = document.createElement('div');
        newList.setAttribute('class', 'list');

        var newHook = document.createElement('div');
        newHook.setAttribute('class', 'hook');

        var newP = document.createElement('p');
        newP.setAttribute('class', 'content');

        var newOut = document.createElement('img');
        newOut.setAttribute('class', 'out');
        newOut.setAttribute('src', 'out.png');

        var newRevise = document.createElement('img');
        newRevise.setAttribute('class', 'revise');
        newRevise.setAttribute('src', 'change.png');

        root.insertBefore(newList, foot);
        newList.append(newHook);
        newList.append(newP);
        newList.append(newOut);
        newList.append(newRevise);

        newP.innerHTML = dataArr[i + 1];
    }

    //计数器
    var count = document.querySelector('strong');;
    
    count.innerHTML = l;

    root.addEventListener('mouseover', function(event) {
        var e = event || window.event;
        var el = e.target || e.srcElememt;

        if (el.className === 'list' || el.parentNode.className === 'list') {
            if (el.children.length === 4) {
                el.children[3].style.display = el.children[2].style.display = 'block';
            } else {
                el.parentNode.children[3].style.display = el.parentNode.children[2].style.display = 'block';
            }

        }
    }, false);

    root.addEventListener('mouseout', function(event) {
        var e = event || window.event;
        var el = e.target || e.srcElememt;

        if (el.className === 'list' || el.parentNode.className === 'list') {
            if (el.children.length === 4) {
                el.children[3].style.display = el.children[2].style.display = 'none';
            } else {
                el.parentNode.children[3].style.display = el.parentNode.children[2].style.display = 'none';
            }

        }
    }, false);



}
getData();