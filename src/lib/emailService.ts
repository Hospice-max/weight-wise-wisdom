// Email service for sending emails through a backend API
// This is a placeholder implementation that would need to be connected to a real email service

export interface EmailData {
  to: string;
  subject: string;
  html: string;
  text: string;
}

// Send email through backend API
export const sendEmail = async (emailData: EmailData) => {
  try {
    // In a real implementation, this would call your backend API
    // For example:
    /*
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to send email: ${response.statusText}`);
    }
    
    return { success: true };
    */    
    
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
};

// Send newsletter confirmation email
export const sendNewsletterConfirmationEmail = async (email: string, token: string) => {
  // This would typically use a template system
  const confirmationUrl = `${window.location.origin}/confirm-subscription?token=${token}`;
  
  const emailData: EmailData = {
    to: email,
    subject: "Confirmez votre inscription à la newsletter Ensemble Contre l'Obésité",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(90deg, #3b82f6, #10b981); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 24px;">Ensemble Contre l'Obésité</h1>
        </div>
        <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
          <h2 style="color: #1f2937; margin-top: 0;">Confirmez votre inscription</h2>
          <p>Bonjour,</p>
          <p>Merci de vous être inscrit à notre newsletter. Pour finaliser votre inscription et commencer à recevoir nos contenus, veuillez confirmer votre adresse email en cliquant sur le bouton ci-dessous :</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${confirmationUrl}" 
               style="background: linear-gradient(90deg, #3b82f6, #10b981); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
              Confirmer mon inscription
            </a>
          </div>
          
          <p>Si le bouton ne fonctionne pas, vous pouvez également copier et coller le lien suivant dans votre navigateur :</p>
          <p style="word-break: break-all; color: #3b82f6;">${confirmationUrl}</p>
          
          <p style="margin-top: 30px;">Après confirmation, vous recevrez régulièrement :</p>
          <ul style="color: #6b7280;">
            <li>Des conseils nutritionnels personnalisés</li>
            <li>Des programmes d'exercices adaptés</li>
            <li>Des recettes saines et équilibrées</li>
            <li>Des témoignages inspirants de notre communauté</li>
            <li>Des offres et ressources exclusives</li>
          </ul>
          
          <p style="margin-top: 30px;">Si vous n'êtes pas à l'origine de cette inscription, vous pouvez ignorer cet email.</p>
          
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #9ca3af; font-size: 14px;">
            <p>Ensemble Contre l'Obésité - Une communauté bienveillante pour un mode de vie sain</p>
            <p>© 2024 Ensemble Contre l'Obésité. Tous droits réservés.</p>
          </div>
        </div>
      </div>
    `,
    text: `
      Confirmez votre inscription à la newsletter Ensemble Contre l'Obésité
      
      Bonjour,
      
      Merci de vous être inscrit à notre newsletter. Pour finaliser votre inscription et commencer à recevoir nos contenus, veuillez confirmer votre adresse email en copiant le lien suivant dans votre navigateur :
      
      ${confirmationUrl}
      
      Après confirmation, vous recevrez régulièrement :
      - Des conseils nutritionnels personnalisés
      - Des programmes d'exercices adaptés
      - Des recettes saines et équilibrées
      - Des témoignages inspirants de notre communauté
      - Des offres et ressources exclusives
      
      Si vous n'êtes pas à l'origine de cette inscription, vous pouvez ignorer cet email.
      
      Ensemble Contre l'Obésité - Une communauté bienveillante pour un mode de vie sain
      © 2024 Ensemble Contre l'Obésité. Tous droits réservés.
    `
  };
  
  return await sendEmail(emailData);
};

// Send welcome email after newsletter confirmation
export const sendWelcomeEmail = async (email: string) => {
  const emailData: EmailData = {
    to: email,
    subject: "Bienvenue dans la newsletter Ensemble Contre l'Obésité !",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(90deg, #3b82f6, #10b981); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 24px;">Ensemble Contre l'Obésité</h1>
        </div>
        <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
          <h2 style="color: #1f2937; margin-top: 0;">Bienvenue dans notre communauté !</h2>
          <p>Bonjour,</p>
          <p>Félicitations ! Votre inscription à notre newsletter a été confirmée avec succès.</p>
          
          <p>Vous faites maintenant partie d'une communauté bienveillante dédiée au bien-être et à la santé. Vous recevrez bientôt nos prochains contenus :</p>
          
          <ul style="color: #6b7280;">
            <li>Des conseils nutritionnels personnalisés</li>
            <li>Des programmes d'exercices adaptés</li>
            <li>Des recettes saines et équilibrées</li>
            <li>Des témoignages inspirants de notre communauté</li>
            <li>Des offres et ressources exclusives</li>
          </ul>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://ensemble-contre-obesite.com" 
               style="background: linear-gradient(90deg, #3b82f6, #10b981); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
              Visiter notre site
            </a>
          </div>
          
          <p style="margin-top: 30px;">Encore une fois, bienvenue dans notre communauté !</p>
          
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #9ca3af; font-size: 14px;">
            <p>Ensemble Contre l'Obésité - Une communauté bienveillante pour un mode de vie sain</p>
            <p>© 2024 Ensemble Contre l'Obésité. Tous droits réservés.</p>
          </div>
        </div>
      </div>
    `,
    text: `
      Bienvenue dans la newsletter Ensemble Contre l'Obésité !
      
      Bonjour,
      
      Félicitations ! Votre inscription à notre newsletter a été confirmée avec succès.
      
      Vous faites maintenant partie d'une communauté bienveillante dédiée au bien-être et à la santé. Vous recevrez bientôt nos prochains contenus :
      - Des conseils nutritionnels personnalisés
      - Des programmes d'exercices adaptés
      - Des recettes saines et équilibrées
      - Des témoignages inspirants de notre communauté
      - Des offres et ressources exclusives
      
      Visitez notre site : https://ensemble-contre-obesite.com
      
      Encore une fois, bienvenue dans notre communauté !
      
      Ensemble Contre l'Obésité - Une communauté bienveillante pour un mode de vie sain
      © 2024 Ensemble Contre l'Obésité. Tous droits réservés.
    `
  };
  
  return await sendEmail(emailData);
};