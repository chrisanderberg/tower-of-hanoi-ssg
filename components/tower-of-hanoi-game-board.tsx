import Link from "next/link"
import TowerOfHanoiStateView from "./tower-of-hanoi-state-view"
import { calculateGameLayout } from "@/lib/game-layout"
import { calculatePossibleMoves } from "@/lib/game-logic"

interface TowerOfHanoiGameBoardProps {
  state: string
  baseUrl: string
}

const gameSize = 250
const buttonHeight = 20
const buttonSpacing = 2

export default function TowerOfHanoiGameBoard({ state, baseUrl }: TowerOfHanoiGameBoardProps) {
  const layout = calculateGameLayout(gameSize)
  
  // Calculate possible moves
  const possibleMoves = calculatePossibleMoves(state)

  // Always reserve space for 3 buttons to maintain consistent view box height
  const maxButtons = 3
  const totalButtonHeight = maxButtons * buttonHeight + (maxButtons - 1) * buttonSpacing
  const svgViewBox = `0 0 ${layout.viewBoxWidth} ${totalButtonHeight + 2 + layout.viewBoxHeight}`

  // Create descriptive move descriptions
  const getMoveDescription = (move: any) => {
    return `Move disk ${move.diskNumber} from peg ${move.fromPeg.toUpperCase()} to peg ${move.toPeg.toUpperCase()}`
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8 w-full max-w-md sm:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto">
      {/* Game board SVG */}
      <div className="flex justify-center">
        <svg viewBox={svgViewBox} className="w-full h-auto">
          {/* Move buttons as SVG elements */}
          {possibleMoves.map((move, index) => {
            const buttonY = 2 + index * (buttonHeight + buttonSpacing)
            
            return (
              <Link key={`move-${index}`} href={`${baseUrl}${move.toState}`}>
                <g className="cursor-pointer">
                  {/* Button background */}
                  <rect
                    x={layout.baseX}
                    y={buttonY}
                    width={layout.baseWidth}
                    height={buttonHeight}
                    fill="#3b82f6"
                    rx={8}
                    ry={8}
                    className="hover:fill-blue-600 transition-colors"
                  />
                  
                  {/* Button text */}
                  <text
                    x={layout.baseX + layout.baseWidth / 2}
                    y={buttonY + buttonHeight / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white"
                    fontSize={10}
                    fontWeight="medium"
                    className="pointer-events-none"
                  >
                    {getMoveDescription(move)}
                  </text>
                </g>
              </Link>
            )
          })}
          
          {/* Game configuration (base, pegs, disks) */}
          <TowerOfHanoiStateView gameState={state} size={gameSize} yOffset={totalButtonHeight + 2} />
        </svg>
      </div>
    </div>
  )
} 