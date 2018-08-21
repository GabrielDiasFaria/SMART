<?php

include "../Conexao.php";

header('Access-Control-Allow-Origin: *');

try {

	$sql 				= "";
	$v_Empresa			= "";
	$v_id				= "";
	$v_data_criacao		= "";
	$v_landing			= "";
	$v_nome_completo	= "";
	$v_telefone			= "";
	$v_email			= "";
	$v_ativo			= "";
	$v_descricao		= "";

	if(isset($_POST["EMPRESA"]))
	{	
		$v_Empresa = $_POST["EMPRESA"];
		settype($v_Empresa, "int");	
	}

	if(isset($_POST["DESCRICAO"]))
	{
		$v_descricao = $_POST["DESCRICAO"];
		settype($v_descricao, "string");	
	}

	if(isset($_POST["ID"]))
	{	
		$v_id = $_POST["ID"];
		settype($v_id, "string");	
	}

	if(isset($_POST["DATA_CRIACAO"]))
	{
		$data = str_replace("/", "-", $_POST["DATA_CRIACAO"]);
		$v_data_criacao = date('Y-m-d', strtotime($data));
		settype($v_data_criacao, "string");
	}

	if(isset($_POST["LANDING"]))
	{
		$v_landing = $_POST["LANDING"];
		settype($v_landing, "string");	
	}

	if(isset($_POST["NOME_COMPLETO"]))
	{
		$v_nome_completo = $_POST["NOME_COMPLETO"];
		settype($v_nome_completo, "string");	
	}

	if(isset($_POST["TELEFONE"]))
	{
		$v_telefone = $_POST["TELEFONE"];
		settype($v_telefone, "string");	
	}

	if(isset($_POST["EMAIL"]))
	{
		$v_email = $_POST["EMAIL"];
		settype($v_email, "string");	
	}

	if(isset($_POST["ATIVO"]))
	{
		$v_ativo = $_POST["ATIVO"];
		settype($v_ativo, "int");	
	}

	if ($v_id == "" || $v_id == "0") {
		$sql =  "INSERT INTO tb_Lead VALUES (null, '$v_data_criacao', '$v_landing', '$v_nome_completo', '$v_telefone', '$v_email', $v_ativo, '$v_Empresa', '$v_descricao')";
	} else {
		$sql =  "UPDATE tb_Lead SET data_criacao = '$v_data_criacao', descricao = '$v_descricao', empresa = '$v_Empresa', landing_Page = '$v_landing', nome_completo = '$v_nome_completo', telefone = '$v_telefone', email = '$v_email', ativo = $v_ativo WHERE id = $v_id";
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