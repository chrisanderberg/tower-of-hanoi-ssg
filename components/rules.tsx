export default function Rules() {
  return (
    <div className="text-center mt-8">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Rules</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Only move one disk at a time</li>
          <li>• Only move the top disk from a peg</li>
          <li>• Never place a larger disk on a smaller one</li>
        </ul>
      </div>
    </div>
  )
}
