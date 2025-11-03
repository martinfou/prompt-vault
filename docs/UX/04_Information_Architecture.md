# Information Architecture

## Overview

This document defines the information architecture for Prompt Vault, including the site structure, navigation hierarchy, content organization, and how information is categorized and accessed.

---

## Site Structure

Prompt Vault is a **single-page application (SPA)** with the following hierarchical structure:

```
Prompt Vault (Single Page Application)
│
├── Header (Global Navigation - Fixed)
│   ├── App Title/Logo: "Prompt Vault"
│   ├── Dark Mode Toggle
│   ├── Test Buttons (Development)
│   ├── Import Button
│   ├── Export Button
│   └── New Prompt Button (+ New Prompt)
│
├── Main Layout (Two-Column on Desktop, Stacked on Mobile)
│   │
│   ├── Sidebar (Left - Navigation & Filters - ~280px desktop)
│   │   ├── Search Section
│   │   │   └── Search Input Field (Full-text search)
│   │   │
│   │   ├── Categories Section (Collapsible)
│   │   │   ├── "All Prompts" Filter (Default)
│   │   │   ├── Category List
│   │   │   │   ├── Category 1
│   │   │   │   ├── Category 2
│   │   │   │   └── Category N...
│   │   │   └── "+ Add" Button (Create new category)
│   │   │
│   │   ├── Tags Section (Collapsible)
│   │   │   └── Tag List (Flex wrap)
│   │   │       ├── Tag 1 (Toggle filter)
│   │   │       ├── Tag 2 (Toggle filter)
│   │   │       └── Tag N... (Toggle filter)
│   │   │
│   │   └── Prompt Frameworks Section (Collapsible)
│   │       ├── General Purpose Frameworks
│   │       │   ├── CRISPE Framework
│   │       │   ├── ELAVIS Framework
│   │       │   ├── SPARC Framework
│   │       │   └── [Other Frameworks...]
│   │       └── Specialized Frameworks
│   │
│   └── Main Content Area (Right - Content Display - Flexible width)
│       ├── Prompt List View (Default State)
│       │   ├── Prompt Cards Grid
│       │   │   ├── Prompt Card 1
│       │   │   │   ├── Title (Primary)
│       │   │   │   ├── Category Badge
│       │   │   │   ├── Tags (Multiple pills)
│       │   │   │   ├── Preview Snippet (Truncated)
│       │   │   │   ├── Metadata Row
│       │   │   │   │   ├── Created Date
│       │   │   │   │   ├── Modified Date
│       │   │   │   │   └── Last Used Date
│       │   │   │   └── Rating Stars (If rated)
│       │   │   └── Prompt Card N...
│       │   │
│       │   └── Empty State (When No Prompts/No Results)
│       │       ├── Icon/Illustration
│       │       ├── Heading
│       │       ├── Subtext
│       │       └── Call-to-Action Button
│       │
│       └── Prompt Detail View (Modal/Overlay)
│           ├── Header
│           │   ├── Prompt Title
│           │   └── Close Button (X)
│           ├── Metadata Bar
│           │   ├── Category Badge
│           │   ├── Tags Row
│           │   ├── Rating Stars
│           │   └── Last Used Date
│           ├── Content Section
│           │   ├── Full Prompt Content
│           │   ├── Syntax Highlighting Toggle
│           │   └── Word/Character Count
│           ├── Metadata Details
│           │   ├── Created Date
│           │   ├── Modified Date
│           │   ├── Last Used Date
│           │   └── Model Preference (If set)
│           └── Action Buttons
│               ├── Edit Button
│               ├── Duplicate Button
│               ├── Mark as Used Button
│               └── Delete Button
│
└── Modals (Overlay Layers)
    ├── Create/Edit Prompt Modal
    │   ├── Header
    │   │   ├── Title ("Create New Prompt" / "Edit Prompt")
    │   │   └── Close Button (X)
    │   ├── Template Selector Section
    │   │   └── Template Dropdown (Grouped by Framework)
    │   ├── Form Fields
    │   │   ├── Title Input (Required)
    │   │   ├── Category Input (Autocomplete)
    │   │   ├── Tags Input (Comma-separated, Autocomplete)
    │   │   ├── Content Textarea (Required)
    │   │   ├── Rating Input (Optional)
    │   │   └── Model Selection (Optional)
    │   └── Action Buttons
    │       ├── Cancel Button
    │       └── Save Button
    │
    ├── Category Creation Modal
    │   ├── Category Name Input
    │   └── Create/Cancel Buttons
    │
    └── Import Modal
        ├── File Input
        ├── Import Button
        └── Cancel Button
```

---

## Navigation Hierarchy

### Primary Navigation

