//CARRITO
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#close-cart");
const formulario = document.querySelector("#formulario");
const botonBusqueda = document.querySelector("#btnBuscar");
const resultadoBusqueda = document.querySelector("#resultado");
const closeBuscadorPalabra = document.querySelector("#btnCerrarBuscador");



const zapatillas = [
    {
        id: 1,
        marca:"Nike", 
        nombre: "JORDAN AIR 1", 
        precio: 10000,
    },
    {
        id: 2,
        marca:"Nike", 
        nombre: "JORDAN AIR 1 MID",
        precio: 7500,
    },
    {
        id: 3,
        marca:"Adidas",
        nombre: "SABALO",
        precio: 14000,
    },
    {
        id: 4,
        marca:"Adidas",
        nombre: "UPATH RUN",
        precio: 35000,
    },
    {
        id: 5,
        marca:"Puma",
        nombre: "CALI STAR XMAS",
        precio: 30000,
    },
    {
        id: 6,
        marca:"Puma",
        nombre: "CITY RIDER",
        precio: 25000,
    },
    {
        id: 5,
        marca:"Reebook",
        nombre: "REVENGE PRIDE",
        precio: 30000,
    },
    {
        id: 6,
        marca:"Reebook",
        nombre: "CLUB C COAST",
        precio: 25000,
    }
];

//Busqueda

const filtrar = ()=>{

    resultadoBusqueda.innerHTML = " ";

    const texto = formulario.value.toLowerCase();

    for(let zapatilla of zapatillas){
        let nombre = zapatilla.nombre.toLowerCase();
        if(nombre.indexOf(texto) !== -1){
            resultadoBusqueda.innerHTML = `<li>${zapatilla.nombre}</li>`
        }
    }
    if(resultadoBusqueda.innerHTML === " "){
        resultadoBusqueda.innerHTML = `<li>Producto no encontrado</li>`
    }
    console.log(formulario.value);
}

botonBusqueda.addEventListener('click', filtrar);
formulario.addEventListener('keyup', filtrar);

filtrar();

//mostrar producto buscado (No pude hacer que se cierre el resultado)
btnBuscar.onclick = () =>{
    resultadoBusqueda.classList.add("active");
}
closeBuscadorPalabra.onclick = () =>{
    resultadoBusqueda.classList.remove("active");
}
//ABRE CARRITO
cartIcon.onclick = () =>{
    cart.classList.add("active");
}
//CIERRA CARRITO
closeCart.onclick = () =>{
    cart.classList.remove("active");
}

//HACIENDO FUNCIONAR EL CARRITO
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready();
}

//funciones

function ready(){
    //borrar items del carrito
    //transformo el icono en boton
    var borrarItems = document.getElementsByClassName("cart-remove");
    console.log(borrarItems);
    for (var i = 0; i < borrarItems.length; i++) {
       var button = borrarItems[i];
       button.addEventListener("click", borrarProductos);
    }
    //cambiar cantidad
    var cantidadInput = document.getElementsByClassName("cart-quantity");
    for (var i = 0; i < cantidadInput.length; i++) {
       var input = cantidadInput[i];
       input.addEventListener("change", cantidadCambiada);
    }
   
   //agregar al carrito
    var agregarProducto = document.getElementsByClassName("add-cart");
    for (var i = 0; i < agregarProducto.length; i++) {
        var button = agregarProducto[i];
        button.addEventListener("click", agregarProductoClickeado)
    }
    //boton comprar producto 
    document.getElementsByClassName("btn-buy")[0].addEventListener("click", comprar);
//comprar
function comprar() {
    Swal.fire({
        title: 'Desea finalizar la compra ?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, deseo continuar!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Compra Realizada!',
            'Muchas gracias por confiar en nosotros.',
            'success'
          )
          }
      })
    var contenido = document.getElementsByClassName("cart-content")[0];
    while (contenido.hasChildNodes()){
        contenido.removeChild(contenido.firstChild);
    }
    cargarTotal();
}
//agregar producto funcion
function agregarProductoClickeado(a) {
    var button = a.target;
    var productos = button.parentElement;
    var titulo = productos.getElementsByClassName("product-title")[0].innerText;
    var precio = productos.getElementsByClassName("price")[0].innerText;
    var imgProducto = productos.getElementsByClassName("product-img")[0].src;
    agregandoProducto(titulo, precio,imgProducto);
    cargarTotal();
}

function agregandoProducto(titulo, precio,imgProducto) {
    var productsBox = document.createElement("div");
    productsBox.classList.add("cart-box");
    var items = document.getElementsByClassName("cart-content")[0];
    var itemsNombres = items.getElementsByClassName("cart-product-title");
    for (var i = 0; i < itemsNombres.length; i++) {
        
        if (itemsNombres[i].innerText == titulo){

            Toastify({//uso la libreria Toastify ya que queda estetica y visualmente mejor a la hora de avisar al usuario que su producto se agrego correctamente al carrito
                text: "Agregado al carrito!",
                duration: 3000,
                gravity: 'top',
                position: 'right'
            }).showToast();
            return;
        }
    }
    var boxContenido = `<img src="${imgProducto}" alt="" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-product-title">${titulo}</div>
                            <div class="cart-price">${precio}</div>
                            <input type="number" value="1" class="cart-quantity">
                        </div>
                        <!--borrar producto (ICONO)-->
                        <i class='bx bxs-trash-alt cart-remove'></i>`;
    
    productsBox.innerHTML = boxContenido;
    items.append(productsBox);
    productsBox.getElementsByClassName("cart-remove")[0].addEventListener("click", borrarProductos);
    productsBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", cantidadCambiada);
}
//borro el producto
function borrarProductos(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    cargarTotal();
}

//cambiar cantidad
function cantidadCambiada(e){
    var input = e.target;
    if(isNaN(input.value) || input.value <= 0) {
        input.value = 0;
    }
    cargarTotal();
}
// cargar total

function cargarTotal(){
    var carritoContenido = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = carritoContenido.getElementsByClassName("cart-box");
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var precioProducto = cartBox.getElementsByClassName("cart-price")[0];
        var cantidadProducto = cartBox.getElementsByClassName("cart-quantity")[0];
        var precio = parseFloat(precioProducto.innerText.replace("$", ""));
        var cantidad = cantidadProducto.value;
        total = total + (precio * cantidad);
        //si el precio contiene algun decimal
        total = Math.round(total * 100) / 100;
    }
        document.getElementsByClassName("total-price")[0].innerText = "$" + total;
    
}
}

