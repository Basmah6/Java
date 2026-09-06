/**
 * Java Curriculum Module - Part 32
 * Topics:
 * 63. Java LinkedHashSet
 * 64. Java TreeSet
 * 
 * 100% Offline, Pure JavaScript. Complete educational content with full bilingual (English & Arabic) explanations.
 */

(function () {
  'use strict';

  window.JAVA_TOPICS_PART32 = [
    /* ==========================================================================
       TOPIC 63: Java LinkedHashSet
       ========================================================================== */
    {
      id: "java-linkedhashset",
      title: "63. Java LinkedHashSet",
      description: "Mastering Java LinkedHashSet: combining hash table speed with doubly-linked list insertion ordering, predictable iteration, O(1) performance, memory trade-offs, deduplication with order preservation, and access-order LRU cache architectures.",
      lessons: [
        {
          id: "java-linkedhashset-mastery",
          title: "Complete Guide to Java LinkedHashSet",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "Predictable Order & The Doubly-Linked Hash Architecture (الترتيب الثابت وهندسة التجزئة المترابطة مزدوجاً)"
            },
            {
              type: "paragraph",
              text: "Java's 'LinkedHashSet' extends 'HashSet' and implements 'Set'. While a standard HashSet stores elements in hash buckets with no guarantee of iteration order, LinkedHashSet maintains a doubly-linked list running through all of its entries. This linked list defines the iteration ordering, which by default is the order in which elements were inserted into the set (insertion-order). If an element is re-inserted (e.g. attempting to add an already present item), the insertion order is NOT affected. LinkedHashSet gives you the best of both worlds: O(1) constant-time performance for add, contains, and remove, paired with predictable, deterministic iteration."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "ترث فئة 'LinkedHashSet' من 'HashSet' وتطبق واجهة 'Set'. وبينما توزع HashSet العادية عناصرها في خلايا التجزئة دون أي ضمان لترتيب القراءة، تحتفظ LinkedHashSet بقائمة مترابطة مزدوجة (Doubly-Linked List) تمر عبر جميع عناصرها. تحدد هذه القائمة ترتيب التكرار والمرور، وهو افتراضياً ترتيب إدخال العناصر (Insertion-Order). وإذا حاول البرنامج إعادة إدخال عنصر موجود مسبقاً، فإن ترتيبه الأصلي يظل ثابتاً دون تغيير. توفر LinkedHashSet المزيج المثالي: سرعة خيالية بزمن O(1) لعمليات الإضافة والحذف والبحث، مع ترتيب مرور متوقع وثابت 100%."
            },
            {
              type: "paragraph",
              text: "Architectural Comparison: 1) Performance: add/remove/contains operate in O(1) time like HashSet, with negligible overhead for maintaining node pointers; 2) Iteration Speed: Iteration over a LinkedHashSet takes time proportional to the number of elements (size), unlike HashSet which requires time proportional to the capacity (buckets); 3) Memory: Slightly higher memory usage than HashSet due to the additional 'before' and 'after' pointers on each entry."
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
              text: "Example 1: Guaranteed Insertion Order vs HashSet (المثال 1: ضمان ترتيب الإدخال مقارنة بـ HashSet)"
            },
            {
              type: "paragraph",
              text: "Demonstrating how LinkedHashSet preserves insertion order while HashSet scrambles it."
            },
            {
              type: "code",
              language: "java",
              filename: "InsertionOrderComparisonDemo.java",
              code: `import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;

public class InsertionOrderComparisonDemo {
    public static void main(String[] args) {
        List<String> input = List.of("Zebra", "Apple", "Mango", "Banana", "Carrot");

        HashSet<String> hashSet = new HashSet<>(input);
        LinkedHashSet<String> linkedHashSet = new LinkedHashSet<>(input);

        System.out.println("Input Order:         " + input);
        System.out.println("HashSet Order:       " + hashSet + " (arbitrary hash order)");
        System.out.println("LinkedHashSet Order: " + linkedHashSet + " (EXACT insertion order preserved)");
    }
}`,
              output: `Input Order:         [Zebra, Apple, Mango, Banana, Carrot]
HashSet Order:       [Apple, Zebra, Carrot, Mango, Banana] (arbitrary hash order)
LinkedHashSet Order: [Zebra, Apple, Mango, Banana, Carrot] (EXACT insertion order preserved)`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "LinkedHashSet tracks each inserted element with internal before/after pointers, iterating in the exact sequence they were introduced."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "تتتبع LinkedHashSet كل عنصر مضاف عبر مؤشرات داخلية، مما يجعل ترتيب القراءة مطابقاً تماماً لتسلسل الإدخال الأصلي."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Re-insertion Does NOT Alter Original Position (المثال 2: محاولة إعادة الإدخال لا تغير الموضع الأصلي)"
            },
            {
              type: "paragraph",
              text: "Verifying that attempting to add an existing element preserves its original slot in the sequence."
            },
            {
              type: "code",
              language: "java",
              filename: "ReinsertionOrderDemo.java",
              code: `import java.util.LinkedHashSet;

public class ReinsertionOrderDemo {
    public static void main(String[] args) {
        LinkedHashSet<String> pipeline = new LinkedHashSet<>();

        pipeline.add("Phase 1: Fetch");
        pipeline.add("Phase 2: Parse");
        pipeline.add("Phase 3: Validate");

        System.out.println("Initial pipeline: " + pipeline);

        // Re-adding existing item returns false and does NOT move it to the end
        boolean added = pipeline.add("Phase 2: Parse");

        System.out.println("Added 'Phase 2' duplicate? " + added);
        System.out.println("Pipeline after duplicate attempt: " + pipeline);
    }
}`,
              output: `Initial pipeline: [Phase 1: Fetch, Phase 2: Parse, Phase 3: Validate]
Added 'Phase 2' duplicate? false
Pipeline after duplicate attempt: [Phase 1: Fetch, Phase 2: Parse, Phase 3: Validate]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "Under the Set contract, duplicate additions are ignored; LinkedHashSet does not bump an existing item to the end of the chain."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "وفقاً لعقد Set، يتم تجاهل العناصر المكررة، ولا تقوم LinkedHashSet بنقل العنصر القديم لنهاية القائمة إطلاقاً."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Order-Preserving List Deduplication (المثال 3: تصفية القوائم من التكرارات مع الحفاظ على الترتيب)"
            },
            {
              type: "paragraph",
              text: "The definitive Java pattern for stripping duplicates while preserving original list sequence."
            },
            {
              type: "code",
              language: "java",
              filename: "OrderPreservingDeduplicationDemo.java",
              code: `import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;

public class OrderPreservingDeduplicationDemo {
    public static <T> List<T> deduplicatePreservingOrder(List<T> list) {
        // LinkedHashSet removes duplicates while keeping original encounter order
        return new ArrayList<>(new LinkedHashSet<>(list));
    }

    public static void main(String[] args) {
        List<String> userClicks = List.of(
            "Home", "Products", "Home", "Cart", "Products", "Checkout"
        );

        List<String> cleanSequence = deduplicatePreservingOrder(userClicks);

        System.out.println("Raw Clicks:       " + userClicks);
        System.out.println("Deduplicated:     " + cleanSequence);
    }
}`,
              output: `Raw Clicks:       [Home, Products, Home, Cart, Products, Checkout]
Deduplicated:     [Home, Products, Cart, Checkout]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "new ArrayList<>(new LinkedHashSet<>(list)) removes duplicates in O(n) time while guaranteeing that the first encounter order is strictly maintained."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "النمط new ArrayList<>(new LinkedHashSet<>(list)) يزيل التكرارات بزمن خطي O(n) مع المحافظة على ترتيب الظهور الأول لكل عنصر."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Null Handling in LinkedHashSet (المثال 4: التعامل مع قيمة null في LinkedHashSet)"
            },
            {
              type: "paragraph",
              text: "Verifying null support and its place in insertion order."
            },
            {
              type: "code",
              language: "java",
              filename: "LinkedHashSetNullDemo.java",
              code: `import java.util.LinkedHashSet;

public class LinkedHashSetNullDemo {
    public static void main(String[] args) {
        LinkedHashSet<String> values = new LinkedHashSet<>();

        values.add("Alpha");
        values.add(null);
        values.add("Beta");
        values.add(null); // Duplicate null rejected

        System.out.println("LinkedHashSet with null: " + values);
        System.out.println("Size: " + values.size());
    }
}`,
              output: `LinkedHashSet with null: [Alpha, null, Beta]
Size: 3`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "LinkedHashSet permits one null element and maintains its exact relative position within the insertion sequence."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "تقبل LinkedHashSet قيمة null واحدة فقط وتحافظ على موقع إدخالها النسبي بين بقية العناصر."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Tuning Capacity and Load Factor (المثال 5: ضبط السعة الابتدائية ومعامل الحمل)"
            },
            {
              type: "paragraph",
              text: "Initializing LinkedHashSet with optimal capacity."
            },
            {
              type: "code",
              language: "java",
              filename: "LinkedHashSetTuningDemo.java",
              code: `import java.util.LinkedHashSet;

public class LinkedHashSetTuningDemo {
    public static void main(String[] args) {
        // Pre-allocate for 500 elements with standard 0.75 load factor
        int capacity = (int) (500 / 0.75f) + 1;
        LinkedHashSet<Integer> buffer = new LinkedHashSet<>(capacity, 0.75f);

        for (int i = 1; i <= 500; i++) {
            buffer.add(i);
        }

        System.out.println("Buffer size: " + buffer.size());
        System.out.println("First element in order: " + buffer.iterator().next());
    }
}`,
              output: `Buffer size: 500
First element in order: 1`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "Like HashSet, setting initial capacity avoids rehashing, while preserving the internal doubly-linked list structure."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "كما في HashSet، تحديد السعة الابتدائية يمنع إعادة بناء الجدول مع المحافظة على ترابط القائمة الداخلية."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Iteration Performance (LinkedHashSet vs HashSet) (المثال 6: سرعة التكرار عند كبر سعة الجدول)"
            },
            {
              type: "paragraph",
              text: "Why iterating a sparse LinkedHashSet is faster than iterating a sparse HashSet."
            },
            {
              type: "code",
              language: "java",
              filename: "IterationPerformanceDemo.java",
              code: `import java.util.HashSet;
import java.util.LinkedHashSet;

public class IterationPerformanceDemo {
    public static void main(String[] args) {
        int hugeCapacity = 1_000_000;
        int fewElements = 100;

        // Allocate huge bucket table, but store few items
        HashSet<Integer> sparseHashSet = new HashSet<>(hugeCapacity);
        LinkedHashSet<Integer> sparseLinkedSet = new LinkedHashSet<>(hugeCapacity);

        for (int i = 0; i < fewElements; i++) {
            sparseHashSet.add(i);
            sparseLinkedSet.add(i);
        }

        // 1. HashSet must inspect all 1,000,000 empty buckets! (Time proportional to capacity)
        long startHash = System.nanoTime();
        int sumHash = 0;
        for (int v : sparseHashSet) sumHash += v;
        long timeHash = System.nanoTime() - startHash;

        // 2. LinkedHashSet hops only the 100 linked nodes! (Time proportional to size)
        long startLinked = System.nanoTime();
        int sumLinked = 0;
        for (int v : sparseLinkedSet) sumLinked += v;
        long timeLinked = System.nanoTime() - startLinked;

        System.out.println("HashSet iteration time (scans capacity):  " + timeHash + " ns");
        System.out.println("LinkedHashSet iteration (scans elements): " + timeLinked + " ns");
        System.out.println("LinkedHashSet iteration is faster: " + (timeHash > timeLinked));
    }
}`,
              output: `HashSet iteration time (scans capacity):  4820100 ns
LinkedHashSet iteration (scans elements): 42100 ns
LinkedHashSet iteration is faster: true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "HashSet iteration must scan every bucket in the table (O(capacity)). LinkedHashSet iteration follows the linked list directly (O(size)), making it much faster in sparse collections."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "يجب على HashSet مسح كافة الخلايا الفارغة بالجدول بزمن O(capacity)؛ بينما تمر LinkedHashSet على العقد الفعلية فقط بزمن O(size) مما يجعلها أسرع بكثير."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: First and Last Element Access in Java 21+ (المثال 7: الوصول لأول وآخر عنصر في جافا 21 عبر SequencedSet)"
            },
            {
              type: "paragraph",
              text: "Using Java 21's SequencedSet interface methods: getFirst(), getLast(), reversed()."
            },
            {
              type: "code",
              language: "java",
              filename: "SequencedSetDemo.java",
              code: `import java.util.LinkedHashSet;

public class SequencedSetDemo {
    public static void main(String[] args) {
        LinkedHashSet<String> stages = new LinkedHashSet<>();
        stages.add("Stage 1: Design");
        stages.add("Stage 2: Develop");
        stages.add("Stage 3: Deploy");

        // In Java 21+, LinkedHashSet implements SequencedSet!
        // Direct first and last access:
        String first = stages.iterator().next();
        String last = null;
        for (String s : stages) last = s;

        System.out.println("First inserted stage: " + first);
        System.out.println("Last inserted stage:  " + last);
        System.out.println("Total stages:         " + stages.size());
    }
}`,
              output: `First inserted stage: Stage 1: Design
Last inserted stage:  Stage 3: Deploy
Total stages:         3`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "Because elements form a linked sequence, finding the first and last elements is straightforward and deterministic."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "نظراً لترابط العناصر في تسلسل خطي، فإن تحديد أول عنصر وآخر عنصر يتم بشكل مباشر ومضمون."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Building a Recent Search History Tracker (المثال 8: بناء سجل عمليات البحث الأخيرة)"
            },
            {
              type: "paragraph",
              text: "Refreshing item position on re-query by explicit remove + add."
            },
            {
              type: "code",
              language: "java",
              filename: "RecentSearchHistoryDemo.java",
              code: `import java.util.LinkedHashSet;

public class RecentSearchHistoryDemo {
    static class SearchHistory {
        private final int maxItems;
        private final LinkedHashSet<String> searches = new LinkedHashSet<>();

        public SearchHistory(int maxItems) {
            this.maxItems = maxItems;
        }

        public void recordSearch(String query) {
            // If already present, remove it so add() places it at the tail (Most Recent)
            searches.remove(query);

            // If capacity reached, remove the head (Oldest item)
            if (searches.size() >= maxItems) {
                String oldest = searches.iterator().next();
                searches.remove(oldest);
            }

            searches.add(query);
        }

        public void printHistory() {
            System.out.println("Recent Searches (Oldest -> Newest): " + searches);
        }
    }

    public static void main(String[] args) {
        SearchHistory history = new SearchHistory(3);

        history.recordSearch("Java ArrayList");
        history.recordSearch("Spring Boot");
        history.recordSearch("Docker Tutorial");
        history.printHistory();

        // Re-searching "Spring Boot" moves it to the newest slot!
        history.recordSearch("Spring Boot");
        history.printHistory();

        // Adding a 4th query evicts the oldest ("Java ArrayList")
        history.recordSearch("Kubernetes Pods");
        history.printHistory();
    }
}`,
              output: `Recent Searches (Oldest -> Newest): [Java ArrayList, Spring Boot, Docker Tutorial]
Recent Searches (Oldest -> Newest): [Java ArrayList, Docker Tutorial, Spring Boot]
Recent Searches (Oldest -> Newest): [Docker Tutorial, Spring Boot, Kubernetes Pods]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "By removing an element before re-adding it, LinkedHashSet places the re-queried item at the tail, implementing a clean recency queue."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "بحذف العنصر قبل إعادة إضافته، تضعه LinkedHashSet في ذيل القائمة كأحدث عنصر، مما يحقق سجل بحث حديث وفعال."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Safe Removal during Iteration (المثال 9: الحذف الآمن أثناء التكرار عبر Iterator)"
            },
            {
              type: "paragraph",
              text: "Using Iterator.remove() to safely unlink elements without ConcurrentModificationException."
            },
            {
              type: "code",
              language: "java",
              filename: "LinkedHashSetIteratorRemovalDemo.java",
              code: `import java.util.Iterator;
import java.util.LinkedHashSet;
import java.util.List;

public class LinkedHashSetIteratorRemovalDemo {
    public static void main(String[] args) {
        LinkedHashSet<Integer> scores = new LinkedHashSet<>(List.of(85, 42, 90, 33, 78, 55));

        System.out.println("Original scores: " + scores);

        // Remove scores below 60 safely using Iterator
        Iterator<Integer> it = scores.iterator();
        while (it.hasNext()) {
            int score = it.next();
            if (score < 60) {
                it.remove(); // Safely unlinks pointers and updates modCount
            }
        }

        System.out.println("Passing scores (Order strictly preserved): " + scores);
    }
}`,
              output: `Original scores: [85, 42, 90, 33, 78, 55]
Passing scores (Order strictly preserved): [85, 90, 78]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "it.remove() rewires the doubly-linked list pointers seamlessly, preserving the sequence of remaining elements."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "تعدل it.remove مؤشرات القائمة المزدوجة بسلاسة وتحافظ على تسلسل ترتيب العناصر المتبقية دون أخطاء."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Memory Overhead vs HashSet (المثال 10: حساب فارق استهلاك الذاكرة)"
            },
            {
              type: "paragraph",
              text: "Understanding the cost of the 'before' and 'after' pointers per entry."
            },
            {
              type: "code",
              language: "java",
              filename: "LinkedHashSetMemoryDemo.java",
              code: `public class LinkedHashSetMemoryDemo {
    public static void main(String[] args) {
        int count = 100_000;

        // In 64-bit JVM with Compressed OOPs:
        // HashSet Node:
        //   - Header (12 bytes) + hash (4 bytes) + key ref (4 bytes) + val ref (4 bytes) + next ref (4 bytes) = ~32 bytes
        // LinkedHashSet Entry extends HashMap.Node:
        //   - Adds 'before' (4 bytes) and 'after' (4 bytes) pointers = ~40 bytes (+8 bytes per entry)

        long hashSetNodeBytes = 32L * count;
        long linkedSetNodeBytes = 40L * count;

        System.out.println("Memory for " + count + " entries:");
        System.out.printf("HashSet node footprint:       %,d bytes (approx %.2f MB)%n",
                hashSetNodeBytes, hashSetNodeBytes / (1024.0 * 1024.0));
        System.out.printf("LinkedHashSet node footprint: %,d bytes (approx %.2f MB)%n",
                linkedSetNodeBytes, linkedSetNodeBytes / (1024.0 * 1024.0));
        System.out.println("Overhead for order preservation: ~25% additional pointer memory.");
    }
}`,
              output: `Memory for 100000 entries:
HashSet node footprint:       3,200,000 bytes (approx 3.05 MB)
LinkedHashSet node footprint: 4,000,000 bytes (approx 3.81 MB)
Overhead for order preservation: ~25% additional pointer memory.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "LinkedHashSet requires two extra references (before, after) per entry, consuming about 25% more memory than HashSet to maintain insertion order."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "تتطلب كل عقدة في LinkedHashSet مؤشرين إضافيين (before و after) مما يزيد استهلاك الذاكرة بنحو 25% مقارنة بـ HashSet."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Converting LinkedHashSet to Stream & JSON-Ready Array (المثال 11: تحويل المجموعة لمصفوفة مرتبة للواجهات)"
            },
            {
              type: "paragraph",
              text: "Streaming elements into an array while preserving original user sequence."
            },
            {
              type: "code",
              language: "java",
              filename: "LinkedHashSetToStreamDemo.java",
              code: `import java.util.Arrays;
import java.util.LinkedHashSet;
import java.util.List;

public class LinkedHashSetToStreamDemo {
    public static void main(String[] args) {
        LinkedHashSet<String> tags = new LinkedHashSet<>(List.of(
            "java", "backend", "performance", "collections"
        ));

        // Stream maintains order guaranteed by LinkedHashSet iterator
        String[] formattedTags = tags.stream()
                .map(t -> "#" + t)
                .toArray(String[]::new);

        System.out.println("Formatted Tags (Preserved sequence): " + Arrays.toString(formattedTags));
    }
}`,
              output: `Formatted Tags (Preserved sequence): [#java, #backend, #performance, #collections]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "Streams created from a LinkedHashSet preserve encounter order, making it ideal for generating JSON arrays or ordered UI lists."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "تحافظ التدفقات (Streams) المشتقة من LinkedHashSet على تسلسل الإدخال الأصلي مما يجعلها مثالية لتوليد بيانات JSON وقوائم الواجهات."
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
                "Mistake 1: Assuming LinkedHashSet sorts elements alphabetically or numerically. It does NOT sort; it preserves insertion order. Use TreeSet for sorting.",
                "خطأ 1: الاعتقاد بأن LinkedHashSet ترتب العناصر تصاعدياً أو أبجدياً؛ هي لا ترتب إطلاقاً بل تحافظ على ترتيب الإدخال فقط. للترتيب استخدم TreeSet.",
                "Mistake 2: Expecting add() on an existing item to move it to the end of the set. Re-inserting an existing element is a no-op.",
                "خطأ 2: توقع أن إعادة إضافة عنصر موجود سينقله لآخر القائمة؛ إعادة الإدخال لا تحدث أي تغيير في الترتيب إطلاقاً.",
                "Mistake 3: Forgetting that LinkedHashSet consumes extra heap memory for linked pointers. In memory-critical scenarios with millions of items where order is irrelevant, prefer HashSet.",
                "خطأ 3: نسيان أن LinkedHashSet تستهلك ذاكرة أكبر؛ فإذا كان الترتيب غير مهم ولديك ملايين العناصر فالأفضل استخدام HashSet لتوفير الرام."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Order-Preserving Breadcrumb Trail Builder (التحدي العملي: مسار التنقل التفاعلي Breadcrumbs)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Create a class 'BreadcrumbTrail' that models web page navigation. Support: 1) 'visit(String page)' which adds the page, or if already visited, rewinds the trail back to that page by truncating all subsequent visits; 2) 'renderTrail()' returning 'Home > Category > Product'. Test in main() and print trail mutations."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: صمم فئة BreadcrumbTrail لإدارة مسار التنقل بالصفحات. نفّذ: 1) visit لإضافة صفحة، وإن كانت مزارة سابقاً يُعاد المسار إليها بحذف كافة الصفحات اللاحقة لها؛ 2) renderTrail لطباعة المسار بالصيغة 'Home > Category > Product'. اختبرها في main واطبع تطور المسار."
            },
            {
              type: "code",
              language: "java",
              filename: "BreadcrumbChallenge.java",
              code: `import java.util.Iterator;
import java.util.LinkedHashSet;

public class BreadcrumbChallenge {
    static class BreadcrumbTrail {
        private final LinkedHashSet<String> trail = new LinkedHashSet<>();

        public void visit(String page) {
            if (trail.contains(page)) {
                // Rewind: remove everything after this page
                boolean found = false;
                Iterator<String> it = trail.iterator();
                while (it.hasNext()) {
                    String current = it.next();
                    if (found) {
                        it.remove(); // Remove subsequent pages
                    } else if (current.equals(page)) {
                        found = true; // Keep current, start removing from next
                    }
                }
            } else {
                trail.add(page);
            }
        }

        public String renderTrail() {
            return String.join(" > ", trail);
        }
    }

    public static void main(String[] args) {
        BreadcrumbTrail nav = new BreadcrumbTrail();

        nav.visit("Home");
        nav.visit("Electronics");
        nav.visit("Laptops");
        nav.visit("Gaming Laptops");
        System.out.println("Initial Trail:   " + nav.renderTrail());

        // User clicks back on "Electronics"
        nav.visit("Electronics");
        System.out.println("Rewound to Elecs: " + nav.renderTrail());

        // User navigates to new subcategory
        nav.visit("Smartphones");
        System.out.println("New Subcategory: " + nav.renderTrail());
    }
}`,
              output: `Initial Trail:   Home > Electronics > Laptops > Gaming Laptops
Rewound to Elecs: Home > Electronics
New Subcategory: Home > Electronics > Smartphones`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "LinkedHashSet preserves the deterministic hierarchy of pages. When a user clicks an earlier step, iterating with Iterator.remove() cleanly trims trailing pages."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "تحافظ LinkedHashSet على تسلسل الصفحات؛ وعند النقر على صفحة سابقة، تحذف Iterator.remove() الصفحات اللاحقة بدقة لتقليص المسار."
            }
          ],
          quiz: [
          {
                    "id": "q1",
                    "question": "What makes java.util.LinkedHashSet structurally different from standard HashSet? (ما الذي يجعل LinkedHashSet مختلفة هيكلياً عن HashSet العادية؟)",
                    "options": [
                              "It stores elements in a binary tree instead of a hash table.",
                              "It extends HashSet and maintains a doubly-linked list running through all of its entries, which guarantees iteration order matches insertion order.",
                              "It does not use hash codes at all.",
                              "It allows elements to be accessed by integer index."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! LinkedHashSet extends HashSet and is backed by an internal LinkedHashMap. In addition to hash buckets, every entry has 'before' and 'after' pointers forming a doubly-linked list that preserves the exact order elements were inserted. (ترث LinkedHashSet فئة HashSet وتعتمد على LinkedHashMap، حيث تضيف مؤشرات قبل وبعد لكل عنصر لربطها في قائمة مزدوجة تضمن استرجاع العناصر بنفس ترتيب إدخالها)."
          },
          {
                    "id": "q2",
                    "question": "What happens if you insert an element that is ALREADY present in a LinkedHashSet? (ماذا يحدث إذا أعدت إدخال عنصر موجود بالفعل في LinkedHashSet؟)",
                    "options": [
                              "The element is moved to the end of the iteration sequence.",
                              "The element's position in the iteration order is NOT affected: add() returns false, and its original insertion position is preserved.",
                              "An exception is thrown.",
                              "The element is moved to the front of the set."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! By specification, insertion order is not affected if an element is re-inserted into the set. The call returns false and the element retains its original position in the linked list. (إعادة إدخال عنصر موجود لا تغير موضعه في ترتيب الإدخال؛ تُرجع الدالة false ويحتفظ العنصر بمكانه الأصلي تماماً)."
          },
          {
                    "id": "q3",
                    "question": "Consider this code:\nList<String> list = Arrays.asList(\"C\", \"A\", \"B\", \"A\", \"C\");\nSet<String> set = new LinkedHashSet<>(list);\nSystem.out.println(set);\nWhat is printed? (ما الذي يطبعه هذا الكود؟)",
                    "options": [
                              "[A, B, C]",
                              "[C, A, B]",
                              "[C, B, A]",
                              "[A, C, B]"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! LinkedHashSet preserves insertion order while filtering out duplicates. The first occurrences are \"C\", then \"A\", then \"B\". Subsequent duplicates of \"A\" and \"C\" are rejected, leaving [C, A, B]. (تحفظ LinkedHashSet ترتيب أول ظهور لكل عنصر وتستبعد التكرارات اللاحقة، فيكون الناتج [C, A, B])."
          },
          {
                    "id": "q4",
                    "question": "Does LinkedHashSet permit null elements, and if so, how are they ordered? (هل تسمح LinkedHashSet بقيم null، وكيف يتم ترتيبها؟)",
                    "options": [
                              "No, null throws a NullPointerException.",
                              "Yes, it permits at most one null element, and it is positioned in the iteration order according to when it was inserted like any other element.",
                              "Yes, but null is always moved to the very front of the iteration order.",
                              "Yes, but null is always moved to the end."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Like HashSet, LinkedHashSet permits one null element. Because it maintains an insertion-ordered linked list, the null element appears in the iteration sequence exactly at the position where it was added. (تسمح LinkedHashSet بعنصر null واحد فقط، ويظهر في ترتيب التكرار في نفس موضع إدخاله تماماً كبقية العناصر)."
          },
          {
                    "id": "q5",
                    "question": "How does iteration performance over a LinkedHashSet compare to a standard HashSet when the initial capacity is very large but the number of elements is small? (كيف تقارن سرعة التكرار في LinkedHashSet مقابل HashSet عندما تكون سعة الجدول كبيرة وعدد العناصر قليلاً؟)",
                    "options": [
                              "HashSet is faster because it uses less memory.",
                              "LinkedHashSet is significantly faster to iterate over, because iteration time is proportional strictly to the number of elements (O(size)), whereas iterating a HashSet is proportional to the total bucket capacity (O(capacity + size)).",
                              "They take the exact same time.",
                              "LinkedHashSet throws an exception if capacity is too large."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! A standard HashSet must scan every single empty bucket in the hash table during iteration (O(capacity + size)). LinkedHashSet simply walks the doubly-linked list connecting only the existing entries (O(size)), making it much faster to iterate through sparsely-populated tables. (التكرار في HashSet يتطلب المرور على كافة الحاويات الفارغة O(capacity + size)، بينما في LinkedHashSet يمر المكرر على العقد الموجودة فقط عبر القائمة المترابطة O(size) مما يجعله أسرع بكثير عند كبر السعة)."
          },
          {
                    "id": "q6",
                    "question": "What is the memory footprint tradeoff of LinkedHashSet compared to standard HashSet? (ما هي ضريبة استهلاك الذاكرة في LinkedHashSet مقارنة بـ HashSet؟)",
                    "options": [
                              "LinkedHashSet uses 50% less memory.",
                              "LinkedHashSet consumes more heap memory because each entry requires two additional pointer references ('before' and 'after') to maintain the doubly-linked list.",
                              "They use the exact same memory.",
                              "LinkedHashSet stores elements on disk."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! LinkedHashSet incurs a modest memory overhead because its internal Entry objects extend HashMap.Node and add two additional object reference fields (before and after) to maintain the doubly-linked list sequence. (تستهلك LinkedHashSet ذاكرة إضافية لأن كل عقدة تحتوي على مرجعين إضافيين قبل وبعد لربط القائمة المزدوجة)."
          },
          {
                    "id": "q7",
                    "question": "Starting in Java 21, LinkedHashSet implements the SequencedSet interface. Which methods are now natively available on it? (بدءاً من جافا 21 تطبق LinkedHashSet واجهة SequencedSet، فما الدوال التي أصبحت متاحة؟)",
                    "options": [
                              "get(int index) and set(int index, E item)",
                              "getFirst(), getLast(), addFirst(E), addLast(E), and reversed()",
                              "pollFirst() and pollLast()",
                              "slice() and window()"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Java 21 introduced Sequenced Collections (JEP 431). LinkedHashSet implements SequencedSet, providing explicit first/last element access (getFirst, getLast), insertion at extremes (addFirst, addLast), and a reverse-ordered view via reversed(). (أضافت جافا 21 واجهة SequencedSet التي توفر دوال getFirst و getLast و addFirst و addLast وعكس الترتيب عبر reversed)."
          },
          {
                    "id": "q8",
                    "question": "What is printed by the following Java 21+ code snippet?\nLinkedHashSet<String> set = new LinkedHashSet<>();\nset.add(\"First\");\nset.add(\"Second\");\nset.addFirst(\"Zero\");\nSystem.out.println(set.getFirst() + \" \" + set.getLast());\n(ما الذي يطبعه هذا الكود في جافا 21+؟)",
                    "options": [
                              "First Second",
                              "Zero Second",
                              "Zero First",
                              "Throws an UnsupportedOperationException"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! set.addFirst(\"Zero\") places \"Zero\" at the very head of the sequenced set. Therefore, getFirst() returns \"Zero\" and getLast() returns \"Second\". (دالة addFirst تضع العنصر في بداية المجموعة فيصبح Zero هو الأول و Second هو الأخير)."
          },
          {
                    "id": "q9",
                    "question": "How can you build a bounded Recent Search History tracker (e.g. keeping up to 5 unique recent search queries in order of insertion)? (كيف تبني سجلاً لعمليات البحث الأخيرة بحد أقصى 5 عناصر مع الحفاظ على الترتيب؟)",
                    "options": [
                              "Using a regular array.",
                              "Using a LinkedHashSet: when a query is performed, remove it (if present) and re-add it so it moves to the end, and if size() > 5, remove the first element via iterator().next().",
                              "Using a TreeSet with reverse alphabetical order.",
                              "Using a standard Stack."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Because removing and re-adding an element in LinkedHashSet relocates it to the tail of the iteration order, calling set.remove(query) followed by set.add(query) refreshes its recency, and evicting set.iterator().next() drops the oldest item. (حذف العنصر وإعادة إضافته ينقله إلى نهاية LinkedHashSet، وعند تجاوز الحد الأقصى نحذف أول عنصر عبر المكرر)."
          },
          {
                    "id": "q10",
                    "question": "What happens when you iterate over a LinkedHashSet after calling set.reversed() in Java 21+? (ماذا يحدث عند المرور على LinkedHashSet بعد استدعاء set.reversed() في جافا 21+؟)",
                    "options": [
                              "It physically reverses the elements in memory, altering the original set.",
                              "It returns a reverse-ordered live view of the set, traversing the doubly-linked list backwards from tail to head without copying elements.",
                              "It creates an immutable list.",
                              "It throws an exception if the set has duplicate elements."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! reversed() returns a live SequencedSet view of the collection in reverse order. Any operations on the reversed view operate on the same underlying set but in reverse traversal order. (تُرجع reversed واجهة حية للعناصر بترتيب عكسي من الذيل للرأس دون نسخ البيانات في الذاكرة)."
          },
          {
                    "id": "q11",
                    "question": "Why is LinkedHashSet preferred over HashSet when building REST API responses that return a deduplicated set of tags or categories? (لماذا يُفضل استخدام LinkedHashSet بدلاً من HashSet عند إرجاع وسوم أو تصنيفات في واجهات برمجة التطبيقات REST API؟)",
                    "options": [
                              "Because JSON serializers cannot parse HashSet.",
                              "Because LinkedHashSet provides deterministic serialization output matching the order items were registered, preventing inconsistent client-side UI ordering or flaky API integration tests caused by HashSet's pseudo-random bucket layout.",
                              "Because LinkedHashSet is faster than an array.",
                              "Because HashSet modifies HTTP response headers."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! HashSet iteration order is non-deterministic and can vary across JVM restarts or minor capacity shifts. LinkedHashSet guarantees stable, predictable serialization matching insertion order, which is essential for deterministic JSON responses and reliable frontend testing. (ترتيب HashSet غير ثابت وقد يتغير مما يربك الواجهات واختبارات التكامل، بينما تضمن LinkedHashSet استقرار وثبات ترتيب العناصر في ملفات JSON المسترجعة)."
          },
          {
                    "id": "q12",
                    "question": "What is the time complexity of add(), remove(), and contains() in a LinkedHashSet? (ما هو التعقيد الزمني لعمليات add و remove و contains في LinkedHashSet؟)",
                    "options": [
                              "O(n) for all operations",
                              "O(log n) because of the linked list",
                              "O(1) average time complexity, just like HashSet, because hash lookups find entries in O(1) and pointer updates in the doubly-linked list take O(1).",
                              "O(n^2)"
                    ],
                    "correctIndex": 2,
                    "explanation": "Correct! Like HashSet, LinkedHashSet achieves O(1) average time for basic operations. Hash lookups take O(1), and updating four pointer references (before/after) in the doubly-linked list during insertions or deletions also takes O(1) constant time. (تحقق LinkedHashSet زمناً متوسطاً O(1) للعمليات الأساسية، لأن البحث بالتجزئة وتحديث مؤشرات القائمة المزدوجة يتمان في زمن فوري ثابت)."
          },
          {
                    "id": "q13",
                    "question": "Consider this code:\nLinkedHashSet<Integer> set = new LinkedHashSet<>();\nset.add(10);\nset.add(20);\nset.add(30);\nset.remove(20);\nset.add(20);\nSystem.out.println(set);\nWhat is printed? (ما الذي يطبعه هذا الكود؟)",
                    "options": [
                              "[10, 20, 30]",
                              "[10, 30, 20]",
                              "[20, 10, 30]",
                              "[30, 20, 10]"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! When 20 is explicitly removed, it is unlinked from the doubly-linked list. When it is subsequently added again, it is treated as a fresh insertion and appended at the end of the linked list, resulting in [10, 30, 20]. (عند حذف 20 يتم فك ارتباطه من القائمة، وعند إضافته مجدداً يُعامل كإدخال جديد ويوضع في النهاية فتصبح النتيجة [10, 30, 20])."
          },
          {
                    "id": "q14",
                    "question": "How do you safely remove elements during iteration in LinkedHashSet? (كيف تزيل عناصر أثناء المرور على LinkedHashSet بأمان؟)",
                    "options": [
                              "Call set.remove() inside an enhanced for loop.",
                              "Use an Iterator and call iterator.remove(), or use set.removeIf(predicate).",
                              "Call set.poll().",
                              "Modify the 'before' pointer manually."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Just like in ArrayList and HashSet, calling set.remove() during a for-each loop triggers a ConcurrentModificationException. Calling iterator.remove() or set.removeIf(predicate) safely unlinks the element from both the hash table and the doubly-linked list. (استدعاء iterator.remove أو removeIf يفك ارتباط العنصر بأمان من جدول التجزئة والقائمة المترابطة دون إفساد عملية التكرار)."
          },
          {
                    "id": "q15",
                    "question": "In a web application building an interactive breadcrumb trail (e.g. \"Home > Products > Electronics > Laptops\"), why is LinkedHashSet an optimal choice? (في مسارات التنقل Breadcrumbs داخل المواقع، لماذا تُعد LinkedHashSet الخيار الأمثل؟)",
                    "options": [
                              "Because it automatically translates breadcrumbs to Arabic.",
                              "Because it prevents duplicate navigation steps while strictly preserving the sequential path order the user traversed.",
                              "Because it sorts navigation steps alphabetically.",
                              "Because it limits breadcrumbs to 3 items."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! A breadcrumb trail must preserve the sequential order in which sections were visited while preventing duplicate identical stages. LinkedHashSet naturally combines uniqueness with preserved chronological ordering. (مسار التنقل يتطلب الحفاظ على تسلسل الخطوات بدقة ومنع تكرار نفس الصفحة، وهو ما تحققه LinkedHashSet ببراعة)."
          }
]
        }
      ]
    },

    /* ==========================================================================
       TOPIC 64: Java TreeSet
       ========================================================================== */
    {
      id: "java-treeset",
      title: "64. Java TreeSet",
      description: "Comprehensive guide to Java TreeSet: Red-Black Tree internal architecture, NavigableSet & SortedSet contracts, O(log n) guarantees, natural ordering via Comparable vs custom Comparator, null hostility, and rich range navigation (subSet, headSet, tailSet, ceiling, floor).",
      lessons: [
        {
          id: "java-treeset-mastery",
          title: "Complete Guide to Java TreeSet",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "SortedSet & NavigableSet Contract: The Red-Black Tree (عقد المجموعات المرتبة والتنقل: شجرة الأحمر والأسود)"
            },
            {
              type: "paragraph",
              text: "Java's 'TreeSet' is an implementation of the 'NavigableSet' (and 'SortedSet') interface, backed internally by a self-balancing Red-Black Tree ('TreeMap'). Unlike HashSet and LinkedHashSet, which rely on hashing, TreeSet stores its elements in sorted ascending order. Ordering is governed either by the elements' natural order (implementing 'Comparable') or by a custom 'Comparator' provided at construction time. TreeSet guarantees O(log n) time complexity for basic operations (add, remove, contains), and provides extensive bidirectional search and range-query methods (lower, floor, ceiling, higher, subSet, headSet, tailSet)."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "تُعد فئة 'TreeSet' في جافا تطبيقاً لواجهة 'NavigableSet' (المشتقة من 'SortedSet')، وتعتمد داخلياً على شجرة بحث ثنائية متوازنة ذاتياً تُعرف بـ 'شجرة الأحمر والأسود' (Red-Black Tree عبر TreeMap). وخلافاً لـ HashSet التي تعتمد على التجزئة، تُخزن TreeSet عناصرها دائماً بحالة مرتبة تصاعدياً. ويتحدد الترتيب إما بالترتيب الطبيعي للعناصر (بتطبيق واجهة Comparable) أو عبر مقارن مخصص (Comparator) يُمرر للمنشئ. وتضمن TreeSet تعقيداً زمنياً O(log n) لعمليات الإضافة والحذف والبحث، وتزخر بدوال التنقل والبحث في النطاقات الرياضية."
            },
            {
              type: "paragraph",
              text: "Crucial Contractual Rules: 1) Equality via Comparison: TreeSet uses compareTo() or compare() to test element equality—NOT equals()! If a.compareTo(b) == 0, the elements are treated as duplicates; 2) Null Hostility: Modern TreeSet throws NullPointerException if you attempt to add null (as null cannot be compared); 3) Navigable Queries: floor(e) (≤ e), ceiling(e) (≥ e), lower(e) (< e), higher(e) (> e)."
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
              text: "Example 1: Automatic Natural Sorting (المثال 1: الترتيب التصاعدي الطبيعي التلقائي)"
            },
            {
              type: "paragraph",
              text: "Adding elements in scrambled order and observing automatic sorting."
            },
            {
              type: "code",
              language: "java",
              filename: "TreeSetNaturalOrderDemo.java",
              code: `import java.util.TreeSet;

public class TreeSetNaturalOrderDemo {
    public static void main(String[] args) {
        TreeSet<Integer> scores = new TreeSet<>();

        // Add in completely scrambled order
        scores.add(88);
        scores.add(12);
        scores.add(95);
        scores.add(43);
        scores.add(12); // Duplicate rejected

        System.out.println("TreeSet automatically sorted: " + scores);
        System.out.println("Lowest score (first):         " + scores.first());
        System.out.println("Highest score (last):         " + scores.last());
    }
}`,
              output: `TreeSet automatically sorted: [12, 43, 88, 95]
Lowest score (first):         12
Highest score (last):         95`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "TreeSet positions elements according to their natural Comparable order, displaying them sorted from least to greatest."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "تضع TreeSet العناصر في شجرتها وفقاً لترتيبها الطبيعي، مما يجعلها تظهر مرتبة تلقائياً من الأصغر إلى الأكبر."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Custom Reverse Ordering with Comparator (المثال 2: الترتيب التنازلي المخصص عبر Comparator)"
            },
            {
              type: "paragraph",
              text: "Supplying Comparator.reverseOrder() to invert tree traversal."
            },
            {
              type: "code",
              language: "java",
              filename: "TreeSetReverseOrderDemo.java",
              code: `import java.util.Comparator;
import java.util.TreeSet;

public class TreeSetReverseOrderDemo {
    public static void main(String[] args) {
        // Construct with descending comparator
        TreeSet<String> descendingWords = new TreeSet<>(Comparator.reverseOrder());

        descendingWords.add("Banana");
        descendingWords.add("Apple");
        descendingWords.add("Date");
        descendingWords.add("Cherry");

        System.out.println("Descending TreeSet: " + descendingWords);
        System.out.println("First (Highest):    " + descendingWords.first());
        System.out.println("Last (Lowest):      " + descendingWords.last());
    }
}`,
              output: `Descending TreeSet: [Date, Cherry, Banana, Apple]
First (Highest):    Date
Last (Lowest):      Apple`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "Passing a custom Comparator during construction dictates the balance and branch placement of the Red-Black Tree."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "تمرير مقارن مخصص (Comparator) للمنشئ يحدد اتجاه تفرع الشجرة ويرتب العناصر تنازلياً."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Boundary Queries (lower, floor, ceiling, higher) (المثال 3: دوال البحث التقريبي في الحدود)"
            },
            {
              type: "paragraph",
              text: "Using NavigableSet methods to find neighboring values."
            },
            {
              type: "code",
              language: "java",
              filename: "NavigableBoundaryDemo.java",
              code: `import java.util.TreeSet;

public class NavigableBoundaryDemo {
    public static void main(String[] args) {
        TreeSet<Integer> ports = new TreeSet<>();
        ports.add(21);
        ports.add(22);
        ports.add(80);
        ports.add(443);
        ports.add(8080);

        System.out.println("Available ports: " + ports);

        int target = 80;
        System.out.println("lower(" + target + ")   (< 80):  " + ports.lower(target));   // 22
        System.out.println("floor(" + target + ")   (<= 80): " + ports.floor(target));   // 80
        System.out.println("ceiling(" + target + ") (>= 80): " + ports.ceiling(target)); // 80
        System.out.println("higher(" + target + ")  (> 80):  " + ports.higher(target));  // 443

        int missing = 100;
        System.out.println("floor(100)   (<= 100): " + ports.floor(missing));   // 80
        System.out.println("ceiling(100) (>= 100): " + ports.ceiling(missing)); // 8080
    }
}`,
              output: `Available ports: [21, 22, 80, 443, 8080]
lower(80)   (< 80):  22
floor(80)   (<= 80): 80
ceiling(80) (>= 80): 80
higher(80)  (> 80):  443
floor(100)   (<= 100): 80
ceiling(100) (>= 100): 8080`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "NavigableSet boundary methods navigate tree branches in O(log n) to return the closest lower or higher element, or null if none exists."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "تبحث دوال الحدود في الشجرة بزمن O(log n) لترجع أقرب عنصر أكبر أو أصغر، أو null إن لم تجد."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Range Views (subSet, headSet, tailSet) (المثال 4: استقطاع النطاقات عبر subSet و headSet)"
            },
            {
              type: "paragraph",
              text: "Creating live windowed views over a subset of the tree."
            },
            {
              type: "code",
              language: "java",
              filename: "TreeSetRangeViewsDemo.java",
              code: `import java.util.NavigableSet;
import java.util.TreeSet;

public class TreeSetRangeViewsDemo {
    public static void main(String[] args) {
        TreeSet<Integer> numbers = new TreeSet<>();
        for (int i = 10; i <= 100; i += 10) numbers.add(i);

        System.out.println("Full tree: " + numbers);

        // 1. subSet with inclusive flags: [30, 70]
        NavigableSet<Integer> middleRange = numbers.subSet(30, true, 70, true);
        System.out.println("subSet [30 to 70]: " + middleRange);

        // 2. headSet (strictly less than 50): < 50
        NavigableSet<Integer> head = numbers.headSet(50, false);
        System.out.println("headSet (< 50):    " + head);

        // 3. tailSet (greater than or equal to 70): >= 70
        NavigableSet<Integer> tail = numbers.tailSet(70, true);
        System.out.println("tailSet (>= 70):   " + tail);
    }
}`,
              output: `Full tree: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
subSet [30 to 70]: [30, 40, 50, 60, 70]
headSet (< 50):    [10, 20, 30, 40]
tailSet (>= 70):   [70, 80, 90, 100]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "Range views are backed by the original TreeSet. Any modifications inside allowed bounds reflect in both views."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "نوافذ النطاقات ترتبط بالشجرة الأصلية مباشرة، وتتيح إجراء استعلامات سريعة على جزء محدد من البيانات."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Polling Extremes with pollFirst() and pollLast() (المثال 5: سحب وحذف الأطراف)"
            },
            {
              type: "paragraph",
              text: "Retrieving and removing the lowest and highest elements in O(log n)."
            },
            {
              type: "code",
              language: "java",
              filename: "TreeSetPollDemo.java",
              code: `import java.util.TreeSet;

public class TreeSetPollDemo {
    public static void main(String[] args) {
        TreeSet<String> priorityJobs = new TreeSet<>();
        priorityJobs.add("Task 30 - Low");
        priorityJobs.add("Task 10 - Urgent");
        priorityJobs.add("Task 20 - Medium");

        System.out.println("Current jobs: " + priorityJobs);

        // pollFirst removes and returns the smallest element
        String highestPriority = priorityJobs.pollFirst();
        System.out.println("Dispatched (pollFirst): " + highestPriority);

        // pollLast removes and returns the largest element
        String lowestPriority = priorityJobs.pollLast();
        System.out.println("Dropped (pollLast):     " + lowestPriority);

        System.out.println("Remaining jobs:         " + priorityJobs);
    }
}`,
              output: `Current jobs: [Task 10 - Urgent, Task 20 - Medium, Task 30 - Low]
Dispatched (pollFirst): Task 10 - Urgent
Dropped (pollLast):     Task 30 - Low
Remaining jobs:         [Task 20 - Medium]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "pollFirst() and pollLast() provide queue-like semantics over sorted trees in O(log n) time."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "توفر pollFirst و pollLast سحب وحذف أصغر وأكبر عنصر بزمن O(log n) الشجري."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: The compareTo() Equality Trap (المثال 6: فخ التكرار عند المقارنة بـ compareTo وليس equals)"
            },
            {
              type: "paragraph",
              text: "TreeSet uses compareTo == 0 to determine equality, ignoring equals()."
            },
            {
              type: "code",
              language: "java",
              filename: "CompareToEqualityTrapDemo.java",
              code: `import java.util.TreeSet;

public class CompareToEqualityTrapDemo {
    static class Player implements Comparable<Player> {
        String name;
        int score;

        Player(String name, int score) {
            this.name = name;
            this.score = score;
        }

        // BUGGY COMPARISON: only compares score!
        @Override
        public int compareTo(Player o) {
            return Integer.compare(this.score, o.score);
        }

        @Override
        public String toString() {
            return name + ":" + score;
        }
    }

    public static void main(String[] args) {
        TreeSet<Player> leaderboard = new TreeSet<>();

        Player p1 = new Player("Alice", 100);
        Player p2 = new Player("Bob", 100); // Same score, DIFFERENT name!

        leaderboard.add(p1);
        boolean addedBob = leaderboard.add(p2); // REJECTED because compareTo returns 0!

        System.out.println("Added Alice: " + p1);
        System.out.println("Added Bob (same score)? " + addedBob);
        System.out.println("Leaderboard size: " + leaderboard.size());
        System.out.println("Leaderboard: " + leaderboard);
    }
}`,
              output: `Added Alice: Alice:100
Added Bob (same score)? false
Leaderboard size: 1
Leaderboard: [Alice:100]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "TreeSet checks uniqueness via compareTo(), not equals()! Because Alice and Bob had the same score, compareTo returned 0, treating Bob as a duplicate."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "تعتمد TreeSet على compareTo لفحص التكرار وليس equals؛ ولأن درجات اللاعبين تساوت أرجعت المقارنة 0 ورُفض بوب باعتباره مكرراً."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Fixing the Comparison Trap with Multi-Field Comparator (المثال 7: معالجة المقارنة بالمقارنة المركبة)"
            },
            {
              type: "paragraph",
              text: "Comparing primary field then secondary field to prevent false duplicate rejections."
            },
            {
              type: "code",
              language: "java",
              filename: "MultiFieldTreeSetDemo.java",
              code: `import java.util.Comparator;
import java.util.TreeSet;

public class MultiFieldTreeSetDemo {
    static class Player {
        String name;
        int score;

        Player(String name, int score) {
            this.name = name;
            this.score = score;
        }

        @Override
        public String toString() {
            return name + "(" + score + ")";
        }
    }

    public static void main(String[] args) {
        // Tie-breaker: sort by score descending, then by name alphabetically!
        Comparator<Player> comp = Comparator
                .comparingInt((Player p) -> p.score).reversed()
                .thenComparing(p -> p.name);

        TreeSet<Player> leaderboard = new TreeSet<>(comp);

        leaderboard.add(new Player("Alice", 100));
        leaderboard.add(new Player("Bob", 100));   // Accepted! Same score, distinct name!
        leaderboard.add(new Player("Charlie", 90));

        System.out.println("Leaderboard: " + leaderboard);
        System.out.println("Total players: " + leaderboard.size());
    }
}`,
              output: `Leaderboard: [Alice(100), Bob(100), Charlie(90)]
Total players: 3`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "Using thenComparing() introduces a tie-breaker, ensuring that two distinct objects with the same score don't yield compare() == 0."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "إضافة thenComparing يكسر التعادل بمقارنة الاسم أبجدياً، مما يمنع إرجاع 0 عند تساوي الدرجات ويسمح بتسجيل كلا اللاعبين."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Null Hostility in Modern TreeSet (المثال 8: رفض قيم null ورمي NullPointerException)"
            },
            {
              type: "paragraph",
              text: "TreeSet throws NullPointerException when trying to compare null."
            },
            {
              type: "code",
              language: "java",
              filename: "TreeSetNullHostilityDemo.java",
              code: `import java.util.TreeSet;

public class TreeSetNullHostilityDemo {
    public static void main(String[] args) {
        TreeSet<String> set = new TreeSet<>();
        set.add("Active");

        try {
            set.add(null); // Throws NPE because null cannot invoke compareTo()
        } catch (NullPointerException e) {
            System.out.println("Caught NullPointerException!");
            System.out.println("TreeSet is strictly null-hostile because comparison with null is undefined.");
        }
    }
}`,
              output: `Caught NullPointerException!
TreeSet is strictly null-hostile because comparison with null is undefined.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "TreeSet cannot place null into the Red-Black Tree because null cannot be evaluated by compareTo()."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "ترفض TreeSet قيم null قطعياً وترمي NullPointerException لتعذر مقارنة null في شجرة البحث."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Bidirectional Traversal with descendingSet() (المثال 9: عكس الشجرة عبر descendingSet)"
            },
            {
              type: "paragraph",
              text: "Obtaining a reverse-order view in O(1) time without copying elements."
            },
            {
              type: "code",
              language: "java",
              filename: "DescendingSetDemo.java",
              code: `import java.util.NavigableSet;
import java.util.TreeSet;

public class DescendingSetDemo {
    public static void main(String[] args) {
        TreeSet<Integer> ascending = new TreeSet<>();
        ascending.add(10);
        ascending.add(20);
        ascending.add(30);

        // descendingSet() is an O(1) live reverse view
        NavigableSet<Integer> descending = ascending.descendingSet();

        System.out.println("Ascending View:  " + ascending);
        System.out.println("Descending View: " + descending);

        // Mutation in original is mirrored in descending view
        ascending.add(40);
        System.out.println("After adding 40: " + descending);
    }
}`,
              output: `Ascending View:  [10, 20, 30]
Descending View: [30, 20, 10]
After adding 40: [40, 30, 20, 10]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "descendingSet() creates a live, reversed perspective of the tree in O(1) time without allocating extra tree nodes."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "تُنشئ descendingSet منظوراً عكسياً حياً للشجرة بزمن O(1) فوري دون تكرار العناصر في الذاكرة."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Performance Benchmark (TreeSet O(log n) vs HashSet O(1)) (المثال 10: مقارنة السرعة بين TreeSet و HashSet)"
            },
            {
              type: "paragraph",
              text: "Measuring the difference between hash lookups and tree traversal."
            },
            {
              type: "code",
              language: "java",
              filename: "TreeVsHashBenchmarkDemo.java",
              code: `import java.util.HashSet;
import java.util.TreeSet;

public class TreeVsHashBenchmarkDemo {
    public static void main(String[] args) {
        int count = 100_000;
        HashSet<Integer> hashSet = new HashSet<>(count);
        TreeSet<Integer> treeSet = new TreeSet<>();

        // Benchmark insertion
        long startHash = System.currentTimeMillis();
        for (int i = 0; i < count; i++) hashSet.add(i);
        long timeHash = System.currentTimeMillis() - startHash;

        long startTree = System.currentTimeMillis();
        for (int i = 0; i < count; i++) treeSet.add(i);
        long timeTree = System.currentTimeMillis() - startTree;

        System.out.println("HashSet insert time (O(1)):     " + timeHash + " ms");
        System.out.println("TreeSet insert time (O(log n)): " + timeTree + " ms");
        System.out.println("HashSet is faster for insertion: " + (timeHash < timeTree));
    }
}`,
              output: `HashSet insert time (O(1)):     12 ms
TreeSet insert time (O(log n)): 48 ms
HashSet is faster for insertion: true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "HashSet is faster for bulk insertion because O(1) hash math beats O(log n) tree rebalancing and pointer updates."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "تتفوق HashSet في سرعة الإدخال لأن زمن التجزئة O(1) أسرع من موازنة الشجرة ومقارنات الفروع O(log n)."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Converting TreeSet to Immutable Sorted Set (المثال 11: تجميد الشجرة في مجموعة غير قابلة للتعديل)"
            },
            {
              type: "paragraph",
              text: "Using Collections.unmodifiableSortedSet to protect sorted views."
            },
            {
              type: "code",
              language: "java",
              filename: "UnmodifiableSortedSetDemo.java",
              code: `import java.util.Collections;
import java.util.SortedSet;
import java.util.TreeSet;

public class UnmodifiableSortedSetDemo {
    public static void main(String[] args) {
        TreeSet<String> tiers = new TreeSet<>();
        tiers.add("Bronze");
        tiers.add("Silver");
        tiers.add("Gold");

        // Wrap as read-only view
        SortedSet<String> readOnlyTiers = Collections.unmodifiableSortedSet(tiers);

        System.out.println("Read-only sorted set: " + readOnlyTiers);

        try {
            readOnlyTiers.add("Platinum");
        } catch (UnsupportedOperationException e) {
            System.out.println("Mutation blocked! TreeSet safely wrapped in read-only wrapper.");
        }
    }
}`,
              output: `Read-only sorted set: [Bronze, Gold, Silver]
Mutation blocked! TreeSet safely wrapped in read-only wrapper.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "Collections.unmodifiableSortedSet exposes sorted queries (first, last, subSet) while prohibiting mutations."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "يوفر الغلاف unmodifiableSortedSet إمكانية الاستعلام عن الحدود والنطاقات مع منع أي تعديل على الشجرة."
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
                "Mistake 1: Adding objects that do NOT implement Comparable into a TreeSet without providing a custom Comparator, resulting in ClassCastException at runtime.",
                "خطأ 1: إضافة كائنات لا تطبق واجهة Comparable دون تمرير Comparator في المنشئ؛ مما يسبب استثناء ClassCastException.",
                "Mistake 2: Writing a compareTo() implementation that is inconsistent with equals(). If compareTo() returns 0 for two items that have different equals(), TreeSet treats one as a duplicate!",
                "خطأ 2: كتابة compareTo تعيد 0 لكائنات مختلفة منطقياً؛ فتعتبرها TreeSet مكررة وترفض تخزينها وتضيع البيانات.",
                "Mistake 3: Attempting to insert null into a TreeSet. Modern Java TreeSet throws NullPointerException immediately.",
                "خطأ 3: محاولة إدخال قيمة null في TreeSet؛ فترمي جافا استثناء NullPointerException فوراً لتعذر مقارنتها.",
                "Mistake 4: Choosing TreeSet when sorting is not required, suffering O(log n) tree overhead instead of O(1) HashSet speed."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Flight Schedule Range Search Engine (التحدي العملي: محرك البحث في مواعيد الرحلات الجوية)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Create a class 'FlightSchedule' that manages flight departure times (e.g. 0830, 1145, 1420, 1800, 2115). Implement: 1) 'addFlight(int departureTime)'; 2) 'findNextAvailable(int queryTime)'; 3) 'findFlightsBetween(int startTime, int endTime)'. Test in main() with sample queries."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: صمم فئة FlightSchedule لإدارة أوقات إقلاع الرحلات بنظام 24 ساعة (مثل 0830 و 1420). نفّذ: 1) addFlight لإضافة وقت رحلة؛ 2) findNextAvailable لإيجاد أقرب رحلة قادمة عبر ceiling؛ 3) findFlightsBetween لإيجاد الرحلات الواقعة في فترة زمنية عبر subSet. اختبرها في main واطبع النتائج."
            },
            {
              type: "code",
              language: "java",
              filename: "FlightScheduleChallenge.java",
              code: `import java.util.NavigableSet;
import java.util.TreeSet;

public class FlightScheduleChallenge {
    static class FlightSchedule {
        private final TreeSet<Integer> departures = new TreeSet<>();

        public void addFlight(int time24h) {
            departures.add(time24h);
        }

        public Integer findNextAvailable(int requestTime) {
            // Returns the least flight time >= requestTime
            return departures.ceiling(requestTime);
        }

        public NavigableSet<Integer> findFlightsBetween(int startTime, int endTime) {
            // Inclusive range query
            return departures.subSet(startTime, true, endTime, true);
        }

        public void printAll() {
            System.out.println("Daily Flights: " + departures);
        }
    }

    public static void main(String[] args) {
        FlightSchedule schedule = new FlightSchedule();
        schedule.addFlight(800);
        schedule.addFlight(1030);
        schedule.addFlight(1315);
        schedule.addFlight(1645);
        schedule.addFlight(2000);

        schedule.printAll();

        int passengerArrival = 1100;
        Integer nextFlight = schedule.findNextAvailable(passengerArrival);
        System.out.println("Passenger arrives at 11:00. Next flight: " + nextFlight + " hrs");

        NavigableSet<Integer> afternoonFlights = schedule.findFlightsBetween(1200, 1700);
        System.out.println("Afternoon flights (12:00 - 17:00): " + afternoonFlights);
    }
}`,
              output: `Daily Flights: [800, 1030, 1315, 1645, 2000]
Passenger arrives at 11:00. Next flight: 1315 hrs
Afternoon flights (12:00 - 17:00): [1315, 1645]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "TreeSet.ceiling() instantly returns the next departure in O(log n), while subSet() generates windowed flight availability seamlessly."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "تُرجع دالة ceiling الرحلة التالية فوراً بزمن O(log n)، بينما توفر subSet نافذة دقيقة للرحلات المتاحة في أي فترة زمنية مطلوبة."
            }
          ],
          quiz: [
          {
                    "id": "q1",
                    "question": "What is the underlying data structure powering java.util.TreeSet? (ما هو هيكل البيانات الأساسي الذي تعتمد عليه فئة TreeSet؟)",
                    "options": [
                              "A resizable Object array.",
                              "A self-balancing Red-Black binary search tree (backed internally by java.util.TreeMap).",
                              "A hash table with separate chaining.",
                              "A binary heap."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! TreeSet implements the NavigableSet interface and is backed internally by a TreeMap, which is implemented as a self-balancing Red-Black binary search tree. (تعتمد TreeSet داخلياً على TreeMap المنفذة بواسطة شجرة بحث ثنائية ذاتية التوازن من نوع Red-Black Tree)."
          },
          {
                    "id": "q2",
                    "question": "What is the time complexity of add(), remove(), and contains() operations in a TreeSet of size n? (ما هو التعقيد الزمني لعمليات add و remove و contains في TreeSet بحجم n؟)",
                    "options": [
                              "O(1) constant time",
                              "O(log n) logarithmic time, because traversing down a balanced red-black tree takes time proportional to its tree height.",
                              "O(n) linear time",
                              "O(n log n)"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Because the red-black tree guarantees that the tree height never exceeds 2 * log2(n + 1), search, insertion, and deletion operations all run in guaranteed O(log n) time. (تضمن شجرة الأحمر-والأسود ألا يتجاوز ارتفاعها ضعف اللوغاريتم، لذا تنفذ العمليات الأساسية في زمن لوغاريثمي O(log n))."
          },
          {
                    "id": "q3",
                    "question": "What happens if you attempt to add an element to a new TreeSet<>() that does NOT implement java.lang.Comparable and no Comparator was supplied? (ماذا يحدث إذا حاولت إضافة كائن لـ TreeSet لا يطبق Comparable ولم يتم تزويدها بـ Comparator؟)",
                    "options": [
                              "The element is added without sorting.",
                              "A ClassCastException is thrown at runtime when attempting to compare the element.",
                              "A NullPointerException is thrown.",
                              "The JVM automatically compares their memory addresses."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! When elements are inserted into a TreeSet without an explicit Comparator, the tree attempts to cast them to Comparable<? super E>. If the class does not implement Comparable, a java.lang.ClassCastException is thrown. (عند غياب Comparator مخصص، تحاول TreeSet تحويل العنصر قسرياً إلى Comparable لمقارنته، فإذا لم يكن يطبقها يُطلق ClassCastException فوراً)."
          },
          {
                    "id": "q4",
                    "question": "What is the 'compareTo() Equality Trap' in TreeSet? (ما هو 'فخ التساوي في compareTo' داخل TreeSet؟)",
                    "options": [
                              "TreeSet ignores compareTo() and only uses equals().",
                              "TreeSet determines element uniqueness strictly by compareTo() (or compare()) returning 0, NOT by equals(). If two objects have different field values but their compareTo() returns 0, TreeSet considers them identical and silently rejects the second object!",
                              "TreeSet crashes if compareTo() returns a negative number.",
                              "compareTo() is only called when printing the set."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Unlike HashSet which uses equals() and hashCode(), TreeSet strictly uses the return value of compareTo() / compare(). If compareTo(a, b) == 0, the elements are considered duplicates according to the Set contract, and the second element is rejected, even if a.equals(b) is false! (تعتمد TreeSet حصرياً على إرجاع 0 من دالة المقارنة لتحديد التكرار وتتجاهل equals تماماً، فإذا أرجعت الدالة 0 لكائنين مختلفين فستعتبرهما مكررين وترفض إضافة الثاني)."
          },
          {
                    "id": "q5",
                    "question": "What does TreeSet do when you attempt to add null into it in modern Java (Java 7+)? (كيف تتصرف TreeSet عند محاولة إضافة null إليها في جافا الحديثة؟)",
                    "options": [
                              "null is placed at the very beginning.",
                              "It throws a NullPointerException because null cannot be compared against any other object via compareTo().",
                              "null is ignored silently without error.",
                              "null is placed at the root of the tree."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! In modern Java, TreeSet is null-hostile. Attempting to add null throws NullPointerException immediately because the tree must invoke compareTo() on the element to find its position. (ترفض TreeSet الحديثة قيم null وترمي NullPointerException فوراً لأنها تحتاج لاستدعاء compareTo لتحديد موقع العنصر في الشجرة)."
          },
          {
                    "id": "q6",
                    "question": "Given a TreeSet<Integer> set containing [10, 20, 30, 40, 50], what are the return values of set.floor(25) and set.ceiling(25)? (ما هي القيم المرجعة لـ floor(25) و ceiling(25) على هذه المجموعة؟)",
                    "options": [
                              "floor=20, ceiling=30",
                              "floor=30, ceiling=20",
                              "floor=10, ceiling=40",
                              "Both return null"
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! floor(e) returns the greatest element less than or equal to e (20 <= 25), while ceiling(e) returns the least element greater than or equal to e (30 >= 25). (دالة floor تُرجع أكبر عنصر أصغر من أو يساوي 25 وهو 20، بينما ceiling تُرجع أصغر عنصر أكبر من أو يساوي 25 وهو 30)."
          },
          {
                    "id": "q7",
                    "question": "How do lower(e) and higher(e) differ from floor(e) and ceiling(e) in NavigableSet? (كيف تختلف دالتا lower و higher عن floor و ceiling في NavigableSet؟)",
                    "options": [
                              "lower and higher are strictly less than (<) and strictly greater than (>), whereas floor (<=) and ceiling (>=) include equality if the element itself exists in the set.",
                              "They are exact synonyms.",
                              "lower and higher remove the elements from the set.",
                              "lower and higher return boolean values."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! lower(e) matches strictly (< e) and higher(e) matches strictly (> e). If e is present in the set, floor(e) and ceiling(e) will return e itself, but lower(e) and higher(e) will skip e. (دالتا lower و higher تبحثان عن قيم أصغر تماماً أو أكبر تماماً، بينما floor و ceiling تقبلان التساوي إذا كان العنصر موجوداً بالفعل)."
          },
          {
                    "id": "q8",
                    "question": "What do pollFirst() and pollLast() do in a TreeSet? (ما الذي تفعله دالتا pollFirst و pollLast في TreeSet؟)",
                    "options": [
                              "They retrieve the first and last elements without removing them.",
                              "They retrieve AND remove the first (lowest) and last (highest) elements respectively, or return null if the set is empty.",
                              "They reset the root of the red-black tree.",
                              "They reverse the order of elements."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! pollFirst() retrieves and removes the lowest element, and pollLast() retrieves and removes the highest element. If the set is empty, both safely return null without throwing an exception. (تقوم الدالتان بجلب وحذف العنصر الأصغر والأكبر على التوالي، وتُرجعان null بأمان إذا كانت الشجرة فارغة)."
          },
          {
                    "id": "q9",
                    "question": "Given TreeSet<Integer> set = new TreeSet<>(Arrays.asList(10, 20, 30, 40, 50)), what does set.subSet(20, 40) return? (ما الذي ترجعه دالة set.subSet(20, 40)؟)",
                    "options": [
                              "[20, 30, 40]",
                              "A live view containing [20, 30] (inclusive of 20, exclusive of 40).",
                              "[30, 40]",
                              "[10, 50]"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! In standard SortedSet, subSet(fromElement, toElement) is half-open: inclusive of the lower endpoint (20) and exclusive of the upper endpoint (40). The result contains [20, 30]. (النطاق الافتراضي في subSet يتضمن نقطة البداية 20 ويستبعد نقطة النهاية 40، فينتج [20, 30])."
          },
          {
                    "id": "q10",
                    "question": "How can you create a subSet with both endpoints inclusive (e.g. including both 20 and 40) using NavigableSet methods? (كيف تستقطع نطاقاً يشمل كلا الطرفين 20 و 40 معاً في NavigableSet؟)",
                    "options": [
                              "set.subSetInclusive(20, 40)",
                              "set.subSet(20, true, 40, true)",
                              "set.range(20, 40)",
                              "set.slice(20, 40)"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! NavigableSet overloads subSet(fromElement, fromInclusive, toElement, toInclusive). Passing (20, true, 40, true) includes both 20 and 40 in the resulting live view. (توفر NavigableSet دالة subSet بأعلام منطقية تتيح تحديد تضمين البداية والنهاية عبر true, true)."
          },
          {
                    "id": "q11",
                    "question": "What is the return value and behavior of set.descendingSet() on a TreeSet? (ما هو سلوك وقيمة إرجاع دالة descendingSet() على كائن TreeSet؟)",
                    "options": [
                              "It mutates the existing tree in place, reversing all pointers.",
                              "It returns a reverse-order NavigableSet view backed by the original tree in O(1) time without copying elements.",
                              "It creates a new List sorted in reverse.",
                              "It throws an UnsupportedOperationException."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! descendingSet() returns a reverse-order view of the elements. It is an O(1) live view: modifications to the descending set reflect in the original tree and vice versa. (تُرجع واجهة حية للأصل بالترتيب العكسي بزمن فوري O(1) دون نسخ، وتنعكس التغييرات في أي منهما على الآخر)."
          },
          {
                    "id": "q12",
                    "question": "What happens if you attempt to add an element outside the range of a subSet view, such as:\nNavigableSet<Integer> view = set.subSet(20, true, 40, true);\nview.add(55);\n(ماذا يحدث عند محاولة إضافة عنصر يقع خارج نطاق واجهة subSet؟)",
                    "options": [
                              "The element 55 is added to the backing set, and the view expands to include it.",
                              "An IllegalArgumentException is thrown because the element is out of the subSet's bounded range.",
                              "The element 55 is silently dropped.",
                              "The view is converted into a full set."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Sub-range views (subSet, headSet, tailSet) enforce boundary restrictions. Inserting an element outside the view's endpoint limits violates the boundary contract and throws java.lang.IllegalArgumentException. (نوافذ النطاقات تفرض حدوداً صارمة، ومحاولة إدراج عنصر خارج حدودها يُطلق IllegalArgumentException فوراً)."
          },
          {
                    "id": "q13",
                    "question": "How do you instantiate a TreeSet of Strings that sorts elements by their length rather than alphabetical natural order? (كيف تنشئ TreeSet للنصوص تفرز العناصر حسب طول الكلمة بدلاً من الترتيب الهجائي؟)",
                    "options": [
                              "new TreeSet<String>()",
                              "new TreeSet<String>(Comparator.comparingInt(String::length).thenComparing(Comparator.naturalOrder()))",
                              "new TreeSet<String>(String::length) // missing tie-breaker",
                              "new TreeSet<String>().sortByLength()"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Supplying a custom Comparator allows custom ordering. Crucially, chaining .thenComparing(naturalOrder()) provides a tie-breaker so that two different strings with the same length (e.g. \"cat\" and \"dog\") are not treated as duplicates and rejected! (استخدام thenComparing يضمن عدم اعتبار الكلمات المتساوية في الطول مثل cat و dog مكررة واستبعاد إحداهما)."
          },
          {
                    "id": "q14",
                    "question": "In a Flight Scheduling engine where customers search for the earliest departing flight after a given hour (e.g., first flight after 14:30), which TreeSet method provides the solution in O(log n)? (في محرك مواعيد رحلات الطيران للبحث عن أول رحلة بعد ساعة محددة، أي دالة تقدم الحل في O(log n)؟)",
                    "options": [
                              "set.get(1430)",
                              "set.ceiling(requestedTime) or set.higher(requestedTime)",
                              "set.floor(requestedTime)",
                              "Collections.binarySearch(set, requestedTime)"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! set.ceiling(requestedTime) immediately returns the smallest scheduled departure time that is >= the requested time in O(log n) time. (دالة ceiling تجلب أول موعد رحلة أكبر من أو يساوي الوقت المطلوب فوراً في زمن لوغاريثمي O(log n))."
          },
          {
                    "id": "q15",
                    "question": "When should an architect choose HashSet over TreeSet, and vice-versa? (متى يجب على مهندس البرمجيات اختيار HashSet مقابل TreeSet والعكس؟)",
                    "options": [
                              "TreeSet should always be used because it has more features.",
                              "Use HashSet when you only need fast O(1) membership and uniqueness checks without ordering requirements; use TreeSet when you need elements continuously sorted, range queries (subSet), or nearest-neighbor boundary searches (floor, ceiling) at the cost of O(log n) complexity.",
                              "HashSet is only for numbers; TreeSet is for strings.",
                              "TreeSet uses less memory than HashSet."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! HashSet is the default choice for pure uniqueness and fast O(1) lookups. TreeSet is the specialized choice when business logic requires natural/custom ordering, range extractions, or boundary navigation queries (O(log n)). (تُستخدم HashSet للبحث فائق السرعة O(1) دون ترتيب، بينما تُستخدم TreeSet عند الحاجة لترتيب العناصر أو البحث في النطاقات والحدود بزمن O(log n))."
          }
]
        }
      ]
    }
  ];
})();
