# Wireframe Descriptions

## Overview

This document provides detailed wireframe descriptions for Prompt Vault interfaces. Wireframes define layout structure, component placement, interactive elements, and content hierarchy for each screen and component.

---

## Wireframe 1: Home Page (Default State - Desktop)

### ASCII Layout

```
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│ Header (Fixed Top)                                                                         │
├─────────────────────────────────────────────────────────────────────────────────────────────┤
│ Prompt Vault                      [🌙] [🧪 Test] [Import] [Export] [+ New Prompt]        │
└─────────────────────────────────────────────────────────────────────────────────────────────┘
┌──────────────────┬─────────────────────────────────────────────────────────────────────────┐
│                  │                                                                         │
│  Sidebar         │                    Main Content Area                                   │
│  (Fixed)         │                                                                         │
│                  │                                                                         │
│  ┌────────────┐ │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                │
│  │ Search...  │ │  │ Prompt Card  │  │ Prompt Card  │  │ Prompt Card  │                │
│  └────────────┘ │  │              │  │              │  │              │                │
│                  │  │  Title       │  │  Title       │  │  Title       │                │
│  Categories ▼  │  │  [Category] │  │  [Category] │  │  [Category] │                │
│  • All Prompts  │  │  tag1 tag2   │  │  tag1 tag2   │  │  tag1 tag2   │                │
│  • Code         │  │              │  │              │  │              │                │
│  • Docs         │  │  Preview...   │  │  Preview...   │  │  Preview...   │                │
│  • Content      │  │              │  │              │  │              │                │
│                  │  │  Created:    │  │  Created:    │  │  Created:    │                │
│  Tags ▼         │  │  Used:       │  │  Used:       │  │  Used:       │                │
│  [tag1] [tag2]  │  │  ⭐⭐⭐        │  │  ⭐⭐⭐⭐       │  │  ⭐⭐⭐⭐⭐      │                │
│  [tag3] [tag4]  │  └──────────────┘  └──────────────┘  └──────────────┘                │
│                  │                                                                         │
│  Frameworks ▼   │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                │
│                  │  │ Prompt Card  │  │ Prompt Card  │  │ Prompt Card  │                │
│                  │  │              │  │              │  │              │                │
│                  │  │  Title       │  │  Title       │  │  Title       │                │
│                  │  │  [Category] │  │  [Category] │  │  [Category] │                │
│                  │  │  tag1 tag2   │  │  tag1 tag2   │  │  tag1 tag2   │                │
│                  │  │              │  │              │  │              │                │
│                  │  │  Preview...   │  │  Preview...   │  │  Preview...   │                │
│                  │  │              │  │              │  │              │                │
│                  │  │  Created:    │  │  Created:    │  │  Created:    │                │
│                  │  │  Used:       │  │  Used:       │  │  Used:       │                │
│                  │  │  ⭐⭐⭐        │  │  ⭐⭐⭐⭐       │  │  ⭐⭐⭐⭐⭐      │                │
│                  │  └──────────────┘  └──────────────┘  └──────────────┘                │
│                  │                                                                         │
│                  │                              (Scrollable)                              │
└──────────────────┴─────────────────────────────────────────────────────────────────────────┘
```

### Layout Structure

**Header Bar** (Full Width, Fixed at Top, ~64px height)
- **Left Section**:
  - App Title: "Prompt Vault" (text-2xl, bold, dark:text-white)
  - Spacing: 16px padding
- **Right Section** (Horizontal Button Row):
  - Dark Mode Toggle: Circular icon button (32x32px)
  - Test Buttons: Purple button "🧪 Test Buttons" (secondary style)
  - Import Button: Gray button "Import"
  - Export Button: Blue button "Export"
  - "+ New Prompt" Button: Green button, primary CTA
  - Spacing: 16px gap between buttons
  - Alignment: Right-aligned

**Two-Column Layout** (Flex container, max-width: 1280px, centered)

### Left Column - Sidebar (~280px width, fixed)

**Search Section** (Top of sidebar)
- Search Input Field:
  - Full width, rounded corners (8px)
  - Padding: 12px horizontal, 10px vertical
  - Placeholder: "Search prompts..."
  - Border: 1px solid gray-300 (dark: gray-600)
  - Background: white (dark: gray-700)
  - Focus ring: Blue-500, 2px
