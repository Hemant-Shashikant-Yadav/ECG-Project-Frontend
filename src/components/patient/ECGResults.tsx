interface ECGResult {
  prediction: string;
  confidence: number;
  signalData: number[][];
  images: string[];
}

interface ECGResultsProps {
  result: ECGResult;
}

export default function ECGResults({ result }: ECGResultsProps) {
  return (
    <div className="space-y-8">
      {/* Prediction Result */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Analysis Result</h3>
        <div className="flex items-center justify-between">
          <p className="text-lg">Prediction: <span className="font-medium">{result.prediction}</span></p>
          <p className="text-lg">Confidence: <span className="font-medium">{result.confidence}%</span></p>
        </div>
      </div>

      {/* ECG Images */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">ECG Visualizations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {result.images.map((image, index) => (
            <div key={index} className="border rounded-lg overflow-hidden">
              <img src={image} alt={`ECG Visualization ${index + 1}`} className="w-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Signal Data */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Signal Data</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {result.signalData.map((signal, index) => (
            <div key={index} className="border rounded p-4">
              <h4 className="font-medium mb-2">Signal {index + 1}</h4>
              <div className="max-h-40 overflow-y-auto">
                {signal.map((value, i) => (
                  <div key={i} className="text-sm text-gray-600">{value.toFixed(4)}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}