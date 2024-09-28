import React, { useState } from "react";
import axios from "axios";
import './App.css'; // Optional: For custom styles

function App() {
  const [input, setInput] = useState("");
  const [tokens, setTokens] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);  // Add loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Set loading state to true
    try {
      const result = await axios.post("http://localhost:5000/chat", {
        prompt: input,
        size: tokens,
      });
      setResponse(result.data.response);
    } catch (error) {
      console.error("Error response:", error.response); // Log the full error response
      setResponse("An error occurred while fetching the response.");
    } finally {
      setLoading(false);  // Reset loading state
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Chatbot</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Your Input:
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Number of Tokens:
            <input
              type="number"
              value={tokens}
              onChange={(e) => setTokens(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit" disabled={loading}>Send</button> {/* Disable button while loading */}
      </form>
      {loading && <p>Loading...</p>} {/* Show loading indicator */}
      {response && (
        <div>
          <h2>Response:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default App;
