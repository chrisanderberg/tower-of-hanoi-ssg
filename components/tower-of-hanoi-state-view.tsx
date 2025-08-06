import { calculateGameLayout, diskColors } from "../lib/game-layout"

interface TowerOfHanoiStateViewProps {
  gameState: string
  size?: number
  xOffset?: number
  yOffset?: number
  xCenter?: number
  yCenter?: number
}

export default function TowerOfHanoiStateView({ gameState, size = 250, xOffset = 0, yOffset = 0, xCenter, yCenter}: TowerOfHanoiStateViewProps) {
  const layout = calculateGameLayout(size, xOffset, yOffset, xCenter, yCenter, gameState)
  const diskStrokeColor = "#d1d5db"

  return (
    <>
      {/* Pegs (z-index 10) */}
      <rect
        x={layout.pegXPositions[0] - layout.pegWidth / 2}
        y={layout.baseY - layout.pegHeight}
        width={layout.pegWidth}
        height={layout.pegHeight}
        fill="#4b5563"
        rx={layout.pegRadius}
        ry={layout.pegRadius}
      />
      <rect
        x={layout.pegXPositions[1] - layout.pegWidth / 2}
        y={layout.baseY - layout.pegHeight}
        width={layout.pegWidth}
        height={layout.pegHeight}
        fill="#4b5563"
        rx={layout.pegRadius}
        ry={layout.pegRadius}
      />
      <rect
        x={layout.pegXPositions[2] - layout.pegWidth / 2}
        y={layout.baseY - layout.pegHeight}
        width={layout.pegWidth}
        height={layout.pegHeight}
        fill="#4b5563"
        rx={layout.pegRadius}
        ry={layout.pegRadius}
      />

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
      {/* Disk 1 */}
      <rect
        x={layout.diskPositions[1].x - layout.diskWidths[1] / 2}
        y={layout.diskPositions[1].y}
        width={layout.diskWidths[1]}
        height={layout.diskHeight}
        fill={diskColors[1]}
        stroke={diskStrokeColor}
        strokeWidth={layout.diskStrokeWidth}
        rx={layout.diskCornerRadius}
      />
      <text
        x={layout.diskPositions[1].x}
        y={layout.diskPositions[1].y + layout.diskHeight * 0.55}
        textAnchor="middle"
        fontSize={layout.diskNumberFontSize}
        fill="white"
        fontWeight="bold"
        dominantBaseline="middle"
      >
        1
      </text>

      {/* Disk 2 */}
      <rect
        x={layout.diskPositions[2].x - layout.diskWidths[2] / 2}
        y={layout.diskPositions[2].y}
        width={layout.diskWidths[2]}
        height={layout.diskHeight}
        fill={diskColors[2]}
        stroke={diskStrokeColor}
        strokeWidth={layout.diskStrokeWidth}
        rx={layout.diskCornerRadius}
      />
      <text
        x={layout.diskPositions[2].x}
        y={layout.diskPositions[2].y + layout.diskHeight * 0.55}
        textAnchor="middle"
        fontSize={layout.diskNumberFontSize}
        fill="white"
        fontWeight="bold"
        dominantBaseline="middle"
      >
        2
      </text>

      {/* Disk 3 */}
      <rect
        x={layout.diskPositions[3].x - layout.diskWidths[3] / 2}
        y={layout.diskPositions[3].y}
        width={layout.diskWidths[3]}
        height={layout.diskHeight}
        fill={diskColors[3]}
        stroke={diskStrokeColor}
        strokeWidth={layout.diskStrokeWidth}
        rx={layout.diskCornerRadius}
      />
      <text
        x={layout.diskPositions[3].x}
        y={layout.diskPositions[3].y + layout.diskHeight * 0.55}
        textAnchor="middle"
        fontSize={layout.diskNumberFontSize}
        fill="white"
        fontWeight="bold"
        dominantBaseline="middle"
      >
        3
      </text>

      {/* Disk 4 */}
      <rect
        x={layout.diskPositions[4].x - layout.diskWidths[4] / 2}
        y={layout.diskPositions[4].y}
        width={layout.diskWidths[4]}
        height={layout.diskHeight}
        fill={diskColors[4]}
        stroke={diskStrokeColor}
        strokeWidth={layout.diskStrokeWidth}
        rx={layout.diskCornerRadius}
      />
      <text
        x={layout.diskPositions[4].x}
        y={layout.diskPositions[4].y + layout.diskHeight * 0.55}
        textAnchor="middle"
        fontSize={layout.diskNumberFontSize}
        fill="white"
        fontWeight="bold"
        dominantBaseline="middle"
      >
        4
      </text>
    </>
  )
} 