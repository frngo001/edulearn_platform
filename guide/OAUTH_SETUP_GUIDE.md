# OAuth Setup Guide für EduLearn Platform

## 🚀 Übersicht

Diese Anleitung zeigt dir, wie du OAuth-Provider (Google, GitHub, Microsoft) in deinem Supabase-Projekt konfigurierst, damit die OAuth-Funktionalität in der EduLearn Platform funktioniert.

## 📋 Voraussetzungen

- Zugang zu deinem Supabase Dashboard
- Google Developer Console Account (für Google OAuth)
- GitHub Account (für GitHub OAuth)
- Microsoft Azure Account (für Microsoft OAuth)

## 🔧 1. Supabase Dashboard öffnen

1. Gehe zu [https://supabase.com](https://supabase.com)
2. Logge dich ein und wähle dein EduLearn-Projekt aus
3. Navigiere zu **Authentication** → **Providers** im linken Menü

## 🔴 2. Google OAuth konfigurieren

### 2.1 Google Developer Console
1. Gehe zu [https://console.developers.google.com](https://console.developers.google.com)
2. Erstelle ein neues Projekt oder wähle ein bestehendes aus
3. Aktiviere die **Google+ API** und **Google Identity API**

### 2.2 OAuth 2.0 Credentials erstellen
1. Gehe zu **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
2. Wähle **Web application** als Application type
3. Füge diese **Authorized redirect URIs** hinzu:
   ```
   https://[DEIN_SUPABASE_PROJECT_ID].supabase.co/auth/v1/callback
   http://localhost:4028/auth/v1/callback
   ```
4. Notiere dir die **Client ID** und **Client Secret**

### 2.3 Supabase konfigurieren
1. Zurück im Supabase Dashboard: **Authentication** → **Providers**
2. Aktiviere **Google**
3. Füge deine **Client ID** und **Client Secret** ein
4. Klicke **Save**

## ⚫ 3. GitHub OAuth konfigurieren

### 3.1 GitHub OAuth App erstellen
1. Gehe zu [https://github.com/settings/developers](https://github.com/settings/developers)
2. Klicke **New OAuth App**
3. Fülle aus:
   - **Application name**: EduLearn Platform
   - **Homepage URL**: `http://localhost:4028`
   - **Authorization callback URL**: `https://[DEIN_SUPABASE_PROJECT_ID].supabase.co/auth/v1/callback`
4. Klicke **Register application**
5. Notiere dir die **Client ID** und erstelle ein **Client Secret**

### 3.2 Supabase konfigurieren
1. Im Supabase Dashboard: **Authentication** → **Providers**
2. Aktiviere **GitHub**
3. Füge deine **Client ID** und **Client Secret** ein
4. Klicke **Save**

## 🔵 4. Microsoft OAuth konfigurieren

### 4.1 Azure App Registration
1. Gehe zu [https://portal.azure.com](https://portal.azure.com)
2. Navigiere zu **Azure Active Directory** → **App registrations**
3. Klicke **New registration**
4. Fülle aus:
   - **Name**: EduLearn Platform
   - **Supported account types**: Accounts in any organizational directory and personal Microsoft accounts
   - **Redirect URI**: Web → `https://[DEIN_SUPABASE_PROJECT_ID].supabase.co/auth/v1/callback`
5. Klicke **Register**

### 4.2 Client Secret erstellen
1. Gehe zu **Certificates & secrets** → **New client secret**
2. Füge eine Beschreibung hinzu und wähle Ablaufzeit
3. Klicke **Add** und notiere dir den **Secret Value**
4. Notiere dir auch die **Application (client) ID** von der Overview-Seite

### 4.3 Supabase konfigurieren
1. Im Supabase Dashboard: **Authentication** → **Providers**
2. Aktiviere **Azure**
3. Füge deine **Client ID** und **Client Secret** ein
4. Klicke **Save**

## 🧪 5. Testen der OAuth-Funktionalität

### 5.1 Development Server starten
```bash
npm start
```

### 5.2 OAuth testen
1. Öffne [http://localhost:4028/registration](http://localhost:4028/registration)
2. Teste die OAuth-Buttons direkt:
   - **Continue with Google** - Öffnet Google OAuth Flow
   - **Continue with GitHub** - Öffnet GitHub OAuth Flow  
   - **Continue with Microsoft** - Öffnet Microsoft OAuth Flow

### 5.3 Erfolgreicher OAuth Flow
- ✅ **Erfolgreich**: Du wirst zu Google/GitHub/Microsoft weitergeleitet
- ✅ **Nach Anmeldung**: Automatische Weiterleitung zum Dashboard
- ❌ **Fehler**: Fehlermeldung wird auf der Registrierungsseite angezeigt

## 🔍 6. Häufige Fehler und Lösungen

### "Provider not enabled"
- **Problem**: OAuth-Provider ist in Supabase nicht aktiviert
- **Lösung**: Gehe zu Authentication → Providers und aktiviere den Provider

### "Redirect URI mismatch"
- **Problem**: Die Redirect-URL stimmt nicht überein
- **Lösung**: Überprüfe die Redirect-URLs in den OAuth-Apps:
  - Google: `https://[PROJECT_ID].supabase.co/auth/v1/callback`
  - GitHub: `https://[PROJECT_ID].supabase.co/auth/v1/callback`
  - Microsoft: `https://[PROJECT_ID].supabase.co/auth/v1/callback`

### "Client ID/Secret invalid"
- **Problem**: Falsche oder fehlende Credentials
- **Lösung**: Überprüfe die Client ID und Secret in beiden Systemen

### OAuth öffnet sich nicht
- **Problem**: Browser blockiert Popup oder JavaScript-Fehler
- **Lösung**: Öffne Developer Tools (F12) und schaue in die Console

## 📝 7. Redirect URLs für verschiedene Umgebungen

### Development (localhost)
```
http://localhost:4028/auth/callback
https://[PROJECT_ID].supabase.co/auth/v1/callback
```

### Production
```
https://your-domain.com/auth/callback
https://[PROJECT_ID].supabase.co/auth/v1/callback
```

## 🔒 8. Sicherheitshinweise

1. **Client Secrets geheim halten**: Niemals in Git committen
2. **Redirect URLs beschränken**: Nur vertrauenswürdige Domains
3. **Scopes minimieren**: Nur notwendige Berechtigungen anfordern
4. **HTTPS verwenden**: In Produktion immer HTTPS

## 📞 9. Support

Falls du Probleme hast:

1. **Browser Console**: Öffne F12 → Console für JavaScript-Fehler
2. **Supabase Logs**: Gehe zu Supabase Dashboard → Logs
3. **Provider-spezifische Docs**:
   - [Google OAuth](https://developers.google.com/identity/protocols/oauth2)
   - [GitHub OAuth](https://docs.github.com/en/developers/apps/building-oauth-apps)
   - [Microsoft OAuth](https://docs.microsoft.com/en-us/azure/active-directory/develop/)

## ✅ 10. Checkliste

- [ ] Supabase-Projekt erstellt und URLs notiert
- [ ] Google OAuth App erstellt und in Supabase konfiguriert
- [ ] GitHub OAuth App erstellt und in Supabase konfiguriert  
- [ ] Microsoft OAuth App erstellt und in Supabase konfiguriert
- [ ] Redirect URLs korrekt konfiguriert
- [ ] OAuth direkt in der Registration getestet
- [ ] Alle Provider funktionieren in der Registration

Viel Erfolg! 🚀 