<?php

include "../Conexao.php";

header('Access-Control-Allow-Origin: *');

try {

	$sql 				= "";
	$v_Usuario			= "";
	$v_id				= "";
	$v_nome				= "";	
	$v_empresa			= "";
	$v_empresa_desc		= "";
	$v_email			= "";
	$v_ativo			= "";
	$v_data_criacao		= "";		
	$v_Senha			= "";
	$v_Image			= "";

	if(isset($_POST["USUARIO"]))
	{	
		$v_Usuario = $_POST["USUARIO"];
		settype($v_Usuario, "int");	
	}

	if(isset($_POST["ID"]))
	{	
		$v_id = $_POST["ID"];
		settype($v_id, "string");	
	}

	if(isset($_POST["NOME"]))
	{
		$v_nome = $_POST["NOME"];
		settype($v_nome, "string");	
	}

	if(isset($_POST["IMAGE"]))
	{
		$v_Image = $_POST["IMAGE"];
		settype($v_Image, "string");	
	}

	if(isset($_POST["EMPRESA"]))
	{
		$v_empresa = $_POST["EMPRESA"];
		settype($v_empresa, "string");	
	}

	if(isset($_POST["EMPRESA_DESC"]))
	{
		$v_empresa_desc = $_POST["EMPRESA_DESC"];
		settype($v_empresa_desc, "string");	
	}

	if(isset($_POST["DATA_CRIACAO"]))
	{
		$data = str_replace("/", "-", $_POST["DATA_CRIACAO"]);
		$v_data_criacao = date('Y-m-d', strtotime($data));
		settype($v_data_criacao, "string");
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

	if(isset($_POST["SENHA"]))
	{
		$v_Senha = $_POST["SENHA"];
		settype($v_Senha, "string");	
	}

	$v_type = 0;

	if ($v_id == "" || $v_id == "0") {
		$v_type = 1;
		$sql =  "INSERT INTO tb_User VALUES (null, '$v_nome', $v_empresa, $v_empresa_desc, '$v_email', $v_ativo, now(), '202cb962ac59075b964b07152d234b70', '$v_Image')";
	} elseif ($v_Senha == "") {
		$v_type = 2;
		$sql =  "UPDATE tb_User SET nome = '$v_nome', empresa = '$v_empresa', empresa_desc = '$v_empresa_desc', email = '$v_email', ativo = $v_ativo, imagem = '$v_Image' WHERE id = $v_id";
	} elseif ($v_Senha != "" && $v_nome == ""){
		$v_type = 3;
		$sql =  "UPDATE tb_User SET senha = '202cb962ac59075b964b07152d234b70' WHERE id = $v_id";
	} else {
		$v_type = 4;
		$sql =  "UPDATE tb_User SET senha = MD5('$v_Senha'), nome = '$v_nome' WHERE id = $v_id";
	}
			
	// EXECUTA A QUERY		
	if ($dbh->query($sql)) {
		if ($v_id == "" || $v_id == "0") {
			$last_id = $dbh->lastInsertId();
	    	echo "Registro criado com sucesso (" . $v_type . "). ID gerado foi: " . $last_id;
		} else{
			echo "Registro " . $v_id . " modificado com sucesso (" . $v_type . ")";
		}
	    
	} else {
	    echo "Error: " . $sql . "<br>" . $dbh->error;
	}

} catch (Exception $e) {
    echo 'Exceção capturada: ',  $e->getMessage(), "\n";
}

?> 