**Level 1: Main Views**
1. **Prompt List View** (Default View)
   - Access: Always visible in main content area
   - Purpose: Display all prompts or filtered results
   - State: Default landing state

2. **Prompt Details View**
   - Access: Click on any prompt card
   - Purpose: View full prompt content and metadata
   - State: Modal overlay

3. **Create/Edit Prompt View**
   - Access: "+ New Prompt" button or "Edit" button
   - Purpose: Create new prompts or modify existing ones
   - State: Modal overlay

### Secondary Navigation (Sidebar Filters)

**Level 2: Filtering & Organization**
1. **Search**
   - Type: Text input
   - Scope: Full-text search across all fields
   - Behavior: Real-time filtering

2. **Categories**
   - Type: Single-select filter
   - Behavior: Mutually exclusive selection
   - Default: "All Prompts" (shows everything)

3. **Tags**
   - Type: Multi-select filter
   - Behavior: OR logic (shows prompts with ANY selected tag)
   - Visual: Active/inactive state

4. **Frameworks** (Reference)
   - Type: Information/reference
   - Purpose: Educational, not a filter
   - Content: Framework descriptions and examples

### Utility Actions (Header)

**Level 3: Data Management**
- **Export**: Backup all data to JSON file
- **Import**: Restore from JSON backup file
- **Dark Mode**: Toggle theme preference
- **New Prompt**: Quick access to creation

---

## Content Organization

### Hierarchical Organization System

#### Level 1: Categories
- **Purpose**: Primary organizational structure
- **Characteristics**:
  - One category per prompt
  - User-defined categories
  - Examples: "Code Generation", "Documentation", "Content Creation"
- **Usage**: Primary filtering mechanism
- **Relationship**: One-to-many (one category, many prompts)

#### Level 2: Tags
- **Purpose**: Secondary, flexible organization
- **Characteristics**:
  - Multiple tags per prompt
  - Comma-separated input
  - Examples: "python", "api", "blog-post", "code-review"
- **Usage**: Multi-dimensional filtering
- **Relationship**: Many-to-many (many tags, many prompts)

#### Level 3: Templates (Reference Library)
- **Purpose**: Starting points for new prompts
- **Characteristics**:
  - Pre-built prompt structures organized by framework type
  - 23 frameworks available (with 27 templates):
    - **General Purpose**: CRISPE, ELAVIS, SPARC, RISEN, PGTC, RTF, RACE, TAG, STAR, CLEAR, SMART, RIDE, PROMPT, TAP, CARE, COSTAR
    - **AI Reasoning**: Chain-of-Thought, 5C Framework, Tree-of-Thought, Zero-Shot/Few-Shot, AI-Aided Clinical Reasoning
    - **Specialized**: GOLD, PEACE, Reflective Writing
  - Each framework includes:
    - Framework name and description
    - "Good for" use case description
    - Expandable "Stands for" explanation
    - Expandable example prompt template
  - Examples: "Code Review Assistant (CRISPE)", "Content Generator (ELAVIS)", "Data Analysis Assistant (RISEN)"
- **Usage**: Template selection during creation via dropdown
- **Relationship**: Reference only (not stored with prompts)

### Metadata Organization

#### Primary Metadata
- **Title**: User-defined prompt name
- **Content**: Full prompt text
- **Category**: Organizational classification
- **Tags**: Flexible labels

#### Secondary Metadata
- **Created Date**: Timestamp of creation
- **Modified Date**: Last edit timestamp
- **Last Used Date**: Most recent usage timestamp (updated via "Mark as Used" button)
- **Rating**: User-assigned quality rating (1-5 stars, optional)
- **Model Preference**: Preferred LLM model (optional: GPT-4, Claude, Gemini, Llama, etc.)
- **Response**: LLM response text (optional, for tracking)
- **Comments**: User notes and annotations (optional)
- **Metadata Object**: Includes inputTokens, outputTokens, totalTokens, cost, responseTime, testedAt (optional)

### Content Types

#### 1. User-Generated Content
- **Prompts**: User-created prompt text
- **Categories**: User-defined organizational categories
- **Tags**: User-assigned labels
- **Ratings**: User-assigned quality ratings

#### 2. System-Generated Content
- **Timestamps**: Automatic date tracking
- **IDs**: Unique identifiers for prompts
- **Metadata**: System-managed data

#### 3. Reference Content
- **Templates**: Pre-built prompt templates
- **Framework Descriptions**: Educational content
- **Help Text**: User guidance

---

## Information Relationships

### Data Model Relationships

```
Prompt
├── belongs_to → Category
├── has_many → Tags (Many-to-many)
├── has_one → Rating (Optional)
├── has_one → Model Preference (Optional)
└── has_many → Timestamps (Created, Modified, Last Used)

Category
├── has_many → Prompts
└── independent (can exist without prompts)

Tag
├── has_many → Prompts (Many-to-many)
└── independent (can exist without prompts)

Template
└── reference_only (not stored with prompts)
```

