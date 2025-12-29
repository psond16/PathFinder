// src/components/FutureLetter.jsx

export default function FutureLetter({ text, onClose }) {
    return (
      <>
        {/* Blur background */}
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" />
  
        {/* Letter container */}
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="bg-[#fffaf0] max-w-lg w-full p-6 rounded-xl shadow-2xl font-serif relative">
            <h2 className="text-lg font-semibold mb-3">
              A Letter From Your Future Self
            </h2>
  
            <pre className="whitespace-pre-wrap text-sm leading-relaxed text-gray-800">
              {text}
            </pre>
  
            <button
              onClick={onClose}
              className="mt-5 px-4 py-2 bg-black text-white rounded-md text-sm hover:opacity-90"
            >
              Close
            </button>
          </div>
        </div>
      </>
    );
  }
  