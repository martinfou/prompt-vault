# Class Diagram

## Overview

Prompt Vault uses a component-based architecture built on Alpine.js. While not strictly object-oriented, the application can be modeled using class diagrams to represent its structure, data models, and relationships.

## Main Application Component

```mermaid
classDiagram
    class PromptVaultApp {
        -Boolean darkMode
        -Array~Prompt~ prompts
        -Array~Prompt~ filteredPrompts
        -Array~String~ categories
        -Array~String~ allTags
        -String selectedCategory
        -Array~String~ selectedTags
        -String searchQuery
        -Boolean showCreateModal
        -Boolean showEditModal
        -Boolean showViewModal
        -Boolean showImportModal
        -Boolean sidebarOpen
        -Prompt currentPrompt
        -Prompt viewingPrompt
        -Boolean syntaxHighlighting
        +init()
        +loadData()
        +saveData()
        +filterPrompts()
        +createPrompt()
        +editPrompt(prompt)
        +savePrompt()
        +deletePrompt(id)
        +duplicatePrompt(prompt)
        +markAsUsed(prompt)
        +exportData()
        +importData(file)
        +toggleDarkMode()
        +loadDarkMode()
        +loadPromptTemplate(templateId)
        +updateAllTags()
        +updateAllCategories()
        +resetCurrentPrompt()
        +closeModal()
        +copyToClipboard(text)
        +filterPromptsDebounced()
    }
```

## Data Model Classes

```mermaid
classDiagram
    class Prompt {
        +String id
        +String title
        +String content
        +String category
        +Array~String~ tags
        +String createdAt
        +String modifiedAt
        +String lastUsedAt
        +Number rating
        +String model
        +String response
        +String comments
        +PromptMetadata metadata
    }

    class PromptMetadata {
        +Number inputTokens
        +Number outputTokens
        +Number totalTokens
        +Number cost
        +Number responseTime
        +String testedAt
    }

    class Framework {
        +String name
        +String description
    }

    class Template {
        +String id
        +String title
        +String category
        +Array~String~ tags
        +String content
    }

    Prompt "1" *-- "1" PromptMetadata : contains
    Prompt "0..*" --> "0..1" Framework : categorized by
    Template "0..*" --> "1" Framework : belongs to
```

## Service Layer Classes

```mermaid
classDiagram
    class StorageService {
        +loadPrompts() Array~Prompt~
        +savePrompts(prompts) void
        +loadDarkMode() Boolean
        +saveDarkMode(enabled) void
        +loadCategories() Array~String~
        +saveCategories(categories) void
    }

    class FilterService {
        +filterByCategory(prompts, category) Array~Prompt~
        +filterByTags(prompts, tags) Array~Prompt~
        +searchPrompts(prompts, query) Array~Prompt~
        +applyFilters(prompts, filters) Array~Prompt~
    }

    class ValidationService {
        +validatePrompt(prompt) Boolean
        +validateTitle(title) Boolean
        +validateContent(content) Boolean
        +validateTags(tags) Boolean
    }

    class ExportService {
        +exportToJSON(prompts) String
        +importFromJSON(json) Array~Prompt~
        +validateImport(data) Boolean
    }

    class PromptVaultApp {
        -StorageService storage
        -FilterService filter
        -ValidationService validator
        -ExportService exporter
    }

    PromptVaultApp --> StorageService : uses
    PromptVaultApp --> FilterService : uses
    PromptVaultApp --> ValidationService : uses
    PromptVaultApp --> ExportService : uses
```

## UI Component Classes

```mermaid
classDiagram
    class ModalComponent {
        +Boolean visible
        +String type
        +show()
        +hide()
        +close()
    }

    class SidebarComponent {
        +Boolean open
        +Boolean collapsed
        +open()
        +close()
        +toggle()
    }

    class SearchComponent {
        +String query
        +search()
        +clear()
        +debounce()
    }

    class FilterComponent {
        +String selectedCategory
        +Array~String~ selectedTags
        +applyFilters()
        +clearFilters()
        +toggleTag(tag)
    }

    class TemplateSelector {
        +Array~Template~ templates
        +selectTemplate(id)
        +loadTemplate(id)
    }

    class SyntaxHighlighter {
        +Boolean enabled
        +highlight(code)
        +toggleTheme(darkMode)
    }

    PromptVaultApp --> ModalComponent : manages
    PromptVaultApp --> SidebarComponent : manages
    PromptVaultApp --> SearchComponent : manages
    PromptVaultApp --> FilterComponent : manages
    PromptVaultApp --> TemplateSelector : manages
    PromptVaultApp --> SyntaxHighlighter : manages
```

## Complete System Class Diagram

