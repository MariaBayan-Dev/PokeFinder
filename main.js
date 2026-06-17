const btn = document.querySelector('#btn')
const buscar = document.querySelector('#buscar')

const  PokeApi = async (nombre) =>{
    try{

    //LIMPIEZA INPUT

    buscar.value = ""

    //LLAMADA A LA API

    const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`)

    const datos = await respuesta.json()

    const contenedor = document.querySelector('#resultado')

    contenedor.innerHTML = `
        <article class="poke-card ${datos.types[0].type.name}">
            <div class="color-top">
            <button id="pokemon-sound">
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><!-- Icon from Basil by Craftwork - https://creativecommons.org/licenses/by/4.0/ --><path fill='currentColor' d='M14.61 4.846a1 1 0 0 0-1.633-.645L7.958 8.384a.5.5 0 0 1-.32.116H3.75c-.69 0-1.25.56-1.25 1.25v4.5c0 .69.56 1.25 1.25 1.25h3.888a.5.5 0 0 1 .32.116l5.02 4.182a1 1 0 0 0 1.632-.644l.095-.766c.53-4.242.53-8.534 0-12.776zm5.298 1.1a.75.75 0 0 1 .948.476c.58 1.755.894 3.63.894 5.578a17.8 17.8 0 0 1-.894 5.578a.75.75 0 1 1-1.424-.471c.53-1.605.818-3.322.818-5.107s-.288-3.502-.818-5.107a.75.75 0 0 1 .476-.947m-1.876 2.002a.75.75 0 0 0-1.408.517c.405 1.1.626 2.291.626 3.535a10.3 10.3 0 0 1-.626 3.535a.75.75 0 0 0 1.408.517A11.7 11.7 0 0 0 18.75 12c0-1.423-.253-2.788-.718-4.052'/></svg>
            </button>

                <div class="stat-hp">
                    <p class="stat-name-hp">HP</p>
                    <p class="stat-number-hp">${datos.stats[0].base_stat}</p>
                </div>

                <div class="cirle-color">
                    <img src="${datos.sprites.other['official-artwork'].front_default}"/>
                </div>
            </div>

            <div class="info">
            <h2>${datos.name}</h2>
                <div class="data">
                    <span class="type">${datos.types[0].type.name}</span>
                    ${datos.types[1] ? `<span class="sub-type">${datos.types[1].type.name}</span>` : ''}
                </div>

                <div class="stat">
                    <div class="stat-item">
                        <p class="stat-name">ATK</p>
                        <p class="stat-number">${datos.stats[1].base_stat}</p>
                    </div>

                    <div class="stat-item">
                        <p class="stat-name">DEF</p>
                        <p class="stat-number">${datos.stats[2].base_stat}</p>
                    </div>
                    
                    <div class="stat-item">
                        <p class="stat-name">SPD</p>
                        <p class="stat-number">${datos.stats[5].base_stat}</p>
                    </div>
                </div>
            </div>
        </article>
    `
    console.log(datos)

//COLORES POKEMON

const coloresTipo = {
    bug: '#49c084',
    dark: '#1d1d1d',
    dragon: '#f0d681',
    electric: '#f9d94b',
    fairy: '#f087b2',
    fighting: '#494d99',
    fire: '#eb7b58',
    flying:  '#71adad',
    ghost: '#ac6fe9',
    grass:  '#3fbda4',
    ground: '#f0bc5d',
    ice: '#75abe0',
    normal: '#899ca8',
    poison: '#5e4ce9',
    psychic: '#ada8f5',
    rock: '#606466',
    steel: '#8D9DB7',
    water: '#5eb8f5'
}


//SONIDO POKEMON

const soundBtn = contenedor.querySelector('#pokemon-sound')

soundBtn.addEventListener('click', () => {
    const audio = new Audio(`${datos.cries.latest}`)
    soundBtn.disabled = true
    audio.play()
    audio.addEventListener('ended', () => {
        soundBtn.disabled = false
    })
})


//CAMBIO DE COLOR EN EL BADGE

const typeBadge = contenedor.querySelector('.type')
typeBadge.style.backgroundColor = coloresTipo[datos.types[0].type.name]

if(datos.types[1]){
    const subType = contenedor.querySelector('.sub-type')
    subType.style.backgroundColor = coloresTipo[datos.types[1].type.name]
}

    
//MOVIMIENTO CARD POKEMON 3D

const pokeCard = contenedor.querySelector('article')
pokeCard.addEventListener('mousemove', (e) => {
    if(window.innerWidth <= 480){
        pokeCard.style.transform = 'none'
        return
    }

    const rect = pokeCard.getBoundingClientRect()

    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    pokeCard.style.transform = `rotateX(${y / 15}deg) rotateY(${x / 15}deg)`
})

pokeCard.addEventListener('mouseleave', () =>{
    pokeCard.style.transform = `rotateX(0deg) rotateY(0deg)`
})


//ERROR DE LA API

    }catch(error){
        contenedor.innerHTML = `<p>Pokémon no encontrado, prueba con otro nombre</p>`
        console.log('Algo ha fallado:', error)
    }
}


//INPUT INTRODUCIR NOMBRE POKEMON

btn.addEventListener('click', () => {
    const nombre = buscar.value
    PokeApi(nombre)
})

buscar.addEventListener('keydown', (evento) => {
    if(evento.key === 'Enter'){
        const nombre = buscar.value
        PokeApi(nombre)
    }
})

