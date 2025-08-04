// Game state validation
export function isValidGameState(state: string): boolean {
  return state.length === 4 && /^[abcs]+$/.test(state)
}

// Calculate next possible game states from current state
export function calcNextGameStates(state: string) {
  const selectedIndex = state.indexOf("s")
  const hasSelectedDisk = selectedIndex !== -1

  if (hasSelectedDisk) {
    // A disk is selected - try to place it on each peg
    const nextStateA = canPlaceOnPeg(state, selectedIndex, "a") ? state.replace("s", "a") : undefined
    const nextStateB = canPlaceOnPeg(state, selectedIndex, "b") ? state.replace("s", "b") : undefined
    const nextStateC = canPlaceOnPeg(state, selectedIndex, "c") ? state.replace("s", "c") : undefined

    return { nextStateA, nextStateB, nextStateC }
  } else {
    // No disk selected - try to select the top disk from each peg
    const nextStateA = canSelectFromPeg(state, "a") ? selectTopDisk(state, "a") : undefined
    const nextStateB = canSelectFromPeg(state, "b") ? selectTopDisk(state, "b") : undefined
    const nextStateC = canSelectFromPeg(state, "c") ? selectTopDisk(state, "c") : undefined

    return { nextStateA, nextStateB, nextStateC }
  }
}

// Check if a disk can be placed on a specific peg
export function canPlaceOnPeg(state: string, selectedIndex: number, pegChar: string) {
  // Check if there's a smaller disk (to the left of selected disk) on the target peg
  const leftPart = state.substring(0, selectedIndex)
  return !leftPart.includes(pegChar)
}

// Check if a disk can be selected from a specific peg
export function canSelectFromPeg(state: string, pegChar: string) {
  // Check if the peg has any disks
  return state.includes(pegChar)
}

// Select the top disk from a specific peg
export function selectTopDisk(state: string, pegChar: string) {
  // Find the first occurrence (smallest/topmost disk) and replace with 's'
  const firstIndex = state.indexOf(pegChar)
  return state.substring(0, firstIndex) + "s" + state.substring(firstIndex + 1)
}

// Generate all possible game states for 4 disks
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

// Generate game states without selected disks (for static generation)
export function gameStatesWithoutSelectedDisk(): string[] {
  let gameStates = ['']
  for (let i = 0; i < 4; i++) {
    const newGameStates: string[] = []
    gameStates.forEach((state) => {
      newGameStates.push(state + 'a')
      newGameStates.push(state + 'b')
      newGameStates.push(state + 'c')
    })
    gameStates = newGameStates
  }
  return gameStates
}

// Generate game states with selected disks (for static generation)
export function gameStatesWithSelectedDisks(): string[] {
  const states = gameStatesWithoutSelectedDisk()
  const selectionStates = new Set<string>()

  states.forEach((state) => {
    ['a', 'b', 'c'].forEach((peg) => {
      if (canSelectFromPeg(state, peg)) {
        selectionStates.add(selectTopDisk(state, peg))
      }
    })
  })

  return [...states, ...selectionStates]
} 