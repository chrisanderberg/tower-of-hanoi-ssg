import { diskColors } from "@/lib/game-layout"
import { calculatePossibleMoves, generateAllStates } from "@/lib/game-logic"
import TowerOfHanoiStateNode from "./tower-of-hanoi-state-node"
import { SIERPINSKI_VECTORS, SIERPINSKI_SCALE } from "@/lib/constants"

interface TowerOfHanoiStateGraphProps {
  baseUrl: string
}

const nodeSize = 120
const graphPadding = 50

function calculateNodePosition(state: string, diskNum: number, vecA: {x: number, y: number}, vecB: {x: number, y: number}, vecC: {x: number, y: number}) {
  let pos = {x: 0, y: 0}
  if (diskNum === 0) {
    return pos
  }

  const peg = state[diskNum - 1]

  if (peg === 'a') {
    pos = calculateNodePosition(state, diskNum - 1, vecA, vecC, vecB)
    pos.x += vecA.x
    pos.y += vecA.y
  } else if (peg === 'b') {
    pos = calculateNodePosition(state, diskNum - 1, vecC, vecB, vecA)
    pos.x += vecB.x
    pos.y += vecB.y
  } else if (peg === 'c') {
    pos = calculateNodePosition(state, diskNum - 1, vecB, vecA, vecC)
    pos.x += vecC.x
    pos.y += vecC.y
  }

  return {x: pos.x / 2, y: pos.y / 2}
}

// Calculate node positions in Sierpinski triangle layout
function calculateNodePositions(states: string[]) {
  const positions: { [key: string]: { x: number; y: number } } = {}
  
  states.forEach((state, index) => {
    const pos = calculateNodePosition(state, 4, SIERPINSKI_VECTORS.vecA, SIERPINSKI_VECTORS.vecB, SIERPINSKI_VECTORS.vecC)
    positions[state] = {x: SIERPINSKI_SCALE * pos.x, y: SIERPINSKI_SCALE * pos.y}
  })
  
  return positions
}

export default function TowerOfHanoiStateGraph({ baseUrl }: TowerOfHanoiStateGraphProps) {
  const allStates = generateAllStates()
  const nodePositions = calculateNodePositions(allStates)
  
  // Calculate graph dimensions
  const minX = Math.min(...Object.values(nodePositions).map(pos => pos.x)) - nodeSize / 2 - graphPadding
  const minY = Math.min(...Object.values(nodePositions).map(pos => pos.y)) - nodeSize / 2 - graphPadding
  const maxX = Math.max(...Object.values(nodePositions).map(pos => pos.x)) + nodeSize / 2 + graphPadding
  const maxY = Math.max(...Object.values(nodePositions).map(pos => pos.y)) + nodeSize / 2 + graphPadding
  
  const viewBox = `${minX} ${minY} ${maxX-minX} ${maxY-minY}`
  
  // Generate edges (connections between states) with disk color information
  const edges: Array<{ 
    from: string; 
    to: string; 
    fromPos: { x: number; y: number }; 
    toPos: { x: number; y: number };
    diskNumber: number;
    color: string;
  }> = []
  
  allStates.forEach(state => {
    const moves = calculatePossibleMoves(state)
    
    moves.forEach(move => {
      if (nodePositions[move.toState]) {
        edges.push({
          from: move.fromState,
          to: move.toState,
          fromPos: nodePositions[move.fromState],
          toPos: nodePositions[move.toState],
          diskNumber: move.diskNumber,
          color: diskColors[move.diskNumber as keyof typeof diskColors]
        })
      }
    })
  })

  console.log(edges)

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8 w-full max-w-6xl mx-auto">
      <div className="flex justify-center">
        <svg viewBox={viewBox} className="w-full h-auto">
          {/* Edges (connections between states) */}
          {edges.map((edge, index) => (
            <line
              key={`edge-${index}`}
              x1={edge.fromPos.x}
              y1={edge.fromPos.y}
              x2={edge.toPos.x}
              y2={edge.toPos.y}
              stroke={edge.color}
              strokeWidth={8}
              opacity={0.8}
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
                xCenter={pos.x}
                yCenter={pos.y}
                baseUrl={baseUrl}
              />
            )
          })}
        </svg>
      </div>
    </div>
  )
} 