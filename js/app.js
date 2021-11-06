$(document).ready(function(){

let carritoDeCompras = [];
let stockProductos = [];


const formulario = document.querySelector('#formulario');
const contenedorProductos = document.getElementById('contenedor-productos');
let cardGroup = document.getElementById('cardB');
const contenedorProductosOfertas = document.getElementById('contenedor-productosOfertas');

//CONSTRUCTOR DE OBJETOS Y AGREGADO DE PRODUCTOS A MI ARRAY
class Producto{
    constructor(id,nombre,caracteristicas,precio,img,cantidad,oferta){
        this.id = id;
        this.nombre = nombre.toUpperCase();
        this.caracteristicas = caracteristicas;
        this.precio = parseFloat(precio);
        this.img = img;
        this.cantidad = cantidad;
        this.oferta = oferta;
    }

}

const producto1 = new Producto('10', 'COMBO 1: Baileys+Ferrero Rocher+Nutella',['Baileys','Ferrero Rocher','Nutella'], 3900,'licores/combo1SinFondo-nutella.jpg',1,'si');
const producto2 = new Producto('11','COMBO 2: Sheridans+Amarula+Baileys',['Sheridans','+','Amarula','+','Baileys'], 6200,"licores/combo2Licores3sinFondo.jpg",1,'si');
const producto3 = new Producto('12','COMBO 3: Wild Africa+Sheridans',['Wild Africa','+','Sheridans'], 4200,"licores/combo3-sin-fondo.jpg",1,'si');

stockProductos.push(producto1)
stockProductos.push(producto2)
stockProductos.push(producto3)
//FIN DEL CONSTRUCTOR DE OBJETOS Y AGREGADO DE PRODUCTOS A MI ARRAY


//BUSCADOR DE PRODUCTOS
function filtrar() {
    contenedorProductos.innerHTML= '';
        const texto = formulario.value.toLowerCase()
        let buscar = stockProductos.filter(elemento => elemento.nombre.toLowerCase().includes(texto || number))
        console.log(buscar);
        cardGroup.style.flexFlow = 'none'
        cardGroup.style.justifyContent = 'center'

        mostrarProductos (buscar)
        mostrarProductosOfertas()


        $('.car').css ({
           'marginLeft' : '0px',
           'width': '100%',
        })
        $('.card-img-top').css('margin', 'auto')
}

$('#botonBuscar').on('click', filtrar);
$('#formulario').on('keyup', filtrar);
//FIN DE BUSCADOR DE PRODUCTOS


function recuperarStock() {
    let stock = JSON.parse(localStorage.getItem('stock'))
    if(stock){
        stock.forEach(el => stockProductos.push(el))
    }
}

// USO DE AJAX PARA LLAMAR A LA API DE MERCADO LIBRE
$.getJSON('stock.json', function (data){
    localStorage.setItem('stock', JSON.stringify(data))
    recuperarStock()
    mostrarProductos(data)
    recuperar()
    mostrarProductosOfertas()
})

class Productos{
    constructor(id,title,price,thumbnail,cantidad){
        this.id= id;
        this.nombre= title;
        this.precio= price;
        this.img= thumbnail;
        this.cantidad= cantidad;
    }
}

$.get('https://api.mercadolibre.com/sites/MLA/search?category=MLA178700&limit=9', function (data) {
    data.results.forEach(el=> stockProductos.push(
    new Productos(el.id,el.title,el.price,el.thumbnail,1)
))

    mostrarProductos(stockProductos)   
})
// FIN DE USO DE AJAX PARA LLAMAR A LA API DE MERCADO LIBRE

       
$("#carrito-contenedor").css({"display" : "flex"});
$(".productoEnCarrito").css({"flex-direction" : "row"});


const contenedorCarrito = document.getElementById('carrito-contenedor');
const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');

//MOSTRAMOS LAS CARDS
function mostrarProductos(array){ 
    contenedorProductos.innerHTML=''
    let stockFiltrado = array.filter(el=> el.oferta != 'si')
    stockFiltrado.forEach (producto => {
        let div = document.createElement ('div');
        div.innerHTML+=`<div class="card d-flex">
                                <img src=${producto.img} class="card-img-top" alt="...">
                                <div class="card-body">
                                <h4 class="card-title d-flex justify-content-center">$ ${producto.precio}</h4>
                                <p id="resultado" class="card-text d-flex justify-content-center">${producto.nombre}</p>
                                <a id="boton${producto.id}"class="btn btn-primary">Agregar al carrito</a>
                                <p id='disponibleStock' class="card-text"><small class="text-muted">Disponible en stock</small></p>
                                </div>
                              </div>`
        contenedorProductos.appendChild(div);

        let boton = document.getElementById(`boton${producto.id}`)

        boton.addEventListener('click', ()=>{
            agregarCarrito(producto.id)
        })
})
}
//FIN DE MOSTRAMOS LAS CARDS
       
//CARRITO DE CAMPRAS
function agregarCarrito(id) {
    $('#confirmarCompra').css('display','block')
    let repetido=carritoDeCompras.find(prodR => prodR.id == id)
    if(repetido){
        repetido.cantidad = repetido.cantidad + 1;
        document.getElementById(`cantidad${repetido.id}`).innerHTML = `<p id="cantidad${repetido.id}">cantidad: ${repetido.cantidad}</p>`
        actualizarCarrito()

    }else{
        let productoAgregar = stockProductos.find(prod => prod.id == id);
        carritoDeCompras.push(productoAgregar);
       
        actualizarCarrito()
        mostrarCarrito(productoAgregar)
    }
    
    let guardarJSON = JSON.stringify(carritoDeCompras);
    localStorage.setItem('productos', guardarJSON);
}


function mostrarCarrito(productoAgregar){
        let div = document.createElement('div');
        div.classList.add('productoEnCarrito');
        div.innerHTML+= `<img src=${productoAgregar.img} id='imagenModal'>
                        <p id="tituloCarritoModal">${productoAgregar.nombre}</p>
                        <p class="cantidadModalCarrito" id="cantidad${productoAgregar.id}">Cantidad: ${productoAgregar.cantidad}</p>
                        <p id="precioCarritoModal">Precio: $ ${productoAgregar.precio}</p>
                        <button id="eliminar${productoAgregar.id}" class="boton-eliminar"><i class="far fa-trash-alt"></i></button>`
        contenedorCarrito.appendChild(div);

        let botonEliminar = document.getElementById(`eliminar${productoAgregar.id}`);
        botonEliminar.addEventListener('click', ()=>{
            if(productoAgregar.cantidad == 1){
            botonEliminar.parentElement.remove();
            carritoDeCompras = carritoDeCompras.filter(prodE => prodE.id != productoAgregar.id);
            actualizarCarrito();
            let guardarJSON = JSON.stringify(carritoDeCompras);
            localStorage.setItem('productos', guardarJSON);
            }else{
                productoAgregar.cantidad = productoAgregar.cantidad - 1
                document.getElementById(`cantidad${productoAgregar.id}`).innerHTML = `<p 
                id="cantidad${productoAgregar.id}">cantidad: ${productoAgregar.cantidad}</p>`
                actualizarCarrito()
                let guardarJSON = JSON.stringify(carritoDeCompras);
                localStorage.setItem('productos', guardarJSON);
            }
            if(carritoDeCompras.length == 0){
                $('#confirmarCompra').css('display','none')
            }
    })
}
    
  
function recuperar(){
    let almacenados = JSON.parse(localStorage.getItem("productos"));
        if (almacenados) {
            almacenados.forEach(el => {
                carritoDeCompras.push(el)
                mostrarCarrito(el)
                actualizarCarrito()

            })   
        }
}
//FIN DE CARRITO DE CAMPRAS


//SUMATORIA DEL CARRITO
function actualizarCarrito(){
    contadorCarrito.innerText=carritoDeCompras.reduce((acc,el)=> acc + el.cantidad,0);
    precioTotal.innerText=carritoDeCompras.reduce((acc, el)=>acc + (el.precio * el.cantidad),0)
}

let botonFinalizar = document.getElementById('confirmarCompra');
botonFinalizar.addEventListener('click',finalizarCompra)
//FIN DE SUMATORIA DEL CARRITO


//FINALIZACION DE LA COMPRA Y MODAL DEL CHEKOUT
function finalizarCompra() {
    contenedorCarrito.innerHTML='';
    carritoDeCompras = [];
    localStorage.clear();
    actualizarCarrito();
    $('#confirmarCompra').css('display', 'none')
    Swal.fire({
        icon: 'success',
        title: 'OK',
        text: 'Compra realizada con exito! 👍',
        footer: '<p>Nº de orden: sa65297789</p>'
    })   
}
//FIN DE FINALIZACION DE LA COMPRA Y MODAL DEL CHEKOUT

//BOTON OFERTAS
$("main").append('<button id="botonOfertas" type="button" class="btn btn-info">OFERTAS</button>');
//FIN BOTON OFERTAS

//MOSTRAR CARDS OFERTAS
$('#botonOfertas').click(function(){
    $('html, body').animate({
        scrollTop: $('#cardOfertas').offset().top
    });
})

function mostrarProductosOfertas(){ 
    contenedorProductosOfertas.innerHTML=''
    let stockOferta = stockProductos.filter(el => el.oferta == 'si')
    stockOferta.forEach(producto => {
       let div = document.createElement('div');
        div.innerHTML+=`<div id="cardsOfertasAbajo" class="card d-flex">
                                <img src=${producto.img} class="card-img-top" alt="...">
                                <div class="card-body">
                                <h4 class="card-title d-flex justify-content-center">$ ${producto.precio}</h4>
                                <p id="resultado" class="card-text d-flex justify-content-center">${producto.nombre}</p>
                                <a id="boton${producto.id}"class="btn btn-primary">Agregar al carrito</a>
                                <p class="card-text"><small class="text-muted">Disponible en stock</small></p>
                                </div>
                              </div>`
        contenedorProductosOfertas.appendChild(div);

        let boton = document.getElementById(`boton${producto.id}`)

        boton.addEventListener('click', ()=>{
            agregarCarrito(producto.id)
        })

})

}




//FIN DE MOSTRAR CARDS OFERTAS


})  //Esta llave y parentesis viene de mu función del metodo READY
