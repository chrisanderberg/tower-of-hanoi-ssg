import Link from "next/link"

interface TowerOfHanoiBoardProps {
  state: string
  baseUrl: string
}

const diskColors = {
  1: "#ef4444", // red
  2: "#eab308", // yellow
  3: "#22c55e", // green
  4: "#3b82f6", // blue
}

const diskWidths = {
  1: 30,
  2: 40,
  3: 50,
  4: 60,
}

// Layout configuration
const pegXPositions = [65, 125, 185] // Fixed x positions for pegs A, B, C
const diskHeight = 12
const diskSpacing = 2
const diskNumberFontSize = 10
const pegHeight = (diskHeight + diskSpacing) * 4 + 10 // Height to hold 4 disks + a little extra
const pegWidth = 4
const pegRadius = 2
const baseY = 98 // Y-coordinate for the top of the base / bottom of the pegs
const selectedDiskY = 5
const selectedDiskX = 125

// Base configuration
const baseX = 25
const baseWidth = 200
const baseHeight = 8
const baseRadius = 4

// Disk positioning calculations
const diskGapFromBase = 5
const diskBottomY = baseY - 4 - diskGapFromBase // (baseY - 4) - 5
const diskCenterOffset = diskHeight / 2
const diskSpacingOffset = diskHeight / 4

// Clickable area configuration
const clickableAreaWidth = 60
const clickableAreaHeight = pegHeight + 40
const clickableAreaYOffset = 20
const clickableAreaXOffset = clickableAreaWidth / 2

// Text configuration
const statusTextY = baseY + 20
const statusTextFontSize = 6
const statusTextColors = {
  valid: "#2563eb", // blue-600
  invalid: "#9ca3af" // gray-400
}

// SVG configuration
const svgViewBox = "0 0 250 120"
const diskStrokeColor = "#d1d5db"
const diskStrokeWidth = 1
const diskCornerRadius = 6

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

export default function TowerOfHanoiBoard({ state, baseUrl }: TowerOfHanoiBoardProps) {
  // Calculate next states and create links
  const { nextStateA, nextStateB, nextStateC } = calcNextGameStates(state)
  const pegLinks = [
    nextStateA ? `${baseUrl}${nextStateA}` : undefined,
    nextStateB ? `${baseUrl}${nextStateB}` : undefined,
    nextStateC ? `${baseUrl}${nextStateC}` : undefined,
  ]

  // Parse state into disk positions
  const diskPositions: { [key: number]: "a" | "b" | "c" | "s" } = {}
  for (let i = 0; i < 4; i++) {
    const diskNumber = i + 1
    const location = state[i] as "a" | "b" | "c" | "s"
    diskPositions[diskNumber] = location
  }

  // Calculate disk positions for each peg
  const pegA: number[] = []
  const pegB: number[] = []
  const pegC: number[] = []
  const pegs = [pegA, pegB, pegC]
  const selected: number[] = []

  for (let i = 1; i <= 4; i++) {
    const location = diskPositions[i]
    if (location === "a") pegA.push(i)
    else if (location === "b") pegB.push(i)
    else if (location === "c") pegC.push(i)
    else if (location === "s") selected.push(i)
  }

  // Sort so larger disks are at bottom
  pegA.sort((a, b) => b - a)
  pegB.sort((a, b) => b - a)
  pegC.sort((a, b) => b - a)

  // Calculate disk positions
  const getDiskPosition = (diskNum: number) => {
    const location = diskPositions[diskNum]

    if (location === "s") {
      // Selected disk floats above
      return { x: selectedDiskX, y: selectedDiskY }
    }

    const pegIndex = location === "a" ? 0 : location === "b" ? 1 : 2
    const pegDisks = pegs[pegIndex]
    const diskIndexOnPeg = pegDisks.indexOf(diskNum)

    // Calculate Y position so the bottom of the disk sits with a gap from the base
    const diskCenterY = diskBottomY - diskCenterOffset - diskIndexOnPeg * (diskHeight + diskSpacing) - diskSpacingOffset

    return {
      x: pegXPositions[pegIndex],
      y: diskCenterY,
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8 w-full max-w-md sm:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto">
      {/* Game board SVG */}
      <div className="flex justify-center">
        <svg viewBox={svgViewBox} className="w-full h-auto">
          {/* Pegs (z-index 10) */}
          {pegXPositions.map((x, index) => (
            <rect
              key={`peg-${index}`}
              x={x - pegWidth / 2}
              y={baseY - pegHeight}
              width={pegWidth}
              height={pegHeight}
              fill="#4b5563"
              rx={pegRadius}
              ry={pegRadius}
            />
          ))}

          {/* Base (z-index 20) */}
          <rect 
            x={baseX} 
            y={baseY - baseHeight / 2} 
            width={baseWidth} 
            height={baseHeight} 
            fill="#374151" 
            rx={baseRadius} 
            ry={baseRadius} 
          />

          {/* Disks (z-index 30) */}
          {[1, 2, 3, 4].map((diskNum) => {
            const pos = getDiskPosition(diskNum)
            const width = diskWidths[diskNum as keyof typeof diskWidths]
            const color = diskColors[diskNum as keyof typeof diskColors]

            return (
              <g key={`disk-${diskNum}`}>
                <rect
                  x={pos.x - width / 2}
                  y={pos.y}
                  width={width}
                  height={diskHeight}
                  fill={color}
                  stroke={diskStrokeColor}
                  strokeWidth={diskStrokeWidth}
                  rx={diskCornerRadius}
                />
                <text
                  x={pos.x}
                  y={pos.y + diskHeight * 0.55} // Text y is already the center of the disk
                  textAnchor="middle"
                  fontSize={diskNumberFontSize}
                  fill="white"
                  fontWeight="bold"
                  dominantBaseline="middle" // Align text middle with y coordinate
                >
                  {diskNum}
                </text>
              </g>
            )
          })}

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
