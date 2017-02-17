<?php
$request_body = file_get_contents('https://maps.googleapis.com/maps/api/place/textsearch/json?query=siam+bank+and+atm+in+thailand&location=13.7563,100.5018&radius=10000&key=AIzaSyD2-5jVs26nxz9B0Uu9L6aEjypkrlwGZsY');
$json = json_decode($request_body);
echo $json;
?>