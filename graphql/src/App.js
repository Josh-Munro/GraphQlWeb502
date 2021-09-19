import logo from './logo.svg';
import './App.css';
import github from './db.js';
import {useEffect, useState, useCallback} from 'react';
import RepoInfo from './RepoInfo'
function App() {

  let [userName, setUserName] = useState("");
  let [repoList, setRepoList] = useState(null);

  const fetchData = useCallback( () => {
    const githubQuery = {
      query: `
      {
        viewer {
          name
         }
          search(query: "Josh-Munro sort:updated-desc", type:REPOSITORY, first: 10) {
            nodes{
              ... on Repository {
                name
                description
                id
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
      const repos = data.data.search.nodes;
      setUserName(viewer.name);
      setRepoList(repos);
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
             <RepoInfo key={repo.id} repo={repo}/>
           ))
         }
       </ul>
     )

     }
    </div>
  );
}

export default App;
