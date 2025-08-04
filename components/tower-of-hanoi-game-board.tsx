import Link from "next/link"
import TowerOfHanoiStateView from "./tower-of-hanoi-state-view"
import { calculateGameLayout } from "../lib/game-layout"
import { calcNextGameStates } from "../lib/game-logic"

interface TowerOfHanoiGameBoardProps {
  state: string
  baseUrl: string
}

const gameSize = 250

export default function TowerOfHanoiGameBoard({ state, baseUrl }: TowerOfHanoiGameBoardProps) {
  const layout = calculateGameLayout(gameSize)
  
  // SVG configuration - only needed in this component
  const svgViewBox = `0 0 ${layout.viewBoxWidth} ${layout.viewBoxHeight * 2}`
  
  const statusTextColors = {
    valid: "#2563eb", // blue-600
    invalid: "#9ca3af" // gray-400
  }

  // Calculate next states and create links
  const { nextStateA, nextStateB, nextStateC } = calcNextGameStates(state)
  const pegLinks = [
    nextStateA ? `${baseUrl}${nextStateA}` : undefined,
    nextStateB ? `${baseUrl}${nextStateB}` : undefined,
    nextStateC ? `${baseUrl}${nextStateC}` : undefined,
  ]

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8 w-full max-w-md sm:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto">
      {/* Game board SVG */}
      <div className="flex justify-center">
        <svg viewBox={svgViewBox} className="w-full h-auto">
          {/* Game configuration (base, pegs, disks) */}
          <TowerOfHanoiStateView gameState={state} size={gameSize} />

          {/* Clickable areas for pegs and status text */}
          {layout.pegXPositions.map((x, index) => {
            const pegLink = pegLinks[index]
            const text = pegLink ? "Click to move" : "Invalid move"
            const textColor = pegLink ? statusTextColors.valid : statusTextColors.invalid

            if (pegLink) {
              return (
                <Link key={`click-${index}`} href={pegLink}>
                  <rect
                    x={x - layout.clickableAreaXOffset}
                    y={layout.baseY - layout.pegHeight - layout.clickableAreaTopYPadding}
                    width={layout.clickableAreaWidth}
                    height={layout.clickableAreaHeight}
                    fill="transparent"
                    stroke="#3b82f6"
                    strokeWidth={1}
                    opacity={0.0}
                    rx={8}
                    ry={8}
                    className="cursor-pointer hover:opacity-80 hover:stroke-blue-600 transition-all"
                  />
                  <text
                    x={x}
                    y={layout.statusTextY}
                    textAnchor="middle"
                    fontSize={layout.statusTextFontSize}
                    fill={textColor}
                    className="cursor-pointer"
                  >
                    {text}
                  </text>
                </Link>
              )
            } else {
              return (
                <g key={`status-text-${index}`}>
                  <text
                    x={x}
                    y={layout.statusTextY}
                    textAnchor="middle"
                    fontSize={layout.statusTextFontSize}
                    fill={textColor}
                  >
                    {text}
                  </text>
                </g>
              )
            }
          })}
        </svg>
      </div>
    </div>
  )
} 