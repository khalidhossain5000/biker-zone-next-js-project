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
    const { to, subject, html } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GOOGLE_USER,
        pass: process.env.GOOGLE_PASS, // 🟢 app password
      },
    });

    const info = await transporter.sendMail({
      from: `"BikeShop" <${process.env.GOOGLE_USER}>`,
      to,
      subject,
      html, // ✅ sending HTML
    });

    return Response.json({ message: "Invoice email sent successfully!", info });
  } catch (error) {
    console.error("Email error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}










