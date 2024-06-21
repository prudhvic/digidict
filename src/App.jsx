import { useEffect, useState } from "react";
import "./App.css";
import { getData } from "./api/FetchWord";
import { getDefs } from "./utils/functions";

function App() {
  const [word, setWord] = useState("");
  const [data, setData] = useState(null);

  const updateData = async () => {
    try {
      const details = await getData(word);
      const {
        word: word2,
        phonetic,
        phonetics,
        meanings,
        sourceUrls,
      } = details[0];
      const newData = { word2, phonetic, phonetics, meanings, sourceUrls };
      setData(newData);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error (e.g., show error message to the user)
    }
  };

  return (
    <div className="app">
      <header>
        <h1>DigiDict</h1>
      </header>
      <div className="search-container">
        <input
          type="text"
          className="input-field"
          placeholder="Enter a word"
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        <button className="find-button" onClick={updateData}>
          Find
        </button>
      </div>

      {data && (
        <div className="word-definition">
          <h2 className="word">{data.word2}</h2>
          <div className="phonetics">
            <p className="phonetic-pronunciation">Phonetic: {data.phonetic}</p>
            {data.phonetics.map((item, index) => (
              <div key={index} className="phonetic-item">
                <p>{item.text}</p>
                {item.audio && (
                  <audio controls className="audio-control">
                    <source src={item.audio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                )}
                {item.sourceUrl && (
                  <p className="source-url">
                    Source:{" "}
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.sourceUrl}
                    </a>
                  </p>
                )}
              </div>
            ))}
          </div>
          <div className="meanings">
            {data.meanings.map((meaning, index) => (
              <div key={index} className="meaning">
                <h3 className="part-of-speech">{meaning.partOfSpeech}</h3>
                {meaning.definitions.map((definition, idx) => (
                  <div key={idx} className="definition">
                    <p className="definition-text">
                      <strong>Definition:</strong> {definition.definition}
                    </p>
                    {definition.example && (
                      <p className="example-text">
                        <strong>Example:</strong> {definition.example}
                      </p>
                    )}
                  </div>
                ))}
                {meaning.synonyms.length > 0 && (
                  <p className="synonyms">
                    <strong>Synonyms:</strong> {meaning.synonyms.join(", ")}
                  </p>
                )}
              </div>
            ))}
          </div>
          {data.sourceUrls.length > 0 && (
            <div className="sources">
              <p className="sources-heading">Source:</p>
              <ul className="sources-list">
                {data.sourceUrls.map((url, index) => (
                  <li key={index} className="source-item">
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      {url}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
