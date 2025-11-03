# Sequence Diagrams

## Overview

This document provides sequence diagrams for key user interactions in Prompt Vault. Sequence diagrams show the interaction between the user, UI components, and application logic over time for various workflows.

---

## Sequence Diagram 1: Creating a New Prompt

### Description
This sequence diagram shows the complete flow when a user creates a new prompt, including optional template selection and form validation.

```mermaid
sequenceDiagram
    participant User
    participant Header
    participant Modal
    participant TemplateDropdown
    participant Form
    participant LocalStorage
    participant UI

    User->>Header: Click "+ New Prompt" button
    Header->>Modal: Open create modal
    Modal->>Form: Reset form fields
    Form->>Form: Pre-fill sample prompt
    Modal->>User: Display create modal with form
    
    alt User selects template
        User->>TemplateDropdown: Click template dropdown
        TemplateDropdown->>TemplateDropdown: Show 27 templates
        User->>TemplateDropdown: Select framework template
        TemplateDropdown->>Form: Populate form fields
        Form->>User: Display pre-filled template content
    end
    
    User->>Form: Enter title (required)
    User->>Form: Enter category (optional)
    Form->>Form: Autocomplete category suggestions
    User->>Form: Enter tags (comma-separated)
    Form->>Form: Autocomplete tag suggestions
    User->>Form: Enter/edit prompt content
    User->>Form: Set rating (optional, 1-5 stars)
    User->>Form: Select model preference (optional)
    
    User->>Form: Click "Save" button
    Form->>Form: Validate required fields
    
    alt Validation fails
        Form->>User: Show validation error
        User->>Form: Fix errors
    else Validation succeeds
        Form->>Form: Generate unique ID
        Form->>Form: Set createdAt timestamp
        Form->>Form: Set modifiedAt timestamp
        Form->>LocalStorage: Save prompt data
        LocalStorage->>LocalStorage: Update prompts array
        LocalStorage->>LocalStorage: Save to localStorage
        Form->>UI: Update allTags list
        Form->>UI: Refresh filtered prompts
        Form->>Modal: Close modal
        UI->>User: Display new prompt in card grid
    end
```

### Key Interactions
- **Template Selection**: Optional dropdown with 27 templates
- **Form Validation**: Title and content are required fields
- **Autocomplete**: Category and tag inputs provide suggestions
- **Data Persistence**: All data saved to localStorage immediately
- **UI Update**: Prompt list refreshes automatically after save

---

## Sequence Diagram 2: Searching and Filtering Prompts

### Description
This sequence diagram shows how search, category, and tag filters work together to filter prompts in real-time.

```mermaid
sequenceDiagram
    participant User
    participant SearchInput
    participant CategoryFilter
    participant TagFilter
    participant FilterLogic
    participant PromptList
    participant LocalStorage

    User->>SearchInput: Type search query
    SearchInput->>FilterLogic: Update searchQuery state
    FilterLogic->>LocalStorage: Get all prompts
    
    alt User selects category
        User->>CategoryFilter: Click category button
        CategoryFilter->>FilterLogic: Set selectedCategory
        FilterLogic->>FilterLogic: Filter by category (single-select)
    end
    
    alt User toggles tags
        User->>TagFilter: Click tag button
        TagFilter->>FilterLogic: Toggle tag in selectedTags array
        FilterLogic->>FilterLogic: Filter by tags (OR logic: ANY selected tag)
    end
    
    FilterLogic->>FilterLogic: Apply combined filters (AND logic)
    Note over FilterLogic: Search + Category + Tags all work together
    
    FilterLogic->>FilterLogic: Filter prompts matching search query, category, and tags
    Note over FilterLogic: Search: title/content/tags/category<br/>Category: single-select filter<br/>Tags: OR logic (ANY selected tag)
    
    FilterLogic->>FilterLogic: Sort by modifiedAt (newest first)
    FilterLogic->>PromptList: Update filteredPrompts array
    PromptList->>User: Display filtered prompt cards
    
    alt No results found
        PromptList->>User: Show "No prompts match" empty state
    end
```

### Key Interactions
- **Real-time Filtering**: Results update as user types or toggles filters
- **Combined Logic**: Search + Category + Tags use AND logic together
- **Tag Logic**: Multiple tags use OR logic (shows prompts with ANY selected tag)
- **Sorting**: Results sorted by modified date (newest first)

