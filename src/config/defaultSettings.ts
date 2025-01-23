import { ChartSettings } from '../types/SettingsTypes';

export const defaultSettings: ChartSettings = {
  aspectRatio: '16:9',
  margins: {
    top: 20,
    bottom: 20,
    left: 200,
    right: 120
  },
  bars: {
    maxCount: 10,
    spacing: 8,
    descendingWidth: false,
    descendingRatio: 0.75,
    descendingHeight: false,
    heightRatio: 0.75,
    keepSpacing: false,
    useCustomSpacing: false,
    customSpacing: [],
    animationType: 'transition',
    roundedCorners: {
      enabled: false,
      radius: 8
    }
  },
  values: {
    showAtEnd: true,
    emptyCellHandling: 'zero',
    color: '#000000'
  },
  images: {
    position: 'behind',
    size: 32,
    spacing: 8,
    descendingWidth: false,
    widthRatio: 0.75,
    descendingHeight: false,
    heightRatio: 0.75,
    border: {
      enabled: false,
      width: 2,
      spacing: 2,
      descendingWidth: false,
      widthRatio: 0.75,
      descendingSpacing: false,
      spacingRatio: 0.75
    }
  },
  labels: {
    position: 'behind',
    color: '#000000',
    fontFamily: 'sans-serif',
    size: 14,
    spacing: 8,
    descendingSize: false,
    sizeRatio: 0.75,
    invisible: false // Add default value for invisible property
  },
  timeline: {
    duration: 30,
    loop: true,
    loopDelayBefore: 1,
    loopDelayAfter: 1
  },
  animations: {
    barJump: 'smooth',
    jumpDuration: 0.3
  },
  dateDisplay: {
    show: true,
    position: 'bottomRight',
    fontSize: 16,
    color: '#ffffff',
    margins: {
      top: 16,
      bottom: 16,
      left: 16,
      right: 16
    },
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  imageColumn: {
    enabled: false,
    position: 'left',
    size: 32,
    spacing: 8,
    descendingSize: false,
    sizeRatio: 0.75,
    defaultImage: 'https://via.placeholder.com/32',
    images: {},
    margins: {
      top: 20,
      bottom: 20,
      left: 20,
      right: 20
    },
    useCustomSpacing: false,
    customSpacing: [],
    imageShape: 'circle',
    customWidth: 32,
    customHeight: 32
  },
  background: {
    enabled: false,
    color: '#ffffff'
  },
  embeddings: {
    enabled: false,
    images: [],
    texts: []
  }
};