/**
 * Java Curriculum Module - Part 30
 * Topics:
 * 59. Java ArrayList
 * 60. Java LinkedList
 * 
 * 100% Offline, Pure JavaScript. Complete educational content with full bilingual (English & Arabic) explanations.
 */

(function () {
  'use strict';

  window.JAVA_TOPICS_PART30 = [
    /* ==========================================================================
       TOPIC 59: Java ArrayList
       ========================================================================== */
    {
      id: "java-arraylist",
      title: "59. Java ArrayList",
      description: "In-depth Mastery of Java ArrayList: resizable array internal architecture, initial capacity (10), 1.5x growth algorithm, ensureCapacity() & trimToSize(), O(1) random access, CPU cache line spatial locality, fail-fast modCount mechanics, and high-performance bulk operations.",
      lessons: [
        {
          id: "java-arraylist-mastery",
          title: "Complete Guide to Java ArrayList",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "ArrayList Architecture & Internal Mechanics (هيكلية ArrayList وآليات العمل الداخلية)"
            },
            {
              type: "paragraph",
              text: "Java's 'ArrayList' is the most widely used collection class in the standard runtime library. Internally, it is backed by a dynamically resized Object[] array (elementData). When instantiated without parameters, it initializes with an empty array and expands to a default capacity of 10 upon the first element addition. When full, HotSpot JVM expands the array by roughly 50% using bitwise shift: 'newCapacity = oldCapacity + (oldCapacity >> 1)'. Because elements reside in contiguous memory, ArrayList leverages modern CPU hardware cache lines (L1/L2 cache spatial locality), making it significantly faster for traversal and random access than node-based structures."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "تُعتبر فئة 'ArrayList' أكثر هياكل البيانات استخداماً وشهرة في لغة جافا. تعتمد داخلياً على مصفوفة كائنات ديناميكية قابلة للتمدد (Object[]). عند إنشائها دون تحديد سعة، تبدأ بمصفوفة فارغة وتتمدد بسعة افتراضية قدرها 10 عناصر عند إضافة أول عنصر. وعند امتلاء المصفوفة، تزيد جافا حجمها بنسبة 50% تقريباً عبر عملية إزاحة البتات: 'newCapacity = oldCapacity + (oldCapacity >> 1)'. وبسبب تجاور العناصر المتصل في الذاكرة، تستفيد ArrayList استفادة قصوى من الذاكرة المخبأة للمعالج (CPU Cache)، مما يجعلها الأسرع في الوصول العشوائي والقراءة المتتالية."
            },
            {
              type: "paragraph",
              text: "Key Architectural Metrics: 1) Access Time: O(1) random access by index; 2) Insertion at End: Amortized O(1); 3) Insertion/Deletion at Beginning or Middle: O(n) due to System.arraycopy memory shifting; 4) Capacity Tuning: use ensureCapacity(minCapacity) to eliminate costly repeated array reallocation when the size is known in advance."
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
              text: "Example 1: Initial Capacity & Creation (المثال 1: السعة الأولية والإنشاء المخصص)"
            },
            {
              type: "paragraph",
              text: "Allocating an ArrayList with an explicit initial capacity to avoid resizing overhead."
            },
            {
              type: "code",
              language: "java",
              filename: "ArrayListCapacityDemo.java",
              code: `import java.util.ArrayList;

public class ArrayListCapacityDemo {
    public static void main(String[] args) {
        // 1. Default empty constructor (allocates capacity of 10 on first insertion)
        ArrayList<String> defaultList = new ArrayList<>();
        defaultList.add("Item 1");

        // 2. Optimized constructor: Pre-allocating capacity of 1,000 slots
        // Eliminates repeated array copy and reallocation cycles
        ArrayList<Integer> preAllocatedList = new ArrayList<>(1000);
        for (int i = 0; i < 500; i++) {
            preAllocatedList.add(i);
        }

        System.out.println("Default list size:       " + defaultList.size());
        System.out.println("Pre-allocated list size: " + preAllocatedList.size());
    }
}`,
              output: `Default list size:       1
Pre-allocated list size: 500`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "Providing an initial capacity to new ArrayList<>(capacity) saves multiple internal array allocations and System.arraycopy operations."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "تحديد السعة الأولية في المنشئ new ArrayList<>(capacity) يوفر على المعالج عمليات النسخ المتكررة عند إدخال آلاف العناصر."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Resizing Optimization with ensureCapacity() (المثال 2: تحسين التوسيع عبر ensureCapacity)"
            },
            {
              type: "paragraph",
              text: "Proactively expanding internal buffer capacity before batch operations."
            },
            {
              type: "code",
              language: "java",
              filename: "EnsureCapacityDemo.java",
              code: `import java.util.ArrayList;

public class EnsureCapacityDemo {
    public static void main(String[] args) {
        ArrayList<String> buffer = new ArrayList<>();

        // Ensure internal array capacity can hold at least 50,000 items in ONE reallocation
        long start = System.currentTimeMillis();
        buffer.ensureCapacity(50_000);

        for (int i = 0; i < 50_000; i++) {
            buffer.add("Event #" + i);
        }
        long elapsed = System.currentTimeMillis() - start;

        System.out.println("Loaded " + buffer.size() + " elements in " + elapsed + " ms with ensureCapacity().");
    }
}`,
              output: `Loaded 50000 elements in 6 ms with ensureCapacity().`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "ensureCapacity() forces a single array resize up front, avoiding multiple intermediate resizings (10 -> 15 -> 22 -> 33...)."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "تجبر ensureCapacity المصفوفة على التمدد الفوري لمرة واحدة فقط؛ مما يلغي التوسعات التدريجية المتكررة ويوفر الوقت."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Compacting Memory with trimToSize() (المثال 3: تقليص استهلاك الذاكرة عبر trimToSize)"
            },
            {
              type: "paragraph",
              text: "Trimming the internal array length down to match the exact element count."
            },
            {
              type: "code",
              language: "java",
              filename: "TrimToSizeDemo.java",
              code: `import java.util.ArrayList;

public class TrimToSizeDemo {
    public static void main(String[] args) {
        // Pre-allocate a large temporary workspace
        ArrayList<String> records = new ArrayList<>(10_000);
        records.add("Record Alpha");
        records.add("Record Beta");
        records.add("Record Gamma");

        System.out.println("Actual element count (size): " + records.size());

        // Trim the internal Object[] elementData array to exactly length 3
        records.trimToSize();

        System.out.println("Memory compacted successfully via trimToSize().");
    }
}`,
              output: `Actual element count (size): 3
Memory compacted successfully via trimToSize().`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "trimToSize() reallocates the backing array to exactly match size(), freeing unused capacity slots for garbage collection."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "تقلص trimToSize حجم المصفوفة الداخلية ليطابق عدد العناصر الفعلي بالضبط؛ مما يحرر الذاكرة المهدرة لجامع النفايات (GC)."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Insertion at Index vs End (Benchmark) (المثال 4: مقارنة زمن الإضافة في البداية مقابل النهاية)"
            },
            {
              type: "paragraph",
              text: "Benchmarking O(1) tail appends versus O(n) head insertions."
            },
            {
              type: "code",
              language: "java",
              filename: "InsertionBenchmarkDemo.java",
              code: `import java.util.ArrayList;

public class InsertionBenchmarkDemo {
    public static void main(String[] args) {
        int count = 40_000;

        // 1. Appending to end (Amortized O(1))
        ArrayList<Integer> endList = new ArrayList<>();
        long startEnd = System.currentTimeMillis();
        for (int i = 0; i < count; i++) {
            endList.add(i);
        }
        long timeEnd = System.currentTimeMillis() - startEnd;

        // 2. Inserting at index 0 (O(n) each due to memory shifting)
        ArrayList<Integer> headList = new ArrayList<>();
        long startHead = System.currentTimeMillis();
        for (int i = 0; i < count; i++) {
            headList.add(0, i);
        }
        long timeHead = System.currentTimeMillis() - startHead;

        System.out.println("Append to end (O(1)):      " + timeEnd + " ms");
        System.out.println("Insert at index 0 (O(n)):  " + timeHead + " ms");
        System.out.println("Tail append is faster: " + (timeHead > timeEnd));
    }
}`,
              output: `Append to end (O(1)):      4 ms
Insert at index 0 (O(n)):  92 ms
Tail append is faster: true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "Inserting at index 0 calls System.arraycopy to shift every element one position to the right, causing O(n) quadratic overall time."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "تتطلب الإضافة في الفهرس 0 إزاحة كافة العناصر لليمين عبر System.arraycopy بزمن O(n)؛ مما يجعل الإضافة في النهاية أسرع بمراحل."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Fail-Fast Iterator & modCount Verification (المثال 5: آلية الفشل السريع وعداد التعديل modCount)"
            },
            {
              type: "paragraph",
              text: "Observing how ArrayList detects concurrent modifications during iteration."
            },
            {
              type: "code",
              language: "java",
              filename: "FailFastDemo.java",
              code: `import java.util.ArrayList;
import java.util.ConcurrentModificationException;
import java.util.Iterator;
import java.util.List;

public class FailFastDemo {
    public static void main(String[] args) {
        List<String> items = new ArrayList<>(List.of("A", "B", "C"));

        try {
            Iterator<String> it = items.iterator();
            while (it.hasNext()) {
                String val = it.next();
                if (val.equals("B")) {
                    // Direct modification on list modifies internal modCount
                    items.add("MUTATION");
                }
            }
        } catch (ConcurrentModificationException e) {
            System.out.println("Caught ConcurrentModificationException!");
            System.out.println("ArrayList detected unexpected structural modification during iteration.");
        }
    }
}`,
              output: `Caught ConcurrentModificationException!
ArrayList detected unexpected structural modification during iteration.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "ArrayList tracks structural modifications with an internal 'modCount' field. If an iterator detects modCount != expectedModCount, it fails fast."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "يتتبع ArrayList عدد التعديلات عبر حقل modCount؛ فإذا اختلف العداد أثناء التكرار يرمي مكرر القائمة استثناء الفشل السريع فوراً."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Bulk Operations (addAll, removeAll, retainAll) (المثال 6: العمليات المجمعة فائقة السرعة)"
            },
            {
              type: "paragraph",
              text: "Using vectorized bulk array operations for efficiency."
            },
            {
              type: "code",
              language: "java",
              filename: "ArrayListBulkDemo.java",
              code: `import java.util.ArrayList;
import java.util.List;

public class ArrayListBulkDemo {
    public static void main(String[] args) {
        ArrayList<String> primary = new ArrayList<>(List.of("Alpha", "Beta", "Gamma", "Delta"));
        ArrayList<String> secondary = new ArrayList<>(List.of("Beta", "Delta", "Epsilon"));

        // 1. Bulk retain (Intersection)
        ArrayList<String> intersection = new ArrayList<>(primary);
        intersection.retainAll(secondary);
        System.out.println("Intersection: " + intersection);

        // 2. Bulk remove (Difference)
        ArrayList<String> difference = new ArrayList<>(primary);
        difference.removeAll(secondary);
        System.out.println("Difference:   " + difference);

        // 3. Bulk insert at specific index
        primary.addAll(1, List.of("INSERTED-1", "INSERTED-2"));
        System.out.println("After positional addAll: " + primary);
    }
}`,
              output: `Intersection: [Beta, Delta]
Difference:   [Alpha, Gamma]
After positional addAll: [Alpha, INSERTED-1, INSERTED-2, Beta, Gamma, Delta]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "ArrayList's bulk methods leverage System.arraycopy to perform multi-element shifts in single optimized native blocks."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "تستخدم العمليات المجمعة في ArrayList دوال النظام السريعة مثل System.arraycopy لنقل كتل البيانات دفعة واحدة."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Safe Cloning via Cloneable Interface (المثال 7: الاستنساخ السطحي عبر clone)"
            },
            {
              type: "paragraph",
              text: "Creating a shallow copy of an ArrayList using the clone() method."
            },
            {
              type: "code",
              language: "java",
              filename: "ArrayListCloneDemo.java",
              code: `import java.util.ArrayList;

public class ArrayListCloneDemo {
    public static void main(String[] args) {
        ArrayList<StringBuilder> original = new ArrayList<>();
        original.add(new StringBuilder("Hello"));
        original.add(new StringBuilder("World"));

        // clone() creates a shallow copy
        @SuppressWarnings("unchecked")
        ArrayList<StringBuilder> cloned = (ArrayList<StringBuilder>) original.clone();

        System.out.println("Original: " + original);
        System.out.println("Cloned:   " + cloned);

        // Mutating element inside cloned affects original (shallow copy!)
        cloned.get(0).append(" Java!");
        System.out.println("After mutation: Original[0] is: " + original.get(0));

        // Adding an item to cloned does NOT affect original list structure
        cloned.add(new StringBuilder("Extra"));
        System.out.println("Original size: " + original.size() + " | Cloned size: " + cloned.size());
    }
}`,
              output: `Original: [Hello, World]
Cloned:   [Hello, World]
After mutation: Original[0] is: Hello Java!
Original size: 2 | Cloned size: 3`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "clone() creates a new ArrayList with its own array structure, but element references inside are shallow copies."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "تنشئ clone() نسخة سطحية (Shallow Copy)؛ حيث تكون المصفوفة مستقلة بينما تشير العناصر لنفس الكائنات بالذاكرة."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: ArrayList Serialization & Deserialization (المثال 8: حفظ واستعادة كائنات ArrayList ثنائياً)"
            },
            {
              type: "paragraph",
              text: "How ArrayList customizes serialization to save only active elements, not empty buffer slots."
            },
            {
              type: "code",
              language: "java",
              filename: "ArrayListSerializationDemo.java",
              code: `import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.ArrayList;

public class ArrayListSerializationDemo {
    public static void main(String[] args) throws Exception {
        ArrayList<String> data = new ArrayList<>(100); // 100 capacity, only 2 used
        data.add("Secure Payload Alpha");
        data.add("Secure Payload Beta");

        // Serialize ArrayList
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try (ObjectOutputStream oos = new ObjectOutputStream(baos)) {
            oos.writeObject(data);
        }

        byte[] serializedBytes = baos.toByteArray();
        System.out.println("Serialized payload size: " + serializedBytes.length + " bytes.");

        // Deserialize back
        try (ObjectInputStream ois = new ObjectInputStream(new ByteArrayInputStream(serializedBytes))) {
            @SuppressWarnings("unchecked")
            ArrayList<String> restored = (ArrayList<String>) ois.readObject();
            System.out.println("Restored elements: " + restored);
            System.out.println("Restored size:     " + restored.size());
        }
    }
}`,
              output: `Serialized payload size: 139 bytes.
Restored elements: [Secure Payload Alpha, Secure Payload Beta]
Restored size:     2`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "ArrayList implements custom writeObject and readObject methods, serializing only actual elements (size) and omitting empty buffer slots."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "تخصص ArrayList عملية الحفظ التسلسلي لكتابة العناصر الفعلية فقط دون حفظ الخانات الفارغة لتوفير المساحة والشبكة."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Fast Random Access Iteration vs Iterator (المثال 9: سرعة التكرار بالفهرس في RandomAccess)"
            },
            {
              type: "paragraph",
              text: "Comparing standard indexed for-loop with Iterator traversal."
            },
            {
              type: "code",
              language: "java",
              filename: "RandomAccessBenchmarkDemo.java",
              code: `import java.util.ArrayList;
import java.util.RandomAccess;

public class RandomAccessBenchmarkDemo {
    public static void main(String[] args) {
        ArrayList<Integer> numbers = new ArrayList<>(100_000);
        for (int i = 0; i < 100_000; i++) numbers.add(i);

        // Verify ArrayList implements RandomAccess marker interface
        System.out.println("Implements RandomAccess? " + (numbers instanceof RandomAccess));

        // 1. Classic indexed loop (fastest on ArrayList due to direct array index math)
        long startLoop = System.nanoTime();
        long sum1 = 0;
        for (int i = 0; i < numbers.size(); i++) {
            sum1 += numbers.get(i);
        }
        long timeLoop = System.nanoTime() - startLoop;

        // 2. Enhanced for-each loop
        long startForeach = System.nanoTime();
        long sum2 = 0;
        for (int val : numbers) {
            sum2 += val;
        }
        long timeForeach = System.nanoTime() - startForeach;

        System.out.println("Indexed for-loop time: " + timeLoop / 1_000_000.0 + " ms");
        System.out.println("For-each loop time:    " + timeForeach / 1_000_000.0 + " ms");
        System.out.println("Sums match: " + (sum1 == sum2));
    }
}`,
              output: `Implements RandomAccess? true
Indexed for-loop time: 1.15 ms
For-each loop time:    1.42 ms
Sums match: true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "ArrayList implements RandomAccess. A traditional indexed for-loop avoids allocating an Iterator object entirely."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "تطبق ArrayList واجهة RandomAccess؛ وحلقة for الفهرسية التقليدية تتجنب إنشاء كائن مكرر (Iterator) في الذاكرة."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Sorting Primitive Wrappers & Custom Objects (المثال 10: الترتيب المخصص للكائنات في ArrayList)"
            },
            {
              type: "paragraph",
              text: "Sorting complex business objects by multiple criteria."
            },
            {
              type: "code",
              language: "java",
              filename: "ArrayListSortingDemo.java",
              code: `import java.util.ArrayList;
import java.util.Comparator;

public class ArrayListSortingDemo {
    static class ServerNode {
        String hostname;
        int cpuCores;
        double loadAverage;

        ServerNode(String hostname, int cpuCores, double loadAverage) {
            this.hostname = hostname;
            this.cpuCores = cpuCores;
            this.loadAverage = loadAverage;
        }

        @Override
        public String toString() {
            return String.format("%s (Cores: %d, Load: %.2f)", hostname, cpuCores, loadAverage);
        }
    }

    public static void main(String[] args) {
        ArrayList<ServerNode> cluster = new ArrayList<>();
        cluster.add(new ServerNode("node-03", 8, 2.45));
        cluster.add(new ServerNode("node-01", 16, 1.10));
        cluster.add(new ServerNode("node-02", 8, 0.85));

        // Sort by cpuCores desc, then loadAverage asc
        cluster.sort(Comparator
                .comparingInt((ServerNode s) -> s.cpuCores).reversed()
                .thenComparingDouble(s -> s.loadAverage));

        System.out.println("Sorted Server Cluster:");
        cluster.forEach(s -> System.out.println(" * " + s));
    }
}`,
              output: `Sorted Server Cluster:
 * node-01 (Cores: 16, Load: 1.10)
 * node-02 (Cores: 8, Load: 0.85)
 * node-03 (Cores: 8, Load: 2.45)`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "ArrayList.sort() uses TimSort (hybrid MergeSort and InsertionSort), providing stable, guaranteed O(n log n) performance."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "تستخدم دالة ArrayList.sort خوارزمية TimSort الهجينة والمستقرة، مما يضمن أداءً فائقاً بزمن O(n log n)."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Converting ArrayList to Primitives using Stream API (المثال 11: تحويل ArrayList إلى مصفوفات أولية عبر Streams)"
            },
            {
              type: "paragraph",
              text: "Converting ArrayList<Integer> to primitive int[] without manual loops."
            },
            {
              type: "code",
              language: "java",
              filename: "ArrayListToPrimitiveDemo.java",
              code: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ArrayListToPrimitiveDemo {
    public static void main(String[] args) {
        ArrayList<Integer> boxedList = new ArrayList<>(List.of(10, 20, 30, 40, 50));

        // Modern Stream conversion: unbox into primitive int[]
        int[] primitiveArray = boxedList.stream().mapToInt(Integer::intValue).toArray();

        System.out.println("Boxed List:       " + boxedList);
        System.out.println("Primitive int[]:  " + Arrays.toString(primitiveArray));
        System.out.println("Primitive length: " + primitiveArray.length);
    }
}`,
              output: `Boxed List:       [10, 20, 30, 40, 50]
Primitive int[]:  [10, 20, 30, 40, 50]
Primitive length: 5`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "mapToInt(Integer::intValue).toArray() cleanly transforms boxed Integer collections into unboxed primitive int arrays."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "تحول mapToInt عناصر القائمة المغلفة إلى مصفوفة أرقام أولية int[] دون الحاجة لكتابة حلقات يدوية."
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
                "Mistake 1: Repeatedly inserting elements at index 0 of an ArrayList in a loop. This degrades throughput to O(n^2) due to constant array shifting.",
                "خطأ 1: إضافة عناصر متكررة في بداية ArrayList داخل حلقة؛ مما يهدر الأداء بتعقيد O(n^2) بسبب الإزاحة المستمرة للمصفوفة.",
                "Mistake 2: Not setting an initial capacity when the final size is known in advance, causing needless reallocation and garbage generation.",
                "خطأ 2: عدم تحديد السعة الأولية عند معرفة حجم البيانات مسبقاً، مما يسبب تمديدات متكررة وإنهاك جامع النفايات.",
                "Mistake 3: Assuming ArrayList is thread-safe. Multiple threads mutating an ArrayList concurrently without external synchronization will corrupt internal state.",
                "خطأ 3: افتراض أن ArrayList آمنة في تعدد الخيوط؛ فتعديلها المتزامن دون مزامنة خارجية يفسد البيانات فوراً.",
                "Mistake 4: Expecting clone() to produce a deep copy of elements. ArrayList.clone() is strictly a shallow copy."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: High-Throughput Batch Deduplicator (التحدي العملي: مصفاة الدفعات عالية السرعة)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Create a class 'BatchDeduplicator' that takes an unsorted ArrayList<Integer>, removes duplicates in O(n log n) time by sorting, compacts memory with trimToSize(), and returns the deduplicated ArrayList. Test in main() with a large duplicate-heavy dataset and verify accuracy."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: صمم فئة BatchDeduplicator تأخذ ArrayList<Integer> غير مرتبة، وتحذف التكرارات بزمن O(n log n) عبر الترتيب، وتقلص حجم الذاكرة بـ trimToSize()، ثم تُرجع القائمة الصافية. اختبرها في main على بيانات تجريبية واطبع النتيجة."
            },
            {
              type: "code",
              language: "java",
              filename: "BatchDeduplicatorChallenge.java",
              code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class BatchDeduplicatorChallenge {
    public static ArrayList<Integer> deduplicateFast(ArrayList<Integer> input) {
        if (input == null || input.size() <= 1) return input;

        // 1. Sort in-place (O(n log n))
        Collections.sort(input);

        // 2. Compact duplicates in single linear pass
        ArrayList<Integer> result = new ArrayList<>(input.size());
        result.add(input.get(0));

        for (int i = 1; i < input.size(); i++) {
            if (!input.get(i).equals(input.get(i - 1))) {
                result.add(input.get(i));
            }
        }

        // 3. Compact memory
        result.trimToSize();
        return result;
    }

    public static void main(String[] args) {
        ArrayList<Integer> raw = new ArrayList<>(List.of(
            42, 10, 5, 42, 99, 10, 5, 10, 42, 100, 99
        ));

        System.out.println("Raw inputs:        " + raw);
        ArrayList<Integer> clean = deduplicateFast(raw);
        System.out.println("Clean deduplicated:" + clean);
        System.out.println("Clean size:        " + clean.size());
    }
}`,
              output: `Raw inputs:        [42, 10, 5, 42, 99, 10, 5, 10, 42, 100, 99]
Clean deduplicated:[5, 10, 42, 99, 100]
Clean size:        5`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "Sorting groups identical values together. A single O(n) pass retains only the first element of each group, and trimToSize() releases unused buffer slots."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "يجمع الترتيب العناصر المتشابهة متجاورة، ثم يمر المسار الخطي ليأخذ العنصر الفريد فقط، وتُقلص trimToSize حجم المصفوفة لتطابق الناتج تماماً."
            }
          ],
          quiz: [
          {
                    "id": "q1",
                    "question": "What is the underlying data structure that powers java.util.ArrayList? (ما هو هيكل البيانات الأساسي الذي تعتمد عليه ArrayList في جافا؟)",
                    "options": [
                              "A doubly-linked list of node objects.",
                              "A resizable array of Object references (Object[] elementData).",
                              "A red-black binary search tree.",
                              "A hash bucket table."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! ArrayList is internally backed by a contiguous array of Object references (Object[] elementData) that automatically resizes when capacity is exceeded. (تعتمد ArrayList داخلياً على مصفوفة كائنات متجاورة في الذاكرة تتوسع ديناميكياً عند امتلائها)."
          },
          {
                    "id": "q2",
                    "question": "When new ArrayList<>() is instantiated with the default no-argument constructor, what is its initial backing array capacity before any element is added? (عند إنشاء ArrayList بالمُنشئ الافتراضي، كم تكون سعة المصفوفة الداخلية قبل إضافة أي عنصر؟)",
                    "options": [
                              "10 elements allocated immediately in heap memory.",
                              "0 (it points to a shared empty array constant DEFAULTCAPACITY_EMPTY_ELEMENTDATA, deferring allocation of 10 slots until the first add() call).",
                              "16 elements.",
                              "1024 bytes."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! To conserve memory, modern Java uses lazy initialization: the empty constructor assigns elementData to a shared empty array. The default capacity of 10 is only allocated when the first element is added. (لتقليل استهلاك الذاكرة، يبدأ الكائن بمصفوفة فارغة مشتركة بسعة 0، ولا يتم حجز السعة الافتراضية 10 إلا عند إضافة أول عنصر فعلياً)."
          },
          {
                    "id": "q3",
                    "question": "By what growth formula does an ArrayList expand its internal array capacity when it becomes full? (ما هي معادلة زيادة السعة عند امتلاء مصفوفة ArrayList الداخلية؟)",
                    "options": [
                              "It doubles in size: oldCapacity * 2",
                              "It grows by approximately 50%: newCapacity = oldCapacity + (oldCapacity >> 1)",
                              "It increases by a fixed 10 slots every time.",
                              "It squares its capacity: oldCapacity * oldCapacity"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! In standard OpenJDK, ArrayList expands by 50% using bit-shift: newCapacity = oldCapacity + (oldCapacity >> 1). For example, 10 grows to 15, then 22, then 33, etc. (تتوسع ArrayList بنسبة 50% تقريباً عبر إزاحة البتات لليمين بمقدار خانة واحدة وجمعها مع السعة السابقة)."
          },
          {
                    "id": "q4",
                    "question": "Why is adding an element at index 0 (list.add(0, item)) significantly slower than appending to the end (list.add(item)) in an ArrayList? (لماذا تكون الإضافة عند الفهرس 0 أبطأ بكثير من الإضافة في نهاية ArrayList؟)",
                    "options": [
                              "Because index 0 is encrypted in memory.",
                              "Because inserting at index 0 requires calling System.arraycopy to shift all existing n elements one position to the right (an O(n) operation), whereas appending to the end requires no shifting (amortized O(1)).",
                              "Because index 0 triggers a garbage collection pause.",
                              "Because ArrayList does not permit index 0 insertions."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Inserting at index 0 forces every single existing element to be shifted right by one position (O(n) time via System.arraycopy). Appending at the end simply places the item in elementData[size++] with no shifting. (الإضافة في البداية تتطلب إزاحة كافة العناصر الموجودة خطوة لليمين بتكلفة O(n)، بينما الإضافة في النهاية تضع العنصر فوراً دون إزاحة)."
          },
          {
                    "id": "q5",
                    "question": "What is the purpose of calling list.ensureCapacity(int minCapacity) on an ArrayList? (ما هو الغرض من استدعاء list.ensureCapacity في ArrayList؟)",
                    "options": [
                              "To set the maximum number of items the list can ever hold, throwing an exception if exceeded.",
                              "To pre-allocate the internal array capacity to hold at least minCapacity elements, avoiding multiple expensive incremental resizing and array copying operations during large batch inserts.",
                              "To shrink the array and free memory.",
                              "To lock the list against modifications."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! If you know in advance that you will insert 100,000 items, calling ensureCapacity(100000) reallocates the backing array once upfront, eliminating dozens of intermediate array resizing and copying operations. (استدعاء ensureCapacity يحجز السعة المطلوبة مسبقاً بدفعة واحدة، مما يلغي التوسيع المتكرر والنسخ المكلف أثناء إدخال كميات كبيرة من البيانات)."
          },
          {
                    "id": "q6",
                    "question": "What does list.trimToSize() do in an ArrayList? (ما الذي تفعله دالة list.trimToSize() في ArrayList؟)",
                    "options": [
                              "Deletes the last half of the elements.",
                              "Trims the capacity of the internal array to be equal to the list's current size, freeing unused memory slots.",
                              "Truncates all Strings in the list to 10 characters.",
                              "Removes all null elements from the list."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! trimToSize() trims the capacity of the ArrayList instance to be the list's current size. An application can use this operation to minimize the storage of an ArrayList instance after additions have finished. (تقوم trimToSize بتقليص حجم المصفوفة الداخلية ليتطابق مع عدد العناصر الفعلي تماماً، مما يحرر مساحات الذاكرة المحجوزة غير المستغلة)."
          },
          {
                    "id": "q7",
                    "question": "How does ArrayList implement the 'fail-fast' mechanism in its iterators? (كيف تطبق ArrayList آلية الفشل السريع fail-fast في مكرراتها؟)",
                    "options": [
                              "By tracking an internal field 'modCount' (modification count); the iterator stores expectedModCount and throws ConcurrentModificationException if modCount != expectedModCount.",
                              "By locking the entire JVM process during iteration.",
                              "By terminating the application if an element takes longer than 1ms to read.",
                              "By maintaining a copy of the list on the hard disk."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! ArrayList maintains a protected int modCount that increments on every structural modification (add, remove). The iterator records this value in expectedModCount upon creation. If any external structural change occurs during traversal, it detects the mismatch and immediately throws ConcurrentModificationException. (تحتفظ ArrayList بعداد modCount يزيد مع كل تعديل هيكلي، ويكتشف المكرر أي تغيير مفاجئ ليرمي استثناء ConcurrentModificationException فوراً)."
          },
          {
                    "id": "q8",
                    "question": "Why does ArrayList implement the java.util.RandomAccess marker interface, whereas LinkedList does not? (لماذا تطبق ArrayList الواجهة الوسمية RandomAccess بينما لا تطبقها LinkedList؟)",
                    "options": [
                              "To signal that it generates cryptographically secure random numbers.",
                              "To signal that it supports constant-time O(1) positional access by index, allowing generic algorithms (like Collections.binarySearch) to choose fast indexed for-loops over iterators.",
                              "To allow access without needing an index.",
                              "To indicate that the order of elements is randomized."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! RandomAccess is a marker interface implemented by List implementations to indicate that they support fast (typically constant time O(1)) random access. Algorithms like Collections.binarySearch check 'list instanceof RandomAccess' to select the most efficient traversal strategy. (واجهة RandomAccess تشير إلى أن القائمة تدعم الوصول الفوري O(1) بالفهرس، مما يرشد الخوارزميات لاستخدام التكرار بالفهرس بدلاً من المكررات البطيئة)."
          },
          {
                    "id": "q9",
                    "question": "Consider this code:\nArrayList<String> original = new ArrayList<>();\noriginal.add(\"Red\");\nArrayList<String> clone = (ArrayList<String>) original.clone();\nclone.add(\"Blue\");\nSystem.out.println(original.size() + \" \" + clone.size());\nWhat is printed? (ما الذي يطبعه الكود التالي؟)",
                    "options": [
                              "1 1",
                              "1 2",
                              "2 2",
                              "Throws a CloneNotSupportedException"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! original.clone() performs a shallow copy of the ArrayList, allocating a new independent internal elementData array. Adding \"Blue\" to clone does not affect original. original has 1 element and clone has 2 elements. (الاستنساخ عبر clone ينشئ مصفوفة جديدة مستقلة للحاوية، وإضافة عنصر للنسخة لا يغير القائمة الأصلية فيكون الناتج 1 2)."
          },
          {
                    "id": "q10",
                    "question": "How does ArrayList serialize its elements in ObjectOutputStream? (كيف تحفظ ArrayList بياناتها أثناء التسلسل الثنائي Serialization؟)",
                    "options": [
                              "It blindly serializes the entire elementData array including all empty/unused capacity slots.",
                              "It marks elementData as 'transient' and uses custom writeObject() to write only the active 'size' elements sequentially, avoiding wasting disk and network bandwidth on empty buffer slots.",
                              "It converts elements to JSON text.",
                              "It delegates serialization to the database."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! The backing array 'transient Object[] elementData' is marked transient. ArrayList implements custom writeObject() and readObject() methods to serialize only the actual elements from 0 to size-1, omitting empty tail capacity slots. (حقل المصفوفة معرف بـ transient، وتقوم ArrayList بكتابة العناصر الفعلية فقط من 0 إلى size-1 لتجنب تسلسل الخانات الفارغة وهدر الباندويث)."
          },
          {
                    "id": "q11",
                    "question": "What is the time complexity of list.contains(target) in an ArrayList of size n? (ما هو التعقيد الزمني لعملية فحص الوجود contains في ArrayList بحجم n؟)",
                    "options": [
                              "O(1)",
                              "O(log n)",
                              "O(n), because it must perform a linear scan using .equals() from index 0 to size-1 in the worst case.",
                              "O(n^2)"
                    ],
                    "correctIndex": 2,
                    "explanation": "Correct! Because ArrayList is unordered and not indexed by hash/key, contains(target) must iterate through the elements one-by-one comparing via equals() until a match is found or the end is reached, which takes O(n) time. (عملية contains تتطلب مسحاً خطياً بالمرور على العناصر واحداً تلو الآخر ومقارنتها بدالة equals مما يستغرق زمناً خطياً O(n))."
          },
          {
                    "id": "q12",
                    "question": "What happens when you execute this code?\nArrayList<Integer> list = new ArrayList<>();\nlist.add(10);\nlist.add(20);\nlist.add(30);\nfor (Integer val : list) {\n    if (val == 20) list.remove(val);\n}\n(ما الذي يحدث عند تنفيذ هذا الكود؟)",
                    "options": [
                              "The element 20 is cleanly removed without error.",
                              "A ConcurrentModificationException is thrown on the subsequent iteration because the list was structurally modified during enhanced for-each iteration.",
                              "The list is cleared completely.",
                              "An IndexOutOfBoundsException is thrown."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! The enhanced for-loop uses an Iterator behind the scenes. Modifying the list directly via list.remove(val) changes modCount without updating the iterator's expectedModCount, triggering a ConcurrentModificationException on the next loop check. Use list.removeIf(...) or Iterator.remove(). (الحلقة تستخدم Iterator ضمنياً، وتعديل القائمة مباشرة يغير modCount مما يطلق ConcurrentModificationException فوراً)."
          },
          {
                    "id": "q13",
                    "question": "How can you convert an ArrayList<Integer> into a primitive int[] array using Java 8 Streams? (كيف تحول ArrayList<Integer> إلى مصفوفة أولية int[] عبر Streams؟)",
                    "options": [
                              "int[] arr = list.stream().mapToInt(Integer::intValue).toArray();",
                              "int[] arr = (int[]) list.toArray();",
                              "int[] arr = list.toIntArray();",
                              "int[] arr = list.stream().toArray(int[]::new);"
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! mapToInt(Integer::intValue) maps the Stream<Integer> to an IntStream (unboxing wrappers to primitive ints), on which .toArray() returns an int[]. (دالة mapToInt تحول التدفق إلى IntStream للأعداد الأولية واستدعاء toArray ينتج مصفوفة int[] بنجاح)."
          },
          {
                    "id": "q14",
                    "question": "What is the result of calling list.addAll(2, anotherList) on an ArrayList? (ما نتيجة استدعاء addAll(2, anotherList) على ArrayList؟)",
                    "options": [
                              "It replaces the element at index 2 with anotherList.",
                              "It inserts all elements of anotherList starting at index 2, shifting the original elements at index 2 and above to the right.",
                              "It throws an IndexOutOfBoundsException if anotherList has more than 2 items.",
                              "It sorts the list after appending to index 2."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! addAll(int index, Collection<? extends E> c) inserts all elements from the specified collection into the list at the specified position, shifting existing elements to the right. (تقوم الدالة بإدراج كافة عناصر المجموعة المدخلة بدءاً من الفهرس 2 مع إزاحة العناصر الأصلية نحو اليمين)."
          },
          {
                    "id": "q15",
                    "question": "In a scenario where you must repeatedly look up elements by index (e.g., retrieving random array items millions of times), why is ArrayList vastly superior to LinkedList? (في سيناريو يتطلب قراءة ملايين العناصر بالفهرس عشوائياً، لماذا تتفوق ArrayList بشكل ساحق على LinkedList؟)",
                    "options": [
                              "ArrayList lookups are O(1) direct memory pointer calculations, whereas LinkedList requires an O(n) node-by-node traversal for every single index lookup.",
                              "LinkedList only supports up to 1000 items.",
                              "ArrayList uses the GPU for lookups.",
                              "LinkedList values are stored on disk."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! ArrayList access is O(1) constant-time direct pointer arithmetic. LinkedList has no contiguous array or direct indexing; accessing index i requires traversing nodes link-by-link from head or tail (O(n)), making repeated indexed access catastrophically slow on LinkedList. (الوصول بالفهرس في ArrayList فوري O(1) بحساب رياضي مباشر للعنوان، بينما تتطلب LinkedList التنقل عقدة تلو الأخرى O(n) مما يجعلها بطيئة للغاية)."
          }
]
        }
      ]
    },

    /* ==========================================================================
       TOPIC 60: Java LinkedList
       ========================================================================== */
    {
      id: "java-linkedlist",
      title: "60. Java LinkedList",
      description: "Comprehensive Guide to Java LinkedList: doubly-linked list architecture, dual List and Deque interface implementation, O(1) head/tail operations (addFirst, addLast, pollFirst, pollLast), O(n) indexed traversal, node memory overhead vs ArrayList, and optimal queue/stack use cases.",
      lessons: [
        {
          id: "java-linkedlist-mastery",
          title: "Complete Guide to Java LinkedList",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "Doubly-Linked List Architecture & The Deque Dual Role (هيكلية القائمة المترابطة المزدوجة والدور المزدوج مع Deque)"
            },
            {
              type: "paragraph",
              text: "Java's 'LinkedList' is implemented as a doubly-linked list of private Node<E> objects, where each node maintains references to 'item', 'next', and 'prev'. Crucially, LinkedList implements both the 'java.util.List' and 'java.util.Deque' (Double-Ended Queue) interfaces. This dual role allows it to function seamlessly as an indexed list, a FIFO Queue, a LIFO Stack, or a bidirectional Deque. Unlike ArrayList, LinkedList never reallocates or resizes a backing array—inserting or removing at the head or tail is strictly O(1) pointer manipulation."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "تُبنى فئة 'LinkedList' في جافا كهيكل قائمة مترابطة مزدوجة (Doubly-Linked List) تتكون من عقد (Nodes) تحتوي كل عقدة فيها على العنصر ومؤشر للعقدة التالية (next) ومؤشر للعقدة السابقة (prev). ومن أهم مميزات LinkedList أنها تطبق واجهتين معاً: 'List' و 'Deque' (طابور مزدوج النهايات)؛ مما يمكنها من العمل كقائمة عادية، أو كطابور انتظار FIFO، أو كمكدس LIFO. وبخلاف ArrayList، لا تقوم LinkedList بإعادة تخصيص مصفوفات أبداً، وتتم عمليات الإضافة والحذف في البداية والنهاية بزمن فوري ثابت O(1)."
            },
            {
              type: "paragraph",
              text: "Architectural Comparison: 1) Head/Tail Insertion/Deletion: O(1) instantaneous pointer update; 2) Indexed Access get(i): O(n) traversal from the closest end (head if index < size/2, tail otherwise); 3) Memory Overhead: On a 64-bit JVM, each node consumes 24 bytes (12-byte header + 3x 4-byte compressed oops references), creating substantial memory overhead compared to raw arrays."
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
              text: "Example 1: Basic LinkedList as a Sequence (المثال 1: الاستخدام الأساسي كقائمة مرتبة)"
            },
            {
              type: "paragraph",
              text: "Adding, retrieving, and iterating through elements using List interface methods."
            },
            {
              type: "code",
              language: "java",
              filename: "BasicLinkedListDemo.java",
              code: `import java.util.LinkedList;
import java.util.List;

public class BasicLinkedListDemo {
    public static void main(String[] args) {
        List<String> list = new LinkedList<>();

        list.add("Alpha");
        list.add("Beta");
        list.add("Gamma");

        System.out.println("Elements in LinkedList: " + list);
        System.out.println("Element at index 1:     " + list.get(1));
        System.out.println("Total size:             " + list.size());
    }
}`,
              output: `Elements in LinkedList: [Alpha, Beta, Gamma]
Element at index 1:     Beta
Total size:             3`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "LinkedList satisfies the standard List contract, supporting indexing, ordering, and duplicates."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "تطبق LinkedList عقد واجهة List بالكامل؛ فتدعم الفهرسة والترتيب وتكرار العناصر."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: O(1) Head and Tail Operations (Deque Contract) (المثال 2: عمليات البداية والنهاية الفورية O(1))"
            },
            {
              type: "paragraph",
              text: "Using addFirst(), addLast(), getFirst(), and getLast() in constant time."
            },
            {
              type: "code",
              language: "java",
              filename: "LinkedListDequeDemo.java",
              code: `import java.util.LinkedList;

public class LinkedListDequeDemo {
    public static void main(String[] args) {
        LinkedList<String> deque = new LinkedList<>();

        // Constant time O(1) operations on both ends
        deque.addFirst("Middle");
        deque.addFirst("Front");
        deque.addLast("Back");

        System.out.println("Deque state: " + deque);
        System.out.println("First item:  " + deque.getFirst());
        System.out.println("Last item:   " + deque.getLast());

        // O(1) removal
        String removedHead = deque.removeFirst();
        String removedTail = deque.removeLast();

        System.out.println("Removed head: " + removedHead);
        System.out.println("Removed tail: " + removedTail);
        System.out.println("Remaining:    " + deque);
    }
}`,
              output: `Deque state: [Front, Middle, Back]
First item:  Front
Last item:   Back
Removed head: Front
Removed tail: Back
Remaining:    [Middle]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "addFirst and addLast only adjust head or tail node pointers, executing in O(1) time with no element shifting."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "تعدل addFirst و addLast مؤشرات الرأس أو الذيل فقط بزمن O(1) فوري دون إزاحة أي عناصر أخرى بالذاكرة."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Safe Polling & Peeking (Null-Safe Deque Methods) (المثال 3: الاستعلام والسحب الآمن بدون استثناءات)"
            },
            {
              type: "paragraph",
              text: "Contrasting throwing methods (removeFirst) with safe methods (pollFirst, peekFirst)."
            },
            {
              type: "code",
              language: "java",
              filename: "SafeQueueMethodsDemo.java",
              code: `import java.util.LinkedList;

public class SafeQueueMethodsDemo {
    public static void main(String[] args) {
        LinkedList<String> queue = new LinkedList<>();

        // peekFirst returns null on empty collection instead of throwing NoSuchElementException
        System.out.println("peekFirst on empty list: " + queue.peekFirst());
        System.out.println("pollFirst on empty list: " + queue.pollFirst());

        queue.offer("Print Job 1"); // Safe enqueue
        queue.offer("Print Job 2");

        System.out.println("Inspecting head without removing: " + queue.peek());
        System.out.println("Dequeuing first job:              " + queue.poll());
        System.out.println("Remaining queue size:             " + queue.size());
    }
}`,
              output: `peekFirst on empty list: null
pollFirst on empty list: null
Inspecting head without removing: Print Job 1
Dequeuing first job:              Print Job 1
Remaining queue size:             1`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "poll() and peek() return null when the collection is empty, whereas remove() and element() throw NoSuchElementException."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "تُرجع دوال poll() و peek() القيمة null بأمان إذا كانت القائمة فارغة بدلاً من رمي استثناءات توقف البرنامج."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Using LinkedList as a LIFO Stack (المثال 4: استخدام LinkedList كمكدس LIFO)"
            },
            {
              type: "paragraph",
              text: "Utilizing push(), pop(), and peek() on LinkedList."
            },
            {
              type: "code",
              language: "java",
              filename: "LinkedListStackDemo.java",
              code: `import java.util.LinkedList;

public class LinkedListStackDemo {
    public static void main(String[] args) {
        LinkedList<String> stack = new LinkedList<>();

        // LIFO Stack operations
        stack.push("Page 1 (Home)");
        stack.push("Page 2 (Products)");
        stack.push("Page 3 (Checkout)");

        System.out.println("Top of stack (peek): " + stack.peek());

        System.out.println("Popping navigation history:");
        while (!stack.isEmpty()) {
            System.out.println(" -> " + stack.pop());
        }
    }
}`,
              output: `Top of stack (peek): Page 3 (Checkout)
Popping navigation history:
 -> Page 3 (Checkout)
 -> Page 2 (Products)
 -> Page 1 (Home)`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "LinkedList.push() adds to the head (addFirst), and pop() removes from the head (removeFirst), modeling a LIFO stack in O(1)."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "تضيف push في الرأس وتسحب pop من الرأس بزمن O(1)، مما يجعلها كافية لمحاكاة مكدس التراجع وتاريخ التصفح."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Index Optimization in get(i) (Bi-directional Search) (المثال 5: تحسين البحث بالفهرس من أقرب طرف)"
            },
            {
              type: "paragraph",
              text: "How LinkedList inspects whether index is closer to head (0) or tail (size-1) before traversing."
            },
            {
              type: "code",
              language: "java",
              filename: "IndexedTraversalOptimizationDemo.java",
              code: `import java.util.LinkedList;

public class IndexedTraversalOptimizationDemo {
    public static void main(String[] args) {
        LinkedList<Integer> list = new LinkedList<>();
        for (int i = 0; i < 10; i++) {
            list.add(i * 10);
        }

        // Internally:
        // Index 2 is < size/2 (5): traverses forward from HEAD (0 -> 1 -> 2)
        int early = list.get(2);

        // Index 8 is >= size/2 (5): traverses backward from TAIL (9 -> 8)
        int late = list.get(8);

        System.out.println("Index 2 (traversed from HEAD): " + early);
        System.out.println("Index 8 (traversed from TAIL): " + late);
    }
}`,
              output: `Index 2 (traversed from HEAD): 20
Index 8 (traversed from TAIL): 80`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "LinkedList.get(index) starts from head if index < (size >> 1), or from tail otherwise. However, it still costs O(n) comparisons in the worst case."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "تفحص get(i) موضع الفهرس؛ فتبدأ المسح من الرأس إذا كان قريباً من البداية، أو من الذيل إذا كان قريباً من النهاية، ومع ذلك يظل التعقيد O(n)."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: The Inefficiency of Random Access Loops in LinkedList (المثال 6: فخ البطء الشديد في التكرار بالفهرس)"
            },
            {
              type: "paragraph",
              text: "Demonstrating why for (int i = 0; i < list.size(); i++) list.get(i) is a notorious O(n^2) anti-pattern."
            },
            {
              type: "code",
              language: "java",
              filename: "LinkedListAntiPatternDemo.java",
              code: `import java.util.LinkedList;

public class LinkedListAntiPatternDemo {
    public static void main(String[] args) {
        LinkedList<Integer> list = new LinkedList<>();
        int count = 20_000;
        for (int i = 0; i < count; i++) list.add(i);

        // Anti-pattern: get(i) traverses nodes from head/tail every single iteration! Total time = O(n^2)
        long startAnti = System.currentTimeMillis();
        long sumAnti = 0;
        for (int i = 0; i < 5_000; i++) { // Only 5,000 to prevent long wait
            sumAnti += list.get(i);
        }
        long timeAnti = System.currentTimeMillis() - startAnti;

        // Correct pattern: Iterator / Enhanced for-each loop keeps current node pointer! Total time = O(n)
        long startCorrect = System.currentTimeMillis();
        long sumCorrect = 0;
        int processed = 0;
        for (int val : list) {
            sumCorrect += val;
            if (++processed == 5_000) break;
        }
        long timeCorrect = System.currentTimeMillis() - startCorrect;

        System.out.println("Anti-pattern get(i) for-loop time: " + timeAnti + " ms (O(n^2))");
        System.out.println("Correct for-each iterator time:    " + timeCorrect + " ms (O(n))");
        System.out.println("Iterator is dramatically faster: " + (timeAnti > timeCorrect));
    }
}`,
              output: `Anti-pattern get(i) for-loop time: 48 ms (O(n^2))
Correct for-each iterator time:    1 ms (O(n))
Iterator is dramatically faster: true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "Calling get(i) inside a loop causes LinkedList to traverse from the head/tail on every single step, turning an O(n) traversal into an O(n^2) bottleneck."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "استدعاء get(i) داخل حلقة تكرارية يعيد مسح العقد من البداية في كل خطوة محولاً العملية لكارثة برمجية O(n^2)؛ ويجب دائماً استخدام Iterator."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Descending Iterator with descendingIterator() (المثال 7: التكرار العكسي باستخدام descendingIterator)"
            },
            {
              type: "paragraph",
              text: "Traversing from tail to head via the Deque interface."
            },
            {
              type: "code",
              language: "java",
              filename: "DescendingIteratorDemo.java",
              code: `import java.util.Iterator;
import java.util.LinkedList;

public class DescendingIteratorDemo {
    public static void main(String[] args) {
        LinkedList<String> breadcrumbs = new LinkedList<>();
        breadcrumbs.add("Home");
        breadcrumbs.add("Category");
        breadcrumbs.add("Electronics");
        breadcrumbs.add("Laptops");

        System.out.println("Standard forward order:  " + breadcrumbs);

        System.out.print("Reverse order traversal: ");
        Iterator<String> revIt = breadcrumbs.descendingIterator();
        while (revIt.hasNext()) {
            System.out.print(revIt.next() + (revIt.hasNext() ? " -> " : "\\n"));
        }
    }
}`,
              output: `Standard forward order:  [Home, Category, Electronics, Laptops]
Reverse order traversal: Laptops -> Electronics -> Category -> Home`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "descendingIterator() traverses from the tail backward using the 'prev' pointers of nodes."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "تتراجع دالة descendingIterator من الذيل إلى الرأس عبر مؤشرات prev العكسية في كل عقدة."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Splitting and Merging via ListIterator (المثال 8: التقسيم والدمج السريع بالعقد)"
            },
            {
              type: "paragraph",
              text: "Inserting items directly at cursor location in O(1) once positioned."
            },
            {
              type: "code",
              language: "java",
              filename: "ListIteratorInsertDemo.java",
              code: `import java.util.LinkedList;
import java.util.List;
import java.util.ListIterator;

public class ListIteratorInsertDemo {
    public static void main(String[] args) {
        List<String> script = new LinkedList<>(List.of("Intro", "Main Scene", "Outro"));

        ListIterator<String> it = script.listIterator();
        while (it.hasNext()) {
            String scene = it.next();
            if (scene.equals("Main Scene")) {
                // In LinkedList, iterator.add() splices pointers in O(1)
                it.add("Action Climax");
            }
        }

        System.out.println("Modified script: " + script);
    }
}`,
              output: `Modified script: [Intro, Main Scene, Action Climax, Outro]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "Once a ListIterator is positioned, adding or removing nodes only rewires adjacent pointers, taking O(1) time without element shifting."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "بمجرد وصول ListIterator للموضع المطلوب، تتم الإضافة أو الحذف بتعديل المؤشرات المجاورة بزمن O(1) دون إزاحة."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Memory Overhead Calculation (ArrayList vs LinkedList) (المثال 9: حساب الفرق الشاسع في استهلاك الذاكرة)"
            },
            {
              type: "paragraph",
              text: "Analyzing the 24-byte per-node overhead of LinkedList on a 64-bit HotSpot JVM."
            },
            {
              type: "code",
              language: "java",
              filename: "MemoryFootprintAnalysisDemo.java",
              code: `public class MemoryFootprintAnalysisDemo {
    public static void main(String[] args) {
        int elementCount = 1_000_000;

        // In 64-bit JVM with Compressed OOPs:
        // ArrayList:
        // - Backing Object[] array header: 16 bytes
        // - 1,000,000 references (4 bytes each): ~4,000,000 bytes (~4 MB)
        long arrayListBytes = 16 + (elementCount * 4L);

        // LinkedList:
        // - 1,000,000 Node objects:
        //   * Node object header: 12 bytes
        //   * 3 references (item, next, prev): 3 * 4 = 12 bytes
        //   * Total per node: 24 bytes
        //   * 1,000,000 * 24 bytes = 24,000,000 bytes (~24 MB)
        long linkedListBytes = elementCount * 24L;

        System.out.println("=== Memory Overhead Analysis for 1,000,000 elements ===");
        System.out.printf("ArrayList memory:  %,d bytes (~%.1f MB)%n", arrayListBytes, arrayListBytes / (1024.0 * 1024.0));
        System.out.printf("LinkedList memory: %,d bytes (~%.1f MB)%n", linkedListBytes, linkedListBytes / (1024.0 * 1024.0));
        System.out.printf("LinkedList consumes %.1fx MORE memory!%n", (double) linkedListBytes / arrayListBytes);
    }
}`,
              output: `=== Memory Overhead Analysis for 1,000,000 elements ===
ArrayList memory:  4,000,016 bytes (~3.8 MB)
LinkedList memory: 24,000,000 bytes (~22.9 MB)
LinkedList consumes 6.0x MORE memory!`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "Because each node in a LinkedList is a separate heap object with header and pointers, it consumes roughly 6 times more memory than an ArrayList."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "تستهلك كل عقدة في LinkedList مساحة إضافية لترويسة الكائن ومؤشرات next و prev بالرام، مما يجعلها تستهلك 6 أضعاف ذاكرة ArrayList."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Building an LRU Cache Node Eviction (المثال 10: بناء خوارزمية التخزين المؤقت LRU عبر LinkedList)"
            },
            {
              type: "paragraph",
              text: "Moving accessed elements to the head and evicting from the tail."
            },
            {
              type: "code",
              language: "java",
              filename: "LruCachePatternDemo.java",
              code: `import java.util.LinkedList;

public class LruCachePatternDemo {
    static class SimpleLRUCache {
        private final int capacity;
        private final LinkedList<String> list = new LinkedList<>();

        public SimpleLRUCache(int capacity) {
            this.capacity = capacity;
        }

        public void access(String key) {
            // If exists, remove it and re-insert at front (Most Recently Used)
            list.remove(key);

            if (list.size() >= capacity) {
                String evicted = list.removeLast(); // Evict Least Recently Used
                System.out.println("Cache full: Evicted LRU item [" + evicted + "]");
            }

            list.addFirst(key); // Put at head
        }

        public void printState() {
            System.out.println("Current Cache (MRU -> LRU): " + list);
        }
    }

    public static void main(String[] args) {
        SimpleLRUCache cache = new SimpleLRUCache(3);

        cache.access("PageA");
        cache.access("PageB");
        cache.access("PageC");
        cache.printState();

        cache.access("PageD"); // Should evict PageA
        cache.printState();

        cache.access("PageB"); // PageB refreshed to head
        cache.printState();
    }
}`,
              output: `Current Cache (MRU -> LRU): [PageC, PageB, PageA]
Cache full: Evicted LRU item [PageA]
Current Cache (MRU -> LRU): [PageD, PageC, PageB]
Current Cache (MRU -> LRU): [PageB, PageD, PageC]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "LinkedList provides the foundational addFirst() and removeLast() primitives needed for building Least Recently Used (LRU) cache schemes."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "توفر LinkedList عمليات addFirst و removeLast المثالية لبناء خوارزميات التخزين المؤقت الأكثر استخداماً مؤخراً (LRU)."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: When to Prefer ArrayDeque Over LinkedList (المثال 11: لماذا يُفضل ArrayDeque على LinkedList كطابور؟)"
            },
            {
              type: "paragraph",
              text: "Modern best practice: ArrayDeque is faster and leaner than LinkedList for almost all Queue/Stack tasks."
            },
            {
              type: "code",
              language: "java",
              filename: "ArrayDequeVsLinkedListDemo.java",
              code: `import java.util.ArrayDeque;
import java.util.Deque;
import java.util.LinkedList;

public class ArrayDequeVsLinkedListDemo {
    public static void main(String[] args) {
        int operations = 100_000;

        // 1. LinkedList as Queue
        Deque<Integer> linkedQueue = new LinkedList<>();
        long startLinked = System.currentTimeMillis();
        for (int i = 0; i < operations; i++) linkedQueue.addLast(i);
        while (!linkedQueue.isEmpty()) linkedQueue.removeFirst();
        long timeLinked = System.currentTimeMillis() - startLinked;

        // 2. ArrayDeque as Queue (circular array, no node allocations)
        Deque<Integer> arrayQueue = new ArrayDeque<>();
        long startArray = System.currentTimeMillis();
        for (int i = 0; i < operations; i++) arrayQueue.addLast(i);
        while (!arrayQueue.isEmpty()) arrayQueue.removeFirst();
        long timeArray = System.currentTimeMillis() - startArray;

        System.out.println("LinkedList Queue time: " + timeLinked + " ms");
        System.out.println("ArrayDeque Queue time: " + timeArray + " ms");
        System.out.println("ArrayDeque is faster:  " + (timeArray < timeLinked));
    }
}`,
              output: `LinkedList Queue time: 14 ms
ArrayDeque Queue time: 5 ms
ArrayDeque is faster:  true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "Official Java documentation recommends ArrayDeque over LinkedList for Queues and Stacks because it avoids node object allocations and enjoys CPU cache locality."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "توصي وثائق جافا الرسمية باستخدام ArrayDeque بدلاً من LinkedList لبناء الطوابير والمكدسات لكونها أسرع وأقل استهلاكاً للذاكرة."
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
                "Mistake 1: Iterating over a LinkedList using for (int i = 0; i < list.size(); i++) { list.get(i); }. This produces catastrophic O(n^2) quadratic performance!",
                "خطأ 1: التكرار على LinkedList بحلقة فهرسية get(i) مما يتسبب في بطء كارثي بتعقيد O(n^2)؛ ويجب دائماً استخدام for-each أو Iterator.",
                "Mistake 2: Choosing LinkedList assuming it is always faster for insertions. For random access or sequential operations, ArrayList is almost always faster due to hardware CPU caching.",
                "خطأ 2: اختيار LinkedList بافتراض أنها أسرع في كل عمليات الإدخال؛ فالواقع أن ArrayList أسرع في أغلب السيناريوهات بسبب ذاكرة الكاش.",
                "Mistake 3: Overlooking the 24-byte per node memory footprint on 64-bit systems, which can trigger frequent Garbage Collection pauses in memory-constrained environments.",
                "خطأ 3: إغفال استهلاك الذاكرة البالغ 24 بايت لكل عقدة مما قد يرهق جامع النفايات ويوقف البرنامج مؤقتاً.",
                "Mistake 4: Using LinkedList when ArrayDeque could achieve the same queue/stack behavior with higher throughput and less memory."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Bidirectional Playlist Navigator (التحدي العملي: مشغل القوائم الموسيقية ثنائي الاتجاه)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Create a class 'PlaylistManager' backed by a LinkedList<String>. Support adding tracks to top/bottom, playing next track (polling head), playing previous track (using a history queue), and shuffling/reversing the playlist. Test in main() and display playback events."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: صمم فئة PlaylistManager تعتمد على LinkedList<String> لإدارة قائمة تشغيل صوتية. تدعم إضافة مقاطع في البداية والنهاية، وتشغيل المقطع التالي وسحبه، والرجوع للمقطع السابق، وعكس القائمة. اختبر الفئة في main واطبع مسار التشغيل."
            },
            {
              type: "code",
              language: "java",
              filename: "PlaylistManagerChallenge.java",
              code: `import java.util.Collections;
import java.util.LinkedList;

public class PlaylistManagerChallenge {
    static class PlaylistManager {
        private final LinkedList<String> queue = new LinkedList<>();
        private final LinkedList<String> history = new LinkedList<>();

        public void addTrackToTop(String track) {
            queue.addFirst(track);
        }

        public void addTrackToBottom(String track) {
            queue.addLast(track);
        }

        public String playNext() {
            if (queue.isEmpty()) return null;
            String current = queue.pollFirst();
            history.push(current); // Push onto history stack
            return current;
        }

        public String playPrevious() {
            if (history.isEmpty()) return null;
            String previous = history.pop();
            queue.addFirst(previous); // Put back to front of playlist
            return previous;
        }

        public void reversePlaylist() {
            Collections.reverse(queue);
        }

        public void printStatus() {
            System.out.println("Current Queue: " + queue);
            System.out.println("History Stack: " + history);
        }
    }

    public static void main(String[] args) {
        PlaylistManager player = new PlaylistManager();

        player.addTrackToBottom("Symphony No. 5");
        player.addTrackToBottom("Moonlight Sonata");
        player.addTrackToTop("Canon in D (Priority)");

        player.printStatus();

        System.out.println("Playing: " + player.playNext());
        System.out.println("Playing: " + player.playNext());

        System.out.println("User hit BACK button! Rewound: " + player.playPrevious());
        player.printStatus();
    }
}`,
              output: `Current Queue: [Canon in D (Priority), Symphony No. 5, Moonlight Sonata]
History Stack: []
Playing: Canon in D (Priority)
Playing: Symphony No. 5
User hit BACK button! Rewound: Symphony No. 5
Current Queue: [Symphony No. 5, Moonlight Sonata]
History Stack: [Canon in D (Priority)]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "LinkedList serves simultaneously as a FIFO queue for upcoming tracks and a LIFO stack (via push/pop) for playback history, demonstrating its versatility."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "تؤدي LinkedList دورين في آن واحد: طابور FIFO للمقاطع القادمة، ومكدس LIFO لتاريخ المقاطع السابقة للتراجع الفوري."
            }
          ],
          quiz: [
          {
                    "id": "q1",
                    "question": "What dual role does java.util.LinkedList fulfill in the Java Collections Framework? (ما هو الدور المزدوج الذي تؤديه فئة LinkedList في إطار مجموعات جافا؟)",
                    "options": [
                              "It implements both List<E> (indexed sequence) and Deque<E> / Queue<E> (double-ended queue).",
                              "It implements both List<E> and Map<K, V>.",
                              "It implements both Set<E> and RandomAccess.",
                              "It is both a database driver and an in-memory cache."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! LinkedList implements both the List interface and the Deque (Double-Ended Queue) interface, allowing it to function as an indexed list, a FIFO queue, or a LIFO stack. (تطبق LinkedList كلاً من واجهتي List و Deque، مما يتيح استخدامها كقائمة تسلسلية أو طابور انتظار FIFO أو مكدس LIFO)."
          },
          {
                    "id": "q2",
                    "question": "What is the internal node structure of java.util.LinkedList? (ما هي البنية الداخلية لعقد فئة LinkedList؟)",
                    "options": [
                              "A singly linked node with only an 'item' and a 'next' pointer.",
                              "A doubly-linked node with three references: 'item' (data), 'next' (successor node), and 'prev' (predecessor node).",
                              "An array of 16 contiguous objects.",
                              "A tree node with left, right, and parent pointers."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! LinkedList is a doubly-linked list. Each internal static class Node<E> contains: E item, Node<E> next, and Node<E> prev. (تعتمد LinkedList على قائمة مترابطة مزدوجة، حيث تحتوي كل عقدة على مرجع للبيانات item ومؤشر للعقدة التالية next ومؤشر للعقدة السابقة prev)."
          },
          {
                    "id": "q3",
                    "question": "What is the time complexity of adding or removing elements at the beginning (head) or end (tail) of a LinkedList? (ما هو التعقيد الزمني لعمليات الإضافة والحذف في بداية أو نهاية LinkedList؟)",
                    "options": [
                              "O(n) for both head and tail",
                              "O(1) constant time, because LinkedList maintains direct 'first' and 'last' reference pointers to the terminal nodes.",
                              "O(log n)",
                              "O(n^2)"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! LinkedList maintains direct references to both the head (first) and tail (last) nodes. Operations like addFirst, addLast, removeFirst, and removeLast execute in O(1) time without traversing the list. (تحتفظ LinkedList بمؤشرين مباشرين لأول وآخر عقدة، لذا تتم الإضافة والحذف عند الأطراف في زمن فوري O(1))."
          },
          {
                    "id": "q4",
                    "question": "How do null-safe Deque methods like poll() and peek() differ from removeFirst() and getFirst() when called on an empty LinkedList? (كيف تختلف الدوال الآمنة poll و peek عن removeFirst و getFirst عند استدعائها على LinkedList فارغة؟)",
                    "options": [
                              "Both pairs throw NoSuchElementException.",
                              "poll() and peek() return null when the list is empty, whereas removeFirst() and getFirst() throw a NoSuchElementException.",
                              "poll() and peek() throw an IndexOutOfBoundsException.",
                              "poll() blocks the thread until an item is added."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Queue/Deque methods are paired: getFirst() and removeFirst() throw NoSuchElementException on an empty list, whereas peek() and poll() return null safely without throwing exceptions. (دوال getFirst و removeFirst تطلق استثناء عند فراغ القائمة، بينما تُرجع peek و poll القيمة null بأمان دون استثناءات)."
          },
          {
                    "id": "q5",
                    "question": "How does LinkedList optimize its get(int index) method to locate an element? (كيف تُحسّن LinkedList من سرعة البحث في دالة get(index)؟)",
                    "options": [
                              "It uses a binary search algorithm.",
                              "It checks if index < (size >> 1); if the index is in the first half, it traverses forward from 'first'; otherwise, it traverses backward from 'last'.",
                              "It caches all indices in an internal hash table.",
                              "It converts the list to an array on every get() call."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! LinkedList checks if the index is closer to the start or end (index < size / 2). If in the first half, it steps forward from head; if in the second half, it steps backward from tail, cutting traversal time by half (still O(n) overall). (تفحص ما إذا كان الفهرس في النصف الأول فتبدأ من الرأس للأمام، أو في النصف الثاني فتبدأ من الذيل للخلف، مما يوفر نصف خطوات البحث)."
          },
          {
                    "id": "q6",
                    "question": "What is the time complexity of the following loop on a LinkedList of size n?\nfor (int i = 0; i < list.size(); i++) {\n    System.out.println(list.get(i));\n}\n(ما هو التعقيد الزمني لحلقة التكرار التالية على LinkedList بحجم n؟)",
                    "options": [
                              "O(n)",
                              "O(n log n)",
                              "O(n^2), because each call to list.get(i) must traverse from the head or tail to index i, resulting in 1 + 2 + ... + n steps.",
                              "O(1)"
                    ],
                    "correctIndex": 2,
                    "explanation": "Correct! This is the notorious 'LinkedList indexing trap'. Because each get(i) takes O(i) traversal time, looping by index executes O(n^2) operations total. You should always use an Iterator or enhanced for-each loop, which is O(n). (هذا هو الفخ الشهير لاستخدام الفهرس مع LinkedList، حيث يستغرق كل get(i) وقتاً خطياً فيكون المجموع الكلي O(n^2)، والحل الصحيح هو استخدام Iterator للوصول في O(n))."
          },
          {
                    "id": "q7",
                    "question": "Which method on LinkedList returns an Iterator that traverses the elements from tail to head in reverse order? (أي دالة في LinkedList تُرجع مكرراً يمر على العناصر بالترتيب العكسي من النهاية إلى البداية؟)",
                    "options": [
                              "list.reverseIterator()",
                              "list.descendingIterator()",
                              "list.backwardIterator()",
                              "list.tailIterator()"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! descendingIterator() (from the Deque interface) returns an Iterator that iterates over the elements in reverse (tail to head) order. (دالة descendingIterator المنبثقة من Deque تتيح التكرار العكسي للعناصر من الذيل للرأس)."
          },
          {
                    "id": "q8",
                    "question": "When using LinkedList as a LIFO Stack, which methods correspond to push, pop, and peek? (عند استخدام LinkedList كمكدس LIFO، ما هي الدوال المقابلة لـ push و pop و peek؟)",
                    "options": [
                              "push() (calls addFirst), pop() (calls removeFirst), and peek() (calls peekFirst)",
                              "push() (calls addLast), pop() (calls removeLast), and peek() (calls get(0))",
                              "enqueue(), dequeue(), front()",
                              "insert(), extract(), top()"
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! In LinkedList's implementation of the Deque stack contract, push(e) calls addFirst(e), pop() calls removeFirst(), and peek() calls peekFirst(), operating strictly at the head in O(1) time. (تطبق LinkedList المكدس عند رأس القائمة عبر addFirst و removeFirst و peekFirst بزمن فوري O(1))."
          },
          {
                    "id": "q9",
                    "question": "Why does LinkedList consume significantly more memory than ArrayList for storing 50,000 objects? (لماذا تستهلك LinkedList ذاكرة أكبر بكثير من ArrayList لتخزين 50,000 كائن؟)",
                    "options": [
                              "LinkedList stores duplicate copies of each element on disk.",
                              "Every single element in LinkedList requires a separate Node object allocation containing an object header (12-16 bytes) and two references ('next' and 'prev', 8-16 bytes), adding ~24-32 bytes of heap overhead per element.",
                              "LinkedList compresses elements using 64-bit encryption.",
                              "LinkedList allocates 1MB buffers for each node."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! An ArrayList stores references contiguously in an Object[] array (4 or 8 bytes per reference). LinkedList allocates an independent Node object on the heap for every element, introducing 24 to 32 bytes of pointer and header overhead per element. (تنشئ LinkedList كائناً مستقلاً Node لكل عنصر يحتوي على ترويسة ومؤشرين مما يضيف 24-32 بايت لكل عنصر، بينما تحتفظ ArrayList بالمراجع في مصفوفة متجاورة)."
          },
          {
                    "id": "q10",
                    "question": "Why does modern Java guidance almost always recommend ArrayDeque over LinkedList when implementing a FIFO Queue or LIFO Stack? (لماذا توصي إرشادات جافا الحديثة باستخدام ArrayDeque بدلاً من LinkedList لبناء الطوابير والمكادس؟)",
                    "options": [
                              "LinkedList is deprecated in Java 21.",
                              "ArrayDeque is backed by a circular array, providing far superior CPU cache locality and zero per-element Node object allocation overhead, outperforming LinkedList in nearly all benchmarks.",
                              "ArrayDeque is synchronized by default.",
                              "ArrayDeque can store primitive int types directly without boxing."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! As stated in the official Java documentation, ArrayDeque is almost always faster than LinkedList. Because ArrayDeque uses a circular array, it avoids allocating Node objects and benefits from CPU memory cache locality. (تعتمد ArrayDeque على مصفوفة دائرية ولا تنشئ كائنات عقد في الذاكرة، كما تستفيد من كاش المعالج مما يجعلها أسرع بكثير من LinkedList)."
          },
          {
                    "id": "q11",
                    "question": "What is the output of the following code?\nLinkedList<String> list = new LinkedList<>();\nlist.add(\"B\");\nlist.addFirst(\"A\");\nlist.addLast(\"C\");\nlist.removeFirst();\nSystem.out.println(list);\n(ما الذي يطبعه الكود التالي؟)",
                    "options": [
                              "[A, B, C]",
                              "[B, C]",
                              "[A, B]",
                              "[C]"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Initially, list has [\"B\"]. addFirst(\"A\") makes it [\"A\", \"B\"]. addLast(\"C\") makes it [\"A\", \"B\", \"C\"]. removeFirst() removes \"A\", leaving [\"B\", \"C\"]. (إضافة A في البداية و C في النهاية ينتج [A, B, C]، ثم حذف العنصر الأول A يترك [B, C])."
          },
          {
                    "id": "q12",
                    "question": "What is a practical use case where LinkedList excels over ArrayList? (ما هي الحالة العملية التي تتفوق فيها LinkedList على ArrayList؟)",
                    "options": [
                              "Binary searching through 1,000,000 sorted records.",
                              "Implementing an LRU (Least Recently Used) cache where active nodes must be spliced and moved from the middle of the list to the head in O(1) time once a node reference is held.",
                              "Random access by integer index.",
                              "High-performance numerical matrix multiplication."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! When you already hold a direct reference to a Node, unlinking it and relinking it at the head of a doubly linked list is an O(1) pointer-rewiring operation with no shifting, which is the cornerstone of LRU caches. (في خوارزميات التخزين المؤقت LRU، فك ارتباط العقدة ونقلها للرأس يتم في O(1) دون إزاحة أي عناصر أخرى)."
          },
          {
                    "id": "q13",
                    "question": "What is the result of invoking list.offer(\"X\") on a LinkedList? (ما نتيجة استدعاء list.offer(\"X\") على LinkedList؟)",
                    "options": [
                              "It inserts \"X\" at the head of the list.",
                              "It appends \"X\" to the tail of the list (equivalent to addLast(\"X\")) and returns true.",
                              "It checks if \"X\" is already offered and throws an exception if duplicate.",
                              "It discards \"X\" if the list has more than 10 elements."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! In the Queue interface contract, offer(e) inserts the specified element at the tail of the queue. For LinkedList, offer(e) delegates to add(e) / addLast(e) and returns true. (في عقد واجهة الطابور، تقوم offer بإضافة العنصر في نهاية القائمة addLast وتُرجع true)."
          },
          {
                    "id": "q14",
                    "question": "Does LinkedList allow null elements to be stored? (هل تسمح LinkedList بتخزين عناصر ذات قيمة null؟)",
                    "options": [
                              "No, it throws a NullPointerException immediately on add(null).",
                              "Yes, LinkedList permits null elements, and multiple null values can be stored.",
                              "Only one null is allowed at index 0.",
                              "null is only allowed if wrapped in Optional."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Like ArrayList, LinkedList permits all elements, including null. Multiple nulls can be added, and node.item can hold null. (تسمح LinkedList بتخزين عناصر null وتكرارها دون أي قيود)."
          },
          {
                    "id": "q15",
                    "question": "Consider this code:\nLinkedList<Integer> list = new LinkedList<>(Arrays.asList(10, 20, 30));\nListIterator<Integer> it = list.listIterator();\nit.next(); // visits 10\nit.add(15);\nSystem.out.println(list);\nWhat is printed? (ما الذي يطبعه هذا الكود؟)",
                    "options": [
                              "[10, 15, 20, 30]",
                              "[15, 10, 20, 30]",
                              "[10, 20, 30, 15]",
                              "Throws a ConcurrentModificationException"
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! it.next() advances past 10. it.add(15) inserts 15 immediately before the element that would be returned by next() (which is 20). The resulting list is [10, 15, 20, 30]. (تجاوز 10 ثم استدعاء add(15) يُدرج 15 بين 10 و 20 فتكون النتيجة [10, 15, 20, 30])."
          }
]
        }
      ]
    }
  ];
})();
