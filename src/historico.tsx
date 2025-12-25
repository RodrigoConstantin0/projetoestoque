import { useEffect, useState } from 'react'
import './historico.css'

type ItemEstoque = {
  id: number
  nome: string
  quantidade: number
  unidade: string
  meio: boolean
}

type HistoricoItem = {
  id: number
  data: string
  texto: string
  itens: ItemEstoque[]
}

type HistoricoProps = {
  onBack: () => void
}

export default function Historico({ onBack }: HistoricoProps) {
  const [historico, setHistorico] = useState<HistoricoItem[]>([])

  useEffect(() => {
    // Pega o histórico salvo
    const dados = localStorage.getItem('historicoEstoque')
    if (dados) {
      setHistorico(JSON.parse(dados).reverse()) // Mais recente primeiro
    }
  }, [])

  function reenviarWhats(texto: string) {
    const numeroPatrao = '5512997620199' // número fixo
    const url = `https://wa.me/${numeroPatrao}?text=${encodeURIComponent(texto)}`
    window.open(url, '_blank')
  }

  return (
    <div className="historico">
      <button className="btn-back" onClick={onBack}>
        ← Voltar
      </button>

      <div className="historico-header">
        <h2>Histórico de Pedidos</h2>
        <p>Pedidos enviados anteriormente</p>
      </div>

      <div className="historico-list">
        {historico.length === 0 && (
          <p className="vazio">Nenhum pedido enviado ainda</p>
        )}

        {historico.map((item) => (
          <div className="historico-item" key={item.id}>
            <div className="historico-info">
              <pre className="texto">{item.texto}</pre>
            </div>

            <button
              className="btn-reenviar"
              onClick={() => reenviarWhats(item.texto)}
            >
              Reenviar
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
