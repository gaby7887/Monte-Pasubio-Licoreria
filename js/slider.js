var imgItems = $(".slider li").length;  //Nùmero de slides
var imgPos = 1;

//Agregando paginación
for(i = 1; i <= imgItems; i++){
    $('.pagination').append('<li><span><i class="fas fa-circle"></i></span></li>');
}


$('.slider li').hide();  //Ocultamos todos los slides
$('.slider li:first').show();   //mostramos el 1er slide
$('.pagination li:first').css({'color': '#CD6E2E'});  //Damos estilo al 1er items de la paginación

//Ejecutamos todas las funciones
$('.pagination li').click(pagination);
$('.right span i').click(nextSlider);
$('.left span i').click(prevSlider);

setInterval(function(){
    nextSlider();

}, 4000);

//Funciones

function pagination(){
    var paginationPos = $(this).index() + 1;  //Trae el valor de la posición del elemento


    $('.slider li').hide(); 
    $('.slider li:nth-child('+ paginationPos +')').fadeIn();

$('.pagination li').css({'color': '#858585'});
$(this).css({'color': '#CD6E2E'});

imgPos = paginationPos;

}


function nextSlider(){
    if(imgPos >= imgItems){imgPos = 1;
    } else {imgPos++;}

    $('.pagination li').css({'color': '#858585'});
    $('.pagination li:nth-child(' + imgPos + ')').css({'color': '#CD6E2E'});
   
    $('.slider li').hide();
    $('.slider li:nth-child('+ imgPos +')').fadeIn();  //Muestra el slide seleccionado
}

function prevSlider(){
    if(imgPos <= 1){imgPos = imgItems;
    } else {imgPos--;}

    $('.pagination li').css({'color': '#858585'});
    $('.pagination li:nth-child(' + imgPos + ')').css({'color': '#CD6E2E'});
   
    $('.slider li').hide();
    $('.slider li:nth-child('+ imgPos +')').fadeIn();  //Muestra el slide seleccionado
}  
