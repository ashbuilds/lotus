<?php
$apiKey = "AIzaSyD6LcCO3CzZFBy0oYZ1t7YCjXWfrlN5Msk";
$location = "13.7563,100.5018";
$language = "en";
//$searchType = "nearbysearch";
//$searchType = "radarsearch";
//$url = "https://maps.googleapis.com/maps/api/place/".$searchType."/json?location=".$location."&radius=50000&language=".$language."&type=bank|atm&keyword=siam+bank+atm+scb&key=".$apiKey;
$url = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=siam+bank+scb&+cdm+atm&location=".$location."&radius=10000&key=".$apiKey;
$json = file_get_contents($url);
echo  json_encode($json);
?>
