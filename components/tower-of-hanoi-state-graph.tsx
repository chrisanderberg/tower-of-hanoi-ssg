import Link from "next/link"
import TowerOfHanoiStateView from "./tower-of-hanoi-state-view"
import { calculateGameLayout } from "../lib/game-layout"
import { calcNextGameStates, generateAllStates } from "../lib/game-logic"
import TowerOfHanoiStateNode from "./tower-of-hanoi-state-node"

interface TowerOfHanoiStateGraphProps {
  baseUrl: string
}

const nodeSize = 120
const nodeSpacing = 200
const graphPadding = 50

// Calculate node positions in a grid layout
function calculateNodePositions(states: string[]) {
  const positions: { [key: string]: { x: number; y: number } } = {}
  const cols = Math.ceil(Math.sqrt(states.length))
  const rows = Math.ceil(states.length / cols)
  
  states.forEach((state, index) => {
    const col = index % cols
    const row = Math.floor(index / cols)
    positions[state] = {
      x: graphPadding + col * nodeSpacing,
      y: graphPadding + row * nodeSpacing
    }
  })
  
  return positions
}

export default function TowerOfHanoiStateGraph({ baseUrl }: TowerOfHanoiStateGraphProps) {
  const allStates = generateAllStates()
  const nodePositions = calculateNodePositions(allStates)
  
  // Calculate graph dimensions
  const maxX = Math.max(...Object.values(nodePositions).map(pos => pos.x)) + nodeSize + graphPadding
  const maxY = Math.max(...Object.values(nodePositions).map(pos => pos.y)) + nodeSize + graphPadding
  
  const viewBox = `0 0 ${maxX} ${maxY}`
  
  // Generate edges (connections between states)
  const edges: Array<{ from: string; to: string; fromPos: { x: number; y: number }; toPos: { x: number; y: number } }> = []
  
  allStates.forEach(state => {
    const { nextStateA, nextStateB, nextStateC } = calcNextGameStates(state)
    const nextStates = [nextStateA, nextStateB, nextStateC].filter(Boolean) as string[]
    
    nextStates.forEach(nextState => {
      if (nodePositions[nextState]) {
        edges.push({
          from: state,
          to: nextState,
          fromPos: nodePositions[state],
          toPos: nodePositions[nextState]
        })
      }
    })
  })

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8 w-full max-w-6xl mx-auto">
      <div className="flex justify-center">
        <svg viewBox={viewBox} className="w-full h-auto">
          {/* Edges (connections between states) */}
          {edges.map((edge, index) => (
            <line
              key={`edge-${index}`}
              x1={edge.fromPos.x + nodeSize / 2}
              y1={edge.fromPos.y + nodeSize / 2}
              x2={edge.toPos.x + nodeSize / 2}
              y2={edge.toPos.y + nodeSize / 2}
              stroke="#94a3b8"
              strokeWidth={1}
              opacity={0.6}
            />
          ))}
          
          {/* State nodes */}
          {allStates.map((state) => {
            const pos = nodePositions[state]
            
            return (
              <TowerOfHanoiStateNode
                key={`node-${state}`}
                state={state}
                nodeSize={nodeSize}
                xOffset={pos.x}
                yOffset={pos.y}
                baseUrl={baseUrl}
              />
            )
          })}
        </svg>
      </div>
    </div>
  )
} 