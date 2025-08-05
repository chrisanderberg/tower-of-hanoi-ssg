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

// Disk widths used across components
export const diskWidths = {
  1: 30,
  2: 40,
  3: 50,
  4: 60,
}

export function calculateGameLayout(size: number, xOffset: number = 0, yOffset: number = 0, xCenter?: number, yCenter?: number): GameLayout {
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
  }
} 