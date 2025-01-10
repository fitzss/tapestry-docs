// docs/components/robot-ui/RobotVisualization.jsx

import React from 'react';
import { useRobotCommands } from './RobotCommandContext';

export function RobotVisualization() {
  const { state } = useRobotCommands();
  const { robotStatus } = state;

  return (
    <div className="w-full h-64 bg-gray-100 rounded-lg p-4">
      <div className="flex justify-between mb-4">
        <div className="text-sm">
          Battery: {robotStatus.battery}%
        </div>
        <div className="text-sm">
          Position: ({robotStatus.position.x}, {robotStatus.position.y})
        </div>
      </div>
      <div className="relative w-full h-40 border border-gray-300 rounded">
        <div 
          className="absolute w-8 h-8 bg-blue-500 rounded-full"
          style={{
            left: `${(robotStatus.position.x / 10) * 100}%`,
            top: `${(robotStatus.position.y / 10) * 100}%`
          }}
        />
      </div>
    </div>
  );
}