- Spacing: 16px margin bottom

**Categories Section** (Collapsible)
- Section Header:
  - Chevron icon (rotates when expanded)
  - Text: "Categories" (font-semibold, text-sm)
  - "+ Add" button (small, blue, right-aligned)
  - Spacing: 8px margin bottom
- Category List (when expanded):
  - "All Prompts" link (always visible, highlighted when active)
  - Category items:
    - Text: Category name (left-aligned)
    - Delete icon (appears on hover, right-aligned)
    - Active state: Blue background tint
    - Spacing: 4px vertical gap
  - Padding: 8px horizontal

**Tags Section** (Collapsible)
- Section Header:
  - Chevron icon (rotates when expanded)
  - Text: "Tags" (font-semibold, text-sm)
  - Spacing: 8px margin bottom
- Tag List (when expanded):
  - Flex wrap layout
  - Tag Pills:
    - Small rounded pills (text-xs)
    - Active: Blue background (bg-blue-600, text-white)
    - Inactive: Gray background (bg-gray-200, dark: bg-gray-700)
    - Padding: 4px horizontal, 2px vertical
    - Spacing: 4px gap between tags

**Prompt Frameworks Section** (Collapsible)
- Section Header:
  - Chevron icon (rotates when expanded)
  - Text: "Frameworks" (font-semibold, text-sm)
- Framework Cards (when expanded):
  - Grouped by framework type
  - Framework name as header
  - Description text
  - Expandable details
  - Max height: 80vh, scrollable

### Right Column - Main Content (Flexible width)

**Prompt List Grid** (Responsive grid)
- Desktop: 3 columns
- Tablet: 2 columns
- Mobile: 1 column
- Gap: 16px between cards

**Prompt Card** (Individual card structure)
- Container:
  - Background: white (dark: gray-800)
  - Border: 1px solid gray-200 (dark: gray-700)
  - Border radius: 8px
  - Shadow: subtle shadow (hover: increased shadow)
  - Padding: 16px
  - Height: Auto, min-height: 200px
- Content Structure:
  - **Title**: Bold, text-lg, margin-bottom: 8px
  - **Category Badge**: Small pill, colored, margin-bottom: 8px
  - **Tags Row**: Multiple small pills, margin-bottom: 8px
  - **Preview Snippet**: 
    - 2-3 lines of truncated content
    - Text-sm, text-gray-600 (dark: text-gray-400)
    - Margin-bottom: 12px
  - **Metadata Row**:
    - Small text (text-xs)
    - Created date, Last used date
    - Text-gray-500 (dark: text-gray-400)
  - **Rating Stars**: Right-aligned, if rated

**Empty State** (Centered in main content area)
- Icon/Illustration: 96x96px or similar
- Heading: "No prompts yet" (text-2xl, bold)
- Subtext: "Create your first prompt to get started" (text-gray-500)
- CTA Button: "+ Create Prompt" (green, large)
- Max-width: 500px, centered

### Visual Hierarchy
- **Header**: Highest priority (sticky, fixed)
- **Sidebar**: Secondary navigation (scrollable if needed)
- **Main Content**: Primary focus area
- **Cards**: Visual grouping with clear separation
- **Spacing**: Consistent 16px, 24px, 32px scale

---

## Wireframe 2: Create/Edit Prompt Modal

### ASCII Layout

