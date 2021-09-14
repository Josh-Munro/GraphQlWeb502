import logo from './logo.svg';
import './App.css';
import github from './db.js';
import {useEffect, useState, useCallback} from 'react';

function App() {

  let [userName, setUserName] = useState("");
  let [repoList, setRepoList] = useState(null);

  const fetchData = useCallback( () => {
    const githubQuery = {
      query: `
      {
        viewer {
          name
          repositories(first:10) {
            nodes {
              name
              id
              description
              url
            }
          }
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
      const viewer = data.data.viewer;
      setUserName(viewer.name);
      setRepoList(viewer.repositories.nodes);
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

     { repoList && (
       <ul className="list-group list-group-flush">
         {
           repoList.map((repo) => (
             <li key={repo.id.toString()}>
               <a href={repo.url}>
                 {repo.name}
               </a>
               <p>{repo.description}</p>
             </li>
           ))
         }
       </ul>
     )

     }
    </div>
  );
}

export default App;
