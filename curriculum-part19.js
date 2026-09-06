/**
 * Java Curriculum Module - Part 19
 * Topics:
 * 37. Java Multiple Exceptions
 * 38. try-catch
 * 
 * 100% Offline, Pure JavaScript. Complete educational content with full bilingual (English & Arabic) explanations.
 */

(function () {
  'use strict';

  window.JAVA_TOPICS_PART19 = [
    /* ==========================================================================
       TOPIC 37: Java Multiple Exceptions
       ========================================================================== */
    {
      id: "java-multiple-exceptions",
      title: "37. Java Multiple Exceptions",
      description: "Comprehensive Guide to Handling Multiple Exceptions in Java: Multiple catch blocks, ordering rules (subclass before superclass), Java 7 multi-catch (pipe operator), effectively final catch variables, and exception dispatching.",
      lessons: [
        {
          id: "java-multiple-exceptions-mastery",
          title: "Complete Guide to Multiple Exceptions",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "Handling Multiple Exceptions in Java (التعامل مع الاستثناءات المتعددة في جافا)"
            },
            {
              type: "paragraph",
              text: "A single piece of code may encounter multiple different failure modes (e.g., file not found, bad number format, database connection failure, network timeout). Java provides sophisticated mechanisms to handle each failure type distinctly using multiple catch blocks or the compact multi-catch syntax introduced in Java 7."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "قد يتعرض سطر برمجي واحد لعدة أنواع مختلفة من الأخطاء أثناء تنفيذه (مثل: عدم وجود ملف، أو خطأ في صيغة الأرقام، أو فشل الاتصال بقاعدة البيانات). توفر جافا تقنيات متطورة للتعامل مع كل نوع خطأ على حدة باستخدام بلوكات catch المتعددة، أو صياغة الـ Multi-Catch المدمجة (باستخدام رمز الأنبوب |) التي تم إدخالها في جافا 7 لتنظيف الكود وتفادي تكراره."
            },
            {
              type: "paragraph",
              text: "Core Golden Rules: 1) Catch Ordering Rule: More specific (subclass) exceptions MUST always be placed before broader (superclass) exceptions; placing a superclass catch first causes a compile-time 'unreachable code' error; 2) Multi-Catch Rule: In a single catch parameter using pipe '|', alternative exceptions must NOT have a parent-child inheritance relationship; 3) The multi-catch variable is implicitly 'final'."
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
              text: "Example 1: Classic Multiple Catch Blocks (المثال 1: بلوكات catch المتعددة التقليدية)"
            },
            {
              type: "paragraph",
              text: "Providing dedicated handling logic for each distinct exception type."
            },
            {
              type: "code",
              language: "java",
              filename: "MultipleCatchBlocksDemo.java",
              code: `public class MultipleCatchBlocksDemo {
    public static void executeCalculation(String[] tokens, int index) {
        try {
            int num = Integer.parseInt(tokens[index]);
            int result = 100 / num;
            System.out.println("Result: " + result);
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("[HANDLED] Invalid index requested: " + e.getMessage());
        } catch (NumberFormatException e) {
            System.out.println("[HANDLED] Token is not a valid integer: " + e.getMessage());
        } catch (ArithmeticException e) {
            System.out.println("[HANDLED] Math division by zero: " + e.getMessage());
        }
    }

    public static void main(String[] args) {
        String[] data = { "5", "abc", "0" };

        System.out.println("Test 1 (Valid):");
        executeCalculation(data, 0); // Valid: 100 / 5 = 20

        System.out.println("Test 2 (Number Format):");
        executeCalculation(data, 1); // Fails parsing "abc"

        System.out.println("Test 3 (Arithmetic):");
        executeCalculation(data, 2); // Fails dividing by 0

        System.out.println("Test 4 (Index Out of Bounds):");
        executeCalculation(data, 9); // Index 9 does not exist
    }
}`,
              output: `Test 1 (Valid):
Result: 20
Test 2 (Number Format):
[HANDLED] Token is not a valid integer: For input string: "abc"
Test 3 (Arithmetic):
[HANDLED] Math division by zero: / by zero
Test 4 (Index Out of Bounds):
[HANDLED] Invalid index requested: Index 9 out of bounds for length 3`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "Each catch block captures its designated exception, executing tailored recovery logic for that failure scenario."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "يعالج كل بلوك catch نوعاً محدداً من الاستثناءات، مما يتيح تقديم حلول ملائمة لكل سيناريو خطأ."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: The Sacred Hierarchy Order Rule (Subclass Before Superclass) (المثال 2: قاعدة الترتيب الإلزامية: الفرعي قبل الأصلي)"
            },
            {
              type: "paragraph",
              text: "Why placing a superclass catch block first triggers a compiler error."
            },
            {
              type: "code",
              language: "java",
              filename: "CatchOrderRuleDemo.java",
              code: `import java.io.FileNotFoundException;
import java.io.IOException;

public class CatchOrderRuleDemo {
    public static void openFile(boolean triggerSubclass) throws IOException {
        if (triggerSubclass) {
            throw new FileNotFoundException("data.csv not located");
        } else {
            throw new IOException("General physical hard drive read error");
        }
    }

    public static void main(String[] args) {
        try {
            openFile(true);
        } catch (FileNotFoundException fnf) {
            // MUST COME FIRST: FileNotFoundException is a subclass of IOException
            System.out.println("Specialized handler: Missing file detected! " + fnf.getMessage());
        } catch (IOException io) {
            // General catch for all other IOExceptions
            System.out.println("General IO handler: " + io.getMessage());
        }
    }
}`,
              output: `Specialized handler: Missing file detected! data.csv not located`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "If 'catch (IOException)' were placed first, it would intercept all FileNotFoundExceptions, rendering the second catch block unreachable dead code."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "لو وضعنا IOException في البداية لابتلع جميع استثناءات FileNotFoundException، ولرفض المترجم الكود لوجود بلوك ميت لا يمكن الوصول إليه."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Java 7 Multi-Catch Syntax with the Pipe '|' Operator (المثال 3: ميزة Multi-Catch برمز الأنبوب |)"
            },
            {
              type: "paragraph",
              text: "Combining multiple unrelated exceptions into a single concise catch block to eliminate duplicate code."
            },
            {
              type: "code",
              language: "java",
              filename: "Java7MultiCatchDemo.java",
              code: `public class Java7MultiCatchDemo {
    public static void processInput(String input, int index) {
        String[] items = { "42", "invalid_text" };
        try {
            int val = Integer.parseInt(items[index]);
            System.out.println("Parsed integer successfully: " + val);
        } catch (ArrayIndexOutOfBoundsException | NumberFormatException ex) {
            // Multi-catch: Handled identically without duplicate boilerplate!
            System.out.println("[INPUT ERROR] Bad request parameter: " + ex.getClass().getSimpleName() + " -> " + ex.getMessage());
        }
    }

    public static void main(String[] args) {
        processInput("test", 5); // Triggers ArrayIndexOutOfBoundsException
        processInput("test", 1); // Triggers NumberFormatException
    }
}`,
              output: `[INPUT ERROR] Bad request parameter: ArrayIndexOutOfBoundsException -> Index 5 out of bounds for length 2
[INPUT ERROR] Bad request parameter: NumberFormatException -> For input string: "invalid_text"`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "The multi-catch pipe '|' combines exceptions that require identical handling, significantly reducing boilerplate code."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "يجمع رمز الأنبوب | بين الاستثناءات المختلفة التي تتطلب نفس طريقة المعالجة، مما يختصر الكود المكرر بأناقة."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: The Effectively Final Nature of Multi-Catch Variables (المثال 4: حظر تعديل متغير Multi-Catch لكونه Final ضمنياً)"
            },
            {
              type: "paragraph",
              text: "In multi-catch, the exception parameter variable is implicitly final and cannot be reassigned."
            },
            {
              type: "code",
              language: "java",
              filename: "EffectivelyFinalMultiCatchDemo.java",
              code: `public class EffectivelyFinalMultiCatchDemo {
    public static void main(String[] args) {
        try {
            int x = Integer.parseInt("invalid");
        } catch (NumberFormatException | ArithmeticException ex) {
            System.out.println("Caught exception: " + ex.getMessage());

            // LEGAL in single catch: ex = new ArithmeticException();
            // ILLEGAL in multi-catch: The parameter 'ex' is implicitly final!
            // ex = new NumberFormatException(); // COMPILE ERROR: Cannot assign a value to final variable 'ex'
        }
    }
}`,
              output: `Caught exception: For input string: "invalid"`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "The Java compiler treats multi-catch parameters as implicitly final to guarantee type safety across the union of types."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "يعامل المترجم متغير الـ Multi-Catch كمتغير ثابت final لا يمكن إعادة إسناد قيمة جديدة إليه لضمان أمان الأنواع."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Disallowed Subclass Pairs in Multi-Catch (المثال 5: حظر الجمع بين فئة وأحد فروعها في Multi-Catch)"
            },
            {
              type: "paragraph",
              text: "You cannot write 'catch (FileNotFoundException | IOException e)' because FileNotFoundException is already an IOException."
            },
            {
              type: "code",
              language: "java",
              filename: "DisallowedUnionDemo.java",
              code: `import java.io.FileNotFoundException;
import java.io.IOException;

public class DisallowedUnionDemo {
    public static void testRule() {
        try {
            if (true) throw new FileNotFoundException("file missing");
        } catch (IOException e) {
            // Correct approach: Just catch IOException!
            // Writing: 'catch (FileNotFoundException | IOException e)' causes compile error:
            // "The exception FileNotFoundException is already caught by the alternative IOException"
            System.out.println("Caught file/IO error: " + e.getMessage());
        }
    }

    public static void main(String[] args) {
        testRule();
    }
}`,
              output: `Caught file/IO error: file missing`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "Combining parent and child exceptions in multi-catch is redundant and rejected by the Java compiler."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "يرفض المترجم الجمع بين استثناء وأصله في Multi-Catch لعدم وجود فائدة منطقية، ويكتفى بكتابة الفئة الأب فقط."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Hybrid Multi-Catch with Fallback Superclass (المثال 6: الدمج الهجين بين Multi-Catch وبلوك عام أخير)"
            },
            {
              type: "paragraph",
              text: "Handling specific known exceptions in a multi-catch, followed by a generic safety-net catch block."
            },
            {
              type: "code",
              language: "java",
              filename: "HybridCatchPatternDemo.java",
              code: `public class HybridCatchPatternDemo {
    public static void executeService(int mode) {
        try {
            if (mode == 1) throw new IllegalArgumentException("Bad argument");
            if (mode == 2) throw new IllegalStateException("Wrong state");
            if (mode == 3) throw new RuntimeException("Unexpected internal failure");
        } catch (IllegalArgumentException | IllegalStateException knownBusinessEx) {
            System.out.println("[EXPECTED CLIENT ERROR] " + knownBusinessEx.getMessage());
        } catch (RuntimeException unexpectedEx) {
            System.out.println("[UNEXPECTED INTERNAL SERVER ERROR] " + unexpectedEx.getMessage());
        }
    }

    public static void main(String[] args) {
        executeService(1);
        executeService(3);
    }
}`,
              output: `[EXPECTED CLIENT ERROR] Bad argument
[UNEXPECTED INTERNAL SERVER ERROR] Unexpected internal failure`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "Combining multi-catch for expected client errors with a generic catch for unexpected errors provides robust defense in depth."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "دمج الـ Multi-Catch للأخطاء المتوقعة مع بلوك عام لحالات الطوارئ يوفر أماناً شاملاً لتطبيقات الإنتاج."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Precise Rethrowing with Multi-Catch (Java 7+ Type Checking) (المثال 7: إعادة الرمي الدقيق للاستثناءات)"
            },
            {
              type: "paragraph",
              text: "Java compiler's smart type analysis allows rethrowing without declaring generic 'throws Exception'."
            },
            {
              type: "code",
              language: "java",
              filename: "PreciseRethrowDemo.java",
              code: `import java.io.IOException;
import java.sql.SQLException;

public class PreciseRethrowDemo {
    public static void riskyIO(int code) throws IOException, SQLException {
        if (code == 1) throw new IOException("Network socket closed");
        if (code == 2) throw new SQLException("SQL deadlocked");
    }

    // Notice the exact declaration: throws IOException, SQLException (NOT throws Exception!)
    public static void auditedWrapper(int code) throws IOException, SQLException {
        try {
            riskyIO(code);
        } catch (Exception ex) {
            System.out.println("[AUDIT LOG] Intercepted failure for audit logging: " + ex.getMessage());
            // Precise rethrow: Compiler knows only IOException or SQLException could have reached here!
            throw ex;
        }
    }

    public static void main(String[] args) {
        try {
            auditedWrapper(1);
        } catch (IOException | SQLException e) {
            System.out.println("[CALLER RECOVERY] Resumed in main: " + e.getMessage());
        }
    }
}`,
              output: `[AUDIT LOG] Intercepted failure for audit logging: Network socket closed
[CALLER RECOVERY] Resumed in main: Network socket closed`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "Java's precise rethrow feature inspects which checked exceptions could actually be thrown in the try block, allowing rethrow without widening the signature."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "يتعرف مترجم جافا الذكي على الأنواع الدقيقة المرمية داخل بلوك try مما يسمح بإعادة رميها دون توسيع إعلان الدالة إلى Exception عامة."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Nested Try-Catch within Multiple Catch Blocks (المثال 8: استدعاء try-catch داخل معالج الاستثناء)"
            },
            {
              type: "paragraph",
              text: "Performing secondary fallback operations that might themselves throw secondary exceptions."
            },
            {
              type: "code",
              language: "java",
              filename: "NestedCatchFallbackDemo.java",
              code: `public class NestedCatchFallbackDemo {
    public static void primaryDatabaseQuery() throws Exception {
        throw new Exception("Primary PostgreSQL database offline");
    }

    public static void fallbackRedisQuery() throws Exception {
        System.out.println("--> Fallback: Successfully served stale cache from Redis!");
    }

    public static void main(String[] args) {
        try {
            primaryDatabaseQuery();
        } catch (Exception primaryEx) {
            System.out.println("Warning: " + primaryEx.getMessage() + ". Attempting secondary fallback...");
            try {
                fallbackRedisQuery();
            } catch (Exception secondaryEx) {
                System.out.println("Critical: Fallback also failed: " + secondaryEx.getMessage());
            }
        }
    }
}`,
              output: `Warning: Primary PostgreSQL database offline. Attempting secondary fallback...
--> Fallback: Successfully served stale cache from Redis!`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "Secondary try-catch blocks inside a catch block allow executing fallback recovery logic safely."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "استخدام try-catch داخل بلوك المعالجة يتيح تنفيذ خطة بديلة بأمان دون خوف من تعطل البرنامج إذا فشل البديل أيضاً."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Catching Common Interface Types (المثال 9: التقاط الاستثناءات عبر واجهات مشتركة)"
            },
            {
              type: "paragraph",
              text: "Catching exceptions based on implemented domain interfaces."
            },
            {
              type: "code",
              language: "java",
              filename: "InterfaceExceptionDemo.java",
              code: `public class InterfaceExceptionDemo {
    interface BusinessAlertable {
        int getAlertSeverity();
    }

    static class QuotaExceededException extends RuntimeException implements BusinessAlertable {
        public int getAlertSeverity() { return 1; }
    }

    static class PaymentDeclinedException extends RuntimeException implements BusinessAlertable {
        public int getAlertSeverity() { return 2; }
    }

    public static void handleAlertable(BusinessAlertable alert) {
        System.out.println("Routing emergency alert with severity level: " + alert.getAlertSeverity());
    }

    public static void main(String[] args) {
        try {
            throw new PaymentDeclinedException();
        } catch (QuotaExceededException | PaymentDeclinedException e) {
            // Polymorphic treatment via shared interface
            handleAlertable(e);
        }
    }
}`,
              output: `Routing emergency alert with severity level: 2`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "Exceptions can implement custom interfaces, allowing multi-catch blocks to treat them polymorphically."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "يمكن للاستثناءات تطبيق واجهات Interfaces مشتركة، مما يسمح بالتعامل معها بشكل موحد في بلوكات الـ Multi-Catch."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Multi-Layered Validation Engine with Specific Handlers (المثال 10: محرك تحقق متعدد الطبقات بمعالجات متخصصة)"
            },
            {
              type: "paragraph",
              text: "Demonstrating how layered enterprise systems dispatch validation vs infrastructure errors."
            },
            {
              type: "code",
              language: "java",
              filename: "LayeredValidationDemo.java",
              code: `public class LayeredValidationDemo {
    public static void validateUserData(String ageStr, String email) {
        try {
            if (email == null || !email.contains("@")) {
                throw new IllegalArgumentException("Invalid email format");
            }
            int age = Integer.parseInt(ageStr);
            if (age < 18) {
                throw new IllegalStateException("User is under legal age (18+)");
            }
            System.out.println("User validated successfully.");
        } catch (NumberFormatException e) {
            System.out.println("[FORMAT ERROR] Age must be a numeric integer.");
        } catch (IllegalArgumentException | IllegalStateException e) {
            System.out.println("[VALIDATION RULE VIOLATION] " + e.getMessage());
        }
    }

    public static void main(String[] args) {
        validateUserData("not_a_number", "test@domain.com");
        validateUserData("16", "test@domain.com");
        validateUserData("25", "test@domain.com");
    }
}`,
              output: `[FORMAT ERROR] Age must be a numeric integer.
[VALIDATION RULE VIOLATION] User is under legal age (18+)
User validated successfully.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "Categorizing errors into format checks and validation rules produces clean, maintainable error handling pipelines."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "تقسيم الأخطاء إلى أخطاء صياغة وقواعد تحقق يوفر كوداً منظماً ويسهل صيانته في المشروعات الضخمة."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Enterprise Cloud Microservice API Gateway Dispatcher (المثال 11: موزع بوابة واجهة برمجة التطبيقات السحابية للمؤسسات)"
            },
            {
              type: "paragraph",
              text: "Advanced: Mapping distinct exception types into appropriate HTTP status codes (400 Bad Request, 403 Forbidden, 503 Service Unavailable)."
            },
            {
              type: "code",
              language: "java",
              filename: "ApiGatewayDispatcherMaster.java",
              code: `import java.io.IOException;
import java.util.concurrent.TimeoutException;

public class ApiGatewayDispatcherMaster {
    static class HttpResponse {
        final int statusCode;
        final String body;
        HttpResponse(int code, String body) { this.statusCode = code; this.body = body; }
        @Override public String toString() { return "HTTP " + statusCode + " : " + body; }
    }

    static void simulateMicroserviceRoute(int routeId) throws Exception {
        if (routeId == 1) throw new IllegalArgumentException("Missing 'Authorization' Bearer header");
        if (routeId == 2) throw new SecurityException("User does not have ROLE_ADMIN permissions");
        if (routeId == 3) throw new TimeoutException("Upstream payment cluster did not respond in 2500ms");
        if (routeId == 4) throw new IOException("Broken pipe socket connection");
    }

    public static HttpResponse routeRequest(int routeId) {
        try {
            simulateMicroserviceRoute(routeId);
            return new HttpResponse(200, "{\"status\":\"SUCCESS\"}");
        } catch (IllegalArgumentException e) {
            return new HttpResponse(400, "{\"error\":\"BAD_REQUEST\",\"message\":\"" + e.getMessage() + "\"}");
        } catch (SecurityException e) {
            return new HttpResponse(403, "{\"error\":\"FORBIDDEN\",\"message\":\"" + e.getMessage() + "\"}");
        } catch (TimeoutException | IOException e) {
            // Multi-catch for network/connectivity faults -> 503
            return new HttpResponse(503, "{\"error\":\"SERVICE_UNAVAILABLE\",\"cause\":\"" + e.getClass().getSimpleName() + "\"}");
        } catch (Exception e) {
            return new HttpResponse(500, "{\"error\":\"INTERNAL_SERVER_ERROR\"}");
        }
    }

    public static void main(String[] args) {
        System.out.println(routeRequest(1));
        System.out.println(routeRequest(2));
        System.out.println(routeRequest(3));
        System.out.println(routeRequest(4));
    }
}`,
              output: `HTTP 400 : {"error":"BAD_REQUEST","message":"Missing 'Authorization' Bearer header"}
HTTP 403 : {"error":"FORBIDDEN","message":"User does not have ROLE_ADMIN permissions"}
HTTP 503 : {"error":"SERVICE_UNAVAILABLE","cause":"TimeoutException"}
HTTP 503 : {"error":"SERVICE_UNAVAILABLE","cause":"IOException"}`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "Enterprise API gateways map domain exceptions to RFC-compliant HTTP status codes using multiple and multi-catch blocks."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "تقوم بوابات الـ API بتحويل أنواع الاستثناءات المختلفة إلى رموز استجابة HTTP معيارية (400, 403, 503) باحترافية."
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
                "Mistake 1: Placing a parent exception before a child exception in multiple catch blocks (e.g., catching Exception before NullPointerException). The compiler will reject this as unreachable code.",
                "خطأ 1: وضع الفئة الأب قبل الفئة الابن في بلوكات catch؛ حيث يرفض المترجم ذلك معتبراً البلوك الثاني كوداً ميتاً لا يمكن الوصول إليه.",
                "Mistake 2: Using related parent-child types in a single multi-catch statement (e.g., 'catch (IOException | FileNotFoundException e)'). Multi-catch only permits disjoint (unrelated) exception alternatives.",
                "خطأ 2: الجمع بين فئة وأحد فروعها في Multi-catch واحد؛ فالرمز | مخصص فقط للفئات المستقلة عن بعضها.",
                "Mistake 3: Trying to reassign the multi-catch variable ('e = new Exception();'). The multi-catch parameter is implicitly final."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Robust Command-Line Argument Parser (التحدي العملي: محلل وسائط سطر الأوامر المتين)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Write a method 'parsePort(String[] args)': 1) Access args[0] and parse it as an integer using Integer.parseInt; 2) If args has no elements, ArrayIndexOutOfBoundsException occurs -> print '[CONFIG ERROR] Missing port argument'; 3) If args[0] is not a number, NumberFormatException occurs -> print '[CONFIG ERROR] Port must be numeric'; 4) If port is outside 1-65535, throw IllegalArgumentException -> print '[CONFIG ERROR] Port must be 1-65535'; 5) Use multi-catch or multiple catch blocks appropriately."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: صمم دالة parsePort(String[] args): 1) اقرأ args[0] وحوله لرقم صحيح؛ 2) إذا كانت المصفوفة فارغة اعترض ArrayIndexOutOfBoundsException واطبع رسالة فقدان الوسيط؛ 3) إذا كان النص غير رقمي اعترض NumberFormatException واطبع رسالة وجوب الأرقام؛ 4) إذا كان المنفذ خارج النطاق 1-65535 ارمِ IllegalArgumentException؛ 5) استخدم صياغة البلوكات المناسبة."
            },
            {
              type: "code",
              language: "java",
              filename: "PortParserChallenge.java",
              code: `public class PortParserChallenge {
    public static int parsePort(String[] args) {
        try {
            int port = Integer.parseInt(args[0]);
            if (port < 1 || port > 65535) {
                throw new IllegalArgumentException("Port out of range (1-65535): " + port);
            }
            System.out.println("Configured Port successfully: " + port);
            return port;
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("[CONFIG ERROR] Missing required port argument in command line");
            return -1;
        } catch (NumberFormatException e) {
            System.out.println("[CONFIG ERROR] Port argument is not a valid integer number");
            return -1;
        } catch (IllegalArgumentException e) {
            System.out.println("[CONFIG ERROR] " + e.getMessage());
            return -1;
        }
    }

    public static void main(String[] args) {
        parsePort(new String[]{});            // Missing
        parsePort(new String[]{"http"});       // Non-numeric
        parsePort(new String[]{"90000"});      // Out of range
        parsePort(new String[]{"8080"});       // Valid!
    }
}`,
              output: `[CONFIG ERROR] Missing required port argument in command line
[CONFIG ERROR] Port argument is not a valid integer number
[CONFIG ERROR] Port out of range (1-65535): 90000
Configured Port successfully: 8080`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "Distinct catch blocks intercept index errors, number formatting errors, and domain validation ranges, providing pinpoint user feedback."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "قامت بلوكات catch بمعالجة فقدان الوسيط، والخطأ في صياغة الأرقام، وتجاوز النطاق بدقة وأعطت رسائل إرشادية واضحة للمستخدم."
            }
          ],
          quiz: [
          {
                    "id": "q1",
                    "question": "What is the rule regarding the order of catch blocks when catching subclasses and superclasses of exceptions?\n(ما هي القاعدة التي تحكم ترتيب بلوكات catch عند التقاط استثناءات ترث من بعضها البعض؟)",
                    "options": [
                              "Superclasses must always be placed before subclasses.",
                              "Subclasses (more specific exceptions) must always be placed BEFORE superclasses (more general exceptions); otherwise a compile-time error occurs because the subclass catch block is unreachable.",
                              "The order of catch blocks does not matter in Java.",
                              "Only one catch block is permitted per try statement."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Java checks catch blocks sequentially from top to bottom. If a superclass (like Exception) is placed before a subclass (like IOException), the superclass block would intercept all occurrences, rendering the subclass block unreachable and causing a compiler error. (يجب وضع الاستثناء الأكثر تحديداً والأصغر رتبة أولاً، لأن وضع الفئة العامة الأب قبله يجعل بلوك الابن غير قابل للوصول مما يسبب خطأ تصريف compile error)."
          },
          {
                    "id": "q2",
                    "question": "What happens when compiling the following code?\n\nimport java.io.*;\npublic class CatchOrder {\n    public static void main(String[] args) {\n        try {\n            FileReader fr = new FileReader(\"test.txt\");\n        } catch (Exception e) {\n            System.out.println(\"General Exception\");\n        } catch (FileNotFoundException fnf) {\n            System.out.println(\"File Not Found\");\n        }\n    }\n}",
                    "options": [
                              "It compiles and runs, printing 'File Not Found'.",
                              "Compile-time error: exception java.io.FileNotFoundException has already been caught.",
                              "It compiles and prints 'General Exception'.",
                              "It throws a RuntimeException at line 5."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Because FileNotFoundException is a subclass of Exception, placing 'catch (Exception e)' first means FileNotFoundException is already handled by the first block. The compiler detects that 'catch (FileNotFoundException fnf)' is unreachable code and refuses to compile. (خطأ تصريف: لأن FileNotFoundException يرث من Exception، فوجود بلوك Exception في البداية يجعل بلوك FileNotFoundException غير قابل للوصول إطلاقاً)."
          },
          {
                    "id": "q3",
                    "question": "Which of the following represents the valid Java 7+ multi-catch syntax for catching both IOException and SQLException in a single catch block?\n(أي من الخيارات التالية يمثل الصيغة الصحيحة لـ multi-catch في جافا 7+؟)",
                    "options": [
                              "catch (IOException and SQLException e)",
                              "catch (IOException || SQLException e)",
                              "catch (IOException | SQLException e)",
                              "catch (IOException, SQLException e)"
                    ],
                    "correctIndex": 2,
                    "explanation": "Correct! The multi-catch syntax introduced in Java 7 uses a single pipe '|' to separate distinct exception types: 'catch (IOException | SQLException e)'. (تستخدم جافا 7 فما فوق الرمز '|' للفصل بين أنواع الاستثناءات المتعددة داخل نفس بلوك catch)."
          },
          {
                    "id": "q4",
                    "question": "What is the restriction on the exception parameter variable 'e' in a multi-catch block 'catch (IOException | SQLException e)'?\n(ما هو القيد المفروض على متغير الاستثناء e في بلوك multi-catch؟)",
                    "options": [
                              "It can only be used inside a switch statement.",
                              "It is implicitly 'final'; attempting to reassign it (e.g., 'e = new IOException();') causes a compile-time error.",
                              "It must be explicitly declared as 'transient'.",
                              "It cannot call any methods."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! In a multi-catch statement, the catch parameter is implicitly final. You cannot assign a new value to the parameter variable within the catch body. Any reassignment fails compilation. (متغير الاستثناء في جملة multi-catch يعتبر final بشكل ضمني، وتؤدي أي محاولة لإعادة تعيينه أو تغيير قيمته داخل البلوك إلى خطأ في التصريف)."
          },
          {
                    "id": "q5",
                    "question": "What happens when compiling this multi-catch block?\n\nimport java.io.*;\npublic class DisjointTest {\n    public static void test() {\n        try {\n            FileReader fr = new FileReader(\"app.log\");\n        } catch (IOException | FileNotFoundException e) { // Line 6\n            e.printStackTrace();\n        }\n    }\n}",
                    "options": [
                              "It compiles and runs without issues.",
                              "Compile-time error on Line 6: The alternatives in a multi-catch statement cannot be related by subclassing (FileNotFoundException is a subclass of IOException).",
                              "It throws an IllegalArgumentException at runtime.",
                              "It compiles only if -parameters flag is enabled."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! The Java specification forbids alternatives in a multi-catch block from being in a subclass-superclass relationship. Since FileNotFoundException extends IOException, specifying both with '|' is redundant and rejected by the compiler. (يشترط في multi-catch أن تكون الفئات بديلة ومستقلة وغير مترابطة بالوراثة، وبما أن FileNotFoundException يرث من IOException يرفض المترجم هذه الصيغة)."
          },
          {
                    "id": "q6",
                    "question": "Consider this code:\n\npublic class MultiCatchDispatch {\n    public static void main(String[] args) {\n        try {\n            int[] arr = new int[2];\n            arr[5] = 10; // Line 5\n        } catch (ArithmeticException e) {\n            System.out.print(\"Arith \");\n        } catch (ArrayIndexOutOfBoundsException e) {\n            System.out.print(\"Array \");\n        } catch (RuntimeException e) {\n            System.out.print(\"Runtime \");\n        }\n        System.out.println(\"Done\");\n    }\n}\n\nWhat is the output?",
                    "options": [
                              "Array Runtime Done",
                              "Array Done",
                              "Runtime Done",
                              "Arith Array Done"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Line 5 throws ArrayIndexOutOfBoundsException. The JVM matches the first compatible catch block, which is 'catch (ArrayIndexOutOfBoundsException e)', printing 'Array '. Once handled, the remaining catch blocks are skipped, and the program prints 'Done'. Output: 'Array Done'. (يطلق السطر خطأ فهرس مصفوفة، فيلتقطه البلوك الثاني المخصص له ويطبع Array، وتُتخطى باقي البلوكات ثم يُطبع Done)."
          },
          {
                    "id": "q7",
                    "question": "Can a single thrown exception trigger MORE THAN ONE catch block in the same try-catch statement?\n(هل يمكن لاستثناء واحد أن ينفذ أكثر من بلوك catch في نفس جملة try-catch؟)",
                    "options": [
                              "Yes, all matching catch blocks are executed sequentially.",
                              "No, exactly one matching catch block is selected and executed; once executed, control jumps past the entire try-catch-finally statement.",
                              "Yes, if the catch blocks are marked as 'concurrent'.",
                              "Only if the exception is an unchecked exception."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! In Java, exception handling is mutually exclusive across catch blocks of a single try statement. Only the first matching catch block executes; after that, control passes out of the catch chain. (معالجة الاستثناءات حصرية في نفس الجملة؛ يُنفذ أول بلوك متطابق فقط ويتم تجاوز البقية فوراً)."
          },
          {
                    "id": "q8",
                    "question": "What is printed by executing this code?\n\npublic class MultiExceptionChain {\n    public static void main(String[] args) {\n        try {\n            String s = null;\n            System.out.print(s.length()); // Line 5\n        } catch (NumberFormatException | NullPointerException ex) {\n            System.out.print(\"Caught \");\n            if (ex instanceof NullPointerException) {\n                System.out.print(\"NPE\");\n            } else {\n                System.out.print(\"NFE\");\n            }\n        }\n    }\n}",
                    "options": [
                              "Caught NFE",
                              "Caught NPE",
                              "Compilation error: cannot use instanceof inside multi-catch.",
                              "Caught NullPointerException"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Line 5 throws NullPointerException. The multi-catch block intercepts it, prints 'Caught ', checks 'ex instanceof NullPointerException' (which is true), and prints 'NPE'. Output: 'Caught NPE'. (يعترض بلوك multi-catch استثناء NPE ويطبع Caught ثم يتحقق الشرط instanceof فيطبع NPE)."
          },
          {
                    "id": "q9",
                    "question": "Why should developers avoid catching 'Exception' or 'Throwable' as a lazy substitute for catching specific exceptions?\n(لماذا يجب تجنب التقاط 'Exception' العامة كبديل للالتقاط المحدد في تطبيقات المؤسسات؟)",
                    "options": [
                              "Because catching Exception is deprecated in Java 21.",
                              "It indiscriminately swallows unrelated runtime errors (e.g. NullPointerException, IllegalArgumentException) that represent programming logic bugs, masking real defects and preventing appropriate differentiated recovery.",
                              "It causes an OutOfMemoryError.",
                              "Because Exception cannot catch checked exceptions."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Overly broad catch blocks intercept both expected recoverable checked exceptions and unexpected runtime defects (like NullPointerException), preventing you from handling specific errors appropriately and hiding genuine programming bugs. (التقاط الفئة العامة Exception يبتلع أخطاء المنطق البرمجي مثل NPE دون تمييز، مما يخفي العيوب الحقيقية ويمنع تنفيذ استراتيجيات التعافي الدقيقة لكل خطأ)."
          },
          {
                    "id": "q10",
                    "question": "Consider the following code:\n\npublic class SubClassException {\n    public static void compute() {\n        throw new NumberFormatException(\"Bad number\");\n    }\n    public static void main(String[] args) {\n        try {\n            compute();\n        } catch (IllegalArgumentException e) {\n            System.out.println(\"Caught by IAE block\");\n        } catch (Exception e) {\n            System.out.println(\"Caught by General block\");\n        }\n    }\n}\n\nWhat is printed and why?",
                    "options": [
                              "Caught by General block because NumberFormatException is not an IllegalArgumentException.",
                              "Caught by IAE block because NumberFormatException extends IllegalArgumentException, so the first matching block catches it.",
                              "Compile-time error: NumberFormatException must be caught explicitly.",
                              "Program terminates abruptly with unhandled exception."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! In Java's class hierarchy, java.lang.NumberFormatException extends java.lang.IllegalArgumentException. Because the first block catches IllegalArgumentException, it is type-compatible with NumberFormatException and intercepts it, printing 'Caught by IAE block'. (فئة NumberFormatException ترث من IllegalArgumentException؛ ولذلك يلتقطها البلوك الأول بنجاح ويطبع Caught by IAE block)."
          },
          {
                    "id": "q11",
                    "question": "What happens if an exception is thrown INSIDE a catch block while handling an earlier exception?\n\ntry {\n    throw new ArithmeticException(\"First\");\n} catch (ArithmeticException e) {\n    throw new NullPointerException(\"Second\"); // Line 4\n} catch (Exception e) {\n    System.out.println(\"Caught sibling\");\n}",
                    "options": [
                              "The sibling catch block catches the NullPointerException and prints 'Caught sibling'.",
                              "The sibling catch block CANNOT catch it; the NullPointerException immediately escapes the entire try-catch structure unless enclosed in an outer try-catch block.",
                              "The JVM restarts the try block.",
                              "Both exceptions are printed simultaneously."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Sibling catch blocks in the same try statement ONLY handle exceptions thrown from within the corresponding 'try' block. An exception thrown inside a catch block escapes immediately to the enclosing scope (or outer try-catch). (بلوكات catch المجاورة مخصصة فقط للأخطاء المنبعثة من بلوك try، وأي استثناء يُرمى داخل بلوك catch نفسه يهرب مباشرة للأعلى ولا تلتقطه بلوكات catch المجاورة له)."
          },
          {
                    "id": "q12",
                    "question": "What common type can be used to catch both IOException and SQLException in a single non-multi-catch catch block?\n(ما هي الفئة المشتركة التي يمكن استخدامها لالتقاط IOException و SQLException معاً في بلوك catch واحد كلاسيكي؟)",
                    "options": [
                              "catch (RuntimeException e)",
                              "catch (Exception e)",
                              "catch (ThrowableError e)",
                              "catch (DataAccessException e)"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Both IOException and SQLException directly inherit from java.lang.Exception (and are not RuntimeExceptions). Therefore, 'catch (Exception e)' or 'catch (Throwable e)' is their common supertype in the hierarchy. (تشترك الفئتان في وراثة java.lang.Exception مباشرة، لذا فإن catch(Exception e) يلتقطهما معاً)."
          },
          {
                    "id": "q13",
                    "question": "What is printed by this program?\n\npublic class MultiTest {\n    public static void main(String[] args) {\n        for (int i = 0; i < 2; i++) {\n            try {\n                if (i == 0) throw new IllegalStateException();\n                else throw new IllegalArgumentException();\n            } catch (IllegalStateException | IllegalArgumentException e) {\n                System.out.print(e.getClass().getSimpleName() + \" \");\n            }\n        }\n    }\n}",
                    "options": [
                              "IllegalStateException IllegalArgumentException ",
                              "IllegalStateException IllegalStateException ",
                              "IllegalArgumentException IllegalArgumentException ",
                              "Compile-time error: cannot catch two runtime exceptions together."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! In iteration 0, IllegalStateException is caught and its simple name is printed. In iteration 1, IllegalArgumentException is caught and its simple name is printed. Output: 'IllegalStateException IllegalArgumentException '. (في الدورة الأولى يتم إلقاء واستقبال IllegalStateException، وفي الثانية يتم إلقاء واستقبال IllegalArgumentException، وتتم طباعة الاسمين على التوالي)."
          },
          {
                    "id": "q14",
                    "question": "Which exception type in a multi-catch statement determines what methods can be invoked on the variable 'e'?\n\ncatch (ClassCastException | NullPointerException e)",
                    "options": [
                              "Only methods defined on Object.",
                              "Methods available on their most specific common supertype (in this case, RuntimeException).",
                              "Methods specific to ClassCastException only.",
                              "No methods can be called on multi-catch parameters."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! The compiler determines the static type of the multi-catch variable as the most specific common supertype of the alternatives (here, RuntimeException). Any method declared on that common supertype (and Throwable/Object) can be called. (يحدد المترجم نوع المتغير e بأنه الفئة المشتركة الأقرب بينهما وهي RuntimeException، وتتاح جميع دوالها ودوال Throwable)."
          },
          {
                    "id": "q15",
                    "question": "Consider this nested handling:\n\npublic class NestedCatch {\n    public static void main(String[] args) {\n        try {\n            try {\n                throw new ArithmeticException(\"Inner\");\n            } catch (NullPointerException e) {\n                System.out.print(\"InnerNPE \");\n            }\n        } catch (ArithmeticException e) {\n            System.out.print(\"OuterArith \");\n        }\n        System.out.println(\"End\");\n    }\n}\n\nWhat is the output?",
                    "options": [
                              "InnerNPE OuterArith End",
                              "OuterArith End",
                              "InnerNPE End",
                              "Program terminates with unhandled ArithmeticException"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! The inner try throws ArithmeticException. The inner catch only handles NullPointerException, so it does not match. The exception propagates outwards to the outer try, where 'catch (ArithmeticException e)' catches it and prints 'OuterArith '. Execution then continues, printing 'End'. Output: 'OuterArith End'. (الاستثناء الداخلي هو خطأ حسابي لا يتطابق مع NPE الداخلي، فيهرب للبلوك الخارجي الذي يطابقه ويطبعه، ثم يطبع End)."
          }
]
        }
      ]
    },

    /* ==========================================================================
       TOPIC 38: try-catch
       ========================================================================== */
    {
      id: "try-catch",
      title: "38. try-catch",
      description: "Mastering the try-catch Mechanism in Java: Block anatomy, execution flow control, scope boundaries, exception translation, logging best practices, and nested error containment.",
      lessons: [
        {
          id: "try-catch-mastery",
          title: "Complete Guide to try-catch",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "The try-catch Mechanism in Java (آلية try-catch في جافا)"
            },
            {
              type: "paragraph",
              text: "The 'try-catch' construct is the cornerstone of Java's exception handling architecture. The 'try' block encloses risky statements that may throw an exception during execution. If an exception occurs inside the try block, normal execution immediately halts, remaining statements inside the try block are skipped, and control jumps directly to the matching 'catch' block."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "تعتبر بنية 'try-catch' حجر الزاوية في إدارة الأخطاء في لغة جافا. يحتوي بلوك 'try' على التعليمات البرمجية الحساسة التي يُحتمل أن تطلق استثناءً أثناء التنفيذ. إذا وقع استثناء داخل try، يتوقف تنفيذ بقية أسطر البلوك فوراً، وينتقل التحكم مباشرة وبلا تردد إلى بلوك 'catch' المتطابق لمعالجة الخطأ واستئناف تشغيل البرنامج بسلام."
            },
            {
              type: "paragraph",
              text: "Fundamental Mechanics: 1) Variable Scope: Variables declared inside a try block are local to that try block and invisible inside catch or outside; 2) Zero-Overhead Success: When no exception occurs, try executes normally and catch blocks are completely bypassed with virtually zero runtime penalty; 3) Exception Translation: Wrapping low-level technical errors into meaningful business domain exceptions."
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
              text: "Example 1: Fundamental Execution Flow (Skipped Statements) (المثال 1: مسار التنفيذ وتخطي الأسطر بعد وقوع الخطأ)"
            },
            {
              type: "paragraph",
              text: "Observing how instructions immediately following the failure point inside a try block are skipped."
            },
            {
              type: "code",
              language: "java",
              filename: "TryCatchFlowDemo.java",
              code: `public class TryCatchFlowDemo {
    public static void main(String[] args) {
        System.out.println("Step 1: Before try block");

        try {
            System.out.println("Step 2: Inside try block - about to divide");
            int quotient = 10 / 0; // Triggers ArithmeticException
            System.out.println("Step 3: THIS LINE WILL NEVER EXECUTE!");
        } catch (ArithmeticException e) {
            System.out.println("Step 4: Inside catch block - handled: " + e.getMessage());
        }

        System.out.println("Step 5: Program continues normally after try-catch");
    }
}`,
              output: `Step 1: Before try block
Step 2: Inside try block - about to divide
Step 4: Inside catch block - handled: / by zero
Step 5: Program continues normally after try-catch`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "As soon as line 7 threw ArithmeticException, execution leaped straight to Step 4, completely skipping Step 3."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "بمجرد وقوع القسمة على صفر في السطر 7، قفز التنفيذ مباشرة إلى بلوك catch متخطياً الخطوة 3 بالكامل دون تنفيذها."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Scope Boundaries of Variables in Try Blocks (المثال 2: نطاق المتغيرات داخل بلوك try)"
            },
            {
              type: "paragraph",
              text: "Variables declared inside 'try' cannot be accessed inside 'catch' or after the block."
            },
            {
              type: "code",
              language: "java",
              filename: "TryScopeRulesDemo.java",
              code: `public class TryScopeRulesDemo {
    public static void main(String[] args) {
        // Must declare outside try if you need to use the variable after the block
        int parsedValue = -1;

        try {
            String rawInput = "850"; // Local to try block only
            parsedValue = Integer.parseInt(rawInput);
        } catch (NumberFormatException e) {
            System.out.println("Failed to parse number!");
        }

        // parsedValue is accessible here because it was declared outside!
        System.out.println("Extracted Value: " + parsedValue);
    }
}`,
              output: `Extracted Value: 850`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "To use a computed value after a try-catch block, declare and initialize the variable before entering the try block."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "لكي تستخدم قيمة المتغير خارج بلوك try-catch، يجب تعريفه وإسناد قيمة ابتدائية له قبل الدخول في بلوك try."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Exception Translation (Wrapping Technical into Domain) (المثال 3: ترجمة وتغليف الاستثناءات التقنية باستثناءات وظيفية)"
            },
            {
              type: "paragraph",
              text: "Catching low-level technical exceptions and translating them into domain-level business exceptions."
            },
            {
              type: "code",
              language: "java",
              filename: "ExceptionTranslationDemo.java",
              code: `public class ExceptionTranslationDemo {
    static class BillingServiceException extends RuntimeException {
        public BillingServiceException(String msg, Throwable cause) {
            super(msg, cause);
        }
    }

    public static void chargeCreditCard(String cardToken, String amountStr) {
        try {
            double amount = Double.parseDouble(amountStr);
            if (cardToken == null) throw new NullPointerException("Token is null");
            System.out.println("Charged $" + amount + " to token: " + cardToken);
        } catch (NullPointerException | NumberFormatException rawEx) {
            // TRANSLATION: Do not leak raw NPE/NumberFormat to client; wrap into domain exception!
            throw new BillingServiceException("Payment authorization failed due to invalid card data", rawEx);
        }
    }

    public static void main(String[] args) {
        try {
            chargeCreditCard("tok_123", "INVALID_AMOUNT");
        } catch (BillingServiceException bse) {
            System.out.println("Client Message: " + bse.getMessage());
            System.out.println("Underlying Root Cause: " + bse.getCause().getClass().getSimpleName());
        }
    }
}`,
              output: `Client Message: Payment authorization failed due to invalid card data
Underlying Root Cause: NumberFormatException`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "Exception translation encapsulates implementation details, preventing low-level internal exceptions from leaking to API callers."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "ترجمة الاستثناءات تمنع تسريب تفاصيل النظام الداخلية للعملاء، وتغلف الأخطاء التقنية في رسائل مفهومة لنطاق العمل."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Nested try-catch Blocks (المثال 4: بلوكات try-catch المتداخلة)"
            },
            {
              type: "paragraph",
              text: "Enclosing a delicate operation inside an inner try block to keep the outer block alive."
            },
            {
              type: "code",
              language: "java",
              filename: "NestedTryCatchDemo.java",
              code: `public class NestedTryCatchDemo {
    public static void main(String[] args) {
        System.out.println("Outer try: Initiating user provisioning pipeline");

        try {
            // Step A: Allocate user space
            System.out.println("Step A: Disk directory created.");

            // Inner try block: Non-fatal subsidiary step
            try {
                System.out.println("Step B: Sending welcome SMS...");
                throw new RuntimeException("SMS gateway timeout");
            } catch (RuntimeException smsEx) {
                System.out.println("[INNER HANDLED] Non-critical SMS failure: " + smsEx.getMessage() + ". Continuing pipeline!");
            }

            // Step C: Outer try continues execution successfully!
            System.out.println("Step C: User database record successfully committed.");
        } catch (Exception outerEx) {
            System.out.println("[OUTER HANDLED] Critical fatal failure: " + outerEx.getMessage());
        }
    }
}`,
              output: `Outer try: Initiating user provisioning pipeline
Step A: Disk directory created.
Step B: Sending welcome SMS...
[INNER HANDLED] Non-critical SMS failure: SMS gateway timeout. Continuing pipeline!
Step C: User database record successfully committed.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "Inner try-catch blocks isolate failures in non-critical tasks (like sending SMS) so they don't abort the primary pipeline."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "تحمي البلوكات المتداخلة العمليات غير الحرجة (مثل إرسال رسالة ترحيب) من التسبب في إيقاف وإلغاء عملية التسجيل بأكملها."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Selective Catching vs The Empty Catch Anti-Pattern (المثال 5: التقاط الأخطاء المحددة مقابل كارثة البلوك الفارغ)"
            },
            {
              type: "paragraph",
              text: "Why catching and ignoring exceptions blindly hides bugs and ruins software reliability."
            },
            {
              type: "code",
              language: "java",
              filename: "EmptyCatchAntiPatternDemo.java",
              code: `public class EmptyCatchAntiPatternDemo {
    public static void badPractice() {
        try {
            String s = null;
            s.trim();
        } catch (Exception e) {
            // BAD PRACTICE: Empty catch block silently swallows error!
            // The developer has zero visibility that something went wrong.
        }
    }

    public static void goodPractice() {
        try {
            String s = null;
            s.trim();
        } catch (NullPointerException e) {
            // GOOD PRACTICE: Specific catch, diagnostic message logged
            System.out.printf("[LOG ERROR] Failed to trim text: %s%n", e.getMessage());
        }
    }

    public static void main(String[] args) {
        badPractice();
        System.out.println("Bad practice executed silently with hidden bug.");

        goodPractice();
        System.out.println("Good practice communicated the defect clearly.");
    }
}`,
              output: `Bad practice executed silently with hidden bug.
[LOG ERROR] Failed to trim text: Cannot invoke "String.trim()" because "s" is null
Good practice communicated the defect clearly.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "Never write empty catch blocks. At minimum, log the exception or document explicitly why swallowing it is completely safe."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "إياك وترك بلوك catch فارغاً؛ فهذا يبتلع الأخطاء سراً ويجعل تتبع المشاكل في بيئة الإنتاج كابوساً للمطورين."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Exception Rethrowing with State Rollback (المثال 6: إعادة رمي الاستثناء مع التراجع عن التغييرات Rollback)"
            },
            {
              type: "paragraph",
              text: "Performing local cleanup or rolling back a transaction before re-throwing the exception to callers."
            },
            {
              type: "code",
              language: "java",
              filename: "RethrowRollbackDemo.java",
              code: `public class RethrowRollbackDemo {
    static class InventoryService {
        private int stock = 10;

        public void reserveItem(int quantity) {
            stock -= quantity;
            System.out.println("Temporarily reserved: " + quantity + " units (Remaining: " + stock + ")");

            try {
                // Simulate order creation failure
                throw new IllegalStateException("Payment provider gateway rejected authorization");
            } catch (IllegalStateException e) {
                // ROLLBACK local state!
                stock += quantity;
                System.out.println("[ROLLBACK] Compensating action: Restored " + quantity + " units (Stock: " + stock + ")");

                // Rethrow to alert the caller
                throw e;
            }
        }
    }

    public static void main(String[] args) {
        InventoryService inventory = new InventoryService();
        try {
            inventory.reserveItem(3);
        } catch (IllegalStateException e) {
            System.out.println("Main caught rethrown exception: " + e.getMessage());
        }
    }
}`,
              output: `Temporarily reserved: 3 units (Remaining: 7)
[ROLLBACK] Compensating action: Restored 3 units (Stock: 10)
Main caught rethrown exception: Payment provider gateway rejected authorization`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "A catch block can execute compensating rollback logic and then rethrow the exception so callers remain aware of the failure."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "يمكن لبلوك catch التراجع عن العمليات الحسابية الخاطئة (Rollback) ثم إعادة رمي الاستثناء للمستدعي لتنبيهه."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Try Block Granularity (Fine-Grained vs Coarse-Grained) (المثال 7: دقة حجم بلوك try: دقيق مقابل واسع)"
            },
            {
              type: "paragraph",
              text: "Wrapping individual statements vs wrapping entire workflows."
            },
            {
              type: "code",
              language: "java",
              filename: "GranularityDemo.java",
              code: `public class GranularityDemo {
    // Fine-grained: pinpoint recovery per operation
    public static void fineGrainedParsing(String str1, String str2) {
        int num1 = 0;
        int num2 = 0;

        try {
            num1 = Integer.parseInt(str1);
        } catch (NumberFormatException e) {
            System.out.println("Warning: str1 bad, default to 0");
        }

        try {
            num2 = Integer.parseInt(str2);
        } catch (NumberFormatException e) {
            System.out.println("Warning: str2 bad, default to 0");
        }

        System.out.println("Fine-grained sum: " + (num1 + num2));
    }

    public static void main(String[] args) {
        fineGrainedParsing("100", "invalid");
    }
}`,
              output: `Warning: str2 bad, default to 0
Fine-grained sum: 100`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "Fine-grained try-catch blocks allow partial recovery, so the failure of one independent variable doesn't discard other valid data."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "استخدام بلوكات try صغيرة ومستقلة يتيح إنقاذ البيانات الصالحة وتحديد بدائل للحقول الفاشلة فقط بدلاً من رفض كل شيء."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Preserving the Cause Chain in Catch (initCause / Constructor) (المثال 8: ربط سلسلة الأسباب في بلوك catch)"
            },
            {
              type: "paragraph",
              text: "Ensuring original diagnostic traces remain accessible via Throwable.getCause()."
            },
            {
              type: "code",
              language: "java",
              filename: "CauseChainPreservationDemo.java",
              code: `import java.sql.SQLException;

public class CauseChainPreservationDemo {
    static class RepositoryException extends RuntimeException {
        public RepositoryException(String message, Throwable cause) {
            super(message, cause);
        }
    }

    public static void findCustomer() {
        try {
            throw new SQLException("Connection pool exhausted (max 50 active)");
        } catch (SQLException dbEx) {
            // ALWAYS pass dbEx as cause!
            throw new RepositoryException("Database access layer failure", dbEx);
        }
    }

    public static void main(String[] args) {
        try {
            findCustomer();
        } catch (RepositoryException ex) {
            System.out.println("Caught High-Level: " + ex.getMessage());
            System.out.println("Underlying Cause:  " + ex.getCause().getMessage());
        }
    }
}`,
              output: `Caught High-Level: Database access layer failure
Underlying Cause:  Connection pool exhausted (max 50 active)`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "Passing the original caught exception to the constructor of the new exception preserves the full causal diagnostic chain."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "تمرير الاستثناء الأصلي لمنشئ الاستثناء الجديد يحافظ على سلسلة الأسباب متصلة، مما يسهل تشخيص الأخطاء لاحقاً."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Safe Retry Loop with Try-Catch (المثال 9: حلقة إعادة المحاولة الآمنة بـ try-catch)"
            },
            {
              type: "paragraph",
              text: "Using a loop with try-catch to retry a transient flaky operation up to N times."
            },
            {
              type: "code",
              language: "java",
              filename: "RetryLoopDemo.java",
              code: `public class RetryLoopDemo {
    static int attemptCount = 0;

    public static void flakyNetworkCall() throws Exception {
        attemptCount++;
        if (attemptCount < 3) {
            throw new Exception("Temporary 503 gateway drop");
        }
        System.out.println("Network call succeeded on attempt " + attemptCount);
    }

    public static void main(String[] args) {
        int maxRetries = 3;
        boolean success = false;

        for (int i = 1; i <= maxRetries; i++) {
            try {
                System.out.println("Connecting... Attempt #" + i);
                flakyNetworkCall();
                success = true;
                break; // Succeeded! Break loop
            } catch (Exception ex) {
                System.out.println("Attempt #" + i + " failed: " + ex.getMessage());
                if (i == maxRetries) {
                    System.out.println("All retries exhausted. Operation aborted.");
                }
            }
        }
    }
}`,
              output: `Connecting... Attempt #1
Attempt #1 failed: Temporary 503 gateway drop
Connecting... Attempt #2
Attempt #2 failed: Temporary 503 gateway drop
Connecting... Attempt #3
Network call succeeded on attempt 3`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "Enclosing remote network invocations in a retry loop with try-catch allows automated self-healing from transient blips."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "وضع الاستدعاء داخل حلقة تكرار مع try-catch يتيح إعادة المحاولة التلقائية وتجاوز الانقطاعات اللحظية للشبكة بنجاح."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Try-Catch with Return Values (Clean Functional Fallback) (المثال 10: جمل try-catch مع إرجاع القيم والبدائل)"
            },
            {
              type: "paragraph",
              text: "Safely returning parsed results with default fallback values."
            },
            {
              type: "code",
              language: "java",
              filename: "ReturnFallbackDemo.java",
              code: `public class ReturnFallbackDemo {
    public static int parsePositiveIntOrDefault(String text, int defaultValue) {
        try {
            int val = Integer.parseInt(text);
            return (val > 0) ? val : defaultValue;
        } catch (NumberFormatException e) {
            // Clean fallback return on exception
            return defaultValue;
        }
    }

    public static void main(String[] args) {
        System.out.println("Parsed '42':      " + parsePositiveIntOrDefault("42", 10));
        System.out.println("Parsed '-5':      " + parsePositiveIntOrDefault("-5", 10));
        System.out.println("Parsed 'corrupt': " + parsePositiveIntOrDefault("corrupt", 10));
    }
}`,
              output: `Parsed '42':      42
Parsed '-5':      10
Parsed 'corrupt': 10`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "Returning default values directly from catch blocks is a classic idiom for parsing configurations and optional settings."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "إرجاع قيمة افتراضية مباشرة من بلوك catch هو أسلوب شائع ومريح عند قراءة إعدادات التكوين والخيارات الإضافية."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Enterprise Resilient Circuit Breaker State Machine (المثال 11: قاطع الدائرة الكهربائية البرمجي Circuit Breaker للمؤسسات)"
            },
            {
              type: "paragraph",
              text: "Advanced: A production-grade Circuit Breaker intercepting exceptions to trip open and protect backend systems."
            },
            {
              type: "code",
              language: "java",
              filename: "CircuitBreakerMaster.java",
              code: `public class CircuitBreakerMaster {
    enum State { CLOSED, OPEN }

    static class CircuitBreaker {
        private State state = State.CLOSED;
        private int failureCount = 0;
        private final int failureThreshold = 3;

        public void execute(Runnable operation) {
            if (state == State.OPEN) {
                System.out.println("[CIRCUIT OPEN] Fast fail: Request blocked immediately without executing remote call.");
                return;
            }

            try {
                operation.run();
                failureCount = 0; // Reset consecutive failures on success
            } catch (Exception ex) {
                failureCount++;
                System.out.printf("[CIRCUIT WARN] Caught failure (%d/%d): %s%n",
                    failureCount, failureThreshold, ex.getMessage());

                if (failureCount >= failureThreshold) {
                    state = State.OPEN;
                    System.out.println("[CIRCUIT TRIPPED] Threshold exceeded! State changed to OPEN.");
                }
            }
        }
    }

    public static void main(String[] args) {
        CircuitBreaker cb = new CircuitBreaker();

        Runnable remoteFailingService = () -> {
            throw new RuntimeException("Backend Microservice 500 error");
        };

        System.out.println("--- Submitting Requests to Failing Service ---");
        cb.execute(remoteFailingService); // Failure 1
        cb.execute(remoteFailingService); // Failure 2
        cb.execute(remoteFailingService); // Failure 3 -> Trips OPEN
        cb.execute(remoteFailingService); // Blocked immediately by circuit
    }
}`,
              output: `--- Submitting Requests to Failing Service ---
[CIRCUIT WARN] Caught failure (1/3): Backend Microservice 500 error
[CIRCUIT WARN] Caught failure (2/3): Backend Microservice 500 error
[CIRCUIT WARN] Caught failure (3/3): Backend Microservice 500 error
[CIRCUIT TRIPPED] Threshold exceeded! State changed to OPEN.
[CIRCUIT OPEN] Fast fail: Request blocked immediately without executing remote call.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "The Circuit Breaker pattern uses try-catch to monitor failure rates, automatically tripping OPEN to protect failing downstream services."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "يستخدم نمط قاطع الدائرة Circuit Breaker بلوك try-catch لرصد معدل الأخطاء، ويقوم بفتح القاطع لقطع الاتصال فوراً وحماية الخوادم المنهارة."
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
                "Mistake 1: Swallowing exceptions silently without logging or rethrowing ('catch (Exception e) {}').",
                "خطأ 1: كتم وابتلاع الاستثناءات ببلوك catch فارغ دون تسجيل أي أثر للخطأ.",
                "Mistake 2: Declaring variables needed outside the try block solely inside the try block (causing 'cannot find symbol' compiler errors).",
                "خطأ 2: تعريف المتغيرات المطلوبة بعد انتهاء البلوك داخل بلوك try فقط، مما يسبب خطأ ترجمة لانتهاء نطاق المتغير.",
                "Mistake 3: Catching 'Throwable' instead of specific exceptions, which catches and masks fatal JVM Errors."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Safe Configuration Reader with Multi-Fallbacks (التحدي العملي: قارئ إعدادات آمن ببدائل متعددة)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Create a method 'int readTimeout(String primaryEnv, String secondaryEnv, int fallbackDefault)': 1) Try to parse primaryEnv as an integer; if successful and > 0, return it; 2) If it throws NumberFormatException or is invalid, catch it and try to parse secondaryEnv; 3) If secondaryEnv also fails, return fallbackDefault; 4) In main(), test with valid, broken primary, and both broken inputs."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: صمم دالة int readTimeout(String primaryEnv, String secondaryEnv, int fallbackDefault): 1) حاول تحويل primaryEnv لرقم صحيح وإرجاعه إن كان موجباً؛ 2) إذا حدث NumberFormatException، التقطه وحاول قراءة secondaryEnv؛ 3) إذا فشل الثاني أيضاً، أرجع fallbackDefault؛ 4) اختبر الحالات في main."
            },
            {
              type: "code",
              language: "java",
              filename: "SafeConfigReaderChallenge.java",
              code: `public class SafeConfigReaderChallenge {
    public static int readTimeout(String primaryEnv, String secondaryEnv, int fallbackDefault) {
        try {
            int primary = Integer.parseInt(primaryEnv);
            if (primary > 0) return primary;
        } catch (Exception primaryEx) {
            System.out.println("Primary config missing/invalid ('" + primaryEnv + "'). Trying secondary fallback...");
        }

        try {
            int secondary = Integer.parseInt(secondaryEnv);
            if (secondary > 0) return secondary;
        } catch (Exception secondaryEx) {
            System.out.println("Secondary config also failed ('" + secondaryEnv + "'). Applying default!");
        }

        return fallbackDefault;
    }

    public static void main(String[] args) {
        System.out.println("Result 1: " + readTimeout("5000", "3000", 1000));
        System.out.println();
        System.out.println("Result 2: " + readTimeout("invalid", "3000", 1000));
        System.out.println();
        System.out.println("Result 3: " + readTimeout("invalid", "not_a_num", 1000));
    }
}`,
              output: `Result 1: 5000

Primary config missing/invalid ('invalid'). Trying secondary fallback...
Result 2: 3000

Primary config missing/invalid ('invalid'). Trying secondary fallback...
Secondary config also failed ('not_a_num'). Applying default!
Result 3: 1000`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "Sequential try-catch blocks gracefully cascade through primary configuration, secondary fallback, and default values."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "تعاملت بلوكات try-catch المتتابعة بمرونة مع الإعدادات وانتقلت بسلاسة من الخيار الأساسي إلى البديل ثم القيمة الافتراضية."
            }
          ],
          quiz: [
          {
                    "id": "q1",
                    "question": "What happens when compiling the following code snippet?\n\npublic class ScopeTest {\n    public static void main(String[] args) {\n        try {\n            int data = Integer.parseInt(\"100\");\n        } catch (NumberFormatException e) {\n            data = 0; // Line 6\n        }\n        System.out.println(data); // Line 8\n    }\n}",
                    "options": [
                              "It compiles and prints 100.",
                              "Compile-time error: 'cannot find symbol: variable data' on Lines 6 and 8 because 'data' is scoped exclusively to the try block.",
                              "It compiles and prints 0.",
                              "It compiles but throws a NullPointerException at Line 8."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! In Java, variables declared inside a block (between { and }) are local to that specific block. The variable 'data' is declared inside the 'try' block, so it ceases to exist outside that block. To make it accessible in catch and subsequent code, it must be declared before the try block. (المتغيرات المعرفة داخل بلوك try يكون نطاقها محصوراً داخله فقط؛ ومحاولة استخدامها في catch أو بعد الجملة تسبب خطأ تصريف لاكتشاف متغير غير معرف)."
          },
          {
                    "id": "q2",
                    "question": "What is printed by executing this code?\n\npublic class ControlFlow {\n    public static void main(String[] args) {\n        System.out.print(\"1 \");\n        try {\n            System.out.print(\"2 \");\n            int result = 50 / 0; // Line 6\n            System.out.print(\"3 \");\n        } catch (ArithmeticException e) {\n            System.out.print(\"4 \");\n        }\n        System.out.println(\"5\");\n    }\n}",
                    "options": [
                              "1 2 3 4 5",
                              "1 2 4 5",
                              "1 2 3 5",
                              "1 4 5"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Prints '1 2 '. At line 6, division by zero throws ArithmeticException, so line 7 ('3 ') is completely skipped. Control jumps immediately to the catch block, printing '4 '. Then normal flow resumes, printing '5'. Output: '1 2 4 5'. (يُطبع 1 ثم 2، وعند وقوع خطأ القسمة على صفر في السطر 6 يُتخطى السطر 7 تماماً ويقفز التنفيذ لبلوك catch الذي يطبع 4، ثم يُطبع 5)."
          },
          {
                    "id": "q3",
                    "question": "Which of the following is a syntax requirement for a 'try' statement in Java?\n(أي من الخيارات التالية يُعد شرطاً نحوياً إجبارياً لجملة try في جافا؟)",
                    "options": [
                              "A try statement must contain at least 3 statements.",
                              "A try block must be followed by at least one 'catch' block OR a 'finally' block (or be a try-with-resources statement); a standalone 'try { ... }' without catch or finally causes a compile-time error.",
                              "Every try block must throw a checked exception.",
                              "Variables in a try block must be declared final."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! The Java grammar specifies that a 'try' block cannot exist alone; it must be paired with at least one 'catch' block, a 'finally' block, or declare resources in try-with-resources. (لا يمكن لجملة try أن تقف بمفردها، بل يجب أن يتبعها على الأقل بلوك catch واحد أو بلوك finally أو أقواس try-with-resources)."
          },
          {
                    "id": "q4",
                    "question": "What is 'Exception Translation' and why is it recommended in multi-tiered architectures?\n(ما هي 'ترجمة الاستثناءات' Exception Translation ولماذا يُوصى بها في المعماريات متعددة الطبقات؟)",
                    "options": [
                              "Translating Java exception messages into Arabic or French.",
                              "Catching a low-level implementation-specific exception (e.g. SQLException) in a data access layer and rethrowing a high-level domain exception (e.g. DataAccessException or OrderNotFoundException) with the original cause attached, preventing implementation details from leaking into higher business layers.",
                              "Converting runtime exceptions into compile-time syntax errors.",
                              "Renaming exception classes in git."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Exception translation prevents low-level implementation details (such as SQL or socket drivers) from leaking across architectural boundaries, presenting higher layers with clean, meaningful business abstractions while preserving the root cause. (ترجمة الاستثناءات تعني التقاط الأخطاء التقنية المعقدة مثل SQLException وتغليفها في استثناءات وظيفية تعبر عن منطق العمل لمنع تسرب تفاصيل قاعدة البيانات للطبقات العليا)."
          },
          {
                    "id": "q5",
                    "question": "What is printed by this method?\n\npublic class ReturnTryCatch {\n    public static int compute() {\n        try {\n            int x = 10 / 2;\n            return x;\n        } catch (Exception e) {\n            return -1;\n        }\n    }\n    public static void main(String[] args) {\n        System.out.println(compute());\n    }\n}",
                    "options": [
                              "-1",
                              "5",
                              "0",
                              "Compilation error"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! 10 / 2 evaluates to 5 without throwing any exception. The return statement in the try block executes and returns 5. The catch block is never reached. (تتم عملية القسمة 10 / 2 بنجاح دون أي خطأ وترجع الدالة القيمة 5 فوراً دون الدخول في بلوك catch)."
          },
          {
                    "id": "q6",
                    "question": "What happens in a nested try-catch when the inner catch does NOT handle the thrown exception?\n\npublic class NestedTest {\n    public static void main(String[] args) {\n        try {\n            System.out.print(\"OuterTry \");\n            try {\n                System.out.print(\"InnerTry \");\n                String s = null;\n                s.length();\n            } catch (ArithmeticException e) {\n                System.out.print(\"InnerCatch \");\n            }\n        } catch (NullPointerException e) {\n            System.out.print(\"OuterCatch \");\n        }\n    }\n}",
                    "options": [
                              "OuterTry InnerTry InnerCatch",
                              "OuterTry InnerTry OuterCatch",
                              "OuterTry OuterCatch",
                              "Program terminates with unhandled NullPointerException"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! 'OuterTry InnerTry ' is printed. s.length() throws NullPointerException. The inner catch only handles ArithmeticException, so it does not match. The exception propagates outward to the outer try block, where 'catch (NullPointerException e)' matches and prints 'OuterCatch '. Output: 'OuterTry InnerTry OuterCatch '. (يُطبع OuterTry InnerTry، وعند وقوع NPE الداخلي لا يطابقه بلوك catch الداخلي فيهرب للبلوك الخارجي الذي يلتقطه ويطبع OuterCatch)."
          },
          {
                    "id": "q7",
                    "question": "What is the recommended practice for preserving the root cause when wrapping an exception?\n(ما هي الممارسة البرمجية الموصى بها للحفاظ على السبب الجذري عند تغليف استثناء في استثناء جديد؟)",
                    "options": [
                              "throw new BusinessException(e.getMessage());",
                              "throw new BusinessException(\"Operation failed\", e); (passing the original exception 'e' to the new exception constructor or calling initCause(e))",
                              "e = null; throw new BusinessException();",
                              "System.gc(); throw new BusinessException();"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Passing the caught exception 'e' as the 'cause' argument into the constructor of the new exception ensures the complete original stack trace and causal chain are retained and accessible via getCause(). (تمرير الاستثناء الأصلي e لمنشئ الاستثناء الجديد يربط سلسلة الأسباب الجذرية ويتيح فحصها لاحقاً عبر getCause)."
          },
          {
                    "id": "q8",
                    "question": "Consider this retry loop logic:\n\nint attempts = 0;\nboolean success = false;\nwhile (attempts < 3 && !success) {\n    try {\n        attempts++;\n        performNetworkCall();\n        success = true;\n    } catch (IOException e) {\n        if (attempts >= 3) throw e;\n    }\n}\n\nIf performNetworkCall() fails on attempt 1 but succeeds on attempt 2, how many times was performNetworkCall() invoked?",
                    "options": [
                              "1 time",
                              "2 times",
                              "3 times",
                              "It throws an exception immediately on attempt 1"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! On attempt 1, the call fails and throws IOException. Catch catches it; attempts (1) < 3, so it does not throw. The loop repeats for attempt 2, where performNetworkCall() succeeds, setting success = true. The loop terminates. Total invocations: 2. (في المحاولة الأولى يفشل الاتصال ويلتقطه catch، وفي الدورة الثانية ينجح وتصبح success=true وتنتهي الحلقة، وبالتالي تم استدعاؤه مرتين)."
          },
          {
                    "id": "q9",
                    "question": "What is the problem with 'Coarse-Grained' try blocks where hundreds of lines of varied operations are wrapped inside a single giant try block?\n(ما هي مشكلة وضع مئات الأسطر والعمليات المختلفة داخل بلوك try ضخم واحد Coarse-Grained؟)",
                    "options": [
                              "It makes the bytecode exceed the 64KB method limit.",
                              "It obscures which exact operation failed, mixes distinct error-handling strategies together, and risks catching and misinterpreting unexpected exceptions from unrelated operations.",
                              "It causes an OutOfMemoryError.",
                              "It makes variables global."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Massive try blocks make it difficult to determine which specific statement failed, complicate fine-grained recovery and transactional rollback, and often lead to overly broad catch blocks that swallow unrelated errors. (بلوك try العملاق يدمج عمليات غير مترابطة، ويجعل من الصعب معرفة السطر المحدد الذي فشل، ويمنع تنفيذ استراتيجيات استرجاع دقيقة لكل عملية)."
          },
          {
                    "id": "q10",
                    "question": "What is printed by this code?\n\npublic class RethrowRollback {\n    static int balance = 100;\n    public static void debit(int amount) {\n        balance -= amount;\n        try {\n            if (amount > 50) throw new RuntimeException(\"Limit exceeded\");\n        } catch (RuntimeException e) {\n            balance += amount; // Rollback\n            throw e;\n        }\n    }\n    public static void main(String[] args) {\n        try {\n            debit(70);\n        } catch (RuntimeException e) {\n            System.out.println(\"Final balance: \" + balance);\n        }\n    }\n}",
                    "options": [
                              "Final balance: 30",
                              "Final balance: 100",
                              "Final balance: 70",
                              "Limit exceeded"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Initially balance is 100. In debit(70), balance becomes 30. Inside try, amount (70) > 50 throws RuntimeException. Catch intercepts it, rolls back balance by adding 70 (balance restored to 100), and rethrows the exception. In main, the exception is caught, and balance is printed as 100. (يتم خصم 70 ثم عند وقوع الخطأ يدخل في catch ويقوم بإرجاع الـ 70 للرصيد Rollback ليعود إلى 100 ثم يعيد رمي الخطأ، فتطبع main الرصيد 100)."
          },
          {
                    "id": "q11",
                    "question": "Can an expression inside a catch block reassign a new value to an outer variable?\n\nint status = 0;\ntry {\n    throw new Exception();\n} catch (Exception e) {\n    status = 500;\n}\nSystem.out.println(status);\n\nWhat is printed?",
                    "options": [
                              "0",
                              "500",
                              "Compile-time error: outer variables are read-only in catch.",
                              "NullPointerException"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Variables declared in the enclosing scope before the try statement can be read and reassigned inside both try and catch blocks (unlike lambda expressions which require effectively final variables). The catch block sets status = 500. Output: 500. (المتغيرات المعرفة خارج جملة try يمكن تعديل قيمتها بحرية داخل بلوك catch، فيتم تعيين status بـ 500 وطباعتها بنجاح)."
          },
          {
                    "id": "q12",
                    "question": "What is printed by this code when parsing fails?\n\npublic class ParseFallback {\n    public static int parseWithDefault(String val, int def) {\n        try {\n            return Integer.parseInt(val);\n        } catch (NumberFormatException e) {\n            return def;\n        }\n    }\n    public static void main(String[] args) {\n        int res = parseWithDefault(\"invalid_number\", 42);\n        System.out.println(\"Value: \" + res);\n    }\n}",
                    "options": [
                              "Value: 0",
                              "Value: 42",
                              "NumberFormatException",
                              "Value: null"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! When Integer.parseInt(\"invalid_number\") throws NumberFormatException, control jumps immediately to the catch block, which returns the fallback value 42. Output: 'Value: 42'. (عند فشل تحويل النص غير الرقمي يرمي parseInt استثناء NFE فيلتقطه catch ويرجع القيمة الافتراضية الممررة 42)."
          },
          {
                    "id": "q13",
                    "question": "What is the Circuit Breaker pattern and how does try-catch enable it?\n(ما هو نمط قاطع الدائرة Circuit Breaker وكيف يساهم try-catch في بنائه؟)",
                    "options": [
                              "A hardware circuit that trips during power surges.",
                              "A software resilience pattern where consecutive failures caught in try-catch increment a failure count; once a threshold is reached, the breaker opens, causing subsequent calls to fail immediately or return cached fallbacks without invoking the failing downstream dependency.",
                              "A way to break out of all nested loops using try.",
                              "An algorithm for sorting arrays."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! The Circuit Breaker pattern tracks caught exceptions from remote service calls. If failures exceed a threshold, it 'trips' open to protect the remote service and provide fast fallbacks, resetting after a cooldown period. (نمط برمجي يتتبع الأخطاء الملتقطة في try-catch، وعند تكرار فشل خدمة خارجية يفتح القاطع لمنع إرسال طلبات جديدة وتوفير بدائل سريعة لحماية النظام من الانهيار المتسلسل)."
          },
          {
                    "id": "q14",
                    "question": "What happens if code inside a 'try' block calls a method that throws a checked exception, but the 'catch' block catches only an unrelated checked exception?\n\n// FileReader constructor throws FileNotFoundException\ntry {\n    FileReader fr = new FileReader(\"data.csv\");\n} catch (java.sql.SQLException e) {\n    System.out.println(\"SQL error\");\n}",
                    "options": [
                              "It compiles, and any FileNotFoundException is automatically converted to SQLException.",
                              "Compile-time error: unreported exception FileNotFoundException; must be caught or declared to be thrown.",
                              "It compiles and runs without error if the file exists.",
                              "It throws a ClassCastException."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! The try block contains an operation that throws FileNotFoundException. Since the catch block only catches SQLException (an unrelated checked exception), the checked FileNotFoundException is left unhandled and undeclared, resulting in a compile-time error. (يرمي الكود استثناء مفحوص FileNotFoundException وبما أن بلوك catch مخصص لـ SQLException فقط يظل الاستثناء الأول غير معالج مما يسبب خطأ تصريف)."
          },
          {
                    "id": "q15",
                    "question": "What is printed by this code?\n\npublic class ChainTest {\n    public static void main(String[] args) {\n        try {\n            try {\n                throw new IllegalArgumentException(\"Bad arg\");\n            } catch (IllegalArgumentException e) {\n                System.out.print(\"Caught1 \");\n                throw new IllegalStateException(\"Bad state\", e);\n            }\n        } catch (IllegalStateException e) {\n            System.out.print(\"Caught2 \" + e.getCause().getMessage());\n        }\n    }\n}",
                    "options": [
                              "Caught1 Caught2 Bad state",
                              "Caught1 Caught2 Bad arg",
                              "Caught1 Bad arg",
                              "Compilation error: cannot pass exception into IllegalStateException constructor."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! The inner catch catches IllegalArgumentException, prints 'Caught1 ', and wraps it into a new IllegalStateException with 'e' as the cause. The outer catch intercepts the IllegalStateException, prints 'Caught2 ', and calls e.getCause().getMessage(), which retrieves 'Bad arg' from the inner exception. Output: 'Caught1 Caught2 Bad arg'. (يلتقط البلوك الأول الخطأ ويطبع Caught1 ثم يغلفه داخل IllegalStateException، فيلتقطه البلوك الثاني ويطبع Caught2 متبوعة برسالة الخطأ الداخلي getCause() وهي Bad arg)."
          }
]
        }
      ]
    }
  ];
})();
