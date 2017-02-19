<?php

$apiKey = "AIzaSyD6LcCO3CzZFBy0oYZ1t7YCjXWfrlN5Msk";

if(isset($_POST['data']) or isset($_REQUEST['data'])){
$data = json_decode($_POST['data']);
$location = $data->location;//"13.7563,100.5018";
$language = $data->lang;//"en";
$pagetoken = $data->pagetoken;
//$searchType = "nearbysearch";
//$searchType = "radarsearch";
//$url = "https://maps.googleapis.com/maps/api/place/".$searchType."/json?location=".$location."&radius=50000&language=".$language."&hasNextPage=true&nextPage()=true&pagetoken=".$pagetoken."&type=bank|atm&keyword=siam+bank+atm+scb&key=".$apiKey;
$url = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=siam+bank+scb&+cdm+atm&location=".$location."&hasNextPage=true&nextPage()=true&pagetoken=".$pagetoken."&radius=10000&key=".$apiKey;
$json = file_get_contents($url);
echo  json_encode($json);
}
?>
