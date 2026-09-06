/**
 * Java Curriculum Module - Part 6
 * Topics:
 * 11. Java Polymorphism
 * 12. Java super Keyword
 * 
 * 100% Offline, Pure JavaScript. Complete educational content with full bilingual (English & Arabic) explanations.
 */

(function () {
  'use strict';

  window.JAVA_TOPICS_PART6 = [
    /* ==========================================================================
       TOPIC 11: Java Polymorphism
       ========================================================================== */
    {
      id: "java-polymorphism",
      title: "11. Java Polymorphism",
      description: "Mastering Java Polymorphism: Compile-time vs runtime polymorphism, dynamic method dispatch, upcasting/downcasting, instanceof operator, and polymorphic collections.",
      lessons: [
        {
          id: "polymorphism-mastery",
          title: "Complete Guide to Java Polymorphism",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "Understanding Polymorphism (فهم مفهوم تعدد الأشكال في جافا)"
            },
            {
              type: "paragraph",
              text: "Polymorphism (derived from Greek words meaning 'many forms') is one of the four foundational pillars of Object-Oriented Programming. In Java, polymorphism allows a single interface, superclass reference, or method call to behave differently depending on the actual underlying object type at runtime. There are two primary types of polymorphism in Java: 1) Compile-time (Static) Polymorphism, achieved via Method Overloading; 2) Runtime (Dynamic) Polymorphism, achieved via Dynamic Method Dispatch through Method Overriding."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "تعدد الأشكال (Polymorphism) مشتق من كلمة يونانية تعني 'الأشكال المتعددة'، وهو ركيزة أساسية في البرمجة كائنية التوجه. يسمح تعدد الأشكال لمرجع فئة أساسية أو استدعاء دالة واحدة أن يتخذ أشكالاً وسلوكيات مختلفة بحسب نوع الكائن الفعلي الموجود في الذاكرة أثناء التشغيل. ينقسم إلى نوعين: 1) تعدد الأشكال في وقت التصريف (Compile-Time / Static) ويتحقق بالتحميل الزائد للدوال (Method Overloading)؛ 2) تعدد الأشكال في وقت التشغيل (Runtime / Dynamic) ويتحقق بإعادة تعريف الدوال وتجاوزها (Method Overriding) عبر الربط الديناميكي (Dynamic Method Dispatch)."
            },
            {
              type: "paragraph",
              text: "Polymorphism decouples high-level business logic from specific concrete implementations, enabling clean, maintainable, and extensible architectures."
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
              text: "Example 1: Foundational Dynamic Method Dispatch (المثال 1: التوجيه الديناميكي الأساسي للدوال)"
            },
            {
              type: "paragraph",
              text: "Holding a subclass object in a superclass reference variable and invoking overridden methods."
            },
            {
              type: "code",
              language: "java",
              filename: "BasicPolymorphismDemo.java",
              code: `public class BasicPolymorphismDemo {
    static class Animal {
        void makeSound() {
            System.out.println("The generic animal makes a sound.");
        }
    }

    static class Cat extends Animal {
        @Override
        void makeSound() {
            System.out.println("Meow! Meow!");
        }
    }

    static class Dog extends Animal {
        @Override
        void makeSound() {
            System.out.println("Woof! Woof!");
        }
    }

    public static void main(String[] args) {
        // Superclass reference holding different subclass objects (Upcasting)
        Animal a1 = new Cat();
        Animal a2 = new Dog();

        a1.makeSound(); // JVM calls Cat's makeSound() at runtime
        a2.makeSound(); // JVM calls Dog's makeSound() at runtime
    }
}`,
              output: `Meow! Meow!
Woof! Woof!`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "Even though variables a1 and a2 are declared as type Animal, the Java Virtual Machine inspects the actual heap object at runtime and dispatches to the child's overridden method."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "على الرغم من أن المتغيرات a1 و a2 من نوع Animal، إلا أن آلة جافا الافتراضية (JVM) تفحص الكائن الفعلي في الذاكرة أثناء وقت التشغيل وتستدعي دالة الصنف الابن المناسبة."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Polymorphic Array of Heterogeneous Objects (المثال 2: مصفوفة متعددة الأشكال لكائنات مختلفة)"
            },
            {
              type: "paragraph",
              text: "Storing multiple distinct subclasses inside a single unified superclass array."
            },
            {
              type: "code",
              language: "java",
              filename: "PolymorphicArrayDemo.java",
              code: `public class PolymorphicArrayDemo {
    static abstract class Shape {
        abstract double area();
    }

    static class Circle extends Shape {
        double r;
        Circle(double r) { this.r = r; }
        @Override double area() { return Math.PI * r * r; }
    }

    static class Rectangle extends Shape {
        double w, h;
        Rectangle(double w, double h) { this.w = w; this.h = h; }
        @Override double area() { return w * h; }
    }

    public static void main(String[] args) {
        // Heterogeneous array of shapes
        Shape[] shapes = {
            new Circle(3.0),
            new Rectangle(4.0, 5.0),
            new Circle(1.5)
        };

        double totalArea = 0;
        for (Shape s : shapes) {
            totalArea += s.area(); // Polymorphic call to s.area()
        }

        System.out.printf("Total Area of Shapes: %.2f%n", totalArea);
    }
}`,
              output: `Total Area of Shapes: 55.34`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "The array accommodates any subclass of Shape. The loop processes them uniformly without caring about their specific concrete type."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "تتسع المصفوفة لأي صنف يرث من Shape، وتقوم حلقة التكرار بحساب المساحة الإجمالية بشكل موحد دون الحاجة لمعرفة نوع الشكل الفعلي."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Polymorphic Method Parameters (المثال 3: تمرير الكائنات متعددة الأشكال كمعاملات)"
            },
            {
              type: "paragraph",
              text: "Writing a single generic processor method that accepts any derived subclass."
            },
            {
              type: "code",
              language: "java",
              filename: "PolymorphicParamDemo.java",
              code: `public class PolymorphicParamDemo {
    static class Instrument {
        void play() {
            System.out.println("Playing instrument note...");
        }
    }

    static class Piano extends Instrument {
        @Override void play() { System.out.println("Piano plays acoustic melody."); }
    }

    static class Guitar extends Instrument {
        @Override void play() { System.out.println("Guitar plays strummed chords."); }
    }

    // Accepts the generic superclass
    static void tuneAndPlay(Instrument i) {
        System.out.print("[Tuner Ready] -> ");
        i.play(); // Polymorphic invocation
    }

    public static void main(String[] args) {
        tuneAndPlay(new Piano());
        tuneAndPlay(new Guitar());
    }
}`,
              output: `[Tuner Ready] -> Piano plays acoustic melody.
[Tuner Ready] -> Guitar plays strummed chords.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "The 'tuneAndPlay' function is closed for modification but open for extension: new instrument subclasses can be passed to it without changing its code."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "دالة 'tuneAndPlay' تتبع مبدأ البرمجة المفتوحة للتوسع، حيث يمكن إضافة آلات موسيقية جديدة في المستقبل وتمريرها للدالة دون تعديل كودها."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Compile-Time vs Runtime Polymorphism in Action (المثال 4: مقارنة تعدد الأشكال الثابت والديناميكي)"
            },
            {
              type: "paragraph",
              text: "Direct comparison between method overloading (static) and method overriding (dynamic)."
            },
            {
              type: "code",
              language: "java",
              filename: "StaticVsDynamicPoly.java",
              code: `public class StaticVsDynamicPoly {
    static class Greeter {
        // Compile-Time (Static) Polymorphism: Overloaded methods
        void greet() { System.out.println("Hello, guest!"); }
        void greet(String name) { System.out.println("Hello, " + name + "!"); }

        // Method to be overridden dynamically
        void farewell() { System.out.println("Goodbye!"); }
    }

    static class ArabicGreeter extends Greeter {
        // Runtime (Dynamic) Polymorphism: Overridden method
        @Override
        void farewell() { System.out.println("مع السلامة! (Ma'a as-salama!)"); }
    }

    public static void main(String[] args) {
        Greeter g = new ArabicGreeter();

        // Compile-time resolved:
        g.greet();
        g.greet("Tariq");

        // Runtime resolved (dynamic dispatch):
        g.farewell();
    }
}`,
              output: `Hello, guest!
Hello, Tariq!
مع السلامة! (Ma'a as-salama!)`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "The overloaded 'greet' calls are bound at compile time based on parameter signatures. The overridden 'farewell' call is resolved at runtime based on the object instance."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "يتم ربط استدعاءات greet في وقت التصريف بحسب المعاملات الممررة، بينما يُحل استدعاء farewell في وقت التشغيل بحسب نوع الكائن الفعلي."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Upcasting and Access Boundaries (المثال 5: الترقية المرجعية وحدود الوصول)"
            },
            {
              type: "paragraph",
              text: "Understanding that superclass references can only directly access methods declared in the superclass."
            },
            {
              type: "code",
              language: "java",
              filename: "UpcastingBoundaries.java",
              code: `public class UpcastingBoundaries {
    static class Machine {
        void powerOn() { System.out.println("Machine powered on."); }
    }

    static class Drone extends Machine {
        @Override void powerOn() { System.out.println("Drone rotors spinning up."); }
        void fly() { System.out.println("Drone flying to coordinates."); }
    }

    public static void main(String[] args) {
        Machine m = new Drone(); // Upcasting
        m.powerOn(); // OK: declared in Machine, overridden in Drone

        // m.fly(); // COMPILER ERROR: fly() is not declared in class Machine!
    }
}`,
              output: `Drone rotors spinning up.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "Upcasting narrows the visible interface to the reference type. Even though the underlying object is a Drone, a Machine reference cannot directly call 'fly()'."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "الترقية المرجعية تحصر الدوال المتاحة في تلك المعرفة في الفئة الأب؛ فرغم أن الكائن طائرة درون، لا يستطيع المتغير m استدعاء fly() مباشرة."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Safe Downcasting using instanceof (المثال 6: التحويل الهابط الآمن باستخدام instanceof)"
            },
            {
              type: "paragraph",
              text: "Casting a superclass reference back to its subclass type after verifying its runtime type."
            },
            {
              type: "code",
              language: "java",
              filename: "SafeDowncastingDemo.java",
              code: `public class SafeDowncastingDemo {
    static class MediaFile {
        String filename;
        MediaFile(String name) { this.filename = name; }
    }

    static class AudioFile extends MediaFile {
        int bitrateKbps;
        AudioFile(String name, int bitrate) { super(name); this.bitrateKbps = bitrate; }
        void playAudio() { System.out.println("Streaming audio " + filename + " @ " + bitrateKbps + " kbps"); }
    }

    public static void inspectMedia(MediaFile file) {
        // Check before downcasting to avoid ClassCastException
        if (file instanceof AudioFile) {
            AudioFile audio = (AudioFile) file; // Downcasting
            audio.playAudio();
        } else {
            System.out.println("Generic media file: " + file.filename);
        }
    }

    public static void main(String[] args) {
        inspectMedia(new AudioFile("podcast.mp3", 320));
        inspectMedia(new MediaFile("readme.txt"));
    }
}`,
              output: `Streaming audio podcast.mp3 @ 320 kbps
Generic media file: readme.txt`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "The 'instanceof' operator safely verifies the runtime identity before performing a cast, preventing destructive runtime ClassCastExceptions."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "يتحقق المعامل 'instanceof' من نوع الكائن الفعلي قبل إجراء التحويل الهابط (Downcasting) لتفادي حدوث خطأ ClassCastException."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Modern Pattern Matching for instanceof (المثال 7: مطابقة الأنماط الحديثة مع instanceof)"
            },
            {
              type: "paragraph",
              text: "Using modern Java syntax to test and cast in a single concise expression."
            },
            {
              type: "code",
              language: "java",
              filename: "PatternMatchingDemo.java",
              code: `public class PatternMatchingDemo {
    static class Notification {
        String recipient;
        Notification(String r) { this.recipient = r; }
    }

    static class EmailNotification extends Notification {
        String subject;
        EmailNotification(String r, String s) { super(r); this.subject = s; }
    }

    static void dispatch(Notification n) {
        // Pattern Matching: binds 'email' variable automatically if true
        if (n instanceof EmailNotification email) {
            System.out.println("Sending Email to " + email.recipient + " with Subject: '" + email.subject + "'");
        } else {
            System.out.println("Dispatching standard notification to " + n.recipient);
        }
    }

    public static void main(String[] args) {
        dispatch(new EmailNotification("user@domain.com", "Password Reset"));
        dispatch(new Notification("SMS:+15550199"));
    }
}`,
              output: `Sending Email to user@domain.com with Subject: 'Password Reset'
Dispatching standard notification to SMS:+15550199`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "Pattern matching for instanceof combines type checking and casting into a single step, eliminating boilerplate casting code."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "تدمج مطابقة الأنماط (Pattern Matching) في جافا الحديثة عملية التحقق والتحويل في خطوة واحدة أنيقة بدون تكرار الكود."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Polymorphic Factory Method (المثال 8: دالة المصنع متعددة الأشكال)"
            },
            {
              type: "paragraph",
              text: "Returning a base superclass from a factory method while creating specialized subclass instances."
            },
            {
              type: "code",
              language: "java",
              filename: "PolymorphicFactoryDemo.java",
              code: `public class PolymorphicFactoryDemo {
    static abstract class DatabaseConnector {
        abstract void connect();
    }

    static class MySQLConnector extends DatabaseConnector {
        @Override void connect() { System.out.println("Connected to MySQL DB via port 3306."); }
    }

    static class PostgreSQLConnector extends DatabaseConnector {
        @Override void connect() { System.out.println("Connected to PostgreSQL DB via port 5432."); }
    }

    // Factory returning generic base type
    static DatabaseConnector createConnector(String dbType) {
        if ("mysql".equalsIgnoreCase(dbType)) return new MySQLConnector();
        return new PostgreSQLConnector();
    }

    public static void main(String[] args) {
        DatabaseConnector db1 = createConnector("mysql");
        DatabaseConnector db2 = createConnector("postgres");

        db1.connect();
        db2.connect();
    }
}`,
              output: `Connected to MySQL DB via port 3306.
Connected to PostgreSQL DB via port 5432.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "Factory methods leverage polymorphism by declaring a generic superclass return type, allowing callers to use the returned object without coupling to concrete classes."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "تستفيد دوال المصنع من تعدد الأشكال بإرجاع نوع الفئة الأساسية، مما يمكن المتصل من استخدام الكائن دون الارتباط المباشر بفئاته الفرعية."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Multilevel Polymorphic Dynamic Dispatch (المثال 9: التوجيه الديناميكي عبر مستويات وراثة متعددة)"
            },
            {
              type: "paragraph",
              text: "Tracking how overridden method calls resolve through three tiers of class hierarchy."
            },
            {
              type: "code",
              language: "java",
              filename: "MultilevelDispatchDemo.java",
              code: `public class MultilevelDispatchDemo {
    static class Tier1 {
        void identify() { System.out.println("Tier 1: Base Entity"); }
    }

    static class Tier2 extends Tier1 {
        @Override void identify() { System.out.println("Tier 2: Intermediate Entity"); }
    }

    static class Tier3 extends Tier2 {
        @Override void identify() { System.out.println("Tier 3: Specialized Entity"); }
    }

    public static void main(String[] args) {
        Tier1 obj = new Tier3();
        obj.identify(); // Resolves to the most derived class in the heap: Tier3
    }
}`,
              output: `Tier 3: Specialized Entity`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "Dynamic dispatch navigates to the lowest, most specific override in the hierarchy that belongs to the actual heap object."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "يتجه التوجيه الديناميكي لأكثر نسخة مخصصة من الدالة في أسفل شجرة الوراثة والتي تخص الكائن الفعلي المخزن في الذاكرة."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Catching Unsafe Downcast Errors (المثال 10: معالجة خطأ التحويل الهابط غير الآمن)"
            },
            {
              type: "paragraph",
              text: "Demonstrating the runtime ClassCastException when casting an object to an incompatible type."
            },
            {
              type: "code",
              language: "java",
              filename: "ClassCastExceptionDemo.java",
              code: `public class ClassCastExceptionDemo {
    static class Fruit {}
    static class Apple extends Fruit {}
    static class Orange extends Fruit {}

    public static void main(String[] args) {
        Fruit f = new Apple(); // Upcast

        try {
            // An Apple is NOT an Orange!
            Orange o = (Orange) f; 
            System.out.println("Downcast succeeded: " + o);
        } catch (ClassCastException e) {
            System.out.println("Caught Expected ClassCastException: Cannot cast Apple to Orange.");
        }
    }
}`,
              output: `Caught Expected ClassCastException: Cannot cast Apple to Orange.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "Casting an object to a sibling class that it does not belong to triggers a ClassCastException at runtime. Always guard with instanceof."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "تحويل كائن إلى فئة شقيقة لا ينتمي إليها يسبب استثناء ClassCastException أثناء التشغيل، لذلك يجب الحذر والتحقق دوماً بـ instanceof."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Enterprise Payment Gateway Processor (المثال 11: معالج بوابات الدفع الإلكتروني متعدد الأشكال)"
            },
            {
              type: "paragraph",
              text: "Advanced: Real-world polymorphic payment architecture handling Credit Card, PayPal, and Cryptocurrency."
            },
            {
              type: "code",
              language: "java",
              filename: "PaymentGatewayMaster.java",
              code: `public class PaymentGatewayMaster {
    static abstract class PaymentMethod {
        String accountIdentifier;
        PaymentMethod(String id) { this.accountIdentifier = id; }
        abstract boolean processPayment(double amount);
    }

    static class CreditCardPayment extends PaymentMethod {
        CreditCardPayment(String cardNum) { super(cardNum); }
        @Override
        boolean processPayment(double amount) {
            System.out.printf("Charging $%.2f to Credit Card [****-%s] via Visa/MasterCard network.%n",
                amount, accountIdentifier.substring(accountIdentifier.length() - 4));
            return true;
        }
    }

    static class PayPalPayment extends PaymentMethod {
        PayPalPayment(String email) { super(email); }
        @Override
        boolean processPayment(double amount) {
            System.out.printf("Transferring $%.2f via PayPal API for account [%s].%n", amount, accountIdentifier);
            return true;
        }
    }

    static class CryptoPayment extends PaymentMethod {
        CryptoPayment(String wallet) { super(wallet); }
        @Override
        boolean processPayment(double amount) {
            System.out.printf("Broadcasting $%.2f transaction to Blockchain wallet [%s].%n",
                amount, accountIdentifier.substring(0, 10) + "...");
            return true;
        }
    }

    public static void main(String[] args) {
        PaymentMethod[] customerTransactions = {
            new CreditCardPayment("4111222233334589"),
            new PayPalPayment("developer@enterprise.io"),
            new CryptoPayment("0x71C83928190289190182891028190218")
        };

        System.out.println("=== PROCESSING DAILY BATCH ===");
        for (PaymentMethod pm : customerTransactions) {
            pm.processPayment(150.0); // Polymorphic dispatch
        }
    }
}`,
              output: `=== PROCESSING DAILY BATCH ===
Charging $150.00 to Credit Card [****-4589] via Visa/MasterCard network.
Transferring $150.00 via PayPal API for account [developer@enterprise.io].
Broadcasting $150.00 transaction to Blockchain wallet [0x71C83928...].`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "The payment processor loops over heterogeneous payment methods polymorphically, executing specific charge logic per provider with zero conditional if-else chains."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "يقوم معالج المدفوعات بتنفيذ العمليات عبر تعدد الأشكال دون الحاجة لجمل شرطية معقدة (if-else)، مما يتيح إضافة بوابات دفع جديدة مستقبلاً بسهولة."
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
                "Mistake 1: Expecting variables (fields) to behave polymorphically. In Java, methods are overridden, but variables are shadowed! Field access is bound at compile time based on the reference type.",
                "خطأ 1: توقع أن الحقول (المتغيرات) تتصرف بتعدد الأشكال كالدوال. في جافا، الدوال فقط هي التي يُعاد تعريفها، أما المتغيرات فتحجب (Shadowed) ويحدد نوع المرجع قيمتها في وقت التصريف.",
                "Mistake 2: Downcasting without verifying with 'instanceof'. Doing so throws ClassCastException if the object is not of the target type.",
                "خطأ 2: التحويل الهابط (Downcasting) بدون التحقق بواسطة 'instanceof'، مما يؤدي لانهيار البرنامج برمي ClassCastException.",
                "Mistake 3: Believing static methods can be overridden polymorphically. Static methods are hidden, not overridden, and do not participate in dynamic method dispatch."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Polymorphic Notification Hub (التحدي العملي: مركز الإشعارات متعدد الأشكال)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Build a notification system: 1) Base abstract class 'NotificationService' with method 'send(String msg)'; 2) Subclasses 'EmailService', 'SMSService', and 'PushService', each overriding 'send' with custom dispatch logic; 3) In main(), create a NotificationService array with all 3 services and broadcast the message 'Server CPU usage exceeds 90%' polymorphically."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: قم بإنشاء نظام إشعارات: 1) فئة أساسية مجردة NotificationService تحتوي على دالة send(String msg)؛ 2) فئات فرعية EmailService و SMSService و PushService تعيد كل منها تعريف الدالة send بطريقتها الخاصة؛ 3) في الدالة main، أنشئ مصفوفة تشمل الأنواع الثلاثة وقم ببث التنبيه 'Server CPU usage exceeds 90%' للجميع عبر تعدد الأشكال."
            },
            {
              type: "code",
              language: "java",
              filename: "NotificationHubChallenge.java",
              code: `public class NotificationHubChallenge {
    static abstract class NotificationService {
        abstract void send(String message);
    }

    static class EmailService extends NotificationService {
        @Override
        void send(String message) {
            System.out.println("[EMAIL DISPATCH] Alert sent via SMTP: " + message);
        }
    }

    static class SMSService extends NotificationService {
        @Override
        void send(String message) {
            System.out.println("[SMS DISPATCH] Cellular text sent to admins: " + message);
        }
    }

    static class PushService extends NotificationService {
        @Override
        void send(String message) {
            System.out.println("[PUSH NOTIFICATION] Mobile socket banner triggered: " + message);
        }
    }

    public static void main(String[] args) {
        NotificationService[] channels = {
            new EmailService(),
            new SMSService(),
            new PushService()
        };

        String alert = "Server CPU usage exceeds 90%!";
        System.out.println("Broadcasting system alert across all channels:");
        for (NotificationService channel : channels) {
            channel.send(alert); // Polymorphic execution
        }
    }
}`,
              output: `Broadcasting system alert across all channels:
[EMAIL DISPATCH] Alert sent via SMTP: Server CPU usage exceeds 90%!
[SMS DISPATCH] Cellular text sent to admins: Server CPU usage exceeds 90%!
[PUSH NOTIFICATION] Mobile socket banner triggered: Server CPU usage exceeds 90%!`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "By calling 'channel.send(alert)', each service executes its respective communication protocol through dynamic method dispatch."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "باستدعاء channel.send(alert) ينفذ كل مسار كود الإرسال الخاص به تلقائياً اعتماداً على التوجيه الديناميكي للدوال."
            }
          ],
          quiz: [
          {
                    "id": "q1",
                    "question": "What is the core technical difference between Compile-Time Polymorphism and Runtime Polymorphism in Java?\n(ما هو الفارق التقني الجوهري بين تعدد الأشكال وقت الترجمة ووقت التشغيل في جافا؟)",
                    "options": [
                              "Compile-time polymorphism is achieved via Method Overriding; runtime polymorphism is achieved via Method Overloading.",
                              "Compile-time polymorphism uses static binding (Method Overloading); runtime polymorphism uses dynamic method dispatch on actual object types (Method Overriding).",
                              "Runtime polymorphism applies only to static methods, whereas compile-time polymorphism applies to instance methods.",
                              "Compile-time polymorphism requires abstract classes; runtime polymorphism requires interfaces only."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Compile-time polymorphism (Method Overloading) is resolved by the compiler based on method signatures (static binding). Runtime polymorphism (Method Overriding) is resolved by the JVM at runtime using dynamic method dispatch based on the actual object instance. (تعدد الأشكال وقت الترجمة يرتكز على زيادة التحميل والربط الثابت، بينما وقت التشغيل يعتمد على التجاوز والتوجيه الديناميكي وفق نوع الكائن الحقيقي)."
          },
          {
                    "id": "q2",
                    "question": "Predict the output of the following code:\n\nclass Animal {\n    void speak() { System.out.print(\"GenericSound \"); }\n}\nclass Dog extends Animal {\n    @Override\n    void speak() { System.out.print(\"Bark \"); }\n}\nclass GoldenRetriever extends Dog {\n    @Override\n    void speak() { System.out.print(\"FriendlyBark \"); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Animal a = new GoldenRetriever();\n        a.speak();\n    }\n}",
                    "options": [
                              "GenericSound ",
                              "Bark ",
                              "FriendlyBark ",
                              "Compile-time error: cannot assign GoldenRetriever to Animal reference"
                    ],
                    "correctIndex": 2,
                    "explanation": "Correct! Because 'a' references an instance of GoldenRetriever on the heap, runtime dynamic method dispatch executes GoldenRetriever's overridden speak() method, printing 'FriendlyBark '. (بما أن المرجع يشير لكائن GoldenRetriever، فإن التوجيه الديناميكي ينفذ دالة الفئة الأخيرة في شجرة الوراثة)."
          },
          {
                    "id": "q3",
                    "question": "Examine this code snippet:\n\nclass Machine {\n    void start() { System.out.println(\"Machine starting\"); }\n}\nclass Drill extends Machine {\n    void start() { System.out.println(\"Drill spinning\"); }\n    void changeBit() { System.out.println(\"Bit changed\"); }\n}\npublic class Test {\n    public static void main(String[] args) {\n        Machine m = new Drill();\n        m.changeBit(); // line 11\n    }\n}\n\nWhat occurs when compiling and running this program?",
                    "options": [
                              "It compiles cleanly and prints 'Bit changed'.",
                              "Compile-time error at line 11: cannot find symbol method changeBit() in class Machine.",
                              "A ClassCastException is thrown at runtime at line 11.",
                              "It compiles and runs, printing 'Drill spinning' followed by 'Bit changed'."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! The reference type (Machine) defines the compile-time contract (what methods can be called). Because Machine does not declare 'changeBit()', the compiler reports an error, even though the underlying object is a Drill. To call it, an explicit downcast is required. (نوع المرجع Machine يحدد العمليات المتاحة وقت الترجمة، ولأن Machine لا تحوي changeBit يفشل التصريف)."
          },
          {
                    "id": "q4",
                    "question": "Consider this code analyzing variable binding:\n\nclass Base {\n    int count = 100;\n}\nclass Sub extends Base {\n    int count = 200;\n}\npublic class VariableBindingDemo {\n    public static void main(String[] args) {\n        Base b = new Sub();\n        System.out.println(b.count);\n    }\n}\n\nWhat is the printed output?",
                    "options": [
                              "100",
                              "200",
                              "0",
                              "Compile-time error: duplicate attribute count"
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! In Java, instance variables are NOT polymorphic. Field access is resolved strictly at compile time based on the declared type of the reference (Base b), which holds count = 100. (المتغيرات في جافا لا تخضع لتعدد الأشكال؛ الوصول للمتغيرات يُحدد بنوع المرجع وقت الترجمة)."
          },
          {
                    "id": "q5",
                    "question": "What happens when executing the following downcast:\n\nclass Vehicle {}\nclass Motorcycle extends Vehicle {}\n\npublic class CastTest {\n    public static void main(String[] args) {\n        Vehicle v = new Vehicle();\n        Motorcycle m = (Motorcycle) v;\n    }\n}",
                    "options": [
                              "It compiles and runs without any errors.",
                              "Compile-time error: incompatible types in cast.",
                              "It compiles cleanly, but throws ClassCastException at runtime.",
                              "The variable m becomes null."
                    ],
                    "correctIndex": 2,
                    "explanation": "Correct! The actual object created is a pure Vehicle, not a Motorcycle. Attempting to force-cast a parent object into a child type fails runtime type verification, throwing a ClassCastException. (الكائن الفعلي هو Vehicle مجرد، لذا يفشل التحويل الهابط القسري وقت التشغيل ويرمي استثناء ClassCastException)."
          },
          {
                    "id": "q6",
                    "question": "How can a developer guarantee safe downcasting before performing an explicit cast to prevent ClassCastException?\n(كيف يمكن ضمان التحويل الهابط الآمن لتجنب استثناء ClassCastException؟)",
                    "options": [
                              "Using a try-catch block catching NullPointerException.",
                              "Checking with the 'instanceof' operator first (e.g. 'if (v instanceof Motorcycle)').",
                              "Declaring the reference variable as volatile.",
                              "Calling System.gc() before casting."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Checking the reference with the 'instanceof' operator ensures that the object is genuinely an instance of the target type (or subtype) before casting, completely avoiding ClassCastException. (فحص الكائن بمعامل instanceof قبل التحويل يضمن أمان التحويل ويمنع الخطأ تماماً)."
          },
          {
                    "id": "q7",
                    "question": "In modern Java (Java 16+), Pattern Matching for instanceof allows which elegant, safe syntax?",
                    "options": [
                              "if (obj.is(Dog)) { Dog d = obj; }",
                              "if (obj instanceof Dog d) { d.bark(); }",
                              "match (obj) { case Dog -> bark(); }",
                              "if (instanceof(Dog, obj)) { obj->bark(); }"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Pattern matching for instanceof combines type checking and conditional variable binding into a single concise expression: 'if (obj instanceof Dog d) { d.bark(); }'. (مطابقة الأنماط مع instanceof تدمج التحقق من النوع والتحويل في سطر واحد مختصر وآمن)."
          },
          {
                    "id": "q8",
                    "question": "Predict the output of the following static method hiding code:\n\nclass Parent {\n    static void announce() { System.out.print(\"Parent-Static \"); }\n}\nclass Child extends Parent {\n    static void announce() { System.out.print(\"Child-Static \"); }\n}\npublic class StaticDispatchDemo {\n    public static void main(String[] args) {\n        Parent p = new Child();\n        p.announce();\n    }\n}",
                    "options": [
                              "Child-Static ",
                              "Parent-Static ",
                              "Parent-Static Child-Static ",
                              "Compile-time error: static methods cannot be hidden"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Static methods cannot be overridden polymorphically; they are merely 'hidden'. Static method calls are resolved at compile time based on the declared reference type (Parent), so 'Parent.announce()' executes, printing 'Parent-Static '. (الدوال الساكنة لا تخضع لتعدد الأشكال ولا يتم تجاوزها بل تُحجب فقط، وتُربط بنوع المرجع وقت الترجمة)."
          },
          {
                    "id": "q9",
                    "question": "In an enterprise payment processing system:\n\nabstract class PaymentMethod {\n    abstract void process(double amount);\n}\nclass CreditCard extends PaymentMethod {\n    void process(double amount) { System.out.print(\"CC:\" + amount + \" \"); }\n}\nclass PayPal extends PaymentMethod {\n    void process(double amount) { System.out.print(\"PP:\" + amount + \" \"); }\n}\npublic class Checkout {\n    public static void main(String[] args) {\n        PaymentMethod[] methods = { new CreditCard(), new PayPal() };\n        for (PaymentMethod pm : methods) {\n            pm.process(50.0);\n        }\n    }\n}\n\nWhat is printed?",
                    "options": [
                              "CC:50.0 PP:50.0 ",
                              "PP:50.0 CC:50.0 ",
                              "PaymentMethod:50.0 PaymentMethod:50.0 ",
                              "Compile-time error: cannot create array of abstract class"
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! The polymorphic array holds heterogeneous objects extending PaymentMethod. The loop iterates through each element, dynamically dispatching to CreditCard.process() and PayPal.process() in sequence. (المصفوفة متعددة الأشكال تحوي كائنات متنوعة تشترك في نفس الفئة الأب، وحلقة التكرار تستدعي التنفيذ المناسب لكل كائن ديناميكياً)."
          },
          {
                    "id": "q10",
                    "question": "What is a 'Covariant Return Type' in Java method overriding?\n(ما هو نوع الإرجاع المتغاير Covariant Return Type في تجاوز الدوال؟)",
                    "options": [
                              "A feature allowing an overriding method to return void instead of an object.",
                              "A feature allowing an overriding method in a subclass to declare a return type that is a subtype of the return type declared in the superclass method.",
                              "A feature allowing a method to return multiple values simultaneously using commas.",
                              "A feature requiring the return type in subclass to be strictly java.lang.Object."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Since Java 5, an overriding method can declare a return type that is a subtype (narrower type) of the return type declared in the superclass method (e.g. superclass returns 'Vehicle', subclass overrides returning 'Car'). (نوع الإرجاع المتغاير يسمح لدالة الابن بإرجاع فئة فرعية من نوع الإرجاع المعرف في دالة الأب)."
          },
          {
                    "id": "q11",
                    "question": "Consider this method designed to accept any polymorphic subtype:\n\nclass MediaService {\n    static void playMedia(Playable item) {\n        item.play();\n    }\n}\n\nWhat is the architectural benefit of passing a supertype or interface parameter?",
                    "options": [
                              "It eliminates the need for any classes to implement Playable.",
                              "It promotes loose coupling and allows new media types to be introduced without modifying playMedia().",
                              "It speeds up bytecode execution by disabling the garbage collector.",
                              "It ensures that only audio files can be passed."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Polymorphic parameters achieve loose coupling: the service depends on the abstract contract (Playable), allowing endless concrete implementations (Audio, Video, Stream) to be passed without changing existing business logic. (الاعتماد على واجهات أو فئات أب كمعاملات يحقق الاقتران الضعيف ويسهل إضافة أنواع جديدة دون تعديل الكود القديم)."
          },
          {
                    "id": "q12",
                    "question": "Trace the dynamic method dispatch in this hierarchy:\n\nclass LevelA {\n    void execute() { System.out.print(\"A \"); }\n}\nclass LevelB extends LevelA {\n    void execute() { System.out.print(\"B \"); }\n}\nclass LevelC extends LevelB {\n    // Does not override execute()\n}\nclass LevelD extends LevelC {\n    void execute() { System.out.print(\"D \"); }\n}\npublic class HierarchyTest {\n    public static void main(String[] args) {\n        LevelA obj = new LevelC();\n        obj.execute();\n    }\n}\n\nWhat is printed?",
                    "options": [
                              "A ",
                              "B ",
                              "D ",
                              "Compile-time error: LevelC must override execute()"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! The instance created is LevelC. Because LevelC does not override execute(), the dispatch searches upward to find the closest implementation in the inheritance chain, which is LevelB's 'B '. (الكائن هو LevelC الذي لم يتجاوز الدالة، فيبحث التوجيه للأعلى ليجد أقرب تجاوز في LevelB ويطبع 'B ')."
          },
          {
                    "id": "q13",
                    "question": "Examine this code involving private methods:\n\nclass SuperSecret {\n    private void authenticate() {\n        System.out.print(\"Super Auth\");\n    }\n}\nclass SubSecret extends SuperSecret {\n    public void authenticate() {\n        System.out.print(\"Sub Auth\");\n    }\n}\n\nCan an external caller use 'SuperSecret s = new SubSecret(); s.authenticate();' to invoke 'Sub Auth'?",
                    "options": [
                              "Yes, dynamic dispatch will invoke SubSecret's public method.",
                              "No; private methods are not inherited and cannot be overridden, and 'authenticate()' is not visible on SuperSecret reference.",
                              "Yes, but only if SubSecret uses the @Override annotation.",
                              "It throws a RuntimeException."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Private methods are not visible outside their declaring class and cannot be overridden. An external caller trying 's.authenticate()' will fail to compile because authenticate() is private in SuperSecret. (الدوال الخاصة private لا تُورث ولا يمكن تجاوزها، واستدعاؤها عبر مرجع الأب يفشل في التصريف)."
          },
          {
                    "id": "q14",
                    "question": "In a database library, a developer creates a factory method:\n\npublic static DatabaseConnection createConnection(String type) {\n    if (type.equals(\"mysql\")) return new MySqlConnection();\n    else return new PostgresConnection();\n}\n\nBoth concrete classes extend the abstract class DatabaseConnection. Which core OOP principle allows this factory method to return different concrete types under a single unified return type?",
                    "options": [
                              "Multiple Inheritance",
                              "Polymorphism (Subtype Polymorphism / Upcasting)",
                              "Operator Overloading",
                              "Bytecode Instrumentation"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Subtype polymorphism allows concrete instances (MySqlConnection and PostgresConnection) to be upcast and returned as their common supertype (DatabaseConnection). (تعدد الأشكال الفرعي والترقية المرجعية يتيحان إرجاع كائنات ملموسة مختلفة بنوع الفئة الأب المشتركة)."
          },
          {
                    "id": "q15",
                    "question": "What is the result of evaluating the 'instanceof' operator on a 'null' reference:\n\nString text = null;\nboolean result = text instanceof String;\nSystem.out.println(result);",
                    "options": [
                              "It prints true.",
                              "It prints false without throwing any exception.",
                              "It throws a NullPointerException at runtime.",
                              "It results in a compile-time error."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! In Java, 'null instanceof AnyType' always safely evaluates to 'false'. It never throws a NullPointerException, making it safe for null checks. (معامل instanceof مع القيمة null ينتج دائماً false بأمان تام دون رمي NullPointerException)."
          }
        ]
      }
    ]
  },

    /* ==========================================================================
       TOPIC 12: Java super Keyword
       ========================================================================== */
    {
      id: "java-super-keyword",
      title: "12. Java super Keyword",
      description: "Comprehensive guide to the 'super' keyword: Invoking superclass constructors, accessing shadowed parent fields, calling overridden parent methods, and constructor chaining.",
      lessons: [
        {
          id: "super-keyword-mastery",
          title: "Complete Mastery of the 'super' Keyword",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "The Role of the 'super' Keyword (دور الكلمة المفتاحية super في جافا)"
            },
            {
              type: "paragraph",
              text: "In Java, 'super' is a reference keyword that directly refers to the immediate parent class (superclass) object. It plays three essential roles in class hierarchies: 1) Invoking the superclass constructor via 'super()' or 'super(args)' to initialize inherited state; 2) Invoking a superclass method that has been overridden in the child class via 'super.methodName()'; 3) Accessing superclass instance fields that have been shadowed by child class fields via 'super.fieldName'."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "الكلمة المفتاحية 'super' في جافا هي متغير مرجعي يشير مباشرة إلى كائن الفئة الأب المباشرة (Superclass). تلعب ثلاثة أدوار رئيسية لا غنى عنها: 1) استدعاء مشيد الفئة الأب عبر 'super()' أو 'super(args)' لتهيئة الخصائص الموروثة؛ 2) استدعاء دالة الأب التي تم تجاوزها في الفئة الابنة عبر 'super.methodName()'؛ 3) الوصول لحقول الأب التي تم حجبها بتعريف حقول بنفس الاسم في الابن عبر 'super.fieldName'."
            },
            {
              type: "paragraph",
              text: "Rule of Precedence: When invoking a parent constructor, 'super(...)' MUST be the very first line inside the subclass constructor. Like 'this', 'super' cannot be used in static methods."
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
              text: "Example 1: Implicit vs Explicit super() Constructor Call (المثال 1: استدعاء مشيد الأب الضمني والصريح)"
            },
            {
              type: "paragraph",
              text: "How the compiler automatically inserts super() when omitted."
            },
            {
              type: "code",
              language: "java",
              filename: "ImplicitSuperDemo.java",
              code: `public class ImplicitSuperDemo {
    static class Parent {
        Parent() {
            System.out.println("1. Parent no-arg constructor executed.");
        }
    }

    static class Child extends Parent {
        Child() {
            // super(); // Automatically inserted by Java compiler!
            System.out.println("2. Child constructor executed.");
        }
    }

    public static void main(String[] args) {
        Child c = new Child();
    }
}`,
              output: `1. Parent no-arg constructor executed.
2. Child constructor executed.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "If a subclass constructor does not explicitly call super(...) or this(...), the Java compiler automatically inserts an invisible 'super()' as its first statement."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "إذا لم يكتب المطور استدعاءً صريحاً لمشيد الأب، فإن مصرف جافا يدرج تلقائياً 'super()' غير مرئي كأول سطر في مشيد الابن."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Parameterized super(args) Constructor Invocation (المثال 2: تمرير المعاملات لمشيد الأب)"
            },
            {
              type: "paragraph",
              text: "Passing arguments up to initialize private or protected parent attributes."
            },
            {
              type: "code",
              language: "java",
              filename: "ParameterizedSuperDemo.java",
              code: `public class ParameterizedSuperDemo {
    static class Server {
        String hostname;
        int port;

        Server(String host, int port) {
            this.hostname = host;
            this.port = port;
            System.out.println("Base server allocated on " + host + ":" + port);
        }
    }

    static class WebServer extends Server {
        String protocol;

        WebServer(String host, int port, String protocol) {
            super(host, port); // Explicit parent constructor call (Must be 1st line!)
            this.protocol = protocol;
            System.out.println("WebServer configured with protocol: " + protocol);
        }
    }

    public static void main(String[] args) {
        WebServer ws = new WebServer("api.production.internal", 8443, "HTTPS");
    }
}`,
              output: `Base server allocated on api.production.internal:8443
WebServer configured with protocol: HTTPS`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "The subclass forwards host and port to 'super(host, port)', ensuring the parent fields are initialized before the subclass executes its own logic."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "يقوم مشيد الابن بتمرير العنوان والمنفذ للأب عبر 'super(host, port)'، مما يضمن تهيئة بيانات الأب بالكامل قبل بدء تهيئة بيانات الابن."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Accessing Shadowed Parent Variables (المثال 3: الوصول لمتغيرات الأب المحجوبة)"
            },
            {
              type: "paragraph",
              text: "Disambiguating between parent and child fields sharing the same name."
            },
            {
              type: "code",
              language: "java",
              filename: "ShadowedVariableDemo.java",
              code: `public class ShadowedVariableDemo {
    static class BaseNetwork {
        int timeoutSeconds = 30; // Parent timeout
    }

    static class FastNetwork extends BaseNetwork {
        int timeoutSeconds = 5; // Child shadows parent timeout

        void printTimeouts() {
            System.out.println("Child timeout:  " + this.timeoutSeconds + " seconds");
            System.out.println("Parent timeout: " + super.timeoutSeconds + " seconds");
        }
    }

    public static void main(String[] args) {
        FastNetwork net = new FastNetwork();
        net.printTimeouts();
    }
}`,
              output: `Child timeout:  5 seconds
Parent timeout: 30 seconds`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "Using 'this.timeoutSeconds' accesses the child variable; writing 'super.timeoutSeconds' explicitly reads the shadowed parent variable."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "استخدام 'this.timeoutSeconds' يجلب قيمة متغير الابن، بينما 'super.timeoutSeconds' يصل للمتغير المحجوب في فئة الأب."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Extending Overridden Methods via super.method() (المثال 4: تعزيز دالة الأب عبر super)"
            },
            {
              type: "paragraph",
              text: "Reusing and augmenting parent logic in an overridden method."
            },
            {
              type: "code",
              language: "java",
              filename: "SuperMethodAugmentDemo.java",
              code: `public class SuperMethodAugmentDemo {
    static class BasicAuth {
        void authenticate(String user) {
            System.out.println("Verifying username and password for " + user);
        }
    }

    static class TwoFactorAuth extends BasicAuth {
        @Override
        void authenticate(String user) {
            super.authenticate(user); // Step 1: Run standard credentials check
            System.out.println("Sending OTP 6-digit challenge code to " + user + "'s mobile device.");
        }
    }

    public static void main(String[] args) {
        TwoFactorAuth auth = new TwoFactorAuth();
        auth.authenticate("sarah_admin");
    }
}`,
              output: `Verifying username and password for sarah_admin
Sending OTP 6-digit challenge code to sarah_admin's mobile device.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "'super.authenticate(user)' executes the base verification first, allowing TwoFactorAuth to add two-factor challenge logic without rewriting base code."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "تستدعي 'super.authenticate(user)' كود الأب للتحقق من كلمة المرور أولاً، ثم تضيف الفئة الابنة خطوة التحقق الثنائي (OTP) بسلاسة."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Constructor Chaining Across Multiple Tiers (المثال 5: تسلسل المشيدات عبر 3 أجيال)"
            },
            {
              type: "paragraph",
              text: "Tracing how constructors execute upwards from bottom to top."
            },
            {
              type: "code",
              language: "java",
              filename: "ThreeTierSuperDemo.java",
              code: `public class ThreeTierSuperDemo {
    static class LivingEntity {
        LivingEntity(String kingdom) {
            System.out.println("[Tier 1 LivingEntity] Kingdom: " + kingdom);
        }
    }

    static class Mammal extends LivingEntity {
        Mammal(String kingdom, String classification) {
            super(kingdom);
            System.out.println("[Tier 2 Mammal] Classification: " + classification);
        }
    }

    static class Human extends Mammal {
        Human(String name) {
            super("Animalia", "Hominidae");
            System.out.println("[Tier 3 Human] Individual: " + name);
        }
    }

    public static void main(String[] args) {
        Human h = new Human("Omar");
    }
}`,
              output: `[Tier 1 LivingEntity] Kingdom: Animalia
[Tier 2 Mammal] Classification: Hominidae
[Tier 3 Human] Individual: Omar`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "Constructor calls ripple upwards to the root ancestor before executing their bodies. Hence, LivingEntity runs first, Mammal second, and Human last."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "تتسلسل استدعاءات المشيدات للأعلى وصولاً للجد الأكبر قبل تنفيذ الأجسام، لذلك يُنفذ مشيد LivingEntity أولاً ثم Mammal ثم Human."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Passing Computed Expressions to super(...) (المثال 6: تمرير تعبيرات محسوبة لمشيد الأب)"
            },
            {
              type: "paragraph",
              text: "Calculating dynamic values inline within the super(...) argument list."
            },
            {
              type: "code",
              language: "java",
              filename: "ComputedSuperDemo.java",
              code: `public class ComputedSuperDemo {
    static class Account {
        double balance;
        Account(double openingBalance) {
            this.balance = Math.max(0.0, openingBalance);
        }
    }

    static class PromotionalAccount extends Account {
        // Adds $50 welcome bonus into superclass constructor call!
        PromotionalAccount(double initialDeposit) {
            super(initialDeposit + 50.0);
        }
    }

    public static void main(String[] args) {
        PromotionalAccount promo = new PromotionalAccount(100.0);
        System.out.println("Opening balance with promo bonus: $" + promo.balance);
    }
}`,
              output: `Opening balance with promo bonus: $150.0`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "You can pass mathematical expressions or static helper results into super(...), as long as they do not reference uninitialized child instance fields."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "يمكن تمرير تعبيرات حسابية أو دوال ساكنة كمعاملات لـ super(...) لحساب القيم قبل تهيئة الفئة الأب."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Accessing Hidden Parent Methods in Deep Trees (المثال 7: استدعاء دالة الأب المباشر)"
            },
            {
              type: "paragraph",
              text: "How 'super' strictly refers to the immediate parent, not the grandparent."
            },
            {
              type: "code",
              language: "java",
              filename: "ImmediateParentSuperDemo.java",
              code: `public class ImmediateParentSuperDemo {
    static class Alpha {
        void ping() { System.out.println("Alpha ping"); }
    }

    static class Beta extends Alpha {
        @Override void ping() { System.out.println("Beta ping"); }
    }

    static class Gamma extends Beta {
        @Override
        void ping() {
            super.ping(); // Invokes Beta's ping (immediate parent)
            System.out.println("Gamma ping");
            // Note: super.super.ping() is strictly illegal in Java!
        }
    }

    public static void main(String[] args) {
        Gamma g = new Gamma();
        g.ping();
    }
}`,
              output: `Beta ping
Gamma ping`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "'super' always references the immediate parent class. In Java, syntax like 'super.super.method()' is strictly disallowed by language design."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "تشير 'super' دائماً إلى الفئة الأب المباشرة فقط، ولا تسمح لغة جافا بكتابة 'super.super' لتخطي الأب والوصول للجد."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Preserving Parent State During toString() Overrides (المثال 8: دمج تمثيل الأب في دالة toString)"
            },
            {
              type: "paragraph",
              text: "Calling super.toString() to include parent attributes in child text representations."
            },
            {
              type: "code",
              language: "java",
              filename: "SuperToStringDemo.java",
              code: `public class SuperToStringDemo {
    static class User {
        String id;
        String email;

        User(String id, String email) { this.id = id; this.email = email; }

        @Override
        public String toString() {
            return "User[id=" + id + ", email=" + email + "]";
        }
    }

    static class AdminUser extends User {
        String department;

        AdminUser(String id, String email, String dept) {
            super(id, email);
            this.department = dept;
        }

        @Override
        public String toString() {
            // Incorporates parent toString output!
            return super.toString() + " -> Admin[department=" + department + "]";
        }
    }

    public static void main(String[] args) {
        AdminUser admin = new AdminUser("ADM-01", "root@corp.internal", "Security Operations");
        System.out.println(admin);
    }
}`,
              output: `User[id=ADM-01, email=root@corp.internal] -> Admin[department=Security Operations]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "Calling 'super.toString()' incorporates parent formatting seamlessly without duplicating attribute printing logic."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "استدعاء 'super.toString()' يدمج مخرجات الفئة الأب تلقائياً مع مخرجات الفئة الابنة دون تكرار كود الطباعة."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Compiler Error When Parent Has No Default Constructor (المثال 9: خطأ غياب المشيد الافتراضي في الأب)"
            },
            {
              type: "paragraph",
              text: "Why custom constructors in the parent require explicit super(args) in the child."
            },
            {
              type: "code",
              language: "java",
              filename: "NoDefaultSuperDemo.java",
              code: `public class NoDefaultSuperDemo {
    static class BaseDevice {
        String serial;

        // Only a parameterized constructor exists; no default no-arg constructor!
        BaseDevice(String serial) {
            this.serial = serial;
        }
    }

    static class SmartPhone extends BaseDevice {
        // Child MUST explicitly call super(serial); omitting it causes a compile error!
        SmartPhone(String serial) {
            super(serial);
            System.out.println("SmartPhone registered with serial: " + this.serial);
        }
    }

    public static void main(String[] args) {
        SmartPhone phone = new SmartPhone("SN-IPHONE-992");
    }
}`,
              output: `SmartPhone registered with serial: SN-IPHONE-992`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "When the parent class defines only parameterized constructors, the default constructor disappears. The child class must explicitly call 'super(args)'."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "عندما تحتوي الفئة الأب على مشيد ذي معاملات فقط، يُحذف المشيد الافتراضي التلقائي، ويلتزم الصنف الابن باستدعاء 'super(args)' صراحة."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Prohibition of super in Static Context (المثال 10: حظر استخدام super في السياق الساكن)"
            },
            {
              type: "paragraph",
              text: "Demonstrating that 'super' cannot be referenced inside static methods."
            },
            {
              type: "code",
              language: "java",
              filename: "StaticSuperProhibition.java",
              code: `public class StaticSuperProhibition {
    static class SuperClass {
        static void staticGreet() { System.out.println("Hello from SuperClass static method."); }
        void instanceGreet() { System.out.println("Hello from SuperClass instance method."); }
    }

    static class SubClass extends SuperClass {
        static void testStatic() {
            // super.instanceGreet(); // COMPILER ERROR: non-static variable super cannot be referenced from a static context
            SuperClass.staticGreet(); // Correct way: use ClassName.methodName()
        }

        void testInstance() {
            super.instanceGreet(); // OK: inside instance context
        }
    }

    public static void main(String[] args) {
        SubClass.testStatic();
        new SubClass().testInstance();
    }
}`,
              output: `Hello from SuperClass static method.
Hello from SuperClass instance method.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "Like 'this', 'super' references an active object instance. It cannot be used inside static methods, which belong to the class blueprint."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "مثل الكلمة 'this'، تشير 'super' لكائن فعلي في الذاكرة، لذلك يُحظر استخدامها تماماً داخل الدوال الساكنة static."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Enterprise Cloud Resource Provisioning Pipeline (المثال 11: خط تهيئة الموارد السحابية متكامل عبر super)"
            },
            {
              type: "paragraph",
              text: "Advanced: Real-world infrastructure provisioning using super constructor chaining and lifecycle method hooks."
            },
            {
              type: "code",
              language: "java",
              filename: "CloudResourcePipeline.java",
              code: `public class CloudResourcePipeline {
    static class CloudResource {
        final String resourceId;
        final String region;
        double hourlyCost;

        CloudResource(String id, String region, double cost) {
            this.resourceId = id;
            this.region = region;
            this.hourlyCost = cost;
            System.out.println("[AUDIT] Provisioning CloudResource: " + id + " in " + region);
        }

        void deploy() {
            System.out.println("Step 1: Allocating network interfaces in " + region);
            System.out.println("Step 2: Attaching security groups for " + resourceId);
        }
    }

    static class VirtualMachine extends CloudResource {
        int vCpuCount;
        int ramGb;

        VirtualMachine(String id, String region, double cost, int vCpu, int ram) {
            super(id, region, cost); // Chained to parent constructor
            this.vCpuCount = vCpu;
            this.ramGb = ram;
        }

        @Override
        void deploy() {
            super.deploy(); // Execute standard cloud resource setup
            System.out.println("Step 3: Mounting virtual storage & bootstrapping Linux OS kernel");
            System.out.printf("VM Active: %s (%d vCPUs, %d GB RAM) @ $%.2f/hr%n", resourceId, vCpuCount, ramGb, hourlyCost);
        }
    }

    public static void main(String[] args) {
        VirtualMachine vm = new VirtualMachine("vm-app-prod-01", "us-east-1", 0.096, 4, 16);
        vm.deploy();
    }
}`,
              output: `[AUDIT] Provisioning CloudResource: vm-app-prod-01 in us-east-1
Step 1: Allocating network interfaces in us-east-1
Step 2: Attaching security groups for vm-app-prod-01
Step 3: Mounting virtual storage & bootstrapping Linux OS kernel
VM Active: vm-app-prod-01 (4 vCPUs, 16 GB RAM) @ $0.10/hr`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "The VirtualMachine subclass delegates fundamental cloud provisioning to 'super(id, region, cost)' and executes the base deployment stages via 'super.deploy()' before mounting VM-specific resources."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "تفوض فئة VirtualMachine مهام إنشاء المورد الأساسي للأب عبر super(...) وتنفذ مراحل التثبيت الأساسية بـ super.deploy() قبل تشغيل إعدادات الخادم الافتراضي."
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
                "Mistake 1: Placing super(...) anywhere other than the very first statement in a constructor. The Java compiler strictly enforces this ordering.",
                "خطأ 1: وضع استدعاء super(...) في مكان آخر غير السطر الأول من المشيد، وهو ما يرفضه مصرف جافا تماماً.",
                "Mistake 2: Attempting to use 'super.super.method()'. Java does not allow bypassing the immediate parent to access the grandparent class.",
                "خطأ 2: محاولة كتابة 'super.super' لتخطي الأب المباشر والوصول للجد، وهو أسلوب محظور ومرفوض برمجياً في جافا.",
                "Mistake 3: Calling both 'this(...)' and 'super(...)' in the same constructor. A constructor can only call one or the other as its first line."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Vehicle Fleet Telemetry Tracker (التحدي العملي: متتبع بيانات أسطول المركبات)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Create a telemetry system: 1) Base class 'Vehicle' with fields 'vin' (String), 'baseSpeed' (int), a parameterized constructor, and a method 'printTelemetry()' displaying VIN and speed; 2) Subclass 'ElectricTruck' extending Vehicle with 'batteryPercent' (int), invoking 'super(vin, speed)', and overriding 'printTelemetry()' to call 'super.printTelemetry()' followed by the battery status; 3) Test in main()."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: قم بإنشاء نظام تتبع: 1) فئة أساسية Vehicle تحتوي على رقم الشاسيه vin والسرعة، ومشيد بمعاملات، ودالة printTelemetry لطباعة البيانات؛ 2) فئة فرعية ElectricTruck ترث منها وتضيف نسبة البطارية، وتستدعي مشيد الأب عبر super(...)، وتتجاوز printTelemetry باستدعاء دالة الأب أولاً عبر super.printTelemetry() ثم طباعة البطارية؛ 3) اختبر النظام في main."
            },
            {
              type: "code",
              language: "java",
              filename: "TelemetryChallenge.java",
              code: `public class TelemetryChallenge {
    static class Vehicle {
        String vin;
        int baseSpeed;

        Vehicle(String vin, int speed) {
            this.vin = vin;
            this.baseSpeed = speed;
        }

        void printTelemetry() {
            System.out.print("[TELEMETRY] VIN: " + vin + " | Speed: " + baseSpeed + " km/h");
        }
    }

    static class ElectricTruck extends Vehicle {
        int batteryPercent;

        ElectricTruck(String vin, int speed, int battery) {
            super(vin, speed); // Initializes parent fields
            this.batteryPercent = battery;
        }

        @Override
        void printTelemetry() {
            super.printTelemetry(); // Runs parent print logic
            System.out.println(" | Battery: " + batteryPercent + "%");
        }
    }

    public static void main(String[] args) {
        ElectricTruck truck = new ElectricTruck("1HGCR2F83HA001928", 95, 82);
        truck.printTelemetry();
    }
}`,
              output: `[TELEMETRY] VIN: 1HGCR2F83HA001928 | Speed: 95 km/h | Battery: 82%`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "The subclass uses 'super(vin, speed)' to initialize parent attributes cleanly, and 'super.printTelemetry()' to reuse base display logic before appending battery telemetry."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "استخدمت الفئة الابنة super(...) لتهيئة بيانات الأب، ثم استدعت super.printTelemetry() لإعادة استخدام كود الطباعة الأساسي قبل إلحاق بيانات البطارية."
            }
          ],
          quiz: [
          {
                    "id": "q1",
                    "question": "Where must the 'super(...)' constructor invocation be placed inside a subclass constructor body?\n(أين يجب أن يقع استدعاء super لمشيد الأب داخل مشيد الفئة الابنة؟)",
                    "options": [
                              "Anywhere inside the constructor before the return statement.",
                              "It must strictly be the very first statement in the constructor body.",
                              "As the final statement after initializing all child fields.",
                              "Inside a static initializer block."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! In Java, 'super(...)' must strictly be the very first executable statement in a subclass constructor. Placing any statement before it causes a compile-time error. (يجب أن يكون استدعاء super لمشيد الأب السطر الأول حصراً داخل مشيد الابن، ووضعه في أي مكان آخر يسبب خطأ تصريف)."
          },
          {
                    "id": "q2",
                    "question": "Can a constructor in Java contain both a 'this(...)' call and a 'super(...)' call simultaneously?\n(هل يمكن للمشيد أن يحتوي على استدعاء this واستدعاء super معاً؟)",
                    "options": [
                              "Yes, as long as super() is placed before this().",
                              "No; both this(...) and super(...) are mandated to be the first statement, making them mutually exclusive in a single constructor.",
                              "Yes, in classes implementing interfaces.",
                              "Only if one of them is marked private."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Because both 'this(...)' and 'super(...)' must be the first statement of a constructor body, they cannot both appear in the same constructor. (كلاهما يشترط أن يكون السطر الأول، لذا يستحيل اجتماعهما في مشيد واحد)."
          },
          {
                    "id": "q3",
                    "question": "What does the Java compiler do automatically if a subclass constructor does NOT explicitly call either 'super(...)' or 'this(...)'?",
                    "options": [
                              "It generates a compile-time error stating missing constructor call.",
                              "It automatically inserts an implicit no-argument 'super()' call as the first statement.",
                              "It skips superclass initialization entirely.",
                              "It calls the superclass finalize() method."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! If neither this(...) nor super(...) is explicitly written, the Java compiler automatically inserts an implicit call to the superclass's no-argument constructor: 'super();'. (يدرج المترجم تلقائياً استدعاء ضمنياً لمشيد الأب الافتراضي super() عديم المعاملات في أول المشيد)."
          },
          {
                    "id": "q4",
                    "question": "Examine this code:\n\nclass Device {\n    Device(String serialNumber) {\n        System.out.println(\"Device: \" + serialNumber);\n    }\n}\nclass Router extends Device {\n    Router() {\n        System.out.println(\"Router online\");\n    }\n}\n\nWhat happens when compiling this code?",
                    "options": [
                              "It compiles and runs, printing 'Router online'.",
                              "Compile-time error in Router(): constructor Device in class Device cannot be applied to given types; required: String, found: no arguments.",
                              "It throws an InstantiationException at runtime.",
                              "It compiles because Device automatically receives a default no-argument constructor."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Because Device explicitly declared a parameterized constructor, the compiler does NOT provide a default no-argument Device() constructor. Router's constructor attempts to invoke implicit 'super()', which does not exist, causing a compile-time error. (بما أن الفئة Device عرفت مشيداً بمعامل، لا يولد المترجم مشيداً افتراضياً، ومحاولة Router استدعاء super() الضمني تفشل برمجياً)."
          },
          {
                    "id": "q5",
                    "question": "Predict the output of the following code involving field shadowing and the 'super' keyword:\n\nclass NetworkNode {\n    int bandwidth = 100;\n}\nclass GatewayNode extends NetworkNode {\n    int bandwidth = 1000;\n    void display() {\n        System.out.print(this.bandwidth + \"-\" + super.bandwidth);\n    }\n}\npublic class NodeTest {\n    public static void main(String[] args) {\n        new GatewayNode().display();\n    }\n}",
                    "options": [
                              "1000-1000",
                              "100-100",
                              "1000-100",
                              "100-1000"
                    ],
                    "correctIndex": 2,
                    "explanation": "Correct! 'this.bandwidth' accesses the shadowed field defined in GatewayNode (1000), while 'super.bandwidth' accesses the superclass field in NetworkNode (100). The output is '1000-100'. (الكلمة this تصل للمتغير المحجوب في الابن 1000 بينما super تصل لمتغير الأب 100 فيكون الناتج 1000-100)."
          },
          {
                    "id": "q6",
                    "question": "Predict the output of running this constructor chain program:\n\nclass Tier1 {\n    Tier1() { System.out.print(\"1\"); }\n}\nclass Tier2 extends Tier1 {\n    Tier2() { System.out.print(\"2\"); }\n    Tier2(String tag) { this(); System.out.print(tag); }\n}\nclass Tier3 extends Tier2 {\n    Tier3() { super(\"X\"); System.out.print(\"3\"); }\n}\npublic class ChainTest {\n    public static void main(String[] args) {\n        new Tier3();\n    }\n}",
                    "options": [
                              "12X3",
                              "3X21",
                              "1X23",
                              "2X13"
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! Tracing the chain: Tier3 calls super('X') -> Tier2(String) calls this() -> Tier2() calls implicit super() -> Tier1() runs ('1'), then Tier2() finishes ('2'), then Tier2(String) finishes ('X'), then Tier3 finishes ('3'). Output: '12X3'. (سلسلة المشيدات: Tier3 يستدعي مشيد Tier2(tag) الذي يستدعي مشيد Tier2() الذي يستدعي Tier1() فتطبع 1 ثم 2 ثم X ثم 3)."
          },
          {
                    "id": "q7",
                    "question": "Why would a subclass method call 'super.methodName()' inside its overridden version of that method?",
                    "options": [
                              "To delete the superclass method from memory.",
                              "To reuse and augment the superclass implementation rather than completely replacing it.",
                              "To force the method to execute on a separate background thread.",
                              "To convert the method into a private static method."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Calling 'super.methodName()' allows the subclass to execute the base implementation first (preserving core business logic or auditing) and then append specialized subclass functionality. (استدعاء دالة الأب عبر super يتيح إعادة استخدام منطق الأب الأساسي وتعزيزه بسلوك إضافي بدلاً من استبداله بالكامل)."
          },
          {
                    "id": "q8",
                    "question": "What occurs if you attempt to use 'super' inside a static method, such as:\n\nclass SuperService {\n    void serve() {}\n}\nclass SubService extends SuperService {\n    public static void main(String[] args) {\n        super.serve(); // line 6\n    }\n}",
                    "options": [
                              "It executes serve() on the superclass prototype.",
                              "Compile-time error: non-static variable super cannot be referenced from a static context.",
                              "It compiles, but throws a NullPointerException at runtime.",
                              "It works only if serve() is also declared static."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! 'super' (just like 'this') refers to an instance of a class. Because static methods belong to the class rather than any specific instance, 'super' cannot be referenced in a static context. (الكلمتان super و this تشيران إلى كائنات حية، ولا يمكن استخدامهما إطلاقاً في سياق ساكن static)."
          },
          {
                    "id": "q9",
                    "question": "Can a grandchild class invoke a method from its grandparent class using 'super.super.methodName()' in Java?\n(هل يمكن لفئة الحفيد استدعاء دالة الجد عبر super.super؟)",
                    "options": [
                              "Yes, as long as the grandparent method is public.",
                              "No, 'super.super' is invalid syntax in Java; a class can only directly access its immediate superclass to uphold encapsulation.",
                              "Yes, if using Java 17 or higher.",
                              "Yes, if the immediate parent class is abstract."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Java explicitly forbids 'super.super' syntax. A subclass can only communicate with its immediate superclass, preserving OOP encapsulation and preventing subclasses from bypassing intermediate parent logic. (جافا تحظر كتابة super.super حفاظاً على مبدأ التغليف، ولا يمكن التواصل إلا مع الأب المباشر)."
          },
          {
                    "id": "q10",
                    "question": "Is it valid to pass complex computed expressions or static method calls to 'super(...)', as in:\n\nclass BoundedBox extends Box {\n    BoundedBox(int w, int h) {\n        super(Math.max(w, 10), Math.max(h, 10));\n    }\n}",
                    "options": [
                              "Yes, any valid expression or static helper call can be evaluated inside the super(...) argument list.",
                              "No, super(...) can only accept simple raw literals or parameters directly.",
                              "No, Math.max cannot be called before super() finishes.",
                              "Only in Java 21 preview features."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! Java permits expressions and static method invocations inside the argument list of super(...), provided they do not reference instance members of the uninitialized child object. (يُسمح بتمرير تعبيرات حسابية ودوال ساكنة مساعدة كمعاملات لـ super طالما أنها لا تشير لحقول الابن غير المهيأة)."
          },
          {
                    "id": "q11",
                    "question": "Consider this toString() implementation in a subclass:\n\nclass User {\n    String id;\n    User(String id) { this.id = id; }\n    public String toString() { return \"User[id=\" + id + \"]\"; }\n}\nclass AdminUser extends User {\n    String role;\n    AdminUser(String id, String role) { super(id); this.role = role; }\n    public String toString() {\n        return super.toString() + \" with role: \" + role;\n    }\n}\n\nWhat is the output of 'System.out.println(new AdminUser(\"A1\", \"SUPERADMIN\"));'?",
                    "options": [
                              "User[id=A1] with role: SUPERADMIN",
                              "AdminUser with role: SUPERADMIN",
                              "User[id=null] with role: SUPERADMIN",
                              "StackOverflowError"
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! 'super.toString()' invokes User's toString(), returning 'User[id=A1]'. AdminUser appends ' with role: SUPERADMIN', giving 'User[id=A1] with role: SUPERADMIN'. (استدعاء super.toString يعيد تمثيل الأب النصي، ثم يضيف الابن دوره المخصص)."
          },
          {
                    "id": "q12",
                    "question": "What serious runtime defect occurs in this code:\n\nclass Widget {\n    void draw() { System.out.println(\"Widget draw\"); }\n}\nclass FancyWidget extends Widget {\n    @Override\n    void draw() {\n        draw(); // intended super.draw() but omitted super.\n    }\n}\npublic class BugDemo {\n    public static void main(String[] args) {\n        new FancyWidget().draw();\n    }\n}",
                    "options": [
                              "It prints 'Widget draw' correctly.",
                              "It causes an infinite recursive loop resulting in a java.lang.StackOverflowError at runtime.",
                              "Compile-time error: recursive call detected.",
                              "It throws a NullPointerException."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Omitting 'super.' causes FancyWidget's draw() to invoke itself repeatedly in an infinite recursive loop, rapidly exhausting the call stack and throwing a java.lang.StackOverflowError. (نسيان كلمة super يجعل الدالة تستدعي نفسها باستمرار مما يسبب امتلاء المكدس وحدوث StackOverflowError)."
          },
          {
                    "id": "q13",
                    "question": "Does calling 'super.methodName()' bypass dynamic method dispatch of the current subclass?",
                    "options": [
                              "No, it still resolves polymorphically to the subclass.",
                              "Yes, 'super.methodName()' instructs the JVM to explicitly invoke the method implementation defined in the superclass, bypassing subclass overrides.",
                              "It only bypasses dispatch if the method is abstract.",
                              "It bypasses dispatch only when run inside a synchronized block."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! 'super.methodName()' instructs the JVM bytecode (via 'invokespecial') to target the superclass implementation directly, bypassing the dynamic dispatch table of the current subclass. (الكلمة super توجه استدعاء الدالة مباشرة لتنفيذ الفئة الأب متجاوزة جدول التوجيه الديناميكي للابن لمنع الدوران العكسي)."
          },
          {
                    "id": "q14",
                    "question": "Can 'super' be used to access private fields or private methods of a superclass?\n(هل يمكن استخدام super للوصول إلى الحقول أو الدوال الخاصة في الأب؟)",
                    "options": [
                              "Yes, 'super' grants unrestricted access to all private members.",
                              "No; 'super' strictly honors standard access modifier rules, so private superclass members remain inaccessible.",
                              "Yes, if the subclass is in the same file.",
                              "Only when compiled with the --enable-preview flag."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! The 'super' keyword does not bypass Java's encapsulation rules. Private members of the superclass remain completely inaccessible to subclasses even when using 'super'. (الكلمة super لا تكسر قواعد الخصوصية؛ الحقول الخاصة في الأب تظل محجوبة تماماً حتى مع استخدام super)."
          },
          {
                    "id": "q15",
                    "question": "In an enterprise Cloud Provisioning pipeline:\n\nclass CloudResource {\n    private final String resourceId;\n    CloudResource(String id) { this.resourceId = id; }\n    String getId() { return resourceId; }\n}\nclass VmInstance extends CloudResource {\n    int ramGb;\n    VmInstance(String id, int ramGb) {\n        super(id);\n        this.ramGb = ramGb;\n    }\n}\n\nWhy is 'super(id)' strictly necessary in VmInstance's constructor?",
                    "options": [
                              "Because CloudResource has no default no-argument constructor, so VmInstance must explicitly invoke the parameterized super(id).",
                              "Because VmInstance cannot compile without ramGb being passed to CloudResource.",
                              "Because resourceId is static.",
                              "To register the VM with the operating system."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! Because CloudResource only provides a parameterized constructor 'CloudResource(String)', VmInstance is required to explicitly call 'super(id)' to initialize the superclass's private final field. (لأن فئة الأب تملك مشيداً بمعامل فقط ولا تملك مشيداً افتراضياً، يجب استدعاء super(id) صراحة لتهيئة المعرف الخاص)."
          }
        ]
      }
    ]
  }
];
})();
