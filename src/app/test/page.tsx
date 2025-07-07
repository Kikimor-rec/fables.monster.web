export default function TestPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-6xl font-bold mb-6 font-mono tracking-wider text-white">
        TAILWIND TEST
      </h1>
      <p className="text-xl text-gray-300 mb-8 font-mono">
        Testing Tailwind CSS styles
      </p>
      <div className="bg-red-700 text-white px-8 py-4 inline-block font-mono font-bold border border-red-600 hover:bg-red-600 transition-colors">
        TEST BUTTON
      </div>
      <div className="mt-8 bg-gray-900 border border-red-700 p-6">
        <h2 className="text-2xl font-bold text-white mb-4 font-mono">Test Section</h2>
        <p className="text-gray-300 font-mono">
          If you can see this styled with dark background, red accents, and monospace font, Tailwind is working correctly.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-black border border-red-700 p-4">
            <h3 className="text-red-400 font-mono font-bold">Card 1</h3>
            <p className="text-gray-300 font-mono text-sm">Content here</p>
          </div>
          <div className="bg-black border border-red-700 p-4">
            <h3 className="text-red-400 font-mono font-bold">Card 2</h3>
            <p className="text-gray-300 font-mono text-sm">Content here</p>
          </div>
          <div className="bg-black border border-red-700 p-4">
            <h3 className="text-red-400 font-mono font-bold">Card 3</h3>
            <p className="text-gray-300 font-mono text-sm">Content here</p>
          </div>
        </div>
      </div>
    </div>
  );
}
