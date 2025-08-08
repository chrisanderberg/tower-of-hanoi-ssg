import TowerOfHanoiGameBoard from "@/components/tower-of-hanoi-game-board"
import Navigation from "@/components/navigation"
import Confetti from "@/components/confetti"
import { generateAllStates, isValidGameState } from "@/lib/game-logic"

// Generate static params for each game state (replaces getStaticPaths)
export async function generateStaticParams() {
  const staticParams = generateAllStates().map((state) => ({
    state: state,
  }))



  return staticParams
}

interface PageProps {
  params: {
    state: string
  }
}

export default async function GameStatePage({ params }: PageProps) {
  const { state } = await params

  // Updated validation - ensure state is 1-7 characters and only contains a, b, c, s
  if (!isValidGameState(state)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-red-600 mb-4">Invalid Game State</h1>
            <p className="text-lg text-gray-600 mb-8">
              Game state must be 4 characters using only 'a', 'b', 'c', or 's'.
            </p>
            <p className="text-sm text-gray-500">
              Current state: <code className="bg-gray-100 px-2 py-1 rounded">{state}</code> ({state.length} characters)
            </p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />
      <main className="container mx-auto px-4 py-8">

        <div className="flex justify-center">
          <TowerOfHanoiGameBoard
            state={state}
            baseUrl="/game/"
          />
        </div>
        <Confetti isActive={state === 'cccc'} />

        <div className="text-center mt-8">
          <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Rules</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Start with all disks on the left peg</li>
              <li>• Win with all disks on the right peg</li>
              <li>• Only move one disk at a time</li>
              <li>• Only move the top disk from a peg</li>
              <li>• Never place a larger disk on a smaller one</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}
