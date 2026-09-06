/**
 * Java Curriculum Module - Part 21
 * Topics:
 * 41. throws
 * 42. Custom Exceptions
 * 
 * 100% Offline, Pure JavaScript. Complete educational content with full bilingual (English & Arabic) explanations.
 */

(function () {
  'use strict';

  window.JAVA_TOPICS_PART21 = [
    /* ==========================================================================
       TOPIC 41: throws
       ========================================================================== */
    {
      id: "throws-keyword",
      title: "41. throws",
      description: "Mastering the throws Keyword in Java: Checked exception propagation contracts, ducking exceptions, multiple throws declarations, method overriding rules, unchecked exception conventions, and architectural exception propagation.",
      lessons: [
        {
          id: "throws-keyword-mastery",
          title: "Complete Guide to throws",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "The throws Clause in Java (جملة throws في لغة جافا)"
            },
            {
              type: "paragraph",
              text: "The 'throws' keyword is part of a method signature that declares the checked exceptions that the method might throw during its execution. It informs callers of the method that they must either catch these exceptions in a try-catch block or declare them in their own 'throws' clause. This is known as the 'Catch or Specify' requirement in Java."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "تُستخدم الكلمة المفتاحية 'throws' في توقيع الدالة (Method Signature) للإعلان عن الاستثناءات المفحوصة (Checked Exceptions) التي قد تنتج عن تنفيذ هذه الدالة ولا يتم التقاطها داخلياً. تُخبر هذه الكلمة أي طرف يستدعي الدالة بأنه ملزم إما بالتقاط الاستثناء داخل بلوك try-catch أو إعادة الإعلان عنه باستخدام throws في دالته، وهو ما يعرف بقاعدة 'Catch or Specify' في جافا."
            },
            {
              type: "paragraph",
              text: "Key Architectural Concepts: 1) Contractual Obligation: It defines the failure modes of your API; 2) Exception Ducking: Passing the responsibility of error handling up the call stack to the caller; 3) Overriding Constraint: An overriding method cannot declare broader or new checked exceptions than the superclass method, though it may declare fewer or narrower (subclass) exceptions."
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
              text: "Example 1: Basic 'throws' Declaration with Checked Exception (المثال 1: إعلان throws الأساسي مع استثناء مفحوص)"
            },
            {
              type: "paragraph",
              text: "Declaring a checked exception (IOException) when reading from an external source."
            },
            {
              type: "code",
              language: "java",
              filename: "BasicThrowsDemo.java",
              code: `import java.io.IOException;

public class BasicThrowsDemo {
    // Declares that this method may throw IOException
    public static void readFile(String path) throws IOException {
        if (path == null) {
            throw new IOException("File path cannot be null!");
        }
        System.out.println("Reading file data from: " + path);
    }

    public static void main(String[] args) {
        // Caller MUST handle or re-declare IOException
        try {
            readFile("config.txt");
            readFile(null);
        } catch (IOException e) {
            System.out.println("Caught checked exception in caller: " + e.getMessage());
        }
    }
}`,
              output: `Reading file data from: config.txt
Caught checked exception in caller: File path cannot be null!`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "The method 'readFile' uses 'throws IOException' to warn the caller that an I/O failure can occur. The caller 'main' wraps the call in a try-catch block."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "تعلن الدالة readFile عن احتمالية رمي IOException باستخدام throws، مما يُجبر المستدعي (main) على إحاطة الاستدعاء ببلوك try-catch."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Declaring Multiple Exceptions (المثال 2: الإعلان عن عدة استثناءات مفصولة بفواصل)"
            },
            {
              type: "paragraph",
              text: "A method can declare multiple checked exceptions separated by commas in its signature."
            },
            {
              type: "code",
              language: "java",
              filename: "MultipleThrowsDemo.java",
              code: `import java.io.IOException;
import java.sql.SQLException;

public class MultipleThrowsDemo {
    public static void syncUserData(String source, boolean dbFail) 
            throws IOException, SQLException {
        if ("network_down".equals(source)) {
            throw new IOException("Failed to reach remote data server.");
        }
        if (dbFail) {
            throw new SQLException("Database deadlock detected.");
        }
        System.out.println("Data sync completed successfully for source: " + source);
    }

    public static void main(String[] args) {
        try {
            syncUserData("valid_source", false);
            syncUserData("network_down", false);
        } catch (IOException | SQLException e) {
            System.out.println("Handled sync error [" + e.getClass().getSimpleName() + "]: " + e.getMessage());
        }
    }
}`,
              output: `Data sync completed successfully for source: valid_source
Handled sync error [IOException]: Failed to reach remote data server.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "The throws clause lists 'IOException, SQLException'. The caller can catch each separately or use Java 7 multi-catch syntax."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "تسرد جملة throws استثناءين مفصولين بفاصلة، ويمكن للمستدعي التقاط كل نوع بمفرده أو دمجهما باستخدام صياغة multi-catch."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Exception Ducking (Propagating Up the Call Stack) (المثال 3: تمرير الاستثناء عبر سلسلة الاستدعاءات)"
            },
            {
              type: "paragraph",
              text: "When a method does not handle an exception, it 'ducks' the responsibility by adding throws to its own signature."
            },
            {
              type: "code",
              language: "java",
              filename: "ExceptionDuckingDemo.java",
              code: `import java.io.IOException;

public class ExceptionDuckingDemo {
    public static void step3() throws IOException {
        System.out.println("Step 3: Low-level IO operation triggering failure");
        throw new IOException("Socket timeout at step 3");
    }

    // Step 2 ducks the exception: does not catch it, re-declares throws
    public static void step2() throws IOException {
        System.out.println("Step 2: Forwarding call to step 3...");
        step3();
    }

    // Step 1 also ducks the exception
    public static void step1() throws IOException {
        System.out.println("Step 1: Forwarding call to step 2...");
        step2();
    }

    public static void main(String[] args) {
        try {
            step1();
        } catch (IOException e) {
            System.out.println("Main handled exception after 3 levels of ducking: " + e.getMessage());
        }
    }
}`,
              output: `Step 1: Forwarding call to step 2...
Step 2: Forwarding call to step 3...
Step 3: Low-level IO operation triggering failure
Main handled exception after 3 levels of ducking: Socket timeout at step 3`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "Intermediate layers (step1, step2) don't need boilerplate try-catch blocks if they cannot recover; they declare 'throws IOException' to let upper layers decide."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "لا تحتاج الطبقات الوسيطة للتعامل مع الخطأ إذا لم تكن قادرة على معالجته، بل تكتفي بإضافة throws لتمريره للطبقة العليا المسؤولة."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Method Overriding Rules with throws (المثال 4: قواعد الوراثة وتجاوز الدوال مع throws)"
            },
            {
              type: "paragraph",
              text: "An overriding method in a subclass CANNOT declare broader or new checked exceptions than the superclass method."
            },
            {
              type: "code",
              language: "java",
              filename: "OverridingThrowsDemo.java",
              code: `import java.io.IOException;
import java.io.FileNotFoundException;

class DataService {
    // Superclass declares general checked exception
    public void load() throws IOException {
        System.out.println("DataService: Loading raw data...");
    }
}

class FastDataService extends DataService {
    // LEGAL: Declaring a narrower (subclass) checked exception
    @Override
    public void load() throws FileNotFoundException {
        System.out.println("FastDataService: Loading with specific FileNotFoundException declaration.");
    }
}

class MemoryDataService extends DataService {
    // LEGAL: Declaring NO exceptions at all!
    @Override
    public void load() {
        System.out.println("MemoryDataService: Loading completely in-memory (no exceptions thrown).");
    }
}

// ILLEGAL (Will not compile if uncommented):
// class BrokenDataService extends DataService {
//     @Override
//     public void load() throws Exception { // COMPILE ERROR: Broader than IOException!
//     }
// }

public class OverridingThrowsDemo {
    public static void main(String[] args) throws IOException {
        DataService s1 = new FastDataService();
        s1.load();

        DataService s2 = new MemoryDataService();
        s2.load();
    }
}`,
              output: `FastDataService: Loading with specific FileNotFoundException declaration.
MemoryDataService: Loading completely in-memory (no exceptions thrown).`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "Subclasses adhere to the Liskov Substitution Principle: callers expecting DataService.load() can only handle IOException. A subclass can declare narrower or fewer exceptions, never broader."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "وفقاً لمبدأ الاستبدال، يمكن للدالة المتجاوزة في الابن إعلان استثناء أضيق (فرعي) أو عدم إعلان أي استثناء، لكن يُمنع تماماً إعلان استثناء أوسع (كـ Exception العام)."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: 'throws' with Unchecked Exceptions (Documentation Convention) (المثال 5: استخدام throws مع الاستثناءات غير المفحوصة للتوثيق)"
            },
            {
              type: "paragraph",
              text: "Java allows declaring RuntimeException in throws, which is optional but serves as self-documenting code."
            },
            {
              type: "code",
              language: "java",
              filename: "UncheckedThrowsDemo.java",
              code: `public class UncheckedThrowsDemo {
    // Optional: Documenting that this method may throw IllegalArgumentException
    public static double calculateSquareRoot(double value) throws IllegalArgumentException {
        if (value < 0) {
            throw new IllegalArgumentException("Cannot calculate square root of negative number: " + value);
        }
        return Math.sqrt(value);
    }

    public static void main(String[] args) {
        // Compiler does NOT force try-catch for unchecked exceptions, but we can catch it
        try {
            System.out.println("Result: " + calculateSquareRoot(25.0));
            System.out.println("Result: " + calculateSquareRoot(-4.0));
        } catch (IllegalArgumentException e) {
            System.out.println("Caught documented unchecked exception: " + e.getMessage());
        }
    }
}`,
              output: `Result: 5.0
Caught documented unchecked exception: Cannot calculate square root of negative number: -4.0`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "Declaring unchecked exceptions in throws is not enforced by the compiler, but it signals to API consumers what preconditions might fail."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "لا يُلزم المترجم المستدعي بالتقاط الاستثناء غير المفحوص حتى لو كُتب في throws، ولكنه يفيد في توثيق شروط عمل الدالة للمبرمجين الآخرين."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: 'throws' on Constructor Signatures (المثال 6: استخدام throws في منشئ الفئة Constructor)"
            },
            {
              type: "paragraph",
              text: "Constructors can declare throws to prevent object instantiation when initial resources cannot be acquired."
            },
            {
              type: "code",
              language: "java",
              filename: "ConstructorThrowsDemo.java",
              code: `import java.io.IOException;

public class ConstructorThrowsDemo {
    static class SecureChannel {
        private final String host;

        // Constructor fails if host is unreachable
        public SecureChannel(String host) throws IOException {
            if ("invalid_host".equals(host)) {
                throw new IOException("Host DNS resolution failed for: " + host);
            }
            this.host = host;
            System.out.println("SecureChannel connected to: " + host);
        }

        public void send(String msg) {
            System.out.println("Sent: '" + msg + "' over channel to " + host);
        }
    }

    public static void main(String[] args) {
        try {
            SecureChannel ch1 = new SecureChannel("api.example.com");
            ch1.send("PING");

            SecureChannel ch2 = new SecureChannel("invalid_host");
            ch2.send("HELLO"); // Never executed
        } catch (IOException e) {
            System.out.println("Object creation aborted: " + e.getMessage());
        }
    }
}`,
              output: `SecureChannel connected to: api.example.com
Sent: 'PING' over channel to api.example.com
Object creation aborted: Host DNS resolution failed for: invalid_host`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "Declaring throws on constructors prevents half-initialized or invalid objects from being created in memory."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "إعلان throws في المنشئ يضمن عدم إنشاء كائنات ناقصة التهيئة في الذاكرة عند فشل الحصول على الموارد الأساسية."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Subclass Constructor Exception Rules (المثال 7: قواعد استثناءات منشئات الفئات الفرعية)"
            },
            {
              type: "paragraph",
              text: "A subclass constructor MUST declare all checked exceptions thrown by the superclass constructor (or broader)."
            },
            {
              type: "code",
              language: "java",
              filename: "SubclassConstructorThrowsDemo.java",
              code: `import java.io.IOException;

class ParentResource {
    public ParentResource(String uri) throws IOException {
        if (uri == null) throw new IOException("Parent URI missing!");
        System.out.println("ParentResource loaded: " + uri);
    }
}

class ChildResource extends ParentResource {
    // Child constructor MUST declare IOException (or broader like Exception)
    // because it implicitly or explicitly calls super()!
    public ChildResource(String uri) throws IOException, Exception {
        super(uri);
        System.out.println("ChildResource specialized setup complete.");
    }
}

public class SubclassConstructorThrowsDemo {
    public static void main(String[] args) {
        try {
            ChildResource child = new ChildResource("https://db.internal");
        } catch (Exception e) {
            System.out.println("Handled: " + e.getMessage());
        }
    }
}`,
              output: `ParentResource loaded: https://db.internal
ChildResource specialized setup complete.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "Unlike method overriding (where subclass exceptions must be narrower), subclass constructors must declare equal or BROADER checked exceptions than super()."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "على عكس تجاوز الدوال، يجب على منشئ الابن إعلان نفس استثناءات منشئ الأب أو استثناءات أوسع منها لأن استدعاء super() إلزامي."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: 'throws' on Main Method (Command-Line Utilities) (المثال 8: استخدام throws في الدالة main للبرامج النصية)"
            },
            {
              type: "paragraph",
              text: "In CLI tools or prototypes, declaring throws on main delegates exception printing and process exit to the JVM."
            },
            {
              type: "code",
              language: "java",
              filename: "MainThrowsDemo.java",
              code: `import java.io.IOException;

public class MainThrowsDemo {
    // Delegating exception to JVM runtime (prints stacktrace and exits with non-zero code)
    public static void main(String[] args) throws IOException, InterruptedException {
        System.out.println("Starting batch job...");
        Thread.sleep(100); // throws InterruptedException
        
        boolean simulateSuccess = true;
        if (!simulateSuccess) {
            throw new IOException("Batch IO failed!");
        }
        System.out.println("Batch job finished cleanly without try-catch boilerplate.");
    }
}`,
              output: `Starting batch job...
Batch job finished cleanly without try-catch boilerplate.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "Adding 'throws Exception' to main is common in test suites, scripts, and quick tools to avoid verbose boilerplate."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "يُعتبر وضع throws في الدالة main ممارسة شائعة في الاختبارات والبرامج السريعة لتفادي كتابة بلوكات try-catch متكررة."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Interface Contracts and 'throws' (المثال 9: عقود الواجهات البرمجية Interfaces مع throws)"
            },
            {
              type: "paragraph",
              text: "Defining failure boundaries in interface contracts that all implementers must respect."
            },
            {
              type: "code",
              language: "java",
              filename: "InterfaceThrowsDemo.java",
              code: `import java.io.IOException;

interface NetworkClient {
    // Any class implementing NetworkClient must respect this contract
    String sendPayload(String payload) throws IOException;
}

class RestClient implements NetworkClient {
    @Override
    public String sendPayload(String payload) throws IOException {
        if (payload.isEmpty()) {
            throw new IOException("Empty payload disallowed over HTTP.");
        }
        return "HTTP 200 OK: " + payload;
    }
}

public class InterfaceThrowsDemo {
    public static void executeClient(NetworkClient client, String data) {
        try {
            String res = client.sendPayload(data);
            System.out.println("Response: " + res);
        } catch (IOException e) {
            System.out.println("Contract violation handled: " + e.getMessage());
        }
    }

    public static void main(String[] args) {
        NetworkClient client = new RestClient();
        executeClient(client, "Hello Gateway");
        executeClient(client, "");
    }
}`,
              output: `Response: HTTP 200 OK: Hello Gateway
Contract violation handled: Empty payload disallowed over HTTP.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "The interface defines what exceptions can occur across any implementation, enabling uniform error handling."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "تحدد الواجهة الاستثناءات المحتملة لأي صنف يطبقها، مما يتيح معالجة الأخطاء بشكل موحد لكافة التطبيقات."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Polymorphic Method Dispatch with throws (المثال 10: استدعاء الدوال المتعددة الأشكال مع throws)"
            },
            {
              type: "paragraph",
              text: "When invoking a method through a base reference, the compiler enforces the base class's throws declaration."
            },
            {
              type: "code",
              language: "java",
              filename: "PolymorphicThrowsDemo.java",
              code: `import java.io.IOException;

class BaseWorker {
    public void execute() throws IOException {
        System.out.println("BaseWorker executing...");
    }
}

class QuietWorker extends BaseWorker {
    // Does NOT throw any checked exception
    @Override
    public void execute() {
        System.out.println("QuietWorker executing silently without throwing.");
    }
}

public class PolymorphicThrowsDemo {
    public static void main(String[] args) {
        BaseWorker worker = new QuietWorker();

        // Even though QuietWorker doesn't throw IOException,
        // the compiler checks the reference type (BaseWorker) which declares throws IOException!
        try {
            worker.execute();
        } catch (IOException e) {
            System.out.println("Unreachable in this instance, but required by compiler!");
        }
    }
}`,
              output: `QuietWorker executing silently without throwing.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "The Java compiler checks compile-time reference types, requiring try-catch even if the runtime instance throws nothing."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "يتحقق مترجم جافا من نوع المرجع وقت الترجمة (BaseWorker) فيفرض try-catch حتى لو كان الكائن الفعلي لا يرمي أي استثناء."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Enterprise Multi-Tier Service Exception Escalation (المثال 11: تصعيد الاستثناءات عبر طبقات الخدمة المؤسسية)"
            },
            {
              type: "paragraph",
              text: "Real-world architecture: Repository declares SQLException, Service declares BusinessException, Controller handles gracefully."
            },
            {
              type: "code",
              language: "java",
              filename: "EnterpriseServiceThrowsDemo.java",
              code: `import java.sql.SQLException;

public class EnterpriseServiceThrowsDemo {
    // Custom domain exception
    static class AccountNotFoundException extends Exception {
        AccountNotFoundException(String msg) { super(msg); }
    }

    // Repository Tier: throws low-level SQLException
    static class AccountRepository {
        public String findAccountById(long id) throws SQLException {
            if (id == 999L) throw new SQLException("Database connection reset by peer");
            if (id <= 0) return null;
            return "Account-Record-#" + id;
        }
    }

    // Service Tier: catches SQLException or throws domain AccountNotFoundException
    static class AccountService {
        private final AccountRepository repo = new AccountRepository();

        public String getAccount(long id) throws AccountNotFoundException, SQLException {
            String record = repo.findAccountById(id);
            if (record == null) {
                throw new AccountNotFoundException("Account ID " + id + " does not exist in registry.");
            }
            return record;
        }
    }

    public static void main(String[] args) {
        AccountService service = new AccountService();

        long[] testIds = { 101L, -1L, 999L };
        for (long id : testIds) {
            System.out.println("\n--> Fetching ID: " + id);
            try {
                String acc = service.getAccount(id);
                System.out.println("Found: " + acc);
            } catch (AccountNotFoundException e) {
                System.out.println("[404 Not Found] " + e.getMessage());
            } catch (SQLException e) {
                System.out.println("[503 Service Unavailable] Infrastructure error: " + e.getMessage());
            }
        }
    }
}`,
              output: `--> Fetching ID: 101
Found: Account-Record-#101

--> Fetching ID: -1
[404 Not Found] Account ID -1 does not exist in registry.

--> Fetching ID: 999
[503 Service Unavailable] Infrastructure error: Database connection reset by peer`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "This showcases clean separation: the service declares domain and infrastructure exceptions in its throws clause, allowing the presentation layer to map them to appropriate status codes."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "يوضح هذا المثال الفصل النظيف للمسؤوليات؛ حيث تعلن طبقة الخدمات عن استثناءات المجال والبنية التحتية ليقوم المتحكم بتحويلها إلى رموز استجابة ملائمة."
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
                "Mistake 1: Confusing 'throw' with 'throws'. Remember: 'throw' is a verb inside method body to trigger an exception; 'throws' is a signature clause declaring checked exceptions.",
                "خطأ 1: الخلط بين throw و throws؛ تذكر أن throw فعل داخل الدالة لرمي الكائن، بينما throws جملة في التوقيع للإعلان عن أنواع الأخطاء المتوقعة.",
                "Mistake 2: Overriding a method and declaring a broader checked exception (e.g. declaring throws Exception when superclass declares throws IOException) — this produces a compilation error.",
                "خطأ 2: توسيع استثناء الدالة المتجاوزة في الصنف الابن، كإعلان throws Exception بينما يعلن الأب عن IOException فقط، وهذا خطأ يمنع الترجمة.",
                "Mistake 3: Blanketing every method signature with 'throws Exception'. This destroys the benefits of checked exceptions and disables type-safe error handling."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Secure Payment Gateway Validator (التحدي العملي: مدقق بوابة الدفع الآمنة)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Build a payment validator: 1) Declare custom checked exception 'InvalidCardException extends Exception'; 2) Method 'validateCard(String cardNumber)' with 'throws InvalidCardException': if null or length != 16, throw exception; 3) Method 'processPayment(String card, double amount)' with 'throws InvalidCardException, IllegalArgumentException': validate card, and if amount <= 0, throw IllegalArgumentException; 4) In main(), test valid, invalid card, and invalid amount scenarios with appropriate try-catch blocks."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: بناء مدقق بطاقات دفع: 1) صنف استثناء مفحوص InvalidCardException؛ 2) دالة validateCard تعلن عن throws InvalidCardException وترمي استثناء إذا كان الرقم null أو لا يساوي 16 رقماً؛ 3) دالة processPayment تعلن عن الاستثناءين وتتحقق من البطاقة والمبلغ؛ 4) اختبار الحالات في main."
            },
            {
              type: "code",
              language: "java",
              filename: "PaymentGatewayChallenge.java",
              code: `public class PaymentGatewayChallenge {
    static class InvalidCardException extends Exception {
        public InvalidCardException(String msg) { super(msg); }
    }

    public static void validateCard(String cardNumber) throws InvalidCardException {
        if (cardNumber == null || cardNumber.length() != 16) {
            throw new InvalidCardException("Card number must be exactly 16 digits. Received: " + cardNumber);
        }
    }

    public static void processPayment(String cardNumber, double amount) 
            throws InvalidCardException, IllegalArgumentException {
        validateCard(cardNumber);
        if (amount <= 0) {
            throw new IllegalArgumentException("Payment amount must be positive. Received: " + amount);
        }
        System.out.printf("Payment of $%.2f processed successfully for card %s%n", amount, cardNumber.substring(12));
    }

    public static void main(String[] args) {
        // Case 1: Valid
        try {
            processPayment("1234567890123456", 149.99);
        } catch (InvalidCardException | IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());
        }

        // Case 2: Invalid Card
        try {
            processPayment("9999", 50.0);
        } catch (InvalidCardException | IllegalArgumentException e) {
            System.out.println("Card Failure: " + e.getMessage());
        }

        // Case 3: Invalid Amount
        try {
            processPayment("1234567890123456", -20.0);
        } catch (InvalidCardException | IllegalArgumentException e) {
            System.out.println("Amount Failure: " + e.getMessage());
        }
    }
}`,
              output: `Payment of $149.99 processed successfully for card 3456
Card Failure: Card number must be exactly 16 digits. Received: 9999
Amount Failure: Payment amount must be positive. Received: -20.0`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "The solution uses 'throws InvalidCardException, IllegalArgumentException' to declare both domain checked and unchecked errors, allowing the caller to handle each accurately."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "أعلنت الدالة عن الاستثناءين في توقيعها، مما منح المستدعي القدرة على فحص كل خطأ ومعالجته بدقة واحترافية."
            }
          ],
          quiz: [
          {
                    "id": "q1",
                    "question": "What is the purpose of declaring 'throws' in a method signature?\n(ما هو الغرض الأساسي من كتابة throws في ترويسة الدالة في جافا؟)",
                    "options": [
                              "To immediately throw an exception when the method starts.",
                              "To declare to the compiler and calling methods that this method might propagate one or more checked exceptions, enforcing at compile time that callers must either catch them or declare them in their own throws clause.",
                              "To terminate the thread if an error occurs.",
                              "To convert checked exceptions into unchecked exceptions."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! The 'throws' clause forms part of a method's contract. It notifies callers and the compiler that specified checked exceptions may propagate out of this method, requiring callers to handle or declare them. (تُعد جملة throws جزءاً من عقد الدالة البرمجي؛ فهي تخبر المترجم والمستدعين بأن هذه الدالة قد تخرج منها استثناءات مفحوصة، مما يلزم المستدعي بالتعامل معها أو إعادة تمريرها)."
          },
          {
                    "id": "q2",
                    "question": "What is the fundamental rule for METHOD OVERRIDING when the superclass method declares a checked exception?\n\nclass Parent {\n    void execute() throws java.io.IOException {}\n}\nclass Child extends Parent {\n    // Overriding rules for throws\n}",
                    "options": [
                              "The overriding method can declare any checked exception it wants, including java.lang.Exception.",
                              "The overriding method in Child CANNOT declare new or broader checked exceptions than those declared in Parent; it can declare fewer exceptions, narrower (subclass) exceptions, or no exceptions at all.",
                              "The overriding method MUST declare the exact same exceptions and cannot omit any.",
                              "Subclasses cannot override methods that declare throws."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Liskov Substitution Principle: Polymorphic callers holding a Parent reference expect at most IOException. If Child could throw broader exceptions (e.g. Exception), the caller's catch block would be bypassed. Thus, overriding methods can only throw narrower, fewer, or no checked exceptions. (مبدأ الاستبدال: لا يجوز للدالة المتجاوزة في الابن إعلان استثناءات مفحوصة أوسع أو جديدة لم يعلن عنها الأب؛ لكن يجوز لها إعلان استثناءات أضيق أو أقل أو الاستغناء عن throws تماماً)."
          },
          {
                    "id": "q3",
                    "question": "What happens when compiling the following inheritance code?\n\nimport java.io.*;\nclass SuperService {\n    public void run() throws IOException {}\n}\nclass SubService extends SuperService {\n    @Override\n    public void run() throws Exception { // Line 7\n    }\n}",
                    "options": [
                              "It compiles and runs successfully.",
                              "Compile-time error on Line 7: overridden method does not throw java.lang.Exception (SubService.run() attempts to declare a broader checked exception than SuperService.run()).",
                              "It compiles with a warning.",
                              "It compiles only if -Xlint is disabled."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Exception is broader (the superclass) of IOException. Declaring 'throws Exception' in an overriding method when the parent only declared 'throws IOException' violates Java overriding rules and produces a compile-time error. (خطأ تصريف: الفئة Exception أوسع وأشمل من IOException، ومحاولة الدالة المتجاوزة في الابن إعلان استثناء أوسع من دالة الأب يرفضه المترجم فوراً)."
          },
          {
                    "id": "q4",
                    "question": "Can an overriding method declare an UNCHECKED exception (like IllegalArgumentException or NullPointerException) that was NOT declared in the superclass method?\n\nclass Base {\n    void save() {}\n}\nclass Sub extends Base {\n    @Override\n    void save() throws IllegalArgumentException {}\n}",
                    "options": [
                              "No, overriding rules apply equally to unchecked and checked exceptions.",
                              "Yes, overriding methods can declare any unchecked exceptions (subclasses of RuntimeException) freely, even if the superclass method declares none.",
                              "Only if Base is an interface.",
                              "Only in Java 8 and earlier."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! The method overriding restrictions on 'throws' apply EXCLUSIVELY to checked exceptions. Subclasses are completely free to document or declare any unchecked exceptions (RuntimeException) without restriction. (القيود المفروضة على throws في الوراثة تنطبق حصراً على الاستثناءات المفحوصة؛ أما الاستثناءات غير المفحوصة RuntimeException فيجوز إعلانها بحرية تامة)."
          },
          {
                    "id": "q5",
                    "question": "What is the rule regarding CONSTRUCTORS and 'throws' in a subclass hierarchy?\n\nclass SuperBase {\n    public SuperBase() throws java.io.IOException {}\n}\nclass SubBase extends SuperBase {\n    // Constructor rule\n}",
                    "options": [
                              "SubBase constructor cannot declare any exceptions.",
                              "SubBase constructor MUST declare at least all checked exceptions declared by SuperBase constructor (or broader exceptions) because the super() call cannot be wrapped in a try-catch inside the constructor.",
                              "SubBase constructor can only declare narrower exceptions.",
                              "Constructors cannot have throws clauses."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! The first statement in SubBase constructor is implicitly or explicitly super(). Because super() can throw IOException and cannot be enclosed in a try-catch block within the constructor header, the SubBase constructor MUST declare 'throws IOException' (or a broader exception like Exception). (يجب على منشئ الفئة الفرعية إعلان كافة الاستثناءات المفحوصة لمنشئ الفئة الأم على الأقل، لأنه يستدعي super() كأول سطر ولا يمكن وضع super داخل try-catch داخل المنشئ)."
          },
          {
                    "id": "q6",
                    "question": "What is 'Exception Ducking' in Java programming?\n(ماذا يعني مصطلح 'Exception Ducking' في لغة جافا؟)",
                    "options": [
                              "Converting exceptions into ducks.",
                              "A method choosing NOT to catch a checked exception locally, but instead declaring 'throws' on its signature to pass the responsibility of handling up the call stack to its caller.",
                              "Catching an exception and printing nothing.",
                              "An exception that only occurs in polymorphic methods."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! 'Ducking' an exception means a method chooses not to handle an exception locally with try-catch; instead, it declares 'throws' in its signature, letting the exception propagate up the call stack to be handled by higher layers. (تفادي الاستثناء Ducking يعني عدم معالجته محلياً بـ try-catch داخل الدالة، وتمرير المسؤولية إلى الدالة المستدعية عبر إعلانه في ترويسة الدالة بواسطة throws)."
          },
          {
                    "id": "q7",
                    "question": "What happens if a class implements an interface method that does NOT declare any checked exceptions?\n\ninterface Worker {\n    void execute();\n}\nclass ConcreteWorker implements Worker {\n    // Can execute() declare throws IOException?\n}",
                    "options": [
                              "Yes, it can declare 'throws IOException'.",
                              "No, the implementing method CANNOT declare any checked exceptions because the interface contract declared none; doing so causes a compile-time error.",
                              "Yes, but only if ConcreteWorker is abstract.",
                              "Yes, if the class has a public constructor."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Implementing an interface method follows the exact same overriding rules. If the interface method declares no checked exceptions, no implementing class method can declare any checked exceptions. (تنطبق قواعد تجاوز الدوال على الواجهات أيضاً؛ فإذا كانت دالة الواجهة لا تعلن عن استثناءات مفحوصة، يُحظر على الفئة المنفذة إعلان أي استثناء مفحوص)."
          },
          {
                    "id": "q8",
                    "question": "What happens if the 'main' method declares 'throws Exception' and an exception is thrown during execution?\n\npublic static void main(String[] args) throws Exception {\n    throw new java.io.IOException(\"Connection dropped\");\n}",
                    "options": [
                              "The compiler rejects the main method because main cannot declare throws.",
                              "The exception escapes main; the JVM's default UncaughtExceptionHandler catches it, prints the stack trace to System.err, and the main thread terminates abruptly with a non-zero exit code.",
                              "The JVM automatically restarts the program.",
                              "The exception is silently ignored."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Declaring 'throws Exception' on main() is common in scripts and prototypes. If an exception is thrown and uncaught, it escapes to the JVM root handler, which outputs the stack trace and terminates the thread. (إعلان throws في دالة main مسموح؛ وإذا خرج استثناء دون معالجة يتسلمه معالج الـ JVM الافتراضي ليطبع مسار الخطأ وينهي البرنامج بكود خروج غير صفري)."
          },
          {
                    "id": "q9",
                    "question": "Consider this polymorphic call:\n\nclass DataStore {\n    public void sync() throws java.io.IOException {\n        System.out.println(\"DataStore sync\");\n    }\n}\nclass FastStore extends DataStore {\n    @Override\n    public void sync() {\n        System.out.println(\"FastStore sync\");\n    }\n}\npublic class PolyTest {\n    public static void main(String[] args) {\n        DataStore store = new FastStore();\n        store.sync(); // Line 15\n    }\n}\n\nWhat happens when compiling Line 15?",
                    "options": [
                              "It compiles without error because the actual runtime object (FastStore) does not throw any checked exception.",
                              "Compile-time error: unreported exception java.io.IOException; must be caught or declared to be thrown, because the compiler checks the reference type (DataStore), not the runtime type.",
                              "It compiles with a runtime exception.",
                              "It executes and prints 'FastStore sync'."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Java is statically typed: the compiler verifies method calls against the declared reference type (DataStore), not the runtime object (FastStore). Because DataStore.sync() declares 'throws IOException', the caller in main must catch or declare IOException regardless of what FastStore does. (المترجم يتحقق من القواعد بناءً على نوع المرجع DataStore وقت التصريف؛ وبما أن دالة DataStore تعلن عن IOException، يجب على المستدعي معالجته برغم أن كائن FastStore في وقت التشغيل لا يرمي شيئاً)."
          },
          {
                    "id": "q10",
                    "question": "Can a method declare multiple exceptions in its 'throws' clause, separated by commas?\n\npublic void process() throws IOException, SQLException, TimeoutException",
                    "options": [
                              "No, Java only permits one exception in a throws clause.",
                              "Yes, a method can declare any number of checked (or unchecked) exceptions separated by commas in its throws clause.",
                              "Only if all exceptions extend the same custom base class.",
                              "Only up to 2 exceptions are allowed."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Java syntax allows specifying a comma-separated list of exception types in the 'throws' clause to declare all potential exceptions that may emerge from the method. (تسمح لغة جافا بوضع قائمة من الاستثناءات المفحوصة مفصولة بفواصل في جملة throws للتعبير عن جميع الأخطاء المحتمل خروجها من الدالة)."
          },
          {
                    "id": "q11",
                    "question": "What is printed by this program?\n\npublic class PropagationDemo {\n    public static void level1() throws Exception {\n        level2();\n    }\n    public static void level2() throws Exception {\n        throw new Exception(\"ErrorFromLevel2\");\n    }\n    public static void main(String[] args) {\n        try {\n            level1();\n        } catch (Exception e) {\n            System.out.println(\"Caught in main: \" + e.getMessage());\n        }\n    }\n}",
                    "options": [
                              "Caught in main: ErrorFromLevel2",
                              "ErrorFromLevel2",
                              "Compile-time error: level1 must catch the exception.",
                              "NullPointerException"
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! level2() throws Exception, which propagates to level1() via its throws clause, which in turn propagates to main() via its throws clause. The try-catch block in main catches it and prints 'Caught in main: ErrorFromLevel2'. (يتم رمي الاستثناء في level2 ويمر عبر throws إلى level1 ومنه إلى main حيث يلتقطه بلوك catch ويطبع الرسالة)."
          },
          {
                    "id": "q12",
                    "question": "Which of the following child class methods legally overrides the parent method?\n\nclass FileParser {\n    public void parse() throws java.io.IOException {}\n}",
                    "options": [
                              "public void parse() throws java.lang.Exception {}",
                              "public void parse() throws java.io.FileNotFoundException {} (FileNotFoundException is a narrower subclass of IOException)",
                              "public void parse() throws java.io.IOException, java.sql.SQLException {}",
                              "public void parse() throws Throwable {}"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! FileNotFoundException is a direct subclass of IOException (narrower exception). An overriding method is permitted to declare a subclass of the superclass's declared checked exception. (فئة FileNotFoundException ترث من IOException، وبالتالي فهي استثناء أضيق وأكثر تحديداً ويحق للدالة المتجاوزة في الابن إعلانه بشكل قانوني تماماً)."
          },
          {
                    "id": "q13",
                    "question": "Why do some developers include unchecked exceptions (e.g. IllegalArgumentException) in a method's 'throws' clause even though the compiler does not require it?\n\npublic double calculateSquareRoot(double val) throws IllegalArgumentException",
                    "options": [
                              "Because it forces callers to write a try-catch block.",
                              "As self-documenting code and API contract clarity, communicating to consumers via Javadoc and IDE autocompletion that invalid inputs will trigger this specific runtime exception.",
                              "To make the method run faster in bytecode.",
                              "It is required by the JVM specification."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Specifying unchecked exceptions in the 'throws' clause serves as clear API documentation (and populates @throws in Javadoc), clearly indicating to API consumers the expected failure conditions without forcing boilerplate try-catch on them. (إعلان الاستثناءات غير المفحوصة في throws يُستخدم كتوثيق صريح ومقروء للمطورين ومولدات Javadoc لتوضيح متى تفشل الدالة دون إجبارهم على try-catch إلزامية)."
          },
          {
                    "id": "q14",
                    "question": "What happens when compiling this constructor code?\n\nimport java.io.*;\nclass ParentResource {\n    ParentResource() throws IOException {}\n}\nclass ChildResource extends ParentResource {\n    ChildResource() throws IOException, SQLException {\n        super();\n    }\n}",
                    "options": [
                              "Compile-time error: ChildResource constructor cannot declare SQLException.",
                              "It compiles successfully. A subclass constructor CAN declare broader or additional checked exceptions (like SQLException) that the parent constructor does not declare, provided it also declares the parent's checked exceptions.",
                              "Compile-time error: super() cannot throw exceptions.",
                              "ChildResource must be marked abstract."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Unlike method overriding where the child CANNOT declare broader checked exceptions, a constructor is NOT overriding any method! A subclass constructor can declare whatever checked exceptions it needs (including new ones like SQLException), so long as it declares at least what super() throws. (المنشئات لا تخضع لقواعد الـ Overriding لأن المنشئ لا يُورث ولا يتجاوز؛ لذا يحق لمنشئ الابن إعلان استثناءات إضافية جديدة بحرية تامة طالما أنه يعلن أيضاً استثناءات super)."
          },
          {
                    "id": "q15",
                    "question": "In an enterprise multi-tier architecture, what is the role of 'throws' between the repository, service, and controller layers?\n(في تطبيقات الويب المؤسسية متعددة الطبقات، ما هو دور جملة throws بين طبقات البيانات والخدمة والتحكم؟)",
                    "options": [
                              "To ensure that no exceptions are ever logged.",
                              "It defines the exception escalation contract across architectural boundaries, dictating whether exceptions are propagated directly up to a global controller advice (@ControllerAdvice) or caught and translated at layer boundaries.",
                              "It automatically maps HTTP 404 to SQL errors.",
                              "To encrypt database queries."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! In enterprise Java (e.g. Spring Boot), the 'throws' contract specifies how exceptions escalate through repository and service tiers up to global API advice handlers that serialize standardized JSON error envelopes for clients. (تحدد جملة throws عقود تصعيد ونقل الأخطاء عبر طبقات التطبيق المختلفة وصولاً إلى معالجات الويب الشاملة لتحويلها إلى استجابات HTTP مناسبة)."
          }
]
        }
      ]
    },

    /* ==========================================================================
       TOPIC 42: Custom Exceptions
       ========================================================================== */
    {
      id: "custom-exceptions",
      title: "42. Custom Exceptions",
      description: "Complete Guide to Custom Exceptions in Java: Designing domain-specific exceptions, extending Exception vs RuntimeException, constructor patterns, exception chaining (cause), error codes, diagnostic metadata, and enterprise best practices.",
      lessons: [
        {
          id: "custom-exceptions-mastery",
          title: "Complete Guide to Custom Exceptions",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "Custom Exceptions in Java (الاستثناءات المخصصة في لغة جافا)"
            },
            {
              type: "paragraph",
              text: "While Java provides a rich set of built-in exception classes (such as NullPointerException, IllegalArgumentException, and IOException), enterprise software often requires domain-specific exceptions (e.g., InsufficientFundsException, OrderNotFoundException, PaymentGatewayTimeoutException). Creating custom exceptions allows you to attach domain error codes, preserve debugging metadata, and handle business failures cleanly."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "توفر لغة جافا العديد من الاستثناءات المدمجة الجاهزة، ولكن الأنظمة الحقيقية تحتاج دائماً إلى استثناءات تعبر عن مجال العمل التجاري (مثل InsufficientFundsException أو UserAlreadyExistsException). يتيح إنشاء استثناءات مخصصة تزويد الخطأ بمعلومات تشخيصية إضافية مثل رموز الأخطاء ورقم العملية وتاريخ حدوثها، مما يسهل تتبع المشاكل ومعالجتها بدقة."
            },
            {
              type: "paragraph",
              text: "Design Rules: 1) Extend 'Exception' to create a CHECKED custom exception (forces the caller to handle recoverable errors); 2) Extend 'RuntimeException' to create an UNCHECKED custom exception (for programming errors or unrecoverable domain invariant violations); 3) Always provide the standard four constructors (no-arg, message, cause, and message + cause)."
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
              text: "Example 1: Minimal Custom Checked Exception (المثال 1: أبسط استثناء مخصص مفحوص)"
            },
            {
              type: "paragraph",
              text: "Extending java.lang.Exception to represent a recoverable domain condition."
            },
            {
              type: "code",
              language: "java",
              filename: "MinimalCustomExceptionDemo.java",
              code: `// 1. Extend java.lang.Exception to make it a CHECKED exception
class InsufficientFundsException extends Exception {
    public InsufficientFundsException(String message) {
        super(message); // Pass message up to Exception
    }
}

public class MinimalCustomExceptionDemo {
    private static double balance = 100.0;

    public static void withdraw(double amount) throws InsufficientFundsException {
        if (amount > balance) {
            throw new InsufficientFundsException("Withdrawal of $" + amount + " exceeds current balance: $" + balance);
        }
        balance -= amount;
        System.out.println("Withdrawal successful! Remaining balance: $" + balance);
    }

    public static void main(String[] args) {
        try {
            withdraw(50.0);
            withdraw(80.0); // Fails
        } catch (InsufficientFundsException e) {
            System.out.println("Transaction Rejected: " + e.getMessage());
        }
    }
}`,
              output: `Withdrawal successful! Remaining balance: $50.0
Transaction Rejected: Withdrawal of $80.0 exceeds current balance: $50.0`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "By extending Exception, InsufficientFundsException becomes a checked exception. The compiler obligates callers of withdraw() to handle it."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "بوراثة الصنف Exception، يصبح استثناؤنا مفحوصاً، مما يلزم المستدعي بالتعامل معه عند استدعاء دالة السحب."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Custom Unchecked Exception (RuntimeException) (المثال 2: استثناء مخصص غير مفحوص برث RuntimeException)"
            },
            {
              type: "paragraph",
              text: "Extending RuntimeException for developer errors or unrecoverable system failures."
            },
            {
              type: "code",
              language: "java",
              filename: "CustomUncheckedExceptionDemo.java",
              code: `// Extend RuntimeException to create an UNCHECKED exception
class InvalidTokenException extends RuntimeException {
    public InvalidTokenException(String message) {
        super(message);
    }
}

public class CustomUncheckedExceptionDemo {
    public static void authenticate(String token) {
        if (token == null || !token.startsWith("BEARER_")) {
            throw new InvalidTokenException("Malformed security token: " + token);
        }
        System.out.println("Authentication granted for token: " + token);
    }

    public static void main(String[] args) {
        authenticate("BEARER_sec_99182");

        try {
            authenticate("BASIC_xyz");
        } catch (InvalidTokenException e) {
            System.out.println("Security alert: " + e.getMessage());
        }
    }
}`,
              output: `Authentication granted for token: BEARER_sec_99182
Security alert: Malformed security token: BASIC_xyz`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "Unchecked custom exceptions do not clutter method signatures with throws clauses, making them ideal for modern REST frameworks and business validations."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "الاستثناء غير المفحوص لا يحتاج إلى كتابة throws في توقيع الدوال، وهو النمط السائد في إطارات العمل الحديثة مثل Spring."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: The 4 Standard Constructors Pattern (المثال 3: نمط المنشئات الأربعة القياسية)"
            },
            {
              type: "paragraph",
              text: "Professional Java exceptions implement the 4 standard constructors inherited from Throwable."
            },
            {
              type: "code",
              language: "java",
              filename: "StandardConstructorsDemo.java",
              code: `class OrderProcessingException extends Exception {
    // 1. No-arg default constructor
    public OrderProcessingException() {
        super();
    }

    // 2. Message only constructor
    public OrderProcessingException(String message) {
        super(message);
    }

    // 3. Cause only constructor (exception chaining)
    public OrderProcessingException(Throwable cause) {
        super(cause);
    }

    // 4. Message and Cause constructor
    public OrderProcessingException(String message, Throwable cause) {
        super(message, cause);
    }
}

public class StandardConstructorsDemo {
    public static void main(String[] args) {
        OrderProcessingException ex1 = new OrderProcessingException("Simple failure");
        OrderProcessingException ex2 = new OrderProcessingException("Chained failure", new IllegalStateException("Database down"));

        System.out.println("Ex1: " + ex1.getMessage());
        System.out.println("Ex2 message: " + ex2.getMessage());
        System.out.println("Ex2 root cause: " + ex2.getCause());
    }
}`,
              output: `Ex1: Simple failure
Ex2 message: Chained failure
Ex2 root cause: java.lang.IllegalStateException: Database down`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "Implementing all four constructors guarantees your custom exception can be used seamlessly in any context, including chaining and generic reflection."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "توفير المنشئات الأربعة القياسية يضمن مرونة تامة لاستخدام الاستثناء في كافة المواقف بما في ذلك تسلسل الأخطاء وعكسها."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Custom Exception with Domain State and Metadata (المثال 4: استثناء مخصص يحمل بيانات وحقولاً تشخيصية)"
            },
            {
              type: "paragraph",
              text: "Enriching exceptions with typed fields like account numbers, attempted values, and timestamps."
            },
            {
              type: "code",
              language: "java",
              filename: "StatefulCustomExceptionDemo.java",
              code: `class OverdraftLimitException extends Exception {
    private final String accountId;
    private final double attemptedAmount;
    private final double currentBalance;
    private final double overdraftLimit;

    public OverdraftLimitException(String accountId, double attempted, double balance, double limit) {
        super(String.format("Account %s overdraft exceeded: Attempted $%.2f, Balance $%.2f, Limit $%.2f",
                accountId, attempted, balance, limit));
        this.accountId = accountId;
        this.attemptedAmount = attempted;
        this.currentBalance = balance;
        this.overdraftLimit = limit;
    }

    public String getAccountId() { return accountId; }
    public double getAttemptedAmount() { return attemptedAmount; }
    public double getCurrentBalance() { return currentBalance; }
    public double getOverdraftLimit() { return overdraftLimit; }
}

public class StatefulCustomExceptionDemo {
    public static void main(String[] args) {
        try {
            throw new OverdraftLimitException("ACC-8831", 600.0, 100.0, 200.0);
        } catch (OverdraftLimitException e) {
            System.out.println("Caught: " + e.getMessage());
            System.out.println("Details -> Account: " + e.getAccountId() + 
                               " | Attempted: $" + e.getAttemptedAmount() +
                               " | Max Allowed: $" + (e.getCurrentBalance() + e.getOverdraftLimit()));
        }
    }
}`,
              output: `Caught: Account ACC-8831 overdraft exceeded: Attempted $600.00, Balance $100.00, Limit $200.00
Details -> Account: ACC-8831 | Attempted: $600.0 | Max Allowed: $300.0`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "Adding typed getters allows callers to extract diagnostic numbers and IDs directly without fragile string parsing."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "إضافة حقول ودوال قراءة (Getters) تمكّن الكود من استخراج الأرقام المعنية مباشرة دون الحاجة لتحليل نص الرسالة."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Error Codes in Custom Exceptions (المثال 5: دعم رموز الأخطاء المنظمة Error Codes)"
            },
            {
              type: "paragraph",
              text: "Mapping enterprise exceptions to standard error codes for API integration."
            },
            {
              type: "code",
              language: "java",
              filename: "ErrorCodeExceptionDemo.java",
              code: `enum ServiceErrorCode {
    USER_NOT_FOUND("ERR_USER_404", 404),
    INVALID_CREDENTIALS("ERR_AUTH_401", 401),
    SERVICE_UNAVAILABLE("ERR_DOWN_503", 503);

    final String code;
    final int httpStatus;
    ServiceErrorCode(String code, int status) { this.code = code; this.httpStatus = status; }
}

class ServiceException extends RuntimeException {
    private final ServiceErrorCode errorCode;

    public ServiceException(ServiceErrorCode errorCode, String detailMessage) {
        super("[" + errorCode.code + "] " + detailMessage);
        this.errorCode = errorCode;
    }

    public ServiceErrorCode getErrorCode() { return errorCode; }
}

public class ErrorCodeExceptionDemo {
    public static void findUser(String id) {
        if ("root".equals(id)) {
            System.out.println("User found: System Administrator");
        } else {
            throw new ServiceException(ServiceErrorCode.USER_NOT_FOUND, "User ID '" + id + "' was not found in active directory.");
        }
    }

    public static void main(String[] args) {
        try {
            findUser("guest_user");
        } catch (ServiceException e) {
            System.out.println("API Error: " + e.getMessage());
            System.out.println("HTTP Mapping: " + e.getErrorCode().httpStatus);
        }
    }
}`,
              output: `API Error: [ERR_USER_404] User ID 'guest_user' was not found in active directory.
HTTP Mapping: 404`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "Integrating an enum of error codes allows easy translation into HTTP status codes and frontend localization keys."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "ربط الاستثناء برموز أخطاء يسهل تحويلها تلقائياً إلى أكواد استجابة HTTP أو ترجمتها لواجهة المستخدم."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Exception Chaining with Custom Exceptions (المثال 6: تسلسل الأخطاء وحفظ السبب الأصلي Cause)"
            },
            {
              type: "paragraph",
              text: "Translating a low-level technical exception into a high-level domain exception without losing the stack trace."
            },
            {
              type: "code",
              language: "java",
              filename: "ChainedCustomExceptionDemo.java",
              code: `import java.sql.SQLException;

class InventoryDataAccessException extends Exception {
    public InventoryDataAccessException(String message, Throwable cause) {
        super(message, cause); // Preserves original root cause
    }
}

public class ChainedCustomExceptionDemo {
    public static void updateStock(int itemId, int quantity) throws InventoryDataAccessException {
        try {
            // Simulate low-level DB driver error
            throw new SQLException("Connection timed out to cluster 10.0.1.5:5432");
        } catch (SQLException dbEx) {
            // Wrap low-level SQL exception into domain exception
            throw new InventoryDataAccessException("Could not update inventory for item: " + itemId, dbEx);
        }
    }

    public static void main(String[] args) {
        try {
            updateStock(4041, 10);
        } catch (InventoryDataAccessException e) {
            System.out.println("Domain Error: " + e.getMessage());
            System.out.println("Underlying Root Cause: " + e.getCause().getClass().getName() + " - " + e.getCause().getMessage());
        }
    }
}`,
              output: `Domain Error: Could not update inventory for item: 4041
Underlying Root Cause: java.sql.SQLException - Connection timed out to cluster 10.0.1.5:5432`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "Exception chaining wraps technical details while exposing clear domain terminology to the consumer."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "يحفظ تسلسل الأخطاء سبب الانهيار التقني الأصلي مع تقديم رسالة واضحة بمصطلحات مجال العمل للواجهات العليا."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Custom Exception Hierarchy (المثال 7: بناء تسلسل هرمي منظم للاستثناءات)"
            },
            {
              type: "paragraph",
              text: "Structuring related exceptions under an abstract base domain exception."
            },
            {
              type: "code",
              language: "java",
              filename: "HierarchyExceptionDemo.java",
              code: `// Base abstract domain exception
abstract class PaymentException extends Exception {
    public PaymentException(String message) { super(message); }
}

class CardExpiredException extends PaymentException {
    public CardExpiredException(String msg) { super(msg); }
}

class FraudDetectedException extends PaymentException {
    public FraudDetectedException(String msg) { super(msg); }
}

public class HierarchyExceptionDemo {
    public static void process(String cardDate, double amount) throws PaymentException {
        if ("2020-01".equals(cardDate)) {
            throw new CardExpiredException("Card expired on " + cardDate);
        }
        if (amount > 10000.0) {
            throw new FraudDetectedException("Suspicious single transaction amount: $" + amount);
        }
        System.out.println("Payment processed successfully.");
    }

    public static void main(String[] args) {
        try {
            process("2020-01", 50.0);
        } catch (CardExpiredException e) {
            System.out.println("Prompt user for fresh card: " + e.getMessage());
        } catch (PaymentException e) {
            // General fallback for all payment failures
            System.out.println("General payment failure: " + e.getMessage());
        }
    }
}`,
              output: `Prompt user for fresh card: Card expired on 2020-01`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "A hierarchy allows callers to catch specific subclasses (like CardExpiredException) or the parent (PaymentException) as a single catch-all."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "يتيح التسلسل الهرمي للمستدعي التقاط خطأ دقيق محدد أو التقاط الصنف الأب الجامع لكافة أخطاء الدفع في سطر واحد."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Serializable Custom Exceptions and serialVersionUID (المثال 8: دعم قابلية النقل والتسلسل عبر الشبكة)"
            },
            {
              type: "paragraph",
              text: "Throwable implements Serializable; custom exceptions passed across RPC/RMI should declare serialVersionUID."
            },
            {
              type: "code",
              language: "java",
              filename: "SerializableExceptionDemo.java",
              code: `import java.io.Serializable;

class RemoteServiceException extends RuntimeException implements Serializable {
    private static final long serialVersionUID = 1L; // Ensures version compatibility across serialization

    private final String serviceEndpoint;

    public RemoteServiceException(String endpoint, String message) {
        super(message);
        this.serviceEndpoint = endpoint;
    }

    public String getServiceEndpoint() { return serviceEndpoint; }
}

public class SerializableExceptionDemo {
    public static void main(String[] args) {
        RemoteServiceException ex = new RemoteServiceException("https://auth.internal/v1", "Gateway Handshake Timeout");
        System.out.println("Created serializable exception for: " + ex.getServiceEndpoint());
        System.out.println("Exception message: " + ex.getMessage());
    }
}`,
              output: `Created serializable exception for: https://auth.internal/v1
Exception message: Gateway Handshake Timeout`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "Declaring serialVersionUID prevents InvalidClassException when exceptions are transmitted across distributed microservices."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "يمنع تعريف serialVersionUID مشاكل التوافق عند إرسال الاستثناءات عبر الشبكة بين خوادم مختلفة."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Custom Validation Exception with Multiple Field Errors (المثال 9: استثناء التحقق المتعدد من حقول الإدخال)"
            },
            {
              type: "paragraph",
              text: "Collecting multiple form or payload validation errors inside a single custom exception."
            },
            {
              type: "code",
              language: "java",
              filename: "ValidationExceptionDemo.java",
              code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class ModelValidationException extends RuntimeException {
    private final List<String> validationErrors;

    public ModelValidationException(List<String> errors) {
        super("Model validation failed with " + errors.size() + " error(s).");
        this.validationErrors = new ArrayList<>(errors);
    }

    public List<String> getValidationErrors() {
        return Collections.unmodifiableList(validationErrors);
    }
}

public class ValidationExceptionDemo {
    public static void registerUser(String username, String email, int age) {
        List<String> errors = new ArrayList<>();
        if (username == null || username.isBlank()) errors.add("Username is required.");
        if (email == null || !email.contains("@")) errors.add("Email must be valid.");
        if (age < 18) errors.add("User must be at least 18 years old.");

        if (!errors.isEmpty()) {
            throw new ModelValidationException(errors);
        }
        System.out.println("Registration successful for: " + username);
    }

    public static void main(String[] args) {
        try {
            registerUser("", "bad-email", 15);
        } catch (ModelValidationException e) {
            System.out.println(e.getMessage());
            for (String err : e.getValidationErrors()) {
                System.out.println(" - " + err);
            }
        }
    }
}`,
              output: `Model validation failed with 3 error(s).
 - Username is required.
 - Email must be valid.
 - User must be at least 18 years old.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "Instead of failing on the first invalid field, this custom exception aggregates all invalid inputs to return to the user at once."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "بدلاً من إيقاف البرنامج عند أول خطأ، يجمع هذا الاستثناء كافة الحقول غير الصحيحة لتقديم تقرير كامل للمستخدم."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Custom Resource Leak Exception with Diagnostic Context (المثال 10: استثناء تسريب الموارد مع السياق التشخيصي)"
            },
            {
              type: "paragraph",
              text: "Tracking resource open stacks to identify where resource leaks occur."
            },
            {
              type: "code",
              language: "java",
              filename: "ResourceLeakExceptionDemo.java",
              code: `class ResourceLeakException extends RuntimeException {
    private final String resourceId;
    private final long allocatedTimestamp;

    public ResourceLeakException(String resId, long allocatedTime, String message) {
        super(String.format("Resource leak detected on [%s]: %s", resId, message));
        this.resourceId = resId;
        this.allocatedTimestamp = allocatedTime;
    }

    public String getResourceId() { return resourceId; }
    public long getAllocatedTimestamp() { return allocatedTimestamp; }
}

public class ResourceLeakExceptionDemo {
    public static void main(String[] args) {
        try {
            throw new ResourceLeakException("SOCKET-POOL-09", System.currentTimeMillis(), "Not closed after 60s idle");
        } catch (ResourceLeakException rle) {
            System.out.println("ALERT: " + rle.getMessage());
            System.out.println("Leak Resource ID: " + rle.getResourceId());
        }
    }
}`,
              output: `ALERT: Resource leak detected on [SOCKET-POOL-09]: Not closed after 60s idle
Leak Resource ID: SOCKET-POOL-09`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "Custom diagnostics allow tracing tools to quickly identify unclosed handles or memory leaks."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "تساعد الاستثناءات التشخيصية أدوات المراقبة في كشف الموارد التي لم يتم إغلاقها في الوقت المناسب."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Enterprise REST API Exception Translator (المثال 11: مترجم استثناءات واجهات البرمجة المؤسسية)"
            },
            {
              type: "paragraph",
              text: "Simulating a global exception handler (similar to Spring's @ControllerAdvice) converting custom exceptions to JSON responses."
            },
            {
              type: "code",
              language: "java",
              filename: "EnterpriseExceptionTranslatorDemo.java",
              code: `abstract class ApiException extends RuntimeException {
    private final int statusCode;
    private final String errorCode;

    public ApiException(String message, int status, String code) {
        super(message);
        this.statusCode = status;
        this.errorCode = code;
    }

    public int getStatusCode() { return statusCode; }
    public String getErrorCode() { return errorCode; }
}

class EntityNotFoundException extends ApiException {
    public EntityNotFoundException(String entity, Object id) {
        super(entity + " with ID '" + id + "' was not found.", 404, "NOT_FOUND");
    }
}

class RateLimitExceededApiException extends ApiException {
    public RateLimitExceededApiException(int maxLimit) {
        super("Rate limit of " + maxLimit + " req/sec exceeded.", 429, "TOO_MANY_REQUESTS");
    }
}

public class EnterpriseExceptionTranslatorDemo {
    public static String handleException(Exception ex) {
        if (ex instanceof ApiException apiEx) {
            return String.format("HTTP %d | Code: %s | Message: %s",
                    apiEx.getStatusCode(), apiEx.getErrorCode(), apiEx.getMessage());
        }
        return "HTTP 500 | Code: INTERNAL_SERVER_ERROR | Message: An unexpected error occurred.";
    }

    public static void main(String[] args) {
        System.out.println(handleException(new EntityNotFoundException("Customer", 8812)));
        System.out.println(handleException(new RateLimitExceededApiException(100)));
        System.out.println(handleException(new NullPointerException("Null pointer reference")));
    }
}`,
              output: `HTTP 404 | Code: NOT_FOUND | Message: Customer with ID '8812' was not found.
HTTP 429 | Code: TOO_MANY_REQUESTS | Message: Rate limit of 100 req/sec exceeded.
HTTP 500 | Code: INTERNAL_SERVER_ERROR | Message: An unexpected error occurred.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "A centralized handler inspects custom exception metadata and maps it directly into standard REST responses."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "يقوم المعالج المركزي بفحص بيانات الاستثناء المخصص وتحويلها بسلاسة إلى استجابات HTTP مناسبة للمستخدم النهائي."
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
                "Mistake 1: Creating custom exceptions that extend java.lang.Throwable directly. Always extend Exception or RuntimeException.",
                "خطأ 1: وراثة الصنف Throwable مباشرة؛ يجب دائماً وراثة Exception أو RuntimeException.",
                "Mistake 2: Forgetting to call super(message) or super(cause) in custom constructors, resulting in blank messages and lost stack traces.",
                "خطأ 2: نسيان استدعاء super(message) داخل المنشئ، مما يؤدي لظهور رسالة فارغة عند طباعة getMessage().",
                "Mistake 3: Creating a custom exception for conditions that built-in exceptions already handle well (e.g., creating EmptyStringException instead of using IllegalArgumentException)."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Banking Account Exception Engine (التحدي العملي: محرك استثناءات الحساب البنكي)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Build a bank domain error system: 1) Abstract class 'BankException extends Exception'; 2) Subclasses 'AccountLockedException' (with lockReason) and 'TransferLimitExceededException' (with maxLimit, requestedAmount); 3) Class 'BankAccount' with method 'transfer(double amount, boolean isLocked)': if isLocked throw AccountLockedException; if amount > 5000 throw TransferLimitExceededException; 4) In main(), test both error cases and display full diagnostics."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: صمم نظام استثناءات بنكي: 1) فئة مجردة BankException ترث Exception؛ 2) فئتان فرعيتان AccountLockedException و TransferLimitExceededException تحملان حقولاً تشخيصية؛ 3) فئة BankAccount بدالة transfer تفحص القفل والحد الأقصى؛ 4) اختبر الحالتين واطبع البيانات التشخيصية."
            },
            {
              type: "code",
              language: "java",
              filename: "BankExceptionChallenge.java",
              code: `public class BankExceptionChallenge {
    abstract static class BankException extends Exception {
        public BankException(String message) { super(message); }
    }

    static class AccountLockedException extends BankException {
        private final String reason;
        public AccountLockedException(String reason) {
            super("Account is locked: " + reason);
            this.reason = reason;
        }
        public String getReason() { return reason; }
    }

    static class TransferLimitExceededException extends BankException {
        private final double maxLimit;
        private final double requested;

        public TransferLimitExceededException(double max, double req) {
            super(String.format("Transfer of $%.2f exceeds limit of $%.2f", req, max));
            this.maxLimit = max;
            this.requested = req;
        }

        public double getMaxLimit() { return maxLimit; }
        public double getRequested() { return requested; }
    }

    static class BankAccount {
        public static void transfer(double amount, boolean isLocked) throws BankException {
            if (isLocked) {
                throw new AccountLockedException("Suspected unauthorized login attempt");
            }
            if (amount > 5000.0) {
                throw new TransferLimitExceededException(5000.0, amount);
            }
            System.out.printf("Transfer of $%.2f succeeded.%n", amount);
        }
    }

    public static void main(String[] args) {
        // Case 1: Locked Account
        try {
            BankAccount.transfer(100.0, true);
        } catch (AccountLockedException e) {
            System.out.println("Alert: " + e.getMessage() + " [Reason: " + e.getReason() + "]");
        } catch (BankException e) {
            System.out.println("Bank error: " + e.getMessage());
        }

        // Case 2: Limit Exceeded
        try {
            BankAccount.transfer(7500.0, false);
        } catch (TransferLimitExceededException e) {
            System.out.println("Limit Block: " + e.getMessage() + " (Excess: $" + (e.getRequested() - e.getMaxLimit()) + ")");
        } catch (BankException e) {
            System.out.println("Bank error: " + e.getMessage());
        }
    }
}`,
              output: `Alert: Account is locked: Suspected unauthorized login attempt [Reason: Suspected unauthorized login attempt]
Limit Block: Transfer of $7500.00 exceeds limit of $5000.00 (Excess: $2500.0)`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "Custom exception hierarchies with domain-specific properties allow catching and handling fine-grained business rules cleanly."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "تتيح الاستثناءات ذات الحقول المخصصة معالجة القواعد البنكية بدقة متناهية واستخراج أرقام الفروقات مباشرة."
            }
          ],
          quiz: [
          {
                    "id": "q1",
                    "question": "Which base class must a custom exception extend if it is designed to represent a recoverable business condition that callers MUST explicitly handle at compile-time?\n(ما الصنف الأساسي الذي يجب أن يرثه الاستثناء المخصص ليمثل حالة قابلة للاسترجاع يلزم المترجم المستدعي بالتعامل معها إلزامياً؟)",
                    "options": [
                              "java.lang.RuntimeException",
                              "java.lang.Exception (directly, without extending RuntimeException)",
                              "java.lang.Error",
                              "java.lang.Throwable (directly)"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Extending Exception directly (and not RuntimeException) creates a checked exception. The Java compiler enforces that callers either catch it or declare it in their 'throws' clause. (وراثة Exception مباشرة دون RuntimeException تنشئ استثناءً مفحوصاً Checked يفرضه المترجم)."
          },
          {
                    "id": "q2",
                    "question": "Why is it best practice for a custom exception to provide a constructor accepting '(String message, Throwable cause)'?\n(لماذا يُعتبر توفير منشئ يستقبل الرسالة والسبب كأفضل ممارسة في الاستثناءات المخصصة؟)",
                    "options": [
                              "To allow exception chaining so the underlying root cause is preserved in the stack trace.",
                              "Because the Java compiler will fail to compile the class without it.",
                              "To automatically restart the failed method when the exception is thrown.",
                              "To serialize the exception across network sockets without serialVersionUID."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! Exception chaining (passing 'cause' via super(message, cause)) preserves the original low-level exception stack trace, which is crucial for debugging production issues. (سلسلة الاستثناءات تضمن حفظ السبب الجذري الأصلي في سجل تتبع المكدس لتسهيل تتبع الأخطاء)."
          },
          {
                    "id": "q3",
                    "question": "Given this custom exception definition:\npublic class InsufficientFundsException extends Exception {\n    private final double balance;\n    private final double attempted;\n    public InsufficientFundsException(double balance, double attempted) {\n        super(\"Short by: $\" + (attempted - balance));\n        this.balance = balance;\n        this.attempted = attempted;\n    }\n    public double getDeficit() { return attempted - balance; }\n}\nWhat is the main software engineering advantage of storing 'balance' and 'attempted' as fields?\n(ما الفائدة الهندسية لتخزين الحقول balance و attempted داخل الاستثناء المخصص؟)",
                    "options": [
                              "It speeds up JVM garbage collection when the exception is caught.",
                              "It provides structured, typed domain data to the catch block for automated handling (e.g. logging or alerting).",
                              "It prevents the exception from being caught by generic 'catch (Exception e)' blocks.",
                              "It automatically converts the exception into an unchecked RuntimeException."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Custom fields allow exception handlers to programmatically inspect the exact numbers, calculate deficits, or display localized UI messages without having to parse strings from getMessage(). (تتيح الحقول المخصصة معالجة برمجية دقيقة للقيم الرقمية بدلاً من الاضطرار لتحليل النصوص)."
          },
          {
                    "id": "q4",
                    "question": "What happens when compiling and running this code?\nclass PaymentException extends Exception {}\nclass CardExpiredException extends PaymentException {}\npublic class Test {\n    public static void process() throws PaymentException {\n        throw new CardExpiredException();\n    }\n    public static void main(String[] args) {\n        try {\n            process();\n        } catch (CardExpiredException e) {\n            System.out.print(\"Expired \");\n        } catch (PaymentException e) {\n            System.out.print(\"Payment \");\n        }\n    }\n}\n(ما مخرجات هذا الكود عند ترجمته وتشغيله؟)",
                    "options": [
                              "Expired",
                              "Payment",
                              "Expired Payment",
                              "Compilation error: unreachable catch block"
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! The subclass CardExpiredException is caught by the first matching catch block. Because the subclass catch precedes the superclass catch, it compiles cleanly and outputs 'Expired '. (تم التقاط الاستثناء بواسطة أول catch متطابقة للصنف الفرعي وطُبع Expired)."
          },
          {
                    "id": "q5",
                    "question": "What is the compiler error in the following code snippet?\npublic class AgeException extends Exception {}\npublic class UserValidator {\n    public void validate(int age) {\n        if (age < 0) {\n            throw new AgeException();\n        }\n    }\n}\n(ما هو خطأ المترجم في هذا المقطع البرمجي؟)",
                    "options": [
                              "AgeException does not define any constructors.",
                              "Unhandled exception type AgeException; validate() must either declare it in a 'throws' clause or catch it.",
                              "age < 0 cannot be evaluated inside a throw statement.",
                              "Custom exceptions cannot be instantiated with the 'new' keyword."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Because AgeException extends Exception directly, it is a checked exception. Any method that throws it must either handle it with try-catch or declare 'throws AgeException'. (بما أنه استثناء مفحوص Checked، يلزم الإعلان عنه بـ throws أو الإحاطة بـ try-catch وإلا فشلت الترجمة)."
          },
          {
                    "id": "q6",
                    "question": "Why do high-throughput frameworks (like Netty or Akka) sometimes override 'fillInStackTrace()' in specialized custom control-flow exceptions?\npublic synchronized Throwable fillInStackTrace() { return this; }\n(لماذا تقوم بعض أطر العمل عالية الأداء بإلغاء دالة fillInStackTrace في استثناءات مخصصة؟)",
                    "options": [
                              "To prevent hackers from reading bytecode instructions.",
                              "To avoid the heavy CPU performance penalty of walking the JVM call stack when the stack trace is not needed.",
                              "To allow the exception to be thrown without memory allocation.",
                              "To bypass the Java security manager verification check."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Generating a full stack trace requires walking the execution stack frames, which is the most CPU-intensive part of throwing an exception. Overriding fillInStackTrace() to return 'this' makes throwing lightweight. (توليد مكدس التتبع عملية مكلفة للمعالج، وإلغاؤها يجعل الاستثناء فائق السرعة والخفة في الأداء)."
          },
          {
                    "id": "q7",
                    "question": "Why is it strongly recommended to add 'private static final long serialVersionUID' to a custom exception class?\n(لماذا يُوصى بشدة بإضافة serialVersionUID لصنف الاستثناء المخصص؟)",
                    "options": [
                              "Because Exception implements java.io.Serializable, and mismatched generated IDs cause InvalidClassException during RMI or deserialization.",
                              "To ensure the exception executes on a single dedicated OS thread.",
                              "To limit the maximum number of times the exception can be thrown in one second.",
                              "Because Java 17 forbids throwing non-serializable objects."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! java.lang.Throwable implements Serializable. If custom exceptions are transmitted across RMI, microservices, or serialized sessions, a fixed serialVersionUID prevents deserialization failures if the class bytecode slightly changes. (يرث Throwable واجهة Serializable، وتحديد serialVersionUID يضمن توافق فك التسلسل عبر الشبكات والأجهزة)."
          },
          {
                    "id": "q8",
                    "question": "Consider the following pattern:\ntry {\n    userDao.save(user); // throws java.sql.SQLException\n} catch (SQLException e) {\n    throw new DataStorageException(\"Failed to persist user\", e);\n}\nWhat is this architectural design pattern called?\n(ماذا يُسمى هذا النمط المعماري في معالجة الاستثناءات؟)",
                    "options": [
                              "Exception Masking / Swallowing",
                              "Exception Translation (or Exception Wrapping)",
                              "Double Faulting",
                              "Circuit Breaking"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Exception Translation catches a lower-level implementation-specific exception (like SQLException) and rethrows a meaningful higher-level domain exception (DataStorageException) while preserving the root cause. (ترجمة الاستثناءات تعني تغليف استثناء منخفض المستوى بآخر يعبر عن منطق العمل مع حفظ السبب الأصلي)."
          },
          {
                    "id": "q9",
                    "question": "What will be printed when running this code?\npublic class CustomMsgException extends RuntimeException {\n    public CustomMsgException(String msg) {\n        // Note: super(msg) is NOT called!\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        CustomMsgException ex = new CustomMsgException(\"Database offline\");\n        System.out.println(ex.getMessage());\n    }\n}\n(ماذا سيُطبع عند تنفيذ هذا البرنامج؟)",
                    "options": [
                              "Database offline",
                              "null",
                              "CustomMsgException: Database offline",
                              "Compilation error: implicit super() call is undefined"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Because super(msg) was not invoked, Throwable's default no-arg constructor ran, leaving detailMessage as null. ex.getMessage() therefore returns null! (عدم استدعاء super(msg) يترك رسالة التفاصيل فارغة null في الصنف الأعلى Throwable)."
          },
          {
                    "id": "q10",
                    "question": "Why do modern Java enterprise frameworks (like Spring Framework) prefer custom UNCHECKED exceptions (extending RuntimeException) over checked exceptions?\n(لماذا تفضل أطر العمل الحديثة مثل Spring الاستثناءات المخصصة غير المفحوصة RuntimeException؟)",
                    "options": [
                              "Because checked exceptions are deprecated in Java 21.",
                              "Unchecked exceptions avoid cluttering business interfaces with 'throws' clauses and work seamlessly with lambda expressions and functional pipelines.",
                              "Because unchecked exceptions cannot cause application crashes.",
                              "Because unchecked exceptions run natively in C++ memory."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Checked exceptions create tight coupling across method signatures and cannot be cleanly used inside Stream/lambda expressions without boilerplate. Modern frameworks use unchecked exceptions for clean separation and declarative rollback. (الاستثناءات غير المفحوصة تمنع تلويث التواقيع بـ throws وتتوافق بسلاسة مع دوال Lambdas و Streams)."
          },
          {
                    "id": "q11",
                    "question": "Given this code:\npublic class AccountFrozenException extends RuntimeException {\n    private final Date frozenDate;\n    public AccountFrozenException(Date date) {\n        super(\"Account frozen since \" + date);\n        this.frozenDate = new Date(date.getTime()); // defensive copy\n    }\n    public Date getFrozenDate() {\n        return new Date(frozenDate.getTime());\n    }\n}\nWhy is the defensive copy created in the constructor and getter?\n(لماذا تم استخدام النسخ الدفاعي Defensive Copy في المنشئ والدالة getFrozenDate؟)",
                    "options": [
                              "To prevent callers from mutating the internal date state of the exception after it has been thrown.",
                              "Because java.util.Date is not compatible with Exception classes.",
                              "To prevent StackOverflowError during serialization.",
                              "To synchronize access across multiple concurrent threads."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! java.util.Date is mutable. Without defensive copying, an external caller could modify the date object, altering the exception's reported state post-throw. Making exceptions immutable is a core best practice. (فئة Date قابلة للتعديل، والنسخ الدفاعي يحافظ على جمود وحصانة بيانات الاستثناء من التلاعب بعد رميه)."
          },
          {
                    "id": "q12",
                    "question": "What is the consequence if a custom exception class accidentally defines an instance variable with the same name 'detailMessage' as java.lang.Throwable?\n(ما النتيجة المترتبة إذا عرّف صنف الاستثناء متغيراً باسم detailMessage بنفس اسم حقل Throwable؟)",
                    "options": [
                              "It causes a compilation error because field names in Throwable are reserved words.",
                              "Variable shadowing occurs: getMessage() still accesses Throwable's field, while the subclass accesses its own shadowed field, causing subtle bugs.",
                              "The JVM automatically merges both variables into an array.",
                              "It forces the class to implement Cloneable."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Field shadowing does not override fields. getMessage() defined in Throwable will continue reading Throwable's private detailMessage, ignoring the subclass's shadowed variable unless explicitly overridden. (تظليل الحقول Shadowing يؤدي لقراءة الحقل الأصلي في Throwable وتجاهل حقل الصنف الفرعي ما لم يتم تجاوز getMessage)."
          },
          {
                    "id": "q13",
                    "question": "What will happen when compiling and executing the following code?\nclass BaseDomainException extends RuntimeException {}\nclass OrderNotFoundException extends BaseDomainException {}\npublic class App {\n    public static void main(String[] args) {\n        try {\n            throw new OrderNotFoundException();\n        } catch (BaseDomainException | OrderNotFoundException e) {\n            System.out.println(\"Caught\");\n        }\n    }\n}\n(ماذا يحدث عند ترجمة وتشغيل هذا الكود؟)",
                    "options": [
                              "It prints: Caught",
                              "Compilation error: The exception OrderNotFoundException is already caught by the alternative BaseDomainException",
                              "Runtime exception: MultiCatchDisallowedException",
                              "It prints nothing and terminates silently"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! In multi-catch blocks (introduced in Java 7), alternatives cannot have a subclass-superclass relationship. Because OrderNotFoundException is a subclass of BaseDomainException, the compiler rejects the multi-catch statement. (في multi-catch لا يجوز وضع صنفين يرث أحدهما الآخر لأن الأصغر مغطى بالكامل بالأكبر، ويرفضه المترجم)."
          },
          {
                    "id": "q14",
                    "question": "Which of the following custom exception designs best supports internationalization (i18n) and client-facing API responses?\n(أي تصميم للاستثناء المخصص يُعد الأفضل لدعم التدويل i18n وواجهات برمجة التطبيقات؟)",
                    "options": [
                              "Hardcoding English error message strings in the throw statement.",
                              "Defining an ErrorCode enum and dynamic parameter placeholders inside the custom exception class.",
                              "Printing the stack trace to System.err before throwing.",
                              "Creating a separate custom exception class for every single error message."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Using an ErrorCode enum (e.g. ErrorCode.INVALID_COUPON) along with parameter arguments allows API layers and frontends to translate error codes into any language and return structured JSON error payloads. (استخدام أكواد خطأ رمزية Enum مع معاملات متغيرة يسمح بترجمة الرسائل إلى لغات متعددة وتحويلها إلى JSON منظّم)."
          },
          {
                    "id": "q15",
                    "question": "What is printed by the following code?\nclass ResourceException extends Exception {}\nclass BusinessException extends Exception {}\npublic class Flow {\n    public static void main(String[] args) {\n        try {\n            throw new BusinessException();\n        } catch (BusinessException e) {\n            System.out.print(\"Business \");\n            throw new RuntimeException(\"Wrap\", e);\n        } finally {\n            System.out.print(\"Finally \");\n        }\n    }\n}\n(ما الناتج المطبوع من الكود التالي؟)",
                    "options": [
                              "Business Finally followed by uncaught RuntimeException stack trace",
                              "Business followed immediately by RuntimeException (Finally is skipped)",
                              "Finally Business",
                              "Compilation error: uncaught checked exception in main"
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! The catch block runs and prints 'Business '. Then it rethrows a RuntimeException. Before the unhandled RuntimeException exits the method, the finally block is guaranteed to execute, printing 'Finally '. (يُنفذ catch ويطبع Business، وقبل خروج الاستثناء الجديد يُنفذ finally حتماً ليطبع Finally ثم يسقط البرنامج)."
          }
]
        }
      ]
    }
  ];
})();
