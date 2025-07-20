import React, { useState } from 'react';
import { motion } from 'framer-motion';

import { SupabaseDebugger } from '../../utils/debugSupabase';
import { AuthService } from '../../lib/auth';
import Icon from 'components/AppIcon';

const DebugPage = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState(null);
  const [logs, setLogs] = useState([]);

  // Override console.log to capture logs
  const captureConsole = () => {
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;
    
    const logEntries = [];
    
    console.log = (...args) => {
      logEntries.push({ type: 'log', message: args.join(' '), timestamp: new Date() });
      originalLog(...args);
    };
    
    console.error = (...args) => {
      logEntries.push({ type: 'error', message: args.join(' '), timestamp: new Date() });
      originalError(...args);
    };
    
    console.warn = (...args) => {
      logEntries.push({ type: 'warn', message: args.join(' '), timestamp: new Date() });
      originalWarn(...args);
    };
    
    return () => {
      console.log = originalLog;
      console.error = originalError;
      console.warn = originalWarn;
      return logEntries;
    };
  };

  const runDiagnostic = async () => {
    setIsRunning(true);
    setLogs([]);
    setResults(null);
    
    const restoreConsole = captureConsole();
    
    try {
      const diagnosticResults = await SupabaseDebugger.runFullDiagnostic();
      const capturedLogs = restoreConsole();
      
      setResults(diagnosticResults);
      setLogs(capturedLogs);
    } catch (error) {
      const capturedLogs = restoreConsole();
      setLogs([...capturedLogs, { 
        type: 'error', 
        message: `Diagnostic failed: ${error.message}`, 
        timestamp: new Date() 
      }]);
    } finally {
      setIsRunning(false);
    }
  };

  const testEmailRegistration = async () => {
    const testEmail = `test-${Date.now()}@example.com`;
    const testPassword = 'Test123!@#';
    
    setIsRunning(true);
    const restoreConsole = captureConsole();
    
    try {
      console.log('🧪 Testing email registration...');
      
      const result = await AuthService.signUpWithEmail(testEmail, testPassword, {
        metadata: {
          full_name: 'Test User',
          subjects: ['testing'],
          experience_level: 'beginner',
          learning_goals: 'Test the registration system'
        }
      });
      
      if (result.error) {
        console.error('❌ Registration failed:', result.error.message);
      } else {
        console.log('✅ Registration successful');
        console.log('📧 Email verification required:', !result.data.session);
        console.log('👤 User ID:', result.data.user?.id);
      }
      
    } catch (error) {
      console.error('❌ Registration test error:', error.message);
    } finally {
      const capturedLogs = restoreConsole();
      setLogs(capturedLogs);
      setIsRunning(false);
    }
  };

  const clearLogs = () => {
    setLogs([]);
    setResults(null);
  };

  const getLogIcon = (type) => {
    switch (type) {
      case 'error': return '❌';
      case 'warn': return '⚠️';
      default: return 'ℹ️';
    }
  };

  const getLogColor = (type) => {
    switch (type) {
      case 'error': return 'text-red-600';
      case 'warn': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-gray-50 to-primary-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Settings" size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
            Supabase Debug Center
          </h1>
          <p className="text-text-secondary">
            Diagnose and test database connection and authentication issues
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <button
            onClick={runDiagnostic}
            disabled={isRunning}
            className="bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isRunning ? (
              <>
                <Icon name="Loader2" size={20} className="animate-spin mr-2" />
                Running Diagnostic...
              </>
            ) : (
              <>
                <Icon name="Search" size={20} className="mr-2" />
                Run Full Diagnostic
              </>
            )}
          </button>

          <button
            onClick={testEmailRegistration}
            disabled={isRunning}
            className="bg-secondary text-white py-3 px-6 rounded-lg hover:bg-secondary-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isRunning ? (
              <>
                <Icon name="Loader2" size={20} className="animate-spin mr-2" />
                Testing...
              </>
            ) : (
              <>
                <Icon name="Mail" size={20} className="mr-2" />
                Test Email Registration
              </>
            )}
          </button>

          <button
            onClick={clearLogs}
            className="bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors duration-200 font-medium flex items-center justify-center"
          >
            <Icon name="Trash2" size={20} className="mr-2" />
            Clear Logs
          </button>
        </motion.div>

        {/* Results Summary */}
        {results && (
          <motion.div 
            className="bg-surface rounded-xl shadow-lg border border-border p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-xl font-heading font-semibold text-text-primary mb-4 flex items-center">
              <Icon name="BarChart3" size={24} className="mr-2" />
              Diagnostic Results
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-text-secondary">Connection</span>
                  <span className={results.connection ? 'text-green-600' : 'text-red-600'}>
                    {results.connection ? '✅' : '❌'}
                  </span>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-text-secondary">Auth Config</span>
                  <span className={results.authConfig ? 'text-green-600' : 'text-red-600'}>
                    {results.authConfig ? '✅' : '❌'}
                  </span>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-text-secondary">Registration</span>
                  <span className={results.registration.success ? 'text-green-600' : 'text-red-600'}>
                    {results.registration.success ? '✅' : '❌'}
                  </span>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-text-secondary">Tables</span>
                  <span className="text-sm font-medium text-text-primary">
                    {Object.values(results.tables).filter(t => t.status === 'OK').length}/
                    {Object.keys(results.tables).length}
                  </span>
                </div>
              </div>
            </div>

            {/* Table Details */}
            {results.tables && (
              <div className="mt-6">
                <h3 className="text-lg font-medium text-text-primary mb-3">Database Tables Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {Object.entries(results.tables).map(([table, result]) => (
                    <div key={table} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded">
                      <span className="text-sm font-medium text-text-secondary">{table}</span>
                      <span className={`text-sm ${result.status === 'OK' ? 'text-green-600' : 'text-red-600'}`}>
                        {result.status === 'OK' ? '✅' : '❌'} {result.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Logs */}
        {logs.length > 0 && (
          <motion.div 
            className="bg-surface rounded-xl shadow-lg border border-border p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <h2 className="text-xl font-heading font-semibold text-text-primary mb-4 flex items-center">
              <Icon name="FileText" size={24} className="mr-2" />
              Debug Logs
            </h2>
            
            <div className="bg-gray-900 rounded-lg p-4 max-h-96 overflow-y-auto">
              {logs.map((log, index) => (
                <div key={index} className="mb-2 font-mono text-sm">
                  <span className="text-gray-400 text-xs">
                    {log.timestamp.toLocaleTimeString()}
                  </span>
                  <span className="ml-2">
                    <span className="text-yellow-400">{getLogIcon(log.type)}</span>
                    <span className={`ml-2 ${log.type === 'error' ? 'text-red-400' : log.type === 'warn' ? 'text-yellow-400' : 'text-green-400'}`}>
                      {log.message}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Quick Info */}
        <motion.div 
          className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <div className="flex items-start">
            <Icon name="Info" size={20} className="text-blue-600 mr-2 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-blue-800 mb-1">Debug Information</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Make sure Supabase local development is running: <code className="bg-blue-100 px-1 rounded">supabase start</code></li>
                <li>• Check that migrations are applied: <code className="bg-blue-100 px-1 rounded">supabase db reset</code></li>
                <li>• Verify environment variables in .env file</li>
                <li>• Check browser console for additional error details</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DebugPage; 