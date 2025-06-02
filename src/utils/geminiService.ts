import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Google Generative AI with your API key
// The API key will be loaded from environment variables
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

/**
 * Service to interact with Gemini API for project insights
 */
export const GeminiService = {
  /**
   * Get AI insights about a GitHub project
   * @param projectName - Name of the project
   * @param description - Project description
   * @param technologies - Array of technologies used
   * @returns Promise with the AI generated insight
   */
  async getProjectInsight(
    projectName: string,
    description: string,
    technologies: string[]
  ): Promise<string> {
    try {
      // Get the generative model (Gemini Pro)
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });
      // Create prompt for the AI
      const prompt = `
        You are a product strategist and market analyst.
        Analyze this project and highlight its unique selling proposition (USP) or market potential.
        Focus only on positive aspects, business value, competitive advantage, or market opportunity.
        Keep your response under 150 characters, be direct and confident.
        Avoid qualifying phrases - deliver the insight with conviction.
        Always be positive and promotional - never suggest improvements or point out deficiencies.
        
        Project: ${projectName}
        Description: ${description}
        Technologies: ${technologies.join(', ')}
      `;

      // Generate content
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      
      return text.trim();
    } catch (error) {
      console.error('Error getting AI insight:', error);
      // Fallback insights if the API call fails
      return getFallbackInsight(projectName, technologies);
    }
  }
};

/**
 * Generate a fallback insight if the API call fails
 */
function getFallbackInsight(projectName: string, technologies: string[]): string {
  const techName = technologies.length > 0 ? technologies[0] : "modern technology";
  
  const insights = [
    `${projectName} showcases exceptional implementation of ${techName} with impressive user experience.`,
    `Brilliant use of ${techName} creates a standout experience in ${projectName}.`,
    `${projectName} demonstrates technical excellence with its innovative approach to ${techName}.`,
    `The elegant architecture of ${projectName} highlights masterful use of ${techName}.`,
    `${projectName} sets a high standard for projects in the ${techName} ecosystem.`,
    `Impressive performance optimizations make ${projectName} a stellar example of ${techName}.`,
    `${projectName} brilliantly leverages ${techName} best practices for exceptional results.`,
    `The seamless integration of ${techName} in ${projectName} delivers remarkable functionality.`,
    `${projectName} exemplifies technical excellence with its innovative implementation.`,
    `The robust architecture of ${projectName} showcases expert development practices.`
  ];
  
  return insights[Math.floor(Math.random() * insights.length)];
} 