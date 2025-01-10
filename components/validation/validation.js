// docs/components/validation/validation.js

export const commandPatterns = {
  MOVE: /move\s+to\s+\(?\s*(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)\s*\)?/i,
  LIFT: /lift\s+(\d+\.?\d*)\s*kg/i,
  ROTATE: /rotate\s+(-?\d+\.?\d*)\s*degrees?/i
};

export function validateCommand(command, constraints) {
  // Check move command
  const moveMatch = command.match(commandPatterns.MOVE);
  if (moveMatch) {
    const [_, x, y] = moveMatch;
    const distance = Math.sqrt(x * x + y * y);
    
    if (distance > constraints.maxDistance) {
      return {
        valid: false,
        error: `Distance ${distance.toFixed(2)}m exceeds maximum of ${constraints.maxDistance}m`
      };
    }
  }

  // Check lift command
  const liftMatch = command.match(commandPatterns.LIFT);
  if (liftMatch) {
    const weight = parseFloat(liftMatch[1]);
    if (weight > constraints.maxWeight) {
      return {
        valid: false,
        error: `Weight ${weight}kg exceeds maximum of ${constraints.maxWeight}kg`
      };
    }
  }

  return { valid: true };
}
