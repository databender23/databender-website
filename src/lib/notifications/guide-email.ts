/**
 * Guide Email Delivery Service
 *
 * Sends guide download emails via AWS SES
 */

import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

interface GuideEmailParams {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  guideTitle: string;
  guideSlug: string;
  downloadUrl: string;
  contentUrl: string;
}

/**
 * Send guide download email via AWS SES
 */
export async function sendGuideEmail(params: GuideEmailParams): Promise<boolean> {
  const awsRegion = process.env.SES_REGION || process.env.AWS_REGION || "us-east-1";
  const fromEmail = process.env.SES_FROM_EMAIL || "info@databender.co";

  try {
    const clientConfig: { region: string; credentials?: { accessKeyId: string; secretAccessKey: string } } = {
      region: awsRegion,
    };

    if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
      clientConfig.credentials = {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      };
    }

    const sesClient = new SESClient(clientConfig);

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://databender.co";
    const fullDownloadUrl = params.downloadUrl.startsWith("http")
      ? params.downloadUrl
      : `${siteUrl}${params.downloadUrl}`;
    const fullContentUrl = params.contentUrl.startsWith("http")
      ? params.contentUrl
      : `${siteUrl}${params.contentUrl}`;

    const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8f9fa;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
          <!-- Header -->
          <tr>
            <td style="padding: 32px 40px; background: linear-gradient(135deg, #1A9988 0%, #147a6c 100%);">
              <img src="https://databender.co/images/logo-white.png" alt="Databender" style="height: 32px; margin-bottom: 16px;" />
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">
                Your Guide is Ready
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; color: #1a1a1a; font-size: 16px; line-height: 1.6;">
                Hi ${params.firstName},
              </p>

              <p style="margin: 0 0 24px; color: #4a4a4a; font-size: 16px; line-height: 1.6;">
                Thanks for downloading <strong>${params.guideTitle}</strong>. Your guide is ready.
              </p>

              <!-- Download Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 32px 0;">
                <tr>
                  <td align="center">
                    <a href="${fullDownloadUrl}" style="display: inline-block; padding: 14px 32px; background-color: #1A9988; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px; border-radius: 8px;">
                      Download PDF
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 24px; color: #4a4a4a; font-size: 14px; line-height: 1.6; text-align: center;">
                Or <a href="${fullContentUrl}" style="color: #1A9988; text-decoration: underline;">read it online</a>
              </p>

              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;" />

              <p style="margin: 0 0 16px; color: #4a4a4a; font-size: 15px; line-height: 1.6;">
                <strong>What's next?</strong>
              </p>

              <p style="margin: 0 0 24px; color: #4a4a4a; font-size: 15px; line-height: 1.6;">
                If you'd like to discuss how these strategies could work for your firm, we're happy to chat. No pressure, no sales pitch.
              </p>

              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="${siteUrl}/contact" style="display: inline-block; padding: 12px 24px; background-color: #ffffff; color: #1A9988; text-decoration: none; font-weight: 600; font-size: 14px; border-radius: 8px; border: 2px solid #1A9988;">
                      Schedule a Conversation
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #f8f9fa; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #6b7280; font-size: 13px; text-align: center;">
                Databender • Rethink what's possible.
              </p>
              <p style="margin: 8px 0 0; color: #9ca3af; font-size: 12px; text-align: center;">
                <a href="${siteUrl}" style="color: #9ca3af; text-decoration: none;">databender.co</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    const textBody = `
Hi ${params.firstName},

Thanks for downloading "${params.guideTitle}". Your guide is ready.

Download PDF: ${fullDownloadUrl}

Or read it online: ${fullContentUrl}

What's next?

If you'd like to discuss how these strategies could work for your firm, we're happy to chat. No pressure, no sales pitch.

Schedule a conversation: ${siteUrl}/contact

---
Databender • Rethink what's possible.
databender.co
    `;

    const command = new SendEmailCommand({
      Source: `Databender <${fromEmail}>`,
      Destination: {
        ToAddresses: [params.email],
      },
      Message: {
        Subject: {
          Data: `Your Guide: ${params.guideTitle}`,
          Charset: "UTF-8",
        },
        Body: {
          Html: {
            Data: htmlBody,
            Charset: "UTF-8",
          },
          Text: {
            Data: textBody,
            Charset: "UTF-8",
          },
        },
      },
    });

    await sesClient.send(command);
    console.log(`Guide email sent to ${params.email} for "${params.guideTitle}"`);
    return true;
  } catch (error) {
    console.error("Failed to send guide email:", error);
    return false;
  }
}
