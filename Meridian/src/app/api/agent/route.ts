import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';

const ai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY!,
  baseURL: 'https://openrouter.ai/api/v1',
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return Response.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Get student data from Supabase
    const { data: student, error } = await supabase
      .from('student_data')
      .select('*')
      .limit(1)
      .single();

    if (error) {
      console.error('Supabase error:', error);

      return Response.json(
        {
          error: 'Could not retrieve student data from Supabase.',
        },
        { status: 500 }
      );
    }

    const completion = await ai.chat.completions.create({
      model: 'openrouter/auto',

      messages: [
        {
          role: 'system',
          content: `
You are Meridian, a closed-domain AI assistant for the Meridian student platform.

STRICT KNOWLEDGE POLICY:

You may ONLY answer questions using information explicitly provided in the
context below.

The context comes from:
1. Meridian's website/content
2. Meridian's Supabase database

You MUST NOT use your general/pretrained knowledge to answer questions.

If the user's question cannot be answered using the provided context,
respond exactly:

"I don't have that information in Meridian."

Do NOT:
- Answer general knowledge questions.
- Use information from outside Meridian.
- Guess or infer missing facts.
- Invent information.
- Provide information about topics that are not present in the context.
- Use your own knowledge to complete missing information.

Examples:

User: "What is my CGPA?"
→ Answer using the student database.

User: "What is my attendance?"
→ Answer using the student database.

User: "What is the capital of France?"
→ "I don't have that information in Meridian."

User: "Who is Elon Musk?"
→ "I don't have that information in Meridian."

User: "Explain quantum physics."
→ "I don't have that information in Meridian."

User: "What events are available?"
→ Answer only if events are present in the provided Meridian context.

Always prioritize the provided Meridian context over everything else.

MERIDIAN CONTEXT:

${JSON.stringify(student, null, 2)}

Rules:
- Answer the student's question clearly.
- Use the database information when relevant.
- Never invent student information.
- If information is unavailable, say so.
- Keep responses concise and useful.
- Act like a helpful university student assistant.
          `,
        },
        {
          role: 'user',
          content: message,
        },
      ],
    });

    const response =
      completion.choices[0]?.message?.content ||
      'I could not generate a response.';

    return Response.json({
      response,
    });

  } catch (error) {
    console.error('OpenRouter Agent Error:', error);

    return Response.json(
      {
        error: 'AI agent failed to process your request.',
      },
      { status: 500 }
    );
  }
}
