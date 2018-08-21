<?php

include "../Conexao.php";

header('Access-Control-Allow-Origin: *');

try {

	$sql 				= "";
	$v_screen			= "";
	$v_selecionar		= "";	
	$v_editar			= "";
	$v_deletar			= "";
	$v_criar			= "";
	$v_usuario			= "";	
	$v_type				= "";	

	if(isset($_POST["SCREEN"]))
	{	
		$v_screen = $_POST["SCREEN"];
		settype($v_screen, "int");	
	}

	if(isset($_POST["TYPE"]))
	{	
		$v_type = $_POST["TYPE"];
		settype($v_type, "string");	
	}

	if(isset($_POST["SELECIONAR"]))
	{	
		$v_selecionar = $_POST["SELECIONAR"];
		settype($v_selecionar, "int");	
	}

	if(isset($_POST["USER"]))
	{	
		$v_usuario = $_POST["USER"];
		settype($v_usuario, "int");	
	}

	if(isset($_POST["CRIAR"]))
	{	
		$v_criar = $_POST["CRIAR"];
		settype($v_criar, "int");	
	}

	if(isset($_POST["DELETAR"]))
	{	
		$v_deletar = $_POST["DELETAR"];
		settype($v_deletar, "int");	
	}

	if(isset($_POST["EDITAR"]))
	{	
		$v_editar = $_POST["EDITAR"];
		settype($v_editar, "int");	
	}

	if ($v_type == "I") {
		$sql =  "INSERT INTO tb_Permissions VALUES ($v_usuario,$v_criar,$v_deletar,$v_editar,$v_selecionar,$v_screen)";
	} else {
		$sql =  "UPDATE tb_Permissions SET `Create` = '$v_criar', `Delete` = '$v_deletar', `Edit` = $v_editar, `Select` = $v_selecionar WHERE `User` = $v_usuario AND `Screen` = $v_screen ";
	}
			
	// EXECUTA A QUERY		
	if ($dbh->query($sql)) {
		if ($v_type == "I") {
	    	echo "Permissões da tela " . $v_screen . " criadas com sucesso";
		} else{
			echo "Permissões da tela " . $v_screen . " modificadas com sucesso";
		}
	    
	} else {
	    echo "Error: " . $sql . "<br>" . $dbh->error;
	}

} catch (Exception $e) {
    echo 'Exceção capturada: ',  $e->getMessage(), "\n";
}

?> 