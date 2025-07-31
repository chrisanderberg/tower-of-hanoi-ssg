import Navigation from "@/components/navigation"
import TowerOfHanoiBoard from "@/components/tower-of-hanoi-game"
import Rules from "@/components/rules"

export default function HomePage() {
  // Example state with a selected disk - disk 3 is selected (floating)
  const defaultState = "aaaa"

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Tower of Hanoi</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A classic puzzle game where you move disks between pegs. The goal is to move all disks from peg A to peg C,
            following the rules.
          </p>
        </div>

        <div className="flex justify-center">
          <TowerOfHanoiBoard state={defaultState} baseUrl="/game/" />
        </div>

        <Rules />
      </main>
    </div>
  )
}
