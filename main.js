

let stockProductos = [

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

  const carrito = []
  
  const cargarProductos = () => { 
      for (let i = 0; i < stockProductos.length; i++) {
          const producto = stockProductos[i]  
          const {id, name, category, price, amount} = producto  
          const productoHTML = `
          <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
          <div class="producto">
              <div class="producto-img">
                  <img src="" alt="${name}">
              </div>
              <div class="producto-info">
                  <h2>${name}</h2>
                  <p>${category}</p>
                  <p>${price}</p> 
                  <p>${amount}</p>
                  <button onclick:"alertCarrito();" class="btn-agregar" data-id="${id}">Agregar al carrito</button>
              </div>
          </div>
          `
          contenedorProductos.innerHTML += productoHTML 
      } 
  }
  
  cargarProductos()   
  
  const agregarEventos = () => { 
      const botonesAgregar = document.querySelectorAll(".btn-agregar")
      for (let i = 0; i < botonesAgregar.length; i++) { 
          const botonAgregar = botonesAgregar[i] 
          botonAgregar.addEventListener("click", agregarProducto) 
      }
  }
  
  const actualizarCarrito = () => { 
    localStorage.setItem("carrito", JSON.stringify(carrito))  
    contenedorCarrito.innerHTML = ""  
    cargarCarrito() 
    actualizarPrecioTotal() 
  }
  
  const actualizarPrecioTotal = () => {   
    precioTotal.innerHTML = ""  
    const total = carrito.reduce((acc, producto) => acc + producto.price, 0)  
    precioTotal.innerHTML = total 
  }
  
  const agregarProducto = (e) => { 
      const id = e.target.dataset.id 
      const producto = stockProductos.find(producto => producto.id == id) 
      carrito.push(producto)  
      actualizarCarrito() 
      
  }
  
  const vaciarCarrito = () => { 
      carrito.length = 0  
      actualizarCarrito() 
  }
  
  agregarEventos()  
  
  const cargarLocalStorage = () => {  
    const carritoLS = localStorage.getItem("carrito") 
    if (carritoLS) {  
        carritoL = JSON.parse(carritoLS) 
        carritoL.forEach(producto => {  
            carrito.push(producto)  
        })
    }
        actualizarCarrito() 
    }
  
  
  const eliminarProducto = (e) => { 
    const id = e.target.dataset.id  
    const producto = carrito.filter(producto => producto.id == id) 
    carrito.splice(carrito.indexOf(producto), 1)
    actualizarCarrito()
  }
  
  const eliminarEventos = () => { 
    const botonesEliminar = document.querySelectorAll(".btn-eliminar")  
    for (let i = 0; i < botonesEliminar.length; i++) {  
        const botonEliminar = botonesEliminar[i]  
        botonEliminar.addEventListener("click", eliminarProducto) 
    }
  }
  
  
  const cargarCarrito = () => { 
      for (let i = 0; i < carrito.length; i++) {  
          const producto = carrito[i] 
          const {id, name, category, price, amount} = producto  
          const productoHTML = `  
          <div class="producto">
              <div class="producto-img">
                  <img src="" alt="${name}"> 
              </div>
              <div class="producto-info">
                  <h2>${name}</h2>
                  <p>${category}</p>
                  <p>${price}</p>
                  <p>${amount}</p>
                  <button class="btn-eliminar" data-id="${id}">Eliminar</button>
              </div>
          </div>
          `
          contenedorCarrito.innerHTML += productoHTML 
          
      } 
      eliminarEventos() 
  }
  
  
  const init = () => { 
    cargarLocalStorage()  
  }   
  
  init()  

  const cargarLocalStorageSesion = () =>{

  }


 
  const alertCarrito = () =>{
    console.log("hola")
    Swal.fire({
        title: 'Gracias por su compra',
        text: 'Quiere seguir comprando?',
        icon: 'success',
        confirmButtonText: 'Seguir'
      })
}




  
  