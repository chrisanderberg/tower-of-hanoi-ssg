import Link from "next/link"

interface TowerOfHanoiBoardProps {
  state: string
  linkA?: string
  linkB?: string
  linkC?: string
}

const diskColors = {
  1: "#ef4444", // red
  2: "#eab308", // yellow
  3: "#22c55e", // green
  4: "#3b82f6", // blue
}

const diskWidths = {
  1: 30,
  2: 40,
  3: 50,
  4: 60,
}

export default function TowerOfHanoiBoard({ state, linkA, linkB, linkC }: TowerOfHanoiBoardProps) {
  const pegLinks = [linkA, linkB, linkC]

  // Parse state into disk positions
  const diskPositions: { [key: number]: "a" | "b" | "c" | "s" } = {}
  for (let i = 0; i < 4; i++) {
    const diskNumber = i + 1
    const location = state[i] as "a" | "b" | "c" | "s"
    diskPositions[diskNumber] = location
  }

  // Calculate disk positions for each peg
  const pegA: number[] = []
  const pegB: number[] = []
  const pegC: number[] = []
  const selected: number[] = []

  for (let i = 1; i <= 4; i++) {
    const location = diskPositions[i]
    if (location === "a") pegA.push(i)
    else if (location === "b") pegB.push(i)
    else if (location === "c") pegC.push(i)
    else if (location === "s") selected.push(i)
  }

  // Sort so larger disks are at bottom
  pegA.sort((a, b) => b - a)
  pegB.sort((a, b) => b - a)
  pegC.sort((a, b) => b - a)

  const pegs = [pegA, pegB, pegC]
  const pegXPositions = [55, 125, 195] // Fixed x positions for pegs A, B, C
  const diskHeight = 12
  const diskSpacing = 2
  const pegHeight = (diskHeight + diskSpacing) * 4 + 10 // Height to hold 4 disks + a little extra
  const baseY = 98 // Y-coordinate for the top of the base / bottom of the pegs

  // Calculate disk positions
  const getDiskPosition = (diskNum: number) => {
    const location = diskPositions[diskNum]

    if (location === "s") {
      // Selected disk floats above
      return { x: 125, y: 5 }
    }

    const pegIndex = location === "a" ? 0 : location === "b" ? 1 : 2
    const pegDisks = pegs[pegIndex]
    const diskIndexOnPeg = pegDisks.indexOf(diskNum)

    // Calculate Y position so the bottom of the disk sits with a 5px gap from the base
    // Top of base is at baseY - 4. We want bottom of disk at (baseY - 4) - 5 = baseY - 9.
    // Center of disk (pos.y) should be (baseY - 9) - (diskHeight / 2) = baseY - 9 - 6 = baseY - 15.
    const diskCenterY = baseY - 15 - diskIndexOnPeg * (diskHeight + diskSpacing) - diskHeight / 4

    return {
      x: pegXPositions[pegIndex],
      y: diskCenterY,
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8 w-full max-w-md sm:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto">
      {/* Game board SVG */}
      <div className="flex justify-center">
        <svg viewBox="0 0 250 120" className="w-full h-auto">
          {/* Pegs (z-index 10) */}
          {pegXPositions.map((x, index) => (
            <rect
              key={`peg-${index}`}
              x={x - 2}
              y={baseY - pegHeight}
              width="4"
              height={pegHeight}
              fill="#4b5563"
              rx="2"
              ry="2"
            />
          ))}

          {/* Base (z-index 20) */}
          <rect x="15" y={baseY - 4} width="220" height="8" fill="#374151" rx="4" ry="4" />

          {/* Disks (z-index 30) */}
          {[1, 2, 3, 4].map((diskNum) => {
            const pos = getDiskPosition(diskNum)
            const width = diskWidths[diskNum as keyof typeof diskWidths]
            const color = diskColors[diskNum as keyof typeof diskColors]

            return (
              <g key={`disk-${diskNum}`}>
                <rect
                  x={pos.x - width / 2}
                  y={pos.y} // Use diskHeight / 2 for rect y
                  width={width}
                  height={diskHeight}
                  fill={color}
                  stroke="#d1d5db"
                  strokeWidth="1"
                  rx="6"
                />
                <text
                  x={pos.x}
                  y={pos.y + diskHeight * 0.55} // Text y is already the center of the disk
                  textAnchor="middle"
                  fontSize="10"
                  fill="white"
                  fontWeight="bold"
                  dominantBaseline="middle" // Align text middle with y coordinate
                >
                  {diskNum}
                </text>
              </g>
            )
          })}

          {/* Clickable areas for pegs and status text */}
          {pegXPositions.map((x, index) => {
            const pegLink = pegLinks[index]
            const text = pegLink ? "Click to move" : "Invalid move"
            const textColor = pegLink ? "#2563eb" : "#9ca3af" // blue-600 or gray-400

            if (pegLink) {
              return (
                <Link key={`click-${index}`} href={pegLink}>
                  <rect
                    x={x - 40}
                    y={baseY - pegHeight - 20} // Start above pegs
                    width="80"
                    height={pegHeight + 40} // Extend to cover text below base
                    fill="transparent" // Make it invisible
                    className="cursor-pointer" // Keep cursor for interactivity
                  />
                  <text
                    x={x}
                    y={baseY + 20} // Position below the base
                    textAnchor="middle"
                    fontSize="6" // Scaled to 60% (from 10 to 6)
                    fill={textColor}
                    className="cursor-pointer" // Ensure text also shows pointer
                  >
                    {text}
                  </text>
                </Link>
              )
            } else {
              return (
                <g key={`status-text-${index}`}>
                  <text
                    x={x}
                    y={baseY + 20} // Position below the base
                    textAnchor="middle"
                    fontSize="6" // Scaled to 60% (from 10 to 6)
                    fill={textColor}
                  >
                    {text}
                  </text>
                </g>
              )
            }
          })}
        </svg>
      </div>
    </div>
  )
}
