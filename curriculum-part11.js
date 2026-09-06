/**
 * Java Curriculum Module - Part 11
 * Topics:
 * 21. Static Members
 * 22. Final Keyword
 * 
 * 100% Offline, Pure JavaScript. Complete educational content with full bilingual (English & Arabic) explanations.
 */

(function () {
  'use strict';

  window.JAVA_TOPICS_PART11 = [
    /* ==========================================================================
       TOPIC 21: Static Members
       ========================================================================== */
    {
      id: "static-members",
      title: "21. Static Members",
      description: "Mastering Java Static Members: Static variables, static methods, static initialization blocks, static nested classes, memory allocation in Metaspace, and static utility architectures.",
      lessons: [
        {
          id: "static-members-mastery",
          title: "Complete Guide to Static Members",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "Understanding Static Members in Java (فهم الأعضاء الساكنة في جافا)"
            },
            {
              type: "paragraph",
              text: "In Java, the 'static' keyword denotes that a particular member (variable, method, block, or nested class) belongs to the CLASS itself rather than to individual object instances. When a member is declared static, only a single copy exists across the entire runtime lifecycle of the application, shared collectively by every instantiated object. Static members are allocated once in memory (in the Metaspace / Class Area) when the class is loaded by the JVM, before any object of the class is created."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "الكلمة المفتاحية 'static' في جافا تدل على أن العضو البرمجي (سواء كان متغيراً أو دالة أو كتلة تهيئة أو فئة داخلية) ينتمي إلى 'الفئة نفسها' (Class) وليس إلى كائن معين (Instance). عند تعريف عضو كـ static، يتم إنشاء نسخة واحدة فقط منه في الذاكرة (ضمن منطقة Metaspace) عند تحميل الفئة في الـ JVM وتتشارك جميع الكائنات هذه النسخة الواحدة. لذلك يمكن الوصول للأعضاء الساكنة مباشرة باسم الفئة دون الحاجة لإنشاء كائن عبر new."
            },
            {
              type: "paragraph",
              text: "Core Architectural Rules of Static Context: 1) Static methods CANNOT access instance variables or instance methods directly without an explicit object reference; 2) The 'this' and 'super' keywords CANNOT be used inside static methods or static blocks; 3) Static variables are ideal for counters, constants, caches, and global configuration flags; 4) Static methods are ideal for stateless utility functions (such as Math.max or Collections.sort)."
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
              text: "Example 1: Static Variable as a Global Instance Counter (المثال 1: المتغير الساكن كعداد كائنات مشترك)"
            },
            {
              type: "paragraph",
              text: "Demonstrating how a single static variable increments across all instances, unlike independent instance variables."
            },
            {
              type: "code",
              language: "java",
              filename: "StaticCounterDemo.java",
              code: `public class StaticCounterDemo {
    static class UserSession {
        // Shared class-level variable
        static int totalActiveSessions = 0;

        // Unique instance variable per object
        String username;

        UserSession(String username) {
            this.username = username;
            totalActiveSessions++; // Increments the shared single variable
        }
    }

    public static void main(String[] args) {
        System.out.println("Initial active sessions: " + UserSession.totalActiveSessions);

        UserSession s1 = new UserSession("Alice");
        UserSession s2 = new UserSession("Bob");
        UserSession s3 = new UserSession("Charlie");

        System.out.println("Sessions after login: " + UserSession.totalActiveSessions);
        System.out.println("Accessing via object reference: " + s1.totalActiveSessions);
    }
}`,
              output: `Initial active sessions: 0
Sessions after login: 3
Accessing via object reference: 3`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "Because 'totalActiveSessions' is static, all 3 objects update the same memory cell. Notice we access it via 'UserSession.totalActiveSessions' rather than 's1'."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "المتغير totalActiveSessions مشترك بين جميع الكائنات؛ فكلما أُنشئ كائن جديد، زادت قيمته في نفس الخلية بالذاكرة، ويُفضل الوصول إليه عبر اسم الفئة UserSession."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Static Utility Methods (المثال 2: الدوال الساكنة المساعدة Utility Methods)"
            },
            {
              type: "paragraph",
              text: "Creating pure, stateless helper methods that operate purely on arguments without needing instance state."
            },
            {
              type: "code",
              language: "java",
              filename: "StaticUtilityDemo.java",
              code: `public class StaticUtilityDemo {
    static class TemperatureConverter {
        // Private constructor prevents instantiation of utility class
        private TemperatureConverter() {}

        public static double celsiusToFahrenheit(double c) {
            return (c * 9.0 / 5.0) + 32.0;
        }

        public static double fahrenheitToCelsius(double f) {
            return (f - 32.0) * 5.0 / 9.0;
        }
    }

    public static void main(String[] args) {
        double boilingC = 100.0;
        double boilingF = TemperatureConverter.celsiusToFahrenheit(boilingC);
        System.out.printf("%.1f°C = %.1f°F%n", boilingC, boilingF);

        double freezingF = 32.0;
        double freezingC = TemperatureConverter.fahrenheitToCelsius(freezingF);
        System.out.printf("%.1f°F = %.1f°C%n", freezingF, freezingC);
    }
}`,
              output: `100.0°C = 212.0°F
32.0°F = 0.0°C`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "Stateless methods like mathematical transformations do not require object creation. Calling them via ClassName.methodName() is fast, clean, and avoids object allocation overhead."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "الدوال المساعدة الرياضية لا تحتاج لحفظ حالة، لذا تُعرّف كـ static ويُمنع إنشاء كائنات منها بمشيد خاص private، مما يوفر سرعة ولا يستهلك ذاكرة."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Static Initialization Block (المثال 3: كتلة التهيئة الساكنة Static Block)"
            },
            {
              type: "paragraph",
              text: "Executing complex one-time initialization logic when the class is first loaded into the JVM."
            },
            {
              type: "code",
              language: "java",
              filename: "StaticBlockDemo.java",
              code: `import java.util.HashMap;
import java.util.Map;

public class StaticBlockDemo {
    static class ConfigurationRegistry {
        static final Map<String, String> CONFIG = new HashMap<>();

        // Static initialization block runs once when class is loaded
        static {
            System.out.println("[JVM] Loading ConfigurationRegistry static block...");
            CONFIG.put("API_VERSION", "v2.5");
            CONFIG.put("ENVIRONMENT", "PRODUCTION");
            CONFIG.put("TIMEOUT_MS", "5000");
        }

        public static String get(String key) {
            return CONFIG.get(key);
        }
    }

    public static void main(String[] args) {
        System.out.println("Main method started.");
        System.out.println("Config API: " + ConfigurationRegistry.get("API_VERSION"));
        System.out.println("Config Env: " + ConfigurationRegistry.get("ENVIRONMENT"));
    }
}`,
              output: `Main method started.
[JVM] Loading ConfigurationRegistry static block...
Config API: v2.5
Config Env: PRODUCTION`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "The static block executes the very first time ConfigurationRegistry is referenced, initializing complex static collections before any method call."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "كتلة static {} تنفذ لمرة واحدة فقط عند تحميل الفئة لأول مرة بواسطة الـ JVM، وتُستخدم لتهيئة المتغيرات الساكنة المعقدة كالقواميس وقواعد البيانات."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Execution Order: Static Block vs Instance Block vs Constructor (المثال 4: ترتيب التنفيذ)"
            },
            {
              type: "paragraph",
              text: "Visualizing the exact execution sequence when classes and instances are loaded."
            },
            {
              type: "code",
              language: "java",
              filename: "ExecutionOrderDemo.java",
              code: `public class ExecutionOrderDemo {
    static class LifecycleTracker {
        static {
            System.out.println("1. Static Block executed (Class load)");
        }

        {
            System.out.println("2. Instance Init Block executed (Object birth)");
        }

        LifecycleTracker() {
            System.out.println("3. Constructor executed");
        }
    }

    public static void main(String[] args) {
        System.out.println("--- Creating Instance A ---");
        new LifecycleTracker();

        System.out.println("--- Creating Instance B ---");
        new LifecycleTracker();
    }
}`,
              output: `--- Creating Instance A ---
1. Static Block executed (Class load)
2. Instance Init Block executed (Object birth)
3. Constructor executed
--- Creating Instance B ---
2. Instance Init Block executed (Object birth)
3. Constructor executed`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "The static block executes only ONCE on initial class loading. Instance initializers and constructors run every time a new object is created."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "كتلة static تعمل مرة واحدة عند أول استدعاء للفئة. بينما كتل التهيئة العادية والمشيدات تنفذ مع كل كائن جديد يتم إنشاؤه."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Static Context Restriction: No 'this' or Non-Static Access (المثال 5: قيود السياق الساكن)"
            },
            {
              type: "paragraph",
              text: "Understanding why static methods cannot directly access instance fields or call instance methods."
            },
            {
              type: "code",
              language: "java",
              filename: "StaticRestrictionDemo.java",
              code: `public class StaticRestrictionDemo {
    static class Employee {
        static String companyName = "TechCorp";
        String employeeName;

        Employee(String name) {
            this.employeeName = name;
        }

        // Static method: can only access static members directly
        public static void printCompanyHeader() {
            System.out.println("Welcome to " + companyName);
            // System.out.println(this.employeeName); // COMPILER ERROR: 'this' cannot be referenced from a static context
        }

        // Instance method: can access BOTH instance and static members
        public void printBadge() {
            System.out.println("Employee: " + this.employeeName + " @ " + companyName);
        }
    }

    public static void main(String[] args) {
        Employee.printCompanyHeader();
        Employee emp = new Employee("Zaid");
        emp.printBadge();
    }
}`,
              output: `Welcome to TechCorp
Employee: Zaid @ TechCorp`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "Because a static method is not bound to any individual object instance, 'this' does not exist in its scope. To access instance data, an instance must be created or passed in."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "لأن الدالة الساكنة لا تتبع كائناً محدداً، فإن الكلمة 'this' والمتغيرات العادية غير متاحة داخلها مباشرة دون تمرير كائن صريح."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Static Factory Methods (المثال 6: دوال التصنيع الساكنة Static Factory Methods)"
            },
            {
              type: "paragraph",
              text: "Replacing multiple ambiguous constructors with descriptive static factory methods."
            },
            {
              type: "code",
              language: "java",
              filename: "StaticFactoryDemo.java",
              code: `public class StaticFactoryDemo {
    static class ComplexNumber {
        private final double real;
        private final double imaginary;

        private ComplexNumber(double r, double i) {
            this.real = r;
            this.imaginary = i;
        }

        // Static factory method for Cartesian coordinates
        public static ComplexNumber fromCartesian(double real, double imaginary) {
            return new ComplexNumber(real, imaginary);
        }

        // Static factory method for Polar coordinates
        public static ComplexNumber fromPolar(double radius, double thetaRadians) {
            return new ComplexNumber(radius * Math.cos(thetaRadians), radius * Math.sin(thetaRadians));
        }

        @Override
        public String toString() {
            return String.format("%.2f + %.2fi", real, imaginary);
        }
    }

    public static void main(String[] args) {
        ComplexNumber c1 = ComplexNumber.fromCartesian(3.0, 4.0);
        ComplexNumber c2 = ComplexNumber.fromPolar(5.0, Math.PI / 4);

        System.out.println("Cartesian complex: " + c1);
        System.out.println("Polar complex:     " + c2);
    }
}`,
              output: `Cartesian complex: 3.00 + 4.00i
Polar complex:     3.54 + 3.54i`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "Static factory methods give meaningful names to object instantiation, solving the problem where two constructors would otherwise have identical parameter signatures."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "توفر دوال التصنيع الساكنة أسماء واضحة لإنشاء الكائنات بدلاً من المشيدات الغامضة، وتحل مشكلة تشابه معاملات المشيدات المختلفة."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Static Nested Class (المثال 7: الفئات المتداخلة الساكنة Static Nested Class)"
            },
            {
              type: "paragraph",
              text: "Coupling a helper class to its outer class without retaining an implicit reference to the outer instance."
            },
            {
              type: "code",
              language: "java",
              filename: "StaticNestedDemo.java",
              code: `public class StaticNestedDemo {
    static class LinkedListWrapper {
        // Static nested class: Node does not need reference to enclosing LinkedListWrapper
        static class Node {
            int value;
            Node next;

            Node(int val) {
                this.value = val;
                this.next = null;
            }
        }

        private Node head;

        public void append(int val) {
            Node newNode = new Node(val);
            if (head == null) {
                head = newNode;
                return;
            }
            Node curr = head;
            while (curr.next != null) {
                curr = curr.next;
            }
            curr.next = newNode;
        }

        public void print() {
            Node curr = head;
            while (curr != null) {
                System.out.print(curr.value + " -> ");
                curr = curr.next;
            }
            System.out.println("null");
        }
    }

    public static void main(String[] args) {
        LinkedListWrapper list = new LinkedListWrapper();
        list.append(10);
        list.append(20);
        list.append(30);
        list.print();

        // Direct instantiation of static nested class without outer instance
        LinkedListWrapper.Node standaloneNode = new LinkedListWrapper.Node(999);
        System.out.println("Standalone Node value: " + standaloneNode.value);
    }
}`,
              output: `10 -> 20 -> 30 -> null
Standalone Node value: 999`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "A static nested class does NOT have an implicit reference to an outer class instance. It saves memory and can be instantiated directly via EnclosingClass.NestedClass."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "الفئة المتداخلة الساكنة لا تحمل مؤشراً خفياً لكائن الفئة الخارجية، مما يوفر الذاكرة ويتيح إنشاءها مباشرة دون الحاجة لكائن خارجي."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Method Hiding with Static Methods (المثال 8: حجب الدوال الساكنة وليس تجاوزها)"
            },
            {
              type: "paragraph",
              text: "Proving that redefining static methods in subclasses results in method hiding rather than polymorphic overriding."
            },
            {
              type: "code",
              language: "java",
              filename: "StaticMethodHidingDemo.java",
              code: `public class StaticMethodHidingDemo {
    static class SuperHero {
        static void identity() {
            System.out.println("SuperHero: Secret Civilian");
        }

        void usePower() {
            System.out.println("SuperHero: Generic energy blast");
        }
    }

    static class IronMan extends SuperHero {
        // Hiding superclass static method
        static void identity() {
            System.out.println("IronMan: Tony Stark");
        }

        // Overriding instance method
        @Override
        void usePower() {
            System.out.println("IronMan: Repulsor rays & Nano lasers");
        }
    }

    public static void main(String[] args) {
        SuperHero hero = new IronMan(); // Upcasting

        // Static method resolution: bound at compile-time by reference type (SuperHero)
        hero.identity();

        // Instance method resolution: resolved at runtime by actual object (IronMan)
        hero.usePower();
    }
}`,
              output: `SuperHero: Secret Civilian
IronMan: Repulsor rays & Nano lasers`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "Static methods cannot be overridden polymorphically. When called through a reference variable, the compiler binds the method according to the variable's declared type, not the runtime object."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "الدوال الساكنة لا تتجاوز بتعدد الأشكال بل تُحجب فقط، ويرتبط استدعاؤها بنوع المتغير المرجعي وقت التصريف وليس بالكائن الفعلي."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Static Import for Clean Code (المثال 9: الاستيراد الساكن Static Import)"
            },
            {
              type: "paragraph",
              text: "Importing static members directly to streamline scientific formulas and constant evaluations."
            },
            {
              type: "code",
              language: "java",
              filename: "StaticImportDemo.java",
              code: `import static java.lang.Math.PI;
import static java.lang.Math.pow;
import static java.lang.Math.sqrt;

public class StaticImportDemo {
    public static void main(String[] args) {
        double radius = 7.0;

        // Uses imported static members without Math. prefix
        double circleArea = PI * pow(radius, 2);
        double hypotenuse = sqrt(pow(3, 2) + pow(4, 2));

        System.out.printf("Area of circle (r=%.1f): %.2f%n", radius, circleArea);
        System.out.printf("Hypotenuse of 3 and 4: %.2f%n", hypotenuse);
    }
}`,
              output: `Area of circle (r=7.0): 153.94
Hypotenuse of 3 and 4: 5.00`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "Static imports eliminate the need to prefix class names before static members, improving mathematical readability when used judiciously."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "يتيح الاستيراد الساكن استخدام الثوابت والدوال الساكنة مباشرة دون تكرار كتابة اسم الفئة مثل Math، مما يحسن وضوح المعادلات الرياضية."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Thread-Safe Singleton via Bill Pugh Static Holder (المثال 10: نمط السنجلتون بحامل الفئة الساكنة)"
            },
            {
              type: "paragraph",
              text: "High-performance, lazy-loaded, thread-safe Singleton using static inner class semantics."
            },
            {
              type: "code",
              language: "java",
              filename: "BillPughSingletonDemo.java",
              code: `public class BillPughSingletonDemo {
    static class AppSettings {
        private AppSettings() {
            System.out.println("[Init] AppSettings instantiated lazily on demand.");
        }

        // Inner static class is NOT loaded until getInstance() is called
        private static class InstanceHolder {
            private static final AppSettings INSTANCE = new AppSettings();
        }

        public static AppSettings getInstance() {
            return InstanceHolder.INSTANCE;
        }

        public void printStatus() {
            System.out.println("AppSettings running smoothly.");
        }
    }

    public static void main(String[] args) {
        System.out.println("Application booted.");
        System.out.println("Requesting settings instance...");
        AppSettings s1 = AppSettings.getInstance();
        AppSettings s2 = AppSettings.getInstance();

        System.out.println("Are both references identical? " + (s1 == s2));
        s1.printStatus();
    }
}`,
              output: `Application booted.
Requesting settings instance...
[Init] AppSettings instantiated lazily on demand.
Are both references identical? true
AppSettings running smoothly.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "The Bill Pugh pattern leverages JVM class-loading guarantees: InstanceHolder is only loaded when referenced, providing thread-safe lazy initialization without synchronized locking overhead."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "يعتمد نمط Bill Pugh على ميزة تحميل الفئات في جافا؛ فلا يتم إنشاء الكائن إلا عند أول استدعاء لدالة getInstance، مما يضمن أمان الخيوط وكفاءة الأداء دون أقفال ثقيلة."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Enterprise Audit Log Buffer with Static Management (المثال 11: سجل التدقيق المؤسسي الساكن)"
            },
            {
              type: "paragraph",
              text: "Advanced: Centralized static audit logger tracking events across all components of a financial transaction engine."
            },
            {
              type: "code",
              language: "java",
              filename: "AuditLogEngineMaster.java",
              code: `import java.util.ArrayList;
import java.util.List;

public class AuditLogEngineMaster {
    static class CentralAuditLogger {
        private static final List<String> LOG_ENTRIES = new ArrayList<>();
        private static int eventCounter = 0;

        // Static synchronized method for thread-safe entry registration
        public static synchronized void recordEvent(String component, String event) {
            eventCounter++;
            String record = String.format("[#%04d] [%s] %s", eventCounter, component, event);
            LOG_ENTRIES.add(record);
        }

        public static void dumpLogs() {
            System.out.println("=== AUDIT TRAIL LOG DUMP (" + LOG_ENTRIES.size() + " EVENTS) ===");
            for (String entry : LOG_ENTRIES) {
                System.out.println(entry);
            }
        }
    }

    static class PaymentService {
        void charge(String account, double amount) {
            CentralAuditLogger.recordEvent("PAYMENT", "Charged $" + amount + " to " + account);
        }
    }

    static class InventoryService {
        void deduct(String item, int qty) {
            CentralAuditLogger.recordEvent("INVENTORY", "Deducted " + qty + " units of " + item);
        }
    }

    public static void main(String[] args) {
        PaymentService payment = new PaymentService();
        InventoryService inventory = new InventoryService();

        payment.charge("ACC-9041", 450.0);
        inventory.deduct("SKU-LAPTOP-X", 1);
        payment.charge("ACC-1102", 79.5);

        CentralAuditLogger.dumpLogs();
    }
}`,
              output: `=== AUDIT TRAIL LOG DUMP (3 EVENTS) ===
[#0001] [PAYMENT] Charged $450.0 to ACC-9041
[#0002] [INVENTORY] Deducted 1 units of SKU-LAPTOP-X
[#0003] [PAYMENT] Charged $79.5 to ACC-1102`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "CentralAuditLogger aggregates events from disparate services into a single shared static collection without needing to pass logger instances through constructors."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "يجمع CentralAuditLogger الأحداث من جميع الخدمات المختلفة داخل مصفوفة ساكنة موحدة دون الحاجة لتمرير كائنات المسجل عبر المشيدات."
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
                "Mistake 1: Attempting to use 'this' or 'super' inside a static method. Static code is class-level and has no reference to an instance.",
                "خطأ 1: محاولة استخدام 'this' أو 'super' داخل دالة ساكنة؛ لأن الكود الساكن يتبع الفئة ولا يرتبط بأي كائن محدد.",
                "Mistake 2: Accessing static members using object references (e.g. 'obj.staticField') instead of the class name ('ClassName.staticField'). While legal in Java, it causes confusion by disguising a shared variable as instance state.",
                "خطأ 2: الوصول للمتغيرات الساكنة عبر اسم الكائن بدلاً من اسم الفئة؛ مما يوهم المطور بأن المتغير خاص بالكائن وليس مشتركاً.",
                "Mistake 3: Overusing static variables as global mutable state. This introduces thread-safety hazards, hidden coupling, and makes unit testing difficult."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Vehicle Identification Number (VIN) Generator (التحدي العملي: مولد أرقام شاسيه السيارات)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Build a 'Vehicle' class with: 1) A private static counter initialized to 1000; 2) A private static prefix 'VIN-US-'; 3) Each newly created Vehicle automatically gets a unique immutable 'vin' string formatted as 'VIN-US-XXXX' (e.g. VIN-US-1001, VIN-US-1002); 4) A static method 'getTotalVehiclesProduced()' returning count of created vehicles; 5) In main(), instantiate 3 vehicles and print their individual VINs and the total vehicle count."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: أنشئ فئة 'Vehicle' تحتوي على: 1) عداد ساكن خاص يبدأ من 1000؛ 2) بادئة ساكنة 'VIN-US-'؛ 3) يولد كل كائن جديد كوداً فريداً غير قابل للتعديل vin بتنسيق 'VIN-US-XXXX'؛ 4) دالة ساكنة 'getTotalVehiclesProduced()' تعيد عدد السيارات المنتجة؛ 5) في main، أنشئ 3 سيارات واعرض أكوادها وإجمالي الإنتاج."
            },
            {
              type: "code",
              language: "java",
              filename: "VinGeneratorChallenge.java",
              code: `public class VinGeneratorChallenge {
    static class Vehicle {
        private static int nextSequence = 1000;
        private static final String PREFIX = "VIN-US-";

        private final String vin;
        private final String model;

        public Vehicle(String model) {
            this.model = model;
            nextSequence++;
            this.vin = PREFIX + nextSequence;
        }

        public String getVin() { return vin; }
        public String getModel() { return model; }

        public static int getTotalVehiclesProduced() {
            return nextSequence - 1000;
        }
    }

    public static void main(String[] args) {
        Vehicle v1 = new Vehicle("Sedan");
        Vehicle v2 = new Vehicle("SUV");
        Vehicle v3 = new Vehicle("Electric Truck");

        System.out.printf("Vehicle 1: %-15s | VIN: %s%n", v1.getModel(), v1.getVin());
        System.out.printf("Vehicle 2: %-15s | VIN: %s%n", v2.getModel(), v2.getVin());
        System.out.printf("Vehicle 3: %-15s | VIN: %s%n", v3.getModel(), v3.getVin());

        System.out.println("Total Vehicles Produced: " + Vehicle.getTotalVehiclesProduced());
    }
}`,
              output: `Vehicle 1: Sedan           | VIN: VIN-US-1001
Vehicle 2: SUV             | VIN: VIN-US-1002
Vehicle 3: Electric Truck  | VIN: VIN-US-1003
Total Vehicles Produced: 3`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "The static 'nextSequence' increments on every constructor call, allowing each instance to receive an incremented sequence number stamped into its final VIN property."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "يزداد العداد الساكن nextSequence تلقائياً عند كل استدعاء للمشيد، مما يضمن توليد رقم شاسيه تسلسلي فريد لكل سيارة ومتابعة إجمالي الإنتاج بدقة."
            }
          ],
          quiz: [
                    {
                              "id": "q1",
                              "question": "What does the 'static' keyword signify when applied to a field in Java?\n(ما الذي تعنيه الكلمة المفتاحية static عند تطبيقها على حقل في جافا؟)",
                              "options": [
                                        "The field can only be accessed by one thread at a time.",
                                        "The field belongs to the class itself rather than any individual instance, and a single shared copy exists in memory.",
                                        "The field cannot be modified after initialization.",
                                        "The field is stored on the CPU register."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Static fields are class-level variables shared across all instances of that class. Modifying a static variable from one instance affects the value seen by all other instances. (الحقول الساكنة تتبع الفئة ككل وليس كائنات منفردة، وتوجد منها نسخة واحدة مشتركة في الذاكرة لجميع الكائنات)."
                    },
                    {
                              "id": "q2",
                              "question": "Where are static variables stored in modern Java (Java 8 and newer)?\n(أين يتم تخزين المتغيرات الساكنة في إصدارات جافا الحديثة ابتداءً من Java 8؟)",
                              "options": [
                                        "On the method execution stack",
                                        "In the Metaspace/Heap area associated with the Class mirror object (replacing legacy PermGen)",
                                        "Inside CPU L1 cache exclusively",
                                        "On the file system swap space"
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Since Java 8 (with the removal of Permanent Generation / PermGen), static variables reside in Metaspace / Heap memory attached to the java.lang.Class instance for that loaded class. (منذ جافا 8 وإلغاء PermGen، تُخزن المتغيرات الساكنة في الذاكرة المدارة المرتبطة بكائن الفئة Class في الـ Metaspace/Heap)."
                    },
                    {
                              "id": "q3",
                              "question": "Why can the 'this' and 'super' keywords NOT be referenced inside a static method?\n(لماذا يمنع استخدام الكلمتين المفتاحيتين this و super داخل الدوال الساكنة؟)",
                              "options": [
                                        "Because static methods are compiled in C++.",
                                        "Because static methods belong to the class and execute without any specific instance context ('this' does not exist).",
                                        "Because this and super can only be used inside loops.",
                                        "Because static methods can only return void."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! The 'this' pointer refers to the current instance invoking the method. Because static methods are invoked on the class itself (e.g. Math.sqrt()) without an instance, there is no 'this' or 'super' context. (الدوال الساكنة تستدعى على مستوى الفئة دون الحاجة لوجود كائن، وبالتالي لا يوجد مرجع كائن حالي this أو super متاح داخلها)."
                    },
                    {
                              "id": "q4",
                              "question": "What members can a static method access directly WITHOUT an explicit object reference?\n(ما هي الأعضاء التي يمكن للدالة الساكنة الوصول إليها مباشرة دون مرجع كائن صريح؟)",
                              "options": [
                                        "Only other static methods and static variables of the class.",
                                        "Any instance variable or instance method declared in the class.",
                                        "Private constructors of any external class.",
                                        "Only variables marked volatile."
                              ],
                              "correctIndex": 0,
                              "explanation": "Correct! A static method can directly access other static members (variables and methods) of the class. It cannot directly reference instance variables or instance methods without explicitly creating or receiving an object reference. (تستطيع الدالة الساكنة الوصول مباشرة فقط إلى الحقول والدوال الساكنة الأخرى، وتتطلب مرجع كائن للوصول إلى أعضاء الكائنات)."
                    },
                    {
                              "id": "q5",
                              "question": "When does a static initialization block (static { ... }) execute in Java?\n(متى يتم تنفيذ كتلة التهيئة الساكنة static { ... } في جافا؟)",
                              "options": [
                                        "Every time an object of the class is instantiated using 'new'.",
                                        "Exactly once when the class is first loaded into memory by the JVM ClassLoader.",
                                        "Only when the garbage collector runs.",
                                        "Every time any method in the class is invoked."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! A static initialization block executes exactly once when the class is initially loaded and initialized by the ClassLoader, prior to any object creation or static method invocation. (تنفذ كتلة static مرة واحدة فقط عند تحميل الفئة لأول مرة في ذاكرة الـ JVM قبل إنشاء أي كائن أو استدعاء أي دالة)."
                    },
                    {
                              "id": "q6",
                              "question": "Consider this inheritance hierarchy:\n\nclass Parent {\n    static { System.out.print(\"P_STATIC \"); }\n}\nclass Child extends Parent {\n    static { System.out.print(\"C_STATIC \"); }\n}\n\nWhat is printed by: new Child();?",
                              "options": [
                                        "C_STATIC P_STATIC",
                                        "P_STATIC C_STATIC",
                                        "C_STATIC only",
                                        "P_STATIC only"
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! When a subclass is loaded, its superclass must be loaded and initialized first. Therefore, Parent's static block runs first ('P_STATIC '), followed by Child's static block ('C_STATIC '). (عند تحميل الفئة الابن، يجب تحميل فئة الأب وتهيئتها أولاً، فينفذ كود static الخاص بالأب ثم كود الابن)."
                    },
                    {
                              "id": "q7",
                              "question": "What happens when a subclass declares a static method with the exact same signature as a static method in its superclass?\n(ماذا يحدث عندما تعرّف فئة فرعية دالة ساكنة بنفس بصمة دالة ساكنة في فئتها الأب؟)",
                              "options": [
                                        "The subclass method overrides the superclass method with dynamic dispatch.",
                                        "The subclass method hides the superclass method (Method Hiding); the method called depends on the compile-time reference type.",
                                        "A compile-time error occurs.",
                                        "Both methods execute concurrently."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Static methods cannot be overridden dynamically; they are hidden (Method Hiding). Invoking the method through a superclass reference invokes the superclass static method, even if the underlying object is a subclass. (الدوال الساكنة لا تُتجاوز بل تُحجب Method Hiding، وتعتمد في الاستدعاء على نوع المرجع أثناء التصريف وليس على الكائن الفعلي)."
                    },
                    {
                              "id": "q8",
                              "question": "What is printed by the following code?\n\nclass Counter {\n    static int count = 0;\n    Counter() { count++; }\n}\n\npublic class Test {\n    public static void main(String[] args) {\n        Counter a = new Counter();\n        Counter b = new Counter();\n        Counter c = new Counter();\n        System.out.println(a.count + \" \" + Counter.count);\n    }\n}",
                              "options": [
                                        "1 3",
                                        "3 3",
                                        "1 1",
                                        "Compile error: cannot access static field through instance reference."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! The static field 'count' is shared across all instances. Each constructor invocation increments the same variable, resulting in count = 3. Accessing a.count or Counter.count accesses that exact same memory location. (المتغير count مشترك بين جميع الكائنات؛ فكل استدعاء للمشيد يزيد نفس المتغير، والوصول إليه عبر a.count أو Counter.count يعيد نفس القيمة 3)."
                    },
                    {
                              "id": "q9",
                              "question": "How does a static nested class differ from an inner (non-static member) class in Java?\n(بماذا تختلف الفئة الساكنة المتداخلة Static Nested Class عن الفئة الداخلية غير الساكنة؟)",
                              "options": [
                                        "A static nested class can only contain static methods.",
                                        "A static nested class does not retain an implicit reference to an instance of the outer class, reducing memory footprint and preventing leaks.",
                                        "An inner class cannot access private fields of the outer class.",
                                        "A static nested class cannot be instantiated using 'new'."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! A non-static inner class holds an implicit hidden reference to its enclosing outer instance. A static nested class does NOT hold this reference, which prevents memory leaks and allows independent instantiation via Outer.Nested n = new Outer.Nested(). (الفئة الساكنة المتداخلة لا تحتفظ بمرجع خفي لكائن الفئة الخارجية، مما يوفر الذاكرة ويمنع التسريبات البرمجية)."
                    },
                    {
                              "id": "q10",
                              "question": "What is the primary benefit of the 'import static' statement in Java (e.g. import static java.lang.Math.*;)?\n(ما هي الفائدة الأساسية من تعليمة import static في جافا؟)",
                              "options": [
                                        "It compiles the class into static machine code.",
                                        "It allows referencing static members (constants and methods) directly without prefixing them with their enclosing class name.",
                                        "It ensures the imported class is thread-safe.",
                                        "It automatically instantiates the imported class."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! The 'import static' feature allows direct use of static constants (e.g. PI instead of Math.PI) and static methods (e.g. sqrt(16) instead of Math.sqrt(16)), improving code readability when used judiciously. (يتيح import static استخدام الدوال والثوابت الساكنة مباشرة مثل PI و sqrt دون الحاجة لكتابة اسم الفئة Math في كل مرة)."
                    },
                    {
                              "id": "q11",
                              "question": "Why is the Bill Pugh Singleton pattern (using a private static helper class) preferred for lazy initialization?\n(لماذا يُفضل نمط بيل بوغ Bill Pugh باستخدام فئة ساكنة مساعدة للتهيئة الكسولة للكائن المنفرد؟)",
                              "options": [
                                        "It requires expensive synchronized blocks on every getInstance() call.",
                                        "It provides thread-safe, lazy initialization without synchronization overhead, relying on the JVM's class-loading guarantees.",
                                        "It allows multiple instances to be created in parallel.",
                                        "It forces the garbage collector to never run."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! The inner helper class is loaded only when getInstance() is first called. The JVM guarantees that class loading and static initialization are atomic and thread-safe, achieving lazy loading without synchronization performance penalties. (تُحمل الفئة المساعدة فقط عند أول استدعاء لـ getInstance، وتضمن الـ JVM تحميلها وتهيئتها بأمان تام بين المسارات دون تكلفة التزامن synchronized)."
                    },
                    {
                              "id": "q12",
                              "question": "What is the primary risk of using shared mutable static variables in a multi-threaded Java application?\n(ما هو الخطر الأساسي لاستخدام متغيرات ساكنة قابلة للتعديل مشتركة بين مسارات متعددة؟)",
                              "options": [
                                        "They cause stack overflow errors immediately.",
                                        "They are prone to race conditions and inconsistent state unless explicitly synchronized or managed with atomic primitives (e.g. AtomicInteger).",
                                        "They cannot be converted to String.",
                                        "The JVM automatically deletes them after 10 seconds."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Because static variables are shared globally across all threads, concurrent un-synchronized reads and writes cause race conditions, dirty reads, and corrupted data. Thread-safe constructs like AtomicInteger or synchronized blocks must be used. (المتغيرات الساكنة المشتركة عرضة لسباق المسارات Race Conditions وتلف البيانات إذا عُدلت في نفس الوقت دون تزامن مناسب)."
                    },
                    {
                              "id": "q13",
                              "question": "What happens when the following code executes?\n\nclass Utility {\n    static void ping() { System.out.print(\"PONG \"); }\n}\npublic class NullStaticTest {\n    public static void main(String[] args) {\n        Utility u = null;\n        u.ping();\n    }\n}",
                              "options": [
                                        "Prints: PONG",
                                        "Throws a runtime NullPointerException",
                                        "Compile-time error: variable u is null",
                                        "Prints nothing"
                              ],
                              "correctIndex": 0,
                              "explanation": "Correct! The compiler resolves static method calls using the declared type of the reference variable (Utility.ping()), not the runtime object. Because the object on the heap is not accessed, no NullPointerException occurs, and 'PONG ' is printed. (المصرف يوجه استدعاء الدوال الساكنة عبر نوع المرجع Utility.ping() وليس عبر الكائن، فلا يتم فحص القيمة null ولا يحدث خطأ NullPointerException بل تطبع PONG)."
                    },
                    {
                              "id": "q14",
                              "question": "Why should utility classes consisting entirely of static methods (like java.util.Collections) declare a private constructor?\n(لماذا يجب على فئات الأدوات المساعدة التي تحوي دوال ساكنة فقط تعريف مشيد خاص private؟)",
                              "options": [
                                        "To allow subclasses to extend them.",
                                        "To prevent misuse by disallowing unnecessary instantiation via 'new Utility()'.",
                                        "To make static methods execute asynchronously.",
                                        "To satisfy the Java Servlet specification."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! A utility class with only static methods is designed as a namespace for functions, not an object template. A private constructor prevents developers from redundantly instantiating it. (فئة الأدوات المساعدة لا تحتاج لإنشاء كائنات منها؛ فالمشيد الخاص يمنع استخدام new معها بشكل خاطئ)."
                    },
                    {
                              "id": "q15",
                              "question": "What is the exact output of running this program?\n\npublic class ExecutionFlow {\n    static int n = 5;\n    static {\n        System.out.print(\"S:\" + n + \" \");\n        n = 10;\n    }\n    {\n        System.out.print(\"I:\" + n + \" \");\n    }\n    ExecutionFlow() {\n        System.out.print(\"C \");\n    }\n    public static void main(String[] args) {\n        System.out.print(\"M \");\n        new ExecutionFlow();\n    }\n}",
                              "options": [
                                        "M S:5 I:10 C",
                                        "S:5 M I:10 C",
                                        "S:5 I:5 C M",
                                        "M I:10 C S:5"
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! 1) The class is loaded, running the static block: prints 'S:5 ' and sets n=10. 2) main() begins: prints 'M '. 3) 'new ExecutionFlow()' triggers the instance block: prints 'I:10 '. 4) Constructor runs: prints 'C '. Final output: 'S:5 M I:10 C '. (أولاً: تحميل الفئة ينفذ static ويطبع S:5 ويعدل n=10، ثانياً: يبدأ main ويطبع M، ثالثاً: إنشاء الكائن يشغل الكتلة العادية فتطبع I:10، رابعاً: المشيد يطبع C، والناتج S:5 M I:10 C)."
                    }
          ]
        }
      ]
    },

    /* ==========================================================================
       TOPIC 22: Final Keyword
       ========================================================================== */
    {
      id: "final-keyword",
      title: "22. Final Keyword",
      description: "Mastering the Java Final Keyword: Final variables, blank final fields, immutable references vs immutable objects, final methods, final classes, and compile-time constants.",
      lessons: [
        {
          id: "final-keyword-mastery",
          title: "Complete Guide to the Final Keyword",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "Understanding the Final Keyword in Java (فهم الكلمة المفتاحية final في جافا)"
            },
            {
              type: "paragraph",
              text: "In Java, the 'final' non-access modifier is used to impose immutability and restriction. Its behavior depends on the entity it is applied to: 1) A final VARIABLE cannot be reassigned once initialized (it becomes a constant); 2) A final METHOD cannot be overridden by any subclass (preventing alteration of critical algorithms); 3) A final CLASS cannot be subclassed (preventing inheritance, as seen with java.lang.String or java.lang.Math); 4) A final PARAMETER cannot have its value reassigned inside the method body."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "الكلمة المفتاحية 'final' في جافا تُستخدم لفرض القيود ومنع التعديل، ويختلف أثرها بحسب مكان استخدامها: 1) مع المتغيرات: تمنع إعادة إسناد أي قيمة جديدة للمتغير بعد تهيئته الأولى (يصبح ثابتاً)؛ 2) مع الدوال: تمنع الفئات الوارثة من إعادة تعريف الدالة أو تجاوزها (Overriding)؛ 3) مع الفئات: تمنع وراثة الفئة تماماً بحيث لا يمكن لأي فئة أخرى أن ترث منها (مثل فئة String)؛ 4) مع المعاملات: تمنع إعادة تعيين قيمة المعامل داخل جسم الدالة."
            },
            {
              type: "paragraph",
              text: "Critical Distinction: A final reference variable CANNOT point to a different object, but the internal state of the referenced object CAN still be modified if the object itself is mutable! For example, a 'final ArrayList' cannot be reassigned to another list, but elements can still be added or removed from it."
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
              text: "Example 1: Basic Final Variable (المثال 1: المتغير الثابت الأساسي final)"
            },
            {
              type: "paragraph",
              text: "Declaring a primitive constant that cannot be altered after assignment."
            },
            {
              type: "code",
              language: "java",
              filename: "BasicFinalVariableDemo.java",
              code: `public class BasicFinalVariableDemo {
    public static void main(String[] args) {
        final int MAX_USERS = 100;
        System.out.println("Maximum allowed users: " + MAX_USERS);

        // MAX_USERS = 150; // COMPILER ERROR: cannot assign a value to final variable MAX_USERS
    }
}`,
              output: `Maximum allowed users: 100`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "Once initialized with 100, attempting to reassign 'MAX_USERS' causes a compilation error, guaranteeing value stability."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "بمجرد إسناد القيمة 100 للمتغير MAX_USERS، تفشل أي محاولة لإعادة تعيينه أثناء التصريف مما يضمن ثبات القيمة."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Blank Final Field (المثال 2: المتغير الفارغ المهيأ في المشيد Blank Final)"
            },
            {
              type: "paragraph",
              text: "A blank final field is not initialized at declaration; it MUST be assigned inside every constructor."
            },
            {
              type: "code",
              language: "java",
              filename: "BlankFinalFieldDemo.java",
              code: `public class BlankFinalFieldDemo {
    static class Citizen {
        // Blank final variable: uninitialized here
        private final String nationalId;
        private String name;

        public Citizen(String id, String name) {
            // Must be initialized in constructor
            this.nationalId = id;
            this.name = name;
        }

        public String getNationalId() { return nationalId; }
        public String getName() { return name; }
        public void setName(String newName) { this.name = newName; }
    }

    public static void main(String[] args) {
        Citizen c = new Citizen("NAT-998811", "Omar");
        System.out.println("Citizen: " + c.getName() + " | ID: " + c.getNationalId());

        c.setName("Omar Al-Farooq"); // Valid: name is not final
        // c.nationalId = "NAT-000000"; // COMPILER ERROR: cannot reassign final field
        System.out.println("Updated Name: " + c.getName() + " | Immutable ID: " + c.getNationalId());
    }
}`,
              output: `Citizen: Omar | ID: NAT-998811
Updated Name: Omar Al-Farooq | Immutable ID: NAT-998811`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "A blank final variable allows each instance to hold a unique immutable value, assigned once through constructor parameters."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "المتغير الثابت الفارغ Blank Final لا يُعطى قيمة فور تعريفه، بل يجب إسناد قيمته حتماً داخل المشيد ليكون ثابتاً وخاصاً بكل كائن."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Final Reference vs Mutable Object State (المثال 3: المرجع الثابت مقابل محتوى الكائن)"
            },
            {
              type: "paragraph",
              text: "A crucial distinction: final locks the reference pointer, not the internal state of the referenced object."
            },
            {
              type: "code",
              language: "java",
              filename: "FinalReferenceDemo.java",
              code: `import java.util.ArrayList;
import java.util.List;

public class FinalReferenceDemo {
    public static void main(String[] args) {
        // 'teams' is a final reference to an ArrayList
        final List<String> teams = new ArrayList<>();

        // Legal: modifying the object's internal state
        teams.add("Real Madrid");
        teams.add("Arsenal");
        teams.add("Al-Hilal");
        System.out.println("Teams list: " + teams);

        // Illegal: reassigning the reference itself to a new object
        // teams = new ArrayList<>(); // COMPILER ERROR: cannot assign a value to final variable teams
    }
}`,
              output: `Teams list: [Real Madrid, Arsenal, Al-Hilal]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "'final List<String> teams' prevents 'teams' from pointing to a different list in memory, but does NOT make the ArrayList immutable."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "الكلمة final هنا تمنع المتغير teams من الإشارة إلى قائمة جديدة في الذاكرة، لكنها لا تمنع إضافة عناصر أو حذفها من القائمة الحالية."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Static Final Compile-Time Constant (المثال 4: الثابت العام في وقت التصريف static final)"
            },
            {
              type: "paragraph",
              text: "Combining 'static' and 'final' creates shared, immutable constants (screaming snake case convention)."
            },
            {
              type: "code",
              language: "java",
              filename: "StaticFinalConstantDemo.java",
              code: `public class StaticFinalConstantDemo {
    public static class AppConfig {
        // Compile-time constants inlined by the compiler
        public static final String DEFAULT_DATABASE = "PostgreSQL";
        public static final int DEFAULT_PORT = 5432;
        public static final double SALES_TAX_RATE = 0.15;
    }

    public static void main(String[] args) {
        System.out.println("DB System: " + AppConfig.DEFAULT_DATABASE);
        System.out.println("Port:      " + AppConfig.DEFAULT_PORT);
        System.out.println("Tax Rate:  " + (AppConfig.SALES_TAX_RATE * 100) + "%");
    }
}`,
              output: `DB System: PostgreSQL
Port:      5432
Tax Rate:  15.0%`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "'static final' constants are stored once, cannot be mutated, and primitive/string literals are inlined by the compiler at compile time."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "تُكتب الثوابت العامة بصيغة 'static final' وبحروف كبيرة مع شرطة سفلية، وتُستبدل قيمها مباشرة في الكود أثناء التصريف لسرعة الأداء."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Final Methods to Prevent Overriding (المثال 5: الدوال المغلقة التي تمنع التجاوز)"
            },
            {
              type: "paragraph",
              text: "Marking critical methods final prevents subclasses from changing business logic or security checks."
            },
            {
              type: "code",
              language: "java",
              filename: "FinalMethodSecurityDemo.java",
              code: `public class FinalMethodSecurityDemo {
    static class PaymentProcessor {
        // Sensitive core calculation cannot be tampered with by any subclass
        public final void auditTransaction(String txId, double amount) {
            System.out.printf("[AUDIT LOG SECURE] TxID: %s, Amount: $%.2f%n", txId, amount);
        }

        // Non-final method: can be customized
        public void processPayment(double amount) {
            System.out.println("Standard cash/card settlement for $" + amount);
        }
    }

    static class CryptoPaymentProcessor extends PaymentProcessor {
        @Override
        public void processPayment(double amount) {
            System.out.println("Settling payment via Blockchain Smart Contract: $" + amount);
        }

        // Attempting to override auditTransaction causes compile failure:
        // @Override
        // public void auditTransaction(String txId, double amount) { ... }
    }

    public static void main(String[] args) {
        CryptoPaymentProcessor crypto = new CryptoPaymentProcessor();
        crypto.processPayment(250.0);
        crypto.auditTransaction("TX-882194", 250.0);
    }
}`,
              output: `Settling payment via Blockchain Smart Contract: $250.0
[AUDIT LOG SECURE] TxID: TX-882194, Amount: $250.00`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "The final method 'auditTransaction' is inherited by CryptoPaymentProcessor and can be called, but cannot be overridden or modified."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "الدالة المعرفة كـ final يرثها الابن ويستطيع استدعاءها، لكنه يعجز عن تجاوزها أو تعديل خطواتها الأمنية الحساسة."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Final Classes to Prohibit Inheritance (المثال 6: الفئات المغلقة التي تمنع الوراثة)"
            },
            {
              type: "paragraph",
              text: "Preventing inheritance altogether to safeguard design contracts or enforce complete immutability."
            },
            {
              type: "code",
              language: "java",
              filename: "FinalClassDemo.java",
              code: `public class FinalClassDemo {
    // Final class cannot be extended by any class
    public static final class SecurityHash {
        private final String algorithm;

        public SecurityHash(String alg) {
            this.algorithm = alg;
        }

        public void compute(String input) {
            System.out.println("Computing " + algorithm + " hash for: " + input);
        }
    }

    // class CustomHash extends SecurityHash {} // COMPILER ERROR: cannot inherit from final SecurityHash

    public static void main(String[] args) {
        SecurityHash hasher = new SecurityHash("SHA-256");
        hasher.compute("SecretPassword123");
    }
}`,
              output: `Computing SHA-256 hash for: SecretPassword123`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "Making SecurityHash final ensures no subclass can ever inject malicious behavior or violate security invariants (like Java's String class)."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "جعل الفئة final يمنع وراثتها بالكامل، مما يحمي تصميمها من التلاعب الخارجي تماماً كما هو الحال في فئة String في مكتبة جافا الرسمية."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Final Method Parameters (المثال 7: المعاملات الثابتة في الدوال)"
            },
            {
              type: "paragraph",
              text: "Preventing accidental reassignment of parameters within method bodies."
            },
            {
              type: "code",
              language: "java",
              filename: "FinalParametersDemo.java",
              code: `public class FinalParametersDemo {
    static class TaxService {
        public double calculateTotal(final double subtotal, final double taxRate) {
            // subtotal = subtotal + 5.0; // COMPILER ERROR: cannot assign a value to final parameter subtotal
            double tax = subtotal * taxRate;
            return subtotal + tax;
        }
    }

    public static void main(String[] args) {
        TaxService service = new TaxService();
        double total = service.calculateTotal(200.0, 0.15);
        System.out.printf("Total calculated amount: $%.2f%n", total);
    }
}`,
              output: `Total calculated amount: $230.00`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "Marking parameters final ensures that input values cannot be altered within the method, eliminating bugs caused by parameter reassignment."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "تحديد المعاملات كـ final يمنع المطور من تغيير قيمتها بالخطأ داخل الدالة، مما يحافظ على نقاء الحسابات الرياضية."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Effectively Final Variables in Lambdas/Anonymous Classes (المثال 8: المتغيرات الثابتة فعلياً Effectively Final)"
            },
            {
              type: "paragraph",
              text: "Local variables captured by lambdas or anonymous classes must be final or effectively final."
            },
            {
              type: "code",
              language: "java",
              filename: "EffectivelyFinalDemo.java",
              code: `public class EffectivelyFinalDemo {
    interface Greeter {
        void greet();
    }

    public static void main(String[] args) {
        String city = "Riyadh"; // Effectively final: never reassigned after this point

        Greeter g = new Greeter() {
            @Override
            public void greet() {
                // Capturing local variable 'city'
                System.out.println("Greetings from sunny " + city + "!");
            }
        };

        g.greet();

        // If we un-comment the line below, 'city' is no longer effectively final,
        // and the anonymous class above will FAIL to compile!
        // city = "Jeddah";
    }
}`,
              output: `Greetings from sunny Riyadh!`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "Java requires variables referenced inside inner classes and lambdas to be final or effectively final (assigned only once), ensuring consistency across stack frames."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "تشترط جافا أن تكون المتغيرات المحلية المستخدمة داخل الفئات المجهولة أو تعبيرات لامبدا إما final صريحة أو Effectively Final (لم تتغير قيمتها بعد أول إسناد)."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Static Blank Final Variable in Static Block (المثال 9: المتغير الساكن الثابت المهيأ في كتلة static)"
            },
            {
              type: "paragraph",
              text: "Initializing a static final variable that requires multi-step computation or error handling."
            },
            {
              type: "code",
              language: "java",
              filename: "StaticBlankFinalDemo.java",
              code: `public class StaticBlankFinalDemo {
    static class EnvironmentProperties {
        // Static blank final: must be initialized in a static block!
        public static final int CORES_AVAILABLE;
        public static final String OS_NAME;

        static {
            CORES_AVAILABLE = Runtime.getRuntime().availableProcessors();
            OS_NAME = System.getProperty("os.name");
        }
    }

    public static void main(String[] args) {
        System.out.println("Host Operating System: " + EnvironmentProperties.OS_NAME);
        System.out.println("Available CPU Cores:    " + EnvironmentProperties.CORES_AVAILABLE);
    }
}`,
              output: `Host Operating System: Linux
Available CPU Cores:    2`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "Static blank final variables must be initialized inside a static initialization block. Leaving them uninitialized or reassigning them causes compile errors."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "المتغير الساكن الثابت الفارغ يجب أن تتم تهيئته بدقة داخل كتلة static {}، ولا يمكن تركه فارغاً أو إعادة إسناده في أي مكان آخر."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Building an Immutable Class with Final (المثال 10: بناء فئة غير قابلة للتغيير Immutable Class)"
            },
            {
              type: "paragraph",
              text: "Combining final class, final private fields, and defensive copying to guarantee thread-safe immutability."
            },
            {
              type: "code",
              language: "java",
              filename: "ImmutableClassDemo.java",
              code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class ImmutableClassDemo {
    // 1. Declare class as final so it cannot be subclassed
    public static final class ImmutableUserProfile {
        // 2. Make all fields private and final
        private final String userId;
        private final List<String> roles;

        public ImmutableUserProfile(String id, List<String> roles) {
            this.userId = id;
            // 3. Defensive copy of mutable collections
            this.roles = new ArrayList<>(roles);
        }

        public String getUserId() { return userId; }

        // 4. Return unmodifiable view or clone
        public List<String> getRoles() {
            return Collections.unmodifiableList(roles);
        }
    }

    public static void main(String[] args) {
        List<String> mutableRoles = new ArrayList<>();
        mutableRoles.add("VIEWER");

        ImmutableUserProfile profile = new ImmutableUserProfile("USR-101", mutableRoles);

        // Attempting to modify external list does NOT affect internal state
        mutableRoles.add("ADMIN");
        System.out.println("Profile Roles after external list modification: " + profile.getRoles());

        // Attempting to modify returned list throws UnsupportedOperationException
        try {
            profile.getRoles().add("HACKER");
        } catch (UnsupportedOperationException e) {
            System.out.println("Caught expected exception: Cannot mutate unmodifiable list!");
        }
    }
}`,
              output: `Profile Roles after external list modification: [VIEWER]
Caught expected exception: Cannot mutate unmodifiable list!`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "True immutability requires a final class, final private fields, no setters, and defensive copies of all mutable parameters."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "لإنشاء فئة غير قابلة للتعديل (Immutable) يجب قفل الفئة بـ final، وجعل الحقول private final، واستنساخ القوائم دفاعياً لمنع أي تلاعب خارجي."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Enterprise License Key Validator with Final Invariants (المثال 11: محرك التحقق من رخص البرمجيات المحمية)"
            },
            {
              type: "paragraph",
              text: "Advanced: Complete software licensing engine leveraging final classes, methods, and variables to prevent bypass attacks."
            },
            {
              type: "code",
              language: "java",
              filename: "LicenseValidatorMaster.java",
              code: `public class LicenseValidatorMaster {
    public static final class LicenseToken {
        private final String licenseKey;
        private final String customerDomain;
        private final int maxSeats;

        public LicenseToken(final String key, final String domain, final int seats) {
            this.licenseKey = key;
            this.customerDomain = domain;
            this.maxSeats = seats;
        }

        public String getLicenseKey() { return licenseKey; }
        public String getCustomerDomain() { return customerDomain; }
        public int getMaxSeats() { return maxSeats; }

        public final boolean isValidFor(String domain, int requestedSeats) {
            return this.customerDomain.equalsIgnoreCase(domain) && requestedSeats <= this.maxSeats;
        }
    }

    public static void main(String[] args) {
        final LicenseToken license = new LicenseToken("KEY-9941-XJ", "enterprise.org", 50);

        System.out.println("Validating domain 'enterprise.org' with 30 seats: " +
            license.isValidFor("enterprise.org", 30));
        System.out.println("Validating domain 'enterprise.org' with 75 seats: " +
            license.isValidFor("enterprise.org", 75));
        System.out.println("Validating domain 'unauthorized.com' with 10 seats: " +
            license.isValidFor("unauthorized.com", 10));
    }
}`,
              output: `Validating domain 'enterprise.org' with 30 seats: true
Validating domain 'enterprise.org' with 75 seats: false
Validating domain 'unauthorized.com' with 10 seats: false`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "By making LicenseToken final and its validation method final, the business licensing logic cannot be subclassed, intercepted, or weakened."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "من خلال جعل الفئة LicenseToken ودوال التحقق final، يصبح كود رخص الاستخدام محمياً ومحكماً ضد أي وراثة أو تجاوز غير مصرح به."
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
                "Mistake 1: Confusing a final reference with an immutable object. 'final List list = new ArrayList()' allows adding/removing items, only preventing 'list = otherList'.",
                "خطأ 1: الخلط بين ثبات المرجع وثبات الكائن؛ فالمتغير final يمنع تغيير وجهة المرجع فقط ولكنه لا يمنع تعديل محتويات القائمة الداخلية.",
                "Mistake 2: Forgetting to initialize a blank final variable in all constructors. If even one constructor leaves a blank final uninitialized, compilation fails.",
                "خطأ 2: نسيان إسناد قيمة للمتغير Blank Final في أحد المشيدات؛ فإذا تُرِك في أي مشيد دون تهيئة يفشل التصريف فوراً.",
                "Mistake 3: Attempting to combine 'abstract' and 'final' on a class or method. This is an impossible paradox because abstract requires inheritance/overriding, while final forbids it."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Immutable Crypto Wallet Address (التحدي العملي: عنوان محفظة رقمية غير قابل للتغيير)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Build an immutable class 'WalletAddress': 1) Class declared as final; 2) Private final fields: 'blockchain' (String) and 'addressHash' (String); 3) Constructor initializing both; 4) Getters for both fields (no setters!); 5) A final method 'formatShortAddress()' returning the first 4 chars + '...' + last 4 chars (e.g. '0x1a...99b2'); 6) Test in main() with a sample address."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: قم بإنشاء فئة غير قابلة للتعديل 'WalletAddress': 1) الفئة معرفة كـ final؛ 2) حقول خاصة وثابتة: blockchain و addressHash؛ 3) مشيد يتهيأ بهما؛ 4) دوال Getter فقط دون أي Setter؛ 5) دالة final اسمها 'formatShortAddress()' تعرض أول 4 أحرف ثم '...' ثم آخر 4 أحرف؛ 6) اختبرها في main."
            },
            {
              type: "code",
              language: "java",
              filename: "WalletAddressChallenge.java",
              code: `public class WalletAddressChallenge {
    public static final class WalletAddress {
        private final String blockchain;
        private final String addressHash;

        public WalletAddress(String blockchain, String addressHash) {
            this.blockchain = blockchain;
            this.addressHash = addressHash;
        }

        public String getBlockchain() { return blockchain; }
        public String getAddressHash() { return addressHash; }

        public final String formatShortAddress() {
            if (addressHash == null || addressHash.length() < 8) {
                return addressHash;
            }
            return addressHash.substring(0, 4) + "..." +
                   addressHash.substring(addressHash.length() - 4);
        }
    }

    public static void main(String[] args) {
        WalletAddress ethWallet = new WalletAddress("Ethereum", "0x71C6b940F838a2e5E3c1a89b4f99990119b488B2");
        System.out.println("Blockchain Network: " + ethWallet.getBlockchain());
        System.out.println("Full Hash:          " + ethWallet.getAddressHash());
        System.out.println("Short Display:      " + ethWallet.formatShortAddress());
    }
}`,
              output: `Blockchain Network: Ethereum
Full Hash:          0x71C6b940F838a2e5E3c1a89b4f99990119b488B2
Short Display:      0x71...88B2`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "WalletAddress is made final to prevent inheritance, its fields are private and final, and only read-only getters are provided, ensuring absolute data immutability."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "تم قفل الفئة بـ final لعدم وراثتها، وحقولها private final مع توفير دوال قراءة فقط، مما يجعل عنوان المحفظة محصناً ضد أي تغيير غير مقصود."
            }
          ],
          quiz: [
                    {
                              "id": "q1",
                              "question": "What happens if a program attempts to reassign a variable declared with the 'final' keyword?\n(ماذا يحدث إذا حاول برنامج إعادة إسناد قيمة لمتغير معرّف بالكلمة final؟)",
                              "options": [
                                        "The old value is quietly overwritten.",
                                        "A compile-time error occurs stating that the final variable cannot be reassigned.",
                                        "A runtime IllegalStateException is thrown.",
                                        "The variable is garbage collected."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! A final variable can only be assigned once. Any subsequent attempt to reassign a value to a final variable triggers a compile-time error. (المتغير المعرف بـ final يقبل الإسناد لمرة واحدة فقط، وأي محاولة لاحقة لإعادة إسناد قيمة له تسبب خطأ تصريف فوري)."
                    },
                    {
                              "id": "q2",
                              "question": "What is a 'blank final' field in Java, and where MUST it be initialized?\n(ما هو المتغير الثابت الفارغ Blank Final Field في جافا، وأين يجب تهيئته حتماً؟)",
                              "options": [
                                        "A final variable with no type, initialized in any method.",
                                        "A final instance field left uninitialized at declaration; it MUST be initialized in every constructor (or instance initializer) before construction completes.",
                                        "A final variable that is automatically assigned null.",
                                        "A final variable declared inside an interface."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! A blank final field is a final instance field not initialized at its point of declaration. The Java compiler enforces that it must be initialized in every constructor before constructor completion. (المتغير Blank Final هو حقل لم تُسند له قيمة عند تعريفه؛ ويجبر المصرف المطور على تهيئته داخل كل مشيدات الفئة قبل اكتمال بناء الكائن)."
                    },
                    {
                              "id": "q3",
                              "question": "Where must a 'static blank final' variable be initialized?\n(أين يجب تهيئة المتغير الساكن الثابت الفارغ Static Blank Final؟)",
                              "options": [
                                        "Inside any constructor of the class.",
                                        "Inside an instance initializer block.",
                                        "Inside a static initialization block (static { ... }) or at its declaration.",
                                        "Inside the finalize() method."
                              ],
                              "correctIndex": 2,
                              "explanation": "Correct! Because static final variables belong to the class and exist before any constructor is executed, a static blank final variable must be initialized either at declaration or within a static initialization block. (لأن المتغير الساكن يتبع الفئة ككل، يجب تهيئته عند تعريفه مباشرة أو داخل كتلة تهيئة ساكنة static block، ولا يجوز تهيئته في المشيدات)."
                    },
                    {
                              "id": "q4",
                              "question": "Consider this code:\n\nfinal List<String> list = new ArrayList<>();\nlist.add(\"Java\"); // Line 1\nlist = new ArrayList<>(); // Line 2\n\nWhich statement accurately describes what happens?",
                              "options": [
                                        "Both Line 1 and Line 2 cause compile-time errors.",
                                        "Line 1 succeeds because modifying the internal state of a referenced object is permitted, but Line 2 causes a compile-time error because a final reference cannot be reassigned.",
                                        "Line 1 causes a compile-time error; Line 2 succeeds.",
                                        "Both lines compile and execute successfully."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! 'final' on an object reference means the reference pointer itself cannot be changed to refer to another object. It does NOT make the referenced object's internal contents immutable; thus list.add() is perfectly valid. (الكلمة final تثبت مرجع الكائن في الذاكرة وتمنع توجيهه لكائن آخر، لكنها لا تمنع تعديل محتويات الكائن نفسه الداخلي كإضافة عناصر للقائمة)."
                    },
                    {
                              "id": "q5",
                              "question": "What is the primary architectural purpose of marking a method as 'final' in Java?\n(ما هو الهدف المعماري الأساسي من تمييز دالة ما بالكلمة final في جافا؟)",
                              "options": [
                                        "To make the method run faster by bypassing memory allocation.",
                                        "To prevent subclasses from overriding the method, safeguarding core algorithms and security invariants from alteration.",
                                        "To require subclasses to override the method.",
                                        "To make the method accessible to all classes in any package."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Declaring a method final locks its implementation across all derived classes. This guarantees that critical business logic, security validations, or Template Method skeletons cannot be subverted or modified. (تمييز الدالة بـ final يقفل تنفيذها ويمنع الفئات الفرعية من تجاوزها، مما يحمي الخوارزميات الحساسة وقواعد الأمان من التغيير)."
                    },
                    {
                              "id": "q6",
                              "question": "Which of the following standard Java library classes is declared as 'final' to prevent inheritance?\n(أي من فئات مكتبة جافا القياسية التالية معرّفة كفئة مغلقة final لمنع الوراثة منها؟)",
                              "options": [
                                        "java.lang.Object",
                                        "java.lang.String",
                                        "java.util.ArrayList",
                                        "java.lang.Thread"
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! java.lang.String is declared as 'public final class String' to guarantee string immutability and security (e.g. preventing hostile subclasses from spoofing network hosts, file paths, or credentials). (فئة String معرفة كـ final لمنع الوراثة منها لضمان أمان النظام وثبات النصوص وعدم تزوير سلوكها من فئات متطفلة)."
                    },
                    {
                              "id": "q7",
                              "question": "What does marking a method parameter as 'final' achieve (e.g. void process(final int id))?\n(ما الذي يحققه تمييز معامل الدالة بـ final مثل void process(final int id)؟)",
                              "options": [
                                        "It prevents callers from passing primitive values.",
                                        "It prevents the parameter variable from being reassigned a new value inside the method body.",
                                        "It passes the argument by reference instead of by value.",
                                        "It makes the argument optional."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! A final method parameter acts as a read-only local variable within the method body. Attempting to assign a new value to it (e.g. id = 50;) produces a compile-time error, preventing accidental mutation. (تمييز المعامل بـ final يمنع إعادة إسناد قيمة جديدة له داخل جسم الدالة، مما يحمي قيم المدخلات من التعديل غير المقصود)."
                    },
                    {
                              "id": "q8",
                              "question": "What is an 'effectively final' variable in Java (introduced in Java 8)?\n(ما هو المتغير الثابت فعلياً Effectively Final في جافا؟)",
                              "options": [
                                        "A variable whose value is determined by the JVM at runtime randomly.",
                                        "A local variable that is not explicitly marked with the 'final' keyword, but whose value is never modified after its initialization.",
                                        "A variable stored in cloud storage.",
                                        "A variable that can only hold boolean values."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! An effectively final variable is any local variable whose value does not change after assignment. Java 8+ allows effectively final variables to be referenced inside lambda expressions and anonymous inner classes without explicit 'final' syntax. (المتغير الثابت فعلياً هو متغير لم تسبقه كلمة final ولكن قيمته لم تتغير أبداً بعد أول إسناد، وتسمح جافا 8 باستخدامه داخل تعابير لامدا)."
                    },
                    {
                              "id": "q9",
                              "question": "What happens when compiling the following code?\n\npublic class InvariantCheck {\n    public static final int MAX_USERS = 500;\n    public static void main(String[] args) {\n        MAX_USERS = 600;\n    }\n}",
                              "options": [
                                        "Compiles and prints 600",
                                        "Compile-time error: cannot assign a value to final variable MAX_USERS",
                                        "Compiles, but MAX_USERS resets to 500 automatically",
                                        "Runtime exception: SecurityException"
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Attempting to assign a value to the static final constant MAX_USERS produces a compile-time error: 'cannot assign a value to final variable MAX_USERS'. (محاولة تغيير قيمة الثابت العام static final تؤدي إلى خطأ تصريف صريح يمنع إعادة الإسناد)."
                    },
                    {
                              "id": "q10",
                              "question": "Which of the following is a mandatory design requirement when creating a strictly Immutable Class in Java?\n(أي من الخيارات التالية يُعد شرطاً إلزامياً عند تصميم فئة غير قابلة للتعديل Immutable Class في جافا؟)",
                              "options": [
                                        "All methods must be static.",
                                        "Declare the class as final (or use private constructors), make all fields private and final, provide no setters, and return defensive copies of mutable fields.",
                                        "The class must implement the Cloneable interface.",
                                        "All fields must be public."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! A robust immutable class requires: 1) Class is final to prevent subclassing, 2) All fields private and final, 3) No mutator methods (setters), 4) Defensive copies in constructors and accessors for any mutable fields. (الفئة غير القابلة للتغيير تتطلب: إغلاق الفئة بـ final، جعل جميع الحقول private final، حجب دوال التعديل، واستخدام النسخ الدفاعي للحقول القابلة للتغيير)."
                    },
                    {
                              "id": "q11",
                              "question": "Why is the modifier combination 'abstract final' strictly prohibited on classes and methods in Java?\n(لماذا يعتبر الجمع بين المحددات abstract final ممنوعاً تماماً على الفئات والدوال في جافا؟)",
                              "options": [
                                        "Because abstract classes cannot have constructors.",
                                        "Because they represent direct contradictions: 'abstract' demands that a class or method be inherited/overridden, while 'final' strictly forbids inheritance/overriding.",
                                        "Because final methods must return int.",
                                        "Because abstract classes are stored on the stack."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! 'abstract' says 'this must be extended or implemented by a subclass', while 'final' says 'this can NEVER be extended or overridden'. Combining them is an irreconcilable logical contradiction that the compiler rejects. (تطلب abstract وراثة الفئة وتجاوز الدالة بالضرورة، بينما تمنع final الوراثة والتجاوز تماماً؛ فجمعهما تناقض منطقي مستحيل يرفضه المصرف)."
                    },
                    {
                              "id": "q12",
                              "question": "Consider this array declaration:\n\nfinal int[] buffer = {10, 20, 30};\nbuffer[0] = 99;\n\nDoes this code compile and execute, and why?",
                              "options": [
                                        "No, modifying buffer[0] causes a compile error because the array is final.",
                                        "Yes, because 'final' prevents reassigning the buffer reference to another array, but does NOT prevent modifying elements inside the array.",
                                        "No, arrays cannot be marked final in Java.",
                                        "Yes, but buffer[0] remains 10 due to JVM memory protection."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! The 'final' modifier applies only to the array reference variable 'buffer'. It does not make the array elements constant; buffer[0] = 99 executes without error. To achieve true immutability, unmodifiable collections should be used. (الكلمة final تثبت مؤشر المصفوفة buffer وتمنع استبدالها بمصفوفة أخرى، ولكنها لا تمنع تعديل العناصر بداخلها)."
                    },
                    {
                              "id": "q13",
                              "question": "Why does the following class fail to compile?\n\nclass Device {\n    final int serialNumber;\n    Device() {\n        // serialNumber is not assigned here\n    }\n    Device(int sn) {\n        this.serialNumber = sn;\n    }\n}",
                              "options": [
                                        "Because final fields cannot be initialized inside constructors.",
                                        "Because the blank final field 'serialNumber' might not be initialized if the no-argument constructor is invoked.",
                                        "Because serialNumber must be static.",
                                        "Because Device does not have a main method."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Every constructor must definitively initialize every blank final field. Because Device() leaves serialNumber uninitialized, the compiler flags: 'variable serialNumber might not have been initialized'. (يجب على كل مسار مشيد في الفئة تهيئة الحقل الثابت الفارغ حتماً، ولأن المشيد الافتراضي تركه بلا تهيئة يفشل التصريف بخطأ صريح)."
                    },
                    {
                              "id": "q14",
                              "question": "In a cryptographic security module, why is an immutable LicenseKey class preferable to a mutable one?\n(في وحدة أمان التشفير، لماذا يُفضل استخدام فئة LicenseKey غير قابلة للتعديل على فئة قابلة للتعديل؟)",
                              "options": [
                                        "It uses 50% less CPU on every mathematical operation.",
                                        "It is inherently thread-safe, cannot be corrupted by concurrent operations, and cannot be tampered with once validated.",
                                        "It bypasses the Java garbage collector entirely.",
                                        "It allows keys to be shared via raw pointer memory."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Immutable objects are fundamentally thread-safe without synchronization, cannot enter inconsistent intermediate states, and prevent security vulnerabilities caused by malicious callers altering validated credentials. (الكائنات غير القابلة للتغيير آمنة بين المسارات تلقائياً، وتمنع الثغرات الأمنية الناتجة عن التلاعب بالمفاتيح أو تصريح الوصول بعد اعتماده)."
                    },
                    {
                              "id": "q15",
                              "question": "What is printed by executing the following code?\n\npublic class LoopFinal {\n    public static void main(String[] args) {\n        for (int i = 1; i <= 3; i++) {\n            final int square = i * i;\n            System.out.print(square + \" \");\n        }\n    }\n}",
                              "options": [
                                        "Compile-time error: final variable square cannot be reassigned in a loop.",
                                        "1 4 9",
                                        "1 1 1",
                                        "Runtime exception on second iteration."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! In Java, the local variable 'square' is declared inside the block scope of the for-loop body. On every iteration, a brand new variable 'square' is allocated in stack frame scope and initialized once. It is not reassigned, so this compiles and prints '1 4 9 '. (المتغير square معرف داخل نطاق جسم التكرار، وفي كل دورة يتم إنشاء متغير محلي جديد وتهيئته مرة واحدة فقط دون إعادة إسناد، فيعمل الكود بنجاح ويطبع 1 4 9)."
                    }
          ]
        }
      ]
    }
  ];
})();
