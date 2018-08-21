<?php

include "../Conexao.php";

header('Access-Control-Allow-Origin: *');

try {

$sql 				= "";
$v_where 			= "";
$v_id				= "";

if(isset($_GET["ID"]))
{
	$v_id = $_GET["ID"];
	settype($v_id, "int");
	
	if($v_where == ""){
		$v_where = " WHERE P.user = " . $v_id;
	}else{
		$v_where .= " AND P.user = " . $v_id;
	}
}

$sql =  "SELECT P.Screen, S.Description, P.Select, P.Create, P.Edit, P.Delete, P.User FROM tb_Permissions AS P JOIN tb_Screen AS S ON S.id = P.Screen " . $v_where;

// DECLARA O XML
$sxe = new SimpleXMLElement('<workResponse></workResponse>');
	

// ADICIONA NODE PAI
$sxe_crs = $sxe->addChild('UsersPermissions');

	
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
	$sx_cr = $sxe_crs->addChild('UserPermission');
	array_walk($row, 'array_walk_simplexml', $sx_cr);
}

// ENVIA PARA A TELA
echo $sxe->asXML();

} catch (Exception $e) {
    echo 'Exceção capturada: ',  $e->getMessage(), "\n";
}

?> 