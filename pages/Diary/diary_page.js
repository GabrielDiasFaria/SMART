var urlDiaryGet = "http://gdfconsultoria.com.br/SMART/php/Diary/Diary_GET.php";
var urlDiaryPost = "http://gdfconsultoria.com.br/SMART/php/Diary/Diary_POST.php";
var urlDiaryDelete = "http://gdfconsultoria.com.br/SMART/php/Diary/Diary_DELETE.php";
var urlLeadGet  = "http://gdfconsultoria.com.br/SMART/php/Lead/Lead_GET.php";


$(document).ready(function () {
	var today = moment().format('YYYY-MM-D');

	var initialLocaleCode = 'pt-br';

	$('#calendar').fullCalendar({
		header: {
			left: 'prev today next',
			center: 'title',
			right: 'month listMonth'
			// prev
			// agendaWeek agendaDay
		},
		eventClick: function (event) {
			// opens events in a popup window
			//alert("Lead: " + event.lead);
			abre_Modal_Edit(event.id, event.lead, event.leadName, event.start._i.substring(0, 10), event.start._i.substring(11, 16), event.end._i, event.color, event.descricao);
		},
		defaultDate: today,
		locale: initialLocaleCode,
		buttonIcons: false, // show the prev/next text
		weekNumbers: true,
		navLinks: true, // can click day/week names to navigate views
		editable: true,
		eventLimit: true, // allow "more" link when too many events
		events: [{}]
	});

	addClassMaterialize();
	geraEvento("", "", "", "", "", "", "", "", "");
	getDairy();
	generatePermissions();
});

function dataFormatadaBRUSA(data) {
	var dia = data.substring(0, 2);
	var mes = data.substring(3, 5);
	var ano = data.substring(6, 10);

	return ano + "-" + mes + "-" + dia;
}

