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
          <p className="text-md text-gray-500 max-w-3xl mx-auto">
            This is a static site demonstration built with Next.js, featuring pre-generated game states and SVG-based visualizations. 
            Explore the interactive game board above or view the complete state graph to see all possible game configurations.
          </p>
        </div>

        {/* Interactive displays side by side */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* New Game Link */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Start New Game</h2>
            <div className="flex justify-center">
              <a href="/game/aaaa" className="block w-full">
                <svg viewBox="0 0 200 120" className="w-full h-auto">
                  <TowerOfHanoiStateView 
                    gameState={defaultState} 
                    size={200}
                  />
                </svg>
              </a>
            </div>
            <p className="text-center text-gray-600 mt-4">
              Click to start a new game with all disks on the left peg
            </p>
          </div>

          {/* State Graph Link */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">View State Graph</h2>
            <div className="flex justify-center">
              <a href="/graph" className="block">
                <TowerOfHanoiStateGraph />
              </a>
            </div>
            <p className="text-center text-gray-600 mt-4">
              Click to explore all possible game states and transitions
            </p>
          </div>
        </div>

        {/* Technical explanation section */}
        <div className="max-w-4xl mx-auto mt-16 space-y-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Technical Implementation</h2>
            <div className="space-y-4 text-gray-600">
              <p className="leading-relaxed">
                This project demonstrates static site generation (SSG) with Next.js, pre-generating all possible Tower of Hanoi game states at build time. 
                Each game state is represented as a 4-character string (e.g., "aaaa", "abca") where each character indicates which peg contains the corresponding disk.
              </p>
              <p className="leading-relaxed">
                The game board uses SVG graphics for crisp, scalable rendering. Move buttons display as arrows showing the disk movement path, 
                with colors matching the disk being moved. The state graph visualizes all possible game states in a Sierpinski triangle layout.
              </p>
              <p className="leading-relaxed">
                Built with TypeScript, Tailwind CSS, and modern React patterns. The architecture supports instant navigation between game states 
                without client-side JavaScript, making it perfect for portfolio demonstration of static site capabilities.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Static Generation</h3>
                <p className="text-gray-600 leading-relaxed">
                  All 81 possible game states are pre-generated at build time, enabling instant loading and optimal performance.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">SVG Visualizations</h3>
                <p className="text-gray-600 leading-relaxed">
                  Game board and state graph use SVG for crisp, scalable graphics that work perfectly at any resolution.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Interactive Navigation</h3>
                <p className="text-gray-600 leading-relaxed">
                  Visual move indicators show possible disk movements with color-coded arrows and disk numbers.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">State Graph</h3>
                <p className="text-gray-600 leading-relaxed">
                  Complete visualization of the game's state space showing all possible moves and transitions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
