<?php

	session_start();
	
	$last_session = "";
	if (isset($_COOKIE["last_session"])) {
		$last_session = $_COOKIE["last_session"];
	} else {
		setcookie("last_session",session_id(),time()+ (24*60*60));
	}
		
	if ($last_session != "") {
		session_id($last_session);
	}
		
	$sessionPath = "C:/xampp/private/" . session_id() . "/";
	
	if (!file_exists($sessionPath)) {
		mkdir($sessionPath);		
	}
	
?>