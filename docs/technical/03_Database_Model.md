# Database Model

## Overview

Prompt Vault uses browser LocalStorage as its data persistence layer. While not a traditional database, LocalStorage provides a key-value storage mechanism that persists data across browser sessions. This document describes the storage schema and data organization.

## Storage Mechanism

### Browser LocalStorage API

The application uses the Web Storage API's `localStorage` interface, which provides:
- Persistent storage (survives browser restarts)
- Domain-scoped storage (data isolated per origin)
- Synchronous API (blocking operations)
- String-based key-value pairs
- ~5-10MB storage limit per origin

## Storage Schema

### Primary Storage Keys

#### 1. `prompts` (Primary Data Store)

**Type**: JSON String (Array)

**Purpose**: Stores all prompt entities as a JSON array

**Schema**:
```json
[
  {
    "id": "string",
    "title": "string",
    "content": "string",
    "category": "string | null",
    "tags": ["string"],
    "createdAt": "ISO8601 string",
    "modifiedAt": "ISO8601 string",
    "lastUsedAt": "ISO8601 string | null",
    "rating": "number | null",
    "model": "string | null",
    "response": "string | null",
    "comments": "string | null",
    "metadata": {
      "inputTokens": "number | null",
      "outputTokens": "number | null",
      "totalTokens": "number | null",
      "cost": "number | null",
      "responseTime": "number | null",
      "testedAt": "ISO8601 string | null"
    }
  }
]
```

**Indexes**: No explicit indexes (array-based search)

**Operations**:
- **Read**: `JSON.parse(localStorage.getItem('prompts'))`
- **Write**: `localStorage.setItem('prompts', JSON.stringify(prompts))`
- **Delete**: `localStorage.removeItem('prompts')`

#### 2. `darkMode` (User Preference)

**Type**: String (`"true"` or `"false"`)

**Purpose**: Stores user's dark mode preference

**Schema**: Boolean value stored as string

**Default**: `"false"` (light mode)

**Operations**:
- **Read**: `localStorage.getItem('darkMode') === 'true'`
- **Write**: `localStorage.setItem('darkMode', 'true' | 'false')`

#### 3. `categories` (Deprecated)

**Type**: JSON String (Array)

**Purpose**: Previously stored categories separately (now extracted from prompts)

**Status**: Legacy key, no longer actively used

**Schema**: `["string"]` (array of category names)

## Table Structure (Conceptual)

While LocalStorage doesn't use tables, the data can be conceptualized as a single table:

### `prompts` Table

| Column | Data Type | Constraints | Default | Description |
|--------|-----------|-------------|---------|-------------|
| `id` | VARCHAR(20) | PRIMARY KEY, NOT NULL, UNIQUE | Generated | Unique identifier |
| `title` | VARCHAR(200) | NOT NULL | '' | Prompt title |
| `content` | TEXT | NOT NULL | '' | Prompt content |
| `category` | VARCHAR(50) | NULL | NULL | Framework category |
| `tags` | JSON | NULL | [] | Array of tags |
| `createdAt` | TIMESTAMP | NOT NULL | Current | Creation timestamp |
| `modifiedAt` | TIMESTAMP | NOT NULL | Current | Modification timestamp |
| `lastUsedAt` | TIMESTAMP | NULL | NULL | Last usage timestamp |
| `rating` | DECIMAL(1,0) | NULL | NULL | Rating (1-5) |
| `model` | VARCHAR(100) | NULL | NULL | LLM model name |
| `response` | TEXT | NULL | NULL | LLM response |
| `comments` | TEXT | NULL | NULL | User comments |
| `metadata` | JSON | NULL | {} | Metadata object |

### `metadata` Nested Object Structure

| Column | Data Type | Constraints | Default | Description |
|--------|-----------|-------------|---------|-------------|
| `inputTokens` | INTEGER | NULL | NULL | Input token count |
| `outputTokens` | INTEGER | NULL | NULL | Output token count |
| `totalTokens` | INTEGER | NULL | NULL | Total token count |
| `cost` | DECIMAL(10,4) | NULL | NULL | Cost in currency |
| `responseTime` | INTEGER | NULL | NULL | Response time (ms) |
| `testedAt` | TIMESTAMP | NULL | NULL | Testing timestamp |

## Data Types

### String Types

- **id**: Alphanumeric string (timestamp-based)
- **title**: UTF-8 string, max 200 characters
- **content**: UTF-8 string, unlimited length (browser limit)
- **category**: UTF-8 string, max 50 characters
- **tags**: Array of UTF-8 strings
- **model**: UTF-8 string, max 100 characters
- **response**: UTF-8 string, unlimited length
- **comments**: UTF-8 string, unlimited length

### Date/Time Types

All timestamps stored as ISO 8601 strings:
- Format: `YYYY-MM-DDTHH:mm:ss.sssZ`
- Example: `2024-01-15T10:30:45.123Z`
- Timezone: UTC (Z suffix)

### Numeric Types

- **rating**: Integer (typically 1-5)
- **inputTokens**: Integer (positive)
- **outputTokens**: Integer (positive)
- **totalTokens**: Integer (positive)
- **cost**: Decimal number (positive)
- **responseTime**: Integer (milliseconds, positive)

### JSON Types

- **tags**: Array of strings
- **metadata**: Object with nested properties

