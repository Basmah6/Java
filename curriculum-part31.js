/**
 * Java Curriculum Module - Part 31
 * Topics:
 * 61. Java Set
 * 62. Java HashSet
 * 
 * 100% Offline, Pure JavaScript. Complete educational content with full bilingual (English & Arabic) explanations.
 */

(function () {
  'use strict';

  window.JAVA_TOPICS_PART31 = [
    /* ==========================================================================
       TOPIC 61: Java Set
       ========================================================================== */
    {
      id: "java-set",
      title: "61. Java Set",
      description: "Mastering the java.util.Set interface: mathematical set abstractions, uniqueness guarantee, rejection of duplicates, Set.of immutable factories, mathematical set algebra (union, intersection, difference, subset), and choosing among concrete Set implementations.",
      lessons: [
        {
          id: "java-set-mastery",
          title: "Complete Guide to Java Set Interface",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "The Uniqueness Contract: java.util.Set (عقد العناصر الفريدة: واجهة java.util.Set)"
            },
            {
              type: "paragraph",
              text: "The 'java.util.Set' interface models the mathematical set abstraction. A Set is a Collection that contains no duplicate elements: no two elements e1 and e2 can exist such that e1.equals(e2), and at most one null element can be stored (in implementations that permit nulls). Unlike List, the general Set contract does NOT guarantee positional indexing or insertion ordering. Attempting to add an existing element returns false, leaving the collection completely untouched. Sets are central to deduplication, membership testing, and relational algebraic operations."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "تجسد واجهة 'java.util.Set' مفهوم المجموعة الرياضية (Mathematical Set) في لغة جافا. السمة الجوهرية للمجموعة هي عدم قبول التكرار إطلاقاً؛ فلا يمكن أن يتواجد عنصران e1 و e2 بحيث e1.equals(e2) يُرجع true، وتقبل عنصراً واحداً فقط بقيمة null (في التنفيذات التي تدعم ذلك). وخلافاً للقوائم، لا تضمن واجهة Set ترتيباً معيناً ولا تدعم الفهرسة بالأرقام. وعند محاولة إضافة عنصر موجود مسبقاً، تُرجع دالة add() القيمة false دون رمي استثناء ودون تعديل المجموعة. وتُعتبر المجموعات حجر الأساس في إزالة التكرارات وفحص الانتماء السريع والعمليات الرياضية مثل الاتحاد والتقاطع."
            },
            {
              type: "paragraph",
              text: "Key Contractual Pillars: 1) add(e) returns boolean: true if element was added, false if already present; 2) Mathematical Operations: addAll (Union), retainAll (Intersection), removeAll (Difference), containsAll (Subset); 3) equals() and hashCode(): Two sets are equal if and only if they contain exactly the same elements, regardless of concrete class or iteration order."
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
              text: "Example 1: The Uniqueness Contract & add() Return Value (المثال 1: عقد عدم التكرار وقيمة add المرجعة)"
            },
            {
              type: "paragraph",
              text: "Verifying how add() rejects duplicate elements by returning false."
            },
            {
              type: "code",
              language: "java",
              filename: "SetUniquenessDemo.java",
              code: `import java.util.HashSet;
import java.util.Set;

public class SetUniquenessDemo {
    public static void main(String[] args) {
        Set<String> usernames = new HashSet<>();

        boolean addedAlice1 = usernames.add("alice_99");
        boolean addedBob    = usernames.add("bob_coder");
        boolean addedAlice2 = usernames.add("alice_99"); // Duplicate!

        System.out.println("Added 'alice_99' first time?  " + addedAlice1);
        System.out.println("Added 'bob_coder'?             " + addedBob);
        System.out.println("Added 'alice_99' second time? " + addedAlice2);
        System.out.println("Final Set size:               " + usernames.size());
        System.out.println("Set contents:                 " + usernames);
    }
}`,
              output: `Added 'alice_99' first time?  true
Added 'bob_coder'?             true
Added 'alice_99' second time? false
Final Set size:               2
Set contents:                 [alice_99, bob_coder]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "Set.add() inspects elements using equals(). If an equivalent element is already present, it refuses insertion and returns false without altering state."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "تفحص دالة Set.add() العناصر عبر equals()؛ فإذا كان العنصر موجوداً بالفعل ترفض الإضافة وتُرجع false دون تغيير محتوى المجموعة."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Rapid Deduplication from a List (المثال 2: إزالة التكرارات من القوائم بخطوة واحدة)"
            },
            {
              type: "paragraph",
              text: "Passing any collection to a Set constructor immediately strips duplicates."
            },
            {
              type: "code",
              language: "java",
              filename: "DeduplicationDemo.java",
              code: `import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class DeduplicationDemo {
    public static void main(String[] args) {
        List<String> rawLogs = List.of(
            "192.168.1.1", "10.0.0.1", "192.168.1.1", "172.16.0.5", "10.0.0.1"
        );

        System.out.println("Original IP log entries count: " + rawLogs.size());

        // One-line deduplication: constructor extracts unique elements
        Set<String> uniqueIps = new HashSet<>(rawLogs);

        System.out.println("Unique IP addresses count:     " + uniqueIps.size());
        System.out.println("Unique IP Set:                 " + uniqueIps);
    }
}`,
              output: `Original IP log entries count: 5
Unique IP addresses count:     3
Unique IP Set:                 [172.16.0.5, 192.168.1.1, 10.0.0.1]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "The copy-constructor 'new HashSet<>(collection)' automatically filters out all redundant elements in O(n) time."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "يقوم المنشئ new HashSet<>(collection) بتصفية كافة العناصر المكررة تلقائياً بزمن خطي O(n) وسرعة فائقة."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Modern Immutable Sets with Set.of() (Java 9+) (المثال 3: المجموعات الثابتة عبر Set.of في جافا الحديثة)"
            },
            {
              type: "paragraph",
              text: "Creating unmodifiable, memory-compact sets with strict duplicate and null hostility."
            },
            {
              type: "code",
              language: "java",
              filename: "ImmutableSetDemo.java",
              code: `import java.util.Set;

public class ImmutableSetDemo {
    public static void main(String[] args) {
        // Factory creation
        Set<String> supportedCurrencies = Set.of("USD", "EUR", "GBP", "JPY", "SAR");
        System.out.println("Supported Currencies: " + supportedCurrencies);

        // 1. Attempting mutation throws UnsupportedOperationException
        try {
            supportedCurrencies.add("CAD");
        } catch (UnsupportedOperationException e) {
            System.out.println("Verified: Set.of() returns an unmodifiable immutable set.");
        }

        // 2. Set.of() rejects duplicates at initialization time with IllegalArgumentException
        try {
            Set.of("A", "B", "A");
        } catch (IllegalArgumentException e) {
            System.out.println("Verified: Duplicate elements in Set.of() throw IllegalArgumentException!");
        }
    }
}`,
              output: `Supported Currencies: [EUR, SAR, GBP, USD, JPY]
Verified: Set.of() returns an unmodifiable immutable set.
Verified: Duplicate elements in Set.of() throw IllegalArgumentException!`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "Set.of() produces an immutable set that forbids nulls, forbids mutations, and throws IllegalArgumentException if duplicate arguments are passed."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "تنشئ Set.of مجموعة غير قابلة للتعديل تمنع قيم null، وترمي IllegalArgumentException فوراً إذا مُرر لها عنصر مكرر أثناء الإنشاء."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Set Union (الاتحاد) with addAll() (المثال 4: عملية الاتحاد addAll لدمج المجموعات)"
            },
            {
              type: "paragraph",
              text: "Combining two sets into a unified set containing all unique elements from both."
            },
            {
              type: "code",
              language: "java",
              filename: "SetUnionDemo.java",
              code: `import java.util.HashSet;
import java.util.Set;

public class SetUnionDemo {
    public static void main(String[] args) {
        Set<String> backendSkills  = new HashSet<>(Set.of("Java", "SQL", "Spring", "Docker"));
        Set<String> frontendSkills = new HashSet<>(Set.of("JavaScript", "CSS", "React", "Docker"));

        // Compute Union: A ∪ B
        Set<String> fullStackSkills = new HashSet<>(backendSkills);
        fullStackSkills.addAll(frontendSkills); // Merges unique elements

        System.out.println("Backend Skills:   " + backendSkills);
        System.out.println("Frontend Skills:  " + frontendSkills);
        System.out.println("Union (Combined): " + fullStackSkills);
    }
}`,
              output: `Backend Skills:   [Spring, Docker, Java, SQL]
Frontend Skills:  [CSS, React, Docker, JavaScript]
Union (Combined): [Spring, CSS, React, Docker, Java, SQL, JavaScript]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "setA.addAll(setB) implements the mathematical union, accumulating elements from both sets while maintaining uniqueness."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "تطبق addAll عملية الاتحاد الرياضي؛ فتجمع عناصر المجموعتين في مجموعة واحدة مع إسقاط العناصر المشتركة تلقائياً لمنع التكرار."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Set Intersection (التقاطع) with retainAll() (المثال 5: عملية التقاطع retainAll لاستخراج المشترك)"
            },
            {
              type: "paragraph",
              text: "Retaining only elements present in both sets."
            },
            {
              type: "code",
              language: "java",
              filename: "SetIntersectionDemo.java",
              code: `import java.util.HashSet;
import java.util.Set;

public class SetIntersectionDemo {
    public static void main(String[] args) {
        Set<Integer> primeNumbers = new HashSet<>(Set.of(2, 3, 5, 7, 11, 13, 17, 19));
        Set<Integer> oddNumbers   = new HashSet<>(Set.of(1, 3, 5, 7, 9, 11, 13, 15, 17, 19));

        // Compute Intersection: A ∩ B
        Set<Integer> oddPrimes = new HashSet<>(primeNumbers);
        oddPrimes.retainAll(oddNumbers);

        System.out.println("Primes:                " + primeNumbers);
        System.out.println("Odds:                  " + oddNumbers);
        System.out.println("Intersection (Primes ∩ Odds): " + oddPrimes);
    }
}`,
              output: `Primes:                [17, 2, 19, 3, 5, 7, 11, 13]
Odds:                  [17, 1, 19, 3, 5, 7, 9, 11, 13, 15]
Intersection (Primes ∩ Odds): [17, 19, 3, 5, 7, 11, 13]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "setA.retainAll(setB) retains only elements that exist in both collections, calculating the exact mathematical intersection."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "تحتفظ retainAll بالعناصر الموجودة في كلا المجموعتين فقط، مطبقة مفهوم التقاطع الرياضي بدقة متناهية."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Set Difference (الفرق) with removeAll() (المثال 6: عملية الفرق removeAll لاستخراج العناصر الحصرية)"
            },
            {
              type: "paragraph",
              text: "Computing the relative complement (elements in A but not in B)."
            },
            {
              type: "code",
              language: "java",
              filename: "SetDifferenceDemo.java",
              code: `import java.util.HashSet;
import java.util.Set;

public class SetDifferenceDemo {
    public static void main(String[] args) {
        Set<String> enrolledStudents = new HashSet<>(Set.of("Alice", "Bob", "Charlie", "David", "Eve"));
        Set<String> submittedHomework = new HashSet<>(Set.of("Alice", "Charlie", "Eve"));

        // Compute Difference: A \\ B (Students who missed homework)
        Set<String> missingHomework = new HashSet<>(enrolledStudents);
        missingHomework.removeAll(submittedHomework);

        System.out.println("Enrolled:         " + enrolledStudents);
        System.out.println("Submitted:        " + submittedHomework);
        System.out.println("Missing Homework: " + missingHomework);
    }
}`,
              output: `Enrolled:         [Charlie, Eve, Bob, David, Alice]
Submitted:        [Charlie, Eve, Alice]
Missing Homework: [Bob, David]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "setA.removeAll(setB) subtracts all elements of setB from setA, leaving the asymmetric relative complement."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "تحذف removeAll كافة عناصر المجموعة الثانية من المجموعة الأولى، مما ينتج عنه العناصر الحصرية في المجموعة الأولى فقط."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Subset Testing with containsAll() (المثال 7: فحص المجموعة الجزئية عبر containsAll)"
            },
            {
              type: "paragraph",
              text: "Verifying whether a Set is a subset of another Set."
            },
            {
              type: "code",
              language: "java",
              filename: "SubsetTestingDemo.java",
              code: `import java.util.Set;

public class SubsetTestingDemo {
    public static void main(String[] args) {
        Set<String> requiredPermissions = Set.of("READ", "WRITE");
        Set<String> adminPermissions    = Set.of("READ", "WRITE", "DELETE", "ADMIN");
        Set<String> guestPermissions    = Set.of("READ");

        // containsAll checks if the target set contains all elements of the argument
        boolean adminHasAccess = adminPermissions.containsAll(requiredPermissions);
        boolean guestHasAccess = guestPermissions.containsAll(requiredPermissions);

        System.out.println("Admin has all required permissions? " + adminHasAccess);
        System.out.println("Guest has all required permissions? " + guestHasAccess);
    }
}`,
              output: `Admin has all required permissions? true
Guest has all required permissions? false`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "setA.containsAll(setB) returns true if setB is a subset of setA (i.e. every element in setB exists in setA)."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "تُرجع containsAll القيمة true إذا كانت المجموعة الممررة مجموعة جزئية (Subset) بالكامل من المجموعة الأصلية."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Set Equality & The HashCode Contract (المثال 8: مساواة المجموعات وعقد hashCode)"
            },
            {
              type: "paragraph",
              text: "Two sets are equal if they contain the same elements, regardless of implementation or order."
            },
            {
              type: "code",
              language: "java",
              filename: "SetEqualityDemo.java",
              code: `import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.TreeSet;

public class SetEqualityDemo {
    public static void main(String[] args) {
        // Three completely different Set implementations
        Set<Integer> hashSet   = new HashSet<>(Set.of(3, 1, 2));
        Set<Integer> linkedSet = new LinkedHashSet<>(Set.of(1, 2, 3));
        Set<Integer> treeSet   = new TreeSet<>(Set.of(2, 3, 1));

        // Set.equals contract: element equality, independent of implementation
        boolean hEqualsL = hashSet.equals(linkedSet);
        boolean lEqualsT = linkedSet.equals(treeSet);

        System.out.println("hashSet.equals(linkedSet)? " + hEqualsL);
        System.out.println("linkedSet.equals(treeSet)? " + lEqualsT);
        System.out.println("hashSet.hashCode() == treeSet.hashCode()? " +
                (hashSet.hashCode() == treeSet.hashCode()));
    }
}`,
              output: `hashSet.equals(linkedSet)? true
linkedSet.equals(treeSet)? true
hashSet.hashCode() == treeSet.hashCode()? true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "The Set specification defines set.hashCode() as the sum of elements' hashCodes, guaranteeing equal hash codes for equal sets regardless of order."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "ينص عقد Set على أن hashCode للمجموعة هو مجموع قيم hash لكافة عناصرها؛ مما يضمن تطابق الـ hash لأي مجموعتين متطابقتين مهما اختلف نوعهما أو ترتيبهما."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Filtering Stream Elements into a Set (Collector) (المثال 9: تجميع نتائج التدفقات داخل Set)"
            },
            {
              type: "paragraph",
              text: "Using Collectors.toSet() to automatically deduplicate stream results."
            },
            {
              type: "code",
              language: "java",
              filename: "StreamToSetDemo.java",
              code: `import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class StreamToSetDemo {
    public static void main(String[] args) {
        List<String> domains = List.of(
            "google.com", "oracle.com", "google.com", "github.com", "oracle.com"
        );

        // Transform and collect directly to Set
        Set<String> upperDomains = domains.stream()
                .map(String::toUpperCase)
                .collect(Collectors.toSet());

        System.out.println("Collected Unique Domains: " + upperDomains);
        System.out.println("Set size: " + upperDomains.size());
    }
}`,
              output: `Collected Unique Domains: [GOOGLE.COM, GITHUB.COM, ORACLE.COM]
Set size: 3`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "Collectors.toSet() provides a functional way to transform and deduplicate stream elements in a single step."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "يوفر المجمع Collectors.toSet أسلوباً برمجياً وظيفياً لتحويل العناصر وحذف التكرارات في خطوة واحدة."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Symmetric Difference (Exclusive OR) in Sets (المثال 10: الفرق التماثلي Symmetric Difference)"
            },
            {
              type: "paragraph",
              text: "Computing elements in either Set A or Set B, but NOT in both."
            },
            {
              type: "code",
              language: "java",
              filename: "SymmetricDifferenceDemo.java",
              code: `import java.util.HashSet;
import java.util.Set;

public class SymmetricDifferenceDemo {
    public static <T> Set<T> symmetricDifference(Set<T> a, Set<T> b) {
        // (A ∪ B) \\ (A ∩ B)
        Set<T> union = new HashSet<>(a);
        union.addAll(b);

        Set<T> intersection = new HashSet<>(a);
        intersection.retainAll(b);

        union.removeAll(intersection);
        return union;
    }

    public static void main(String[] args) {
        Set<Integer> set1 = Set.of(1, 2, 3, 4);
        Set<Integer> set2 = Set.of(3, 4, 5, 6);

        Set<Integer> symDiff = symmetricDifference(set1, set2);
        System.out.println("Set 1:                 " + set1);
        System.out.println("Set 2:                 " + set2);
        System.out.println("Symmetric Difference:  " + symDiff + " (elements in only one set)");
    }
}`,
              output: `Set 1:                 [1, 2, 3, 4]
Set 2:                 [3, 4, 5, 6]
Symmetric Difference:  [1, 2, 5, 6] (elements in only one set)`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "Symmetric difference (XOR) is calculated by taking the union of both sets and subtracting their intersection."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "يُحسب الفرق التماثلي (XOR) بحساب اتحاد المجموعتين ثم طرح التقاطع المشترك منهما."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Set.copyOf() Defensive Snapshot (Java 10+) (المثال 11: التجميد الدفاعي بنسخ المجموعات عبر Set.copyOf)"
            },
            {
              type: "paragraph",
              text: "Creating an immutable, independent snapshot of an existing Set."
            },
            {
              type: "code",
              language: "java",
              filename: "SetCopyOfDemo.java",
              code: `import java.util.HashSet;
import java.util.Set;

public class SetCopyOfDemo {
    public static void main(String[] args) {
        Set<String> mutableSet = new HashSet<>();
        mutableSet.add("Alpha");
        mutableSet.add("Beta");

        // Create disconnected, frozen copy
        Set<String> snapshot = Set.copyOf(mutableSet);

        // Mutating original does not affect snapshot
        mutableSet.add("Gamma");

        System.out.println("Mutable master set:  " + mutableSet);
        System.out.println("Immutable snapshot:  " + snapshot);
    }
}`,
              output: `Mutable master set:  [Alpha, Beta, Gamma]
Immutable snapshot:  [Alpha, Beta]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "Set.copyOf() takes an existing collection and returns an unmodifiable, null-hostile, independent snapshot."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "تُرجع Set.copyOf نسخة مجمدة ومستقلة وغير قابلة للتعديل لحماية البيانات من التعديل الخارجي."
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
                "Mistake 1: Relying on iteration order in a generic Set. Unless using LinkedHashSet or TreeSet, iteration order is completely arbitrary and can change across JVM runs.",
                "خطأ 1: الاعتماد على ترتيب العناصر في Set العامة؛ فباستثناء LinkedHashSet و TreeSet يكون الترتيب عشوائياً تماماً وقد يتغير بين جلسات التشغيل.",
                "Mistake 2: Storing mutable objects whose fields are mutated after being added to a Set, corrupting internal bucket placement.",
                "خطأ 2: تعديل خصائص كائن بعد إضافته للمجموعة؛ مما يفسد قيمة التجزئة (hashCode) ويجعل الكائن غير قابل للعثور عليه داخل المجموعة.",
                "Mistake 3: Expecting set.get(index) to exist. The Set interface does NOT support positional indexing; use an Iterator or convert to a List.",
                "خطأ 3: توقع وجود دالة set.get(i)؛ فالواجهة لا تدعم الفهرسة الرقمية ويجب استخدام Iterator أو التحويل إلى List.",
                "Mistake 4: Passing duplicate elements to Set.of(\"A\", \"A\"), causing an immediate IllegalArgumentException at runtime."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Role-Based Access Control (RBAC) Privilege Validator (التحدي العملي: مدقق صلاحيات الأدوار RBAC)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Create a class 'AccessControlManager' that maintains user roles and privileges using Sets. Implement: 1) 'assignPrivileges(String user, Set<String> privs)'; 2) 'hasAccess(String user, Set<String> requiredPrivs)'; 3) 'getMissingPrivileges(String user, Set<String> requiredPrivs)'. Test in main() with sample users and print validation checks."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: صمم فئة AccessControlManager تدير صلاحيات المستخدمين باستخدام المجموعات (Sets). نفّذ: 1) assignPrivileges لتعيين الصلاحيات؛ 2) hasAccess للتحقق من امتلاك المستخدم لكافة الصلاحيات المطلوبة عبر containsAll؛ 3) getMissingPrivileges لتحديد الصلاحيات الناقصة عبر removeAll. اختبرها في main واطبع النتائج."
            },
            {
              type: "code",
              language: "java",
              filename: "RbacManagerChallenge.java",
              code: `import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class RbacManagerChallenge {
    static class AccessControlManager {
        private final Map<String, Set<String>> userPrivileges = new HashMap<>();

        public void assignPrivileges(String username, Set<String> privileges) {
            userPrivileges.computeIfAbsent(username, k -> new HashSet<>()).addAll(privileges);
        }

        public boolean hasAccess(String username, Set<String> requiredPrivileges) {
            Set<String> userPrivs = userPrivileges.getOrDefault(username, Set.of());
            return userPrivs.containsAll(requiredPrivileges);
        }

        public Set<String> getMissingPrivileges(String username, Set<String> requiredPrivileges) {
            Set<String> missing = new HashSet<>(requiredPrivileges);
            Set<String> userPrivs = userPrivileges.getOrDefault(username, Set.of());
            missing.removeAll(userPrivs);
            return missing;
        }
    }

    public static void main(String[] args) {
        AccessControlManager rbac = new AccessControlManager();

        rbac.assignPrivileges("alice", Set.of("READ", "WRITE", "EXPORT"));
        rbac.assignPrivileges("bob",   Set.of("READ"));

        Set<String> adminAudit = Set.of("READ", "WRITE", "AUDIT");

        System.out.println("Alice has adminAudit access? " + rbac.hasAccess("alice", adminAudit));
        System.out.println("Alice missing privileges:    " + rbac.getMissingPrivileges("alice", adminAudit));

        System.out.println("Bob has adminAudit access?   " + rbac.hasAccess("bob", adminAudit));
        System.out.println("Bob missing privileges:      " + rbac.getMissingPrivileges("bob", adminAudit));
    }
}`,
              output: `Alice has adminAudit access? false
Alice missing privileges:    [AUDIT]
Bob has adminAudit access?   false
Bob missing privileges:      [WRITE, AUDIT]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "The manager stores privileges in Sets, uses containsAll() to verify subset containment, and uses removeAll() to calculate exact missing privileges via set subtraction."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "تستخدم الفئة containsAll للتحقق من امتلاك كافة الصلاحيات، وتستخدم removeAll لحساب الفرق بين الصلاحيات المطلوبة وصلاحيات المستخدم ومعرفة النواقص بدقة."
            }
          ],
          quiz: [
          {
                    "id": "q1",
                    "question": "What is the foundational invariant enforced by the java.util.Set interface? (ما هو المبدأ الرياضي الأساسي الذي تفرضه واجهة java.util.Set في جافا؟)",
                    "options": [
                              "Elements must be stored in strictly descending numerical order.",
                              "A Set cannot contain duplicate elements: no two elements e1 and e2 can satisfy e1.equals(e2).",
                              "A Set must have an initial capacity of at least 64.",
                              "Elements must implement the Serializable interface."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! The Set interface models the mathematical set abstraction: it contains no duplicate elements, meaning no two elements e1 and e2 can exist such that e1.equals(e2). (واجهة Set تمثل المجموعات الرياضية التي تمنع تكرار أي عنصر بحيث لا يتساوى أي عنصرين بدالة equals)."
          },
          {
                    "id": "q2",
                    "question": "What is the return value of set.add(element) when attempting to add an element that is already present in the Set? (ما هي القيمة المرجعة لدالة set.add عند محاولة إضافة عنصر موجود مسبقاً في المجموعة؟)",
                    "options": [
                              "It throws a DuplicateElementException.",
                              "It returns false, and the Set remains unchanged.",
                              "It replaces the existing element and returns true.",
                              "It returns null."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! set.add(e) returns true if the set did not already contain the specified element. If the element is already present, it returns false and leaves the set unaltered. (تُرجع الدالة false إذا كان العنصر موجوداً مسبقاً وتبقى المجموعة كما هي دون إطلاق استثناءات)."
          },
          {
                    "id": "q3",
                    "question": "How can you eliminate all duplicate items from a List<String> with a single statement while using standard Java? (كيف تتخلص من كافة العناصر المكررة في قائمة نصوص بخطوة واحدة؟)",
                    "options": [
                              "list.removeDuplicates();",
                              "List<String> unique = new ArrayList<>(new HashSet<>(list));",
                              "list.sortAndDeduplicate();",
                              "Collections.dedup(list);"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Passing the list into a HashSet constructor (new HashSet<>(list)) filters out all duplicates in O(n) time, and passing it back to an ArrayList restores it to a list. (تمرير القائمة إلى منشئ HashSet يزيل كافة التكرارات فوراً بتكلفة خطية O(n))."
          },
          {
                    "id": "q4",
                    "question": "How do immutable sets created via Set.of(\"A\", \"B\", \"C\") (Java 9+) behave if duplicate elements are passed into the factory method? (كيف تتصرف دالة Set.of في جافا 9+ إذا تم تمرير عناصر مكررة إليها؟)",
                    "options": [
                              "It silently keeps only one of the duplicates.",
                              "It immediately throws an IllegalArgumentException at runtime.",
                              "It returns an empty Set.",
                              "It converts the duplicates into a List."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Unlike mutable sets whose add() returns false, Set.of() rejects duplicates proactively by throwing an IllegalArgumentException if duplicate elements are provided. (على عكس المجموعات العادية، ترمي Set.of استثناء IllegalArgumentException فوراً إذا احتوت المدخلات على أي تكرار)."
          },
          {
                    "id": "q5",
                    "question": "Which method on the Set interface performs a mathematical Set Union, adding all elements from setB to setA? (أي دالة في واجهة Set تطبق عملية الاتحاد الرياضي بدمج عناصر مجموعتين؟)",
                    "options": [
                              "setA.union(setB)",
                              "setA.addAll(setB)",
                              "setA.merge(setB)",
                              "setA.combine(setB)"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! addAll(Collection<? extends E> c) appends all elements from the specified collection to this set if they are not already present, modeling mathematical Union. (دالة addAll تطبق الاتحاد الرياضي Union بدمج عناصر المجموعتين مع استبعاد التكرارات تلقائياً)."
          },
          {
                    "id": "q6",
                    "question": "Which method performs a mathematical Set Difference (Relative Complement), removing all elements from setA that belong to setB? (أي دالة تطبق عملية الفرق الرياضي بحذف عناصر المجموعة الثانية من الأولى؟)",
                    "options": [
                              "setA.difference(setB)",
                              "setA.removeAll(setB)",
                              "setA.subtract(setB)",
                              "setA.exclude(setB)"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! setA.removeAll(setB) removes from setA all of its elements that are contained in setB, modeling mathematical set difference (A \\ B). (دالة removeAll تطبق عملية الفرق الرياضي A - B بحذف أي عنصر مشترك بين المجموعتين)."
          },
          {
                    "id": "q7",
                    "question": "Consider this code:\nSet<Integer> setA = new HashSet<>(Arrays.asList(1, 2, 3, 4));\nSet<Integer> setB = new HashSet<>(Arrays.asList(3, 4, 5, 6));\nsetA.retainAll(setB);\nSystem.out.println(setA);\nWhat is printed? (ما الذي يطبعه الكود التالي؟)",
                    "options": [
                              "[1, 2]",
                              "[3, 4]",
                              "[5, 6]",
                              "[1, 2, 3, 4, 5, 6]"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! retainAll(c) performs set intersection, retaining only elements that exist in both sets (3 and 4). (دالة retainAll تطبق التقاطع الرياضي وتحتفظ فقط بالعناصر المشتركة بين المجموعتين وهي 3 و 4)."
          },
          {
                    "id": "q8",
                    "question": "What is required for two Set instances set1 and set2 to be considered equal via set1.equals(set2)? (ما هو شرط تساوي مجموعتين set1 و set2 بدالة equals؟)",
                    "options": [
                              "They must be instances of the exact same concrete class (e.g. both must be HashSet).",
                              "They must have the same size and contain the same elements (every element in set1 is contained in set2), regardless of the concrete Set implementation class or iteration order.",
                              "Their elements must be in the exact same memory locations.",
                              "They must share the same memory address."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! The Set.equals() contract specifies that two sets are equal if they have the same size and every member of one set is contained in the other. A HashSet can equal a TreeSet if they contain the same items. (يتساوى كائنا Set إذا كانا بنفس الحجم ويحتويان على نفس العناصر تماماً، بصرف النظر عن الفئة المنفذة أو ترتيب التخزين)."
          },
          {
                    "id": "q9",
                    "question": "How do you calculate the Symmetric Difference (elements in either setA or setB, but NOT in both) in Java? (كيف تحسب الفرق التماثلي Symmetric Difference بين مجموعتين في جافا؟)",
                    "options": [
                              "setA.xor(setB)",
                              "Create a union set (Set<T> union = new HashSet<>(setA); union.addAll(setB);) and an intersection set (Set<T> inter = new HashSet<>(setA); inter.retainAll(setB);), then call union.removeAll(inter);",
                              "setA.removeAll(setB);",
                              "Collections.disjoint(setA, setB);"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Symmetric difference is (A union B) minus (A intersect B). Creating the union and subtracting the intersection leaves only elements exclusive to one set or the other. (الفرق التماثلي هو اتحاد المجموعتين مطروحاً منه تقاطعهما، وتطبيقه يتم عبر طرح التقاطع من الاتحاد)."
          },
          {
                    "id": "q10",
                    "question": "What does setA.containsAll(setB) test mathematically? (ما الذي تفحصه دالة containsAll من منظور المجموعات الرياضية؟)",
                    "options": [
                              "Whether setA is identical to setB.",
                              "Whether setB is a subset of setA (setB ⊆ setA).",
                              "Whether setA and setB are disjoint.",
                              "Whether setA has more elements than setB."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! containsAll(c) returns true if this set contains all of the elements of the specified collection, meaning that c is a subset of this set. (تُرجع containsAll القيمة true إذا كانت كافة عناصر المجموعة المدخلة موجودة داخل المجموعة الأولى، أي أنها مجموعة جزئية subset منها)."
          },
          {
                    "id": "q11",
                    "question": "Can you retrieve an element from a standard java.util.Set by an integer index, like set.get(2)? (هل يمكنك جلب عنصر من Set بواسطة فهرس رقمي مثل set.get(2)؟)",
                    "options": [
                              "Yes, all Sets support set.get(int index).",
                              "No, the Set interface does not define a get(int) method because sets are fundamentally unindexed collections.",
                              "Only if the Set is a HashSet.",
                              "Yes, but it returns an Optional."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Set does not provide positional index access because mathematical sets are unordered and non-indexed. To access elements, you must use an iterator, enhanced for-loop, Stream API, or convert to a List. (لا توفر Set دالة get بالفهرس لأن المجموعات غير مفهرسة، وللوصول للعناصر يجب استخدام Iterator أو حلقة for أو تحويلها لقائمة)."
          },
          {
                    "id": "q12",
                    "question": "What happens if you attempt to add null to a Set created via Set.of(\"Alpha\", \"Beta\")? (ماذا يحدث إذا حاولت إضافة null لمجموعة منشأة عبر Set.of؟)",
                    "options": [
                              "null is stored at index 0.",
                              "It throws an UnsupportedOperationException (because the set is immutable) or a NullPointerException if null was passed to Set.of().",
                              "It replaces \"Alpha\" with null.",
                              "It returns false without doing anything."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Set.of() creates an immutable set that does not permit null elements (passing null throws NullPointerException), and any attempt to modify it via add() throws UnsupportedOperationException. (المجموعات المنشأة بـ Set.of غير قابلة للتعديل وترمي UnsupportedOperationException عند استدعاء add، كما ترفض عناصر null وترمي NullPointerException)."
          },
          {
                    "id": "q13",
                    "question": "What is the primary difference between Set.copyOf(collection) (Java 10+) and Collections.unmodifiableSet(set)? (ما هو الفرق الرئيسي بين Set.copyOf و Collections.unmodifiableSet؟)",
                    "options": [
                              "Set.copyOf creates a true detached immutable copy that does not reflect future mutations to the source collection, whereas Collections.unmodifiableSet is a live view that still reflects changes made to the underlying set.",
                              "Set.copyOf only works with numbers.",
                              "Collections.unmodifiableSet allows additions if synchronized.",
                              "There is no difference."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! Collections.unmodifiableSet creates a wrapper view that reflects any subsequent mutations to the backing set. Set.copyOf creates an independent, unmodifiable snapshot that is completely immune to changes in the source collection. (تنشئ Set.copyOf نسخة تجميدية مستقلة لا تتأثر بأي تعديل مستقبلي على المجموعة المصدر، بعكس unmodifiableSet التي تظل واجهة مرتبطة بالأصل)."
          },
          {
                    "id": "q14",
                    "question": "In a Role-Based Access Control (RBAC) security system, how do you verify if a user with grantedRoles has all requiredRoles? (في نظام صلاحيات الأدوار RBAC، كيف تتحقق أن المستخدم يملك كافة الأدوار المطلوبة؟)",
                    "options": [
                              "grantedRoles.contains(requiredRoles)",
                              "grantedRoles.containsAll(requiredRoles)",
                              "grantedRoles.equals(requiredRoles)",
                              "grantedRoles.retainAll(requiredRoles)"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! grantedRoles.containsAll(requiredRoles) checks if the requiredRoles set is a subset of the user's grantedRoles in a single, clean call. (تفحص containsAll ما إذا كانت مجموعة الأدوار المطلوبة مشمولة بالكامل ضمن أدوار المستخدم الممنوحة)."
          },
          {
                    "id": "q15",
                    "question": "How does Java compute the hashCode of a Set instance? (كيف تحسب جافا القيمة التجزئية hashCode لكائن Set بأكمله؟)",
                    "options": [
                              "It returns the number of elements in the set.",
                              "It calculates the sum of the hash codes of all elements in the set: sum(element != null ? element.hashCode() : 0).",
                              "It hashes the class name.",
                              "It multiplies all element hashCodes together."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! By specification in the Set interface contract, the hash code of a set is defined to be the sum of the hash codes of the elements in the set. Because addition is commutative, this guarantees that sets with the same elements produce the same hashCode regardless of iteration order. (تُعرف القيمة التجزئية للمجموعة بمجموع القيم التجزئية لكافة عناصرها، ولأن الجمع تبادلي فإن المجموعات المتطابقة تُعطي نفس hashCode بصرف النظر عن ترتيب العناصر)."
          }
]
        }
      ]
    },

    /* ==========================================================================
       TOPIC 62: Java HashSet
       ========================================================================== */
    {
      id: "java-hashset",
      title: "62. Java HashSet",
      description: "Deep dive into Java HashSet: backed by internal HashMap, O(1) average time complexity for add/remove/contains, bucket hashing mechanics, equals() & hashCode() contract, load factor (0.75), initial capacity (16), rehashing, and handling hash collisions.",
      lessons: [
        {
          id: "java-hashset-mastery",
          title: "Complete Guide to Java HashSet",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "HashSet Internal Architecture: Backed by HashMap (هيكلية HashSet الداخلية: العمل بخريطة تجزئة)"
            },
            {
              type: "paragraph",
              text: "Java's 'HashSet' is the most common implementation of the Set interface. Surprisingly, HashSet does not implement a hashing algorithm from scratch; instead, it is backed internally by a 'HashMap<E, Object>'. Every element added to a HashSet is stored as a KEY in the underlying HashMap, associated with a private static dummy Object value named 'PRESENT'. As a result, HashSet inherits HashMap's performance characteristics: O(1) constant-time average performance for basic operations (add, remove, contains, and size), assuming a well-distributed hash function."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "تُعد فئة 'HashSet' أكثر تنفيذات واجهة Set انتشاراً واستخداماً في جافا. والمفاجأة الهندسية فيها أنها لا تبني خوارزمية التجزئة من الصفر، بل تعتمد داخلياً بالكامل على كائن 'HashMap<E, Object>'. فكل عنصر يُضاف إلى HashSet يُخزن كـ مفتاح (Key) في الخريطة الداخلية، وتُربط معه قيمة ثابتة وهمية تُسمى 'PRESENT'. وبناءً على ذلك، ترث HashSet الخصائص الفائقة لخريطة التجزئة؛ فتحقق زمناً ثابتاً O(1) في المتوسط لعمليات الإضافة والحذف والفحص وتحديد الحجم بشرط توزيع دالة التجزئة بشكل متوازن."
            },
            {
              type: "paragraph",
              text: "Internal Parameters: 1) Initial Capacity: Default is 16 buckets; 2) Load Factor: Default is 0.75. When the number of elements exceeds capacity * loadFactor (16 * 0.75 = 12), the table rehashes and doubles in size (32 buckets); 3) equals() and hashCode(): You MUST override both correctly on custom classes stored in a HashSet."
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
              text: "Example 1: Basic Operations & Non-Deterministic Order (المثال 1: العمليات الأساسية والترتيب غير الثابت)"
            },
            {
              type: "paragraph",
              text: "Adding items, querying contains(), and observing arbitrary hash bucket ordering."
            },
            {
              type: "code",
              language: "java",
              filename: "BasicHashSetDemo.java",
              code: `import java.util.HashSet;

public class BasicHashSetDemo {
    public static void main(String[] args) {
        HashSet<String> fruits = new HashSet<>();

        fruits.add("Apple");
        fruits.add("Banana");
        fruits.add("Orange");
        fruits.add("Mango");
        fruits.add("Apple"); // Duplicate ignored

        System.out.println("HashSet size: " + fruits.size());
        System.out.println("Contains 'Banana'? " + fruits.contains("Banana"));
        System.out.println("Contains 'Grape'?  " + fruits.contains("Grape"));

        // Iteration order is determined by hash codes and bucket distribution
        System.out.println("Iteration order (hash-dependent): " + fruits);
    }
}`,
              output: `HashSet size: 4
Contains 'Banana'? true
Contains 'Grape'?  false
Iteration order (hash-dependent): [Apple, Mango, Orange, Banana]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "HashSet elements are placed into buckets based on their hashCode(). Iteration traverses these buckets, not insertion order."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "تتوزع عناصر HashSet في خلايا (Buckets) وفقاً لقيمة hashCode الخاصة بها؛ لذا يكون الترتيب معتمداً على التجزئة وليس ترتيب الإدخال."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Permitting Exactly One null Element (المثال 2: قبول عنصر null واحد فقط)"
            },
            {
              type: "paragraph",
              text: "HashSet allows storing null, placing it in bucket 0."
            },
            {
              type: "code",
              language: "java",
              filename: "HashSetNullDemo.java",
              code: `import java.util.HashSet;

public class HashSetNullDemo {
    public static void main(String[] args) {
        HashSet<String> tokens = new HashSet<>();

        tokens.add("Token1");
        boolean addedFirstNull  = tokens.add(null);
        boolean addedSecondNull = tokens.add(null); // Rejected!

        System.out.println("Added first null?  " + addedFirstNull);
        System.out.println("Added second null? " + addedSecondNull);
        System.out.println("Contains null?     " + tokens.contains(null));
        System.out.println("Tokens:            " + tokens);
    }
}`,
              output: `Added first null?  true
Added second null? false
Contains null?     true
Tokens:            [null, Token1]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "Unlike TreeSet or Set.of(), HashSet permits null. However, because duplicates are disallowed, only one null is ever stored."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "تسمح HashSet بقيمة null واحدة وتضعها في الخلية رقم 0؛ وترفض إضافة أي قيمة null ثانية لمنع التكرار."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Overriding equals() and hashCode() Correctly (المثال 3: التطبيق الصحيح لعقد equals و hashCode)"
            },
            {
              type: "paragraph",
              text: "Why custom objects require both methods for HashSet to identify duplicates."
            },
            {
              type: "code",
              language: "java",
              filename: "CustomObjectHashSetDemo.java",
              code: `import java.util.HashSet;
import java.util.Objects;

public class CustomObjectHashSetDemo {
    static class Employee {
        private final int id;
        private final String name;

        public Employee(int id, String name) {
            this.id = id;
            this.name = name;
        }

        // Must override equals
        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (!(o instanceof Employee)) return false;
            Employee employee = (Employee) o;
            return id == employee.id && Objects.equals(name, employee.name);
        }

        // Must override hashCode consistently with equals
        @Override
        public int hashCode() {
            return Objects.hash(id, name);
        }

        @Override
        public String toString() {
            return "Emp(" + id + ", " + name + ")";
        }
    }

    public static void main(String[] args) {
        HashSet<Employee> staff = new HashSet<>();

        Employee e1 = new Employee(101, "Alice");
        Employee e2 = new Employee(101, "Alice"); // Distinct object instance, same logical identity!

        staff.add(e1);
        boolean addedDuplicate = staff.add(e2);

        System.out.println("Added e1: " + e1);
        System.out.println("Added duplicate e2? " + addedDuplicate);
        System.out.println("Staff set size:     " + staff.size());
    }
}`,
              output: `Added e1: Emp(101, Alice)
Added duplicate e2? false
Staff set size:     1`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "When hashCode() matches and equals() returns true, HashSet correctly identifies e2 as a duplicate and rejects it."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "عند تطابق hashCode وإرجاع equals للقيمة true، تكتشف HashSet التكرار المنطقي للكائن وترفض إضافته."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: The Broken Contract Bug (Missing hashCode) (المثال 4: الخلل القاتل عند نسيان كتابة hashCode)"
            },
            {
              type: "paragraph",
              text: "Demonstrating how forgetting hashCode() breaks uniqueness completely."
            },
            {
              type: "code",
              language: "java",
              filename: "BrokenContractDemo.java",
              code: `import java.util.HashSet;

public class BrokenContractDemo {
    static class BrokenKey {
        int id;
        BrokenKey(int id) { this.id = id; }

        @Override
        public boolean equals(Object o) {
            return (o instanceof BrokenKey) && this.id == ((BrokenKey) o).id;
        }
        // FORGOT TO OVERRIDE hashCode()! Inherits default identity hashCode!
    }

    public static void main(String[] args) {
        HashSet<BrokenKey> brokenSet = new HashSet<>();

        BrokenKey k1 = new BrokenKey(42);
        BrokenKey k2 = new BrokenKey(42);

        brokenSet.add(k1);
        brokenSet.add(k2); // Will be accepted because default hashCodes land in different buckets!

        System.out.println("Are k1 and k2 equal? " + k1.equals(k2));
        System.out.println("k1 hashCode: " + k1.hashCode());
        System.out.println("k2 hashCode: " + k2.hashCode());
        System.out.println("Broken set size (should be 1, but is): " + brokenSet.size());
    }
}`,
              output: `Are k1 and k2 equal? true
k1 hashCode: ... (different)
k2 hashCode: ... (different)
Broken set size (should be 1, but is): 2`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "Because hashCode() was not overridden, k1 and k2 land in different buckets. HashSet never checks equals() between different buckets, storing duplicates!"
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "لأن hashCode لم تُكتب، وُضع الكائنان في خليتين مختلفتين بالذاكرة؛ ولم تقارن جافا بينهما بـ equals فتم تخزين التكرار وخرق العقد."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Tuning Initial Capacity and Load Factor (المثال 5: ضبط السعة الابتدائية ومعامل الحمل)"
            },
            {
              type: "paragraph",
              text: "Configuring capacity to prevent costly rehashing during bulk insertions."
            },
            {
              type: "code",
              language: "java",
              filename: "HashSetTuningDemo.java",
              code: `import java.util.HashSet;

public class HashSetTuningDemo {
    public static void main(String[] args) {
        int expectedElements = 10_000;
        float loadFactor = 0.75f;

        // Formula: initialCapacity = (expectedElements / loadFactor) + 1
        int calculatedCapacity = (int) (expectedElements / loadFactor) + 1;

        // HashSet initialized to hold 10,000 items without ever rehashing
        HashSet<Integer> tunedSet = new HashSet<>(calculatedCapacity, loadFactor);

        long start = System.currentTimeMillis();
        for (int i = 0; i < expectedElements; i++) {
            tunedSet.add(i);
        }
        long time = System.currentTimeMillis() - start;

        System.out.println("Tuned HashSet created with capacity: " + calculatedCapacity);
        System.out.println("Inserted " + tunedSet.size() + " items in " + time + " ms (zero rehashing).");
    }
}`,
              output: `Tuned HashSet created with capacity: 13334
Inserted 10000 items in 3 ms (zero rehashing).`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "Pre-calculating capacity as (expected / loadFactor) + 1 avoids resizing the internal bucket table, maximizing insertion throughput."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "حساب السعة مسبقاً بمعادلة (العدد / 0.75) يمنع إعادة بناء جدول التجزئة (Rehashing) أثناء العمل ويوفر الوقت والموارد."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Lightning-Fast O(1) Membership Testing (المثال 6: فحص الانتماء الفوري O(1) مقارنة بالقوائم)"
            },
            {
              type: "paragraph",
              text: "Comparing contains() speed between HashSet O(1) and ArrayList O(n)."
            },
            {
              type: "code",
              language: "java",
              filename: "MembershipSpeedBenchmarkDemo.java",
              code: `import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

public class MembershipSpeedBenchmarkDemo {
    public static void main(String[] args) {
        int size = 60_000;
        List<Integer> list = new ArrayList<>(size);
        HashSet<Integer> set = new HashSet<>(size);

        for (int i = 0; i < size; i++) {
            list.add(i);
            set.add(i);
        }

        int target = size - 1; // Worst-case search target (last item)

        // 1. ArrayList linear search: O(n)
        long startList = System.nanoTime();
        boolean inList = list.contains(target);
        long timeList = System.nanoTime() - startList;

        // 2. HashSet hash lookup: O(1)
        long startSet = System.nanoTime();
        boolean inSet = set.contains(target);
        long timeSet = System.nanoTime() - startSet;

        System.out.println("ArrayList contains() time: " + timeList + " ns (Linear O(n))");
        System.out.println("HashSet contains() time:   " + timeSet + " ns (Constant O(1))");
        System.out.println("HashSet is faster: " + (timeList > timeSet));
    }
}`,
              output: `ArrayList contains() time: 1450000 ns (Linear O(n))
HashSet contains() time:   1200 ns (Constant O(1))
HashSet is faster: true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "HashSet computes the target's hash and jumps directly to its bucket, achieving sub-microsecond O(1) lookups."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "تحسب HashSet قيمة الـ hash وتقفز مباشرة للخلية المطلوبة في أجزاء من الميكروثانية دون الحاجة للمرور على بقية العناصر."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Safe Element Removal via remove() (المثال 7: حذف العناصر بالقيمة)"
            },
            {
              type: "paragraph",
              text: "Removing elements by value and checking return status."
            },
            {
              type: "code",
              language: "java",
              filename: "HashSetRemovalDemo.java",
              code: `import java.util.HashSet;

public class HashSetRemovalDemo {
    public static void main(String[] args) {
        HashSet<String> blockedUsers = new HashSet<>();
        blockedUsers.add("spammer_01");
        blockedUsers.add("bot_42");

        boolean removedBot = blockedUsers.remove("bot_42");
        boolean removedGhost = blockedUsers.remove("ghost_user"); // Not present

        System.out.println("Removed 'bot_42'?     " + removedBot);
        System.out.println("Removed 'ghost_user'? " + removedGhost);
        System.out.println("Remaining blocked users: " + blockedUsers);
    }
}`,
              output: `Removed 'bot_42'?     true
Removed 'ghost_user'? false
Remaining blocked users: [spammer_01]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "remove(o) returns true if the element was successfully located and removed from its hash bucket, false otherwise."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "تُرجع remove(o) القيمة true إذا وُجد العنصر وحُذف من خليته، وتُرجع false إذا لم يكن موجوداً."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: The Mutable Key Danger (Corrupted Buckets) (المثال 8: خطر تعديل الكائنات بعد إضافتها للمجموعة)"
            },
            {
              type: "paragraph",
              text: "What happens when you mutate an object's fields after adding it to a HashSet."
            },
            {
              type: "code",
              language: "java",
              filename: "MutableKeyHazardDemo.java",
              code: `import java.util.HashSet;
import java.util.Objects;

public class MutableKeyHazardDemo {
    static class MutablePoint {
        int x, y;
        MutablePoint(int x, int y) { this.x = x; this.y = y; }

        @Override
        public boolean equals(Object o) {
            if (!(o instanceof MutablePoint)) return false;
            MutablePoint p = (MutablePoint) o;
            return x == p.x && y == p.y;
        }

        @Override
        public int hashCode() {
            return Objects.hash(x, y);
        }
    }

    public static void main(String[] args) {
        HashSet<MutablePoint> points = new HashSet<>();
        MutablePoint pt = new MutablePoint(5, 10);
        points.add(pt);

        System.out.println("Points contains pt initially? " + points.contains(pt));

        // DANGEROUS MUTATION: Mutating field changes hashCode!
        pt.x = 999;

        // Lookup calculates NEW hashCode, searching in WRONG bucket!
        System.out.println("Points contains pt after mutation? " + points.contains(pt) + " (LOST IN BUCKETS!)");
        System.out.println("Set size: " + points.size() + " (Element is trapped and un-retrievable!)");
    }
}`,
              output: `Points contains pt initially? true
Points contains pt after mutation? false (LOST IN BUCKETS!)
Set size: 1 (Element is trapped and un-retrievable!)`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "Mutating an object stored in a HashSet alters its hashCode. Subsequent lookups check the new hash's bucket, leaving the object trapped and unfindable in its old bucket!"
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "تعديل خصائص الكائن يغير قيمة التجزئة الخاصة به؛ فتبحث جافا في الخلية الجديدة ولا تجده، فيظل الكائن محاصراً وضائعاً في خليته القديمة."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Shallow Cloning of HashSet (المثال 9: الاستنساخ السطحي لكائن HashSet)"
            },
            {
              type: "paragraph",
              text: "Using clone() to duplicate a HashSet structure."
            },
            {
              type: "code",
              language: "java",
              filename: "HashSetCloneDemo.java",
              code: `import java.util.HashSet;

public class HashSetCloneDemo {
    public static void main(String[] args) {
        HashSet<String> original = new HashSet<>();
        original.add("Config A");
        original.add("Config B");

        @SuppressWarnings("unchecked")
        HashSet<String> cloned = (HashSet<String>) original.clone();

        cloned.add("Config C"); // Mutating clone does not mutate original set structure

        System.out.println("Original size: " + original.size() + " " + original);
        System.out.println("Cloned size:   " + cloned.size() + " " + cloned);
    }
}`,
              output: `Original size: 2 [Config A, Config B]
Cloned size:   3 [Config A, Config B, Config C]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "HashSet.clone() copies the bucket structure and element references (shallow copy)."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "تنسخ دالة clone هيكل الخلايا ومراجع العناصر دون إنشاء نسخ عميقة من الكائنات نفسها."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Thread-Safe HashSet with ConcurrentHashMap (المثال 10: إنشاء مجموعة آمنة لتعدد الخيوط)"
            },
            {
              type: "paragraph",
              text: "Creating a concurrent thread-safe Set using ConcurrentHashMap.newKeySet()."
            },
            {
              type: "code",
              language: "java",
              filename: "ConcurrentHashSetDemo.java",
              code: `import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

public class ConcurrentHashSetDemo {
    public static void main(String[] args) throws InterruptedException {
        // Modern thread-safe Set backed by ConcurrentHashMap
        Set<Integer> threadSafeSet = ConcurrentHashMap.newKeySet();

        Thread t1 = new Thread(() -> {
            for (int i = 0; i < 500; i++) threadSafeSet.add(i);
        });

        Thread t2 = new Thread(() -> {
            for (int i = 500; i < 1000; i++) threadSafeSet.add(i);
        });

        t1.start();
        t2.start();
        t1.join();
        t2.join();

        System.out.println("Total items added concurrently: " + threadSafeSet.size());
    }
}`,
              output: `Total items added concurrently: 1000`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "Standard HashSet is NOT thread-safe. ConcurrentHashMap.newKeySet() is the modern replacement for concurrent multi-threaded environments."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "فئة HashSet غير آمنة في تعدد الخيوط؛ وتُعد ConcurrentHashMap.newKeySet() البديل الحديث الأمثل للبيئات المتزامنة."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Converting HashSet to Array (المثال 11: تحويل HashSet إلى مصفوفة)"
            },
            {
              type: "paragraph",
              text: "Exporting unique elements to a strongly-typed array."
            },
            {
              type: "code",
              language: "java",
              filename: "HashSetToArrayDemo.java",
              code: `import java.util.Arrays;
import java.util.HashSet;

public class HashSetToArrayDemo {
    public static void main(String[] args) {
        HashSet<String> roles = new HashSet<>();
        roles.add("ADMIN");
        roles.add("USER");
        roles.add("MANAGER");

        // Convert to typed array using new T[0] idiom
        String[] roleArray = roles.toArray(new String[0]);

        System.out.println("Converted array type:   " + roleArray.getClass().getSimpleName());
        System.out.println("Converted array length: " + roleArray.length);
        System.out.println("Array contents:         " + Arrays.toString(roleArray));
    }
}`,
              output: `Converted array type:   String[]
Converted array length: 3
Array contents:         [ADMIN, USER, MANAGER]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "roles.toArray(new String[0]) extracts all unique elements into a standard Java array efficiently."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "تستخرج toArray(new String[0]) عناصر المجموعة الفريدة إلى مصفوفة أصلية منسقة بكفاءة."
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
                "Mistake 1: Overriding equals() on a class but forgetting to override hashCode(). This causes identical objects to land in different buckets, breaking duplicate detection.",
                "خطأ 1: كتابة equals() ونسيان hashCode()؛ مما يجعل الكائنات المتطابقة تستقر في خلايا مختلفة وتفشل المجموعة في كشف التكرار.",
                "Mistake 2: Mutating object fields after placing the object inside a HashSet. This corrupts bucket lookups, rendering the object unfindable.",
                "خطأ 2: تعديل خصائص الكائن بعد إضافته في HashSet؛ مما يفسد موقعه في الخلايا ويجعله مفقوداً وغير قابل للاسترجاع.",
                "Mistake 3: Expecting HashSet elements to remain in insertion order. Use LinkedHashSet if insertion order is needed.",
                "خطأ 3: توقع بقاء عناصر HashSet مرتبة بترتيب إدخالها؛ استخدم LinkedHashSet إذا كنت بحاجة للحفاظ على الترتيب.",
                "Mistake 4: Using HashSet concurrently across multiple threads without synchronization, risking infinite loops or data corruption."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Duplicate Detection & Unique Visitor Counter (التحدي العملي: كاشف التكرارات وعداد الزوار الفريدين)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Create a class 'VisitorTracker' that logs website visit events (sessionId, IP address). Implement: 1) 'logVisit(String sessionId)' returning true if this is a first-time visitor, false if duplicate; 2) 'getUniqueCount()'; 3) 'findDuplicateAttempts(List<String> rawSessionIds)' returning a Set of sessions that attempted duplicate visits. Test in main() with sample sessions."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: صمم فئة VisitorTracker لتتبع زوار الموقع. نفّذ: 1) logVisit لتسجيل الزائر وإرجاع true إن كان زائراً جديداً و false إن كان مكرراً؛ 2) getUniqueCount لمعرفة عدد الزوار الفريدين؛ 3) findDuplicateAttempts لفحص قائمة جلسات وإرجاع مجموعة الجلسات التي حاولت الدخول أكثر من مرة. اختبرها في main واطبع النتائج."
            },
            {
              type: "code",
              language: "java",
              filename: "VisitorTrackerChallenge.java",
              code: `import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class VisitorTrackerChallenge {
    static class VisitorTracker {
        private final HashSet<String> uniqueVisitors = new HashSet<>();

        public boolean logVisit(String sessionId) {
            return uniqueVisitors.add(sessionId); // Returns false if duplicate!
        }

        public int getUniqueCount() {
            return uniqueVisitors.size();
        }

        public static Set<String> findDuplicateAttempts(List<String> incomingSessions) {
            Set<String> seen = new HashSet<>();
            Set<String> duplicates = new HashSet<>();

            for (String session : incomingSessions) {
                if (!seen.add(session)) {
                    duplicates.add(session); // Failed to add to seen -> it's a duplicate!
                }
            }
            return duplicates;
        }
    }

    public static void main(String[] args) {
        VisitorTracker tracker = new VisitorTracker();

        System.out.println("Logging session 'sess_A': " + tracker.logVisit("sess_A"));
        System.out.println("Logging session 'sess_B': " + tracker.logVisit("sess_B"));
        System.out.println("Logging session 'sess_A' again: " + tracker.logVisit("sess_A"));
        System.out.println("Total Unique Visitors: " + tracker.getUniqueCount());

        List<String> accessLog = List.of("user1", "user2", "user1", "user3", "user2", "user4");
        Set<String> duplicateUsers = VisitorTracker.findDuplicateAttempts(accessLog);

        System.out.println("Detected repeat visitors: " + duplicateUsers);
    }
}`,
              output: `Logging session 'sess_A': true
Logging session 'sess_B': true
Logging session 'sess_A' again: false
Total Unique Visitors: 2
Detected repeat visitors: [user1, user2]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "tracker.logVisit() directly relies on the boolean returned by HashSet.add(). For batch detection, !seen.add(session) flags duplicates instantly in O(n) total time."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "تعتمد logVisit مباشرة على القيمة المنطقية لدالة add()؛ وفي الفحص المجمع تكشف !seen.add العناصر المكررة فوراً بزمن خطي O(n)."
            }
          ],
          quiz: [
          {
                    "id": "q1",
                    "question": "How is java.util.HashSet implemented internally by the Java Runtime Environment? (كيف تُنفذ فئة HashSet داخلياً في بيئة تشغيل جافا؟)",
                    "options": [
                              "It uses a self-balancing binary search tree.",
                              "It is backed by an internal java.util.HashMap, where set elements are stored as map keys, and all keys map to a shared dummy constant Object (PRESENT).",
                              "It uses an array of linked lists with manual bitwise masking.",
                              "It is an indexed array that forbids duplicate indices."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! HashSet is backed by an internal HashMap<E, Object> instance. Whenever you call set.add(e), it internally executes map.put(e, PRESENT), using the map's key uniqueness to guarantee set uniqueness. (تعتمد HashSet داخلياً على HashMap، حيث تُخزن العناصر كمفاتيح للخريطة وترتبط بكائن رمزي مشترك PRESENT لضمان عدم التكرار)."
          },
          {
                    "id": "q2",
                    "question": "What is guaranteed about the iteration order of elements in a standard java.util.HashSet? (ما الذي يضمنه ترتيب التكرار على عناصر HashSet العادية؟)",
                    "options": [
                              "Elements are always iterated in the exact order they were inserted.",
                              "Elements are always sorted in natural ascending order.",
                              "No order is guaranteed; the iteration order depends on hash codes and internal table capacity, and it may change over time as the set resizes.",
                              "Elements are sorted in descending order."
                    ],
                    "correctIndex": 2,
                    "explanation": "Correct! HashSet makes no guarantees as to the iteration order of the set. It does not guarantee that the order will remain constant over time, especially after rehashing when the capacity expands. (لا تضمن HashSet أي ترتيب معين لعناصرها؛ حيث يعتمد الترتيب على قيم التجزئة وسعة الجدول، وقد يتغير تماماً عند إعادة التوزيع بعد التوسيع)."
          },
          {
                    "id": "q3",
                    "question": "How many null elements does a java.util.HashSet permit? (كم عنصراً بقيمة null تسمح به فئة HashSet؟)",
                    "options": [
                              "Zero: adding null throws a NullPointerException immediately.",
                              "Exactly one null element, which is stored in bucket index 0 with a hash code of 0.",
                              "Unlimited null elements.",
                              "Up to 16 null elements."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! HashSet permits at most one null element. Because HashMap treats null keys as having a hash code of 0 and places them in bucket 0, adding null a second time simply returns false. (تسمح HashSet بعنصر null واحد فقط، حيث تعامله خريطة التجزئة بقيمة تجزئة 0 وتضعه في الحاوية الأولى 0)."
          },
          {
                    "id": "q4",
                    "question": "What critical bug occurs if you override equals() in a custom class but forget to override hashCode(), and then insert instances into a HashSet? (ما هو الخلل الحرج الذي يحدث إذا كتبت دالة equals مخصصة ونسيت كتابة hashCode ثم وضعت الكائنات في HashSet؟)",
                    "options": [
                              "A Compiler error is raised.",
                              "Two logically equal objects will produce different default memory-address hash codes and be placed into different hash buckets, allowing duplicate objects to be inserted and causing contains() to fail.",
                              "The HashSet will throw an IllegalStateException on add().",
                              "The JVM will automatically generate a correct hashCode() using reflection."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! If hashCode() is not overridden, the class inherits Object.hashCode() based on memory address. Two logically equal objects will have different hashCodes, landing in different buckets. Consequently, HashSet fails to detect the duplicate, violating the Set contract. (إذا لم تتم كتابة hashCode، سيرث الكائن دالة Object الافتراضية المبنية على عنوان الذاكرة، فتدخل الكائنات المتساوية منطقياً في حاويات مختلفة، مما يؤدي لوجود كائنات مكررة وفشل البحث)."
          },
          {
                    "id": "q5",
                    "question": "What are the default initial capacity and load factor for a HashSet, and when does rehashing occur? (ما هي السعة الابتدائية الافتراضية ومعامل الحمل لـ HashSet ومتى تحدث إعادة التوزيع؟)",
                    "options": [
                              "Initial capacity is 10, load factor is 1.0; rehashes when size reaches 10.",
                              "Initial capacity is 16, default load factor is 0.75; rehashing occurs when size exceeds 16 * 0.75 = 12 elements.",
                              "Initial capacity is 32, load factor is 0.50; rehashes at 16 elements.",
                              "Initial capacity is 64, load factor is 0.80."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! By default, HashSet initializes with a capacity of 16 and a load factor of 0.75. When the number of entries exceeds threshold = capacity * loadFactor (12 for default capacity 16), the capacity doubles to 32 and all elements are rehashed. (السعة الافتراضية هي 16 ومعامل الحمل 0.75، وتتم مضاعفة السعة وإعادة توزيع العناصر عندما يتجاوز عدد العناصر 12)."
          },
          {
                    "id": "q6",
                    "question": "What is the average time complexity of set.contains(item) and set.add(item) in a HashSet? (ما هو التعقيد الزمني المتوسط لعمليتي contains و add في HashSet؟)",
                    "options": [
                              "O(n)",
                              "O(log n)",
                              "O(1), constant time, assuming the hash function disperses elements properly across buckets.",
                              "O(n^2)"
                    ],
                    "correctIndex": 2,
                    "explanation": "Correct! With a well-distributed hash function, HashSet offers constant time O(1) performance for basic operations (add, remove, contains, size). (توفر HashSet زمناً ثابتاً O(1) للعمليات الأساسية بشرط التوزيع الجيد لدالة التجزئة)."
          },
          {
                    "id": "q7",
                    "question": "Consider this code:\nclass Employee {\n    String name;\n    Employee(String n) { this.name = n; }\n    public boolean equals(Object o) { return o instanceof Employee && ((Employee)o).name.equals(name); }\n    public int hashCode() { return name.hashCode(); }\n}\nSet<Employee> set = new HashSet<>();\nEmployee emp = new Employee(\"Alice\");\nset.add(emp);\nemp.name = \"Bob\"; // mutating field used in hashCode!\nSystem.out.println(set.contains(emp));\nWhat is printed? (ما الذي يطبعه هذا الكود؟)",
                    "options": [
                              "true",
                              "false",
                              "Throws a ConcurrentModificationException",
                              "Throws a NullPointerException"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! This is the classic 'Mutable Hash Key Trap'. Modifying 'emp.name' changes its hashCode from \"Alice\".hashCode() to \"Bob\".hashCode(). When set.contains(emp) is called, HashSet looks in the bucket corresponding to the new hash code, but the element is physically trapped in the old bucket! Thus, contains returns false. (هذا هو فخ تعديل الكائنات: تغيير الاسم يغير قيمة hashCode، فتبحث المجموعة في الحاوية الجديدة بينما الكائن ما زال عالقاً في الحاوية القديمة فيفشل البحث ويُطبع false)."
          },
          {
                    "id": "q8",
                    "question": "In Java 8+, what happens when a single hash bucket in the backing HashMap accumulates more than 8 elements (TREEIFY_THRESHOLD)? (ماذا يحدث في جافا 8+ عندما تتجمع أكثر من 8 عناصر في حاوية تجزئة واحدة؟)",
                    "options": [
                              "The JVM throws an OutOfMemoryError.",
                              "The linked list in that bucket is converted into a balanced Red-Black Tree (TreeNode), preventing worst-case degradation from O(n) to O(log n) (provided total capacity >= 64).",
                              "The duplicate elements are automatically removed.",
                              "The hash table immediately resets to capacity 16."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! In Java 8+, when a bucket's linked list reaches 8 nodes and the table capacity is at least 64, the bucket is transformed into a balanced red-black tree. This bounds the worst-case search complexity to O(log n) instead of O(n) under hash collisions or attacks. (في جافا 8+، تتحول القائمة المترابطة داخل الحاوية إلى شجرة أحمر-وأسود متوازنة عند وصولها لـ 8 عناصر لتحسين البحث في أسوأ الحالات من O(n) إلى O(log n))."
          },
          {
                    "id": "q9",
                    "question": "Is java.util.HashSet thread-safe by default? If not, how can you create a thread-safe Set backed by a hash table? (هل HashSet آمنة لتعدد الخيوط افتراضياً؟ وكيف ننشئ مجموعة آمنة؟)",
                    "options": [
                              "Yes, HashSet is synchronized by default.",
                              "No. To make it thread-safe, use Collections.synchronizedSet(new HashSet<>()) or ConcurrentHashMap.newKeySet().",
                              "No. HashSet cannot be used in multithreaded programs at all.",
                              "Yes, by marking the Set reference with the volatile keyword."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! HashSet is unsynchronized. If multiple threads access it concurrently and at least one modifies it, it must be synchronized externally via Collections.synchronizedSet() or, preferably for high throughput, ConcurrentHashMap.newKeySet(). (فئة HashSet غير متزامنة، ولجعلها آمنة نستخدم Collections.synchronizedSet أو ConcurrentHashMap.newKeySet لأداء أعلى)."
          },
          {
                    "id": "q10",
                    "question": "What is the output of the following code?\nHashSet<String> set = new HashSet<>();\nset.add(\"Java\");\nset.add(\"Python\");\nset.add(null);\nSystem.out.println(set.add(\"Java\") + \" \" + set.add(null) + \" \" + set.size());\n(ما هو ناتج الكود التالي؟)",
                    "options": [
                              "true true 3",
                              "false false 3",
                              "false false 4",
                              "Throws a NullPointerException"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Both \"Java\" and null were already added to the set. When set.add(\"Java\") and set.add(null) are called again, both return false, and the size remains 3 (\"Java\", \"Python\", null). (كلا العنصرين موجودان مسبقاً، لذا يُرجع الاستدعاءان القيمة false ويبقى حجم المجموعة 3)."
          },
          {
                    "id": "q11",
                    "question": "How does calling clone() on a HashSet behave? (كيف تتصرف دالة clone في HashSet؟)",
                    "options": [
                              "It performs a deep clone, creating new duplicate instances of all stored elements.",
                              "It performs a shallow copy: a new HashSet and internal hash table are created, but the element references inside point to the exact same objects in memory.",
                              "It throws a CloneNotSupportedException.",
                              "It creates an immutable read-only set."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! set.clone() produces a shallow copy. The HashSet structure itself is cloned, but the elements themselves are not cloned; both sets share references to the same element instances. (تقوم clone بعملية نسخ سطحي للحاوية، بينما تظل مراجع العناصر المخزنة تشير إلى نفس الكائنات الأصلية في الذاكرة)."
          },
          {
                    "id": "q12",
                    "question": "Why is tuning the initial capacity of a HashSet critical when processing millions of incoming unique records? (لماذا يُعد ضبط السعة الابتدائية لـ HashSet أمراً جوهرياً عند معالجة ملايين السجلات؟)",
                    "options": [
                              "Because Java terminates if a HashSet resizes more than 3 times.",
                              "Because without pre-sizing, the HashSet will undergo dozens of expensive rehash cycles, where the backing table is reallocated and all existing entries are re-indexed, causing major latency spikes.",
                              "Because HashSet cannot expand beyond its initial capacity.",
                              "Because load factor cannot be set manually."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! If processing 1,000,000 items, pre-allocating new HashSet<>((int)(1_000_000 / 0.75f) + 1) avoids approximately 16 consecutive table reallocations and rehashing passes, dramatically accelerating throughput. (تحديد السعة مسبقاً يلغي عمليات إعادة التوزيع وإعادة حجز المصفوفات المتكررة التي تسبب بطئاً وتأخيراً شديداً في الأداء)."
          },
          {
                    "id": "q13",
                    "question": "What is the return value of set.remove(object) when the specified object exists in the HashSet? (ما هي القيمة المرجعة لدالة remove إذا كان العنصر موجوداً في HashSet؟)",
                    "options": [
                              "The removed object itself.",
                              "true",
                              "The index where the object was stored.",
                              "null"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! In the Set interface contract, boolean remove(Object o) returns true if the set contained the specified element and it was successfully removed, and false otherwise. (تُرجع الدالة القيمة true إذا كان العنصر موجوداً وتم حذفه بنجاح، و false إذا لم يكن موجوداً)."
          },
          {
                    "id": "q14",
                    "question": "How can you safely remove elements matching a condition while traversing a HashSet without using Java 8 Streams? (كيف تحذف عناصر تحقق شرطاً معيناً أثناء التكرار على HashSet بأمان؟)",
                    "options": [
                              "Use a standard for-each loop and call set.remove(item).",
                              "Use an explicit Iterator<T> and call iterator.remove().",
                              "Use an indexed for loop: for (int i=0; i<set.size(); i++) set.remove(i);",
                              "Remove elements inside a separate worker thread."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Directly calling set.remove() during a for-each loop invalidates the iterator and triggers a ConcurrentModificationException. The safe idiomatic approach is to call iterator.remove() or use set.removeIf(predicate). (استدعاء set.remove داخل حلقة التكرار يطلق ConcurrentModificationException، والطريقة الآمنة هي استخدام iterator.remove أو دالة removeIf)."
          },
          {
                    "id": "q15",
                    "question": "What is the primary operational advantage of HashSet over an ArrayList for membership testing in a web application with 500,000 active sessions? (ما هي الميزة التشغيلية الأساسية لـ HashSet مقارنة بـ ArrayList لفحص الجلسات النشطة؟)",
                    "options": [
                              "HashSet consumes 90% less memory than ArrayList.",
                              "HashSet checks membership in O(1) constant time, taking mere nanoseconds regardless of whether there are 10 or 500,000 sessions, whereas ArrayList requires an O(n) scan taking milliseconds.",
                              "HashSet automatically encrypts session tokens.",
                              "HashSet writes sessions to disk automatically."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Checking membership in an ArrayList of 500,000 items requires an O(n) linear scan comparing hundreds of thousands of strings. HashSet hashes the key and checks the bucket in O(1) constant time, providing instant responses. (فحص الانتماء في HashSet يتم في زمن فوري O(1) خلال أجزاء من الثانية بصرف النظر عن حجم البيانات، بينما تتطلب ArrayList مسحاً خطياً بطيئاً O(n))."
          }
]
        }
      ]
    }
  ];
})();
