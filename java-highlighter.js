/**
 * Java Syntax Highlighter & Educational Code Formatter
 * 
 * 100% Offline, Pure Vanilla JavaScript.
 * Provides lexical tokenization, semantic coloring, and educational comment
 * enrichment for Java code snippets across all curriculum topics.
 */

(function () {
  'use strict';

  /* ==========================================================================
     Lexical Grammar & Reserved Token Sets
     ========================================================================== */

  // Standard Java Keywords (structural, control flow, and modifiers)
  const KEYWORDS = new Set([
    'abstract', 'assert', 'break', 'case', 'catch', 'class', 'const', 'continue',
    'default', 'do', 'else', 'enum', 'extends', 'final', 'finally', 'for',
    'goto', 'if', 'implements', 'import', 'instanceof', 'interface', 'native',
    'new', 'package', 'private', 'protected', 'public', 'return', 'static',
    'strictfp', 'super', 'switch', 'synchronized', 'this', 'throw', 'throws',
    'transient', 'try', 'volatile', 'while', 'record', 'sealed', 'permits',
    'non-sealed', 'var', 'yield', 'true', 'false', 'null'
  ]);

  // Primitive Types (distinct type coloring)
  const PRIMITIVE_TYPES = new Set([
    'boolean', 'byte', 'char', 'double', 'float', 'int', 'long', 'short', 'void'
  ]);

  // Common Java Standard Library Classes & Interfaces
  const KNOWN_CLASSES = new Set([
    'String', 'System', 'Object', 'Math', 'Scanner', 'Exception', 'Throwable', 'Error',
    'RuntimeException', 'List', 'ArrayList', 'LinkedList', 'Vector', 'Stack',
    'Set', 'HashSet', 'LinkedHashSet', 'TreeSet',
    'Map', 'HashMap', 'LinkedHashMap', 'TreeMap',
    'Queue', 'Deque', 'ArrayDeque', 'PriorityQueue',
    'Iterator', 'Iterable', 'ListIterator',
    'Comparable', 'Comparator', 'Collections', 'Arrays',
    'File', 'FileReader', 'FileWriter', 'BufferedReader', 'BufferedWriter',
    'InputStream', 'OutputStream', 'FileInputStream', 'FileOutputStream',
    'InputStreamReader', 'OutputStreamWriter', 'PrintStream', 'PrintWriter',
    'Thread', 'Runnable', 'Callable', 'Future', 'ExecutorService', 'Executors',
    'StringBuilder', 'StringBuffer',
    'Integer', 'Double', 'Float', 'Long', 'Short', 'Byte', 'Character', 'Boolean',
    'Optional', 'Stream', 'Collectors', 'LocalDate', 'LocalTime', 'LocalDateTime',
    'Duration', 'Period', 'Instant',
    'IOException', 'FileNotFoundException', 'NullPointerException',
    'ArrayIndexOutOfBoundsException', 'ArithmeticException', 'IllegalArgumentException',
    'IllegalStateException', 'NumberFormatException', 'UnsupportedOperationException',
    'ClassCastException', 'IndexOutOfBoundsException', 'NoSuchElementException',
    'SecurityException', 'InterruptedException'
  ]);

  /* ==========================================================================
     HTML Escaping Helper
     ========================================================================== */
  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /* ==========================================================================
     Educational Comment Enricher
     Adds concise, helpful explanatory inline comments for core Java concepts
     (such as 'this', 'extends', 'super', constructors, '@Override') when not
     already commented on that line. Preserves original code structure and logic.
     ========================================================================== */
  function enrichEducationalComments(code) {
    if (!code || typeof code !== 'string') return '';
    const lines = code.split('\n');
    const enriched = [];

    let currentClassName = null;

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      const trimmed = line.trim();

      // Track current class name from declarations
      const classMatch = trimmed.match(/(?:public\s+|private\s+|protected\s+|static\s+)*class\s+([A-Z][a-zA-Z0-9_$]*)/);
      if (classMatch) {
        currentClassName = classMatch[1];
      }

      // If line already contains any comment, preserve exactly as is
      if (line.includes('//') || line.includes('/*') || trimmed.startsWith('*') || trimmed.startsWith('*/')) {
        enriched.push(line);
        continue;
      }

      // 1. 'this' field disambiguation: this.var = var;
      if (/\bthis\.[a-zA-Z0-9_$]+\s*=\s*[a-zA-Z0-9_$]+;/.test(trimmed)) {
        line += " // 'this' differentiates instance field from parameter";
      }
      // 2. 'this' method chaining: return this;
      else if (/^return\s+this;/.test(trimmed)) {
        line += " // 'this' returns current instance reference for method chaining";
      }
      // 3. 'this()' constructor chaining: this(...);
      else if (/^this\s*\([^)]*\);/.test(trimmed)) {
        line += " // 'this()' invokes overloaded constructor in same class";
      }
      // 4. 'super()' constructor call: super(...);
      else if (/^super\s*\([^)]*\);/.test(trimmed)) {
        line += " // 'super()' invokes parent superclass constructor";
      }
      // 5. 'super' method call: super.method(...);
      else if (/\bsuper\.[a-zA-Z0-9_$]+\s*\(/.test(trimmed)) {
        line += " // 'super' invokes overridden superclass method";
      }
      // 6. 'extends' inheritance: class Child extends Parent
      else if (/\bclass\s+[a-zA-Z0-9_$]+\s+extends\s+[a-zA-Z0-9_$]+/.test(trimmed)) {
        line += " // 'extends' establishes inheritance from superclass";
      }
      // 7. 'implements' interface contract
      else if (/\bimplements\s+[a-zA-Z0-9_$,\s]+/.test(trimmed) && trimmed.endsWith('{')) {
        line += " // 'implements' provides concrete implementation for interface";
      }
      // 8. Constructor definition: ClassName(...) matching class
      else if (currentClassName && (
        new RegExp(`^(?:public\\s+|protected\\s+|private\\s+)?${currentClassName}\\s*\\([^)]*\\)\\s*\\{?$`).test(trimmed)
      )) {
        line += " // Constructor: initializes newly instantiated object state";
      }
      // 9. @Override annotation
      else if (trimmed === '@Override') {
        line += " // Compiler check: verifies method overrides superclass/interface";
      }

      enriched.push(line);
    }

    return enriched.join('\n');
  }

  /* ==========================================================================
     Java Lexical Scanner & Tokenizer
     ========================================================================== */
  function tokenize(input) {
    const tokens = [];
    let i = 0;
    const len = input.length;

    while (i < len) {
      const ch = input[i];
      const next = input[i + 1];

      // 1. Whitespace & Newlines
      if (ch === ' ' || ch === '\t' || ch === '\r' || ch === '\n') {
        const start = i;
        while (i < len && (input[i] === ' ' || input[i] === '\t' || input[i] === '\r' || input[i] === '\n')) {
          i++;
        }
        tokens.push({ type: 'whitespace', text: input.slice(start, i) });
        continue;
      }

      // 2. Comments
      // Single-line comment: //...
      if (ch === '/' && next === '/') {
        const start = i;
        i += 2;
        while (i < len && input[i] !== '\n' && input[i] !== '\r') {
          i++;
        }
        tokens.push({ type: 'comment', text: input.slice(start, i) });
        continue;
      }

      // Multi-line comment: /*...*/
      if (ch === '/' && next === '*') {
        const start = i;
        i += 2;
        while (i < len && !(input[i] === '*' && input[i + 1] === '/')) {
          i++;
        }
        if (i < len) i += 2; // skip */
        tokens.push({ type: 'comment', text: input.slice(start, i) });
        continue;
      }

      // 3. Text Blocks: """...""" (Java 15+)
      if (ch === '"' && next === '"' && input[i + 2] === '"') {
        const start = i;
        i += 3;
        while (i < len && !(input[i] === '"' && input[i + 1] === '"' && input[i + 2] === '"')) {
          if (input[i] === '\\') i += 2;
          else i++;
        }
        if (i < len) i += 3;
        tokens.push({ type: 'string', text: input.slice(start, i) });
        continue;
      }

      // 4. String Literals: "..."
      if (ch === '"') {
        const start = i;
        i++;
        while (i < len && input[i] !== '"' && input[i] !== '\n' && input[i] !== '\r') {
          if (input[i] === '\\') i += 2;
          else i++;
        }
        if (i < len && input[i] === '"') i++;
        tokens.push({ type: 'string', text: input.slice(start, i) });
        continue;
      }

      // 5. Character Literals: '...'
      if (ch === '\'') {
        const start = i;
        i++;
        while (i < len && input[i] !== '\'' && input[i] !== '\n' && input[i] !== '\r') {
          if (input[i] === '\\') i += 2;
          else i++;
        }
        if (i < len && input[i] === '\'') i++;
        tokens.push({ type: 'string', text: input.slice(start, i) });
        continue;
      }

      // 6. Annotations: @AnnotationName
      if (ch === '@' && /[a-zA-Z_$]/.test(next)) {
        const start = i;
        i++;
        while (i < len && /[a-zA-Z0-9_$]/.test(input[i])) {
          i++;
        }
        tokens.push({ type: 'annotation', text: input.slice(start, i) });
        continue;
      }

      // 7. Numeric Literals (Hex, Binary, Floating-Point, Integer)
      if (/[0-9]/.test(ch) || (ch === '.' && /[0-9]/.test(next))) {
        const start = i;
        // Hexadecimal (0x...)
        if (ch === '0' && (next === 'x' || next === 'X')) {
          i += 2;
          while (i < len && /[0-9a-fA-F_]/.test(input[i])) i++;
          if (i < len && /[lL]/.test(input[i])) i++;
        }
        // Binary (0b...)
        else if (ch === '0' && (next === 'b' || next === 'B')) {
          i += 2;
          while (i < len && /[01_]/.test(input[i])) i++;
          if (i < len && /[lL]/.test(input[i])) i++;
        }
        // Standard decimal / floating point
        else {
          let hasDot = (ch === '.');
          if (hasDot) i++;
          while (i < len && (/[0-9_]/.test(input[i]) || (input[i] === '.' && !hasDot && /[0-9]/.test(input[i + 1])))) {
            if (input[i] === '.') hasDot = true;
            i++;
          }
          // Exponential notation
          if (i < len && (input[i] === 'e' || input[i] === 'E')) {
            i++;
            if (i < len && (input[i] === '+' || input[i] === '-')) i++;
            while (i < len && /[0-9_]/.test(input[i])) i++;
          }
          // Type suffixes: f, d, l
          if (i < len && /[fFdDlL]/.test(input[i])) i++;
        }
        tokens.push({ type: 'number', text: input.slice(start, i) });
        continue;
      }

      // 8. Word Identifiers (Keywords, Primitives, Classes, Methods, Variables)
      if (/[a-zA-Z_$]/.test(ch)) {
        const start = i;
        while (i < len && /[a-zA-Z0-9_$]/.test(input[i])) {
          i++;
        }
        const word = input.slice(start, i);

        // Check for Java Keywords
        if (KEYWORDS.has(word)) {
          tokens.push({ type: 'keyword', text: word });
        }
        // Check for Primitive Types
        else if (PRIMITIVE_TYPES.has(word)) {
          tokens.push({ type: 'type', text: word });
        }
        // Lookahead to check if identifier is followed by '('
        else {
          let lookAheadIdx = i;
          while (lookAheadIdx < len && (input[lookAheadIdx] === ' ' || input[lookAheadIdx] === '\t')) {
            lookAheadIdx++;
          }
          const isFollowedByParen = (input[lookAheadIdx] === '(');

          if (isFollowedByParen) {
            // If preceded by 'new', this is a Constructor call: Class name
            let lastNonWs = null;
            for (let k = tokens.length - 1; k >= 0; k--) {
              if (tokens[k].type !== 'whitespace') {
                lastNonWs = tokens[k];
                break;
              }
            }
            if (lastNonWs && lastNonWs.type === 'keyword' && lastNonWs.text === 'new') {
              tokens.push({ type: 'class', text: word });
            } else {
              tokens.push({ type: 'method', text: word });
            }
          }
          // Class / Interface names (capitalized or in KNOWN_CLASSES list)
          else if (KNOWN_CLASSES.has(word) || /^[A-Z]/.test(word)) {
            tokens.push({ type: 'class', text: word });
          }
          // Otherwise, variable, parameter, or property name
          else {
            tokens.push({ type: 'variable', text: word });
          }
        }
        continue;
      }

      // 9. Multi-Character Operators (4-char, 3-char, 2-char)
      const fourChars = input.slice(i, i + 4);
      if (fourChars === '>>>=') {
        tokens.push({ type: 'operator', text: fourChars });
        i += 4;
        continue;
      }

      const threeChars = input.slice(i, i + 3);
      if (['>>=', '<<=', '>>>'].includes(threeChars)) {
        tokens.push({ type: 'operator', text: threeChars });
        i += 3;
        continue;
      }

      const twoChars = input.slice(i, i + 2);
      if ([
        '->', '::', '==', '!=', '<=', '>=', '&&', '||',
        '++', '--', '+=', '-=', '*=', '/=', '%=', '&=',
        '|=', '^=', '<<', '>>'
      ].includes(twoChars)) {
        tokens.push({ type: 'operator', text: twoChars });
        i += 2;
        continue;
      }

      // 10. Single-Character Operators
      if (['+', '-', '*', '/', '%', '=', '<', '>', '!', '&', '|', '^', '~', '?', ':'].includes(ch)) {
        tokens.push({ type: 'operator', text: ch });
        i++;
        continue;
      }

      // 11. Brackets and Parentheses
      if (['{', '}', '(', ')', '[', ']'].includes(ch)) {
        tokens.push({ type: 'bracket', text: ch });
        i++;
        continue;
      }

      // 12. Punctuation (semicolon, comma, period)
      if ([';', ',', '.'].includes(ch)) {
        tokens.push({ type: 'punctuation', text: ch });
        i++;
        continue;
      }

      // 13. Fallback character
      tokens.push({ type: 'other', text: ch });
      i++;
    }

    return tokens;
  }

  /* ==========================================================================
     Highlighter Engine: Token -> HTML Line Generator
     ========================================================================== */
  function highlight(code, options = {}) {
    const enrich = options.enrichComments === true;
    let processedCode = code || '';
    if (enrich) {
      processedCode = enrichEducationalComments(processedCode);
    }

    const tokens = tokenize(processedCode);

    // Group tokens into line buckets
    const lines = [[]];
    for (const token of tokens) {
      if (token.text.includes('\n')) {
        const parts = token.text.split('\n');
        for (let p = 0; p < parts.length; p++) {
          if (parts[p].length > 0) {
            lines[lines.length - 1].push({ type: token.type, text: parts[p] });
          }
          if (p < parts.length - 1) {
            lines.push([]);
          }
        }
      } else {
        lines[lines.length - 1].push(token);
      }
    }

    // Drop trailing empty line if it's just a file-end newline
    if (lines.length > 1 && lines[lines.length - 1].length === 0) {
      lines.pop();
    }

    // Build structured line-numbered HTML
    let html = '';
    lines.forEach((lineTokens, lineIdx) => {
      const lineNum = lineIdx + 1;
      let lineContentHtml = '';

      if (lineTokens.length === 0) {
        lineContentHtml = '&nbsp;';
      } else {
        for (const t of lineTokens) {
          const escaped = escapeHtml(t.text);
          if (t.type === 'whitespace') {
            lineContentHtml += escaped;
          } else {
            lineContentHtml += `<span class="hl-${t.type}">${escaped}</span>`;
          }
        }
      }

      html += `<span class="code-line"><span class="line-num">${lineNum}</span><span class="line-code">${lineContentHtml}</span></span>\n`;
    });

    return {
      html: html,
      rawCode: processedCode
    };
  }

  /* Expose Global Namespace */
  window.JavaHighlighter = {
    highlight,
    tokenize,
    enrichEducationalComments,
    escapeHtml
  };

})();
