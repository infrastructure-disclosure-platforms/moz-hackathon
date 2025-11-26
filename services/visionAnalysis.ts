/**
 * Vision Analysis Service
 * Integrates with Anthropic Claude Vision API for image analysis
 */

import Anthropic from '@anthropic-ai/sdk';
import { fetchImageAsBase64 } from '../utils/imageEncoder';
import { getPrompt } from '../constants/visionPrompts';
import type { VisionAnalysisResponse } from '../types';

// Initialize Anthropic SDK
const anthropic = new Anthropic({
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY || '',
  dangerouslyAllowBrowser: true, // Frontend-only approach for hackathon
});

type HumorStyle = 'warm' | 'witty' | 'heartfelt';
type Language = 'pt' | 'en';

/**
 * Validates the AI-generated insight structure
 */
function validateInsight(insight: any): insight is VisionAnalysisResponse {
  return (
    typeof insight === 'object' &&
    typeof insight.title === 'string' &&
    insight.title.length >= 5 &&
    insight.title.length <= 50 &&
    Array.isArray(insight.tags) &&
    insight.tags.length === 3 &&
    typeof insight.quip === 'string' &&
    insight.quip.split(' ').length <= 25
  );
}

/**
 * Extract JSON from Claude response
 * Handles cases where Claude wraps JSON in markdown code blocks
 */
function extractJSON(text: string): any {
  // Try direct parse first
  try {
    return JSON.parse(text);
  } catch {
    // Try extracting from markdown code blocks
    const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/) ||
                     text.match(/```\s*([\s\S]*?)\s*```/);

    if (jsonMatch) {
      return JSON.parse(jsonMatch[1]);
    }

    // Try finding JSON object pattern
    const objectMatch = text.match(/\{[\s\S]*\}/);
    if (objectMatch) {
      return JSON.parse(objectMatch[0]);
    }

    throw new Error('No valid JSON found in response');
  }
}

/**
 * Analyze an image with Claude Vision API
 * @param imageUrl - URL of the image to analyze
 * @param language - Language for the analysis (pt or en)
 * @param humorStyle - Style of humor to generate
 * @returns Vision analysis response with culturally-rich humor
 */
export async function analyzeImage(
  imageUrl: string,
  language: Language,
  humorStyle: HumorStyle
): Promise<VisionAnalysisResponse> {
  try {
    const filename = imageUrl.split('/').pop();

    // Step 1: Encode image as base64
    console.log(`[Vision] Encoding image: ${filename}`);
    const base64Image = await fetchImageAsBase64(imageUrl);

    // Step 2: Get appropriate prompt template with unique identifier
    const basePrompt = getPrompt(language, humorStyle);

    // Add unique context to prevent identical responses
    const uniqueId = Date.now().toString(36) + Math.random().toString(36).substring(2);
    const prompt = `${basePrompt}\n\nImage ID: ${uniqueId}\nBe creative and unique - avoid repeating previous descriptions.`;

    // Step 3: Call Claude Vision API with cost optimizations
    console.log(`[Vision] Calling Claude Opus 4.5 for ${filename} (${language}, ${humorStyle})`);
    const response = await anthropic.messages.create({
      model: 'claude-opus-4-20250514',
      max_tokens: 200, // Reduced from 512 - JSON output is small (~100 tokens)
      temperature: 0.85, // Slightly lower for consistency, fewer retries
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: 'image/jpeg',
                data: base64Image,
              },
            },
            {
              type: 'text',
              text: prompt,
              cache_control: { type: 'ephemeral' }, // Cache prompt for reuse
            },
          ],
        },
      ],
    });

    // Step 4: Parse and validate response
    const textContent = response.content.find((c) => c.type === 'text');
    if (!textContent || textContent.type !== 'text') {
      throw new Error('No text content in API response');
    }

    const insight = extractJSON(textContent.text);

    if (!validateInsight(insight)) {
      console.error('Invalid insight structure:', insight);
      throw new Error('Invalid insight format from API');
    }

    console.log(`[Vision] Success for ${filename}: "${insight.title}"`);
    return insight;

  } catch (error) {
    console.error(`[Vision] Analysis failed for ${filename}:`, error);
    throw error;
  }
}

/**
 * Get humor style for an image based on its index
 * Rotates through warm → witty → heartfelt
 */
export function getHumorStyleForImage(imageIndex: number): HumorStyle {
  const styles: HumorStyle[] = ['warm', 'witty', 'heartfelt'];
  return styles[imageIndex % 3];
}
