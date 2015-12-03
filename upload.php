<?php
	$filename = $_POST['filename'];
	$filetype = $_POST['filetype'];
	$imageContent = $_POST['imageContent'];
	
	//print_r($_POST);
	echo 'File saved';
	echo session_id();
	//file_put_contents("C:/xampp/private/" . $filename, $imageContent);
	
	
	
	//Get the base-64 string from data
	$filteredData=substr($imageContent, strpos($imageContent, ",")+1);
	 
	//Decode the string
	$unencodedData=base64_decode($filteredData);
	 
	//Save the image
	include 'session.php';
	file_put_contents($sessionPath . $filename . $filetype, $unencodedData);
	
?>