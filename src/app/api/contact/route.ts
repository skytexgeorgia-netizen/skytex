import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email and message are required" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: "info@skytexgeorgia.com",
      replyTo: email,
      subject: `Skytex Georgia İletişim: ${subject || "İletişim Formu"}`,
      html: `
        <h2>Yeni İletişim Formu Mesajı</h2>
        <p><strong>Ad Soyad:</strong> ${name}</p>
        <p><strong>E-posta:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone || "-"}</p>
        <p><strong>Konu:</strong> ${subject || "-"}</p>
        <h3>Mesaj:</h3>
        <p>${message}</p>
        <hr>
        <p><small>Bu mesaj Skytex Georgia web sitesi iletişim formundan gönderilmiştir.</small></p>
      `,
      text: `
Yeni İletişim Formu Mesajı
Ad Soyad: ${name}
E-posta: ${email}
Telefon: ${phone || "-"}
Konu: ${subject || "-"}

Mesaj:
${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
