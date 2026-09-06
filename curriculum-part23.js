/**
 * Java Curriculum Module - Part 23
 * Topics:
 * 45. Java Files
 * 46. Java Create Files
 * 
 * 100% Offline, Pure JavaScript. Complete educational content with full bilingual (English & Arabic) explanations.
 */

(function () {
  'use strict';

  window.JAVA_TOPICS_PART23 = [
    /* ==========================================================================
       TOPIC 45: Java Files
       ========================================================================== */
    {
      id: "java-files",
      title: "45. Java Files",
      description: "Mastering File Inspection and Metadata in Java: java.io.File vs java.nio.file.Files, querying existence, testing file vs directory, permissions (read/write/execute), file size, modification timestamps, directory traversal with Files.list(), Files.walk(), and Files.find().",
      lessons: [
        {
          id: "java-files-mastery",
          title: "Complete Guide to Java Files & Attributes",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "Java Files: Inspection, Attributes, & Metadata (فحص الملفات والخصائص والبيانات الوصفية في جافا)"
            },
            {
              type: "paragraph",
              text: "Inspecting files and their filesystem attributes is a foundational task in software development. Java provides two primary mechanisms: the legacy 'java.io.File' class and the modern 'java.nio.file.Files' utility class. While 'File' provides basic boolean checks, 'Files' in NIO.2 provides high-performance, atomic, operating-system-level queries for file existence, sizes, permissions, POSIX attributes, and stream-based directory traversal."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "يُعد فحص الملفات واستخراج خصائصها وبياناتها الوصفية من أهم المهام البرمجية في جافا. توفر اللغة طريقتين: صنف 'java.io.File' الكلاسيكي والصنف المساعد الحديث 'java.nio.file.Files'. بينما يقدم File فحوصات أساسية، يتميز صنف Files في NIO.2 بأداء فائق وعمليات ذرية واستعلامات دقيقة على مستوى نظام التشغيل للتحقق من وجود الملفات، وأحجامها بالبايت، وصلاحيات القراءة والكتابة، والمسح الشجري للمجلدات."
            },
            {
              type: "paragraph",
              text: "Core Attributes & Checks: 1) Existence: exists() / notExists(); 2) Type: isRegularFile() vs isDirectory() vs isSymbolicLink(); 3) Security: isReadable(), isWritable(), isExecutable(); 4) Size: length() / size(); 5) Timestamps: lastModified() / getLastModifiedTime(); 6) Directory Scanning: listFiles() vs Files.list() vs recursive Files.walk()."
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
              text: "Example 1: Checking Existence and Distinguishing File vs Directory (المثال 1: فحص الوجود والتمييز بين ملف ومجلد)"
            },
            {
              type: "paragraph",
              text: "Checking if a path points to an existing file, a directory, or doesn't exist."
            },
            {
              type: "code",
              language: "java",
              filename: "FileExistenceDemo.java",
              code: `import java.io.File;

public class FileExistenceDemo {
    public static void inspectPath(String pathStr) {
        File file = new File(pathStr);
        System.out.println("Checking path: " + pathStr);
        System.out.println(" - Exists? " + file.exists());
        if (file.exists()) {
            System.out.println(" - Is standard file? " + file.isFile());
            System.out.println(" - Is directory? " + file.isDirectory());
            System.out.println(" - Is hidden? " + file.isHidden());
        }
    }

    public static void main(String[] args) {
        inspectPath("."); // Current directory
        System.out.println();
        inspectPath("non_existent_file.xyz");
    }
}`,
              output: `Checking path: .
 - Exists? true
 - Is standard file? false
 - Is directory? true
 - Is hidden? false

Checking path: non_existent_file.xyz
 - Exists? false`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "file.exists() returns false if the path does not exist on disk. isFile() and isDirectory() differentiate between plain files and folders."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "تُرجع file.exists() قيمة false إذا كان الملف غير موجود، وتفصل دالتا isFile و isDirectory بين الملف العادي والمجلد."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Modern Existence Checking with NIO.2 Files (المثال 2: الفحص الحديث للوجود باستخدام Files.exists)"
            },
            {
              type: "paragraph",
              text: "Why Files.notExists() is not simply the opposite of Files.exists() due to permission barriers."
            },
            {
              type: "code",
              language: "java",
              filename: "NioExistenceDemo.java",
              code: `import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class NioExistenceDemo {
    public static void main(String[] args) {
        Path path = Paths.get("data");

        boolean exists = Files.exists(path);
        boolean notExists = Files.notExists(path);

        System.out.println("Path: " + path);
        System.out.println("Files.exists(): " + exists);
        System.out.println("Files.notExists(): " + notExists);
        // Note: In secure environments with forbidden permissions,
        // BOTH exists and notExists can return false!
    }
}`,
              output: `Path: data
Files.exists(): false
Files.notExists(): true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "In NIO.2, if an access control restriction prevents determining file status, both exists() and notExists() return false."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "في NIO.2، إذا كان البرنامج محروماً من الصلاحيات للتحقق من الملف، فستُرجع كلتا الدالتين false لأن الحالة مجهولة أمنياً."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Querying File Size and Formatting to Human-Readable Units (المثال 3: فحص حجم الملف وتنسيقه لوحدات مقروءة)"
            },
            {
              type: "paragraph",
              text: "Calculating byte length and converting to KB, MB, and GB."
            },
            {
              type: "code",
              language: "java",
              filename: "FileSizeFormatterDemo.java",
              code: `import java.io.File;

public class FileSizeFormatterDemo {
    public static String formatFileSize(long bytes) {
        if (bytes < 1024) return bytes + " B";
        int exp = (int) (Math.log(bytes) / Math.log(1024));
        char unit = "KMGTPE".charAt(exp - 1);
        return String.format("%.2f %sB", bytes / Math.pow(1024, exp), unit);
    }

    public static void main(String[] args) {
        long[] sampleSizes = { 512L, 4096L, 10485760L, 5368709120L };
        for (long s : sampleSizes) {
            System.out.println(s + " bytes -> " + formatFileSize(s));
        }
    }
}`,
              output: `512 bytes -> 512 B
4096 bytes -> 4.00 KB
10485760 bytes -> 10.00 MB
5368709120 bytes -> 5.00 GB`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "file.length() returns file size in bytes as a primitive long; formatting algorithms convert it to human-readable strings."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "تُرجع دالة file.length() الحجم الدقيق بالبايتات بنوع long، وتُستخدم المعادلات الرياضية لتحويله إلى كيلوبايت وميجابايت."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Inspecting and Modifying Permissions (المثال 4: فحص وتعديل صلاحيات القراءة والكتابة)"
            },
            {
              type: "paragraph",
              text: "Testing canRead, canWrite, canExecute and toggling permissions."
            },
            {
              type: "code",
              language: "java",
              filename: "FilePermissionsDemo.java",
              code: `import java.io.File;

public class FilePermissionsDemo {
    public static void printPermissions(File f) {
        System.out.printf("Permissions for '%s': Read=%b | Write=%b | Execute=%b%n",
                f.getName(), f.canRead(), f.canWrite(), f.canExecute());
    }

    public static void main(String[] args) {
        File currentDir = new File(".");
        printPermissions(currentDir);

        // Note: setReadOnly() can lock a file from modification
        // file.setReadOnly();
        // file.setWritable(true);
    }
}`,
              output: `Permissions for '.': Read=true | Write=true | Execute=true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "canRead(), canWrite(), and canExecute() query the current process's operational access rights to the given path."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "تتحقق الدوال canRead و canWrite و canExecute من حقوق البرنامج الفعلية الممنوحة له من نظام التشغيل للتعامل مع المسار."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Reading Last Modified Timestamps (المثال 5: قراءة تاريخ وتوقيت آخر تعديل للملف)"
            },
            {
              type: "paragraph",
              text: "Converting epoch milliseconds to java.time.Instant and formatted dates."
            },
            {
              type: "code",
              language: "java",
              filename: "LastModifiedDemo.java",
              code: `import java.io.File;
import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

public class LastModifiedDemo {
    public static void main(String[] args) {
        File dir = new File(".");
        long epochMillis = dir.lastModified();

        Instant instant = Instant.ofEpochMilli(epochMillis);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")
                .withZone(ZoneId.systemDefault());

        System.out.println("Raw Epoch Millis: " + epochMillis);
        System.out.println("Formatted Modified Time: " + formatter.format(instant));
    }
}`,
              output: `Raw Epoch Millis: 1772924395000
Formatted Modified Time: 2026-03-07 23:53:15`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "lastModified() returns milliseconds since Unix epoch (Jan 1, 1970). Instant.ofEpochMilli converts it to modern java.time objects."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "تُرجع lastModified التوقيت بالميلي ثانية منذ 1970، ويتم تحويلها عبر java.time.Instant إلى نص تاريخ منسق مقروء."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Listing Directory Contents with File.listFiles() (المثال 6: استعراض محتويات المجلد بـ listFiles)"
            },
            {
              type: "paragraph",
              text: "Using File.listFiles() and filtering files versus child folders."
            },
            {
              type: "code",
              language: "java",
              filename: "ClassicListFilesDemo.java",
              code: `import java.io.File;

public class ClassicListFilesDemo {
    public static void main(String[] args) {
        File dir = new File(".");
        File[] entries = dir.listFiles();

        if (entries != null) {
            System.out.println("=== Contents of Directory (" + entries.length + " items) ===");
            for (File entry : entries) {
                String type = entry.isDirectory() ? "[DIR] " : "[FILE]";
                System.out.printf("%-7s %-25s Size: %d bytes%n", type, entry.getName(), entry.length());
            }
        } else {
            System.out.println("Path is not a directory or access was denied.");
        }
    }
}`,
              output: `=== Contents of Directory (3 items) ===
[DIR]   src                       Size: 4096 bytes
[FILE]  pom.xml                   Size: 1542 bytes
[FILE]  README.md                 Size: 820 bytes`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "Always check if entries != null because listFiles() returns null (instead of an empty array) if an I/O error or permission failure occurs."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "يجب دائماً فحص entries != null لأن listFiles تُرجع null بدلاً من مصفوفة فارغة في حال نقص الصلاحيات أو حدوث خطأ."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Filtering Files with FilenameFilter (المثال 7: تصفية الملفات بحسب الامتداد FilenameFilter)"
            },
            {
              type: "paragraph",
              text: "Filtering directory listings using lambda expressions for specific file extensions."
            },
            {
              type: "code",
              language: "java",
              filename: "FilenameFilterDemo.java",
              code: `import java.io.File;
import java.io.FilenameFilter;

public class FilenameFilterDemo {
    public static void main(String[] args) {
        File dir = new File(".");

        // Filter only files ending with .java or .xml
        FilenameFilter codeFilter = (parent, name) -> name.endsWith(".java") || name.endsWith(".xml");

        String[] matchedNames = dir.list(codeFilter);
        if (matchedNames != null) {
            System.out.println("Matched Code Files (" + matchedNames.length + "):");
            for (String name : matchedNames) {
                System.out.println(" -> " + name);
            }
        }
    }
}`,
              output: `Matched Code Files (1):
 -> pom.xml`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "FilenameFilter is a functional interface, allowing concise lambda expressions to select matching filenames."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "واجهة FilenameFilter هي واجهة وظيفية تتيح تصفية الملفات بأسلوب أنيق وسريع باستخدام تعبيرات لامبدا (Lambda)."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Modern Stream-Based Directory Listing with Files.list() (المثال 8: استعراض المجلد بأسلوب التدفق Files.list)"
            },
            {
              type: "paragraph",
              text: "Using java.nio.file.Files.list() with Java Stream API inside try-with-resources."
            },
            {
              type: "code",
              language: "java",
              filename: "ModernFilesListDemo.java",
              code: `import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Stream;

public class ModernFilesListDemo {
    public static void main(String[] args) {
        Path current = Paths.get(".");

        // Files.list() returns a lazy Stream<Path> that MUST be closed via try-with-resources!
        try (Stream<Path> stream = Files.list(current)) {
            System.out.println("=== Streamed Directory Entries ===");
            stream.filter(Files::isRegularFile)
                  .map(Path::getFileName)
                  .forEach(name -> System.out.println("File: " + name));
        } catch (IOException e) {
            System.out.println("I/O error listing directory: " + e.getMessage());
        }
    }
}`,
              output: `=== Streamed Directory Entries ===
File: pom.xml
File: README.md`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "Files.list() opens an underlying directory stream handle. Always wrap it in try-with-resources to prevent operating system file handle leaks."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "تفتح Files.list() مقبض تيار للنظام؛ لذا يجب دائماً حمايتها بـ try-with-resources لتفادي تسريب موارد نظام التشغيل."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Recursive Directory Walking with Files.walk() (المثال 9: المسح الشجري التكراري للمجلدات بـ Files.walk)"
            },
            {
              type: "paragraph",
              text: "Traversing an entire folder hierarchy recursively using NIO.2 Files.walk()."
            },
            {
              type: "code",
              language: "java",
              filename: "FilesWalkDemo.java",
              code: `import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Stream;

public class FilesWalkDemo {
    public static void main(String[] args) {
        Path start = Paths.get(".");

        // Files.walk visits all subdirectories recursively up to specified maxDepth
        try (Stream<Path> stream = Files.walk(start, 2)) {
            System.out.println("=== Recursive Traversal (Max Depth = 2) ===");
            stream.forEach(p -> {
                int depth = p.getNameCount() - start.getNameCount();
                String indent = "  ".repeat(Math.max(0, depth));
                String type = Files.isDirectory(p) ? "[D]" : "[F]";
                System.out.println(indent + type + " " + p.getFileName());
            });
        } catch (IOException e) {
            System.out.println("Walk error: " + e.getMessage());
        }
    }
}`,
              output: `=== Recursive Traversal (Max Depth = 2) ===
[D] .
  [D] src
    [D] main
  [F] pom.xml
  [F] README.md`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "Files.walk() simplifies tree traversal that previously required writing complex recursive methods."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "تغني دالة Files.walk() عن كتابة دوال استدعاء ذاتي (Recursion) معقدة لمسح المجلدات الفرعية."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Reading Basic File Attributes in a Single System Call (المثال 10: قراءة حزمة الخصائص الأساسية باستدعاء واحد)"
            },
            {
              type: "paragraph",
              text: "Using BasicFileAttributes to read size, creationTime, lastAccessTime, and lastModifiedTime in one OS call."
            },
            {
              type: "code",
              language: "java",
              filename: "BasicFileAttributesDemo.java",
              code: `import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.attribute.BasicFileAttributes;

public class BasicFileAttributesDemo {
    public static void main(String[] args) {
        Path path = Paths.get("pom.xml");

        try {
            // Bulk read of file metadata in ONE OS system call
            BasicFileAttributes attrs = Files.readAttributes(path, BasicFileAttributes.class);

            System.out.println("Size in Bytes:      " + attrs.size());
            System.out.println("Is Regular File:    " + attrs.isRegularFile());
            System.out.println("Is Directory:       " + attrs.isDirectory());
            System.out.println("Is Symbolic Link:   " + attrs.isSymbolicLink());
            System.out.println("Creation Time:      " + attrs.creationTime());
            System.out.println("Last Modified Time: " + attrs.lastModifiedTime());
            System.out.println("Last Access Time:   " + attrs.lastAccessTime());
        } catch (IOException e) {
            System.out.println("Could not query attributes: " + e.getMessage());
        }
    }
}`,
              output: `Size in Bytes:      1542
Is Regular File:    true
Is Directory:       false
Is Symbolic Link:   false
Creation Time:      2026-03-01T12:00:00Z
Last Modified Time: 2026-03-07T18:45:00Z
Last Access Time:   2026-03-07T20:10:00Z`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "Files.readAttributes is significantly faster than individual calls to isDirectory, length, and lastModified because it performs only a single OS stat syscall."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "تعتبر readAttributes أسرع بكثير لأنها تجلب جميع البيانات الوصفية باستدعاء نظام تشغيل واحد بدلاً من تكرار الاستعلامات."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Enterprise Storage Audit and Cleanup Scanner (المثال 11: الماسح الضوئي المؤسسي لتدقيق مساحات التخزين)"
            },
            {
              type: "paragraph",
              text: "Real-world production tool: scanning directory trees, computing total size, and finding orphaned files."
            },
            {
              type: "code",
              language: "java",
              filename: "StorageAuditScannerDemo.java",
              code: `import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Stream;

public class StorageAuditScannerDemo {
    public static void auditDirectory(Path root) {
        AtomicInteger fileCount = new AtomicInteger();
        AtomicInteger dirCount = new AtomicInteger();
        AtomicLong totalBytes = new AtomicLong();

        System.out.println("Starting audit on: " + root.toAbsolutePath());

        try (Stream<Path> paths = Files.walk(root)) {
            paths.forEach(p -> {
                if (Files.isDirectory(p)) {
                    dirCount.incrementAndGet();
                } else if (Files.isRegularFile(p)) {
                    fileCount.incrementAndGet();
                    try {
                        totalBytes.addAndGet(Files.size(p));
                    } catch (IOException ignored) {}
                }
            });

            System.out.println("=== Audit Results ===");
            System.out.println("Total Directories: " + dirCount.get());
            System.out.println("Total Files:       " + fileCount.get());
            System.out.printf("Total Size:        %.2f MB (%d bytes)%n",
                    totalBytes.get() / (1024.0 * 1024.0), totalBytes.get());
        } catch (IOException e) {
            System.out.println("Audit interrupted: " + e.getMessage());
        }
    }

    public static void main(String[] args) {
        auditDirectory(Paths.get("."));
    }
}`,
              output: `Starting audit on: /workspace/app/.
=== Audit Results ===
Total Directories: 4
Total Files:       18
Total Size:        0.12 MB (128450 bytes)`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "Enterprise storage auditors use Files.walk() with Atomic accumulators to generate instant folder capacity reports."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "تستخدم أدوات فحص التخزين المؤسسية Files.walk مع مجمعات ذرية لتوليد تقارير شاملة عن أحجام المجلدات وسعاتها."
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
                "Mistake 1: Not closing the Stream returned by Files.list(), Files.walk(), or Files.find(). These streams hold open OS file descriptors and cause leaks if not wrapped in try-with-resources.",
                "خطأ 1: عدم إغلاق التدفق العائد من Files.list أو Files.walk بـ try-with-resources، مما يسبب تسريب واصفات الملفات في النظام.",
                "Mistake 2: Forgetting that File.listFiles() returns null when permissions are missing or the target is not a directory, leading to NullPointerExceptions on iteration.",
                "خطأ 2: نسيان أن listFiles تُرجع null عند نقص الصلاحيات؛ مما يؤدي إلى NullPointerException إذا تم تكرارها مباشرة في حلقة for.",
                "Mistake 3: Calling file.length() on a directory and expecting total size of its contents. On most OSes, length() on a directory returns the size of the directory table, not its files."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Mock Storage Inspector Sentinel (التحدي العملي: حارس فحص التخزين)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Build an inspector: 1) Class 'MockFileInfo' with fields: name, sizeBytes, isDir; 2) Method 'inspect(MockFileInfo[] items)': count total files, count total directories, and calculate total size of files; 3) Method 'findLargest(MockFileInfo[] items)' returning the largest file; 4) In main(), test with sample files and print complete statistics."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: صمم فاحصاً للتخزين: 1) فئة MockFileInfo تحتوي على الاسم والحجم ونوع المجلد؛ 2) دالة inspect تحسب عدد الملفات والمجلدات والحجم الكلي؛ 3) دالة findLargest تعيد أكبر ملف؛ 4) اختبر الكود في main واطبع الإحصائيات الكاملة."
            },
            {
              type: "code",
              language: "java",
              filename: "StorageInspectorChallenge.java",
              code: `public class StorageInspectorChallenge {
    static class MockFileInfo {
        final String name;
        final long sizeBytes;
        final boolean isDir;

        MockFileInfo(String name, long size, boolean isDir) {
            this.name = name;
            this.sizeBytes = size;
            this.isDir = isDir;
        }
    }

    public static void inspect(MockFileInfo[] items) {
        int files = 0, dirs = 0;
        long totalSize = 0;
        MockFileInfo largest = null;

        for (MockFileInfo item : items) {
            if (item.isDir) {
                dirs++;
            } else {
                files++;
                totalSize += item.sizeBytes;
                if (largest == null || item.sizeBytes > largest.sizeBytes) {
                    largest = item;
                }
            }
        }

        System.out.println("=== Inspection Report ===");
        System.out.println("Total Directories: " + dirs);
        System.out.println("Total Regular Files: " + files);
        System.out.println("Total Storage Used: " + totalSize + " bytes");
        if (largest != null) {
            System.out.println("Largest File: " + largest.name + " (" + largest.sizeBytes + " bytes)");
        }
    }

    public static void main(String[] args) {
        MockFileInfo[] diskSnapshot = {
            new MockFileInfo("documents", 4096, true),
            new MockFileInfo("report.pdf", 254800, false),
            new MockFileInfo("video.mp4", 104857600, false),
            new MockFileInfo("notes.txt", 1240, false),
            new MockFileInfo("images", 4096, true)
        };

        inspect(diskSnapshot);
    }
}`,
              output: `=== Inspection Report ===
Total Directories: 2
Total Regular Files: 3
Total Storage Used: 105113640 bytes
Largest File: video.mp4 (104857600 bytes)`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "The solution aggregates directories and file sizes while tracking the maximum file record in a single pass."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "يقوم الحل بجمع أحجام الملفات وحساب عدد المجلدات وتحديد أكبر ملف حجماً في دورة مسح واحدة بكفاءة عالية."
            }
          ],
          quiz: [
          {
                    "id": "q1",
                    "question": "What happens on the physical hard disk when you execute this line in Java?\nFile file = new File(\"sample.txt\");\n(ماذا يحدث على القرص الصلب عند تنفيذ هذا السطر في جافا؟)",
                    "options": [
                              "A 0-byte file named sample.txt is created immediately.",
                              "Nothing on the disk is changed; it only creates an in-memory pathname representation in Java.",
                              "The JVM reserves 1MB of sector blocks on disk.",
                              "An IOException is thrown if sample.txt does not already exist."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! java.io.File is merely an abstract representation of a pathname in memory. It does NOT interact with the physical disk or create a file until creation methods (like createNewFile) are explicitly invoked. (صنف File يمثل فقط المسار في الذاكرة ولا ينشئ أي ملف على القرص حتى يتم استدعاء دوال الإنشاء صراحة)."
          },
          {
                    "id": "q2",
                    "question": "What does file.length() return if the file does NOT exist on the file system?\nFile file = new File(\"ghost.txt\"); // file does not exist\nSystem.out.println(file.length());\n(ماذا تُرجع file.length() إذا كان الملف غير موجود فعلياً على القرص؟)",
                    "options": [
                              "Throws FileNotFoundException",
                              "0L",
                              "-1L",
                              "Throws NullPointerException"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! In java.io.File, length() returns 0L if the file does not exist, or if it is a directory, or if an I/O error occurs. It never throws an exception. (تُرجع دالة length() القيمة 0L إذا كان الملف غير موجود أو كان مجلداً ولا ترمي استثناءً)."
          },
          {
                    "id": "q3",
                    "question": "What does file.listFiles() return if the target path is NOT a directory or if an I/O read error occurs?\n(ماذا تُرجع دالة file.listFiles() إذا كان المسار ليس مجلداً أو حدث خطأ في القراءة؟)",
                    "options": [
                              "An empty array: new File[0]",
                              "null",
                              "Throws a DirectoryNotFoundException",
                              "Throws an IOException"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! listFiles() returns null (NOT an empty array) if the target path is not a directory, does not exist, or access is denied. Failing to check for null causes a NullPointerException when accessing .length. (تُرجع null وليس مصفوفة فارغة، ولذا فإن عدم فحص null يتسبب بخطأ NullPointerException شهير)."
          },
          {
                    "id": "q4",
                    "question": "What is a major limitation of File.renameTo(File dest)?\n(ما هو العيب أو القصور الرئيسي في دالة File.renameTo؟)",
                    "options": [
                              "It only returns boolean false on failure without any exception or reason explaining why the operation failed (e.g. across drives, locks, or permissions).",
                              "It cannot rename text files.",
                              "It always deletes the original file first before copying.",
                              "It requires root/administrator privileges in all environments."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! File.renameTo() is notoriously platform-dependent and returns false without providing error details. It often fails when moving files across different drive partitions. NIO's Files.move() is far superior. (دالة renameTo القديمة تُرجع false فقط عند الفشل دون توضيح السبب وغالباً تفشل عند النقل بين أقراص مختلفة)."
          },
          {
                    "id": "q5",
                    "question": "How do you convert a legacy java.io.File object to a modern java.nio.file.Path object, and vice versa?\n(كيف تحول كائن File القديم إلى كائن Path الحديث والعكس؟)",
                    "options": [
                              "file.toPath() and path.toFile()",
                              "(Path) file and (File) path",
                              "Paths.convert(file) and Files.convert(path)",
                              "file.asPath() and path.asFile()"
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! Java provides seamless bridging via file.toPath() and path.toFile(). (توفر جافا التحويل المباشر عبر دالتي toPath و toFile)."
          },
          {
                    "id": "q6",
                    "question": "What is the key difference between File.getAbsolutePath() and File.getCanonicalPath()?\n(ما الفرق الجوهري بين getAbsolutePath و getCanonicalPath في صنف File؟)",
                    "options": [
                              "getAbsolutePath resolves symbolic links, while getCanonicalPath does not.",
                              "getCanonicalPath resolves relative specifiers ('.' and '..') and symbolic links to produce a unique system-standard path, while getAbsolutePath retains them.",
                              "getAbsolutePath returns a String, whereas getCanonicalPath returns a byte array.",
                              "There is no difference on modern operating systems."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! getCanonicalPath() queries the file system to resolve '.' and '..' and any symbolic links to find the exact canonical location, while getAbsolutePath() simply combines the current directory with the path as-is. (دالة getCanonicalPath تفك الروابط الرمزية ونقاط .. وتُرجع المسار النهائي الحقيقي المعتمد لنظام التشغيل)."
          },
          {
                    "id": "q7",
                    "question": "What do file.isFile() and file.isDirectory() return if the file does NOT exist on disk?\nFile f = new File(\"missing.txt\");\n(ماذا تُرجع كل من isFile و isDirectory إذا كان الملف غير موجود فعلياً على القرص؟)",
                    "options": [
                              "Both return false",
                              "Both return true",
                              "isFile() returns true; isDirectory() returns false",
                              "Both throw a FileNotFoundException"
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! Both isFile() and isDirectory() return false if the physical target does not exist. (كلا الدالتين تُرجعان false إذا كان الملف أو المجلد غير موجود على القرص)."
          },
          {
                    "id": "q8",
                    "question": "What is the difference between file.getFreeSpace() and file.getUsableSpace()?\n(ما الفرق بين دالتي getFreeSpace و getUsableSpace؟)",
                    "options": [
                              "They are identical in all circumstances.",
                              "getFreeSpace() returns total unallocated bytes on the partition, while getUsableSpace() returns how many bytes this specific JVM user process is permitted to write (taking quotas and root permissions into account).",
                              "getUsableSpace() includes the RAM cache.",
                              "getFreeSpace() is measured in megabytes, whereas getUsableSpace() is measured in bytes."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! getUsableSpace() is much more accurate for checking if you can write data because it accounts for user quotas and operating system privileges, whereas getFreeSpace() is raw unallocated partition space. (دالة getUsableSpace تراعي صلاحيات المستخدم الحالي وحصته المحددة Quota، بخلاف المساحة الإجمالية غير المحجوزة)."
          },
          {
                    "id": "q9",
                    "question": "What is the correct way to filter files by extension (e.g. '.log') using File.list()?\n(ما الطريقة الصحيحة لفلترة الملفات حسب الامتداد باستخدام File.list؟)",
                    "options": [
                              "file.list((dir, name) -> name.endsWith(\".log\"))",
                              "file.list(\"*.log\")",
                              "file.filter(\".log\")",
                              "file.list().select(\".log\")"
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! File.list(FilenameFilter) accepts a FilenameFilter functional interface, which takes (File dir, String name) and returns a boolean. A lambda expression (dir, name) -> name.endsWith(\".log\") works cleanly. (تقبل دالة list واجهة FilenameFilter التي يمكن كتابتها كتعبير لامبدا لفحص امتداد الاسم)."
          },
          {
                    "id": "q10",
                    "question": "How does java.io.File.equals(Object other) compare two File instances?\n(كيف تقارن دالة equals بين كائنين من صنف File؟)",
                    "options": [
                              "It hashes the binary contents of both files on disk.",
                              "It compares the underlying pathname strings (case-insensitively on Windows, case-sensitively on Unix).",
                              "It checks if both files have the same inode/file key on disk.",
                              "It checks if both files have the exact same file size."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! File.equals() compares the textual path strings of the two File objects according to the operating system's case rules. It does NOT check if they refer to the same physical file on disk (use Files.isSameFile() for physical identity). (دالة equals تقارن نصوص المسارات فقط ولا تفحص ما إذا كانا يشيران لنفس الملف الفعلي على القرص)."
          },
          {
                    "id": "q11",
                    "question": "What does file.isHidden() check on a Unix/Linux system?\n(على ماذا تعتمد دالة isHidden لتحديد ما إذا كان الملف مخفياً في نظام لينكس؟)",
                    "options": [
                              "Whether the file has the HIDDEN attribute byte in its FAT header.",
                              "Whether the file's name begins with a period ('.').",
                              "Whether the file's size is 0 bytes.",
                              "Whether the file is owned by the root user."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! On Unix and Linux platforms, a file is considered hidden if its name begins with a period character ('.'). On Windows, it checks the file system's hidden attribute. (في أنظمة لينكس ويونكس، يُعتبر الملف مخفياً إذا بدأ اسمه بنقطة '.'، بينما في ويندوز يعتمد على سمة الملف المخفي)."
          },
          {
                    "id": "q12",
                    "question": "What happens when using the two-argument File constructor:\nFile parent = new File(\"/var/log\");\nFile child = new File(parent, \"nginx/access.log\");\n(ماذا يحدث عند استخدام منشئ File الثنائي الذي يستقبل المجلد الأب واسم الملف الفرعي؟)",
                    "options": [
                              "It throws an IllegalArgumentException because child paths cannot contain slashes.",
                              "It correctly concatenates the parent pathname with the child pathname using the platform-specific separator.",
                              "It requires parent to exist physically on disk at creation time.",
                              "It creates both the directory and file immediately."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! The (File parent, String child) constructor joins parent and child cleanly, handling any missing or redundant slashes automatically. (منشئ File الثنائي يدمج المسار الأب مع الابن باستخدام فاصل النظام المناسب تلقائياً)."
          },
          {
                    "id": "q13",
                    "question": "Why can path.toFile() throw an UnsupportedOperationException when using NIO.2?\n(لماذا قد ترمي دالة path.toFile استثناء UnsupportedOperationException عند استخدام NIO.2؟)",
                    "options": [
                              "If the Path is associated with a non-default FileSystem (such as a ZipFileSystemProvider or an in-memory file system like Jimfs).",
                              "If the file exceeds 2GB in size.",
                              "If the file is marked as read-only.",
                              "If Java is running in 64-bit mode."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! java.io.File can only represent files on the default operating system file system. If a Path belongs to a virtual, zip, or cloud file system provider, it cannot be converted to a File object. (صنف File القديم يدعم فقط نظام ملفات القرص الافتراضي، فإذا كان Path في ملف مضغوط zip أو ذاكرة مؤقتة يرمي UnsupportedOperationException)."
          },
          {
                    "id": "q14",
                    "question": "What is the danger of writing a naive recursive directory traversal using File.listFiles() without tracking visited files?\n(ما هو الخطر من كتابة دالة بحث تكرارية باستخدام listFiles دون تتبع الملفات التي تمت زيارتها؟)",
                    "options": [
                              "The computer will run out of hard drive space.",
                              "Symbolic directory links (symlinks) pointing to parent directories can create infinite recursion loops leading to StackOverflowError.",
                              "listFiles() deletes files upon visiting them.",
                              "The JVM thread will permanently freeze in a deadlock."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! If a folder contains a symbolic link pointing back to an ancestor folder, naive recursion will traverse the circular link forever until the JVM exhausts the call stack with a StackOverflowError. (الروابط الرمزية الدائرية قد تؤدي لتكرار لانهائي يستنزف مكدس الاستدعاءات مسبباً StackOverflowError)."
          },
          {
                    "id": "q15",
                    "question": "What is the difference between File.canWrite() and File.setWritable(true)?\n(ما الفرق بين دالتي canWrite و setWritable؟)",
                    "options": [
                              "canWrite() checks whether the application is currently permitted to write to the file, while setWritable(true) attempts to change the file's permission flags on disk.",
                              "canWrite() opens a stream, while setWritable() flushes the buffer.",
                              "setWritable() only works on Windows.",
                              "canWrite() always returns true for admin users."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! canWrite() is an inspection query (returns boolean), whereas setWritable(boolean) is a mutation command that modifies operating system file permission bits. (دالة canWrite تفحص صلاحية الكتابة الحالية، بينما setWritable تعدل سمات الصلاحيات في نظام التشغيل)."
          }
]
        }
      ]
    },

    /* ==========================================================================
       TOPIC 46: Java Create Files
       ========================================================================== */
    {
      id: "java-create-files",
      title: "46. Java Create Files",
      description: "Complete Guide to File and Directory Creation in Java: File.createNewFile(), Files.createFile(), mkdir() vs mkdirs() vs Files.createDirectories(), temporary file creation, handling FileAlreadyExistsException, atomic creation flags, and POSIX permissions.",
      lessons: [
        {
          id: "java-create-files-mastery",
          title: "Complete Guide to Creating Files & Directories",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "Creating Files & Directories in Java (إنشاء الملفات والمجلدات في لغة جافا)"
            },
            {
              type: "paragraph",
              text: "Creating files and directory structures on disk is an essential capability. In classic Java, 'File.createNewFile()' and 'mkdir() / mkdirs()' provided basic creation functionality. In modern Java, NIO.2 'Files.createFile()' and 'Files.createDirectories()' provide atomic, reliable, and exception-rich creation methods that report exact failure reasons (such as FileAlreadyExistsException or AccessDeniedException) rather than returning ambiguous boolean values."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "يُعد إنشاء الملفات والمجلدات على القرص التخزيني من العمليات الأساسية. في جافا الكلاسيكية، كانت تُستخدم دالة 'createNewFile()' ودوال 'mkdir() / mkdirs()'. أما في جافا الحديثة، يقدم صنف 'Files' دوالاً ذرية وقوية مثل 'createFile()' و 'createDirectories()' تمتاز بأنها ترمي استثناءات دقيقة توضح سبب الفشل الحقيقي (مثل FileAlreadyExistsException عند وجود الملف مسبقاً) بدلاً من إرجاع قيمة boolean غامضة."
            },
            {
              type: "paragraph",
              text: "Core Creation Methods: 1) File.createNewFile(): Atomically creates a new empty file if it doesn't already exist; 2) Files.createFile(Path): Creates a file or throws FileAlreadyExistsException; 3) mkdir() vs mkdirs(): mkdir creates a single directory; mkdirs creates all non-existent parent directories; 4) Files.createDirectories(Path): Safely creates deep directory trees; 5) Files.createTempFile(): Generates unique temporary files in the OS temp directory."
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
              text: "Example 1: Classic File Creation with File.createNewFile() (المثال 1: إنشاء ملف كلاسيكي بـ createNewFile)"
            },
            {
              type: "paragraph",
              text: "Creating an empty file and handling the boolean return value."
            },
            {
              type: "code",
              language: "java",
              filename: "ClassicCreateFileDemo.java",
              code: `import java.io.File;
import java.io.IOException;

public class ClassicCreateFileDemo {
    public static void main(String[] args) {
        File file = new File("app_config.properties");

        try {
            // createNewFile() returns true if file was created, false if it already exists
            boolean created = file.createNewFile();
            if (created) {
                System.out.println("File created successfully: " + file.getAbsolutePath());
            } else {
                System.out.println("File already exists; creation skipped: " + file.getName());
            }
        } catch (IOException e) {
            System.out.println("Failed to create file: " + e.getMessage());
        }
    }
}`,
              output: `File created successfully: /workspace/app/app_config.properties`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "createNewFile() is atomic: the operating system guarantees that either the file is created uniquely or the method returns false if it already exists."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "تعتبر createNewFile ذرية؛ حيث يضمن نظام التشغيل إنشاء الملف الفريد أو إرجاع false إذا كان موجوداً مسبقاً."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Modern Creation with Files.createFile() (المثال 2: إنشاء ملف بالأسلوب الحديث Files.createFile)"
            },
            {
              type: "paragraph",
              text: "Using NIO.2 which throws specific exceptions instead of returning a boolean."
            },
            {
              type: "code",
              language: "java",
              filename: "NioCreateFileDemo.java",
              code: `import java.io.IOException;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class NioCreateFileDemo {
    public static void main(String[] args) {
        Path target = Paths.get("data_feed.json");

        try {
            Path createdPath = Files.createFile(target);
            System.out.println("Created modern file at: " + createdPath);
        } catch (FileAlreadyExistsException faee) {
            System.out.println("Notice: File already exists on disk -> " + faee.getMessage());
        } catch (IOException ioe) {
            System.out.println("I/O Error during creation: " + ioe.getMessage());
        }
    }
}`,
              output: `Created modern file at: data_feed.json`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "Files.createFile throws FileAlreadyExistsException when the file is present, distinguishing existing files from permission errors."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "ترمي Files.createFile استثناء FileAlreadyExistsException، مما يسمح بتمييز وجود الملف مسبقاً عن أخطاء نقص الصلاحيات."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Creating a Single Directory with mkdir() (المثال 3: إنشاء مجلد واحد بـ mkdir)"
            },
            {
              type: "paragraph",
              text: "mkdir() creates only the destination folder and fails if any parent directory does not exist."
            },
            {
              type: "code",
              language: "java",
              filename: "SingleMkdirDemo.java",
              code: `import java.io.File;

public class SingleMkdirDemo {
    public static void main(String[] args) {
        File dir = new File("exports");

        boolean success = dir.mkdir();
        System.out.println("Directory created? " + success);

        // Trying to create nested folder with mkdir() directly fails if parent doesn't exist
        File deepDir = new File("nested/level1/level2");
        boolean deepSuccess = deepDir.mkdir();
        System.out.println("Deep directory created with mkdir()? " + deepSuccess); // false!
    }
}`,
              output: `Directory created? true
Deep directory created with mkdir()? false`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "mkdir() only creates the last directory in the path. If intermediate parent directories are missing, it returns false without creating anything."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "تنشئ دالة mkdir المجلد الأخير فقط في المسار؛ فإذا كانت المجلدات الأبوية غير موجودة تفشل فوراً وترجع false."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Creating Nested Directories with mkdirs() (المثال 4: إنشاء مجلدات متداخلة كاملة بـ mkdirs)"
            },
            {
              type: "paragraph",
              text: "mkdirs() creates the target directory along with all necessary but nonexistent parent directories."
            },
            {
              type: "code",
              language: "java",
              filename: "DeepMkdirsDemo.java",
              code: `import java.io.File;

public class DeepMkdirsDemo {
    public static void main(String[] args) {
        File deepTree = new File("var/logs/app/2026/september");

        // mkdirs() creates the entire missing path chain
        boolean created = deepTree.mkdirs();
        System.out.println("Entire directory hierarchy created? " + created);
        System.out.println("Does directory exist now? " + deepTree.exists());
    }
}`,
              output: `Entire directory hierarchy created? true
Does directory exist now? true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "mkdirs() creates all parent directories in the chain, making it the preferred legacy method for folder tree creation."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "تنشئ دالة mkdirs المسار بالكامل بجميع مجلداته الأبوية المفقودة، وهي الطريقة الكلاسيكية الأفضل لإنشاء الشجرة المجلدية."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Modern Directory Creation with Files.createDirectories() (المثال 5: إنشاء المجلدات الحديث بـ Files.createDirectories)"
            },
            {
              type: "paragraph",
              text: "Files.createDirectories() creates missing parents and DOES NOT throw an exception if the directory already exists."
            },
            {
              type: "code",
              language: "java",
              filename: "NioCreateDirectoriesDemo.java",
              code: `import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class NioCreateDirectoriesDemo {
    public static void main(String[] args) {
        Path deepPath = Paths.get("storage", "tenants", "tenant_a", "invoices");

        try {
            // Creates all missing parents; idempotent (no error if it already exists)
            Path created = Files.createDirectories(deepPath);
            System.out.println("Successfully ensured directory exists: " + created);

            // Second call is safe and does not fail
            Files.createDirectories(deepPath);
            System.out.println("Second call succeeded idempotently.");
        } catch (IOException e) {
            System.out.println("Could not create directories: " + e.getMessage());
        }
    }
}`,
              output: `Successfully ensured directory exists: storage/tenants/tenant_a/invoices
Second call succeeded idempotently.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "Files.createDirectories() is idempotent: it quietly succeeds if the directory already exists, unlike Files.createDirectory()."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "تعتبر Files.createDirectories آمنة ومتكررة (Idempotent)؛ حيث لا ترمي خطأ إذا كان المجلد موجوداً بالفعل، بخلاف createDirectory."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Creating Temporary Files with Files.createTempFile() (المثال 6: إنشاء ملفات مؤقتة فريدة Files.createTempFile)"
            },
            {
              type: "paragraph",
              text: "Generating collision-free temporary files in the OS temp directory with prefix and suffix."
            },
            {
              type: "code",
              language: "java",
              filename: "CreateTempFileDemo.java",
              code: `import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class CreateTempFileDemo {
    public static void main(String[] args) {
        try {
            // Creates temporary file in system default temp directory (/tmp or AppData\Local\Temp)
            Path tempFile = Files.createTempFile("app_upload_", ".tmp");
            System.out.println("Allocated Temp File: " + tempFile);
            System.out.println("File exists immediately: " + Files.exists(tempFile));

            // Mark for deletion upon JVM shutdown
            tempFile.toFile().deleteOnExit();
            System.out.println("Registered for deletion on JVM exit.");
        } catch (IOException e) {
            System.out.println("Failed to allocate temp file: " + e.getMessage());
        }
    }
}`,
              output: `Allocated Temp File: /tmp/app_upload_8392194819230192831.tmp
File exists immediately: true
Registered for deletion on JVM exit.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "Files.createTempFile generates cryptographically random names to avoid file collisions in concurrent environments."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "تولد createTempFile أسماء عشوائية فريدة تمنع تصادم أسماء الملفات بين المستخدمين المتزامنين على نفس الخادم."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Creating Temporary Directory with Files.createTempDirectory() (المثال 7: إنشاء مجلد مؤقت مخصص)"
            },
            {
              type: "paragraph",
              text: "Allocating an isolated temporary working directory for batch tasks."
            },
            {
              type: "code",
              language: "java",
              filename: "CreateTempDirDemo.java",
              code: `import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class CreateTempDirDemo {
    public static void main(String[] args) {
        try {
            Path tempDir = Files.createTempDirectory("batch_job_sandbox_");
            System.out.println("Temporary Sandbox Directory: " + tempDir);
            System.out.println("Is Directory: " + Files.isDirectory(tempDir));
            tempDir.toFile().deleteOnExit();
        } catch (IOException e) {
            System.out.println("Failed to create temp dir: " + e.getMessage());
        }
    }
}`,
              output: `Temporary Sandbox Directory: /tmp/batch_job_sandbox_991823712
Is Directory: true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "Files.createTempDirectory creates a dedicated scratchpad directory for complex multi-file jobs."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "تنشئ createTempDirectory مجلداً مؤقتاً مستقلاً لإنجاز مهام المعالجة الدفعية وتجميع الملفات."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Ensuring Parent Directories Before Creating a File (المثال 8: التأكد من وجود المجلد الأب قبل إنشاء الملف)"
            },
            {
              type: "paragraph",
              text: "A common bug: creating a file in a non-existent folder throws NoSuchFileException. Here is the bulletproof pattern."
            },
            {
              type: "code",
              language: "java",
              filename: "EnsureParentsPatternDemo.java",
              code: `import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class EnsureParentsPatternDemo {
    public static Path createFileWithParents(Path filePath) throws IOException {
        Path parent = filePath.getParent();
        if (parent != null && !Files.exists(parent)) {
            Files.createDirectories(parent);
            System.out.println("Created missing parent directory: " + parent);
        }
        if (!Files.exists(filePath)) {
            Files.createFile(filePath);
            System.out.println("Created target file: " + filePath);
        }
        return filePath;
    }

    public static void main(String[] args) {
        Path target = Paths.get("data", "cache", "sessions", "session_901.dat");
        try {
            createFileWithParents(target);
        } catch (IOException e) {
            System.out.println("Failed: " + e.getMessage());
        }
    }
}`,
              output: `Created missing parent directory: data/cache/sessions
Created target file: data/cache/sessions/session_901.dat`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "Always check filePath.getParent() and invoke Files.createDirectories(parent) before calling createFile()."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "تأكد دائماً من استدعاء createDirectories للمجلد الأب (filePath.getParent()) قبل إنشاء الملف لتجنب استثناء NoSuchFileException."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Atomic File Creation with OpenOption CREATE_NEW (المثال 9: الإنشاء الذري بخيار CREATE_NEW)"
            },
            {
              type: "paragraph",
              text: "Using StandardOpenOption.CREATE_NEW to open a stream only if the file does not already exist (mutex pattern)."
            },
            {
              type: "code",
              language: "java",
              filename: "AtomicCreateNewDemo.java",
              code: `import java.io.OutputStream;
import java.io.IOException;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;

public class AtomicCreateNewDemo {
    public static void acquireFileLock(Path lockPath) {
        // StandardOpenOption.CREATE_NEW fails atomically if file exists
        try (OutputStream os = Files.newOutputStream(lockPath, StandardOpenOption.CREATE_NEW)) {
            os.write("LOCKED_BY_PID_1234".getBytes());
            System.out.println("Process lock acquired successfully on: " + lockPath);
        } catch (FileAlreadyExistsException faee) {
            System.out.println("Could not acquire lock: File already exists (Another instance is running).");
        } catch (IOException ioe) {
            System.out.println("Lock I/O error: " + ioe.getMessage());
        }
    }

    public static void main(String[] args) {
        Path lock = Paths.get("app.lock");
        acquireFileLock(lock);
        // Second attempt to demonstrate mutual exclusion
        acquireFileLock(lock);
    }
}`,
              output: `Process lock acquired successfully on: app.lock
Could not acquire lock: File already exists (Another instance is running).`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "StandardOpenOption.CREATE_NEW guarantees atomic creation at the OS level, making it the basis for process lock files."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "يضمن خيار CREATE_NEW الإنشاء الذري على مستوى النظام، وهو الأساس لإنشاء ملفات أقفال العمليات (Lock Files)."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Creating Symbolic Links with Files.createSymbolicLink() (المثال 10: إنشاء الروابط الرمزية Symbolic Links)"
            },
            {
              type: "paragraph",
              text: "Creating OS-level filesystem pointers (symlinks) to existing target files."
            },
            {
              type: "code",
              language: "java",
              filename: "SymbolicLinkCreateDemo.java",
              code: `import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class SymbolicLinkCreateDemo {
    public static void main(String[] args) {
        Path targetFile = Paths.get("release_v2.4.0.jar");
        Path symlink = Paths.get("current_release.jar");

        try {
            if (!Files.exists(targetFile)) {
                Files.createFile(targetFile);
            }
            // Create symlink pointing 'current_release.jar' -> 'release_v2.4.0.jar'
            Files.createSymbolicLink(symlink, targetFile);
            System.out.println("Symlink created: " + symlink + " -> " + Files.readSymbolicLink(symlink));
            System.out.println("Is Symbolic Link? " + Files.isSymbolicLink(symlink));
        } catch (UnsupportedOperationException | SecurityException | IOException e) {
            System.out.println("Symlink note (often requires elevated OS privileges): " + e.getMessage());
        }
    }
}`,
              output: `Symlink created: current_release.jar -> release_v2.4.0.jar
Is Symbolic Link? true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "Files.createSymbolicLink allows programs to switch active versions without copying physical files."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "تتيح createSymbolicLink توجيه الروابط الرمزية للإصدارات النشطة دون الحاجة لنسخ الملفات الفعلية."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Enterprise Safe File Storage Initializer (المثال 11: مهيء نظام تخزين الملفات المؤسسي الآمن)"
            },
            {
              type: "paragraph",
              text: "Production-grade storage bootstrapper: creates required directories, initializes .gitkeep, and writes a meta header."
            },
            {
              type: "code",
              language: "java",
              filename: "StorageInitializerDemo.java",
              code: `import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class StorageInitializerDemo {
    public static void initializeStoragePartition(String rootPath, String[] partitionNames) {
        Path root = Paths.get(rootPath);
        System.out.println("[BOOTSTRAP] Initializing storage cluster at: " + root.toAbsolutePath());

        for (String partition : partitionNames) {
            Path partPath = root.resolve(partition);
            try {
                // 1. Ensure directory hierarchy exists
                Files.createDirectories(partPath);
                
                // 2. Ensure placeholder sentinel file exists
                Path sentinel = partPath.resolve(".sentinel");
                if (!Files.exists(sentinel)) {
                    Files.createFile(sentinel);
                    System.out.println("  + Initialized partition [" + partition + "] with sentinel.");
                } else {
                    System.out.println("  = Partition [" + partition + "] already active.");
                }
            } catch (IOException e) {
                System.err.println("  ! Failed to initialize partition: " + partition + " -> " + e.getMessage());
            }
        }
    }

    public static void main(String[] args) {
        String[] partitions = { "inbound", "processing", "archive", "quarantine" };
        initializeStoragePartition("enterprise_data_lake", partitions);
    }
}`,
              output: `[BOOTSTRAP] Initializing storage cluster at: /workspace/app/enterprise_data_lake
  + Initialized partition [inbound] with sentinel.
  + Initialized partition [processing] with sentinel.
  + Initialized partition [archive] with sentinel.
  + Initialized partition [quarantine] with sentinel.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "Production applications initialize required folder topologies and sentinel markers during application startup."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "تهيء التطبيقات المؤسسية هيكلية المجلدات المطلوبة مع ملفات الحراسة (Sentinels) تلقائياً عند إقلاع النظام."
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
                "Mistake 1: Calling Files.createFile() when the parent directory doesn't exist yet, throwing NoSuchFileException. Always ensure parent directories exist via Files.createDirectories(path.getParent()).",
                "خطأ 1: محاولة استدعاء Files.createFile دون إنشاء المجلدات الأبوية مسبقاً، مما يرمي NoSuchFileException.",
                "Mistake 2: Using mkdir() instead of mkdirs() to create nested directories. mkdir() silently returns false if any parent is missing.",
                "خطأ 2: استخدام mkdir بدلاً من mkdirs لإنشاء مسارات متداخلة، حيث تفشل الأولى بصمت وتُرجع false.",
                "Mistake 3: Relying on File.createNewFile() without inspecting its boolean return value. It returns false if the file already exists."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Daily Log Archive Factory (التحدي العملي: مصنع أرشيف السجلات اليومية)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Build a safe log archiver: 1) Class 'DailyLogFactory'; 2) Method 'prepareDailyLog(String basePath, String year, String month, String day, String serviceName)': construct directory path 'basePath/logs/year/month', ensure all parent directories exist, then construct filename 'serviceName-YYYYMMDD.log' and ensure the file is created; 3) Return the full Path; 4) In main(), test with sample dates and print the created path."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: صمم مصنعاً لسجلات الأرشيف: 1) فئة DailyLogFactory؛ 2) دالة prepareDailyLog تستقبل المسار والتاريخ واسم الخدمة؛ 3) تضمن إنشاء كافة المجلدات الأبوية وتنشئ ملف السجل؛ 4) اختبر الدالة في main واطبع المسار النهائي."
            },
            {
              type: "code",
              language: "java",
              filename: "DailyLogChallenge.java",
              code: `import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class DailyLogChallenge {
    static class DailyLogFactory {
        public static Path prepareDailyLog(String basePath, String year, String month, String day, String service) 
                throws IOException {
            Path folder = Paths.get(basePath, "logs", year, month);
            Files.createDirectories(folder);

            String filename = String.format("%s-%s%s%s.log", service, year, month, day);
            Path logFile = folder.resolve(filename);

            if (!Files.exists(logFile)) {
                Files.createFile(logFile);
                System.out.println("Log file allocated: " + logFile);
            } else {
                System.out.println("Log file already active: " + logFile);
            }
            return logFile;
        }
    }

    public static void main(String[] args) {
        try {
            Path log1 = DailyLogFactory.prepareDailyLog("var", "2026", "09", "05", "payment-service");
            System.out.println("Verified Path: " + log1.toAbsolutePath());
        } catch (IOException e) {
            System.out.println("Log creation error: " + e.getMessage());
        }
    }
}`,
              output: `Log file allocated: var/logs/2026/09/payment-service-20260905.log
Verified Path: /workspace/app/var/logs/2026/09/payment-service-20260905.log`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "The factory cleanly isolates folder creation using Files.createDirectories before safely resolving and allocating the target log file."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "يفصل المصنع بين إنشاء المجلدات الأبوية بـ createDirectories ثم إنشاء ملف السجل بأمان واحترافية."
            }
          ],
          quiz: [
          {
                    "id": "q1",
                    "question": "What does File.createNewFile() return if the target file ALREADY exists on disk?\nFile file = new File(\"existing.txt\");\nboolean result = file.createNewFile();\n(ماذا تُرجع دالة File.createNewFile() إذا كان الملف موجوداً بالفعل على القرص؟)",
                    "options": [
                              "It throws a FileAlreadyExistsException.",
                              "It returns false and leaves the existing file completely untouched.",
                              "It returns true and truncates the file to 0 bytes.",
                              "It returns false and deletes the existing file."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! File.createNewFile() is atomic: if the file already exists, it returns false without modifying or truncating the file in any way. (تُرجع false ولا تعدل أي شيء في محتوى الملف الموجود أصلاً)."
          },
          {
                    "id": "q2",
                    "question": "What happens if you call createNewFile() when the parent directory does NOT exist?\nFile file = new File(\"missing_folder/report.txt\");\nfile.createNewFile();\n(ماذا يحدث عند استدعاء createNewFile() إذا كان المجلد الأب غير موجود؟)",
                    "options": [
                              "It creates the parent directory automatically.",
                              "It throws a java.io.IOException (\"No such file or directory\" or \"The system cannot find the path specified\").",
                              "It returns false silently without throwing any exception.",
                              "It creates the file in the root directory instead."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! createNewFile() requires all parent directories to already exist. If any parent directory is missing, it throws a java.io.IOException. (يجب أن تكون المجلدات الأبوية موجودة مسبقاً، وإلا رمت الدالة استثناء IOException)."
          },
          {
                    "id": "q3",
                    "question": "What is the difference between File.mkdir() and File.mkdirs()?\n(ما الفرق بين دالتي File.mkdir() و File.mkdirs()؟)",
                    "options": [
                              "mkdir() creates only the named directory (failing if parent directories are missing), while mkdirs() creates the named directory along with all necessary nonexistent parent directories.",
                              "mkdir() creates directories on Windows, while mkdirs() is only for Linux.",
                              "mkdir() creates hidden folders, while mkdirs() creates visible folders.",
                              "They are identical aliases."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! mkdir() creates only the final directory and returns false if intermediate folders are missing. mkdirs() creates the full ancestor directory tree as needed. (تنشئ mkdir المجلد الأخير فقط وتفشل إن نقصت المجلدات السابقة، بينما تنشئ mkdirs كامل شجرة المجلدات المطلوبة)."
          },
          {
                    "id": "q4",
                    "question": "What does Files.createFile(Path path) do if the file already exists on disk?\n(ماذا تفعل دالة Files.createFile(Path) إذا كان الملف موجوداً بالفعل على القرص؟)",
                    "options": [
                              "It overwrites the file silently.",
                              "It throws a java.nio.file.FileAlreadyExistsException.",
                              "It returns null.",
                              "It appends a random number to the file name."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Unlike classic File.createNewFile() which returns false, modern NIO Files.createFile() throws a FileAlreadyExistsException if the file already exists. (ترمي دالة Files.createFile في NIO استثناء FileAlreadyExistsException إذا كان الملف موجوداً)."
          },
          {
                    "id": "q5",
                    "question": "What does Files.createDirectories(Path dir) do if the directory ALREADY exists?\n(ماذا تفعل دالة Files.createDirectories(Path) إذا كان المجلد موجوداً بالفعل؟)",
                    "options": [
                              "It throws a FileAlreadyExistsException.",
                              "It succeeds silently and does NOT throw an exception.",
                              "It deletes the directory and recreates it empty.",
                              "It throws an IllegalArgumentException."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Files.createDirectories() is idempotent: if the directory already exists, it does nothing and returns the path cleanly without throwing an exception. (تتميز createDirectories بأنها لا ترمي استثناءً إذا كان المجلد موجوداً وتعتبر العملية ناجحة)."
          },
          {
                    "id": "q6",
                    "question": "What is the correct, safe pattern for creating a file inside potentially nonexistent nested directories?\n(ما هو النمط الآمن والصحيح لإنشاء ملف داخل مجلدات متداخلة قد لا تكون موجودة؟)",
                    "options": [
                              "File f = new File(\"a/b/c/data.txt\"); f.createNewFile();",
                              "File f = new File(\"a/b/c/data.txt\"); if (f.getParentFile() != null) { f.getParentFile().mkdirs(); } f.createNewFile();",
                              "File f = new File(\"a/b/c/data.txt\"); f.mkdir(); f.createNewFile();",
                              "File f = new File(\"a/b/c/data.txt\"); f.delete(); f.createNewFile();"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Calling f.getParentFile().mkdirs() ensures that all required parent folders exist before calling f.createNewFile(), preventing IOException. (استدعاء getParentFile().mkdirs() يضمن إنشاء كافة المجلدات الحاضنة أولاً قبل إنشاء الملف)."
          },
          {
                    "id": "q7",
                    "question": "Why is the classic idiom 'if (!file.exists()) file.createNewFile();' considered flawed in concurrent or multi-process systems?\n(لماذا يعتبر الفحص ثم الإنشاء if (!file.exists()) createNewFile نمطاً معيباً في الأنظمة المتزامنة؟)",
                    "options": [
                              "Because it triggers a Time-of-Check to Time-of-Use (TOCTOU) race condition where another thread/process could create the file between exists() and createNewFile().",
                              "Because file.exists() deletes the file.",
                              "Because createNewFile() requires exists() to be true.",
                              "Because the JVM compiler optimizes away the if statement."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! This is a classic race condition (TOCTOU). createNewFile() and Files.createFile() are already atomic at the OS kernel level. You should directly call createNewFile() and check its return value instead of checking exists() beforehand. (هذا يسبب سباق تزامن TOCTOU؛ إذ قد يُنشئ تطبيق آخر الملف بين الفحص والإنشاء، والصحيح استدعاء الإنشاء الذري مباشرة)."
          },
          {
                    "id": "q8",
                    "question": "How does Files.createTempFile(\"app_\", \".tmp\") configure the newly created temporary file by default on POSIX-compliant systems (Linux/macOS)?\n(كيف تهيئ دالة createTempFile الملف المؤقت الجديد من حيث الصلاحيات على أنظمة لينكس؟)",
                    "options": [
                              "It gives public read and write access to all users (0666).",
                              "It restricts read and write permissions exclusively to the current user (0600) for security.",
                              "It marks the file as executable.",
                              "It stores the file in CPU registers instead of disk."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! For security, Files.createTempFile() sets strict POSIX permissions (read/write only for the owner, 0600), preventing other local system users from snooping on sensitive temporary data. (لأسباب أمنية، تضبط createTempFile الصلاحيات للمستخدم الحالي فقط 0600 لمنع بقية المستخدمين من التجسس على البيانات المؤقتة)."
          },
          {
                    "id": "q9",
                    "question": "What is the difference between Files.createSymbolicLink() and Files.createLink() in Java NIO?\n(ما الفرق بين دالتي createSymbolicLink و createLink في جافا؟)",
                    "options": [
                              "createSymbolicLink creates a soft link (shortcut pointing to a pathname), while createLink creates a hard link (another directory entry pointing to the same inode/file contents).",
                              "createSymbolicLink is for files, while createLink is only for URLs.",
                              "createSymbolicLink copies the file, while createLink moves it.",
                              "They both create standard ZIP files."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! createSymbolicLink creates a soft/symbolic link containing a target path. createLink creates a hard link pointing to the exact same physical storage data on the volume. (الرابط الرمزي Symbolic link هو مؤشر لاسم المسار، بينما الرابط الصلب Hard link هو مدخل إضافي لنفس البيانات الفيزيائية على القرص)."
          },
          {
                    "id": "q10",
                    "question": "What happens when you instantiate a FileOutputStream pointing to a file that does NOT exist yet?\nOutputStream out = new FileOutputStream(\"output.txt\");\n(ماذا يحدث عند إنشاء FileOutputStream لملف غير موجود بعد؟)",
                    "options": [
                              "It throws a FileNotFoundException immediately.",
                              "It automatically creates the file output.txt if the directory exists and has write permissions.",
                              "It hangs waiting for the user to create the file manually.",
                              "It writes data directly to RAM without creating a file."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Opening a FileOutputStream or FileWriter automatically creates the destination file if it doesn't exist (provided parent directories exist and permissions allow). (فتح دفق الإخراج ينشئ الملف تلقائياً إذا لم يكن موجوداً بشرط توفر المجلد والصلاحيات)."
          },
          {
                    "id": "q11",
                    "question": "Which POSIX file attribute string creates a file with owner read/write permissions only ('rw-------') using Files.createFile()?\n(أي معامل يضبط صلاحيات القراءة والكتابة للمالك فقط عند إنشاء الملف عبر Files.createFile؟)",
                    "options": [
                              "PosixFilePermissions.asFileAttribute(PosixFilePermissions.fromString(\"rw-------\"))",
                              "\"chmod 777\"",
                              "StandardOpenOption.PRIVATE",
                              "FilePermission.RESTRICTED"
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! Java NIO uses PosixFilePermissions.fromString(\"rw-------\") passed via asFileAttribute(...) to atomically assign POSIX file permissions upon creation. (يُستخدم PosixFilePermissions.fromString(\"rw-------\") لضبط صلاحيات المالك الذرية عند الإنشاء)."
          },
          {
                    "id": "q12",
                    "question": "What exception is thrown on Windows if you attempt to create a file containing illegal characters such as 'report:2026?.txt'?\n(ما الاستثناء الذي يُرمى في ويندوز عند محاولة إنشاء ملف يحتوي على أحرف محظورة مثل النقطتين أو علامة الاستفهام؟)",
                    "options": [
                              "java.io.IOException or java.nio.file.InvalidPathException",
                              "java.lang.NullPointerException",
                              "java.lang.ArithmeticException",
                              "java.lang.ClassNotFoundException"
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! Characters like ':', '*', '?', '<', '>', '|' are strictly forbidden in Windows file systems; attempting to create such files throws an IOException or InvalidPathException. (رموز مثل : و ? محظورة في أسماء ملفات ويندوز، ومحاولة إنشائها ترمي InvalidPathException أو IOException)."
          },
          {
                    "id": "q13",
                    "question": "What happens when using Files.createTempDirectory(\"cache_\")?\n(ما الذي تفعله دالة Files.createTempDirectory(\"cache_\")؟)",
                    "options": [
                              "It creates a new directory in the default temporary-file directory with the specified prefix followed by unique random characters.",
                              "It clears all files in the C:\\Temp directory.",
                              "It creates a permanent system partition.",
                              "It throws an exception unless run as root/administrator."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! Files.createTempDirectory() creates a unique, dedicated folder inside the system temp directory with a name like 'cache_12839487239' for temporary process storage. (تنشئ مجلداً مؤقتاً جديداً في مجلد النظام المؤقت باسم يبدأ بالبادئة المحددة متبوعاً بأرقام عشوائية فريدة)."
          },
          {
                    "id": "q14",
                    "question": "What is the result of running this code on a read-only filesystem or in a folder without write permissions?\nPath p = Path.of(\"/restricted/newfile.txt\");\nFiles.createFile(p);\n(ما نتيجة تنفيذ هذا الكود في مجلد للقراءة فقط أو بدون صلاحيات كتابة؟)",
                    "options": [
                              "It creates the file anyway with 0-byte size.",
                              "It throws java.nio.file.AccessDeniedException.",
                              "It waits until permissions are granted.",
                              "It returns null."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! If the process lacks write permissions for the destination directory, Files.createFile() throws a java.nio.file.AccessDeniedException. (إذا كان المجلد يفتقد لصلاحية الكتابة، ترمي دالة createFile استثناء AccessDeniedException)."
          },
          {
                    "id": "q15",
                    "question": "In Java 11+, which method can be used to atomically create and write initial text to a new file in a single line, failing if the file already exists?\n(في جافا 11، ما الدالة التي تنشئ ملفاً جديداً وتكتب فيه نصاً أولياً في سطر واحد، وتفشل إذا كان الملف موجوداً بالفعل؟)",
                    "options": [
                              "Files.writeString(path, \"Initial\", StandardOpenOption.CREATE_NEW)",
                              "Files.createAndWrite(path, \"Initial\")",
                              "new FileWriter(path).create(\"Initial\")",
                              "File.create(\"Initial\", path)"
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! Files.writeString(path, \"content\", StandardOpenOption.CREATE_NEW) creates the file and writes the string atomically, throwing FileAlreadyExistsException if the file already exists. (دالة Files.writeString مع الخيار CREATE_NEW تنشئ الملف وتكتب فيه مع ضمان عدم الكتابة فوق ملف موجود مسبقاً)."
          }
]
        }
      ]
    }
  ];
})();
