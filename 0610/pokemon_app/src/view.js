const card = document.querySelector(".card");
const errorEl = document.querySelector(".error");
const loader = document.querySelector(".loader");

export const renderPokemon = (data) => {

    document.querySelector(".app").classList.remove("app--empty");

    const type = data.types[0].type.name;

    card.className = "card";
    card.classList.add(type);

    const bgMap = {
        electric: "/src/electric.jpg",
        fire: "/src/fire.jpg",
        water: "/src/water.png",
        grass: "/src/grass.jpg",
        normal: "/src/normal.jpg",
        ghost: "/src/ghost.jpeg",
        psychic: "/src/psychic.jpeg",
        ice: "/src/ice.jpg",
        poison: "/src/grass.jpg",
    };

    const bgImage = bgMap[type] || "/images/default.jpg";

    const types = data.types
        .map((t) => t.type.name)
        .join(" / ");

    card.innerHTML = `
        <h2>${data.name}</h2>

        <div
            class="pokemon-image"
            style="background-image: url('${bgImage}')"
        >
            <img
                src="${data.sprites.front_default}"
                alt="${data.name}"
            >
        </div>

        <p>タイプ: ${types}</p>
        <p>身長: ${data.height / 10} m</p>
        <p>体重: ${data.weight / 10} kg</p>
    `;

    card.hidden = false;
    errorEl.hidden = true;
};

export const showError = (message) => {
    errorEl.textContent = message;
    errorEl.hidden = false;
    card.hidden = true;
};

export function setLoading(isLoading) {
    loader.hidden = !isLoading;

    if (isLoading) {
        card.hidden = true;
        errorEl.hidden = true;
    }
}