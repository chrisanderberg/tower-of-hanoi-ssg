import Link from "next/link"
import TowerOfHanoiStateView from "./tower-of-hanoi-state-view"
import { calculateGameLayout, diskColors } from "@/lib/game-layout"
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

  // Get peg index from peg letter
  const getPegIndex = (pegLetter: string) => {
    return pegLetter.toLowerCase() === 'a' ? 0 : pegLetter.toLowerCase() === 'b' ? 1 : 2
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md sm:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto">
      {/* Game board SVG */}
      <div className="flex justify-center">
        <svg viewBox={svgViewBox} className="w-full h-auto">
          {/* Move buttons as SVG elements */}
          {possibleMoves.map((move, index) => {
            const buttonY = 2 + index * (buttonHeight + buttonSpacing)
            const fromPegIndex = getPegIndex(move.fromPeg)
            const toPegIndex = getPegIndex(move.toPeg)
            const fromX = layout.pegXPositions[fromPegIndex]
            const toX = layout.pegXPositions[toPegIndex]
            const arrowY = buttonY + buttonHeight / 4
            const diskColor = diskColors[move.diskNumber as keyof typeof diskColors]
            
            return (
              <Link key={`move-${index}`} href={`${baseUrl}${move.toState}`}>
                <g className="cursor-pointer">
                  {/* Button background */}
                  <rect
                    x={layout.baseX}
                    y={buttonY}
                    width={layout.baseWidth}
                    height={buttonHeight}
                    fill="transparent"
                    stroke="#6b7280"
                    strokeWidth={0.5}
                    rx={8}
                    ry={8}
                    className="hover:stroke-blue-600 transition-colors"
                  />
                  
                  {/* Horizontal line across the board */}
                  <line
                    x1={fromX}
                    y1={arrowY}
                    x2={toX}
                    y2={arrowY}
                    stroke={diskColor}
                    strokeWidth={3}
                    strokeLinecap="round"
                    className="pointer-events-none"
                  />
                  
                  {/* Vertical line below source (pickup) */}
                  <line
                    x1={fromX}
                    y1={arrowY}
                    x2={fromX}
                    y2={buttonY + buttonHeight - 8}
                    stroke={diskColor}
                    strokeWidth={3}
                    strokeLinecap="round"
                    className="pointer-events-none"
                  />
                  
                  {/* Vertical line below destination (placement) */}
                  <line
                    x1={toX}
                    y1={arrowY}
                    x2={toX}
                    y2={buttonY + buttonHeight - 8}
                    stroke={diskColor}
                    strokeWidth={3}
                    strokeLinecap="round"
                    className="pointer-events-none"
                  />
                  
                  {/* Arrow head pointing down at destination */}
                  <polygon
                    points={`${toX - 4},${buttonY + buttonHeight - 8} ${toX},${buttonY + buttonHeight - 4} ${toX + 4},${buttonY + buttonHeight - 8}`}
                    fill={diskColor}
                    className="pointer-events-none"
                  />
                  
                  {/* Disk number centered on horizontal line */}
                  <text
                    x={(fromX + toX) / 2}
                    y={buttonY + buttonHeight - 6}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={diskColor}
                    fontSize={8}
                    fontWeight="bold"
                    className="pointer-events-none"
                  >
                    {move.diskNumber}
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