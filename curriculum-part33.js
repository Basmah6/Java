/**
 * Java Curriculum Module - Part 33
 * Topics:
 * 65. Java Map
 * 66. Java HashMap
 * 
 * 100% Offline, Pure JavaScript. Complete educational content with full bilingual (English & Arabic) explanations.
 */

(function () {
  'use strict';

  window.JAVA_TOPICS_PART33 = [
    /* ==========================================================================
       TOPIC 65: Java Map
       ========================================================================== */
    {
      id: "java-map",
      title: "65. Java Map",
      description: "Mastering the java.util.Map interface: Key-Value association semantics, why Map does NOT extend Collection, 3 collection views (keySet, values, entrySet), modern lambda operations (computeIfAbsent, merge, putIfAbsent), and Map.of immutable factories.",
      lessons: [
        {
          id: "java-map-mastery",
          title: "Complete Guide to Java Map Interface",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "The Key-Value Association Contract (عقد واجهة الخرائط واقتران المفتاح بالقيمة)"
            },
            {
              type: "paragraph",
              text: "The 'java.util.Map' interface models a mapping from unique keys to values. A map cannot contain duplicate keys; each key can map to at most one value. Crucially, Map does NOT inherit from the 'java.util.Collection' interface because a Map models pairs rather than singular elements. Instead, Map provides three distinct collection views: a Set of keys (keySet), a Collection of values (values), and a Set of key-value associations (entrySet). Java 8 and 9 introduced powerful functional methods like computeIfAbsent(), merge(), getOrDefault(), and immutable Map.of() factories."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "تمثل واجهة 'java.util.Map' جدول اقتران بين مفاتيح فريدة وقيم مرتبطة بها (Key-Value Pairs). لا يمكن للخريطة أن تحتوي على مفاتيح مكررة؛ فكل مفتاح يقترن بقيمة واحدة على الأكثر. ومن المهم جداً معرفة أن واجهة Map لا ترث من واجهة 'Collection' لأنها تمثل أزواجاً ثنائية وليس عناصر فردية. وبدلاً من ذلك، توفر Map ثلاثة مناظير تجميعية: مجموعة المفاتيح (keySet)، ومجموعة القيم (values)، ومجموعة الأزواج (entrySet). وزودت جافا الحديثة الخرائط بدوال وظيفية ثورية مثل computeIfAbsent و merge و getOrDefault والمجموعات الثابتة عبر Map.of."
            },
            {
              type: "paragraph",
              text: "Core Architectural Concepts: 1) Unique Keys: Keys are compared using equals(); 2) Replacement on Put: Calling put(existingKey, newValue) replaces the old value and returns it; 3) Collection Views: entrySet() is the most efficient mechanism for full map iteration; 4) Functional Methods: computeIfAbsent eliminates tedious null checks and manual cache-miss logic."
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
              text: "Example 1: Basic put(), get(), and getOrDefault() (المثال 1: العمليات الأساسية والإرجاع الافتراضي)"
            },
            {
              type: "paragraph",
              text: "Storing associations, updating values, and querying with fallback defaults."
            },
            {
              type: "code",
              language: "java",
              filename: "BasicMapOperationsDemo.java",
              code: `import java.util.HashMap;
import java.util.Map;

public class BasicMapOperationsDemo {
    public static void main(String[] args) {
        Map<String, Double> productPrices = new HashMap<>();

        // put returns previous value (or null if new)
        Double oldVal = productPrices.put("Laptop", 1200.00);
        productPrices.put("Mouse", 25.50);
        productPrices.put("Keyboard", 75.00);

        System.out.println("Previous value for 'Laptop': " + oldVal); // null

        // Overwrite Laptop price
        Double previousPrice = productPrices.put("Laptop", 1150.00);
        System.out.println("Replaced old price:           " + previousPrice);
        System.out.println("Current Laptop price:         " + productPrices.get("Laptop"));

        // getOrDefault returns default if key not found
        Double monitorPrice = productPrices.getOrDefault("Monitor", 0.00);
        System.out.println("Monitor price (with default): " + monitorPrice);
    }
}`,
              output: `Previous value for 'Laptop': null
Replaced old price:           1200.0
Current Laptop price:         1150.0
Monitor price (with default): 0.0`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "put(k, v) returns the old value that was replaced. getOrDefault() avoids null pointer hazards by providing a fallback value."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "تُرجع put القيمة السابقة التي تم استبدالها؛ بينما تجنبك getOrDefault أخطاء المؤشر الفارغ بتوفير قيمة احتياطية."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Iterating via 3 Collection Views (المثال 2: استعراض الخريطة عبر مناظيرها الثلاثة)"
            },
            {
              type: "paragraph",
              text: "Navigating keySet(), values(), and entrySet() (the recommended pattern)."
            },
            {
              type: "code",
              language: "java",
              filename: "MapCollectionViewsDemo.java",
              code: `import java.util.HashMap;
import java.util.Map;

public class MapCollectionViewsDemo {
    public static void main(String[] args) {
        Map<String, String> countryCapitals = new HashMap<>();
        countryCapitals.put("Saudi Arabia", "Riyadh");
        countryCapitals.put("Egypt", "Cairo");
        countryCapitals.put("Japan", "Tokyo");

        // 1. keySet view: iterate over keys
        System.out.println("--- All Keys (keySet) ---");
        for (String country : countryCapitals.keySet()) {
            System.out.println("Country: " + country);
        }

        // 2. values view: iterate over values
        System.out.println("--- All Values (values) ---");
        for (String capital : countryCapitals.values()) {
            System.out.println("Capital: " + capital);
        }

        // 3. entrySet view: BEST PRACTICE (access both key and value without second lookup)
        System.out.println("--- Key-Value Pairs (entrySet) ---");
        for (Map.Entry<String, String> entry : countryCapitals.entrySet()) {
            System.out.println(entry.getKey() + " -> " + entry.getValue());
        }
    }
}`,
              output: `--- All Keys (keySet) ---
Country: Egypt
Country: Saudi Arabia
Country: Japan
--- All Values (values) ---
Capital: Cairo
Capital: Riyadh
Capital: Tokyo
--- Key-Value Pairs (entrySet) ---
Egypt -> Cairo
Saudi Arabia -> Riyadh
Japan -> Tokyo`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "entrySet() avoids calling map.get(key) inside the loop, halving lookup overhead during full traversals."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "يُعتبر استخدام entrySet أفضل ممارسة لأنه يوفر المفتاح والقيمة معاً دون الحاجة لإعادة البحث المكلف بـ map.get داخل الحلقة."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Modern Immutable Maps with Map.of() (Java 9+) (المثال 3: الخرائط الثابتة عبر Map.of في جافا الحديثة)"
            },
            {
              type: "paragraph",
              text: "Creating unmodifiable key-value pairs up to 10 entries."
            },
            {
              type: "code",
              language: "java",
              filename: "ImmutableMapDemo.java",
              code: `import java.util.Map;

public class ImmutableMapDemo {
    public static void main(String[] args) {
        // Map.of supports up to 10 key-value pairs cleanly
        Map<String, Integer> httpCodes = Map.of(
            "OK", 200,
            "CREATED", 201,
            "BAD_REQUEST", 400,
            "NOT_FOUND", 404,
            "SERVER_ERROR", 500
        );

        System.out.println("HTTP Codes: " + httpCodes);

        // Attempting to modify throws UnsupportedOperationException
        try {
            httpCodes.put("FORBIDDEN", 403);
        } catch (UnsupportedOperationException e) {
            System.out.println("Mutation rejected: Map.of() is strictly unmodifiable!");
        }

        // Duplicate keys in Map.of throw IllegalArgumentException
        try {
            Map.of("K", 1, "K", 2);
        } catch (IllegalArgumentException e) {
            System.out.println("Duplicate keys in Map.of throw IllegalArgumentException!");
        }
    }
}`,
              output: `HTTP Codes: {OK=200, SERVER_ERROR=500, CREATED=201, BAD_REQUEST=400, NOT_FOUND=404}
Mutation rejected: Map.of() is strictly unmodifiable!
Duplicate keys in Map.of throw IllegalArgumentException!`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "Map.of() produces an immutable, space-efficient map that rejects nulls, rejects duplicate keys at creation, and prohibits mutation."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "تنتج Map.of خريطة ثابتة توفر الذاكرة، وترفض قيم null، وتمنع المفاتيح المكررة أثناء الإنشاء برمى استثناء فوري."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Map.ofEntries() for Large Immutable Maps (المثال 4: إنشاء خرائط ثابتة كبيرة عبر Map.ofEntries)"
            },
            {
              type: "paragraph",
              text: "Creating immutable maps with more than 10 entries using Map.entry()."
            },
            {
              type: "code",
              language: "java",
              filename: "MapOfEntriesDemo.java",
              code: `import java.util.Map;
import static java.util.Map.entry;

public class MapOfEntriesDemo {
    public static void main(String[] args) {
        // Varargs of entries supports arbitrary count
        Map<Integer, String> months = Map.ofEntries(
            entry(1, "Jan"), entry(2, "Feb"), entry(3, "Mar"),
            entry(4, "Apr"), entry(5, "May"), entry(6, "Jun"),
            entry(7, "Jul"), entry(8, "Aug"), entry(9, "Sep"),
            entry(10, "Oct"), entry(11, "Nov"), entry(12, "Dec")
        );

        System.out.println("Total months mapped: " + months.size());
        System.out.println("Month 7: " + months.get(7));
    }
}`,
              output: `Total months mapped: 12
Month 7: Jul`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "Map.ofEntries() accepts an arbitrary number of Map.Entry objects, bypassing the 10-entry parameter limit of Map.of()."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "تقبل Map.ofEntries أي عدد من الأزواج، مما يتجاوز حد العشرة عناصر الموجود في دالة Map.of العادية."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Safe Insertion with putIfAbsent() (المثال 5: الإضافة المشروطة بعدم الوجود عبر putIfAbsent)"
            },
            {
              type: "paragraph",
              text: "Inserting a value only if the key is missing or currently maps to null."
            },
            {
              type: "code",
              language: "java",
              filename: "PutIfAbsentDemo.java",
              code: `import java.util.HashMap;
import java.util.Map;

public class PutIfAbsentDemo {
    public static void main(String[] args) {
        Map<String, String> userPreferences = new HashMap<>();
        userPreferences.put("theme", "DARK");

        // 1. Existing key: value is NOT overwritten
        String existing = userPreferences.putIfAbsent("theme", "LIGHT");
        System.out.println("Returned existing value: " + existing);
        System.out.println("Theme is still:          " + userPreferences.get("theme"));

        // 2. Missing key: value IS inserted
        String missing = userPreferences.putIfAbsent("fontSize", "14px");
        System.out.println("Returned for missing key: " + missing); // null
        System.out.println("Font size set to:         " + userPreferences.get("fontSize"));
    }
}`,
              output: `Returned existing value: DARK
Theme is still:          DARK
Returned for missing key: null
Font size set to:         14px`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "putIfAbsent() avoids overwriting user configurations by checking presence atomically."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "تمنع putIfAbsent استبدال إعدادات المستخدم الموجودة مسبقاً وتضيف البيانات الجديدة فقط."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Grouping with computeIfAbsent() (المثال 6: التجميع وتفادي فحوصات null عبر computeIfAbsent)"
            },
            {
              type: "paragraph",
              text: "Building a one-to-many multimap (Map<Key, List<Value>>) cleanly."
            },
            {
              type: "code",
              language: "java",
              filename: "ComputeIfAbsentDemo.java",
              code: `import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ComputeIfAbsentDemo {
    public static void main(String[] args) {
        Map<String, List<String>> departmentStaff = new HashMap<>();

        // Helper method inside lambda automatically initializes new ArrayList if key is missing!
        departmentStaff.computeIfAbsent("Engineering", k -> new ArrayList<>()).add("Alice");
        departmentStaff.computeIfAbsent("Engineering", k -> new ArrayList<>()).add("Bob");
        departmentStaff.computeIfAbsent("Design",      k -> new ArrayList<>()).add("Charlie");
        departmentStaff.computeIfAbsent("Engineering", k -> new ArrayList<>()).add("David");

        System.out.println("Department Staff Directory:");
        departmentStaff.forEach((dept, staff) -> {
            System.out.println(" * " + dept + ": " + staff);
        });
    }
}`,
              output: `Department Staff Directory:
 * Engineering: [Alice, Bob, David]
 * Design: [Charlie]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "computeIfAbsent() computes and stores the value only if the key is not already present, eliminating boilerplate 'if (list == null)' checks."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "تُنشئ computeIfAbsent القائمة الجديدة وتخزنها فقط عند غياب المفتاح؛ مما يلغي الفحوصات التقليدية اليدوية تماماً."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Frequency Counting with merge() (المثال 7: حساب التكرارات باحترافية عبر merge)"
            },
            {
              type: "paragraph",
              text: "Counting word frequencies in text with a single merge statement."
            },
            {
              type: "code",
              language: "java",
              filename: "WordFrequencyMergeDemo.java",
              code: `import java.util.HashMap;
import java.util.Map;

public class WordFrequencyMergeDemo {
    public static void main(String[] args) {
        String[] words = {"java", "docker", "java", "spring", "docker", "java", "cloud"};
        Map<String, Integer> counts = new HashMap<>();

        for (String w : words) {
            // If missing, put 1. If present, add 1 to existing value: (oldVal, newVal) -> oldVal + newVal
            counts.merge(w, 1, Integer::sum);
        }

        System.out.println("Word Frequencies: " + counts);
        System.out.println("Count for 'java':   " + counts.get("java"));
        System.out.println("Count for 'docker': " + counts.get("docker"));
    }
}`,
              output: `Word Frequencies: {spring=1, java=3, cloud=1, docker=2}
Count for 'java':   3
Count for 'docker': 2`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "map.merge(key, 1, Integer::sum) is the idiomatic Java 8+ frequency counter: sets to 1 if absent, or combines with Integer::sum if present."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "تُعد دالة merge الطريقة المثالية في جافا الحديثة لحساب التكرارات: تضع 1 عند غياب الكلمة أو تزيد العداد عبر Integer::sum."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Transforming Values with replaceAll() (المثال 8: تعديل كافة القيم دفعة واحدة عبر replaceAll)"
            },
            {
              type: "paragraph",
              text: "Applying a lambda transformation to every value in the map."
            },
            {
              type: "code",
              language: "java",
              filename: "MapReplaceAllDemo.java",
              code: `import java.util.HashMap;
import java.util.Map;

public class MapReplaceAllDemo {
    public static void main(String[] args) {
        Map<String, Double> prices = new HashMap<>();
        prices.put("Item A", 100.0);
        prices.put("Item B", 250.0);
        prices.put("Item C", 50.0);

        System.out.println("Original Prices: " + prices);

        // Apply 10% discount to all prices using replaceAll
        prices.replaceAll((item, price) -> price * 0.90);

        System.out.println("Discounted (-10%): " + prices);
    }
}`,
              output: `Original Prices: {Item A=100.0, Item B=250.0, Item C=50.0}
Discounted (-10%): {Item A=90.0, Item B=225.0, Item C=45.0}`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "replaceAll() updates every entry's value in place using a BiFunction receiving (key, value)."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "تحدث replaceAll جميع القيم في مواضعها مباشرة بتطبيق دالة تستقبل المفتاح والقيمة معاً."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Conditional Removal with remove(key, value) (المثال 9: الحذف المشروط بمطابقة المفتاح والقيمة)"
            },
            {
              type: "paragraph",
              text: "Removing an entry only if both key AND value match."
            },
            {
              type: "code",
              language: "java",
              filename: "ConditionalRemovalDemo.java",
              code: `import java.util.HashMap;
import java.util.Map;

public class ConditionalRemovalDemo {
    public static void main(String[] args) {
        Map<String, String> locks = new HashMap<>();
        locks.put("Resource_1", "OWNER_A");

        // 1. Attempt remove with wrong owner (returns false, map untouched)
        boolean removedWrong = locks.remove("Resource_1", "OWNER_B");
        System.out.println("Removed by OWNER_B? " + removedWrong);

        // 2. Remove with matching owner (returns true, removed!)
        boolean removedCorrect = locks.remove("Resource_1", "OWNER_A");
        System.out.println("Removed by OWNER_A? " + removedCorrect);

        System.out.println("Locks state: " + locks);
    }
}`,
              output: `Removed by OWNER_B? false
Removed by OWNER_A? true
Locks state: {}`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "remove(key, value) acts as an optimistic concurrency guard, ensuring you only remove an entry if the value has not been changed by another process."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "تعمل remove(key, value) كصمام أمان يحذف العنصر فقط إذا كانت القيمة الحالية مطابقة للقيمة المتوقعة دون تغيير."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Filtering Maps with Stream API (المثال 10: تصفية الخرائط عبر Stream API)"
            },
            {
              type: "paragraph",
              text: "Filtering map entries by value using entrySet().stream()."
            },
            {
              type: "code",
              language: "java",
              filename: "StreamFilterMapDemo.java",
              code: `import java.util.Map;
import java.util.stream.Collectors;

public class StreamFilterMapDemo {
    public static void main(String[] args) {
        Map<String, Integer> examScores = Map.of(
            "Alice", 92,
            "Bob", 55,
            "Charlie", 88,
            "David", 48,
            "Eve", 95
        );

        // Filter for passing students (score >= 60)
        Map<String, Integer> passingStudents = examScores.entrySet().stream()
                .filter(e -> e.getValue() >= 60)
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));

        System.out.println("All Students:     " + examScores);
        System.out.println("Passing Students: " + passingStudents);
    }
}`,
              output: `All Students:     {David=48, Bob=55, Alice=92, Charlie=88, Eve=95}
Passing Students: {Alice=92, Charlie=88, Eve=95}`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "entrySet().stream().filter(...).collect(Collectors.toMap(...)) provides a functional pipeline for filtering maps."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "يوفر تدفق entrySet أسلوباً وظيفياً لتصفية الخريطة وإعادة تجميعها بسهولة."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Converting Map to JSON-like Key-Value String (المثال 11: تحويل الخريطة إلى نص منسق)"
            },
            {
              type: "paragraph",
              text: "Formatting a map into a readable formatted string."
            },
            {
              type: "code",
              language: "java",
              filename: "MapToStringFormatDemo.java",
              code: `import java.util.Map;
import java.util.stream.Collectors;

public class MapToStringFormatDemo {
    public static void main(String[] args) {
        Map<String, String> envConfig = Map.of(
            "PORT", "8080",
            "ENV", "production",
            "LOG_LEVEL", "INFO"
        );

        String formatted = envConfig.entrySet().stream()
                .map(e -> "  \"" + e.getKey() + "\": \"" + e.getValue() + "\"")
                .collect(Collectors.joining(",\\n", "{\\n", "\\n}"));

        System.out.println("Generated Config JSON-like Block:");
        System.out.println(formatted);
    }
}`,
              output: `Generated Config JSON-like Block:
{
  "LOG_LEVEL": "INFO",
  "ENV": "production",
  "PORT": "8080"
}`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "Using Collectors.joining with entrySet() stream converts map entries into clean structured text output."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "يحول Collectors.joining عبر تدفق entrySet أزواج الخريطة إلى نصوص مهيكلة واضحة كصيغة JSON."
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
                "Mistake 1: Iterating over keySet() and calling map.get(key) on every loop. This doubles lookup work. Always iterate over entrySet() when both key and value are needed.",
                "خطأ 1: التكرار على keySet() واستدعاء map.get(key) في كل دورة؛ مما يضاعف الجهد. استخدم دائماً entrySet() عند الحاجة للمفتاح والقيمة معاً.",
                "Mistake 2: Assuming Map extends Collection. Map is an independent root interface in java.util because it represents pairs rather than single elements.",
                "خطأ 2: الاعتقاد بأن Map ترث من Collection؛ هي واجهة مستقلة بذاتها لأنها تمثل أزواجاً وليس عناصر مفردة.",
                "Mistake 3: Passing null keys or null values to Map.of(), triggering a NullPointerException at runtime.",
                "خطأ 3: تمرير مفاتيح أو قيم null في Map.of()؛ مما يرمي NullPointerException فوراً لأن الخرائط الثابتة تمنع null تماماً.",
                "Mistake 4: Calling map.remove(key) inside a standard for-each loop, throwing ConcurrentModificationException. Use Iterator.remove() or map.entrySet().removeIf()."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: In-Memory Multi-Tenant Cache Engine (التحدي العملي: محرك التخزين المؤقت متعدد المشتركين)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Create a class 'MultiTenantCache' where each tenant (e.g. 'tenant_acme', 'tenant_beta') has their own Key-Value store. Implement: 1) 'put(String tenant, String key, String value)'; 2) 'get(String tenant, String key)'; 3) 'getStats()' returning a Map of tenant to count of cached keys. Use Map methods (computeIfAbsent, getOrDefault). Test in main()."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: صمم فئة MultiTenantCache تدير خزائن مؤقتة منفصلة لكل مشترك (Tenant). نفّذ: 1) put لتخزين القيمة في خزانة المشترك عبر computeIfAbsent؛ 2) get لاسترجاع القيمة؛ 3) getStats لإرجاع خريطة بعدد المفاتيح المخزنة لكل مشترك. اختبرها في main واطبع النتائج."
            },
            {
              type: "code",
              language: "java",
              filename: "MultiTenantCacheChallenge.java",
              code: `import java.util.HashMap;
import java.util.Map;

public class MultiTenantCacheChallenge {
    static class MultiTenantCache {
        // Nested Map: TenantId -> (Key -> Value)
        private final Map<String, Map<String, String>> store = new HashMap<>();

        public void put(String tenantId, String key, String value) {
            store.computeIfAbsent(tenantId, t -> new HashMap<>()).put(key, value);
        }

        public String get(String tenantId, String key) {
            Map<String, String> tenantStore = store.get(tenantId);
            return (tenantStore != null) ? tenantStore.get(key) : null;
        }

        public Map<String, Integer> getStats() {
            Map<String, Integer> stats = new HashMap<>();
            store.forEach((tenant, data) -> stats.put(tenant, data.size()));
            return stats;
        }
    }

    public static void main(String[] args) {
        MultiTenantCache cache = new MultiTenantCache();

        cache.put("tenant_acme", "session_token", "xyz-99");
        cache.put("tenant_acme", "theme", "DARK");
        cache.put("tenant_beta", "api_rate_limit", "1000");

        System.out.println("ACME Session:    " + cache.get("tenant_acme", "session_token"));
        System.out.println("Beta Rate Limit: " + cache.get("tenant_beta", "api_rate_limit"));
        System.out.println("Non-existent:    " + cache.get("tenant_gamma", "missing"));

        System.out.println("Tenant Key Count Stats: " + cache.getStats());
    }
}`,
              output: `ACME Session:    xyz-99
Beta Rate Limit: 1000
Non-existent:    null
Tenant Key Count Stats: {tenant_beta=1, tenant_acme=2}`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "The nested Map isolates data per tenant. computeIfAbsent initializes the inner HashMap lazily, ensuring clean separation and thread-friendly extension."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "تعزل الخريطة المتداخلة بيانات كل مشترك باستقلالية؛ وتنشئ computeIfAbsent الخريطة الداخلية عند أول استخدام فقط بكفاءة تامة."
            }
          ],
          quiz: [
          {
                    "id": "q1",
                    "question": "Why does java.util.Map NOT extend java.util.Collection or java.lang.Iterable in the Java Collections Framework? (لماذا لا ترث واجهة Map واجهة Collection أو Iterable في جافا؟)",
                    "options": [
                              "Because Map was introduced before Collection in Java 1.0.",
                              "Because Collection represents a container of individual elements, whereas Map models a key-value mapping abstraction with two distinct types (K and V); fitting key-value pairs into single-element Collection methods would violate the Interface Segregation Principle.",
                              "Because Maps can only store primitive types.",
                              "Because Maps are executed natively in C++."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Collections represent groups of individual elements, while a Map models a mathematical mapping from unique keys to values. Forcing Map into Collection would introduce semantic mismatches (e.g., what would map.add(x) or map.contains(x) mean?). (تمثل Collection حاويات لعناصر فردية بينما Map اقتران بين مفتاح وقيمة، ودمجهما ينتهك مبادئ التصميم ويثير غموضاً في معنى الدوال كـ add و contains)."
          },
          {
                    "id": "q2",
                    "question": "What is the return value of map.put(key, value) when a mapping for that key already exists? (ما هي القيمة المرجعة لدالة map.put إذا كان المفتاح موجوداً مسبقاً في الخريطة؟)",
                    "options": [
                              "It throws a DuplicateKeyException.",
                              "It replaces the old value with the new value, and returns the previous value that was associated with the key (or null if there was no prior mapping).",
                              "It returns true.",
                              "It leaves the old value unchanged and returns the new value."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! put(key, value) associates the specified value with the key. If the map previously contained a mapping for the key, the old value is replaced and returned by the method. (تقوم put باستبدال القيمة القديمة بالقيمة الجديدة وتُرجع القيمة السابقة التي كانت مرتبطة بذلك المفتاح)."
          },
          {
                    "id": "q3",
                    "question": "What are the three Collection Views provided by java.util.Map? (ما هي المناظير الثلاثة Collection Views التي توفرها واجهة Map؟)",
                    "options": [
                              "keys(), values(), items()",
                              "keySet() (Set<K>), values() (Collection<V>), and entrySet() (Set<Map.Entry<K, V>>)",
                              "getKeyList(), getValueList(), getEntryList()",
                              "first(), middle(), last()"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Map provides three collection views: keySet() returning a Set of keys, values() returning a Collection of values, and entrySet() returning a Set of key-value pairs (Map.Entry). (توفر Map ثلاثة مناظير: مجموعة المفاتيح keySet، ومجموعة القيم values، ومجموعة الأزواج entrySet)."
          },
          {
                    "id": "q4",
                    "question": "What happens if you remove an element from map.keySet(), like this:\nmap.keySet().remove(\"user_123\");\n(ماذا يحدث عند حذف مفتاح من واجهة map.keySet()؟)",
                    "options": [
                              "An UnsupportedOperationException is thrown.",
                              "The key-value entry corresponding to \"user_123\" is removed directly from the backing Map!",
                              "Only the key is removed; the value remains floating in the map.",
                              "Nothing happens because keySet is an unmodifiable snapshot."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! The collection views (keySet, values, entrySet) are backed by the map, so changes to the map are reflected in the collection view, and vice-versa. Removing a key from keySet removes the entire key-value mapping from the underlying map. (مناظير المجموعات مرتبطة بالخريطة الأصلية مباشرة، وحذف المفتاح من keySet يحذف الزوج بالكامل من الخريطة الأصلية)."
          },
          {
                    "id": "q5",
                    "question": "Can you add new elements directly to map.keySet(), such as map.keySet().add(\"new_key\")? (هل يمكنك إضافة عناصر جديدة مباشرة لمجموعة المفاتيح map.keySet()؟)",
                    "options": [
                              "Yes, and the value defaults to null.",
                              "No, keySet does NOT support add() or addAll(); doing so throws an UnsupportedOperationException because a key cannot be added without a corresponding value.",
                              "Yes, and the value defaults to an empty String.",
                              "Only in ConcurrentHashMap."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! keySet supports element removal (which removes the mapping from the map), but does NOT support add or addAll operations because it cannot know what value should be paired with the newly added key. (تدعم keySet الحذف ولكنها ترفض عمليات الإضافة add وترمي UnsupportedOperationException لعدم وجود قيمة مقترنة بالمفتاح)."
          },
          {
                    "id": "q6",
                    "question": "How do modern immutable maps created via Map.of(\"k1\", \"v1\", \"k2\", \"v2\") (Java 9+) handle null keys or values? (كيف تتعامل الخرائط الثابتة المنشأة بـ Map.of في جافا 9+ مع قيم null؟)",
                    "options": [
                              "null keys are permitted, but null values are rejected.",
                              "They reject both null keys and null values, throwing a NullPointerException immediately.",
                              "null is converted to an empty string.",
                              "They allow up to one null entry."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! The factory methods Map.of() and Map.ofEntries() disallow null keys and null values. Attempting to create them with null throws NullPointerException. They also throw IllegalArgumentException if duplicate keys are passed. (ترفض دوال Map.of أي مفاتيح أو قيم فارغة null وترمي NullPointerException فوراً، كما ترفض المفاتيح المكررة)."
          },
          {
                    "id": "q7",
                    "question": "What is the return value of map.putIfAbsent(key, value)? (ما هي القيمة المرجعة لدالة map.putIfAbsent(key, value)؟)",
                    "options": [
                              "A boolean indicating whether the value was inserted.",
                              "The current (existing) value associated with the key, or null if there was no mapping for the key (or if it was mapped to null).",
                              "The newly inserted value in all cases.",
                              "Throws an exception if the key is already present."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! If the key is not already associated with a value (or is mapped to null), putIfAbsent associates it with the given value and returns null. If already present, it returns the existing value without modifying the map. (إذا كان المفتاح غير موجود تُدرج القيمة وتُرجع null، أما إذا كان موجوداً فتُرجع القيمة الحالية دون تعديل الخريطة)."
          },
          {
                    "id": "q8",
                    "question": "How does computeIfAbsent() streamline multi-value map grouping (Map<String, List<String>>)? (كيف تبسط دالة computeIfAbsent تجميع العناصر في قوائم داخل الخريطة؟)",
                    "options": [
                              "It sorts the list automatically.",
                              "map.computeIfAbsent(department, k -> new ArrayList<>()).add(employee);\nIt computes and inserts a new ArrayList only if the key is not present, and returns the existing or newly created list directly.",
                              "It converts the map to a multi-threaded database.",
                              "It eliminates the need for an employee object."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! computeIfAbsent eliminates cumbersome boilerplate 'if (!map.containsKey(k)) map.put(k, new ArrayList<>());'. The mapping function is lazily evaluated only when the key is absent, returning the list ready for appending. (تلغي computeIfAbsent الفحوصات اليدوية، حيث تنشئ القائمة الجديدة وتضيفها للخريطة تلقائياً وفقط عند غياب المفتاح وتُرجعها للإضافة المباشرة)."
          },
          {
                    "id": "q9",
                    "question": "What is the most idiomatic, modern way to tally word frequencies in a Map<String, Integer> using Java 8? (ما هي الطريقة الأحدث والأنسب لحساب تكرارات الكلمات في الخريطة في جافا 8؟)",
                    "options": [
                              "map.put(word, map.get(word) + 1);",
                              "map.merge(word, 1, Integer::sum);",
                              "map.compute(word, (k, v) -> v++);",
                              "map.count(word);"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! map.merge(word, 1, Integer::sum) checks if the key exists: if not, it sets the value to 1; if it exists, it applies Integer::sum to the old value and 1. It is thread-friendly and handles missing keys seamlessly. (دالة merge تضع 1 إذا لم تكن الكلمة موجودة، أو تطبق دالة الجمع Integer::sum لزيادة العداد بـ 1 في سطر واحد أنيق وآمن)."
          },
          {
                    "id": "q10",
                    "question": "What does map.getOrDefault(key, defaultValue) do if the key is NOT present in the map? (ما الذي تفعله getOrDefault إذا لم يكن المفتاح موجوداً في الخريطة؟)",
                    "options": [
                              "It inserts the defaultValue into the map under that key and returns it.",
                              "It returns defaultValue without modifying or inserting the key into the map.",
                              "It throws a NoSuchElementException.",
                              "It returns null."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! getOrDefault returns the value to which the specified key is mapped, or defaultValue if this map contains no mapping for the key. Crucially, it does NOT insert the key or defaultValue into the map. (تُرجع الدالة القيمة الافتراضية المحددة دون تعديل الخريطة أو إدراج المفتاح فيها)."
          },
          {
                    "id": "q11",
                    "question": "What is the effect of calling map.remove(key, value) with two arguments? (ما هو تأثير استدعاء دالة map.remove(key, value) بمعاملين اثنين؟)",
                    "options": [
                              "It removes both the key from the map and sets the value to null.",
                              "It removes the entry for the specified key ONLY if it is currently mapped to the exact specified value, returning true if removed and false otherwise.",
                              "It removes all keys that contain that value.",
                              "It is identical to map.remove(key)."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! remove(key, value) is a conditional atomic removal method introduced in Java 8. It removes the entry for a key only if currently mapped to a given value, which prevents concurrency bugs when removing stale cache entries. (تقوم الدالة بحذف الزوج فقط إذا كان المفتاح مرتبطاً بالقيمة المحددة تحديداً، وتُرجع true عند نجاح الحذف و false خلاف ذلك)."
          },
          {
                    "id": "q12",
                    "question": "What is printed by the following code?\nMap<String, Integer> map = new HashMap<>();\nmap.put(\"A\", 10);\nmap.put(\"B\", 20);\nmap.replaceAll((k, v) -> v * 2);\nSystem.out.println(map.get(\"A\") + \" \" + map.get(\"B\"));\n(ما الذي يطبعه هذا الكود؟)",
                    "options": [
                              "10 20",
                              "20 40",
                              "Throws an UnsupportedOperationException",
                              "null null"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! replaceAll(BiFunction) replaces each entry's value with the result of invoking the given function on that entry until all entries have been processed. 10 becomes 20, and 20 becomes 40. (تقوم replaceAll بتحديث كافة قيم الخريطة بتطبيق الدالة المحددة عليها فيتضاعف 10 إلى 20 و 20 إلى 40)."
          },
          {
                    "id": "q13",
                    "question": "How do you correctly iterate through all key-value pairs of a Map in a single loop? (كيف تمر على كافة أزواج المفاتيح والقيم في حلقة تكرار واحدة بكفاءة؟)",
                    "options": [
                              "for (String k : map.keySet()) { Integer v = map.get(k); } // inefficient secondary lookup",
                              "for (Map.Entry<String, Integer> entry : map.entrySet()) {\n    String k = entry.getKey();\n    Integer v = entry.getValue();\n}",
                              "for (int i=0; i<map.size(); i++) { map.get(i); }",
                              "map.forEachLoop();"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Iterating over map.entrySet() accesses both key and value directly in a single traversal pass. In contrast, looping over keySet() and repeatedly calling map.get(k) forces an unnecessary and expensive O(1) hash table lookup for every single key. (المرور عبر entrySet يجلب المفتاح والقيمة معاً بدفعة واحدة، بينما التكرار على keySet واستدعاء get(k) يكرر عملية البحث بالتجزئة بلا داعٍ)."
          },
          {
                    "id": "q14",
                    "question": "Can a java.util.HashMap have duplicate values? (هل يمكن لخريطة HashMap أن تحتوي على قيم مكررة؟)",
                    "options": [
                              "No, both keys and values must be strictly unique.",
                              "Yes, values may be duplicated across multiple distinct keys (e.g., \"Alice\"->30 and \"Bob\"->30).",
                              "Only if the values are null.",
                              "Only up to 2 duplicates."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Keys in a Map must be unique, but multiple different keys are completely free to map to identical values. (المفاتيح يجب أن تكون فريدة، أما القيم فيمكن تكرارها وربطها بعدة مفاتيح مختلفة دون أي مانع)."
          },
          {
                    "id": "q15",
                    "question": "What happens when using computeIfPresent(key, remappingFunction) if the remapping function returns null? (ماذا يحدث عند استخدام computeIfPresent إذا أرجعت دالة المعالجة القيمة null؟)",
                    "options": [
                              "The key is assigned null as its value.",
                              "The key-value mapping is completely removed from the map!",
                              "A NullPointerException is thrown.",
                              "The old value is preserved."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! By contract in computeIfPresent, if the function returns null, the mapping is removed from the map (equivalent to map.remove(key)). If the function returns a non-null value, the mapping is updated. (حسب العقد البرمجي لـ computeIfPresent، إذا أرجعت الدالة null يتم حذف الزوج بالكامل من الخريطة كأنه تم استدعاء remove)."
          }
]
        }
      ]
    },

    /* ==========================================================================
       TOPIC 66: Java HashMap
       ========================================================================== */
    {
      id: "java-hashmap",
      title: "66. Java HashMap",
      description: "Deep technical exploration of Java HashMap: bucket array (Node<K,V>[]), bitwise index calculation ((n - 1) & hash), Java 8+ treeification (TREEIFY_THRESHOLD = 8, Red-Black Tree TreeNode), load factor (0.75), capacity doubling, equals() & hashCode() contract, and mutable key dangers.",
      lessons: [
        {
          id: "java-hashmap-mastery",
          title: "Complete Guide to Java HashMap",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "HashMap Internals: Buckets, Treeification & Hash Math (هندسة HashMap الداخلية: الخلايا، التشجير وحسابات التجزئة)"
            },
            {
              type: "paragraph",
              text: "Java's 'HashMap' is the cornerstone data structure of modern Java applications. Internally, it is backed by an array of buckets ('Node<K, V>[] table'). When a key-value pair is inserted, HashMap calculates the key's hash code, applies a secondary bit-spread mutation ('(h = key.hashCode()) ^ (h >>> 16)'), and determines the bucket index via bitwise AND: 'index = (table.length - 1) & hash'. In Java 8+, if a single bucket suffers heavy hash collisions and accumulates 8 or more entries (TREEIFY_THRESHOLD = 8) and total table capacity is at least 64, that bucket is automatically converted from a singly-linked list into a balanced Red-Black Tree ('TreeNode'). This guarantees that worst-case lookup time improves from O(n) to O(log n), neutralizing denial-of-service hash collision attacks."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "تُعد فئة 'HashMap' حجر الأساس لهياكل البيانات في جافا. تعتمد داخلياً على مصفوفة خلايا (Buckets Array). وعند إضافة أي عنصر، تحسب جافا قيمة hashCode للمفتاح وتطبق عليها خلطاً بتياً، ثم تحدد رقم الخلية بالمعادلة البتية السريعة: 'index = (length - 1) & hash'. وبدءاً من جافا 8، أُضيفت ميزة هندسية عبقرية: إذا تراكمت التصادمات في خلية واحدة وبلغت 8 عناصر أو أكثر مع وصول سعة الجدول لـ 64، تتحول تلك الخلية تلقائياً من قائمة أحادية إلى 'شجرة أحمر وأسود' متوازنة (TreeNode). هذا التحول يضمن تحسن الأداء في أسوأ الحالات من O(n) إلى O(log n)، مما يحمي التطبيق من هجمات التعطيل عبر التصادم المتعمد."
            },
            {
              type: "paragraph",
              text: "Critical Architecture Metrics: 1) Default Capacity: 16 (always a power of two to allow (n-1) & hash bitmasking); 2) Load Factor: 0.75 (threshold = 12); 3) Rehashing: When size > threshold, capacity doubles to 32, and all nodes are redistributed; 4) Null Support: Allows exactly one null key (stored at index 0) and any number of null values."
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
              text: "Example 1: Basic Put/Get & The Single Null Key (المثال 1: التخزين وقبول مفتاح null واحد فقط)"
            },
            {
              type: "paragraph",
              text: "Demonstrating O(1) retrieval and null key placement."
            },
            {
              type: "code",
              language: "java",
              filename: "BasicHashMapDemo.java",
              code: `import java.util.HashMap;

public class BasicHashMapDemo {
    public static void main(String[] args) {
        HashMap<String, String> userSessions = new HashMap<>();

        userSessions.put("user_101", "Session_Alpha");
        userSessions.put("user_102", "Session_Beta");

        // HashMap allows exactly one NULL key (mapped to bucket index 0)
        userSessions.put(null, "Guest_Session");

        System.out.println("Session for user_101: " + userSessions.get("user_101"));
        System.out.println("Session for null key: " + userSessions.get(null));
        System.out.println("Total mapped sessions: " + userSessions.size());

        // Overwriting null key
        userSessions.put(null, "Updated_Guest");
        System.out.println("Overwritten null key:  " + userSessions.get(null));
    }
}`,
              output: `Session for user_101: Session_Alpha
Session for null key: Guest_Session
Total mapped sessions: 3
Overwritten null key:  Updated_Guest`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "HashMap permits one null key by mapping its hash directly to 0, placing it in table[0]."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "تسمح HashMap بمفتاح null واحد فقط وتجعل قيمة التجزئة له 0 وتضعه في الخلية الأولى table[0]."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Overriding equals() and hashCode() Correctly on Keys (المثال 2: التطبيق الدقيق لـ equals و hashCode على المفاتيح)"
            },
            {
              type: "paragraph",
              text: "Custom key class implementing consistent equality and hashing."
            },
            {
              type: "code",
              language: "java",
              filename: "CustomKeyHashMapDemo.java",
              code: `import java.util.HashMap;
import java.util.Objects;

public class CustomKeyHashMapDemo {
    static final class AccountId {
        private final String countryCode;
        private final long number;

        public AccountId(String countryCode, long number) {
            this.countryCode = countryCode;
            this.number = number;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (!(o instanceof AccountId)) return false;
            AccountId accountId = (AccountId) o;
            return number == accountId.number && Objects.equals(countryCode, accountId.countryCode);
        }

        @Override
        public int hashCode() {
            return Objects.hash(countryCode, number);
        }

        @Override
        public String toString() {
            return countryCode + "-" + number;
        }
    }

    public static void main(String[] args) {
        HashMap<AccountId, Double> balances = new HashMap<>();

        AccountId acc1 = new AccountId("SA", 1000505);
        balances.put(acc1, 54000.50);

        // Retrieve using a NEW object instance with identical data
        AccountId lookupKey = new AccountId("SA", 1000505);
        Double balance = balances.get(lookupKey);

        System.out.println("Lookup using new key instance: " + lookupKey);
        System.out.println("Balance found: " + balance);
    }
}`,
              output: `Lookup using new key instance: SA-1000505
Balance found: 54000.5`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "Because hashCode() produces identical bucket indices and equals() returns true, lookupKey successfully retrieves acc1's balance."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "نظراً لتطابق hashCode وتأكيد equals للمساواة، عثرت جافا على الخلية الصحيحة واسترجعت الرصيد بنجاح عبر كائن جديد."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Simulating Hash Collisions & Linked Chaining (المثال 3: محاكاة التصادم والربط المتسلسل في خلية واحدة)"
            },
            {
              type: "paragraph",
              text: "Forcing multiple keys to land in the exact same bucket."
            },
            {
              type: "code",
              language: "java",
              filename: "CollisionChainingDemo.java",
              code: `import java.util.HashMap;

public class CollisionChainingDemo {
    static class CollidingKey {
        final String name;

        CollidingKey(String name) { this.name = name; }

        @Override
        public int hashCode() {
            return 42; // FORCED COLLISION: all keys have hash 42!
        }

        @Override
        public boolean equals(Object o) {
            return (o instanceof CollidingKey) && this.name.equals(((CollidingKey) o).name);
        }

        @Override
        public String toString() { return name; }
    }

    public static void main(String[] args) {
        HashMap<CollidingKey, String> map = new HashMap<>();

        // All 3 keys collide in bucket for hash 42
        map.put(new CollidingKey("Key-A"), "Payload-A");
        map.put(new CollidingKey("Key-B"), "Payload-B");
        map.put(new CollidingKey("Key-C"), "Payload-C");

        System.out.println("Map size: " + map.size());

        // HashMap traverses the linked chain in that bucket, resolving by equals()
        System.out.println("Get Key-B: " + map.get(new CollidingKey("Key-B")));
    }
}`,
              output: `Map size: 3
Get Key-B: Payload-B`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "When hash codes collide, HashMap links nodes together in that bucket. During get(), it traverses the chain using equals() to find the exact match."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "عند تصادم التجزئة، تربط HashMap العقد في قائمة أحادية بنفس الخلية؛ وأثناء البحث تمر على السلسلة وتفحص بـ equals لتجد العنصر."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Tuning Initial Capacity to Avoid Rehashing (المثال 4: حساب السعة المناسبة لمنع إعادة بناء الجدول)"
            },
            {
              type: "paragraph",
              text: "Formula: capacity = (expectedSize / loadFactor) + 1."
            },
            {
              type: "code",
              language: "java",
              filename: "HashMapCapacityTuningDemo.java",
              code: `import java.util.HashMap;

public class HashMapCapacityTuningDemo {
    public static void main(String[] args) {
        int expectedEntries = 100_000;
        float loadFactor = 0.75f;

        // Calculate capacity needed to hold 100,000 entries without a single resize
        int initialCapacity = (int) Math.ceil(expectedEntries / loadFactor);

        HashMap<Integer, String> tunedMap = new HashMap<>(initialCapacity, loadFactor);

        long start = System.currentTimeMillis();
        for (int i = 0; i < expectedEntries; i++) {
            tunedMap.put(i, "Data-" + i);
        }
        long time = System.currentTimeMillis() - start;

        System.out.println("Initialized capacity: " + initialCapacity);
        System.out.println("Inserted " + tunedMap.size() + " entries in " + time + " ms with zero rehashing.");
    }
}`,
              output: `Initialized capacity: 133334
Inserted 100000 entries in 16 ms with zero rehashing.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "Calculating initial capacity prevents capacity doubling (16 -> 32 -> 64 -> 128...), which eliminates costly array reallocation and node rehashing."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "حساب السعة الابتدائية مسبقاً يلغي عمليات مضاعفة الجدول المتكررة ويوفر نسخ وإعادة توزيع مئات آلاف العناصر بالذاكرة."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: The Mutable Key Catastrophe (المثال 5: كارثة تعديل خصائص المفتاح بعد إضافته)"
            },
            {
              type: "paragraph",
              text: "Why Map keys MUST be immutable (like String or Integer)."
            },
            {
              type: "code",
              language: "java",
              filename: "MutableKeyDisasterDemo.java",
              code: `import java.util.HashMap;

public class MutableKeyDisasterDemo {
    static class MutableKey {
        int id;
        MutableKey(int id) { this.id = id; }

        @Override
        public int hashCode() { return id; }

        @Override
        public boolean equals(Object o) {
            return (o instanceof MutableKey) && this.id == ((MutableKey) o).id;
        }
    }

    public static void main(String[] args) {
        HashMap<MutableKey, String> cache = new HashMap<>();

        MutableKey key = new MutableKey(50);
        cache.put(key, "Important Secret");

        System.out.println("Initial get(): " + cache.get(key));

        // DISASTROUS MUTATION: Mutating the key changes its hash from 50 to 999!
        key.id = 999;

        // get() now computes hash 999 and searches bucket for 999 instead of 50!
        System.out.println("Get after key mutation: " + cache.get(key) + " (VALUE IS LOST!)");
        System.out.println("Map size: " + cache.size() + " (Entry is an un-retrievable memory leak!)");
    }
}`,
              output: `Initial get(): Important Secret
Get after key mutation: null (VALUE IS LOST!)
Map size: 1 (Entry is an un-retrievable memory leak!)`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "Mutating a key changes its hashCode. HashMap searches the wrong bucket on lookup, rendering the entry lost and permanently leaked in memory."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "تعديل حقول المفتاح يغير قيمة التجزئة الخاصة به؛ فتبحث HashMap في خلية خاطئة ويصبح العنصر ضائعاً ويسبب تسريباً دائماً للذاكرة."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: High-Performance Iteration with entrySet() (المثال 6: استعراض الخريطة بأعلى سرعة عبر entrySet)"
            },
            {
              type: "paragraph",
              text: "Benchmarking entrySet() traversal versus keySet() + get(key)."
            },
            {
              type: "code",
              language: "java",
              filename: "EntrySetBenchmarkDemo.java",
              code: `import java.util.HashMap;
import java.util.Map;

public class EntrySetBenchmarkDemo {
    public static void main(String[] args) {
        int count = 100_000;
        HashMap<Integer, Integer> map = new HashMap<>(count * 2);
        for (int i = 0; i < count; i++) map.put(i, i * 2);

        // 1. Slow anti-pattern: keySet() + map.get(k) -> O(1) hash lookup per element
        long startKeys = System.currentTimeMillis();
        long sumKeys = 0;
        for (Integer k : map.keySet()) {
            sumKeys += map.get(k);
        }
        long timeKeys = System.currentTimeMillis() - startKeys;

        // 2. Fast pattern: entrySet() -> direct pointer access to Node.value
        long startEntries = System.currentTimeMillis();
        long sumEntries = 0;
        for (Map.Entry<Integer, Integer> entry : map.entrySet()) {
            sumEntries += entry.getValue();
        }
        long timeEntries = System.currentTimeMillis() - startEntries;

        System.out.println("keySet() + get() time: " + timeKeys + " ms");
        System.out.println("entrySet() time:        " + timeEntries + " ms");
        System.out.println("entrySet() is faster:  " + (timeEntries <= timeKeys));
    }
}`,
              output: `keySet() + get() time: 9 ms
entrySet() time:        4 ms
entrySet() is faster:  true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "entrySet() traverses internal Node references directly, eliminating the secondary hash calculation and bucket lookup required by map.get()."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "تصل entrySet لمراجع العقد الداخلية مباشرة وتلغي حسابات التجزئة الإضافية المطلوبة عند استدعاء map.get في كل دورة."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Safe Conditional Replacement with replace() (المثال 7: الاستبدال المشروط بقيمة معينة)"
            },
            {
              type: "paragraph",
              text: "Using replace(key, oldValue, newValue) for safe state transitions."
            },
            {
              type: "code",
              language: "java",
              filename: "ConditionalReplaceDemo.java",
              code: `import java.util.HashMap;

public class ConditionalReplaceDemo {
    public static void main(String[] args) {
        HashMap<String, String> orderStatus = new HashMap<>();
        orderStatus.put("ORD-100", "PENDING");

        // Attempt replace with wrong expected old state
        boolean replacedWrong = orderStatus.replace("ORD-100", "SHIPPED", "DELIVERED");
        System.out.println("Replaced with wrong old state? " + replacedWrong);

        // Replace with matching expected state
        boolean replacedCorrect = orderStatus.replace("ORD-100", "PENDING", "PROCESSING");
        System.out.println("Replaced with correct state?   " + replacedCorrect);

        System.out.println("Current order status: " + orderStatus.get("ORD-100"));
    }
}`,
              output: `Replaced with wrong old state? false
Replaced with correct state?   true
Current order status: PROCESSING`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "replace(k, oldV, newV) only performs the mutation if current value matches oldV, modeling an atomic compare-and-swap pattern."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "تستبدل replace القيمة فقط إذا كانت القيمة الحالية مطابقة للحالة السابقة المتوقعة، محاكية نمط التحقق والاستبدال الآمن."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Shallow Cloning of HashMap (المثال 8: الاستنساخ السطحي لخريطة HashMap)"
            },
            {
              type: "paragraph",
              text: "Duplicating map structure with clone()."
            },
            {
              type: "code",
              language: "java",
              filename: "HashMapCloneDemo.java",
              code: `import java.util.HashMap;

public class HashMapCloneDemo {
    public static void main(String[] args) {
        HashMap<String, StringBuilder> original = new HashMap<>();
        original.put("doc1", new StringBuilder("Draft"));

        @SuppressWarnings("unchecked")
        HashMap<String, StringBuilder> copy = (HashMap<String, StringBuilder>) original.clone();

        // Adding to copy does not alter original map structure
        copy.put("doc2", new StringBuilder("Final"));

        // Mutating object inside copy DOES mutate object in original (shallow copy!)
        copy.get("doc1").append(" Approved");

        System.out.println("Original: " + original);
        System.out.println("Copy:     " + copy);
    }
}`,
              output: `Original: {doc1=Draft Approved}
Copy:     {doc1=Draft Approved, doc2=Final}`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "clone() copies the bucket array and entry nodes, but keys and values themselves are shared references."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "تنسخ clone مصفوفة الخلايا والعقد، ولكن مراجع المفاتيح والقيم تشير لنفس الكائنات في الذاكرة (نسخ سطحي)."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Thread Safety: HashMap vs ConcurrentHashMap (المثال 9: أمان الخيوط والبديل الآمن ConcurrentHashMap)"
            },
            {
              type: "paragraph",
              text: "Why ConcurrentHashMap must be used in multithreaded systems."
            },
            {
              type: "code",
              language: "java",
              filename: "ThreadSafeMapDemo.java",
              code: `import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class ThreadSafeMapDemo {
    public static void main(String[] args) throws InterruptedException {
        // ConcurrentHashMap uses lock striping & CAS for non-blocking concurrency
        Map<String, Integer> counter = new ConcurrentHashMap<>();

        Thread t1 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) counter.merge("hits", 1, Integer::sum);
        });

        Thread t2 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) counter.merge("hits", 1, Integer::sum);
        });

        t1.start();
        t2.start();
        t1.join();
        t2.join();

        System.out.println("Final hit count (thread-safe): " + counter.get("hits"));
    }
}`,
              output: `Final hit count (thread-safe): 2000`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "HashMap is not thread-safe. ConcurrentHashMap provides lock-striped concurrent reads and writes without corrupting internal state."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "فئة HashMap غير آمنة في تعدد الخيوط؛ وتوفر ConcurrentHashMap عمليات قراءة وكتابة متزامنة دون إتلاف البيانات."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Inverting a Map (Values to Keys) (المثال 10: عكس الخريطة بجعل القيم مفاتيح)"
            },
            {
              type: "paragraph",
              text: "Flipping keys and values into a multimap using Streams."
            },
            {
              type: "code",
              language: "java",
              filename: "InvertMapDemo.java",
              code: `import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class InvertMapDemo {
    public static void main(String[] args) {
        Map<String, String> employeeRole = Map.of(
            "Alice", "Developer",
            "Bob", "Manager",
            "Charlie", "Developer",
            "David", "Designer"
        );

        // Invert: Role -> List<Employees>
        Map<String, List<String>> roleEmployees = employeeRole.entrySet().stream()
                .collect(Collectors.groupingBy(
                        Map.Entry::getValue,
                        Collectors.mapping(Map.Entry::getKey, Collectors.toList())
                ));

        System.out.println("Original (Person -> Role): " + employeeRole);
        System.out.println("Inverted (Role -> People): " + roleEmployees);
    }
}`,
              output: `Original (Person -> Role): {David=Designer, Bob=Manager, Alice=Developer, Charlie=Developer}
