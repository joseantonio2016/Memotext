$(document).ready(function(){
	var estado = false;
	$('#toggle-presentamos').on('click', function(){
		$('.presentamos').slideToggle();

		if (estado == true) {
			$(this).text("Abrir");
			$('body').css({
				"overflow": "auto"
			});
			estado = false;
		} else {
			$(this).text("Cerrar");
			$('body').css({
				"overflow": "hidden"
			});
			estado = true;
		}

		return false;
	});
});