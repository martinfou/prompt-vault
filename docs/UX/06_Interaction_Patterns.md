# Interaction Patterns

## Overview

This document defines interaction patterns for Prompt Vault components, including UI component behaviors, feedback mechanisms, state changes, and animation/transition notes.

---

## Component 1: Prompt Card

### States
- **Default**: Standard card appearance
  - Background: white (dark: gray-800)
  - Border: 1px solid gray-200 (dark: gray-700)
  - Shadow: subtle shadow
- **Hover**: Slight elevation increase
  - Shadow: Increased shadow depth
  - Cursor: pointer
  - Transform: Slight scale (1.02) optional
- **Active/Selected**: Highlighted border or background tint
  - Border: 2px solid blue-500
  - Background tint: blue-50 (dark: blue-900)
- **Loading**: Skeleton loader or shimmer effect
  - Animated placeholder content
  - Gray background with shimmer

### Interactions
- **Click**: Opens prompt detail view (modal)
- **Hover**: Shows preview of full content (optional tooltip)
- **Long Press** (Mobile): Context menu with quick actions
  - Edit
  - Duplicate
  - Delete
  - Mark as Used

### Feedback
- **Visual**: Hover state change
- **Animation**: Smooth transition (200ms ease)
- **Click Feedback**: 
  - Ripple effect (optional)
  - Scale animation (0.98 for 100ms)
- **Loading**: Shimmer animation during load

### Accessibility
- **Keyboard Navigation**: 
  - Tab to focus card
  - Enter to open detail view
  - Escape to close
- **ARIA Labels**: 
  - `role="button"`
  - `aria-label`: "View prompt: [title]"
- **Focus Indicators**: 
  - Visible outline (2px blue)
  - Clear focus ring

---

## Component 2: Search Input

### States
- **Default**: Empty input with placeholder
  - Placeholder: "Search prompts..."
  - Border: gray-300 (dark: gray-600)
- **Focus**: Border highlight, cursor active
  - Border: blue-500, 2px
  - Ring: Blue ring (focus ring)
- **Typing**: Real-time filtering, results update
  - Border: Blue-500
  - Results update as user types
- **Empty Results**: Show "No results" message
  - Border: Blue-500 (maintains focus)
  - Empty state message appears
- **Loading**: Loading indicator (if needed)
  - Spinner icon in input (right side)
  - Debounced search

### Interactions
- **Type**: Real-time search/filter as user types
  - Debounce: 300ms delay
  - Updates filtered results immediately
- **Focus**: Highlight search box
  - Focus ring appears
  - Cursor in input
- **Clear**: Clear button appears when text entered
  - X icon appears on right side
  - Click to clear search
- **Escape**: Clear search and reset filters
  - Clears input
  - Resets all filters
  - Returns to full list

### Feedback
- **Instant Visual Feedback**: 
  - Results filter as user types
  - Smooth transitions
- **Result Count Indicator** (Optional):
  - Shows "X results" below input
  - Updates in real-time
- **Highlight Matching Text** (Optional):
  - Highlight search terms in results
  - Bold matching text

### Debouncing
- **Delay**: 300ms
- **Purpose**: Reduce unnecessary filtering operations
- **Implementation**: Debounce input handler

---

## Component 3: Category/Tag Filters

### States
- **Inactive**: Default appearance (gray/neutral)
  - Background: gray-200 (dark: gray-700)
  - Text: gray-700 (dark: gray-300)
- **Active**: Highlighted appearance (colored background/border)
  - Background: blue-600
  - Text: white
  - Border: 2px solid blue-700 (optional)
- **Hover**: Slight color change, cursor pointer
  - Background: Lighter shade
  - Transition: Smooth color change

### Interactions
- **Click**: Toggle filter on/off
  - Category: Single selection (mutually exclusive)
  - Tags: Multiple selection (can select multiple)
- **Multiple Tags**: Can select multiple tags simultaneously
  - Each tag toggles independently
  - OR logic: Shows prompts with ANY selected tag
- **Category**: Single selection (mutually exclusive with other categories)
  - Selecting new category deselects previous
  - "All Prompts" clears category filter

