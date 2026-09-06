/**
 * Java Curriculum Module - Part 10
 * Topics:
 * 19. Method Overriding
 * 20. Access Modifiers
 * 
 * 100% Offline, Pure JavaScript. Complete educational content with full bilingual (English & Arabic) explanations.
 */

(function () {
  'use strict';

  window.JAVA_TOPICS_PART10 = [
    /* ==========================================================================
       TOPIC 19: Method Overriding
       ========================================================================== */
    {
      id: "method-overriding",
      title: "19. Method Overriding",
      description: "Mastering Java Method Overriding: Runtime polymorphism, dynamic method dispatch, @Override annotation, covariant return types, access widening, and exception rules.",
      lessons: [
        {
          id: "overriding-mastery",
          title: "Complete Guide to Method Overriding",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "Understanding Method Overriding in Java (فهم تجاوز وإعادة تعريف الدوال في جافا)"
            },
            {
              type: "paragraph",
              text: "Method Overriding occurs when a subclass provides its own specific implementation of a method that has already been defined in its superclass. Overriding enables Runtime (Dynamic) Polymorphism, where the Java Virtual Machine (JVM) decides which method version to execute at runtime based on the actual object created in heap memory, regardless of the reference type."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "تجاوز الدوال (Method Overriding) هو آلية تقدم فيها الفئة الابنة تنفيذاً خاصاً ومخصصاً لدالة معرفة مسبقاً في الفئة الأب. يحقق هذا المبدأ تعدد الأشكال في وقت التشغيل (Runtime / Dynamic Polymorphism)، حيث تحدد آلة جافا الافتراضية (JVM) أثناء تشغيل البرنامج أي نسخة من الدالة يجب استدعاؤها بناءً على الكائن الفعلي المخزن في الذاكرة وليس نوع المتغير المرجعي."
            },
            {
              type: "paragraph",
              text: "Strict Rules of Overriding: 1) Method name and parameter list must be identical; 2) Return type must be identical or a subtype (Covariant Return); 3) Access level cannot be more restrictive; 4) Cannot throw broader or new checked exceptions; 5) Private, static, and final methods CANNOT be overridden."
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
              text: "Example 1: Basic Method Overriding with @Override (المثال 1: تجاوز الدالة الأساسي بالتعليق @Override)"
            },
            {
              type: "paragraph",
              text: "Using the @Override annotation to catch signature typos at compile time."
            },
            {
              type: "code",
              language: "java",
              filename: "BasicOverridingDemo.java",
              code: `public class BasicOverridingDemo {
    static class Vehicle {
        void startEngine() {
            System.out.println("Generic combustion engine starts with ignition spark.");
        }
    }

    static class ElectricCar extends Vehicle {
        @Override
        void startEngine() {
            System.out.println("Electric powertrain silently booted via high-voltage battery relay.");
        }
    }

    public static void main(String[] args) {
        Vehicle v1 = new Vehicle();
        Vehicle v2 = new ElectricCar(); // Upcasting

        v1.startEngine();
        v2.startEngine(); // Dynamic dispatch calls ElectricCar version!
    }
}`,
              output: `Generic combustion engine starts with ignition spark.
Electric powertrain silently booted via high-voltage battery relay.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "The JVM checks the object instance on the heap: for v2, it sees an ElectricCar and invokes ElectricCar's overridden method."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "تفحص آلة جافا الكائن الموجود في الذاكرة؛ ولأن v2 يشير لكائن ElectricCar، يُنفذ كود الدالة المعدلة في الفئة الابنة."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Dynamic Method Dispatch Across Hierarchy (المثال 2: التوجيه الديناميكي عبر شجرة الوراثة)"
            },
            {
              type: "paragraph",
              text: "Uniform polymorphic method invocation over an array of varied subclasses."
            },
            {
              type: "code",
              language: "java",
              filename: "DynamicDispatchDemo.java",
              code: `public class DynamicDispatchDemo {
    static class Document {
        void print() { System.out.println("Printing plain text document."); }
    }

    static class PdfDocument extends Document {
        @Override void print() { System.out.println("Rendering and printing vector PDF page."); }
    }

    static class SpreadsheetDocument extends Document {
        @Override void print() { System.out.println("Calculating cell grids and printing spreadsheet."); }
    }

    public static void main(String[] args) {
        Document[] batch = {
            new Document(),
            new PdfDocument(),
            new SpreadsheetDocument()
        };

        for (Document doc : batch) {
            doc.print(); // Resolved dynamically at runtime
        }
    }
}`,
              output: `Printing plain text document.
Rendering and printing vector PDF page.
Calculating cell grids and printing spreadsheet.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "Each document in the loop dynamically executes its own overridden print() logic based on its concrete type."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "ينفذ كل مستند داخل الحلقة نسخة الطباعة الخاصة به ديناميكياً اعتماداً على نوع الكائن الفعلي المخزن."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Augmenting Overridden Logic with super.method() (المثال 3: تعزيز كود الأب باستدعاء super)"
            },
            {
              type: "paragraph",
              text: "Invoking parent functionality before or after adding subclass logic."
            },
            {
              type: "code",
              language: "java",
              filename: "SuperAugmentOverridingDemo.java",
              code: `public class SuperAugmentOverridingDemo {
    static class Order {
        void process() {
            System.out.println("Step 1: Validating inventory stock.");
            System.out.println("Step 2: Charging credit card.");
        }
    }

    static class InternationalOrder extends Order {
        @Override
        void process() {
            super.process(); // Execute parent steps 1 & 2
            System.out.println("Step 3: Calculating customs import duty & international shipping tariffs.");
        }
    }

    public static void main(String[] args) {
        Order intl = new InternationalOrder();
        intl.process();
    }
}`,
              output: `Step 1: Validating inventory stock.
Step 2: Charging credit card.
Step 3: Calculating customs import duty & international shipping tariffs.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "'super.process()' avoids rewriting the base validation logic, allowing the subclass to cleanly append customs checks."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "تمنع 'super.process()' إعادة كتابة خطوات التحقق الأساسية، مما يمكن الفئة الابنة من إضافة مرحلة الجمارك بسلاسة."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Covariant Return Types (المثال 4: الأنواع المرجعة المتوافقة Covariant Return Types)"
            },
            {
              type: "paragraph",
              text: "An overriding method can return a more specific subclass of the return type declared in the parent method."
            },
            {
              type: "code",
              language: "java",
              filename: "CovariantReturnDemo.java",
              code: `public class CovariantReturnDemo {
    static class Producer {
        Object produce() {
            return "Generic Raw Object";
        }
    }

    static class StringProducer extends Producer {
        // String is a subtype of Object: valid covariant return!
        @Override
        String produce() {
            return "Specialized String Payload";
        }
    }

    public static void main(String[] args) {
        StringProducer sp = new StringProducer();
        // No casting needed when calling through child reference!
        String result = sp.produce();
        System.out.println("Produced: " + result);
    }
}`,
              output: `Produced: Specialized String Payload`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "Covariant return types (introduced in Java 5) allow the overriding method to return a narrower subtype, saving callers from explicit typecasting."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "تتيح ميزة Covariant Return للدالة المتجاوزة إرجاع نوع أكثر تخصصاً (مثل String بدلاً من Object) دون الحاجة لتحويل قسري للأنواع."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Widening Access Modifiers During Overriding (المثال 5: توسيع نطاق الوصول أثناء التجاوز)"
            },
            {
              type: "paragraph",
              text: "Subclasses can widen visibility (e.g. protected -> public), but can NEVER restrict it."
            },
            {
              type: "code",
              language: "java",
              filename: "WideningAccessDemo.java",
              code: `public class WideningAccessDemo {
    static class BaseService {
        // Protected visibility
        protected void executeTask() {
            System.out.println("BaseService executing protected task.");
        }
    }

    static class PublicService extends BaseService {
        // Widened from 'protected' to 'public' (Completely Valid!)
        @Override
        public void executeTask() {
            System.out.println("PublicService executing widely accessible task.");
        }
    }

    public static void main(String[] args) {
        PublicService ps = new PublicService();
        ps.executeTask();
    }
}`,
              output: `PublicService executing widely accessible task.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "You can increase visibility (e.g. protected to public), which respects the Liskov Substitution Principle."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "يُسمح بتوسيع نطاق الوصول في الدالة المتجاوزة (مثل تحويل protected إلى public)، لأن ذلك لا يخالف مبدأ التوافق."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Compiler Error When Narrowing Access (المثال 6: منع تضييق نطاق الوصول)"
            },
            {
              type: "paragraph",
              text: "Demonstrating that making an overridden method more restrictive causes a compile failure."
            },
            {
              type: "code",
              language: "java",
              filename: "NarrowingAccessErrorDemo.java",
              code: `public class NarrowingAccessErrorDemo {
    static class Parent {
        public void broadcast() {
            System.out.println("Public parent broadcast.");
        }
    }

    static class Child extends Parent {
        // UNCOMMENTING CAUSES COMPILER ERROR:
        // @Override
        // protected void broadcast() { ... }
        // Error: broadcast() in Child cannot override broadcast() in Parent;
        // attempting to assign weaker access privileges; was public

        @Override
        public void broadcast() {
            System.out.println("Child maintains public accessibility.");
        }
    }

    public static void main(String[] args) {
        new Child().broadcast();
    }
}`,
              output: `Child maintains public accessibility.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "An overriding method cannot have weaker access privileges than the method it overrides. A public method must remain public in subclasses."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "لا يمكن للدالة المتجاوزة أن تكون أضيق في نطاق الرؤية؛ فإذا كانت دالة الأب public، يجب أن تظل public في الابن."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Preventing Overriding with the 'final' Keyword (المثال 7: منع التجاوز بالكلمة final)"
            },
            {
              type: "paragraph",
              text: "Securing sensitive algorithms from being altered by subclasses."
            },
            {
              type: "code",
              language: "java",
              filename: "FinalMethodOverridingDemo.java",
              code: `public class FinalMethodOverridingDemo {
    static class SecurityCore {
        // Final method cannot be overridden!
        public final void verifyDigitalSignature() {
            System.out.println("Verifying SHA-256 cryptographic certificate.");
        }

        public void regularTask() {
            System.out.println("Regular task can be overridden.");
        }
    }

    static class CustomSecurity extends SecurityCore {
        // Trying to override verifyDigitalSignature() causes a compile error:
        // 'cannot override final method from SecurityCore'

        @Override
        public void regularTask() {
            System.out.println("Customized security task.");
        }
    }

    public static void main(String[] args) {
        CustomSecurity sec = new CustomSecurity();
        sec.verifyDigitalSignature();
        sec.regularTask();
    }
}`,
              output: `Verifying SHA-256 cryptographic certificate.
Customized security task.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "Marking a method 'final' prevents subclasses from altering its logic, guaranteeing consistency for critical security algorithms."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "تعريف الدالة كـ 'final' يقفلها ويمنع أي فئة وارثة من تجاوزها، مما يحمي الخوارزميات الحساسة من التلاعب."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Static Method Hiding vs Instance Method Overriding (المثال 8: حجب الدوال الساكنة مقابل تجاوز دوال الكائنات)"
            },
            {
              type: "paragraph",
              text: "Static methods cannot be overridden; they are hidden, and calls are resolved by reference type at compile time."
            },
            {
              type: "code",
              language: "java",
              filename: "StaticMethodHidingDemo.java",
              code: `public class StaticMethodHidingDemo {
    static class SuperClass {
        static void staticDisplay() { System.out.println("SuperClass static method"); }
        void instanceDisplay() { System.out.println("SuperClass instance method"); }
    }

    static class SubClass extends SuperClass {
        // Method Hiding (NOT overriding!)
        static void staticDisplay() { System.out.println("SubClass static method"); }

        // Method Overriding
        @Override
        void instanceDisplay() { System.out.println("SubClass instance method"); }
    }

    public static void main(String[] args) {
        SuperClass ref = new SubClass();

        // Static method resolution: bound at compile-time by reference type (SuperClass)
        ref.staticDisplay();

        // Instance method resolution: resolved at runtime by heap object (SubClass)
        ref.instanceDisplay();
    }
}`,
              output: `SuperClass static method
SubClass instance method`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "Static methods are hidden, not overridden. The static method called is determined by the declared reference type, whereas instance methods use dynamic dispatch."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "الدوال الساكنة لا تتجاوز بل تُحجب (Hidden)، ويحدد نوع المتغير المرجعي نسختها في وقت التصريف، بعكس دوال الكائنات التي ترتبط بالكائن الفعلي في الذاكرة."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Exception Handling Rules in Overriding (المثال 9: قواعد الاستثناءات في تجاوز الدوال)"
            },
            {
              type: "paragraph",
              text: "An overriding method cannot throw broader or new checked exceptions than the superclass method."
            },
            {
              type: "code",
              language: "java",
              filename: "OverridingExceptionsDemo.java",
              code: `import java.io.IOException;

public class OverridingExceptionsDemo {
    static class FileLoader {
        // Throws checked IOException
        void loadFile() throws IOException {
            System.out.println("Loading generic file stream.");
        }
    }

    static class SafeFileLoader extends FileLoader {
        // Rule: Can throw fewer checked exceptions, more specific exceptions, or NONE at all!
        @Override
        void loadFile() {
            // Catches error internally or throws unchecked RuntimeExceptions
            System.out.println("SafeFileLoader: file loaded with zero checked exceptions.");
        }
    }

    public static void main(String[] args) {
        FileLoader loader = new SafeFileLoader();
        try {
            loader.loadFile();
        } catch (IOException e) {
            System.out.println("IO Error");
        }
    }
}`,
              output: `SafeFileLoader: file loaded with zero checked exceptions.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "Subclasses cannot introduce new or broader checked exceptions, ensuring caller try-catch blocks remain valid."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "لا يمكن للدالة المتجاوزة رمي استثناءات مفحوصة (Checked) جديدة أو أوسع من دالة الأب، وذلك للحفاظ على سلامة معالجة الأخطاء لدى المستدعي."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Multilevel Inheritance Overriding (المثال 10: التجاوز عبر مستويات وراثة متعددة)"
            },
            {
              type: "paragraph",
              text: "Tracking how method calls resolve down a chain of 3 generations."
            },
            {
              type: "code",
              language: "java",
              filename: "MultilevelOverridingDemo.java",
              code: `public class MultilevelOverridingDemo {
    static class TierA {
        void render() { System.out.println("TierA: Wireframe render"); }
    }

    static class TierB extends TierA {
        @Override void render() { System.out.println("TierB: Textured mesh render"); }
    }

    static class TierC extends TierB {
        @Override void render() { System.out.println("TierC: Photorealistic Ray-Traced render"); }
    }

    public static void main(String[] args) {
        TierA obj = new TierC();
        obj.render(); // Resolves to the deepest override: TierC
    }
}`,
              output: `TierC: Photorealistic Ray-Traced render`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "The JVM travels to the lowest and most specific implementation that belongs to the object instantiated in heap memory."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "تصل آلة جافا دائماً إلى أحدث وأعمق نسخة من الدالة تخص الكائن المخزن فعلياً في الذاكرة."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Enterprise Tax Calculation Engine with Overriding (المثال 11: محرك حساب الضرائب الدولي المتكامل)"
            },
            {
              type: "paragraph",
              text: "Advanced: Real-world international tax calculator where regional subclasses override taxation calculations."
            },
            {
              type: "code",
              language: "java",
              filename: "TaxCalculatorMaster.java",
              code: `public class TaxCalculatorMaster {
    static class TaxCalculator {
        double calculateTax(double grossAmount) {
            // Default baseline flat tax: 10%
            return grossAmount * 0.10;
        }

        String getRegionName() { return "International Default (10%)"; }
    }

    static class SaudiTaxCalculator extends TaxCalculator {
        @Override
        double calculateTax(double grossAmount) {
            // Saudi standard VAT: 15%
            return grossAmount * 0.15;
        }

        @Override
        String getRegionName() { return "Saudi Arabia VAT (15%)"; }
    }

    static class ZeroTaxZoneCalculator extends TaxCalculator {
        @Override
        double calculateTax(double grossAmount) {
            // Duty-free economic zone: 0%
            return 0.0;
        }

        @Override
        String getRegionName() { return "Free Economic Zone (0%)"; }
    }

    public static void main(String[] args) {
        double invoiceSubtotal = 1000.0;

        TaxCalculator[] regionalCalculators = {
            new TaxCalculator(),
            new SaudiTaxCalculator(),
            new ZeroTaxZoneCalculator()
        };

        for (TaxCalculator calc : regionalCalculators) {
            double tax = calc.calculateTax(invoiceSubtotal);
            System.out.printf("[%s] Tax on $%.2f is $%.2f (Total: $%.2f)%n",
                calc.getRegionName(), invoiceSubtotal, tax, invoiceSubtotal + tax);
        }
    }
}`,
              output: `[International Default (10%)] Tax on $1000.00 is $100.00 (Total: $1100.00)
[Saudi Arabia VAT (15%)] Tax on $1000.00 is $150.00 (Total: $1150.00)
[Free Economic Zone (0%)] Tax on $1000.00 is $0.00 (Total: $1000.00)`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "Regional tax engines override calculateTax polymorphically, allowing invoices to calculate regional taxes uniformly."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "تتجاوز الفئات الإقليمية دالة حساب الضريبة بما يناسب قوانين كل دولة، ويتم استدعاؤها بتعدد الأشكال لجميع الفواتير بشكل موحد."
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
                "Mistake 1: Accidental overloading instead of overriding due to mismatched parameter types (e.g. parent has method(int), child has method(double)). Always use @Override to catch this at compile time!",
                "خطأ 1: الوقوع في التحميل الزائد دون قصد بدلاً من التجاوز بسبب اختلاف طفيف في المعاملات. استخدم دائماً التعليق @Override ليكتشف المصرف الخطأ.",
                "Mistake 2: Trying to override a static method. Static methods are hidden, not overridden, and do not use dynamic dispatch.",
                "خطأ 2: محاولة تجاوز دالة ساكنة static؛ فالدوال الساكنة تُحجب ولا تخضع للتوجيه الديناميكي.",
                "Mistake 3: Attempting to reduce method visibility (e.g. overriding a public method as protected). Java strictly forbids reducing access permissions."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Banking Account Fee Structure (التحدي العملي: هيكل رسوم الحسابات البنكية)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Build a banking fee system: 1) Superclass 'BankAccount' with 'double calculateMonthlyFee()' returning a standard $12.0 fee; 2) Subclass 'PremiumAccount' overriding the fee to return $0.0 (waived fee); 3) Subclass 'StudentAccount' overriding the fee to return $2.50; 4) In main(), process an array of BankAccount objects displaying their calculated fees polymorphically."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: قم ببناء نظام رسوم بنكي: 1) فئة أساسية BankAccount تحتوي على دالة calculateMonthlyFee() ترجع 12.0 دولاراً؛ 2) فئة فرعية PremiumAccount تتجاوز الدالة لترجع 0.0 (حساب معفى)؛ 3) فئة فرعية StudentAccount تتجاوز الدالة لترجع 2.50 دولار؛ 4) في main، احسب الرسوم الشهرية لمصفوفة من الحسابات بتعدد الأشكال."
            },
            {
              type: "code",
              language: "java",
              filename: "BankAccountFeeChallenge.java",
              code: `public class BankAccountFeeChallenge {
    static class BankAccount {
        String accountId;
        BankAccount(String id) { this.accountId = id; }

        double calculateMonthlyFee() {
            return 12.0; // Standard monthly maintenance fee
        }
    }

    static class PremiumAccount extends BankAccount {
        PremiumAccount(String id) { super(id); }

        @Override
        double calculateMonthlyFee() {
            return 0.0; // Waived for premium tier
        }
    }

    static class StudentAccount extends BankAccount {
        StudentAccount(String id) { super(id); }

        @Override
        double calculateMonthlyFee() {
            return 2.50; // Heavily subsidized student fee
        }
    }

    public static void main(String[] args) {
        BankAccount[] accounts = {
            new BankAccount("ACC-STANDARD-01"),
            new PremiumAccount("ACC-PREMIUM-99"),
            new StudentAccount("ACC-STUDENT-44")
        };

        for (BankAccount acc : accounts) {
            System.out.printf("Account: %-16s | Monthly Fee: $%.2f%n",
                acc.accountId, acc.calculateMonthlyFee());
        }
    }
}`,
              output: `Account: ACC-STANDARD-01  | Monthly Fee: $12.00
Account: ACC-PREMIUM-99   | Monthly Fee: $0.00
Account: ACC-STUDENT-44   | Monthly Fee: $2.50`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "Subclasses override 'calculateMonthlyFee()' with custom fee schedules. Polymorphic calls automatically route to the corresponding tier fee."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "تتجاوز الفئات الفرعية دالة حساب الرسوم لتقديم رسوم مخصصة لكل فئة عملاء، وتُستدعى النسخة الصحيحة تلقائياً بفضل التوجيه الديناميكي."
            }
          ],
          quiz: [
                    {
                              "id": "q1",
                              "question": "What is the primary requirement for valid Method Overriding in Java?\n(ما هو الشرط الأساسي لتجاوز الدوال Method Overriding بشكل صحيح في جافا؟)",
                              "options": [
                                        "The method in the subclass must have the same name and parameter list as the method in the superclass.",
                                        "The method in the subclass must have the same name but a different number of parameters.",
                                        "The method must be declared with the static keyword in both classes.",
                                        "The method in the subclass must have a more restrictive access modifier than the superclass."
                              ],
                              "correctIndex": 0,
                              "explanation": "Correct! Method Overriding requires that a subclass method have the exact same name and parameter list (types, number, and order) as a method in its superclass. (يتطلب تجاوز الدوال أن تمتلك دالة الفئة الفرعية نفس الاسم ونفس قائمة المعاملات تماماً كالدالة الموجودة في الفئة الأب)."
                    },
                    {
                              "id": "q2",
                              "question": "What is the primary compiler benefit of placing the @Override annotation above an overriding method?\n(ما هي الفائدة الأساسية للتعليق @Override بالنسبة للمصرف؟)",
                              "options": [
                                        "It forces the JVM to execute the method faster at runtime.",
                                        "It instructs the compiler to verify that the method actually overrides a superclass method, catching accidental typos or signature mismatches at compile time.",
                                        "It allows the method to override static and final methods.",
                                        "It makes the method accessible from any package."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! The @Override annotation instructs the Java compiler to verify that a matching method exists in the superclass or interface. If there is a typo in the method name or a parameter mismatch, the compiler raises an immediate error. (يجبر التعليق @Override المصرف على التأكد من وجود الدالة في فئة الأب، مما يكتشف الأخطاء الإملائية واختلاف المعاملات أثناء التصريف مباشرة)."
                    },
                    {
                              "id": "q3",
                              "question": "Given the following classes:\n\nclass Animal {\n    void speak() { System.out.print(\"Sound \"); }\n}\nclass Dog extends Animal {\n    @Override\n    void speak() { System.out.print(\"Bark \"); }\n}\n\nWhat is the output of: Animal a = new Dog(); a.speak();?",
                              "options": [
                                        "Sound",
                                        "Bark",
                                        "Sound Bark",
                                        "Compile-time error: type mismatch"
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! In Java, method calls on objects are resolved using Dynamic Method Dispatch (runtime polymorphism). Because the actual object on the heap is an instance of Dog, Dog's overridden speak() method is invoked, printing 'Bark '. (بفضل التوجيه الديناميكي للدوال في وقت التشغيل، يُستدعى التنفيذ الفعلي للكائن الموجود في الذاكرة Dog، فيطبع Bark)."
                    },
                    {
                              "id": "q4",
                              "question": "How can an overriding subclass method invoke the superclass's implementation of that same method?\n(كيف يمكن لدالة متجاوزة في فئة فرعية استدعاء تنفيذ فئة الأب لنفس تلك الدالة؟)",
                              "options": [
                                        "Using this.methodName()",
                                        "Using parent.methodName()",
                                        "Using super.methodName()",
                                        "Using base.methodName()"
                              ],
                              "correctIndex": 2,
                              "explanation": "Correct! The 'super' keyword allows the subclass method to explicitly invoke the superclass's version of an overridden method (e.g. super.speak();), enabling method augmentation without recursion. (تُستخدم الكلمة المفتاحية super لاستدعاء نسخة دالة فئة الأب، مما يتيح تعزيز السلوك دون تكرار الكود أو حدوث دوران لانهائي)."
                    },
                    {
                              "id": "q5",
                              "question": "What is a Covariant Return Type in Java?\n(ما هو نوع الإرجاع المتوافق Covariant Return Type في جافا؟)",
                              "options": [
                                        "A return type that automatically converts primitives to Strings.",
                                        "An overriding subclass method returning a subtype of the return type declared in the superclass method.",
                                        "A method returning multiple values simultaneously.",
                                        "A return type that must be void in all subclasses."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Since Java 5, an overriding method is permitted to return a subtype (narrower class) of the superclass method's return type. For example, if Super returns Number, Sub can return Integer. (يتيح نوع الإرجاع المتوافق للدالة المتجاوزة في الابن إرجاع فئة فرعية أكثر تخصيصاً من النوع المصرح عنه في الأب، مثل إرجاع Integer بدلاً من Number)."
                    },
                    {
                              "id": "q6",
                              "question": "What is the rule regarding access modifiers when overriding a method in Java?\n(ما هي القاعدة المنظمة لمحددات الوصول عند تجاوز دالة في جافا؟)",
                              "options": [
                                        "The overriding method can maintain the same visibility or widen it, but CANNOT make it more restrictive.",
                                        "The overriding method must always be private.",
                                        "The overriding method must have a more restrictive access level than the superclass method.",
                                        "Access modifiers have no relationship to method overriding."
                              ],
                              "correctIndex": 0,
                              "explanation": "Correct! An overriding method cannot reduce the visibility of the inherited method. For example, a protected method in the superclass can be overridden as protected or public, but NOT as package-private (default) or private. (لا يمكن للدالة المتجاوزة تضييق نطاق الوصول؛ فيمكن الحفاظ على نفس المستوى أو توسيعه كتحويل protected إلى public، ولكن يمنع تضييقه كتحويله إلى private)."
                    },
                    {
                              "id": "q7",
                              "question": "What happens when compiling the following code?\n\nclass Service {\n    public void execute() { System.out.println(\"Exec\"); }\n}\nclass SecureService extends Service {\n    @Override\n    protected void execute() { System.out.println(\"Secure Exec\"); }\n}",
                              "options": [
                                        "It compiles and runs successfully.",
                                        "Compile-time error: attempting to assign weaker access privileges ('protected'); was 'public'.",
                                        "It compiles, but throws an IllegalAccessException at runtime.",
                                        "It compiles only if SecureService is in the same package as Service."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! The superclass declared execute() as public. SecureService attempts to narrow the access to protected, which violates the Liskov Substitution Principle and results in a compile-time error. (الدالة في الأب معرفة كـ public، ومحاولة الابن تقليصها إلى protected تفشل برمجياً أثناء التصريف لمخالفتها مبدأ استبدال لسكوف)."
                    },
                    {
                              "id": "q8",
                              "question": "What occurs if a subclass attempts to override a method declared as 'final' in its superclass?\n(ماذا يحدث إذا حاولت فئة فرعية تجاوز دالة معرّفة بالكلمة final في فئتها الأب؟)",
                              "options": [
                                        "The code compiles and runs, but displays a compiler warning.",
                                        "The subclass method hides the superclass method at runtime.",
                                        "A compile-time error occurs stating that the final method cannot be overridden.",
                                        "The final keyword is automatically ignored by modern Java compilers."
                              ],
                              "correctIndex": 2,
                              "explanation": "Correct! Marking a method 'final' explicitly prohibits subclasses from overriding it. Any attempt to override a final method results in a compile-time error. (تمييز الدالة بالكلمة final يمنع الفئات الفرعية من تجاوزها قطعياً، ومحاولة ذلك تسبب خطأ تصريف فوري)."
                    },
                    {
                              "id": "q9",
                              "question": "Consider the following code:\n\nclass SuperClass {\n    static void printGreeting() { System.out.print(\"Hello from Super \"); }\n}\nclass SubClass extends SuperClass {\n    static void printGreeting() { System.out.print(\"Hello from Sub \"); }\n}\n\nWhat is the output of executing:\nSuperClass ref = new SubClass();\nref.printGreeting();",
                              "options": [
                                        "Hello from Sub",
                                        "Hello from Super",
                                        "Compile-time error: static methods cannot be named the same in subclasses.",
                                        "Runtime exception: NoSuchMethodError"
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Static methods are NOT overridden; they are hidden (Method Hiding). Static method resolution occurs at compile-time based on the declared reference type (SuperClass), not the runtime object (SubClass). Thus, SuperClass's printGreeting() is executed. (الدوال الساكنة لا تخضع للتجاوز الديناميكي بل للحجب method hiding، وتُحدد في وقت التصريف حسب نوع المرجع SuperClass فتطبع Hello from Super)."
                    },
                    {
                              "id": "q10",
                              "question": "What are the rules regarding Checked Exceptions when overriding a method in Java?\n(ما هي قواعد الاستثناءات التي يجب فحصها Checked Exceptions عند تجاوز دالة في جافا؟)",
                              "options": [
                                        "The overriding method can throw any broader or new checked exception.",
                                        "The overriding method can declare fewer, narrower (subclasses of), or NO checked exceptions, but CANNOT declare new or broader checked exceptions.",
                                        "The overriding method must throw identical exceptions and cannot omit any of them.",
                                        "Exceptions cannot be declared in overriding methods."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! An overriding method cannot declare new or broader checked exceptions than those declared by the superclass method, because callers expecting the superclass interface must not be surprised by undeclared checked exceptions. (لا يمكن للدالة المتجاوزة إعلان استثناءات مفحوصة جديدة أو أوسع من دالة الأب، بينما يحق لها تضييقها أو حذفها تماماً)."
                    },
                    {
                              "id": "q11",
                              "question": "Can a private method in a superclass be overridden in a subclass?\n(هل يمكن لدالة خاصة private في الفئة الأب أن تخضع للتجاوز في الفئة الابن؟)",
                              "options": [
                                        "Yes, if the subclass method is also private.",
                                        "Yes, if the subclass is in the same package.",
                                        "No, because private methods are not inherited or visible to subclasses; a method with the same name in the subclass is completely independent.",
                                        "Yes, using the @Override annotation."
                              ],
                              "correctIndex": 2,
                              "explanation": "Correct! Private methods are encapsulated within the declaring class and are never inherited. Therefore, a method with the same signature in a subclass does not override it; it is treated as an entirely separate, unrelated method. (الدوال الخاصة private غير مرئية للفئات الفرعية ولا تورث؛ لذا فإن كتابة دالة بنفس الاسم في الابن تعتبر دالة جديدة ومستقلة تماماً وليست تجاوزاً)."
                    },
                    {
                              "id": "q12",
                              "question": "Consider this 3-tier inheritance structure:\n\nclass A { void test() { System.out.print(\"A \"); } }\nclass B extends A { void test() { System.out.print(\"B \"); } }\nclass C extends B { void test() { super.test(); System.out.print(\"C \"); } }\n\nWhat is printed by: A ref = new C(); ref.test();?",
                              "options": [
                                        "A C",
                                        "B C",
                                        "A B C",
                                        "C"
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! The runtime object is C. Calling ref.test() dispatches to C.test(). Inside C.test(), super.test() invokes the immediate parent's method B.test(), which prints 'B '. Then C.test() prints 'C '. The output is 'B C '. (الكائن الفعلي هو C، واستدعاء super.test() داخل C يوجه التنفيذ إلى فئة الأب المباشرة B فتطبع B ثم تطبع C الناتج B C)."
                    },
                    {
                              "id": "q13",
                              "question": "Consider the following code:\n\nclass Vehicle {\n    String name = \"Vehicle\";\n    String getName() { return name; }\n}\nclass Car extends Vehicle {\n    String name = \"Car\";\n    @Override\n    String getName() { return name; }\n}\n\nWhat is printed by:\nVehicle v = new Car();\nSystem.out.println(v.name + \" | \" + v.getName());",
                              "options": [
                                        "Car | Car",
                                        "Vehicle | Vehicle",
                                        "Vehicle | Car",
                                        "Car | Vehicle"
                              ],
                              "correctIndex": 2,
                              "explanation": "Correct! In Java, instance variables are NOT polymorphic (they are shadowed, not overridden) and are resolved at compile-time based on the reference type (Vehicle -> \"Vehicle\"). Methods ARE polymorphic and resolve at runtime based on the actual object (Car -> \"Car\"). Output is 'Vehicle | Car'. (المتغيرات في جافا لا تخضع لتعدد الأشكال وتعتمد على نوع المرجع Vehicle، بينما الدوال تخضع لتعدد الأشكال وتعتمد على الكائن الفعلي Car فتنتج Vehicle | Car)."
                    },
                    {
                              "id": "q14",
                              "question": "In an enterprise tax engine, why is method overriding preferable to a large switch-case statement based on country code?\n(في محرك حساب الضرائب المؤسسي، لماذا يُفضل تجاوز الدوال على جملة switch-case الكبيرة؟)",
                              "options": [
                                        "Because switch-case statements execute much slower than method overriding.",
                                        "Because overriding adheres to the Open/Closed Principle (OCP): new country tax rules can be added as new subclasses without modifying existing tested code.",
                                        "Because switch statements cannot handle strings in Java.",
                                        "Because overriding uses less heap memory than switch cases."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Overriding embodies the Open/Closed Principle (open for extension, closed for modification). Adding support for a new jurisdiction simply requires extending TaxCalculator and overriding calculateTax(), leaving the core orchestrator untouched. (تجاوز الدوال يحقق مبدأ Open/Closed؛ حيث يمكن إضافة دول وضرائب جديدة عبر فئات فرعية مستقلة دون المساس بالكود الأساسي المستقر أو تعديله)."
                    },
                    {
                              "id": "q15",
                              "question": "What is printed by executing the following code?\n\nclass Parent {\n    Parent() { init(); }\n    void init() { System.out.print(\"ParentInit \"); }\n}\nclass Child extends Parent {\n    int count = 99;\n    @Override\n    void init() { System.out.print(\"ChildCount:\" + count + \" \"); }\n}\n\npublic class TrapTest {\n    public static void main(String[] args) {\n        new Child();\n    }\n}",
                              "options": [
                                        "ParentInit",
                                        "ChildCount:99",
                                        "ChildCount:0",
                                        "Compile-time error: count is not initialized."
                              ],
                              "correctIndex": 2,
                              "explanation": "Correct! During Child instantiation, the Parent constructor runs first and invokes init(). Because init() is overridden in Child, Child's init() executes before Child's field initializers have run! At that moment, count holds its default value 0, printing 'ChildCount:0 '. This is a classic Java anti-pattern (calling overridable methods inside constructors). (ينفذ مشيد الأب أولاً ويستدعي init المتجاوزة في الابن قبل أن تبدأ تهيئة حقول الابن؛ فيكون count لا يزال بقيمته الافتراضية 0)."
                    }
          ]
        }
      ]
    },

    /* ==========================================================================
       TOPIC 20: Access Modifiers
       ========================================================================== */
    {
      id: "access-modifiers",
      title: "20. Access Modifiers",
      description: "Comprehensive guide to Java Access Modifiers: private, default (package-private), protected, public, the access matrix, least privilege, and defensive copying.",
      lessons: [
        {
          id: "access-modifiers-mastery",
          title: "Complete Guide to Java Access Modifiers",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "Understanding Java Access Modifiers (فهم محددات الوصول في جافا)"
            },
            {
              type: "paragraph",
              text: "Access Modifiers in Java are reserved keywords that set the accessibility (visibility) of classes, constructors, methods, and variables. They enforce the Principle of Least Privilege and form the foundational bedrock of Encapsulation. Java provides four distinct levels of access: 1) private; 2) default (package-private, when no modifier is specified); 3) protected; 4) public."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "محددات الوصول (Access Modifiers) في لغة جافا هي كلمات مفتاحية تحدد نطاق الرؤية وإمكانية الوصول للفئات والمشيدات والمتغيرات والدوال من أجزاء البرنامج المختلفة. تطبق هذه المحددات مبدأ 'الحد الأدنى من الصلاحيات' وتشكل حجر الأساس لمفهوم الكبسلة (Encapsulation). توفر جافا أربعة مستويات للوصول: 1) خاص private؛ 2) افتراضي Default (على مستوى الحزمة package-private عند عدم كتابة أي كلمة)؛ 3) محمي protected؛ 4) عام public."
            },
            {
              type: "paragraph",
              text: "The Visibility Scope Matrix: 'private' is accessible only within the declaring class; 'default' is accessible within the same package; 'protected' is accessible within the package AND by subclasses in different packages; 'public' is accessible from everywhere."
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
              text: "Example 1: The 'private' Modifier (المثال 1: محدد الوصول الخاص private)"
            },
            {
              type: "paragraph",
              text: "Restricting attribute access strictly to the enclosing class."
            },
            {
              type: "code",
              language: "java",
              filename: "PrivateModifierDemo.java",
              code: `public class PrivateModifierDemo {
    static class BankVault {
        private double cashReserves = 500000.0; // Inaccessible outside BankVault

        // Public method provides controlled access
        public double getAuditBalance() {
            return cashReserves;
        }
    }

    public static void main(String[] args) {
        BankVault vault = new BankVault();
        // System.out.println(vault.cashReserves); // COMPILER ERROR: cashReserves has private access!
        System.out.println("Audited Balance: $" + vault.getAuditBalance());
    }
}`,
              output: `Audited Balance: $500000.0`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "Private fields cannot be read or modified directly from other classes, preventing unauthorized tampering."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "الحقول المعرفة كـ private لا يمكن قراءتها أو تعديلها من أي فئة أخرى، مما يحمي البيانات الحساسة."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Default (Package-Private) Access (المثال 2: الوصول الافتراضي على مستوى الحزمة Package-Private)"
            },
            {
              type: "paragraph",
              text: "Omitting the modifier restricts access to classes inside the same package."
            },
            {
              type: "code",
              language: "java",
              filename: "PackagePrivateDemo.java",
              code: `public class PackagePrivateDemo {
    static class InternalEngine {
        // No modifier = Default (Package-Private)
        int rpm = 3000;

        void tune() {
            System.out.println("Engine tuned to " + rpm + " RPM within package.");
        }
    }

    public static void main(String[] args) {
        InternalEngine engine = new InternalEngine();
        // Accessible because main is within the same enclosing file/package
        System.out.println("Current RPM: " + engine.rpm);
        engine.tune();
    }
}`,
              output: `Current RPM: 3000
Engine tuned to 3000 RPM within package.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "When no modifier is written, members are visible to any class in the same package, but completely invisible to external packages."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "عند عدم كتابة أي محدد وصول، يكون العنصر متاحاً لجميع الفئات داخل نفس الحزمة، ومخفياً تماماً عن الحزم الخارجية."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: The 'protected' Modifier Across Inheritance (المثال 3: محدد الوصول المحمي protected مع الوراثة)"
            },
            {
              type: "paragraph",
              text: "Allowing subclasses (even in other packages) to access parent members."
            },
            {
              type: "code",
              language: "java",
              filename: "ProtectedModifierDemo.java",
              code: `public class ProtectedModifierDemo {
    static class SecurityToken {
        // Protected member
        protected String tokenValue = "AUTH_BEARER_88192";

        protected void renewToken() {
            System.out.println("SecurityToken renewed.");
        }
    }

    static class AdminSession extends SecurityToken {
        void authenticate() {
            // Subclass inherits and accesses protected members directly!
            System.out.println("Session using token: " + tokenValue);
            renewToken();
        }
    }

    public static void main(String[] args) {
        AdminSession session = new AdminSession();
        session.authenticate();
    }
}`,
              output: `Session using token: AUTH_BEARER_88192
SecurityToken renewed.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "'protected' allows subclasses to inherit and use members directly while keeping them hidden from unrelated external classes."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "يسمح 'protected' للفئات الوارثة بالوصول للعنصر واستخدامه مباشرة، مع إبقائه مخفياً عن الفئات الخارجية غير الوارثة."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: The 'public' Modifier (المثال 4: محدد الوصول العام public)"
            },
            {
              type: "paragraph",
              text: "Granting universal visibility across all packages and classes."
            },
            {
              type: "code",
              language: "java",
              filename: "PublicModifierDemo.java",
              code: `public class PublicModifierDemo {
    public static class MathConstants {
        // Publicly accessible anywhere in any package
        public static final double SPEED_OF_LIGHT = 299792458.0;

        public static void announce() {
            System.out.println("Universal Physical Constant: c = " + SPEED_OF_LIGHT + " m/s");
        }
    }

    public static void main(String[] args) {
        MathConstants.announce();
    }
}`,
              output: `Universal Physical Constant: c = 2.99792458E8 m/s`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "'public' provides unrestricted access, suitable for application entry points, APIs, and universal utility functions."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "يوفر 'public' وصولاً غير مقيد من أي مكان في البرنامج، وهو مثالي لواجهات البرمجة العامة (APIs) وثوابت النظام."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Comprehensive 4-Level Visibility Matrix (المثال 5: مقارنة المستويات الأربعة في فئة واحدة)"
            },
            {
              type: "paragraph",
              text: "Declaring all four access levels side-by-side to observe visibility boundaries."
            },
            {
              type: "code",
              language: "java",
              filename: "AccessMatrixDemo.java",
              code: `public class AccessMatrixDemo {
    static class DataStore {
        private String privateSecret = "Level 1: Private (Only DataStore)";
        String defaultInfo           = "Level 2: Default (Same Package)";
        protected String familyInfo  = "Level 3: Protected (Package + Subclasses)";
        public String publicNotice   = "Level 4: Public (Everywhere)";

        void printInternal() {
            System.out.println(privateSecret);
            System.out.println(defaultInfo);
            System.out.println(familyInfo);
            System.out.println(publicNotice);
        }
    }

    public static void main(String[] args) {
        DataStore ds = new DataStore();
        ds.printInternal();
    }
}`,
              output: `Level 1: Private (Only DataStore)
Level 2: Default (Same Package)
Level 3: Protected (Package + Subclasses)
Level 4: Public (Everywhere)`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "All four levels are accessible from within DataStore itself, while outside classes are filtered according to their relationship."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "تستطيع الفئة نفسها الوصول لجميع مستويات حقولها بلا قيود، بينما تُصفى الصلاحيات للفئات الأخرى بحسب موقعها وقرابتها."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Private Constructors for Singleton Pattern (المثال 6: المشيدات الخاصة ونمط الكائن المنفرد Singleton)"
            },
            {
              type: "paragraph",
              text: "Using a private constructor to strictly forbid direct object instantiation via new."
            },
            {
              type: "code",
              language: "java",
              filename: "PrivateConstructorDemo.java",
              code: `public class PrivateConstructorDemo {
    static class DatabasePool {
        // Single static instance
        private static final DatabasePool INSTANCE = new DatabasePool();

        // Private constructor prevents 'new DatabasePool()'
        private DatabasePool() {
            System.out.println("Single Database Connection Pool initialized.");
        }

        public static DatabasePool getInstance() {
            return INSTANCE;
        }

        public void query(String sql) {
            System.out.println("Executing query: " + sql);
        }
    }

    public static void main(String[] args) {
        // DatabasePool pool = new DatabasePool(); // COMPILER ERROR: constructor is private!
        DatabasePool pool1 = DatabasePool.getInstance();
        DatabasePool pool2 = DatabasePool.getInstance();

        System.out.println("Are both references identical? " + (pool1 == pool2));
        pool1.query("SELECT * FROM audit_logs");
    }
}`,
              output: `Single Database Connection Pool initialized.
Are both references identical? true
Executing query: SELECT * FROM audit_logs`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "A private constructor blocks outside instantiation, guaranteeing that exactly one shared instance of the class exists."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "يمنع المشيد الخاص إنشاء الكائنات من الخارج عبر 'new'، مما يضمن وجود نسخة وحيدة مشتركة في الذاكرة (Singleton)."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Top-Level Class Visibility Restrictions (المثال 7: قيود رؤية الفئات على المستوى الأعلى)"
            },
            {
              type: "paragraph",
              text: "Top-level classes can only be public or package-private (no private or protected classes at the root file level)."
            },
            {
              type: "code",
              language: "java",
              filename: "TopLevelVisibilityDemo.java",
              code: `// Package-private top-level class (no public keyword)
class PackageHelper {
    void assist() {
        System.out.println("PackageHelper assisting within the same package.");
    }
}

public class TopLevelVisibilityDemo {
    public static void main(String[] args) {
        PackageHelper helper = new PackageHelper();
        helper.assist();
    }
}`,
              output: `PackageHelper assisting within the same package.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "A top-level Java class cannot be declared private or protected. It can only be public or package-private (default)."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "لا يجوز تعريف الفئات الرئيسية (على مستوى الملف) كـ private أو protected، بل يمكن فقط أن تكون public أو package-private."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Method Overriding Visibility Constraints (المثال 8: قيود صلاحيات التجاوز)"
            },
            {
              type: "paragraph",
              text: "Subclasses must maintain or widen the accessibility of overridden methods."
            },
            {
              type: "code",
              language: "java",
              filename: "OverridingVisibilityDemo.java",
              code: `public class OverridingVisibilityDemo {
    static class SuperApi {
        protected void handleRequest() {
            System.out.println("SuperApi handled protected request.");
        }
    }

    static class SubApi extends SuperApi {
        // Widened from 'protected' to 'public' (Legal)
        @Override
        public void handleRequest() {
            System.out.println("SubApi exposed public request handler.");
        }
    }

    public static void main(String[] args) {
        SuperApi api = new SubApi();
        api.handleRequest();
    }
}`,
              output: `SubApi exposed public request handler.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "You can widen visibility (protected to public), but narrowing visibility is strictly prohibited."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "يمكن توسيع نطاق الوصول عند التجاوز، بينما يُمنع منعاً باتاً تضييقه للحفاظ على التوافق البرمجي."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Standard Getter/Setter Encapsulation (المثال 9: كبسلة الحقول عبر دوال القراءة والتعيين)"
            },
            {
              type: "paragraph",
              text: "Making fields private and providing validation gates through public getters and setters."
            },
            {
              type: "code",
              language: "java",
              filename: "GetterSetterEncapsulationDemo.java",
              code: `public class GetterSetterEncapsulationDemo {
    static class Employee {
        private String name;
        private double salary;

        public Employee(String name, double salary) {
            this.name = name;
            setSalary(salary);
        }

        public String getName() { return name; }

        public double getSalary() { return salary; }

        public void setSalary(double newSalary) {
            if (newSalary > 0) {
                this.salary = newSalary;
            } else {
                System.out.println("Invalid salary ignored: " + newSalary);
            }
        }
    }

    public static void main(String[] args) {
        Employee emp = new Employee("Salma", 7500.0);
        emp.setSalary(-1000.0); // Rejected by validation gate
        System.out.printf("Employee: %s | Salary: $%.2f%n", emp.getName(), emp.getSalary());
    }
}`,
              output: `Invalid salary ignored: -1000.0
Employee: Salma | Salary: $7500.00`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "Private fields paired with public getters and setters protect object state by intercepting and rejecting invalid mutations."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "جعل الحقول خاصة مع توفير دوال get و set عامة يحمي كائن الموظف باعتراض وتجاهل أي قيم غير مقبولة."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Defensive Copying of Mutable Private Fields (المثال 10: النسخ الدفاعي للحقول الخاصة القابلة للتعديل)"
            },
            {
              type: "paragraph",
              text: "Preventing private array references from leaking to external callers."
            },
            {
              type: "code",
              language: "java",
              filename: "DefensiveCopyDemo.java",
              code: `import java.util.Arrays;

public class DefensiveCopyDemo {
    static class SecureDataset {
        private final int[] data;

        // Defensive copy on construction
        public SecureDataset(int[] input) {
            this.data = input.clone();
        }

        // Defensive copy on getter
        public int[] getData() {
            return data.clone();
        }
    }

    public static void main(String[] args) {
        int[] original = {10, 20, 30};
        SecureDataset dataset = new SecureDataset(original);

        original[0] = 999; // Modifying external array does NOT affect dataset!

        int[] leaked = dataset.getData();
        leaked[1] = 888; // Modifying returned array does NOT affect dataset!

        System.out.println("Dataset internal content: " + Arrays.toString(dataset.getData()));
    }
}`,
              output: `Dataset internal content: [10, 20, 30]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "Defensive copying with .clone() ensures that external callers cannot mutate internal private arrays through shared references."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "استخدام النسخ الدفاعي (.clone) يمنع تسرب المراجع للمصفوفات الخاصة، ويحمي بيانات الكائن من التعديل الخارجي غير المصرح به."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Enterprise Role-Based Access Control (RBAC) System (المثال 11: نظام التحكم في الوصول بناءً على الأدوار متكامل)"
            },
            {
              type: "paragraph",
              text: "Advanced: Orchestrating private encryption keys, protected session telemetry, and public gateway APIs."
            },
            {
              type: "code",
              language: "java",
              filename: "RbacSecurityMaster.java",
              code: `public class RbacSecurityMaster {
    public static class SecurityGateway {
        // Private: accessible ONLY inside this class
        private String masterHmacKey = "SECRET_KEY_00998877";

        // Protected: accessible by subclasses or within package
        protected int sessionCount = 0;

        // Package-private: configuration within this service module
        String environment = "PRODUCTION";

        // Public: accessible to external API clients
        public boolean verifyAccess(String role, String endpoint) {
            sessionCount++;
            if ("ADMIN".equalsIgnoreCase(role)) {
                System.out.printf("[GATEWAY OK] Session #%d | Access GRANTED to '%s' using HMAC key verification.%n",
                    sessionCount, endpoint);
                return true;
            }
            System.out.printf("[GATEWAY DENIED] Session #%d | Access REJECTED for role '%s'%n",
                sessionCount, role);
            return false;
        }

        public int getActiveSessionCount() {
            return sessionCount;
        }
    }

    public static void main(String[] args) {
        SecurityGateway gateway = new SecurityGateway();
        gateway.verifyAccess("ADMIN", "/api/v1/database/drop");
        gateway.verifyAccess("GUEST", "/api/v1/database/drop");

        System.out.println("Total Audit Sessions: " + gateway.getActiveSessionCount());
    }
}`,
              output: `[GATEWAY OK] Session #1 | Access GRANTED to '/api/v1/database/drop' using HMAC key verification.
[GATEWAY DENIED] Session #2 | Access REJECTED for role 'GUEST'
Total Audit Sessions: 2`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "The security gateway leverages all four access levels: keeping keys private, tracking telemetry in protected fields, and exposing controlled validation publicly."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "وظفت بوابة الأمان مستويات الوصول الأربعة بحرفية: الحفاظ على سرية المفتاح (private)، وتتبع الجلسات (protected)، وتوفير فحص الصلاحيات للجميع (public)."
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
                "Mistake 1: Leaving class attributes 'public'. This destroys encapsulation, allowing any external class to inject invalid or corrupt values.",
                "خطأ 1: ترك الحقول عامة public؛ مما يدمر مبدأ الكبسلة ويسمح لأي كود خارجي بالعبث بالبيانات وحقن قيم فاسدة.",
                "Mistake 2: Confusing 'default' (package-private) with 'protected'. Protected allows access to subclasses in OTHER packages, whereas default forbids any access from other packages.",
                "خطأ 2: الخلط بين default و protected؛ فـ protected يتيح الوصول للفئات الوارثة في حزم أخرى، بينما default محصور في نفس الحزمة فقط.",
                "Mistake 3: Returning direct references to mutable private fields (like arrays or Date objects) without defensive copying."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Secure User Account Vault (التحدي العملي: خزنة حساب المستخدم الآمنة)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Build a class 'UserCredentials': 1) 'private String passwordHash'; 2) 'protected int failedAttempts'; 3) 'String username' (package-private); 4) 'public boolean login(String enteredHash)' verifying enteredHash against passwordHash, incrementing failedAttempts on failure, and returning true on match; 5) Test in main() with both successful and failed attempts."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: قم ببناء فئة UserCredentials: 1) حقل خاص passwordHash؛ 2) حقل محمي failedAttempts؛ 3) حقل username بحزمة افتراضية؛ 4) دالة عامة login(String enteredHash) تتحقق من كلمة المرور وتزيد عدد المحاولات الفاشلة عند الخطأ؛ 5) اختبر في main بمحاولتين (ناجحة وفاشلة)."
            },
            {
              type: "code",
              language: "java",
              filename: "UserCredentialsChallenge.java",
              code: `public class UserCredentialsChallenge {
    static class UserCredentials {
        private String passwordHash;
        protected int failedAttempts = 0;
        String username; // Package-private

        UserCredentials(String user, String hash) {
            this.username = user;
            this.passwordHash = hash;
        }

        public boolean login(String enteredHash) {
            if (passwordHash.equals(enteredHash)) {
                System.out.println("[AUTH SUCCESS] User '" + username + "' authenticated successfully.");
                return true;
            } else {
                failedAttempts++;
                System.out.printf("[AUTH FAILURE] Invalid credentials for '%s' (Failed attempts: %d)%n",
                    username, failedAttempts);
                return false;
            }
        }
    }

    public static void main(String[] args) {
        UserCredentials user = new UserCredentials("ahmed_sec", "HASH_SHA256_A98F");

        user.login("WRONG_HASH");
        user.login("HASH_SHA256_A98F");
    }
}`,
              output: `[AUTH FAILURE] Invalid credentials for 'ahmed_sec' (Failed attempts: 1)
[AUTH SUCCESS] User 'ahmed_sec' authenticated successfully.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "The password hash is safely shielded using private visibility, failed attempts can be audited by subclasses via protected, and login is publicly exposed."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "تم حماية تجزئة كلمة المرور بحقل private، بينما سُمح بمراقبة المحاولات الفاشلة عبر protected، وأُتيحت عملية تسجيل الدخول علناً بـ public."
            }
          ],
          quiz: [
                    {
                              "id": "q1",
                              "question": "Which of the following correctly lists Java's access modifiers in order from MOST restrictive to LEAST restrictive?\n(أي من الخيارات التالية يرتب محددات الوصول في جافا ترتيباً صحيحاً من الأكثر تقييداً إلى الأكثر انفتاحاً؟)",
                              "options": [
                                        "public -> protected -> default (package-private) -> private",
                                        "private -> default (package-private) -> protected -> public",
                                        "private -> protected -> default -> public",
                                        "default -> private -> protected -> public"
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! The visibility hierarchy from most restrictive to least restrictive is: 1) private (class only), 2) default/package-private (same package), 3) protected (same package + subclasses), 4) public (accessible everywhere). (الترتيب من الأكثر تقييداً إلى الأوسع انتشاراً هو: private ثم default ثم protected ثم public)."
                    },
                    {
                              "id": "q2",
                              "question": "Which access level is applied to a class member when NO access modifier keyword is specified?\n(ما هو مستوى الوصول المطبق على عضو الفئة عندما لا يتم تحديد أي كلمة مفتاحية لمحدد الوصول؟)",
                              "options": [
                                        "private",
                                        "protected",
                                        "default (package-private)",
                                        "public"
                              ],
                              "correctIndex": 2,
                              "explanation": "Correct! When no access modifier is declared, Java applies default (package-private) access. The member is accessible only by classes located within the exact same package. (عند عدم كتابة أي محدد وصول، يطبق محدد الوصول الافتراضي package-private وتكون الرؤية محصورة داخل الحزمة الواحدة فقط)."
                    },
                    {
                              "id": "q3",
                              "question": "How does the 'protected' modifier differ from default (package-private) access in Java?\n(بماذا يختلف محدد الوصول protected عن الوصول الافتراضي default في جافا؟)",
                              "options": [
                                        "protected members can also be accessed by subclasses in other packages through inheritance; default members cannot.",
                                        "protected members are accessible globally to all classes in any package.",
                                        "protected members can only be accessed by static methods.",
                                        "There is no difference; protected and default are completely identical."
                              ],
                              "correctIndex": 0,
                              "explanation": "Correct! Both default and protected grant access to all classes in the same package. However, 'protected' additionally allows subclasses located in external packages to access the member via inheritance. (يمنح كلاهما حق الوصول داخل الحزمة نفسها، ولكن protected يتميز بالسماح للفئات الفرعية في حزم أخرى بالوصول إلى العضو عبر الوراثة)."
                    },
                    {
                              "id": "q4",
                              "question": "Which access modifiers are permitted on a top-level (outer) class in Java?\n(ما هي محددات الوصول المسموح بها على الفئة الخارجية من المستوى الأعلى في جافا؟)",
                              "options": [
                                        "public, protected, and private",
                                        "public and default (package-private) only",
                                        "public only",
                                        "Any of the four access modifiers"
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! A top-level class can only be declared as 'public' or with default (package-private) access. Marking a top-level class as 'private' or 'protected' causes a compile-time error. (الفئات الخارجية من المستوى الأعلى تقبل فقط public أو الوصول الافتراضي، ويمنع تماماً استخدام private أو protected عليها)."
                    },
                    {
                              "id": "q5",
                              "question": "Why would a class declare its constructor with the 'private' modifier?\n(لماذا تقوم فئة ما بتعريف مشيدها باستخدام المحدد private؟)",
                              "options": [
                                        "To allow only subclasses to instantiate it.",
                                        "To prevent direct instantiation from external classes, such as in the Singleton pattern or static utility classes (e.g. java.lang.Math).",
                                        "To make the class run faster on the JVM stack.",
                                        "To require reflection for all method calls."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! A private constructor prevents any external class from calling 'new MyClass()'. This is essential for Singletons (providing a controlled global instance) and utility classes containing only static methods. (المشيد الخاص يمنع إنشاء كائنات جديدة من خارج الفئة، وهو جوهر نمط الكائن المنفرد Singleton وفئات الأدوات المساعدة مثل Math)."
                    },
                    {
                              "id": "q6",
                              "question": "Consider this class in package com.app:\n\npackage com.app;\npublic class Base {\n    protected void perform() { System.out.println(\"Base\"); }\n}\n\nWhat happens if another class in package com.other attempts to override perform() with public access?",
                              "options": [
                                        "Compile error: cannot change access modifier.",
                                        "It compiles successfully because widening access from protected to public is allowed.",
                                        "Compile error: perform() is not visible to the other package.",
                                        "Runtime SecurityException."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Widening access during overriding is completely legal in Java. Changing an inherited method's visibility from protected to public increases accessibility, which satisfies all inheritance constraints. (توسيع صلاحية الوصول أثناء التجاوز من protected إلى public مسموح به وقانوني تماماً في جافا)."
                    },
                    {
                              "id": "q7",
                              "question": "Why is Defensive Copying critical when writing getters for mutable private fields in an encapsulated class?\n(لماذا يعتبر النسخ الدفاعي Defensive Copying ضرورياً عند كتابة دوال القراءة للحقول الخاصة القابلة للتعديل؟)",
                              "options": [
                                        "To avoid NullPointerExceptions when calling the getter.",
                                        "To prevent external callers from modifying internal private state through the returned object reference.",
                                        "To convert the object to JSON format automatically.",
                                        "Because Java garbage collection does not clean private fields."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! If a getter returns a direct reference to a mutable private field (such as a Date or ArrayList), outside code can mutate that object's contents, breaking encapsulation. Returning a defensive copy isolates internal state. (إذا أعادت دالة القراءة مرجعاً مباشراً لكائن قابل للتعديل كالـ Date أو List، يستطيع المستدعي الخارجي تعديل البيانات الخاصة من الخارج وكسر الكبسلة)."
                    },
                    {
                              "id": "q8",
                              "question": "Consider this cross-package code:\n\n// File: pkgA/Parent.java\npackage pkgA;\npublic class Parent {\n    protected int score = 100;\n}\n\n// File: pkgB/Child.java\npackage pkgB;\nimport pkgA.Parent;\npublic class Child extends Parent {\n    public void test() {\n        System.out.print(this.score + \" \"); // Line 1\n        Parent p = new Parent();\n        // System.out.print(p.score);         // Line 2\n    }\n}\n\nWhy would uncommenting Line 2 cause a compile-time error?",
                              "options": [
                                        "Because score is private in Parent.",
                                        "Because a subclass outside the parent package can only access protected members via inheritance on its own instance (this or super), not through a generic Parent instance reference.",
                                        "Because pkgB cannot import classes from pkgA.",
                                        "Because score must be static to be accessed in Child."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Java rules stipulate that an external package subclass can access protected members ONLY through inheritance on its own type (or a subtype). Accessing p.score via a generic Parent reference from outside pkgA is forbidden. (في الحزم المختلفة، لا تستطيع الفئة الفرعية الوصول إلى عضو protected إلا عبر علاقة الوراثة لكائنها الخاص this/super، ولا يحق لها الوصول إليه عبر مرجع خارجي p.score)."
                    },
                    {
                              "id": "q9",
                              "question": "Can an outer class access the private members of its own member inner class in Java?\n(هل تستطيع الفئة الخارجية الوصول إلى الأعضاء الخاصة private لفئتها الداخلية في جافا؟)",
                              "options": [
                                        "No, private members are strictly forbidden from being accessed outside the inner class body.",
                                        "Yes, enclosing classes and their nested classes share full access to each other's private members.",
                                        "Only if reflection is explicitly enabled.",
                                        "Only if the inner class is static."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! In Java, an enclosing class and its inner/nested classes belong to the same top-level compilation unit and share complete mutual access to each other's private fields, methods, and constructors. (الفئة الخارجية والفئات الداخلية المتداخلة تتبع نفس وحدة التصريف وتتشارك الصلاحية الكاملة للوصول المتبادل لكافة الحقول والدوال الخاصة private)."
                    },
                    {
                              "id": "q10",
                              "question": "What implicit access modifiers do all variables declared inside a standard Java interface have?\n(ما هي محددات الوصول الضمنية لكافة المتغيرات المعرفة داخل واجهة Interface في جافا؟)",
                              "options": [
                                        "package-private and volatile",
                                        "public, static, and final",
                                        "protected and final",
                                        "private and transient"
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Every variable declared in a Java interface is implicitly 'public static final' (a constant), regardless of whether those keywords are explicitly typed. (أي متغير يُعرف داخل واجهة في جافا يكون تلقائياً وضمنياً public static final كثابت عام)."
                    },
                    {
                              "id": "q11",
                              "question": "Which principle of software architecture is directly enforced by using the 'private' modifier with getters and setters?\n(أي مبادئ هندسة البرمجيات يتم تطبيقه مباشرة عبر استخدام المحدد private مع دوال القراءة والتعيين؟)",
                              "options": [
                                        "Encapsulation and Data Hiding (Information Hiding)",
                                        "Multiple Inheritance",
                                        "Dynamic Dispatch",
                                        "Reflection"
                              ],
                              "correctIndex": 0,
                              "explanation": "Correct! Encapsulation bundles data and methods while hiding internal representation using 'private', allowing state validation in setters and read-only protection in getters. (مبدأ الكبسلة وإخفاء البيانات Encapsulation يحمي حقول الكائن ويمنع التلاعب المباشر بها مع توفير دوال منضبطة للقراءة والتعديل)."
                    },
                    {
                              "id": "q12",
                              "question": "Consider the following class:\n\npublic class Vault {\n    private String secretKey = \"SECRET123\";\n    public String getSecretKey() { return secretKey; }\n    private void rotateKey(String newKey) { this.secretKey = newKey; }\n}\n\nCan an external class in the same package invoke vaultInstance.rotateKey(\"NEW\")?",
                              "options": [
                                        "Yes, because both classes are in the same package.",
                                        "No, because rotateKey is declared private and is strictly inaccessible outside class Vault.",
                                        "Yes, if the calling class is marked public.",
                                        "Yes, using the super keyword."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! The 'private' modifier restricts accessibility strictly to within the declaring class body. Package proximity does NOT bypass private visibility. (المحدد private يقيد الرؤية داخل الفئة نفسها حصراً؛ ولا يمكن لأي فئة أخرى في نفس الحزمة استدعاء الدالة الخاصة)."
                    },
                    {
                              "id": "q13",
                              "question": "What is the Principle of Least Privilege in the context of Java access modifiers?\n(ما هو مبدأ الحد الأدنى من الصلاحيات Principle of Least Privilege في سياق محددات الوصول في جافا؟)",
                              "options": [
                                        "Make all fields and methods public so that other developers have maximum flexibility.",
                                        "Declare each class, method, and field with the most restrictive access modifier possible to minimize coupling and security exposure.",
                                        "Always use protected instead of private to facilitate future inheritance.",
                                        "Avoid using packages in commercial Java projects."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! The Principle of Least Privilege dictates giving components only the access necessary to perform their role. Start with private, promote to package-private or protected only when necessary, and reserve public for deliberate external API contracts. (ينص المبدأ على إعطاء أقل صلاحية وصول ممكنة: البدء بـ private ثم التوسيع عند الحاجة فقط لتقليل نقاط الضعف والارتباط بين الوحدات)."
                    },
                    {
                              "id": "q14",
                              "question": "What happens when compiling a Java file named User.java containing:\n\nprivate class User {\n    String name;\n}",
                              "options": [
                                        "It compiles without issue.",
                                        "Compile-time error: modifier private not allowed here.",
                                        "It creates a private binary file.",
                                        "It compiles only if compiled with the -private flag."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! The compiler will flag an error: 'modifier private not allowed here' because top-level classes cannot be declared private. Only nested/inner classes can be private. (ينتج خطأ تصريف صريح لأن الفئات الخارجية من المستوى الأعلى لا يمكن تمييزها بـ private، وفقط الفئات الداخلية هي التي تقبل ذلك)."
                    },
                    {
                              "id": "q15",
                              "question": "In a secure Role-Based Access Control (RBAC) token manager, why must the token signing key field be 'private final'?\n(في نظام إدارة رموز الأمان RBAC، لماذا يجب تعريف مفتاح التوقيع كـ private final؟)",
                              "options": [
                                        "To allow subclasses to modify the signing algorithm dynamically.",
                                        "To guarantee that the secret key cannot be read or altered by unauthorized external components, and cannot be reassigned once initialized.",
                                        "Because final fields can be accessed without an object reference.",
                                        "Because the JVM refuses to run security code without private final fields."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Combining 'private' (restricting visibility to the token manager) with 'final' (preventing reassignment after initialization) guarantees invariant integrity, protecting cryptographic keys against reference leaks and tampering. (الجمع بين private لإخفاء الرؤية و final لمنع التعديل يضمن عدم تسريب مفتاح التشفير أو التلاعب به بعد التهيئة)."
                    }
          ]
        }
      ]
    }
  ];
})();
