import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  }
})

// OAuth configuration
export const oauthConfig = {
  redirectTo: `${window.location.origin}/dashboard`,
  providers: {
    google: {
      scopes: 'email profile'
    },
    github: {
      scopes: 'user:email'
    },
    azure: {
      scopes: 'email profile openid'
    }
  }
}

// Email templates configuration
export const emailConfig = {
  confirmEmailTemplate: {
    subject: 'Willkommen bei EduLearn - Bestätigen Sie Ihre E-Mail-Adresse',
    body: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; color: #333;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Willkommen bei EduLearn!</h1>
        </div>
        
        <div style="padding: 40px 20px; background: #f8f9fa;">
          <h2 style="color: #333; margin-bottom: 20px;">Bestätigen Sie Ihre E-Mail-Adresse</h2>
          
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
            Vielen Dank für Ihre Registrierung bei EduLearn! Um Ihr Konto zu aktivieren und mit dem Lernen zu beginnen, 
            klicken Sie bitte auf den folgenden Button:
          </p>
          
          <div style="text-align: center; margin: 40px 0;">
            <a href="{{ .ConfirmationURL }}" 
               style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                      color: white; 
                      padding: 15px 30px; 
                      text-decoration: none; 
                      border-radius: 8px; 
                      font-weight: bold; 
                      display: inline-block;
                      font-size: 16px;">
              E-Mail-Adresse bestätigen
            </a>
          </div>
          
          <p style="font-size: 14px; color: #666; margin-top: 30px;">
            Falls der Button nicht funktioniert, kopieren Sie diesen Link in Ihren Browser:<br>
            <a href="{{ .ConfirmationURL }}" style="color: #667eea; word-break: break-all;">{{ .ConfirmationURL }}</a>
          </p>
          
          <p style="font-size: 14px; color: #666; margin-top: 20px;">
            Wenn Sie sich nicht bei EduLearn registriert haben, können Sie diese E-Mail ignorieren.
          </p>
        </div>
        
        <div style="background: #333; color: white; padding: 20px; text-align: center; font-size: 14px;">
          <p style="margin: 0;">© 2024 EduLearn. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    `
  }
}