### Feedback
- **Immediate Visual State Change**: 
  - Active/inactive state updates instantly
  - Color change animation (200ms)
- **Result List Updates**: 
  - Filters apply immediately
  - Smooth transition to filtered results
- **Clear Active Filter Indicators**:
  - Active filters visually distinct
  - Count badges (optional)
- **Combined Filters**: 
  - Search + Category + Tags work together (AND logic)
  - Clear all filters button (when filters active)

### Visual Indicators
- **Active State**: 
  - Blue background
  - White text
  - Bold or increased weight
- **Inactive State**: 
  - Gray background
  - Dark text
- **Hover State**: 
  - Lighter background
  - Smooth transition

---

## Component 4: Modal/Dialog

### States
- **Closed**: Hidden from view
  - Display: none
  - Opacity: 0
- **Opening**: Fade-in animation, overlay appears
  - Overlay: Fade in (200ms)
  - Modal: Scale up + fade in (200ms)
  - Backdrop: Appears
- **Open**: Visible, focus trapped inside
  - Display: block
  - Opacity: 1
  - Focus: First focusable element
- **Closing**: Fade-out animation
  - Reverse of opening animation
  - Focus returns to trigger

### Interactions
- **Open**: Triggered by button click
  - Create prompt button
  - Edit button
  - Import button
- **Close**: Multiple methods
  - Click close button (X)
  - Click outside modal (overlay)
  - Press Escape key
  - Click Cancel button
- **Submit**: Click Save button (form validation first)
  - Validate form
  - Show errors if invalid
  - Save if valid
  - Close on success

### Feedback
- **Smooth Animations**: 
  - Fade-in/out: 200ms ease
  - Scale animation: 0.95 to 1.0
- **Focus Management**: 
  - Focus moves to modal when opened
  - Focus trapped inside modal
  - Focus returns to trigger on close
- **Scrollable Content**: 
  - Content area scrolls if exceeds viewport
  - Fixed header/footer
- **Loading State**: 
  - Disabled buttons during save
  - Spinner or loading indicator
  - Prevents multiple submissions

### Accessibility
- **Focus Trap**: 
  - Tab key cycles within modal
  - Shift+Tab cycles backwards
  - Cannot tab outside modal
- **Escape Key**: 
  - Closes modal
  - Returns focus to trigger
- **ARIA Labels**: 
  - `role="dialog"`
  - `aria-modal="true"`
  - `aria-labelledby`: Modal title
- **Focus Return**: 
  - Returns to trigger element on close
  - Maintains user's position

---

## Component 5: Form Inputs

### States
- **Default**: Empty input with placeholder
  - Placeholder: Visible, gray text
  - Border: gray-300 (dark: gray-600)
- **Focus**: Border highlight, cursor active
  - Border: blue-500, 2px
  - Ring: Blue focus ring
  - Placeholder: Slightly faded
- **Filled**: Shows entered value
  - Text: Dark (dark: light)
  - Border: Blue-500 (maintains focus state)
- **Error**: Red border, error message below
  - Border: red-500
  - Error message: Red text, appears below input
  - Icon: Optional error icon
- **Success**: Green border (optional, after validation)
  - Border: green-500
  - Checkmark icon (optional)
- **Disabled**: Grayed out, not interactive
  - Background: gray-100 (dark: gray-800)
  - Text: gray-400
  - Cursor: not-allowed

### Interactions
- **Type**: Value updates in real-time
  - Input value updates immediately
  - Validation on blur (optional real-time)
- **Focus**: Highlight border, show helper text
  - Border color changes
  - Helper text appears (if available)
- **Blur**: Validate on blur (if needed)
  - Validation runs
  - Error message appears if invalid
- **Autocomplete**: Show suggestions dropdown
  - Appears on focus or typing
  - Filters as user types
  - Click to select
- **Enter Key**: 
  - Submit form (in single-line inputs)
  - Add tag (in tag input)
  - Create category (in category input)

### Feedback
- **Real-time Validation Feedback**: 
  - Shows errors as user types (optional)
  - Or on blur
- **Error Messages**: 
  - Appear below input
  - Red text
  - Clear, actionable messages
- **Success Indicators** (Optional): 
  - Checkmark icon
  - Green border
