# Prompt Vault

A modern, single-page web application for storing, organizing, and managing LLM (Large Language Model) prompts. Built with Alpine.js and Tailwind CSS, Prompt Vault provides an intuitive interface for prompt management with features like categories, tags, search, and dark mode support.

## Features

### Core Functionality
- ✅ **Prompt Management**: Create, read, update, and delete prompts
- ✅ **Categories**: Organize prompts with custom categories
- ✅ **Tags**: Tag prompts with multiple tags for flexible organization
- ✅ **Search**: Full-text search across titles, content, tags, and categories
- ✅ **Filtering**: Filter prompts by category and tags
- ✅ **Templates**: 7 pre-built prompt templates for common use cases:
  - Professional Git Commit Message Generator
  - Senior Programmer Assistant
  - Scrum Master - Sprint Planning Assistant
  - Software Architect Advisor
  - Code Review Assistant
  - Technical Documentation Architect
  - UX Designer & User Experience Architect

### Advanced Features
- 🌙 **Dark Mode**: Toggle between light and dark themes
- 📋 **Syntax Highlighting**: View prompts with syntax highlighting
- 📊 **Word Count**: Track word and character counts for prompts
- 📅 **Usage Tracking**: Track when prompts were created, modified, and last used
- 🔄 **Duplicate**: Quickly duplicate existing prompts
- 📥 **Import/Export**: Import and export prompts as JSON files
- 🎯 **Mark as Used**: Track prompt usage history

### User Experience
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices
- ⚡ **Fast & Lightweight**: Single HTML file, no build process required
- 💾 **Local Storage**: All data stored locally in your browser
- 🎨 **Modern UI**: Clean, intuitive interface built with Tailwind CSS

## Setup Instructions

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies or build tools required

### Installation

1. **Clone or download the repository**
   ```bash
   git clone <repository-url>
   cd prompt-vault
   ```

2. **Open the application**
   - Simply open `index.html` in your web browser
   - Or use a local web server:
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js http-server
     npx http-server
     
     # Using PHP
     php -S localhost:8000
     ```
   - Then navigate to `http://localhost:8000` in your browser

3. **Start using Prompt Vault**
   - The application loads immediately
   - All data is stored in your browser's localStorage
   - No account or registration required

## Usage Guide

### Creating a Prompt

1. Click the **"+ New Prompt"** button in the header
2. Optionally select a template from the dropdown
3. Fill in:
   - **Title**: A descriptive name for your prompt
   - **Category**: Type a new category or select from existing ones
   - **Tags**: Comma-separated tags (e.g., "code, review, best-practices")
   - **Content**: Your prompt text
4. Click **"Save"** to store the prompt

### Editing a Prompt

1. Click on any prompt in the list to view it
2. Click the **"Edit"** button
3. Make your changes
4. Click **"Save"**

### Organizing Prompts

- **Categories**: Click the "+ Add" button next to Categories in the sidebar to create new categories
- **Tags**: Add tags when creating/editing prompts, then click tag buttons in the sidebar to filter
- **Search**: Use the search box in the sidebar to find prompts by any keyword

### Importing/Exporting

- **Export**: Click the **"Export"** button to download all prompts and categories as a JSON file
- **Import**: Click the **"Import"** button and select a JSON file to import prompts and categories

### Backup and Restore

**Regular Backups:**
- Prompt Vault stores all data in your browser's localStorage
- **Important**: Export your data regularly as a backup!
- Click the **"Export"** button to download a JSON backup file
- The exported file includes:
  - All prompts (with titles, content, categories, tags, dates)
  - All categories
  - Export timestamp

**Restoring from Backup:**
1. Click the **"Import"** button
2. Select your previously exported JSON file
3. Your prompts and categories will be merged with existing data
4. Prompts are assigned new IDs to avoid conflicts

**Switching Browsers or Devices:**
1. Export your data from the current browser/device
2. Import the JSON file in the new browser/device
3. Your prompts will be available in the new location

**Before Clearing Browser Data:**
⚠️ **Warning**: Clearing browser data (cookies, localStorage) will delete all your prompts!
- Always export your data before clearing browser data
- Store backup files in a safe location (cloud storage, external drive)

**Backup Best Practices:**
- Export weekly or after adding important prompts
- Keep multiple backup copies
- Name backups with dates (e.g., `prompt-vault-export-2024-01-15.json`)
- Store backups in multiple locations (local drive + cloud)

### Keyboard Shortcuts

When creating or editing prompts:
- **Enter** (in category field): Confirm category name and create if it doesn't exist
- **Escape**: Close dropdown menus and modals

General navigation:
- **Click** on prompt card: View prompt details
- **Click** on category in sidebar: Filter by category
- **Click** on tag in sidebar: Toggle tag filter
- **Type** in search box: Filter prompts by keyword

## File Structure

```
prompt-vault/
├── index.html          # Main application file
├── README.md           # Project documentation
├── LICENSE             # MIT License
├── .gitignore          # Git ignore rules
├── test.html           # Automated test suite
├── test-buttons.html   # Button functionality tests
├── test-page.html      # Interactive test page
├── test-script.js      # Console-based test script
├── test-create-prompt.js # Test script for creating prompts
├── APPLICATION_REVIEW.md # Comprehensive code review
└── TESTING_SUMMARY.md  # Testing documentation
```

## Technical Details

### Technologies Used
- **Alpine.js 3.x**: Lightweight JavaScript framework for reactivity
- **Tailwind CSS**: Utility-first CSS framework (via CDN)
- **Highlight.js**: Syntax highlighting library
- **LocalStorage API**: Client-side data persistence

### Browser Compatibility

**Fully Supported:**
- ✅ **Chrome/Chromium** 90+ (Desktop & Mobile)
- ✅ **Microsoft Edge** 90+ (Desktop & Mobile)
- ✅ **Firefox** 88+ (Desktop & Mobile)
- ✅ **Safari** 14+ (Desktop & Mobile)
- ✅ **Opera** 76+

**Minimum Requirements:**
- ES6+ JavaScript support
- LocalStorage API support
- CSS Grid and Flexbox support
- Modern CSS features (CSS Variables, media queries)

**Known Limitations:**
- **Internet Explorer**: Not supported (IE11 and below)
- **Very old browsers**: May not support all features
- **Private/Incognito mode**: Data may be cleared when session ends (browser-dependent)

**Browser-Specific Notes:**
- **Safari**: Some older versions may have localStorage limitations
- **Firefox**: Private browsing mode clears localStorage on window close
- **Chrome/Edge**: Best overall compatibility and performance

**Mobile Browser Support:**
- iOS Safari 14+
- Chrome Mobile (Android)
- Firefox Mobile
- Samsung Internet

**Testing Recommendations:**
- Test on your primary browser before committing important data
- Use Export feature to migrate between browsers if needed

### Data Storage
- All data is stored in the browser's localStorage
- Data persists across browser sessions
- Data is specific to the browser and device
- Export/Import feature allows data backup and migration

## Development

### Running Tests
- Open `test.html` in your browser for automated button tests
- Or run `test-script.js` in the browser console on `index.html`
- Use the "🧪 Test Buttons" button in the app header for quick tests

### Customization
- Modify `index.html` directly to customize the application
- All code is contained in a single file for easy modification
- Template prompts are defined in the `loadPromptTemplate()` function

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For issues, questions, or feature requests, please open an issue on the repository.

---

**Note**: This is a client-side application. All data is stored locally in your browser. Make sure to export your data regularly as a backup, especially before clearing browser data or switching browsers.

