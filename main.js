const contenedorPrincipal= document.getElementById("principal")
const addToCar=document.getElementById("verCarro")
const mostrarCarro=document.getElementById("carrito-container")
let eventoCategoria=''


class Servicio{
    constructor(nombreServicio,descripcion,categoria,imagen,precio){
        this.nombreServicio=nombreServicio
        this.descripcion=descripcion
        this.categoria=categoria
        this.imagen=imagen
        this.precio=precio
    }
}

const servicios = [
    new Servicio ("Instalación de Griferia","Se repara cualquier averia que tenga en su cocina, baños, etc","plomeria","https://sodimac.scene7.com/is/image/SodimacCL/3686183_01?wid=800&hei=800&qlt=70",10000),
    new Servicio ("Reparación de tuberias","Se repara cualquier averia que tenga en su cocina, baños, etc","plomeria","https://www.cronoshare.com/blog/wp-content/uploads/2020/11/C%C3%B3mo-reparar-una-tuber%C3%ADa-de-cobre.jpg",20000),
    new Servicio ("Instalación de Sanitarios","Se repara cualquier averia que tenga en su cocina, baños, etc","plomeria","https://maestros.com.co/wp-content/uploads/2016/10/Instalaci%C3%B3n-de-sanitario-1.jpg",30000),
    new Servicio ("Instalación de Lamparas","Se repara cualquier averia que tenga en su cocina, baños, etc","electricidad","https://cdn.manomano.com/media/edison/9/3/c/e/93ce2685d4dd.jpg",15000),
    new Servicio ("Reparación de neveras","Se repara cualquier averia que tenga en su cocina, baños, etc","electricidad","https://www.serviciotecnicoenbarcelona.es/wp-content/uploads/2020/10/neveras-1.jpg",25000),
    new Servicio ("Reparación de hornos","Se repara cualquier averia que tenga en su cocina, baños, etc","electricidad","https://servicio-tecnico-en-lima.com/wp-content/uploads/2021/03/6-48-1024x576-1.jpg",35000),
    new Servicio ("Muebles a medida","Se repara cualquier averia que tenga en su cocina, baños, etc","carpinteria","https://images.hola.com/imagenes/decoracion/20211202200655/muebles-a-medida-cuando-y-como-elegirlos-il/1-26-833/muebles-a-medida-11a-a.jpg",55000),
    new Servicio ("Instalación de pisos de madera y/o flotante","Se repara cualquier averia que tenga en su cocina, baños, etc","carpinteria","https://i.ytimg.com/vi/YOQdo1evTnw/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAHoND7dNuYA1aNNHPrV_EJZGV9bg",98000),
    new Servicio ("Armado de muebles y mesas","Se repara cualquier averia que tenga en su cocina, baños, etc","armado","https://sodimac.scene7.com/is/image/SodimacCL/6441009_01?wid=800&hei=800&qlt=70",35000),
    new Servicio ("Armado de comodas y otros","Se repara cualquier averia que tenga en su cocina, baños, etc","armado","https://static2.elcontainer.cl/4318-thickbox_default/armado-de-mueble-solo-retiro-en-tienda.jpg",25000)
];

let carroCompra=[]

const postearServicios = (servicio) =>{
    
}

// const UpdateCarro =()=>{
//   mostrarCarro.innerHTML=""
//   carroCompra.forEach((servicio)=>{
//     mostrarCarro.innerHTML+=`
    
//     <img src="${servicio.imagen}">
//     <h3>${servicio.nombreServicio}</h3>
//     <span> $ ${servicio.precio} </span>
    
//     `
//   })


servicios.forEach((servicio)=>{
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
    carroCompra.push({
      img: servicio.imagen,
      nombre: servicio.nombreServicio,
      precio: servicio.precio
    })
    UpdateCarro()
  })
 

})



addToCar.addEventListener("click",()=>{
  mostrarCarro.innerHTML=""
  carroCompra.forEach((servicio)=>{
    
    let contenidoCarro= document.createElement("div")
    
    contenidoCarro.className="contenido-carro"
    
    contenidoCarro.innerHTML= `
    <img src="${servicio.img}"
    <h3>${servicio.nombre}</h3>
    <span> $ ${servicio.precio} </span>
    `
    
mostrarCarro.append(contenidoCarro)
  
  })

  const totalCarro=carroCompra.reduce((acum,e)=>acum +e.precio,0)

  const totalCompra=document.createElement("div")
  totalCompra.className="total-compra"
  totalCompra.innerHTML=`Total a Pagar: $ ${totalCarro}`

  mostrarCarro.append(totalCompra)
  localStorage.setItem("Carro",JSON.stringify(carroCompra))


})





//-----Pseudo Filtro-----INCOMPLETO

const categorias=document.getElementsByClassName("nav-link")
const arregloCategorias= Array.from(categorias)

arregloCategorias.forEach((link)=>{
  link.addEventListener("click",(e)=>{
    contenedorPrincipal.innerHTML=''
    eventoCategoria= e.target.InnerText
    const filtroServicios=servicios.filter((servicio)=> servicio.categoria == eventoCategoria)
     filtroServicios.forEach((servicio)=> postearServicios( servicio))
  })
})




//min 1:53
