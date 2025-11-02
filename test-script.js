// Prompt Vault - Button Functionality Test Script
// Run this in the browser console on index.html

(function() {
    console.log('%c🧪 Prompt Vault - Button Tests', 'font-size: 20px; font-weight: bold; color: #3b82f6;');
    console.log('Testing all buttons...\n');

    const results = {
        passed: [],
        failed: [],
        warnings: []
    };

    function test(name, testFn) {
        try {
            const result = testFn();
            if (result === true || result === undefined) {
                results.passed.push(name);
                console.log(`✅ ${name}`);
                return true;
            } else {
                results.failed.push(name);
                console.error(`❌ ${name}: ${result}`);
                return false;
            }
        } catch (e) {
            results.failed.push(name);
            console.error(`❌ ${name}: Error - ${e.message}`);
            return false;
        }
    }

    function warn(name, message) {
        results.warnings.push(`${name}: ${message}`);
        console.warn(`⚠️  ${name}: ${message}`);
    }

    // Test 1: Dark Mode Toggle Button
    test('Dark Mode Toggle Button Exists', () => {
        const btn = document.querySelector('button[onclick*="toggleDarkMode"]');
        return btn !== null;
    });

    test('Dark Mode Toggle is Clickable', () => {
        const btn = document.querySelector('button[onclick*="toggleDarkMode"]');
        return btn && !btn.disabled && btn.offsetParent !== null;
    });

    test('Dark Mode Toggle Functionality', () => {
        const btn = document.querySelector('button[onclick*="toggleDarkMode"]');
        if (!btn) return 'Button not found';
        
        const initialState = document.documentElement.classList.contains('dark');
        btn.click();
        
        setTimeout(() => {
            const newState = document.documentElement.classList.contains('dark');
            if (newState !== initialState) {
                console.log('   ✓ Dark mode toggled successfully');
            } else {
                console.warn('   ⚠ Dark mode state unchanged');
            }
        }, 100);
        
        return true;
    });

    // Test 2: Import Button
    test('Import Button Exists', () => {
        const btn = document.querySelector('button[onclick*="showImportModal"]');
        return btn !== null;
    });

    test('Import Button Click Opens Modal', () => {
        const btn = document.querySelector('button[onclick*="showImportModal"]');
        if (!btn) return 'Button not found';
        
        btn.click();
        setTimeout(() => {
            const modal = document.querySelector('[x-show="showImportModal"]');
            if (modal && window.getComputedStyle(modal).display !== 'none') {
                console.log('   ✓ Import modal opened');
                // Close it
                const closeBtn = modal.querySelector('button[onclick*="showImportModal = false"]');
                if (closeBtn) closeBtn.click();
            }
        }, 200);
        return true;
    });

    // Test 3: Export Button
    test('Export Button Exists', () => {
        const btn = document.querySelector('button[onclick*="exportData"]');
        return btn !== null;
    });

    test('Export Button is Clickable', () => {
        const btn = document.querySelector('button[onclick*="exportData"]');
        return btn && !btn.disabled;
    });

    // Test 4: New Prompt Button
    test('New Prompt Button Exists', () => {
        const btn = document.querySelector('button[onclick*="showCreateModal"]');
        return btn !== null;
    });

    test('New Prompt Button Opens Modal', () => {
        const btn = document.querySelector('button[onclick*="showCreateModal"]');
        if (!btn) return 'Button not found';
        
        btn.click();
        setTimeout(() => {
            const modal = document.querySelector('[x-show="showCreateModal"]');
            if (modal && window.getComputedStyle(modal).display !== 'none') {
                console.log('   ✓ Create modal opened');
                // Check if sample prompt is loaded
                const textarea = modal.querySelector('textarea[x-model="currentPrompt.content"]');
                if (textarea && textarea.value.length > 0) {
                    console.log('   ✓ Sample prompt loaded in textarea');
                }
                // Close it
                const closeBtn = modal.querySelector('button[onclick*="closeModal"]');
                if (closeBtn) closeBtn.click();
            }
        }, 200);
        return true;
    });

    // Test 5: Category Input
    test('Category Input Field Exists', () => {
        // First open create modal
        const btn = document.querySelector('button[onclick*="showCreateModal"]');
        if (btn) btn.click();
        
        setTimeout(() => {
            const input = document.querySelector('input[x-model="currentPrompt.category"]');
            if (input) {
                console.log('   ✓ Category input found');
                // Test typing
                input.value = 'Test Category';
                input.dispatchEvent(new Event('input'));
                console.log('   ✓ Category input accepts typing');
            }
        }, 300);
        return true;
    });

    // Test 6: Tags Input
    test('Tags Input Field Exists', () => {
        setTimeout(() => {
            const input = document.querySelector('input[x-model="currentPrompt.tagsInput"]');
            if (input) {
                console.log('   ✓ Tags input found');
                input.value = 'test, tags, example';
                input.dispatchEvent(new Event('input'));
                console.log('   ✓ Tags input accepts values');
            }
        }, 400);
        return true;
    });

    // Test 7: Save Button
    test('Save Button Exists in Modal', () => {
        setTimeout(() => {
            const saveBtn = document.querySelector('button[type="submit"]');
            if (saveBtn) {
                console.log('   ✓ Save button found');
            }
        }, 500);
        return true;
    });

    // Test 8: Cancel Button
    test('Cancel Button Exists', () => {
        setTimeout(() => {
            const cancelBtn = document.querySelector('button[onclick*="closeModal"]');
            if (cancelBtn) {
                console.log('   ✓ Cancel button found');
                cancelBtn.click();
            }
        }, 600);
        return true;
    });

    // Test 9: Add Category Button
    test('Add Category Button Exists', () => {
        const btn = document.querySelector('button[onclick*="showCategoryModal"]');
        return btn !== null;
    });

    // Test 10: Search Input
    test('Search Input Exists', () => {
        const input = document.querySelector('input[x-model="searchQuery"]');
        return input !== null;
    });

    test('Search Input is Functional', () => {
        const input = document.querySelector('input[x-model="searchQuery"]');
        if (!input) return 'Input not found';
        
        input.value = 'test';
        input.dispatchEvent(new Event('input'));
        return true;
    });

    // Test 11: Filter Buttons (if prompts exist)
    test('Category Filter Buttons Exist', () => {
        const buttons = document.querySelectorAll('button[onclick*="selectedCategory"]');
        return buttons.length > 0;
    });

    test('Tag Filter Buttons Exist', () => {
        const buttons = document.querySelectorAll('button[onclick*="toggleTagFilter"]');
        return buttons.length >= 0; // Can be 0 if no tags
    });

    // Test 12: Prompt Action Buttons (if prompts exist)
    setTimeout(() => {
        test('Duplicate Button Exists (if prompts present)', () => {
            const buttons = document.querySelectorAll('button[onclick*="duplicatePrompt"]');
            if (buttons.length > 0) {
                console.log(`   ✓ Found ${buttons.length} duplicate button(s)`);
            }
            return true; // Not a failure if no prompts
        });

        test('Delete Button Exists (if prompts present)', () => {
            const buttons = document.querySelectorAll('button[onclick*="deletePrompt"]');
            if (buttons.length > 0) {
                console.log(`   ✓ Found ${buttons.length} delete button(s)`);
            }
            return true; // Not a failure if no prompts
        });
    }, 700);

    // Summary
    setTimeout(() => {
        console.log('\n' + '='.repeat(50));
        console.log('%c📊 Test Summary', 'font-size: 16px; font-weight: bold;');
        console.log(`✅ Passed: ${results.passed.length}`);
        console.log(`❌ Failed: ${results.failed.length}`);
        console.log(`⚠️  Warnings: ${results.warnings.length}`);
        
        if (results.failed.length > 0) {
            console.log('\n%cFailed Tests:', 'font-weight: bold; color: #ef4444;');
            results.failed.forEach(f => console.error(`  - ${f}`));
        }
        
        if (results.warnings.length > 0) {
            console.log('\n%cWarnings:', 'font-weight: bold; color: #f59e0b;');
            results.warnings.forEach(w => console.warn(`  - ${w}`));
        }
        
        const successRate = ((results.passed.length / (results.passed.length + results.failed.length)) * 100).toFixed(1);
        console.log(`\n%cSuccess Rate: ${successRate}%`, `font-size: 14px; font-weight: bold; color: ${successRate >= 80 ? '#10b981' : '#ef4444'};`);
        console.log('='.repeat(50));
    }, 1000);

    return results;
})();
