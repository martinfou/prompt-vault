# Sequence Diagrams

## Overview

This document describes the main interaction flows in Prompt Vault using sequence diagrams. These diagrams illustrate how different components interact during user operations.

## 1. Application Initialization

```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant AlpineJS
    participant App
    participant LocalStorage
    participant HighlightJS

    User->>Browser: Open index.html
    Browser->>AlpineJS: Initialize Alpine.js
    AlpineJS->>App: Call app() function
    App->>App: Initialize state variables
    App->>App: init() method called
    App->>LocalStorage: loadData()
    LocalStorage-->>App: Return prompts array
    App->>LocalStorage: loadDarkMode()
    LocalStorage-->>App: Return darkMode preference
    App->>App: updateDarkClass()
    App->>App: filterPrompts()
    App->>HighlightJS: Initialize syntax highlighting
    App-->>Browser: Render UI
    Browser-->>User: Display application
```

## 2. Create New Prompt

```mermaid
sequenceDiagram
    participant User
    participant UI
    participant App
    participant Validation
    participant LocalStorage

    User->>UI: Click "+ New Prompt"
    UI->>App: showCreateModal = true
    App->>App: resetCurrentPrompt()
    App-->>UI: Display create modal
    
    User->>UI: Fill in prompt details
    UI->>App: Update currentPrompt state
    
    alt Using Template
        User->>UI: Select template
        UI->>App: loadPromptTemplate(templateId)
        App->>App: Load template from PROMPT_TEMPLATES
        App->>App: Populate currentPrompt
    end
    
    User->>UI: Click "Save"
    UI->>App: savePrompt()
    App->>Validation: Validate title and content
    alt Validation Fails
        Validation-->>App: Return error
        App-->>UI: Show alert
    else Validation Success
        App->>App: Parse tags from tagsInput
        App->>App: Generate ID (Date.now())
        App->>App: Set timestamps (createdAt, modifiedAt)
        App->>App: Add prompt to prompts array
        App->>LocalStorage: saveData()
        LocalStorage-->>App: Data saved
        App->>App: updateAllTags()
        App->>App: updateAllCategories()
        App->>App: filterPrompts()
        App->>App: closeModal()
        App-->>UI: Update UI with new prompt
    end
```

## 3. Edit Existing Prompt

```mermaid
sequenceDiagram
    participant User
    participant UI
    participant App
    participant LocalStorage

    User->>UI: Click "Edit" on prompt card
    UI->>App: editPrompt(prompt)
    App->>App: Copy prompt data to currentPrompt
    App->>App: Parse tags to tagsInput string
    App->>App: Convert testedAt to datetime-local format
    App->>App: showEditModal = true
    App->>App: showViewModal = false
    App-->>UI: Display edit modal with data
    
    User->>UI: Modify prompt fields
    UI->>App: Update currentPrompt state
    
    User->>UI: Click "Save"
    UI->>App: savePrompt()
    App->>App: Validate input
    App->>App: Find prompt by ID
    App->>App: Update prompt properties
    App->>App: Set modifiedAt timestamp
    App->>App: Parse tags from tagsInput
    App->>App: Update prompts array
    App->>LocalStorage: saveData()
    LocalStorage-->>App: Data saved
    App->>App: filterPrompts()
    App->>App: closeModal()
    App-->>UI: Display updated prompt
```

## 4. Delete Prompt

```mermaid
sequenceDiagram
    participant User
    participant UI
    participant App
    participant Browser
    participant LocalStorage

    User->>UI: Click "Delete" button
    UI->>Browser: Show confirmation dialog
    Browser-->>User: "Are you sure?"
    
    alt User Cancels
        User->>Browser: Click "Cancel"
        Browser-->>UI: No action
    else User Confirms
        User->>Browser: Click "OK"
        Browser->>App: deletePrompt(id)
        App->>App: Filter prompts array (remove id)
        App->>LocalStorage: saveData()
        LocalStorage-->>App: Data saved
        App->>App: updateAllTags()
        App->>App: updateAllCategories()
        App->>App: filterPrompts()
        App-->>UI: Remove prompt from display
    end
```

## 5. Search and Filter Prompts

