import { Component } from "react";
import "./charInfo.scss";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import Skeleton from "../skeleton/Skeleton";
import MarvelService from "../../services/MarvelService";
import PropTypes from "prop-types";
class CharInfo extends Component {
  state = {
    char: null,
    loading: false,
    error: false,
  };
  marvelService = new MarvelService();
  componentDidMount() {
    this.updateChar();
  }
  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.updateChar();
    }
  }
  updateChar = () => {
    const { id } = this.props;
    if (!id) {
      return;
    }
    this.onCharLoading();
    this.marvelService
      .getSingleCharacter(id)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };
  onCharLoaded = (char) => {
    this.setState({ char, loading: false });
  };
  onError = () => {
    this.setState({ loading: false, error: true });
  };
  onCharLoading = () => {
    this.setState({ loading: true });
  };
  render() {
    const { char, loading, error } = this.state;
    const skeleton = char || loading || error ? null : <Skeleton />;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;
    return (
      <div className="char__info">
        {skeleton}
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }
}
const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char;
  let imgStyle =
    thumbnail !==
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      ? { objectFit: "cover" }
      : { objectFit: "contain" };
  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} style={imgStyle} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">Homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length > 0 ? null : "Oops...No comics with this character."}
        {comics.map((item, i) => {
          if (i > 9) return;
          return (
            <li key={i} className="char__comics-item">
              {item.name}
            </li>
          );
        })}
      </ul>
    </>
  );
};
CharInfo.propTypes = {
  id: PropTypes.number,
};
export default CharInfo;
