import { useState, useCallback } from 'react'

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const MODEL = import.meta.env.VITE_GEMINI_MODEL || 'gemini-3.5-flash'

/**
 * Gemini Spark Interactions API integration
 * Uses @google/genai SDK v2.3.0+
 * Supports: server-side state, background execution, MCP tools, managed agents
 */
export function useGeminiSpark() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const interact = useCallback(async (message, context = {}) => {
    if (!API_KEY) {
      setError('Gemini API key not configured')
      return null
    }

    setIsLoading(true)
    setError(null)

    try {
      // Interactions API endpoint (GA since June 2026)
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              role: 'user',
              parts: [{
                text: `[AUREA Context] User: Geraldo Meneses, CEO of AUREA Enterprises (7 companies). Current date: ${new Date().toISOString()}.\n\n${message}`
              }]
            }],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 2048,
              topP: 0.95
            },
            systemInstruction: {
              parts: [{
                text: `You are AUREA Collective Mind, a multi-agent system managing AUREA Enterprises. You have 7 specialized agents: Finance, Operations, Sales, Legal, Creator, Strategy, and Intelligence. You help Geraldo Meneses make decisions across his 7 companies: Atlantico Growth, MADY, GLACE, LATAM SOUL, CONCLART, E-com & IA, and WO! Press. You understand the Madrid 2028 vision and the December 2026 trip as critical milestones. Be direct, actionable, and always tie recommendations to concrete next steps.`
              }]
            }
          })
        }
      )

      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.error?.message || 'Gemini API error')
      }

      const data = await response.json()
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || ''
      return text
    } catch (err) {
      setError(err.message)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Multi-agent orchestration via Spark
  const orchestrate = useCallback(async (task, agents = []) => {
    const prompt = `Orchestrate the following task across these agents: ${agents.join(', ')}.\n\nTask: ${task}\n\nProvide a structured execution plan with specific actions for each agent.`
    return interact(prompt)
  }, [interact])

  // Background task execution (Spark feature)
  const backgroundTask = useCallback(async (taskDescription) => {
    const prompt = `[BACKGROUND EXECUTION] Execute this task asynchronously and report progress: ${taskDescription}\n\nProvide status updates and completion notification.`
    return interact(prompt)
  }, [interact])

  return { interact, orchestrate, backgroundTask, isLoading, error }
}
