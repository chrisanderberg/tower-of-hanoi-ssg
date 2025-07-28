import Link from "next/link"

export default function Navigation() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
            Tower of Hanoi
          </Link>

          <div className="flex space-x-8">
            <Link href="/game/aaaa" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              New Game
            </Link>
            <Link href="/graph" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              State Graph
            </Link>
            <Link href="/explanation" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Explanation
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
