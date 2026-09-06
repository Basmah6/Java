/**
 * Java Curriculum Module - Part 12
 * Topics:
 * 23. Abstract Classes
 * 24. Abstract Methods
 * 
 * 100% Offline, Pure JavaScript. Complete educational content with full bilingual (English & Arabic) explanations.
 */

(function () {
  'use strict';

  window.JAVA_TOPICS_PART12 = [
    /* ==========================================================================
       TOPIC 23: Abstract Classes
       ========================================================================== */
    {
      id: "abstract-classes",
      title: "23. Abstract Classes",
      description: "Deep dive into Java Abstract Classes: Partial abstraction, template method patterns, abstract class constructors, shared instance state, and contrast with concrete classes and interfaces.",
      lessons: [
        {
          id: "abstract-classes-mastery",
          title: "Complete Guide to Abstract Classes",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "Understanding Abstract Classes in Java (فهم الفئات المجردة في جافا)"
            },
            {
              type: "paragraph",
              text: "An abstract class in Java is a class declared with the 'abstract' keyword that CANNOT be directly instantiated using the 'new' operator. It serves as an architectural blueprint for related subclasses, providing a common foundation consisting of shared state (instance variables), complete implemented methods (concrete behavior), and abstract method contracts that subclasses must fulfill. Abstract classes enable partial abstraction (0% to 100% abstraction)."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "الفئة المجردة (Abstract Class) في جافا هي فئة تُعرّف باستخدام الكلمة 'abstract' ولا يمكن إنشاء كائنات منها مباشرة بواسطة الأمر 'new'. دورها الأساسي هو أن تكون قالباً معمارياً مشتركاً لفئات أخرى، بحيث تجمع بين متغيرات الحالة المشتركة، والدوال المكتملة البرمجة، والدوال المجردة التي تلتزم الفئات الوارثة ببرمجتها. تتيح الفئات المجردة التجريد الجزئي (من 0% إلى 100%)."
            },
            {
              type: "paragraph",
              text: "Key Architectural Highlights: 1) Even though an abstract class cannot be instantiated directly, it CAN and SHOULD have constructors, which are called via super() when a concrete subclass is instantiated; 2) It can define static variables and static methods; 3) It is best suited when multiple closely related classes share substantial common state and logic, such as a base 'Employee' or 'UIComponent' hierarchy."
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
              text: "Example 1: Basic Abstract Class Declaration (المثال 1: تعريف الفئة المجردة الأساسية)"
            },
            {
              type: "paragraph",
              text: "Proving that an abstract class cannot be instantiated directly but is inherited by concrete classes."
            },
            {
              type: "code",
              language: "java",
              filename: "BasicAbstractClassDemo.java",
              code: `public class BasicAbstractClassDemo {
    // Abstract base class
    abstract static class Appliance {
        String brand;

        Appliance(String brand) {
            this.brand = brand;
        }

        // Concrete method shared by all appliances
        void turnOn() {
            System.out.println(brand + " appliance is now running.");
        }
    }

    // Concrete subclass
    static class WashingMachine extends Appliance {
        WashingMachine(String brand) {
            super(brand);
        }
    }

    public static void main(String[] args) {
        // Appliance a = new Appliance("LG"); // COMPILER ERROR: Appliance is abstract; cannot be instantiated

        WashingMachine washer = new WashingMachine("LG");
        washer.turnOn();
    }
}`,
              output: `LG appliance is now running.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "Direct instantiation of Appliance fails at compile-time. Instead, WashingMachine extends Appliance and inherits its state and concrete methods."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "محاولة إنشاء كائن من Appliance مباشرة تفشل وقت التصريف، بينما ترث الفئة الابنة WashingMachine المتغيرات والدوال المشتركة وتعمل بنجاح."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Abstract Class Constructor Chaining (المثال 2: تمرير البيانات لمشيد الفئة المجردة)"
            },
            {
              type: "paragraph",
              text: "Verifying that abstract class constructors execute whenever a subclass instance is created."
            },
            {
              type: "code",
              language: "java",
              filename: "AbstractConstructorDemo.java",
              code: `public class AbstractConstructorDemo {
    abstract static class Employee {
        private final String employeeId;
        private final String name;

        // Abstract class constructor
        Employee(String id, String name) {
            System.out.println("[Init] Abstract Employee constructor running...");
            this.employeeId = id;
            this.name = name;
        }

        public void printSummary() {
            System.out.println("ID: " + employeeId + " | Name: " + name);
        }
    }

    static class SoftwareEngineer extends Employee {
        private final String primaryLanguage;

        SoftwareEngineer(String id, String name, String lang) {
            super(id, name); // Delegates to abstract superclass constructor
            this.primaryLanguage = lang;
            System.out.println("[Init] Concrete SoftwareEngineer constructor completed.");
        }

        public void printRole() {
            printSummary();
            System.out.println("Primary Tech Stack: " + primaryLanguage);
        }
    }

    public static void main(String[] args) {
        SoftwareEngineer dev = new SoftwareEngineer("DEV-402", "Layla", "Java / Spring Boot");
        System.out.println("--- Employee Details ---");
        dev.printRole();
    }
}`,
              output: `[Init] Abstract Employee constructor running...
[Init] Concrete SoftwareEngineer constructor completed.
--- Employee Details ---
ID: DEV-402 | Name: Layla
Primary Tech Stack: Java / Spring Boot`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "Abstract classes have constructors to properly initialize their private fields. Subclasses call them via 'super(id, name)' before running their own initialization."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "الفئات المجردة تمتلك مشيدات لتهيئة حقولها الخاصة، وتستدعيها الفئة الابنة عبر super() قبل استكمال تهيئة حقولها المستقلة."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Partial Abstraction: Blending Concrete & Abstract Logic (المثال 3: التجريد الجزئي)"
            },
            {
              type: "paragraph",
              text: "Demonstrating how an abstract class mixes implemented shared algorithms with abstract extension points."
            },
            {
              type: "code",
              language: "java",
              filename: "PartialAbstractionDemo.java",
              code: `public class PartialAbstractionDemo {
    abstract static class Shape {
        private final String color;

        Shape(String color) {
            this.color = color;
        }

        // Concrete common logic
        public void displayColor() {
            System.out.println("Shape Color: " + color);
        }

        // Abstract method: must be implemented by subclasses
        public abstract double calculateArea();
    }

    static class Circle extends Shape {
        private final double radius;

        Circle(String color, double r) {
            super(color);
            this.radius = r;
        }

        @Override
        public double calculateArea() {
            return Math.PI * radius * radius;
        }
    }

    public static void main(String[] args) {
        Shape shape = new Circle("Emerald Green", 5.0);
        shape.displayColor();
        System.out.printf("Calculated Area: %.2f%n", shape.calculateArea());
    }
}`,
              output: `Shape Color: Emerald Green
Calculated Area: 78.54`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "The abstract class Shape supplies the common color field and displayColor method, but delegates calculateArea to Circle."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "توفر الفئة المجردة Shape اللون ودالة عرضه المشتركة، بينما تترك حساب المساحة للفئة الابنة Circle لتنفيذ معادلتها الهندسية الخاصة."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: The Template Method Design Pattern (المثال 4: نمط التصميم Template Method)"
            },
            {
              type: "paragraph",
              text: "A classic software design pattern that defines the skeletal algorithm in an abstract final method."
            },
            {
              type: "code",
              language: "java",
              filename: "TemplateMethodDemo.java",
              code: `public class TemplateMethodDemo {
    abstract static class DataParser {
        // Template Method: final prevents changing the step-by-step algorithm
        public final void parseFile(String filename) {
            openFile(filename);
            readBytes();
            decodeData();
            closeFile();
        }

        private void openFile(String file) {
            System.out.println("1. Opening file: " + file);
        }

        private void closeFile() {
            System.out.println("4. Safely closing file stream.");
        }

        // Steps delegated to subclasses
        protected abstract void readBytes();
        protected abstract void decodeData();
    }

    static class CsvDataParser extends DataParser {
        @Override
        protected void readBytes() {
            System.out.println("2. Reading comma-separated lines.");
        }

        @Override
        protected void decodeData() {
            System.out.println("3. Parsing CSV columns into domain records.");
        }
    }

    public static void main(String[] args) {
        DataParser parser = new CsvDataParser();
        parser.parseFile("transactions.csv");
    }
}`,
              output: `1. Opening file: transactions.csv
2. Reading comma-separated lines.
3. Parsing CSV columns into domain records.
4. Safely closing file stream.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "Template method defines the fixed execution sequence (open, read, decode, close) as a final method, while subclasses supply specific parsing logic."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "يقوم نمط Template Method بتثبيت خطوات المعالجة العامة في دالة final، مع تفويض تفاصيل القراءة وفك التشفير للفئات الوارثة."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Static Members in Abstract Classes (المثال 5: الأعضاء الساكنة داخل الفئات المجردة)"
            },
            {
              type: "paragraph",
              text: "Abstract classes can host static helper methods and constants that can be called without any subclass."
            },
            {
              type: "code",
              language: "java",
              filename: "AbstractStaticMembersDemo.java",
              code: `public class AbstractStaticMembersDemo {
    abstract static class DatabaseConnector {
        // Static constant
        public static final int DEFAULT_TIMEOUT_SECONDS = 30;

        // Static factory/utility method
        public static void printDriverInfo() {
            System.out.println("Unified Database Connector v4.1 (JDBC Standard)");
        }

        // Instance abstract method
        public abstract void connect(String connectionString);
    }

    static class PostgresConnector extends DatabaseConnector {
        @Override
        public void connect(String conn) {
            System.out.println("Connected to Postgres: " + conn);
        }
    }

    public static void main(String[] args) {
        // Calling static members directly on abstract class!
        System.out.println("Default Timeout: " + DatabaseConnector.DEFAULT_TIMEOUT_SECONDS + "s");
        DatabaseConnector.printDriverInfo();

        // Using concrete subclass instance
        DatabaseConnector pg = new PostgresConnector();
        pg.connect("jdbc:postgresql://localhost:5432/app_db");
    }
}`,
              output: `Default Timeout: 30s
Unified Database Connector v4.1 (JDBC Standard)
Connected to Postgres: jdbc:postgresql://localhost:5432/app_db`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "Static variables and methods inside an abstract class belong to the class definition and can be accessed directly using the abstract class name."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "يمكن للفئة المجردة احتواء ثوابت ودوال ساكنة static، ويمكن استدعاؤها مباشرة باسم الفئة المجردة دون الحاجة لإنشاء كائن وارث."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Multilevel Inheritance with Abstract Classes (المثال 6: الوراثة متعددة المستويات مع الفئات المجردة)"
            },
            {
              type: "paragraph",
              text: "An abstract class can inherit from another abstract class without implementing its abstract methods."
            },
            {
              type: "code",
              language: "java",
              filename: "MultilevelAbstractDemo.java",
              code: `public class MultilevelAbstractDemo {
    // Root abstract class
    abstract static class LivingEntity {
        abstract void breathe();
    }

    // Intermediate abstract class: does NOT need to implement breathe()
    abstract static class Mammal extends LivingEntity {
        abstract void nurseOffspring();
    }

    // Concrete class at the end of the hierarchy: MUST implement ALL abstract methods
    static class Dolphin extends Mammal {
        @Override
        void breathe() {
            System.out.println("Dolphin: Breathing oxygen through blowhole.");
        }

        @Override
        void nurseOffspring() {
            System.out.println("Dolphin: Nursing calf underwater.");
        }
    }

    public static void main(String[] args) {
        Dolphin d = new Dolphin();
        d.breathe();
        d.nurseOffspring();
    }
}`,
              output: `Dolphin: Breathing oxygen through blowhole.
Dolphin: Nursing calf underwater.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "Mammal is abstract, so it is not required to implement breathe(). Dolphin is the first concrete class, so it must implement all inherited abstract methods."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "الفئة المجردة Mammal ليست مجبرة على برمجة دالة breathe لأنها مجردة أيضاً، بينما الفئة الحقيقية Dolphin ملزمة ببرمجة كافة الدوال المجردة السابقة."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Abstract Class with Default Concrete Fallbacks (المثال 7: الفئة المجردة مع دوال افتراضية اختيارية)"
            },
            {
              type: "paragraph",
              text: "Providing optional hook methods that subclasses can override if they wish, or accept the default behavior."
            },
            {
              type: "code",
              language: "java",
              filename: "HookMethodsDemo.java",
              code: `public class HookMethodsDemo {
    abstract static class WebhookHandler {
        // Mandatory step
        abstract void handlePayload(String json);

        // Optional hook method with default implementation
        void onBeforeHandle() {
            System.out.println("[Hook] Pre-processing payload security headers.");
        }

        void onAfterHandle() {
            System.out.println("[Hook] Payload processed successfully.");
        }

        public final void process(String payload) {
            onBeforeHandle();
            handlePayload(payload);
            onAfterHandle();
        }
    }

    static class SlackWebhookHandler extends WebhookHandler {
        @Override
        void handlePayload(String json) {
            System.out.println("Posting alert to Slack channel: " + json);
        }
        // Accepts default onBeforeHandle and onAfterHandle hooks
    }

    public static void main(String[] args) {
        WebhookHandler handler = new SlackWebhookHandler();
        handler.process("{\"alert\": \"Server CPU at 95%\"}");
    }
}`,
              output: `[Hook] Pre-processing payload security headers.
Posting alert to Slack channel: {"alert": "Server CPU at 95%"}
[Hook] Payload processed successfully.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "Concrete methods inside abstract classes act as hooks with default implementations, reducing boilerplate for subclasses."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "توفر الدوال المكتملة داخل الفئة المجردة سلوكيات افتراضية جاهزة (Hooks)، مما يقلل من تكرار كتابة الكود في الفئات الفرعية."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Abstract Class Implementing an Interface (المثال 8: فئة مجردة تطبق واجهة Interface)"
            },
            {
              type: "paragraph",
              text: "An abstract class can implement an interface without implementing every method, passing the obligation to concrete subclasses."
            },
            {
              type: "code",
              language: "java",
              filename: "AbstractImplementsInterfaceDemo.java",
              code: `public class AbstractImplementsInterfaceDemo {
    interface CloudStorage {
        void upload(String filename, byte[] data);
        byte[] download(String filename);
        void delete(String filename);
    }

    // Abstract class provides common path validation but leaves upload/download abstract
    abstract static class BaseCloudStorage implements CloudStorage {
        protected String bucketName;

        BaseCloudStorage(String bucket) {
            this.bucketName = bucket;
        }

        // Concrete shared implementation for delete
        @Override
        public void delete(String filename) {
            System.out.println("Removing " + filename + " from bucket [" + bucketName + "]");
        }
    }

    static class S3Storage extends BaseCloudStorage {
        S3Storage(String bucket) {
            super(bucket);
        }

        @Override
        public void upload(String filename, byte[] data) {
            System.out.println("Uploading " + filename + " (" + data.length + " bytes) to AWS S3 bucket: " + bucketName);
        }

        @Override
        public byte[] download(String filename) {
            System.out.println("Downloading " + filename + " from AWS S3.");
            return new byte[]{1, 2, 3};
        }
    }

    public static void main(String[] args) {
        CloudStorage s3 = new S3Storage("production-assets");
        s3.upload("logo.png", new byte[1024]);
        s3.delete("temp.log");
    }
}`,
              output: `Uploading logo.png (1024 bytes) to AWS S3 bucket: production-assets
Removing temp.log from bucket [production-assets]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "BaseCloudStorage implements CloudStorage but only defines 'delete'. The remaining interface methods (upload/download) are delegated to S3Storage."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "تستطيع الفئة المجردة تطبيق واجهة (implements) وبرمجة جزء من دوالها وترك الباقي للفئات الحقيقية مثل S3Storage."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Abstract Class vs Interface: State & Access Modifiers (المثال 9: الفروق الجوهرية مع الواجهات)"
            },
            {
              type: "paragraph",
              text: "Contrasting non-public, mutable instance state in abstract classes with static final constants in interfaces."
            },
            {
              type: "code",
              language: "java",
              filename: "AbstractVsInterfaceDemo.java",
              code: `public class AbstractVsInterfaceDemo {
    // Abstract Class: can have protected mutable instance fields
    abstract static class BankAccount {
        protected double balance; // Mutable instance field (impossible in pure interface!)

        BankAccount(double initialBalance) {
            this.balance = initialBalance;
        }

        public abstract void withdraw(double amount);

        public void deposit(double amount) {
            if (amount > 0) {
                this.balance += amount;
                System.out.printf("Deposited: $%.2f | Balance: $%.2f%n", amount, balance);
            }
        }
    }

    static class SavingsAccount extends BankAccount {
        SavingsAccount(double initial) {
            super(initial);
        }

        @Override
        public void withdraw(double amount) {
            if (balance - amount >= 50.0) { // Enforces $50 minimum reserve
                balance -= amount;
                System.out.printf("Withdrew: $%.2f | Balance: $%.2f%n", amount, balance);
            } else {
                System.out.println("Withdrawal denied: Minimum $50 reserve required.");
            }
        }
    }

    public static void main(String[] args) {
        SavingsAccount acc = new SavingsAccount(200.0);
        acc.deposit(50.0);
        acc.withdraw(180.0);
        acc.withdraw(50.0);
    }
}`,
              output: `Deposited: $50.00 | Balance: $250.00
Withdrew: $180.00 | Balance: $70.00
Withdrawal denied: Minimum $50 reserve required.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "Abstract classes excel over interfaces when subclasses need protected, mutable instance fields (like 'balance') controlled by common methods."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "تتفوق الفئات المجردة على الواجهات بقدرتها على امتلاك متغيرات حالة محمية ومتحولة (مثل الرصيد balance) ومشاركتها مع الأبناء."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Anonymous Subclasses of Abstract Classes (المثال 10: إنشاء فئة فرعية مجهولة الاسم لكائن سريع)"
            },
            {
              type: "paragraph",
              text: "Creating an on-the-fly anonymous subclass implementing an abstract class directly."
            },
            {
              type: "code",
              language: "java",
              filename: "AnonymousAbstractSubclassDemo.java",
              code: `public class AnonymousAbstractSubclassDemo {
    abstract static class DiscountCalculator {
        abstract double calculateDiscount(double purchaseAmount);

        void printFinalPrice(double price) {
            double discount = calculateDiscount(price);
            System.out.printf("Price: $%.2f - Discount: $%.2f = Final: $%.2f%n",
                price, discount, price - discount);
        }
    }

    public static void main(String[] args) {
        // Instantiating an anonymous subclass on the fly!
        DiscountCalculator seasonalSale = new DiscountCalculator() {
            @Override
            double calculateDiscount(double purchaseAmount) {
                return purchaseAmount * 0.25; // 25% seasonal holiday discount
            }
        };

        seasonalSale.printFinalPrice(100.0);
        seasonalSale.printFinalPrice(400.0);
    }
}`,
              output: `Price: $100.00 - Discount: $25.00 = Final: $75.00
Price: $400.00 - Discount: $100.00 = Final: $300.00`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "Writing 'new DiscountCalculator() { ... }' creates an anonymous subclass under the hood, fulfilling the abstract method contract for single-use situations."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "صيغة new AbstractClass() { ... } تنشئ فئة فرعية مجهولة الاسم (Anonymous Class) تطبق الدوال المجردة بسرعة للاستخدام المؤقت."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Enterprise Payment Gateway Pipeline Framework (المثال 11: إطار عمل معالجة بوابات الدفع المؤسسية)"
            },
            {
              type: "paragraph",
              text: "Advanced: Complete transaction pipeline enforcing security audits, logging, and gateway-specific execution."
            },
            {
              type: "code",
              language: "java",
              filename: "PaymentGatewayPipelineMaster.java",
              code: `public class PaymentGatewayPipelineMaster {
    abstract static class AbstractPaymentGateway {
        protected final String gatewayName;

        AbstractPaymentGateway(String name) {
            this.gatewayName = name;
        }

        // Abstract hooks to be customized per provider
        protected abstract boolean authorize(String cardToken, double amount);
        protected abstract String capture(double amount);

        // Core template method enforcing transactional security
        public final String executeTransaction(String token, double amount) {
            System.out.printf("[%s] Initiating payment request for $%.2f...%n", gatewayName, amount);
            if (!authorize(token, amount)) {
                System.out.printf("[%s] Authorization failed for token %s.%n", gatewayName, token);
                return "AUTH_REJECTED";
            }
            String receipt = capture(amount);
            System.out.printf("[%s] Transaction completed successfully. Receipt: %s%n", gatewayName, receipt);
            return receipt;
        }
    }

    static class StripeGateway extends AbstractPaymentGateway {
        StripeGateway() { super("Stripe-API"); }

        @Override
        protected boolean authorize(String token, double amount) {
            return token.startsWith("tok_");
        }

        @Override
        protected String capture(double amount) {
            return "ch_stripe_" + (long)(Math.random() * 1000000);
        }
    }

    public static void main(String[] args) {
        AbstractPaymentGateway stripe = new StripeGateway();
        stripe.executeTransaction("tok_visa_4242", 189.99);
        System.out.println("----------------------------------------");
        stripe.executeTransaction("invalid_token", 49.00);
    }
}`,
              output: `[Stripe-API] Initiating payment request for $189.99...
[Stripe-API] Transaction completed successfully. Receipt: ch_stripe_523821
----------------------------------------
[Stripe-API] Initiating payment request for $49.00...
[Stripe-API] Authorization failed for token invalid_token.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "AbstractPaymentGateway orchestrates the entire security and authorization flow, guaranteeing that individual gateway plugins cannot bypass validation."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "تتحكم AbstractPaymentGateway بدورة حياة المعاملة المالية بأكملها، مما يمنع بوابات الدفع الفردية من تجاوز معايير الأمان الإلزامية."
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
                "Mistake 1: Trying to instantiate an abstract class directly using 'new AbstractClass()'. Abstract classes are incomplete and can only be instantiated through concrete subclasses.",
                "خطأ 1: محاولة إنشاء كائن مباشر من الفئة المجردة؛ فالفئة المجردة غير مكتملة ويُمنع عمل new لها إلا عبر فئة ابنة حقيقية.",
                "Mistake 2: Believing abstract classes cannot have constructors. Abstract classes CAN and DO have constructors, which initialize common fields when subclasses call 'super()'.",
                "خطأ 2: الاعتقاد الخاطئ بأن الفئات المجردة لا تملك مشيدات؛ بل تملك مشيدات تُستدعى بواسطة super() من الفئات الوارثة لتهيئة المتغيرات المشتركة.",
                "Mistake 3: Marking an abstract class as 'final'. This is contradictory because final prevents extension, while abstract demands it."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Streaming Subscription System (التحدي العملي: نظام الاشتراكات الرقمية)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Design an abstract class 'SubscriptionPlan' with: 1) Protected fields: 'planName' (String) and 'basePrice' (double); 2) Constructor initializing both; 3) Abstract method 'calculateMonthlyFee()'; 4) Concrete method 'printBillSummary()' displaying plan name and calculated fee; 5) Create a subclass 'FamilyPlan' with an 'extraProfiles' integer field, where each extra profile costs $3.50; 6) Instantiate FamilyPlan in main() with base $15 and 3 extra profiles, and print the summary."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: صمم فئة مجردة 'SubscriptionPlan': 1) حقول محمية: planName و basePrice؛ 2) مشيد يتهيأ بهما؛ 3) دالة مجردة calculateMonthlyFee()؛ 4) دالة مكتملة printBillSummary() تعرض الاسم والسعر الشهري المحسوب؛ 5) فئة فرعية 'FamilyPlan' تضيف حقلاً لعدد الملفات الإضافية extraProfiles بتكلفة 3.50$ لكل بروفايل إضافي؛ 6) أنشئ كائن FamilyPlan في main بسعر أساسي 15$ و3 بروفايلات واعرض الفاتورة."
            },
            {
              type: "code",
              language: "java",
              filename: "SubscriptionChallenge.java",
              code: `public class SubscriptionChallenge {
    abstract static class SubscriptionPlan {
        protected final String planName;
        protected final double basePrice;

        public SubscriptionPlan(String name, double price) {
            this.planName = name;
            this.basePrice = price;
        }

        public abstract double calculateMonthlyFee();

        public void printBillSummary() {
            System.out.printf("Subscription: %-15s | Total Monthly Fee: $%.2f%n",
                planName, calculateMonthlyFee());
        }
    }

    static class FamilyPlan extends SubscriptionPlan {
        private final int extraProfiles;
        private static final double EXTRA_PROFILE_RATE = 3.50;

        public FamilyPlan(double base, int profiles) {
            super("Family HD Ultra", base);
            this.extraProfiles = profiles;
        }

        @Override
        public double calculateMonthlyFee() {
            return basePrice + (extraProfiles * EXTRA_PROFILE_RATE);
        }
    }

    public static void main(String[] args) {
        SubscriptionPlan myPlan = new FamilyPlan(15.00, 3);
        myPlan.printBillSummary();
    }
}`,
              output: `Subscription: Family HD Ultra | Total Monthly Fee: $25.50`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "SubscriptionPlan enforces the pricing blueprint, and FamilyPlan computes the fee dynamically by adding $10.50 (3 * 3.50) to the $15 base."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "تحدد SubscriptionPlan الهيكل العام للاشتراك، وتوفر FamilyPlan طريقة الحساب بجمع 10.50$ (3 في 3.50) إلى السعر الأساسي 15$ ليصبح الإجمالي 25.50$."
            }
          ],
          quiz: [
                    {
                              "id": "q1",
                              "question": "Can an abstract class in Java be directly instantiated using the 'new' keyword?\n(هل يمكن إنشاء كائن مباشرة من فئة مجردة Abstract Class باستخدام الكلمة new في جافا؟)",
                              "options": [
                                        "Yes, as long as it has a default constructor.",
                                        "No, an abstract class cannot be instantiated directly; it serves as an incomplete conceptual blueprint that must be extended by subclasses.",
                                        "Yes, if all of its methods are concrete.",
                                        "Only when executing inside a static main method."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Abstract classes cannot be directly instantiated using 'new AbstractClass()'. Attempting to do so triggers a compile-time error because abstract classes represent incomplete blueprints. (لا يمكن إنشاء كائن مباشرة من فئة مجردة لأنها تمثل مخططاً مفاهيمياً غير مكتمل، ويجب وراثتها وتوفير فئات فرعية ملموسة لاستخدامها)."
                    },
                    {
                              "id": "q2",
                              "question": "Can an abstract class define constructors, and what is their purpose?\n(هل يمكن للفئة المجردة أن تحتوي على مشيدات وما هو الغرض منها؟)",
                              "options": [
                                        "No, abstract classes cannot have constructors because they cannot be instantiated.",
                                        "Yes, abstract classes can have constructors, and they are invoked via super(...) during subclass instantiation to initialize common inherited state.",
                                        "Yes, but only private constructors are permitted.",
                                        "Only if the constructor is marked abstract."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Abstract classes can have constructors. When a concrete subclass is instantiated with 'new SubClass()', the superclass constructor runs (via super(...)) to initialize common fields defined in the abstract base class. (نعم، تملك الفئات المجردة مشيدات تُستدعى عبر super(...) عند بناء كائنات الفئات الفرعية لتهيئة الحقول والحالة المشتركة الموروثة)."
                    },
                    {
                              "id": "q3",
                              "question": "Does an abstract class in Java REQUIRE at least one abstract method to be declared abstract?\n(هل يجب أن تحتوي الفئة المجردة في جافا على دالة مجردة واحدة على الأقل؟)",
                              "options": [
                                        "Yes, a class without abstract methods cannot be marked abstract.",
                                        "No, a class can be declared abstract even if it contains zero abstract methods, purely to prevent direct instantiation.",
                                        "Yes, it must have at least three abstract methods.",
                                        "Only if the class implements an interface."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! A class can be declared abstract even if all of its methods are fully implemented (or if it has no methods at all). Marking it abstract simply prevents developers from directly instantiating it. (لا يشترط وجود دوال مجردة؛ بل يمكن تعريف فئة بـ abstract حتى لو كانت كافة دوالها مكتملة، لمنع إنشاء كائنات منها مباشرة)."
                    },
                    {
                              "id": "q4",
                              "question": "What is Partial Abstraction in the context of Java abstract classes?\n(ما هو التجريد الجزئي Partial Abstraction في سياق الفئات المجردة في جافا؟)",
                              "options": [
                                        "An abstract class that only compiles half of its code.",
                                        "The ability of an abstract class to combine fully implemented concrete methods, shared mutable state, and constructors alongside abstract method declarations.",
                                        "Classes that only run on 32-bit operating systems.",
                                        "Interfaces that have no methods."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Unlike standard interfaces (which primarily define contracts), abstract classes provide partial abstraction (0% to 100% abstraction) by mixing concrete methods, mutable instance fields, constructors, and abstract hooks. (توفر الفئات المجردة تجريداً جزئياً لأنها تجمع بين دوال مكتملة التنفيذ وحقول وحالة مشتركة ومشيدات، إلى جانب دوال مجردة تترك للتنفيذ اللاحق)."
                    },
                    {
                              "id": "q5",
                              "question": "Which software design pattern is classically implemented using an abstract class with a concrete workflow method calling abstract hook steps?\n(أي من أنماط التصميم البرمجية يُطبق تقليدياً عبر فئة مجردة تملك دالة هيكلية مكتملة تستدعي خطوات مجردة؟)",
                              "options": [
                                        "Singleton Pattern",
                                        "Template Method Pattern",
                                        "Observer Pattern",
                                        "Adapter Pattern"
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! In the Template Method pattern, an abstract base class defines the invariant skeleton/flow of an algorithm in a concrete (often final) method (e.g. processTransaction()), while delegating specific variable steps (like authenticate() and debit()) to abstract methods implemented by subclasses. (نمط Template Method يحدد تسلسل الخوارزمية في دالة مكتملة بالفئة المجردة، ويفوض الخطوات المتغيرة لدوال مجردة تنفذها الفئات الفرعية)."
                    },
                    {
                              "id": "q6",
                              "question": "Can an abstract class declare static fields and static methods in Java?\n(هل يمكن للفئة المجردة أن تعرّف حقولاً ودوال ساكنة static في جافا؟)",
                              "options": [
                                        "No, static members are strictly forbidden inside abstract classes.",
                                        "Yes, abstract classes can declare static fields and static methods, and they can be invoked directly using the abstract class name.",
                                        "Only if the static methods are also declared abstract.",
                                        "Only if the abstract class has no subclasses."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Abstract classes can contain static members. Because static members belong to the class rather than an instance, they can be invoked directly (e.g. AbstractClass.staticHelper()) without needing any instance. (نعم، يمكن للفئة المجردة احتواء أعضاء ساكنة static واستدعاؤها مباشرة باسم الفئة دون الحاجة لإنشاء أي كائن)."
                    },
                    {
                              "id": "q7",
                              "question": "What must a concrete subclass do when extending an abstract class that has abstract methods?\n(ما الذي يجب على فئة فرعية ملموسة concrete القيام به عند وراثة فئة مجردة تحتوي على دوال مجردة؟)",
                              "options": [
                                        "It can ignore the abstract methods.",
                                        "It MUST provide concrete implementations for ALL inherited abstract methods, or else the subclass itself MUST be declared abstract.",
                                        "It must mark all inherited methods as private.",
                                        "It must delete the superclass constructor."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! A concrete (non-abstract) subclass is contractually obligated to implement every inherited abstract method. If it fails to implement even one, the compiler requires the subclass itself to be declared abstract. (يجب على الفئة الملموسة تنفيذ كافة الدوال المجردة الموروثة دون استثناء، وإذا عجزت عن تنفيذ دالة واحدة وجب تصريح الفئة الفرعية نفسها كفئة مجردة abstract)."
                    },
                    {
                              "id": "q8",
                              "question": "Consider this inheritance hierarchy:\n\nabstract class A {\n    abstract void step1();\n    abstract void step2();\n}\nabstract class B extends A {\n    @Override\n    void step1() { System.out.print(\"B1 \"); }\n}\nclass C extends B {\n    @Override\n    void step2() { System.out.print(\"C2 \"); }\n}\n\nDoes this code compile, and what is printed by: C obj = new C(); obj.step1(); obj.step2();?",
                              "options": [
                                        "Compile-time error: B must implement step2().",
                                        "Compiles successfully and prints: B1 C2 ",
                                        "Compile-time error: C must implement step1() again.",
                                        "Runtime exception: AbstractMethodError"
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Intermediate abstract class B is allowed to implement only a subset of abstract methods (step1). Concrete class C implements the remaining abstract method (step2). Both methods are available on C, printing 'B1 C2 '. (الفئة المجردة الوسيطة B يحق لها تنفيذ جزء من الدوال وتمرير الباقي، وتأتي الفئة الملموسة C لتكمل تنفيذ ما تبقى بنجاح ويطبع B1 C2)."
                    },
                    {
                              "id": "q9",
                              "question": "When should an architect prefer an Abstract Class over an Interface in Java?\n(متى ينبغي لمهندس البرمجيات تفضيل الفئة المجردة على الواجهة Interface في جافا؟)",
                              "options": [
                                        "Whenever multiple inheritance is required.",
                                        "When closely related classes need to share non-static mutable fields, common constructors, and non-public (protected/private) helper methods in a clear 'is-a' relationship.",
                                        "Only when all methods are public and have no state.",
                                        "Whenever lambda expressions will be used."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Abstract classes are ideal for an 'is-a' hierarchy among tightly related components needing shared mutable state, constructors, and protected helper logic. Interfaces are best for defining capabilities ('can-do') across unrelated classes. (تُفضل الفئات المجردة عندما تشترك الفئات في علاقة 'هو نوع من' is-a حقيقية مع وجود حالة ومتغيرات ومشيدات مشتركة وصلاحيات وصول protected)."
                    },
                    {
                              "id": "q10",
                              "question": "What happens when you write:\n\nabstract class Worker { abstract void work(); }\nWorker w = new Worker() {\n    void work() { System.out.println(\"Working\"); }\n};",
                              "options": [
                                        "The JVM instantiates the abstract class Worker directly.",
                                        "An anonymous concrete subclass of Worker is generated, instantiated, and assigned to reference 'w'.",
                                        "A compile-time error occurs because abstract classes cannot appear after 'new'.",
                                        "A memory leak occurs because garbage collection is disabled."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! The code does not instantiate the abstract class itself; the Java compiler creates an anonymous concrete subclass that extends Worker, implements work(), and instantiates that anonymous subclass. (لا يتم إنشاء كائن من الفئة المجردة ذاتها، بل ينشئ المصرف فئة فرعية مجهولة الاسم ترث Worker وتنفذ work() ويتم حجز كائن منها في الذاكرة)."
                    },
                    {
                              "id": "q11",
                              "question": "Which of the following modifier declarations on a class is a COMPILE-TIME ERROR in Java?\n(أي من تصريحات الفئات التالية يسبب خطأ تصريف صريح في جافا؟)",
                              "options": [
                                        "public abstract class Component { }",
                                        "abstract class Component { }",
                                        "final abstract class Component { }",
                                        "abstract class Component extends Object { }"
                              ],
                              "correctIndex": 2,
                              "explanation": "Correct! Combining 'final' with 'abstract' is strictly illegal because 'abstract' requires the class to be extended by subclasses, whereas 'final' forbids inheritance. (الجمع بين final و abstract مستحيل وممنوع تصريفياً لأن الأولى تمنع الوراثة تماماً بينما الثانية تشترط الوراثة لتكتمل)."
                    },
                    {
                              "id": "q12",
                              "question": "Consider the following code snippet:\n\nabstract class BaseService {\n    void log(String msg) { System.out.print(\"[LOG] \" + msg + \" \"); }\n    abstract void execute();\n}\nclass EmailService extends BaseService {\n    @Override\n    void execute() {\n        log(\"Sending\");\n    }\n}\n\nWhat is printed by: new EmailService().execute();?",
                              "options": [
                                        "Sending",
                                        "[LOG] Sending ",
                                        "Compile error: cannot call log() from execute()",
                                        "Runtime exception"
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! The concrete subclass EmailService inherits the concrete helper method log() from BaseService and calls it inside execute(), printing '[LOG] Sending '. (ترث الفئة الفرعية الدالة المكتملة log() من الفئة المجردة وتستدعيها بنجاح داخل execute() فيطبع الكود [LOG] Sending )."
                    },
                    {
                              "id": "q13",
                              "question": "Given:\n\nabstract class Item {\n    String name;\n    Item(String name) { this.name = name; }\n    abstract int getPrice();\n}\nclass Book extends Item {\n    int price;\n    Book(String name, int price) {\n        super(name);\n        this.price = price;\n    }\n    int getPrice() { return price; }\n}\n\nWhat is printed by:\nItem it = new Book(\"Java Guide\", 50);\nSystem.out.println(it.name + \" costs \" + it.getPrice());",
                              "options": [
                                        "null costs 50",
                                        "Java Guide costs 50",
                                        "Java Guide costs 0",
                                        "Compile error: cannot access it.name"
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! The Book constructor delegates to super(name), initializing Item's name field with 'Java Guide'. The overridden getPrice() method returns 50, resulting in 'Java Guide costs 50'. (يقوم مشيد Book بتمرير الاسم لمشيد الأب عبر super، وتهيئة الحقل name بنجاح، وتستدعي getPrice() الدالة المتجاوزة لتعيد 50)."
                    },
                    {
                              "id": "q14",
                              "question": "In an enterprise Payment Gateway Pipeline framework, why is the pipeline execution method typically marked 'public final void processPayment()'?\n(في إطار عمل بوابات الدفع المؤسسي، لماذا يتم تمييز دالة تشغيل المسار بـ public final void processPayment()؟)",
                              "options": [
                                        "To allow third-party plugins to rewrite the audit algorithm.",
                                        "To protect the transaction execution flow (audit -> auth -> debit -> receipt) from being overridden or tampered with by individual payment plugins.",
                                        "Because final methods take less memory.",
                                        "To make the method run on multiple threads automatically."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! In the Template Method pattern, marking the workflow method 'final' ensures that no subclass can alter the strict security and transactional order of execution (compliance, auditing, fraud check), while allowing subclasses to customize only individual abstract hook steps. (تمييز دالة المعالجة الرئيسية بـ final يحمي التسلسل الأمني للعمليات المالية من التلاعب أو التجاوز الخاطئ في الفئات الفرعية)."
                    },
                    {
                              "id": "q15",
                              "question": "What happens when an abstract class implements an interface but does NOT provide implementations for all interface methods?\n(ماذا يحدث عندما تطبق فئة مجردة واجهة معينة دون أن توفر تنفيذاً لكافة دوال الواجهة؟)",
                              "options": [
                                        "A compile-time error occurs immediately.",
                                        "It compiles successfully because an abstract class is not required to implement interface methods; the implementation obligation is passed down to concrete subclasses.",
                                        "The interface methods are deleted automatically.",
                                        "The interface becomes an abstract class."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! An abstract class can implement an interface without implementing any or all of its methods. It simply delegates the obligation of implementing those methods to the first concrete subclass in the hierarchy. (تستطيع الفئة المجردة تطبيق أي واجهة دون كتابة دوالها؛ حيث يُرحّل المصرف إلزامية التنفيذ إلى أول فئة ملموسة ترثها)."
                    }
          ]
        }
      ]
    },

    /* ==========================================================================
       TOPIC 24: Abstract Methods
       ========================================================================== */
    {
      id: "abstract-methods",
      title: "24. Abstract Methods",
      description: "Mastering Java Abstract Methods: Method declaration without body, contract enforcement, concrete subclass override requirements, visibility modifiers, and polymorphic dispatch.",
      lessons: [
        {
          id: "abstract-methods-mastery",
          title: "Complete Guide to Abstract Methods",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "Understanding Abstract Methods in Java (فهم الدوال المجردة في جافا)"
            },
            {
              type: "paragraph",
              text: "An abstract method in Java is a method declared with the 'abstract' keyword that has NO implementation body (it ends with a semicolon ';'). It defines a strict behavioral contract: the return type, method name, parameters, and thrown exceptions. The responsibility of providing the actual implementation body is mandatory for any non-abstract (concrete) subclass that extends the enclosing class."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "الدالة المجردة (Abstract Method) في جافا هي دالة تُعرّف بالكلمة 'abstract' وتخلو تماماً من أي جسم برمجي (تنتهي بفاصلة منقوطة ';' بدلاً من الأقواس المعقوفة '{}'). تمثل الدالة المجردة عقداً إلزامياً يحدد اسم الدالة ونوع مخرجاتها ومعاملاتها، مع إلزام أي فئة حقيقية (Concrete Subclass) ترثها ببرمجة جسم الدالة والتفاصيل التنفيذية."
            },
            {
              type: "paragraph",
              text: "Rules of Abstract Methods: 1) An abstract method can ONLY reside inside an abstract class or interface; 2) It CANNOT be private (because private methods cannot be overridden); 3) It CANNOT be static or final (because static and final methods cannot be overridden); 4) Any concrete subclass that fails to implement any inherited abstract method will fail compilation unless declared abstract itself."
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
              text: "Example 1: Basic Abstract Method Syntax (المثال 1: الصياغة الأساسية للدالة المجردة)"
            },
            {
              type: "paragraph",
              text: "Declaring an abstract method with a semicolon and overriding it in a concrete subclass."
            },
            {
              type: "code",
              language: "java",
              filename: "BasicAbstractMethodDemo.java",
              code: `public class BasicAbstractMethodDemo {
    abstract static class Animal {
        String name;

        Animal(String name) { this.name = name; }

        // Abstract method: no curly braces, ends with a semicolon
        public abstract void makeSound();
    }

    static class Dog extends Animal {
        Dog(String name) { super(name); }

        // Concrete implementation is mandatory
        @Override
        public void makeSound() {
            System.out.println(name + " barks: Woof! Woof!");
        }
    }

    public static void main(String[] args) {
        Animal myDog = new Dog("Buddy");
        myDog.makeSound();
    }
}`,
              output: `Buddy barks: Woof! Woof!`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "Animal specifies that all animals must makeSound(), while Dog provides the species-specific bark implementation."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "تحدد فئة Animal العقد الإلزامي makeSound() بدون جسم، بينما تقدم فئة Dog التنفيذ الفعلي لصوت النباح."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Abstract Method with Return Types and Arguments (المثال 2: دالة مجردة ذات معاملات وقيمة معادة)"
            },
            {
              type: "paragraph",
              text: "Abstract methods can take complex parameters and return calculated values."
            },
            {
              type: "code",
              language: "java",
              filename: "AbstractMethodParamsDemo.java",
              code: `public class AbstractMethodParamsDemo {
    abstract static class InterestCalculator {
        // Abstract method specifying calculation parameters and return type
        public abstract double calculateInterest(double principal, double annualRate, int years);
    }

    static class SimpleInterestCalculator extends InterestCalculator {
        @Override
        public double calculateInterest(double principal, double annualRate, int years) {
            return principal * (annualRate / 100.0) * years;
        }
    }

    public static void main(String[] args) {
        InterestCalculator calc = new SimpleInterestCalculator();
        double interest = calc.calculateInterest(10000.0, 5.0, 3);
        System.out.printf("Total Simple Interest: $%.2f%n", interest);
    }
}`,
              output: `Total Simple Interest: $1500.00`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "The abstract method enforces parameter types (principal, annualRate, years) and return type double across all calculating subclasses."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "تفرض الدالة المجردة نوع المعاملات الثلاثة ونوع المخرجات double على أي فئة فرعية تقوم بحساب الفائدة."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Illegal Modifiers on Abstract Methods (المثال 3: التعديلات الممنوعة مع الدوال المجردة)"
            },
            {
              type: "paragraph",
              text: "Demonstrating why abstract cannot be paired with private, static, or final."
            },
            {
              type: "code",
              language: "java",
              filename: "IllegalModifiersDemo.java",
              code: `public class IllegalModifiersDemo {
    abstract static class Demonstration {
        // Legal: public, protected, or package-private abstract methods
        public abstract void validMethod1();
        protected abstract void validMethod2();
        abstract void validMethod3();

        // ILLEGAL EXAMPLES (would fail compilation if un-commented):
        // private abstract void invalid1(); // Error: illegal combination of modifiers: abstract and private
        // public static abstract void invalid2(); // Error: illegal combination of modifiers: abstract and static
        // public final abstract void invalid3(); // Error: illegal combination of modifiers: abstract and final
    }

    static class DemoImpl extends Demonstration {
        @Override public void validMethod1() { System.out.println("Public method implemented."); }
        @Override protected void validMethod2() { System.out.println("Protected method implemented."); }
        @Override void validMethod3() { System.out.println("Package-private method implemented."); }
    }

    public static void main(String[] args) {
        DemoImpl impl = new DemoImpl();
        impl.validMethod1();
        impl.validMethod2();
        impl.validMethod3();
    }
}`,
              output: `Public method implemented.
Protected method implemented.
Package-private method implemented.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "Private, static, and final modifiers conflict with abstract because abstract relies strictly on dynamic method overriding in subclasses."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "يُمنع استخدام private أو static أو final مع abstract لأن الدالة المجردة تعتمد كلياً على التجاوز الديناميكي في الفئات الفرعية."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Polymorphic Method Invocation (المثال 4: الاستدعاء متعدد الأشكال للدوال المجردة)"
            },
            {
              type: "paragraph",
              text: "Calling abstract methods through superclass references invokes each concrete implementation at runtime."
            },
            {
              type: "code",
              language: "java",
              filename: "PolymorphicAbstractDemo.java",
              code: `public class PolymorphicAbstractDemo {
    abstract static class NotificationSender {
        abstract void sendNotification(String recipient, String message);
    }

    static class EmailSender extends NotificationSender {
        @Override
        void sendNotification(String recipient, String message) {
            System.out.println("[EMAIL -> " + recipient + "] " + message);
        }
    }

    static class SmsSender extends NotificationSender {
        @Override
        void sendNotification(String recipient, String message) {
            System.out.println("[SMS -> " + recipient + "] " + message);
        }
    }

    public static void main(String[] args) {
        NotificationSender[] channels = {
            new EmailSender(),
            new SmsSender()
        };

        for (NotificationSender channel : channels) {
            channel.sendNotification("user@domain.com", "Your one-time passcode is 491029");
        }
    }
}`,
              output: `[EMAIL -> user@domain.com] Your one-time passcode is 491029
[SMS -> user@domain.com] Your one-time passcode is 491029`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "The abstract method contract allows iterating over an array of NotificationSender references, dynamically routing to EmailSender and SmsSender."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "يتيح عقد الدالة المجردة التكرار عبر مصفوفة من مراجع NotificationSender، وتوجيه الرسائل بديناميكية إلى البريد والرسائل النصية."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Multiple Abstract Methods in a Single Hierarchy (المثال 5: دوال مجردة متعددة في فئة واحدة)"
            },
            {
              type: "paragraph",
              text: "Enforcing several distinct operations on subclasses."
            },
            {
              type: "code",
              language: "java",
              filename: "MultipleAbstractMethodsDemo.java",
              code: `public class MultipleAbstractMethodsDemo {
    abstract static class GameCharacter {
        String characterName;

        GameCharacter(String name) { this.characterName = name; }

        abstract void primaryAttack();
        abstract void defend();
        abstract int getSpecialPowerLevel();
    }

    static class Wizard extends GameCharacter {
        Wizard(String name) { super(name); }

        @Override
        void primaryAttack() {
            System.out.println(characterName + " casts Arcane Fireball!");
        }

        @Override
        void defend() {
            System.out.println(characterName + " casts Mana Barrier.");
        }

        @Override
        int getSpecialPowerLevel() {
            return 95;
        }
    }

    public static void main(String[] args) {
        GameCharacter hero = new Wizard("Gandalf");
        hero.primaryAttack();
        hero.defend();
        System.out.println("Power Rating: " + hero.getSpecialPowerLevel());
    }
}`,
              output: `Gandalf casts Arcane Fireball!
Gandalf casts Mana Barrier.
Power Rating: 95`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "The concrete class Wizard must implement primaryAttack(), defend(), and getSpecialPowerLevel(); omitting any of them fails compilation."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "يجب على الفئة الحقيقية Wizard برمجة كافة الدوال المجردة الثلاث، وإغفال أي واحدة منها يمنع البرنامج من التصريف."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Widening Access Privileges on Override (المثال 6: توسيع صلاحيات الوصول عند التجاوز)"
            },
            {
              type: "paragraph",
              text: "A subclass implementing a protected abstract method can widen its visibility to public, but can never narrow it."
            },
            {
              type: "code",
              language: "java",
              filename: "AccessWideningDemo.java",
              code: `public class AccessWideningDemo {
    abstract static class DataExporter {
        // Protected abstract method
        protected abstract void exportData();
    }

    static class ExcelExporter extends DataExporter {
        // Valid: widening protected to public
        @Override
        public void exportData() {
            System.out.println("Exporting spreadsheet in XLSX format.");
        }
    }

    public static void main(String[] args) {
        ExcelExporter exporter = new ExcelExporter();
        exporter.exportData(); // Callable publicly
    }
}`,
              output: `Exporting spreadsheet in XLSX format.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "Java allows widening method access when overriding (protected -> public), but narrowing (protected -> private) triggers a compiler error."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "تسمح جافا بتوسيع مستوى الوصول عند تجاوز الدالة المجردة (من protected إلى public)، ولكنها تمنع تضييقها (إلى private)."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Intermediate Abstract Subclasses Implementing Subset of Methods (المثال 7: تنفيذ جزئي للدوال المجردة)"
            },
            {
              type: "paragraph",
              text: "An intermediate abstract class can implement some abstract methods while passing others down the chain."
            },
            {
              type: "code",
              language: "java",
              filename: "PartialOverrideChainDemo.java",
              code: `public class PartialOverrideChainDemo {
    abstract static class Vehicle {
        abstract void startEngine();
        abstract void refuel();
    }

    // Intermediate abstract class implements startEngine() only
    abstract static class ElectricVehicle extends Vehicle {
        @Override
        void startEngine() {
            System.out.println("Silent electric propulsion motor engaged.");
        }
        // refuel() remains abstract
    }

    // Concrete final class implements the remaining refuel() method
    static class TeslaModel3 extends ElectricVehicle {
        @Override
        void refuel() {
            System.out.println("Supercharging lithium-ion battery pack to 100%.");
        }
    }

    public static void main(String[] args) {
        TeslaModel3 tesla = new TeslaModel3();
        tesla.startEngine();
        tesla.refuel();
    }
}`,
              output: `Silent electric propulsion motor engaged.
Supercharging lithium-ion battery pack to 100%.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "ElectricVehicle implements startEngine(), leaving refuel() abstract. TeslaModel3 only needs to implement refuel()."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "قامت الفئة المجردة الوسيطة ببرمجة دالة المحرك وتركت دالة التزود بالوقود مجردة، فتولت الفئة النهائية TeslaModel3 برمجتها."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Covariant Return Types in Abstract Methods (المثال 8: أنواع الإرجاع المتوافقة Covariant Returns)"
            },
            {
              type: "paragraph",
              text: "Subclasses can override an abstract method with a more specific return subtype."
            },
            {
              type: "code",
              language: "java",
              filename: "CovariantAbstractDemo.java",
              code: `public class CovariantAbstractDemo {
    static class Document {}
    static class PdfDocument extends Document {
        void renderPages() {
            System.out.println("Rendering vector PDF pages.");
        }
    }

    abstract static class DocumentFactory {
        abstract Document createDocument();
    }

    static class PdfFactory extends DocumentFactory {
        // Covariant return type: returns PdfDocument instead of base Document
        @Override
        PdfDocument createDocument() {
            return new PdfDocument();
        }
    }

    public static void main(String[] args) {
        PdfFactory factory = new PdfFactory();
        PdfDocument pdf = factory.createDocument();
        pdf.renderPages();
    }
}`,
              output: `Rendering vector PDF pages.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "PdfFactory refines the return type from Document to PdfDocument, eliminating the need for callers to cast the result."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "تقوم الفئة الابنة بتخصيص نوع الإرجاع إلى PdfDocument بدلاً من Document العام دون الحاجة للتحويل اليدوي (Casting)."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Exception Handling Declarations in Abstract Methods (المثال 9: تصريح الاستثناءات في الدوال المجردة)"
            },
            {
              type: "paragraph",
              text: "Subclasses cannot throw broader checked exceptions than those declared by the abstract method."
            },
            {
              type: "code",
              language: "java",
              filename: "AbstractExceptionRulesDemo.java",
              code: `import java.io.IOException;

public class AbstractExceptionRulesDemo {
    abstract static class RemoteResource {
        // Abstract method declares checked IOException
        abstract void fetch() throws IOException;
    }

    static class SecureHttpClient extends RemoteResource {
        // Legal: throwing the same exception or narrower subclass
        @Override
        void fetch() throws IOException {
            System.out.println("Fetching remote data over TLS 1.3 socket...");
        }
    }

    public static void main(String[] args) {
        RemoteResource res = new SecureHttpClient();
        try {
            res.fetch();
        } catch (IOException e) {
            System.err.println("Network failure: " + e.getMessage());
        }
    }
}`,
              output: `Fetching remote data over TLS 1.3 socket...`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "Subclasses cannot declare broader checked exceptions (like Exception) than declared in the abstract method signature."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "لا يجوز للفئة الابنة رمي استثناءات مفحوصة أوسع من الاستثناءات المحددة في توقيع الدالة المجردة بالأصل."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Re-abstracting a Concrete Method (المثال 10: إعادة تجريد دالة مكتملة)"
            },
            {
              type: "paragraph",
              text: "An abstract subclass can override a concrete method and declare it abstract, forcing deeper subclasses to re-implement it."
            },
            {
              type: "code",
              language: "java",
              filename: "ReAbstractDemo.java",
              code: `public class ReAbstractDemo {
    static class BasicPrinter {
        void print() {
            System.out.println("Basic printing standard.");
        }
    }

    // Abstract subclass re-abstracts the print() method!
    abstract static class AdvancedPrinter extends BasicPrinter {
        @Override
        abstract void print();
    }

    static class LaserPrinter extends AdvancedPrinter {
        @Override
        void print() {
            System.out.println("Laser printing with 1200 DPI resolution.");
        }
    }

    public static void main(String[] args) {
        BasicPrinter p = new LaserPrinter();
        p.print();
    }
}`,
              output: `Laser printing with 1200 DPI resolution.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "AdvancedPrinter turns print() back into an abstract method, forcing LaserPrinter to provide a fresh implementation."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "قامت الفئة المجردة بتحويل دالة print المكتملة إلى دالة مجردة مرة أخرى، مما ألزم الفئات التالية بإعادة برمجتها بشكل إجباري."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Enterprise Query Builder Engine with Abstract Compilation (المثال 11: محرك بناء الاستعلامات المؤسسي)"
            },
            {
              type: "paragraph",
              text: "Advanced: Multi-database SQL query translator using abstract method contracts for dialect generation."
            },
            {
              type: "code",
              language: "java",
              filename: "QueryBuilderEngineMaster.java",
              code: `public class QueryBuilderEngineMaster {
    abstract static class QueryBuilder {
        protected String table;

        QueryBuilder(String table) { this.table = table; }

        // Abstract dialect methods
        abstract String compileSelect(String[] columns);
        abstract String compilePagination(int limit, int offset);

        public final String buildQuery(String[] columns, int limit, int offset) {
            return compileSelect(columns) + " " + compilePagination(limit, offset) + ";";
        }
    }

    static class PostgresQueryBuilder extends QueryBuilder {
        PostgresQueryBuilder(String table) { super(table); }

        @Override
        String compileSelect(String[] cols) {
            return "SELECT " + String.join(", ", cols) + " FROM " + table;
        }

        @Override
        String compilePagination(int limit, int offset) {
            return "LIMIT " + limit + " OFFSET " + offset;
        }
    }

    static class OracleQueryBuilder extends QueryBuilder {
        OracleQueryBuilder(String table) { super(table); }

        @Override
        String compileSelect(String[] cols) {
            return "SELECT " + String.join(", ", cols) + " FROM " + table;
        }

        @Override
        String compilePagination(int limit, int offset) {
            return "OFFSET " + offset + " ROWS FETCH NEXT " + limit + " ROWS ONLY";
        }
    }

    public static void main(String[] args) {
        String[] cols = {"id", "email", "created_at"};

        QueryBuilder pg = new PostgresQueryBuilder("users");
        QueryBuilder ora = new OracleQueryBuilder("users");

        System.out.println("PostgreSQL Query: " + pg.buildQuery(cols, 25, 50));
        System.out.println("Oracle SQL Query: " + ora.buildQuery(cols, 25, 50));
    }
}`,
              output: `PostgreSQL Query: SELECT id, email, created_at FROM users LIMIT 25 OFFSET 50;
Oracle SQL Query: SELECT id, email, created_at FROM users OFFSET 50 ROWS FETCH NEXT 25 ROWS ONLY;`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "The abstract compileSelect and compilePagination methods force database-specific implementations to accommodate differing SQL syntaxes."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "تفرض الدوال المجردة على كل فئة كتابة صيغة SQL الخاصة بمحركها (Postgres مقابل Oracle) بينما تتكفل الفئة الأساسية بدمج الاستعلام النهائي."
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
                "Mistake 1: Placing a method body {} on an abstract method. Abstract methods must end with a semicolon ';' and cannot have curly braces.",
                "خطأ 1: وضع جسم برمجي بالأقواس {} للدالة المجردة؛ فالدالة المجردة يجب أن تنتهي حتماً بفاصلة منقوطة ';' دون أقواس.",
                "Mistake 2: Declaring an abstract method inside a non-abstract class. A class containing any abstract method MUST be declared abstract.",
                "خطأ 2: تعريف دالة مجردة داخل فئة عادية؛ فوجود أي دالة مجردة يلزم أن تكون الفئة نفسها معرفة كـ abstract.",
                "Mistake 3: Attempting to mark an abstract method as private, static, or final. These combinations are illegal in Java."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Cryptographic Message Digest (التحدي العملي: التشفير وتلخيص الرسائل)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Create an abstract class 'MessageDigestEngine' with: 1) A protected String 'algorithmName'; 2) An abstract method 'byte[] computeDigest(byte[] input)'; 3) A concrete method 'printDigest(String text)' that prints the algorithm name and the digest length; 4) Create a concrete subclass 'MockSha256Engine' that implements computeDigest() returning a 32-byte array (fill with 0xAA); 5) In main(), instantiate MockSha256Engine and invoke printDigest('Hello World')."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: أنشئ فئة مجردة 'MessageDigestEngine': 1) حقل محمي algorithmName؛ 2) دالة مجردة computeDigest(byte[] input) تعيد مصفوفة بايت؛ 3) دالة مكتملة printDigest تطبع اسم الخوارزمية وطول البايتات المحسوبة؛ 4) فئة فرعية MockSha256Engine تطبق الدالة وتعيد 32 بايت؛ 5) في main شغل printDigest للرسالة 'Hello World'."
            },
            {
              type: "code",
              language: "java",
              filename: "DigestChallenge.java",
              code: `public class DigestChallenge {
    abstract static class MessageDigestEngine {
        protected final String algorithmName;

        public MessageDigestEngine(String name) {
            this.algorithmName = name;
        }

        public abstract byte[] computeDigest(byte[] input);

        public void printDigest(String text) {
            byte[] rawBytes = text.getBytes();
            byte[] digest = computeDigest(rawBytes);
            System.out.printf("[%s] Digest computed for input (%d bytes) -> Output hash: %d bytes%n",
                algorithmName, rawBytes.length, digest.length);
        }
    }

    static class MockSha256Engine extends MessageDigestEngine {
        public MockSha256Engine() {
            super("SHA-256");
        }

        @Override
        public byte[] computeDigest(byte[] input) {
            // SHA-256 always outputs 32 bytes (256 bits)
            byte[] hash = new byte[32];
            for (int i = 0; i < hash.length; i++) {
                hash[i] = (byte) 0xAA;
            }
            return hash;
        }
    }

    public static void main(String[] args) {
        MessageDigestEngine sha = new MockSha256Engine();
        sha.printDigest("Hello World");
    }
}`,
              output: `[SHA-256] Digest computed for input (11 bytes) -> Output hash: 32 bytes`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "MessageDigestEngine standardizes the hashing contract via computeDigest(), and MockSha256Engine implements the exact 32-byte cryptographic output."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "توحد الفئة المجردة معيار التشفير عبر computeDigest()، وقامت MockSha256Engine ببرمجة المخرجات بطول 32 بايتاً كما يتطلب معيار SHA-256."
            }
          ],
          quiz: [
                    {
                              "id": "q1",
                              "question": "How is an abstract method correctly declared in Java?\n(كيف يتم التصريح عن الدالة المجردة Abstract Method بشكل صحيح في جافا؟)",
                              "options": [
                                        "abstract void compute() { }",
                                        "abstract void compute();",
                                        "void abstract compute();",
                                        "abstract void compute() = 0;"
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! An abstract method declaration consists of the 'abstract' keyword, return type, method name, parameter list, and terminates with a semicolon ';'. It MUST NOT have a curly brace body {}. (الدالة المجردة تتكون من كلمة abstract ونوع الإرجاع واسم الدالة وتنتهي بفاصلة منقوطة ; بدون أقواس جسم الدالة {})."
                    },
                    {
                              "id": "q2",
                              "question": "What happens if a regular (non-abstract) class contains an abstract method declaration?\n(ماذا يحدث إذا احتوت فئة عادية غير مجردة على تصريح لدالة مجردة؟)",
                              "options": [
                                        "The code compiles, and the method does nothing when called.",
                                        "A compile-time error occurs: class must be declared abstract if it contains an abstract method.",
                                        "The method is automatically converted to static.",
                                        "The JVM generates a default body at runtime."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! If a class contains even one abstract method, the class itself MUST be declared 'abstract'. If not, the compiler flags: 'Class is not abstract and does not override abstract method'. (إذا وُجدت دالة مجردة واحدة داخل فئة ما، وجب حتماً تعريف الفئة بأكملها كـ abstract وإلا فشل التصريف بخطأ صريح)."
                    },
                    {
                              "id": "q3",
                              "question": "Which of the following modifiers is strictly ILLEGAL on an abstract method in Java?\n(أي من المحددات التالية ممنوع تماماً ومخالف لقواعد جافا عند وضعه على دالة مجردة؟)",
                              "options": [
                                        "public",
                                        "protected",
                                        "private",
                                        "default (package-private)"
                              ],
                              "correctIndex": 2,
                              "explanation": "Correct! An abstract method CANNOT be declared 'private'. An abstract method's sole purpose is to be overridden in a subclass, but private methods are not inherited or visible to subclasses, making 'private abstract' an impossible contradiction. (لا يمكن للدالة المجردة أن تكون private أبداً، لأن الهدف الوحيد للدالة المجردة هو أن تتجاوزها الفئات الفرعية، والدوال الخاصة لا تورث إطلاقاً)."
                    },
                    {
                              "id": "q4",
                              "question": "Can an abstract method be declared with the 'static' modifier (e.g. abstract static void run();)?\n(هل يمكن تصريح دالة مجردة بأنها ساكنة static؟)",
                              "options": [
                                        "Yes, if it has no return type.",
                                        "No, because static methods belong to the class and cannot be overridden using dynamic method dispatch in subclasses.",
                                        "Yes, in Java 17 and higher.",
                                        "Only inside interfaces."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! 'static' methods belong to the class and are resolved at compile-time (subject to hiding, not overriding). 'abstract' methods rely on runtime dynamic method dispatch via an object reference. Thus, 'abstract static' is a compile-time error. (الدوال الساكنة تتبع الفئة وتخضع للربط الثابت، بينما الدوال المجردة تتطلب التوجيه الديناميكي للكائنات عند التشغيل، والجمع بينهما ممنوع برمجياً)."
                    },
                    {
                              "id": "q5",
                              "question": "What happens when an abstract method is invoked on a reference variable of an abstract class type?\n(ماذا يحدث عند استدعاء دالة مجردة عبر متغير مرجعي من نوع الفئة المجردة؟)",
                              "options": [
                                        "An AbstractMethodError is thrown immediately.",
                                        "Dynamic Method Dispatch ensures the concrete implementation provided by the actual runtime object on the heap is executed.",
                                        "The JVM halts execution.",
                                        "The call is ignored."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Through Dynamic Method Dispatch (runtime polymorphism), the JVM inspects the actual object on the heap and executes the subclass's concrete implementation of that abstract method. (عبر التوجيه الديناميكي للدوال في وقت التشغيل، تحدد الـ JVM الكائن الفعلي على الـ Heap وتنفذ كود الدالة الملموسة المكتوبة في فئته الفرعية)."
                    },
                    {
                              "id": "q6",
                              "question": "Consider this abstract class:\n\nabstract class Vehicle {\n    abstract void accelerate(); // package-private\n}\n\nWhich access modifiers are permitted when a subclass in the same package overrides accelerate()?",
                              "options": [
                                        "package-private only",
                                        "package-private, protected, or public (maintaining or widening access)",
                                        "private only",
                                        "protected only"
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! In Java method overriding, the visibility can be kept the same or widened. An inherited package-private abstract method can be overridden with package-private, protected, or public access, but not private. (عند تجاوز الدالة يمكن الحفاظ على نفس مستوى الوصول أو توسيعه، فيجوز استخدام الافتراضي أو protected أو public، ويمنع تضييقه إلى private)."
                    },
                    {
                              "id": "q7",
                              "question": "What is the result of compiling this code?\n\nabstract class Factory {\n    abstract Number create();\n}\nclass IntFactory extends Factory {\n    @Override\n    Integer create() { return 42; }\n}",
                              "options": [
                                        "Compile-time error: return types must match exactly.",
                                        "Compiles successfully due to Covariant Return Types (Integer is a subtype of Number).",
                                        "Compiles only if create() is marked static.",
                                        "Runtime exception on class loading."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Java supports covariant return types for overridden methods. Since Integer is a subclass of Number, returning Integer in IntFactory satisfies the abstract contract. (يدعم تجاوز الدوال في جافا أنواع الإرجاع المتوافقة covariant returns؛ وبما أن Integer نوع فرعي من Number فإن الكود يصرف ويعمل بنجاح)."
                    },
                    {
                              "id": "q8",
                              "question": "What is the rule regarding Checked Exceptions on concrete implementations of an abstract method?\n(ما هي القاعدة المنظمة للاستثناءات المفحوصة في التنفيذ الملموس للدالة المجردة؟)",
                              "options": [
                                        "The implementation can throw any broader checked exception.",
                                        "The concrete implementation CANNOT throw new or broader checked exceptions than those declared in the abstract method declaration.",
                                        "The concrete implementation must throw exactly the same exceptions with no exceptions omitted.",
                                        "Abstract methods cannot declare exceptions."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! The concrete subclass implementation cannot declare new or broader checked exceptions than those specified by the abstract method contract, ensuring client code relying on the abstraction is not violated. (لا يحق لتنفيذ الدالة الملموسة إعلان استثناءات مفحوصة جديدة أو أوسع من تلك المصرح بها في بصمة الدالة المجردة)."
                    },
                    {
                              "id": "q9",
                              "question": "What is 'Re-abstracting' a method in Java?\n(ما هو مفهوم إعادة تجريد الدالة Re-abstracting في جافا؟)",
                              "options": [
                                        "Deleting a method from an interface.",
                                        "An abstract subclass overriding a concrete method from its superclass and redeclaring it as 'abstract', forcing further descendants to provide a new implementation.",
                                        "Converting a method into a lambda expression.",
                                        "Renaming an abstract method at runtime."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! An abstract subclass can declare an inherited concrete method as 'abstract' (e.g. abstract void draw();). This revokes the concrete implementation for that branch of the hierarchy and forces all further concrete subclasses to reimplement it. (إعادة التجريد تحدث عندما تعيد فئة فرعية مجردة تصريح دالة موروثة ومكتملة كدالة مجردة abstract، مما يجبر الفئات اللاحقة على إعادة كتابتها)."
                    },
                    {
                              "id": "q10",
                              "question": "Why does the following code produce a compile-time error?\n\nabstract class Sensor {\n    abstract void calibrate() { }\n}",
                              "options": [
                                        "Because Sensor does not extend Object.",
                                        "Because abstract methods cannot specify a body (even an empty body with curly braces { } is illegal).",
                                        "Because calibrate() does not return a value.",
                                        "Because calibrate() must be public."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! An abstract method must end with a semicolon ';'. Providing curly braces '{}' defines a method body, which triggers the compiler error: 'abstract methods cannot have a body'. (الدالة المجردة يجب أن تنتهي بفاصلة منقوطة؛ ووضع أقواس المعقوفين {} يعتبر تعريفاً لجسم الدالة وهو ما يرفضه المصرف بخطأ صريح)."
                    },
                    {
                              "id": "q11",
                              "question": "Consider this class:\n\nabstract class QueryBuilder {\n    abstract String buildQuery(String table);\n}\nclass SqlBuilder extends QueryBuilder {\n    @Override\n    String buildQuery(String t) {\n        return \"SELECT * FROM \" + t;\n    }\n}\n\nWhat is printed by: QueryBuilder qb = new SqlBuilder(); System.out.println(qb.buildQuery(\"users\"));?",
                              "options": [
                                        "users",
                                        "SELECT * FROM users",
                                        "null",
                                        "Compile-time error: qb is abstract"
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Through polymorphic dynamic binding, qb.buildQuery(\"users\") executes SqlBuilder's implementation, returning and printing 'SELECT * FROM users'. (عبر الربط الديناميكي متعدد الأشكال، ينفذ المستدعي كود SqlBuilder ويعيد جملة الاستعلام SELECT * FROM users بنجاح)."
                    },
                    {
                              "id": "q12",
                              "question": "What happens when a concrete class extends an abstract class but fails to implement one of its three abstract methods?\n(ماذا يحدث عندما ترث فئة ملموسة فئة مجردة وتفشل في تنفيذ دالة واحدة من أصل ثلاث دوال مجردة؟)",
                              "options": [
                                        "The missing method is substituted with an empty method by the JVM.",
                                        "The compiler issues an error stating that the concrete class must either implement the missing abstract method or be declared abstract itself.",
                                        "The program compiles but crashes when the missing method is called.",
                                        "The class is converted to an interface."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! The Java compiler enforces that any non-abstract class must have full implementations for all inherited abstract methods. Failure to implement any abstract method produces a compile-time error. (يجبر المصرف أي فئة غير مجردة على توفير كود لكافة الدوال المجردة، وفي حال نقص دالة واحدة يفشل التصريف حتى تُعرّف الفئة نفسها كـ abstract)."
                    },
                    {
                              "id": "q13",
                              "question": "Can an abstract method be declared with the 'final' keyword (e.g. abstract final void process();)?\n(هل يمكن تمييز الدالة المجردة بالكلمة المفتاحية final؟)",
                              "options": [
                                        "Yes, to prevent multiple inheritance.",
                                        "No, because 'abstract' requires the method to be overridden by a subclass, while 'final' strictly forbids overriding, creating an irreconcilable compiler error.",
                                        "Yes, in abstract records.",
                                        "Only if the method has no parameters."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! An abstract method exists solely to be overridden, whereas a final method cannot be overridden. The combination 'abstract final' is a direct logical contradiction rejected by the compiler. (الدالة المجردة تتطلب التجاوز بالضرورة بينما تمنع final التجاوز قطعياً، والجمع بينهما تناقض برمجي مستحيل يرفضه المصرف)."
                    },
                    {
                              "id": "q14",
                              "question": "In a cryptographic framework with abstract class MessageDigest and abstract byte[] digest(byte[] input), what is the architectural advantage of declaring digest() as abstract?\n(في إطار عمل التشفير مع فئة MessageDigest ودالة digest() مجردة، ما هي الميزة المعمارية لتجريد هذه الدالة؟)",
                              "options": [
                                        "It forces all cryptographic algorithms to use the same block size.",
                                        "It enforces a universal contract across all algorithms (SHA-256, MD5, AES) so higher-level security pipelines can operate agnostically on any digest implementation.",
                                        "It prevents hash collisions mathematically.",
                                        "It stores hash values in hardware memory."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Declaring digest() abstract defines a strict polymorphic contract. High-level security pipelines can process any hashing algorithm uniformly without coupling to specific implementation details. (تجريد الدالة يوفر عقداً موحداً متعدد الأشكال يسمح لكافة طبقات النظام بالتعامل مع أي خوارزمية تجزئة أو تشفير بشكل مستقل دون الارتباط بتفاصيلها الداخلية)."
                    },
                    {
                              "id": "q15",
                              "question": "Consider this hierarchy:\n\nabstract class A {\n    abstract void test();\n}\nabstract class B extends A {\n    @Override\n    void test() { System.out.print(\"B \"); }\n}\nclass C extends B {\n    // does not declare test()\n}\n\nDoes class C compile, and what is printed by: new C().test();?",
                              "options": [
                                        "Compile-time error: C must override test().",
                                        "Compiles successfully and prints: B ",
                                        "Compile-time error: B cannot implement an abstract method from A.",
                                        "Runtime AbstractMethodError"
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! B provides a complete concrete implementation of test(). When C extends B, it inherits this concrete implementation, satisfying all compiler obligations without needing to redeclare test(). Executing new C().test() prints 'B '. (قدمت الفئة B تنفيذاً مكتملاً للدالة test()، وعندما ورثتها C ورثت هذا التنفيذ المكتمل، مما أسقط التجريد وحقق شروط التصريف لتطبع B بنجاح)."
                    }
          ]
        }
      ]
    }
  ];
})();
