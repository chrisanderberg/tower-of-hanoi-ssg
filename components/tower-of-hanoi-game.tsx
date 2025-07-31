import Link from "next/link"
import GameConfiguration from "./game-configuration"

interface TowerOfHanoiGameProps {
  state: string
  baseUrl: string
}

// Layout configuration for interactive elements
const viewBoxWidth = 250
const viewBoxHeight = 120
const pegSpacing = 60
const pegXPositions = [viewBoxWidth / 2 - pegSpacing, viewBoxWidth / 2, viewBoxWidth / 2 + pegSpacing] // Fixed x positions for pegs A, B, C
const diskHeight = 12
const diskSpacing = 2
const pegHeight = (diskHeight + diskSpacing) * 4 + 10 // Height to hold 4 disks + a little extra
const baseY = 98 // Y-coordinate for the top of the base / bottom of the pegs

// Clickable area configuration
const clickableAreaWidth = pegSpacing
const clickableAreaYOffset = 30
const clickableAreaHeight = pegHeight + 2 * clickableAreaYOffset
const clickableAreaXOffset = clickableAreaWidth / 2

// Text configuration
const statusTextY = baseY + 20
const statusTextFontSize = 6
const statusTextColors = {
  valid: "#2563eb", // blue-600
  invalid: "#9ca3af" // gray-400
}

// SVG configuration
const svgViewBox = `0 0 ${viewBoxWidth} ${viewBoxHeight}`

// State calculation functions moved from page component
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

export default function TowerOfHanoiGame({ state, baseUrl }: TowerOfHanoiGameProps) {
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
          <GameConfiguration gameState={state} />

          {/* Clickable areas for pegs and status text */}
          {pegXPositions.map((x, index) => {
            const pegLink = pegLinks[index]
            const text = pegLink ? "Click to move" : "Invalid move"
            const textColor = pegLink ? statusTextColors.valid : statusTextColors.invalid

            if (pegLink) {
              return (
                <Link key={`click-${index}`} href={pegLink}>
                  <rect
                    x={x - clickableAreaXOffset}
                    y={baseY - pegHeight - clickableAreaYOffset}
                    width={clickableAreaWidth}
                    height={clickableAreaHeight}
                    fill="transparent"
                    className="cursor-pointer"
                  />
                  <text
                    x={x}
                    y={statusTextY}
                    textAnchor="middle"
                    fontSize={statusTextFontSize}
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
                    y={statusTextY}
                    textAnchor="middle"
                    fontSize={statusTextFontSize}
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
