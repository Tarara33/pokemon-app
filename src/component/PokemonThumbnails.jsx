const PokemonThumbnails = ({id, name, iconImage, image, type, jpName, jpType}) => {
  const style = `thumb-container ${type}`;

  return (
    <div className={style}>
      <div className="number">
        <small>#0{id}</small>
      </div>
      <img src={image} art={name} />
      <img src={iconImage} alt={name} className="icon-image" />
      <div className="detail-wrapper">
        <h4>{jpName}</h4>
        <h3>{jpType}</h3>
      </div>
    </div>
  );
};

export default PokemonThumbnails;