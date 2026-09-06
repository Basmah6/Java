/**
 * Java Curriculum Module - Part 9
 * Topics:
 * 17. Java Enum
 * 18. Method Overloading
 * 
 * 100% Offline, Pure JavaScript. Complete educational content with full bilingual (English & Arabic) explanations.
 */

(function () {
  'use strict';

  window.JAVA_TOPICS_PART9 = [
    /* ==========================================================================
       TOPIC 17: Java Enum
       ========================================================================== */
    {
      id: "java-enum",
      title: "17. Java Enum",
      description: "Mastering Java Enums: Fixed constant sets, custom fields/constructors, constant-specific methods, switch expressions, EnumSet, EnumMap, and state machines.",
      lessons: [
        {
          id: "enum-mastery",
          title: "Complete Guide to Java Enums",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "Understanding Java Enums (فهم التعداد الثابت في جافا)"
            },
            {
              type: "paragraph",
              text: "An 'enum' (short for Enumeration) in Java is a special data type used to define collections of named constants. Introduced in Java 5, enums represent fixed, compile-time type-safe sets of choices such as days of the week, compass directions, order statuses, or user roles. Behind the scenes, an enum in Java is actually a full-featured class that extends 'java.lang.Enum'. Unlike simple integer constants in C or C++, Java enums can have fields, constructors, instance methods, and constant-specific logic."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "التعداد الثابت (Enum) في جافا هو نوع بيانات مميز يُستخدم لتمثيل مجموعة ثابتة ومحددة من الثوابت المترابطة، مثل أيام الأسبوع أو حالات الطلبات أو أدوار المستخدمين. في جافا، لا يُعد Enum مجرد أرقام صحيحة كما في لغات أخرى، بل هو فئة كاملة ترث ضمنياً من 'java.lang.Enum'، ويمكن أن تحتوي على حقول بيانات ومشيدات ودوال برمجية خاصة بكل ثابت، مما يوفر أماناً عالياً للأنواع (Type-Safety) أثناء التصريف."
            },
            {
              type: "paragraph",
              text: "Key Architectural Rule: Enum constants are implicitly 'public static final'. Enum constructors cannot be invoked with 'new'; they must be 'private' or package-private and are executed automatically when the enum constants are loaded."
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
              text: "Example 1: Basic Enum Declaration and Variable Assignment (المثال 1: تعريف التعداد الأساسي واستخدامه)"
            },
            {
              type: "paragraph",
              text: "Declaring a basic enum and assigning constants to strongly-typed variables."
            },
            {
              type: "code",
              language: "java",
              filename: "BasicEnumDemo.java",
              code: `public class BasicEnumDemo {
    // Basic Enum definition
    enum Day {
        SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY
    }

    public static void main(String[] args) {
        Day today = Day.FRIDAY;
        System.out.println("Current active day: " + today);
    }
}`,
              output: `Current active day: FRIDAY`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "Enum constants are written in UPPERCASE by convention. The variable 'today' can only ever hold one of the defined Day constants, preventing invalid values."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "تُكتب ثوابت التعداد بحروف كبيرة افتراضياً، ويمنع استخدام Enum إسناد أي قيمة غير معرفة مسبقاً، مما يضمن صحة البيانات."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Enums in Switch Statements (المثال 2: استخدام التعداد في جملة التفرع switch)"
            },
            {
              type: "paragraph",
              text: "Enums integrate cleanly with switch statements without needing to qualify the enum name in case labels."
            },
            {
              type: "code",
              language: "java",
              filename: "EnumSwitchDemo.java",
              code: `public class EnumSwitchDemo {
    enum LogLevel {
        INFO, WARNING, ERROR, CRITICAL
    }

    static void handleLog(LogLevel level, String message) {
        switch (level) {
            case INFO:
                System.out.println("[LOG INFO] " + message);
                break;
            case WARNING:
                System.out.println("[LOG WARN] Attention needed: " + message);
                break;
            case ERROR:
            case CRITICAL:
                System.out.println("[ALERT ALERT] Urgent dispatch: " + message);
                break;
        }
    }

    public static void main(String[] args) {
        handleLog(LogLevel.INFO, "Server started normally.");
        handleLog(LogLevel.CRITICAL, "Database connection dropped!");
    }
}`,
              output: `[LOG INFO] Server started normally.
[ALERT ALERT] Urgent dispatch: Database connection dropped!`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "Inside case statements, the enum constant name is used directly without the 'LogLevel.' prefix."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "داخل جملة switch، يُكتب اسم الثابت مباشرة دون الحاجة لكتابة اسم الـ Enum قبله."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Built-In Enum Methods: values() and ordinal() (المثال 3: دوال التعداد الجاهزة values و ordinal)"
            },
            {
              type: "paragraph",
              text: "Iterating through all constants and inspecting their zero-based positions."
            },
            {
              type: "code",
              language: "java",
              filename: "EnumBuiltinMethodsDemo.java",
              code: `public class EnumBuiltinMethodsDemo {
    enum Priority {
        LOW, MEDIUM, HIGH, URGENT
    }

    public static void main(String[] args) {
        System.out.println("Available priorities:");
        // values() returns an array of all enum constants in order
        for (Priority p : Priority.values()) {
            System.out.printf(" - %-7s (Index/Ordinal: %d)%n", p.name(), p.ordinal());
        }
    }
}`,
              output: `Available priorities:
 - LOW     (Index/Ordinal: 0)
 - MEDIUM  (Index/Ordinal: 1)
 - HIGH    (Index/Ordinal: 2)
 - URGENT  (Index/Ordinal: 3)`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "'values()' returns an array of all constants, 'ordinal()' gives their zero-based declaration order, and 'name()' returns the exact string name."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "ترجع دالة 'values()' مصفوفة بجميع الثوابت، بينما تعيد 'ordinal()' الترتيب الرقمي للثابت (يبدأ من 0)، وتعيد 'name()' اسمه كنص."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Enums with Custom Fields and Private Constructor (المثال 4: تعداد مع حقول مخصصة ومشيد خاص)"
            },
            {
              type: "paragraph",
              text: "Attaching custom metadata attributes directly to each enum constant."
            },
            {
              type: "code",
              language: "java",
              filename: "EnumWithFieldsDemo.java",
              code: `public class EnumWithFieldsDemo {
    enum Currency {
        USD("$", "US Dollar"),
        EUR("€", "Euro"),
        SAR("﷼", "Saudi Riyal"),
        GBP("£", "British Pound");

        private final String symbol;
        private final String fullName;

        // Constructor is implicitly private
        Currency(String symbol, String name) {
            this.symbol = symbol;
            this.fullName = name;
        }

        public String getSymbol() { return symbol; }
        public String getFullName() { return fullName; }
    }

    public static void main(String[] args) {
        Currency c = Currency.SAR;
        System.out.printf("Currency: %s | Symbol: %s | Full Name: %s%n",
            c.name(), c.getSymbol(), c.getFullName());
    }
}`,
              output: `Currency: SAR | Symbol: ﷼ | Full Name: Saudi Riyal`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "Enum constants pass arguments to the enum constructor upon class initialization, binding immutable metadata to each constant."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "تمرر ثوابت التعداد قيماً لمشيد التعداد عند تحميل الفئة، مما يربط كل ثابت ببيانات مخصصة ثابتة لا تتغير."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Custom Instance Methods inside Enums (المثال 5: دوال برمجية مخصصة داخل التعداد)"
            },
            {
              type: "paragraph",
              text: "Adding business logic methods directly onto the enum."
            },
            {
              type: "code",
              language: "java",
              filename: "EnumInstanceMethodsDemo.java",
              code: `public class EnumInstanceMethodsDemo {
    enum Planet {
        MERCURY(3.303e+23, 2.4397e6),
        EARTH(5.976e+24, 6.37814e6),
        JUPITER(1.9e+27, 7.1492e7);

        private final double mass;   // in kilograms
        private final double radius; // in meters
        private static final double G = 6.67300E-11;

        Planet(double mass, double radius) {
            this.mass = mass;
            this.radius = radius;
        }

        // Custom instance method calculating surface gravity: g = G * M / (r^2)
        public double surfaceGravity() {
            return G * mass / (radius * radius);
        }
    }

    public static void main(String[] args) {
        for (Planet p : Planet.values()) {
            System.out.printf("%-8s surface gravity: %.2f m/s²%n", p.name(), p.surfaceGravity());
        }
    }
}`,
              output: `MERCURY  surface gravity: 3.70 m/s²
EARTH    surface gravity: 9.80 m/s²
JUPITER  surface gravity: 24.79 m/s²`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "Enums can contain calculations and methods that operate on the internal fields of each constant."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "يمكن للتعداد احتواء دوال ومعادلات حسابية تطبق على بيانات كل كوكب أو ثابت على حدة."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Constant-Specific Method Overrides (المثال 6: دوال مخصصة لكل ثابت على حدة)"
            },
            {
              type: "paragraph",
              text: "Declaring an abstract method in the enum, forcing each constant to supply its own implementation body."
            },
            {
              type: "code",
              language: "java",
              filename: "ConstantSpecificMethodDemo.java",
              code: `public class ConstantSpecificMethodDemo {
    enum Operation {
        PLUS("+") {
            @Override double apply(double x, double y) { return x + y; }
        },
        MINUS("-") {
            @Override double apply(double x, double y) { return x - y; }
        },
        MULTIPLY("*") {
            @Override double apply(double x, double y) { return x * y; }
        };

        private final String symbol;
        Operation(String sym) { this.symbol = sym; }

        // Abstract method: each constant MUST provide its own implementation
        abstract double apply(double x, double y);
    }

    public static void main(String[] args) {
        double a = 12.0;
        double b = 4.0;

        for (Operation op : Operation.values()) {
            System.out.printf("%.1f %s %.1f = %.1f%n", a, op.symbol, b, op.apply(a, b));
        }
    }
}`,
              output: `12.0 + 4.0 = 16.0
12.0 - 4.0 = 8.0
12.0 * 4.0 = 48.0`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "Constant-specific methods replace messy switch statements with polymorphic behavior inside the enum itself."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "تتيح الدوال المجردة في التعداد كتابة منطق تنفيذي مختلف لكل ثابت بشكل متعدد الأشكال يغني عن جمل switch المعقدة."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Enum Implementing an Interface (المثال 7: تطبيق الواجهات بواسطة التعداد)"
            },
            {
              type: "paragraph",
              text: "Enums cannot extend other classes, but they can implement any number of interfaces."
            },
            {
              type: "code",
              language: "java",
              filename: "EnumInterfaceDemo.java",
              code: `public class EnumInterfaceDemo {
    interface PrintableStatus {
        String getLocalizedDescription();
    }

    enum OrderState implements PrintableStatus {
        PENDING {
            @Override public String getLocalizedDescription() { return "قيد الانتظار (Awaiting payment)"; }
        },
        SHIPPED {
            @Override public String getLocalizedDescription() { return "تم الشحن (En route to destination)"; }
        },
        DELIVERED {
            @Override public String getLocalizedDescription() { return "تم التوصيل (Successfully completed)"; }
        }
    }

    public static void main(String[] args) {
        PrintableStatus status = OrderState.SHIPPED; // Polymorphic reference
        System.out.println("Status: " + status.getLocalizedDescription());
    }
}`,
              output: `Status: تم الشحن (En route to destination)`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "Even though enums implicitly inherit from java.lang.Enum and cannot extend another class, they can freely implement interfaces."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "رغم أن التعداد لا يمكنه وراثة أي فئة أخرى، إلا أنه يستطيع تطبيق الواجهات (Interfaces) بكل مرونة وتعدد أشكال."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Safe String Parsing with valueOf() (المثال 8: التحويل الآمن من نص إلى تعداد بـ valueOf)"
            },
            {
              type: "paragraph",
              text: "Handling IllegalArgumentException when parsing untrusted external strings."
            },
            {
              type: "code",
              language: "java",
              filename: "SafeEnumValueOfDemo.java",
              code: `public class SafeEnumValueOfDemo {
    enum ThemeMode {
        LIGHT, DARK, HIGH_CONTRAST
    }

    static ThemeMode parseTheme(String input) {
        try {
            // Converts exact string to enum constant (case-sensitive)
            return ThemeMode.valueOf(input.toUpperCase().trim());
        } catch (IllegalArgumentException | NullPointerException e) {
            System.out.println("Invalid theme '" + input + "', falling back to default LIGHT theme.");
            return ThemeMode.LIGHT;
        }
    }

    public static void main(String[] args) {
        System.out.println("Result 1: " + parseTheme("dark"));
        System.out.println("Result 2: " + parseTheme("NEON_BLUE"));
    }
}`,
              output: `Result 1: DARK
Invalid theme 'NEON_BLUE', falling back to default LIGHT theme.
Result 2: LIGHT`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "'valueOf()' matches an exact string to an enum constant. Wrap in try-catch to safely handle invalid inputs."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "تحول دالة 'valueOf' النص إلى الثابت المقابل، ويجب الإحاطة بـ try-catch لتفادي انهيار البرنامج إن كان النص غير مطابق."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: High-Performance Bitwise EnumSet (المثال 9: مجموعة التعداد فائقة السرعة EnumSet)"
            },
            {
              type: "paragraph",
              text: "Managing permission flags using Java's specialized, extremely fast EnumSet."
            },
            {
              type: "code",
              language: "java",
              filename: "EnumSetDemo.java",
              code: `import java.util.EnumSet;

public class EnumSetDemo {
    enum Permission {
        READ, WRITE, EXECUTE, DELETE, AUDIT
    }

    public static void main(String[] args) {
        // High performance: internally backed by a single long bit-vector!
        EnumSet<Permission> userPermissions = EnumSet.of(Permission.READ, Permission.WRITE);
        EnumSet<Permission> adminPermissions = EnumSet.allOf(Permission.class);

        System.out.println("User permissions:  " + userPermissions);
        System.out.println("Admin permissions: " + adminPermissions);

        // Fast membership check
        if (adminPermissions.contains(Permission.DELETE)) {
            System.out.println("Admin is authorized to delete data.");
        }
    }
}`,
              output: `User permissions:  [READ, WRITE]
Admin permissions: [READ, WRITE, EXECUTE, DELETE, AUDIT]
Admin is authorized to delete data.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "EnumSet is a specialized Set implementation backed internally by bit-vectors, offering high memory efficiency and blazing performance."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "تُعد EnumSet فئة مجموعات مخصصة للتعداد تعمل داخلياً بنظام البتات (Bit-vector)، وتوفر سرعة فائقة جداً واستهلاكاً ضئيلاً للذاكرة."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: High-Speed EnumMap Lookups (المثال 10: قواميس التعداد عالية الأداء EnumMap)"
            },
            {
              type: "paragraph",
              text: "Using an EnumMap for fast array-indexed dictionary lookups."
            },
            {
              type: "code",
              language: "java",
              filename: "EnumMapDemo.java",
              code: `import java.util.EnumMap;

public class EnumMapDemo {
    enum ServerEnvironment {
        DEV, STAGING, PRODUCTION
    }

    public static void main(String[] args) {
        // Backed internally by a plain Java array indexed by enum ordinal
        EnumMap<ServerEnvironment, String> dbUrls = new EnumMap<>(ServerEnvironment.class);

        dbUrls.put(ServerEnvironment.DEV, "jdbc:postgresql://localhost:5432/dev_db");
        dbUrls.put(ServerEnvironment.STAGING, "jdbc:postgresql://stage-db.internal:5432/test_db");
        dbUrls.put(ServerEnvironment.PRODUCTION, "jdbc:postgresql://prod-cluster.cloud:5432/main_db");

        System.out.println("Production Endpoint: " + dbUrls.get(ServerEnvironment.PRODUCTION));
    }
}`,
              output: `Production Endpoint: jdbc:postgresql://prod-cluster.cloud:5432/main_db`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "EnumMap uses ordinal indexing internally, making it faster and lighter than standard HashMaps when keys are enums."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "تعتمد EnumMap داخلياً على مصفوفة عادية مفهرسة برقم التعداد، مما يجعلها أسرع وأخف بكثير من HashMap العادية."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Enterprise State Machine with Transition Validation (المثال 11: آلة حالات إلكترونية متكاملة مع التحقق من الانتقالات)"
            },
            {
              type: "paragraph",
              text: "Advanced: Finite state machine validating allowed order transitions directly inside the Enum."
            },
            {
              type: "code",
              language: "java",
              filename: "OrderStateMachineMaster.java",
              code: `public class OrderStateMachineMaster {
    enum OrderStatus {
        CREATED {
            @Override
            boolean canTransitionTo(OrderStatus next) {
                return next == PAID || next == CANCELLED;
            }
        },
        PAID {
            @Override
            boolean canTransitionTo(OrderStatus next) {
                return next == SHIPPED || next == REFUNDED;
            }
        },
        SHIPPED {
            @Override
            boolean canTransitionTo(OrderStatus next) {
                return next == DELIVERED;
            }
        },
        DELIVERED {
            @Override
            boolean canTransitionTo(OrderStatus next) {
                return false; // Terminal state
            }
        },
        CANCELLED {
            @Override
            boolean canTransitionTo(OrderStatus next) {
                return false; // Terminal state
            }
        },
        REFUNDED {
            @Override
            boolean canTransitionTo(OrderStatus next) {
                return false; // Terminal state
            }
        };

        abstract boolean canTransitionTo(OrderStatus next);
    }

    static void attemptTransition(OrderStatus current, OrderStatus next) {
        if (current.canTransitionTo(next)) {
            System.out.printf("[TRANSITION OK] %s -> %s%n", current, next);
        } else {
            System.out.printf("[ILLEGAL TRANSITION BLOCKED] Cannot jump from %s to %s%n", current, next);
        }
    }

    public static void main(String[] args) {
        attemptTransition(OrderStatus.CREATED, OrderStatus.PAID);
        attemptTransition(OrderStatus.PAID, OrderStatus.SHIPPED);
        attemptTransition(OrderStatus.CREATED, OrderStatus.DELIVERED); // Illegal!
    }
}`,
              output: `[TRANSITION OK] CREATED -> PAID
[TRANSITION OK] PAID -> SHIPPED
[ILLEGAL TRANSITION BLOCKED] Cannot jump from CREATED to DELIVERED`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "By defining transition validation logic directly within the enum constants, the state machine rules are self-contained and impossible to bypass."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "تضمين شروط الانتقال بين الحالات داخل ثوابت التعداد مباشرة يجعل قواعد النظام محكمة ومحمية من أي تحويل غير قانوني."
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
                "Mistake 1: Attempting to instantiate an enum using 'new MyEnum()'. Enum constructors are private and cannot be invoked from outside.",
                "خطأ 1: محاولة إنشاء كائن من التعداد عبر 'new MyEnum()'؛ فمشيدات التعداد خاصة ولا يمكن استدعاؤها يدوياً.",
                "Mistake 2: Relying on ordinal() values for persistent database storage. If an enum constant is reordered or a new one inserted, ordinal indices change, corrupting saved data. Use name() or explicit code fields instead.",
                "خطأ 2: الاعتماد على رقم ordinal() لتخزين الحالة في قواعد البيانات؛ فإعادة ترتيب الثوابت يغير الأرقام ويفسد البيانات القديمة.",
                "Mistake 3: Trying to extend another class with an enum. In Java, all enums already extend java.lang.Enum and cannot extend any other class."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: HTTP Status Code Enum Suite (التحدي العملي: حزمة حالات بروتوكول HTTP)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Build an enum 'HttpStatus': 1) Constants: OK(200, 'Success'), BAD_REQUEST(400, 'Client Error'), NOT_FOUND(404, 'Not Found'), SERVER_ERROR(500, 'Internal Failure'); 2) Fields: 'code' (int) and 'message' (String), with private constructor; 3) Helper method 'isError()' returning true if code >= 400; 4) Test all constants in main() showing code, message, and error status."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: قم بإنشاء التعداد HttpStatus: 1) الثوابت: OK(200), BAD_REQUEST(400), NOT_FOUND(404), SERVER_ERROR(500)؛ 2) يحتوي على حقول code و message ومشيد خاص؛ 3) دالة isError() ترجع true إذا كان الرمز >= 400؛ 4) اختبر جميع الحالات في main."
            },
            {
              type: "code",
              language: "java",
              filename: "HttpStatusChallenge.java",
              code: `public class HttpStatusChallenge {
    enum HttpStatus {
        OK(200, "Success"),
        BAD_REQUEST(400, "Client Error"),
        NOT_FOUND(404, "Not Found"),
        SERVER_ERROR(500, "Internal Server Failure");

        private final int code;
        private final String message;

        HttpStatus(int code, String msg) {
            this.code = code;
            this.message = msg;
        }

        public int getCode() { return code; }
        public String getMessage() { return message; }

        public boolean isError() {
            return code >= 400;
        }
    }

    public static void main(String[] args) {
        for (HttpStatus s : HttpStatus.values()) {
            System.out.printf("HTTP %d [%s] -> Is Error? %b%n",
                s.getCode(), s.getMessage(), s.isError());
        }
    }
}`,
              output: `HTTP 200 [Success] -> Is Error? false
HTTP 400 [Client Error] -> Is Error? true
HTTP 404 [Not Found] -> Is Error? true
HTTP 500 [Internal Server Failure] -> Is Error? true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "Each HTTP status constant encapsulates its numeric response code and message, with the isError() method computing error classifications cleanly."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "يحفظ كل ثابت كود الحالة ورسالتها، وتحدد دالة isError() ما إذا كانت الحالة تمثل خطأ برمجياً أو نجاحاً بدقة."
            }
          ],
          quiz: [
          {
                    "id": "q1",
                    "question": "What access modifier rule strictly applies to constructors declared inside a Java enum?\n(ما هي قاعدة معدل الوصول التي تنطبق بصرامة على المشيدات داخل التعداد enum في جافا؟)",
                    "options": [
                              "Enum constructors must always be public.",
                              "Enum constructors are implicitly private (or package-private); declaring them public or protected causes a compile-time error.",
                              "Enum constructors must be protected.",
                              "Enum constructors must be marked static."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Enum instances are fixed constants initialized exclusively by the JVM at class loading. Therefore, enum constructors cannot be invoked from outside; declaring an enum constructor public or protected triggers a compile-time error. (مشيدات التعداد خاصة private حكماً لمنع إنشائها من الخارج، وكتابة public أو protected يسبب خطأ تصريف صريح)."
          },
          {
                    "id": "q2",
                    "question": "Can a Java enum extend another class using the 'extends' keyword?\n\nenum Status extends BaseStatus { ACTIVE, INACTIVE } // line 1",
                    "options": [
                              "Yes, any standard class can be extended by an enum.",
                              "No; all Java enums implicitly extend java.lang.Enum, and because Java does not support multiple class inheritance, an enum cannot extend any other class.",
                              "Yes, if BaseStatus is abstract.",
                              "Yes, in Java 17 and later."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Every enum in Java implicitly extends the 'java.lang.Enum<E>' class. Since Java permits only single inheritance for classes, an enum cannot extend any other class. (كل تعداد يرث ضمنياً فئة java.lang.Enum، وبما أن جافا تمنع الوراثة المتعددة للفئات، يستحيل كتابة extends مع التعداد)."
          },
          {
                    "id": "q3",
                    "question": "Can a Java enum implement interfaces?\n\nenum Permission implements GrantedAuthority, Serializable { READ, WRITE }",
                    "options": [
                              "No, enums cannot implement interfaces.",
                              "Yes, an enum can implement one or more interfaces, providing common implementations or constant-specific overrides.",
                              "Only marker interfaces with zero methods are permitted.",
                              "Only if the enum is declared inside an interface."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Although an enum cannot extend classes, it can implement one or more interfaces, making enums powerful, type-safe components in enterprise architectures. (رغم منع وراثة الفئات، يستطيع التعداد تطبيق واجهة أو عدة واجهات بمنتهى المرونة)."
          },
          {
                    "id": "q4",
                    "question": "When using an enum in a 'switch' statement, what is the required syntax for the case labels?\n\nenum Level { LOW, MEDIUM, HIGH }\nLevel current = Level.HIGH;\nswitch (current) {\n    // Which case label is valid?\n}",
                    "options": [
                              "case Level.HIGH:",
                              "case HIGH:",
                              "case \"HIGH\":",
                              "case Level->HIGH:"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! In Java switch statements, case labels for enum types must be unqualified: 'case HIGH:'. Writing 'case Level.HIGH:' results in a compile-time error. (في جملة switch، يجب كتابة اسم الثابت مجرداً مثل case HIGH دون كتابة اسم التعداد قبله)."
          },
          {
                    "id": "q5",
                    "question": "What does the compiler-generated static 'values()' method of an enum return?\n(ماذا تُرجع الدالة الساكنة values المدمجة في أي تعداد؟)",
                    "options": [
                              "A List<String> of the constant names.",
                              "An array containing all the enum constants in the exact order they are declared.",
                              "A Set of enum ordinals.",
                              "A Map with string keys and integer values."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! The static 'values()' method returns an array of all declared constants in the enum, preserving their exact declaration order. (ترجع دالة values مصفوفة تحوي كافة ثوابت التعداد بالترتيب الدقيق الذي تم تعريفها به)."
          },
          {
                    "id": "q6",
                    "question": "Predict the output of evaluating the 'ordinal()' method on this enum:\n\nenum Priority { LOW, NORMAL, URGENT, CRITICAL }\nSystem.out.print(Priority.URGENT.ordinal());",
                    "options": [
                              "3",
                              "2",
                              "1",
                              "URGENT"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! The 'ordinal()' method returns the 0-based position of the constant in its enum declaration. Here: LOW=0, NORMAL=1, URGENT=2, CRITICAL=3. The output is 2. (دالة ordinal ترجع الفهرس الرقمي للثابت بدءاً من الصفر: LOW=0 و NORMAL=1 و URGENT=2)."
          },
          {
                    "id": "q7",
                    "question": "What occurs if you call 'Priority.valueOf(\"EMERGENCY\")' when 'EMERGENCY' is not one of the declared constants in enum Priority?",
                    "options": [
                              "It returns null safely.",
                              "It throws a java.lang.IllegalArgumentException at runtime.",
                              "It throws a NoSuchElementException at runtime.",
                              "It causes a compile-time error."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! If the string passed to 'valueOf(String)' does not match any declared constant name in the enum, the JVM immediately throws a java.lang.IllegalArgumentException. (إذا لم يطابق النص أياً من ثوابت التعداد، ترمي دالة valueOf استثناء IllegalArgumentException)."
          },
          {
                    "id": "q8",
                    "question": "Is 'valueOf(String)' case-sensitive? What happens when running 'Priority.valueOf(\"low\")' when the constant is declared as 'LOW'?",
                    "options": [
                              "It finds LOW because valueOf ignores case.",
                              "It throws a java.lang.IllegalArgumentException because valueOf() requires an exact case-sensitive match.",
                              "It returns the first constant in the enum.",
                              "It compiles but prints a warning."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! 'Enum.valueOf(String)' is strictly case-sensitive. Calling it with 'low' when the constant is 'LOW' throws an IllegalArgumentException. (دالة valueOf حساسة لحالة الأحرف تماماً، والبحث عن low بحروف صغيرة يرمي IllegalArgumentException)."
          },
          {
                    "id": "q9",
                    "question": "Examine this enum featuring constant-specific class bodies:\n\nenum MathOp {\n    PLUS {\n        double apply(double a, double b) { return a + b; }\n    },\n    MULTIPLY {\n        double apply(double a, double b) { return a * b; }\n    };\n    abstract double apply(double a, double b);\n}\n\nWhat design capability does this demonstrate?",
                    "options": [
                              "Multiple class inheritance in enums.",
                              "Constant-specific method implementation, where each enum constant provides its own specialized behavior for an abstract method without using if/switch statements.",
                              "Dynamic bytecode compilation.",
                              "Method overloading based on return type."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Constant-specific method implementation allows each enum constant to define its own unique subclass body overriding an abstract method, implementing polymorphic behavior cleanly without messy switch statements. (تطبيق الدوال المخصص لكل ثابت يتيح لكل ثابت تجاوز الدالة بسلوكه المستقل، محققاً تعدد أشكال أنيق دون الحاجة لجمل switch)."
          },
          {
                    "id": "q10",
                    "question": "Which high-performance collection class in java.util is specially designed for storing sets of enum constants using extremely compact, bit-vector representations?",
                    "options": [
                              "java.util.HashSet",
                              "java.util.EnumSet",
                              "java.util.BitSet",
                              "java.util.TreeSet"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! 'java.util.EnumSet' is a dedicated, highly optimized Set implementation for enum types. Internally, it is represented as a single long bit-vector (or array of longs), making operations blazing fast and memory footprint minimal. (فئة EnumSet مخصصة للتعداد ومبنية داخلياً على متجهات البتات bit-vectors مما يجعلها فائقة السرعة وأقل استهلاكاً للذاكرة)."
          },
          {
                    "id": "q11",
                    "question": "Why is 'java.util.EnumMap' significantly faster and more memory-efficient than a standard 'java.util.HashMap' when keys are enum constants?",
                    "options": [
                              "Because EnumMap runs on native C++ memory.",
                              "Because EnumMap is internally backed by a plain array indexed directly by the enum's ordinal(), eliminating hash computations, equals checks, and hash collisions.",
                              "Because EnumMap does not allow null values.",
                              "Because EnumMap is strictly immutable."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! EnumMap leverages the fact that enum constants have consecutive, fixed ordinals. It uses a simple Java array internally, where key lookup is an instantaneous direct array index lookup ('array[key.ordinal()]'), avoiding all hashing overhead. (تعتمد EnumMap داخلياً على مصفوفة مباشرة مفهرسة برقم ordinal للثابت، متجاوزة تماماً حسابات الهاش والتصادمات)."
          },
          {
                    "id": "q12",
                    "question": "What occurs if a programmer attempts to instantiate an enum using the 'new' keyword:\n\nDay today = new Day(); // line 1",
                    "options": [
                              "It compiles cleanly and creates a default day.",
                              "Compile-time error: enum types may not be instantiated.",
                              "It throws an InstantiationException at runtime.",
                              "It compiles only if Day has a public constructor."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! The 'new' keyword is strictly prohibited with enum types. Enum instances are static singletons initialized solely by the Java Virtual Machine. (يُحظر استخدام new مع التعداد نهائياً، لأن ثوابته تُنشأ وتُدار حصراً بواسطة بيئة تشغيل جافا JVM)."
          },
          {
                    "id": "q13",
                    "question": "Predict the output of the following enum program:\n\nenum Currency {\n    USD(\"$\", 1.0),\n    EUR(\"€\", 0.92);\n    private final String symbol;\n    private final double rate;\n    Currency(String symbol, double rate) {\n        this.symbol = symbol;\n        this.rate = rate;\n    }\n    public String format(double amount) {\n        return symbol + (amount * rate);\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        System.out.print(Currency.EUR.format(100));\n    }\n}",
                    "options": [
                              "$100.0",
                              "€92.0",
                              "€100",
                              "Compile-time error: enum cannot declare instance fields"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Currency.EUR has symbol '€' and rate 0.92. Calling format(100) calculates 100 * 0.92 = 92.0, returning '€92.0'. (الثابت EUR يحمل الرمز € والمعدل 0.92، وضرب 100 في 0.92 يعطي الناتج '€92.0')."
          },
          {
                    "id": "q14",
                    "question": "Why is comparing two enum constants using the identity operator '==' completely safe and strongly recommended in Java instead of '.equals()'?",
                    "options": [
                              "Because .equals() does not exist on enums.",
                              "Because enum constants are guaranteed unique singletons by the JVM, and '==' is compile-time type-safe and completely immune to NullPointerException.",
                              "Because '==' performs deep reflection.",
                              "Because '==' converts enums into integers automatically."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Because each enum constant exists as exactly one instance per JVM (singleton), reference identity ('==') is completely safe and faster. Furthermore, 'a == Level.LOW' never throws a NullPointerException if 'a' is null, unlike 'a.equals(Level.LOW)'. (مقارنة ثوابت التعداد بمعامل == آمنة وسريعة تماماً لأن الثوابت كائنات مفردة singletons، وتحمي من أخطاء NullPointerException إذا كان المرجع فارغاً)."
          },
          {
                    "id": "q15",
                    "question": "In an enterprise Order Fulfillment application, how does an enum best model a Finite State Machine with transition rules?",
                    "options": [
                              "By storing states in a plain text file.",
                              "By defining a method like 'boolean canTransitionTo(OrderStatus next)' or constant-specific transition methods directly within the enum to encapsulate valid lifecycle transitions.",
                              "By creating a new subclass of Enum for each state.",
                              "By using global static integers instead of enums."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Enums in Java are full-featured classes that can encapsulate behavior. Defining state transition validation directly inside the enum (e.g. validating that PENDING can transition to SHIPPED but not DELIVERED directly) ensures domain integrity and encapsulates state machine rules cleanly. (التعداد في جافا فئة متكاملة يمكنها تغليف قواعد انتقال الحالات البرمجية بدقة وأمان داخل دوالها الخاصة)."
          }
        ]
      }
    ]
  },

    /* ==========================================================================
       TOPIC 18: Method Overloading
       ========================================================================== */
    {
      id: "method-overloading",
      title: "18. Method Overloading",
      description: "Mastering Java Method Overloading: Compile-time polymorphism, parameter signature differentiation, type promotion hierarchy, autoboxing precedence, and varargs rules.",
      lessons: [
        {
          id: "overloading-mastery",
          title: "Complete Guide to Method Overloading",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "Understanding Method Overloading (فهم التحميل الزائد للدوال في جافا)"
            },
            {
              type: "paragraph",
              text: "Method Overloading is a mechanism in Java where a class can define multiple methods that share the EXACT same name, provided they have DIFFERENT parameter lists. Overloading represents Compile-Time (Static) Polymorphism, because the Java compiler determines which method version to call at compile time based on the argument types and count."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "التحميل الزائد للدوال (Method Overloading) هو آلية برمجية تسمح للفئة الواحدة باحتواء عدة دوال تحمل نفس الاسم تماماً، بشرط اختلاف قائمة المعاملات (عددها أو أنواعها أو ترتيبها). يمثل التحميل الزائد شكلاً من أشكال تعدد الأشكال في وقت التصريف (Compile-Time Polymorphism)، حيث يحدد المصرف الدالة المناسبة للاستدعاء أثناء بناء البرنامج بناءً على المعاملات الممررة."
            },
            {
              type: "paragraph",
              text: "The Golden Rule: Methods CANNOT be overloaded based on return type alone! Differing return types, access modifiers, or throws clauses with identical parameter lists result in a compile error."
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
              text: "Example 1: Overloading by Number of Parameters (المثال 1: التحميل الزائد باختلاف عدد المعاملات)"
            },
            {
              type: "paragraph",
              text: "Varying the number of arguments accepted by the method."
            },
            {
              type: "code",
              language: "java",
              filename: "OverloadByCountDemo.java",
              code: `public class OverloadByCountDemo {
    static class Calculator {
        // Version 1: Two integer arguments
        int add(int a, int b) {
            return a + b;
        }

        // Version 2: Three integer arguments
        int add(int a, int b, int c) {
            return a + b + c;
        }
    }

    public static void main(String[] args) {
        Calculator calc = new Calculator();
        System.out.println("2 parameters: " + calc.add(10, 20));
        System.out.println("3 parameters: " + calc.add(10, 20, 30));
    }
}`,
              output: `2 parameters: 30
3 parameters: 60`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "The compiler chooses the method matching the number of supplied arguments at compile time."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "يختار مصرف جافا الدالة المطابقة لعدد المعاملات الممررة عند استدعائها في وقت التصريف."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Overloading by Parameter Data Types (المثال 2: التحميل الزائد باختلاف أنواع البيانات)"
            },
            {
              type: "paragraph",
              text: "Keeping the same parameter count while changing parameter data types."
            },
            {
              type: "code",
              language: "java",
              filename: "OverloadByTypeDemo.java",
              code: `public class OverloadByTypeDemo {
    static class Formatter {
        void format(int number) {
            System.out.println("Formatting Integer: #" + number);
        }

        void format(double number) {
            System.out.printf("Formatting Floating Point: $%.2f%n", number);
        }

        void format(String text) {
            System.out.println("Formatting String: \\"" + text + "\\"");
        }
    }

    public static void main(String[] args) {
        Formatter f = new Formatter();
        f.format(42);
        f.format(99.954);
        f.format("Enterprise Edition");
    }
}`,
              output: `Formatting Integer: #42
Formatting Floating Point: $99.95
Formatting String: "Enterprise Edition"`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "Each method version handles a distinct type (int, double, String), allowing clean, intuitive calling syntax."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "تعالج كل نسخة نوع بيانات مختلف (int أو double أو String)، مما يمنح الكود بساطة ووضوحاً."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Overloading by Parameter Order (المثال 3: التحميل الزائد باختلاف ترتيب المعاملات)"
            },
            {
              type: "paragraph",
              text: "Switching the positions of different parameter types."
            },
            {
              type: "code",
              language: "java",
              filename: "OverloadByOrderDemo.java",
              code: `public class OverloadByOrderDemo {
    static class ProfileService {
        void display(String username, int id) {
            System.out.println("Profile -> Username: " + username + " | ID: " + id);
        }

        void display(int id, String username) {
            System.out.println("Lookup by ID -> ID: " + id + " | Username: " + username);
        }
    }

    public static void main(String[] args) {
        ProfileService ps = new ProfileService();
        ps.display("tariq_dev", 101);
        ps.display(102, "nour_eng");
    }
}`,
              output: `Profile -> Username: tariq_dev | ID: 101
Lookup by ID -> ID: 102 | Username: nour_eng`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "Java distinguishes methods by parameter order (String, int) vs (int, String)."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "تعتبر جافا ترتيب المعاملات (String, int) مختلفاً تماماً عن (int, String) وتقبل تحميلهما معاً."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Automatic Type Promotion in Overloading (المثال 4: الترقية التلقائية للأنواع Type Promotion)"
            },
            {
              type: "paragraph",
              text: "How Java promotes smaller primitive types (byte -> short -> int -> long -> float -> double) if an exact match is absent."
            },
            {
              type: "code",
              language: "java",
              filename: "TypePromotionOverloadDemo.java",
              code: `public class TypePromotionOverloadDemo {
    static class Printer {
        // No version accepting 'int' directly exists!
        void print(double d) {
            System.out.println("Promoted to double version: " + d);
        }
    }

    public static void main(String[] args) {
        Printer p = new Printer();
        int score = 100;
        p.print(score); // 'int' is promoted automatically to 'double'
    }
}`,
              output: `Promoted to double version: 100.0`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "When an exact primitive type match is missing, the compiler automatically promotes the argument to the nearest wider primitive type."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "عند عدم العثور على دالة تطابق نوع المتغير بدقة، يقوم المصرف بترقية النوع تلقائياً إلى نوع أكبر يستوعبه (مثل ترقية int إلى double)."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Ambiguity Error with Promotion (المثال 5: خطأ اللبس والغموض Ambiguity Error)"
            },
            {
              type: "paragraph",
              text: "Understanding when two promoted methods conflict, causing a compiler error."
            },
            {
              type: "code",
              language: "java",
              filename: "AmbiguityOverloadDemo.java",
              code: `public class AmbiguityOverloadDemo {
    static class AmbiguousMath {
        void calculate(int a, double b) { System.out.println("int, double"); }
        void calculate(double a, int b) { System.out.println("double, int"); }
    }

    public static void main(String[] args) {
        AmbiguousMath m = new AmbiguousMath();
        m.calculate(10, 20.5); // Clear: calls (int, double)
        m.calculate(10.5, 20); // Clear: calls (double, int)

        // m.calculate(10, 20); // COMPILER ERROR: reference to calculate is ambiguous!
        // Both (int, double) and (double, int) are equally valid via promotion!
    }
}`,
              output: `int, double
double, int`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "Passing (10, 20) triggers an ambiguity error because neither overload is more specific than the other."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "تمرير (10, 20) يسبب خطأ تصريف بسبب الغموض، حيث تتساوى الدالتان في احتمالية ترقية المعاملات ولا يفضل إحداهما على الأخرى."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Widening vs Autoboxing Precedence (المثال 6: أسبقية التوسيع على التغليف الآلي)"
            },
            {
              type: "paragraph",
              text: "Primitive widening always wins over Autoboxing in Java method resolution."
            },
            {
              type: "code",
              language: "java",
              filename: "WideningVsAutoboxingDemo.java",
              code: `public class WideningVsAutoboxingDemo {
    static class ResolutionOrder {
        void test(long val) {
            System.out.println("1. Widening primitive wins: long");
        }

        void test(Integer val) {
            System.out.println("2. Autoboxing wins: Integer");
        }
    }

    public static void main(String[] args) {
        ResolutionOrder ro = new ResolutionOrder();
        int x = 50;
        ro.test(x); // Calls long version, because primitive widening beats autoboxing!
    }
}`,
              output: `1. Widening primitive wins: long`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "Java language rules dictate that primitive widening (int -> long) has higher priority than autoboxing (int -> Integer)."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "قواعد جافا تعطي الأسبقية لتوسيع النوع البسيط (int إلى long) على حساب عملية التغليف الآلي (int إلى كائن Integer)."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Overloading with Variable Arguments (varargs) (المثال 7: التحميل الزائد مع المعاملات المتغيرة varargs)"
            },
            {
              type: "paragraph",
              text: "Exact matches always take precedence over varargs (...)."
            },
            {
              type: "code",
              language: "java",
              filename: "VarargsOverloadDemo.java",
              code: `public class VarargsOverloadDemo {
    static class VarargsHandler {
        // Specific overload
        void process(int a, int b) {
            System.out.println("Exact 2-arg match: " + a + ", " + b);
        }

        // Varargs fallback
        void process(int... numbers) {
            System.out.println("Varargs fallback: " + numbers.length + " items passed");
        }
    }

    public static void main(String[] args) {
        VarargsHandler vh = new VarargsHandler();
        vh.process(10, 20);         // Calls specific 2-arg version!
        vh.process(10, 20, 30, 40); // Calls varargs fallback
    }
}`,
              output: `Exact 2-arg match: 10, 20
Varargs fallback: 4 items passed`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "Varargs methods have the lowest priority during overload resolution and are only chosen if no exact or widened method matches."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "دوال المعاملات المتغيرة (Varargs) تأتي في أدنى درجات الأسبقية، ولا يتم اللجوء إليها إلا إذا تعذر وجود دالة تطابق المعاملات مباشرة."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Overloading Static Utility Methods (المثال 8: التحميل الزائد للدوال الساكنة static)"
            },
            {
              type: "paragraph",
              text: "Static methods can be overloaded just like instance methods."
            },
            {
              type: "code",
              language: "java",
              filename: "StaticOverloadDemo.java",
              code: `public class StaticOverloadDemo {
    static class MathUtils {
        static int max(int a, int b) {
            return (a >= b) ? a : b;
        }

        static double max(double a, double b) {
            return (a >= b) ? a : b;
        }

        static String max(String a, String b) {
            return (a.compareTo(b) >= 0) ? a : b;
        }
    }

    public static void main(String[] args) {
        System.out.println("Max int:    " + MathUtils.max(10, 25));
        System.out.println("Max double: " + MathUtils.max(14.2, 9.8));
        System.out.println("Max String: " + MathUtils.max("Zebra", "Apple"));
    }
}`,
              output: `Max int:    25
Max double: 14.2
Max String: Zebra`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "Method overloading applies equally to static methods, creating flexible utility classes without object instantiation."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "ينطبق التحميل الزائد على الدوال الساكنة أيضاً بنفس القواعد، مما يسهل بناء فئات أدوات عامة."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Constructor Overloading (المثال 9: التحميل الزائد للمشيدات)"
            },
            {
              type: "paragraph",
              text: "Overloading class constructors to provide flexible initialization patterns."
            },
            {
              type: "code",
              language: "java",
              filename: "ConstructorOverloadDemo.java",
              code: `public class ConstructorOverloadDemo {
    static class ServerNode {
        String ip;
        int port;
        int maxConnections;

        // Constructor 1: Full parameters
        ServerNode(String ip, int port, int maxConn) {
            this.ip = ip;
            this.port = port;
            this.maxConnections = maxConn;
        }

        // Constructor 2: Overloaded with default connections
        ServerNode(String ip, int port) {
            this(ip, port, 1000); // Chains to Constructor 1
        }

        // Constructor 3: Overloaded with default port and connections
        ServerNode(String ip) {
            this(ip, 8080, 500);
        }

        void printInfo() {
            System.out.printf("Server: %s:%d (Max Clients: %d)%n", ip, port, maxConnections);
        }
    }

    public static void main(String[] args) {
        new ServerNode("10.0.0.1", 9000, 5000).printInfo();
        new ServerNode("10.0.0.2", 8443).printInfo();
        new ServerNode("10.0.0.3").printInfo();
    }
}`,
              output: `Server: 10.0.0.1:9000 (Max Clients: 5000)
Server: 10.0.0.2:8443 (Max Clients: 1000)
Server: 10.0.0.3:8080 (Max Clients: 500)`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "Constructor overloading allows objects to be constructed with varied levels of detail while maintaining default values through 'this(...)' chaining."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "يتيح التحميل الزائد للمشيدات إنشاء الكائنات بتفاصيل مختلفة مع توفير قيم افتراضية عبر تسلسل this(...)."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Invalid Overloading Demo: Differing Return Type Only (المثال 10: خطأ محاولة التحميل الزائد باختلاف نوع القيمة المرجعة فقط)"
            },
            {
              type: "paragraph",
              text: "Why changing return type alone is strictly forbidden by the Java compiler."
            },
            {
              type: "code",
              language: "java",
              filename: "InvalidReturnOverloadDemo.java",
              code: `public class InvalidReturnOverloadDemo {
    static class Example {
        int compute(int x) {
            return x * 2;
        }

        // UNCOMMENTING THIS CAUSES A COMPILE ERROR:
        // double compute(int x) { return (double) x * 2.5; }
        // Error: method compute(int) is already defined in class Example!
    }

    public static void main(String[] args) {
        Example ex = new Example();
        System.out.println("Result: " + ex.compute(5));
        // Reason: If someone calls ex.compute(5); without storing the return value,
        // the compiler has NO way of knowing which method to call!
    }
}`,
              output: `Result: 10`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "Return types are not part of the method signature. If a method call discards the return value, the compiler cannot disambiguate which method to invoke."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "نوع القيمة المرجعة ليس جزءاً من بصمة الدالة (Signature)؛ لأنه في حال استدعاء الدالة وتجاهل حفظ القيمة لن يستطيع المصرف تمييز الدالة المطلوبة."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Enterprise Multi-Channel Payment Processor (المثال 11: معالج مدفوعات متعدد القنوات بالتحميل الزائد)"
            },
            {
              type: "paragraph",
              text: "Advanced: Real-world payment gateway charging via card, bank transfer, and promotional coupon through overloaded charge methods."
            },
            {
              type: "code",
              language: "java",
              filename: "PaymentOverloadMaster.java",
              code: `public class PaymentOverloadMaster {
    static class PaymentProcessor {
        // Channel 1: Credit Card
        public void charge(String cardNum, String cvv, double amount) {
            System.out.printf("[CARD CHARGE] $%.2f charged to Card ending in -%s%n",
                amount, cardNum.substring(cardNum.length() - 4));
        }

        // Channel 2: Bank Account Transfer
        public void charge(String iban, double amount) {
            System.out.printf("[BANK TRANSFER] $%.2f direct debit from IBAN: %s%n", amount, iban);
        }

        // Channel 3: Promo Coupon + Balance
        public void charge(double amount, String couponCode, double discountPercentage) {
            double finalAmount = amount * (1.0 - (discountPercentage / 100.0));
            System.out.printf("[COUPON APPLIED] %s (%.0f%% off) | Charged $%.2f (Original: $%.2f)%n",
                couponCode, discountPercentage, finalAmount, amount);
        }
    }

    public static void main(String[] args) {
        PaymentProcessor gateway = new PaymentProcessor();

        gateway.charge("4111222233339012", "382", 120.0);
        gateway.charge("SA0380000000608010167519", 450.0);
        gateway.charge(200.0, "BLACKFRIDAY20", 20.0);
    }
}`,
              output: `[CARD CHARGE] $120.00 charged to Card ending in -9012
[BANK TRANSFER] $450.00 direct debit from IBAN: SA0380000000608010167519
[COUPON APPLIED] BLACKFRIDAY20 (20% off) | Charged $160.00 (Original: $200.00)`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "The payment processor exposes intuitive, overloaded 'charge()' entry points tailored to each payment mechanism while preserving a single method name."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "يقدم معالج المدفوعات واجهة سهلة وبديهية للمطور عبر دالة charge() محملة بعدة طرق دفع مختلفة بنفس الاسم وبمعاملات مخصصة لكل قناة."
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
                "Mistake 1: Attempting to overload methods by changing only the return type. The compiler identifies overloads by parameter list, not return type.",
                "خطأ 1: محاولة التحميل الزائد بتغيير نوع القيمة المرجعة فقط؛ فالمصرف يعتمد فقط على قائمة المعاملات لتمييز الدوال.",
                "Mistake 2: Calling overloaded methods that create ambiguity with automatic promotion (e.g. method(int, double) vs method(double, int) with two ints passed).",
                "خطأ 2: التسبب في لبس وغموض عند تمرير قيم تقبل الترقية لأكثر من دالة بنفس القدر.",
                "Mistake 3: Confusing Method Overloading (same class, different parameters, compile-time) with Method Overriding (subclass, identical signature, runtime)."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Geometry Calculator Suite (التحدي العملي: حاسبة الأشكال الهندسية)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Build a class 'GeometryCalculator' with overloaded static 'calculateArea' methods: 1) calculateArea(double radius) for a circle (pi * r^2); 2) calculateArea(double width, double height) for a rectangle (w * h); 3) calculateArea(double base, double height, boolean isTriangle) for a triangle (0.5 * b * h); 4) Test all three shapes in main()."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: قم بإنشاء فئة GeometryCalculator تحتوي على دوال calculateArea ساكنة ومحمّلة: 1) calculateArea(double radius) لحساب مساحة الدائرة؛ 2) calculateArea(double width, double height) لمساحة المستطيل؛ 3) calculateArea(double base, double height, boolean isTriangle) لمساحة المثلث؛ 4) اختبر الأشكال الثلاثة في main."
            },
            {
              type: "code",
              language: "java",
              filename: "GeometryCalculatorChallenge.java",
              code: `public class GeometryCalculatorChallenge {
    static class GeometryCalculator {
        // Circle
        static double calculateArea(double radius) {
            return Math.PI * radius * radius;
        }

        // Rectangle
        static double calculateArea(double width, double height) {
            return width * height;
        }

        // Triangle
        static double calculateArea(double base, double height, boolean isTriangle) {
            return 0.5 * base * height;
        }
    }

    public static void main(String[] args) {
        System.out.printf("Circle Area (r=5.0):     %.2f%n", GeometryCalculator.calculateArea(5.0));
        System.out.printf("Rectangle Area (4.0x6.0): %.2f%n", GeometryCalculator.calculateArea(4.0, 6.0));
        System.out.printf("Triangle Area (b=8, h=3): %.2f%n", GeometryCalculator.calculateArea(8.0, 3.0, true));
    }
}`,
              output: `Circle Area (r=5.0):     78.54
Rectangle Area (4.0x6.0): 24.00
Triangle Area (b=8, h=3): 12.00`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "The overloaded calculateArea method cleanly handles circles, rectangles, and triangles based on argument signature differentiation."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "تعاملت دالة calculateArea المحملة مع حساب مساحة الدائرة والمستطيل والمثلث بسلاسة بالاعتماد على اختلاف المعاملات الممررة."
            }
          ],
          quiz: [
                    {
                              "id": "q1",
                              "question": "What constitutes the method signature in Java for the purpose of method overloading? (ما الذي يشكل بصمة الدالة Method Signature في جافا لأغراض التحميل الزائد؟)",
                              "options": [
                                        "The method name, parameter types, parameter order, and return type.",
                                        "The method name and the parameter list (types, number, and order of parameters).",
                                        "The method name, access modifier, and parameter list.",
                                        "The parameter names and return type only."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! In Java, a method signature consists strictly of the method name and the parameter list (their number, data types, and sequence order). The return type, access modifiers, and parameter names are NOT part of the signature. (بصمة الدالة في جافا تتكون حصراً من اسم الدالة وقائمة معاملاتها من حيث العدد والنوع والترتيب، ولا يدخل نوع الإرجاع أو محددات الوصول في البصمة)."
                    },
                    {
                              "id": "q2",
                              "question": "Consider the following code snippet:\n\nclass Calculator {\n    int compute(int a) { return a * a; }\n    int compute(int a, int b) { return a * b; }\n}\n\nWhat is printed by: System.out.println(new Calculator().compute(4) + new Calculator().compute(3, 5));?",
                              "options": [
                                        "31",
                                        "27",
                                        "Compiler error: compute is duplicated.",
                                        "40"
                              ],
                              "correctIndex": 0,
                              "explanation": "Correct! The call compute(4) invokes compute(int) returning 4 * 4 = 16. The call compute(3, 5) invokes compute(int, int) returning 3 * 5 = 15. The sum is 16 + 15 = 31. (الدالة الأولى تعيد 16 والدالة الثانية تعيد 15 ومجموعهما هو 31)."
                    },
                    {
                              "id": "q3",
                              "question": "Which of the following method pairs demonstrates valid method overloading by differing parameter sequence?\n(أي من أزواج الدوال التالية يمثل تحميلاً زائداً صحيحاً عبر اختلاف ترتيب المعاملات؟)",
                              "options": [
                                        "void log(String msg, int code) AND void log(String text, int status)",
                                        "void log(String msg, int code) AND int log(String msg, int code)",
                                        "void log(String msg, int code) AND void log(int code, String msg)",
                                        "public void log(String msg, int code) AND private void log(String msg, int code)"
                              ],
                              "correctIndex": 2,
                              "explanation": "Correct! Differing the order of distinct parameter types (String, int) versus (int, String) creates two distinct method signatures, allowing valid overloading. Merely changing parameter names, return types, or access modifiers does not overload a method. (اختلاف ترتيب أنواع المعاملات مثل String ثم int مقابل int ثم String ينشئ بصمتين مختلفتين ويحقق التحميل الزائد الصحيح)."
                    },
                    {
                              "id": "q4",
                              "question": "Given the following overloaded methods:\n\nclass Printer {\n    static void display(int x) { System.out.print(\"INT \"); }\n    static void display(double x) { System.out.print(\"DOUBLE \"); }\n}\n\nWhat is the output of executing:\nchar ch = 'A';\nPrinter.display(ch);\nPrinter.display(5.5f);",
                              "options": [
                                        "INT DOUBLE",
                                        "DOUBLE DOUBLE",
                                        "Compiler error: no matching method for char and float",
                                        "INT INT"
                              ],
                              "correctIndex": 0,
                              "explanation": "Correct! Java automatically promotes primitive types (widening). A 'char' widens to 'int' before 'double', so display(ch) selects display(int). A 'float' widens to 'double', so display(5.5f) selects display(double). Output is 'INT DOUBLE '. (يتم ترقية char تلقائياً إلى int، وترقية float تلقائياً إلى double لعدم وجود تطابق مطابق مباشر، فيكون الناتج INT DOUBLE)."
                    },
                    {
                              "id": "q5",
                              "question": "What happens when the following code is compiled and executed?\n\nclass AmbiguityDemo {\n    static void test(int a, double b) { System.out.print(\"ID \"); }\n    static void test(double a, int b) { System.out.print(\"DI \"); }\n    public static void main(String[] args) {\n        test(10, 20);\n    }\n}",
                              "options": [
                                        "Prints: ID",
                                        "Prints: DI",
                                        "Compile-time error: reference to test is ambiguous.",
                                        "Prints: ID DI"
                              ],
                              "correctIndex": 2,
                              "explanation": "Correct! Passing two integer literals (10, 20) matches both test(int, double) (promoting 20 to double) and test(double, int) (promoting 10 to double) with equal specificity. Because neither method is more specific, the Java compiler rejects the call with an ambiguity error. (كلا الدالتين تتطلبان ترقية أحد المعاملين إلى double بنفس الدرجة، ولعدم وجود دالة أكثر تحديداً يفشل التصريف بخطأ غموض التحميل الزائد)."
                    },
                    {
                              "id": "q6",
                              "question": "In Java method overloading resolution, what is the correct order of precedence when resolving argument types?\n(ما هو ترتيب الأسبقية المعتمد لدى مصرف جافا عند فض وتحديد الدالة المحملة المطابقة؟)",
                              "options": [
                                        "Varargs -> Autoboxing -> Widening Primitive -> Exact Match",
                                        "Exact Match -> Widening Primitive -> Autoboxing/Unboxing -> Varargs",
                                        "Exact Match -> Autoboxing -> Widening Primitive -> Varargs",
                                        "Autoboxing -> Exact Match -> Widening Primitive -> Varargs"
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! The Java Language Specification (JLS) establishes resolution precedence: 1) Exact match (no conversion), 2) Primitive Widening (e.g. int -> long), 3) Autoboxing/Unboxing (e.g. int -> Integer), 4) Variable-length arguments (varargs). (ترتيب الأسبقية الصارم في جافا: 1. التطابق التام، 2. التوسيع البسيط، 3. التغليف والفك الآلي، 4. المعاملات المتغيرة varargs)."
                    },
                    {
                              "id": "q7",
                              "question": "Consider the following class:\n\nclass PrecedenceCheck {\n    static void check(long x) { System.out.print(\"WIDEN \"); }\n    static void check(Integer x) { System.out.print(\"BOX \"); }\n    static void check(int... x) { System.out.print(\"VARARGS \"); }\n    public static void main(String[] args) {\n        int val = 42;\n        check(val);\n    }\n}\n\nWhat is printed to the console?",
                              "options": [
                                        "BOX",
                                        "VARARGS",
                                        "WIDEN",
                                        "Compile-time error: call is ambiguous."
                              ],
                              "correctIndex": 2,
                              "explanation": "Correct! Primitive widening (int to long) takes precedence over autoboxing (int to Integer) and varargs. Thus, check(long) is chosen and prints 'WIDEN '. (توسيع النوع الأولي من int إلى long يسبق التغليف الآلي إلى Integer ويسبق varargs، فتُستدعى check(long) وتطبع WIDEN)."
                    },
                    {
                              "id": "q8",
                              "question": "Why does the following class fail to compile?\n\nclass ReturnTypeTest {\n    public int compute(int x) {\n        return x * 2;\n    }\n    public double compute(int x) {\n        return (double) x * 2.0;\n    }\n}",
                              "options": [
                                        "Because the return type must be void in overloaded methods.",
                                        "Because return types are not part of the method signature; both methods have the identical signature compute(int).",
                                        "Because double cannot be returned from a method with an int parameter.",
                                        "Because the methods must be static to differ by return type."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Return type is not part of the method signature. When calling compute(5); as an expression statement without capturing the return value, the compiler has no way to determine which method is invoked. (نوع القيمة المرجعة ليس جزءاً من بصمة الدالة؛ لذلك يرى المصرف دالتين بنفس البصمة compute(int) تماماً مما يسبب خطأ تصريف)."
                    },
                    {
                              "id": "q9",
                              "question": "Can static methods be overloaded in the same class in Java?\n(هل يمكن إجراء تحميل زائد للدوال الساكنة static داخل نفس الفئة في جافا؟)",
                              "options": [
                                        "No, static methods cannot be overloaded because they belong to the class, not instances.",
                                        "Yes, static methods can be overloaded as long as their parameter lists differ.",
                                        "Only if they also have different access modifiers.",
                                        "Only if at least one of the overloaded methods is non-static."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Static methods can be overloaded just like instance methods, provided their parameter lists differ. For example, java.lang.Math overloads static max(int, int), max(long, long), max(float, float), and max(double, double). (نعم، يمكن تحميل الدوال الساكنة تحميلاً زائداً بشكل كامل شريطة اختلاف المعاملات، كما في فئة Math القياسية)."
                    },
                    {
                              "id": "q10",
                              "question": "What is the primary architectural purpose of Constructor Overloading using 'this(...)' delegation?\n(ما هو الهدف المعماري الأساسي من التحميل الزائد للمشيدات باستخدام تفويض this(...)؟)",
                              "options": [
                                        "To allow subclasses to override parent constructors.",
                                        "To avoid duplicate initialization code by chaining constructors to a single canonical constructor.",
                                        "To allocate multiple memory blocks on the heap for one object.",
                                        "To invoke superclass methods before object construction."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Constructor delegation (chaining via this(...)) allows secondary constructors to supply default values and delegate to a single master (canonical) constructor, eliminating code duplication and ensuring consistent invariant validation. (تفويض المشيدات يتيح تمرير القيم الافتراضية إلى مشيد رئيسي موحد، مانعاً تكرار كود التهيئة وضامناً اتساق قواعد التحقق)."
                    },
                    {
                              "id": "q11",
                              "question": "What happens when compiling and running this code snippet?\n\nclass VarargsAmbiguity {\n    static void run(int... nums) { System.out.print(\"INT_VAR \"); }\n    static void run(Integer... nums) { System.out.print(\"BOX_VAR \"); }\n    public static void main(String[] args) {\n        run();\n    }\n}",
                              "options": [
                                        "Prints: INT_VAR",
                                        "Prints: BOX_VAR",
                                        "Compile-time error: reference to run is ambiguous.",
                                        "Runtime exception: NullPointerException"
                              ],
                              "correctIndex": 2,
                              "explanation": "Correct! Calling run() with zero arguments matches both run(int...) and run(Integer...) with equal validity. Because neither varargs method is more specific than the other for an empty argument list, the compiler flags an ambiguity error. (استدعاء run() دون معاملات يطابق الدالتين بالتساوي، وبما أن أياً منهما ليست أكثر تحديداً من الأخرى في غياب المعاملات، يحدث خطأ تصريف بسبب الغموض)."
                    },
                    {
                              "id": "q12",
                              "question": "How does Method Overloading differ fundamentally from Method Overriding?\n(كيف يختلف التحميل الزائد للدوال جوهرياً عن تجاوز الدوال Method Overriding؟)",
                              "options": [
                                        "Overloading occurs at runtime across inheritance, whereas Overriding occurs at compile-time within the same class.",
                                        "Overloading represents compile-time (static) polymorphism with different parameter lists; Overriding represents runtime (dynamic) polymorphism with identical signatures across an inheritance hierarchy.",
                                        "Overloading requires the @Override annotation, whereas Overriding requires unique method names.",
                                        "Overloading is restricted to private methods, whereas Overriding applies only to static methods."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Method Overloading is compile-time polymorphism (early binding) resolved by parameter signatures, typically in the same class. Method Overriding is runtime polymorphism (late binding) where a subclass provides a specialized implementation of an inherited method with identical signature. (التحميل الزائد تعدد أشكال في وقت التصريف باختلاف المعاملات، بينما التجاوز تعدد أشكال في وقت التشغيل بنفس البصمة عبر شجرة الوراثة)."
                    },
                    {
                              "id": "q13",
                              "question": "A payment gateway class contains:\n\npublic void charge(String cardNum, String cvv, double amount) { /* 1 */ }\npublic void charge(String iban, double amount) { /* 2 */ }\npublic void charge(double amount, String promoCode, double discountPct) { /* 3 */ }\n\nWhich method is invoked by: gateway.charge(150.0, \"SUMMER50\", 15.0);?",
                              "options": [
                                        "Method 1",
                                        "Method 2",
                                        "Method 3",
                                        "Compile-time error: ambiguous invocation"
                              ],
                              "correctIndex": 2,
                              "explanation": "Correct! The argument types are (double, String, double). This precisely matches the signature of Method 3: charge(double, String, double). (المعاملات الممررة هي double ثم String ثم double، وهو ما يطابق بدقة تامة بصمة الدالة الثالثة)."
                    },
                    {
                              "id": "q14",
                              "question": "What is printed by the following program?\n\nclass SpecificityTest {\n    static void show(Object obj) { System.out.print(\"Object \"); }\n    static void show(String str) { System.out.print(\"String \"); }\n    public static void main(String[] args) {\n        show(null);\n    }\n}",
                              "options": [
                                        "Object",
                                        "String",
                                        "Compile-time error: ambiguous call",
                                        "Runtime NullPointerException"
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! When passing 'null', the Java compiler selects the most specific applicable overloaded method. Since String is a subclass of Object, String is more specific than Object, so show(String) is chosen without ambiguity. (عند تمرير null يختار المصرف الدالة الأكثر تخصيصاً؛ وبما أن String فئة فرعية من Object فهي أكثر تخصيصاً فتُستدعى show(String))."
                    },
                    {
                              "id": "q15",
                              "question": "What is the result of compiling and executing this program?\n\nclass AmbiguousNullTest {\n    static void show(String s) { System.out.print(\"String \"); }\n    static void show(Integer i) { System.out.print(\"Integer \"); }\n    public static void main(String[] args) {\n        show(null);\n    }\n}",
                              "options": [
                                        "String",
                                        "Integer",
                                        "Compile-time error: reference to show is ambiguous.",
                                        "Runtime NullPointerException"
                              ],
                              "correctIndex": 2,
                              "explanation": "Correct! Both String and Integer are reference types capable of accepting 'null', but neither is a subtype of the other (they are unrelated sibling classes). The compiler cannot determine which is more specific, causing a compile-time ambiguity error. (كلا النوعين String و Integer يقبلان null ولا توجد علاقة وراثة بينهما؛ وبالتالي يفشل المصرف في تحديد أيهما أكثر تخصيصاً وينتج خطأ تصريف ambiguous)."
                    }
          ]
        }
      ]
    }
  ];
})();
