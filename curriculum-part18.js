/**
 * Java Curriculum Module - Part 18
 * Topics:
 * 35. Java Debugging
 * 36. Java Exceptions
 * 
 * 100% Offline, Pure JavaScript. Complete educational content with full bilingual (English & Arabic) explanations.
 */

(function () {
  'use strict';

  window.JAVA_TOPICS_PART18 = [
    /* ==========================================================================
       TOPIC 35: Java Debugging
       ========================================================================== */
    {
      id: "java-debugging",
      title: "35. Java Debugging",
      description: "Mastering Java Debugging: Systematic troubleshooting, stack trace anatomy, conditional breakpoints, step over/into/out, JVM flags, thread dumps, and diagnostic logging.",
      lessons: [
        {
          id: "java-debugging-mastery",
          title: "Complete Guide to Java Debugging",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "Systematic Debugging in Java (التنقيح واكتشاف الأخطاء البرمجية في جافا)"
            },
            {
              type: "paragraph",
              text: "Debugging is the systematic process of finding, isolating, and resolving bugs or defects within a software program. In Java, debugging spans from decoding detailed stack traces and using IDE debugging tools (breakpoints, watchpoints, step over/into) to command-line JVM diagnostics (jstack, jmap, jdb) and diagnostic logging frameworks."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "التنقيح (Debugging) هو العملية المنهجية المنظمة لتتبع، وعزل، وتصحيح العيوب البرمجية في الأنظمة. في لغة جافا، يشمل التنقيح قراءة وفك شفرة تتبع المكدس (Stack Trace)، واستخدام أدوات بيئات التطوير (نقاط التوقف Breakpoints، مراقبة المتغيرات Watchpoints، التنقل خطوة بخطوة)، وصولاً إلى أدوات التشخيص المتقدمة لـ JVM مثل jstack و jmap وإطارات تسجيل السجلات المتقدمة."
            },
            {
              type: "paragraph",
              text: "Core Debugging Pillars: 1) Stack Trace Anatomy (Exception name, message, chain of callers, line numbers); 2) Execution Control (Step Into F7, Step Over F8, Step Out Shift+F8, Resume F9); 3) Observability (Inspecting local variables, evaluating expressions on the fly, conditional breakpoints)."
            },

            {
              type: "heading",
              level: 2,
              text: "11 Progressive Code Examples (أمثلة برمجية متدرجة)"
            },

            /* Example 1 */
            {
              type: "heading",
              level: 3,
              text: "Example 1: Decoding a Real Stack Trace (المثال 1: فك شفرة تتبع المكدس وقراءة السطور بدقة)"
            },
            {
              type: "paragraph",
              text: "Learning how to read a stack trace from bottom (originating entry point) to top (exact line of failure)."
            },
            {
              type: "code",
              language: "java",
              filename: "StackTraceAnatomyDemo.java",
              code: `public class StackTraceAnatomyDemo {
    public static void computeDiscount(String customerTier) {
        // Line 4: Failure point if customerTier is null
        if (customerTier.equalsIgnoreCase("GOLD")) {
            System.out.println("20% Discount Applied");
        }
    }

    public static void processOrder(String tier) {
        // Line 11: Middle caller in the stack
        computeDiscount(tier);
    }

    public static void main(String[] args) {
        try {
            // Line 17: Entry point
            processOrder(null);
        } catch (NullPointerException npe) {
            System.out.println("--- PRINTING ANATOMY OF STACK TRACE ---");
            for (StackTraceElement element : npe.getStackTrace()) {
                System.out.printf("Method: %-18s | Class: %-22s | Line: %d%n",
                    element.getMethodName(), element.getClassName(), element.getLineNumber());
            }
        }
    }
}`,
              output: `--- PRINTING ANATOMY OF STACK TRACE ---
Method: computeDiscount    | Class: StackTraceAnatomyDemo  | Line: 4
Method: processOrder       | Class: StackTraceAnatomyDemo  | Line: 11
Method: main               | Class: StackTraceAnatomyDemo  | Line: 17`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "The top element in the stack trace points to the exact file, class, method, and line number where the failure occurred."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "السطر الأول في أعلى تقرير الـ Stack Trace يحدد بدقة اسم الدالة ورقم السطر الفعلي الذي تسبب في سقوط البرنامج."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Diagnostic Printing vs Structured Logging (المثال 2: الطباعة التشخيصية مقابل السجلات المنظمة)"
            },
            {
              type: "paragraph",
              text: "Why System.out.println is insufficient for production and how structured log levels provide observability."
            },
            {
              type: "code",
              language: "java",
              filename: "DiagnosticLoggingDemo.java",
              code: `import java.time.Instant;

public class DiagnosticLoggingDemo {
    enum LogLevel { DEBUG, INFO, WARN, ERROR }

    static void log(LogLevel level, String component, String message) {
        System.out.printf("[%s] [%-5s] [%-12s] %s%n",
            Instant.now(), level, component, message);
    }

    public static void authenticateUser(String username) {
        log(LogLevel.DEBUG, "AuthModule", "Entering authenticateUser for: " + username);
        if (username == null || username.isBlank()) {
            log(LogLevel.WARN, "AuthModule", "Authentication attempted with empty credentials");
            return;
        }
        log(LogLevel.INFO, "AuthModule", "User authenticated successfully: " + username);
    }

    public static void main(String[] args) {
        authenticateUser("");
        authenticateUser("sarah_dev");
    }
}`,
              output: `[2026-09-05T22:50:00Z] [DEBUG] [AuthModule  ] Entering authenticateUser for: 
[2026-09-05T22:50:00Z] [WARN ] [AuthModule  ] Authentication attempted with empty credentials
[2026-09-05T22:50:00Z] [DEBUG] [AuthModule  ] Entering authenticateUser for: sarah_dev
[2026-09-05T22:50:00Z] [INFO ] [AuthModule  ] User authenticated successfully: sarah_dev`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "Structured logs with timestamps, levels (DEBUG/INFO/WARN/ERROR), and module tags make debugging asynchronous or distributed code possible."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "تمنح السجلات المنظمة المزودة بالوقت ومستوى الأهمية (DEBUG / INFO) قدرة هائلة على تتبع سير العمليات في الخوادم الحقيقية."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Simulating Conditional Breakpoints (المثال 3: محاكاة نقاط التوقف المشروطة Conditional Breakpoints)"
            },
            {
              type: "paragraph",
              text: "In IDEs, conditional breakpoints pause execution only when a specific expression is true, avoiding millions of useless pauses."
            },
            {
              type: "code",
              language: "java",
              filename: "ConditionalBreakpointDemo.java",
              code: `public class ConditionalBreakpointDemo {
    public static void main(String[] args) {
        int[] transactionAmounts = { 25, 40, 15, 9999, 30, 80 };

        for (int i = 0; i < transactionAmounts.length; i++) {
            int amount = transactionAmounts[i];

            // In IDE debugger: Set breakpoint on this line with condition: "amount > 5000"
            if (amount > 5000) {
                System.out.printf("[DEBUG WATCH] Anomaly detected at index %d! Value = $%d%n", i, amount);
                // The debugger would pause execution right here for variable inspection
            }
        }
    }
}`,
              output: `[DEBUG WATCH] Anomaly detected at index 3! Value = $9999`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "Conditional breakpoints prevent stepping through thousands of normal loop iterations when tracking down a needle in a haystack."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "توفر نقاط التوقف المشروطة وقتاً هائلاً، حيث توقف التنفيذ فقط عند تحقق شرط معين (مثل رقم شاذ) بدلاً من التوقف في كل دورة."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Programmatic Thread Dump Inspection (المثال 4: استخراج تقرير مسارات التنفيذ Thread Dump برمجياً)"
            },
            {
              type: "paragraph",
              text: "Inspecting all running threads to diagnose deadlocks or unresponsive background tasks."
            },
            {
              type: "code",
              language: "java",
              filename: "ThreadDumpInspectionDemo.java",
              code: `import java.util.Map;

public class ThreadDumpInspectionDemo {
    public static void main(String[] args) {
        Map<Thread, StackTraceElement[]> allThreads = Thread.getAllStackTraces();

        System.out.println("--- ACTIVE JVM THREAD DIAGNOSTIC DUMP ---");
        for (Map.Entry<Thread, StackTraceElement[]> entry : allThreads.entrySet()) {
            Thread t = entry.getKey();
            System.out.printf("Thread: '%s' | State: %s | Daemon: %b%n",
                t.getName(), t.getState(), t.isDaemon());
        }
    }
}`,
              output: `--- ACTIVE JVM THREAD DIAGNOSTIC DUMP ---
Thread: 'main' | State: RUNNABLE | Daemon: false
Thread: 'Reference Handler' | State: RUNNABLE | Daemon: true
Thread: 'Finalizer' | State: WAITING | Daemon: true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "Thread.getAllStackTraces() programmatically captures thread states, equivalent to the command-line 'jstack' tool."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "تتيح هذه الدالة استخراج حالة جميع المسارات النشطة برمجياً لكشف حالات التجمد والتعليق مثل أداة jstack تماماً."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Assertions for Invariant Verification (-ea flag) (المثال 5: استخدام الـ Assertions لفحص الثوابت البرمجية)"
            },
            {
              type: "paragraph",
              text: "Using Java assertions to detect broken assumptions early during test and development stages."
            },
            {
              type: "code",
              language: "java",
              filename: "AssertionVerificationDemo.java",
              code: `public class AssertionVerificationDemo {
    public static double calculateSquareRoot(double value) {
        // Invariant: square root cannot be taken on negative numbers
        assert value >= 0 : "Value cannot be negative! Provided: " + value;
        return Math.sqrt(value);
    }

    public static void main(String[] args) {
        System.out.println("Sqrt(16): " + calculateSquareRoot(16));
        System.out.println("Note: Run with 'java -ea' (enable assertions) to activate assertion checks.");
    }
}`,
              output: `Sqrt(16): 4.0
Note: Run with 'java -ea' (enable assertions) to activate assertion checks.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "Assertions document and enforce internal invariants. They are disabled by default in production for zero performance overhead."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "تستخدم الـ Assertions للتحقق من الفرضيات الداخلية للمطور، وتكون معطلة افتراضياً في بيئة الإنتاج لعدم إبطاء السرعة."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Exception Chaining for Root Cause Analysis (المثال 6: تسلسل الاستثناءات لكشف السبب الجذري Root Cause)"
            },
            {
              type: "paragraph",
              text: "Preserving the original underlying error when wrapping into a high-level business exception."
            },
            {
              type: "code",
              language: "java",
              filename: "ChainedDebuggingDemo.java",
              code: `import java.io.IOException;

public class ChainedDebuggingDemo {
    static void readDatabaseRecord() throws IOException {
        throw new IOException("Connection timed out after 3000ms");
    }

    static void fetchUserProfile() {
        try {
            readDatabaseRecord();
        } catch (IOException ioEx) {
            // WRAP and PRESERVE root cause via constructor
            throw new IllegalStateException("Failed to load user profile", ioEx);
        }
    }

    public static void main(String[] args) {
        try {
            fetchUserProfile();
        } catch (Exception ex) {
            System.out.println("High Level Error: " + ex.getMessage());
            System.out.println("Underlying Cause: " + ex.getCause().getMessage());
        }
    }
}`,
              output: `High Level Error: Failed to load user profile
Underlying Cause: Connection timed out after 3000ms`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "Passing 'ioEx' to the wrapper exception preserves the cause chain, allowing debuggers to see both high-level context and raw root causes."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "تمرير الاستثناء الأصلي للغلاف يتيح للـ Debugger قراءة السبب الجذري الحقيقي وتجنب ضياع تفاصيل الخطأ الأساسي."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Inspecting Runtime Memory and Heap Usage (المثال 7: فحص استهلاك الذاكرة وقت التشغيل)"
            },
            {
              type: "paragraph",
              text: "Using java.lang.Runtime to monitor heap memory allocation during execution."
            },
            {
              type: "code",
              language: "java",
              filename: "MemoryDiagnosticsDemo.java",
              code: `public class MemoryDiagnosticsDemo {
    public static void printMemoryDiagnostics() {
        Runtime runtime = Runtime.getRuntime();
        long totalMemory = runtime.totalMemory() / (1024 * 1024);
        long freeMemory = runtime.freeMemory() / (1024 * 1024);
        long usedMemory = totalMemory - freeMemory;
        long maxMemory = runtime.maxMemory() / (1024 * 1024);

        System.out.printf("[HEAP DIAGNOSTICS] Used: %d MB | Free: %d MB | Total: %d MB | Max Limit: %d MB%n",
            usedMemory, freeMemory, totalMemory, maxMemory);
    }

    public static void main(String[] args) {
        printMemoryDiagnostics();
    }
}`,
              output: `[HEAP DIAGNOSTICS] Used: 3 MB | Free: 247 MB | Total: 250 MB | Max Limit: 4096 MB`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "Monitoring heap consumption programmatically helps pinpoint memory leaks before an OutOfMemoryError strikes."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "مراقبة استهلاك الذاكرة برمجياً يكشف تسريبات الذاكرة (Memory Leaks) ويساعد في تحسين أداء التطبيق."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Method Call Tracing with Stack Walker (Java 9+) (المثال 8: تتبع مسار الاستدعاءات باستخدام StackWalker الحديث)"
            },
            {
              type: "paragraph",
              text: "Using StackWalker for efficient, low-overhead inspection of the calling method."
            },
            {
              type: "code",
              language: "java",
              filename: "StackWalkerDemo.java",
              code: `public class StackWalkerDemo {
    public static void auditedServiceMethod() {
        // Retrieve caller information cleanly
        StackWalker walker = StackWalker.getInstance(StackWalker.Option.RETAIN_CLASS_REFERENCE);
        String callerMethod = walker.walk(frames ->
            frames.skip(1) // Skip auditedServiceMethod itself
                  .findFirst()
                  .map(f -> f.getClassName() + "#" + f.getMethodName())
                  .orElse("Unknown")
        );

        System.out.println("[AUDIT TRAIL] Invoked from caller: " + callerMethod);
    }

    public static void billingWorkflow() {
        auditedServiceMethod();
    }

    public static void main(String[] args) {
        billingWorkflow();
    }
}`,
              output: `[AUDIT TRAIL] Invoked from caller: StackWalkerDemo#billingWorkflow`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "Java 9 introduced StackWalker, providing lazy, memory-efficient inspection of caller stack frames without generating expensive full stack dumps."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "وفرت جافا 9 أداة StackWalker لفحص إطارات الاستدعاء بخفة وسرعة دون إرهاق الذاكرة بإنشاء كائنات استثناء كاملة."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Debugging Deadlocks between Two Synchronized Resources (المثال 9: اكتشاف وتشخيص حالة القفل المميت Deadlock)"
            },
            {
              type: "paragraph",
              text: "Understanding how circular lock ordering causes threads to freeze indefinitely."
            },
            {
              type: "code",
              language: "java",
              filename: "DeadlockDetectionPattern.java",
              code: `import java.lang.management.ManagementFactory;
import java.lang.management.ThreadMXBean;

public class DeadlockDetectionPattern {
    public static void detectDeadlocks() {
        ThreadMXBean bean = ManagementFactory.getThreadMXBean();
        long[] deadlockedThreadIds = bean.findDeadlockedThreads();

        if (deadlockedThreadIds != null && deadlockedThreadIds.length > 0) {
            System.out.println("[ALERT] Deadlock detected! Number of blocked threads: " + deadlockedThreadIds.length);
        } else {
            System.out.println("[HEALTH OK] No circular thread deadlocks detected.");
        }
    }

    public static void main(String[] args) {
        detectDeadlocks();
    }
}`,
              output: `[HEALTH OK] No circular thread deadlocks detected.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "ThreadMXBean can programmatically find deadlocked threads that are blocked waiting for object monitors."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "تتيح واجهة ThreadMXBean اكتشاف حالات القفل الميت Deadlock برمجياً عندما تنتظر مسارات متعددة بعضها البعض دون نهاية."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Remote Debugging JVM Configuration (-agentlib:jdwp) (المثال 10: إعدادات التنقيح عن بُعد في خوادم الإنتاج)"
            },
            {
              type: "paragraph",
              text: "How enterprise Java applications are configured to accept IDE debugging connections on remote servers."
            },
            {
              type: "code",
              language: "java",
              filename: "RemoteDebugGuide.java",
              code: `public class RemoteDebugGuide {
    public static void main(String[] args) {
        System.out.println("=== HOW TO ENABLE REMOTE JVM DEBUGGING ===");
        System.out.println("Launch command for remote server:");
        System.out.println("  java -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005 -jar app.jar");
        System.out.println();
        System.out.println("Flags breakdown:");
        System.out.println("  transport=dt_socket : Uses TCP/IP socket communication");
        System.out.println("  server=y            : Listens for incoming IDE connections");
        System.out.println("  suspend=n           : Starts application immediately without waiting");
        System.out.println("  address=*:5005      : Listens on port 5005 on all network interfaces");
    }
}`,
              output: `=== HOW TO ENABLE REMOTE JVM DEBUGGING ===
Launch command for remote server:
  java -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005 -jar app.jar

Flags breakdown:
  transport=dt_socket : Uses TCP/IP socket communication
  server=y            : Listens for incoming IDE connections
  suspend=n           : Starts application immediately without waiting
  address=*:5005      : Listens on port 5005 on all network interfaces`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "The JDWP (Java Debug Wire Protocol) agent enables developers to connect their local IDE to a running staging server."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "بروتوكول JDWP يسمح للمطور بربط بيئة التطوير (IntelliJ / Eclipse) مع خادم سحابي شغال والتنقل في الكود خطوة بخطوة."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Production Diagnostic Watchdog with Performance Timing (المثال 11: مراقب تشخيصي مؤسسي مع قياس الأداء)"
            },
            {
              type: "paragraph",
              text: "Advanced: Building a high-precision performance execution timer to identify slow method bottlenecks."
            },
            {
              type: "code",
              language: "java",
              filename: "PerformanceProfilerMaster.java",
              code: `public class PerformanceProfilerMaster {
    @FunctionalInterface
    interface DebuggableTask {
        void execute() throws Exception;
    }

    public static void profile(String taskName, long warnThresholdMs, DebuggableTask task) {
        long startNanos = System.nanoTime();
        try {
            task.execute();
        } catch (Exception e) {
            System.err.printf("[PROFILE EXCEPTION] Task '%s' failed: %s%n", taskName, e.getMessage());
        } finally {
            long durationMs = (System.nanoTime() - startNanos) / 1_000_000;
            if (durationMs > warnThresholdMs) {
                System.out.printf("[SLOW OPERATION WARN] Task '%s' took %d ms (Threshold: %d ms)%n",
                    taskName, durationMs, warnThresholdMs);
            } else {
                System.out.printf("[PROFILE OK] Task '%s' completed in %d ms%n", taskName, durationMs);
            }
        }
    }

    public static void main(String[] args) {
        profile("DatabaseQuerySimulation", 50, () -> {
            // Simulate quick operation
            Thread.sleep(15);
        });

        profile("PaymentGatewayCall", 30, () -> {
            // Simulate slow network roundtrip exceeding threshold
            Thread.sleep(85);
        });
    }
}`,
              output: `[PROFILE OK] Task 'DatabaseQuerySimulation' completed in 15 ms
[SLOW OPERATION WARN] Task 'PaymentGatewayCall' took 85 ms (Threshold: 30 ms)`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "High-precision profiling watchdogs automatically flag methods that exceed latency SLAs, serving as an automated debugging aid."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "يقوم المراقب الزمني باحتساب ملي الثواني بدقة والتنبيه الفوري عندما تتأخر أي دالة عن الحد الزمني المسموح به."
            },

            /* Common Mistakes & Important Notes */
            {
              type: "heading",
              level: 2,
              text: "Common Mistakes & Important Notes (أخطاء شائعة وملاحظات مهمة)"
            },
            {
              type: "list",
              ordered: false,
              items: [
                "Mistake 1: Relying solely on 'System.out.println' statements scattered across code, which are messy, slow, unformatted, and hard to clean up before merging.",
                "خطأ 1: الاعتماد الكلي على طباعة System.out العشوائية بدلاً من استخدام أدوات التنقيح والسجلات المنظمة.",
                "Mistake 2: Reading the stack trace from the bottom instead of starting from the top where the actual line number of the failure is specified.",
                "خطأ 2: قراءة تقرير الـ Stack Trace من الأسفل وإهمال السطر العلوي الذي يحمل رقم السطر المتسبب في المشكلة.",
                "Mistake 3: Leaving remote debugging ports (like 5005) open and exposed to the public Internet, posing severe security risks."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Diagnostic Failure Sentinel (التحدي العملي: حارس التشخيص واستخراج الخطأ)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Write a utility method 'inspectFailure(Throwable t)': 1) Extract and print the simple class name of the exception and its message; 2) Print the top stack trace element (Class, Method, and Line Number); 3) If t.getCause() is not null, print the root cause details; 4) In main(), trigger a chained exception and pass it to your utility."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: اكتب دالة inspectFailure(Throwable t): 1) استخرج واطبع اسم فئة الخطأ ورسالته؛ 2) اطبع العنصر الأول في تتبع المكدس (الفئة، الدالة، رقم السطر)؛ 3) إذا كان الخطأ مغلفاً لخطأ آخر، اطبع بيانات السبب الجذري Root Cause؛ 4) في main ارمِ استثناءً متسلسلاً واختبر الدالة."
            },
            {
              type: "code",
              language: "java",
              filename: "FailureInspectionChallenge.java",
              code: `public class FailureInspectionChallenge {
    public static void inspectFailure(Throwable t) {
        System.out.println("=== DIAGNOSTIC INSPECTOR ===");
        System.out.println("Exception: " + t.getClass().getSimpleName() + " | Message: " + t.getMessage());

        StackTraceElement[] frames = t.getStackTrace();
        if (frames.length > 0) {
            StackTraceElement top = frames[0];
            System.out.printf("Failure Point: %s.%s() at line %d%n",
                top.getClassName(), top.getMethodName(), top.getLineNumber());
        }

        if (t.getCause() != null) {
            System.out.println("Root Cause: " + t.getCause().getClass().getSimpleName() +
                               " -> " + t.getCause().getMessage());
        }
    }

    public static void main(String[] args) {
        try {
            NumberFormatException root = new NumberFormatException("Invalid price token: 'abc'");
            throw new IllegalArgumentException("Payment calculation aborted", root);
        } catch (IllegalArgumentException ex) {
            inspectFailure(ex);
        }
    }
}`,
              output: `=== DIAGNOSTIC INSPECTOR ===
Exception: IllegalArgumentException | Message: Payment calculation aborted
Failure Point: FailureInspectionChallenge.main() at line 20
Root Cause: NumberFormatException -> Invalid price token: 'abc'`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "The inspectFailure method cleanly unpacks the exception envelope, highlighting line numbers and underlying chained causes."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "قامت الدالة باستخراج بيانات الخطأ والسطر المسبب له بدقة، بالإضافة إلى كشف الخطأ الجذري المتسلسل بسلاسة."
            }
          ],
          quiz: [
          {
                    "id": "q1",
                    "question": "In an IDE debugger (like IntelliJ IDEA or Eclipse), what is the fundamental difference between 'Step Over' and 'Step Into'?\n(في مصحح الأخطاء Debugger، ما هو الفرق الجوهري بين خطوة للأمام 'Step Over' والدخول في الدالة 'Step Into'؟)",
                    "options": [
                              "Step Over restarts the JVM; Step Into pauses execution.",
                              "Step Over executes the current line (including any method calls on it) and pauses at the next line of the current method; Step Into jumps inside the method called on that line to inspect its first statement.",
                              "Step Over is for loops; Step Into is for if-statements.",
                              "Step Into executes the entire program until the end."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! 'Step Over' executes the current statement as a single atomic unit and pauses at the next line in the current method. 'Step Into' steps inside the invoked method's body so you can debug its internal lines line-by-line. (أمر Step Over ينفذ السطر الحالي بالكامل بما فيه من دوال وينتقل للسطر التالي، بينما Step Into يدخل إلى داخل الدالة المستدعاة لتفحص أسطرها تفصيلياً)."
          },
          {
                    "id": "q2",
                    "question": "When inspecting the following Java stack trace, which line indicates the root method call that DIRECTLY triggered the exception?\n\nException in thread \"main\" java.lang.NullPointerException: Cannot invoke \"String.trim()\"\n    at com.example.service.UserService.formatName(UserService.java:42)\n    at com.example.service.UserService.register(UserService.java:18)\n    at com.example.app.MainApp.main(MainApp.java:12)",
                    "options": [
                              "MainApp.java:12",
                              "UserService.java:18",
                              "UserService.java:42",
                              "com.example.service"
                    ],
                    "correctIndex": 2,
                    "explanation": "Correct! In a Java stack trace, frames are ordered from the top (the point where the exception was actually thrown) down to the bottom (the entry point of the thread, e.g. main). UserService.java:42 is where trim() was called on a null reference. (في تقرير تتبع المكدس Stack Trace يمثل السطر العلوي النقطة المباشرة التي انفجر فيها الخطأ، وهنا هو السطر 42 في UserService)."
          },
          {
                    "id": "q3",
                    "question": "What is a 'Conditional Breakpoint' and when is it most effective?\n(ما هي 'نقطة التوقف المشروطة' Conditional Breakpoint ومتى تكون أكثر فاعلية؟)",
                    "options": [
                              "A breakpoint that only pauses execution on Mondays.",
                              "A breakpoint that only pauses thread execution when a specified boolean expression evaluates to true (e.g., customerId.equals(\"C-9988\")), ideal for debugging specific corner cases inside large loops.",
                              "A breakpoint that automatically fixes compiler errors.",
                              "A breakpoint that converts exceptions into logs."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! A conditional breakpoint evaluates an expression each time the execution reaches that line. It only pauses the program when the condition is met, preventing the developer from having to manually step through thousands of loop iterations to reach an anomalous state. (نقطة التوقف المشروطة لا توقف البرنامج إلا إذا تحقق شرط معين، مما يوفر الوقت الهائل عند تتبع خطأ يحدث مع عنصر محدد داخل حلقة تدور آلاف المرات)."
          },
          {
                    "id": "q4",
                    "question": "What does the debugger command 'Step Out' (or 'Step Return') do?\n(ما الذي يفعله أمر 'Step Out' في مصحح الأخطاء؟)",
                    "options": [
                              "It exits the IDE and shuts down the computer.",
                              "It executes the remainder of the currently executing method and returns control to the caller, pausing immediately at the line following the method invocation.",
                              "It skips the next 10 lines of code without executing them.",
                              "It resets all variables to zero."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! 'Step Out' finishes executing the remaining statements of the current method and pauses immediately back in the calling method at the return point. (يقوم أمر Step Out بإكمال تنفيذ ما تبقى من الدالة الحالية والعودة فوراً للمكان الذي استدعاها والتوقف عنده)."
          },
          {
                    "id": "q5",
                    "question": "Consider this code being debugged:\n\nint total = 0;\nfor (int i = 0; i <= 5; i++) {\n    total += i;\n}\nSystem.out.println(total);\n\nIf a breakpoint is placed on line 'total += i;', what is the value of 'total' during the iteration when 'i' equals 3 BEFORE line 'total += i;' executes?",
                    "options": [
                              "0",
                              "3 (from 0 + 1 + 2)",
                              "6",
                              "15"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! In previous iterations (i = 0, i = 1, i = 2), total accumulated: 0 + 0 = 0, 0 + 1 = 1, 1 + 2 = 3. When pausing at the start of iteration i = 3 before adding i, total is currently 3. (قبل تنفيذ سطر الجمع في الدورة الثالثة، كانت قيمة total هي مجموع الدورات السابقة 0 + 1 + 2 = 3)."
          },
          {
                    "id": "q6",
                    "question": "What is an 'Exception Breakpoint' (or 'Method Breakpoint') in an IDE?\n(ما هي 'نقطة توقف الاستثناءات' Exception Breakpoint في بيئة التطوير؟)",
                    "options": [
                              "A breakpoint that deletes the exception class.",
                              "A global debugger trigger configured to pause execution automatically the exact instant a specific exception (e.g. NullPointerException) is instantiated or thrown, anywhere in the codebase.",
                              "A breakpoint that only triggers inside finally blocks.",
                              "A syntax error."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Exception breakpoints pause program execution automatically whenever an instance of the configured exception type is thrown anywhere in the JVM, allowing developers to inspect the exact state without knowing in advance which line causes it. (نقطة توقف الاستثناءات تجعل المصحح يوقف البرنامج تلقائياً في اللحظة والسطر المحددين اللذين يُرمى فيهما استثناء معين دون الحاجة لمعرفة مكانه مسبقاً)."
          },
          {
                    "id": "q7",
                    "question": "Why is 'debugging by System.out.println' (logging to stdout) often inferior to using a real interactive debugger during complex multi-threaded or stateful investigations?\n(لماذا تعتبر طباعة المتغيرات عبر System.out.println أسلوباً ضعيفاً مقارنة بالمصحح التفاعلي في المشاكل المعقدة؟)",
                    "options": [
                              "Because System.out.println requires an internet connection.",
                              "It requires modifying source code, recompiling, redeploying, can mask timing-dependent concurrency bugs (Heisenbugs) due to I/O synchronization, and cannot inspect full heap object graphs or evaluate live expressions.",
                              "Because println is disabled in production.",
                              "Because println can only print numbers."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Printline debugging alters code, alters execution timing (often hiding race conditions or deadlocks because System.out is synchronized), and requires repeated recompilation. An interactive debugger allows dynamic variable inspection, expression evaluation, and call stack navigation without touching code. (تعديل الكود لإضافة الطباعة يتطلب إعادة بناء ويغير التوقيت الزمني للمسارات مما يخفي أخطاء التزامن الحقيقية ولا يتيح فحص الذاكرة بحرية)."
          },
          {
                    "id": "q8",
                    "question": "What does the debugger's 'Evaluate Expression' (or Watch window) feature allow a developer to do while paused at a breakpoint?\n(ما الذي تتيحه ميزة 'تقييم التعبيرات' Evaluate Expression للمطور أثناء توقف البرنامج في نقطة توقف؟)",
                    "options": [
                              "Change the CPU clock speed.",
                              "Execute arbitrary Java expressions, method calls, and queries against currently in-scope variables in real-time to inspect hypothetical outcomes without modifying source code.",
                              "Decompile third-party libraries.",
                              "Format the source code."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! The Evaluate Expression tool lets you type and execute any valid Java code using the current thread's variables and context, allowing you to test predicates, inspect collections, or invoke methods interactively while paused. (تتيح نافذة Evaluate Expression تشغيل أي معادلة أو دالة على المتغيرات الحالية في الذاكرة فوراً لمعرفة نتائجها وتجربة الحلول دون إعادة تشغيل البرنامج)."
          },
          {
                    "id": "q9",
                    "question": "Consider this faulty binary search logic:\n\nint low = 0;\nint high = array.length - 1;\nwhile (low <= high) {\n    int mid = (low + high) / 2; // Line 4\n    // ... search logic ...\n}\n\nWhat subtle integer overflow bug can occur on Line 4 when debugging with very large arrays (e.g. 2 billion elements)?",
                    "options": [
                              "array.length throws a NullPointerException.",
                              "If (low + high) exceeds Integer.MAX_VALUE (2,147,483,647), it overflows into a negative integer, causing mid to become negative and throwing an ArrayIndexOutOfBoundsException.",
                              "The division by 2 always rounds up.",
                              "Integer variables cannot be divided in loops."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! The classic binary search overflow bug: when low + high exceeds 2^31 - 1, the sum rolls over to a negative number, producing a negative index and an immediate ArrayIndexOutOfBoundsException. The correct formula is 'low + (high - low) / 2' or 'low + high >>> 1'. (خطأ فيض الأعداد الكلاسيكي في البحث الثنائي: جمع low و high في المصفوفات العملاقة يتجاوز الحد الأقصى للأعداد فيتحول إلى سالب مسبباً ArrayIndexOutOfBoundsException)."
          },
          {
                    "id": "q10",
                    "question": "What is a 'Heisenbug' in software engineering and debugging?\n(ما هو 'Heisenbug' في هندسة البرمجيات وتصحيح الأخطاء؟)",
                    "options": [
                              "A bug that only occurs when the compiler version is odd.",
                              "A defect that disappears or alters its behavior when an attempt is made to observe or debug it (e.g., adding print statements or debugger pauses changes thread race timing, making the bug vanish).",
                              "A bug caused by a physical hardware failure in the CPU.",
                              "A syntax error."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Named after Werner Heisenberg's uncertainty principle, a Heisenbug is a bug (frequently in concurrent code) that disappears or changes behavior whenever you attach a debugger or add logging, because the observation mechanism changes thread interleaving. (هو خطأ برمجي يختفي أو يتغير سلوكه بمجرد محاولة مراقبته أو وضع نقاط توقف بسبب تأثير ذلك على التوقيت الزمني الدقيق لتداخل المسارات المتزامنة)."
          },
          {
                    "id": "q11",
                    "question": "You are debugging an application and hit a breakpoint inside a method. You want to change the value of a variable 'retryCount' from 3 to 0 right now in memory without restarting. Is this possible in modern Java debuggers?",
                    "options": [
                              "No, Java variables are completely immutable once allocated on the stack.",
                              "Yes, using the 'Set Value' feature in the Debugger Variables view, you can modify live values of primitives and reference assignments directly in memory for the active stack frame.",
                              "Only if the variable was declared with the 'volatile' keyword.",
                              "Only by recompiling the entire operating system."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Modern Java debuggers (using the JVM Tool Interface / JVMTI) allow you to right-click any local variable in the Variables pane and choose 'Set Value' to alter its value in the active stack frame on the fly. (تتيح بيئات التطوير الحديثة عبر بروتوكول JVMTI تعديل قيم المتغيرات الحية مباشرة في الذاكرة أثناء التوقف دون الحاجة لإعادة تشغيل التطبيق)."
          },
          {
                    "id": "q12",
                    "question": "What does the 'Drop to Frame' (or 'Reset Frame') feature in a debugger do?\n(ما الذي يفعله أمر 'Drop to Frame' في مصحح الأخطاء؟)",
                    "options": [
                              "It deletes the class file from the hard drive.",
                              "It pops the current stack frame off the call stack and resets execution back to the beginning of that method, allowing you to re-execute and re-debug the method without restarting the JVM.",
                              "It forces an OutOfMemoryError.",
                              "It terminates the active thread."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! 'Drop Frame' discards the top execution frame from the call stack, restoring the instruction pointer to the beginning of the calling method so you can step through the method again (note: external side effects like DB writes are not rolled back). (يقوم أمر Drop Frame بإسقاط إطار المكدس الحالي والعودة لبداية الدالة لتمكينك من إعادة تتبعها مجدداً دون الحاجة لإعادة تشغيل الخادم بالكامل)."
          },
          {
                    "id": "q13",
                    "question": "Consider this stack trace snippet:\n\nCaused by: java.sql.SQLException: Connection refused: connect\n    at org.postgresql.core.v3.ConnectionFactoryImpl.openConnectionImpl(ConnectionFactoryImpl.java:250)\n    at org.postgresql.Driver.connect(Driver.java:270)\n    ... 18 more\n\nWhat does the '... 18 more' line signify in Java stack traces?",
                    "options": [
                              "There are 18 more errors waiting to be printed.",
                              "It indicates that the remaining 18 frames in this chained exception's stack trace are identical to the bottom 18 frames of the enclosing exception, so the JVM truncates them to avoid redundant output.",
                              "18 threads were killed simultaneously.",
                              "The database failed 18 connection attempts."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! To keep stack traces clean and avoid duplication, the JVM suppresses the common suffix of stack frames that are identical between a causal exception and its parent exception, indicating the count with '... N more'. (يعني هذا السطر أن هناك 18 إطار مكدس مشتركة ومطابقة تماماً للإطارات السابقة في الاستثناء الحاضن، فيختصرها الـ JVM لمنع التكرار المزعج)."
          },
          {
                    "id": "q14",
                    "question": "In a production microservice, which log level should be reserved for unexpected runtime failures that require immediate engineer attention?\n(في الخدمات السحابية للشركات، أي مستوى من مستويات التسجيل Logging يُخصص للأخطاء غير المتوقعة التي تتطلب تدخل المهندس؟)",
                    "options": [
                              "TRACE",
                              "DEBUG",
                              "INFO",
                              "ERROR"
                    ],
                    "correctIndex": 3,
                    "explanation": "Correct! 'ERROR' is the log level designated for unhandled exceptions, downstream dependency failures, and critical processing errors that compromise business transactions and alert monitoring systems (e.g., PagerDuty). (يُخصص مستوى ERROR لتسجيل الانهيارات الحرجة والأخطاء غير المتوقعة التي تمنع إتمام العمليات وتستدعي تنبيه فرق الدعم الفوري)."
          },
          {
                    "id": "q15",
                    "question": "You place a breakpoint inside a critical section protected by 'synchronized (lock)'. When your debugger pauses at this breakpoint, what happens to other threads attempting to acquire that same lock?",
                    "options": [
                              "Other threads ignore the lock and execute the synchronized block anyway.",
                              "Other threads attempting to acquire the lock are blocked in the BLOCKED state, waiting indefinitely until you resume the suspended thread holding the lock.",
                              "The JVM terminates with an IllegalMonitorStateException.",
                              "The lock is automatically released by the debugger."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! The debugger suspends the thread, but the thread STILL HOLDS the intrinsic lock in the JVM. Any other worker threads competing for that lock will block and stall until the paused thread is resumed and releases the monitor. (إيقاف المسار في المصحح لا يحرر القفل؛ بل يظل المسار ممتلكاً له، مما يؤدي لتعليق وتجميد كافة المسارات الأخرى التي تحاول الحصول على نفس القفل)."
          }
]
        }
      ]
    },

    /* ==========================================================================
       TOPIC 36: Java Exceptions
       ========================================================================== */
    {
      id: "java-exceptions",
      title: "36. Java Exceptions",
      description: "Complete Guide to Java Exceptions: Checked vs Unchecked exceptions, RuntimeException, exception propagation, custom exceptions, stack unwinding, and design best practices.",
      lessons: [
        {
          id: "java-exceptions-mastery",
          title: "Complete Guide to Java Exceptions",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "Understanding Java Exceptions (فهم الاستثناءات في لغة جافا)"
            },
            {
              type: "paragraph",
              text: "An Exception in Java is an abnormal event that occurs during the execution of a program, disrupting the normal flow of instructions. When an error condition arises, the JVM creates an Exception object encapsulating error details (type, message, call stack) and hands it to the runtime system (throws it), unwinding the call stack until a matching handler is discovered."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "الاستثناء (Exception) في جافا هو حدث غير طبيعي يقع أثناء تشغيل البرنامج ويقطع التدفق الطبيعي لتنفيذ التعليمات البرمجية. عند وقوع خطأ، ينشئ الـ JVM كائناً يمثل الاستثناء يحتوي على نوع الخطأ ورسالته ومسار استدعائه في المكدس، ثم يرميه (throws) عبر مكدس الاستدعاءات حتى يعثر على كود مخصص لمعالجته، وإن لم يجد يتوقف البرنامج."
            },
            {
              type: "paragraph",
              text: "The Two Great Branches of Exceptions: 1) Checked Exceptions (inherit from Exception but NOT RuntimeException): The compiler enforces either handling with try-catch or declaration with throws (e.g., IOException, SQLException); 2) Unchecked Exceptions (inherit from RuntimeException): Represent programming logic flaws that the compiler does not force you to declare (e.g., NullPointerException, ArithmeticException)."
            },

            {
              type: "heading",
              level: 2,
              text: "11 Progressive Code Examples (أمثلة برمجية متدرجة)"
            },

            /* Example 1 */
            {
              type: "heading",
              level: 3,
              text: "Example 1: Classic Unchecked ArithmeticException (المثال 1: استثناء القسمة على صفر غير المفحوص)"
            },
            {
              type: "paragraph",
              text: "Dividing an integer by zero triggers an unchecked RuntimeException."
            },
            {
              type: "code",
              language: "java",
              filename: "ArithmeticExceptionDemo.java",
              code: `public class ArithmeticExceptionDemo {
    public static void main(String[] args) {
        int numerator = 50;
        int denominator = 0;

        try {
            int result = numerator / denominator;
            System.out.println("Result: " + result);
        } catch (ArithmeticException ex) {
            System.out.println("Intercepted Exception: " + ex.getMessage());
            System.out.println("Exception Type:        " + ex.getClass().getName());
        }
    }
}`,
              output: `Intercepted Exception: / by zero
Exception Type:        java.lang.ArithmeticException`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "ArithmeticException is an unchecked exception. The try-catch block safely intercepts the error, allowing the application to continue running."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "استثناء ArithmeticException غير مفحوص؛ وبفضل بلوك try-catch تم التقاط الخطأ بسلام دون انهيار البرنامج."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Checked vs Unchecked Compiler Rule (المثال 2: قاعدة المترجم بين المفحوص Checked وغير المفحوص)"
            },
            {
              type: "paragraph",
              text: "Checked exceptions MUST be declared with 'throws' or caught; unchecked exceptions do not require this."
            },
            {
              type: "code",
              language: "java",
              filename: "CheckedVsUncheckedDemo.java",
              code: `import java.io.IOException;

public class CheckedVsUncheckedDemo {
    // CHECKED: Compiler FORCES 'throws IOException' declaration
    public static void readSystemFile() throws IOException {
        throw new IOException("Disk read failure");
    }

    // UNCHECKED: Compiler DOES NOT force 'throws'
    public static void validatePositive(int x) {
        if (x < 0) {
            throw new IllegalArgumentException("Number must be positive!");
        }
    }

    public static void main(String[] args) {
        // Checked must be in try-catch or declared
        try {
            readSystemFile();
        } catch (IOException e) {
            System.out.println("Caught Checked Exception:   " + e.getMessage());
        }

        // Unchecked can be called directly
        try {
            validatePositive(-10);
        } catch (IllegalArgumentException e) {
            System.out.println("Caught Unchecked Exception: " + e.getMessage());
        }
    }
}`,
              output: `Caught Checked Exception:   Disk read failure
Caught Unchecked Exception: Number must be positive!`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "Methods throwing checked exceptions will not compile unless callers either catch them or add 'throws' to their own method signatures."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "يرفض المترجم بناء الكود إذا استدعيت دالة ترمي Checked Exception دون وضعها داخل try-catch أو الإعلان عنها بـ throws."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: NullPointerException (The Billion Dollar Mistake) (المثال 3: استثناء المؤشر الفارغ NullPointerException)"
            },
            {
              type: "paragraph",
              text: "Attempting to invoke an instance method or access a field on a null reference."
            },
            {
              type: "code",
              language: "java",
              filename: "NullPointerDemo.java",
              code: `public class NullPointerDemo {
    public static void main(String[] args) {
        String greeting = null;

        try {
            // Invoking method on null reference throws NullPointerException
            int length = greeting.length();
            System.out.println("Length: " + length);
        } catch (NullPointerException npe) {
            System.out.println("Caught NPE: Attempted to dereference null reference!");
        }
    }
}`,
              output: `Caught NPE: Attempted to dereference null reference!`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "NullPointerException occurs when you attempt to use an object reference that points to nothing (null)."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "يحدث خطأ NPE عندما تحاول استدعاء دالة أو قراءة حقل من متغير قيمته فارغة null (لا يشير لكائن حقيقي في الذاكرة)."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: ArrayIndexOutOfBoundsException (المثال 4: استثناء تجاوز حدود المصفوفة)"
            },
            {
              type: "paragraph",
              text: "Accessing an array with an illegal index (negative or >= array.length)."
            },
            {
              type: "code",
              language: "java",
              filename: "ArrayIndexDemo.java",
              code: `public class ArrayIndexDemo {
    public static void main(String[] args) {
        int[] scores = { 95, 88, 92 };

        try {
            int invalidScore = scores[5]; // Valid indices are only 0, 1, 2
            System.out.println("Score: " + invalidScore);
        } catch (ArrayIndexOutOfBoundsException ex) {
            System.out.println("Index Boundary Violation: " + ex.getMessage());
        }
    }
}`,
              output: `Index Boundary Violation: Index 5 out of bounds for length 3`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "Java runtime protects memory integrity by performing bounds checking on every array element access."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "تحمي جافا سلامة الذاكرة بفحص حدود المصفوفات وتمنع القراءة من فهارس خارج الحجم الفعلي للمصفوفة."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Exception Propagation across the Call Stack (المثال 5: انتشار وتدفق الاستثناء عبر مكدس الاستدعاءات)"
            },
            {
              type: "paragraph",
              text: "An unhandled exception unwinds the call stack until it encounters an enclosing catch block."
            },
            {
              type: "code",
              language: "java",
              filename: "ExceptionPropagationDemo.java",
              code: `public class ExceptionPropagationDemo {
    static void level3() {
        System.out.println("Executing level3 - throwing NumberFormatException");
        Integer.parseInt("NOT_A_NUMBER"); // Throws unchecked exception
    }

    static void level2() {
        System.out.println("Entering level2");
        level3();
        System.out.println("Exiting level2 (never reached!)");
    }

    static void level1() {
        System.out.println("Entering level1");
        level2();
    }

    public static void main(String[] args) {
        try {
            level1();
        } catch (NumberFormatException nfe) {
            System.out.println("[HANDLED IN MAIN] Successfully caught propagated exception!");
        }
    }
}`,
              output: `Entering level1
Entering level2
Executing level3 - throwing NumberFormatException
[HANDLED IN MAIN] Successfully caught propagated exception!`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "Because level3, level2, and level1 had no catch blocks, the JVM automatically propagated the exception back up to main()."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "لأن الدوال الفرعية لم تعالج الخطأ، تراجع الـ JVM عبر المكدس تلقائياً حتى التقطته الدالة الرئيسية main."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Creating a Custom Checked Exception (المثال 6: إنشاء استثناء مخصص مفحوص)"
            },
            {
              type: "paragraph",
              text: "Extending 'java.lang.Exception' to represent domain-specific business failure conditions."
            },
            {
              type: "code",
              language: "java",
              filename: "CustomCheckedExceptionDemo.java",
              code: `public class CustomCheckedExceptionDemo {
    // Custom checked exception: extends Exception
    static class InsufficientFundsException extends Exception {
        private final double shortfall;

        public InsufficientFundsException(String message, double shortfall) {
            super(message);
            this.shortfall = shortfall;
        }

        public double getShortfall() { return shortfall; }
    }

    static class BankAccount {
        private double balance = 100.0;

        public void withdraw(double amount) throws InsufficientFundsException {
            if (amount > balance) {
                double deficit = amount - balance;
                throw new InsufficientFundsException("Withdrawal exceeds account balance!", deficit);
            }
            balance -= amount;
        }
    }

    public static void main(String[] args) {
        BankAccount account = new BankAccount();
        try {
            account.withdraw(150.0);
        } catch (InsufficientFundsException ex) {
            System.out.println("Transaction Failed: " + ex.getMessage());
            System.out.printf("Shortfall Amount:   $%.2f%n", ex.getShortfall());
        }
    }
}`,
              output: `Transaction Failed: Withdrawal exceeds account balance!
Shortfall Amount:   $50.00`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "Custom checked exceptions force callers to acknowledge and handle domain-specific errors gracefully."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "وراثة Exception تجعل الخطأ مفحوصاً، مما يلزم أي مستدعي بالتعامل مع نقص الرصيد بشكل صريح ومحدد."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Creating a Custom Unchecked Exception (المثال 7: إنشاء استثناء مخصص غير مفحوص RuntimeException)"
            },
            {
              type: "paragraph",
              text: "Extending 'java.lang.RuntimeException' for clean, modern domain models without verbose checked clutter."
            },
            {
              type: "code",
              language: "java",
              filename: "CustomUncheckedExceptionDemo.java",
              code: `public class CustomUncheckedExceptionDemo {
    // Extends RuntimeException -> Unchecked
    static class EntityNotFoundException extends RuntimeException {
        private final String entityType;
        private final long entityId;

        public EntityNotFoundException(String entityType, long id) {
            super(String.format("Record [%s] with ID %d could not be found", entityType, id));
            this.entityType = entityType;
            this.entityId = id;
        }
    }

    static String findUserById(long id) {
        if (id != 42) {
            throw new EntityNotFoundException("UserProfile", id);
        }
        return "Alex Morgan";
    }

    public static void main(String[] args) {
        try {
            findUserById(99);
        } catch (EntityNotFoundException ex) {
            System.out.println("Lookup Error: " + ex.getMessage());
        }
    }
}`,
              output: `Lookup Error: Record [UserProfile] with ID 99 could not be found`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "Modern frameworks (Spring, Hibernate) favor unchecked exceptions extending RuntimeException to keep interfaces clean."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "تفضل أطر العمل الحديثة (مثل Spring) استخدام استثناءات ترث من RuntimeException لتفادي تكرار عبارات throws."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Method Overriding Exception Rules (المثال 8: قواعد الاستثناءات عند تجاوز الدوال Overriding)"
            },
            {
              type: "paragraph",
              text: "An overriding method cannot throw broader or newer checked exceptions than the superclass method."
            },
            {
              type: "code",
              language: "java",
              filename: "OverridingExceptionRulesDemo.java",
              code: `import java.io.FileNotFoundException;
import java.io.IOException;

public class OverridingExceptionRulesDemo {
    static class BaseService {
        // Superclass declares IOException
        public void execute() throws IOException {
            System.out.println("Base service executing.");
        }
    }

    static class SpecializedService extends BaseService {
        // LEGAL: Can throw narrower subclass exception (FileNotFoundException extends IOException)
        // OR throw fewer/no checked exceptions
        @Override
        public void execute() throws FileNotFoundException {
            System.out.println("Specialized service executing.");
        }
    }

    public static void main(String[] args) {
        BaseService service = new SpecializedService();
        try {
            service.execute();
        } catch (IOException e) {
            System.out.println("Caught exception: " + e.getMessage());
        }
    }
}`,
              output: `Specialized service executing.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "Liskov Substitution Principle: An overridden method can declare the same or narrower checked exceptions, but NEVER broader ones."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "وفق مبدأ Liskov، يجوز للدالة المتجاوزة رمي نفس الاستثناء أو استثناء أضيق منه (فرعي)، ولكن يحرم رمي استثناء أوسع أو جديد."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Standard Java Exception Arsenal (IllegalArgument, IllegalState) (المثال 9: ترسانة الاستثناءات القياسية في جافا)"
            },
            {
              type: "paragraph",
              text: "Preferring established standard exceptions over inventing unnecessary custom classes."
            },
            {
              type: "code",
              language: "java",
              filename: "StandardExceptionsDemo.java",
              code: `public class StandardExceptionsDemo {
    private boolean isConnectionOpen = false;

    public void setRetryAttempts(int attempts) {
        if (attempts < 1) {
            // Standard exception for invalid parameter argument
            throw new IllegalArgumentException("Attempts must be >= 1! Received: " + attempts);
        }
    }

    public void transmitData() {
        if (!isConnectionOpen) {
            // Standard exception when object state is invalid for the operation
            throw new IllegalStateException("Cannot transmit data: Connection is not currently open!");
        }
    }

    public static void main(String[] args) {
        StandardExceptionsDemo client = new StandardExceptionsDemo();

        try {
            client.setRetryAttempts(0);
        } catch (IllegalArgumentException ex) {
            System.out.println("Handled: " + ex.getMessage());
        }

        try {
            client.transmitData();
        } catch (IllegalStateException ex) {
            System.out.println("Handled: " + ex.getMessage());
        }
    }
}`,
              output: `Handled: Attempts must be >= 1! Received: 0
Handled: Cannot transmit data: Connection is not currently open!`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "Effective Java recommends reusing standard JDK exceptions (IllegalArgumentException, IllegalStateException) whenever they accurately fit the situation."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "يوصي كتاب Effective Java بإعادة استخدام استثناءات جافا القياسية مثل IllegalArgument و IllegalState بدلاً من إنشاء فئات مخصصة زائدة."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Stack Trace Suppression via Throwable.addSuppressed() (المثال 10: كبت الاستثناءات الثانوية addSuppressed)"
            },
            {
              type: "paragraph",
              text: "When multiple exceptions occur, suppressed exceptions preserve secondary failures alongside the primary failure."
            },
            {
              type: "code",
              language: "java",
              filename: "SuppressedExceptionDemo.java",
              code: `public class SuppressedExceptionDemo {
    public static void executeOperation() throws Exception {
        Exception primary = new Exception("Primary business calculation failed");
        Exception secondary = new Exception("Secondary cleanup flush failed");

        // Attach secondary exception as suppressed
        primary.addSuppressed(secondary);
        throw primary;
    }

    public static void main(String[] args) {
        try {
            executeOperation();
        } catch (Exception ex) {
            System.out.println("Primary Failure:    " + ex.getMessage());
            for (Throwable suppressed : ex.getSuppressed()) {
                System.out.println("Suppressed Failure: " + suppressed.getMessage());
            }
        }
    }
}`,
              output: `Primary Failure:    Primary business calculation failed
Suppressed Failure: Secondary cleanup flush failed`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "The try-with-resources statement uses addSuppressed() internally so that closing errors don't obscure the original business error."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "تستخدم بنية try-with-resources ميزة addSuppressed لإلحاق أخطاء إغلاق الملفات بالاستثناء الأساسي دون مسحه."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Enterprise Resilient Payment Processor with Exception Pipeline (المثال 11: معالج مدفوعات مؤسسي مرن مع خط معالجة الاستثناءات)"
            },
            {
              type: "paragraph",
              text: "Advanced: An enterprise financial processing pipeline categorizing retryable network exceptions vs non-retryable fraud exceptions."
            },
            {
              type: "code",
              language: "java",
              filename: "PaymentProcessorPipeline.java",
              code: `public class PaymentProcessorPipeline {
    static abstract class PaymentException extends RuntimeException {
        private final boolean retryable;
        PaymentException(String msg, boolean retryable) {
            super(msg);
            this.retryable = retryable;
        }
        public boolean isRetryable() { return retryable; }
    }

    static class NetworkTimeoutPaymentException extends PaymentException {
        NetworkTimeoutPaymentException(String msg) { super(msg, true); }
    }

    static class FraudBlockedPaymentException extends PaymentException {
        FraudBlockedPaymentException(String msg) { super(msg, false); }
    }

    public static void processTransaction(int testCase) {
        if (testCase == 1) throw new NetworkTimeoutPaymentException("Gateway connection timed out");
        if (testCase == 2) throw new FraudBlockedPaymentException("Transaction flagged by anti-fraud AI");
    }

    public static void executeWithPolicy(int testCase) {
        try {
            processTransaction(testCase);
        } catch (PaymentException pe) {
            System.out.printf("[PAYMENT FAILURE] Reason: %s | Can Retry? %b%n",
                pe.getMessage(), pe.isRetryable());
            if (pe.isRetryable()) {
                System.out.println("--> Action: Scheduling exponential backoff retry in 2000ms.");
            } else {
                System.out.println("--> Action: Transaction aborted permanently. Notifying compliance.");
            }
        }
    }

    public static void main(String[] args) {
        System.out.println("Case 1 (Transient Network Glitch):");
        executeWithPolicy(1);

        System.out.println();
        System.out.println("Case 2 (Permanent Fraud Flag):");
        executeWithPolicy(2);
    }
}`,
              output: `Case 1 (Transient Network Glitch):
[PAYMENT FAILURE] Reason: Gateway connection timed out | Can Retry? true
--> Action: Scheduling exponential backoff retry in 2000ms.

Case 2 (Permanent Fraud Flag):
[PAYMENT FAILURE] Reason: Transaction flagged by anti-fraud AI | Can Retry? false
--> Action: Transaction aborted permanently. Notifying compliance.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "Polymorphic business exception hierarchies cleanly separate transient recoverable errors from permanent failures."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "هيكلية الاستثناءات المخصصة تمكن النظام من تمييز الأخطاء القابلة لإعادة المحاولة تلقائياً عن الأخطاء القاطعة والنهائية."
            },

            /* Common Mistakes & Important Notes */
            {
              type: "heading",
              level: 2,
              text: "Common Mistakes & Important Notes (أخطاء شائعة وملاحظات مهمة)"
            },
            {
              type: "list",
              ordered: false,
              items: [
                "Mistake 1: Swallowing exceptions with an empty catch block: 'catch (Exception e) {}'. This hides critical bugs and makes troubleshooting impossible.",
                "خطأ 1: ابتلاع الاستثناءات ببلوك catch فارغ تماماً؛ هذا يخفي المشاكل القاتلة ويجعل تتبع الخطأ مستحيلاً.",
                "Mistake 2: Using exceptions for normal control flow (e.g., catching ArrayIndexOutOfBoundsException to stop a loop instead of checking loop index < length). Exception instantiation is computationally expensive.",
                "خطأ 2: استخدام الاستثناءات للتحكم في تدفق البرنامج العادي بدلاً من الشروط البسيطة؛ فبناء الاستثناء يستهلك موارد المعالج.",
                "Mistake 3: Catching generic Exception or Throwable everywhere instead of catching specific exception types."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Password Strength Validator (التحدي العملي: مدقق قوة كلمة المرور بالاستثناءات)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Create a password validator: 1) Define custom unchecked exception 'WeakPasswordException extends RuntimeException'; 2) Method 'validatePassword(String pwd)': if length < 8, throw WeakPasswordException(\"Password must be at least 8 chars\"); if it lacks a digit, throw WeakPasswordException(\"Password must contain a digit\"); 3) In main(), test with 'short', 'nodigitsallowed', and 'ValidPass1' catching and printing the exception messages."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: صمم مدققاً لكلمات المرور: 1) أنشئ استثناء مخصص WeakPasswordException يرث من RuntimeException؛ 2) دالة validatePassword(String pwd): إذا كان الطول أقل من 8 ارمِ استثناء، وإذا خلت من الأرقام ارمِ استثناء يوضح ذلك؛ 3) في main اختبر كلمات غير صالحة وكلمة صالحة مع طباعة النتيجة."
            },
            {
              type: "code",
              language: "java",
              filename: "PasswordValidatorChallenge.java",
              code: `public class PasswordValidatorChallenge {
    static class WeakPasswordException extends RuntimeException {
        public WeakPasswordException(String message) {
            super(message);
        }
    }

    public static void validatePassword(String password) {
        if (password == null || password.length() < 8) {
            throw new WeakPasswordException("Password too short: Must be at least 8 characters!");
        }
        boolean hasDigit = false;
        for (char c : password.toCharArray()) {
            if (Character.isDigit(c)) {
                hasDigit = true;
                break;
            }
        }
        if (!hasDigit) {
            throw new WeakPasswordException("Password must contain at least one numeric digit [0-9]!");
        }
    }

    public static void test(String pwd) {
        try {
            validatePassword(pwd);
            System.out.println("Password accepted: '" + pwd + "'");
        } catch (WeakPasswordException ex) {
            System.out.println("Validation Rejected: " + ex.getMessage());
        }
    }

    public static void main(String[] args) {
        test("short");
        test("alllettersnoumbers");
        test("StrongPass99");
    }
}`,
              output: `Validation Rejected: Password too short: Must be at least 8 characters!
Validation Rejected: Password must contain at least one numeric digit [0-9]!
Password accepted: 'StrongPass99'`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "Custom exceptions communicate exact validation failures cleanly, preventing corrupted or insecure data from proceeding through the application."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "أوصل الاستثناء المخصص أسباب الرفض بوضوح للمستخدم، ومنع الكلمات الضعيفة من المرور بنجاح."
            }
          ],
          quiz: [
          {
                    "id": "q1",
                    "question": "Which of the following belongs to the UNCHECKED (runtime) exception hierarchy in Java?\n(أي من الاستثناءات التالية يُعد استثناءً غير مفحوص Unchecked في جافا؟)",
                    "options": [
                              "java.io.IOException",
                              "java.sql.SQLException",
                              "java.lang.NullPointerException (which extends RuntimeException)",
                              "java.lang.ClassNotFoundException"
                    ],
                    "correctIndex": 2,
                    "explanation": "Correct! NullPointerException extends java.lang.RuntimeException. All subclasses of RuntimeException (and Error) are UNCHECKED exceptions, meaning the Java compiler does not mandate try-catch or throws clauses for them. (ينحدر NullPointerException من RuntimeException، وتعتبر كافة الفئات المنحدرة منه استثناءات غير مفحوصة لا يلزم المترجم بالتعامل معها صراحة)."
          },
          {
                    "id": "q2",
                    "question": "Consider this code snippet:\n\npublic class MathOp {\n    public static void main(String[] args) {\n        int x = 10;\n        int y = 0;\n        int z = x / y; // Line 5\n        System.out.println(\"Result: \" + z);\n    }\n}\n\nWhat is the result of executing this code?",
                    "options": [
                              "It prints 'Result: Infinity'.",
                              "It throws java.lang.ArithmeticException: / by zero at line 5 and terminates abruptly without printing 'Result:'.",
                              "It prints 'Result: 0'.",
                              "Compile-time error: Division by zero is detected at compilation."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Integer division by zero in Java throws an unchecked java.lang.ArithmeticException at runtime. Because there is no try-catch block, execution halts immediately at line 5 and line 6 is never reached. (قسمة الأعداد الصحيحة على صفر في جافا تؤدي لإطلاق ArithmeticException أثناء التشغيل فوراً ويتوقف البرنامج دون إكمال الطباعة)."
          },
          {
                    "id": "q3",
                    "question": "What is the primary architectural justification for Java's CHECKED exceptions?\n(ما هو التبرير الهيكلي لوجود الاستثناءات المفحوصة Checked Exceptions في جافا؟)",
                    "options": [
                              "To make Java programs compile slower.",
                              "To enforce compile-time contracts for anticipating, documenting, and recovering from predictable external environmental failures (such as missing files, network drops, or database errors).",
                              "To prevent developers from using null.",
                              "Because checked exceptions run directly in hardware."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Checked exceptions represent foreseeable conditions outside the immediate control of the code (e.g. file missing, socket disconnected) where a robust application can reasonably be expected to recover or notify the user. The compiler enforces that they are either caught or declared in throws. (تمثل الاستثناءات المفحوصة ظروفاً بيئية خارجية متوقعة الحدوث مثل انقطاع الشبكة أو فقدان ملف، ويجبر المترجم المبرمج على معالجتها لضمان استقرار التطبيق)."
          },
          {
                    "id": "q4",
                    "question": "What will happen when compiling and executing the following method?\n\nimport java.io.FileReader;\npublic class ReaderApp {\n    public static void openFile() {\n        FileReader fr = new FileReader(\"data.txt\"); // Throws FileNotFoundException\n    }\n}",
                    "options": [
                              "It compiles and runs successfully, returning null if the file does not exist.",
                              "Compile-time error: 'unreported exception java.io.FileNotFoundException; must be caught or declared to be thrown'.",
                              "It compiles but throws an unchecked NullPointerException at runtime.",
                              "It creates an empty file named data.txt automatically."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! FileReader constructor declares 'throws FileNotFoundException', which is a checked exception. The caller must either enclose it in a try-catch block or declare 'throws FileNotFoundException' in the method signature, otherwise the Java compiler generates an error. (منشئ FileReader يعلن عن استثناء مفحوص FileNotFoundException، ويؤدي عدم معالجته بـ try-catch أو إعلانه بـ throws إلى خطأ تصريف compile-time error)."
          },
          {
                    "id": "q5",
                    "question": "What exception is thrown by the following code?\n\nString text = \"123A\";\nint value = Integer.parseInt(text);",
                    "options": [
                              "java.lang.ClassCastException",
                              "java.lang.NumberFormatException (subclass of IllegalArgumentException)",
                              "java.lang.NullPointerException",
                              "java.lang.ArithmeticException"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Integer.parseInt() expects characters representing valid decimal digits. When it encounters the non-digit character 'A', it throws java.lang.NumberFormatException, which is an unchecked exception extending IllegalArgumentException. (ترمي الدالة parseInt استثناء NumberFormatException عندما يحتوي النص على حروف غير رقمية لا يمكن تحويلها لعدد صحيح)."
          },
          {
                    "id": "q6",
                    "question": "What happens when executing the following array operation?\n\nint[] scores = { 90, 85, 78 };\nSystem.out.println(scores[3]);",
                    "options": [
                              "It prints 0.",
                              "It prints null.",
                              "It throws java.lang.ArrayIndexOutOfBoundsException: Index 3 out of bounds for length 3.",
                              "It resizes the array automatically to length 4."
                    ],
                    "correctIndex": 2,
                    "explanation": "Correct! Array indices in Java are zero-based (0 to length - 1). For an array of length 3, valid indices are 0, 1, and 2. Accessing index 3 throws ArrayIndexOutOfBoundsException at runtime. (فهارس المصفوفات في جافا تبدأ من 0 حتى length - 1؛ لذا فإن الوصول للعنصر ذي الفهرس 3 في مصفوفة طولها 3 يرمي استثناء ArrayIndexOutOfBoundsException)."
          },
          {
                    "id": "q7",
                    "question": "What is printed by this code?\n\npublic class ExceptionFlow {\n    public static void main(String[] args) {\n        try {\n            System.out.print(\"A \");\n            String s = null;\n            s.toUpperCase(); // Throws NPE\n            System.out.print(\"B \");\n        } catch (NullPointerException e) {\n            System.out.print(\"C \");\n        }\n        System.out.println(\"D\");\n    }\n}",
                    "options": [
                              "A B C D",
                              "A C D",
                              "A B D",
                              "A C"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! 'A ' is printed. Then s.toUpperCase() throws NullPointerException, causing control to jump immediately to the matching catch block, skipping 'B '. The catch block prints 'C '. After the try-catch finishes, execution proceeds normally, printing 'D'. Output: 'A C D'. (يُطبع A ثم يقفز التنفيذ فوراً عند وقوع NPE متخطياً B إلى بلوك catch الذي يطبع C، ثم يكتمل البرنامج طبيعياً ويطبع D)."
          },
          {
                    "id": "q8",
                    "question": "What is the purpose of 'Exception Chaining' (wrapping an original exception inside a new one)?\n(ما هو الهدف من ربط وسلسلة الاستثناءات Exception Chaining في جافا؟)",
                    "options": [
                              "To make the code execute twice as fast.",
                              "To translate a low-level technical exception (e.g. SQLException) into a high-level business exception (e.g. PaymentProcessingException) while preserving the original cause and stack trace for debugging via getCause().",
                              "To erase the stack trace completely.",
                              "To convert checked exceptions into checked errors."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Exception chaining allows high-level architectural layers to present clean, meaningful domain abstractions without losing the low-level technical root cause. Passing the underlying exception to the constructor (e.g., new ServiceException(\"Failed\", sqlEx)) retains the causal chain accessible via e.getCause(). (يتيح تغليف الاستثناءات الحفاظ على السبب الجذري والمسار التقني للخطأ الأصلي مع تقديم رسالة وظيفية معبرة لطبقات التطبيق العليا)."
          },
          {
                    "id": "q9",
                    "question": "Which of the following represents an IllegalArgumentException vs an IllegalStateException?\n(ما هو الفرق بين IllegalArgumentException و IllegalStateException في جافا؟)",
                    "options": [
                              "They are identical and can be used interchangeably in all situations.",
                              "IllegalArgumentException indicates an invalid parameter was passed to a method (e.g., negative percentage); IllegalStateException indicates the object's current lifecycle state is invalid for the requested operation (e.g., reading from an already closed Stream or Connection).",
                              "IllegalArgumentException is checked; IllegalStateException is unchecked.",
                              "IllegalStateException can only be thrown by the JVM garbage collector."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! IllegalArgumentException signals that an argument violates method preconditions. IllegalStateException signals that the arguments may be valid, but the target object is not in the appropriate state to perform the invocation (e.g. calling iterator.remove() before next()). (الأول يعبر عن تمرير معامل غير صالح للدالة، بينما الثاني يعبر عن استدعاء دالة على كائن في حالة غير مناسبة لتنفيذها مثل القراءة من اتصال مغلق)."
          },
          {
                    "id": "q10",
                    "question": "What exception occurs when executing the following type cast?\n\nObject obj = Integer.valueOf(42);\nString str = (String) obj;",
                    "options": [
                              "java.lang.IllegalArgumentException",
                              "java.lang.ClassCastException: class java.lang.Integer cannot be cast to class java.lang.String",
                              "java.lang.NullPointerException",
                              "Compile-time error: Type casting is not allowed in Java."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! The variable obj refers at runtime to an Integer instance. Attempting to cast an Integer to String fails runtime type checks, throwing a java.lang.ClassCastException. (يشير الكائن obj في الذاكرة إلى Integer، ومحاولة تحويله قسرياً إلى نوع غير متوافق String يفشل أثناء التشغيل ويرمي ClassCastException)."
          },
          {
                    "id": "q11",
                    "question": "What method on java.lang.Throwable returns the causal exception that triggered this exception, or null if no cause exists?\n(أي دالة في فئة Throwable ترجع الاستثناء المسبب الأصلي أو null؟)",
                    "options": [
                              "e.getRoot()",
                              "e.getCause()",
                              "e.getOrigin()",
                              "e.getReason()"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Throwable.getCause() returns the underlying Throwable that caused this exception to be raised (or null if none was specified during construction). (ترجع دالة getCause() الاستثناء الأصلي الذي تم تغليفه داخل الاستثناء الحالي)."
          },
          {
                    "id": "q12",
                    "question": "Consider this code:\n\npublic class CustomExTest {\n    public static void checkAge(int age) {\n        if (age < 0) {\n            throw new IllegalArgumentException(\"Age cannot be negative: \" + age);\n        }\n    }\n    public static void main(String[] args) {\n        checkAge(-5);\n        System.out.println(\"Age verified\");\n    }\n}\n\nWhat is the console output?",
                    "options": [
                              "Age verified",
                              "The program crashes with an unhandled java.lang.IllegalArgumentException: Age cannot be negative: -5, and 'Age verified' is never printed.",
                              "Age cannot be negative: -5 followed by Age verified",
                              "Compile-time error: checkAge must declare throws IllegalArgumentException."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Since IllegalArgumentException is an unchecked RuntimeException, declaring 'throws' is optional. When checkAge(-5) executes, the exception is thrown and uncaught, causing the thread to terminate with a stack trace. 'Age verified' is never reached. (يرمي الكود استثناء غير معالج فتتوقف الدالة main فوراً ولا يتم طباعة Age verified على الإطلاق)."
          },
          {
                    "id": "q13",
                    "question": "What is printed by this code snippet?\n\npublic class TraceCheck {\n    public static void main(String[] args) {\n        try {\n            int val = Integer.parseInt(\"xyz\");\n        } catch (NumberFormatException nfe) {\n            System.out.println(nfe.getMessage().contains(\"xyz\"));\n        }\n    }\n}",
                    "options": [
                              "false",
                              "true",
                              "xyz",
                              "Compilation error"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! The exception message produced by Integer.parseInt(\"xyz\") includes the input string, e.g.: 'For input string: \"xyz\"'. Therefore, nfe.getMessage().contains(\"xyz\") evaluates to true. (تحتوي رسالة استثناء NumberFormatException الناتجة عن parseInt على النص المدخل الخاطئ، وبالتالي يرجع contains(\"xyz\") القيمة true)."
          },
          {
                    "id": "q14",
                    "question": "Which of the following is true regarding creating custom unchecked exceptions in Java?\n(أي من العبارات التالية صحيحة بشأن إنشاء استثناء غير مفحوص مخصص في جافا؟)",
                    "options": [
                              "It must extend java.lang.Throwable directly.",
                              "It must extend java.lang.RuntimeException (or one of its subclasses), which relieves callers from mandatory try-catch or throws clauses.",
                              "It must implement the java.io.Serializable interface only.",
                              "It must be declared inside an interface."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! To create a custom unchecked exception in Java, the class must inherit from java.lang.RuntimeException. Callers are not required by the compiler to explicitly catch or declare it. (لإنشاء استثناء غير مفحوص مخصص، يجب أن ترث الفئة من java.lang.RuntimeException مما يحرر المستدعين من الإلزام التصريفي بالمعالجة)."
          },
          {
                    "id": "q15",
                    "question": "Why should you never swallow an exception with an empty catch block: 'catch (Exception e) {}'?\n(لماذا يُحظر تماماً ابتلاع الاستثناءات في بلوك catch فارغ؟)",
                    "options": [
                              "Because it causes a compiler error.",
                              "Because it silently discards runtime failures and errors, leaving the system in a corrupt or inconsistent state without any log record or diagnostic trail, making debugging nearly impossible.",
                              "Because it slows down garbage collection.",
                              "Because it converts the variable e into null."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! An empty catch block is a catastrophic anti-pattern that hides bugs, swallows failures, and leaves the application running in an unstable state with zero diagnostic information. Exceptions should always be logged, handled, or propagated. (البلوك الفارغ يبتلع الأخطاء بصمت ويترك النظام في حالة فاسدة دون أي أثر في السجلات، مما يجعل اكتشاف المشاكل في بيئة الإنتاج مستحيلاً)."
          }
]
        }
      ]
    }
  ];
})();
