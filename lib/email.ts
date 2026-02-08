import { getMaxListeners } from 'events';
import nodemailer from 'nodemailer';

// Create a transporter using your email service
// Configure with environment variables
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "livresentreamis5@gmail.com",
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendPendingFriendInvitation(
  recipientEmail: string,
  senderName: string,
  senderPseudo: string
) {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: recipientEmail,
      subject: `${senderName} vous invite à rejoindre Livres Entre Amis`,
      html: `
        <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2>Invitation à rejoindre Livres Entre Amis</h2>
          <p>Bonjour,</p>
          <p><strong>${senderName}</strong> (${senderPseudo}) vous invite à rejoindre <strong>Livres Entre Amis</strong>!</p>
          <p>Livres Entre Amis est une plateforme de partage de livres où vous pouvez:</p>
          <ul>
            <li>Partager les livres que vous possédez</li>
            <li>Découvrir les livres d'autres utilisateurs</li>
            <li>Vendre, prêter ou donner vos livres</li>
            <li>Créer une communauté d'amis lecteurs</li>
          </ul>
          <p>
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://livresentreamis.com'}" 
               style="display: inline-block; background-color: #0066cc; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 20px 0;">
              Rejoindre Livres Entre Amis
            </a>
          </p>
          <p>Une fois inscrit, ${senderName} vous aura dans sa liste d'amis pour partager vos livres!</p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 12px;">
            Vous avez reçu cet email car quelqu'un vous a invité à rejoindre Livres Entre Amis.
          </p>
        </div>
      `,
      text: `Bonjour,\n\n${senderName} vous invite à rejoindre Livres Entre Amis!\n\nLivres Entre Amis est une plateforme de partage de livres.\n\nRejoingnez-nous: ${process.env.NEXT_PUBLIC_APP_URL || 'https://livresentreamis.com'}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
