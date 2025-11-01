// // /app/api/emailsend/invoice-send/route.js
// import nodemailer from "nodemailer";

// export async function POST(req) {
//   try {
//     const { to, subject, text } = await req.json();

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         type: "OAuth2",
//         user: process.env.GOOGLE_USER,
//         clientId: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRETS,
//         refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
//       },
//     });
// console.log(process.env.GOOGLE_USER)
//     const info = await transporter.sendMail({
//       from: process.env.GOOGLE_USER,
//       to,
//       subject,
//       text,
//     });

//     return Response.json({ message: "Email sent successfully!", info });
//   } catch (error) {
//     return Response.json({ error: error.message }, { status: 500 });
//   }
// }

















import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { to, subject, text } = await req.json();

    // ✅ Use simple App Password auth (no OAuth2)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GOOGLE_USER,
        pass: process.env.GOOGLE_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.GOOGLE_USER,
      to,
      subject: subject || "Test Email",
      text: text || "Hello from your Next.js app via App Password!",
    });

    return Response.json({ message: "✅ Email sent successfully!", info });
  } catch (error) {
    console.error("Email send error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}












