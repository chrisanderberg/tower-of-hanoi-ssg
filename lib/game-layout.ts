export interface GameLayout {
  // Basic dimensions
  viewBoxWidth: number
  viewBoxHeight: number
  scale: number
  
  // Peg configuration
  pegSpacing: number
  pegXPositions: number[]
  pegHeight: number
  pegWidth: number
  pegRadius: number
  
  // Disk configuration
  diskHeight: number
  diskSpacing: number
  diskNumberFontSize: number
  diskStrokeWidth: number
  diskCornerRadius: number
  diskWidths: { [key: number]: number }
  diskPositions: { [key: number]: { x: number; y: number } }
  
  // Base configuration
  baseY: number
  baseWidth: number
  baseHeight: number
  baseRadius: number
  baseX: number
  
  // Disk positioning
  diskGapFromBase: number
  diskBottomY: number
  diskCenterOffset: number
  diskSpacingOffset: number
}

// Disk colors used across components
export const diskColors = {
  1: "#ef4444", // red
  2: "#eab308", // yellow
  3: "#22c55e", // green
  4: "#3b82f6", // blue
}



export function calculateGameLayout(size: number, xOffset: number = 0, yOffset: number = 0, xCenter?: number, yCenter?: number, gameState?: string): GameLayout {
  const scale = size / 250
  
  // Calculate offsets from center if both xOffset and yOffset are 0 and center coordinates are provided
  let finalXOffset = xOffset
  let finalYOffset = yOffset
  
  if (xOffset === 0 && yOffset === 0) {
    if (xCenter !== undefined) {
      finalXOffset = xCenter - size / 2
    }
    if (yCenter !== undefined) {
      finalYOffset = yCenter - (120 * scale) / 2
    }
  }
  
  const viewBoxWidth = size
  const viewBoxHeight = 120 * scale
  
  const pegSpacing = 65 * scale
  const pegXPositions = [
    viewBoxWidth / 2 - pegSpacing + finalXOffset, 
    viewBoxWidth / 2 + finalXOffset, 
    viewBoxWidth / 2 + pegSpacing + finalXOffset
  ]
  const diskHeight = 12 * scale
  const diskSpacing = 2 * scale
  const diskNumberFontSize = 10 * scale
  const pegHeight = (diskHeight + diskSpacing) * 4 + 10 * scale
  const pegWidth = 4 * scale
  const pegRadius = 2 * scale
  const baseY = 98 * scale + finalYOffset
  
  const baseWidth = 200 * scale
  const baseHeight = 8 * scale
  const baseRadius = 4 * scale
  const baseX = (viewBoxWidth - baseWidth) / 2 + finalXOffset
  
  const diskGapFromBase = 5 * scale
  const diskBottomY = baseY - 4 * scale - diskGapFromBase
  const diskCenterOffset = diskHeight / 2
  const diskSpacingOffset = diskHeight / 4
  const diskStrokeWidth = 1 * scale
  const diskCornerRadius = 6 * scale
  
  // Disk widths scaled by the layout scale
  const diskWidths = {
    1: 30 * scale,
    2: 40 * scale,
    3: 50 * scale,
    4: 60 * scale,
  }
  
  // Calculate disk positions if game state is provided
  const diskPositions: { [key: number]: { x: number; y: number } } = {}
  
  if (gameState) {
    // Parse state into disk positions
    const diskPegs: { [key: number]: "a" | "b" | "c" } = {}
    for (let i = 0; i < 4; i++) {
      const diskNumber = i + 1
      const location = gameState[i] as "a" | "b" | "c"
      diskPegs[diskNumber] = location
    }

    // Calculate disk positions for each peg
    const pegA: number[] = []
    const pegB: number[] = []
    const pegC: number[] = []
    const pegs = [pegA, pegB, pegC]

    for (let i = 1; i <= 4; i++) {
      const location = diskPegs[i]
      if (location === "a") pegA.push(i)
      else if (location === "b") pegB.push(i)
      else if (location === "c") pegC.push(i)
    }

    // Sort so larger disks are at bottom
    pegA.sort((a, b) => b - a)
    pegB.sort((a, b) => b - a)
    pegC.sort((a, b) => b - a)

    // Calculate position for each disk
    for (let diskNum = 1; diskNum <= 4; diskNum++) {
      const location = diskPegs[diskNum]
      const pegIndex = location === "a" ? 0 : location === "b" ? 1 : 2
      const pegDisks = pegs[pegIndex]
      const diskIndexOnPeg = pegDisks.indexOf(diskNum)

      // Calculate Y position so the bottom of the disk sits with a gap from the base
      const diskCenterY = diskBottomY - diskCenterOffset - diskIndexOnPeg * (diskHeight + diskSpacing) - diskSpacingOffset

      diskPositions[diskNum] = {
        x: pegXPositions[pegIndex],
        y: diskCenterY,
      }
    }
  }
  
  return {
    viewBoxWidth,
    viewBoxHeight,
    scale,
    pegSpacing,
    pegXPositions,
    pegHeight,
    pegWidth,
    pegRadius,
    diskHeight,
    diskSpacing,
    diskNumberFontSize,
    diskStrokeWidth,
    diskCornerRadius,
    baseY,
    baseWidth,
    baseHeight,
    baseRadius,
    baseX,
    diskGapFromBase,
    diskBottomY,
    diskCenterOffset,
    diskSpacingOffset,
    diskWidths,
    diskPositions,
  }
} 