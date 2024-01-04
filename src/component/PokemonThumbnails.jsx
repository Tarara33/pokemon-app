const PokemonThumbnails = ({id, name, image, type}) => {
  return (
    <div>
      <div class="number">
        <small>#0{id}</small>
      </div>
      <img src={image} art={name} />
      <div className="detail-wrapper">
        <h4>{name}</h4>
        <h3>{type}</h3>
      </div>
    </div>
  );
};

export default PokemonThumbnails;