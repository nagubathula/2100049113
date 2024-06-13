"use client"
import { useState } from 'react';

const API_BASE_URL = 'http://localhost:9876/numbers'; // Adjust if your backend URL is different

type ResultType = {
  numbers: number[];
  windowPrevState: number[];
  windowCurrState: number[];
  avg: number;
};

export default function Home() {
  const [numberType, setNumberType] = useState<string>('');
  const [result, setResult] = useState<ResultType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchNumbers = async () => {
    try {
      setError(null);
      const response = await fetch(`${API_BASE_URL}/${numberType}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data: ResultType = await response.json();
      setResult(data);
    } catch (err) {
      setError('An unexpected error occurred');
      setResult(null);
    }
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <h1 className="text-4xl font-bold mb-8">Average Calculator</h1>
      <div className="mb-6">
        <label className="mr-4">
          Select Number Type:
          <select
            value={numberType}
            onChange={(e) => setNumberType(e.target.value)}
            className="ml-2 p-2 border border-gray-300 rounded"
          >
            <option value="">--Select--</option>
            <option value="e">Even</option>
            <option value="f">Fibonacci</option>
            <option value="p">Primes</option>
            <option value="r">Random</option>
          </select>
        </label>
        <button
          onClick={fetchNumbers}
          disabled={!numberType}
          className="ml-4 p-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Fetch Numbers
        </button>
      </div>
      {error && <p className="text-red-500 mt-4">Error: {error}</p>}
      {result && (
        <div className="text-left mt-6 bg-gray-100 p-6 rounded shadow-md w-1/2">
          <h2 className="text-2xl font-semibold mb-4">Result</h2>
          <p><strong>New Numbers:</strong> {result.numbers.join(', ')}</p>
          <p><strong>Previous Window State:</strong> {result.windowPrevState.join(', ')}</p>
          <p><strong>Current Window State:</strong> {result.windowCurrState.join(', ')}</p>
          <p><strong>Average:</strong> {result.avg}</p>
        </div>
      )}
    </div>
  );
}