```mermaid
classDiagram
    class PromptVaultApp {
        -Boolean darkMode
        -Array~Prompt~ prompts
        -Array~Prompt~ filteredPrompts
        -Array~String~ categories
        -Array~String~ allTags
        -String selectedCategory
        -Array~String~ selectedTags
        -String searchQuery
        -Boolean showCreateModal
        -Boolean showEditModal
        -Boolean showViewModal
        -Boolean showImportModal
        -Boolean sidebarOpen
        -Prompt currentPrompt
        -Prompt viewingPrompt
        -Boolean syntaxHighlighting
        +init()
        +loadData()
        +saveData()
        +filterPrompts()
        +createPrompt()
        +editPrompt(prompt)
        +savePrompt()
        +deletePrompt(id)
        +duplicatePrompt(prompt)
        +markAsUsed(prompt)
        +exportData()
        +importData(file)
        +toggleDarkMode()
        +loadDarkMode()
        +loadPromptTemplate(templateId)
        +updateAllTags()
        +updateAllCategories()
        +resetCurrentPrompt()
        +closeModal()
        +copyToClipboard(text)
        +filterPromptsDebounced()
    }

    class Prompt {
        +String id
        +String title
        +String content
        +String category
        +Array~String~ tags
        +String createdAt
        +String modifiedAt
        +String lastUsedAt
        +Number rating
        +String model
        +String response
        +String comments
        +PromptMetadata metadata
    }

    class PromptMetadata {
        +Number inputTokens
        +Number outputTokens
        +Number totalTokens
        +Number cost
        +Number responseTime
        +String testedAt
    }

    class Framework {
        +String name
        +String description
    }

    class Template {
        +String id
        +String title
        +String category
        +Array~String~ tags
        +String content
    }

    class StorageService {
        +loadPrompts() Array~Prompt~
        +savePrompts(prompts) void
        +loadDarkMode() Boolean
        +saveDarkMode(enabled) void
    }

    class FilterService {
        +filterByCategory(prompts, category) Array~Prompt~
        +filterByTags(prompts, tags) Array~Prompt~
        +searchPrompts(prompts, query) Array~Prompt~
    }

    PromptVaultApp "1" *-- "*" Prompt : manages
    Prompt "1" *-- "1" PromptMetadata : contains
    Prompt "0..*" --> "0..1" Framework : categorized by
    Template "0..*" --> "1" Framework : belongs to
    PromptVaultApp --> StorageService : uses
    PromptVaultApp --> FilterService : uses
    PromptVaultApp --> Template : uses
```

## Component Relationships

```mermaid
classDiagram
    class AlpineComponent {
        <<framework>>
        +x-data
        +x-model
        +x-show
        +x-for
        +x-if
        +x-init
        +x-cloak
    }

    class PromptVaultApp {
        +AlpineComponent base
        +state management
        +event handlers
    }

    class UIComponents {
        +Header
        +Sidebar
        +Modal
        +PromptCard
        +Form
    }

    class ExternalLibraries {
        +AlpineJS
        +TailwindCSS
        +HighlightJS
    }

    PromptVaultApp --|> AlpineComponent : extends
    PromptVaultApp --> UIComponents : renders
    PromptVaultApp --> ExternalLibraries : depends on
```

## Method Categories

### Data Management Methods

```mermaid
classDiagram
    class DataManagement {
        +loadData()
        +saveData()
        +loadDarkMode()
        +saveDarkMode(enabled)
        +exportData()
        +importData(file)
    }
```

### CRUD Operations

```mermaid
classDiagram
    class CRUDOperations {
        +createPrompt()
        +readPrompt(id)
        +updatePrompt(prompt)
        +deletePrompt(id)
        +duplicatePrompt(prompt)
    }
```

### Filtering and Search

```mermaid
classDiagram
    class Filtering {
        +filterPrompts()
        +filterPromptsDebounced()
        +updateAllTags()
        +updateAllCategories()
        +searchPrompts(query)
    }
```

### UI Management

```mermaid
classDiagram
    class UIManagement {
        +toggleDarkMode()
        +showCreateModal()
        +showEditModal()
        +showViewModal()
        +closeModal()
        +resetCurrentPrompt()
        +closeSidebar()
    }
```

## Notes on Implementation

### Alpine.js Component Pattern

The application uses Alpine.js's component pattern where:
- **State**: Properties defined in the `app()` function return object
- **Methods**: Functions defined within the component object
- **Reactivity**: Automatic reactivity through Alpine's reactive system
- **Lifecycle**: `init()` method called on component initialization

### Class Equivalents

In the actual implementation:
- **Classes** → Alpine.js component data object
- **Methods** → Component methods
- **Properties** → Component state properties
- **Relationships** → Data references and method calls

### Data Flow

1. **User Action** → Triggers Alpine.js method
2. **Method Execution** → Updates component state
3. **Reactivity** → Alpine.js updates DOM automatically
4. **Persistence** → State saved to LocalStorage

### External Dependencies

- **Alpine.js**: Reactive framework
- **Tailwind CSS**: Styling framework
- **Highlight.js**: Syntax highlighting
- **Browser APIs**: LocalStorage, Clipboard API

