// UI Constants
export const MOBILE_BREAKPOINT = 768

// Game Constants
export const DEFAULT_GAME_SIZE = 250
export const DEFAULT_NODE_SIZE = 120
export const DEFAULT_GRAPH_PADDING = 50
export const DEFAULT_NODE_SPACING = 200

// Sierpinski Triangle Constants
export const SIERPINSKI_VECTORS = {
  vecA: { x: 0, y: -1 },
  vecB: { x: -Math.cos(Math.PI / 6), y: 0.5 },
  vecC: { x: Math.cos(Math.PI / 6), y: 0.5 }
}
export const SIERPINSKI_SCALE = 1500 