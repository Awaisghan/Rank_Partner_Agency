import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Invalid email address"),
  company: z.string().trim().optional().default(""),
  serviceNeeded: z.string().trim().min(1, "Service selection is required"),
  goals: z.string().trim().optional().default(""),
});

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid form data. Please check your inputs.", details: result.error.format() },
        { status: 400 }
      );
    }

    const { name, email, company, serviceNeeded, goals } = result.data;
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error("RESEND_API_KEY environment variable is not defined.");
      return NextResponse.json(
        { error: "Email service is temporarily unconfigured. Please try again later." },
        { status: 500 }
      );
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f6f8; color: #1e293b; margin: 0; padding: 24px; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05); }
            .header { background: #050d21; color: #ffffff; padding: 28px 32px; border-bottom: 4px solid #f59e0b; }
            .header h2 { margin: 0; font-size: 22px; font-weight: 800; tracking: -0.5px; }
            .header p { margin: 6px 0 0 0; color: #94a3b8; font-size: 13px; }
            .content { padding: 32px; }
            .field-group { margin-bottom: 22px; }
            .label { font-size: 11px; text-transform: uppercase; font-weight: 700; color: #64748b; letter-spacing: 0.8px; margin-bottom: 6px; }
            .value { font-size: 15px; color: #0f172a; font-weight: 500; background: #f8fafc; padding: 12px 16px; border-radius: 10px; border: 1px solid #e2e8f0; }
            .footer { padding: 20px 32px; background: #f8fafc; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New RankPartner Contact Form Submission</h2>
              <p>Received from website inquiry form on RankPartner.io</p>
            </div>
            <div class="content">
              <div class="field-group">
                <div class="label">Full Name</div>
                <div class="value">${escapeHtml(name)}</div>
              </div>
              <div class="field-group">
                <div class="label">Work Email</div>
                <div class="value"><a href="mailto:${escapeHtml(email)}" style="color: #6d28d9; text-decoration: none; font-weight: 600;">${escapeHtml(email)}</a></div>
              </div>
              <div class="field-group">
                <div class="label">Company / Website</div>
                <div class="value">${company ? escapeHtml(company) : "<span style='color: #94a3b8;'>Not provided</span>"}</div>
              </div>
              <div class="field-group">
                <div class="label">Selected Service</div>
                <div class="value" style="color: #6d28d9; font-weight: 700;">${escapeHtml(serviceNeeded)}</div>
              </div>
              <div class="field-group">
                <div class="label">Goal / Notes</div>
                <div class="value" style="white-space: pre-wrap;">${goals ? escapeHtml(goals) : "<span style='color: #94a3b8;'>No goals or extra notes specified</span>"}</div>
              </div>
            </div>
            <div class="footer">
              &copy; 2026 RankPartner.io Lead Management System &bull; ${new Date().toUTCString()}
            </div>
          </div>
        </body>
      </html>
    `;

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "RankPartner <onboarding@rankpartner.io>",
        to: ["Hello@rankpartner.io"],
        reply_to: email,
        subject: `New RankPartner Contact Form Submission - ${name}`,
        html: htmlContent,
      }),
    });

    const resendData = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error("Resend API failed:", resendData);
      return NextResponse.json(
        { error: resendData?.message || "Failed to deliver email through Resend." },
        { status: resendResponse.status || 500 }
      );
    }

    return NextResponse.json({ success: true, id: resendData.id });
  } catch (error: any) {
    console.error("Error in POST /api/contact:", error);
    return NextResponse.json(
      { error: "An error occurred while submitting the form. Please try again." },
      { status: 500 }
    );
  }
}
