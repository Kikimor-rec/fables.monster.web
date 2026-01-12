import { useState, useCallback } from "react";

export interface DiceRollerState {
  selectedRow: number | null;
  isRolling: boolean;
  isExpanded: boolean;
}

export function useDiceRoller() {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const rollDice = useCallback((maxValue: number) => {
    setIsRolling(true);

    let iterations = 0;
    const maxIterations = 12;
    const interval = setInterval(() => {
      const randomValue = Math.floor(Math.random() * maxValue) + 1;
      setSelectedRow(randomValue);
      iterations++;

      if (iterations >= maxIterations) {
        clearInterval(interval);
        setIsRolling(false);
      }
    }, 60);
  }, []);

  const toggleExpanded = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  return {
    selectedRow,
    isRolling,
    isExpanded,
    rollDice,
    toggleExpanded,
  };
}
