// docs/components/robot-ui/RobotCommandContext.jsx

import React, { createContext, useContext, useReducer } from 'react';

const RobotCommandContext = createContext();

const initialState = {
  tasks: [],
  robotStatus: {
    battery: 100,
    position: { x: 0, y: 0 },
    currentTask: null,
    errors: []
  },
  constraints: {
    maxWeight: 20,
    maxDistance: 10,
    minBattery: 20
  }
};

function robotReducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      };
    case 'UPDATE_STATUS':
      return {
        ...state,
        robotStatus: {
          ...state.robotStatus,
          ...action.payload
        }
      };
    case 'SET_ERROR':
      return {
        ...state,
        robotStatus: {
          ...state.robotStatus,
          errors: [...state.robotStatus.errors, action.payload]
        }
      };
    default:
      return state;
  }
}

export function RobotCommandProvider({ children }) {
  const [state, dispatch] = useReducer(robotReducer, initialState);
  return (
    <RobotCommandContext.Provider value={{ state, dispatch }}>
      {children}
    </RobotCommandContext.Provider>
  );
}

export function useRobotCommands() {
  return useContext(RobotCommandContext);
}
