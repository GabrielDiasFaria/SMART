<?php 

header('Access-Control-Allow-Origin: *');

include "Conexao.php";

session_start();

if(isset($_POST["EMAIL"]))
{
	$v_Usuario = $_POST["EMAIL"];
	settype($v_Usuario, "string");
}

if(isset($_POST["SENHA"]))
{
	$v_Senha = $_POST["SENHA"];
	settype($v_Senha, "string");
}

$sql = "SELECT ID, Nome, Email, Empresa, Imagem, '../index.html' as Page FROM tb_User Where EMAIL = '$v_Usuario' And senha = MD5('$v_Senha') And ativo = '1'";


// DECLARA O XML
$sxe = new SimpleXMLElement('<workResponse></workResponse>');
	

// ADICIONA NODE PAI
$sxe_crs = $sxe->addChild('Logins');

	
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
	$sx_cr = $sxe_crs->addChild('Login');	
	array_walk($row, 'array_walk_simplexml', $sx_cr);
}

// ENVIA PARA A TELA
echo $sxe->asXML();



?>