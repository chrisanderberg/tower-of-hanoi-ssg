interface GameConfigurationProps {
  gameState: string
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
const viewBoxWidth = 250
const viewBoxHeight = 120

const pegSpacing = 60
const pegXPositions = [viewBoxWidth / 2 - pegSpacing, viewBoxWidth / 2, viewBoxWidth / 2 + pegSpacing] // Fixed x positions for pegs A, B, C
const diskHeight = 12
const diskSpacing = 2
const diskNumberFontSize = 10
const pegHeight = (diskHeight + diskSpacing) * 4 + 10 // Height to hold 4 disks + a little extra
const pegWidth = 4
const pegRadius = 2
const baseY = 98 // Y-coordinate for the top of the base / bottom of the pegs
const selectedDiskY = 5
const selectedDiskX = viewBoxWidth / 2

// Base configuration
const baseWidth = 200
const baseHeight = 8
const baseRadius = 4
const baseX = (viewBoxWidth - baseWidth) / 2

// Disk positioning calculations
const diskGapFromBase = 5
const diskBottomY = baseY - 4 - diskGapFromBase // (baseY - 4) - 5
const diskCenterOffset = diskHeight / 2
const diskSpacingOffset = diskHeight / 4
const diskStrokeColor = "#d1d5db"
const diskStrokeWidth = 1
const diskCornerRadius = 6

// SVG configuration
const svgViewBox = `0 0 ${viewBoxWidth} ${viewBoxHeight}`

export default function GameConfiguration({ gameState }: GameConfigurationProps) {
  // Parse state into disk positions
  const diskPositions: { [key: number]: "a" | "b" | "c" | "s" } = {}
  for (let i = 0; i < 4; i++) {
    const diskNumber = i + 1
    const location = gameState[i] as "a" | "b" | "c" | "s"
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
    <>
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
    </>
  )
} 