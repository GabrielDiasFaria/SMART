
var controle_input = true;

$(document).ready(function(){
	montarMenu();
});

function montarMenu(){
	var menu = '' +
				'	<nav class="blue-grey darken-4" role="navigation">'+
				'		<a id="logo-container" class="brand-logo center">SMART</a>'+
				'		<ul id="slide-out" class="side-nav blue-grey darken-4">'+
				'			<li>'+
				'				<div class="user-view">'+
				'				  <div class="background">'+
				'					<img src="../assets/img/bg_user.jpg" style="width: 130%;">'+
				'				  </div>'+
				'				  <!-- <a href="#!user"><img class="circle" src="http://materializecss.com/images/yuna.jpg"></a> -->'+
				'				  <a href="#!user"><img class="circle" src="../assets/img/ui-sherman.jpg"></a>'+
				'				  <a href="#!name"><span class="white-text name">Gabriel Dias Faria</span></a>'+
				'				  <a href="#!email"><span class="white-text email">GDF Consultoria - TI</span></a>'+
				'				</div>'+
				'			</li>'+
				'			<li><a class="btn_frame white-text" frame="Newsletter/newsletter.html" titleFrame="Newsletter">'+
				'					<i class="material-icons blue-text">message</i>'+
				'					News'+
				'				</a>'+
				'			</li>'+
				'			<li><a class="btn_frame white-text" frame="LandingPage/landing_page.html" titleFrame="Landing Page" class="dropdown-button" data-activates="dpb_landing">'+
				'					<i class="material-icons left green-text">chrome_reader_mode</i>'+
				'					Landing Pages'+
				'				</a>'+
				'			</li>'+
				'			<li><a class="btn_frame dropdown-button white-text" frame="Lead/leads_page.html" titleFrame="Leads Page" data-activates="dpb_leads"><i class="material-icons left orange-text">assignment_ind</i>Leads</a></li>		'+
				'			<li><a class="btn_frame dropdown-button white-text" frame="Diary/diary_page.html" titleFrame="Leads Page" data-activates="dpb_agenda"><i class="material-icons left purple-text">event</i>Agenda</a></li>					'+					
				'			<!-- <li><a class="dropdown-button white-text" data-activates="dpb_relatorio"><i class="material-icons left purple-text">insert_chart</i>Relatórios</a></li> -->'+
				'			<li class="divider"></li>'+
				'			<li><a class="dropdown-button white-text" >'+
				'					<i class="material-icons left red-text">fingerprint</i>'+
				'					Usuário'+
				'				</a>'+
				'			</li>'+
				'			<li><a class="btn_frame white-text" frame="Configuracao/configuration.html" titleFrame="Configuração" data-activates="dpb_configuracao">'+
				'					<i class="material-icons left grey-text">settings</i>'+
				'					Configurações'+
				'				</a>'+
				'			</li>'+
				'		  </ul>'+
				'		  <a href="#" data-activates="slide-out" class="button-collapse "><i class="material-icons">menu</i></a>	'+			  
				'	</nav>';

		$("#Menu").html(menu);
}