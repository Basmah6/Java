/**
 * Java Learning Platform - Core Client Framework
 * 100% Offline, Pure Vanilla JavaScript (No frameworks, No external dependencies)
 * LocalStorage-based progress tracking and quiz persistence.
 */

import './curriculum-part1.js';
import './curriculum-part2.js';
import './curriculum-part3.js';
import './curriculum-part4.js';
import './curriculum-part5.js';
import './curriculum-part6.js';
import './curriculum-part7.js';
import './curriculum-part8.js';
import './curriculum-part9.js';
import './curriculum-part10.js';
import './curriculum-part11.js';
import './curriculum-part12.js';
import './curriculum-part13.js';
import './curriculum-part14.js';
import './curriculum-part15.js';
import './curriculum-part16.js';
import './curriculum-part17.js';
import './curriculum-part18.js';
import './curriculum-part19.js';
import './curriculum-part20.js';
import './curriculum-part21.js';
import './curriculum-part22.js';
import './curriculum-part23.js';
import './curriculum-part24.js';
import './curriculum-part25.js';
import './curriculum-part26.js';
import './curriculum-part27.js';
import './curriculum-part28.js';
import './curriculum-part29.js';
import './curriculum-part30.js';
import './curriculum-part31.js';
import './curriculum-part32.js';
import './curriculum-part33.js';
import './curriculum-part34.js';
import './curriculum-part35.js';
import './curriculum-part36.js';
import './curriculum-part37.js';
import './java-highlighter.js';