- **Character/Word Count**: 
  - Updates in real-time
  - Shows limit if applicable

### Accessibility
- **Label Association**: 
  - `<label for="input-id">` or `<label><input>`
  - Proper association for screen readers
- **Error Announcements**: 
  - `aria-describedby` points to error message
  - Screen reader announces errors
- **Required Field Indicators**: 
  - Asterisk (*) for required fields
  - `aria-required="true"`
- **Help Text**: 
  - Helper text for complex inputs
  - `aria-describedby` for help text

---

## Component 6: Dropdown/Autocomplete

### States
- **Closed**: Input visible, dropdown hidden
  - Dropdown: Display none
  - Input: Normal state
- **Open**: Dropdown appears below input
  - Dropdown: Display block
  - Position: Below input, aligned left
  - Max-height: 200px, scrollable
- **Loading**: Loading spinner in dropdown
  - Spinner: Centered in dropdown
  - Disabled options
- **Empty**: "No results" message
  - Message: Centered in dropdown
  - Gray text

### Interactions
- **Focus Input**: Opens dropdown
  - Dropdown appears
  - Shows all options or filtered options
- **Type**: Filters options in real-time
  - Options filter as user types
  - Debounced if needed
- **Arrow Keys**: Navigate options (up/down)
  - Highlights option
  - Scrolls if needed
- **Enter**: Select highlighted option
  - Selects option
  - Closes dropdown
  - Fills input
- **Escape**: Close dropdown
  - Closes dropdown
  - Maintains input focus
- **Click Option**: Select option, close dropdown
  - Selects option
  - Closes dropdown
  - Updates input
- **Click Outside**: Close dropdown
  - Closes dropdown
  - Maintains input value

### Feedback
- **Highlight Active Option**: 
  - Keyboard navigation highlights option
  - Background: blue-100 (dark: blue-900)
- **Selected Option Visually Distinct**: 
  - Checkmark icon (optional)
  - Bold text
  - Different background
- **Smooth Animations**: 
  - Fade in/out: 150ms
  - Slide down: 150ms
- **Loading State**: 
  - Spinner during async operations
  - Disabled options

### Accessibility
- **ARIA Expanded State**: 
  - `aria-expanded="true/false"`
  - Indicates dropdown state
- **ARIA Selected State**: 
  - `aria-selected="true"` for highlighted option
- **Keyboard Navigation**: 
  - Arrow keys navigate
  - Enter selects
  - Escape closes
- **Screen Reader Announcements**: 
  - Announces when dropdown opens/closes
  - Announces selected option

---

## Component 7: Rating Stars

### States
- **Unrated**: Empty/gray stars
  - Stars: Gray color
  - Hover: Preview fill
- **Rated**: Filled stars up to selected rating
  - Filled stars: Yellow/gold color
  - Empty stars: Gray color
- **Hover**: Preview rating (fill stars up to hovered position)
  - Interactive preview
  - Shows potential rating

### Interactions
- **Click Star**: Set rating to clicked position
  - Sets rating value
  - Updates visual state
  - Saves rating (if in edit mode)
- **Hover**: Preview rating (optional)
  - Shows fill preview
  - Indicates potential rating
- **Clear**: Click "Clear" button to remove rating
  - Removes rating
  - Resets to unrated state

### Feedback
- **Immediate Visual Update**: 
  - Stars fill/unfill instantly
  - Smooth animation (optional)
- **Smooth Fill Animation**: 
  - Stars fill sequentially
  - 100ms delay between stars
- **Rating Value Display**: 
  - Shows "3/5" or similar
  - Updates in real-time

### Accessibility
- **Keyboard Navigation**: 
  - Arrow keys navigate stars
  - Enter selects
  - Space selects
- **ARIA Labels**: 
  - `aria-label`: "Rating: X out of 5 stars"
  - `aria-value`: Current rating
- **Value Announcement**: 
  - Screen reader announces on change
  - "Rating set to X out of 5"

---

## Component 8: Dark Mode Toggle

### States
- **Light Mode**: Sun icon visible
  - Icon: Sun/sunshine icon
  - Tooltip: "Switch to dark mode"
