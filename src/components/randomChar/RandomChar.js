import { useEffect, useState } from "react";
import setContent from "../../utils/setContent";
import "../randomChar/randomChar.sass";
import mjolnir from "../../resources/img/mjolnir.png";
import useMarvelService from "../../services/MarvelService";

const RandomChar = () => {
  const [character, setChar] = useState({});
  const { process, setProcess, getSingleCharacter, clearError } =
    useMarvelService();

  useEffect(() => {
    updateChar();
    const timerId = setInterval(updateChar, 6000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  const onCharLoaded = (character) => {
    setChar(character);
  };

  const updateChar = () => {
    clearError();
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    getSingleCharacter(id)
      .then(onCharLoaded)
      .then(() => setProcess("confirmed"));
  };

  return (
    <div className="randomchar">
      {setContent(process, View, character)}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him/her better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button onClick={updateChar} className="button button__main">
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};
const View = ({ data }) => {
  const { name, description, thumbnail, homepage, wiki } = data;
  let imgStyle =
    thumbnail !==
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      ? { objectFit: "cover" }
      : { objectFit: "contain" };
  return (
    <div className="randomchar__block">
      <img
        src={thumbnail}
        alt="Random character"
        className="randomchar__img"
        style={imgStyle}
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