$("#ipt_event_color_pallet").change(function (event) {
	$('#ipt_event_cor').val(event.target.value);
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

function geraEvento(id, cor, lead, lead_name, data_inicio, hora_inicial, data_fim, ativo, descricao) {

	//var event={title: "Gabriel Dias Faria", start: "2018-05-01", end: "2018-05-02", id: "1", lead: "1", leadName: "Gabriel Dias Faria", color: "#257e4a"};
	//$('#calendar').fullCalendar( 'renderEvent', event, true);

	//var event={title: "Hélio Pessoa", start: "2018-05-12", end: "2018-05-14", id:"2", lead: "2", leadName: "Hélio Pessoa", color: "#257R4b"};
	//$('#calendar').fullCalendar( 'renderEvent', event, true);
	var evento_inicio = data_inicio + 'T' + hora_inicial;
	var event = { title: lead_name, start: evento_inicio, end: data_fim, id: id, lead: lead, leadName: lead_name, color: cor, descricao: descricao };
	$('#calendar').fullCalendar('renderEvent', event, true);
}

function abre_Modal_Edit(id, lead, nome, inicio, hora_inicio, fim, color, descricao) {

	$('#ipt_event_id').val(id);
	$('#ipt_event_lead').val(lead);
	$('#ipt_event_nome').val(nome);
	$('#ipt_event_inicio').pickadate('picker').set('select', inicio, { format: 'yyyy-mm-dd' }).trigger("change");
	$('#ipt_event_inicio_hora').val(hora_inicio);
	$('#ipt_event_fim').pickadate('picker').set('select', fim, { format: 'yyyy-mm-dd' }).trigger("change");
	$('#ipt_event_cor').val(color);
	$('#ipt_event_text').val(descricao == "" || descricao == null ? "" : descricao.replace(/<br>/g, '\n')).trigger('autoresize');
	$('#ipt_event_text').focusin();
	$('#ipt_event_color_pallet').val(color);

	changeTab('tb_edit');
	//$('#mdl_edit_event').modal('open');  
}

function addClassMaterialize() {
	// ADICIONANDO IMAGENS
	$(".fc-next-button").text("").append('<i class="material-icons">navigate_next</i>');
	$(".fc-prev-button").text("").append('<i class="material-icons">navigate_before</i>');
	$(".fc-listMonth-button").text("").append('<i class="material-icons">format_list_bulleted</i>');
	$(".fc-month-button").text("").append('<i class="material-icons">date_range</i>');

	// MODIFICANDO BOTÕES
	$(".fc-button").addClass("waves-effect waves-light btn diaryPage");
	//$( ".fc-button" ).addClass( "" );
	//$( ".fc-button" ).addClass( "" );

	//replaceElementTag('button', '<a></a>');

	$(".fc-button").removeClass("fc-month-button fc-button fc-state-default fc-corner-left fc-corner-right fc-state-active");
}

function replaceElementTag(targetSelector, newTagString) {
	$(targetSelector).each(function () {
		var newElem = $(newTagString, { html: $(this).html() });
		$.each(this.attributes, function () {
			newElem.attr(this.name, this.value);
		});
		$(this).replaceWith(newElem);
	});
}

function getDairy() {

	$('#calendar').fullCalendar('removeEventSources');
	$('#calendar').fullCalendar('removeEvents', function (e) { return !e.isUserCreated });

	var urlParams = urlDiaryGet + "?USUARIO=" + localStorage['UserId'];

	$.ajax({

		type: "GET",
		url: urlParams,
		crossDomain: true,
		beforeSend: function () {
			loader("Before");
		}, // search | query_builder
		dataType: "xml",
		success: function (xml) {

			setTimeout(
				function () {
					$(xml).find('Diary').each(function () {
						var sId = $(this).find('id').text();
						var sCor = $(this).find('cor').text();
						var sLead = $(this).find('lead').text();
						var sLeadName = $(this).find('Nome_Completo').text();
						var sData_Inicio = $(this).find('data_inicio').text();
						var sData_Inicio_Hora = $(this).find('hora_inicial').text();
						var sData_Fim = $(this).find('data_fim').text();
						var sAtivo = $(this).find('ativo').text();
						var sDescricao = $(this).find('descricao').text();

						geraEvento(sId, sCor, sLead, sLeadName, sData_Inicio, sData_Inicio_Hora, sData_Fim, sAtivo, sDescricao);
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

function formatDate(date) {
	var d = new Date(date),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	return [year, month, day].join('-');
}

function postDairy() {

	// var status = $('#ipt_lead_stat').is(":checked") ? "1" : "0";
	var dataInicioTratada = dataFormatadaBRUSA($('#ipt_event_inicio').val());
	// var dataFimTratada = dataFormatadaBRUSA($('#ipt_event_fim').val());
	var date = new Date(dataInicioTratada);
	date.setDate(date.getDate() + 2);

	var v_descricao = $('#ipt_event_text').val().replace(/\n/g, '<br>');

	parametro = '{ "DATA_INICIO":"' + dataInicioTratada + '"';
	parametro += ',"DATA_INICIO_HORA":"' + $('#ipt_event_inicio_hora').val() + '"';
	parametro += ',"DATA_FIM":"' + formatDate(date) + '"';
	parametro += ',"COR":"' + $('#ipt_event_cor').val() + '"';
	parametro += ',"LEAD":"' + $('#ipt_event_lead').val() + '"';
	parametro += ',"ATIVO":"1"';
	parametro += ',"DESCRICAO":"' + v_descricao + '"';
	parametro += ',"EMPRESA":"'+localStorage['UserEmpresa']+'"';
	parametro += ',"ID":"' + $('#ipt_event_id').val() + '"}';

	var jsonObj = JSON.parse(parametro);

	$.ajax({
		type: "POST",
		url: urlDiaryPost,
		crossDomain: true,
		beforeSend: function () { loader("Before"); }, // search | query_builder
		data: jsonObj,
		dataType: "text",
		success: function (text) {
			Materialize.toast(text, 4000, 'rounded');
			loader("After");
			getDairy();
			setTimeout(
				function () {
					changeTab('tb_selection');
					//$('#mdl_edit_event').modal('close');
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

function deleteEvento() {

	parametro = '{"ID":"' + $('#ipt_event_id').val() + '"}';

	var jsonObj = JSON.parse(parametro);

	$.ajax({
		type: "POST",
		url: urlDiaryDelete,
		crossDomain: true,
		beforeSend: function () { }, // search | query_builder
		data: jsonObj,
		dataType: "text",
		success: function (text) {
			Materialize.toast(text, 4000, 'rounded');
			getDairy();

			setTimeout(
				function () {
					changeTab('tb_selection');
					//$('#mdl_edit_event').modal('close');
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

function generatePermissions() {
	// 1 = Leads
	// 2 = Landing
	// 3 = Agenda
	// 4 = Usuários
	if (localStorage['UserPermission_3_create'] == "0" || localStorage['UserPermission_3_create'] == null) {
		$("#diary_create").hide();
	}
	if (localStorage['UserPermission_3_delete'] == "0" || localStorage['UserPermission_3_create'] == null) {
		$("#diary_delete").hide();
	}
	if (localStorage['UserPermission_3_edit'] == "0" || localStorage['UserPermission_3_create'] == null) {
		$("#diary_edit").hide();
	}

}

function getLead(){

	$("#leadsList").html("");

	var urlParams = urlLeadGet + "?USUARIO=" + localStorage['UserId'];

	$.ajax({

			type: 	  "GET",
			url:  	  urlParams,
			crossDomain: true,
			beforeSend: function(){ loader("Before"); }, // search | query_builder
			dataType: "xml",
			success: function (xml) {

				setTimeout(
				  function() 
				  {				    
					$(xml).find('Lead').each(function () {						
						var sId         	= $(this).find('id').text();
						var sLanding	 	= $(this).find('landing_page').text();
						var sLandingName 	= $(this).find('Landing_Name').text();
						var sData_Criacao 	= $(this).find('Data_Criacao_Formatada').text();
						var sNomeCompleto	= $(this).find('nome_completo').text();
						var sTelefone		= $(this).find('telefone').text();
						var sEmail			= $(this).find('email').text();
						var sAtivo 			= $(this).find('ativo').text();

						geraLead(sId, sLanding, sLandingName, sData_Criacao, sNomeCompleto, sTelefone, sEmail, sAtivo);
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

// *************************************//
// 			SELECIONAR LEAD				//
// *************************************//
function geraLead(pv_id, pv_landing, pv_landing_name, pv_data_criacao, pv_nome_completo, pv_telefone, pv_email, pv_ativo){

	$("#leadsList").append(
		'<tr>'+
		'  	<td>'+pv_id+'</td>'+
		'  	<td>'+pv_landing_name+'</td>'+				
		'	<td>'+pv_nome_completo+'</td>'+
		'	<td><a class="btn-floating orange" onclick="selecionarLead(\''+pv_id+'\',\''+pv_nome_completo+'\')" data-position="top" data-delay="50" data-tooltip="Novo"><i class="material-icons white-text">add_circle_outline</i><a/></td>'+
		'</tr >');
}

$("#ipt_event_lead").click(function () {
	$('#modalLead').modal('open');
	getLead();
});

function selecionarLead(id, nome_completo){
	$('#modalLead').modal('close');
	$('#ipt_event_lead').val(id);
	$('#ipt_event_nome').val(nome_completo);
}
// *************************************//
// 			SELECIONAR LEAD				//
// *************************************//