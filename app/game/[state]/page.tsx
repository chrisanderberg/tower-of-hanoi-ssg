import TowerOfHanoiBoard from "@/components/tower-of-hanoi-board"
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

interface NextGameStates {
  stateA?: string
  stateB?: string
  stateC?: string
}

function calcNextGameStates(state: string) {
  const selectedIndex = state.indexOf("s")
  const hasSelectedDisk = selectedIndex !== -1

  if (hasSelectedDisk) {
    // A disk is selected - try to place it on each peg
    const nextStateA = canPlaceOnPeg(state, selectedIndex, "a") ? state.replace("s", "a") : undefined
    const nextStateB = canPlaceOnPeg(state, selectedIndex, "b") ? state.replace("s", "b") : undefined
    const nextStateC = canPlaceOnPeg(state, selectedIndex, "c") ? state.replace("s", "c") : undefined

    return { nextStateA, nextStateB, nextStateC }
  } else {
    // No disk selected - try to select the top disk from each peg
    const nextStateA = canSelectFromPeg(state, "a") ? selectTopDisk(state, "a") : undefined
    const nextStateB = canSelectFromPeg(state, "b") ? selectTopDisk(state, "b") : undefined
    const nextStateC = canSelectFromPeg(state, "c") ? selectTopDisk(state, "c") : undefined

    return { nextStateA, nextStateB, nextStateC }
  }
}

function canPlaceOnPeg(state: string, selectedIndex: number, pegChar: string) {
  // Check if there's a smaller disk (to the left of selected disk) on the target peg
  const leftPart = state.substring(0, selectedIndex)
  return !leftPart.includes(pegChar)
}

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
  const diskCount = state.length
  const { nextStateA, nextStateB, nextStateC } = calcNextGameStates(state)

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
          <TowerOfHanoiBoard
            state={state}
            linkA={nextStateA ? `/game/${nextStateA}` : undefined}
            linkB={nextStateB ? `/game/${nextStateB}` : undefined}
            linkC={nextStateC ? `/game/${nextStateC}` : undefined}
          />
        </div>

        <Rules />
      </main>
    </div>
  )
}
