/**
 * Java Curriculum Module - Part 1
 * Topics:
 * 1. Java Classes / Objects
 * 2. Java Class Attributes
 * 
 * 100% Offline, Pure JavaScript. Complete educational content with full bilingual (English & Arabic) explanations.
 */

(function () {
  'use strict';

  window.JAVA_TOPICS_PART1 = [
    /* ==========================================================================
       TOPIC 1: Java Classes / Objects
       ========================================================================== */
    {
      id: "java-classes-objects",
      title: "1. Java Classes / Objects",
      description: "Fundamental principles of Object-Oriented Programming (OOP) in Java: Classes as blueprints, Objects as instances, heap memory allocation, and reference management.",
      lessons: [
        {
          id: "classes-objects-mastery",
          title: "Comprehensive Guide to Classes & Objects",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "Introduction to Classes and Objects (مقدمة في الأصناف والكائنات)"
            },
            {
              type: "paragraph",
              text: "Java is an Object-Oriented Programming (OOP) language where everything is associated with classes and objects. A class is a programmer-defined blueprint, prototype, or template from which individual objects are created. An object is a runtime instance of a class that holds actual state (data stored in fields) and exhibits behavior (actions performed through methods)."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "لغة جافا مبنية بالكامل على نموذج البرمجة كائنية التوجه (OOP). الصنف (Class) هو القالب أو المخطط الهندسي النظري المجرد، بينما الكائن (Object) هو الكيان الفعلي الحي الذي يتم إنشاؤه في ذاكرة الحاسوب (Heap Memory) بناءً على ذلك المخطط. يحتوي الكائن على خصائص محددة (الحالة - State) وسلوكيات يمارسها (السلوك - Behavior). كلمة 'new' هي المسؤولة عن حجز مساحة جديدة للكائن في الذاكرة."
            },
            {
              type: "paragraph",
              text: "When an object is instantiated using the 'new' keyword, memory is allocated on the Java Virtual Machine (JVM) Heap. The variable holding the object does not store the object directly; rather, it holds a reference (memory address pointer) to that object on the heap."
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
              text: "Example 1: Basic Class Definition & Object Instantiation (المثال 1: إنشاء فئة وكائن أساسي)"
            },
            {
              type: "paragraph",
              text: "Beginner: Defining a simple Car class with attributes and creating a single instance in main()."
            },
            {
              type: "code",
              language: "java",
              filename: "CarExample.java",
              code: `public class CarExample {
    // Blueprint / Class definition
    static class Car {
        String brand = "Tesla";
        int year = 2024;
    }

    public static void main(String[] args) {
        // Instantiating an object of class Car
        Car myCar = new Car();

        // Accessing object fields
        System.out.println("Brand: " + myCar.brand);
        System.out.println("Model Year: " + myCar.year);
    }
}`,
              output: `Brand: Tesla
Model Year: 2024`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "Car is our template defining two fields. In main(), 'new Car()' creates an instance on the heap, and the reference is assigned to variable 'myCar'. The dot operator (.) is used to access its fields."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "هنا قمنا بإنشاء صنف اسمه Car يحتوي على متغيرين. في الدالة الرئيسية، استخدمنا 'new Car()' لإنشاء كائن جديد في الذاكرة وخزنا عنوانه في المتغير 'myCar'. نستخدم علامة النقطة (.) للوصول إلى خصائص الكائن."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Multiple Independent Objects (المثال 2: كائنات متعددة ومستقلة)"
            },
            {
              type: "paragraph",
              text: "Demonstrating that each object instance maintains its own separate copy of instance variables."
            },
            {
              type: "code",
              language: "java",
              filename: "StudentTest.java",
              code: `public class StudentTest {
    static class Student {
        String name;
        int age;
    }

    public static void main(String[] args) {
        Student s1 = new Student();
        s1.name = "Amina";
        s1.age = 21;

        Student s2 = new Student();
        s2.name = "Zaid";
        s2.age = 23;

        System.out.println("Student 1: " + s1.name + " (" + s1.age + ")");
        System.out.println("Student 2: " + s2.name + " (" + s2.age + ")");
    }
}`,
              output: `Student 1: Amina (21)
Student 2: Zaid (23)`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "s1 and s2 point to two distinct locations in heap memory. Modifying s1.name has zero impact on s2.name because instance variables belong solely to their respective object instances."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "الكائنان s1 و s2 مستقلان تماماً في الذاكرة. تغيير اسم أو عمر الطالب الأول لا يؤثر بتاتاً على بيانات الطالب الثاني، فلكل كائن مساحته المعزولة الخاصة."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Anonymous Objects (المثال 3: الكائنات المجهولة/غير المسماة)"
            },
            {
              type: "paragraph",
              text: "Creating an object without binding it to a reference variable for one-time execution."
            },
            {
              type: "code",
              language: "java",
              filename: "AnonymousDemo.java",
              code: `public class AnonymousDemo {
    static class Greeter {
        void sayHello(String recipient) {
            System.out.println("Hello, " + recipient + "! Welcome to Java.");
        }
    }

    public static void main(String[] args) {
        // An anonymous object has no reference variable name
        new Greeter().sayHello("Learner");

        // Immediately eligible for Garbage Collection after invocation
    }
}`,
              output: `Hello, Learner! Welcome to Java.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "'new Greeter().sayHello(...)' allocates the object, invokes the method, and immediately leaves it unreachable. The JVM garbage collector will reclaim this heap memory automatically."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "الكائن غير المسمى (Anonymous Object) يُنشأ بدون تخصيص اسم متغير له للاستخدام لمرة واحدة فقط، وبعد انتهاء السطر يصبح مؤهلاً فوراً لمجمع النفايات (Garbage Collector) لتفريغ الذاكرة."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Reference Assignment and Memory Aliasing (المثال 4: إسناد المراجع والتشابه في الذاكرة)"
            },
            {
              type: "paragraph",
              text: "Understanding that reference variables copy memory addresses, not the underlying objects."
            },
            {
              type: "code",
              language: "java",
              filename: "ReferenceAliasing.java",
              code: `public class ReferenceAliasing {
    static class Account {
        double balance = 500.0;
    }

    public static void main(String[] args) {
        Account acc1 = new Account();
        Account acc2 = acc1; // acc2 copies the reference, NOT the object!

        acc2.balance += 250.0; // Modified through acc2

        System.out.println("acc1 Balance: $" + acc1.balance);
        System.out.println("acc2 Balance: $" + acc2.balance);
        System.out.println("Are both references identical? " + (acc1 == acc2));
    }
}`,
              output: `acc1 Balance: $750.0
acc2 Balance: $750.0
Are both references identical? true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "Assigning acc1 to acc2 copies the 64-bit reference address. Both acc1 and acc2 now point to the exact same object in the heap. Modifying the state via acc2 is immediately reflected when accessing via acc1."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "عند كتابة acc2 = acc1 فنحن لا ننسخ الكائن نفسه، بل ننسخ عنوانه في الذاكرة فقط. الآن يشير المتغيران إلى نفس الكائن تماماً في Heap، وأي تعديل من خلال acc2 سيظهر فوراً عبر acc1."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Null References & NullPointerException (المثال 5: المراجع الفارغة واستثناء المؤشر الفارغ)"
            },
            {
              type: "paragraph",
              text: "Demonstrating unassigned reference variables and safe null checking."
            },
            {
              type: "code",
              language: "java",
              filename: "NullSafetyDemo.java",
              code: `public class NullSafetyDemo {
    static class Device {
        String model = "Router-X1";
        void restart() {
            System.out.println(model + " is rebooting...");
        }
    }

    public static void main(String[] args) {
        Device dev = null; // References nothing in heap

        // Defensive null check prevents NullPointerException
        if (dev != null) {
            dev.restart();
        } else {
            System.out.println("Notice: Device reference is currently null.");
        }

        // Initialize it properly
        dev = new Device();
        dev.restart();
    }
}`,
              output: `Notice: Device reference is currently null.
Router-X1 is rebooting...`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "A reference set to null points nowhere. Invoking methods on a null reference crashes the program with NullPointerException. Always check against null or ensure initialization before invoking members."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "القيمة null تعني أن المتغير المرجعي لا يشير إلى أي مساحة في الذاكرة. محاولة استدعاء دالة على متغير قيمته null تسبب خطأ NullPointerException القاتل، لذلك يجب التحقق دائماً قبل الاستدعاء."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Passing Objects to Methods (المثال 6: تمرير الكائنات إلى الدوال)"
            },
            {
              type: "paragraph",
              text: "Java is strictly pass-by-value; passing an object reference passes a copy of the pointer."
            },
            {
              type: "code",
              language: "java",
              filename: "PassObjectDemo.java",
              code: `public class PassObjectDemo {
    static class Box {
        int width;
        int height;
    }

    static void resizeBox(Box b, int newW, int newH) {
        b.width = newW;
        b.height = newH;
    }

    public static void main(String[] args) {
        Box myBox = new Box();
        myBox.width = 10;
        myBox.height = 20;

        System.out.println("Before: " + myBox.width + "x" + myBox.height);
        resizeBox(myBox, 50, 80);
        System.out.println("After: " + myBox.width + "x" + myBox.height);
    }
}`,
              output: `Before: 10x20
After: 50x80`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "The reference address of myBox is passed by value to the method parameter 'b'. Because parameter 'b' references the exact same heap memory, mutations inside resizeBox persist on myBox."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "تمرير الكائن للدالة يمرر نسخة من عنوانه المرجعي. وبالتالي فإن التعديل على الحقول الداخلية للكائن داخل الدالة يغير الكائن الأصلي مباشرة في الذاكرة."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Returning Objects from Methods (المثال 7: إرجاع الكائنات من الدوال)"
            },
            {
              type: "paragraph",
              text: "Implementing a factory method pattern that constructs and returns configured objects."
            },
            {
              type: "code",
              language: "java",
              filename: "FactoryDemo.java",
              code: `public class FactoryDemo {
    static class Coordinate {
        int x;
        int y;
    }

    // Factory method creates, sets up, and returns a Coordinate object
    static Coordinate createPoint(int x, int y) {
        Coordinate c = new Coordinate();
        c.x = x;
        c.y = y;
        return c;
    }

    public static void main(String[] args) {
        Coordinate origin = createPoint(0, 0);
        Coordinate target = createPoint(100, 250);

        System.out.println("Origin: (" + origin.x + ", " + origin.y + ")");
        System.out.println("Target: (" + target.x + ", " + target.y + ")");
    }
}`,
              output: `Origin: (0, 0)
Target: (100, 250)`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "The method createPoint creates an object in heap memory and returns its address to the caller. The object survives method exit because a valid reference is preserved in main()."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "تنشئ الدالة كائناً جديداً في الذاكرة وترجع مرجعه إلى المتغير المستلم. يستمر الكائن حياً في الذاكرة طالما يوجد متغير في البرنامج يشير إليه."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Array of Objects (المثال 8: مصفوفات الكائنات)"
            },
            {
              type: "paragraph",
              text: "Creating and initializing an array of object references."
            },
            {
              type: "code",
              language: "java",
              filename: "ObjectArrayDemo.java",
              code: `public class ObjectArrayDemo {
    static class Book {
        String title;
        double price;
    }

    public static void main(String[] args) {
        // Creates array of 3 references (all initially null!)
        Book[] library = new Book[3];

        // Instantiate each slot individually
        library[0] = new Book();
        library[0].title = "Java Clean Architecture";
        library[0].price = 45.99;

        library[1] = new Book();
        library[1].title = "Data Structures in Java";
        library[1].price = 38.50;

        library[2] = new Book();
        library[2].title = "JVM Internals";
        library[2].price = 52.00;

        for (int i = 0; i < library.length; i++) {
            System.out.println("#" + (i + 1) + ": " + library[i].title + " - $" + library[i].price);
        }
    }
}`,
              output: `#1: Java Clean Architecture - $45.99
#2: Data Structures in Java - $38.50
#3: JVM Internals - $52.0`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "'new Book[3]' does NOT instantiate 3 Book objects; it only creates an array holding 3 null references. You must explicitly instantiate each index with 'new Book()' before accessing fields."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "إنشاء مصفوفة 'new Book[3]' يحجز فقط أماكن لثلاثة مؤشرات فارغة (null). يلزم استخدام 'new Book()' لكل خانة بالمصفوفة بشكل مستقل لتفادي NullPointerException."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Object Composition - 'Has-A' Relationship (المثال 9: تكوين الكائنات وعلاقة التضمين)"
            },
            {
              type: "paragraph",
              text: "An object containing a reference to another object as one of its attributes."
            },
            {
              type: "code",
              language: "java",
              filename: "CompositionDemo.java",
              code: `public class CompositionDemo {
    static class Engine {
        int horsepower;
        String type;
    }

    static class Vehicle {
        String model;
        Engine engine; // Reference to another object
    }

    public static void main(String[] args) {
        Vehicle v = new Vehicle();
        v.model = "Interceptor Sedan";

        // Instantiating the internal component
        v.engine = new Engine();
        v.engine.horsepower = 340;
        v.engine.type = "V6 Twin-Turbo";

        System.out.println("Vehicle: " + v.model);
        System.out.println("Engine: " + v.engine.type + " (" + v.engine.horsepower + " HP)");
    }
}`,
              output: `Vehicle: Interceptor Sedan
Engine: V6 Twin-Turbo (340 HP)`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "Composition represents a 'Has-A' relationship. A Vehicle has an Engine. The Vehicle object holds a reference field pointing to the Engine object on the heap, demonstrating modular software design."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "التكوين (Composition) يمثل علاقة 'يمتلك' (Has-A)، حيث يحتوي كائن المركبة على متغير مرجعي يشير إلى كائن المحرك. هذا المفهوم أساسي لبناء أنظمة برمجية معيارية قابلة لإعادة الاستخدام."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Dynamic State Mutation & Verification (المثال 10: تغيير الحالة الديناميكي والتحقق)"
            },
            {
              type: "paragraph",
              text: "Tracking internal state transitions over time as actions take place on an object."
            },
            {
              type: "code",
              language: "java",
              filename: "BankAccountLifecycle.java",
              code: `public class BankAccountLifecycle {
    static class Account {
        String owner;
        double balance;
        int transactionCount;

        void deposit(double amount) {
            if (amount > 0) {
                balance += amount;
                transactionCount++;
                System.out.println("Deposited $" + amount + " | New Balance: $" + balance);
            }
        }

        void withdraw(double amount) {
            if (amount > 0 && amount <= balance) {
                balance -= amount;
                transactionCount++;
                System.out.println("Withdrew $" + amount + " | Remaining: $" + balance);
            } else {
                System.out.println("Transaction declined: Insufficient funds.");
            }
        }
    }

    public static void main(String[] args) {
        Account myAcc = new Account();
        myAcc.owner = "Karim";
        myAcc.balance = 1000.0;

        myAcc.deposit(350.0);
        myAcc.withdraw(200.0);
        myAcc.withdraw(1500.0); // Fails gracefully

        System.out.println("Total transactions for " + myAcc.owner + ": " + myAcc.transactionCount);
    }
}`,
              output: `Deposited $350.0 | New Balance: $1350.0
Withdrew $200.0 | Remaining: $1150.0
Transaction declined: Insufficient funds.
Total transactions for Karim: 2`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "An object encapsulates both mutable state (balance, transactionCount) and the business logic that governs that state. Notice how invalid operations are safely rejected."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "يجمع الكائن بين البيانات وقواعد العمل المنطقية التي تتحكم بها. يتم تحديث الرصيد وعدد العمليات عند الإيداع والسحب مع حماية الكائن من العمليات غير الصحيحة."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Reference Equality (==) vs Logical Equality (.equals()) (المثال 11: مقارنة المراجع مقابل مقارنة المحتوى)"
            },
            {
              type: "paragraph",
              text: "Advanced: Distinguishing whether two references point to the same memory slot versus two separate objects with identical data."
            },
            {
              type: "code",
              language: "java",
              filename: "ObjectEqualityDemo.java",
              code: `public class ObjectEqualityDemo {
    static class Point {
        int x;
        int y;

        // Custom logical equality method
        boolean isEqualTo(Point other) {
            if (other == null) return false;
            return this.x == other.x && this.y == other.y;
        }
    }

    public static void main(String[] args) {
        Point p1 = new Point();
        p1.x = 10;
        p1.y = 20;

        Point p2 = new Point();
        p2.x = 10;
        p2.y = 20;

        Point p3 = p1; // Alias to p1

        System.out.println("p1 == p2 (Same memory address?): " + (p1 == p2));
        System.out.println("p1 == p3 (Same memory address?): " + (p1 == p3));
        System.out.println("p1 logical equals p2? " + p1.isEqualTo(p2));
    }
}`,
              output: `p1 == p2 (Same memory address?): false
p1 == p3 (Same memory address?): true
p1 logical equals p2? true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "The '==' operator strictly compares memory addresses on the stack. Even though p1 and p2 hold identical coordinates, they reside at separate heap addresses, making 'p1 == p2' false. Logical content comparison requires custom inspection."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "المعامل '==' يقارن فقط العناوين في الذاكرة، ولا يقارن المحتويات! بالرغم من أن p1 و p2 يحملان نفس الإحداثيات، إلا أنهما كائنان منفصلان تماماً في الذاكرة، لذلك نتيجتهما false، بينما p1 == p3 ترجع true لأنهما نفس العنوان."
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
                "Mistake 1: Forgetting that 'new' is required to allocate memory. Declaring 'Car c;' merely allocates a null reference pointer on the stack, not a Car object.",
                "خطأ 1: نسيان كلمة 'new'. كتابة 'Car c;' تحجز فقط متغيراً فارغاً بقيمة null ولا تنشئ أي كائن في الذاكرة.",
                "Mistake 2: Calling methods on null references triggers NullPointerException. Always instantiate before usage.",
                "خطأ 2: محاولة استدعاء دوال على كائن قيمته null مما يؤدي إلى توقف البرنامج بـ NullPointerException.",
                "Mistake 3: Assuming reference assignment copies the object. 'b = a' shares the object; modifying 'b' modifies 'a'.",
                "خطأ 3: الاعتقاد بأن 'b = a' ينسخ الكائن، بينما في الحقيقة هو ينسخ العنوان المرجعي فقط، وأي تعديل على أحدهما سيغير الآخر.",
                "Note: In Java, class names follow UpperCamelCase convention (e.g., BankAccount, OrderManager), while object reference variables follow lowerCamelCase (e.g., myCar, activeUser)."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Smartphone Battery Simulator (التحدي العملي: محاكي بطارية الهاتف)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Create a class named Smartphone with fields: 'brand' (String) and 'batteryPercent' (int, 0 to 100). Implement a method 'useApp(String appName, int drain)' that deducts battery percentage and warns if battery is depleted (<= 0). In main(), instantiate two different smartphones, run separate apps on each, and observe independent battery states."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: قم بإنشاء صنف اسمه Smartphone يحتوي على حقلين: brand (اسم الماركة) و batteryPercent (نسبة البطارية من 0 إلى 100). أضف دالة اسمها useApp تقبل اسم التطبيق ونسبة الاستنزاف وتقوم بالخصم والتحذير إذا نفدت البطارية. في الدالة main، أنشئ هاتفين مختلفين واستهلك بطارية كل منهما بشكل مستقل."
            },
            {
              type: "code",
              language: "java",
              filename: "SmartphoneChallenge.java",
              code: `public class SmartphoneChallenge {
    static class Smartphone {
        String brand;
        int batteryPercent = 100;

        void useApp(String appName, int drain) {
            if (batteryPercent <= 0) {
                System.out.println(brand + ": Cannot open " + appName + ", battery is empty!");
                return;
            }
            batteryPercent -= drain;
            if (batteryPercent < 0) batteryPercent = 0;
            System.out.println(brand + " ran " + appName + " (-" + drain + "%). Remaining: " + batteryPercent + "%");
        }
    }

    public static void main(String[] args) {
        Smartphone phoneA = new Smartphone();
        phoneA.brand = "Galaxy Ultra";

        Smartphone phoneB = new Smartphone();
        phoneB.brand = "Pixel Pro";

        phoneA.useApp("Maps Navigation", 35);
        phoneB.useApp("Music Streaming", 15);
        phoneA.useApp("Video Rendering", 70);
        phoneA.useApp("Camera", 10); // Depleted check
    }
}`,
              output: `Galaxy Ultra ran Maps Navigation (-35%). Remaining: 65%
Pixel Pro ran Music Streaming (-15%). Remaining: 85%
Galaxy Ultra ran Video Rendering (-70%). Remaining: 0%
Galaxy Ultra: Cannot open Camera, battery is empty!`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "Each Smartphone object maintains its own batteryPercent state on the heap. Running apps on phoneA reduces only phoneA's battery, leaving phoneB completely unaffected."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "كل كائن من فئة Smartphone يحتفظ بحالة بطاريته الخاصة في الذاكرة. استخدام التطبيقات على الهاتف phoneA خفض بطاريته هو فقط دون المساس ببطارية الهاتف phoneB."
            }
          ],
          quiz: [
            {
              id: "q1",
              question: "What is the primary architectural difference between a Class and an Object in Java? (ما الفرق المعماري الأساسي بين الصنف والكائن في جافا؟)",
              options: [
                "A Class is an active runtime memory block on the stack, while an Object is compiled source code.",
                "A Class is a compile-time blueprint/template, while an Object is a dynamic instance allocated on the JVM Heap with actual state.",
                "Classes and Objects are identical synonyms and occupy the exact same memory space.",
                "An Object cannot contain methods, only classes can execute logic."
              ],
              correctIndex: 1,
              explanation: "Correct! A Class is the conceptual blueprint defining data structure and behaviors, while an Object is the concrete entity allocated in JVM Heap memory at runtime using the 'new' keyword. (الصنف هو القالب النظري، بينما الكائن هو النسخة الفعلية المحجوزة في ذاكرة الـ Heap)."
            },
            {
              id: "q2",
              question: "Consider this code:\nCar c1 = new Car();\nc1.speed = 40;\nCar c2 = c1;\nc2.speed = 95;\nSystem.out.println(c1.speed);\nWhat is printed to the console? (ما هي المخرجات المطبوعة على الشاشة؟)",
              options: [
                "40",
                "95",
                "0",
                "Compilation error: cannot assign c1 to c2"
              ],
              correctIndex: 1,
              explanation: "Correct! In Java, reference assignment ('c2 = c1') copies the memory pointer, not the underlying object. Both c1 and c2 reference the exact same object in heap memory, so updating c2.speed modifies c1.speed to 95. (إسناد المراجع ينسخ مؤشر العنوان فقط، لذا يشير المتغيران لنفس الكائن تماماً في الذاكرة)."
            },
            {
              id: "q3",
              question: "When executing 'Car myCar = new Car();' inside a method, where are 'myCar' and the created Car object stored in JVM memory? (أين يتم تخزين المتغير والكائن في الذاكرة؟)",
              options: [
                "Both 'myCar' and the Car instance are stored in the JVM Metaspace.",
                "Both 'myCar' and the Car instance are allocated directly on the thread Call Stack.",
                "The reference variable 'myCar' is stored on the Call Stack, while the Car instance is allocated on the JVM Heap.",
                "The reference variable 'myCar' is on the Heap, while the Car instance is in CPU cache."
              ],
              correctIndex: 2,
              explanation: "Correct! Local reference variables live on the thread Call Stack, holding memory addresses that point to the actual object instances allocated dynamically on the JVM Heap. (المتغير المرجعي المحلي يُخزن في مكدس النداء Stack بينما الكائن الفعلي يُنشأ في الـ Heap)."
            },
            {
              id: "q4",
              question: "What happens when executing the following snippet?\nCar[] fleet = new Car[3];\nfleet[0].speed = 60;",
              options: [
                "The first car's speed is successfully updated to 60.",
                "A NullPointerException is thrown at runtime.",
                "An ArrayIndexOutOfBoundsException is thrown at runtime.",
                "A compile-time error occurs because arrays cannot hold objects."
              ],
              correctIndex: 1,
              explanation: "Correct! Allocating an object array ('new Car[3]') initializes all array slots to null. Attempting to dereference fleet[0] before instantiating it with 'new Car()' throws a NullPointerException. (إنشاء مصفوفة كائنات يملأ عناصرها بقيمة null افتراضياً، ومحاولة الوصول لحقل قبل استخدام new تسبب NullPointerException)."
            },
            {
              id: "q5",
              question: "Analyze this method and invocation:\nstatic void modifyCar(Car c) {\n    c.speed = 80;\n    c = new Car();\n    c.speed = 120;\n}\n// In main:\nCar auto = new Car();\nauto.speed = 20;\nmodifyCar(auto);\nSystem.out.println(auto.speed);\nWhat does main print? (ما الذي ستطبعه الدالة main؟)",
              options: [
                "20",
                "80",
                "120",
                "0"
              ],
              correctIndex: 1,
              explanation: "Correct! Java is strictly pass-by-value. The method receives a copy of the reference address. 'c.speed = 80' mutates the original object on the heap. However, 'c = new Car()' only rebinds the local parameter 'c' to a new object, leaving the caller's 'auto' reference pointing to the modified original with speed = 80. (تمرير المرجع بالقيمة يسمح بتعديل حقول الكائن الأصلي، لكن إعادة توجيه المعامل لكائن جديد لا تؤثر على المتغير في الدالة المستدعية)."
            },
            {
              id: "q6",
              question: "What is an 'anonymous object' in Java, and when does it become eligible for Garbage Collection? (ما هو الكائن المجهول ومتى يصبح مؤهلاً لجمع المهملات؟)\nExample: new Printer().print(\"Invoice\");",
              options: [
                "An object without methods; it stays permanently in RAM.",
                "An object instantiated without assigning it to a reference variable; it becomes eligible for GC immediately after statement execution.",
                "An object created without using the 'new' keyword.",
                "An object declared inside a static initialization block."
              ],
              correctIndex: 1,
              explanation: "Correct! An anonymous object is created via 'new ClassName()' without storing its reference in a named variable. Because no reference remains after the statement finishes, it becomes eligible for Garbage Collection immediately. (الكائن المجهول يُنشأ دون حفظ مرجعه في متغير، ويصبح متاحاً لجمع المهملات فور انتهاء السطر)."
            },
            {
              id: "q7",
              question: "Consider this code:\nPoint p1 = new Point(5, 5);\nPoint p2 = new Point(5, 5);\nSystem.out.println(p1 == p2);\nWhat is printed and why? (ما هي المخرجات ولماذا؟)",
              options: [
                "true, because both points have identical field coordinates (5, 5).",
                "false, because '==' checks reference memory identity, and p1 and p2 reside at different heap addresses.",
                "true, because the compiler interned the two objects into a shared memory pool.",
                "A compile-time error occurs because '==' cannot be applied to objects."
              ],
              correctIndex: 1,
              explanation: "Correct! The '==' operator evaluates reference equality (memory addresses on the heap). Because 'new' was called twice, p1 and p2 hold distinct heap addresses, making 'p1 == p2' false. Logical content equality requires an overridden .equals() method. (المعامل '==' يقارن عناوين الذاكرة لكائنين مستقلين تم إنشاؤهما بـ new، وبالتالي النتيجة false)."
            },
            {
              id: "q8",
              question: "What occurs when attempting to compile and run this code?\nCar c;\nc.speed = 70;\nSystem.out.println(c.speed);",
              options: [
                "Prints 70.",
                "Throws a NullPointerException at runtime.",
                "Compile-time error: local variable 'c' might not have been initialized.",
                "Prints 0 because uninitialized variables default to 0."
              ],
              correctIndex: 2,
              explanation: "Correct! Local variables declared inside methods do NOT receive default values. Attempting to use local reference variable 'c' before initializing it causes a compilation failure: 'variable c might not have been initialized'. (المتغيرات المحلية داخل الدوال لا تحصل على قيم افتراضية ويؤدي استخدامها دون تهيئة لخطأ تصريف)."
            },
            {
              id: "q9",
              question: "Why is 'if (car != null && car.speed > 50)' safe from throwing a NullPointerException when car is null, whereas 'if (car.speed > 50 && car != null)' is dangerous?",
              options: [
                "Because Java reorders boolean conditions randomly at runtime.",
                "Because '&&' is a short-circuit operator: if 'car != null' is false, evaluation halts immediately before evaluating 'car.speed'.",
                "Because the second expression automatically instantiates a default car.",
                "There is no difference; both are equally safe in Java."
              ],
              correctIndex: 1,
              explanation: "Correct! The logical AND operator '&&' short-circuits. If the left operand ('car != null') is false, the right operand is never evaluated, safely preventing a NullPointerException. In the reversed order, 'car.speed' is evaluated first, immediately dereferencing null. (خاصية الاختصار في المعامل && توقف الفحص بمجرد أن يكون الطرف الأيسر false، مما يحمي من استثناء المؤشر الفارغ)."
            },
            {
              id: "q10",
              question: "Examine this composition ('Has-A') relationship:\nclass Engine { int hp = 150; }\nclass Car { Engine engine = new Engine(); }\n// In main:\nCar c1 = new Car();\nCar c2 = new Car();\nc1.engine.hp = 300;\nSystem.out.println(c2.engine.hp);\nWhat is printed? (ما الذي ستطبعه الدالة main؟)",
              options: [
                "300, because the Engine is shared between both cars.",
                "150, because each Car instance instantiates its own distinct Engine object on the heap.",
                "0, because uninitialized numbers default to zero.",
                "NullPointerException"
              ],
              correctIndex: 1,
              explanation: "Correct! Each 'new Car()' instantiates its own independent 'Engine' object on the heap. Mutating c1's engine has zero impact on c2's engine, which retains its default 150 hp. (كل كائن سيارة يمتلك كائن محرك منفصل تماماً في الذاكرة، فتعديل محرك الأولى لا يؤثر على الثانية)."
            },
            {
              id: "q11",
              question: "How many Car objects are eligible for Garbage Collection after line 4 executes?\n1: Car a = new Car();\n2: Car b = new Car();\n3: a = b;\n4: b = null;",
              options: [
                "0 objects",
                "1 object",
                "2 objects",
                "Neither object, because JVM keeps all created objects forever."
              ],
              correctIndex: 1,
              explanation: "Correct! Line 1 creates object #1 (referenced by a). Line 2 creates object #2 (referenced by b). Line 3 reassigns 'a' to object #2, leaving object #1 with zero references pointing to it. Line 4 clears 'b', but object #2 is still referenced by 'a'. Thus, exactly 1 object (object #1) is eligible for Garbage Collection. (الكائن الأول أصبح بلا أي مرجع يشير إليه عند السطر 3، بينما الكائن الثاني لا يزال ممسوكاً بالمرجع a، لذا كائن واحد فقط مؤهل للمسح)."
            },
            {
              id: "q12",
              question: "What does a factory method like 'public static Car buildSedan() { return new Car(); }' return to its caller?",
              options: [
                "A full duplicate clone of the class bytecode.",
                "A copy of the 32-bit or 64-bit memory reference pointing to the newly created Car on the heap.",
                "A string representation of the Car's memory address.",
                "An integer representing the Car's index in the garbage collector table."
              ],
              correctIndex: 1,
              explanation: "Correct! In Java, methods returning an object return a copy of the reference address pointing to that object on the JVM Heap. (تُرجع الدالة نسخة من عنوان الذاكرة المرجعي الذي يشير إلى الكائن المحجوز في الـ Heap)."
            },
            {
              id: "q13",
              question: "What happens when executing this code?\nstatic void inspect(Car c) {\n    System.out.println(\"Brand: \" + c.brand);\n}\n// In main:\ninspect(null);",
              options: [
                "Prints 'Brand: null'.",
                "Throws a NullPointerException when attempting to evaluate 'c.brand'.",
                "Compilation error: cannot pass null to a method expecting an object.",
                "The method exits silently without printing anything."
              ],
              correctIndex: 1,
              explanation: "Correct! Passing null is syntactically valid, but attempting to access member 'c.brand' on a null reference crashes at runtime with a java.lang.NullPointerException. (تمرير null مسموح برمجياً، لكن محاولة الوصول لأي حقل من مرجع قيمته null تسبب استثناء NullPointerException فوراً)."
            },
            {
              id: "q14",
              question: "Predict the output of the following tracking code:\nclass Counter { int count = 0; void inc() { count++; } }\n// In main:\nCounter c1 = new Counter();\nCounter c2 = c1;\nCounter c3 = c2;\nc1.inc();\nc2.inc();\nc3.inc();\nSystem.out.println(c1.count);",
              options: [
                "1",
                "2",
                "3",
                "0"
              ],
              correctIndex: 2,
              explanation: "Correct! c1, c2, and c3 all point to the exact same single Counter instance in heap memory. The three inc() calls each increment that single object's count field, giving 3. (تشير المتغيرات الثلاثة إلى نفس الكائن الوحيد، لذا فإن استدعاء inc ثلاث مرات ينتج عنه القيمة 3)."
            },
            {
              id: "q15",
              question: "What is the technical purpose of the dot operator ('.') when used with an object reference variable in Java (e.g., 'car.start()')?",
              options: [
                "It converts the object into a String.",
                "It dereferences the pointer, navigating to the allocated heap object to access its fields or invoke its methods.",
                "It forces the garbage collector to immediately inspect the object.",
                "It compiles the class bytecode into native machine instructions."
              ],
              correctIndex: 1,
              explanation: "Correct! The dot operator performs dereferencing: it follows the reference address held by the variable to the object's memory location in the heap to read/write attributes or execute member methods. (المعامل '.' يقوم بعملية فك المرجع Dereferencing للوصول إلى بيانات ودوال الكائن داخل الذاكرة)."
            }
          ]
        }
      ]
    },

    /* ==========================================================================
       TOPIC 2: Java Class Attributes
       ========================================================================== */
    {
      id: "java-class-attributes",
      title: "2. Java Class Attributes",
      description: "In-depth exploration of Class Attributes (Fields): Instance variables, default initialization values, final immutable fields, static class-level variables, and variable shadowing.",
      lessons: [
        {
          id: "class-attributes-mastery",
          title: "Mastering Class Attributes and Fields",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "Understanding Class Attributes / Fields (فهم خصائص الفئات وحقولها)"
            },
            {
              type: "paragraph",
              text: "Class attributes (also referred to as fields or instance variables) represent the data and state carried by a class and its objects. Unlike local variables declared inside methods, class attributes are automatically initialized with default values if not explicitly assigned."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "خصائص الفئة (Class Attributes / Fields) هي المتغيرات المعرفة على مستوى الصنف وخارج أي دالة. تمثل هذه الخصائص الحالة والبيانات التابعة للكائن. على عكس المتغيرات المحلية داخل الدوال التي تلزم تهيئتها يدوياً، تمنح جافا خصائص الفئة قيماً افتراضية تلقائية (الأرقام تبدأ بـ 0، والمتغيرات المنطقية بـ false، والمراجع بـ null)."
            },
            {
              type: "paragraph",
              text: "Key modifiers profoundly alter attribute behavior: 'final' locks the value after initial assignment creating an immutable field, while 'static' binds the attribute to the class itself so that all instances share a single unified memory location."
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
              text: "Example 1: Declaring and Accessing Attributes (المثال 1: تعريف الخصائص والوصول إليها)"
            },
            {
              type: "paragraph",
              text: "Declaring simple instance variables and reading them through an object reference."
            },
            {
              type: "code",
              language: "java",
              filename: "AttributesBasics.java",
              code: `public class AttributesBasics {
    static class Profile {
        String username = "alex_dev";
        int followersCount = 1420;
        boolean isVerified = true;
    }

    public static void main(String[] args) {
        Profile p = new Profile();
        System.out.println("Username: " + p.username);
        System.out.println("Followers: " + p.followersCount);
        System.out.println("Verified: " + p.isVerified);
    }
}`,
              output: `Username: alex_dev
Followers: 1420
Verified: true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "The Profile class declares three attributes with initial values. When Profile p is instantiated, memory is created for those variables on the heap."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "الصنف Profile يحدد ثلاثة حقول بقيم أولية. عند إنشاء الكائن p، يتم حجز مساحة في الذاكرة لتلك المتغيرات والوصول إليها عبر عامل النقطة."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Mutating Attributes Directly (المثال 2: تعديل الخصائص مباشرة)"
            },
            {
              type: "paragraph",
              text: "Overwriting initial attribute values across different runtime points."
            },
            {
              type: "code",
              language: "java",
              filename: "MutateAttributes.java",
              code: `public class MutateAttributes {
    static class Task {
        String title;
        int priority = 1;
    }

    public static void main(String[] args) {
        Task t = new Task();
        t.title = "Deploy Production Build";
        t.priority = 5; // Escalating priority

        System.out.println("Task: " + t.title + " [Priority Level: " + t.priority + "]");
    }
}`,
              output: `Task: Deploy Production Build [Priority Level: 5]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "Attribute values can be re-assigned directly through the object reference as long as they are accessible and not marked 'final'."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "يمكن تغيير قيم الخصائص في أي وقت طالما لم يتم وضع الكلمة 'final' أمامها."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Default Attribute Initialization Values (المثال 3: القيم الافتراضية التلقائية)"
            },
            {
              type: "paragraph",
              text: "Demonstrating the exact default values assigned to uninitialized fields in Java."
            },
            {
              type: "code",
              language: "java",
              filename: "DefaultValuesDemo.java",
              code: `public class DefaultValuesDemo {
    static class TypeDefaults {
        byte defaultByte;
        int defaultInt;
        long defaultLong;
        float defaultFloat;
        double defaultDouble;
        boolean defaultBoolean;
        char defaultChar;
        String defaultReference; // Any object reference
    }

    public static void main(String[] args) {
        TypeDefaults obj = new TypeDefaults();
        System.out.println("int: " + obj.defaultInt);
        System.out.println("double: " + obj.defaultDouble);
        System.out.println("boolean: " + obj.defaultBoolean);
        System.out.println("char: ['" + obj.defaultChar + "'] (Unicode \\u0000)");
        System.out.println("String/Object Reference: " + obj.defaultReference);
    }
}`,
              output: `int: 0
double: 0.0
boolean: false
char: [' '] (Unicode \\u0000)
String/Object Reference: null`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "Java guarantees default values for class fields: 0 for integer types, 0.0 for floating-point, false for boolean, '\\u0000' (null character) for char, and null for all reference types."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "تضمن لغة جافا تهيئة الخصائص غير المعينة بقيم افتراضية: الأعداد الصحيحة بـ 0، والأعداد العشرية بـ 0.0، والمنطقية بـ false، والمراجع بكافة أنواعها بـ null."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: The 'final' Keyword on Attributes (المثال 4: الكلمة المفتاحية final للثوابت)"
            },
            {
              type: "paragraph",
              text: "Preventing modification of an attribute once initialized."
            },
            {
              type: "code",
              language: "java",
              filename: "FinalAttributeDemo.java",
              code: `public class FinalAttributeDemo {
    static class ServerConfig {
        final String protocol = "HTTPS";
        final int port = 443;
        int timeoutSeconds = 30; // Not final, can be modified
    }

    public static void main(String[] args) {
        ServerConfig cfg = new ServerConfig();
        cfg.timeoutSeconds = 60; // Allowed

        // cfg.port = 8080; // COMPILATION ERROR: cannot assign a value to final variable port

        System.out.println("Server running on " + cfg.protocol + " on port " + cfg.port);
        System.out.println("Timeout: " + cfg.timeoutSeconds + " seconds");
    }
}`,
              output: `Server running on HTTPS on port 443
Timeout: 60 seconds`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "Marking an attribute 'final' makes it read-only after initialization. Any subsequent assignment causes a compile-time error, protecting critical settings from accidental modification."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "وضع كلمة 'final' أمام الخاصية يجعلها ثابتة ولا يمكن تغيير قيمتها بعد تعيينها لأول مرة. محاولة إعادة تعيينها تسبب خطأً فورياً أثناء تصريف الكود (Compile-time error)."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Blank Final Attributes (المثال 5: الثوابت غير المهيأة فوراً)"
            },
            {
              type: "paragraph",
              text: "A final attribute that is left unassigned at declaration and initialized inside a constructor."
            },
            {
              type: "code",
              language: "java",
              filename: "BlankFinalDemo.java",
              code: `public class BlankFinalDemo {
    static class Transaction {
        final long transactionId; // Blank final: must be initialized in constructor
        double amount;

        Transaction(long id, double amt) {
            this.transactionId = id; // Allowed exactly once
            this.amount = amt;
        }
    }

    public static void main(String[] args) {
        Transaction tx1 = new Transaction(981102L, 450.0);
        Transaction tx2 = new Transaction(981103L, 120.5);

        System.out.println("TX1 ID: " + tx1.transactionId + " | Amount: $" + tx1.amount);
        System.out.println("TX2 ID: " + tx2.transactionId + " | Amount: $" + tx2.amount);
    }
}`,
              output: `TX1 ID: 981102 | Amount: $450.0
TX2 ID: 981103 | Amount: $120.5`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "A 'blank final' field allows each object to possess its own distinct immutable value, supplied at creation time during constructor execution."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "المتغير الثابت غير المهيأ (Blank Final) يسمح بتعيين قيمة ثابتة مخصصة لكل كائن أثناء استدعاء المشيد (Constructor)، وتظل ثابتة طوال عمر ذلك الكائن."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Static Class Attributes vs Instance Attributes (المثال 6: الخصائص الساكنة static مقابل خصائص النسخ)"
            },
            {
              type: "paragraph",
              text: "Demonstrating shared class-level state across all instances."
            },
            {
              type: "code",
              language: "java",
              filename: "StaticAttributeDemo.java",
              code: `public class StaticAttributeDemo {
    static class CounterDemo {
        static int globalCount = 0; // Shared across all instances
        int instanceCount = 0;      // Unique to each instance

        void increment() {
            globalCount++;
            instanceCount++;
        }
    }

    public static void main(String[] args) {
        CounterDemo c1 = new CounterDemo();
        CounterDemo c2 = new CounterDemo();

        c1.increment();
        c1.increment();
        c2.increment();

        System.out.println("c1 instance count: " + c1.instanceCount);
        System.out.println("c2 instance count: " + c2.instanceCount);
        System.out.println("Shared Global Count: " + CounterDemo.globalCount);
    }
}`,
              output: `c1 instance count: 2
c2 instance count: 1
Shared Global Count: 3`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "The 'static' keyword allocates a single variable tied to the class in the Metaspace/Class area. Both c1 and c2 access the same globalCount, whereas instanceCount is copied for each object."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "الكلمة 'static' تجعل الخاصية مشتركة بين جميع الكائنات المحجوزة من هذا الصنف. يوجد مكان واحد فقط في الذاكرة لـ globalCount، في حين يمتلك كل كائن نسخته المستقلة من instanceCount."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Public Static Final Constants (المثال 7: الثوابت العامة الساكنة)"
            },
            {
              type: "paragraph",
              text: "Best practice for global application-wide constant values."
            },
            {
              type: "code",
              language: "java",
              filename: "MathConstants.java",
              code: `public class MathConstants {
    static class Physics {
        public static final double SPEED_OF_LIGHT = 299792458.0; // m/s
        public static final double STANDARD_GRAVITY = 9.80665;    // m/s^2
    }

    public static void main(String[] args) {
        // Accessed directly via ClassName.CONSTANT_NAME (no object needed!)
        System.out.println("Speed of Light: " + Physics.SPEED_OF_LIGHT + " m/s");
        System.out.println("Standard Gravity: " + Physics.STANDARD_GRAVITY + " m/s^2");
    }
}`,
              output: `Speed of Light: 2.99792458E8 m/s
Standard Gravity: 9.80665 m/s^2`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "'public static final' defines universal constants in Java. By convention, constant names are written in UPPERCASE_WITH_UNDERSCORES. They require zero object instantiation."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "يُستخدم 'public static final' لتعريف الثوابت العامة المشتركة. حسب المعايير القياسية في جافا، تُكتب أسماء الثوابت بأحرف كبيرة مفصولة بشرطة سفلية (UPPERCASE) ويتم الوصول إليها باسم الصنف مباشرة دون إنشاء كائن."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Variable Shadowing (المثال 8: حجب المتغيرات بواسطة المتغيرات المحلية)"
            },
            {
              type: "paragraph",
              text: "When a local method parameter has the exact same identifier as a class attribute."
            },
            {
              type: "code",
              language: "java",
              filename: "ShadowingDemo.java",
              code: `public class ShadowingDemo {
    static class User {
        int age = 20;

        void updateAgeBuggy(int age) {
            age = age; // Shadows attribute! Has NO effect on this.age!
        }

        void updateAgeCorrect(int age) {
            this.age = age; // 'this.age' explicitly resolves to the class attribute
        }
    }

    public static void main(String[] args) {
        User u = new User();
        u.updateAgeBuggy(30);
        System.out.println("After Buggy Update: " + u.age);

        u.updateAgeCorrect(30);
        System.out.println("After Correct Update: " + u.age);
    }
}`,
              output: `After Buggy Update: 20
After Correct Update: 30`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "Inside updateAgeBuggy, the parameter 'age' shadows the class attribute 'age'. Assigning 'age = age' merely re-assigns the parameter to itself. Prefixing with 'this.age' correctly targets the instance attribute."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "الحجب (Shadowing) يحدث عندما يتطابق اسم المتغير المحلي مع اسم خاصية الفئة. السطر 'age = age' يسند المعامل لنفسه دون تعديل الكائن. استخدام 'this.age' يحل المشكلة بتحديد خاصية الكائن بدقة."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Static Reference Tracking and Instance Counting (المثال 9: تتبع عدد الكائنات النشطة)"
            },
            {
              type: "paragraph",
              text: "Using a static attribute to maintain a live tally of how many instances have been initialized."
            },
            {
              type: "code",
              language: "java",
              filename: "InstanceCounter.java",
              code: `public class InstanceCounter {
    static class Connection {
        private static int activeCount = 0;
        int connectionId;

        Connection() {
            activeCount++;
            this.connectionId = activeCount;
            System.out.println("Connection #" + connectionId + " established. Active total: " + activeCount);
        }

        static int getActiveCount() {
            return activeCount;
        }
    }

    public static void main(String[] args) {
        Connection c1 = new Connection();
        Connection c2 = new Connection();
        Connection c3 = new Connection();

        System.out.println("Final Active Connections: " + Connection.getActiveCount());
    }
}`,
              output: `Connection #1 established. Active total: 1
Connection #2 established. Active total: 2
Connection #3 established. Active total: 3
Final Active Connections: 3`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "Because activeCount is static, every time 'new Connection()' runs, the same shared counter increments. This pattern is commonly used for connection pools and unique auto-incrementing IDs."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "نظراً لأن activeCount متغير ساكن (static)، فإن كل عملية إنشاء لكائن تزيد نفس العداد المشترك. يُستخدم هذا النمط بشكل واسع لإنشاء معرفات تلقائية ومتابعة اتصالات قواعد البيانات."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Reference Type Attributes & Nested Mutation (المثال 10: خصائص من نوع مراجع وتعديلها الداخلي)"
            },
            {
              type: "paragraph",
              text: "How 'final' on an object reference preserves the reference pointer, but allows mutating the referenced object's internal fields."
            },
            {
              type: "code",
              language: "java",
              filename: "FinalReferenceDemo.java",
              code: `public class FinalReferenceDemo {
    static class Dimensions {
        int width = 100;
        int height = 50;
    }

    static class Window {
        final Dimensions dim = new Dimensions(); // Reference itself is immutable
    }

    public static void main(String[] args) {
        Window win = new Window();

        // Mutating internal properties of the referenced object is 100% ALLOWED:
        win.dim.width = 300;
        win.dim.height = 150;

        System.out.println("Window size: " + win.dim.width + "x" + win.dim.height);

        // win.dim = new Dimensions(); // COMPILATION ERROR: cannot assign a value to final variable dim
    }
}`,
              output: `Window size: 300x150`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "A 'final' reference variable prevents re-pointing the variable to another object in memory. However, it does NOT make the referenced object's internal fields immutable unless they too are marked final."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "كلمة 'final' على متغير مرجعي تمنع فقط تغيير المؤشر ليشير لكائن آخر، لكنها لا تمنع تعديل الخصائص الداخلية للكائن نفسه."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Multi-Attribute Entity with Validation Guard (المثال 11: كيان متعدد الخصائص مع حراسة التحقق)"
            },
            {
              type: "paragraph",
              text: "Advanced: Building a comprehensive Product entity combining final IDs, static company tags, and validated instance fields."
            },
            {
              type: "code",
              language: "java",
              filename: "ProductEntity.java",
              code: `public class ProductEntity {
    static class Product {
        public static final String CURRENCY = "USD";
        final String sku;
        String name;
        double price;
        int stockQuantity;

        Product(String sku, String name, double price, int stock) {
            this.sku = sku;
            this.name = name;
            this.price = Math.max(0.0, price);
            this.stockQuantity = Math.max(0, stock);
        }

        void printSummary() {
            System.out.println("[" + sku + "] " + name + " | Price: " + price + " " + CURRENCY + " | Stock: " + stockQuantity);
        }
    }

    public static void main(String[] args) {
        Product p1 = new Product("SKU-9021", "Mechanical Keyboard", 89.99, 15);
        Product p2 = new Product("SKU-9022", "Gaming Mouse", -25.00, -5); // Guarded by Math.max

        p1.printSummary();
        p2.printSummary();
    }
}`,
              output: `[SKU-9021] Mechanical Keyboard | Price: 89.99 USD | Stock: 15
[SKU-9022] Gaming Mouse | Price: 0.0 USD | Stock: 0`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "This entity demonstrates practical attribute architecture: 'public static final' for shared currency, 'final' for immutable SKU identifiers, and guarded initialization protecting numerical integrity."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "يوضح هذا المثال البنية الاحترافية للخصائص: ثابت عام للعملة، معرف SKU غير قابل للتغيير بـ final، وحقول محمية ضد القيم السالبة غير المنطقية."
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
                "Mistake 1: Confusing static attributes with instance attributes. Modifying a static attribute via 'obj1.attr = 5' affects all instances because only one copy exists.",
                "خطأ 1: الخلط بين المتغيرات الساكنة والمتغيرات العادية. تعديل متغير static يغير القيمة لجميع الكائنات دون استثناء.",
                "Mistake 2: Expecting local variables inside a method to get default values. Only class fields get default values; local variables must be explicitly initialized before reading.",
                "خطأ 2: الاعتقاد بأن المتغيرات المحلية داخل الدوال تأخذ قيماً افتراضية تلقائية. فقط خصائص الصنف تأخذ قيماً افتراضية، أما المتغيرات المحلية فعدم تهيئتها يمنع تشغيل البرنامج.",
                "Mistake 3: Believing that 'final Object ref;' makes the object immutable. 'final' only freezes the reference pointer; internal fields remain mutable unless individually marked final.",
                "خطأ 3: الاعتقاد بأن 'final' تجمد كل محتويات الكائن المرجعي. هي تجمد المؤشر فقط ولا تمنع تغيير الحقول الداخلية للكائن.",
                "Best Practice: Access static attributes via the Class Name (e.g., 'Physics.GRAVITY') rather than through an object instance."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Employee Registry System (التحدي العملي: سجل الموظفين)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Create a class named Employee with: 1) a static int 'totalEmployees' initialized to 0; 2) a final int 'id' assigned sequentially using the counter; 3) 'name' (String) and 'salary' (double). In the constructor, increment totalEmployees and assign 'id'. Write a method 'displayInfo()'. In main(), create 3 employees, print their details, and verify total employees."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: قم بإنشاء صنف Employee يحتوي على: 1) متغير ساكن 'totalEmployees' يبدأ بـ 0؛ 2) متغير ثابت 'id' يأخذ تسلسله تلقائياً من العداد؛ 3) حقول 'name' و 'salary'. في المشيد، قم بزيادة العداد وإسناد المعرف id. في الدالة main أنشئ 3 موظفين واطبع تفاصيلهم وإجمالي عدد الموظفين."
            },
            {
              type: "code",
              language: "java",
              filename: "EmployeeRegistryChallenge.java",
              code: `public class EmployeeRegistryChallenge {
    static class Employee {
        static int totalEmployees = 0;
        final int id;
        String name;
        double salary;

        Employee(String name, double salary) {
            totalEmployees++;
            this.id = totalEmployees; // Auto-incremented unique immutable ID
            this.name = name;
            this.salary = salary;
        }

        void displayInfo() {
            System.out.println("Employee #" + id + ": " + name + " | Salary: $" + salary);
        }
    }

    public static void main(String[] args) {
        Employee e1 = new Employee("Fatima Al-Zahra", 7200.0);
        Employee e2 = new Employee("Tariq Mansoor", 6500.0);
        Employee e3 = new Employee("Leila Nader", 8100.0);

        e1.displayInfo();
        e2.displayInfo();
        e3.displayInfo();

        System.out.println("Company Headcount (Shared Static): " + Employee.totalEmployees);
    }
}`,
              output: `Employee #1: Fatima Al-Zahra | Salary: $7200.0
Employee #2: Tariq Mansoor | Salary: $6500.0
Employee #3: Leila Nader | Salary: $8100.0
Company Headcount (Shared Static): 3`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "The combination of a static counter (totalEmployees) and a blank final field (id) guarantees that every employee instance receives an unalterable, unique sequential identifier upon construction."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "الجمع بين متغير العداد الساكن (static) والمتغير الثابت (final id) يضمن حصول كل موظف على رقم تسلسلي فريد وغير قابل للتعديل فور إنشائه."
            }
          ],
          quiz: [
            {
              id: "q1",
              question: "What are the default initial values of unassigned instance attributes in Java for int, boolean, double, and Object reference types? (ما هي القيم الافتراضية الأولية لحقول الكائنات غير المعينة؟)",
              options: [
                "0, false, 0.0, and null respectively",
                "null, null, null, and null",
                "0, true, 0.0, and new Object()",
                "Garbage/random values left in memory"
              ],
              correctIndex: 0,
              explanation: "Correct! In Java, class instance attributes are automatically initialized by the JVM: numeric primitives default to 0 or 0.0, booleans default to false, char defaults to '\\u0000', and all object reference types default to null. (تقوم جافا بتهيئة حقول الكائنات تلقائياً: الأرقام إلى 0 والمنطقية إلى false والمراجع إلى null)."
            },
            {
              id: "q2",
              question: "Examine this class definition:\nclass DataHolder {\n    int instanceNum;\n    void test() {\n        int localNum;\n        System.out.println(instanceNum);\n        System.out.println(localNum);\n    }\n}\nWhat happens when compiling this class?",
              options: [
                "Compiles cleanly and prints 0 twice.",
                "Compile-time error on 'System.out.println(localNum)' because local variables are not given default values and must be initialized before use.",
                "Compile-time error on 'System.out.println(instanceNum)'.",
                "Throws a NullPointerException at runtime."
              ],
              correctIndex: 1,
              explanation: "Correct! Instance attributes (instanceNum) are automatically assigned default values (0). Local variables (localNum) inside methods have NO default values and produce a compile-time error ('variable localNum might not have been initialized') if read before assignment. (حقول الصنف تُعطى قيماً افتراضية تلقائياً، بينما المتغيرات المحلية داخل الدوال تتطلب إسناد قيمة قبل قراءتها وإلا تسببت في خطأ تصريف)."
            },
            {
              id: "q3",
              question: "Predict the output of the following code:\nclass Item {\n    static int count = 0;\n    int id = 0;\n    Item() {\n        count++;\n        id++;\n    }\n}\n// In main:\nItem a = new Item();\nItem b = new Item();\nSystem.out.println(a.count + \" \" + a.id);\nWhat is printed?",
              options: [
                "1 1",
                "2 1",
                "2 2",
                "0 0"
              ],
              correctIndex: 1,
              explanation: "Correct! 'count' is static (shared by all Item instances), so instantiating two objects increments count twice to 2. 'id' is an instance attribute, incremented once per instance from 0 to 1. Thus, a.count is 2 and a.id is 1. (المتغير الساكن count مشترك بين جميع الكائنات فبلغ 2، بينما id متغير مستقل لكل كائن فبلغ 1)."
            },
            {
              id: "q4",
              question: "What occurs when attempting to compile this snippet?\nclass Configuration {\n    final int MAX_TIMEOUT = 5000;\n}\n// In main:\nConfiguration cfg = new Configuration();\ncfg.MAX_TIMEOUT = 3000;",
              options: [
                "MAX_TIMEOUT is successfully updated to 3000.",
                "Compile-time error: cannot assign a value to final variable MAX_TIMEOUT.",
                "A warning is logged, but the assignment succeeds.",
                "A RuntimeException is thrown."
              ],
              correctIndex: 1,
              explanation: "Correct! The 'final' keyword on an attribute marks it immutable once initialized. Any subsequent attempt to reassign it triggers a compile-time error: 'cannot assign a value to final variable'. (الكلمة المفتاحية final تجعل الخاصية ثابتة، وتعديلها يسبب خطأ تصريف صريحاً)."
            },
            {
              id: "q5",
              question: "Consider this code with a final reference attribute:\nclass Engine { int horsepower = 200; }\nclass SportsCar {\n    final Engine engine = new Engine();\n}\n// In main:\nSportsCar car = new SportsCar();\ncar.engine.horsepower = 450;\nDoes this compile, and what is car.engine.horsepower? (هل يترجم هذا الكود وما هي النتيجة؟)",
              options: [
                "Does not compile because 'engine' is final and its internal fields cannot be modified.",
                "Compiles successfully, and car.engine.horsepower is 450.",
                "Throws a SecurityException at runtime.",
                "Compiles, but horsepower remains 200."
              ],
              correctIndex: 1,
              explanation: "Correct! The 'final' modifier on an object reference field prevents the reference itself from pointing to a different object (e.g., 'car.engine = new Engine()' is illegal). However, the internal state of the referenced Engine object remains fully mutable. (الكلمة final تمنع تغيير مؤشر المرجع فقط، لكنها لا تمنع تعديل الخصائص الداخلية للكائن المشار إليه)."
            },
            {
              id: "q6",
              question: "What is a 'blank final' instance attribute, and what rule does Java enforce regarding its initialization? (ما هي الخاصية الثابتة غير المهيأة وما قاعدتها؟)",
              options: [
                "A final variable that is left as null forever.",
                "A final field declared without an initial value; it MUST be assigned a value in every constructor before constructor completion.",
                "A final variable that can be reassigned only inside static methods.",
                "A variable that becomes final only when marked with '@Override'."
              ],
              correctIndex: 1,
              explanation: "Correct! A blank final attribute is declared as 'final Type name;' without an initial assignment. The compiler strictly requires it to be definitively assigned exactly once in each constructor of the class. (الثابت غير المهيأ يجب إسناد قيمة له لمرة واحدة فقط داخل كل مشيد بالفئة قبل اكتماله)."
            },
            {
              id: "q7",
              question: "Examine this setter method:\nclass Account {\n    int balance = 100;\n    void setBalance(int balance) {\n        balance = balance;\n    }\n}\n// In main:\nAccount a = new Account();\na.setBalance(500);\nSystem.out.println(a.balance);\nWhat does this print and why? (ما المخرجات ولماذا؟)",
              options: [
                "500, because the parameter updates the attribute.",
                "100, because the method parameter shadows the instance field; 'balance = balance' assigns the parameter to itself.",
                "0, because of memory clearing.",
                "Compilation error due to conflicting names."
              ],
              correctIndex: 1,
              explanation: "Correct! Because the parameter name matches the instance attribute name, the parameter shadows the field. 'balance = balance' assigns the parameter to itself, leaving the instance field untouched at 100. To update the field, 'this.balance = balance' must be used. (المعامل المحلي حجب خاصية الكائن، والسطر أسند المتغير لنفسه تاركاً الحقل عند قيمته السابقة 100)."
            },
            {
              id: "q8",
              question: "Why does Java software engineering strongly prefer the combination 'public static final' for application constants (e.g., 'public static final double PI = 3.14159;')?",
              options: [
                "Because Java syntax requires all three keywords whenever creating any variable.",
                "'public' provides universal access, 'static' ensures a single shared memory copy exists across all instances, and 'final' guarantees the value cannot be mutated.",
                "Because it allows the garbage collector to delete the constant after each method call.",
                "Because it converts the variable into a primitive integer."
              ],
              correctIndex: 1,
              explanation: "Correct! Combining 'public' (accessible everywhere), 'static' (one shared instance in memory without per-object duplication), and 'final' (immutable constant value) defines a canonical, safe constant in Java. (الدمج يمنح وصولاً عاماً، ونسخة واحدة مشتركة بالذاكرة، وثباتاً تاماً يمنع التعديل)."
            },
            {
              id: "q9",
              question: "What is printed by this program?\nclass Player {\n    static int teamPoints = 0;\n}\n// In main:\nPlayer p1 = new Player();\nPlayer p2 = new Player();\np1.teamPoints += 10;\np2.teamPoints += 15;\nSystem.out.println(Player.teamPoints);",
              options: [
                "10",
                "15",
                "25",
                "0"
              ],
              correctIndex: 2,
              explanation: "Correct! Even though accessed via instance references 'p1' and 'p2', 'teamPoints' is static and belongs to the Player class. Both modifications operate on the exact same class attribute in memory, resulting in 10 + 15 = 25. (المتغير ساكن، وتعديله عبر أي كائن يُعدل نفس المكان المشترك في الذاكرة ليصل المجموع إلى 25)."
            },
            {
              id: "q10",
              question: "What is the default initial value of an uninitialized instance field of type char in Java? (ما هي القيمة الافتراضية لحقل من نوع char؟)",
              options: [
                "' ' (ASCII space 32)",
                "'0' (Character zero 48)",
                "'\\u0000' (The null character, Unicode 0)",
                "null"
              ],
              correctIndex: 2,
              explanation: "Correct! The default value of a char instance field is '\\u0000' (Unicode null character, integer value 0), not space, character zero, or null. (القيمة الافتراضية للنوع char هي الرمز الفارغ '\\u0000' ذو القيمة الصفرية)."
            },
            {
              id: "q11",
              question: "When is memory allocated for a static attribute versus an instance attribute?",
              options: [
                "Both are allocated when 'new' is called.",
                "Static attributes are allocated once when the class is loaded by the JVM ClassLoader; instance attributes are allocated every time 'new' creates an object on the heap.",
                "Static attributes are allocated on the Call Stack; instance attributes are allocated in the CPU registers.",
                "Static attributes are only allocated when accessed via reflection."
              ],
              correctIndex: 1,
              explanation: "Correct! Static attributes belong to the class and are allocated once in Metaspace/Class storage during class loading. Instance attributes are allocated dynamically on the heap each time an object is instantiated with 'new'. (المتغيرات الساكنة تُحجز مرة واحدة عند تحميل الفئة، بينما حقول النسخ تُحجز مع كل كائن جديد بـ new)."
            },
            {
              id: "q12",
              question: "What occurs if you attempt to assign a blank final field inside a regular instance method?\nclass Device {\n    final String serialNumber;\n    void setSerial(String s) {\n        this.serialNumber = s;\n    }\n}",
              options: [
                "It compiles and assigns serialNumber normally on the first invocation.",
                "Compile-time error: cannot assign a value to final variable serialNumber outside of constructors or initializers.",
                "It throws a FinalAssignmentException at runtime.",
                "It compiles, but only works if called from main."
              ],
              correctIndex: 1,
              explanation: "Correct! Blank final fields can ONLY be assigned within constructors or instance initializer blocks during object construction. Regular instance methods cannot assign final fields because they could be called multiple times. (الثوابت غير المهيأة يُشترط إسنادها داخل المشيد فقط ولا يمكن إسنادها داخل الدوال العادية)."
            },
            {
              id: "q13",
              question: "Which of the following correctly resolves variable shadowing to assign a constructor parameter 'speed' to the instance attribute 'speed'? (أي خيار يحل مشكلة حجب المتغيرات بشكل صحيح؟)",
              options: [
                "speed = speed;",
                "this.speed = speed;",
                "Car.speed = speed;",
                "super.speed = this.speed;"
              ],
              correctIndex: 1,
              explanation: "Correct! 'this.speed = speed;' uses 'this.speed' to explicitly target the instance attribute of the current calling object on the heap, resolving the shadowing caused by the local parameter 'speed'. (استخدام this.speed يحدد حقل الكائن صراحة ويفك الالتباس مع المعامل المحلي)."
            },
            {
              id: "q14",
              question: "If a class defines 'public static String companyName = \"Acme Corp\";', what is the idiomatic, recommended way to access this attribute from an external class?",
              options: [
                "new MyClass().companyName",
                "MyClass.companyName",
                "this.companyName",
                "(String) companyName"
              ],
              correctIndex: 1,
              explanation: "Correct! Static attributes belong to the class and should be accessed using the class name directly ('MyClass.companyName'). Accessing static members via object instances is discouraged because it obscures the fact that the field is static. (يُفضل استدعاء المتغيرات الساكنة باسم الفئة مباشرة للتعبير عن طبيعتها المشتركة)."
            },
            {
              id: "q15",
              question: "Predict the state after three objects are created:\nclass Ticket {\n    static int nextId = 1;\n    int ticketNumber;\n    Ticket() {\n        ticketNumber = nextId++;\n    }\n}\n// In main:\nTicket t1 = new Ticket();\nTicket t2 = new Ticket();\nTicket t3 = new Ticket();\nWhat are t2.ticketNumber and Ticket.nextId?",
              options: [
                "t2.ticketNumber is 1, Ticket.nextId is 3",
                "t2.ticketNumber is 2, Ticket.nextId is 4",
                "t2.ticketNumber is 2, Ticket.nextId is 3",
                "t2.ticketNumber is 3, Ticket.nextId is 4"
              ],
              correctIndex: 1,
              explanation: "Correct! Post-increment assigns the current nextId then increments it: t1 gets 1 (nextId becomes 2), t2 gets 2 (nextId becomes 3), and t3 gets 3 (nextId becomes 4). Thus, t2.ticketNumber is 2 and Ticket.nextId is 4. (يحصل التذكرة الثانية t2 على الرقم 2، ويصبح العداد العام بعد إنشاء الكائنات الثلاثة 4)."
            }
          ]
        }
      ]
    }
  ];
})();
