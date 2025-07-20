import { supabase } from '../lib/supabase';

/**
 * Debugging utility for Supabase database and authentication
 */
export class SupabaseDebugger {
  
  /**
   * Check overall Supabase connection and configuration
   */
  static async checkConnection() {
    console.log('🔍 Checking Supabase Connection...');
    
    try {
      // Test basic connection
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('❌ Supabase connection error:', error);
        return false;
      }
      
      console.log('✅ Supabase connection successful');
      console.log('📊 Current session:', data?.session ? 'Active' : 'None');
      
      return true;
    } catch (error) {
      console.error('❌ Supabase connection failed:', error);
      return false;
    }
  }

  /**
   * Check if required database tables exist
   */
  static async checkDatabaseTables() {
    console.log('\n🗄️ Checking Database Tables...');
    
    const requiredTables = [
      'user_profiles',
      'user_experiences',
      'courses',
      'enrollments',
      'learning_sessions',
      'user_learning_stats',
      'flashcards',
      'flashcard_reviews',
      'course_conversations',
      'chat_messages'
    ];

    const results = {};
    
    for (const table of requiredTables) {
      try {
        const { data, error } = await supabase
          .from(table)
          .select('*')
          .limit(1);
        
        if (error) {
          results[table] = { status: 'ERROR', message: error.message };
          console.log(`❌ ${table}: ${error.message}`);
        } else {
          results[table] = { status: 'OK', count: data?.length || 0 };
          console.log(`✅ ${table}: Accessible`);
        }
      } catch (err) {
        results[table] = { status: 'EXCEPTION', message: err.message };
        console.log(`⚠️ ${table}: ${err.message}`);
      }
    }
    
    return results;
  }

  /**
   * Check Supabase authentication configuration
   */
  static async checkAuthConfig() {
    console.log('\n🔐 Checking Authentication Configuration...');
    
    try {
      // Check environment variables
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      console.log('📋 Environment Variables:');
      console.log(`  VITE_SUPABASE_URL: ${supabaseUrl ? '✅ Set' : '❌ Missing'}`);
      console.log(`  VITE_SUPABASE_ANON_KEY: ${supabaseKey ? '✅ Set' : '❌ Missing'}`);
      
      if (!supabaseUrl || !supabaseKey) {
        console.error('❌ Missing required environment variables');
        return false;
      }
      
      // Check URL format
      if (!supabaseUrl.includes('supabase.co') && !supabaseUrl.includes('localhost')) {
        console.warn('⚠️ Supabase URL format seems unusual');
      }
      
      return true;
    } catch (error) {
      console.error('❌ Auth config check failed:', error);
      return false;
    }
  }

  /**
   * Test user registration process
   */
  static async testUserRegistration() {
    console.log('\n👤 Testing User Registration Process...');
    
    const testEmail = `debug-test-${Date.now()}@example.com`;
    const testPassword = 'DebugTest123!';
    
    try {
      // Step 1: Test signup
      console.log('📝 Testing signup...');
      const { data: signupData, error: signupError } = await supabase.auth.signUp({
        email: testEmail,
        password: testPassword,
        options: {
          data: {
            full_name: 'Debug Test User',
            test_registration: true
          }
        }
      });
      
      if (signupError) {
        console.error('❌ Signup failed:', signupError.message);
        return { success: false, error: signupError.message };
      }
      
      console.log('✅ Signup successful');
      console.log('📧 Email confirmation required:', !signupData.session);
      
      // Step 2: Check if user profile was created
      if (signupData.user) {
        console.log('🔍 Checking user profile creation...');
        
        // Wait for potential trigger
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const { data: profileData, error: profileError } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', signupData.user.id)
          .single();
        
        if (profileError) {
          console.error('❌ User profile not created:', profileError.message);
          console.log('💡 This indicates missing trigger or table permissions');
        } else {
          console.log('✅ User profile created successfully');
        }
        
        // Cleanup
        try {
          await supabase
            .from('user_profiles')
            .delete()
            .eq('id', signupData.user.id);
          console.log('🧹 Test data cleaned up');
        } catch (cleanupError) {
          console.warn('⚠️ Cleanup warning:', cleanupError.message);
        }
      }
      
      return { success: true, user: signupData.user };
      
    } catch (error) {
      console.error('❌ Registration test failed:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Check RLS (Row Level Security) policies
   */
  static async checkRLSPolicies() {
    console.log('\n🛡️ Checking RLS Policies...');
    
    const tables = ['user_profiles', 'courses', 'enrollments'];
    
    for (const table of tables) {
      try {
        // Try to access table without authentication
        const { data, error } = await supabase
          .from(table)
          .select('*')
          .limit(1);
        
        if (error && error.message.includes('policy')) {
          console.log(`✅ ${table}: RLS is active`);
        } else if (error) {
          console.log(`⚠️ ${table}: ${error.message}`);
        } else {
          console.log(`📊 ${table}: Accessible (${data?.length || 0} rows)`);
        }
      } catch (err) {
        console.log(`❌ ${table}: ${err.message}`);
      }
    }
  }

  /**
   * Test email verification process
   */
  static async testEmailVerification() {
    console.log('\n📧 Testing Email Verification...');
    
    try {
      // Check current user
      const { data: userData, error: userError } = await supabase.auth.getUser();
      
      if (userError || !userData.user) {
        console.log('ℹ️ No authenticated user for verification test');
        return;
      }
      
      console.log('👤 Current user:', userData.user.email);
      console.log('✉️ Email confirmed:', userData.user.email_confirmed_at ? 'Yes' : 'No');
      
      if (!userData.user.email_confirmed_at) {
        console.log('🔄 Testing resend verification...');
        
        const { data: resendData, error: resendError } = await supabase.auth.resend({
          type: 'signup',
          email: userData.user.email
        });
        
        if (resendError) {
          console.error('❌ Resend failed:', resendError.message);
        } else {
          console.log('✅ Verification email resent');
        }
      }
      
    } catch (error) {
      console.error('❌ Email verification test failed:', error);
    }
  }

  /**
   * Run comprehensive diagnostic
   */
  static async runFullDiagnostic() {
    console.log('🚀 Starting Supabase Full Diagnostic...\n');
    
    const results = {
      connection: await this.checkConnection(),
      authConfig: await this.checkAuthConfig(),
      tables: await this.checkDatabaseTables(),
      registration: await this.testUserRegistration(),
    };
    
    await this.checkRLSPolicies();
    await this.testEmailVerification();
    
    console.log('\n📋 Diagnostic Summary:');
    console.log('='.repeat(50));
    console.log(`Connection: ${results.connection ? '✅' : '❌'}`);
    console.log(`Auth Config: ${results.authConfig ? '✅' : '❌'}`);
    console.log(`Registration: ${results.registration.success ? '✅' : '❌'}`);
    
    // Table summary
    const tableResults = results.tables;
    const workingTables = Object.values(tableResults).filter(t => t.status === 'OK').length;
    const totalTables = Object.keys(tableResults).length;
    console.log(`Database Tables: ${workingTables}/${totalTables} working`);
    
    // Issues found
    const issues = [];
    if (!results.connection) issues.push('Supabase connection failed');
    if (!results.authConfig) issues.push('Auth configuration issues');
    if (!results.registration.success) issues.push('User registration problems');
    
    const failedTables = Object.entries(tableResults)
      .filter(([_, result]) => result.status !== 'OK')
      .map(([table, _]) => table);
    
    if (failedTables.length > 0) {
      issues.push(`Missing/broken tables: ${failedTables.join(', ')}`);
    }
    
    if (issues.length > 0) {
      console.log('\n🚨 Issues Found:');
      issues.forEach(issue => console.log(`  • ${issue}`));
      console.log('\n💡 Recommended Actions:');
      console.log('  1. Check if Supabase local development is running');
      console.log('  2. Verify database migrations are applied');
      console.log('  3. Check environment variables in .env file');
      console.log('  4. Review RLS policies and triggers');
    } else {
      console.log('\n🎉 All systems working correctly!');
    }
    
    return results;
  }
}

// Export helper function for easy debugging
export const debugSupabase = () => SupabaseDebugger.runFullDiagnostic(); 