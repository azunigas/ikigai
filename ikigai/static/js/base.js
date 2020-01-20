<!--Activa animacion al scrollear-->
$(window).scroll(function() {
    $(".slideanim").each(function() {
        var pos = $(this).offset().top;

        var winTop = $(window).scrollTop();
        if (pos < winTop + 600) {
            $(this).addClass("slide");
        }
    });
});

<!--Smooth scroll-->
$(document).ready(function() {
    // Add smooth scrolling to all links in navbar + footer link
    $(".navbar a, .footer a[href='#ikigai']").on('click', function(event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            let hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 1000, function() {

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });
});


<!--validacion del formulario-->
let form = document.querySelector('#question_form');
$(document).on('submit', '#question_form', function (e) {
    e.preventDefault();
    let idnombre = document.getElementById("valnombre");
    let idcorreo = document.getElementById("valcorreo");
    let idmensaje = document.getElementById("valmensaje");
    let idmsjenviado = document.getElementById("msjEnviado");
    $(idnombre).hide();
    $(idcorreo).hide();
    $(idmensaje).hide();
    $(idmsjenviado).hide();
    let nombre, correo, mensaje, regex;
    nombre = document.getElementById('nombre').value;
    correo = document.getElementById('correo').value;
    mensaje = document.getElementById('mensaje').value;
    regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/;
    if (nombre === "") {
        $(idnombre).text('Debe ingresar su nombre');
        $(idnombre).show();
        return false;
    } else if (regex.test(correo) === false) {
        $(idcorreo).text('Correo no valido');
        $(idcorreo).show();
        return false;
    } else if (mensaje === "") {
        $(idmensaje).text('Debe ingresar comentario');
        $(idmensaje).show();
        return false;
    } else if (regex.test(correo)) {
        $.ajax({
            type: 'POST',
            url: 'consulta/',
            data: {
                nombre: $('#nombre').val(),
                correo: $('#correo').val(),
                mensaje: $('#mensaje').val(),
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
            },
            success: function () {
                idmsjenviado.classList.add("show");
                $(idmsjenviado).show().fadeTo(5000, 0).slideUp(500, function () {
                    $(idmsjenviado).slideUp(500);
                    idmsjenviado.style.opacity = "1";
                });
            }
        });
        form.reset();
        return true;
    }
});

<!--Oculta mensajes de alerta-->
$(document).ready(function () {
    $(".alert-success").fadeTo(7000, 0).slideUp(500, function(){
        $(".alert-success").slideUp(500);
    });
});