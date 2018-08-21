var urlLeadGet = "http://gdfconsultoria.com.br/SMART/php/Lead/Lead_GET.php";
var urlLeadPost = "http://gdfconsultoria.com.br/SMART/php/Lead/Lead_POST.php";
var urlLeadDelete = "http://gdfconsultoria.com.br/SMART/php/Lead/Lead_DELETE.php";
var urlLandingGet  = "http://gdfconsultoria.com.br/SMART/php/LandingPage/LandingPage_GET.php";


$(document).ready(function () {

	$("#ipt_lead_telefone").mask("(99) 9 9999-9999");
	getLead();
	generatePermissions();
});

function changeTab(tab) {
	$('ul.tabs').tabs('select_tab', tab);
}

$('.datepicker').pickadate({
	selectMonths: true, // Creates a dropdown to control month
	selectYears: 15, // Creates a dropdown of 15 years to control year,
	today: 'Today',
	clear: 'Clear',
	close: 'Ok',
	closeOnSelect: false, // Close upon selecting a date,
	container: 'body', // ex. 'body' will append picker to body
	format: 'dd/mm/yyyy',
});

$("#ipt_landing_stat").change(function () {
	if ($(this).is(":checked")) {
		console.log("Is checked");
	}
	else {
		console.log("Is Not checked");
	}
	// $("#ipt_landing_stat").is(":checked")
});

function dataAtualFormatada() {
	var data = new Date();
	var dia = data.getDate();
	if (dia.toString().length == 1)
		dia = "0" + dia;
	var mes = data.getMonth() + 1;
	if (mes.toString().length == 1)
		mes = "0" + mes;
	var ano = data.getFullYear();
	return dia + "/" + mes + "/" + ano;
}

function abre_Modal_Edit(id, landing_id, landing, nome, telefone, email, data_cadastro, status, descricao) {

	$('#ipt_lead_id').val(id);
	$('#ipt_lead_landing_id').val(landing_id);
	$('#ipt_lead_landing').val(landing);
	$('#ipt_lead_nome').val(nome);
	$('#ipt_lead_telefone').val(telefone);
	$('#ipt_lead_email').val(email);
	$('#ipt_lead_text').val(descricao == "" || descricao == null ? "" : descricao.replace(/<br>/g, '\n')).trigger('autoresize');
	$('#ipt_lead_text').focusin();
	$('#ipt_lead_data').val(data_cadastro);
	$('#ipt_lead_stat').val(status);

	if (status == 1) {
		$('#ipt_lead_stat').prop('checked', true);
	}
	else {
		$('#ipt_lead_stat').prop('checked', false);
	}

	changeTab('tb_edit');
	//$('#mdl_edit_lead').modal('open');  
}

function loader(modo) {
	if (modo == "Before") {
		$("#preLoader").removeClass("displayNone");
		$("#loaderBlur").addClass("blurDiv");
	}
	else {
		$("#loaderBlur").removeClass("blurDiv");
		$("#preLoader").addClass("displayNone");
	}
}

function dataAtualFormatadaHora() {
	var data = new Date();

	var hora = data.getHours();
	if (hora.toString().length == 1)
		var hora = "0" + hora;

	var minutos = data.getMinutes();
	if (minutos.toString().length == 1)
		var minutos = "0" + minutos;

	var refresh = hora + ":" + minutos;
	return refresh;
}

function dataFormatadaBRUSA(data) {
	var dia = data.substring(0, 2);
	var mes = data.substring(3, 5);
	var ano = data.substring(6, 10);

	return ano + "-" + mes + "-" + dia;
}

