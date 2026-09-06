/**
 * Java Curriculum Module - Part 13
 * Topics:
 * 25. Object Relationships
 * 26. Has-A vs Is-A
 * 
 * 100% Offline, Pure JavaScript. Complete educational content with full bilingual (English & Arabic) explanations.
 */

(function () {
  'use strict';

  window.JAVA_TOPICS_PART13 = [
    /* ==========================================================================
       TOPIC 25: Object Relationships
       ========================================================================== */
    {
      id: "object-relationships",
      title: "25. Object Relationships",
      description: "Mastering Java Object Relationships: Association, Aggregation (weak relationship, independent lifecycle), Composition (strong ownership, death-together lifecycle), and Dependency (uses-a via parameter).",
      lessons: [
        {
          id: "object-relationships-mastery",
          title: "Complete Guide to Object Relationships",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "Understanding Object Relationships in Java (فهم علاقات الكائنات في جافا)"
            },
            {
              type: "paragraph",
              text: "In Object-Oriented Software Engineering, classes and objects rarely operate in isolation. They interact through structured architectural relationships that define how data and responsibilities are shared across the system. The four fundamental object relationships are: 1) Dependency ('Uses-A'): A temporary relationship where one class uses another, typically passed as a method parameter or instantiated locally; 2) Association: A general structural link between independent objects; 3) Aggregation: A weak 'Has-A' relationship where child objects have an independent lifecycle and can survive if the parent object is destroyed (e.g., Department and Teachers); 4) Composition: A strong 'Part-Of' relationship where child objects cannot exist independently and their lifecycle is strictly bounded by the parent container (e.g., Car and Engine)."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "في هندسة البرمجيات كائنية التوجه (OOP)، لا تعمل الكائنات بمفردها بل ترتبط عبر علاقات معمارية تحدد تبادل البيانات والمسؤوليات. تنقسم العلاقات إلى 4 أنواع رئيسية: 1) الاعتمادية Dependency ('تستخدم'): علاقة عابرة حيث تستخدم الفئة كائناً كمعامل داخل دالة؛ 2) الاقتران Association: رابط عام بين كائنات مستقلة؛ 3) التجميع Aggregation: علاقة احتواء ضعيفة 'Has-A' حيث يمتلك الكائن الداخلي دورة حياة مستقلة ولا يموت بموت الكائن الحاوي (مثل القسم والأساتذة)؛ 4) التركيب Composition: علاقة تملك قوية 'Part-Of' يموت فيها الكائن الداخلي حتماً بموت الكائن الأساسي (مثل السيارة والمحرك)."
            },
            {
              type: "paragraph",
              text: "Choosing the correct relationship determines system coupling, memory safety, testability, and resilience to requirements changes."
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
              text: "Example 1: Dependency ('Uses-A' Relationship) (المثال 1: علاقة الاعتمادية Dependency)"
            },
            {
              type: "paragraph",
              text: "A printer service that temporarily uses a Document object passed as a method parameter without storing a permanent field."
            },
            {
              type: "code",
              language: "java",
              filename: "DependencyDemo.java",
              code: `public class DependencyDemo {
    static class Document {
        private final String content;

        Document(String content) { this.content = content; }
        public String getContent() { return content; }
    }

    // PrinterService 'uses-a' Document (Dependency: method parameter, no stored reference)
    static class PrinterService {
        public void printDocument(Document doc) {
            System.out.println("Printing document: " + doc.getContent());
        }
    }

    public static void main(String[] args) {
        Document report = new Document("Quarterly Financial Report Q3");
        PrinterService printer = new PrinterService();

        // Dependency occurs during method execution
        printer.printDocument(report);
    }
}`,
              output: `Printing document: Quarterly Financial Report Q3`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "PrinterService depends on Document only during printDocument() execution. It retains no persistent reference, creating loose coupling."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "تعتمد خدمة الطباعة على المستند كمعامل فقط داخل الدالة، دون حفظ مرجع دائم له، مما يحقق ارتباطاً خفيفاً ومرناً (Loose Coupling)."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Unidirectional Association (المثال 2: الاقتران أحادي الاتجاه Unidirectional Association)"
            },
            {
              type: "paragraph",
              text: "A Student knows their School, but School does not maintain a reference to the student."
            },
            {
              type: "code",
              language: "java",
              filename: "UnidirectionalAssociationDemo.java",
              code: `public class UnidirectionalAssociationDemo {
    static class School {
        private final String name;
        School(String name) { this.name = name; }
        public String getName() { return name; }
    }

    static class Student {
        private final String studentName;
        private School school; // Unidirectional association

        Student(String name, School school) {
            this.studentName = name;
            this.school = school;
        }

        public void printProfile() {
            System.out.println("Student: " + studentName + " | Attends: " + school.getName());
        }
    }

    public static void main(String[] args) {
        School kingSaudUniv = new School("King Saud University");
        Student student = new Student("Tariq", kingSaudUniv);

        student.printProfile();
    }
}`,
              output: `Student: Tariq | Attends: King Saud University`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "Student has a persistent field reference to School, establishing an association where Student can query School, but not vice-versa."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "يحتوي الطالب على حقل يشير للجامعة في اقتران أحادي، فيستطيع الطالب معرفة جامعته بينما لا تحتفظ الجامعة بمرجع خاص به."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Bidirectional Association (المثال 3: الاقتران ثنائي الاتجاه Bidirectional Association)"
            },
            {
              type: "paragraph",
              text: "A Doctor and Patient know each other, maintaining synchronized references."
            },
            {
              type: "code",
              language: "java",
              filename: "BidirectionalAssociationDemo.java",
              code: `import java.util.ArrayList;
import java.util.List;

public class BidirectionalAssociationDemo {
    static class Patient {
        private final String name;
        private Doctor primaryDoctor;

        Patient(String name) { this.name = name; }
        public String getName() { return name; }

        public void assignDoctor(Doctor doc) {
            this.primaryDoctor = doc;
        }

        public void printDoctor() {
            System.out.println("Patient " + name + " is treated by Dr. " +
                (primaryDoctor != null ? primaryDoctor.getName() : "None"));
        }
    }

    static class Doctor {
        private final String name;
        private final List<Patient> patients = new ArrayList<>();

        Doctor(String name) { this.name = name; }
        public String getName() { return name; }

        public void addPatient(Patient p) {
            patients.add(p);
            p.assignDoctor(this); // Keeps bidirectional reference synchronized
        }

        public void listPatients() {
            System.out.println("Dr. " + name + "'s Patients:");
            for (Patient p : patients) {
                System.out.println(" - " + p.getName());
            }
        }
    }

    public static void main(String[] args) {
        Doctor doc = new Doctor("Al-Kindi");
        Patient p1 = new Patient("Fatima");
        Patient p2 = new Patient("Khalid");

        doc.addPatient(p1);
        doc.addPatient(p2);

        doc.listPatients();
        p1.printDoctor();
    }
}`,
              output: `Dr. Al-Kindi's Patients:
 - Fatima
 - Khalid
Patient Fatima is treated by Dr. Al-Kindi`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "Doctor holds a collection of Patients, and each Patient references their primary Doctor, demonstrating synchronized two-way association."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "يحفظ الطبيب قائمة بمرضاه، ويحفظ المريض مرجعاً لطبيبه المعالج في اقتران متبادل متزامن."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Aggregation (Weak 'Has-A' with Independent Lifecycle) (المثال 4: التجميع Aggregation)"
            },
            {
              type: "paragraph",
              text: "Department aggregates Professors. If the department closes, the professors still exist."
            },
            {
              type: "code",
              language: "java",
              filename: "AggregationDemo.java",
              code: `import java.util.ArrayList;
import java.util.List;

public class AggregationDemo {
    static class Professor {
        private final String name;
        Professor(String name) { this.name = name; }
        public String getName() { return name; }
    }

    static class Department {
        private final String deptName;
        // Aggregation: Department has professors created externally
        private final List<Professor> faculty;

        Department(String name, List<Professor> faculty) {
            this.deptName = name;
            this.faculty = faculty;
        }

        public void printFaculty() {
            System.out.println("Department of " + deptName + " Faculty:");
            for (Professor p : faculty) {
                System.out.println(" * " + p.getName());
            }
        }
    }

    public static void main(String[] args) {
        // Professors exist independently before Department creation
        Professor prof1 = new Professor("Dr. Alan Turing");
        Professor prof2 = new Professor("Dr. Ada Lovelace");

        List<Professor> csStaff = new ArrayList<>();
        csStaff.add(prof1);
        csStaff.add(prof2);

        Department csDept = new Department("Computer Science", csStaff);
        csDept.printFaculty();

        // If csDept is set to null, the professors STILL exist in memory!
        csDept = null;
        System.out.println("Professor 1 survives department closure: " + prof1.getName());
    }
}`,
              output: `Department of Computer Science Faculty:
 * Dr. Alan Turing
 * Dr. Ada Lovelace
Professor 1 survives department closure: Dr. Alan Turing`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "Aggregation represents a weak relationship. Professors are created outside Department and survive independently even after Department is destroyed."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "علاقة التجميع Aggregation ضعيفة ومستقلة؛ فالأساتذة أُنشئوا خارج القسم ويبقون أحياء في الذاكرة حتى لو تم إلغاء كائن القسم."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Composition (Strong 'Part-Of' with Bounded Lifecycle) (المثال 5: التركيب Composition)"
            },
            {
              type: "paragraph",
              text: "A Car composes an Engine. The Engine is instantiated inside the Car and dies when the Car dies."
            },
            {
              type: "code",
              language: "java",
              filename: "CompositionDemo.java",
              code: `public class CompositionDemo {
    static class Engine {
        private final String type;
        private final int horsepower;

        Engine(String type, int hp) {
            this.type = type;
            this.horsepower = hp;
        }

        public void firePistons() {
            System.out.println("Engine [" + type + ", " + horsepower + "HP] roaring!");
        }
    }

    static class Car {
        private final String model;
        // Composition: Engine is created and owned strictly by Car
        private final Engine engine;

        Car(String model, String engineType, int hp) {
            this.model = model;
            // Car instantiates its own Engine (strong ownership)
            this.engine = new Engine(engineType, hp);
        }

        public void drive() {
            System.out.println("Starting journey in " + model);
            engine.firePistons();
        }
    }

    public static void main(String[] args) {
        Car porsche = new Car("Porsche 911 GT3", "Naturally Aspirated Flat-6", 502);
        porsche.drive();
    }
}`,
              output: `Starting journey in Porsche 911 GT3
Engine [Naturally Aspirated Flat-6, 502HP] roaring!`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "In Composition, Car instantiates Engine in its constructor. The Engine has no external reference and cannot exist without the Car."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "في علاقة التركيب Composition، تُنشئ السيارة المحرك داخل مشيدها، ولا يمكن للمحرك أن يوجد خارج السيارة ويموت معها حتماً."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Composition with Multiple Internal Parts (المثال 6: تركيب متعدد الأجزاء لمكونات الكائن)"
            },
            {
              type: "paragraph",
              text: "A Computer system composing a CPU, RAM, and Motherboard in a unified lifecycle."
            },
            {
              type: "code",
              language: "java",
              filename: "MultiPartCompositionDemo.java",
              code: `public class MultiPartCompositionDemo {
    static class CPU {
        void initialize() { System.out.println("CPU: 16 cores initialized."); }
    }
    static class RAM {
        void load() { System.out.println("RAM: 64GB DDR5 memory verified."); }
    }

    static class Workstation {
        private final CPU cpu;
        private final RAM ram;

        Workstation() {
            // Strong composition: Workstation instantiates all its critical subsystems
            this.cpu = new CPU();
            this.ram = new RAM();
        }

        public void boot() {
            System.out.println("Powering up Workstation...");
            cpu.initialize();
            ram.load();
            System.out.println("Workstation ready.");
        }
    }

    public static void main(String[] args) {
        Workstation ws = new Workstation();
        ws.boot();
    }
}`,
              output: `Powering up Workstation...
CPU: 16 cores initialized.
RAM: 64GB DDR5 memory verified.
Workstation ready.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "Workstation encapsulates and manages both CPU and RAM, maintaining full control over initialization and lifecycle."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "تتحكم محطة العمل بالمعالج والذاكرة بالكامل وتنشئهما معاً في مشيدها ضمن علاقة تركيب قوية وموحدة."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Aggregation via Setter (Dynamic Re-assignment) (المثال 7: التجميع الديناميكي عبر دوال التعيين)"
            },
            {
              type: "paragraph",
              text: "Because aggregated objects exist independently, they can be swapped or unassigned dynamically."
            },
            {
              type: "code",
              language: "java",
              filename: "DynamicAggregationDemo.java",
              code: `public class DynamicAggregationDemo {
    static class SIMCard {
        private final String carrier;
        SIMCard(String carrier) { this.carrier = carrier; }
        public String getCarrier() { return carrier; }
    }

    static class Smartphone {
        private SIMCard simCard; // Can be inserted or removed (Aggregation)

        public void insertSIM(SIMCard sim) {
            this.simCard = sim;
            System.out.println("SIM inserted: " + sim.getCarrier());
        }

        public void ejectSIM() {
            System.out.println("SIM ejected: " + (simCard != null ? simCard.getCarrier() : "none"));
            this.simCard = null;
        }
    }

    public static void main(String[] args) {
        SIMCard stc = new SIMCard("STC 5G");
        SIMCard mobily = new SIMCard("Mobily Fiber");

        Smartphone phone = new Smartphone();
        phone.insertSIM(stc);
        phone.ejectSIM();
        phone.insertSIM(mobily);
    }
}`,
              output: `SIM inserted: STC 5G
SIM ejected: STC 5G
SIM inserted: Mobily Fiber`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "SIMCard is aggregated into Smartphone. It can be inserted, ejected, and replaced without destroying the Smartphone or the SIMCard."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "شريحة الاتصال تمثل تجميعاً Aggregation مع الهاتف الذكي؛ حيث يمكن إدخالها وإخراجها واستبدالها دون أن يتأثر وجود أي منهما."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Cascading Operations in Composition (المثال 8: توجيه العمليات المتعاقبة في التركيب)"
            },
            {
              type: "paragraph",
              text: "Parent actions automatically cascade down to composed child objects."
            },
            {
              type: "code",
              language: "java",
              filename: "CascadingCompositionDemo.java",
              code: `import java.util.ArrayList;
import java.util.List;

public class CascadingCompositionDemo {
    static class OrderItem {
        private final String itemName;
        private final double price;

        OrderItem(String name, double price) {
            this.itemName = name;
            this.price = price;
        }

        public double getPrice() { return price; }
        public String getItemName() { return itemName; }
    }

    static class Order {
        private final int orderId;
        // Composition: OrderItems are created via Order API and strictly tied to Order
        private final List<OrderItem> items = new ArrayList<>();

        Order(int id) { this.orderId = id; }

        public void addItem(String name, double price) {
            items.add(new OrderItem(name, price));
        }

        public double calculateTotal() {
            double sum = 0.0;
            for (OrderItem item : items) {
                sum += item.getPrice();
            }
            return sum;
        }

        public void printReceipt() {
            System.out.println("=== Order #" + orderId + " Receipt ===");
            for (OrderItem i : items) {
                System.out.printf(" * %-15s : $%.2f%n", i.getItemName(), i.getPrice());
            }
            System.out.printf("Grand Total: $%.2f%n", calculateTotal());
        }
    }

    public static void main(String[] args) {
        Order order = new Order(1048);
        order.addItem("Mechanical Keyboard", 120.0);
        order.addItem("Ergonomic Mouse", 85.0);
        order.addItem("USB-C Cable", 15.0);

        order.printReceipt();
    }
}`,
              output: `=== Order #1048 Receipt ===
 * Mechanical Keyboard : $120.00
 * Ergonomic Mouse : $85.00
 * USB-C Cable     : $15.00
Grand Total: $220.00`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "Order items do not exist outside their parent Order. The Order calculates totals and prints receipts by delegating through composed items."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "بنود الطلب لا معنى لها خارج كائن الطلب Order؛ ويقوم الطلب بحساب الإجمالي وإصدار الفاتورة بالتعامل المباشر مع مكوناته الداخلية."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Combining Association and Dependency in a Service Architecture (المثال 9: دمج الاقتران والاعتمادية في معمارية الخدمات)"
            },
            {
              type: "paragraph",
              text: "Real-world service with persistent association to a database and transient dependency on notifications."
            },
            {
              type: "code",
              language: "java",
              filename: "ServiceArchitectureRelationshipsDemo.java",
              code: `public class ServiceArchitectureRelationshipsDemo {
    static class DatabaseConnection {
        void saveRecord(String data) { System.out.println("Persisted to DB: " + data); }
    }

    static class EmailAlert {
        void send(String msg) { System.out.println("Alert dispatched: " + msg); }
    }

    static class AccountService {
        // Association: persistent field
        private final DatabaseConnection db;

        AccountService(DatabaseConnection db) {
            this.db = db;
        }

        // Dependency: EmailAlert is used as method parameter, not stored
        public void registerAccount(String email, EmailAlert alert) {
            db.saveRecord("User(" + email + ")");
            alert.send("Welcome aboard, " + email);
        }
    }

    public static void main(String[] args) {
        DatabaseConnection db = new DatabaseConnection();
        AccountService service = new AccountService(db);

        service.registerAccount("dev@company.com", new EmailAlert());
    }
}`,
              output: `Persisted to DB: User(dev@company.com)
Alert dispatched: Welcome aboard, dev@company.com`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "AccountService has an Association with DatabaseConnection (stored field) and a Dependency on EmailAlert (transient method parameter)."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "تمتلك AccountService علاقة اقتران مع قاعدة البيانات (حقل دائم)، وعلاقة اعتمادية مؤقتة مع EmailAlert (معامل دالة عابر)."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Preventing Memory Leaks in Composition with Defensive Cleanup (المثال 10: تفريغ الذاكرة في علاقات التركيب)"
            },
            {
              type: "paragraph",
              text: "Ensuring child resources close deterministically when the parent container shuts down."
            },
            {
              type: "code",
              language: "java",
              filename: "DefensiveCompositionCleanupDemo.java",
              code: `public class DefensiveCompositionCleanupDemo {
    static class NetworkSocket {
        private final int port;
        private boolean open = true;

        NetworkSocket(int port) { this.port = port; }

        public void close() {
            this.open = false;
            System.out.println("Socket on port " + port + " closed cleanly.");
        }
    }

    static class HttpServer {
        // Composed internal socket
        private final NetworkSocket socket;

        HttpServer(int port) {
            this.socket = new NetworkSocket(port);
            System.out.println("HttpServer started on port " + port);
        }

        public void shutdown() {
            System.out.println("Shutting down HttpServer...");
            socket.close(); // Lifecycle cascade
        }
    }

    public static void main(String[] args) {
        HttpServer server = new HttpServer(8080);
        server.shutdown();
    }
}`,
              output: `HttpServer started on port 8080
Shutting down HttpServer...
Socket on port 8080 closed cleanly.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "Because the socket is composed inside HttpServer, the server explicitly manages its closure, ensuring no resource leaks occur."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "لأن مقبس الشبكة مركب داخل خادم الويب، يتولى الخادم إغلاقه بدقة عند التوقف لمنع تسرب الموارد ومنافذ الاتصال."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Enterprise E-Commerce Cart & Checkout Orchestration (المثال 11: محرك عربة التسوق وسداد الطلبات المتكامل)"
            },
            {
              type: "paragraph",
              text: "Advanced: Orchestrating Aggregation (Customer), Composition (Cart Items), and Dependency (Payment Processor) in one system."
            },
            {
              type: "code",
              language: "java",
              filename: "EcommerceOrchestrationMaster.java",
              code: `import java.util.ArrayList;
import java.util.List;

public class EcommerceOrchestrationMaster {
    // Independent entity
    static class Customer {
        private final String email;
        Customer(String email) { this.email = email; }
        public String getEmail() { return email; }
    }

    // Composed line item
    static class CartLineItem {
        private final String product;
        private final double price;

        CartLineItem(String p, double pr) { this.product = p; this.price = pr; }
        public double getPrice() { return price; }
        public String getProduct() { return product; }
    }

    // Payment dependency interface
    interface PaymentGateway {
        boolean charge(String customerEmail, double amount);
    }

    static class ShoppingCart {
        // Aggregation: Customer exists before and after the cart
        private final Customer customer;
        // Composition: Cart owns the line items exclusively
        private final List<CartLineItem> items = new ArrayList<>();

        ShoppingCart(Customer customer) {
            this.customer = customer;
        }

        public void addProduct(String product, double price) {
            items.add(new CartLineItem(product, price));
        }

        public double getTotal() {
            double total = 0;
            for (CartLineItem item : items) total += item.getPrice();
            return total;
        }

        // Dependency: Gateway is used transiently at checkout
        public boolean checkout(PaymentGateway gateway) {
            double total = getTotal();
            System.out.printf("Checking out cart for %s (Total: $%.2f)%n", customer.getEmail(), total);
            return gateway.charge(customer.getEmail(), total);
        }
    }

    public static void main(String[] args) {
        Customer cust = new Customer("salman@saudi.com");
        ShoppingCart cart = new ShoppingCart(cust);

        cart.addProduct("UltraWide Monitor 34\"", 499.0);
        cart.addProduct("Desk Lamp LED", 45.0);

        // Anonymous payment gateway dependency
        boolean paid = cart.checkout((email, amount) -> {
            System.out.printf("[Mada Payment Gateway] Authorized $%.2f for %s%n", amount, email);
            return true;
        });

        System.out.println("Transaction Status: " + (paid ? "SUCCESS" : "DECLINED"));
    }
}`,
              output: `Checking out cart for salman@saudi.com (Total: $544.00)
[Mada Payment Gateway] Authorized $544.00 for salman@saudi.com
Transaction Status: SUCCESS`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "This model demonstrates all 3 relationships in harmony: Aggregation with Customer, Composition with CartLineItem, and Dependency on PaymentGateway."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "يوضح هذا المثال العلاقات الثلاث مجتمعة: تجميع مع العميل، وتركيب مع بنود السلة، واعتمادية عابرة مع بوابة الدفع Mada."
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
                "Mistake 1: Confusing Aggregation with Composition. In Aggregation, the child object can exist independently outside the parent. In Composition, the child cannot exist without the parent.",
                "خطأ 1: الخلط بين التجميع والتركيب؛ ففي التجميع يستطيع الكائن الفرعي العيش مستقلاً خارج الكائن الحاوي، بينما في التركيب يموت الكائن الفرعي مع الكائن الأساسي.",
                "Mistake 2: Leaking references to composed internal objects. Returning direct references to mutable composed objects violates encapsulation; return defensive copies instead.",
                "خطأ 2: تسريب مراجع الكائنات المركبة داخلياً عبر Getter مباشر، مما يكسر كبسلة البيانات؛ ويجب إرجاع نسخ دفاعية بدلاً منها.",
                "Mistake 3: Turning every relationship into inheritance. When you need to share functionality, prefer Composition over Inheritance."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Smart Home Automation System (التحدي العملي: نظام أتمتة المنازل الذكية)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Create a 'SmartHome' architecture illustrating Composition and Dependency: 1) Create a 'Thermostat' class with 'currentTemp' and a method 'setTemp(int t)'; 2) Create a 'SmartHome' class that COMPOSED its Thermostat in its constructor; 3) Create an external 'WeatherReport' class with 'exteriorTemp'; 4) In SmartHome, create a method 'autoRegulate(WeatherReport report)' (Dependency) that adjusts the thermostat to 22 if exteriorTemp > 35, or to 24 otherwise; 5) Demonstrate in main()."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: صمم نظام 'SmartHome' يوضح التركيب والاعتمادية: 1) فئة 'Thermostat' مع درجة حرارة حالية ودالة لضبطها؛ 2) فئة 'SmartHome' تركب بداخلها كائن Thermostat في مشيدها (تركيب Composition)؛ 3) فئة 'WeatherReport' خارجية مع درجة حرارة خارجية exteriorTemp؛ 4) دالة في SmartHome اسمها autoRegulate(WeatherReport report) تمثل اعتمادية وتضبط الحرارة على 22 إن كانت الخارجية > 35 وعلى 24 إن كانت أقل؛ 5) اختبر في main."
            },
            {
              type: "code",
              language: "java",
              filename: "SmartHomeChallenge.java",
              code: `public class SmartHomeChallenge {
    static class Thermostat {
        private int currentTemp = 20;

        public void setTemp(int t) {
            this.currentTemp = t;
            System.out.println("Thermostat adjusted to: " + currentTemp + "°C");
        }

        public int getCurrentTemp() { return currentTemp; }
    }

    static class WeatherReport {
        private final int exteriorTemp;
        public WeatherReport(int temp) { this.exteriorTemp = temp; }
        public int getExteriorTemp() { return exteriorTemp; }
    }

    static class SmartHome {
        // Composition: Thermostat is created and owned strictly by SmartHome
        private final Thermostat thermostat;

        public SmartHome() {
            this.thermostat = new Thermostat();
        }

        // Dependency: WeatherReport is passed as argument
        public void autoRegulate(WeatherReport report) {
            System.out.println("External weather reading: " + report.getExteriorTemp() + "°C");
            if (report.getExteriorTemp() > 35) {
                thermostat.setTemp(22);
            } else {
                thermostat.setTemp(24);
            }
        }
    }

    public static void main(String[] args) {
        SmartHome home = new SmartHome();
        WeatherReport summerDay = new WeatherReport(42);

        home.autoRegulate(summerDay);
    }
}`,
              output: `External weather reading: 42°C
Thermostat adjusted to: 22°C`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "SmartHome owns Thermostat via Composition (constructed internally), while WeatherReport is consumed via Dependency (method parameter without storing state)."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "يمتلك المنزل الذكي منظم الحرارة عبر علاقة تركيب Composition (أُنشئ داخلياً)، بينما يتعامل مع تقرير الطقس كاعتمادية Dependency عبر معامل الدالة."
            }
          ],
          quiz: [
                    {
                              "id": "q1",
                              "question": "Which of the following correctly classifies the four primary object relationships in Java OOP from weakest to strongest coupling?\n(أي من الخيارات التالية يصنف علاقات الكائنات الأربعة الأساسية في جافا من الأضعف ارتباطاً إلى الأقوى؟)",
                              "options": [
                                        "Composition -> Aggregation -> Association -> Dependency",
                                        "Dependency ('Uses-A') -> Association ('Works-With') -> Aggregation (Weak 'Has-A') -> Composition (Strong 'Part-Of')",
                                        "Inheritance -> Association -> Aggregation -> Dependency",
                                        "Dependency -> Composition -> Aggregation -> Association"
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! The coupling hierarchy from weakest to strongest is: 1) Dependency (transient usage), 2) Association (structural link), 3) Aggregation (weak whole-part with independent lifecycles), 4) Composition (strong whole-part with co-dependent lifecycles). (التسلسل من الأضعف إلى الأشد ارتباطاً هو: الاعتمادية Dependency ثم الاقتران Association ثم التجميع Aggregation ثم التركيب Composition)."
                    },
                    {
                              "id": "q2",
                              "question": "What characterizes a 'Dependency' ('Uses-A') relationship between Class A and Class B in Java?\n(ما الذي يميز علاقة الاعتمادية Dependency أو Uses-A بين فئتين في جافا؟)",
                              "options": [
                                        "Class A holds Class B as a persistent instance variable across its entire lifetime.",
                                        "Class A uses Class B temporarily within a method (as a parameter, local variable, or return type) without storing a reference to it as an instance field.",
                                        "Class A extends Class B.",
                                        "Class A and Class B share the same package."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! A Dependency is a transient relationship where one class relies on another temporarily during method execution (e.g. void printReport(Printer p) { p.print(); }), without retaining B as a permanent field. (الاعتمادية علاقة مؤقتة وعابرة تستخدم فيها الفئة كائناً آخر داخل دالة كمعامل أو متغير محلي دون تخزينه كحقل دائم في الفئة)."
                    },
                    {
                              "id": "q3",
                              "question": "What is the primary difference in object lifecycle between Aggregation and Composition?\n(ما هو الفرق الجوهري في دورة حياة الكائنات بين التجميع Aggregation والتركيب Composition؟)",
                              "options": [
                                        "Aggregation requires the static keyword; Composition does not.",
                                        "In Aggregation, the contained object can exist independently of the container; in Composition, the contained object's lifecycle is strictly bound to the container (if the container is destroyed, the part is destroyed).",
                                        "Composition uses interfaces; Aggregation uses abstract classes.",
                                        "Aggregation is only permitted for primitive types."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Lifecycle ownership is the defining distinction: in Aggregation (weak Has-A), parts survive independent of the whole (e.g. Teachers survive if a Department closes). In Composition (strong Has-A), parts cannot exist without the whole (e.g. Engine/Rooms cannot exist without Car/Building). (في التجميع يعيش الجزء مستقلاً عن الكل، بينما في التركيب تكون دورة حياة الجزء مقيدة كلياً بالكل وتفنى مع فنائه)."
                    },
                    {
                              "id": "q4",
                              "question": "Consider this class definition:\n\npublic class Automobile {\n    private final Engine engine;\n    public Automobile() {\n        this.engine = new Engine();\n    }\n}\n\nWhat relationship does Automobile have with Engine, and why?",
                              "options": [
                                        "Dependency, because Engine is instantiated in the constructor.",
                                        "Composition, because Automobile creates Engine internally and owns its lifecycle completely.",
                                        "Aggregation, because Engine is passed in from outside.",
                                        "Inheritance, because Automobile is an Engine."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Automobile instantiates Engine internally inside its constructor and controls its lifecycle exclusively. Outside code cannot supply or reassign the Engine, making this a classic example of Composition. (علاقة تركيب Composition لأن سيارة Automobile هي التي تنشئ المحرك Engine بنفسها وتتحكم بدورة حياته بالكامل ولا وجود له خارجها)."
                    },
                    {
                              "id": "q5",
                              "question": "Consider this class definition:\n\npublic class Department {\n    private List<Professor> faculty;\n    public Department(List<Professor> faculty) {\n        this.faculty = faculty;\n    }\n}\n\nWhat relationship does Department have with Professor?",
                              "options": [
                                        "Composition, because faculty cannot survive without a department.",
                                        "Aggregation, because Professor instances exist independently and are supplied from an external context; if Department is deleted, the Professors still exist.",
                                        "Dependency, because faculty is a list.",
                                        "Is-A inheritance"
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Professors exist prior to Department creation and continue to exist if Department is garbage collected. Passing existing objects into the constructor creates Aggregation (weak ownership). (علاقة تجميع Aggregation لأن الأساتذة تم إنشاؤهم مسبقاً وتمريرهم للقسم، وإذا حُذف القسم يظل الأساتذة موجودين في النظام)."
                    },
                    {
                              "id": "q6",
                              "question": "How does an Association relationship differ from Aggregation?\n(بماذا تختلف علاقة الاقتران Association عن علاقة التجميع Aggregation؟)",
                              "options": [
                                        "Association represents a general structural connection between peer classes without any implied 'whole-part' ownership, whereas Aggregation implies a definite whole-part relationship.",
                                        "Association requires multiple inheritance.",
                                        "Association is only used for database entities.",
                                        "Aggregation does not allow instance variables."
                              ],
                              "correctIndex": 0,
                              "explanation": "Correct! Association indicates that two classes simply 'work together' or know about each other (e.g., Doctor and Patient) as peers, without any concept of one being a part or container of the other. Aggregation specifically models a whole-part container. (الاقتران يعبر عن علاقة تعاون عامة بين أقران مثل الطبيب والمريض دون وجود علاقة حاوية أو جزء وكل، بينما التجميع علاقة جزء من كل واضحة)."
                    },
                    {
                              "id": "q7",
                              "question": "Which code pattern is commonly used in Java to model dynamic Aggregation that allows runtime re-assignment?\n(أي الأنماط البرمجية يُستخدم عادة في جافا لتمثيل التجميع الديناميكي الذي يسمح بإعادة التعيين أثناء التشغيل؟)",
                              "options": [
                                        "Declaring the member field as static final.",
                                        "Providing public setter methods (e.g. setDepartment(Department d)) that allow the reference to be updated dynamically during application execution.",
                                        "Using private constructors.",
                                        "Making all methods native."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Providing mutator/setter methods allows aggregated objects to be reassigned, replaced, or disconnected dynamically (e.g. an employee transferring to a different department) without recreating the parent. (توفير دوال التعيين setter يتيح استبدال الكائن المجمع أو نقله ديناميكياً أثناء تشغيل التطبيق بكل مرونة)."
                    },
                    {
                              "id": "q8",
                              "question": "What is Cascading Operations in the context of Composition relationships?\n(ما هي العمليات المتعاقبة Cascading Operations في سياق علاقات التركيب؟)",
                              "options": [
                                        "Using cascading CSS stylesheets in desktop Java.",
                                        "Propagating lifecycle events (such as save, delete, close, or validate) from the container object down to all of its internal composed child parts automatically.",
                                        "Calling super() across three constructors.",
                                        "Running recursive binary search."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! In Composition, the container is responsible for its parts. Operations like deleting an Order automatically cascade to delete all associated OrderLines; closing a FileStream cascades to close its underlying Buffer. (العمليات المتعاقبة تعني تمرير وتطبيق الإجراءات مثل الحذف أو الإغلاق أو الحفظ تلقائياً من الكائن الأب إلى كافة أجزائه المركبة بالتبعية)."
                    },
                    {
                              "id": "q9",
                              "question": "Why should classes participating in Composition implement the AutoCloseable interface if their internal parts manage system resources?\n(لماذا يجب على الفئات في علاقات التركيب تطبيق AutoCloseable إذا كانت أجزاؤها الداخلية تدير موارد النظام؟)",
                              "options": [
                                        "To prevent classes from being inherited.",
                                        "To ensure that when the composite object is closed, all internal composed resources (sockets, file descriptors, database connections) are closed defensively to prevent leaks.",
                                        "Because Java refuses to compile without AutoCloseable.",
                                        "To convert the object to an array."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Because external clients only hold a reference to the composite container, implementing AutoCloseable ensures that closing the container cascades to defensively close and release all underlying system resources. (لأن العميل الخارجي يتعامل فقط مع الكائن المركب الحاوي، فإن إغلاقه يجب أن يضمن إغلاق وتفريغ كافة المقابس والملفات المفتوحة بداخله دفاعياً لمنع تسرب الذاكرة والموارد)."
                    },
                    {
                              "id": "q10",
                              "question": "In object design, what does 'Multiplicity' (or Cardinality) describe in an Association relationship?\n(ما الذي تصفه التعددية Multiplicity في علاقات الاقتران بين الكائنات؟)",
                              "options": [
                                        "The number of methods a class contains.",
                                        "The numerical relationship between collaborating instances (e.g. One-to-One, One-to-Many, Many-to-Many).",
                                        "The number of CPU threads executing the class.",
                                        "The size of the object in bytes."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Multiplicity defines how many instances of one class can be associated with how many instances of another class (e.g., One Student to Many Courses, or One Passport to One Person). (تحدد التعددية العلاقة الرقمية والعددية بين الكائنات المرتبطة كعلاقة واحد لواحد أو واحد لمتعدد أو متعدد لمتعدد)."
                    },
                    {
                              "id": "q11",
                              "question": "Why does favoring Aggregation with Dependency Injection (DI) promote higher testability compared to hard-coded Composition?\n(لماذا يؤدي تفضيل التجميع مع حقن التبعيات DI إلى قابلية اختبار أعلى مقارنة بالتركيب الصارم؟)",
                              "options": [
                                        "Because Aggregation makes code run 10x faster.",
                                        "Because injecting dependencies allows test suites to supply mock or stub implementations without modifying the class under test.",
                                        "Because DI eliminates the need for unit tests.",
                                        "Because Composition is deprecated in modern Java."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! When a class instantiates its own dependencies internally (hardcoded Composition), testing it in isolation is difficult. Aggregation via Dependency Injection allows unit tests to supply lightweight mock objects (e.g. MockPaymentGateway) seamlessly. (حقن التبعيات عبر التجميع يتيح للوحدات الاختبارية تمرير كائنات وهمية Mock Objects لاختبار الفئة بمعزل عن الخدمات الخارجية وقواعد البيانات)."
                    },
                    {
                              "id": "q12",
                              "question": "What is printed by executing the following code?\n\nclass Battery {\n    int charge = 100;\n}\nclass Phone {\n    Battery battery;\n    Phone(Battery b) { this.battery = b; }\n}\npublic class RelationshipTest {\n    public static void main(String[] args) {\n        Battery b1 = new Battery();\n        Phone p = new Phone(b1);\n        b1.charge = 45;\n        System.out.println(p.battery.charge);\n    }\n}",
                              "options": [
                                        "100",
                                        "45",
                                        "0",
                                        "Compile-time error"
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! In this Aggregation relationship, b1 and p.battery reference the exact same Battery instance on the heap. Mutating b1.charge modifies the shared object, so p.battery.charge prints 45. (في علاقة التجميع يشير b1 و p.battery إلى نفس كائن البطارية بالذاكرة؛ وتعديل الشحن عبر b1 يظهر مباشرة في p.battery فيطبع 45)."
                    },
                    {
                              "id": "q13",
                              "question": "In an e-commerce platform, what is the best relationship modeling between Customer, ShoppingCart, Order, and OrderItem?\n(في منصة التجارة الإلكترونية، ما هو النموذج الأفضل للعلاقات بين العميل وعربة التسوق والطلب وعناصر الطلب؟)",
                              "options": [
                                        "All four classes must inherit from each other.",
                                        "Customer has an Association with ShoppingCart; Order has a Composition relationship with OrderItem (OrderItems cannot exist without an Order and snapshot historical prices).",
                                        "OrderItem extends Customer.",
                                        "Customer is Composed inside ShoppingCart."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! A Customer associates with a dynamic ShoppingCart (items move in and out). Once placed, an Order maintains strict Composition with its OrderItems (they represent an immutable legal record that cannot exist apart from that specific order). (يرتبط العميل بعربة التسوق باقتران مرن، بينما يتكون الطلب Order من عناصره OrderItem بتركيب قوي لا ينفصل يحفظ أسعار وسجلات البيع الثابتة)."
                    },
                    {
                              "id": "q14",
                              "question": "In a Smart Home system, SmartHomeHub contains a volatile LogBuffer created in its constructor and manages a List<SmartDevice> passed to it. What are these two relationships?\n(في نظام المنزل الذكي، يحتوي Hub على LogBuffer ينشئه بنفسه وقائمة أجهزة SmartDevice تُمرر له، ما هما هاتان العلاقتان؟)",
                              "options": [
                                        "LogBuffer is Inheritance; SmartDevice is Dependency.",
                                        "LogBuffer is Composition (owned and managed internally); SmartDevice is Aggregation (devices exist independently in the house).",
                                        "Both are Composition.",
                                        "Both are Dependency."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! The internal LogBuffer is created and managed exclusively by the Hub (Composition). The external smart devices exist physically in the house and continue to exist even if the Hub is rebooted or removed (Aggregation). (سجل LogBuffer علاقة تركيب Composition لأنه ينشأ ويُدار داخلياً، بينما الأجهزة الذكية علاقة تجميع Aggregation لأنها مستقلة وتعيش في المنزل حتى لو أُزيل المركز)."
                    },
                    {
                              "id": "q15",
                              "question": "How can tightly coupled Composition (e.g. class PaymentService { private PayPalClient client = new PayPalClient(); }) be refactored to achieve loose coupling?\n(كيف يمكن إعادة هيكلة فئة شديدة الارتباط تستخدم التركيب الصارم لتحقيق اقتران مرن Loose Coupling؟)",
                              "options": [
                                        "Make PayPalClient private static.",
                                        "Extract a PaymentGateway interface, make PaymentService accept a PaymentGateway parameter in its constructor (Aggregation / Dependency Injection).",
                                        "Delete PaymentService entirely.",
                                        "Inherit PaymentService from PayPalClient."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Extracting a common interface (PaymentGateway) and supplying the concrete provider via constructor injection converts tightly coupled Composition into loose Aggregation, allowing dynamic swapping of payment providers (PayPal, Stripe, ApplePay). (استخراج واجهة PaymentGateway وتمريرها للمشيد يحول الارتباط الصارم إلى تجميع مرن Dependency Injection يتيح تغيير موفر الدفع بسهولة واختبار الكود بموثوقية)."
                    }
          ]
        }
      ]
    },

    /* ==========================================================================
       TOPIC 26: Has-A vs Is-A
       ========================================================================== */
    {
      id: "has-a-vs-is-a",
      title: "26. Has-A vs Is-A",
      description: "Contrasting Inheritance ('Is-A') vs Composition/Aggregation ('Has-A'): The Fragile Base Class problem, Favoring Composition Over Inheritance, and architectural selection criteria.",
      lessons: [
        {
          id: "has-a-vs-is-a-mastery",
          title: "Complete Guide to Has-A vs Is-A",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "Understanding Has-A vs Is-A in Java (فهم الفارق بين علاقة Is-A وعلاقة Has-A)"
            },
            {
              type: "paragraph",
              text: "The architectural distinction between 'Is-A' and 'Has-A' is the single most important design decision in Object-Oriented Programming: 1) 'Is-A' is based on Inheritance (using the 'extends' or 'implements' keyword), where a subclass IS a specialized variety of a superclass (e.g., 'Dog IS-A Mammal'); 2) 'Has-A' is based on Composition or Aggregation, where a class HAS a component instance as an internal field (e.g., 'Car HAS-A Transmission')."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "التفريق المعماري بين علاقة 'Is-A' (هو نوع من) وعلاقة 'Has-A' (يمتلك أو يحتوي على) هو أهم قرار تصميم في البرمجة كائنية التوجه: 1) علاقة 'Is-A' تُبنى بالوراثة (عبر extends أو implements)، وتعني أن الابن هو نوع متخصص من الأب (مثل: الكلب هو حيوان ثديي)؛ 2) علاقة 'Has-A' تُبنى بالتركيب أو التجميع، وتعني أن الفئة تمتلك كائناً داخلياً كحقل مساعد (مثل: السيارة تمتلك ناقل حركة)."
            },
            {
              type: "paragraph",
              text: "The Famous Software Engineering Principle: 'Favor Composition Over Inheritance' (Gang of Four). Inheritance introduces tight coupling and suffers from the 'Fragile Base Class' problem, whereas Composition yields modular, testable, and swappable code at runtime."
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
              text: "Example 1: Classic 'Is-A' Relationship via Inheritance (المثال 1: علاقة Is-A الكلاسيكية عبر الوراثة)"
            },
            {
              type: "paragraph",
              text: "A Sparrow IS-A Bird. It shares the fundamental biology and features of a Bird."
            },
            {
              type: "code",
              language: "java",
              filename: "IsADemo.java",
              code: `public class IsADemo {
    static class Bird {
        void layEggs() {
            System.out.println("Bird lays eggs in nest.");
        }
    }

    // Sparrow 'IS-A' Bird (Inheritance)
    static class Sparrow extends Bird {
        void chirp() {
            System.out.println("Sparrow chirping joyfully.");
        }
    }

    public static void main(String[] args) {
        Sparrow s = new Sparrow();
        s.layEggs(); // Inherited behavior
        s.chirp();   // Specialized behavior
    }
}`,
              output: `Bird lays eggs in nest.
Sparrow chirping joyfully.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "Sparrow extends Bird because every sparrow IS a bird, inheriting its biological behaviors directly."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "يرث العصفور فئة الطائر لأن كل عصفور هو طائر بالفعل (Is-A)، فيرث دوال وضع البيض تلقائياً."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Classic 'Has-A' Relationship via Composition (المثال 2: علاقة Has-A الكلاسيكية عبر التركيب)"
            },
            {
              type: "paragraph",
              text: "A Car is NOT an Engine; a Car HAS-AN Engine."
            },
            {
              type: "code",
              language: "java",
              filename: "HasADemo.java",
              code: `public class HasADemo {
    static class Engine {
        void start() { System.out.println("Engine cylinders firing smoothly."); }
    }

    // Car 'HAS-A' Engine (Composition)
    static class Car {
        private final Engine engine = new Engine();

        public void startCar() {
            System.out.println("Turning ignition key...");
            engine.start(); // Delegates to internal engine
        }
    }

    public static void main(String[] args) {
        Car myCar = new Car();
        myCar.startCar();
    }
}`,
              output: `Turning ignition key...
Engine cylinders firing smoothly.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "Car does NOT extend Engine. Instead, it has a field of type Engine and delegates starting logic to it."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "لا ترث السيارة من المحرك؛ فالسيارة ليست محركاً بل تمتلك محركاً (Has-A)، وتفوض إليه عملية التشغيل."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Fragile Base Class Problem with Inheritance (المثال 3: مشكلة الفئة الأساسية الهشة في الوراثة)"
            },
            {
              type: "paragraph",
              text: "Modifying the superclass inadvertently breaks subclass counting logic due to internal method delegation."
            },
            {
              type: "code",
              language: "java",
              filename: "FragileBaseClassDemo.java",
              code: `import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class FragileBaseClassDemo {
    // Custom set extending ArrayList (Bad 'Is-A' anti-pattern)
    static class InstrumentedTestList<E> extends ArrayList<E> {
        private int addCount = 0;

        @Override
        public boolean add(E e) {
            addCount++;
            return super.add(e);
        }

        @Override
        public boolean addAll(Collection<? extends E> c) {
            addCount += c.size();
            return super.addAll(c); // Caution: super.addAll() internally calls add()!
        }

        public int getAddCount() { return addCount; }
    }

    public static void main(String[] args) {
        InstrumentedTestList<String> list = new InstrumentedTestList<>();
        list.addAll(List.of("A", "B", "C"));

        // Expected 3, but prints 6 because super.addAll calls add() internally!
        System.out.println("Reported Items Added: " + list.getAddCount());
    }
}`,
              output: `Reported Items Added: 6`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "Inheritance exposes internal implementation details. Because super.addAll calls add(), addCount was incremented twice for each element!"
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "أدى استخدام الوراثة هنا لمضاعفة العداد إلى 6؛ لأن دالة addAll في الفئة الأب تستدعي add داخلياً، مما كشف عيوب الوراثة المحكمة."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Solving Fragile Base Class Using Composition (Wrapper/Decorator) (المثال 4: حل المشكلة باستخدام التركيب)"
            },
            {
              type: "paragraph",
              text: "Rewriting the counter using 'Has-A' (Forwarding) completely eliminates the double-counting bug."
            },
            {
              type: "code",
              language: "java",
              filename: "CompositionSolutionDemo.java",
              code: `import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class CompositionSolutionDemo {
    // Composition / Forwarding: Has-A List
    static class SafeInstrumentedList<E> {
        private final List<E> internalList = new ArrayList<>();
        private int addCount = 0;

        public boolean add(E e) {
            addCount++;
            return internalList.add(e);
        }

        public boolean addAll(Collection<? extends E> c) {
            addCount += c.size();
            return internalList.addAll(c);
        }

        public int getAddCount() { return addCount; }
        public int size() { return internalList.size(); }
    }

    public static void main(String[] args) {
        SafeInstrumentedList<String> list = new SafeInstrumentedList<>();
        list.addAll(List.of("A", "B", "C"));

        System.out.println("Items in internal list: " + list.size());
        System.out.println("Reported Items Added:   " + list.getAddCount());
    }
}`,
              output: `Items in internal list: 3
Reported Items Added:   3`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "By composing internalList instead of extending ArrayList, SafeInstrumentedList is insulated from the superclass internal method interactions."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "باستخدام علاقة Has-A، عزلنا القائمة الداخلية تماماً، وتم حساب العناصر بدقة متناهية (3 عناصر) دون التأثر بكود الفئة الأب."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Runtime Behavior Swapping via Composition (المثال 5: تغيير السلوك في وقت التشغيل عبر التركيب)"
            },
            {
              type: "paragraph",
              text: "Inheritance locks behavior at compile time; Composition allows swapping algorithms dynamically."
            },
            {
              type: "code",
              language: "java",
              filename: "RuntimeSwappingDemo.java",
              code: `public class RuntimeSwappingDemo {
    interface FlyBehavior {
        void fly();
    }

    static class FlyWithWings implements FlyBehavior {
        public void fly() { System.out.println("Flying high with feather wings."); }
    }

    static class FlyNoWay implements FlyBehavior {
        public void fly() { System.out.println("Cannot fly (grounded)."); }
    }

    // Duck HAS-A FlyBehavior
    static class Duck {
        private FlyBehavior flyBehavior;

        Duck(FlyBehavior fb) { this.flyBehavior = fb; }

        public void setFlyBehavior(FlyBehavior fb) {
            this.flyBehavior = fb; // Swapped at runtime!
        }

        public void performFly() { flyBehavior.fly(); }
    }

    public static void main(String[] args) {
        Duck mallard = new Duck(new FlyWithWings());
        mallard.performFly();

        // Injury grounds the duck: behavior changed at runtime!
        System.out.println("[Event] Duck injured its wing!");
        mallard.setFlyBehavior(new FlyNoWay());
        mallard.performFly();
    }
}`,
              output: `Flying high with feather wings.
[Event] Duck injured its wing!
Cannot fly (grounded).`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "With Composition, the duck's flight behavior can be swapped dynamically at runtime, which is impossible with static class inheritance."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "يتيح التركيب تغيير سلوك الطيران أثناء تشغيل البرنامج بسهولة، بينما تعجز الوراثة الثابتة عن تغيير السلوك بعد بناء الفئات."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: The Liskov Substitution Principle Test for 'Is-A' (المثال 6: اختبار مبدأ الإحلال للوراثة الصحيحة)"
            },
            {
              type: "paragraph",
              text: "The famous Rectangle-Square problem showing when an apparent 'Is-A' relationship violates object principles."
            },
            {
              type: "code",
              language: "java",
              filename: "LiskovIsATestDemo.java",
              code: `public class LiskovIsATestDemo {
    static class Rectangle {
        protected int width;
        protected int height;

        public void setWidth(int w) { this.width = w; }
        public void setHeight(int h) { this.height = h; }
        public int getArea() { return width * height; }
    }

    // A Square mathematically IS-A Rectangle, but in OOP it breaks assumptions!
    static class Square extends Rectangle {
        @Override
        public void setWidth(int w) {
            this.width = w;
            this.height = w; // Modifies height too!
        }

        @Override
        public void setHeight(int h) {
            this.width = h;
            this.height = h;
        }
    }

    public static void verifyRectangle(Rectangle r) {
        r.setWidth(5);
        r.setHeight(10);
        // Expects 5 * 10 = 50
        System.out.println("Expected Area: 50 | Actual Area: " + r.getArea());
    }

    public static void main(String[] args) {
        System.out.println("Testing standard Rectangle:");
        verifyRectangle(new Rectangle());

        System.out.println("Testing Square (Violates Liskov Substitution Principle):");
        verifyRectangle(new Square());
    }
}`,
              output: `Testing standard Rectangle:
Expected Area: 50 | Actual Area: 50
Testing Square (Violates Liskov Substitution Principle):
Expected Area: 50 | Actual Area: 100`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "Even though a square is mathematically a rectangle, inheritance breaks the contract because changing width affects height. Prefer Composition here."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "رغم أن المربع مستطيل هندسياً، إلا أن وراثته في البرمجة تخرق مبدأ Liskov لأن تعديل العرض يغير الارتفاع، مما يثبت خطأ الوراثة هنا."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Multi-Behavior Assembly with Composition (المثال 7: تجميع سلوكيات متعددة عبر التركيب)"
            },
            {
              type: "paragraph",
              text: "Avoiding class explosion by composing independent capabilities instead of multiple inheritance levels."
            },
            {
              type: "code",
              language: "java",
              filename: "MultiBehaviorCompositionDemo.java",
              code: `public class MultiBehaviorCompositionDemo {
    static class GpsNavigator {
        void navigate(String destination) {
            System.out.println("GPS routing shortest path to: " + destination);
        }
    }

    static class SoundSystem {
        void playAudio(String track) {
            System.out.println("Surround audio playing: " + track);
        }
    }

    // Vehicle HAS-A GpsNavigator and HAS-A SoundSystem
    static class SmartCar {
        private final GpsNavigator gps = new GpsNavigator();
        private final SoundSystem sound = new SoundSystem();

        public void driveTo(String location) {
            gps.navigate(location);
            sound.playAudio("Driving Beats Radio");
        }
    }

    public static void main(String[] args) {
        SmartCar car = new SmartCar();
        car.driveTo("Riyadh Boulevard");
    }
}`,
              output: `GPS routing shortest path to: Riyadh Boulevard
Surround audio playing: Driving Beats Radio`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "SmartCar combines GPS navigation and audio through composition without having to inherit from either class."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "تدمج السيارة الذكية نظام الملاحة ونظام الصوت عبر التركيب دون الحاجة لوراثة معقدة من فئات غير متجانسة."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Decoupled Unit Testing through 'Has-A' Mocking (المثال 8: سهولة الاختبار المعزول للتركيب)"
            },
            {
              type: "paragraph",
              text: "With 'Has-A', dependencies can be injected as mock test doubles for clean unit tests."
            },
            {
              type: "code",
              language: "java",
              filename: "DecoupledTestingDemo.java",
              code: `public class DecoupledTestingDemo {
    interface PaymentGateway {
        boolean process(double amount);
    }

    static class CheckoutService {
        private final PaymentGateway gateway;

        CheckoutService(PaymentGateway g) { this.gateway = g; }

        public String finalizeOrder(double amount) {
            if (gateway.process(amount)) {
                return "ORDER_SUCCESS";
            }
            return "ORDER_FAILED";
        }
    }

    public static void main(String[] args) {
        // In unit tests, inject mock lambda gateway instead of real bank!
        PaymentGateway mockSuccessGateway = amount -> true;
        PaymentGateway mockFailingGateway = amount -> false;

        CheckoutService test1 = new CheckoutService(mockSuccessGateway);
        System.out.println("Test 1 Result: " + test1.finalizeOrder(100.0));

        CheckoutService test2 = new CheckoutService(mockFailingGateway);
        System.out.println("Test 2 Result: " + test2.finalizeOrder(100.0));
    }
}`,
              output: `Test 1 Result: ORDER_SUCCESS
Test 2 Result: ORDER_FAILED`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "Because CheckoutService HAS-A PaymentGateway via constructor injection, unit testing requires zero real payment infrastructure."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "بفضل التركيب وحقن التبعيات، يمكن اختبار خدمة الدفع ببوابات وهمية بسيطة دون الحاجة للاتصال الفعلي بالبنوك."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Decorator Pattern using Has-A (المثال 9: نمط المزين Decorator Pattern بالتركيب)"
            },
            {
              type: "paragraph",
              text: "Extending functionality dynamically by wrapping objects rather than subclassing."
            },
            {
              type: "code",
              language: "java",
              filename: "DecoratorCompositionDemo.java",
              code: `public class DecoratorCompositionDemo {
    interface Coffee {
        double getCost();
        String getDescription();
    }

    static class SimpleCoffee implements Coffee {
        public double getCost() { return 5.0; }
        public String getDescription() { return "Black Coffee"; }
    }

    // Decorator HAS-A Coffee
    abstract static class CoffeeDecorator implements Coffee {
        protected final Coffee decoratedCoffee;
        CoffeeDecorator(Coffee c) { this.decoratedCoffee = c; }
    }

    static class MilkDecorator extends CoffeeDecorator {
        MilkDecorator(Coffee c) { super(c); }
        public double getCost() { return decoratedCoffee.getCost() + 1.5; }
        public String getDescription() { return decoratedCoffee.getDescription() + " + Steamed Milk"; }
    }

    public static void main(String[] args) {
        Coffee order = new SimpleCoffee();
        order = new MilkDecorator(order); // Wrapped via composition!

        System.out.println("Drink: " + order.getDescription());
        System.out.printf("Total Cost: $%.2f%n", order.getCost());
    }
}`,
              output: `Drink: Black Coffee + Steamed Milk
Total Cost: $6.50`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "The Decorator pattern leverages 'Has-A' to wrap an existing object with additional behavior without modifying the underlying class."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "يعتمد نمط Decorator على علاقة Has-A لتغليف الكائن بسلوكيات وإضافات جديدة دون المساس بالفئة الأصلية."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Decision Matrix: When to Choose Is-A vs Has-A (المثال 10: مصفوفة اتخاذ القرار)"
            },
            {
              type: "paragraph",
              text: "Comprehensive architectural checklist comparing Is-A and Has-A characteristics."
            },
            {
              type: "code",
              language: "java",
              filename: "DecisionMatrixDemo.java",
              code: `public class DecisionMatrixDemo {
    public static void main(String[] args) {
        System.out.println("=== ARCHITECTURAL SELECTION GUIDE ===");
        System.out.println("Feature                | IS-A (Inheritance)     | HAS-A (Composition)");
        System.out.println("----------------------------------------------------------------------");
        System.out.println("Coupling               | Tight / Rigid          | Loose / Modular");
        System.out.println("Polymorphism           | Automatic              | Via Interface");
        System.out.println("Runtime Swapping       | Impossible             | Fully Dynamic");
        System.out.println("Encapsulation          | Broken (White-box)     | Preserved (Black-box)");
        System.out.println("Unit Testing           | Hard to isolate        | Easy with Mocks");
        System.out.println("Primary Use Case       | True Subtype Taxonomy  | Code Reuse / Parts");
    }
}`,
              output: `=== ARCHITECTURAL SELECTION GUIDE ===
Feature                | IS-A (Inheritance)     | HAS-A (Composition)
----------------------------------------------------------------------
Coupling               | Tight / Rigid          | Loose / Modular
Polymorphism           | Automatic              | Via Interface
Runtime Swapping       | Impossible             | Fully Dynamic
Encapsulation          | Broken (White-box)     | Preserved (Black-box)
Unit Testing           | Hard to isolate        | Easy with Mocks
Primary Use Case       | True Subtype Taxonomy  | Code Reuse / Parts`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "Use 'Is-A' strictly when the subclass genuinely satisfies the Liskov substitution principle; use 'Has-A' for everything else."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "استخدم Is-A فقط عندما يكون الابن بديلاً حقيقياً للأب بلا أي استثناء، واستخدم Has-A في بقية الحالات لإعادة استخدام الأكواد بمرونة."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Enterprise Cloud Notification Hub (Is-A & Has-A in Harmony) (المثال 11: مركز الإشعارات السحابية المدمج)"
            },
            {
              type: "paragraph",
              text: "Advanced: Combining 'Is-A' for message taxonomy and 'Has-A' for dispatching providers."
            },
            {
              type: "code",
              language: "java",
              filename: "NotificationHubMaster.java",
              code: `public class NotificationHubMaster {
    // 'IS-A' Hierarchy for Message Taxonomy
    abstract static class NotificationMessage {
        private final String recipient;
        NotificationMessage(String to) { this.recipient = to; }
        public String getRecipient() { return recipient; }
        public abstract String renderBody();
    }

    static class SecurityAlertMessage extends NotificationMessage {
        SecurityAlertMessage(String to) { super(to); }
        @Override
        public String renderBody() { return "[CRITICAL] Unauthorized login attempt detected!"; }
    }

    // 'HAS-A' Dispatch Strategy (Composition)
    interface TransportClient {
        void dispatch(String destination, String content);
    }

    static class NotificationHub {
        // NotificationHub HAS-A TransportClient (Composition)
        private final TransportClient transport;

        NotificationHub(TransportClient client) {
            this.transport = client;
        }

        public void broadcast(NotificationMessage msg) {
            transport.dispatch(msg.getRecipient(), msg.renderBody());
        }
    }

    public static void main(String[] args) {
        // Assemble via composition
        NotificationHub smsHub = new NotificationHub((dest, text) ->
            System.out.printf("[Twilio SMS -> %s]: %s%n", dest, text));

        // Use 'IS-A' message subtype
        NotificationMessage alert = new SecurityAlertMessage("+966501234567");
        smsHub.broadcast(alert);
    }
}`,
              output: `[Twilio SMS -> +966501234567]: [CRITICAL] Unauthorized login attempt detected!`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "This architecture harmonizes both: SecurityAlertMessage IS-A NotificationMessage (taxonomy), while NotificationHub HAS-A TransportClient (swappable composition)."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "يجمع هذا المثال المعماري بين الاثنين: رسالة التنبيه هي نوع من الرسائل (Is-A)، بينما مركز الإشعارات يمتلك عميل نقل قابل للاستبدال (Has-A)."
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
                "Mistake 1: Using Inheritance solely for code reuse. If the subclass is not genuinely a subtype of the superclass in all contexts, use Composition.",
                "خطأ 1: استخدام الوراثة فقط لإعادة تدوير الكود؛ فإذا لم تكن الفئة ابناً حقيقياً للأب في جميع الظروف يجب استخدام التركيب Composition.",
                "Mistake 2: Falling victim to the Fragile Base Class problem. Superclass method changes inadvertently cascade down and break subclass assumptions.",
                "خطأ 2: الوقوع في فخ الفئة الأساسية الهشة؛ حيث تتسبب التعديلات الداخلية في الأب في تدمير منطق الفئات الابنة دون علم المطور.",
                "Mistake 3: Over-engineering deep inheritance trees (e.g. 5+ levels). Prefer flat hierarchies combined with composed strategy objects."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Refactoring Inheritance to Composition (التحدي العملي: إعادة صياغة الوراثة إلى تركيب)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "A junior developer wrote: 'class SecurityScanner extends Logger'. Refactor this to use Composition: 1) Create a 'Logger' class with 'void log(String msg)'; 2) Create 'SecurityScanner' that HAS-A Logger field; 3) Inject Logger through constructor; 4) In SecurityScanner, provide a method 'scanPort(int port)' that logs 'Scanning port: <port>' and returns true if port == 443; 5) Test in main()."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: قام مبرمج مبتدئ بجعل فئة SecurityScanner ترث من فئة Logger (وراثة خاطئة لأن الماسح ليس سجلاً بل يمتلك سجلاً). أعد الصياغة بالتركيب: 1) فئة Logger بها دالة log؛ 2) فئة SecurityScanner تمتلك حقلاً من Logger؛ 3) حقن السجل عبر المشيد؛ 4) دالة scanPort(int port) تسجل فحص المنفذ وتعيد true إن كان 443؛ 5) اختبر في main."
            },
            {
              type: "code",
              language: "java",
              filename: "RefactoringChallenge.java",
              code: `public class RefactoringChallenge {
    static class Logger {
        public void log(String msg) {
            System.out.println("[AUDIT LOG] " + msg);
        }
    }

    // Correct Refactoring: SecurityScanner HAS-A Logger (Composition)
    static class SecurityScanner {
        private final Logger logger;

        public SecurityScanner(Logger logger) {
            this.logger = logger;
        }

        public boolean scanPort(int port) {
            logger.log("Scanning network port: " + port);
            if (port == 443) {
                logger.log("Port 443 is OPEN (HTTPS)");
                return true;
            }
            logger.log("Port " + port + " is CLOSED");
            return false;
        }
    }

    public static void main(String[] args) {
        Logger appLogger = new Logger();
        SecurityScanner scanner = new SecurityScanner(appLogger);

        scanner.scanPort(80);
        scanner.scanPort(443);
    }
}`,
              output: `[AUDIT LOG] Scanning network port: 80
[AUDIT LOG] Port 80 is CLOSED
[AUDIT LOG] Scanning network port: 443
[AUDIT LOG] Port 443 is OPEN (HTTPS)`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "A security scanner is NOT a logger; it HAS a logger. Refactoring to composition maintains clean boundaries and enables substituting different loggers easily."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "الماسح الأمني ليس سجلاً بل يمتلك سجلاً (Has-A). أدى التحويل للتركيب إلى فصل المسؤوليات وإمكانية تغيير مسجل الأحداث بسهولة دون تعقيد."
            }
          ],
          quiz: [
                    {
                              "id": "q1",
                              "question": "What is the fundamental architectural difference between an 'Is-A' relationship and a 'Has-A' relationship in Java?\n(ما هو الفرق المعماري الجوهري بين علاقة 'هو نوع من' Is-A وعلاقة 'يمتلك' Has-A في جافا؟)",
                              "options": [
                                        "Is-A is implemented via class inheritance (extends) or interface realization (implements); Has-A is implemented via composition or aggregation (holding references as fields).",
                                        "Is-A is used only for abstract classes; Has-A is used only for interfaces.",
                                        "Has-A requires public fields; Is-A requires private fields.",
                                        "There is no architectural difference; they are synonymous terms."
                              ],
                              "correctIndex": 0,
                              "explanation": "Correct! 'Is-A' denotes a specialization or subtyping relationship implemented using 'extends' or 'implements'. 'Has-A' denotes containment or ownership where one class holds an instance of another class as an instance field (composition or aggregation). (علاقة Is-A تعني تصنيفاً فرعياً بالوراثة extends، بينما Has-A تعني احتواء أو ملكية كائن لآخر كحقل composition/aggregation)."
                    },
                    {
                              "id": "q2",
                              "question": "What is the primary design vulnerability described by the 'Fragile Base Class Problem'?\n(ما هي الثغرة التصميمية الأساسية المعروفة بـ 'معضلة الفئة الأب الهشة' Fragile Base Class Problem؟)",
                              "options": [
                                        "Base classes running out of heap memory.",
                                        "Modifications to internal implementation details of a superclass inadvertently breaking the behavior, assumptions, or invariants of existing subclasses.",
                                        "Subclasses that refuse to compile due to missing package declarations.",
                                        "Base classes that cannot declare constructors."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! The fragile base class problem occurs in deep inheritance hierarchies: when the author of a base class alters its internal method calls or state mutations, derived subclasses that rely on those internal details can silently fail or violate invariants. (تحدث عندما يؤدي تعديل التفاصيل الداخلية في فئة الأب إلى كسر سلوك الفئات الفرعية الموروثة منها بشكل غير مقصود بسبب شدة الارتباط)."
                    },
                    {
                              "id": "q3",
                              "question": "Why is the standard library's java.util.Stack (which extends java.util.Vector) widely considered an anti-pattern of inheritance abuse?\n(لماذا يعتبر امتداد java.util.Stack من java.util.Vector في مكتبة جافا خطأ تصميمياً كلاسيكياً؟)",
                              "options": [
                                        "Because Vector is too slow to store integers.",
                                        "Because inheritance exposed Vector's index-based methods (e.g. insertElementAt(item, index), remove(index)) on Stack, violating the strict Last-In-First-Out (LIFO) invariant.",
                                        "Because Stack cannot hold generic types.",
                                        "Because Vector is deprecated in modern Java."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! A Stack should only support push, pop, and peek. By extending Vector, Stack inherited all arbitrary index manipulation methods (like add(index, element)), breaking the fundamental LIFO invariant of a stack. It should have used composition (Has-A a Vector or Deque). (وراثة Stack من Vector كشفت دوال الوصول العشوائي بالمؤشر index مما كسر مبدأ المكدس الصارم LIFO؛ وكان الأجدر استخدام التركيب Has-A)."
                    },
                    {
                              "id": "q4",
                              "question": "Why does the object-oriented design axiom 'Favor Composition over Inheritance' hold true in modern architecture?\n(لماذا يُنصح دائماً بتفضيل التركيب على الوراثة 'Favor Composition over Inheritance' في الأنظمة الحديثة؟)",
                              "options": [
                                        "Because inheritance is banned in modern Java.",
                                        "Because composition achieves loose coupling, prevents the fragile base class problem, and allows runtime dynamic swapping of component behavior.",
                                        "Because composition uses zero memory on the JVM heap.",
                                        "Because classes using composition do not need constructors."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Composition maintains loose coupling by interacting strictly through public interfaces. It avoids fragile base class issues and enables dynamic behavioral changes at runtime (e.g. swapping a strategy) that static compile-time inheritance cannot achieve. (التركيب يوفر اقتراناً مرناً ويحمي من مشاكل الفئة الأب الهشة ويتيح استبدال السلوكيات ديناميكياً أثناء وقت التشغيل)."
                    },
                    {
                              "id": "q5",
                              "question": "Consider this code:\n\nclass Engine {\n    void ignite() { System.out.print(\"Vroom \"); }\n}\nclass Vehicle {\n    private Engine engine = new Engine();\n    void start() {\n        engine.ignite();\n        System.out.print(\"Ready \");\n    }\n}\n\nWhat design principle is demonstrated by start() calling engine.ignite()?",
                              "options": [
                                        "Multiple Inheritance",
                                        "Method Delegation",
                                        "Dynamic Method Hiding",
                                        "Covariant Return"
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Forwarding an operation to an internal composed object is called Method Delegation. The container Vehicle delegates the ignition task to its composed Engine component. (تفويض تنفيذ المهمة لكائن داخلي مركب يُعرف بنمط التفويض Method Delegation)."
                    },
                    {
                              "id": "q6",
                              "question": "Which of the following real-world relationships is a legitimate 'Is-A' relationship?\n(أي من العلاقات الواقعية التالية يمثل علاقة 'هو نوع من' Is-A صحيحة ومشروعة؟)",
                              "options": [
                                        "A Car and an Engine",
                                        "A SavingsAccount and a BankAccount",
                                        "A House and a Room",
                                        "A University and a Professor"
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! A SavingsAccount is genuinely a specialized type of BankAccount that satisfies the Liskov Substitution Principle (wherever a BankAccount is expected, a SavingsAccount can seamlessly substitute). The others are Has-A relationships. (حساب التوفير هو نوع مخصص من الحساب البنكي ويحقق مبدأ الاستبدال تماماً، بينما الخيارات الأخرى علاقات احتواء Has-A)."
                    },
                    {
                              "id": "q7",
                              "question": "What is 'Method Leakage' when inheritance is improperly used purely for code reuse?\n(ما هو تسريب الدوال Method Leakage عند إساءة استخدام الوراثة لمجرد إعادة استخدام الكود؟)",
                              "options": [
                                        "Methods leaking sensitive memory addresses to the console.",
                                        "The subclass exposing public methods inherited from the superclass that make no semantic sense for the subclass and violate its domain model.",
                                        "Garbage collection failing to clean method bytecode.",
                                        "A method returning void when it should return int."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! When a class extends another solely to reuse helper methods, all public methods of the superclass become part of the subclass's public API. This 'leaks' irrelevant or invalid operations to external callers. (وراثة فئة لمجرد الاستفادة من دوالها تجبر الفئة الابن على كشف كافة دوال الأب العامة للعملاء، حتى لو كانت تلك الدوال غير منطقية وتنافي طبيعة الابن)."
                    },
                    {
                              "id": "q8",
                              "question": "How does Composition bypass Java's single class inheritance limitation (classes cannot extend more than one class)?\n(كيف يتغلب أسلوب التركيب Composition على قيد الوراثة الأحادية للفئات في جافا؟)",
                              "options": [
                                        "By allowing a class to declare multiple 'extends' clauses.",
                                        "By allowing a class to hold references to multiple independent components simultaneously (e.g. Logger, Validator, Notifier) as instance fields.",
                                        "By converting all classes to native C++ libraries.",
                                        "By forcing all fields to be static."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! While a Java class can only extend one superclass, it can compose as many components as needed (holding a Logger, an AuditService, a DataStore, etc.), assembling rich multi-faceted functionality without inheritance constraints. (رغم أن الفئة في جافا لا ترث إلا فئة واحدة، إلا أنها تستطيع احتواء أي عدد من الكائنات المركبة معاً كحقول خاصة لتحقيق وظائف متعددة بمرونة تامة)."
                    },
                    {
                              "id": "q9",
                              "question": "Given a class hierarchy where Penguin extends Bird, but Bird declares a public void fly() method that Penguin cannot execute, what is the best design refactoring?\n(عندما ترث Penguin فئة Bird التي تحوي دالة fly() لا يستطيع البطريق تنفيذها، ما هو أفضل حل تصحيحي؟)",
                              "options": [
                                        "Make Penguin's fly() method throw an UnsupportedOperationException at runtime.",
                                        "Replace inheritance of flying behavior with Composition: create a Flyable capability interface or compose a FlightBehavior component only in birds that can actually fly.",
                                        "Make fly() private in Bird.",
                                        "Make Penguin a subclass of Object only."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Forcing Penguin to inherit fly() and throwing runtime exceptions violates the Liskov Substitution Principle. Extracting a Flyable capability (or composing a FlightBehavior component) models the domain cleanly without false assumptions. (إجبار البطريق على وراثة الطيران ورمي استثناء يكسر مبدأ لسكوف؛ والأصح فصل سلوك الطيران كواجهة Flyable أو مكون مركب يُمنح فقط للطيور القادرة على الطيران)."
                    },
                    {
                              "id": "q10",
                              "question": "What is the key advantage of changing behavior dynamically at runtime with Has-A compared to Is-A?\n(ما هي الميزة الجوهرية لتغيير السلوك ديناميكياً أثناء وقت التشغيل باستخدام Has-A مقارنة بـ Is-A؟)",
                              "options": [
                                        "Is-A binds behavior statically at compile time; Has-A allows swapping internal strategy objects dynamically at runtime via setters.",
                                        "Has-A makes the JVM bypass bytecode verification.",
                                        "Is-A requires constant internet connectivity.",
                                        "Has-A eliminates the need for unit testing."
                              ],
                              "correctIndex": 0,
                              "explanation": "Correct! In class inheritance (Is-A), the object's behavior is fixed at compile time by its class definition. With composition (Has-A), an object can switch its internal components at runtime (e.g. order.setDiscountStrategy(new BlackFridayDiscount())). (الوراثة تثبت السلوك وقت التصريف ولا يمكن تغييره لكائن حي، بينما التركيب يسمح بتبديل كائن الاستراتيجية الداخلي في أي لحظة أثناء التشغيل عبر دوال التعيين)."
                    },
                    {
                              "id": "q11",
                              "question": "Consider this code:\n\nclass Printer {\n    void print(String s) { System.out.print(\"P:\" + s + \" \"); }\n}\nclass Copier {\n    private Printer p;\n    Copier(Printer p) { this.p = p; }\n    void copy(String doc) {\n        p.print(doc);\n        System.out.print(\"Copied \");\n    }\n}\n\nWhat is printed by: new Copier(new Printer()).copy(\"Test\");?",
                              "options": [
                                        "Copied P:Test",
                                        "P:Test Copied ",
                                        "Test Copied",
                                        "Compile-time error: Copier must extend Printer"
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! The Copier holds an aggregated Printer instance. Calling copy(\"Test\") delegates to p.print(\"Test\") (printing 'P:Test ') followed by 'Copied ', giving 'P:Test Copied '. (يحتوي Copier على مرجع Printer، وعند استدعاء copy يفوض الطباعة لـ p.print فتطبع P:Test ثم تطبع Copied فيكون الناتج P:Test Copied )."
                    },
                    {
                              "id": "q12",
                              "question": "Why is an e-commerce order discount engine better designed with Has-A (Order has-a DiscountPolicy) rather than Is-A (VipOrder, ChristmasOrder extends Order)?\n(لماذا يُصمم محرك خصومات الطلبات بـ Has-A أفضل من وراثة فئات مثل VipOrder و ChristmasOrder؟)",
                              "options": [
                                        "Because class inheritance would cause a combinatorial explosion of subclasses (e.g. VipChristmasExpressOrder) and prevents applying multiple discounts simultaneously.",
                                        "Because discounts can only be calculated using static methods.",
                                        "Because abstract classes do not support arithmetic operations.",
                                        "Because Java does not allow orders to be stored in collections."
                              ],
                              "correctIndex": 0,
                              "explanation": "Correct! Using inheritance for every variation causes class explosion (e.g. WholesaleTaxExemptHolidayOrder). Composing a list of DiscountPolicy components inside Order allows arbitrary combinations and dynamic application without code duplication. (استخدام الوراثة مع كل ميزة يؤدي لانفجار في عدد الفئات الفرعية لتغطية كافة الاحتمالات، بينما تركيب قائمة سياسات خصم يتيح الدمج المرن دون تعقيد)."
                    },
                    {
                              "id": "q13",
                              "question": "What does the Liskov Substitution Principle (LSP) state regarding 'Is-A' relationships?\n(ما الذي ينص عليه مبدأ لسكوف للاستبدال Liskov Substitution Principle بشأن علاقات Is-A؟)",
                              "options": [
                                        "Subclasses must have fewer methods than superclasses.",
                                        "Objects of a superclass should be replaceable with objects of its subclasses without altering any of the desirable properties of the program.",
                                        "Subclasses cannot override concrete methods.",
                                        "All subclasses must be marked final."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! LSP states that if S is a subtype of T, objects of type T may be replaced with objects of type S without altering program correctness. If an inherited method breaks expected contracts, Is-A is invalid. (ينص المبدأ على أن أي برنامج يستخدم فئة الأب يجب أن يعمل بنفس الصحة والموثوقية إذا استبدلنا الأب بأي فئة فرعية موروثة منه دون أي خلل بالسلوك المتوقع)."
                    },
                    {
                              "id": "q14",
                              "question": "Which pattern correctly converts tightly coupled implementation inheritance into flexible composition?\n(أي الأنماط يحول الوراثة الصلبة إلى تركيب مرن بشكل صحيح؟)",
                              "options": [
                                        "Replace 'class Manager extends Employee' with 'class Manager { private Employee employee; }' when a Manager simply delegates some duties without being an Employee.",
                                        "Remove all private fields from the superclass.",
                                        "Declare all methods in both classes as native.",
                                        "Make the superclass extend the subclass."
                              ],
                              "correctIndex": 0,
                              "explanation": "Correct! Replacing an improper 'extends' with a private component reference and delegating specific method calls converts rigid inheritance into clean, decoupled composition. (استبدال الوراثة بمرجع خاص للفئة وتفويض الدوال المطلوبة يحول العلاقة من وراثة مقيدة إلى تركيب مرن ومنفصل)."
                    },
                    {
                              "id": "q15",
                              "question": "What is printed by running the following program?\n\nclass SoundSystem {\n    int volume = 5;\n    void boost() { volume += 5; }\n}\nclass HomeTheater {\n    SoundSystem audio = new SoundSystem();\n    void crankUp() {\n        audio.boost();\n        System.out.println(audio.volume);\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        HomeTheater ht = new HomeTheater();\n        ht.crankUp();\n    }\n}",
                              "options": [
                                        "5",
                                        "10",
                                        "0",
                                        "Compile-time error"
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! HomeTheater composes an internal SoundSystem object. Calling crankUp() invokes audio.boost() which increments volume from 5 to 10, then prints 10. (يمتلك HomeTheater كائن SoundSystem داخلي، واستدعاء crankUp يزيد مستوى الصوت بمقدار 5 ويطبع 10 بنجاح)."
                    }
          ]
        }
      ]
    }
  ];
})();
