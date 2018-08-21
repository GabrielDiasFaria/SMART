<?php

include "../Conexao.php";

header('Access-Control-Allow-Origin: *');

try {

	$sql 			= "";
	$v_Empresa		= "";
	$v_id			= "";
	$v_data_inicio	= "";
	$v_titulo		= "";
	$v_link			= "";
	$v_ativo		= "";

	if(isset($_POST["EMPRESA"]))
	{	
		$v_Empresa = $_POST["EMPRESA"];
		settype($v_Empresa, "int");	
	}

	if(isset($_POST["ID"]))
	{	
		$v_id = $_POST["ID"];
		settype($v_id, "string");	
	}

	if(isset($_POST["DATA_INICIO"]))
	{
		$data = str_replace("/", "-", $_POST["DATA_INICIO"]);
		$v_data_inicio = date('Y-m-d', strtotime($data));
		settype($v_data_inicio, "string");
	}

	if(isset($_POST["TITULO"]))
	{
		$v_titulo = $_POST["TITULO"];
		settype($v_titulo, "string");	
	}

	if(isset($_POST["LINK"]))
	{
		$v_link = $_POST["LINK"];
		settype($v_link, "string");	
	}

	if(isset($_POST["ATIVO"]))
	{
		$v_ativo = $_POST["ATIVO"];
		settype($v_ativo, "int");	
	}

	if ($v_id == "" || $v_id == "0") {
		$sql =  "INSERT INTO tb_LandingPage VALUES (null, '$v_data_inicio', '$v_titulo', '$v_link', $v_ativo, '$v_Empresa')";
	} else {
		$sql =  "UPDATE tb_LandingPage SET data_inicio = '$v_data_inicio', empresa= '$v_Empresa', titulo = '$v_titulo', link = '$v_link', ativo = $v_ativo WHERE id = $v_id";
	}
			
	// EXECUTA A QUERY		
	if ($dbh->query($sql)) {
		if ($v_id == "" || $v_id == "0") {
			$last_id = $dbh->lastInsertId();
	    	echo "Registro criado com sucesso. ID gerado foi: " . $last_id;
		} else{
			echo "Registro " . $v_id . " modificado com sucesso";
		}
	    
	} else {
	    echo "Error: " . $sql . "<br>" . $dbh->error;
	}

} catch (Exception $e) {
    echo 'Exceção capturada: ',  $e->getMessage(), "\n";
}

?> 