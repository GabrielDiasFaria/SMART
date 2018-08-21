var urlUserPost = "http://gdfconsultoria.com.br/SMART/php/User/User_POST.php";


$("#user_edit").click( function(){

	$("#ipt_user_id").val(localStorage['UserId']);
	$("#ipt_user_nome").val(localStorage['UserName']);

	$("#modal_user").modal('open');
});

$("#user_save").click( function(){
	if ($("#ipt_user_pass").val() != $("#ipt_user_pass_conf").val()) {
		Materialize.toast("Senhas não conferem.", 4000, 'rounded');
		return;
	}
	if ($("#ipt_user_pass").val() == "") {
		Materialize.toast("Favor preencher as senhas.", 4000, 'rounded');
		return;
	}

	postResetPass();
	$("#modal_user").modal('close');

});


function postResetPass() {

	parametro = '{"SENHA":"'+ $('#ipt_user_pass_conf').val() +'"'; 
	parametro += ',"NOME":"' + $('#ipt_user_nome').val() + '"';
	parametro += ',"ID":"' + $('#ipt_user_id').val() + '"}';

	var jsonObj = JSON.parse(parametro);

	$.ajax({
		type: "POST",
		url: urlUserPost,
		crossDomain: true,
		beforeSend: function () { }, // search | query_builder
		data: jsonObj,
		dataType: "text",
		success: function (text) {
			Materialize.toast(text, 4000, 'rounded');
			localStorage['UserName'] = $('#ipt_user_nome').val();			
			//loader("After");
			//getUsers();

			setTimeout(
				function () {
					//changeTab('tb_selection');
					//$('#mdl_edit_user').modal('close');
					location.reload();
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