# Template Dropdown Description Feature - Scope Document

## Overview
Add descriptions to each template item in the select template dropdown menu within the new prompt modal.

## Questions & Answers

### 1. Should descriptions be displayed directly in the dropdown menu items (inline with the title)?
**Answer:** No

### 2. Should descriptions be truncated with ellipsis if they exceed a certain character length?
**Answer:** No

### 3. Should descriptions be shown on hover (tooltip) instead of always visible?
**Answer:** Yes (Initially implemented as tooltip, later changed to expandable panel)

### 4. Should descriptions be displayed below the template title in the dropdown?
**Answer:** Yes

### 5. Should descriptions be styled differently (e.g., smaller font, gray color) to distinguish from titles?
**Answer:** Yes

### 6. Should descriptions support markdown formatting or HTML?
**Answer:** Plain HTML/Text (Final implementation uses plain text for simplicity)

**Implementation Decision:** Initially considered Markdown, but switched to plain HTML/text for simplicity. Descriptions are stored as plain strings in `TEMPLATE_DESCRIPTIONS` and `FRAMEWORK_DESCRIPTIONS` objects. This approach:
- Eliminates dependency on markdown parser library
- Reduces complexity and potential parsing issues
- Provides better performance
- Keeps descriptions simple and readable
- Uses HTML escaping for security when needed

### 7. Should descriptions be sourced from a new `description` field in the PROMPT_TEMPLATES object?
**Answer:** Descriptions already exist in the codebase. Framework descriptions are displayed in the left column/sidebar (see `frameworks` array around line 4773). These descriptions follow the pattern: "Good for: [description]". Templates should use similar descriptions, likely mapped from framework descriptions based on the template's `category` field, or extracted from existing template metadata.

**Note:** Current framework descriptions in sidebar (lines 865-1561) show "Good for:" format. Templates can either:
- Map to framework descriptions via `category` field
- Have their own descriptions added to PROMPT_TEMPLATES
- Extract descriptions from template content metadata

### 8. Should descriptions be visible in both light and dark mode with appropriate styling?
**Answer:** Yes

### 9. Should descriptions be searchable/filterable when users type in the template dropdown?
**Answer:** Yes

### 10. Should descriptions be optional (only show if a description exists for a template)?
**Answer:** Yes

## Current Implementation Notes
- Template dropdown is located in the new prompt modal (lines 1721-1874)
- Templates are stored in `PROMPT_TEMPLATES` object (referenced starting around line 2324)
- Current template structure includes: `title`, `category`, `tags`, `content`
- Dropdown items show: icon + title + description (if available)
- Templates are grouped by category in the dropdown
- Framework descriptions exist in `FRAMEWORK_DESCRIPTIONS` object (lines 2341-2367)
- Template-specific descriptions exist in `TEMPLATE_DESCRIPTIONS` object (lines 2370-2419)
- Framework descriptions are displayed in sidebar with "Good for:" prefix (lines 865-1561)

## Implementation Plan

### Phase 1: Data Source ✅ COMPLETED
1. ✅ Created `FRAMEWORK_DESCRIPTIONS` mapping object (lines 2341-2367) - maps framework categories to generic descriptions
2. ✅ Created `TEMPLATE_DESCRIPTIONS` mapping object (lines 2370-2419) - maps template IDs to specific descriptions (48+ templates)
3. ✅ Description resolution logic (lines 1756-1771): First checks `TEMPLATE_DESCRIPTIONS[template.id]`, then falls back to `FRAMEWORK_DESCRIPTIONS[category]`
4. ✅ Descriptions are plain strings, no markdown formatting

### Phase 2: Display Implementation ✅ COMPLETED
1. ✅ Added description display below template title in dropdown items (lines 1817-1822)
2. ✅ Styled descriptions with smaller font (`text-xs`) and gray color (`text-gray-500 dark:text-gray-400`)
3. ✅ Descriptions are visible in both light and dark mode with appropriate styling
4. ✅ Descriptions are optional (only render if description exists using `x-if` template directive)
5. ✅ Each template has a custom icon displayed via `getTemplateIcon()` function (line 2558-2609)

### Phase 3: Tooltip Implementation → Expandable Panel ✅ COMPLETED
**Initial Approach:** Implemented hover tooltips with custom positioning
**Final Approach:** Replaced with expandable details panel for better UX

1. ✅ Removed tooltip implementation (hover-based)
2. ✅ Implemented expandable details panel that shows/hides on click (lines 1837-1863)
3. ✅ Added chevron button (▼) to toggle expansion (lines 1825-1835)
4. ✅ Panel displays both description and example prompt preview when expanded
5. ✅ Smooth expand/collapse animations using Alpine.js transitions (lines 1841-1846)
6. ✅ Fixed alignment issues - chevron buttons align properly with rows (matching `py-2.5` padding)
7. ✅ Separated template selection (main button, lines 1809-1824) from details expansion (chevron button)
8. ✅ Chevron button only shows if description or preview exists (line 1830: `x-show="description || getPreview()"`)

