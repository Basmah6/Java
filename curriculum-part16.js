/**
 * Java Curriculum Module - Part 16
 * Topics:
 * 31. toString()
 * 32. equals()
 * 
 * 100% Offline, Pure JavaScript. Complete educational content with full bilingual (English & Arabic) explanations.
 */

(function () {
  'use strict';

  window.JAVA_TOPICS_PART16 = [
    /* ==========================================================================
       TOPIC 31: toString()
       ========================================================================== */
    {
      id: "to-string-method",
      title: "31. toString()",
      description: "Mastering Java's toString() Method: Default Object implementation, string concatenation triggers, debugging enhancement, JSON-style formatting, StringBuilder efficiency, and record integration.",
      lessons: [
        {
          id: "to-string-mastery",
          title: "Complete Guide to toString()",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "Understanding toString() in Java (فهم دالة toString في جافا)"
            },
            {
              type: "paragraph",
              text: "The 'toString()' method is defined in java.lang.Object and inherited by every single class in Java. Its purpose is to return a concise, informative, and human-readable textual representation of an object. By default, Object.toString() returns 'getClass().getName() + '@' + Integer.toHexString(hashCode())', which reveals only memory identity rather than field values."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "دالة 'toString()' معرفة في الفئة الأساسية java.lang.Object وترثها كل فئات جافا بلا استثناء. الهدف الأساسي منها هو تقديم تمثيل نصي مفيد ومقروء للمطور يعبر عن محتوى الكائن وحالته. افتراضياً، تعيد دالة الأب اسم الفئة متبوعاً بعلامة @ ورقم الـ HashCode السداسي عشري للذاكرة، وهو ما لا يقدم أي معلومات مفيدة عن حقول الكائن وقيمه."
            },
            {
              type: "paragraph",
              text: "Automatic Invocation: Java automatically invokes toString() whenever an object is passed to System.out.println(obj), concatenated with the '+' operator ('Hello ' + obj), used in String.valueOf(obj), or rendered by logging frameworks."
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
              text: "Example 1: Default vs Overridden toString() (المثال 1: دالة toString الافتراضية مقابل المتجاوزة)"
            },
            {
              type: "paragraph",
              text: "Comparing the cryptic default Object output with a customized, clean output."
            },
            {
              type: "code",
              language: "java",
              filename: "DefaultVsCustomToString.java",
              code: `public class DefaultVsCustomToString {
    static class RawUser {
        String name = "Zaid";
        int age = 28;
    }

    static class CustomUser {
        String name = "Zaid";
        int age = 28;

        @Override
        public String toString() {
            return "CustomUser{name='" + name + "', age=" + age + "}";
        }
    }

    public static void main(String[] args) {
        RawUser raw = new RawUser();
        CustomUser custom = new CustomUser();

        System.out.println("Default Object.toString(): " + raw);
        System.out.println("Overridden toString():      " + custom);
    }
}`,
              output: `Default Object.toString(): DefaultVsCustomToString$RawUser@2c7b7f74
Overridden toString():      CustomUser{name='Zaid', age=28}`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "System.out.println automatically calls toString(). Overriding it gives instant visual clarity into the object's internal state."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "تستدعي الدالة println دالة toString تلقائياً؛ تجاوزها يمنح المطور رؤية واضحة لحقول الكائن بدلاً من كود الذاكرة الغامض."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: String Concatenation and Automatic Triggers (المثال 2: محفزات الاستدعاء التلقائي ودمج النصوص)"
            },
            {
              type: "paragraph",
              text: "Exploring how Java converts objects to strings behind the scenes."
            },
            {
              type: "code",
              language: "java",
              filename: "ConcatenationTriggersDemo.java",
              code: `public class ConcatenationTriggersDemo {
    static class City {
        String name;
        int population;

        City(String name, int population) {
            this.name = name;
            this.population = population;
        }

        @Override
        public String toString() {
            return name + " (Pop: " + population + ")";
        }
    }

    public static void main(String[] args) {
        City riyadh = new City("Riyadh", 7500000);

        // 1. String Concatenation (+)
        String msg1 = "Capital city: " + riyadh;

        // 2. String.valueOf()
        String msg2 = String.valueOf(riyadh);

        // 3. String.format() / printf
        String msg3 = String.format("Destination: %s", riyadh);

        System.out.println(msg1);
        System.out.println("Via valueOf: " + msg2);
        System.out.println(msg3);
    }
}`,
              output: `Capital city: Riyadh (Pop: 7500000)
Via valueOf: Riyadh (Pop: 7500000)
Destination: Riyadh (Pop: 7500000)`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "Every string-formatting utility and concatenation operator evaluates the object's toString() method automatically."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "جميع دوال التنسيق النصي ومعامل الدمج + تستدعي دالة toString للكائن في الكواليس لإنتاج نص منسق."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Safe Null Handling with Objects.toString() (المثال 3: التعامل الآمن مع الكائنات الفارغة null)"
            },
            {
              type: "paragraph",
              text: "Calling obj.toString() directly on null throws NullPointerException; use safe utility methods instead."
            },
            {
              type: "code",
              language: "java",
              filename: "SafeNullToStringDemo.java",
              code: `import java.util.Objects;

public class SafeNullToStringDemo {
    public static void main(String[] args) {
        String emptyName = null;

        // Direct call throws NullPointerException:
        // emptyName.toString(); // EXCEPTION!

        // Safe conversion using String.valueOf
        String safe1 = String.valueOf(emptyName);
        System.out.println("String.valueOf(null): " + safe1);

        // Safe conversion with fallback using Objects.toString
        String safe2 = Objects.toString(emptyName, "N/A [Not Available]");
        System.out.println("Objects.toString with default: " + safe2);
    }
}`,
              output: `String.valueOf(null): null
Objects.toString with default: N/A [Not Available]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "Objects.toString(obj, defaultValue) provides null-safe string conversion, guarding against NullPointerException."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "دالة Objects.toString تحمي الكود من NullPointerException وتتيح وضع قيمة نصية بديلة عند كون المتغير فارغاً."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: JSON-Formatted toString() for Web APIs (المثال 4: تنسيق بنمط JSON لتطبيقات الويب)"
            },
            {
              type: "paragraph",
              text: "Structuring toString() output as valid JSON for easy log parsing and debugging."
            },
            {
              type: "code",
              language: "java",
              filename: "JsonToStringDemo.java",
              code: `public class JsonToStringDemo {
    static class Product {
        int id;
        String title;
        double price;
        boolean inStock;

        Product(int id, String title, double price, boolean inStock) {
            this.id = id;
            this.title = title;
            this.price = price;
            this.inStock = inStock;
        }

        @Override
        public String toString() {
            return String.format(
                "{\"id\": %d, \"title\": \"%s\", \"price\": %.2f, \"inStock\": %b}",
                id, title, price, inStock
            );
        }
    }

    public static void main(String[] args) {
        Product laptop = new Product(101, "MacBook Pro M3", 1999.99, true);
        System.out.println(laptop);
    }
}`,
              output: `{"id": 101, "title": "MacBook Pro M3", "price": 1999.99, "inStock": true}`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "Formatting toString() as structured JSON makes application logs readable by log analysis engines like Splunk or Elasticsearch."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "تنسيق مخرجات toString كـ JSON يجعل سجلات النظام قابلة للقراءة والتحليل المباشر بواسطة أدوات تحليل السجلات الحديثة."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: High-Performance toString() using StringBuilder (المثال 5: تحسين الأداء باستخدام StringBuilder)"
            },
            {
              type: "paragraph",
              text: "Building strings with multiple fields efficiently without creating unnecessary intermediate String objects."
            },
            {
              type: "code",
              language: "java",
              filename: "StringBuilderToStringDemo.java",
              code: `public class StringBuilderToStringDemo {
    static class ServerConfig {
        String host;
        int port;
        int maxConnections;
        int timeoutMs;
        boolean sslEnabled;

        ServerConfig(String h, int p, int max, int to, boolean ssl) {
            this.host = h; this.port = p; this.maxConnections = max;
            this.timeoutMs = to; this.sslEnabled = ssl;
        }

        @Override
        public String toString() {
            return new StringBuilder(128)
                .append("ServerConfig[host=").append(host)
                .append(", port=").append(port)
                .append(", maxConnections=").append(maxConnections)
                .append(", timeoutMs=").append(timeoutMs)
                .append(", sslEnabled=").append(sslEnabled)
                .append(']')
                .toString();
        }
    }

    public static void main(String[] args) {
        ServerConfig cfg = new ServerConfig("api.example.com", 443, 5000, 30000, true);
        System.out.println(cfg);
    }
}`,
              output: `ServerConfig[host=api.example.com, port=443, maxConnections=5000, timeoutMs=30000, sslEnabled=true]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "Initializing StringBuilder with an estimated capacity avoids heap re-allocations when assembling large object summaries."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "استخدام StringBuilder مع تحديد حجم مسبق يمنع إهدار الذاكرة وتوليد نصوص مؤقتة غير لازمة عند دمج عدة حقول."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Array Fields Handling with Arrays.toString() (المثال 6: طباعة المصفوفات بـ Arrays.toString)"
            },
            {
              type: "paragraph",
              text: "Calling .toString() directly on an array prints memory addresses; use java.util.Arrays helper."
            },
            {
              type: "code",
              language: "java",
              filename: "ArrayToStringDemo.java",
              code: `import java.util.Arrays;

public class ArrayToStringDemo {
    static class StudentGrades {
        String studentName;
        int[] scores;

        StudentGrades(String name, int[] scores) {
            this.studentName = name;
            this.scores = scores;
        }

        @Override
        public String toString() {
            // Arrays.toString converts array contents to readable text
            return "StudentGrades{name='" + studentName + "', scores=" + Arrays.toString(scores) + "}";
        }
    }

    public static void main(String[] args) {
        int[] mathScores = {95, 88, 92, 100};
        StudentGrades student = new StudentGrades("Sara", mathScores);

        System.out.println("Raw array toString(): " + mathScores);
        System.out.println("Student Object:       " + student);
    }
}`,
              output: `Raw array toString(): [I@...
Student Object:       StudentGrades{name='Sara', scores=[95, 88, 92, 100]}`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "Arrays don't override toString(); calling toString() on an array yields '[I@hash'. Always use Arrays.toString(array)."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "المصفوفات لا تتجاوز دالة toString وتطبع رموزاً غامضة؛ لذا يجب دائماً استخدام Arrays.toString() لطباعة محتوياتها."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Inheritance and super.toString() (المثال 7: وراثة الفئات واستدعاء super.toString)"
            },
            {
              type: "paragraph",
              text: "Reusing superclass string representations in derived subclasses."
            },
            {
              type: "code",
              language: "java",
              filename: "SuperToStringDemo.java",
              code: `public class SuperToStringDemo {
    static class Vehicle {
        String make;
        String model;

        Vehicle(String make, String model) {
            this.make = make;
            this.model = model;
        }

        @Override
        public String toString() {
            return "make='" + make + "', model='" + model + "'";
        }
    }

    static class ElectricCar extends Vehicle {
        int batteryKWh;

        ElectricCar(String make, String model, int battery) {
            super(make, model);
            this.batteryKWh = battery;
        }

        @Override
        public String toString() {
            return "ElectricCar{" + super.toString() + ", batteryKWh=" + batteryKWh + "}";
        }
    }

    public static void main(String[] args) {
        ElectricCar tesla = new ElectricCar("Tesla", "Model S Plaid", 100);
        System.out.println(tesla);
    }
}`,
              output: `ElectricCar{make='Tesla', model='Model S Plaid', batteryKWh=100}`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "Invoking super.toString() incorporates parent class fields into subclass representations without code duplication."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "استدعاء super.toString() يدمج حقول فئة الأب داخل نص الفئة الابنة بأناقة ويمنع تكرار الكود."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Preventing Infinite Recursion in Circular References (المثال 8: منع الاستدعاء الذاتي المتكرر StackOverflowError)"
            },
            {
              type: "paragraph",
              text: "Bi-directional relationships cause infinite recursion unless broken in toString()."
            },
            {
              type: "code",
              language: "java",
              filename: "CircularToStringDemo.java",
              code: `public class CircularToStringDemo {
    static class Department {
        String name;
        Manager manager;

        Department(String name) { this.name = name; }

        @Override
        public String toString() {
            // Safe: print manager's name only, not manager.toString()
            return "Department[name=" + name + ", manager=" +
                (manager != null ? manager.name : "none") + "]";
        }
    }

    static class Manager {
        String name;
        Department dept;

        Manager(String name) { this.name = name; }

        @Override
        public String toString() {
            return "Manager[name=" + name + ", dept=" +
                (dept != null ? dept.name : "none") + "]";
        }
    }

    public static void main(String[] args) {
        Department it = new Department("IT Core");
        Manager mgr = new Manager("Kareem");

        // Establish bi-directional link
        it.manager = mgr;
        mgr.dept = it;

        System.out.println(it);
        System.out.println(mgr);
    }
}`,
              output: `Department[name=IT Core, manager=Kareem]
Manager[name=Kareem, dept=IT Core]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "If Department printed manager.toString() and Manager printed dept.toString(), it would trigger infinite mutual calls and crash with StackOverflowError."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "العلاقات التبادلية تؤدي إلى حلقة استدعاء لا نهائية وانهيار البرنامج بـ StackOverflowError إذا قامت كل فئة بطباعة الكائن الآخر بالكامل."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Modern Java Records Automatic toString() (المثال 9: دالة toString التلقائية في سجلات Records)"
            },
            {
              type: "paragraph",
              text: "Java 14+ records automatically generate clean, immutable toString() implementations."
            },
            {
              type: "code",
              language: "java",
              filename: "RecordToStringDemo.java",
              code: `public class RecordToStringDemo {
    // Record components automatically get a canonical toString()
    record CurrencyExchangeRate(String fromCurrency, String toCurrency, double rate) {}

    public static void main(String[] args) {
        CurrencyExchangeRate rate = new CurrencyExchangeRate("USD", "SAR", 3.75);

        // Record generates: CurrencyExchangeRate[fromCurrency=USD, toCurrency=SAR, rate=3.75]
        System.out.println("Record toString output: " + rate);
    }
}`,
              output: `Record toString output: CurrencyExchangeRate[fromCurrency=USD, toCurrency=SAR, rate=3.75]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "Records eliminate boilerplate code by auto-generating complete implementations of toString(), equals(), and hashCode()."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "تولد سجلات جافا الحديثة (Records) دوال toString و equals و hashCode تلقائياً دون الحاجة لكتابة أي كود إضافي."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Masking Sensitive Data in Production (المثال 10: حجب البيانات الحساسة للأمان وامتثال PCI-DSS)"
            },
            {
              type: "paragraph",
              text: "Never print credit cards, passwords, or tokens in clear text inside toString()."
            },
            {
              type: "code",
              language: "java",
              filename: "MaskedSensitiveToStringDemo.java",
              code: `public class MaskedSensitiveToStringDemo {
    static class PaymentCard {
        String cardHolder;
        String rawPan; // 16-digit card number
        String cvv;

        PaymentCard(String holder, String pan, String cvv) {
            this.cardHolder = holder;
            this.rawPan = pan;
            this.cvv = cvv;
        }

        private String maskCardNumber(String pan) {
            if (pan == null || pan.length() < 4) return "****";
            return "****-****-****-" + pan.substring(pan.length() - 4);
        }

        @Override
        public String toString() {
            // Mask PAN and hide CVV completely to comply with security standards
            return "PaymentCard[holder='" + cardHolder + "', pan='" +
                   maskCardNumber(rawPan) + "', cvv=***]";
        }
    }

    public static void main(String[] args) {
        PaymentCard card = new PaymentCard("Fatima Al-Harbi", "4111222233334444", "882");
        System.out.println("Safe log output: " + card);
    }
}`,
              output: `Safe log output: PaymentCard[holder='Fatima Al-Harbi', pan='****-****-****-4444', cvv=***]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "Masking sensitive fields inside toString() prevents confidential user credentials from leaking into application log files."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "حجب أرقام البطاقات وكلمات المرور داخل toString يحمي البيانات الحساسة من التسرب إلى ملفات سجلات النظام الخادمة."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Enterprise Cloud Telemetry Event Formatter (المثال 11: منسق سجلات أحداث القياس السحابية المؤسسية)"
            },
            {
              type: "paragraph",
              text: "Advanced: Real-time telemetry monitoring event with ISO timestamp and latency tracking."
            },
            {
              type: "code",
              language: "java",
              filename: "TelemetryEventMaster.java",
              code: `import java.time.Instant;

public class TelemetryEventMaster {
    static class CloudTelemetryEvent {
        private final String eventId;
        private final String serviceName;
        private final int statusCode;
        private final long latencyMs;
        private final Instant timestamp;

        CloudTelemetryEvent(String id, String service, int status, long latency) {
            this.eventId = id;
            this.serviceName = service;
            this.statusCode = status;
            this.latencyMs = latency;
            this.timestamp = Instant.now();
        }

        @Override
        public String toString() {
            return String.format(
                "[%s] EVENT id=%s service=%s status=%d latency=%dms",
                timestamp, eventId, serviceName, statusCode, latencyMs
            );
        }
    }

    public static void main(String[] args) {
        CloudTelemetryEvent ev1 = new CloudTelemetryEvent("EVT-9001", "AuthService", 200, 42);
        CloudTelemetryEvent ev2 = new CloudTelemetryEvent("EVT-9002", "PaymentGateway", 504, 3050);

        System.out.println(ev1);
        System.out.println(ev2);
    }
}`,
              output: `[2026-09-05T22:52:20Z] EVENT id=EVT-9001 service=AuthService status=200 latency=42ms
[2026-09-05T22:52:20Z] EVENT id=EVT-9002 service=PaymentGateway status=504 latency=3050ms`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "Production logging frameworks rely on clean toString() outputs to index cloud events, track latencies, and flag HTTP errors."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "تعتمد أنظمة السجلات السحابية على دالة toString لتسجيل الأحداث وقياس زمن الاستجابة ورصد أخطاء الخوادم بدقة."
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
                "Mistake 1: Calling obj.toString() when obj is null, triggering NullPointerException. Use String.valueOf(obj) or Objects.toString(obj, defaultVal) instead.",
                "خطأ 1: استدعاء obj.toString() مباشرة عندما يكون الكائن null مما يسبب NullPointerException؛ استخدم String.valueOf بدلاً منها.",
                "Mistake 2: Printing arrays directly in toString() like 'scores.toString()', producing unreadable internal hashes like '[I@...'. Use Arrays.toString(scores).",
                "خطأ 2: طباعة مصفوفة الحقول عبر دالتها المباشرة؛ يجب استخدام Arrays.toString لعرض عناصرها بوضوح.",
                "Mistake 3: Creating circular references between two objects that both print each other, causing a fatal StackOverflowError."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Bank Account Audit Formatter (التحدي العملي: منسق تدقيق الحسابات البنكية)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Create a class 'BankAccount' with: 1) accountNumber (String); 2) balance (double); 3) active (boolean); 4) Override toString() to return: 'BankAccount[acc=***-1234, balance=$5000.00, active=true]' where only the last 4 digits of the account number are displayed and balance is formatted to 2 decimals; 5) In main(), instantiate an account with 'SA-994821234', 5000.0, true, and print it."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: أنشئ فئة BankAccount تحتوي على: 1) accountNumber؛ 2) balance؛ 3) active؛ 4) تجاوز دالة toString لتعيد النص: 'BankAccount[acc=***-1234, balance=$5000.00, active=true]' بحيث تظهر آخر 4 خانات فقط من رقم الحساب وتنسيق الرصيد برقمين عشريين؛ 5) في main أنشئ كائناً بالحساب 'SA-994821234' ورصيد 5000.0 واطبعه."
            },
            {
              type: "code",
              language: "java",
              filename: "BankAccountChallenge.java",
              code: `public class BankAccountChallenge {
    static class BankAccount {
        private final String accountNumber;
        private final double balance;
        private final boolean active;

        BankAccount(String acc, double bal, boolean active) {
            this.accountNumber = acc;
            this.balance = bal;
            this.active = active;
        }

        private String maskAccount(String acc) {
            if (acc == null || acc.length() < 4) return "****";
            return "***-" + acc.substring(acc.length() - 4);
        }

        @Override
        public String toString() {
            return String.format(
                "BankAccount[acc=%s, balance=$%.2f, active=%b]",
                maskAccount(accountNumber), balance, active
            );
        }
    }

    public static void main(String[] args) {
        BankAccount acc = new BankAccount("SA-994821234", 5000.0, true);
        System.out.println(acc);
    }
}`,
              output: `BankAccount[acc=***-1234, balance=$5000.00, active=true]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "The solution extracts the last 4 characters using substring, masks the prefix, formats the double balance with '%.2f', and overrides toString cleanly."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "قام الحل باستخراج آخر 4 خانات باستخدام substring وحجب الباقي وتنسيق الرصيد العشري بدقة وأناقة."
            }
          ],
          quiz: [
                    {
                              "id": "q1",
                              "question": "What is the exact method signature of toString() declared in java.lang.Object?\n(ما هي البصمة الدقيقة لدالة toString المصرح بها في فئة java.lang.Object؟)",
                              "options": [
                                        "public void toString()",
                                        "public String toString()",
                                        "protected String toString()",
                                        "public static String toString(Object o)"
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! The method is declared in java.lang.Object as 'public String toString()'. Any overriding method must also be declared public and return a String. (البصمة الرسمية في فئة Object هي public String toString()، ويجب على أي فئة تتجاوزها الحفاظ على هذه البصمة)."
                    },
                    {
                              "id": "q2",
                              "question": "What does the default implementation of toString() in java.lang.Object return?\n(ما الذي يعيده التطبيق الافتراضي لدالة toString في فئة java.lang.Object؟)",
                              "options": [
                                        "A JSON representation of the object's fields.",
                                        "The class name followed by '@' and the unsigned hexadecimal representation of the object's hash code (e.g. Employee@15db9742).",
                                        "The memory pointer address formatted as an integer.",
                                        "A null reference."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! By default, Object.toString() returns getClass().getName() + '@' + Integer.toHexString(hashCode()). (يعيد التطبيق الافتراضي اسم الفئة متبوعاً بـ @ ثم كود التجزئة بنظام Hexadecimal مثل Employee@15db9742)."
                    },
                    {
                              "id": "q3",
                              "question": "Which of the following operations automatically triggers an implicit invocation of an object's toString() method?\n(أي من العمليات التالية يؤدي إلى استدعاء دالة toString للكائن تلقائياً بشكل ضمني؟)",
                              "options": [
                                        "String concatenation with the '+' operator (e.g. \"User: \" + user)",
                                        "Passing the object to System.out.println(user)",
                                        "Appending the object to a StringBuilder (e.g. sb.append(user))",
                                        "All of the above"
                              ],
                              "correctIndex": 3,
                              "explanation": "Correct! All listed operations implicitly call String.valueOf(obj), which internally delegates to obj.toString() if the reference is non-null. (كافة العمليات المذكورة تستدعي دالة toString تلقائياً عبر String.valueOf لتحويل الكائن إلى نص)."
                    },
                    {
                              "id": "q4",
                              "question": "Why is Objects.toString(user, \"N/A\") preferred over directly calling user.toString()?\n(لماذا يُفضل استخدام Objects.toString(user, 'N/A') على استدعاء user.toString() مباشرة؟)",
                              "options": [
                                        "Because Objects.toString() runs on a background thread.",
                                        "Because it is null-safe: if 'user' is null, it gracefully returns the default fallback (\"N/A\") instead of throwing a NullPointerException.",
                                        "Because user.toString() is deprecated.",
                                        "Because it formats strings into XML."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! If 'user' is null, user.toString() immediately crashes with a NullPointerException. Objects.toString(user, defaultVal) guards against null and returns the fallback safely. (دالة Objects.toString آمنة ضد القيم الفارغة null؛ فإذا كان الكائن null تعيد القيمة البديلة بأمان دون رمي استثناء NullPointerException)."
                    },
                    {
                              "id": "q5",
                              "question": "What happens if a class prints an internal array field using array.toString() inside its toString() method?\n(ماذا يحدث إذا قامت فئة بطباعة مصفوفة داخلية عبر array.toString() داخل دالة toString؟)",
                              "options": [
                                        "It prints the formatted contents of the array (e.g. [1, 2, 3]).",
                                        "It prints the obscure default array type code and hash code (e.g. [I@1b6d3586) rather than the readable elements; Arrays.toString(array) should be used instead.",
                                        "A compile-time error occurs.",
                                        "The array elements are printed in reverse order."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Java arrays do not override toString(); calling array.toString() outputs the raw type indicator and hashcode (e.g. [I@...). Developers must use Arrays.toString(arr) or Arrays.deepToString(arr) for multidimensional arrays. (المصفوفات لا تتجاوز دالة toString؛ واستدعاء array.toString يطبع رمزاً غير مفهوم [I@...، والصحيح استخدام Arrays.toString(arr) لعرض محتويات العناصر)."
                    },
                    {
                              "id": "q6",
                              "question": "How can a subclass cleanly include properties formatted by its superclass inside its own toString() method?\n(كيف يمكن للفئة الفرعية تضمين الخصائص المنسقة من فئة الأب داخل دالة toString الخاصة بها؟)",
                              "options": [
                                        "By declaring the subclass method as static.",
                                        "By invoking super.toString() within its string formatting logic.",
                                        "By copying the superclass source code into the subclass.",
                                        "By casting 'this' to Object."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Calling super.toString() allows a subclass to reuse and incorporate the superclass's state representation cleanly: return \"Manager{\" + super.toString() + \", dept=\" + dept + \"}\";. (استدعاء super.toString يسمح للفئة الفرعية بدمج وصف فئة الأب واستخدامه مباشرة في نصها الخاص دون تكرار الكود)."
                    },
                    {
                              "id": "q7",
                              "question": "What critical runtime error occurs if two bidirectional entities reference each other in their toString() implementations (e.g. Employee has Department, and Department has Employee)?\n(ما هو الخطأ الحرج الذي يقع عند وقت التشغيل إذا أشار كائنان متبادلان لبعضهما داخل دالة toString؟)",
                              "options": [
                                        "OutOfMemoryError on heap space",
                                        "java.lang.StackOverflowError due to infinite mutual recursive calls between their toString() methods",
                                        "NullPointerException",
                                        "ClassCastException"
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Mutual references in toString() create an infinite recursive loop: Employee.toString() calls Department.toString(), which calls Employee.toString(), quickly exhausting the call stack and throwing StackOverflowError. One side must break the cycle by omitting the reciprocal reference. (تؤدي الإشارة المتبادلة إلى حلقة استدعاء ذاتي لانهائية تستهلك ذاكرة المكدس Call Stack سريعاً وترمي استثناء StackOverflowError)."
                    },
                    {
                              "id": "q8",
                              "question": "How do Java Records (introduced in Java 14/16) handle toString()?\n(كيف تتعامل فئات السجلات الحديثة Java Records مع دالة toString؟)",
                              "options": [
                                        "Records return an empty string.",
                                        "The compiler automatically generates a canonical toString() displaying the record name and all component names and values (e.g. Point[x=10, y=20]).",
                                        "Records do not inherit from Object.",
                                        "Records require developers to write toString() manually."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Record classes automatically generate a standard, human-readable toString() containing every declared component: RecordName[field1=val1, field2=val2]. (تولد فئات Record تلقائياً دالة toString قياسية وأنيقة تعرض اسم السجل وكافة الحقول وقيمها دون الحاجة لكتابتها يدوياً)."
                    },
                    {
                              "id": "q9",
                              "question": "Why is high-performance string concatenation (using StringBuilder or modern invokedynamic string concat) recommended when writing complex toString() methods?\n(لماذا يُنصح بتحسين أداء دمج النصوص عند كتابة دالة toString لكائنات معقدة؟)",
                              "options": [
                                        "Because toString() is run exclusively on the GPU.",
                                        "Because toString() is frequently invoked in high-throughput loops, logging, and metrics pipelines; inefficient repeated string allocations create unnecessary GC pressure.",
                                        "Because '+' operator cannot handle more than 3 strings.",
                                        "Because StringBuilder encrypts the output."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! When logging thousands of domain events per second, toString() is on the critical performance path. Efficient formatting minimizes intermediate String allocations and reduces Garbage Collection pauses. (تستدعى toString ملايين المرات في أنظمة التسجيل عالية الأداء؛ والبناء الفعال للنصوص يقلل حجز الذاكرة المؤقتة ويخفف العبء على جامع القمامة GC)."
                    },
                    {
                              "id": "q10",
                              "question": "Why should a User or Account entity's toString() method intentionally MASK or EXCLUDE fields like passwordHash and creditCardNumber?\n(لماذا يجب حجب أو استبعاد كلمات المرور وبطاقات الائتمان من دالة toString في فئات المستخدمين؟)",
                              "options": [
                                        "Because passwords cause syntax errors in JSON.",
                                        "To prevent accidental leakage of sensitive credentials, security tokens, and PII into application log files, monitoring dashboards, and error traces.",
                                        "Because toString() only supports numbers.",
                                        "Because Java security policy forbids passwords in strings."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Logging frameworks routinely log objects via toString(). Including passwords or credit cards in toString() writes unencrypted sensitive data directly to persistent log files, violating security standards (PCI-DSS, GDPR). (أطر التسجيل تطبع الكائنات عبر toString في ملفات السجلات، ووجود كلمات المرور أو أرقام البطاقات يسبب تسريباً أمنياً خطيراً ينتهك معايير الخصوصية والأمان)."
                    },
                    {
                              "id": "q11",
                              "question": "Can an overridden toString() method return null in Java?\n(هل يحق لدالة toString المتجاوزة في جافا إعادة القيمة null؟)",
                              "options": [
                                        "No, returning null causes an immediate compile-time error.",
                                        "Syntactically it compiles, but it is a severe contract violation that can cause downstream NullPointerExceptions in libraries expecting valid String objects.",
                                        "Yes, it is standard practice to return null when fields are empty.",
                                        "Only in abstract classes."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! The compiler permits 'return null;', but it violates the Object contract. Upstream callers and logging tools expect a non-null descriptive String, and returning null can trigger unexpected NullPointerExceptions. (يسمح المصرف تصريفياً بإعادة null لكنه انتهاك خطير لعقد الدالة، مما قد يسبب انهيار المكتبات التي تتوقع نصاً حقيقياً)."
                    },
                    {
                              "id": "q12",
                              "question": "What is printed by executing the following code?\n\nclass Coordinate {\n    int lat, lon;\n    Coordinate(int lat, int lon) { this.lat = lat; this.lon = lon; }\n    @Override\n    public String toString() { return lat + \"N,\" + lon + \"E\"; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Coordinate c = new Coordinate(24, 46);\n        System.out.println(\"Location: \" + c);\n    }\n}",
                              "options": [
                                        "Location: Coordinate@hash",
                                        "Location: 24N,46E",
                                        "Location: null",
                                        "Compile-time error"
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! The '+' concatenation operator invokes c.toString(), which executes the overridden method returning '24N,46E'. Printing produces 'Location: 24N,46E'. (معامل الدمج + يستدعي دالة toString المتجاوزة للكائن c لتعيد 24N,46E وتطبع الجملة كاملة Location: 24N,46E بنجاح)."
                    },
                    {
                              "id": "q13",
                              "question": "In distributed microservices, why do some architectures format entity toString() methods as valid JSON strings?\n(في معمارية الخدمات المصغرة، لماذا تقوم بعض الأنظمة بتنسيق دالة toString كـ JSON صالح؟)",
                              "options": [
                                        "To enable direct parsing by log aggregators (e.g. Elasticsearch, Datadog) for structured searching and querying without separate log parsing rules.",
                                        "Because JSON runs faster on x86 processors.",
                                        "Because Java microservices cannot print plain text.",
                                        "To compress the memory footprint."
                              ],
                              "correctIndex": 0,
                              "explanation": "Correct! Formatting toString() as structured JSON allows log ingest engines (ELK, CloudWatch, Datadog) to index object fields automatically as searchable structured metadata. (تنسيق toString بنمط JSON يتيح لأنظمة تجميع السجلات مثل Elasticsearch فهرسة الحقول والبحث فيها كبيانات هيكلية مباشرة دون الحاجة لقواعد تحليل إضافية)."
                    },
                    {
                              "id": "q14",
                              "question": "What is the result of running this code?\n\nclass Node {\n    String name;\n    Node(String n) { this.name = n; }\n}\npublic class Test {\n    public static void main(String[] args) {\n        Node n = null;\n        System.out.println(String.valueOf(n));\n    }\n}",
                              "options": [
                                        "Throws a runtime NullPointerException",
                                        "Prints the literal string: null",
                                        "Prints an empty line",
                                        "Compile-time error"
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! String.valueOf((Object) null) specifically checks for null and safely returns the literal String \"null\" without throwing a NullPointerException. (دالة String.valueOf تفحص القيمة الفارغة null وتعيد النص 'null' بأمان تام دون رمي أي استثناء)."
                    },
                    {
                              "id": "q15",
                              "question": "What is printed by executing the following program?\n\nimport java.util.Arrays;\n\nclass Base {\n    int id = 100;\n    public String toString() { return \"id=\" + id; }\n}\nclass Extended extends Base {\n    String[] flags = {\"ACTIVE\", \"SECURE\"};\n    public String toString() {\n        return super.toString() + \", flags=\" + Arrays.toString(flags);\n    }\n}\npublic class App {\n    public static void main(String[] args) {\n        System.out.println(new Extended());\n    }\n}",
                              "options": [
                                        "id=100, flags=[ACTIVE, SECURE]",
                                        "id=100, flags=[Ljava.lang.String;@hash",
                                        "flags=[ACTIVE, SECURE]",
                                        "Compile-time error"
                              ],
                              "correctIndex": 0,
                              "explanation": "Correct! Extended.toString() calls super.toString() (returning 'id=100') and appends the array formatted with Arrays.toString() (returning '[ACTIVE, SECURE]'). Output: 'id=100, flags=[ACTIVE, SECURE]'. (تستدعي دالة Extended دالة الأب super فتأخذ id=100 ثم تضيف المصفوفة المنسقة عبر Arrays.toString لتنتج id=100, flags=[ACTIVE, SECURE])."
                    }
          ]
        }
      ]
    },

    /* ==========================================================================
       TOPIC 32: equals()
       ========================================================================== */
    {
      id: "equals-method",
      title: "32. equals()",
      description: "Comprehensive Guide to the equals() Method: Reference equality (==) vs value equality, the 5 contractual axioms (reflexive, symmetric, transitive, consistent, non-null), and robust implementation patterns.",
      lessons: [
        {
          id: "equals-mastery",
          title: "Complete Guide to equals()",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "Understanding equals() in Java (فهم دالة equals للمقارنة المنطقية في جافا)"
            },
            {
              type: "paragraph",
              text: "In Java, the 'equals(Object obj)' method is defined in java.lang.Object to determine whether two objects are 'logically equivalent'. By default, Object.equals(obj) evaluates reference equality ('this == obj'), checking whether both references point to the exact same location on the heap. Classes that encapsulate data (such as String, Integer, or custom domain models) override equals() to compare the actual values of their fields."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "دالة 'equals(Object obj)' في جافا معرفة في الفئة الجذرية java.lang.Object لتحديد ما إذا كان كائنان 'متساويين منطقياً'. افتراضياً، تطبق الفئة الأساسية المساواة المرجعية عبر المعامل '=='، أي تفحص ما إذا كان المتغيران يشيران لنفس المكان تماماً في الذاكرة. الفئات التي تحمل بيانات (مثل String و Integer أو الفئات المخصصة) تتجاوز دالة equals لمقارنة محتوى الحقول الفعلي."
            },
            {
              type: "paragraph",
              text: "The 5 Contractual Axioms of equals(): 1) Reflexive: x.equals(x) must be true; 2) Symmetric: x.equals(y) == y.equals(x); 3) Transitive: if x.equals(y) and y.equals(z), then x.equals(z); 4) Consistent: multiple invocations return the same result unless fields change; 5) Non-nullity: for any non-null x, x.equals(null) must return false."
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
              text: "Example 1: Reference Equality (==) vs Logical Equality (.equals()) (المثال 1: المساواة بالهوية مقابل المساواة بالقيم)"
            },
            {
              type: "paragraph",
              text: "Demonstrating how two distinct objects in heap memory can have identical logical values."
            },
            {
              type: "code",
              language: "java",
              filename: "ReferenceVsLogicalEqualsDemo.java",
              code: `public class ReferenceVsLogicalEqualsDemo {
    public static void main(String[] args) {
        String s1 = new String("Java");
        String s2 = new String("Java");

        // Reference equality: Are they the same memory location?
        System.out.println("s1 == s2:      " + (s1 == s2));

        // Logical equality: Do they contain the same characters?
        System.out.println("s1.equals(s2): " + s1.equals(s2));
    }
}`,
              output: `s1 == s2:      false
s1.equals(s2): true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "'==' compares heap memory addresses (which are different for separate 'new' allocations). '.equals()' compares the characters."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "المعامل == يقارن عناوين الذاكرة وهي مختلفة لكائنين منفصلين، بينما تقارن equals المحتوى النصي الفعلي فتعيد true."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: The Default Object.equals() Behavior (المثال 2: سلوك equals الافتراضي في فئة Object)"
            },
            {
              type: "paragraph",
              text: "Without overriding equals(), custom classes fall back to pointer comparison."
            },
            {
              type: "code",
              language: "java",
              filename: "DefaultEqualsDemo.java",
              code: `public class DefaultEqualsDemo {
    static class Coordinate {
        int x, y;
        Coordinate(int x, int y) { this.x = x; this.y = y; }
    }

    public static void main(String[] args) {
        Coordinate p1 = new Coordinate(10, 20);
        Coordinate p2 = new Coordinate(10, 20);

        // Inherited Object.equals() checks 'p1 == p2'
        System.out.println("Default equals on identical fields: " + p1.equals(p2));
        System.out.println("Comparing to self:                  " + p1.equals(p1));
    }
}`,
              output: `Default equals on identical fields: false
Comparing to self:                  true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "Because Coordinate did not override equals(), p1.equals(p2) returned false despite having identical (x, y) coordinates."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "لأن فئة الإحداثيات لم تتجاوز equals، أعادت الدالة false لكائنين يحملان نفس القيم لأنها قارنت عنوان الذاكرة فقط."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: The Standard Robust 4-Step equals() Pattern (المثال 3: النموذج القياسي المتين لتجاوز equals)"
            },
            {
              type: "paragraph",
              text: "Writing an equals method that strictly satisfies the Java Language Specification."
            },
            {
              type: "code",
              language: "java",
              filename: "RobustEqualsPatternDemo.java",
              code: `import java.util.Objects;

public class RobustEqualsPatternDemo {
    static class Employee {
        private final int id;
        private final String nationalId;

        Employee(int id, String nationalId) {
            this.id = id;
            this.nationalId = nationalId;
        }

        @Override
        public boolean equals(Object obj) {
            // Step 1: Reflexivity check (fast identity path)
            if (this == obj) return true;

            // Step 2: Non-null & Type check using Pattern Matching
            if (!(obj instanceof Employee other)) return false;

            // Step 3: Significant field comparisons
            return this.id == other.id &&
                   Objects.equals(this.nationalId, other.nationalId);
        }
    }

    public static void main(String[] args) {
        Employee e1 = new Employee(1001, "1098234712");
        Employee e2 = new Employee(1001, "1098234712");
        Employee e3 = new Employee(1002, "1098234713");

        System.out.println("e1.equals(e2):   " + e1.equals(e2));
        System.out.println("e1.equals(e3):   " + e1.equals(e3));
        System.out.println("e1.equals(null): " + e1.equals(null));
        System.out.println("e1.equals(\"str\"): " + e1.equals("str"));
    }
}`,
              output: `e1.equals(e2):   true
e1.equals(e3):   false
e1.equals(null): false
e1.equals("str"): false`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "Checking identity first, verifying type with 'instanceof', and using 'Objects.equals()' for nullable references creates a bulletproof equals() method."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "فحص هوية المتغير أولاً، والتحقق من النوع بـ instanceof، ومقارنة النصوص بـ Objects.equals يضمن دقة متناهية وأماناً من الأخطاء."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Floating-Point Comparisons (Double.compare / Float.compare) (المثال 4: مقارنة الأعداد العشرية بدقة)"
            },
            {
              type: "paragraph",
              text: "Do NOT compare float/double fields with '=='; use Double.compare to handle NaN and -0.0 correctly."
            },
            {
              type: "code",
              language: "java",
              filename: "FloatingPointEqualsDemo.java",
              code: `public class FloatingPointEqualsDemo {
    static class ScientificMeasurement {
        double temperature;

        ScientificMeasurement(double temp) { this.temperature = temp; }

        @Override
        public boolean equals(Object obj) {
            if (this == obj) return true;
            if (!(obj instanceof ScientificMeasurement other)) return false;

            // Correct: Double.compare handles Double.NaN == Double.NaN and -0.0 vs +0.0
            return Double.compare(this.temperature, other.temperature) == 0;
        }
    }

    public static void main(String[] args) {
        ScientificMeasurement m1 = new ScientificMeasurement(Double.NaN);
        ScientificMeasurement m2 = new ScientificMeasurement(Double.NaN);

        // In standard Java 'NaN == NaN' is FALSE:
        System.out.println("Primitive NaN == NaN: " + (Double.NaN == Double.NaN));

        // But in object equals, Double.compare considers them equal:
        System.out.println("m1.equals(m2):        " + m1.equals(m2));
    }
}`,
              output: `Primitive NaN == NaN: false
m1.equals(m2):        true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "Double.compare handles special IEEE 754 edge cases (like NaN and signed zero) required for consistent equals() contracts."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "دالة Double.compare تعالج الحالات الخاصة للأعداد العشرية مثل قيم NaN والصفر الموجب والسالب بدقة تتطابق مع معايير جافا."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Array Fields Comparison with Arrays.equals() (المثال 5: مقارنة حقول المصفوفات بـ Arrays.equals)"
            },
            {
              type: "paragraph",
              text: "Comparing array references with '==' or .equals() compares memory addresses; use Arrays.equals."
            },
            {
              type: "code",
              language: "java",
              filename: "ArrayEqualsDemo.java",
              code: `import java.util.Arrays;

public class ArrayEqualsDemo {
    static class SecuritySignature {
        byte[] hash;

        SecuritySignature(byte[] hash) { this.hash = hash; }

        @Override
        public boolean equals(Object obj) {
            if (this == obj) return true;
            if (!(obj instanceof SecuritySignature other)) return false;

            // Correct: Arrays.equals compares array elements in sequence
            return Arrays.equals(this.hash, other.hash);
        }
    }

    public static void main(String[] args) {
        byte[] sig1 = new byte[]{0x1A, 0x2B, 0x3C};
        byte[] sig2 = new byte[]{0x1A, 0x2B, 0x3C};

        SecuritySignature s1 = new SecuritySignature(sig1);
        SecuritySignature s2 = new SecuritySignature(sig2);

        System.out.println("Direct array .equals():  " + sig1.equals(sig2));
        System.out.println("Object equals with Arrays: " + s1.equals(s2));
    }
}`,
              output: `Direct array .equals():  false
Object equals with Arrays: true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "Arrays do not override equals(). Always use java.util.Arrays.equals() to compare primitive or reference array elements."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "المصفوفات لا تتجاوز دالة equals؛ لذا يجب استخدام Arrays.equals لمقارنة قيم العناصر بالترتيب."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Symmetry Trap with Subclasses (instanceof vs getClass()) (المثال 6: فخ التناظر واختيار getClass مقابل instanceof)"
            },
            {
              type: "paragraph",
              text: "When subclasses add new fields, using 'instanceof' can break symmetry; 'getClass()' enforces exact type matching."
            },
            {
              type: "code",
              language: "java",
              filename: "SymmetryTrapDemo.java",
              code: `public class SymmetryTrapDemo {
    static class Point {
        int x, y;
        Point(int x, int y) { this.x = x; this.y = y; }

        @Override
        public boolean equals(Object obj) {
            if (this == obj) return true;
            // Using getClass() guarantees exact type identity
            if (obj == null || this.getClass() != obj.getClass()) return false;
            Point other = (Point) obj;
            return this.x == other.x && this.y == other.y;
        }
    }

    static class ColorPoint extends Point {
        String color;
        ColorPoint(int x, int y, String color) {
            super(x, y);
            this.color = color;
        }
    }

    public static void main(String[] args) {
        Point p = new Point(1, 2);
        ColorPoint cp = new ColorPoint(1, 2, "RED");

        // getClass() ensures symmetry: both return false
        System.out.println("p.equals(cp):  " + p.equals(cp));
        System.out.println("cp.equals(p):  " + cp.equals(p));
    }
}`,
              output: `p.equals(cp):  false
cp.equals(p):  false`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "Using 'getClass() != obj.getClass()' avoids breaking the Symmetry rule when comparing base classes and subclasses that introduce new fields."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "استخدام getClass يضمن مبدأ التناظر التام في المقارنة إذا كانت الفئات الابنة تضيف حقولاً جديدة خاصة بها."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Transitivity Axiom Verification (المثال 7: التحقق من خاصية التعدي Transitivity)"
            },
            {
              type: "paragraph",
              text: "If A equals B and B equals C, then A MUST equal C."
            },
            {
              type: "code",
              language: "java",
              filename: "TransitivityDemo.java",
              code: `import java.util.Objects;

public class TransitivityDemo {
    static class ProductSku {
        String skuCode;
        ProductSku(String code) { this.skuCode = code; }

        @Override
        public boolean equals(Object obj) {
            if (this == obj) return true;
            if (!(obj instanceof ProductSku other)) return false;
            return Objects.equals(this.skuCode, other.skuCode);
        }
    }

    public static void main(String[] args) {
        ProductSku a = new ProductSku("SKU-9900");
        ProductSku b = new ProductSku("SKU-9900");
        ProductSku c = new ProductSku("SKU-9900");

        boolean ab = a.equals(b);
        boolean bc = b.equals(c);
        boolean ac = a.equals(c);

        System.out.println("a.equals(b): " + ab);
        System.out.println("b.equals(c): " + bc);
        System.out.println("a.equals(c): " + ac);
        System.out.println("Transitivity satisfied: " + (ab && bc && ac));
    }
}`,
              output: `a.equals(b): true
b.equals(c): true
a.equals(c): true
Transitivity satisfied: true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "Transitivity is an inviolable rule in Java's equals contract; mathematical equivalence fails if transitivity breaks."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "خاصية التعدي تعني أنه إذا تساوى A مع B وتساوى B مع C فيجب حتماً أن يتساوى A مع C لضمان سلامة المنطق الرياضي."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Case-Insensitive String Equality (المثال 8: المقارنة مع تجاهل حالة الأحرف)"
            },
            {
              type: "paragraph",
              text: "Comparing email addresses or usernames case-insensitively using equalsIgnoreCase."
            },
            {
              type: "code",
              language: "java",
              filename: "CaseInsensitiveEqualsDemo.java",
              code: `public class CaseInsensitiveEqualsDemo {
    static class EmailAddress {
        String address;

        EmailAddress(String addr) { this.address = addr; }

        @Override
        public boolean equals(Object obj) {
            if (this == obj) return true;
            if (!(obj instanceof EmailAddress other)) return false;
            if (this.address == null || other.address == null) return false;

            // Emails are logically identical regardless of case
            return this.address.equalsIgnoreCase(other.address);
        }
    }

    public static void main(String[] args) {
        EmailAddress e1 = new EmailAddress("Dev.User@Domain.COM");
        EmailAddress e2 = new EmailAddress("dev.user@domain.com");

        System.out.println("Case-Insensitive equals: " + e1.equals(e2));
    }
}`,
              output: `Case-Insensitive equals: true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "Custom domain types can customize equality logic (such as case-insensitive comparisons) to match real-world business requirements."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "يمكن تخصيص دالة equals لتلائم متطلبات العمل الواقعية مثل تجاهل حالة الأحرف في البريد الإلكتروني."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Java Records Built-in Component-wise equals() (المثال 9: المساواة التلقائية في سجلات جافا Records)"
            },
            {
              type: "paragraph",
              text: "Records automatically compare all components according to standard equality contracts."
            },
            {
              type: "code",
              language: "java",
              filename: "RecordEqualsDemo.java",
              code: `public class RecordEqualsDemo {
    record GeoPoint(double latitude, double longitude) {}

    public static void main(String[] args) {
        GeoPoint g1 = new GeoPoint(24.7136, 46.6753);
        GeoPoint g2 = new GeoPoint(24.7136, 46.6753);
        GeoPoint g3 = new GeoPoint(21.4858, 39.1925);

        System.out.println("Record g1.equals(g2): " + g1.equals(g2));
        System.out.println("Record g1.equals(g3): " + g1.equals(g3));
    }
}`,
              output: `Record g1.equals(g2): true
Record g1.equals(g3): false`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "Records automatically generate correct equals() methods comparing all record components without writing manual boilerplate."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "تولد سجلات Records دالة equals ذكية تقارن جميع الحقول تلقائياً وبأعلى معايير الأداء."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: The Critical Overloading vs Overriding Trap (المثال 10: خطأ التجاوز مقابل التحميل الزائد Overloading vs Overriding)"
            },
            {
              type: "paragraph",
              text: "FATAL MISTAKE: Declaring 'equals(MyClass obj)' instead of 'equals(Object obj)' DOES NOT override equals()!"
            },
            {
              type: "code",
              language: "java",
              filename: "OverloadingTrapDemo.java",
              code: `public class OverloadingTrapDemo {
    static class BrokenCustomer {
        int id;
        BrokenCustomer(int id) { this.id = id; }

        // WRONG: Overloading instead of Overriding!
        // Notice parameter is BrokenCustomer, NOT Object!
        public boolean equals(BrokenCustomer other) {
            return other != null && this.id == other.id;
        }
    }

    public static void main(String[] args) {
        BrokenCustomer c1 = new BrokenCustomer(42);
        Object c2 = new BrokenCustomer(42); // Polymorphic Object reference

        // Calls Object.equals(Object) because c2 is declared as Object!
        System.out.println("c1.equals(c2): " + c1.equals(c2)); // Prints false!
    }
}`,
              output: `c1.equals(c2): false`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "Always use '@Override public boolean equals(Object obj)'. If the parameter type is not Object, it overloads instead of overrides, breaking polymorphic collections."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "يجب دائماً استخدام @Override مع المعامل (Object obj)؛ تحديد نوع فئتك كمعامل يعتبر Overloading ولا يتجاوز دالة الأب مما يفشل المجموعات البرمجية."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Enterprise Banking IBAN Ledger Entity with Strict Equality (المثال 11: كيان الحسابات البنكية الدولية IBAN مع مقارنة متينة)"
            },
            {
              type: "paragraph",
              text: "Advanced: Financial entity equals() checking country code, bank code, and account checksum."
            },
            {
              type: "code",
              language: "java",
              filename: "IbanLedgerMaster.java",
              code: `import java.util.Objects;

public class IbanLedgerMaster {
    static class BankIbanAccount {
        private final String iban;
        private final String currency;

        BankIbanAccount(String iban, String currency) {
            this.iban = iban != null ? iban.replaceAll("\\s+", "").toUpperCase() : "";
            this.currency = currency != null ? currency.toUpperCase() : "USD";
        }

        @Override
        public boolean equals(Object obj) {
            if (this == obj) return true;
            if (!(obj instanceof BankIbanAccount other)) return false;

            return Objects.equals(this.iban, other.iban) &&
                   Objects.equals(this.currency, other.currency);
        }

        @Override
        public int hashCode() {
            return Objects.hash(iban, currency);
        }
    }

    public static void main(String[] args) {
        BankIbanAccount acc1 = new BankIbanAccount("SA 03 8000 0000 1234 5678", "sar");
        BankIbanAccount acc2 = new BankIbanAccount("SA038000000012345678", "SAR");
        BankIbanAccount acc3 = new BankIbanAccount("SA038000000012345678", "EUR");

        System.out.println("Normalized IBAN match (acc1 vs acc2): " + acc1.equals(acc2));
        System.out.println("Currency mismatch (acc1 vs acc3):      " + acc1.equals(acc3));
    }
}`,
              output: `Normalized IBAN match (acc1 vs acc2): true
Currency mismatch (acc1 vs acc3):      false`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "Normalizing data (stripping whitespace, upper-casing) during construction ensures equals() behaves predictably and robustly in banking ledgers."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "توحيد صياغة البيانات في المنشئ (إزالة المسافات وتكبير الحروف) يضمن دقة استثنائية لدالة equals في الأنظمة المالية والمصرفية."
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
                "Mistake 1: Overloading instead of overriding by writing 'public boolean equals(MyType o)'. Always use '@Override public boolean equals(Object o)'.",
                "خطأ 1: كتابة نوع الفئة كمعامل بدلاً من Object؛ يجب دائماً كتابة (Object o) مع وسم @Override لتجاوز دالة الأب بنجاح.",
                "Mistake 2: Forgetting to override hashCode() when overriding equals(). This breaks HashMaps, HashSets, and Hashtables completely.",
                "خطأ 2: نسيان تجاوز hashCode() عند كتابة equals()، مما يفسد عمل الـ HashSet والـ HashMap بالكامل.",
                "Mistake 3: Using '==' to compare floating-point fields. Always use 'Double.compare(f1, f2) == 0' or 'Float.compare(f1, f2) == 0'."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Vehicle VIN Registry Equality (التحدي العملي: نظام فحص تطابق المركبات برقم الهيكل VIN)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Build a 'RegisteredVehicle' class: 1) Fields: vin (String) and year (int); 2) Implement a robust equals() method where two vehicles are equal if and only if their VIN numbers match (case-insensitively) AND their manufacturing year matches; 3) Guard against nulls and foreign types; 4) In main(), test vehicles with identical and differing VINs and verify symmetry."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: ابنِ فئة RegisteredVehicle: 1) حقول vin و year؛ 2) تطبيق دالة equals قوية تعتبر المركبتين متساويتين إذا وفقط إذا تطابق رقم الهيكل VIN (بغض النظر عن حالة الأحرف) وتطابقت سنة الصنع؛ 3) الحماية من null والأنواع الغريبة؛ 4) في main اختبر مركبات بأرقام هيكل متطابقة ومختلفة وتحقق من خاصية التناظر."
            },
            {
              type: "code",
              language: "java",
              filename: "VehicleVinChallenge.java",
              code: `public class VehicleVinChallenge {
    static class RegisteredVehicle {
        private final String vin;
        private final int year;

        RegisteredVehicle(String vin, int year) {
            this.vin = vin;
            this.year = year;
        }

        @Override
        public boolean equals(Object obj) {
            if (this == obj) return true;
            if (!(obj instanceof RegisteredVehicle other)) return false;

            if (this.year != other.year) return false;
            if (this.vin == null || other.vin == null) return false;

            return this.vin.equalsIgnoreCase(other.vin);
        }
    }

    public static void main(String[] args) {
        RegisteredVehicle v1 = new RegisteredVehicle("1HGCR2F83HA123456", 2024);
        RegisteredVehicle v2 = new RegisteredVehicle("1hgcr2f83ha123456", 2024);
        RegisteredVehicle v3 = new RegisteredVehicle("1HGCR2F83HA999999", 2024);

        System.out.println("v1.equals(v2) [Case-Insensitive]: " + v1.equals(v2));
        System.out.println("v2.equals(v1) [Symmetry Check]:   " + v2.equals(v1));
        System.out.println("v1.equals(v3) [Different VIN]:     " + v1.equals(v3));
    }
}`,
              output: `v1.equals(v2) [Case-Insensitive]: true
v2.equals(v1) [Symmetry Check]:   true
v1.equals(v3) [Different VIN]:     false`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "The solution verifies reflexivity, checks type safely using pattern matching, compares year with primitive '==', and uses equalsIgnoreCase on the VIN."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "فحص الحل هوية الكائن، وتأكد من النوع بـ pattern matching، وقارن سنة الصنع ورقم الهيكل بتجاهل حالة الأحرف مع مراعاة التناظر."
            }
          ],
          quiz: [
                    {
                              "id": "q1",
                              "question": "What is the fundamental difference between the '==' operator and the 'equals()' method for object references in Java?\n(ما هو الفرق الجوهري بين معامل == ودالة equals لمراجع الكائنات في جافا؟)",
                              "options": [
                                        "There is no difference; both compare memory addresses.",
                                        "'==' checks Reference/Identity Equality (whether both references point to the exact same memory address on the heap); 'equals()' checks Logical/Value Equality (whether the internal states of two objects are equivalent).",
                                        "'==' compares content; 'equals()' compares memory addresses.",
                                        "'==' is only used for strings."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! The '==' operator tests reference identity (do they point to the exact same heap memory location?). The 'equals()' method is designed to test logical equivalence of object contents. (معامل == يقارن عنوان الذاكرة فقط، بينما دالة equals مخصصة لمقارنة المحتوى والقيم المنطقية للكائنين)."
                    },
                    {
                              "id": "q2",
                              "question": "Which of the following is NOT one of the 5 mathematical properties mandated for a valid equals() method in the Java specification?\n(أي من الخيارات التالية لا يُعد من الخصائص الرياضية الخمس الإلزامية لدالة equals في مواصفات جافا؟)",
                              "options": [
                                        "Reflexive: for any non-null x, x.equals(x) must return true.",
                                        "Symmetric: for any non-null x and y, x.equals(y) returns true if and only if y.equals(x) returns true.",
                                        "Asynchronous: equals() must execute on a separate CPU thread.",
                                        "Transitive: if x.equals(y) and y.equals(z) return true, then x.equals(z) must return true."
                              ],
                              "correctIndex": 2,
                              "explanation": "Correct! The 5 required properties are Reflexive, Symmetric, Transitive, Consistent, and Non-nullity (x.equals(null) must return false). 'Asynchronous' is completely fabricated and not part of the contract. (الخصائص الخمس هي: الانعكاس، التناظر، التعدي، الثبات، وعدم المساواة مع null؛ والعمل غير المتزامن ليس من خصائصها إطلاقاً)."
                    },
                    {
                              "id": "q3",
                              "question": "What must any valid equals(Object obj) implementation return when 'obj' is null?\n(ما الذي يجب على أي دالة equals صحيحة إعادته عندما يكون الكائن الممرر null؟)",
                              "options": [
                                        "It must throw a NullPointerException.",
                                        "It must return false.",
                                        "It must return true.",
                                        "It must throw an IllegalArgumentException."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! The Non-nullity clause of the equals() contract explicitly dictates that for any non-null reference x, x.equals(null) MUST return false, and MUST NEVER throw a NullPointerException. (شرط عدم العدمية يفرض حتماً أن تعيد دالة equals القيمة false لأي مدخل فارغ null دون رمي NullPointerException أبداً)."
                    },
                    {
                              "id": "q4",
                              "question": "What is the classic 'Symmetry Trap' when implementing equals() in a subclass with additional fields using 'instanceof'?\n(ما هو 'فخ التناظر' الشهير عند تطبيق equals في فئة فرعية تضيف حقولاً جديدة باستخدام instanceof؟)",
                              "options": [
                                        "The JVM running out of stack space.",
                                        "superObj.equals(subObj) evaluates to true (because subObj is an instance of Super), but subObj.equals(superObj) evaluates to false (because superObj is NOT an instance of Sub), breaking the Symmetry axiom.",
                                        "The compiler refusing to build the class.",
                                        "Both objects becoming immutable."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! If Parent uses 'instanceof Parent', it ignores Child's extra field and returns true. But Child checks 'instanceof Child' and returns false for Parent. This breaks Symmetry (x.equals(y) != y.equals(x)). In hierarchies where subclasses add state, getClass() != o.getClass() is often required to preserve symmetry. (إذا فحص الأب بـ instanceof الأب سيعيد true، بينما يفحص الابن حقوله الإضافية ويعيد false للأب؛ فينكسر شرط التناظر x.equals(y) == y.equals(x))."
                    },
                    {
                              "id": "q5",
                              "question": "Why should double and float fields be compared using Double.compare() and Float.compare() instead of '==' inside equals()?\n(لماذا يجب مقارنة حقول الأعداد العشرية بـ Double.compare بدلاً من معامل == داخل دالة equals؟)",
                              "options": [
                                        "Because '==' cannot compile on floating point numbers.",
                                        "Because '==' incorrectly treats +0.0 and -0.0 as equal, and evaluates Double.NaN == Double.NaN to false; Double.compare() correctly handles these edge cases.",
                                        "Because Double.compare() rounds numbers to integers.",
                                        "Because '==' causes hardware interrupts."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Floating-point arithmetic has edge cases: NaN == NaN evaluates to false according to IEEE 754, and +0.0 == -0.0 evaluates to true. Double.compare() adheres to object equality rules by treating NaN as equal to NaN and distinguishing +0.0 from -0.0. (المقارنة بـ == تعيد false عند مقارنة NaN مع نفسه، بينما دالة Double.compare تتعامل بدقة وفق معايير مساواة الكائنات في جافا)."
                    },
                    {
                              "id": "q6",
                              "question": "How should array fields be compared inside an overridden equals() method?\n(كيف يجب مقارنة حقول المصفوفات داخل دالة equals المتجاوزة؟)",
                              "options": [
                                        "Using array1 == array2",
                                        "Using Arrays.equals(array1, array2) for 1D arrays or Arrays.deepEquals() for multidimensional arrays.",
                                        "Using array1.equals(array2)",
                                        "By converting arrays to strings with array1.toString()"
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! array1.equals(array2) only checks if both array references point to the exact same array in memory. To compare the actual element values, Arrays.equals() (or Arrays.deepEquals() for nested arrays) must be used. (استدعاء array1.equals يفحص عناوين الذاكرة فقط، بينما دالة Arrays.equals تفحص تطابق قيم العناصر الفعلية داخل المصفوفتين)."
                    },
                    {
                              "id": "q7",
                              "question": "Why is declaring 'public boolean equals(Person other)' instead of 'public boolean equals(Object other)' a catastrophic beginner mistake?\n(لماذا يعتبر تعريف public boolean equals(Person other) بدلاً من Object خطأً فادحاً وشائعاً؟)",
                              "options": [
                                        "Because Person cannot be compiled.",
                                        "It overloads equals() instead of overriding Object.equals(Object). Collections (like HashSet, HashMap, ArrayList) invoke equals(Object), so the custom method will be silently bypassed.",
                                        "Because it makes the method private.",
                                        "Because it consumes double the memory."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Parameterizing with 'Person' is an OVERLOAD, not an override. Java collections call Object.equals(Object). Because the signatures don't match, collections never call your method, silently reverting to identity comparison! Always use @Override public boolean equals(Object obj). (كتابة نوع الفئة بدلاً من Object يؤدي لتحميل زائد Overload وليس تجاوز Override؛ ومجموعات جافا تستدعي دائماً equals(Object) مما يجعل كودك مهملاً تماماً دون أن تشعر)."
                    },
                    {
                              "id": "q8",
                              "question": "How does the utility method Objects.equals(a, b) safely compare two objects?\n(كيف تقارن دالة الأدوات Objects.equals(a, b) كائنين بأمان؟)",
                              "options": [
                                        "It converts both to integers.",
                                        "It checks if (a == b), and if not, checks if (a != null) before invoking a.equals(b), preventing NullPointerExceptions when either or both are null.",
                                        "It runs an asynchronous thread pool.",
                                        "It only compares their hash codes."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Objects.equals(a, b) returns true if both are the same reference or both are null. If 'a' is non-null, it delegates to a.equals(b). This completely eliminates NullPointerException risks. (دالة Objects.equals تفحص أولاً a == b، ثم تتحقق من أن a ليس فارغاً قبل استدعاء a.equals(b)، مما يمنع حدوث NullPointerException تماماً)."
                    },
                    {
                              "id": "q9",
                              "question": "What is the recommended performance order when comparing multiple fields in equals()?\n(ما هو الترتيب الموصى به لتحسين الأداء عند مقارنة عدة حقول في دالة equals؟)",
                              "options": [
                                        "Compare expensive string/collection fields first, followed by cheap primitive fields.",
                                        "Compare cheap, highly-differentiating primitive fields (e.g. id, status) first, and defer expensive fields (long strings, large arrays, collections) until last.",
                                        "Order does not affect performance in Java.",
                                        "Compare only fields that are null."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Because the '&&' operator short-circuits, comparing fast primitive fields (like integer IDs) that are most likely to differ will reject unequal objects immediately, skipping costly string or collection comparisons. (لأن معامل && يختصر التقييم، فإن فحص الحقول الأولية السريعة أولاً يكتشف عدم التساوي مبكراً ويتفادى المقارنات البطيئة للمصفوفات والنصوص الطويلة)."
                    },
                    {
                              "id": "q10",
                              "question": "What is printed by executing the following code?\n\nString s1 = new String(\"DeepMind\");\nString s2 = new String(\"DeepMind\");\nSystem.out.println((s1 == s2) + \" \" + s1.equals(s2));",
                              "options": [
                                        "true true",
                                        "false true",
                                        "true false",
                                        "false false"
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! 'new String(...)' explicitly forces the allocation of two separate String objects on the heap, so s1 == s2 is false. String overrides equals() to compare character contents, so s1.equals(s2) is true. Output: 'false true'. (إنشاء النصوص عبر new يخصص كائنين مستقلين في الذاكرة فيكون s1 == s2 خطأ false، بينما دالة equals تفحص تشابه الأحرف فتعيد true)."
                    },
                    {
                              "id": "q11",
                              "question": "Consider this class:\n\nclass Key {\n    int id;\n    Key(int id) { this.id = id; }\n    public boolean equals(Key k) {\n        return this.id == k.id;\n    }\n}\n\nKey k1 = new Key(1);\nObject k2 = new Key(1);\nSystem.out.println(k1.equals(k2));\n\nWhat is printed and why?",
                              "options": [
                                        "true, because both have id = 1.",
                                        "false, because k1.equals(k2) invokes Object.equals(Object) due to k2's declared type, which performs reference equality.",
                                        "Compile-time error",
                                        "ClassCastException"
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Because k2 is declared as type Object, the compiler looks for equals(Object). Key overloaded equals(Key) instead of overriding equals(Object). Thus, Key inherits Object.equals(Object), which compares references (k1 == k2), returning false! (لأن نوع المرجع k2 هو Object، يستدعي المصرف دالة equals(Object) الموروثة من فئة Object والتي تقارن المراجع، فيكون الناتج false بسبب خطأ التحميل الزائد بدلاً من التجاوز)."
                    },
                    {
                              "id": "q12",
                              "question": "What is the role of 'if (this == o) return true;' as the first step in standard equals() implementations?\n(ما هو دور السطر if (this == o) return true كأول خطوة في التطبيق القياسي لدالة equals؟)",
                              "options": [
                                        "It compiles the class into native machine code.",
                                        "It is a high-speed performance optimization: if comparing an object to itself, it returns true immediately without inspecting any individual fields.",
                                        "It prevents garbage collection.",
                                        "It initializes the hashCode."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Checking reference equality first (this == o) is a classic optimization. If the two references point to the exact same instance, it immediately returns true without wasting CPU cycles comparing multiple fields. (فحص تطابق المرجع أولاً يوفر تحسيناً كبيراً في الأداء، فإذا كان الكائن يُقارن بنفسه يعيد true فوراً دون استهلاك وقت المعالج في فحص الحقول)."
                    },
                    {
                              "id": "q13",
                              "question": "Why does the canonical pattern use 'if (o == null || getClass() != o.getClass()) return false;' when strict type identity is required?\n(لماذا يستخدم النموذج القياسي شرط getClass() != o.getClass() عند اشتراط التطابق التام للنوع؟)",
                              "options": [
                                        "To make the method run asynchronously.",
                                        "It simultaneously satisfies the Non-nullity contract (rejecting null) and guarantees exact class matching, preventing subclasses from violating symmetry.",
                                        "Because getClass() is faster than ==.",
                                        "To allow multiple inheritance."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! This check safely returns false if 'o' is null, and ensures both objects belong to the EXACT same class, safeguarding the Symmetry axiom across inheritance hierarchies. (يحقق هذا السطر أمان القيمة الفارغة null ويرفضها، ويضمن انتماء الكائنين لنفس الفئة تماماً مما يحمي مبدأ التناظر الرياضي من الانكسار)."
                    },
                    {
                              "id": "q14",
                              "question": "In an enterprise JPA / Hibernate database entity, why is implementing equals() based on all mutable fields considered a severe antipattern?\n(في كيانات قواعد البيانات JPA/Hibernate، لماذا يعتبر بناء equals على حقول قابلة للتعديل خطأً فادحاً؟)",
                              "options": [
                                        "Because SQL cannot read mutable fields.",
                                        "If an entity's fields are modified while stored inside a Set (or Map key), its hash code and equality change, corrupting the collection and causing the entity to become lost or unretrievable.",
                                        "Because Hibernate does not support the equals() method.",
                                        "Because mutable fields cannot be converted to strings."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! If an object in a HashSet or as a HashMap key has its fields modified, its hashCode and equals change. The collection can no longer find the object in its original bucket, resulting in memory leaks and missing entity lookups. (تعديل حقول الكائن أثناء وجوده في HashSet أو HashMap يغير نتيجة الـ hash والمساواة؛ فيضيع الكائن داخل سلة الهاش القديمة ولا يمكن استرجاعه مجدداً)."
                    },
                    {
                              "id": "q15",
                              "question": "What is printed by executing the following code?\n\nclass Box {\n    int w, h;\n    Box(int w, int h) { this.w = w; this.h = h; }\n    @Override\n    public boolean equals(Object o) {\n        if (this == o) return true;\n        if (o == null || getClass() != o.getClass()) return false;\n        Box box = (Box) o;\n        return w == box.w && h == box.h;\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Box b1 = new Box(5, 10);\n        Box b2 = new Box(5, 10);\n        Box b3 = null;\n        System.out.println(b1.equals(b2) + \" \" + b1.equals(b3));\n    }\n}",
                              "options": [
                                        "true false",
                                        "true true",
                                        "false false",
                                        "true followed by NullPointerException"
                              ],
                              "correctIndex": 0,
                              "explanation": "Correct! b1 and b2 have identical dimensions and matching classes, so b1.equals(b2) is true. b1.equals(b3) encounters the 'o == null' check and returns false safely without throwing a NullPointerException. Output: 'true false'. (تتطابق أبعاد وفئات b1 و b2 فيكون الناتج true، وعند تمرير الكائن الفارغ b3 يعيد فحص null القيمة false بأمان؛ فيطبع الكود true false)."
                    }
          ]
        }
      ]
    }
  ];
})();
