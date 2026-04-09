import { DesignPattern } from '../../types/index.js';
import { DesignCategory } from '../../types/category.js';

/**
 * Form Design Patterns
 * Patterns for collecting user input effectively
 */
export const formPatterns: DesignPattern[] = [
  {
    id: 'pattern-inline-validation',
    name: 'Inline Validation',
    category: DesignCategory.USER_INTERFACE,
    type: 'form',
    platforms: ['web', 'ios', 'android', 'desktop'],
    problem: 'Users make errors when filling out forms and need immediate feedback without waiting until submission.',
    solution:
      'Validate input fields as users type or move to the next field. Show success indicators for valid input and error messages near invalid fields.',
    context:
      'Use for forms where early validation can prevent frustration. Especially valuable for complex validation rules, format requirements, and fields that commonly cause errors.',
    structure: {
      description:
        'Validation logic runs on blur, change, or after a debounce delay. Error messages appear near the field (typically below). Success states may show checkmarks.',
      components: ['Validation logic', 'Error message display', 'Success indicator', 'Visual state changes (border color)', 'Icon indicators'],
      variants: [
        'Validate on blur (most common)',
        'Validate on change (immediate)',
        'Debounced validation (while typing)',
        'Validate on submit (traditional)',
        'Progressive validation (hybrid)',
      ],
    },
    consequences: {
      benefits: [
        'Users fix errors immediately',
        'Reduces form abandonment',
        'Prevents frustrating submit-and-fail cycle',
        'Builds confidence as user progresses',
        'Educates users about requirements',
      ],
      tradeoffs: [
        'Can be annoying if triggered too early',
        'Requires client-side validation logic',
        'Must handle async validation carefully',
        'Need to balance helpfulness with intrusiveness',
      ],
    },
    examples: [
      { description: 'Email field validating format on blur', platform: 'all' },
      { description: 'Password field showing strength as you type', platform: 'web' },
      { description: 'Username checking availability in real-time', platform: 'web' },
    ],
    relatedPatterns: ['pattern-error-message', 'pattern-form-field'],
    antiPatterns: [
      'Validating too early (while still typing)',
      'Showing only success without explaining errors',
      'Clearing valid input on error elsewhere',
    ],
    accessibility: [
      'Associate error messages with fields using aria-describedby',
      'Use aria-invalid="true" on invalid fields',
      'Don\'t rely on color alone for error indication',
      'Announce errors to screen readers',
      'Keep error messages visible (don\'t auto-dismiss)',
    ],
    tags: ['forms', 'validation', 'inline', 'errors', 'feedback', 'input'],
  },
  {
    id: 'pattern-multi-step-form',
    name: 'Multi-Step Form (Wizard)',
    category: DesignCategory.USER_INTERFACE,
    type: 'form',
    platforms: ['web', 'ios', 'android', 'desktop'],
    problem: 'A form has too many fields to show at once, or the process has distinct logical phases that benefit from being separated.',
    solution:
      'Break the form into logical steps shown one at a time. Provide progress indication, navigation between steps, and preserve data as users move.',
    context:
      'Use for long forms (checkout, registration, onboarding), processes with conditional logic, or when context needs to be set before later questions make sense.',
    structure: {
      description:
        'A progress indicator showing steps, content area for current step, and navigation controls (back/next/submit). Data persists as users navigate.',
      components: ['Progress indicator', 'Step content area', 'Back button', 'Next/Continue button', 'Submit button (final step)', 'Step validation'],
      variants: [
        'Linear wizard (strict order)',
        'Non-linear (skip/return to any step)',
        'Accordion style (all visible, one expanded)',
        'Numbered steps',
        'Named steps',
      ],
    },
    consequences: {
      benefits: [
        'Less overwhelming than seeing all fields',
        'Can show relevant fields based on earlier answers',
        'Creates sense of progress',
        'Easier to focus on one section',
        'Can be paused and resumed',
      ],
      tradeoffs: [
        'Users can\'t see full form upfront',
        'May require back-and-forth to review',
        'Must handle step validation carefully',
        'More complex to implement',
        'Can be frustrating if steps are too granular',
      ],
    },
    examples: [
      { description: 'E-commerce checkout: Cart > Shipping > Payment > Review', platform: 'web' },
      { description: 'Account setup: Profile > Preferences > Connect accounts', platform: 'all' },
      { description: 'Survey with sections', platform: 'web' },
    ],
    relatedPatterns: ['pattern-stepper', 'pattern-progress-indicator', 'pattern-form-field'],
    antiPatterns: [
      'Too many steps for simple forms',
      'No way to go back',
      'Losing data when navigating',
      'No progress indication',
    ],
    accessibility: [
      'Announce step changes to screen readers',
      'Back button always accessible',
      'Keyboard navigation between steps',
      'Preserve focus management between steps',
      'Progress indicator accessible',
    ],
    tags: ['forms', 'wizard', 'multi-step', 'checkout', 'onboarding', 'stepper'],
  },
  {
    id: 'pattern-form-field',
    name: 'Form Field',
    category: DesignCategory.USER_INTERFACE,
    type: 'form',
    platforms: ['web', 'ios', 'android', 'desktop'],
    problem: 'Users need to enter various types of data with clear guidance on what\'s expected.',
    solution:
      'Provide labeled input fields with clear visual boundaries, appropriate input types, and supporting elements like help text and error messages.',
    context:
      'The fundamental building block of any form. Every input should have a label, appropriate type, and may include placeholder, help text, and validation feedback.',
    structure: {
      description:
        'A label identifying the field, the input control itself, optional help text, and space for error messages. May include required indicator and character count.',
      components: ['Label', 'Input field', 'Required indicator', 'Help text', 'Error message area', 'Character count (optional)'],
      variants: [
        'Standard text input',
        'Textarea for long text',
        'Select dropdown',
        'Checkbox/Radio groups',
        'Date/Time pickers',
        'File upload',
      ],
    },
    consequences: {
      benefits: [
        'Clear expectations for users',
        'Accessible to screen readers',
        'Supports validation patterns',
        'Consistent across form',
      ],
      tradeoffs: [
        'Labels take vertical space',
        'Need to balance information with simplicity',
      ],
    },
    examples: [
      { description: 'Email input with label, placeholder, and format error', platform: 'all' },
      { description: 'Password field with show/hide toggle', platform: 'all' },
      { description: 'Address fields with autocomplete', platform: 'web' },
    ],
    relatedPatterns: ['pattern-inline-validation', 'pattern-input-masking'],
    antiPatterns: [
      'Placeholder as the only label',
      'Labels far from inputs',
      'Unclear required field indication',
    ],
    accessibility: [
      'Always use <label> associated with input',
      'Use aria-describedby for help text and errors',
      'Indicate required fields in label text',
      'Support autocomplete attributes',
      'Use appropriate input types',
    ],
    tags: ['forms', 'input', 'field', 'label', 'text', 'basic'],
  },
  {
    id: 'pattern-autocomplete',
    name: 'Autocomplete',
    category: DesignCategory.USER_INTERFACE,
    type: 'form',
    platforms: ['web', 'ios', 'android', 'desktop'],
    problem: 'Users need to select from many options or enter known values efficiently without typing everything.',
    solution:
      'Show suggestions as the user types. Suggestions can come from a predefined list, search results, or the user\'s history.',
    context:
      'Use when there are many possible values, for address/location fields, search inputs, or selecting from a database of options. Balance between too few suggestions (unhelpful) and too many (overwhelming).',
    structure: {
      description:
        'An input field that shows a dropdown list of suggestions as the user types. Users can select from suggestions or continue typing.',
      components: ['Text input', 'Suggestion dropdown', 'Loading indicator', 'No results state', 'Highlight matching text', 'Selection mechanism'],
      variants: [
        'Simple autocomplete (static list)',
        'Async autocomplete (search results)',
        'Combobox (select or type)',
        'Multi-select autocomplete',
        'With recent searches',
      ],
    },
    consequences: {
      benefits: [
        'Faster data entry',
        'Reduces typing errors',
        'Helps users discover options',
        'Can validate against known values',
        'Good for long or complex values',
      ],
      tradeoffs: [
        'Requires suggestion data source',
        'Can be slow with network requests',
        'Needs keyboard navigation',
        'Complex accessibility requirements',
      ],
    },
    examples: [
      { description: 'Google search with query suggestions', platform: 'web' },
      { description: 'Address input with location suggestions', platform: 'all' },
      { description: 'Tag input with existing tag suggestions', platform: 'web' },
    ],
    relatedPatterns: ['pattern-search', 'pattern-select'],
    antiPatterns: [
      'Too many suggestions at once',
      'Suggestions that don\'t match input',
      'No keyboard navigation',
      'Slow to respond',
    ],
    accessibility: [
      'Use role="combobox" pattern',
      'aria-autocomplete to indicate behavior',
      'Announce number of suggestions',
      'Arrow keys to navigate suggestions',
      'Enter to select, Escape to close',
    ],
    tags: ['forms', 'autocomplete', 'suggestions', 'typeahead', 'search', 'combobox'],
  },
  {
    id: 'pattern-input-masking',
    name: 'Input Masking',
    category: DesignCategory.USER_INTERFACE,
    type: 'form',
    platforms: ['web', 'ios', 'android', 'desktop'],
    problem: 'Users need to enter data in a specific format (phone numbers, dates, credit cards) but may not know the expected format.',
    solution:
      'Apply an input mask that formats the user\'s input as they type, automatically adding separators, limiting characters, and enforcing patterns.',
    context:
      'Use for fields with known formats: phone numbers, dates, credit card numbers, social security numbers, postal codes. Be flexible—accept various inputs and format them.',
    structure: {
      description:
        'An input field with logic that transforms and constrains input in real-time. May show format hints as placeholder.',
      components: ['Text input', 'Mask logic', 'Format placeholder', 'Visual separators'],
      variants: [
        'Phone number mask: (555) 123-4567',
        'Date mask: MM/DD/YYYY',
        'Credit card: 4111 1111 1111 1111',
        'Time: HH:MM',
        'Currency: $1,234.56',
      ],
    },
    consequences: {
      benefits: [
        'Enforces correct format',
        'Reduces errors',
        'Makes long numbers easier to read',
        'Shows expected format',
        'Improves data consistency',
      ],
      tradeoffs: [
        'Can be confusing if mask fights user',
        'Must handle paste correctly',
        'International formats vary',
        'Cursor position can be tricky',
      ],
    },
    examples: [
      { description: 'Credit card input that adds spaces', platform: 'all' },
      { description: 'Phone number formatting to (XXX) XXX-XXXX', platform: 'all' },
      { description: 'Date picker with masked input', platform: 'web' },
    ],
    relatedPatterns: ['pattern-form-field', 'pattern-inline-validation'],
    antiPatterns: [
      'Rigid masks that reject valid inputs',
      'Masks that don\'t handle paste',
      'Not showing the expected format',
    ],
    accessibility: [
      'Announce format requirements',
      'Don\'t break screen reader announcement',
      'Handle paste from clipboard',
      'Allow keyboard navigation',
      'Provide format hint in label or help text',
    ],
    tags: ['forms', 'input', 'mask', 'format', 'phone', 'date', 'credit-card'],
  },
  {
    id: 'pattern-toggle-switch',
    name: 'Toggle Switch',
    category: DesignCategory.USER_INTERFACE,
    type: 'form',
    platforms: ['web', 'ios', 'android', 'desktop'],
    problem: 'Users need to turn a setting or feature on or off with immediate effect.',
    solution:
      'Provide a switch control that clearly shows on/off state. Toggling should take effect immediately without a separate save action.',
    context:
      'Use for binary settings that apply immediately. Different from checkboxes which typically require form submission. Common for preferences and feature toggles.',
    structure: {
      description:
        'A track with a sliding thumb that moves between on and off positions. Often includes labels or icons showing the current state.',
      components: ['Track', 'Thumb', 'On/Off indicators', 'Label'],
      variants: [
        'Standard iOS-style switch',
        'Material Design switch',
        'With on/off labels',
        'With icons',
      ],
    },
    consequences: {
      benefits: [
        'Clear binary state',
        'Immediate visual feedback',
        'Familiar from physical switches',
        'Intuitive interaction',
      ],
      tradeoffs: [
        'Only for binary choices',
        'Instant application may not always be wanted',
        'Label positioning varies by platform',
      ],
    },
    examples: [
      { description: 'Dark mode toggle in settings', platform: 'all' },
      { description: 'Notification preferences switches', platform: 'all' },
      { description: 'Feature flag toggles in admin', platform: 'web' },
    ],
    relatedPatterns: ['pattern-checkbox', 'pattern-form-field'],
    antiPatterns: [
      'Using for choices that need explicit save',
      'Unclear which state is on',
      'Using for more than two options',
    ],
    accessibility: [
      'Use role="switch" (not checkbox)',
      'aria-checked="true/false"',
      'Clear accessible label',
      'Keyboard operable (Space to toggle)',
      'Visible focus state',
    ],
    tags: ['forms', 'toggle', 'switch', 'on-off', 'settings', 'preferences'],
  },
  {
    id: 'pattern-date-picker',
    name: 'Date Picker',
    category: DesignCategory.USER_INTERFACE,
    type: 'form',
    platforms: ['web', 'ios', 'android', 'desktop'],
    problem: 'Users need to select a date but typing dates is error-prone and formats vary by locale.',
    solution:
      'Provide a calendar-style interface for selecting dates visually. May combine with text input for direct typing.',
    context:
      'Use when users need to select dates, especially when context matters (day of week) or date range matters. Consider native date inputs on mobile.',
    structure: {
      description:
        'A calendar grid showing days in a month, with navigation for months/years. May include time selection for datetime inputs.',
      components: ['Calendar grid', 'Month/Year navigation', 'Day cells', 'Today indicator', 'Selected date indicator', 'Input field (optional)'],
      variants: [
        'Single date picker',
        'Date range picker',
        'DateTime picker',
        'Inline calendar',
        'Dropdown calendar',
        'Native mobile picker',
      ],
    },
    consequences: {
      benefits: [
        'Visual context for date selection',
        'Shows day of week',
        'Prevents format errors',
        'Can disable invalid dates',
        'Handles localization',
      ],
      tradeoffs: [
        'Can be complex to implement well',
        'Large UI element',
        'Keyboard navigation tricky',
        'Far dates require navigation',
      ],
    },
    examples: [
      { description: 'Flight booking with departure/return dates', platform: 'web' },
      { description: 'Birthday selection in profile', platform: 'all' },
      { description: 'Event scheduling with datetime', platform: 'all' },
    ],
    relatedPatterns: ['pattern-form-field', 'pattern-input-masking'],
    antiPatterns: [
      'Date picker for far past dates (use dropdown year)',
      'No text input alternative',
      'Ignoring locale preferences',
    ],
    accessibility: [
      'Full keyboard navigation in calendar',
      'aria-label for each date',
      'Announce month changes',
      'Support text input as alternative',
      'Clear instructions for screen readers',
    ],
    tags: ['forms', 'date', 'calendar', 'picker', 'datetime', 'input'],
  },
];