- **Dark Mode**: Moon icon visible
  - Icon: Moon/crescent icon
  - Tooltip: "Switch to light mode"
- **Transitioning**: Smooth color transition
  - Colors transition smoothly
  - Icon changes

### Interactions
- **Click**: Toggle between light and dark mode
  - Switches theme
  - Updates icon
  - Saves preference
- **Preference**: Remembers user preference (localStorage)
  - Saves to localStorage
  - Restores on page load

### Feedback
- **Smooth Color Transition**: 
  - 200ms transition duration
  - All colors transition together
- **Icon Change Animation**: 
  - Fade out/in: 150ms
  - Icon rotates (optional)
- **Immediate Visual Feedback**: 
  - Theme changes instantly
  - No flash or delay

### Persistence
- **Preference Saved**: 
  - Saved to localStorage
  - Key: "darkMode"
  - Value: boolean
- **Restored on Load**: 
  - Checks localStorage on init
  - Applies saved preference
  - Updates icon

---

## Component 9: Export/Import

### Export Interaction
- **Click Export**: Immediately triggers download
  - No confirmation needed
  - Immediate action
- **File**: JSON file with timestamp in filename
  - Filename: `prompt-vault-export-YYYY-MM-DD.json`
  - Contains all prompts and categories
- **Feedback**: Toast notification "Export successful"
  - Appears bottom-right
  - Auto-dismisses after 3 seconds

### Import Interaction
- **Click Import**: Opens file picker dialog
  - File input dialog
  - Accepts .json files
- **Select File**: File validation
  - Validates file type
  - Validates JSON structure
- **Validate**: Check JSON structure
  - Validates schema
  - Checks required fields
- **Process**: Merge data (assign new IDs)
  - Assigns new IDs to prevent conflicts
  - Merges with existing data
- **Feedback**: 
  - Success: Toast notification, refresh UI
  - Error: Error message with details
  - Progress: Progress bar (if large file)

### Error Handling
- **Invalid File Format Error**: 
  - Message: "Invalid file format. Please select a valid JSON file."
  - Action: Allow retry
- **Corrupted Data Error**: 
  - Message: "File appears to be corrupted. Please check the file and try again."
  - Action: Allow retry
- **File Too Large Error** (if applicable): 
  - Message: "File is too large. Maximum size: X MB."
  - Action: Allow retry

---

## Component 10: Template Selection

### Interaction Flow
1. User clicks "+ New Prompt"
2. Modal opens with template dropdown visible
3. User selects template from dropdown
4. Form fields populate with template content
5. User can modify or use as-is
6. Save prompt

### Feedback
- **Template Selection Updates Form Immediately**: 
  - Form fields populate instantly
  - No delay or loading
- **Visual Indication of Template Selection**: 
  - Dropdown shows selected template
  - Form shows pre-filled content
- **Option to Clear Template**: 
  - "Clear Template" button (optional)
  - Resets form to empty
  - Allows manual entry

---

## Animation Principles

### Duration
- **Micro-interactions**: 100-150ms (button clicks, hovers)
- **Transitions**: 200-300ms (modals, dropdowns)
- **Animations**: 300-500ms (complex animations)

### Easing Functions
- **Ease-out**: For entering animations (modals, dropdowns)
- **Ease-in**: For exiting animations
- **Ease-in-out**: For bidirectional animations

### Performance
- **GPU Acceleration**: Use transform and opacity
- **Avoid Layout Shifts**: Use transform instead of top/left
- **Debounce**: For expensive operations (search)

---

## State Management Patterns

### Loading States
- **Spinner**: For async operations
- **Skeleton**: For content loading
- **Disabled State**: Prevent interaction during loading

### Error States
- **Inline Errors**: Below form fields
- **Toast Notifications**: For global errors
- **Error Boundaries**: Catch unexpected errors

### Success States
- **Toast Notifications**: Confirm successful actions
- **Visual Feedback**: Checkmarks, success colors
- **Auto-dismiss**: After 3 seconds

---

## Next Steps

- Implement interaction patterns in code
- Test with real users
- Refine based on feedback
- Document edge cases
- Create interaction specifications

---

**Document Version**: 2.0  
**Last Updated**: 2024  
**Status**: Updated based on current implementation