Inverted (Role -> People): {Developer=[Alice, Charlie], Manager=[Bob], Designer=[David]}`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "Inverting a map where values might be duplicate requires grouping into a Map<Value, List<Key>>."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "عند عكس الخريطة لاحتمال تكرار القيم، يتم تجميع المفاتيح في قوائم Map<Value, List<Key>> عبر Streams."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Converting Map to Query String Parameters (المثال 11: تحويل الخريطة إلى معلمات روابط URL)"
            },
            {
              type: "paragraph",
              text: "Encoding a map of parameters into a URL query string."
            },
            {
              type: "code",
              language: "java",
              filename: "MapToUrlQueryDemo.java",
              code: `import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

public class MapToUrlQueryDemo {
    public static void main(String[] args) {
        Map<String, String> queryParams = new HashMap<>();
        queryParams.put("search", "java collections");
        queryParams.put("page", "2");
        queryParams.put("sort", "desc");

        String queryString = queryParams.entrySet().stream()
                .map(e -> URLEncoder.encode(e.getKey(), StandardCharsets.UTF_8) + "=" +
                          URLEncoder.encode(e.getValue(), StandardCharsets.UTF_8))
                .collect(Collectors.joining("&", "?", ""));

        System.out.println("Generated URL Query String: " + queryString);
    }
}`,
              output: `Generated URL Query String: ?search=java+collections&sort=desc&page=2`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "Streams allow transforming Map entries directly into URL query parameters with proper character encoding."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "تتيح التدفقات تحويل أزواج الخريطة لمعلمات روابط URL مشفرة بترميز UTF-8 بدقة وسرعة."
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
                "Mistake 1: Using mutable objects as HashMap keys and modifying their fields after insertion. This changes their hashCode and makes entries unfindable.",
                "خطأ 1: استخدام كائنات قابلة للتعديل كمفاتيح وتغيير قيمها بعد الإضافة؛ مما يغير قيمة الـ hash ويجعل العنصر مفقوداً في الجدول.",
                "Mistake 2: Overriding equals() without overriding hashCode(). This causes identical logical keys to land in different buckets, returning null on lookup.",
                "خطأ 2: كتابة equals وتجاهل hashCode؛ مما يؤدي للبحث في خلايا خاطئة وإرجاع null دائماً رغم وجود البيانات.",
                "Mistake 3: Accessing HashMap from multiple threads without synchronization. Use ConcurrentHashMap instead.",
                "خطأ 3: استخدام HashMap في خيوط متعددة متزامنة دون حماية؛ واستخدم ConcurrentHashMap بديلاً عنها.",
                "Mistake 4: Not setting initial capacity when storing millions of items, triggering numerous expensive table reallocations."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: High-Speed Token Frequency Analyzer (التحدي العملي: محلل تكرار الكلمات فائق السرعة)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Create a class 'TokenFrequencyAnalyzer' that processes a stream of text strings. Implement: 1) 'recordTokens(String sentence)'; 2) 'getTopN(int n)' returning the N most frequent words; 3) 'getFrequency(String word)'. Optimize using HashMap and Map.merge(). Test in main() with sample text."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: صمم فئة TokenFrequencyAnalyzer لتحليل النصوص. نفّذ: 1) recordTokens لتسجيل الكلمات في HashMap وتحديث تكرارها عبر merge؛ 2) getTopN لاستخراج أكثر N كلمات تكراراً؛ 3) getFrequency لمعرفة تكرار كلمة معينة. اختبرها في main واطبع أكثر الكلمات شيوعاً."
            },
            {
              type: "code",
              language: "java",
              filename: "TokenAnalyzerChallenge.java",
              code: `import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class TokenAnalyzerChallenge {
    static class TokenFrequencyAnalyzer {
        private final Map<String, Integer> frequencyMap = new HashMap<>();

        public void recordTokens(String text) {
            if (text == null || text.isBlank()) return;

            String[] words = text.toLowerCase().replaceAll("[^a-zA-Z0-9\\\\s]", "").split("\\\\s+");
            for (String word : words) {
                if (!word.isEmpty()) {
                    frequencyMap.merge(word, 1, Integer::sum);
                }
            }
        }

        public int getFrequency(String word) {
            return frequencyMap.getOrDefault(word.toLowerCase(), 0);
        }

        public List<Map.Entry<String, Integer>> getTopN(int n) {
            return frequencyMap.entrySet().stream()
                    .sorted(Map.Entry.<String, Integer>comparingByValue().reversed())
                    .limit(n)
                    .toList();
        }
    }

    public static void main(String[] args) {
        TokenFrequencyAnalyzer analyzer = new TokenFrequencyAnalyzer();

        analyzer.recordTokens("Java is fast, Java is versatile, and Java is everywhere.");
        analyzer.recordTokens("Modern Java supports lambda expressions and streams.");

        System.out.println("Frequency of 'java': " + analyzer.getFrequency("java"));
        System.out.println("Frequency of 'is':   " + analyzer.getFrequency("is"));

        System.out.println("Top 3 Most Frequent Words:");
        analyzer.getTopN(3).forEach(entry -> {
            System.out.println(" - " + entry.getKey() + ": " + entry.getValue() + " times");
        });
    }
}`,
              output: `Frequency of 'java': 4