---

## Sequence Diagram 3: Import/Export Workflow

### Description
This sequence diagram shows the complete import and export process for backing up and restoring prompt data.

```mermaid
sequenceDiagram
    participant User
    participant ExportButton
    participant FileSystem
    participant ImportModal
    participant FileReader
    participant Validation
    participant LocalStorage
    participant UI

    Note over User,UI: Export Flow
    User->>ExportButton: Click "Export" button
    ExportButton->>LocalStorage: Get all prompts
    ExportButton->>LocalStorage: Get all categories
    ExportButton->>ExportButton: Create JSON object with prompts array, categories array, and exportDate timestamp
    ExportButton->>ExportButton: Stringify JSON
    ExportButton->>FileSystem: Create blob with JSON
    ExportButton->>FileSystem: Generate filename: prompt-vault-export-YYYY-MM-DD.json
    ExportButton->>FileSystem: Trigger download
    FileSystem->>User: Download JSON file
    
    Note over User,UI: Import Flow
    User->>ImportModal: Click "Import" button
    ImportModal->>User: Display file picker modal
    User->>FileSystem: Select JSON file
    FileSystem->>ImportModal: File selected
    ImportModal->>FileReader: Read file contents
    FileReader->>FileReader: Read as text
    FileReader->>Validation: Parse JSON
    
    alt Invalid JSON format
        Validation->>User: Show error: "Invalid file format"
    else Valid JSON
        Validation->>Validation: Validate structure: prompts array and categories array exist
        
        alt Invalid structure
            Validation->>User: Show error: "Invalid file structure"
        else Valid structure
            Validation->>Validation: Check for duplicates by title and content match
            Validation->>Validation: Generate new IDs and set timestamps for imported prompts
            
            Validation->>LocalStorage: Merge prompts
            Validation->>LocalStorage: Merge categories
            Validation->>LocalStorage: Save to localStorage
            Validation->>UI: Update allTags list
            Validation->>UI: Refresh filtered prompts
            Validation->>User: Show success alert with import count and skipped duplicates
            ImportModal->>ImportModal: Close modal
            UI->>User: Display updated prompt list
        end
    end
```

### Key Interactions
- **Export**: Immediate JSON download with timestamp filename
- **Import Validation**: JSON structure validation before processing
- **Duplicate Detection**: Checks title and content match
- **ID Generation**: Assigns new IDs to prevent conflicts
- **Merging**: Combines imported data with existing data

---

## Sequence Diagram 4: Viewing and Editing a Prompt

### Description
This sequence diagram shows the flow when a user views a prompt and then edits it.

```mermaid
sequenceDiagram
    participant User
    participant PromptCard
    participant ViewModal
    participant EditModal
    participant Form
    participant LocalStorage
    participant UI

    User->>PromptCard: Click on prompt card
    PromptCard->>ViewModal: Open view modal
    ViewModal->>ViewModal: Load prompt data: title, category, tags, content, metadata, rating, model
    ViewModal->>User: Display prompt details
    
    alt User clicks "Edit"
        User->>ViewModal: Click "Edit" button
        ViewModal->>EditModal: Open edit modal
        EditModal->>Form: Load current prompt data
        Form->>Form: Pre-fill all fields: title, category, tags, content, rating, model, response, comments, metadata
        EditModal->>User: Display edit form with pre-filled data
        
        User->>Form: Modify fields
        User->>Form: Click "Save" button
        Form->>Form: Validate required fields
        
        alt Validation fails
            Form->>User: Show validation error
        else Validation succeeds
            Form->>Form: Convert tagsInput to tags array
            Form->>Form: Update modifiedAt timestamp
            Form->>LocalStorage: Update prompt in array
            LocalStorage->>LocalStorage: Save to localStorage
            Form->>UI: Update allTags list
            Form->>UI: Refresh filtered prompts
            Form->>EditModal: Close modal
            EditModal->>ViewModal: Close view modal (optional)
            UI->>User: Display updated prompt in card grid
        end
    end
    
    alt User clicks "Duplicate"
        User->>ViewModal: Click "Duplicate" button
        ViewModal->>Form: Copy prompt data
        Form->>Form: Generate new ID
        Form->>Form: Append " (Copy)" to title
        Form->>Form: Set new createdAt/modifiedAt
        Form->>Form: Clear lastUsedAt
        Form->>LocalStorage: Add new prompt to array
        LocalStorage->>LocalStorage: Save to localStorage
        Form->>UI: Refresh filtered prompts
        UI->>User: Display duplicated prompt in card grid
    end
    
    alt User clicks "Mark as Used"
        User->>ViewModal: Click "Mark as Used" button
        ViewModal->>LocalStorage: Update lastUsedAt timestamp
        LocalStorage->>LocalStorage: Save to localStorage
        ViewModal->>ViewModal: Update displayed timestamp
        UI->>User: Show updated last used date
    end
    
    alt User clicks "Delete"
        User->>ViewModal: Click "Delete" button
        ViewModal->>User: Show confirmation dialog
        alt User confirms
            User->>ViewModal: Confirm deletion
            ViewModal->>LocalStorage: Remove prompt from array
            LocalStorage->>LocalStorage: Save to localStorage
            ViewModal->>UI: Update allTags list
            ViewModal->>UI: Refresh filtered prompts
            ViewModal->>ViewModal: Close modal
            UI->>User: Remove prompt from card grid
        else User cancels
            User->>ViewModal: Cancel deletion
            ViewModal->>User: Keep modal open
        end
    end
```

