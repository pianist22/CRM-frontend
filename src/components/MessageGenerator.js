// "use client";
// import React, { useState } from "react";


// const MessageGenerator = ({ onSelect }) => {
//   const [prompt, setPrompt] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const deepseekApiKey = process.env.NEXT_PUBLIC_DEEPSEEK_AI_API_KEY;

//   const handleGenerate = async () => {
//     if (!prompt.trim()) return;
//     setLoading(true);

//     try {
//       const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//         method: "POST",
//         headers: {
//           "Authorization": "Bearer " + deepseekApiKey, // Replace with actual API Key", // Replace with actual API Key
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           "model": "deepseek/deepseek-r1:free",
//           "messages": [
//             {
//               "role": "user",
//               "content": `Generate 3 short, friendly marketing messages for this campaign goal:\n"${prompt}". Keep each under 200 characters.`,
//             },
//           ],
//         }),
//       });

//       const data = await res.json();
//       const text = data.choices[0].message.content;
//       const messages = text.split(/\n\d+\.\s*/).filter(Boolean); // Splitting into an array

//       setSuggestions(messages);
//     } catch (err) {
//       console.error("Error fetching suggestions:", err);
//       alert("Failed to generate suggestions");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-gray-50 p-4 rounded-lg shadow mb-6">
//       <h3 className="text-lg font-semibold mb-2">💡 AI-Powered Message Suggestions</h3>
//       <input
//         type="text"
//         className="w-full p-2 border border-gray-300 rounded mb-2"
//         placeholder="Enter campaign goal..."
//         value={prompt}
//         onChange={(e) => setPrompt(e.target.value)}
//       />
//       <button
//         onClick={handleGenerate}
//         disabled={loading}
//         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//       >
//         {loading ? "Generating..." : "Generate Suggestions"}
//       </button>

//       <div className="mt-4 space-y-2">
//         {suggestions.map((text, index) => (
//           <div key={index} className="bg-white p-3 border rounded flex justify-between items-center">
//             <p className="text-sm text-gray-800">{text}</p>
//             <button
//               onClick={() => onSelect(text)}
//               className="text-blue-600 text-sm underline ml-4"
//             >
//               Use
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MessageGenerator;

"use client";
import React, { useState } from "react";

const MessageGenerator = ({ onSelect }) => {
  const [prompt, setPrompt] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const deepseekApiKey = process.env.NEXT_PUBLIC_DEEPSEEK_AI_API_KEY; // Ensure it's in .env.local

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${deepseekApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "model": "deepseek/deepseek-r1:free",
          "messages": [
            {
              "role": "user",
              "content": `Generate 3 short, friendly marketing messages for this campaign goal:\n"${prompt}". Keep each under 200 characters.`,
            },
          ],
        }),
      });

      const data = await res.json();
      
      // Handle potential errors in API response
      if (!data.choices || data.choices.length === 0) {
        throw new Error("No response from DeepSeek AI");
      }

      const text = data.choices[0].message.content;
      const messages = text.split(/\n\d+\.\s*/).filter(Boolean); 

      setSuggestions(messages);
    } catch (err) {
      console.error("Error fetching suggestions:", err);
      alert("Failed to generate suggestions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow mb-6">
      <h3 className="text-lg font-semibold mb-2">💡 AI-Powered Message Suggestions</h3>
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded mb-2"
        placeholder="Enter campaign goal..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Generating..." : "Generate Suggestions"}
      </button>

      <div className="mt-4 space-y-2">
        {suggestions.map((text, index) => (
          <div key={index} className="bg-white p-3 border rounded flex justify-between items-center">
            <p className="text-sm text-gray-800">{text}</p>
            <button
              onClick={() => onSelect(text)}
              className="text-blue-600 text-sm underline ml-4"
            >
              Use
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageGenerator;