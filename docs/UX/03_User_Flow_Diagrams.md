# User Flow Diagrams

## Overview

This document provides visual user flow diagrams using Mermaid syntax for key user interactions in Prompt Vault. These flows map the paths users take to accomplish their goals within the application.

---

## Flow 1: Creating a New Prompt

### Description
Complete flow for creating a new prompt, including optional template selection and form validation.

```mermaid
flowchart TD
    Start([User lands on home page]) --> ViewPrompts[View existing prompts]
    ViewPrompts --> ClickNew[Click '+ New Prompt' button]
    ClickNew --> ModalOpen[Create Prompt Modal Opens]
    ModalOpen --> SelectTemplate{Select Template?}
    SelectTemplate -->|Yes| TemplateSelected[Template Content Loaded]
    SelectTemplate -->|No| FillForm[Fill Form Manually]
    TemplateSelected --> FillForm
    FillForm --> EnterTitle[Enter Title]
    EnterTitle --> EnterCategory[Enter/Select Category]
    EnterCategory --> EnterTags[Enter Tags]
    EnterTags --> EnterContent[Enter Prompt Content]
    EnterContent --> OptionalFeatures{Add Optional Features?}
    OptionalFeatures -->|Rating| AddRating[Add Star Rating]
    OptionalFeatures -->|Model| SelectModel[Select Model Preference]
    OptionalFeatures -->|Skip| ReviewForm
    AddRating --> ReviewForm[Review Form]
    SelectModel --> ReviewForm
    ReviewForm --> ClickSave{Click Save?}
    ClickSave -->|Yes| ValidateForm{Form Valid?}
    ClickSave -->|Cancel| CloseModal[Close Modal]
    ValidateForm -->|No| ShowError[Show Validation Error]
    ShowError --> FillForm
    ValidateForm -->|Yes| SavePrompt[Save Prompt to Storage]
    SavePrompt --> ShowSuccess[Show Success Message]
    ShowSuccess --> UpdateUI[Update Prompt List]
    UpdateUI --> CloseModal
    CloseModal --> End([Return to Prompt List])
```

### Key Decision Points
- **Template Selection**: User can choose to use a template or start from scratch
- **Optional Features**: Rating and model preference are optional
- **Validation**: Form must be validated before saving
- **Cancel**: User can cancel at any time

### Error States
- Title required validation
- Content required validation
- Invalid category format
- Duplicate prompt detection

---

## Flow 2: Searching and Filtering Prompts

### Description
Flow for finding prompts using search, category filters, and tag filters with real-time results.

```mermaid
flowchart TD
    Start([User wants to find a prompt]) --> SearchMethod{Search Method?}
    SearchMethod -->|Text Search| EnterSearch[Enter Search Query]
    SearchMethod -->|Category Filter| ClickCategory[Click Category in Sidebar]
    SearchMethod -->|Tag Filter| ClickTag[Click Tag in Sidebar]
    SearchMethod -->|Combined| CombinedFilters[Use Multiple Filters]
    
    EnterSearch --> SearchInput[Type in Search Box]
    SearchInput --> RealTimeSearch[Real-time Filter Results]
    RealTimeSearch --> DisplayResults[Display Filtered Prompts]
    
    ClickCategory --> FilterByCategory[Filter by Category]
    FilterByCategory --> DisplayResults
    
    ClickTag --> ToggleTag{Toggle Tag Filter}
    ToggleTag -->|Active| FilterByTag[Add Tag to Active Filters]
    ToggleTag -->|Inactive| RemoveTagFilter[Remove Tag from Filters]
    FilterByTag --> DisplayResults
    RemoveTagFilter --> DisplayResults
    
    CombinedFilters --> ApplyFilters[Apply All Active Filters]
    ApplyFilters --> DisplayResults
    
    DisplayResults --> ResultsFound{Results Found?}
    ResultsFound -->|Yes| ShowPrompts[Show Matching Prompts]
    ResultsFound -->|No| ShowEmpty[Show 'No Results' Message]
    
    ShowPrompts --> UserAction{User Action?}
    UserAction -->|View Prompt| ViewPrompt[Open Prompt Details]
    UserAction -->|Clear Filters| ClearFilters[Reset All Filters]
    UserAction -->|New Search| EnterSearch
    UserAction -->|Refine Search| RefineSearch[Add More Filters]
    
    RefineSearch --> CombinedFilters
    ClearFilters --> ShowAll[Show All Prompts]
    ShowAll --> End([Return to Full List])
    ViewPrompt --> End
    ShowEmpty --> End
```

