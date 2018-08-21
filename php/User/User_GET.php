<?php

include "../Conexao.php";

header('Access-Control-Allow-Origin: *');

try {

$sql 				= "";
$v_where 			= "";
$v_Usuario			= "";
$v_id				= "";
$v_nome				= "";

if(isset($_GET["USUARIO"]))
{	
	$v_Usuario = $_GET["USUARIO"];
	settype($v_Usuario, "int");
}

if(isset($_GET["ID"]))
{
	$v_id = $_GET["ID"];
	settype($v_id, "int");
	
	if($v_where == ""){
		$v_where = " WHERE id = " . $v_id;
	}else{
		$v_where .= " AND id = " . $v_id;
	}
}

if(isset($_GET["NOME"]))
{
	$v_nome = $_GET["NOME"];
	settype($v_nome, "string");
	
	if($v_where == ""){
		$v_where = " WHERE NOME like '%" . $v_nome . "%'";
	}else{
		$v_where .= " AND NOME like '%" . $v_nome . "%'";
	}
}

$sql =  "SELECT U.Id, U.Nome, U.Empresa, U.Empresa_Desc, U.Email, U.Ativo, U.Imagem,DATE_FORMAT(U.Data_Criacao,'%d/%m/%Y') AS Data_Criacao_Formatada FROM tb_User as U" . $v_where;

// DECLARA O XML
$sxe = new SimpleXMLElement('<workResponse></workResponse>');
	

// ADICIONA NODE PAI
$sxe_crs = $sxe->addChild('Users');

	
// NÃO IDENTIFICADO
function array_walk_simplexml(&$value, $key, &$sx) 
{	
	$sx->addChild($key, $value);
}
	
// EXECUTA A QUERY
$stmt = $dbh->query($sql);
	
// PERCORRE O RESULTADO ADICIONANDO OS NODES FILHOS
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) 
{	
	$sx_cr = $sxe_crs->addChild('User');
	array_walk($row, 'array_walk_simplexml', $sx_cr);
}

// ENVIA PARA A TELA
echo $sxe->asXML();

} catch (Exception $e) {
    echo 'Exceção capturada: ',  $e->getMessage(), "\n";
}

?> 