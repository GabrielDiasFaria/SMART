var urlStart = "http://gdfconsultoria.com.br/SMART/php/Start.php";
var urlUserPermissionGet = "http://gdfconsultoria.com.br/SMART/php/UserPermission/User_GET.php";

var _page = "";

$(document).keypress(function (event) {
	if(event.which == 13){
		setValidate();
	}
});

function setValidate() {

	parametro = '{"EMAIL":"' + $("#email").val() + '","SENHA":"' + $("#senha").val() + '"}';

	jsonObj = JSON.parse(parametro);

	$.ajax({

		type: "POST",
		url: urlStart,
		crossDomain: true,
		data: jsonObj,
		dataType: "xml",
		beforeSend: function () {
		},
		success: function (xml) {
			if ($(xml).find('Login').length == 0) { alert("Usuário ou Senha não existe!"); }
			else {
				$(xml).find('Login').each(function () {
					var sId = $(this).find('ID').text();
					var sNome = $(this).find('Nome').text();
					var sEmail = $(this).find('Email').text();
					var sPage = $(this).find('Page').text();
					var sImagem = $(this).find('Imagem').text();
					var sEmpresa = $(this).find('Empresa').text();

					if (sId != "") {
						localStorage['UserId'] = sId;
						localStorage['UserName'] = sNome;
						localStorage['UserEmail'] = sEmail;
						localStorage['UserImage'] = sImagem;
						localStorage['UserEmpresa'] = sEmpresa;

						_page = sPage;

						getUserPermission(sId);
					}
				});
			}
		},
		error: function (xhr, textStatus, error) {

			alert("Ocorreu um erro inesperado durante o processamento.");

			console.log(xhr.statusText);
			console.log(textStatus);
			console.log(error);
		}
	});

}

function getUserPermission(id) {

	urlByUser = urlUserPermissionGet + "?ID=" + id;

	$.ajax({

		type: "GET",
		url: urlByUser,
		crossDomain: true,
		beforeSend: function () { }, // search | query_builder
		dataType: "xml",
		success: function (xml) {

			$(xml).find('UserPermission').each(function () {
				var sScreen = $(this).find('Screen').text();
				var sDescription = $(this).find('Description').text();
				var sSelect = $(this).find('Select').text();
				var sCreate = $(this).find('Create').text();
				var sEdit = $(this).find('Edit').text();
				var sDelete = $(this).find('Delete').text();
				var sUser = $(this).find('User').text();

				localStorage['UserPermission_' + sScreen + '_select'] = sSelect;
				localStorage['UserPermission_' + sScreen + '_create'] = sCreate;
				localStorage['UserPermission_' + sScreen + '_edit'] = sEdit;
				localStorage['UserPermission_' + sScreen + '_delete'] = sDelete;
			});
			window.location.href = _page;
		},
		error: function (xhr, textStatus, error) {

			alert("Ocorreu um erro inesperado durante o processamento.");

			console.log(xhr.statusText);
			console.log(textStatus);
			console.log(error);
		}
	});
}