### Key Features
- **Real-time Search**: Results update as user types
- **Multiple Filter Types**: Search, category, and tags work together
- **Combined Filters**: AND logic for multiple filters
- **Clear Filters**: Easy reset to show all prompts

### Filter Logic
- **Search**: Searches across title, content, tags, and category
- **Category**: Single selection (mutually exclusive)
- **Tags**: Multiple selection (OR logic - shows prompts with ANY selected tag)
- **Combined**: All active filters work together (AND logic)

---

## Flow 3: Editing an Existing Prompt

### Description
Complete flow for viewing, editing, duplicating, and deleting prompts.

```mermaid
flowchart TD
    Start([User viewing prompt list]) --> SelectPrompt[Click on Prompt Card]
    SelectPrompt --> ViewDetails[Prompt Details View Opens]
    ViewDetails --> ViewContent[View Prompt Content]
    ViewContent --> UserAction{User Action?}
    UserAction -->|Edit| ClickEdit[Click 'Edit' Button]
    UserAction -->|Duplicate| ClickDuplicate[Click 'Duplicate' Button]
    UserAction -->|Delete| ClickDelete[Click 'Delete' Button]
    UserAction -->|Mark Used| MarkUsed[Mark as Used]
    UserAction -->|Close| CloseView[Close Details View]
    
    ClickEdit --> EditModal[Edit Modal Opens]
    EditModal --> LoadData[Load Current Prompt Data]
    LoadData --> ModifyFields[Modify Title/Category/Tags/Content]
    ModifyFields --> SaveChanges{Save Changes?}
    SaveChanges -->|Yes| ValidateEdit{Validation Pass?}
    SaveChanges -->|Cancel| DiscardChanges[Discard Changes]
    ValidateEdit -->|No| ShowError[Show Validation Error]
    ShowError --> ModifyFields
    ValidateEdit -->|Yes| UpdatePrompt[Update Prompt in Storage]
    UpdatePrompt --> ShowSuccess[Show Success Message]
    ShowSuccess --> RefreshList[Refresh Prompt List]
    RefreshList --> CloseModal[Close Modal]
    CloseModal --> End([Return to Updated View])
    
    ClickDuplicate --> DuplicateModal[Create Modal with Copied Data]
    DuplicateModal --> ModifyDuplicated[Modify if Needed]
    ModifyDuplicated --> SaveDuplicate[Save as New Prompt]
    SaveDuplicate --> ShowSuccess2[Show Success Message]
    ShowSuccess2 --> RefreshList
    
    ClickDelete --> ConfirmDelete{Confirm Deletion?}
    ConfirmDelete -->|Yes| DeletePrompt[Delete from Storage]
    ConfirmDelete -->|No| CancelDelete[Cancel]
    DeletePrompt --> ShowDeleted[Show Deletion Message]
    ShowDeleted --> RefreshList
    CancelDelete --> ViewDetails
    
    MarkUsed --> UpdateUsage[Update Last Used Timestamp]
    UpdateUsage --> RefreshList
    
    DiscardChanges --> CloseModal
    CloseModal --> End
    CloseView --> End
```

### Key Actions
- **Edit**: Modify existing prompt
- **Duplicate**: Create copy for modification
- **Delete**: Remove prompt (with confirmation)
- **Mark Used**: Track usage timestamp
- **Close**: Return to list view

### Safety Features
- Confirmation dialog for delete
- Validation before save
- Option to discard changes

---

## Flow 4: Import/Export Workflow

### Description
Complete flow for backing up and restoring prompt data through import/export functionality.

