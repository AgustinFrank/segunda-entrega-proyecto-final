const stockProductos = [

{ id:1, name:"Nike AF1", category: "street", price: 35000, amount: 1},
{id:2, name:"low DC", category:"street", price: 22000, amount: 1},
{id:3, name:"Adidas L3", category:"deportes", price: 24500, amount: 1},
{id:4, name:"Fila Z1", category: "deportes", price: 21500, amount: 1},
{id:5, name:"Nike SB", category:"street", price: 22000, amount: 1},
{id:6, name:"Toppper handball", category:"deportes", price:17200, amount: 1},
{id:7, name:"Nike AIRMAX", category:"street", price:27500, amount: 1},
{id:8,name:"Adidas SuperStar", category:"street", price:21400, amount: 1},
{id:9, name:"DC", category:"street", price:31600, amount: 1},
{id:10, name:"Jordan MID1", category:"street", price:47000, amount: 1}
];

const contenedorProductos = document.getElementById("contenedor-productos")

const contenedorCarrito = document.getElementById("contenedor-carrito")

const botonVaciar = document.getElementById("vaciar-carrito")

const precioTotal = document.getElementById("precioTotal")


let carrito = []

document.addEventListener("DOMContentLoaded", () =>{
  if (localStorage.getItem(carrito)) {
    carrito = JSON.parse(localStorage.getItem("carrito"))
  }
  actualizarCarrito()
})

botonVaciar.addEventListener("click",()=>{
carrito.length = 0
actualizarCarrito()
})

stockProductos.forEach((producto) =>{
  const div = document.createElement("div")
  div.classList.add ("producto")
  div.innerHTML= `
  <h3>${producto.name}</h3>
  <p>Precio: $ ${producto.price}</p>
  <button id= "agregar${producto.id}">Agregar <i class fas-fa-shopping-cart"></button>
  `
  contenedorProductos.appendChild(div)
  const boton = document.getElementById("agregar${producto.id}")
  boton.addEventListener("click",producto.id)
})

const agregarAlCarrito = (prodId) =>{

  const existe = carrito.some (prod => prod.id === prodId)
 if(existe){
  const prod = carrito.map (prod =>{
    if (prod.id === prodId){
      prod.amount++
    }
  })
 }else{
  const item = stockProductos.find ((prod) => prod.id === prodId)
  carrito.push(item)
 }
  actualizarCarrito ()
}
const eliminarDelCarrito = (prodId) => {
  const item = carrito.find((prod) = prod.id === prodId)
  const indice = carrito.indexOf(item)
  carrito.splice(indice, 1)
}

const actualizarCarrito = () => {
  contenedorCarrito.innerHTML= ""

  carrito.forEach((prod)=>{
    const div = document.createElement ("div")
    div.innerHTML = 
    `
    <p>${prod.name}</p>
    <p>Precio: ${prod.price}</p>
    <p>Cantidad: <span id = "cantidad"></span></p>
    <button onclick = "eliminarDelCarrito(${prod.id})"> <i class= "fas fa-trash-alt"></i></button>
    `
    contenedorCarrito.appendChild(div)

    localStorage.setItem("carrito", JSON.stringify(carrito))
  })
  contenedorCarrito.innerText = carrito.length
  precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.price, 0)
}





