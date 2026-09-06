/**
 * Java Curriculum Module - Part 36
 * Topics:
 * 71. Enhanced For Loop
 * 72. Java Generics
 * 
 * 100% Offline, Pure JavaScript. Complete educational content with full bilingual (English & Arabic) explanations.
 */

(function () {
  'use strict';

  window.JAVA_TOPICS_PART36 = [
    /* ==========================================================================
       TOPIC 71: Enhanced For Loop
       ========================================================================== */
    {
      id: "enhanced-for-loop",
      title: "71. Enhanced For Loop",
      description: "Deep technical analysis of Java's Enhanced For Loop (for-each): compiler bytecode desugaring for arrays vs Iterable collections, performance equivalency, structural modification restrictions, limitations (missing index, single direction, no element replacement), and modern idioms.",
      lessons: [
        {
          id: "enhanced-for-loop-mastery",
          title: "Complete Guide to Java's Enhanced For Loop",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "Compiler De-sugaring & Architecture (الهندسة الداخلية وكيف يفكك المترجم حلقة for-each)"
            },
            {
              type: "paragraph",
              text: "Introduced in Java 5, the Enhanced For Loop (commonly called the 'for-each' loop) provides clean, readable syntax: 'for (Type var : target)'. Crucially, the enhanced for loop does not introduce new bytecode instructions; it is pure 'syntactic sugar' translated by the Java compiler at compile time into one of two lower-level structures: 1) For Arrays: The compiler transforms it into a classic index-based loop caching array length: 'for (int i = 0; i < len; i++)'; 2) For Collections: The compiler transforms it into a standard Iterator loop: 'Iterator it = target.iterator(); while (it.hasNext()) { ... }'. This understanding immediately explains why structural mutations cause ConcurrentModificationException inside a for-each loop."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "قُدمت حلقة for-each المحسنة في جافا 5 لتوفير صياغة أنيقة وعالية القراءة: 'for (Type var : target)'. ومن المهم جداً معرفة أن هذه الحلقة ليست تعليمة جديدة في لغة الآلة، بل هي 'سكر برمجي' (Syntactic Sugar) يقوم مترجم جافا (javac) بتفكيكه وتحويله تلقائياً أثناء الترجمة إلى أحد شكلين: 1) بالنسبة للمصفوفات: يحولها إلى حلقة مؤشر تقليدية 'for (int i = 0; i < len; i++)' مع حفظ طول المصفوفة لتفادي الحساب المتكرر؛ 2) بالنسبة للمجموعات (Collections): يحولها إلى مكرر Iterator تقليدي 'while (it.hasNext())'. هذا الفهم يوضح لك فوراً سبب حدوث استثناء ConcurrentModificationException إذا حاولت الحذف أو الإضافة بداخلها."
            },
            {
              type: "paragraph",
              text: "When to Use vs When NOT to Use: Use for-each when traversing all elements sequentially in read-only fashion. Do NOT use it when: 1) You need the current index; 2) You need to remove or replace elements during traversal; 3) You need to iterate backwards or skip elements; 4) You need to iterate across multiple collections in parallel."
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
              text: "Example 1: Basic Array & Collection Iteration (المثال 1: التكرار الأساسي على المصفوفات والمجموعات)"
            },
            {
              type: "paragraph",
              text: "Comparing clean for-each syntax on both primitive arrays and object lists."
            },
            {
              type: "code",
              language: "java",
              filename: "BasicForEachDemo.java",
              code: `import java.util.List;

public class BasicForEachDemo {
    public static void main(String[] args) {
        // 1. Primitive Array
        int[] primes = {2, 3, 5, 7, 11};
        System.out.print("Primes: ");
        for (int p : primes) {
            System.out.print(p + " ");
        }
        System.out.println();

        // 2. Collection of Strings
        List<String> planets = List.of("Mercury", "Venus", "Earth", "Mars");
        System.out.print("Planets: ");
        for (String planet : planets) {
            System.out.print(planet + " ");
        }
        System.out.println();
    }
}`,
              output: `Primes: 2 3 5 7 11 
Planets: Mercury Venus Earth Mars `
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "The syntax remains identical whether traversing a primitive array or a complex Collection object."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "تظل الصياغة موحدة وأنيقة سواء كنت تمر على مصفوفة أرقام بدائية أو قائمة كائنات متقدمة."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: How the Compiler Decompiles Arrays vs Collections (المثال 2: المقارنة الصريحة لكيفية فك المترجم للكود)"
            },
            {
              type: "paragraph",
              text: "Side-by-side equivalent code demonstrating bytecode desugaring."
            },
            {
              type: "code",
              language: "java",
              filename: "DecompileComparisonDemo.java",
              code: `import java.util.Iterator;
import java.util.List;

public class DecompileComparisonDemo {
    public static void main(String[] args) {
        String[] array = {"A", "B", "C"};
        List<String> list = List.of("X", "Y", "Z");

        // --- HOW COMPILER EXPANDS ARRAY FOR-EACH ---
        System.out.print("Array Decompiled:      ");
        String[] arr$ = array;
        int len$ = arr$.length;
        for (int i$ = 0; i$ < len$; ++i$) {
            String item = arr$[i$];
            System.out.print(item + " ");
        }
        System.out.println();

        // --- HOW COMPILER EXPANDS COLLECTION FOR-EACH ---
        System.out.print("Collection Decompiled: ");
        for (Iterator<String> it = list.iterator(); it.hasNext(); ) {
            String item = it.next();
            System.out.print(item + " ");
        }
        System.out.println();
    }
}`,
              output: `Array Decompiled:      A B C 
Collection Decompiled: X Y Z `
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "Arrays are lowered to index loops caching length. Collections are lowered to Iterator loops with hasNext() and next()."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "يفكك المترجم مصفوفات البيانات إلى حلقات فهارس سريعة، ويفكك المجموعات إلى مكررات Iterator."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Limitation 1 - No Access to Current Index (المثال 3: العيب الأول - غياب الفهرس الحالي)"
            },
            {
              type: "paragraph",
              text: "When you need the position index, a classic index loop is superior to maintaining an external counter."
            },
            {
              type: "code",
              language: "java",
              filename: "IndexLimitationDemo.java",
              code: `import java.util.List;

public class IndexLimitationDemo {
    public static void main(String[] args) {
        List<String> runners = List.of("Kipchoge", "Bekele", "Farah");

        // Clunky approach: Manual external counter with for-each
        System.out.println("Using manual counter:");
        int rank = 1;
        for (String runner : runners) {
            System.out.println(" Position " + (rank++) + ": " + runner);
        }

        // Better approach: Classic indexed loop when indices are domain-significant
        System.out.println("Using classic index loop:");
        for (int i = 0; i < runners.size(); i++) {
            System.out.println(" Rank #" + (i + 1) + ": " + runners.get(i));
        }
    }
}`,
              output: `Using manual counter:
 Position 1: Kipchoge
 Position 2: Bekele
 Position 3: Farah
Using classic index loop:
 Rank #1: Kipchoge
 Rank #2: Bekele
 Rank #3: Farah`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "The enhanced for loop hides the index. If index math or position display is required, a standard for-loop is cleaner."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "تخفي حلقة for-each الفهرس؛ وإذا كانت الفهارس جزءاً أساسياً من منطق العمل فالحلقة التقليدية أوضح وأنسب."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Limitation 2 - Cannot Modify Underlying Array Elements (المثال 4: العيب الثاني - تعذر تعديل قيم خلايا المصفوفة)"
            },
            {
              type: "paragraph",
              text: "The loop variable is a local copy; modifying it does NOT mutate the array."
            },
            {
              type: "code",
              language: "java",
              filename: "CannotMutatePrimitiveArrayDemo.java",
              code: `import java.util.Arrays;

public class CannotMutatePrimitiveArrayDemo {
    public static void main(String[] args) {
        int[] numbers = {10, 20, 30};

        // Attempting to double each number using for-each
        for (int n : numbers) {
            n = n * 2; // ONLY MODIFIES LOCAL VARIABLE 'n', NOT THE ARRAY!
        }
        System.out.println("Array after for-each doubling: " + Arrays.toString(numbers) + " (UNCHANGED!)");

        // Correct approach: Classic indexed assignment
        for (int i = 0; i < numbers.length; i++) {
            numbers[i] = numbers[i] * 2;
        }
        System.out.println("Array after index-loop doubling: " + Arrays.toString(numbers) + " (UPDATED!)");
    }
}`,
              output: `Array after for-each doubling: [10, 20, 30] (UNCHANGED!)
Array after index-loop doubling: [20, 40, 60] (UPDATED!)`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "The loop variable holds a copy of the value. Reassigning it has zero effect on the underlying array cell."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "يمثل متغير الحلقة نسخة محلية من القيمة؛ وإعادة تعيينه لا تؤثر إطلاقاً على خلايا المصفوفة الأصلية."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Limitation 3 - ConcurrentModificationException on Mutation (المثال 5: العيب الثالث - حظر الحذف أثناء التكرار)"
            },
            {
              type: "paragraph",
              text: "Why calling list.remove() inside a for-each loop triggers an immediate crash."
            },
            {
              type: "code",
              language: "java",
              filename: "ForEachConcurrentModificationDemo.java",
              code: `import java.util.ArrayList;
import java.util.ConcurrentModificationException;
import java.util.List;

public class ForEachConcurrentModificationDemo {
    public static void main(String[] args) {
        List<String> items = new ArrayList<>(List.of("alpha", "delete_me", "beta"));

        try {
            for (String item : items) {
                if (item.equals("delete_me")) {
                    items.remove(item); // CRASH! Desynchronizes hidden iterator!
                }
            }
        } catch (ConcurrentModificationException e) {
            System.out.println("Caught ConcurrentModificationException!");
            System.out.println("Root Cause: The hidden Iterator detected direct modification of the collection!");
        }
    }
}`,
              output: `Caught ConcurrentModificationException!
Root Cause: The hidden Iterator detected direct modification of the collection!`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "Because the compiler generated a hidden Iterator, calling items.remove() bypasses that iterator, causing modCount mismatch."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "نظراً لأن المترجم يولد مكرر Iterator خفي، فإن الحذف المباشر من اللائحة يفسد تزامن العداد ويرمي استثناءً فورياً."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Mutating Object State vs Reassigning References (المثال 6: تعديل خصائص الكائنات مسموح، لكن إعادة التعيين ممنوعة)"
            },
            {
              type: "paragraph",
              text: "Invoking setters on iterated objects DOES update the objects in the collection."
            },
            {
              type: "code",
              language: "java",
              filename: "ObjectStateMutationDemo.java",
              code: `import java.util.List;

public class ObjectStateMutationDemo {
    static class Task {
        String title;
        boolean completed = false;

        Task(String title) { this.title = title; }

        @Override
        public String toString() { return title + "[" + (completed ? "DONE" : "PENDING") + "]"; }
    }

    public static void main(String[] args) {
        List<Task> tasks = List.of(new Task("Write Docs"), new Task("Run Tests"));

        System.out.println("Before: " + tasks);

        // Mutating internal state of referenced objects IS fully supported!
        for (Task task : tasks) {
            task.completed = true; // Updates the actual heap object!
        }

        System.out.println("After:  " + tasks);
    }
}`,
              output: `Before: [Write Docs[PENDING], Run Tests[PENDING]]
After:  [Write Docs[DONE], Run Tests[DONE]]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "While you cannot replace the reference or structural container, invoking mutating methods on referenced objects works as expected."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "في حين لا يمكنك تغيير مرجع الكائن، فإن استدعاء دوال التعديل الداخلية (Setters) يغير حالة الكائن في الذاكرة بنجاح."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Nested For-Each Loops (2D Arrays & Cartesian Products) (المثال 7: الحلقات المتداخلة والمصفوفات ثنائية الأبعاد)"
            },
            {
              type: "paragraph",
              text: "Traversing matrices and pairs cleanly without nested index counters."
            },
            {
              type: "code",
              language: "java",
              filename: "NestedForEachDemo.java",
              code: `public class NestedForEachDemo {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };

        int totalSum = 0;
        System.out.println("Matrix rows:");
        for (int[] row : matrix) {
            for (int val : row) {
                System.out.print(val + " ");
                totalSum += val;
            }
            System.out.println();
        }

        System.out.println("Total sum of all elements: " + totalSum);
    }
}`,
              output: `Matrix rows:
1 2 3 
4 5 6 
7 8 9 
Total sum of all elements: 45`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "Nested for-each loops eliminate indices 'i', 'j', and off-by-one errors when processing multi-dimensional arrays."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "تلغي حلقات for-each المتداخلة الحاجة لعدادات الفهارس المتعددة (i و j) وتمنع أخطاء الحدود الشائعة."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Iterating Over Maps Using entrySet() (المثال 8: التكرار على الخرائط بأعلى كفاءة)"
            },
            {
              type: "paragraph",
              text: "The idiomatic pattern for Map iteration using enhanced for loops."
            },
            {
              type: "code",
              language: "java",
              filename: "MapForEachIdiomDemo.java",
              code: `import java.util.Map;

public class MapForEachIdiomDemo {
    public static void main(String[] args) {
        Map<String, String> countryCurrencies = Map.of(
            "Saudi Arabia", "SAR",
            "Kuwait", "KWD",
            "UAE", "AED"
        );

        System.out.println("Country Currency Registry:");
        // Enhanced for loop on entrySet is clean and single-lookup fast
        for (Map.Entry<String, String> entry : countryCurrencies.entrySet()) {
            System.out.println(" * " + entry.getKey() + " uses " + entry.getValue());
        }
    }
}`,
              output: `Country Currency Registry:
 * UAE uses AED
 * Kuwait uses KWD
 * Saudi Arabia uses SAR`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "Using for-each over map.entrySet() avoids secondary get() calls, maximizing performance and readability."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "استخدام for-each مع entrySet يوفر وصولاً سريعاً للمفتاح والقيمة معاً بأعلى سرعة وقراءة برمجية واضحة."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Enhanced For Loop vs Iterable.forEach(lambda) (المثال 9: المقارنة بين for-each ودالة forEach مع لامدا)"
            },
            {
              type: "paragraph",
              text: "Comparing control flow: break, continue, and checked exceptions."
            },
            {
              type: "code",
              language: "java",
              filename: "ForEachVsLambdaDemo.java",
              code: `import java.util.List;

public class ForEachVsLambdaDemo {
    public static void main(String[] args) {
        List<String> codes = List.of("A1", "A2", "STOP", "A3");

        // Enhanced for loop SUPPORTS break and continue control flow!
        System.out.print("Enhanced for loop with break: ");
        for (String c : codes) {
            if ("STOP".equals(c)) break; // Clean early termination
            System.out.print(c + " ");
        }
        System.out.println();

        // Iterable.forEach lambda CANNOT break! 'return' inside lambda only skips current element
        System.out.print("Lambda forEach with return:   ");
        codes.forEach(c -> {
            if ("STOP".equals(c)) return; // Only acts like 'continue'!
            System.out.print(c + " ");
        });
        System.out.println();
    }
}`,
              output: `Enhanced for loop with break: A1 A2 
Lambda forEach with return:   A1 A2 A3 `
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "Enhanced for loop supports break, continue, and throwing checked exceptions. In a lambda forEach, 'return' acts only like 'continue'."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "تدعم حلقة for-each أوامر break و continue والتحكم الكامل بالتدفق، بينما أمر return داخل لامدا يماثل continue فقط ولا يوقف التكرار."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Iterating Over Custom Enum Values (المثال 10: المرور على قيم التعداد Enum)"
            },
            {
              type: "paragraph",
              text: "Traversing all enum constants with Enum.values()."
            },
            {
              type: "code",
              language: "java",
              filename: "EnumForEachDemo.java",
              code: `public class EnumForEachDemo {
    enum Priority {
        LOW(1), MEDIUM(2), HIGH(3), CRITICAL(4);

        final int level;
        Priority(int level) { this.level = level; }
    }

    public static void main(String[] args) {
        System.out.println("System Priority Levels:");
        for (Priority p : Priority.values()) {
            System.out.println(" - " + p.name() + " [Level: " + p.level + "]");
        }
    }
}`,
              output: `System Priority Levels:
 - LOW [Level: 1]
 - MEDIUM [Level: 2]
 - HIGH [Level: 3]
 - CRITICAL [Level: 4]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "Enum.values() returns an array, making it effortlessly iterable via the enhanced for loop."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "تُرجع دالة Enum.values() مصفوفة بقيم التعداد مما يجعل المرور عليها بحلقة for-each في غاية السهولة."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Benchmark: For-Each vs Classic Index vs Stream (المثال 11: مقارنة أداء حلقة for-each مع الفهارس والتدفقات)"
            },
            {
              type: "paragraph",
              text: "Benchmarking 10 million integers across all three iteration styles."
            },
            {
              type: "code",
              language: "java",
              filename: "IterationStylesBenchmarkDemo.java",
              code: `import java.util.ArrayList;

public class IterationStylesBenchmarkDemo {
    public static void main(String[] args) {
        int count = 5_000_000;
        ArrayList<Integer> data = new ArrayList<>(count);
        for (int i = 0; i < count; i++) data.add(i);

        // 1. Classic Index Loop
        long start1 = System.currentTimeMillis();
        long sum1 = 0;
        for (int i = 0; i < data.size(); i++) sum1 += data.get(i);
        long time1 = System.currentTimeMillis() - start1;

        // 2. Enhanced For-Each Loop
        long start2 = System.currentTimeMillis();
        long sum2 = 0;
        for (int val : data) sum2 += val;
        long time2 = System.currentTimeMillis() - start2;

        System.out.println("Classic Index loop time: " + time1 + " ms");
        System.out.println("Enhanced For-Each time:   " + time2 + " ms");
        System.out.println("Both produce identical sum: " + (sum1 == sum2));
    }
}`,
              output: `Classic Index loop time: 18 ms
Enhanced For-Each time:   20 ms
Both produce identical sum: true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "Enhanced for-each loop incurs virtually zero performance penalty compared to classic index loops on ArrayLists."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "لا توجد أي خسارة ملحوظة في الأداء عند استخدام حلقة for-each المحسنة مقارنة بالحلقة التقليدية."
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
                "Mistake 1: Attempting to delete items from a collection inside an enhanced for loop using collection.remove(). Always use iterator.remove() or collection.removeIf().",
                "خطأ 1: محاولة حذف عناصر أثناء حلقة for-each بـ collection.remove؛ استخدم دائماً iterator.remove أو removeIf لمنع الانهيار.",
                "Mistake 2: Assuming that reassigning the loop variable 'x = newValue' updates an array cell. It only modifies the local loop variable.",
                "خطأ 2: الاعتقاد بأن تعديل متغير الحلقة يغير محتوى المصفوفة؛ فهو يعدل نسخته المؤقتة فقط.",
                "Mistake 3: Passing null as the target of an enhanced for loop ('for (X x : nullList)'), which throws a NullPointerException immediately.",
                "خطأ 3: تمرير قيمة null لهدف الحلقة المحسنة؛ مما يرمي استثناء NullPointerException فوراً عند محاولة جلب المكرر."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: High-Yield Transaction Validator (التحدي العملي: مدقق المعاملات المالية المرتفعة)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Create a class 'TransactionAuditEngine' that processes an array of Transactions (id, amount, status). Use enhanced for loops to: 1) Calculate total volume of 'APPROVED' transactions; 2) Early exit using 'break' if any transaction exceeds a fraud threshold of $1,000,000; 3) Mark validated transactions as 'AUDITED'. Test in main() with sample transactions."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: صمم فئة TransactionAuditEngine لمعالجة مصفوفة معاملات مالية (المعرف، المبلغ، الحالة). استخدم حلقات for-each لتحقيق: 1) حساب إجمالي المبالغ المعتمدة APPROVED؛ 2) الخروج الفوري بأمر break إذا تجاوزت أي معاملة حد الاحتيال مليون دولار؛ 3) تحديث حالة المعاملات المدققة إلى AUDITED. اختبرها في main واطبع النتائج."
            },
            {
              type: "code",
              language: "java",
              filename: "TransactionAuditChallenge.java",
              code: `import java.util.List;

public class TransactionAuditChallenge {
    static class Transaction {
        final String id;
        final double amount;
        String status;

        Transaction(String id, double amount, String status) {
            this.id = id;
            this.amount = amount;
            this.status = status;
        }

        @Override
        public String toString() { return id + " ($" + amount + " - " + status + ")"; }
    }

    public static void auditTransactions(List<Transaction> txList) {
        double approvedTotal = 0.0;
        boolean fraudDetected = false;

        for (Transaction tx : txList) {
            // Early break on fraud alert
            if (tx.amount > 1_000_000.0) {
                System.out.println(" [ALERT] Fraud threshold breached by " + tx.id + "! Halting audit!");
                fraudDetected = true;
                break;
            }

            if ("APPROVED".equals(tx.status)) {
                approvedTotal += tx.amount;
                tx.status = "AUDITED"; // Mutating object state safely
            }
        }

        System.out.println("Audit Complete. Fraud flagged: " + fraudDetected);
        System.out.println("Total Approved Volume Audited: $" + approvedTotal);
    }

    public static void main(String[] args) {
        List<Transaction> batch = List.of(
            new Transaction("TX-1", 5000.0, "APPROVED"),
            new Transaction("TX-2", 12000.0, "REJECTED"),
            new Transaction("TX-3", 45000.0, "APPROVED"),
            new Transaction("TX-4", 1_500_000.0, "SUSPICIOUS")
        );

        auditTransactions(batch);
        System.out.println("Batch state after audit: " + batch);
    }
}`,
              output: ` [ALERT] Fraud threshold breached by TX-4! Halting audit!
Audit Complete. Fraud flagged: true
Total Approved Volume Audited: $50000.0
Batch state after audit: [TX-1 ($5000.0 - AUDITED), TX-2 ($12000.0 - REJECTED), TX-3 ($45000.0 - AUDITED), TX-4 ($1500000.0 - SUSPICIOUS)]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "The enhanced for loop enables clean early termination via 'break' and mutates heap object state through references without modifying collection structure."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "تتيح حلقة for-each إنهاء الفحص مبكراً بأمر break مع تحديث خصائص الكائنات في الذاكرة دون المساس بسلامة اللائحة."
            }
          ],
          quiz: [
          {
                    "id": "enhanced-for-q1",
                    "question": "What requirement must an object meet to be valid as the expression on the right-hand side of Java's enhanced for-each loop (for (T x : expression))?",
                    "options": [
                              "It must implement java.io.Serializable",
                              "It must either be a Java array (primitive or reference array) or implement java.lang.Iterable<T>",
                              "It must implement java.util.Collection<T>",
                              "It must implement java.lang.Cloneable"
                    ],
                    "correctIndex": 1,
                    "explanation": "According to the Java Language Specification (JLS §14.14.2), the expression of an enhanced for loop must either be an array (e.g. int[], String[]) or an instance of a type that implements the java.lang.Iterable interface."
          },
          {
                    "id": "enhanced-for-q2",
                    "question": "How does the Java compiler (javac) lower and compile an enhanced for-loop over an array (int[] numbers)?",
                    "options": [
                              "It wraps the array in an ArrayList and uses an Iterator",
                              "It translates it into a traditional indexed for-loop: for (int i = 0; i < array.length; i++) with a cached array reference and length variable",
                              "It uses recursion on the JVM call stack",
                              "It converts the loop into a Java Stream pipeline"
                    ],
                    "correctIndex": 1,
                    "explanation": "For arrays, javac lowers the enhanced for-loop into a standard indexed loop: caching the array reference, storing array.length in a local variable, and iterating index 0 to length - 1. No Iterator or Collection objects are allocated."
          },
          {
                    "id": "enhanced-for-q3",
                    "question": "Why CANNOT an enhanced for-loop be used directly on a Map instance (e.g., for (var entry : map))?",
                    "options": [
                              "Maps cannot be iterated in Java",
                              "The Map interface does not extend java.lang.Iterable; to iterate, you must call map.entrySet(), map.keySet(), or map.values() which return Iterable collection views",
                              "Maps use hash codes instead of indices",
                              "Maps are always synchronized"
                    ],
                    "correctIndex": 1,
                    "explanation": "java.util.Map does not implement Iterable because a Map represents key-value associations rather than a single sequence of elements. To iterate, developers use map.entrySet(), map.keySet(), or map.values(), which all implement Collection / Iterable."
          },
          {
                    "id": "enhanced-for-q4",
                    "question": "What will the following code output?\n\nint[] arr = {1, 2, 3, 4};\nfor (int num : arr) {\n    num *= 10;\n}\nSystem.out.println(Arrays.toString(arr));",
                    "options": [
                              "[10, 20, 30, 40]",
                              "[1, 2, 3, 4]",
                              "[0, 0, 0, 0]",
                              "Throws ArrayStoreException"
                    ],
                    "correctIndex": 1,
                    "explanation": "The loop variable 'num' is a local copy of each primitive value from the array. Reassigning num *= 10 modifies only the local variable inside the loop scope; the original elements in 'arr' remain completely unchanged: [1, 2, 3, 4]."
          },
          {
                    "id": "enhanced-for-q5",
                    "question": "What happens when an object reference variable is modified inside an enhanced for-loop?\n\nclass Box { int val; Box(int v) { this.val = v; } }\n\nList<Box> boxes = List.of(new Box(5), new Box(10));\nfor (Box b : boxes) {\n    b.val += 1;\n}\nSystem.out.println(boxes.get(0).val + \" \" + boxes.get(1).val);",
                    "options": [
                              "\"5 10\" (fields cannot be modified in enhanced for loops)",
                              "\"6 11\" (mutating object state via the copied reference modifies the underlying heap object)",
                              "Throws UnsupportedOperationException",
                              "Throws ConcurrentModificationException"
                    ],
                    "correctIndex": 1,
                    "explanation": "Although the reference 'b' is a copy of the pointer stored in the list, calling b.val += 1 mutates the actual Box object on the heap that 'b' points to. The object state is modified, printing \"6 11\"."
          },
          {
                    "id": "enhanced-for-q6",
                    "question": "What will happen if the collection being iterated in an enhanced for-loop is null?\n\nList<String> list = null;\nfor (String s : list) {\n    System.out.println(s);\n}",
                    "options": [
                              "The loop body is skipped and execution proceeds normally",
                              "A NullPointerException is thrown immediately upon entering the for statement",
                              "The compiler prevents this from compiling",
                              "The loop executes once with s = null"
                    ],
                    "correctIndex": 1,
                    "explanation": "The compiled code attempts to call list.iterator() (or evaluate the array reference). Because list is null, calling iterator() throws a NullPointerException immediately when entering the loop."
          },
          {
                    "id": "enhanced-for-q7",
                    "question": "What is a major limitation of the enhanced for-loop compared to a traditional index-based for loop?",
                    "options": [
                              "It cannot iterate over collections with more than 100 elements",
                              "It does not expose an index counter, cannot modify the collection structure during iteration, cannot traverse in reverse, and cannot iterate multiple arrays in lockstep",
                              "It is significantly slower than index-based loops on ArrayLists",
                              "It cannot use break or continue statements"
                    ],
                    "correctIndex": 1,
                    "explanation": "Enhanced for-loops trade control for clean readability: there is no loop index i, you cannot iterate backwards or by steps > 1, you cannot iterate two collections simultaneously, and modifying collection structure causes ConcurrentModificationException."
          },
          {
                    "id": "enhanced-for-q8",
                    "question": "How does the enhanced for-loop compare to Iterable.forEach(Consumer) with respect to control flow?",
                    "options": [
                              "Iterable.forEach() supports 'break' and 'continue', while enhanced for-loop does not",
                              "The enhanced for-loop fully supports 'break', 'continue', 'return' from the enclosing method, and throwing checked exceptions, whereas Iterable.forEach() uses a lambda where break/continue are invalid and return only exits the current lambda invocation",
                              "There is zero difference between them",
                              "Enhanced for-loop cannot throw runtime exceptions"
                    ],
                    "correctIndex": 1,
                    "explanation": "Inside an enhanced for-loop, break terminates the loop, continue skips to the next iteration, return returns from the enclosing function, and checked exceptions propagate naturally. In forEach(lambda), break/continue are syntax errors, and return merely acts like continue for that single lambda invocation."
          },
          {
                    "id": "enhanced-for-q9",
                    "question": "How do you cleanly iterate over all values of a Java enum using an enhanced for-loop?",
                    "options": [
                              "for (Day d : Day.all())",
                              "for (Day d : Day.values())",
                              "for (Day d : Day.iterator())",
                              "for (Day d : Enum.getElements(Day.class))"
                    ],
                    "correctIndex": 1,
                    "explanation": "Java enums automatically provide a static values() method that returns an array of all enum constants in declaration order (e.g. Day[]). This array can be directly iterated: for (Day d : Day.values())."
          },
          {
                    "id": "enhanced-for-q10",
                    "question": "What is the output of the following nested loop with a labeled break?\n\nint count = 0;\nouter:\nfor (int[] row : new int[][]{{1, 2}, {3, 4}, {5, 6}}) {\n    for (int val : row) {\n        if (val == 3) break outer;\n        count += val;\n    }\n}\nSystem.out.println(count);",
                    "options": [
                              "3",
                              "7",
                              "1",
                              "21"
                    ],
                    "correctIndex": 0,
                    "explanation": "First row {1, 2}: val=1 -> count=1; val=2 -> count=3. Second row {3, 4}: val=3 matches val==3 -> break outer terminates both loops immediately. Final count is 3."
          },
          {
                    "id": "enhanced-for-q11",
                    "question": "What will happen if you call list.remove() inside an enhanced for-loop in Java?\n\nList<String> names = new ArrayList<>(List.of(\"Alice\", \"Bob\", \"Charlie\"));\nfor (String name : names) {\n    if (name.startsWith(\"B\")) {\n        names.remove(name);\n    }\n}",
                    "options": [
                              "\"Bob\" is cleanly removed without issues",
                              "A ConcurrentModificationException is thrown when the hidden iterator advances",
                              "The loop silently skips \"Charlie\"",
                              "A compile-time error occurs"
                    ],
                    "correctIndex": 1,
                    "explanation": "The compiler generates a hidden Iterator behind the scenes. Modifying the list directly via names.remove() alters modCount without updating expectedModCount, triggering a ConcurrentModificationException on the next iterator check."
          },
          {
                    "id": "enhanced-for-q12",
                    "question": "What is the recommended idiom for iterating over Map entries using an enhanced for-loop?",
                    "options": [
                              "for (Map.Entry<K, V> entry : map.entrySet())",
                              "for (K key : map.keySet()) { V val = map.get(key); }",
                              "for (Object o : map)",
                              "for (V value : map.values())"
                    ],
                    "correctIndex": 0,
                    "explanation": "Iterating over map.entrySet() via for (Map.Entry<K, V> entry : map.entrySet()) provides direct access to both key and value from each Map.Entry object in a single pass without redundant hash lookups."
          },
          {
                    "id": "enhanced-for-q13",
                    "question": "What is the output of the following code?\n\nString[] letters = {\"A\", \"B\", \"C\"};\nfor (String s : letters) {\n    s = s.toLowerCase();\n}\nSystem.out.println(letters[0] + letters[1] + letters[2]);",
                    "options": [
                              "\"abc\"",
                              "\"ABC\"",
                              "\"aBc\"",
                              "Throws NullPointerException"
                    ],
                    "correctIndex": 1,
                    "explanation": "The variable 's' holds a copy of the reference to the String in letters[i]. Reassigning s = s.toLowerCase() merely points the local variable 's' to a new String object. The original elements in the 'letters' array are not altered, remaining \"ABC\"."
          },
          {
                    "id": "enhanced-for-q14",
                    "question": "Which of the following classes CANNOT be the target of an enhanced for-loop?",
                    "options": [
                              "java.util.ArrayDeque",
                              "java.util.PriorityQueue",
                              "java.util.Optional",
                              "java.nio.file.Path"
                    ],
                    "correctIndex": 2,
                    "explanation": "ArrayDeque and PriorityQueue implement Queue (which extends Collection -> Iterable). Path implements Iterable<Path> (for iterating name elements). java.util.Optional does NOT implement Iterable, so it cannot be directly used in an enhanced for-loop."
          },
          {
                    "id": "enhanced-for-q15",
                    "question": "Analyze the following code:\n\nList<Integer> list = List.of(10, 20, 30, 40);\nint sum = 0;\nfor (final int x : list) {\n    sum += x;\n}\nSystem.out.println(sum);",
                    "options": [
                              "Compilation error because 'final' is illegal on the loop variable of an enhanced for-loop",
                              "100",
                              "Throws UnsupportedOperationException because list is immutable",
                              "0"
                    ],
                    "correctIndex": 1,
                    "explanation": "Declaring the loop variable 'final' (e.g. final int x) is completely legal in an enhanced for-loop. It ensures that 'x' cannot be reassigned within the loop body. The loop computes 10 + 20 + 30 + 40 = 100."
          }
]
        }
      ]
    },

    /* ==========================================================================
       TOPIC 72: Java Generics
       ========================================================================== */
    {
      id: "java-generics",
      title: "72. Java Generics",
      description: "Comprehensive mastery of Java Generics: compile-time type safety, eliminating ClassCastException, generic classes, interfaces, and methods, bounded type parameters (<T extends Number>), wildcard variance (? extends T vs ? super T), the PECS rule (Producer Extends, Consumer Super), type erasure mechanics, and generic restrictions.",
      lessons: [
        {
          id: "java-generics-mastery",
          title: "Complete Guide to Java Generics",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "Generics Architecture & Compile-Time Type Safety (هندسة التعميم وسلامة الأنواع أثناء الترجمة)"
            },
            {
              type: "paragraph",
              text: "Introduced in Java 5, Generics enable types (classes and interfaces) to be parameters when defining classes, interfaces, and methods. Before Generics, collections stored raw 'Object' instances, requiring manual casting and making programs vulnerable to runtime 'ClassCastException'. Generics provide compile-time type checking, automatically verifying that types match before the program runs. Crucially, Java implements Generics using 'Type Erasure' to maintain backwards compatibility with pre-Java 5 bytecode: the compiler erases all generic type parameters at compile time, replacing them with their upper bounds (or 'Object' if unbounded) and inserting synthetic cast instructions where necessary."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "قُدمت الأنواع المعممة (Generics) في جافا 5 لتمكين تمرير الأنواع كمعاملات عند تعريف الفئات والواجهات والدوال. قبل التعميم، كانت المجموعات تخزن كائنات Object عامة، مما كان يتطلب تحويلاً قسرياً يدوياً (Casting) ويعرض البرامج لانهيارات مفاجئة أثناء التشغيل باستثناء 'ClassCastException'. وفرت Generics فحصاً صارماً لصحة الأنواع أثناء الترجمة (Compile-time Type Safety). وتطبق جافا التعميم عبر آلية هندسية تُدعى 'محو الأنواع' (Type Erasure) للمحافظة على التوافقية مع الأنظمة القديمة؛ حيث يمحو المترجم معلومات التعميم ويستبدلها بـ Object أو الحدود العليا ويضيف التحويلات تلقائياً."
            },
            {
              type: "paragraph",
              text: "The PECS Golden Rule: 'Producer Extends, Consumer Super'. If you need to read items from a generic collection, use '? extends T' (covariance / Producer). If you need to write items to a generic collection, use '? super T' (contravariance / Consumer). If you need to both read and write, do not use wildcards."
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
              text: "Example 1: The Raw Type Hazard vs Generic Type Safety (المثال 1: خطر الأنواع الخام مقابل أمان التعميم)"
            },
            {
              type: "paragraph",
              text: "Demonstrating how Generics catch bugs at compile-time instead of runtime."
            },
            {
              type: "code",
              language: "java",
              filename: "RawTypesVsGenericsDemo.java",
              code: `import java.util.ArrayList;
import java.util.List;

public class RawTypesVsGenericsDemo {
    public static void main(String[] args) {
        // Pre-Java 5 Raw Type: accepts ANY Object
        List rawList = new ArrayList();
        rawList.add("Valid String");
        rawList.add(12345); // Accidental integer inserted!

        try {
            // Runtime crash during casting!
            for (Object obj : rawList) {
                String str = (String) obj; // Throws ClassCastException on second element!
            }
        } catch (ClassCastException e) {
            System.out.println("Pre-Java 5 Crash: " + e.getMessage());
        }

        // Modern Generic List: Compiler catches error instantly!
        List<String> typeSafeList = new ArrayList<>();
        typeSafeList.add("Valid String");
        // typeSafeList.add(12345); // COMPILER ERROR: Incompatible types!

        System.out.println("Generic List guarantees zero runtime ClassCastExceptions!");
    }
}`,
              output: `Pre-Java 5 Crash: class java.lang.Integer cannot be cast to class java.lang.String (java.lang.Integer and java.lang.String are in module java.base of loader 'bootstrap')
Generic List guarantees zero runtime ClassCastExceptions!`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "Generics move type verification from runtime execution to compile-time compilation, catching errors before deployment."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "تنقل Generics التحقق من صحة الأنواع من وقت التشغيل إلى وقت الترجمة، مما يكتشف الأخطاء قبل تشغيل البرنامج."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Generic Class with Single Type Parameter (المثال 2: فئة معقمة بمعامل نوع واحد)"
            },
            {
              type: "paragraph",
              text: "Building a type-safe generic Box<T> container."
            },
            {
              type: "code",
              language: "java",
              filename: "GenericBoxDemo.java",
              code: `public class GenericBoxDemo {
    static class Box<T> {
        private T content;

        public void put(T content) {
            this.content = content;
        }

        public T get() {
            return content;
        }
    }

    public static void main(String[] args) {
        Box<String> stringBox = new Box<>();
        stringBox.put("Hello Generics");
        String s = stringBox.get(); // No casting required!
        System.out.println("String Box contains: " + s);

        Box<Integer> intBox = new Box<>();
        intBox.put(42);
        Integer n = intBox.get(); // No casting required!
        System.out.println("Integer Box contains: " + n);
    }
}`,
              output: `String Box contains: Hello Generics
Integer Box contains: 42`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "Box<T> works with any object type while preserving full compile-time type verification."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "تعمل الفئة Box<T> مع أي نوع كائنات مع ضمان التحقق الصارم من النوع دون الحاجة للتحويل القسري."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Multi-Parameter Generic Pair<K, V> (المثال 3: فئة معقمة بزوج من المعاملات)"
            },
            {
              type: "paragraph",
              text: "Implementing a two-type tuple container."
            },
            {
              type: "code",
              language: "java",
              filename: "GenericPairDemo.java",
              code: `public class GenericPairDemo {
    static class Pair<K, V> {
        private final K key;
        private final V value;

        public Pair(K key, V value) {
            this.key = key;
            this.value = value;
        }

        public K getKey() { return key; }
        public V getValue() { return value; }

        @Override
        public String toString() { return "(" + key + " => " + value + ")"; }
    }

    public static void main(String[] args) {
        Pair<String, Integer> studentAge = new Pair<>("Alice", 21);
        Pair<Integer, String> httpResponse = new Pair<>(200, "OK");

        System.out.println("Student:  " + studentAge);
        System.out.println("Response: " + httpResponse);
    }
}`,
              output: `Student:  (Alice => 21)
Response: (200 => OK)`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "Multiple type parameters like <K, V> allow modeling associations and key-value tuples cleanly."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "تتيح المعاملات المتعددة مثل <K, V> نمذجة الأزواج والارتباطات بين المفاتيح والقيم بوضوح."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Standalone Generic Methods (المثال 4: الدوال المعممة المستقلة)"
            },
            {
              type: "paragraph",
              text: "Declaring generic type parameters on individual static methods."
            },
            {
              type: "code",
              language: "java",
              filename: "GenericMethodDemo.java",
              code: `import java.util.Arrays;

public class GenericMethodDemo {
    // Generic method syntax: <T> placed before return type!
    public static <T> void swap(T[] array, int i, int j) {
        T temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    public static void main(String[] args) {
        String[] words = {"First", "Second"};
        swap(words, 0, 1);
        System.out.println("Swapped Strings: " + Arrays.toString(words));

        Integer[] numbers = {100, 200};
        swap(numbers, 0, 1);
        System.out.println("Swapped Integers: " + Arrays.toString(numbers));
    }
}`,
              output: `Swapped Strings: [Second, First]
Swapped Integers: [200, 100]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "Placing <T> before the return type marks a method as generic, inferring T from the caller's arguments."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "وضع <T> قبل نوع القيمة المعادة يعرّف الدالة كدالة معقمة تستنتج النوع تلقائياً من المعاملات الممررة."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Bounded Type Parameters (<T extends Number>) (المثال 5: تقييد الأنواع المعممة)"
            },
            {
              type: "paragraph",
              text: "Restricting type parameters to subclasses of a specific class or interface."
            },
            {
              type: "code",
              language: "java",
              filename: "BoundedTypeDemo.java",
              code: `public class BoundedTypeDemo {
    // T must be a subclass of Number (Integer, Double, Float, Long, etc.)
    static class NumberCalculator<T extends Number> {
        private final T number;

        public NumberCalculator(T number) {
            this.number = number;
        }

        public double square() {
            // Because T extends Number, we can safely call doubleValue()!
            return number.doubleValue() * number.doubleValue();
        }
    }

    public static void main(String[] args) {
        NumberCalculator<Integer> intCalc = new NumberCalculator<>(5);
        System.out.println("Square of 5:   " + intCalc.square());

        NumberCalculator<Double> dblCalc = new NumberCalculator<>(2.5);
        System.out.println("Square of 2.5: " + dblCalc.square());

        // NumberCalculator<String> strCalc; // COMPILER ERROR! String does not extend Number!
    }
}`,
              output: `Square of 5:   25.0
Square of 2.5: 6.25`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "<T extends Number> restricts types to numbers and unlocks access to Number's methods like doubleValue()."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "تقيد الصياغة <T extends Number> النوع بالأرقام فقط وتتيح استخدام دوال فئة Number مثل doubleValue()."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Multiple Bounds (<T extends Comparable<T> & Serializable>) (المثال 6: الحدود المتعددة)"
            },
            {
              type: "paragraph",
              text: "Requiring a type parameter to satisfy multiple interface contracts."
            },
            {
              type: "code",
              language: "java",
              filename: "MultipleBoundsDemo.java",
              code: `public class MultipleBoundsDemo {
    // T must implement Comparable AND extend Object
    public static <T extends Comparable<T>> T findMax(T a, T b) {
        return (a.compareTo(b) >= 0) ? a : b;
    }

    public static void main(String[] args) {
        System.out.println("Max of 15 and 42:    " + findMax(15, 42));
        System.out.println("Max of 'Cat' and 'Dog': " + findMax("Cat", "Dog"));
    }
}`,
              output: `Max of 15 and 42:    42
Max of 'Cat' and 'Dog': Dog`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "Bounding with <T extends Comparable<T>> allows calling compareTo() safely inside the generic method."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "تقييد النوع بـ Comparable<T> يضمن توفر دالة compareTo لاستخدامها في المقارنة بأمان."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Upper-Bounded Wildcard (? extends T) (Producer) (المثال 7: المحرف البديل المقيد للأعلى - المنتج)"
            },
            {
              type: "paragraph",
              text: "Reading from a collection of subtypes using covariance."
            },
            {
              type: "code",
              language: "java",
              filename: "UpperBoundedWildcardDemo.java",
              code: `import java.util.List;

public class UpperBoundedWildcardDemo {
    // List<? extends Number> accepts List<Integer>, List<Double>, List<Float>
    public static double sumOfList(List<? extends Number> list) {
        double sum = 0.0;
        for (Number n : list) {
            sum += n.doubleValue(); // Reading is safe!
        }
        // list.add(10); // COMPILER ERROR: Cannot write into a ? extends producer!
        return sum;
    }

    public static void main(String[] args) {
        List<Integer> intList = List.of(1, 2, 3);
        List<Double> doubleList = List.of(1.5, 2.5, 3.5);

        System.out.println("Sum of Integers: " + sumOfList(intList));
        System.out.println("Sum of Doubles:  " + sumOfList(doubleList));
    }
}`,
              output: `Sum of Integers: 6.0
Sum of Doubles:  7.5`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "? extends T (Producer) lets you read elements as T, accepting any list of T's subtypes, but prohibits adding elements."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "تتيح ? extends T قراءة العناصر كنوع T وتقبل أي قائمة فرعية منه، ولكنها تمنع إضافة عناصر جديدة لحماية النوع."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Lower-Bounded Wildcard (? super T) (Consumer) (المثال 8: المحرف البديل المقيد للأسفل - المستهلك)"
            },
            {
              type: "paragraph",
              text: "Writing into a collection of supertypes using contravariance."
            },
            {
              type: "code",
              language: "java",
              filename: "LowerBoundedWildcardDemo.java",
              code: `import java.util.ArrayList;
import java.util.List;

public class LowerBoundedWildcardDemo {
    // List<? super Integer> can consume Integers into List<Integer>, List<Number>, or List<Object>
    public static void addIntegers(List<? super Integer> list) {
        for (int i = 1; i <= 3; i++) {
            list.add(i); // Writing Integer is 100% safe!
        }
    }

    public static void main(String[] args) {
        List<Number> numList = new ArrayList<>();
        addIntegers(numList);

        List<Object> objList = new ArrayList<>();
        addIntegers(objList);

        System.out.println("Numbers list: " + numList);
        System.out.println("Objects list: " + objList);
    }
}`,
              output: `Numbers list: [1, 2, 3]
Objects list: [1, 2, 3]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "? super T (Consumer) allows adding T instances into any collection holding T or its superclasses."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "تتيح ? super T (المستهلك) إضافة كائنات من نوع T بأمان تام إلى أي قائمة تقبل T أو فئاته الأب."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: The PECS Rule in Collections.copy() (المثال 9: تطبيق قاعدة PECS الذهبية)"
            },
            {
              type: "paragraph",
              text: "Examining the JDK signature: Collections.copy(List<? super T> dest, List<? extends T> src)."
            },
            {
              type: "code",
              language: "java",
              filename: "PecsInActionDemo.java",
              code: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class PecsInActionDemo {
    // PECS: src PRODUCES elements (? extends T), dest CONSUMES elements (? super T)
    public static <T> void customCopy(List<? super T> dest, List<? extends T> src) {
        for (T item : src) {
            dest.add(item);
        }
    }

    public static void main(String[] args) {
        List<Integer> integers = List.of(10, 20, 30);
        List<Number> numbers = new ArrayList<>();

        // customCopy(dest, src) works seamlessly across hierarchy!
        customCopy(numbers, integers);

        System.out.println("Copied into List<Number>: " + numbers);
    }
}`,
              output: `Copied into List<Number>: [10, 20, 30]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "PECS guarantees maximum flexibility: the source produces T items (? extends T), and the destination consumes them (? super T)."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "تضمن قاعدة PECS أقصى مرونة: المصدر ينتج عناصر (? extends T) والهدف يستهلكها ويخزنها (? super T)."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Type Erasure Proof at Runtime (المثال 10: إثبات محو الأنواع في وقت التشغيل)"
            },
            {
              type: "paragraph",
              text: "Verifying that List<String> and List<Integer> share the exact same runtime Class."
            },
            {
              type: "code",
              language: "java",
              filename: "TypeErasureProofDemo.java",
              code: `import java.util.ArrayList;
import java.util.List;

public class TypeErasureProofDemo {
    public static void main(String[] args) {
        List<String> strList = new ArrayList<>();
        List<Integer> intList = new ArrayList<>();

        // At runtime, both share the exact same raw ArrayList class!
        boolean sameClass = strList.getClass() == intList.getClass();

        System.out.println("strList runtime class: " + strList.getClass().getName());
        System.out.println("intList runtime class: " + intList.getClass().getName());
        System.out.println("Are runtime classes identical? " + sameClass);
    }
}`,
              output: `strList runtime class: java.util.ArrayList
intList runtime class: java.util.ArrayList
Are runtime classes identical? true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "Because of Type Erasure, generic parameters exist only during compilation. At runtime, both instances are plain java.util.ArrayList."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "بسبب محو الأنواع، تُمحى معلمات التعميم بعد الترجمة؛ وعند التشغيل يشترك الاثنان في نفس فئة ArrayList الخام."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Restrictions of Generics in Java (المثال 11: القيود المفروضة على التعميم)"
            },
            {
              type: "paragraph",
              text: "Understanding what you CANNOT do with generics (no primitives, no new T(), no T[] arrays)."
            },
            {
              type: "code",
              language: "java",
              filename: "GenericRestrictionsDemo.java",
              code: `public class GenericRestrictionsDemo {
    static class Restricted<T> {
        // 1. CANNOT instantiate type parameter directly:
        // T obj = new T(); // COMPILER ERROR!

        // 2. CANNOT create generic arrays:
        // T[] array = new T[10]; // COMPILER ERROR!

        // 3. CANNOT use static fields with class type parameter:
        // static T shared; // COMPILER ERROR!

        // Workaround for instantiation: pass Class<T> factory
        public T createInstance(Class<T> clazz) throws Exception {
            return clazz.getDeclaredConstructor().newInstance();
        }
    }

    public static void main(String[] args) throws Exception {
        Restricted<StringBuilder> helper = new Restricted<>();
        StringBuilder sb = helper.createInstance(StringBuilder.class);
        sb.append("Created via reflection factory workaround!");

        System.out.println(sb);
    }
}`,
              output: `Created via reflection factory workaround!`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "Because types are erased, the JVM cannot know what 'new T()' or 'new T[10]' means. Workarounds require passing Class<T> tokens."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "نظراً لمحو الأنواع، تعجز الآلة الافتراضية عن معرفة حجم new T()؛ ولتجاوز ذلك يتم تمرير فئة الانعكاس Class<T>."
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
                "Mistake 1: Believing that List<Integer> is a subtype of List<Number>. Generics are INVARIANT! A List<Integer> is NOT a List<Number>.",
                "خطأ 1: الاعتقاد بأن List<Integer> ترث من List<Number>؛ الأنواع المعممة ثابتة (Invariant) ولا يوجد بينهما علاقة وراثة دون استخدام المحارف البديلة ? extends.",
                "Mistake 2: Trying to use primitive types as type arguments (e.g. List<int>). You must use wrapper types like List<Integer>.",
                "خطأ 2: محاولة استخدام الأنواع البدائية مثل List<int>؛ يجب استخدام فئات التغليف مثل List<Integer>.",
                "Mistake 3: Trying to call 'new T()' or 'new T[10]' directly. Type erasure makes type parameters unavailable at runtime.",
                "خطأ 3: محاولة إنشاء كائن أو مصفوفة من النوع المعمم مباشرة بـ new T() بسبب محو الأنواع."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Type-Safe Dynamic Event Bus (التحدي العملي: ناقل أحداث معمّم آمن الأنواع)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Create a class 'GenericEventBus' that allows registering listeners for specific event types. Implement: 1) '<T> void register(Class<T> eventType, Consumer<T> listener)'; 2) '<T> void publish(T event)'. Ensure full compile-time and runtime type safety using Map<Class<?>, List<Consumer<?>>>. Test in main() with UserLoginEvent and OrderPlacedEvent."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: صمم فئة GenericEventBus لتسجيل مستمعي الأحداث ونشرها بأمان تام. نفّذ: 1) register لتسجيل مستمع لحدث معين Class<T>؛ 2) publish لنشر الحدث واستدعاء المستمعين المناسبين له. اختبرها في main بنشر حدثين مختلفين مثل UserLoginEvent و OrderPlacedEvent."
            },
            {
              type: "code",
              language: "java",
              filename: "GenericEventBusChallenge.java",
              code: `import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Consumer;

public class GenericEventBusChallenge {
    static class GenericEventBus {
        private final Map<Class<?>, List<Consumer<?>>> listeners = new HashMap<>();

        public <T> void register(Class<T> eventType, Consumer<T> listener) {
            listeners.computeIfAbsent(eventType, k -> new ArrayList<>()).add(listener);
        }

        @SuppressWarnings("unchecked")
        public <T> void publish(T event) {
            List<Consumer<?>> eventListeners = listeners.get(event.getClass());
            if (eventListeners != null) {
                for (Consumer<?> listener : eventListeners) {
                    ((Consumer<T>) listener).accept(event);
                }
            }
        }
    }

    // Sample Event Types
    static class UserLoginEvent {
        final String username;
        UserLoginEvent(String username) { this.username = username; }
    }

    static class OrderPlacedEvent {
        final int orderId;
        final double amount;
        OrderPlacedEvent(int id, double amt) { this.orderId = id; this.amount = amt; }
    }

    public static void main(String[] args) {
        GenericEventBus bus = new GenericEventBus();

        // Register handlers with compile-time type safety
        bus.register(UserLoginEvent.class, e -> {
            System.out.println(" [AUDIT] User logged in: " + e.username);
        });

        bus.register(OrderPlacedEvent.class, e -> {
            System.out.println(" [BILLING] Order #" + e.orderId + " placed for $" + e.amount);
        });

        // Publish events
        bus.publish(new UserLoginEvent("ahmed_99"));
        bus.publish(new OrderPlacedEvent(1005, 299.99));
    }
}`,
              output: ` [AUDIT] User logged in: ahmed_99
 [BILLING] Order #1005 placed for $299.99`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "By keying listeners on Class<T> and utilizing generic methods, the EventBus delivers events strictly to their matching consumers."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "بربط المستمعين بفئة الحدث Class<T> واستخدام الدوال المعممة، يرسل ناقل الأحداث كل كائن للمستمعين المتطابقين معه بدقة."
            }
          ],
          quiz: [
          {
                    "id": "generics-mastery-q1",
                    "question": "What primary problem did Java Generics solve when introduced in Java 5?",
                    "options": [
                              "It accelerated multi-threaded garbage collection",
                              "It replaced error-prone runtime ClassCastExceptions with compile-time type safety and eliminated the need for manual type casting on collection retrieval",
                              "It allowed Java classes to inherit from multiple abstract parent classes",
                              "It eliminated memory overhead by converting all objects into primitive types"
                    ],
                    "correctIndex": 1,
                    "explanation": "Prior to Java 5, collections stored raw Objects, requiring manual casts upon extraction and risking runtime ClassCastExceptions if an incompatible type was inserted. Generics enforce type constraints at compile time, eliminating manual casting and preventing type mismatches before runtime."
          },
          {
                    "id": "generics-mastery-q2",
                    "question": "What is 'Type Erasure' in the Java compiler?",
                    "options": [
                              "The permanent removal of variable names from bytecode to conserve disk space",
                              "The compilation process where type parameters are replaced with their upper bounds (or Object) and appropriate type casts are automatically inserted into bytecode, maintaining backward compatibility with pre-Java 5 JVMs",
                              "A runtime memory cleanup pass performed by the HotSpot JIT compiler",
                              "The deletion of unused generic classes during classloading"
                    ],
                    "correctIndex": 1,
                    "explanation": "Java implements generics via type erasure: the compiler checks type safety at compile time, then erases all type parameters (replacing unbound parameters with Object or bound parameters with their upper bound) and inserts synthetic casts into the bytecode. At runtime, the JVM has no knowledge of generic type arguments."
          },
          {
                    "id": "generics-mastery-q3",
                    "question": "What will the following code print at runtime?\n\nList<String> strList = new ArrayList<>();\nList<Integer> intList = new ArrayList<>();\nSystem.out.println(strList.getClass() == intList.getClass());",
                    "options": [
                              "false",
                              "true",
                              "A compile-time error occurs because String and Integer are incompatible",
                              "Throws ClassCastException"
                    ],
                    "correctIndex": 1,
                    "explanation": "Due to type erasure, the generic type arguments <String> and <Integer> are stripped during compilation. At runtime, both strList and intList share the exact same raw Class object: java.util.ArrayList.class. Therefore, the equality comparison returns true."
          },
          {
                    "id": "generics-mastery-q4",
                    "question": "Why does the following generic method fail to compile?\n\nclass Container<T> {\n    T item;\n    public void init() {\n        item = new T();\n    }\n}",
                    "options": [
                              "init() must be declared static",
                              "Type parameters cannot be instantiated directly with 'new T()' because the concrete type is erased at runtime, leaving the JVM unable to determine which constructor to call",
                              "Container must extend Object explicitly",
                              "Generics only permit primitive types"
                    ],
                    "correctIndex": 1,
                    "explanation": "Because of type erasure, T is erased to Object at runtime; the compiler does not know what concrete class T represents or whether it even has an accessible no-arg constructor. Instantiating type parameters via new T() is strictly forbidden."
          },
          {
                    "id": "generics-mastery-q5",
                    "question": "Why is List<Integer> NOT a subtype of List<Number> in Java, even though Integer is a subclass of Number?",
                    "options": [
                              "Number is an abstract class",
                              "Generics are invariant: if List<Integer> were a subtype of List<Number>, one could add a Double into a List<Integer> via a List<Number> reference, destroying type safety",
                              "Java does not support inheritance with interfaces",
                              "Integer uses 32 bits while Number uses 64 bits"
                    ],
                    "correctIndex": 1,
                    "explanation": "Generic types are invariant. If List<Integer> were assignable to List<Number>, you could do: List<Number> numList = intList; numList.add(3.14); which would place a Double inside a list of Integers, causing type corruption when reading. Invariance prevents this."
          },
          {
                    "id": "generics-mastery-q6",
                    "question": "What does the PECS mnemonic ('Producer Extends, Consumer Super') dictate when designing generic methods?",
                    "options": [
                              "Use ? super when reading data and ? extends when writing data",
                              "Use '? extends T' for sources that produce/provide data to be read, and '? super T' for destinations that consume/accept data to be written",
                              "Always use ? extends for collections with even sizes and ? super for odd sizes",
                              "Use extends for classes and super for interfaces"
                    ],
                    "correctIndex": 1,
                    "explanation": "PECS means: If a collection produces items (you only read from it), use <? extends T>. If a collection consumes items (you write items into it), use <? super T>. A classic example is Collections.copy(List<? super T> dest, List<? extends T> src)."
          },
          {
                    "id": "generics-mastery-q7",
                    "question": "What happens if you try to add an element to a List<? extends Number> (an upper-bounded wildcard)?\n\nList<? extends Number> list = new ArrayList<Integer>();\nlist.add(10);",
                    "options": [
                              "It compiles and adds 10 normally",
                              "It throws an UnsupportedOperationException at runtime",
                              "It results in a compile-time error because the compiler cannot guarantee the exact concrete subtype of Number the list actually holds (only null can be added)",
                              "It adds the element by converting it to Double"
                    ],
                    "correctIndex": 2,
                    "explanation": "List<? extends Number> represents a list of some unknown subtype of Number (could be List<Double>, List<BigDecimal>, etc.). The compiler refuses any add() operation (except null) because it cannot verify that the added object matches the actual runtime type parameter."
          },
          {
                    "id": "generics-mastery-q8",
                    "question": "What is permitted when using a lower-bounded wildcard List<? super Integer>?\n\nList<? super Integer> list = new ArrayList<Number>();",
                    "options": [
                              "You can safely add Integer (and its subtypes) into the list, but reading from the list yields elements of type Object",
                              "You can only add Number instances, not Integers",
                              "You can read elements typed as Integer directly without casting",
                              "Lower-bounded wildcards are illegal in Java syntax"
                    ],
                    "correctIndex": 0,
                    "explanation": "With List<? super Integer>, the list holds some unknown supertype of Integer (e.g. Number or Object). Therefore, adding an Integer is guaranteed to be safe. However, when reading from it, the only guaranteed common ancestor is Object."
          },
          {
                    "id": "generics-mastery-q9",
                    "question": "Which of the following generic array declarations will fail to compile in Java?",
                    "options": [
                              "List<?>[] arrayOfLists = new List<?>[10];",
                              "String[] strings = new String[10];",
                              "List<String>[] arrayOfLists = new List<String>[10];",
                              "Object[] objects = new Object[10];"
                    ],
                    "correctIndex": 2,
                    "explanation": "Java prohibits creating arrays of concrete parameterized types (new List<String>[10]) because arrays are covariant and reified at runtime, whereas generics are erased. Creating generic arrays would lead to unchecked heap pollution without compile-time guarantees."
          },
          {
                    "id": "generics-mastery-q10",
                    "question": "What is the correct syntax for declaring multiple bounds on a generic type parameter?",
                    "options": [
                              "<T extends Comparable<T> & Serializable>",
                              "<T extends Comparable<T>, Serializable>",
                              "<T implements Comparable<T> & Serializable>",
                              "<T extends Comparable<T> + Serializable>"
                    ],
                    "correctIndex": 0,
                    "explanation": "Multiple bounds use the '&' operator: <T extends ClassA & InterfaceB & InterfaceC>. If one of the bounds is a class, it must appear first, followed by interfaces."
          },
          {
                    "id": "generics-mastery-q11",
                    "question": "Where must the type parameter be placed when declaring a standalone generic method in a non-generic class?",
                    "options": [
                              "Immediately after the class name",
                              "Immediately before the method return type: public static <T> void print(T item)",
                              "Inside the parameter list: public static void print(<T> T item)",
                              "After the method throws clause"
                    ],
                    "correctIndex": 1,
                    "explanation": "A generic method declares its type parameter(s) inside angle brackets right before the return type: public static <T> T identity(T val)."
          },
          {
                    "id": "generics-mastery-q12",
                    "question": "Why does the expression 'o instanceof List<String>' produce a compilation error in Java?",
                    "options": [
                              "instanceof only works on primitive types",
                              "Because of type erasure, type arguments like <String> do not exist at runtime, making it impossible for the JVM to inspect whether the elements inside the list are Strings",
                              "List is an interface, and instanceof only works on classes",
                              "String is marked final"
                    ],
                    "correctIndex": 1,
                    "explanation": "Because generic type parameters are erased at runtime, the JVM only knows that an object is a List, not what type of elements it holds. The compiler rejects 'instanceof List<String>' because the type argument cannot be reified. Only unbounded wildcards ('instanceof List<?>') are permitted."
          },
          {
                    "id": "generics-mastery-q13",
                    "question": "What is the purpose of the @SafeVarargs annotation in Java?",
                    "options": [
                              "It suppresses compiler warnings about potential heap pollution when a method declares a generic varargs parameter, asserting that the method does not perform unsafe operations on the varargs array",
                              "It makes a method thread-safe by locking the varargs array",
                              "It dynamically converts varargs arrays into ArrayLists at runtime",
                              "It restricts the varargs parameter to exactly 5 arguments"
                    ],
                    "correctIndex": 0,
                    "explanation": "@SafeVarargs can be applied to final methods, static methods, or constructors with generic varargs. It instructs the compiler that the method implementation does not perform unsafe writes to the underlying array, suppressing heap pollution warnings at call sites."
          },
          {
                    "id": "generics-mastery-q14",
                    "question": "What is the output of the following generic method?\n\npublic static <T extends Number> double sum(T a, T b) {\n    return a.doubleValue() + b.doubleValue();\n}\n\nSystem.out.println(sum(10, 20.5));",
                    "options": [
                              "\"30.5\"",
                              "Compile-time error because 10 is Integer and 20.5 is Double, and both arguments must share the same type T",
                              "30.0",
                              "Throws ClassCastException"
                    ],
                    "correctIndex": 0,
                    "explanation": "The compiler infers T as the lowest common supertype of Integer and Double that satisfies <T extends Number>, which is Number! Both 10 (Integer) and 20.5 (Double) are Numbers, so T=Number is inferred, and a.doubleValue() + b.doubleValue() computes 10.0 + 20.5 = 30.5."
          },
          {
                    "id": "generics-mastery-q15",
                    "question": "Why cannot static fields or static methods in a generic class GenericBox<T> reference the type parameter T?",
                    "options": [
                              "Static members belong to the raw class shared across all parameterized instances (e.g. GenericBox<String> and GenericBox<Integer>), whereas T is tied to individual object instances",
                              "Static fields are stored in the heap, while T is stored on the thread stack",
                              "The static keyword disables type checking",
                              "Static variables can only be primitive types"
                    ],
                    "correctIndex": 0,
                    "explanation": "A generic class GenericBox<T> has only one Class object loaded by the JVM shared by all instances regardless of their type arguments. If a static field were typed as T, it would be ambiguous what T refers to when both GenericBox<String> and GenericBox<Integer> exist."
          }
]
        }
      ]
    }
  ];
})();