```mermaid
sequenceDiagram
    participant User
    participant UI
    participant App
    participant DebounceTimer

    User->>UI: Type in search box
    UI->>App: Update searchQuery
    UI->>App: filterPromptsDebounced()
    
    App->>DebounceTimer: Clear existing timer
    App->>DebounceTimer: Set new timer (300ms)
    
    alt Timer Expires
        DebounceTimer->>App: Execute filterPrompts()
        App->>App: Get all prompts
        App->>App: Filter by searchQuery (title, content, category, tags)
        App->>App: Filter by selectedCategory
        App->>App: Filter by selectedTags (OR logic)
        App->>App: Update filteredPrompts
        App-->>UI: Update display
    else User Types Again
        DebounceTimer->>DebounceTimer: Reset timer
    end
    
    User->>UI: Select category filter
    UI->>App: Set selectedCategory
    App->>App: filterPrompts()
    App->>App: Apply category filter
    App-->>UI: Update filtered results
    
    User->>UI: Click tag filter
    UI->>App: Toggle tag in selectedTags
    App->>App: filterPrompts()
    App->>App: Apply tag filter (OR logic)
    App-->>UI: Update filtered results
```

## 6. Export Prompts

```mermaid
sequenceDiagram
    participant User
    participant UI
    participant App
    participant Browser
    participant LocalStorage

    User->>UI: Click "Export" button
    UI->>App: exportData()
    App->>LocalStorage: loadPrompts()
    LocalStorage-->>App: Return prompts array
    App->>App: Create export object
    Note over App: { version: "1.0", exportedAt: timestamp, prompts: [...] }
    App->>App: Convert to JSON string
    App->>App: Create Blob with JSON
    App->>Browser: Create download link
    App->>Browser: Trigger download
    Browser-->>User: Download prompt-vault-export.json
```

## 7. Import Prompts

```mermaid
sequenceDiagram
    participant User
    participant UI
    participant App
    participant FileReader
    participant LocalStorage

    User->>UI: Click "Import" button
    UI->>App: showImportModal = true
    App-->>UI: Display import modal
    
    User->>UI: Select JSON file
    UI->>FileReader: Read file
    FileReader-->>App: File content (JSON string)
    
    App->>App: importData(file)
    App->>App: Parse JSON
    alt Parse Error
        App-->>UI: Show error message
    else Parse Success
        App->>App: Validate data structure
        alt Invalid Structure
            App-->>UI: Show error message
        else Valid Structure
            App->>App: Merge with existing prompts
            App->>App: Handle duplicate IDs (generate new IDs)
            App->>LocalStorage: saveData()
            LocalStorage-->>App: Data saved
            App->>App: updateAllTags()
            App->>App: updateAllCategories()
            App->>App: filterPrompts()
            App->>App: closeModal()
            App-->>UI: Display imported prompts
        end
    end
```

## 8. Mark Prompt as Used

```mermaid
sequenceDiagram
    participant User
    participant UI
    participant App
    participant LocalStorage

    User->>UI: Click "Mark as Used"
    UI->>App: markAsUsed(prompt)
    App->>App: Find prompt by ID
    App->>App: Set lastUsedAt = current timestamp
    App->>App: Update prompt in array
    App->>LocalStorage: saveData()
    LocalStorage-->>App: Data saved
    App->>App: filterPrompts()
    alt Viewing Prompt
        App->>App: Update viewingPrompt object
    end
    App-->>UI: Update UI with new timestamp
```

## 9. Duplicate Prompt

```mermaid
sequenceDiagram
    participant User
    participant UI
    participant App
    participant LocalStorage

    User->>UI: Click "Duplicate"
    UI->>App: duplicatePrompt(prompt)
    App->>App: Copy prompt object
    App->>App: Generate new ID (Date.now())
    App->>App: Append " (Copy)" to title
    App->>App: Set createdAt = current timestamp
    App->>App: Set modifiedAt = current timestamp
    App->>App: Set lastUsedAt = null
    App->>App: Add to prompts array
    App->>LocalStorage: saveData()
    LocalStorage-->>App: Data saved
    App->>App: filterPrompts()
    App-->>UI: Display duplicated prompt
```

