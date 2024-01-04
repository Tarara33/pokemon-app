import './App.css';
import { useEffect, useState } from 'react';
import PokemonThumbnails from './component/PokemonThumbnails';

function App() {
  const [allPokemons, setAllPokemons] = useState([]);

  // 仮でデータを作成する
  const pokemons = [
    {
      id: 1,
      name: "フシギダネ",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
      type: "くさ"
    },
    {
      id: 2,
      name: "フシギソウ",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png",
      type: "くさ"
    },
    {
      id: 3,
      name: "フシギバナ",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png",
      type: "くさ"
    },
  ];

  // APIからデータを取得する
  // パラメータにlimitを設定し、20件取得する
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=20");

  // 仮でフシギダネのURLを使用する
  const pokemonUrl = "https://pokeapi.co/api/v2/pokemon/bulbasaur";

  const getAllPokemons = () => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(data.results);
        setAllPokemons(data.results);
        // 次の20件をURLにセットする
        setUrl(data.next);
      });
  };

  // 個別のポケモンのデータを１つ１つ取得
  const createPokemonObject = ()  => {
    fetch(pokemonUrl)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      // ポケモンの画像の場所
      // - (ハイフン)にlintで自動で半角スペースが入ってしまうため、[]で対応
      // data.sprites.other.official-artwork.front_default でも大丈夫です
      console.log(data.sprites.other["official-artwork"].front_default);
      // ポケモンのタイプの場所
      console.log(data.types[0].type.name);
    });
  };

  useEffect(() => {
    getAllPokemons();
    createPokemonObject();
    }, [])

  return (
    <div className="app-container">
      <h1>ポケモン図鑑</h1>
      <div className='pokemon-container'>
        <div className='all-container'>
          {pokemons.map((pokemon, index) => (
            <PokemonThumbnails
              id={pokemon.id}
              name={allPokemons[index]?.name}
              image={pokemon.image}
              type={pokemon.type}
              key={index}
              />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
