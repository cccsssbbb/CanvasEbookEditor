<?php
	$filename = $_POST['filename'];
	$filetype = $_POST['filetype'];
	$jsonContent = $_POST['jsonContent'];
	
	//print_r($_POST);
	echo 'File saved';
	echo session_id();
		
	//Save the image
	include 'session.php';
	file_put_contents($sessionPath . $filename . $filetype, $jsonContent);
	
?>