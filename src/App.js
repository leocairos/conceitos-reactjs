import React, { useState, useEffect } from "react";

import api from './services/api'

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories')
      .then(res => {
        setRepositories(res.data)
      })
  }, [])

  async function handleAddRepository() {
    const res = await api.post('repositories',
      {
        title: `Treinamento react JS ${Date.now()}`,
        url: "https://github.com/leocairos/conceitos-nodejs",
        techs: ["node", "javascript"],
        likes: 0
      })    
    setRepositories([...repositories, res.data])
  }

  async function handleRemoveRepository(id) {
    // TODO
    const res = await api.delete(`repositories/${id}`)

    setRepositories(
      repositories.filter(
        (rep) => { return rep.id !== id }))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories &&
          repositories.map(rep =>
            <li key={rep.id}>
              {rep.title}
              <button onClick={() => handleRemoveRepository(rep.id)}>
                Remover
          </button>
            </li>)
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