function getLead() {

	$("#leadsList").html("");

	var urlParams = urlLeadGet + "?USUARIO=" + localStorage['UserId'];

	$.ajax({

		type: "GET",
		url: urlParams,
		crossDomain: true,
		beforeSend: function () { loader("Before"); }, // search | query_builder
		dataType: "xml",
		success: function (xml) {

			setTimeout(
				function () {
					$(xml).find('Lead').each(function () {
						var sId = $(this).find('id').text();
						var sLanding = $(this).find('landing_page').text();
						var sLandingName = $(this).find('Landing_Name').text();
						var sData_Criacao = $(this).find('Data_Criacao_Formatada').text();
						var sNomeCompleto = $(this).find('nome_completo').text();
						var sTelefone = $(this).find('telefone').text();
						var sEmail = $(this).find('email').text();
						var sAtivo = $(this).find('ativo').text();
						var sDescricao = $(this).find('descricao').text();

						geraLead(sId, sLanding, sLandingName, sData_Criacao, sNomeCompleto, sTelefone, sEmail, sAtivo, sDescricao);
					});
					loader("After");
				}, 1000);
		},
		error: function (xhr, textStatus, error) {

			alert("Ocorreu um erro inesperado durante o processamento.");

			console.log(xhr.statusText);
			console.log(textStatus);
			console.log(error);
		}
	});
}

function postLead() {

	var status = $('#ipt_lead_stat').is(":checked") ? "1" : "0";
	var dataTratada = dataFormatadaBRUSA($('#ipt_lead_data').val());
	var v_descricao = $('#ipt_lead_text').val().replace(/\n/g, '<br>');

	parametro = '{"DATA_CRIACAO":"' + dataTratada + '"';
	parametro += ',"LANDING":"' + $('#ipt_lead_landing_id').val() + '"';
	parametro += ',"NOME_COMPLETO":"' + $('#ipt_lead_nome').val() + '"';
	parametro += ',"EMAIL":"' + $('#ipt_lead_email').val() + '"';
	parametro += ',"TELEFONE":"' + $('#ipt_lead_telefone').val() + '"';
	parametro += ',"ATIVO":"' + status + '"';
	parametro += ',"DESCRICAO":"' + v_descricao + '"';
	parametro += ',"EMPRESA":"'+localStorage['UserEmpresa']+'"';
	parametro += ',"ID":"' + $('#ipt_lead_id').val() + '"}';

	var jsonObj = JSON.parse(parametro);

	$.ajax({
		type: "POST",
		url: urlLeadPost,
		crossDomain: true,
		beforeSend: function () { loader("Before"); }, // search | query_builder
		data: jsonObj,
		dataType: "text",
		success: function (text) {
			Materialize.toast(text, 4000, 'rounded');
			loader("After");
			getLead();

			setTimeout(
				function () {
					changeTab('tb_selection');
					//$('#mdl_edit_lead').modal('close');
				}, 1000);
		},
		error: function (xhr, textStatus, error) {

			alert("Ocorreu um erro inesperado durante o processamento.");

			console.log(xhr.statusText);
			console.log(textStatus);
			console.log(error);
		}
	});
}

function deleteLead() {

	parametro = '{"ID":"' + $('#ipt_lead_id').val() + '"}';

	var jsonObj = JSON.parse(parametro);

	$.ajax({
		type: "POST",
		url: urlLeadDelete,
		crossDomain: true,
		beforeSend: function () { loader("Before"); }, // search | query_builder
		data: jsonObj,
		dataType: "text",
		success: function (text) {
			Materialize.toast(text, 4000, 'rounded');
			loader("After");
			getLead();

			setTimeout(
				function () {
					changeTab('tb_selection');
					//$('#mdl_edit_lead').modal('close');
				}, 1000);
		},
		error: function (xhr, textStatus, error) {

			alert("Ocorreu um erro inesperado durante o processamento.");

			console.log(xhr.statusText);
			console.log(textStatus);
			console.log(error);
		}
	});
}

