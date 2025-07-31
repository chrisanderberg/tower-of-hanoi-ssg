import TowerOfHanoiGame from "@/components/tower-of-hanoi-game"
import Navigation from "@/components/navigation"
import Rules from "@/components/rules"

// Generate static params for each game state (replaces getStaticPaths)
export async function generateStaticParams() {
  // Hardcoded states for now - various disk counts from 1 to 7
  function gameStatesWithoutSelectedDisk() {
    let gameStates = ['']
    for (let i = 0; i < 4; i++) {
      const newGameStates: string[] = []
      gameStates.forEach((state) => {
        newGameStates.push(state + 'a')
        newGameStates.push(state + 'b')
        newGameStates.push(state + 'c')
      })
      gameStates = newGameStates
    }
    return gameStates
  }

  function gameStatesWithSelectedDisks() {
    const states = gameStatesWithoutSelectedDisk()
    const selectionStates = new Set<string>()

    states.forEach((state) => {
      ['a', 'b', 'c'].forEach((peg) => {
        if (canSelectFromPeg(state, peg)) {
          selectionStates.add(selectTopDisk(state, peg))
        }
      })
    })

    return [...states, ...selectionStates]
  }

  const staticParams = gameStatesWithSelectedDisks().map((state) => ({
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

// Helper functions for generateStaticParams
function canSelectFromPeg(state: string, pegChar: string) {
  // Check if the peg has any disks
  return state.includes(pegChar)
}

function selectTopDisk(state: string, pegChar: string) {
  // Find the first occurrence (smallest/topmost disk) and replace with 's'
  const firstIndex = state.indexOf(pegChar)
  return state.substring(0, firstIndex) + "s" + state.substring(firstIndex + 1)
}

export default async function GameStatePage({ params }: PageProps) {
  const { state } = await params

  // Updated validation - ensure state is 1-7 characters and only contains a, b, c, s
  const isValidState = state.length === 4 && /^[abcs]+$/.test(state)

  if (!isValidState) {
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
          <TowerOfHanoiGame
            state={state}
            baseUrl="/game/"
          />
        </div>

        <Rules />
      </main>
    </div>
  )
}
