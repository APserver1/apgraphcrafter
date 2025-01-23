import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ParsedData } from '../types/DataTypes';
import { ChartSettings } from '../types/SettingsTypes';
import { AnimatedCounter } from './AnimatedCounter';
import { calculateBarWidth, calculateBarHeight } from '../utils/barCalculations';
import { calculateImageSize } from '../utils/imageCalculations';
import { calculateLabelSize } from '../utils/labelCalculations';

interface BarChartProps {
  data: ParsedData;
  currentIndex: number;
  barSettings: ChartSettings['bars'];
  margins: ChartSettings['margins'];
  valueSettings: ChartSettings['values'];
  imageSettings: ChartSettings['images'];
  labelSettings: ChartSettings['labels'];
  animations: ChartSettings['animations'];
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  currentIndex,
  barSettings,
  margins,
  valueSettings,
  imageSettings,
  labelSettings,
  animations,
}) => {
  if (!data) return null;

  const sortedData = [...data.data]
    .sort((a, b) => b.values[currentIndex] - a.values[currentIndex])
    .slice(0, barSettings.maxCount);

  const maxValue = Math.max(...sortedData.map(item => item.values[currentIndex]));
  const totalBars = barSettings.keepSpacing ? barSettings.maxCount : sortedData.length;

  const baseBarSpacing = barSettings.spacing;
  const availableHeight = 600 - margins.top - margins.bottom;
  const barHeight = Math.floor((availableHeight - (Math.max(0, baseBarSpacing) * (totalBars - 1))) / totalBars);

  const displayBars = barSettings.keepSpacing
    ? Array(totalBars).fill(null).map((_, i) => sortedData[i] || null)
    : sortedData;

  const getPosition = (index: number): number => {
    if (barSettings.useCustomSpacing) {
      let position = 0;
      for (let i = 0; i < index; i++) {
        position += barHeight + (barSettings.customSpacing[i] ?? barSettings.spacing);
      }
      return position;
    }
    return index * (barHeight + barSettings.spacing);
  };

  const getTransition = () => {
    if (animations.barJump === 'smooth') {
      return {
        type: "spring",
        duration: animations.jumpDuration,
        bounce: 0.2
      };
    }
    return {
      duration: 0
    };
  };

  const calculateBorderWidth = (index: number): number => {
    if (!imageSettings.border.descendingWidth) {
      return imageSettings.border.width;
    }
    const position = Math.min(index, 9) / 9;
    const reductionFactor = 1 - ((1 - imageSettings.border.widthRatio) * position);
    return Math.max(1, Math.floor(imageSettings.border.width * reductionFactor));
  };

  const calculateBorderSpacing = (index: number): number => {
    if (!imageSettings.border.descendingSpacing) {
      return imageSettings.border.spacing;
    }
    const position = Math.min(index, 9) / 9;
    const reductionFactor = 1 - ((1 - imageSettings.border.spacingRatio) * position);
    return Math.max(0, Math.floor(imageSettings.border.spacing * reductionFactor));
  };

  const renderImage = (item: ParsedData['data'][0], imageSize: { width: string; height: string }, index: number) => {
    if (!imageSettings.border.enabled) {
      return (
        <img
          src={item.image}
          alt={item.label}
          className="rounded-full flex-shrink-0"
          style={imageSize}
        />
      );
    }

    const borderWidth = calculateBorderWidth(index);
    const borderSpacing = calculateBorderSpacing(index);
    const totalSize = {
      width: `${parseInt(imageSize.width) + (borderWidth + borderSpacing) * 2}px`,
      height: `${parseInt(imageSize.height) + (borderWidth + borderSpacing) * 2}px`
    };

    return (
      <div 
        className="relative flex-shrink-0" 
        style={totalSize}
      >
        <div 
          className="absolute inset-0 rounded-full"
          style={{ 
            border: `${borderWidth}px solid ${item.color}`,
            opacity: 0.9
          }}
        />
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            padding: `${borderWidth + borderSpacing}px`
          }}
        >
          <img
            src={item.image}
            alt={item.label}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </div>
    );
  };

  return (
    <div 
      className="w-full h-full overflow-hidden"
      style={{
        padding: `${margins.top}px ${margins.right}px ${margins.bottom}px ${margins.left}px`
      }}
    >
      <div className="relative h-full">
        <AnimatePresence>
          {displayBars.map((item, index) => {
            if (!item) {
              return (
                <motion.div
                  key={`empty-${index}`}
                  className="absolute left-0 right-0"
                  style={{
                    top: getPosition(index),
                    height: barHeight
                  }}
                />
              );
            }

            const percentage = (item.values[currentIndex] / maxValue) * 100;
            const barWidth = calculateBarWidth(
              item.values[currentIndex],
              maxValue,
              index,
              barSettings.descendingWidth,
              barSettings.descendingRatio
            );
            const currentBarHeight = calculateBarHeight(
              barHeight,
              index,
              barSettings.descendingHeight,
              barSettings.heightRatio
            );
            const topPosition = getPosition(index);
            const imageSize = calculateImageSize(index, imageSettings.size, imageSettings);
            const fontSize = calculateLabelSize(index, labelSettings.size, labelSettings);

            const roundedStyle = barSettings.roundedCorners?.enabled
              ? { borderRadius: `0 ${barSettings.roundedCorners.radius}px ${barSettings.roundedCorners.radius}px 0` }
              : {};

            return (
              <motion.div
                key={item.label}
                className="absolute left-0 right-0"
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  top: topPosition,
                  height: currentBarHeight,
                }}
                transition={getTransition()}
                style={{
                  top: topPosition,
                  height: currentBarHeight,
                }}
              >
                <div className="relative w-full h-full flex items-center">
                  {labelSettings.position === 'behind' && (
                    <div 
                      className="absolute right-full top-1/2 -translate-y-1/2 flex items-center whitespace-nowrap"
                      style={{ 
                        marginRight: `${labelSettings.spacing}px`,
                        color: labelSettings.invisible ? 'transparent' : labelSettings.color,
                        fontFamily: labelSettings.fontFamily,
                        fontSize: `${fontSize}px`,
                      }}
                    >
                      {imageSettings.position === 'behind' && renderImage(item, imageSize, index)}
                      {item.label}
                    </div>
                  )}

                  <div className="relative flex-1 h-full flex items-center">
                    <motion.div
                      className="relative bg-opacity-90"
                      style={{ 
                        backgroundColor: item.color,
                        width: barWidth,
                        height: currentBarHeight,
                        minWidth: '2%',
                        ...roundedStyle
                      }}
                      initial={{ width: '0%' }}
                      animate={{ width: barWidth }}
                      transition={getTransition()}
                    >
                      {labelSettings.position === 'inside' && (
                        <div
                          className="absolute left-2 top-1/2 -translate-y-1/2 whitespace-nowrap"
                          style={{
                            color: labelSettings.invisible ? 'transparent' : labelSettings.color,
                            fontFamily: labelSettings.fontFamily,
                            fontSize: `${fontSize}px`,
                          }}
                        >
                          {item.label}
                        </div>
                      )}
                    </motion.div>

                    <motion.div
                      className="absolute top-1/2 -translate-y-1/2 flex items-center gap-2"
                      style={{ 
                        left: `calc(${percentage}% + ${imageSettings.position === 'front' ? imageSettings.spacing : 0}px)`,
                      }}
                      initial={{ left: '0%' }}
                      animate={{ left: `calc(${percentage}% + ${imageSettings.position === 'front' ? imageSettings.spacing : 0}px)` }}
                      transition={getTransition()}
                    >
                      {imageSettings.position === 'front' && renderImage(item, imageSize, index)}

                      {valueSettings.showAtEnd && (
                        <div 
                          className="font-bold whitespace-nowrap"
                          style={{ color: valueSettings.color }}
                        >
                          <AnimatedCounter 
                            value={item.values[currentIndex]} 
                            animationType={barSettings.animationType}
                          />
                        </div>
                      )}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};