<?php

include "../Conexao.php";

header('Access-Control-Allow-Origin: *');

try {

$sql 			= "";
$v_where 		= "";
$v_Usuario		= "";
$v_id			= "";
$v_titulo		= "";

if(isset($_GET["USUARIO"]))
{	
	$v_Usuario = $_GET["USUARIO"];
	settype($v_Usuario, "int");
	
	//$v_where = " WHERE usuario = " + $v_Usuario;
}
else{
	return "Usuário é obrigatório!";
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

if(isset($_GET["TITULO"]))
{
	$v_titulo = $_GET["TITULO"];
	settype($v_titulo, "string");
	
	if($v_where == ""){
		$v_where = " WHERE titulo like '%" . $v_titulo . "%'";
	}else{
		$v_where .= " AND titulo like '%" . $v_titulo . "%'";
	}
}

$sql =  "SELECT LP.*,DATE_FORMAT(LP.Data_Inicio,'%d/%m/%Y') AS Data_Inicio_Formatada FROM tb_LandingPage LP JOIN tb_User U ON U.Empresa = LP.Empresa AND U.Id = $v_Usuario " . $v_where;

// DECLARA O XML
$sxe = new SimpleXMLElement('<workResponse></workResponse>');
	

// ADICIONA NODE PAI
$sxe_crs = $sxe->addChild('LandingPages');

	
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
	$sx_cr = $sxe_crs->addChild('Landing');
	array_walk($row, 'array_walk_simplexml', $sx_cr);
}

// ENVIA PARA A TELA
echo $sxe->asXML();

} catch (Exception $e) {
    echo 'Exceção capturada: ',  $e->getMessage(), "\n";
}

?> 