-- =====================================================
-- EduLearn Platform Database Schema
-- Detaillierte Kommentare für jedes Merkmal
-- =====================================================

-- =====================================================
-- USER_PROFILES TABLE - Erweiterte Benutzerprofile
-- =====================================================
CREATE TABLE user_profiles (
  -- Eindeutige Profil-ID (entspricht auth.users.id)
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  
  -- Vollständiger Name des Benutzers (optional)
  -- Beispiele: "Max Mustermann", "Dr. Maria Schmidt"
  full_name TEXT,
  
  -- Benutzername/Display Name (optional, aber eindeutig wenn gesetzt)
  -- Beispiele: "max_123", "maria_dev", "john_learner"
  username TEXT UNIQUE,
  
  -- Avatar/Profilbild URL (optional)
  -- Format: https://example.com/avatars/user123.jpg
  avatar_url TEXT,
  
  -- Persönliche Beschreibung/Bio (optional)
  -- Kann Interessen, Ziele, Hintergrund enthalten
  bio TEXT,
  
  -- Geburtsdatum (optional, für Altersstatistiken)
  -- Format: YYYY-MM-DD
  date_of_birth DATE,
  
  -- Geschlecht (optional)
  -- Werte: 'male', 'female', 'other', 'prefer_not_to_say'
  gender TEXT CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say')),
  
  -- Land/Region (optional)
  -- Beispiele: "Germany", "United States", "France"
  country TEXT,
  
  -- Stadt (optional)
  -- Beispiele: "Berlin", "Munich", "Hamburg"
  city TEXT,
  
  -- Zeitzone (optional, für Terminplanung)
  -- Beispiele: "Europe/Berlin", "America/New_York", "Asia/Tokyo"
  timezone TEXT,
  
  -- Bevorzugte Sprache für die Plattform (Standard: 'en')
  -- Werte: 'en' (English), 'de' (German), 'es' (Spanish), 'fr' (French)
  preferred_language TEXT DEFAULT 'en' CHECK (preferred_language IN ('en', 'de', 'es', 'fr', 'it', 'pt', 'ru', 'zh', 'ja')),
  
  -- Beruf/Occupation (optional)
  -- Beispiele: "Software Developer", "Student", "Teacher", "Designer"
  occupation TEXT,
  
  -- Ausbildungslevel (optional)
  -- Werte: 'high_school', 'bachelor', 'master', 'phd', 'other'
  education_level TEXT CHECK (education_level IN ('high_school', 'bachelor', 'master', 'phd', 'other')),
  
  -- Lernziele als Array (optional)
  -- Beispiele: {"career_change", "skill_improvement", "hobby"}
  learning_goals TEXT[],
  
  -- Interessensgebiete als Array (optional)
  -- Beispiele: {"programming", "design", "business", "languages"}
  interests TEXT[],
  
  -- Erfahrungslevel (Standard: 'beginner')
  -- Werte: 'beginner', 'intermediate', 'advanced', 'expert'
  experience_level TEXT DEFAULT 'beginner' CHECK (experience_level IN ('beginner', 'intermediate', 'advanced', 'expert')),
  
  -- Bevorzugte Lernzeit (optional)
  -- Werte: 'morning', 'afternoon', 'evening', 'night', 'flexible'
  preferred_learning_time TEXT CHECK (preferred_learning_time IN ('morning', 'afternoon', 'evening', 'night', 'flexible')),
  
  -- Tägliches Lernziel in Minuten (Standard: 30)
  -- Beispiele: 15, 30, 60, 120 (Minuten pro Tag)
  daily_learning_goal_minutes INTEGER DEFAULT 30 CHECK (daily_learning_goal_minutes > 0),
  
  -- Wöchentliches Lernziel in Tagen (Standard: 5)
  -- Beispiele: 3, 5, 7 (Tage pro Woche)
  weekly_learning_goal_days INTEGER DEFAULT 5 CHECK (weekly_learning_goal_days >= 1 AND weekly_learning_goal_days <= 7),
  
  -- E-Mail Benachrichtigungen aktiviert (Standard: true)
  email_notifications BOOLEAN DEFAULT TRUE,
  
  -- Push Benachrichtigungen aktiviert (Standard: true)
  push_notifications BOOLEAN DEFAULT TRUE,
  
  -- Marketing E-Mails erlaubt (Standard: false)
  marketing_emails BOOLEAN DEFAULT FALSE,
  
  -- Profil öffentlich sichtbar (Standard: false)
  -- true = andere Benutzer können Profil sehen
  is_public BOOLEAN DEFAULT FALSE,
  
  -- Premium/Pro Mitgliedschaft (Standard: false)
  -- true = hat bezahlte Mitgliedschaft
  is_premium BOOLEAN DEFAULT FALSE,
  
  -- Premium Ablaufdatum (NULL = kein Premium oder lebenslang)
  premium_expires_at TIMESTAMP WITH TIME ZONE,
  
  -- Konto-Status (Standard: 'active')
  -- Werte: 'active', 'suspended', 'pending_verification'
  account_status TEXT DEFAULT 'active' CHECK (account_status IN ('active', 'suspended', 'pending_verification')),
  
  -- Letzter Login (automatisch aktualisiert)
  last_login_at TIMESTAMP WITH TIME ZONE,
  
  -- Letztes Profil-Update (automatisch aktualisiert)
  last_profile_update_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Konto verifiziert (Standard: false)
  -- true = E-Mail wurde verifiziert
  email_verified BOOLEAN DEFAULT FALSE,
  
  -- Telefonnummer (optional, für 2FA)
  -- Format: +49123456789
  phone_number TEXT,
  
  -- Telefon verifiziert (Standard: false)
  phone_verified BOOLEAN DEFAULT FALSE,
  
  -- Zwei-Faktor-Authentifizierung aktiviert (Standard: false)
  two_factor_enabled BOOLEAN DEFAULT FALSE,
  
  -- Bevorzugtes Theme (Standard: 'system')
  -- Werte: 'light', 'dark', 'system' (folgt Systemeinstellung)
  theme_preference TEXT DEFAULT 'system' CHECK (theme_preference IN ('light', 'dark', 'system')),
  
  -- Zusätzliche Einstellungen als JSON (optional)
  -- Kann benutzerdefinierte Präferenzen enthalten
  -- Beispiel: {"notifications": {"daily_reminder": true}, "accessibility": {"high_contrast": false}}
  settings JSONB DEFAULT '{}',
  
  -- Soziale Media Links als JSON (optional)
  -- Beispiel: {"linkedin": "linkedin.com/in/user", "github": "github.com/user"}
  social_links JSONB DEFAULT '{}',
  
  -- Profil-Erstellungsdatum (automatisch gesetzt)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Letzte Aktualisierung des Profils (automatisch aktualisiert)
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- USER_EXPERIENCES TABLE - Benutzer Erfahrungen in Lernbereichen
-- =====================================================
CREATE TABLE user_experiences (
  -- Eindeutige Erfahrungs-ID
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Referenz zum Benutzer
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Lernbereich/Fachgebiet (Pflichtfeld)
  -- Beispiele: "Programming", "Languages", "Business", "Mathematics", "Design", "Science"
  subject_area TEXT NOT NULL,
  
  -- Spezifischer Bereich innerhalb des Hauptgebiets (optional)
  -- Beispiele für Programming: "JavaScript", "Python", "Web Development"
  -- Beispiele für Languages: "English", "German", "Spanish"
  -- Beispiele für Business: "Marketing", "Finance", "Management"
  specific_area TEXT,
  
  -- Erfahrungslevel in diesem Bereich (Pflichtfeld)
  -- Werte: 'beginner', 'intermediate', 'advanced', 'expert'
  experience_level TEXT NOT NULL CHECK (experience_level IN ('beginner', 'intermediate', 'advanced', 'expert')),
  
  -- Lernziele für diesen Bereich (optional)
  -- Einmalig eingegebener Text mit den Zielen des Users
  -- Beispiele: "Ich möchte eine mobile App entwickeln", "Fließend Spanisch sprechen"
  learning_goals TEXT,
  
  -- Zusätzliche Beschreibung der Erfahrung (optional)
  -- Was der User bereits kann oder gelernt hat
  -- Beispiele: "2 Jahre Berufserfahrung", "Autodidakt seit 6 Monaten"
  experience_description TEXT,
  
  -- Ist dies ein Hauptinteresse/Fokusbereich? (Standard: false)
  -- true = User konzentriert sich besonders auf diesen Bereich
  is_primary_focus BOOLEAN DEFAULT FALSE,
  
  -- Wie wichtig ist dieser Bereich für den User? (1-5, Standard: 3)
  -- 1 = wenig wichtig, 3 = neutral, 5 = sehr wichtig
  importance_level INTEGER DEFAULT 3 CHECK (importance_level >= 1 AND importance_level <= 5),
  
  -- Gewünschte Lernintensität für diesen Bereich (Standard: 'medium')
  -- Werte: 'low', 'medium', 'high', 'intensive'
  desired_intensity TEXT DEFAULT 'medium' CHECK (desired_intensity IN ('low', 'medium', 'high', 'intensive')),
  
  -- Zeitrahmen für die Lernziele (optional)
  -- Beispiele: "3 Monate", "1 Jahr", "langfristig"
  target_timeframe TEXT,
  
  -- Bevorzugte Lernmethoden für diesen Bereich (optional)
  -- Array von Methoden
  -- Beispiele: {"video_courses", "books", "practice_projects", "mentoring"}
  preferred_methods TEXT[],
  
  -- Status der Lernziele (Standard: 'active')
  -- Werte: 'active' (aktiv verfolgt), 'paused' (pausiert), 'completed' (erreicht), 'abandoned' (aufgegeben)
  goal_status TEXT DEFAULT 'active' CHECK (goal_status IN ('active', 'paused', 'completed', 'abandoned')),
  
  -- Datum der letzten Aktualisierung der Ziele
  -- Wird gesetzt wenn User seine Ziele überarbeitet
  goals_last_updated_at TIMESTAMP WITH TIME ZONE,
  
  -- Fortschritt zu den Lernzielen in Prozent (0-100, optional)
  -- Selbsteinschätzung des Users
  progress_percentage INTEGER CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  
  -- Notizen und Reflexionen (optional)
  -- Persönliche Gedanken, Herausforderungen, Erfolge
  notes TEXT,
  
  -- Erstellungsdatum der Erfahrung
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Letzte Aktualisierung
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ein User kann nur eine Erfahrung pro Hauptbereich + spezifischem Bereich haben
  UNIQUE(user_id, subject_area, specific_area)
);

-- =====================================================
-- COURSES TABLE - Kurse Informationen
-- =====================================================
CREATE TABLE courses (
  -- Eindeutige Kurs-ID (UUID für globale Eindeutigkeit)
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Kurstitel (Pflichtfeld)
  -- Beispiele: "React Grundlagen", "Python für Anfänger"
  title TEXT NOT NULL,
  
  -- Detaillierte Kursbeschreibung (optional)
  -- Kann HTML/Markdown enthalten für Formatierung
  description TEXT,
  
  -- Name des Kursleiters/Instructors (Pflichtfeld)
  -- Beispiele: "Dr. Maria Schmidt", "John Doe"
  instructor TEXT NOT NULL,
  
  -- Kurs-Kategorie (Pflichtfeld)
  -- Beispiele: "Programming", "Design", "Business", "Language"
  category TEXT NOT NULL,
  
  -- URL zum Kursbild/Thumbnail (optional)
  -- Format: https://example.com/image.jpg
  thumbnail_url TEXT,
  
  -- Aktueller Preis in EUR (optional, NULL = kostenlos)
  -- Beispiele: 29.99, 99.00, NULL (kostenlos)
  price DECIMAL(10,2),
  
  -- Ursprünglicher Preis vor Rabatt (optional)
  -- Wird für Rabattanzeige verwendet
  original_price DECIMAL(10,2),
  
  -- Durchschnittliche Bewertung (0.00 - 5.00)
  -- Beispiele: 4.5, 3.8, NULL (noch keine Bewertungen)
  rating DECIMAL(3,2),
  
  -- Anzahl der Bewertungen (Standard: 0)
  -- Wird automatisch aktualisiert bei neuen Reviews
  review_count INTEGER DEFAULT 0,
  
  -- Kursdauer als Text (flexible Eingabe)
  -- Beispiele: "4 Wochen", "12 Stunden", "3 Monate"
  duration TEXT,
  
  -- Schwierigkeitsgrad (3 mögliche Werte)
  -- Werte: 'Beginner', 'Intermediate', 'Advanced'
  difficulty TEXT CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
  
  -- Anzahl eingeschriebener Studenten (Standard: 0)
  -- Wird automatisch bei Enrollment aktualisiert
  enrollment_count INTEGER DEFAULT 0,
  
  -- Bestseller-Status (true/false, Standard: false)
  -- Wird manuell oder automatisch basierend auf Verkaufszahlen gesetzt
  is_bestseller BOOLEAN DEFAULT FALSE,
  
  -- Tags/Schlagwörter als Array (optional)
  -- Beispiele: {"javascript", "frontend", "react"}
  tags TEXT[],
  
  -- Unterrichtssprache (Standard: 'English')
  -- Beispiele: 'English', 'German', 'Spanish', 'French'
  language TEXT DEFAULT 'English',
  
  -- Erstellungsdatum (automatisch gesetzt)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Letzte Aktualisierung (automatisch aktualisiert)
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- ENROLLMENTS TABLE - Kurseinschreibungen
-- =====================================================
CREATE TABLE enrollments (
  -- Eindeutige Einschreibungs-ID
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Referenz zum Benutzer (aus Supabase Auth)
  -- Wird gelöscht wenn Benutzer gelöscht wird (CASCADE)
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Referenz zum Kurs
  -- Wird gelöscht wenn Kurs gelöscht wird (CASCADE)
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  
  -- Einschreibungsdatum (automatisch gesetzt)
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Abschlussdatum (NULL = noch nicht abgeschlossen)
  -- Wird gesetzt wenn Kurs zu 100% abgeschlossen ist
  completed_at TIMESTAMP WITH TIME ZONE,
  
  -- Fortschritt in Prozent (0-100)
  -- 0 = gerade angefangen, 100 = vollständig abgeschlossen
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  
  -- Aktuelle Lektion/Kapitel (Standard: 1)
  -- Zeigt an, welche Lektion der Student gerade bearbeitet
  current_lesson INTEGER DEFAULT 1,
  
  -- Gesamtzahl der Lektionen im Kurs (Standard: 1)
  -- Wird beim Erstellen des Kurses gesetzt
  total_lessons INTEGER DEFAULT 1,
  
  -- Letzter Zugriff auf den Kurs (automatisch aktualisiert)
  -- Wird bei jedem Kursbesuch aktualisiert
  last_accessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ein Benutzer kann sich nur einmal pro Kurs einschreiben
  UNIQUE(user_id, course_id)
);

-- =====================================================
-- LEARNING_SESSIONS TABLE - Tägliche Lernsitzungen
-- =====================================================
CREATE TABLE learning_sessions (
  -- Eindeutige Sitzungs-ID
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Referenz zum Benutzer
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Referenz zum Kurs (optional - kann kursübergreifend sein)
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  
  -- Lerndatum (nur Datum, keine Zeit)
  -- Format: YYYY-MM-DD (z.B. 2024-01-15)
  session_date DATE NOT NULL,
  
  -- Lerndauer in Minuten (Standard: 0)
  -- Beispiele: 30, 60, 120 (für 0.5h, 1h, 2h)
  duration_minutes INTEGER DEFAULT 0,
  
  -- Anzahl abgeschlossener Aktivitäten (Standard: 0)
  -- Kann Lektionen, Quizzes, Übungen etc. umfassen
  activities_completed INTEGER DEFAULT 0,
  
  -- Notizen zur Lernsitzung (optional)
  -- Kann Zusammenfassungen, Fragen, Erkenntnisse enthalten
  notes TEXT,
  
  -- Erstellungsdatum der Sitzung
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Letzte Aktualisierung der Sitzung
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ein Benutzer kann nur eine Sitzung pro Kurs pro Tag haben
  UNIQUE(user_id, course_id, session_date)
);

-- =====================================================
-- USER_LEARNING_STATS TABLE - Benutzer Lernstatistiken
-- =====================================================
CREATE TABLE user_learning_stats (
  -- Eindeutige Statistik-ID
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Referenz zum Benutzer (eindeutig - nur eine Statistik pro Benutzer)
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  
  -- Gesamtzahl der Lerntage (Standard: 0)
  -- Wird automatisch hochgezählt bei neuen Lernsitzungen
  total_learning_days INTEGER DEFAULT 0,
  
  -- Aktuelle Lernstreak in Tagen (Standard: 0)
  -- Anzahl aufeinanderfolgender Lerntage bis heute
  current_streak INTEGER DEFAULT 0,
  
  -- Längste jemals erreichte Lernstreak (Standard: 0)
  -- Rekord für Motivation und Gamification
  longest_streak INTEGER DEFAULT 0,
  
  -- Gesamte Studienzeit in Minuten (Standard: 0)
  -- Summe aller duration_minutes aus learning_sessions
  total_study_time_minutes INTEGER DEFAULT 0,
  
  -- Anzahl vollständig abgeschlossener Kurse (Standard: 0)
  -- Basiert auf enrollments mit completed_at != NULL
  courses_completed INTEGER DEFAULT 0,
  
  -- Anzahl erstellter Lernkarten (Standard: 0)
  -- Wird bei Erstellung neuer Flashcards erhöht
  flashcards_created INTEGER DEFAULT 0,
  
  -- Datum des letzten Lernens (NULL = noch nie gelernt)
  -- Wird für Streak-Berechnung verwendet
  last_learning_date DATE,
  
  -- Erstellungsdatum der Statistiken
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Letzte Aktualisierung der Statistiken
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- FLASHCARDS TABLE - Lernkarten
-- =====================================================
CREATE TABLE flashcards (
  -- Eindeutige Lernkarten-ID
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Ersteller der Lernkarte
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Zugehöriger Kurs (optional - kann kursunabhängig sein)
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  
  -- Titel/Name der Lernkarte (Pflichtfeld)
  -- Beispiele: "JavaScript Funktionen", "Deutsche Vokabeln"
  title TEXT NOT NULL,
  
  -- Vorderseite der Karte (Frage/Begriff) (Pflichtfeld)
  -- Kann Text, HTML oder Markdown enthalten
  front_content TEXT NOT NULL,
  
  -- Rückseite der Karte (Antwort/Definition) (Pflichtfeld)
  -- Kann Text, HTML oder Markdown enthalten
  back_content TEXT NOT NULL,
  
  -- Kartentyp (Standard: 'basic')
  -- Werte: 'basic' (einfach), 'cloze' (Lückentext), 'multiple_choice' (Multiple Choice)
  card_type TEXT DEFAULT 'basic' CHECK (card_type IN ('basic', 'cloze', 'multiple_choice')),
  
  -- Schwierigkeitsgrad (1-5, Standard: 1)
  -- 1 = sehr einfach, 2 = einfach, 3 = mittel, 4 = schwer, 5 = sehr schwer
  difficulty_level INTEGER DEFAULT 1 CHECK (difficulty_level >= 1 AND difficulty_level <= 5),
  
  -- Tags/Kategorien als Array (optional)
  -- Beispiele: {"vocabulary", "grammar"}, {"functions", "syntax"}
  tags TEXT[],
  
  -- Favorit-Status (true/false, Standard: false)
  -- Für schnellen Zugriff auf wichtige Karten
  is_favorite BOOLEAN DEFAULT FALSE,
  
  -- Erstellungsdatum
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Letzte Aktualisierung
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- FLASHCARD_REVIEWS TABLE - Lernkarten Wiederholungen
-- =====================================================
CREATE TABLE flashcard_reviews (
  -- Eindeutige Review-ID
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Benutzer der die Wiederholung durchführt
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Referenz zur Lernkarte
  flashcard_id UUID REFERENCES flashcards(id) ON DELETE CASCADE,
  
  -- Datum und Zeit der Wiederholung
  review_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ease Factor für Spaced Repetition (Standard: 2.50)
  -- Bereich: 1.30 - 2.50+, bestimmt wie schnell Intervalle wachsen
  ease_factor DECIMAL(3,2) DEFAULT 2.50,
  
  -- Aktuelles Wiederholungsintervall in Tagen (Standard: 1)
  -- Beispiele: 1, 3, 7, 14, 30 (Tage bis zur nächsten Wiederholung)
  interval_days INTEGER DEFAULT 1,
  
  -- Anzahl bisheriger Wiederholungen (Standard: 0)
  -- Wird bei jeder erfolgreichen Wiederholung erhöht
  repetitions INTEGER DEFAULT 0,
  
  -- Qualität der Antwort (0-5)
  -- 0 = falsch/vergessen, 1 = schwer/unsicher, 2 = schwer/richtig, 
  -- 3 = normal, 4 = leicht, 5 = sehr leicht
  quality INTEGER CHECK (quality >= 0 AND quality <= 5),
  
  -- Antwortzeit in Sekunden (optional)
  -- Kann für Lernanalysen verwendet werden
  response_time_seconds INTEGER,
  
  -- Datum der nächsten geplanten Wiederholung
  -- Wird basierend auf Spaced Repetition Algorithmus berechnet
  next_review_date DATE,
  
  -- War die Antwort korrekt? (true/false)
  -- Vereinfachte Bewertung zusätzlich zur Qualität
  is_correct BOOLEAN,
  
  -- Erstellungsdatum des Reviews
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- COURSE_CONVERSATIONS TABLE - Kurs-Chat Gespräche
-- =====================================================
CREATE TABLE course_conversations (
  -- Eindeutige Gesprächs-ID
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Benutzer der das Gespräch führt
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Kurs zu dem das Gespräch gehört
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  
  -- Titel des Gesprächs (Pflichtfeld)
  -- Beispiele: "Fragen zu Kapitel 3", "JavaScript Debugging Hilfe"
  conversation_title TEXT NOT NULL,
  
  -- Hauptthema des Gesprächs (optional)
  -- Beispiele: "Arrays", "CSS Flexbox", "React Hooks"
  conversation_topic TEXT,
  
  -- Ist das Gespräch aktiv? (Standard: true)
  -- false = archiviert/beendet, true = aktiv
  is_active BOOLEAN DEFAULT TRUE,
  
  -- Anzahl Nachrichten im Gespräch (Standard: 0)
  -- Wird automatisch durch Trigger aktualisiert
  message_count INTEGER DEFAULT 0,
  
  -- Zeitpunkt der letzten Nachricht (Standard: jetzt)
  -- Wird für Sortierung der Gespräche verwendet
  last_message_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Erstellungsdatum des Gesprächs
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Letzte Aktualisierung des Gesprächs
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- CHAT_MESSAGES TABLE - Chat Nachrichten
-- =====================================================
CREATE TABLE chat_messages (
  -- Eindeutige Nachrichten-ID
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Referenz zum Gespräch
  conversation_id UUID REFERENCES course_conversations(id) ON DELETE CASCADE,
  
  -- Typ des Absenders (Pflichtfeld)
  -- Werte: 'user' (Benutzer), 'ai' (KI-Assistent)
  sender_type TEXT NOT NULL CHECK (sender_type IN ('user', 'ai')),
  
  -- Inhalt der Nachricht (Pflichtfeld)
  -- Kann Text, Markdown oder HTML enthalten
  message_content TEXT NOT NULL,
  
  -- Typ der Nachricht (Standard: 'text')
  -- Werte: 'text' (Text), 'image' (Bild), 'file' (Datei), 'code' (Code-Block)
  message_type TEXT DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'file', 'code')),
  
  -- Zusätzliche Metadaten als JSON (optional)
  -- Kann Dateiinfos, Formatierung, Attachments etc. enthalten
  -- Beispiel: {"file_name": "test.pdf", "file_size": 1024}
  metadata JSONB,
  
  -- Wurde die Nachricht bearbeitet? (Standard: false)
  is_edited BOOLEAN DEFAULT FALSE,
  
  -- Zeitpunkt der Bearbeitung (NULL = nie bearbeitet)
  edited_at TIMESTAMP WITH TIME ZONE,
  
  -- Sendezeitpunkt (automatisch gesetzt)
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Empfangszeitpunkt (Standard: sofort)
  -- Kann für Latenz-Messung verwendet werden
  received_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Lesezeitpunkt (NULL = noch nicht gelesen)
  -- Wird gesetzt wenn Benutzer die Nachricht sieht
  read_at TIMESTAMP WITH TIME ZONE,
  
  -- Erstellungsdatum der Nachricht
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- Create Indexes for Performance
-- =====================================================

CREATE INDEX idx_user_profiles_username ON user_profiles(username);
CREATE INDEX idx_user_profiles_country ON user_profiles(country);
CREATE INDEX idx_user_profiles_interests ON user_profiles USING GIN(interests);
CREATE INDEX idx_user_profiles_is_premium ON user_profiles(is_premium);
CREATE INDEX idx_user_experiences_user_id ON user_experiences(user_id);
CREATE INDEX idx_user_experiences_subject_area ON user_experiences(subject_area);
CREATE INDEX idx_user_experiences_experience_level ON user_experiences(experience_level);
CREATE INDEX idx_user_experiences_is_primary_focus ON user_experiences(is_primary_focus);
CREATE INDEX idx_user_experiences_goal_status ON user_experiences(goal_status);
CREATE INDEX idx_user_experiences_preferred_methods ON user_experiences USING GIN(preferred_methods);
CREATE INDEX idx_enrollments_user_id ON enrollments(user_id);
CREATE INDEX idx_enrollments_course_id ON enrollments(course_id);
CREATE INDEX idx_learning_sessions_user_date ON learning_sessions(user_id, session_date);
CREATE INDEX idx_learning_sessions_course_id ON learning_sessions(course_id);
CREATE INDEX idx_flashcards_user_id ON flashcards(user_id);
CREATE INDEX idx_flashcards_course_id ON flashcards(course_id);
CREATE INDEX idx_flashcard_reviews_user_id ON flashcard_reviews(user_id);
CREATE INDEX idx_flashcard_reviews_next_review ON flashcard_reviews(next_review_date);
CREATE INDEX idx_course_conversations_user_id ON course_conversations(user_id);
CREATE INDEX idx_course_conversations_course_id ON course_conversations(course_id);
CREATE INDEX idx_chat_messages_conversation_id ON chat_messages(conversation_id);
CREATE INDEX idx_chat_messages_sent_at ON chat_messages(sent_at);

-- =====================================================
-- Enable Row Level Security (RLS)
-- =====================================================

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_learning_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE flashcards ENABLE ROW LEVEL SECURITY;
ALTER TABLE flashcard_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- RLS Policies
-- =====================================================

-- User profiles policies
CREATE POLICY "Users can view their own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can view public profiles" ON user_profiles
  FOR SELECT USING (is_public = true);

CREATE POLICY "Users can insert their own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

-- User experiences policies
CREATE POLICY "Users can manage their own experiences" ON user_experiences
  FOR ALL USING (auth.uid() = user_id);

-- Courses policies
CREATE POLICY "Courses are viewable by everyone" ON courses
  FOR SELECT USING (true);

-- Enrollments policies
CREATE POLICY "Users can view their own enrollments" ON enrollments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own enrollments" ON enrollments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own enrollments" ON enrollments
  FOR UPDATE USING (auth.uid() = user_id);

-- Learning sessions policies
CREATE POLICY "Users can manage their own learning sessions" ON learning_sessions
  FOR ALL USING (auth.uid() = user_id);

-- User learning stats policies
CREATE POLICY "Users can manage their own learning stats" ON user_learning_stats
  FOR ALL USING (auth.uid() = user_id);

-- Flashcards policies
CREATE POLICY "Users can manage their own flashcards" ON flashcards
  FOR ALL USING (auth.uid() = user_id);

-- Flashcard reviews policies
CREATE POLICY "Users can manage their own flashcard reviews" ON flashcard_reviews
  FOR ALL USING (auth.uid() = user_id);

-- Course conversations policies
CREATE POLICY "Users can manage their own conversations" ON course_conversations
  FOR ALL USING (auth.uid() = user_id);

-- Chat messages policies
CREATE POLICY "Users can view messages from their conversations" ON chat_messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM course_conversations 
      WHERE course_conversations.id = chat_messages.conversation_id 
      AND course_conversations.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert messages to their conversations" ON chat_messages
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM course_conversations 
      WHERE course_conversations.id = chat_messages.conversation_id 
      AND course_conversations.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their own messages" ON chat_messages
  FOR UPDATE USING (
    sender_type = 'user' AND
    EXISTS (
      SELECT 1 FROM course_conversations 
      WHERE course_conversations.id = chat_messages.conversation_id 
      AND course_conversations.user_id = auth.uid()
    )
  );

-- =====================================================
-- Functions and Triggers
-- =====================================================

-- Function to update learning stats
CREATE OR REPLACE FUNCTION update_learning_stats()
RETURNS TRIGGER AS $$
BEGIN
  -- Update or insert user learning stats
  INSERT INTO user_learning_stats (user_id, total_learning_days, last_learning_date, updated_at)
  VALUES (NEW.user_id, 1, NEW.session_date, NOW())
  ON CONFLICT (user_id) DO UPDATE SET
    total_learning_days = user_learning_stats.total_learning_days + 1,
    last_learning_date = NEW.session_date,
    updated_at = NOW();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for learning sessions
CREATE TRIGGER trigger_update_learning_stats
  AFTER INSERT ON learning_sessions
  FOR EACH ROW EXECUTE FUNCTION update_learning_stats();

-- Function to update conversation message count
CREATE OR REPLACE FUNCTION update_conversation_message_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE course_conversations 
  SET message_count = message_count + 1,
      last_message_at = NEW.sent_at,
      updated_at = NOW()
  WHERE id = NEW.conversation_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for chat messages
CREATE TRIGGER trigger_update_conversation_message_count
  AFTER INSERT ON chat_messages
  FOR EACH ROW EXECUTE FUNCTION update_conversation_message_count();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at columns
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_experiences_updated_at BEFORE UPDATE ON user_experiences FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_learning_sessions_updated_at BEFORE UPDATE ON learning_sessions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_learning_stats_updated_at BEFORE UPDATE ON user_learning_stats FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_flashcards_updated_at BEFORE UPDATE ON flashcards FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_course_conversations_updated_at BEFORE UPDATE ON course_conversations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- Create Initial Functions for User Profile Management
-- =====================================================

-- Function to create user profile automatically when user signs up
CREATE OR REPLACE FUNCTION create_user_profile()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_profiles (id, email_verified, created_at, updated_at)
  VALUES (NEW.id, NEW.email_confirmed_at IS NOT NULL, NOW(), NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to create profile when user signs up
CREATE TRIGGER trigger_create_user_profile
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION create_user_profile();

-- Function to update last_login_at when user logs in
CREATE OR REPLACE FUNCTION update_user_last_login()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.last_sign_in_at IS DISTINCT FROM NEW.last_sign_in_at THEN
    UPDATE user_profiles 
    SET last_login_at = NEW.last_sign_in_at,
        updated_at = NOW()
    WHERE id = NEW.id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update last login when user signs in
CREATE TRIGGER trigger_update_user_last_login
  AFTER UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION update_user_last_login();