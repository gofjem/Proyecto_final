const contenedorPrincipal= document.getElementById("principal")
const addToCar=document.getElementById("verCarro")
const mostrarCarro=document.getElementById("carrito-container")
const cantidadcarro= document.getElementById("cantidadCarro")

class Servicio{
    // constructor(nombreServicio,descripcion,categoria,imagen,precio,cantidad){
    //     this.nombreServicio=nombreServicio
    //     this.descripcion=descripcion
    //     this.categoria=categoria
    //     this.imagen=imagen
    //     this.precio=precio
    //     this.cantidad=cantidad
    // }
    constructor(){
      
    }
}

// const servicios = [
//     new Servicio ("Instalación de Griferia","Se repara cualquier averia que tenga en su cocina, baños, etc","plomeria","https://sodimac.scene7.com/is/image/SodimacCL/3686183_01?wid=800&hei=800&qlt=70",10000,1),
//     new Servicio ("Reparación de tuberias","Se repara cualquier averia que tenga en su cocina, baños, etc","plomeria","https://www.cronoshare.com/blog/wp-content/uploads/2020/11/C%C3%B3mo-reparar-una-tuber%C3%ADa-de-cobre.jpg",20000,1),
//     new Servicio ("Instalación de Sanitarios","Se repara cualquier averia que tenga en su cocina, baños, etc","plomeria","https://maestros.com.co/wp-content/uploads/2016/10/Instalaci%C3%B3n-de-sanitario-1.jpg",30000,1),
//     new Servicio ("Instalación de Lamparas","Se repara cualquier averia que tenga en su cocina, baños, etc","electricidad","https://cdn.manomano.com/media/edison/9/3/c/e/93ce2685d4dd.jpg",15000,1),
//     new Servicio ("Reparación de neveras","Se repara cualquier averia que tenga en su cocina, baños, etc","electricidad","https://www.serviciotecnicoenbarcelona.es/wp-content/uploads/2020/10/neveras-1.jpg",25000,1),
//     new Servicio ("Reparación de hornos","Se repara cualquier averia que tenga en su cocina, baños, etc","electricidad","https://servicio-tecnico-en-lima.com/wp-content/uploads/2021/03/6-48-1024x576-1.jpg",35000,1),
//     new Servicio ("Muebles a medida","Se repara cualquier averia que tenga en su cocina, baños, etc","carpinteria","https://images.hola.com/imagenes/decoracion/20211202200655/muebles-a-medida-cuando-y-como-elegirlos-il/1-26-833/muebles-a-medida-11a-a.jpg",55000,1),
//     new Servicio ("Instalación de pisos de madera y/o flotante","Se repara cualquier averia que tenga en su cocina, baños, etc","carpinteria","https://i.ytimg.com/vi/YOQdo1evTnw/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAHoND7dNuYA1aNNHPrV_EJZGV9bg",98000,1),
//     new Servicio ("Armado de muebles y mesas","Se repara cualquier averia que tenga en su cocina, baños, etc","armado","https://sodimac.scene7.com/is/image/SodimacCL/6441009_01?wid=800&hei=800&qlt=70",35000,1),
//     new Servicio ("Armado de comodas y otros","Se repara cualquier averia que tenga en su cocina, baños, etc","armado","https://static2.elcontainer.cl/4318-thickbox_default/armado-de-mueble-solo-retiro-en-tienda.jpg",25000,1)
// ];

let carroCompra= JSON.parse(localStorage.getItem("Carro"))||[]

const postearServicios = (servicio) =>{
  let contenido= document.createElement("div")
  contenido.className="card"
  contenido.innerHTML= `
  <img src="${servicio.imagen}">
  <h3>${servicio.nombreServicio}</h3>
  <p>${servicio.descripcion}</p>
  <span> $ ${servicio.precio} </span>
    `
  contenedorPrincipal.append(contenido)

  let agregar=document.createElement("button")
  agregar.innerText = "Lo quiero!"
  agregar.className="boton"

  contenido.append(agregar)

  agregar.addEventListener("click",()=>{

  // Validar si un servicio esta repetido 
    const servicioRepetido=carroCompra.some((repetido)=> repetido.nombre === servicio.nombreServicio)
    console.log(servicioRepetido);

    if(servicioRepetido){
      carroCompra.map((serv)=>{
        if(serv.nombre === servicio.nombre){
          serv.cantidad++
        }
      })
    }else{
      carroCompra.push({
        img: servicio.imagen,
        nombre: servicio.nombreServicio,
        precio: servicio.precio,
        cantidad: servicio.cantidad
      })
    }
    console.log(carroCompra);
    contadorCarro()
    guardarStorage()
   
  })
 
  
}