function geraLead(pv_id, pv_landing, pv_landing_name, pv_data_criacao, pv_nome_completo, pv_telefone, pv_email, pv_ativo, pv_descricao) {

	var colorActive = "";
	pv_ativo == 1 ? colorActive = "green-text" : colorActive = "red-text";

	$("#leadsList").append(
		'<tr>' +
		'  	<td>' + pv_id + '</td>' +
		'  	<td>' + pv_landing_name + '</td>' +
		'	<td>' + pv_nome_completo + '</td>' +
		//'	<td>'+pv_telefone+'</td>'+
		'	<td>' + pv_email + '</td>' +
		//'	<!-- <td>'+pv_data_criacao+'</td> -->'+
		' <td><i class="material-icons ' + colorActive + '" >check_circle</i></td>' +
		'	<td><a class="btn-floating light-blue darken-4" onclick="abre_Modal_Edit(\'' + pv_id + '\', \'' + pv_landing + '\', \'' + pv_landing_name + '\', \'' + pv_nome_completo + '\', \'' + pv_telefone + '\', \'' + pv_email + '\', \'' + pv_data_criacao + '\', \'' + pv_ativo + '\', \'' + pv_descricao + '\');" data-position="top" data-delay="50" data-tooltip="Novo"><i class="material-icons white-text">edit</i><a/></td>' +
		'</tr >');

}

function generatePermissions() {
	// 1 = Leads
	// 2 = Landing
	// 3 = Agenda
	// 4 = Usuários
	if (localStorage['UserPermission_1_create'] == "0" || localStorage['UserPermission_1_create'] == null) {
		$("#leads_create").hide();
	}
	if (localStorage['UserPermission_1_delete'] == "0" || localStorage['UserPermission_1_create'] == null) {
		$("#leads_delete").hide();
	}
	if (localStorage['UserPermission_1_edit'] == "0" || localStorage['UserPermission_1_create'] == null) {
		$("#leads_edit").hide();
	}

}

// *************************************//
// 		   SELECIONAR LANDING			//
// *************************************//
function getLandingPages() {

	$("#landingPagesList").html("");

	var urlParams = urlLandingGet + "?USUARIO=" + localStorage['UserId'];

	$.ajax({

		type: "GET",
		url: urlParams,
		crossDomain: true,
		beforeSend: function () { loader("Before"); }, // search | query_builder
		dataType: "xml",
		success: function (xml) {

			setTimeout(
				function () {
					$(xml).find('Landing').each(function () {
						var sId = $(this).find('id').text();
						var sData_Inicio = $(this).find('Data_Inicio_Formatada').text();
						var sTitulo = $(this).find('titulo').text();
						var sLink = $(this).find('link').text();
						var sAtivo = $(this).find('ativo').text();

						geraLandingPage(sId, sData_Inicio, sTitulo, sLink, sAtivo);
					});
					loader("After");
				}, 1000);
		},
		error: function (xhr, textStatus, error) {

			alert("Ocorreu um erro inesperado durante o processamento.");

			console.log(xhr.statusText);
			console.log(textStatus);
			console.log(error);
		}
	});
}

$("#ipt_lead_landing_id").click(function () {
	$('#modalLandingPage').modal('open');
	getLandingPages();
});

function selecionarLanding(id, titulo) {
	$('#modalLandingPage').modal('close');
	$('#ipt_lead_landing_id').val(id);
	$('#ipt_lead_landing').val(titulo);
}

function geraLandingPage(pv_id, pv_data_inicio, pv_titulo, pv_link, pv_ativo) {

	$("#landingPagesList").append(
		'<tr>' +
		'  	<td>' + pv_id + '</td>' +
		'  	<td>' + pv_titulo + '</td>' +
		'	<td><a class="btn-floating green" onclick="selecionarLanding(\'' + pv_id + '\',\'' + pv_titulo + '\')" data-position="top" data-delay="50" data-tooltip="Novo"><i class="material-icons white-text">add_circle_outline</i><a/></td>' +
		'</tr >');

}
// *************************************//
// 		   SELECIONAR LANDING			//
// *************************************//