## 10. Toggle Dark Mode

```mermaid
sequenceDiagram
    participant User
    participant UI
    participant App
    participant LocalStorage
    participant DOM
    participant HighlightJS

    User->>UI: Click dark mode toggle
    UI->>App: toggleDarkMode()
    App->>App: Toggle darkMode boolean
    App->>LocalStorage: saveDarkMode(darkMode)
    LocalStorage-->>App: Saved
    App->>App: updateDarkClass()
    App->>DOM: Add/remove 'dark' class on <html>
    App->>HighlightJS: toggleHighlightTheme(darkMode)
    HighlightJS->>DOM: Enable/disable dark theme stylesheet
    DOM-->>UI: Update UI theme
    UI-->>User: Display dark/light mode
```

## 11. Copy Prompt to Clipboard

```mermaid
sequenceDiagram
    participant User
    participant UI
    participant App
    participant ClipboardAPI
    participant Fallback

    User->>UI: Click "Copy" button
    UI->>App: copyToClipboard(text, event)
    App->>App: performClipboardCopy(text)
    
    alt Modern Browser (Clipboard API)
        App->>ClipboardAPI: navigator.clipboard.writeText(text)
        ClipboardAPI-->>App: Success
        App->>App: showCopyFeedback(event)
        App-->>UI: Show "Copied!" feedback
    else Fallback Method
        App->>Fallback: Create temporary textarea
        App->>Fallback: Select text
        App->>Fallback: document.execCommand('copy')
        Fallback-->>App: Success/Failure
        alt Success
            App->>App: showCopyFeedback(event)
            App-->>UI: Show "Copied!" feedback
        else Failure
            App-->>UI: Show error message
        end
    end
```

## 12. Load Prompt Template

```mermaid
sequenceDiagram
    participant User
    participant UI
    participant App
    participant TemplateStore

    User->>UI: Select template from dropdown
    UI->>App: loadPromptTemplate(templateId)
    App->>TemplateStore: Get template by ID
    TemplateStore-->>App: Return template object
    
    alt Template Found
        App->>App: Create new currentPrompt object
        App->>App: Set title from template
        App->>App: Set content from template
        App->>App: Set category from template
        App->>App: Set tags from template
        App->>App: Convert tags array to tagsInput string
        App->>App: Initialize metadata object
        App->>App: Reset select dropdown
        App-->>UI: Populate form fields
    else Template Not Found
        App-->>UI: No action (template not found)
    end
```

## 13. Tag Autocomplete Flow

```mermaid
sequenceDiagram
    participant User
    participant UI
    participant App

    User->>UI: Type in tag input field
    UI->>App: Update tagsInput
    UI->>App: getCurrentTagInput()
    App->>App: Extract current tag (before cursor)
    App->>App: getFilteredTags()
    App->>App: Filter allTags by current input
    App->>App: Show tag dropdown
    
    alt User Selects Tag
        User->>UI: Click tag in dropdown
        UI->>App: handleTagSelect(tag)
        App->>App: Add tag to tagsInput
        App->>App: Hide dropdown
    else User Presses Enter
        User->>UI: Press Enter key
        UI->>App: handleTagEnter(event)
        App->>App: Get selected tag or current input
        App->>App: Add tag to tagsInput
        App->>App: Hide dropdown
    else User Presses Comma
        User->>UI: Press comma key
        UI->>App: handleTagComma(event)
        App->>App: Add current tag and comma
        App->>App: Hide dropdown
    end
```

## Notes on Sequence Diagrams

### Timing Considerations

- **Debouncing**: Search operations use 300ms debounce to prevent excessive filtering
- **Async Operations**: File reading and clipboard operations are asynchronous
- **Synchronous Storage**: LocalStorage operations are synchronous but wrapped in try-catch

### Error Handling

All operations include error handling:
- **Parse Errors**: JSON parsing failures handled gracefully
- **Storage Errors**: Quota exceeded errors show user alerts
- **Validation Errors**: Invalid input prevents save operations

### State Management

- State updates trigger reactive UI updates via Alpine.js
- Multiple state updates may occur in sequence
- Final state always persisted to LocalStorage

