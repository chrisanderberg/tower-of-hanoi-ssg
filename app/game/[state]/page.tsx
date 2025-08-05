import TowerOfHanoiGameBoard from "@/components/tower-of-hanoi-game-board"
import Navigation from "@/components/navigation"
import Rules from "@/components/rules"
import { generateAllStates, isValidGameState } from "@/lib/game-logic"

// Generate static params for each game state (replaces getStaticPaths)
export async function generateStaticParams() {
  const staticParams = generateAllStates().map((state) => ({
    state: state,
  }))

  //console.log(staticParams)

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

        <Rules />
      </main>
    </div>
  )
}
