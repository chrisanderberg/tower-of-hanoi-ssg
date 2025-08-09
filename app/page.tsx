import Navigation from "@/components/navigation"
import TowerOfHanoiStateView from "@/components/tower-of-hanoi-state-view"
import TowerOfHanoiStateGraph from "@/components/tower-of-hanoi-state-graph"

export default function HomePage() {
  // Starting state - all disks on peg A
  const defaultState = "aaaa"

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Tower of Hanoi</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
            A classic puzzle game where you move disks between pegs. The goal is to move all disks from the left peg to the right peg,
            following the rules.
          </p>
        </div>

        {/* Interactive displays side by side */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* New Game Link */}
          <a href="/game/aaaa" className="block h-full">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow h-full flex flex-col">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Start New Game</h2>
              <div className="flex justify-center flex-1">
                <svg viewBox="0 0 200 120" className="w-full h-auto">
                  <TowerOfHanoiStateView 
                    gameState={defaultState} 
                    size={200}
                  />
                </svg>
              </div>
              <p className="text-center text-gray-600 mt-4">
                Click to start a new game with all disks on the left peg
              </p>
            </div>
          </a>

          {/* State Graph Link */}
          <a href="/graph" className="block h-full">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow h-full flex flex-col">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">View State Graph</h2>
              <div className="flex justify-center flex-1">
                <TowerOfHanoiStateGraph />
              </div>
              <p className="text-center text-gray-600 mt-4">
                Click to explore all possible game states and transitions
              </p>
            </div>
          </a>
        </div>

        {/* Technical explanation section */}
        <div className="max-w-4xl mx-auto mt-16 space-y-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">About this project - Why I made it</h2>
            <div className="space-y-6 text-gray-600">
              <p className="leading-relaxed">
                The Tower of Hanoi puzzle, a common tool for teaching recursion, proved to be an excellent subject for a Static Site Generation (SSG) project. Its inherent state-based nature made it intriguing to explore building a playable game where each game state is a unique page linked by possible moves. Although this project isn't itself a report or part of a data pipeline, it offered a great way to practice some of the skills and practices useful for such situations. SSG sites can function as efficient data reports, automatically rebuilt as data changes in a pipeline. Much of the game, but the state graph in particular was a great opportunity to practice building visualizations with SVG. Therefore, this project served as an ideal way to practice and deepen skills directly applicable to other projects I'm interested in.
              </p>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Skills Practiced in This Project:</h3>
                <ul className="space-y-2 leading-relaxed">
                  <li className="flex items-baseline">
                    <span className="text-gray-600 mr-3">•</span>
                    <span><strong>Next.js SSG Features:</strong> Familiarized myself with Next.js SSG features.</span>
                  </li>
                  <li className="flex items-baseline">
                    <span className="text-gray-600 mr-3">•</span>
                    <span><strong>SVG Visualization:</strong> Practiced making visualizations using SVG, with the game state graph being particularly good practice.</span>
                  </li>
                  <li className="flex items-baseline">
                    <span className="text-gray-600 mr-3">•</span>
                    <span><strong>View Transitions API:</strong> Used navigation between game states as a great opportunity to familiarize myself with the View Transitions API.</span>
                  </li>
                  <li className="flex items-baseline">
                    <span className="text-gray-600 mr-3">•</span>
                    <span><strong>Transferable skills for Data Reports:</strong> Practiced skills useful for situations where SSG sites function as efficient data reports, automatically rebuilt as data changes in a pipeline.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
