import "./style.css";
import { animate } from "motion";
//３つのAPIを取得
import { getPokemon, getSpecies, loadJpDict } from "./api.js";
import { renderPokemon, showError, setLoading } from "./view.js";

animate(document.querySelector(".spinner"), { rotate: [0, 360] }, { duration: 1, repeat: Infinity, ease: "linear" });

let controller;

const load = async (name) => {
    if (controller) controller.abort();
    controller = new AbortController();

    setLoading(true);

    try {
        const dict = await loadJpDict();
        //null 合体演算子　（左辺がnullかundefinedの時だけ、右辺を返します)
        const query = dict[name] ?? name.toLowerCase();

        const [pokemon, species] = await Promise.all([
            getPokemon(query, controller.signal),
            getSpecies(query, controller.signal),
        ]);

        // 3. species から日本語名を取り出して renderPokemon に渡す
        const jpName = species.names.find((n) => n.language.name === "ja")?.name;
        renderPokemon(pokemon, jpName);
    } catch (err) {
        if (err.name === "AbortError") return;
        console.error(err);
        showError("見つかりませんでした");
    } finally {
        setLoading(false);
    }
};

document.querySelector("#searchForm").addEventListener("submit", (e) => {
    e.preventDefault();
    //.toLowerCase()をはずして日本語を受け取るようにする
    load(document.querySelector("#keyword").value.trim());
});

document.querySelector("#searchForm").addEventListener("submit", (e) => {

    e.preventDefault();

    const rect = e.target.querySelector("button").getBoundingClientRect();

    const ripple = document.createElement("div");

    ripple.classList.add("ripple");

    ripple.style.left = rect.left + rect.width / 2 + "px";

    ripple.style.top = rect.top + rect.height / 2 + "px";

    document.body.appendChild(ripple);

    setTimeout(() => {

        ripple.remove();

    }, 900);

    load(document.querySelector("#keyword").value.trim());

});
