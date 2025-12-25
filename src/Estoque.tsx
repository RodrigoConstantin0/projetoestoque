import { useState } from 'react'
import './Estoque.css'

type EstoqueProps = {
  onBack: () => void
}

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

function Estoque({ onBack }: EstoqueProps) {
  // Lista de itens do estoque
  const [itens, setItens] = useState<ItemEstoque[]>([
    { id: 1, nome: 'Azeitona', quantidade: 0, unidade: 'un', meio: false },
    { id: 2, nome: 'Palmito', quantidade: 0, unidade: 'un', meio: false },
    { id: 3, nome: 'Atum', quantidade: 0, unidade: 'un', meio: false },
    { id: 4, nome: 'Ervilha', quantidade: 0, unidade: 'un', meio: false },
    { id: 5, nome: 'Milho P', quantidade: 0, unidade: 'un', meio: false },
    { id: 6, nome: 'Milho G', quantidade: 0, unidade: 'un', meio: false },
    { id: 7, nome: 'Oregano', quantidade: 0, unidade: 'pc', meio: false },
    { id: 8, nome: 'Alho Frito', quantidade: 0, unidade: 'pc', meio: false },
    { id: 9, nome: 'Tomate Seco', quantidade: 0, unidade: 'un', meio: false },
    { id: 10, nome: 'Azeite', quantidade: 0, unidade: 'un', meio: false },
    { id: 11, nome: 'Molho Tomate', quantidade: 0, unidade: 'cx', meio: false },
    { id: 12, nome: 'Chocolate', quantidade: 0, unidade: 'un', meio: false },
    { id: 13, nome: 'Brigadeiro', quantidade: 0, unidade: 'un', meio: false },
    { id: 14, nome: 'Doce de leite', quantidade: 0, unidade: 'un', meio: false },
    { id: 15, nome: 'Nutella', quantidade: 0, unidade: 'un', meio: false },
    { id: 16, nome: 'Fermento', quantidade: 0, unidade: 'un', meio: false },
    { id: 17, nome: 'Aliche', quantidade: 0, unidade: 'un', meio: false },
    { id: 18, nome: 'Bacon Cubo', quantidade: 0, unidade: 'pc', meio: false },
    { id: 19, nome: 'Bacon Fatiado', quantidade: 0, unidade: 'pc', meio: false },
    { id: 20, nome: 'Catupiry', quantidade: 0, unidade: 'un', meio: false },
    { id: 21, nome: 'Cheddar', quantidade: 0, unidade: 'un', meio: false },
    { id: 22, nome: 'Cream Cheese', quantidade: 0, unidade: 'un', meio: false },
    { id: 23, nome: 'Goiabada', quantidade: 0, unidade: 'un', meio: false },
    { id: 24, nome: 'Lombo', quantidade: 0, unidade: 'un', meio: false },
    { id: 25, nome: 'Peito de Peru', quantidade: 0, unidade: 'un', meio: false },
    { id: 26, nome: 'Mussarela', quantidade: 0, unidade: 'un', meio: false },
    { id: 27, nome: 'Queijo Prato', quantidade: 0, unidade: 'un', meio: false },
    { id: 28, nome: 'Ketchup', quantidade: 0, unidade: 'cx', meio: false },
    { id: 29, nome: 'Maionese', quantidade: 0, unidade: 'cx', meio: false },
    { id: 30, nome: 'Mostarda', quantidade: 0, unidade: 'cx', meio: false },
    { id: 31, nome: 'Farinha Trigo', quantidade: 0, unidade: 'pc', meio: false },
    { id: 32, nome: 'Frango', quantidade: 0, unidade: 'cx', meio: false },
    { id: 33, nome: 'Brócolis', quantidade: 0, unidade: 'un', meio: false },
    { id: 34, nome: 'Carne Seca', quantidade: 0, unidade: 'un', meio: false },
  ])

  // Funções de controle da quantidade e meio
  function aumentar(id: number) {
    setItens(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      )
    )
  }

  function diminuir(id: number) {
    setItens(prev =>
      prev.map(item =>
        item.id === id && item.quantidade > 0
          ? { ...item, quantidade: item.quantidade - 1 }
          : item
      )
    )
  }

  function toggleMeio(id: number) {
    setItens(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, meio: !item.meio }
          : item
      )
    )
  }

  // Função principal: enviar pedido para WhatsApp e salvar no histórico
  function enviarWhatsApp() {
    // Filtra os itens que foram selecionados
    const itensSelecionados = itens.filter(
      item => item.quantidade > 0 || item.meio
    )

    if (itensSelecionados.length === 0) {
      alert('Nenhum item selecionado')
      return
    }

    // Monta o texto do pedido
    const linhas = itensSelecionados.map(item => {
      const meio = item.meio ? '½' : ''
      return `• ${item.nome}: ${item.quantidade}${meio} ${item.unidade}`
    })

    const data = new Date()
    const dataFormatada = data.toLocaleString('pt-BR')

    const texto =
      `🍕 Pedido de Reposição\n\n` +
      linhas.join('\n') +
      `\n\n 🕑 ${dataFormatada}`

    // ===============================
    // SALVA NO LOCALSTORAGE
    // ===============================
    const historicoAtual: HistoricoItem[] =
      JSON.parse(localStorage.getItem('historicoEstoque') || '[]')

    historicoAtual.push({
      id: Date.now(),
      data: dataFormatada,
      texto,
      itens: itensSelecionados,
    })

    localStorage.setItem(
      'historicoEstoque',
      JSON.stringify(historicoAtual)
    )

    // ===============================
    // ABRIR WHATSAPP
    // ===============================
    const numeroPatrao = '5512997620199' // coloque o número real aqui
    const url = `https://wa.me/${numeroPatrao}?text=${encodeURIComponent(texto)}`
    window.open(url, '_blank')
  }

  return (
    <div className="estoque">
      <button className="btn-back" onClick={onBack}>
        ← Voltar
      </button>

      <div className="estoque-header">
        <h2>Lista de Mercadorias</h2>
      </div>

      <div className="estoque-list">
        {itens.map(item => (
          <div key={item.id} className="estoque-item">
            <span className="item-nome">{item.nome}</span>

            <div className="item-controle">
              <button onClick={() => diminuir(item.id)}>-</button>

              <span className="item-qtd">
                {item.quantidade}
                {item.meio && '½'} {item.unidade}
              </span>

              <button onClick={() => aumentar(item.id)}>+</button>

              <label className="meio-check">
                <input
                  type="checkbox"
                  checked={item.meio}
                  onChange={() => toggleMeio(item.id)}
                />
                ½
              </label>
            </div>
          </div>
        ))}
      </div>

      <button className="btn btn-start btn-enviar" onClick={enviarWhatsApp}>
        Enviar para WhatsApp
      </button>
    </div>
  )
}

export default Estoque
