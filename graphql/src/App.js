import logo from './logo.svg';
import './App.css';
import github from './db.js';
import {useEffect, useState, useCallback} from 'react';

function App() {

  let [userName, setUserName] = useState("");
  
  const fetchData = useCallback( () => {
    const githubQuery = {
      query: `
      {
        viewer {
          name
        }
      }
      `,
    };

    fetch(github.baseURL, {
      method: "POST",
      headers: github.headers,
      body: JSON.stringify(githubQuery)
    })
    .then(response => response.json())
    .then(data => {
      setUserName(data.data.viewer.name)
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    });
  }, []);

  
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div className="App container mt-5">
     <h1 className="text-primary"><i className="bi bi-digram-2-fill"></i>Repos</h1>
     <p>{userName}</p>
    </div>
  );
}

export default App;
