/**
 * Java Curriculum Module - Part 35
 * Topics:
 * 69. Iterators
 * 70. Java Iterator
 * 
 * 100% Offline, Pure JavaScript. Complete educational content with full bilingual (English & Arabic) explanations.
 */

(function () {
  'use strict';

  window.JAVA_TOPICS_PART35 = [
    /* ==========================================================================
       TOPIC 69: Iterators
       ========================================================================== */
    {
      id: "java-iterators",
      title: "69. Iterators",
      description: "Understanding the Iterator Design Pattern in Java: Iterable interface contract, why collections decouple traversal from internal layout, fail-fast vs fail-safe semantics, comparison of iteration paradigms (Index loops, Enumeration, Iterator, ListIterator, Spliterator, Streams).",
      lessons: [
        {
          id: "java-iterators-concept",
          title: "The Iterator Pattern and Iterable Architecture",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "The Iterator Pattern Architecture (هندسة نمط المكرر ومفهوم التكرار)"
            },
            {
              type: "paragraph",
              text: "The 'Iterator' design pattern is a behavioral pattern that provides a standardized way to sequentially access elements of an aggregate object without exposing its underlying internal representation (such as an array, linked list, tree, or hash table). In Java, this pattern is formalized by the 'java.lang.Iterable<T>' interface and the 'java.util.Iterator<E>' interface. Any class that implements 'Iterable<T>' earns the privilege of being iterated over using the enhanced for-each loop syntax ('for (T item : collection)'). Understanding the iterator pattern provides deep architectural insight into how Java collections decouple traversal mechanics from memory layouts."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "يُعد 'نمط المكرر' (Iterator Pattern) أحد أشهر الأنماط السلوكية في هندسة البرمجيات، حيث يوفر آلية قياسية وموحدة للمرور المتسلسل على عناصر أي تجمع بيانات دون كشف الهيكل الداخلي لتخزينها (سواء كانت مصفوفة عادية، أو قائمة مترابطة، أو شجرة بحث، أو جدول تجزئة). يتجسد هذا النمط في جافا عبر واجهتي 'Iterable' و 'Iterator'. وأي فئة تطبق واجهة Iterable تكتسب تلقائياً ميزة التكرار باستخدام حلقة for-each المحسنة. إن فهم هذا النمط يكشف لك كيف تفصل جافا بين تخزين البيانات وطريقة قراءتها."
            },
            {
              type: "paragraph",
              text: "Core Architectural Principles: 1) Separation of Concerns: The collection stores data; the iterator manages cursor position; 2) Uniform Access: Code iterating over data remains identical whether backed by an ArrayList or a TreeSet; 3) Fail-Fast Philosophy: Modifying a collection structurally while iterating without the iterator's consent triggers ConcurrentModificationException."
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
              text: "Example 1: The Iterable Interface Contract (المثال 1: عقد واجهة Iterable)"
            },
            {
              type: "paragraph",
              text: "Demonstrating how implementing Iterable enables the for-each loop."
            },
            {
              type: "code",
              language: "java",
              filename: "CustomIterableDemo.java",
              code: `import java.util.Iterator;

public class CustomIterableDemo {
    // Custom container implementing Iterable<String>
    static class Playlist implements Iterable<String> {
        private final String[] songs;

        public Playlist(String[] songs) {
            this.songs = songs;
        }

        @Override
        public Iterator<String> iterator() {
            return new Iterator<>() {
                private int cursor = 0;

                @Override
                public boolean hasNext() {
                    return cursor < songs.length;
                }

                @Override
                public String next() {
                    return songs[cursor++];
                }
            };
        }
    }

    public static void main(String[] args) {
        Playlist playlist = new Playlist(new String[]{"Song A", "Song B", "Song C"});

        // Because Playlist implements Iterable, the enhanced for-each loop works natively!
        System.out.println("Playing songs via enhanced for-each loop:");
        for (String song : playlist) {
            System.out.println(" > " + song);
        }
    }
}`,
              output: `Playing songs via enhanced for-each loop:
 > Song A
 > Song B
 > Song C`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "Implementing Iterable<T> requires defining iterator(). This permits the class to be directly consumed in enhanced for-each loops."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "تطبيق واجهة Iterable يتطلب توفير دالة iterator()؛ مما يمنح الفئة القدرة الفورية على العمل داخل حلقات for-each بسلاسة."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Evolution of Iteration in Java (المثال 2: تطور آليات التكرار في تاريخ جافا)"
            },
            {
              type: "paragraph",
              text: "Comparing legacy Enumeration, standard Iterator, and enhanced for-loop."
            },
            {
              type: "code",
              language: "java",
              filename: "IterationEvolutionDemo.java",
              code: `import java.util.Arrays;
import java.util.Collections;
import java.util.Enumeration;
import java.util.Iterator;
import java.util.List;
import java.util.Vector;

public class IterationEvolutionDemo {
    public static void main(String[] args) {
        List<String> items = Arrays.asList("Alpha", "Beta", "Gamma");

        // Era 1 (Java 1.0): Enumeration (Legacy)
        Vector<String> vector = new Vector<>(items);
        Enumeration<String> en = vector.elements();
        System.out.print("1. Enumeration: ");
        while (en.hasMoreElements()) System.out.print(en.nextElement() + " ");
        System.out.println();

        // Era 2 (Java 1.2): java.util.Iterator
        Iterator<String> it = items.iterator();
        System.out.print("2. Iterator:    ");
        while (it.hasNext()) System.out.print(it.next() + " ");
        System.out.println();

        // Era 3 (Java 5): Enhanced For Loop
        System.out.print("3. For-Each:    ");
        for (String item : items) System.out.print(item + " ");
        System.out.println();
    }
}`,
              output: `1. Enumeration: Alpha Beta Gamma 
2. Iterator:    Alpha Beta Gamma 
3. For-Each:    Alpha Beta Gamma `
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "Java evolved from legacy Enumeration (read-only, verbose) to Iterator (with safe remove) to enhanced for-loops (syntactic sugar)."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "تطورت جافا من Enumeration القديمة إلى Iterator ثم حلقات for-each كصيغة جمالية تختصر الأكواد."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Bidirectional Traversal with ListIterator (المثال 3: التكرار ثنائي الاتجاه عبر ListIterator)"
            },
            {
              type: "paragraph",
              text: "Traversing forwards and backwards, and replacing elements during iteration."
            },
            {
              type: "code",
              language: "java",
              filename: "ListIteratorBidirectionalDemo.java",
              code: `import java.util.ArrayList;
import java.util.List;
import java.util.ListIterator;

public class ListIteratorBidirectionalDemo {
    public static void main(String[] args) {
        List<String> levels = new ArrayList<>(List.of("Level 1", "Level 2", "Level 3"));

        ListIterator<String> lit = levels.listIterator();

        // Traverse forward
        System.out.println("Forward traversal:");
        while (lit.hasNext()) {
            System.out.println(" Index " + lit.nextIndex() + ": " + lit.next());
        }

        // Traverse backward
        System.out.println("Backward traversal:");
        while (lit.hasPrevious()) {
            System.out.println(" Index " + lit.previousIndex() + ": " + lit.previous());
        }
    }
}`,
              output: `Forward traversal:
 Index 0: Level 1
 Index 1: Level 2
 Index 2: Level 3
Backward traversal:
 Index 2: Level 3
 Index 1: Level 2
 Index 0: Level 1`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "ListIterator adds hasPrevious(), previous(), set(), and add() for indexed lists."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "تضيف ListIterator إمكانية الرجوع للخلف وفحص الفهارس السابقة والتالية وتعديل العناصر."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Spliterator and Parallel Processing (Java 8+) (المثال 4: التقسيم المتوازي عبر Spliterator)"
            },
            {
              type: "paragraph",
              text: "Splitting a collection into parallel chunks for concurrent tasks."
            },
            {
              type: "code",
              language: "java",
              filename: "SpliteratorDemo.java",
              code: `import java.util.List;
import java.util.Spliterator;

public class SpliteratorDemo {
    public static void main(String[] args) {
        List<Integer> numbers = List.of(10, 20, 30, 40, 50, 60);

        Spliterator<Integer> split1 = numbers.spliterator();
        // trySplit divides the elements roughly in half
        Spliterator<Integer> split2 = split1.trySplit();

        System.out.println("Split 1 elements:");
        split1.forEachRemaining(n -> System.out.print(n + " "));
        System.out.println();

        System.out.println("Split 2 elements (partitioned):");
        if (split2 != null) {
            split2.forEachRemaining(n -> System.out.print(n + " "));
        }
        System.out.println();
    }
}`,
              output: `Split 1 elements:
40 50 60 
Split 2 elements (partitioned):
10 20 30 `
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "Spliterator (splitable iterator) is the engine behind parallel Streams, partitioning collections across multiple CPU cores."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "تُعد Spliterator المحرك الداخلي للتدفقات المتوازية، حيث تقسم البيانات إلى أجزاء لتوزيعها على أنوية المعالج."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Fail-Fast Iterators (المثال 5: المكررات سريعة الفشل Fail-Fast)"
            },
            {
              type: "paragraph",
              text: "How modifying a collection during standard iteration throws ConcurrentModificationException."
            },
            {
              type: "code",
              language: "java",
              filename: "FailFastConceptDemo.java",
              code: `import java.util.ArrayList;
import java.util.ConcurrentModificationException;
import java.util.Iterator;
import java.util.List;

public class FailFastConceptDemo {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>(List.of("A", "B", "C"));

        Iterator<String> it = list.iterator();

        try {
            while (it.hasNext()) {
                String val = it.next();
                if (val.equals("B")) {
                    list.add("D"); // STRUCTURAL MUTATION directly on list!
                }
            }
        } catch (ConcurrentModificationException e) {
            System.out.println("Caught ConcurrentModificationException!");
            System.out.println("Standard iterators are fail-fast: they abort immediately upon uncoordinated mutation.");
        }
    }
}`,
              output: `Caught ConcurrentModificationException!
Standard iterators are fail-fast: they abort immediately upon uncoordinated mutation.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "Fail-fast iterators detect that collection.modCount differs from expectedModCount, failing immediately to protect state."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "تكتشف المكررات سريعة الفشل عدم تطابق عداد التعديلات فتوقف التنفيذ فوراً لحماية بنية البيانات."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Fail-Safe Iterators (CopyOnWriteArrayList) (المثال 6: المكررات الآمنة ضد الفشل Fail-Safe)"
            },
            {
              type: "paragraph",
              text: "Iterating safely while concurrent modifications occur on an array snapshot."
            },
            {
              type: "code",
              language: "java",
              filename: "FailSafeConceptDemo.java",
              code: `import java.util.Iterator;
import java.util.concurrent.CopyOnWriteArrayList;

public class FailSafeConceptDemo {
    public static void main(String[] args) {
        // CopyOnWriteArrayList creates an immutable snapshot for its iterator
        CopyOnWriteArrayList<String> safeList = new CopyOnWriteArrayList<>();
        safeList.add("Red");
        safeList.add("Green");
        safeList.add("Blue");

        Iterator<String> it = safeList.iterator();
        while (it.hasNext()) {
            String color = it.next();
            System.out.println("Read: " + color);
            if (color.equals("Green")) {
                safeList.add("Yellow"); // SAFE! Does not affect the iterator's snapshot
            }
        }

        System.out.println("Final list state: " + safeList);
    }
}`,
              output: `Read: Red
Read: Green
Read: Blue
Final list state: [Red, Green, Blue, Yellow]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "Fail-safe collections iterate over a snapshot array, permitting mutations on the underlying collection without crashing."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "تقرأ المجموعات الآمنة (Fail-Safe) من لقطة سابقة للبيانات؛ فتسمح بالتعديل المتزامن دون رمي أي استثناء."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Filtering and Transforming with Custom Iterator (المثال 7: مكرر مخصص للتصفية والتحويل)"
            },
            {
              type: "paragraph",
              text: "Implementing a filtering iterator that skips odd numbers."
            },
            {
              type: "code",
              language: "java",
              filename: "EvenNumberFilterIteratorDemo.java",
              code: `import java.util.Iterator;
import java.util.List;
import java.util.NoSuchElementException;

public class EvenNumberFilterIteratorDemo {
    static class EvenIterator implements Iterator<Integer> {
        private final Iterator<Integer> source;
        private Integer nextEven = null;

        public EvenIterator(Iterator<Integer> source) {
            this.source = source;
            advance();
        }

        private void advance() {
            nextEven = null;
            while (source.hasNext()) {
                int val = source.next();
                if (val % 2 == 0) {
                    nextEven = val;
                    break;
                }
            }
        }

        @Override
        public boolean hasNext() {
            return nextEven != null;
        }

        @Override
        public Integer next() {
            if (nextEven == null) throw new NoSuchElementException();
            Integer result = nextEven;
            advance();
            return result;
        }
    }

    public static void main(String[] args) {
        List<Integer> all = List.of(1, 4, 7, 8, 11, 14, 15, 18);
        EvenIterator evens = new EvenIterator(all.iterator());

        System.out.print("Filtered Even Numbers: ");
        while (evens.hasNext()) {
            System.out.print(evens.next() + " ");
        }
        System.out.println();
    }
}`,
              output: `Filtered Even Numbers: 4 8 14 18 `
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "Wrapping an iterator allows building lazy processing pipelines that evaluate elements on demand."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "تغليف المكررات يتيح بناء مسارات معالجة كسولة تصفي البيانات عند الطلب وتوفر الذاكرة."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Infinite Generator Iterator (المثال 8: مكرر لتوليد متسلسلات لا نهائية)"
            },
            {
              type: "paragraph",
              text: "Generating Fibonacci numbers infinitely on demand."
            },
            {
              type: "code",
              language: "java",
              filename: "FibonacciIteratorDemo.java",
              code: `import java.util.Iterator;

public class FibonacciIteratorDemo {
    static class FibonacciIterator implements Iterator<Long> {
        private long a = 0;
        private long b = 1;

        @Override
        public boolean hasNext() {
            return true; // Infinite stream!
        }

        @Override
        public Long next() {
            long current = a;
            long next = a + b;
            a = b;
            b = next;
            return current;
        }
    }

    public static void main(String[] args) {
        FibonacciIterator fib = new FibonacciIterator();

        System.out.print("First 10 Fibonacci numbers: ");
        for (int i = 0; i < 10; i++) {
            System.out.print(fib.next() + " ");
        }
        System.out.println();
    }
}`,
              output: `First 10 Fibonacci numbers: 0 1 1 2 3 5 8 13 21 34 `
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "Iterators can represent unbounded, lazy sequences without computing all elements upfront."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "تستطيع المكررات توليد متتاليات لا نهائية بحساب كل عنصر عند طلبه فقط دون حجز مسبق للذاكرة."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Composite Tree Iterator (In-Order Traversal) (المثال 9: مكرر للتنقل في شجرة بيانات ثنائية)"
            },
            {
              type: "paragraph",
              text: "Using a stack to iterate over a binary search tree in sorted order."
            },
            {
              type: "code",
              language: "java",
              filename: "BinaryTreeIteratorDemo.java",
              code: `import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Iterator;

public class BinaryTreeIteratorDemo {
    static class TreeNode {
        int val;
        TreeNode left, right;
        TreeNode(int val) { this.val = val; }
    }

    static class BSTIterator implements Iterator<Integer> {
        private final Deque<TreeNode> stack = new ArrayDeque<>();

        public BSTIterator(TreeNode root) {
            pushLeft(root);
        }

        private void pushLeft(TreeNode node) {
            while (node != null) {
                stack.push(node);
                node = node.left;
            }
        }

        @Override
        public boolean hasNext() {
            return !stack.isEmpty();
        }

        @Override
        public Integer next() {
            TreeNode node = stack.pop();
            pushLeft(node.right);
            return node.val;
        }
    }

    public static void main(String[] args) {
        // Build BST:       4
        //                /   \\
        //               2     6
        //              / \\   / \\
        //             1   3 5   7
        TreeNode root = new TreeNode(4);
        root.left = new TreeNode(2);
        root.right = new TreeNode(6);
        root.left.left = new TreeNode(1);
        root.left.right = new TreeNode(3);
        root.right.left = new TreeNode(5);
        root.right.right = new TreeNode(7);

        BSTIterator it = new BSTIterator(root);
        System.out.print("BST In-Order Traversal: ");
        while (it.hasNext()) {
            System.out.print(it.next() + " ");
        }
        System.out.println();
    }
}`,
              output: `BST In-Order Traversal: 1 2 3 4 5 6 7 `
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "Iterators encapsulate complex tree traversal logic behind hasNext() and next(), presenting a simple sequential interface."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "يخفي المكرر تعقيدات خوارزميات الشجرة وتكديسها خلف دالتي hasNext و next موفراً واجهة استخدام بسيطة."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Nested Iterators for Grid Traversal (المثال 10: مكرر ثنائي الأبعاد لمصفوفة مربعة)"
            },
            {
              type: "paragraph",
              text: "Flattening a 2D matrix into a 1D sequence via an iterator."
            },
            {
              type: "code",
              language: "java",
              filename: "Matrix2DIteratorDemo.java",
              code: `import java.util.Iterator;

public class Matrix2DIteratorDemo {
    static class MatrixIterator implements Iterator<Integer> {
        private final int[][] grid;
        private int r = 0, c = 0;

        public MatrixIterator(int[][] grid) {
            this.grid = grid;
        }

        @Override
        public boolean hasNext() {
            return r < grid.length && c < grid[r].length;
        }

        @Override
        public Integer next() {
            int val = grid[r][c++];
            if (c >= grid[r].length) {
                c = 0;
                r++;
            }
            return val;
        }
    }

    public static void main(String[] args) {
        int[][] matrix = {
            {10, 20},
            {30, 40, 50},
            {60}
        };

        MatrixIterator it = new MatrixIterator(matrix);
        System.out.print("Flattened Matrix Traversal: ");
        while (it.hasNext()) {
            System.out.print(it.next() + " ");
        }
        System.out.println();
    }
}`,
              output: `Flattened Matrix Traversal: 10 20 30 40 50 60 `
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "Iterators abstract away multi-dimensional coordinates, flattening ragged 2D arrays into a continuous sequence."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "يسطح المكرر المصفوفات ثنائية الأبعاد متعددة الأطوال في تدفق متصل واحد."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Benchmark: Index Loop vs Iterator (المثال 11: مقارنة سرعة التكرار بالفهرس والمكرر)"
            },
            {
              type: "paragraph",
              text: "Showing that on ArrayList, both approaches have virtually identical performance."
            },
            {
              type: "code",
              language: "java",
              filename: "IteratorBenchmarkDemo.java",
              code: `import java.util.ArrayList;
import java.util.Iterator;

public class IteratorBenchmarkDemo {
    public static void main(String[] args) {
        int size = 1_000_000;
        ArrayList<Integer> list = new ArrayList<>(size);
        for (int i = 0; i < size; i++) list.add(i);

        // Benchmark 1: Classic index loop
        long startIdx = System.currentTimeMillis();
        long sum1 = 0;
        for (int i = 0; i < list.size(); i++) {
            sum1 += list.get(i);
        }
        long timeIdx = System.currentTimeMillis() - startIdx;

        // Benchmark 2: Iterator
        long startIt = System.currentTimeMillis();
        long sum2 = 0;
        Iterator<Integer> it = list.iterator();
        while (it.hasNext()) {
            sum2 += it.next();
        }
        long timeIt = System.currentTimeMillis() - startIt;

        System.out.println("Index loop time: " + timeIdx + " ms");
        System.out.println("Iterator time:   " + timeIt + " ms");
        System.out.println("Sums equal:      " + (sum1 == sum2));
    }
}`,
              output: `Index loop time: 7 ms
Iterator time:   8 ms
Sums equal:      true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "On ArrayList, the JIT compiler optimizes iterator overhead away, resulting in near-identical performance with indexed access."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "في ArrayList يُحسن مفسر JIT أداء المكرر ليتطابق مع سرعة الفهارس العادية تماماً."
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
                "Mistake 1: Calling it.next() multiple times inside the same while (it.hasNext()) block. Each call advances the cursor, skipping elements and risking NoSuchElementException.",
                "خطأ 1: استدعاء it.next() عدة مرات داخل نفس دورة while؛ مما يقفز فوق العناصر ويرمي NoSuchElementException.",
                "Mistake 2: Forgetting to check hasNext() before calling next(), causing crashes when the end is reached.",
                "خطأ 2: نسيان التحقق من hasNext() قبل استدعاء next()؛ مما يوقف البرنامج عند نهاية التجمع.",
                "Mistake 3: Creating a new iterator instance on every loop iteration, e.g., 'while (list.iterator().hasNext())'. This causes an infinite loop because each call resets the cursor to 0!",
                "خطأ 3: إنشاء مكرر جديد في كل دورة بـ list.iterator().hasNext()؛ مما يسبب حلقة لا نهائية لأن المؤشر يعود للصفر دائماً."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Rolling Window Circular Buffer Iterator (التحدي العملي: مكرر نافذة منزلقة في حاوية دائرية)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Create a class 'CircularBuffer<T>' with fixed capacity implementing Iterable<T>. Elements overwrite older ones when capacity is exceeded. Its iterator() must yield items in chronological order from oldest to newest. Test in main() with capacity 3, insert 5 items, and iterate using an enhanced for-each loop."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: صمم فئة CircularBuffer ذات سعة محددة تطبق واجهة Iterable. عند امتلاء الحاوية يستبدل العنصر الجديد العنصر الأقدم. يجب أن يتنقل المكرر iterator() على العناصر من الأقدم إلى الأحدث زمنياً. اختبرها في main بحاوية سعتها 3، أضف 5 عناصر، واستعرضها بحلقة for-each."
            },
            {
              type: "code",
              language: "java",
              filename: "CircularBufferChallenge.java",
              code: `import java.util.Iterator;
import java.util.NoSuchElementException;

public class CircularBufferChallenge {
    static class CircularBuffer<T> implements Iterable<T> {
        private final Object[] buffer;
        private final int capacity;
        private int head = 0;
        private int size = 0;

        public CircularBuffer(int capacity) {
            this.capacity = capacity;
            this.buffer = new Object[capacity];
        }

        public void add(T item) {
            int insertIndex = (head + size) % capacity;
            if (size == capacity) {
                // Overwriting oldest element at head
                buffer[head] = item;
                head = (head + 1) % capacity;
            } else {
                buffer[insertIndex] = item;
                size++;
            }
        }

        @Override
        public Iterator<T> iterator() {
            return new Iterator<>() {
                private int count = 0;

                @Override
                public boolean hasNext() {
                    return count < size;
                }

                @SuppressWarnings("unchecked")
                @Override
                public T next() {
                    if (!hasNext()) throw new NoSuchElementException();
                    int index = (head + count) % capacity;
                    count++;
                    return (T) buffer[index];
                }
            };
        }
    }

    public static void main(String[] args) {
        CircularBuffer<String> logHistory = new CircularBuffer<>(3);

        logHistory.add("Log 1");
        logHistory.add("Log 2");
        logHistory.add("Log 3");
        logHistory.add("Log 4"); // Evicts Log 1
        logHistory.add("Log 5"); // Evicts Log 2

        System.out.println("CircularBuffer contents in chronological order:");
        for (String log : logHistory) {
            System.out.println(" -> " + log);
        }
    }
}`,
              output: `CircularBuffer contents in chronological order:
 -> Log 3
 -> Log 4
 -> Log 5`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "By implementing Iterable and calculating index '(head + count) % capacity', the buffer exposes an ordered sequence from oldest to newest."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "بتطبيق Iterable وحساب موضع العنصر بالمعادلة الدائرية، يستعرض المكرر العناصر مرتبة زمنياً بسلاسة."
            }
          ],
          quiz: [
          {
                    "id": "iterators-concept-q1",
                    "question": "What is the primary role of the Iterable<T> interface in the Java Collections Framework?",
                    "options": [
                              "It provides random access methods like get(int index) to collections",
                              "It defines the iterator() factory method, allowing any conforming class to be the target of Java's enhanced for-each loop",
                              "It automatically sorts elements as they are added",
                              "It serializes collection elements across network sockets"
                    ],
                    "correctIndex": 1,
                    "explanation": "java.lang.Iterable<T> requires implementing a single abstract method: Iterator<T> iterator(). Any class implementing Iterable can be directly traversed using Java's enhanced for-each loop syntax: for (T item : iterable)."
          },
          {
                    "id": "iterators-concept-q2",
                    "question": "How does the Iterator design pattern achieve decoupling in software architecture?",
                    "options": [
                              "It combines data storage and UI rendering into a single class",
                              "It provides a uniform interface to traverse sequential elements of an aggregate object without exposing its underlying internal data representation (array, linked list, tree, hash bucket)",
                              "It prevents multiple threads from accessing memory concurrently",
                              "It guarantees that all collections use primitive arrays under the hood"
                    ],
                    "correctIndex": 1,
                    "explanation": "The Iterator pattern encapsulates traversal logic, giving client code a standardized protocol (hasNext, next) to iterate over disparate data structures (ArrayList, LinkedList, TreeSet, custom graphs) without needing to know how elements are stored internally."
          },
          {
                    "id": "iterators-concept-q3",
                    "question": "What constitutes a 'fail-fast' iterator in Java?",
                    "options": [
                              "An iterator that finishes traversing an entire collection in less than one millisecond",
                              "An iterator that immediately throws ConcurrentModificationException if it detects that the underlying collection was structurally modified outside of the iterator's own remove/add methods",
                              "An iterator that skips corrupted memory blocks without throwing errors",
                              "An iterator that shuts down the JVM upon detecting a null element"
                    ],
                    "correctIndex": 1,
                    "explanation": "Fail-fast iterators (such as those in ArrayList, HashSet, HashMap) track collection mutations via an internal modCount. If modCount != expectedModCount during traversal, the iterator immediately throws ConcurrentModificationException rather than risking non-deterministic behavior."
          },
          {
                    "id": "iterators-concept-q4",
                    "question": "How does a 'fail-safe' (weakly consistent) iterator, such as the one in CopyOnWriteArrayList, handle concurrent modifications?",
                    "options": [
                              "It throws a checked ConcurrentModificationException that must be caught",
                              "It iterates over an immutable snapshot of the underlying array taken when the iterator was created, completely avoiding ConcurrentModificationException",
                              "It locks the entire OS process during traversal",
                              "It creates a deep clone of every object inside the list on each step"
                    ],
                    "correctIndex": 1,
                    "explanation": "CopyOnWriteArrayList iterators are fail-safe: they capture a direct reference to the immutable backing array snapshot at the instant iterator() is called. Any subsequent writes allocate a new array, leaving the iterator's snapshot untouched and immune to ConcurrentModificationException (though it will not see subsequent modifications)."
          },
          {
                    "id": "iterators-concept-q5",
                    "question": "Which capabilities does ListIterator provide that standard Iterator does not?",
                    "options": [
                              "Thread-safe lock-free parallel streaming across GPU cores",
                              "Bidirectional traversal (hasPrevious, previous), element position queries (nextIndex, previousIndex), in-place element insertion (add), and value updates (set)",
                              "Automatic sorting and binary search capabilities",
                              "Direct SQL querying against database tables"
                    ],
                    "correctIndex": 1,
                    "explanation": "ListIterator extends Iterator<E> specifically for List collections. It allows forward and backward traversal (hasPrevious, previous), querying current index positions, adding new elements at the cursor (add), and replacing the last returned element (set)."
          },
          {
                    "id": "iterators-concept-q6",
                    "question": "What is a key difference between an Iterator and a Java 8+ Spliterator?",
                    "options": [
                              "Spliterators can only be used with primitive integers",
                              "Spliterators are designed for parallel stream decomposition via trySplit() and can partition chunks of data across multiple CPU cores",
                              "Iterators are faster than Spliterators in all single-threaded scenarios",
                              "Spliterators do not support element traversal"
                    ],
                    "correctIndex": 1,
                    "explanation": "Spliterator ('splitable iterator') was introduced in Java 8 to enable parallel stream processing. Its trySplit() method partitions a source sequence into two halves, allowing multi-core parallel execution with ForkJoinPool."
          },
          {
                    "id": "iterators-concept-q7",
                    "question": "Why can an Iterable be traversed multiple times, while an Iterator can generally only be traversed once?",
                    "options": [
                              "Iterators delete each element as they read it",
                              "An Iterable is a factory that returns a fresh, newly initialized Iterator with its cursor at the beginning each time iterator() is called, whereas an Iterator maintains a one-way advancing state cursor",
                              "Iterables are stored in non-volatile flash memory",
                              "Iterators lock the collection permanently upon reaching the end"
                    ],
                    "correctIndex": 1,
                    "explanation": "An Iterable represents the collection itself; calling iterable.iterator() creates a brand new Iterator instance starting at the first element. An Iterator is a stateful cursor: once next() has exhausted all items, it cannot be rewound or reset."
          },
          {
                    "id": "iterators-concept-q8",
                    "question": "What will the following code output?\n\nList<String> list = new ArrayList<>(Arrays.asList(\"A\", \"B\", \"C\"));\nfor (String s : list) {\n    if (\"B\".equals(s)) {\n        list.remove(s);\n    }\n}\nSystem.out.println(list);",
                    "options": [
                              "\"[A, C]\"",
                              "Throws ConcurrentModificationException",
                              "\"[A, B]\"",
                              "Throws IndexOutOfBoundsException"
                    ],
                    "correctIndex": 1,
                    "explanation": "The enhanced for-loop uses an Iterator under the hood. Calling list.remove(s) mutates the list's modCount directly without updating the iterator's expectedModCount. On the subsequent iteration check, the iterator detects modCount != expectedModCount and throws ConcurrentModificationException."
          },
          {
                    "id": "iterators-concept-q9",
                    "question": "What is the output of the following code using ListIterator?\n\nList<String> list = new ArrayList<>(List.of(\"A\", \"B\", \"C\"));\nListIterator<String> it = list.listIterator();\nwhile (it.hasNext()) {\n    String item = it.next();\n    if (\"B\".equals(item)) {\n        it.set(\"Beta\");\n        it.add(\"B-2\");\n    }\n}\nSystem.out.println(list);",
                    "options": [
                              "[A, Beta, B-2, C]",
                              "[A, B, B-2, C]",
                              "[Beta, B-2, A, C]",
                              "Throws IllegalStateException"
                    ],
                    "correctIndex": 0,
                    "explanation": "When it.next() returns \"B\", it.set(\"Beta\") replaces \"B\" with \"Beta\". Then it.add(\"B-2\") inserts \"B-2\" immediately after the cursor (after \"Beta\" and before \"C\"). On the next loop, it.next() yields \"C\". The resulting list is [A, Beta, B-2, C]."
          },
          {
                    "id": "iterators-concept-q10",
                    "question": "Consider a custom infinite Fibonacci generator implementing Iterator<Long>. What should its hasNext() method return?",
                    "options": [
                              "false after reaching Long.MAX_VALUE",
                              "true unconditionally, because an infinite generator never exhausts elements until caller termination",
                              "null",
                              "It should throw UnsupportedOperationException"
                    ],
                    "correctIndex": 1,
                    "explanation": "An infinite generator iterator conceptually produces an unbounded stream of values; its hasNext() method always returns true. Callers control termination (e.g., via counter limits or break statements)."
          },
          {
                    "id": "iterators-concept-q11",
                    "question": "What is the historical order of traversal mechanisms introduced in Java from oldest to newest?",
                    "options": [
                              "Spliterator -> Iterable -> Iterator -> Enumeration",
                              "Enumeration (Java 1.0) -> Iterator (Java 1.2) -> Iterable/Enhanced For (Java 5) -> Spliterator (Java 8)",
                              "Iterator -> Enumeration -> Stream -> Spliterator",
                              "Iterable -> Enumeration -> ListIterator -> Spliterator"
                    ],
                    "correctIndex": 1,
                    "explanation": "Java 1.0 introduced Enumeration (hasMoreElements, nextElement). Java 1.2 introduced the Collections Framework with Iterator. Java 5 added Iterable and the enhanced for-each loop. Java 8 introduced Spliterator and Streams."
          },
          {
                    "id": "iterators-concept-q12",
                    "question": "Why is traversing a LinkedList of size N using a classic index loop (for (int i=0; i<N; i++) list.get(i)) an O(N^2) antipattern, whereas using an Iterator is O(N)?",
                    "options": [
                              "LinkedList locks during get()",
                              "Each get(i) call restarts traversal from the head (or tail) node and traverses i steps, leading to 1 + 2 + ... + N = O(N^2) operations. An iterator maintains a direct pointer to the current Node and advances in O(1) per step",
                              "Iterators use cache prefetching supported by hardware, whereas get(i) does not",
                              "LinkedList converts to an array inside an Iterator"
                    ],
                    "correctIndex": 1,
                    "explanation": "LinkedList does not support random access. Calling list.get(i) must walk the linked nodes from index 0 to index i on each pass, costing O(n) per lookup and resulting in O(n^2) total time. An Iterator holds a direct pointer to the current node and advances it in O(1) time, completing full traversal in O(n) time."
          },
          {
                    "id": "iterators-concept-q13",
                    "question": "When implementing an in-order binary tree iterator, what internal data structure is commonly used to maintain the active traversal state?",
                    "options": [
                              "An explicit Stack (or Deque) to hold ancestor nodes as the cursor traverses left subtrees",
                              "A circular linked hash map",
                              "An external SQL database connection",
                              "A static thread local variable"
                    ],
                    "correctIndex": 0,
                    "explanation": "An in-order tree iterator mimics recursion iteratively by storing unvisited ancestor nodes on an explicit Stack (such as ArrayDeque), pushing left child nodes onto the stack and popping them upon calling next()."
          },
          {
                    "id": "iterators-concept-q14",
                    "question": "What happens if a custom class implements Iterable<T> and returns null from its iterator() method, and is then used in an enhanced for loop?",
                    "options": [
                              "The loop completes 0 iterations and terminates normally",
                              "The JVM throws a NullPointerException immediately when entering the loop",
                              "A compile-time error occurs",
                              "The JVM constructs an empty dummy iterator"
                    ],
                    "correctIndex": 1,
                    "explanation": "The compiler expands 'for (T x : customIterable)' into 'Iterator<T> it = customIterable.iterator(); while (it.hasNext())'. If iterator() returns null, calling it.hasNext() causes an immediate NullPointerException at runtime."
          },
          {
                    "id": "iterators-concept-q15",
                    "question": "What is the output of the following code snippet?\n\nList<Integer> numbers = new ArrayList<>(List.of(1, 2, 3, 4, 5));\nIterator<Integer> it = numbers.iterator();\nwhile (it.hasNext()) {\n    int val = it.next();\n    if (val % 2 == 0) {\n        it.remove();\n    }\n}\nSystem.out.println(numbers);",
                    "options": [
                              "[1, 3, 5]",
                              "[2, 4]",
                              "Throws ConcurrentModificationException",
                              "Throws IllegalStateException"
                    ],
                    "correctIndex": 0,
                    "explanation": "Using it.remove() directly on the iterator is the legitimate and safe way to delete items during traversal. It removes the last element returned by next() (the even numbers 2 and 4) and keeps internal modification counts synchronized, leaving [1, 3, 5]."
          }
]
        }
      ]
    },

    /* ==========================================================================
       TOPIC 70: Java Iterator
       ========================================================================== */
    {
      id: "java-iterator",
      title: "70. Java Iterator",
      description: "Deep dive into java.util.Iterator: hasNext(), next(), remove(), and Java 8+ forEachRemaining(), internal cursor mechanics, modCount synchronization, preventing ConcurrentModificationException, and safe item removal patterns.",
      lessons: [
        {
          id: "java-iterator-mastery",
          title: "Complete Guide to java.util.Iterator",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "The java.util.Iterator Mechanics & modCount Synchronization (آلية عمل Iterator ومزامنة عداد التعديلات)"
            },
            {
              type: "paragraph",
              text: "The 'java.util.Iterator<E>' interface provides four methods: 1) 'boolean hasNext()' - returns true if there are more elements; 2) 'E next()' - returns the next element and advances the cursor; 3) 'default void remove()' - removes from the underlying collection the last element returned by next(); 4) 'default void forEachRemaining(Consumer<? super E> action)' - performs the given action on each remaining element. The critical power of Iterator lies in 'remove()': it is the ONLY safe way to delete items from a collection during a traversal without throwing ConcurrentModificationException. The iterator updates the collection's 'modCount' and syncs its internal 'expectedModCount', keeping state consistent."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "توفر واجهة 'java.util.Iterator<E>' أربع دوال جوهرية: 1) hasNext لفحص وجود عناصر تالية؛ 2) next لجلب العنصر التالي وتحريك المؤشر؛ 3) remove لحذف آخر عنصر تم جلبه بواسطة next بأمان؛ 4) forEachRemaining لتطبيق إجراء برمجي على كافة العناصر المتبقية دفعة واحدة. وتكمن القوة الهندسية لـ Iterator في دالة remove(): فهي الطريقة الآمنة والوحيدة لحذف عناصر من المجموعات أثناء المرور عليها دون إطلاق استثناء ConcurrentModificationException؛ حيث تقوم بتحديث عداد التعديلات 'modCount' وتزامنه مع عداد المكرر الداخلي."
            },
            {
              type: "paragraph",
              text: "The Rules of Iterator.remove(): 1) Can only be called ONCE per next() invocation; 2) Calling remove() before next() throws IllegalStateException; 3) Calling remove() twice without an intervening next() throws IllegalStateException; 4) It safely deletes the current element and adjusts the internal cursor."
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
              text: "Example 1: Classic hasNext() and next() Traversal (المثال 1: المرور التقليدي بدالتي hasNext و next)"
            },
            {
              type: "paragraph",
              text: "Standard step-by-step element retrieval."
            },
            {
              type: "code",
              language: "java",
              filename: "BasicIteratorDemo.java",
              code: `import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class BasicIteratorDemo {
    public static void main(String[] args) {
        List<String> cities = new ArrayList<>();
        cities.add("Riyadh");
        cities.add("Dubai");
        cities.add("Cairo");

        Iterator<String> it = cities.iterator();

        System.out.println("Stepping through elements:");
        while (it.hasNext()) {
            String city = it.next();
            System.out.println(" -> Visited: " + city);
        }
    }
}`,
              output: `Stepping through elements:
 -> Visited: Riyadh
 -> Dubai
 -> Visited: Cairo`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "hasNext() checks boundary conditions, and next() returns the current element while advancing the cursor."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "تفحص hasNext وجود عناصر تالية، بينما تجلب next العنصر وتحرك المؤشر خطوة للأمام."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Safe Deletion with iterator.remove() (المثال 2: الحذف الآمن عبر iterator.remove)"
            },
            {
              type: "paragraph",
              text: "Removing elements matching a condition during iteration without crashing."
            },
            {
              type: "code",
              language: "java",
              filename: "SafeIteratorRemoveDemo.java",
              code: `import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class SafeIteratorRemoveDemo {
    public static void main(String[] args) {
        List<Integer> scores = new ArrayList<>(List.of(85, 42, 90, 55, 78, 30));

        System.out.println("Original scores: " + scores);

        // Remove scores below 60 safely
        Iterator<Integer> it = scores.iterator();
        while (it.hasNext()) {
            int score = it.next();
            if (score < 60) {
                it.remove(); // SAFELY REMOVES CURRENT ELEMENT!
            }
        }

        System.out.println("Passing scores:  " + scores);
    }
}`,
              output: `Original scores: [85, 42, 90, 55, 78, 30]
Passing scores:  [85, 90, 78]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "it.remove() synchronizes expectedModCount with list.modCount, preventing ConcurrentModificationException."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "تزامن it.remove عداد التعديلات الداخلي للائحة مع المكرر فتحذف العنصر بسلام دون أي أخطاء."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: IllegalStateException Violation on remove() (المثال 3: استثناء IllegalStateException عند إساءة استخدام remove)"
            },
            {
              type: "paragraph",
              text: "Demonstrating the strict contract: remove() requires a preceding next()."
            },
            {
              type: "code",
              language: "java",
              filename: "IteratorRemoveIllegalStateDemo.java",
              code: `import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class IteratorRemoveIllegalStateDemo {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>(List.of("One", "Two"));
        Iterator<String> it = list.iterator();

        // 1. Calling remove before next() throws IllegalStateException
        try {
            it.remove();
        } catch (IllegalStateException e) {
            System.out.println("Exception 1: Cannot call remove() before next()!");
        }

        // 2. Calling remove twice without intervening next()
        it.next(); // returns "One"
        it.remove(); // removes "One"
        try {
            it.remove(); // Second remove in a row!
        } catch (IllegalStateException e) {
            System.out.println("Exception 2: Cannot call remove() twice in succession!");
        }
    }
}`,
              output: `Exception 1: Cannot call remove() before next()!
Exception 2: Cannot call remove() twice in succession!`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "remove() deletes the item returned by the most recent next(). Without a preceding next(), there is no element to delete."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "تحذف remove العنصر الذي أعادته آخر دالة next()؛ فإن لم تُستدع next مسبقاً فلا يوجد عنصر لحذفه."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Consuming Remaining Elements with forEachRemaining() (المثال 4: استهلاك بقية العناصر بـ forEachRemaining)"
            },
            {
              type: "paragraph",
              text: "Inspecting first element, then passing the rest to a lambda."
            },
            {
              type: "code",
              language: "java",
              filename: "ForEachRemainingDemo.java",
              code: `import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class ForEachRemainingDemo {
    public static void main(String[] args) {
        List<String> pipeline = new ArrayList<>(List.of("HEADER", "ROW_1", "ROW_2", "ROW_3"));

        Iterator<String> it = pipeline.iterator();

        // Process header specially
        if (it.hasNext()) {
            String header = it.next();
            System.out.println("Extracted Header: " + header);
        }

        // Process all remaining elements efficiently using forEachRemaining
        System.out.println("Processing data payload:");
        it.forEachRemaining(row -> System.out.println(" * Parsed: " + row));
    }
}`,
              output: `Extracted Header: HEADER
Processing data payload:
 * Parsed: ROW_1
 * Parsed: ROW_2
 * Parsed: ROW_3`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "forEachRemaining() processes all elements left in the iterator, combining procedural control with functional lambdas."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "تستهلك forEachRemaining كل ما تبقى من عناصر في المكرر بتمريرها لدالة لامدا بكفاءة."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Iterating over Map.entrySet() and Removing (المثال 5: استعراض وحذف مدخلات الخريطة بالمكرر)"
            },
            {
              type: "paragraph",
              text: "Pruning map entries safely via entrySet().iterator()."
            },
            {
              type: "code",
              language: "java",
              filename: "MapIteratorRemoveDemo.java",
              code: `import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public class MapIteratorRemoveDemo {
    public static void main(String[] args) {
        Map<String, Integer> stock = new HashMap<>();
        stock.put("Laptops", 15);
        stock.put("Phones", 0);
        stock.put("Headphones", 25);
        stock.put("Keyboards", 0);

        System.out.println("Initial stock: " + stock);

        // Remove out-of-stock items safely
        Iterator<Map.Entry<String, Integer>> it = stock.entrySet().iterator();
        while (it.hasNext()) {
            Map.Entry<String, Integer> entry = it.next();
            if (entry.getValue() == 0) {
                it.remove(); // Safely removes entry from backing HashMap!
            }
        }

        System.out.println("In-stock stock: " + stock);
    }
}`,
              output: `Initial stock: {Keyboards=0, Phones=0, Headphones=25, Laptops=15}
In-stock stock: {Headphones=25, Laptops=15}`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "Calling it.remove() on an entrySet iterator safely removes the key-value pair from the backing HashMap."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "استدعاء it.remove على مكرر entrySet يحذف الزوج من خريطة HashMap الأصلية بسلام تام."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Collection.removeIf() (The Modern Java 8+ Shortcut) (المثال 6: البديل العصري removeIf في جافا الحديثة)"
            },
            {
              type: "paragraph",
              text: "Replacing verbose iterator loops with clean removeIf(Predicate)."
            },
            {
              type: "code",
              language: "java",
              filename: "RemoveIfModernDemo.java",
              code: `import java.util.ArrayList;
import java.util.List;

public class RemoveIfModernDemo {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>(List.of("Alexander", "Bob", "Christopher", "Dan", "Elizabeth"));

        System.out.println("All names:     " + names);

        // Under the hood, removeIf uses Iterator.remove()!
        names.removeIf(name -> name.length() > 5);

        System.out.println("Short names:   " + names);
    }
}`,
              output: `All names:     [Alexander, Bob, Christopher, Dan, Elizabeth]
Short names:   [Bob, Dan]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "Collection.removeIf() internally uses Iterator.remove(), giving you clean one-line syntax with guaranteed safety."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "تستخدم دالة removeIf مكرر الحذف داخلياً لتمنحك صياغة سريعة وأنيقة بسطر واحد مع أمان تام."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Inspecting Cursor and modCount Mechanics (المثال 7: فحص ميكانيكية المؤشر وعداد التعديلات داخلياً)"
            },
            {
              type: "paragraph",
              text: "Understanding how the cursor index tracks progress."
            },
            {
              type: "code",
              language: "java",
              filename: "CursorMechanicsDemo.java",
              code: `import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class CursorMechanicsDemo {
    public static void main(String[] args) {
        List<String> letters = new ArrayList<>(List.of("A", "B", "C", "D"));

        Iterator<String> it = letters.iterator();
        int step = 1;

        while (it.hasNext()) {
            String val = it.next();
            System.out.println("Step " + (step++) + ": Returned element '" + val + "'");
        }

        System.out.println("hasNext() at end: " + it.hasNext());
    }
}`,
              output: `Step 1: Returned element 'A'
Step 2: Returned element 'B'
Step 3: Returned element 'C'
Step 4: Returned element 'D'
hasNext() at end: false`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "The cursor starts at 0. next() reads element at cursor, then increments cursor. hasNext() checks if cursor != size."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "يبدأ المؤشر عند 0؛ تقرأ next العنصر ثم تزيد المؤشر، وتتحقق hasNext من عدم وصول المؤشر للنهاية."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Synchronizing Iterator on Thread-Safe Wrapper Collections (المثال 8: مزامنة المكرر عند استخدام Collections.synchronizedList)"
            },
            {
              type: "paragraph",
              text: "Why iterating over synchronizedList MUST be enclosed in synchronized(list) block."
            },
            {
              type: "code",
              language: "java",
              filename: "SynchronizedListIterationDemo.java",
              code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;

public class SynchronizedListIterationDemo {
    public static void main(String[] args) {
        List<String> syncList = Collections.synchronizedList(new ArrayList<>());
        syncList.add("Item 1");
        syncList.add("Item 2");

        // MANDATORY: User must manually synchronize on the wrapper during iteration!
        synchronized (syncList) {
            Iterator<String> it = syncList.iterator();
            while (it.hasNext()) {
                System.out.println("Locked thread-safe item: " + it.next());
            }
        }
    }
}`,
              output: `Locked thread-safe item: Item 1
Locked thread-safe item: Item 2`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "Collections.synchronizedList synchronizes individual method calls, but iteration involves multiple calls. You must hold the lock manually."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "تزامن synchronizedList الدوال الفردية فقط، أما التكرار فيتطلب قفل اللائحة يدوياً لمنع التداخل."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Safe String Sanitation with Iterator (المثال 9: تنقية النصوص بالمكرر)"
            },
            {
              type: "paragraph",
              text: "Pruning null or blank strings from user input lists."
            },
            {
              type: "code",
              language: "java",
              filename: "SanitizeStringsDemo.java",
              code: `import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class SanitizeStringsDemo {
    public static void main(String[] args) {
        List<String> tags = new ArrayList<>();
        tags.add("java");
        tags.add("");
        tags.add("   ");
        tags.add(null);
        tags.add("spring");

        System.out.println("Raw tags:        " + tags);

        Iterator<String> it = tags.iterator();
        while (it.hasNext()) {
            String tag = it.next();
            if (tag == null || tag.trim().isEmpty()) {
                it.remove();
            }
        }

        System.out.println("Sanitized tags:  " + tags);
    }
}`,
              output: `Raw tags:        [java, ,    , null, spring]
Sanitized tags:  [java, spring]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "Iterator.remove() safely weeds out invalid entries in a single pass without extra memory allocation."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "تحذف it.remove المدخلات غير الصالحة في دورة واحدة دون استهلاك ذاكرة إضافية."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Peeking Ahead with a PeekableIterator (المثال 10: استباق القراءة دون تحريك المؤشر)"
            },
            {
              type: "paragraph",
              text: "Designing an iterator with peek() capability."
            },
            {
              type: "code",
              language: "java",
              filename: "PeekableIteratorDemo.java",
              code: `import java.util.Iterator;
import java.util.List;
import java.util.NoSuchElementException;

public class PeekableIteratorDemo {
    static class PeekableIterator<E> implements Iterator<E> {
        private final Iterator<E> iterator;
        private E nextItem = null;
        private boolean hasPeeked = false;

        public PeekableIterator(Iterator<E> iterator) {
            this.iterator = iterator;
        }

        public E peek() {
            if (!hasPeeked) {
                if (!iterator.hasNext()) throw new NoSuchElementException();
                nextItem = iterator.next();
                hasPeeked = true;
            }
            return nextItem;
        }

        @Override
        public boolean hasNext() {
            return hasPeeked || iterator.hasNext();
        }

        @Override
        public E next() {
            if (!hasNext()) throw new NoSuchElementException();
            if (hasPeeked) {
                E item = nextItem;
                hasPeeked = false;
                nextItem = null;
                return item;
            }
            return iterator.next();
        }
    }

    public static void main(String[] args) {
        List<String> tokens = List.of("SELECT", "*", "FROM", "users");
        PeekableIterator<String> pIt = new PeekableIterator<>(tokens.iterator());

        System.out.println("Peeking at next token: " + pIt.peek());
        System.out.println("Peeking again:         " + pIt.peek() + " (cursor didn't move!)");
        System.out.println("Actually reading:      " + pIt.next());
        System.out.println("Next token is now:     " + pIt.next());
    }
}`,
              output: `Peeking at next token: SELECT
Peeking again:         SELECT (cursor didn't move!)
Actually reading:      SELECT
Next token is now:     *`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "A peekable iterator buffers the next element so parsers can inspect incoming tokens without advancing."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "يحتفظ المكرر المستبق بالعنصر مؤقتاً ليتيح للمحللات فحص الرموز القادمة دون تحريك المؤشر."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Converting Iterator to Java Stream (المثال 11: تحويل المكرر إلى تدفق Stream)"
            },
            {
              type: "paragraph",
              text: "Bridging legacy iterators to the modern Stream API."
            },
            {
              type: "code",
              language: "java",
              filename: "IteratorToStreamDemo.java",
              code: `import java.util.Iterator;
import java.util.List;
import java.util.Spliterators;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

public class IteratorToStreamDemo {
    public static void main(String[] args) {
        Iterator<Integer> legacyIterator = List.of(1, 2, 3, 4, 5).iterator();

        // Convert Iterator to Stream using StreamSupport & Spliterators
        List<Integer> squared = StreamSupport.stream(
                Spliterators.spliteratorUnknownSize(legacyIterator, 0), false)
                .map(n -> n * n)
                .collect(Collectors.toList());

        System.out.println("Transformed via Stream: " + squared);
    }
}`,
              output: `Transformed via Stream: [1, 4, 9, 16, 25]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "StreamSupport.stream allows wrapping any custom Iterator into a fully functional Stream."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "تتيح StreamSupport تحويل أي مكرر قديم إلى تدفق Stream عصري واستخدام دوال التحويل map و filter."
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
                "Mistake 1: Calling list.remove(item) inside a standard for-each loop. Always use iterator.remove() or collection.removeIf().",
                "خطأ 1: استدعاء list.remove داخل حلقة for-each؛ استخدم دائماً iterator.remove أو removeIf لمنع حدوث استثناء.",
                "Mistake 2: Calling it.remove() multiple times consecutively without calling it.next() in between.",
                "خطأ 2: استدعاء remove عدة مرات متتالية دون استدعاء next بينهما؛ مما يرمي IllegalStateException.",
                "Mistake 3: Storing an iterator instance long-term while modifying the underlying collection elsewhere, then expecting the iterator to still work.",
                "خطأ 3: الاحتفاظ بكائن المكرر وتعديل اللائحة في مكان آخر ثم محاولة استخدامه؛ فيفشل لعدم تطابق العدادات."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Duplicate Cleaner Engine (التحدي العملي: محرك تنقية التكرارات المتتالية)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Create a class 'DuplicateCleaner' with a static method 'removeConsecutiveDuplicates(List<T> list)' that modifies the list in place using an Iterator. It must delete any element that is equal to its immediate predecessor. Test in main() with ['A', 'A', 'B', 'C', 'C', 'C', 'D', 'A'] and verify output is ['A', 'B', 'C', 'D', 'A']."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: صمم فئة DuplicateCleaner بدالة ثابتة removeConsecutiveDuplicates لحذف العناصر المكررة المتتالية في موضعها باستخدام Iterator حصراً. إذا كان العنصر يطابق سابقه المباشر يُحذف فوراً. اختبرها في main بقائمة ['A', 'A', 'B', 'C', 'C', 'C', 'D', 'A'] وتأكد من بقاء ['A', 'B', 'C', 'D', 'A']."
            },
            {
              type: "code",
              language: "java",
              filename: "DuplicateCleanerChallenge.java",
              code: `import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Objects;

public class DuplicateCleanerChallenge {
    public static <T> void removeConsecutiveDuplicates(List<T> list) {
        if (list == null || list.size() <= 1) return;

        Iterator<T> it = list.iterator();
        T previous = it.next(); // Read first element

        while (it.hasNext()) {
            T current = it.next();
            if (Objects.equals(previous, current)) {
                it.remove(); // Safely deletes duplicate!
            } else {
                previous = current; // Advance predecessor
            }
        }
    }

    public static void main(String[] args) {
        List<String> letters = new ArrayList<>(List.of("A", "A", "B", "C", "C", "C", "D", "A"));

        System.out.println("Before cleaning: " + letters);
        removeConsecutiveDuplicates(letters);
        System.out.println("After cleaning:  " + letters);
    }
}`,
              output: `Before cleaning: [A, A, B, C, C, C, D, A]
After cleaning:  [A, B, C, D, A]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "The method tracks the previous element and uses it.remove() whenever current equals previous, leaving distinct consecutive items intact."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "تتتبع الدالة العنصر السابق وتستدعي it.remove عند تطابقه مع العنصر الحالي، فتحذف المتتاليات المكررة في دورة واحدة."
            }
          ],
          quiz: [
          {
                    "id": "iterator-mastery-q1",
                    "question": "What are the core abstract methods declared in java.util.Iterator?",
                    "options": [
                              "start(), advance(), stop()",
                              "hasNext() and next() (with remove() and forEachRemaining() having default implementations)",
                              "getFirst(), getNext(), hasMore()",
                              "seek(), read(), close()"
                    ],
                    "correctIndex": 1,
                    "explanation": "java.util.Iterator has two mandatory abstract methods: boolean hasNext() and E next(). The remove() method (default in Java 8) throws UnsupportedOperationException unless overridden, and default void forEachRemaining(Consumer<? super E> action) was added in Java 8."
          },
          {
                    "id": "iterator-mastery-q2",
                    "question": "Under what specific condition does calling iterator.remove() throw an IllegalStateException?",
                    "options": [
                              "When the underlying collection contains null elements",
                              "If next() has not yet been called on the iterator, or if remove() has already been called after the last call to next()",
                              "When the collection is an ArrayList",
                              "Only when multiple threads are executing"
                    ],
                    "correctIndex": 1,
                    "explanation": "The Iterator contract stipulates that remove() can only be called once per call to next(). If next() has never been called, or if remove() is called twice without an intervening next() call, it throws IllegalStateException."
          },
          {
                    "id": "iterator-mastery-q3",
                    "question": "What will happen if you invoke it.next() when it.hasNext() returns false?",
                    "options": [
                              "It returns null",
                              "It loops back and returns the first element again",
                              "It throws a NoSuchElementException",
                              "It blocks the thread until a new element is added to the collection"
                    ],
                    "correctIndex": 2,
                    "explanation": "According to the Iterator specification, calling next() when there are no remaining elements throws java.util.NoSuchElementException."
          },
          {
                    "id": "iterator-mastery-q4",
                    "question": "What does the forEachRemaining() method on Iterator do?",
                    "options": [
                              "It resets the iterator cursor to the beginning and performs the action on all elements",
                              "It performs the given action on each remaining unvisited element of the iterator until all elements have been processed or an exception is thrown",
                              "It creates a parallel thread pool to process items concurrently",
                              "It returns a new List containing the remaining items"
                    ],
                    "correctIndex": 1,
                    "explanation": "default void forEachRemaining(Consumer<? super E> action) iterates through all elements remaining in the iterator from the current cursor position to the end, applying the action to each. Once completed, hasNext() returns false."
          },
          {
                    "id": "iterator-mastery-q5",
                    "question": "What is the output of the following code?\n\nList<String> list = new ArrayList<>(List.of(\"Alpha\", \"Beta\", \"Gamma\"));\nIterator<String> it = list.iterator();\nSystem.out.print(it.next() + \" \");\nit.forEachRemaining(s -> System.out.print(s.length() + \" \"));\nSystem.out.print(it.hasNext());",
                    "options": [
                              "\"Alpha 4 5 false\"",
                              "\"Alpha Beta Gamma true\"",
                              "\"Alpha 5 false\"",
                              "Throws NoSuchElementException"
                    ],
                    "correctIndex": 0,
                    "explanation": "1) it.next() consumes \"Alpha\" and prints it. 2) it.forEachRemaining processes the remaining elements (\"Beta\", \"Gamma\"), printing their lengths 4 and 5. 3) Finally, all elements are consumed, so it.hasNext() returns false. Output: \"Alpha 4 5 false\"."
          },
          {
                    "id": "iterator-mastery-q6",
                    "question": "Why does collection.removeIf(predicate) in Java 8+ represent a safer and cleaner alternative to manual while(it.hasNext()) loops with it.remove()?",
                    "options": [
                              "removeIf() runs on GPU shaders",
                              "removeIf() encapsulates the iteration and removal logic, eliminates boilerplate iterator code, avoids cursor errors, and allows collections (like ArrayList) to perform optimized bulk shifting in O(n) instead of repeated O(n^2) element copies",
                              "removeIf() allows elements to be removed without locking thread-safe collections",
                              "removeIf() converts any collection into a Set"
                    ],
                    "correctIndex": 1,
                    "explanation": "Collection.removeIf() avoids verbose while loops and cursor state mistakes. In implementations like ArrayList, removeIf() is overridden to filter elements using a bit-mask and compress elements in a single O(n) pass, avoiding the repeated System.arraycopy overhead of calling it.remove() multiple times."
          },
          {
                    "id": "iterator-mastery-q7",
                    "question": "How does ArrayList's internal Itr class track whether remove() can be safely called?",
                    "options": [
                              "It checks if the system clock has advanced",
                              "It maintains an integer field 'lastRet' storing the index of the element returned by the last next() call; calling remove() resets lastRet to -1, and remove() checks if lastRet < 0",
                              "It queries the garbage collector",
                              "It allocates a new boolean flag on the JVM heap for every call"
                    ],
                    "correctIndex": 1,
                    "explanation": "In java.util.ArrayList.Itr: cursor tracks the index of the next element, and lastRet stores the index of the last element returned (-1 by default). When remove() executes, it checks 'if (lastRet < 0) throw new IllegalStateException()', removes element at lastRet, adjusts cursor, and resets lastRet = -1."
          },
          {
                    "id": "iterator-mastery-q8",
                    "question": "What is required when iterating over a synchronized collection created via Collections.synchronizedList(list)?",
                    "options": [
                              "Nothing; the iterator is inherently synchronized across threads",
                              "The user must manually synchronize on the collection instance during the entire iteration loop to prevent concurrent modification by other threads",
                              "You must use a volatile variable to hold the iterator",
                              "Synchronized lists do not permit the use of iterators"
                    ],
                    "correctIndex": 1,
                    "explanation": "As explicitly stated in JavaDoc for Collections.synchronizedList(): It is imperative that the user manually synchronize on the returned list when iterating over it: 'synchronized (list) { Iterator i = list.iterator(); while (i.hasNext()) ... }', because iteration involves multiple method calls (hasNext, next) that cannot be protected atomically by individual synchronized methods."
          },
          {
                    "id": "iterator-mastery-q9",
                    "question": "What happens when this code is executed?\n\nList<Integer> list = new ArrayList<>(List.of(1, 2, 3));\nIterator<Integer> it = list.iterator();\nit.remove();",
                    "options": [
                              "The first element (1) is removed",
                              "Throws IllegalStateException",
                              "Throws UnsupportedOperationException",
                              "Throws IndexOutOfBoundsException"
                    ],
                    "correctIndex": 1,
                    "explanation": "Calling it.remove() before calling it.next() violates the Iterator state machine because no element has been returned yet (lastRet is -1). An IllegalStateException is thrown."
          },
          {
                    "id": "iterator-mastery-q10",
                    "question": "What is the proper idiom for conditionally removing key-value entries from a Map using an Iterator?",
                    "options": [
                              "Iterate over map.keySet() and call map.remove(key)",
                              "Iterate over map.entrySet().iterator() and call iterator.remove() on matching entries",
                              "Use map.values().remove(val) inside a for-each loop",
                              "Maps do not support iterators under any circumstances"
                    ],
                    "correctIndex": 1,
                    "explanation": "To inspect both key and value and remove conditionally, obtain an iterator over the entrySet: 'Iterator<Map.Entry<K,V>> it = map.entrySet().iterator(); while(it.hasNext()){ if(...) it.remove(); }'. Calling iterator.remove() cleanly removes the entry from the backing map."
          },
          {
                    "id": "iterator-mastery-q11",
                    "question": "How can you convert a standard Java Iterator<T> into a modern Java Stream<T>?",
                    "options": [
                              "iterator.toStream()",
                              "StreamSupport.stream(Spliterators.spliteratorUnknownSize(iterator, Spliterator.ORDERED), false)",
                              "Stream.of(iterator)",
                              "new Stream<>(iterator)"
                    ],
                    "correctIndex": 1,
                    "explanation": "Java provides StreamSupport.stream(Spliterators.spliteratorUnknownSize(iterator, characteristics), parallel). Wrapping the iterator in a spliterator of unknown size allows full integration into the Java Stream pipeline."
          },
          {
                    "id": "iterator-mastery-q12",
                    "question": "What is the output of the following code snippet?\n\nList<String> items = new ArrayList<>(List.of(\"A\", \"B\", \"C\", \"D\"));\nIterator<String> it = items.iterator();\nwhile (it.hasNext()) {\n    String s = it.next();\n    if (\"B\".equals(s) || \"C\".equals(s)) {\n        it.remove();\n    }\n}\nSystem.out.println(items);",
                    "options": [
                              "[A, D]",
                              "[A, B, D]",
                              "Throws ConcurrentModificationException",
                              "Throws IllegalStateException"
                    ],
                    "correctIndex": 0,
                    "explanation": "Each time \"B\" and \"C\" are encountered, it.next() advances and it.remove() safely removes that element. Because each remove() follows a corresponding next(), the operations are completely valid and leave [A, D]."
          },
          {
                    "id": "iterator-mastery-q13",
                    "question": "What does the PeekableIterator pattern allow a developer to do?",
                    "options": [
                              "Look at the upcoming element that next() will return without actually advancing the iterator cursor",
                              "Read elements backwards from the end of the collection",
                              "View elements from other threads concurrently",
                              "Directly inspect memory addresses of elements"
                    ],
                    "correctIndex": 0,
                    "explanation": "A PeekableIterator decorates an existing Iterator by maintaining a 1-element lookahead buffer. Its peek() method inspects this buffered element without advancing the underlying cursor, making it invaluable for lexical parsers and token streams."
          },
          {
                    "id": "iterator-mastery-q14",
                    "question": "What will the following code print?\n\nList<Integer> list = new ArrayList<>(List.of(10, 20, 30));\nIterator<Integer> it = list.iterator();\nwhile (it.hasNext()) {\n    System.out.print(it.next() + \" \");\n    it.remove();\n}\nSystem.out.println(\"size:\" + list.size());",
                    "options": [
                              "\"10 20 30 size:0\"",
                              "\"10 size:2\"",
                              "Throws IllegalStateException",
                              "\"10 20 30 size:3\""
                    ],
                    "correctIndex": 0,
                    "explanation": "The loop iterates through 10, 20, and 30. After each next() call, it.remove() deletes the element that was just returned. All 3 elements are printed and subsequently removed, leaving list.size() == 0. Output: \"10 20 30 size:0\"."
          },
          {
                    "id": "iterator-mastery-q15",
                    "question": "What will happen if remove() is called twice consecutively in the following code?\n\nList<String> list = new ArrayList<>(List.of(\"X\", \"Y\", \"Z\"));\nIterator<String> it = list.iterator();\nit.next();\nit.remove();\nit.remove();",
                    "options": [
                              "Both \"X\" and \"Y\" are removed",
                              "The second remove() call throws IllegalStateException",
                              "The second remove() call does nothing silently",
                              "The list is cleared completely"
                    ],
                    "correctIndex": 1,
                    "explanation": "The first it.remove() successfully deletes \"X\" and resets the internal lastRet pointer to -1. The second it.remove() checks lastRet, discovers it is -1 (no new next() call occurred), and immediately throws IllegalStateException."
          }
]
        }
      ]
    }
  ];
})();
