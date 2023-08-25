import { useHttp } from "../hooks/http.hook";
const useMarvelService = () => {
  const { loading, request, error, clearError } = useHttp();
  const _apiBase = "https://gateway.marvel.com:443/v1/public/";
  const _apiKey = "apikey=b125aeeb9ecbb13ceae75d89d3b84699";
  const _baseOffsetCharacters = 210;

  const getCharacters = async (offset = _baseOffsetCharacters) => {
    const res = await request(
      `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map(_transformCharacter);
  };

  const getSingleCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  };

  const _transformCharacter = (character) => {
    return {
      id: character.id,
      name: character.name,
      description: validationDescription(character.description),
      thumbnail: character.thumbnail.path + "." + character.thumbnail.extension,
      homepage: character.urls[0].url,
      wiki: character.urls[1].url,
      comics: character.comics.items,
    };
  };
  const validationDescription = (description) => {
    return description.length === 0
      ? "No description for this character."
      : description.slice(0, 200).concat("...");
  };
  return { loading, error, clearError, getCharacters, getSingleCharacter };
};
export default useMarvelService;
