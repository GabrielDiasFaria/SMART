<?php

include "../Conexao.php";

header('Access-Control-Allow-Origin: *');

try {

	$sql 				= "";
	$v_Empresa			= "";
	$v_id				= "";
	$v_cor				= "";
	$v_lead				= "";
	$v_data_inicio		= "";	
	$v_data_inicio_hora	= "";	
	$v_data_fim			= "";	
	$v_ativo			= "";
	$v_descricao		= "";

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

	if(isset($_POST["COR"]))
	{
		$v_cor = $_POST["COR"];
		settype($v_cor, "string");	
	}

	if(isset($_POST["LEAD"]))
	{
		$v_lead = $_POST["LEAD"];
		settype($v_lead, "string");	
	}

	if(isset($_POST["DESCRICAO"]))
	{
		$v_descricao = $_POST["DESCRICAO"];
		settype($v_descricao, "string");	
	}

	if(isset($_POST["DATA_INICIO"]))
	{
		$data = str_replace("/", "-", $_POST["DATA_INICIO"]);
		$v_data_inicio = date('Y-m-d', strtotime($data));
		settype($v_data_inicio, "string");
	}

	if(isset($_POST["DATA_INICIO_HORA"]))
	{
		$v_data_inicio_hora = $_POST["DATA_INICIO_HORA"];
		settype($v_data_inicio_hora, "string");
	}

	if(isset($_POST["DATA_FIM"]))
	{
		$data = str_replace("/", "-", $_POST["DATA_FIM"]);
		$v_data_fim = date('Y-m-d', strtotime($data));
		settype($v_data_fim, "string");
	}
	
	if(isset($_POST["ATIVO"]))
	{
		$v_ativo = $_POST["ATIVO"];
		settype($v_ativo, "int");	
	}

	if ($v_id == "" || $v_id == "0") {
		$sql =  "INSERT INTO tb_Dairy VALUES (null, '$v_cor', '$v_lead', '$v_data_inicio', '$v_data_inicio_hora', '$v_data_fim', $v_ativo, '$v_Empresa', '$v_descricao')";
	} else {
		$sql =  "UPDATE tb_Dairy SET cor = '$v_cor', lead = '$v_lead', empresa = '$v_Empresa', descricao='$v_descricao', data_inicio = '$v_data_inicio', hora_inicial = '$v_data_inicio_hora', data_fim = '$v_data_fim', ativo = $v_ativo WHERE id = $v_id";
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