```
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                                    Modal Overlay                                           │
│  ┌─────────────────────────────────────────────────────────────────────────────────────┐  │
│  │ Create New Prompt                                                           [X]    │  │
│  ├─────────────────────────────────────────────────────────────────────────────────────┤  │
│  │                                                                                     │  │
│  │ Template (Optional):                                                               │  │
│  │ ┌─────────────────────────────────────────────────────────────────────────────┐   │  │
│  │ │ [Select Template ▼]                                                          │   │  │
│  │ └─────────────────────────────────────────────────────────────────────────────┘   │  │
│  │                                                                                     │  │
│  │ Title *                                                                             │  │
│  │ ┌─────────────────────────────────────────────────────────────────────────────┐   │  │
│  │ │ Enter prompt title...                                                         │   │  │
│  │ └─────────────────────────────────────────────────────────────────────────────┘   │  │
│  │                                                                                     │  │
│  │ Category                                                                         │  │
│  │ ┌─────────────────────────────────────────────────────────────────────────────┐   │  │
│  │ │ Type category...                           [Dropdown ▼]                     │   │  │
│  │ └─────────────────────────────────────────────────────────────────────────────┘   │  │
│  │                                                                                     │  │
│  │ Tags (comma-separated)                                                             │  │
│  │ ┌─────────────────────────────────────────────────────────────────────────────┐   │  │
│  │ │ e.g., code-generation, analysis, creative         [Suggestions ▼]            │   │  │
│  │ └─────────────────────────────────────────────────────────────────────────────┘   │  │
│  │ [tag1] [tag2] [tag3]                                                                │  │
│  │                                                                                     │  │
│  │ Content *                                                          Word: 0 Char: 0 │  │
│  │ ┌─────────────────────────────────────────────────────────────────────────────┐   │  │
│  │ │                                                                               │   │  │
│  │ │ Enter your prompt content...                                                 │   │  │
│  │ │                                                                               │   │  │
│  │ │                                                                               │   │  │
│  │ │                                                                               │   │  │
│  │ │                                                                               │   │  │
│  │ │                                                                               │   │  │
│  │ │                                                                               │   │  │
│  │ │                                                                               │   │  │
│  │ │                                                                               │   │  │
│  │ │                                                                               │   │  │
│  │ │                                                                               │   │  │
│  │ │                                                                               │   │  │
│  │ │                                            [Syntax Highlight Toggle]          │   │  │
│  │ └─────────────────────────────────────────────────────────────────────────────┘   │  │
│  │                                                                                     │  │
│  │ Rating (1-5)                                                                        │  │
│  │ ⭐ ⭐ ⭐ ⭐ ⭐  [Clear]                                                               │  │
│  │                                                                                     │  │
│  │ Preferred Model                                                                     │  │
│  │ ┌─────────────────────────────────────────────────────────────────────────────┐   │  │
│  │ │ [Select Model ▼]                                                              │   │  │
│  │ └─────────────────────────────────────────────────────────────────────────────┘   │  │
│  │                                                                                     │  │
│  ├─────────────────────────────────────────────────────────────────────────────────────┤  │
│  │                                                      [Cancel]  [Save]              │  │
│  └─────────────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                             │
└─────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Modal Overlay
- Full-screen overlay:
  - Background: Semi-transparent black (rgba(0,0,0,0.5))
  - Backdrop blur: Optional
  - Z-index: High (above all content)
- Centered modal container:
  - Max-width: 800px
  - Width: 90% on mobile
  - Background: white (dark: gray-800)
  - Border radius: 12px
  - Shadow: Large shadow for depth
  - Max-height: 90vh, scrollable

### Modal Header
- Title: "Create New Prompt" / "Edit Prompt" (text-xl, bold)
- Close Button: X icon, top-right corner
- Padding: 24px horizontal, 16px vertical
- Border bottom: 1px solid gray-200 (dark: gray-700)

### Template Selector Section
- Label: "Template (Optional)" (text-sm, font-medium)
- Dropdown/Select Menu:
  - Full width
  - Grouped options:
    - Group: CRISPE Framework
    - Group: ELAVIS Framework
    - Group: SPARC Framework
  - Helper text: "Select a template to pre-fill the form" (text-xs, gray)
- Spacing: 16px margin bottom

### Form Fields (Vertical Stack)

**1. Title Input**
- Label: "Title" (required indicator: *)
- Text Input:
  - Full width
  - Padding: 12px
  - Border: 1px solid gray-300 (dark: gray-600)
  - Border radius: 8px
  - Placeholder: "Enter prompt title..."
- Error state: Red border if invalid
- Spacing: 16px margin bottom

**2. Category Input**
- Label: "Category"
- Text Input with Autocomplete:
  - Full width
  - Dropdown appears below input
  - Shows existing categories as user types
  - Placeholder: "Type category name..."
- Helper text: "Type a new category and press Enter to create it"
- Spacing: 16px margin bottom

**3. Tags Input**
- Label: "Tags (comma-separated)"
- Text Input with Autocomplete:
  - Full width
  - Dropdown shows existing tags
  - Placeholder: "e.g., code-generation, analysis, creative"
- Selected Tags Display:
  - Pills below input showing selected tags
  - Each pill has remove button
- Helper text: "Type to see suggestions, press Enter or comma to add tag"
- Spacing: 16px margin bottom

**4. Content Textarea**
- Label: "Content" (with word/char count on right)
- Large Textarea:
  - Rows: 12
  - Monospace font
  - Full width
  - Padding: 12px
  - Border: 1px solid gray-300 (dark: gray-600)
  - Border radius: 8px
  - Placeholder: "Enter your prompt content..."
- Syntax Highlighting Toggle:
  - Button top-right of textarea
  - Toggle syntax highlighting on/off
- Preview Section (optional):
  - Below textarea when highlighting enabled
  - Shows formatted content
- Spacing: 16px margin bottom

**5. Rating Section** (Optional)
- Label: "Rating (1-5)"
- Five Star Buttons:
  - Horizontal row
  - Clickable stars
  - Hover: Preview fill
  - Current rating: Filled stars
- Clear Button (if rated):
  - Small text button "Clear"
- Spacing: 16px margin bottom

**6. Model Selection** (Optional)
- Label: "Preferred Model"
- Dropdown:
  - Full width
  - Model options (GPT-4, Claude, etc.)
  - Optional indicator
- Spacing: 16px margin bottom

### Action Buttons (Bottom, Right-aligned)
- Cancel Button:
  - Secondary style (gray)
  - Text: "Cancel"
- Save Button:
  - Primary style (green)
  - Text: "Save"
- Spacing: 16px gap between buttons
- Padding: 24px horizontal, 16px vertical
- Border top: 1px solid gray-200 (dark: gray-700)

### Visual Notes
- Focus states: Blue ring (2px) on focused inputs
- Error states: Red border and error message below input
- Success feedback: Toast notification after save
- Loading state: Disabled buttons, spinner during save

---

## Wireframe 3: Prompt Detail View (Modal)

### ASCII Layout

```
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                                    Modal Overlay                                           │
│  ┌─────────────────────────────────────────────────────────────────────────────────────┐  │
│  │ Code Review Assistant                                                       [X]    │  │
│  ├─────────────────────────────────────────────────────────────────────────────────────┤  │
│  │                                                                                     │  │
│  │ [Code Review]  tag1  tag2  tag3  tag4                    ⭐⭐⭐⭐  Last: 2d ago │  │
│  │                                                                                     │  │
│  ├─────────────────────────────────────────────────────────────────────────────────────┤  │
│  │                                                                                     │  │
│  │ Prompt Content:                                                                     │  │
│  │ ┌─────────────────────────────────────────────────────────────────────────────┐   │  │
│  │ │                                                                               │   │  │
│  │ │ You are an expert code reviewer specializing in [language]. Your role is    │   │  │
│  │ │ to review code submissions and provide constructive feedback that helps      │   │  │
│  │ │ developers improve code quality, catch bugs, and follow best practices.     │   │  │
│  │ │                                                                               │   │  │
│  │ │ Please review the following code and provide feedback on:                    │   │  │
│  │ │                                                                               │   │  │
│  │ │ 1. Code quality and readability                                             │   │  │
│  │ │ 2. Potential bugs or edge cases                                             │   │  │
│  │ │ 3. Performance optimizations                                                │   │  │
│  │ │ 4. Best practices adherence                                                  │   │  │
│  │ │ 5. Security considerations                                                  │   │  │
│  │ │                                                                               │   │  │
│  │ │ Code to review:                                                              │   │  │
│  │ │ [Code block here]                                                            │   │  │
│  │ │                                                                               │   │  │
│  │ │                                                                               │   │  │
│  │ │                                                    [Syntax Highlight Toggle]  │   │  │
│  │ │                                                              Word: 245 Char: 1523 │   │
│  │ └─────────────────────────────────────────────────────────────────────────────┘   │  │
│  │                                                                                     │  │
│  ├─────────────────────────────────────────────────────────────────────────────────────┤  │
│  │ Metadata Details:                                                                  │  │
│  │                                                                                     │  │
│  │ Created:    2024-01-15 10:30 AM                                                    │  │
│  │ Modified:   2024-01-20 02:15 PM                                                    │  │
│  │ Last Used:  2024-01-22 09:45 AM                                                    │  │
│  │ Model:      GPT-4                                                                  │  │
│  │                                                                                     │  │
│  ├─────────────────────────────────────────────────────────────────────────────────────┤  │
│  │                                 [Edit] [Duplicate] [Mark Used] [Delete]              │  │
│  └─────────────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                             │
└─────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Modal Overlay
- Full-screen overlay: Semi-transparent background
- Centered modal container:
  - Max-width: 900px
  - Width: 95% on mobile
  - Background: white (dark: gray-800)
  - Border radius: 12px
  - Max-height: 90vh, scrollable

