/**
 * Java Curriculum Module - Part 7
 * Topics:
 * 13. Java Inner Classes
 * 14. Java Abstraction
 * 
 * 100% Offline, Pure JavaScript. Complete educational content with full bilingual (English & Arabic) explanations.
 */

(function () {
  'use strict';

  window.JAVA_TOPICS_PART7 = [
    /* ==========================================================================
       TOPIC 13: Java Inner Classes
       ========================================================================== */
    {
      id: "java-inner-classes",
      title: "13. Java Inner Classes",
      description: "Mastering Java Inner & Nested Classes: Non-static member inner classes, static nested classes, method-local inner classes, Outer.this references, and encapsulation patterns.",
      lessons: [
        {
          id: "inner-classes-mastery",
          title: "Complete Guide to Java Inner Classes",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "Understanding Java Inner Classes (فهم الفئات الداخلية في جافا)"
            },
            {
              type: "paragraph",
              text: "In Java, an inner class (or nested class) is a class defined within the scope of another enclosing class. Java categorizes nested classes into two main branches: 1) Static Nested Classes (declared with the 'static' modifier); 2) Non-Static Nested Classes (often referred to strictly as Inner Classes), which include Member Inner Classes, Method-Local Inner Classes, and Anonymous Inner Classes."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "الفئة الداخلية (Inner Class أو Nested Class) في جافا هي فئة يتم تعريفها داخل نطاق فئة حاضنة أخرى. تنقسم الفئات المتداخلة إلى قسمين رئيسيين: 1) الفئات المتداخلة الساكنة (Static Nested Classes)؛ 2) الفئات الداخلية غير الساكنة، وتشمل فئات الأعضاء (Member Inner Classes)، والفئات داخل الدوال (Method-Local Inner Classes)، والفئات المجهولة (Anonymous Inner Classes)."
            },
            {
              type: "paragraph",
              text: "Key Architectural Advantage: An inner class possesses special access privileges; it can access all members (including private fields and methods) of the outer class directly."
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
              text: "Example 1: Basic Non-Static Member Inner Class (المثال 1: الفئة الداخلية الأساسية المرتبطة بالنسخة)"
            },
            {
              type: "paragraph",
              text: "Instantiating an inner class using the syntax: outerInstance.new InnerClass()."
            },
            {
              type: "code",
              language: "java",
              filename: "BasicInnerClassDemo.java",
              code: `public class BasicInnerClassDemo {
    static class CPU {
        double clockSpeed = 3.8;

        // Non-static inner class
        class ProcessorCore {
            int coreId;
            ProcessorCore(int id) { this.coreId = id; }

            void runCycle() {
                System.out.println("Core #" + coreId + " executing clock cycle @ " + clockSpeed + " GHz");
            }
        }
    }

    public static void main(String[] args) {
        CPU cpu = new CPU();
        // Syntax: outerInstance.new InnerClass()
        CPU.ProcessorCore core0 = cpu.new ProcessorCore(0);
        CPU.ProcessorCore core1 = cpu.new ProcessorCore(1);

        core0.runCycle();
        core1.runCycle();
    }
}`,
              output: `Core #0 executing clock cycle @ 3.8 GHz
Core #1 executing clock cycle @ 3.8 GHz`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "A non-static inner class is tethered to an active instance of the outer class. You create it via 'outer.new Inner()'."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "ترتبط الفئة الداخلية غير الساكنة بكائن نشط من الفئة الخارجية، ويتم إنشاؤها عبر الصيغة: outer.new Inner()."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Direct Access to Private Outer Members (المثال 2: الوصول المباشر للحقول الخاصة بالفئة الخارجية)"
            },
            {
              type: "paragraph",
              text: "Demonstrating how inner classes bypass private access restrictions of the enclosing class."
            },
            {
              type: "code",
              language: "java",
              filename: "PrivateAccessDemo.java",
              code: `public class PrivateAccessDemo {
    static class BankVault {
        private String secretKey = "AES_MASTER_9812";

        class KeyAuditor {
            void inspect() {
                // Directly accesses private outer field without getters!
                System.out.println("Auditor verified secret key: " + secretKey);
            }
        }
    }

    public static void main(String[] args) {
        BankVault vault = new BankVault();
        BankVault.KeyAuditor auditor = vault.new KeyAuditor();
        auditor.inspect();
    }
}`,
              output: `Auditor verified secret key: AES_MASTER_9812`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "Inner classes enjoy privileged access to the outer class's private members, which is ideal for building tightly coupled helper components."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "تتمتع الفئات الداخلية بصلاحية فريدة للوصول لحقول ودوال الفئة الخارجية الخاصة (private) مباشرة، وهو نمط ممتاز لبناء فئات مساعدة شديدة الترابط."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Static Nested Class (المثال 3: الفئة المتداخلة الساكنة Static Nested Class)"
            },
            {
              type: "paragraph",
              text: "Instantiating a nested class without requiring an outer instance."
            },
            {
              type: "code",
              language: "java",
              filename: "StaticNestedDemo.java",
              code: `public class StaticNestedDemo {
    static class OuterServer {
        static String serverRegion = "us-west-2";
        String serverName = "Gateway-01"; // Instance field

        // Static Nested Class: Does NOT hold reference to Outer instance
        static class NetworkConfig {
            int port;
            NetworkConfig(int p) { this.port = p; }

            void showConfig() {
                System.out.println("Configuring port " + port + " in region " + serverRegion);
                // System.out.println(serverName); // COMPILER ERROR: Cannot access non-static field!
            }
        }
    }

    public static void main(String[] args) {
        // No OuterServer object needed!
        OuterServer.NetworkConfig config = new OuterServer.NetworkConfig(8080);
        config.showConfig();
    }
}`,
              output: `Configuring port 8080 in region us-west-2`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "Static nested classes behave like regular top-level classes packaged inside an outer class namespace. They do not hold an implicit reference to an outer instance."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "تتصرف الفئات المتداخلة الساكنة كفئات عادية تماماً ولكنها موضوعة داخل مساحة تسمية الفئة الخارجية، ولا تحتاج لإنشاء كائن خارجي."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Disambiguating with OuterClass.this (المثال 4: فك تشابه المراجع بـ OuterClass.this)"
            },
            {
              type: "paragraph",
              text: "Accessing shadowed outer members using the qualified 'Outer.this' syntax."
            },
            {
              type: "code",
              language: "java",
              filename: "QualifiedOuterThisDemo.java",
              code: `public class QualifiedOuterThisDemo {
    static class Warehouse {
        int capacity = 10000;

        class StorageBay {
            int capacity = 250; // Shadows Warehouse capacity

            void printCapacities() {
                System.out.println("Inner Bay Capacity:   " + this.capacity);
                System.out.println("Outer Total Capacity: " + Warehouse.this.capacity);
            }
        }
    }

    public static void main(String[] args) {
        Warehouse w = new Warehouse();
        Warehouse.StorageBay bay = w.new StorageBay();
        bay.printCapacities();
    }
}`,
              output: `Inner Bay Capacity:   250
Outer Total Capacity: 10000`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "When an inner class declares a variable that shadows an outer class variable, 'OuterClass.this.variable' references the outer instance."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "عند حجب متغيرات الفئة الخارجية بمتغيرات داخلية بنفس الاسم، تُستخدم الصيغة 'OuterClass.this.var' للوصول لمتغير الفئة الخارجية."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Method-Local Inner Class (المثال 5: الفئة الداخلية المعرفة داخل دالة)"
            },
            {
              type: "paragraph",
              text: "Defining a localized class entirely inside a method's execution scope."
            },
            {
              type: "code",
              language: "java",
              filename: "MethodLocalClassDemo.java",
              code: `public class MethodLocalClassDemo {
    static class PaymentService {
        void processPayment(String rawAmount) {
            // Method-Local Inner Class: Visible ONLY inside this method
            class CurrencyFormatter {
                double parse() {
                    return Double.parseDouble(rawAmount.replace("$", "").trim());
                }
                void printReceipt(double val) {
                    System.out.printf("Processed transaction: $%.2f%n", val);
                }
            }

            CurrencyFormatter formatter = new CurrencyFormatter();
            double parsedVal = formatter.parse();
            formatter.printReceipt(parsedVal);
        }
    }

    public static void main(String[] args) {
        PaymentService ps = new PaymentService();
        ps.processPayment("  $499.95 ");
    }
}`,
              output: `Processed transaction: $499.95`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "Method-local inner classes are completely hidden from the rest of the class, encapsulating transient helper logic right where it is needed."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "الفئة الداخلية داخل دالة تكون مخفية تماماً عن باقي أجزاء البرنامج، وتُستخدم لتنظيم ومعالجة منطق فرعي مؤقت داخل تلك الدالة فقط."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Accessing Effectively Final Local Variables (المثال 6: الوصول للمتغيرات المحلية الثابتة عملياً)"
            },
            {
              type: "paragraph",
              text: "Rules governing how method-local inner classes capture local variables."
            },
            {
              type: "code",
              language: "java",
              filename: "EffectivelyFinalDemo.java",
              code: `public class EffectivelyFinalDemo {
    static void generateGreeting(String prefix) {
        // 'prefix' is effectively final (never reassigned)
        int year = 2026; // Effectively final

        class Greeter {
            void greet(String name) {
                // Can access prefix and year because their values never change
                System.out.println(prefix + " " + name + "! [System Year: " + year + "]");
            }
        }

        Greeter g = new Greeter();
        g.greet("Dr. Layla");
    }

    public static void main(String[] args) {
        generateGreeting("Welcome back,");
    }
}`,
              output: `Welcome back, Dr. Layla! [System Year: 2026]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "Method-local classes can read local variables only if they are final or effectively final (their value is assigned once and never mutated)."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "تستطيع الفئة الداخلية داخل الدالة قراءة المتغيرات المحلية بشرط أن تكون ثابتة فعلياً (Effectively Final) ولم يتم تغيير قيمتها بعد الإسناد."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Private Inner Class for Data Structure Encapsulation (المثال 7: فئة داخلية خاصة لهياكل البيانات)"
            },
            {
              type: "paragraph",
              text: "Hiding internal node representations inside a data structure."
            },
            {
              type: "code",
              language: "java",
              filename: "PrivateNodeDemo.java",
              code: `public class PrivateNodeDemo {
    static class SimpleStack {
        // Private inner class: completely invisible to outside callers
        private static class Node {
            int value;
            Node next;
            Node(int val, Node n) { this.value = val; this.next = n; }
        }

        private Node head = null;

        public void push(int val) {
            head = new Node(val, head);
        }

        public int pop() {
            if (head == null) throw new IllegalStateException("Stack empty");
            int val = head.value;
            head = head.next;
            return val;
        }
    }

    public static void main(String[] args) {
        SimpleStack stack = new SimpleStack();
        stack.push(10);
        stack.push(20);
        stack.push(30);

        System.out.println("Popped: " + stack.pop());
        System.out.println("Popped: " + stack.pop());
    }
}`,
              output: `Popped: 30
Popped: 20`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "Declaring 'Node' as a private inner class prevents external code from accessing or tampering with the internal linked structure of the stack."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "تعريف الفئة Node كفئة داخلية خاصة (private) يمنع الأكواد الخارجية من العبث بالبنية الداخلية للمكدس (Stack)، محققاً كبسلة مثالية."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Static Nested Builder Pattern (المثال 8: نمط البناء عبر الفئة المتداخلة الساكنة)"
            },
            {
              type: "paragraph",
              text: "Using a static nested class to construct complex immutable objects."
            },
            {
              type: "code",
              language: "java",
              filename: "StaticNestedBuilderDemo.java",
              code: `public class StaticNestedBuilderDemo {
    static class DatabaseConfig {
        private final String host;
        private final int port;
        private final boolean ssl;

        private DatabaseConfig(Builder b) {
            this.host = b.host;
            this.port = b.port;
            this.ssl = b.ssl;
        }

        // Static Nested Builder
        public static class Builder {
            private String host = "localhost";
            private int port = 5432;
            private boolean ssl = true;

            public Builder setHost(String h) { this.host = h; return this; }
            public Builder setPort(int p) { this.port = p; return this; }
            public Builder setSsl(boolean s) { this.ssl = s; return this; }

            public DatabaseConfig build() {
                return new DatabaseConfig(this);
            }
        }

        void print() {
            System.out.println("DB Config: " + host + ":" + port + " [SSL=" + ssl + "]");
        }
    }

    public static void main(String[] args) {
        DatabaseConfig cfg = new DatabaseConfig.Builder()
            .setHost("prod-db.cloud.internal")
            .setPort(5432)
            .setSsl(true)
            .build();

        cfg.print();
    }
}`,
              output: `DB Config: prod-db.cloud.internal:5432 [SSL=true]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "The Static Nested Builder pattern allows constructing complex immutable objects with clean, fluent syntax while keeping constructors private."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "يُعد نمط البناء عبر الفئة المتداخلة الساكنة (Static Nested Builder) معياراً في جافا لبناء كائنات ثابتة ومعقدة بسلاسة وأمان."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Multiple Interacting Inner Classes (المثال 9: فئات داخلية متعددة تتفاعل معاً)"
            },
            {
              type: "paragraph",
              text: "An outer class containing multiple specialized inner sub-components."
            },
            {
              type: "code",
              language: "java",
              filename: "MultipleInnerClassesDemo.java",
              code: `public class MultipleInnerClassesDemo {
    static class Car {
        private String brand = "Falcon Sport";

        class Engine {
            void rev() { System.out.println(brand + "'s V8 Engine revs up!"); }
        }

        class Transmission {
            void shiftGear(int gear) { System.out.println(brand + " shifts to Gear " + gear); }
        }
    }

    public static void main(String[] args) {
        Car car = new Car();
        Car.Engine engine = car.new Engine();
        Car.Transmission transmission = car.new Transmission();

        engine.rev();
        transmission.shiftGear(4);
    }
}`,
              output: `Falcon Sport's V8 Engine revs up!
Falcon Sport shifts to Gear 4`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "Both Engine and Transmission inner classes share access to the same enclosing Car instance's private attributes."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "تشترك الفئات الداخلية (المحرك وناقل الحركة) في الوصول لخصائص نفس كائن السيارة الخارجي الحاضن لهما."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Anonymous Inner Class in Action (المثال 10: الفئة الداخلية المجهولة في التطبيق العملي)"
            },
            {
              type: "paragraph",
              text: "Creating an inline one-time implementation of an interface or class on the fly."
            },
            {
              type: "code",
              language: "java",
              filename: "AnonymousInnerPreview.java",
              code: `public class AnonymousInnerPreview {
    interface ClickHandler {
        void onClick(String event);
    }

    public static void main(String[] args) {
        // Anonymous inner class instantiated on-the-fly
        ClickHandler handler = new ClickHandler() {
            @Override
            public void onClick(String event) {
                System.out.println("Anonymous inner class received button event: " + event);
            }
        };

        handler.onClick("PRIMARY_SUBMIT_BUTTON");
    }
}`,
              output: `Anonymous inner class received button event: PRIMARY_SUBMIT_BUTTON`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "An anonymous inner class declares and instantiates a class simultaneously without giving it a formal name, perfect for one-off callbacks."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "الفئة المجهولة (Anonymous Class) تُعرف وتُنشأ في سطر واحد دون إعطائها اسماً، وهي مثالية لمعالجات الأحداث (Event Handlers) السريعة."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Enterprise Custom Collection with Inner Iterator (المثال 11: بنية بيانات مخصصة مع مكرر داخلي Iterator)"
            },
            {
              type: "paragraph",
              text: "Advanced: Building a custom collection where the traversal Iterator is implemented as a private inner class."
            },
            {
              type: "code",
              language: "java",
              filename: "CustomCollectionIteratorDemo.java",
              code: `public class CustomCollectionIteratorDemo {
    static class TaskContainer {
        private String[] tasks = new String[10];
        private int count = 0;

        public void addTask(String task) {
            if (count < tasks.length) tasks[count++] = task;
        }

        // Inner Iterator class with direct access to private tasks array
        public class TaskIterator {
            private int currentIndex = 0;

            public boolean hasNext() {
                return currentIndex < count;
            }

            public String next() {
                return tasks[currentIndex++];
            }
        }

        public TaskIterator iterator() {
            return new TaskIterator();
        }
    }

    public static void main(String[] args) {
        TaskContainer container = new TaskContainer();
        container.addTask("Compile Java bytecode");
        container.addTask("Run unit tests");
        container.addTask("Deploy Docker container");

        TaskContainer.TaskIterator it = container.iterator();
        System.out.println("Iterating through tasks via inner class:");
        while (it.hasNext()) {
            System.out.println(" - " + it.next());
        }
    }
}`,
              output: `Iterating through tasks via inner class:
 - Compile Java bytecode
 - Run unit tests
 - Deploy Docker container`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "The TaskIterator inner class accesses the private array and count of TaskContainer, encapsulating iterator state cleanly per traversal session."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "تصل الفئة الداخلية TaskIterator للمصفوفة الخاصة للفئة الحاضنة مباشرة، مما يتيح تتبع موقع القراءة المستقل لكل عملية تكرار."
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
                "Mistake 1: Trying to instantiate a non-static inner class via 'new Outer.Inner()'. You must use 'outerInstance.new Inner()' because it requires an outer instance.",
                "خطأ 1: محاولة إنشاء فئة داخلية غير ساكنة عبر 'new Outer.Inner()'. يجب استخدام 'outerInstance.new Inner()' لأنها تتطلب وجود كائن خارجي.",
                "Mistake 2: Forgetting that non-static inner classes retain an implicit reference to the outer class object, which can prevent garbage collection of large outer objects if the inner object outlives it (memory leak).",
                "خطأ 2: نسيان أن الفئات الداخلية غير الساكنة تحتفظ بمرجع ضمني لكائن الفئة الخارجية، مما قد يسبب تسرباً في الذاكرة (Memory Leak) إن لم يُنتبه له.",
                "Mistake 3: Trying to access non-static outer members from a static nested class. Static nested classes have no outer 'this' pointer."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: E-Commerce Shopping Cart & Inner Item (التحدي العملي: سلة التسوق والعناصر الداخلية)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Create a class 'ShoppingCart': 1) Attribute 'customerName' (String); 2) Non-static inner class 'CartItem' with fields 'itemName' (String), 'price' (double), and 'quantity' (int), and method 'printItemDetails()' that prints the item details along with the outer cart's customerName; 3) Test in main() by creating a cart and instantiating two CartItem objects using outer.new CartItem(...)."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: قم بإنشاء صنف ShoppingCart: 1) يحتوي على اسم العميل customerName؛ 2) فئة داخلية غير ساكنة CartItem تحتوي على اسم السلعة، والسعر، والكمية، ودالة printItemDetails لطباعة تفاصيل السلعة واسم صاحب السلة الخارجي؛ 3) اختبر في main بإنشاء سلة وإضافة سلعتين عبر صيغة outer.new CartItem(...)."
            },
            {
              type: "code",
              language: "java",
              filename: "ShoppingCartChallenge.java",
              code: `public class ShoppingCartChallenge {
    static class ShoppingCart {
        private String customerName;

        ShoppingCart(String customer) {
            this.customerName = customer;
        }

        // Inner class representing an item tied to this specific cart
        class CartItem {
            String itemName;
            double price;
            int quantity;

            CartItem(String name, double price, int qty) {
                this.itemName = name;
                this.price = price;
                this.quantity = qty;
            }

            void printItemDetails() {
                double total = price * quantity;
                System.out.printf("Cart Owner: %-10s | Item: %-12s | Qty: %d | Total: $%.2f%n",
                    customerName, itemName, quantity, total);
            }
        }
    }

    public static void main(String[] args) {
        ShoppingCart cart = new ShoppingCart("Mona Said");

        // Instantiating inner class items linked to 'cart'
        ShoppingCart.CartItem item1 = cart.new CartItem("Wireless Mouse", 29.99, 2);
        ShoppingCart.CartItem item2 = cart.new CartItem("Mechanical KB", 89.50, 1);

        item1.printItemDetails();
        item2.printItemDetails();
    }
}`,
              output: `Cart Owner: Mona Said  | Item: Wireless Mouse | Qty: 2 | Total: $59.98
Cart Owner: Mona Said  | Item: Mechanical KB  | Qty: 1 | Total: $89.50`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "The inner CartItem class seamlessly accesses the private customerName attribute of its parent ShoppingCart instance, establishing a cohesive domain model."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "تصل الفئة الداخلية CartItem لحقل اسم العميل في سلة التسوق بسلاسة، مما يربط السلع بسلتها وصاحبها بشكل محكم."
            }
          ],
          quiz: [
          {
                    "id": "q1",
                    "question": "Which of the following is the correct syntax to instantiate a non-static member inner class named 'Inner' defined inside class 'Outer'?\n(ما هي الصياغة الصحيحة لإنشاء كائن من فئة داخلية غير ساكنة Inner داخل Outer؟)",
                    "options": [
                              "Outer.Inner in = new Outer.Inner();",
                              "Outer outer = new Outer(); Outer.Inner in = outer.new Inner();",
                              "Inner in = Outer.createInner();",
                              "Outer.Inner in = new Inner(outer);"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! A non-static member inner class is inherently tied to an instance of the outer class. You must instantiate the outer class first, and then invoke 'outerInstance.new Inner()'. (الفئة الداخلية غير الساكنة مرتبطة بكائن الفئة الخارجية، لذا يجب إنشاء كائن خارجي أولاً ثم كتابة outer.new Inner())."
          },
          {
                    "id": "q2",
                    "question": "How is a static nested class named 'Nested' inside class 'Outer' instantiated?\n(كيف يتم إنشاء كائن من فئة متداخلة ساكنة Nested داخل Outer؟)",
                    "options": [
                              "Outer.Nested n = new Outer.Nested(); without needing an outer instance.",
                              "Outer.Nested n = outerInstance.new Nested();",
                              "new static Outer.Nested();",
                              "Nested n = (Nested) Outer.class.newInstance();"
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! A static nested class does not hold a reference to an outer class instance. It can be instantiated directly using 'new Outer.Nested();'. (الفئة المتداخلة الساكنة لا ترتبط بكائن خارجي ويمكن إنشاؤها مباشرة باستخدام new Outer.Nested())."
          },
          {
                    "id": "q3",
                    "question": "Can a non-static member inner class directly access private fields and private methods of its enclosing outer class?\n(هل يمكن للفئة الداخلية غير الساكنة الوصول مباشرة للحقول والدوال الخاصة في الفئة الخارجية؟)",
                    "options": [
                              "No, private members are strictly forbidden from any other class, even inner classes.",
                              "Yes, non-static inner classes have full, unrestricted access to all members (public, protected, package, and private) of their enclosing outer class.",
                              "Only if the inner class is marked public.",
                              "Only through reflection."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Inner classes in Java have special privileged access: they can access all members (including private fields and methods) of their enclosing outer class directly. (الفئات الداخلية تتمتع بصلاحية كاملة للوصول لجميع عناصر الفئة الحاضنة لها بما في ذلك الحقول الخاصة)."
          },
          {
                    "id": "q4",
                    "question": "What happens if a static nested class attempts to directly access a non-static instance variable of the outer class:\n\nclass Outer {\n    int count = 10;\n    static class Nested {\n        void display() {\n            System.out.println(count); // line 5\n        }\n    }\n}",
                    "options": [
                              "It compiles and prints 10.",
                              "Compile-time error at line 5: non-static variable count cannot be referenced from a static context.",
                              "It prints 0 by default.",
                              "It compiles, but throws a NullPointerException at runtime."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Because a static nested class has no enclosing outer instance reference, it cannot directly access non-static instance fields of the outer class. (الفئة المتداخلة الساكنة لا تملك مرجعاً لكائن خارجي، لذا لا تستطيع الوصول للحقول غير الساكنة مباشرة ويحدث خطأ تصريف)."
          },
          {
                    "id": "q5",
                    "question": "When an inner class declares a variable that shadows an outer class variable with the same name, how can the inner class explicitly refer to the outer class's variable?\n\nclass Outer {\n    String name = \"OUTER\";\n    class Inner {\n        String name = \"INNER\";\n        void print() {\n            // How to access \"OUTER\"?\n        }\n    }\n}",
                    "options": [
                              "super.name",
                              "this.outer.name",
                              "Outer.this.name",
                              "Outer.super.name"
                    ],
                    "correctIndex": 2,
                    "explanation": "Correct! Java uses the 'OuterClassName.this.fieldName' syntax to qualify the outer class's instance and disambiguate shadowed variables from within an inner class. (تُستخدم الصياغة Outer.this.name للوصول لمتغير الفئة الحاضنة المحجوب داخل الفئة الداخلية)."
          },
          {
                    "id": "q6",
                    "question": "Predict the exact output of this code:\n\nclass Container {\n    int x = 1;\n    class Content {\n        int x = 2;\n        void show(int x) {\n            System.out.print(x + \"-\" + this.x + \"-\" + Container.this.x);\n        }\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Container c = new Container();\n        Container.Content inner = c.new Content();\n        inner.show(3);\n    }\n}",
                    "options": [
                              "1-2-3",
                              "3-2-1",
                              "3-1-2",
                              "2-2-1"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! In 'show(3)': 'x' refers to the parameter (3), 'this.x' refers to the Content instance field (2), and 'Container.this.x' refers to the outer Container field (1). Output: '3-2-1'. (x هو المعامل 3، و this.x هو حقل الفئة الداخلية 2، و Container.this.x هو حقل الفئة الخارجية 1 فيكون الناتج 3-2-1)."
          },
          {
                    "id": "q7",
                    "question": "What is a 'Method-Local Inner Class' in Java, and where can it be instantiated?\n(ما هي الفئة الداخلية المحلية للدالة Method-Local Inner Class وأين يمكن استخدامها؟)",
                    "options": [
                              "A class defined inside a method body; it can only be instantiated within that specific method, after its class declaration.",
                              "A class defined in a separate file imported by the method.",
                              "A class that can only contain static methods.",
                              "A class that is automatically exported as a REST endpoint."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! A method-local inner class is declared directly inside a method block. Its scope is strictly confined to that method body, and it can only be instantiated after its declaration within that method. (الفئة الداخلية المحلية تُعرف داخل جسم الدالة ونطاقها محصور فقط داخل تلك الدالة بعد سطر تعريفها)."
          },
          {
                    "id": "q8",
                    "question": "Consider this code attempting to capture a local variable inside a method-local class:\n\nvoid compute() {\n    int factor = 5;\n    class Multiplier {\n        int multiply(int val) { return val * factor; }\n    }\n    factor = 10; // line 6\n    Multiplier m = new Multiplier();\n    System.out.println(m.multiply(2));\n}\n\nWhat occurs during compilation?",
                    "options": [
                              "It compiles and prints 20.",
                              "It compiles and prints 10.",
                              "Compile-time error: local variables referenced from an inner class must be final or effectively final.",
                              "It compiles, but throws an IllegalStateException at runtime."
                    ],
                    "correctIndex": 2,
                    "explanation": "Correct! Local variables accessed from inside local or anonymous inner classes must be final or effectively final. Modifying 'factor = 10' on line 6 invalidates its effectively final status, triggering a compile-time error. (المتغيرات المحلية المستخدمة داخل فئة محلية يجب أن تكون final أو ثابتة عملياً، وتعديل قيمتها يسبب خطأ تصريف)."
          },
          {
                    "id": "q9",
                    "question": "Why do non-static member inner classes present a potential memory leak risk in long-running applications (such as Android or server listeners)?",
                    "options": [
                              "Because inner classes run on unmanaged OS memory.",
                              "Because every non-static inner class instance holds an invisible, implicit strong reference to its enclosing outer class instance, preventing the outer object from being garbage-collected.",
                              "Because inner classes cannot be serialized.",
                              "Because inner classes disable JVM garbage collection entirely."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Non-static inner class objects retain an implicit reference ('Outer.this') to their enclosing outer object. If an inner class instance outlives the outer object (e.g. in a background thread or static cache), it prevents the outer object from being garbage-collected, creating a memory leak. (تحتفظ الفئة الداخلية بمرجع ضمني قوي للكائن الخارجي مما يمنع تنظيفه من الذاكرة إذا بقي كائن الفئة الداخلية حياً)."
          },
          {
                    "id": "q10",
                    "question": "Which access modifiers are permitted on nested classes declared directly inside another class?",
                    "options": [
                              "Only public and default (package-private).",
                              "public, protected, default (package-private), and private.",
                              "Only private.",
                              "Only public and protected."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! While top-level classes can only be public or package-private, nested classes are members of the enclosing class and can use all four access modifiers: public, protected, package-private, and private. (الفئات المتداخلة كأعضاء فئة تملك حرية استخدام المعدلات الأربعة: public و protected و default و private)."
          },
          {
                    "id": "q11",
                    "question": "Can a standard top-level class (not declared inside any other class) be declared with the 'static' modifier?",
                    "options": [
                              "Yes, in all versions of Java.",
                              "No; the 'static' modifier is strictly forbidden on top-level classes and is only valid on nested classes.",
                              "Yes, if it has no constructors.",
                              "Yes, if it contains only static methods."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! In Java, top-level classes cannot be declared static; only nested classes (classes defined inside another class) can be declared static. (لا يمكن أبداً جعل الفئات ذات المستوى الأعلى ساكنة، فالكلمة static مسموحة فقط للفئات المتداخلة)."
          },
          {
                    "id": "q12",
                    "question": "When the Java compiler compiles an outer class 'Customer' containing a member inner class 'Address', what .class file name is generated for the inner class?",
                    "options": [
                              "Customer.Address.class",
                              "Customer$Address.class",
                              "Address.class",
                              "Customer_Address.class"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! The Java compiler uses the dollar sign '$' separator convention in bytecode class files for inner and nested classes: 'Customer$Address.class'. (يستخدم مترجم جافا علامة الدولار $ لفصل اسم الفئة الخارجية عن الفئة الداخلية في ملفات البايت كود)."
          },
          {
                    "id": "q13",
                    "question": "In the famous GoF Builder Pattern in Java, why is the Builder class typically declared as a 'public static class Builder' rather than a non-static inner class?",
                    "options": [
                              "Because static classes run faster in bytecode.",
                              "So that callers can instantiate the Builder directly (e.g. 'new Computer.Builder()') without needing a pre-existing instance of the target class.",
                              "Because non-static classes cannot declare constructors.",
                              "To make the Builder immutable."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Declaring the Builder as a static nested class allows clients to instantiate it via 'new Computer.Builder()' without needing an existing Computer instance first, which is the exact purpose of building a new object from scratch. (جعل فئة Builder ساكنة يتيح إنشاء كائن البناء دون الحاجة لوجود كائن مسبق من الفئة الأصلية)."
          },
          {
                    "id": "q14",
                    "question": "Suppose class Outer has a non-static member class Inner:\n\nclass Outer {\n    class Inner {}\n    public static void main(String[] args) {\n        Inner in = new Inner(); // line 4\n    }\n}\n\nWhat happens when compiling this code?",
                    "options": [
                              "It compiles and runs without issue.",
                              "Compile-time error at line 4: non-static variable this cannot be referenced from a static context (must use 'new Outer().new Inner()').",
                              "It throws a NoClassDefFoundError.",
                              "It compiles only if Inner extends Outer."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! A static method like main() has no current 'this' instance of Outer. Attempting to directly instantiate a non-static inner class fails because it requires an outer instance: 'new Outer().new Inner()'. (الدالة الساكنة main لا تملك كائناً حالياً this، لذا يفشل إنشاء الفئة الداخلية غير الساكنة دون كائن خارجي صريح)."
          },
          {
                    "id": "q15",
                    "question": "In standard Java collection implementations (such as LinkedList or TreeMap), why is the internal 'Node' or 'Entry' class typically declared as 'private static class Node' rather than a non-static inner class?",
                    "options": [
                              "To allow Node to inherit from java.lang.Object.",
                              "To save memory overhead by avoiding the implicit reference to the outer collection instance for thousands of individual nodes.",
                              "Because Java does not allow private non-static inner classes.",
                              "To allow Node to be accessed by external classes."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Declaring Node as a static nested class avoids storing an invisible outer instance pointer in every single node. In a list with 100,000 nodes, eliminating this 4-8 byte pointer saves substantial heap memory. (جعل عقد القائمة ساكنة static يوفر حجماً كبيراً في الذاكرة عبر التخلص من مرجع الفئة الخارجية في كل عقدة على حدة)."
          }
        ]
      }
    ]
  },

    /* ==========================================================================
       TOPIC 14: Java Abstraction
       ========================================================================== */
    {
      id: "java-abstraction",
      title: "14. Java Abstraction",
      description: "Mastering Java Abstraction: Abstract classes, abstract methods, template method pattern, concrete hooks, abstract constructors, and contract enforcement.",
      lessons: [
        {
          id: "abstraction-mastery",
          title: "Complete Guide to Java Abstraction",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "Understanding Abstraction in Java (فهم مبدأ التجريد في جافا)"
            },
            {
              type: "paragraph",
              text: "Abstraction is the process of hiding internal implementation details and exposing only essential features to the user. It answers 'WHAT the object does' rather than 'HOW it does it'. In Java, abstraction is achieved via two primary mechanisms: 1) Abstract Classes (which achieve 0% to 100% partial abstraction by mixing abstract and concrete methods); 2) Interfaces (which achieve 100% full abstraction)."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "التجريد (Abstraction) هو عملية إخفاء التفاصيل المعقدة للتنفيذ الداخلي وإظهار الوظائف الأساسية فقط للمستخدم. يركز التجريد على 'ماذا يفعل الكائن' بدلاً من 'كيف يفعل ذلك'. يتحقق التجريد في جافا عبر وسيلتين رئيسيتين: 1) الفئات المجردة (Abstract Classes) وتوفر تجريداً جزئياً بمزج الدوال المجردة والملموسة؛ 2) الواجهات (Interfaces) وتوفر تجريداً كاملاً."
            },
            {
              type: "paragraph",
              text: "Core Rule: An abstract class can NEVER be directly instantiated using 'new'. It serves as a base contract that concrete subclasses must extend and complete."
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
              text: "Example 1: Basic Abstract Class and Abstract Method (المثال 1: الفئة والدالة المجردة الأساسية)"
            },
            {
              type: "paragraph",
              text: "Defining an abstract method without a body, forcing subclasses to provide implementation."
            },
            {
              type: "code",
              language: "java",
              filename: "BasicAbstractDemo.java",
              code: `public class BasicAbstractDemo {
    // Abstract Class: cannot be instantiated via 'new Appliance()'
    static abstract class Appliance {
        // Abstract method: no body ({}), ends with a semicolon
        abstract void turnOn();
    }

    static class Toaster extends Appliance {
        @Override
        void turnOn() {
            System.out.println("Toaster heating elements glowing red.");
        }
    }

    public static void main(String[] args) {
        // Appliance a = new Appliance(); // COMPILER ERROR: Appliance is abstract!
        Appliance myAppliance = new Toaster();
        myAppliance.turnOn();
    }
}`,
              output: `Toaster heating elements glowing red.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "The abstract method 'turnOn()' has no curly-brace body. Subclass Toaster is obligated to override it with concrete logic."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "الدالة المجردة 'turnOn()' لا تمتلك جسماً وتنتهي بفاصلة منقوطة، وتلتزم الفئة الابنة Toaster بكتابة التنفيذ الفعلي لها."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Blending Abstract and Concrete Methods (المثال 2: دمج الدوال المجردة والعادية معاً)"
            },
            {
              type: "paragraph",
              text: "Sharing reusable concrete methods while leaving specific operations abstract."
            },
            {
              type: "code",
              language: "java",
              filename: "MixedAbstractDemo.java",
              code: `public class MixedAbstractDemo {
    static abstract class CloudService {
        String serviceName;
        CloudService(String name) { this.serviceName = name; }

        // Concrete method: shared logic
        void logStartup() {
            System.out.println("[BOOT] Starting cloud service: " + serviceName);
        }

        // Abstract method: unique per service
        abstract void handleRequest(String request);
    }

    static class AuthServer extends CloudService {
        AuthServer() { super("Authentication Gateway"); }

        @Override
        void handleRequest(String req) {
            System.out.println("Verifying OAuth token for: " + req);
        }
    }

    public static void main(String[] args) {
        CloudService auth = new AuthServer();
        auth.logStartup(); // Shared concrete method
        auth.handleRequest("GET /api/profile"); // Overridden abstract method
    }
}`,
              output: `[BOOT] Starting cloud service: Authentication Gateway
Verifying OAuth token for: GET /api/profile`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "Abstract classes combine the best of both worlds: shared reusable code in concrete methods, and enforced specialization in abstract methods."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "تجمع الفئات المجردة بين الميزتين: مشاركة كود جاهز في الدوال العادية، وإلزام الفئات الوارثة بتخصيص الدوال المجردة."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Abstract Class Constructor Calling (المثال 3: استدعاء مشيد الفئة المجردة)"
            },
            {
              type: "paragraph",
              text: "Even though abstract classes cannot be instantiated with new, their constructors run during subclass creation."
            },
            {
              type: "code",
              language: "java",
              filename: "AbstractConstructorDemo.java",
              code: `public class AbstractConstructorDemo {
    static abstract class DatabaseEntity {
        long createdAt;
        String entityId;

        DatabaseEntity(String id) {
            this.entityId = id;
            this.createdAt = System.currentTimeMillis();
            System.out.println("Base DatabaseEntity constructed: " + id);
        }

        abstract void persist();
    }

    static class OrderEntity extends DatabaseEntity {
        double amount;

        OrderEntity(String id, double amt) {
            super(id); // Invokes abstract class constructor
            this.amount = amt;
        }

        @Override
        void persist() {
            System.out.println("Saving Order " + entityId + " ($" + amount + ") to SQL table.");
        }
    }

    public static void main(String[] args) {
        OrderEntity order = new OrderEntity("ORD-9912", 249.0);
        order.persist();
    }
}`,
              output: `Base DatabaseEntity constructed: ORD-9912
Saving Order ORD-9912 ($249.0) to SQL table.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "Abstract classes have constructors to initialize common state (e.g. entityId, createdAt). They are triggered via super() from subclasses."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "تمتلك الفئات المجردة مشيدات لتهيئة البيانات المشتركة، ويتم استدعاؤها عبر super(...) من مشيدات الفئات الوارثة."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Final Methods in Abstract Classes (المثال 4: الدوال الثابتة final داخل فئة مجردة)"
            },
            {
              type: "paragraph",
              text: "Preventing subclasses from altering critical workflow logic."
            },
            {
              type: "code",
              language: "java",
              filename: "AbstractFinalMethodDemo.java",
              code: `public class AbstractFinalMethodDemo {
    static abstract class FinancialAudit {
        // Final method: locked algorithm workflow!
        public final void executeAudit() {
            startAuditTimer();
            performAuditChecks(); // Calls abstract method
            archiveResults();
        }

        private void startAuditTimer() { System.out.println("Audit timer started."); }
        private void archiveResults() { System.out.println("Audit results cryptographically archived."); }

        // Subclasses only customize this step:
        abstract void performAuditChecks();
    }

    static class TaxAudit extends FinancialAudit {
        @Override
        void performAuditChecks() {
            System.out.println("Auditing VAT receipts and cross-checking invoices.");
        }
    }

    public static void main(String[] args) {
        FinancialAudit audit = new TaxAudit();
        audit.executeAudit();
    }
}`,
              output: `Audit timer started.
Auditing VAT receipts and cross-checking invoices.
Audit results cryptographically archived.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "Marking 'executeAudit' final guarantees that the workflow sequence cannot be altered, while leaving 'performAuditChecks' abstract for customization."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "جعل الدالة 'final' يضمن ثبات تسلسل الخطوات الحساسة، مع ترك دالة الفحص مجردة ليخصصها كل نظام حسب حاجته."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Multilevel Abstraction Chains (المثال 5: سلاسل التجريد متعددة المستويات)"
            },
            {
              type: "paragraph",
              text: "An abstract class extending another abstract class without implementing all methods."
            },
            {
              type: "code",
              language: "java",
              filename: "MultilevelAbstractDemo.java",
              code: `public class MultilevelAbstractDemo {
    // Level 1 Abstract
    static abstract class Component {
        abstract void render();
        abstract void resize(int w, int h);
    }

    // Level 2 Abstract: Implements resize(), but leaves render() abstract
    static abstract class AbstractButton extends Component {
        int width, height;
        @Override
        void resize(int w, int h) {
            this.width = w;
            this.height = h;
            System.out.println("Button resized to " + w + "x" + h);
        }
    }

    // Concrete class: Completes the remaining abstract methods
    static class SubmitButton extends AbstractButton {
        @Override
        void render() {
            System.out.println("Rendering green submit button (" + width + "x" + height + ")");
        }
    }

    public static void main(String[] args) {
        SubmitButton btn = new SubmitButton();
        btn.resize(120, 45);
        btn.render();
    }
}`,
              output: `Button resized to 120x45
Rendering green submit button (120x45)`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "An abstract subclass does not have to implement all parent abstract methods. It can implement a subset and pass remaining obligations to concrete descendants."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "الفئة المجردة الفرعية ليست ملزمة بتنفيذ كافة الدوال المجردة، بل يمكنها تنفيذ بعضها وترك الباقي للفئات الملموسة التالية."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Abstract Classes with Static Utility Methods (المثال 6: الدوال الساكنة داخل الفئات المجردة)"
            },
            {
              type: "paragraph",
              text: "Hosting static helper functions directly on an abstract class."
            },
            {
              type: "code",
              language: "java",
              filename: "AbstractStaticDemo.java",
              code: `public class AbstractStaticDemo {
    static abstract class EncryptionEngine {
        // Static method accessible via EncryptionEngine.getDefaultAlgorithm()
        static String getDefaultAlgorithm() {
            return "AES-256-GCM";
        }

        abstract byte[] encrypt(String text);
    }

    static class SimpleAES extends EncryptionEngine {
        @Override
        byte[] encrypt(String text) {
            return text.getBytes(); // Simplified simulation
        }
    }

    public static void main(String[] args) {
        System.out.println("Default Engine Algorithm: " + EncryptionEngine.getDefaultAlgorithm());
        EncryptionEngine engine = new SimpleAES();
        System.out.println("Encrypted bytes length: " + engine.encrypt("Hello").length);
    }
}`,
              output: `Default Engine Algorithm: AES-256-GCM
Encrypted bytes length: 5`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "Abstract classes can define static utility methods and constants that callers can invoke directly on the class name without instantiation."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "يمكن للفئات المجردة احتواء دوال وثوابت ساكنة static يمكن استدعاؤها مباشرة باسم الفئة دون الحاجة لإنشاء كائن."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: The Classic Template Method Pattern (المثال 7: نمط دالة القالب Template Method)"
            },
            {
              type: "paragraph",
              text: "Defining a skeleton algorithm in an abstract class, letting subclasses override specific steps."
            },
            {
              type: "code",
              language: "java",
              filename: "TemplateMethodDemo.java",
              code: `public class TemplateMethodDemo {
    static abstract class DataPipeline {
        // Template Method
        public final void runPipeline() {
            readSource();
            transform(); // Abstract step
            writeDestination();
        }

        private void readSource() { System.out.println("1. Reading raw JSON payload from queue."); }
        private void writeDestination() { System.out.println("3. Writing validated records to PostgreSQL."); }

        abstract void transform(); // Step to be implemented by child
    }

    static class UserDataPipeline extends DataPipeline {
        @Override
        void transform() {
            System.out.println("2. [TRANSFORM] Anonymizing IP addresses and hashing passwords.");
        }
    }

    public static void main(String[] args) {
        DataPipeline pipeline = new UserDataPipeline();
        pipeline.runPipeline();
    }
}`,
              output: `1. Reading raw JSON payload from queue.
2. [TRANSFORM] Anonymizing IP addresses and hashing passwords.
3. Writing validated records to PostgreSQL.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "The Template Method design pattern defines the invariable structure of an algorithm in an abstract base class while delegating individual steps to subclasses."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "نمط دالة القالب (Template Method) يحدد الهيكل العام للخوارزمية في الفئة المجردة، ويفوض تفاصيل الخطوات للفئات الفرعية."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Abstract Hook Methods (المثال 8: دوال الخطاف الاختيارية Hook Methods)"
            },
            {
              type: "paragraph",
              text: "Providing optional empty hook methods that subclasses can override if desired."
            },
            {
              type: "code",
              language: "java",
              filename: "HookMethodDemo.java",
              code: `public class HookMethodDemo {
    static abstract class TestRunner {
        public final void runTest() {
            beforeEach(); // Hook method (optional)
            executeTest();
            afterEach();  // Hook method (optional)
        }

        abstract void executeTest();

        // Optional hooks with default empty implementation
        void beforeEach() {}
        void afterEach() {}
    }

    static class PaymentUnitTest extends TestRunner {
        @Override
        void beforeEach() {
            System.out.println("[HOOK] Resetting sandbox database state.");
        }

        @Override
        void executeTest() {
            System.out.println("Testing payment charge deduction: PASS");
        }
    }

    public static void main(String[] args) {
        TestRunner runner = new PaymentUnitTest();
        runner.runTest();
    }
}`,
              output: `[HOOK] Resetting sandbox database state.
Testing payment charge deduction: PASS`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "Hook methods in an abstract class provide default empty behavior, giving subclasses the freedom to opt in without being forced to implement them."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "دوال الخطاف (Hooks) تمتلك جسماً فارغاً افتراضياً، وتمنح الفئات الفرعية حرية استخدامها وتخصيصها دون إجبارها على ذلك."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Enforcing State Machine Transitions via Abstraction (المثال 9: فرض مراحل آلة الحالة)"
            },
            {
              type: "paragraph",
              text: "Guiding stateful objects through strict lifecycle phases."
            },
            {
              type: "code",
              language: "java",
              filename: "LifecycleAbstractDemo.java",
              code: `public class LifecycleAbstractDemo {
    static abstract class LifecycleComponent {
        private boolean initialized = false;

        public final void start() {
            if (!initialized) {
                init();
                initialized = true;
            }
            run();
        }

        protected abstract void init();
        protected abstract void run();
    }

    static class MicroserviceServer extends LifecycleComponent {
        @Override
        protected void init() {
            System.out.println("Initializing thread pool and DB connection pool.");
        }

        @Override
        protected void run() {
            System.out.println("Microservice listening for incoming gRPC traffic.");
        }
    }

    public static void main(String[] args) {
        LifecycleComponent service = new MicroserviceServer();
        service.start();
    }
}`,
              output: `Initializing thread pool and DB connection pool.
Microservice listening for incoming gRPC traffic.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "The abstract base class controls lifecycle state transitions and prevents calling run() without calling init() first."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "تتحكم الفئة المجردة في دورة حياة المكون وتضمن عدم تشغيل run() إلا بعد اكتمال مرحلة التهيئة init() بنجاح."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Polymorphism with Abstract Type Contracts (المثال 10: تعدد الأشكال مع عقود الفئات المجردة)"
            },
            {
              type: "paragraph",
              text: "Iterating through abstract references executing distinct implementations."
            },
            {
              type: "code",
              language: "java",
              filename: "AbstractPolymorphicCollection.java",
              code: `public class AbstractPolymorphicCollection {
    static abstract class CloudAlert {
        String serverId;
        CloudAlert(String s) { this.serverId = s; }
        abstract void triggerAlarm();
    }

    static class HighCpuAlert extends CloudAlert {
        HighCpuAlert(String s) { super(s); }
        @Override void triggerAlarm() { System.out.println("WARNING: CPU usage on " + serverId + " is 98%!"); }
    }

    static class DiskFullAlert extends CloudAlert {
        DiskFullAlert(String s) { super(s); }
        @Override void triggerAlarm() { System.out.println("CRITICAL: Disk storage on " + serverId + " has 0 MB remaining!"); }
    }

    public static void main(String[] args) {
        CloudAlert[] alarms = {
            new HighCpuAlert("node-01"),
            new DiskFullAlert("node-04")
        };

        for (CloudAlert alert : alarms) {
            alert.triggerAlarm();
        }
    }
}`,
              output: `WARNING: CPU usage on node-01 is 98%!
CRITICAL: Disk storage on node-04 has 0 MB remaining!`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "Declaring arrays or collections of the abstract type allows polymorphic batch execution across varied alert types seamlessly."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "تخزين الكائنات في مصفوفات بنوع الفئة المجردة يتيح تنفيذ العمليات البرمجية بتعدد الأشكال لجميع التنبيهات بمرونة تامة."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Enterprise Cloud Storage Provider Framework (المثال 11: إطار عمل موفري التخزين السحابي متكامل)"
            },
            {
              type: "paragraph",
              text: "Advanced: Complete abstract storage framework with common authentication, metrics collection, and specialized blob storage adapters."
            },
            {
              type: "code",
              language: "java",
              filename: "CloudStorageMaster.java",
              code: `public class CloudStorageMaster {
    static abstract class CloudStorageProvider {
        final String providerName;
        private long totalBytesUploaded = 0;

        CloudStorageProvider(String name) {
            this.providerName = name;
        }

        // Shared template method
        public final void uploadFile(String key, byte[] data) {
            authenticate();
            writeBlob(key, data); // Abstract method
            totalBytesUploaded += data.length;
            System.out.printf("[%s] Uploaded '%s' (%d bytes). Lifetime Total: %d bytes%n",
                providerName, key, data.length, totalBytesUploaded);
        }

        private void authenticate() {
            System.out.println("[" + providerName + "] Authenticating API credentials...");
        }

        protected abstract void writeBlob(String key, byte[] data);
    }

    static class AWSStorageProvider extends CloudStorageProvider {
        AWSStorageProvider() { super("AWS S3"); }
        @Override
        protected void writeBlob(String key, byte[] data) {
            System.out.println(" -> Putting object into S3 Bucket [s3://corp-assets/" + key + "]");
        }
    }

    static class AzureStorageProvider extends CloudStorageProvider {
        AzureStorageProvider() { super("Azure Blob"); }
        @Override
        protected void writeBlob(String key, byte[] data) {
            System.out.println(" -> Uploading block blob to Azure container [https://corp.blob.core.windows.net/" + key + "]");
        }
    }

    public static void main(String[] args) {
        CloudStorageProvider s3 = new AWSStorageProvider();
        CloudStorageProvider azure = new AzureStorageProvider();

        byte[] samplePayload = "Sample Document Content".getBytes();

        s3.uploadFile("docs/spec.pdf", samplePayload);
        azure.uploadFile("backup/db.tar.gz", samplePayload);
    }
}`,
              output: `[AWS S3] Authenticating API credentials...
 -> Putting object into S3 Bucket [s3://corp-assets/docs/spec.pdf]
[AWS S3] Uploaded 'docs/spec.pdf' (23 bytes). Lifetime Total: 23 bytes
[Azure Blob] Authenticating API credentials...
 -> Uploading block blob to Azure container [https://corp.blob.core.windows.net/backup/db.tar.gz]
[Azure Blob] Uploaded 'backup/db.tar.gz' (23 bytes). Lifetime Total: 23 bytes`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "The abstract framework unifies authentication and metric telemetry tracking in the base class while delegating cloud-specific blob uploads to S3 and Azure subclasses."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "يوحد هذا الإطار عمليات المصادقة وتسجيل الإحصائيات في الفئة المجردة الأساسية، مع تفويض آلية التخزين السحابي الخاصة لكل موفر خدمة (AWS و Azure)."
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
                "Mistake 1: Attempting to instantiate an abstract class directly using 'new MyAbstractClass()'. Abstract classes cannot be instantiated; you must instantiate a concrete subclass.",
                "خطأ 1: محاولة إنشاء كائن مباشرة من الفئة المجردة عبر 'new MyAbstractClass()'، وهو خطأ تصريف صريح لأن الفئات المجردة قوالب غير مكتملة.",
                "Mistake 2: Marking an abstract method as 'private' or 'final'. Abstract methods exist to be overridden by subclasses; marking them private or final makes overriding impossible.",
                "خطأ 2: تعريف الدالة المجردة كـ 'private' أو 'final'. الدوال المجردة صُممت ليعاد تعريفها في الفئات الوارثة، وجعلها private أو final يمنع الوراثة.",
                "Mistake 3: Forgetting to implement all abstract methods in a concrete subclass. If any abstract method is left un-implemented, the subclass must also be declared abstract."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Multi-Format Report Exporter (التحدي العملي: مصدّر التقارير متعدد الصيغ)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Build a report generation framework: 1) Abstract class 'ReportExporter' with concrete method 'exportReport(String title)' that prints header and footer, and abstract method 'exportBody(String title)'; 2) Concrete subclass 'PdfReportExporter' that formats the body as '[PDF Format: Vector Tables and Charts]'; 3) Concrete subclass 'CsvReportExporter' that formats the body as '[CSV Format: Comma-Separated Values]'; 4) Test both exporters in main()."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: قم بإنشاء إطار عمل لتصدير التقارير: 1) فئة مجردة ReportExporter تحتوي على دالة عادية exportReport(String title) لطباعة الرأس والتذييل، ودالة مجردة exportBody؛ 2) فئة فرعية PdfReportExporter تطبع الجسم بصيغة PDF؛ 3) فئة فرعية CsvReportExporter تطبع الجسم بصيغة CSV؛ 4) اختبر المصدّرين في main."
            },
            {
              type: "code",
              language: "java",
              filename: "ReportExporterChallenge.java",
              code: `public class ReportExporterChallenge {
    static abstract class ReportExporter {
        // Template method
        public final void exportReport(String title) {
            System.out.println("=== EXPORT START: " + title.toUpperCase() + " ===");
            exportBody(title); // Subclass specific
            System.out.println("=== EXPORT COMPLETE: Checksum Verified ===\\n");
        }

        abstract void exportBody(String title);
    }

    static class PdfReportExporter extends ReportExporter {
        @Override
        void exportBody(String title) {
            System.out.println("Rendering PDF pages, vector tables, and digital signature for " + title);
        }
    }

    static class CsvReportExporter extends ReportExporter {
        @Override
        void exportBody(String title) {
            System.out.println("id,metric,value\\n1,revenue,125000\\n2,growth,14.5%");
        }
    }

    public static void main(String[] args) {
        ReportExporter pdf = new PdfReportExporter();
        ReportExporter csv = new CsvReportExporter();

        pdf.exportReport("Quarterly Financial Review");
        csv.exportReport("Sales Raw Data");
    }
}`,
              output: `=== EXPORT START: QUARTERLY FINANCIAL REVIEW ===
Rendering PDF pages, vector tables, and digital signature for Quarterly Financial Review
=== EXPORT COMPLETE: Checksum Verified ===

=== EXPORT START: SALES RAW DATA ===
id,metric,value
1,revenue,125000
2,growth,14.5%
=== EXPORT COMPLETE: Checksum Verified ===`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "The abstract base class defines the export wrapper workflow, while specialized subclasses customize body formatting for PDF and CSV."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "تحدد الفئة المجردة الهيكل العام لتصدير التقرير، بينما تخصص الفئات الفرعية طريقة تمثيل المحتوى بحسب صيغة الملف المطلوبة."
            }
          ],
          quiz: [
          {
                    "id": "q1",
                    "question": "Can an abstract class in Java be directly instantiated using the 'new' keyword?\n(هل يمكن إنشاء كائن مباشرة من فئة مجردة باستخدام الكلمة new؟)",
                    "options": [
                              "Yes, if it has no abstract methods.",
                              "No; abstract classes cannot be instantiated directly using 'new'.",
                              "Yes, if all its fields are initialized.",
                              "Yes, but only in the main method."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Abstract classes serve as conceptual blueprints and cannot be directly instantiated with 'new'. They can only be instantiated through their concrete subclasses. (الفئات المجردة تمثل هياكل مفاهيمية ولا يمكن إنشاء كائنات منها مباشرة بـ new، بل عبر فئاتها الفرعية الملموسة فقط)."
          },
          {
                    "id": "q2",
                    "question": "Which of the following is a valid abstract method declaration in Java?\n(أي مما يلي يمثل تعريفاً صحيحاً لدالة مجردة في جافا؟)",
                    "options": [
                              "abstract void calculate() {}",
                              "abstract void calculate();",
                              "void abstract calculate();",
                              "abstract calculate();"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! An abstract method declaration specifies the 'abstract' keyword, return type, name, and parameters, and terminates with a semicolon ';' with NO method body or curly braces. (الدالة المجردة لا تملك جسماً أو أقواس معقوفة، بل تنتهي بفاصلة منقوطة)."
          },
          {
                    "id": "q3",
                    "question": "What happens if a class defines an abstract method without the class itself being declared 'abstract':\n\nclass Shape {\n    abstract void draw(); // line 2\n}",
                    "options": [
                              "It compiles with a warning.",
                              "Compile-time error: Shape is not abstract and does not override abstract method draw() in Shape (class must be declared abstract).",
                              "It compiles and makes draw() an empty method automatically.",
                              "It compiles only if draw() is public."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! If a class contains even a single abstract method, the class itself MUST be declared with the 'abstract' keyword; otherwise, compilation fails. (إذا احتوت أي فئة على دالة مجردة واحدة على الأقل، يجب وجوباً تعريف الفئة نفسها بأنها abstract)."
          },
          {
                    "id": "q4",
                    "question": "Suppose abstract class Animal has 'abstract void makeSound();'. Class Dog extends Animal, but does NOT override makeSound(). What is the result when compiling Dog?",
                    "options": [
                              "Dog compiles cleanly and inherits an empty makeSound().",
                              "Compile-time error: Dog is not abstract and does not override abstract method makeSound() in Animal.",
                              "Dog compiles, but throws an AbstractMethodError at runtime when instantiated.",
                              "Dog compiles only if marked final."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! A concrete subclass extending an abstract class must either implement ALL inherited abstract methods, or be declared as an 'abstract class' itself. (الفئة الابنة الملموسة يجب أن تنفذ جميع الدوال المجردة الموروثة أو يتم تعريفها هي أيضاً كفئة مجردة)."
          },
          {
                    "id": "q5",
                    "question": "Can an abstract class define constructors in Java?\n(هل يمكن لفئة مجردة في جافا تعريف مشيدات constructors؟)",
                    "options": [
                              "No, because abstract classes cannot be instantiated, constructors are completely prohibited.",
                              "Yes, abstract classes can have constructors, which are invoked by concrete subclasses via 'super(...)' during object construction.",
                              "Only default no-arg constructors are permitted.",
                              "Only private constructors are permitted."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Abstract classes can have constructors to initialize shared state and fields. These constructors are executed when concrete subclass constructors invoke 'super(...)'. (يمكن للفئات المجردة امتلاك مشيدات لتهيئة حقولها المشتركة، وتُستدعى عند إنشاء كائن الابن عبر super)."
          },
          {
                    "id": "q6",
                    "question": "Which of the following modifier combinations causes a compile-time error when declared on a method?",
                    "options": [
                              "public abstract",
                              "protected abstract",
                              "abstract final",
                              "abstract"
                    ],
                    "correctIndex": 2,
                    "explanation": "Correct! 'abstract' mandates that a method MUST be overridden by subclasses, while 'final' strictly FORBIDS overriding. Because they directly contradict each other, 'abstract final' is illegal. (الجمع بين abstract التي توجب التجاوز و final التي تمنعه تناقض صريح محظور في جافا)."
          },
          {
                    "id": "q7",
                    "question": "Why does the Java compiler disallow 'abstract static' methods?\n(لماذا يحظر مترجم جافا الدوال المعرفة بـ abstract static؟)",
                    "options": [
                              "Because static methods use too much memory.",
                              "Because static methods belong to the class and are resolved at compile time; they cannot be dynamically overridden in subclasses.",
                              "Because abstract methods must always be public.",
                              "Because static methods can only exist in interfaces."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Static methods belong to the class and are resolved at compile time (not participating in runtime dynamic method dispatch), making it impossible for subclasses to override them polymorphically. (الدوال الساكنة ترتبط بالفئة وتُحدد وقت الترجمة ولا يمكن تجاوزها ديناميكياً، مما يتنافى مع مبدأ الدوال المجردة)."
          },
          {
                    "id": "q8",
                    "question": "What occurs if you declare a method as 'private abstract void perform();'?",
                    "options": [
                              "It compiles cleanly.",
                              "Compile-time error: illegal combination of modifiers: abstract and private.",
                              "It compiles, but can only be called from inside the abstract class.",
                              "It creates a protected method by default."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Private methods are hidden from subclasses and cannot be overridden. Since abstract methods require overriding, 'private abstract' is an illegal contradictory combination. (الدوال الخاصة private لا تظهر للابن ولا يمكن تجاوزها، لذا حظر جافا جمعها مع abstract)."
          },
          {
                    "id": "q9",
                    "question": "Can an abstract class in Java contain non-abstract (concrete) methods and mutable instance variables?",
                    "options": [
                              "No, abstract classes can only contain abstract methods and static constants.",
                              "Yes, abstract classes can contain a complete mix of fully implemented concrete methods, instance variables, static fields, and abstract methods.",
                              "Only in Java 8 and later.",
                              "Only if all instance fields are marked transient."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Unlike standard interfaces (which historically held no state), abstract classes can have fully functional instance fields, constructors, and concrete helper methods alongside abstract methods. (تستطيع الفئات المجردة احتواء حقول كائن عادية ومشيدات ودوال ملموسة مكتملة إلى جانب الدوال المجردة)."
          },
          {
                    "id": "q10",
                    "question": "In software architecture, the 'Template Method Design Pattern' relies on abstract classes by:",
                    "options": [
                              "Making all methods in the class abstract.",
                              "Defining the skeletal algorithm in a concrete (often final) method, while leaving specific variable steps as abstract methods for subclasses to implement.",
                              "Preventing subclasses from defining fields.",
                              "Using reflection to bypass access modifiers."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! In the Template Method pattern, an abstract class defines the invariant workflow skeleton in a 'final' method (e.g. step1 -> step2 -> step3), delegating the customizable steps to abstract methods implemented by subclasses. (نمط قالب الدالة يحدد الهيكل العام للخوارزمية في دالة ثابتة، ويترك الخطوات المخصصة كدوال مجردة تنفذها الفئات الابنة)."
          },
          {
                    "id": "q11",
                    "question": "Is it syntactically valid in Java to declare a class as 'abstract' if it contains ZERO abstract methods?\n\nabstract class UtilityBase {\n    void info() { System.out.println(\"Base Info\"); }\n}",
                    "options": [
                              "No, a class cannot be abstract without at least one abstract method.",
                              "Yes, it is completely valid, and is commonly used to prevent direct instantiation of the base class.",
                              "It compiles only if it implements an interface.",
                              "It generates a runtime exception upon class loading."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! An abstract class does NOT require any abstract methods. Developers frequently declare classes abstract purely to prevent instantiation and enforce that they only be used as a base class. (من الصحيح تماماً تعريف فئة مجردة دون أي دوال مجردة، والهدف هو منع إنشاء كائنات مباشرة منها وحصر استخدامها كفئة أب)."
          },
          {
                    "id": "q12",
                    "question": "Consider this multilevel inheritance scenario:\n\nabstract class Component {\n    abstract void render();\n    abstract void resize();\n}\nabstract class VisualComponent extends Component {\n    @Override\n    void render() { System.out.println(\"Rendered\"); }\n}\nclass Button extends VisualComponent {\n    @Override\n    void resize() { System.out.println(\"Resized\"); }\n}\n\nWhy does VisualComponent compile successfully without implementing resize()?",
                    "options": [
                              "Because resize() is optional.",
                              "Because VisualComponent is itself declared 'abstract', so it is permitted to leave inherited abstract methods unimplemented for subsequent subclasses.",
                              "Because Button implements both methods.",
                              "Because Component is in the same package."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! An intermediate abstract class does not have to implement all abstract methods of its superclass. Any unimplemented abstract methods are simply passed down the hierarchy to the first concrete subclass (Button). (الفئة المجردة الوسيطة غير ملزمة بتنفيذ كافة الدوال المجردة، بل يمكنها توريثها للفئات الملموسة التالية لتنفيذها)."
          },
          {
                    "id": "q13",
                    "question": "Predict the output of the following program:\n\nabstract class Vehicle {\n    Vehicle() { System.out.print(\"V-\"); }\n}\nclass Sedan extends Vehicle {\n    Sedan() { System.out.print(\"S\"); }\n}\npublic class Test {\n    public static void main(String[] args) {\n        Vehicle myCar = new Sedan();\n    }\n}",
                    "options": [
                              "S",
                              "V-S",
                              "V-",
                              "Compile-time error: Vehicle is abstract and cannot run a constructor"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Even though Vehicle cannot be instantiated with 'new Vehicle()', its constructor executes as part of constructing the Sedan object via constructor chaining, printing 'V-S'. (مشيد الفئة المجردة Vehicle ينفذ كجزء من سلسلة مشيدات كائن Sedan فيطبع 'V-S')."
          },
          {
                    "id": "q14",
                    "question": "Given:\n\nabstract class Document {\n    abstract void export();\n}\nclass PdfDocument extends Document {\n    void export() { System.out.print(\"PDF \"); }\n}\nclass WordDocument extends Document {\n    void export() { System.out.print(\"DOC \"); }\n}\n\nWhat is printed by: 'Document doc = new PdfDocument(); doc.export();'?",
                    "options": [
                              "PDF ",
                              "DOC ",
                              "Document ",
                              "Compile-time error: cannot assign PdfDocument to Document"
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! Using an abstract class reference (Document doc) to hold a concrete subtype instance (PdfDocument) demonstrates runtime polymorphism: calling doc.export() invokes PdfDocument's export() method. (استخدام مرجع الفئة المجردة لحمل كائن فرعي يطبق تعدد الأشكال ويستدعي دالة PDF بنجاح)."
          },
          {
                    "id": "q15",
                    "question": "When should an architect choose an Abstract Class instead of an Interface in Java?\n(متى يفضل المعماري اختيار الفئة المجردة بدلاً من الواجهة Interface في جافا؟)",
                    "options": [
                              "Whenever multiple inheritance is required.",
                              "When closely related classes need to share state (non-static mutable fields), constructors, or non-public common implementations in a clear 'is-a' hierarchy.",
                              "Whenever lambda expressions will be used.",
                              "Whenever all methods are public."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Abstract classes are ideal for an 'is-a' relationship among closely related classes that need shared mutable state, constructors, and protected/private helper methods. Interfaces are better for defining contractual capabilities ('can-do') across unrelated classes. (تُفضل الفئات المجردة عندما تشترك الفئات في حالة ومتغيرات ومشيدات وعلاقة 'هو نوع من' is-a واضحة)."
          }
        ]
      }
    ]
  }
];
})();
