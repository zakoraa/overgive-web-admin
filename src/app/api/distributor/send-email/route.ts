import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { fullName, email, password } = body;

  if (!fullName || !email || !password) {
    return NextResponse.json({ message: "Data tidak lengkap" }, { status: 400 });
  }

  const subject = "Akun Distributor Overgive Telah Dibuat - Informasi Login & Tugas Distribusi";

  const html = `
    <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #0fc7b8; padding: 20px; text-align: center;">
        <img src="https://gscuqeshqhnbomvxgggw.supabase.co/storage/v1/object/public/overgive-logo/overgive-logo-white.png" alt="Overgive Logo" style="height:100px; margin-bottom: 10px;" />
        <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Selamat Datang di Overgive!</h1>
      </div>
      <div style="padding: 30px; background-color: #ffffff;">
        <p style="font-size: 16px; color: #333;">Halo <strong>${fullName}</strong>,</p>
        <p style="font-size: 16px; color: #333;">
          Akun Anda sebagai <strong>Distributor</strong> telah berhasil dibuat. Anda ditugaskan untuk mendistribusikan donasi ke lokasi yang ditentukan. Berikut detail akun Anda:
        </p>
        <div style="margin-top: 20px; padding: 15px; background-color: #f5f7ff; border-left: 4px solid #0fc7b8;">
          <p style="margin: 0; font-size: 16px; color: #333;">
            <strong>Email:</strong> ${email}<br />
            <strong>Password:</strong> ${password}
          </p>
        </div>
        <p style="margin-top: 30px; font-size: 16px; color: #333;">
          Silakan gunakan informasi di atas untuk masuk ke sistem Overgive.<br />
          Demi keamanan akun Anda, segera ubah password setelah login.
        </p>
      </div>
      <div style="background-color: #f1f1f1; text-align: center; padding: 15px; font-size: 12px; color: #999;">
        &copy; ${new Date().getFullYear()} Overlogic. Semua hak dilindungi.
      </div>
    </div>`;


  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject,
      html,
    });
    return NextResponse.json({ message: "Email berhasil dikirim" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Gagal mengirim email" }, { status: 500 });
  }
}
