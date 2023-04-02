<?php
    header('Content-Type: application/json');
    echo file_get_contents('https://restcountries.com/v2/all');
?>