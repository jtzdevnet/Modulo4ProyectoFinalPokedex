let pokemon_array;
let global_pokemon;

fetch(
  "/js/pokemons.json",
  { method: 'GET' })
  .then((response) => response.json())
  .then(function(data){

    // Eliminar pokemones repetidos
    pokemon_array = data;
    const ids = pokemon_array.map(({ id }) => id);
    const filtered = pokemon_array.filter(({ id }, index) =>
    !ids.includes(id, index + 1));
    pokemon_array = filtered;

    // Llenar la lista de pokemones
    pokemon_array.forEach((pokemon) => {
        let pokemon_list = document.getElementById("pokemon-list");
        let newPokemonEntry = document.createElement("li");
        newPokemonEntry.classList.add("pokemon-list-item");
        newPokemonEntry.innerHTML = '<span class="pokemon-number">'+pokemon.number+' - </span>'+'<span class="pokemon-name">'+pokemon.name+'</span>';
        newPokemonEntry.setAttribute("data-pokemon-id",pokemon.id);
        pokemon_list.appendChild(newPokemonEntry);
    });

    // Listener de click para cada pokemon de la lista y cargar imagen
    document.querySelectorAll(".pokemon-list-item").forEach(pokemon_item => {
        pokemon_item.addEventListener("click", function(e){
            // Quitar estilo active de todos los list item
            document.querySelectorAll(".pokemon-list-item").forEach(item =>{
                item.classList.remove("active");
            });
            // Obtener ID del pokemon clikeado
            let clicked_pokemon_id = e.target.getAttribute("data-pokemon-id");
            // Añadir estilo active al list item clikeado
            e.target.classList.add("active");
            // Crear arreglo con la informacion del pokemon clikeado a partir del arreglo gigante
            global_pokemon = pokemon_array.filter(x => x.id == clicked_pokemon_id)[0];
            // Poner imagen del pokemon clikeado
            document.getElementById("pokemon-main-image").setAttribute("src",global_pokemon.ThumbnailImage);
            document.getElementById("pokemon-main-image").setAttribute("alt",global_pokemon.ThumbnailAltText);
            // Poner nombre del pokemon clikeado
            document.getElementById("pokemon-main-name").innerHTML = '<span class="pokemon-number">'+global_pokemon.number+' - </span>'+'<span class="pokemon-name">'+global_pokemon.name+'</span>';
        });
    });
  })
  .catch(err => {
      console.error(err);
  });


window.addEventListener('modal_show', function (e) { 
    if(global_pokemon){
        document.getElementById('pokemonModal').scrollTop = 0;
        document.querySelector('.modal-title').innerHTML = `${global_pokemon.name}`;
        document.querySelector('.modal-body').innerHTML = 
        `<div class="pokemon-information-template">
            <div class="pokemon-modal-image">
                <img src="${global_pokemon.ThumbnailImage}" alt="${global_pokemon.ThumbnailAltText}">
                <span class="pokemon-head-info-number">No.: ${global_pokemon.number}</span>
            </div>
            <div class="pokemon-modal-info">
                <div class="pokemon-head-info">
                    <span class="pokemon-head-info-name">${global_pokemon.name}</span>
                    
                </div>
                <div class="pokemon-type-info">
                    <div>
                        <h4>Tipo(s):</h4>
                        <ul>
                        ${(()=>{let string = "";for(let i = 0; i < global_pokemon.type.length; i++){
                            string += '<li><span class="bg-'+global_pokemon.type[i]+'"/>'+global_pokemon.type[i]+'</span></li>';
                        } return string })()}
                        </ul>
                    </div>
                    <div>
                        <h4>Debilidades:</h4>
                        <ul>
                        ${(()=>{let string = "";for(let i = 0; i < global_pokemon.weakness.length; i++){
                            string += '<li><span class="bg-'+global_pokemon.weakness[i].toLowerCase()+'"/>'+global_pokemon.weakness[i].toLowerCase()+'</span></li>';
                        } return string })()}
                        </ul>
                    </div>
                </div>
                <div class="pokemon-attack-info">
                    <h4>Ataques:</h4>
                    <ul>
                    ${(()=>{let string = "";for(let i = 0; i < global_pokemon.abilities.length; i++){
                        string += "<li>"+global_pokemon.abilities[i]+"</li>";
                    } return string })()}
                    </ul>
                </div>
                <div class="pokemon-phys-info">
                    <span>Peso: <span>${global_pokemon.weight} lbs</span></span>
                    <span>Altura: <span>${global_pokemon.height} in</span></span>
                </div>
            </div>
        </div>`;
    }
}, false);
window.addEventListener('modal_hide', function (e) { 
    console.log("closing");
}, false);


document.getElementById('pokemon_name_search').addEventListener('input', function (event) {
    const searchTerm = event.target.value.toLowerCase();
    const listItems = document.querySelectorAll('#pokemon-list li');

    listItems.forEach(function (item) {
        const itemText = item.textContent.toLowerCase();

        if (itemText.includes(searchTerm)) {
            item.style.display = 'list-item';
        } else {
            item.style.display = 'none';
        }
    });
});



// Listener de click para cada filtro
document.querySelectorAll(".filter-btn").forEach(filter_btn => {
    filter_btn.addEventListener("click", function(e){
        e.preventDefault();
        if(e.target.classList.contains('active')){
            document.getElementById("filtered-by-text").innerText = "";
            document.querySelectorAll(".pokemon-list-item").forEach(list_item => {
                list_item.style.display = 'list-item';
            });
            document.querySelectorAll(".filter-btn").forEach(filter_active_btn => {
                filter_active_btn.classList.remove('active');
            });
        }
        else{
            document.getElementById("filtered-by-text").innerText = "Filtrado por tipo: "+e.target.innerText;
            document.querySelectorAll(".filter-btn").forEach(filter_active_btn => {
                filter_active_btn.classList.remove('active');
            });
            e.target.classList.add("active");
            let filteredPokemonArray = pokemon_array.filter((pokemon) => {
                return pokemon.type.includes(e.target.innerText.toLowerCase());
            });
        
            document.querySelectorAll(".pokemon-list-item").forEach(list_item => {
                list_item.style.display = 'none';
            });
            filteredPokemonArray.forEach((pokemon) => {
                document.querySelector('.pokemon-list-item[data-pokemon-id="'+pokemon.id+'"]').style.display = 'list-item';
            });
        }
        
    });
});