### Filtering Logic

**Single Filter Application:**
- Search: Shows prompts matching search query
- Category: Shows prompts in selected category
- Tag: Shows prompts with selected tag

**Combined Filter Application (AND Logic):**
- Search + Category + Tags: Shows prompts matching ALL active filters
- Example: Search "API" + Category "Code" + Tag "python" = Prompts with "API" in content, in "Code" category, AND tagged "python"

**Tag Filter Logic (OR Logic):**
- Multiple Tags: Shows prompts with ANY selected tag
- Example: Tags "python" + "javascript" = Prompts tagged "python" OR "javascript"

---

## Navigation Patterns

### Desktop Navigation
- **Sidebar**: Always visible, fixed width
- **Main Content**: Scrollable, flexible width
- **Modals**: Overlay on top of main content
- **Header**: Fixed at top

### Mobile Navigation
- **Header**: Fixed at top with hamburger menu
- **Sidebar**: Slide-out drawer (hidden by default)
- **Main Content**: Full-width, scrollable
- **Modals**: Full-screen overlay

### Keyboard Navigation
- **Tab**: Navigate between interactive elements
- **Enter**: Activate buttons, submit forms
- **Escape**: Close modals, clear filters
- **Arrow Keys**: Navigate dropdowns and lists

---

## Content Access Patterns

### Discovery Patterns
1. **Browse All**: View all prompts in list
2. **Search**: Find specific prompts by keyword
3. **Filter by Category**: Narrow by category
4. **Filter by Tag**: Narrow by topic/technology
5. **Template Browse**: Explore available templates

### Organization Patterns
1. **By Category**: Group prompts by type
2. **By Tag**: Multi-dimensional organization
3. **By Date**: Chronological sorting
4. **By Usage**: Sort by last used date
5. **By Rating**: Sort by quality rating

### Retrieval Patterns
1. **Quick Search**: Fast keyword search
2. **Category Navigation**: Click category in sidebar
3. **Tag Filtering**: Click tag to filter
4. **Combined Filters**: Use multiple filters together
5. **Recent Prompts**: Access recently used prompts

---

## Content Priority

### High Priority Content
- **Active Prompts**: Currently filtered/visible prompts
- **Primary Actions**: Create, Edit, Delete
- **Search Input**: Always accessible
- **Current Filters**: Visible filter state

### Medium Priority Content
- **Category List**: Available categories
- **Tag List**: Available tags
- **Prompt Metadata**: Dates, ratings
- **Template Library**: Reference content

### Low Priority Content
- **Framework Descriptions**: Educational content
- **Help Text**: Guidance and instructions
- **Export/Import**: Utility functions
- **Settings**: Preferences and configuration

---

## Scalability Considerations

### Current Architecture Supports
- **Small Libraries**: < 50 prompts (optimal)
- **Medium Libraries**: 50-200 prompts (good)
- **Large Libraries**: 200-500 prompts (acceptable)
- **Very Large Libraries**: 500+ prompts (may need pagination)

### Future Enhancements for Scale
- **Pagination**: For prompt lists > 100 items
- **Virtual Scrolling**: For very large lists
- **Advanced Search**: Regex, date ranges, etc.
- **Folders/Nested Categories**: Hierarchical organization
- **Favorites/Bookmarks**: Quick access to important prompts

---

## Accessibility Architecture

### Semantic Structure
- **HTML5 Semantics**: Proper use of header, nav, main, aside, footer
- **ARIA Labels**: Descriptive labels for screen readers
- **Landmark Roles**: Clear page regions
- **Heading Hierarchy**: Proper h1-h6 structure

### Navigation Accessibility
- **Skip Links**: Jump to main content
- **Focus Management**: Logical tab order
- **Keyboard Shortcuts**: Efficient navigation
- **Screen Reader Support**: Full compatibility

---

## Information Architecture Principles

1. **Progressive Disclosure**: Show essential information first, reveal details on demand
2. **Consistent Patterns**: Same navigation patterns throughout
3. **Clear Hierarchy**: Visual and structural hierarchy guides users
4. **Flexible Organization**: Multiple ways to organize and find content
5. **Scalable Structure**: Architecture supports growth
6. **User-Centered**: Organization reflects user mental models
7. **Accessible**: Information accessible to all users

---

## Next Steps

- Validate IA with user testing
- Test navigation patterns with real users
- Refine organization based on usage patterns
- Consider advanced features for power users
- Plan for future scalability needs

---

**Document Version**: 2.0  
**Last Updated**: 2024  
**Status**: Updated based on current implementation