**Benefits of Expandable Panel:**
- Better mobile experience (no hover required)
- More accessible (keyboard and screen reader friendly)
- No positioning issues (inline expansion)
- Users control when to see details
- Can show more content (description + preview)

### Phase 4: Search/Filter Enhancement ✅ COMPLETED
1. ✅ Added search input inside dropdown (lines 1734-1743)
2. ✅ Implemented `filteredTemplates()` function (lines 2534-2556) that searches by:
   - Template title (case-insensitive)
   - Template description (via `getTemplateDescription()`)
   - Template tags (if present)
3. ✅ Search is case-insensitive and filters in real-time as user types
4. ✅ Shows "No templates found" message when search yields no results (line 1868)

### Phase 5: Formatting Decision ✅ COMPLETED
1. ✅ Removed Marked.js markdown parser library (switched to plain text)
2. ✅ Created `escapeHtml()` function for HTML escaping when needed (lines 2422-2425)
3. ✅ Descriptions are stored as plain strings and displayed with `x-text` directive (line 1820, 1853)
4. ✅ Template preview uses plain text display in expandable panel (line 1859)

## Final Implementation Details

### Data Structure
- **`FRAMEWORK_DESCRIPTIONS`** (lines 2341-2367): Object mapping framework categories to generic descriptions (26 frameworks)
- **`TEMPLATE_DESCRIPTIONS`** (lines 2370-2419): Object mapping template IDs to specific descriptions (48+ templates)
- **Description Resolution** (lines 1756-1771): Inline logic that checks `TEMPLATE_DESCRIPTIONS[template.id]` first, then falls back to `FRAMEWORK_DESCRIPTIONS[category]`
- Descriptions are plain strings, no formatting required
- **`templateDropdown()` function** (line 2429): Alpine.js component function that returns dropdown state and methods including `templates()`, `filteredTemplates()`, `getTemplateDescription()`, `getTemplateIcon()`

### UI Components
- **Main Button** (lines 1809-1824): Click to select and load template into form
- **Chevron Button** (lines 1825-1835): Click to expand/collapse details panel (only visible if description or preview exists)
- **Expandable Panel** (lines 1837-1863): Shows description and example prompt preview when expanded
- **Search Input** (lines 1734-1743): Filters templates by title, description, or tags in real-time
- **Template Icons** (lines 2558-2609): Custom SVG icons for each template via `getTemplateIcon()` function

### Preview Functionality
- **Preview Generation** (lines 1775-1794): `getPreview()` function extracts up to 500 characters from template content
- **Smart Truncation**: Prefers breaking at newlines, then periods, then spaces (at 70% of max length)
- **Preview Display** (line 1859): Shown in expandable panel as formatted pre block with monospace font

### Styling
- **Descriptions**: `text-xs text-gray-500 dark:text-gray-400` (lines 1819, 1853)
- **Expanded panel**: `bg-gray-50 dark:bg-gray-800` with proper borders (line 1847)
- **Chevron icon**: Rotates 180° when expanded via `:class="expanded ? 'rotate-180' : ''"` (line 1829)
- **Smooth transitions**: 200ms ease animations using Alpine.js transitions (lines 1841-1846)
- **Preview styling**: Monospace font, scrollable, max-height 64 (line 1859)

### Alignment & Layout
- **Row structure**: Flex container with main button (flex-1) and chevron button (flex-shrink-0) (line 1808)
- **Border spans full width**: Applied to parent container (line 1808)
- **Button padding**: Both buttons have matching vertical padding (`py-2.5`) for alignment
- **Chevron icon**: Vertically centered using flexbox (`flex items-center`)
- **Proper row alignment**: Consistent across all dropdown items

## Technical Considerations
- Descriptions should not break dropdown layout ✅ (descriptions are optional and properly styled)
- Expandable panels use Alpine.js transitions for smooth animations ✅ (x-transition directives, lines 1841-1846)
- Search functionality is performant with many templates ✅ (real-time filtering via `filteredTemplates()` computed property)
- Implementation is accessible (keyboard navigation, screen readers) ✅ (button elements, proper ARIA patterns)
- Mobile-friendly (no hover required) ✅ (click-based expansion, touch-friendly targets)
- No positioning issues (inline expansion) ✅ (expands within dropdown flow, no absolute positioning)
- Template selection clears search query ✅ (line 1803: `$root.searchQuery = ''`)
- Template selection resets selectedTemplateId after loading ✅ (line 1804: `$nextTick(() => $root.selectedTemplateId = '')`)

