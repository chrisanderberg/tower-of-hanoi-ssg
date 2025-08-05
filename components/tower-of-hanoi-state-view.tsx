import { calculateGameLayout, diskColors, diskWidths } from "../lib/game-layout"

interface TowerOfHanoiStateViewProps {
  gameState: string
  size?: number
  xOffset?: number
  yOffset?: number
  xCenter?: number
  yCenter?: number
}

export default function TowerOfHanoiStateView({ gameState, size = 250, xOffset = 0, yOffset = 0, xCenter, yCenter}: TowerOfHanoiStateViewProps) {
  const layout = calculateGameLayout(size, xOffset, yOffset, xCenter, yCenter)
  const diskStrokeColor = "#d1d5db"

  // Parse state into disk positions
  const diskPositions: { [key: number]: "a" | "b" | "c" } = {}
  for (let i = 0; i < 4; i++) {
    const diskNumber = i + 1
    const location = gameState[i] as "a" | "b" | "c"
    diskPositions[diskNumber] = location
  }

  // Calculate disk positions for each peg
  const pegA: number[] = []
  const pegB: number[] = []
  const pegC: number[] = []
  const pegs = [pegA, pegB, pegC]

  for (let i = 1; i <= 4; i++) {
    const location = diskPositions[i]
    if (location === "a") pegA.push(i)
    else if (location === "b") pegB.push(i)
    else if (location === "c") pegC.push(i)
  }

  // Sort so larger disks are at bottom
  pegA.sort((a, b) => b - a)
  pegB.sort((a, b) => b - a)
  pegC.sort((a, b) => b - a)

  // Calculate disk positions
  const getDiskPosition = (diskNum: number) => {
    const location = diskPositions[diskNum]
    const pegIndex = location === "a" ? 0 : location === "b" ? 1 : 2
    const pegDisks = pegs[pegIndex]
    const diskIndexOnPeg = pegDisks.indexOf(diskNum)

    // Calculate Y position so the bottom of the disk sits with a gap from the base
    const diskCenterY = layout.diskBottomY - layout.diskCenterOffset - diskIndexOnPeg * (layout.diskHeight + layout.diskSpacing) - layout.diskSpacingOffset

    return {
      x: layout.pegXPositions[pegIndex],
      y: diskCenterY,
    }
  }

  return (
    <>
      {/* Pegs (z-index 10) */}
      {layout.pegXPositions.map((x, index) => (
        <rect
          key={`peg-${index}`}
          x={x - layout.pegWidth / 2}
          y={layout.baseY - layout.pegHeight}
          width={layout.pegWidth}
          height={layout.pegHeight}
          fill="#4b5563"
          rx={layout.pegRadius}
          ry={layout.pegRadius}
        />
      ))}

      {/* Base (z-index 20) */}
      <rect 
        x={layout.baseX} 
        y={layout.baseY - layout.baseHeight / 2} 
        width={layout.baseWidth} 
        height={layout.baseHeight} 
        fill="#374151" 
        rx={layout.baseRadius} 
        ry={layout.baseRadius} 
      />

      {/* Disks (z-index 30) */}
      {[1, 2, 3, 4].map((diskNum) => {
        const pos = getDiskPosition(diskNum)
        const width = diskWidths[diskNum as keyof typeof diskWidths] * layout.scale
        const color = diskColors[diskNum as keyof typeof diskColors]

        return (
          <g key={`disk-${diskNum}`}>
            <rect
              x={pos.x - width / 2}
              y={pos.y}
              width={width}
              height={layout.diskHeight}
              fill={color}
              stroke={diskStrokeColor}
              strokeWidth={layout.diskStrokeWidth}
              rx={layout.diskCornerRadius}
            />
            <text
              x={pos.x}
              y={pos.y + layout.diskHeight * 0.55} // Text y is already the center of the disk
              textAnchor="middle"
              fontSize={layout.diskNumberFontSize}
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