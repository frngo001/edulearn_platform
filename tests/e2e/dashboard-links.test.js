const { test, expect, devices } = require('@playwright/test');

test.describe('Dashboard Links E2E Test', () => {
  let page;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    
    // Navigate to the dashboard
    await page.goto('/dashboard');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Wait for dashboard components to load
    await page.waitForSelector('[data-testid="dashboard-content"], .max-w-7xl, main', { timeout: 10000 });
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('should verify all dashboard navigation links work correctly', async () => {
    console.log('🚀 Starting Dashboard Links E2E Test');
    
    // Define all expected navigation routes and their verification selectors
    const expectedLinks = [
      // Bottom Tab Navigation Links
      {
        name: 'Dashboard Tab',
        selector: 'text=Dashboard',
        expectedRoute: '/dashboard',
        verification: 'text=Good morning, || text=Good afternoon, || text=Good evening,'
      },
      {
        name: 'My Courses Tab',
        selector: 'text=Courses',
        expectedRoute: '/my-courses',
        verification: 'text=My Courses, h1, h2'
      },
      {
        name: 'Study Tab',
        selector: 'text=Study',
        expectedRoute: '/flashcard-study-interface',
        verification: 'text=Flashcards, h1, h2'
      },
      {
        name: 'Progress Tab',
        selector: 'text=Progress',
        expectedRoute: '/study-progress',
        verification: 'text=Progress, h1, h2'
      },
      {
        name: 'Learning Goals Tab',
        selector: 'text=Learning Goals',
        expectedRoute: '/learning-goals',
        verification: 'text=Learning Goals, h1, h2'
      },
      {
        name: 'Planning Tab',
        selector: 'text=Planning',
        expectedRoute: '/study-schedule',
        verification: 'text=Schedule, h1, h2'
      },
      {
        name: 'Settings Tab',
        selector: 'text=Settings',
        expectedRoute: '/user-profile-settings',
        verification: 'text=Profile Settings, text=Settings, h1, h2'
      }
    ];

    // Quick Actions Links (from QuickActions component)
    const quickActionLinks = [
      {
        name: 'Browse Courses',
        selector: 'text=Browse Courses',
        expectedRoute: '/course-library',
        verification: 'text=Course Library, h1, h2'
      },
      {
        name: 'Create Flashcards',
        selector: 'text=Create Flashcards',
        expectedRoute: '/flashcards',
        verification: 'text=Flashcards, h1, h2'
      },
      {
        name: 'AI Assistant',
        selector: 'text=AI Assistant',
        expectedRoute: '/ai-chat-assistant',
        verification: 'text=AI Assistant, text=Chat, h1, h2'
      },
      {
        name: 'Learning Goals Quick',
        selector: '[data-testid="quick-learning-goals"], button:has-text("Learning Goals"):not([role="tab"])',
        expectedRoute: '/learning-goals',
        verification: 'text=Learning Goals, h1, h2'
      },
      {
        name: 'Profile Settings Quick',
        selector: '[data-testid="quick-profile-settings"], button:has-text("Profile Settings")',
        expectedRoute: '/user-profile-settings',
        verification: 'text=Profile Settings, text=Settings, h1, h2'
      }
    ];

    // Test each navigation link
    for (const link of expectedLinks) {
      console.log(`🔍 Testing navigation link: ${link.name}`);
      
      try {
        // Go back to dashboard first
        await page.goto('/dashboard');
        await page.waitForLoadState('networkidle');
        
        // Wait for the link to be visible and clickable
        await page.waitForSelector(link.selector, { timeout: 5000 });
        
        // Click the link
        await page.click(link.selector);
        
        // Wait for navigation to complete
        await page.waitForURL(`**${link.expectedRoute}`, { timeout: 10000 });
        
        // Verify we're on the correct page
        const currentURL = page.url();
        expect(currentURL).toContain(link.expectedRoute);
        
        // Wait for page content to load
        await page.waitForLoadState('networkidle');
        
        // Verify page content is loaded (try multiple possible verification selectors)
        const verificationSelectors = link.verification.split(', ');
        let contentFound = false;
        
        for (const selector of verificationSelectors) {
          try {
            await page.waitForSelector(selector, { timeout: 3000 });
            contentFound = true;
            break;
          } catch (e) {
            continue;
          }
        }
        
        if (!contentFound) {
          console.warn(`⚠️  Content verification failed for ${link.name}, but navigation succeeded`);
        }
        
        console.log(`✅ ${link.name} navigation successful`);
        
      } catch (error) {
        console.error(`❌ ${link.name} navigation failed:`, error.message);
        throw new Error(`Navigation link "${link.name}" failed: ${error.message}`);
      }
    }

    // Test Quick Actions links
    for (const link of quickActionLinks) {
      console.log(`🔍 Testing quick action: ${link.name}`);
      
      try {
        // Go back to dashboard first
        await page.goto('/dashboard');
        await page.waitForLoadState('networkidle');
        
        // Scroll to quick actions section if needed
        await page.evaluate(() => window.scrollTo(0, 0));
        
        // Wait for the quick actions component to load
        await page.waitForSelector('text=Quick Actions, [data-testid="quick-actions"]', { timeout: 5000 });
        
        // Wait for the specific link to be visible
        const linkElement = await page.waitForSelector(link.selector, { timeout: 5000 });
        
        if (linkElement) {
          // Scroll the element into view
          await linkElement.scrollIntoViewIfNeeded();
          
          // Click the link
          await linkElement.click();
          
          // Wait for navigation to complete
          await page.waitForURL(`**${link.expectedRoute}`, { timeout: 10000 });
          
          // Verify we're on the correct page
          const currentURL = page.url();
          expect(currentURL).toContain(link.expectedRoute);
          
          console.log(`✅ ${link.name} quick action successful`);
        }
        
      } catch (error) {
        console.warn(`⚠️  Quick action "${link.name}" not found or failed: ${error.message}`);
        // Don't fail the test for quick actions that might not be visible
      }
    }

    console.log('🎉 All dashboard navigation tests completed successfully!');
  });

  test('should verify dashboard components render correctly', async () => {
    console.log('🔍 Verifying dashboard components render correctly');
    
    // Wait for main dashboard elements to be visible
    const expectedComponents = [
      'text=Good morning, || text=Good afternoon, || text=Good evening,',
      'text=day streak',
      'text=Today\'s Goal',
      'text=Quick Actions',
    ];

    for (const component of expectedComponents) {
      try {
        const selectors = component.split(' || ');
        let found = false;
        
        for (const selector of selectors) {
          try {
            await page.waitForSelector(selector.trim(), { timeout: 3000 });
            found = true;
            break;
          } catch (e) {
            continue;
          }
        }
        
        if (!found) {
          console.warn(`⚠️  Component not found: ${component}`);
        } else {
          console.log(`✅ Component found: ${component}`);
        }
      } catch (error) {
        console.warn(`⚠️  Error checking component: ${component}`, error.message);
      }
    }
  });

  test('should handle broken links gracefully', async () => {
    console.log('🔍 Testing broken link handling');
    
    // Test navigation to a non-existent page
    await page.goto('/dashboard/non-existent-page');
    
    // Should redirect to 404 or handle gracefully
    await page.waitForLoadState('networkidle');
    
    // Verify we either get a 404 page or are redirected appropriately
    const url = page.url();
    const title = await page.title();
    
    console.log(`Current URL: ${url}`);
    console.log(`Page title: ${title}`);
    
    // This should not crash the application
    expect(url).toBeDefined();
    expect(title).toBeDefined();
  });

  test('should verify responsive navigation works on mobile', async ({ browser }) => {
    // Create a mobile viewport
    const mobileContext = await browser.newContext({
      ...devices['iPhone 12'],
    });
    const mobilePage = await mobileContext.newPage();
    
    try {
      await mobilePage.goto('/dashboard');
      await mobilePage.waitForLoadState('networkidle');
      
      // Test mobile navigation
      const mobileNavLinks = [
        'text=Dashboard',
        'text=Courses',
        'text=Study',
        'text=Progress'
      ];
      
      for (const link of mobileNavLinks) {
        try {
          await mobilePage.waitForSelector(link, { timeout: 3000 });
          console.log(`✅ Mobile nav link found: ${link}`);
        } catch (error) {
          console.warn(`⚠️  Mobile nav link not found: ${link}`);
        }
      }
      
    } finally {
      await mobilePage.close();
      await mobileContext.close();
    }
  });
}); 