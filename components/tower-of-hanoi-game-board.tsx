import Link from "next/link"
import TowerOfHanoiStateView from "./tower-of-hanoi-state-view"
import { calculateGameLayout } from "../lib/game-layout"
import { calculatePossibleMoves } from "../lib/game-logic"

interface TowerOfHanoiGameBoardProps {
  state: string
  baseUrl: string
}

const gameSize = 250

export default function TowerOfHanoiGameBoard({ state, baseUrl }: TowerOfHanoiGameBoardProps) {
  const layout = calculateGameLayout(gameSize)
  
  // SVG configuration - only needed in this component
  const svgViewBox = `0 0 ${layout.viewBoxWidth} ${layout.viewBoxHeight * 2}`
  
  // Calculate possible moves
  const possibleMoves = calculatePossibleMoves(state)

  // Create descriptive move descriptions
  const getMoveDescription = (move: any) => {
    return `Move disk ${move.diskNumber} from peg ${move.fromPeg.toUpperCase()} to peg ${move.toPeg.toUpperCase()}`
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8 w-full max-w-md sm:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto">
      {/* Game board SVG */}
      <div className="flex justify-center">
        <svg viewBox={svgViewBox} className="w-full h-auto">
          {/* Game configuration (base, pegs, disks) */}
          <TowerOfHanoiStateView gameState={state} size={gameSize} />
        </svg>
      </div>

      {/* Move buttons */}
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {possibleMoves.map((move, index) => (
          <Link key={`move-${index}`} href={`${baseUrl}${move.toState}`}>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
              {getMoveDescription(move)}
            </button>
          </Link>
        ))}
      </div>
    </div>
  )
} 