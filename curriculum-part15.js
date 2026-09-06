/**
 * Java Curriculum Module - Part 15
 * Topics:
 * 29. instanceof
 * 30. Object Class
 * 
 * 100% Offline, Pure JavaScript. Complete educational content with full bilingual (English & Arabic) explanations.
 */

(function () {
  'use strict';

  window.JAVA_TOPICS_PART15 = [
    /* ==========================================================================
       TOPIC 29: instanceof
       ========================================================================== */
    {
      id: "instanceof-operator",
      title: "29. instanceof",
      description: "Mastering the Java instanceof Operator: Type comparison, hierarchy traversal, interface testing, null safety guarantees, and Java 16+ Pattern Matching.",
      lessons: [
        {
          id: "instanceof-operator-mastery",
          title: "Complete Guide to the instanceof Operator",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "Understanding the instanceof Operator in Java (فهم معامل التحقق من النوع instanceof)"
            },
            {
              type: "paragraph",
              text: "The 'instanceof' keyword in Java is a binary comparison operator used to test whether an object reference is an instance of a specified class, subclass, or interface. It evaluates to either true or false at runtime by traversing the object's class inheritance hierarchy and implemented interface table."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "المعامل 'instanceof' في جافا هو أداة مقارنة ثنائية تُستخدم لفحص ما إذا كان الكائن المرجعي ينتمي لفئة معينة أو فئة فرعية منها أو يطبق واجهة محددة. يعيد المعامل إما true أو false وقت التشغيل عبر فحص شجرة وراثة الكائن وجدول الواجهات المطبقة لديه في الذاكرة."
            },
            {
              type: "paragraph",
              text: "Critical Properties of instanceof: 1) Null Safety: If the tested reference is null, 'instanceof' evaluates to false immediately without throwing NullPointerException; 2) Hierarchy Awareness: If Dog extends Animal, a Dog instance evaluates to true for BOTH Dog and Animal, as well as Object; 3) Java 16+ Pattern Matching: 'if (obj instanceof TargetType t)' combines the type test and automatic downcast into one clean, scoped expression."
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
              text: "Example 1: Basic Class and Subclass Inspection (المثال 1: الفحص الأساسي للفئات والفئات الوارثة)"
            },
            {
              type: "paragraph",
              text: "Checking an object against its own class and its superclass."
            },
            {
              type: "code",
              language: "java",
              filename: "BasicInstanceofDemo.java",
              code: `public class BasicInstanceofDemo {
    static class Animal {}
    static class Cat extends Animal {}

    public static void main(String[] args) {
        Cat myCat = new Cat();

        System.out.println("myCat instanceof Cat:    " + (myCat instanceof Cat));
        System.out.println("myCat instanceof Animal: " + (myCat instanceof Animal));
        System.out.println("myCat instanceof Object: " + (myCat instanceof Object));
    }
}`,
              output: `myCat instanceof Cat:    true
myCat instanceof Animal: true
myCat instanceof Object: true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "Because Cat extends Animal and all classes extend Object, myCat evaluates to true for Cat, Animal, and Object."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "لأن القطة ترث من الحيوان وجميع الفئات ترث من Object، يعيد الفحص true لكل من فئة القطة والأب الحيوان وObject."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Null Safety Evaluation (المثال 2: أمان التعامل مع القيم الفارغة null)"
            },
            {
              type: "paragraph",
              text: "Evaluating a null reference with instanceof never throws a NullPointerException."
            },
            {
              type: "code",
              language: "java",
              filename: "NullInstanceofDemo.java",
              code: `public class NullInstanceofDemo {
    public static void main(String[] args) {
        String nullString = null;

        // instanceof returns false for null, never throws NullPointerException
        boolean result = nullString instanceof String;
        System.out.println("null instanceof String: " + result);

        boolean objectResult = nullString instanceof Object;
        System.out.println("null instanceof Object: " + objectResult);
    }
}`,
              output: `null instanceof String: false
null instanceof Object: false`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "The JVM specifies that 'null instanceof AnyType' always evaluates to false safely without throwing exceptions."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "تنص قواعد جافا على أن فحص null مع instanceof يعيد false دائماً بأمان تام دون رمي NullPointerException."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Interface Compatibility Testing (المثال 3: فحص تطبيق الواجهات Interface Testing)"
            },
            {
              type: "paragraph",
              text: "Verifying whether an object implements a specific interface regardless of class hierarchy."
            },
            {
              type: "code",
              language: "java",
              filename: "InterfaceInstanceofDemo.java",
              code: `import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class InterfaceInstanceofDemo {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();

        System.out.println("list instanceof List:         " + (list instanceof List));
        System.out.println("list instanceof ArrayList:    " + (list instanceof ArrayList));
        System.out.println("list instanceof Cloneable:    " + (list instanceof Cloneable));
        System.out.println("list instanceof Serializable: " + (list instanceof Serializable));
    }
}`,
              output: `list instanceof List:         true
list instanceof ArrayList:    true
list instanceof Cloneable:    true
list instanceof Serializable: true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "ArrayList implements List, Cloneable, and Serializable; instanceof accurately returns true for each interface contract."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "تطبق ArrayList واجهات متعددة، ويعيد instanceof القيمة true بدقة لكل واجهة تنفذها الفئة."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Preventing ClassCastException with instanceof (المثال 4: الحماية من أخطاء التحويل)"
            },
            {
              type: "paragraph",
              text: "Safeguarding polymorphic downcasts against incompatible subtypes."
            },
            {
              type: "code",
              language: "java",
              filename: "SafeDowncastDemo.java",
              code: `public class SafeDowncastDemo {
    static class Employee {}
    static class Developer extends Employee {
        void writeCode() { System.out.println("Developer writing production code."); }
    }
    static class Designer extends Employee {
        void designUi() { System.out.println("Designer creating Figma mockups."); }
    }

    public static void delegateTask(Employee emp) {
        if (emp instanceof Developer) {
            Developer dev = (Developer) emp;
            dev.writeCode();
        } else if (emp instanceof Designer) {
            Designer des = (Designer) emp;
            des.designUi();
        } else {
            System.out.println("General administrative tasks.");
        }
    }

    public static void main(String[] args) {
        delegateTask(new Developer());
        delegateTask(new Designer());
        delegateTask(new Employee());
    }
}`,
              output: `Developer writing production code.
Designer creating Figma mockups.
General administrative tasks.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "Using instanceof before casting ensures that downcasting is only attempted when the runtime type matches, avoiding runtime failures."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "فحص النوع بـ instanceof قبل التحويل يضمن عدم إجراء Downcasting إلا إذا كان الكائن متطابقاً، مما يحمي البرنامج من الانهيار."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Java 16+ Pattern Matching for instanceof (المثال 5: مطابقة الأنماط الحديثة في جافا 16+)"
            },
            {
              type: "paragraph",
              text: "Binding the cast variable directly in the condition statement, eliminating boilerplate downcasts."
            },
            {
              type: "code",
              language: "java",
              filename: "PatternMatchingInstanceofDemo.java",
              code: `public class PatternMatchingInstanceofDemo {
    public static void printSummary(Object obj) {
        // Pattern variable 's' is automatically created and scoped to the if-block!
        if (obj instanceof String s) {
            System.out.println("String detected: '" + s + "' (Length: " + s.length() + ")");
        } else if (obj instanceof Integer i) {
            System.out.println("Integer detected: " + i + " (Squared: " + (i * i) + ")");
        } else {
            System.out.println("Other type: " + obj.getClass().getSimpleName());
        }
    }

    public static void main(String[] args) {
        printSummary("Java Platform");
        printSummary(12);
        printSummary(99.9);
    }
}`,
              output: `String detected: 'Java Platform' (Length: 13)
Integer detected: 12 (Squared: 144)
Other type: Double`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "Pattern matching for instanceof binds the scoped variable 's' or 'i' automatically upon a true match, making code clean and safe."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "تنشئ مطابقة الأنماط المتغير المحول s أو i تلقائياً داخل كتلة الشرط، مما يختصر الكود ويلغي الحاجة للتحويل اليدوي."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Pattern Matching with Compound Logical Operators (المثال 6: مطابقة الأنماط مع شروط منطقية مركبة)"
            },
            {
              type: "paragraph",
              text: "Combining pattern variables with additional boolean conditions using the '&&' operator."
            },
            {
              type: "code",
              language: "java",
              filename: "CompoundPatternDemo.java",
              code: `public class CompoundPatternDemo {
    public static void validateApiKey(Object candidate) {
        // 'key' is in scope for the right side of the && operator!
        if (candidate instanceof String key && key.startsWith("sk_live_") && key.length() >= 20) {
            System.out.println("Valid Production API Key accepted: " + key.substring(0, 12) + "...");
        } else {
            System.out.println("Rejected: Invalid key structure or wrong type.");
        }
    }

    public static void main(String[] args) {
        validateApiKey("sk_live_994827104928172948");
        validateApiKey("sk_test_123");
        validateApiKey(123456789);
    }
}`,
              output: `Valid Production API Key accepted: sk_live_9948...
Rejected: Invalid key structure or wrong type.
Rejected: Invalid key structure or wrong type.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "Because '&&' uses short-circuit evaluation, 'key' is guaranteed to be non-null and cast to String when evaluating subsequent expressions."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "بفضل خاصية التحقق السريع للمعامل &&، يكون المتغير key متاحاً ومحوّلاً بأمان للشروط التالية في نفس جملة if."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Testing Sibling Classes (Disjoint Types) at Compile Time (المثال 7: كشف الفئات المنفصلة وقت التصريف)"
            },
            {
              type: "paragraph",
              text: "The compiler rejects instanceof tests between two final unrelated classes that can never overlap."
            },
            {
              type: "code",
              language: "java",
              filename: "DisjointTypesInstanceofDemo.java",
              code: `public class DisjointTypesInstanceofDemo {
    public static void main(String[] args) {
        String greeting = "Salam";

        // Un-commenting the line below triggers a compile-time error:
        // boolean impossible = greeting instanceof Integer; // COMPILER ERROR: incompatible types: String cannot be converted to Integer

        // However, testing through Object reference compiles and safely returns false at runtime:
        Object objRef = greeting;
        boolean runtimeCheck = objRef instanceof Integer;
        System.out.println("Object reference pointing to String tested against Integer: " + runtimeCheck);
    }
}`,
              output: `Object reference pointing to String tested against Integer: false`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "The compiler knows String can never be Integer. Testing an Object reference against Integer compiles because an Object could potentially hold an Integer."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "يعرف المترجم استحالة تحويل String إلى Integer ويرفضه مباشرة، بينما يقبل فحص مرجع Object لأن الكائن العام قد يحمل أي نوع."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: instanceof vs getClass() for Exact Type Equivalence (المثال 8: مقارنة instanceof مع getClass)"
            },
            {
              type: "paragraph",
              text: "instanceof checks subtyping (allows subclasses); getClass() checks exact class equality (forbids subclasses)."
            },
            {
              type: "code",
              language: "java",
              filename: "InstanceofVsGetClassDemo.java",
              code: `public class InstanceofVsGetClassDemo {
    static class Base {}
    static class Sub extends Base {}

    public static void main(String[] args) {
        Base obj = new Sub();

        // Subtyping check: true for Base and any subclass
        System.out.println("obj instanceof Base:         " + (obj instanceof Base));

        // Exact class equality: false because obj is Sub, not Base
        System.out.println("obj.getClass() == Base.class: " + (obj.getClass() == Base.class));
        System.out.println("obj.getClass() == Sub.class:  " + (obj.getClass() == Sub.class));
    }
}`,
              output: `obj instanceof Base:         true
obj.getClass() == Base.class: false
obj.getClass() == Sub.class:  true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "'instanceof Base' is true for Sub instances. 'getClass() == Base.class' is only true for exact Base instances, which is critical when implementing strict equals()."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "يعيد instanceof القيمة true للأب وأي فئة وارثة منه، بينما تفحص getClass() التطابق الحرفي للفئة وتستبعد أي فئات ابنة."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Inspecting Generic Wildcards with instanceof (المثال 9: فحص القوالب العامة مع محو الأنواع)"
            },
            {
              type: "paragraph",
              text: "Due to type erasure, you cannot test against generic parameters like 'List<String>'; use unbounded wildcards 'List<?>'."
            },
            {
              type: "code",
              language: "java",
              filename: "GenericsInstanceofDemo.java",
              code: `import java.util.ArrayList;
import java.util.List;

public class GenericsInstanceofDemo {
    public static void main(String[] args) {
        Object candidate = new ArrayList<String>();

        // Cannot test List<String> due to generic type erasure:
        // boolean invalid = candidate instanceof List<String>; // COMPILER ERROR: illegal generic type for instanceof

        // Legal: test against raw type or unbounded wildcard:
        if (candidate instanceof List<?> list) {
            System.out.println("Successfully verified candidate is a List! (Size: " + list.size() + ")");
        }
    }
}`,
              output: `Successfully verified candidate is a List! (Size: 0)`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "Because generic type arguments are erased at compile time, instanceof only checks the raw type or 'List<?>' at runtime."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "بسبب محو الأنواع (Type Erasure) في جافا، لا يمكن فحص List<String> بل نفحص الفئة الأصلية عبر List<?>."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Pattern Matching in Switch (Java 17+ / 21 Standard) (المثال 10: مطابقة أنماط instanceof في جملة Switch)"
            },
            {
              type: "paragraph",
              text: "Modern pattern matching with switch statements allows elegant multi-branch type dispatch."
            },
            {
              type: "code",
              language: "java",
              filename: "PatternSwitchDemo.java",
              code: `public class PatternSwitchDemo {
    static String formatEntity(Object entity) {
        // Pattern Matching with switch (evaluates instanceof under the hood)
        if (entity instanceof Integer i) {
            return String.format("Integer value: %,d", i);
        } else if (entity instanceof Double d) {
            return String.format("Floating-point: %.2f", d);
        } else if (entity instanceof String s) {
            return "String: " + s.trim();
        } else if (entity == null) {
            return "Null reference";
        } else {
            return "Unknown object: " + entity.toString();
        }
    }

    public static void main(String[] args) {
        System.out.println(formatEntity(1000000));
        System.out.println(formatEntity(3.14159));
        System.out.println(formatEntity("   Cloud Native Java   "));
        System.out.println(formatEntity(null));
    }
}`,
              output: `Integer value: 1,000,000
Floating-point: 3.14
String: Cloud Native Java
Null reference`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "Modern Java architectures utilize chained pattern matching to route heterogeneous payloads cleanly and safely."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "تتيح مطابقة الأنماط المتسلسلة توجيه أنواع البيانات المختلفة بأناقة وأمان دون الحاجة لأي تحويل صريح معقد."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Enterprise Financial Transaction Auditor with Pattern Matching (المثال 11: مدقق المعاملات المالية المؤسسي)"
            },
            {
              type: "paragraph",
              text: "Advanced: Auditing high-value wire transfers, credit transactions, and refund requests with strict type verification."
            },
            {
              type: "code",
              language: "java",
              filename: "FinancialAuditorMaster.java",
              code: `public class FinancialAuditorMaster {
    interface TransactionRecord {
        String getTxId();
        double getAmount();
    }

    static class WireTransfer implements TransactionRecord {
        private final String id;
        private final double amount;
        private final String swiftCode;

        WireTransfer(String id, double amt, String swift) {
            this.id = id; this.amount = amt; this.swiftCode = swift;
        }
        public String getTxId() { return id; }
        public double getAmount() { return amount; }
        public String getSwiftCode() { return swiftCode; }
    }

    static class RefundRequest implements TransactionRecord {
        private final String id;
        private final double amount;
        private final String reason;

        RefundRequest(String id, double amt, String r) {
            this.id = id; this.amount = amt; this.reason = r;
        }
        public String getTxId() { return id; }
        public double getAmount() { return amount; }
        public String getReason() { return reason; }
    }

    public static void auditTransaction(TransactionRecord tx) {
        if (tx instanceof WireTransfer wire && wire.getAmount() > 50000.0) {
            System.out.printf("[HIGH RISK AUDIT] Wire %s (SWIFT: %s) exceeds limit: $%.2f%n",
                wire.getTxId(), wire.getSwiftCode(), wire.getAmount());
        } else if (tx instanceof RefundRequest refund && refund.getAmount() > 1000.0) {
            System.out.printf("[SUPERVISOR REVIEW] Refund %s for $%.2f flagged: %s%n",
                refund.getTxId(), refund.getAmount(), refund.getReason());
        } else {
            System.out.printf("[STANDARD LOG] Processed %s for $%.2f%n", tx.getTxId(), tx.getAmount());
        }
    }

    public static void main(String[] args) {
        auditTransaction(new WireTransfer("TX-001", 120000.0, "NCBKSA22"));
        auditTransaction(new RefundRequest("RF-809", 2500.0, "Damaged in transit"));
        auditTransaction(new WireTransfer("TX-002", 450.0, "NCBKSA22"));
    }
}`,
              output: `[HIGH RISK AUDIT] Wire TX-001 (SWIFT: NCBKSA22) exceeds limit: $120,000.00
[SUPERVISOR REVIEW] Refund RF-809 for $2,500.00 flagged: Damaged in transit
[STANDARD LOG] Processed TX-002 for $450.00`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "Pattern matching instanceof allows extracting SWIFT codes or refund reasons and applying conditional business rules simultaneously."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "تتيح مطابقة الأنماط استخراج أكواد التحويل وأسباب الاسترجاع وتطبيق القواعد المالية المعقدة في آن واحد بسلاسة تامة."
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
                "Mistake 1: Testing null with instanceof and expecting NullPointerException. 'null instanceof AnyClass' evaluates cleanly to false.",
                "خطأ 1: توقع حدوث خطأ عند فحص كائن فارغ null؛ فالمعامل يعيد false دائماً بأمان دون أي استثناء.",
                "Mistake 2: Confusing 'instanceof' with 'getClass() == Target.class'. 'instanceof' returns true for any subclass; 'getClass()' tests for exact equality.",
                "خطأ 2: الخلط بين instanceof و getClass()؛ فـ instanceof تعيد true للابن والجد، بينما getClass تطابق النوع بالمليمتر.",
                "Mistake 3: Trying to test against specific generic arguments like 'instanceof List<Integer>'. Generic parameters are erased at runtime; test against 'List<?>' instead."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Polymorphic Shape Area Aggregator (التحدي العملي: حاسبة المساحات متعددة الأشكال)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Create a polymorphic shape analyzer: 1) Class 'Circle' with 'double radius'; 2) Class 'Rectangle' with 'double width, height'; 3) Create a static method 'computeTotalArea(Object[] shapes)' that iterates through the array: if it's a Circle, add PI * r^2; if it's a Rectangle, add w * h; if it's null or other, skip it; 4) In main(), create an array with 1 Circle (r=3) and 1 Rectangle (w=4, h=5) and print the total area formatted to 2 decimals."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: صمم محللاً للمجسمات: 1) فئة Circle بنصف قطر radius؛ 2) فئة Rectangle بعرض width وارتفاع height؛ 3) دالة computeTotalArea(Object[] shapes) تتكرر على المصفوفة: إذا كان دائرة تجمع مساحتها، وإذا كان مستطيلاً تجمع مساحته، وتتجاهل غير ذلك؛ 4) في main احسب مساحة مصفوفة تحوي دائرة (نصف قطرها 3) ومستطيل (4 في 5) واعرض الإجمالي لأقرب خانتين."
            },
            {
              type: "code",
              language: "java",
              filename: "ShapeAggregatorChallenge.java",
              code: `public class ShapeAggregatorChallenge {
    static class Circle {
        double radius;
        Circle(double r) { this.radius = r; }
    }

    static class Rectangle {
        double width, height;
        Rectangle(double w, double h) { this.width = w; this.height = h; }
    }

    public static double computeTotalArea(Object[] shapes) {
        double total = 0.0;
        for (Object item : shapes) {
            if (item instanceof Circle c) {
                total += Math.PI * c.radius * c.radius;
            } else if (item instanceof Rectangle r) {
                total += r.width * r.height;
            }
        }
        return total;
    }

    public static void main(String[] args) {
        Object[] mixedShapes = {
            new Circle(3.0),
            new Rectangle(4.0, 5.0),
            "Non-shape dummy data",
            null
        };

        double totalArea = computeTotalArea(mixedShapes);
        System.out.printf("Computed Total Surface Area: %.2f%n", totalArea);
    }
}`,
              output: `Computed Total Surface Area: 48.27`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "Circle area = 3.14159 * 9 = 28.274; Rectangle area = 4 * 5 = 20. Total = 48.27. Pattern matching safely ignores the string and null entries."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "مساحة الدائرة 28.27 ومساحة المستطيل 20 والمجموع 48.27، وتخطت مطابقة الأنماط النص والقيمة الفارغة بأمان تام."
            }
          ],
          quiz: [
                    {
                              "id": "q1",
                              "question": "What is the primary runtime function of the 'instanceof' operator in Java?\n(ما هي الوظيفة الأساسية لمعامل التحقق من النوع instanceof أثناء وقت التشغيل في جافا؟)",
                              "options": [
                                        "It instantiates a new class dynamically.",
                                        "It verifies whether an object reference refers to an instance of a specific class, a subclass thereof, or an implementer of a specific interface.",
                                        "It measures the memory footprint of an object in bytes.",
                                        "It checks if two references point to the same memory address."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! The 'instanceof' comparison operator tests whether the object on the heap belongs to the specified type or any subtype/subinterface in its hierarchy. (يتحقق معامل instanceof في وقت التشغيل مما إذا كان الكائن ينتمي لنوع محدد أو لأي فئة فرعية موروثة منه أو يطبق واجهة معينة)."
                    },
                    {
                              "id": "q2",
                              "question": "What does the expression 'null instanceof AnyClass' evaluate to in Java?\n(إلى ماذا تؤدي نتيجة التعبير null instanceof AnyClass في جافا؟)",
                              "options": [
                                        "It throws a NullPointerException at runtime.",
                                        "It always evaluates to false without throwing any exception.",
                                        "It evaluates to true because null can be assigned to any reference type.",
                                        "It produces a compile-time syntax error."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! By language specification, testing a null reference with 'instanceof' always returns false safely, and NEVER throws a NullPointerException. (وفقاً لمواصفات لغة جافا، فحص القيمة الفارغة null بـ instanceof يعيد دائماً false بأمان تام ولا يرمي NullPointerException أبداً)."
                    },
                    {
                              "id": "q3",
                              "question": "Why does the expression '\"Hello\" instanceof Integer' fail at COMPILE TIME?\n(لماذا يفشل التعبير 'Hello' instanceof Integer في مرحلة التصريف Compile Time؟)",
                              "options": [
                                        "Because String has fewer letters than Integer.",
                                        "Because String and Integer are final classes in completely disjoint branches with no possibility of subtyping, allowing the compiler to reject it as provably impossible.",
                                        "Because Integer is a primitive wrapper.",
                                        "Because instanceof cannot be used on String."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! If the left operand's static type and the right operand's type have no inheritance or interface compatibility possible, the Java compiler flags an error: 'inconvertible types: java.lang.String cannot be cast to java.lang.Integer'. (يرفض المصرف التعبير تصريفياً لأن الفئتين منفصلتان تماماً ولا يمكن بأي حال لكائن String أن يرث أو يتحول إلى Integer)."
                    },
                    {
                              "id": "q4",
                              "question": "Given: class Dog extends Animal implements Pet {}\nIf we execute: Dog d = new Dog();\nWhich of the following instanceof checks evaluates to FALSE?",
                              "options": [
                                        "d instanceof Dog",
                                        "d instanceof Animal",
                                        "d instanceof Pet",
                                        "None of the above (all evaluate to true)"
                              ],
                              "correctIndex": 3,
                              "explanation": "Correct! All of the expressions evaluate to true. In Java, an object is an instance of its own class, all of its superclasses (including Animal and Object), and all interfaces it implements directly or transitively (Pet). (كافة الخيارات صحيحة وتعيد true؛ فالكائن يُعد نسخة من فئته ومن كافة فئات آبائه ومن جميع الواجهات التي يطبقها)."
                    },
                    {
                              "id": "q5",
                              "question": "How does 'obj instanceof Target' differ fundamentally from 'obj.getClass() == Target.class'?\n(بماذا يختلف obj instanceof Target جوهرياً عن المقارنة الصريحة obj.getClass() == Target.class؟)",
                              "options": [
                                        "There is no difference.",
                                        "instanceof returns true for instances of Target and ANY of its subclasses (polymorphic); getClass() checks for EXACT type equivalence, returning false for any subclasses.",
                                        "getClass() can check interfaces; instanceof cannot.",
                                        "instanceof throws an exception if obj is null."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! 'instanceof' is polymorphic and yields true for subtypes. 'getClass() == Target.class' strictly requires exact class equivalence and rejects any derived subtypes, which is critical in certain equals() implementations. (معامل instanceof متعدد الأشكال ويقبل الفئات الفرعية الموروثة، بينما المقارنة بـ getClass تفحص التطابق التام لنوع الفئة وترفض الفئات المشتقة)."
                    },
                    {
                              "id": "q6",
                              "question": "In Java 16+ Pattern Matching, what is the behavior of: if (obj instanceof String s)?\n(في مطابقة الأنماط في جافا 16، ما هو سلوك if (obj instanceof String s)؟)",
                              "options": [
                                        "It converts obj to String in memory permanently.",
                                        "If obj is a non-null instance of String, it evaluates to true and automatically binds the downcasted reference to pattern variable 's' inside the block.",
                                        "It requires a manual downcast on the next line.",
                                        "It compiles only in Java 8."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Pattern matching tests whether obj is an instance of String and, if true, automatically casts and assigns it to the pattern variable 's' within that conditional scope. (تفحص مطابقة الأنماط ما إذا كان الكائن نصاً غير فارغ، وإذا تحقق الشرط تربط الكائن المحول تلقائياً بالمتغير s داخل نطاق الشرط)."
                    },
                    {
                              "id": "q7",
                              "question": "Why does the condition 'if (obj instanceof String s || s.isEmpty())' cause a COMPILE-TIME ERROR?\n(لماذا يسبب الشرط if (obj instanceof String s || s.isEmpty()) خطأ تصريف صريح؟)",
                              "options": [
                                        "Because String does not have an isEmpty() method.",
                                        "Because with the logical OR operator (||), the right-hand operand is evaluated when the left operand is FALSE (meaning obj is NOT a String, so 's' is not in scope or bound).",
                                        "Because pattern matching is disabled for logical OR.",
                                        "Because isEmpty() returns a primitive."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! In 'A || B', operand B executes if A is false. But if 'obj instanceof String' is false, 's' is not bound and cannot exist! Thus, referencing 's' after '||' causes a compile-time error. In contrast, '&&' works because the right side only executes if the left is true. (مع معامل || يُنفذ الطرف الأيمن إذا كان الأيسر خاطئاً؛ وحينها لن يكون الكائن نصاً ولن يتوفر المتغير s في الذاكرة، مما يسبب خطأ تصريف فوري)."
                    },
                    {
                              "id": "q8",
                              "question": "What is printed by executing the following code?\n\nint[] numbers = {10, 20, 30};\nSystem.out.print((numbers instanceof int[]) + \" \");\nSystem.out.print((numbers instanceof Object) + \" \");\nSystem.out.print(numbers instanceof Object[]);",
                              "options": [
                                        "true true true",
                                        "true true false",
                                        "false true false",
                                        "Compile-time error"
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! An int[] is an instance of int[] and an instance of Object (all arrays are Objects). However, primitive arrays are NOT object arrays (int[] is not Object[]), so the third check is false. Output: 'true true false'. (مصفوفة الأعداد الأولية int[] هي كائن في جافا وترث Object، لكنها ليست مصفوفة كائنات Object[]، ولذا تكون النتيجة true true false)."
                    },
                    {
                              "id": "q9",
                              "question": "Why does the expression 'obj instanceof List<String>' fail compilation with 'illegal generic type for instanceof'?\n(لماذا يفشل التعبير obj instanceof List<String> تصريفياً بسبب خطأ نوع عام غير قانوني؟)",
                              "options": [
                                        "Because Java does not support Lists.",
                                        "Due to Generic Type Erasure, generic type parameters (like <String>) are removed at runtime, making it impossible for the JVM to inspect the element type.",
                                        "Because List is not an interface.",
                                        "Because String is final."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Due to type erasure, generic type arguments exist only at compile time and are stripped in bytecode. At runtime, the JVM only knows the raw type 'List<?>', so testing for 'List<String>' is illegal. (بسبب محو الأنواع العامة Type Erasure في جافا، تُحذف المعاملات مثل <String> عند التصريف ولا تبقى في الذاكرة، مما يمنع الـ JVM من فحص نوع عناصر القائمة وقت التشغيل)."
                    },
                    {
                              "id": "q10",
                              "question": "Why is an extensive chain of 'if (x instanceof TypeA) ... else if (x instanceof TypeB)' often considered an anti-pattern in OOP?\n(لماذا يعتبر استخدام سلاسل طويلة من if (x instanceof A) ... else if نمطاً سيئاً Anti-Pattern في البرمجة كائنية التوجه؟)",
                              "options": [
                                        "Because instanceof slows down network traffic.",
                                        "It violates polymorphism and the Open/Closed Principle; adding a new subtype requires searching and updating all hardcoded if-else chains instead of utilizing overridden polymorphic methods.",
                                        "Because JVMs crash when if-else chains exceed 5 branches.",
                                        "Because it makes objects immutable."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Relying on manual instanceof branching bypasses OOP polymorphism. Every time a new subclass is introduced, developers must modify every if-else chain throughout the codebase, violating OCP. Overridden methods or the Visitor pattern should be used instead. (الاعتماد على سلاسل instanceof يتجاوز ميزة تعدد الأشكال ويكسر مبدأ الفتح والإغلاق، إذ يتطلب إضافة فئة جديدة تعديل كافة جمل if اليدوية بدلاً من استدعاء دوال متعددة الأشكال)."
                    },
                    {
                              "id": "q11",
                              "question": "What is printed by the following code?\n\nObject val = Double.valueOf(42.5);\nif (val instanceof Number num) {\n    System.out.println(num.intValue());\n}",
                              "options": [
                                        "42.5",
                                        "42",
                                        "43",
                                        "ClassCastException"
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Double is a subclass of java.lang.Number. The instanceof pattern check succeeds, binding num as a Number reference. num.intValue() truncates the decimal portion and returns 42. (فئة Double ترث من Number؛ فينجح الفحص ويتحول المرجع لـ Number، ودالة intValue تحذف الكسور وتعيد 42)."
                    },
                    {
                              "id": "q12",
                              "question": "What happens in flow scoping with a negative instanceof check?\n\npublic static int getLength(Object obj) {\n    if (!(obj instanceof String str)) {\n        return -1;\n    }\n    return str.length();\n}",
                              "options": [
                                        "Compile-time error: 'str' cannot be resolved in 'str.length()'.",
                                        "It compiles cleanly; flow scoping recognizes that execution can only reach line 'return str.length()' if obj was indeed a String.",
                                        "Throws a runtime NullPointerException.",
                                        "Returns -1 for all inputs."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Java compiler flow analysis guarantees that if obj is not a String, the method returns early with -1. Therefore, in the subsequent lines, 'str' is guaranteed to be in scope, non-null, and of type String. (تحليل مسار الكود في جافا يضمن أن السطر التالي لن يُصل إليه إلا إذا كان الكائن نصاً فعلياً؛ ولذا يظل المتغير str متاحاً ومعرفاً بنجاح)."
                    },
                    {
                              "id": "q13",
                              "question": "In an enterprise asynchronous message processor, why is pattern matching for instanceof favored for event routing?\n(في معالج الرسائل غير المتزامنة بالمؤسسات، لماذا تُفضل مطابقة الأنماط لتوجيه الأحداث؟)",
                              "options": [
                                        "Because it encrypts message headers.",
                                        "It allows clean, type-safe extraction of specific domain event payloads (e.g. OrderCancelledEvent) without verbose casting, reducing errors and improving readability.",
                                        "Because it forces events to be processed sequentially.",
                                        "It eliminates the need for message queues."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Pattern matching enables clean, concise dispatching of heterogeneous message payloads directly into typed variables without messy boilerplate downcasting. (مطابقة الأنماط تتيح استخراج وتوجيه أنواع الرسائل المختلفة مباشرة إلى متغيرات نوعية آمنة دون الحاجة لكتابة كود تحويل معقد ومكرر)."
                    },
                    {
                              "id": "q14",
                              "question": "Consider this interface hierarchy:\n\ninterface Alpha {}\ninterface Beta extends Alpha {}\nclass Gamma implements Beta {}\n\nObject ref = new Gamma();\nboolean r1 = ref instanceof Alpha;\nboolean r2 = ref instanceof Beta;\nSystem.out.println(r1 + \" \" + r2);",
                              "options": [
                                        "true false",
                                        "false true",
                                        "true true",
                                        "false false"
                              ],
                              "correctIndex": 2,
                              "explanation": "Correct! Gamma implements Beta, and Beta extends Alpha. Thus, Gamma transitively implements Alpha. Both checks evaluate to true, printing 'true true'. (تطبق Gamma الواجهة Beta التي ترث بدورها Alpha؛ فيكون كائن Gamma محققاً لكلا الواجهتين بالتبعية وتكون النتيجة true true)."
                    },
                    {
                              "id": "q15",
                              "question": "What is printed by running the following program?\n\npublic class InstanceDemo {\n    public static void main(String[] args) {\n        Object text = null;\n        if (text instanceof String s) {\n            System.out.print(\"YES \");\n        } else {\n            System.out.print(\"NO \");\n        }\n    }\n}",
                              "options": [
                                        "YES",
                                        "NO ",
                                        "NullPointerException",
                                        "Compile-time error"
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! When testing a null reference, 'instanceof' evaluates to false safely without throwing a NullPointerException. The else branch executes, printing 'NO '. (عند فحص مرجع يحمل null بـ instanceof يعيد الشرط false فوراً دون أي استثناء، فينفذ مسار else ويطبع NO )."
                    }
          ]
        }
      ]
    },

    /* ==========================================================================
       TOPIC 30: Object Class
       ========================================================================== */
    {
      id: "object-class",
      title: "30. Object Class",
      description: "Comprehensive Guide to java.lang.Object: The root of the Java class hierarchy, contracts for toString(), equals(), hashCode(), getClass(), clone(), and thread synchronization methods.",
      lessons: [
        {
          id: "object-class-mastery",
          title: "Complete Guide to the Object Class",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "Understanding java.lang.Object in Java (فهم فئة Object الأساسية في جافا)"
            },
            {
              type: "paragraph",
              text: "In Java, 'java.lang.Object' is the cosmic root of the entire class hierarchy. Every single class in Java (including user-defined classes, library classes, and even array types) directly or indirectly inherits from Object. If a class does not explicitly specify a superclass with 'extends', the Java compiler automatically inserts 'extends java.lang.Object'."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "فئة 'java.lang.Object' في جافا هي الجذر الكوني الأساسي لكافة الفئات في لغة جافا بلا استثناء. ترث كل فئة (سواء كانت فئة مخصصة يكتبها المطور، أو فئة من مكتبات جافا، أو حتى مصفوفات البيانات) من فئة Object إما بشكل مباشر أو غير مباشر. إذا لم تكتب 'extends' صراحة، يضيف المترجم تلقائياً 'extends java.lang.Object'."
            },
            {
              type: "paragraph",
              text: "Core Methods Provided by Object: 1) toString(): Returns a text representation of the object; 2) equals(Object obj): Tests logical equivalence; 3) hashCode(): Returns an integer hash for hash-based collections; 4) getClass(): Returns runtime class metadata; 5) clone(): Creates a field-by-field copy; 6) wait(), notify(), notifyAll(): Core thread concurrency primitives."
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
              text: "Example 1: The Default Object Implementation (المثال 1: التطبيق الافتراضي لفئة Object)"
            },
            {
              type: "paragraph",
              text: "Every class inherits toString(), hashCode(), and getClass() from Object automatically."
            },
            {
              type: "code",
              language: "java",
              filename: "DefaultObjectDemo.java",
              code: `public class DefaultObjectDemo {
    static class PlainEntity {
        // Automatically extends java.lang.Object
    }

    public static void main(String[] args) {
        PlainEntity entity = new PlainEntity();

        // Default toString(): ClassName@HexHashCode
        System.out.println("Default toString(): " + entity.toString());

        // Default hashCode(): memory-derived integer
        System.out.println("Default hashCode(): " + entity.hashCode());

        // Runtime Class reflection
        System.out.println("Exact Class:        " + entity.getClass().getName());
    }
}`,
              output: `Default toString(): DefaultObjectDemo$PlainEntity@7a81197d
Default hashCode(): 2055281021
Exact Class:        DefaultObjectDemo$PlainEntity`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "Without writing a single line of code inside PlainEntity, it inherits 11 fundamental methods from java.lang.Object."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "دون كتابة أي كود داخل الفئة، ورثت الفئة تلقائياً 11 دالة أساسية من java.lang.Object بما فيها toString و hashCode."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Overriding toString() for Clean Representation (المثال 2: تجاوز دالة toString لعرض أنيق)"
            },
            {
              type: "paragraph",
              text: "Replacing the cryptic default memory hash with human-readable diagnostic strings."
            },
            {
              type: "code",
              language: "java",
              filename: "ToStringOverrideDemo.java",
              code: `public class ToStringOverrideDemo {
    static class UserAccount {
        private final String username;
        private final String role;

        UserAccount(String u, String r) {
            this.username = u;
            this.role = r;
        }

        @Override
        public String toString() {
            return "UserAccount[username='" + username + "', role='" + role + "']";
        }
    }

    public static void main(String[] args) {
        UserAccount user = new UserAccount("nasser_admin", "SUPERUSER");

        // Automatically calls overridden toString()
        System.out.println("User details: " + user);
    }
}`,
              output: `User details: UserAccount[username='nasser_admin', role='SUPERUSER']`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "Overriding toString() gives logging and debugging tools meaningful text descriptions when printing objects."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "تجاوز دالة toString يوفر نصوصاً واضحة ومقروءة للمطور وأدوات التسجيل وسجلات الأخطاء بدلاً من العناوين الغامضة."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Identity Equality (==) vs Logical Equality (.equals()) (المثال 3: المقارنة بالهوية مقابل المقارنة المنطقية)"
            },
            {
              type: "paragraph",
              text: "'==' checks if both references point to the same memory address; '.equals()' checks if content is logically equal."
            },
            {
              type: "code",
              language: "java",
              filename: "EqualityComparisonDemo.java",
              code: `public class EqualityComparisonDemo {
    public static void main(String[] args) {
        String s1 = new String("Saudi");
        String s2 = new String("Saudi");

        // Reference / Identity equality: different memory locations
        System.out.println("s1 == s2:      " + (s1 == s2));

        // Logical / Content equality: same sequence of characters
        System.out.println("s1.equals(s2): " + s1.equals(s2));
    }
}`,
              output: `s1 == s2:      false
s1.equals(s2): true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "'==' compares heap pointers (different objects return false). 'equals()' compares the logical content, returning true."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "المعامل == يقارن عناوين الذاكرة للكائنين، بينما دالة equals() تقارن المحتوى المنطقي للأحرف فتعيد true."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Overriding equals() with Full Contract Adherence (المثال 4: تجاوز دالة equals وفق المعايير الرسمية)"
            },
            {
              type: "paragraph",
              text: "Writing a robust equals() method honoring Reflexive, Symmetric, Transitive, and Consistent properties."
            },
            {
              type: "code",
              language: "java",
              filename: "RobustEqualsDemo.java",
              code: `import java.util.Objects;

public class RobustEqualsDemo {
    static class Passport {
        private final String passportNumber;
        private final String countryCode;

        Passport(String num, String country) {
            this.passportNumber = num;
            this.countryCode = country;
        }

        @Override
        public boolean equals(Object o) {
            // 1. Reflexive: self-check
            if (this == o) return true;
            // 2. Non-nullity & Type compatibility check
            if (!(o instanceof Passport passport)) return false;
            // 3. Field equivalence check
            return Objects.equals(passportNumber, passport.passportNumber) &&
                   Objects.equals(countryCode, passport.countryCode);
        }
    }

    public static void main(String[] args) {
        Passport p1 = new Passport("KSA-9901", "SA");
        Passport p2 = new Passport("KSA-9901", "SA");
        Passport p3 = new Passport("UAE-5512", "AE");

        System.out.println("p1.equals(p2): " + p1.equals(p2));
        System.out.println("p1.equals(p3): " + p1.equals(p3));
        System.out.println("p1.equals(null): " + p1.equals(null));
    }
}`,
              output: `p1.equals(p2): true
p1.equals(p3): false
p1.equals(null): false`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "Following the 3 standard steps ensures equals() obeys the Java Language Specification contracts without crashing on null or foreign types."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "اتباع الخطوات الثلاث القياسية (فحص الذات، فحص النوع، ومقارنة الحقول) يضمن تطبيق معايير جافا الرسمية للمساواة بأمان."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: The Sacred Contract between equals() and hashCode() (المثال 5: العقد الإلزامي بين equals و hashCode)"
            },
            {
              type: "paragraph",
              text: "RULE: If two objects are equal according to equals(), they MUST have the same hashCode()!"
            },
            {
              type: "code",
              language: "java",
              filename: "EqualsHashCodeContractDemo.java",
              code: `import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

public class EqualsHashCodeContractDemo {
    static class BrokenKey {
        String id;
        BrokenKey(String id) { this.id = id; }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (!(o instanceof BrokenKey b)) return false;
            return Objects.equals(id, b.id);
        }
        // FORGOT TO OVERRIDE hashCode()!
    }

    static class FixedKey {
        String id;
        FixedKey(String id) { this.id = id; }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (!(o instanceof FixedKey f)) return false;
            return Objects.equals(id, f.id);
        }

        @Override
        public int hashCode() {
            return Objects.hash(id); // Synchronized with equals()
        }
    }

    public static void main(String[] args) {
        Set<BrokenKey> brokenSet = new HashSet<>();
        brokenSet.add(new BrokenKey("USER_100"));
        System.out.println("BrokenKey retrieved from HashSet: " +
            brokenSet.contains(new BrokenKey("USER_100"))); // Prints false!

        Set<FixedKey> fixedSet = new HashSet<>();
        fixedSet.add(new FixedKey("USER_100"));
        System.out.println("FixedKey retrieved from HashSet:  " +
            fixedSet.contains(new FixedKey("USER_100"))); // Prints true!
    }
}`,
              output: `BrokenKey retrieved from HashSet: false
FixedKey retrieved from HashSet:  true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "Failing to override hashCode() causes HashSets and HashMaps to store objects in mismatched hash buckets, making lookups fail completely."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "نسيان تجاوز hashCode يؤدي إلى ضياع الكائنات داخل الـ HashSet والـ HashMap لأنها تُخزن في خانات تجزئة مختلفة رغم تساوي محتواها."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Using getClass() to Inspect Runtime Metadata (المثال 6: استخراج بيانات الفئة عبر getClass)"
            },
            {
              type: "paragraph",
              text: "Retrieving the java.lang.Class descriptor of any object at runtime."
            },
            {
              type: "code",
              language: "java",
              filename: "GetClassReflectionDemo.java",
              code: `public class GetClassReflectionDemo {
    public static void inspect(Object obj) {
        Class<?> clazz = obj.getClass();
        System.out.println("Simple Name:     " + clazz.getSimpleName());
        System.out.println("Canonical Name:  " + clazz.getCanonicalName());
        System.out.println("Superclass Name: " + clazz.getSuperclass().getName());
        System.out.println("Is Array?        " + clazz.isArray());
    }

    public static void main(String[] args) {
        inspect("Hello World");
        System.out.println("----------------------------------------");
        inspect(new int[]{1, 2, 3});
    }
}`,
              output: `Simple Name:     String
Canonical Name:  java.lang.String
Superclass Name: java.lang.Object
Is Array?        false
----------------------------------------
Simple Name:     int[]
Canonical Name:  int[]
Superclass Name: java.lang.Object
Is Array?        true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "getClass() is a native final method in Object, providing the reflection gateway to discover constructors, annotations, and superclasses."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "دالة getClass() دالة نهائية في Object تفتح باب الانعكاس البرمجي (Reflection) لمعرفة اسم الفئة والأب ومواصفات الكائن أثناء التشغيل."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Object Cloning with Cloneable Interface (المثال 7: استنساخ الكائنات مع واجهة Cloneable)"
            },
            {
              type: "paragraph",
              text: "Implementing shallow cloning by overriding Object.clone() and implementing Cloneable."
            },
            {
              type: "code",
              language: "java",
              filename: "ObjectCloneDemo.java",
              code: `public class ObjectCloneDemo {
    static class ServerConfig implements Cloneable {
        String host;
        int port;

        ServerConfig(String h, int p) { this.host = h; this.port = p; }

        @Override
        public ServerConfig clone() {
            try {
                // Calls Object.clone() to perform shallow bitwise field copy
                return (ServerConfig) super.clone();
            } catch (CloneNotSupportedException e) {
                throw new AssertionError();
            }
        }
    }

    public static void main(String[] args) {
        ServerConfig primary = new ServerConfig("10.0.0.1", 8080);
        ServerConfig replica = primary.clone(); // Cloned!

        replica.host = "10.0.0.2"; // Mutate clone only

        System.out.println("Primary Host: " + primary.host + ":" + primary.port);
        System.out.println("Replica Host: " + replica.host + ":" + replica.port);
    }
}`,
              output: `Primary Host: 10.0.0.1:8080
Replica Host: 10.0.0.2:8080`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "super.clone() creates a direct shallow field copy. A class must implement Cloneable, otherwise super.clone() throws CloneNotSupportedException."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "تنشئ super.clone() نسخة مطابقة من الحقول، ويشترط تطبيق واجهة Cloneable وإلا رمت الدالة استثناء CloneNotSupportedException."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Shallow Copy vs Deep Copy in Cloning (المثال 8: النسخ السطحي مقابل النسخ العميق Deep Copy)"
            },
            {
              type: "paragraph",
              text: "Shallow copying shares internal mutable references; deep copying duplicates them."
            },
            {
              type: "code",
              language: "java",
              filename: "DeepCloneDemo.java",
              code: `public class DeepCloneDemo {
    static class Address implements Cloneable {
        String city;
        Address(String c) { this.city = c; }
        @Override public Address clone() { return new Address(city); }
    }

    static class CustomerProfile implements Cloneable {
        String name;
        Address address;

        CustomerProfile(String n, Address a) { this.name = n; this.address = a; }

        // Deep copy implementation
        @Override
        public CustomerProfile clone() {
            try {
                CustomerProfile copy = (CustomerProfile) super.clone();
                // Explicitly clone mutable nested objects!
                copy.address = this.address.clone();
                return copy;
            } catch (CloneNotSupportedException e) {
                throw new AssertionError();
            }
        }
    }

    public static void main(String[] args) {
        CustomerProfile original = new CustomerProfile("Fahad", new Address("Riyadh"));
        CustomerProfile cloned = original.clone();

        cloned.address.city = "Dammam"; // Mutate clone's city

        System.out.println("Original City: " + original.address.city);
        System.out.println("Cloned City:   " + cloned.address.city);
    }
}`,
              output: `Original City: Riyadh
Cloned City:   Dammam`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "By explicitly cloning 'this.address.clone()', modifying the cloned address does not corrupt the original profile's city."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "النسخ العميق يعيد استنساخ الكائنات الداخلية المتداخلة كالعنوان، حتى لا يؤدي تعديل النسخة إلى الإضرار بالكائن الأصلي."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Thread Coordination: wait(), notify(), notifyAll() (المثال 9: مزامنة الخيوط عبر wait و notify)"
            },
            {
              type: "paragraph",
              text: "Object hosts the core thread monitor primitives, callable only inside synchronized blocks."
            },
            {
              type: "code",
              language: "java",
              filename: "ObjectWaitNotifyDemo.java",
              code: `public class ObjectWaitNotifyDemo {
    static class SharedSignal {
        private boolean ready = false;

        public synchronized void produce() {
            System.out.println("[Producer] Preparing data payload...");
            ready = true;
            System.out.println("[Producer] Notifying waiting consumer...");
            notify(); // Wakes up one thread waiting on this object's monitor
        }

        public synchronized void consume() throws InterruptedException {
            while (!ready) {
                System.out.println("[Consumer] Data not ready. Releasing lock and waiting...");
                wait(); // Releases lock and suspends thread
            }
            System.out.println("[Consumer] Resumed! Consuming ready data.");
        }
    }

    public static void main(String[] args) throws Exception {
        SharedSignal signal = new SharedSignal();

        Thread consumerThread = new Thread(() -> {
            try { signal.consume(); } catch (InterruptedException ignored) {}
        });

        Thread producerThread = new Thread(() -> {
            try {
                Thread.sleep(50);
                signal.produce();
            } catch (InterruptedException ignored) {}
        });

        consumerThread.start();
        producerThread.start();

        consumerThread.join();
        producerThread.join();
    }
}`,
              output: `[Consumer] Data not ready. Releasing lock and waiting...
[Producer] Preparing data payload...
[Producer] Notifying waiting consumer...
[Consumer] Resumed! Consuming ready data.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "wait() and notify() are defined in java.lang.Object because every object in Java can act as an intrinsic monitor lock for thread synchronization."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "عُرّفت wait و notify داخل Object لأن كل كائن في جافا يمتلك قفلاً داخلياً (Intrinsic Monitor) يُستخدم لمزامنة خيوط المعالجة."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Modern Records Auto-generate Object Methods (المثال 10: سجلات جافا الحديثة Record وتوليد دوال Object)"
            },
            {
              type: "paragraph",
              text: "Java Records automatically generate canonical implementations of equals(), hashCode(), and toString()."
            },
            {
              type: "code",
              language: "java",
              filename: "RecordObjectMethodsDemo.java",
              code: `public class RecordObjectMethodsDemo {
    // Record implicitly inherits from java.lang.Record (which extends Object)
    record Coordinate(double latitude, double longitude) {}

    public static void main(String[] args) {
        Coordinate c1 = new Coordinate(24.7136, 46.6753);
        Coordinate c2 = new Coordinate(24.7136, 46.6753);

        // Auto-generated toString()
        System.out.println("Auto toString():  " + c1);

        // Auto-generated equals() based on all components
        System.out.println("Auto equals():    " + c1.equals(c2));

        // Auto-generated hashCode() honoring the contract
        System.out.println("Auto hashCode():  " + (c1.hashCode() == c2.hashCode()));
    }
}`,
              output: `Auto toString():  Coordinate[latitude=24.7136, longitude=46.6753]
Auto equals():    true
Auto hashCode():  true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "Records eliminate boilerplate by generating correct, mathematically compliant equals(), hashCode(), and toString() implementations automatically."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "تلغي سجلات Record الحديثة كتابة الأكواد المتكررة وتولد تلقائياً دوال equals و hashCode و toString مطابقة للمواصفات بدقة."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Enterprise Financial Value Object with Strict Object Overrides (المثال 11: كائن القيم المالية المؤسسي المطابق للعقود)"
            },
            {
              type: "paragraph",
              text: "Advanced: Immutable Money value object implementing perfect equals(), hashCode(), and toString() contracts."
            },
            {
              type: "code",
              language: "java",
              filename: "MoneyValueObjectMaster.java",
              code: `import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

public class MoneyValueObjectMaster {
    public static final class Money {
        private final long cents; // Stored in cents to avoid floating point inaccuracies
        private final String currencyCode;

        public Money(double amount, String currency) {
            this.cents = Math.round(amount * 100);
            this.currencyCode = Objects.requireNonNull(currency, "Currency code required");
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (!(o instanceof Money money)) return false;
            return this.cents == money.cents &&
                   this.currencyCode.equalsIgnoreCase(money.currencyCode);
        }

        @Override
        public int hashCode() {
            return Objects.hash(cents, currencyCode.toUpperCase());
        }

        @Override
        public String toString() {
            return String.format("%s %.2f", currencyCode.toUpperCase(), cents / 100.0);
        }
    }

    public static void main(String[] args) {
        Money price1 = new Money(149.50, "SAR");
        Money price2 = new Money(149.50, "sar");

        System.out.println("String representation: " + price1);
        System.out.println("Are both prices equal? " + price1.equals(price2));

        // Testing in HashMap key lookups
        Map<Money, String> productCatalog = new HashMap<>();
        productCatalog.put(price1, "Premium Annual Subscription");

        System.out.println("Lookup by equivalent price: " + productCatalog.get(price2));
    }
}`,
              output: `String representation: SAR 149.50
Are both prices equal? true
Lookup by equivalent price: Premium Annual Subscription`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "Because equals() and hashCode() are aligned and handle case-insensitive currency codes, price2 successfully finds the entry placed by price1 in the HashMap."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "لتوافق دالتي equals و hashCode وتعاملهما مع العملة بحيادية، نجح البحث في HashMap باستخدام price2 لاسترجاع القيمة التي خُزنت بـ price1."
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
                "Mistake 1: Overriding equals() without overriding hashCode(). This breaks HashSets and HashMaps, resulting in missing elements and memory leaks.",
                "خطأ 1: تجاوز equals دون تجاوز hashCode؛ مما يعطل مجموعات وقواميس التجزئة ويجعل استرجاع العناصر مستحيلاً.",
                "Mistake 2: Writing 'public boolean equals(MyClass obj)' instead of 'public boolean equals(Object obj)'. The former is method OVERLOADING, not overriding, so collections will bypass it.",
                "خطأ 2: تمرير نوع الفئة بدلاً من Object لدالة equals؛ فهذا يُعد تحميل زائد (Overloading) وليس تجاوزاً ولا تستخدمه المجموعات.",
                "Mistake 3: Relying on the deprecated finalize() method for cleanup. finalize() is officially deprecated; use AutoCloseable and try-with-resources instead."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Complete Customer Entity with Object Contract (التحدي العملي: كيان العميل مع تطبيق عقود Object)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Build an entity 'Customer': 1) Fields: 'int customerId' and 'String email'; 2) Constructor initializing both; 3) Override 'toString()' returning 'Customer[id=<id>, email=<email>]'; 4) Override 'equals(Object o)' comparing customerId and email; 5) Override 'hashCode()' hashing both fields; 6) Test in main() by putting two equal customer objects in a HashSet and demonstrating that the set size is 1 (no duplicates)."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: ابنِ كيان 'Customer': 1) حقول: customerId و email؛ 2) مشيد لتهيئتهما؛ 3) تجاوز toString لتعيد التنسيق المطلوب؛ 4) تجاوز equals بمقارنة الحقلين؛ 5) تجاوز hashCode بتشفير الحقلين؛ 6) اختبر في main بوضع كائنين متطابقين في HashSet وتأكد أن حجم المجموعة 1 فقط دون تكرار."
            },
            {
              type: "code",
              language: "java",
              filename: "CustomerEntityChallenge.java",
              code: `import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

public class CustomerEntityChallenge {
    static class Customer {
        private final int customerId;
        private final String email;

        public Customer(int id, String email) {
            this.customerId = id;
            this.email = email;
        }

        @Override
        public String toString() {
            return "Customer[id=" + customerId + ", email=" + email + "]";
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (!(o instanceof Customer c)) return false;
            return this.customerId == c.customerId && Objects.equals(this.email, c.email);
        }

        @Override
        public int hashCode() {
            return Objects.hash(customerId, email);
        }
    }

    public static void main(String[] args) {
        Customer c1 = new Customer(101, "customer@saudi.com");
        Customer c2 = new Customer(101, "customer@saudi.com");

        System.out.println("c1 toString: " + c1);
        System.out.println("c1 equals c2: " + c1.equals(c2));

        Set<Customer> set = new HashSet<>();
        set.add(c1);
        set.add(c2);

        System.out.println("HashSet size (Duplicates rejected): " + set.size());
    }
}`,
              output: `c1 toString: Customer[id=101, email=customer@saudi.com]
c1 equals c2: true
HashSet size (Duplicates rejected): 1`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "By overriding both equals() and hashCode() consistently, the HashSet correctly recognizes c1 and c2 as logically identical, preventing duplicate entries."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "بتطبيق عقدي equals و hashCode بتناسق تام، أدركت مجموعة HashSet أن c1 و c2 متطابقان ومنعت تكرار العميل ليبقى حجم المجموعة 1 فقط."
            }
          ],
          quiz: [
                    {
                              "id": "q1",
                              "question": "What is the structural role of java.lang.Object in the Java programming language?\n(ما هو الدور البنيوي لفئة java.lang.Object في لغة برمجة جافا؟)",
                              "options": [
                                        "It is an optional utility interface.",
                                        "It is the root superclass of all class hierarchies in Java; every class directly or indirectly extends Object.",
                                        "It is only the superclass of primitive data types.",
                                        "It is a specialized class for graphical user interfaces."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! java.lang.Object sits at the absolute pinnacle of Java's class hierarchy. Every class in Java, including arrays and user-defined classes, inherits from Object. (فئة Object هي الجذر الأساسي لكافة الفئات في جافا؛ فكل فئة يتم إنشاؤها ترث من Object إما مباشرة أو عبر فئات وسيطة)."
                    },
                    {
                              "id": "q2",
                              "question": "What is the default implementation of the equals(Object obj) method in java.lang.Object?\n(ما هو السلوك والتطبيق الافتراضي لدالة equals في فئة java.lang.Object؟)",
                              "options": [
                                        "It compares all instance variable values.",
                                        "It performs reference identity comparison (this == obj), evaluating to true ONLY if both references point to the exact same memory address on the heap.",
                                        "It compares the hash codes of both objects.",
                                        "It always returns true."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! In the default java.lang.Object class, equals() simply executes 'return (this == obj);'. It evaluates logical equality solely based on whether the references point to the exact same object in memory. (التطبيق الافتراضي لدالة equals في فئة Object يقارن الهوية المرجعية this == obj فقط، ولا يعيد true إلا إذا كان المرجعان يشيران لنفس الكائن في الذاكرة)."
                    },
                    {
                              "id": "q3",
                              "question": "What is the default string format returned by Object.toString() if not overridden?\n(ما هو التنسيق النصي الافتراضي الذي تعيده دالة Object.toString() إذا لم يتم تجاوزها؟)",
                              "options": [
                                        "The serialized JSON representation of the object.",
                                        "getClass().getName() + '@' + Integer.toHexString(hashCode())",
                                        "The memory pointer address in decimal format.",
                                        "An empty string \"\""
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! The default implementation of toString() in Object returns the fully qualified class name, followed by an '@' sign, followed by the unsigned hexadecimal representation of the object's hash code. (التنسيق الافتراضي لدالة toString يعيد اسم الفئة الكامل متبوعاً بعلامة @ ثم كود التجزئة بالنظام السداسي عشر Hexadecimal)."
                    },
                    {
                              "id": "q4",
                              "question": "What does the sacred contract between equals() and hashCode() mandate?\n(ما الذي ينص عليه العقد الإلزامي الصارم بين دالتي equals و hashCode في جافا؟)",
                              "options": [
                                        "If two objects have the same hashCode, they MUST be equal according to equals().",
                                        "If two objects are equal according to equals(), they MUST produce the exact same integer hashCode value.",
                                        "hashCode() must always return a positive number.",
                                        "equals() must never be overridden."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! The contract requires that if x.equals(y) is true, then x.hashCode() == y.hashCode() MUST be true. The inverse is not required: two unequal objects can have the same hash code (known as a hash collision). (ينص العقد على أنه إذا تساوى كائنان منطقياً بـ equals، وجب حتماً أن يتطابق كود التجزئة hashCode لهما؛ بينما تشابه الـ hash لا يعني بالضرورة تساويهما لوجود تصادمات)."
                    },
                    {
                              "id": "q5",
                              "question": "Why is the getClass() method in java.lang.Object declared as 'public final native Class<?>'?\n(لماذا صُرحت دالة getClass في فئة Object بأنها نهائية final ومحلية native؟)",
                              "options": [
                                        "To prevent subclasses from overriding it and forging their runtime type identity.",
                                        "Because it returns an integer.",
                                        "To make the JVM garbage collect the class.",
                                        "So it can only be called from static methods."
                              ],
                              "correctIndex": 0,
                              "explanation": "Correct! Declaring getClass() as final prevents any subclass from overriding it. This guarantees that calling getClass() always returns the authentic, unforgeable runtime Class object representing the real type of the instance. (جعل دالة getClass نهائية final يمنع الفئات الفرعية من تجاوزها أو تزوير هويتها الحقيقية، مما يضمن دقة فحص الأنواع أثناء التشغيل)."
                    },
                    {
                              "id": "q6",
                              "question": "What marker interface must a class implement to prevent Object.clone() from throwing a CloneNotSupportedException?\n(ما هي الواجهة الدلالية Marker Interface التي يجب على الفئة تطبيقها لمنع clone من رمي استثناء؟)",
                              "options": [
                                        "java.io.Serializable",
                                        "java.lang.Cloneable",
                                        "java.lang.Comparable",
                                        "java.lang.AutoCloseable"
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Object.clone() checks at runtime whether the invoking object implements the Cloneable interface. If it does not, a CloneNotSupportedException is thrown. (يجب على الفئة تطبيق واجهة Cloneable وإلا قامت دالة clone برمي استثناء CloneNotSupportedException وقت التشغيل)."
                    },
                    {
                              "id": "q7",
                              "question": "What is the difference between a Shallow Copy and a Deep Copy when cloning an object?\n(ما هو الفرق بين النسخ السطحي Shallow Copy والنسخ العميق Deep Copy عند استنساخ كائن؟)",
                              "options": [
                                        "Shallow copy copies only strings; deep copy copies only integers.",
                                        "A shallow copy copies field values directly, meaning referenced child objects are shared between the original and clone; a deep copy recursively duplicates child objects so both copies are fully independent.",
                                        "Deep copy stores objects on the hard drive.",
                                        "Shallow copy is thread-safe; deep copy is not."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Object.clone() performs a shallow copy: primitive fields are copied by value, but references still point to the exact same child objects on the heap. A deep copy recursively duplicates all child objects, preventing mutations in one copy from affecting the other. (النسخ السطحي ينسخ قيم الحقول فقط فتشترك النسختان في نفس المراجع الفرعية، بينما النسخ العميق يستنسخ كافة الكائنات الداخلية تكرارياً لإنشاء نسخة مستقلة تماماً)."
                    },
                    {
                              "id": "q8",
                              "question": "Why must wait(), notify(), and notifyAll() be called from within a 'synchronized' block or method in Java?\n(لماذا يجب استدعاء دوال wait و notify و notifyAll من داخل سياق متزامن synchronized في جافا؟)",
                              "options": [
                                        "Because they are static methods.",
                                        "Because the executing thread must hold the object's intrinsic monitor lock; if not held, the JVM throws an IllegalMonitorStateException.",
                                        "Because synchronization allocates thread memory.",
                                        "To prevent class loading."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! The wait() and notify() mechanisms are based on the intrinsic monitor lock of the object. A thread must own the lock before it can release it (wait) or notify other threads waiting on that monitor. Failing to hold the lock throws IllegalMonitorStateException. (هذه الدوال تتعامل مع قفل المراقبة الخاص بالكائن Monitor Lock؛ وإذا حاول المسار استدعاءها دون امتلاك القفل يرمي الـ JVM استثناء IllegalMonitorStateException)."
                    },
                    {
                              "id": "q9",
                              "question": "Why are wait() and notify() declared on java.lang.Object rather than java.lang.Thread?\n(لماذا عُرفت دوال wait و notify داخل فئة Object وليس داخل فئة Thread؟)",
                              "options": [
                                        "Because Java threads do not have methods.",
                                        "Because synchronization locks and condition queues are properties of shared resources (the objects being accessed), not properties of the worker threads themselves.",
                                        "Because Thread is an abstract class.",
                                        "It was a compilation error in early Java that was never fixed."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Locks and wait sets in Java belong to individual shared data objects on the heap, not to threads. Any thread can wait on any object's monitor, so these methods are defined on Object. (أقفال التزامن وقوائم الانتظار تتبع موارد البيانات والكائنات المشتركة ذاتها وليس مسارات العمل، ولذا وُضعت في Object لتمكين أي كائن من العمل كقفل)."
                    },
                    {
                              "id": "q10",
                              "question": "Why was the finalize() method in java.lang.Object deprecated in Java 9 and marked for eventual removal?\n(لماذا تم إهمال دالة finalize في جافا 9 والتخطيط لإزالتها نهائياً من اللغة؟)",
                              "options": [
                                        "Because it was renamed to end().",
                                        "Because its execution timing is unpredictable, it incurs severe performance overhead, can resurrect dead objects, and is superseded by try-with-resources and Cleaner/PhantomReference.",
                                        "Because it only worked on Linux systems.",
                                        "Because finalizers cannot execute in parallel."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! The finalize() method provides no guarantees on when (or even if) it will run. It degrades GC performance and causes subtle resource leaks. Modern Java relies on AutoCloseable and try-with-resources for deterministic cleanup. (دالة finalize غير متوقعة في موعد تشغيلها وتسبب بطئاً شديداً في جامع القمامة وتؤدي لتسريب الموارد؛ واستُبدلت بنمط try-with-resources و AutoCloseable)."
                    },
                    {
                              "id": "q11",
                              "question": "What is printed by executing the following code?\n\nclass Item {\n    int code;\n    Item(int c) { this.code = c; }\n}\npublic class EqualityTest {\n    public static void main(String[] args) {\n        Item i1 = new Item(101);\n        Item i2 = new Item(101);\n        System.out.println(i1.equals(i2) + \" \" + (i1 == i2));\n    }\n}",
                              "options": [
                                        "true true",
                                        "true false",
                                        "false false",
                                        "false true"
                              ],
                              "correctIndex": 2,
                              "explanation": "Correct! Item does NOT override equals(), so it inherits Object's default equals(), which performs reference equality (this == obj). Because i1 and i2 are two distinct instances allocated at different heap locations, both i1.equals(i2) and i1 == i2 evaluate to false. (لم تتجاوز فئة Item دالة equals، فورثت التطبيق الافتراضي من Object الذي يقارن عناوين الذاكرة؛ وبما أنهما كائنان منفصلان فإن كلا المقارنتين تعيدان false false)."
                    },
                    {
                              "id": "q12",
                              "question": "Why should a domain entity's toString() method NEVER output unmasked passwords, private keys, or sensitive customer PII?\n(لماذا يجب ألا تقوم دالة toString لكائن بتسريب كلمات المرور أو المفاتيح الحساسة أو بيانات العملاء؟)",
                              "options": [
                                        "Because toString() cannot format strings longer than 20 characters.",
                                        "Because toString() is frequently called automatically by logging frameworks, APM monitors, and exception stack traces, leading to credential leaks in application log files.",
                                        "Because printing passwords causes a SecurityException at compile time.",
                                        "Because toString() is converted to binary."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Logging frameworks (Logback, Log4j) invoke toString() when logging objects. Exposing sensitive credentials or PII in toString() leads to major security and compliance violations when logs are stored or monitored. (تستدعي أطر التسجيل logging دالة toString تلقائياً؛ فإذا احتوت على بيانات حساسة ككلمات المرور تسربت إلى سجلات النظام وسببت خروقات أمنية خطيرة)."
                    },
                    {
                              "id": "q13",
                              "question": "What happens if a class overrides equals() to compare content but FAILS to override hashCode()?\n(ماذا يحدث إذا تجاوزت الفئة دالة equals لمقارنة المحتوى لكنها نسيت تجاوز hashCode؟)",
                              "options": [
                                        "A compile-time error occurs.",
                                        "The class functions normally in Lists, but behaves erratically or loses objects when stored in hash-based collections like HashSet or HashMap.",
                                        "The JVM disables garbage collection for instances of that class.",
                                        "The class cannot be instantiated."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Violating the equals-hashCode contract causes two logically equal objects to produce different bucket hashes. A HashMap will place them in different buckets, meaning set.contains(equalObject) will return false. (نسيان hashCode يؤدي لإنتاج أرقام تجزئة مختلفة لكائنات متساوية؛ فتفشل مجموعات HashSet و HashMap في العثور على الكائنات واسترجاعها بالشكل الصحيح)."
                    },
                    {
                              "id": "q14",
                              "question": "In an enterprise persistence model, how does a BaseEntity typically implement equals() and hashCode()?\n(في نماذج البيانات المؤسسية، كيف تُطبق الفئة الأساسية BaseEntity دالتي equals و hashCode؟)",
                              "options": [
                                        "By comparing all mutable business fields in every query.",
                                        "By relying on an invariant unique identifier (such as a database primary key or UUID), ensuring consistent identity across state changes.",
                                        "By calling System.exit().",
                                        "By returning a random number."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! In persistence frameworks (like JPA/Hibernate), entity equality is anchored to a unique, immutable business key or generated UUID, ensuring identity remains consistent even when other fields are mutated. (في الأنظمة المؤسسية تُربط المساواة والـ hash بمعرف فريد وثابت كالمفتاح الأساسي أو الـ UUID لضمان ثبات الهوية حتى مع تعديل باقي حقول الكائن)."
                    },
                    {
                              "id": "q15",
                              "question": "Consider this code:\n\nclass Container implements Cloneable {\n    int[] data = {1, 2, 3};\n    @Override\n    public Container clone() throws CloneNotSupportedException {\n        return (Container) super.clone();\n    }\n}\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        Container c1 = new Container();\n        Container c2 = c1.clone();\n        c2.data[0] = 99;\n        System.out.println(c1.data[0]);\n    }\n}\n\nWhat is printed and why?",
                              "options": [
                                        "1, because c2 is an independent clone.",
                                        "99, because super.clone() performs a shallow copy, meaning c1 and c2 share the exact same 'data' array reference on the heap.",
                                        "0",
                                        "Throws CloneNotSupportedException"
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! super.clone() performs a shallow copy. The 'data' field is copied as a reference pointer, so both c1.data and c2.data point to the exact same int[] array on the heap. Mutating c2.data[0] mutates c1.data[0], printing 99. (الاستنساخ عبر super.clone ينسخ سطحياً فقط، فيشترك c1 و c2 في نفس مصفوفة data بالذاكرة؛ وتعديل c2 يؤثر مباشرة على c1 ويطبع 99)."
                    }
          ]
        }
      ]
    }
  ];
})();
