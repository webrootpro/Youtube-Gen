import { ThumbnailStyle } from './types';

export const STYLE_PROMPTS: Record<ThumbnailStyle, string> = {
  [ThumbnailStyle.REALISTIC]: "photorealistic, 4k, highly detailed, professional photography, cinematic lighting",
  [ThumbnailStyle.ANIMATED]: "3D render, Pixar style, vivid colors, smooth gradients, plastic texture, blender guru",
  [ThumbnailStyle.MINIMALIST]: "clean background, negative space, simple composition, flat design, soft shadows",
  [ThumbnailStyle.GAMING]: "neon accents, dark background, high saturation, glowing effects, esports style, dramatic action",
  [ThumbnailStyle.CLICKBAIT]: "exaggerated facial expressions, vibrant red arrows, yellow text background, high contrast, wide angle lens",
  [ThumbnailStyle.RETRO]: "synthwave, neon purple and blue, grid background, VHS glitch effect, 80s aesthetic",
  [ThumbnailStyle.COMIC]: "bold outlines, halftone pattern, comic book style, pop art, vibrant primary colors",
};

export const FONT_OPTIONS = [
  { label: 'Oswald (Bold)', value: '"Oswald", sans-serif' },
  { label: 'Inter (Clean)', value: '"Inter", sans-serif' },
  { label: 'Bangers (Comic)', value: '"Bangers", system-ui' },
  { label: 'Roboto (Standard)', value: '"Roboto", sans-serif' },
  { label: 'Montserrat (Modern)', value: '"Montserrat", sans-serif' },
  { label: 'Cairo (Arabic/Bold)', value: '"Cairo", sans-serif' },
  { label: 'Tajawal (Arabic/Clean)', value: '"Tajawal", sans-serif' },
];

export const DEFAULT_PROMPT = "A surprised man holding a glowing mysterious object";
export const DEFAULT_STYLE = ThumbnailStyle.CLICKBAIT;