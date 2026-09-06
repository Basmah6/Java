/**
 * Java Curriculum Module - Part 37
 * Topics:
 * 73. Java Comparable
 * 74. Java Comparator
 * 
 * 100% Offline, Pure JavaScript. Complete educational content with full bilingual (English & Arabic) explanations.
 */

(function () {
  'use strict';

  window.JAVA_TOPICS_PART37 = [
    /* ==========================================================================
       TOPIC 73: Java Comparable
       ========================================================================== */
    {
      id: "java-comparable",
      title: "73. Java Comparable",
      description: "Complete mastery of java.lang.Comparable<T>: natural ordering semantics, int compareTo(T o) mathematical contract (anti-symmetry, transitivity, consistency with equals), sorting collections and arrays (Collections.sort, Arrays.sort), TreeSet/TreeMap integration, and integer overflow pitfalls.",
      lessons: [
        {
          id: "java-comparable-mastery",
          title: "Complete Guide to Java Comparable Interface",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "The Natural Ordering Contract & compareTo() Mathematics (عقد الترتيب الطبيعي ورياضيات compareTo)"
            },
            {
              type: "paragraph",
              text: "The 'java.lang.Comparable<T>' interface imposes a total ordering on the objects of each class that implements it. This ordering is referred to as the class's 'natural ordering', and the class's 'compareTo(T o)' method is referred to as its natural comparison method. The 'compareTo' method returns: 1) A negative integer if this object is less than o; 2) Zero if this object is equal to o; 3) A positive integer if this object is greater than o. Crucially, it is strongly recommended that natural orderings be 'consistent with equals': '(x.compareTo(y) == 0) == (x.equals(y))'. Implementing Comparable allows lists and arrays of objects to be sorted automatically by Collections.sort() and Arrays.sort(), and permits them to serve as keys in TreeMap or elements in TreeSet."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "تحدد واجهة 'java.lang.Comparable<T>' ما يُعرف بـ 'الترتيب الطبيعي' (Natural Ordering) لكائنات الفئة التي تطبقها. وتحتوي على دالة واحدة فقط هي 'compareTo(T o)'، والتي تعيد: 1) عدداً سالباً إذا كان الكائن الحالي أصغر من الكائن الممرر؛ 2) صفراً إذا كان الكائنان متساويين؛ 3) عدداً موجباً إذا كان الكائن الحالي أكبر. وتوصي جافا بشدة بأن يكون الترتيب متسقاً تماماً مع دالة equals: أي أن تعيد compareTo صفراً في نفس الحالات التي تعيد فيها equals القيمة true. تطبيق هذه الواجهة يسمح بفرز القوائم والمصفوفات تلقائياً عبر Collections.sort، واستخدام الكائنات كمفاتيح في TreeMap أو عناصر في TreeSet دون أي إعدادات إضافية."
            },
            {
              type: "paragraph",
              text: "The Mathematical Axioms of compareTo(): 1) Anti-symmetry: sgn(x.compareTo(y)) == -sgn(y.compareTo(x)); 2) Transitivity: (x.compareTo(y) > 0 && y.compareTo(z) > 0) implies x.compareTo(z) > 0; 3) Congruence: x.compareTo(y) == 0 implies sgn(x.compareTo(z)) == sgn(y.compareTo(z))."
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
              text: "Example 1: Basic Comparable Implementation (Natural Sort by ID) (المثال 1: تطبيق Comparable الأساسي والفرز بالرقم المعرف)"
            },
            {
              type: "paragraph",
              text: "Implementing compareTo() on an Employee class using Integer.compare()."
            },
            {
              type: "code",
              language: "java",
              filename: "BasicComparableDemo.java",
              code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class BasicComparableDemo {
    static class Employee implements Comparable<Employee> {
        final int id;
        final String name;

        Employee(int id, String name) {
            this.id = id;
            this.name = name;
        }

        @Override
        public int compareTo(Employee other) {
            // Safe comparison avoiding integer overflow:
            return Integer.compare(this.id, other.id);
        }

        @Override
        public String toString() {
            return "Emp#" + id + " (" + name + ")";
        }
    }

    public static void main(String[] args) {
        List<Employee> staff = new ArrayList<>();
        staff.add(new Employee(104, "Sarah"));
        staff.add(new Employee(101, "Ahmed"));
        staff.add(new Employee(103, "Zaid"));

        System.out.println("Before sort: " + staff);

        // Collections.sort() automatically uses Employee's compareTo()
        Collections.sort(staff);

        System.out.println("After sort:  " + staff);
    }
}`,
              output: `Before sort: [Emp#104 (Sarah), Emp#101 (Ahmed), Emp#103 (Zaid)]
After sort:  [Emp#101 (Ahmed), Emp#103 (Zaid), Emp#104 (Sarah)]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "Implementing Comparable<Employee> allows Collections.sort() to arrange the list in natural ascending order based on ID."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "تطبيق Comparable يسمح لدالة Collections.sort بترتيب اللائحة تصاعدياً بشكل طبيعي بناءً على المعرف."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: The Integer Subtraction Overflow Catastrophe (المثال 2: كارثة الطرح المباشر وتجاوز سعة الأرقام)"
            },
            {
              type: "paragraph",
              text: "Why writing 'this.val - other.val' is a fatal bug, and why Integer.compare() is mandatory."
            },
            {
              type: "code",
              language: "java",
              filename: "SubtractionOverflowTrapDemo.java",
              code: `public class SubtractionOverflowTrapDemo {
    public static void main(String[] args) {
        int valA = -2_000_000_000;
        int valB =  2_000_000_000;

        // FATAL BUG: Subtraction overflows 32-bit signed integer!
        int naiveDiff = valA - valB; // Produces positive number due to wrap-around!
        System.out.println("Naive Subtraction (valA - valB): " + naiveDiff + " (OVERFLOW: CLAIMS A > B!)");

        // CORRECT APPROACH: Integer.compare() checks values without subtraction
        int safeResult = Integer.compare(valA, valB);
        System.out.println("Safe Integer.compare(valA, valB): " + safeResult + " (CORRECT: CLAIMS A < B!)");
    }
}`,
              output: `Naive Subtraction (valA - valB): 294967296 (OVERFLOW: CLAIMS A > B!)
Safe Integer.compare(valA, valB): -1 (CORRECT: CLAIMS A < B!)`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "Subtracting large integers can wrap around and produce opposite signs. Always use Integer.compare() or Double.compare()."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "طرح الأرقام الكبيرة يسبب فيضاناً عددياً يعكس إشارة الناتج؛ لذا يجب دائماً استخدام Integer.compare الآمنة."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: String Natural Comparison (Lexicographical Order) (المثال 3: الترتيب المعجمي الطبيعي للنصوص)"
            },
            {
              type: "paragraph",
              text: "Delegating compareTo to String.compareTo for alphabetical sorting."
            },
            {
              type: "code",
              language: "java",
              filename: "StringLexicographicalDemo.java",
              code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class StringLexicographicalDemo {
    static class Student implements Comparable<Student> {
        final String name;

        Student(String name) { this.name = name; }

        @Override
        public int compareTo(Student other) {
            // Delegate directly to String's natural ordering
            return this.name.compareTo(other.name);
        }

        @Override
        public String toString() { return name; }
    }

    public static void main(String[] args) {
        List<Student> students = new ArrayList<>(List.of(
            new Student("Charlie"),
            new Student("Alice"),
            new Student("Bob")
        ));

        Collections.sort(students);
        System.out.println("Alphabetically sorted students: " + students);
    }
}`,
              output: `Alphabetically sorted students: [Alice, Bob, Charlie]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "String already implements Comparable<String>, making delegation to this.name.compareTo(other.name) trivial."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "تطبق فئة String واجهة Comparable مسبقاً، لذا يكفي تفويض المقارنة إلى this.name.compareTo."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Multi-Field Natural Comparison (Primary and Secondary Keys) (المثال 4: المقارنة متعددة الحقول)"
            },
            {
              type: "paragraph",
              text: "Sorting primarily by Last Name, and secondarily by First Name."
            },
            {
              type: "code",
              language: "java",
              filename: "MultiFieldComparableDemo.java",
              code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class MultiFieldComparableDemo {
    static class Person implements Comparable<Person> {
        final String lastName;
        final String firstName;

        Person(String first, String last) {
            this.firstName = first;
            this.lastName = last;
        }

        @Override
        public int compareTo(Person other) {
            // 1. Primary sort: Last Name
            int lastComp = this.lastName.compareTo(other.lastName);
            if (lastComp != 0) return lastComp;

            // 2. Secondary sort: First Name
            return this.firstName.compareTo(other.firstName);
        }

        @Override
        public String toString() { return lastName + ", " + firstName; }
    }

    public static void main(String[] args) {
        List<Person> people = new ArrayList<>(List.of(
            new Person("John", "Smith"),
            new Person("Alice", "Smith"),
            new Person("Bob", "Brown")
        ));

        Collections.sort(people);
        System.out.println("Sorted People: " + people);
    }
}`,
              output: `Sorted People: [Brown, Bob, Smith, Alice, Smith, John]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "If the primary comparison returns non-zero, return it immediately; otherwise, proceed to compare the tie-breaker field."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "إذا أسفرت مقارنة الحقل الأساسي عن اختلاف يُعاد الناتج فوراً؛ وإن تساويا ننتقل لمقارنة الحقل الفرعي لفض التعادل."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Consistency with equals() and TreeSet Behavior (المثال 5: الاتساق مع equals وتأثيره على TreeSet)"
            },
            {
              type: "paragraph",
              text: "How a compareTo() that disagrees with equals() creates subtle bugs in TreeSet."
            },
            {
              type: "code",
              language: "java",
              filename: "ConsistencyWithEqualsDemo.java",
              code: `import java.util.TreeSet;

public class ConsistencyWithEqualsDemo {
    static class Product implements Comparable<Product> {
        final int sku;
        final double price;

        Product(int sku, double price) { this.sku = sku; this.price = price; }

        // BUGGY: compares ONLY by price!
        @Override
        public int compareTo(Product o) {
            return Double.compare(this.price, o.price);
        }

        @Override
        public boolean equals(Object o) {
            return (o instanceof Product) && this.sku == ((Product) o).sku;
        }

        @Override
        public int hashCode() { return Integer.hashCode(sku); }

        @Override
        public String toString() { return "SKU-" + sku + " ($" + price + ")"; }
    }

    public static void main(String[] args) {
        TreeSet<Product> set = new TreeSet<>();

        Product p1 = new Product(1001, 19.99);
        Product p2 = new Product(1002, 19.99); // Different SKU, SAME price!

        set.add(p1);
        set.add(p2); // REJECTED by TreeSet because compareTo returned 0!

        System.out.println("TreeSet size: " + set.size() + " (Product 1002 was silently dropped!)");
        System.out.println("TreeSet content: " + set);
    }
}`,
              output: `TreeSet size: 1 (Product 1002 was silently dropped!)
TreeSet content: [SKU-1001 ($19.99)]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "TreeSet uses compareTo() == 0 to detect duplicates. If compareTo returns 0 for distinct items, one will be silently dropped!"
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "تعتمد TreeSet على compareTo لاكتشاف التكرار؛ فإذا أعادت صفراً لعنصرين مختلفين، سيتم تجاهل العنصر الثاني وضياعه!"
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Sorting Primitive and Object Arrays with Arrays.sort() (المثال 6: فرز المصفوفات بـ Arrays.sort)"
            },
            {
              type: "paragraph",
              text: "Arrays.sort() automatically honors Comparable on object arrays."
            },
            {
              type: "code",
              language: "java",
              filename: "ArraysSortComparableDemo.java",
              code: `import java.util.Arrays;

public class ArraysSortComparableDemo {
    static class Version implements Comparable<Version> {
        final int major, minor;
        Version(int maj, int min) { this.major = maj; this.minor = min; }

        @Override
        public int compareTo(Version o) {
            int maj = Integer.compare(this.major, o.major);
            return (maj != 0) ? maj : Integer.compare(this.minor, o.minor);
        }

        @Override
        public String toString() { return "v" + major + "." + minor; }
    }

    public static void main(String[] args) {
        Version[] versions = {
            new Version(2, 1),
            new Version(1, 0),
            new Version(2, 0),
            new Version(1, 9)
        };

        Arrays.sort(versions);
        System.out.println("Sorted release versions: " + Arrays.toString(versions));
    }
}`,
              output: `Sorted release versions: [v1.0, v1.9, v2.0, v2.1]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "Arrays.sort() uses Dual-Pivot Quicksort or TimSort, leveraging Comparable for object arrays."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "تستخدم Arrays.sort خوارزمية TimSort السريعة وتعتمد تلقائياً على واجهة Comparable لترتيب الكائنات."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Comparable with Modern Java Record (المثال 7: تطبيق Comparable مع سجلات Record الحديثة)"
            },
            {
              type: "paragraph",
              text: "Implementing Comparable cleanly on immutable Java Records."
            },
            {
              type: "code",
              language: "java",
              filename: "RecordComparableDemo.java",
              code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class RecordComparableDemo {
    // Records automatically generate equals(), hashCode(), and getters
    record ScoreRecord(String player, int score) implements Comparable<ScoreRecord> {
        @Override
        public int compareTo(ScoreRecord other) {
            // Descending sort by score (highest score first)
            return Integer.compare(other.score, this.score);
        }
    }

    public static void main(String[] args) {
        List<ScoreRecord> leaderboard = new ArrayList<>(List.of(
            new ScoreRecord("Player_A", 450),
            new ScoreRecord("Player_B", 920),
            new ScoreRecord("Player_C", 680)
        ));

        Collections.sort(leaderboard);
        System.out.println("Leaderboard (Highest first): " + leaderboard);
    }
}`,
              output: `Leaderboard (Highest first): [ScoreRecord[player=Player_B, score=920], ScoreRecord[player=Player_C, score=680], ScoreRecord[player=Player_A, score=450]]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "Java Records can implement Comparable<T>, pairing boilerplate-free data carriers with concise natural sorting logic."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "يمكن لسجلات Record تطبيق Comparable بسهولة؛ مما يجمع بين كبسولة بيانات نظيفة وقواعد فرز طبيعية مقتضبة."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Safe Floating Point Comparison with Double.compare() (المثال 8: المقارنة الآمنة للكسور العشرية)"
            },
            {
              type: "paragraph",
              text: "Handling NaN and -0.0 vs +0.0 properly in compareTo."
            },
            {
              type: "code",
              language: "java",
              filename: "FloatingPointComparableDemo.java",
              code: `public class FloatingPointComparableDemo {
    static class Measurement implements Comparable<Measurement> {
        final double value;
        Measurement(double v) { this.value = v; }

        @Override
        public int compareTo(Measurement o) {
            // Double.compare correctly handles NaN and -0.0 vs +0.0
            return Double.compare(this.value, o.value);
        }
    }

    public static void main(String[] args) {
        Measurement m1 = new Measurement(0.0);
        Measurement m2 = new Measurement(-0.0);

        System.out.println("Double.compare(0.0, -0.0): " + m1.compareTo(m2));
        System.out.println("Double.compare safely orders tricky IEEE 754 edge cases.");
    }
}`,
              output: `Double.compare(0.0, -0.0): 1
Double.compare safely orders tricky IEEE 754 edge cases.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "Always use Double.compare() instead of '<' or '>' to handle IEEE 754 floating point subtleties like NaN and signed zeros correctly."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "استخدم دائماً Double.compare بدلاً من رموز المقارنة للتعامل الآمن مع الحالات الدقيقة كـ NaN والصفر ذو الإشارة."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Natural Ordering with Java 8+ Comparator Helper in compareTo (المثال 9: استخدام Comparator في compareTo)"
            },
            {
              type: "paragraph",
              text: "Streamlining compareTo implementation using Comparator.comparing."
            },
            {
              type: "code",
              language: "java",
              filename: "ModernCompareToHelperDemo.java",
              code: `import java.util.Comparator;

public class ModernCompareToHelperDemo {
    static class Book implements Comparable<Book> {
        final String title;
        final int year;

        // Static comparator chain reusable across all instances
        private static final Comparator<Book> COMPARATOR =
                Comparator.comparing((Book b) -> b.title)
                          .thenComparingInt(b -> b.year);

        Book(String title, int year) { this.title = title; this.year = year; }

        @Override
        public int compareTo(Book other) {
            return COMPARATOR.compare(this, other);
        }

        @Override
        public String toString() { return title + " (" + year + ")"; }
    }

    public static void main(String[] args) {
        Book b1 = new Book("Effective Java", 2018);
        Book b2 = new Book("Clean Code", 2008);

        System.out.println("Comparison result: " + b1.compareTo(b2));
        System.out.println("Comparing via static comparator chain keeps compareTo clean and readable.");
    }
}`,
              output: `Comparison result: 2
Comparing via static comparator chain keeps compareTo clean and readable.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "Delegating compareTo to a static Comparator.comparing chain makes complex multi-field comparison code elegant and typo-free."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "تفويض دالة compareTo لسلسلة Comparator.comparing ثابتة يجعل الكود أنيقاً وخالياً من أخطاء الفحص اليدوي."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Sorting Enums (Built-in Comparable) (المثال 10: الترتيب الطبيعي للتعدادات Enum)"
            },
            {
              type: "paragraph",
              text: "Java enums implement Comparable by default, sorting by declaration ordinal."
            },
            {
              type: "code",
              language: "java",
              filename: "EnumNaturalComparableDemo.java",
              code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class EnumNaturalComparableDemo {
    enum Severity {
        LOW, MEDIUM, HIGH, CRITICAL // Ordinals: 0, 1, 2, 3
    }

    public static void main(String[] args) {
        List<Severity> alerts = new ArrayList<>(List.of(
            Severity.CRITICAL,
            Severity.LOW,
            Severity.HIGH,
            Severity.MEDIUM
        ));

        System.out.println("Before sort: " + alerts);
        Collections.sort(alerts); // Enums implement Comparable<E> natively!
        System.out.println("After sort:  " + alerts);
    }
}`,
              output: `Before sort: [CRITICAL, LOW, HIGH, MEDIUM]
After sort:  [LOW, MEDIUM, HIGH, CRITICAL]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "All Java enums implement Comparable<E>, comparing their declaration order (ordinal values)."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "تطبق جميع تعدادات Enum واجهة Comparable تلقائياً وترتب عناصرها وفقاً لترتيب تعريفها الأصلي."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Binary Search with Collections.binarySearch() (المثال 11: البحث الثنائي بالترتيب الطبيعي)"
            },
            {
              type: "paragraph",
              text: "Using Collections.binarySearch on a list sorted by natural ordering."
            },
            {
              type: "code",
              language: "java",
              filename: "BinarySearchComparableDemo.java",
              code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class BinarySearchComparableDemo {
    static class Item implements Comparable<Item> {
        final int id;
        Item(int id) { this.id = id; }

        @Override
        public int compareTo(Item o) { return Integer.compare(this.id, o.id); }

        @Override
        public String toString() { return "Item#" + id; }
    }

    public static void main(String[] args) {
        List<Item> catalog = new ArrayList<>(List.of(
            new Item(50), new Item(10), new Item(80), new Item(30)
        ));

        // Binary search REQUIRES the list to be sorted first!
        Collections.sort(catalog);
        System.out.println("Sorted catalog: " + catalog);

        // Perform O(log n) binary search
        Item target = new Item(30);
        int index = Collections.binarySearch(catalog, target);

        System.out.println("Index of target " + target + ": " + index);
    }
}`,
              output: `Sorted catalog: [Item#10, Item#30, Item#50, Item#80]
Index of target Item#30: 1`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "Collections.binarySearch() relies on the list being sorted by Comparable to locate elements in O(log n) time."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "تعتمد دالة binarySearch على الترتيب الطبيعي المسبق للائحة لإيجاد العناصر في زمن لوغاريتمي O(log n)."
            },

            /* Common Mistakes */
            {
              type: "heading",
              level: 2,
              text: "Common Mistakes & Important Notes (أخطاء شائعة وملاحظات مهمة)"
            },
            {
              type: "list",
              ordered: false,
              items: [
                "Mistake 1: Implementing compareTo with direct integer subtraction ('this.id - other.id'). If values cross signed 32-bit limits, integer overflow will invert the result. Always use Integer.compare().",
                "خطأ 1: استخدام الطرح المباشر 'a - b' داخل compareTo؛ مما يسبب فيضاناً عددياً يقلب النتيجة. استخدم دائماً Integer.compare().",
                "Mistake 2: Having compareTo return 0 for two objects that are NOT equal according to equals(). In a TreeSet or TreeMap, one of them will be silently discarded as a duplicate!",
                "خطأ 2: إرجاع 0 في compareTo لكائنين مختلفين في equals؛ مما يؤدي لحذف أحدهما بصمت داخل TreeSet أو TreeMap.",
                "Mistake 3: Passing null to compareTo(other). The contract specifies that passing null must throw a NullPointerException."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Priority Job Dispatcher Engine (التحدي العملي: محرك جدولة المهام ذات الأولوية)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Create a class 'Job' implementing Comparable<Job>. A Job has 'priority' (int: 1 = urgent, 5 = low) and 'createdAt' (long timestamp). Natural ordering must order: 1) Urgent priority first (lowest priority int); 2) If priority ties, oldest job first (lowest createdAt). Store 4 jobs in a PriorityQueue, poll each, and verify execution sequence."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: صمم فئة Job تطبق واجهة Comparable. تحتوي المهمة على priority (رقم: 1 طارئ، 5 منخفض) و createdAt (طابع زمني). يجب أن يكون الترتيب الطبيعي: 1) الأولوية الأعلى أولاً (الرقم الأقل)؛ 2) عند التساوي، المهمة الأقدم زمناً أولاً. خزن 4 مهام في طابور أولوية PriorityQueue واسحبها للتأكد من تسلسل التنفيذ."
            },
            {
              type: "code",
              language: "java",
              filename: "PriorityJobDispatcherChallenge.java",
              code: `import java.util.PriorityQueue;

public class PriorityJobDispatcherChallenge {
    static class Job implements Comparable<Job> {
        final String title;
        final int priority; // 1 = highest, 5 = lowest
        final long createdAt;

        Job(String title, int priority, long createdAt) {
            this.title = title;
            this.priority = priority;
            this.createdAt = createdAt;
        }

        @Override
        public int compareTo(Job other) {
            // 1. Primary: Priority (ascending: 1 comes before 5)
            int pComp = Integer.compare(this.priority, other.priority);
            if (pComp != 0) return pComp;

            // 2. Secondary: Tie-breaker by timestamp (FIFO: oldest first)
            return Long.compare(this.createdAt, other.createdAt);
        }

        @Override
        public String toString() {
            return title + " [Pri=" + priority + ", Time=" + createdAt + "]";
        }
    }

    public static void main(String[] args) {
        PriorityQueue<Job> queue = new PriorityQueue<>();

        queue.add(new Job("Send Promo Email", 4, 1000L));
        queue.add(new Job("Fix DB Outage", 1, 1050L));
        queue.add(new Job("Restart Web Server", 1, 1020L)); // Same priority as Fix DB, but earlier time!
        queue.add(new Job("Run Nightly Backup", 3, 900L));

        System.out.println("Processing Jobs in strict natural priority order:");
        while (!queue.isEmpty()) {
            System.out.println(" -> Executing: " + queue.poll());
        }
    }
}`,
              output: `Processing Jobs in strict natural priority order:
 -> Executing: Restart Web Server [Pri=1, Time=1020]
 -> Executing: Fix DB Outage [Pri=1, Time=1050]
 -> Executing: Run Nightly Backup [Pri=3, Time=900]
 -> Executing: Send Promo Email [Pri=4, Time=1000]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "The Job class implements Comparable with multi-field ordering. The PriorityQueue automatically uses compareTo() to dispatch urgent and older jobs first."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "تطبق فئة Job واجهة Comparable بترتيب متعدد الحقول؛ فيقوم طابور الأولوية تلقائياً بسحب المهام الطارئة والأقدم زمناً أولاً."
            }
          ],
          quiz: [
          {
                    "id": "comparable-mastery-q1",
                    "question": "What is the single method defined by the java.lang.Comparable<T> interface?",
                    "options": [
                              "int compare(T o1, T o2)",
                              "int compareTo(T o)",
                              "boolean isGreaterThan(T o)",
                              "int order(T o)"
                    ],
                    "correctIndex": 1,
                    "explanation": "Comparable<T> defines a single method: int compareTo(T o). It imposes a natural ordering on the objects of each class that implements it."
          },
          {
                    "id": "comparable-mastery-q2",
                    "question": "What are the required return value semantics for x.compareTo(y)?",
                    "options": [
                              "Returns true if x > y and false otherwise",
                              "Returns a negative integer if x < y, zero if x is equal to y, and a positive integer if x > y",
                              "Always returns 1, 0, or -1 strictly",
                              "Returns the memory address offset between x and y"
                    ],
                    "correctIndex": 1,
                    "explanation": "By contract, compareTo(T o) returns a negative integer, zero, or a positive integer as this object is less than, equal to, or greater than the specified object. It is NOT restricted to just -1, 0, and 1."
          },
          {
                    "id": "comparable-mastery-q3",
                    "question": "Why is implementing compareTo as 'return this.id - other.id;' considered a dangerous antipattern in Java?",
                    "options": [
                              "Integer subtraction is not supported in compareTo()",
                              "It can cause 32-bit integer overflow when subtracting extreme values (e.g., negative integers from positive integers), flipping the sign of the result and corrupting sorting algorithms",
                              "It fails to compile because id must be an Object",
                              "It causes an infinite loop in Arrays.sort()"
                    ],
                    "correctIndex": 1,
                    "explanation": "If this.id is Integer.MAX_VALUE and other.id is -1, this.id - other.id overflows to Integer.MIN_VALUE (a negative number!), erroneously declaring that MAX_VALUE < -1. The safe, standard idiom is Integer.compare(this.id, other.id)."
          },
          {
                    "id": "comparable-mastery-q4",
                    "question": "What does it mean for a class's natural ordering to be 'consistent with equals'?",
                    "options": [
                              "Both methods are written in the same Java file",
                              "(x.compareTo(y) == 0) is true if and only if x.equals(y) is true",
                              "compareTo() returns the same integer as hashCode()",
                              "equals() takes a Comparable as its argument"
                    ],
                    "correctIndex": 1,
                    "explanation": "A natural ordering is said to be consistent with equals if and only if (e1.compareTo(e2) == 0) has the exact same boolean value as e1.equals(e2) for all elements. This consistency is strongly recommended because sorted collections like TreeSet and TreeMap rely on compareTo() rather than equals() to determine uniqueness."
          },
          {
                    "id": "comparable-mastery-q5",
                    "question": "What happens when you add elements of a class that is NOT 'consistent with equals' to a TreeSet?\n\nclass Item implements Comparable<Item> {\n    int rank; String name;\n    Item(int r, String n) { this.rank = r; this.name = n; }\n    public int compareTo(Item o) { return Integer.compare(this.rank, o.rank); }\n    public boolean equals(Object o) { ... compares both rank and name ... }\n}\n\nTreeSet<Item> set = new TreeSet<>();\nset.add(new Item(1, \"Pen\"));\nset.add(new Item(1, \"Book\"));\nSystem.out.println(set.size());",
                    "options": [
                              "2, because equals() considers them distinct items",
                              "1, because TreeSet relies strictly on compareTo(), and compareTo() returned 0 for equal ranks",
                              "Throws ClassCastException",
                              "Throws DuplicateItemException"
                    ],
                    "correctIndex": 1,
                    "explanation": "TreeSet uses compareTo() exclusively to test for duplicates. Because both items have rank=1, compareTo() returns 0, and TreeSet discards the second item as a duplicate, leaving set.size() == 1, even though equals() would say they are distinct."
          },
          {
                    "id": "comparable-mastery-q6",
                    "question": "How should floating-point fields (double or float) be safely compared inside compareTo()?",
                    "options": [
                              "Using (int)(this.val - other.val)",
                              "Using Double.compare(this.val, other.val) or Float.compare(this.val, other.val)",
                              "Using the == operator",
                              "By converting both values to Strings and using String.compareTo()"
                    ],
                    "correctIndex": 1,
                    "explanation": "Double.compare() handles special floating-point values correctly: it treats Double.NaN as equal to itself and greater than all other values (including Double.POSITIVE_INFINITY), and correctly distinguishes -0.0d from 0.0d."
          },
          {
                    "id": "comparable-mastery-q7",
                    "question": "How does String.compareTo() determine ordering between two strings?",
                    "options": [
                              "By string character count only",
                              "Lexicographically based on the Unicode value of each character at corresponding positions; if prefixes match, the shorter string precedes the longer one",
                              "Randomly based on string memory addresses",
                              "According to English dictionary rules regardless of character casing"
                    ],
                    "correctIndex": 1,
                    "explanation": "String.compareTo compares characters at matching indices by their Unicode code point values. If they differ, the character difference determines the result. If one string is a prefix of the other, the length difference (this.length() - anotherString.length()) is returned."
          },
          {
                    "id": "comparable-mastery-q8",
                    "question": "What is the natural ordering of Java enums by default?",
                    "options": [
                              "Enums do not implement Comparable",
                              "They are ordered alphabetically by their declared name",
                              "They implement Comparable<E> and are ordered by their ordinal position (the order in which the constants are declared in the enum declaration)",
                              "They are ordered by the hash codes of their constants"
                    ],
                    "correctIndex": 2,
                    "explanation": "java.lang.Enum<E> implements Comparable<E>, and its compareTo() method compares the ordinal values (declaration order). Constants declared earlier come before constants declared later."
          },
          {
                    "id": "comparable-mastery-q9",
                    "question": "What is the contract requirement for compareTo when comparing against null (e.g., x.compareTo(null))?",
                    "options": [
                              "It should return 1",
                              "It should return -1",
                              "It must throw a NullPointerException",
                              "It should return 0"
                    ],
                    "correctIndex": 2,
                    "explanation": "By contract in the Java Language Specification, any call to x.compareTo(null) must throw a NullPointerException, because null is not an instance of any class."
          },
          {
                    "id": "comparable-mastery-q10",
                    "question": "How can modern Java 8+ Comparator methods be cleanly leveraged to implement compareTo() across multiple fields?",
                    "options": [
                              "return Comparator.comparing(Employee::getDept).thenComparing(Employee::getName).compare(this, other);",
                              "return this.dept - other.dept && this.name - other.name;",
                              "return Collections.sort(this, other);",
                              "return this.compareTo(other, Employee::getDept);"
                    ],
                    "correctIndex": 0,
                    "explanation": "Using static Comparator builder methods like Comparator.comparing(Employee::getDept).thenComparing(Employee::getName).compare(this, other) is the most readable, maintainable, and null-safe way to implement multi-field compareTo."
          },
          {
                    "id": "comparable-mastery-q11",
                    "question": "What will Collections.binarySearch(list, key) return if the element is NOT present in the sorted list?",
                    "options": [
                              "null",
                              "-1 always",
                              "(-(insertion point) - 1), a negative integer representing where the element would fit",
                              "Throws NoSuchElementException"
                    ],
                    "correctIndex": 2,
                    "explanation": "If the search key is not found, Collections.binarySearch returns (-(insertion point) - 1). The insertion point is the index at which the key would be inserted into the sorted list to maintain sorted order."
          },
          {
                    "id": "comparable-mastery-q12",
                    "question": "What happens if you attempt to call Collections.sort(list) on a List of objects that do NOT implement Comparable?",
                    "options": [
                              "The JVM sorts them using their toString() representation",
                              "A compile-time error occurs because Collections.sort(List<T>) requires <T extends Comparable<? super T>>",
                              "The list is reversed",
                              "A ClassCastException is thrown only at runtime"
                    ],
                    "correctIndex": 1,
                    "explanation": "Collections.sort(List<T>) has the generic bound <T extends Comparable<? super T>>. If the elements in the list do not implement Comparable, the code will not compile."
          },
          {
                    "id": "comparable-mastery-q13",
                    "question": "Can a modern Java record implement the Comparable interface?",
                    "options": [
                              "No, records cannot implement any interfaces",
                              "Yes, records can implement Comparable<T> and provide a custom compareTo() implementation comparing its components",
                              "Records implement Comparable automatically by sorting all fields alphabetically",
                              "Only records with primitive components can implement Comparable"
                    ],
                    "correctIndex": 1,
                    "explanation": "Records in Java can implement any interface, including Comparable<T>. They provide canonical accessors for components, making compareTo() implementations straightforward and concise."
          },
          {
                    "id": "comparable-mastery-q14",
                    "question": "What is the output of the following code?\n\nList<String> list = new ArrayList<>(List.of(\"banana\", \"Apple\", \"cherry\", \"apple\"));\nCollections.sort(list);\nSystem.out.println(list.get(0) + \" \" + list.get(1));",
                    "options": [
                              "\"apple Apple\"",
                              "\"Apple apple\"",
                              "\"Apple banana\"",
                              "\"apple banana\""
                    ],
                    "correctIndex": 2,
                    "explanation": "In Unicode lexicographical order, uppercase letters ('A'=65) precede lowercase letters ('a'=97, 'b'=98). Thus, \"Apple\" comes first (index 0), followed by \"banana\" (index 1), \"apple\" (index 2), and \"cherry\" (index 3). Output is \"Apple banana\"."
          },
          {
                    "id": "comparable-mastery-q15",
                    "question": "How does PriorityQueue<E> behave by default when no Comparator is supplied in its constructor?",
                    "options": [
                              "It acts as a FIFO queue (first-in, first-out)",
                              "It acts as a min-heap that organizes elements according to their natural ordering defined by Comparable",
                              "It throws an IllegalArgumentException",
                              "It sorts elements in reverse natural order"
                    ],
                    "correctIndex": 1,
                    "explanation": "PriorityQueue without an explicit Comparator creates a min-heap based on the natural ordering of its elements. Elements must implement Comparable, and the head of the queue is the least element with respect to the specified ordering."
          }
]
        }
      ]
    },

    /* ==========================================================================
       TOPIC 74: Java Comparator
       ========================================================================== */
    {
      id: "java-comparator",
      title: "74. Java Comparator",
      description: "Mastering java.util.Comparator<T>: external comparison strategies, functional interface mechanics, Java 8+ composition APIs (comparing, thenComparing, reversed, nullsFirst, nullsLast), sorting collections and streams, and comparing Comparable vs Comparator architectural trade-offs.",
      lessons: [
        {
          id: "java-comparator-mastery",
          title: "Complete Guide to Java Comparator Interface",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "External Ordering & Functional Composition (هندسة المقارن الخارجي والتركيب الوظيفي في Comparator)"
            },
            {
              type: "paragraph",
              text: "While 'Comparable' defines an object's single 'natural' internal ordering, 'java.util.Comparator<T>' defines an 'external' comparison strategy. This enables sorting objects by multiple different criteria without altering their source code, sorting third-party classes you cannot edit, or overriding the natural ordering on the fly. In Java 8, Comparator was transformed into a powerful '@FunctionalInterface' enriched with numerous static and default methods: 'Comparator.comparing()', 'thenComparing()', 'reversed()', 'nullsFirst()', and 'nullsLast()'. These methods allow chaining complex multi-tiered sorting logic into declarative, readable one-line pipelines."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "في حين تحدد واجهة 'Comparable' ترتيباً طبيعياً داخلياً واحداً للكائن، توفر واجهة 'java.util.Comparator<T>' استراتيجية مقارنة 'خارجية'. يتيح لك هذا فرز الكائنات بمعايير متعددة ومختلفة دون الحاجة لتعديل الكود المصدري للفئة، أو فرز فئات من مكتبات خارجية لا تملك صلاحية تعديلها، أو تجاوز الترتيب الطبيعي عند الحاجة. وفي جافا 8، تحولت Comparator إلى واجهة وظيفية خارقة مدعومة بدوال تجميعية مثل comparing و thenComparing و reversed و nullsFirst؛ مما يسمح ببناء سلاسل فرز معقدة ومتعددة المستويات بأسلوب وظيفي مقروء وسهل الصيانة."
            },
            {
              type: "paragraph",
              text: "Comparable vs Comparator Matrix: 1) Package: Comparable is in java.lang; Comparator is in java.util; 2) Signature: Comparable has compareTo(T o); Comparator has compare(T o1, T o2); 3) Multiplicity: A class can have only ONE natural Comparable ordering, but INFINITE custom Comparators; 4) Modifiability: Comparable requires modifying the target class; Comparator requires no modifications."
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
              text: "Example 1: Classic Anonymous Comparator (المثال 1: تطبيق المقارن التقليدي عبر الفئات المجهولة)"
            },
            {
              type: "paragraph",
              text: "Sorting cars by price using a dedicated Comparator."
            },
            {
              type: "code",
              language: "java",
              filename: "ClassicComparatorDemo.java",
              code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class ClassicComparatorDemo {
    static class Car {
        final String model;
        final double price;

        Car(String model, double price) { this.model = model; this.price = price; }

        @Override
        public String toString() { return model + " ($" + price + ")"; }
    }

    public static void main(String[] args) {
        List<Car> cars = new ArrayList<>(List.of(
            new Car("Sedan", 28000.0),
            new Car("SUV", 42000.0),
            new Car("Hatchback", 19500.0)
        ));

        // Define external comparator by price
        Comparator<Car> priceComparator = new Comparator<>() {
            @Override
            public int compare(Car c1, Car c2) {
                return Double.compare(c1.price, c2.price);
            }
        };

        Collections.sort(cars, priceComparator);
        System.out.println("Cars sorted by Price: " + cars);
    }
}`,
              output: `Cars sorted by Price: [Hatchback ($19500.0), Sedan ($28000.0), SUV ($42000.0)]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "Comparator<T> provides compare(o1, o2) externally, sorting Car objects without altering the Car class."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "توفر Comparator دالة compare(o1, o2) خارجياً لترتيب كائنات Car دون الحاجة لتعديل الفئة نفسها."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Modern Lambda Comparator (المثال 2: المقارن بدوال لامدا المقتضبة)"
            },
            {
              type: "paragraph",
              text: "Simplifying comparator declaration with lambda expressions."
            },
            {
              type: "code",
              language: "java",
              filename: "LambdaComparatorDemo.java",
              code: `import java.util.ArrayList;
import java.util.List;

public class LambdaComparatorDemo {
    public static void main(String[] args) {
        List<String> words = new ArrayList<>(List.of("Elephant", "Cat", "Hippopotamus", "Dog"));

        // Sort by string length using concise lambda
        words.sort((s1, s2) -> Integer.compare(s1.length(), s2.length()));

        System.out.println("Sorted by length (shortest first): " + words);
    }
}`,
              output: `Sorted by length (shortest first): [Cat, Dog, Elephant, Hippopotamus]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "Because Comparator is a functional interface, it can be expressed as a concise two-argument lambda expression."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "نظراً لأن Comparator واجهة وظيفية، يمكن التعبير عنها بتعبير لامدا مقتضب يستقبل معاملين."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Comparator.comparing() Factory (المثال 3: استخدام دالة المصنع Comparator.comparing)"
            },
            {
              type: "paragraph",
              text: "Using method references with Comparator.comparing."
            },
            {
              type: "code",
              language: "java",
              filename: "ComparingFactoryDemo.java",
              code: `import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class ComparingFactoryDemo {
    record User(String username, int age) {}

    public static void main(String[] args) {
        List<User> users = new ArrayList<>(List.of(
            new User("Zaid", 32),
            new User("Amina", 24),
            new User("Bilal", 29)
        ));

        // Sort by username using method reference
        users.sort(Comparator.comparing(User::username));
        System.out.println("Sorted by Username: " + users);

        // Specialized primitive factory avoids autoboxing: comparingInt
        users.sort(Comparator.comparingInt(User::age));
        System.out.println("Sorted by Age:      " + users);
    }
}`,
              output: `Sorted by Username: [User[username=Amina, age=24], User[username=Bilal, age=29], User[username=Zaid, age=32]]
Sorted by Age:      [User[username=Amina, age=24], User[username=Bilal, age=29], User[username=Zaid, age=32]]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "Comparator.comparing() extracts a key for sorting; comparingInt() avoids primitive boxing overhead."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "تستخرج Comparator.comparing مفتاح الفرز تلقائياً؛ بينما تمنع comparingInt هدر تحويل الأرقام البدائية."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Multi-Level Chaining with thenComparing() (المثال 4: السلاسل متعددة المستويات عبر thenComparing)"
            },
            {
              type: "paragraph",
              text: "Chaining primary, secondary, and tertiary sorting criteria effortlessly."
            },
            {
              type: "code",
              language: "java",
              filename: "ChainedComparatorDemo.java",
              code: `import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class ChainedComparatorDemo {
    record Employee(String department, String name, double salary) {}

    public static void main(String[] args) {
        List<Employee> team = new ArrayList<>(List.of(
            new Employee("Sales", "David", 60000.0),
            new Employee("IT", "Charlie", 90000.0),
            new Employee("IT", "Alice", 85000.0),
            new Employee("IT", "Bob", 85000.0)
        ));

        // Chain: 1. Department -> 2. Salary Descending -> 3. Name Alphabetical
        Comparator<Employee> multiSorter = Comparator
                .comparing(Employee::department)
                .thenComparing(Comparator.comparingDouble(Employee::salary).reversed())
                .thenComparing(Employee::name);

        team.sort(multiSorter);

        System.out.println("Multi-tier sorted employees:");
        team.forEach(e -> System.out.println(" * " + e.department() + " | $" + e.salary() + " | " + e.name()));
    }
}`,
              output: `Multi-tier sorted employees:
 * IT | $90000.0 | Charlie
 * IT | $85000.0 | Alice
 * IT | $85000.0 | Bob
 * Sales | $60000.0 | David`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "thenComparing() resolves ties smoothly by delegating to the next comparator in the chain."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "تفض thenComparing حالات التعادل بسلاسة بتمريرها للمقارن التالي في السلسلة دون شروط if متداخلة."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Inverting Order with reversed() (المثال 5: عكس ترتيب الفرز عبر reversed)"
            },
            {
              type: "paragraph",
              text: "Inverting any comparator's logic with a single method call."
            },
            {
              type: "code",
              language: "java",
              filename: "ReversedComparatorDemo.java",
              code: `import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class ReversedComparatorDemo {
    public static void main(String[] args) {
        List<Integer> numbers = new ArrayList<>(List.of(5, 2, 8, 1, 9));

        // Natural ascending order
        numbers.sort(Comparator.naturalOrder());
        System.out.println("Ascending:  " + numbers);

        // Inverted descending order
        numbers.sort(Comparator.<Integer>naturalOrder().reversed());
        System.out.println("Descending: " + numbers);
    }
}`,
              output: `Ascending:  [1, 2, 5, 8, 9]
Descending: [9, 8, 5, 2, 1]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "reversed() returns a new comparator that flips the sign of the original comparison result."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "تُرجع reversed مقارناً جديداً يعكس إشارة المقارنة الأصلية ليقلب الترتيب تنازلياً."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Null-Safe Sorting with nullsFirst() and nullsLast() (المثال 6: الفرز الآمن للقيم الفارغة null)"
            },
            {
              type: "paragraph",
              text: "Preventing NullPointerException during sorting by positioning nulls explicitly."
            },
            {
              type: "code",
              language: "java",
              filename: "NullSafeComparatorDemo.java",
              code: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

public class NullSafeComparatorDemo {
    public static void main(String[] args) {
        List<String> values = Arrays.asList("Banana", null, "Apple", null, "Cherry");

        // 1. nullsFirst: push nulls to the top, remaining sorted naturally
        values.sort(Comparator.nullsFirst(Comparator.naturalOrder()));
        System.out.println("nullsFirst: " + values);

        // 2. nullsLast: push nulls to the end
        values.sort(Comparator.nullsLast(Comparator.naturalOrder()));
        System.out.println("nullsLast:  " + values);
    }
}`,
              output: `nullsFirst: [null, null, Apple, Banana, Cherry]
nullsLast:  [Apple, Banana, Cherry, null, null]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "nullsFirst and nullsLast guard against NullPointerExceptions by handling null comparisons gracefully."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "تحمي nullsFirst و nullsLast التطبيق من الانهيار بنقل قيم null إلى البداية أو النهاية بأمان تام."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Custom Comparator in TreeSet and TreeMap (المثال 7: تمرير المقارن لمنشئ TreeSet و TreeMap)"
            },
            {
              type: "paragraph",
              text: "Supplying custom sorting order at collection instantiation time."
            },
            {
              type: "code",
              language: "java",
              filename: "TreeCollectionCustomComparatorDemo.java",
              code: `import java.util.Comparator;
import java.util.TreeSet;

public class TreeCollectionCustomComparatorDemo {
    public static void main(String[] args) {
        // Create TreeSet sorted by String length descending, then alphabetically
        Comparator<String> customOrder = Comparator
                .comparingInt(String::length).reversed()
                .thenComparing(Comparator.naturalOrder());

        TreeSet<String> words = new TreeSet<>(customOrder);
        words.add("ant");
        words.add("butterfly");
        words.add("bee");
        words.add("caterpillar");

        System.out.println("Custom-ordered TreeSet (Longest words first):");
        for (String w : words) {
            System.out.println(" [" + w.length() + " chars] " + w);
        }
    }
}`,
              output: `Custom-ordered TreeSet (Longest words first):
 [11 chars] caterpillar
 [9 chars] butterfly
 [3 chars] ant
 [3 chars] bee`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "TreeSet and TreeMap accept a Comparator in their constructor to govern key placement and ordering."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "يقبل منشئ TreeSet و TreeMap مقارناً مخصصاً لتحديد مسار تفرع شجرة البحث وترتيب العناصر."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Sorting Stream Pipelines with sorted(comparator) (المثال 8: فرز مسارات التدفقات بالـ Stream API)"
            },
            {
              type: "paragraph",
              text: "Sorting streams non-destructively."
            },
            {
              type: "code",
              language: "java",
              filename: "StreamSortingDemo.java",
              code: `import java.util.Comparator;
import java.util.List;

public class StreamSortingDemo {
    public static void main(String[] args) {
        List<String> cities = List.of("Casablanca", "Riyadh", "Alexandria", "Doha");

        // Sort stream by length descending without modifying original list
        List<String> sortedCities = cities.stream()
                .sorted(Comparator.comparingInt(String::length).reversed())
                .toList();

        System.out.println("Original list: " + cities);
        System.out.println("Sorted stream: " + sortedCities);
    }
}`,
              output: `Original list: [Casablanca, Riyadh, Alexandria, Doha]
Sorted stream: [Casablanca, Alexandria, Riyadh, Doha]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "Stream.sorted(comparator) produces a new sorted sequence without mutating the source collection."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "تنتج stream.sorted تدفقاً جديداً مرتباً دون إحداث أي تعديل على القائمة الأصلية."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Case-Insensitive String Sorting (المثال 9: فرز النصوص دون تحسس لحالة الأحرف)"
            },
            {
              type: "paragraph",
              text: "Using String.CASE_INSENSITIVE_ORDER comparator."
            },
            {
              type: "code",
              language: "java",
              filename: "CaseInsensitiveSortDemo.java",
              code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class CaseInsensitiveSortDemo {
    public static void main(String[] args) {
        List<String> files = new ArrayList<>(List.of("zebra.txt", "Apple.txt", "banana.txt", "ORANGE.txt"));

        // 1. Natural Sort: Uppercase letters come before lowercase in ASCII!
        Collections.sort(files);
        System.out.println("Natural ASCII Sort:        " + files);

        // 2. Case Insensitive Sort
        files.sort(String.CASE_INSENSITIVE_ORDER);
        System.out.println("Case-Insensitive Sort:     " + files);
    }
}`,
              output: `Natural ASCII Sort:        [Apple.txt, ORANGE.txt, banana.txt, zebra.txt]
Case-Insensitive Sort:     [Apple.txt, banana.txt, ORANGE.txt, zebra.txt]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "String.CASE_INSENSITIVE_ORDER avoids uppercase characters unnaturally preceding lowercase ones."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "يمنع String.CASE_INSENSITIVE_ORDER تقدم الحروف الكبيرة في ASCII على الحروف الصغيرة دون داع."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Performance Optimization with primitive comparators (المثال 10: تحسين الأداء بمقارنات الأرقام الأولية)"
            },
            {
              type: "paragraph",
              text: "Benchmarking comparingInt vs comparing with autoboxing."
            },
            {
              type: "code",
              language: "java",
              filename: "PrimitiveComparatorBenchmarkDemo.java",
              code: `import java.util.ArrayList;
import java.util.Comparator;

public class PrimitiveComparatorBenchmarkDemo {
    static class Packet {
        final int id;
        Packet(int id) { this.id = id; }
        int getId() { return id; }
    }

    public static void main(String[] args) {
        int count = 500_000;
        ArrayList<Packet> list1 = new ArrayList<>(count);
        ArrayList<Packet> list2 = new ArrayList<>(count);
        for (int i = count; i > 0; i--) {
            list1.add(new Packet(i));
            list2.add(new Packet(i));
        }

        // 1. comparing (boxes int to Integer in Function<T, Integer>)
        long start1 = System.currentTimeMillis();
        list1.sort(Comparator.comparing(Packet::getId));
        long time1 = System.currentTimeMillis() - start1;

        // 2. comparingInt (uses ToIntFunction: ZERO BOXING!)
        long start2 = System.currentTimeMillis();
        list2.sort(Comparator.comparingInt(Packet::getId));
        long time2 = System.currentTimeMillis() - start2;

        System.out.println("comparing() time (with boxing):        " + time1 + " ms");
        System.out.println("comparingInt() time (zero boxing):     " + time2 + " ms");
        System.out.println("comparingInt is faster or equal:       " + (time2 <= time1));
    }
}`,
              output: `comparing() time (with boxing):        132 ms
comparingInt() time (zero boxing):     98 ms
comparingInt is faster or equal:       true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "comparingInt() uses ToIntFunction to eliminate Integer wrapper object allocations during massive sorts."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "تستخدم comparingInt واجهة ToIntFunction لتلغي إنشاء كائنات Integer المؤقتة وتوفر الذاكرة والوقت."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Finding Min and Max via Collections.max(list, comparator) (المثال 11: استخراج الأدنى والأعلى بالمقارن)"
            },
            {
              type: "paragraph",
              text: "Extracting extreme elements without sorting the entire collection."
            },
            {
              type: "code",
              language: "java",
              filename: "MinMaxComparatorDemo.java",
              code: `import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class MinMaxComparatorDemo {
    record Product(String name, double rating) {}

    public static void main(String[] args) {
        List<Product> catalog = List.of(
            new Product("Camera", 4.8),
            new Product("Keyboard", 4.2),
            new Product("Monitor", 4.9),
            new Product("Mouse", 3.9)
        );

        Comparator<Product> ratingComparator = Comparator.comparingDouble(Product::rating);

        Product topRated = Collections.max(catalog, ratingComparator);
        Product lowestRated = Collections.min(catalog, ratingComparator);

        System.out.println("Top Rated Product:    " + topRated);
        System.out.println("Lowest Rated Product: " + lowestRated);
    }
}`,
              output: `Top Rated Product:    Product[name=Monitor, rating=4.9]
Lowest Rated Product: Product[name=Mouse, rating=3.9]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "Collections.max and Collections.min evaluate candidates in O(n) linear time using the supplied comparator without the O(n log n) cost of full sorting."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "تستخرج Collections.max و min العنصر الأقصى بزمن خطي O(n) دون تكلفة الفرز الكامل الباهظة O(n log n)."
            },

            /* Common Mistakes */
            {
              type: "heading",
              level: 2,
              text: "Common Mistakes & Important Notes (أخطاء شائعة وملاحظات مهمة)"
            },
            {
              type: "list",
              ordered: false,
              items: [
                "Mistake 1: Confusing Comparable (in java.lang, compareTo(T o)) with Comparator (in java.util, compare(T o1, T o2)).",
                "خطأ 1: الخلط بين Comparable (في java.lang ودالتها compareTo) و Comparator (في java.util ودالتها compare).",
                "Mistake 2: Forgetting to handle null values in lists, leading to NullPointerException during sort. Always wrap with Comparator.nullsFirst() or nullsLast().",
                "خطأ 2: نسيان احتمال وجود عناصر فارغة null؛ مما يرمي استثناء NullPointerException. استخدم دائماً nullsFirst أو nullsLast.",
                "Mistake 3: Using 'comparing()' for primitives instead of specialized 'comparingInt()' or 'comparingDouble()', causing unnecessary autoboxing overhead."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Multi-Tier Flight Search Sorter (التحدي العملي: محرك فرز تذاكر الطيران متعدد المعايير)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Create a class 'Flight' with airline, price, durationMinutes, and stops. Implement a static method 'buildFlightComparator(String preference)' returning: 1) If preference is 'CHEAPEST': sort by price asc, then duration asc; 2) If preference is 'FASTEST': sort by duration asc, then price asc; 3) If preference is 'BEST': sort by stops asc, then price asc, then duration asc. Test with sample flights in main()."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: صمم فئة Flight تحتوي على (شركة الطيران، السعر، مدة الرحلة بالدقائق، عدد التوقفات). صمم دالة ثابتة buildFlightComparator تبني مقارناً حسب رغبة العميل: 1) 'CHEAPEST': الأرخص سعراً ثم الأقصر مدة؛ 2) 'FASTEST': الأسرع مدة ثم الأرخص؛ 3) 'BEST': الأقل توقفات ثم الأرخص ثم الأقصر مدة. اختبرها في main واطبع النتائج."
            },
            {
              type: "code",
              language: "java",
              filename: "FlightSorterChallenge.java",
              code: `import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class FlightSorterChallenge {
    record Flight(String flightNo, double price, int durationMinutes, int stops) {}

    public static Comparator<Flight> buildFlightComparator(String preference) {
        return switch (preference.toUpperCase()) {
            case "CHEAPEST" -> Comparator.comparingDouble(Flight::price)
                                         .thenComparingInt(Flight::durationMinutes);
            case "FASTEST"  -> Comparator.comparingInt(Flight::durationMinutes)
                                         .thenComparingDouble(Flight::price);
            case "BEST"     -> Comparator.comparingInt(Flight::stops)
                                         .thenComparingDouble(Flight::price)
                                         .thenComparingInt(Flight::durationMinutes);
            default         -> Comparator.comparing(Flight::flightNo);
        };
    }

    public static void main(String[] args) {
        List<Flight> flights = new ArrayList<>(List.of(
            new Flight("SV-101", 350.0, 360, 1),
            new Flight("EK-202", 480.0, 240, 0),
            new Flight("QR-303", 310.0, 420, 1),
            new Flight("MS-404", 480.0, 260, 0)
        ));

        // 1. Sort by CHEAPEST
        flights.sort(buildFlightComparator("CHEAPEST"));
        System.out.println("--- Sort by CHEAPEST ---");
        flights.forEach(f -> System.out.println(" * " + f.flightNo() + ": $" + f.price() + ", " + f.durationMinutes() + " min"));

        // 2. Sort by FASTEST
        flights.sort(buildFlightComparator("FASTEST"));
        System.out.println("--- Sort by FASTEST ---");
        flights.forEach(f -> System.out.println(" * " + f.flightNo() + ": " + f.durationMinutes() + " min, $" + f.price()));

        // 3. Sort by BEST (Stops -> Price -> Duration)
        flights.sort(buildFlightComparator("BEST"));
        System.out.println("--- Sort by BEST ---");
        flights.forEach(f -> System.out.println(" * " + f.flightNo() + ": " + f.stops() + " stops, $" + f.price()));
    }
}`,
              output: `--- Sort by CHEAPEST ---
 * QR-303: $310.0, 420 min
 * SV-101: $350.0, 360 min
 * EK-202: $480.0, 240 min
 * MS-404: $480.0, 260 min
--- Sort by FASTEST ---
 * EK-202: 240 min, $480.0
 * MS-404: 260 min, $480.0
 * SV-101: 360 min, $350.0
 * QR-303: 420 min, $310.0
--- Sort by BEST ---
 * EK-202: 0 stops, $480.0
 * MS-404: 0 stops, $480.0
 * QR-303: 1 stops, $310.0
 * SV-101: 1 stops, $350.0`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "Comparator chaining with switch expressions creates a versatile flight sorting engine with composable tie-breaking criteria."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "يجمع الحل بين سلاسل Comparator ودوال switch لإنشاء محرك مرن يفرز رحلات الطيران بحسب رغبة المستخدم بكل دقة."
            }
          ],
          quiz: [
          {
                    "id": "comparator-mastery-q1",
                    "question": "What is the primary difference between the Comparable and Comparator interfaces in Java?",
                    "options": [
                              "Comparable is used for lists, while Comparator is used for sets",
                              "Comparable defines an object's single 'natural' internal ordering (via compareTo within the class), while Comparator defines external, multiple custom sorting strategies without modifying the class",
                              "Comparator is obsolete and replaced entirely by Streams",
                              "Comparable only works with primitive types"
                    ],
                    "correctIndex": 1,
                    "explanation": "Comparable is implemented internally by a class to define its default 'natural' sort order (compareTo). Comparator is an external strategy interface that can be defined as lambdas or separate classes to sort objects according to multiple alternative criteria without modifying the class source code."
          },
          {
                    "id": "comparator-mastery-q2",
                    "question": "What is the single abstract method (SAM) defined in java.util.Comparator that makes it a functional interface?",
                    "options": [
                              "int compare(T o1, T o2)",
                              "int compareTo(T o)",
                              "boolean test(T o1, T o2)",
                              "void sort(T o1, T o2)"
                    ],
                    "correctIndex": 0,
                    "explanation": "The single abstract method of Comparator<T> is 'int compare(T o1, T o2)'. Although Comparator also declares equals(Object), methods overriding java.lang.Object public methods do not count toward a functional interface's abstract method count."
          },
          {
                    "id": "comparator-mastery-q3",
                    "question": "How do you create a lambda-based Comparator to sort a List of Students by descending grade?",
                    "options": [
                              "(s1, s2) -> Integer.compare(s1.getGrade(), s2.getGrade())",
                              "(s1, s2) -> Integer.compare(s2.getGrade(), s1.getGrade())",
                              "(s1, s2) -> s1.getGrade() - s2.getGrade()",
                              "s -> s.getGrade().reversed()"
                    ],
                    "correctIndex": 1,
                    "explanation": "Inverting the arguments (s2.getGrade(), s1.getGrade()) inside Integer.compare creates a descending comparator without risk of integer overflow. Alternatively, Comparator.comparing(Student::getGrade).reversed() can be used."
          },
          {
                    "id": "comparator-mastery-q4",
                    "question": "Why are primitive comparator extractors like Comparator.comparingInt() preferred over Comparator.comparing() when comparing primitive fields?",
                    "options": [
                              "comparing() fails to compile with primitive getters",
                              "comparingInt() uses ToIntFunction and primitive int comparison, eliminating the performance and memory overhead of autoboxing each primitive into an Integer object",
                              "comparingInt() is thread-safe while comparing() is not",
                              "comparingInt() allows negative values, while comparing() does not"
                    ],
                    "correctIndex": 1,
                    "explanation": "Comparator.comparing(Person::getAge) maps to Function<Person, Integer>, boxing every int into an Integer wrapper. Comparator.comparingInt(Person::getAge) uses ToIntFunction<Person>, comparing raw primitives directly and avoiding boxing overhead during tight sorting loops."
          },
          {
                    "id": "comparator-mastery-q5",
                    "question": "How do you chain comparators so that items are sorted primarily by department, and secondarily by salary in descending order?",
                    "options": [
                              "Comparator.comparing(Employee::getDept).thenComparing(Comparator.comparing(Employee::getSalary).reversed())",
                              "Comparator.comparing(Employee::getDept).and(Employee::getSalary)",
                              "Comparator.comparing(Employee::getDept, Employee::getSalary)",
                              "Comparator.comparing(Employee::getDept).reversed(Employee::getSalary)"
                    ],
                    "correctIndex": 0,
                    "explanation": "thenComparing() chains a secondary comparator invoked whenever the primary comparator returns 0. Chaining with Comparator.comparing(Employee::getSalary).reversed() cleanly sorts salaries in descending order as the secondary tie-breaker."
          },
          {
                    "id": "comparator-mastery-q6",
                    "question": "What is the purpose of Comparator.nullsFirst() and Comparator.nullsLast()?",
                    "options": [
                              "They remove null elements from the collection before sorting",
                              "They create null-friendly comparators that treat null references as less than (nullsFirst) or greater than (nullsLast) non-null elements, avoiding NullPointerException during comparisons",
                              "They replace null values with empty default objects",
                              "They throw an exception if nulls are detected"
                    ],
                    "correctIndex": 1,
                    "explanation": "Standard comparators throw NullPointerException when encountering null elements. Comparator.nullsFirst(comp) and nullsLast(comp) place null elements safely at the beginning or end of the sorted sequence."
          },
          {
                    "id": "comparator-mastery-q7",
                    "question": "What will the following code output?\n\nList<String> list = new ArrayList<>(Arrays.asList(\"banana\", null, \"apple\"));\nlist.sort(Comparator.nullsFirst(Comparator.naturalOrder()));\nSystem.out.println(list);",
                    "options": [
                              "[null, apple, banana]",
                              "[apple, banana, null]",
                              "Throws NullPointerException",
                              "[banana, apple, null]"
                    ],
                    "correctIndex": 0,
                    "explanation": "Comparator.nullsFirst ensures that null precedes all non-null values. The remaining non-null elements (\"apple\", \"banana\") are sorted according to natural order. Output: [null, apple, banana]."
          },
          {
                    "id": "comparator-mastery-q8",
                    "question": "How does passing a custom Comparator to the constructor of TreeSet or TreeMap affect their behavior?",
                    "options": [
                              "It only affects elements added after construction",
                              "The collection will order keys and test for key uniqueness strictly using the supplied Comparator rather than the keys' Comparable.compareTo() or equals() methods",
                              "The collection falls back to equals() if the comparator returns 0",
                              "It converts the tree into a hash table"
                    ],
                    "correctIndex": 1,
                    "explanation": "Passing a Comparator to new TreeSet<>(comparator) or new TreeMap<>(comparator) causes the collection to use that Comparator for all node comparisons and uniqueness checks. Two elements are considered duplicate keys if comparator.compare(a, b) == 0."
          },
          {
                    "id": "comparator-mastery-q9",
                    "question": "What exception can be thrown by TimSort (Arrays.sort or List.sort) if a custom Comparator violates the transitivity or anti-symmetry rules of the Comparator contract?",
                    "options": [
                              "IllegalStateException",
                              "IllegalArgumentException: Comparison method violates its general contract!",
                              "ConcurrentModificationException",
                              "ArrayIndexOutOfBoundsException"
                    ],
                    "correctIndex": 1,
                    "explanation": "Java's sorting algorithm (TimSort) verifies that comparators adhere to mathematical equivalence and transitivity relations. If a comparator violates these rules (for example, if compare(a, b) and compare(b, a) do not have opposite signs), TimSort detects an inconsistency and throws IllegalArgumentException: Comparison method violates its general contract!"
          },
          {
                    "id": "comparator-mastery-q10",
                    "question": "What is the output of the following code?\n\nList<String> words = new ArrayList<>(List.of(\"pie\", \"banana\", \"kiwi\"));\nwords.sort(Comparator.comparingInt(String::length));\nSystem.out.println(words);",
                    "options": [
                              "[banana, kiwi, pie]",
                              "[pie, kiwi, banana]",
                              "[kiwi, pie, banana]",
                              "[banana, pie, kiwi]"
                    ],
                    "correctIndex": 1,
                    "explanation": "String lengths are: \"pie\" (3), \"kiwi\" (4), \"banana\" (6). Sorting by length in ascending order yields [pie, kiwi, banana]."
          },
          {
                    "id": "comparator-mastery-q11",
                    "question": "How do you find the maximum element of a List<Person> by age using Collections.max()?",
                    "options": [
                              "Collections.max(people, Comparator.comparingInt(Person::getAge));",
                              "people.max(Person::getAge);",
                              "Collections.max(people).getAge();",
                              "Comparator.max(people, Person::getAge);"
                    ],
                    "correctIndex": 0,
                    "explanation": "Collections.max(Collection<? extends T> coll, Comparator<? super T> comp) iterates the collection and returns the greatest element according to the supplied comparator in O(n) time."
          },
          {
                    "id": "comparator-mastery-q12",
                    "question": "What does Comparator.reverseOrder() provide?",
                    "options": [
                              "A comparator that reverses the order of any arbitrary array in place",
                              "A comparator that imposes the reverse of the natural ordering on Comparable objects",
                              "A comparator that sorts strings from right to left",
                              "A comparator that generates random order"
                    ],
                    "correctIndex": 1,
                    "explanation": "Comparator.reverseOrder() returns a comparator that inverts the natural ordering of objects that implement Comparable (equivalent to Collections.reverseOrder())."
          },
          {
                    "id": "comparator-mastery-q13",
                    "question": "What is the output of the following code?\n\nList<String> list = new ArrayList<>(List.of(\"b\", \"A\", \"C\", \"a\"));\nlist.sort(String.CASE_INSENSITIVE_ORDER);\nSystem.out.println(list.get(0).equalsIgnoreCase(\"a\"));",
                    "options": [
                              "false",
                              "true",
                              "Throws ClassCastException",
                              "Throws NullPointerException"
                    ],
                    "correctIndex": 1,
                    "explanation": "String.CASE_INSENSITIVE_ORDER ignores casing. The letter 'A'/'a' comes before 'b' and 'C'. Therefore, index 0 is either \"A\" or \"a\", and calling equalsIgnoreCase(\"a\") returns true."
          },
          {
                    "id": "comparator-mastery-q14",
                    "question": "Can a Comparator be passed to Stream.sorted() in the Java Stream API?",
                    "options": [
                              "No, streams only support natural ordering",
                              "Yes, stream.sorted(comparator) produces a stream sorted according to the provided comparator",
                              "Yes, but only if the stream is parallel",
                              "Only if the comparator is an anonymous inner class"
                    ],
                    "correctIndex": 1,
                    "explanation": "Stream.sorted(Comparator<? super T> comparator) is an intermediate operation that returns a stream with elements sorted according to the specified comparator."
          },
          {
                    "id": "comparator-mastery-q15",
                    "question": "Analyze the following code snippet:\n\nList<Integer> nums = new ArrayList<>(List.of(5, 2, 8, 1, 9));\nComparator<Integer> comp = Comparator.naturalOrder();\nnums.sort(comp.reversed());\nSystem.out.println(nums.get(0) + \" \" + nums.get(nums.size() - 1));",
                    "options": [
                              "\"1 9\"",
                              "\"9 1\"",
                              "\"5 9\"",
                              "\"2 8\""
                    ],
                    "correctIndex": 1,
                    "explanation": "Comparator.naturalOrder() sorts ascending [1, 2, 5, 8, 9]. Calling .reversed() inverts it to descending [9, 8, 5, 2, 1]. The first element (index 0) is 9, and the last element is 1. Output is \"9 1\"."
          }
]
        }
      ]
    }
  ];
})();
