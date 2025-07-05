import React from 'react'
import { useGameStore } from '../store/useGameStore'
import { shopItems } from '../data/shop'

const ShopPanel: React.FC = () => {
  const money = useGameStore(state => state.money)
  const happiness = useGameStore(state => state.happinessMultiplier)
  const purchased = useGameStore(state => state.purchasedItems)
  const buyItem = useGameStore(state => state.buyItem)
  const sellItem = useGameStore(state => state.sellItem)

  return (
    <div className="bg-white p-4 rounded shadow border-l-4 border-pink-500 mt-6">
      <h2 className="text-xl font-semibold mb-2">🛍️ Magazin</h2>
      <p className="text-sm mb-2">Multiplicator fericire: <strong>{happiness.toFixed(2)}x</strong></p>
      <ul className="space-y-2 text-sm">
        {shopItems.map(item => (
          <li key={item.id} className="flex justify-between items-center">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-xs text-gray-500">
                +{(item.bonus * 100).toFixed(0)}% fericire • {item.cost} RON
                {item.recurringCost && <> • 📉 {item.recurringCost} RON/tick</>}
                {item.maxPurchases && <> • {purchased[item.id] || 0}/{item.maxPurchases}</>}
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => buyItem(item.id)}
                disabled={money < item.cost || (item.maxPurchases && (purchased[item.id] || 0) >= item.maxPurchases)}
                className={`px-2 py-1 rounded text-xs text-white ${
                money < item.cost
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-pink-600 hover:bg-pink-700'
              }`}
              >
                Cumpără
              </button>

              {purchased[item.id] > 0 && item.resaleValue && (
                <button
                  onClick={() => sellItem(item.id)}
                  className="px-2 py-1 rounded text-xs bg-gray-300 hover:bg-gray-400 text-black"
                >
                  Vinde
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ShopPanel
