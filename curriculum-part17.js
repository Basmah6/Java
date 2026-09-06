/**
 * Java Curriculum Module - Part 17
 * Topics:
 * 33. hashCode()
 * 34. Java Errors
 * 
 * 100% Offline, Pure JavaScript. Complete educational content with full bilingual (English & Arabic) explanations.
 */

(function () {
  'use strict';

  window.JAVA_TOPICS_PART17 = [
    /* ==========================================================================
       TOPIC 33: hashCode()
       ========================================================================== */
    {
      id: "hash-code-method",
      title: "33. hashCode()",
      description: "Comprehensive Guide to the hashCode() Method: Hash table buckets, the sacred equals/hashCode contract, hash collisions, Objects.hash(), and caching immutable hash codes.",
      lessons: [
        {
          id: "hash-code-mastery",
          title: "Complete Guide to hashCode()",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "Understanding hashCode() in Java (فهم دالة التجزئة hashCode في جافا)"
            },
            {
              type: "paragraph",
              text: "The 'hashCode()' method is defined in java.lang.Object and returns a 32-bit signed integer ('int'). It serves as a numerical fingerprint for an object, allowing hash-based data structures (such as HashMap, HashSet, and LinkedHashMap) to distribute objects into buckets for near-constant O(1) average-time lookups, insertions, and deletions."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "دالة 'hashCode()' معرفة في الفئة الأساسية java.lang.Object وتُرجع رقماً صحيحاً 32-بت (int). يمثل هذا الرقم بصمة رقمية فريدة للكائن، وتعتمد عليه هياكل البيانات القائمة على جداول التجزئة (مثل HashMap و HashSet) لتوزيع الكائنات في سلال (Buckets) للوصول إليها بسرعة فائقة بزمن قياسي يقترب من O(1)."
            },
            {
              type: "paragraph",
              text: "The Sacred equals/hashCode Contract: 1) Consistency: Multiple invocations on the same object must consistently return the same integer provided fields haven't changed; 2) Equality: If two objects are equal according to equals(), they MUST return the exact same hashCode; 3) Collision tolerance: Two unequal objects MAY share the same hashCode, but minimizing collisions maximizes hash table performance."
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
              text: "Example 1: Default Identity Hash Code vs Content Hash Code (المثال 1: كود التجزئة الافتراضي للهوية مقابل كود المحتوى)"
            },
            {
              type: "paragraph",
              text: "By default, Object.hashCode() generates an internal integer derived from the object's memory address."
            },
            {
              type: "code",
              language: "java",
              filename: "DefaultHashCodeDemo.java",
              code: `public class DefaultHashCodeDemo {
    static class PlainBook {
        String title;
        PlainBook(String t) { this.title = t; }
    }

    public static void main(String[] args) {
        PlainBook b1 = new PlainBook("Clean Code");
        PlainBook b2 = new PlainBook("Clean Code");

        System.out.println("b1 hashCode: " + b1.hashCode());
        System.out.println("b2 hashCode: " + b2.hashCode());
        System.out.println("Are hash codes equal? " + (b1.hashCode() == b2.hashCode()));
    }
}`,
              output: `b1 hashCode: 2055281021
b2 hashCode: 1554547125
Are hash codes equal? false`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "Because PlainBook did not override hashCode(), two separate objects with the same title produced completely different hash codes."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "لأن الفئة لم تتجاوز hashCode، أنتج الكائنان المنفصلان أرقام تجزئة مختلفة تماماً بالرغم من تطابق عنوان الكتاب."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: The Broken HashSet Bug (Equals without HashCode) (المثال 2: خطأ اختفاء الكائنات في HashSet عند نسيان hashCode)"
            },
            {
              type: "paragraph",
              text: "Overriding equals() without overriding hashCode() causes hash collections to lose your objects."
            },
            {
              type: "code",
              language: "java",
              filename: "BrokenHashSetDemo.java",
              code: `import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

public class BrokenHashSetDemo {
    static class Member {
        int id;
        Member(int id) { this.id = id; }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (!(o instanceof Member other)) return false;
            return this.id == other.id;
        }
        // FORGOT TO OVERRIDE hashCode()!
    }

    public static void main(String[] args) {
        Set<Member> club = new HashSet<>();
        Member m1 = new Member(101);
        club.add(m1);

        Member lookup = new Member(101);
        System.out.println("m1.equals(lookup):            " + m1.equals(lookup));
        System.out.println("club.contains(new Member(101)): " + club.contains(lookup)); // prints FALSE!
    }
}`,
              output: `m1.equals(lookup):            true
club.contains(new Member(101)): false`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "HashSet first looks up the bucket using hashCode(). Because m1 and lookup have different hash codes, HashSet checks the wrong bucket and returns false!"
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "تبحث الـ HashSet أولاً في السلة المقابلة لـ hashCode؛ ولأن الرقمين اختلفا بحثت في سلة خاطئة ولم تجد الكائن رغم تطابقه!"
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Standard Objects.hash() Implementation (المثال 3: التطبيق القياسي باستخدام Objects.hash)"
            },
            {
              type: "paragraph",
              text: "Using java.util.Objects.hash(...) for clean, multi-field hash computation."
            },
            {
              type: "code",
              language: "java",
              filename: "ObjectsHashDemo.java",
              code: `import java.util.Objects;

public class ObjectsHashDemo {
    static class Student {
        private final int rollNumber;
        private final String department;

        Student(int roll, String dept) {
            this.rollNumber = roll;
            this.department = dept;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (!(o instanceof Student s)) return false;
            return this.rollNumber == s.rollNumber &&
                   Objects.equals(this.department, s.department);
        }

        @Override
        public int hashCode() {
            // Generates synchronized hash code matching equals()
            return Objects.hash(rollNumber, department);
        }
    }

    public static void main(String[] args) {
        Student s1 = new Student(50, "Computer Science");
        Student s2 = new Student(50, "Computer Science");

        System.out.println("s1.hashCode(): " + s1.hashCode());
        System.out.println("s2.hashCode(): " + s2.hashCode());
        System.out.println("Equal hash codes? " + (s1.hashCode() == s2.hashCode()));
    }
}`,
              output: `s1.hashCode(): 1248902511
s2.hashCode(): 1248902511
Equal hash codes? true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "Objects.hash combines primitive and reference fields, guaranteeing identical hash codes for logically equal objects."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "تدمج دالة Objects.hash حقول الأرقام والنصوص في كود تجزئة متطابق تماماً للكائنات المتساوية منطقياً."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Traditional Joshua Bloch 31-Multiplier Algorithm (المثال 4: خوارزمية جوشوا بلوخ الكلاسيكية بالضرب في 31)"
            },
            {
              type: "paragraph",
              text: "Writing a high-speed manual hash calculation without varargs array overhead."
            },
            {
              type: "code",
              language: "java",
              filename: "Classic31HashDemo.java",
              code: `public class Classic31HashDemo {
    static class GeoCoordinate {
        private final int latitudeE6;
        private final int longitudeE6;

        GeoCoordinate(int lat, int lon) {
            this.latitudeE6 = lat;
            this.longitudeE6 = lon;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (!(o instanceof GeoCoordinate other)) return false;
            return this.latitudeE6 == other.latitudeE6 &&
                   this.longitudeE6 == other.longitudeE6;
        }

        @Override
        public int hashCode() {
            // 31 * i == (i << 5) - i (optimized by JIT to bit shifts)
            int result = 17;
            result = 31 * result + latitudeE6;
            result = 31 * result + longitudeE6;
            return result;
        }
    }

    public static void main(String[] args) {
        GeoCoordinate coord = new GeoCoordinate(24713600, 46675300);
        System.out.println("Calculated GeoCoordinate hash: " + coord.hashCode());
    }
}`,
              output: `Calculated GeoCoordinate hash: 1779836371`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "Multiplying by the odd prime 31 produces an even distribution and allows modern JVMs to optimize multiplication into fast bit-shifts."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "الضرب في الرقم الأولي 31 يحقق توزيعاً ممتازاً في الذاكرة ويقوم مترجم الـ JIT بتحويله إلى إزاحة بتات سريعة للغاية."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Hash Code Collisions (Different Objects, Same Hash) (المثال 5: تصادم كود التجزئة Hash Collision)"
            },
            {
              type: "paragraph",
              text: "Demonstrating that two completely different objects can share the exact same 32-bit hash code."
            },
            {
              type: "code",
              language: "java",
              filename: "HashCollisionDemo.java",
              code: `public class HashCollisionDemo {
    public static void main(String[] args) {
        // Classic Java String hash collision: "FB" and "Ea"
        String s1 = "FB";
        String s2 = "Ea";

        System.out.println("s1: \"" + s1 + "\" | hashCode: " + s1.hashCode());
        System.out.println("s2: \"" + s2 + "\" | hashCode: " + s2.hashCode());
        System.out.println("Are strings equal?     " + s1.equals(s2));
        System.out.println("Are hash codes equal? " + (s1.hashCode() == s2.hashCode()));
    }
}`,
              output: `s1: "FB" | hashCode: 2236
s2: "Ea" | hashCode: 2236
Are strings equal?     false
Are hash codes equal? true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "Hash collision is normal and expected in 32-bit spaces. HashMap resolves collisions using linked lists or red-black trees in the bucket."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "تصادم التجزئة أمر طبيعي ومقبول رياضياً، وتقوم الـ HashMap بحله داخلياً عبر القوائم المترابطة أو أشجار Red-Black داخل نفس السلة."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Hashing Array Fields with Arrays.hashCode() (المثال 6: تجزئة مصفوفات الحقول بـ Arrays.hashCode)"
            },
            {
              type: "paragraph",
              text: "Calling array.hashCode() returns identity hash; use java.util.Arrays.hashCode() for content hashing."
            },
            {
              type: "code",
              language: "java",
              filename: "ArrayHashCodeDemo.java",
              code: `import java.util.Arrays;

public class ArrayHashCodeDemo {
    static class TokenSignature {
        byte[] secretBytes;

        TokenSignature(byte[] bytes) { this.secretBytes = bytes; }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (!(o instanceof TokenSignature other)) return false;
            return Arrays.equals(this.secretBytes, other.secretBytes);
        }

        @Override
        public int hashCode() {
            // Arrays.hashCode computes hash based on elements inside the array
            return Arrays.hashCode(secretBytes);
        }
    }

    public static void main(String[] args) {
        TokenSignature t1 = new TokenSignature(new byte[]{10, 20, 30});
        TokenSignature t2 = new TokenSignature(new byte[]{10, 20, 30});

        System.out.println("t1 hashCode: " + t1.hashCode());
        System.out.println("t2 hashCode: " + t2.hashCode());
        System.out.println("Are hash codes matched? " + (t1.hashCode() == t2.hashCode()));
    }
}`,
              output: `t1 hashCode: 39391
t2 hashCode: 39391
Are hash codes matched? true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "Always pair Arrays.equals() with Arrays.hashCode() when a class's identity depends on array contents."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "يجب دائماً استخدام Arrays.hashCode مع Arrays.equals لضمان حساب بصمة العناصر داخل المصفوفة بدقة."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Caching Hash Codes for Immutable Objects (المثال 7: التخزين المؤقت للـ Hash في الكائنات غير القابلة للتغيير)"
            },
            {
              type: "paragraph",
              text: "Performance pattern: Calculate the hash once and cache it (just like java.lang.String does)."
            },
            {
              type: "code",
              language: "java",
              filename: "CachedHashCodeDemo.java",
              code: `import java.util.Objects;

public class CachedHashCodeDemo {
    static final class LargeImmutableDocument {
        private final String textContent;
        private int cachedHash; // Defaults to 0

        LargeImmutableDocument(String content) {
            this.textContent = Objects.requireNonNull(content);
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (!(o instanceof LargeImmutableDocument other)) return false;
            return this.textContent.equals(other.textContent);
        }

        @Override
        public int hashCode() {
            int h = cachedHash;
            if (h == 0 && textContent.length() > 0) {
                h = textContent.hashCode();
                cachedHash = h; // Cache for all subsequent lookups
            }
            return h;
        }
    }

    public static void main(String[] args) {
        LargeImmutableDocument doc = new LargeImmutableDocument("Extensive legal contract text...");

        System.out.println("First call (computed):  " + doc.hashCode());
        System.out.println("Second call (cached):    " + doc.hashCode());
    }
}`,
              output: `First call (computed):  1408170284
Second call (cached):    1408170284`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "Caching hash codes in immutable classes saves CPU cycles during repeated map lookups."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "حفظ كود التجزئة في متغير مؤقت داخل الفئات الثابتة يوفر معالجة المعالج عند تكرار البحث في الخرائط."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: System.identityHashCode() for Memory Identity (المثال 8: استخراج كود هوية الذاكرة الأصلي)"
            },
            {
              type: "paragraph",
              text: "Retrieving the default JVM memory hash even when hashCode() has been overridden."
            },
            {
              type: "code",
              language: "java",
              filename: "SystemIdentityHashDemo.java",
              code: `public class SystemIdentityHashDemo {
    static class CustomEntity {
        @Override
        public int hashCode() {
            return 999; // Constant overridden hash
        }
    }

    public static void main(String[] args) {
        CustomEntity e = new CustomEntity();

        System.out.println("Overridden hashCode:       " + e.hashCode());
        System.out.println("JVM Identity hashCode:     " + System.identityHashCode(e));
    }
}`,
              output: `Overridden hashCode:       999
JVM Identity hashCode:     1867083167`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "System.identityHashCode(obj) bypasses overridden hashCode() methods, returning the raw memory-derived identity hash."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "تتجاوز دالة System.identityHashCode أي تجاوز يدوي لدالة hashCode وتستخرج رقم الذاكرة الفعلي للكائن."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: The Deadly Mutable Key Trap in HashMaps (المثال 9: فخ تعديل المفتاح داخل HashMap)"
            },
            {
              type: "paragraph",
              text: "CRITICAL: Mutating an object after storing it as a map key permanently breaks key lookup."
            },
            {
              type: "code",
              language: "java",
              filename: "MutableKeyTrapDemo.java",
              code: `import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

public class MutableKeyTrapDemo {
    static class MutableKey {
        int id;
        MutableKey(int id) { this.id = id; }

        @Override
        public boolean equals(Object o) {
            return (o instanceof MutableKey other) && this.id == other.id;
        }

        @Override
        public int hashCode() { return Objects.hash(id); }
    }

    public static void main(String[] args) {
        Map<MutableKey, String> map = new HashMap<>();
        MutableKey key = new MutableKey(1);
        map.put(key, "VIP Admin Session");

        System.out.println("Lookup before mutation: " + map.get(key));

        // DANGER: Mutate key field after insertion!
        key.id = 999;

        // The hash code changed! HashMap looks in bucket 999 instead of bucket 1!
        System.out.println("Lookup after mutation:  " + map.get(key)); // Prints null!
    }
}`,
              output: `Lookup before mutation: VIP Admin Session
Lookup after mutation:  null`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "Never mutate fields used in hashCode() while the object is inside a hash table. The key becomes stranded in the wrong bucket."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "إياك وتعديل حقول الكائن المستخدمة في التجزئة بعد وضعه كمفتاح في HashMap؛ سيتغير رقمه ويضيع في سلة قديمة للأبد."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Automatic hashCode() in Java Records (المثال 10: توليد hashCode التلقائي في سجلات Records)"
            },
            {
              type: "paragraph",
              text: "Modern Java records implement mathematical hashCode() contracts out of the box."
            },
            {
              type: "code",
              language: "java",
              filename: "RecordHashCodeDemo.java",
              code: `public class RecordHashCodeDemo {
    record StockTicker(String symbol, String exchange) {}

    public static void main(String[] args) {
        StockTicker t1 = new StockTicker("NVDA", "NASDAQ");
        StockTicker t2 = new StockTicker("NVDA", "NASDAQ");

        System.out.println("Record t1 hashCode: " + t1.hashCode());
        System.out.println("Record t2 hashCode: " + t2.hashCode());
        System.out.println("HashCodes equal?   " + (t1.hashCode() == t2.hashCode()));
    }
}`,
              output: `Record t1 hashCode: 1874291884
Record t2 hashCode: 1874291884
HashCodes equal?   true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "Records calculate hashCode() based on all components, adhering perfectly to the equals/hashCode contract."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "تحسب سجلات Records رقم التجزئة بناءً على جميع مكوناتها محققة التطابق الكامل مع دالة equals تلقائياً."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Enterprise Distributed Cache Key with Multi-Field Hashing (المثال 11: مفتاح التخزين المؤقت الموزع متعدد الحقول)"
            },
            {
              type: "paragraph",
              text: "Advanced: High-throughput Redis/Memcached key generator combining tenant ID, region, and cache TTL."
            },
            {
              type: "code",
              language: "java",
              filename: "DistributedCacheKeyMaster.java",
              code: `import java.util.Objects;

public class DistributedCacheKeyMaster {
    static final class CacheKey {
        private final String tenantId;
        private final String region;
        private final long entityId;

        CacheKey(String tenant, String region, long entityId) {
            this.tenantId = Objects.requireNonNull(tenant);
            this.region = Objects.requireNonNull(region);
            this.entityId = entityId;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (!(o instanceof CacheKey other)) return false;
            return this.entityId == other.entityId &&
                   this.tenantId.equals(other.tenantId) &&
                   this.region.equals(other.region);
        }

        @Override
        public int hashCode() {
            // High dispersion hash for clustered partitions
            int hash = 31 * tenantId.hashCode() + region.hashCode();
            return 31 * hash + Long.hashCode(entityId);
        }

        @Override
        public String toString() {
            return tenantId + ":" + region + ":" + entityId;
        }
    }

    public static void main(String[] args) {
        CacheKey k1 = new CacheKey("TENANT_CORP_01", "me-central1", 9901824L);
        CacheKey k2 = new CacheKey("TENANT_CORP_01", "me-central1", 9901824L);

        System.out.println("Cache Key 1: " + k1 + " [hash: " + k1.hashCode() + "]");
        System.out.println("Cache Key 2: " + k2 + " [hash: " + k2.hashCode() + "]");
        System.out.println("Keys equal and matching: " + (k1.equals(k2) && k1.hashCode() == k2.hashCode()));
    }
}`,
              output: `Cache Key 1: TENANT_CORP_01:me-central1:9901824 [hash: -1847192305]
Cache Key 2: TENANT_CORP_01:me-central1:9901824 [hash: -1847192305]
Keys equal and matching: true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "Enterprise caching layers use composite hashCode implementations to uniformly distribute traffic across Redis cluster nodes."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "تعتمد خوادم التخزين المؤقت المؤسسية على دمج حقول المفاتيح في دالة تجزئة متينة لتوزيع الضغط على العقد السحابية بعدالة."
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
                "Mistake 1: Returning a constant like 'return 42;' in hashCode(). While technically legal according to the contract, it degenerates HashMap performance from O(1) to O(N) by turning every bucket into a slow linked list.",
                "خطأ 1: إرجاع رقم ثابت مثل return 1 في دالة hashCode؛ هذا يدمر أداء الـ HashMap ويحولها لقائمة خطية بطيئة O(N).",
                "Mistake 2: Including fields in hashCode() that are not checked in equals(). If two objects are equal, their hash codes must be identical.",
                "خطأ 2: استخدام حقول في حساب التجزئة لم يتم فحصها في equals، مما يكسر التوافق بين الدالتين.",
                "Mistake 3: Mutating the fields of an object after using it as a key in a HashMap or HashSet."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Secure Session Token Cache (التحدي العملي: مخزن مؤقت لرموز الجلسات المشفرة)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Create a 'SessionToken' class: 1) Fields: sessionId (String) and userId (int); 2) Override equals() to check both sessionId and userId; 3) Override hashCode() using Objects.hash(sessionId, userId); 4) In main(), store a SessionToken in a HashSet, then perform a lookup with a new distinct instance carrying the identical values; 5) Verify that the set reports 'contains == true'."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: صمم فئة SessionToken: 1) الحقول: sessionId و userId؛ 2) تجاوز equals لفحص الحقلين؛ 3) تجاوز hashCode باستخدام Objects.hash(sessionId, userId)؛ 4) في main خزن رمزا في HashSet ثم ابحث عنه باستخدام كائن جديد يحمل نفس القيم؛ 5) تأكد من أن الـ Set تعيد true."
            },
            {
              type: "code",
              language: "java",
              filename: "SessionTokenChallenge.java",
              code: `import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

public class SessionTokenChallenge {
    static class SessionToken {
        private final String sessionId;
        private final int userId;

        SessionToken(String session, int user) {
            this.sessionId = session;
            this.userId = user;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (!(o instanceof SessionToken other)) return false;
            return this.userId == other.userId &&
                   Objects.equals(this.sessionId, other.sessionId);
        }

        @Override
        public int hashCode() {
            return Objects.hash(sessionId, userId);
        }
    }

    public static void main(String[] args) {
        Set<SessionToken> activeSessions = new HashSet<>();
        activeSessions.add(new SessionToken("TOK_9941_XYZ", 404));

        SessionToken lookupToken = new SessionToken("TOK_9941_XYZ", 404);

        System.out.println("Session successfully retrieved from Set: " +
            activeSessions.contains(lookupToken));
    }
}`,
              output: `Session successfully retrieved from Set: true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "Synchronizing equals() and hashCode() allows the HashSet to calculate the exact same bucket index, successfully finding the token."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "تطابق دالتي equals و hashCode مكن الـ HashSet من العثور على نفس سلة التخزين واسترجاع الجلسة بنجاح تام."
            }
          ],
          quiz: [
                    {
                              "id": "q1",
                              "question": "What is the primary purpose of the hashCode() method in Java?\n(ما هو الغرض الأساسي من دالة hashCode في جافا؟)",
                              "options": [
                                        "To encrypt the object for secure storage.",
                                        "To return an integer hash value used by hash-based collections (like HashMap, HashSet, Hashtable) to partition and locate objects efficiently into buckets.",
                                        "To measure the CPU time spent constructing the object.",
                                        "To generate a unique primary key in the database."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! The hashCode() method returns an integer used by hash-based data structures to determine bucket placement, enabling near O(1) average time complexity for insertions and lookups. (تعيد دالة hashCode رقماً صحيحاً تستخدمه هياكل البيانات المبنية على التجزئة مثل HashMap لتوزيع الكائنات في سلال Buckets والوصول إليها بسرعة O(1))."
                    },
                    {
                              "id": "q2",
                              "question": "What is the MANDATORY rule of the equals-hashCode contract in Java?\n(ما هي القاعدة الإلزامية الصارمة لعقد equals-hashCode في جافا؟)",
                              "options": [
                                        "If two objects have the same hashCode, they MUST be equal according to equals().",
                                        "If two objects are equal according to equals(), they MUST have the exact same integer hashCode value.",
                                        "Unequal objects must always have negative hash codes.",
                                        "hashCode() must never return 0."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! The contract mandates that if a.equals(b) is true, then a.hashCode() == b.hashCode() MUST be true. The reverse is not required: two unequal objects may produce the same hash code (a hash collision). (ينص العقد الإلزامي على أنه إذا تساوى كائنان بـ equals، وجب حتماً تطابق كود الـ hashCode لهما؛ بينما تشابه الـ hash لكائنين مختلفين جائز ويسمى تصادماً)."
                    },
                    {
                              "id": "q3",
                              "question": "What is the classic 'Broken HashSet Bug' that occurs when a class overrides equals() but fails to override hashCode()?\n(ما هو خطأ 'HashSet المعطوبة' الكلاسيكي الذي يحدث عندما تتجاوز الفئة دالة equals وتهمل تجاوز hashCode؟)",
                              "options": [
                                        "The program fails to compile.",
                                        "Logically equal objects produce different identity hash codes, causing them to be mapped to different buckets, so set.contains(duplicate) returns false!",
                                        "The HashSet throws a ConcurrentModificationException immediately.",
                                        "All objects in the HashSet are deleted."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Without an overridden hashCode(), instances inherit Object's identity hash code. Two logically equal objects will produce different hashes and land in different buckets; set.contains() looks in the wrong bucket and fails to find the object! (بدون تجاوز hashCode ترث الكائنات كود الذاكرة الافتراضي، فتذهب الكائنات المتساوية منطقياً لسلال مختلفة ويفشل set.contains في العثور عليها ويعيد false)."
                    },
                    {
                              "id": "q4",
                              "question": "What does the Consistency clause of the hashCode() contract mandate?\n(ما الذي يفرضه شرط الثبات Consistency في عقد دالة hashCode؟)",
                              "options": [
                                        "The hash code must match the object's memory address.",
                                        "Multiple invocations of hashCode() on the same object during an application run must consistently return the same integer, provided no fields used in equals() are modified.",
                                        "The hash code must remain identical across different JVM runs on different servers.",
                                        "All instances of a class must return the same integer."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! As long as the properties compared in equals() remain unchanged, calling hashCode() on that object must consistently return the exact same integer throughout that execution of the application. (يجب أن تعيد الدالة نفس الرقم الصحيح في كل مرة تُستدعى فيها على نفس الكائن خلال تشغيل البرنامج، ما دامت الحقول المستخدمة في المقارنة لم تتغير)."
                    },
                    {
                              "id": "q5",
                              "question": "Why is the prime number 31 traditionally used as the multiplier in Joshua Bloch's classic hash code algorithm (result = 31 * result + fieldHash)?\n(لماذا يُستخدم العدد الأولي 31 تقليدياً كمعامل ضرب في خوارزمية جوشوا بلوخ الكلاسيكية لحساب الـ Hash؟)",
                              "options": [
                                        "Because 31 is the maximum number of fields allowed in a Java class.",
                                        "31 is an odd prime that prevents information loss during multiplication, and modern JVMs optimize '31 * i' into a blazing-fast bit-shift and subtraction: (i << 5) - i.",
                                        "Because 31 represents the number of days in the longest month.",
                                        "Because Java 1.0 was released on the 31st of January."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Using an odd prime avoids zeroing out bits during arithmetic overflow, distributing hashes evenly. Furthermore, the JVM JIT compiler optimizes multiplication by 31 into a single CPU shift instruction: (i << 5) - i. (اختيار 31 كعدد أولي فردي يوزع كود الهاش بتوازن ويمنع فقدان البتات، كما يحولها مصرف الـ JVM إلى إزاحة بتات سريعة للغاية (i << 5) - i على مستوى المعالج)."
                    },
                    {
                              "id": "q6",
                              "question": "How does the modern Java utility method Objects.hash(Object... values) compute hash codes?\n(كيف تحسب دالة الأدوات الحديثة Objects.hash(...) كود التجزئة؟)",
                              "options": [
                                        "It delegates to a native C library.",
                                        "It bundles the passed arguments into an array and calls Arrays.hashCode(array), providing a clean, concise implementation.",
                                        "It generates a random integer.",
                                        "It queries the operating system kernel."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Objects.hash(f1, f2, ...) passes the fields as a varargs array to Arrays.hashCode(values). While convenient, it creates a small varargs array allocation on each call, so high-throughput applications sometimes write manual algorithms. (تجمع دالة Objects.hash المعاملات في مصفوفة وتمررها لـ Arrays.hashCode، وهي طريقة أنيقة ومختصرة لكنها تحجز مصفوفة صغيرة عند كل استدعاء)."
                    },
                    {
                              "id": "q7",
                              "question": "What is a 'Hash Collision' in Java, and is it a bug?\n(ما هو تصادم كود التجزئة Hash Collision في جافا وهل يُعتبر خطأً برمجياً؟)",
                              "options": [
                                        "A fatal JVM crash caused by corrupted memory.",
                                        "When two distinct, unequal objects produce the exact same integer hashCode value; it is completely legal, expected (by the Pigeonhole Principle), and handled by collections using bucket collision resolution.",
                                        "A compile-time error when two classes have the same name.",
                                        "A network packet drop."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Because an int has only 2^32 possible values and the number of possible objects is infinite, collisions are mathematically inevitable. Java hash tables handle collisions gracefully using linked lists or red-black trees in buckets. (التصادم يحدث عندما ينتج كائنان مختلفان نفس كود الهاش؛ وهو أمر طبيعي وحتمي رياضياً وتتعامل معه مجموعات جافا بمرونة داخل السلال عبر القوائم والأشجار المتوازنة)."
                    },
                    {
                              "id": "q8",
                              "question": "How must array fields be hashed inside an overridden hashCode() method?\n(كيف يجب تجزئة حقول المصفوفات داخل دالة hashCode المتجاوزة؟)",
                              "options": [
                                        "Using array.hashCode()",
                                        "Using Arrays.hashCode(array) for 1D arrays or Arrays.deepHashCode() for multidimensional arrays.",
                                        "By adding the array length to 31.",
                                        "By converting the array to a String."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! array.hashCode() simply returns the memory address hash of the array object itself, completely ignoring its contents. Arrays.hashCode(array) computes a hash based on the actual values inside the array. (استدعاء array.hashCode يحسب الهاش لعنوان المصفوفة ويهمل محتواها، بينما Arrays.hashCode تحسب كود التجزئة بناءً على القيم الحقيقية للعناصر)."
                    },
                    {
                              "id": "q9",
                              "question": "Why do immutable classes with expensive hash calculations (like java.lang.String) cache their computed hash code in a private field?\n(لماذا تقوم الفئات غير القابلة للتغيير مثل String بتخزين كود التجزئة مؤقتاً في حقل خاص؟)",
                              "options": [
                                        "Because hash codes expire after 60 seconds.",
                                        "Because the object's contents can never change, the hash code can be computed once on demand (lazy initialization) and reused on all subsequent calls, boosting performance.",
                                        "To prevent unauthorized threads from reading the string.",
                                        "Because Object.hashCode() requires caching."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Since an immutable object's state never changes, its hash code is invariant. String caches its hash in a private int field: computing it once allows all subsequent hashCode() calls to return in O(1) time without re-traversing characters. (بما أن الكائن غير قابل للتغيير فإن محتواه ثابت؛ وتخزين الهاش بعد أول عملية حسابية يسمح بإعادته فوراً في المرات اللاحقة بسرعة O(1) دون إعادة المرور على الأحرف)."
                    },
                    {
                              "id": "q10",
                              "question": "What does System.identityHashCode(Object obj) return in Java?\n(ما الذي تعيده الدالة القياسية System.identityHashCode(obj) في جافا؟)",
                              "options": [
                                        "The thread ID of the current thread.",
                                        "The default identity hash code that would have been returned by java.lang.Object.hashCode(), regardless of whether obj's class overrides hashCode().",
                                        "The process ID of the JVM.",
                                        "The system clock time in milliseconds."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! System.identityHashCode(x) always returns the default identity hash code computed by Object.hashCode() for reference x, bypassing any custom hashCode() implementation defined by the class. (تعيد دائماً كود التجزئة الافتراضي الأصلي الخاص بهوية الذاكرة الموروث من Object، متجاهلة أي تجاوز مخصص لدالة hashCode في فئة الكائن)."
                    },
                    {
                              "id": "q11",
                              "question": "Can an object's hashCode() method return a NEGATIVE integer in Java?\n(هل يمكن لدالة hashCode أن تعيد عدداً سالباً في جافا؟)",
                              "options": [
                                        "No, negative numbers cause an ArithmeticException in HashMaps.",
                                        "Yes, Java integers are signed 32-bit values (-2,147,483,648 to 2,147,483,647); hash tables convert negative hashes into non-negative bucket indices using bitwise masking (e.g. hash & 0x7FFFFFFF).",
                                        "Only if the object is empty.",
                                        "Only in 64-bit JVMs."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! int in Java is signed, so negative hash codes are completely normal and legal. Hash collections convert negative hash codes to positive bucket indices using bitwise masking or modulo operations: (hash & 0x7fffffff) % capacity. (الأعداد في جافا ذات إشارة signed، وعودة رقم سالب أمر طبيعي وقانوني تماماً، وتقوم هياكل الهاش بتحويله إلى مؤشر سلة موجب باستخدام قناع البتات hash & 0x7fffffff)."
                    },
                    {
                              "id": "q12",
                              "question": "Why is computing hashCode() from mutable fields a dangerous pitfall when using objects as keys in a HashMap?\n(لماذا يعتبر بناء hashCode على حقول قابلة للتعديل خطراً جسيماً عند استخدام الكائن كمفتاح في HashMap؟)",
                              "options": [
                                        "Because the HashMap becomes read-only.",
                                        "If a key's fields are modified while inside the map, its hash code changes. The map will search in a different bucket and fail to find the key, causing the entry to become stranded and lost.",
                                        "Because mutable fields cannot be converted to integers.",
                                        "Because the JVM will terminate the process."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! If a key's hash changes while inside a HashMap, map.get(key) recalculates the new hash and inspects the wrong bucket. The original entry is trapped in the old bucket and becomes impossible to retrieve or remove! (إذا عُدلت حقول المفتاح وهو داخل الـ Map، يتغير كود الهاش؛ وعند البحث عنه تبحث الـ Map في سلة جديدة ولا تعثر عليه فيضيع المفتاح ويحدث تسريب بالذاكرة)."
                    },
                    {
                              "id": "q13",
                              "question": "What is printed by executing the following code?\n\nimport java.util.*;\n\nclass Coordinate {\n    int x, y;\n    Coordinate(int x, int y) { this.x = x; this.y = y; }\n    @Override\n    public boolean equals(Object o) {\n        if (this == o) return true;\n        if (o == null || getClass() != o.getClass()) return false;\n        Coordinate c = (Coordinate) o;\n        return x == c.x && y == c.y;\n    }\n}\npublic class TestApp {\n    public static void main(String[] args) {\n        Set<Coordinate> set = new HashSet<>();\n        set.add(new Coordinate(10, 20));\n        System.out.println(set.contains(new Coordinate(10, 20)));\n    }\n}",
                              "options": [
                                        "true",
                                        "false",
                                        "Compile-time error",
                                        "NullPointerException"
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Coordinate overrides equals() but fails to override hashCode(). The two distinct new Coordinate(10, 20) instances get different default identity hash codes from Object. HashSet searches the wrong bucket, printing 'false'! (تجاوزت الفئة equals لكنها نسيت hashCode؛ فيحصل الكائن الجديد على هاش مختلف ويبحث الـ HashSet في السلة الخاطئة وتكون النتيجة false)."
                    },
                    {
                              "id": "q14",
                              "question": "What happens if a class defines 'public int hashCode() { return 42; }' for all instances?\n(ماذا يحدث إذا عرفت فئة دالة الهاش لتعيد دائماً الرقم الثابت 42 لكافة الكائنات؟)",
                              "options": [
                                        "It violates the Java language specification and fails to compile.",
                                        "It is technically legal and satisfies the equals-hashCode contract (equal objects always have equal hashes), but degrades HashMap/HashSet performance from O(1) to O(N) because all entries land in a single bucket.",
                                        "The JVM crashes with a StackOverflowError.",
                                        "Only 42 objects can be stored in memory."
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Returning a constant satisfies the contract (equal objects have equal hashes: 42 == 42). However, it destroys hashing performance: all entries collide in bucket 42, turning the hash table into a slow linked list or balanced tree of O(n) or O(log n). (إعادة رقم ثابت يحقق شرط العقد حرفياً ولا يكسر القانون، لكنه يدمر أداء الهاش تماماً حيث تتجمع كافة الكائنات في سلة واحدة وتتحول عمليات البحث من O(1) إلى O(N) بطيئة جداً)."
                    },
                    {
                              "id": "q15",
                              "question": "What is printed by executing the following code?\n\nimport java.util.Objects;\n\nclass Product {\n    int id;\n    String name;\n    Product(int id, String name) { this.id = id; this.name = name; }\n    @Override\n    public boolean equals(Object o) {\n        if (this == o) return true;\n        if (o == null || getClass() != o.getClass()) return false;\n        Product p = (Product) o;\n        return id == p.id && Objects.equals(name, p.name);\n    }\n    @Override\n    public int hashCode() {\n        return Objects.hash(id, name);\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Product p1 = new Product(101, \"Laptop\");\n        Product p2 = new Product(101, \"Laptop\");\n        System.out.println(p1.equals(p2) + \" \" + (p1.hashCode() == p2.hashCode()));\n    }\n}",
                              "options": [
                                        "true false",
                                        "true true",
                                        "false true",
                                        "false false"
                              ],
                              "correctIndex": 1,
                              "explanation": "Correct! Product adheres strictly to the equals-hashCode contract: p1.equals(p2) is true, and Objects.hash(id, name) produces identical hash codes for identical values. Output: 'true true'. (تلتزم الفئة بالعقد القياسي بدقة؛ فالكائنان متساويان بـ equals وكود الهاش متطابق لكلا الكائنين بناءً على قيمهما، فيطبع الكود true true بنجاح)."
                    }
          ]
        }
      ]
    },

    /* ==========================================================================
       TOPIC 34: Java Errors
       ========================================================================== */
    {
      id: "java-errors",
      title: "34. Java Errors",
      description: "Comprehensive Guide to java.lang.Error in Java: Fatal system conditions, Throwable hierarchy, StackOverflowError, OutOfMemoryError, LinkageError, and recovery strategies.",
      lessons: [
        {
          id: "java-errors-mastery",
          title: "Complete Guide to Java Errors",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "Understanding Java Errors vs Exceptions (فهم أخطاء النظام في جافا مقابل الاستثناءات)"
            },
            {
              type: "paragraph",
              text: "In the Java Throwable hierarchy, 'java.lang.Error' sits directly alongside 'java.lang.Exception' under 'java.lang.Throwable'. Unlike regular Exceptions, Errors represent severe, abnormal environmental or JVM conditions that a reasonable application should NOT attempt to catch or recover from. Examples include hardware resource exhaustion, bytecode verification failure, or JVM stack overflow."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "في شجرة الاستثناءات داخل جافا، تقع فئة 'java.lang.Error' جنباً إلى جنب مع 'java.lang.Exception' تحت الفئة الأم 'Throwable'. على عكس الاستثناءات العادية، تمثل الـ Errors حالات خلل كارثية وحرجة في بيئة التشغيل أو في الـ JVM لا ينبغي للتطبيقات العادية محاولة التقاطها أو التعافي منها برمجياً؛ مثل نفاذ ذاكرة الجهاز (OutOfMemoryError) أو امتلاء مكدس الاستدعاءات (StackOverflowError)."
            },
            {
              type: "paragraph",
              text: "Core Error Classification: Errors are 'Unchecked' (unchecked throwables). The compiler does not require methods to declare them in a 'throws' clause or wrap them in 'try-catch' blocks because normal application logic cannot fix a dying JVM."
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
              text: "Example 1: The Throwable Class Hierarchy (المثال 1: شجرة الوراثة لكائنات Throwable)"
            },
            {
              type: "paragraph",
              text: "Visualizing the foundational relationship between Throwable, Error, and Exception."
            },
            {
              type: "code",
              language: "java",
              filename: "ThrowableHierarchyDemo.java",
              code: `public class ThrowableHierarchyDemo {
    public static void main(String[] args) {
        OutOfMemoryError error = new OutOfMemoryError("Simulated heap exhaustion");
        NullPointerException exception = new NullPointerException("Simulated null access");

        System.out.println("Is Error a Throwable?     " + (error instanceof Throwable));
        System.out.println("Is Exception a Throwable? " + (exception instanceof Throwable));
        System.out.println("Is Error an Exception?    " + ((Object) error instanceof Exception));
    }
}`,
              output: `Is Error a Throwable?     true
Is Exception a Throwable? true
Is Error an Exception?    false`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "Error and Exception are distinct sibling branches of java.lang.Throwable. Catching 'Exception' does NOT catch an Error."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "كل من Error و Exception فرعان منفصلان يرثان من Throwable؛ لذا فإن التقاط catch (Exception e) لن يلتقط الـ Error أبداً."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: StackOverflowError via Infinite Recursion (المثال 2: خطأ امتلاء مكدس الاستدعاء StackOverflowError)"
            },
            {
              type: "paragraph",
              text: "Triggered when thread call stack frames exceed the JVM stack limit (controlled by -Xss)."
            },
            {
              type: "code",
              language: "java",
              filename: "StackOverflowDemo.java",
              code: `public class StackOverflowDemo {
    static int depth = 0;

    static void infiniteRecursion() {
        depth++;
        infiniteRecursion(); // No base case!
    }

    public static void main(String[] args) {
        try {
            infiniteRecursion();
        } catch (StackOverflowError err) {
            System.out.println("Caught StackOverflowError at recursion depth: " + depth);
        }
    }
}`,
              output: `Caught StackOverflowError at recursion depth: 10452`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "Every method call pushes a frame onto the call stack. Unbounded recursion fills the stack, throwing StackOverflowError."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "كل استدعاء لدالة يحجز إطاراً في الـ Stack؛ والتكرار غير المنتهي يملأ الذاكرة المخصصة للمسار مما يسبب StackOverflowError."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: OutOfMemoryError: Java Heap Space (المثال 3: خطأ نفاد مساحة الذاكرة Heap)"
            },
            {
              type: "paragraph",
              text: "Occurs when the JVM cannot allocate memory for an object despite garbage collection passes."
            },
            {
              type: "code",
              language: "java",
              filename: "HeapOomDemo.java",
              code: `import java.util.ArrayList;
import java.util.List;

public class HeapOomDemo {
    public static void main(String[] args) {
        try {
            // Attempt to allocate an impossible block of memory
            int[] giantArray = new int[Integer.MAX_VALUE - 2];
            System.out.println("Allocated array of size: " + giantArray.length);
        } catch (OutOfMemoryError oom) {
            System.out.println("Caught OutOfMemoryError: " + oom.getMessage());
        }
    }
}`,
              output: `Caught OutOfMemoryError: Requested array size exceeds VM limit`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "When memory demand exceeds the physical or configured heap (-Xmx), the JVM throws OutOfMemoryError."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "عندما تطلب مصفوفة بحجم يفوق طاقة الذاكرة المحددة لـ JVM، يرمي النظام OutOfMemoryError فوراً."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: NoClassDefFoundError (Classpath Runtime Desynchronization) (المثال 4: خطأ فقدان تعريف الفئة وقت التشغيل)"
            },
            {
              type: "paragraph",
              text: "Occurs when a class was available at compile time but is missing or corrupt at runtime."
            },
            {
              type: "code",
              language: "java",
              filename: "NoClassDefFoundSimulation.java",
              code: `public class NoClassDefFoundSimulation {
    public static void main(String[] args) {
        try {
            // Simulating what happens when a dependency exists at compile time but is deleted at runtime
            throw new NoClassDefFoundError("com/payment/StripeGatewayClient");
        } catch (NoClassDefFoundError err) {
            System.out.println("Linkage Error Detected: " + err.getMessage());
        }
    }
}`,
              output: `Linkage Error Detected: com/payment/StripeGatewayClient`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "NoClassDefFoundError indicates that the JVM runtime class loader could not locate the compiled .class file needed by bytecode."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "يحدث NoClassDefFoundError عندما تنجح عملية الترجمة لكن يحذف ملف .class أو يفقد من بيئة التشغيل الفعلية."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: ExceptionInInitializerError (Static Initialization Failure) (المثال 5: خطأ فشل تهيئة المتغيرات الساكنة)"
            },
            {
              type: "paragraph",
              text: "Occurs when an unhandled runtime exception is thrown inside a static block or static field initialization."
            },
            {
              type: "code",
              language: "java",
              filename: "InitializerErrorDemo.java",
              code: `public class InitializerErrorDemo {
    static class BrokenConfig {
        static int denominator = 0;
        static int calculatedValue = 100 / denominator; // Throws ArithmeticException in static init!
    }

    public static void main(String[] args) {
        try {
            System.out.println(BrokenConfig.calculatedValue);
        } catch (ExceptionInInitializerError err) {
            System.out.println("Caught Error: " + err.getClass().getSimpleName());
            System.out.println("Root Cause:   " + err.getCause().getClass().getSimpleName());
        }
    }
}`,
              output: `Caught Error: ExceptionInInitializerError
Root Cause:   ArithmeticException`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "If a static block crashes, the JVM wraps the underlying exception into an ExceptionInInitializerError and prevents the class from ever loading."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "إذا حدث خطأ داخل بلوك static، يغلفه الـ JVM داخل ExceptionInInitializerError ويمنع استخدام الفئة تماماً."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: AssertionError (Debugging Assertion Verification) (المثال 6: خطأ فشل التحقق البرمجي AssertionError)"
            },
            {
              type: "paragraph",
              text: "Thrown when an 'assert' statement evaluates to false (when JVM assertions are enabled via -ea)."
            },
            {
              type: "code",
              language: "java",
              filename: "AssertionErrorDemo.java",
              code: `public class AssertionErrorDemo {
    public static void verifyAge(int age) {
        if (age < 0) {
            // Throw AssertionError programmatically to demonstrate its behavior
            throw new AssertionError("Age cannot be negative! Received: " + age);
        }
    }

    public static void main(String[] args) {
        try {
            verifyAge(-5);
        } catch (AssertionError err) {
            System.out.println("Diagnostic Failure: " + err.getMessage());
        }
    }
}`,
              output: `Diagnostic Failure: Age cannot be negative! Received: -5`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "AssertionError extends java.lang.Error. It indicates an internal logic assumption made by the programmer has been violated."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "يرث AssertionError من فئة Error ويعني أن فرضية منطقية داخلية افترضها المبرمج قد انهارت وقت التشغيل."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Why Catching 'Throwable' is Dangerous (المثال 7: خطورة التقاط Throwable بالكامل)"
            },
            {
              type: "paragraph",
              text: "Catching Throwable accidentally catches fatal Errors, leaving the JVM in a corrupt, unstable state."
            },
            {
              type: "code",
              language: "java",
              filename: "CatchingThrowableAntiPattern.java",
              code: `public class CatchingThrowableAntiPattern {
    public static void processPayload() {
        throw new OutOfMemoryError("Memory corrupt!");
    }

    public static void main(String[] args) {
        try {
            processPayload();
        } catch (Exception ex) {
            System.out.println("This catch block WILL NOT trigger for Errors.");
        } catch (Throwable t) {
            System.out.println("DANGER: Caught raw Throwable! [Type: " + t.getClass().getSimpleName() + "]");
            System.out.println("Action: Must immediately rethrow or cleanly exit to avoid silent system corruption.");
        }
    }
}`,
              output: `DANGER: Caught raw Throwable! [Type: OutOfMemoryError]
Action: Must immediately rethrow or cleanly exit to avoid silent system corruption.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "Do NOT catch raw Throwable in business code. Catch 'Exception' instead so fatal Errors can propagate and terminate safely."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "لا تلتقط Throwable في الكود العادي؛ بل التقط Exception فقط واترك أخطاء النظام القاتلة توقف البرنامج بأمان."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: UnsupportedClassVersionError (Bytecode Version Mismatch) (المثال 8: خطأ عدم توافق إصدار الجافا)"
            },
            {
              type: "paragraph",
              text: "Occurs when bytecode compiled on a newer JDK is executed on an older JRE runtime."
            },
            {
              type: "code",
              language: "java",
              filename: "ClassVersionErrorSimulation.java",
              code: `public class ClassVersionErrorSimulation {
    public static void main(String[] args) {
        try {
            // Simulated version mismatch: e.g. class file has version 65.0 (Java 21) run on Java 17
            throw new UnsupportedClassVersionError(
                "App has been compiled by a more recent version of the Java Runtime (class file version 65.0), " +
                "this version of the Java Runtime only recognizes class file versions up to 61.0"
            );
        } catch (UnsupportedClassVersionError err) {
            System.out.println("JDK/JRE Incompatibility Detected: " + err.getMessage());
        }
    }
}`,
              output: `JDK/JRE Incompatibility Detected: App has been compiled by a more recent version of the Java Runtime (class file version 65.0), this version of the Java Runtime only recognizes class file versions up to 61.0`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "UnsupportedClassVersionError is a ClassFormatError subclass thrown by the class loader when major bytecodes are too new."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "يحدث هذا الخطأ عند تشغيل كود مترجم على إصدار جافا حديث داخل خادم يعمل بإصدار جافا قديم غير متوافق."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: ThreadDeath Error (Deprecated Thread Stopping) (المثال 9: خطأ ThreadDeath وإيقاف المسارات)"
            },
            {
              type: "paragraph",
              text: "ThreadDeath is a special Error silently thrown when Thread.stop() was historically called."
            },
            {
              type: "code",
              language: "java",
              filename: "ThreadDeathDemo.java",
              code: `public class ThreadDeathDemo {
    public static void main(String[] args) {
        try {
            // Simulated ThreadDeath
            throw new ThreadDeath();
        } catch (ThreadDeath td) {
            System.out.println("Caught ThreadDeath! Note: Java specification recommends re-throwing ThreadDeath.");
            // In standard thread termination, ThreadDeath is re-thrown so the thread dies cleanly
        }
    }
}`,
              output: `Caught ThreadDeath! Note: Java specification recommends re-throwing ThreadDeath.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "ThreadDeath is an Error rather than an Exception so that standard 'catch (Exception e)' blocks don't accidentally prevent thread termination."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "تم تصنيف ThreadDeath كـ Error لكي لا تلتقطه بلوكات catch(Exception) العادية وتعيق إنهاء المسار في النظام."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Graceful JVM Shutdown Hook on Fatal Error (المثال 10: خطاف الإغلاق الآمن للـ JVM عند الكوارث)"
            },
            {
              type: "paragraph",
              text: "Using Runtime.getRuntime().addShutdownHook to close database connections and release resources before JVM exit."
            },
            {
              type: "code",
              language: "java",
              filename: "ShutdownHookDemo.java",
              code: `public class ShutdownHookDemo {
    public static void main(String[] args) {
        // Register hook for emergency cleanup
        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            System.out.println("[SHUTDOWN HOOK] Emergency cleanup: Flushing audit logs and closing sockets.");
        }));

        System.out.println("Main application running safely.");
        // When the program terminates (normally or due to fatal error), the hook executes
    }
}`,
              output: `Main application running safely.
[SHUTDOWN HOOK] Emergency cleanup: Flushing audit logs and closing sockets.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "Shutdown hooks are the recommended way to perform emergency resource cleanup when the JVM prepares to exit."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "خطافات الإغلاق Shutdown Hooks هي الطريقة الرسمية لتفريغ السجلات وإغلاق المنافذ بأمان لحظة خروج الـ JVM."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Enterprise Emergency Crash Logger for Fatal JVM Errors (المثال 11: مسجل حوادث الانهيار المؤسسي لأخطاء الـ JVM)"
            },
            {
              type: "paragraph",
              text: "Advanced: Thread.UncaughtExceptionHandler logging fatal errors and alerting site reliability engineers."
            },
            {
              type: "code",
              language: "java",
              filename: "CrashLoggerMaster.java",
              code: `public class CrashLoggerMaster {
    public static void main(String[] args) {
        // Set default uncaught exception handler for catastrophic faults
        Thread.setDefaultUncaughtExceptionHandler((thread, throwable) -> {
            if (throwable instanceof Error) {
                System.err.printf("[CRITICAL SRE ALERT] Fatal JVM Error on thread '%s': %s%n",
                    thread.getName(), throwable.toString());
                System.err.println("[DIAGNOSTIC DUMP] Initiating memory dump and container restart.");
            } else {
                System.err.printf("[APP ERROR] Uncaught exception on thread '%s': %s%n",
                    thread.getName(), throwable.getMessage());
            }
        });

        // Simulate a worker thread suffering a fatal error
        Thread worker = new Thread(() -> {
            throw new OutOfMemoryError("Direct memory limit reached in Netty buffer pool");
        }, "WorkerThread-01");

        worker.start();
    }
}`,
              output: `[CRITICAL SRE ALERT] Fatal JVM Error on thread 'WorkerThread-01': java.lang.OutOfMemoryError: Direct memory limit reached in Netty buffer pool
[DIAGNOSTIC DUMP] Initiating memory dump and container restart.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "Uncaught exception handlers allow enterprise infrastructure to log fatal Errors, generate thread dumps, and alert operations teams."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "تتيح معالجات الاستثناءات غير الملتقطة للأنظمة السحابية تسجيل الانهيارات الكارثية وتنبيه مهندسي الموثوقية فوراً."
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
                "Mistake 1: Attempting to catch and suppress OutOfMemoryError in normal business code. The heap is already corrupted; the application must be restarted.",
                "خطأ 1: محاولة التقاط وتجاهل OutOfMemoryError؛ فالذاكرة أصبحت معطوبة وغير موثوقة ويجب إعادة تشغيل الخادم.",
                "Mistake 2: Writing 'catch (Exception e)' and expecting it to catch StackOverflowError or OutOfMemoryError. Errors inherit directly from Throwable, NOT Exception.",
                "خطأ 2: الاعتقاد بأن catch (Exception) تلتقط أخطاء الذاكرة؛ فالـ Errors ترث من Throwable مباشرة ولا تتبع فئة Exception.",
                "Mistake 3: Confusing compile-time compiler errors with java.lang.Error. Compiler errors prevent .class generation; java.lang.Error happens at runtime inside the JVM."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Recursion Guard Sentinel (التحدي العملي: حارس عمق التكرار لمنع امتلاء المكدس)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Build a recursion depth sentinel: 1) Method 'safeFactorial(int n, int currentDepth, int maxDepth)'; 2) If currentDepth exceeds maxDepth (e.g., 500), throw an 'IllegalArgumentException' with a clear message preventing a StackOverflowError; 3) In main(), test safeFactorial with valid n=5 and guarded depth=1000 to show the guard in action."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: صمم حارساً لمنع امتلاء المكدس: 1) دالة safeFactorial(int n, int currentDepth, int maxDepth)؛ 2) إذا تجاوز العمق الحد الأقصى المسموح (مثل 500) ارمِ IllegalArgumentException برسالة تحذيرية لحماية المكدس؛ 3) في main احسب مضروب 5 بنجاح، واختبر تجاوز الحد لمنع الانهيار."
            },
            {
              type: "code",
              language: "java",
              filename: "RecursionGuardChallenge.java",
              code: `public class RecursionGuardChallenge {
    public static long safeFactorial(int n, int currentDepth, int maxDepth) {
        if (currentDepth > maxDepth) {
            throw new IllegalArgumentException(
                "Recursion guard triggered! Current depth [" + currentDepth + "] exceeded max safe threshold [" + maxDepth + "]"
            );
        }
        if (n <= 1) return 1;
        return n * safeFactorial(n - 1, currentDepth + 1, maxDepth);
    }

    public static void main(String[] args) {
        // Valid execution within safe depth
        long result = safeFactorial(5, 1, 500);
        System.out.println("Safe Factorial(5): " + result);

        // Guarded execution preventing StackOverflowError
        try {
            safeFactorial(100, 1, 10);
        } catch (IllegalArgumentException ex) {
            System.out.println("Blocked unsafe recursion: " + ex.getMessage());
        }
    }
}`,
              output: `Safe Factorial(5): 120
Blocked unsafe recursion: Recursion guard triggered! Current depth [11] exceeded max safe threshold [10]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "By tracking call depth and comparing against a safe threshold, the application intercepts deep recursion before triggering a catastrophic StackOverflowError."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "قام الحارس بمتابعة عمق المكدس وإيقاف التكرار العشوائي بـ IllegalArgumentException قبل وصول الـ JVM لحد الانهيار."
            }
          ],
          quiz: [
          {
                    "id": "q1",
                    "question": "Consider this code snippet:\n\npublic class RecursionTest {\n    public static void recurse(long count) {\n        recurse(count + 1);\n    }\n    public static void main(String[] args) {\n        try {\n            recurse(0);\n        } catch (Exception e) {\n            System.out.println(\"Caught Exception!\");\n        }\n    }\n}\n\nWhat happens when this program runs?",
                    "options": [
                              "It catches the exception and prints 'Caught Exception!'.",
                              "It terminates abruptly with java.lang.StackOverflowError because StackOverflowError inherits from Error, not Exception, so the catch block is bypassed.",
                              "It runs indefinitely until the OS runs out of physical RAM.",
                              "It throws an ArithmeticException when count overflows."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! StackOverflowError is a direct subclass of VirtualMachineError, which extends java.lang.Error (not java.lang.Exception). Because the catch block catches 'Exception', it cannot intercept an Error; the JVM terminates the thread with StackOverflowError. (فئة StackOverflowError ترث من Error وليس من Exception، ولذلك لا يمكن لبلوك catch(Exception) اعتراضها، فينهار البرنامج)."
          },
          {
                    "id": "q2",
                    "question": "Which of the following scenarios triggers a java.lang.OutOfMemoryError: Java heap space?\n(أي من السيناريوهات التالية يؤدي إلى إطلاق java.lang.OutOfMemoryError: Java heap space؟)",
                    "options": [
                              "A method calling itself infinitely without a base condition.",
                              "Allocating objects in a loop faster than the Garbage Collector can reclaim them while retaining active strong references on the heap.",
                              "Calling a native C library method that is not found on the library path.",
                              "A class file having invalid bytecode instructions during class loading."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! OutOfMemoryError: Java heap space occurs when new memory allocation fails because the JVM heap is exhausted and the Garbage Collector cannot free enough space for active strongly referenced objects. (يحدث خطأ نفاد ذاكرة الـ Heap عندما تمتلئ الذاكرة المخصصة للكائنات بالكائنات المحتفظ بمراجعها ولا يستطيع جامع القمامة تفريغ مساحة كافية للكائنات الجديدة)."
          },
          {
                    "id": "q3",
                    "question": "Why does the Java Language Specification strongly advise against catching java.lang.Error in application business logic?\n(لماذا تنصح مواصفات لغة جافا بشدة بعدم محاولة التقاط java.lang.Error داخل منطق التطبيق؟)",
                    "options": [
                              "Because catching Error causes a compilation error.",
                              "Because Errors represent critical, unrecoverable system or virtual machine failures (e.g., heap exhaustion, linkage failures); catching them leaves the JVM and application state in an undefined, corrupted condition.",
                              "Because catching Error consumes all CPU threads.",
                              "Because Errors can only be caught in Java 17 and later."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Errors indicate fatal, catastrophic infrastructure or environment states where core JVM invariants are broken. Attempting to swallow an Error leaves the program running with corrupted state, leading to silent data corruption and unpredictable crashes later. (تمثل الـ Errors حالات انهيار نظام حرجة لا يمكن التعافي منها برمجياً؛ وابتلاعها يجعل التطبيق يعمل بذاكرة وبيانات فاسدة وغير مستقرة)."
          },
          {
                    "id": "q4",
                    "question": "What is the key difference between ClassNotFoundException and NoClassDefFoundError in Java?\n(ما هو الفرق الجوهري بين ClassNotFoundException و NoClassDefFoundError في جافا؟)",
                    "options": [
                              "ClassNotFoundException is an Error; NoClassDefFoundError is a checked Exception.",
                              "ClassNotFoundException occurs at runtime when explicitly loading a class via reflection (e.g., Class.forName()) if not on classpath; NoClassDefFoundError occurs when a class that was present at compile-time cannot be found or initialized at runtime.",
                              "There is no difference; they are aliases for the same class.",
                              "NoClassDefFoundError only occurs when compiling in an IDE."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! ClassNotFoundException is a checked exception thrown during reflective calls like Class.forName() or ClassLoader.loadClass(). NoClassDefFoundError is a LinkageError thrown by the JVM when static bytecode compiled successfully against a class, but that class is missing or failed static initialization at runtime. (الأول هو استثناء مفحوص عند البحث الانعكاسي الديناميكي، بينما الثاني هو خطأ ربط يقع عندما كانت الفئة موجودة وقت التصريف وغابت أو فشل تهيئتها وقت التشغيل)."
          },
          {
                    "id": "q5",
                    "question": "What error is thrown when executing the following code?\n\npublic class NativeCaller {\n    public native void executeSpecialHardwareTask();\n    public static void main(String[] args) {\n        new NativeCaller().executeSpecialHardwareTask();\n    }\n}",
                    "options": [
                              "NullPointerException",
                              "java.lang.UnsatisfiedLinkError because the native method has no bound shared library (.dll/.so) implementation.",
                              "NoSuchMethodException",
                              "StackOverflowError"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! UnsatisfiedLinkError is a subclass of LinkageError. When a method is declared 'native' and invoked without loading the corresponding native shared library via System.loadLibrary(), the JVM cannot link the native code and throws UnsatisfiedLinkError. (يرمي الـ JVM خطأ UnsatisfiedLinkError عند استدعاء دالة native دون تحميل مكتبة الربط الديناميكية المقابلة لها عبر System.loadLibrary)."
          },
          {
                    "id": "q6",
                    "question": "What happens if a static initialization block throws an unchecked RuntimeException?\n\nclass ConfigHolder {\n    static {\n        String s = null;\n        s.length(); // Throws NullPointerException\n    }\n}\npublic class App {\n    public static void main(String[] args) {\n        new ConfigHolder();\n    }\n}",
                    "options": [
                              "It throws a NullPointerException directly to main.",
                              "The JVM wraps the RuntimeException inside a java.lang.ExceptionInInitializerError and aborts class loading.",
                              "The class loads successfully, ignoring the static block.",
                              "A compile-time error occurs."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! When an unhandled RuntimeException occurs during the static initialization of a class (in a static block or static field assignment), the JVM wraps it in an ExceptionInInitializerError (subclass of LinkageError) and halts initialization. (عند وقوع استثناء غير معالج أثناء تهيئة الفئة الاستاتيكية، يغلف الـ JVM الاستثناء في ExceptionInInitializerError وهو نوع من أخطاء Error)."
          },
          {
                    "id": "q7",
                    "question": "Consider this thread scenario:\n\nThread worker = new Thread(() -> {\n    throw new OutOfMemoryError(\"Simulated Worker Heap Exhaustion\");\n});\nworker.start();\nSystem.out.println(\"Main thread continues execution...\");\n\nWhat is the behavior of the main thread?",
                    "options": [
                              "The main thread immediately dies because an Error always shuts down the entire operating system.",
                              "Only the worker thread dies due to the uncaught Error; the main thread continues running unaffected unless an unhandled exception handler explicitly calls System.exit().",
                              "The JVM automatically catches the Error and restarts the worker thread.",
                              "The program hangs in a deadlock."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! When an unhandled Error or Exception occurs in a specific thread, only that thread terminates by default. Other non-daemon threads (like main) continue executing unless the JVM encounters fatal corruption or the thread's UncaughtExceptionHandler triggers a JVM shutdown. (عند حدوث خطأ Error غير معالج في مسار فرعي، يموت ذلك المسار فقط ويبقى المسار الرئيسي main يعمل، إلا إذا أُغلق الـ JVM صراحة)."
          },
          {
                    "id": "q8",
                    "question": "What is the cause of 'OutOfMemoryError: Metaspace' in modern Java (Java 8+)?\n(ما هو سبب ظهور خطأ OutOfMemoryError: Metaspace في إصدارات جافا الحديثة؟)",
                    "options": [
                              "The JVM heap has run out of space for primitive arrays.",
                              "Native memory used to store class metadata, bytecode, and method structures is exhausted, often caused by classloader leaks or dynamic bytecode generation (e.g., CGLIB/proxies) without unloading.",
                              "The stack size per thread (-Xss) was set too large.",
                              "A string with more than 65,535 characters was declared."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! In Java 8+, Metaspace replaced PermGen and uses native off-heap memory to store class metadata. If an application repeatedly creates dynamic proxies or reloads classloaders without allowing them to be garbage collected, Metaspace memory is depleted. (تُخزن Metaspace البيانات الوصفية للفئات في الذاكرة الأصلية خارج الـ Heap؛ وتسريب ClassLoaders أو توليد فئات ديناميكية متكررة يؤدي لنفاد مساحتها)."
          },
          {
                    "id": "q9",
                    "question": "What is printed by executing this code?\n\npublic class ErrorCatchTest {\n    public static void main(String[] args) {\n        try {\n            throw new AssertionError(\"Inconsistency detected!\");\n        } catch (Throwable t) {\n            System.out.println(t.getClass().getSimpleName() + \" handled!\");\n        }\n    }\n}",
                    "options": [
                              "Compile-time error: AssertionError cannot be thrown explicitly.",
                              "AssertionError handled!",
                              "The program crashes without printing anything.",
                              "NullPointerException"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! AssertionError is a subclass of java.lang.Error, and java.lang.Error extends java.lang.Throwable. Catching 'Throwable' intercepts both Exceptions and Errors. The catch block executes and prints 'AssertionError handled!'. (الفئة AssertionError ترث من Error التي ترث من Throwable، وبما أن بلوك catch يستقبل Throwable فإنه يعترض الخطأ بنجاح ويطبع الرسالة)."
          },
          {
                    "id": "q10",
                    "question": "Which JVM flag allows developers to tune the call stack size allocated to each thread to prevent or reproduce StackOverflowError?\n(أي خيار من خيارات سطر أوامر الـ JVM يحدد حجم المكدس المخصص لكل مسار عمل لمنع StackOverflowError؟)",
                    "options": [
                              "-Xmx (Maximum Heap Size)",
                              "-Xss (Thread Stack Size)",
                              "-Xms (Initial Heap Size)",
                              "-XX:MaxMetaspaceSize"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! The -Xss flag sets the memory size of the thread call stack (e.g., -Xss1m sets 1 MB per thread). A smaller stack triggers StackOverflowError with fewer recursive calls; a larger stack allows deeper recursion. (يحدد الخيار -Xss حجم ذاكرة المكدس Call Stack لكل مسار عمل Thread، والتحكم فيه يؤثر مباشرة على عمق الاستدعاءات التكرارية قبل امتلاء المكدس)."
          },
          {
                    "id": "q11",
                    "question": "What causes an 'OutOfMemoryError: GC overhead limit exceeded'?\n(ما الذي يسبب ظهور خطأ OutOfMemoryError: GC overhead limit exceeded؟)",
                    "options": [
                              "The Garbage Collector is running faster than 1000 cycles per second.",
                              "The JVM has spent more than 98% of total CPU time performing garbage collection and recovered less than 2% of the heap space, signaling that GC is thrashing fruitlessly.",
                              "The JVM does not have permission to run garbage collection.",
                              "The heap is completely empty and GC has nothing to clean."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! The JVM throws 'OutOfMemoryError: GC overhead limit exceeded' when it spends over 98% of total processing time on GC but reclaims less than 2% of heap memory. This fails fast to prevent the CPU from hanging in a perpetual GC thrashing loop. (يطلق الـ JVM هذا الخطأ عندما يقضي جامع القمامة أكثر من 98% من وقت المعالج في محاولة التنظيف دون استرداد أكثر من 2% من المساحة لمنع تجمد النظام في حلقة مفرغة)."
          },
          {
                    "id": "q12",
                    "question": "What happens if a program tries to allocate an array larger than the JVM heap capacity?\n\nint[] massive = new int[Integer.MAX_VALUE - 2];",
                    "options": [
                              "The compiler rejects the line with 'array dimension out of range'.",
                              "It throws java.lang.OutOfMemoryError: Requested array size exceeds VM limit or Java heap space.",
                              "It allocates a disk-swapped virtual array.",
                              "It automatically truncates the array size to 100 elements."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! An int array of Integer.MAX_VALUE elements would require roughly 8 GB of contiguous heap memory. If the requested size exceeds VM limits or available heap, the JVM throws an OutOfMemoryError at runtime. (محاولة حجز مصفوفة ضخمة تتجاوز حدود الذاكرة المتاحة في الـ JVM تؤدي إلى إطلاق OutOfMemoryError فوراً في وقت التشغيل)."
          },
          {
                    "id": "q13",
                    "question": "Why does an enterprise microservice framework (like Spring or Quarkus) catch Throwable at the root HTTP request dispatcher?\n(لماذا تلتقط أطر العمل المؤسسية Throwable عند نقطة استقبال الطلبات الخارجية الرئيسية؟)",
                    "options": [
                              "To fix hardware failures automatically.",
                              "To ensure that if an unexpected Error or fatal fault occurs during request processing, the incident is logged, telemetry metrics are fired, and the server thread or container can be safely cycled or report HTTP 500 rather than silently dropping connections.",
                              "To convert all Errors into successful HTTP 200 responses.",
                              "Because Java requires every method to catch Throwable."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Infrastructure frameworks catch Throwable at the topmost boundary to prevent background worker threads from dying silently, to flush audit logs and metrics, and to allow the container orchestrator (e.g. Kubernetes) to perform a health-check restart. (تلتقط الأطر المؤسسية Throwable عند البوابات العليا لتسجيل الكارثة بدقة، وإعادة إرسال استجابة خطأ، وإبلاغ مدير الحاويات بإعادة تشغيل الخادم بدلاً من الموت الصامت)."
          },
          {
                    "id": "q14",
                    "question": "Which of the following is an example of a LinkageError in Java?\n(أي من الخيارات التالية يُعد مثالاً على خطأ ربط LinkageError في جافا؟)",
                    "options": [
                              "NullPointerException",
                              "NoSuchFieldError, which occurs when a compiled class attempts to access a field in an external dependency that was removed in a newer version of that library at runtime.",
                              "IllegalArgumentException",
                              "InterruptedException"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! LinkageError and its subtypes (like NoSuchFieldError, NoSuchMethodError, and IncompatibleClassChangeError) occur when bytecode was compiled against one version of a class, but runtime execution finds a binary-incompatible version missing that field or method. (أخطاء LinkageError مثل NoSuchFieldError تقع عند اختلاف إصدارات المكتبات بين وقت التصريف ووقت التشغيل كأن يُحذف حقل كانت الفئة تعتمد عليه)."
          },
          {
                    "id": "q15",
                    "question": "What is printed by executing the following code?\n\npublic class ErrorRethrow {\n    public static void test() {\n        try {\n            throw new OutOfMemoryError(\"Memory full\");\n        } catch (Error err) {\n            System.out.print(\"CaughtError \");\n            throw err;\n        }\n    }\n    public static void main(String[] args) {\n        try {\n            test();\n        } catch (Throwable t) {\n            System.out.println(\"CaughtInMain\");\n        }\n    }\n}",
                    "options": [
                              "CaughtError CaughtInMain",
                              "CaughtError followed by program crash",
                              "CaughtInMain only",
                              "Compile-time error"
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! The method test() catches the OutOfMemoryError via 'catch (Error err)', prints 'CaughtError ', and rethrows it. In main(), the rethrown Error is caught by 'catch (Throwable t)', printing 'CaughtInMain'. Output: 'CaughtError CaughtInMain'. (يلتقط بلوك catch الأول الخطأ ويطبع CaughtError ثم يعيد رميه، فيلتقطه بلوك catch الثاني في main لأن Throwable تشمل كافة الأخطاء ويطبع CaughtInMain)."
          }
]
        }
      ]
    }
  ];
})();