### Modal Header
- Title: Prompt title (text-2xl, bold)
- Close Button: X icon, top-right
- Padding: 24px horizontal, 20px vertical

### Metadata Bar (Horizontal, below title)
- Category Badge: Colored pill
- Tags Row: Small pills
- Rating Stars: If rated
- Last Used Date: Small text, gray
- Spacing: 16px gap between elements
- Padding: 0px horizontal, 12px vertical

### Content Section
- Full Prompt Content:
  - Large text area
  - Readable font size (16px)
  - Line height: 1.6
  - Padding: 24px
  - Background: Slight tint (gray-50, dark: gray-900)
- Syntax Highlighting Toggle:
  - Button top-right of content area
  - Toggle syntax highlighting
- Code Block Styling (if applicable):
  - Monospace font
  - Background: gray-100 (dark: gray-800)
  - Padding: 16px
  - Border radius: 4px
- Word/Character Count:
  - Small text, bottom-right
  - Gray color

### Metadata Details Section
- Created Date: Label + value
- Modified Date: Label + value
- Last Used Date: Label + value
- Model Preference: Label + value (if set)
- Layout: Two-column grid (on desktop)
- Spacing: 16px gap
- Padding: 24px horizontal, 16px vertical
- Border top: 1px solid gray-200 (dark: gray-700)

