/**
 * Java Curriculum Module - Part 3
 * Topics:
 * 5. Java Constructors
 * 6. Java this Keyword
 * 
 * 100% Offline, Pure JavaScript. Complete educational content with full bilingual (English & Arabic) explanations.
 */

(function () {
  'use strict';

  window.JAVA_TOPICS_PART3 = [
    /* ==========================================================================
       TOPIC 5: Java Constructors
       ========================================================================== */
    {
      id: "java-constructors",
      title: "5. Java Constructors",
      description: "Comprehensive guide to Java Constructors: Default vs parameterized constructors, constructor overloading, chaining with this(), copy constructors, and private constructors.",
      lessons: [
        {
          id: "constructors-mastery",
          title: "Complete Guide to Java Constructors",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "Understanding Java Constructors (فهم المشيدات في لغة جافا)"
            },
            {
              type: "paragraph",
              text: "A constructor is a special block of code that is automatically called when a new instance of a class is created via the 'new' keyword. Its primary duty is to initialize the newly created object's state and allocate any necessary resources. A constructor has two strict syntactical rules: 1) It must have the EXACT same name as the class; 2) It has NO return type, not even 'void'."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "المشيد (Constructor) هو دالة بناء خاصة تُستدعى تلقائياً عند إنشاء كائن جديد بواسطة 'new'. مهمته الأساسية تهيئة حالة الكائن وحقوله بالبيانات الأولية. يتبع المشيد قاعدتين صارمتين: 1) يجب أن يتطابق اسمه تماماً مع اسم الفئة (Class) مع مراعاة حالة الأحرف؛ 2) لا يمتلك أي نوع إرجاع إطلاقاً، حتى كلمة 'void' لا يجوز كتابتها."
            },
            {
              type: "paragraph",
              text: "If you define no constructor in your class, the Java compiler automatically inserts a default no-argument constructor. However, as soon as you define ANY custom constructor with parameters, the compiler withdraws its default constructor."
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
              text: "Example 1: Explicit No-Arg Constructor (المثال 1: مشيد صريح بدون معاملات)"
            },
            {
              type: "paragraph",
              text: "A basic constructor providing default initial values when an object is instantiated."
            },
            {
              type: "code",
              language: "java",
              filename: "DefaultConstructorDemo.java",
              code: `public class DefaultConstructorDemo {
    static class Lamp {
        boolean isOn;
        String color;

        // Explicit No-Argument Constructor
        Lamp() {
            isOn = false;
            color = "Warm White";
            System.out.println("Lamp constructed with default settings.");
        }
    }

    public static void main(String[] args) {
        Lamp myLamp = new Lamp();
        System.out.println("Status: " + (myLamp.isOn ? "ON" : "OFF") + " | Color: " + myLamp.color);
    }
}`,
              output: `Lamp constructed with default settings.
Status: OFF | Color: Warm White`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "When 'new Lamp()' is called, JVM allocates memory and immediately executes the constructor Lamp(), configuring initial attribute values."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "عند تنفيذ 'new Lamp()' تحجز الذاكرة مساحة للكائن ثم يُستدعى المشيد Lamp() مباشرة لتجهيز القيم الافتراضية للمصباح."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Parameterized Constructor (المثال 2: مشيد ذو معاملات مخصصة)"
            },
            {
              type: "paragraph",
              text: "Passing distinct values upon creation to initialize each object's state independently."
            },
            {
              type: "code",
              language: "java",
              filename: "ParameterizedDemo.java",
              code: `public class ParameterizedDemo {
    static class UserProfile {
        String username;
        String role;

        // Parameterized Constructor
        UserProfile(String uName, String uRole) {
            username = uName;
            role = uRole;
        }
    }

    public static void main(String[] args) {
        UserProfile admin = new UserProfile("root_admin", "SuperUser");
        UserProfile guest = new UserProfile("visitor_41", "Guest");

        System.out.println(admin.username + " has role: " + admin.role);
        System.out.println(guest.username + " has role: " + guest.role);
    }
}`,
              output: `root_admin has role: SuperUser
visitor_41 has role: Guest`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "The parameterized constructor forces callers to supply required data upon creation, eliminating half-initialized objects."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "يجبر المشيد ذو المعاملات المستخدم على تمرير البيانات الأساسية عند الإنشاء، مما يمنع وجود كائنات غير مكتملة التهيئة في البرنامج."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Constructor Overloading (المثال 3: التحميل الزائد للمشيدات)"
            },
            {
              type: "paragraph",
              text: "Providing multiple constructors to support diverse instantiation scenarios."
            },
            {
              type: "code",
              language: "java",
              filename: "OverloadedConstructors.java",
              code: `public class OverloadedConstructors {
    static class Rectangle {
        int width;
        int height;

        // 1. No-arg: creates a 1x1 default rectangle
        Rectangle() {
            width = 1;
            height = 1;
        }

        // 2. Single param: creates a square (width == height)
        Rectangle(int side) {
            width = side;
            height = side;
        }

        // 3. Two params: custom rectangle
        Rectangle(int w, int h) {
            width = w;
            height = h;
        }

        int getArea() {
            return width * height;
        }
    }

    public static void main(String[] args) {
        Rectangle r1 = new Rectangle();
        Rectangle r2 = new Rectangle(5);
        Rectangle r3 = new Rectangle(4, 8);

        System.out.println("Default Area: " + r1.getArea());
        System.out.println("Square Area: " + r2.getArea());
        System.out.println("Custom Area: " + r3.getArea());
    }
}`,
              output: `Default Area: 1
Square Area: 25
Custom Area: 32`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "Constructor overloading permits creating objects with different subsets of arguments. The compiler automatically binds to the matching constructor signature."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "التحميل الزائد للمشيدات يوفر مرونة كبيرة لإنشاء كائنات بطرق متعددة، ويقوم المصرف باختيار المشيد المناسب تلقائياً بحسب المعاملات الممررة."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Constructor Chaining via this() (المثال 4: تسلسل المشيدات باستخدام this)"
            },
            {
              type: "paragraph",
              text: "Calling one constructor from another within the same class to avoid duplicate initialization logic."
            },
            {
              type: "code",
              language: "java",
              filename: "ConstructorChaining.java",
              code: `public class ConstructorChaining {
    static class ServerNode {
        String host;
        int port;
        boolean sslEnabled;

        // Master constructor
        ServerNode(String host, int port, boolean ssl) {
            this.host = host;
            this.port = port;
            this.sslEnabled = ssl;
            System.out.println("Configured node: " + host + ":" + port + " [SSL=" + ssl + "]");
        }

        // Overloaded constructor with default SSL
        ServerNode(String host, int port) {
            this(host, port, true); // Must be the FIRST line!
        }

        // Overloaded constructor with default port and SSL
        ServerNode(String host) {
            this(host, 443); // Chains to the two-argument constructor
        }
    }

    public static void main(String[] args) {
        ServerNode node1 = new ServerNode("api.service.internal");
        ServerNode node2 = new ServerNode("db.service.internal", 5432, false);
    }
}`,
              output: `Configured node: api.service.internal:443 [SSL=true]
Configured node: db.service.internal:5432 [SSL=false]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "The syntax 'this(...)' forwards calls between constructors. Rule: 'this(...)' MUST be the very first statement inside the calling constructor body."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "استدعاء 'this(...)' يقوم بتمرير العمل إلى مشيد آخر داخل نفس الفئة لمنع تكرار الكود. القاعدة الصارمة: يجب أن يكون 'this(...)' أول سطر داخل المشيد."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Copy Constructor (المثال 5: مشيد النسخ)"
            },
            {
              type: "paragraph",
              text: "Creating a new, independent clone of an existing object with identical attribute values."
            },
            {
              type: "code",
              language: "java",
              filename: "CopyConstructorDemo.java",
              code: `public class CopyConstructorDemo {
    static class Vector2D {
        double x;
        double y;

        Vector2D(double x, double y) {
            this.x = x;
            this.y = y;
        }

        // Copy Constructor: initializes new instance from an existing one
        Vector2D(Vector2D original) {
            if (original != null) {
                this.x = original.x;
                this.y = original.y;
            }
        }
    }

    public static void main(String[] args) {
        Vector2D v1 = new Vector2D(14.5, 92.0);
        Vector2D v2 = new Vector2D(v1); // Cloned copy

        v2.x = 999.0; // Mutate v2

        System.out.println("v1: (" + v1.x + ", " + v1.y + ")");
        System.out.println("v2: (" + v2.x + ", " + v2.y + ")");
        System.out.println("Distinct heap objects? " + (v1 != v2));
    }
}`,
              output: `v1: (14.5, 92.0)
v2: (999.0, 92.0)
Distinct heap objects? true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "Unlike reference assignment (v2 = v1) which points to the same object, a Copy Constructor produces a brand-new independent heap object with identical starting values."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "مشيد النسخ (Copy Constructor) ينشئ كائناً جديداً كلياً ومستقلاً في الذاكرة يحمل نفس قيم الكائن الأصلي، وتعديل أي منهما لا يؤثر على الآخر."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Input Validation in Constructor (المثال 6: التحقق من صحة البيانات في المشيد)"
            },
            {
              type: "paragraph",
              text: "Preventing creation of invalid objects by throwing exceptions or sanitizing inputs."
            },
            {
              type: "code",
              language: "java",
              filename: "GuardedConstructor.java",
              code: `public class GuardedConstructor {
    static class BankCustomer {
        String name;
        int age;

        BankCustomer(String name, int age) {
            if (name == null || name.trim().isEmpty()) {
                throw new IllegalArgumentException("Customer name cannot be empty.");
            }
            if (age < 18) {
                throw new IllegalArgumentException("Customer must be at least 18 years old. Received: " + age);
            }
            this.name = name.trim();
            this.age = age;
        }
    }

    public static void main(String[] args) {
        try {
            BankCustomer validCustomer = new BankCustomer("Rashid", 28);
            System.out.println("Customer registered: " + validCustomer.name);

            // Attempting invalid registration
            BankCustomer invalidCustomer = new BankCustomer("Huda", 15);
        } catch (IllegalArgumentException e) {
            System.out.println("Registration Rejected: " + e.getMessage());
        }
    }
}`,
              output: `Customer registered: Rashid
Registration Rejected: Customer must be at least 18 years old. Received: 15`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "Constructors should act as safety gatekeepers. Throwing exceptions when invariants are violated prevents invalid or corrupted objects from ever entering the system."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "المشيد هو خط الدفاع الأول لمنع إنشاء كائنات تحتوي على بيانات غير صالحة، وذلك عن طريق رمي استثناء (Exception) في حال مخالفة الشروط المنطقية."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Initializing Final Attributes (المثال 7: تهيئة الخصائص الثابتة عبر المشيد)"
            },
            {
              type: "paragraph",
              text: "Assigning values to blank final fields during constructor execution."
            },
            {
              type: "code",
              language: "java",
              filename: "FinalInitConstructor.java",
              code: `public class FinalInitConstructor {
    static class DeviceSerial {
        final String serialNumber;
        final long manufactureTimestamp;

        DeviceSerial(String serial) {
            this.serialNumber = serial;
            this.manufactureTimestamp = System.currentTimeMillis();
        }
    }

    public static void main(String[] args) {
        DeviceSerial dev = new DeviceSerial("SN-2026-X99");
        System.out.println("Serial: " + dev.serialNumber);
        System.out.println("Manufactured at: " + dev.manufactureTimestamp);
    }
}`,
              output: `Serial: SN-2026-X99
Manufactured at: 1714529381045`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "Blank final fields must be definitively assigned exactly once across all constructor paths before the constructor completes."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "الحقول الثابتة غير المهيأة (Blank final) يجب إسناد قيمتها لمرة واحدة وبصورة مؤكدة داخل المشيد قبل انتهاء تنفيذه."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Calling Methods from a Constructor (المثال 8: استدعاء الدوال من داخل المشيد)"
            },
            {
              type: "paragraph",
              text: "Triggering setup and configuration methods during object bootstrap."
            },
            {
              type: "code",
              language: "java",
              filename: "ConstructorMethodCall.java",
              code: `public class ConstructorMethodCall {
    static class DatabaseConnectionPool {
        String dbUrl;
        int poolSize;

        DatabaseConnectionPool(String url, int size) {
            this.dbUrl = url;
            this.poolSize = size;
            initPool(); // Calling internal helper to establish connections
        }

        private void initPool() {
            System.out.println("Allocating " + poolSize + " socket connections to " + dbUrl);
            System.out.println("Connection pool ready.");
        }
    }

    public static void main(String[] args) {
        DatabaseConnectionPool pool = new DatabaseConnectionPool("jdbc:postgresql://db.corp:5432/main", 10);
    }
}`,
              output: `Allocating 10 socket connections to jdbc:postgresql://db.corp:5432/main
Connection pool ready.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "Calling private helper methods inside a constructor helps organize complex initialization routines cleanly."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "استدعاء دوال مساعدة خاصة داخل المشيد يساعد في تنظيم عمليات التهيئة المعقدة وتجهيز اتصالات النظام بسلاسة."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Private Constructor (Singleton Pattern) (المثال 9: المشيد الخاص ونمط الكائن المفرد Singleton)"
            },
            {
              type: "paragraph",
              text: "Preventing direct instantiation from external classes to enforce a single global instance."
            },
            {
              type: "code",
              language: "java",
              filename: "SingletonDemo.java",
              code: `public class SingletonDemo {
    static class AppConfiguration {
        // Single instance held statically
        private static final AppConfiguration INSTANCE = new AppConfiguration();
        String environment = "PRODUCTION";

        // Private constructor prevents external 'new AppConfiguration()'
        private AppConfiguration() {
            System.out.println("AppConfiguration initialized once.");
        }

        public static AppConfiguration getInstance() {
            return INSTANCE;
        }
    }

    public static void main(String[] args) {
        // AppConfiguration cfg = new AppConfiguration(); // COMPILATION ERROR!

        AppConfiguration cfg1 = AppConfiguration.getInstance();
        AppConfiguration cfg2 = AppConfiguration.getInstance();

        System.out.println("Same instance? " + (cfg1 == cfg2));
        System.out.println("Active Environment: " + cfg1.environment);
    }
}`,
              output: `AppConfiguration initialized once.
Same instance? true
Active Environment: PRODUCTION`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "A private constructor blocks outside classes from creating instances with 'new'. In the Singleton pattern, exactly one instance is exposed via a public static getter."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "المشيد الخاص (private) يمنع أي صنف خارجي من إنشاء كائنات بواسطة 'new'. هذا هو أساس نمط Singleton لضمان وجود نسخة واحدة فقط من الإعدادات في كامل البرنامج."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Multi-Level Constructor Tiering (المثال 10: تدرج المشيدات المتعددة)"
            },
            {
              type: "paragraph",
              text: "Tiered constructors cascading progressive defaults."
            },
            {
              type: "code",
              language: "java",
              filename: "TieredConstructorDemo.java",
              code: `public class TieredConstructorDemo {
    static class WebSession {
        final String sessionId;
        final String userId;
        final int timeoutMinutes;

        WebSession(String sessionId, String userId, int timeout) {
            this.sessionId = sessionId;
            this.userId = userId;
            this.timeoutMinutes = timeout;
        }

        WebSession(String sessionId, String userId) {
            this(sessionId, userId, 30); // 30 minutes default
        }

        WebSession(String sessionId) {
            this(sessionId, "ANONYMOUS_GUEST");
        }

        void printSession() {
            System.out.println("Session [" + sessionId + "] User: " + userId + " | Timeout: " + timeoutMinutes + "m");
        }
    }

    public static void main(String[] args) {
        WebSession s1 = new WebSession("sess_001");
        WebSession s2 = new WebSession("sess_002", "mona_tech");
        WebSession s3 = new WebSession("sess_003", "tariq_ops", 120);

        s1.printSession();
        s2.printSession();
        s3.printSession();
    }
}`,
              output: `Session [sess_001] User: ANONYMOUS_GUEST | Timeout: 30m
Session [sess_002] User: mona_tech | Timeout: 30m
Session [sess_003] User: tariq_ops | Timeout: 120m`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "Chaining constructors together creates clear fallback cascades, simplifying the code by keeping all actual assignments in one master constructor."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "التسلسل التدريجي للمشيدات يضع كل الإسنادات في مشيد رئيسي واحد، بينما توفر باقي المشيدات قيماً افتراضية ذكية ومريحة للمطور."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Immutable Value Object with Complete Constructor (المثال 11: كائن قيمة ثابت بالكامل)"
            },
            {
              type: "paragraph",
              text: "Advanced: Crafting a completely immutable money entity initialized entirely via constructor."
            },
            {
              type: "code",
              language: "java",
              filename: "ImmutableMoneyDemo.java",
              code: `public class ImmutableMoneyDemo {
    static final class Money {
        private final double amount;
        private final String currency;

        Money(double amount, String currency) {
            if (amount < 0) throw new IllegalArgumentException("Amount cannot be negative");
            if (currency == null || currency.length() != 3) throw new IllegalArgumentException("Invalid currency code");
            this.amount = amount;
            this.currency = currency.toUpperCase();
        }

        double getAmount() { return amount; }
        String getCurrency() { return currency; }

        Money add(Money other) {
            if (!this.currency.equals(other.currency)) {
                throw new IllegalArgumentException("Cannot add different currencies: " + currency + " vs " + other.currency);
            }
            return new Money(this.amount + other.amount, this.currency); // Returns a NEW immutable object
        }
    }

    public static void main(String[] args) {
        Money wallet = new Money(150.0, "USD");
        Money deposit = new Money(75.50, "USD");
        Money updatedWallet = wallet.add(deposit);

        System.out.println("Original: " + wallet.getAmount() + " " + wallet.getCurrency());
        System.out.println("Updated: " + updatedWallet.getAmount() + " " + updatedWallet.getCurrency());
    }
}`,
              output: `Original: 150.0 USD
Updated: 225.5 USD`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "An immutable object has its state locked in the constructor. Operations like 'add' do not mutate the existing instance; they instantiate and return a brand-new Money object."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "الكائن غير القابل للتعديل (Immutable) يتم تجميد حالته بالكامل في المشيد. أي عملية مثل الجمع لا تغير الكائن الحالي بل تُرجع كائناً جديداً تماماً بالنتيجة."
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
                "Mistake 1: Adding a return type like 'void Car()'. This turns the constructor into a regular method; Java will no longer treat it as a constructor!",
                "خطأ 1: إضافة نوع إرجاع مثل 'void Car()'. هذا يحولها فوراً لدالة عادية ولن يعتبرها مصرف جافا مشيداً!",
                "Mistake 2: Calling 'this()' anywhere other than the first line of the constructor body. The compiler strictly forbids this.",
                "خطأ 2: استدعاء 'this()' في سطر غير السطر الأول داخل المشيد، وهو ما يمنعه المصرف بشكل صارم.",
                "Mistake 3: Forgetting that creating a parameterized constructor removes the default no-arg constructor. If you still need 'new MyClass()', you must explicitly write the no-arg constructor.",
                "خطأ 3: نسيان أن إنشاء أي مشيد ذي معاملات يحذف المشيد الافتراضي التلقائي. إذا كنت بحاجة لإنشاء كائن بدون معاملات فعليك كتابته بنفسك صراحة."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Bank Account Constructor Suite (التحدي العملي: باقة مشيدات الحساب البنكي)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Create a class BankAccount with: 1) accountNumber (final String); 2) accountHolder (String); 3) balance (double); 4) currency (String). Provide 3 overloaded constructors chained using this(): Constructor 1 takes (accountNumber, holder, balance, currency); Constructor 2 takes (accountNumber, holder) and defaults balance to 0.0 and currency to 'USD'; Constructor 3 takes (accountNumber) and defaults holder to 'Unknown', balance to 0.0, and currency to 'USD'. Test all 3 constructors in main()."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: قم بإنشاء فئة BankAccount تحتوي على رقم الحساب (ثابت)، واسم صاحب الحساب، والرصيد، والعملة. وفر 3 مشيدات محملة ومترابطة عبر this(): الأول يستقبل كافة البيانات، والثاني يستقبل رقم الحساب واسم المالك مع قيم افتراضية للرصيد والعملة، والثالث يستقبل رقم الحساب فقط. اختبر إنشاء الحسابات في الدالة main."
            },
            {
              type: "code",
              language: "java",
              filename: "BankAccountConstructors.java",
              code: `public class BankAccountConstructors {
    static class BankAccount {
        final String accountNumber;
        String accountHolder;
        double balance;
        String currency;

        // Master Constructor
        BankAccount(String accNum, String holder, double bal, String curr) {
            this.accountNumber = accNum;
            this.accountHolder = holder;
            this.balance = Math.max(0.0, bal);
            this.currency = curr;
        }

        // Tier 2 Constructor
        BankAccount(String accNum, String holder) {
            this(accNum, holder, 0.0, "USD");
        }

        // Tier 3 Constructor
        BankAccount(String accNum) {
            this(accNum, "Unknown", 0.0, "USD");
        }

        void display() {
            System.out.println("Account #" + accountNumber + " [" + currency + "] Owner: " + accountHolder + " | Balance: $" + balance);
        }
    }

    public static void main(String[] args) {
        BankAccount acc1 = new BankAccount("ACC-1001", "Dr. Salem", 5400.0, "EUR");
        BankAccount acc2 = new BankAccount("ACC-1002", "Salma Nasser");
        BankAccount acc3 = new BankAccount("ACC-1003");

        acc1.display();
        acc2.display();
        acc3.display();
    }
}`,
              output: `Account #ACC-1001 [EUR] Owner: Dr. Salem | Balance: $5400.0
Account #ACC-1002 [USD] Owner: Salma Nasser | Balance: $0.0
Account #ACC-1003 [USD] Owner: Unknown | Balance: $0.0`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "The tiered constructors delegate to the master constructor using this(...), ensuring consistent state initialization and single-point validation."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "تفوض المشيدات المترابطة العمل للمشيد الرئيسي عبر this(...)، مما يضمن توحيد معايير تهيئة البيانات والتحقق منها في مكان واحد."
            }
          ],
          quiz: [
            {
              id: "q1",
              question: "Examine this class definition:\nclass AccountHolder {\n    void AccountHolder() {\n        System.out.println(\"Account created!\");\n    }\n}\n// In main:\nAccountHolder a = new AccountHolder();\nWhat is printed to the console?",
              options: [
                "Account created!",
                "Nothing is printed; declaring 'void' turns AccountHolder() into a regular method instead of a constructor.",
                "Compile-time error: constructors cannot have curly braces.",
                "Throws a NoSuchMethodError at runtime."
              ],
              correctIndex: 1,
              explanation: "Correct! In Java, constructors NEVER declare a return type (not even 'void'). Adding 'void' turns it into a regular instance method that just happens to share the class name. The compiler supplies an automatic default constructor which prints nothing. (إضافة void للمشيد تحوله لدالة عادية لا تُستدعى تلقائياً عند إنشاء الكائن بـ new)."
            },
            {
              id: "q2",
              question: "Consider this class:\nclass Book {\n    String title;\n    Book(String title) {\n        this.title = title;\n    }\n}\n// In main:\nBook b = new Book();\nWhat happens when compiling and executing this code?",
              options: [
                "Compiles cleanly; title defaults to null.",
                "Compile-time error: constructor Book() is undefined.",
                "Throws a NoSuchMethodException at runtime.",
                "The compiler injects an empty title string \"\" automatically."
              ],
              correctIndex: 1,
              explanation: "Correct! The compiler provides an automatic default no-argument constructor ONLY when NO constructors are explicitly defined. Because a parameterized constructor 'Book(String)' was declared, the no-arg constructor ceases to exist unless explicitly written. (عند تعريف أي مشيد بمعاملات، تتوقف جافا عن توليد المشيد الافتراضي التلقائي، مسببة خطأ تصريف عند استدعاء new Book())."
            },
            {
              id: "q3",
              question: "What error occurs in this constructor definition?\nclass Employee {\n    String name;\n    int salary;\n    Employee(String name) {\n        System.out.println(\"Initializing...\");\n        this(name, 50000);\n    }\n    Employee(String name, int salary) {\n        this.name = name;\n        this.salary = salary;\n    }\n}",
              options: [
                "Salary cannot be initialized to an integer.",
                "Compile-time error: call to this() must be the first statement in constructor.",
                "Throws an IllegalStateException at runtime.",
                "Infinite loop during compilation."
              ],
              correctIndex: 1,
              explanation: "Correct! Java strictly enforces that explicit constructor invocation using 'this(...)' or 'super(...)' MUST be the absolute first statement in the constructor body. Placing 'System.out.println' before 'this(...)' triggers a compile-time error. (استدعاء المشيد الآخر عبر this(...) يجب أن يكون أول سطر تنفيذي في المشيد بلا أي استثناء)."
            },
            {
              id: "q4",
              question: "Predict the output of the following constructor chaining snippet:\nclass Device {\n    Device() {\n        this(\"Standard\");\n        System.out.print(\"1 \");\n    }\n    Device(String model) {\n        System.out.print(\"2 \");\n    }\n}\n// In main:\nnew Device();",
              options: [
                "1 2 ",
                "2 1 ",
                "1 ",
                "2 "
              ],
              correctIndex: 1,
              explanation: "Correct! 'new Device()' invokes the no-arg constructor, which immediately delegates to 'this(\"Standard\")'. 'Device(String)' prints '2 ' and completes. Execution then returns to 'Device()', which prints '1 '. Output is '2 1 '. (المشيد الافتراضي يفوض المشيد الآخر أولاً فيطبع 2، ثم يستكمل عمله ويطبع 1)."
            },
            {
              id: "q5",
              question: "What occurs when attempting to compile this class?\nclass LinkedNode {\n    LinkedNode() {\n        this(10);\n    }\n    LinkedNode(int val) {\n        this();\n    }\n}",
              options: [
                "It compiles and creates a circular memory ring.",
                "Compile-time error: recursive constructor invocation.",
                "StackOverflowError occurs at runtime when new LinkedNode() is called.",
                "The compiler replaces both with a no-op constructor."
              ],
              correctIndex: 1,
              explanation: "Correct! Circular constructor chaining (Constructor A calling Constructor B which calls Constructor A) creates an infinite loop detected at compile time as 'recursive constructor invocation'. (المصرف يكتشف الحلقات الدائرية المغلقة بين المشيدات ويوقف الترجمة بخطأ recursive constructor invocation)."
            },
            {
              id: "q6",
              question: "Examine this class with a blank final field:\nclass UserLicense {\n    final String licenseKey;\n    UserLicense(String key) {\n        this.licenseKey = key;\n    }\n}\nCan licenseKey be reassigned after the constructor finishes?",
              options: [
                "Yes, by invoking a public setter method.",
                "Yes, by assigning licenseKey directly in main.",
                "No; once assigned in the constructor, a final field is permanently immutable.",
                "Only if marked volatile."
              ],
              correctIndex: 2,
              explanation: "Correct! Blank final fields initialized within a constructor become permanently read-only once construction completes. Any attempt to reassign them causes a compile-time error. (المتغيرات الثابتة final التي تتم تهيئتها في المشيد تصبح غير قابلة للتغيير نهائياً طوال عمر الكائن)."
            },
            {
              id: "q7",
              question: "What happens when compiling this overloaded constructor set?\nclass StudentBadge {\n    final int badgeNumber;\n    StudentBadge() {\n    }\n    StudentBadge(int badgeNumber) {\n        this.badgeNumber = badgeNumber;\n    }\n}",
              options: [
                "badgeNumber in the no-arg constructor defaults safely to 0.",
                "Compile-time error in StudentBadge(): variable badgeNumber might not have been initialized.",
                "badgeNumber becomes public static.",
                "Compiles without warnings."
              ],
              correctIndex: 1,
              explanation: "Correct! Every constructor in a class MUST either initialize all blank final fields or delegate to another constructor via 'this(...)'. Because the no-arg constructor leaves 'badgeNumber' unassigned, compilation fails. (يجب على كل مشيد تهيئة كافة الحقول الثابتة final أو تفويض مشيد آخر وإلا حدث خطأ تصريف)."
            },
            {
              id: "q8",
              question: "What is a 'Copy Constructor' in Java and how is it properly structured?\nExample:\nclass Point {\n    int x, y;\n    Point(int x, int y) { this.x = x; this.y = y; }\n    Point(Point other) { this(other.x, other.y); }\n}",
              options: [
                "A constructor that deletes the old object after copying.",
                "A constructor that accepts an existing instance of the same class and duplicates its state into a brand-new independent heap object.",
                "A constructor provided automatically by the Java Collections Framework.",
                "A static method that clones class bytecode."
              ],
              correctIndex: 1,
              explanation: "Correct! A Copy Constructor takes an object of the same class as a parameter and initializes the new instance with identical field values, creating an independent duplicate on the heap. (مشيد النسخ يستقبل كائناً من نفس الفئة وينشئ كائناً جديداً مستقلاً بالذاكرة يحمل نفس القيم)."
            },
            {
              id: "q9",
              question: "Why would an engineer declare the constructor of a utility class as 'private MathUtils() { }'?",
              options: [
                "To prevent the class from compiling.",
                "To strictly prevent external code from creating object instances of a class that only contains static methods and constants.",
                "To force callers to access it via reflection only.",
                "To make all methods inside execute asynchronously."
              ],
              correctIndex: 1,
              explanation: "Correct! Classes like java.lang.Math contain only static members. Marking the constructor private prevents unnecessary instantiation via 'new MathUtils()', signaling pure static utility usage. (المشيد الخاص يمنع إنشاء كائنات من فئات الأدوات المساعدة التي تحتوي فقط على دوال وثوابت ساكنة)."
            },
            {
              id: "q10",
              question: "What is the primary benefit of embedding validation rules directly inside a constructor?\nclass BankAccount {\n    double balance;\n    BankAccount(double initialDeposit) {\n        if (initialDeposit < 0) throw new IllegalArgumentException(\"Negative deposit\");\n        this.balance = initialDeposit;\n    }\n}",
              options: [
                "It reduces memory consumption on the heap.",
                "It guarantees that an object can NEVER exist in an invalid or corrupted state from the moment of its creation.",
                "It automatically converts negative balances into positive credits.",
                "It speeds up bytecode class loading."
              ],
              correctIndex: 1,
              explanation: "Correct! Validating inputs in constructors ensures class invariants are satisfied before the object reference is returned, completely preventing the instantiation of corrupt or illegal domain objects. (التحقق داخل المشيد يضمن استحالة ولادة كائن في حالة غير صالحة أو فاسدة برمجياً)."
            },
            {
              id: "q11",
              question: "Predict the output of the following initialization sequence:\nclass InitializationOrder {\n    int value = 10;\n    InitializationOrder() {\n        System.out.print(value + \" \");\n        value = 25;\n    }\n}\n// In main:\nInitializationOrder obj = new InitializationOrder();\nSystem.out.println(obj.value);",
              options: [
                "0 25",
                "10 25",
                "25 25",
                "10 10"
              ],
              correctIndex: 1,
              explanation: "Correct! Field initializers ('value = 10') execute BEFORE the constructor body runs. Inside the constructor, 'value' is already 10, which prints '10 '. Then 'value = 25' updates the field, and main prints '25'. (قيم الحقول الافتراضية تُنفذ قبل بدء جسم المشيد، فيطبع المشيد 10 ثم يعدلها إلى 25 لتطبعها main)."
            },
            {
              id: "q12",
              question: "Which access modifiers are permitted on Java constructors?",
              options: [
                "Only public is allowed.",
                "public, protected, package-private (no modifier), and private.",
                "Only public and private; protected is forbidden.",
                "Constructors cannot have access modifiers."
              ],
              correctIndex: 1,
              explanation: "Correct! Java constructors support all four visibility levels: public (instantiable everywhere), protected (package and subclasses), package-private (same package), and private (internal/factory instantiation only). (المشيدات تدعم كافة مستويات الوصول الأربعة للتحكم الدقيق في صلاحيات إنشاء الكائنات)."
            },
            {
              id: "q13",
              question: "What are the two mandatory syntactical requirements for declaring a constructor in Java?",
              options: [
                "It must be marked static and have a return type.",
                "It must have the exact same name as the enclosing class and must NOT declare any return type (not even void).",
                "It must accept at least one argument and return this.",
                "It must be declared inside an interface."
              ],
              correctIndex: 1,
              explanation: "Correct! A constructor must exactly match the enclosing class name (case-sensitive) and must not have any return type whatsoever. (يجب أن يتطابق اسم المشيد حرفياً مع اسم الصنف دون أي نوع إرجاع حتى void)."
            },
            {
              id: "q14",
              question: "Examine this copy constructor invocation:\nclass Vector {\n    int x, y;\n    Vector(Vector other) {\n        this.x = other.x;\n        this.y = other.y;\n    }\n}\n// In main:\nVector v = new Vector(null);\nWhat occurs at runtime?",
              options: [
                "A Vector with x=0, y=0 is created.",
                "A java.lang.NullPointerException is thrown when attempting to evaluate 'other.x'.",
                "The JVM returns a null reference.",
                "Compile-time error: null cannot be passed to a constructor."
              ],
              correctIndex: 1,
              explanation: "Correct! Passing null is syntactically valid, but dereferencing 'other.x' causes a fatal NullPointerException at runtime. Copy constructors should defensively validate 'if (other == null) throw new IllegalArgumentException();'. (تمرير null يسبب استثناء NullPointerException عند محاولة قراءة other.x، لذا يجب الفحص الدفاعي)."
            },
            {
              id: "q15",
              question: "In the classic Singleton design pattern, what combination of constructor and method design guarantees a single instance?",
              options: [
                "A public constructor and a static array.",
                "A private constructor to prevent direct instantiation with new, coupled with a public static getInstance() method returning a cached static instance.",
                "A protected constructor and multiple threads.",
                "An abstract constructor with synchronized getters."
              ],
              correctIndex: 1,
              explanation: "Correct! The Singleton pattern uses a private constructor so external classes cannot call 'new', and exposes a public static 'getInstance()' method to return a single lazily or eagerly created instance. (نمط Singleton يعتمد على مشيد خاص لمنع new مع توفير دالة static عامة تعيد النسخة الوحيدة)."
            }
          ]
        }
      ]
    },

    /* ==========================================================================
       TOPIC 6: Java this Keyword
       ========================================================================== */
    {
      id: "java-this-keyword",
      title: "6. Java this Keyword",
      description: "Deep dive into the 'this' keyword: Disambiguating shadowed variables, invoking constructors, method chaining, passing 'this' as arguments, and static limitations.",
      lessons: [
        {
          id: "this-keyword-mastery",
          title: "Complete Mastery of the 'this' Keyword",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "The Role and Meaning of 'this' (دور وأهمية الكلمة المفتاحية this)"
            },
            {
              type: "paragraph",
              text: "Within an instance method or constructor, 'this' is a reference to the current object—the object whose method or constructor is being called. It serves six vital purposes in Java development: 1) Disambiguating shadowed instance variables; 2) Invoking alternate constructors via this(); 3) Passing the current object as an argument; 4) Returning the current object for method chaining; 5) Invoking current class methods; 6) Referencing outer class instances in nested classes."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "الكلمة المفتاحية 'this' هي متغير مرجعي ضمني يشير إلى الكائن الحالي نفسه (الكائن الذي يستدعي الدالة في تلك اللحظة). تؤدي 'this' ست وظائف جوهرية في جافا: 1) فك الالتباس بين خصائص الكائن والمعاملات المحلية متطابقة الأسماء؛ 2) استدعاء مشيدات أخرى داخل نفس الفئة عبر this()؛ 3) تمرير الكائن الحالي كوسيط لدوال أخرى؛ 4) إرجاع الكائن لتمكين التسلسل البرمجي (Method Chaining)؛ 5) استدعاء دوال الفئة الحالية؛ 6) الوصول لكائنات الفئات الخارجية."
            },
            {
              type: "paragraph",
              text: "Critical limitation: The 'this' keyword is bound strictly to instance context. Attempting to use 'this' inside a 'static' method or static block triggers a compile-time error: 'non-static variable this cannot be referenced from a static context'."
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
              text: "Example 1: Disambiguating Shadowed Fields (المثال 1: فك تشابه أسماء الحقول والمعاملات)"
            },
            {
              type: "paragraph",
              text: "The most common usage of 'this': differentiating between instance attributes and method parameters."
            },
            {
              type: "code",
              language: "java",
              filename: "ShadowingResolved.java",
              code: `public class ShadowingResolved {
    static class Point {
        int x;
        int y;

        // Parameters x and y shadow instance fields x and y
        Point(int x, int y) {
            this.x = x; // this.x = field, x = parameter
            this.y = y; // this.y = field, y = parameter
        }
    }

    public static void main(String[] args) {
        Point p = new Point(45, 90);
        System.out.println("Coordinates: (" + p.x + ", " + p.y + ")");
    }
}`,
              output: `Coordinates: (45, 90)`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "Without 'this', writing 'x = x' merely assigns parameter x to itself. Using 'this.x' explicitly directs the compiler to store the parameter value into the instance field of the calling object."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "بدون استخدام 'this'، فإن 'x = x' تعيد إسناد المعامل لنفسه دون تغيير الكائن. كلمة 'this.x' توضح للمصرف بدقة أننا نريد تخزين القيمة في حقل الكائن."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Explicit Method Invocation via this (المثال 2: استدعاء دوال الصنف الحالي صراحة)"
            },
            {
              type: "paragraph",
              text: "Calling another instance method of the current class using 'this.methodName()'."
            },
            {
              type: "code",
              language: "java",
              filename: "ThisMethodCall.java",
              code: `public class ThisMethodCall {
    static class OrderProcessor {
        void logStep(String step) {
            System.out.println("[AUDIT] " + step);
        }

        void processOrder(String orderId) {
            this.logStep("Validating " + orderId);
            this.logStep("Charging payment for " + orderId);
            this.logStep("Dispatching confirmation email for " + orderId);
        }
    }

    public static void main(String[] args) {
        OrderProcessor op = new OrderProcessor();
        op.processOrder("ORD-7719");
    }
}`,
              output: `[AUDIT] Validating ORD-7719
[AUDIT] Charging payment for ORD-7719
[AUDIT] Dispatching confirmation email for ORD-7719`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "While calling 'logStep()' without 'this.' works implicitly, using 'this.logStep()' explicitly signals to readers that the method belongs to the current instance."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "رغم أن استدعاء الدالة يتم ضمنياً بدون this، إلا أن كتابة 'this.logStep()' تجعل الشيفرة البرمجية واضحة ومقروءة بتأكيد أن الدالة تابعة لنفس الكائن الحالي."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Constructor Redirection via this() (المثال 3: إعادة توجيه المشيدات عبر this())"
            },
            {
              type: "paragraph",
              text: "Reusing constructor logic to enforce DRY (Don't Repeat Yourself) principles."
            },
            {
              type: "code",
              language: "java",
              filename: "ThisConstructorChaining.java",
              code: `public class ThisConstructorChaining {
    static class CloudInstance {
        String region;
        int cpuCores;
        int ramGigabytes;

        CloudInstance(String region, int cpu, int ram) {
            this.region = region;
            this.cpuCores = cpu;
            this.ramGigabytes = ram;
        }

        CloudInstance(String region) {
            this(region, 2, 4); // Default 2 Cores, 4GB RAM
        }

        void printSpecs() {
            System.out.println("Region: " + region + " | CPU: " + cpuCores + " vCPUs | RAM: " + ramGigabytes + " GB");
        }
    }

    public static void main(String[] args) {
        CloudInstance micro = new CloudInstance("eu-central-1");
        CloudInstance heavy = new CloudInstance("us-east-1", 16, 64);

        micro.printSpecs();
        heavy.printSpecs();
    }
}`,
              output: `Region: eu-central-1 | CPU: 2 vCPUs | RAM: 4 GB
Region: us-east-1 | CPU: 16 vCPUs | RAM: 64 GB`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "The one-parameter constructor calls 'this(region, 2, 4)' to delegate all field assignments directly to the 3-parameter constructor."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "يقوم المشيد الصغير باستدعاء المشيد الكامل عبر 'this(region, 2, 4)' لتفويض عملية الإسناد ومنع تكرار الكود."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Passing 'this' as an Argument (المثال 4: تمرير this كمعامل لدالة أخرى)"
            },
            {
              type: "paragraph",
              text: "Allowing an object to pass its own reference to an external helper or service."
            },
            {
              type: "code",
              language: "java",
              filename: "PassThisDemo.java",
              code: `public class PassThisDemo {
    static class Document {
        String title;
        String author;

        Document(String title, String author) {
            this.title = title;
            this.author = author;
        }

        void printWith(Printer printer) {
            printer.print(this); // Passing the current Document instance
        }
    }

    static class Printer {
        void print(Document doc) {
            System.out.println("--- PRINTING JOB ---");
            System.out.println("Title: " + doc.title + " | Author: " + doc.author);
        }
    }

    public static void main(String[] args) {
        Document myDoc = new Document("Java Design Patterns", "Erich Gamma");
        Printer laserPrinter = new Printer();

        myDoc.printWith(laserPrinter);
    }
}`,
              output: `--- PRINTING JOB ---
Title: Java Design Patterns | Author: Erich Gamma`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "By calling 'printer.print(this)', the Document instance passes itself to the Printer object, facilitating collaboration between separate classes."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "عبر كتابة 'printer.print(this)' يمرر كائن المستند نفسه كمعامل لكائن الطابعة، مما يتيح التنسيق والتفاعل بين فئات مختلفة."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Passing 'this' into Another Constructor (المثال 5: تمرير this لمشيد فئة أخرى)"
            },
            {
              type: "paragraph",
              text: "Establishing bidirectional relationships between parent and child components."
            },
            {
              type: "code",
              language: "java",
              filename: "BidirectionalThis.java",
              code: `public class BidirectionalThis {
    static class House {
        String address;
        Door mainDoor;

        House(String address) {
            this.address = address;
            this.mainDoor = new Door(this); // Passing parent House into child Door!
        }
    }

    static class Door {
        House belongingHouse;

        Door(House house) {
            this.belongingHouse = house;
        }

        void knock() {
            System.out.println("Knocking on door of: " + belongingHouse.address);
        }
    }

    public static void main(String[] args) {
        House home = new House("742 Evergreen Terrace");
        home.mainDoor.knock();
    }
}`,
              output: `Knocking on door of: 742 Evergreen Terrace`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "Passing 'this' to child constructors enables the child object to hold a back-reference to its parent, creating a two-way association."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "تمرير 'this' لمشيد الكائن الفرعي يسمح للابن بالاحتفاظ بمرجع للكائن الأب، مما ينشئ ارتباطاً تبادلياً بينهما."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Method Chaining via 'return this' (المثال 6: تسلسل الدوال بإرجاع this)"
            },
            {
              type: "paragraph",
              text: "Creating fluent builder APIs where methods return the current instance."
            },
            {
              type: "code",
              language: "java",
              filename: "FluentEmailBuilder.java",
              code: `public class FluentEmailBuilder {
    static class Email {
        private String recipient;
        private String subject;
        private String body;

        Email setRecipient(String recipient) {
            this.recipient = recipient;
            return this; // Return current object for chaining
        }

        Email setSubject(String subject) {
            this.subject = subject;
            return this;
        }

        Email setBody(String body) {
            this.body = body;
            return this;
        }

        void send() {
            System.out.println("Sending email to [" + recipient + "] with Subject: '" + subject + "'");
            System.out.println("Content: " + body);
        }
    }

    public static void main(String[] args) {
        new Email()
            .setRecipient("developer@oracle.com")
            .setSubject("Java 21 Virtual Threads")
            .setBody("Please review the attached benchmarks.")
            .send();
    }
}`,
              output: `Sending email to [developer@oracle.com] with Subject: 'Java 21 Virtual Threads'
Content: Please review the attached benchmarks.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "Returning 'this' allows chainable invocations, leading to concise and readable code without redundant intermediate variables."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "إرجاع 'return this' يتيح استدعاء الدوال المتتالية بسلاسة، وهو أسلوب يسمى Fluent Interface ويجعل الكود نظيفاً وسهل القراءة."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Identity Checking with 'this == other' (المثال 7: التحقق من التطابق المرجعي)"
            },
            {
              type: "paragraph",
              text: "Using 'this' to verify whether another reference is the exact same instance in memory."
            },
            {
              type: "code",
              language: "java",
              filename: "ThisIdentityCheck.java",
              code: `public class ThisIdentityCheck {
    static class SessionToken {
        String tokenString;

        SessionToken(String token) {
            this.tokenString = token;
        }

        boolean isSameReference(SessionToken other) {
            if (this == other) {
                System.out.println("Optimization: Targets are the exact same memory instance!");
                return true;
            }
            return false;
        }
    }

    public static void main(String[] args) {
        SessionToken t1 = new SessionToken("ABC-991");
        SessionToken t2 = t1; // Alias
        SessionToken t3 = new SessionToken("ABC-991"); // Different instance

        System.out.println("t1 vs t2: " + t1.isSameReference(t2));
        System.out.println("t1 vs t3: " + t1.isSameReference(t3));
    }
}`,
              output: `Optimization: Targets are the exact same memory instance!
t1 vs t2: true
t1 vs t3: false`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "'this == other' compares the memory reference of the current object against the parameter, providing an instant fast-path check for equals() implementations."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "المقارنة 'this == other' تتحقق مما إذا كان الكائن الآخر هو نفس الكائن الحالي تماماً في الذاكرة لتسريع المقارنات."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Accessing Outer Class via 'OuterClass.this' (المثال 8: الوصول للفئة الخارجية)"
            },
            {
              type: "paragraph",
              text: "Qualifying 'this' to refer to an enclosing outer class instance from within an inner class."
            },
            {
              type: "code",
              language: "java",
              filename: "QualifiedThisDemo.java",
              code: `public class QualifiedThisDemo {
    class Car {
        String model = "Sedan Turbo";

        class Engine {
            void showModels() {
                // 'this' refers to Engine instance
                System.out.println("Inner Engine: " + this.getClass().getSimpleName());

                // 'Car.this' refers to enclosing Car instance!
                System.out.println("Outer Car Model: " + Car.this.model);
            }
        }
    }

    public static void main(String[] args) {
        QualifiedThisDemo demo = new QualifiedThisDemo();
        Car car = demo.new Car();
        Car.Engine engine = car.new Engine();

        engine.showModels();
    }
}`,
              output: `Inner Engine: Engine
Outer Car Model: Sedan Turbo`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "Inside a non-static inner class, plain 'this' points to the inner class instance. To reference the enclosing outer object, use 'OuterClass.this'."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "داخل الفئات الداخلية غير الساكنة، تشير 'this' للفئة الداخلية، وللوصول لكائن الفئة الخارجية الحاضنة نستخدم 'OuterClass.this'."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Defensive Callback Registration (المثال 9: تسجيل الكائن في نظام الأحداث)"
            },
            {
              type: "paragraph",
              text: "Registering the current object as an event listener using 'this'."
            },
            {
              type: "code",
              language: "java",
              filename: "CallbackRegistration.java",
              code: `public class CallbackRegistration {
    interface Listener {
        void onEvent(String msg);
    }

    static class EventDispatcher {
        Listener activeListener;
        void subscribe(Listener l) {
            this.activeListener = l;
        }
        void trigger(String msg) {
            if (activeListener != null) activeListener.onEvent(msg);
        }
    }

    static class Dashboard implements Listener {
        Dashboard(EventDispatcher dispatcher) {
            dispatcher.subscribe(this); // Registers this object as listener
        }

        @Override
        public void onEvent(String msg) {
            System.out.println("Dashboard received alert: " + msg);
        }
    }

    public static void main(String[] args) {
        EventDispatcher dispatcher = new EventDispatcher();
        Dashboard dash = new Dashboard(dispatcher);

        dispatcher.trigger("Sensor pressure high!");
    }
}`,
              output: `Dashboard received alert: Sensor pressure high!`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "In event-driven systems, an object often subscribes to an event bus or dispatcher by passing 'this' during its construction."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "في أنظمة الأحداث والواجهات، يقوم الكائن بالاشتراك في موزع الأحداث عبر تمرير 'this' أثناء بنائه ليتلقى التنبيهات لاحقاً."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Static Context Rejection (المثال 10: خطأ استخدام this في السياق الساكن)"
            },
            {
              type: "paragraph",
              text: "Demonstrating why static methods cannot use 'this' and the compile error it causes."
            },
            {
              type: "code",
              language: "java",
              filename: "StaticThisError.java",
              code: `public class StaticThisError {
    static class Example {
        int instanceVal = 10;
        static int staticVal = 20;

        static void staticMethod() {
            // System.out.println(this.instanceVal); // COMPILER ERROR: non-static variable this cannot be referenced from a static context
            System.out.println("Static method runs on class, not on 'this' instance: " + staticVal);
        }

        void instanceMethod() {
            // 100% valid because this is an instance method
            System.out.println("Instance method has access to this: " + this.instanceVal);
        }
    }

    public static void main(String[] args) {
        Example.staticMethod();
        Example obj = new Example();
        obj.instanceMethod();
    }
}`,
              output: `Static method runs on class, not on 'this' instance: 20
Instance method has access to this: 10`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "Because static methods belong to the class rather than an individual object, there is no instance associated with the call, making 'this' non-existent in static scope."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "نظراً لأن الدوال الساكنة تنتمي للفئة ككل وليس لكائن في الذاكرة، فإن كلمة 'this' لا وجود لها إطلاقاً داخل الدوال الساكنة ومحاولة استخدامها تسبب خطأ تصريف فوري."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Complex Method Chaining for UI Component Configuration (المثال 11: تهيئة مكون واجهة بالتسلسل)"
            },
            {
              type: "paragraph",
              text: "Advanced: Building a UI Button component where all styling and properties chain via 'this'."
            },
            {
              type: "code",
              language: "java",
              filename: "UIButtonBuilder.java",
              code: `public class UIButtonBuilder {
    static class Button {
        String label = "Click Me";
        String color = "Black";
        int width = 120;
        int height = 40;
        boolean isEnabled = true;

        Button setLabel(String label) { this.label = label; return this; }
        Button setColor(String color) { this.color = color; return this; }
        Button setDimensions(int w, int h) { this.width = w; this.height = h; return this; }
        Button setEnabled(boolean enabled) { this.isEnabled = enabled; return this; }

        void render() {
            System.out.println("Rendering Button: [" + label + "] " + width + "x" + height + " Color: " + color + " Enabled: " + isEnabled);
        }
    }

    public static void main(String[] args) {
        new Button()
            .setLabel("Submit Application")
            .setColor("Dark Slate")
            .setDimensions(200, 50)
            .setEnabled(true)
            .render();
    }
}`,
              output: `Rendering Button: [Submit Application] 200x50 Color: Dark Slate Enabled: true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "Fluent APIs powered by 'return this' provide intuitive builder semantics commonly seen in modern frameworks, graphic engines, and configuration tools."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "التسلسل البرمجي عبر 'return this' يوفر واجهة بناء سهلة ومرنة تحاكي أحدث أطر العمل ومحركات الرسوم في جافا."
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
                "Mistake 1: Attempting to use 'this' inside static methods. 'this' represents a heap instance, but static methods operate without any instance.",
                "خطأ 1: محاولة استخدام 'this' داخل دالة static، وهذا محظور لأن الدوال الساكنة تعمل على مستوى الفئة بدون كائن.",
                "Mistake 2: Writing 'x = x' in a constructor expecting it to initialize the instance field. Without 'this.x', the parameter merely reassigns to itself.",
                "خطأ 2: كتابة 'x = x' بدلاً من 'this.x = x'، مما يعيد إسناد المعامل لنفسه ويبقى حقل الكائن على قيمته الافتراضية.",
                "Mistake 3: Forgetting that 'this()' constructor chaining cannot be cyclical (e.g. constructor A calling B while B calls A causes recursive loop compilation error).",
                "خطأ 3: الوقوع في حلقة تسلسل دائرية (كأن يستدعي المشيد أ المشيد ب ويستدعي المشيد ب المشيد أ)، وهو ما يكتشفه المصرف ويمنعه."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Fluent User Account Configurator (التحدي العملي: مهيئ حساب المستخدم المتسلسل)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Design a UserConfigurator class using the 'this' keyword: 1) Attributes: username, email, theme (default 'Light'), notificationsEnabled (default true); 2) Chained methods using 'return this': setUsername, setEmail, setTheme, and setNotifications; 3) Method 'buildAndPrint()' that prints the finalized profile summary. Test in main() with chained method calls."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: قم بتصميم صنف UserConfigurator باستخدام الكلمة المفتاحية this: 1) الحقول: اسم المستخدم، البريد، السمة (افتراضياً Light)، وتفعيل الإشعارات (افتراضياً true)؛ 2) دوال متسلسلة ترجع 'this' لكل حقل؛ 3) دالة buildAndPrint لطباعة البيانات النهائية. اختبر الاستدعاء المتسلسل في main."
            },
            {
              type: "code",
              language: "java",
              filename: "UserConfigChallenge.java",
              code: `public class UserConfigChallenge {
    static class UserConfigurator {
        private String username;
        private String email;
        private String theme = "Light";
        private boolean notificationsEnabled = true;

        UserConfigurator setUsername(String username) {
            this.username = username;
            return this;
        }

        UserConfigurator setEmail(String email) {
            this.email = email;
            return this;
        }

        UserConfigurator setTheme(String theme) {
            this.theme = theme;
            return this;
        }

        UserConfigurator setNotifications(boolean enabled) {
            this.notificationsEnabled = enabled;
            return this;
        }

        void buildAndPrint() {
            System.out.println("=== USER PROFILE CREATED ===");
            System.out.println("Username: " + this.username);
            System.out.println("Email: " + this.email);
            System.out.println("Theme: " + this.theme);
            System.out.println("Notifications: " + (this.notificationsEnabled ? "ON" : "OFF"));
        }
    }

    public static void main(String[] args) {
        new UserConfigurator()
            .setUsername("nora_cyber")
            .setEmail("nora@enterprise.io")
            .setTheme("Dark OLED")
            .setNotifications(false)
            .buildAndPrint();
    }
}`,
              output: `=== USER PROFILE CREATED ===
Username: nora_cyber
Email: nora@enterprise.io
Theme: Dark OLED
Notifications: OFF`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "Using 'return this' empowers each configuration method to pass the current instance along, creating an elegant, readable builder pattern."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "استخدام 'return this' يسمح لكل دالة بإعادة الكائن نفسه، مما يشكل نمط بناء انسيابياً وسهل القراءة لتجهيز الحسابات."
            }
          ],
          quiz: [
            {
              id: "q1",
              question: "What does the 'this' keyword represent in an instance method or constructor?",
              options: [
                "The parent superclass instance.",
                "A reference to the current calling object instance residing on the heap.",
                "The JVM operating system process.",
                "The Java compiler instance."
              ],
              correctIndex: 1,
              explanation: "Correct! 'this' is a special implicit reference variable holding the memory address of the current object whose non-static method or constructor is actively being executed. (تشير this إلى الكائن الحالي نفسه الذي ينفذ الدالة في الذاكرة)."
            },
            {
              id: "q2",
              question: "Predict the output of the following code:\nclass DimensionBox {\n    int length = 10;\n    void setLength(int length) {\n        length = length;\n    }\n}\n// In main:\nDimensionBox box = new DimensionBox();\nbox.setLength(50);\nSystem.out.println(box.length);",
              options: [
                "50",
                "10",
                "0",
                "Throws a NullPointerException"
              ],
              correctIndex: 1,
              explanation: "Correct! Because 'length = length' lacks 'this.', the local parameter shadows the instance field and reassigns the parameter to itself. The instance field 'box.length' remains completely untouched at 10. (عدم كتابة this. يسبب حجب المعامل للمتغير الأصلي، فتُسند القيمة للمعامل نفسه ويبقى متغير الكائن 10 دون تغيير)."
            },
            {
              id: "q3",
              question: "How does writing 'this.length = length;' resolve the variable shadowing issue?",
              options: [
                "It makes 'length' a global static variable.",
                "It explicitly tells the compiler that 'this.length' refers to the instance field of the object, while 'length' on the right refers to the local method parameter.",
                "It converts the primitive integer into a heap String.",
                "It prevents garbage collection of the method frame."
              ],
              correctIndex: 1,
              explanation: "Correct! Variable shadowing occurs when a local variable shares the same name as an instance attribute. Prefixing with 'this.' explicitly resolves to the object's instance field. (استخدام this. يحدد بوضوح أن المقصود هو خاصية الكائن وليس المعامل المحلي المتشابه في الاسم)."
            },
            {
              id: "q4",
              question: "What happens if a developer writes 'this.speed = 100;' inside a 'public static void main' method?",
              options: [
                "It compiles and sets the speed of the first created object.",
                "Compile-time error: non-static variable this cannot be referenced from a static context.",
                "A NullPointerException is thrown at runtime.",
                "The class is automatically marked abstract."
              ],
              correctIndex: 1,
              explanation: "Correct! Static methods belong to the class blueprint and run without any instance on the heap. Because there is no current object, the 'this' reference does not exist in any static context. (الدوال الساكنة تعمل دون وجود كائن محدد، لذا لا يتوفر مؤشر this بداخلها ومحاولة استخدامه تسبب خطأ تصريف صريحاً)."
            },
            {
              id: "q5",
              question: "When chaining constructors using 'this(...)', what strict compiler rule must be satisfied?",
              options: [
                "It must be inside an if statement.",
                "The call to 'this(...)' must be the very first syntactic statement in the constructor body.",
                "It must return an instance of Object.",
                "It can only be called from static methods."
              ],
              correctIndex: 1,
              explanation: "Correct! Java language specifications enforce that explicit constructor invocation via 'this(...)' must be the absolute first statement before any other code runs. (استدعاء this(...) يجب أن يكون أول سطر تنفيذي في المشيد دائماً)."
            },
            {
              id: "q6",
              question: "Examine this event registration pattern:\nclass WindowButton {\n    void attachToManager(EventManager manager) {\n        manager.registerButton(this);\n    }\n}\nWhat does passing 'this' as a method argument accomplish?",
              options: [
                "It creates a clone of the current class file on disk.",
                "It passes the reference of the current WindowButton instance to the external EventManager so the manager can interact with it.",
                "It shuts down the EventManager thread.",
                "It clears the event queue."
              ],
              correctIndex: 1,
              explanation: "Correct! Passing 'this' as an argument passes the current object instance's reference to another class or collaborator, enabling callbacks and event-driven architectures. (تمرير this يرسل مرجع الكائن الحالي لكائن آخر لتمكينه من التفاعل معه أو تسجيله في نظام الأحداث)."
            },
            {
              id: "q7",
              question: "What language construct makes the following fluent method chaining possible?\nnew EmailBuilder().to(\"dev@domain.com\").subject(\"Release\").send();",
              options: [
                "Marking every method static.",
                "Having each setter method return 'this' (the current builder instance).",
                "Using multi-threaded background workers.",
                "Inheriting from java.lang.ProcessBuilder."
              ],
              correctIndex: 1,
              explanation: "Correct! Fluent APIs work by returning 'this' from mutator methods, allowing callers to chain consecutive operations on the same returned reference. (نمط البناء الانسيابي يعتمد على إرجاع this من كل دالة إعداد لإتاحة ربط الاستدعاءات المتتالية بسلاسة)."
            },
            {
              id: "q8",
              question: "Inside an inner class, how can you explicitly refer to the enclosing outer class's 'this' reference?",
              options: [
                "super.this",
                "OuterClass.this",
                "this.outer",
                "this(OuterClass)"
              ],
              correctIndex: 1,
              explanation: "Correct! If an inner class shadows an outer class member or needs the outer instance itself, it uses 'OuterClass.this' to disambiguate. (للإشارة إلى كائن الفئة الخارجية من داخل فئة متداخلة، نستخدم الصيغة OuterClass.this)."
            },
            {
              id: "q9",
              question: "If a method parameter name does NOT conflict with an instance field (e.g., field 'age' and parameter 'val'):\nvoid setAge(int val) { age = val; }\nIs using 'this.age = val;' required by the Java compiler?",
              options: [
                "Yes, code without 'this.' will fail to compile in Java 8 and later.",
                "No, 'this.' is optional here; the compiler automatically resolves 'age' to the instance field when no local shadowing exists.",
                "Yes, omitting 'this.' causes a memory leak.",
                "No, but writing 'this.' causes a compilation error."
              ],
              correctIndex: 1,
              explanation: "Correct! When there is no identifier conflict/shadowing, 'this.' is optional. However, many style guides recommend using it consistently for visual clarity. (عندما لا يوجد تشابه أسماء، تكون this. اختيارية لأن المترجم يحدد حقل الكائن تلقائياً دون لبس)."
            },
            {
              id: "q10",
              question: "Examine this identity comparison method:\nclass UserAccount {\n    boolean isSameUser(UserAccount other) {\n        return this == other;\n    }\n}\nWhat does 'this == other' evaluate?",
              options: [
                "Whether their usernames have identical string characters.",
                "Whether 'this' and 'other' point to the exact same heap memory address.",
                "Whether both objects were compiled at the same time.",
                "Whether they reside in the same package."
              ],
              correctIndex: 1,
              explanation: "Correct! The '==' operator on object references compares memory addresses. It returns true if and only if 'this' and 'other' refer to the exact same object on the heap. (المقارنة بـ == بين المراجع تقارن عناوين الذاكرة، فتعيد true فقط إذا كانا يشيران لنفس الكائن تماماً في الـ Heap)."
            },
            {
              id: "q11",
              question: "What happens if a developer attempts to reassign 'this' inside an instance method?\nvoid reset() {\n    this = new UserAccount();\n}",
              options: [
                "The current object is garbage collected and replaced.",
                "Compile-time error: cannot assign a value to final variable this.",
                "The method executes and resets all fields to null.",
                "It throws an UnsupportedOperationException at runtime."
              ],
              correctIndex: 1,
              explanation: "Correct! In Java, 'this' is an immutable, implicitly final reference. You cannot reassign 'this' to point to a different object address; attempting to do so causes a compile-time error. (في جافا، مؤشر this ثابت وغير قابل للتعديل نهائياً ومحاولة إسناد كائن جديد له تسبب خطأ تصريف)."
            },
            {
              id: "q12",
              question: "In concurrent multi-threaded Java, what is the effect of writing:\nsynchronized(this) {\n    // critical section\n}",
              options: [
                "It locks the entire JVM process for all applications.",
                "It acquires the intrinsic lock (monitor) of the current object instance, ensuring only one thread executes this block on this object at any time.",
                "It converts all instance variables into static volatiles.",
                "It terminates other background threads."
              ],
              correctIndex: 1,
              explanation: "Correct! Synchronizing on 'this' acquires the monitor lock of the current object instance, providing thread safety and preventing race conditions for that specific instance. (المزامنة على this تقفل كائن النسخة الحالي فقط وتمنع دخول خيطين متزامنين لنفس الكتلة على نفس الكائن)."
            },
            {
              id: "q13",
              question: "Is there any functional difference between calling 'validate();' versus 'this.validate();' inside an instance method?",
              options: [
                "Yes, 'this.validate()' bypasses polymorphism.",
                "No, both invoke the same instance method on the current object; the compiler treats them identically.",
                "Yes, 'this.validate()' runs on a new worker thread.",
                "Yes, 'validate()' is static while 'this.validate()' is non-static."
              ],
              correctIndex: 1,
              explanation: "Correct! When calling an instance method from within the same class, 'this.' is implicit and functionally identical to writing 'validate();'. (استدعاء دالة الكائن بـ this. أو بدونها متطابق تماماً لأن المترجم يدرك السياق ضمناً)."
            },
            {
              id: "q14",
              question: "Predict the output:\nclass Counter {\n    int count = 1;\n    Counter increment() {\n        this.count++;\n        return this;\n    }\n}\n// In main:\nCounter c = new Counter();\nc.increment().increment().increment();\nSystem.out.println(c.count);",
              options: [
                "1",
                "2",
                "3",
                "4"
              ],
              correctIndex: 3,
              explanation: "Correct! 'count' starts at 1. Each chained '.increment()' mutates 'this.count' and returns the same 'this' reference: 1 -> 2 -> 3 -> 4. The final count is 4. (يبدأ العداد من 1، ومع استدعاء دالة الزيادة 3 مرات متتالية عبر تسلسل this تصبح القيمة النهائية 4)."
            },
            {
              id: "q15",
              question: "Why does the Java compiler strictly reject constructor chaining like:\nEmployee() { this(); }",
              options: [
                "Because constructors cannot have empty bodies.",
                "It creates direct recursive constructor invocation, which would cause an infinite loop and crash the call stack at runtime.",
                "Because default constructors must be public.",
                "Because this() requires at least two arguments."
              ],
              correctIndex: 1,
              explanation: "Correct! Calling 'this()' inside the no-arg constructor is direct infinite recursion. The Java compiler detects this cycle and reports a compile-time error: 'recursive constructor invocation'. (المصرف يمنع استدعاء المشيد لنفسه أو الحلقات الدائرية لمنع الانهيار بحلقة استدعاءات لا نهائية)."
            }
          ]
        }
      ]
    }
  ];
})();
