$('body').append(` <div class="row col-8 id="formularioC">
                      <div id="formularioContact">
                        <h4 class="tituloForm" id="contactanos">Contactanos</h4>
                        <div clas="formularioTamaño">
                            <div class="mb-3">
                                <label for="exampleFormControlTextarea1" class="form-label" id="comentario">Dejanos tu comentario</label>
                                <textarea class="form-control" id="mensaje" rows="3"></textarea>
                            </div>
                            <div class="row">
                                <div class="col">
                                <input type="text" class="form-control" id="nombre" placeholder="Nombre" aria-label="First name">
                            </div>
                            <div class="col">
                                <input type="text" class="form-control" id="apellido" placeholder="Apellido" aria-label="Last name">
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label"></label>
                            <input type="email" class="form-control" id="email" placeholder="Email">
                        </div>  
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                            <label class="form-check-label" for="flexCheckDefault" id="formCheck">
                            Enviarme emails con promociones de la empresa
                            </label>
                        </div>
           
                                <div>
                                    <button type='submit' id='enviarForm' value="submit" class="btn btn-warning" data-bs-target="#modalContacto">Enviar</button>
                                </div>  

                                <div class="modal fade" id="modalContacto" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalContact">Monte Pasubio</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <p>
                                        Gracias por contactarte con nosotros
                                        </p>
                                        <p>
                                        A la brevedad nos comunicaremos con vos
                                        </p>
                                        <p class="montePasubio">
                                        Atentamente: Monte Pasubio
                                        </p>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="reset">Cerrar</button>
                                    </div>
                                    </div>
                                </div>
                                </div>

                                
                       </div>                                                            
                    </div>`);


                
$('#enviarForm').click(function (e){
    e.preventDefault();
   let mensaje = $('#mensaje').val()
   let nombre = $('#nombre').val()
   let apellido = $('#apellido').val()
   let email = $('#email').val()

   if (mensaje == "") {
    $('#mensaje').css("border", "solid 2px #FA5858") 
 }
   if(nombre == ""){
   $('#nombre').css("border", "solid 2px #FA5858") 
 }
   if(apellido == ""){
   $('#apellido').css("border", "solid 2px #FA5858") 
 }
   if(email == ""){
   $('#email').css("border", "solid 2px #FA5858") 
 }

   if(mensaje !="" && nombre !="" && apellido !=""&& email !="" ){
     $('#modalContacto').modal('show')
     $('#mensaje, #nombre, #apellido,#email').css('border', 'none')
     $(this).css('display','none')
     datos(mensaje,nombre,apellido,email)
 }

   
})

function datos(mensaje,nombre,apellido,email) {
    $('body').append(`<h1>su ${mensaje}, su nombre ${nombre}, su apellido ${apellido}, su email ${email}</h1>`)
    
}

$('#reset').click(function (){
    $('#enviarForm').css('display', 'inline')
    $('#mensaje').val("")
    $('#nombre').val("")
    $('#apellido').val("")
    $('#email').val("")

})



