<?php

include "../Conexao.php";

header('Access-Control-Allow-Origin: *');

try {

$sql 				= "";
$v_where 			= "";
$v_Usuario			= "";
$v_id				= "";
$v_nome_completo	= "";

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

if(isset($_GET["NOME_COMPLETO"]))
{
	$v_nome_completo = $_GET["NOME_COMPLETO"];
	settype($v_nome_completo, "string");
	
	if($v_where == ""){
		$v_where = " WHERE NOME_COMPLETO like '%" . $v_nome_completo . "%'";
	}else{
		$v_where .= " AND NOME_COMPLETO like '%" . $v_nome_completo . "%'";
	}
}

$sql =  "SELECT L.*,DATE_FORMAT(L.Data_Criacao,'%d/%m/%Y') AS Data_Criacao_Formatada, LP.titulo AS Landing_Name FROM tb_Lead as L JOIN tb_LandingPage as LP on LP.ID = L.landing_Page JOIN tb_User U ON U.Empresa = L.Empresa AND U.Id = $v_Usuario " . $v_where;

// DECLARA O XML
$sxe = new SimpleXMLElement('<workResponse></workResponse>');
	

// ADICIONA NODE PAI
$sxe_crs = $sxe->addChild('Leads');

	
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
	$sx_cr = $sxe_crs->addChild('Lead');
	array_walk($row, 'array_walk_simplexml', $sx_cr);
}

// ENVIA PARA A TELA
echo $sxe->asXML();

} catch (Exception $e) {
    echo 'Exceção capturada: ',  $e->getMessage(), "\n";
}

?> 