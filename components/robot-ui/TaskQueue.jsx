// docs/components/robot-ui/TaskQueue.jsx

import React from 'react';
import { useRobotCommands } from './RobotCommandContext';

export function TaskQueue() {
  const { state } = useRobotCommands();

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Task Queue</h3>
      <div className="space-y-2">
        {state.tasks.map((task, index) => (
          <div 
            key={index}
            className="p-2 bg-white shadow rounded flex justify-between items-center"
          >
            <span>{task.command}</span>
            <span className="text-sm text-gray-500">{task.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
