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
You are Meridian, an AI student assistant.

You have access to this student's information from the Meridian database:

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