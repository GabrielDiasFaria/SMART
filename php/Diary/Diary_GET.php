<?php

include "../Conexao.php";

header('Access-Control-Allow-Origin: *');

try {

$sql 				= "";
$v_where 			= "";
$v_Usuario			= "";
$v_id				= "";
$v_data_inicio		= "";

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

if(isset($_GET["DATA_INICIO"]))
{
	$v_data_inicio = $_GET["DATA_INICIO"];
	settype($v_data_inicio, "string");
	
	if($v_where == ""){
		$v_where = " WHERE data_inicio like '%" . $v_data_inicio . "%'";
	}else{
		$v_where .= " AND data_inicio like '%" . $v_data_inicio . "%'";
	}
}

$sql =  "SELECT D.*, DATE_FORMAT(D.data_inicio,'%d/%m/%Y') AS Data_Inicio_Formatada,DATE_FORMAT(D.data_fim,'%d/%m/%Y') AS Data_Fim_Formatada, L.Nome_Completo FROM tb_Dairy D JOIN tb_Lead as L on L.ID = D.lead JOIN tb_User U ON U.Empresa = D.Empresa AND U.Id = $v_Usuario " . $v_where;

// DECLARA O XML
$sxe = new SimpleXMLElement('<workResponse></workResponse>');
	

// ADICIONA NODE PAI
$sxe_crs = $sxe->addChild('Diarys');

	
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
	$sx_cr = $sxe_crs->addChild('Diary');
	array_walk($row, 'array_walk_simplexml', $sx_cr);
}

// ENVIA PARA A TELA
echo $sxe->asXML();

} catch (Exception $e) {
    echo 'Exceção capturada: ',  $e->getMessage(), "\n";
}

?> 