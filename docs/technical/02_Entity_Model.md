# Entity Model

## Overview

Prompt Vault uses a simple, client-side data model with entities stored in browser LocalStorage. The application follows a document-based storage pattern where all prompts are stored as JSON objects in a single array.

## Core Entities

### 1. Prompt Entity

The primary entity representing a saved prompt with all its metadata and content.

#### Entity Definition

**Entity Name**: `Prompt`

**Primary Key**: `id` (String, unique identifier)

**Attributes**:

| Attribute | Type | Constraints | Description |
|-----------|------|-------------|-------------|
| `id` | String | Required, Unique | Unique identifier (timestamp-based) |
| `title` | String | Required, Max 200 chars | Human-readable prompt title |
| `content` | String | Required | Full prompt content/text |
| `category` | String | Optional | Framework category (e.g., "CRISPE", "ELAVIS") |
| `tags` | Array<String> | Optional | Array of tag strings |
| `createdAt` | String (ISO 8601) | Required | Creation timestamp |
| `modifiedAt` | String (ISO 8601) | Required | Last modification timestamp |
| `lastUsedAt` | String (ISO 8601) | Optional | Last usage timestamp (null if never used) |
| `rating` | Number | Optional | Rating value (typically 1-5) |
| `model` | String | Optional | LLM model name used |
| `response` | String | Optional | LLM response content |
| `comments` | String | Optional | User comments/notes |
| `metadata` | Object | Optional | Nested metadata object |

#### Metadata Object Structure

The `metadata` attribute contains nested information about prompt usage and performance:

| Attribute | Type | Constraints | Description |
|-----------|------|-------------|-------------|
| `inputTokens` | Number | Optional | Input token count |
| `outputTokens` | Number | Optional | Output token count |
| `totalTokens` | Number | Optional | Total token count |
| `cost` | Number | Optional | Cost in currency units |
| `responseTime` | Number | Optional | Response time in milliseconds |
| `testedAt` | String (ISO 8601) | Optional | Testing timestamp |

#### Example Prompt Entity

```json
{
  "id": "1704067200000",
  "title": "Professional Git Commit Message Generator (CRISPE)",
  "content": "**CRISPE Framework Prompt**\n\n**Context**: ...",
  "category": "CRISPE",
  "tags": ["git", "commit", "best-practices"],
  "createdAt": "2024-01-01T00:00:00.000Z",
  "modifiedAt": "2024-01-15T10:30:00.000Z",
  "lastUsedAt": "2024-01-20T14:20:00.000Z",
  "rating": 5,
  "model": "gpt-4",
  "response": "",
  "comments": "Works great for conventional commits",
  "metadata": {
    "inputTokens": 150,
    "outputTokens": 200,
    "totalTokens": 350,
    "cost": 0.02,
    "responseTime": 1200,
    "testedAt": "2024-01-20T14:20:00.000Z"
  }
}
```

### 2. Framework Entity

Represents a prompt framework category available in the system.

#### Entity Definition

**Entity Name**: `Framework`

**Primary Key**: `name` (String, unique identifier)

**Attributes**:

| Attribute | Type | Constraints | Description |
|-----------|------|-------------|-------------|
| `name` | String | Required, Unique | Framework name (e.g., "CRISPE") |
| `description` | String | Required | Human-readable description |

#### Available Frameworks

The application includes 24 predefined frameworks:

1. **CRISPE** - Multi-step technical tasks, code generation, architectural decisions
2. **ELAVIS** - Blog posts, emails, social media, marketing copy
3. **SPARC** - Technical documentation, user guides, API docs, project proposals
4. **RISEN** - Data analysis, structured problem-solving, analytical tasks
5. **PGTC** - Quick content creation, copywriting, simple structured outputs
6. **RTF** - Data conversion, formatting tasks, quick transformations
7. **RACE** - Emails, summaries, reports, daily communication tasks
8. **TAG** - Process documentation, workflow definition, task breakdown
9. **STAR** - Interview responses, case studies, problem-solving narratives
10. **CLEAR** - Clear communication, adaptable prompts, iterative refinement
11. **SMART** - Goal setting, project planning, measurable objectives
12. **RIDE** - Medical education, tutoring, educational scenarios with examples
13. **PROMPT** - Complex projects, thorough planning, comprehensive prompts
14. **TAP** - Tutorials, educational content, instructional materials
15. **CARE** - Format-specific outputs, JSON/XML generation, structured data
16. **COSTAR** - Marketing copy, brand-aligned content, audience-specific writing
17. **Chain-of-Thought** - Complex problem-solving, step-by-step analysis, logical reasoning tasks
18. **5C Framework** - Iterative prompt improvement, refining outputs, continuous optimization
19. **Tree-of-Thought** - Complex reasoning, multi-branch problem solving, decision trees
20. **Zero-Shot/Few-Shot** - Format learning, pattern recognition, example-based training
21. **AI-Aided Clinical Reasoning** - Medical training, clinical scenarios, educational simulations
22. **GOLD** - Optimized Language for Decision - Decision-making, structured analysis, logical reasoning
23. **PEACE** - Self-reflection, decision analysis, learning journals
24. **Reflective Writing** - Learning journals, reflection, personal growth
25. **TACT** - Task organization, calendar planning, productivity, todo management

### 3. Template Entity

Represents a pre-built prompt template that users can select when creating new prompts.

#### Entity Definition

**Entity Name**: `Template`

**Primary Key**: `id` (String, unique identifier)

**Attributes**:

| Attribute | Type | Constraints | Description |
|-----------|------|-------------|-------------|
| `id` | String | Required, Unique | Template identifier |
| `title` | String | Required | Template title |
| `category` | String | Required | Framework category |
| `tags` | Array<String> | Optional | Default tags |
| `content` | String | Required | Template prompt content |