## Constraints

### Primary Key Constraints

- **prompts.id**: Must be unique across all prompts
- Generated using `Date.now().toString()` (timestamp-based)

### Foreign Key Constraints

- **prompts.category**: Should reference valid framework name
- No enforced referential integrity (framework list is hardcoded)

### Check Constraints

- **title**: Cannot be empty or whitespace-only, max 200 chars
- **content**: Cannot be empty or whitespace-only
- **createdAt**: Must be valid ISO 8601 timestamp
- **modifiedAt**: Must be valid ISO 8601 timestamp, >= createdAt
- **tags**: Array must contain valid strings (no empty strings)

### Null Constraints

- **NOT NULL**: `id`, `title`, `content`, `createdAt`, `modifiedAt`
- **NULL ALLOWED**: `category`, `tags`, `lastUsedAt`, `rating`, `model`, `response`, `comments`, `metadata`, all metadata fields

## Indexes (Conceptual)

Since LocalStorage doesn't support indexes, the application implements in-memory indexing:

### Implicit Indexes

1. **Primary Index**: Array index (by `id`)
   - Used for: Finding prompts by ID
   - Implementation: `prompts.findIndex(p => p.id === id)`

2. **Category Index**: Extracted categories array
   - Used for: Filtering by category
   - Implementation: `prompts.filter(p => p.category === category)`

3. **Tag Index**: Extracted tags array
   - Used for: Filtering by tags
   - Implementation: `prompts.filter(p => p.tags.includes(tag))`

4. **Full-Text Index**: In-memory search
   - Used for: Search functionality
   - Implementation: String matching across title, content, category, tags

## Data Validation

### Storage-Level Validation

1. **JSON Validation**:
   - Data must be valid JSON
   - Array must contain objects
   - Objects must have required fields

2. **Type Validation**:
   - IDs must be strings
   - Dates must be valid ISO 8601 strings
   - Tags must be arrays of strings

3. **Business Logic Validation**:
   - Title required, max 200 chars
   - Content required, non-empty
   - Dates must be valid timestamps

### Error Handling

1. **Parse Errors**: Corrupted JSON → Initialize with empty array
2. **Type Errors**: Invalid data types → Skip invalid entries
3. **Storage Errors**: Quota exceeded → Alert user, prevent save

## Storage Operations

### Read Operations

```javascript
// Read all prompts
function loadPrompts() {
    const saved = localStorage.getItem('prompts');
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (error) {
            console.error('Failed to parse prompts:', error);
            return [];
        }
    }
    return [];
}
```

### Write Operations

```javascript
// Save all prompts
function savePrompts(prompts) {
    try {
        localStorage.setItem('prompts', JSON.stringify(prompts));
    } catch (error) {
        if (error.name === 'QuotaExceededError') {
            alert('Storage quota exceeded. Please delete some prompts.');
        } else {
            console.error('Failed to save prompts:', error);
        }
        throw error;
    }
}
```

### Delete Operations

```javascript
// Delete all prompts
function clearPrompts() {
    localStorage.removeItem('prompts');
}

// Delete single prompt
function deletePrompt(id) {
    const prompts = loadPrompts();
    const filtered = prompts.filter(p => p.id !== id);
    savePrompts(filtered);
}
```

## Data Migration

### Version Management

No explicit versioning system currently implemented. Future migrations may require:

1. **Version Field**: Add `schemaVersion` to stored data
2. **Migration Scripts**: Transform data between versions
3. **Backward Compatibility**: Handle old data formats

### Import/Export Schema

Export format matches storage schema:

```json
{
  "version": "1.0",
  "exportedAt": "ISO8601 timestamp",
  "prompts": [
    // Array of prompt objects
  ]
}
```

## Storage Limitations

### Capacity Limits

- **Typical Limit**: 5-10MB per origin
- **Browser Variations**:
  - Chrome: ~10MB
  - Firefox: ~10MB
  - Safari: ~5MB
  - Edge: ~10MB

### Performance Considerations

- **Synchronous API**: Blocks main thread during writes
- **Large Data Sets**: Performance degrades with > 1000 prompts
- **JSON Parsing**: Entire array parsed on every load

### Best Practices

1. **Regular Exports**: Backup data regularly via export
2. **Data Cleanup**: Remove unused prompts periodically
3. **Size Monitoring**: Track storage usage
4. **Error Handling**: Handle quota exceeded gracefully

## Backup and Recovery

### Export Mechanism

- All prompts exported as JSON
- Includes metadata and timestamps
- Portable across browsers/devices

### Import Mechanism

- Validates JSON structure
- Merges with existing prompts
- Handles duplicate IDs (creates new IDs)

### Recovery Strategies

1. **Browser Data Loss**: Restore from exported JSON
2. **Corrupted Data**: Parse error → Initialize empty, restore from backup
3. **Version Mismatch**: Future migration scripts

## Security Considerations

### Data Privacy

- **Local Storage**: Data stays in browser, not transmitted
- **No Authentication**: Single-user application
- **No Encryption**: Data stored in plain text

### XSS Prevention

- Content displayed using `x-text` (Alpine.js escaping)
- Syntax highlighting uses sanitized HTML
- User input validated before storage

### Access Control

- Browser security model (same-origin policy)
- No cross-origin access
- User has full control over data