### Key Interactions
- **View Modal**: Displays full prompt details with all metadata
- **Edit Flow**: Pre-fills form with existing data
- **Duplicate**: Creates copy with "(Copy)" suffix and new timestamps
- **Mark as Used**: Updates lastUsedAt timestamp
- **Delete**: Requires confirmation before deletion

---

## Sequence Diagram 5: Dark Mode Toggle

### Description
This sequence diagram shows how dark mode toggle works and persists user preference.

```mermaid
sequenceDiagram
    participant User
    participant DarkModeButton
    participant HTML Element
    participant LocalStorage
    participant HighlightJS

    User->>DarkModeButton: Click dark mode toggle
    
    alt Currently in light mode
        DarkModeButton->>DarkModeButton: Toggle darkMode to true
        DarkModeButton->>LocalStorage: Save darkMode = true
        DarkModeButton->>HTML Element: Add "dark" class to <html>
        DarkModeButton->>HTML Element: Update color scheme
        HTML Element->>HTML Element: Apply dark mode styles (background, text, borders)
        DarkModeButton->>HighlightJS: Toggle syntax highlight theme
        HighlightJS->>HighlightJS: Enable dark theme CSS
        HighlightJS->>HighlightJS: Disable light theme CSS
        HTML Element->>User: Display dark mode UI
    else Currently in dark mode
        DarkModeButton->>DarkModeButton: Toggle darkMode to false
        DarkModeButton->>LocalStorage: Save darkMode = false
        DarkModeButton->>HTML Element: Remove "dark" class from <html>
        DarkModeButton->>HTML Element: Update color scheme
        HTML Element->>HTML Element: Apply light mode styles
        DarkModeButton->>HighlightJS: Toggle syntax highlight theme
        HighlightJS->>HighlightJS: Enable light theme CSS
        HighlightJS->>HighlightJS: Disable dark theme CSS
        HTML Element->>User: Display light mode UI
    end
    
    Note over HTML Element: Smooth transition (200ms duration)
    
    Note over User,HighlightJS: On Page Load
    User->>HTML Element: Page loads
    HTML Element->>LocalStorage: Check darkMode preference
    alt darkMode saved as true
        LocalStorage->>HTML Element: Apply dark mode on init
        HTML Element->>HighlightJS: Set dark theme
    else darkMode not set or false
        LocalStorage->>HTML Element: Apply light mode on init
        HTML Element->>HighlightJS: Set light theme
    end
```

### Key Interactions
- **Toggle**: Switches between light and dark mode
- **Persistence**: Preference saved to localStorage
- **Theme Sync**: Syntax highlighting theme updates automatically
- **Initialization**: Preference restored on page load
- **Smooth Transition**: 200ms color transition for visual feedback

---

## Sequence Diagram 6: Template Selection and Framework Display

### Description
This sequence diagram shows how users browse and select from the template library with 27 templates covering 23 frameworks.

