$(function() {

    $('#login-form-link').click(function(e) {
		$("#customerLoginForm").delay(100).fadeIn(100);
 		$("#sensorAdminLogin").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
	$('#register-form-link').click(function(e) {
		$("#sensorAdminLogin").delay(100).fadeIn(100);
 		$("#customerLoginForm").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});

});