(function () {
  'use strict';

  /* ==========================================================================
     Course Data Registry
     Modular multi-part offline Java curriculum loader.
     ========================================================================== */
  let customTopics = null;
  let cachedTopics = null;

  function getBaseTopics() {
    if (!cachedTopics) {
      cachedTopics = [
        ...(window.JAVA_TOPICS_PART1 || []),
        ...(window.JAVA_TOPICS_PART2 || []),
        ...(window.JAVA_TOPICS_PART3 || []),
        ...(window.JAVA_TOPICS_PART4 || []),
        ...(window.JAVA_TOPICS_PART5 || []),
        ...(window.JAVA_TOPICS_PART6 || []),
        ...(window.JAVA_TOPICS_PART7 || []),
        ...(window.JAVA_TOPICS_PART8 || []),
        ...(window.JAVA_TOPICS_PART9 || []),
        ...(window.JAVA_TOPICS_PART10 || []),
        ...(window.JAVA_TOPICS_PART11 || []),
        ...(window.JAVA_TOPICS_PART12 || []),
        ...(window.JAVA_TOPICS_PART13 || []),
        ...(window.JAVA_TOPICS_PART14 || []),
        ...(window.JAVA_TOPICS_PART15 || []),
        ...(window.JAVA_TOPICS_PART16 || []),
        ...(window.JAVA_TOPICS_PART17 || []),
        ...(window.JAVA_TOPICS_PART18 || []),
        ...(window.JAVA_TOPICS_PART19 || []),
        ...(window.JAVA_TOPICS_PART20 || []),
        ...(window.JAVA_TOPICS_PART21 || []),
        ...(window.JAVA_TOPICS_PART22 || []),
        ...(window.JAVA_TOPICS_PART23 || []),
        ...(window.JAVA_TOPICS_PART24 || []),
        ...(window.JAVA_TOPICS_PART25 || []),
        ...(window.JAVA_TOPICS_PART26 || []),
        ...(window.JAVA_TOPICS_PART27 || []),
        ...(window.JAVA_TOPICS_PART28 || []),
        ...(window.JAVA_TOPICS_PART29 || []),
        ...(window.JAVA_TOPICS_PART30 || []),
        ...(window.JAVA_TOPICS_PART31 || []),
        ...(window.JAVA_TOPICS_PART32 || []),
        ...(window.JAVA_TOPICS_PART33 || []),
        ...(window.JAVA_TOPICS_PART34 || []),
        ...(window.JAVA_TOPICS_PART35 || []),
        ...(window.JAVA_TOPICS_PART36 || []),
        ...(window.JAVA_TOPICS_PART37 || [])
      ];
    }
    return cachedTopics;
  }

  const COURSE_DATA = {
    title: "Java Learning Platform",
    get topics() {
      if (customTopics) return customTopics;
      return getBaseTopics();
    },
    set topics(val) {
      customTopics = Array.isArray(val) ? val : [];
    }
  };

  /* ==========================================================================
     LocalStorage Persistence Manager
     ========================================================================== */
  const STORAGE_KEY = 'java_learning_offline_progress_v1';

  const defaultStorageData = {
    completedLessons: {},
    quizResults: {},
    lastActive: null,
    expandedTopics: {}
  };

  const Storage = {
    getData() {
      try {
        if (typeof window === 'undefined' || !window.localStorage) {
          return { ...defaultStorageData };
        }
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) {
          return { ...defaultStorageData };
        }
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          return {
            completedLessons: parsed.completedLessons || {},
            quizResults: parsed.quizResults || {},
            lastActive: parsed.lastActive || null,
            expandedTopics: parsed.expandedTopics || {}
          };
        }
        return { ...defaultStorageData };
      } catch (err) {
        console.warn('LocalStorage access warning:', err);
        return { ...defaultStorageData };
      }
    },

    saveData(data) {
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        }
      } catch (err) {
        console.warn('Failed to save to localStorage:', err);
      }
    },

    isLessonCompleted(lessonId) {
      const data = this.getData();
      return Boolean(data.completedLessons && data.completedLessons[lessonId]);
    },

    toggleLessonCompleted(lessonId) {
      const data = this.getData();
      if (!data.completedLessons) data.completedLessons = {};
      
      const isNowComplete = !data.completedLessons[lessonId];
      if (isNowComplete) {
        data.completedLessons[lessonId] = Date.now();
      } else {
        delete data.completedLessons[lessonId];
      }
      this.saveData(data);
      return isNowComplete;
    },

    getQuizResult(lessonId) {
      const data = this.getData();
      return (data.quizResults && data.quizResults[lessonId]) || null;
    },

    saveQuizResult(lessonId, score, total, selectedAnswers) {
      const data = this.getData();
      if (!data.quizResults) data.quizResults = {};
      data.quizResults[lessonId] = {
        score,
        total,
        selectedAnswers,
        submittedAt: Date.now()
      };
      this.saveData(data);
    },

    clearQuizResult(lessonId) {
      const data = this.getData();
      if (data.quizResults && data.quizResults[lessonId]) {
        delete data.quizResults[lessonId];
        this.saveData(data);
      }
    },

    getLastActive() {
      const data = this.getData();
      return data.lastActive || null;
    },

    setLastActive(topicId, lessonId) {
      const data = this.getData();
      data.lastActive = { topicId, lessonId };
      this.saveData(data);
    },

    isTopicExpanded(topicId) {
      const data = this.getData();
      if (!data.expandedTopics) return true;
      return data.expandedTopics[topicId] !== false;
    },

    setTopicExpanded(topicId, isExpanded) {
      const data = this.getData();
      if (!data.expandedTopics) data.expandedTopics = {};
      data.expandedTopics[topicId] = isExpanded;
      this.saveData(data);
    },

    resetAllProgress() {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (err) {
        console.warn('LocalStorage remove failed:', err);
      }
    }
  };

  /* ==========================================================================
     Theme Manager (Light & Dark Mode)
     ========================================================================== */
  const THEME_STORAGE_KEY = 'java_learning_theme';

  const Theme = {
    current: 'light',

    init() {
      let saved = null;
      try {
        saved = localStorage.getItem(THEME_STORAGE_KEY) || localStorage.getItem('theme');
      } catch (err) {
        console.warn('LocalStorage theme access failed:', err);
      }

      const activeTheme = (saved === 'dark') ? 'dark' : 'light';
      this.apply(activeTheme, false);
    },

    apply(themeName, saveToStorage = true) {
      const mode = themeName === 'dark' ? 'dark' : 'light';
      this.current = mode;
      document.documentElement.setAttribute('data-theme', mode);

      if (saveToStorage) {
        try {
          localStorage.setItem(THEME_STORAGE_KEY, mode);
          localStorage.setItem('theme', mode);
        } catch (err) {
          console.warn('LocalStorage theme save failed:', err);
        }
      }

      const lightBtn = elements.themeLightBtn || document.getElementById('theme-light-btn');
      const darkBtn = elements.themeDarkBtn || document.getElementById('theme-dark-btn');

      if (lightBtn && darkBtn) {
        if (mode === 'dark') {
          darkBtn.classList.remove('chip-outline');
          darkBtn.classList.add('chip-filled');
          darkBtn.setAttribute('aria-pressed', 'true');

          lightBtn.classList.remove('chip-filled');
          lightBtn.classList.add('chip-outline');
          lightBtn.setAttribute('aria-pressed', 'false');
        } else {
          lightBtn.classList.remove('chip-outline');
          lightBtn.classList.add('chip-filled');
          lightBtn.setAttribute('aria-pressed', 'true');

          darkBtn.classList.remove('chip-filled');
          darkBtn.classList.add('chip-outline');
          darkBtn.setAttribute('aria-pressed', 'false');
        }
      }
    }
  };

  /* ==========================================================================
     Application State
     ========================================================================== */
  const state = {
    currentTopicId: null,
    currentLessonId: null,
    searchQuery: '',
    sidebarOpen: false
  };

  /* ==========================================================================
     DOM Elements Cache (Dynamic getters to ensure resilience to DOM timing)
     ========================================================================== */
  const elements = {
    get headerProgressFill() { return document.getElementById('header-progress-fill'); },
    get headerProgressText() { return document.getElementById('header-progress-text'); },
    get themeLightBtn() { return document.getElementById('theme-light-btn'); },
    get themeDarkBtn() { return document.getElementById('theme-dark-btn'); },
    get sidebar() { return document.getElementById('sidebar'); },
    get sidebarBackdrop() { return document.getElementById('sidebar-backdrop'); },
    get sidebarCounter() { return document.getElementById('sidebar-counter'); },
    get topicsList() { return document.getElementById('topics-list'); },
    get searchInput() { return document.getElementById('topic-search'); },
    get mainContent() { return document.getElementById('main-content'); },
    get breadcrumbs() { return document.getElementById('breadcrumbs'); },
    get contentWrapper() { return document.getElementById('content-wrapper'); },
    get mobileMenuBtn() { return document.getElementById('mobile-menu-btn'); },
    get resetBtn() { return document.getElementById('reset-progress-btn'); },
    get resetModal() { return document.getElementById('reset-modal'); },
    get modalCancelBtn() { return document.getElementById('modal-cancel-btn'); },
    get modalConfirmBtn() { return document.getElementById('modal-confirm-btn'); },
    get statLessonsCompleted() { return document.getElementById('stat-lessons-completed'); },
    get statQuizzesCompleted() { return document.getElementById('stat-quizzes-completed'); },
    get toastContainer() { return document.getElementById('toast-container'); }
  };

  /* ==========================================================================
     Toast Notification Utility
     ========================================================================== */
  function showToast(message) {
    if (!elements.toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    elements.toastContainer.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('is-visible');
    });

    setTimeout(() => {
      toast.classList.remove('is-visible');
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 2500);
  }

  /* ==========================================================================
     Helpers for Content Resolution
     ========================================================================== */
  function getAllLessonsFlat() {
    const list = [];
    if (!COURSE_DATA.topics || !COURSE_DATA.topics.length) return list;
    
    COURSE_DATA.topics.forEach(topic => {
      if (topic.lessons && Array.isArray(topic.lessons)) {
        topic.lessons.forEach(lesson => {
          list.push({
            topicId: topic.id,
            topicTitle: topic.title,
            lessonId: lesson.id,
            lessonTitle: lesson.title,
            lesson: lesson
          });
        });
      }
    });
    return list;
  }

  function findTopic(topicId) {
    if (!COURSE_DATA.topics) return null;
    return COURSE_DATA.topics.find(t => t.id === topicId) || null;
  }

  function findLesson(topicId, lessonId) {
    const topic = findTopic(topicId);
    if (!topic || !topic.lessons) return null;
    return topic.lessons.find(l => l.id === lessonId) || null;
  }

  function getAdjacentLessons(topicId, lessonId) {
    const flat = getAllLessonsFlat();
    const index = flat.findIndex(item => item.topicId === topicId && item.lessonId === lessonId);
    return {
      prev: index > 0 ? flat[index - 1] : null,
      next: index >= 0 && index < flat.length - 1 ? flat[index + 1] : null
    };
  }

  /* ==========================================================================
     Progress Calculation & UI Update
     ========================================================================== */
  function updateProgressUI() {
    const allLessons = getAllLessonsFlat();
    const totalLessons = allLessons.length;
    const storageData = Storage.getData();
    const completedMap = storageData.completedLessons || {};
    
    let completedCount = 0;
    allLessons.forEach(item => {
      if (completedMap[item.lessonId]) {
        completedCount++;
      }
    });

    const percent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

    if (elements.headerProgressFill) {
      elements.headerProgressFill.style.width = `${percent}%`;
    }
    if (elements.headerProgressText) {
      elements.headerProgressText.textContent = `${percent}% (${completedCount}/${totalLessons})`;
    }
    if (elements.statLessonsCompleted) {
      elements.statLessonsCompleted.textContent = `${completedCount} / ${totalLessons}`;
    }
    if (elements.sidebarCounter) {
      elements.sidebarCounter.textContent = `${COURSE_DATA.topics.length} topics`;
    }

    const quizMap = storageData.quizResults || {};
    const quizCount = Object.keys(quizMap).length;
    if (elements.statQuizzesCompleted) {
      elements.statQuizzesCompleted.textContent = `${quizCount}`;
    }
  }

  /* ==========================================================================
     Sidebar Renderer
     ========================================================================== */
  function renderSidebar() {
    if (!elements.topicsList) return;
    elements.topicsList.innerHTML = '';

    const query = state.searchQuery.trim().toLowerCase();

    // Empty state when no topics are loaded
    if (!COURSE_DATA.topics || COURSE_DATA.topics.length === 0) {
      elements.topicsList.innerHTML = `
        <div class="sidebar-empty">
          <div class="sidebar-empty-icon" aria-hidden="true">+</div>
          <div class="sidebar-empty-title">No Topics Loaded</div>
          <div class="sidebar-empty-desc">
            Waiting for content injection...<br/>Ready for Topic System initialization.
          </div>
        </div>
      `;
      return;
    }

    // Filter topics/lessons based on search query
    let renderedCount = 0;

    COURSE_DATA.topics.forEach(topic => {
      const lessons = topic.lessons || [];
      const matchesTopic = topic.title.toLowerCase().includes(query);
      const matchingLessons = lessons.filter(l => 
        matchesTopic || l.title.toLowerCase().includes(query)
      );

      if (query && !matchesTopic && matchingLessons.length === 0) {
        return; // Filtered out
      }

      renderedCount++;
      const isExpanded = query ? true : Storage.isTopicExpanded(topic.id);

      const groupEl = document.createElement('div');
      groupEl.className = `topic-group ${isExpanded ? 'is-open' : ''}`;
      groupEl.id = `topic-group-${topic.id}`;

      // Topic Header Button
      const headerBtn = document.createElement('button');
      headerBtn.className = 'topic-header';
      headerBtn.type = 'button';
      headerBtn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
      headerBtn.innerHTML = `
        <span class="topic-header-title">
          <span class="topic-chevron">&#9656;</span>
          <span>${escapeHtml(topic.title)}</span>
        </span>
        <span class="sidebar-counter">${lessons.length}</span>
      `;

      headerBtn.addEventListener('click', () => {
        const nextState = !groupEl.classList.contains('is-open');
        groupEl.classList.toggle('is-open', nextState);
        headerBtn.setAttribute('aria-expanded', nextState ? 'true' : 'false');
        Storage.setTopicExpanded(topic.id, nextState);
      });

      // Lessons List
      const listEl = document.createElement('ul');
      listEl.className = 'lesson-list';

      lessons.forEach(lesson => {
        if (query && !matchesTopic && !lesson.title.toLowerCase().includes(query)) {
          return;
        }

        const isCompleted = Storage.isLessonCompleted(lesson.id);
        const isActive = state.currentTopicId === topic.id && state.currentLessonId === lesson.id;

        const li = document.createElement('li');
        const link = document.createElement('a');
        link.className = `lesson-item-link ${isActive ? 'is-active' : ''}`;
        link.href = `#topic/${topic.id}/lesson/${lesson.id}`;
        link.innerHTML = `
          <span class="lesson-title-area">
            <span class="status-indicator ${isCompleted ? 'is-done' : ''}">
              ${isCompleted ? '&#10003;' : ''}
            </span>
            <span>${escapeHtml(lesson.title)}</span>
          </span>
          ${lesson.estimatedMinutes ? `<span class="sidebar-counter">${lesson.estimatedMinutes}m</span>` : ''}
        `;

        link.addEventListener('click', (e) => {
          e.preventDefault();
          navigateTo(topic.id, lesson.id);
          closeMobileSidebar();
        });

        li.appendChild(link);
        listEl.appendChild(li);
      });

      groupEl.appendChild(headerBtn);
      groupEl.appendChild(listEl);
      elements.topicsList.appendChild(groupEl);
    });

    if (query && renderedCount === 0) {
      elements.topicsList.innerHTML = `
        <div class="sidebar-empty">
          <div class="sidebar-empty-title">No matching topics</div>
          <div class="sidebar-empty-desc">No lessons matched "${escapeHtml(query)}".</div>
        </div>
      `;
    }
  }

  /* ==========================================================================
     Breadcrumbs Renderer
     ========================================================================== */
  function renderBreadcrumbs(topic, lesson) {
    if (!elements.breadcrumbs) return;

    if (!topic || !lesson) {
      elements.breadcrumbs.innerHTML = `
        <span class="breadcrumb-item">Curriculum</span>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-current">Framework Overview</span>
      `;
      return;
    }

    elements.breadcrumbs.innerHTML = `
      <a href="#" id="crumb-home" class="breadcrumb-item" style="text-decoration:none; color:inherit;">Curriculum</a>
      <span class="breadcrumb-separator">/</span>
      <span class="breadcrumb-item">${escapeHtml(topic.title)}</span>
      <span class="breadcrumb-separator">/</span>
      <span class="breadcrumb-current">${escapeHtml(lesson.title)}</span>
    `;

    const crumbHome = document.getElementById('crumb-home');
    if (crumbHome) {
      crumbHome.addEventListener('click', (e) => {
        e.preventDefault();
        state.currentTopicId = null;
        state.currentLessonId = null;
        window.location.hash = '';
        renderMainContent();
        renderSidebar();
      });
    }
  }

  /* ==========================================================================
     Empty State / Welcome Framework Renderer
     ========================================================================== */
  function renderEmptyState() {
    renderBreadcrumbs(null, null);

    const wrapper = elements.contentWrapper || document.getElementById('content-wrapper');
    if (!wrapper) return;

    wrapper.innerHTML = `
      <div class="clean-minimal-hero" id="framework-overview-card">
        <header class="hero-top-bar">
          <div class="hero-top-left">
            <h3 class="hero-module-title">Framework Initialized</h3>
            <p class="hero-module-sub">module::content_renderer_v1.0</p>
          </div>
          <div class="hero-top-badges">
            <div class="status-chip chip-outline">Offline Mode</div>
            <div class="status-chip chip-filled">localStorage: Active</div>
          </div>
        </header>

        <div class="hero-center-stage">
          <svg class="hero-icon-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <h4 class="hero-headline">Lesson Surface Ready</h4>
          <p class="hero-body-text">
            The rendering engine is standing by. All logical systems including progress tracking, quiz validation, and code-block formatting are operational. Content provided via the topic system will be injected here.
          </p>
          <div class="hero-metrics-grid">
            <div class="metric-box">
              <p class="metric-label">Last Accessed</p>
              <p class="metric-value">NULL_SESSION_0x00</p>
            </div>
            <div class="metric-box">
              <p class="metric-label">Active Lesson</p>
              <p class="metric-value metric-pending">PENDING_SELECTION</p>
            </div>
          </div>
        </div>
      </div>

      <div class="framework-status-grid">
        <div class="status-card" id="card-nav-system">
          <div class="status-card-header">
            <span class="status-badge">Functional</span>
          </div>
          <div class="status-card-title">Topic Navigation System</div>
          <div class="status-card-desc">
            Multi-level collapsible sidebar, deep-linking hash routing, instant client-side search, and responsive mobile drawer.
          </div>
        </div>

        <div class="status-card" id="card-layout-system">
          <div class="status-card-header">
            <span class="status-badge">Functional</span>
          </div>
          <div class="status-card-title">Lesson Layout Engine</div>
          <div class="status-card-desc">
            Structured text, typography hierarchy, informational callout notes, and bulleted concepts.
          </div>
        </div>

        <div class="status-card" id="card-code-system">
          <div class="status-card-header">
            <span class="status-badge">Functional</span>
          </div>
          <div class="status-card-title">Code Example Engine</div>
          <div class="status-card-desc">
            Monospace syntax formatting, filename headers, one-click clipboard copy with feedback, and console output preview.
          </div>
        </div>

        <div class="status-card" id="card-quiz-system">
          <div class="status-card-header">
            <span class="status-badge">Functional</span>
          </div>
          <div class="status-card-title">Interactive Quiz System</div>
          <div class="status-card-desc">
            Instant feedback, answer validation, score calculation, explanations, and retake functionality.
          </div>
        </div>

        <div class="status-card" id="card-storage-system">
          <div class="status-card-header">
            <span class="status-badge">Functional</span>
          </div>
          <div class="status-card-title">LocalStorage Engine</div>
          <div class="status-card-desc">
            100% offline client-side persistence for lesson completion flags, quiz scores, and course completion percentages.
          </div>
        </div>

        <div class="status-card" id="card-offline-system">
          <div class="status-card-header">
            <span class="status-badge">Functional</span>
          </div>
          <div class="status-card-title">Offline Black & White Theme</div>
          <div class="status-card-desc">
            High-contrast monochrome styling, accessible system typography, zero external network calls or CDN dependencies.
          </div>
        </div>
      </div>

      <div class="schema-box" id="data-structure-guide">
        <div class="schema-box-header">
          <span class="schema-box-title">Content Data Specification</span>
          <span class="sidebar-counter">Ready for Input</span>
        </div>
        <pre class="schema-box-body"><code>// Ready to accept topics via prompt or data injection:
{
  id: "topic-id",
  title: "Topic Title",
  lessons: [
    {
      id: "lesson-id",
      title: "Lesson Title",
      estimatedMinutes: 5,
      content: [
        { type: "paragraph", text: "Lesson text..." },
        { type: "code", code: "...", language: "java", filename: "Main.java", output: "..." },
        { type: "callout", title: "Key Takeaway", text: "Important note..." }
      ],
      quiz: [
        {
          id: "q1",
          question: "Question text?",
          options: ["A", "B", "C", "D"],
          correctIndex: 0,
          explanation: "Explanation..."
        }
      ]
    }
  ]
}</code></pre>
      </div>
    `;
  }

  /* ==========================================================================
     Lesson Content Renderer
     ========================================================================== */
  function renderLesson(topic, lesson) {
    renderBreadcrumbs(topic, lesson);
    const isCompleted = Storage.isLessonCompleted(lesson.id);
    const adjacent = getAdjacentLessons(topic.id, lesson.id);

    // Build lesson container
    const article = document.createElement('article');
    article.className = 'lesson-article';
    article.id = `lesson-view-${lesson.id}`;

    // Header
    const header = document.createElement('header');
    header.className = 'lesson-header';
    header.innerHTML = `
      <div class="lesson-meta-row">
        <span class="lesson-category-pill">${escapeHtml(topic.title)}</span>
        <div class="lesson-actions">
          ${lesson.estimatedMinutes ? `<span class="sidebar-counter">${lesson.estimatedMinutes} min read</span>` : ''}
          <button type="button" id="btn-toggle-complete" class="btn btn-sm ${isCompleted ? 'btn-primary' : 'btn-outline'}">
            ${isCompleted ? '&#10003; Completed' : 'Mark as Complete'}
          </button>
        </div>
      </div>
      <h1 class="lesson-title">${escapeHtml(lesson.title)}</h1>
    `;

    // Completion Toggle Action
    const toggleBtn = header.querySelector('#btn-toggle-complete');
    toggleBtn.addEventListener('click', () => {
      const nowDone = Storage.toggleLessonCompleted(lesson.id);
      toggleBtn.className = `btn btn-sm ${nowDone ? 'btn-primary' : 'btn-outline'}`;
      toggleBtn.innerHTML = nowDone ? '&#10003; Completed' : 'Mark as Complete';
      
      const bottomToggleBtn = document.getElementById('bottom-toggle-complete');
      if (bottomToggleBtn) {
        bottomToggleBtn.className = `btn ${nowDone ? 'btn-primary' : 'btn-outline'}`;
        bottomToggleBtn.innerHTML = nowDone ? '&#10003; Completed' : 'Mark as Complete';
      }

      showToast(nowDone ? 'Lesson marked as completed!' : 'Lesson marked as incomplete');
      renderSidebar();
      updateProgressUI();
    });

    article.appendChild(header);

    // Body Content Elements
    const body = document.createElement('div');
    body.className = 'lesson-content';

    if (lesson.content && Array.isArray(lesson.content)) {
      lesson.content.forEach((block, index) => {
        if (block.type === 'paragraph') {
          const p = document.createElement('p');
          p.setAttribute('dir', 'auto');
          p.textContent = block.text || '';
          body.appendChild(p);
        } else if (block.type === 'heading') {
          const h = document.createElement(block.level === 3 ? 'h3' : 'h2');
          h.setAttribute('dir', 'auto');
          h.textContent = block.text || '';
          body.appendChild(h);
        } else if (block.type === 'list') {
          const list = document.createElement(block.ordered ? 'ol' : 'ul');
          if (Array.isArray(block.items)) {
            block.items.forEach(itemText => {
              const li = document.createElement('li');
              li.setAttribute('dir', 'auto');
              li.textContent = itemText;
              list.appendChild(li);
            });
          }
          body.appendChild(list);
        } else if (block.type === 'callout') {
          const callout = document.createElement('div');
          callout.className = `callout ${block.dir === 'rtl' ? 'callout-rtl' : ''}`;
          callout.setAttribute('dir', block.dir || 'auto');
          callout.innerHTML = `
            ${block.title ? `<div class="callout-title" dir="auto">${escapeHtml(block.title)}</div>` : ''}
            <div class="callout-body" dir="auto">${escapeHtml(block.text || '')}</div>
          `;
          body.appendChild(callout);
        } else if (block.type === 'code') {
          const codeWrapper = document.createElement('div');
          codeWrapper.className = 'code-block-wrapper';
          codeWrapper.id = `code-block-${lesson.id}-${index}`;

          const codeHeader = document.createElement('div');
          codeHeader.className = 'code-header';
          codeHeader.innerHTML = `
            <div class="code-title-group">
              <span class="code-lang-tag">${escapeHtml(block.language || 'JAVA')}</span>
              <span class="code-filename">${escapeHtml(block.filename || 'Example.java')}</span>
            </div>
            <button type="button" class="btn-copy" id="copy-btn-${lesson.id}-${index}">
              <span class="copy-label">Copy Code</span>
            </button>
          `;

          const scrollContainer = document.createElement('div');
          scrollContainer.className = 'code-scroll-container';
          const pre = document.createElement('pre');
          pre.className = 'code-content';

          let highlightedResult = null;
          if (window.JavaHighlighter && typeof window.JavaHighlighter.highlight === 'function') {
            highlightedResult = window.JavaHighlighter.highlight(block.code || '', { enrichComments: false });
            pre.innerHTML = highlightedResult.html;
          } else {
            pre.textContent = block.code || '';
          }
          scrollContainer.appendChild(pre);

          codeWrapper.appendChild(codeHeader);
          codeWrapper.appendChild(scrollContainer);

          // Output box if provided
          if (block.output) {
            const outBox = document.createElement('div');
            outBox.className = 'code-output-container';
            outBox.innerHTML = `
              <div class="code-output-label">Console Output:</div>
              <div class="code-output-text">${escapeHtml(block.output)}</div>
            `;
            codeWrapper.appendChild(outBox);
          }

          // Copy Button listener
          const copyBtn = codeHeader.querySelector('.btn-copy');
          copyBtn.addEventListener('click', () => {
            const textToCopy = (highlightedResult && highlightedResult.rawCode) || block.code || '';
            copyToClipboard(textToCopy, copyBtn);
          });

          body.appendChild(codeWrapper);
        }
      });
    }

    article.appendChild(body);

    // Quiz Section
    if (lesson.quiz && Array.isArray(lesson.quiz) && lesson.quiz.length > 0) {
      const quizSection = renderQuizSection(lesson);
      article.appendChild(quizSection);
    }

    // Bottom Navigation Bar
    const navBar = document.createElement('footer');
    navBar.className = 'lesson-nav-bar';

    // Previous Button
    if (adjacent.prev) {
      const prevBtn = document.createElement('a');
      prevBtn.className = 'nav-direction-btn';
      prevBtn.href = `#topic/${adjacent.prev.topicId}/lesson/${adjacent.prev.lessonId}`;
      prevBtn.innerHTML = `
        <span class="nav-direction-sub">&larr; Previous</span>
        <span class="nav-direction-title">${escapeHtml(adjacent.prev.lessonTitle)}</span>
      `;
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        navigateTo(adjacent.prev.topicId, adjacent.prev.lessonId);
      });
      navBar.appendChild(prevBtn);
    } else {
      const emptySpan = document.createElement('div');
      emptySpan.className = 'nav-direction-btn is-disabled';
      emptySpan.innerHTML = `
        <span class="nav-direction-sub">&larr; Previous</span>
        <span class="nav-direction-title">Beginning</span>
      `;
      navBar.appendChild(emptySpan);
    }

    // Middle toggle complete
    const bottomToggle = document.createElement('button');
    bottomToggle.type = 'button';
    bottomToggle.id = 'bottom-toggle-complete';
    bottomToggle.className = `btn ${isCompleted ? 'btn-primary' : 'btn-outline'}`;
    bottomToggle.innerHTML = isCompleted ? '&#10003; Lesson Completed' : 'Mark Lesson Completed';
    bottomToggle.addEventListener('click', () => {
      toggleBtn.click();
    });
    navBar.appendChild(bottomToggle);

    // Next Button
    if (adjacent.next) {
      const nextBtn = document.createElement('a');
      nextBtn.className = 'nav-direction-btn';
      nextBtn.href = `#topic/${adjacent.next.topicId}/lesson/${adjacent.next.lessonId}`;
      nextBtn.style.textAlign = 'right';
      nextBtn.innerHTML = `
        <span class="nav-direction-sub">Next &rarr;</span>
        <span class="nav-direction-title">${escapeHtml(adjacent.next.lessonTitle)}</span>
      `;
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        navigateTo(adjacent.next.topicId, adjacent.next.lessonId);
      });
      navBar.appendChild(nextBtn);
    } else {
      const emptySpan = document.createElement('div');
      emptySpan.className = 'nav-direction-btn is-disabled';
      emptySpan.style.textAlign = 'right';
      emptySpan.innerHTML = `
        <span class="nav-direction-sub">Next &rarr;</span>
        <span class="nav-direction-title">End of Course</span>
      `;
      navBar.appendChild(emptySpan);
    }

    article.appendChild(navBar);

    const wrapper = elements.contentWrapper || document.getElementById('content-wrapper');
    if (wrapper) {
      wrapper.innerHTML = '';
      wrapper.appendChild(article);
    }
  }

  /* ==========================================================================
     Quiz Section Renderer
     ========================================================================== */
  function renderQuizSection(lesson) {
    const quizSection = document.createElement('section');
    quizSection.className = 'quiz-section';
    quizSection.id = `quiz-section-${lesson.id}`;

    const existingResult = Storage.getQuizResult(lesson.id);
    const isSubmitted = Boolean(existingResult);

    // Header
    const quizHeader = document.createElement('div');
    quizHeader.className = 'quiz-header';
    quizHeader.innerHTML = `
      <div class="quiz-title-box">
        <span class="quiz-badge">Knowledge Assessment</span>
        <h2 class="quiz-title">Lesson Review Quiz</h2>
      </div>
      <div id="quiz-score-display" class="quiz-score-badge" style="display: ${isSubmitted ? 'block' : 'none'};">
        ${isSubmitted ? `Score: ${existingResult.score} / ${existingResult.total} (${Math.round((existingResult.score / existingResult.total) * 100)}%)` : ''}
      </div>
    `;
    quizSection.appendChild(quizHeader);

    // Questions List
    const questionsList = document.createElement('div');
    questionsList.className = 'quiz-questions-list';

    lesson.quiz.forEach((q, qIndex) => {
      const card = document.createElement('div');
      card.className = 'quiz-card';
      card.id = `quiz-card-${q.id || qIndex}`;

      const titleEl = document.createElement('div');
      titleEl.className = 'quiz-question-text';
      titleEl.setAttribute('dir', 'auto');
      titleEl.textContent = `${qIndex + 1}. ${q.question}`;
      card.appendChild(titleEl);

      const optionsBox = document.createElement('div');
      optionsBox.className = 'quiz-options';

      const selectedOptionIndex = isSubmitted && existingResult.selectedAnswers
        ? existingResult.selectedAnswers[qIndex]
        : null;

      q.options.forEach((optText, optIndex) => {
        const label = document.createElement('label');
        label.className = 'quiz-option-label';

        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `quiz_q_${lesson.id}_${qIndex}`;
        input.value = optIndex;
        input.className = 'quiz-option-input';
        if (selectedOptionIndex === optIndex) {
          input.checked = true;
          label.classList.add('is-selected');
        }

        if (isSubmitted) {
          input.disabled = true;
          if (optIndex === q.correctIndex) {
            label.classList.add('is-correct');
          } else if (selectedOptionIndex === optIndex && optIndex !== q.correctIndex) {
            label.classList.add('is-wrong');
          }
        }

        input.addEventListener('change', () => {
          const siblings = optionsBox.querySelectorAll('.quiz-option-label');
          siblings.forEach(s => s.classList.remove('is-selected'));
          if (input.checked) {
            label.classList.add('is-selected');
          }
        });

        label.appendChild(input);
        const textSpan = document.createElement('span');
        textSpan.setAttribute('dir', 'auto');
        textSpan.textContent = optText;
        label.appendChild(textSpan);
        optionsBox.appendChild(label);
      });

      card.appendChild(optionsBox);

      // Feedback / Explanation
      const feedback = document.createElement('div');
      feedback.className = `quiz-feedback-box ${isSubmitted ? 'is-visible' : ''}`;
      feedback.setAttribute('dir', 'auto');
      if (isSubmitted) {
        const isCorrect = selectedOptionIndex === q.correctIndex;
        feedback.classList.add(isCorrect ? 'feedback-correct' : 'feedback-wrong');
        feedback.innerHTML = `
          <strong>${isCorrect ? '&#10003; Correct!' : '&#10007; Incorrect.'}</strong>
          ${q.explanation ? `<p style="margin-top: 0.35rem;" dir="auto">${escapeHtml(q.explanation)}</p>` : ''}
        `;
      }
      card.appendChild(feedback);

      questionsList.appendChild(card);
    });

    quizSection.appendChild(questionsList);

    // Action buttons
    const actions = document.createElement('div');
    actions.className = 'quiz-actions';

    const submitBtn = document.createElement('button');
    submitBtn.type = 'button';
    submitBtn.className = 'btn btn-primary';
    submitBtn.textContent = 'Check Answers';
    submitBtn.style.display = isSubmitted ? 'none' : 'inline-flex';

    const retakeBtn = document.createElement('button');
    retakeBtn.type = 'button';
    retakeBtn.className = 'btn btn-secondary';
    retakeBtn.textContent = 'Retake Quiz';
    retakeBtn.style.display = isSubmitted ? 'inline-flex' : 'none';

    submitBtn.addEventListener('click', () => {
      const answers = [];
      let unanswered = false;

      lesson.quiz.forEach((q, qIdx) => {
        const selectedRadio = quizSection.querySelector(`input[name="quiz_q_${lesson.id}_${qIdx}"]:checked`);
        if (!selectedRadio) {
          unanswered = true;
          answers.push(null);
        } else {
          answers.push(parseInt(selectedRadio.value, 10));
        }
      });

      if (unanswered) {
        showToast('Please answer all questions before submitting.');
        return;
      }

      let score = 0;
      lesson.quiz.forEach((q, qIdx) => {
        if (answers[qIdx] === q.correctIndex) {
          score++;
        }
      });

      Storage.saveQuizResult(lesson.id, score, lesson.quiz.length, answers);
      showToast(`Quiz completed! Score: ${score} / ${lesson.quiz.length}`);
      
      // Auto-complete lesson if all or most answers are correct
      if (score === lesson.quiz.length && !Storage.isLessonCompleted(lesson.id)) {
        Storage.toggleLessonCompleted(lesson.id);
      }

      renderSidebar();
      updateProgressUI();
      // Re-render quiz section with results
      const newQuizSection = renderQuizSection(lesson);
      quizSection.replaceWith(newQuizSection);
    });

    retakeBtn.addEventListener('click', () => {
      Storage.clearQuizResult(lesson.id);
      updateProgressUI();
      const resetSection = renderQuizSection(lesson);
      quizSection.replaceWith(resetSection);
      showToast('Quiz reset. You can answer the questions again.');
    });

    actions.appendChild(submitBtn);
    actions.appendChild(retakeBtn);
    quizSection.appendChild(actions);

    return quizSection;
  }

  /* ==========================================================================
     Main Content Router
     ========================================================================== */
  function renderMainContent() {
    if (!state.currentTopicId || !state.currentLessonId) {
      renderEmptyState();
      return;
    }

    const topic = findTopic(state.currentTopicId);
    const lesson = findLesson(state.currentTopicId, state.currentLessonId);

    if (!topic || !lesson) {
      renderEmptyState();
      return;
    }

    renderLesson(topic, lesson);
    try {
      if (typeof window !== 'undefined' && window.scrollTo) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (e) {
      try {
        if (typeof window !== 'undefined' && window.scrollTo) {
          window.scrollTo(0, 0);
        }
      } catch (_) {}
    }
  }

  /* ==========================================================================
     Navigation Controller
     ========================================================================== */
  function navigateTo(topicId, lessonId) {
    state.currentTopicId = topicId;
    state.currentLessonId = lessonId;
    Storage.setLastActive(topicId, lessonId);
    window.location.hash = `topic/${topicId}/lesson/${lessonId}`;
    renderSidebar();
    renderMainContent();
  }

  function handleHashChange() {
    const hash = window.location.hash.replace(/^#/, '');
    const match = hash.match(/^topic\/([^/]+)\/lesson\/([^/]+)$/);
    if (match) {
      const topicId = match[1];
      const lessonId = match[2];
      state.currentTopicId = topicId;
      state.currentLessonId = lessonId;
      Storage.setLastActive(topicId, lessonId);
    } else {
      state.currentTopicId = null;
      state.currentLessonId = null;
    }
    renderSidebar();
    renderMainContent();
  }

  /* ==========================================================================
     Clipboard Copy Utility
     ========================================================================== */
  function copyToClipboard(text, buttonEl) {
    const label = buttonEl.querySelector('.copy-label') || buttonEl;
    const originalText = label.textContent;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(onSuccess).catch(fallbackCopy);
    } else {
      fallbackCopy();
    }

    function fallbackCopy() {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        onSuccess();
      } catch (err) {
        showToast('Unable to copy code to clipboard.');
      }
    }

    function onSuccess() {
      label.textContent = 'Copied!';
      buttonEl.style.borderColor = '#ffffff';
      showToast('Code copied to clipboard');
      setTimeout(() => {
        label.textContent = originalText;
        buttonEl.style.borderColor = '';
      }, 2000);
    }
  }

  /* ==========================================================================
     Mobile Sidebar Controls
     ========================================================================== */
  function openMobileSidebar() {
    state.sidebarOpen = true;
    if (elements.sidebar) elements.sidebar.classList.add('is-open');
    if (elements.sidebarBackdrop) elements.sidebarBackdrop.classList.add('is-open');
  }

  function closeMobileSidebar() {
    state.sidebarOpen = false;
    if (elements.sidebar) elements.sidebar.classList.remove('is-open');
    if (elements.sidebarBackdrop) elements.sidebarBackdrop.classList.remove('is-open');
  }

  /* ==========================================================================
     Reset Progress Modal Controls
     ========================================================================== */
  function openResetModal() {
    if (elements.resetModal) elements.resetModal.classList.add('is-active');
  }

  function closeResetModal() {
    if (elements.resetModal) elements.resetModal.classList.remove('is-active');
  }

  function confirmResetProgress() {
    Storage.resetAllProgress();
    closeResetModal();
    updateProgressUI();
    renderSidebar();
    renderMainContent();
    showToast('All progress and quiz records have been reset.');
  }

  /* ==========================================================================
     HTML Escaping Security Utility
     ========================================================================== */
  function escapeHtml(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /* ==========================================================================
     Public Course API (Ready for user to provide topics)
     ========================================================================== */
  window.COURSE_DATA = COURSE_DATA;

  window.loadCourseData = function (data) {
    if (data && Array.isArray(data.topics)) {
      COURSE_DATA.topics = data.topics;
      if (data.title) COURSE_DATA.title = data.title;
      renderSidebar();
      updateProgressUI();
      renderMainContent();
      return true;
    }
    console.error('Invalid course data structure provided');
    return false;
  };

  window.addTopic = function (topicObj) {
    if (topicObj && topicObj.id && topicObj.title) {
      COURSE_DATA.topics.push(topicObj);
      renderSidebar();
      updateProgressUI();
      return true;
    }
    return false;
  };

  window.clearCourseData = function () {
    COURSE_DATA.topics = [];
    state.currentTopicId = null;
    state.currentLessonId = null;
    window.location.hash = '';
    renderSidebar();
    updateProgressUI();
    renderMainContent();
  };

  /* ==========================================================================
     Event Listeners & Initialization
     ========================================================================== */
  function initEventListeners() {
    // Search input
    if (elements.searchInput) {
      elements.searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        renderSidebar();
      });
    }

    // Keyboard shortcut '/' to search
    window.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement !== elements.searchInput) {
        e.preventDefault();
        if (elements.searchInput) {
          elements.searchInput.focus();
        }
      } else if (e.key === 'Escape') {
        closeResetModal();
        closeMobileSidebar();
      }
    });

    // Mobile menu toggle
    if (elements.mobileMenuBtn) {
      elements.mobileMenuBtn.addEventListener('click', () => {
        if (state.sidebarOpen) {
          closeMobileSidebar();
        } else {
          openMobileSidebar();
        }
      });
    }

    if (elements.sidebarBackdrop) {
      elements.sidebarBackdrop.addEventListener('click', closeMobileSidebar);
    }

    // Theme mode toggle triggers
    if (elements.themeLightBtn) {
      elements.themeLightBtn.addEventListener('click', () => {
        Theme.apply('light', true);
      });
    }
    if (elements.themeDarkBtn) {
      elements.themeDarkBtn.addEventListener('click', () => {
        Theme.apply('dark', true);
      });
    }

    // Reset Progress modal triggers
    if (elements.resetBtn) {
      elements.resetBtn.addEventListener('click', openResetModal);
    }
    if (elements.modalCancelBtn) {
      elements.modalCancelBtn.addEventListener('click', closeResetModal);
    }
    if (elements.modalConfirmBtn) {
      elements.modalConfirmBtn.addEventListener('click', confirmResetProgress);
    }

    // Brand logo returns to curriculum overview
    const brandLink = document.getElementById('brand-link');
    if (brandLink) {
      brandLink.addEventListener('click', (e) => {
        e.preventDefault();
        state.currentTopicId = null;
        state.currentLessonId = null;
        window.location.hash = '';
        renderSidebar();
        renderMainContent();
      });
    }

    // Hash navigation listener
    window.addEventListener('hashchange', handleHashChange);
  }

  function initApp() {
    try {
      Theme.init();
      initEventListeners();
      updateProgressUI();

      // Check if initial hash exists or restore last active
      const hash = (window.location && window.location.hash) ? window.location.hash.replace(/^#/, '') : '';
      const match = hash.match(/^topic\/([^/]+)\/lesson\/([^/]+)$/);

      if (match) {
        state.currentTopicId = match[1];
        state.currentLessonId = match[2];
      } else {
        const last = Storage.getLastActive();
        if (last && findLesson(last.topicId, last.lessonId)) {
          state.currentTopicId = last.topicId;
          state.currentLessonId = last.lessonId;
          try {
            window.location.hash = `topic/${last.topicId}/lesson/${last.lessonId}`;
          } catch (_) {}
        }
      }

      renderSidebar();
      renderMainContent();
    } catch (err) {
      console.error('Fatal initialization error in Java Learning Platform:', err);
    }
  }

  // Boot on DOM ready
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initApp);
    } else {
      initApp();
    }
  }
})();
