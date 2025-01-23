import React from 'react';
import { ChartSettings, BarJumpType } from '../../types/SettingsTypes';

interface AnimationSettingsProps {
  settings: ChartSettings['animations'];
  onSettingsChange: (updates: Partial<ChartSettings['animations']>) => void;
}

export const AnimationSettings: React.FC<AnimationSettingsProps> = ({
  settings,
  onSettingsChange,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tipo de Animación
        </label>
        <select
          value={settings.barJump}
          onChange={(e) => onSettingsChange({ barJump: e.target.value as BarJumpType })}
          className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        >
          <option value="instant">Instantánea</option>
          <option value="smooth">Salto Suave</option>
        </select>
      </div>

      {settings.barJump === 'smooth' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Duración de la animación (segundos)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0.1"
              max="2"
              step="0.1"
              value={settings.jumpDuration}
              onChange={(e) => onSettingsChange({ jumpDuration: parseFloat(e.target.value) })}
              className="flex-1"
            />
            <span className="text-sm text-gray-500 w-16 text-right">
              {settings.jumpDuration.toFixed(1)}s
            </span>
          </div>
        </div>
      )}
    </div>
  );
};