```mermaid
flowchart TD
    Start([User wants to backup/restore]) --> Action{Action Type?}
    Action -->|Export| ClickExport[Click 'Export' Button]
    Action -->|Import| ClickImport[Click 'Import' Button]
    
    ClickExport --> PrepareData[Prepare All Prompt Data]
    PrepareData --> GenerateJSON[Generate JSON File]
    GenerateJSON --> AddMetadata[Add Export Metadata]
    AddMetadata --> DownloadFile[Trigger Download]
    DownloadFile --> ShowSuccess[Show 'Export Successful' Message]
    ShowSuccess --> End([Export Complete])
    
    ClickImport --> OpenFileDialog[Open File Selection Dialog]
    OpenFileDialog --> SelectFile{File Selected?}
    SelectFile -->|No| CancelImport[Cancel Import]
    SelectFile -->|Yes| ReadFile[Read JSON File]
    ReadFile --> ValidateJSON{Valid JSON?}
    ValidateJSON -->|No| ShowError[Show 'Invalid File' Error]
    ValidateJSON -->|Yes| ParseData[Parse Prompt Data]
    ParseData --> ValidateStructure{Valid Structure?}
    ValidateStructure -->|No| ShowError
    ValidateStructure -->|Yes| MergeStrategy{Merge Strategy?}
    MergeStrategy -->|New IDs| AssignNewIDs[Assign New IDs to Prompts]
    MergeStrategy -->|Merge| MergeData[Merge with Existing Data]
    AssignNewIDs --> MergeData
    MergeData --> ValidateData{Data Valid?}
    ValidateData -->|No| ShowError
    ValidateData -->|Yes| SaveImported[Save Imported Data]
    SaveImported --> ShowSuccess2[Show 'Import Successful' Message]
    ShowSuccess2 --> RefreshUI[Refresh UI with New Data]
    RefreshUI --> ShowCount[Show Import Count]
    ShowCount --> End
    
    ShowError --> End
    CancelImport --> End
```

### Export Features
- Includes all prompts and categories
- Adds export timestamp
- Generates downloadable JSON file
- Shows success confirmation

### Import Features
- Validates JSON structure
- Assigns new IDs to prevent conflicts
- Merges with existing data
- Shows import count
- Error handling for invalid files

---

## Flow 5: Template Selection and Usage

### Description
Flow for browsing and using prompt templates from the template library.

```mermaid
flowchart TD
    Start([User clicks '+ New Prompt']) --> ModalOpen[Create Modal Opens]
    ModalOpen --> TemplateSection[Template Dropdown Visible]
    TemplateSection --> BrowseTemplates{Browse Templates?}
    BrowseTemplates -->|Select Template| ChooseTemplate[Select from Dropdown]
    BrowseTemplates -->|Skip| ManualEntry[Manual Entry]
    
    ChooseTemplate --> TemplateSelected[Template Selected]
    TemplateSelected --> LoadTemplate[Load Template Content]
    LoadTemplate --> PopulateForm[Populate Form Fields]
    PopulateForm --> PrefillContent[Title, Category, Tags, Content Pre-filled]
    PrefillContent --> UserReview{Review Template?}
    UserReview -->|Edit| ModifyTemplate[Modify Template Content]
    UserReview -->|Use As-Is| KeepTemplate[Keep Template Content]
    ModifyTemplate --> CustomizePrompt[Customize Prompt]
    KeepTemplate --> CustomizePrompt
    CustomizePrompt --> SavePrompt[Save Prompt]
    SavePrompt --> End([Prompt Saved])
    
    ManualEntry --> FillForm[Fill Form Manually]
    FillForm --> SavePrompt
```

### Template Categories
- **CRISPE Framework**: Professional templates
- **ELAVIS Framework**: Content creation templates
- **SPARC Framework**: Documentation templates

### Template Features
- Pre-fills form fields
- User can modify before saving
- Clear template names and descriptions
- Organized by framework type

---

## Flow 6: Category Management

### Description
Flow for creating, organizing, and deleting categories.

