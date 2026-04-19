import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    // Validate inputs
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    /* 
    =======================================================
    RESEND INTEGRATION - To be enabled when domain is ready
    =======================================================
    
    1. npm install resend
    2. Add RESEND_API_KEY to your .env.local
    3. Uncomment the code below:

    import { Resend } from 'resend';
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: 'TradePivot Contact Form <onboarding@resend.dev>', // Update this to your verified domain later
      to: ['your-email@example.com'], // Update to your recipient email
      subject: `New Inquiry from ${name}: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    });

    if (error) {
       return NextResponse.json({ error: error.message }, { status: 400 });
    }
    */

    // MOCK RESPONSE: Simulate network delay for the sophisticated UI loading effect
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return NextResponse.json(
      { success: true, message: 'Message sent successfully (MOCK)' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
