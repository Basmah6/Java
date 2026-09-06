/**
 * Java Curriculum Module - Part 22
 * Topics:
 * 43. Java Try-with-resources
 * 44. Java File Handling
 * 
 * 100% Offline, Pure JavaScript. Complete educational content with full bilingual (English & Arabic) explanations.
 */

(function () {
  'use strict';

  window.JAVA_TOPICS_PART22 = [
    /* ==========================================================================
       TOPIC 43: Java Try-with-resources
       ========================================================================== */
    {
      id: "try-with-resources",
      title: "43. Java Try-with-resources",
      description: "Complete Guide to Java Try-with-resources (ARM): AutoCloseable & Closeable contracts, syntax mechanics, multiple resources closure order, suppressed exceptions retrieval, Java 9 effectively final enhancement, and avoiding memory leaks.",
      lessons: [
        {
          id: "try-with-resources-mastery",
          title: "Complete Guide to Try-with-resources",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "Java Try-with-resources (Automatic Resource Management) (بنية Try-with-resources في جافا)"
            },
            {
              type: "paragraph",
              text: "Introduced in Java 7, Try-with-resources (also known as Automatic Resource Management or ARM) is a try statement that declares one or more resources. A resource is an object that must be closed after the program is finished with it (such as files, sockets, database connections). The try-with-resources statement ensures that each resource is automatically closed at the end of the statement, eliminating the verbose and bug-prone 'finally' cleanup blocks."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "قُدمت بنية Try-with-resources في إصدار جافا 7 لإدارة الموارد تلقائياً (Automatic Resource Management). المورد هو أي كائن يمسك بملف أو اتصال شبكي أو قاعدة بيانات ويتطلب إغلاقاً حتمياً بعد الانتهاء منه. تضمن هذه الجملة إغلاق كل الموارد المفتوحة تلقائياً وبأمان تام بمجرد الخروج من بلوك try، مما يغني تماماً عن كتابة بلوكات finally اليدوية المعقدة والمعرضة للأخطاء."
            },
            {
              type: "paragraph",
              text: "The Contract: Any object initialized inside the try parentheses MUST implement either 'java.lang.AutoCloseable' or 'java.io.Closeable'. When exiting the try block (normally or exceptionally), the JVM calls 'close()' in REVERSE order of declaration. If an exception occurs in try AND in close(), the close() exception is attached as a 'suppressed exception' without masking the original."
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
              text: "Example 1: Basic Try-with-resources Syntax (المثال 1: الصياغة الأساسية لبنية try-with-resources)"
            },
            {
              type: "paragraph",
              text: "Declaring a single AutoCloseable resource directly within the try parentheses."
            },
            {
              type: "code",
              language: "java",
              filename: "BasicTryWithResourcesDemo.java",
              code: `public class BasicTryWithResourcesDemo {
    static class SimpleResource implements AutoCloseable {
        public SimpleResource() {
            System.out.println("1. Resource acquired.");
        }

        public void doWork() {
            System.out.println("2. Resource performing tasks...");
        }

        @Override
        public void close() {
            System.out.println("3. Resource closed automatically by JVM!");
        }
    }

    public static void main(String[] args) {
        System.out.println("Entering try-with-resources:");
        try (SimpleResource res = new SimpleResource()) {
            res.doWork();
        }
        System.out.println("4. After try-with-resources block completed.");
    }
}`,
              output: `Entering try-with-resources:
1. Resource acquired.
2. Resource performing tasks...
3. Resource closed automatically by JVM!
4. After try-with-resources block completed.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "The JVM implicitly invokes res.close() right before control exits the try block, even without any explicit finally block."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "يقوم الـ JVM باستدعاء دالة close() تلقائياً فور مغادرة بلوك try دون الحاجة لكتابة بلوك finally يدوياً."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Multiple Resources and Reverse Closure Order (المثال 2: موارد متعددة وترتيب الإغلاق العكسي)"
            },
            {
              type: "paragraph",
              text: "Declaring multiple resources separated by semicolons; they close in reverse order of initialization (LIFO)."
            },
            {
              type: "code",
              language: "java",
              filename: "MultipleResourcesOrderDemo.java",
              code: `public class MultipleResourcesOrderDemo {
    static class LabeledResource implements AutoCloseable {
        private final String name;
        LabeledResource(String name) {
            this.name = name;
            System.out.println("Opened: [" + name + "]");
        }
        @Override
        public void close() {
            System.out.println("Closed: [" + name + "]");
        }
    }

    public static void main(String[] args) {
        System.out.println("Opening resources in order A, then B, then C:");
        try (LabeledResource a = new LabeledResource("Resource-A");
             LabeledResource b = new LabeledResource("Resource-B");
             LabeledResource c = new LabeledResource("Resource-C")) {
            System.out.println("--> Working with all resources simultaneously.");
        }
        System.out.println("All resources safely finalized.");
    }
}`,
              output: `Opening resources in order A, then B, then C:
Opened: [Resource-A]
Opened: [Resource-B]
Opened: [Resource-C]
--> Working with all resources simultaneously.
Closed: [Resource-C]
Closed: [Resource-B]
Closed: [Resource-A]
All resources safely finalized.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "Notice the closure order: C is closed first, then B, then A. This reverse order ensures dependent wrappers close before their underlying sources."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "يتم الإغلاق بترتيب عكسي تماماً (C ثم B ثم A)، مما يضمن إغلاق الطبقات الخارجية قبل الموارد الأصلية التي تعتمد عليها."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Automatic Closure During Exceptions (المثال 3: الإغلاق التلقائي المؤكد حتى عند وقوع أخطاء)"
            },
            {
              type: "paragraph",
              text: "Resources close before the catch block executes, ensuring cleanup is complete before error recovery."
            },
            {
              type: "code",
              language: "java",
              filename: "ExceptionInTryDemo.java",
              code: `public class ExceptionInTryDemo {
    static class SafeDbConnection implements AutoCloseable {
        @Override
        public void close() {
            System.out.println("2. Connection safely closed in close() method.");
        }
    }

    public static void main(String[] args) {
        try (SafeDbConnection conn = new SafeDbConnection()) {
            System.out.println("1. Querying database table...");
            throw new RuntimeException("Query failed due to timeout!");
        } catch (RuntimeException e) {
            System.out.println("3. Caught in catch block: " + e.getMessage());
        }
        System.out.println("4. Method continues.");
    }
}`,
              output: `1. Querying database table...
2. Connection safely closed in close() method.
3. Caught in catch block: Query failed due to timeout!
4. Method continues.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "close() executes BEFORE entering the catch block! This guarantees that database transactions or locks are already released."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "تُستدعى دالة close() قبل الدخول إلى بلوك catch، مما يضمن تحرير الموارد والأقفال قبل البدء في معالجة الخطأ."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Suppressed Exceptions Retrieval (Throwable.getSuppressed()) (المثال 4: استرجاع الاستثناءات المكبوتة getSuppressed)"
            },
            {
              type: "paragraph",
              text: "When both the try body and close() throw an exception, try-with-resources suppresses the close() exception and attaches it to the primary."
            },
            {
              type: "code",
              language: "java",
              filename: "SuppressedExceptionsDemo.java",
              code: `public class SuppressedExceptionsDemo {
    static class FaultyResource implements AutoCloseable {
        @Override
        public void close() throws Exception {
            // Secondary exception thrown during close
            throw new IllegalStateException("Close failed: Network socket refused shutdown!");
        }
    }

    public static void main(String[] args) {
        try (FaultyResource res = new FaultyResource()) {
            // Primary exception thrown during business logic
            throw new ArithmeticException("Primary computation failed!");
        } catch (Exception primary) {
            System.out.println("Primary Exception Caught: " + primary);
            
            // Retrieve suppressed exceptions attached by try-with-resources
            Throwable[] suppressed = primary.getSuppressed();
            System.out.println("Number of Suppressed Exceptions: " + suppressed.length);
            for (Throwable t : suppressed) {
                System.out.println(" -> Suppressed: " + t.getMessage());
            }
        }
    }
}`,
              output: `Primary Exception Caught: java.lang.ArithmeticException: Primary computation failed!
Number of Suppressed Exceptions: 1
 -> Suppressed: Close failed: Network socket refused shutdown!`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "Unlike traditional finally (which masks the primary exception if finally throws), try-with-resources preserves the primary and attaches secondary exceptions via getSuppressed()."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "على عكس finally التقليدي الذي كان يمحو الخطأ الأساسي، تحتفظ try-with-resources بالخطأ الأساسي وترفق أخطاء الإغلاق عبر getSuppressed()."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Java 9+ Effectively Final Resource Enhancement (المثال 5: تحسين جافا 9 للمتغيرات النهائية فعلياً)"
            },
            {
              type: "paragraph",
              text: "Since Java 9, resources declared outside the try statement can be referenced directly if they are effectively final."
            },
            {
              type: "code",
              language: "java",
              filename: "Java9EffectivelyFinalDemo.java",
              code: `public class Java9EffectivelyFinalDemo {
    static class CustomLogger implements AutoCloseable {
        public void log(String msg) { System.out.println("[LOG] " + msg); }
        @Override
        public void close() { System.out.println("[CLEANUP] Logger flushed and closed."); }
    }

    public static void main(String[] args) {
        // Resource initialized outside the try statement
        CustomLogger logger = new CustomLogger();

        // In Java 9+, we pass the existing variable reference directly!
        try (logger) {
            logger.log("Application started.");
            logger.log("Processing payload.");
        } // logger is automatically closed here!

        System.out.println("Try-with-resources finished.");
    }
}`,
              output: `[LOG] Application started.
[LOG] Processing payload.
[CLEANUP] Logger flushed and closed.
Try-with-resources finished.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "Java 9 eliminated the need to declare redundant aliases like 'try (CustomLogger l2 = logger)'. You can simply write 'try (logger)'."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "منذ جافا 9، لم تعد بحاجة لإعادة تعريف متغير جديد داخل القوسين، بل يكفي تمرير المتغير المعرف مسبقاً إذا كان effectively final."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Custom AutoCloseable with Idempotent close() (المثال 6: تطبيق AutoCloseable مخصص بإغلاق أحادي)"
            },
            {
              type: "paragraph",
              text: "AutoCloseable.close() should be idempotent — calling it multiple times should have no harmful side effect."
            },
            {
              type: "code",
              language: "java",
              filename: "IdempotentCloseDemo.java",
              code: `public class IdempotentCloseDemo {
    static class IdempotentResource implements AutoCloseable {
        private boolean closed = false;

        public void write(String data) {
            if (closed) throw new IllegalStateException("Resource is closed!");
            System.out.println("Data written: " + data);
        }

        @Override
        public void close() {
            if (!closed) {
                closed = true;
                System.out.println("Resource closed for the first time.");
            } else {
                System.out.println("Resource was already closed; ignoring redundant call.");
            }
        }
    }

    public static void main(String[] args) {
        IdempotentResource res = new IdempotentResource();
        try (res) {
            res.write("Order #992");
        }
        // Manual redundant call to test idempotency
        res.close();
    }
}`,
              output: `Data written: Order #992
Resource closed for the first time.
Resource was already closed; ignoring redundant call.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "The official AutoCloseable specification strongly recommends that close() be idempotent so multiple calls are safe."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "توصي مواصفات AutoCloseable الرسمية بأن تكون دالة close() متكررة الأمان (Idempotent) بحيث لا يؤدي تكرار استدعائها إلى مشاكل."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: AutoCloseable vs Closeable Comparison (المثال 7: الفرق بين AutoCloseable و Closeable)"
            },
            {
              type: "paragraph",
              text: "AutoCloseable (Java 7) throws Exception, whereas Closeable (Java 5) is restricted to IOException."
            },
            {
              type: "code",
              language: "java",
              filename: "AutoCloseableVsCloseableDemo.java",
              code: `import java.io.Closeable;
import java.io.IOException;

public class AutoCloseableVsCloseableDemo {
    // java.io.Closeable: throws IOException (Classic IO streams)
    static class LegacyResource implements Closeable {
        @Override
        public void close() throws IOException {
            System.out.println("Legacy Closeable closed (throws IOException).");
        }
    }

    // java.lang.AutoCloseable: throws Exception (General purpose, can also throw nothing)
    static class ModernResource implements AutoCloseable {
        @Override
        public void close() { // Specialized: doesn't declare any checked exception!
            System.out.println("Modern AutoCloseable closed without checked exceptions.");
        }
    }

    public static void main(String[] args) {
        // Modern resource doesn't even force a catch block!
        try (ModernResource m = new ModernResource()) {
            System.out.println("Using modern resource...");
        }

        // Legacy resource forces handling of IOException
        try (LegacyResource l = new LegacyResource()) {
            System.out.println("Using legacy resource...");
        } catch (IOException e) {
            System.out.println("Caught IO: " + e.getMessage());
        }
    }
}`,
              output: `Using modern resource...
Modern AutoCloseable closed without checked exceptions.
Using legacy resource...
Legacy Closeable closed (throws IOException).`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "If your close() method doesn't throw checked exceptions, omit 'throws Exception' in the override so callers don't need a catch block."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "إذا كانت دالة close() لديك لا ترمي استثناءً مفحوصاً، احذف throws Exception من التجاوز لتعفي المستدعي من كتابة catch."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Try-With-Resources with Both Catch and Finally (المثال 8: دمج try-with-resources مع catch و finally)"
            },
            {
              type: "paragraph",
              text: "You can still add explicit catch and finally blocks to a try-with-resources statement."
            },
            {
              type: "code",
              language: "java",
              filename: "FullArmBlockDemo.java",
              code: `public class FullArmBlockDemo {
    static class ManagedPort implements AutoCloseable {
        @Override
        public void close() {
            System.out.println("2. [ARM] Auto-closing ManagedPort.");
        }
    }

    public static void main(String[] args) {
        try (ManagedPort port = new ManagedPort()) {
            System.out.println("1. Using ManagedPort in try.");
            throw new RuntimeException("Port connection drop!");
        } catch (RuntimeException e) {
            System.out.println("3. [CATCH] Caught error: " + e.getMessage());
        } finally {
            System.out.println("4. [FINALLY] Explicit finally block executed last.");
        }
    }
}`,
              output: `1. Using ManagedPort in try.
2. [ARM] Auto-closing ManagedPort.
3. [CATCH] Caught error: Port connection drop!
4. [FINALLY] Explicit finally block executed last.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "Execution order: 1) Try body; 2) Automatic close(); 3) Explicit catch blocks; 4) Explicit finally block."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "ترتيب التنفيذ الدقيق: 1) محتوى try؛ 2) إغلاق الموارد تلقائياً بـ close؛ 3) معالجة الخطأ في catch؛ 4) تنفيذ بلوك finally أخيراً."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Nesting Try-with-resources Blocks (المثال 9: تداخل جمل try-with-resources المتعددة)"
            },
            {
              type: "paragraph",
              text: "Managing distinct scopes where a secondary resource depends conditionally on the first."
            },
            {
              type: "code",
              language: "java",
              filename: "NestedArmDemo.java",
              code: `public class NestedArmDemo {
    static class OuterResource implements AutoCloseable {
        public void ping() { System.out.println("Outer resource alive."); }
        @Override public void close() { System.out.println("Outer resource closed."); }
    }

    static class InnerResource implements AutoCloseable {
        public void pong() { System.out.println("Inner resource alive."); }
        @Override public void close() { System.out.println("Inner resource closed."); }
    }

    public static void main(String[] args) {
        try (OuterResource outer = new OuterResource()) {
            outer.ping();
            try (InnerResource inner = new InnerResource()) {
                inner.pong();
            }
            System.out.println("Inner scope exited.");
        }
        System.out.println("All scopes finished.");
    }
}`,
              output: `Outer resource alive.
Inner resource alive.
Inner resource closed.
Inner scope exited.
Outer resource closed.
All scopes finished.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "Nested ARM statements allow freeing temporary child resources early while retaining parent resources."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "تسمح بنية ARM المتداخلة بتحرير الموارد الفرعية المؤقتة مبكراً مع استمرار عمل الموارد الأبوية."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Concurrency Lock as an AutoCloseable Resource (المثال 10: تحويل أقفال التزامن إلى AutoCloseable)"
            },
            {
              type: "paragraph",
              text: "An elegant design pattern: wrapping ReentrantLock in an AutoCloseable token for leak-free locking."
            },
            {
              type: "code",
              language: "java",
              filename: "AutoLockDemo.java",
              code: `import java.util.concurrent.locks.ReentrantLock;

public class AutoLockDemo {
    public static class AutoLock implements AutoCloseable {
        private final ReentrantLock lock;

        public AutoLock(ReentrantLock lock) {
            this.lock = lock;
            this.lock.lock();
            System.out.println("Lock acquired.");
        }

        @Override
        public void close() {
            this.lock.unlock();
            System.out.println("Lock safely released via AutoCloseable!");
        }
    }

    private static final ReentrantLock myLock = new ReentrantLock();

    public static void criticalSection() {
        try (AutoLock ignored = new AutoLock(myLock)) {
            System.out.println("Executing thread-safe operation inside ARM...");
        }
    }

    public static void main(String[] args) {
        criticalSection();
        System.out.println("Is locked outside block: " + myLock.isLocked());
    }
}`,
              output: `Lock acquired.
Executing thread-safe operation inside ARM...
Lock safely released via AutoCloseable!
Is locked outside block: false`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "This pattern guarantees that locks are always unlocked without needing manual try-finally blocks across your codebase."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "يضمن هذا النمط تحرير أقفال التزامن تلقائياً دون الحاجة لكتابة try-finally يدوياً في كل مكان."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Enterprise Database and Audit Stream Auto-Management (المثال 11: إدارة اتصالات قواعد البيانات وسجلات التدقيق تلقائياً)"
            },
            {
              type: "paragraph",
              text: "Comprehensive enterprise simulation: coordinating a simulated database session, query cursor, and audit logger."
            },
            {
              type: "code",
              language: "java",
              filename: "EnterpriseArmCoordinatorDemo.java",
              code: `public class EnterpriseArmCoordinatorDemo {
    static class AuditLogger implements AutoCloseable {
        public void record(String action) { System.out.println("[AUDIT] " + action); }
        @Override public void close() { System.out.println("[AUDIT] Audit buffer flushed to disk."); }
    }

    static class DbSession implements AutoCloseable {
        public void execute(String sql) { System.out.println("[DB] Executed: " + sql); }
        @Override public void close() { System.out.println("[DB] Connection returned to HikariCP pool."); }
    }

    public static void performAuditedQuery(String query) {
        try (AuditLogger auditor = new AuditLogger();
             DbSession session = new DbSession()) {
            auditor.record("Executing query: " + query);
            session.execute(query);
            auditor.record("Query executed successfully.");
        }
    }

    public static void main(String[] args) {
        System.out.println("=== Starting Enterprise Transaction ===");
        performAuditedQuery("SELECT * FROM payments WHERE status = 'PENDING'");
        System.out.println("=== Transaction Completed Cleanly ===");
    }
}`,
              output: `=== Starting Enterprise Transaction ===
[AUDIT] Executing query: SELECT * FROM payments WHERE status = 'PENDING'
[DB] Executed: SELECT * FROM payments WHERE status = 'PENDING'
[AUDIT] Query executed successfully.
[DB] Connection returned to HikariCP pool.
[AUDIT] Audit buffer flushed to disk.
=== Transaction Completed Cleanly ===`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "Notice that DbSession closes before AuditLogger, allowing the logger to capture the final completion state."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "لاحظ إغلاق جلسة قاعدة البيانات أولاً ثم مسجل التدقيق، مما يضمن تسجيل كل الأحداث حتى لحظة النهاية."
            },

            /* Common Mistakes */
            {
              type: "heading",
              level: 2,
              text: "Common Mistakes & Important Notes (أخطاء شائعة وملاحظات مهمة)"
            },
            {
              type: "list",
              ordered: false,
              items: [
                "Mistake 1: Trying to put an object that does NOT implement AutoCloseable or Closeable inside try (...). This results in a compilation error.",
                "خطأ 1: محاولة وضع كائن لا يطبق AutoCloseable أو Closeable داخل قوسي try، مما يسبب خطأ وقت الترجمة.",
                "Mistake 2: Manually calling res.close() inside the try-with-resources block. This is redundant and unnecessary.",
                "خطأ 2: استدعاء close() يدوياً داخل بلوك try-with-resources، وهو تكرار لا داعي له.",
                "Mistake 3: Forgetting that resources are closed in REVERSE order of declaration. If Resource B depends on Resource A, declare A first so B closes first."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Temporary File Sandbox Sentinel (التحدي العملي: حارس بيئة الملفات المؤقتة)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Build a sandbox manager: 1) Implement 'class TempSandbox implements AutoCloseable'; 2) Constructor prints 'Sandbox created for job: <id>'; 3) Method 'executeTask(boolean fail)' prints task status; if fail is true, throws RuntimeException('Task exploded'); 4) In close(), print 'Sandbox purged cleanly'; 5) In main(), run both success and failure tasks inside try-with-resources to prove the sandbox is always purged."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: صمم حارساً للبيئة المؤقتة: 1) فئة TempSandbox تطبق AutoCloseable؛ 2) المنشئ يطبع إنشاء البيئة لرقم المهمة؛ 3) دالة executeTask تفحص فشل المهمة وترمي خطأ؛ 4) دالة close() تطبع مسح البيئة؛ 5) في main شغل الحالتين بـ try-with-resources لتأكيد الحذف دائماً."
            },
            {
              type: "code",
              language: "java",
              filename: "SandboxChallenge.java",
              code: `public class SandboxChallenge {
    static class TempSandbox implements AutoCloseable {
        private final String jobId;

        public TempSandbox(String jobId) {
            this.jobId = jobId;
            System.out.println("Sandbox created for job: " + jobId);
        }

        public void executeTask(boolean fail) {
            System.out.println("Executing payload for job " + jobId + "...");
            if (fail) {
                throw new RuntimeException("Task exploded unexpectedly in job " + jobId);
            }
            System.out.println("Payload completed with code 0.");
        }

        @Override
        public void close() {
            System.out.println("[PURGE] Sandbox purged cleanly for job: " + jobId);
        }
    }

    public static void main(String[] args) {
        System.out.println("--- Test 1: Successful Job ---");
        try (TempSandbox box1 = new TempSandbox("JOB-101")) {
            box1.executeTask(false);
        }

        System.out.println("\n--- Test 2: Failing Job ---");
        try (TempSandbox box2 = new TempSandbox("JOB-102")) {
            box2.executeTask(true);
        } catch (RuntimeException e) {
            System.out.println("Caught crash: " + e.getMessage());
        }
    }
}`,
              output: `--- Test 1: Successful Job ---
Sandbox created for job: JOB-101
Executing payload for job JOB-101...
Payload completed with code 0.
[PURGE] Sandbox purged cleanly for job: JOB-101

--- Test 2: Failing Job ---
Sandbox created for job: JOB-102
Executing payload for job JOB-102...
[PURGE] Sandbox purged cleanly for job: JOB-102
Caught crash: Task exploded unexpectedly in job JOB-102`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "The try-with-resources statement ensures that close() executes and purges the sandbox even when an unhandled exception terminates the task."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "تضمن بنية try-with-resources استدعاء دالة close() وتطهير البيئة المؤقتة حتى عند حدوث انهيار مفاجئ في كود المعالجة."
            }
          ],
          quiz: [
          {
                    "id": "q1",
                    "question": "What interface MUST a class implement so that its instances can be managed inside a try-with-resources statement?\n(ما الواجهة التي يجب أن يطبقها الصنف ليُدار تلقائياً داخل جملة try-with-resources؟)",
                    "options": [
                              "java.lang.AutoCloseable (or java.io.Closeable)",
                              "java.io.Serializable",
                              "java.lang.Cloneable",
                              "java.lang.Runnable"
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! try-with-resources accepts any type implementing java.lang.AutoCloseable (introduced in Java 7) or java.io.Closeable (which extends AutoCloseable). (تقبل try-with-resources أي كائن يطبق واجهة AutoCloseable أو Closeable)."
          },
          {
                    "id": "q2",
                    "question": "In what order are resources closed when multiple resources are declared in a single try-with-resources header?\n(بأي ترتيب يتم إغلاق الموارد عند الإعلان عن عدة موارد معاً في رأس try-with-resources؟)",
                    "options": [
                              "In the exact order they were declared (first to last).",
                              "In the reverse order of their declaration (last to first).",
                              "Simultaneously in parallel threads.",
                              "In random order determined by the JVM garbage collector."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Resources are closed in the REVERSE order of their declaration (like unwinding a stack). This guarantees dependent resources are closed before the parent resources they depend on. (تُغلق الموارد بترتيب عكسي لترتيب إعلانها لضمان إغلاق المورد التابع قبل المورد الأصلي)."
          },
          {
                    "id": "q3",
                    "question": "What is the exact execution order of blocks when an exception occurs inside a try-with-resources statement containing catch and finally blocks?\n(ما هو الترتيب الدقيق للتنفيذ عند حدوث استثناء في try-with-resources تحتوي catch و finally؟)",
                    "options": [
                              "1. try block -> 2. catch block -> 3. resource close() -> 4. finally block",
                              "1. try block -> 2. resource close() -> 3. catch block -> 4. finally block",
                              "1. try block -> 2. finally block -> 3. catch block -> 4. resource close()",
                              "1. resource close() -> 2. try block -> 3. catch block -> 4. finally block"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Crucially, automatic resource close() is called BEFORE entering any explicitly defined catch or finally blocks. This allows catch blocks to catch exceptions thrown during close(). (تُغلق الموارد أولاً فور انتهاء try وقبل الانتقال إلى كتلة catch أو finally)."
          },
          {
                    "id": "q4",
                    "question": "What happens if BOTH the try block body throws an exception (E1) AND the automatic resource close() method throws an exception (E2)?\n(ماذا يحدث إذا رمت كتلة try استثناءً E1 وفي نفس الوقت رمت دالة close التلقائية استثناءً E2؟)",
                    "options": [
                              "E2 overwrites E1, and only E2 is thrown.",
                              "E1 is thrown as the primary exception, and E2 is attached to E1 as a suppressed exception (retrievable via E1.getSuppressed()).",
                              "Both exceptions are merged into a DoubleException.",
                              "The JVM terminates with a FatalInternalError."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Java suppresses secondary exceptions thrown during close() and attaches them to the primary exception using addSuppressed(). You can retrieve them via e.getSuppressed(). (يظل استثناء try هو الأساسي، ويُسجل استثناء close كاستثناء مكتوم Suppressed يمكن قراءته عبر getSuppressed)."
          },
          {
                    "id": "q5",
                    "question": "What will be printed when running this program?\nclass Door implements AutoCloseable {\n    private final String name;\n    Door(String name) { this.name = name; }\n    public void close() { System.out.print(\"Close-\" + name + \" \"); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        try (Door d1 = new Door(\"A\"); Door d2 = new Door(\"B\")) {\n            System.out.print(\"Inside \");\n        }\n    }\n}\n(ما هو الناتج المطبوع من البرنامج التالي؟)",
                    "options": [
                              "Inside Close-A Close-B ",
                              "Inside Close-B Close-A ",
                              "Close-B Close-A Inside ",
                              "Close-A Close-B Inside "
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! The try body runs first, printing 'Inside '. Then resources are closed in reverse order: d2 ('Close-B ') followed by d1 ('Close-A '). (يُنفذ متن try أولاً، ثم تُغلق الموارد بالترتيب العكسي: B أولاً ثم A)."
          },
          {
                    "id": "q6",
                    "question": "Starting with Java 9, which of the following is a valid enhancement to the try-with-resources syntax?\n(ما التحسين الصالح الذي أُضيف في جافا 9 إلى صياغة try-with-resources؟)",
                    "options": [
                              "You can reference pre-existing final or effectively final AutoCloseable variables directly in the try header without re-declaring them.",
                              "The try-with-resources block no longer requires parentheses.",
                              "Resources are closed automatically by the garbage collector without calling close().",
                              "Catch blocks are no longer permitted after try-with-resources."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! In Java 7 and 8, you had to declare a new variable: 'try (Reader r2 = r1)'. Since Java 9, if 'r1' is final or effectively final, you can simply write 'try (r1) { ... }'. (منذ جافا 9، يمكن تمرير متغير معرف مسبقاً طالما أنه final أو effectively final دون إعادة تعريفه)."
          },
          {
                    "id": "q7",
                    "question": "What happens if an exception is thrown while initializing the second resource in the try header?\ntry (Res r1 = new Res(\"1\"); Res r2 = new Res(\"2\")) {\n    // body\n}\n(ماذا يحدث إذا حدث استثناء أثناء تهيئة المورد الثاني في رأس try؟)",
                    "options": [
                              "r1 is automatically closed, r2's close() is never called, and the exception propagates out.",
                              "Neither resource is closed because the try block was never entered.",
                              "The JVM deadlocks waiting for r2.",
                              "r1 remains open indefinitely until garbage collected."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! If an exception occurs during the initialization of subsequent resources, Java guarantees that all already-opened resources (r1 in this case) are safely closed before propagating the exception. (تضمن جافا إغلاق الموارد التي تم فتحها بنجاح r1 إذا فشلت تهيئة مورد لاحق r2)."
          },
          {
                    "id": "q8",
                    "question": "What is the scope of a variable declared inside the try-with-resources header: 'try (BufferedReader br = ...)'?\n(ما هو نطاق رؤية المتغير المعرّف في رأس try-with-resources؟)",
                    "options": [
                              "The entire enclosing method.",
                              "Only within the try block; it is NOT accessible in catch or finally blocks.",
                              "Within the try, catch, and finally blocks of that statement.",
                              "Globally across the entire class."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Resource variables declared in the try header are scoped strictly to the try block. They cannot be referenced in catch or finally blocks because they are already closed by the time catch or finally begins. (المتغير معرّف فقط داخل كتلة try ولا يمكن الوصول إليه في catch أو finally لأنه أُغلق بالفعل)."
          },
          {
                    "id": "q9",
                    "question": "What happens if a resource reference in the try header evaluates to 'null'?\nDoor d = null;\ntry (Door resource = d) {\n    System.out.println(\"Working\");\n}\n(ماذا يحدث إذا كانت قيمة المورد تساوي null في رأس try؟)",
                    "options": [
                              "It throws a NullPointerException immediately when entering the try statement.",
                              "It throws a NullPointerException when exiting the try statement upon calling close().",
                              "It executes normally without throwing an exception; the runtime checks for null before invoking close().",
                              "It refuses to compile."
                    ],
                    "correctIndex": 2,
                    "explanation": "Correct! The generated bytecode checks if the resource is null before attempting to invoke close(). If null, close() is simply skipped without throwing NullPointerException. (تتحقق جافا داخلياً من عدم كون الكائن null قبل استدعاء close، فإذا كان null يتم تجاهله بأمان)."
          },
          {
                    "id": "q10",
                    "question": "What is the key technical difference between java.lang.AutoCloseable and java.io.Closeable?\n(ما الفرق التقني الجوهري بين الواجهتين AutoCloseable و Closeable؟)",
                    "options": [
                              "AutoCloseable.close() throws Exception, whereas Closeable.close() throws IOException and requires idempotency.",
                              "Closeable is for database connections, while AutoCloseable is only for files.",
                              "AutoCloseable can only be closed once, whereas Closeable cannot be closed.",
                              "There is no difference; they are exact aliases."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! AutoCloseable.close() declares 'throws Exception', allowing any resource to implement it. Closeable extends AutoCloseable, specializes in I/O, declares 'throws IOException', and strongly recommends idempotent close calls. (واجهة AutoCloseable تعلن throws Exception للأغراض العامة، بينما Closeable متخصصة بـ IOException وتوصي بقوة بالإغلاق المتكرر الآمن)."
          },
          {
                    "id": "q11",
                    "question": "What will this code print?\nclass BadResource implements AutoCloseable {\n    public void close() {\n        throw new IllegalStateException(\"Error in close\");\n    }\n}\npublic class Test {\n    public static void main(String[] args) {\n        try (BadResource r = new BadResource()) {\n            throw new IllegalArgumentException(\"Error in try\");\n        } catch (Exception e) {\n            System.out.println(e.getMessage() + \" | Suppressed: \" + e.getSuppressed().length);\n        }\n    }\n}\n(ما الناتج المطبوع من الكود التالي؟)",
                    "options": [
                              "Error in close | Suppressed: 0",
                              "Error in try | Suppressed: 1",
                              "Error in try | Suppressed: 0",
                              "Compilation error: cannot suppress unchecked exceptions"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! The primary exception is the IllegalArgumentException ('Error in try'). When close() throws IllegalStateException, it is caught internally and added to the primary exception's suppressed list. Hence suppressed length is 1. (الاستثناء الأساسي هو Error in try، واستثناء دالة close تم كتمه وإضافته لقائمة getSuppressed وطوله 1)."
          },
          {
                    "id": "q12",
                    "question": "Why is it critical to manage java.util.stream.Stream in a try-with-resources block when creating streams from I/O sources like Files.lines(Path)?\n(لماذا من الضروري استخدام try-with-resources مع Stream عند القراءة عبر Files.lines؟)",
                    "options": [
                              "Because Stream implements AutoCloseable, and file-backed streams keep the underlying operating system file descriptor open until close() is called.",
                              "Because Stream throws OutOfMemoryError unless closed manually.",
                              "Because terminal operations on Streams cannot execute unless closed.",
                              "Because Java will not compile Files.lines without a try block."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! Stream<T> implements AutoCloseable. While in-memory streams don't need closing, I/O-backed streams (like Files.lines and Files.walk) hold open OS file descriptors that will leak unless closed. (واجهة Stream تطبق AutoCloseable، والتدفقات المرتبطة بملفات تبقي مقبض الملف مفتوحاً في نظام التشغيل ما لم تُغلق)."
          },
          {
                    "id": "q13",
                    "question": "What happens if a return statement is executed inside the try block of a try-with-resources?\nstatic int compute() {\n    try (Door d = new Door(\"X\")) {\n        return 42;\n    }\n}\n(ماذا يحدث عند تنفيذ أمر return داخل كتلة try-with-resources؟)",
                    "options": [
                              "The method returns 42 immediately without calling d.close().",
                              "d.close() is called FIRST, and then the method returns 42.",
                              "It causes a compilation error because return is forbidden in try-with-resources.",
                              "d.close() is invoked asynchronously in the background after return."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! The resource's close() method is guaranteed to execute before the method returns the value 42 to the caller. (يتم استدعاء d.close() أولاً قبل أن تعود الدالة بالقيمة 42 للمستدعي)."
          },
          {
                    "id": "q14",
                    "question": "Can a custom class implement AutoCloseable such that its close() method does NOT throw any checked exceptions?\n(هل يمكن لصنف مخصص تطبيق AutoCloseable بحيث لا ترمي دالة close أي استثناء مفحوص؟)",
                    "options": [
                              "No, AutoCloseable strictly requires throwing Exception.",
                              "Yes, by declaring 'public void close() { ... }' without any throws clause, freeing callers from having to catch or declare exceptions.",
                              "Only if the class extends java.lang.Thread.",
                              "Yes, but only in Java 21+."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Java allows overriding methods to declare fewer or no checked exceptions (covariant throws clause). If close() declares no exceptions, callers using try-with-resources do not need a catch or throws clause! (قواعد جافا تسمح للدالة المتجاوزة بحذف throws تماماً، مما يريح المستدعي من إلزامية catch)."
          },
          {
                    "id": "q15",
                    "question": "What is the potential hazard of manually calling close() inside a try-with-resources block?\ntry (FileInputStream fis = new FileInputStream(\"data.bin\")) {\n    // do work\n    fis.close(); // manual close\n}\n(ما الخطر المحتمل من استدعاء close يدوياً داخل try-with-resources؟)",
                    "options": [
                              "It causes a compile-time syntax error.",
                              "close() will be called a second time when exiting the try block; if close() is not idempotent, it may throw an exception or corrupt state.",
                              "The file will be deleted from the filesystem.",
                              "The JVM garbage collector will be permanently disabled."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! try-with-resources will automatically call close() at the end regardless. Calling it manually causes a redundant second close call. While standard Java streams are idempotent, custom non-idempotent resources can fail. (سيتم استدعاء close تلقائياً مرة ثانية عند الخروج، وإذا لم تكن الدالة مهيأة للإغلاق المتكرر Idempotent فقد تحدث أخطاء)."
          }
]
        }
      ]
    },

    /* ==========================================================================
       TOPIC 44: Java File Handling
       ========================================================================== */
    {
      id: "java-file-handling",
      title: "44. Java File Handling",
      description: "Complete Guide to Java File Handling: The architecture of file I/O, java.io vs java.nio.file, paths and absolute vs relative references, File separators, file systems, permissions, metadata, and modern NIO.2 principles.",
      lessons: [
        {
          id: "java-file-handling-mastery",
          title: "Complete Guide to File Handling",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "Java File Handling Architecture (معمارية التعامل مع الملفات في جافا)"
            },
            {
              type: "paragraph",
              text: "File handling in Java provides mechanisms for storing, inspecting, reading, and modifying persistent data on physical storage media (hard drives, SSDs, network mounts). Java's file architecture has evolved across two major generations: 1) The classic 'java.io' package (centered around 'File', streams, and readers); and 2) The modern 'java.nio.file' (NIO.2 introduced in Java 7, centered around 'Path', 'Paths', and the utility class 'Files')."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "يوفر التعامل مع الملفات في جافا الوسائل البرمجية للوصول إلى وسائط التخزين الدائمة وقراءتها وتعديلها. مرت معمارية الملفات في جافا بمرحلتين رئيسيتين: الأولى هي الحزمة الكلاسيكية 'java.io' (المعتمدة على صنف File ومجاري البيانات Streams)، والثانية هي الحزمة الحديثة 'java.nio.file' (المعروفة بـ NIO.2 والمقدمة في جافا 7 والمعتمدة على واجهة Path والصنف المساعد Files المليء بالدوال الثابتة القوية)."
            },
            {
              type: "paragraph",
              text: "Core Concepts: 1) Path Resolution: Understanding relative (relative to Current Working Directory 'user.dir') versus absolute paths (rooted at C:\\ or /); 2) Platform Portability: Using 'File.separator' or '/' instead of hardcoded backslashes; 3) Metadata: Inspecting file permissions, timestamps, sizes, and file locks."
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
              text: "Example 1: Platform-Independent Path Separators (المثال 1: فواصل المسارات المتوافقة مع كافة أنظمة التشغيل)"
            },
            {
              type: "paragraph",
              text: "Using File.separator to build portable paths that work on both Windows and UNIX systems."
            },
            {
              type: "code",
              language: "java",
              filename: "PathSeparatorsDemo.java",
              code: `import java.io.File;

public class PathSeparatorsDemo {
    public static void main(String[] args) {
        // Platform file separator ('/' on Linux/macOS, '\\' on Windows)
        System.out.println("System File.separator: " + File.separator);
        System.out.println("System File.pathSeparator: " + File.pathSeparator);

        // BAD: Hardcoded Windows path -> fails on Linux/Docker
        // String badPath = "data\\users\\records.txt";

        // GOOD: Constructing a portable path
        String goodPath = "data" + File.separator + "users" + File.separator + "records.txt";
        System.out.println("Constructed portable path: " + goodPath);

        // EVEN BETTER: Java automatically normalizes forward slashes '/' across all platforms!
        File normalized = new File("data/users/records.txt");
        System.out.println("Normalized abstract path: " + normalized.getPath());
    }
}`,
              output: `System File.separator: /
System File.pathSeparator: :
Constructed portable path: data/users/records.txt
Normalized abstract path: data/users/records.txt`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "Java handles forward slashes '/' transparently on all operating systems, including Windows, avoiding OS compatibility issues."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "تتعامل جافا مع الشرطة المائلة '/' بسلاسة تامة على كافة الأنظمة بما فيها ويندوز، مما يجنب الكود مشاكل التوافق."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Discovering the Current Working Directory (user.dir) (المثال 2: اكتشاف مجلد العمل الحالي للبرنامج)"
            },
            {
              type: "paragraph",
              text: "Relative file paths resolve against the JVM's current working directory ('user.dir')."
            },
            {
              type: "code",
              language: "java",
              filename: "WorkingDirDemo.java",
              code: `import java.io.File;

public class WorkingDirDemo {
    public static void main(String[] args) {
        // System property user.dir
        String currentDir = System.getProperty("user.dir");
        System.out.println("Current Working Directory (user.dir): " + currentDir);

        File relativeFile = new File("app.log");
        System.out.println("Relative Path: " + relativeFile.getPath());
        System.out.println("Absolute Path: " + relativeFile.getAbsolutePath());
    }
}`,
              output: `Current Working Directory (user.dir): /workspace/app
Relative Path: app.log
Absolute Path: /workspace/app/app.log`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "Any relative path like 'app.log' is resolved relative to the folder where the java process was launched."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "أي مسار نسبي مثل 'app.log' يتم تحويله لمسار مطلق بإضافته إلى مسار المجلد الذي شُغّل منه برنامج جافا."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Modern NIO.2 Path and Paths Factory (المثال 3: استخدام واجهة Path الحديثة ومصنع Paths)"
            },
            {
              type: "paragraph",
              text: "Introducing java.nio.file.Path as the modern replacement for java.io.File."
            },
            {
              type: "code",
              language: "java",
              filename: "ModernPathDemo.java",
              code: `import java.nio.file.Path;
import java.nio.file.Paths;

public class ModernPathDemo {
    public static void main(String[] args) {
        // Creating Path instances cleanly without manual string concatenation
        Path p1 = Paths.get("logs", "2026", "september", "access.log");
        System.out.println("Path: " + p1);
        System.out.println("File Name: " + p1.getFileName());
        System.out.println("Parent: " + p1.getParent());
        System.out.println("Name Elements Count: " + p1.getNameCount());
        System.out.println("Root: " + p1.getRoot());
        System.out.println("Is Absolute: " + p1.isAbsolute());
    }
}`,
              output: `Path: logs/2026/september/access.log
File Name: access.log
Parent: logs/2026/september
Name Elements Count: 4
Root: null
Is Absolute: false`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "Path is an interface providing rich query methods (getFileName, getParent, getNameCount) without executing filesystem I/O."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "واجهة Path توفر دوال استعلامية قوية لمعاينة أجزاء المسار واسم الملف دون الحاجة للوصول الفعلي للقرص الصلب."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Normalizing and Relativizing Paths (المثال 4: تسوية وتبسيط المسارات normalize و relativize)"
            },
            {
              type: "paragraph",
              text: "Resolving redundant elements like '.' (current dir) and '..' (parent dir)."
            },
            {
              type: "code",
              language: "java",
              filename: "PathNormalizationDemo.java",
              code: `import java.nio.file.Path;
import java.nio.file.Paths;

public class PathNormalizationDemo {
    public static void main(String[] args) {
        // Path with redundant components
        Path redundant = Paths.get("/var/log/app/../backup/./reports.txt");
        System.out.println("Original:   " + redundant);

        // Normalize removes redundant '.' and '..'
        Path clean = redundant.normalize();
        System.out.println("Normalized: " + clean);

        // Relativizing: Find relative path from path A to path B
        Path pathA = Paths.get("/var/log/app");
        Path pathB = Paths.get("/var/log/backup/reports.txt");
        Path relative = pathA.relativize(pathB);
        System.out.println("Relative from A to B: " + relative);
    }
}`,
              output: `Original:   /var/log/app/../backup/./reports.txt
Normalized: /var/log/backup/reports.txt
Relative from A to B: ../backup/reports.txt`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "normalize() resolves redundant relative steps, and relativize() computes the navigation path between two locations."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "تقوم normalize بتبسيط المسار بحذف التكرارات والرجوع للخلف، بينما تحسب relativize المسار النسبي بين نقطتين."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Converting Between Legacy File and Modern Path (المثال 5: التحويل المتبادل بين File و Path)"
            },
            {
              type: "paragraph",
              text: "Seamlessly bridging legacy java.io code with modern java.nio.file APIs."
            },
            {
              type: "code",
              language: "java",
              filename: "BridgeConversionDemo.java",
              code: `import java.io.File;
import java.nio.file.Path;

public class BridgeConversionDemo {
    public static void main(String[] args) {
        // 1. Convert File -> Path using file.toPath()
        File legacyFile = new File("settings.json");
        Path modernPath = legacyFile.toPath();
        System.out.println("Converted to Path: " + modernPath.getClass().getSimpleName());

        // 2. Convert Path -> File using path.toFile()
        File convertedBack = modernPath.toFile();
        System.out.println("Converted back to File: " + convertedBack.getClass().getSimpleName());
    }
}`,
              output: `Converted to Path: UnixPath
Converted back to File: File`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "The bridge methods file.toPath() and path.toFile() allow using modern NIO utilities with older third-party libraries."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "تسمح دوال التحويل toPath() و toFile() بربط المكتبات الكلاسيكية بالأدوات الحديثة بسهولة دون أي تعقيد."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Inspecting Root File Systems and Disk Stores (المثال 6: استعراض أنظمة الملفات والأقراص المتوفرة)"
            },
            {
              type: "paragraph",
              text: "Using FileSystem and FileStore to query available disk partitions."
            },
            {
              type: "code",
              language: "java",
              filename: "FileSystemsInspectDemo.java",
              code: `import java.io.File;
import java.nio.file.FileSystems;
import java.nio.file.Path;

public class FileSystemsInspectDemo {
    public static void main(String[] args) {
        System.out.println("=== Root Directories on this Machine ===");
        Iterable<Path> roots = FileSystems.getDefault().getRootDirectories();
        for (Path root : roots) {
            System.out.println("Root partition: " + root);
        }

        // Classic File.listRoots() equivalent
        System.out.println("\n=== Classic File Roots ===");
        File[] fileRoots = File.listRoots();
        for (File f : fileRoots) {
            System.out.println("Drive: " + f.getAbsolutePath());
        }
    }
}`,
              output: `=== Root Directories on this Machine ===
Root partition: /

=== Classic File Roots ===
Drive: /`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "FileSystems.getDefault().getRootDirectories() returns all root drives ('/' on Linux, 'C:\\', 'D:\\' on Windows)."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "تُرجع دالة getRootDirectories كافة وحدات التخزين الأساسية مثل '/' في لينكس أو 'C:\\' في أنظمة ويندوز."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Safe Path Traversal Defense (Zip Slip / Path Injection) (المثال 7: الحماية من هجمات اختراق المسارات Path Traversal)"
            },
            {
              type: "paragraph",
              text: "Preventing malicious inputs like '../../etc/passwd' from accessing files outside an intended base directory."
            },
            {
              type: "code",
              language: "java",
              filename: "PathTraversalDefenseDemo.java",
              code: `import java.nio.file.Path;
import java.nio.file.Paths;

public class PathTraversalDefenseDemo {
    public static Path resolveSafePath(Path baseDir, String userInputFilename) {
        // Resolve user input against safe base directory and normalize
        Path targetPath = baseDir.resolve(userInputFilename).normalize();

        // CRITICAL SECURITY CHECK: Ensure normalized target starts with base directory!
        if (!targetPath.startsWith(baseDir.normalize())) {
            throw new SecurityException("Path Traversal Attack Detected! Target: " + targetPath);
        }
        return targetPath;
    }

    public static void main(String[] args) {
        Path uploadsDir = Paths.get("/var/data/uploads");

        // Case 1: Benign user file
        Path safe = resolveSafePath(uploadsDir, "avatar.png");
        System.out.println("Safe Resolved: " + safe);

        // Case 2: Malicious user trying to escape sandbox
        try {
            resolveSafePath(uploadsDir, "../../etc/shadow");
        } catch (SecurityException se) {
            System.out.println("Blocked: " + se.getMessage());
        }
    }
}`,
              output: `Safe Resolved: /var/data/uploads/avatar.png
Blocked: Path Traversal Attack Detected! Target: /var/etc/shadow`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "Always normalize paths and assert that targetPath.startsWith(baseDir) to defeat Path Traversal / Zip Slip vulnerabilities."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "يجب دائماً تسوية المسار والتحقق من أنه يبدأ بالمجلد المسموح به لمنع المهاجمين من قراءة ملفات النظام الحساسة."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: System Temporary Directory Discovery (المثال 8: استكشاف مجلد الملفات المؤقتة في النظام)"
            },
            {
              type: "paragraph",
              text: "Querying java.io.tmpdir for creating ephemeral working files."
            },
            {
              type: "code",
              language: "java",
              filename: "TempDirDiscoveryDemo.java",
              code: `import java.nio.file.Path;
import java.nio.file.Paths;

public class TempDirDiscoveryDemo {
    public static void main(String[] args) {
        // System property java.io.tmpdir
        String sysTmp = System.getProperty("java.io.tmpdir");
        System.out.println("System Temp Directory: " + sysTmp);

        Path tempPath = Paths.get(sysTmp, "app_cache_" + System.currentTimeMillis());
        System.out.println("Computed Session Temp Path: " + tempPath);
    }
}`,
              output: `System Temp Directory: /tmp
Computed Session Temp Path: /tmp/app_cache_1772924395000`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "Using java.io.tmpdir guarantees portable placement of temporary files across Linux (/tmp) and Windows (AppData\\Local\\Temp)."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "يوفر خاصية java.io.tmpdir مساراً آمناً ومتوافقاً لإنشاء الملفات المؤقتة سواءً في لينكس أو ويندوز."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Resolving Sibling Paths (المثال 9: استنتاج مسارات الملفات المجاورة resolveSibling)"
            },
            {
              type: "paragraph",
              text: "Creating parallel or backup file paths in the same parent directory."
            },
            {
              type: "code",
              language: "java",
              filename: "ResolveSiblingDemo.java",
              code: `import java.nio.file.Path;
import java.nio.file.Paths;

public class ResolveSiblingDemo {
    public static void main(String[] args) {
        Path original = Paths.get("/var/config/application.properties");
        System.out.println("Original config: " + original);

        // resolveSibling creates a path in the same parent directory
        Path backup = original.resolveSibling("application.properties.bak");
        System.out.println("Backup config:   " + backup);

        Path testConfig = original.resolveSibling("application-test.properties");
        System.out.println("Test config:     " + testConfig);
    }
}`,
              output: `Original config: /var/config/application.properties
Backup config:   /var/config/application.properties.bak
Test config:     /var/config/application-test.properties`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "resolveSibling(name) replaces the filename while maintaining the exact same parent directory structure."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "تتيح دالة resolveSibling استبدال اسم الملف مع الاحتفاظ بنفس المجلد الأب لإنشاء نسخ احتياطية بسهولة."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Canonical Path vs Absolute Path (المثال 10: الفرق بين المسار المطلق والمسار القياسي Canonical)"
            },
            {
              type: "paragraph",
              text: "Canonical paths resolve symbolic links and remove internal relative shortcuts."
            },
            {
              type: "code",
              language: "java",
              filename: "CanonicalVsAbsoluteDemo.java",
              code: `import java.io.File;
import java.io.IOException;

public class CanonicalVsAbsoluteDemo {
    public static void main(String[] args) throws IOException {
        File file = new File("./logs/../app.log");

        System.out.println("getPath():         " + file.getPath());
        System.out.println("getAbsolutePath(): " + file.getAbsolutePath());
        // getCanonicalPath resolves real filesystem pointers, case, and symlinks
        System.out.println("getCanonicalPath(): " + file.getCanonicalPath());
    }
}`,
              output: `getPath():         ./logs/../app.log
getAbsolutePath(): /workspace/app/./logs/../app.log
getCanonicalPath(): /workspace/app/app.log`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "getCanonicalPath() talks to the underlying operating system to resolve the absolute, unique, symbolic-link-free path."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "يتصل getCanonicalPath بنظام التشغيل لحل الروابط الرمزية وتبسيط المسار بشكل قطعي وفريد."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Enterprise Storage Router and File System Resolver (المثال 11: موجه التخزين المؤسسي ومحدد المسارات)"
            },
            {
              type: "paragraph",
              text: "Simulating a multi-tenant cloud storage dispatcher generating isolated partition paths."
            },
            {
              type: "code",
              language: "java",
              filename: "StorageRouterDemo.java",
              code: `import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;

public class StorageRouterDemo {
    static class TenantStorageRouter {
        private final Path rootStorage;

        public TenantStorageRouter(String rootPath) {
            this.rootStorage = Paths.get(rootPath).normalize();
        }

        public Path routeDocument(String tenantId, String documentType, String filename) {
            LocalDate today = LocalDate.of(2026, 9, 5);
            String year = String.valueOf(today.getYear());
            String month = String.format("%02d", today.getMonthValue());

            Path target = rootStorage.resolve(tenantId)
                                     .resolve(documentType)
                                     .resolve(year)
                                     .resolve(month)
                                     .resolve(filename)
                                     .normalize();

            // Guard against tenant directory breakout
            Path tenantBase = rootStorage.resolve(tenantId).normalize();
            if (!target.startsWith(tenantBase)) {
                throw new IllegalArgumentException("Tenant path violation!");
            }
            return target;
        }
    }

    public static void main(String[] args) {
        TenantStorageRouter router = new TenantStorageRouter("/mnt/secure_nfs");

        Path p1 = router.routeDocument("tenant_acme", "invoices", "INV-9921.pdf");
        System.out.println("ACME Invoice Path: " + p1);

        Path p2 = router.routeDocument("tenant_globex", "contracts", "CONTRACT-2026.docx");
        System.out.println("Globex Contract:   " + p2);
    }
}`,
              output: `ACME Invoice Path: /mnt/secure_nfs/tenant_acme/invoices/2026/09/INV-9921.pdf
Globex Contract:   /mnt/secure_nfs/tenant_globex/contracts/2026/09/CONTRACT-2026.docx`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "Enterprise file handling structures storage deterministically by tenant, year, and category while preventing cross-tenant directory escalation."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "تنظم معمارية التخزين المؤسسية الملفات حسب المستأجر والسنة والنوع مع تطبيق حواجز أمان تمنع تداخل مسارات العملاء."
            },

            /* Common Mistakes */
            {
              type: "heading",
              level: 2,
              text: "Common Mistakes & Important Notes (أخطاء شائعة وملاحظات مهمة)"
            },
            {
              type: "list",
              ordered: false,
              items: [
                "Mistake 1: Hardcoding Windows backslashes (e.g. \"C:\\\\data\\\\file.txt\") which crashes when running on Linux containers or Mac.",
                "خطأ 1: كتابة الشرطات المائلة العكسية الخاصة بويندوز بشكل ثابت، مما يسبب انهيار البرنامج على سيرفرات لينكس وحاويات دوكر.",
                "Mistake 2: Assuming that relative paths resolve relative to the Java source file or jar; they always resolve relative to 'user.dir' (where the command was run).",
                "خطأ 2: الاعتقاد بأن المسار النسبي يبدأ من مكان ملف الكود؛ بل يبدأ دائماً من مجلد تشغيل الأمر (user.dir).",
                "Mistake 3: Concatenating paths with string addition '+' instead of using Paths.get() or path.resolve(), which leads to double slashes or missing separators."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Secure File Path Sanitizer (التحدي العملي: مطهر المسارات الآمن)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Build a safe path builder: 1) Class 'PathSanitizer' with base directory 'Paths.get(\"/app/data\")'; 2) Method 'resolveSafe(String userSubdir, String filename)': resolve and normalize both components; 3) If the result tries to escape the base directory (via '..' or absolute paths), throw SecurityException; 4) In main(), test valid subpaths and malicious traversal attacks."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: صمم معالج مسارات آمن: 1) فئة PathSanitizer مع مجلد أساس /app/data؛ 2) دالة resolveSafe تركب المجلد الفرعي واسم الملف وتسوي المسار؛ 3) إذا حاول المسار الهروب للخارج عبر '..' أو مسار مطلق يتم رمي SecurityException؛ 4) اختبر المسارات العادية ومحاولات الاختراق في main."
            },
            {
              type: "code",
              language: "java",
              filename: "PathSanitizerChallenge.java",
              code: `import java.nio.file.Path;
import java.nio.file.Paths;

public class PathSanitizerChallenge {
    static class PathSanitizer {
        private final Path baseDir = Paths.get("/app/data").normalize();

        public Path resolveSafe(String userSubdir, String filename) {
            Path target = baseDir.resolve(userSubdir).resolve(filename).normalize();
            if (!target.startsWith(baseDir)) {
                throw new SecurityException("Access Denied: Path escapes sandbox -> " + target);
            }
            return target;
        }
    }

    public static void main(String[] args) {
        PathSanitizer sanitizer = new PathSanitizer();

        // Test 1: Valid Path
        try {
            Path valid = sanitizer.resolveSafe("reports/q3", "summary.csv");
            System.out.println("Allowed: " + valid);
        } catch (SecurityException e) {
            System.out.println("Blocked: " + e.getMessage());
        }

        // Test 2: Directory Traversal Attempt
        try {
            Path malicious = sanitizer.resolveSafe("../../../etc", "passwd");
            System.out.println("Allowed: " + malicious);
        } catch (SecurityException e) {
            System.out.println("Blocked: " + e.getMessage());
        }
    }
}`,
              output: `Allowed: /app/data/reports/q3/summary.csv
Blocked: Access Denied: Path escapes sandbox -> /etc/passwd`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "Using path.normalize() combined with target.startsWith(baseDir) provides an ironclad defense against directory traversal exploits."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "استخدام normalize مع startsWith يمنع أي محاولة للتسلل خارج المجلد المسموح به ويوفر حماية حديدية لتطبيقاتك."
            }
          ],
          quiz: [
          {
                    "id": "q1",
                    "question": "Which package introduced in Java 7 (NIO.2) is the modern, recommended replacement for the legacy java.io.File class?\n(أي حزمة قُدمت في جافا 7 كبديل حديث وموصى به لصنف java.io.File القديم؟)",
                    "options": [
                              "java.nio.file",
                              "java.util.stream",
                              "java.lang.reflect",
                              "java.io.buffered"
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! java.nio.file (NIO.2) introduced Path, Paths, and Files, offering robust exception handling, metadata views, atomic operations, and symbolic link support. (حزمة java.nio.file هي المعيار الحديث للتعامل مع نظام الملفات في جافا)."
          },
          {
                    "id": "q2",
                    "question": "What is the output of the following path resolution code?\nPath p1 = Path.of(\"/app/config\");\nPath p2 = Path.of(\"database.properties\");\nSystem.out.println(p1.resolve(p2));\n(ما مخرجات دمج المسارات التالي باستخدام resolve؟)",
                    "options": [
                              "/app/config/database.properties",
                              "/app/config",
                              "/database.properties",
                              "database.properties/app/config"
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! resolve() acts like the child concatenation operator. Resolving a relative path against p1 appends it to p1: /app/config/database.properties. (دالة resolve تقوم بدمج المسار النسبي كمسار فرعي داخل المسار الأساسي)."
          },
          {
                    "id": "q3",
                    "question": "What is the difference between File.separator and File.pathSeparator in Java?\n(ما الفرق بين File.separator و File.pathSeparator في جافا؟)",
                    "options": [
                              "File.separator divides path components ('/' or '\\\\'), whereas File.pathSeparator separates distinct path entries in a PATH list (':' or ';').",
                              "File.separator is for Unix, while File.pathSeparator is for Windows.",
                              "They are completely interchangeable aliases.",
                              "File.pathSeparator is used only inside ZIP archives."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! File.separator separates folders in a file path ('/' on Unix, '\\' on Windows). File.pathSeparator separates individual paths in an environment variable or classpath (':' on Unix, ';' on Windows). (فاصل المجلدات separator هو / أو \\، أما pathSeparator فهو الفاصل بين المسارات في الـ classpath مثل : أو ;)."
          },
          {
                    "id": "q4",
                    "question": "What happens if p2 is an ABSOLUTE path when calling p1.resolve(p2)?\nPath p1 = Path.of(\"/var/log\");\nPath p2 = Path.of(\"/etc/hosts\");\nSystem.out.println(p1.resolve(p2));\n(ماذا يحدث إذا كان p2 مساراً مطلقاً Absolute عند استدعاء p1.resolve(p2)؟)",
                    "options": [
                              "/etc/hosts",
                              "/var/log/etc/hosts",
                              "IllegalArgumentException is thrown",
                              "/var/log"
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! According to the Path.resolve specification, if the argument is already an absolute path, resolve() simply returns that absolute argument (/etc/hosts). (وفقاً لمواصفات Path، إذا كان المسار الممرر مطلقاً بالأساس، فإن resolve تتجاهل المسار الأول وتُرجع المسار المطلق مباشرة)."
          },
          {
                    "id": "q5",
                    "question": "Why is relying on the platform default charset (e.g. new FileReader(file) in Java 8) considered a dangerous anti-pattern in file I/O?\n(لماذا يُعتبر الاعتماد على الترميز الافتراضي للنظام خطأً شائعاً وخطيراً في عمليات الملفات؟)",
                    "options": [
                              "Because it compiles slower.",
                              "Because files written on one operating system (e.g. UTF-8 on Linux) may become corrupted or unreadable when opened on another OS (e.g. Windows-1252), causing mojibake.",
                              "Because the JVM refuses to read files larger than 1 MB without UTF-8.",
                              "Because it disables file caching."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Platform default charsets differ between operating systems. Always explicitly pass StandardCharsets.UTF_8 to ensure cross-platform data integrity. (اختلاف الترميز الافتراضي بين أنظمة التشغيل مثل لينكس وويندوز يسبب تشوه النصوص غير الإنجليزية ما لم يتم تحديد UTF-8 صراحة)."
          },
          {
                    "id": "q6",
                    "question": "What is the primary benefit of passing StandardCopyOption.ATOMIC_MOVE when calling Files.move(source, target, ...)?\n(ما الفائدة الرئيسية لتمرير ATOMIC_MOVE عند نقل الملفات عبر Files.move؟)",
                    "options": [
                              "It compresses the file before moving.",
                              "It guarantees the move is performed as an all-or-nothing atomic file system operation, ensuring no partially written or corrupted files if a failure occurs.",
                              "It moves the file over an encrypted network connection.",
                              "It allows moving directories across different hard drive partitions."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! ATOMIC_MOVE ensures that the file appears at the destination instantaneously without intermediate states. If the underlying file system cannot perform an atomic move (e.g. across different drive volumes), AtomicMoveNotSupportedException is thrown. (تضمن العملية الذرية نقل الملف إما كلياً وفورياً أو فشله بالكامل دون وجود حالة وسيطة تالفة)."
          },
          {
                    "id": "q7",
                    "question": "What is the key difference between Files.list(path) and Files.walk(path)?\n(ما الفرق الجوهري بين Files.list و Files.walk؟)",
                    "options": [
                              "Files.list only lists the immediate child entries in the directory (depth 1), while Files.walk traverses subdirectories recursively.",
                              "Files.list deletes files, while Files.walk copies them.",
                              "Files.list returns a List, while Files.walk returns an array.",
                              "Files.walk is only for Windows shortcut files."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! Files.list(path) reads only the direct children of the directory (depth 1). Files.walk(path) traverses the directory tree recursively in depth-first order. (تقرأ Files.list العناصر المباشرة في المجلد فقط، بينما تجوب Files.walk كافة المجلدات الفرعية تكرارياً)."
          },
          {
                    "id": "q8",
                    "question": "Why is it mandatory to use a try-with-resources block when consuming Streams returned by Files.walk() or Files.list()?\n(لماذا من الإلزامي استخدام try-with-resources مع الـ Streams الناتجة من Files.walk أو Files.list؟)",
                    "options": [
                              "Because Streams cannot be collected to a List without try-with-resources.",
                              "Because these Streams hold an open OS DirectoryStream; failing to close them causes operating system file descriptor leaks.",
                              "Because the compiler will reject the code with a syntax error.",
                              "Because it speeds up the CPU clock speed."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Files.walk, Files.list, and Files.lines create Streams that wrap native OS resources (DirectoryStream/FileChannel). They implement AutoCloseable and will exhaust file descriptors if not closed! (هذه الـ Streams تفتح قنوات اتصال مباشرة بنظام التشغيل، وإهمال إغلاقها يؤدي لاستنزاف مقابض الملفات File Descriptors)."
          },
          {
                    "id": "q9",
                    "question": "Which NIO component provides asynchronous notifications of file system events (such as file creation, modification, or deletion) without continuous busy-wait polling?\n(ما مكون NIO الذي يتيح إشعارات فورية بأحداث نظام الملفات كالتعديل والإنشاء والحذف دون الحاجة للاستعلام المتكرر؟)",
                    "options": [
                              "java.nio.file.WatchService",
                              "java.util.Timer",
                              "java.nio.channels.Pipe",
                              "java.nio.file.FileStore"
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! WatchService registers with the OS kernel file system event mechanism (like inotify on Linux) to receive callbacks for ENTRY_CREATE, ENTRY_MODIFY, and ENTRY_DELETE. (تستخدم خدمة WatchService آليات نظام التشغيل مثل inotify لتنبيه التطبيق فوراً عند تعديل أي ملف في المجلد)."
          },
          {
                    "id": "q10",
                    "question": "Consider this code vulnerability:\nPath target = uploadDir.resolve(userSuppliedFilename);\nFiles.copy(uploadedStream, target);\nWhat security vulnerability does this present, and how is it mitigated?\n(ما هي الثغرة الأمنية في هذا الكود وكيف تتم معالجتها؟)",
                    "options": [
                              "SQL Injection; mitigated by prepared statements.",
                              "Path Traversal (Zip Slip); mitigated by normalizing the path and checking that it starts with uploadDir: target.normalize().startsWith(uploadDir).",
                              "Cross-Site Scripting; mitigated by HTML escaping.",
                              "Denial of Service; mitigated by increasing JVM heap space."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! A malicious user could supply '../../../../etc/cron.d/malicious' to overwrite critical system files. Calling normalize() and verifying startsWith(uploadDir) prevents path traversal attacks. (ثغرة Path Traversal تسمح للمخترق بكتابة ملفات خارج المجلد المسموح عبر ../، والحل هو تسوية المسار والتحقق من بدايته)."
          },
          {
                    "id": "q11",
                    "question": "What is the advantage of using Files.readAttributes(path, BasicFileAttributes.class) instead of calling isDirectory(), size(), and lastModifiedTime() individually?\n(ما ميزة استدعاء readAttributes دفعة واحدة مقارنة بالاستعلام الفردي عن الحجم والتاريخ والنوع؟)",
                    "options": [
                              "It requires only a single operating system call (stat) to retrieve all attributes, drastically improving I/O performance over network shares or large directories.",
                              "It decrypts encrypted files automatically.",
                              "It prevents the file from ever being deleted.",
                              "It converts the file to XML format."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! Calling individual methods triggers separate OS 'stat' system calls for each property. Files.readAttributes fetches all metadata in a single native system call, offering major performance gains. (جلب الخصائص دفعة واحدة يتم بنداء نظام stat واحد لنظام التشغيل، مما يوفر وقتاً كبيراً مقارنة بعدة نداءات منفصلة)."
          },
          {
                    "id": "q12",
                    "question": "What is the difference between Files.exists(path) and !Files.notExists(path)?\n(ما الفرق بين Files.exists(path) ونفي Files.notExists(path)؟)",
                    "options": [
                              "There is no difference; they are exact inverses.",
                              "They can BOTH return false if the application does not have permission to check the file status or an I/O error occurs (indeterminate state).",
                              "Files.exists() is deprecated.",
                              "Files.notExists() only works for directories."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! In NIO, file existence has 3 possible states: exists, not exists, and indeterminate (e.g. security access denied or connection timeout). If indeterminate, both exists() and notExists() return false! (هناك 3 حالات لوجود الملف في جافا: موجود، غير موجود، وحالة غير محددة كغياب الصلاحيات حيث تُرجع الدالتان معا false)."
          },
          {
                    "id": "q13",
                    "question": "What does Path.of(\"/home/user/docs/../photos\").normalize() return?\n(ما هي النتيجة التي تُرجعها دالة normalize في هذا المسار؟)",
                    "options": [
                              "/home/user/photos",
                              "/home/user/docs/photos",
                              "/home/user/docs/../photos",
                              "/photos"
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! normalize() eliminates redundant name elements like '.' (current directory) and '..' (parent directory). Here '/docs/..' resolves back to '/home/user', resulting in '/home/user/photos'. (تقوم دالة normalize بحذف العناصر الزائدة مثل نقطة المجلد الحالي ونقطتي المجلد الأب ..)."
          },
          {
                    "id": "q14",
                    "question": "Which FileChannel method is used to acquire an exclusive lock on a file for cross-process synchronization?\n(أي دالة في FileChannel تُستخدم لحيازة قفل حصري Exclusive Lock لمزامنة العمليات؟)",
                    "options": [
                              "channel.lock() (or channel.tryLock())",
                              "channel.synchronize()",
                              "channel.block()",
                              "channel.freeze()"
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! channel.lock() blocks until an exclusive file lock is acquired from the OS, while tryLock() attempts to acquire the lock immediately without blocking (returning null if already locked). (تُستخدم دالة lock أو tryLock في FileChannel لحجز قفل ملف على مستوى نظام التشغيل لمنع التعديل المتزامن)."
          },
          {
                    "id": "q15",
                    "question": "What exception is thrown when attempting to resolve a path string containing null bytes (e.g. 'report\\0.pdf') on most file systems?\n(ما الاستثناء الذي يُرمى عند محاولة إنشاء مسار يحتوي على بايت فارغ null byte؟)",
                    "options": [
                              "java.nio.file.InvalidPathException",
                              "java.lang.NullPointerException",
                              "java.io.EOFException",
                              "java.lang.ClassCastException"
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! An InvalidPathException is thrown when a path string contains characters that are illegal in the underlying file system (such as null character \\0 or invalid Windows characters). (يُرمى InvalidPathException عندما يحتوي المسار على رموز محظورة لنظام التشغيل كالبايت الصفري \\0)."
          }
]
        }
      ]
    }
  ];
})();