```mermaid
flowchart TD
    Start([User wants to manage categories]) --> CategoryAction{Category Action?}
    CategoryAction -->|Create| ClickAdd[Click '+ Add' next to Categories]
    CategoryAction -->|Filter| ClickCategory[Click Category in List]
    CategoryAction -->|Delete| HoverCategory[Hover over Category]
    
    ClickAdd --> CategoryModal[Category Creation Modal Opens]
    CategoryModal --> EnterCategory[Enter Category Name]
    EnterCategory --> ValidateCategory{Valid Name?}
    ValidateCategory -->|No| ShowError[Show Validation Error]
    ShowError --> EnterCategory
    ValidateCategory -->|Yes| CheckDuplicate{Category Exists?}
    CheckDuplicate -->|Yes| ShowDuplicateError[Show Duplicate Error]
    ShowDuplicateError --> EnterCategory
    CheckDuplicate -->|No| CreateCategory[Create New Category]
    CreateCategory --> SaveCategory[Save to Storage]
    SaveCategory --> UpdateSidebar[Update Category List]
    UpdateSidebar --> CloseModal[Close Modal]
    CloseModal --> End([Category Created])
    
    ClickCategory --> FilterByCategory[Filter Prompts by Category]
    FilterByCategory --> DisplayFiltered[Display Filtered Prompts]
    DisplayFiltered --> End
    
    HoverCategory --> ShowDelete[Delete Button Appears]
    ShowDelete --> ClickDelete[Click Delete Button]
    ClickDelete --> ConfirmDelete{Confirm Deletion?}
    ConfirmDelete -->|No| CancelDelete[Cancel]
    CancelDelete --> End
    ConfirmDelete -->|Yes| CheckUsage{Prompts in Category?}
    CheckUsage -->|Yes| ShowWarning[Show Warning: Prompts will be uncategorized]
    CheckUsage -->|No| DeleteCategory[Delete Category]
    ShowWarning --> UserChoice{User Choice?}
    UserChoice -->|Proceed| DeleteCategory
    UserChoice -->|Cancel| CancelDelete
    DeleteCategory --> UpdateStorage[Update Storage]
    UpdateStorage --> UpdateSidebar
    UpdateSidebar --> End
```

### Category Features
- Create new categories on-the-fly
- Filter prompts by category
- Delete categories (with warning if prompts exist)
- Categories persist across sessions

---

## Flow 7: Tag Management and Filtering

### Description
Flow for adding tags to prompts and filtering by tags.

```mermaid
flowchart TD
    Start([User wants to manage tags]) --> TagAction{Tag Action?}
    TagAction -->|Add Tags| EditPrompt[Edit/Create Prompt]
    TagAction -->|Filter Tags| ClickTag[Click Tag in Sidebar]
    
    EditPrompt --> EnterTags[Enter Tags in Tags Field]
    EnterTags --> TagInput[Type Comma-Separated Tags]
    TagInput --> ValidateTags{Valid Format?}
    ValidateTags -->|No| ShowError[Show Format Error]
    ShowError --> TagInput
    ValidateTags -->|Yes| ParseTags[Parse Tags]
    ParseTags --> SaveTags[Save Tags to Prompt]
    SaveTags --> UpdateTagList[Update Tag List in Sidebar]
    UpdateTagList --> End([Tags Added])
    
    ClickTag --> ToggleTag{Toggle Tag Filter}
    ToggleTag -->|Not Active| ActivateTag[Activate Tag Filter]
    ToggleTag -->|Active| DeactivateTag[Deactivate Tag Filter]
    ActivateTag --> AddToFilters[Add Tag to Active Filters]
    DeactivateTag --> RemoveFromFilters[Remove Tag from Filters]
    AddToFilters --> FilterPrompts[Filter Prompts]
    RemoveFromFilters --> FilterPrompts
    FilterPrompts --> DisplayResults[Display Filtered Results]
    DisplayResults --> MultipleTags{Multiple Tags Active?}
    MultipleTags -->|Yes| ORLogic[Apply OR Logic: Show prompts with ANY tag]
    MultipleTags -->|No| SingleTag[Show prompts with selected tag]
    ORLogic --> End
    SingleTag --> End
```

### Tag Features
- Comma-separated tag input
- Auto-complete from existing tags
- Multiple tags per prompt
- OR logic for multiple tag filters
- Visual indication of active tag filters

