/**
 * Java Curriculum Module - Part 8
 * Topics:
 * 15. Java Interface
 * 16. Java Anonymous Classes
 * 
 * 100% Offline, Pure JavaScript. Complete educational content with full bilingual (English & Arabic) explanations.
 */

(function () {
  'use strict';

  window.JAVA_TOPICS_PART8 = [
    /* ==========================================================================
       TOPIC 15: Java Interface
       ========================================================================== */
    {
      id: "java-interface",
      title: "15. Java Interface",
      description: "Mastering Java Interfaces: Contract definition, multiple inheritance of type, implicit modifiers, default/static/private methods, diamond problem resolution, and loose coupling.",
      lessons: [
        {
          id: "interface-mastery",
          title: "Complete Guide to Java Interfaces",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "Understanding Java Interfaces (فهم الواجهات في لغة جافا)"
            },
            {
              type: "paragraph",
              text: "An Interface in Java is a reference type, similar to a class, that serves as a pure contract or blueprint of behavior. Declared with the 'interface' keyword, it specifies WHAT methods a class must implement without defining how they are implemented. In Java, a class can inherit from only one superclass (single class inheritance), but it can implement any number of interfaces, thus achieving Multiple Inheritance of Type."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "الواجهة (Interface) في جافا هي نوع مرجعي يمثل عقداً برمجياً بحتاً يحدد السلوكيات التي يجب على الفئات الالتزام بها. يتم الإعلان عنها باستخدام الكلمة المفتاحية 'interface'، ويتم تطبيقها في الفئات عبر الكلمة 'implements'. في حين تمنع جافا الوراثة المتعددة للفئات، فإنها تتيح للفئة الواحدة تطبيق عدد غير محدود من الواجهات، مما يحقق مبدأ الوراثة المتعددة للأنواع (Multiple Inheritance of Type)."
            },
            {
              type: "paragraph",
              text: "Implicit Rules of Interfaces: All variables defined in an interface are implicitly 'public static final' (constants). All regular methods are implicitly 'public abstract'. Since Java 8+, interfaces can also include 'default' and 'static' methods, and Java 9 added 'private' methods for internal code sharing."
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
              text: "Example 1: Basic Interface Definition & Implementation (المثال 1: تعريف وتطبيق الواجهة الأساسية)"
            },
            {
              type: "paragraph",
              text: "Defining an interface and implementing its contract in a concrete class."
            },
            {
              type: "code",
              language: "java",
              filename: "BasicInterfaceDemo.java",
              code: `public class BasicInterfaceDemo {
    // Interface declaration
    interface Drivable {
        // Implicitly public abstract
        void drive();
    }

    static class ElectricCar implements Drivable {
        // Must be declared public when overriding
        @Override
        public void drive() {
            System.out.println("ElectricCar accelerates silently on battery power.");
        }
    }

    public static void main(String[] args) {
        Drivable vehicle = new ElectricCar(); // Polymorphic interface reference
        vehicle.drive();
    }
}`,
              output: `ElectricCar accelerates silently on battery power.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "All regular interface methods are implicitly 'public abstract'. When overriding them in a class, you MUST explicitly declare them 'public' to prevent reducing visibility."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "دوال الواجهة العادية عامة ومجردة ضمنياً (public abstract)، وعند إعادة تعريفها في الفئة المطبقة يجب كتابة 'public' صراحة حتى لا تقل درجة الرؤية."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Multiple Interface Implementation (المثال 2: تطبيق واجهات متعددة في فئة واحدة)"
            },
            {
              type: "paragraph",
              text: "Achieving multiple inheritance of behavior by implementing several interfaces separated by commas."
            },
            {
              type: "code",
              language: "java",
              filename: "MultipleInterfaceDemo.java",
              code: `public class MultipleInterfaceDemo {
    interface Flyable {
        void fly();
    }

    interface Swimmable {
        void swim();
    }

    // Implementing two separate interfaces
    static class Duck implements Flyable, Swimmable {
        @Override
        public void fly() {
            System.out.println("Duck is flying across the lake.");
        }

        @Override
        public void swim() {
            System.out.println("Duck is paddling in the water.");
        }
    }

    public static void main(String[] args) {
        Duck donald = new Duck();
        donald.fly();
        donald.swim();
    }
}`,
              output: `Duck is flying across the lake.
Duck is paddling in the water.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "A single Java class can implement multiple independent interfaces, providing a flexible way to model objects with diverse capabilities."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "تستطيع فئة واحدة في جافا تطبيق أكثر من واجهة بوضع فاصلة بينها، مما يمنح الكائن قدرات وخصائص متعددة بمرونة تامة."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Interface Constants (المثال 3: ثوابت الواجهات public static final)"
            },
            {
              type: "paragraph",
              text: "Variables declared in an interface are implicitly constants."
            },
            {
              type: "code",
              language: "java",
              filename: "InterfaceConstantsDemo.java",
              code: `public class InterfaceConstantsDemo {
    interface CloudConfig {
        // Implicitly public static final:
        int TIMEOUT_MILLIS = 5000;
        String DEFAULT_REGION = "eu-central-1";
    }

    public static void main(String[] args) {
        // Accessible statically via the interface name:
        System.out.println("Connection timeout: " + CloudConfig.TIMEOUT_MILLIS + " ms");
        System.out.println("Target region:      " + CloudConfig.DEFAULT_REGION);

        // CloudConfig.TIMEOUT_MILLIS = 8000; // COMPILER ERROR: Cannot assign a value to final variable!
    }
}`,
              output: `Connection timeout: 5000 ms
Target region:      eu-central-1`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "All interface fields are implicitly public, static, and final. They cannot be reassigned and are accessed directly on the interface name."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "كافة المتغيرات داخل الواجهة هي ثوابت عامة وساكنة (public static final) تلقائياً، ولا يمكن تعديل قيمتها بعد التعريف."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Default Methods in Interfaces (Java 8+) (المثال 4: الدوال الافتراضية default methods)"
            },
            {
              type: "paragraph",
              text: "Adding new methods to existing interfaces with a default implementation without breaking existing implementers."
            },
            {
              type: "code",
              language: "java",
              filename: "DefaultMethodDemo.java",
              code: `public class DefaultMethodDemo {
    interface Logger {
        void log(String message);

        // Default method: has a concrete body
        default void logError(String error) {
            log("[ERROR LEVEL] " + error);
        }
    }

    static class ConsoleLogger implements Logger {
        @Override
        public void log(String msg) {
            System.out.println("[CONSOLE] " + msg);
        }
        // Inherits logError default implementation for free!
    }

    public static void main(String[] args) {
        Logger logger = new ConsoleLogger();
        logger.log("System initialized.");
        logger.logError("Out of memory threshold reached!");
    }
}`,
              output: `[CONSOLE] System initialized.
[CONSOLE] [ERROR LEVEL] Out of memory threshold reached!`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "Default methods allow library designers to add new capabilities to interfaces with backward compatibility, as implementing classes inherit the default body."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "تسمح الدوال الافتراضية 'default' بإضافة دوال جديدة للواجهات مع توفير كود تنفيذي افتراضي لها دون إفساد الفئات القديمة التي تطبق الواجهة."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Resolving the Diamond Problem with Multiple Default Methods (المثال 5: حل مشكلة المعين Diamond Problem)"
            },
            {
              type: "paragraph",
              text: "Explicitly choosing which default implementation to execute when multiple interfaces conflict."
            },
            {
              type: "code",
              language: "java",
              filename: "DiamondProblemDemo.java",
              code: `public class DiamondProblemDemo {
    interface InterfaceA {
        default void ping() { System.out.println("Ping from InterfaceA"); }
    }

    interface InterfaceB {
        default void ping() { System.out.println("Ping from InterfaceB"); }
    }

    // Must resolve conflict manually!
    static class ServiceClient implements InterfaceA, InterfaceB {
        @Override
        public void ping() {
            // Explicitly disambiguate using: InterfaceName.super.method()
            InterfaceA.super.ping();
            System.out.println("ServiceClient customized ping handling.");
        }
    }

    public static void main(String[] args) {
        ServiceClient client = new ServiceClient();
        client.ping();
    }
}`,
              output: `Ping from InterfaceA
ServiceClient customized ping handling.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "When two interfaces provide conflicting default methods, the implementing class must explicitly override the method and can invoke the desired parent via 'InterfaceName.super.method()'."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "عند تعارض دالتين افتراضيتين بنفس الاسم من واجهتين مختلفتين، يلزم إعادة تعريف الدالة واستدعاء النسخة المطلوبة عبر: InterfaceName.super.method()."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Static Utility Methods in Interfaces (المثال 6: الدوال الساكنة المساعدة في الواجهات)"
            },
            {
              type: "paragraph",
              text: "Encapsulating utility helper logic directly within the interface."
            },
            {
              type: "code",
              language: "java",
              filename: "InterfaceStaticMethodDemo.java",
              code: `public class InterfaceStaticMethodDemo {
    interface TextValidator {
        boolean validate(String text);

        // Static utility method belonging strictly to the interface namespace
        static boolean isNullOrEmpty(String str) {
            return str == null || str.trim().isEmpty();
        }
    }

    public static void main(String[] args) {
        System.out.println("Is '  ' empty? " + TextValidator.isNullOrEmpty("  "));
        System.out.println("Is 'Java' empty? " + TextValidator.isNullOrEmpty("Java"));
    }
}`,
              output: `Is '  ' empty? true
Is 'Java' empty? false`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "Static interface methods cannot be overridden by implementing classes and are called directly on the interface name (e.g. TextValidator.isNullOrEmpty)."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "الدوال الساكنة static في الواجهات لا يمكن للفئات المطبقة وراثتها أو تجاوزها، وتُستدعى مباشرة باسم الواجهة كدوال مساعدة."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Private Methods in Interfaces (Java 9+) (المثال 7: الدوال الخاصة private في الواجهات)"
            },
            {
              type: "paragraph",
              text: "Sharing common helper code privately between multiple default methods."
            },
            {
              type: "code",
              language: "java",
              filename: "PrivateInterfaceMethodDemo.java",
              code: `public class PrivateInterfaceMethodDemo {
    interface SecureTransmitter {
        default void transmitText(String text) {
            logTransmission("TEXT", text.length());
            System.out.println("Broadcasting text payload: " + text);
        }

        default void transmitBinary(byte[] bytes) {
            logTransmission("BINARY", bytes.length);
            System.out.println("Broadcasting binary buffer.");
        }

        // Private helper method (Java 9+): cannot be accessed or overridden outside
        private void logTransmission(String type, int size) {
            System.out.println("[AUDIT " + type + "] Payload size: " + size + " bytes");
        }
    }

    static class RadioDevice implements SecureTransmitter {}

    public static void main(String[] args) {
        RadioDevice radio = new RadioDevice();
        radio.transmitText("SOS coordinates 32.1N 44.5E");
        radio.transmitBinary(new byte[]{0x1A, 0x2B});
    }
}`,
              output: `[AUDIT TEXT] Payload size: 29 bytes
Broadcasting text payload: SOS coordinates 32.1N 44.5E
[AUDIT BINARY] Payload size: 2 bytes
Broadcasting binary buffer.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "Private interface methods promote internal code reuse between default methods without exposing helper methods to implementing classes or callers."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "تسمح الدوال الخاصة (private) داخل الواجهة في جافا 9+ بمشاركة الأكواد بين الدوال الافتراضية مع إبقائها مخفية تماماً عن الفئات المطبقة."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Interface Inheritance with 'extends' (المثال 8: وراثة الواجهات فيما بينها عبر extends)"
            },
            {
              type: "paragraph",
              text: "An interface can extend one or more other interfaces."
            },
            {
              type: "code",
              language: "java",
              filename: "InterfaceInheritanceDemo.java",
              code: `public class InterfaceInheritanceDemo {
    interface Readable {
        void read();
    }

    interface Writable {
        void write();
    }

    // Interface extending two other interfaces
    interface ReadWriteFile extends Readable, Writable {
        void sync();
    }

    static class DiskDriver implements ReadWriteFile {
        @Override public void read() { System.out.println("Reading sector bytes."); }
        @Override public void write() { System.out.println("Writing sector bytes."); }
        @Override public void sync() { System.out.println("Flushing dirty disk cache."); }
    }

    public static void main(String[] args) {
        DiskDriver driver = new DiskDriver();
        driver.read();
        driver.write();
        driver.sync();
    }
}`,
              output: `Reading sector bytes.
Writing sector bytes.
Flushing dirty disk cache.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "Interfaces use the 'extends' keyword (not 'implements') to inherit from other interfaces, and an interface can extend multiple interfaces simultaneously."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "ترث الواجهات من واجهات أخرى باستخدام الكلمة 'extends' (وليس implements)، ويمكن للواجهة الواحدة أن ترث من عدة واجهات معاً."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Functional Interfaces with @FunctionalInterface (المثال 9: الواجهات الوظيفية ذات الدالة المجردة الوحيدة)"
            },
            {
              type: "paragraph",
              text: "Declaring an interface with exactly one Single Abstract Method (SAM)."
            },
            {
              type: "code",
              language: "java",
              filename: "FunctionalInterfaceDemo.java",
              code: `public class FunctionalInterfaceDemo {
    // Annotation guarantees exactly one abstract method
    @FunctionalInterface
    interface MathOperation {
        double execute(double a, double b);

        // Can still have default or static methods
        default void info() {
            System.out.println("Binary mathematical operation contract.");
        }
    }

    public static void main(String[] args) {
        // Implemented via lambda expression
        MathOperation addition = (x, y) -> x + y;
        MathOperation multiplication = (x, y) -> x * y;

        addition.info();
        System.out.println("10 + 25 = " + addition.execute(10, 25));
        System.out.println("6 * 7   = " + multiplication.execute(6, 7));
    }
}`,
              output: `Binary mathematical operation contract.
10 + 25 = 35.0
6 * 7   = 42.0`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "A Functional Interface contains exactly one abstract method, qualifying it for concise implementation using lambda expressions or method references."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "تحتوي الواجهة الوظيفية على دالة مجردة واحدة فقط (SAM)، مما يؤهلها للاستخدام المباشر مع تعبيرات لامبدا (Lambdas) الأنيقة."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Loose Coupling with Interface Polymorphism (المثال 10: تقليل الاعتمادية Loose Coupling)"
            },
            {
              type: "paragraph",
              text: "Programming to an interface rather than a concrete implementation."
            },
            {
              type: "code",
              language: "java",
              filename: "LooseCouplingDemo.java",
              code: `public class LooseCouplingDemo {
    interface NotificationSender {
        void send(String to, String body);
    }

    static class EmailSender implements NotificationSender {
        @Override public void send(String to, String body) {
            System.out.println("[EMAIL] Sent to " + to + ": " + body);
        }
    }

    static class SmsSender implements NotificationSender {
        @Override public void send(String to, String body) {
            System.out.println("[SMS] Sent to " + to + ": " + body);
        }
    }

    // High-level service depends ONLY on the interface
    static class UserAlertService {
        private NotificationSender sender;

        UserAlertService(NotificationSender s) { this.sender = s; }

        void notifyUser(String recipient, String message) {
            sender.send(recipient, message);
        }
    }

    public static void main(String[] args) {
        UserAlertService service1 = new UserAlertService(new EmailSender());
        service1.notifyUser("user@company.com", "Your invoice is ready.");

        UserAlertService service2 = new UserAlertService(new SmsSender());
        service2.notifyUser("+15550188", "Security code: 819203");
    }
}`,
              output: `[EMAIL] Sent to user@company.com: Your invoice is ready.
[SMS] Sent to +15550188: Security code: 819203`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "Programming to interfaces decouples caller services from specific implementations, allowing providers to be swapped with zero changes to business logic."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "البرمجة بالاعتماد على الواجهات تحقق مبدأ الربط الضعيف (Loose Coupling)، مما يسمح بتبديل آليات الإرسال دون المساس بمنطق العمل الأساسي."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Enterprise Distributed Event Bus with Multi-Interface Contracts (المثال 11: ناقل أحداث موزع متكامل بالواجهات)"
            },
            {
              type: "paragraph",
              text: "Advanced: Microservices architecture using Publisher, Subscriber, and Ackable interface contracts."
            },
            {
              type: "code",
              language: "java",
              filename: "EventBusMaster.java",
              code: `public class EventBusMaster {
    interface MessagePayload {
        String getId();
        String getData();
    }

    interface MessageSubscriber {
        void onMessageReceived(MessagePayload msg);
    }

    interface MessagePublisher {
        void publish(String topic, MessagePayload msg);
        void register(MessageSubscriber sub);
    }

    // Concrete implementation of event bus
    static class MemoryEventBus implements MessagePublisher {
        private MessageSubscriber[] subscribers = new MessageSubscriber[5];
        private int count = 0;

        @Override
        public void register(MessageSubscriber sub) {
            if (count < subscribers.length) subscribers[count++] = sub;
        }

        @Override
        public void publish(String topic, MessagePayload msg) {
            System.out.printf("[BUS PUBLISH] Topic: %-12s | MsgID: %s%n", topic, msg.getId());
            for (int i = 0; i < count; i++) {
                subscribers[i].onMessageReceived(msg);
            }
        }
    }

    public static void main(String[] args) {
        MemoryEventBus bus = new MemoryEventBus();

        // Subscriber 1
        bus.register(msg -> System.out.println(" -> [AuditLogSubscriber] Logged: " + msg.getData()));
        // Subscriber 2
        bus.register(msg -> System.out.println(" -> [AnalyticsSubscriber] Metrics captured for: " + msg.getId()));

        MessagePayload paymentEvent = new MessagePayload() {
            @Override public String getId() { return "EVT-PAY-1002"; }
            @Override public String getData() { return "{amount: 850.0, status: 'SUCCESS'}"; }
        };

        bus.publish("PAYMENTS", paymentEvent);
    }
}`,
              output: `[BUS PUBLISH] Topic: PAYMENTS     | MsgID: EVT-PAY-1002
 -> [AuditLogSubscriber] Logged: {amount: 850.0, status: 'SUCCESS'}
 -> [AnalyticsSubscriber] Metrics captured for: EVT-PAY-1002`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "The event bus system coordinates publishers, subscribers, and message data strictly through clean interface abstractions with zero direct coupling."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "ينسق ناقل الأحداث بين الناشرين والمشتركين وحمولات الرسائل بالاعتماد كلياً على الواجهات دون أي ارتباط مباشر بالبنية الداخلية."
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
                "Mistake 1: Forgetting to declare overriding methods as 'public' in the implementing class. Interface methods are implicitly public, and omitting 'public' reduces visibility to package-private, causing a compile error.",
                "خطأ 1: نسيان كتابة 'public' عند إعادة تعريف دوال الواجهة في الفئة، مما يسبب خطأ تصريف لمحاولة تضييق نطاق الرؤية.",
                "Mistake 2: Assuming interface fields can be modified. All fields in an interface are 'public static final' by default.",
                "خطأ 2: الظن بإمكانية تعديل متغيرات الواجهة، فجميعها ثوابت نهائية (final) لا تقبل التغيير.",
                "Mistake 3: Trying to instantiate an interface directly with 'new MyInterface()'. Interfaces cannot be instantiated without a class body."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Multimedia Device Interface Suite (التحدي العملي: حزمة واجهات مشغل الوسائط)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Create a multimedia player: 1) Interface 'Playable' with 'void play()'; 2) Interface 'Recordable' with 'void record()'; 3) Concrete class 'SmartMediaStation' implementing BOTH interfaces, providing distinct implementations for play() and record(), plus a custom status method; 4) Test in main()."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: قم ببناء مشغل وسائط: 1) واجهة Playable تحتوي على play()؛ 2) واجهة Recordable تحتوي على record()؛ 3) فئة SmartMediaStation تطبق كلا الواجهتين مع توفير كود التنفيذ لكل دالة ودالة لحالة الجهاز؛ 4) اختبر الكود في main."
            },
            {
              type: "code",
              language: "java",
              filename: "MediaStationChallenge.java",
              code: `public class MediaStationChallenge {
    interface Playable {
        void play();
    }

    interface Recordable {
        void record();
    }

    static class SmartMediaStation implements Playable, Recordable {
        private String deviceModel;

        SmartMediaStation(String model) {
            this.deviceModel = model;
        }

        @Override
        public void play() {
            System.out.println("[" + deviceModel + "] Streaming 4K video stream to display.");
        }

        @Override
        public void record() {
            System.out.println("[" + deviceModel + "] Encoding microphone audio input to FLAC format.");
        }
    }

    public static void main(String[] args) {
        SmartMediaStation station = new SmartMediaStation("StudioHub-X9");
        station.play();
        station.record();
    }
}`,
              output: `[StudioHub-X9] Streaming 4K video stream to display.
[StudioHub-X9] Encoding microphone audio input to FLAC format.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "SmartMediaStation implements both Playable and Recordable contracts, ensuring it can be used anywhere either interface reference is expected."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "طبقت الفئة كلا الواجهتين والتزمت بتنفيذ دوالهما العامة، مما يتيح التعامل معها كجهاز تشغيل وتسجيل في آن واحد."
            }
          ],
          quiz: [
          {
                    "id": "q1",
                    "question": "What are the implicit, automatic modifiers applied by the Java compiler to all variables declared inside an interface?\n(ما هي المعدلات التلقائية الضمنية التي يطبقها مترجم جافا على كافة المتغيرات داخل الواجهة؟)",
                    "options": [
                              "private static final",
                              "public static final",
                              "protected volatile",
                              "public transient"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Every variable declared in a Java interface is implicitly 'public static final' (a constant), even if those keywords are omitted. (أي متغير يُعرف داخل واجهة في جافا هو ثابت public static final حكماً حتى دون كتابة الكلمات)."
          },
          {
                    "id": "q2",
                    "question": "Examine this code attempting to implement an interface:\n\ninterface Worker {\n    void executeWork();\n}\nclass Technician implements Worker {\n    void executeWork() {\n        System.out.println(\"Working\"); // line 6\n    }\n}\n\nWhat happens when compiling this code?",
                    "options": [
                              "It compiles and runs cleanly.",
                              "Compile-time error: attempting to assign weaker access privileges ('package-private'); was 'public' in Worker.",
                              "It throws an IllegalAccessException at runtime.",
                              "It compiles only if Technician is in the same package as Worker."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! All methods declared in an interface are implicitly 'public abstract'. When a class implements an interface, it must explicitly declare the overriding method as 'public'; omitting the modifier gives it default package-private access, which weakens visibility and causes a compile error. (دوال الواجهات عامة public حكماً، وعند تطبيقها يجب كتابة public صراحة لمنع تقليل مستوى الرؤية)."
          },
          {
                    "id": "q3",
                    "question": "Which of the following demonstrates the correct syntax for a Java class implementing multiple interfaces?\n(أي مما يلي يوضح الصياغة الصحيحة لفئة تطبق واجهات متعددة؟)",
                    "options": [
                              "class Service implements AutoCloseable & Serializable",
                              "class Service implements AutoCloseable, Serializable, Cloneable",
                              "class Service extends AutoCloseable, Serializable",
                              "class Service implements AutoCloseable implements Serializable"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! In Java, a class can implement multiple interfaces separated by commas: 'class Service implements Interface1, Interface2, Interface3'. (تطبق الفئة واجهات متعددة بفصل أسمائها بفواصل بعد الكلمة implements)."
          },
          {
                    "id": "q4",
                    "question": "Why were 'default methods' (with method bodies) introduced to Java interfaces in Java 8?",
                    "options": [
                              "To replace abstract classes entirely in the Java language.",
                              "To allow API designers to add new methods to existing interfaces with default implementations without breaking existing implementing classes (backward compatibility).",
                              "To improve garbage collection speed.",
                              "To allow interfaces to have private instance state."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Default methods were introduced in Java 8 primarily to enable interface evolution (such as adding the forEach() and stream() methods to java.util.Collection) without breaking millions of third-party libraries implementing those interfaces. (أُضيفت الدوال الافتراضية default في جافا 8 لتطوير الواجهات وإضافة دوال جديدة دون كسر التوافقية مع الفئات القديمة)."
          },
          {
                    "id": "q5",
                    "question": "Consider two interfaces with identical default methods:\n\ninterface EngineA { default void start() { System.out.print(\"A\"); } }\ninterface EngineB { default void start() { System.out.print(\"B\"); } }\nclass DualEngine implements EngineA, EngineB {\n    // Does not override start()\n}\n\nWhat occurs during compilation?",
                    "options": [
                              "It compiles and prints 'A'.",
                              "Compile-time error: class DualEngine inherits unrelated defaults for start() from types EngineA and EngineB; DualEngine must override start().",
                              "It compiles and prints 'AB'.",
                              "A runtime DiamondException is thrown."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! When a class implements two interfaces that declare the same default method signature, the compiler encounters a Diamond Problem ambiguity and forces the class to explicitly override the conflicting method (where it can choose to invoke 'EngineA.super.start()'). (عند وراثة دالتين افتراضيتين متطابقتين من واجهتين مختلفتين، يلزم المترجم الفئة بتجاوز الدالة لحل التعارض)."
          },
          {
                    "id": "q6",
                    "question": "Given this interface containing a static method:\n\ninterface MathService {\n    static int square(int n) { return n * n; }\n}\nclass BasicMath implements MathService {}\n\nHow must the 'square' method be invoked?",
                    "options": [
                              "BasicMath.square(5);",
                              "new BasicMath().square(5);",
                              "MathService.square(5);",
                              "Either BasicMath.square(5) or MathService.square(5)."
                    ],
                    "correctIndex": 2,
                    "explanation": "Correct! Static methods defined in interfaces are NOT inherited by implementing classes or instances. They can ONLY be called directly on the interface itself: 'MathService.square(5)'. (الدوال الساكنة في الواجهات لا تُورث للفئات المطبقة ولا لكائناتها، وتُستدعى حصراً عبر اسم الواجهة مباشرة)."
          },
          {
                    "id": "q7",
                    "question": "What is the primary technical motivation for adding 'private methods' to interfaces in Java 9?",
                    "options": [
                              "To allow implementing classes to override private methods.",
                              "To share common helper code and avoid duplication between multiple default methods within the interface without exposing the helper methods to public callers.",
                              "To allow interfaces to store private instance variables.",
                              "To provide private security algorithms for the JVM."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Java 9 introduced private interface methods solely to allow multiple default (or static) methods inside an interface to encapsulate and share common helper logic without exposing internal implementation details to outside callers. (الدوال الخاصة private في الواجهات تسمح بمشاركة الكود المساعد بين الدوال الافتراضية داخل الواجهة دون كشفها للخارج)."
          },
          {
                    "id": "q8",
                    "question": "Which of the following represents the correct syntax for an interface inheriting from other interfaces?",
                    "options": [
                              "interface SmartDevice implements Device, Connectable",
                              "interface SmartDevice extends Device, Connectable",
                              "interface SmartDevice inherits Device, Connectable",
                              "interface SmartDevice : Device, Connectable"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! An interface uses the 'extends' keyword (not implements) to inherit from one or more other interfaces, separated by commas. (ترث الواجهة من واجهات أخرى باستخدام الكلمة extends وليس implements)."
          },
          {
                    "id": "q9",
                    "question": "What happens if an interface annotated with '@FunctionalInterface' declares TWO abstract methods:\n\n@FunctionalInterface\ninterface TaskProcessor {\n    void process();\n    void cancel(); // line 4\n}",
                    "options": [
                              "It compiles cleanly; @FunctionalInterface allows any number of methods.",
                              "Compile-time error: Unexpected @FunctionalInterface annotation; TaskProcessor is not a functional interface because it declares multiple abstract methods.",
                              "It compiles with a warning.",
                              "It throws an InvalidFunctionalInterfaceException at runtime."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! A Functional Interface is strictly defined as an interface that contains exactly ONE abstract method (SAM - Single Abstract Method). Declaring two abstract methods causes the compiler to reject the @FunctionalInterface annotation. (الواجهة الوظيفية تشترط وجود دالة مجردة واحدة فقط، وإضافة دالة ثانية يسبب خطأ ترجمة مع وسم @FunctionalInterface)."
          },
          {
                    "id": "q10",
                    "question": "Can a '@FunctionalInterface' declare default, static, or private methods in addition to its single abstract method?",
                    "options": [
                              "No, it must contain only the single abstract method and nothing else.",
                              "Yes, it can contain any number of default, static, and private methods; only the count of abstract methods must equal exactly one.",
                              "Only static methods are allowed.",
                              "Only if all default methods are marked final."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! The Single Abstract Method (SAM) constraint applies strictly to abstract methods. A functional interface may declare any number of default, static, and private methods without violating its status. (شرط الدالة الواحدة ينطبق حصراً على الدوال المجردة، ويجوز للواجهة الوظيفية احتواء أي عدد من الدوال الافتراضية والساكنة والخاصة)."
          },
          {
                    "id": "q11",
                    "question": "Does explicitly declaring 'boolean equals(Object obj);' in an interface count against the Single Abstract Method limit of a '@FunctionalInterface'?",
                    "options": [
                              "Yes, making it impossible to add any other abstract method.",
                              "No; public abstract methods that match methods from java.lang.Object (like equals, hashCode, toString) do not count toward the functional interface single abstract method count.",
                              "Only if equals() is marked default.",
                              "Only in Java 8, changed in Java 17."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Any public abstract method in an interface that has the same signature as a public method in java.lang.Object (like equals) does not count against the single abstract method requirement because every implementing class inherits an implementation from Object anyway. (الدوال المجردة المطابقة لدوال java.lang.Object مثل equals لا تُحسب ضمن شرط الدالة الواحدة لأن كل كائن يرثها حتماً)."
          },
          {
                    "id": "q12",
                    "question": "Can an interface in Java have a constructor?\n(هل يمكن للواجهة في جافا أن تحتوي على مشيد constructor؟)",
                    "options": [
                              "Yes, but only a default constructor.",
                              "No; interfaces cannot have constructors because they cannot be instantiated and hold no instance state.",
                              "Yes, if it has default methods.",
                              "Only static constructors are permitted."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Interfaces cannot declare constructors under any circumstances. Since interfaces do not maintain object state and cannot be directly instantiated, constructors are strictly prohibited. (الواجهات لا تملك مشيدات إطلاقاً لأنها لا تحتفظ بحالة للكائن ولا يمكن إنشاؤها بـ new)."
          },
          {
                    "id": "q13",
                    "question": "Why is declaring variables by interface type considered best architectural practice (e.g. 'List<String> items = new ArrayList<>();')?",
                    "options": [
                              "It makes memory allocation twice as fast.",
                              "It promotes loose coupling, allowing the underlying implementation (e.g. LinkedList) to be swapped without affecting the client code.",
                              "It prevents anyone from adding items to the list.",
                              "It allows the list to store primitive int values directly."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Programming to an interface rather than a concrete class decouples the calling code from implementation specifics, making software modular, flexible, and maintainable. (البرمجة بالاعتماد على الواجهات تحقق الاقتران الضعيف وتسمح بتبديل الفئات المنفذة مستقبلاً دون المساس ببقية الكود)."
          },
          {
                    "id": "q14",
                    "question": "What is a 'Marker Interface' (or Tagging Interface) in Java (such as java.io.Serializable or java.lang.Cloneable)?",
                    "options": [
                              "An interface that marks all its methods as deprecated.",
                              "An empty interface containing NO methods or fields, used to signal specific capabilities or type metadata to the JVM and runtime frameworks.",
                              "An interface that automatically prints log messages.",
                              "An interface that can only be implemented once per package."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! A Marker Interface has zero methods and zero fields. It acts as a metadata tag informing the JVM or libraries that an implementing object possesses special capability (such as being eligible for serialization or cloning). (واجهة التأشير هي واجهة فارغة من الدوال تُستخدم كإشارة للـ JVM بأن الكائن يملك قدرة معينة كالقابلية للحفظ Serializable)."
          },
          {
                    "id": "q15",
                    "question": "What happens when attempting to modify an interface field, as in:\n\ninterface AppConfig {\n    int MAX_USERS = 500;\n}\npublic class Main {\n    public static void main(String[] args) {\n        AppConfig.MAX_USERS = 1000; // line 6\n    }\n}",
                    "options": [
                              "MAX_USERS is successfully updated to 1000.",
                              "Compile-time error at line 6: cannot assign a value to final variable MAX_USERS.",
                              "It compiles with a compiler warning.",
                              "It throws an UnsupportedOperationException at runtime."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Because interface fields are implicitly 'public static final', MAX_USERS is a constant. Reassigning a value to a final field triggers a compile-time error. (متغيرات الواجهات ثوابت نهائية final حكماً، ومحاولة إعادة إسناد قيمة لها تفشل برمجياً)."
          }
        ]
      }
    ]
  },

    /* ==========================================================================
       TOPIC 16: Java Anonymous Classes
       ========================================================================== */
    {
      id: "java-anonymous-classes",
      title: "16. Java Anonymous Classes",
      description: "Mastering Java Anonymous Classes: Inline class declaration and instantiation, implementing interfaces, extending classes, capturing effectively final variables, and event callbacks.",
      lessons: [
        {
          id: "anonymous-classes-mastery",
          title: "Complete Guide to Java Anonymous Classes",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "Understanding Anonymous Classes in Java (فهم الفئات المجهولة في جافا)"
            },
            {
              type: "paragraph",
              text: "An Anonymous Class in Java is an inner class that has no declared name. It is declared and instantiated in a single concise expression using the 'new' operator. Anonymous classes are ideal when you only need a one-time, localized implementation of an interface or subclass—such as an event listener, a callback handler, a sorting comparator, or a thread runner."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "الفئة المجهولة (Anonymous Class) في جافا هي فئة داخلية ليس لها اسم صريح. يتم تعريفها وإنشاء كائن منها في تعبير برمجي واحد مدمج باستخدام المعامل 'new'. تُعد الفئات المجهولة الخيار المثالي عندما تحتاج إلى تنفيذ لمرة واحدة فقط لواجهة أو فئة دون الحاجة لإنشاء ملف فئة منفصل، مثل معالجات الأحداث (Event Handlers) ومقارنات الترتيب (Comparators) وتشغيل المسارات (Threads)."
            },
            {
              type: "paragraph",
              text: "Structural Characteristics: Because it has no name, an anonymous class CANNOT define constructors. It can, however, use instance initialization blocks, declare instance fields, and capture enclosing local variables that are final or effectively final."
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
              text: "Example 1: Anonymous Class Implementing an Interface (المثال 1: فئة مجهولة تطبق واجهة)"
            },
            {
              type: "paragraph",
              text: "Instantiating an interface inline with custom method implementations."
            },
            {
              type: "code",
              language: "java",
              filename: "AnonymousInterfaceDemo.java",
              code: `public class AnonymousInterfaceDemo {
    interface Greeter {
        void sayHello();
    }

    public static void main(String[] args) {
        // Anonymous class implementing Greeter interface
        Greeter englishGreeter = new Greeter() {
            @Override
            public void sayHello() {
                System.out.println("Hello! Welcome to Java.");
            }
        };

        // Another distinct anonymous implementation
        Greeter arabicGreeter = new Greeter() {
            @Override
            public void sayHello() {
                System.out.println("أهلاً وسهلاً بكم في عالم جافا!");
            }
        };

        englishGreeter.sayHello();
        arabicGreeter.sayHello();
    }
}`,
              output: `Hello! Welcome to Java.
أهلاً وسهلاً بكم في عالم جافا!`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "The syntax 'new Greeter() { ... }' creates an anonymous subclass implementing the interface and instantiates it immediately."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "تنشئ الصيغة 'new Greeter() { ... }' فئة مجهولة تطبق الواجهة وتنشئ كائناً منها على الفور دون كتابة فئة تقليدية."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Anonymous Class Extending a Concrete Class (المثال 2: فئة مجهولة ترث من فئة ملموسة)"
            },
            {
              type: "paragraph",
              text: "Overriding specific methods of an existing concrete class on the fly."
            },
            {
              type: "code",
              language: "java",
              filename: "AnonymousConcreteDemo.java",
              code: `public class AnonymousConcreteDemo {
    static class Polygon {
        void display() {
            System.out.println("Displaying generic polygon.");
        }
    }

    public static void main(String[] args) {
        // Anonymous class extending Polygon and overriding display()
        Polygon specialHexagon = new Polygon() {
            @Override
            void display() {
                System.out.println("Displaying customized 6-sided Hexagon with neon borders.");
            }
        };

        specialHexagon.display();
    }
}`,
              output: `Displaying customized 6-sided Hexagon with neon borders.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "Anonymous classes can extend concrete classes, allowing quick surgical overrides without creating dedicated subclass files."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "يمكن للفئات المجهولة وراثة فئات عادية وإعادة تعريف دوالها بسرعة دون الحاجة لإنشاء ملفات أصناف جديدة."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Anonymous Class Extending an Abstract Class (المثال 3: فئة مجهولة تكمل فئة مجردة)"
            },
            {
              type: "paragraph",
              text: "Providing the missing abstract method implementations directly at instantiation."
            },
            {
              type: "code",
              language: "java",
              filename: "AnonymousAbstractDemo.java",
              code: `public class AnonymousAbstractDemo {
    static abstract class DatabaseQuery {
        abstract void execute(String sql);
    }

    public static void main(String[] args) {
        // Providing the missing abstract implementation inline
        DatabaseQuery query = new DatabaseQuery() {
            @Override
            void execute(String sql) {
                System.out.println("[SQL EXECUTOR] Running optimized plan: " + sql);
            }
        };

        query.execute("SELECT * FROM users WHERE active = 1");
    }
}`,
              output: `[SQL EXECUTOR] Running optimized plan: SELECT * FROM users WHERE active = 1`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "An abstract class cannot be instantiated directly, but an anonymous class provides the missing body, allowing instant instantiation."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "لا يمكن إنشاء كائن من فئة مجردة، ولكن الفئة المجهولة توفر الجسم الناقص فورياً مما يمكننا من إنشائها في سطر واحد."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Passing an Anonymous Class Directly as a Method Parameter (المثال 4: تمرير فئة مجهولة كمعامل دالة)"
            },
            {
              type: "paragraph",
              text: "Supplying custom callbacks directly into method argument lists without intermediate variables."
            },
            {
              type: "code",
              language: "java",
              filename: "AnonymousParamDemo.java",
              code: `public class AnonymousParamDemo {
    interface ActionCallback {
        void onComplete(int statusCode);
    }

    static void executeNetworkTask(String endpoint, ActionCallback callback) {
        System.out.println("Calling HTTP endpoint: " + endpoint);
        // Simulate task completion:
        callback.onComplete(200);
    }

    public static void main(String[] args) {
        // Anonymous class passed directly as an argument
        executeNetworkTask("https://api.domain.io/sync", new ActionCallback() {
            @Override
            public void onComplete(int status) {
                System.out.println("Network request finished with HTTP Status: " + status);
            }
        });
    }
}`,
              output: `Calling HTTP endpoint: https://api.domain.io/sync
Network request finished with HTTP Status: 200`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "Passing anonymous classes inline as arguments is common for asynchronous callbacks and listener registrations."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "تمرير الفئات المجهولة كمعاملات مباشرة للدوال هو النمط الكلاسيكي الأكثر انتشاراً لمعالجات الاستدعاء الراجع (Callbacks)."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Custom Sorting with Anonymous java.util.Comparator (المثال 5: الترتيب المخصص بـ Comparator مجهول)"
            },
            {
              type: "paragraph",
              text: "Sorting complex objects by length using an anonymous Comparator."
            },
            {
              type: "code",
              language: "java",
              filename: "AnonymousComparatorDemo.java",
              code: `import java.util.Arrays;
import java.util.Comparator;

public class AnonymousComparatorDemo {
    public static void main(String[] args) {
        String[] languages = {"Java", "Python", "C", "TypeScript", "Go"};

        // Anonymous Comparator sorting by string length ascending
        Arrays.sort(languages, new Comparator<String>() {
            @Override
            public int compare(String s1, String s2) {
                return Integer.compare(s1.length(), s2.length());
            }
        });

        System.out.println("Sorted by length: " + Arrays.toString(languages));
    }
}`,
              output: `Sorted by length: [C, Go, Java, Python, TypeScript]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "The anonymous Comparator provides an on-the-spot custom sorting algorithm without creating a dedicated named Comparator class."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "توفر الفئة المجهولة خوارزمية ترتيب مخصصة ومباشرة حسب طول النص دون الحاجة لكتابة صنف مقارنة مستقل."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Multithreading with Anonymous Runnable (المثال 6: إنشاء مسار معالجة Thread بفئة مجهولة)"
            },
            {
              type: "paragraph",
              text: "Spawning background threads using anonymous Runnable instances."
            },
            {
              type: "code",
              language: "java",
              filename: "AnonymousThreadDemo.java",
              code: `public class AnonymousThreadDemo {
    public static void main(String[] args) throws InterruptedException {
        // Anonymous Runnable
        Thread worker = new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println("[WORKER THREAD] Performing background cache cleanup.");
            }
        });

        worker.start();
        worker.join(); // Wait for thread completion
        System.out.println("[MAIN THREAD] Worker finished execution.");
    }
}`,
              output: `[WORKER THREAD] Performing background cache cleanup.
[MAIN THREAD] Worker finished execution.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "Threads commonly use anonymous Runnable implementations to define task logic concisely."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "تُستخدم الفئات المجهولة بشكل تقليدي مع Runnable لتحديد كود المهمة المراد تشغيلها في خلفية النظام (Thread)."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Accessing Enclosing Local Variables (Effectively Final) (المثال 7: قراءة المتغيرات المحلية الثابتة عملياً)"
            },
            {
              type: "paragraph",
              text: "Capturing variables from the outer method scope."
            },
            {
              type: "code",
              language: "java",
              filename: "AnonymousVariableCaptureDemo.java",
              code: `public class AnonymousVariableCaptureDemo {
    interface MessageFormatter {
        String format(String text);
    }

    public static void main(String[] args) {
        String prefix = "LOG_TRACE"; // Effectively final (not reassigned)
        int version = 4;             // Effectively final

        MessageFormatter formatter = new MessageFormatter() {
            @Override
            public String format(String text) {
                // Captures 'prefix' and 'version' from outer scope
                return "[" + prefix + " v" + version + "] " + text;
            }
        };

        System.out.println(formatter.format("Transaction committed successfully."));
    }
}`,
              output: `[LOG_TRACE v4] Transaction committed successfully.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "Anonymous classes capture local variables from their enclosing method, provided those variables are effectively final."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "تلتقط الفئات المجهولة المتغيرات المحلية من النطاق الحاضن لها بشرط أن تكون ثابتة عملياً (Effectively Final)."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Mutation Prohibition on Captured Variables (المثال 8: حظر تعديل المتغيرات الملتقطة)"
            },
            {
              type: "paragraph",
              text: "Demonstrating that modifying captured variables triggers a compiler error."
            },
            {
              type: "code",
              language: "java",
              filename: "CapturedVariableRulesDemo.java",
              code: `public class CapturedVariableRulesDemo {
    interface CounterHook {
        void increment();
    }

    public static void main(String[] args) {
        int count = 0; // Local primitive variable

        // Using a 1-element array as a safe mutable container:
        int[] safeCounter = new int[]{0};

        CounterHook hook = new CounterHook() {
            @Override
            public void increment() {
                // count++; // COMPILER ERROR: local variables referenced from an inner class must be final or effectively final!
                safeCounter[0]++; // OK: array reference itself remains final, but its contents can mutate
                System.out.println("Counter ticked to: " + safeCounter[0]);
            }
        };

        hook.increment();
        hook.increment();
    }
}`,
              output: `Counter ticked to: 1
Counter ticked to: 2`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "Primitive local variables cannot be modified inside anonymous classes. Developers commonly use a 1-element array or an object wrapper to hold mutable state safely."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "لا يمكن تعديل المتغيرات المحلية البسيطة داخل الفئة المجهولة، ولتجاوز ذلك يُستخدم كائن أو مصفوفة ذات عنصر واحد كمخزن قابل للتعديل."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Instance Initializer Blocks in Anonymous Classes (المثال 9: كتل التهيئة كبديل للمشيدات)"
            },
            {
              type: "paragraph",
              text: "Since anonymous classes have no names, constructors cannot be written; instance initializers {} are used instead."
            },
            {
              type: "code",
              language: "java",
              filename: "AnonymousInitializerDemo.java",
              code: `public class AnonymousInitializerDemo {
    static class DataPacket {
        String timestamp;
        void print() { System.out.println("Packet created at: " + timestamp); }
    }

    public static void main(String[] args) {
        DataPacket packet = new DataPacket() {
            // Instance Initializer Block (serves as constructor)
            {
                this.timestamp = "2026-09-05 16:00:00 UTC";
                System.out.println("[INITIALIZER] Anonymous DataPacket configured.");
            }
        };

        packet.print();
    }
}`,
              output: `[INITIALIZER] Anonymous DataPacket configured.
Packet created at: 2026-09-05 16:00:00 UTC`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "Because anonymous classes lack a class name, constructors cannot be declared. Instance initializer blocks {} are used to run initialization logic."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "بما أن الفئة المجهولة لا تملك اسماً، يتعذر كتابة مشيد تقليدي لها، وتُستخدم كتل التهيئة البرمجية {} بدلاً من ذلك لتهيئة البيانات."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Anonymous Class vs Lambda Expression (المثال 10: مقارنة الفئة المجهولة بتعبيرات لامبدا)"
            },
            {
              type: "paragraph",
              text: "Contrasting anonymous classes (which can hold state and override multiple methods) with concise Lambdas."
            },
            {
              type: "code",
              language: "java",
              filename: "AnonymousVsLambdaDemo.java",
              code: `public class AnonymousVsLambdaDemo {
    interface Transformer {
        String transform(String input);
    }

    public static void main(String[] args) {
        // Option A: Anonymous class (can have fields, methods, initialization)
        Transformer anon = new Transformer() {
            private int callCount = 0; // State field

            @Override
            public String transform(String input) {
                callCount++;
                return "[Anon #" + callCount + "] " + input.toUpperCase();
            }
        };

        // Option B: Lambda expression (concise syntax for pure SAM execution)
        Transformer lambda = (input) -> "[Lambda] " + input.toLowerCase();

        System.out.println(anon.transform("hello world"));
        System.out.println(anon.transform("second call"));
        System.out.println(lambda.transform("HELLO WORLD"));
    }
}`,
              output: `[Anon #1] HELLO WORLD
[Anon #2] SECOND CALL
[Lambda] hello world`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "While lambdas provide concise syntax for single-method interfaces, anonymous classes remain essential when internal state or multiple method overrides are required."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "توفر تعبيرات لامبدا إيجازاً كبيراً، لكن الفئات المجهولة تظل ضرورية عندما تحتاج الفئة لحفظ حالة داخلية (حقول) أو إعادة تعريف عدة دوال."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Enterprise Command Dispatcher with Anonymous Action Handlers (المثال 11: موزع أوامر إلكتروني متكامل بفئات مجهولة)"
            },
            {
              type: "paragraph",
              text: "Advanced: Dynamic command router executing custom business actions registered with anonymous classes."
            },
            {
              type: "code",
              language: "java",
              filename: "CommandDispatcherMaster.java",
              code: `public class CommandDispatcherMaster {
    interface CommandHandler {
        void handle(String payload);
    }

    static class CommandRegistry {
        private String[] commandNames = new String[5];
        private CommandHandler[] handlers = new CommandHandler[5];
        private int count = 0;

        public void register(String command, CommandHandler handler) {
            if (count < commandNames.length) {
                commandNames[count] = command;
                handlers[count] = handler;
                count++;
            }
        }

        public void dispatch(String command, String payload) {
            for (int i = 0; i < count; i++) {
                if (commandNames[i].equalsIgnoreCase(command)) {
                    handlers[i].handle(payload);
                    return;
                }
            }
            System.out.println("Unknown command: " + command);
        }
    }

    public static void main(String[] args) {
        CommandRegistry registry = new CommandRegistry();

        // Registering anonymous command handlers
        registry.register("REBOOT", new CommandHandler() {
            @Override
            public void handle(String payload) {
                System.out.println("[REBOOT DISPATCH] Shutting down services with delay: " + payload);
            }
        });

        registry.register("BACKUP", new CommandHandler() {
            @Override
            public void handle(String payload) {
                System.out.println("[BACKUP DISPATCH] Snapshotting database partition: " + payload);
            }
        });

        registry.dispatch("REBOOT", "30s");
        registry.dispatch("BACKUP", "/var/lib/postgresql");
    }
}`,
              output: `[REBOOT DISPATCH] Shutting down services with delay: 30s
[BACKUP DISPATCH] Snapshotting database partition: /var/lib/postgresql`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "The registry associates string commands with anonymous CommandHandler implementations, providing a clean Command Pattern architecture."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "يربط هذا السجل الأوامر بفئات مجهولة مخصصة لكل أمر، مما يطبق نمط الأوامر (Command Pattern) بمرونة وسرعة."
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
                "Mistake 1: Trying to write a constructor inside an anonymous class. Anonymous classes do not have a name, so a constructor cannot be written. Use instance initializer blocks instead.",
                "خطأ 1: محاولة كتابة مشيد داخل الفئة المجهولة؛ فبسبب عدم وجود اسم للفئة، يتعذر كتابة مشيد ويجب استخدام كتل التهيئة {}.",
                "Mistake 2: Attempting to modify non-final local variables from inside an anonymous class. Captured variables must be final or effectively final.",
                "خطأ 2: محاولة تعديل المتغيرات المحلية الحاضنة داخل الفئة المجهولة؛ إذ يجب أن تكون تلك المتغيرات ثابتة عملياً (Effectively Final).",
                "Mistake 3: Creating heavy anonymous classes with multiple complex methods where a standalone class or separate file would be much cleaner."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Priority Job Pipeline Runner (التحدي العملي: مشغل مهام حسب الأولوية)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Create a job runner: 1) Interface 'Job' with 'void runJob()'; 2) Method 'executeJob(String name, Job job)' that prints the start banner, runs the job, and prints the completion banner; 3) In main(), call 'executeJob' twice using anonymous classes: once for a 'DatabaseBackupJob' that prints backup steps, and once for a 'CachePurgeJob' that prints cache clearance steps."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: قم بإنشاء مشغل مهام: 1) واجهة Job تحتوي على runJob()؛ 2) دالة executeJob(String name, Job job) تطبع إشعار البدء وتشغل المهمة ثم تطبع إشعار الانتهاء؛ 3) في main، استدعِ executeJob مرتين باستخدام فئات مجهولة: الأولى لمهمة النسخ الاحتياطي لقاعدة البيانات، والثانية لمهمة تنظيف الذاكرة المؤقتة."
            },
            {
              type: "code",
              language: "java",
              filename: "JobRunnerChallenge.java",
              code: `public class JobRunnerChallenge {
    interface Job {
        void runJob();
    }

    static void executeJob(String jobName, Job job) {
        System.out.println(">>> STARTING TASK: " + jobName);
        job.runJob();
        System.out.println("<<< FINISHED TASK: " + jobName + "\\n");
    }

    public static void main(String[] args) {
        // Job 1: Anonymous DB Backup
        executeJob("Database Backup", new Job() {
            @Override
            public void runJob() {
                System.out.println("Exporting WAL archives and dumping SQL tables to /backups/db.sql.gz");
            }
        });

        // Job 2: Anonymous Cache Purge
        executeJob("Cache Purge", new Job() {
            @Override
            public void runJob() {
                System.out.println("Evicting expired Redis cache keys and releasing memory.");
            }
        });
    }
}`,
              output: `>>> STARTING TASK: Database Backup
Exporting WAL archives and dumping SQL tables to /backups/db.sql.gz
<<< FINISHED TASK: Database Backup

>>> STARTING TASK: Cache Purge
Evicting expired Redis cache keys and releasing memory.
<<< FINISHED TASK: Cache Purge`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "The anonymous classes provide one-off implementations of the Job interface directly within the executeJob method call arguments."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "وفرت الفئات المجهولة تنفيذاً فورياً ومخصصاً لواجهة Job مباشرة داخل معاملات استدعاء دالة executeJob."
            }
          ],
          quiz: [
          {
                    "id": "q1",
                    "question": "Can an anonymous class in Java declare its own explicit constructor?\n(هل يمكن للفئة المجهولة في جافا تعريف مشيد صريح خاص بها؟)",
                    "options": [
                              "Yes, by using the superclass name as constructor name.",
                              "No; because an anonymous class has no name, it is syntactically impossible to declare a constructor for it.",
                              "Yes, by using the keyword 'constructor'.",
                              "Only if it implements an interface."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Constructors in Java must match the class name. Because an anonymous class has no identifier, it cannot declare any constructors. (المشيد في جافا يشترط تطابق اسمه مع اسم الفئة، ولأن الفئة المجهولة بلا اسم يستحيل تعريف مشيد لها)."
          },
          {
                    "id": "q2",
                    "question": "Since an anonymous class cannot define a constructor, how can complex instance initialization be performed inside it?",
                    "options": [
                              "By defining a static method called init().",
                              "By utilizing an Instance Initializer block: '{ /* initialization code */ }'.",
                              "By overriding java.lang.Object.finalize().",
                              "Initialization is impossible in anonymous classes."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Instance initializer blocks (code enclosed in '{ }' directly inside the class body) run when an instance is created, serving as the official mechanism for constructor-like initialization in anonymous classes. (كتل التهيئة المباشرة { } تُنفذ فور إنشاء الكائن وتعمل كبديل فعال للمشيدات في الفئات المجهولة)."
          },
          {
                    "id": "q3",
                    "question": "Why must an anonymous class definition terminate with a semicolon ';' after its closing brace '};'?\n\nRunnable r = new Runnable() {\n    public void run() {}\n}; // line 3",
                    "options": [
                              "It is an optional style choice.",
                              "Because the entire anonymous class declaration is part of an expression (an assignment or method invocation statement) that must end with a semicolon.",
                              "To tell the garbage collector to clear the class.",
                              "Because Runnable is an interface."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! An anonymous class is declared and instantiated inside an expression (such as an assignment statement or argument pass). Like any Java statement, it must end with a semicolon ';'. (الفئة المجهولة تُنشأ كجزء من تعبير أو جملة إسناد، وكل جملة في جافا يجب أن تختم بفاصلة منقوطة)."
          },
          {
                    "id": "q4",
                    "question": "Examine this code accessing an outer local variable:\n\npublic void process() {\n    int count = 10;\n    Runnable r = new Runnable() {\n        public void run() {\n            System.out.println(count);\n        }\n    };\n    count = 20; // line 8\n    r.run();\n}\n\nWhat happens when compiling this method?",
                    "options": [
                              "It compiles and prints 20.",
                              "It compiles and prints 10.",
                              "Compile-time error: local variables referenced from an inner class must be final or effectively final.",
                              "It throws a ConcurrentModificationException."
                    ],
                    "correctIndex": 2,
                    "explanation": "Correct! Any local variable captured by an anonymous class must be 'final' or 'effectively final' (never reassigned after initialization). Modifying 'count = 20' violates this rule, causing a compile-time error. (المتغيرات المحلية المستخدمة داخل فئة مجهولة يجب ألا تتغير قيمتها، وتعديل count يفسد شرط الثبات العملي ويمنع التصريف)."
          },
          {
                    "id": "q5",
                    "question": "What occurs if an anonymous class attempts to mutate a primitive local variable declared in its enclosing method:\n\npublic void track() {\n    int attempts = 0;\n    Button.onClick(new ClickListener() {\n        public void onClick() {\n            attempts++; // line 5\n        }\n    });\n}",
                    "options": [
                              "It compiles cleanly and increments attempts.",
                              "Compile-time error at line 5: local variables referenced from an inner class must be final or effectively final.",
                              "It creates a shadow copy of attempts in the heap.",
                              "It compiles only if attempts is declared volatile."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! The anonymous class cannot mutate a local primitive variable because Java captures local variables by value (copying them). Mutating 'attempts++' inside the inner class is strictly rejected by the compiler. (لا تستطيع الفئة المجهولة تعديل متغير محلي بدائي لأن جافا تلتقطه بالقيمة، ومحاولة تعديله تسبب خطأ تصريف صريح)."
          },
          {
                    "id": "q6",
                    "question": "Inside a method of an anonymous class, to what does the keyword 'this' refer?\n\nclass Window {\n    void setup() {\n        Handler h = new Handler() {\n            void handle() {\n                System.out.println(this.getClass().getName());\n            }\n        };\n    }\n}",
                    "options": [
                              "It refers to the enclosing Window instance.",
                              "It refers to the instance of the anonymous class itself.",
                              "It refers to java.lang.Object.",
                              "It is undefined and causes a compile error."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Inside an anonymous class, 'this' refers to the anonymous class instance itself. To refer to the enclosing outer instance, you must explicitly qualify it as 'Window.this'. (تشير الكلمة this داخل الفئة المجهولة لكائن الفئة المجهولة نفسها، وللوصول لكائن الفئة الحاضنة نكتب Window.this)."
          },
          {
                    "id": "q7",
                    "question": "How can code inside an anonymous class invoke a method on its outer enclosing class instance when method names collide?",
                    "options": [
                              "super.methodName()",
                              "OuterClassName.this.methodName()",
                              "this.outer.methodName()",
                              "OuterClassName.super.methodName()"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Using 'OuterClassName.this.methodName()' qualifies the reference and invokes the method on the enclosing outer class instance. (الصيغة OuterClassName.this تسمح باستدعاء دوال الفئة الحاضنة وتجاوز أي تشابه في الأسماء)."
          },
          {
                    "id": "q8",
                    "question": "Can an anonymous class pass arguments to the superclass constructor when extending a concrete or abstract class?\n\nThread t = new Thread(\"CustomWorker\") {\n    public void run() {\n        System.out.println(getName());\n    }\n};",
                    "options": [
                              "No, anonymous classes cannot pass constructor arguments.",
                              "Yes, the arguments enclosed in parentheses 'new SuperClass(args)' are passed directly to the matching superclass constructor.",
                              "Only if the superclass is an interface.",
                              "Only through reflection."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! When an anonymous class extends a class (like Thread), any arguments inside 'new SuperClass(args)' are forwarded directly to the superclass's constructor (invoking 'Thread(String name)'). (عند وراثة فئة ملموسة، تُمرر المعاملات بين القوسين مباشرة لمشيد الفئة الأب المطابق)."
          },
          {
                    "id": "q9",
                    "question": "Can a single anonymous class in Java implement two interfaces simultaneously (e.g. 'new Runnable, Serializable()')?",
                    "options": [
                              "Yes, by separating the interface names with commas.",
                              "No; an anonymous class can either extend exactly one class OR implement exactly one interface, never both or multiple.",
                              "Yes, using the ampersand '&' operator.",
                              "Only in generic type boundaries."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! An anonymous class declaration can specify only a single target type: either one class to extend, or one interface to implement. It cannot implement multiple interfaces. (الفئة المجهولة ترث فئة واحدة فقط أو تطبق واجهة واحدة فقط، ولا يمكنها وراثة أو تطبيق عدة واجهات معاً)."
          },
          {
                    "id": "q10",
                    "question": "Consider this custom sorting code using an anonymous Comparator:\n\nString[] cities = {\"Tokyo\", \"Cairo\", \"San Francisco\", \"Rome\"};\nArrays.sort(cities, new Comparator<String>() {\n    public int compare(String s1, String s2) {\n        return s1.length() - s2.length();\n    }\n});\nSystem.out.println(cities[0]);\n\nWhat is printed to the console?",
                    "options": [
                              "Tokyo",
                              "Cairo",
                              "Rome",
                              "San Francisco"
                    ],
                    "correctIndex": 2,
                    "explanation": "Correct! The comparator compares string lengths in ascending order ('s1.length() - s2.length()'). 'Rome' has length 4, while 'Tokyo' (5), 'Cairo' (5), and 'San Francisco' (13) are longer. Thus, 'Rome' is sorted into cities[0]. (المقارن يرتب النصوص تصاعدياً حسب الطول، وكلمة Rome طولها 4 حروف وهي الأقصر فتكون أول عنصر)."
          },
          {
                    "id": "q11",
                    "question": "When is a developer REQUIRED to use an Anonymous Class rather than a Lambda Expression in Java?",
                    "options": [
                              "When passing an argument to a GUI event listener.",
                              "When extending an abstract or concrete class, implementing an interface with multiple abstract methods, or maintaining independent mutable instance state.",
                              "Whenever returning a String from a method.",
                              "Lambdas have completely replaced anonymous classes and there is never a reason to use them."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Lambdas can only implement Functional Interfaces (interfaces with exactly one abstract method). If you need to extend a class (abstract or concrete), implement an interface with two or more methods, or hold complex instance state/helpers, an anonymous class is required. (لامبدا تطبق الواجهات ذات الدالة الواحدة فقط، أما عند وراثة فئات أو واجهات متعددة الدوال فيلزم استخدام الفئات المجهولة)."
          },
          {
                    "id": "q12",
                    "question": "What bytecode file name does the Java compiler generate for the first anonymous class declared inside 'OrderManager.java'?",
                    "options": [
                              "OrderManager$anon.class",
                              "OrderManager$1.class",
                              "OrderManager_Anonymous.class",
                              "Anonymous1.class"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! The Java compiler assigns numbered identifiers to anonymous classes, naming the output class file 'EnclosingClassName$1.class', 'EnclosingClassName$2.class', etc. (يسمي المترجم ملفات الفئات المجهولة بترقيم تسلسلي مثل OrderManager$1.class)."
          },
          {
                    "id": "q13",
                    "question": "Consider this code where an anonymous class is passed directly as a method argument:\n\ninterface Callback {\n    void onComplete(String status);\n}\nclass TaskRunner {\n    static void execute(Callback cb) {\n        cb.onComplete(\"SUCCESS\");\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        TaskRunner.execute(new Callback() {\n            public void onComplete(String s) {\n                System.out.print(\"Result: \" + s);\n            }\n        });\n    }\n}\n\nWhat is the output?",
                    "options": [
                              "Result: SUCCESS",
                              "Result: null",
                              "Compile-time error: cannot instantiate interface Callback",
                              "SUCCESS"
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! Passing an anonymous class implementing Callback directly as an argument creates the object inline, which executes inside execute() and prints 'Result: SUCCESS'. (تمرير الفئة المجهولة كمعامل دالة ينشئ الكائن في نفس السطر وينفذ الدالة ويطبع 'Result: SUCCESS')."
          },
          {
                    "id": "q14",
                    "question": "Examine this code defining an extra helper method inside an anonymous class:\n\ninterface Greeter {\n    void greet();\n}\npublic class Demo {\n    public static void main(String[] args) {\n        Greeter g = new Greeter() {\n            public void greet() { System.out.print(\"Hi \"); }\n            public void specialBonus() { System.out.print(\"Bonus\"); } // extra method\n        };\n        g.greet();\n        g.specialBonus(); // line 11\n    }\n}\n\nWhat occurs during compilation?",
                    "options": [
                              "It compiles and prints 'Hi Bonus'.",
                              "Compile-time error at line 11: cannot find symbol method specialBonus() in variable g of type Greeter.",
                              "It throws a NoSuchMethodException at runtime.",
                              "It compiles only if specialBonus() is static."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! The reference variable 'g' is typed as 'Greeter'. Because Greeter only declares 'greet()', the compiler cannot see or verify 'specialBonus()' through reference 'g'. (نوع المرجع g هو Greeter ولا يحتوي على الدالة specialBonus، لذا يفشل التصريف عند استدعائها عبر g)."
          },
          {
                    "id": "q15",
                    "question": "Why can anonymous classes cause memory leaks when passed as listeners or callbacks to long-lived singleton services?",
                    "options": [
                              "Because anonymous classes are never destroyed by the JVM.",
                              "Because they hold an invisible strong reference to their enclosing outer class instance, preventing that outer object from being garbage-collected as long as the listener is registered.",
                              "Because they increase JVM heap size by 100MB.",
                              "Because they bypass Java reference counts."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Like member inner classes, non-static anonymous classes hold a hidden reference to their enclosing outer instance. If the anonymous listener is retained by a long-lived service, the entire outer enclosing object is kept in memory, leaking resources. (تحتفظ الفئة المجهولة بمرجع خفي للكائن الخارجي مما قد يمنع تنظيفه من الذاكرة ويسبب تسريباً برمجياً إذا ارتبطت بخدمة طويلة العمر)."
          }
        ]
      }
    ]
  }
];
})();
