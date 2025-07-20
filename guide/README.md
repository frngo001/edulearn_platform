# 📚 EduLearn Platform - Dokumentation

Willkommen zur Dokumentation der EduLearn Platform! Hier findest du alle Anleitungen und Implementierungsdetails.

## 📖 Verfügbare Guides

### 🔐 OAuth & Authentication

1. **[OAuth Setup Guide](./OAUTH_SETUP_GUIDE.md)**
   - Schritt-für-Schritt Anleitung zur Konfiguration von OAuth-Providern
   - Google, GitHub, Microsoft OAuth Setup
   - Supabase Konfiguration
   - Troubleshooting und häufige Fehler

2. **[OAuth Implementation Guide](./OAUTH_IMPLEMENTATION.md)**
   - Technische Implementierung der OAuth-Funktionalität
   - Code-Beispiele und Architektur
   - Testing und Integration
   - API Dokumentation

## 🚀 Schnellstart

### 1. OAuth einrichten
```bash
# 1. Folge dem OAuth Setup Guide
open guide/OAUTH_SETUP_GUIDE.md

# 2. Starte den Development Server
npm start

# 3. Teste OAuth direkt in der Registration
# http://localhost:4028/registration
```

### 2. OAuth testen
1. Öffne http://localhost:4028/registration
2. Teste die OAuth-Buttons direkt:
   - **Continue with Google** - Google OAuth Flow
   - **Continue with GitHub** - GitHub OAuth Flow  
   - **Continue with Microsoft** - Microsoft OAuth Flow

## 📁 Projektstruktur

```
edulearn_platform/
├── guide/                          # 📚 Dokumentation
│   ├── README.md                   # Dieses File
│   ├── OAUTH_SETUP_GUIDE.md        # OAuth Konfiguration
│   └── OAUTH_IMPLEMENTATION.md     # OAuth Implementierung
├── src/
│   ├── lib/
│   │   ├── auth.js                 # 🔐 Authentication Service
│   │   └── supabase.js             # 🗄️ Supabase Konfiguration
│   └── pages/
│       ├── registration-screen/    # 📝 Registrierung mit OAuth
│       └── signin/                 # 🔑 Anmeldung
└── ...
```

## 🛠️ Entwicklung

### Prerequisites
- Node.js 18+
- npm oder yarn
- Supabase Account
- OAuth Provider Accounts (Google, GitHub, Microsoft)

### Installation
```bash
git clone <repository>
cd edulearn_platform
npm install
```

### Environment Setup
Erstelle eine `.env` Datei:
```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Development Server
```bash
npm start
# → http://localhost:4028
```

## 🧪 Testing

### OAuth Testing
1. **Direkt in der Registrierung testen**: 
   - Öffne http://localhost:4028/registration
   - Klicke auf OAuth-Buttons
   - Teste alle Provider

2. **Unit Tests ausführen**:
   ```bash
   npm test
   ```

3. **E2E Tests**:
   ```bash
   npm run test:e2e
   ```

## 📋 Checkliste für neue Entwickler

- [ ] Repository geklont und Dependencies installiert
- [ ] `.env` Datei erstellt mit Supabase Credentials
- [ ] [OAuth Setup Guide](./OAUTH_SETUP_GUIDE.md) befolgt
- [ ] Mindestens einen OAuth Provider konfiguriert
- [ ] Development Server gestartet (`npm start`)
- [ ] OAuth direkt in der Registrierung getestet
- [ ] [OAuth Implementation Guide](./OAUTH_IMPLEMENTATION.md) gelesen

## 🆘 Support & Hilfe

### Bei Problemen:

1. **Browser Console öffnen** (F12) - JavaScript Fehler sichtbar
2. **Supabase Dashboard Logs** - Server-seitige Fehler
3. **Guide Troubleshooting** - Häufige Probleme und Lösungen

### Dokumentation Updates
Wenn du neue Features hinzufügst oder Änderungen machst:
1. Aktualisiere die entsprechenden Guides
2. Füge neue Guides in dieses README ein
3. Teste alle Anleitungen nach Änderungen

## 🔄 Guide Updates

**Letzte Updates:**
- OAuth Setup Guide: Initial creation
- OAuth Implementation: Technical details
- Removed Debug Panel for production

---

**Happy Coding! 🚀**

*Für Fragen oder Verbesserungsvorschläge, erstelle ein Issue oder Pull Request.* 