import Navigation from "@/components/navigation"
import TowerOfHanoiStateGraph from "@/components/tower-of-hanoi-state-graph"

export default function StateGraphPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Tower of Hanoi State Graph</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Visualize all possible game states and transitions between them.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-6xl mx-auto">
          <div className="flex justify-center">
            <TowerOfHanoiStateGraph baseUrl="/game/" />
          </div>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Graph Features</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                Node representation of game states
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                Edge connections for valid moves
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                Interactive navigation between states
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total States (3 disks):</span>
                <span className="font-semibold">8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total States (4 disks):</span>
                <span className="font-semibold">16</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Minimum Moves (3 disks):</span>
                <span className="font-semibold">7</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
