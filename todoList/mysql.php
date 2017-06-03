<?php
    $event = $_POST["event"];
    $checked = $_POST["checked"];


//判断数据是否完全
if ($event==null||$checked==null) {
    echo "incomplete";

}else{

    $db = new mysqli('127.0.0.1','root','','todoList');
       
    //把新信息存入数据库
    $query = "insert into data(event,checked) values('$event','$checked')";
    $new_result = $db->query($query);

    if($new_result) {
        echo "success";

    }else{
        echo "fail";
    }   
}
    
?>