#### Available Templates

The application includes 47 pre-built templates covering multiple frameworks:

**CRISPE Framework Templates (12 templates)**:
- Professional Git Commit Message Generator
- Senior Programmer Assistant
- Scrum Master - Sprint Planning Assistant
- Software Architect Advisor
- Code Review Assistant
- Technical Documentation Architect
- UX Designer & User Experience Architect
- Individual Contributor Assistant
- Engineering Manager Assistant
- Spring Boot MapStruct Mapper Example
- Spring Boot WebClient Example
- Professional Unit Test with Mockito & JUnit 5

**Elavis Framework Templates (7 templates)**:
- Content Generator
- Professional Email Writer
- Blog Post Generator
- Technical Writer
- Social Media Content Writer
- Individual Contributor Communication
- Manager Communication

**SPARC Framework Templates (7 templates)**:
- Technical Documentation
- Code Explanation & Documentation
- Project Proposal Writer
- User Guide Writer
- Meeting Summary Writer
- Individual Contributor Documentation
- Manager Documentation

**Additional Framework Templates (21 templates)**:
- Data Analysis Assistant (RISEN)
- Quick Content Creator (PGTC)
- Data Format Converter (RTF)
- Email & Summary Writer (RACE)
- Process Documentation Writer (TAG)
- Interview & Case Study Writer (STAR)
- Clear Communication Prompter (CLEAR)
- Goal Setting Assistant (SMART)
- Medical Education Tutor (RIDE)
- Comprehensive Project Planner (PROMPT)
- Tutorial Creator (TAP)
- Structured Data Generator (CARE)
- Marketing Copy Writer (COSTAR)
- Chain-of-Thought Problem Solver
- Prompt Refinement Assistant (5C Framework)
- Tree-of-Thought Problem Solver
- Format Learning Assistant (Zero-Shot/Few-Shot)
- Clinical Reasoning Assistant
- Decision Maker (GOLD Framework)
- Self-Reflection Guide (PEACE)
- Reflective Writing Assistant
- Task & Calendar Organizer (TACT Framework)

### 4. Application State Entity

Represents the runtime application state managed by Alpine.js.

#### Entity Definition

**Entity Name**: `AppState`

**Not Persisted** (runtime only)

**Attributes**:

| Attribute | Type | Description |
|-----------|------|-------------|
| `darkMode` | Boolean | Dark mode toggle state |
| `prompts` | Array<Prompt> | All prompts in memory |
| `filteredPrompts` | Array<Prompt> | Filtered prompts for display |
| `categories` | Array<String> | Extracted categories |
| `allTags` | Array<String> | Extracted tags |
| `selectedCategory` | String\|null | Currently selected category filter |
| `selectedTags` | Array<String> | Currently selected tag filters |
| `searchQuery` | String | Current search query |
| `showCreateModal` | Boolean | Create modal visibility |
| `showEditModal` | Boolean | Edit modal visibility |
| `showViewModal` | Boolean | View modal visibility |
| `showImportModal` | Boolean | Import modal visibility |
| `sidebarOpen` | Boolean | Mobile sidebar state |
| `currentPrompt` | Prompt\|null | Current prompt being edited/viewed |
| `syntaxHighlighting` | Boolean | Syntax highlighting toggle |

## Relationships

### Entity Relationships

1. **Prompt → Framework (Many-to-One)**
   - A prompt belongs to one framework category (optional)
   - A framework can have many prompts

2. **Prompt → Tags (Many-to-Many)**
   - A prompt can have multiple tags
   - A tag can be associated with multiple prompts

3. **Template → Framework (Many-to-One)**
   - A template belongs to one framework category
   - A framework can have multiple templates

## Data Validation Rules

### Prompt Validation

1. **Title Validation**:
   - Required field
   - Must not be empty or whitespace-only
   - Maximum length: 200 characters

2. **Content Validation**:
   - Required field
   - Must not be empty or whitespace-only
   - No maximum length enforced (browser-dependent)

3. **Category Validation**:
   - Optional field
   - Should match one of the predefined frameworks
   - Can be empty string

4. **Tags Validation**:
   - Optional field
   - Parsed from comma-separated string
   - Empty tags filtered out
   - No duplicates enforced

5. **Date Validation**:
   - All dates stored as ISO 8601 strings
   - `createdAt` and `modifiedAt` are required
   - `lastUsedAt` can be null

## Data Constraints

### Storage Constraints

- **LocalStorage Key**: `prompts` (stores JSON array)
- **Categories Key**: `categories` (stores JSON array, deprecated)
- **Dark Mode Key**: `darkMode` (stores boolean string)

### Size Constraints

- Maximum title length: 200 characters
- No explicit content length limit (browser LocalStorage limit applies)
- Typical LocalStorage capacity: 5-10MB per origin

### Uniqueness Constraints

- Prompt `id` must be unique within the prompts array
- Framework `name` must be unique within frameworks array
- Template `id` must be unique within templates object

## Data Integrity

### Automatic Field Management

1. **ID Generation**:
   - Generated using `Date.now().toString()` for new prompts
   - Ensures uniqueness based on timestamp

2. **Timestamp Management**:
   - `createdAt`: Set on creation, never modified
   - `modifiedAt`: Updated on every save/edit
   - `lastUsedAt`: Updated when "Mark as Used" is clicked

3. **Tag Normalization**:
   - Tags parsed from comma-separated string
   - Trimmed of whitespace
   - Empty tags filtered out
   - Case-sensitive (no normalization)

### Data Persistence

- All prompts stored in browser LocalStorage
- Data persists across browser sessions
- Export/Import provides backup and migration capability
- No server-side persistence

