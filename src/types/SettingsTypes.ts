// Previous imports...

export type AspectRatio = '1:1' | '3:4' | '5:3' | '16:9';
export type ImagePosition = 'behind' | 'front';
export type LabelPosition = 'behind' | 'inside';
export type BarAnimationType = 'instant' | 'transition';
export type BarJumpType = 'instant' | 'smooth';
export type ImageShape = 'circle' | 'square' | 'rectangle' | 'original' | 'custom';
export type EmptyCellHandling = 'zero' | 'interpolate';
export type EmbeddingPosition = 'front' | 'behind';

export const ASPECT_RATIOS: Record<AspectRatio, number> = {
  '1:1': 1,
  '3:4': 3/4,
  '5:3': 5/3,
  '16:9': 16/9,
};

// Add new interfaces for music embedding
export interface MusicTrack {
  id: string;
  file: File;
  color: string;
  startTime: number;
  duration: number;
  trim: {
    start: number;
    end: number;
  };
}

export interface ChartSettings {
  aspectRatio: AspectRatio;
  margins: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  bars: {
    maxCount: number;
    spacing: number;
    descendingWidth: boolean;
    descendingRatio: number;
    descendingHeight: boolean;
    heightRatio: number;
    keepSpacing: boolean;
    useCustomSpacing: boolean;
    customSpacing: number[];
    animationType: BarAnimationType;
    roundedCorners: {
      enabled: boolean;
      radius: number;
    };
  };
  values: {
    showAtEnd: boolean;
    emptyCellHandling: EmptyCellHandling;
    color: string;
  };
  images: {
    position: ImagePosition;
    size: number;
    spacing: number;
    descendingWidth: boolean;
    widthRatio: number;
    descendingHeight: boolean;
    heightRatio: number;
    border: {
      enabled: boolean;
      width: number;
      spacing: number;
      descendingWidth: boolean;
      widthRatio: number;
      descendingSpacing: boolean;
      spacingRatio: number;
    };
  };
  labels: {
    position: LabelPosition;
    color: string;
    fontFamily: string;
    size: number;
    spacing: number;
    descendingSize: boolean;
    sizeRatio: number;
    invisible: boolean; // Add this new property
  };
  timeline: {
    duration: number;
    loop: boolean;
    loopDelayBefore: number;
    loopDelayAfter: number;
  };
  animations: {
    barJump: BarJumpType;
    jumpDuration: number;
  };
  dateDisplay: DateDisplaySettings;
  imageColumn: ImageColumnSettings;
  background: {
    enabled: boolean;
    color: string;
  };
  embeddings: EmbeddingsSettings;
}

// Rest of the file...