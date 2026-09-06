/**
 * Java Curriculum Module - Part 34
 * Topics:
 * 67. Java LinkedHashMap
 * 68. Java TreeMap
 * 
 * 100% Offline, Pure JavaScript. Complete educational content with full bilingual (English & Arabic) explanations.
 */

(function () {
  'use strict';

  window.JAVA_TOPICS_PART34 = [
    /* ==========================================================================
       TOPIC 67: Java LinkedHashMap
       ========================================================================== */
    {
      id: "java-linkedhashmap",
      title: "67. Java LinkedHashMap",
      description: "Comprehensive guide to Java LinkedHashMap: hash table with doubly-linked list, insertion-order vs access-order, building production LRU (Least Recently Used) caches with removeEldestEntry(), deterministic iteration, and memory overhead trade-offs.",
      lessons: [
        {
          id: "java-linkedhashmap-mastery",
          title: "Complete Guide to Java LinkedHashMap",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "LinkedHashMap Architecture: Predictable Ordering & LRU Caching (هندسة LinkedHashMap: الترتيب المتوقع وبناء خوادم التخزين المؤقت LRU)"
            },
            {
              type: "paragraph",
              text: "Java's 'LinkedHashMap' extends 'HashMap' and implements 'Map'. It combines the fast O(1) hash bucket lookups of HashMap with a doubly-linked list running through all of its entries. This linked list defines the iteration order. By default, the order is insertion-order (the order in which keys were inserted into the map). However, LinkedHashMap provides a special 3-argument constructor: 'new LinkedHashMap<>(capacity, loadFactor, accessOrder)'. When 'accessOrder' is true, the order of entries changes to access-order (from least-recently accessed to most-recently accessed). By overriding the 'removeEldestEntry()' hook method, developers can create clean, production-grade Least Recently Used (LRU) memory caches in just a few lines of code."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "ترث فئة 'LinkedHashMap' من 'HashMap' وتطبق واجهة 'Map'. تجمع ببراعة بين سرعة التجزئة الفائقة O(1) وقائمة مترابطة مزدوجة تمر عبر كافة العناصر لحفظ ترتيبها. افتراضياً، يكون الترتيب هو ترتيب الإدخال (Insertion-Order). ولكن السحر الحقيقي يكمن في المنشئ الخاص: 'new LinkedHashMap<>(capacity, loadFactor, accessOrder)'. فعند تفعيل 'accessOrder = true'، يتحول الترتيب إلى ترتيب الوصول (Access-Order)؛ حيث ينتقل أي عنصر يُقرأ أو يُعدل إلى نهاية القائمة كأحدث عنصر مستخدم. وعبر إعادة كتابة دالة 'removeEldestEntry()' يمكن بناء ذاكرة تخزين مؤقت احترافية بخوارزمية LRU لحذف العناصر الأقدم تلقائياً بعدة أسطر بسيطة."
            },
            {
              type: "paragraph",
              text: "Key Architectural Highlights: 1) Deterministic Iteration: Iteration follows the internal linked list, completely predictable; 2) Access Order: Calling get(k) moves that entry to the tail of the linked list; 3) Memory Overhead: Adds 'before' and 'after' references to each entry, requiring ~25% more memory than standard HashMap."
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
              text: "Example 1: Guaranteed Insertion Order (المثال 1: ضمان ترتيب الإدخال مقارنة بـ HashMap)"
            },
            {
              type: "paragraph",
              text: "Verifying that default LinkedHashMap preserves exact insertion sequence."
            },
            {
              type: "code",
              language: "java",
              filename: "InsertionOrderMapDemo.java",
              code: `import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

public class InsertionOrderMapDemo {
    public static void main(String[] args) {
        Map<String, Integer> hashMap = new HashMap<>();
        Map<String, Integer> linkedMap = new LinkedHashMap<>();

        String[] keys = {"Zeta", "Beta", "Alpha", "Gamma", "Delta"};
        for (int i = 0; i < keys.length; i++) {
            hashMap.put(keys[i], i);
            linkedMap.put(keys[i], i);
        }

        System.out.println("HashMap order (hash-dependent): " + hashMap.keySet());
        System.out.println("LinkedHashMap order (preserved):" + linkedMap.keySet());
    }
}`,
              output: `HashMap order (hash-dependent): [Zeta, Beta, Delta, Gamma, Alpha]
LinkedHashMap order (preserved):[Zeta, Beta, Alpha, Gamma, Delta]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "LinkedHashMap links each new entry to the tail of its internal list, preserving the exact insertion order."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "تربط LinkedHashMap كل عنصر جديد في نهاية قائمتها الداخلية، مما يحافظ على تسلسل الإدخال الأصلي بدقة."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Re-inserting an Existing Key (المثال 2: تحديث المفتاح لا يغير موقعه في ترتيب الإدخال)"
            },
            {
              type: "paragraph",
              text: "Observing that overwriting a key in insertion-order mode does NOT change its position."
            },
            {
              type: "code",
              language: "java",
              filename: "ReinsertPositionDemo.java",
              code: `import java.util.LinkedHashMap;

public class ReinsertPositionDemo {
    public static void main(String[] args) {
        LinkedHashMap<String, String> steps = new LinkedHashMap<>();
        steps.put("Step 1", "Compile");
        steps.put("Step 2", "Test");
        steps.put("Step 3", "Package");

        System.out.println("Initial steps: " + steps);

        // Updating Step 2 modifies value, but does NOT move it to the end in insertion-order mode
        steps.put("Step 2", "Run Automated Tests");

        System.out.println("After update:  " + steps);
    }
}`,
              output: `Initial steps: {Step 1=Compile, Step 2=Test, Step 3=Package}
After update:  {Step 1=Compile, Step 2=Run Automated Tests, Step 3=Package}`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "In default insertion-order mode, updating an existing key replaces its value in-place without shifting its node in the linked list."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "في نمط ترتيب الإدخال، تحديث قيمة مفتاح موجود مسبقاً يستبدل قيمته في مكانه دون تحريك موضعه في القائمة."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Enabling Access-Order Mode (المثال 3: تفعيل نمط ترتيب الوصول accessOrder)"
            },
            {
              type: "paragraph",
              text: "Enabling accessOrder = true so get() moves accessed items to the tail."
            },
            {
              type: "code",
              language: "java",
              filename: "AccessOrderDemo.java",
              code: `import java.util.LinkedHashMap;

public class AccessOrderDemo {
    public static void main(String[] args) {
        // Constructor: (initialCapacity, loadFactor, accessOrder: true)
        LinkedHashMap<String, String> accessMap = new LinkedHashMap<>(16, 0.75f, true);

        accessMap.put("A", "Apple");
        accessMap.put("B", "Banana");
        accessMap.put("C", "Cherry");

        System.out.println("Before access (LRU -> MRU): " + accessMap.keySet());

        // Access 'A' via get() -> Moves 'A' to the tail as Most Recently Used (MRU)!
        accessMap.get("A");
        System.out.println("After get('A'):            " + accessMap.keySet());

        // Access 'B' via get() -> Moves 'B' to the tail!
        accessMap.get("B");
        System.out.println("After get('B'):            " + accessMap.keySet());
    }
}`,
              output: `Before access (LRU -> MRU): [A, B, C]
After get('A'):            [B, C, A]
After get('B'):            [C, A, B]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "With accessOrder set to true, any read (get, getOrDefault) or mutation rewires the entry's pointers to place it at the end of the chain."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "عند تفعيل accessOrder = true، فإن أي عملية قراءة بـ get تنقل العنصر إلى ذيل القائمة ليصبح العنصر الأكثر استخداماً مؤخراً."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Building a Production LRU Cache with removeEldestEntry() (المثال 4: بناء خزانة LRU مؤقتة احترافية)"
            },
            {
              type: "paragraph",
              text: "Subclassing LinkedHashMap and overriding removeEldestEntry to bound cache size."
            },
            {
              type: "code",
              language: "java",
              filename: "ProductionLruCacheDemo.java",
              code: `import java.util.LinkedHashMap;
import java.util.Map;

public class ProductionLruCacheDemo {
    static class SimpleLruCache<K, V> extends LinkedHashMap<K, V> {
        private final int maxCapacity;

        public SimpleLruCache(int maxCapacity) {
            super(maxCapacity + 1, 1.0f, true); // access-order = true
            this.maxCapacity = maxCapacity;
        }

        // Automatically invoked by put() and putAll()
        @Override
        protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {
            return size() > maxCapacity; // Evicts head entry when size exceeded!
        }
    }

    public static void main(String[] args) {
        SimpleLruCache<String, String> cache = new SimpleLruCache<>(3);

        cache.put("Doc1", "Resume");
        cache.put("Doc2", "Contract");
        cache.put("Doc3", "Invoice");
        System.out.println("Initial Cache: " + cache.keySet());

        // Access Doc1 so it becomes MRU (tail)
        cache.get("Doc1");
        System.out.println("After accessing Doc1: " + cache.keySet());

        // Insert 4th item: should evict oldest (Doc2)
        cache.put("Doc4", "Report");
        System.out.println("After adding Doc4:    " + cache.keySet() + " (Doc2 was evicted!)");
    }
}`,
              output: `Initial Cache: [Doc1, Doc2, Doc3]
After accessing Doc1: [Doc2, Doc3, Doc1]
After adding Doc4:    [Doc3, Doc1, Doc4] (Doc2 was evicted!)`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "removeEldestEntry() is called automatically after each put(). When it returns true, the least-recently used entry at the head is discarded."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "تُستدعى removeEldestEntry تلقائياً بعد كل إضافة؛ وعند إرجاعها true يُحذف العنصر الأقدم استخداماً الموجود في رأس القائمة."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Null Key and Value Support (المثال 5: دعم مفتاح null وقيم null)"
            },
            {
              type: "paragraph",
              text: "LinkedHashMap permits one null key and multiple null values, preserving their order."
            },
            {
              type: "code",
              language: "java",
              filename: "LinkedHashMapNullDemo.java",
              code: `import java.util.LinkedHashMap;

public class LinkedHashMapNullDemo {
    public static void main(String[] args) {
        LinkedHashMap<String, String> settings = new LinkedHashMap<>();

        settings.put("theme", "DARK");
        settings.put(null, "GLOBAL_FALLBACK");
        settings.put("timeout", null);

        System.out.println("Settings state: " + settings);
        System.out.println("Null key value: " + settings.get(null));
        System.out.println("Contains null key? " + settings.containsKey(null));
    }
}`,
              output: `Settings state: {theme=DARK, null=GLOBAL_FALLBACK, timeout=null}
Null key value: GLOBAL_FALLBACK
Contains null key? true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "LinkedHashMap inherits HashMap's null permissiveness while maintaining its position in the linked sequence."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "ترث LinkedHashMap قبول قيم ومفاتيح null من HashMap مع الاحتفاظ بموضعها المتسلسل في القائمة."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Java 21+ SequencedMap Navigation (firstEntry, lastEntry) (المثال 6: الوصول للأطراف في جافا 21 عبر SequencedMap)"
            },
            {
              type: "paragraph",
              text: "Using firstEntry(), lastEntry(), and pollFirstEntry() in modern Java."
            },
            {
              type: "code",
              language: "java",
              filename: "SequencedMapDemo.java",
              code: `import java.util.LinkedHashMap;
import java.util.Map;

public class SequencedMapDemo {
    public static void main(String[] args) {
        LinkedHashMap<String, Integer> milestones = new LinkedHashMap<>();
        milestones.put("Q1", 25);
        milestones.put("Q2", 50);
        milestones.put("Q3", 75);
        milestones.put("Q4", 100);

        // Direct inspection of endpoints
        Map.Entry<String, Integer> first = milestones.entrySet().iterator().next();
        Map.Entry<String, Integer> last = null;
        for (Map.Entry<String, Integer> e : milestones.entrySet()) last = e;

        System.out.println("First milestone: " + first.getKey() + " -> " + first.getValue());
        System.out.println("Last milestone:  " + last.getKey() + " -> " + last.getValue());
    }
}`,
              output: `First milestone: Q1 -> 25
Last milestone:  Q4 -> 100`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "Because entries form a linked list, accessing the head (first) or tail (last) is instantaneous."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "نظراً لأن العناصر تشكل قائمة مترابطة، فإن الوصول للرأس (الأول) أو الذيل (الأخير) يتم بشكل مباشر."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Safe Conditional Removal with Iterator (المثال 7: الحذف الآمن للمدخلات بالـ Iterator)"
            },
            {
              type: "paragraph",
              text: "Unlinking nodes safely while looping."
            },
            {
              type: "code",
              language: "java",
              filename: "LinkedMapIteratorRemovalDemo.java",
              code: `import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.Map;

public class LinkedMapIteratorRemovalDemo {
    public static void main(String[] args) {
        LinkedHashMap<String, Integer> inventory = new LinkedHashMap<>();
        inventory.put("Pen", 50);
        inventory.put("Notebook", 0);
        inventory.put("Eraser", 12);
        inventory.put("Ruler", 0);

        System.out.println("Initial inventory: " + inventory);

        // Remove out-of-stock items safely
        Iterator<Map.Entry<String, Integer>> it = inventory.entrySet().iterator();
        while (it.hasNext()) {
            if (it.next().getValue() == 0) {
                it.remove(); // Safely unlinks entry from doubly-linked list
            }
        }

        System.out.println("In-stock inventory: " + inventory);
    }
}`,
              output: `Initial inventory: {Pen=50, Notebook=0, Eraser=12, Ruler=0}
In-stock inventory: {Pen=50, Eraser=12}`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "it.remove() unlinks before and after pointers, preserving the integrity of remaining entries."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "تفصل it.remove مؤشرات العقدة المحذوفة وتصل ما قبلها بما بعدها محتفظة بسلامة القائمة."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Preserving Form Field Order in HTTP Form Handling (المثال 8: حفظ تسلسل حقول النماذج)"
            },
            {
              type: "paragraph",
              text: "Why LinkedHashMap is used in web frameworks to preserve form input sequence."
            },
            {
              type: "code",
              language: "java",
              filename: "FormSubmissionDemo.java",
              code: `import java.util.LinkedHashMap;
import java.util.Map;

public class FormSubmissionDemo {
    public static void main(String[] args) {
        // User filled form: First Name -> Last Name -> Email -> Password
        Map<String, String> formFields = new LinkedHashMap<>();
        formFields.put("first_name", "Sarah");
        formFields.put("last_name", "Connor");
        formFields.put("email", "sarah@cyberdyne.com");
        formFields.put("password", "T800_Shield");

        System.out.println("Processing Form in exact submission order:");
        formFields.forEach((field, val) -> {
            System.out.println(" - Validating: " + field);
        });
    }
}`,
              output: `Processing Form in exact submission order:
 - Validating: first_name
 - Validating: last_name
 - Validating: email
 - Validating: password`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "Web servers use LinkedHashMap for request headers and form fields to guarantee that data arrives in the exact order submitted by the client."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "تستخدم خوادم الويب LinkedHashMap لترويسات الطلبات ونماذج الإدخال لضمان معالجة الحقول بنفس ترتيب إرسال العميل."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Memory Footprint Overhead Analysis (المثال 9: تحليل الزيادة في استهلاك الذاكرة)"
            },
            {
              type: "paragraph",
              text: "Calculating the additional 8 bytes per entry on 64-bit JVMs."
            },
            {
              type: "code",
              language: "java",
              filename: "LinkedMapMemoryDemo.java",
              code: `public class LinkedMapMemoryDemo {
    public static void main(String[] args) {
        int entries = 200_000;

        // HashMap Node: 32 bytes
        // LinkedHashMap Entry (extends HashMap.Node): adds 'before' and 'after' references = 40 bytes (+8 bytes per entry)
        long hashMapBytes = entries * 32L;
        long linkedMapBytes = entries * 40L;

        System.out.printf("HashMap memory for %,d entries:       %,d bytes (~%.2f MB)%n",
                entries, hashMapBytes, hashMapBytes / (1024.0 * 1024.0));
        System.out.printf("LinkedHashMap memory for %,d entries: %,d bytes (~%.2f MB)%n",
                entries, linkedMapBytes, linkedMapBytes / (1024.0 * 1024.0));
        System.out.println("LinkedHashMap adds ~25% memory overhead to maintain the linked chain.");
    }
}`,
              output: `HashMap memory for 200,000 entries:       6,400,000 bytes (~6.10 MB)
LinkedHashMap memory for 200,000 entries: 8,000,000 bytes (~7.63 MB)
LinkedHashMap adds ~25% memory overhead to maintain the linked chain.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "Maintaining the doubly-linked list costs 8 bytes per entry, a modest price for deterministic ordering or LRU caching."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "تتطلب صيانة القائمة المزدوجة 8 بايت إضافية لكل عنصر؛ وهي تكلفة بسيطة مقابل ميزة الترتيب الثابت أو التخزين المؤقت LRU."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Transforming Map while Preserving Order (المثال 10: تحويل القيم مع المحافظة على الترتيب)"
            },
            {
              type: "paragraph",
              text: "Using Streams and Collectors.toMap with LinkedHashMap supplier."
            },
            {
              type: "code",
              language: "java",
              filename: "StreamPreserveOrderDemo.java",
              code: `import java.util.LinkedHashMap;
import java.util.Map;
import java.util.stream.Collectors;

public class StreamPreserveOrderDemo {
    public static void main(String[] args) {
        Map<String, Integer> raw = new LinkedHashMap<>();
        raw.put("one", 1);
        raw.put("two", 2);
        raw.put("three", 3);

        // Collect into a new LinkedHashMap to guarantee preserved order
        LinkedHashMap<String, Integer> doubled = raw.entrySet().stream()
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        e -> e.getValue() * 2,
                        (k1, k2) -> k1,
                        LinkedHashMap::new // Supplier specifies LinkedHashMap!
                ));

        System.out.println("Doubled map (Order preserved): " + doubled);
    }
}`,
              output: `Doubled map (Order preserved): {one=2, two=4, three=6}`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "Supplying LinkedHashMap::new in Collectors.toMap guarantees that transformed elements retain their original encounter order."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "تمرير LinkedHashMap::new لمجمع التدفق يضمن بقاء العناصر المحولة في نفس تسلسل ترتيبها الأصلي."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Thread-Safe LRU Cache Wrapper (المثال 11: جعل خزانة LRU آمنة في تعدد الخيوط)"
            },
            {
              type: "paragraph",
              text: "Synchronizing a LinkedHashMap LRU cache with Collections.synchronizedMap."
            },
            {
              type: "code",
              language: "java",
              filename: "SynchronizedLruDemo.java",
              code: `import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;

public class SynchronizedLruDemo {
    public static void main(String[] args) {
        // Wrap access-order LinkedHashMap in synchronized wrapper
        Map<String, String> syncLru = Collections.synchronizedMap(
            new LinkedHashMap<String, String>(10, 0.75f, true) {
                @Override
                protected boolean removeEldestEntry(Map.Entry<String, String> eldest) {
                    return size() > 2; // Keep at most 2 items
                }
            }
        );

        syncLru.put("A", "Alpha");
        syncLru.put("B", "Beta");
        syncLru.get("A"); // A becomes MRU
        syncLru.put("C", "Gamma"); // Evicts B

        System.out.println("Thread-safe LRU contents: " + syncLru);
    }
}`,
              output: `Thread-safe LRU contents: {A=Alpha, C=Gamma}`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "In access-order mode, even calling get() modifies the linked list. Thus, Collections.synchronizedMap is essential for multithreaded access."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "في نمط access-order حتى استدعاء get() يعدل القائمة المترابطة؛ لذا يلزم تغليفها بـ Collections.synchronizedMap عند تعدد الخيوط."
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
                "Mistake 1: Confusing LinkedHashMap with TreeMap. LinkedHashMap does NOT sort keys by value or natural order; it maintains insertion or access order.",
                "خطأ 1: الخلط بين LinkedHashMap و TreeMap؛ فالأولى لا ترتب المفاتيح تصاعدياً بل تحتفظ بترتيب الإدخال أو الوصول فقط.",
                "Mistake 2: Forgetting that in access-order mode, calling get(k) performs a structural modification. Iterating over the map while calling get() triggers ConcurrentModificationException!",
                "خطأ 2: نسيان أن get() تعدل هيكل القائمة في نمط access-order؛ فاستدعاؤها أثناء التكرار يرمي ConcurrentModificationException فوراً.",
                "Mistake 3: Using LinkedHashMap when order does not matter and memory is at a premium. Use HashMap to save 25% heap memory."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Database Query Result LRU Cache (التحدي العملي: خزانة نتائج استعلامات قواعد البيانات LRU)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Create a class 'QueryCache' bounded to 3 entries using LinkedHashMap with access-order. Implement: 1) 'fetchQuery(String sql)' simulating a slow query on cache miss, or returning cached result on hit; 2) 'printCacheStatus()'. Test in main() with repeated and new SQL queries, verifying eviction of the least recently used query."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: صمم فئة QueryCache تسع 3 استعلامات فقط كحد أقصى باستخدام LinkedHashMap بنمط access-order. نفّذ: 1) fetchQuery لجلب النتيجة من الخزانة إن وجدت، أو محاكاة الاستعلام وتخزينه إن لم توجد؛ 2) printCacheStatus لطباعة محتوى الخزانة. اختبرها في main وتأكد من حذف الاستعلام الأقدم استخداماً."
            },
            {
              type: "code",
              language: "java",
              filename: "QueryCacheChallenge.java",
              code: `import java.util.LinkedHashMap;
import java.util.Map;

public class QueryCacheChallenge {
    static class QueryCache {
        private final Map<String, String> cache;

        public QueryCache(int maxEntries) {
            this.cache = new LinkedHashMap<>(maxEntries + 1, 1.0f, true) {
                @Override
                protected boolean removeEldestEntry(Map.Entry<String, String> eldest) {
                    if (size() > maxEntries) {
                        System.out.println(" [CACHE FULL] Evicting LRU Query: [" + eldest.getKey() + "]");
                        return true;
                    }
                    return false;
                }
            };
        }

        public String fetchQuery(String sql) {
            if (cache.containsKey(sql)) {
                System.out.println(" [CACHE HIT]  Returning cached: " + sql);
                return cache.get(sql);
            }

            System.out.println(" [CACHE MISS] Executing DB query: " + sql);
            String result = "ResultSet_for(" + sql.hashCode() + ")";
            cache.put(sql, result);
            return result;
        }

        public void printCacheStatus() {
            System.out.println("Cache state (LRU -> MRU): " + cache.keySet());
        }
    }

    public static void main(String[] args) {
        QueryCache qc = new QueryCache(3);

        qc.fetchQuery("SELECT * FROM users");
        qc.fetchQuery("SELECT * FROM orders");
        qc.fetchQuery("SELECT * FROM products");
        qc.printCacheStatus();

        // Hit "users" -> moves it to MRU (tail)
        qc.fetchQuery("SELECT * FROM users");
        qc.printCacheStatus();

        // New query triggers eviction of oldest ("orders")
        qc.fetchQuery("SELECT * FROM payments");
        qc.printCacheStatus();
    }
}`,
              output: ` [CACHE MISS] Executing DB query: SELECT * FROM users
 [CACHE MISS] Executing DB query: SELECT * FROM orders
 [CACHE MISS] Executing DB query: SELECT * FROM products
Cache state (LRU -> MRU): [SELECT * FROM users, SELECT * FROM orders, SELECT * FROM products]
 [CACHE HIT]  Returning cached: SELECT * FROM users
Cache state (LRU -> MRU): [SELECT * FROM orders, SELECT * FROM products, SELECT * FROM users]
 [CACHE MISS] Executing DB query: SELECT * FROM payments
 [CACHE FULL] Evicting LRU Query: [SELECT * FROM orders]
Cache state (LRU -> MRU): [SELECT * FROM products, SELECT * FROM users, SELECT * FROM payments]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "Overriding removeEldestEntry() with access-order: true creates an automatic LRU cache. Cache hits refresh queries to the tail, evicting stale queries smoothly."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "إعادة كتابة removeEldestEntry مع تفعيل access-order يبني خزانة LRU تلقائية؛ فتجدد القراءة موضع الاستعلام ويُحذف القديم بسلاسة عند الامتلاء."
            }
          ],
          quiz: [
          {
                    "id": "linkedhashmap-q1",
                    "question": "How does LinkedHashMap maintain the order of its entries internally?",
                    "options": [
                              "It sorts keys using their natural Comparable ordering",
                              "It maintains an auxiliary ArrayList of all keys inside the map",
                              "Each entry extends HashMap.Node with before and after pointers, forming a doubly-linked list through all entries",
                              "It re-allocates a continuous array every time a new key is added"
                    ],
                    "correctIndex": 2,
                    "explanation": "LinkedHashMap defines an internal Entry<K,V> class that extends HashMap.Node<K,V> by adding 'Entry<K,V> before' and 'Entry<K,V> after' references. This maintains a running doubly-linked list across all entries while retaining hash-bucket lookups."
          },
          {
                    "id": "linkedhashmap-q2",
                    "question": "What is the default iteration order of a standard new LinkedHashMap<>() in Java?",
                    "options": [
                              "Access-order (least recently accessed first)",
                              "Insertion-order (the order in which keys were first inserted into the map)",
                              "Natural alphabetical/numerical order of keys",
                              "Non-deterministic hash-bucket order"
                    ],
                    "correctIndex": 1,
                    "explanation": "By default, LinkedHashMap maintains insertion-order. Entries are iterated in the exact sequence in which their keys were inserted into the map."
          },
          {
                    "id": "linkedhashmap-q3",
                    "question": "What happens to the position of an existing key in an insertion-order LinkedHashMap when map.put(key, newValue) is called?",
                    "options": [
                              "The entry is moved to the tail (end) of the doubly-linked list",
                              "The entry is moved to the head (beginning) of the list",
                              "The value is updated in place, but its position in the insertion order remains unchanged",
                              "An IllegalArgumentException is thrown because keys cannot be re-inserted"
                    ],
                    "correctIndex": 2,
                    "explanation": "In an insertion-ordered LinkedHashMap, updating the value of an already existing key (without first removing it) does NOT alter its position in the iteration order. The key retains its original insertion-order position."
          },
          {
                    "id": "linkedhashmap-q4",
                    "question": "How do you configure a LinkedHashMap to order entries by access order (LRU order)?",
                    "options": [
                              "Call map.setAccessOrder(true)",
                              "Use the constructor new LinkedHashMap<>(initialCapacity, loadFactor, true)",
                              "Wrap the map with Collections.synchronizedMap()",
                              "Implement the AccessOrdered interface on key classes"
                    ],
                    "correctIndex": 1,
                    "explanation": "LinkedHashMap provides a 3-argument constructor: LinkedHashMap(int initialCapacity, float loadFactor, boolean accessOrder). Passing 'true' for the accessOrder parameter causes any read or write access (such as get, put, replace) to move the accessed entry to the tail of the list."
          },
          {
                    "id": "linkedhashmap-q5",
                    "question": "Consider the following LRU cache implementation:\n\nMap<Integer, String> cache = new LinkedHashMap<>(4, 0.75f, true) {\n    @Override protected boolean removeEldestEntry(Map.Entry<Integer, String> eldest) {\n        return size() > 3;\n    }\n};\ncache.put(1, \"One\");\ncache.put(2, \"Two\");\ncache.put(3, \"Three\");\ncache.get(1);\ncache.put(4, \"Four\");\nSystem.out.println(cache.keySet());\n\nWhat is printed?",
                    "options": [
                              "[2, 3, 1, 4]",
                              "[3, 1, 4]",
                              "[2, 3, 4]",
                              "[1, 3, 4]"
                    ],
                    "correctIndex": 1,
                    "explanation": "1) Insert 1, 2, 3 -> order: [1, 2, 3]. 2) cache.get(1) accesses key 1, moving it to the tail -> order: [2, 3, 1]. 3) cache.put(4, \"Four\") appends 4 to the tail -> size becomes 4. Since size() > 3, removeEldestEntry returns true, evicting the eldest entry at the head, which is 2! Remaining keys in order: [3, 1, 4]."
          },
          {
                    "id": "linkedhashmap-q6",
                    "question": "When is the protected method removeEldestEntry() invoked by LinkedHashMap?",
                    "options": [
                              "Inside afterNodeInsertion() after a new entry is inserted by put() or putVal()",
                              "Every time get() or containsKey() is called",
                              "Only when the garbage collector runs low on heap memory",
                              "During table rehash when threshold is exceeded"
                    ],
                    "correctIndex": 0,
                    "explanation": "removeEldestEntry(eldest) is invoked by afterNodeInsertion(boolean evict), which is triggered immediately after put() or putVal() successfully adds a new node to the map. It allows the map to conditionally remove the eldest entry (the head node)."
          },
          {
                    "id": "linkedhashmap-q7",
                    "question": "How does the iteration time complexity of LinkedHashMap compare to HashMap?",
                    "options": [
                              "LinkedHashMap iteration takes O(capacity + size), while HashMap takes O(size)",
                              "LinkedHashMap iteration takes O(size) because it walks the doubly-linked list directly, regardless of bucket capacity",
                              "LinkedHashMap iteration takes O(n log n) because nodes must be sorted on the fly",
                              "Both have identical iteration performance regardless of table capacity"
                    ],
                    "correctIndex": 1,
                    "explanation": "HashMap iteration must scan through every bucket in the table array from 0 to capacity-1, taking O(capacity + size) time. LinkedHashMap simply traverses its 'head' to 'tail' doubly-linked list via 'after' pointers, visiting exactly O(size) elements and avoiding empty bucket scans."
          },
          {
                    "id": "linkedhashmap-q8",
                    "question": "What is the memory trade-off of LinkedHashMap compared to HashMap?",
                    "options": [
                              "LinkedHashMap uses less memory because it compresses unused table buckets",
                              "LinkedHashMap requires two additional pointer references (before, after) per entry, increasing memory consumption per node",
                              "LinkedHashMap stores keys and values in primitive arrays, saving memory",
                              "There is zero memory difference because the nodes are identical"
                    ],
                    "correctIndex": 1,
                    "explanation": "Every node in LinkedHashMap is an instance of LinkedHashMap.Entry, which adds two 4/8-byte object references ('before' and 'after') on top of HashMap.Node's 'hash', 'key', 'value', and 'next' fields. This makes each entry heavier on the Java heap."
          },
          {
                    "id": "linkedhashmap-q9",
                    "question": "In Java 21+, LinkedHashMap implements the SequencedMap interface. What do map.firstEntry() and map.lastEntry() return?",
                    "options": [
                              "The entries with the numerically lowest and highest keys",
                              "The oldest entry (head) and newest entry (tail) according to the map's defined encounter order, without removing them",
                              "They remove and return the extreme elements like a queue",
                              "They throw UnsupportedOperationException unless accessOrder is true"
                    ],
                    "correctIndex": 1,
                    "explanation": "In Java 21's SequencedMap, firstEntry() returns the first key-value mapping (at the head of the doubly-linked list) and lastEntry() returns the last mapping (at the tail), or null if the map is empty. They inspect the ends without removing entries."
          },
          {
                    "id": "linkedhashmap-q10",
                    "question": "What will be the output of calling reversed() on a LinkedHashMap in Java 21+?\n\nLinkedHashMap<String, Integer> map = new LinkedHashMap<>();\nmap.put(\"A\", 1);\nmap.put(\"B\", 2);\nmap.put(\"C\", 3);\nSequencedMap<String, Integer> rev = map.reversed();\nSystem.out.println(rev.keySet());",
                    "options": [
                              "[A, B, C]",
                              "[C, B, A]",
                              "Throws UnsupportedOperationException",
                              "[B, A, C]"
                    ],
                    "correctIndex": 1,
                    "explanation": "In Java 21, SequencedMap.reversed() provides a reverse-ordered live view of the map. Traversing rev.keySet() iterates from tail to head, printing [C, B, A]."
          },
          {
                    "id": "linkedhashmap-q11",
                    "question": "Why can calling map.get(key) on an access-ordered LinkedHashMap cause a ConcurrentModificationException if called during an enhanced for-loop over map.keySet()?",
                    "options": [
                              "get() creates a new thread in the background",
                              "In access-order mode, get() modifies the internal doubly-linked list pointers to move the node to the tail, which increments modCount as a structural modification",
                              "Enhanced for loops lock the map against any reads",
                              "get() invalidates the iterator's hash table pointer"
                    ],
                    "correctIndex": 1,
                    "explanation": "In access-order mode (accessOrder = true), even read operations like get() restructure the doubly-linked list by unlinking the node and appending it to the tail. This structural change increments modCount, causing any active fail-fast iterator to immediately throw ConcurrentModificationException."
          },
          {
                    "id": "linkedhashmap-q12",
                    "question": "What is the output of the following code?\n\nLinkedHashMap<String, Integer> map = new LinkedHashMap<>(16, 0.75f, true);\nmap.put(\"X\", 10);\nmap.put(\"Y\", 20);\nmap.put(\"Z\", 30);\nmap.get(\"X\");\nmap.put(\"Y\", 25);\nSystem.out.println(map.keySet());",
                    "options": [
                              "[Z, X, Y]",
                              "[X, Y, Z]",
                              "[Z, Y, X]",
                              "[X, Z, Y]"
                    ],
                    "correctIndex": 0,
                    "explanation": "Initial puts: [X, Y, Z]. map.get(\"X\") accesses \"X\", moving it to tail -> [Y, Z, X]. map.put(\"Y\", 25) accesses existing key \"Y\" and updates its value, moving \"Y\" to the tail -> [Z, X, Y]. KeySet order: [Z, X, Y]."
          },
          {
                    "id": "linkedhashmap-q13",
                    "question": "How do you make an access-ordered LinkedHashMap LRU cache thread-safe?",
                    "options": [
                              "LinkedHashMap is inherently thread-safe in access-order mode",
                              "Wrap it with Collections.synchronizedMap(map) and synchronize on the map instance when iterating",
                              "Use volatile references on the map variable",
                              "Replace it with standard ConcurrentSkipListMap"
                    ],
                    "correctIndex": 1,
                    "explanation": "Because get() and put() both perform structural mutations in access-ordered LinkedHashMap, all accesses must be synchronized. Wrapping with Collections.synchronizedMap(new LinkedHashMap<>(..., true)) and manually synchronizing on the map during iteration is the standard thread-safe wrapper pattern."
          },
          {
                    "id": "linkedhashmap-q14",
                    "question": "Which practical scenario specifically benefits from LinkedHashMap over HashMap?",
                    "options": [
                              "Finding keys with the minimum integer value in O(1) time",
                              "Preserving the original submission order of form fields or JSON attributes for deterministic serialization",
                              "Storing elements in strictly sorted alphabetical order",
                              "High-concurrency lock-free multi-threaded counters"
                    ],
                    "correctIndex": 1,
                    "explanation": "When serializing form submissions, HTTP request headers, or database rows where insertion order matters for presentation or testing predictability, LinkedHashMap guarantees that entrySet() preserves the exact arrival sequence."
          },
          {
                    "id": "linkedhashmap-q15",
                    "question": "Analyze the following code:\n\nLinkedHashMap<Integer, String> map = new LinkedHashMap<>();\nmap.put(1, \"A\");\nmap.put(2, \"B\");\nmap.put(3, \"C\");\nmap.remove(2);\nmap.put(2, \"Re-B\");\nSystem.out.println(map.keySet());",
                    "options": [
                              "[1, 2, 3]",
                              "[1, 3, 2]",
                              "[2, 1, 3]",
                              "[3, 2, 1]"
                    ],
                    "correctIndex": 1,
                    "explanation": "1) Initial insertions: 1, 2, 3 (order: [1, 2, 3]). 2) map.remove(2) unlinks node 2 completely (order: [1, 3]). 3) map.put(2, \"Re-B\") is a fresh insertion of key 2, so it is appended to the tail of the list! The resulting order is [1, 3, 2]."
          }
]
        }
      ]
    },

    /* ==========================================================================
       TOPIC 68: Java TreeMap
       ========================================================================== */
    {
      id: "java-treemap",
      title: "68. Java TreeMap",
      description: "Mastering Java TreeMap: self-balancing Red-Black Tree architecture, NavigableMap and SortedMap interfaces, O(log n) guarantees, natural vs custom Comparator key sorting, null key hostility, and rich range queries (subMap, headMap, tailMap, ceilingKey, floorKey).",
      lessons: [
        {
          id: "java-treemap-mastery",
          title: "Complete Guide to Java TreeMap",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "TreeMap Architecture: Red-Black Tree & NavigableMap (هندسة TreeMap: شجرة الأحمر والأسود والتنقل الشجري)"
            },
            {
              type: "paragraph",
              text: "Java's 'TreeMap' is a Red-Black Tree based implementation of the 'NavigableMap' (and 'SortedMap') interface. The map is sorted according to the natural ordering of its keys (implementing 'Comparable') or by a 'Comparator' provided at map creation time. Unlike HashMap, which hashes keys into buckets in O(1) time, TreeMap guarantees O(log n) time complexity for containsKey, get, put, and remove operations. TreeMap provides powerful navigation and range operations, such as firstKey(), lastKey(), ceilingKey(), floorKey(), higherKey(), lowerKey(), and windowed views like subMap(), headMap(), and tailMap()."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "تُعد فئة 'TreeMap' في جافا تطبيقاً لواجهة 'NavigableMap' (المشتقة من 'SortedMap')، وتعتمد داخلياً على شجرة بحث ثنائية متوازنة ذاتياً تُعرف بـ 'شجرة الأحمر والأسود' (Red-Black Tree). يتم ترتيب المفاتيح في TreeMap دائماً وبشكل تلقائي، إما وفقاً للترتيب الطبيعي للمفاتيح (عبر واجهة Comparable) أو عبر مقارن مخصص (Comparator). وخلافاً لـ HashMap التي تعتمد على التجزئة السريعة O(1)، تضمن TreeMap زمناً لوغاريتمياً O(log n) لعمليات البحث والإضافة والحذف، وتتفرد بدوال مذهلة للبحث في النطاقات والحدود مثل ceilingKey و floorKey و subMap."
            },
            {
              type: "paragraph",
              text: "Essential TreeMap Laws: 1) Key Comparison Equality: TreeMap uses compareTo() or compare() to test key equality—NOT equals()! If compare(k1, k2) == 0, keys are considered identical; 2) Null Key Hostility: Modern TreeMap throws NullPointerException if a null key is inserted (null values, however, are allowed); 3) Navigable Range Views: Range sub-maps are live, bidirectional views into the tree."
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
              text: "Example 1: Automatic Ascending Key Sorting (المثال 1: الترتيب التصاعدي التلقائي للمفاتيح)"
            },
            {
              type: "paragraph",
              text: "Inserting keys out of order and observing automatic sorted traversal."
            },
            {
              type: "code",
              language: "java",
              filename: "TreeMapNaturalOrderDemo.java",
              code: `import java.util.TreeMap;

public class TreeMapNaturalOrderDemo {
    public static void main(String[] args) {
        TreeMap<Integer, String> zipCodes = new TreeMap<>();

        // Add out of order
        zipCodes.put(90210, "Beverly Hills");
        zipCodes.put(10001, "New York");
        zipCodes.put(30301, "Atlanta");
        zipCodes.put(60601, "Chicago");

        System.out.println("TreeMap automatically sorted by Key: " + zipCodes);
        System.out.println("Lowest Key (firstKey):  " + zipCodes.firstKey());
        System.out.println("Highest Key (lastKey):  " + zipCodes.lastKey());
    }
}`,
              output: `TreeMap automatically sorted by Key: {10001=New York, 30301=Atlanta, 60601=Chicago, 90210=Beverly Hills}
Lowest Key (firstKey):  10001
Highest Key (lastKey):  90210`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "Keys are automatically sorted in natural ascending order upon insertion into the Red-Black Tree."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "تُرتب المفاتيح تصاعدياً بشكل تلقائي في شجرة البحث الثنائية بمجرد إدخالها."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Custom Key Comparator (Descending Order) (المثال 2: الترتيب التنازلي المخصص عبر Comparator)"
            },
            {
              type: "paragraph",
              text: "Passing Comparator.reverseOrder() to invert tree traversal."
            },
            {
              type: "code",
              language: "java",
              filename: "TreeMapDescendingDemo.java",
              code: `import java.util.Comparator;
import java.util.TreeMap;

public class TreeMapDescendingDemo {
    public static void main(String[] args) {
        // Construct with descending comparator
        TreeMap<String, Double> stockPrices = new TreeMap<>(Comparator.reverseOrder());

        stockPrices.put("AAPL", 185.50);
        stockPrices.put("GOOGL", 175.20);
        stockPrices.put("MSFT", 420.00);
        stockPrices.put("AMZN", 180.10);

        System.out.println("Descending sorted stocks: " + stockPrices);
        System.out.println("First entry: " + stockPrices.firstEntry());
    }
}`,
              output: `Descending sorted stocks: {MSFT=420.0, GOOGL=175.2, AAPL=185.5, AMZN=180.1}
First entry: MSFT=420.0`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "A custom Comparator in the constructor controls key branching and ordering within the tree."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "يتحكم المقارن المخصص في اتجاه تفرع الشجرة ويرتب المفاتيح تنازلياً."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Boundary Navigation (floorKey, ceilingKey, lowerKey, higherKey) (المثال 3: البحث التقريبي في المفاتيح)"
            },
            {
              type: "paragraph",
              text: "Finding closest keys matching boundary conditions in O(log n)."
            },
            {
              type: "code",
              language: "java",
              filename: "NavigableKeyBoundaryDemo.java",
              code: `import java.util.TreeMap;

public class NavigableKeyBoundaryDemo {
    public static void main(String[] args) {
        TreeMap<Integer, String> taxBrackets = new TreeMap<>();
        taxBrackets.put(10_000, "10% Rate");
        taxBrackets.put(40_000, "12% Rate");
        taxBrackets.put(85_000, "22% Rate");
        taxBrackets.put(160_000, "24% Rate");

        int salary = 75_000;

        // floorKey: greatest key <= 75,000
        Integer applicableBracket = taxBrackets.floorKey(salary);
        System.out.println("Salary $" + salary + " falls into bracket: " +
                applicableBracket + " -> " + taxBrackets.get(applicableBracket));

        // ceilingKey: least key >= 75,000
        Integer nextBracket = taxBrackets.ceilingKey(salary);
        System.out.println("Next higher bracket starts at: $" + nextBracket);
    }
}`,
              output: `Salary $75000 falls into bracket: 40000 -> 12% Rate
Next higher bracket starts at: $85000`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "floorKey(k) returns the greatest key less than or equal to k (<= k), perfect for range lookups like tax brackets."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "ترجع floorKey أكبر مفتاح أقل من أو يساوي القيمة المطلوبة؛ وهي مثالية لتطبيقات مثل شرائح الضرائب والخصومات."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Range Views (subMap, headMap, tailMap) (المثال 4: استقطاع النوافذ الشجرية عبر subMap)"
            },
            {
              type: "paragraph",
              text: "Creating live windowed maps over key ranges."
            },
            {
              type: "code",
              language: "java",
              filename: "TreeMapRangeViewsDemo.java",
              code: `import java.util.NavigableMap;
import java.util.TreeMap;

public class TreeMapRangeViewsDemo {
    public static void main(String[] args) {
        TreeMap<String, String> dictionary = new TreeMap<>();
        dictionary.put("apple", "A fruit");
        dictionary.put("banana", "Yellow fruit");
        dictionary.put("cherry", "Red fruit");
        dictionary.put("date", "Sweet fruit");
        dictionary.put("fig", "Fiber fruit");
        dictionary.put("grape", "Wine fruit");

        // subMap: words starting from "b" to "e" (exclusive)
        NavigableMap<String, String> bToE = dictionary.subMap("b", true, "e", false);
        System.out.println("Words ['b' to 'e'): " + bToE.keySet());

        // headMap: words strictly before "cherry"
        NavigableMap<String, String> beforeCherry = dictionary.headMap("cherry", false);
        System.out.println("Words before 'cherry': " + beforeCherry.keySet());
    }
}`,
              output: `Words ['b' to 'e'): [banana, cherry, date]
Words before 'cherry': [apple, banana]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "subMap() creates a live windowed view. Changes within range bounds reflect in the backing TreeMap."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "تنشئ subMap نافذة حية متصلة بالشجرة الأصلية، وتتيح فلترة الكلمات في نطاق محدد بسرعة فائقة."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Polling Extremes (pollFirstEntry & pollLastEntry) (المثال 5: سحب وحذف المفاتيح الطرفية)"
            },
            {
              type: "paragraph",
              text: "Retrieving and removing highest or lowest priority entries."
            },
            {
              type: "code",
              language: "java",
              filename: "TreeMapPollDemo.java",
              code: `import java.util.Map;
import java.util.TreeMap;

public class TreeMapPollDemo {
    public static void main(String[] args) {
        TreeMap<Integer, String> taskQueue = new TreeMap<>();
        taskQueue.put(1, "Fix Critical Security Bug");
        taskQueue.put(5, "Update Documentation");
        taskQueue.put(2, "Refactor Login Service");

        System.out.println("Queue: " + taskQueue);

        // pollFirstEntry removes and returns lowest key entry (highest priority)
        Map.Entry<Integer, String> topTask = taskQueue.pollFirstEntry();
        System.out.println("Processing Task #" + topTask.getKey() + ": " + topTask.getValue());

        System.out.println("Remaining queue: " + taskQueue);
    }
}`,
              output: `Queue: {1=Fix Critical Security Bug, 2=Refactor Login Service, 5=Update Documentation}
Processing Task #1: Fix Critical Security Bug
Remaining queue: {2=Refactor Login Service, 5=Update Documentation}`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "pollFirstEntry() retrieves and removes the lowest entry in O(log n) time, serving as a priority dispatcher."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "تسحب pollFirstEntry أصغر عنصر وتحذفه بزمن O(log n) الشجري ليعمل كموزع للمهام ذات الأولوية."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: The compareTo() Equality Trap on Keys (المثال 6: فخ مساواة المفاتيح عبر compareTo وليس equals)"
            },
            {
              type: "paragraph",
              text: "TreeMap ignores equals() and relies exclusively on compareTo() == 0."
            },
            {
              type: "code",
              language: "java",
              filename: "TreeMapKeyComparisonTrapDemo.java",
              code: `import java.util.TreeMap;

public class TreeMapKeyComparisonTrapDemo {
    static class Dimension implements Comparable<Dimension> {
        int width, height;
        Dimension(int w, int h) { this.width = w; this.height = h; }

        // BUGGY COMPARISON: only compares area (width * height)
        @Override
        public int compareTo(Dimension o) {
            return Integer.compare(this.width * this.height, o.width * o.height);
        }

        @Override
        public String toString() { return width + "x" + height; }
    }

    public static void main(String[] args) {
        TreeMap<Dimension, String> boxes = new TreeMap<>();

        Dimension d1 = new Dimension(2, 6); // Area = 12
        Dimension d2 = new Dimension(3, 4); // Area = 12, but DIFFERENT dimensions!

        boxes.put(d1, "Box Type Alpha");
        boxes.put(d2, "Box Type Beta"); // Overwrites d1 because compareTo returns 0!

        System.out.println("Boxes size: " + boxes.size());
        System.out.println("Boxes contents: " + boxes);
    }
}`,
              output: `Boxes size: 1
Boxes contents: {2x6=Box Type Beta}`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "Because d1 and d2 have the same area, compareTo() returned 0. TreeMap concluded the keys were identical and overwrote the value!"
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "نظراً لتساوي مساحة الصندوقين أرجعت compareTo القيمة 0، فاعتبرت TreeMap المفتاحين متطابقين واستبدلت القيمة!"
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Null Key Hostility in Modern TreeMap (المثال 7: رفض المفاتيح الفارغة null)"
            },
            {
              type: "paragraph",
              text: "TreeMap prohibits null keys, throwing NullPointerException."
            },
            {
              type: "code",
              language: "java",
              filename: "TreeMapNullHostilityDemo.java",
              code: `import java.util.TreeMap;

public class TreeMapNullHostilityDemo {
    public static void main(String[] args) {
        TreeMap<String, String> map = new TreeMap<>();
        map.put("valid_key", "valid_value");

        try {
            map.put(null, "some_value");
        } catch (NullPointerException e) {
            System.out.println("Caught NullPointerException!");
            System.out.println("TreeMap strictly forbids null keys because keys must be compared via compareTo().");
        }

        // Null VALUES are allowed!
        map.put("key_with_null_val", null);
        System.out.println("Contains null value? " + map.containsValue(null));
    }
}`,
              output: `Caught NullPointerException!
TreeMap strictly forbids null keys because keys must be compared via compareTo().
Contains null value? true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "TreeMap forbids null keys because null cannot be compared. However, null values are completely permitted."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "ترفض TreeMap المفاتيح الفارغة null لتعذر مقارنتها في الشجرة؛ ولكنها تسمح بالقيم الفارغة (null values) دون مشكلة."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Reversing View with descendingMap() (المثال 8: عكس الخريطة عبر descendingMap)"
            },
            {
              type: "paragraph",
              text: "Obtaining a live reverse-order view in O(1) time."
            },
            {
              type: "code",
              language: "java",
              filename: "DescendingMapDemo.java",
              code: `import java.util.NavigableMap;
import java.util.TreeMap;

public class DescendingMapDemo {
    public static void main(String[] args) {
        TreeMap<Integer, String> rankings = new TreeMap<>();
        rankings.put(1, "Gold");
        rankings.put(2, "Silver");
        rankings.put(3, "Bronze");

        // Live reverse view
        NavigableMap<Integer, String> reversed = rankings.descendingMap();

        System.out.println("Original Ascending:  " + rankings);
        System.out.println("Reversed Descending: " + reversed);

        // Mutations reflect in both views
        rankings.put(4, "Runner Up");
        System.out.println("Reversed after adding 4: " + reversed);
    }
}`,
              output: `Original Ascending:  {1=Gold, 2=Silver, 3=Bronze}
Reversed Descending: {3=Bronze, 2=Silver, 1=Gold}
Reversed after adding 4: {4=Runner Up, 3=Bronze, 2=Silver, 1=Gold}`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "descendingMap() is an O(1) live view that traverses the tree in reverse without duplicating nodes."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "توفر descendingMap منظوراً حياً معكوساً للشجرة بزمن O(1) دون مضاعفة العقد في الذاكرة."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Benchmark: TreeMap O(log n) vs HashMap O(1) (المثال 9: مقارنة الأداء بين TreeMap و HashMap)"
            },
            {
              type: "paragraph",
              text: "Demonstrating that HashMap is significantly faster when sorting is not required."
            },
            {
              type: "code",
              language: "java",
              filename: "TreeVsHashMapBenchmarkDemo.java",
              code: `import java.util.HashMap;
import java.util.TreeMap;

public class TreeVsHashMapBenchmarkDemo {
    public static void main(String[] args) {
        int count = 100_000;
        HashMap<Integer, Integer> hashMap = new HashMap<>(count * 2);
        TreeMap<Integer, Integer> treeMap = new TreeMap<>();

        // HashMap benchmark
        long startHash = System.currentTimeMillis();
        for (int i = 0; i < count; i++) hashMap.put(i, i);
        long timeHash = System.currentTimeMillis() - startHash;

        // TreeMap benchmark
        long startTree = System.currentTimeMillis();
        for (int i = 0; i < count; i++) treeMap.put(i, i);
        long timeTree = System.currentTimeMillis() - startTree;

        System.out.println("HashMap put time (O(1)):     " + timeHash + " ms");
        System.out.println("TreeMap put time (O(log n)): " + timeTree + " ms");
        System.out.println("HashMap is faster: " + (timeHash < timeTree));
    }
}`,
              output: `HashMap put time (O(1)):     14 ms
TreeMap put time (O(log n)): 58 ms
HashMap is faster: true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "HashMap's constant-time hash math outperforms TreeMap's logarithmic tree rebalancing by a factor of 3x to 5x."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "تتفوق HashMap بسرعة تفوق TreeMap بنحو 3 إلى 5 أضعاف لأن حسابات التجزئة أسرع من موازنة الشجرة الشاقة."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Case-Insensitive String Keys (المثال 10: مفاتيح نصية غير حساسة لحالة الأحرف)"
            },
            {
              type: "paragraph",
              text: "Supplying String.CASE_INSENSITIVE_ORDER to ignore casing in keys."
            },
            {
              type: "code",
              language: "java",
              filename: "CaseInsensitiveMapDemo.java",
              code: `import java.util.TreeMap;

public class CaseInsensitiveMapDemo {
    public static void main(String[] args) {
        TreeMap<String, String> headers = new TreeMap<>(String.CASE_INSENSITIVE_ORDER);

        headers.put("Content-Type", "application/json");
        headers.put("Authorization", "Bearer token_xyz");

        // Query with different casing
        System.out.println("Lookup 'content-type':  " + headers.get("content-type"));
        System.out.println("Lookup 'AUTHORIZATION': " + headers.get("AUTHORIZATION"));
        System.out.println("Contains 'Content-type'? " + headers.containsKey("Content-type"));
    }
}`,
              output: `Lookup 'content-type':  application/json
Lookup 'AUTHORIZATION': Bearer token_xyz
Contains 'Content-type'? true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "TreeMap allows case-insensitive string lookups simply by passing String.CASE_INSENSITIVE_ORDER to its constructor."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "تتيح TreeMap البحث في المفاتيح دون تحسس لحالة الأحرف بمجرد تمرير String.CASE_INSENSITIVE_ORDER للمنشئ."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Converting Map to Sorted View with TreeMap (المثال 11: فرز أي خريطة عادية عبر TreeMap)"
            },
            {
              type: "paragraph",
              text: "Sorting an existing HashMap by copying it into a TreeMap."
            },
            {
              type: "code",
              language: "java",
              filename: "SortHashMapViaTreeDemo.java",
              code: `import java.util.HashMap;
import java.util.Map;
import java.util.TreeMap;

public class SortHashMapViaTreeDemo {
    public static void main(String[] args) {
        Map<String, Integer> unsortedScores = new HashMap<>();
        unsortedScores.put("Zara", 90);
        unsortedScores.put("Alice", 95);
        unsortedScores.put("Mike", 85);
        unsortedScores.put("Bob", 88);

        System.out.println("Unsorted HashMap: " + unsortedScores);

        // Instant sort by key via TreeMap copy constructor
        TreeMap<String, Integer> sortedScores = new TreeMap<>(unsortedScores);

        System.out.println("Sorted by Key via TreeMap: " + sortedScores);
    }
}`,
              output: `Unsorted HashMap: {Mike=85, Bob=88, Zara=90, Alice=95}
Sorted by Key via TreeMap: {Alice=95, Bob=88, Mike=85, Zara=90}`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "Passing any Map to new TreeMap<>(map) automatically builds a sorted Red-Black Tree representation."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "تمرير أي خريطة للمنشئ new TreeMap<>(map) يرتب مفاتيحها تصاعدياً بشكل فوري."
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
                "Mistake 1: Attempting to insert a null key into a TreeMap. It throws a NullPointerException immediately.",
                "خطأ 1: محاولة إدخال مفتاح null في TreeMap؛ مما يرمي NullPointerException فوراً لتعذر مقارنته.",
                "Mistake 2: Storing keys that do not implement Comparable without providing an explicit Comparator in the constructor, causing ClassCastException at runtime.",
                "خطأ 2: استخدام مفاتيح لا تطبق واجهة Comparable دون تمرير Comparator؛ مما يسبب استثناء ClassCastException.",
                "Mistake 3: Creating a compareTo method that returns 0 for different keys. TreeMap will overwrite the entry because it treats keys with compareTo == 0 as duplicates!",
                "خطأ 3: كتابة compareTo تعيد 0 لمفاتيح مختلفة؛ فتقوم TreeMap باستبدال البيانات القديمة لاعتبار المفاتيح مكررة.",
                "Mistake 4: Using TreeMap when sorted order is unnecessary, incurring O(log n) overhead instead of O(1) HashMap performance."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Time-Series Stock Price Ticker Engine (التحدي العملي: محرك أسعار الأسهم بالسلاسل الزمنية)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Create a class 'TimeSeriesStockTicker' that stores stock prices indexed by UNIX millisecond timestamps using TreeMap. Implement: 1) 'recordPrice(long timestamp, double price)'; 2) 'getPriceAtOrBefore(long queryTime)'; 3) 'getPricesBetween(long start, long end)'. Test in main() with sample timestamps and verify historical lookups."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: صمم فئة TimeSeriesStockTicker لتسجيل أسعار الأسهم مفهرسة بالطابع الزمني بالمللي ثانية عبر TreeMap. نفّذ: 1) recordPrice لتسجيل السعر؛ 2) getPriceAtOrBefore لإيجاد أقرب سعر في أو قبل وقت معين عبر floorEntry؛ 3) getPricesBetween لجلب الأسعار في نطاق زمني عبر subMap. اختبرها في main واطبع النتائج."
            },
            {
              type: "code",
              language: "java",
              filename: "StockTickerChallenge.java",
              code: `import java.util.Map;
import java.util.NavigableMap;
import java.util.TreeMap;

public class StockTickerChallenge {
    static class TimeSeriesStockTicker {
        // Map: Timestamp -> Price
        private final TreeMap<Long, Double> ticks = new TreeMap<>();

        public void recordPrice(long timestamp, double price) {
            ticks.put(timestamp, price);
        }

        public Double getPriceAtOrBefore(long queryTime) {
            Map.Entry<Long, Double> entry = ticks.floorEntry(queryTime);
            return (entry != null) ? entry.getValue() : null;
        }

        public NavigableMap<Long, Double> getPricesBetween(long start, long end) {
            return ticks.subMap(start, true, end, true);
        }

        public void printAll() {
            System.out.println("Stock history ticks: " + ticks);
        }
    }

    public static void main(String[] args) {
        TimeSeriesStockTicker ticker = new TimeSeriesStockTicker();

        ticker.recordPrice(1000L, 150.25);
        ticker.recordPrice(2000L, 151.10);
        ticker.recordPrice(3000L, 149.80);
        ticker.recordPrice(5000L, 153.00);

        ticker.printAll();

        // Query price at timestamp 2500 (between 2000 and 3000)
        long query = 2500L;
        Double effectivePrice = ticker.getPriceAtOrBefore(query);
        System.out.println("Effective price at timestamp " + query + " (floor): $" + effectivePrice);

        // Window range query between 1500 and 3500
        System.out.println("Prices between 1500 and 3500: " + ticker.getPricesBetween(1500L, 3500L));
    }
}`,
              output: `Stock history ticks: {1000=150.25, 2000=151.1, 3000=149.8, 5000=153.0}
Effective price at timestamp 2500 (floor): $151.1
Prices between 1500 and 3500: {2000=151.1, 3000=149.8}`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "TreeMap.floorEntry() enables sub-microsecond point-in-time financial queries, and subMap() handles windowed range metrics cleanly in O(log n)."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "تتيح floorEntry استعلامات الأسعار في أي لحظة زمنية سابقة بدقة O(log n)، بينما توفر subMap تصفية السلاسل الزمنية في أي نافذة مطلوبة."
            }
          ],
          quiz: [
          {
                    "id": "treemap-q1",
                    "question": "What is the underlying data structure of Java's TreeMap, and what is the guaranteed time complexity for containsKey, get, put, and remove?",
                    "options": [
                              "Hash table with linked buckets; O(1) average time",
                              "Red-Black Tree (self-balancing binary search tree); guaranteed O(log n) time",
                              "B-Tree stored on disk; O(1) amortized time",
                              "Doubly linked list with skip pointers; O(n) worst-case time"
                    ],
                    "correctIndex": 1,
                    "explanation": "TreeMap is backed by a Red-Black Tree, a self-balancing binary search tree. Operations like containsKey, get, put, and remove are guaranteed to execute in O(log n) time, where n is the number of mappings."
          },
          {
                    "id": "treemap-q2",
                    "question": "What requirement must keys satisfy when added to a TreeMap initialized with its default parameterless constructor new TreeMap<>()?",
                    "options": [
                              "Keys must override equals() and hashCode()",
                              "Keys must implement the Comparable interface (supporting natural ordering) and be mutually comparable",
                              "Keys must be of type String or Integer",
                              "Keys must implement the Cloneable and Serializable interfaces"
                    ],
                    "correctIndex": 1,
                    "explanation": "The default constructor expects keys to implement Comparable<? super K> so it can establish natural ordering. If non-comparable keys are inserted, a ClassCastException is thrown upon insertion of the first or second key."
          },
          {
                    "id": "treemap-q3",
                    "question": "How does TreeMap determine whether two keys are equal and should replace one another?",
                    "options": [
                              "By calling key1.equals(key2)",
                              "By comparing key1.hashCode() == key2.hashCode()",
                              "By evaluating comparator.compare(key1, key2) == 0 (or key1.compareTo(key2) == 0), completely ignoring equals()",
                              "By checking key1 == key2 referential identity"
                    ],
                    "correctIndex": 2,
                    "explanation": "TreeMap enforces the NavigableMap contract: it determines equality strictly via its Comparator (or Comparable.compareTo()). If compare(k1, k2) == 0, TreeMap considers the keys identical and replaces the old value with the new value, even if k1.equals(k2) returns false."
          },
          {
                    "id": "treemap-q4",
                    "question": "Consider the following code:\n\nTreeMap<String, Integer> map = new TreeMap<>();\nmap.put(null, 100);\n\nWhat happens when this code is executed in Java 8 or later?",
                    "options": [
                              "It stores null in the root node with value 100",
                              "It places null in a special bucket outside the tree",
                              "It throws a NullPointerException because modern TreeMap does not permit null keys",
                              "It prints null and exits gracefully"
                    ],
                    "correctIndex": 2,
                    "explanation": "In modern Java (since Java 7/8), TreeMap strictly prohibits null keys. When attempting to compare a null key using natural ordering or standard comparators, it throws a NullPointerException immediately."
          },
          {
                    "id": "treemap-q5",
                    "question": "Given a TreeMap containing keys [10, 20, 30, 40, 50], what do lowerKey(30) and floorKey(30) return?",
                    "options": [
                              "lowerKey(30) returns 20; floorKey(30) returns 30",
                              "lowerKey(30) returns 30; floorKey(30) returns 20",
                              "Both return 20",
                              "Both return 30"
                    ],
                    "correctIndex": 0,
                    "explanation": "lowerKey(e) returns the greatest key strictly less than e (< e), which for 30 is 20. floorKey(e) returns the greatest key less than or equal to e (<= e), which for 30 is 30 itself."
          },
          {
                    "id": "treemap-q6",
                    "question": "Given a TreeMap containing keys [10, 20, 30, 40, 50], what do higherKey(30) and ceilingKey(30) return?",
                    "options": [
                              "Both return 40",
                              "higherKey(30) returns 40; ceilingKey(30) returns 30",
                              "higherKey(30) returns 30; ceilingKey(30) returns 40",
                              "Both return 30"
                    ],
                    "correctIndex": 1,
                    "explanation": "higherKey(e) returns the least key strictly greater than e (> e), which for 30 is 40. ceilingKey(e) returns the least key greater than or equal to e (>= e), which for 30 is 30."
          },
          {
                    "id": "treemap-q7",
                    "question": "What is the difference between map.firstKey() and map.firstEntry() on an empty TreeMap?",
                    "options": [
                              "Both return null",
                              "Both throw NoSuchElementException",
                              "map.firstKey() throws NoSuchElementException, while map.firstEntry() returns null",
                              "map.firstKey() returns null, while map.firstEntry() throws NoSuchElementException"
                    ],
                    "correctIndex": 2,
                    "explanation": "firstKey() and lastKey() come from SortedMap and throw NoSuchElementException when the map is empty. In contrast, firstEntry() and lastEntry() come from NavigableMap and return null when the map contains no mappings."
          },
          {
                    "id": "treemap-q8",
                    "question": "What do pollFirstEntry() and pollLastEntry() do on a TreeMap?",
                    "options": [
                              "They retrieve the extreme entries without removing them",
                              "They retrieve and remove the minimum and maximum key-value mappings respectively, returning null if the map is empty",
                              "They reverse the entire tree structure in place",
                              "They throw UnsupportedOperationException because TreeMap entries are immutable"
                    ],
                    "correctIndex": 1,
                    "explanation": "pollFirstEntry() removes and returns the mapping associated with the least key, and pollLastEntry() removes and returns the mapping associated with the greatest key. If the map is empty, both methods return null."
          },
          {
                    "id": "treemap-q9",
                    "question": "Consider this code:\n\nTreeMap<Integer, String> tree = new TreeMap<>();\ntree.put(10, \"A\"); tree.put(20, \"B\"); tree.put(30, \"C\"); tree.put(40, \"D\");\nMap<Integer, String> sub = tree.subMap(20, 40);\nsub.put(25, \"New\");\nSystem.out.println(tree.keySet() + \" | \" + sub.keySet());",
                    "options": [
                              "[10, 20, 25, 30, 40] | [20, 25, 30]",
                              "[10, 20, 30, 40] | [20, 25, 30]",
                              "Throws UnsupportedOperationException on sub.put()",
                              "[10, 20, 25, 30, 40] | [20, 25, 30, 40]"
                    ],
                    "correctIndex": 0,
                    "explanation": "subMap(from, to) is a backed, live view of the underlying tree covering [from, to) (inclusive of 20, exclusive of 40). Modifying sub by adding (25, \"New\") mutates the backing tree directly! Key 25 is within the subMap range [20, 40), so tree receives 25, and sub reflects it: tree keys are [10, 20, 25, 30, 40] and sub keys are [20, 25, 30]."
          },
          {
                    "id": "treemap-q10",
                    "question": "What happens if you attempt to insert a key outside the bounded range into a subMap view (e.g., sub.put(50, \"Out\") on subMap(20, 40))?",
                    "options": [
                              "The key is added to the backing map but hidden from the subMap view",
                              "An IllegalArgumentException is thrown immediately (key out of range)",
                              "The subMap view automatically expands its bounds to accommodate 50",
                              "The operation silently fails and returns null"
                    ],
                    "correctIndex": 1,
                    "explanation": "Sub-map views strictly enforce their range constraints. Calling sub.put(k, v) with a key k < fromKey or k >= toKey throws an IllegalArgumentException: key out of range."
          },
          {
                    "id": "treemap-q11",
                    "question": "What does treeMap.descendingMap() return?",
                    "options": [
                              "A newly allocated TreeMap with all entries copied in reverse order in O(n log n) time",
                              "A reverse-order NavigableMap view backed by the original map created in O(1) time without copying data",
                              "An unmodifiable collection of values",
                              "A synchronized wrapper around the tree"
                    ],
                    "correctIndex": 1,
                    "explanation": "descendingMap() returns a reverse-order NavigableMap view of the mappings. It is created in O(1) time because it merely reverses the direction of tree traversal algorithms without duplicating or copying tree nodes."
          },
          {
                    "id": "treemap-q12",
                    "question": "What is printed by the following code?\n\nTreeMap<String, Integer> map = new TreeMap<>(String.CASE_INSENSITIVE_ORDER);\nmap.put(\"apple\", 1);\nmap.put(\"APPLE\", 2);\nmap.put(\"Apple\", 3);\nSystem.out.println(map.size() + \" \" + map.get(\"apple\"));",
                    "options": [
                              "\"3 1\"",
                              "\"3 3\"",
                              "\"1 3\"",
                              "\"1 1\""
                    ],
                    "correctIndex": 2,
                    "explanation": "Using String.CASE_INSENSITIVE_ORDER, \"apple\".compareToIgnoreCase(\"APPLE\") == 0. Because TreeMap relies on the comparator to determine equality, all three strings are considered identical keys. Each subsequent put replaces the value of the single existing key. The size remains 1, and the value is 3."
          },
          {
                    "id": "treemap-q13",
                    "question": "What is the primary architectural trade-off between TreeMap and HashMap?",
                    "options": [
                              "TreeMap provides guaranteed O(1) operations but uses more memory than HashMap",
                              "HashMap offers O(1) average time complexity for lookups/inserts but no ordering; TreeMap provides O(log n) performance with sorted order and powerful boundary/range queries",
                              "TreeMap is synchronized and thread-safe, whereas HashMap is not",
                              "HashMap cannot store Strings as keys, whereas TreeMap can"
                    ],
                    "correctIndex": 1,
                    "explanation": "HashMap provides near-instantaneous O(1) average operations via hashing but provides zero guarantees on key order. TreeMap trades a minor performance factor (O(log n)) to maintain continuously sorted keys and allow rich range queries (subMap, floorKey, ceilingKey, pollFirstEntry)."
          },
          {
                    "id": "treemap-q14",
                    "question": "In a financial trading app, which TreeMap method would you use to find the most recent stock quote at or immediately before 10:30:00 AM?",
                    "options": [
                              "tree.lowerEntry(LocalTime.of(10, 30))",
                              "tree.floorEntry(LocalTime.of(10, 30))",
                              "tree.ceilingEntry(LocalTime.of(10, 30))",
                              "tree.higherEntry(LocalTime.of(10, 30))"
                    ],
                    "correctIndex": 1,
                    "explanation": "floorEntry(key) returns the key-value mapping associated with the greatest key less than or equal to the given key (<= 10:30:00), making it the exact choice for the most recent price at or before that moment."
          },
          {
                    "id": "treemap-q15",
                    "question": "What is the output of the following code?\n\nNavigableMap<Integer, String> map = new TreeMap<>();\nmap.put(1, \"A\"); map.put(3, \"C\"); map.put(5, \"E\"); map.put(7, \"G\");\nSystem.out.println(map.headMap(5, true).keySet() + \" \" + map.tailMap(5, false).keySet());",
                    "options": [
                              "[1, 3, 5] [7]",
                              "[1, 3] [5, 7]",
                              "[1, 3, 5] [5, 7]",
                              "[1, 3] [7]"
                    ],
                    "correctIndex": 0,
                    "explanation": "headMap(5, true) includes all keys <= 5, yielding [1, 3, 5]. tailMap(5, false) includes all keys strictly > 5 (excluding 5), yielding [7]. Output is \"[1, 3, 5] [7]\"."
          }
]
        }
      ]
    }
  ];
})();
