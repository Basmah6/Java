/**
 * Java Curriculum Module - Part 4
 * Topics:
 * 7. Java Modifiers
 * 8. Java Encapsulation
 * 
 * 100% Offline, Pure JavaScript. Complete educational content with full bilingual (English & Arabic) explanations.
 */

(function () {
  'use strict';

  window.JAVA_TOPICS_PART4 = [
    /* ==========================================================================
       TOPIC 7: Java Modifiers
       ========================================================================== */
    {
      id: "java-modifiers",
      title: "7. Java Modifiers",
      description: "Mastering Java Access and Non-Access Modifiers: public, private, protected, package-private, final, static, abstract, transient, and volatile.",
      lessons: [
        {
          id: "modifiers-mastery",
          title: "Comprehensive Guide to Java Modifiers",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "Overview of Java Modifiers (نظرة شاملة على محددات جافا)"
            },
            {
              type: "paragraph",
              text: "In Java, modifiers are keywords added to declarations of classes, methods, and variables to control their scope, accessibility, and behavior. Modifiers are divided into two primary categories: 1) Access Modifiers (public, protected, default/package-private, private); 2) Non-Access Modifiers (final, static, abstract, transient, synchronized, volatile)."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "المحددات (Modifiers) في جافا هي كلمات مفتاحية تُضاف لتعريف الفئات والدوال والمتغيرات للتحكم في نطاق رؤيتها وسلوكها. تنقسم إلى قسمين رئيسيين: 1) محددات الوصول (Access Modifiers) وتتحكم في من يستطيع الوصول للعنصر (عام public، محمي protected، افتراضي الحزمة default، خاص private)؛ 2) محددات الخصائص والسلوك (Non-Access Modifiers) مثل الثابت final، والساكن static، والمجرد abstract."
            },
            {
              type: "paragraph",
              text: "Selecting the correct modifier is fundamental for security, code architecture, and preventing unintended mutation across large software systems."
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
              text: "Example 1: Public vs Private Access Modifiers (المثال 1: المحدد العام public مقابل الخاص private)"
            },
            {
              type: "paragraph",
              text: "Demonstrating how private fields protect sensitive data from external tampering."
            },
            {
              type: "code",
              language: "java",
              filename: "AccessDemo.java",
              code: `public class AccessDemo {
    static class Vault {
        public String vaultLabel = "Corporate Gold Reserve";
        private String secretCombination = "9821-ALPHA"; // Inaccessible externally

        public void printPublicInfo() {
            System.out.println("Vault: " + vaultLabel);
            // Secret can be read internally within the same class
            System.out.println("Internal audit confirms secret key is loaded.");
        }
    }

    public static void main(String[] args) {
        Vault v = new Vault();
        System.out.println("Public Label: " + v.vaultLabel);
        v.printPublicInfo();

        // System.out.println(v.secretCombination); // COMPILER ERROR: secretCombination has private access
    }
}`,
              output: `Public Label: Corporate Gold Reserve
Vault: Corporate Gold Reserve
Internal audit confirms secret key is loaded.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "Fields marked 'public' can be accessed from any class. Fields marked 'private' are restricted entirely to the declaring class, safeguarding secrets."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "الحقول المعرفة كـ 'public' يمكن لأي فئة أخرى قراءتها وتعديلها، بينما الحقول 'private' محصورة تماماً داخل نفس الفئة ولا يمكن لأي كود خارجي الوصول إليها."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Package-Private (Default) Access (المثال 2: الوصول الافتراضي على مستوى الحزمة)"
            },
            {
              type: "paragraph",
              text: "When no modifier keyword is specified, access is restricted to the current package."
            },
            {
              type: "code",
              language: "java",
              filename: "PackagePrivateDemo.java",
              code: `public class PackagePrivateDemo {
    static class NetworkPacket {
        // No modifier: package-private (visible to classes in the same package)
        String packetId = "PKT-1002";
        int payloadSize = 1024;

        void route() {
            System.out.println("Routing " + packetId + " (" + payloadSize + " bytes) through internal gateway.");
        }
    }

    public static void main(String[] args) {
        NetworkPacket pkt = new NetworkPacket();
        pkt.route();
    }
}`,
              output: `Routing PKT-1002 (1024 bytes) through internal gateway.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "Omitting an access modifier grants package-private access. Classes in the same package can access it, while external packages cannot."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "عدم كتابة أي محدد وصول يمنح الصلاحية الافتراضية (Package-private). يمكن لأي فئة داخل نفس الحزمة الوصول للعنصر، بينما يُحجب عن أي حزمة أخرى."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Protected Access in Subclasses (المثال 3: المحدد المحمي protected في الفئات الفرعية)"
            },
            {
              type: "paragraph",
              text: "Allowing access within the same package AND by derived subclasses in different packages."
            },
            {
              type: "code",
              language: "java",
              filename: "ProtectedDemo.java",
              code: `public class ProtectedDemo {
    static class BaseDevice {
        protected String firmwareVersion = "v3.1.4";

        protected void diagnostic() {
            System.out.println("Base diagnostic running firmware " + firmwareVersion);
        }
    }

    static class SmartRouter extends BaseDevice {
        void checkStatus() {
            // Can access protected members of parent class
            System.out.println("Router checking in with: " + firmwareVersion);
            diagnostic();
        }
    }

    public static void main(String[] args) {
        SmartRouter router = new SmartRouter();
        router.checkStatus();
    }
}`,
              output: `Router checking in with: v3.1.4
Base diagnostic running firmware v3.1.4`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "'protected' allows subclasses to inherit and invoke parent capabilities while blocking arbitrary public access from unrelated classes."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "المحدد 'protected' يسمح للفئات الوارثة (Subclasses) بالوصول لخصائص الفئة الأب ودوالها، مع منع الفئات الغريبة غير الوارثة من التدخل."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: The 'final' Class (المثال 4: الفئة الثابتة final لمنع الوراثة)"
            },
            {
              type: "paragraph",
              text: "Preventing any other class from extending or subclassing a class."
            },
            {
              type: "code",
              language: "java",
              filename: "FinalClassDemo.java",
              code: `public class FinalClassDemo {
    // A final class cannot be extended (e.g. java.lang.String is final)
    static final class CryptoEngine {
        void encrypt(String text) {
            System.out.println("Encrypting '" + text + "' with SHA-256");
        }
    }

    // class RogueEngine extends CryptoEngine {} // COMPILER ERROR: cannot inherit from final CryptoEngine

    public static void main(String[] args) {
        CryptoEngine engine = new CryptoEngine();
        engine.encrypt("ClassifiedPassword");
    }
}`,
              output: `Encrypting 'ClassifiedPassword' with SHA-256`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "Marking a class 'final' locks its implementation, preventing subclasses from altering security-critical algorithms (like Java's String or Integer)."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "جعل الفئة 'final' يمنع وراثتها بالكامل، وهو أمر حاسم في خوارزميات الأمان لحمايتها من التلاعب والتجاوز (مثل فئة String في جافا)."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: The 'final' Method (المثال 5: الدالة الثابتة final لمنع إعادة التعريف)"
            },
            {
              type: "paragraph",
              text: "Allowing class inheritance while strictly locking specific methods from being overridden."
            },
            {
              type: "code",
              language: "java",
              filename: "FinalMethodDemo.java",
              code: `public class FinalMethodDemo {
    static class PaymentGateway {
        // Final method: cannot be overridden by subclasses
        final void auditTransaction(String id, double amount) {
            System.out.println("[TAMPER-PROOF AUDIT] TX: " + id + " | Amount: $" + amount);
        }

        void processPayment() {
            System.out.println("Processing standard card payment.");
        }
    }

    static class CustomGateway extends PaymentGateway {
        @Override
        void processPayment() {
            System.out.println("Processing PayPal payment.");
        }

        // void auditTransaction(String id, double amt) {} // COMPILER ERROR: cannot override final method
    }

    public static void main(String[] args) {
        CustomGateway cg = new CustomGateway();
        cg.processPayment();
        cg.auditTransaction("TX-9901", 340.0);
    }
}`,
              output: `Processing PayPal payment.
[TAMPER-PROOF AUDIT] TX: TX-9901 | Amount: $340.0`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "Subclasses can override normal methods like processPayment, but attempting to override the 'final' auditTransaction method causes a compile error."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "الدالة المعرفة كـ 'final' لا يمكن للفئات الوارثة إعادة تعريفها (@Override)، مما يضمن بقاء العمليات الحساسة كالتدقيق المحاسبي ثابتة ومحمية."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Abstract Classes and Methods (المثال 6: الفئات والدوال المجردة abstract)"
            },
            {
              type: "paragraph",
              text: "Defining an incomplete blueprint that obligates subclasses to provide concrete implementations."
            },
            {
              type: "code",
              language: "java",
              filename: "AbstractModifierDemo.java",
              code: `public class AbstractModifierDemo {
    static abstract class DatabaseDriver {
        String dbName;

        DatabaseDriver(String name) {
            this.dbName = name;
        }

        // Abstract method: no body, subclasses MUST implement
        abstract void connect();

        // Concrete method: shared implementation
        void disconnect() {
            System.out.println("Disconnected from " + dbName);
        }
    }

    static class PostgresDriver extends DatabaseDriver {
        PostgresDriver() { super("PostgreSQL"); }

        @Override
        void connect() {
            System.out.println("Connecting to PostgreSQL via TCP port 5432 with SSL.");
        }
    }

    public static void main(String[] args) {
        // DatabaseDriver d = new DatabaseDriver("Test"); // COMPILER ERROR: cannot instantiate abstract class
        DatabaseDriver pg = new PostgresDriver();
        pg.connect();
        pg.disconnect();
    }
}`,
              output: `Connecting to PostgreSQL via TCP port 5432 with SSL.
Disconnected from PostgreSQL`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "An 'abstract' class cannot be directly instantiated via 'new'. Abstract methods define contracts that concrete subclasses must implement."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "الفئة المجردة (abstract) لا يمكن إنشاء كائن منها مباشرة بواسطة 'new'. الدوال المجردة تفرض عقداً برمجياً يجب على الفئات الوارثة كتابة تنفيذه الفعلي."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: The 'transient' Modifier for Serialization (المثال 7: المحدد transient لمنع التخزين المؤقت)"
            },
            {
              type: "paragraph",
              text: "Marking sensitive fields to prevent them from being written to persistent streams or disks."
            },
            {
              type: "code",
              language: "java",
              filename: "TransientModifierDemo.java",
              code: `public class TransientModifierDemo {
    static class UserSession {
        String sessionToken = "TOK-8921";
        transient String plaintextPin = "5432"; // Transient: excluded from serialization

        void displayFields() {
            System.out.println("Token: " + sessionToken);
            System.out.println("Pin (Transient): " + plaintextPin);
        }
    }

    public static void main(String[] args) {
        UserSession session = new UserSession();
        session.displayFields();
        System.out.println("Note: 'transient' signals the JVM to ignore this field during byte serialization.");
    }
}`,
              output: `Token: TOK-8921
Pin (Transient): 5432
Note: 'transient' signals the JVM to ignore this field during byte serialization.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "The 'transient' keyword tells the JVM that a variable should not be serialized when saving the object state to storage or transmitting over a network."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "الكلمة المفتاحية 'transient' تنبه مصرف جافا لتجاهل هذا الحقل وعدم حفظه أو نقله عبر الشبكة عند إجراء عملية التسلسل (Serialization) لحماية الأسرار."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: The 'volatile' Modifier (المثال 8: المحدد volatile لضمان الرؤية بين المسارات)"
            },
            {
              type: "paragraph",
              text: "Guaranteeing memory visibility across multiple CPU thread caches."
            },
            {
              type: "code",
              language: "java",
              filename: "VolatileDemo.java",
              code: `public class VolatileDemo {
    static class ServerWorker {
        // Volatile ensures reads/writes bypass CPU L1/L2 cache and go directly to main RAM
        private volatile boolean running = true;

        void stopWorker() {
            this.running = false;
            System.out.println("Worker stop signal dispatched.");
        }

        boolean isRunning() {
            return running;
        }
    }

    public static void main(String[] args) {
        ServerWorker worker = new ServerWorker();
        System.out.println("Worker initially running? " + worker.isRunning());
        worker.stopWorker();
        System.out.println("Worker running after stop? " + worker.isRunning());
    }
}`,
              output: `Worker initially running? true
Worker stop signal dispatched.
Worker running after stop? false`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "'volatile' guarantees that all threads immediately see the most recent write to the variable by reading directly from main memory rather than local CPU cache."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "المحدد 'volatile' يضمن قراءة القيمة مباشرة من ذاكرة RAM الرئيسية بدلاً من الذاكرة المخبأة للمعالج (Cache)، مما يضمن رؤية التعديل فوراً بين المسارات المختلفة."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Combining Modifiers: public static final (المثال 9: دمج المحددات: الثوابت العامة الساكنة)"
            },
            {
              type: "paragraph",
              text: "Combining accessibility, class-level scoping, and immutability into universal constants."
            },
            {
              type: "code",
              language: "java",
              filename: "CombinedModifiers.java",
              code: `public class CombinedModifiers {
    static class SystemSpecs {
        // public: accessible everywhere
        // static: tied to class, no object needed
        // final: cannot be modified after assignment
        public static final String PLATFORM_NAME = "Enterprise Java";
        public static final int MAX_BUFFER_SIZE = 8192;
    }

    public static void main(String[] args) {
        System.out.println("Platform: " + SystemSpecs.PLATFORM_NAME);
        System.out.println("Max Buffer: " + SystemSpecs.MAX_BUFFER_SIZE + " bytes");
    }
}`,
              output: `Platform: Enterprise Java
Max Buffer: 8192 bytes`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "Multiple modifiers can be composed together. 'public static final' is the industry standard idiom for declaring global immutable constants."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "يمكن دمج عدة محددات معاً. يعتبر 'public static final' النمط القياسي لتعريف الثوابت العامة المشتركة غير القابلة للتغيير في لغة جافا."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Private Methods as Internal Encapsulated Utilities (المثال 10: الدوال الخاصة كمساعدات داخلية)"
            },
            {
              type: "paragraph",
              text: "Hiding internal complexity from public callers."
            },
            {
              type: "code",
              language: "java",
              filename: "PrivateHelperDemo.java",
              code: `public class PrivateHelperDemo {
    static class OrderValidator {
        // Public API entry point
        public boolean validateOrder(String item, int qty, double balance) {
            if (!isItemInCatalog(item)) return false;
            if (!hasStock(item, qty)) return false;
            if (!canAfford(qty * 50.0, balance)) return false;
            return true;
        }

        // Private internal helpers hidden from outside callers
        private boolean isItemInCatalog(String item) { return item != null && !item.isEmpty(); }
        private boolean hasStock(String item, int qty) { return qty > 0 && qty <= 100; }
        private boolean canAfford(double total, double balance) { return balance >= total; }
    }

    public static void main(String[] args) {
        OrderValidator val = new OrderValidator();
        System.out.println("Order valid: " + val.validateOrder("Laptop", 2, 500.0));
    }
}`,
              output: `Order valid: true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "Declaring helper methods 'private' keeps the public API surface clean and prevents external dependencies on internal implementation details."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "جعل الدوال المساعدة 'private' يحافظ على نظافة الواجهة العامة ويمنع الأنظمة الخارجية من الاعتماد على تفاصيل التنفيذ الداخلي."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Comprehensive Role-Based Security Vault (المثال 11: خزنة أمان شاملة قائمة على الصلاحيات)"
            },
            {
              type: "paragraph",
              text: "Advanced: Synthesizing public, protected, package-private, private, and final modifiers into a cohesive secure entity."
            },
            {
              type: "code",
              language: "java",
              filename: "SecureVaultMaster.java",
              code: `public class SecureVaultMaster {
    static class BankVault {
        public static final String CURRENCY = "USD";
        private final String masterPasswordHash;
        private double vaultBalance;
        protected String emergencyContact;
        int dailyAuditCount; // Package-private

        BankVault(String passwordHash, double initialBalance, String contact) {
            this.masterPasswordHash = passwordHash;
            this.vaultBalance = initialBalance;
            this.emergencyContact = contact;
            this.dailyAuditCount = 0;
        }

        public boolean unlockAndWithdraw(String passHash, double amount) {
            if (this.masterPasswordHash.equals(passHash) && amount > 0 && amount <= vaultBalance) {
                vaultBalance -= amount;
                System.out.println("Withdrawal approved: $" + amount + " " + CURRENCY);
                return true;
            }
            System.out.println("Withdrawal rejected: Authentication or balance failure.");
            return false;
        }

        public double getBalance(String passHash) {
            if (this.masterPasswordHash.equals(passHash)) {
                return vaultBalance;
            }
            return -1.0;
        }
    }

    public static void main(String[] args) {
        BankVault vault = new BankVault("HASH_SEC_77", 250000.0, "security@bank.corp");

        vault.unlockAndWithdraw("WRONG_HASH", 5000.0);
        vault.unlockAndWithdraw("HASH_SEC_77", 10000.0);
        System.out.println("Remaining Balance: $" + vault.getBalance("HASH_SEC_77") + " " + BankVault.CURRENCY);
    }
}`,
              output: `Withdrawal rejected: Authentication or balance failure.
Withdrawal approved: $10000.0 USD
Remaining Balance: $240000.0 USD`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "Combines private storage, public authentication checkpoints, package-level metrics, and static final constants to form an enterprise security boundary."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "يدمج هذا النموذج بين الخصائص الخاصة ونقاط الفحص العامة والمقاييس المشتركة لبناء جدار حماية برمجي متكامل ومحكم."
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
                "Mistake 1: Declaring top-level classes as 'private' or 'protected'. Top-level classes can only be 'public' or package-private (no modifier). Only inner classes can be private or protected.",
                "خطأ 1: محاولة تعريف فئة رئيسية كـ 'private' أو 'protected'. الفئات الرئيسية في ملفات جافا تكون إما public أو package-private فقط، والفئات الداخلية وحدها تقبل private.",
                "Mistake 2: Marking a class or method as both 'final' and 'abstract'. This is a direct logical contradiction: 'abstract' demands extension/overriding, while 'final' forbids it!",
                "خطأ 2: الجمع بين 'final' و 'abstract' لنفس الفئة أو الدالة. هذا تناقض منطقي يمنعه المصرف؛ لأن abstract تتطلب الوراثة بينما final تمنعها كلياً.",
                "Mistake 3: Assuming package-private members are protected. Package-private members cannot be accessed by subclasses in other packages."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Secure Data Capsule (التحدي العملي: كبسولة البيانات المحمية)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Build a class 'DataCapsule': 1) 'public static final String ENCRYPTION = 'AES-256''; 2) 'private final String data'; 3) 'private final int accessPin'; 4) 'protected int readCount'; 5) Public method 'readData(int pin)' returning data if PIN matches, otherwise returning 'ACCESS_DENIED'; 6) Final method 'getReadCount()'. Test access with correct and incorrect PIN in main()."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: قم بإنشاء صنف DataCapsule يحتوي على: 1) ثابت عام لنوع التشفير؛ 2) بيانات ورقم PIN خاصين وثابتين (private final)؛ 3) عداد قراءة محمي (protected)؛ 4) دالة عامة readData تتحقق من الرمز وترجع البيانات أو ترفض الدخول؛ 5) دالة ثابتة final لإرجاع عدد القراءات. اختبر الكبسولة برمز صحيح وخاطئ في main."
            },
            {
              type: "code",
              language: "java",
              filename: "DataCapsuleChallenge.java",
              code: `public class DataCapsuleChallenge {
    static class DataCapsule {
        public static final String ENCRYPTION = "AES-256";
        private final String payload;
        private final int accessPin;
        protected int readCount = 0;

        DataCapsule(String payload, int pin) {
            this.payload = payload;
            this.accessPin = pin;
        }

        public String readData(int inputPin) {
            if (this.accessPin == inputPin) {
                readCount++;
                return "[DECRYPTED VIA " + ENCRYPTION + "]: " + payload;
            }
            return "[ACCESS_DENIED]: Invalid PIN code.";
        }

        public final int getReadCount() {
            return readCount;
        }
    }

    public static void main(String[] args) {
        DataCapsule capsule = new DataCapsule("Mission Coordinates: 34.05,-118.25", 9921);

        System.out.println("Attempt 1: " + capsule.readData(1111));
        System.out.println("Attempt 2: " + capsule.readData(9921));
        System.out.println("Successful reads recorded: " + capsule.getReadCount());
    }
}`,
              output: `Attempt 1: [ACCESS_DENIED]: Invalid PIN code.
Attempt 2: [DECRYPTED VIA AES-256]: Mission Coordinates: 34.05,-118.25
Successful reads recorded: 1`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "The capsule guards payload contents behind strict private attributes, exposing access only through a guarded public authentication method."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "تحمي الكبسولة بياناتها بجعلها private ولا تسمح بالوصول إليها إلا عبر دالة عامة تتحقق من صحة رمز المرور وتزيد عداد القراءات."
            }
          ],
          quiz: [
            {
              id: "q1",
              question: "What is the correct ordering of Java access modifiers from the MOST RESTRICTIVE to the LEAST RESTRICTIVE?",
              options: [
                "public -> protected -> default (package-private) -> private",
                "private -> default (package-private) -> protected -> public",
                "private -> protected -> default (package-private) -> public",
                "default (package-private) -> private -> protected -> public"
              ],
              correctIndex: 1,
              explanation: "Correct! The hierarchy from narrowest to widest visibility is: private (class only) -> default/package-private (package only) -> protected (package + subclasses) -> public (everywhere). (الترتيب من الأضيق للأوسع: private ثم افتراضي الحزمة ثم protected ثم public)."
            },
            {
              id: "q2",
              question: "Where can a 'protected' member of class A in package 'com.core' be accessed?",
              options: [
                "Only within class A itself.",
                "Anywhere in the entire project without restrictions.",
                "Within any class in package 'com.core', AND within subclasses of A located in other packages.",
                "Only within subclasses, but forbidden in package 'com.core'."
              ],
              correctIndex: 2,
              explanation: "Correct! The 'protected' modifier allows access to any class in the same package, plus any subclass in other packages through inheritance. (المحدد protected يتيح الوصول لكافة فئات نفس الحزمة، بالإضافة لأي فئة فرعية وارثة في أي حزمة أخرى)."
            },
            {
              id: "q3",
              question: "What happens when compiling this inheritance attempt?\nfinal class SecurityCipher { }\nclass CustomCipher extends SecurityCipher { }",
              options: [
                "It compiles, but cannot define any methods.",
                "Compile-time error: cannot inherit from final SecurityCipher.",
                "It throws a SecurityException at runtime.",
                "The compiler marks CustomCipher as final as well."
              ],
              correctIndex: 1,
              explanation: "Correct! Marking a class 'final' permanently prohibits extension. Classes like String and Integer are final to preserve security and immutability. (الفئة المعرفة كـ final يُمنع وراثتها تماماً من أي فئة أخرى، ومحاولة وراثتها تسبب خطأ تصريف صريحاً)."
            },
            {
              id: "q4",
              question: "What happens if a subclass attempts to override a 'final' method from its parent class?\nclass Base { final void execute() { } }\nclass Derived extends Base { void execute() { } }",
              options: [
                "The derived method replaces the parent method successfully.",
                "Compile-time error: execute() in Derived cannot override execute() in Base; overridden method is final.",
                "It compiles, but the parent implementation always executes at runtime.",
                "The method must be marked static to override."
              ],
              correctIndex: 1,
              explanation: "Correct! Declaring a method 'final' prevents subclasses from overriding its implementation, protecting critical algorithms from being altered in derived classes. (الدالة final تمنع الفئات الوارثة من إعادة تعريفها أو تجاوز سلوكها)."
            },
            {
              id: "q5",
              question: "Predict the compilation and runtime outcome of this code:\nfinal ArrayList<String> names = new ArrayList<>();\nnames.add(\"Alex\");\nnames.add(\"Liam\");\nSystem.out.println(names.size());",
              options: [
                "Compile-time error: cannot call add() on a final ArrayList.",
                "Compiles and prints 2 without errors.",
                "Throws an UnsupportedOperationException at runtime.",
                "Prints 0 because final collections cannot hold elements."
              ],
              correctIndex: 1,
              explanation: "Correct! In Java, declaring an object reference 'final' means the reference variable cannot be reassigned to point to another object. However, the internal state of the referenced object itself remains fully mutable unless designed as immutable. (الكلمة final على المتغير المرجعي تمنع إعادة توجيهه لكائن آخر، لكنها لا تمنع تعديل محتويات الكائن نفسه)."
            },
            {
              id: "q6",
              question: "What occurs if you attempt to instantiate an abstract class directly?\nabstract class Vehicle { abstract void drive(); }\n// In main:\nVehicle v = new Vehicle();",
              options: [
                "An instance with dummy methods is created.",
                "Compile-time error: Vehicle is abstract; cannot be instantiated.",
                "It compiles and throws an AbstractMethodError at runtime.",
                "The JVM prompts the user for method bodies."
              ],
              correctIndex: 1,
              explanation: "Correct! Abstract classes represent incomplete architectural templates and cannot be instantiated with 'new'. Only concrete subclasses that provide implementations for all abstract methods can be instantiated. (الفئات المجردة هي قوالب تصميمية غير مكتملة لا يمكن إنشاؤها بـ new مباشرة)."
            },
            {
              id: "q7",
              question: "Why is declaring a method as 'abstract final void run();' an illegal combination in Java?",
              options: [
                "Because abstract methods must return an integer.",
                "Because 'abstract' mandates that a subclass must override the method, while 'final' strictly forbids overriding, creating an absolute contradiction.",
                "Because methods can have at most one modifier in Java.",
                "Because final methods must be private."
              ],
              correctIndex: 1,
              explanation: "Correct! 'abstract' says 'you must override this', while 'final' says 'you cannot override this'. The Java compiler flags this direct contradiction as an illegal modifier combination. (تناقض تركيبي مستحيل: abstract تلزم الفئات الوارثة بإعادة التعريف، بينما final تمنع ذلك تماماً)."
            },
            {
              id: "q8",
              question: "Why does the Java compiler reject: 'abstract private void calculate();'?",
              options: [
                "Because calculate is a reserved keyword.",
                "Because a 'private' method is completely invisible to subclasses, making it impossible for any subclass to ever see or override it.",
                "Because abstract methods must be declared static.",
                "Because private methods cannot have parameters."
              ],
              correctIndex: 1,
              explanation: "Correct! Subclasses cannot see or override private methods. Since an abstract method must be overridden to be implemented, marking it private creates a logical impossibility. (الدوال الخاصة private لا تراها الفئات الوارثة إطلاقاً، لذا يستحيل وراثتها أو إعادة تعريفها مما يجعل جمعها مع abstract خطأ تصريف)."
            },
            {
              id: "q9",
              question: "How is memory allocated for a 'static' variable compared to an instance variable?",
              options: [
                "A static variable is duplicated inside every object instance created.",
                "A static variable is allocated once per class when the class is loaded, shared collectively by all instances of that class.",
                "A static variable is stored exclusively on the CPU cache.",
                "A static variable is recreated every time a method is called."
              ],
              correctIndex: 1,
              explanation: "Correct! Static variables belong to the class itself. A single copy exists in memory shared across all instances, unlike instance variables which are independently allocated on the heap for each object. (المتغير الساكن static يُحجز له مكان واحد مشترك في الذاكرة لجميع كائنات الصنف، ولا يتكرر مع كل كائن جديد)."
            },
            {
              id: "q10",
              question: "If a class member has NO access modifier specified (package-private/default), who can access it?",
              options: [
                "Only the class itself.",
                "Classes located within the EXACT SAME package.",
                "Subclasses located in any package.",
                "Any class in any package across the entire project."
              ],
              correctIndex: 1,
              explanation: "Correct! Package-private (default) access grants visibility only to classes residing in the same package. It is completely inaccessible to classes outside that package, even if they are subclasses. (الوصول الافتراضي يمنح الصلاحية فقط للفئات المشتركة في نفس الحزمة تماماً، ويحجبها عن الحزم الأخرى)."
            },
            {
              id: "q11",
              question: "Can a static method use 'super' or 'this' keywords?",
              options: [
                "Yes, 'this' refers to the class object and 'super' refers to java.lang.Class.",
                "No; attempting to use 'this' or 'super' in a static method produces a compile-time error because static methods run without an object instance.",
                "Yes, but only if wrapped in a try-catch block.",
                "Only 'super' is allowed, 'this' is forbidden."
              ],
              correctIndex: 1,
              explanation: "Correct! 'this' and 'super' refer to specific object instances in memory. In a static context, no object instance exists, so using either keyword results in a compile-time error. (الكلمتان this و super تعتمدان على وجود كائن في الذاكرة، وبما أن الدوال الساكنة تعمل على مستوى الفئة، فإن استخدامهما يسبب خطأ تصريف)."
            },
            {
              id: "q12",
              question: "What is the specific architectural purpose of the 'transient' modifier on a variable?",
              options: [
                "It makes the variable thread-safe.",
                "It instructs the Java serialization subsystem to skip saving this field when serializing an object to a byte stream or disk.",
                "It deletes the variable automatically after 10 seconds.",
                "It forces the variable to be stored in the GPU."
              ],
              correctIndex: 1,
              explanation: "Correct! The 'transient' keyword prevents sensitive or temporary fields (like passwords, cryptographic keys, or cached handles) from being serialized during object byte serialization. (الكلمة transient تُخبر نظام الحفظ التسلسلي بتجاهل هذا الحقل وعدم تخزينه في ملفات أو عبر الشبكة لأسباب أمنية أو تقنية)."
            },
            {
              id: "q13",
              question: "What guarantee does the 'volatile' modifier provide in multi-threaded Java applications?",
              options: [
                "It locks the variable so only one thread can read it per hour.",
                "It ensures that reads and writes to the variable go directly to main memory rather than thread CPU caches, guaranteeing visibility of updates across threads.",
                "It automatically converts the variable into a synchronized method.",
                "It prevents the variable from ever being null."
              ],
              correctIndex: 1,
              explanation: "Correct! 'volatile' ensures visibility: any write to a volatile variable is immediately written to main memory and subsequent reads by other threads immediately see the updated value rather than stale CPU cache copies. (الكلمة volatile تضمن رؤية فورية للتعديلات بين خيوط المعالجة المتزامنة بالقراءة والكتابة المباشرة من الذاكرة الرئيسية)."
            },
            {
              id: "q14",
              question: "Which access modifiers are permitted on a top-level (outer) class in a standard Java source file?",
              options: [
                "public, protected, package-private, and private.",
                "Only public and package-private (no modifier); top-level classes CANNOT be declared private or protected.",
                "Only public is permitted.",
                "Only private is permitted."
              ],
              correctIndex: 1,
              explanation: "Correct! Top-level classes can only be 'public' (accessible to other packages) or package-private (accessible within the same package). Marking an outer class 'private' or 'protected' causes a compile-time error. (الفئات الرئيسية الخارجية لا تقبل سوى public أو افتراضي الحزمة، ولا يمكن أن تكون private أو protected)."
            },
            {
              id: "q15",
              question: "What is the standard Java naming convention and modifier combination for declaring global application constants?",
              options: [
                "public int constant_limit = 100;",
                "public static final int MAXIMUM_RETRY_LIMIT = 5;",
                "private volatile static int maxRetryLimit = 5;",
                "protected abstract int MAX_LIMIT;"
              ],
              correctIndex: 1,
              explanation: "Correct! Constants in Java are declared as 'public static final' (accessible everywhere, single shared memory copy, permanently unmodifiable) and named in UPPER_SNAKE_CASE. (الثوابت العامة تُعرف بـ public static final وتُكتب بأحرف كبيرة مفصولة بشرطة سفلية وفق المعايير العالمية لجافا)."
            }
          ]
        }
      ]
    },

    /* ==========================================================================
       TOPIC 8: Java Encapsulation
       ========================================================================== */
    {
      id: "java-encapsulation",
      title: "8. Java Encapsulation",
      description: "Mastering Encapsulation & Data Hiding in Java: Private fields, getter/setter patterns, validation gates, read-only vs write-only classes, and defensive copying.",
      lessons: [
        {
          id: "encapsulation-mastery",
          title: "Complete Guide to Java Encapsulation",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "The Principle of Encapsulation (مبدأ الكبسولة وإخفاء البيانات)"
            },
            {
              type: "paragraph",
              text: "Encapsulation is one of the four foundational pillars of Object-Oriented Programming (along with Inheritance, Polymorphism, and Abstraction). It is the mechanism of wrapping data (attributes) and code (methods operating on the data) together as a single cohesive unit, while shielding the internal state from unauthorized direct external access. This technique is widely known as Data Hiding."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "الكبسلة (Encapsulation) هي أحد الأركان الأربعة الأساسية للبرمجة كائنية التوجه. تعني تغليف البيانات (الخصائص) مع الدوال التي تتعامل معها في وحدة واحدة مترابطة، مع إخفاء الحالة الداخلية ومنع التعديل المباشر عليها من الخارج (Data Hiding). يتم تحقيق ذلك بجعل الحقول خاصة 'private' والتحكم بالقراءة والكتابة عبر دوال عامة تسمى Getters و Setters."
            },
            {
              type: "paragraph",
              text: "Benefits of Encapsulation: 1) Total control over state changes; 2) Enforcing strict data validation; 3) Creating read-only or write-only entities; 4) Freedom to change internal representations without breaking external client code."
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
              text: "Example 1: Public Vulnerability vs Encapsulation (المثال 1: خطورة الحقول العامة مقابل الكبسلة)"
            },
            {
              type: "paragraph",
              text: "Showing how unencapsulated classes allow corrupt, invalid data to be injected."
            },
            {
              type: "code",
              language: "java",
              filename: "UnencapsulatedHazard.java",
              code: `public class UnencapsulatedHazard {
    // Bad Design: Public fields allow impossible states!
    static class BadAccount {
        public double balance;
    }

    public static void main(String[] args) {
        BadAccount bad = new BadAccount();
        bad.balance = -999999.0; // Corrupted! No validation or protection exists!

        System.out.println("Corrupted Balance: $" + bad.balance);
        System.out.println("Notice: Direct public field access destroys data integrity.");
    }
}`,
              output: `Corrupted Balance: $-999999.0
Notice: Direct public field access destroys data integrity.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "Exposing fields as public lets external code set nonsensical values (like negative bank balances). Encapsulation prevents this vulnerability completely."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "جعل الحقول عامة (public) يسمح لأي كود خارجي بوضع بيانات كارثية غير منطقية (كرصيد بنكي سالب). الكبسلة تحمي النظام من هذا الخلل."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Standard Getter and Setter Pattern (المثال 2: نمط دوال الجلب والتعيين القياسي)"
            },
            {
              type: "paragraph",
              text: "The standard JavaBean convention for encapsulated attributes."
            },
            {
              type: "code",
              language: "java",
              filename: "StandardEncapsulation.java",
              code: `public class StandardEncapsulation {
    static class Student {
        private String name;
        private int gradeLevel;

        // Getter for name
        public String getName() {
            return name;
        }

        // Setter for name
        public void setName(String name) {
            this.name = name;
        }

        // Getter for gradeLevel
        public int getGradeLevel() {
            return gradeLevel;
        }

        // Setter for gradeLevel
        public void setGradeLevel(int grade) {
            this.gradeLevel = grade;
        }
    }

    public static void main(String[] args) {
        Student s = new Student();
        s.setName("Ziyad");
        s.setGradeLevel(11);

        System.out.println("Student: " + s.getName() + " | Grade: " + s.getGradeLevel());
    }
}`,
              output: `Student: Ziyad | Grade: 11`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "Fields are marked private. External classes interact strictly through public getters and setters according to Java naming conventions."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "تُعرف الحقول كـ private، ويكون الوصول إليها حصراً عبر دوال getName و setName وفقاً للمعايير القياسية لجافا."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Validated Setters with Guards (المثال 3: دوال التعيين المزودة بحراسة التحقق)"
            },
            {
              type: "paragraph",
              text: "Rejecting invalid values and maintaining business invariants."
            },
            {
              type: "code",
              language: "java",
              filename: "ValidatedSetterDemo.java",
              code: `public class ValidatedSetterDemo {
    static class Patient {
        private String fullName;
        private int heartRate; // Beats per minute (BPM)

        public void setHeartRate(int bpm) {
            if (bpm >= 30 && bpm <= 220) {
                this.heartRate = bpm;
                System.out.println("Heart rate recorded: " + bpm + " BPM");
            } else {
                System.out.println("REJECTED: Heart rate of " + bpm + " BPM is physiologically impossible/critical.");
            }
        }

        public int getHeartRate() {
            return heartRate;
        }
    }

    public static void main(String[] args) {
        Patient p = new Patient();
        p.setHeartRate(72);    // Accepted
        p.setHeartRate(999);   // Safely rejected
        p.setHeartRate(-10);   // Safely rejected

        System.out.println("Final validated patient heart rate: " + p.getHeartRate() + " BPM");
    }
}`,
              output: `Heart rate recorded: 72 BPM
REJECTED: Heart rate of 999 BPM is physiologically impossible/critical.
REJECTED: Heart rate of -10 BPM is physiologically impossible/critical.
Final validated patient heart rate: 72 BPM`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "The setter intercepts inputs, verifying they fall within realistic physiological bounds before mutating state."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "تفحص دالة setHeartRate القيمة المدخلة بدقة وترفض أي قيم غير منطقية، مما يحمي النظام من تخزين بيانات خاطئة."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Read-Only Encapsulated Class (المثال 4: فئة للقراءة فقط Read-Only)"
            },
            {
              type: "paragraph",
              text: "Providing getters but NO setters, ensuring that once initialized, the state cannot be changed."
            },
            {
              type: "code",
              language: "java",
              filename: "ReadOnlyClassDemo.java",
              code: `public class ReadOnlyClassDemo {
    static class HardwareSpecs {
        private final String cpuModel;
        private final int physicalCores;

        HardwareSpecs(String cpu, int cores) {
            this.cpuModel = cpu;
            this.physicalCores = cores;
        }

        // Only Getters provided (Read-Only)
        public String getCpuModel() {
            return cpuModel;
        }

        public int getPhysicalCores() {
            return physicalCores;
        }
    }

    public static void main(String[] args) {
        HardwareSpecs specs = new HardwareSpecs("Apple M3 Max", 16);
        System.out.println("Processor: " + specs.getCpuModel());
        System.out.println("Cores: " + specs.getPhysicalCores());

        // No setters exist; specs cannot be mutated from outside!
    }
}`,
              output: `Processor: Apple M3 Max
Cores: 16`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "Omitting setter methods makes an object read-only after construction, guaranteeing thread-safety and predictability."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "الاستغناء عن دوال set يجعل الكائن للقراءة فقط بعد بنائه، وهو أسلوب يضمن أمان المسارات وثبات البيانات طوال تشغيل البرنامج."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Write-Only Encapsulated Class (المثال 5: فئة للكتابة فقط Write-Only)"
            },
            {
              type: "paragraph",
              text: "Providing setters without getters to accept sensitive input without disclosing it."
            },
            {
              type: "code",
              language: "java",
              filename: "WriteOnlyDemo.java",
              code: `public class WriteOnlyDemo {
    static class SecurityCredentialsReceiver {
        private String apiSecret;

        // Setter provided (Write-Only)
        public void setApiSecret(String secret) {
            this.apiSecret = secret;
            System.out.println("Secret successfully provisioned (Length: " + secret.length() + " chars).");
        }

        // Internal method uses it, but NO GETTER exists for external callers!
        public boolean verifySecret(String candidate) {
            return this.apiSecret != null && this.apiSecret.equals(candidate);
        }
    }

    public static void main(String[] args) {
        SecurityCredentialsReceiver receiver = new SecurityCredentialsReceiver();
        receiver.setApiSecret("SUPER_SECRET_KEY_99182");

        // External code CANNOT call receiver.getApiSecret()
        System.out.println("Key matches 'test'? " + receiver.verifySecret("test"));
        System.out.println("Key matches correct secret? " + receiver.verifySecret("SUPER_SECRET_KEY_99182"));
    }
}`,
              output: `Secret successfully provisioned (Length: 22 chars).
Key matches 'test'? false
Key matches correct secret? true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "A write-only design accepts data but provides no getter, preventing external callers from inspecting sensitive credentials."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "الفئة المخصصة للكتابة فقط تقبل البيانات دون توفير دالة get، مما يمنع الأكواد الخارجية من استخراج كلمات المرور والمفاتيح السرية."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Computed / Derived Properties (المثال 6: الخصائص المحسوبة والمشتقة)"
            },
            {
              type: "paragraph",
              text: "Exposing synthetic getter properties calculated dynamically on demand."
            },
            {
              type: "code",
              language: "java",
              filename: "DerivedPropertyDemo.java",
              code: `public class DerivedPropertyDemo {
    static class Person {
        private String firstName;
        private String lastName;

        Person(String first, String last) {
            this.firstName = first;
            this.lastName = last;
        }

        // Dynamic computed property: no dedicated 'fullName' field needed!
        public String getFullName() {
            return firstName + " " + lastName;
        }

        public String getInitials() {
            return (firstName.charAt(0) + "." + lastName.charAt(0) + ".").toUpperCase();
        }
    }

    public static void main(String[] args) {
        Person p = new Person("Amal", "Mansour");
        System.out.println("Full Name: " + p.getFullName());
        System.out.println("Initials: " + p.getInitials());
    }
}`,
              output: `Full Name: Amal Mansour
Initials: A.M.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "Encapsulation allows presenting virtual attributes like 'getFullName()' without wasting memory storing redundant concatenated strings."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "تتيح الكبسولة تقديم خصائص محسوبة ديناميكياً مثل getFullName() دون الحاجة لتخزين نصوص مكررة في الذاكرة."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Encapsulating Boolean Properties (is/set) (المثال 7: كبسلة الخصائص المنطقية)"
            },
            {
              type: "paragraph",
              text: "Using the standard 'isProperty()' naming convention for boolean getters."
            },
            {
              type: "code",
              language: "java",
              filename: "BooleanEncapsulation.java",
              code: `public class BooleanEncapsulation {
    static class Subscription {
        private boolean active;
        private boolean autoRenew;

        // Boolean getter uses 'is' prefix
        public boolean isActive() {
            return active;
        }

        public void setActive(boolean active) {
            this.active = active;
        }

        public boolean isAutoRenew() {
            return autoRenew;
        }

        public void setAutoRenew(boolean renew) {
            this.autoRenew = renew;
        }
    }

    public static void main(String[] args) {
        Subscription sub = new Subscription();
        sub.setActive(true);
        sub.setAutoRenew(false);

        System.out.println("Is Subscription Active? " + sub.isActive());
        System.out.println("Is Auto-Renew Enabled? " + sub.isAutoRenew());
    }
}`,
              output: `Is Subscription Active? true
Is Auto-Renew Enabled? false`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "JavaBeans conventions specify that getters for boolean attributes should start with 'is' (e.g. isActive()) rather than 'get'."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "وفقاً لمعايير جافا، تبدأ دوال جلب المتغيرات المنطقية بـ 'is' (مثل isActive()) بدلاً من 'get' لتحسين سلاسة قراءة الكود."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Defensive Copying with Arrays (المثال 8: النسخ الدفاعي مع مصفوفات البيانات)"
            },
            {
              type: "paragraph",
              text: "Preventing callers from modifying private array fields by returning cloned copies."
            },
            {
              type: "code",
              language: "java",
              filename: "DefensiveCopyingDemo.java",
              code: `public class DefensiveCopyingDemo {
    static class GradeBook {
        private int[] scores;

        public GradeBook(int[] initialScores) {
            // Defensive copy on entry!
            this.scores = initialScores.clone();
        }

        // Defensive copy on exit!
        public int[] getScores() {
            return scores.clone(); // Cloned copy prevents external tampering
        }
    }

    public static void main(String[] args) {
        int[] original = { 85, 90, 95 };
        GradeBook book = new GradeBook(original);

        // Caller attempts to tamper with returned array
        int[] externalScores = book.getScores();
        externalScores[0] = 0; // Modifies the clone only!

        System.out.println("Original book score at 0: " + book.getScores()[0] + " (Safely preserved!)");
    }
}`,
              output: `Original book score at 0: 85 (Safely preserved!)`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "Returning a direct reference to a private array breaks encapsulation because callers can mutate elements directly. Cloning (defensive copying) preserves immutability."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "إرجاع مصفوفة private مباشرة يسمح للمتصل بتعديل عناصرها بحرية! النسخ الدفاعي (Defensive Copying) عبر .clone() يحمي المصفوفة الأصلية من أي تلاعب."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Encapsulating Business Transitions (المثال 9: كبسلة العمليات المنطقية والانتقالات)"
            },
            {
              type: "paragraph",
              text: "Providing meaningful domain methods instead of raw setters."
            },
            {
              type: "code",
              language: "java",
              filename: "DomainMethodsDemo.java",
              code: `public class DomainMethodsDemo {
    static class CoffeeMachine {
        private int waterLevelMl = 500;
        private int coffeeBeansGram = 100;

        // Domain method instead of setWaterLevel / setCoffeeBeans
        public boolean brewEspresso() {
            if (waterLevelMl >= 50 && coffeeBeansGram >= 15) {
                waterLevelMl -= 50;
                coffeeBeansGram -= 15;
                System.out.println("Brewed delicious Espresso! Left: " + waterLevelMl + "ml water, " + coffeeBeansGram + "g beans.");
                return true;
            }
            System.out.println("Cannot brew: Insufficient ingredients.");
            return false;
        }

        public int getWaterLevelMl() { return waterLevelMl; }
        public int getCoffeeBeansGram() { return coffeeBeansGram; }
    }

    public static void main(String[] args) {
        CoffeeMachine machine = new CoffeeMachine();
        machine.brewEspresso();
        machine.brewEspresso();
    }
}`,
              output: `Brewed delicious Espresso! Left: 450ml water, 85g beans.
Brewed delicious Espresso! Left: 400ml water, 70g beans.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "True encapsulation means providing expressive verbs ('brewEspresso()') that manage internal state transitions according to business rules, rather than raw setters."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "الكبسولة الحقيقية لا تقتصر على دوال set بسيطة، بل تقدم أفعالاً ذات معنى منطقي (مثل brewEspresso) تضمن تناسق البيانات وفق قواعد العمل."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: State Change Auditing inside Setters (المثال 10: تسجيل وتتبع التعديلات داخل دوال التعيين)"
            },
            {
              type: "paragraph",
              text: "Logging and auditing every modification made to encapsulated attributes."
            },
            {
              type: "code",
              language: "java",
              filename: "AuditedSetterDemo.java",
              code: `public class AuditedSetterDemo {
    static class Document {
        private String status = "DRAFT";

        public String getStatus() {
            return status;
        }

        public void setStatus(String newStatus) {
            String oldStatus = this.status;
            this.status = newStatus;
            System.out.println("[AUDIT LOG] Document status changed from '" + oldStatus + "' to '" + newStatus + "' at " + System.currentTimeMillis());
        }
    }

    public static void main(String[] args) {
        Document doc = new Document();
        doc.setStatus("UNDER_REVIEW");
        doc.setStatus("APPROVED");
    }
}`,
              output: `[AUDIT LOG] Document status changed from 'DRAFT' to 'UNDER_REVIEW' at 1714529381090
[AUDIT LOG] Document status changed from 'UNDER_REVIEW' to 'APPROVED' at 1714529381091`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "Encapsulation creates a single bottleneck through which all modifications must pass, making it effortless to attach auditing, analytics, and event notifications."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "توفر الكبسولة منفذاً وحيداً إجبارياً تمر من خلاله جميع التعديلات، مما يسهل تسجيل سجلات التدقيق والتنبيهات عند كل تغيير."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Production-Grade Encapsulated Bank Account (المثال 11: حساب بنكي متكامل بمعايير الإنتاج)"
            },
            {
              type: "paragraph",
              text: "Advanced: Complete encapsulation model featuring private balance, guarded mutation, and atomic state transitions."
            },
            {
              type: "code",
              language: "java",
              filename: "ProductionBankAccount.java",
              code: `public class ProductionBankAccount {
    static class EncapsulatedAccount {
        private final String accountNumber;
        private double balance;
        private boolean frozen;

        public EncapsulatedAccount(String accNum, double openingBalance) {
            this.accountNumber = accNum;
            this.balance = Math.max(0.0, openingBalance);
            this.frozen = false;
        }

        public String getAccountNumber() { return accountNumber; }
        public double getBalance() { return balance; }
        public boolean isFrozen() { return frozen; }

        public void freezeAccount() { this.frozen = true; }
        public void unfreezeAccount() { this.frozen = false; }

        public boolean deposit(double amount) {
            if (frozen || amount <= 0) {
                System.out.println("Deposit rejected: Account frozen or invalid amount.");
                return false;
            }
            balance += amount;
            System.out.printf("Deposited $%.2f | Balance: $%.2f%n", amount, balance);
            return true;
        }

        public boolean withdraw(double amount) {
            if (frozen || amount <= 0 || amount > balance) {
                System.out.println("Withdrawal rejected: Account frozen or insufficient funds.");
                return false;
            }
            balance -= amount;
            System.out.printf("Withdrew $%.2f | Balance: $%.2f%n", amount, balance);
            return true;
        }
    }

    public static void main(String[] args) {
        EncapsulatedAccount acc = new EncapsulatedAccount("ACC-55201", 1000.0);
        acc.deposit(300.0);
        acc.withdraw(500.0);

        acc.freezeAccount();
        acc.withdraw(100.0); // Fails safely

        acc.unfreezeAccount();
        acc.withdraw(100.0); // Succeeds
    }
}`,
              output: `Deposited $300.00 | Balance: $1300.00
Withdrew $500.00 | Balance: $800.00
Withdrawal rejected: Account frozen or insufficient funds.
Withdrew $100.00 | Balance: $700.00`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "The account guarantees that balance is never modified without satisfying all business rules (funds sufficiency, un-frozen state, positive amounts)."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "يضمن هذا النموذج استحالة تعديل الرصيد إلا بعد استيفاء جميع الشروط الصارمة (عدم تجميد الحساب، كفاية الرصيد، والمبالغ الإيجابية)."
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
                "Mistake 1: Generating public getters and setters blindly for every attribute without validation. If every setter blindly assigns values, encapsulation benefits are lost.",
                "خطأ 1: توليد دوال get و set عمياء لكل حقل دون أي تحقق. إذا كانت الدالة تسند القيمة مباشرة بدون فحص، تفقد الكبسلة هدفها في حماية البيانات.",
                "Mistake 2: Returning direct references to mutable internal objects (like Date or arrays). Always use defensive copying (.clone()) to protect internal state.",
                "خطأ 2: إرجاع كائنات قابلة للتعديل مباشرة (كالمصفوفات)، حيث يجب استخدام النسخ الدفاعي لمنع التعديل الخارجي عليها.",
                "Mistake 3: Believing encapsulation only means private variables. Encapsulation also means packaging behaviors and data together into a cohesive entity."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Secure User Credentials Guard (التحدي العملي: حارس بيانات المستخدم المشفرة)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Create a fully encapsulated 'UserAccount' class: 1) 'username' (read-only String, set in constructor); 2) 'password' (private String, minimum 8 characters and must contain a digit); 3) 'setPassword(String newPass)' validates requirements and updates password, or rejects with a message; 4) 'authenticate(String pass)' returns true if matching; 5) Track 'failedAttempts' (int) and lock account after 3 consecutive failures. Test in main()."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: قم بإنشاء فئة UserAccount مكبسلة بالكامل: 1) اسم مستخدم للقراءة فقط؛ 2) كلمة مرور خاصة لا تقل عن 8 خانات وتحتوي على رقم على الأقل؛ 3) دالة setPassword تتحقق من الشروط وترفض كلمة المرور الضعيفة؛ 4) دالة authenticate لفحص كلمة المرور؛ 5) تتبع المحاولات الفاشلة وتجميد الحساب بعد 3 محاولات خاطئة. اختبر النظام في main."
            },
            {
              type: "code",
              language: "java",
              filename: "UserAccountChallenge.java",
              code: `public class UserAccountChallenge {
    static class UserAccount {
        private final String username;
        private String password;
        private int failedAttempts = 0;
        private boolean isLocked = false;

        public UserAccount(String username, String initialPassword) {
            this.username = username;
            setPassword(initialPassword);
        }

        public String getUsername() { return username; }
        public boolean isLocked() { return isLocked; }

        public boolean setPassword(String newPass) {
            if (newPass != null && newPass.length() >= 8 && newPass.matches(".*\\\\d.*")) {
                this.password = newPass;
                System.out.println("Password successfully set for " + username);
                return true;
            }
            System.out.println("Password rejected: Must be >= 8 chars and contain at least one digit.");
            return false;
        }

        public boolean authenticate(String testPassword) {
            if (isLocked) {
                System.out.println("Account " + username + " is LOCKED due to excessive failed attempts.");
                return false;
            }
            if (this.password != null && this.password.equals(testPassword)) {
                failedAttempts = 0;
                System.out.println("Authentication successful for " + username);
                return true;
            } else {
                failedAttempts++;
                System.out.println("Authentication failed (" + failedAttempts + "/3)");
                if (failedAttempts >= 3) {
                    isLocked = true;
                    System.out.println("SECURITY ALERT: Account has been locked!");
                }
                return false;
            }
        }
    }

    public static void main(String[] args) {
        UserAccount user = new UserAccount("safia_engineer", "weak"); // Fails validation
        user.setPassword("SecurePass2026"); // Succeeds

        user.authenticate("wrong1");
        user.authenticate("wrong2");
        user.authenticate("wrong3"); // Locks account
        user.authenticate("SecurePass2026"); // Denied because account is locked
    }
}`,
              output: `Password rejected: Must be >= 8 chars and contain at least one digit.
Password successfully set for safia_engineer
Authentication failed (1/3)
Authentication failed (2/3)
Authentication failed (3/3)
SECURITY ALERT: Account has been locked!
Account safia_engineer is LOCKED due to excessive failed attempts.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "The UserAccount class fully encapsulates password policy, authentication rules, and account lockouts without leaking internal password state to outside callers."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "تكبسل الفئة سياسات كلمات المرور وفحص محاولات تسجيل الدخول وتجميد الحساب تلقائياً دون كشف كلمة المرور لأي جهة خارجية."
            }
          ],
          quiz: [
            {
              id: "q1",
              question: "What is the primary architectural mechanism used to implement Encapsulation in a Java class?",
              options: [
                "Making all variables public and static for global performance.",
                "Declaring fields as private and providing public getter and setter methods that enforce validation logic.",
                "Removing all methods from the class and using public arrays.",
                "Using only primitive data types without objects."
              ],
              correctIndex: 1,
              explanation: "Correct! Encapsulation wraps data (fields) and code (methods) together into a single unit, hiding internal state behind private access modifiers and regulating modifications through public accessor and mutator methods. (تتحقق الكبسلة بحجب الحقول عبر private والتحكم فيها عبر دوال وصول عامة تطبق شروط التحقق)."
            },
            {
              id: "q2",
              question: "How do you create an encapsulated class that is strictly 'Read-Only'?",
              options: [
                "Declare the class as abstract.",
                "Initialize fields exclusively via the constructor and provide only getter methods, with NO setter methods.",
                "Provide only setter methods and omit all getter methods.",
                "Mark all fields with the 'transient' keyword."
              ],
              correctIndex: 1,
              explanation: "Correct! A read-only class provides getter methods to read the state but omits mutator/setter methods, preventing external callers from altering the object's attributes after creation. (الفئة للقراءة فقط توفر دوال get فقط لتمكين الاستعلام وتمنع دوال set لمنع تعديل البيانات)."
            },
            {
              id: "q3",
              question: "Examine this code:\nclass EmployeeDirectory {\n    private String[] departments = {\"Engineering\", \"Sales\"};\n    public String[] getDepartments() {\n        return departments;\n    }\n}\nWhy does this violate proper encapsulation?",
              options: [
                "Because arrays cannot be declared private in Java.",
                "Returning the direct reference allows external callers to execute 'getDepartments()[0] = \"Hacked\";', mutating internal private state without permission.",
                "Because getDepartments() must return void.",
                "Because the array must be static."
              ],
              correctIndex: 1,
              explanation: "Correct! Returning a direct reference to a mutable internal object (like an array or Date) leaks internal state ('representation exposure'). Callers can directly overwrite elements. Defensive copying via 'return departments.clone();' is required. (إرجاع المرجع المباشر لمصفوفة داخلية يمكن الكود الخارجي من تعديل عناصرها خلسة دون المرور برقابة الفئة)."
            },
            {
              id: "q4",
              question: "What is 'Defensive Copying' in the context of Java encapsulation?",
              options: [
                "Backing up Java source files to an external disk.",
                "Making an independent clone or duplicate of a mutable object before accepting it in a constructor or returning it from a getter.",
                "Converting all String objects into byte buffers.",
                "Declaring all methods synchronized."
              ],
              correctIndex: 1,
              explanation: "Correct! Defensive copying duplicates mutable objects (arrays, collections, dates) when receiving or returning them, ensuring external code cannot manipulate internal references. (النسخ الدفاعي ينشئ نسخة مستقلة من الكائنات القابلة للتعديل عند استقبالها أو إرجاعها لحماية الحالة الداخلية من العبث الخارجي)."
            },
            {
              id: "q5",
              question: "According to standard JavaBean naming conventions, how should the getter method for a boolean field 'boolean hasAccess' be named?",
              options: [
                "getHasAccess()",
                "isHasAccess() or hasAccess()",
                "booleanHasAccess()",
                "retrieveHasAccess()"
              ],
              correctIndex: 1,
              explanation: "Correct! For boolean properties, JavaBean naming conventions specify prefixes like 'is' or direct predicate naming ('hasAccess()' / 'isHasAccess()') rather than the standard 'get'. (تسمية دوال جلب الخصائص المنطقية تتبع صيغ الاستفهام مثل is أو has وفق معايير جافا بينز)."
            },
            {
              id: "q6",
              question: "Examine this setter method:\nclass UserProfile {\n    private int age;\n    public void setAge(int age) {\n        if (age < 0 || age > 130) {\n            throw new IllegalArgumentException(\"Invalid human age\");\n        }\n        this.age = age;\n    }\n}\nWhat key benefit of encapsulation is demonstrated here?",
              options: [
                "Faster execution speed during JIT compilation.",
                "Enforcing domain business rules and invariants to guarantee the object never holds invalid data.",
                "Allowing the garbage collector to free memory immediately.",
                "Eliminating the need for unit tests."
              ],
              correctIndex: 1,
              explanation: "Correct! By funneling field mutations through setter methods, the class validates inputs and rejects invalid values, maintaining business invariants and data integrity. (توجيه التعديل عبر دوال set يتيح تطبيق قواعد التحقق وحماية البيانات من القيم غير المنطقية)."
            },
            {
              id: "q7",
              question: "Which of the following is NOT a required rule for designing an 'Immutable Class' in Java?",
              options: [
                "Declare the class as final so it cannot be subclassed.",
                "Make all fields private and final.",
                "Do not provide any mutator (setter) methods.",
                "Declare all methods as static."
              ],
              correctIndex: 3,
              explanation: "Correct! Immutable classes need instance methods to expose data; declaring methods static is NOT a requirement. Immutable classes rely on private final fields, no setters, a final class declaration, and defensive copying. (الفئات غير القابلة للتغيير لا تشترط دوالاً ساكنة بل تعتمد على حقول final وحجب دوال التعديل والنسخ الدفاعي)."
            },
            {
              id: "q8",
              question: "How does encapsulation empower a software developer to refactor a class's internal data storage without breaking calling client code?",
              options: [
                "Callers must recompile with new command-line flags.",
                "Because client code interacts only with public method signatures (e.g., getName()), the internal storage (e.g., combining or splitting fields) can change freely as long as method signatures remain stable.",
                "By automatically updating all client source files on GitHub.",
                "Encapsulation does not allow internal data structures to be changed."
              ],
              correctIndex: 1,
              explanation: "Correct! Encapsulation decouples public contracts from private implementations. You can change how data is stored, calculated, or cached internally without affecting any external code that depends on the public API. (الكبسولة تفصل واجهة الاستخدام عن طريقة التخزين، مما يتيح تغيير البنية الداخلية بالكامل دون كسر أي برامج خارجية تعتمد عليها)."
            },
            {
              id: "q9",
              question: "Why should sensitive attributes like 'passwordHash' NEVER have a getter method in a security-sensitive class?",
              options: [
                "Because Java throws an exception if passwordHash is read.",
                "To prevent leaking cryptographic secrets to callers; the class should provide a method like 'boolean verifyPassword(String attempt)' instead.",
                "Because password hashes can only be stored in XML files.",
                "Because getters can only return primitive integers."
              ],
              correctIndex: 1,
              explanation: "Correct! High-security encapsulation hides sensitive data completely. Rather than returning the hash via a getter, the class exposes a verification method that evaluates the password internally. (حماية البيانات الحساسة تقتضي عدم توفير دالة get للهاش إطلاقاً، بل توفير دالة تحقق داخلية تعيد صح أم خطأ فقط)."
            },
            {
              id: "q10",
              question: "Examine this computed property:\nclass OrderLine {\n    private double unitPrice;\n    private int quantity;\n    public double getTotalPrice() {\n        return unitPrice * quantity;\n    }\n}\nWhy is calculating 'totalPrice' on-demand in a getter superior to storing it in a separate variable?",
              options: [
                "It eliminates redundant state and guarantees totalPrice is always 100% consistent with unitPrice and quantity, avoiding desynchronization bugs.",
                "Because doubles cannot be stored in class fields.",
                "Because on-demand calculations prevent CPU caching.",
                "It makes the class abstract."
              ],
              correctIndex: 0,
              explanation: "Correct! Computed getters prevent stale data. Storing a separate 'totalPrice' field risks desynchronization if unitPrice or quantity changes without updating total. Computing it dynamically guarantees perfect consistency. (الخصائص المحسوبة ديناميكياً تمنع تعارض البيانات وتضمن دقة النتيجة في كل استعلام دون تخزين متغيرات مكررة)."
            },
            {
              id: "q11",
              question: "What potential issue arises if a constructor accepts an external mutable array without defensive copying?\npublic StudentGroup(String[] members) {\n    this.members = members;\n}",
              options: [
                "The constructor throws an ArrayStoreException.",
                "The caller retains the original array reference and can mutate the student members from outside at any time, bypassing all group validation.",
                "The array is automatically converted into a HashSet.",
                "The JVM freezes."
              ],
              correctIndex: 1,
              explanation: "Correct! Assigning the parameter directly stores the caller's reference. The caller can alter 'members[0]' at any time, mutating the StudentGroup's internal state without its knowledge. Storing 'this.members = members.clone();' prevents this. (إسناد المصفوفة الخارجية مباشرة دون استنساخ يجعل الكائن عرضة لتعديلات خارجية مفاجئة عبر المرجع الأصلي)."
            },
            {
              id: "q12",
              question: "Which of the following describes a 'Write-Only' class feature?",
              options: [
                "A class that can only write logs to a file.",
                "Providing a setter method or ingestion method while providing NO getter method (e.g., setting a write-only cryptographic key or audit sink).",
                "A class without any constructors.",
                "A class that cannot be saved to disk."
              ],
              correctIndex: 1,
              explanation: "Correct! A write-only property has a setter or input method to accept data but deliberately omits getter methods to ensure the accepted data cannot be inspected or retrieved from the outside. (الخاصية للكتابة فقط توفر دالة إدخال أو تعيين set دون توفير دالة قراءة get لحماية البيانات السرية)."
            },
            {
              id: "q13",
              question: "How does encapsulation support triggering side-effects when an attribute changes?",
              options: [
                "Side-effects can only be triggered by the garbage collector.",
                "Setter methods can transparently update audit logs, recalculate caches, or notify event listeners whenever a field is updated.",
                "By converting fields into static native pointers.",
                "By executing SQL queries in the operating system kernel."
              ],
              correctIndex: 1,
              explanation: "Correct! Because all changes pass through setter methods, you can seamlessly add audit logging, change notifications, validation, or cache invalidation inside the setter without modifying external callers. (تعديل الحقول عبر دوال set يتيح تسجيل النشاط وإشعار المراقبين وتحديث التخزين المؤقت تلقائياً عند أي تغيير)."
            },
            {
              id: "q14",
              question: "What is the fundamental difference between 'Encapsulation' and 'Abstraction' in object-oriented programming?",
              options: [
                "Encapsulation is for Java, while Abstraction is only for C++.",
                "Encapsulation is data hiding and bundling state with behavior (how to restrict access); Abstraction is hiding implementation complexity and showing only essential features (what an object does).",
                "Encapsulation requires interfaces, while Abstraction requires classes.",
                "Encapsulation makes code faster, while Abstraction makes code smaller."
              ],
              correctIndex: 1,
              explanation: "Correct! Encapsulation focuses on bundling and shielding internal data from unauthorized access, while Abstraction focuses on presenting a clean, simplified interface by hiding complex implementation mechanics. (الكبسولة تركز على حجب البيانات وحمايتها، بينما التجريد يركز على تبسيط الواجهة وإخفاء تفاصيل التنفيذ المعقدة)."
            },
            {
              id: "q15",
              question: "Why is declaring all fields 'public' in an enterprise application considered a catastrophic anti-pattern?",
              options: [
                "Public fields cannot hold numbers greater than 1000.",
                "Any external code can directly overwrite fields with corrupted or malicious values with zero validation, and any future change to internal data representation breaks all dependent systems.",
                "Public fields are automatically deleted by the JVM after 24 hours.",
                "Public fields prevent the project from compiling with Maven or Gradle."
              ],
              correctIndex: 1,
              explanation: "Correct! Public fields destroy data integrity by allowing unrestricted external mutation without validation, create tight coupling, and make it impossible to enforce business rules or refactor code safely. (الحقول العامة تدمر سلامة البيانات لغياب الرقابة وتجعل الكود شديد الترابط وعرضة للانهيار عند أي تعديل مستقبلي)."
            }
          ]
        }
      ]
    }
  ];
})();
