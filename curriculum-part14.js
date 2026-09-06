/**
 * Java Curriculum Module - Part 14
 * Topics:
 * 27. Object Casting
 * 28. Upcasting / Downcasting
 * 
 * 100% Offline, Pure JavaScript. Complete educational content with full bilingual (English & Arabic) explanations.
 */

(function () {
  'use strict';

  window.JAVA_TOPICS_PART14 = [
    /* ==========================================================================
       TOPIC 27: Object Casting
       ========================================================================== */
    {
      id: "object-casting",
      title: "27. Object Casting",
      description: "Comprehensive Guide to Object Type Casting in Java: Reference type conversion, compile-time type verification, runtime ClassCastException risks, interface casting, and casting tree rules.",
      lessons: [
        {
          id: "object-casting-mastery",
          title: "Complete Guide to Object Casting",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "Understanding Object Casting in Java (فهم تحويل أنواع الكائنات في جافا)"
            },
            {
              type: "paragraph",
              text: "Object casting in Java is the process of converting a reference variable from one type to another within an inheritance hierarchy. It is vital to understand that casting DOES NOT alter the underlying object on the JVM heap in any way; it merely changes the 'lens' (the reference type) through which the compiler and runtime inspect the object's methods and properties."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "تحويل أنواع الكائنات (Object Casting) في جافا هو عملية تحويل نوع المتغير المرجعي من نوع إلى آخر ضمن شجرة الوراثة. من الضروري جداً إدراك أن عملية التحويل لا تغير الكائن الحقيقي المخزن في الذاكرة (Heap) بأي شكل؛ بل تغير فقط 'العدسة' أو زاوية الرؤية التي يرى بها المترجم والـ JVM الكائن وما يتيحه من دوال وحقول."
            },
            {
              type: "paragraph",
              text: "Two Core Phases of Object Casting: 1) Compile-Time Check: The compiler verifies whether an inheritance relationship (or interface possibility) exists between the two types. Casting between completely unrelated sibling classes (e.g. String to Integer) triggers an immediate compiler error; 2) Runtime Check: The JVM checks whether the actual object on the heap is an instance of the target cast type. If incompatible, the JVM throws a runtime ClassCastException."
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
              text: "Example 1: Basic Reference Casting vs Object Identity (المثال 1: التحويل المرجعي وهوية الكائن)"
            },
            {
              type: "paragraph",
              text: "Demonstrating that casting changes the reference perspective without modifying the actual object."
            },
            {
              type: "code",
              language: "java",
              filename: "BasicObjectCastDemo.java",
              code: `public class BasicObjectCastDemo {
    static class Vehicle {
        void start() { System.out.println("Vehicle starting engine..."); }
    }

    static class SportsCar extends Vehicle {
        void activateTurbo() { System.out.println("Turbo boost activated: +150 HP!"); }
    }

    public static void main(String[] args) {
        // Actual object on the heap is a SportsCar
        SportsCar realCar = new SportsCar();

        // Cast to Vehicle reference (widening)
        Vehicle vRef = (Vehicle) realCar;
        vRef.start(); // Works fine

        // Cast back to SportsCar reference (narrowing)
        SportsCar sportsRef = (SportsCar) vRef;
        sportsRef.activateTurbo();

        // Both references point to the exact same physical heap object
        System.out.println("Are both references identical? " + (realCar == sportsRef));
    }
}`,
              output: `Vehicle starting engine...
Turbo boost activated: +150 HP!
Are both references identical? true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "The underlying heap object never changed from being a SportsCar. The cast only allowed the compiler to see either Vehicle methods or SportsCar methods."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "الكائن الحقيقي في الذاكرة لم يتغير وبقي كائن SportsCar طوال الوقت؛ والتحويل غيّر فقط نوع المرجع المتاح للمترجم للوصول للدوال."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Compile-Time Incompatible Types Check (المثال 2: رفض التحويل المستحيل وقت التصريف)"
            },
            {
              type: "paragraph",
              text: "The Java compiler rejects casting between sibling classes that have no hierarchical overlap."
            },
            {
              type: "code",
              language: "java",
              filename: "IncompatibleCastingDemo.java",
              code: `public class IncompatibleCastingDemo {
    static class Animal {}
    static class Cat extends Animal {}
    static class Dog extends Animal {}

    public static void main(String[] args) {
        Cat cat = new Cat();

        // Direct sibling cast is rejected by the compiler:
        // Dog dog = (Dog) cat; // COMPILER ERROR: incompatible types: Cat cannot be converted to Dog

        System.out.println("Compiler guarantees safety against completely unrelated sibling casts!");
    }
}`,
              output: `Compiler guarantees safety against completely unrelated sibling casts!`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "Because Cat and Dog are sibling branches of Animal without an inheritance link between each other, the compiler halts before runtime."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "لأن القطة والكلب فرعان متجاوران يرثان من الحيوان ولا يرث أحدهما الآخر، يمنع المترجم التحويل المباشر بينهما فوراً وقت التصريف."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: The Runtime ClassCastException Trap (المثال 3: فخ استثناء ClassCastException وقت التشغيل)"
            },
            {
              type: "paragraph",
              text: "Tricking the compiler with a shared superclass reference results in a fatal runtime exception."
            },
            {
              type: "code",
              language: "java",
              filename: "ClassCastExceptionDemo.java",
              code: `public class ClassCastExceptionDemo {
    static class Animal {
        void breathe() { System.out.println("Animal breathing."); }
    }
    static class Cat extends Animal {}
    static class Dog extends Animal {
        void bark() { System.out.println("Woof!"); }
    }

    public static void main(String[] args) {
        Animal pet = new Cat(); // Actual heap object is a Cat

        try {
            // Compiler allows this because Dog is a subclass of Animal!
            // But JVM catches the mismatch at runtime:
            Dog dog = (Dog) pet;
            dog.bark();
        } catch (ClassCastException ex) {
            System.out.println("Caught Expected Runtime Exception: " + ex.getMessage());
        }
    }
}`,
              output: `Caught Expected Runtime Exception: class BasicObjectCastDemo$Cat cannot be cast to class BasicObjectCastDemo$Dog`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "The compiler permits (Dog) pet because pet is declared as Animal. However, at runtime the JVM sees a real Cat and throws ClassCastException."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "يقبل المترجم التحويل ظاهرياً لأن المتغير من نوع Animal، لكن الـ JVM يكشف عند التشغيل أن الكائن الحقيقي هو Cat ويرمي ClassCastException."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Casting Through Interfaces (المثال 4: التحويل المرجعي عبر الواجهات Interface Casting)"
            },
            {
              type: "paragraph",
              text: "Casting a concrete object reference to an interface implemented by its class."
            },
            {
              type: "code",
              language: "java",
              filename: "InterfaceCastingDemo.java",
              code: `public class InterfaceCastingDemo {
    interface Flyable {
        void takeOff();
    }

    interface Navigable {
        void locateCoordinates();
    }

    static class Drone implements Flyable, Navigable {
        @Override
        public void takeOff() {
            System.out.println("Drone rotors spinning: Taking off vertically.");
        }

        @Override
        public void locateCoordinates() {
            System.out.println("GPS Fix: Lat 24.7136, Lon 46.6753.");
        }
    }

    public static void main(String[] args) {
        Flyable flyer = new Drone();
        flyer.takeOff();

        // Cast from one interface to another because Drone implements both!
        Navigable navigator = (Navigable) flyer;
        navigator.locateCoordinates();
    }
}`,
              output: `Drone rotors spinning: Taking off vertically.
GPS Fix: Lat 24.7136, Lon 46.6753.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "Because the underlying object (Drone) implements both Flyable and Navigable, casting between the two interface references succeeds seamlessly."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "بما أن كائن Drone الحقيقي يطبق كلا الواجهتين Flyable و Navigable، فإن التحويل بين مراجع الواجهتين ينجح بسلاسة تامة."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Safe Casting with Defensive instanceof Check (المثال 5: التحويل الآمن مع فحص instanceof)"
            },
            {
              type: "paragraph",
              text: "Always verifying the real runtime type before casting to prevent application crashes."
            },
            {
              type: "code",
              language: "java",
              filename: "SafeCastingDemo.java",
              code: `public class SafeCastingDemo {
    static class MediaFile {
        String filename;
        MediaFile(String name) { this.filename = name; }
    }

    static class VideoFile extends MediaFile {
        int resolutionP;
        VideoFile(String name, int res) {
            super(name);
            this.resolutionP = res;
        }
        void play4k() { System.out.println("Playing " + filename + " at " + resolutionP + "p HD."); }
    }

    public static void inspectMedia(MediaFile file) {
        // Defensive check before casting
        if (file instanceof VideoFile) {
            VideoFile video = (VideoFile) file; // Safe downcast
            video.play4k();
        } else {
            System.out.println("Generic media file: " + file.filename + " (no video track)");
        }
    }

    public static void main(String[] args) {
        inspectMedia(new VideoFile("matrix_intro.mp4", 2160));
        inspectMedia(new MediaFile("podcast_audio.mp3"));
    }
}`,
              output: `Playing matrix_intro.mp4 at 2160p HD.
Generic media file: podcast_audio.mp3 (no video track)`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "Checking 'file instanceof VideoFile' guarantees that the explicit cast (VideoFile) file will never throw a ClassCastException."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "إجراء الفحص المسبق باستخدام 'instanceof' يضمن بنسبة 100% عدم حدوث أي استثناء ClassCastException أثناء تحويل النوع."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Java 16+ Pattern Matching for Casting (المثال 6: التحويل المباشر بمطابقة الأنماط في جافا الحديثة)"
            },
            {
              type: "paragraph",
              text: "Modern Java simplifies casting by combining type test and variable binding into a single expression."
            },
            {
              type: "code",
              language: "java",
              filename: "PatternMatchingCastDemo.java",
              code: `public class PatternMatchingCastDemo {
    public static void processPayload(Object payload) {
        // Pattern Matching for instanceof eliminates explicit casting!
        if (payload instanceof String str && !str.isBlank()) {
            System.out.println("Payload is a valid String: " + str.toUpperCase());
        } else if (payload instanceof Integer count && count > 0) {
            System.out.println("Payload is positive Integer count: " + (count * 10));
        } else {
            System.out.println("Payload is unknown or null.");
        }
    }

    public static void main(String[] args) {
        processPayload("authentication_token_99");
        processPayload(42);
        processPayload(null);
    }
}`,
              output: `Payload is a valid String: AUTHENTICATION_TOKEN_99
Payload is positive Integer count: 420
Payload is unknown or null.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "'if (payload instanceof String str)' automatically casts and binds 'str' if the condition is true, eliminating verbose cast syntax."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "تتيح جافا الحديثة مطابقة الأنماط، حيث يتم فحص النوع وتوليد المتغير المحوّل str تلقائياً دون الحاجة لكتابة كود التحويل اليدوي."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Array Type Casting Rules (المثال 7: قواعد تحويل مصفوفات الكائنات Array Casting)"
            },
            {
              type: "paragraph",
              text: "Arrays of reference types are covariant in Java, with runtime array store checks."
            },
            {
              type: "code",
              language: "java",
              filename: "ArrayCastingDemo.java",
              code: `public class ArrayCastingDemo {
    public static void main(String[] args) {
        String[] stringArray = new String[]{"Alpha", "Beta", "Gamma"};

        // Array upcast: String[] IS-A Object[]
        Object[] objectArray = stringArray;
        System.out.println("First element from Object[] reference: " + objectArray[0]);

        // Array downcast back to String[]
        String[] restoredArray = (String[]) objectArray;
        System.out.println("Restored String[] length: " + restoredArray.length);

        // Danger of Array Covariance: ArrayStoreException at runtime!
        try {
            objectArray[0] = Integer.valueOf(999); // Compiles, but JVM knows it's really String[]
        } catch (ArrayStoreException ex) {
            System.out.println("Caught Expected ArrayStoreException: " + ex.getMessage());
        }
    }
}`,
              output: `First element from Object[] reference: Alpha
Restored String[] length: 3
Caught Expected ArrayStoreException: java.lang.Integer`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "While an array can be cast to Object[], the underlying JVM heap type remembers it is a String[], rejecting incompatible writes via ArrayStoreException."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "رغم إمكانية تحويل مصفوفة النصوص إلى مصفوفة كائنات عامة، إلا أن الـ JVM يتذكر نوعها الأصلي ويرفض تخزين أرقام بها برمي ArrayStoreException."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Multilevel Hierarchy Casting (المثال 8: التحويل عبر مستويات وراثة متعددة)"
            },
            {
              type: "paragraph",
              text: "Casting through Grandma -> Mother -> Daughter generational hierarchies."
            },
            {
              type: "code",
              language: "java",
              filename: "MultilevelCastingDemo.java",
              code: `public class MultilevelCastingDemo {
    static class Grandparent {
        void legacy() { System.out.println("Grandparent legacy wisdom."); }
    }
    static class Parent extends Grandparent {
        void career() { System.out.println("Parent engineering career."); }
    }
    static class Child extends Parent {
        void hobby() { System.out.println("Child robotics hobby."); }
    }

    public static void main(String[] args) {
        Grandparent gp = new Child(); // Upcast to topmost type

        gp.legacy(); // Only Grandparent methods visible

        // Intermediate downcast
        Parent p = (Parent) gp;
        p.career(); // Parent and Grandparent methods visible

        // Deepest downcast
        Child c = (Child) p;
        c.hobby();  // All methods visible
    }
}`,
              output: `Grandparent legacy wisdom.
Parent engineering career.
Child robotics hobby.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "As we downcast deeper into the hierarchy, more specialized methods become accessible on the exact same underlying Child object."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "كلما هبطنا في التحويل إلى عمق شجرة الوراثة، أصبحت الدوال المتخصصة متاحة للاستدعاء لنفس كائن الابن الأصلي."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Casting with Collections and Generic Erasure (المثال 9: التحويل مع المجموعات ومحو الأنواع Generic Erasure)"
            },
            {
              type: "paragraph",
              text: "Understanding how type erasure forces legacy code to cast raw collections."
            },
            {
              type: "code",
              language: "java",
              filename: "CollectionsCastingDemo.java",
              code: `import java.util.ArrayList;
import java.util.List;

public class CollectionsCastingDemo {
    public static void main(String[] args) {
        // Raw list (simulating legacy pre-Java 5 API)
        List rawList = new ArrayList();
        rawList.add("Database Connection String");
        rawList.add("API Secret Key");

        // Elements retrieved from raw collection return Object, requiring explicit casts
        for (Object item : rawList) {
            String str = (String) item;
            System.out.println("Retrieved and cast: " + str.length() + " chars.");
        }
    }
}`,
              output: `Retrieved and cast: 26 chars.
Retrieved and cast: 14 chars.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "Before Generics, all collections stored Object, requiring developers to perform explicit casts when retrieving elements."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "قبل ظهور القوالب العامة Generics، كانت القوائم تخزن كائنات عامة Object، مما كان يلزم المطورين بعمل Casting صريح لكل عنصر مسترجع."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Dynamic Reflection Casting via Class.cast() (المثال 10: التحويل الديناميكي بالانعكاس البرمجي)"
            },
            {
              type: "paragraph",
              text: "Using java.lang.Class.cast() for generic frameworks that don't know types at compile time."
            },
            {
              type: "code",
              language: "java",
              filename: "ReflectionCastDemo.java",
              code: `public class ReflectionCastDemo {
    static class ServiceRegistry {
        public static <T> T getService(Object instance, Class<T> serviceClass) {
            if (serviceClass.isInstance(instance)) {
                return serviceClass.cast(instance); // Dynamic reflection cast
            }
            throw new IllegalArgumentException("Object is not an instance of " + serviceClass.getName());
        }
    }

    static class BillingService {
        void invoice() { System.out.println("Generated invoice #9921."); }
    }

    public static void main(String[] args) {
        Object unknownService = new BillingService();

        BillingService billing = ServiceRegistry.getService(unknownService, BillingService.class);
        billing.invoice();
    }
}`,
              output: `Generated invoice #9921.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "serviceClass.cast(instance) provides runtime dynamic casting for dependency injection containers and plugin architectures."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "توفر دالة Class.cast تحويلاً ديناميكياً مرناً يُستخدم في أطر العمل ومحركات حقن التبعيات عندما تكون الأنواع غير معروفة مسبقاً."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Enterprise Serialization & Packet Router with Safe Casting (المثال 11: موجه حزم الشبكات والمراسلات المؤسسية)"
            },
            {
              type: "paragraph",
              text: "Advanced: High-throughput packet dispatcher safely casting raw polymorphic messages into specialized command handlers."
            },
            {
              type: "code",
              language: "java",
              filename: "NetworkPacketDispatcherMaster.java",
              code: `public class NetworkPacketDispatcherMaster {
    interface NetworkPacket {
        long getTimestamp();
    }

    static class AuthPacket implements NetworkPacket {
        private final String authToken;
        AuthPacket(String token) { this.authToken = token; }
        public long getTimestamp() { return System.currentTimeMillis(); }
        public String getAuthToken() { return authToken; }
    }

    static class DataPacket implements NetworkPacket {
        private final byte[] payload;
        DataPacket(byte[] data) { this.payload = data; }
        public long getTimestamp() { return System.currentTimeMillis(); }
        public int getPayloadSize() { return payload.length; }
    }

    public static void routePacket(NetworkPacket packet) {
        if (packet instanceof AuthPacket auth) {
            System.out.println("[ROUTER -> AUTH] Processing authentication token: " + auth.getAuthToken());
        } else if (packet instanceof DataPacket data) {
            System.out.println("[ROUTER -> DATA] Routing binary payload of " + data.getPayloadSize() + " bytes.");
        } else {
            System.out.println("[ROUTER -> DROP] Unknown packet format discarded.");
        }
    }

    public static void main(String[] args) {
        NetworkPacket[] packetStream = {
            new AuthPacket("JWT_TOKEN_SECRET_981"),
            new DataPacket(new byte[512]),
            new AuthPacket("JWT_TOKEN_REFRESH_112")
        };

        for (NetworkPacket p : packetStream) {
            routePacket(p);
        }
    }
}`,
              output: `[ROUTER -> AUTH] Processing authentication token: JWT_TOKEN_SECRET_981
[ROUTER -> DATA] Routing binary payload of 512 bytes.
[ROUTER -> AUTH] Processing authentication token: JWT_TOKEN_REFRESH_112`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "The router consumes the generic NetworkPacket interface and uses pattern matching downcasting to dispatch packets to specialized handlers safely."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "يتعامل الموجه مع واجهة الحزم العامة NetworkPacket ويستخدم التحويل الآمن لتوجيه كل حزمة إلى معالجها المتخصص دون أي خطورة لتعطل البرنامج."
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
                "Mistake 1: Assuming casting converts the physical object in memory. Casting ONLY changes the reference variable type; the underlying object on the heap remains 100% unchanged.",
                "خطأ 1: الاعتقاد بأن التحويل يغير الكائن الحقيقي في الذاكرة؛ فالتحويل يغير نوع المتغير المرجعي فقط والكائن في الـ Heap لا يمس إطلاقاً.",
                "Mistake 2: Downcasting without first performing an 'instanceof' check. Blind downcasting is the #1 cause of runtime ClassCastException crashes.",
                "خطأ 2: التحويل لأسفل (Downcasting) دون التحقق المسبق بـ instanceof، وهو السبب الأول لحدوث أخطاء ClassCastException.",
                "Mistake 3: Trying to cast between sibling classes (e.g. Dog to Cat). The compiler will reject this immediately."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Polymorphic UI Widget Dispatcher (التحدي العملي: موزع عناصر واجهة المستخدم)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Build a polymorphic UI element processor: 1) Base class 'UIWidget' with 'String id'; 2) Subclass 'ButtonWidget' with 'void click()'; 3) Subclass 'InputFieldWidget' with 'void enterText(String t)'; 4) Create a method 'dispatchWidget(UIWidget widget)' that checks the type safely, downcasts, and invokes either click() or enterText('Hello'); 5) In main(), create an array of UIWidgets with 1 Button and 1 InputField and dispatch both."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: ابنِ معالجاً لعناصر الواجهة الرسومية: 1) فئة أساسية UIWidget بها id؛ 2) فئة فرعية ButtonWidget بها دالة click()؛ 3) فئة فرعية InputFieldWidget بها دالة enterText(String t)؛ 4) دالة dispatchWidget تفحص النوع بأمان وتحول وتنفذ click أو enterText('Hello')؛ 5) في main أنشئ مصفوفة بها زر وحقل إدخال ومرر كلاهما للدالة."
            },
            {
              type: "code",
              language: "java",
              filename: "WidgetDispatcherChallenge.java",
              code: `public class WidgetDispatcherChallenge {
    static class UIWidget {
        String id;
        UIWidget(String id) { this.id = id; }
    }

    static class ButtonWidget extends UIWidget {
        ButtonWidget(String id) { super(id); }
        void click() { System.out.println("Button [" + id + "] clicked! Triggering action."); }
    }

    static class InputFieldWidget extends UIWidget {
        InputFieldWidget(String id) { super(id); }
        void enterText(String t) { System.out.println("InputField [" + id + "] received text: '" + t + "'"); }
    }

    public static void dispatchWidget(UIWidget widget) {
        if (widget instanceof ButtonWidget btn) {
            btn.click();
        } else if (widget instanceof InputFieldWidget input) {
            input.enterText("Hello Java");
        } else {
            System.out.println("Generic widget: " + widget.id);
        }
    }

    public static void main(String[] args) {
        UIWidget[] screenWidgets = {
            new ButtonWidget("btn_submit_order"),
            new InputFieldWidget("txt_customer_email")
        };

        for (UIWidget w : screenWidgets) {
            dispatchWidget(w);
        }
    }
}`,
              output: `Button [btn_submit_order] clicked! Triggering action.
InputField [txt_customer_email] received text: 'Hello Java'`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "dispatchWidget accepts the common UIWidget base reference, uses instanceof pattern matching to inspect the concrete type, and securely accesses subclass-specific methods."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "تستقبل الدالة المرجع الأساسي UIWidget وتفحص النوع الحقيقي عبر مطابقة الأنماط الآمنة لاستدعاء دوال النقر والإدخال الخاصة بكل فئة."
            }
          ],
          quiz: [
                    {
                              "id": "q1",
                              "question": "How does Reference Type Casting differ fundamentally from Primitive Type Casting in Java?\n(بماذا يختلف تحويل مراجع الكائنات Reference Casting جوهرياً عن تحويل الأنواع الأولية Primitive Casting في جافا؟)",
                              "options": [
                                        "Reference casting modifies the internal heap memory bits of the underlying object.",
                                        "Reference casting does NOT alter the actual object on the heap in any way; it only changes the compile-time type of the reference variable used to view that object.",
                                        "Primitive casting cannot convert numbers.",
                                        "Reference casting is executed by the garbage collector."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Primitive casting converts data bits (e.g. truncating 3.14 to 3). Reference casting does not touch or modify the object on the heap at all; it merely tells the compiler to view that same object through a different type lens. (تحويل المراجع لا يعدل الكائن في الذاكرة إطلاقاً بل يغير فقط نوع المتغير المرجعي الذي يستخدمه المصرف للتعامل مع ذلك الكائن)."
                    },
                    {
                              "id": "q2",
                              "question": "When is a ClassCastException thrown at runtime during reference casting?\n(متى يتم رمي استثناء ClassCastException أثناء وقت التشغيل عند تحويل المراجع؟)",
                              "options": [
                                        "When casting a null reference to any type.",
                                        "When an attempt is made to downcast an object to a type of which it is not an actual runtime instance or subtype.",
                                        "When upcasting a subclass to its direct superclass.",
                                        "Whenever casting an object inside a loop."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! A ClassCastException is thrown by the JVM when code attempts to explicitly cast an object to a class or interface that the actual runtime object does not implement or extend. (يحدث استثناء ClassCastException عندما يحاول الكود تحويل كائن بالأسفل downcast إلى فئة أو واجهة لا ينتمي إليها الكائن الفعلي في الذاكرة)."
                    },
                    {
                              "id": "q3",
                              "question": "What happens when the compiler analyzes a cast between two completely unrelated classes in separate inheritance branches (e.g. (String) new Integer(5))?\n(ماذا يحدث عندما يكتشف المصرف محاولة تحويل بين فئتين منفصلتين لا توجد بينهما أي علاقة وراثة على الإطلاق؟)",
                              "options": [
                                        "It compiles cleanly and throws ClassCastException at runtime.",
                                        "A compile-time error occurs: 'inconvertible types' (the compiler rejects it immediately because they cannot possibly be related).",
                                        "The JVM converts the integer to a string automatically.",
                                        "The program returns null."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! If two classes belong to disjoint class hierarchies with no subclass/superclass relationship (and neither is an interface), the compiler knows that no instance can ever belong to both types and rejects it with an 'inconvertible types' compile-time error. (إذا كانت الفئتان منفصلتين تماماً في شجرة الوراثة، يرفض المصرف الكود فوراً بخطأ تصريف صريح 'inconvertible types' لاستحالة توافقهما)."
                    },
                    {
                              "id": "q4",
                              "question": "Why does Upcasting (e.g. Object obj = new String(\"Hi\")) never require an explicit cast operator in Java?\n(لماذا لا يتطلب التحويل للأعلى Upcasting كتابة معامل تحويل صريح في جافا؟)",
                              "options": [
                                        "Because upcasting is inherently type-safe; an instance of a subclass is guaranteed to be an instance of its superclass (Is-A).",
                                        "Because upcasting deletes the subclass methods.",
                                        "Because the JVM converts the object to a primitive type.",
                                        "Because Object is an interface."
                              ],
                              "correctIndex": 0,
                              "explanation": "Correct! Upcasting moves up the inheritance hierarchy (from specific to general). Because any Dog is guaranteed to be an Animal, upcasting is always safe and is performed implicitly by the Java compiler. (التحويل للأعلى آمن حتماً لأن كل كائن من الفئة الفرعية هو بالتأكيد كائن من الفئة الأب، ولذا يقبله المصرف تلقائياً دون الحاجة لقوسين تحويل صريحين)."
                    },
                    {
                              "id": "q5",
                              "question": "Why is Downcasting considered an explicitly risky operation requiring a cast operator (e.g. Dog d = (Dog) animal)?\n(لماذا يعتبر التحويل للأسفل عملية محفوفة بالمخاطر تتطلب كتابة معامل تحويل صريح؟)",
                              "options": [
                                        "Because downcasting allocates double the memory.",
                                        "Because the reference may point to a base superclass instance or another sibling subclass at runtime, which would trigger a ClassCastException.",
                                        "Because downcasting causes garbage collection pauses.",
                                        "Because downcasting disables method overriding."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! A superclass reference 'animal' might actually point to a Cat or a generic Animal on the heap. Downcasting to Dog is not guaranteed to succeed, so the programmer must explicitly declare the cast and assume responsibility for runtime safety. (المرجع animal قد يشير في الذاكرة إلى قطة Cat وليس كلباً؛ لذا يجبرك المصرف على كتابة (Dog) صراحة لتحمل مسؤولية أمان النوع عند التشغيل)."
                    },
                    {
                              "id": "q6",
                              "question": "Consider this array code:\n\nString[] strArray = new String[5];\nObject[] objArray = strArray; // Line 1\nobjArray[0] = Integer.valueOf(42); // Line 2\n\nWhat happens when this code is executed?",
                              "options": [
                                        "Line 1 causes a compile-time error.",
                                        "Line 1 compiles, but Line 2 throws an ArrayStoreException at runtime because the actual array type on the heap is String[].",
                                        "The code compiles and runs successfully, storing the Integer in the String array.",
                                        "Line 2 throws a NullPointerException."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Java arrays are covariant (String[] can be assigned to Object[]). However, the JVM remembers the actual component type of the array on the heap. Trying to store an Integer into a String[] array causes the JVM to throw ArrayStoreException at runtime. (مصفوفات جافا متوافقة covariant فيجوز السطر 1، لكن الـ JVM تحافظ على نوع المصفوفة الحقيقي في الـ Heap، ومحاولة إدخال Integer في مصفوفة نصوص يرمي ArrayStoreException)."
                    },
                    {
                              "id": "q7",
                              "question": "Why does the Java compiler permit casting a non-final class reference to an unrelated interface type (e.g. Printable p = (Printable) myClassObj)?\n(لماذا يسمح المصرف بتحويل مرجع فئة عادية غير مغلقة إلى واجهة ما حتى لو لم تكن تلك الفئة تطبق الواجهة ظاهرياً؟)",
                              "options": [
                                        "Because interfaces have no methods.",
                                        "Because any subclass of that non-final class might implement that interface at runtime, making the cast potentially valid.",
                                        "Because interfaces bypass the JVM verifier.",
                                        "Because the compiler ignores all interface types."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Unless the class is marked 'final', the compiler cannot rule out that the runtime object might be an instance of a derived subclass that implements that interface. Thus, it defers the compatibility check to runtime. (طالما أن الفئة ليست final، فمن المحتمل أن يكون الكائن الفعلي من فئة فرعية تطبق الواجهة؛ ولذا يسمح المصرف بالتحويل ويؤجل التحقق لوقت التشغيل)."
                    },
                    {
                              "id": "q8",
                              "question": "What is the primary defensive programming practice used before performing an explicit downcast in Java 15 and earlier?\n(ما هو نمط البرمجة الدفاعية الأساسي المتبع قبل التحويل للأسفل في جافا 15 والإصدارات الأقدم؟)",
                              "options": [
                                        "Surrounding every cast with a synchronized block.",
                                        "Inspecting the reference using the 'instanceof' operator to verify compatibility before casting.",
                                        "Calling System.gc().",
                                        "Checking if the object's hashCode is positive."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Before Java 16's pattern matching, defensive code always verified 'if (obj instanceof ExpectedType)' before executing '(ExpectedType) obj', guaranteeing that ClassCastException would never be thrown. (النمط الدفاعي القياسي هو الفحص بـ if (obj instanceof ExpectedType) قبل التحويل لتفادي خطأ ClassCastException تماماً)."
                    },
                    {
                              "id": "q9",
                              "question": "How does Java 16+ Pattern Matching for instanceof simplify object casting?\n(كيف بسطت مطابقة الأنماط Pattern Matching في جافا 16 فما فوق عملية تحويل الكائنات؟)",
                              "options": [
                                        "It eliminates the need to compile Java classes.",
                                        "It combines the type check and the explicit downcast into a single atomic construct (e.g. if (obj instanceof String s)), eliminating boilerplate casting code.",
                                        "It makes all objects mutable.",
                                        "It removes all interfaces from the language."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Pattern matching combines testing the type and extracting the downcasted reference into a local pattern variable in one clean expression: 'if (obj instanceof String s) { s.length(); }'. (تدمج مطابقة الأنماط فحص النوع مع استخراج المتغير المحول في تعبير واحد مباشر يغني عن كتابة سطر التحويل الإضافي)."
                    },
                    {
                              "id": "q10",
                              "question": "What is the result of casting a null literal to a specific class type (e.g. String s = (String) null;)?\n(ما هي نتيجة تحويل القيمة null صراحة إلى نوع فئة محدد مثل (String) null؟)",
                              "options": [
                                        "A NullPointerException is thrown immediately.",
                                        "A ClassCastException is thrown.",
                                        "It compiles and evaluates to a null reference of type String without any exception.",
                                        "A compile-time error occurs."
                              ],
                              "correctIndex": 2,
                              "explanation": "Correct! In Java, 'null' has a special null type that can be cast to any reference type without throwing any exception. It simply results in a null reference of the targeted type. (قيمة null في جافا متوافقة مع كافة المراجع؛ وتحويلها إلى أي نوع يمر بنجاح ويعطي مرجعاً يحمل null دون أي استثناء)."
                    },
                    {
                              "id": "q11",
                              "question": "Consider this hierarchy: class A {}, class B extends A {}, class C extends B {}.\n\nGiven: A ref = new B();\nWhat happens when executing: C c = (C) ref;?",
                              "options": [
                                        "Compiles and prints null.",
                                        "Compiles successfully, but throws ClassCastException at runtime because ref points to an instance of B, not C.",
                                        "Compile-time error: cannot cast A to C.",
                                        "The JVM automatically instantiates a new C object."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! The code compiles because C is in the same inheritance lineage as A. However, the runtime object on the heap is an instance of B (a superclass of C), so casting it down to C fails with ClassCastException. (يصرف الكود لأن C و A في نفس شجرة الوراثة، لكن عند التشغيل الكائن الحقيقي هو B ولا يمكن تحويله لـ C فيرمي ClassCastException)."
                    },
                    {
                              "id": "q12",
                              "question": "What is the compile-time consequence of accessing a subclass method through a superclass reference without casting?\n(ما هي النتيجة التصريفية لمحاولة استدعاء دالة خاصة بالفئة الفرعية عبر مرجع من فئة الأب دون تحويل؟)",
                              "options": [
                                        "The JVM locates the method dynamically at runtime.",
                                        "A compile-time error occurs: 'cannot find symbol' because the compiler only allows method calls declared in the reference's compile-time type.",
                                        "The method returns default 0.",
                                        "The method executes on a separate thread."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! The compiler uses the reference variable's declared type to determine accessible methods. If Superclass does not declare method childSpecific(), 'superRef.childSpecific()' fails compilation until downcast. (يعتمد المصرف على نوع المرجع لتحديد الدوال المتاحة، وإذا لم تكن الدالة مصرحاً بها في فئة الأب يرفض المصرف الكود حتى يتم التحويل للأسفل)."
                    },
                    {
                              "id": "q13",
                              "question": "What is printed by executing the following code?\n\npublic class CastTest {\n    public static void main(String[] args) {\n        Object text = \"Enterprise Java\";\n        CharSequence cs = (CharSequence) text;\n        String s = (String) cs;\n        System.out.println(s.substring(0, 10));\n    }\n}",
                              "options": [
                                        "Enterprise",
                                        "ClassCastException",
                                        "null",
                                        "Enterprise Java"
                              ],
                              "correctIndex": 0,
                              "explanation": "Correct! The underlying object is a String (which implements CharSequence and extends Object). Both casts succeed cleanly, and s.substring(0, 10) extracts 'Enterprise'. (الكائن الأصلي في الذاكرة هو String وهو يطبق CharSequence ويرث Object؛ لذا تنجح كافة التحويلات ويطبع مقطع النص Enterprise)."
                    },
                    {
                              "id": "q14",
                              "question": "In an enterprise message-driven pipeline receiving generic Message<Object> events, why is defensive casting critical during event deserialization?\n(في معمارية الرسائل المؤسسية التي تستقبل أحداثاً عامة، لماذا يعتبر التحويل الدفاعي للنوع خطوة حرجة؟)",
                              "options": [
                                        "To allow memory to be decrypted.",
                                        "To inspect payload types safely (e.g. PaymentEvent, RefundEvent) and route them to designated processors without crashing worker threads with ClassCastException.",
                                        "Because the Java message broker requires all classes to be named Event.",
                                        "To prevent Garbage Collection from running."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Defensive type inspection and safe casting allow message handlers to differentiate various payload types safely, ensuring unexpected event payloads do not crash background message consumer threads. (الفحص والتحويل الدفاعي يضمن توجيه الحمولات المختلفة لمعالجاتها بأمان دون التسبب في سقوط خيوط المعالجة بسبب رسائل غير متوقعة)."
                    },
                    {
                              "id": "q15",
                              "question": "Consider this code:\n\nclass Animal { }\nclass Dog extends Animal { }\nclass Cat extends Animal { }\n\npublic class Test {\n    public static void main(String[] args) {\n        Animal a = new Dog();\n        Cat c = (Cat) a;\n    }\n}\n\nDoes this code compile, and what happens at runtime?",
                              "options": [
                                        "Compile-time error on line '(Cat) a' because Dog cannot be converted to Cat.",
                                        "Compiles successfully, but throws ClassCastException at runtime because a Dog instance cannot be cast to Cat.",
                                        "Compiles and executes without error; c becomes null.",
                                        "Throws an ArrayStoreException at runtime."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! It compiles because 'a' is declared as type Animal, and Cat extends Animal (making Cat a potential subtype of Animal). But at runtime, 'a' points to a Dog, so casting it to sibling class Cat triggers a ClassCastException. (يصرف الكود لأن المرجع مصرح كـ Animal و Cat ترث Animal، ولكن عند التشغيل الكائن الفعلي كلب Dog ولا يمكن تحويله إلى قطة Cat فيرمي ClassCastException)."
                    }
          ]
        }
      ]
    },

    /* ==========================================================================
       TOPIC 28: Upcasting / Downcasting
       ========================================================================== */
    {
      id: "upcasting-downcasting",
      title: "28. Upcasting / Downcasting",
      description: "Mastering Upcasting and Downcasting in Java: Implicit widening conversion, explicit narrowing downcasting, polymorphic method dispatch, and accessing subclass extensions.",
      lessons: [
        {
          id: "upcasting-downcasting-mastery",
          title: "Complete Guide to Upcasting and Downcasting",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "Understanding Upcasting and Downcasting in Java (فهم التحويل للأعلى والتحويل للأسفل)"
            },
            {
              type: "paragraph",
              text: "Upcasting and Downcasting are the two directional movements along an object-oriented inheritance tree: 1) UPCASTING: Casting from a subclass to a superclass (moving UP the tree). It is always 100% safe, happens automatically (implicitly) without cast operators, and enables Polymorphism; 2) DOWNCASTING: Casting from a superclass to a subclass (moving DOWN the tree). It is narrowing and potentially unsafe, requires an explicit cast operator '(Subclass)', and allows accessing subclass-specific methods that are hidden under the superclass reference."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "التحويل للأعلى (Upcasting) والتحويل للأسفل (Downcasting) هما حركتان متعاكستان عبر شجرة الوراثة: 1) Upcasting: التحويل من الفئة الابنة إلى الفئة الأب (صعوداً). وهو آمن تماماً بنسبة 100%، ويتم تلقائياً دون كتابة أقواس التحويل، وهو الأساس الذي يقوم عليه تعدد الأشكال (Polymorphism)؛ 2) Downcasting: التحويل من الفئة الأب إلى الفئة الابنة (هبوطاً). وهو تحويل تضييقي يحمل خطورة حدوث أخطاء، ويتطلب كتابة التحويل الصريح '(Subclass)'، ويُستخدم لاستعادة الدوال الخاصة بالفئة الابنة التي حُجبت بالمرجع العام."
            },
            {
              type: "paragraph",
              text: "Core Architectural Principle: Upcasting abstracts away concrete details so systems can treat diverse objects uniformly (e.g. List<Animal>), whereas Downcasting re-specializes the reference when specific concrete features are required."
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
              text: "Example 1: Implicit Upcasting (Subclass to Superclass) (المثال 1: التحويل التلقائي للأعلى Upcasting)"
            },
            {
              type: "paragraph",
              text: "Assigning a subclass object to a superclass reference variable requires no explicit cast syntax."
            },
            {
              type: "code",
              language: "java",
              filename: "ImplicitUpcastingDemo.java",
              code: `public class ImplicitUpcastingDemo {
    static class Vehicle {
        void fuel() { System.out.println("Vehicle refueling standard fuel."); }
    }

    static class Motorcycle extends Vehicle {
        void wheelie() { System.out.println("Motorcycle performing a wheelie stunt!"); }
    }

    public static void main(String[] args) {
        Motorcycle bike = new Motorcycle();

        // Implicit Upcast: Motorcycle IS-A Vehicle (no cast syntax needed)
        Vehicle vehicleRef = bike;

        vehicleRef.fuel(); // Accessible: declared in Vehicle
        // vehicleRef.wheelie(); // COMPILER ERROR: wheelie() is not visible via Vehicle reference!
    }
}`,
              output: `Vehicle refueling standard fuel.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "Upcasting is safe and implicit. However, once upcast, the compiler only permits calling methods defined in the superclass type (Vehicle)."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "التحويل للأعلى آمن وتلقائي تماماً؛ لكن المترجم يقيد رؤية الدوال لتلك المعرفة في فئة الأب Vehicle فقط ويحجب دوال الابن الخاصة."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Explicit Downcasting (Superclass to Subclass) (المثال 2: التحويل الصريح للأسفل Downcasting)"
            },
            {
              type: "paragraph",
              text: "Using an explicit cast operator to regain access to subclass-specific functionality."
            },
            {
              type: "code",
              language: "java",
              filename: "ExplicitDowncastingDemo.java",
              code: `public class ExplicitDowncastingDemo {
    static class Account {
        void displayBalance() { System.out.println("Balance: $5,000.00"); }
    }

    static class InvestmentAccount extends Account {
        void buyStock(String ticker, int shares) {
            System.out.println("Purchased " + shares + " shares of " + ticker);
        }
    }

    public static void main(String[] args) {
        Account generalAccount = new InvestmentAccount(); // Upcast
        generalAccount.displayBalance();

        // Explicit Downcast to restore InvestmentAccount capabilities
        InvestmentAccount invest = (InvestmentAccount) generalAccount;
        invest.buyStock("GOOGL", 25);
    }
}`,
              output: `Balance: $5,000.00
Purchased 25 shares of GOOGL`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "Because generalAccount actually holds an InvestmentAccount, downcasting with '(InvestmentAccount)' safely unlocks buyStock()."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "لأن الكائن الحقيقي هو حساب استثماري، فإن التحويل للأسفل بـ (InvestmentAccount) يعيد تفعيل دالة شراء الأسهم المحجوبة."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Dynamic Polymorphism through Upcasting (المثال 3: تعدد الأشكال عبر التحويل للأعلى)"
            },
            {
              type: "paragraph",
              text: "Upcasting allows treating diverse objects uniformly while retaining dynamic method overriding."
            },
            {
              type: "code",
              language: "java",
              filename: "PolymorphicUpcastDemo.java",
              code: `public class PolymorphicUpcastDemo {
    static class Instrument {
        void play() { System.out.println("Generic instrument sound."); }
    }

    static class Piano extends Instrument {
        @Override void play() { System.out.println("Piano: Delicate melodic chords."); }
    }

    static class Violin extends Instrument {
        @Override void play() { System.out.println("Violin: Expressive string resonance."); }
    }

    public static void main(String[] args) {
        // Upcasting multiple subtypes into a single Instrument array
        Instrument[] orchestra = { new Piano(), new Violin(), new Instrument() };

        for (Instrument inst : orchestra) {
            // JVM dynamically dispatches to the real overridden method!
            inst.play();
        }
    }
}`,
              output: `Piano: Delicate melodic chords.
Violin: Expressive string resonance.
Generic instrument sound.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "Upcasting to Instrument lets us store Piano and Violin in one collection. At runtime, Java invokes each overridden play() implementation."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "أتاح الـ Upcasting جمع الآلات في مصفوفة موحدة، وعند التشغيل استدعى الـ JVM النسخة المتجاوزة الخاصة بكل آلة ببراعة."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Upcasting to Interface References (المثال 4: التحويل للأعلى لمراجع الواجهات)"
            },
            {
              type: "paragraph",
              text: "Upcasting to an interface separates the consumer from concrete implementation details."
            },
            {
              type: "code",
              language: "java",
              filename: "InterfaceUpcastDemo.java",
              code: `public class InterfaceUpcastDemo {
    interface EncryptionService {
        String encrypt(String raw);
    }

    static class AesEncryptionService implements EncryptionService {
        @Override
        public String encrypt(String raw) {
            return "[AES-256-GCM:" + raw.hashCode() + "]";
        }
    }

    public static void main(String[] args) {
        // Upcasting concrete class to interface contract
        EncryptionService service = new AesEncryptionService();

        String cipher = service.encrypt("TopSecretData");
        System.out.println("Ciphertext output: " + cipher);
    }
}`,
              output: `Ciphertext output: [AES-256-GCM:-1263590497]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "Upcasting to EncryptionService codes to the interface rather than the implementation, allowing seamless future algorithm replacement."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "التحويل لواجهة EncryptionService يتيح البرمجة المعتمدة على الواجهات، مما يسهل استبدال خوارزمية التشفير لاحقاً دون تعديل الكود المستهلك."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Downcasting Failure on Real Superclass Object (المثال 5: فشل التحويل للأسفل لكائن أصل حقيقي)"
            },
            {
              type: "paragraph",
              text: "You cannot downcast a genuine superclass instance into a subclass; it MUST have been born as the subclass!"
            },
            {
              type: "code",
              language: "java",
              filename: "GenuineSuperclassDowncastDemo.java",
              code: `public class GenuineSuperclassDowncastDemo {
    static class Shape {}
    static class Triangle extends Shape {
        void printAngles() { System.out.println("Total angles: 180 degrees"); }
    }

    public static void main(String[] args) {
        // Genuine Shape object created on the heap
        Shape plainShape = new Shape();

        try {
            // Illegal: plainShape was never a Triangle!
            Triangle t = (Triangle) plainShape;
            t.printAngles();
        } catch (ClassCastException ex) {
            System.out.println("Fatal Downcast Error: A genuine superclass instance cannot be cast down!");
        }
    }
}`,
              output: `Fatal Downcast Error: A genuine superclass instance cannot be cast down!`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "Downcasting is only valid if the underlying heap object was originally created as an instance of the target subclass (or its descendants)."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "لا يمكن أبداً تحويل كائن أنشئ أصلاً كـ Shape إلى Triangle؛ فالتحويل للأسفل يشترط أن يكون الكائن قد أُنشئ كـ Triangle في الأصل."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Defensive Downcast Pattern with Modern instanceof (المثال 6: نمط التحويل الدفاعي بمطابقة الأنماط)"
            },
            {
              type: "paragraph",
              text: "The gold standard for downcasting safely across polymorphic data streams."
            },
            {
              type: "code",
              language: "java",
              filename: "DefensiveDowncastPatternDemo.java",
              code: `public class DefensiveDowncastPatternDemo {
    static class Employee {
        String name;
        Employee(String n) { this.name = n; }
    }

    static class Manager extends Employee {
        int teamSize;
        Manager(String n, int size) { super(n); this.teamSize = size; }
        void conductReview() { System.out.println("Manager " + name + " reviewing team of " + teamSize); }
    }

    public static void evaluate(Employee emp) {
        // Defensive pattern: checks type and binds variable in one step
        if (emp instanceof Manager mgr) {
            mgr.conductReview();
        } else {
            System.out.println("Standard employee review for " + emp.name);
        }
    }

    public static void main(String[] args) {
        evaluate(new Manager("Sarah", 12));
        evaluate(new Employee("Hassan"));
    }
}`,
              output: `Manager Sarah reviewing team of 12
Standard employee review for Hassan`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "Modern pattern matching eliminates manual downcasts, ensuring 'mgr' is only in scope and accessed when the object is genuinely a Manager."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "يوفر فحص النمط الحديث حماية تامة، حيث لا يتم استدعاء دوال المدير إلا إذا كان الموظف كائن Manager حقيقي."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Variable Shadowing vs Method Overriding During Upcasting (المثال 7: حجب المتغيرات مقابل تجاوز الدوال)"
            },
            {
              type: "paragraph",
              text: "Critical concept: Variables are resolved at compile-time by reference type; overridden methods are resolved at runtime by actual object!"
            },
            {
              type: "code",
              language: "java",
              filename: "ShadowingVsOverridingDemo.java",
              code: `public class ShadowingVsOverridingDemo {
    static class SuperClass {
        String tag = "SUPER_TAG"; // Variable
        void show() { System.out.println("SuperClass method: " + tag); }
    }

    static class SubClass extends SuperClass {
        String tag = "SUB_TAG"; // Shadows superclass variable!
        @Override void show() { System.out.println("SubClass method: " + tag); }
    }

    public static void main(String[] args) {
        SubClass realSub = new SubClass();
        SuperClass upcastRef = realSub; // Upcast

        // Variable access: resolved at COMPILE TIME by reference type
        System.out.println("Direct variable via SuperClass reference: " + upcastRef.tag);

        // Method access: resolved at RUNTIME by actual object type
        System.out.print("Method call via SuperClass reference:    ");
        upcastRef.show();
    }
}`,
              output: `Direct variable via SuperClass reference: SUPER_TAG
Method call via SuperClass reference:    SubClass method: SUB_TAG`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "Variables cannot be overridden. Accessing upcastRef.tag reads the SuperClass field, but calling upcastRef.show() invokes SubClass's overridden method."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "المتغيرات لا تخضع لتعدد الأشكال بل تقرأ بحسب نوع المرجع وقت التصريف (SUPER_TAG)، بينما الدوال تنفذ بحسب الكائن الحقيقي وقت التشغيل (SubClass method)."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Method Parameter Upcasting (Widening Arguments) (المثال 8: تمرير المعاملات بالتحويل التلقائي للأعلى)"
            },
            {
              type: "paragraph",
              text: "Passing specific subclasses into methods expecting general superclasses."
            },
            {
              type: "code",
              language: "java",
              filename: "ParameterUpcastDemo.java",
              code: `public class ParameterUpcastDemo {
    static class GraphicAsset {
        void render() { System.out.println("Rendering generic asset."); }
    }

    static class VectorIcon extends GraphicAsset {
        @Override void render() { System.out.println("Rendering SVG vector icon with anti-aliasing."); }
    }

    static class Renderer {
        // Accepts general GraphicAsset; any subclass is automatically upcast on call
        public static void drawToScreen(GraphicAsset asset) {
            asset.render();
        }
    }

    public static void main(String[] args) {
        VectorIcon icon = new VectorIcon();

        // Implicit upcast on parameter passing
        Renderer.drawToScreen(icon);
    }
}`,
              output: `Rendering SVG vector icon with anti-aliasing.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "When passing 'icon' to drawToScreen(GraphicAsset asset), Java performs an implicit upcast, enabling reusable utility functions."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "عند تمرير كائن VectorIcon لدالة تستقبل GraphicAsset، يتم التحويل للأعلى تلقائياً، مما يجعل الدوال العامة مرنة وتقبل أي فئة ابنة."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Method Return Upcasting (المثال 9: إرجاع الكائنات بالتحويل للأعلى)"
            },
            {
              type: "paragraph",
              text: "Factory methods return general superclass references, hiding internal concrete class details."
            },
            {
              type: "code",
              language: "java",
              filename: "ReturnUpcastDemo.java",
              code: `public class ReturnUpcastDemo {
    interface DatabaseDriver {
        void connect();
    }

    static class OracleDriver implements DatabaseDriver {
        public void connect() { System.out.println("Connected to Oracle Database instance."); }
    }

    static class DriverFactory {
        // Return type is general interface; concrete subclass is implicitly upcast on return
        public static DatabaseDriver createDriver() {
            return new OracleDriver();
        }
    }

    public static void main(String[] args) {
        DatabaseDriver driver = DriverFactory.createDriver();
        driver.connect();
    }
}`,
              output: `Connected to Oracle Database instance.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "Returning new OracleDriver() from createDriver() implicitly upcasts it to DatabaseDriver, encapsulating internal implementation details."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "إرجاع الكائن من دالة المصنع بالواجهة العامة يحول الكائن للأعلى ويخفي تفاصيل الفئة الحقيقية وراء واجهة نظيفة."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Downcasting in Classic Comparable / Comparator Implementation (المثال 10: التحويل للأسفل في مقارنة الكائنات)"
            },
            {
              type: "paragraph",
              text: "How downcasting is utilized when comparing raw objects."
            },
            {
              type: "code",
              language: "java",
              filename: "ComparableDowncastDemo.java",
              code: `public class ComparableDowncastDemo {
    static class Product {
        String name;
        double price;

        Product(String n, double p) { this.name = n; this.price = p; }

        @Override
        public boolean equals(Object obj) {
            // 1. Same reference check
            if (this == obj) return true;
            // 2. Type check
            if (!(obj instanceof Product other)) return false;
            // 3. Safe downcast performed by pattern matching, compare fields
            return Double.compare(this.price, other.price) == 0 && this.name.equals(other.name);
        }
    }

    public static void main(String[] args) {
        Product p1 = new Product("Smart Watch", 199.99);
        Product p2 = new Product("Smart Watch", 199.99);
        Object genericObj = new Product("Smart Watch", 199.99); // Upcast to Object

        System.out.println("p1 equals p2:         " + p1.equals(p2));
        System.out.println("p1 equals genericObj: " + p1.equals(genericObj));
    }
}`,
              output: `p1 equals p2:         true
p1 equals genericObj: true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "Java's equals(Object obj) takes a superclass Object reference. Implementing it correctly requires defensive checking and downcasting to Product."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "تستقبل دالة equals مرجعاً عاماً من Object؛ ولتطبيقها بصورة صحيحة يجب فحص النوع والتحويل للأسفل لمقارنة الحقول الداخلية."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Enterprise Cloud Event Bus (Upcasting Ingestion & Downcasting Dispatch) (المثال 11: ناقل الأحداث السحابي المؤسسي)"
            },
            {
              type: "paragraph",
              text: "Advanced: Centralized event queue upcasting diverse event payloads on ingestion, and downcasting them in targeted consumer channels."
            },
            {
              type: "code",
              language: "java",
              filename: "CloudEventBusMaster.java",
              code: `import java.util.ArrayList;
import java.util.List;

public class CloudEventBusMaster {
    interface CloudEvent {
        String getEventId();
    }

    static class UserRegisteredEvent implements CloudEvent {
        private final String id;
        private final String email;

        UserRegisteredEvent(String id, String email) { this.id = id; this.email = email; }
        public String getEventId() { return id; }
        public String getEmail() { return email; }
    }

    static class OrderPlacedEvent implements CloudEvent {
        private final String id;
        private final double total;

        OrderPlacedEvent(String id, double total) { this.id = id; this.total = total; }
        public String getEventId() { return id; }
        public double getTotal() { return total; }
    }

    static class EventBus {
        // Upcasting ingestion: All specific events stored as generic CloudEvent
        private final List<CloudEvent> queue = new ArrayList<>();

        public void publish(CloudEvent event) {
            queue.add(event);
        }

        public void dispatchAll() {
            for (CloudEvent event : queue) {
                // Downcasting dispatch to appropriate domain microservices
                if (event instanceof UserRegisteredEvent u) {
                    System.out.printf("[EVENT -> WELCOME SERVICE] Sending welcome email to %s (ID: %s)%n",
                        u.getEmail(), u.getEventId());
                } else if (event instanceof OrderPlacedEvent o) {
                    System.out.printf("[EVENT -> FULFILLMENT] Processing shipment for $%.2f (ID: %s)%n",
                        o.getTotal(), o.getEventId());
                }
            }
        }
    }

    public static void main(String[] args) {
        EventBus bus = new EventBus();

        // Ingestion with implicit upcasting
        bus.publish(new UserRegisteredEvent("EVT-01", "developer@saudi.com"));
        bus.publish(new OrderPlacedEvent("EVT-02", 849.50));

        // Dispatch with pattern matching downcasting
        bus.dispatchAll();
    }
}`,
              output: `[EVENT -> WELCOME SERVICE] Sending welcome email to developer@saudi.com (ID: EVT-01)
[EVENT -> FULFILLMENT] Processing shipment for $849.50 (ID: EVT-02)`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "The EventBus leverages upcasting on ingestion to store all events uniformly, and downcasting on dispatch to execute event-specific logic."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "يستفيد ناقل الأحداث من التحويل للأعلى Upcasting لتخزين كافة أنواع الرسائل في قائمة موحدة، ثم يستخدم Downcasting لتوجيه كل حدث لخدمته المناسبة."
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
                "Mistake 1: Forgetting that Upcasting is automatic. Writing '(SuperClass) subObj' is redundant because Java upcasts implicitly and safely.",
                "خطأ 1: نسيان أن التحويل للأعلى يتم تلقائياً؛ فكتابة أقواس التحويل للأعلى زائدة عن الحاجة لأن جافا تقوم به مجاناً وبأمان.",
                "Mistake 2: Downcasting without verification. Never downcast without 'instanceof' unless you have a mathematical compile-time guarantee of the type.",
                "خطأ 2: التحويل للأسفل دون فحص؛ لا تقم بالتحويل لأسفل أبداً دون فحص instanceof تجنباً لانهيار التطبيق بـ ClassCastException.",
                "Mistake 3: Believing fields can be overridden polymorphically. Fields are bound by the declared reference type, whereas methods are dispatched dynamically."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Smart Device Hub with Downcast Command (التحدي العملي: مركز الأجهزة الذكية والأوامر المتخصصة)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Implement an IoT Hub: 1) Base class 'SmartDevice' with 'String deviceName' and method 'powerOn()'; 2) Subclass 'SmartBulb' with 'void setBrightness(int level)'; 3) Subclass 'SmartLock' with 'void engageDeadbolt()'; 4) Create a method 'manageDevice(SmartDevice device)' in your hub: it always powers on the device; if it's a bulb, set brightness to 80; if it's a lock, engage the deadbolt; 5) Test in main() with one bulb and one lock."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: صمم مركزاً لإدارة أجهزة إنترنت الأشياء: 1) فئة أساسية SmartDevice بها deviceName ودالة powerOn()؛ 2) فئة فرعية SmartBulb بها دالة setBrightness(int level)؛ 3) فئة فرعية SmartLock بها دالة engageDeadbolt()؛ 4) دالة manageDevice(SmartDevice device) تشغل الجهاز دائماً، وإن كان مصباحاً تضبط الإضاءة على 80، وإن كان قفلاً تغلق المزلاج؛ 5) اختبر في main بمصباح وقفل."
            },
            {
              type: "code",
              language: "java",
              filename: "SmartDeviceHubChallenge.java",
              code: `public class SmartDeviceHubChallenge {
    static class SmartDevice {
        String deviceName;
        SmartDevice(String name) { this.deviceName = name; }
        void powerOn() { System.out.println(deviceName + " is now POWERED ON."); }
    }

    static class SmartBulb extends SmartDevice {
        SmartBulb(String name) { super(name); }
        void setBrightness(int level) {
            System.out.println(deviceName + " brightness calibrated to " + level + "%.");
        }
    }

    static class SmartLock extends SmartDevice {
        SmartLock(String name) { super(name); }
        void engageDeadbolt() {
            System.out.println(deviceName + " motorized deadbolt SECURED.");
        }
    }

    public static void manageDevice(SmartDevice device) {
        // Universal common behavior
        device.powerOn();

        // Downcasting for specialized behavior
        if (device instanceof SmartBulb bulb) {
            bulb.setBrightness(80);
        } else if (device instanceof SmartLock lock) {
            lock.engageDeadbolt();
        }
    }

    public static void main(String[] args) {
        // Implicit upcast when passing to manageDevice
        manageDevice(new SmartBulb("Living Room Chandelier"));
        System.out.println("----------------------------------------");
        manageDevice(new SmartLock("Front Entrance Lock"));
    }
}`,
              output: `Living Room Chandelier is now POWERED ON.
Living Room Chandelier brightness calibrated to 80%.
----------------------------------------
Front Entrance Lock is now POWERED ON.
Front Entrance Lock motorized deadbolt SECURED.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "The method manages all devices through the generic SmartDevice superclass reference (upcasting), then selectively downcasts using pattern matching to access bulb or lock controls."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "تستقبل الدالة الأجهزة بمرجع الفئة الأب العامة (Upcasting) لتشغيلها جميعاً، ثم تحول للأسفل بانتقائية للوصول لدوال السطوع وقفل الأبواب."
            }
          ],
          quiz: [
                    {
                              "id": "q1",
                              "question": "What is 'Upcasting' in Java, and why is it always type-safe?\n(ما هو التحويل للأعلى Upcasting في جافا ولماذا يعتبر آمناً دائماً من حيث النوع؟)",
                              "options": [
                                        "Converting an integer to a float.",
                                        "Casting a reference from a derived subclass to a base superclass; it is always safe because every subclass instance inherently possesses all properties of the superclass (Is-A).",
                                        "Casting any object to an array.",
                                        "Downcasting an object to a lower memory address."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Upcasting moves up the inheritance hierarchy (Child -> Parent). Because an instance of Child satisfies the Is-A relationship with Parent, upcasting never fails and cannot cause a runtime exception. (التحويل للأعلى ينقل المرجع من الفئة الابن إلى فئة الأب، وهو آمن تماماً لاستحالة فشله لأن الابن يملك بالضرورة كل مواصفات الأب)."
                    },
                    {
                              "id": "q2",
                              "question": "Is explicit casting syntax required for Upcasting in Java (e.g. Parent p = (Parent) new Child();)?\n(هل يلزم كتابة معامل التحويل الصريح عند التحويل للأعلى في جافا؟)",
                              "options": [
                                        "Yes, the compiler mandates explicit parenthesis on all reference casts.",
                                        "No, upcasting is performed implicitly by the compiler without requiring any cast operator.",
                                        "Only when upcasting to an abstract class.",
                                        "Only when the subclass has private methods."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Upcasting is completely implicit. Writing 'Parent p = new Child();' is the standard idiomatic way to upcast in Java; the cast operator (Parent) is redundant. (التحويل للأعلى تلقائي تماماً ولا يتطلب كتابة (Parent)؛ فالصيغة Parent p = new Child() قياسية ومقبولة تلقائياً)."
                    },
                    {
                              "id": "q3",
                              "question": "What is the primary motivation for performing a Downcast in Java?\n(ما هو الدافع الأساسي للقيام بعملية التحويل للأسفل Downcasting في جافا؟)",
                              "options": [
                                        "To make the application use less CPU cache.",
                                        "To regain access to specialized subclass-specific methods and fields that are not visible through a general superclass reference.",
                                        "To override static methods.",
                                        "To invoke the garbage collector on the superclass."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! When an object is held in a superclass reference, only superclass members are visible to the compiler. Downcasting to the specific subclass is necessary to invoke methods unique to that subclass. (عند الإشارة للكائن عبر فئة الأب، تختفي دوال الابن الخاصة عن المصرف، ويصبح التحويل للأسفل ضرورياً للوصول لتلك الدوال والحقول الخاصة بالابن)."
                    },
                    {
                              "id": "q4",
                              "question": "What happens when you attempt to downcast an object that was instantiated as a genuine base superclass instance (e.g. Animal a = new Animal(); Dog d = (Dog) a;)?\n(ماذا يحدث عند محاولة تحويل كائن تم إنشاؤه في الأصل ككائن من فئة الأب إلى فئة الابن؟)",
                              "options": [
                                        "The JVM dynamically injects the missing Dog methods into the Animal object.",
                                        "A ClassCastException is thrown at runtime because the actual heap object lacks the identity and implementation of Dog.",
                                        "The code fails to compile.",
                                        "The variable 'd' is assigned null quietly."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! You can only downcast to a subclass if the object on the heap actually is an instance of that subclass (or one of its descendants). A raw Animal instance cannot be transformed into a Dog at runtime, so ClassCastException is thrown. (لا يمكن التحويل للأسفل إلا إذا كان الكائن الأصلي في الذاكرة ابناً بالفعل؛ أما الكائن المنشأ كأب أصلي new Animal() فلا يملك صفات الابن ويرمي ClassCastException)."
                    },
                    {
                              "id": "q5",
                              "question": "Consider this code:\n\nclass Parent {\n    int val = 10;\n    void show() { System.out.print(\"P_METHOD \"); }\n}\nclass Child extends Parent {\n    int val = 20;\n    void show() { System.out.print(\"C_METHOD \"); }\n}\n\nParent p = new Child();\nSystem.out.print(p.val + \" \");\np.show();\n\nWhat is the exact output?",
                              "options": [
                                        "20 C_METHOD",
                                        "10 C_METHOD ",
                                        "10 P_METHOD ",
                                        "20 P_METHOD "
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! In Java, variables are NOT polymorphic (they are shadowed and resolved based on the compile-time reference type 'Parent', giving val = 10). Methods ARE polymorphic and resolved dynamically (Child's show() runs, printing 'C_METHOD '). Output: '10 C_METHOD '. (المتغيرات في جافا لا تخضع لتعدد الأشكال وتعتمد على نوع المرجع Parent فتعطي 10، بينما الدوال متعددة الأشكال وتعتمد على الكائن الفعلي Child فتطبع C_METHOD)."
                    },
                    {
                              "id": "q6",
                              "question": "Why is upcasting to an interface reference (e.g. List<String> list = new ArrayList<>();) considered an industry best practice?\n(لماذا يعتبر التحويل للأعلى لمرجع واجهة مثل List<String> list = new ArrayList<>() من أفضل الممارسات البرمجية؟)",
                              "options": [
                                        "Because interfaces execute faster than classes.",
                                        "It decouples client code from specific implementations, allowing the underlying data structure to be swapped (e.g. to LinkedList) with zero changes to downstream code.",
                                        "Because classes cannot be passed as method arguments.",
                                        "It prevents the list from growing in size."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Programming to interfaces (using upcasted references) achieves loose coupling. If requirements change, swapping ArrayList for LinkedList or CopyOnWriteArrayList requires changing only the instantiation line. (البرمجة عبر الواجهات تحقق اقتراناً مرناً؛ فاستبدال ArrayList بـ LinkedList يتطلب تعديل سطر الإنشاء فقط دون المساس بباقي أجزاء النظام)."
                    },
                    {
                              "id": "q7",
                              "question": "How does Method Parameter Upcasting support the Open/Closed Principle (OCP)?\n(كيف يدعم التحويل التلقائي للأعلى في معاملات الدوال مبدأ الفتح والإغلاق OCP؟)",
                              "options": [
                                        "By requiring separate methods for every possible subclass.",
                                        "By allowing methods to accept a general base type (e.g. void process(Shape s)), enabling new shapes to be added without modifying the process method.",
                                        "By locking the method bytecode permanently.",
                                        "By converting all parameters to primitives."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Accepting a superclass parameter allows callers to pass any present or future subclass without modifying the consumer method, keeping code open for extension but closed for modification. (قبول نوع الأب في المعامل يسمح بتمرير أي فئة فرعية حالية أو مستقبلية دون الحاجة لتعديل كود الدالة المستقبلة مما يحقق مبدأ OCP)."
                    },
                    {
                              "id": "q8",
                              "question": "Consider this pattern matching code:\n\nObject item = \"Java Core\";\nif (item instanceof String s && s.length() > 5) {\n    System.out.println(s.toUpperCase());\n}\n\nWhy is 's' safely accessible in the second condition (s.length() > 5)?",
                              "options": [
                                        "Because Java variables are hoisted globally.",
                                        "Because the '&&' logical AND operator short-circuits: the right-hand side is only evaluated if 'item instanceof String' evaluates to true, guaranteeing 's' is initialized and non-null.",
                                        "Because the compiler replaces s with a static constant.",
                                        "Because instanceof always returns true."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! The && operator only evaluates the right operand if the left operand is true. If item is a String, pattern variable 's' is definitely bound and non-null, so s.length() > 5 is completely safe. (بسبب خاصية الاختصار في معامل &&، لا يُفحص الطرف الأيمن إلا إذا تحقق الأيسر بنجاح، مما يضمن أن المتغير s مهيأ وغير فارغ حتماً)."
                    },
                    {
                              "id": "q9",
                              "question": "What occurs with the scope of pattern variable 's' in this negative check pattern?\n\npublic void printString(Object obj) {\n    if (!(obj instanceof String s)) {\n        return;\n    }\n    System.out.println(s.toUpperCase());\n}",
                              "options": [
                                        "Compile-time error: 's' is not in scope outside the if block.",
                                        "It compiles and runs correctly because Java flow scoping recognizes that execution can only continue past the return statement if obj IS an instance of String.",
                                        "Throws a NullPointerException on the return statement.",
                                        "The compiler deletes the method."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Java flow scoping analyzes control flow. Because the if block returns when obj is NOT a String, the code following the if block is only reachable when obj IS a String, making 's' safely in scope! (يفهم تحليل مسار التحكم في جافا Flow Scoping أن الكود بعد الـ if لا يمكن الوصول إليه إلا إذا كان الكائن نصاً بالفعل، ولذا يظل المتغير s متاحاً في النطاق بنجاح)."
                    },
                    {
                              "id": "q10",
                              "question": "Prior to the introduction of Generics in Java 5, why was extensive downcasting required when using Collections?\n(قبل ظهور الأنواع العامة Generics في جافا 5، لماذا كان التحويل للأسفل Downcasting إلزامياً بكثرة مع المجموعات؟)",
                              "options": [
                                        "Because Java 1.4 did not support arrays.",
                                        "Because collections stored elements as raw java.lang.Object references, requiring developers to manually cast objects back to their actual types upon retrieval.",
                                        "Because downcasting was faster in early JVMs.",
                                        "Because primitive types were forbidden."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Legacy collections stored elements as 'Object'. Every call to list.get(i) returned an Object that had to be explicitly downcasted: String s = (String) list.get(i); Generics automated and type-checked this process at compile time. (كانت المجموعات القديمة تخزن كل شيء كـ Object، مما كان يجبر المطور على كتابة تحويل صريح للأسفل عند استرجاع أي عنصر من القائمة)."
                    },
                    {
                              "id": "q11",
                              "question": "What is printed by running the following program?\n\nclass Base {\n    void speak() { System.out.print(\"Base \"); }\n}\nclass Derived extends Base {\n    void speak() { System.out.print(\"Derived \"); }\n    void extra() { System.out.print(\"Extra \"); }\n}\npublic class FlowDemo {\n    public static void main(String[] args) {\n        Base b = new Derived();\n        b.speak();\n        ((Derived) b).extra();\n    }\n}",
                              "options": [
                                        "Base Extra ",
                                        "Derived Extra ",
                                        "Derived Derived ",
                                        "Compile-time error on extra()"
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Polymorphic dynamic dispatch resolves b.speak() to Derived's implementation ('Derived '). Downcasting ((Derived) b) makes the extra() method accessible, printing 'Extra '. Total output: 'Derived Extra '. (استدعاء b.speak ينفذ دالة الابن المتجاوزةDerived، والتحويل الصريح يسمح بالوصول لدالة الابن الخاصة extra فتطبع Extra، والناتج Derived Extra )."
                    },
                    {
                              "id": "q12",
                              "question": "In a GUI component architecture, why are heterogeneous UI controls (Button, CheckBox, Slider) upcast into a List<UIComponent>?\n(في معمارية واجهات المستخدم، لماذا يتم تحويل عناصر التحكم المختلفة للأعلى ووضعها في قائمة List<UIComponent>؟)",
                              "options": [
                                        "To force all buttons to have the same color.",
                                        "To allow the window rendering engine to iterate through all controls polymorphically and call component.render() without caring about individual control types.",
                                        "Because Java does not permit multiple windows.",
                                        "To prevent mouse clicks."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Upcasting to a common UIComponent abstraction allows layout managers and render loops to treat all elements uniformly (calling render(), layout(), refresh()) while individual elements render their specific appearances. (التحويل للأعلى يتيح لمحرك الرسوميات التكرار على كافة العناصر ومعاملتها بشكل موحد عبر استدعاء render() دون الاهتمام بالنوع التفصيلي لكل زر أو حقل)."
                    },
                    {
                              "id": "q13",
                              "question": "Consider two unrelated interfaces:\n\ninterface Auditable { void audit(); }\ninterface Exportable { void exportData(); }\nclass FinancialReport implements Auditable, Exportable {\n    public void audit() { System.out.print(\"Audited \"); }\n    public void exportData() { System.out.print(\"Exported \"); }\n}\n\nAuditable a = new FinancialReport();\nExportable e = (Exportable) a;\ne.exportData();\n\nWhat happens when this code executes?",
                              "options": [
                                        "Compile-time error: Auditable cannot be cast to Exportable.",
                                        "Compiles and prints: Exported ",
                                        "ClassCastException at runtime.",
                                        "Prints: Audited "
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Because both are interfaces, the compiler allows the cast between Auditable and Exportable. At runtime, the actual object on the heap (FinancialReport) implements BOTH interfaces, so the cast succeeds and prints 'Exported '. (يسمح المصرف بالتحويل بين الواجهات؛ وعند التشغيل الكائن الفعلي يطبق كلا الواجهتين معاً فينجح التحويل ويطبع Exported بنجاح)."
                    },
                    {
                              "id": "q14",
                              "question": "What is the primary danger of unchecked downcasting in complex legacy enterprise applications?\n(ما هو الخطر الأكبر للتحويل للأسفل غير المفحوص في التطبيقات المؤسسية الضخمة؟)",
                              "options": [
                                        "It causes database connections to disconnect permanently.",
                                        "It introduces fragile points where unanticipated object subtypes or null values throw ClassCastExceptions, potentially crashing background batch jobs or service threads.",
                                        "It slows down network transmission speeds.",
                                        "It converts private fields into public fields."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Blind downcasting without instanceof checks assumes an invariant that may be violated by future extensions or refactorings, causing sudden ClassCastException crashes in production workflows. (التحويل الأعمى دون فحص مسبق يفترض ثبات النوع؛ وإذا طرأ تعديل على النظام بتمرير كائن فرعي آخر يسقط الخيط فجأة بخطأ ClassCastException)."
                    },
                    {
                              "id": "q15",
                              "question": "What is printed by the following code?\n\nclass Top {\n    void identify() { System.out.print(\"TOP \"); }\n}\nclass Middle extends Top {\n    void identify() { System.out.print(\"MID \"); }\n}\nclass Bottom extends Middle {\n    void identify() { System.out.print(\"BOT \"); }\n}\npublic class ChainTest {\n    public static void main(String[] args) {\n        Top t = new Bottom();\n        Middle m = (Middle) t;\n        t.identify();\n        m.identify();\n    }\n}",
                              "options": [
                                        "TOP MID ",
                                        "BOT BOT ",
                                        "MID BOT ",
                                        "BOT MID "
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Regardless of whether the reference is of type Top or Middle, the actual object on the heap is an instance of Bottom. Because identify() is an overridden instance method, dynamic method dispatch invokes Bottom's method in both calls, printing 'BOT BOT '. (مهما تغير نوع المرجع Top أو Middle، فإن الكائن الفعلي في الذاكرة هو Bottom، وتعدد الأشكال الديناميكي يستدعي دائماً دالة الكائن الفعلي فيطبع BOT BOT)."
                    }
          ]
        }
      ]
    }
  ];
})();
