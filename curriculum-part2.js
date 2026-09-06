/**
 * Java Curriculum Module - Part 2
 * Topics:
 * 3. Java Class Methods
 * 4. Java Class Challenge
 * 
 * 100% Offline, Pure JavaScript. Complete educational content with full bilingual (English & Arabic) explanations.
 */

(function () {
  'use strict';

  window.JAVA_TOPICS_PART2 = [
    /* ==========================================================================
       TOPIC 3: Java Class Methods
       ========================================================================== */
    {
      id: "java-class-methods",
      title: "3. Java Class Methods",
      description: "Mastering methods in Java: Behaviors, return types, parameters, method overloading, static vs instance execution, varargs, and recursion.",
      lessons: [
        {
          id: "class-methods-mastery",
          title: "Comprehensive Guide to Class Methods",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "Introduction to Class Methods (مقدمة في دوال الفئات)"
            },
            {
              type: "paragraph",
              text: "Methods represent the behaviors, actions, and algorithms encapsulated within a class. A method defines a block of code that executes only when called. Methods can take inputs (parameters), perform logic, and produce an output (return value), or be declared 'void' if no value is returned."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "الدوال (Methods) هي الأفعال والسلوكيات التي يستطيع الكائن تنفيذها. تحدد الدالة كتلة برمجية تُنفذ فقط عند استدعائها. يمكن للدالة استقبال مدخلات تُسمى المعاملات (Parameters)، وإرجاع قيمة نتيجة (Return Value)، أو أن تُعرف بـ 'void' إذا كانت تؤدي مهمة دون إرجاع قيمة رقمية أو نصية."
            },
            {
              type: "paragraph",
              text: "Java distinguishes between instance methods (which operate on an individual object's state using 'this') and static methods (which belong to the class itself and cannot access non-static instance attributes directly)."
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
              text: "Example 1: Void Method without Parameters (المثال 1: دالة بسيطة بدون معاملات)"
            },
            {
              type: "paragraph",
              text: "Defining a straightforward behavior that performs an action without receiving input or returning data."
            },
            {
              type: "code",
              language: "java",
              filename: "BasicMethodDemo.java",
              code: `public class BasicMethodDemo {
    static class NotificationService {
        void ping() {
            System.out.println("[PING] System heartbeat active at " + System.currentTimeMillis());
        }
    }

    public static void main(String[] args) {
        NotificationService service = new NotificationService();
        service.ping(); // Invoking the method
    }
}`,
              output: `[PING] System heartbeat active at 1714529381020`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "The method 'ping' has return type 'void' and empty parentheses '()', meaning it requires no arguments and produces no return value."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "الدالة 'ping' نوع إرجاعها 'void' وأقواسها فارغة '()' لأنها لا تحتاج أي مدخلات ولا ترجع أي قيمة، بل تطبع إشعاراً فقط."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Method with Parameters & Return Value (المثال 2: دالة مع معاملات وإرجاع قيمة)"
            },
            {
              type: "paragraph",
              text: "Passing arguments into a method and capturing the returned computational output."
            },
            {
              type: "code",
              language: "java",
              filename: "GeometryCalculator.java",
              code: `public class GeometryCalculator {
    static class Calculator {
        double computeRectangleArea(double width, double height) {
            if (width < 0 || height < 0) {
                return 0.0;
            }
            return width * height;
        }
    }

    public static void main(String[] args) {
        Calculator calc = new Calculator();
        double area1 = calc.computeRectangleArea(5.5, 4.0);
        double area2 = calc.computeRectangleArea(12.0, 3.5);

        System.out.println("Area 1: " + area1 + " sq units");
        System.out.println("Area 2: " + area2 + " sq units");
    }
}`,
              output: `Area 1: 22.0 sq units
Area 2: 42.0 sq units`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "The return type 'double' specifies that the method must return a 64-bit floating point number using the 'return' statement. The caller stores this result into local variables."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "الدالة تستقبل معاملين من نوع double وتحسب المساحة وترجع النتيجة باستخدام الكلمة 'return'. المتصل يقوم بتخزين القيمة المرجعة في متغير."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Boolean Predicate Method (المثال 3: دوال التحقق المنطقية)"
            },
            {
              type: "paragraph",
              text: "Writing a method that tests a condition and returns true or false (Predicate pattern)."
            },
            {
              type: "code",
              language: "java",
              filename: "NumberValidator.java",
              code: `public class NumberValidator {
    static class MathUtils {
        boolean isPrime(int n) {
            if (n <= 1) return false;
            for (int i = 2; i <= Math.sqrt(n); i++) {
                if (n % i == 0) return false;
            }
            return true;
        }
    }

    public static void main(String[] args) {
        MathUtils utils = new MathUtils();
        int[] testNumbers = { 2, 7, 12, 19, 24, 31 };

        for (int num : testNumbers) {
            System.out.println(num + " is prime? " + utils.isPrime(num));
        }
    }
}`,
              output: `2 is prime? true
7 is prime? true
12 is prime? false
19 is prime? true
24 is prime? false
31 is prime? true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "Boolean methods are commonly used for validation and filtering. Notice how early returns ('return false;') optimize performance by terminating execution as soon as a factor is found."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "دوال التحقق المنطقية ترجع true أو false وتسمى Predicates. استخدام الخروج المبكر عبر 'return false' يحسن كفاءة البرنامج بإيقاف الدوران فور اكتشاف قاسم للرقم."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Method Overloading by Parameter Count (المثال 4: التحميل الزائد بحسب عدد المعاملات)"
            },
            {
              type: "paragraph",
              text: "Having multiple methods with the same name but different numbers of parameters."
            },
            {
              type: "code",
              language: "java",
              filename: "OverloadCountDemo.java",
              code: `public class OverloadCountDemo {
    static class Adder {
        int add(int a, int b) {
            return a + b;
        }

        int add(int a, int b, int c) {
            return a + b + c;
        }

        int add(int a, int b, int c, int d) {
            return a + b + c + d;
        }
    }

    public static void main(String[] args) {
        Adder adder = new Adder();
        System.out.println("2 params: " + adder.add(10, 20));
        System.out.println("3 params: " + adder.add(10, 20, 30));
        System.out.println("4 params: " + adder.add(10, 20, 30, 40));
    }
}`,
              output: `2 params: 30
3 params: 60
4 params: 100`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "Method Overloading allows multiple methods to share the exact same name as long as their parameter signatures differ (number, types, or order of parameters). The compiler decides which method to bind at compile time."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "التحميل الزائد للدوال (Method Overloading) يسمح بتعريف دوال تحمل نفس الاسم بشرط اختلاف قائمة المعاملات (في العدد أو النوع أو الترتيب). يحدد المصرف الدالة المناسبة تلقائياً بناءً على المدخلات."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Method Overloading by Parameter Types (المثال 5: التحميل الزائد باختلاف أنواع البيانات)"
            },
            {
              type: "paragraph",
              text: "Overloading methods to handle diverse data types like integers, doubles, and Strings."
            },
            {
              type: "code",
              language: "java",
              filename: "PrinterOverload.java",
              code: `public class PrinterOverload {
    static class ConsolePrinter {
        void log(int value) {
            System.out.println("[INT LOG] " + value);
        }

        void log(double value) {
            System.out.println("[DOUBLE LOG] " + String.format("%.2f", value));
        }

        void log(String message) {
            System.out.println("[STRING LOG] " + message.toUpperCase());
        }

        void log(boolean flag) {
            System.out.println("[STATUS LOG] " + (flag ? "SUCCESS" : "FAILURE"));
        }
    }

    public static void main(String[] args) {
        ConsolePrinter cp = new ConsolePrinter();
        cp.log(42);
        cp.log(3.14159);
        cp.log("kernel initialized");
        cp.log(true);
    }
}`,
              output: `[INT LOG] 42
[DOUBLE LOG] 3.14
[STRING LOG] KERNEL INITIALIZED
[STATUS LOG] SUCCESS`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "Changing parameter types enables flexible APIs. Notice that return type alone is NOT sufficient to overload a method in Java (e.g., 'int getVal()' and 'double getVal()' with identical parameters causes a compiler error)."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "اختلاف أنواع المعاملات يوفر واجهة برمجية مرنة وموحدة. تذكر جيداً: تغيير نوع الإرجاع فقط لا يُعتبر تحميلاً زائداً وسيسبب خطأ تصريف إن تساوت المعاملات!"
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Static Methods vs Instance Methods (المثال 6: الدوال الساكنة مقابل دوال النسخ)"
            },
            {
              type: "paragraph",
              text: "Demonstrating how static methods are called on the class name without requiring an object."
            },
            {
              type: "code",
              language: "java",
              filename: "StaticVsInstanceMethod.java",
              code: `public class StaticVsInstanceMethod {
    static class TemperatureConverter {
        // Static method: Utility function, no object needed
        static double celsiusToFahrenheit(double c) {
            return (c * 9.0 / 5.0) + 32.0;
        }

        // Instance method: Depends on instance state
        double currentRoomTempC = 22.0;

        void displayRoomTemp() {
            double f = celsiusToFahrenheit(currentRoomTempC); // Can call static from instance
            System.out.println("Room: " + currentRoomTempC + "°C (" + f + "°F)");
        }
    }

    public static void main(String[] args) {
        // 1. Calling static method directly via ClassName
        double f100 = TemperatureConverter.celsiusToFahrenheit(100.0);
        System.out.println("Boiling Point: 100°C = " + f100 + "°F");

        // 2. Calling instance method via an instantiated object
        TemperatureConverter tc = new TemperatureConverter();
        tc.displayRoomTemp();
    }
}`,
              output: `Boiling Point: 100°C = 212.0°F
Room: 22.0°C (71.6°F)`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "Static methods cannot access instance variables or the 'this' keyword because they do not run in the context of any specific object instance. However, instance methods can freely call static methods."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "الدوال الساكنة (static) لا يمكنها الوصول إلى خصائص الكائن العادية ولا إلى الكلمة 'this' لأنها لا تعمل في سياق كائن محدد. في المقابل، تستطيع الدوال العادية استدعاء الدوال الساكنة بحرية."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Internal Method Decomposition (المثال 7: تقسيم العمل البرمجي بين الدوال)"
            },
            {
              type: "paragraph",
              text: "A public method orchestrating helper methods within the same class."
            },
            {
              type: "code",
              language: "java",
              filename: "InvoiceService.java",
              code: `public class InvoiceService {
    static class Billing {
        private double calculateSubtotal(double unitPrice, int qty) {
            return unitPrice * qty;
        }

        private double calculateTax(double subtotal, double taxRate) {
            return subtotal * taxRate;
        }

        // Master method orchestrating private helper methods
        void printInvoice(String item, double price, int qty, double taxRate) {
            double sub = calculateSubtotal(price, qty);
            double tax = calculateTax(sub, taxRate);
            double total = sub + tax;

            System.out.println("--- INVOICE ---");
            System.out.println("Item: " + item + " x" + qty + " @ $" + price);
            System.out.println("Subtotal: $" + sub);
            System.out.println("Tax (" + (taxRate * 100) + "%): $" + tax);
            System.out.println("Total Due: $" + total);
        }
    }

    public static void main(String[] args) {
        Billing billing = new Billing();
        billing.printInvoice("Ergonomic Keyboard", 75.0, 2, 0.08);
    }
}`,
              output: `--- INVOICE ---
Item: Ergonomic Keyboard x2 @ $75.0
Subtotal: $150.0
Tax (8.0%): $12.0
Total Due: $162.0`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "Decomposing complex tasks into small, dedicated private helper methods adheres to the Single Responsibility Principle and simplifies testing, readability, and maintenance."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "تقسيم المهام المعقدة إلى دوال مساعدة خاصة وصغيرة يتبع مبدأ المسؤولية الواحدة، مما يجعل الشيفرة البرمجية واضحة ومنظمة وسهلة الفحص والصيانة."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Variable-Length Arguments - Varargs (المثال 8: المعاملات متغيرة الطول)"
            },
            {
              type: "paragraph",
              text: "Accepting an arbitrary number of arguments using the '...' syntax."
            },
            {
              type: "code",
              language: "java",
              filename: "VarargsDemo.java",
              code: `public class VarargsDemo {
    static class Statistics {
        // 'double... values' is treated as a double[] array inside the method
        static double computeAverage(String label, double... values) {
            if (values.length == 0) return 0.0;
            double sum = 0;
            for (double v : values) {
                sum += v;
            }
            double avg = sum / values.length;
            System.out.println(label + " -> Count: " + values.length + " | Average: " + avg);
            return avg;
        }
    }

    public static void main(String[] args) {
        Statistics.computeAverage("Single Test", 88.0);
        Statistics.computeAverage("Midterm Scores", 92.5, 78.0, 85.0);
        Statistics.computeAverage("Final Exam Group", 70.0, 95.5, 84.0, 91.0, 89.5);
    }
}`,
              output: `Single Test -> Count: 1 | Average: 88.0
Midterm Scores -> Count: 3 | Average: 85.16666666666667
Final Exam Group -> Count: 5 | Average: 86.0`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "Varargs ('type... name') allows passing zero or more comma-separated values or an array. Rule: A method can have only ONE varargs parameter, and it MUST be the last parameter in the list."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "المعامل متغير الطول (Varargs) يُعرف بالصيغة '...Type' ويتصرف كمصفوفة داخل الدالة. القاعدة الأساسية: يمكن وجود معامل varargs واحد فقط في الدالة ويجب أن يكون دائماً في آخر قائمة المعاملات."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Method Chaining (Fluent Interface) (المثال 9: التسلسل البرمجي للدوال)"
            },
            {
              type: "paragraph",
              text: "Returning 'this' from setter-like methods to enable fluent statement chaining."
            },
            {
              type: "code",
              language: "java",
              filename: "FluentBuilderDemo.java",
              code: `public class FluentBuilderDemo {
    static class QueryBuilder {
        private String query = "SELECT * FROM users";

        QueryBuilder where(String condition) {
            this.query += " WHERE " + condition;
            return this; // Return current object reference
        }

        QueryBuilder orderBy(String column) {
            this.query += " ORDER BY " + column;
            return this;
        }

        QueryBuilder limit(int max) {
            this.query += " LIMIT " + max;
            return this;
        }

        String build() {
            return this.query + ";";
        }
    }

    public static void main(String[] args) {
        // Fluent method chaining
        String sql = new QueryBuilder()
            .where("active = 1")
            .orderBy("signup_date DESC")
            .limit(10)
            .build();

        System.out.println("Generated SQL: " + sql);
    }
}`,
              output: `Generated SQL: SELECT * FROM users WHERE active = 1 ORDER BY signup_date DESC LIMIT 10;`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "By returning 'this' (the current object instance), subsequent method calls can be chained together sequentially. This pattern is foundational for builders, stream pipelines, and fluent configuration."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "إرجاع 'this' (الكائن الحالي) يسمح بربط استدعاءات الدوال المتتالية بنقطة واحدة خلف بعضها البعض، وهو نمط تصميم واسع الانتشار يُعرف بـ Fluent Interface."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Recursive Method Execution (المثال 10: الاستدعاء الذاتي العودي Recursion)"
            },
            {
              type: "paragraph",
              text: "A method that solves a problem by invoking itself with smaller sub-problems until reaching a base condition."
            },
            {
              type: "code",
              language: "java",
              filename: "RecursionDemo.java",
              code: `public class RecursionDemo {
    static class Algorithms {
        // Factorial calculation via recursion
        static long factorial(int n) {
            if (n <= 1) {
                return 1; // Base condition stops recursion
            }
            return n * factorial(n - 1); // Recursive step
        }
    }

    public static void main(String[] args) {
        System.out.println("0! = " + Algorithms.factorial(0));
        System.out.println("5! = " + Algorithms.factorial(5));
        System.out.println("10! = " + Algorithms.factorial(10));
    }
}`,
              output: `0! = 1
5! = 120
10! = 3628800`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "Every recursive method must contain a base condition that terminates execution. Without a base condition, the method calls itself infinitely until the JVM call stack runs out of memory, causing a StackOverflowError."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "الدالة العودية (Recursive) تستدعي نفسها لحل مسألة أصغر. يجب أن تحتوي كل دالة عودية على شرط توقف أساسي (Base condition) لمنع التكرار اللانهائي الذي يؤدي إلى خطأ StackOverflowError."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Pass-by-Value with Reference Modification (المثال 11: التمرير بالقيمة وتأثيره على الكائنات)"
            },
            {
              type: "paragraph",
              text: "Advanced: Proving that reassigning a parameter reference does NOT affect the caller's variable."
            },
            {
              type: "code",
              language: "java",
              filename: "PassByValueProof.java",
              code: `public class PassByValueProof {
    static class Item {
        int value;
        Item(int v) { this.value = v; }
    }

    // Attempting to re-point the reference
    static void tryReassign(Item item) {
        item = new Item(999); // Reassigns local parameter copy only!
    }

    // Mutating internal state
    static void mutateState(Item item) {
        item.value = 500; // Directly mutates heap object
    }

    public static void main(String[] args) {
        Item myItem = new Item(10);

        tryReassign(myItem);
        System.out.println("After tryReassign: " + myItem.value + " (Unchanged!)");

        mutateState(myItem);
        System.out.println("After mutateState: " + myItem.value + " (Mutated!)");
    }
}`,
              output: `After tryReassign: 10 (Unchanged!)
After mutateState: 500 (Mutated!)`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "Java is strictly pass-by-value. In tryReassign, the parameter 'item' receives a copy of the pointer. Changing where 'item' points does not redirect 'myItem' in main. But accessing 'item.value' touches the actual object on the heap."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "جافا لغة تمرر بالقيمة دائماً (Pass-by-value). في tryReassign، تغيير وجهة المؤشر داخل الدالة لا يغير متغير main الأصلي أبداً، ولكن تعديل الخصائص الداخلية 'item.value' يعدل الكائن الفعلي على Heap."
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
                "Mistake 1: Trying to access non-static variables or 'this' inside a static method. Static context has no object instance attached.",
                "خطأ 1: محاولة استخدام متغيرات غير ساكنة أو الكلمة 'this' داخل دالة static، وهذا غير مسموح لأن الدالة الساكنة لا ترتبط بكائن محدد.",
                "Mistake 2: Thinking method overloading can differ ONLY by return type. 'int calc()' and 'void calc()' with identical parameters will NOT compile.",
                "خطأ 2: الاعتقاد بأن اختلاف نوع الإرجاع وحده يكفي للتحميل الزائد. لا يمكن تعريف دالتين بنفس الاسم والمعاملات حتى لو اختلف نوع القيمة المرجعة.",
                "Mistake 3: Missing the 'return' statement in a non-void method. Every non-void execution branch must return an appropriate value.",
                "خطأ 3: نسيان عبارة 'return' في أحد المسارات المنطقية (if/else) داخل دالة غير void، مما يسبب خطأ تصريف 'missing return statement'."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Multi-Scale Temperature Converter (التحدي العملي: محول درجات الحرارة متعدد المقاييس)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Create a class 'TempEngine' with static methods: 1) 'toCelsius(double fahrenheit)' returning Celsius; 2) 'toFahrenheit(double celsius)' returning Fahrenheit; 3) 'toKelvin(double celsius)' returning Kelvin; 4) Overloaded 'formatReading(double temp, String unit)' returning formatted String. Write a main() method to test conversions and format the readings."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: قم بإنشاء صنف TempEngine يحتوي على دوال ساكنة للتحويل بين المقاييس المختلفة (سلسيوس، فهرنهايت، كلفن)، مع دالة محملة لتنسيق القراءة نصياً. اختبر كافة الدوال في الدالة الرئيسية main."
            },
            {
              type: "code",
              language: "java",
              filename: "TempConverterChallenge.java",
              code: `public class TempConverterChallenge {
    static class TempEngine {
        static double toCelsius(double fahrenheit) {
            return (fahrenheit - 32.0) * (5.0 / 9.0);
        }

        static double toFahrenheit(double celsius) {
            return (celsius * 9.0 / 5.0) + 32.0;
        }

        static double toKelvin(double celsius) {
            return celsius + 273.15;
        }

        static String formatReading(double temp, String unit) {
            return String.format("%.2f %s", temp, unit);
        }
    }

    public static void main(String[] args) {
        double roomC = 25.0;
        double roomF = TempEngine.toFahrenheit(roomC);
        double roomK = TempEngine.toKelvin(roomC);

        System.out.println("Celsius: " + TempEngine.formatReading(roomC, "°C"));
        System.out.println("Fahrenheit: " + TempEngine.formatReading(roomF, "°F"));
        System.out.println("Kelvin: " + TempEngine.formatReading(roomK, "K"));

        double bodyF = 98.6;
        double bodyC = TempEngine.toCelsius(bodyF);
        System.out.println("Human Body Temp: " + TempEngine.formatReading(bodyC, "°C") + " (" + bodyF + "°F)");
    }
}`,
              output: `Celsius: 25.00 °C
Fahrenheit: 77.00 °F
Kelvin: 298.15 K
Human Body Temp: 37.00 °C (98.6°F)`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "The TempEngine demonstrates cohesive static utility design: pure mathematical conversion methods combined with formatted output generation without requiring object allocations."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "يوضح هذا الصنف كيفية بناء مكتبة دوال ساكنة نقية لحساب التحويلات الرياضية وتنسيق النتائج بكفاءة دون الحاجة لإنشاء كائنات."
            }
          ],
          quiz: [
            {
              id: "q1",
              question: "Examine this class definition:\nclass MathOperations {\n    int compute(int a, int b) { return a + b; }\n    double compute(int a, int b) { return (double)(a + b); }\n}\nWhat happens when attempting to compile this class?",
              options: [
                "It compiles successfully and overloads compute() based on the return type.",
                "Compile-time error: method compute(int, int) is already defined; changing only the return type does not constitute valid method overloading.",
                "It compiles, but throws an AmbiguousMethodException at runtime.",
                "The compiler renames the second method to compute_double()."
              ],
              correctIndex: 1,
              explanation: "Correct! Method overloading requires distinct parameter lists (differing in number, types, or order). The compiler cannot distinguish methods by return type alone because the caller may not assign the returned value (e.g., 'compute(2, 3);'). (التحميل الزائد يتطلب اختلافاً في قائمة المعاملات، واختلاف نوع الإرجاع فقط يسبب خطأ تصريف صريحاً)."
            },
            {
              id: "q2",
              question: "Which of the following method signatures is a VALID overload for:\npublic void render(String text, int size)?",
              options: [
                "public int render(String text, int size)",
                "private void render(String text, int size)",
                "public void render(int size, String text)",
                "public static void render(String text, int size)"
              ],
              correctIndex: 2,
              explanation: "Correct! 'render(int size, String text)' changes the order of parameter types (from String, int to int, String), which is a valid and distinct parameter signature. Changing only the return type, access modifier, or static keyword does not overload a method. (تغيير ترتيب أنواع المعاملات يخلق توقيعاً جديداً ومقبولاً للتحميل الزائد)."
            },
            {
              id: "q3",
              question: "Why does this code fail to compile?\nclass SportsCar {\n    int currentSpeed = 0;\n    public static void stopCar() {\n        currentSpeed = 0;\n    }\n}",
              options: [
                "Because stopCar() must return an int.",
                "Compile-time error: non-static variable currentSpeed cannot be referenced from a static context.",
                "Because currentSpeed must be declared final.",
                "Because static methods cannot modify any variables."
              ],
              correctIndex: 1,
              explanation: "Correct! Static methods belong to the class, not to any individual object instance. Because no 'this' instance exists when calling a static method, it cannot access instance attributes directly without an explicit object reference. (الدوال الساكنة تعمل بلا كائن محدد، لذا يُمنع تصريفياً الوصول لمتغيرات النسخ غير الساكنة بداخلها مباشرة)."
            },
            {
              id: "q4",
              question: "Which method signature adhering to variable-length arguments (Varargs) compiles successfully in Java?",
              options: [
                "void printReport(String... titles, int... counts)",
                "void printReport(int category, String... lines)",
                "void printReport(String... lines, int category)",
                "void printReport(...String lines)"
              ],
              correctIndex: 1,
              explanation: "Correct! Java rules require that a method can have at most ONE varargs parameter, and it MUST be the final parameter in the signature. (يُسمح بمعامل varargs واحد فقط في الدالة، ويجب أن يكون المعامل الأخير تماماً)."
            },
            {
              id: "q5",
              question: "What is printed by executing this code?\npublic static int calculateSum(int... values) {\n    int sum = 0;\n    for (int v : values) sum += v;\n    return sum;\n}\n// In main:\nSystem.out.println(calculateSum());",
              options: [
                "0",
                "Throws a NullPointerException",
                "Compile-time error: calculateSum requires at least one argument",
                "-1"
              ],
              correctIndex: 0,
              explanation: "Correct! Calling a varargs method with zero arguments passes an empty array (length 0). The enhanced for-loop executes 0 times, and the method safely returns sum = 0 without any exceptions. (استدعاء دالة varargs دون تمرير أي قيم يمرر مصفوفة فارغة بطول 0، فتعيد الدالة القيمة الابتدائية 0 بسلام)."
            },
            {
              id: "q6",
              question: "Analyze this primitive parameter passing code:\nstatic void boostScore(int score) {\n    score += 50;\n}\n// In main:\nint currentScore = 100;\nboostScore(currentScore);\nSystem.out.println(currentScore);\nWhat does this print? (ما هي القيمة المطبوعة؟)",
              options: [
                "150",
                "100",
                "50",
                "0"
              ],
              correctIndex: 1,
              explanation: "Correct! Java is strictly pass-by-value. When passing a primitive like 'currentScore', a copy of the value (100) is placed in the parameter 'score'. Modifying 'score' inside 'boostScore' has zero effect on the caller's 'currentScore' in main. (جافا تمرر المتغيرات الأولية بالقيمة، فتعديل المعامل داخل الدالة يغير نسخته المحلية فقط ويبقى المتغير الأصلي 100)."
            },
            {
              id: "q7",
              question: "Predict the output of this reference passing snippet:\nstatic void addTag(StringBuilder sb) {\n    sb.append(\"-VERIFIED\");\n}\n// In main:\nStringBuilder user = new StringBuilder(\"Sarah\");\naddTag(user);\nSystem.out.println(user);",
              options: [
                "Sarah",
                "Sarah-VERIFIED",
                "-VERIFIED",
                "NullPointerException"
              ],
              correctIndex: 1,
              explanation: "Correct! While Java passes references by value (copying the reference pointer), both the caller's 'user' and the method's 'sb' hold copies of the same heap address. Calling '.append()' mutates the shared underlying object on the heap, producing 'Sarah-VERIFIED'. (تمرير مؤشر المرجع بالقيمة يتيح للدالة الوصول لنفس الكائن في الذاكرة وتعديل حالته عبر دواله الداخلية)."
            },
            {
              id: "q8",
              question: "What language mechanism enables method chaining (e.g., 'new Query().where(\"id=1\").limit(10).execute();')?",
              options: [
                "Declaring all methods as static.",
                "Having each mutator method return 'this' (the current object instance).",
                "Declaring methods with the 'final' keyword.",
                "Using multi-threaded execution pools."
              ],
              correctIndex: 1,
              explanation: "Correct! Method chaining works by having each intermediate method return 'this'. The caller can immediately invoke the next method on the returned object reference without storing intermediate variables. (سلسلة الدوال تعمل عبر إرجاع this من كل دالة، مما يتيح استدعاء الدالة التالية على نفس المرجع فوراً)."
            },
            {
              id: "q9",
              question: "What runtime error occurs if a recursive method omits its base termination condition?\nstatic int recurse(int n) {\n    return recurse(n - 1);\n}",
              options: [
                "java.lang.NullPointerException",
                "java.lang.StackOverflowError",
                "java.lang.OutOfMemoryError in Heap",
                "java.lang.ArithmeticException"
              ],
              correctIndex: 1,
              explanation: "Correct! Each recursive method call pushes a new frame onto the thread's Call Stack. Infinite recursion without a base case exhausts the limited Call Stack space, throwing a java.lang.StackOverflowError. (كل نداء عودي يضيف إطاراً في مكدس النداء، واستمرار التكرار دون شرط توقف يستنفد الذاكرة مسبباً StackOverflowError)."
            },
            {
              id: "q10",
              question: "In professional Java conventions, how are boolean query methods (predicates) named, and how are they used?",
              options: [
                "They must start with 'get' and return an Integer 0 or 1.",
                "They start with 'is', 'has', or 'can' (e.g., 'isActive()', 'hasStock()') and are evaluated directly in conditional statements like 'if (item.hasStock())'.",
                "They must be declared void and accept a boolean callback.",
                "They must be declared static final."
              ],
              correctIndex: 1,
              explanation: "Correct! Boolean methods in Java follow JavaBean conventions using prefixes like 'is...', 'has...', or 'can...'. They return true/false and plug cleanly into 'if' conditions. (دوال الفحص المنطقية تُسمى ببوادئ مثل is أو has وتُستخدم مباشرة في الشروط الشرطية)."
            },
            {
              id: "q11",
              question: "If a class 'MathUtils' contains 'public static int factorial(int n)', which is the idiomatic, recommended way to call it from outside the class?",
              options: [
                "MathUtils m = new MathUtils(); m.factorial(5);",
                "MathUtils.factorial(5);",
                "this.factorial(5);",
                "super.factorial(5);"
              ],
              correctIndex: 1,
              explanation: "Correct! Static methods belong to the class itself. Invoking them via the class name ('MathUtils.factorial(5)') is cleaner, avoids unnecessary object instantiation on the heap, and clearly conveys that the method is static. (يُستدعى التابع الساكن باسم فئته مباشرة دون إهدار ذاكرة بإنشاء كائنات غير لازمة)."
            },
            {
              id: "q12",
              question: "Can a static method invoke a non-static instance method of the same class?",
              options: [
                "No, never under any circumstances in Java.",
                "Yes, but only if the static method creates or receives an explicit object instance first (e.g., 'new Car().drive()').",
                "Yes, by simply writing 'drive();' directly.",
                "Yes, by using the keyword 'super.drive();'."
              ],
              correctIndex: 1,
              explanation: "Correct! A static method has no implicit 'this' pointer, so it cannot call an instance method directly. However, it can freely invoke instance methods on any explicit object reference it creates or receives as a parameter. (لا تستطيع الدالة الساكنة استدعاء دالة كائن مباشرة إلا إذا امتلكت مرجع كائن صريحاً مثل إنشاء كائن بـ new)."
            },
            {
              id: "q13",
              question: "Examine this method:\nint checkSign(int number) {\n    if (number > 0) return 1;\n    if (number < 0) return -1;\n}\nWhat occurs when compiling this method?",
              options: [
                "It compiles cleanly and returns 0 by default when number == 0.",
                "Compile-time error: missing return statement, because the compiler detects that if number == 0, execution exits without returning an int.",
                "It throws a NullPointerException at runtime when number == 0.",
                "It compiles, but issues a warning."
              ],
              correctIndex: 1,
              explanation: "Correct! Java's compiler enforces definite return paths. Because neither 'if' branch executes when 'number == 0', the method reaches the closing brace without returning a value, triggering a compile-time error: 'missing return statement'. (المصرف يتحقق من شمولية كافة مسارات الإرجاع، وإذا كانت القيمة 0 لن يتحقق أي شرط مما يسبب خطأ missing return statement)."
            },
            {
              id: "q14",
              question: "Why does the following method signature fail to compile?\nvoid logData(int... codes, String... messages)",
              options: [
                "Because varargs cannot be used with String types.",
                "Because Java permits at most ONE varargs parameter per method signature.",
                "Because codes must be converted to an ArrayList.",
                "Because logData must return a boolean."
              ],
              correctIndex: 1,
              explanation: "Correct! Java strictly limits method signatures to at most one varargs parameter. Allowing multiple varargs would make call disambiguation impossible for the compiler. (جافا تشترط وجود معامل varargs واحد فقط بالدالة لمنع الغموض في تحديد بداية ونهاية القيم)."
            },
            {
              id: "q15",
              question: "What is the primary architectural purpose of declaring private helper methods inside a class?",
              options: [
                "To speed up JVM CPU processing by skipping the compiler.",
                "To decompose complex procedures into readable, maintainable internal steps while hiding implementation details from external callers.",
                "To allow other classes to override them.",
                "To prevent the garbage collector from inspecting local variables."
              ],
              correctIndex: 1,
              explanation: "Correct! Private helper methods break down large, repetitive routines into smaller, self-documenting sub-routines, adhering to encapsulation by keeping internal algorithmic mechanics hidden from outside consumers. (الدوال المساعدة الخاصة تُبسط الخوارزميات المعقدة وتقسمها لمهام واضحة مع حجب تفاصيل التنفيذ عن الفئات الخارجية)."
            }
          ]
        }
      ]
    },

    /* ==========================================================================
       TOPIC 4: Java Class Challenge
       ========================================================================== */
    {
      id: "java-class-challenge",
      title: "4. Java Class Challenge",
      description: "Synthesis challenge: Designing and architecting interacting classes, collaborative methods, state mutation, and business logic into real-world application models.",
      lessons: [
        {
          id: "class-challenge-project",
          title: "Comprehensive Architecture & OOP Challenge",
          estimatedMinutes: 30,
          content: [
            {
              type: "heading",
              level: 2,
              text: "Architectural Synthesis: Real-World Domain Modeling (التحدي الشامل: نمذجة الأنظمة الواقعية)"
            },
            {
              type: "paragraph",
              text: "Object-Oriented Programming delivers maximum value when multiple classes interact seamlessly to model real-world business domains. In this challenge module, we synthesize classes, objects, attributes, and methods into comprehensive collaborative architectures."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "تظهر القوة الحقيقية للبرمجة كائنية التوجه عندما تتعاون أصناف متعددة وتتبادل الرسائل والبيانات لتمثيل أنظمة حقيقية. في هذا الجزء الشامل، ندمج كل ما تعلمناه عن الأصناف والكائنات والخصائص والدوال لبناء حلول معمارية برمجية متكاملة."
            },

            {
              type: "heading",
              level: 2,
              text: "11 Progressive Code Examples (أمثلة معمارية وتطبيقية متدرجة)"
            },

            /* Example 1 */
            {
              type: "heading",
              level: 3,
              text: "Example 1: Inter-Object Bank Transfer (المثال 1: تحويل الأموال بين كائنين)"
            },
            {
              type: "paragraph",
              text: "A method on an Account object interacting with another Account object to perform an atomic balance transfer."
            },
            {
              type: "code",
              language: "java",
              filename: "TransferSimulation.java",
              code: `public class TransferSimulation {
    static class Account {
        String owner;
        double balance;

        Account(String owner, double balance) {
            this.owner = owner;
            this.balance = balance;
        }

        boolean transferTo(Account destination, double amount) {
            if (destination == null || amount <= 0 || this.balance < amount) {
                System.out.println("Transfer of $" + amount + " from " + owner + " to " + (destination != null ? destination.owner : "null") + " FAILED.");
                return false;
            }
            this.balance -= amount;
            destination.balance += amount;
            System.out.println("Transferred $" + amount + " from " + this.owner + " to " + destination.owner);
            return true;
        }
    }

    public static void main(String[] args) {
        Account userA = new Account("Samir", 1200.0);
        Account userB = new Account("Layla", 300.0);

        userA.transferTo(userB, 450.0);
        userA.transferTo(userB, 2000.0); // Fails safely

        System.out.println(userA.owner + " final: $" + userA.balance);
        System.out.println(userB.owner + " final: $" + userB.balance);
    }
}`,
              output: `Transferred $450.0 from Samir to Layla
Transfer of $2000.0 from Samir to Layla FAILED.
Samir final: $750.0
Layla final: $750.0`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "The transferTo method takes another object reference ('destination') as its argument, mutating both 'this.balance' and 'destination.balance' in a single validated routine."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "تستقبل الدالة transferTo مرجعاً لكائن الحساب الآخر 'destination' وتقوم بخصم المبلغ من الكائن الحالي وإضافته للحساب المستقبل بعد التحقق من كفاية الرصيد."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Academic Report Card with GPA Calculation (المثال 2: شهادة درجات وحساب المعدل التراكمي)"
            },
            {
              type: "paragraph",
              text: "Calculating statistical grade summaries across course entities."
            },
            {
              type: "code",
              language: "java",
              filename: "ReportCardDemo.java",
              code: `public class ReportCardDemo {
    static class CourseGrade {
        String courseName;
        int credits;
        double gradePoints; // e.g. 4.0 for A, 3.0 for B

        CourseGrade(String name, int credits, double points) {
            this.courseName = name;
            this.credits = credits;
            this.gradePoints = points;
        }
    }

    static class StudentTranscript {
        String studentName;
        CourseGrade[] courses;

        StudentTranscript(String name, CourseGrade[] courses) {
            this.studentName = name;
            this.courses = courses;
        }

        double calculateGPA() {
            if (courses == null || courses.length == 0) return 0.0;
            double totalPoints = 0;
            int totalCredits = 0;
            for (CourseGrade c : courses) {
                totalPoints += (c.gradePoints * c.credits);
                totalCredits += c.credits;
            }
            return totalCredits > 0 ? (totalPoints / totalCredits) : 0.0;
        }
    }

    public static void main(String[] args) {
        CourseGrade[] semester1 = {
            new CourseGrade("CS101 Intro to Java", 4, 4.0),
            new CourseGrade("MATH201 Calculus", 3, 3.7),
            new CourseGrade("PHYS101 Physics", 4, 3.3)
        };

        StudentTranscript transcript = new StudentTranscript("Nadia Hassan", semester1);
        System.out.println("Student: " + transcript.studentName);
        System.out.printf("Cumulative Semester GPA: %.2f%n", transcript.calculateGPA());
    }
}`,
              output: `Student: Nadia Hassan
Cumulative Semester GPA: 3.66`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "StudentTranscript encapsulates an array of CourseGrade objects, traversing them to compute a weighted GPA based on credit hours."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "يحتوي كائن شهادة الطالب على مصفوفة من كائنات المواد والدرجات، وتتولى الدالة حساب المعدل التراكمي الموزون بعدد الساعات المعتمدة."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: E-Commerce Shopping Cart System (المثال 3: سلة تسوق إلكترونية)"
            },
            {
              type: "paragraph",
              text: "Collaboration between CartItem, Product, and ShoppingCart classes."
            },
            {
              type: "code",
              language: "java",
              filename: "ShoppingCartSystem.java",
              code: `public class ShoppingCartSystem {
    static class Item {
        String name;
        double price;
        int quantity;

        Item(String name, double price, int qty) {
            this.name = name;
            this.price = price;
            this.quantity = qty;
        }

        double getSubtotal() {
            return price * quantity;
        }
    }

    static class Cart {
        Item[] items = new Item[10];
        int itemCount = 0;

        void addItem(String name, double price, int qty) {
            if (itemCount < items.length) {
                items[itemCount++] = new Item(name, price, qty);
                System.out.println("Added: " + name + " x" + qty);
            }
        }

        double calculateTotal() {
            double total = 0;
            for (int i = 0; i < itemCount; i++) {
                total += items[i].getSubtotal();
            }
            return total;
        }
    }

    public static void main(String[] args) {
        Cart myCart = new Cart();
        myCart.addItem("Wireless Mouse", 29.99, 2);
        myCart.addItem("USB-C Hub", 45.50, 1);
        myCart.addItem("HDMI Cable", 12.00, 3);

        System.out.printf("Cart Final Total: $%.2f%n", myCart.calculateTotal());
    }
}`,
              output: `Added: Wireless Mouse x2
Added: USB-C Hub x1
Added: HDMI Cable x3
Cart Final Total: $141.48`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "The Cart manages an internal collection of Item objects, delegating subtotal calculations to the Item class and aggregating the overall cart sum."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "تدير السلة مصفوفة من كائنات العناصر، وتفوض حساب المجموع الفرعي لكل عنصر إلى كائن Item نفسه ثم تجمع الإجمالي الكلي."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Library Checkout and Return System (المثال 4: نظام إعارة واسترجاع الكتب)"
            },
            {
              type: "paragraph",
              text: "Managing stateful transitions (borrowed/available) across a library catalog."
            },
            {
              type: "code",
              language: "java",
              filename: "LibraryCatalog.java",
              code: `public class LibraryCatalog {
    static class Book {
        final String isbn;
        String title;
        boolean isBorrowed = false;

        Book(String isbn, String title) {
            this.isbn = isbn;
            this.title = title;
        }

        boolean borrow() {
            if (!isBorrowed) {
                isBorrowed = true;
                return true;
            }
            return false;
        }

        void returnBook() {
            isBorrowed = false;
        }
    }

    public static void main(String[] args) {
        Book b = new Book("978-0134685991", "Effective Java");

        System.out.println("First borrow attempt: " + (b.borrow() ? "Approved" : "Rejected"));
        System.out.println("Second borrow attempt: " + (b.borrow() ? "Approved" : "Rejected"));

        b.returnBook();
        System.out.println("Borrow after return: " + (b.borrow() ? "Approved" : "Rejected"));
    }
}`,
              output: `First borrow attempt: Approved
Second borrow attempt: Rejected
Borrow after return: Approved`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "The Book object safely guards its state transitions, ensuring a book cannot be checked out twice simultaneously."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "يحمي كائن الكتاب حالته الداخلية، حيث يمنع إعارة نفس الكتاب مرتين في وقت واحد حتى يتم استرجاعه أولاً."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Smart Thermostat Controller (المثال 5: وحدة تحكم الثرموستات الذكية)"
            },
            {
              type: "paragraph",
              text: "An operational control system with mode switches and target climate regulation."
            },
            {
              type: "code",
              language: "java",
              filename: "ThermostatController.java",
              code: `public class ThermostatController {
    static class Thermostat {
        String mode = "OFF"; // "COOL", "HEAT", "OFF"
        double targetTemp = 21.0;
        double currentTemp = 24.5;

        void setMode(String newMode) {
            this.mode = newMode.toUpperCase();
            System.out.println("Thermostat mode switched to: " + this.mode);
        }

        void regulate() {
            if ("OFF".equals(mode)) {
                System.out.println("System OFF. Current: " + currentTemp + "°C");
            } else if ("COOL".equals(mode) && currentTemp > targetTemp) {
                System.out.println("AC Active: Cooling from " + currentTemp + "°C down to " + targetTemp + "°C");
                currentTemp = targetTemp;
            } else if ("HEAT".equals(mode) && currentTemp < targetTemp) {
                System.out.println("Heater Active: Heating from " + currentTemp + "°C up to " + targetTemp + "°C");
                currentTemp = targetTemp;
            } else {
                System.out.println("Optimal temperature maintained at " + currentTemp + "°C");
            }
        }
    }

    public static void main(String[] args) {
        Thermostat t = new Thermostat();
        t.regulate();
        t.setMode("COOL");
        t.targetTemp = 20.0;
        t.regulate();
    }
}`,
              output: `System OFF. Current: 24.5°C
Thermostat mode switched to: COOL
AC Active: Cooling from 24.5°C down to 20.0°C`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "The regulate method evaluates ambient conditions against target state and executes appropriate simulated climate control."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "تقوم دالة regulate بفحص ومقارنة درجة الحرارة الحالية بدرجة الحرارة المستهدفة وتشغيل التكييف أو التدفئة بناءً على الوضع المختار."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Vehicle Fleet Maintenance Tracker (المثال 6: متتبع صيانة أسطول المركبات)"
            },
            {
              type: "paragraph",
              text: "Tracking cumulative mileage and scheduling periodic service checkups."
            },
            {
              type: "code",
              language: "java",
              filename: "FleetTracker.java",
              code: `public class FleetTracker {
    static class Vehicle {
        String licensePlate;
        int totalOdometer;
        int lastServiceOdometer;

        Vehicle(String plate, int currentMileage) {
            this.licensePlate = plate;
            this.totalOdometer = currentMileage;
            this.lastServiceOdometer = currentMileage;
        }

        void drive(int km) {
            totalOdometer += km;
            System.out.println(licensePlate + " drove " + km + " km. Total: " + totalOdometer + " km");
        }

        boolean isServiceDue(int intervalKm) {
            return (totalOdometer - lastServiceOdometer) >= intervalKm;
        }

        void performService() {
            lastServiceOdometer = totalOdometer;
            System.out.println(licensePlate + " serviced at " + totalOdometer + " km.");
        }
    }

    public static void main(String[] args) {
        Vehicle van = new Vehicle("KSA-4912", 45000);
        van.drive(6000);

        if (van.isServiceDue(5000)) {
            System.out.println("ALERT: Service is due for " + van.licensePlate);
            van.performService();
        }

        System.out.println("Service due check after maintenance: " + van.isServiceDue(5000));
    }
}`,
              output: `KSA-4912 drove 6000 km. Total: 51000 km
ALERT: Service is due for KSA-4912
KSA-4912 serviced at 51000 km.
Service due check after maintenance: false`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "The Vehicle object maintains both total and historical maintenance mileage to automatically flag overdue maintenance."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "يحتفظ كائن المركبة بعداد المسافات الكلي وآخر مسافة تم عندها عمل الصيانة لتنبيه النظام عند تجاوز الفترة المحددة."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Turn-Based Combat Duel Simulator (المثال 7: محاكي معارك بالأدوار)"
            },
            {
              type: "paragraph",
              text: "Two Hero objects battling until one is defeated."
            },
            {
              type: "code",
              language: "java",
              filename: "HeroDuel.java",
              code: `public class HeroDuel {
    static class Fighter {
        String name;
        int health;
        int attackPower;

        Fighter(String name, int health, int attack) {
            this.name = name;
            this.health = health;
            this.attackPower = attack;
        }

        boolean isAlive() {
            return health > 0;
        }

        void strike(Fighter opponent) {
            if (!this.isAlive()) return;
            opponent.health -= this.attackPower;
            if (opponent.health < 0) opponent.health = 0;
            System.out.println(name + " hits " + opponent.name + " for " + attackPower + " dmg! [" + opponent.name + " HP: " + opponent.health + "]");
        }
    }

    public static void main(String[] args) {
        Fighter knight = new Fighter("Knight Arthur", 100, 25);
        Fighter dragon = new Fighter("Fire Drake", 120, 20);

        while (knight.isAlive() && dragon.isAlive()) {
            knight.strike(dragon);
            if (dragon.isAlive()) {
                dragon.strike(knight);
            }
        }

        System.out.println("Winner: " + (knight.isAlive() ? knight.name : dragon.name));
    }
}`,
              output: `Knight Arthur hits Fire Drake for 25 dmg! [Fire Drake HP: 95]
Fire Drake hits Knight Arthur for 20 dmg! [Knight Arthur HP: 80]
Knight Arthur hits Fire Drake for 25 dmg! [Fire Drake HP: 70]
Fire Drake hits Knight Arthur for 20 dmg! [Knight Arthur HP: 60]
Knight Arthur hits Fire Drake for 25 dmg! [Fire Drake HP: 45]
Fire Drake hits Knight Arthur for 20 dmg! [Knight Arthur HP: 40]
Knight Arthur hits Fire Drake for 25 dmg! [Fire Drake HP: 20]
Fire Drake hits Knight Arthur for 20 dmg! [Knight Arthur HP: 20]
Knight Arthur hits Fire Drake for 25 dmg! [Fire Drake HP: 0]
Winner: Knight Arthur`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "Objects exchange state mutations through method calls in a game loop. The strike method directly decrements the opponent's health attribute."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "تتبادل الكائنات التأثير في حلقة تكرارية، حيث تقوم دالة strike بخصم نقاط القوة الهجومية من صحة الخصم حتى تنتهي المعركة بفوز أحدهما."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Warehouse Inventory Restock Alert (المثال 8: مستودع وتنبيهات إعادة الطلب)"
            },
            {
              type: "paragraph",
              text: "Automated replenishment monitoring for supply chain management."
            },
            {
              type: "code",
              language: "java",
              filename: "WarehouseManager.java",
              code: `public class WarehouseManager {
    static class StockItem {
        String sku;
        int currentUnits;
        int minimumThreshold;

        StockItem(String sku, int units, int threshold) {
            this.sku = sku;
            this.currentUnits = units;
            this.minimumThreshold = threshold;
        }

        void dispatch(int count) {
            if (count <= currentUnits) {
                currentUnits -= count;
                System.out.println(sku + " dispatched " + count + " units. Left: " + currentUnits);
            }
        }

        boolean needsReorder() {
            return currentUnits <= minimumThreshold;
        }
    }

    public static void main(String[] args) {
        StockItem item = new StockItem("SSD-1TB-NVME", 50, 15);
        item.dispatch(30);
        System.out.println("Reorder needed? " + item.needsReorder());

        item.dispatch(10);
        System.out.println("Reorder needed? " + item.needsReorder() + " (URGENT REPLENISHMENT)");
    }
}`,
              output: `SSD-1TB-NVME dispatched 30 units. Left: 20
Reorder needed? false
SSD-1TB-NVME dispatched 10 units. Left: 10
Reorder needed? true (URGENT REPLENISHMENT)`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "Encapsulates inventory rules so warehouse operators receive timely reorder alerts when stock drops below minimum thresholds."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "يحتوي كائن المخزون على قواعد الحفاظ على الحد الأدنى، وينبه النظام تلقائياً عندما ينخفض العدد عن الحد المسموح."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Employee Payroll with Deductions & Bonus (المثال 9: حساب رواتب الموظفين والخصومات)"
            },
            {
              type: "paragraph",
              text: "Calculating net take-home salary based on base pay, tax deduction rates, and performance bonuses."
            },
            {
              type: "code",
              language: "java",
              filename: "PayrollEngine.java",
              code: `public class PayrollEngine {
    static class PaySlip {
        String employeeName;
        double baseSalary;
        double bonus;
        double taxPercentage;

        PaySlip(String name, double base, double bonus, double taxRate) {
            this.employeeName = name;
            this.baseSalary = base;
            this.bonus = bonus;
            this.taxPercentage = taxRate;
        }

        double calculateNetSalary() {
            double gross = baseSalary + bonus;
            double taxDeduction = gross * (taxPercentage / 100.0);
            return gross - taxDeduction;
        }
    }

    public static void main(String[] args) {
        PaySlip slip = new PaySlip("Ibrahim Saleh", 5000.0, 800.0, 10.0);
        System.out.println("Employee: " + slip.employeeName);
        System.out.printf("Calculated Net Pay: $%.2f%n", slip.calculateNetSalary());
    }
}`,
              output: `Employee: Ibrahim Saleh
Calculated Net Pay: $5220.00`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "Calculates gross pay, applies percentage deductions, and outputs net take-home compensation cleanly."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "تحسب الدالة الراتب الإجمالي مضافاً إليه المكافأة وتخصم نسبة الضرائب لإخراج الراتب الصافي بدقة."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Restaurant Order Ticket & Bill (المثال 10: فاتورة طلبات المطعم)"
            },
            {
              type: "paragraph",
              text: "Aggregating multiple course items into a printable receipt."
            },
            {
              type: "code",
              language: "java",
              filename: "RestaurantTicket.java",
              code: `public class RestaurantTicket {
    static class Dish {
        String name;
        double price;
        Dish(String n, double p) { this.name = n; this.price = p; }
    }

    static class Order {
        int tableNumber;
        Dish[] orderedDishes;

        Order(int table, Dish[] dishes) {
            this.tableNumber = table;
            this.orderedDishes = dishes;
        }

        void printReceipt(double serviceChargePercent) {
            double subtotal = 0;
            System.out.println("=== TABLE #" + tableNumber + " RECEIPT ===");
            for (Dish d : orderedDishes) {
                System.out.println("- " + d.name + ": $" + d.price);
                subtotal += d.price;
            }
            double service = subtotal * (serviceChargePercent / 100.0);
            System.out.println("Subtotal: $" + subtotal);
            System.out.println("Service (" + serviceChargePercent + "%): $" + service);
            System.out.println("FINAL DUE: $" + (subtotal + service));
        }
    }

    public static void main(String[] args) {
        Dish[] items = {
            new Dish("Grilled Salmon", 24.50),
            new Dish("Caesar Salad", 9.00),
            new Dish("Fresh Lemonade", 4.50)
        };
        Order order = new Order(7, items);
        order.printReceipt(15.0);
    }
}`,
              output: `=== TABLE #7 RECEIPT ===
- Grilled Salmon: $24.5
- Caesar Salad: $9.0
- Fresh Lemonade: $4.5
Subtotal: $38.0
Service (15.0%): $5.7
FINAL DUE: $43.7`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "Demonstrates object traversal and business-logic aggregation to produce formatted customer billing."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "يقوم كائن الطلب بالمرور على كائنات الأطباق وحساب المجموع وإضافة نسبة الخدمة وطباعة الفاتورة النهائية."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Transactional Ledger Audit System (المثال 11: نظام التدقيق المحاسبي وسجل العمليات)"
            },
            {
              type: "paragraph",
              text: "Advanced: Immutable transactional audit records stored in a tamper-resistant ledger."
            },
            {
              type: "code",
              language: "java",
              filename: "AuditLedgerDemo.java",
              code: `public class AuditLedgerDemo {
    static class AuditRecord {
        final long id;
        final String action;
        final double delta;
        final long timestamp;

        AuditRecord(long id, String action, double delta) {
            this.id = id;
            this.action = action;
            this.delta = delta;
            this.timestamp = System.currentTimeMillis();
        }
    }

    static class SecureLedger {
        private AuditRecord[] records = new AuditRecord[100];
        private int count = 0;

        void log(String action, double amount) {
            if (count < records.length) {
                records[count] = new AuditRecord(count + 1, action, amount);
                count++;
            }
        }

        void printAuditTrail() {
            System.out.println("=== COMPLIANCE AUDIT TRAIL ===");
            for (int i = 0; i < count; i++) {
                AuditRecord r = records[i];
                System.out.println("Entry #" + r.id + " | Action: " + r.action + " | Delta: $" + r.delta);
            }
        }
    }

    public static void main(String[] args) {
        SecureLedger ledger = new SecureLedger();
        ledger.log("DEPOSIT_WIRE", 10000.0);
        ledger.log("PAYMENT_VENDOR", -3200.0);
        ledger.log("FEE_MAINTENANCE", -25.0);

        ledger.printAuditTrail();
    }
}`,
              output: `=== COMPLIANCE AUDIT TRAIL ===
Entry #1 | Action: DEPOSIT_WIRE | Delta: $10000.0
Entry #2 | Action: PAYMENT_VENDOR | Delta: $-3200.0
Entry #3 | Action: FEE_MAINTENANCE | Delta: $-25.0`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "Combines final immutable audit entities with a stateful ledger class, demonstrating standard enterprise architecture."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "يدمج هذا المثال بين سجلات ثابتة غير قابلة للتعديل (final) مع فئة دفتر أستاذ عام لإجراء التدقيق المالي باحترافية."
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Hotel Room Reservation System (التحدي العملي: نظام حجز غرف الفندق)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Design a Hotel Reservation system: 1) Class 'Room' with roomNumber, type (e.g. Deluxe, Standard), pricePerNight, and isOccupied. Methods: bookRoom(String guest) and checkout(). 2) Class 'Hotel' holding an array of Room objects. Method: 'bookAvailableRoom(String type, String guest, int nights)' which finds the first unoccupied room of that type, books it, and returns the total cost. Test booking and releasing rooms in main()."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: قم بتصميم نظام حجز فندقي: 1) فئة Room برقم الغرفة ونوعها وسعر الليلة وحالة الإشغال، مع دوال bookRoom و checkout. 2) فئة Hotel تحتوي على مصفوفة غرف، مع دالة bookAvailableRoom تبحث عن أول غرفة شاغرة من النوع المطلوب وتحجزها وترجع التكلفة الإجمالية. قم بتجربة الحجز والمغادرة في الدالة main."
            },
            {
              type: "code",
              language: "java",
              filename: "HotelSystemChallenge.java",
              code: `public class HotelSystemChallenge {
    static class Room {
        int roomNumber;
        String type;
        double pricePerNight;
        boolean isOccupied = false;
        String guestName = "";

        Room(int num, String type, double price) {
            this.roomNumber = num;
            this.type = type;
            this.pricePerNight = price;
        }

        boolean book(String guest) {
            if (!isOccupied) {
                this.isOccupied = true;
                this.guestName = guest;
                return true;
            }
            return false;
        }

        void checkout() {
            this.isOccupied = false;
            this.guestName = "";
        }
    }

    static class Hotel {
        String hotelName;
        Room[] rooms;

        Hotel(String name, Room[] rooms) {
            this.hotelName = name;
            this.rooms = rooms;
        }

        double reserve(String requestedType, String guest, int nights) {
            for (Room r : rooms) {
                if (!r.isOccupied && r.type.equalsIgnoreCase(requestedType)) {
                    r.book(guest);
                    double cost = r.pricePerNight * nights;
                    System.out.println("Confirmed: Room #" + r.roomNumber + " (" + r.type + ") booked for " + guest + " | " + nights + " nights = $" + cost);
                    return cost;
                }
            }
            System.out.println("Sorry, no available rooms of type '" + requestedType + "' for " + guest);
            return 0.0;
        }
    }

    public static void main(String[] args) {
        Room[] hotelRooms = {
            new Room(101, "Standard", 100.0),
            new Room(102, "Standard", 100.0),
            new Room(201, "Suite", 250.0)
        };

        Hotel oasis = new Hotel("Oasis Grand", hotelRooms);

        oasis.reserve("Standard", "Omar Al-Farouq", 3);
        oasis.reserve("Standard", "Mona Zaki", 2);
        oasis.reserve("Standard", "Khaled Aziz", 1); // Fails (no available standard)
        oasis.reserve("Suite", "Khaled Aziz", 2);   // Succeeds
    }
}`,
              output: `Confirmed: Room #101 (Standard) booked for Omar Al-Farouq | 3 nights = $300.0
Confirmed: Room #102 (Standard) booked for Mona Zaki | 2 nights = $200.0
Sorry, no available rooms of type 'Standard' for Khaled Aziz
Confirmed: Room #201 (Suite) booked for Khaled Aziz | 2 nights = $500.0`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "The Hotel object acts as a coordinator, iterating through its encapsulated Room objects to find a match, invoke the room's booking method, and calculate total pricing."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "يعمل كائن الفندق كمنسق رئيسي، يبحث في الغرف التابعة له ليجد غرفة شاغرة مطابقة للنوع المطلوب، ثم يستدعي دالة الحجز ويحسب السعر الإجمالي."
            }
          ],
          quiz: [
            {
              id: "q1",
              question: "In an inter-account transfer method 'public boolean transferTo(Account target, double amount)', which set of pre-conditions is strictly required before modifying balances?",
              options: [
                "Only check that 'amount != 0'.",
                "Check that 'target != null', 'amount > 0', and 'this.balance >= amount'.",
                "Check that 'target == this'.",
                "No checks are needed; the JVM handles balance verification automatically."
              ],
              correctIndex: 1,
              explanation: "Correct! Defensive programming requires verifying that the target account reference is not null (preventing NullPointerException), the transfer amount is strictly positive, and the source account has sufficient funds to avoid overdrafts. (يجب التأكد من أن الحساب الهدف ليس فارغاً، والمبلغ موجب، والرصيد كافٍ قبل تنفيذ التحويل)."
            },
            {
              id: "q2",
              question: "If account A (balance $500) successfully transfers $150 to account B (balance $200), what system invariant must hold true immediately after the transaction completes?",
              options: [
                "Both accounts must now have identical balances.",
                "The sum of both balances (A.balance + B.balance) must remain exactly constant at $700.",
                "Account A's balance must become $0.",
                "Account B's balance must exceed $1000."
              ],
              correctIndex: 1,
              explanation: "Correct! In financial transactions, total money conservation is a core invariant: deducting from source and crediting the target preserves the combined total ($350 + $350 = $700). (مبدأ حفظ الرصيد الإجمالي يضمن أن مجموع الرصيدين يظل ثابتاً قبل وبعد التحويل الناجح)."
            },
            {
              id: "q3",
              question: "In a Hotel management class containing 'Room[] rooms', how should 'Room findAvailableRoom(String category)' safely locate an open room?",
              options: [
                "Return 'rooms[0]' regardless of its status.",
                "Iterate through 'rooms', check that 'room != null', '!room.isOccupied()', and 'room.getType().equalsIgnoreCase(category)', and return the first match or null.",
                "Delete occupied rooms from the array and return whatever is left.",
                "Instantiate a new Room on the fly and add it to the database."
              ],
              correctIndex: 1,
              explanation: "Correct! A robust search iterates over the array, null-checks each slot, verifies occupancy status via the Room's encapsulated method, matches the requested type, and returns the room reference (or null if none match). (البحث الآمن يتحقق من عدم فراغ العنصر، ويطابق النوع وحالة عدم الإشغال ويعيد المرجع المطلوب)."
            },
            {
              id: "q4",
              question: "Why should 'Room.book()' manage its own internal 'isOccupied' state rather than allowing the Hotel class or main() to directly execute 'room.isOccupied = true;'?",
              options: [
                "Because Java forbids classes from having more than one method.",
                "To adhere to encapsulation: Room enforces its own lifecycle rules (e.g., rejecting bookings if already occupied) and shields internal state from external tampering.",
                "Because modifying boolean fields from outside causes a memory leak.",
                "Because main() can only modify static fields."
              ],
              correctIndex: 1,
              explanation: "Correct! Encapsulation ensures each domain class protects its own invariants. Room should validate whether it can be booked before transitioning state, rather than exposing raw attributes to external corruption. (مبدأ الكبسلة يفرض أن يدير الكائن حالته بنفسه ويتحقق من صلاحية الحجز قبل تغييرها لمنع التلاعب الخارجي)."
            },
            {
              id: "q5",
              question: "Consider a shopping cart system:\nclass CartItem { double price; int quantity; double getSubtotal() { return price * quantity; } }\nclass Cart { CartItem[] items; double computeTotal() { ... } }\nHow should computeTotal() calculate the order total?",
              options: [
                "Return items.length * 100.0;",
                "Loop through items, skipping null entries, and accumulate item.getSubtotal() into a running total sum.",
                "Directly multiply the price of the first item by total items length.",
                "Sort the array alphabetically and return the largest price."
              ],
              correctIndex: 1,
              explanation: "Correct! The Cart coordinates its items by iterating through the array, guarding against null references, and invoking each CartItem's getSubtotal() method to compute the total. (تقوم السلة بالتكرار على العناصر غير الفارغة واستدعاء دالة المجموع الفرعي لكل عنصر لحساب الإجمالي بدقة)."
            },
            {
              id: "q6",
              question: "According to the Single Responsibility Principle (SRP), if an application has Order, InvoicePrinter, and PaymentGateway classes, what should Order be responsible for?",
              options: [
                "Processing credit cards and connecting to banking APIs.",
                "Managing order items, status, customer data, and line calculations.",
                "Printing physical paper receipts and formatting ASCII banners.",
                "Configuring the operating system network sockets."
              ],
              correctIndex: 1,
              explanation: "Correct! SRP mandates that Order should strictly manage the business state and calculations of the order itself, delegating formatting/printing to InvoicePrinter and monetary transaction processing to PaymentGateway. (كل صنف يركز على مسؤوليته المحددة: فئة الطلب تدير بيانات وحسابات الطلب فقط وتفوض الطباعة والدفع لفئات متخصصة)."
            },
            {
              id: "q7",
              question: "Why is a null check like 'if (target == null) return false;' mandatory in methods accepting another object reference?",
              options: [
                "Because Java automatically sets null objects to 0.",
                "To prevent an immediate java.lang.NullPointerException when the method attempts to invoke a method or access a field on 'target'.",
                "Because methods that accept null parameters will not compile.",
                "To free up operating system file handles."
              ],
              correctIndex: 1,
              explanation: "Correct! Calling any method (such as 'target.deposit(amount)') on a null reference causes a fatal NullPointerException at runtime. Defensive null checks gracefully handle invalid inputs. (فحص null يمنع انهيار البرنامج باستثناء NullPointerException عند محاولة مناداة أي دالة على كائن غير موجود)."
            },
            {
              id: "q8",
              question: "Examine this inventory method:\nclass Product {\n    int stock = 5;\n    boolean deductStock(int quantity) {\n        if (quantity <= 0 || quantity > stock) return false;\n        stock -= quantity;\n        return true;\n    }\n}\n// In main:\nProduct p = new Product();\nboolean result = p.deductStock(6);\nWhat are 'result' and 'p.stock'? (ما هي قيمة النتيجة والمخزون؟)",
              options: [
                "result is true, p.stock is -1",
                "result is false, p.stock is 5",
                "result is true, p.stock is 0",
                "Throws an ArithmeticException"
              ],
              correctIndex: 1,
              explanation: "Correct! Because the requested quantity (6) exceeds available stock (5), the guard condition 'quantity > stock' triggers, returning false immediately without mutating 'stock'. Thus, stock remains 5. (الشرط الوقائي يرفض خصم كمية تفوق المخزون المتوفر فيعيد false ويبقى المخزون 5 دون تغيير)."
            },
            {
              id: "q9",
              question: "Why is placing entire business applications into a single monolithic main() method considered a severe anti-pattern in software engineering?",
              options: [
                "Because the JVM refuses to execute main() methods longer than 50 lines.",
                "It eliminates modularity, makes unit testing impossible, destroys code reuse, tightly couples unrelated logic, and violates encapsulation.",
                "Because main() runs in 16-bit emulation mode.",
                "Because variables inside main() cannot store floating-point numbers."
              ],
              correctIndex: 1,
              explanation: "Correct! Monolithic main() methods create unmaintainable, tightly coupled code that cannot be tested in isolation, reused across features, or easily extended. Decomposing problems into collaborative classes is the foundation of object-oriented design. (تجميع كل شيء في main يدمر مزايا الكبسلة والاختبار وقابلية إعادة الاستخدام ويخلق كوداً يصعب صيانته)."
            },
            {
              id: "q10",
              question: "Examine this transaction logger:\nclass AuditLog {\n    String[] entries = new String[50];\n    int count = 0;\n    boolean log(String message) {\n        if (count >= entries.length) return false;\n        entries[count++] = message;\n        return true;\n    }\n}\nWhat does the check 'if (count >= entries.length)' protect against?",
              options: [
                "NullPointerException",
                "ArrayIndexOutOfBoundsException",
                "ClassCastException",
                "StackOverflowError"
              ],
              correctIndex: 1,
              explanation: "Correct! Fixed-size arrays throw an ArrayIndexOutOfBoundsException if an index equal to or greater than array length is accessed. The guard check safely prevents buffer overflow and returns false when full. (الشرط يحمي من تجاوز حدود المصفوفة ArrayIndexOutOfBoundsException ويعيد false عند امتلاء السجل)."
            },
            {
              id: "q11",
              question: "When passing a Customer object to 'void applyLoyaltyDiscount(Customer cust, double percentage)', whose discount is applied?",
              options: [
                "A temporary copy of the customer that is destroyed upon method return.",
                "The specific Customer instance residing on the heap whose memory reference address was passed into the method.",
                "All Customer objects ever created in the program.",
                "No discount is applied because methods cannot mutate objects."
              ],
              correctIndex: 1,
              explanation: "Correct! The parameter receives a copy of the reference address pointing directly to the caller's Customer instance on the heap. Mutating that instance updates the exact customer passed in. (المعامل يتسلم مؤشراً إلى كائن العميل نفسه في الـ Heap، وبالتالي التعديل ينعكس مباشرة على ذلك العميل المحدد)."
            },
            {
              id: "q12",
              question: "Why is designing domain methods to return a boolean status (e.g., 'boolean cancelBooking()') preferable to declaring them void in enterprise systems?",
              options: [
                "Because boolean methods consume half as much CPU memory as void methods.",
                "It provides immediate feedback to the caller regarding whether the business operation succeeded or failed, enabling proper UI messaging and error handling.",
                "Because Java requires all public methods to return a primitive value.",
                "To prevent other classes from calling the method twice."
              ],
              correctIndex: 1,
              explanation: "Correct! Returning a boolean (or result object) gives the caller deterministic feedback on whether the requested action succeeded, allowing caller logic to display confirmation or notify the user of validation failures. (إرجاع قيمة منطقية يعطي إشعاراً للمستدعي بنجاح أو فشل العملية البرمجية ليتخذ الإجراء المناسب)."
            },
            {
              id: "q13",
              question: "Examine this seat reservation method:\nclass FlightSeat {\n    boolean isReserved = false;\n    boolean reserve() {\n        if (isReserved) return false;\n        isReserved = true;\n        return true;\n    }\n}\nIf two threads or callers execute 'reserve()' consecutively on the same seat, what are the respective return values?",
              options: [
                "true and true",
                "true and false",
                "false and false",
                "false and true"
              ],
              correctIndex: 1,
              explanation: "Correct! The first caller finds isReserved as false, updates it to true, and receives 'true'. The subsequent caller finds isReserved is already true, the guard triggers, and it receives 'false', preventing double-booking. (النداء الأول يجد المقعد شاغراً فيحجزه ويعيد true، والنداء التالي يجده محجوزاً فيرفض الطلب ويعيد false لمنع الحجز المزدوج)."
            },
            {
              id: "q14",
              question: "In a library management system with LibraryMember and Book classes, what is the cleanest object-oriented approach for a member borrowing a book?",
              options: [
                "main() directly assigns 'book.borrowerName = member.name;'.",
                "'member.borrowBook(book)' checks member borrowing eligibility, and if allowed, delegates to 'book.issueTo(member)' to record the borrower.",
                "The Book class instantiates a new LibraryMember inside its constructor.",
                "The borrower information is written to a static global text file."
              ],
              correctIndex: 1,
              explanation: "Correct! Clean OOP models real-world interaction: the member verifies their own limits/eligibility and then collaborates with the Book object so both maintain valid internal states. (التصميم الكائني السليم يجعل العضو يتحقق من صلاحياته ثم ينسق مع كائن الكتاب لتسجيل الإعارة بشكل تبادلي منظم)."
            },
            {
              id: "q15",
              question: "What is the primary architectural benefit of designing a system with high cohesion and loose coupling between classes?",
              options: [
                "The code compiles directly to C++ source code.",
                "Components are modular, changes in one class rarely break other classes, and individual classes can be easily tested and reused independently.",
                "All variables are automatically converted into static constants.",
                "It eliminates the need for garbage collection."
              ],
              correctIndex: 1,
              explanation: "Correct! High cohesion (each class has a focused role) and loose coupling (classes interact through well-defined APIs rather than internal details) makes systems robust, testable, maintainable, and adaptable to change. (الترابط القوي داخل كل صنف مع تقليل الاعتمادية بين الأصناف يمنح النظام مرونة وسهولة فائقة في الصيانة والاختبار المستقل)."
            }
          ]
        }
      ]
    }
  ];
})();