servicios.forEach((servicio)=>{
  postearServicios(servicio)
})

// Filtro de categorias
const categorias=document.getElementsByClassName("nav-link")
const arregloCategorias= Array.from(categorias)

arregloCategorias.forEach((link)=>{
  link.addEventListener("click",(e)=>{
    e.preventDefault()
    contenedorPrincipal.innerHTML=''
    eventoCategoria= e.target.innerText
    console.log(eventoCategoria)
    const filtroServicios=servicios.filter((servicio)=> servicio.categoria.toUpperCase() == eventoCategoria.toUpperCase())
    console.log(filtroServicios)
     filtroServicios.forEach((servicio)=> postearServicios( servicio))
  })
})
//--------Conexion con archivo json-----------------

fetch("./servicios.json")
.then(dato=>{
  if(!dato.ok){
    throw new Error("Error de conexión");
  }else{
   return dato.json(); 
  }
})
.then(productos=>{
  productos.forEach(producto=>{

  })
})

//-----------------------------------

  const desplegarCarro= () =>{
      mostrarCarro.style.display= "flex"
      mostrarCarro.innerHTML=""
    
      const headerCarrito= document.createElement("div")
      headerCarrito.className="modal-contenido-carro"
      headerCarrito.innerHTML= `
      <h2 class="header-carrito">Tu Carrito:</h2>
      `
      mostrarCarro.append(headerCarrito)
     
      const cerrarHeader= document.createElement("span")
      cerrarHeader.innerHTML="❌ Cerrar"
      cerrarHeader.className="cerrar-header-button"

      cerrarHeader.addEventListener("click",()=>{
        mostrarCarro.style.display = "none"
      })

      mostrarCarro.append(cerrarHeader)

      carroCompra.forEach((servicio)=>{

        let contenidoCarro= document.createElement("div")
        contenidoCarro.className="contenido-carro"
        contenidoCarro.innerHTML=`
        <img src="${servicio.img}"
        <h3>${servicio.nombre}</h3>
        <span> $ ${servicio.precio} </span>
        <p>Cantidad: ${servicio.cantidad}</p>
        <p>Total: ${servicio.cantidad * servicio.precio}
        `
      mostrarCarro.append(contenidoCarro)

      let eliminarBoton= document.createElement("h3")
      eliminarBoton.innerText="Eliminar"
      eliminarBoton.className="eliminar-producto"

      contenidoCarro.append(eliminarBoton)

      eliminarBoton.addEventListener("click",eliminarProducto)
    })

    const totalCarro=carroCompra.reduce((acum,e)=>acum +e.precio*e.cantidad,0)

    const totalCompra=document.createElement("div")
    totalCompra.className="total-compra"
    totalCompra.innerHTML=`Total a Pagar: $ ${totalCarro}`

    mostrarCarro.append(totalCompra)
    
  }

    addToCar.addEventListener("click",desplegarCarro)

  //Eliminar servicio del carro
    const eliminarProducto = ()=>{
      const buscarNombre= carroCompra.find((ele)=> ele.nombre)

      carroCompra= carroCompra.filter((servicioNomb)=>{
        return servicioNomb !== buscarNombre
      })
      contadorCarro()
      desplegarCarro()
      Swal.fire({
        title: `¡Su producto se ha eliminado correctamente!`,
        icon: "success",
        width: "350px"
      });
    }

    const contadorCarro=()=>{
      cantidadcarro.style.display= "block"
      cantidadcarro.innerText=carroCompra.length

    }

    // Guardar carro en el localStorage

    const guardarStorage=()=>{
      localStorage.setItem("Carro",JSON.stringify(carroCompra))
    }

   function finalizarCompra() {
      localStorage.removeItem("Carro")
      this.servicios=[]
    }

  // min 1:10 hrs