var urlUserPermissionGet = "http://gdfconsultoria.com.br/SMART/php/UserPermission/User_GET.php";
var urlUserPermissionPost = "http://gdfconsultoria.com.br/SMART/php/UserPermission/User_POST.php";
var urlUserGet = "http://gdfconsultoria.com.br/SMART/php/User/User_GET.php";
var urlUserPost = "http://gdfconsultoria.com.br/SMART/php/User/User_POST.php";
var urlUserDelete = "http://gdfconsultoria.com.br/SMART/php/User/User_DELETE.php";


$(document).ready(function () {
	getUsers();
	generatePermissions();
});

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

function changeTab(tab) {
	$('ul.tabs').tabs('select_tab', tab);
}

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

function abre_Modal_Edit(id, Data_Criacao, Nome, Empresa, Empresa_Desc, Email, status, Imagem) {

	$('#ipt_user_id').val(id);
	$('#ipt_user_nome').val(Nome);
	$('#ipt_user_data').val(Data_Criacao);
	$('#ipt_user_email').val(Email);
	$('#ipt_user_empresa_id').val(Empresa);
	$('#ipt_user_empresa_desc').val(Empresa_Desc);

	if (Imagem != "" && Imagem != null) {
		$(".upload-preview").hide();
		$("#targetLayer").html('<img id="ipt_user_image" name="' + Imagem + '" src="../../assets/img_users/' + Imagem + '" width="100px" height="100px" class="upload-preview" />');
		$("#targetLayer").css('opacity', '0.7');
		$(".icon-choose-image").css('opacity', '0.5');
	}
	else {
		$(".upload-preview").show();
		$("#targetLayer").html('');
	}

	$('#ipt_user_stat').val(status);

	if (status == 1) {
		$('#ipt_user_stat').prop('checked', true);
	}
	else {
		$('#ipt_user_stat').prop('checked', false);
	}

	changeTab('tb_edit');
	//$('#mdl_edit_user').modal('open');
}

