/**
 * Java Curriculum Module - Part 20
 * Topics:
 * 39. finally
 * 40. throw
 * 
 * 100% Offline, Pure JavaScript. Complete educational content with full bilingual (English & Arabic) explanations.
 */

(function () {
  'use strict';

  window.JAVA_TOPICS_PART20 = [
    /* ==========================================================================
       TOPIC 39: finally
       ========================================================================== */
    {
      id: "finally-block",
      title: "39. finally",
      description: "Complete Guide to the finally Block in Java: Guaranteed execution semantics, resource cleanup, locks, return statement interactions, finally traps, System.exit(), and evolution to try-with-resources.",
      lessons: [
        {
          id: "finally-block-mastery",
          title: "Complete Guide to finally",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "The finally Block in Java (بلوك finally في لغة جافا)"
            },
            {
              type: "paragraph",
              text: "The 'finally' block always executes when the try block exits. This guarantees execution whether the try block completes normally, encounters an unhandled exception, handles an exception via catch, or executes a control flow statement like 'return', 'break', or 'continue'. It is the bedrock of deterministic resource cleanup (closing sockets, freeing native handles, unlocking concurrency locks)."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "يتم تنفيذ بلوك 'finally' دائماً وبشكل مؤكد عند مغادرة بلوك try. يضمن هذا البلوك التنفيذ سواءً اكتمل كود try بنجاح تام، أو وقع استثناء تم التعامل معه ببلوك catch، أو وقع استثناء لم يُلتقط، أو حتى إذا نفذ الكود جملة return أو break أو continue. يعتبر هذا البلوك الركيزة الأساسية لتنظيف الموارد الحساسة (مثل إغلاق الاتصالات، وتحرير أقفال التزامن Locks)."
            },
            {
              type: "paragraph",
              text: "Core Principles: 1) Guaranteed Execution: Always runs except in catastrophic events (System.exit(), JVM crash, or infinite loop in try); 2) try-finally: A try block may be paired with finally without any catch block; 3) The 'Return in finally' Trap: Never return a value or throw an exception inside finally, as it silently suppresses and overwrites any active return or exception from the try block."
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
              text: "Example 1: Guaranteed Execution on Normal vs Exceptional Paths (المثال 1: التنفيذ المؤكد في المسار الطبيعي وعند وقوع خطأ)"
            },
            {
              type: "paragraph",
              text: "Demonstrating that finally runs regardless of whether an exception occurs."
            },
            {
              type: "code",
              language: "java",
              filename: "FinallyExecutionGuaranteeDemo.java",
              code: `public class FinallyExecutionGuaranteeDemo {
    public static void testExecution(boolean triggerError) {
        System.out.println("--- Testing with triggerError = " + triggerError + " ---");
        try {
            System.out.println("1. Inside try block");
            if (triggerError) {
                int error = 10 / 0; // Throws ArithmeticException
            }
            System.out.println("2. Try block finished normally");
        } catch (ArithmeticException e) {
            System.out.println("3. Inside catch block: Handled " + e.getMessage());
        } finally {
            System.out.println("4. Inside FINALLY block: ALWAYS executes!");
        }
        System.out.println("5. Method completed.");
    }

    public static void main(String[] args) {
        testExecution(false);
        System.out.println();
        testExecution(true);
    }
}`,
              output: `--- Testing with triggerError = false ---
1. Inside try block
2. Try block finished normally
4. Inside FINALLY block: ALWAYS executes!
5. Method completed.

--- Testing with triggerError = true ---
1. Inside try block
3. Inside catch block: Handled / by zero
4. Inside FINALLY block: ALWAYS executes!
5. Method completed.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "In both successful and erroneous executions, the finally block executed reliably before continuing to statement 5."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "في كلا المسارين (سواءً نجحت العملية أو وقع خطأ)، تم تنفيذ بلوك finally بالكامل وبشكل مؤكد."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Try-Finally Without Catch (المثال 2: استخدام try-finally دون وجود catch)"
            },
            {
              type: "paragraph",
              text: "Guaranteeing cleanup when you want an exception to propagate uncaught to the caller."
            },
            {
              type: "code",
              language: "java",
              filename: "TryFinallyWithoutCatchDemo.java",
              code: `public class TryFinallyWithoutCatchDemo {
    public static void doWorkAndCleanup() {
        try {
            System.out.println("1. Starting expensive resource work...");
            throw new IllegalStateException("Simulated sudden network drop!");
        } finally {
            System.out.println("2. FINALLY: Releasing resources cleanly before exception propagates!");
        }
    }

    public static void main(String[] args) {
        try {
            doWorkAndCleanup();
        } catch (IllegalStateException ex) {
            System.out.println("3. Main caught propagated exception: " + ex.getMessage());
        }
    }
}`,
              output: `1. Starting expensive resource work...
2. FINALLY: Releasing resources cleanly before exception propagates!
3. Main caught propagated exception: Simulated sudden network drop!`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "A try-finally block guarantees cleanup even when you choose not to catch the exception, allowing it to propagate up."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "يضمن بلوك try-finally تنظيف الموارد حتى لو اخترت عدم التقاط الاستثناء وتركه يمر للمستدعي في الأعلى."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Finally with Return Statements (المثال 3: تفاعل finally مع جمل return)"
            },
            {
              type: "paragraph",
              text: "Even when a return statement executes inside try or catch, finally runs BEFORE the method actually returns!"
            },
            {
              type: "code",
              language: "java",
              filename: "FinallyWithReturnDemo.java",
              code: `public class FinallyWithReturnDemo {
    public static String computeGreeting() {
        try {
            System.out.println("1. Executing try block with return statement");
            return "SUCCESS_RESULT";
        } finally {
            System.out.println("2. FINALLY executes BEFORE the method exits back to caller!");
        }
    }

    public static void main(String[] args) {
        String result = computeGreeting();
        System.out.println("3. Main received returned value: " + result);
    }
}`,
              output: `1. Executing try block with return statement
2. FINALLY executes BEFORE the method exits back to caller!
3. Main received returned value: SUCCESS_RESULT`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "The JVM evaluates the return expression, queues the return value, executes the finally block, and then completes the return."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "يحفظ الـ JVM القيمة المرجعة مؤقتاً، ثم يقوم بتنفيذ بلوك finally بالكامل، وبعدها يسلم القيمة للمستدعي."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: The Deadly 'Return in Finally' Anti-Pattern (المثال 4: كارثة وضع return داخل بلوك finally)"
            },
            {
              type: "paragraph",
              text: "DANGER: Placing a 'return' statement inside finally suppresses and discards any active exception or previous return!"
            },
            {
              type: "code",
              language: "java",
              filename: "ReturnInFinallyAntiPattern.java",
              code: `public class ReturnInFinallyAntiPattern {
    public static int dangerousMethod() {
        try {
            // This exception SHOULD crash or alert the caller
            throw new RuntimeException("CRITICAL SYSTEM FAILURE!");
        } finally {
            // ANTI-PATTERN: Returning from finally SILENTLY DISCARDS the exception!
            return 42; 
        }
    }

    public static void main(String[] args) {
        int val = dangerousMethod();
        System.out.println("Returned value: " + val);
        System.out.println("WARNING: The RuntimeException was completely erased and swallowed!");
    }
}`,
              output: `Returned value: 42
WARNING: The RuntimeException was completely erased and swallowed!`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "Returning from inside finally silently swallows any thrown exception. Never place a 'return' statement inside a finally block."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "وضع return داخل finally يبتلع ويمحو أي استثناء نشط بصمت تام؛ لذا يحظر كتابة return داخل finally نهائياً."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Concurrency Lock Management with Finally (المثال 5: تحرير أقفال التزامن بأمان في finally)"
            },
            {
              type: "paragraph",
              text: "Standard multi-threaded idiom: acquire lock outside, unlock inside finally to avoid deadlocks."
            },
            {
              type: "code",
              language: "java",
              filename: "LockCleanupDemo.java",
              code: `import java.util.concurrent.locks.ReentrantLock;

public class LockCleanupDemo {
    private static final ReentrantLock lock = new ReentrantLock();
    private static int balance = 1000;

    public static void transfer(int amount) {
        lock.lock(); // Lock acquired before try
        try {
            System.out.println("Lock acquired. Processing balance transfer...");
            if (amount < 0) {
                throw new IllegalArgumentException("Negative amount forbidden!");
            }
            balance -= amount;
        } finally {
            // Guaranteed release: Prevents permanent deadlocks even on failure!
            lock.unlock();
            System.out.println("Lock safely released in finally. (isLocked: " + lock.isLocked() + ")");
        }
    }

    public static void main(String[] args) {
        try {
            transfer(-50);
        } catch (IllegalArgumentException e) {
            System.out.println("Caught exception: " + e.getMessage());
        }
    }
}`,
              output: `Lock acquired. Processing balance transfer...
Lock safely released in finally. (isLocked: false)
Caught exception: Negative amount forbidden!`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "Placing lock.unlock() inside finally guarantees that threads never leave locks orphaned, preventing permanent application deadlocks."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "وضع unlock داخل finally يضمن تحرير القفل فوراً حتى لو حدث استثناء، مانعاً تجمد الخادم للأبد."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: The Rare Scenarios Where Finally DOES NOT Execute (المثال 6: الحالات النادرة التي لا ينفذ فيها finally)"
            },
            {
              type: "paragraph",
              text: "Finally will NOT execute if the JVM halts abruptly via System.exit() or a power cutoff."
            },
            {
              type: "code",
              language: "java",
              filename: "FinallyBypassDemo.java",
              code: `public class FinallyBypassDemo {
    public static void main(String[] args) {
        System.out.println("1. Entering try block");
        try {
            System.out.println("2. About to call System.exit(0) (Terminates the JVM immediately)");
            // If System.exit(0) is executed, the JVM dies immediately!
            // System.exit(0); // Uncommenting this skips finally completely
            System.out.println("2b. System.exit was bypassed for this demonstration.");
        } finally {
            System.out.println("3. FINALLY executed! (Note: System.exit or JVM crash would prevent this)");
        }
    }
}`,
              output: `1. Entering try block
2. About to call System.exit(0) (Terminates the JVM immediately)
2b. System.exit was bypassed for this demonstration.
3. FINALLY executed! (Note: System.exit or JVM crash would prevent this)`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "The only ways finally is bypassed are System.exit(), JVM fatal crash (e.g. SIGKILL), infinite loop in try, or daemon thread termination."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "الحالات الوحيدة لعدم تنفيذ finally هي استدعاء System.exit أو مقتل الـ JVM بالقوة بواسطة نظام التشغيل."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Exception Thrown from Inside Finally (Exception Masking) (المثال 7: خطأ رمي استثناء داخل بلوك finally وتأثيره)"
            },
            {
              type: "paragraph",
              text: "If finally throws an exception, it replaces and obscures the exception originally thrown by the try block."
            },
            {
              type: "code",
              language: "java",
              filename: "FinallyMaskingDemo.java",
              code: `public class FinallyMaskingDemo {
    public static void testMasking() {
        try {
            throw new IllegalStateException("Primary business failure in try!");
        } finally {
            // Throwing in finally overwrites the primary exception!
            throw new NullPointerException("Secondary cleanup failure in finally!");
        }
    }

    public static void main(String[] args) {
        try {
            testMasking();
        } catch (Exception e) {
            System.out.println("Caught Exception: " + e.getClass().getSimpleName() + " -> " + e.getMessage());
            System.out.println("Notice: The original IllegalStateException was completely lost!");
        }
    }
}`,
              output: `Caught Exception: NullPointerException -> Secondary cleanup failure in finally!
Notice: The original IllegalStateException was completely lost!`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "An exception in finally masks the try block's exception. Always wrap cleanup code inside finally with its own try-catch if it can fail."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "رمي استثناء داخل finally يطغى على استثناء try الأساسي ويمحوه؛ لذا يجب حماية كود التنظيف داخل finally بـ try-catch خاصة."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Classic Resource Cleanup Before Java 7 (المثال 8: إغلاق الموارد الكلاسيكي قبل جافا 7)"
            },
            {
              type: "paragraph",
              text: "How developers historically closed resources inside finally, handling secondary IOExceptions."
            },
            {
              type: "code",
              language: "java",
              filename: "ClassicResourceCleanupDemo.java",
              code: `public class ClassicResourceCleanupDemo {
    static class FakeDatabaseConnection {
        public void query() { System.out.println("Querying database..."); }
        public void close() { System.out.println("Connection closed successfully."); }
    }

    public static void main(String[] args) {
        FakeDatabaseConnection conn = null;
        try {
            conn = new FakeDatabaseConnection();
            conn.query();
        } finally {
            // Null check required in case instantiation failed
            if (conn != null) {
                conn.close();
            }
        }
    }
}`,
              output: `Querying database...
Connection closed successfully.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "Classic finally cleanup requires null checking the resource before calling close()."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "يتطلب الإغلاق التقليدي في finally التحقق من أن المتغير ليس null قبل استدعاء دالة close."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Modern Evolution to Try-With-Resources (AutoCloseable) (المثال 9: التطور الحديث إلى try-with-resources)"
            },
            {
              type: "paragraph",
              text: "Java 7 introduced try-with-resources, generating invisible synthetic finally blocks that close AutoCloseable resources automatically."
            },
            {
              type: "code",
              language: "java",
              filename: "TryWithResourcesComparisonDemo.java",
              code: `public class TryWithResourcesComparisonDemo {
    static class ManagedResource implements AutoCloseable {
        public void work() { System.out.println("1. Performing work with managed resource"); }
        @Override
        public void close() {
            System.out.println("2. Auto-closed via AutoCloseable (acts like an automatic finally!)");
        }
    }

    public static void main(String[] args) {
        try (ManagedResource res = new ManagedResource()) {
            res.work();
        }
        System.out.println("3. Exited try-with-resources block.");
    }
}`,
              output: `1. Performing work with managed resource
2. Auto-closed via AutoCloseable (acts like an automatic finally!)
3. Exited try-with-resources block.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "Try-with-resources supersedes manual finally cleanup for AutoCloseable resources, avoiding boilerplate and suppressed exception issues."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "تغني بنية try-with-resources الحديثة عن كتابة finally يدوياً لكافة الموارد التي تطبق واجهة AutoCloseable."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: ThreadContext Cleanup in Finally (MDC / Security Context) (المثال 10: تنظيف سياق المسار ThreadContext في finally)"
            },
            {
              type: "paragraph",
              text: "Cleaning up ThreadLocal variables (user session, tenant id) so pooled worker threads don't leak state."
            },
            {
              type: "code",
              language: "java",
              filename: "ThreadLocalCleanupDemo.java",
              code: `public class ThreadLocalCleanupDemo {
    private static final ThreadLocal<String> currentUser = new ThreadLocal<>();

    public static void executeRequest(String userId) {
        currentUser.set(userId);
        System.out.println("Session attached for user: " + currentUser.get());

        try {
            System.out.println("Executing transactional business operations...");
        } finally {
            // CRITICAL: Clear ThreadLocal to prevent memory leaks in thread pools!
            currentUser.remove();
            System.out.println("ThreadLocal context cleared in finally! (Active: " + currentUser.get() + ")");
        }
    }

    public static void main(String[] args) {
        executeRequest("USR_9921");
    }
}`,
              output: `Session attached for user: USR_9921
Executing transactional business operations...
ThreadLocal context cleared in finally! (Active: null)`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "Always clear ThreadLocal variables inside finally to prevent memory leaks and identity bleed across pooled threads."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "يجب دائماً تفريغ متغيرات ThreadLocal داخل finally لتفادي تسريب بيانات المستخدمين بين مسارات التنفيذ المشتركة."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Enterprise Distributed Transaction Coordinator Cleanup (المثال 11: منسق المعاملات الموزعة المؤسسي مع تنظيف finally)"
            },
            {
              type: "paragraph",
              text: "Advanced: Two-Phase Commit transaction manager guaranteeing socket connection teardown and metric recording."
            },
            {
              type: "code",
              language: "java",
              filename: "DistributedTransactionCoordinatorMaster.java",
              code: `public class DistributedTransactionCoordinatorMaster {
    static class TransactionContext {
        final String txId;
        boolean committed = false;
        TransactionContext(String id) { this.txId = id; }
    }

    public static void executeDistributedTx(String txId, boolean simulateCrash) {
        TransactionContext ctx = new TransactionContext(txId);
        long startTime = System.currentTimeMillis();
        System.out.println("[TX BEGIN] " + ctx.txId);

        try {
            System.out.println("--> Phase 1: Preparing database and message broker...");
            if (simulateCrash) {
                throw new RuntimeException("Node network partition during commit phase!");
            }
            ctx.committed = true;
            System.out.println("--> Phase 2: Transaction successfully committed.");
        } finally {
            long duration = System.currentTimeMillis() - startTime;
            System.out.println("[TX FINALLY CLEANUP]");
            if (!ctx.committed) {
                System.out.println("  [COMPENSATE] Rolling back remote distributed locks for " + ctx.txId);
            }
            System.out.printf("  [METRICS] Transaction finalized in %d ms | Status: %s%n",
                duration, ctx.committed ? "COMMITTED" : "ROLLED_BACK");
        }
    }

    public static void main(String[] args) {
        System.out.println("=== SCENARIO 1: SUCCESSFUL COMMIT ===");
        executeDistributedTx("TX-8801", false);

        System.out.println();
        System.out.println("=== SCENARIO 2: FAILURE ROLLBACK ===");
        try {
            executeDistributedTx("TX-8802", true);
        } catch (RuntimeException e) {
            System.out.println("[CALLER NOTIFIED] " + e.getMessage());
        }
    }
}`,
              output: `=== SCENARIO 1: SUCCESSFUL COMMIT ===
[TX BEGIN] TX-8801
--> Phase 1: Preparing database and message broker...
--> Phase 2: Transaction successfully committed.
[TX FINALLY CLEANUP]
  [METRICS] Transaction finalized in 0 ms | Status: COMMITTED

=== SCENARIO 2: FAILURE ROLLBACK ===
[TX BEGIN] TX-8802
--> Phase 1: Preparing database and message broker...
[TX FINALLY CLEANUP]
  [COMPENSATE] Rolling back remote distributed locks for TX-8802
  [METRICS] Transaction finalized in 0 ms | Status: ROLLED_BACK
[CALLER NOTIFIED] Node network partition during commit phase!`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "Distributed transaction coordinators rely on finally blocks to release distributed locks and record latency metrics unconditionally."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "تعتمد منسقات المعاملات الموزعة على finally لتحرير الأقفال الشبكية وتسجيل الإحصائيات تحت كل الظروف."
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
                "Mistake 1: Placing a return statement inside a finally block. This suppresses all exceptions from the try block and produces hard-to-find bugs.",
                "خطأ 1: كتابة return داخل بلوك finally؛ فهذا يمسح ويبتلع كل الاستثناءات المرمية من try بصمت.",
                "Mistake 2: Throwing an unhandled exception from inside finally without catching it, which masks the original exception.",
                "خطأ 2: التسبب في خطأ داخل finally دون حمايته؛ مما يخفي الخطأ الأصلي عن المطورين.",
                "Mistake 3: Believing that finally executes if System.exit(0) is called. System.exit terminates the JVM process immediately without running finally."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Temporary File Sentinel (التحدي العملي: حارس حذف الملفات المؤقتة في finally)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Build a safe temporary file processor: 1) Class 'TempFileManager' with boolean flag 'fileDeleted = false'; 2) Method 'processTempFile(boolean shouldCrash)': print 'File created.', execute work; if shouldCrash, throw IOException(\"Disk full\"); 3) In finally, guarantee deletion: set fileDeleted = true and print '[CLEANUP] Temp file deleted safely'; 4) In main(), test both normal and crash cases."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: صمم معالجاً للملفات المؤقتة: 1) فئة TempFileManager مع حقل fileDeleted؛ 2) دالة processTempFile(boolean shouldCrash) تطبع إنشاء الملف وتنفذ العمل؛ فإذا كانت shouldCrash صحيحة ترمي استثناء؛ 3) داخل finally اضمن حذف الملف وطباعة رسالة التأكيد؛ 4) اختبر الحالتين في main."
            },
            {
              type: "code",
              language: "java",
              filename: "TempFileSentinelChallenge.java",
              code: `public class TempFileSentinelChallenge {
    static class TempFileManager {
        boolean fileDeleted = false;

        public void processTempFile(boolean shouldCrash) throws Exception {
            System.out.println("Temporary working file allocated.");
            try {
                System.out.println("Processing data payload...");
                if (shouldCrash) {
                    throw new Exception("Unexpected processing crash!");
                }
                System.out.println("Data processing completed successfully.");
            } finally {
                fileDeleted = true;
                System.out.println("[CLEANUP GUARANTEED] Temp file purged from disk. Status deleted: " + fileDeleted);
            }
        }
    }

    public static void main(String[] args) {
        TempFileManager manager = new TempFileManager();

        System.out.println("Test Case 1 (Normal):");
        try {
            manager.processTempFile(false);
        } catch (Exception e) {
            System.out.println("Caught: " + e.getMessage());
        }

        System.out.println();
        System.out.println("Test Case 2 (Crash):");
        try {
            manager.processTempFile(true);
        } catch (Exception e) {
            System.out.println("Caught: " + e.getMessage());
        }
    }
}`,
              output: `Test Case 1 (Normal):
Temporary working file allocated.
Processing data payload...
Data processing completed successfully.
[CLEANUP GUARANTEED] Temp file purged from disk. Status deleted: true

Test Case 2 (Crash):
Temporary working file allocated.
Processing data payload...
[CLEANUP GUARANTEED] Temp file purged from disk. Status deleted: true
Caught: Unexpected processing crash!`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "The finally block guaranteed file deletion even when the processing operation terminated prematurely due to an exception."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "ضمن بلوك finally مسح الملف المؤقت وتحرير مساحة القرص حتى عندما انهار كود المعالجة فجأة."
            }
          ],
          quiz: [
          {
                    "id": "q1",
                    "question": "Under which condition is a 'finally' block guaranteed to execute?\n(في أي حالة يُضمن تنفيذ بلوك finally في جافا؟)",
                    "options": [
                              "Only when an exception is thrown and successfully caught.",
                              "Only when no exception is thrown.",
                              "Whenever control enters the corresponding 'try' block, regardless of whether the try completes normally, an exception is caught, or an unhandled exception propagates out.",
                              "Only if the method has a void return type."
                    ],
                    "correctIndex": 2,
                    "explanation": "Correct! The defining contract of 'finally' is that it always executes after try (and catch, if applicable) has finished, whether execution was normal, thrown and caught, or unhandled (unless the JVM itself halts). (يُنفذ بلوك finally دائماً بمجرد دخول التنفيذ إلى try، سواء انتهت العملية بنجاح أو رُمي استثناء وتَم التقاطه أو لم يُلتقط)."
          },
          {
                    "id": "q2",
                    "question": "Is the following syntax legal in Java?\n\ntry {\n    System.out.println(\"Processing\");\n} finally {\n    System.out.println(\"Cleaning up\");\n}",
                    "options": [
                              "No, every try block MUST have at least one catch block.",
                              "Yes, a try-finally construct without any catch block is completely legal in Java and is used when the caller is responsible for handling exceptions while cleanup is performed locally.",
                              "No, finally can only be used with synchronized blocks.",
                              "Only in Java 21 and above."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! 'try-finally' is completely valid Java syntax. It ensures local cleanup (like unlocking a lock or closing a resource) runs even if an exception occurs, while allowing that exception to propagate directly to the caller. (تركيبة try-finally دون وجود catch صحيحة تماماً وتُستخدم لتنظيف الموارد محلياً مع ترك معالجة الاستثناءات للدالة المستدعية)."
          },
          {
                    "id": "q3",
                    "question": "What is printed by the following code?\n\npublic class FinallyReturn {\n    public static int test() {\n        try {\n            return 10;\n        } finally {\n            System.out.print(\"Finally \");\n        }\n    }\n    public static void main(String[] args) {\n        System.out.println(test());\n    }\n}",
                    "options": [
                              "10 Finally",
                              "Finally 10",
                              "10",
                              "Finally"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! When a return statement in the try block is encountered, the return value (10) is staged, but before the method actually exits, the finally block executes. The finally block prints 'Finally ', and then the staged return value 10 is returned and printed by main. Output: 'Finally 10'. (عند وصول التنفيذ إلى return في try، يتم تجهيز القيمة 10، ولكن قبل الخروج من الدالة يُنفذ بلوك finally فيطبع Finally ثم تُرجع القيمة 10 وتُطبع)."
          },
          {
                    "id": "q4",
                    "question": "Why is putting a 'return' statement INSIDE a finally block considered a dangerous anti-pattern in Java?\n(لماذا يُعتبر وضع جملة return داخل بلوك finally نمطاً سيئاً وخطيراً للغاية؟)",
                    "options": [
                              "It causes a compiler error in all versions of Java.",
                              "A return in finally overrides and silently discards any previous return value AND any unhandled exception thrown in the try or catch block, swallowing errors without a trace.",
                              "It causes an immediate OutOfMemoryError.",
                              "It turns the method into an infinite loop."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! If a finally block executes a return statement, it immediately terminates the method, discarding any pending exception that was thrown in the try block. The caller will never know an exception occurred, creating silent failures. (وضع return داخل finally يتجاوز ويلغي أي قيمة إرجاع سابقة، والأسوأ أنه يبتلع ويمسح أي استثناء غير معالج انبعث من try مما يخفي الكوارث البرمجية بصمت)."
          },
          {
                    "id": "q5",
                    "question": "What is the return value of this method?\n\npublic class PrimitiveFinally {\n    public static int getValue() {\n        int x = 5;\n        try {\n            return x; // Line 5\n        } finally {\n            x = 20; // Line 7\n        }\n    }\n    public static void main(String[] args) {\n        System.out.println(getValue());\n    }\n}",
                    "options": [
                              "20",
                              "5",
                              "25",
                              "0"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! At Line 5, the expression 'x' is evaluated to 5 and stored in a temporary return slot on the stack frame. Line 7 in finally modifies the local variable 'x' to 20, but does not alter the already evaluated primitive return value. The method returns 5. (عند تنفيذ return x يتم نسخ قيمة 5 في مكدس الإرجاع، وتعديل المتغير x داخل finally يغير المتغير المحلي فقط ولا يغير القيمة البدائية التي تم تجهيزها للإرجاع مسبقاً فيعاد 5)."
          },
          {
                    "id": "q6",
                    "question": "What is printed by this method returning a mutable object?\n\npublic class MutableFinally {\n    public static StringBuilder getText() {\n        StringBuilder sb = new StringBuilder(\"A\");\n        try {\n            return sb;\n        } finally {\n            sb.append(\"B\");\n        }\n    }\n    public static void main(String[] args) {\n        System.out.println(getText().toString());\n    }\n}",
                    "options": [
                              "A",
                              "AB",
                              "B",
                              "Compilation error"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! The reference to the StringBuilder object is evaluated and staged for return. The finally block executes and mutates the SAME object on the heap via sb.append(\"B\"). Because the caller receives the reference to that same object, it sees the mutated content 'AB'. (يتم إرجاع مرجع الكائن نفسه في الذاكرة، وبما أن بلوك finally قام بتعديل نفس الكائن في الـ Heap عبر append، فإن المستدعي يرى النص المعدل AB)."
          },
          {
                    "id": "q7",
                    "question": "In which of the following scenarios will a 'finally' block NOT execute?\n(في أي من السيناريوهات التالية لن يُنفذ بلوك finally؟)",
                    "options": [
                              "When an unchecked NullPointerException is thrown in the try block.",
                              "When a method returns early from inside the try block.",
                              "When System.exit(0) is invoked inside the try block, or the JVM crashes due to a fatal OS SIGKILL / power loss.",
                              "When the try block contains a loop."
                    ],
                    "correctIndex": 2,
                    "explanation": "Correct! A finally block will NOT execute if the JVM process terminates abruptly (such as System.exit(), Runtime.getRuntime().halt(), fatal JVM segfault, or OS SIGKILL), or if a thread hangs permanently in an infinite loop or deadlock inside the try block. (لا يُنفذ finally في الحالات التي يتم فيها إيقاف عملية الـ JVM بالكامل مثل استدعاء System.exit أو انقطاع الكهرباء أو إنهاء العملية بأمر النظام SIGKILL)."
          },
          {
                    "id": "q8",
                    "question": "What is the standard idiom for managing explicit concurrency locks (such as java.util.concurrent.locks.ReentrantLock) in Java?\n(ما هو النمط القياسي لإدارة أقفال التزامن الصريحة في جافا؟)",
                    "options": [
                              "lock.lock(); lock.unlock(); try { ... }",
                              "lock.lock();\ntry {\n    // Critical section\n} finally {\n    lock.unlock();\n}",
                              "try {\n    lock.unlock();\n} finally {\n    lock.lock();\n}",
                              "synchronized (lock) { lock.lock(); }"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Calling lock.lock() BEFORE the try block and placing lock.unlock() in the finally block guarantees that the lock is released even if an exception occurs in the critical section, preventing catastrophic deadlocks. (استدعاء lock.lock() قبل try مباشرة ووضع lock.unlock() داخل finally يضمن تحرير القفل في جميع الأحوال لمنع تجمد التطبيق في Deadlock)."
          },
          {
                    "id": "q9",
                    "question": "What happens when an exception is thrown in the try block, and ANOTHER exception is thrown in the finally block?\n\npublic class MaskingTest {\n    public static void main(String[] args) {\n        try {\n            try {\n                throw new IllegalArgumentException(\"First\");\n            } finally {\n                throw new IllegalStateException(\"Second\"); // Line 6\n            }\n        } catch (Exception e) {\n            System.out.println(e.getMessage());\n        }\n    }\n}",
                    "options": [
                              "First",
                              "Second (the exception thrown in finally masks/suppresses the exception thrown in try)",
                              "First Second",
                              "Both exceptions are printed in parallel."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! In traditional try-finally blocks, if an exception is thrown in finally, it completely displaces and masks the original exception thrown in the try block. The catch block intercepts 'Second', and 'First' is lost unless recorded manually or managed with try-with-resources. (في جافا الكلاسيكية، إذا رمى بلوك finally استثناءً جديداً، فإنه يحجب ويلغي الاستثناء الأصلي المنبعث من try تماماً وتُطبع رسالة الثاني Second)."
          },
          {
                    "id": "q10",
                    "question": "What is printed by this program?\n\npublic class FlowOrder {\n    public static void main(String[] args) {\n        try {\n            System.out.print(\"Try \");\n            throw new RuntimeException();\n        } catch (RuntimeException e) {\n            System.out.print(\"Catch \");\n        } finally {\n            System.out.print(\"Finally \");\n        }\n        System.out.println(\"End\");\n    }\n}",
                    "options": [
                              "Try Finally Catch End",
                              "Try Catch Finally End",
                              "Try Catch End Finally",
                              "Try Finally End"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Execution starts in try ('Try '), throws RuntimeException, matches catch ('Catch '), executes finally ('Finally '), and proceeds to the following statement ('End'). Output: 'Try Catch Finally End'. (يبدأ بـ Try ثم عند الخطأ يقفز إلى Catch، وبعد انتهائه ينفذ Finally، ثم يكمل السطر الأخير End)."
          },
          {
                    "id": "q11",
                    "question": "Consider this nested try-finally structure:\n\npublic class NestedFinally {\n    public static void main(String[] args) {\n        try {\n            try {\n                System.out.print(\"A \");\n            } finally {\n                System.out.print(\"B \");\n            }\n        } finally {\n            System.out.print(\"C \");\n        }\n    }\n}",
                    "options": [
                              "A B C ",
                              "A C B ",
                              "B C A ",
                              "C B A "
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! The inner try executes, printing 'A '. The inner finally executes immediately after the inner try finishes, printing 'B '. Then the outer finally executes, printing 'C '. Output: 'A B C '. (يُنفذ try الداخلي طابعاً A، ثم يتبعه فوراً finally الداخلي طابعاً B، ثم أخيراً ينفذ finally الخارجي طابعاً C)."
          },
          {
                    "id": "q12",
                    "question": "Why did Java 7 introduce 'try-with-resources' to replace manual resource cleanup in 'finally' blocks?\n(لماذا قدمت جافا 7 ميزة try-with-resources كبديل للإغلاق اليدوي في بلوك finally؟)",
                    "options": [
                              "Because finally blocks were deleted from the language.",
                              "Manual closing in finally required verbose nested try-catch blocks (because close() itself throws IOException) and easily masked original exceptions, whereas try-with-resources handles cleanup automatically and preserves suppressed exceptions via Throwable.getSuppressed().",
                              "To make streams read from network sockets only.",
                              "Because try-with-resources uses less CPU cache."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! In pre-Java 7 code, closing streams in finally required ugly nested try-catch blocks and often masked the primary exception if close() threw an error. Try-with-resources cleanly auto-closes AutoCloseable resources and records secondary exceptions as suppressed exceptions. (الإغلاق اليدوي في finally كان معقداً لتطلبه try-catch متداخلة وكان يحجب الأخطاء الأصلية؛ وجاءت try-with-resources لتغلق الموارد تلقائياً وتحفظ الاستثناءات المحجوبة بنظافة)."
          },
          {
                    "id": "q13",
                    "question": "What is printed by this code involving System.exit?\n\npublic class ExitFinally {\n    public static void main(String[] args) {\n        try {\n            System.out.print(\"Starting \");\n            System.exit(0);\n        } finally {\n            System.out.print(\"FinallyExecuted\");\n        }\n    }\n}",
                    "options": [
                              "Starting FinallyExecuted",
                              "Starting ",
                              "FinallyExecuted",
                              "Compile-time error"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! System.exit(0) immediately terminates the running Java Virtual Machine. When the JVM process halts, thread execution stops immediately and finally blocks are NOT executed. Output: 'Starting '. (أمر System.exit يوقف الـ JVM فوراً، وتتوقف جميع مسارات التنفيذ دون تشغيل أي بلوك finally، فيطبع فقط Starting)."
          },
          {
                    "id": "q14",
                    "question": "What is printed by this method?\n\npublic class FinallyOverride {\n    public static String check() {\n        try {\n            throw new RuntimeException(\"Failure\");\n        } finally {\n            return \"Recovered\"; // Line 5\n        }\n    }\n    public static void main(String[] args) {\n        System.out.println(check());\n    }\n}",
                    "options": [
                              "The program crashes with RuntimeException: Failure.",
                              "Recovered",
                              "Failure Recovered",
                              "Compile-time error: return in finally is forbidden."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Returning from inside a finally block completely suppresses and discards the pending RuntimeException(\"Failure\"). The method exits normally with return value 'Recovered'. (جملة return داخل finally تلغي وتتجاهل استثناء الانهيار المنبعث من try وتخرج من الدالة بشكل طبيعي مع القيمة Recovered)."
          },
          {
                    "id": "q15",
                    "question": "Why is a finally block essential when using thread-local contextual data (like SLF4J MDC or Spring SecurityContextHolder)?\n(لماذا يُعد بلوك finally ضرورياً عند استخدام بيانات ThreadLocal في خوادم الويب؟)",
                    "options": [
                              "Because ThreadLocal variables are cleared by the garbage collector automatically every 5 seconds.",
                              "In servlet containers with thread pools, worker threads are reused across requests. Failing to clear ThreadLocal context in finally leaks security credentials or tenant IDs into unrelated subsequent requests on that reused thread.",
                              "Because ThreadLocal can only be called from finally blocks.",
                              "To speed up HTTP responses."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Thread pools reuse threads for different HTTP requests. If a request sets user context or logging MDC in ThreadLocal and fails to clear it in finally, the next unrelated request executed on that thread inherits that stale context, causing severe security leaks and audit bugs. (يتم إعادة استخدام مسارات خوادم الويب لطلبات مختلفة؛ وعدم مسح بيانات ThreadLocal داخل finally يسرب بيانات المستخدم والهوية لطلبات مستخدمين آخرين)."
          }
]
        }
      ]
    },

    /* ==========================================================================
       TOPIC 40: throw
       ========================================================================== */
    {
      id: "throw-keyword",
      title: "40. throw",
      description: "Mastering the throw Keyword in Java: Explicit exception generation, precondition validation, rethrowing caught exceptions, checked vs unchecked throw rules, custom exceptions, and defensive programming.",
      lessons: [
        {
          id: "throw-keyword-mastery",
          title: "Complete Guide to throw",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "The throw Keyword in Java (الكلمة المفتاحية throw في لغة جافا)"
            },
            {
              type: "paragraph",
              text: "The 'throw' keyword in Java is used to explicitly throw an exception object from any method or code block. While the JVM automatically throws exceptions for runtime conditions like division by zero or null dereferencing, the 'throw' keyword allows developers to enforce business invariants, signal invalid arguments, and create robust defensive boundaries."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "تُستخدم الكلمة المفتاحية 'throw' في جافا لرمي كائن استثناء صراحةً من أي دالة أو سطر برمجي. بينما يقوم الـ JVM برمي استثناءات تلقائية عند حدوث أخطاء مثل القسمة على صفر، تمنحك كلمة 'throw' القدرة على فرض القواعد الوظيفية، والتحقق من صحة المدخلات، وبناء حواجز دفاعية متينة داخل كودك لمنع إفساد البيانات."
            },
            {
              type: "paragraph",
              text: "Crucial Distinctions: 'throw' vs 'throws': 1) 'throw' (singular) is an action verb used inside a method body to instantiate and fire an exception object; 2) 'throws' (plural) is a clause in the method signature declaration warning callers that the method may throw specified checked exceptions."
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
              text: "Example 1: Explicit Throw for Input Validation (المثال 1: الرمي الصريح للتحقق من صحة المدخلات)"
            },
            {
              type: "paragraph",
              text: "Enforcing method preconditions by throwing IllegalArgumentException."
            },
            {
              type: "code",
              language: "java",
              filename: "ExplicitThrowDemo.java",
              code: `public class ExplicitThrowDemo {
    public static void setAge(int age) {
        if (age < 0 || age > 150) {
            // Explicitly instantiate and throw an exception object
            throw new IllegalArgumentException("Invalid age: " + age + " (Must be between 0 and 150)");
        }
        System.out.println("Age registered successfully: " + age);
    }

    public static void main(String[] args) {
        setAge(25);

        try {
            setAge(-5);
        } catch (IllegalArgumentException e) {
            System.out.println("Caught explicit exception: " + e.getMessage());
        }
    }
}`,
              output: `Age registered successfully: 25
Caught explicit exception: Invalid age: -5 (Must be between 0 and 150)`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "Using 'throw new IllegalArgumentException(...)' protects domain integrity by stopping execution before corrupt state is stored."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "رمي IllegalArgumentException يحمي نزاهة البيانات ويوقف التنفيذ فوراً قبل حفظ عمر غير منطقي."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: 'throw' vs 'throws' in the Same Method (المثال 2: المقارنة العملية بين throw و throws)"
            },
            {
              type: "paragraph",
              text: "Clarifying the difference between the signature declaration (throws) and the execution statement (throw)."
            },
            {
              type: "code",
              language: "java",
              filename: "ThrowVsThrowsDemo.java",
              code: `import java.io.IOException;

public class ThrowVsThrowsDemo {
    // 'throws IOException' is in the METHOD SIGNATURE (Contract declaration)
    public static void loadConfigFile(String filename) throws IOException {
        if (filename == null || filename.isBlank()) {
            // 'throw' is an ACTION STATEMENT inside the body (Throws the instance)
            throw new IOException("Configuration filename cannot be null or empty!");
        }
        System.out.println("Loading configuration from: " + filename);
    }

    public static void main(String[] args) {
        try {
            loadConfigFile("");
        } catch (IOException e) {
            System.out.println("Handled checked error: " + e.getMessage());
        }
    }
}`,
              output: `Handled checked error: Configuration filename cannot be null or empty!`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "'throws' declares what checked exceptions might emerge from a method signature, while 'throw' creates and fires the exception inside the method body."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "تعلن 'throws' في توقيع الدالة عن الاستثناءات المتوقعة، بينما تقوم 'throw' داخل جسم الدالة برمي كائن الاستثناء فعلياً."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Objects.requireNonNull() Syntactic Sugar (المثال 3: التحقق السريع باستخدام Objects.requireNonNull)"
            },
            {
              type: "paragraph",
              text: "Using standard JDK utility that throws NullPointerException with custom messages."
            },
            {
              type: "code",
              language: "java",
              filename: "RequireNonNullDemo.java",
              code: `import java.util.Objects;

public class RequireNonNullDemo {
    static class UserProfile {
        private final String username;

        UserProfile(String name) {
            // Equivalent to: if (name == null) throw new NullPointerException("Username is required");
            this.username = Objects.requireNonNull(name, "Username must not be null!");
        }

        public String getUsername() { return username; }
    }

    public static void main(String[] args) {
        UserProfile u1 = new UserProfile("Amira");
        System.out.println("Created profile: " + u1.getUsername());

        try {
            UserProfile u2 = new UserProfile(null);
        } catch (NullPointerException npe) {
            System.out.println("Defensive Guard Triggered: " + npe.getMessage());
        }
    }
}`,
              output: `Created profile: Amira
Defensive Guard Triggered: Username must not be null!`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "Objects.requireNonNull is standard idiom across Java libraries to throw targeted NullPointerExceptions immediately."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "تعتبر Objects.requireNonNull الطريقة القياسية لرمي NPE فورياً برسائل واضحة لحماية منشئات الكائنات."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Rethrowing a Caught Exception (المثال 4: إعادة رمي نفس الاستثناء بعد تسجيله)"
            },
            {
              type: "paragraph",
              text: "Capturing an exception locally for audit logging and immediately rethrowing it to the caller."
            },
            {
              type: "code",
              language: "java",
              filename: "RethrowSameDemo.java",
              code: `public class RethrowSameDemo {
    public static void processPayment(double amount) {
        try {
            if (amount <= 0) {
                throw new IllegalArgumentException("Amount must be > 0. Received: " + amount);
            }
            System.out.println("Processing payment: $" + amount);
        } catch (IllegalArgumentException ex) {
            System.out.println("[AUDIT LOG] Logged failed payment attempt to security stream.");
            // Rethrow the identical exception instance
            throw ex;
        }
    }

    public static void main(String[] args) {
        try {
            processPayment(-15.0);
        } catch (IllegalArgumentException e) {
            System.out.println("[CALLER RECOVERY] Received error: " + e.getMessage());
        }
    }
}`,
              output: `[AUDIT LOG] Logged failed payment attempt to security stream.
[CALLER RECOVERY] Received error: Amount must be > 0. Received: -15.0`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "Rethrowing via 'throw ex' allows intermediate methods to perform logging or cleanup while letting the caller make the final handling decision."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "تسمح إعادة الرمي بـ throw ex للدوال الوسيطة بتسجيل الخطأ في السجلات مع ترك القرار النهائي في المعالجة للمستدعي."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Throwing Custom Checked Exceptions with State (المثال 5: رمي استثناء مخصص يحمل بيانات إضافية)"
            },
            {
              type: "paragraph",
              text: "Throwing rich exceptions that carry error codes and timestamp metadata."
            },
            {
              type: "code",
              language: "java",
              filename: "StatefulCustomThrowDemo.java",
              code: `public class StatefulCustomThrowDemo {
    static class RateLimitExceededException extends Exception {
        private final int retryAfterSeconds;

        RateLimitExceededException(String msg, int retrySeconds) {
            super(msg);
            this.retryAfterSeconds = retrySeconds;
        }

        public int getRetryAfterSeconds() { return retryAfterSeconds; }
    }

    public static void queryApi(int requestsPerMinute) throws RateLimitExceededException {
        if (requestsPerMinute > 60) {
            throw new RateLimitExceededException("Quota exceeded: 60 req/min limit", 45);
        }
        System.out.println("API query successful.");
    }

    public static void main(String[] args) {
        try {
            queryApi(120);
        } catch (RateLimitExceededException e) {
            System.out.println("Error: " + e.getMessage());
            System.out.println("Header HTTP Retry-After: " + e.getRetryAfterSeconds() + " seconds");
        }
    }
}`,
              output: `Error: Quota exceeded: 60 req/min limit
Header HTTP Retry-After: 45 seconds`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "Throwing custom exceptions carrying domain attributes enables callers to respond intelligently (e.g. Setting HTTP 429 headers)."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "رمي استثناءات مخصصة مزودة بحقول بيانات إضافية يساعد في تقديم استجابات برمجية ذكية كإضافة ترويسات HTTP."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Throwing Exceptions Inside Lambdas (Unchecked Wrapping) (المثال 6: رمي الاستثناءات داخل تعابير لامبدا)"
            },
            {
              type: "paragraph",
              text: "Standard functional interfaces (like Consumer, Function) cannot throw checked exceptions without unchecked wrapping."
            },
            {
              type: "code",
              language: "java",
              filename: "LambdaThrowDemo.java",
              code: `import java.util.List;

public class LambdaThrowDemo {
    public static void main(String[] args) {
        List<String> userInputs = List.of("10", "20", "corrupt_input", "40");

        try {
            userInputs.forEach(input -> {
                try {
                    int val = Integer.parseInt(input);
                    System.out.println("Processing value: " + val);
                } catch (NumberFormatException nfe) {
                    // Throwing unchecked exception from inside lambda
                    throw new IllegalArgumentException("Invalid payload token: " + input, nfe);
                }
            });
        } catch (IllegalArgumentException ex) {
            System.out.println("Aborted stream pipeline: " + ex.getMessage());
            System.out.println("Caused by: " + ex.getCause().getClass().getSimpleName());
        }
    }
}`,
              output: `Processing value: 10
Processing value: 20
Aborted stream pipeline: Invalid payload token: corrupt_input
Caused by: NumberFormatException`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "Inside Java Stream lambdas, wrap checked or unhandled exceptions into an unchecked RuntimeException and throw it to halt the pipeline."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "داخل دوال Lambda في جافا، يتم تغليف الاستثناءات داخل استثناء غير مفحوص RuntimeException ورميه لإيقاف السلسلة."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Defensive Programming with UnsupportedOperationException (المثال 7: البرمجة الدفاعية بـ UnsupportedOperationException)"
            },
            {
              type: "paragraph",
              text: "Throwing UnsupportedOperationException to enforce immutability or indicate unmodifiable operations."
            },
            {
              type: "code",
              language: "java",
              filename: "UnsupportedOperationDemo.java",
              code: `public class UnsupportedOperationDemo {
    interface ReadOnlyRepository {
        String findById(int id);
        void deleteById(int id);
    }

    static class ReadOnlyArchive implements ReadOnlyRepository {
        public String findById(int id) {
            return "ArchivedDocument#" + id;
        }

        public void deleteById(int id) {
            // Throw standard JDK exception for forbidden mutation operations
            throw new UnsupportedOperationException("Deletions are strictly forbidden in ReadOnlyArchive!");
        }
    }

    public static void main(String[] args) {
        ReadOnlyRepository repo = new ReadOnlyArchive();
        System.out.println("Found: " + repo.findById(101));

        try {
            repo.deleteById(101);
        } catch (UnsupportedOperationException uoe) {
            System.out.println("Security Enforcement: " + uoe.getMessage());
        }
    }
}`,
              output: `Found: ArchivedDocument#101
Security Enforcement: Deletions are strictly forbidden in ReadOnlyArchive!`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "UnsupportedOperationException is thrown by Java collections (e.g. List.of()) and immutable architectures to reject mutations."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "ترمى UnsupportedOperationException في جافا لمنع تعديل القوائم الثابتة وحظر العمليات غير المدعومة."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Throwing in Default Switch Branches (Exhaustiveness) (المثال 8: الرمي في فرع default لمنع القيم غير المتوقعة)"
            },
            {
              type: "paragraph",
              text: "Throwing IllegalArgumentException in switch defaults to detect unhandled enum cases immediately."
            },
            {
              type: "code",
              language: "java",
              filename: "SwitchExhaustivenessThrowDemo.java",
              code: `public class SwitchExhaustivenessThrowDemo {
    enum Priority { LOW, MEDIUM, HIGH, CRITICAL }

    public static int getSlaHours(Priority priority) {
        switch (priority) {
            case LOW:      return 72;
            case MEDIUM:   return 24;
            case HIGH:     return 4;
            case CRITICAL: return 1;
            default:
                // Defensive throw protects against future newly added enum constants
                throw new IllegalArgumentException("Unhandled priority level: " + priority);
        }
    }

    public static void main(String[] args) {
        System.out.println("CRITICAL SLA: " + getSlaHours(Priority.CRITICAL) + " hour(s)");
        System.out.println("LOW SLA:      " + getSlaHours(Priority.LOW) + " hour(s)");
    }
}`,
              output: `CRITICAL SLA: 1 hour(s)
LOW SLA:      72 hour(s)`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "Throwing in switch default branches ensures that if new enum constants are added later, unhandled cases fail fast instead of behaving silently."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "رمي استثناء في فرع default يضمن اكتشاف أي ثوابت جديدة تضاف لاحقاً فوراً ويمنع السلوك الغامض."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Throwing vs Returning Error Codes (Fail-Fast Principle) (المثال 9: الرمي الصريح مقابل إرجاع رموز الأخطاء)"
            },
            {
              type: "paragraph",
              text: "Why throwing exceptions is far superior to returning error codes like -1 or null."
            },
            {
              type: "code",
              language: "java",
              filename: "FailFastVsReturnCodeDemo.java",
              code: `public class FailFastVsReturnCodeDemo {
    // FLAWED: Returning error codes (callers often forget to check)
    public static int badWithdraw(int balance, int amount) {
        if (amount > balance) return -1; // Silent error code
        return balance - amount;
    }

    // SUPERIOR: Fail-fast with explicit throw
    public static int goodWithdraw(int balance, int amount) {
        if (amount > balance) {
            throw new IllegalArgumentException("Insufficient funds: balance=" + balance + ", requested=" + amount);
        }
        return balance - amount;
    }

    public static void main(String[] args) {
        // Bad withdraw can lead to silent corrupt state if caller ignores -1
        int newBalance = badWithdraw(100, 200);
        System.out.println("Ignored error code resulted in balance: " + newBalance);

        // Good withdraw enforces fail-fast
        try {
            goodWithdraw(100, 200);
        } catch (IllegalArgumentException ex) {
            System.out.println("Fail-fast stopped corruption: " + ex.getMessage());
        }
    }
}`,
              output: `Ignored error code resulted in balance: -1
Fail-fast stopped corruption: Insufficient funds: balance=100, requested=200`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "Fail-fast principle: Throwing exceptions halts corrupted computation immediately, unlike error codes which callers frequently neglect to inspect."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "مبدأ الفشل السريع Fail-Fast: رمي الاستثناء يوقف الحسابات الفاسدة فوراً، بعكس رموز الأخطاء (مثل -1) التي ينساها المطورون غالباً."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Throwing from Utility Class Private Constructors (المثال 10: رمي استثناء لمنع إنشاء كائنات الفئات المساعدة)"
            },
            {
              type: "paragraph",
              text: "Enforcing non-instantiability on pure static utility classes (Item 4 in Effective Java)."
            },
            {
              type: "code",
              language: "java",
              filename: "NonInstantiableClassDemo.java",
              code: `public class NonInstantiableClassDemo {
    // Pure utility class
    public static final class MathUtils {
        // Private constructor that throws AssertionError
        private MathUtils() {
            throw new AssertionError("Instantiation of MathUtils utility class is forbidden!");
        }

        public static int square(int x) { return x * x; }
    }

    public static void main(String[] args) {
        System.out.println("Square of 7: " + MathUtils.square(7));

        // Even reflection or internal class cannot instantiate
        try {
            java.lang.reflect.Constructor<?> c = MathUtils.class.getDeclaredConstructor();
            c.setAccessible(true);
            c.newInstance();
        } catch (Exception e) {
            System.out.println("Constructor guard invoked: " + e.getCause().getMessage());
        }
    }
}`,
              output: `Square of 7: 49
Constructor guard invoked: Instantiation of MathUtils utility class is forbidden!`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "Throwing AssertionError inside a private constructor prevents reflection and internal callers from ever creating instances of static utility classes."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "رمي خطأ داخل الـ Constructor الخاص يمنع تماماً إنشاء كائنات من الفئات المساعدة حتى عبر الـ Reflection."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Enterprise Zero-Trust Security Precondition Gate (المثال 11: بوابة الأمان المؤسسية بنموذج الثقة الصفرية Zero-Trust)"
            },
            {
              type: "paragraph",
              text: "Advanced: High-assurance authorization gate verifying JWT claims, roles, and client IP addresses using strict throw guards."
            },
            {
              type: "code",
              language: "java",
              filename: "ZeroTrustSecurityGateMaster.java",
              code: `import java.util.Set;

public class ZeroTrustSecurityGateMaster {
    static class SecurityAuthException extends SecurityException {
        final String violationCode;
        SecurityAuthException(String code, String msg) {
            super(msg);
            this.violationCode = code;
        }
    }

    static class SecurityContext {
        final String userId;
        final Set<String> roles;
        final boolean mfaAuthenticated;

        SecurityContext(String id, Set<String> roles, boolean mfa) {
            this.userId = id;
            this.roles = roles;
            this.mfaAuthenticated = mfa;
        }
    }

    public static void authorizeAdminTransfer(SecurityContext ctx, double amount) {
        // Guard 1: Context existence
        if (ctx == null) {
            throw new SecurityAuthException("AUTH_001", "SecurityContext cannot be null");
        }
        // Guard 2: Role check
        if (!ctx.roles.contains("SUPER_ADMIN")) {
            throw new SecurityAuthException("AUTH_002", "User '" + ctx.userId + "' lacks SUPER_ADMIN role");
        }
        // Guard 3: Multi-factor authentication check
        if (!ctx.mfaAuthenticated) {
            throw new SecurityAuthException("AUTH_003", "Multi-Factor Authentication (MFA) required for transfers!");
        }
        // Guard 4: Transaction limit invariant
        if (amount > 1_000_000.0) {
            throw new SecurityAuthException("AUTH_004", "Exceeds automated transfer limit ($1M)");
        }

        System.out.printf("[AUTHORIZED] User '%s' transferred $%,.2f safely.%n", ctx.userId, amount);
    }

    public static void main(String[] args) {
        SecurityContext validUser = new SecurityContext("usr_admin_1", Set.of("SUPER_ADMIN"), true);
        authorizeAdminTransfer(validUser, 250_000.0);

        SecurityContext noMfaUser = new SecurityContext("usr_hacker_2", Set.of("SUPER_ADMIN"), false);
        try {
            authorizeAdminTransfer(noMfaUser, 500.0);
        } catch (SecurityAuthException e) {
            System.out.println("[REJECTED] Code: " + e.violationCode + " | Reason: " + e.getMessage());
        }
    }
}`,
              output: `[AUTHORIZED] User 'usr_admin_1' transferred $250,000.00 safely.
[REJECTED] Code: AUTH_003 | Reason: Multi-Factor Authentication (MFA) required for transfers!`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "Enterprise security architectures place explicit throw guards at every boundary, guaranteeing unauthorized actions are rejected immediately."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "تضع بنية الأمان المؤسسية حواجز throw صريحة عند كل بوابة لمنع أي إجراء غير مصرح به على الفور."
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
                "Mistake 1: Confusing 'throw' (the action statement to throw an exception object) with 'throws' (the clause declaring exceptions in a method signature).",
                "خطأ 1: الخلط بين throw (فعل رمي كائن الاستثناء) و throws (الإعلان في توقيع الدالة).",
                "Mistake 2: Writing 'throw null;'. This causes a NullPointerException at runtime instead of your intended exception.",
                "خطأ 2: كتابة throw null؛ مما يسبب NullPointerException بدلاً من الخطأ المطلوب.",
                "Mistake 3: Throwing generic Exception or Throwable instead of specific standard or domain exceptions."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: User Registration Input Guard (التحدي العملي: حارس مدخلات تسجيل المستخدمين)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Create a user registration validator: 1) Method 'registerUser(String username, String email, int age)': 2) If username is null or < 3 characters, throw IllegalArgumentException(\"Username too short\"); 3) If email is null or doesn't contain '@', throw IllegalArgumentException(\"Invalid email\"); 4) If age < 13, throw IllegalArgumentException(\"User must be at least 13 years old\"); 5) In main(), test with valid and invalid inputs, verifying each throw."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: صمم مدققاً لتسجيل المستخدمين: 1) دالة registerUser(String username, String email, int age)؛ 2) إذا كان اسم المستخدم أقل من 3 أحرف ارمِ IllegalArgumentException؛ 3) إذا كان البريد بلا @ ارمِ استثناء؛ 4) إذا كان العمر أقل من 13 ارمِ استثناء؛ 5) في main اختبر الحالات وتأكد من عمل حواجز throw."
            },
            {
              type: "code",
              language: "java",
              filename: "UserRegistrationChallenge.java",
              code: `public class UserRegistrationChallenge {
    public static void registerUser(String username, String email, int age) {
        if (username == null || username.trim().length() < 3) {
            throw new IllegalArgumentException("Username must contain at least 3 non-whitespace characters!");
        }
        if (email == null || !email.contains("@") || !email.contains(".")) {
            throw new IllegalArgumentException("Invalid email format (must include '@' and '.'): " + email);
        }
        if (age < 13) {
            throw new IllegalArgumentException("User registration requires minimum age of 13! Received: " + age);
        }

        System.out.println("Registration Approved: User '" + username + "' (" + email + "), Age " + age);
    }

    public static void test(String u, String e, int a) {
        try {
            registerUser(u, e, a);
        } catch (IllegalArgumentException ex) {
            System.out.println("[REGISTRATION BLOCKED] " + ex.getMessage());
        }
    }

    public static void main(String[] args) {
        test("ab", "alice@domain.com", 22);         // Too short username
        test("alice", "bad_email_domain.com", 22);   // Bad email
        test("alice", "alice@domain.com", 11);       // Underage
        test("alice", "alice@domain.com", 22);       // Approved!
    }
}`,
              output: `[REGISTRATION BLOCKED] Username must contain at least 3 non-whitespace characters!
[REGISTRATION BLOCKED] Invalid email format (must include '@' and '.'): bad_email_domain.com
[REGISTRATION BLOCKED] User registration requires minimum age of 13! Received: 11
Registration Approved: User 'alice' (alice@domain.com), Age 22`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "Explicit throw statements establish clear guard clauses at the beginning of the method, stopping invalid input before processing."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "وضعت جمل throw الصريحة شروط حراسة واضحة في بداية الدالة أوقفت المدخلات غير الصالحة بدقة."
            }
          ],
          quiz: [
          {
                    "id": "q1",
                    "question": "What is the primary difference between the 'throw' and 'throws' keywords in Java?\n(ما هو الفرق الأساسي بين الكلمتين المفتاحيتين throw و throws في جافا؟)",
                    "options": [
                              "There is no difference; they are interchangeable.",
                              "'throw' is an executable statement inside a method body used to explicitly raise an exception instance; 'throws' is a clause in a method signature declaring checked exceptions that may propagate to callers.",
                              "'throw' is used for checked exceptions; 'throws' is used for unchecked exceptions.",
                              "'throws' instantiates an object; 'throw' destroys it."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! 'throw' is an imperative statement inside a block (e.g. 'throw new IllegalArgumentException();') that raises an exception. 'throws' is part of the method declaration signature warning callers that the method may propagate specified checked exceptions. (الكلمة throw تُستخدم داخل جسم الدالة لإطلاق كائن استثناء فعلياً، بينما throws تُكتب في ترويسة الدالة للإعلان عن الاستثناءات المفحوصة التي قد تخرج منها)."
          },
          {
                    "id": "q2",
                    "question": "What happens when compiling the following code?\n\npublic class UnreachableTest {\n    public static void validate(int score) {\n        if (score < 0) {\n            throw new IllegalArgumentException(\"Negative\");\n            System.out.println(\"Logged\"); // Line 5\n        }\n    }\n}",
                    "options": [
                              "It compiles and prints 'Logged' before throwing.",
                              "Compile-time error on Line 5: 'unreachable statement' because execution unconditionally terminates or jumps when throw executes.",
                              "It compiles and runs without issues.",
                              "It throws a RuntimeException at Line 5."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! The 'throw' statement unconditionally transfers control out of the current scope. Any statement placed directly after an unconditional throw in the same block is unreachable code, causing a compile-time error. (جملة throw تنقل مسار التنفيذ فوراً خارج الدالة، ووجود أي سطر بعدها مباشرة داخل نفس البلوك يُعد unreachable statement يرفض المترجم تصريفه)."
          },
          {
                    "id": "q3",
                    "question": "What happens at runtime when executing the statement 'throw null;' in Java?\n\npublic class ThrowNull {\n    public static void main(String[] args) {\n        throw null;\n    }\n}",
                    "options": [
                              "It prints null to the console and exits successfully.",
                              "It throws a java.lang.NullPointerException at runtime.",
                              "Compile-time error: 'cannot throw null'.",
                              "It causes an OutOfMemoryError."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! The expression following 'throw' must evaluate to a reference to a Throwable. If the expression evaluates to null, the JVM detects the null reference and throws a NullPointerException at runtime. (يشترط أمر throw وجود كائن استثناء صالح، وإذا تم تمرير null له، فإن الـ JVM يرمي بدلاً عنه استثناء NullPointerException فوراً أثناء التشغيل)."
          },
          {
                    "id": "q4",
                    "question": "What is the result of using Objects.requireNonNull(param, \"Message\") when 'param' is null?\n(ما هي النتيجة الناتجة عن استدعاء Objects.requireNonNull(param, \"Message\") عندما يكون param فارغاً null؟)",
                    "options": [
                              "It returns false.",
                              "It immediately throws a java.lang.NullPointerException with the specified message \"Message\".",
                              "It initializes param to an empty object.",
                              "It prints a warning to System.err."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Objects.requireNonNull() is standard Java library syntactic sugar for defensive parameter validation. If the argument is null, it throws a NullPointerException with the provided diagnostic message. (دالة Objects.requireNonNull مخصصة للتحقق الدفاعي السريع من المعاملات؛ فإذا كانت القيمة null ترمي NPE فوراً مع الرسالة التوضيحية المحددة)."
          },
          {
                    "id": "q5",
                    "question": "Why do utility classes (like java.util.Collections or custom MathUtils) throw an AssertionError inside a private constructor?\n\npublic final class MathUtils {\n    private MathUtils() {\n        throw new AssertionError(\"No MathUtils instances for you!\");\n    }\n}",
                    "options": [
                              "To satisfy the Java compiler's requirement for private methods.",
                              "To prevent accidental or reflective instantiation (e.g., via reflection using setAccessible(true)) of a class that should only contain static utility functions.",
                              "To enable memory caching for the class.",
                              "Because public constructors are illegal in utility classes."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Even with a private constructor, an external library or reflective call can invoke constructor.setAccessible(true). Throwing an AssertionError inside the constructor guarantees that no instances can ever be created under any circumstances. (الفئات المساعدة يجب ألا يُنشأ منها كائنات أبداً؛ ورمي AssertionError داخل المنشئ الخاص يضمن منع الإنشاء حتى لو تم استخدام Reflection لتجاوز private)."
          },
          {
                    "id": "q6",
                    "question": "What exception is typically thrown by collections when a caller attempts to modify an unmodifiable list?\n\nList<String> list = List.of(\"A\", \"B\");\nlist.add(\"C\"); // What is thrown?",
                    "options": [
                              "java.lang.IllegalArgumentException",
                              "java.lang.UnsupportedOperationException",
                              "java.lang.IndexOutOfBoundsException",
                              "java.lang.IllegalStateException"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! The Java Collections Framework uses UnsupportedOperationException (an unchecked exception) to indicate that an optional operation (like add, set, or remove) is not supported by the underlying immutable collection implementation. (تستخدم مجموعات جافا غير القابلة للتعديل استثناء UnsupportedOperationException لمنع أي محاولة لإضافة أو تعديل عناصرها)."
          },
          {
                    "id": "q7",
                    "question": "What is printed by this code snippet?\n\npublic class RethrowTrace {\n    public static void process() {\n        try {\n            throw new IllegalArgumentException(\"Bad value\");\n        } catch (IllegalArgumentException e) {\n            System.out.print(\"Logged \");\n            throw e; // Rethrow\n        }\n    }\n    public static void main(String[] args) {\n        try {\n            process();\n        } catch (IllegalArgumentException e) {\n            System.out.println(\"CaughtInMain\");\n        }\n    }\n}",
                    "options": [
                              "Logged CaughtInMain",
                              "CaughtInMain Logged",
                              "Logged followed by program crash",
                              "Compile-time error: 'throw e' must be enclosed in finally."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! Inside process(), the exception is thrown, caught, prints 'Logged ', and rethrown using 'throw e'. The caller main() catches that rethrown exception in its own try-catch and prints 'CaughtInMain'. Output: 'Logged CaughtInMain'. (يلتقط process الخطأ ويطبع Logged ثم يعيد رمي نفس الكائن بـ throw e، فيستقبله بلوك catch في main ويطبع CaughtInMain)."
          },
          {
                    "id": "q8",
                    "question": "What is the requirement when using 'throw' with a CHECKED exception (like IOException)?\n\npublic void saveFile() {\n    throw new java.io.IOException(\"Disk write failed\"); // Line 2\n}",
                    "options": [
                              "No requirement; checked exceptions can be thrown anywhere without declaration.",
                              "The method must either enclose the throw inside a try-catch block or declare 'throws java.io.IOException' in its method signature, otherwise compilation fails.",
                              "The class must implement java.io.Serializable.",
                              "Checked exceptions can only be thrown from main."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Because IOException is a checked exception, throwing it requires complying with the 'catch or declare' rule. The enclosing method must either handle it with try-catch or explicitly declare 'throws IOException'. (لأن IOException استثناء مفحوص، يشترط المترجم معالجته بـ try-catch أو إعلانه في ترويسة الدالة عبر throws وإلا يفشل التصريف)."
          },
          {
                    "id": "q9",
                    "question": "What is the architectural principle known as 'Fail-Fast' and how does 'throw' support it?\n(ما هو مبدأ 'الفشل السريع' Fail-Fast وكيف تدعمه الكلمة المفتاحية throw؟)",
                    "options": [
                              "Running unit tests as quickly as possible.",
                              "Validating inputs and state immediately at the entrance of a method and throwing an explicit exception on invalid parameters, preventing corrupted state from spreading deep into the system before failing.",
                              "Ignoring errors so the application finishes faster.",
                              "Shutting down the server whenever CPU load exceeds 50%."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! The fail-fast design principle mandates checking preconditions and invariants immediately. If inputs are invalid, throw an exception immediately at the boundary rather than continuing with corrupted data that causes subtle bugs far away from the root cause. (مبدأ الفشل السريع يقضي بالتحقق الفوري من صحة المدخلات في بداية الدالة ورمي استثناء صريح عند وجود أي خلل لمنع تسرب البيانات الفاسدة إلى عمق النظام)."
          },
          {
                    "id": "q10",
                    "question": "What is the recommended practice for handling unexpected enum values in a switch statement to ensure exhaustiveness?\n\nswitch (paymentType) {\n    case CREDIT_CARD: processCard(); break;\n    case PAYPAL: processPaypal(); break;\n    default:\n        // What should be placed here?\n}",
                    "options": [
                              "System.out.println(\"Unknown type\");",
                              "throw new IllegalArgumentException(\"Unsupported payment type: \" + paymentType);",
                              "return null;",
                              "Do nothing."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Throwing an IllegalArgumentException (or IllegalStateException) in the default branch defends against bugs when new enum values are added in the future but not yet handled by this switch, failing fast with a clear explanation. (رمي استثناء صريح في فرع default يضمن الحماية الدفاعية إذا أُضيفت قيم جديدة مستقبلاً للـ enum ولم يتم تحديث الـ switch، مما يمنع المرور الصامت غير المقصود)."
          },
          {
                    "id": "q11",
                    "question": "What happens when compiling and running this code?\n\npublic class ConstructorGuard {\n    private final int capacity;\n    public ConstructorGuard(int capacity) {\n        if (capacity <= 0) {\n            throw new IllegalArgumentException(\"Capacity must be positive\");\n        }\n        this.capacity = capacity;\n    }\n    public static void main(String[] args) {\n        ConstructorGuard guard = null;\n        try {\n            guard = new ConstructorGuard(-10);\n        } catch (IllegalArgumentException e) {\n            System.out.println(\"Guard is: \" + guard);\n        }\n    }\n}",
                    "options": [
                              "It compiles and prints 'Guard is: null'.",
                              "It compiles and prints an object memory address.",
                              "Compile-time error: constructors cannot throw exceptions.",
                              "NullPointerException is thrown."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! If a constructor throws an exception before completion, object initialization fails and no object reference is returned. The assignment to variable 'guard' never occurs, so 'guard' remains null. The catch block prints 'Guard is: null'. (عندما يرمي المنشئ استثناءً يفشل إنشاء الكائن تماماً ولا يُرجع أي مرجع، فيظل المتغير guard بقيمته null وتتم طباعتها بنجاح)."
          },
          {
                    "id": "q12",
                    "question": "Can an exception be thrown from inside a lambda expression in Java?\n\nRunnable r = () -> {\n    throw new RuntimeException(\"Lambda failed\");\n};",
                    "options": [
                              "No, lambda expressions cannot contain throw statements.",
                              "Yes, any unchecked exception (RuntimeException or Error) can be thrown directly from a lambda, but checked exceptions can only be thrown if the target functional interface declares them in its method signature.",
                              "Only if the lambda is marked with @Throws.",
                              "Only inside streams."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Unchecked exceptions can always be thrown inside lambdas. However, a checked exception can only be thrown from a lambda if the single abstract method of the functional interface declares that checked exception (e.g. Callable declares throws Exception, but Runnable does not). (يمكن إلقاء الاستثناءات غير المفحوصة داخل لامبدا بحرية، بينما لا يمكن إلقاء استثناء مفحوص إلا إذا كانت واجهة الدالة الوظيفية مثل Callable تعلن عنه في ترويستها)."
          },
          {
                    "id": "q13",
                    "question": "What is printed by this code?\n\npublic class CondThrow {\n    public static int divide(int a, int b) {\n        if (b == 0) throw new ArithmeticException(\"Zero divisor\");\n        return a / b;\n    }\n    public static void main(String[] args) {\n        try {\n            System.out.print(divide(10, 2) + \" \");\n            System.out.print(divide(10, 0) + \" \");\n            System.out.print(divide(10, 5));\n        } catch (ArithmeticException e) {\n            System.out.print(\"Caught\");\n        }\n    }\n}",
                    "options": [
                              "5 0 Caught",
                              "5 Caught",
                              "5 5 Caught",
                              "Caught"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! divide(10, 2) prints '5 '. Then divide(10, 0) throws ArithmeticException, immediately interrupting the try block and skipping divide(10, 5). The catch block intercepts the exception and prints 'Caught'. Output: '5 Caught'. (يتم تنفيذ القسمة الأولى بنجاح وطباعة 5، وعند استدعاء القسمة على صفر يُرمى الاستثناء فوراً ويتم تخطي الاستدعاء الثالث، ثم يطبع catch كلمة Caught)."
          },
          {
                    "id": "q14",
                    "question": "Which of the following creates and throws a custom exception with a message AND an underlying cause?\n(أي من الخيارات التالية ينشئ ويرمي استثناءً مخصصاً يحمل رسالة مع ربط الاستثناء الأصلي المسبب له؟)",
                    "options": [
                              "throw new OrderException(\"Payment failed\").addCause(sqlEx);",
                              "throw new OrderException(\"Payment failed\", sqlEx);",
                              "throw OrderException(sqlEx, \"Payment failed\");",
                              "throw new OrderException(sqlEx.getMessage());"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Standard Java exception constructors follow the convention of accepting '(String message, Throwable cause)', allowing you to instantiate and throw the chained exception in a single clean expression: 'throw new OrderException(\"Payment failed\", sqlEx);'. (تتبع فئات الاستثناءات النمط القياسي باستقبال رسالة نصية وكائن الاستثناء الأصلي معاً في المنشئ: new CustomException(msg, cause))."
          },
          {
                    "id": "q15",
                    "question": "Why should you avoid throwing generic 'java.lang.Exception' or 'java.lang.Throwable' in application code?\n(لماذا يجب تجنب رمي الفئات العامة مثل Exception أو Throwable مباشرة داخل التطبيقات؟)",
                    "options": [
                              "Because it makes the jar file larger.",
                              "Throwing generic Exception obscures the nature of the error, forces callers to catch generic Exception (which inadvertently catches unrelated errors), and prevents callers from writing granular, targeted recovery logic.",
                              "Because Java 11 deprecated java.lang.Exception.",
                              "It disables JIT compiler optimizations."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Throwing raw Exception or Throwable loses semantic specificity, forcing callers to catch all exceptions generically and preventing them from distinguishing between specific error conditions (such as invalid user input vs network timeout). (رمي Exception العامة يفقد الخطأ معناه الدقيق ويجبر المستدعي على التقاط كل شيء بصورة عامة مما يحرمه من كتابة استجابات ومعالجات دقيقة ومخصصة لكل نوع خلل)."
          }
]
        }
      ]
    }
  ];
})();
