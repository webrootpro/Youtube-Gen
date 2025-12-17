export enum ThumbnailStyle {
  REALISTIC = 'Realistic',
  ANIMATED = 'Animated/3D',
  MINIMALIST = 'Minimalist',
  GAMING = 'Gaming/High Contrast',
  CLICKBAIT = 'Clickbait/Shocked',
  RETRO = 'Retro/Vaporwave',
  COMIC = 'Comic Book',
}

export interface GeneratedImage {
  id: string;
  url: string; // Base64 data URL
  prompt: string;
  style: ThumbnailStyle;
  timestamp: number;
}

export interface OverlayText {
  id: string;
  content: string;
  x: number;
  y: number;
  rotation: number;
  
  // Styling
  fontSize: number;
  autoFit?: boolean; // New property for auto-fitting text
  fontFamily: string;
  fontWeight: string;
  color: string;
  backgroundColor: string; // "transparent" or hex
  
  // Advanced Styling
  strokeColor: string;
  strokeWidth: number;
  shadowColor: string;
  shadowBlur: number;
  shadowOffsetX: number;
  shadowOffsetY: number;
}

export interface OverlayImage {
  id: string;
  src: string; // base64
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
}

export interface GenerateConfig {
  prompt: string;
  style: ThumbnailStyle;
  includeTextInAI: boolean; // Ask AI to render text
  aiText?: string; // The text AI should try to render
  referenceImage?: string; // Optional: use this image as input for style transfer
}