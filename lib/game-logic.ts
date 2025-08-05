// Game state validation
export function isValidGameState(state: string): boolean {
  return state.length === 4 && /^[abc]+$/.test(state) // Removed 's' since we no longer use selected states
}

// Calculate all possible moves for a given state
export function calculatePossibleMoves(state: string): Array<{
  fromState: string
  toState: string
  fromPeg: string
  toPeg: string
  diskNumber: number
}> {
  const moves: Array<{
    fromState: string
    toState: string
    fromPeg: string
    toPeg: string
    diskNumber: number
  }> = []

  // Find which disk is on top of each peg
  const pegTopDisks: { [key: string]: number | null } = { a: null, b: null, c: null }
  
  for (let i = 0; i < state.length; i++) {
    const diskNumber = i + 1
    const peg = state[i] as 'a' | 'b' | 'c'
    if (pegTopDisks[peg] === null) {
      pegTopDisks[peg] = diskNumber
    }
  }

  // Disk 1 (smallest) can always move to any other peg
  const disk1Peg = state[0] as 'a' | 'b' | 'c'
  const otherPegs = ['a', 'b', 'c'].filter(peg => peg !== disk1Peg) as Array<'a' | 'b' | 'c'>
  
  otherPegs.forEach(toPeg => {
    const newState = toPeg + state.substring(1)
    moves.push({
      fromState: state,
      toState: newState,
      fromPeg: disk1Peg,
      toPeg: toPeg,
      diskNumber: 1
    })
  })

  // Find the third possible move (involving pegs that don't have disk 1)
  const topDisk1 = pegTopDisks[otherPegs[0]]
  const topDisk2 = pegTopDisks[otherPegs[1]]
  if ((topDisk1 === null && topDisk2 !== null) || (topDisk1 !== null && topDisk2 !== null && topDisk1 > topDisk2)) {
    const newState = state.substring(0, topDisk2 - 1) + otherPegs[0] + state.substring(topDisk2)
    moves.push({
      fromState: state,
      toState: newState,
      fromPeg: otherPegs[1],
      toPeg: otherPegs[0],
      diskNumber: topDisk2
    })
  }
  if ((topDisk1 !== null && topDisk2 === null) || (topDisk1 !== null && topDisk2 !== null && topDisk1 < topDisk2)) {
    const newState = state.substring(0, topDisk1 - 1) + otherPegs[1] + state.substring(topDisk1)
    moves.push({
      fromState: state,
      toState: newState,
      fromPeg: otherPegs[0],
      toPeg: otherPegs[1],
      diskNumber: topDisk1
    })
  }

  console.log(moves)
  return moves
}

export function generateAllStates(): string[] {
  const states: string[] = []
  const pegs = ["a", "b", "c"]
  
  // Generate all possible combinations of disk positions
  for (const disk1 of pegs) {
    for (const disk2 of pegs) {
      for (const disk3 of pegs) {
        for (const disk4 of pegs) {
          states.push(disk1 + disk2 + disk3 + disk4)
        }
      }
    }
  }
  
  return states
}