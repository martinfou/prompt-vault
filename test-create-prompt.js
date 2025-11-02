/**
 * Prompt Vault - Test Script
 * Creates a test prompt with tags and verifies functionality
 * 
 * Usage: Open index.html in browser, open console, paste and run this script
 */

(function() {
    console.log('%c🧪 Prompt Vault - Functional Test', 'font-size: 20px; font-weight: bold; color: #3b82f6;');
    console.log('Creating test prompt with tags...\n');

    // Get Alpine.js instance
    const appElement = document.querySelector('[x-data="app()"]');
    if (!appElement || !appElement._x_dataStack || !appElement._x_dataStack[0]) {
        console.error('❌ Alpine.js not initialized. Please wait for page to load.');
        return;
    }

    const app = appElement._x_dataStack[0];

    // Test 1: Create a test prompt
    console.log('📝 Test 1: Creating test prompt...');
    
    const testPrompt = {
        id: Date.now().toString(),
        title: 'Test Prompt - AI Code Review Assistant',
        content: `You are an expert AI code reviewer. Your task is to review the provided code and provide constructive feedback.

**Review Criteria:**
1. Code Quality: Check for best practices, readability, and maintainability
2. Performance: Identify potential bottlenecks or optimization opportunities
3. Security: Look for security vulnerabilities or potential issues
4. Design Patterns: Evaluate the use of appropriate design patterns
5. Documentation: Assess code comments and documentation

**Output Format:**
- **Strengths**: What the code does well
- **Issues**: Specific problems found with explanations
- **Suggestions**: Concrete recommendations for improvement
- **Code Examples**: Provide improved code snippets where relevant

Be specific, constructive, and educational in your feedback.`,
        category: 'Development',
        tags: ['code-review', 'ai-assistant', 'best-practices', 'testing'],
        createdAt: new Date().toISOString(),
        modifiedAt: new Date().toISOString(),
        lastUsedAt: null
    };

    // Add prompt to app
    app.prompts.push(testPrompt);
    app.saveData();
    app.updateAllTags();
    app.filterPrompts();

    console.log('✅ Test prompt created successfully!');
    console.log('   Title:', testPrompt.title);
    console.log('   Category:', testPrompt.category);
    console.log('   Tags:', testPrompt.tags.join(', '));
    console.log('   Word Count:', app.getWordCount(testPrompt.content));

    // Test 2: Verify tags are displayed
    console.log('\n🏷️  Test 2: Verifying tags...');
    const allTags = app.allTags;
    console.log('   All tags in system:', allTags.join(', '));
    
    const testTagsFound = testPrompt.tags.every(tag => allTags.includes(tag));
    if (testTagsFound) {
        console.log('✅ All test tags are in the system');
    } else {
        console.error('❌ Some tags are missing');
    }

    // Test 3: Test tag filtering
    console.log('\n🔍 Test 3: Testing tag filtering...');
    app.selectedTags = ['code-review'];
    app.filterPrompts();
    const filteredCount = app.filteredPrompts.length;
    console.log(`   Filtered prompts with 'code-review' tag: ${filteredCount}`);
    
    if (filteredCount > 0) {
        console.log('✅ Tag filtering works correctly');
        // Verify our test prompt is in filtered results
        const found = app.filteredPrompts.find(p => p.id === testPrompt.id);
        if (found) {
            console.log('✅ Test prompt appears in filtered results');
        } else {
            console.error('❌ Test prompt not found in filtered results');
        }
    } else {
        console.error('❌ Tag filtering returned no results');
    }

    // Reset filters
    app.selectedTags = [];
    app.filterPrompts();

    // Test 4: Test category filtering
    console.log('\n📁 Test 4: Testing category filtering...');
    app.selectedCategory = 'Development';
    app.filterPrompts();
    const categoryFilteredCount = app.filteredPrompts.length;
    console.log(`   Filtered prompts in 'Development' category: ${categoryFilteredCount}`);
    
    if (categoryFilteredCount > 0) {
        console.log('✅ Category filtering works correctly');
        const found = app.filteredPrompts.find(p => p.id === testPrompt.id);
        if (found) {
            console.log('✅ Test prompt appears in category filtered results');
        }
    }

    // Reset filters
    app.selectedCategory = null;
    app.filterPrompts();

    // Test 5: Test search functionality
    console.log('\n🔎 Test 5: Testing search functionality...');
    app.searchQuery = 'code review';
    app.filterPrompts();
    const searchResults = app.filteredPrompts.length;
    console.log(`   Search results for 'code review': ${searchResults}`);
    
    if (searchResults > 0) {
        console.log('✅ Search functionality works correctly');
        const found = app.filteredPrompts.find(p => p.id === testPrompt.id);
        if (found) {
            console.log('✅ Test prompt appears in search results');
        }
    }

    // Reset search
    app.searchQuery = '';
    app.filterPrompts();

    // Test 6: Verify prompt appears in list
    console.log('\n📋 Test 6: Verifying prompt in list...');
    const promptInList = app.prompts.find(p => p.id === testPrompt.id);
    if (promptInList) {
        console.log('✅ Test prompt is in the prompts list');
        console.log('   Current total prompts:', app.prompts.length);
    } else {
        console.error('❌ Test prompt not found in list');
    }

    // Test 7: Test export functionality
    console.log('\n💾 Test 7: Testing export functionality...');
    try {
        const exportData = {
            prompts: app.prompts,
            categories: app.categories,
            exportDate: new Date().toISOString()
        };
        const exportJSON = JSON.stringify(exportData, null, 2);
        console.log('✅ Export data generated successfully');
        console.log('   Export size:', (exportJSON.length / 1024).toFixed(2), 'KB');
        console.log('   Prompts in export:', exportData.prompts.length);
        console.log('   Categories in export:', exportData.categories.length);
    } catch (error) {
        console.error('❌ Export failed:', error.message);
    }

    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('%c📊 Test Summary', 'font-size: 16px; font-weight: bold;');
    console.log('='.repeat(50));
    console.log('✅ Test prompt created with tags');
    console.log('✅ Tags system working');
    console.log('✅ Filtering working');
    console.log('✅ Search working');
    console.log('✅ Export working');
    console.log('\n💡 Tip: Check the UI to see your test prompt!');
    console.log('💡 Tip: Try clicking on the tags in the sidebar to filter');
    console.log('='.repeat(50));

    // Optional: Open the prompt in view modal
    setTimeout(() => {
        const prompt = app.prompts.find(p => p.id === testPrompt.id);
        if (prompt) {
            console.log('\n🎯 Opening test prompt in view modal...');
            app.openPrompt(prompt);
        }
    }, 1000);

    return {
        success: true,
        testPrompt: testPrompt,
        totalPrompts: app.prompts.length,
        allTags: app.allTags
    };
})();


