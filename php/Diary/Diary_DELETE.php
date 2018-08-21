<?php

include "../Conexao.php";

header('Access-Control-Allow-Origin: *');

try {

	$sql 			= "";
	$v_Usuario		= "";

	$v_id	= "";

	if(isset($_POST["ID"]))
	{	
		$v_id = $_POST["ID"];
		settype($v_id, "string");	
	}

	$sql =  "DELETE FROM tb_Dairy WHERE ID = '$v_id'";
		
	// EXECUTA A QUERY		
	if ($dbh->query($sql)) {
	    echo "Registro com ID ". $v_id ." deletado com sucesso.";
	} else {
	    echo "Error: " . $sql . "<br>" . $dbh->error;
	}

} catch (Exception $e) {
    echo 'Exceção capturada: ',  $e->getMessage(), "\n";
}

?> 