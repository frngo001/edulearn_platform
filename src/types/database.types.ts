Need to install the following packages:
supabase@2.24.3
Ok to proceed? (y) 
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      chat_messages: {
        Row: {
          conversation_id: string | null
          created_at: string | null
          edited_at: string | null
          id: string
          is_edited: boolean | null
          message_content: string
          message_type: string | null
          metadata: Json | null
          read_at: string | null
          received_at: string | null
          sender_type: string
          sent_at: string | null
        }
        Insert: {
          conversation_id?: string | null
          created_at?: string | null
          edited_at?: string | null
          id?: string
          is_edited?: boolean | null
          message_content: string
          message_type?: string | null
          metadata?: Json | null
          read_at?: string | null
          received_at?: string | null
          sender_type: string
          sent_at?: string | null
        }
        Update: {
          conversation_id?: string | null
          created_at?: string | null
          edited_at?: string | null
          id?: string
          is_edited?: boolean | null
          message_content?: string
          message_type?: string | null
          metadata?: Json | null
          read_at?: string | null
          received_at?: string | null
          sender_type?: string
          sent_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "course_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      course_conversations: {
        Row: {
          conversation_title: string
          conversation_topic: string | null
          course_id: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          last_message_at: string | null
          message_count: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          conversation_title: string
          conversation_topic?: string | null
          course_id?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          last_message_at?: string | null
          message_count?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          conversation_title?: string
          conversation_topic?: string | null
          course_id?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          last_message_at?: string | null
          message_count?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_conversations_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          difficulty: string | null
          duration: string | null
          enrollment_count: number | null
          id: string
          instructor: string
          is_bestseller: boolean | null
          language: string | null
          original_price: number | null
          price: number | null
          rating: number | null
          review_count: number | null
          tags: string[] | null
          thumbnail_url: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          difficulty?: string | null
          duration?: string | null
          enrollment_count?: number | null
          id?: string
          instructor: string
          is_bestseller?: boolean | null
          language?: string | null
          original_price?: number | null
          price?: number | null
          rating?: number | null
          review_count?: number | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          difficulty?: string | null
          duration?: string | null
          enrollment_count?: number | null
          id?: string
          instructor?: string
          is_bestseller?: boolean | null
          language?: string | null
          original_price?: number | null
          price?: number | null
          rating?: number | null
          review_count?: number | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      enrollments: {
        Row: {
          completed_at: string | null
          course_id: string | null
          current_lesson: number | null
          enrolled_at: string | null
          id: string
          last_accessed_at: string | null
          progress: number | null
          total_lessons: number | null
          user_id: string | null
        }
        Insert: {
          completed_at?: string | null
          course_id?: string | null
          current_lesson?: number | null
          enrolled_at?: string | null
          id?: string
          last_accessed_at?: string | null
          progress?: number | null
          total_lessons?: number | null
          user_id?: string | null
        }
        Update: {
          completed_at?: string | null
          course_id?: string | null
          current_lesson?: number | null
          enrolled_at?: string | null
          id?: string
          last_accessed_at?: string | null
          progress?: number | null
          total_lessons?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      flashcard_reviews: {
        Row: {
          created_at: string | null
          ease_factor: number | null
          flashcard_id: string | null
          id: string
          interval_days: number | null
          is_correct: boolean | null
          next_review_date: string | null
          quality: number | null
          repetitions: number | null
          response_time_seconds: number | null
          review_date: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          ease_factor?: number | null
          flashcard_id?: string | null
          id?: string
          interval_days?: number | null
          is_correct?: boolean | null
          next_review_date?: string | null
          quality?: number | null
          repetitions?: number | null
          response_time_seconds?: number | null
          review_date?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          ease_factor?: number | null
          flashcard_id?: string | null
          id?: string
          interval_days?: number | null
          is_correct?: boolean | null
          next_review_date?: string | null
          quality?: number | null
          repetitions?: number | null
          response_time_seconds?: number | null
          review_date?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "flashcard_reviews_flashcard_id_fkey"
            columns: ["flashcard_id"]
            isOneToOne: false
            referencedRelation: "flashcards"
            referencedColumns: ["id"]
          },
        ]
      }
      flashcards: {
        Row: {
          back_content: string
          card_type: string | null
          course_id: string | null
          created_at: string | null
          difficulty_level: number | null
          front_content: string
          id: string
          is_favorite: boolean | null
          tags: string[] | null
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          back_content: string
          card_type?: string | null
          course_id?: string | null
          created_at?: string | null
          difficulty_level?: number | null
          front_content: string
          id?: string
          is_favorite?: boolean | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          back_content?: string
          card_type?: string | null
          course_id?: string | null
          created_at?: string | null
          difficulty_level?: number | null
          front_content?: string
          id?: string
          is_favorite?: boolean | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "flashcards_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      learning_sessions: {
        Row: {
          activities_completed: number | null
          course_id: string | null
          created_at: string | null
          duration_minutes: number | null
          id: string
          notes: string | null
          session_date: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          activities_completed?: number | null
          course_id?: string | null
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          notes?: string | null
          session_date: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          activities_completed?: number | null
          course_id?: string | null
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          notes?: string | null
          session_date?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "learning_sessions_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      user_experiences: {
        Row: {
          created_at: string | null
          desired_intensity: string | null
          experience_description: string | null
          experience_level: string
          goal_status: string | null
          goals_last_updated_at: string | null
          id: string
          importance_level: number | null
          is_primary_focus: boolean | null
          learning_goals: string | null
          notes: string | null
          preferred_methods: string[] | null
          progress_percentage: number | null
          specific_area: string | null
          subject_area: string
          target_timeframe: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          desired_intensity?: string | null
          experience_description?: string | null
          experience_level: string
          goal_status?: string | null
          goals_last_updated_at?: string | null
          id?: string
          importance_level?: number | null
          is_primary_focus?: boolean | null
          learning_goals?: string | null
          notes?: string | null
          preferred_methods?: string[] | null
          progress_percentage?: number | null
          specific_area?: string | null
          subject_area: string
          target_timeframe?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          desired_intensity?: string | null
          experience_description?: string | null
          experience_level?: string
          goal_status?: string | null
          goals_last_updated_at?: string | null
          id?: string
          importance_level?: number | null
          is_primary_focus?: boolean | null
          learning_goals?: string | null
          notes?: string | null
          preferred_methods?: string[] | null
          progress_percentage?: number | null
          specific_area?: string | null
          subject_area?: string
          target_timeframe?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_learning_stats: {
        Row: {
          courses_completed: number | null
          created_at: string | null
          current_streak: number | null
          flashcards_created: number | null
          id: string
          last_learning_date: string | null
          longest_streak: number | null
          total_learning_days: number | null
          total_study_time_minutes: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          courses_completed?: number | null
          created_at?: string | null
          current_streak?: number | null
          flashcards_created?: number | null
          id?: string
          last_learning_date?: string | null
          longest_streak?: number | null
          total_learning_days?: number | null
          total_study_time_minutes?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          courses_completed?: number | null
          created_at?: string | null
          current_streak?: number | null
          flashcards_created?: number | null
          id?: string
          last_learning_date?: string | null
          longest_streak?: number | null
          total_learning_days?: number | null
          total_study_time_minutes?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          account_status: string | null
          avatar_url: string | null
          bio: string | null
          city: string | null
          country: string | null
          created_at: string | null
          daily_learning_goal_minutes: number | null
          date_of_birth: string | null
          education_level: string | null
          email: string | null
          email_notifications: boolean | null
          email_verified: boolean | null
          experience_level: string | null
          full_name: string | null
          gender: string | null
          id: string
          interests: string[] | null
          is_premium: boolean | null
          is_public: boolean | null
          last_login_at: string | null
          last_profile_update_at: string | null
          learning_goals: string[] | null
          marketing_emails: boolean | null
          occupation: string | null
          phone_number: string | null
          phone_verified: boolean | null
          preferred_language: string | null
          preferred_learning_time: string | null
          premium_expires_at: string | null
          push_notifications: boolean | null
          settings: Json | null
          social_links: Json | null
          theme_preference: string | null
          timezone: string | null
          two_factor_enabled: boolean | null
          updated_at: string | null
          username: string | null
          weekly_learning_goal_days: number | null
        }
        Insert: {
          account_status?: string | null
          avatar_url?: string | null
          bio?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          daily_learning_goal_minutes?: number | null
          date_of_birth?: string | null
          education_level?: string | null
          email?: string | null
          email_notifications?: boolean | null
          email_verified?: boolean | null
          experience_level?: string | null
          full_name?: string | null
          gender?: string | null
          id: string
          interests?: string[] | null
          is_premium?: boolean | null
          is_public?: boolean | null
          last_login_at?: string | null
          last_profile_update_at?: string | null
          learning_goals?: string[] | null
          marketing_emails?: boolean | null
          occupation?: string | null
          phone_number?: string | null
          phone_verified?: boolean | null
          preferred_language?: string | null
          preferred_learning_time?: string | null
          premium_expires_at?: string | null
          push_notifications?: boolean | null
          settings?: Json | null
          social_links?: Json | null
          theme_preference?: string | null
          timezone?: string | null
          two_factor_enabled?: boolean | null
          updated_at?: string | null
          username?: string | null
          weekly_learning_goal_days?: number | null
        }
        Update: {
          account_status?: string | null
          avatar_url?: string | null
          bio?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          daily_learning_goal_minutes?: number | null
          date_of_birth?: string | null
          education_level?: string | null
          email?: string | null
          email_notifications?: boolean | null
          email_verified?: boolean | null
          experience_level?: string | null
          full_name?: string | null
          gender?: string | null
          id?: string
          interests?: string[] | null
          is_premium?: boolean | null
          is_public?: boolean | null
          last_login_at?: string | null
          last_profile_update_at?: string | null
          learning_goals?: string[] | null
          marketing_emails?: boolean | null
          occupation?: string | null
          phone_number?: string | null
          phone_verified?: boolean | null
          preferred_language?: string | null
          preferred_learning_time?: string | null
          premium_expires_at?: string | null
          push_notifications?: boolean | null
          settings?: Json | null
          social_links?: Json | null
          theme_preference?: string | null
          timezone?: string | null
          two_factor_enabled?: boolean | null
          updated_at?: string | null
          username?: string | null
          weekly_learning_goal_days?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