Frequency of 'is':   3
Top 3 Most Frequent Words:
 - java: 4 times
 - is: 3 times
 - and: 2 times`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "The analyzer cleans words and increments frequencies in O(1) per word using frequencyMap.merge(). getTopN() sorts entries descending by value."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "ينظف المحلل الكلمات ويزيد تكرارها بزمن O(1) لكل كلمة عبر merge()، وتستخرج getTopN أكثر الكلمات تكراراً بترتيب تنازلي."
            }
          ],
          quiz: [
          {
                    "id": "hashmap-q1",
                    "question": "How does Java's HashMap internally determine the target bucket index for a non-null key in a table of capacity N (where N is a power of two)?",
                    "options": [
                              "key.hashCode() % N",
                              "(n - 1) & (h ^ (h >>> 16)), where h = key.hashCode()",
                              "Math.abs(key.hashCode()) % (N - 1)",
                              "key.hashCode() & N"
                    ],
                    "correctIndex": 1,
                    "explanation": "HashMap applies a supplemental hash function (h ^ (h >>> 16)) to spread higher-order hash bits down into the lower 16 bits, and then computes the bucket index using bitwise AND with (n - 1). Because n is always a power of two, (n - 1) & hash is mathematically equivalent to hash % n but executes significantly faster."
          },
          {
                    "id": "hashmap-q2",
                    "question": "How does HashMap handle null keys in Java?",
                    "options": [
                              "Throws a NullPointerException immediately when put(null, value) is called",
                              "Computes a random hash code and places it in an arbitrary bucket",
                              "Stores the null key exclusively at bucket index 0 with an assigned hash value of 0",
                              "Allows multiple null keys as long as their corresponding values are distinct"
                    ],
                    "correctIndex": 2,
                    "explanation": "HashMap explicitly checks if (key == null). If true, it assigns a hash code of 0 and places the entry directly into bucket table[0]. HashMap allows at most one null key; subsequent put(null, val) calls simply overwrite the existing value at bucket 0."
          },
          {
                    "id": "hashmap-q3",
                    "question": "Consider the following class used as a HashMap key:\n\nclass UserKey {\n    String id;\n    UserKey(String id) { this.id = id; }\n    @Override public boolean equals(Object o) {\n        return (o instanceof UserKey) && this.id.equals(((UserKey) o).id);\n    }\n}\n\nMap<UserKey, String> map = new HashMap<>();\nmap.put(new UserKey(\"A1\"), \"Admin\");\nSystem.out.println(map.get(new UserKey(\"A1\")));\n\nWhat is printed and why?",
                    "options": [
                              "\"Admin\", because equals() returns true for identical id values",
                              "null, because UserKey violates the hashCode() contract by inheriting Object.hashCode(), causing the lookup to search the wrong bucket",
                              "Throws NullPointerException during the get() call",
                              "Throws ClassCastException because Comparable is not implemented"
                    ],
                    "correctIndex": 1,
                    "explanation": "If equals() is overridden without overriding hashCode(), two distinct UserKey instances with the same 'id' will inherit Object.hashCode(), which computes distinct memory-address-derived hash values. The get() operation looks in the bucket corresponding to the new instance's hash, misses the entry in the first bucket, and returns null."
          },
          {
                    "id": "hashmap-q4",
                    "question": "When does a standard Java 8+ HashMap convert an individual collision bucket from a linked list into a balanced Red-Black tree (TreeNodes)?",
                    "options": [
                              "Whenever the total number of entries in the entire map exceeds 64",
                              "When the bucket's collision chain reaches 8 nodes, regardless of table capacity",
                              "When the bucket collision chain reaches 8 nodes (TREEIFY_THRESHOLD) AND total table capacity is at least 64 (MIN_TREEIFY_CAPACITY)",
                              "When the load factor exceeds 0.75 and the map rehashes"
                    ],
                    "correctIndex": 2,
                    "explanation": "In Java 8+, a bucket is treeified only if the chain length reaches TREEIFY_THRESHOLD (8) AND the overall table capacity is at least MIN_TREEIFY_CAPACITY (64). If the chain length reaches 8 but capacity is less than 64, HashMap resizes the table instead to disperse elements into newly created buckets."
          },
          {
                    "id": "hashmap-q5",
                    "question": "What occurs during a HashMap rehash when size exceeds threshold (capacity * loadFactor)?",
                    "options": [
                              "The capacity doubles (N * 2), a new array is allocated, and entries are redistributed to new buckets",
                              "All existing entries are deleted and garbage collected",
                              "The load factor increases dynamically while table capacity remains constant",
                              "The table size increases by a fixed increment of 16 buckets"
                    ],
                    "correctIndex": 0,
                    "explanation": "When size > threshold, HashMap allocates a new Node[] table with double the previous capacity (oldCap << 1) and transfers all nodes. In Java 8+, nodes either remain at their original index or move to (original_index + oldCapacity) depending on their high-order hash bit."
          },
          {
                    "id": "hashmap-q6",
                    "question": "What is the output of the following code involving a mutable key in HashMap?\n\nclass Point {\n    int x, y;\n    Point(int x, int y) { this.x = x; this.y = y; }\n    @Override public int hashCode() { return Objects.hash(x, y); }\n    @Override public boolean equals(Object o) {\n        if (!(o instanceof Point)) return false;\n        Point p = (Point) o;\n        return x == p.x && y == p.y;\n    }\n}\n\nMap<Point, String> map = new HashMap<>();\nPoint pt = new Point(10, 20);\nmap.put(pt, \"Origin\");\npt.x = 99;\nSystem.out.println(map.get(pt) + \" \" + map.containsKey(pt));",
                    "options": [
                              "\"Origin true\"",
                              "\"Origin false\"",
                              "\"null false\"",
                              "\"null true\""
                    ],
                    "correctIndex": 2,
                    "explanation": "Mutating fields that contribute to hashCode() after putting the object into a HashMap alters its hash code. When get(pt) or containsKey(pt) is subsequently called, HashMap calculates the bucket index using the mutated hash, leading to a different bucket where the node does not exist. Hence, both return null / false."
          },
          {
                    "id": "hashmap-q7",
                    "question": "Why is iterating over map.entrySet() preferred over iterating over map.keySet() followed by map.get(k)?",
                    "options": [
                              "map.keySet() throws ConcurrentModificationException even in single-threaded read-only loops",
                              "map.entrySet() accesses the key and value directly from each Node in O(1) time per entry, whereas map.get(k) requires a redundant hash computation and bucket lookup for every key",
                              "map.keySet() produces values in reverse order, requiring an extra sorting phase",
                              "map.entrySet() guarantees alphabetical sorting of map entries"
                    ],
                    "correctIndex": 1,
                    "explanation": "Traversing entrySet() directly reads the Node.getKey() and Node.getValue() references stored inside the internal array/linked structures in a single pass of O(N) operations. In contrast, calling map.get(key) inside a keySet() loop recomputes the hash and re-traverses the bucket for every single element, doubling lookup overhead."
          },
          {
                    "id": "hashmap-q8",
                    "question": "What will the following code print?\n\nMap<String, Integer> map = new HashMap<>();\nmap.put(\"A\", 10);\nSystem.out.print(map.put(\"A\", 20) + \" \");\nSystem.out.print(map.putIfAbsent(\"A\", 30) + \" \");\nSystem.out.print(map.get(\"A\"));",
                    "options": [
                              "\"10 20 20\"",
                              "\"20 30 30\"",
                              "\"10 30 30\"",
                              "\"null 20 20\""
                    ],
                    "correctIndex": 0,
                    "explanation": "map.put(\"A\", 20) replaces 10 with 20 and returns the previous value (10). Next, map.putIfAbsent(\"A\", 30) sees that key \"A\" is already mapped to non-null value 20, so it does NOT insert 30 and returns the existing value (20). Finally, map.get(\"A\") returns 20. Output is \"10 20 20\"."
          },
          {
                    "id": "hashmap-q9",
                    "question": "How does map.replace(K key, V oldValue, V newValue) behave?",
                    "options": [
                              "It replaces the value regardless of what oldValue is currently mapped to and returns true",
                              "It replaces oldValue with newValue only if key is currently mapped to oldValue, returning true if replaced and false otherwise",
                              "It throws NoSuchElementException if oldValue does not match the stored value",
                              "It inserts newValue as an additional value under the same key"
                    ],
                    "correctIndex": 1,
                    "explanation": "The 3-argument replace(key, oldValue, newValue) performs a conditional atomic-style replacement: it checks if map.containsKey(key) && Objects.equals(map.get(key), oldValue). If both are true, it overwrites the value with newValue and returns true; otherwise it leaves the map unchanged and returns false."
          },
          {
                    "id": "hashmap-q10",
                    "question": "What happens when multiple threads execute put() operations concurrently on a shared non-thread-safe HashMap?",
                    "options": [
                              "The JVM automatically serializes access to the buckets using intrinsic locks",
                              "Writes are buffered and merged safely during garbage collection",
                              "Data corruption, lost updates, or broken internal linked lists can occur",
                              "A ThreadDeath error is thrown immediately by the runtime"
                    ],
                    "correctIndex": 2,
                    "explanation": "HashMap is unsynchronized. Concurrent invocations of put() or resize() without external synchronization can cause lost updates (silent overwrites), corrupt node pointer chains, or null pointer anomalies. For concurrent access, ConcurrentHashMap or Collections.synchronizedMap() must be used."
          },
          {
                    "id": "hashmap-q11",
                    "question": "What does HashMap.clone() produce?",
                    "options": [
                              "A deep copy where all keys and values are recursively cloned",
                              "A shallow copy where the bucket array and entry structure are duplicated, but key and value object references remain shared with the original map",
                              "An unmodifiable wrapper view around the original map",
                              "A serialized byte stream representation of the map"
                    ],
                    "correctIndex": 1,
                    "explanation": "HashMap implements Cloneable via Object.clone(). It creates a shallow copy: a distinct HashMap instance with duplicated internal table buckets, but the actual key and value object references inside the nodes point to the exact same objects as the original map."
          },
          {
                    "id": "hashmap-q12",
                    "question": "If you know in advance that you will store exactly 1,000 entries in a HashMap with default load factor 0.75, what initial capacity should you provide to avoid any rehashing?",
                    "options": [
                              "1000",
                              "750",
                              "1334 (or next power of 2, 2048)",
                              "512"
                    ],
                    "correctIndex": 2,
                    "explanation": "To prevent rehashing, capacity * 0.75 >= 1000, so capacity >= 1000 / 0.75 = 1333.33. Rounding up gives 1334. In HashMap, the constructor rounds any initial capacity up to the next power of two, which is 2048. Creating new HashMap<>(1334) or new HashMap<>(2048) guarantees 1,000 entries fit without triggering a rehash."
          },
          {
                    "id": "hashmap-q13",
                    "question": "What is the output of the following code using the merge() method?\n\nMap<String, String> map = new HashMap<>();\nmap.put(\"greeting\", \"Hello\");\nmap.merge(\"greeting\", \" World\", (oldVal, newVal) -> oldVal + newVal);\nmap.merge(\"farewell\", \"Goodbye\", (oldVal, newVal) -> oldVal + newVal);\nSystem.out.println(map.get(\"greeting\") + \" | \" + map.get(\"farewell\"));",
                    "options": [
                              "\" World | Goodbye\"",
                              "\"Hello World | Goodbye\"",
                              "\"Hello | null\"",
                              "\"Hello World | null\""
                    ],
                    "correctIndex": 1,
                    "explanation": "merge(key, value, remappingFunction) checks if the key is already associated with a non-null value. For \"greeting\", oldVal (\"Hello\") exists, so it evaluates oldVal + newVal = \"Hello World\". For \"farewell\", no previous mapping exists, so it puts \"Goodbye\" directly without calling the remapping function. Output: \"Hello World | Goodbye\"."
          },
          {
                    "id": "hashmap-q14",
                    "question": "When multiple keys hash to the same bucket and the bucket treeifies into a Red-Black tree in Java 8+, how does HashMap order TreeNodes if keys do NOT implement Comparable?",
                    "options": [
                              "It throws a ClassCastException immediately during treeification",
                              "It reverts the entire map back into a flat array",
                              "It uses tieBreakOrder() which falls back to comparing class names and System.identityHashCode(key)",
                              "It assigns each key an incremental integer timestamp based on insertion order"
                    ],
                    "correctIndex": 2,
                    "explanation": "In HashMap.TreeNode, if keys implement Comparable<C>, their compareTo() method orders tree nodes. If keys do not implement Comparable or their compareTo() returns 0 for distinct objects, HashMap calls tieBreakOrder(Object a, Object b), which compares their class names and falls back to System.identityHashCode() to establish a deterministic tree order."
          },
          {
                    "id": "hashmap-q15",
                    "question": "Analyze the following code snippet:\n\nMap<String, Integer> scores = new HashMap<>();\nscores.put(\"Alice\", 90);\nscores.put(\"Bob\", 80);\nscores.computeIfPresent(\"Alice\", (k, v) -> v + 5);\nscores.computeIfPresent(\"Charlie\", (k, v) -> 100);\nscores.computeIfAbsent(\"Bob\", k -> 95);\nscores.remove(\"Alice\", 90);\nSystem.out.println(scores.get(\"Alice\") + \",\" + scores.get(\"Bob\") + \",\" + scores.get(\"Charlie\"));",
                    "options": [
                              "\"95,80,null\"",
                              "\"null,80,null\"",
                              "\"95,95,100\"",
                              "\"90,80,null\""
                    ],
                    "correctIndex": 0,
                    "explanation": "1) \"Alice\" -> 90. 2) \"Bob\" -> 80. 3) computeIfPresent on \"Alice\": present, so 90 + 5 = 95. 4) computeIfPresent on \"Charlie\": not present, does nothing (Charlie remains absent). 5) computeIfAbsent on \"Bob\": \"Bob\" is already present (80), so mapping function is not called. 6) scores.remove(\"Alice\", 90): requires value to match 90, but current value is 95, so removal fails! Thus Alice=95, Bob=80, Charlie=null. Result: \"95,80,null\"."
          }
]
        }
      ]
    }
  ];
})();
