<?php

function endsWith($haystack, $needle) {
    // search forward starting from end minus needle length characters
    return $needle === "" || (($temp = strlen($haystack) - strlen($needle)) >= 0 && strpos($haystack, $needle, $temp) !== FALSE);
}

	include 'session.php';

	$getimg = $_GET['img'];
	if (endsWith($getimg, ".jpg")) {
		header("Content-type: image/jpeg");
		$image=imagecreatefromjpeg($sessionPath . $_GET['img']);
		imagejpeg($image);
	} else if (endsWith($getimg, ".png")) {
		header("Content-type: image/png");
		$image=imagecreatefrompng($sessionPath . $_GET['img']);
		imagejpeg($image);
	} else {		
		header('Content-type: text/plain');		
		echo file_get_contents($sessionPath . $_GET['img']);
	}

	//echo "C:/xampp/private/" . $_GET['img'];
	
	
	
	//echo realpath("C:/xampp/private/" . $_GET['img']);
	//echo $image;
?>