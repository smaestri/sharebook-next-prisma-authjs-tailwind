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

export async function sendBookRequestEmail(
  recipientEmail: string,
  recipientName: string,
  requesterName: string,
  requesterPseudo: string,
  bookTitle: string,
  bookAuthor: string,
  requestType: 'LOAN' | 'GIFT' | 'SALE',
  message?: string,
  rdvDate?: string,
  price?: number
) {
  try {
    const requestTypeLabel = {
      LOAN: 'Demande de prêt',
      GIFT: 'Demande de don',
      SALE: 'Demande d\'achat'
    }[requestType];

    const requestTypeDescription = {
      LOAN: 'vous demande de prêter (ou donner)',
      GIFT: 'vous demande de donner',
      SALE: 'souhaite acheter'
    }[requestType];

    const priceDisplay = requestType === 'SALE' && price ? `à ${price}€` : '';

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: recipientEmail,
      subject: `${requestTypeLabel} - ${bookTitle} par ${requesterName}`,
      html: `
        <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2>${requestTypeLabel}</h2>
          <p>Bonjour ${recipientName},</p>
          <p><strong>${requesterName}</strong> (${requesterPseudo}) ${requestTypeDescription} votre livre:</p>
          <div style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #0066cc; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>${bookTitle}</strong></p>
            <p style="margin: 5px 0; color: #666;">Auteur: ${bookAuthor}</p>
            ${requestType === 'SALE' && price ? `<p style="margin: 5px 0; font-weight: bold;">Prix proposé: ${price}€</p>` : ''}
          </div>
          ${rdvDate ? `<p><strong>Date proposée pour le rendez-vous:</strong> ${new Date(rdvDate).toLocaleDateString('fr-FR')}</p>` : ''}
          ${message ? `<div style="background-color: #fffacd; padding: 10px; margin: 20px 0; border-radius: 5px;">
            <p><strong>Message de ${requesterName}:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
          </div>` : ''}
          <p>
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://livresentreamis.com'}/sales" 
               style="display: inline-block; background-color: #0066cc; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 20px 0;">
              Consulter la demande
            </a>
          </p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 12px;">
            Vous avez reçu cet email car quelqu'un a fait une demande sur un de vos livres sur Livres Entre Amis.
          </p>
        </div>
      `,
      text: `Bonjour ${recipientName},\n\n${requesterName} (${requesterPseudo}) ${requestTypeDescription} votre livre: ${bookTitle} par ${bookAuthor}\n\n${rdvDate ? `Date proposée: ${new Date(rdvDate).toLocaleDateString('fr-FR')}\n\n` : ''}${message ? `Message: ${message}\n\n` : ''}Consultez votre demande: ${process.env.NEXT_PUBLIC_APP_URL || 'https://livresentreamis.com'}/purchases`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Book request email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending book request email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function sendBookRequestCancellationEmail(
  recipientEmail: string,
  recipientName: string,
  cancellationUserName: string,
  cancellationUserPseudo: string,
  bookTitle: string,
  bookAuthor: string,
  reason?: string
) {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: recipientEmail,
      subject: `Annulation de demande - ${bookTitle} par ${cancellationUserName}`,
      html: `
        <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2>Annulation de demande</h2>
          <p>Bonjour ${recipientName},</p>
          <p><strong>${cancellationUserName}</strong> (${cancellationUserPseudo}) a annulé sa demande sur votre livre:</p>
          <div style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #ff6b6b; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>${bookTitle}</strong></p>
            <p style="margin: 5px 0; color: #666;">Auteur: ${bookAuthor}</p>
          </div>
          ${reason ? `<div style="background-color: #fffacd; padding: 10px; margin: 20px 0; border-radius: 5px;">
            <p><strong>Raison:</strong></p>
            <p>${reason.replace(/\n/g, '<br>')}</p>
          </div>` : ''}
          <p>
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://livresentreamis.com'}/my-books" 
               style="display: inline-block; background-color: #0066cc; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 20px 0;">
              Retour à mes livres
            </a>
          </p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 12px;">
            Vous avez reçu cet email car une demande sur un de vos livres a été annulée sur Livres Entre Amis.
          </p>
        </div>
      `,
      text: `Bonjour ${recipientName},\n\n${cancellationUserName} (${cancellationUserPseudo}) a annulé sa demande sur votre livre: ${bookTitle} par ${bookAuthor}\n\n${reason ? `Raison: ${reason}\n\n` : ''}Retour à mes livres: ${process.env.NEXT_PUBLIC_APP_URL || 'https://livresentreamis.com'}/my-books`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Book request cancellation email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending book request cancellation email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function sendBookRequestAcceptanceEmail(
  recipientEmail: string,
  recipientName: string,
  ownerName: string,
  ownerPseudo: string,
  bookTitle: string,
  bookAuthor: string,
  requestType: 'LOAN' | 'GIFT' | 'SALE',
  rdvDate?: string,
  rdvPlace?: string,
  price?: number
) {
  try {
    const requestTypeLabel = {
      LOAN: 'Demande de prêt acceptée',
      GIFT: 'Demande de don acceptée',
      SALE: 'Demande d\'achat acceptée'
    }[requestType];

    const actionDescription = {
      LOAN: 'a accepté de vous prêter',
      GIFT: 'a accepté de vous donner',
      SALE: 'a accepté de vous vendre'
    }[requestType];

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: recipientEmail,
      subject: `${requestTypeLabel} - ${bookTitle}`,
      html: `
        <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #28a745;">${requestTypeLabel}</h2>
          <p>Bonjour ${recipientName},</p>
          <p><strong>${ownerName}</strong> (${ownerPseudo}) ${actionDescription} le livre:</p>
          <div style="background-color: #f0f8f0; padding: 15px; border-left: 4px solid #28a745; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>${bookTitle}</strong></p>
            <p style="margin: 5px 0; color: #666;">Auteur: ${bookAuthor}</p>
            ${requestType === 'SALE' && price ? `<p style="margin: 5px 0; font-weight: bold;">Prix: ${price}€</p>` : ''}
          </div>
          <div style="background-color: #fffacd; padding: 15px; margin: 20px 0; border-radius: 5px;">
            <h3 style="margin-top: 0;">Détails du rendez-vous:</h3>
            ${rdvDate ? `<p><strong>Date:</strong> ${new Date(rdvDate).toLocaleDateString('fr-FR')} à ${new Date(rdvDate).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</p>` : '<p><strong>Date:</strong> À confirmer</p>'}
            ${rdvPlace ? `<p><strong>Lieu:</strong> ${rdvPlace}</p>` : '<p><strong>Lieu:</strong> À confirmer</p>'}
          </div>
          <p>
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://livresentreamis.com'}/purchases" 
               style="display: inline-block; background-color: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 20px 0;">
              Consulter les détails
            </a>
          </p>
          <p style="color: #666; font-size: 14px; margin-top: 20px;">
            N'oubliez pas de contacter ${ownerName} pour confirmer les détails du rendez-vous si nécessaire.
          </p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 12px;">
            Vous avez reçu cet email car votre demande sur Livres Entre Amis a été acceptée.
          </p>
        </div>
      `,
      text: `Bonjour ${recipientName},\n\n${ownerName} (${ownerPseudo}) ${actionDescription} le livre: ${bookTitle} par ${bookAuthor}\n\nDétails du rendez-vous:\nDate: ${rdvDate ? new Date(rdvDate).toLocaleDateString('fr-FR') : 'À confirmer'}\nLieu: ${rdvPlace || 'À confirmer'}\n${requestType === 'SALE' && price ? `Prix: ${price}€\n` : ''}\nConsultez les détails: ${process.env.NEXT_PUBLIC_APP_URL || 'https://livresentreamis.com'}/purchases`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Book request acceptance email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending book request acceptance email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
