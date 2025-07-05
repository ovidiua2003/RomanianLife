import React from 'react'
import { useGameStore } from '../store/useGameStore'
import { shopItems } from '../data/shop'

const ShopPanel: React.FC = () => {
  const money = useGameStore(state => state.money)
  const happiness = useGameStore(state => state.happinessMultiplier)
  const purchased = useGameStore(state => state.purchasedItems)
  const buyItem = useGameStore(state => state.buyItem)

  return (
    <div className="bg-white p-4 rounded shadow border-l-4 border-pink-500 mt-6">
      <h2 className="text-xl font-semibold mb-2">🛍️ Magazin</h2>
      <p className="text-sm mb-2">Multiplicator fericire: <strong>{happiness.toFixed(2)}x</strong></p>
      <ul className="space-y-2 text-sm">
        {shopItems.map(item => (
          <li key={item.id} className="flex justify-between items-center">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-xs text-gray-500">+{(item.bonus * 100).toFixed(0)}% fericire • {item.cost} RON</p>
            </div>
            <button
              onClick={() => buyItem(item.id)}
              disabled={purchased.includes(item.id) || money < item.cost}
              className={`px-2 py-1 rounded text-xs ${
                purchased.includes(item.id)
                  ? 'bg-gray-400'
                  : money >= item.cost
                  ? 'bg-pink-600 hover:bg-pink-700'
                  : 'bg-gray-300'
              } text-white`}
            >
              {purchased.includes(item.id) ? 'Cumpărat' : 'Cumpără'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ShopPanel
