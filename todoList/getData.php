<?php 
    $db = new mysqli('127.0.0.1','root','','todoList');

    $query = "select event from data";
    $result = $db -> query($query);

    $mum_results = $result -> num_rows;
    for ($i=0; $i < $mum_results; $i++) { 
        $row = $result -> fetch_assoc();
        echo ';';
        echo stripslashes($row['event']);
    }


 ?>