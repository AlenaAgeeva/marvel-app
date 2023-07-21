class MarvelService {
  _apiBase = "https://gateway.marvel.com:443/v1/public/";
  _apiKey = "apikey=b125aeeb9ecbb13ceae75d89d3b84699";
  _baseOffsetCharacters = 210;

  getResource = async (url) => {
    let res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
  };

  getCharacters = async (offset = this._baseOffsetCharacters) => {
    const res = await this.getResource(
      `${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`
    );
    return res.data.results.map(this._transformCharacter);
  };

  getSingleCharacter = async (id) => {
    const res = await this.getResource(
      `${this._apiBase}characters/${id}?${this._apiKey}`
    );
    return this._transformCharacter(res.data.results[0]);
  };

  _transformCharacter = (character) => {
    return {
      id: character.id,
      name: character.name,
      description: this.validationDescription(character.description),
      thumbnail: character.thumbnail.path + "." + character.thumbnail.extension,
      homepage: character.urls[0].url,
      wiki: character.urls[1].url,
      comics: character.comics.items,
    };
  };
  validationDescription = (description) => {
    return description.length === 0
      ? "No description for this character."
      : description.slice(0, 200).concat("...");
  };
}
export default MarvelService;