### Action Buttons (Bottom, Right-aligned)
- Edit Button: Primary blue style
- Duplicate Button: Secondary gray style
- Delete Button: Danger red style
- Mark as Used Button: Secondary gray style
- Spacing: 12px gap between buttons
- Padding: 24px horizontal, 16px vertical
- Border top: 1px solid gray-200 (dark: gray-700)

### Visual Notes
- Clear visual hierarchy
- Readable typography for content
- Distinct button styles for different actions
- Confirmation dialog for delete action
- Smooth scroll if content is long

---

## Wireframe 4: Empty State

### ASCII Layout

```
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                             │
│                                                                                             │
│                                                                                             │
│                                    ┌──────────────┐                                        │
│                                    │              │                                        │
│                                    │   📝 Icon    │                                        │
│                                    │              │                                        │
│                                    └──────────────┘                                        │
│                                                                                             │
│                                    No prompts yet                                           │
│                                                                                             │
│                        Create your first prompt to get started                              │
│                                                                                             │
│                                    ┌──────────────┐                                        │
│                                    │ + Create     │                                        │
│                                    │   Prompt     │                                        │
│                                    └──────────────┘                                        │
│                                                                                             │
│                                                                                             │
│              Or import prompts from a backup file                                           │
│                                                                                             │
│                                                                                             │
│                                                                                             │
└─────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Layout
- Centered vertically and horizontally in main content area
- Max-width: 500px
- Padding: 48px

### Content Structure
- **Large Icon/Illustration**:
  - Size: 96x96px or similar
  - Centered
  - Friendly, inviting design
- **Heading**:
  - Text: "No prompts yet" (text-2xl, bold)
  - Centered
  - Margin: 16px top
- **Subtext**:
  - Text: "Create your first prompt to get started" (text-gray-500)
  - Centered
  - Margin: 8px top
- **Primary CTA Button**:
  - "+ Create Prompt" (green, large)
  - Centered
  - Margin: 24px top
- **Optional Secondary Text**:
  - "Or import prompts from a backup file"
  - Small text, gray
  - Link to import functionality

### Visual Notes
- Friendly, inviting design
- Clear call-to-action
- Not intimidating or overwhelming
- Provides guidance on next steps

---

## Wireframe 5: Mobile Layout

### ASCII Layout

```
┌─────────────────────────────────────────┐
│ Mobile Header (Sticky)                  │
├─────────────────────────────────────────┤
│ [☰]  Prompt Vault          [🌙]        │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│                                         │
│                                         │
│         ┌───────────────────┐         │
│         │                   │         │
│         │   Prompt Card     │         │
│         │                   │         │
│         │   Title           │         │
│         │   [Category]      │         │
│         │   tag1 tag2      │         │
│         │                   │         │
│         │   Preview text... │         │
│         │                   │         │
│         │   Created: ...    │         │
│         │   ⭐⭐⭐            │         │
│         └───────────────────┘         │
│                                         │
│         ┌───────────────────┐         │
│         │   Prompt Card     │         │
│         │   Title           │         │
│         │   [Category]      │         │
│         │   Preview...      │         │
│         └───────────────────┘         │
│                                         │
│         ┌───────────────────┐         │
│         │   Prompt Card     │         │
│         │   Title           │         │
│         │   [Category]      │         │
│         │   Preview...      │         │
│         └───────────────────┘         │
│                                         │
│                    (Scrollable)         │
│                                         │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ Bottom Navigation Bar (Optional)         │
├─────────────────────────────────────────┤
│ [+ New] [🔍] [📤]                      │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Slide-out Sidebar (Hidden by default)  │
├─────────────────────────────────────────┤
│ [X]                                     │
│                                         │
│ ┌─────────────────────────────────┐   │
│ │ Search...                       │   │
│ └─────────────────────────────────┘   │
│                                         │
│ Categories ▼                            │
│ • All Prompts                           │
│ • Code                                  │
│ • Docs                                  │
│                                         │
│ Tags ▼                                  │
│ [tag1] [tag2]                           │
│ [tag3] [tag4]                           │
│                                         │
│ Frameworks ▼                            │
│                                         │
│                                         │
│                                         │
└─────────────────────────────────────────┘
```

### Header (Sticky, Full Width)
- **Left**: Hamburger menu icon (24x24px)
- **Center**: App title "Prompt Vault"
- **Right**: Dark mode toggle icon
- **Bottom Bar** (Optional):
  - Quick actions: New, Search, Export
  - Fixed at bottom
  - Icons with labels

### Sidebar (Slide-out Drawer)
- **Trigger**: Hamburger menu click
- **Animation**: Slide in from left
- **Overlay**: Dark semi-transparent background
- **Width**: 80% of screen width (max 320px)
- **Content**: Same as desktop sidebar
- **Close Button**: X icon, top-right
- **Close Methods**: 
  - Click X button
  - Click overlay
  - Swipe left
  - Press Escape

### Main Content (Full Width)
- **Single Column Layout**:
  - Prompt cards stack vertically
  - Full-width cards
  - Consistent padding: 16px
- **Card Structure**:
  - Same as desktop but optimized for mobile
  - Touch-friendly targets (min 44x44px)
  - Adequate spacing between cards

### Create/Edit Modal (Full Screen on Mobile)
- **Full-screen overlay**
- **Scrollable form**
- **Fixed action buttons** at bottom:
  - Sticky bottom bar
  - Cancel and Save buttons
  - Always visible while scrolling

### Visual Notes
- Touch-friendly targets (min 44x44px)
- Responsive layout adapts to screen size
- Readable text on small screens
- Optimized mobile interactions
- Swipe gestures for drawer
- Bottom navigation bar for quick actions

---

## Wireframe 6: Search Results State

### ASCII Layout

```
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│ Header                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────────────┤
│ Prompt Vault                      [🌙] [🧪 Test] [Import] [Export] [+ New Prompt]        │
└─────────────────────────────────────────────────────────────────────────────────────────────┘
┌──────────────────┬─────────────────────────────────────────────────────────────────────────┐
│                  │                                                                         │
│  Sidebar         │                    Main Content Area                                   │
│                  │                                                                         │
│  ┌────────────┐ │  ┌──────────────────────────────────────────────────────────────┐      │
│  │ api search │ │  │  Results: 3 prompts found                    [Clear Filters] │      │
│  └────────────┘ │  └──────────────────────────────────────────────────────────────┘      │
│                  │                                                                         │
│  Categories ▼   │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  • All Prompts  │  │ Prompt Card  │  │ Prompt Card  │  │ Prompt Card  │              │
│  • Code ✓      │  │              │  │              │  │              │              │
│  • Docs        │  │  API Docs    │  │  REST API    │  │  GraphQL     │              │
│  • Content     │  │  Generator    │  │  Prompt      │  │  Prompt      │              │
│                  │  │              │  │              │  │              │              │
│  Tags ▼         │  │  [Docs]      │  │  [Code]      │  │  [Code]      │              │
│  [api] ✓        │  │  api docs    │  │  api rest    │  │  api graphql  │              │
│  [rest]         │  │              │  │              │  │              │              │
│  [docs]         │  │  Generate    │  │  Create     │  │  Build        │              │
│                  │  │  API docs... │  │  REST API... │  │  GraphQL...  │              │
│  Frameworks ▼   │  │              │  │              │  │              │              │
│                  │  │  Created:    │  │  Created:    │  │  Created:    │              │
│                  │  │  Used:       │  │  Used:       │  │  Used:       │              │
│                  │  │  ⭐⭐⭐⭐       │  │  ⭐⭐⭐        │  │  ⭐⭐⭐⭐⭐      │              │
│                  │  └──────────────┘  └──────────────┘  └──────────────┘              │
│                  │                                                                         │
└──────────────────┴─────────────────────────────────────────────────────────────────────────┘
```

### Sidebar (Unchanged)
- Search input shows active query
- Active filters highlighted

### Main Content
- **Results Header**:
  - Result count: "X prompts found"
  - Clear filters button (if filters active)
  - Spacing: 16px margin bottom
- **Prompt Cards Grid**:
  - Same as default state
  - Filtered results displayed
- **No Results State**:
  - Icon/Illustration
  - Heading: "No prompts match your filters"
  - Subtext: "Try adjusting your search or filters"
  - Clear Filters button

---

## Wireframe 7: Category Management Modal

### ASCII Layout

```
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                                    Modal Overlay                                           │
│  ┌─────────────────────────────────────────────────────────────────────────────────────┐  │
│  │ Create New Category                                                         [X]    │  │
│  ├─────────────────────────────────────────────────────────────────────────────────────┤  │
│  │                                                                                     │  │
│  │                                                                                     │  │
│  │                                                                                     │  │
│  │ Category Name                                                                       │  │
│  │ ┌─────────────────────────────────────────────────────────────────────────────┐   │  │
│  │ │ Enter category name...                                                       │   │  │
│  │ └─────────────────────────────────────────────────────────────────────────────┘   │  │
│  │                                                                                     │  │
│  │ [Existing categories: Code, Docs, Content]                                        │  │
│  │                                                                                     │  │
│  │                                                                                     │  │
│  │                                                                                     │  │
│  │                                                                                     │  │
│  │                                                                                     │  │
│  │                                                                                     │  │
│  ├─────────────────────────────────────────────────────────────────────────────────────┤  │
│  │                                 [Cancel]  [Create]                                  │  │
│  └─────────────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                             │
└─────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Modal Structure
- Small modal (max-width: 400px)
- Centered overlay