```mermaid
sequenceDiagram
    participant User
    participant Sidebar
    participant FrameworksSection
    participant FrameworkCard
    participant ExamplePanel
    participant CreateModal
    participant TemplateDropdown

    User->>Sidebar: Expand "Frameworks" section
    Sidebar->>FrameworksSection: Show frameworks list
    
    alt User expands framework type
        User->>FrameworksSection: Click "General Purpose" header
        FrameworksSection->>FrameworksSection: Toggle generalPurposeCollapsed
        FrameworksSection->>User: Display 16 General Purpose framework cards (CRISPE, ELAVIS, SPARC, etc.)
    end
    
    User->>FrameworkCard: Click framework card (e.g., CRISPE)
    FrameworkCard->>FrameworkCard: Toggle frameworkBodyCollapsed
    FrameworkCard->>User: Display framework details: "Good for" description, "Stands for" explanation, Example button
    
    alt User clicks "Example" button
        User->>ExamplePanel: Click "Example" button
        ExamplePanel->>ExamplePanel: Toggle frameworkExamples state
        ExamplePanel->>User: Display example prompt template
    end
    
    Note over User,TemplateDropdown: User clicks "+ New Prompt"
    User->>CreateModal: Open create modal
    CreateModal->>TemplateDropdown: Display template dropdown
    
    User->>TemplateDropdown: Click template dropdown
    TemplateDropdown->>TemplateDropdown: Show grouped options: General Purpose, AI Reasoning, Specialized Frameworks
    
    User->>TemplateDropdown: Select template (e.g., "Code Review Assistant (CRISPE)")
    TemplateDropdown->>CreateModal: Load template data
    CreateModal->>CreateModal: Find template by key
    CreateModal->>CreateModal: Populate form fields from template: title, category, tags, content
    CreateModal->>User: Display pre-filled form
    
    User->>CreateModal: Review/modify template content
    User->>CreateModal: Save prompt
```

### Key Interactions
- **Framework Discovery**: Collapsible sections organize 23 frameworks (with 27 templates available)
- **Framework Details**: Expandable cards show "Good for" and "Stands for" info
- **Example Prompts**: Expandable examples show actual template content
- **Template Selection**: Dropdown in create modal loads template data
- **Form Population**: Template fields automatically fill form

---

## Sequence Diagram Summary Table

| Sequence Diagram | Primary User Goal | Key Components | Complexity |
|-----------------|-------------------|----------------|------------|
| Creating a New Prompt | Add new prompt with optional template | Modal, Form, TemplateDropdown, LocalStorage | Medium |
| Searching and Filtering | Find prompts quickly | SearchInput, CategoryFilter, TagFilter, FilterLogic | Medium |
| Import/Export | Backup and restore data | ExportButton, ImportModal, FileReader, Validation | High |
| Viewing and Editing | View and modify prompts | ViewModal, EditModal, Form, LocalStorage | Medium |
| Dark Mode Toggle | Change theme preference | DarkModeButton, HTML Element, LocalStorage, HighlightJS | Low |
| Template Selection | Browse and use templates | Sidebar, FrameworksSection, TemplateDropdown, CreateModal | Medium |

---

## Technical Implementation Notes

### Component Interactions
- **Alpine.js Reactive State**: All state changes trigger automatic UI updates
- **LocalStorage Operations**: Synchronous reads/writes for immediate persistence
- **Real-time Filtering**: No debouncing - filters apply instantly as user types/toggles
- **Modal Management**: Multiple modal states (showCreateModal, showEditModal, showViewModal) prevent conflicts

### Data Flow Patterns
1. **User Action** → **State Update** → **LocalStorage Save** → **UI Refresh**
2. **Filter Change** → **Filter Logic Recalculation** → **Display Update**
3. **Import** → **Validation** → **Merge Logic** → **Save** → **Refresh**

### Error Handling
- **Import Errors**: Try-catch blocks with user-friendly alert messages
- **Validation Errors**: Inline error display in form fields
- **Storage Errors**: Silent failures (localStorage quota exceeded) - export recommended

---

## Next Steps

- Validate sequences with user testing
- Add sequence diagrams for edge cases (empty states, error recovery)
- Document async operations if added (API calls, cloud sync)
- Create sequence diagrams for mobile-specific interactions

---

**Document Version**: 1.0  
**Last Updated**: 2024  
**Status**: Complete - Ready for Review