function prepara_Modal_Permission(p_screen, p_screen_name, p_select, p_create, p_edit, p_delete, p_user) {
	$('#var_user_permission').val(p_user);

	$('#' + p_screen + '_select').prop('checked', parseInt(p_select));
	$('#' + p_screen + '_create').prop('checked', parseInt(p_create));
	$('#' + p_screen + '_edit').prop('checked', parseInt(p_edit));
	$('#' + p_screen + '_delete').prop('checked', parseInt(p_delete));

	if (p_screen == 4) {
		$('#mdl_edit_user_permission').modal('open');
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

function postUserPermission() {

	var _i = 1;
	var _user = $('#var_user_permission').val();
	var _type = $('#var_user_permission_type').val();

	while (_i <= 4) {
		var _screen = _i;
		var _select = $('#' + _screen + '_select').is(":checked") ? "1" : "0";
		var _create = $('#' + _screen + '_create').is(":checked") ? "1" : "0";
		var _edit = $('#' + _screen + '_edit').is(":checked") ? "1" : "0";
		var _delete = $('#' + _screen + '_delete').is(":checked") ? "1" : "0";

		parametro = '{"SCREEN":"' + _screen + '"';
		parametro += ',"TYPE":"' + _type + '"';
		parametro += ',"SELECIONAR":"' + _select + '"';
		parametro += ',"USER":"' + _user + '"';
		parametro += ',"CRIAR":"' + _create + '"';
		parametro += ',"DELETAR":"' + _delete + '"';
		parametro += ',"EDITAR":"' + _edit + '"}';

		var jsonObj = JSON.parse(parametro);

		$.ajax({
			type: "POST",
			url: urlUserPermissionPost,
			crossDomain: true,
			beforeSend: function () { },
			data: jsonObj,
			dataType: "text",
			success: function (text) {
				Materialize.toast(text, 4000, 'rounded');

				setTimeout(
					function () {
						changeTab('tb_selection');
						//$('#mdl_edit_user_permission').modal('close');
					}, 1000);
			},
			error: function (xhr, textStatus, error) {

				alert("Ocorreu um erro inesperado durante o processamento.");

				console.log(xhr.statusText);
				console.log(textStatus);
				console.log(error);
			}
		});

		_i++;
	}
	getUsers();
}

function getUserPermission(id) {

	$('#var_user_permission').val("");
	urlByUser = urlUserPermissionGet + "?ID=" + id;

	$.ajax({

		type: "GET",
		url: urlByUser,
		crossDomain: true,
		beforeSend: function () { loader("Before"); }, // search | query_builder
		dataType: "xml",
		success: function (xml) {

			setTimeout(
				function () {
					$(xml).find('UserPermission').each(function () {
						var sScreen = $(this).find('Screen').text();
						var sDescription = $(this).find('Description').text();
						var sSelect = $(this).find('Select').text();
						var sCreate = $(this).find('Create').text();
						var sEdit = $(this).find('Edit').text();
						var sDelete = $(this).find('Delete').text();
						var sUser = $(this).find('User').text();

						$('#var_user_permission_type').val("U");

						prepara_Modal_Permission(sScreen, sDescription, sSelect, sCreate, sEdit, sDelete, sUser);
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

	if ($('#var_user_permission').val() == "") {
		var i = 1;
		$('#var_user_permission').val(id);
		$('#var_user_permission_type').val("I");

		while (i <= 4) {
			$('#' + i + '_select').prop('checked', 0);
			$('#' + i + '_create').prop('checked', 0);
			$('#' + i + '_edit').prop('checked', 0);
			$('#' + i + '_delete').prop('checked', 0);

			if (i == 4) {
				//$('#mdl_edit_user_permission').modal('open');
				changeTab('tb_permission');
			}
			i++;
		}
	}
}

function getUsers() {

	$("#usersList").html("");

	$.ajax({
		type: "GET",
		url: urlUserGet,
		crossDomain: true,
		beforeSend: function () { loader("Before"); }, // search | query_builder
		dataType: "xml",
		success: function (xml) {

			setTimeout(
				function () {
					$(xml).find('User').each(function () {
						var sId = $(this).find('Id').text();
						var sData_Criacao = $(this).find('Data_Criacao_Formatada').text();
						var sNome = $(this).find('Nome').text();
						var sEmpresa = $(this).find('Empresa').text();
						var sEmpresaDesc = $(this).find('Empresa_Desc').text();
						var sEmail = $(this).find('Email').text();
						var sAtivo = $(this).find('Ativo').text();
						var sImagem = $(this).find('Imagem').text();

						geraUser(sId, sData_Criacao, sNome, sEmpresa, sEmpresaDesc, sEmail, sAtivo, sImagem);
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

function postResetPass() {

	parametro = '{"SENHA":"1"';
	parametro += ',"NOME":"' + $('#ipt_user_nome').val() + '"';
	parametro += ',"ID":"' + $('#ipt_user_id').val() + '"}';

	var jsonObj = JSON.parse(parametro);

	$.ajax({
		type: "POST",
		url: urlUserPost,
		crossDomain: true,
		beforeSend: function () { loader("Before"); }, // search | query_builder
		data: jsonObj,
		dataType: "text",
		success: function (text) {
			Materialize.toast(text, 4000, 'rounded');
			loader("After");
			getUsers();

			setTimeout(
				function () {
					changeTab('tb_selection');
					//$('#mdl_edit_user').modal('close');
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

function postUsers() {

	var status = $('#ipt_user_stat').is(":checked") ? "1" : "0";
	var dataTratada = dataFormatadaBRUSA($('#ipt_user_data').val());

	parametro = '{"DATA_CRIACAO":"' + dataTratada + '"';
	parametro += ',"NOME":"' + $('#ipt_user_nome').val() + '"';
	parametro += ',"EMPRESA":"' + $('#ipt_user_empresa_id').val() + '"';
	parametro += ',"EMPRESA_DESC":"' + $('#ipt_user_empresa_desc').val() + '"';	
	parametro += ',"EMAIL":"' + $('#ipt_user_email').val() + '"';
	parametro += ',"ATIVO":"' + status + '"';
	if ($('#ipt_user_image').attr('name')) {
		parametro += ',"IMAGE":"' + $('#ipt_user_image').attr('name') + '"';
	}	
	else{
		parametro += ',"IMAGE":"photo.png"';		
	}
	parametro += ',"ID":"' + $('#ipt_user_id').val() + '"}';

	var jsonObj = JSON.parse(parametro);

	$.ajax({
		type: "POST",
		url: urlUserPost,
		crossDomain: true,
		beforeSend: function () { loader("Before"); }, // search | query_builder
		data: jsonObj,
		dataType: "text",
		success: function (text) {
			loader("After");
			Materialize.toast(text, 4000, 'rounded');
			localStorage['UserName'] = $('#ipt_user_nome').val();
			getUsers();

			setTimeout(
				function () {
					changeTab('tb_selection');
					//$('#mdl_edit_user').modal('close');
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

function deleteUsers() {

	parametro = '{"ID":"' + $('#ipt_user_id').val() + '"}';

	var jsonObj = JSON.parse(parametro);

	$.ajax({
		type: "POST",
		url: urlUserDelete,
		crossDomain: true,
		beforeSend: function () { loader("Before"); }, // search | query_builder
		data: jsonObj,
		dataType: "text",
		success: function (text) {
			Materialize.toast(text, 4000, 'rounded');
			loader("After");
			getUsers();

			setTimeout(
				function () {
					changeTab('tb_selection');
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

function geraUser(pv_id, pv_Data_Criacao, pv_Nome, pv_Empresa, pv_Empresa_Desc, pv_Email, pv_ativo, pv_Imagem) {

	var colorActive = "";
	pv_ativo == 1 ? colorActive = "green-text" : colorActive = "red-text";

	$("#usersList").append(
		'<tr>' +
		'  	<td>' + pv_id + '</td>' +
		'  	<td>' + pv_Nome + '</td>' +
		'	<td>' + pv_Empresa_Desc + '</td>' +
		'	<td>' + pv_Email + '</td>' +
		'   <td><i class="material-icons ' + colorActive + '" >check_circle</i></td>' +
		'	<td><a class="btn-floating userPage" onclick="abre_Modal_Edit(\'' + pv_id + '\', \'' + pv_Data_Criacao + '\', \'' + pv_Nome + '\', \'' + pv_Empresa + '\', \'' + pv_Empresa_Desc + '\', \'' + pv_Email + '\', \'' + pv_ativo + '\', \'' + pv_Imagem + '\');" data-position="top" data-delay="50" data-tooltip="Novo"><i class="material-icons white-text">edit</i><a/></td>' +
		'	<td><a class="btn-floating orange" onclick="getUserPermission(' + pv_id + ');" data-position="top" data-delay="50" data-tooltip="Novo"><i class="material-icons white-text">security</i><a/></td>' +
		'</tr >');

}

function generatePermissions() {
	// 1 = Leads
	// 2 = Landing
	// 3 = Agenda
	// 4 = Usuários
	if (localStorage['UserPermission_4_create'] == "0" || localStorage['UserPermission_4_create'] == null) {
		$("#user_create").hide();
	}
	if (localStorage['UserPermission_4_delete'] == "0" || localStorage['UserPermission_4_create'] == null) {
		$("#user_delete").hide();
	}
	if (localStorage['UserPermission_4_edit'] == "0" || localStorage['UserPermission_4_create'] == null) {
		$("#user_edit").hide();
	}

}

function showPreview(objFileInput) {
	if (objFileInput.files[0]) {
		var fileReader = new FileReader();
		fileReader.onload = function (e) {
			$(".upload-preview").hide();
			$("#targetLayer").html('<img src="' + e.target.result + '" width="100px" height="100px" class="upload-preview" />');
			$("#targetLayer").css('opacity', '0.7');
			$(".icon-choose-image").css('opacity', '0.5');
		}
		fileReader.readAsDataURL(objFileInput.files[0]);
	}
}

$("#uploadForm").on('submit', (function (e) {
	e.preventDefault();
	$.ajax({
		url: "http://smart.globalconsultoria.online/php/User/User_Upload_Image.php",
		type: "POST",
		data: new FormData(this),
		beforeSend: function () { $("#body-overlay").show(); },
		contentType: false,
		processData: false,
		success: function (data) {
			$("#targetLayer").html(data);
			$("#targetLayer").css('opacity', '1');
			setInterval(function () { $("#body-overlay").hide(); }, 500);
		},
		error: function () {
		}
	});
}));