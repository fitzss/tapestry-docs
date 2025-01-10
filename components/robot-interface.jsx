import React, { useState } from 'react';
import { MessageSquare, Send, AlertTriangle, Check, X, Robot } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const RoboticTaskInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // Simulated constraint checker
  const checkTaskConstraints = (task) => {
    const constraints = {
      'lift_box': {
        maxWeight: 20, // kg
        maxHeight: 1.5, // meters
        batteryRequired: 30 // percent
      },
      'walk_to': {
        maxDistance: 10, // meters
        minBattery: 20, // percent
        clearPath: true
      }
    };

    // Parse task and check against constraints
    if (task.toLowerCase().includes('lift') && task.includes('kg')) {
      const weight = parseInt(task.match(/\d+/)[0]);
      return {
        possible: weight <= constraints.lift_box.maxWeight,
        reason: weight > constraints.lift_box.maxWeight ? 
          `Cannot lift ${weight}kg. Maximum capacity is ${constraints.lift_box.maxWeight}kg` : 
          'Task feasible'
      };
    }

    return { possible: true, reason: 'Basic task feasible' };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check task feasibility
    const feasibility = checkTaskConstraints(input);
    
    // Add user message
    const userMessage = {
      text: input,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };
    
    // Add system response
    const systemMessage = {
      text: feasibility.possible ? 
        `Task accepted: ${input}` :
        `Task not possible: ${feasibility.reason}`,
      sender: 'system',
      status: feasibility.possible ? 'success' : 'error',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages([...messages, userMessage, systemMessage]);
    setInput('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white rounded-lg shadow">
      <div className="flex items-center space-x-2 mb-4">
        <Robot className="w-6 h-6 text-blue-500" />
        <h2 className="text-xl font-bold">Robotic Task Interface</h2>
      </div>

      <div className="mb-4 h-96 overflow-y-auto border rounded-lg p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 flex ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`p-3 rounded-lg max-w-[80%] ${
                msg.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100'
              }`}
            >
              <div className="flex items-center space-x-2">
                {msg.sender === 'system' && (
                  msg.status === 'success' ? 
                    <Check className="w-4 h-4 text-green-500" /> :
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                )}
                <span>{msg.text}</span>
              </div>
              <div className="text-xs mt-1 opacity-70">
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter task command (e.g., 'lift 15kg box', 'walk to point A')"
          className="flex-1 p-2 border rounded"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>

      <Alert className="mt-4">
        <AlertDescription>
          Example commands:
          <ul className="ml-4 mt-2 list-disc">
            <li>lift 15kg box to 1m height</li>
            <li>walk to point A</li>
            <li>rotate 90 degrees</li>
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default RoboticTaskInterface;
