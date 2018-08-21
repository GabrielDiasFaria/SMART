var urlLandingGet  = "http://gdfconsultoria.com.br/SMART/php/LandingPage/LandingPage_GET.php";
var urlLandingPost = "http://gdfconsultoria.com.br/SMART/php/LandingPage/LandingPage_POST.php";
var urlLandingDelete = "http://gdfconsultoria.com.br/SMART/php/LandingPage/LandingPage_DELETE.php";


$(document).ready(function(){
	//geraLandingPage(1, "21/05/2018", 1, 1, 1);
	getLandingPages();
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

$("#ipt_landing_stat").change(function() {
	if($(this).is(":checked")) {
	  console.log("Is checked");
	}
	else {
	  console.log("Is Not checked");
	}
});

function dataAtualFormatada(){
    var data = new Date();
    var dia = data.getDate();
    if (dia.toString().length == 1)
      dia = "0"+dia;
    var mes = data.getMonth()+1;
    if (mes.toString().length == 1)
      mes = "0"+mes;
    var ano = data.getFullYear();  
    return dia+"/"+mes+"/"+ano;
}

function dataFormatadaBRUSA(data){
    var dia = data.substring(0, 2);
    var mes = data.substring(3, 5);
    var ano = data.substring(6, 10);

    return ano+"-"+mes+"-"+dia;
}

function changeTab(tab){
	$('ul.tabs').tabs('select_tab', tab);
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

function abre_Modal_Edit(id, titulo, data_inicio, status, url, img){
	
	$('#ipt_landing_id').prop('disabled', true);
	
	$('#ipt_landing_id').val(id);
	$('#ipt_landing_titulo').val(titulo);
	$('#ipt_landing_data').pickadate('picker').set('select', data_inicio, { format: 'dd/mm/yyyy' }).trigger("change");
	$('#ipt_landing_link').val(url);
	$('#ipt_landing_img').val(img);
	
	if( status == 1 ){
		$('#ipt_landing_stat').prop('checked', true);
	}
	else{
		$('#ipt_landing_stat').prop('checked', false);
	}
		
	changeTab('tb_edit');
	//$('#mdl_edit_landing').modal('open');  
}

function dataAtualFormatadaHora(){
    var data = new Date();
	
	var hora = data.getHours();
	if (hora.toString().length == 1)
      var hora = "0"+hora;
  
	var minutos = data.getMinutes();
	if (minutos.toString().length == 1)
      var minutos = "0"+minutos;
	
    var refresh = hora + ":" + minutos; 
    return refresh;
}

function getLandingPages(){

	$("#landingPagesList").html("");

	var urlParams = urlLandingGet + "?USUARIO=" + localStorage['UserId'];

	$.ajax({

			type: 	  "GET",
			url:  	  urlParams,
			crossDomain: true,
			beforeSend: function(){ loader("Before");  }, // search | query_builder
			dataType: "xml",
			success: function (xml) {

				setTimeout(
				  function() 
				  {				    
					$(xml).find('Landing').each(function () {						
						var sId         	= $(this).find('id').text();
						var sData_Inicio 	= $(this).find('Data_Inicio_Formatada').text();
						var sTitulo			= $(this).find('titulo').text();
						var sLink 			= $(this).find('link').text();
						var sAtivo 			= $(this).find('ativo').text();

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

function deleteLandingPages(){

	parametro  = '{"ID":"'+$('#ipt_landing_id').val()+'"}';

	var jsonObj = JSON.parse(parametro);

	$.ajax({
			type: 	  "POST",
			url:  	  urlLandingDelete,
			crossDomain: true,
			beforeSend: function(){ loader("Before");  }, // search | query_builder
			data: 	  jsonObj,
			dataType: "text",
			success: function (text) {
				Materialize.toast(text, 4000, 'rounded');
				loader("After");
				getLandingPages();
				setTimeout(
				  function() 
				  {								  	
					//$('#mdl_edit_landing').modal('close');
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

function postLandingPages(){

	var status = $('#ipt_landing_stat').is(":checked") ? "1" : "0";
	var dataTratada = dataFormatadaBRUSA($('#ipt_landing_data').val());

	parametro  = '{"DATA_INICIO":"'+dataTratada+'"';
	parametro  += ',"TITULO":"'+$('#ipt_landing_titulo').val()+'"';
	parametro  += ',"LINK":"'+$('#ipt_landing_link').val()+'"';
	parametro  += ',"ATIVO":"'+status+'"';	
	parametro += ',"EMPRESA":"'+localStorage['UserEmpresa']+'"';
	parametro  += ',"ID":"'+$('#ipt_landing_id').val()+'"}';

	var jsonObj = JSON.parse(parametro);

	$.ajax({
			type: 	  "POST",
			url:  	  urlLandingPost,
			crossDomain: true,
			beforeSend: function(){ loader("Before");  }, // search | query_builder
			data: 	  jsonObj,
			dataType: "text",
			success: function (text) {
				Materialize.toast(text, 4000, 'rounded');
				loader("After");
				getLandingPages();

				setTimeout(
				  function() 
				  {
					//$('#mdl_edit_landing').modal('close');
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


function geraLandingPage(pv_id, pv_data_inicio, pv_titulo, pv_link, pv_ativo){

	var colorActive = "";

	pv_ativo == 1 ? colorActive = "green-text" : colorActive = "red-text" ;

	$("#landingPagesList").append(
	'<div class="col s12 m4">'+
	'	<div class="card horizontal">'+
	'	  <div class="card-image">'+
	'		<a href="https://s.wordpress.com/mshots/v1/'+pv_link+'" title="Clique aqui para ampliar" ><img src="https://s.wordpress.com/mshots/v1/'+pv_link+'" width="90" height="90" /></a>'+								
	'	  </div>'+
	'	  <div class="card-stacked">'+
	'		<div class="card-content">'+
	'			<p><b>LP - #'+pv_id+'</b></p>'+
	'			<p><b>Título:</b> '+pv_titulo+'</p><hr>'+
	'			<p><b>Data Início:</b> '+pv_data_inicio+'</p>'+
	'			<p><b>Status:</b> <i class="material-icons '+colorActive+'" >check_circle</i></p>'+
	'		</div>'+
	'		<div class="card-action">'+
	'			<a class="btn-floating halfway-fab waves-effect waves-light landingPageTextBtn1 right tooltipped"'+ 
	'		onclick="abre_Modal_Edit('+pv_id+', \''+pv_titulo+'\', \''+pv_data_inicio+'\', \''+pv_ativo+'\', \''+pv_link+'\', \'https://s.wordpress.com/mshots/v1/'+pv_link+'\');" data-position="top" data-delay="50" data-tooltip="Editar"><i class="material-icons">edit</i></a>'+
	'			<a class="btn-floating halfway-fab waves-effect waves-light landingPageTextBtn2 right tooltipped" href="'+pv_link+'" target="_blank"  data-position="top" data-delay="50" data-tooltip="Acessar" style="margin-right: 45px"><i class="material-icons">language</i></a>'+
	'		</div>'+
	'	  </div>'+
	'	</div>'+
	'</div>');

}

function generatePermissions(){
	// 1 = Leads
	// 2 = Landing
	// 3 = Agenda
	// 4 = Usuários
	if(localStorage['UserPermission_2_create'] == "0" || localStorage['UserPermission_2_create'] == null){		
		$("#landing_criar").hide(); 
	}
	if(localStorage['UserPermission_2_delete'] == "0" || localStorage['UserPermission_2_create'] == null){		
		$("#landing_delete").hide(); 
	}
	if(localStorage['UserPermission_2_edit'] == "0" || localStorage['UserPermission_2_create'] == null){		
		$("#landing_edit").hide(); 
	}

}