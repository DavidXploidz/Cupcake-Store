//Selectores globales
const menuHam = document.querySelector('#menu-ham');
const enlaces = document.querySelector('.enlaces');
const resultado = document.querySelector('#resultado');
const botonesFilter = document.querySelectorAll('.botonesFilter button');


document.addEventListener('DOMContentLoaded', () => {
    cargarCupcakes()
})

//Funcion para mostrar el menu 
menuHam.addEventListener('click', (e) => {
    if(e.target.alt === 'icon-ham'){
        menuHam.src = './images/menu-close.svg'
        menuHam.alt = 'icon-close'
        enlaces.classList.add('activo')
    }else{
        menuHam.src = './images/menu-ham.svg'
        menuHam.alt = 'icon-ham'
        enlaces.classList.remove('activo')
    }
})

//Cargando los datos de un JSON con fetch
const cargarCupcakes = async () => {
    const url = 'https://my-json-server.typicode.com/DavidXploidz/Cupcake-Store/cupcakes'
    const respuesta = await fetch(url)
    const resultado = await respuesta.json()
    mostrarCupcakes(resultado)
    filtrarCupcakes(resultado)
}

//Funcion para generar y mostrar los resultados
function mostrarCupcakes (cupcakes) {
    limpiarHTML()
    cupcakes.map(cupcake => {
        const {flavor, description, category} = cupcake

        const newArticle = document.createElement('ARTICLE')
        newArticle.style.textAlign = 'center'

        const newFlavor = document.createElement('H2')
        newFlavor.textContent = flavor
        newFlavor.style.marginBottom = '0'

        const newCategory = document.createElement('SPAN')
        newCategory.textContent = category
        newCategory.classList.add('cupcake-span')

        const newPrecios = document.createElement('P')
        newPrecios.textContent = `Regular: ${cupcake.price.regular} , Mini: ${cupcake.price.mini}`
        newPrecios.style.margin = '0'

        const newImg = document.createElement('IMG')
        newImg.src = cupcake.images.webp
        newImg.classList.add('cupcake-img')

        const newDesc = document.createElement('P')
        newDesc.textContent = description

        newArticle.appendChild(newFlavor)
        newArticle.appendChild(newCategory)
        newArticle.appendChild(newPrecios)
        newArticle.appendChild(newImg)
        newArticle.appendChild(newDesc)
        resultado.appendChild(newArticle)
    })
}

function filtrarCupcakes(cupcakes){
//Mostrar por seleccionado 
botonesFilter.forEach(boton => {
    boton.addEventListener('click', function (e) {
        e.preventDefault()
        const resultado = e.target.dataset.id;
        if(resultado === 'all'){
            cargarCupcakes()
            // remover clase activa de otros botones
            botonesFilter.forEach(function (btn) {
                btn.classList.remove("activo")
            });
                e.target.classList.add("activo")
        }else{
            const newItems = cupcakes.filter(cupcake => cupcake.category === resultado)
            mostrarCupcakes(newItems)
                // remover clase activa de otros botones
            botonesFilter.forEach(function (btn) {
                btn.classList.remove("activo")
            });
                e.target.classList.add("activo")
        }  
    })
})
}

//Funcion para limpiar html previo
function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
}