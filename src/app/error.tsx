"use client";


export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-xl md:text-3xl font-bold text-red-600">Something went wrong!</h1>
      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Try Again
      </button>
    </div>
  );
}