### Content
- **Title**: "Create New Category"
- **Input Field**:
  - Full width
  - Placeholder: "Enter category name..."
  - Autocomplete showing existing categories
- **Action Buttons**:
  - Cancel (left)
  - Create (right, blue)
- **Validation**:
  - Error message below input if invalid
  - Duplicate warning if category exists

---

## Wireframe 8: Import/Export Interface

### ASCII Layout - Export Flow

```
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│ User clicks "Export" button                                                                │
│                                                                                             │
│                           ┌─────────────────────────────┐                                   │
│                           │                             │                                   │
│                           │   Export successful!        │                                   │
│                           │                             │                                   │
│                           │   File downloaded:           │                                   │
│                           │   prompt-vault-export-       │                                   │
│                           │   2024-01-22.json           │                                   │
│                           │                             │                                   │
│                           │         [OK]                │                                   │
│                           └─────────────────────────────┘                                   │
│                                                                                             │
└─────────────────────────────────────────────────────────────────────────────────────────────┘
```

### ASCII Layout - Import Flow

```
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                                    Modal Overlay                                           │
│  ┌─────────────────────────────────────────────────────────────────────────────────────┐  │
│  │ Import Prompts                                                             [X]    │  │
│  ├─────────────────────────────────────────────────────────────────────────────────────┤  │
│  │                                                                                     │  │
│  │                                                                                     │  │
│  │ Select a JSON file to import:                                                      │  │
│  │                                                                                     │  │
│  │ ┌─────────────────────────────────────────────────────────────────────────────┐   │  │
│  │ │                                                                               │   │  │
│  │ │              📁  Drag and drop file here                                     │   │  │
│  │ │                                                                               │   │  │
│  │ │                   or                                                          │   │  │
│  │ │                                                                               │   │  │
│  │ │              [Browse Files]                                                   │   │  │
│  │ │                                                                               │   │  │
│  │ └─────────────────────────────────────────────────────────────────────────────┘   │  │
│  │                                                                                     │  │
│  │ File: prompt-vault-export-2024-01-20.json                                           │  │
│  │                                                                                     │  │
│  │ Preview:                                                                           │  │
│  │ • 15 prompts will be imported                                                      │  │
│  │ • 3 categories will be imported                                                     │  │
│  │                                                                                     │  │
│  │ ⚠️ Note: Imported prompts will be assigned new IDs to avoid conflicts             │  │
│  │                                                                                     │  │
│  │                                                                                     │  │
│  ├─────────────────────────────────────────────────────────────────────────────────────┤  │
│  │                                 [Cancel]  [Import]                                  │  │
│  └─────────────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                             │
└─────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Export Flow
- **Trigger**: Click Export button
- **Action**: Immediate download
- **Feedback**: Toast notification "Export successful"

### Import Flow
- **Modal Opens**: File selection dialog
- **File Input**: 
  - Drag and drop area
  - Or click to browse
- **Preview** (Optional):
  - Show number of prompts to import
  - Show categories to import
- **Action Buttons**:
  - Cancel
  - Import (blue)
- **Progress** (During import):
  - Progress bar
  - Status message
- **Success**:
  - Toast notification
  - Show import count
  - Refresh UI

---

## Component Specifications

### Spacing Scale
- **4px**: Tight spacing (tags, badges)
- **8px**: Small spacing (list items)
- **16px**: Standard spacing (sections, cards)
- **24px**: Large spacing (major sections)
- **32px**: Extra large spacing (page-level)

### Typography Scale
- **text-xs**: 12px - Metadata, labels
- **text-sm**: 14px - Secondary text, buttons
- **text-base**: 16px - Body text, inputs
- **text-lg**: 18px - Card titles
- **text-xl**: 20px - Modal titles
- **text-2xl**: 24px - Page titles

### Color Usage
- **Primary Actions**: Green (#16A34A)
- **Secondary Actions**: Blue (#2563EB)
- **Destructive Actions**: Red (#DC2626)
- **Neutral**: Gray scale
- **Accent**: Purple for special actions

### Border Radius
- **Small**: 4px - Tags, badges
- **Medium**: 8px - Cards, inputs, buttons
- **Large**: 12px - Modals

---

## Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md-lg)
- **Desktop**: > 1024px (xl+)

### Layout Adaptations
- **Mobile**: Single column, drawer sidebar
- **Tablet**: Two column, fixed sidebar
- **Desktop**: Two column, fixed sidebar, wider content

---

## Next Steps

- Create high-fidelity mockups from wireframes
- Validate wireframes with user testing
- Refine based on feedback
- Create interactive prototypes
- Document responsive behavior in detail

---

**Document Version**: 2.0  
**Last Updated**: 2024  
**Status**: Updated based on current implementation

