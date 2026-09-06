/**
 * Java Curriculum Module - Part 29
 * Topics:
 * 57. Java Collections
 * 58. Java List
 * 
 * 100% Offline, Pure JavaScript. Complete educational content with full bilingual (English & Arabic) explanations.
 */

(function () {
  'use strict';

  window.JAVA_TOPICS_PART29 = [
    /* ==========================================================================
       TOPIC 57: Java Collections
       ========================================================================== */
    {
      id: "java-collections",
      title: "57. Java Collections",
      description: "Mastering the Java Collections Framework (JCF): Iterable, Collection, List, Set, Queue, Deque, Map hierarchy, Collections utility algorithms (sort, shuffle, reverse, binarySearch, unmodifiable), thread safety, bulk operations, and modern immutable factories.",
      lessons: [
        {
          id: "java-collections-mastery",
          title: "Complete Guide to Java Collections Framework",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "The Java Collections Framework (JCF) Architecture (هيكلية إطار مجموعات جافا JCF)"
            },
            {
              type: "paragraph",
              text: "The Java Collections Framework (JCF) is a unified architecture for representing and manipulating collections of objects, independent of implementation details. Rooted at the 'Iterable<T>' and 'Collection<T>' interfaces, the framework branches into three primary sub-interfaces: 'List' (ordered, index-accessible, allows duplicates), 'Set' (unique elements, no duplicates), and 'Queue/Deque' (FIFO/LIFO ordering for processing pipelines). Note that 'Map<K, V>' (key-value associations) forms its own distinct hierarchy and does not implement Collection, yet integrates seamlessly via entrySet(), keySet(), and values()."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "يُعد إطار مجموعات جافا (JCF) بنية موحدة ومتقدمة لإدارة مجموعات الكائنات في الذاكرة بمعزل عن تفاصيل التنفيذ الداخلي. يبدأ الإطار من واجهتي 'Iterable' و 'Collection'، ويتفرع إلى ثلاث واجهات رئيسية: 1) القوائم 'List' (مرتبة وتقبل التكرار ومفهرسة)، 2) المجموعات 'Set' (عناصر فريدة تمنع التكرار)، 3) الطوابير 'Queue/Deque' (معالجة العناصر وفق ترتيب معين). وتجدر الإشارة إلى أن الخرائط 'Map<K,V>' تشكل شجرة مستقلة بذاتها لا ترث من Collection ولكنها تتكامل معها عبر مجموعات المفاتيح والقيم."
            },
            {
              type: "paragraph",
              text: "Framework Pillars: 1) Core Interfaces: List, Set, SortedSet, NavigableSet, Queue, Deque, Map; 2) Concrete Implementations: ArrayList, LinkedList, HashSet, TreeSet, PriorityQueue, HashMap, TreeMap; 3) Utility Algorithms: java.util.Collections provides static algorithms for sorting, shuffling, searching, synchronizing, and creating unmodifiable views."
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
              text: "Example 1: Polymorphic Programming with Collection<T> (المثال 1: البرمجة متعددة الأشكال بواجهة Collection)"
            },
            {
              type: "paragraph",
              text: "Writing generic methods that accept any Collection implementation (List, Set, Queue)."
            },
            {
              type: "code",
              language: "java",
              filename: "CollectionPolymorphismDemo.java",
              code: `import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.LinkedList;

public class CollectionPolymorphismDemo {
    // Polymorphic method accepting any Collection
    public static void printSummary(String label, Collection<String> items) {
        System.out.println("=== " + label + " (Size: " + items.size() + ") ===");
        System.out.println("Elements: " + items);
        System.out.println("Contains 'Java'? " + items.contains("Java"));
    }

    public static void main(String[] args) {
        Collection<String> list = new ArrayList<>();
        list.add("Java");
        list.add("Kotlin");
        list.add("Java"); // Duplicates allowed

        Collection<String> set = new HashSet<>();
        set.add("Java");
        set.add("Kotlin");
        set.add("Java"); // Duplicate ignored!

        Collection<String> linked = new LinkedList<>();
        linked.add("Java");
        linked.add("Scala");

        printSummary("ArrayList", list);
        printSummary("HashSet", set);
        printSummary("LinkedList", linked);
    }
}`,
              output: `=== ArrayList (Size: 3) ===
Elements: [Java, Kotlin, Java]
Contains 'Java'? true
=== HashSet (Size: 2) ===
Elements: [Java, Kotlin]
Contains 'Java'? true
=== LinkedList (Size: 2) ===
Elements: [Java, Scala]
Contains 'Java'? true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "Coding to the Collection interface decouples business logic from concrete storage types, adhering to the Dependency Inversion Principle."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "البرمجة اعتماداً على واجهة Collection تفصل المنطق البرمجي عن نوع التخزين المحدد، محققة مبدأ البرمجة للواجهات وليس للتنفيذات."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Safe Iteration & Removal with Iterator (المثال 2: التكرار الآمن والحذف الصحيح باستخدام Iterator)"
            },
            {
              type: "paragraph",
              text: "Avoiding ConcurrentModificationException by using iterator.remove()."
            },
            {
              type: "code",
              language: "java",
              filename: "SafeIteratorDemo.java",
              code: `import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class SafeIteratorDemo {
    public static void main(String[] args) {
        List<Integer> scores = new ArrayList<>(List.of(45, 82, 33, 90, 58, 70));

        System.out.println("Original scores: " + scores);

        // Remove scores below 60 safely using Iterator
        Iterator<Integer> it = scores.iterator();
        while (it.hasNext()) {
            Integer score = it.next();
            if (score < 60) {
                it.remove(); // Safe removal without throwing ConcurrentModificationException!
            }
        }

        System.out.println("Scores >= 60 after filtering: " + scores);
    }
}`,
              output: `Original scores: [45, 82, 33, 90, 58, 70]
Scores >= 60 after filtering: [82, 90, 70]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "Calling list.remove() inside an enhanced for-each loop throws ConcurrentModificationException. The iterator's own remove() method updates internal modCount counters safely."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "حذف عنصر أثناء حلقة for-each يرمي استثناء ConcurrentModificationException؛ بينما تتيح دالة it.remove() الحذف الآمن دون إفساد مؤشرات القائمة."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Sorting & Searching with Collections.sort() and binarySearch() (المثال 3: الترتيب والبحث الثنائي)"
            },
            {
              type: "paragraph",
              text: "Sorting elements naturally and finding elements in logarithmic O(log n) time."
            },
            {
              type: "code",
              language: "java",
              filename: "CollectionsSortSearchDemo.java",
              code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class CollectionsSortSearchDemo {
    public static void main(String[] args) {
        List<String> cities = new ArrayList<>(List.of("Tokyo", "Cairo", "Paris", "Berlin", "Dubai"));

        // 1. Natural alphabetical sort (O(n log n))
        Collections.sort(cities);
        System.out.println("Sorted alphabetically: " + cities);

        // 2. Binary search (requires sorted list! O(log n))
        int indexCairo = Collections.binarySearch(cities, "Cairo");
        int indexLondon = Collections.binarySearch(cities, "London"); // Not present

        System.out.println("Index of 'Cairo': " + indexCairo);
        System.out.println("Search for missing 'London': " + indexLondon + " (negative insertion point)");

        // 3. Reverse order
        Collections.reverse(cities);
        System.out.println("Reversed order: " + cities);
    }
}`,
              output: `Sorted alphabetically: [Berlin, Cairo, Dubai, Paris, Tokyo]
Index of 'Cairo': 1
Search for missing 'London': -4 (negative insertion point)
Reversed order: [Tokyo, Paris, Dubai, Cairo, Berlin]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "Collections.binarySearch() executes in O(log n) time on indexed lists, but the list must be sorted beforehand."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "تنفذ Collections.binarySearch عملية البحث الثنائي بزمن O(log n) بشرط أن تكون القائمة مرتبة مسبقاً."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Shuffling & Randomization with Collections.shuffle() (المثال 4: الخلط والتبديل العشوائي للعناصر)"
            },
            {
              type: "paragraph",
              text: "Using the Fisher-Yates shuffle algorithm via Collections.shuffle()."
            },
            {
              type: "code",
              language: "java",
              filename: "CollectionsShuffleDemo.java",
              code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

public class CollectionsShuffleDemo {
    public static void main(String[] args) {
        List<Integer> deck = new ArrayList<>();
        for (int i = 1; i <= 10; i++) {
            deck.add(i);
        }

        System.out.println("Ordered deck:  " + deck);

        // Shuffle with default randomizer
        Collections.shuffle(deck);
        System.out.println("Shuffled deck: " + deck);

        // Deterministic shuffle with seeded Random
        Collections.shuffle(deck, new Random(42));
        System.out.println("Seeded shuffle: " + deck);
    }
}`,
              output: `Ordered deck:  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
Shuffled deck: [6, 2, 9, 1, 10, 4, 8, 3, 5, 7]
Seeded shuffle: [2, 5, 1, 9, 8, 7, 3, 6, 4, 10]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "Collections.shuffle() performs an in-place linear-time O(n) shuffle, ideal for card decks, game rounds, and random sampling."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "تقوم دالة shuffle بخلط العناصر في مكانها بزمن خطي O(n)، وهي مثالية لتوزيع الألعاب والاختبارات العشوائية."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Immutable Unmodifiable Views with Collections.unmodifiableList() (المثال 5: حماية القوائم من التعديل)"
            },
            {
              type: "paragraph",
              text: "Creating read-only wrapper views to protect internal domain state."
            },
            {
              type: "code",
              language: "java",
              filename: "UnmodifiableViewDemo.java",
              code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class UnmodifiableViewDemo {
    static class Department {
        private final List<String> employees = new ArrayList<>();

        public void addEmployee(String name) {
            employees.add(name);
        }

        // Return a read-only unmodifiable view
        public List<String> getEmployees() {
            return Collections.unmodifiableList(employees);
        }
    }

    public static void main(String[] args) {
        Department dept = new Department();
        dept.addEmployee("Alice");
        dept.addEmployee("Bob");

        List<String> view = dept.getEmployees();
        System.out.println("Department employees: " + view);

        try {
            view.add("Eve"); // Attempting mutation on read-only view
        } catch (UnsupportedOperationException e) {
            System.out.println("Caught mutation attempt: Cannot modify unmodifiable list!");
        }

        // Modifying underlying list reflects in view
        dept.addEmployee("Charlie");
        System.out.println("Updated employees via department: " + view);
    }
}`,
              output: `Department employees: [Alice, Bob]
Caught mutation attempt: Cannot modify unmodifiable list!
Updated employees via department: [Alice, Bob, Charlie]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "Collections.unmodifiableList() returns a wrapper that intercepts mutation methods and throws UnsupportedOperationException, safeguarding internal encapsulation."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "تمنع unmodifiableList أي تعديل خارجي على القائمة برمي استثناء UnsupportedOperationException لحماية بيانات الكائن."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Bulk Set Operations (Union, Intersection, Difference) (المثال 6: العمليات الجماعية الاتحاد والتقاطع والفرق)"
            },
            {
              type: "paragraph",
              text: "Utilizing addAll, retainAll, and removeAll on collections."
            },
            {
              type: "code",
              language: "java",
              filename: "BulkOperationsDemo.java",
              code: `import java.util.HashSet;
import java.util.Set;

public class BulkOperationsDemo {
    public static void main(String[] args) {
        Set<String> teamA = new HashSet<>(Set.of("Java", "Docker", "SQL", "Git"));
        Set<String> teamB = new HashSet<>(Set.of("Python", "Docker", "Git", "Kubernetes"));

        // 1. Intersection (Common elements) via retainAll
        Set<String> commonSkills = new HashSet<>(teamA);
        commonSkills.retainAll(teamB);
        System.out.println("Intersection (Common): " + commonSkills);

        // 2. Union (All elements combined) via addAll
        Set<String> allSkills = new HashSet<>(teamA);
        allSkills.addAll(teamB);
        System.out.println("Union (Combined):      " + allSkills);

        // 3. Difference (Exclusive to teamA) via removeAll
        Set<String> onlyTeamA = new HashSet<>(teamA);
        onlyTeamA.removeAll(teamB);
        System.out.println("Difference (Team A):   " + onlyTeamA);
    }
}`,
              output: `Intersection (Common): [Docker, Git]
Union (Combined):      [Java, Docker, SQL, Git, Python, Kubernetes]
Difference (Team A):   [Java, SQL]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "addAll() performs mathematical union, retainAll() performs intersection, and removeAll() computes relative complements."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "تمثل addAll الاتحاد، بينما تمثل retainAll التقاطع، وتمثل removeAll الفرق بين المجموعات."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Modern Immutable Collections (Java 9+ List.of, Set.of, Map.of) (المثال 7: مصانع المجموعات الثابتة في جافا الحديثة)"
            },
            {
              type: "paragraph",
              text: "Compact, null-hostile, highly optimized immutable collections."
            },
            {
              type: "code",
              language: "java",
              filename: "ModernImmutableDemo.java",
              code: `import java.util.List;
import java.util.Map;
import java.util.Set;

public class ModernImmutableDemo {
    public static void main(String[] args) {
        // Modern concise factory methods
        List<String> frameworks = List.of("Spring Boot", "Quarkus", "Micronaut");
        Set<Integer> ports = Set.of(80, 443, 8080);
        Map<String, Integer> statusCodes = Map.of(
            "OK", 200,
            "NOT_FOUND", 404,
            "SERVER_ERROR", 500
        );

        System.out.println("Frameworks:   " + frameworks);
        System.out.println("Active Ports: " + ports);
        System.out.println("HTTP Codes:   " + statusCodes);

        // Immutability verified
        try {
            frameworks.add("Dropwizard");
        } catch (UnsupportedOperationException e) {
            System.out.println("Verified: Factory collections are strictly immutable!");
        }
    }
}`,
              output: `Frameworks:   [Spring Boot, Quarkus, Micronaut]
Active Ports: [80, 443, 8080]
HTTP Codes:   {OK=200, NOT_FOUND=404, SERVER_ERROR=500}
Verified: Factory collections are strictly immutable!`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "List.of, Set.of, and Map.of create truly immutable, space-efficient collections that reject null elements immediately with NullPointerException."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "تنشئ دوال of مجموعات ثابتة بالكامل وموفرة للذاكرة وترفض القيم الفارغة null بحزم."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Finding Extrema & Frequencies with Collections (المثال 8: استخراج القيم العظمى والصغرى والتكرارات)"
            },
            {
              type: "paragraph",
              text: "Using Collections.min(), max(), frequency(), and disjoint()."
            },
            {
              type: "code",
              language: "java",
              filename: "CollectionsExtremaDemo.java",
              code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class CollectionsExtremaDemo {
    public static void main(String[] args) {
        List<Integer> ratings = new ArrayList<>(List.of(5, 3, 5, 2, 4, 5, 1, 4));

        int highest = Collections.max(ratings);
        int lowest = Collections.min(ratings);
        int fiveStarCount = Collections.frequency(ratings, 5);

        System.out.println("Ratings List:      " + ratings);
        System.out.println("Highest Rating:    " + highest);
        System.out.println("Lowest Rating:     " + lowest);
        System.out.println("Count of 5-stars:  " + fiveStarCount);

        List<Integer> otherRatings = List.of(7, 8, 9);
        boolean noOverlap = Collections.disjoint(ratings, otherRatings);
        System.out.println("Are collections disjoint (no shared items)? " + noOverlap);
    }
}`,
              output: `Ratings List:      [5, 3, 5, 2, 4, 5, 1, 4]
Highest Rating:    5
Lowest Rating:     1
Count of 5-stars:  3
Are collections disjoint (no shared items)? true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "Collections.frequency() and disjoint() save boilerplate loop code when auditing data collections."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "توفر دوال frequency و disjoint خوارزميات جاهزة لحساب التكرارات والتأكد من عدم وجود عناصر مشتركة دون كتابة حلقات يدوية."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Synchronized Wrappers for Multithreading (المثال 9: المجموعات المتزامنة للبيئات متعددة الخيوط)"
            },
            {
              type: "paragraph",
              text: "Wrapping standard collections with Collections.synchronizedCollection()."
            },
            {
              type: "code",
              language: "java",
              filename: "SynchronizedCollectionsDemo.java",
              code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class SynchronizedCollectionsDemo {
    public static void main(String[] args) throws InterruptedException {
        // Wrap regular ArrayList in synchronized list
        List<Integer> syncList = Collections.synchronizedList(new ArrayList<>());

        Thread t1 = new Thread(() -> {
            for (int i = 0; i < 500; i++) syncList.add(i);
        });

        Thread t2 = new Thread(() -> {
            for (int i = 500; i < 1000; i++) syncList.add(i);
        });

        t1.start();
        t2.start();
        t1.join();
        t2.join();

        System.out.println("Thread-safe addition verified: Total size = " + syncList.size());
    }
}`,
              output: `Thread-safe addition verified: Total size = 1000`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "Collections.synchronizedList() synchronizes individual method invocations, making concurrent writes thread-safe."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "تقوم دالة synchronizedList بمزامنة استدعاءات الدوال على كائن قفل داخلي؛ مما يتيح التعديل الآمن في بيئات تعدد الخيوط."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Array to Collection Bridging with Arrays.asList() (المثال 10: التحويل بين المصفوفات والمجموعات)"
            },
            {
              type: "paragraph",
              text: "Bridging fixed arrays with modern collections."
            },
            {
              type: "code",
              language: "java",
              filename: "ArrayToCollectionDemo.java",
              code: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ArrayToCollectionDemo {
    public static void main(String[] args) {
        String[] originalArray = { "Red", "Green", "Blue" };

        // 1. Fixed-size view backed by the original array
        List<String> backedList = Arrays.asList(originalArray);
        backedList.set(0, "Crimson"); // Mutates underlying array!
        System.out.println("Original array after backed list modification: " + originalArray[0]);

        // 2. Truly independent mutable ArrayList
        List<String> independentList = new ArrayList<>(Arrays.asList(originalArray));
        independentList.add("Yellow"); // Safe to grow
        System.out.println("Independent collection: " + independentList);

        // 3. Converting back to array
        String[] arrayBack = independentList.toArray(new String[0]);
        System.out.println("Converted back to array length: " + arrayBack.length);
    }
}`,
              output: `Original array after backed list modification: Crimson
Independent collection: [Crimson, Green, Blue, Yellow]
Converted back to array length: 4`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "Arrays.asList() returns a fixed-size list backed by the array. To allow resizing, wrap it in new ArrayList<>()."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "تُرجع Arrays.asList قائمة ثابتة الحجم مرتبطة بالمصفوفة؛ ولإمكانية إضافة عناصر جديدة يجب تغليفها داخل new ArrayList<>."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Java 8 Stream API Pipelines from Collections (المثال 11: المعالجة المتقدمة بتدفقات Stream)"
            },
            {
              type: "paragraph",
              text: "Connecting collections directly to declarative functional stream pipelines."
            },
            {
              type: "code",
              language: "java",
              filename: "CollectionStreamPipelineDemo.java",
              code: `import java.util.List;
import java.util.stream.Collectors;

public class CollectionStreamPipelineDemo {
    public static void main(String[] args) {
        List<String> names = List.of("Alexander", "Bob", "Catherine", "David", "Elizabeth", "Dan");

        // Declarative filtering and mapping via Collection.stream()
        List<String> processed = names.stream()
                .filter(name -> name.length() > 3)
                .map(String::toUpperCase)
                .sorted()
                .collect(Collectors.toList());

        System.out.println("Stream Pipeline Output:");
        processed.forEach(n -> System.out.println(" -> " + n));
    }
}`,
              output: `Stream Pipeline Output:
 -> ALEXANDER
 -> CATHERINE
 -> DAVID
 -> ELIZABETH`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "Every Collection implements default Stream<E> stream(), enabling functional transformations without mutating source data."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "توفر كافة المجموعات دالة stream() لإجراء عمليات التصفية والتحويل المتقدمة دون المساس بالبيانات الأصلية."
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
                "Mistake 1: Calling list.add() on the result of Arrays.asList() or List.of(). These collections do not support structural additions and throw UnsupportedOperationException.",
                "خطأ 1: محاولة إضافة عناصر إلى القوائم الناتجة عن Arrays.asList أو List.of مما يرمي استثناء UnsupportedOperationException لأنها ثابتة الحجم.",
                "Mistake 2: Assuming Map implements Collection. Map is part of JCF but occupies a separate interface hierarchy.",
                "خطأ 2: افتراض أن واجهة Map ترث من Collection؛ فالخرائط تشكل هيكلية مستقلة في إطار مجموعات جافا.",
                "Mistake 3: Removing elements in an enhanced for loop (for (E item : list)), which triggers ConcurrentModificationException.",
                "خطأ 3: حذف العناصر داخل حلقة for-each التقليدية مما يسبب خطأ ConcurrentModificationException.",
                "Mistake 4: Running Collections.binarySearch() on an unsorted list, resulting in unpredictable and incorrect return values."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Word Frequency & Ranking Analyzer (التحدي العملي: محلل تكرار وتصنيف الكلمات)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Create a method 'analyzeText(String text)' that parses words, eliminates punctuation, counts occurrences using collections, sorts the unique words alphabetically, and prints the top 3 most frequent words using Collections utility methods. Test in main() and display results."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: صمم دالة analyzeText(String text) تستخرج الكلمات وتنظفها من علامات الترقيم، وتعد تكراراتها باستخدام المجموعات، وترتب الكلمات الفريدة أبجدياً، وتطبع الكلمات الثلاث الأكثر تكراراً باستخدام دوال إطار المجموعات. اختبر الدالة في main واطبع النتائج."
            },
            {
              type: "code",
              language: "java",
              filename: "WordFrequencyChallenge.java",
              code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class WordFrequencyChallenge {
    public static void analyzeText(String text) {
        String[] tokens = text.toLowerCase().replaceAll("[^a-zA-Z ]", "").split("\\\\s+");

        List<String> wordList = new ArrayList<>(List.of(tokens));
        Map<String, Integer> freqMap = new HashMap<>();

        for (String w : wordList) {
            if (!w.isEmpty()) {
                freqMap.put(w, Collections.frequency(wordList, w));
            }
        }

        List<Map.Entry<String, Integer>> entries = new ArrayList<>(freqMap.entrySet());
        // Sort descending by frequency
        entries.sort((e1, e2) -> e2.getValue().compareTo(e1.getValue()));

        System.out.println("Top 3 Most Frequent Words:");
        for (int i = 0; i < Math.min(3, entries.size()); i++) {
            System.out.printf(" %d. '%s' (appeared %d times)%n",
                    i + 1, entries.get(i).getKey(), entries.get(i).getValue());
        }
    }

    public static void main(String[] args) {
        String article = "Java is powerful. Java is versatile. Java collections make programming in Java productive and efficient.";
        analyzeText(article);
    }
}`,
              output: `Top 3 Most Frequent Words:
 1. 'java' (appeared 4 times)
 2. 'is' (appeared 2 times)
 3. 'versatile' (appeared 1 times)`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "The method extracts tokens, leverages Collections.frequency() to populate the count map, and uses an entry list comparator to sort and print top ranked items."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "تستخرج الدالة الكلمات النظيفة، وتحسب تكراراتها عبر Collections.frequency، ثم ترتب عناصر الخريطة تنازلياً لتحديد أكثر الكلمات تكراراً."
            }
          ],
          quiz: [
          {
                    "id": "q1",
                    "question": "Which of the following core interfaces does NOT extend java.util.Collection in the Java Collections Framework? (أي من الواجهات الأساسية التالية لا ترث من واجهة Collection في إطار مجموعات جافا؟)",
                    "options": [
                              "java.util.List",
                              "java.util.Set",
                              "java.util.Map",
                              "java.util.Queue"
                    ],
                    "correctIndex": 2,
                    "explanation": "Correct! Map represents key-value pairs (mappings) rather than collections of individual elements. While Map is part of the Java Collections Framework, it has its own distinct hierarchy and does NOT inherit from the Collection interface. (واجهة Map تمثل أزواج مفتاح-قيمة ولها تسلسل هرمي خاص بها ولا ترث من واجهة Collection)."
          },
          {
                    "id": "q2",
                    "question": "What exception is thrown if you attempt to modify a collection while iterating over it using an enhanced for-each loop, such as: for (String s : list) { if (s.equals(\"A\")) list.remove(s); }? (ما الاستثناء الذي يُطلق عند تعديل القائمة أثناء التكرار عليها بحلقة for-each؟)",
                    "options": [
                              "IndexOutOfBoundsException",
                              "ConcurrentModificationException",
                              "IllegalStateException",
                              "NoSuchElementException"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Iterators created by ArrayList, HashSet, etc., are 'fail-fast'. They detect structural modifications made directly to the collection during iteration and immediately throw ConcurrentModificationException. To remove safely, use iterator.remove() or list.removeIf(...). (تطلق جافا استثناء ConcurrentModificationException فوراً بسبب المكررات السريعة العطب fail-fast عند تعديل المجموعة دون استخدام Iterator.remove)."
          },
          {
                    "id": "q3",
                    "question": "What is the requirement before calling Collections.binarySearch(list, key) on a List? (ما هو الشرط الأساسي الذي يجب استيفاؤه قبل استدعاء البحث الثنائي Collections.binarySearch؟)",
                    "options": [
                              "The list must not contain any duplicate elements.",
                              "The list must be sorted in ascending order according to the natural ordering of its elements or the supplied Comparator.",
                              "The list must be an instance of LinkedList.",
                              "The list size must be a power of 2."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Binary search requires the list to be sorted prior to making the call. If it is not sorted, the results are undefined (it may return negative values even if the element is present). (خوارزمية البحث الثنائي تتطلب بالضرورة أن تكون القائمة مرتبة مسبقاً، وإلا فإن النتيجة تكون غير محددة أو خاطئة)."
          },
          {
                    "id": "q4",
                    "question": "What is returned by Collections.binarySearch(list, key) if the searched key is NOT present in the sorted list? (ما الذي تُرجعه دالة binarySearch إذا كان العنصر غير موجود في القائمة المرتبة؟)",
                    "options": [
                              "-1 under all conditions",
                              "-(insertion point) - 1, where the insertion point is the index where the key would be inserted to keep the list sorted.",
                              "0",
                              "Throws a NoSuchElementException"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! If the key is not found, binarySearch returns (-(insertion point) - 1). This guarantees a negative number while allowing the caller to calculate where the element should be inserted using: -returnVal - 1. (تُرجع الدالة قيمة سالبة مشفرة بصيغة -(insertion point) - 1 تتيح معرفة مكان الإدراج الصحيح للحفاظ على الترتيب)."
          },
          {
                    "id": "q5",
                    "question": "What is the true behavior of an unmodifiable collection view created via Collections.unmodifiableList(originalList)? (ما هو السلوك الحقيقي للواجهة غير القابلة للتعديل الناتجة عن Collections.unmodifiableList؟)",
                    "options": [
                              "It makes a deep snapshot copy that can never change under any circumstances.",
                              "It is a read-only wrapper: calling mutator methods (add/remove) on the view throws UnsupportedOperationException, but changes made to originalList will still be visible through the unmodifiable view.",
                              "It locks the underlying computer hardware.",
                              "It encrypts the elements using SHA-256."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Collections.unmodifiableList creates a wrapper 'view', not an independent snapshot. While direct mutations through the wrapper throw UnsupportedOperationException, changes made to the underlying originalList will still reflect in the view. (القائمة غير القابلة للتعديل هي مجرد واجهة عرض وليست نسخة مستقلة، وأي تعديل على القائمة الأصلية ينعكس مباشرة عليها)."
          },
          {
                    "id": "q6",
                    "question": "How do modern factory methods like List.of(\"A\", \"B\"), Set.of(\"X\"), and Map.of(\"k\", \"v\") (Java 9+) differ from Collections.unmodifiableList()? (كيف تختلف مصانع المجموعات الحديثة في جافا 9+ عن Collections.unmodifiableList؟)",
                    "options": [
                              "They produce truly immutable, space-efficient collections that do not allow null elements (throwing NullPointerException if null is passed), and are not backed by any mutable underlying list.",
                              "They can only store up to 2 elements.",
                              "They are mutable if cast to ArrayList.",
                              "They are stored on disk instead of memory."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! List.of, Set.of, and Map.of produce genuinely immutable collection instances with compact internal memory representations. They strictly prohibit null elements (throwing NPE) and have no backing mutable collection. (مصانع جافا 9+ تنشئ مجموعات ثابتة حقيقية غير مدعومة بقائمة سابقة، ومحسنة للذاكرة وترفض عناصر null تماماً)."
          },
          {
                    "id": "q7",
                    "question": "Which Collection method performs an in-place Set Intersection, retaining only the elements that are common to both collections? (أي دالة تقوم بعملية التقاطع الرياضي في المجموعات مع الاحتفاظ بالعناصر المشتركة فقط؟)",
                    "options": [
                              "setA.intersect(setB)",
                              "setA.retainAll(setB)",
                              "setA.common(setB)",
                              "setA.keepOnly(setB)"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! retainAll(Collection<?> c) retains only the elements in this collection that are contained in the specified collection (mathematical intersection). (دالة retainAll تطبق عملية التقاطع بحيث تحتفظ فقط بالعناصر المشتركة في كلتا المجموعتين)."
          },
          {
                    "id": "q8",
                    "question": "What is the limitation of the list returned by Arrays.asList(array)? (ما هو القيد الأساسي على القائمة الناتجة من Arrays.asList؟)",
                    "options": [
                              "It is read-only and throws an exception on get().",
                              "It is a fixed-size list backed by the original array: elements can be read and set via set(index, val), but attempting to add or remove elements throws UnsupportedOperationException.",
                              "It converts all numbers to strings.",
                              "It automatically clears the original array."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Arrays.asList returns a fixed-size wrapper backed by the specified array. Modifying elements with set() changes the array, but structural modifications like add() or remove() throw UnsupportedOperationException. (تُرجع قائمة ذات حجم ثابت مربوطة بالمصفوفة الأصلية، بحيث يمكن تعديل العناصر ولكن لا يمكن إضافة أو حذف أي عنصر)."
          },
          {
                    "id": "q9",
                    "question": "When iterating over a synchronized collection created with Collections.synchronizedList(list), what must the developer explicitly do to prevent race conditions? (عند التكرار على قائمة متزامنة بـ synchronizedList، ما الذي يجب على المبرمج فعله لمنع تضارب الخيوط؟)",
                    "options": [
                              "The developer must manually wrap the iteration in a synchronized (list) block because the iterator itself is not automatically synchronized.",
                              "Nothing; synchronizedList makes iterations automatically thread-safe without any locking.",
                              "Run the code with the -Xsync JVM argument.",
                              "Convert the list to a Vector."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! As documented in the JCF javadocs, it is imperative that the user manually synchronize on the returned list when iterating over it: synchronized(list) { for (Item i : list) ... } to prevent non-deterministic ConcurrentModificationException during concurrent access. (يجب مزامنة حلقة التكرار يدوياً داخل synchronized(list) لأن المكرر Iterator الداخلي لا يقوم بالمزامنة التلقائية أثناء التنقل بين العناصر)."
          },
          {
                    "id": "q10",
                    "question": "Consider the following code:\nList<Integer> list = new ArrayList<>(Arrays.asList(5, 1, 9, 3));\nCollections.sort(list);\nCollections.reverse(list);\nSystem.out.println(list);\nWhat is printed? (ما الذي يطبعه الكود التالي؟)",
                    "options": [
                              "[1, 3, 5, 9]",
                              "[9, 5, 3, 1]",
                              "[5, 1, 9, 3]",
                              "[3, 9, 1, 5]"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Collections.sort(list) sorts in ascending order: [1, 3, 5, 9]. Collections.reverse(list) reverses the order of the list in place, resulting in [9, 5, 3, 1]. (الترتيب أولاً يجعل العناصر تصاعدية [1, 3, 5, 9] ثم العكس reverse ينتج قائمة تنازلية [9, 5, 3, 1])."
          },
          {
                    "id": "q11",
                    "question": "What does Collections.disjoint(collectionA, collectionB) return? (ما الذي تُرجعه دالة Collections.disjoint(A, B)؟)",
                    "options": [
                              "true if the two specified collections have NO elements in common; false otherwise.",
                              "true if the two collections contain the exact same elements.",
                              "The difference between collection sizes.",
                              "A merged list containing elements from both."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! Collections.disjoint returns true if the two collections have no elements in common (i.e., their intersection is empty). (تُرجع true إذا كانت المجموعتان منفصلتين تماماً ولا تشتركان في أي عنصر)."
          },
          {
                    "id": "q12",
                    "question": "How can you count the occurrences of a specific element (e.g., \"Java\") in a Collection using Collections utility methods? (كيف تحسب عدد تكرارات عنصر معين في مجموعة باستخدام فئة Collections المساعدة؟)",
                    "options": [
                              "Collections.count(col, \"Java\")",
                              "Collections.frequency(col, \"Java\")",
                              "col.occurrences(\"Java\")",
                              "Collections.occurrencesOf(col, \"Java\")"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Collections.frequency(Collection<?> c, Object o) returns the number of elements in the specified collection equal to the specified object. (دالة Collections.frequency تُرجع عدد مرات تكرار العنصر المحدد داخل المجموعة)."
          },
          {
                    "id": "q13",
                    "question": "Why is coding to interfaces (e.g., List<String> list = new ArrayList<>() instead of ArrayList<String> list = new ArrayList<>()) considered an industry best practice? (لماذا تعتبر البرمجة بالاعتماد على الواجهات Interface-based programming ممارسة فضلى؟)",
                    "options": [
                              "It decouples the code from the specific implementation, allowing developers to switch to another implementation (like LinkedList or CopyOnWriteArrayList) without changing client code.",
                              "It makes the program run 50% faster.",
                              "It prevents all runtime exceptions.",
                              "Because ArrayList is deprecated in modern Java."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! Programming to interfaces enforces loose coupling. Methods consuming 'List<String>' do not care whether the backing structure is an ArrayList, LinkedList, or custom list, enabling seamless architectural refactoring. (البرمجة بالاعتماد على الواجهات تحقق الاقتران الضعيف وتتيح تبديل فئة التنفيذ مستقبلاً دون الحاجة لتعديل شفرة البرنامج)."
          },
          {
                    "id": "q14",
                    "question": "What is the difference between a Set and a List in the Java Collections Framework? (ما الفرق الجوهري بين Set و List في إطار مجموعات جافا؟)",
                    "options": [
                              "A List is an ordered collection (sequence) that allows duplicate elements and positional access by index; a Set is a collection that cannot contain duplicate elements.",
                              "A List only stores numbers, while a Set only stores characters.",
                              "A Set cannot be used with an enhanced for loop.",
                              "A List is always immutable."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! A List maintains insertion order, permits duplicate values, and provides element access by index. A Set models mathematical sets: it enforces uniqueness (no duplicate elements, verified via equals() and hashCode()). (القائمة List تحافظ على ترتيب الإدخال وتقبل التكرار وتوفر الوصول بالفهرس، بينما المجموعة Set تمنع تكرار العناصر تماماً)."
          },
          {
                    "id": "q15",
                    "question": "In a practical scenario where you want to count word frequencies in a large document and retrieve the top words, which collection type is the foundational choice for tallying counts? (ما هو نوع المجموعة الأنسب لحساب تكرار الكلمات في مستند ضخم؟)",
                    "options": [
                              "Map<String, Integer> (e.g. HashMap or TreeMap), mapping each unique word to its running occurrence count.",
                              "Vector<String>",
                              "Stack<String>",
                              "ArrayDeque<String>"
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! A Map<String, Integer> associates each distinct word with its frequency count, allowing O(1) lookups and updates via map.merge(word, 1, Integer::sum) or map.put(word, map.getOrDefault(word, 0) + 1). (فئة Map هي الأنسب لربط كل كلمة فريدة بمقدار تكرارها كعدد، مما يوفر وصولاً وتحديثاً سريعاً O(1))."
          }
]
        }
      ]
    },

    /* ==========================================================================
       TOPIC 58: Java List
       ========================================================================== */
    {
      id: "java-list",
      title: "58. Java List",
      description: "Complete Mastery of the java.util.List Interface: positional index operations (get, set, add, remove), subList views and memory mechanics, bidirectional ListIterator, custom Comparator sorting, array transformations, and choosing between List implementations.",
      lessons: [
        {
          id: "java-list-mastery",
          title: "Complete Guide to Java List Interface",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "The Ordered Sequence Contract: java.util.List (عقد التسلسل المرتب: واجهة java.util.List)"
            },
            {
              type: "paragraph",
              text: "The 'java.util.List' interface represents an ordered, index-based collection (also called a sequence). Unlike Sets, Lists allow duplicate elements and multiple null entries (in standard implementations). Lists provide precise control over where each element is inserted into the sequence, accessing elements by their zero-based integer index, searching for elements via indexOf() and lastIndexOf(), and operating over contiguous sub-ranges via subList(fromIndex, toIndex). It also introduces the powerful ListIterator, enabling bidirectional traversal and element mutation during iteration."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "تمثل واجهة 'java.util.List' في جافا هيكلاً لمجموعة مرتبة ومفهرسة بالأرقام (Sequence). بخلاف المجموعات (Sets)، تسمح القوائم (Lists) بتكرار العناصر والاحتفاظ بالقيم الفارغة (null). وتمنح المطور تحكماً دقيقاً في موقع كل عنصر بواسطة الفهرس الرقمي الذي يبدأ من الصفر (0-indexed)، وتوفر عمليات البحث بالمواقع مثل indexOf() و lastIndexOf()، وتسمح بإنشاء نوافذ فرعية متصلة عبر subList(). كما تقدم مكرراً ثنائي الاتجاه ListIterator يتيح التحرك للأمام والخلف وتعديل العناصر أثناء المسح."
            },
            {
              type: "paragraph",
              text: "Key Contract Operations: 1) Positional Access: get(i), set(i, element), add(i, element), remove(i); 2) Search: indexOf(o), lastIndexOf(o); 3) Bidirectional Iteration: listIterator(index); 4) Range-View: subList(from, to) creates a structural view, not an independent copy."
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
              text: "Example 1: Core Positional Index Operations (get, set, add, remove) (المثال 1: العمليات الموضعية الأساسية بالفهرس)"
            },
            {
              type: "paragraph",
              text: "Inserting, retrieving, replacing, and removing elements at specified indices."
            },
            {
              type: "code",
              language: "java",
              filename: "ListIndexOperationsDemo.java",
              code: `import java.util.ArrayList;
import java.util.List;

public class ListIndexOperationsDemo {
    public static void main(String[] args) {
        List<String> tasks = new ArrayList<>();

        // 1. Appending elements
        tasks.add("Design Architecture");
        tasks.add("Write Code");
        tasks.add("Deploy");

        // 2. Positional insertion at index 2
        tasks.add(2, "Review PR & Test");
        System.out.println("After positional add: " + tasks);

        // 3. Positional get and set (replacement)
        String first = tasks.get(0);
        tasks.set(1, "Write Modular Code"); // Replace index 1
        System.out.println("First task: " + first);
        System.out.println("After set: " + tasks);

        // 4. Positional removal by index
        String removed = tasks.remove(3);
        System.out.println("Removed task: " + removed);
        System.out.println("Final list: " + tasks);
    }
}`,
              output: `After positional add: [Design Architecture, Write Code, Review PR & Test, Deploy]
First task: Design Architecture
After set: [Design Architecture, Write Modular Code, Review PR & Test, Deploy]
Removed task: Deploy
Final list: [Design Architecture, Write Modular Code, Review PR & Test]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "list.add(index, element) inserts into the specified slot and shifts subsequent elements right. set(index, element) overwrites the existing value without shifting."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "تدرج add(index, elem) العنصر وتزيح بقية العناصر، بينما تستبدل set(index, elem) القيمة الحالية دون إزاحة."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Searching with indexOf() and lastIndexOf() (المثال 2: البحث عن أول وآخر ظهور للعنصر)"
            },
            {
              type: "paragraph",
              text: "Locating element occurrences in duplicate-allowing lists."
            },
            {
              type: "code",
              language: "java",
              filename: "ListSearchDemo.java",
              code: `import java.util.ArrayList;
import java.util.List;

public class ListSearchDemo {
    public static void main(String[] args) {
        List<String> tags = new ArrayList<>(List.of("java", "cloud", "docker", "java", "k8s", "java"));

        System.out.println("Tags list: " + tags);

        int firstJava = tags.indexOf("java");
        int lastJava = tags.lastIndexOf("java");
        int missing = tags.indexOf("rust");

        System.out.println("First index of 'java': " + firstJava);
        System.out.println("Last index of 'java':  " + lastJava);
        System.out.println("Index of missing item: " + missing + " (returns -1)");
    }
}`,
              output: `Tags list: [java, cloud, docker, java, k8s, java]
First index of 'java': 0
Last index of 'java':  5
Index of missing item: -1 (returns -1)`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "indexOf() searches from index 0 forward, while lastIndexOf() searches backwards from the tail. Both return -1 if the target is absent."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "تبحث indexOf من البداية للأمام، بينما تبحث lastIndexOf من النهاية للخلف، وتُرجع كلتاهما -1 إذا لم يُعثر على العنصر."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Disambiguating remove(int) vs remove(Object) (المثال 3: التمييز الحرج بين الحذف بالفهرس والحذف بالقيمة)"
            },
            {
              type: "paragraph",
              text: "Understanding the overloading trap when working with List<Integer>."
            },
            {
              type: "code",
              language: "java",
              filename: "ListRemoveOverloadDemo.java",
              code: `import java.util.ArrayList;
import java.util.List;

public class ListRemoveOverloadDemo {
    public static void main(String[] args) {
        List<Integer> numbers = new ArrayList<>(List.of(10, 20, 30, 40, 50));
        System.out.println("Initial numbers: " + numbers);

        // 1. remove(int index) -> Removes element at index 2 (which is 30)
        Integer removedByIndex = numbers.remove(2);
        System.out.println("numbers.remove(2) removed element at index 2: " + removedByIndex);
        System.out.println("Remaining: " + numbers);

        // 2. remove(Object o) -> Must pass Integer object to remove by VALUE!
        boolean removedByValue = numbers.remove(Integer.valueOf(40));
        System.out.println("numbers.remove(Integer.valueOf(40)) removed: " + removedByValue);
        System.out.println("Final list: " + numbers);
    }
}`,
              output: `Initial numbers: [10, 20, 30, 40, 50]
numbers.remove(2) removed element at index 2: 30
Remaining: [10, 20, 40, 50]
numbers.remove(Integer.valueOf(40)) removed: true
Final list: [10, 20, 50]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "Passing an int primitive invokes remove(int index). To remove an integer by value, you must wrap it in Integer.valueOf(val)."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "تمرير رقم أولي int يستدعي الحذف بالفهرس remove(int)؛ ولحذف الرقم كقيمة يجب تغليفه في كائن Integer.valueOf(x)."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Bidirectional Navigation with ListIterator (المثال 4: التنقل ثنائي الاتجاه بمكرر القوائم ListIterator)"
            },
            {
              type: "paragraph",
              text: "Traversing forwards and backwards, and modifying elements in-flight."
            },
            {
              type: "code",
              language: "java",
              filename: "ListIteratorDemo.java",
              code: `import java.util.ArrayList;
import java.util.List;
import java.util.ListIterator;

public class ListIteratorDemo {
    public static void main(String[] args) {
        List<String> alphabet = new ArrayList<>(List.of("Alpha", "Beta", "Gamma"));

        ListIterator<String> it = alphabet.listIterator();

        System.out.println("Forward iteration:");
        while (it.hasNext()) {
            int nextIndex = it.nextIndex();
            String val = it.next();
            System.out.println(" Index " + nextIndex + " -> " + val);
            if (val.equals("Beta")) {
                it.set("BETA-UPDATED"); // Mutate current element in-place!
            }
        }

        System.out.println("\\nBackward iteration from current end position:");
        while (it.hasPrevious()) {
            int prevIndex = it.previousIndex();
            String val = it.previous();
            System.out.println(" Index " + prevIndex + " <- " + val);
        }

        System.out.println("\\nFinal list after in-flight update: " + alphabet);
    }
}`,
              output: `Forward iteration:
 Index 0 -> Alpha
 Index 1 -> Beta
 Index 2 -> Gamma

Backward iteration from current end position:
 Index 2 <- Gamma
 Index 1 <- BETA-UPDATED
 Index 0 <- Alpha

Final list after in-flight update: [Alpha, BETA-UPDATED, Gamma]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "ListIterator offers hasPrevious(), previous(), nextIndex(), previousIndex(), and set(e) for bidirectional traversal and in-place replacement."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "يوفر ListIterator دوال التنقل العكسي (hasPrevious و previous) وإمكانية استبدال العنصر الحالي في مكانه عبر it.set()."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: SubList Range Views & Backed Mutability (المثال 5: النوافذ الفرعية subList وتأثير التعديل عليها)"
            },
            {
              type: "paragraph",
              text: "Understanding how subList creates a view backed by the original list, not a copy."
            },
            {
              type: "code",
              language: "java",
              filename: "SubListViewDemo.java",
              code: `import java.util.ArrayList;
import java.util.List;

public class SubListViewDemo {
    public static void main(String[] args) {
        List<String> colors = new ArrayList<>(List.of("Red", "Orange", "Yellow", "Green", "Blue", "Indigo"));

        System.out.println("Original list: " + colors);

        // subList(fromIndex, toIndex): [fromIndex, toIndex) - half-open window
        List<String> middleColors = colors.subList(2, 5); // Indices 2, 3, 4 ("Yellow", "Green", "Blue")
        System.out.println("SubList view:  " + middleColors);

        // Mutating the subList affects the master list!
        middleColors.set(0, "GOLDEN-YELLOW");
        System.out.println("Master list after subList.set(): " + colors);

        // Clearing the subList removes the entire sub-range from master list!
        middleColors.clear();
        System.out.println("Master list after middle subList cleared: " + colors);
    }
}`,
              output: `Original list: [Red, Orange, Yellow, Green, Blue, Indigo]
SubList view:  [Yellow, Green, Blue]
Master list after subList.set(): [Red, Orange, GOLDEN-YELLOW, Green, Blue, Indigo]
Master list after middle subList cleared: [Red, Orange, Indigo]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "subList() returns a window view backed directly by the parent list. Clearing the view deletes that entire range from the parent list."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "تُرجع subList نافذة مرتبطة بالقائمة الأصلية وليست نسخة مستقلة؛ وأي تعديل أو حذف في النافذة ينعكس فوراً على القائمة الأم."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: In-Place Sorting with list.sort(Comparator) (Java 8+) (المثال 6: الترتيب الموضعي بقواعد مخصصة عبر sort)"
            },
            {
              type: "paragraph",
              text: "Sorting lists directly with custom comparators without calling Collections.sort()."
            },
            {
              type: "code",
              language: "java",
              filename: "ListSortComparatorDemo.java",
              code: `import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class ListSortComparatorDemo {
    static class Project {
        String name;
        int stars;

        Project(String name, int stars) {
            this.name = name;
            this.stars = stars;
        }

        @Override
        public String toString() {
            return name + " (" + stars + "★)";
        }
    }

    public static void main(String[] args) {
        List<Project> projects = new ArrayList<>();
        projects.add(new Project("Framework A", 1200));
        projects.add(new Project("Library B", 3500));
        projects.add(new Project("Microservice C", 850));

        // Sort descending by stars using modern Comparator chaining
        projects.sort(Comparator.comparingInt((Project p) -> p.stars).reversed());

        System.out.println("Projects sorted by stars (descending):");
        projects.forEach(p -> System.out.println(" * " + p));
    }
}`,
              output: `Projects sorted by stars (descending):
 * Library B (3500★)
 * Framework A (1200★)
 * Microservice C (850★)`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "Since Java 8, List has a default sort(Comparator) method, making in-place sorting concise and chainable."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "منذ جافا 8، تملك واجهة List دالة sort(Comparator) مدمجة لترتيب العناصر موضعياً بدقة ومرونة."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Safe Array Conversion with toArray(new T[0]) (المثال 7: التحويل الآمن لمصفوفة أصلية عبر toArray)"
            },
            {
              type: "paragraph",
              text: "Transforming generic lists into type-safe concrete arrays."
            },
            {
              type: "code",
              language: "java",
              filename: "ListToArrayDemo.java",
              code: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ListToArrayDemo {
    public static void main(String[] args) {
        List<String> servers = new ArrayList<>(List.of("prod-app-01", "prod-app-02", "prod-db-01"));

        // Idiomatic Java modern best-practice: pass empty zero-length typed array
        String[] serverArray = servers.toArray(new String[0]);

        System.out.println("Array type:   " + serverArray.getClass().getSimpleName());
        System.out.println("Array length: " + serverArray.length);
        System.out.println("Array contents: " + Arrays.toString(serverArray));
    }
}`,
              output: `Array type:   String[]
Array length: 3
Array contents: [prod-app-01, prod-app-02, prod-db-01]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "Passing new String[0] is the JVM-optimized idiom for toArray(T[]). The JVM inspects the type and allocates an array of the exact required size."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "تمرير مصفوفة فارغة new String[0] هو الأسلوب الأمثل في جافا؛ حيث يتعرف المعالج على النوع وينشئ المصفوفة بالحجم الدقيق بأعلى سرعة."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: In-Place Bulk Replacement with replaceAll() (Java 8+) (المثال 8: الاستبدال الجماعي الموضعي عبر replaceAll)"
            },
            {
              type: "paragraph",
              text: "Transforming all elements in-place using UnaryOperator."
            },
            {
              type: "code",
              language: "java",
              filename: "ListReplaceAllDemo.java",
              code: `import java.util.ArrayList;
import java.util.List;

public class ListReplaceAllDemo {
    public static void main(String[] args) {
        List<String> emails = new ArrayList<>(List.of(
            "  USER1@GMAIL.COM  ",
            "ADMIN@SYSTEM.ORG ",
            "Support@Desk.com"
        ));

        System.out.println("Raw emails:        " + emails);

        // Transform every element in-place
        emails.replaceAll(email -> email.trim().toLowerCase());

        System.out.println("Normalized emails: " + emails);
    }
}`,
              output: `Raw emails:        [  USER1@GMAIL.COM  , ADMIN@SYSTEM.ORG , Support@Desk.com]
Normalized emails: [user1@gmail.com, admin@system.org, support@desk.com]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "list.replaceAll(operator) mutates existing elements in-place without generating a new collection or allocating intermediate objects."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "تقوم replaceAll بتعديل كل عنصر في مكانه مباشرة دون الحاجة لإنشاء قوائم جديدة أو استهلاك إضافي للذاكرة."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Conditional Bulk Removal with removeIf() (المثال 9: الحذف الشرطي المباشر عبر removeIf)"
            },
            {
              type: "paragraph",
              text: "Filtering out elements matching a Predicate condition in a single expressive call."
            },
            {
              type: "code",
              language: "java",
              filename: "ListRemoveIfDemo.java",
              code: `import java.util.ArrayList;
import java.util.List;

public class ListRemoveIfDemo {
    public static void main(String[] args) {
        List<Integer> inventory = new ArrayList<>(List.of(15, 0, 8, -3, 0, 42, -1));

        System.out.println("Original inventory: " + inventory);

        // Remove non-positive items (<= 0)
        boolean modified = inventory.removeIf(stock -> stock <= 0);

        System.out.println("List modified?      " + modified);
        System.out.println("Cleaned inventory:  " + inventory);
    }
}`,
              output: `Original inventory: [15, 0, 8, -3, 0, 42, -1]
List modified?      true
Cleaned inventory:  [15, 8, 42]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "removeIf(Predicate) removes all elements satisfying the predicate condition in linear O(n) time, internally preventing concurrency issues."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "تحذف removeIf العناصر المطابقة للشرط دفعة واحدة بزمن خطي O(n) وبشكل آمن تماماً."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Copying and Defensive Freezing with List.copyOf() (Java 10+) (المثال 10: النسخ التجميدي الآمن عبر List.copyOf)"
            },
            {
              type: "paragraph",
              text: "Creating a disconnected, immutable snapshot of an existing list."
            },
            {
              type: "code",
              language: "java",
              filename: "ListCopyOfDemo.java",
              code: `import java.util.ArrayList;
import java.util.List;

public class ListCopyOfDemo {
    public static void main(String[] args) {
        List<String> mutableList = new ArrayList<>();
        mutableList.add("Config A");
        mutableList.add("Config B");

        // Java 10: List.copyOf creates an independent, unmodifiable snapshot
        List<String> frozenSnapshot = List.copyOf(mutableList);

        // Mutating the original list does NOT affect the copy
        mutableList.add("Config C");

        System.out.println("Original (mutable):  " + mutableList);
        System.out.println("Snapshot (frozen):   " + frozenSnapshot);

        try {
            frozenSnapshot.add("Config D");
        } catch (UnsupportedOperationException e) {
            System.out.println("Verified: Snapshot is strictly unmodifiable!");
        }
    }
}`,
              output: `Original (mutable):  [Config A, Config B, Config C]
Snapshot (frozen):   [Config A, Config B]
Verified: Snapshot is strictly unmodifiable!`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "Unlike Collections.unmodifiableList() which is a view, List.copyOf() creates an independent immutable copy, preventing external mutations."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "بخلاف unmodifiableList التي تظل نافذة متأثرة بالقائمة الأصلية، تنشئ List.copyOf نسخة مستقلة مجمدة لا تتأثر بتعديلات القائمة الأم."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Implementing a Sliding Window View with subList() (المثال 11: تطبيق نافذة منزلقة عبر subList)"
            },
            {
              type: "paragraph",
              text: "Processing moving sequential windows over a dataset using List.subList()."
            },
            {
              type: "code",
              language: "java",
              filename: "SlidingWindowDemo.java",
              code: `import java.util.List;

public class SlidingWindowDemo {
    public static void main(String[] args) {
        List<Integer> timeSeries = List.of(10, 20, 30, 40, 50, 60, 70);
        int windowSize = 3;

        System.out.println("Calculating Moving Averages (Window Size = " + windowSize + "):");

        for (int i = 0; i <= timeSeries.size() - windowSize; i++) {
            List<Integer> window = timeSeries.subList(i, i + windowSize);
            double sum = 0;
            for (int val : window) sum += val;
            double avg = sum / windowSize;

            System.out.printf("Window %s -> Average: %.2f%n", window, avg);
        }
    }
}`,
              output: `Calculating Moving Averages (Window Size = 3):
Window [10, 20, 30] -> Average: 20.00
Window [20, 30, 40] -> Average: 30.00
Window [30, 40, 50] -> Average: 40.00
Window [40, 50, 60] -> Average: 50.00
Window [50, 60, 70] -> Average: 60.00`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "subList() makes sliding window algorithms lightweight by avoiding data duplication or extra array memory allocation."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "تجعل subList خوارزميات النافذة المنزلقة فائقة الخفة لأنها تتجنب نسخ البيانات وتنشئ نوافذ نظرية فورية على الذاكرة."
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
                "Mistake 1: Confusing remove(int index) with remove(Object obj) on integer lists. Calling list.remove(2) removes the element at index 2, not the number 2!",
                "خطأ 1: الخلط بين remove(int) و remove(Object) في قوائم الأرقام؛ فاستدعاء remove(2) يحذف العنصر في الخانة رقم 2 وليس الرقم 2 نفسه.",
                "Mistake 2: Modifying the structural size of the master list while holding a subList view, which immediately invalidates the view and causes ConcurrentModificationException upon next access.",
                "خطأ 2: تعديل حجم القائمة الأم أثناء الاحتفاظ بنافذة subList؛ مما يؤدي لإفساد النافذة الفرعية ورمي استثناء عند محاولة استخدامها.",
                "Mistake 3: Assuming subList(fromIndex, toIndex) includes toIndex. The toIndex is exclusive ([fromIndex, toIndex)).",
                "خطأ 3: الاعتقاد بأن toIndex مشمول في subList؛ فالنهاية مستثناة دوماً (مجال نصف مفتوح).",
                "Mistake 4: Calling toArray() without arguments, which returns Object[] instead of a strongly-typed T[]."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: In-Place Duplicates Eliminator Preserving Order (التحدي العملي: حذف العناصر المكررة موضعياً مع الحفاظ على الترتيب)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Implement a static method 'removeDuplicatesInPlace(List<T> list)' that iterates through the list using a ListIterator, removes subsequent occurrences of elements while preserving their first occurrence and relative order, without allocating a second list. Test in main() with a list of strings and display the result."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: صمم دالة removeDuplicatesInPlace(List<T> list) تستخدم ListIterator لحذف التكرارات في مكانها مع الحفاظ على الظهور الأول والترتيب النسبي ودون إنشاء قائمة ثانية. اختبرها في main على قائمة نصوص واطبع النتيجة."
            },
            {
              type: "code",
              language: "java",
              filename: "InPlaceDuplicatesChallenge.java",
              code: `import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.ListIterator;
import java.util.Set;

public class InPlaceDuplicatesChallenge {
    public static <T> void removeDuplicatesInPlace(List<T> list) {
        Set<T> seen = new HashSet<>();
        ListIterator<T> it = list.listIterator();

        while (it.hasNext()) {
            T item = it.next();
            if (seen.contains(item)) {
                it.remove(); // Safely removes duplicate in-place
            } else {
                seen.add(item);
            }
        }
    }

    public static void main(String[] args) {
        List<String> items = new ArrayList<>(List.of(
            "Apple", "Banana", "Apple", "Cherry", "Banana", "Date", "Apple"
        ));

        System.out.println("Original with duplicates: " + items);
        removeDuplicatesInPlace(items);
        System.out.println("Deduplicated in-place:    " + items);
    }
}`,
              output: `Original with duplicates: [Apple, Banana, Apple, Cherry, Banana, Date, Apple]
Deduplicated in-place:    [Apple, Banana, Cherry, Date]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "The method checks elements against a HashSet of seen items; if already encountered, it calls it.remove() directly on the iterator, mutating the list in-place in linear O(n) time."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "تفحص الدالة العناصر مقابل مجموعة HashSet للعناصر المزارة؛ فإذا تكرر العنصر تحذفه عبر it.remove() موضعياً دون تشويه القائمة."
            }
          ],
          quiz: [
          {
                    "id": "q1",
                    "question": "What is the defining characteristic of the java.util.List interface compared to Set? (ما هي الخاصية المميزة لواجهة java.util.List مقارنة بـ Set؟)",
                    "options": [
                              "List guarantees elements are sorted in ascending alphabetical order.",
                              "List is an ordered collection (sequence) that allows precise control over where each element is inserted by integer index, and permits duplicate elements.",
                              "List cannot store null values.",
                              "List automatically deletes elements that are not accessed within 10 minutes."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! A List represents an ordered sequence where elements can be inserted, accessed, and removed via zero-based integer indices, and duplicates are explicitly permitted. (القائمة List تمثل تسلسلاً مرتباً يعتمد على الفهارس الصحيحة ويسمح بتكرار العناصر)."
          },
          {
                    "id": "q2",
                    "question": "What is the behavior and return value of list.set(int index, E element)? (ما هو سلوك وقيمة الإرجاع لدالة list.set(index, element)؟)",
                    "options": [
                              "It inserts the element at the index, shifting subsequent elements to the right, and returns true.",
                              "It replaces the element at the specified position with the new element, and returns the element previously at that position.",
                              "It throws an UnsupportedOperationException if the index already contains an element.",
                              "It returns the new element that was just set."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! list.set(index, element) replaces the existing element at the given index and returns the old element that was previously stored there. (تقوم دالة set باستبدال العنصر الموجود في الفهرس المحدد وتُرجع العنصر القديم الذي تم استبداله)."
          },
          {
                    "id": "q3",
                    "question": "Consider the following code:\nList<Integer> numbers = new ArrayList<>(Arrays.asList(10, 20, 30, 40));\nnumbers.remove(1);\nnumbers.remove(Integer.valueOf(30));\nSystem.out.println(numbers);\nWhat is printed? (ما الذي يطبعه الكود التالي؟)",
                    "options": [
                              "[20, 40]",
                              "[10, 40]",
                              "[10, 30, 40]",
                              "[30, 40]"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! numbers.remove(1) matches remove(int index), which removes the element at index 1 (value 20), leaving [10, 30, 40]. Next, numbers.remove(Integer.valueOf(30)) matches remove(Object o), which searches for and removes the value 30, leaving [10, 40]. (الاستدعاء الأول يحذف بالفهرس 1 وهو 20، والاستدعاء الثاني يحذف بالقيمة 30 فتتبقى القائمة [10, 40])."
          },
          {
                    "id": "q4",
                    "question": "How does ListIterator differ from a standard Iterator? (كيف يختلف ListIterator عن Iterator العادي؟)",
                    "options": [
                              "ListIterator can only iterate forward, but supports multithreading.",
                              "ListIterator supports bidirectional traversal (hasPrevious(), previous()), allows inspecting element indices (nextIndex(), previousIndex()), and supports element modification (set()) and insertion (add()).",
                              "ListIterator is only compatible with LinkedList.",
                              "ListIterator automatically sorts the list before iteration."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! ListIterator extends Iterator to provide two-way traversal (previous and next), position query methods, and in-place list modifications (add and set) during traversal. (يوفر ListIterator إمكانية التنقل في كلا الاتجاهين للأمام والخلف، ومعرفة الفهارس، والتعديل والإضافة أثناء المرور)."
          },
          {
                    "id": "q5",
                    "question": "What happens if you clear a subList view obtained from an ArrayList, like this:\nList<String> list = new ArrayList<>(Arrays.asList(\"A\", \"B\", \"C\", \"D\", \"E\"));\nlist.subList(1, 4).clear();\nSystem.out.println(list);\n(ماذا يحدث عند استدعاء clear على نافذة subList؟)",
                    "options": [
                              "Only the subList is cleared; list remains [\"A\", \"B\", \"C\", \"D\", \"E\"].",
                              "An UnsupportedOperationException is thrown because subList is read-only.",
                              "The elements at indices 1, 2, and 3 (\"B\", \"C\", \"D\") are removed from the backing list, printing [A, E].",
                              "The entire list is cleared, printing []."
                    ],
                    "correctIndex": 2,
                    "explanation": "Correct! subList(fromIndex, toIndex) returns a live view backed by the original list. Structural modifications on the subList (like clear()) directly modify the backing list, removing the specified range [1, 4) from original list. (دالة subList تُرجع واجهة مرتبطة بالقائمة الأصلية، ومسحها عبر clear يحذف تلك العناصر المحددة مباشرة من القائمة الأصلية ليتبقى [A, E])."
          },
          {
                    "id": "q6",
                    "question": "What happens if you structurally modify the original list (e.g., list.add(\"Z\")) and then attempt to read from an existing subList view? (ماذا يحدث إذا قمت بتعديل القائمة الأصلية مباشرة ثم حاولت القراءة من واجهة subList سابقة؟)",
                    "options": [
                              "The subList automatically updates without issue.",
                              "The subList becomes invalidated, and any subsequent operation on it throws a ConcurrentModificationException.",
                              "The original list modification is undone.",
                              "It causes a JVM segmentation fault."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Direct structural changes to the backing list invalidate all existing subList views. Subsequent operations on the stale subList detect modCount divergence and throw ConcurrentModificationException. (أي تعديل هيكلي مباشر على القائمة الأصلية يُبطل صلاحية نوافذ subList ويؤدي لإطلاق ConcurrentModificationException عند محاولة استخدامها)."
          },
          {
                    "id": "q7",
                    "question": "Which of the following is the modern, recommended way to convert a List<String> to a String array in Java? (ما هي الطريقة الحديثة والموصى بها لتحويل List إلى مصفوفة نصوص في جافا؟)",
                    "options": [
                              "String[] arr = (String[]) list.toArray();",
                              "String[] arr = list.toArray(new String[0]);",
                              "String[] arr = list.toArray(new String[list.size()]); // outdated idiom",
                              "String[] arr = new String[](list);"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! list.toArray(new String[0]) is the standard, modern optimized idiom. Modern JVM JIT compilers recognize the zero-length array pattern and allocate the exact correctly-sized array with high efficiency, avoiding reflection and race conditions. (استخدام new String[0] هو النمط الحديث الموصى به حيث يقوم مفسر JIT بإنشاء المصفوفة بالحجم الدقيق بأعلى كفاءة)."
          },
          {
                    "id": "q8",
                    "question": "What is the output of the following code?\nList<String> list = new ArrayList<>(Arrays.asList(\"java\", \"python\", \"c++\"));\nlist.replaceAll(String::toUpperCase);\nSystem.out.println(list);\n(ما هو ناتج الكود التالي؟)",
                    "options": [
                              "[JAVA, PYTHON, C++]",
                              "[java, python, c++]",
                              "Throws an UnsupportedOperationException",
                              "[JAVA]"
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! replaceAll(UnaryOperator) replaces each element of the list with the result of applying the operator to that element in place. All strings are converted to uppercase: [JAVA, PYTHON, C++]. (دالة replaceAll تقوم بتطبيق الدالة المحددة على كل عنصر موضعياً واستبداله بالنتيجة في مكانها)."
          },
          {
                    "id": "q9",
                    "question": "Consider the following code snippet:\nList<Integer> list = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5, 6));\nlist.removeIf(n -> n % 2 == 0);\nSystem.out.println(list);\nWhat is printed? (ما الذي يطبعه هذا الكود؟)",
                    "options": [
                              "[2, 4, 6]",
                              "[1, 3, 5]",
                              "[1, 2, 3, 4, 5, 6]",
                              "Throws a ConcurrentModificationException"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! removeIf(Predicate) removes all elements of the collection that satisfy the given predicate in a single, safe pass without throwing ConcurrentModificationException. Even numbers are removed, leaving odd numbers [1, 3, 5]. (تقوم removeIf بحذف جميع العناصر التي تحقق الشرط بأمان وسرعة دون أخطاء تكرار، فيتم حذف الأعداد الزوجية ويبقى [1, 3, 5])."
          },
          {
                    "id": "q10",
                    "question": "How does List.copyOf(originalList) introduced in Java 10 differ from Collections.unmodifiableList(originalList)? (كيف تختلف دالة List.copyOf في جافا 10 عن Collections.unmodifiableList؟)",
                    "options": [
                              "List.copyOf creates an independent, truly unmodifiable snapshot that does NOT reflect subsequent modifications to originalList and rejects null elements.",
                              "List.copyOf is mutable if cast to ArrayList.",
                              "List.copyOf allows null values while unmodifiableList does not.",
                              "There is no difference; they are exact aliases."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! List.copyOf creates a true immutable defensive copy. Unlike unmodifiableList (which is a live wrapper that reflects changes in the backing list), List.copyOf is completely decoupled, rejects nulls (throws NPE), and cannot be modified. (دالة List.copyOf تنشئ نسخة تجميدية مستقلة تماماً لا تتأثر بأي تعديل لاحق على القائمة الأصلية وترفض قيم null)."
          },
          {
                    "id": "q11",
                    "question": "What is the return value of list.indexOf(\"Unknown\") if the element is not found in the list? (ما هي القيمة المرجعة لـ indexOf إذا لم يكن العنصر موجوداً؟)",
                    "options": [
                              "null",
                              "-1",
                              "list.size()",
                              "Throws a NoSuchElementException"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! indexOf(Object o) returns the index of the first occurrence of the specified element, or -1 if the list does not contain the element. (تُرجع الدالة -1 عند عدم وجود العنصر داخل القائمة)."
          },
          {
                    "id": "q12",
                    "question": "What is printed by the following code?\nList<String> names = new ArrayList<>(Arrays.asList(\"Charlie\", \"Alice\", \"Bob\"));\nnames.sort(Comparator.naturalOrder());\nSystem.out.println(names.get(0));\n(ما الذي يطبعه هذا الكود؟)",
                    "options": [
                              "Charlie",
                              "Alice",
                              "Bob",
                              "null"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! names.sort(Comparator.naturalOrder()) sorts the list alphabetically in-place: [\"Alice\", \"Bob\", \"Charlie\"]. Index 0 is \"Alice\". (الترتيب الطبيعي يفرز الأسماء هجائياً فتصبح Alice في المقدمة عند الفهرس 0)."
          },
          {
                    "id": "q13",
                    "question": "When iterating with a ListIterator, what is the effect of calling iterator.add(\"New\")? (ما هو تأثير استدعاء iterator.add أثناء استخدام ListIterator؟)",
                    "options": [
                              "It appends the element at the very end of the list regardless of cursor position.",
                              "It inserts the element immediately before the element that would be returned by next(), if any, and after the element that would be returned by previous().",
                              "It throws an IllegalStateException unless remove() was called immediately prior.",
                              "It replaces the element last returned by next()."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! ListIterator.add(e) inserts the specified element into the list immediately before the cursor position. A subsequent call to next() is unaffected, and previous() would return the new element. (تُدرج add العنصر في موضع المؤشر الحالي مباشرة قبل العنصر التالي، دون إفساد عملية التكرار)."
          },
          {
                    "id": "q14",
                    "question": "What exception is thrown if you call list.get(list.size()) on any non-empty Java List? (ما الاستثناء الذي يُطلق عند استدعاء list.get(list.size())؟)",
                    "options": [
                              "NullPointerException",
                              "IndexOutOfBoundsException",
                              "NoSuchElementException",
                              "ArrayIndexOutOfBoundsException"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! List indices range from 0 to size - 1. Requesting index equal to size() violates the bounds and throws java.lang.IndexOutOfBoundsException. (فهارس القائمة تبدأ من 0 وتنتهي عند size - 1، وطلب الفهرس size يقع خارج الحدود ويطلق IndexOutOfBoundsException)."
          },
          {
                    "id": "q15",
                    "question": "In an application requiring sliding window calculations (e.g., calculating the moving average of the last 3 data points over a stream of items in a List), which method allows viewing slices without allocating new lists? (أي دالة تسمح باستعراض شريحة من القائمة لحساب نافذة منزلقة دون إنشاء قوائم جديدة؟)",
                    "options": [
                              "list.slice(from, to)",
                              "list.subList(from, to)",
                              "list.window(from, to)",
                              "list.partition(from, to)"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! list.subList(from, to) creates a lightweight window view over the specified range of the existing list in O(1) time without copying elements or allocating new array storage. (توفر subList واجهة خفيفة وفورية O(1) فوق البيانات الحالية دون نسخ العناصر أو استهلاك ذاكرة إضافية)."
          }
]
        }
      ]
    }
  ];
})();
