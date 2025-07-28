import Navigation from "@/components/navigation"

export default function ExplanationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">How This Site Works: A Static Tower of Hanoi</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Understanding the architecture and implementation of this static site.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Architecture Overview</h2>
            <div className="space-y-4 text-gray-600">
              <p className="leading-relaxed">
                [Placeholder for detailed explanation of the site's architecture, including how Next.js SSG is used to
                pre-generate all possible game states and create a fully static experience.]
              </p>
              <p className="leading-relaxed">
                [Placeholder for explanation of component structure, state management approach, and how the game board
                renders different configurations.]
              </p>
              <p className="leading-relaxed">
                [Placeholder for discussion of performance benefits of static generation and how it enables fast loading
                times for all game states.]
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Technical Implementation</h2>
            <div className="space-y-4 text-gray-600">
              <p className="leading-relaxed">
                [Placeholder for technical details about the React components, prop structure, and rendering logic.]
              </p>
              <p className="leading-relaxed">
                [Placeholder for explanation of the disksByPegs data structure and how it drives the visual
                representation.]
              </p>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Code Example</h3>
              <div className="bg-gray-100 rounded-lg p-4 border">
                <pre className="text-sm text-gray-700">
                  <code>
                    {`// Placeholder for code example showing how disksByPegs prop works
const gameState = [
  ['disk3', 'disk2', 'disk1'], // Peg A
  [],                          // Peg B  
  []                           // Peg C
]

<TowerOfHanoiBoard disksByPegs={gameState} />`}
                  </code>
                </pre>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Static Site Generation Benefits</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Performance</h3>
                <p className="text-gray-600 leading-relaxed">
                  [Placeholder for explanation of how SSG provides instant loading times and optimal performance.]
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Scalability</h3>
                <p className="text-gray-600 leading-relaxed">
                  [Placeholder for discussion of how static generation scales effortlessly with CDN distribution.]
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Future Enhancements</h2>
            <div className="space-y-4 text-gray-600">
              <p className="leading-relaxed">
                [Placeholder for discussion of potential features like interactive gameplay, state graph visualization,
                and algorithm demonstrations.]
              </p>
              <p className="leading-relaxed">
                [Placeholder for explanation of how the current architecture supports these future enhancements.]
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
