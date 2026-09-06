/**
 * Java Curriculum Module - Part 5
 * Topics:
 * 9. Java Packages / API
 * 10. Java Inheritance
 * 
 * 100% Offline, Pure JavaScript. Complete educational content with full bilingual (English & Arabic) explanations.
 */

(function () {
  'use strict';

  window.JAVA_TOPICS_PART5 = [
    /* ==========================================================================
       TOPIC 9: Java Packages / API
       ========================================================================== */
    {
      id: "java-packages-api",
      title: "9. Java Packages / API",
      description: "Mastering Java Packages & Standard API: Built-in packages, user packages, single/wildcard imports, static imports, collision resolution, java.time, and standard libraries.",
      lessons: [
        {
          id: "packages-api-mastery",
          title: "Complete Guide to Java Packages and Standard API",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "Understanding Java Packages and the Standard API (فهم الحزم والواجهات البرمجية في جافا)"
            },
            {
              type: "paragraph",
              text: "In Java, a package is a namespace that groups related classes, interfaces, and sub-packages. Packages serve three crucial architectural purposes: 1) Preventing naming conflicts (two classes named 'User' can coexist in different packages); 2) Controlling data access levels (package-private visibility); 3) Facilitating modular software organization. The Java Standard Library (Java API) provides thousands of pre-built, high-performance classes organized cleanly into packages such as java.lang, java.util, java.io, and java.time."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "الحزمة (Package) في جافا هي مساحة تسمية (Namespace) ومجلد تنظيمي يجمع الفئات والواجهات المترابطة معاً. تحقق الحزم ثلاثة أهداف برمجية كبرى: 1) منع تضارب الأسماء (يمكن وجود فئتين بنفس الاسم في حزمتين مختلفتين)؛ 2) التحكم في مستوى الرؤية والأمان؛ 3) تقسيم المشاريع الضخمة إلى وحدات منطقية مرتبة. كما توفر مكتبة جافا القياسية (Java API) آلاف الفئات الجاهزة المنظمة داخل حزم شهيرة مثل java.lang و java.util و java.time."
            },
            {
              type: "paragraph",
              text: "Classes in 'java.lang' are automatically imported into every Java source file without requiring an explicit 'import' statement."
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
              text: "Example 1: Implicit java.lang Auto-Import (المثال 1: حزمة java.lang المستوردة تلقائياً)"
            },
            {
              type: "paragraph",
              text: "Core utilities like Math, String, and System are ready to use out of the box."
            },
            {
              type: "code",
              language: "java",
              filename: "JavaLangDemo.java",
              code: `public class JavaLangDemo {
    public static void main(String[] args) {
        // No import statement needed for java.lang classes!
        String title = "Java Platform Standard Edition";
        int length = title.length();
        double squareRoot = Math.sqrt(144.0);
        int maxVal = Math.max(77, 99);

        System.out.println("String: " + title + " (Length: " + length + ")");
        System.out.println("Square root of 144: " + squareRoot);
        System.out.println("Max value: " + maxVal);
    }
}`,
              output: `String: Java Platform Standard Edition (Length: 31)
Square root of 144: 12.0
Max value: 99`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "Classes in java.lang (like String, Math, Integer, System) are imported implicitly by the Java compiler into every compilation unit."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "جميع فئات حزمة java.lang (مثل String و Math و System) يتم استيرادها تلقائياً من قبل المصرف دون الحاجة لكتابة أمر import."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Importing Specific Classes from java.util (المثال 2: استيراد فئة محددة من java.util)"
            },
            {
              type: "paragraph",
              text: "Importing only the exact class you need with clean, explicit syntax."
            },
            {
              type: "code",
              language: "java",
              filename: "SpecificImportDemo.java",
              code: `import java.util.Random; // Explicit single-class import

public class SpecificImportDemo {
    public static void main(String[] args) {
        Random random = new Random(42); // Seeded for predictable demonstration

        int diceRoll = random.nextInt(6) + 1; // 1 to 6
        double randomPercent = random.nextDouble() * 100.0;

        System.out.println("Dice Roll: " + diceRoll);
        System.out.printf("Random Percentage: %.2f%%%n", randomPercent);
    }
}`,
              output: `Dice Roll: 2
Random Percentage: 73.10%`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "Explicit imports ('import java.util.Random;') are preferred in production software because they clearly communicate dependencies to code readers."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "يُفضل استيراد الفئة المحددة بدقة (import java.util.Random;) في المشاريع الاحترافية لتوضيح الاعتماديات وجعل الكود سهلاً في التتبع."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Wildcard Import from a Package (المثال 3: استيراد الحزمة بالكامل باستخدام النجمة)"
            },
            {
              type: "paragraph",
              text: "Importing all classes belonging to a package using the '*' wildcard."
            },
            {
              type: "code",
              language: "java",
              filename: "WildcardImportDemo.java",
              code: `import java.util.*; // Imports all classes in java.util

public class WildcardImportDemo {
    public static void main(String[] args) {
        ArrayList<String> languages = new ArrayList<>();
        languages.add("Java");
        languages.add("Kotlin");
        languages.add("Scala");

        Collections.sort(languages); // From java.util.Collections

        System.out.println("Sorted JVM Languages: " + languages);
    }
}`,
              output: `Sorted JVM Languages: [Java, Kotlin, Scala]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "'import java.util.*' imports all classes directly inside java.util (it does not import sub-packages like java.util.concurrent)."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "الأمر 'import java.util.*' يتيح استخدام جميع فئات الحزمة دون استيراد الحزم الفرعية التابعة لها."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Resolving Name Collisions with Fully Qualified Names (المثال 4: حل تضارب الأسماء بالاسم الكامل)"
            },
            {
              type: "paragraph",
              text: "Handling two distinct classes with the identical simple name from different packages."
            },
            {
              type: "code",
              language: "java",
              filename: "NameCollisionDemo.java",
              code: `public class NameCollisionDemo {
    public static void main(String[] args) {
        // Both java.util.Date and java.sql.Date have the simple name 'Date'
        java.util.Date utilDate = new java.util.Date(1714529381000L);
        java.sql.Date sqlDate = new java.sql.Date(1714529381000L);

        System.out.println("Util Date: " + utilDate);
        System.out.println("SQL Date:  " + sqlDate);
    }
}`,
              output: `Util Date: Wed May 01 02:09:41 UTC 2024
SQL Date:  2024-05-01`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "When two imported packages share a class name (e.g. Date), you must write the Fully Qualified Class Name (e.g. java.util.Date) to resolve ambiguity."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "عند وجود فئتين بنفس الاسم في حزمتين مختلفتين، نستخدم الاسم المؤهل بالكامل (Fully Qualified Name) مثل java.util.Date لفك الالتباس."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Static Imports for Clean Mathematical Syntax (المثال 5: الاستيراد الساكن Static Import)"
            },
            {
              type: "paragraph",
              text: "Importing static fields and methods directly into the local namespace."
            },
            {
              type: "code",
              language: "java",
              filename: "StaticImportDemo.java",
              code: `import static java.lang.Math.PI;
import static java.lang.Math.pow;
import static java.lang.Math.round;

public class StaticImportDemo {
    public static void main(String[] args) {
        double radius = 7.0;

        // No need to prefix with 'Math.'!
        double circleArea = PI * pow(radius, 2);
        long roundedArea = round(circleArea);

        System.out.printf("Area with radius %.1f: %.4f%n", radius, circleArea);
        System.out.println("Rounded Area: " + roundedArea);
    }
}`,
              output: `Area with radius 7.0: 153.9380
Rounded Area: 154`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "'import static' allows invoking static members directly without class prefix qualifiers, making mathematical formulas compact and clean."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "يتيح 'import static' استخدام الدوال والمتغيرات الساكنة مباشرة بدون كتابة اسم الفئة قبلها، مما يسهل كتابة المعادلات الرياضية."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Modern Date & Time with java.time API (المثال 6: التاريخ والوقت الحديث في java.time)"
            },
            {
              type: "paragraph",
              text: "Using modern, immutable date and time classes introduced in Java 8+."
            },
            {
              type: "code",
              language: "java",
              filename: "JavaTimeApiDemo.java",
              code: `import java.time.LocalDate;
import java.time.Period;

public class JavaTimeApiDemo {
    public static void main(String[] args) {
        LocalDate releaseDate = LocalDate.of(1995, 5, 23); // Java 1.0 initial release
        LocalDate currentDate = LocalDate.of(2026, 1, 1);

        Period age = Period.between(releaseDate, currentDate);

        System.out.println("Java Initial Release: " + releaseDate);
        System.out.println("Reference Date:       " + currentDate);
        System.out.println("Java Age: " + age.getYears() + " years, " + age.getMonths() + " months.");
    }
}`,
              output: `Java Initial Release: 1995-05-23
Reference Date:       2026-01-01
Java Age: 30 years, 7 months.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "The modern java.time package provides thread-safe, immutable calendar representations replacing old legacy Date/Calendar classes."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "حزمة java.time الحديثة تقدم كائنات تاريخ ووقت ثابتة وآمنة تماماً، وتحل محل فئات التاريخ القديمة المعيبة في جافا."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Universally Unique Identifier with java.util.UUID (المثال 7: المعرفات الفريدة عالمياً)"
            },
            {
              type: "paragraph",
              text: "Generating cryptographically random 128-bit unique identifier keys."
            },
            {
              type: "code",
              language: "java",
              filename: "UuidDemo.java",
              code: `import java.util.UUID;

public class UuidDemo {
    public static void main(String[] args) {
        // Generating standard Version 4 Type-4 UUIDs
        UUID orderId1 = UUID.randomUUID();
        UUID orderId2 = UUID.randomUUID();

        System.out.println("Generated Order ID 1: " + orderId1);
        System.out.println("Generated Order ID 2: " + orderId2);
        System.out.println("Are IDs distinct? " + (!orderId1.equals(orderId2)));
    }
}`,
              output: `Generated Order ID 1: c53fbc77-51a2-4192-8a7e-5c9ac358415b
Generated Order ID 2: 7b89e210-99af-412d-b903-8812cde45001
Are IDs distinct? true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "UUID.randomUUID() generates a 128-bit pseudo-random unique token commonly used for tracking database records, sessions, and transaction keys."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "تولد الدالة UUID.randomUUID() رمزاً فريداً عالمياً بطول 128 بت يُستخدم كمعرف أساسي للعمليات وحسابات المستخدمين في قواعد البيانات."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: High-Precision Math with java.math.BigDecimal (المثال 8: الحسابات المالية الدقيقة)"
            },
            {
              type: "paragraph",
              text: "Avoiding binary floating-point roundoff errors in monetary transactions."
            },
            {
              type: "code",
              language: "java",
              filename: "BigDecimalDemo.java",
              code: `import java.math.BigDecimal;
import java.math.RoundingMode;

public class BigDecimalDemo {
    public static void main(String[] args) {
        // Double floating-point inaccuracy: 0.1 + 0.2 != 0.3
        double doubleSum = 0.1 + 0.2;
        System.out.println("Standard double math (0.1 + 0.2): " + doubleSum);

        // Precise financial math using BigDecimal strings
        BigDecimal itemPrice = new BigDecimal("0.10");
        BigDecimal shipping = new BigDecimal("0.20");
        BigDecimal exactSum = itemPrice.add(shipping);

        // Tax calculation: 15% VAT rounded half-up
        BigDecimal vatRate = new BigDecimal("0.15");
        BigDecimal tax = exactSum.multiply(vatRate).setScale(2, RoundingMode.HALF_UP);

        System.out.println("BigDecimal exact sum: " + exactSum);
        System.out.println("VAT Tax (15%):        " + tax);
    }
}`,
              output: `Standard double math (0.1 + 0.2): 0.30000000000000004
BigDecimal exact sum: 0.30
VAT Tax (15%):        0.05`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "Financial applications must avoid primitive doubles due to binary rounding quirks. java.math.BigDecimal delivers exact arbitrary-precision arithmetic."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "تتجنب التطبيقات المالية استخدام نوع double بسبب أخطاء التقريب الثنائي، وتعتمد على BigDecimal لإجراء حسابات دقيقة بدون أي هامش خطأ."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: User-Defined Package Declaration (المثال 9: تعريف الحزم المخصصة للمطور)"
            },
            {
              type: "paragraph",
              text: "Structure of a real-world enterprise package declaration."
            },
            {
              type: "code",
              language: "java",
              filename: "PackageDeclarationDemo.java",
              code: `// In a file located at /src/com/enterprise/billing/Invoice.java:
// package com.enterprise.billing;

public class PackageDeclarationDemo {
    static class SimulatedPackageClass {
        String packageHierarchy = "com.enterprise.billing";

        void displayInfo() {
            System.out.println("Class registered under namespace: " + packageHierarchy);
            System.out.println("Corresponds to directory path: src/com/enterprise/billing/");
        }
    }

    public static void main(String[] args) {
        SimulatedPackageClass spc = new SimulatedPackageClass();
        spc.displayInfo();
    }
}`,
              output: `Class registered under namespace: com.enterprise.billing
Corresponds to directory path: src/com/enterprise/billing/`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "Java packages map 1:1 to directory folder structures. The convention uses reversed domain names (com.company.project) to guarantee global uniqueness."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "تتطابق حزم جافا تماماً مع مسارات المجلدات في نظام التشغيل، وتتبع المعيار العالمي بعكس اسم النطاق (مثل com.company.project) لضمان عدم تكرار الأسماء عالمياً."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Standard Collections API Power Utilities (المثال 10: دوال مساعدة متقدمة من Collections)"
            },
            {
              type: "paragraph",
              text: "Using java.util.Collections algorithms for sorting, reversing, and frequency counts."
            },
            {
              type: "code",
              language: "java",
              filename: "CollectionsApiDemo.java",
              code: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class CollectionsApiDemo {
    public static void main(String[] args) {
        List<Integer> metrics = new ArrayList<>(Arrays.asList(40, 10, 85, 20, 85, 95, 85));

        Collections.sort(metrics);
        System.out.println("Ascending:  " + metrics);

        Collections.reverse(metrics);
        System.out.println("Descending: " + metrics);

        int max = Collections.max(metrics);
        int frequency85 = Collections.frequency(metrics, 85);

        System.out.println("Maximum Value: " + max);
        System.out.println("Frequency of 85: " + frequency85 + " times");
    }
}`,
              output: `Ascending:  [10, 20, 40, 85, 85, 85, 95]
Descending: [95, 85, 85, 85, 20, 10, 40]
Maximum Value: 95
Frequency of 85: 3 times`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "The standard Collections utility class provides battle-tested algorithms for sorting, searching, and statistical aggregation."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "توفر فئة Collections خوارزميات جاهزة ومحسنة الأداء للترتيب والبحث وحساب تكرار العناصر دون الحاجة لكتابتها يدوياً."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Enterprise Financial Receipt Generator (المثال 11: مولد فواتير مالية متكامل عبر Java API)"
            },
            {
              type: "paragraph",
              text: "Advanced: Orchestrating UUID, LocalDate, and BigDecimal into an automated receipt engine."
            },
            {
              type: "code",
              language: "java",
              filename: "EnterpriseReceiptGenerator.java",
              code: `import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.UUID;

public class EnterpriseReceiptGenerator {
    static class InvoiceReceipt {
        final String invoiceId;
        final LocalDate issuedDate;
        final BigDecimal subtotal;
        final BigDecimal taxAmount;
        final BigDecimal grandTotal;

        InvoiceReceipt(BigDecimal subtotal, double taxRatePercent) {
            this.invoiceId = "INV-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
            this.issuedDate = LocalDate.now();
            this.subtotal = subtotal;

            BigDecimal rate = new BigDecimal(Double.toString(taxRatePercent / 100.0));
            this.taxAmount = subtotal.multiply(rate).setScale(2, RoundingMode.HALF_UP);
            this.grandTotal = subtotal.add(this.taxAmount);
        }

        void printReceipt() {
            System.out.println("=== OFFICIAL INVOICE RECEIPT ===");
            System.out.println("Invoice ID: " + invoiceId);
            System.out.println("Issue Date: " + issuedDate);
            System.out.println("Subtotal:   $" + subtotal);
            System.out.println("Tax (15%):  $" + taxAmount);
            System.out.println("TOTAL DUE:  $" + grandTotal);
        }
    }

    public static void main(String[] args) {
        InvoiceReceipt receipt = new InvoiceReceipt(new BigDecimal("1249.99"), 15.0);
        receipt.printReceipt();
    }
}`,
              output: `=== OFFICIAL INVOICE RECEIPT ===
Invoice ID: INV-C53FBC77
Issue Date: 2026-09-05
Subtotal:   $1249.99
Tax (15%):  $187.50
TOTAL DUE:  $1437.49`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "Combines three cornerstone standard packages: java.util.UUID for identifiers, java.time.LocalDate for timestamps, and java.math.BigDecimal for high-precision currency."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "يدمج هذا المثال ثلاث حزم قياسية رئيسية: UUID للمعرفات، و LocalDate للتواريخ، و BigDecimal للحسابات النقدية الدقيقة."
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
                "Mistake 1: Placing the 'package' statement anywhere other than the very first non-comment line of the Java file. It MUST be the first statement.",
                "خطأ 1: وضع عبارة package في مكان غير السطر الأول من الملف. يجب أن تكون أول تعليمة برمجية غير تعليقية في ملف جافا.",
                "Mistake 2: Assuming 'import java.util.*' imports sub-packages like 'java.util.concurrent'. Wildcards only import classes at the current package level, never sub-packages.",
                "خطأ 2: الاعتقاد بأن 'import java.util.*' يستورد الحزم الفرعية مثل java.util.concurrent. علامة النجمة تستورد فئات الحزمة المباشرة فقط.",
                "Mistake 3: Using 'float' or 'double' for currency calculations instead of 'java.math.BigDecimal'. Floating-point approximations will cause penny discrepancies."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Secure Order Tracking Tokenizer (التحدي العملي: نظام توليد رموز تتبع الطلبات)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Create a program 'OrderTracker': 1) Import UUID from java.util, LocalDate from java.time, and BigDecimal from java.math; 2) Generate a tracking code using the first 8 characters of a random UUID prefixed with 'TRK-'; 3) Record the order date; 4) Compute final price with a 10% discount using BigDecimal. Display all tracking details in main()."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: قم بإنشاء برنامج OrderTracker: 1) استيراد UUID و LocalDate و BigDecimal؛ 2) توليد رمز تتبع مكون من أول 8 أحرف من UUID عشوائي مسبوقاً بـ 'TRK-'؛ 3) تسجيل تاريخ الطلب؛ 4) حساب السعر النهائي بعد خصم 10% باستخدام BigDecimal. اطبع تفاصيل التتبع كاملة في main."
            },
            {
              type: "code",
              language: "java",
              filename: "OrderTrackerChallenge.java",
              code: `import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.UUID;

public class OrderTrackerChallenge {
    static class TrackingOrder {
        String trackingCode;
        LocalDate orderDate;
        BigDecimal finalAmount;

        TrackingOrder(BigDecimal basePrice) {
            this.trackingCode = "TRK-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
            this.orderDate = LocalDate.now();
            BigDecimal discountMultiplier = new BigDecimal("0.90"); // 10% discount
            this.finalAmount = basePrice.multiply(discountMultiplier).setScale(2, RoundingMode.HALF_UP);
        }

        void printTrackingSheet() {
            System.out.println("Tracking Code: " + trackingCode);
            System.out.println("Order Date:    " + orderDate);
            System.out.println("Final Charge:  $" + finalAmount);
        }
    }

    public static void main(String[] args) {
        TrackingOrder order = new TrackingOrder(new BigDecimal("250.00"));
        order.printTrackingSheet();
    }
}`,
              output: `Tracking Code: TRK-98AF2214
Order Date:    2026-09-05
Final Charge:  $225.00`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "Utilizes the Java Standard Library to provide enterprise-grade random keys, accurate timestamps, and mathematically sound currency calculations."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "تعتمد الشيفرة على مكتبة جافا القياسية لتوليد رموز فريدة وتواريخ دقيقة وحسابات مالية موثوقة بدون أخطاء تقريب."
            }
          ],
          quiz: [
            {
              id: "q1",
              question: "Which Java package is imported automatically into every single Java compilation unit without requiring an explicit import statement?",
              options: [
                "java.util",
                "java.lang",
                "java.io",
                "java.time"
              ],
              correctIndex: 1,
              explanation: "Correct! The 'java.lang' package (which includes core fundamental classes like String, System, Math, Object, and Integer) is imported automatically into every Java file by the compiler. (حزمة java.lang يتم استيرادها تلقائياً بالكامل في جميع ملفات جافا دون كتابة import)."
            },
            {
              id: "q2",
              question: "Where must the 'package' statement be placed within a Java source file?",
              options: [
                "Anywhere inside the main class declaration.",
                "As the very first non-comment statement in the file, before any import statements.",
                "Immediately following the import statements.",
                "At the very end of the file."
              ],
              correctIndex: 1,
              explanation: "Correct! The package declaration MUST be the absolute first non-comment, non-whitespace line of a Java source file. Placing it anywhere else produces a compile-time error. (يجب أن يكون تصريح الحزمة package أول سطر فعلي في الملف قبل أي استيرادات)."
            },
            {
              id: "q3",
              question: "Does the wildcard import 'import java.util.*;' recursively import classes inside sub-packages such as 'java.util.concurrent.*'?",
              options: [
                "Yes, wildcard imports traverse all sub-packages recursively.",
                "No; in Java, wildcard imports import ONLY the classes directly inside that specific package level, not its sub-packages.",
                "Yes, but only if the sub-package is marked public.",
                "Only in Java 17 and later."
              ],
              correctIndex: 1,
              explanation: "Correct! Package hierarchy in Java is purely a naming namespace. 'import java.util.*;' imports only classes directly in java.util; sub-packages like 'java.util.concurrent' must be imported independently. (الاستيراد بالنجمة * يستورد فقط الفئات المباشرة في الحزمة ولا يشمل الحزم الفرعية مثل concurrent)."
            },
            {
              id: "q4",
              question: "How does a Java developer resolve a class name collision when their code must use BOTH 'java.util.Date' and 'java.sql.Date' in the same class?",
              options: [
                "It is impossible; Java source files can only reference one class named Date.",
                "Use the Fully Qualified Class Name (FQCN), such as 'java.sql.Date sqlDate = new java.sql.Date(...);', for at least one or both types.",
                "Rename the class file on disk.",
                "Cast java.util.Date to java.sql.Date using explicit type casting."
              ],
              correctIndex: 1,
              explanation: "Correct! When two packages contain classes with identical names, at least one must be explicitly referenced by its Fully Qualified Class Name (FQCN) including its package prefix to disambiguate the type for the compiler. (عند تشابه أسماء الفئات بين حزمتين مختلفتين، يتم تحديد الفئة باستخدام اسمها المؤهل بالكامل FQCN لفك الالتباس)."
            },
            {
              id: "q5",
              question: "What is the primary syntactical purpose of a 'static import' in Java?\nExample: 'import static java.lang.Math.PI;'",
              options: [
                "To accelerate runtime execution by compiling code to machine instructions.",
                "To allow direct access to static fields and methods (e.g., writing 'PI' or 'sqrt(25)') without prefixing them with the class name 'Math.'.",
                "To prevent static variables from being garbage collected.",
                "To import private static methods across package boundaries."
              ],
              correctIndex: 1,
              explanation: "Correct! Static imports allow static members (methods and constants) to be referenced directly by name without qualifying them with their enclosing class name. (الاستيراد الساكن يتيح استخدام الثوابت والدوال الساكنة مباشرة بالاسم دون تكرار اسم الصنف مثل Math)."
            },
            {
              id: "q6",
              question: "Why should financial currency calculations use 'BigDecimal' instead of primitive 'double' or 'float'?",
              options: [
                "Because double and float cannot represent negative values.",
                "Because IEEE 754 floating-point numbers cannot represent decimal fractions exactly (e.g., 0.1 + 0.2 != 0.3), whereas BigDecimal guarantees exact arbitrary-precision decimal arithmetic.",
                "Because BigDecimal processes math operations on the graphics card.",
                "Because double is deprecated in modern Java."
              ],
              correctIndex: 1,
              explanation: "Correct! Binary floating-point types (double, float) suffer from inherent binary representation rounding inaccuracies. BigDecimal provides exact precision, making it mandatory for banking and financial calculations. (الأعداد العشرية العائمة float و double تسبب أخطاء تقريب ثنائية خطيرة، بينما يضمن BigDecimal دقة عشرية مطلقة)."
            },
            {
              id: "q7",
              question: "Examine these two BigDecimal instantiations:\nBigDecimal a = new BigDecimal(0.1);\nBigDecimal b = new BigDecimal(\"0.1\");\nWhich constructor guarantees EXACT representation of 0.1 without floating-point artifacts?",
              options: [
                "Constructor 'a', because numbers compile faster than strings.",
                "Constructor 'b', because passing a String literal avoids the binary floating-point inaccuracy already baked into the literal '0.1'.",
                "Both produce identical results.",
                "Neither; BigDecimal can only be created via reflection."
              ],
              correctIndex: 1,
              explanation: "Correct! 'new BigDecimal(0.1)' receives an already imprecise binary double (0.100000000000000005551...). Using 'new BigDecimal(\"0.1\")' or 'BigDecimal.valueOf(0.1)' parses the exact decimal value safely. (المشيد الذي يستقبل String أو دالة valueOf يضمن الدقة التامة لأن تمرير double ينقل خطأ التقريب الثنائي المسبق)."
            },
            {
              id: "q8",
              question: "Why was the modern Date/Time API (java.time package) introduced in Java 8 to replace legacy 'java.util.Date' and 'java.util.Calendar'?",
              options: [
                "Because legacy Date only worked in Greenwich Mean Time.",
                "Because legacy Date classes were mutable, not thread-safe, and had poorly designed APIs (e.g., 0-indexed months), whereas java.time classes (LocalDate, Instant) are immutable, thread-safe, and follow ISO standards.",
                "Because legacy Date could not store years after 2020.",
                "Because Calendar required an internet connection."
              ],
              correctIndex: 1,
              explanation: "Correct! The java.time API provides immutable, thread-safe classes with clear domain models (LocalDate, LocalTime, Instant, Duration) resolving the mutability and design flaws of the legacy classes. (حزمة java.time تقدم كائنات غير قابلة للتعديل وآمنة في تعدد الخيوط مع تجنب عيوب Date القديمة مثل تعديل الشهور وقابلية التغيير غير الآمنة)."
            },
            {
              id: "q9",
              question: "How does the Java Standard Library generate a cryptographically strong Universally Unique Identifier (UUID)?",
              options: [
                "UUID id = new UUID(System.currentTimeMillis());",
                "UUID id = UUID.randomUUID();",
                "UUID id = Math.randomUUID();",
                "UUID id = ClassLoader.getUUID();"
              ],
              correctIndex: 1,
              explanation: "Correct! 'java.util.UUID.randomUUID()' generates a 128-bit Type 4 pseudo-random UUID conforming to RFC 4122, widely used for unique primary keys and tracking tokens. (الدالة UUID.randomUUID() تولد معرفاً فريداً عالمياً بطول 128 بت بدقة أمان عالية)."
            },
            {
              id: "q10",
              question: "In the standard Java project architecture, how does the package declaration 'package com.enterprise.billing;' map to the underlying filesystem directory structure?",
              options: [
                "It has no relation to the filesystem; all files can be in the same folder.",
                "Source files must reside in a nested directory path matching the package: 'com/enterprise/billing/'.",
                "All classes must be placed in a file named billing.zip.",
                "The folder structure must be backwards: 'billing/enterprise/com/'."
              ],
              correctIndex: 1,
              explanation: "Correct! Java compilers and classloaders mandate that the directory structure matches the package hierarchy exactly (e.g., 'com/enterprise/billing/Account.java'). (تنظيم ملفات جافا يطابق حرفياً مسار المجلدات على القرص الصلب مثل com/enterprise/billing)."
            },
            {
              id: "q11",
              question: "If a file contains:\nimport java.util.Date;\nimport java.sql.*;\nWhich class does the identifier 'Date' resolve to?",
              options: [
                "Compile-time error: ambiguous class name.",
                "java.util.Date, because an explicit single-type import always takes precedence over on-demand wildcard (*) imports.",
                "java.sql.Date, because it is loaded last.",
                "The compiler chooses randomly based on alphabetical sorting."
              ],
              correctIndex: 1,
              explanation: "Correct! In Java resolution rules, an explicit single-type import ('import java.util.Date;') always overrides any wildcard on-demand import ('import java.sql.*;'), preventing ambiguity. (الاستيراد الفردي الصريح لفئة محددة له أولوية حاسمة على أي استيراد شامل بالنجمة)."
            },
            {
              id: "q12",
              question: "What happens if code attempts to mutate a list created by 'List.of(\"Alpha\", \"Beta\")' or wrapped by 'Collections.unmodifiableList(...)'?",
              options: [
                "The element is added successfully.",
                "A java.lang.UnsupportedOperationException is thrown at runtime.",
                "A NullPointerException is thrown.",
                "The program exits with error code 1."
              ],
              correctIndex: 1,
              explanation: "Correct! Unmodifiable collections created via 'List.of()' or 'Collections.unmodifiableList()' throw an UnsupportedOperationException upon any modification attempt (add, remove, clear). (القوائم غير القابلة للتعديل ترمي استثناء UnsupportedOperationException فوراً عند محاولة إضافة أو حذف أي عنصر)."
            },
            {
              id: "q13",
              question: "Which Java package provides high-performance asynchronous channels, file system paths, and non-blocking I/O?",
              options: [
                "java.lang",
                "java.nio.file (New I/O)",
                "java.applet",
                "java.security"
              ],
              correctIndex: 1,
              explanation: "Correct! The 'java.nio' (and 'java.nio.file') package introduced modern non-blocking, buffer-oriented I/O and the Paths/Files API to replace legacy java.io streaming operations. (حزمة java.nio.file تقدم واجهات الإدخال والإخراج الحديثة غير المحاصرة وإدارة الملفات السريعة)."
            },
            {
              id: "q14",
              question: "What occurs if two different classes imported via static wildcard imports define a static method with the exact same name?\nimport static com.pkgA.MathOps.*;\nimport static com.pkgB.MathOps.*;\n// In code: calculate();",
              options: [
                "The JVM executes both methods in parallel.",
                "Compile-time error: reference to calculate is ambiguous; the method call must be explicitly qualified with the class name.",
                "The method from pkgA takes precedence.",
                "The method from pkgB takes precedence."
              ],
              correctIndex: 1,
              explanation: "Correct! When a static method name exists in multiple static wildcard imports, invoking it unqualified causes a compile-time collision error ('reference to method is ambiguous'). Explicit class qualification is required. (وجود نفس اسم الدالة الساكنة في استيرادين ساكنين بالنجمة يسبب تضارباً يمنع التصريف ويفرض كتابة اسم الفئة صراحة)."
            },
            {
              id: "q15",
              question: "What command-line flag is passed to the Java compiler 'javac' to instruct it to generate the proper package directory structure automatically?",
              options: [
                "-version",
                "-d <destination-directory>",
                "-classpath only",
                "-package-force"
              ],
              correctIndex: 1,
              explanation: "Correct! The '-d' (destination) flag in 'javac -d . Source.java' directs the compiler to automatically create the matching package directories and deposit the compiled .class files into their corresponding subfolders. (الخيار -d مع أمر javac يوجه المصرف لإنشاء مجلدات الحزم تلقائياً ووضع ملفات class المترجمة بداخلها)."
            }
          ]
        }
      ]
    },

    /* ==========================================================================
       TOPIC 10: Java Inheritance
       ========================================================================== */
    {
      id: "java-inheritance",
      title: "10. Java Inheritance",
      description: "Comprehensive guide to Java Inheritance: The 'extends' keyword, the 'super' keyword, method overriding, single/multilevel/hierarchical inheritance, and java.lang.Object root.",
      lessons: [
        {
          id: "inheritance-mastery",
          title: "Complete Guide to Java Inheritance",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "The Principle of Inheritance (مبدأ الوراثة في البرمجة كائنية التوجه)"
            },
            {
              type: "paragraph",
              text: "Inheritance is an OOP mechanism where one class (the subclass or child class) inherits attributes and methods from another class (the superclass or parent class) using the 'extends' keyword. Inheritance establishes an 'IS-A' relationship (for example, a Dog IS-A Animal; an ElectricCar IS-A Car). Its primary benefits are massive code reusability, shared architectural contracts, and laying the groundwork for Polymorphism."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "الوراثة (Inheritance) هي ركيزة أساسية تمكن فئة جديدة (تسمى الفئة الابنة أو الفرعية Subclass) من أن ترث الخصائص والدوال من فئة موجودة مسبقاً (تسمى الفئة الأب أو الأساسية Superclass) باستخدام الكلمة المفتاحية 'extends'. تؤسس الوراثة علاقة 'هو من نوع' (IS-A) كأن نقول: السيارة الكهربائية هي من نوع سيارة. تحقق الوراثة إعادة استخدام الكود، وتقليل التكرار، وبناء هيكل برمجي هرمي متماسك يمهد لتعدد الأشكال (Polymorphism)."
            },
            {
              type: "paragraph",
              text: "Java supports Single, Multilevel, and Hierarchical inheritance for classes. Multiple inheritance of classes (a class extending two classes directly) is FORBIDDEN in Java to avoid the Diamond Problem."
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
              text: "Example 1: Basic Single Inheritance (المثال 1: الوراثة الفردية البسيطة)"
            },
            {
              type: "paragraph",
              text: "A subclass inheriting fields and methods from a single parent class using 'extends'."
            },
            {
              type: "code",
              language: "java",
              filename: "BasicInheritanceDemo.java",
              code: `public class BasicInheritanceDemo {
    // Superclass (Parent)
    static class Animal {
        String species = "Generic Animal";

        void eat() {
            System.out.println("This animal consumes food for energy.");
        }
    }

    // Subclass (Child) inherits Animal using 'extends'
    static class Dog extends Animal {
        String breed = "German Shepherd";

        void bark() {
            System.out.println("Woof! Woof!");
        }
    }

    public static void main(String[] args) {
        Dog myDog = new Dog();

        // Inherited from Animal
        System.out.println("Species: " + myDog.species);
        myDog.eat();

        // Unique to Dog
        System.out.println("Breed: " + myDog.breed);
        myDog.bark();
    }
}`,
              output: `Species: Generic Animal
This animal consumes food for energy.
Breed: German Shepherd
Woof! Woof!`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "Dog inherits the 'species' variable and 'eat()' method from Animal automatically, while introducing its own breed and bark() method."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "يرث الكلب خاصية species ودالة eat() تلقائياً من الأب Animal، مع إضافة خصائصه ودواله الخاصة مثل breed و bark()."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: The 'super()' Constructor Call (المثال 2: استدعاء مشيد الفئة الأب عبر super)"
            },
            {
              type: "paragraph",
              text: "Passing arguments up to the superclass constructor to initialize inherited fields."
            },
            {
              type: "code",
              language: "java",
              filename: "SuperConstructorDemo.java",
              code: `public class SuperConstructorDemo {
    static class Person {
        String fullName;

        Person(String name) {
            this.fullName = name;
            System.out.println("Person constructor initialized: " + name);
        }
    }

    static class Employee extends Person {
        int employeeId;

        Employee(String name, int id) {
            super(name); // MUST be the first statement in child constructor!
            this.employeeId = id;
            System.out.println("Employee constructor initialized with ID: " + id);
        }
    }

    public static void main(String[] args) {
        Employee emp = new Employee("Dr. Layla H.", 1009);
        System.out.println("Employee: " + emp.fullName + " | ID: " + emp.employeeId);
    }
}`,
              output: `Person constructor initialized: Dr. Layla H.
Employee constructor initialized with ID: 1009
Employee: Dr. Layla H. | ID: 1009`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "The subclass calls 'super(name)' to invoke the parent constructor. Rule: super(...) must be the very first line of the subclass constructor."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "يستدعي الصنف الابن مشيد الأب عبر 'super(name)' لتهيئة البيانات الموروثة. القاعدة الصارمة: يجب أن يكون استدعاء super أول سطر في مشيد الابن."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Method Overriding with @Override (المثال 3: إعادة تعريف الدوال وتجاوزها)"
            },
            {
              type: "paragraph",
              text: "Subclasses redefining superclass methods to supply specialized behavior."
            },
            {
              type: "code",
              language: "java",
              filename: "MethodOverridingDemo.java",
              code: `public class MethodOverridingDemo {
    static class Vehicle {
        void startEngine() {
            System.out.println("Starting combustion engine: Vroom!");
        }
    }

    static class ElectricCar extends Vehicle {
        @Override
        void startEngine() {
            System.out.println("Silent start: High-voltage inverter active (0 dB noise).");
        }
    }

    public static void main(String[] args) {
        Vehicle standard = new Vehicle();
        ElectricCar tesla = new ElectricCar();

        standard.startEngine();
        tesla.startEngine(); // Overridden implementation executed
    }
}`,
              output: `Starting combustion engine: Vroom!
Silent start: High-voltage inverter active (0 dB noise).`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "ElectricCar overrides startEngine() using the same signature and the @Override annotation, replacing the parent behavior with electric motor logic."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "تقوم الفئة ElectricCar بإعادة تعريف دالة startEngine() باستخدام تعليقة @Override لتقديم سلوك المحرك الكهربائي بدلاً من محرك الوقود التقليدي."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Invoking Parent Methods with super.method() (المثال 4: استدعاء دالة الأب عبر super)"
            },
            {
              type: "paragraph",
              text: "Extending parent behavior rather than completely replacing it."
            },
            {
              type: "code",
              language: "java",
              filename: "SuperMethodCallDemo.java",
              code: `public class SuperMethodCallDemo {
    static class Logger {
        void log(String message) {
            System.out.println("[INFO] " + message);
        }
    }

    static class TimestampedLogger extends Logger {
        @Override
        void log(String message) {
            // First call parent logger implementation
            super.log(message);
            // Then add child-specific capability
            System.out.println("       Timestamp appended: " + System.currentTimeMillis());
        }
    }

    public static void main(String[] args) {
        TimestampedLogger tLogger = new TimestampedLogger();
        tLogger.log("User logged in successfully.");
    }
}`,
              output: `[INFO] User logged in successfully.
       Timestamp appended: 1714529381150`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "'super.log(message)' delegates to the superclass method, allowing the subclass to enhance existing functionality without rewriting it."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "تسمح 'super.log(message)' بتنفيذ كود الأب أولاً، ثم إضافة وظائف إضافية جديدة خاصة بالابن دون إعادة كتابة المنطق الأساسي."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Multilevel Inheritance (المثال 5: الوراثة متعددة المستويات)"
            },
            {
              type: "paragraph",
              text: "Chaining inheritance across three or more generational tiers (A -> B -> C)."
            },
            {
              type: "code",
              language: "java",
              filename: "MultilevelDemo.java",
              code: `public class MultilevelDemo {
    // Tier 1: Grandparent
    static class ElectronicDevice {
        void powerOn() {
            System.out.println("Device power circuit active.");
        }
    }

    // Tier 2: Parent
    static class Computer extends ElectronicDevice {
        void bootOS() {
            System.out.println("Operating system kernel booted.");
        }
    }

    // Tier 3: Child
    static class Laptop extends Computer {
        void foldScreen() {
            System.out.println("Laptop screen closed; sleeping mode entered.");
        }
    }

    public static void main(String[] args) {
        Laptop myMac = new Laptop();

        myMac.powerOn();    // Inherited from ElectronicDevice
        myMac.bootOS();     // Inherited from Computer
        myMac.foldScreen(); // Defined in Laptop
    }
}`,
              output: `Device power circuit active.
Operating system kernel booted.
Laptop screen closed; sleeping mode entered.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "Multilevel inheritance chains capabilities down through generations. Laptop has access to Computer methods as well as ElectronicDevice methods."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "الوراثة متعددة المستويات تنقل الخصائص عبر الأجيال؛ فالكمبيوتر المحمول Laptop يرث دوال الفئة الأب Computer ودوال الجد ElectronicDevice."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Hierarchical Inheritance (المثال 6: الوراثة الهرمية الشجرية)"
            },
            {
              type: "paragraph",
              text: "Multiple sibling subclasses branching out from a single common parent."
            },
            {
              type: "code",
              language: "java",
              filename: "HierarchicalDemo.java",
              code: `public class HierarchicalDemo {
    static abstract class Shape {
        String color = "Black";
        abstract double calculateArea();
    }

    static class Circle extends Shape {
        double radius;
        Circle(double r) { this.radius = r; }
        @Override double calculateArea() { return Math.PI * radius * radius; }
    }

    static class Square extends Shape {
        double side;
        Square(double s) { this.side = s; }
        @Override double calculateArea() { return side * side; }
    }

    public static void main(String[] args) {
        Shape c = new Circle(4.0);
        Shape s = new Square(5.0);

        System.out.printf("Circle Area: %.2f%n", c.calculateArea());
        System.out.printf("Square Area: %.2f%n", s.calculateArea());
    }
}`,
              output: `Circle Area: 50.27
Square Area: 25.00`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "In hierarchical inheritance, multiple classes (Circle, Square) branch from the same parent (Shape), sharing properties while customizing behavior."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "في الوراثة الشجرية ترث عدة فئات شقيقة (Circle و Square) من نفس الفئة الأب (Shape) وتشترك في الخصائص وتختلف في التنفيذ."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Field Shadowing and super.variable (المثال 7: حجب المتغيرات والوصول للأب عبر super)"
            },
            {
              type: "paragraph",
              text: "Differentiating between shadowed parent attributes and child attributes."
            },
            {
              type: "code",
              language: "java",
              filename: "FieldShadowingDemo.java",
              code: `public class FieldShadowingDemo {
    static class Parent {
        int maxSpeed = 120;
    }

    static class SportsCar extends Parent {
        int maxSpeed = 280; // Shadows parent's maxSpeed!

        void displaySpeeds() {
            System.out.println("Child maxSpeed:  " + this.maxSpeed + " km/h");
            System.out.println("Parent maxSpeed: " + super.maxSpeed + " km/h");
        }
    }

    public static void main(String[] args) {
        SportsCar car = new SportsCar();
        car.displaySpeeds();
    }
}`,
              output: `Child maxSpeed:  280 km/h
Parent maxSpeed: 120 km/h`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "When a child declares a field with the same name as a parent field, it shadows it. 'super.maxSpeed' accesses the parent field directly."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "عندما يعرف الابن متغيراً بنفس اسم متغير الأب يُسمى ذلك حجباً (Shadowing)، ونستخدم 'super.maxSpeed' للوصول لقيمة الأب الأصلية."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Polymorphic References (Upcasting) (المثال 8: المراجع متعددة الأشكال والترقية)"
            },
            {
              type: "paragraph",
              text: "Holding a subclass instance inside a superclass reference variable."
            },
            {
              type: "code",
              language: "java",
              filename: "UpcastingDemo.java",
              code: `public class UpcastingDemo {
    static class Account {
        void printPolicy() {
            System.out.println("Standard Account: 0.5% annual interest.");
        }
    }

    static class PremiumAccount extends Account {
        @Override
        void printPolicy() {
            System.out.println("Premium VIP Account: 4.5% annual interest + concierge.");
        }
    }

    public static void main(String[] args) {
        // Upcasting: Parent reference points to Child object
        Account myAcc = new PremiumAccount();

        // Dynamic Method Dispatch: child's overridden method executes!
        myAcc.printPolicy();
    }
}`,
              output: `Premium VIP Account: 4.5% annual interest + concierge.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "Even though myAcc is of reference type Account, Java dynamically binds the call to PremiumAccount's overridden method at runtime."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "رغم أن المتغير myAcc معرف بنوع الأب Account، إلا أن جافا تستدعي دالة الابن الفعلية في وقت التشغيل (Dynamic Dispatch)."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Overriding java.lang.Object Methods (toString & equals) (المثال 9: تجاوز دوال كائن جافا الشامل Object)"
            },
            {
              type: "paragraph",
              text: "Every class in Java implicitly inherits from java.lang.Object."
            },
            {
              type: "code",
              language: "java",
              filename: "ObjectMethodsDemo.java",
              code: `public class ObjectMethodsDemo {
    static class Product {
        String sku;
        double price;

        Product(String sku, double price) {
            this.sku = sku;
            this.price = price;
        }

        // Overriding java.lang.Object.toString()
        @Override
        public String toString() {
            return "Product[SKU=" + sku + ", Price=$" + price + "]";
        }

        // Overriding java.lang.Object.equals()
        @Override
        public boolean equals(Object obj) {
            if (this == obj) return true;
            if (obj == null || getClass() != obj.getClass()) return false;
            Product other = (Product) obj;
            return this.sku.equals(other.sku);
        }
    }

    public static void main(String[] args) {
        Product p1 = new Product("LAP-01", 999.0);
        Product p2 = new Product("LAP-01", 999.0);

        System.out.println("Object representation: " + p1);
        System.out.println("p1 equals p2? " + p1.equals(p2));
    }
}`,
              output: `Object representation: Product[SKU=LAP-01, Price=$999.0]
p1 equals p2? true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "All Java classes implicitly extend java.lang.Object. Overriding toString() and equals() gives objects clean string representations and logical equivalence."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "جميع فئات جافا ترث تلقائياً من الصنف الأب الشامل java.lang.Object. إعادة تعريف toString() و equals() تمنح الكائن تمثيلاً نصياً واضحاً ومقارنة منطقية دقيقة."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Preventing Inheritance with 'final' (المثال 10: منع الوراثة باستخدام الكلمة final)"
            },
            {
              type: "paragraph",
              text: "Locking a class or method to prevent subclasses from extending or overriding it."
            },
            {
              type: "code",
              language: "java",
              filename: "FinalInheritanceDemo.java",
              code: `public class FinalInheritanceDemo {
    static class SecurityCore {
        // Subclasses cannot override this security check
        final void verifyBiometrics() {
            System.out.println("Tamper-proof biometrics check executed.");
        }
    }

    // A final class cannot be extended by anyone
    static final class LockedVault extends SecurityCore {
        void open() {
            verifyBiometrics();
            System.out.println("Vault open.");
        }
    }

    public static void main(String[] args) {
        LockedVault vault = new LockedVault();
        vault.open();
    }
}`,
              output: `Tamper-proof biometrics check executed.
Vault open.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "Declaring a method final prevents overriding; declaring a class final locks the entire class from being subclassed."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "تعريف الدالة كـ final يمنع إعادة تعريفها، بينما تعريف الفئة كـ final يمنع وراثتها كلياً لحماية الأكواد الحساسة."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Enterprise Employee Compensation Hierarchy (المثال 11: نظام رواتب موظفين هرمي متكامل)"
            },
            {
              type: "paragraph",
              text: "Advanced: Full inheritance hierarchy featuring base salaries, role-specific bonus logic, and polymorphic salary evaluation."
            },
            {
              type: "code",
              language: "java",
              filename: "EmployeeHierarchyDemo.java",
              code: `public class EmployeeHierarchyDemo {
    static abstract class StaffMember {
        String name;
        double baseSalary;

        StaffMember(String name, double base) {
            this.name = name;
            this.baseSalary = base;
        }

        abstract double calculateTotalCompensation();

        void printPaySlip() {
            System.out.printf("%-18s | Total: $%,10.2f%n", name, calculateTotalCompensation());
        }
    }

    static class SoftwareEngineer extends StaffMember {
        double techAllowance;

        SoftwareEngineer(String name, double base, double tech) {
            super(name, base);
            this.techAllowance = tech;
        }

        @Override
        double calculateTotalCompensation() {
            return baseSalary + techAllowance;
        }
    }

    static class SalesDirector extends StaffMember {
        double commissionPercent;
        double closedSalesVolume;

        SalesDirector(String name, double base, double comm, double volume) {
            super(name, base);
            this.commissionPercent = comm;
            this.closedSalesVolume = volume;
        }

        @Override
        double calculateTotalCompensation() {
            return baseSalary + (closedSalesVolume * (commissionPercent / 100.0));
        }
    }

    public static void main(String[] args) {
        StaffMember[] companyStaff = {
            new SoftwareEngineer("Tariq Al-Mansoor", 8500.0, 1200.0),
            new SalesDirector("Nadia K.", 7000.0, 5.0, 80000.0)
        };

        System.out.println("=== PAYROLL SUMMARY ===");
        for (StaffMember staff : companyStaff) {
            staff.printPaySlip(); // Polymorphic method invocation
        }
    }
}`,
              output: `=== PAYROLL SUMMARY ===
Tariq Al-Mansoor   | Total: $  9,700.00
Nadia K.           | Total: $ 11,000.00`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "StaffMember serves as the polymorphic foundation. Each child class overrides calculateTotalCompensation() with its unique business logic while sharing base attributes."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "تشكل الفئة StaffMember أساساً هرمياً مشتركاً، حيث تعيد كل فئة ابنة حساب إجمالي الراتب وفق شروطها الخاصة مع الاحتفاظ بالبنية المشتركة."
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
                "Mistake 1: Attempting multiple class inheritance (e.g. 'class Car extends Vehicle, Machine'). Java strictly disallows extending multiple classes directly.",
                "خطأ 1: محاولة وراثة أكثر من فئة في نفس الوقت (class Car extends A, B). لغة جافا تمنع الوراثة المتعددة المباشرة للفئات تجنباً لمشكلة الماسة (Diamond Problem).",
                "Mistake 2: Forgetting that private members of a parent class are NOT accessible directly in child classes. Use getters or 'protected' access instead.",
                "خطأ 2: نسيان أن الحقول الخاصة (private) في فئة الأب لا يمكن للفئة الابنة الوصول إليها مباشرة، ويجب استخدام دوال get أو محدد protected.",
                "Mistake 3: Omitting the super() constructor call when the parent class lacks a no-argument constructor. The compiler will complain unless you explicitly invoke super(arguments)."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Logistics Fleet Vehicle Hierarchy (التحدي العملي: هرمية أسطول مركبات الشحن)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Create a transport hierarchy: 1) Base class 'FleetVehicle' with attributes 'model' (String) and 'baseTollFee' (double), and a constructor; 2) Subclass 'CargoTruck' extending FleetVehicle with 'cargoTons' (double) and overriding 'calculateToll()' to return baseTollFee + (cargoTons * 15.0); 3) Subclass 'CourierVan' extending FleetVehicle that returns baseTollFee + 5.0 flat rate. Test both in main()."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: قم بإنشاء هرمية مركبات شحن: 1) فئة أساسية FleetVehicle تحتوي على اسم الطراز ورسوم العبور الأساسية؛ 2) فئة فرعية CargoTruck ترث منها وتضيف وزن الحمولة بالطن وتعيد تعريف calculateToll لحساب الرسوم؛ 3) فئة فرعية CourierVan تضيف رسماً ثابتاً. اختبر الشاحنة وعربة التوصيل في main."
            },
            {
              type: "code",
              language: "java",
              filename: "FleetHierarchyChallenge.java",
              code: `public class FleetHierarchyChallenge {
    static class FleetVehicle {
        String model;
        double baseTollFee;

        FleetVehicle(String model, double baseToll) {
            this.model = model;
            this.baseTollFee = baseToll;
        }

        double calculateToll() {
            return baseTollFee;
        }
    }

    static class CargoTruck extends FleetVehicle {
        double cargoTons;

        CargoTruck(String model, double baseToll, double tons) {
            super(model, baseToll);
            this.cargoTons = tons;
        }

        @Override
        double calculateToll() {
            return super.calculateToll() + (cargoTons * 15.0);
        }
    }

    static class CourierVan extends FleetVehicle {
        CourierVan(String model, double baseToll) {
            super(model, baseToll);
        }

        @Override
        double calculateToll() {
            return super.calculateToll() + 5.0; // Flat express toll
        }
    }

    public static void main(String[] args) {
        FleetVehicle truck = new CargoTruck("Volvo FH16", 20.0, 8.5);
        FleetVehicle van = new CourierVan("Ford Transit", 10.0);

        System.out.printf("%s Toll: $%.2f%n", truck.model, truck.calculateToll());
        System.out.printf("%s Toll: $%.2f%n", van.model, van.calculateToll());
    }
}`,
              output: `Volvo FH16 Toll: $147.50
Ford Transit Toll: $15.00`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "The solution uses 'extends' and 'super(...)' to leverage shared vehicle attributes, customizing toll fees per vehicle category through method overriding."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "يعتمد الحل على الوراثة عبر extends واستدعاء super لتوحيد خصائص المركبات، مع تخصيص حساب رسوم العبور لكل نوع عبر إعادة تعريف الدوال."
            }
          ],
          quiz: [
          {
                    "id": "q1",
                    "question": "Which Java keyword is used by a class to inherit from another class, and how many direct superclasses can a single Java class extend?\n(أي كلمة مفتاحية تستخدمها الفئة للوراثة من فئة أخرى، وكم فئة أب مباشرة يمكن لفئة جافا أن ترث منها؟)",
                    "options": [
                              "implements; multiple superclasses separated by commas",
                              "extends; exactly one direct superclass (single inheritance)",
                              "inherits; up to two superclasses",
                              "super; any number of superclasses"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! In Java, class inheritance uses the 'extends' keyword, and Java strictly enforces single inheritance for classes to avoid Diamond Problem ambiguity. (تستخدم الفئات الكلمة المفتاحية extends، وتدعم جافا الوراثة الأحادية فقط للفئات لمنع غموض وراثة المعين)."
          },
          {
                    "id": "q2",
                    "question": "Predict the exact console output of running this code:\n\nclass Base {\n    Base() { System.out.print(\"A\"); }\n}\nclass Middle extends Base {\n    Middle() { System.out.print(\"B\"); }\n}\nclass Derived extends Middle {\n    Derived() { System.out.print(\"C\"); }\n}\npublic class Test {\n    public static void main(String[] args) {\n        new Derived();\n    }\n}",
                    "options": [
                              "CBA",
                              "ABC",
                              "C",
                              "Compile-time error: missing explicit super() calls"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Constructor execution always cascades from top to bottom through constructor chaining (super() is implicitly called as the first statement of every constructor). Base runs first ('A'), then Middle ('B'), then Derived ('C'), printing 'ABC'. (يبدأ تنفيذ المشيدات دائماً من الفئة الأعلى إلى الأدنى بفضل الاستدعاء الضمني لـ super)."
          },
          {
                    "id": "q3",
                    "question": "Consider the following code snippet:\n\nclass Vehicle {\n    private int maxSpeed = 120;\n}\nclass SportsCar extends Vehicle {\n    void displaySpeed() {\n        System.out.println(maxSpeed);\n    }\n}\n\nWhat is the result of compiling this code?",
                    "options": [
                              "It compiles cleanly and prints 120.",
                              "Compile-time error: maxSpeed has private access in Vehicle and cannot be accessed directly in SportsCar.",
                              "It compiles, but throws a NullPointerException at runtime.",
                              "It compiles only if SportsCar is marked static."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Private members of a superclass are not directly accessible in subclasses. To access private state, the superclass must provide public or protected accessor (getter) methods. (المتغيرات المعرفة بـ private في الفئة الأب لا يمكن الوصول إليها مباشرة في الفئات الابنة ويجب توفير دوال getter)."
          },
          {
                    "id": "q4",
                    "question": "Examine this code demonstrating variable shadowing vs method overriding:\n\nclass Parent {\n    int value = 10;\n    void show() { System.out.print(\"P-\" + value); }\n}\nclass Child extends Parent {\n    int value = 20;\n    void show() { System.out.print(\"C-\" + value); }\n}\npublic class Demo {\n    public static void main(String[] args) {\n        Parent p = new Child();\n        System.out.print(p.value + \" \");\n        p.show();\n    }\n}\n\nWhat is the exact output?",
                    "options": [
                              "20 C-20",
                              "10 P-10",
                              "10 C-20",
                              "20 P-10"
                    ],
                    "correctIndex": 2,
                    "explanation": "Correct! In Java, variables are NOT polymorphic; field access is resolved at compile time based on the reference type (Parent -> 10). Methods ARE polymorphic and resolved dynamically at runtime using dynamic method dispatch on the actual instance (Child -> 'C-20'). Thus the output is '10 C-20'. (المتغيرات في جافا ليست متعددة الأشكال وتُحدد بنوع المرجع في وقت الترجمة، بينما الدوال متعددة الأشكال وتُنفذ وفق الكائن الفعلي في وقت التشغيل)."
          },
          {
                    "id": "q5",
                    "question": "What happens if a developer attempts to extend a class marked with the 'final' keyword, such as:\n\nfinal class SecurityKernel {\n    void verify() {}\n}\nclass CustomKernel extends SecurityKernel {} // line 4",
                    "options": [
                              "It compiles successfully, but verify() cannot be overridden.",
                              "Compile-time error at line 4: cannot inherit from final SecurityKernel.",
                              "It compiles with a compiler warning about final class extension.",
                              "It compiles, but SecurityKernel must be an interface."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! The 'final' keyword on a class explicitly prohibits inheritance, preventing any other class from extending it. Attempting to extend a final class produces a compile-time error. (الكلمة المفتاحية final تمنع وراثة الفئة تماماً وأي محاولة لتوسيعها تؤدي لخطأ وقت الترجمة)."
          },
          {
                    "id": "q6",
                    "question": "Suppose a superclass defines a method as follows:\n\nclass Account {\n    public final void printTerms() {\n        System.out.println(\"Standard Terms\");\n    }\n}\nclass VIPAccount extends Account {\n    public void printTerms() {\n        System.out.println(\"VIP Terms\");\n    }\n}\n\nWhat occurs when compiling this code?",
                    "options": [
                              "Compile-time error: overridden method in superclass is final.",
                              "VIPAccount overrides printTerms() successfully.",
                              "It compiles, but outputs 'Standard Terms' at runtime.",
                              "A runtime SecurityException is thrown."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! A method declared with the 'final' modifier cannot be overridden by any subclass. Attempting to override a final method results in a compile-time error. (الدالة المعرفة بالكلمة final لا يمكن تجاوزها إطلاقاً في الفئات الابنة)."
          },
          {
                    "id": "q7",
                    "question": "When overriding an inherited method in a subclass, which access modifier rule must be strictly respected?",
                    "options": [
                              "The overriding method can assign any access modifier, including private.",
                              "The overriding method cannot reduce the visibility (cannot assign weaker access privileges) of the superclass method.",
                              "The overriding method must always be protected.",
                              "The overriding method must have strictly the exact same package-private access modifier."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! In Java, an overriding method cannot assign weaker access privileges than the overridden superclass method (e.g. if the superclass method is public, the subclass method MUST be public). (لا يمكن للدالة المتجاوزة في الابن تقليل مستوى الرؤية الممنوح لها في الأب)."
          },
          {
                    "id": "q8",
                    "question": "Which statement accurately describes constructor inheritance in Java?\n(أي عبارة تصف وراثة المشيدات في جافا بشكل صحيح؟)",
                    "options": [
                              "Subclasses inherit all public and protected constructors of their superclass automatically.",
                              "Subclasses inherit only the default no-argument constructor.",
                              "Constructors are not members of a class and are NEVER inherited by subclasses.",
                              "Subclasses inherit private constructors if they reside in the same package."
                    ],
                    "correctIndex": 2,
                    "explanation": "Correct! Constructors are not class members and are never inherited by subclasses. Instead, subclasses invoke superclass constructors using the 'super(...)' mechanism. (المشيدات ليست عناصر في الفئة ولا تورث أبداً للابن، بل تُستدعى فقط عبر super)."
          },
          {
                    "id": "q9",
                    "question": "Predict the output of the following code:\n\nclass Logger {\n    void log(String msg) {\n        System.out.print(\"[LOG: \" + msg + \"] \");\n    }\n}\nclass AuditLogger extends Logger {\n    void log(String msg) {\n        super.log(msg);\n        System.out.print(\"[AUDITED]\");\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        new AuditLogger().log(\"Login\");\n    }\n}",
                    "options": [
                              "[AUDITED] [LOG: Login]",
                              "[LOG: Login] [AUDITED]",
                              "[LOG: Login]",
                              "Compile-time error: super.log() cannot be called inside log()"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Calling 'super.log(msg)' executes the superclass version first (printing '[LOG: Login] '), and then execution continues in the subclass to print '[AUDITED]'. (استدعاء super.log ينفذ دالة الأب أولاً ثم يكمل تنفيذ كود الابن الإضافي)."
          },
          {
                    "id": "q10",
                    "question": "What is the ultimate root class of all classes in Java, and which methods does every subclass inherit from it?",
                    "options": [
                              "java.lang.System; inherits out, err, and in streams",
                              "java.lang.Class; inherits getConstructors and getFields",
                              "java.lang.Object; inherits toString(), equals(), hashCode(), and getClass()",
                              "java.lang.Root; inherits initialize() and finalize()"
                    ],
                    "correctIndex": 2,
                    "explanation": "Correct! java.lang.Object is the universal root class of every single class in the Java platform. Every class inherits standard object methods like toString(), equals(), hashCode(), and getClass(). (الفئة java.lang.Object هي جذر كل الفئات في جافا وتورث منها جميع الفئات دوال أساسية مثل toString و equals)."
          },
          {
                    "id": "q11",
                    "question": "Consider this multilevel inheritance hierarchy:\n\nclass Tier1 {\n    void identify() { System.out.print(\"Tier1 \"); }\n}\nclass Tier2 extends Tier1 {\n    void identify() { System.out.print(\"Tier2 \"); }\n}\nclass Tier3 extends Tier2 {}\n\npublic class DispatchTest {\n    public static void main(String[] args) {\n        Tier1 obj = new Tier3();\n        obj.identify();\n    }\n}\n\nWhat is printed to the console?",
                    "options": [
                              "Tier1 ",
                              "Tier2 ",
                              "Tier3 ",
                              "Compile-time error: Tier3 does not implement identify()"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Tier3 inherits Tier2's implementation of identify(). Because obj actually refers to a Tier3 instance, dynamic method dispatch finds Tier2's overridden version and prints 'Tier2 '. (يرث Tier3 دالة identify من الفئة الأب المباشرة Tier2، والتوجيه الديناميكي يستدعيها)."
          },
          {
                    "id": "q12",
                    "question": "Suppose class Alpha in package 'com.core' has a protected variable:\n\npackage com.core;\npublic class Alpha {\n    protected int score = 100;\n}\n\nClass Beta is in package 'com.service' and extends Alpha. Class Gamma is also in 'com.service' but does NOT extend Alpha. Which of the following is true?",
                    "options": [
                              "Beta can access score via inheritance (this.score), but Gamma cannot access score on an Alpha instance.",
                              "Both Beta and Gamma can access score directly because score is protected.",
                              "Neither Beta nor Gamma can access score because they are in a different package.",
                              "Gamma can access score, but Beta cannot."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! The 'protected' modifier grants access to subclasses in different packages through inheritance. Unrelated classes in different packages (like Gamma) cannot access protected members. (المعدل protected يسمح للفئات الابنة في الحزم الأخرى بالوصول عبر الوراثة، بينما الفئات غير المرتبطة لا يمكنها الوصول)."
          },
          {
                    "id": "q13",
                    "question": "Examine the following code attempting method overriding:\n\nclass Calculator {\n    double calculate(double input) {\n        return input * 2;\n    }\n}\nclass AdvancedCalculator extends Calculator {\n    @Override\n    int calculate(int input) {\n        return input * 2;\n    }\n}\n\nWhat occurs during compilation?",
                    "options": [
                              "It compiles cleanly; calculate() is successfully overridden.",
                              "Compile-time error: method does not override or implement a method from a supertype because parameter types differ (it is an overload, not an override).",
                              "It compiles, but a ClassCastException is thrown at runtime.",
                              "It compiles only if AdvancedCalculator defines double calculate(double)."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Method overriding requires the exact same parameter list (types and count). 'int calculate(int)' is an overload of 'double calculate(double)', not an override. Because '@Override' is present, the compiler generates an error. (التجاوز يتطلب تطابق أنواع المعاملات؛ اختلاف نوع المعامل يعتبر زيادة تحميل overload وليس تجاوزاً override، مما يفشل فحص @Override)."
          },
          {
                    "id": "q14",
                    "question": "In an enterprise Fleet Management application:\n\nclass FleetVehicle {\n    double calculateToll() { return 15.0; }\n}\nclass CargoTruck extends FleetVehicle {\n    int axles;\n    CargoTruck(int axles) { this.axles = axles; }\n    @Override\n    double calculateToll() {\n        return super.calculateToll() + (axles * 6.5);\n    }\n}\npublic class TollBooth {\n    public static void main(String[] args) {\n        FleetVehicle v = new CargoTruck(2);\n        System.out.println(v.calculateToll());\n    }\n}\n\nWhat is the output printed by the toll booth?",
                    "options": [
                              "15.0",
                              "28.0",
                              "13.0",
                              "Compile-time error: v of type FleetVehicle cannot call calculateToll()"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Dynamic method dispatch invokes CargoTruck's calculateToll(). It calls 'super.calculateToll()' (returning 15.0) and adds 2 * 6.5 = 13.0, resulting in 28.0. (التوجيه الديناميكي يستدعي دالة الشاحنة CargoTruck التي تضيف 13 إلى الـ 15 الأساسية فيكون الناتج 28.0)."
          },
          {
                    "id": "q15",
                    "question": "When an instance of a subclass is created in Java (e.g. 'Dog d = new Dog();' where 'Dog extends Animal'), how is memory allocated on the heap?",
                    "options": [
                              "Two separate objects are allocated: one for Animal and one for Dog, connected by an internal reference.",
                              "A single contiguous memory block is allocated on the heap containing both superclass (Animal) and subclass (Dog) fields.",
                              "Only the subclass fields are allocated; superclass fields reside on the method stack.",
                              "Memory is allocated dynamically on demand only when superclass methods are called."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! In Java, creating a subclass instance allocates a single unified object in heap memory that holds all fields defined across the entire inheritance hierarchy (both superclass and subclass fields). (يتم حجز كائن واحد متكامل في الذاكرة يحوي كافة حقول الفئة الأب والابن معاً)."
          }
        ]
      }
    ]
  }
];
})();
