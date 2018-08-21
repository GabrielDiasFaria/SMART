
var controle_input = true;

$(document).ready(function(){
	var u_user = localStorage['UserId'];
	var u_name = localStorage['UserName'];
	var u_email = localStorage['UserEmail'];
	var u_image = localStorage['UserImage'];

	generateMeu();
	getUser(u_user, u_name, u_email, u_image);

	$('.materialboxed').materialbox();
	$('select').material_select();
	
	$('.button-collapse').sideNav({
		  menuWidth: 250, // Default is 300
		  edge: 'left', // Choose the horizontal origin
		  closeOnClick: false, // Closes side-nav on <a> clicks, useful for Angular/Meteor
		  draggable: true, // Choose whether you can drag to open on touch screens,
		  onOpen: function(el) { /* Do Stuff */ }, // A function to be called when sideNav is opened
		  onClose: function(el) { /* Do Stuff */ }, // A function to be called when sideNav is closed
		}
	);
	
	$('.dropdown-button').dropdown({
		  inDuration: 500,
		  outDuration: 250,
		  constrainWidth: true, // Does not change width of dropdown to that of the activator
		  hover: true, // Activate on hover
		  gutter: 20,//($('.dropdown-content').width()*1)/2.5, // Spacing from edge
		  belowOrigin: true, // Displays dropdown below the button
		  alignment: 'left', // Displays dropdown with edge aligned to the left of button
		  stopPropagation: false // Stops event propagation
		}
	);

	$('.dropdown-button2').dropdown({
		  inDuration: 500,
		  outDuration: 250,
		  constrain_width: true, // Does not change width of dropdown to that of the activator
		  hover: true, // Activate on hover
		  gutter: 15,//($('.dropdown-content').width()*1)/2.5, // Spacing from edge
		  belowOrigin: true, // Displays dropdown below the button
		  alignment: 'left' // Displays dropdown with edge aligned to the left of button
		  //stopPropagation: false // Stops event propagation
		}
	);
			
	eventoFade();		
	$('.btn_frame').click(function(){
		frameChange($(this).attr('frame'), $(this).attr('titleFrame'));
	});
	
	$('.datepicker').pickadate({
		selectMonths: true, // Creates a dropdown to control month
		selectYears: 5, // Creates a dropdown of 15 years to control year,
		today: 'Today',
		clear: 'Clear',
		close: 'Ok',
		closeOnSelect: true // Close upon selecting a date,
	});
	
	$('.modal').modal();
});

// MUDANÇA DO IFRAME SRC
function frameChange(page, title)
{
	document.title = "SMART - " + title;
	
	$('#iframe').attr('src', page);
	//$("#iframe-container").load(page);

	$('.button-collapse').sideNav('hide');
}

// EVENTO DE ABERTURA DE TELA
function eventoFade()
{
	$("#Body").delay(0).animate({"opacity": "1"}, 1000);
}

function getUser(user, name, email, image){
	$("#Param_Email").html(email);
	$("#Param_Name").html(name);
	$("#user_Image").html('<img class="circle" src="../assets/img_users/'+image+'">');

	if(user == null || name == null || email == null){		
		window.location.href = "Usuario/login.html"; 
	}
	else if(user == "" || name == "" || email == null){
		window.location.href = "Usuario/login.html"; 		
	}	
}

function logOut(){
	localStorage['UserId'] = "";
	localStorage['UserName'] = "";
	localStorage['UserEmail'] = "";
	localStorage['UserImage'] = "";

	var _i = 1;
	while (_i <= 4) {
		localStorage['UserPermission_'+_i+'_select']   = ""; 
		localStorage['UserPermission_'+_i+'_create']   = "";
		localStorage['UserPermission_'+_i+'_edit']     = "";
		localStorage['UserPermission_'+_i+'_delete']   = "";
		_i++;
	}

	window.location.reload(true);
	window.location.href = "index.html";
}

function generateMeu(){
	// 1 = Leads
	// 2 = Landing
	// 3 = Agenda
	// 4 = Usuários
	if(localStorage['UserPermission_0_select'] == "0" || localStorage['UserPermission_0_select'] == null){		
		$("#mn_news").hide(); 
	}
	if(localStorage['UserPermission_1_select'] == "0" || localStorage['UserPermission_1_select'] == null){		
		$("#mn_leads").hide(); 
	}
	if(localStorage['UserPermission_2_select'] == "0" || localStorage['UserPermission_2_select'] == null){		
		$("#mn_landing").hide(); 
	}
	if(localStorage['UserPermission_3_select'] == "0" || localStorage['UserPermission_3_select'] == null){		
		$("#mn_agenda").hide(); 
	}
	if(localStorage['UserPermission_4_select'] == "0" || localStorage['UserPermission_4_select'] == null){		
		$("#mn_usuarios").hide(); 
	}
	if(localStorage['UserPermission_5_select'] == "0" || localStorage['UserPermission_5_select'] == null){		
		$("#mn_configuracao").hide(); 
	}	
}