---

## Flow 8: Dark Mode Toggle

### Description
Simple flow for toggling between light and dark themes.

```mermaid
flowchart TD
    Start([User wants to change theme]) --> ClickToggle[Click Dark Mode Toggle]
    ClickToggle --> CheckCurrent{Current Mode?}
    CheckCurrent -->|Light| SwitchDark[Switch to Dark Mode]
    CheckCurrent -->|Dark| SwitchLight[Switch to Light Mode]
    SwitchDark --> UpdateTheme[Update Theme Classes]
    SwitchLight --> UpdateTheme
    UpdateTheme --> UpdateHighlight[Update Syntax Highlight Theme]
    UpdateHighlight --> SavePreference[Save Preference to localStorage]
    SavePreference --> ApplyTheme[Apply Theme to UI]
    ApplyTheme --> SmoothTransition[Smooth Color Transition]
    SmoothTransition --> End([Theme Changed])
```

### Dark Mode Features
- Persistent preference (saved to localStorage)
- Smooth transitions
- Syntax highlighting theme updates
- Immediate visual feedback

---

## Flow 9: Error Handling and Recovery

### Description
Flow for handling errors and providing recovery paths.

```mermaid
flowchart TD
    Start([Error Occurs]) --> ErrorType{Error Type?}
    ErrorType -->|Validation| ShowValidationError[Show Validation Error]
    ErrorType -->|Storage| StorageError[Storage Error]
    ErrorType -->|Import| ImportError[Import Error]
    ErrorType -->|Network| NetworkError[Network Error - if applicable]
    
    ShowValidationError --> HighlightField[Highlight Invalid Field]
    HighlightField --> ShowMessage[Show Error Message]
    ShowMessage --> UserFix[User Fixes Issue]
    UserFix --> RetryAction[Retry Action]
    RetryAction --> End([Error Resolved])
    
    StorageError --> CheckStorage{Storage Available?}
    CheckStorage -->|No| ShowStorageError[Show Storage Error Message]
    CheckStorage -->|Yes| ShowGeneralError[Show General Error]
    ShowStorageError --> SuggestExport[Suggest Export Backup]
    SuggestExport --> End
    ShowGeneralError --> RetryAction
    
    ImportError --> ValidateFile{File Valid?}
    ValidateFile -->|No| ShowInvalidFile[Show Invalid File Error]
    ValidateFile -->|Yes| ShowParseError[Show Parse Error]
    ShowInvalidFile --> SuggestFormat[Suggest Correct Format]
    SuggestFormat --> End
    ShowParseError --> SuggestFix[Suggest Fix]
    SuggestFix --> End
```

### Error Types
- **Validation Errors**: Form field validation
- **Storage Errors**: localStorage issues
- **Import Errors**: Invalid JSON or file format
- **General Errors**: Unexpected errors

### Recovery Paths
- Clear error messages
- Actionable suggestions
- Retry mechanisms
- Backup recommendations

---

## Flow Summary Table

| Flow | Primary User Goal | Key Decision Points | Error States |
|------|------------------|---------------------|--------------|
| Create Prompt | Add new prompt | Template selection, validation | Required fields, duplicates |
| Search/Filter | Find prompts | Filter type, combination | No results |
| Edit Prompt | Modify existing | Save vs cancel, delete confirm | Validation errors |
| Import/Export | Backup/restore | File selection, merge strategy | Invalid file format |
| Template Usage | Use template | Template selection, modification | Template not found |
| Category Management | Organize prompts | Create, filter, delete | Duplicate, in-use |
| Tag Management | Add filters | Tag input, filter toggle | Invalid format |
| Dark Mode | Change theme | Light/dark toggle | None |
| Error Handling | Recover from errors | Error type, recovery path | Multiple error types |

---

## Next Steps

- Validate flows with user testing
- Identify edge cases and exceptions
- Create detailed error state flows
- Design recovery paths for each error
- Document keyboard shortcuts and accessibility flows

---

**Document Version**: 2.0  
**Last Updated**: 2024  
**Status**: Updated based on current implementation

