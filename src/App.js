import './App.css';
import { useEffect, useState } from 'react';
import PokemonThumbnails from './component/PokemonThumbnails';

function App() {
  const [allPokemons, setAllPokemons] = useState([]);
  // APIからデータを取得する, パラメータにlimitを設定し、20件取得する
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=20");

  const [isLoading, setIsLoading] = useState(false);

  const getAllPokemons = () => {
    setIsLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        // 次の20件をURLにセットする
        setUrl(data.next);
        // ポケモンオブジェクト作る
        createPokemonObject(data.results);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // 個別のポケモンのデータを１つ１つ取得
  const createPokemonObject = (results)  => {
    results.forEach(pokemon => {
      const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`;
      fetch(pokemonUrl)
      .then(res => res.json())
      .then(data => {
        // ポケモンの画像の場所
        // - (ハイフン)にlintで自動で半角スペースが入ってしまうため、[]で対応
        // data.sprites.other.official-artwork.front_default でも大丈夫です
        const _image = data.sprites.other["official-artwork"].front_default;
        // ポケモンのタイプの場所
        const _type = data.types[0].type.name;

        const newList = {
          id: data.id,
          name: data.name,
          image: _image,
          type: _type
        }

        // 既存のデータを展開し、新しいデータを追加する
        setAllPokemons(currentList => [...currentList, newList]);
      });
    });
  };

  useEffect(() => {
    getAllPokemons();
    }, [])

  return (
    <div className="app-container">
      <h1>ポケモン図鑑</h1>
      <div className='pokemon-container'>
        <div className='all-container'>
          {allPokemons.map((pokemon, index) => (
            <PokemonThumbnails
              id={pokemon.id}
              name={allPokemons[index]?.name}
              image={pokemon.image}
              type={pokemon.type}
              key={index}
              />
          ))}
        </div>
        {isLoading ? (
          <div className='load-more'>now loading...</div>
        ) : (
          <button className='load-more' onClick={getAllPokemons}>
            もっとみる！
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
