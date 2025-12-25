import Logo from '../src/dnapoli.png'
import './App.css'
import './botao.css'
import Estoque from './Estoque'
import Historico from './historico'
import { useState } from 'react'

function App() {
  const [page, setPage] = useState<'home' | 'estoque' | 'historico'>('home')

  return (
    <div className="App">

      {/* ===== HOME ===== */}
      {page === 'home' && (
        <>
          <main>
            <header>
              <img src={Logo} alt="Logo D'Napolli" className="Logo" />
            </header>

            <p>Controle De Estoque</p>

            <div className="buttons">
              <button
                className="btn btn-start"
                onClick={() => setPage('estoque')}
              >
                Começar
              </button>

              <button
                className="btn btn-history"
                onClick={() => setPage('historico')}
              >
                Histórico
              </button>
            </div>
          </main>

          <footer className="footer">
            Desenvolvido por Rodrigo Constantino —{' '}
            <a
              href="https://github.com/rodrigoconstantino"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </footer>
        </>
      )}

      {/* ===== ESTOQUE ===== */}
      {page === 'estoque' && (
        <Estoque onBack={() => setPage('home')} />
      )}

      {/* ===== HISTÓRICO ===== */}
      {page === 'historico' && (
        <Historico onBack={() => setPage('home')} />
      )}

    </div>
  )
}

export default App
