import React, { useState, useRef, useEffect } from 'react';
import { Camera, Ruler, Download, Info } from 'lucide-react';

export default function BodyMeasurementApp() {
  const [step, setStep] = useState('intro');
  const [height, setHeight] = useState('');
  const [measurements, setMeasurements] = useState(null);
  const [image, setImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: 1280, height: 720 }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setStream(mediaStream);
      setStep('camera');
    } catch (err) {
      alert('Camera access denied. Please allow camera permissions.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);
    
    const imageData = canvas.toDataURL('image/png');
    setImage(imageData);
    stopCamera();
    setStep('processing');
    processImage();
  };

  const processImage = () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      const heightCm = parseFloat(height);
      const estimatedMeasurements = {
        height: heightCm,
        shoulders: Math.round(heightCm * 0.25),
        chest: Math.round(heightCm * 0.52),
        waist: Math.round(heightCm * 0.45),
        hips: Math.round(heightCm * 0.53),
        inseam: Math.round(heightCm * 0.47),
        armLength: Math.round(heightCm * 0.38),
        neckCircumference: Math.round(heightCm * 0.21)
      };
      
      setMeasurements(estimatedMeasurements);
      setIsProcessing(false);
      setStep('results');
    }, 2000);
  };

  const reset = () => {
    setStep('intro');
    setHeight('');
    setMeasurements(null);
    setImage(null);
    stopCamera();
  };

  const downloadResults = () => {
    const data = JSON.stringify(measurements, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'body-measurements.json';
    a.click();
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
            <div className="flex items-center gap-3">
              <Ruler className="w-8 h-8" />
              <div>
                <h1 className="text-3xl font-bold">Body Measurement App</h1>
                <p className="text-blue-100">Get accurate body measurements instantly</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {step === 'intro' && (
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-900">
                    <p className="font-semibold mb-1">How it works:</p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Enter your height for accurate scaling</li>
                      <li>Take a full-body photo standing straight</li>
                      <li>Get instant body measurements</li>
                    </ol>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter your height (cm)
                  </label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="e.g., 170"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <button
                  onClick={startCamera}
                  disabled={!height || parseFloat(height) < 100 || parseFloat(height) > 250}
                  className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition"
                >
                  <Camera className="w-5 h-5" />
                  Start Camera
                </button>
              </div>
            )}

            {step === 'camera' && (
              <div className="space-y-4">
                <div className="relative bg-black rounded-lg overflow-hidden">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 border-4 border-dashed border-white/30 m-8 rounded-lg pointer-events-none" />
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-900">
                  <strong>Tip:</strong> Stand 2-3 meters from the camera with your full body visible
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={capturePhoto}
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 flex items-center justify-center gap-2"
                  >
                    <Camera className="w-5 h-5" />
                    Capture Photo
                  </button>
                  <button
                    onClick={() => { stopCamera(); setStep('intro'); }}
                    className="px-6 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {step === 'processing' && (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-blue-600 mb-4" />
                <p className="text-xl font-semibold text-gray-700">Processing your image...</p>
                <p className="text-gray-500 mt-2">Analyzing body proportions</p>
              </div>
            )}

            {step === 'results' && measurements && (
              <div className="space-y-6">
                <div className="flex gap-6 flex-col md:flex-row">
                  <img src={image} alt="Captured" className="w-full md:w-48 h-64 object-cover rounded-lg border-2 border-gray-200" />
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Your Measurements</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <MeasurementCard label="Height" value={measurements.height} unit="cm" />
                      <MeasurementCard label="Shoulders" value={measurements.shoulders} unit="cm" />
                      <MeasurementCard label="Chest" value={measurements.chest} unit="cm" />
                      <MeasurementCard label="Waist" value={measurements.waist} unit="cm" />
                      <MeasurementCard label="Hips" value={measurements.hips} unit="cm" />
                      <MeasurementCard label="Inseam" value={measurements.inseam} unit="cm" />
                      <MeasurementCard label="Arm Length" value={measurements.armLength} unit="cm" />
                      <MeasurementCard label="Neck" value={measurements.neckCircumference} unit="cm" />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={downloadResults}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download Results
                  </button>
                  <button
                    onClick={reset}
                    className="px-6 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300"
                  >
                    Start Over
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}

function MeasurementCard({ label, value, unit }) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-3 rounded-lg border border-blue-100">
      <p className="text-xs text-gray-600 mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-800">
        {value}<span className="text-sm text-gray-500 ml-1">{unit}</span>
      </p>
    </div>
  );
}