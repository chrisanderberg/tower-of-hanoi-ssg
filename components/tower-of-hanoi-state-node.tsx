import Link from "next/link"
import TowerOfHanoiStateView from "./tower-of-hanoi-state-view"

interface TowerOfHanoiStateNodeProps {
  state: string
  nodeSize: number
  xOffset: number
  yOffset: number
  xCenter?: number
  yCenter?: number
  baseUrl: string
}

export default function TowerOfHanoiStateNode({ state, nodeSize, xOffset = 0, yOffset = 0, xCenter, yCenter, baseUrl }: TowerOfHanoiStateNodeProps) {
  // Calculate offsets from center if both xOffset and yOffset are 0 and center coordinates are provided
  let finalXOffset = xOffset
  let finalYOffset = yOffset
  
  if (xOffset === 0 && yOffset === 0) {
    if (xCenter !== undefined) {
      finalXOffset = xCenter - nodeSize / 2
    }
    if (yCenter !== undefined) {
      finalYOffset = yCenter - nodeSize / 2
    }
  }
  return (
    <g key={`node-${state}`}>
      {/* Node background circle */}
      <circle
        cx={finalXOffset + nodeSize / 2}
        cy={finalYOffset + nodeSize / 2}
        r={nodeSize / 2 + 10}
        fill="white"
        stroke="#e2e8f0"
        strokeWidth={2}
      />
      
      {/* Game state visualization */}
      <TowerOfHanoiStateView 
        gameState={state} 
        size={nodeSize}
        xCenter={finalXOffset + nodeSize / 2}
        yCenter={finalYOffset + nodeSize / 2}
      />
      
      {/* Clickable link area */}
      <Link href={`${baseUrl}${state}`}>
        <circle
          cx={finalXOffset + nodeSize / 2}
          cy={finalYOffset + nodeSize / 2}
          r={nodeSize / 2 + 10}
          fill="transparent"
          stroke="#3b82f6"
          strokeWidth={3}
          opacity={0.1}
          className="cursor-pointer hover:opacity-80 hover:stroke-blue-600 transition-all"
        />
      </Link>
    </g>
  )
}