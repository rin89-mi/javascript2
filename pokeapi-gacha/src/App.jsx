import { useState } from "react";
import PokemonCard from "./components/PokemonCard";

const STORAGE_KEY = "registeredPokemon";

const loadRegistered = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
};

export default function App() {
  // useState
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(loadRegistered);
  const [view, setView] = useState("gacha");


  // 登録
  const register = () => {
    if (!pokemon) return;

    if (registered.find((p) => p.id === pokemon.id)) return;

    const next = [
      ...registered,
      {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.front_default,
      },
    ];

    setRegistered(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  // ガチャ
  const drawGacha = async () => {
    setLoading(true);

    try {
      const id = Math.floor(Math.random() * 151) + 1;
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

      if (!res.ok) throw new Error(`HTTPエラー: ${res.status}`);

      const data = await res.json();
      setPokemon(data);
    } catch (err) {
      console.error(err);
      alert("読み込みに失敗しました");
    } finally {
      setLoading(false);
    }
  };

  // src/App.jsx（return文の中身）
  return (
    <main className="app-shell">
      <header className="app-header">
        <h1 className="app-title">PokeAPIガチャ</h1>
        <p>ランダムに出会ったポケモンをコレクションします。</p>
      </header>

      <nav className="app-tabs">
        <button
          className={view === "gacha" ? "tab-button active" : "tab-button"}
          onClick={() => setView("gacha")}
        >
          ガチャ
        </button>
        <button
          className={view === "list" ? "tab-button active" : "tab-button"}
          onClick={() => setView("list")}
        >
          登録済み（{registered.length}）
        </button>
      </nav>

      <section className="app-panel">
        {view === "gacha" && (
          <>
            <button className="primary-button" onClick={drawGacha} disabled={loading}>
              {loading ? "読み込み中…" : "ガチャを引く"}
            </button>
            {pokemon && (
              <>
                <PokemonCard pokemon={pokemon} />
                <button className="secondary-button" onClick={register}>登録する</button>
              </>
            )}
          </>
        )}

        {view === "list" && (
          <>
            <h2>登録済みポケモン</h2>
            <p>登録数：{registered.length}</p>

            {registered.length === 0 ? (
              <div className="empty-state">
                <p>まだ登録がありません。</p>
                <p>ガチャ画面でポケモンを引いて登録してください。</p>
              </div>
            ) : (
              <ul className="registered">
                {registered.map((p) => (
                  <li className="registered-card" key={p.id}>
                    <img src={p.image} alt={p.name} />
                    <span>{p.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </section>
    </main>
  );

}