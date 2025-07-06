import React from 'react'
import { useGameStore } from '../store/useGameStore'
import { shopItems } from '../data/shop'
import { ArrowTrendingDownIcon, GiftIcon, Square3Stack3DIcon } from '@heroicons/react/24/outline'

const ShopPanel: React.FC = () => {
  const money = useGameStore(state => state.money)
  const happiness = useGameStore(state => state.happinessMultiplier)
  const purchased = useGameStore(state => state.purchasedItems)
  const buyItem = useGameStore(state => state.buyItem)
  const sellItem = useGameStore(state => state.sellItem)

  return (
    <div className="rounded shadow">
      <h2 className="text-xl font-semibold mb-2">🛍️ Magazin</h2>
      <p className="text-md mb-2">Multiplicator fericire: <strong>{happiness.toFixed(2)}x</strong></p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {shopItems.map(item => {
          const owned = purchased[item.id] || 0
          const canBuy = money >= item.cost && (!item.maxPurchases || owned < item.maxPurchases)
          const canSell = owned > 0 && item.resaleValue

          return (
            <div key={item.id} className="bg-gray-800 p-4 rounded shadow text-md space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-white">{item.name}</span>
                <span className="text-gray-300">{item.cost} RON</span>
              </div>

              <div className="text-sm text-gray-400 space-y-1">
                <p className="flex flex-wrap justify-start items-center gap-2"><GiftIcon className="size-4 text-orange-400" /> Bonus: +{(item.bonus * 100).toFixed(0)}% fericire</p>
                {item.recurringCost && <p className="flex flex-wrap justify-start items-center gap-2"><ArrowTrendingDownIcon className="size-4 text-white-800" /> Cost recurent: {item.recurringCost} RON/tick</p>}
                {item.maxPurchases && <p className="flex flex-wrap justify-start items-center gap-2"><Square3Stack3DIcon className="size-4 text-blue-400" /> Deținut: {owned}/{item.maxPurchases}</p>}
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => buyItem(item.id)}
                  disabled={!canBuy}
                  className={`px-3 py-1 rounded text-sm font-semibold ${
                    canBuy
                      ? 'bg-pink-600 hover:bg-pink-700 text-white'
                      : 'bg-gray-600 text-gray-300 cursor-not-allowed'
                  }`}
                >
                  Cumpără
                </button>

                {canSell && (
                  <button
                    onClick={() => sellItem(item.id)}
                    className="px-3 py-1 rounded text-sm font-semibold bg-gray-300 hover:bg-gray-400 text-black"
                  >
                    Vinde
                  </button>
                )}
              </div>
            </div>
          )})}
      </div>
    </div>
  )
}

export default ShopPanel
