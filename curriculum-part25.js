/**
 * Java Curriculum Module - Part 25
 * Topics:
 * 49. Java Delete Files
 * 50. Java I/O Streams
 * 
 * 100% Offline, Pure JavaScript. Complete educational content with full bilingual (English & Arabic) explanations.
 */

(function () {
  'use strict';

  window.JAVA_TOPICS_PART25 = [
    /* ==========================================================================
       TOPIC 49: Java Delete Files
       ========================================================================== */
    {
      id: "java-delete-files",
      title: "49. Java Delete Files",
      description: "Complete Guide to File & Directory Deletion in Java: File.delete(), File.deleteOnExit(), Files.delete(), Files.deleteIfExists(), DirectoryNotEmptyException handling, recursive folder tree deletion using Files.walkFileTree & SimpleFileVisitor, and secure shredding.",
      lessons: [
        {
          id: "java-delete-files-mastery",
          title: "Complete Guide to Deleting Files & Directories",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "Java File & Directory Deletion Mechanics (آليات حذف الملفات والمجلدات في جافا)"
            },
            {
              type: "paragraph",
              text: "Deleting files and directories safely is a critical operational task in Java. The legacy API offers 'File.delete()' (which returns a boolean) and 'File.deleteOnExit()' (which registers a JVM shutdown hook). The modern NIO.2 API introduces 'Files.delete(Path)' (which throws descriptive exceptions like NoSuchFileException or DirectoryNotEmptyException) and 'Files.deleteIfExists(Path)' (which returns a boolean without throwing if missing). Furthermore, deleting non-empty directories requires recursive post-order tree traversal, best implemented using 'Files.walkFileTree' with 'SimpleFileVisitor'."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "يُعد حذف الملفات والمجلدات بأمان وبشكل مؤكد من العمليات التشغيلية الهامة في جافا. توفر الواجهة الكلاسيكية دالة 'File.delete()' (ترجع قيمة boolean) ودالة 'File.deleteOnExit()' (لحذف الملفات المؤقتة تلقائياً عند إغلاق البرنامج). أما في NIO.2، فنجد دالة 'Files.delete' (التي ترمي استثناءات دقيقة مثل DirectoryNotEmptyException) ودالة 'Files.deleteIfExists' (التي تتجنب الأخطاء إن كان الملف غير موجود). وإذا كان المجلد غير فارغ، تفشل دوال الحذف المباشرة، مما يتطلب خوارزمية حذف تكراري عكسي عبر Files.walkFileTree."
            },
            {
              type: "paragraph",
              text: "Core Principles: 1) Non-Empty Folders: Operating systems refuse to delete folders containing files; children must be deleted first; 2) Atomic Exceptions vs Silent Booleans: Prefer Files.delete() over File.delete() to know exact error causes (permissions vs in-use locks); 3) Temporary Cleanup: deleteOnExit() works on normal termination but won't run during sudden SIGKILL."
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
              text: "Example 1: Classic Deletion with File.delete() (المثال 1: الحذف الكلاسيكي باستخدام File.delete)"
            },
            {
              type: "paragraph",
              text: "Using the boolean-returning File.delete() method."
            },
            {
              type: "code",
              language: "java",
              filename: "ClassicFileDeleteDemo.java",
              code: `import java.io.File;

public class ClassicFileDeleteDemo {
    public static void main(String[] args) {
        File file = new File("temporary_cache.txt");

        // file.delete() returns true on success, false on failure
        boolean deleted = file.delete();
        if (deleted) {
            System.out.println("File deleted successfully from disk.");
        } else {
            System.out.println("Could not delete file (file doesn't exist or is locked/permission denied).");
        }
    }
}`,
              output: `Could not delete file (file doesn't exist or is locked/permission denied).`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "File.delete() returns false on failure without telling you why (missing file, permission denied, or locked by another process)."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "تُرجع دالة File.delete القيمة false عند الفشل دون إيضاح السبب الحقيقي (سواء كان عدم الوجود، أو نقص الصلاحيات، أو قفل الملف من برنامج آخر)."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Modern Deletion with Files.delete() (المثال 2: الحذف الدقيق بـ Files.delete)"
            },
            {
              type: "paragraph",
              text: "Using NIO.2 Files.delete() which throws informative exceptions on failure."
            },
            {
              type: "code",
              language: "java",
              filename: "NioDeleteDemo.java",
              code: `import java.io.IOException;
import java.nio.file.DirectoryNotEmptyException;
import java.nio.file.Files;
import java.nio.file.NoSuchFileException;
import java.nio.file.Path;
import java.nio.file.Paths;

public class NioDeleteDemo {
    public static void deleteSafely(Path path) {
        try {
            Files.delete(path);
            System.out.println("Successfully deleted: " + path);
        } catch (NoSuchFileException e) {
            System.err.println("Failure: File does not exist -> " + e.getFile());
        } catch (DirectoryNotEmptyException e) {
            System.err.println("Failure: Cannot delete folder because it is not empty!");
        } catch (IOException e) {
            System.err.println("Failure: I/O or permission error -> " + e.getMessage());
        }
    }

    public static void main(String[] args) {
        deleteSafely(Paths.get("missing_file.log"));
    }
}`,
              output: `Failure: File does not exist -> missing_file.log`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "Files.delete() throws explicit exceptions, allowing your application to respond properly to missing files vs non-empty directories."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "ترمي Files.delete استثناءات دقيقة تتيح لتطبيقك معالجة كل سيناريو خطأ على حدة بدقة واحترافية."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Idempotent Deletion with Files.deleteIfExists() (المثال 3: الحذف الآمن دون استثناءات deleteIfExists)"
            },
            {
              type: "paragraph",
              text: "Deleting a file without throwing NoSuchFileException if it's already gone."
            },
            {
              type: "code",
              language: "java",
              filename: "DeleteIfExistsDemo.java",
              code: `import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class DeleteIfExistsDemo {
    public static void main(String[] args) {
        Path path = Paths.get("staging_data.tmp");

        try {
            // Returns true if file existed and was deleted, false if it didn't exist
            boolean wasDeleted = Files.deleteIfExists(path);
            System.out.println("Was file present and deleted? " + wasDeleted);

            // Calling it a second time is safe and returns false
            boolean secondAttempt = Files.deleteIfExists(path);
            System.out.println("Second attempt result: " + secondAttempt);
        } catch (IOException e) {
            System.out.println("Permission or I/O error: " + e.getMessage());
        }
    }
}`,
              output: `Was file present and deleted? false
Second attempt result: false`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "Files.deleteIfExists() is the preferred pattern for cleanup routines where the file might or might not have been created."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "تعتبر deleteIfExists النمط الأفضل لعمليات التنظيف الدورية، حيث لا ترمي خطأ إذا كان الملف محذوفاً بالفعل."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Registering Deletion on JVM Exit (deleteOnExit()) (المثال 4: جدولة الحذف التلقائي عند إغلاق البرنامج deleteOnExit)"
            },
            {
              type: "paragraph",
              text: "Marking scratchpad files for automatic removal when the virtual machine terminates."
            },
            {
              type: "code",
              language: "java",
              filename: "DeleteOnExitDemo.java",
              code: `import java.io.File;
import java.io.IOException;

public class DeleteOnExitDemo {
    public static void main(String[] args) throws IOException {
        File scratch = File.createTempFile("session_token_", ".tmp");
        System.out.println("Created temporary scratch file: " + scratch.getAbsolutePath());

        // Register with JVM shutdown hook
        scratch.deleteOnExit();
        System.out.println("Registered for automatic deletion upon JVM termination.");

        // File remains usable during program execution
        System.out.println("Scratch file exists now: " + scratch.exists());
    }
}`,
              output: `Created temporary scratch file: /tmp/session_token_1829381203.tmp
Registered for automatic deletion upon JVM termination.
Scratch file exists now: true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "deleteOnExit() schedules the file for deletion when the JVM shuts down normally (in reverse order of registration)."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "تسجل deleteOnExit الملف ليتم حذفه تلقائياً بمجرد إغلاق برنامج جافا إغلاقاً طبيعياً."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Why Deleting Non-Empty Folders Fails (المثال 5: سبب فشل حذف المجلدات غير الفارغة)"
            },
            {
              type: "paragraph",
              text: "Demonstrating that operating systems block direct deletion of directories that contain files or subfolders."
            },
            {
              type: "code",
              language: "java",
              filename: "NonEmptyFolderDemo.java",
              code: `import java.io.File;
import java.io.IOException;

public class NonEmptyFolderDemo {
    public static void main(String[] args) throws IOException {
        File folder = new File("my_folder");
        folder.mkdir();

        File childFile = new File(folder, "data.txt");
        childFile.createNewFile();

        // Attempting to delete directory while childFile exists inside it
        boolean deleted = folder.delete();
        System.out.println("Direct folder.delete() on non-empty folder succeeded? " + deleted);

        // Cleanup child first
        childFile.delete();
        boolean folderDeletedNow = folder.delete();
        System.out.println("Folder deleted after clearing children? " + folderDeletedNow);
    }
}`,
              output: `Direct folder.delete() on non-empty folder succeeded? false
Folder deleted after clearing children? true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "The underlying OS refuses to delete a folder if it contains any child files or subdirectories."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "يرفض نظام التشغيل تماماً حذف أي مجلد يحتوي على ملفات داخله؛ لذا يجب حذف الملفات الداخلية أولاً."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Recursive Directory Deletion with Files.walk() (المثال 6: الحذف التكراري الكامل للمجلد بـ Files.walk)"
            },
            {
              type: "paragraph",
              text: "Sorting paths in reverse order so children are deleted before parents."
            },
            {
              type: "code",
              language: "java",
              filename: "RecursiveDeleteStreamDemo.java",
              code: `import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Comparator;
import java.util.stream.Stream;

public class RecursiveDeleteStreamDemo {
    public static void deleteTree(Path rootPath) throws IOException {
        if (!Files.exists(rootPath)) return;

        // Walk all files and directories, sort in REVERSE order so deepest children come first!
        try (Stream<Path> walk = Files.walk(rootPath)) {
            walk.sorted(Comparator.reverseOrder())
                .forEach(path -> {
                    try {
                        Files.delete(path);
                        System.out.println("Deleted: " + path);
                    } catch (IOException e) {
                        System.err.println("Could not delete " + path + ": " + e.getMessage());
                    }
                });
        }
    }

    public static void main(String[] args) {
        System.out.println("Recursive deletion algorithm demonstration using reverse comparator sorting.");
    }
}`,
              output: `Recursive deletion algorithm demonstration using reverse comparator sorting.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "Sorting by Comparator.reverseOrder() ensures that deep files are deleted before their enclosing folders, preventing DirectoryNotEmptyException."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "ترتيب المسارات بالمعكوس يضمن حذف الملفات العميقة أولاً قبل المجلد الحاوي لها؛ مما يمنع حدوث DirectoryNotEmptyException."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Robust Directory Tree Deletion with SimpleFileVisitor (المثال 7: الحذف التكراري الاحترافي بـ SimpleFileVisitor)"
            },
            {
              type: "paragraph",
              text: "The gold standard for production: using Files.walkFileTree and postVisitDirectory."
            },
            {
              type: "code",
              language: "java",
              filename: "FileVisitorDeleteDemo.java",
              code: `import java.io.IOException;
import java.nio.file.*;
import java.nio.file.attribute.BasicFileAttributes;

public class FileVisitorDeleteDemo {
    public static void deleteDirectoryTree(Path root) throws IOException {
        Files.walkFileTree(root, new SimpleFileVisitor<Path>() {
            // Delete each file as we visit it
            @Override
            public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException {
                Files.delete(file);
                System.out.println("Deleted File: " + file.getFileName());
                return FileVisitResult.CONTINUE;
            }

            // Delete the directory AFTER all its children have been deleted (Post-Order)
            @Override
            public FileVisitResult postVisitDirectory(Path dir, IOException exc) throws IOException {
                if (exc != null) throw exc;
                Files.delete(dir);
                System.out.println("Deleted Directory: " + dir.getFileName());
                return FileVisitResult.CONTINUE;
            }
        });
    }

    public static void main(String[] args) {
        System.out.println("Files.walkFileTree ensures proper post-order directory deletion.");
    }
}`,
              output: `Files.walkFileTree ensures proper post-order directory deletion.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "SimpleFileVisitor provides guaranteed post-order traversal (postVisitDirectory), cleanly deleting empty folders after all files inside are gone."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "يوفر SimpleFileVisitor نمط المسح البعدي (Post-Order) الذي يضمن حذف المجلد فور فراغه من كل محتوياته."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Secure File Shredding Before Deletion (المثال 8: الإتلاف الأمني للملفات قبل حذفها)"
            },
            {
              type: "paragraph",
              text: "Overwriting sensitive contents with zeros or random bytes to prevent forensic data recovery."
            },
            {
              type: "code",
              language: "java",
              filename: "SecureShredDemo.java",
              code: `import java.io.RandomAccessFile;
import java.io.File;
import java.io.IOException;
import java.security.SecureRandom;

public class SecureShredDemo {
    public static void secureShred(File file) throws IOException {
        if (!file.exists()) return;

        long length = file.length();
        SecureRandom random = new SecureRandom();
        byte[] junk = new byte[4096];

        // 1. Overwrite entire file with cryptographically secure random bytes
        try (RandomAccessFile raf = new RandomAccessFile(file, "rws")) {
            long written = 0;
            while (written < length) {
                random.nextBytes(junk);
                int toWrite = (int) Math.min(junk.length, length - written);
                raf.write(junk, 0, toWrite);
                written += toWrite;
            }
        }
        System.out.println("File overwritten with random noise (" + length + " bytes).");

        // 2. Delete the zeroed/randomized file
        boolean deleted = file.delete();
        System.out.println("Shredded file deleted from filesystem: " + deleted);
    }

    public static void main(String[] args) {
        System.out.println("Secure shredding pattern prevents un-delete recovery of confidential tokens.");
    }
}`,
              output: `Secure shredding pattern prevents un-delete recovery of confidential tokens.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "Standard deletion only removes filesystem pointers; secure shredding overwrites physical sectors before deletion."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "الحذف العادي يزيل مؤشرات الملف فقط؛ بينما يكتب الإتلاف الأمني بايتات عشوائية فوق البيانات الأصلية قبل الحذف."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Cleaning Up Files by Age (TTL Purge) (المثال 9: تنظيف الملفات المنتهية الصلاحية بحسب العمر)"
            },
            {
              type: "paragraph",
              text: "Deleting log files older than a specified duration (e.g. 7 days)."
            },
            {
              type: "code",
              language: "java",
              filename: "TtlPurgeDemo.java",
              code: `import java.io.File;
import java.time.Instant;
import java.time.temporal.ChronoUnit;

public class TtlPurgeDemo {
    public static void purgeOldLogs(File logDir, int maxDays) {
        File[] files = logDir.listFiles();
        if (files == null) return;

        long cutoffMillis = Instant.now().minus(maxDays, ChronoUnit.DAYS).toEpochMilli();

        for (File f : files) {
            if (f.isFile() && f.lastModified() < cutoffMillis) {
                boolean deleted = f.delete();
                System.out.println("Purged expired log: " + f.getName() + " -> " + deleted);
            }
        }
    }

    public static void main(String[] args) {
        System.out.println("TTL purge routine checks lastModified() against retention thresholds.");
    }
}`,
              output: `TTL purge routine checks lastModified() against retention thresholds.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "Comparing file.lastModified() against an Instant cutoff enables automated disk capacity recycling."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "مقارنة تاريخ آخر تعديل بحد زمني أقصى يتيح جدولة عمليات التنظيف الدوري للملفات القديمة تلقائياً."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Deleting Files Matching a Regex Pattern (المثال 10: حذف الملفات المطابقة لنمط تعبير نمطي)"
            },
            {
              type: "paragraph",
              text: "Purging temporary or backup files matching a specific naming pattern."
            },
            {
              type: "code",
              language: "java",
              filename: "RegexDeleteDemo.java",
              code: `import java.io.File;
import java.util.regex.Pattern;

public class RegexDeleteDemo {
    public static void deletePattern(File folder, String regex) {
        Pattern pattern = Pattern.compile(regex);
        File[] matches = folder.listFiles((dir, name) -> pattern.matcher(name).matches());

        if (matches != null) {
            System.out.println("Found " + matches.length + " files matching pattern: " + regex);
            for (File file : matches) {
                boolean ok = file.delete();
                System.out.println(" -> Deleted " + file.getName() + ": " + ok);
            }
        }
    }

    public static void main(String[] args) {
        System.out.println("Regex deletion targets specific files like '.*\\\\.(bak|tmp|swp)'.");
    }
}`,
              output: `Regex deletion targets specific files like '.*\\.(bak|tmp|swp)'.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "FilenameFilter with regular expressions enables pinpoint targeting of backup files (.bak, .tmp, .swp)."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "يتيح استخدام التعبيرات النمطية مع FilenameFilter استهداف وحذف ملفات النسخ المؤقتة بدقة تامة."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Enterprise Safe Trash Bin & Recovery Architecture (المثال 11: معمارية سلة المهملات المؤسسية الآمنة)"
            },
            {
              type: "paragraph",
              text: "Production resilience: soft-deleting files to an isolated quarantine archive before permanent purge."
            },
            {
              type: "code",
              language: "java",
              filename: "SafeTrashBinDemo.java",
              code: `import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.Instant;

public class SafeTrashBinDemo {
    static class EnterpriseTrashBin {
        private final Path trashRoot = Paths.get(".trash_archive");

        public EnterpriseTrashBin() throws IOException {
            Files.createDirectories(trashRoot);
        }

        public void softDelete(Path targetFile) throws IOException {
            if (!Files.exists(targetFile)) {
                System.out.println("File does not exist: " + targetFile);
                return;
            }
            String timestamp = String.valueOf(Instant.now().getEpochSecond());
            Path archivedPath = trashRoot.resolve(targetFile.getFileName() + "." + timestamp + ".deleted");

            // Atomic move to trash instead of instant permanent deletion
            Files.move(targetFile, archivedPath, StandardCopyOption.REPLACE_EXISTING);
            System.out.println("Soft-deleted to trash archive: " + archivedPath);
        }
    }

    public static void main(String[] args) {
        System.out.println("Enterprise soft-delete architecture allows recovery window before permanent destruction.");
    }
}`,
              output: `Enterprise soft-delete architecture allows recovery window before permanent destruction.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "Enterprise systems prefer soft-deletion (moving to a quarantine directory) over instant permanent deletion, providing a disaster recovery window."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "تفضل الأنظمة المؤسسية الحذف اللطيف (Soft Delete) بنقل الملف لسلة المحذوفات المؤقتة لإتاحة فرصة استرجاعه."
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
                "Mistake 1: Trying to delete a non-empty directory with Files.delete() or File.delete(). Both will fail with DirectoryNotEmptyException or return false.",
                "خطأ 1: محاولة حذف مجلد يحتوي على ملفات مباشرة، مما يسبب فشل العملية أو رمي DirectoryNotEmptyException.",
                "Mistake 2: Relying on File.deleteOnExit() for mission-critical cleanup. If the process is terminated forcibly (SIGKILL or power loss), shutdown hooks do not run.",
                "خطأ 2: الاعتماد المطلق على deleteOnExit في مهام حرجة؛ فإذا أُغلق البرنامج بالقوة (SIGKILL) لن يُحذف الملف.",
                "Mistake 3: Ignoring the boolean return value of File.delete(). It can fail silently if the file is open or permissions are lacking."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Temporary Sandbox Purge Manager (التحدي العملي: مدير تنظيف البيئة المؤقتة)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Build a sandbox manager: 1) Class 'SandboxCleaner'; 2) Method 'cleanSandbox(List<String> filesToPurge)': iterate through file names; 3) If file ends with '.lock', refuse deletion and print warning; 4) Otherwise delete and report count; 5) In main(), test with sample files and print summary."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: صمم منظفاً للبيئة المؤقتة: 1) فئة SandboxCleaner؛ 2) دالة cleanSandbox تستقبل قائمة أسماء ملفات؛ 3) إذا انتهى الملف بـ '.lock' يُمنع حذفه مع طباعة تحذير؛ 4) غير ذلك يُحذف ويُحسب؛ 5) اختبر الكود في main واطبع ملخص الحذف."
            },
            {
              type: "code",
              language: "java",
              filename: "SandboxCleanerChallenge.java",
              code: `import java.util.Arrays;
import java.util.List;

public class SandboxCleanerChallenge {
    static class SandboxCleaner {
        public static void cleanSandbox(List<String> files) {
            int purged = 0;
            int protectedCount = 0;

            System.out.println("=== Starting Sandbox Cleanup ===");
            for (String f : files) {
                if (f.endsWith(".lock")) {
                    System.out.println("  [PROTECTED] Active lock file skipped: " + f);
                    protectedCount++;
                } else {
                    System.out.println("  [PURGED] Deleted scratch file: " + f);
                    purged++;
                }
            }
            System.out.println("=== Cleanup Finished ===");
            System.out.println("Total Purged:    " + purged);
            System.out.println("Total Protected: " + protectedCount);
        }
    }

    public static void main(String[] args) {
        List<String> testFiles = Arrays.asList(
                "temp_01.dat",
                "app.lock",
                "temp_02.dat",
                "database.lock",
                "cache.tmp"
        );

        SandboxCleaner.cleanSandbox(testFiles);
    }
}`,
              output: `=== Starting Sandbox Cleanup ===
  [PURGED] Deleted scratch file: temp_01.dat
  [PROTECTED] Active lock file skipped: app.lock
  [PURGED] Deleted scratch file: temp_02.dat
  [PROTECTED] Active lock file skipped: database.lock
  [PURGED] Deleted scratch file: cache.tmp
=== Cleanup Finished ===
Total Purged:    3
Total Protected: 2`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "The cleanup loop checks file protection rules (.lock) before proceeding with deletion, preserving active operational locks."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "تفحص خوارزمية التنظيف ملفات الأقفال المحمية لمنع حذفها بالخطأ مع حذف سائر الملفات المؤقتة."
            }
          ],
          quiz: [
          {
                    "id": "q1",
                    "question": "What does File.delete() return if the file does NOT exist?\nFile file = new File(\"missing.txt\");\nboolean deleted = file.delete();\n(ماذا تُرجع دالة File.delete() إذا كان الملف غير موجود أصلاً على القرص؟)",
                    "options": [
                              "It returns false (and does NOT throw any exception).",
                              "It throws a FileNotFoundException.",
                              "It returns true.",
                              "It throws a NullPointerException."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! File.delete() returns a boolean: true if deletion succeeded, false if deletion failed (such as when the file does not exist or permissions are denied). It never throws an exception. (تُرجع دالة delete القديمة false دون أن ترمي أي استثناء عند الفشل أو عدم وجود الملف)."
          },
          {
                    "id": "q2",
                    "question": "What is the key difference between Files.delete(path) and Files.deleteIfExists(path) in Java NIO?\n(ما الفرق الجوهري بين دالتي Files.delete و Files.deleteIfExists في NIO؟)",
                    "options": [
                              "Files.delete() throws NoSuchFileException if the file does not exist, whereas Files.deleteIfExists() simply returns false without throwing an exception.",
                              "Files.delete() only works for directories, while deleteIfExists() works for files.",
                              "Files.deleteIfExists() sends the file to the Recycle Bin.",
                              "There is no difference; they are exact aliases."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! Files.delete(path) expects the file to exist and throws NoSuchFileException if it is missing. Files.deleteIfExists(path) returns true if deleted and false if nonexistent. (ترمي delete استثناء NoSuchFileException إذا كان الملف مفقوداً، بينما deleteIfExists تُرجع false بأمان دون استثناء)."
          },
          {
                    "id": "q3",
                    "question": "What happens if you call Files.delete(path) on a directory that contains files or subfolders?\n(ماذا يحدث عند استدعاء Files.delete على مجلد يحتوي على ملفات أو مجلدات فرعية؟)",
                    "options": [
                              "It deletes the directory and all its contents recursively.",
                              "It throws a java.nio.file.DirectoryNotEmptyException.",
                              "It moves all child files to the root directory.",
                              "It renames the folder to 'trash'."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Neither File.delete() nor Files.delete() will delete a non-empty directory. In NIO, Files.delete() throws a DirectoryNotEmptyException. (لا تقبل جافا حذف أي مجلد غير فارغ وترمي DirectoryNotEmptyException لحماية البيانات)."
          },
          {
                    "id": "q4",
                    "question": "How do you correctly delete a non-empty directory tree using modern Java NIO Streams?\n(كيف تحذف شجرة مجلدات غير فارغة بشكل صحيح باستخدام Java NIO؟)",
                    "options": [
                              "try (Stream<Path> walk = Files.walk(dir)) {\n    walk.sorted(Comparator.reverseOrder())\n        .forEach(p -> { try { Files.delete(p); } catch (IOException e) { throw new UncheckedIOException(e); } });\n}",
                              "Files.delete(dir, StandardDeleteOption.RECURSIVE);",
                              "dir.toFile().deleteRecursive();",
                              "Files.walk(dir).forEach(Files::delete);"
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! Walking the tree and sorting with Comparator.reverseOrder() processes the deepest child files and subdirectories first before their parent directories, enabling clean deletion without DirectoryNotEmptyException. (ترتيب المسارات عكسياً يضمن حذف الملفات والمجلدات الأعمق أولاً قبل مجلداتها الحاضنة)."
          },
          {
                    "id": "q5",
                    "question": "What is a major risk of using File.deleteOnExit() in a long-running web application or microservice?\n(ما هو الخطر الكبير لاستخدام File.deleteOnExit() في خوادم وتطبيقات الويب طويلة التشغيل؟)",
                    "options": [
                              "It introduces a memory leak because path strings are accumulated in an internal JVM LinkedHashSet that can never be freed until the JVM terminates.",
                              "It shuts down the server immediately.",
                              "It deletes all files in the current folder.",
                              "It requires root privileges on Linux."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! File.deleteOnExit() registers paths in an internal JVM static set. In a server running for weeks, creating thousands of temp files causes an unbounded memory leak. Furthermore, it fails to run if the process is killed abruptly (SIGKILL). (تسجل الدالة المسارات في قائمة داخلية بالذاكرة لا تُمسح حتى توقف السيرفر مما يسبب تسريباً تراكمياً للذاكرة في التطبيقات الطويلة)."
          },
          {
                    "id": "q6",
                    "question": "What happens if a process attempts to delete a file that is still actively open by another stream on Microsoft Windows?\n(ماذا يحدث عند محاولة حذف ملف لا يزال مفتوحاً بواسطة دفق آخر في نظام ويندوز؟)",
                    "options": [
                              "On Windows, file locking semantics prevent the deletion, causing File.delete() to return false or Files.delete() to throw FileSystemException (\"The process cannot access the file because it is being used by another process\").",
                              "The file is deleted immediately and the other stream receives zeros.",
                              "The open stream is automatically terminated by the JVM.",
                              "The file is converted to a read-only shortcut."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! Windows enforces mandatory file locking on open file handles. Attempting to delete an unclosed file fails with an access/sharing violation. (يفرض نظام ويندوز قفلاً إلزامياً على الملفات المفتوحة؛ لذا تفشل محاولة الحذف ما لم يُغلق الدفق أولاً)."
          },
          {
                    "id": "q7",
                    "question": "How does deleting an open file behave on Unix/Linux systems compared to Windows?\n(كيف يتصرف حذف ملف مفتوح في أنظمة لينكس ويونكس مقارنة بويندوز؟)",
                    "options": [
                              "On Linux, the directory entry is unlinked immediately, but the file's disk blocks remain allocated and accessible to the open process until all open file descriptors to it are closed.",
                              "Linux crashes with a kernel panic.",
                              "Linux behaves identically to Windows.",
                              "Linux requires restarting the filesystem daemon."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! On POSIX systems, unlink removes the file name from the directory. The inode and disk data stay allocated until the last process holding an open descriptor closes it, at which point the OS frees the disk blocks. (في لينكس يُحذف اسم الملف من المجلد فوراً، لكن البيانات الفعلية على القرص تظل باقية ومتاحة للبرنامج حتى يغلق مقبض الملف)."
          },
          {
                    "id": "q8",
                    "question": "What happens when you delete a SYMBOLIC LINK using Files.delete(symlink)?\n(ماذا يحدث عند حذف رابط رمزي Symbolic Link باستخدام Files.delete؟)",
                    "options": [
                              "Only the symbolic link itself is deleted; the target file that the link points to remains completely untouched.",
                              "Both the symbolic link and the target file are deleted.",
                              "Only the target file is deleted, leaving a broken link.",
                              "It throws a NotLinkException."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! Deleting a symbolic link deletes only the pointer/link itself, never the original target file that it references. (حذف الرابط الرمزي يحذف الرابط أو الاختصار فقط ولا يمس الملف الأصلي المستهدف على الإطلاق)."
          },
          {
                    "id": "q9",
                    "question": "What does Files.deleteIfExists(path) return if the file was present and successfully deleted?\n(ماذا تُرجع دالة Files.deleteIfExists إذا كان الملف موجوداً وحُذف بنجاح؟)",
                    "options": [
                              "true",
                              "false",
                              "null",
                              "0"
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! Files.deleteIfExists() returns true if the file existed and was deleted, and false if the file did not exist. (تُرجع true في حال كان الملف موجوداً وحُذف بنجاح، و false إذا لم يكن موجوداً)."
          },
          {
                    "id": "q10",
                    "question": "Why might Files.delete(path) throw an AccessDeniedException on a file?\n(لماذا قد ترمي دالة Files.delete استثناء AccessDeniedException؟)",
                    "options": [
                              "Because the user running the Java application does not have write/delete permissions on the parent directory or the file itself is marked with read-only attributes.",
                              "Because the file is larger than 4 GB.",
                              "Because Java was compiled without the --enable-delete flag.",
                              "Because the file contains binary data."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! File deletion requires write permissions in the parent folder (on POSIX) or write privileges on the file itself (on Windows). If lacking, AccessDeniedException is thrown. (يتطلب حذف الملف صلاحيات كتابة في المجلد الحاضن أو صلاحيات تعديل، وغيابها يرمي AccessDeniedException)."
          },
          {
                    "id": "q11",
                    "question": "What will happen if a folder contains ONLY a hidden file (e.g. '.DS_Store' or '.gitignore') and you attempt to call Files.delete(folder)?\n(ماذا يحدث إذا كان المجلد يحتوي فقط على ملف مخفي واحد وحاولت حذف المجلد مباشرة؟)",
                    "options": [
                              "It throws DirectoryNotEmptyException because hidden files are still files; the directory is not empty.",
                              "It deletes the folder and silently ignores the hidden file.",
                              "It moves the hidden file to the root folder.",
                              "It converts the hidden file to a temporary file."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! Hidden files are real directory entries. The OS considers any folder with even a single hidden file non-empty, throwing DirectoryNotEmptyException. (الملفات المخفية هي ملفات حقيقية، ووجود أي ملف مخفي يجعل المجلد غير فارغ مما يمنع حذفه المباشر)."
          },
          {
                    "id": "q12",
                    "question": "What is the best practice for deleting temporary files created during request handling in a web service?\n(ما هي أفضل ممارسة لحذف الملفات المؤقتة التي تم إنشاؤها أثناء معالجة الطلب في خادم الويب؟)",
                    "options": [
                              "Use a try-finally block or AutoCloseable wrapper that invokes Files.deleteIfExists(tempFile) immediately after processing finishes.",
                              "Rely exclusively on File.deleteOnExit().",
                              "Wait for the server operating system to reboot every night.",
                              "Never delete them; disk space is cheap."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! Immediate cleanup in a finally block (or using a custom AutoCloseable) ensures temporary files are freed as soon as work is done, preventing disk exhaustion and memory leaks from deleteOnExit. (الحذف الفوري في كتلة finally أو AutoCloseable يضمن تحرير المساحة التخزينية فور الانتهاء دون انتظار توقف الخادم)."
          },
          {
                    "id": "q13",
                    "question": "What will this code print if target.txt does NOT exist?\nPath path = Path.of(\"target.txt\");\ntry {\n    Files.delete(path);\n    System.out.print(\"A \");\n} catch (NoSuchFileException e) {\n    System.out.print(\"B \");\n} finally {\n    System.out.print(\"C \");\n}\n(ماذا سيُطبع إذا كان target.txt غير موجود على القرص؟)",
                    "options": [
                              "B C ",
                              "A C ",
                              "B ",
                              "A B C "
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! Files.delete() throws NoSuchFileException when the file is missing, skipping 'A ', executing the catch block ('B '), and then executing the finally block ('C '). (ترمي دالة delete استثناء NoSuchFileException عند غياب الملف، فيتخطى A ويطبع B ثم C في finally)."
          },
          {
                    "id": "q14",
                    "question": "What happens if you iterate through a directory using File.listFiles() and delete the files inside the loop?\nFile dir = new File(\"my_folder\");\nfor (File f : dir.listFiles()) {\n    f.delete();\n}\n(ما الخطر الكامن في الكود السابق إذا كان my_folder غير موجود أو حدث خطأ في الصلاحيات؟)",
                    "options": [
                              "It throws a NullPointerException because dir.listFiles() returns null if the directory does not exist or access is denied.",
                              "It deletes the entire operating system.",
                              "It causes an infinite loop.",
                              "It converts all files to directories."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! If my_folder is missing or access is denied, dir.listFiles() returns null. Attempting to iterate over null in the enhanced for loop throws a NullPointerException. Always check for null before looping! (إذا كان المجلد غير موجود تُرجع listFiles القيمة null، واستخدامها في for يرمي NullPointerException ما لم يتم فحصها مسبقاً)."
          },
          {
                    "id": "q15",
                    "question": "Which method should you use if you want to delete a file only if it exists, without needing a try-catch block for missing files?\n(أي دالة يجب استخدامها لحذف ملف فقط إن وجد، دون الحاجة لكتلة try-catch للتعامل مع غياب الملف؟)",
                    "options": [
                              "Files.deleteIfExists(path)",
                              "Files.delete(path)",
                              "Files.remove(path)",
                              "Files.drop(path)"
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! Files.deleteIfExists(path) returns boolean false if the file is missing, avoiding the need to catch NoSuchFileException. (دالة Files.deleteIfExists تُرجع false ببساطة إذا لم يكن الملف موجوداً ولا تحتاج لإحاطتها بـ try-catch لالتقاط NoSuchFileException)."
          }
]
        }
      ]
    },

    /* ==========================================================================
       TOPIC 50: Java I/O Streams
       ========================================================================== */
    {
      id: "java-io-streams",
      title: "50. Java I/O Streams",
      description: "Mastering Java I/O Streams Architecture: Byte Streams (InputStream, OutputStream) vs Character Streams (Reader, Writer), Buffering (BufferedInputStream/OutputStream), Data Streams (DataInputStream/OutputStream), Object Serialization (ObjectInputStream/OutputStream), and the Decorator Pattern.",
      lessons: [
        {
          id: "java-io-streams-mastery",
          title: "Complete Guide to Java I/O Streams",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "Java I/O Streams: Architecture, Hierarchy, & Decorator Pattern (معمارية مجاري البيانات في جافا)"
            },
            {
              type: "paragraph",
              text: "Java I/O is built on the concept of 'Streams'—sequences of data flowing from a producer (source) to a consumer (destination). The architecture is divided into two fundamental branches: 1) Byte Streams (InputStream and OutputStream) handling 8-bit raw bytes for binary files, networks, and images; and 2) Character Streams (Reader and Writer) handling 16-bit Unicode characters with automatic character set encoding. Built upon these are processing wrappers that implement the Gang-of-Four Decorator Pattern, such as Buffering, Data serialization, and Object persistence."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "تعتمد منظومة الإدخال والإخراج في جافا على مفهوم 'مجاري البيانات' (Streams) كتدفق مستمر للبيانات من المصدر إلى الوجهة. تنقسم المنظومة إلى فرعين رئيسيين: الأول هو مجاري البايتات (InputStream و OutputStream) لمعالجة البايتات الثنائية (8 بت) للصور والشبكات؛ والثاني هو مجاري المحارف (Reader و Writer) لمعالجة حروف يونيكود (16 بت) مع التحويل التلقائي للترميز. وتعتمد هذه المكتبات على نمط التصميم المزين (Decorator Pattern) لتغليف المجاري وإضافة ميزات كالتخزين المؤقت وقراءة الأنواع الأولية وحفظ الكائنات."
            },
            {
              type: "paragraph",
              text: "Core Hierarchy: 1) Byte Streams: FileInputStream, FileOutputStream, ByteArrayInputStream, ByteArrayOutputStream; 2) Character Streams: FileReader, FileWriter, StringReader, StringWriter; 3) Decorators: BufferedInputStream, BufferedOutputStream, BufferedReader, BufferedWriter; 4) Primitive Data Streams: DataInputStream, DataOutputStream; 5) Object Serialization: ObjectInputStream, ObjectOutputStream."
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
              text: "Example 1: The Decorator Pattern in Java I/O (Chaining Streams) (المثال 1: نمط التصميم المُزيّن وسلسلة المجاري)"
            },
            {
              type: "paragraph",
              text: "Layering multiple streams to combine raw file reading, buffering, and primitive data parsing."
            },
            {
              type: "code",
              language: "java",
              filename: "DecoratorPatternDemo.java",
              code: `import java.io.*;

public class DecoratorPatternDemo {
    public static void main(String[] args) {
        String filename = "chained_stream.bin";

        // Decorator chaining for writing: FileOutputStream -> BufferedOutputStream -> DataOutputStream
        try (DataOutputStream dos = new DataOutputStream(
                new BufferedOutputStream(
                        new FileOutputStream(filename)))) {
            dos.writeInt(42);
            dos.writeDouble(3.14159);
            dos.writeUTF("Decorator Pattern in Java I/O");
            System.out.println("Wrote primitives through chained decorator streams.");
        } catch (IOException e) {
            System.out.println("Write error: " + e.getMessage());
        }

        // Decorator chaining for reading: FileInputStream -> BufferedInputStream -> DataInputStream
        try (DataInputStream dis = new DataInputStream(
                new BufferedInputStream(
                        new FileInputStream(filename)))) {
            int i = dis.readInt();
            double d = dis.readDouble();
            String s = dis.readUTF();
            System.out.printf("Read back: int=%d, double=%.5f, string='%s'%n", i, d, s);
        } catch (IOException e) {
            System.out.println("Read error: " + e.getMessage());
        }
    }
}`,
              output: `Wrote primitives through chained decorator streams.
Read back: int=42, double=3.14159, string='Decorator Pattern in Java I/O'`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "The Decorator Pattern lets you chain functionality: FileOutputStream writes bytes, BufferedOutputStream batches them in memory, and DataOutputStream provides writeInt/writeDouble."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "يتيح نمط Decorator تركيب القدرات: FileOutputStream يكتب على القرص، وBuffered يجمع البيانات في الرام، وDataOutputStream يتيح كتابة الأعداد مباشرة."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: In-Memory Byte Streams with ByteArrayOutputStream (المثال 2: مجاري البايتات في الذاكرة ByteArrayOutputStream)"
            },
            {
              type: "paragraph",
              text: "Writing binary data directly to an in-memory byte buffer without touching the physical disk."
            },
            {
              type: "code",
              language: "java",
              filename: "ByteArrayStreamsDemo.java",
              code: `import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

public class ByteArrayStreamsDemo {
    public static void main(String[] args) throws IOException {
        byte[] payload;

        // Writing into memory buffer
        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            baos.write("Header: 0xDEADBEEF; ".getBytes());
            baos.write("Status: OK;".getBytes());
            payload = baos.toByteArray();
        }

        System.out.println("Total bytes in memory buffer: " + payload.length);

        // Reading back from memory buffer
        try (ByteArrayInputStream bais = new ByteArrayInputStream(payload)) {
            int b;
            System.out.print("Read from memory stream: ");
            while ((b = bais.read()) != -1) {
                System.out.print((char) b);
            }
            System.out.println();
        }
    }
}`,
              output: `Total bytes in memory buffer: 31
Read from memory stream: Header: 0xDEADBEEF; Status: OK;`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "ByteArrayOutputStream allows building dynamic binary payloads in RAM before sending them over a network or writing to disk."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "يتيح ByteArrayOutputStream تشكيل الحزم الثنائية داخل الذاكرة (RAM) بمرونة وسرعة فائقة قبل إرسالها للشبكة."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Buffered Byte Streams Performance (BufferedInputStream & BufferedOutputStream) (المثال 3: مضاعفة سرعة القراءة والكتابة بالبفر)"
            },
            {
              type: "paragraph",
              text: "Measuring the massive speedup gained by wrapping unbuffered file streams with 8 KB memory buffers."
            },
            {
              type: "code",
              language: "java",
              filename: "BufferedPerformanceDemo.java",
              code: `import java.io.*;

public class BufferedPerformanceDemo {
    public static void main(String[] args) throws IOException {
        File temp = File.createTempFile("speed_test_", ".bin");
        temp.deleteOnExit();
        int iterations = 100_000;

        // 1. Unbuffered single-byte writes
        long startUnbuf = System.currentTimeMillis();
        try (FileOutputStream fos = new FileOutputStream(temp)) {
            for (int i = 0; i < iterations; i++) {
                fos.write(65); // 'A'
            }
        }
        long timeUnbuf = System.currentTimeMillis() - startUnbuf;

        // 2. Buffered writes
        long startBuf = System.currentTimeMillis();
        try (BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(temp))) {
            for (int i = 0; i < iterations; i++) {
                bos.write(65);
            }
        }
        long timeBuf = System.currentTimeMillis() - startBuf;

        System.out.println("Unbuffered Write Time: " + timeUnbuf + " ms");
        System.out.println("Buffered Write Time:   " + timeBuf + " ms");
        System.out.println("Buffered speedup: " + (timeUnbuf / Math.max(1, timeBuf)) + "x faster!");
    }
}`,
              output: `Unbuffered Write Time: 185 ms
Buffered Write Time:   12 ms
Buffered speedup: 15x faster!`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "Buffering eliminates individual OS disk calls by holding bytes in an 8 KB internal array, making writes 10x–50x faster."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "يقلل التخزين المؤقت (Buffering) استدعاءات القرص البطيئة ويجمعها في مصفوفة 8KB بالرام؛ مما يجعل العمليات أسرع بعشرات المرات."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Data Streams for Binary Primitives (DataInputStream & DataOutputStream) (المثال 4: كتابة وقراءة الأنواع الأولية ثنائياً)"
            },
            {
              type: "paragraph",
              text: "Writing portable, machine-independent binary representations of boolean, int, long, and double."
            },
            {
              type: "code",
              language: "java",
              filename: "DataStreamsDemo.java",
              code: `import java.io.*;

public class DataStreamsDemo {
    public static void main(String[] args) {
        String dataFile = "game_save.dat";

        // Writing primitive types in portable binary format
        try (DataOutputStream dos = new DataOutputStream(new FileOutputStream(dataFile))) {
            dos.writeUTF("Commander Shepard"); // String with 2-byte length prefix
            dos.writeInt(85);                  // 4 bytes
            dos.writeDouble(9482.50);           // 8 bytes
            dos.writeBoolean(true);             // 1 byte
            System.out.println("Game state saved to binary stream.");
        } catch (IOException e) {
            System.out.println("Save error: " + e.getMessage());
        }

        // Reading primitives in the exact same order
        try (DataInputStream dis = new DataInputStream(new FileInputStream(dataFile))) {
            String name = dis.readUTF();
            int level = dis.readInt();
            double credits = dis.readDouble();
            boolean active = dis.readBoolean();

            System.out.printf("Loaded: Player='%s' | Level=%d | Credits=%.2f | Active=%b%n",
                    name, level, credits, active);
        } catch (IOException e) {
            System.out.println("Load error: " + e.getMessage());
        }
    }
}`,
              output: `Game state saved to binary stream.
Loaded: Player='Commander Shepard' | Level=85 | Credits=9482.50 | Active=true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "DataInputStream and DataOutputStream write values in Big-Endian binary format, ensuring identical behavior across different CPU architectures."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "تكتب مجاري البيانات القيم الأولية بنظام Big-Endian الموحد لتعمل بنفس الدقة عبر جميع معالجات الحواسيب."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Object Serialization (ObjectOutputStream & Serializable) (المثال 5: تسلسل وحفظ الكائنات ObjectOutputStream)"
            },
            {
              type: "paragraph",
              text: "Serializing entire Java object graphs into a binary stream using java.io.Serializable."
            },
            {
              type: "code",
              language: "java",
              filename: "ObjectSerializationDemo.java",
              code: `import java.io.*;

public class ObjectSerializationDemo {
    // Implementing Serializable marks the class eligible for JVM serialization
    static class UserSession implements Serializable {
        private static final long serialVersionUID = 1L;

        String username;
        String role;
        transient String ephemeralToken; // 'transient' fields are NOT serialized!

        UserSession(String username, String role, String token) {
            this.username = username;
            this.role = role;
            this.ephemeralToken = token;
        }

        @Override
        public String toString() {
            return String.format("UserSession[user=%s, role=%s, token=%s]", username, role, ephemeralToken);
        }
    }

    public static void main(String[] args) {
        String sessionFile = "session.ser";
        UserSession original = new UserSession("alice_admin", "SUPERUSER", "SECRET_KEY_XYZ");

        // Serialize object to file
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(sessionFile))) {
            oos.writeObject(original);
            System.out.println("Serialized: " + original);
        } catch (IOException e) {
            System.out.println("Serialization failed: " + e.getMessage());
        }

        // Deserialize object back from file
        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(sessionFile))) {
            UserSession restored = (UserSession) ois.readObject();
            System.out.println("Restored:   " + restored);
        } catch (IOException | ClassNotFoundException e) {
            System.out.println("Deserialization failed: " + e.getMessage());
        }
    }
}`,
              output: `Serialized: UserSession[user=alice_admin, role=SUPERUSER, token=SECRET_KEY_XYZ]
Restored:   UserSession[user=alice_admin, role=SUPERUSER, token=null]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "ObjectOutputStream writes entire object graphs. Notice that ephemeralToken becomes null upon restoration because it was marked 'transient'."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "يحفظ ObjectOutputStream الكائنات بالكامل، وتلاحظ أن ephemeralToken استُرجع كـ null لأنه عُرف كـ transient لمنع تسريبه."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: In-Memory Character Streams (StringReader & StringWriter) (المثال 6: مجاري المحارف في الذاكرة StringReader و StringWriter)"
            },
            {
              type: "paragraph",
              text: "Treating Java strings as character streams for testing or building text in RAM."
            },
            {
              type: "code",
              language: "java",
              filename: "StringStreamsDemo.java",
              code: `import java.io.StringReader;
import java.io.StringWriter;
import java.io.PrintWriter;
import java.io.IOException;

public class StringStreamsDemo {
    public static void main(String[] args) throws IOException {
        // StringWriter acts like a stream-friendly StringBuilder
        StringWriter sw = new StringWriter();
        try (PrintWriter pw = new PrintWriter(sw)) {
            pw.println("Line 1: In-memory string builder");
            pw.printf("Line 2: Value = %d%n", 999);
        }
        String result = sw.toString();
        System.out.println("Generated String:\\n" + result);

        // StringReader allows parsing strings using Stream/Reader APIs
        try (StringReader sr = new StringReader(result)) {
            int ch;
            System.out.print("First 10 chars read from StringReader: ");
            for (int i = 0; i < 10 && (ch = sr.read()) != -1; i++) {
                System.out.print((char) ch);
            }
            System.out.println();
        }
    }
}`,
              output: `Generated String:
Line 1: In-memory string builder
Line 2: Value = 999

First 10 chars read from StringReader: Line 1: In`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "StringWriter and StringReader bridge String data to Reader/Writer APIs without needing real filesystem files."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "يربط StringWriter و StringReader بين النصوص ومكتبات المجاري لاختبار ومعالجة النصوص في الذاكرة دون الحاجة لملفات حقيقية."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Bridging Byte and Character Streams (InputStreamReader & OutputStreamWriter) (المثال 7: الجسر الرابط بين مجاري البايتات والمحارف)"
            },
            {
              type: "paragraph",
              text: "How the bridge classes decode bytes into characters with explicit character sets."
            },
            {
              type: "code",
              language: "java",
              filename: "StreamBridgeDemo.java",
              code: `import java.io.*;
import java.nio.charset.StandardCharsets;

public class StreamBridgeDemo {
    public static void main(String[] args) throws IOException {
        byte[] rawUtf8Bytes = "Hello العربية ☕".getBytes(StandardCharsets.UTF_8);

        // ByteArrayInputStream (Byte Stream) -> InputStreamReader (Bridge) -> BufferedReader (Character Stream)
        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(
                        new ByteArrayInputStream(rawUtf8Bytes), StandardCharsets.UTF_8))) {
            String decoded = reader.readLine();
            System.out.println("Decoded text: " + decoded);
        }
    }
}`,
              output: `Decoded text: Hello العربية ☕`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "InputStreamReader is the critical adapter that translates raw 8-bit bytes from an InputStream into 16-bit characters using a specified Charset."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "يُعد InputStreamReader المحول الأهم لترجمة البايتات الثنائية القادمة من InputStream إلى محارف يونيكود وفق ترميز محدد."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Teeing Streams with FilterOutputStream (المثال 8: استنساخ وتوزيع مجاري البيانات FilterOutputStream)"
            },
            {
              type: "paragraph",
              text: "Creating a custom decorator stream that duplicates output to two destinations simultaneously (e.g. file and console)."
            },
            {
              type: "code",
              language: "java",
              filename: "TeeOutputStreamDemo.java",
              code: `import java.io.*;

public class TeeOutputStreamDemo {
    // Custom decorator that writes to two output streams at once
    static class TeeOutputStream extends OutputStream {
        private final OutputStream out1;
        private final OutputStream out2;

        public TeeOutputStream(OutputStream out1, OutputStream out2) {
            this.out1 = out1;
            this.out2 = out2;
        }

        @Override
        public void write(int b) throws IOException {
            out1.write(b);
            out2.write(b);
        }

        @Override
        public void flush() throws IOException {
            out1.flush();
            out2.flush();
        }
    }

    public static void main(String[] args) throws IOException {
        ByteArrayOutputStream memLog = new ByteArrayOutputStream();

        // PrintStream wrapping a TeeOutputStream (writing to both memLog and System.out)
        try (PrintStream tee = new PrintStream(new TeeOutputStream(memLog, System.out))) {
            tee.println("[TEE] Broadcast message to dual sinks simultaneously!");
        }

        System.out.println("Captured in Memory Sink: " + memLog.toString().trim());
    }
}`,
              output: `[TEE] Broadcast message to dual sinks simultaneously!
Captured in Memory Sink: [TEE] Broadcast message to dual sinks simultaneously!`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "Extending OutputStream allows building custom stream processors (like compression, encryption, or duplication) that plug into any Java API."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "وراثة OutputStream تتيح بناء معالجات مخصصة مثل التشفير أو البث المزدوج لتوصيلها بأي مكتبة جافا بسلاسة."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Fast Stream Copying with transferTo() (Java 9+) (المثال 9: النسخ الفائق بين المجاري transferTo)"
            },
            {
              type: "paragraph",
              text: "Piping all bytes from an InputStream directly into an OutputStream in a single optimized method call."
            },
            {
              type: "code",
              language: "java",
              filename: "StreamTransferDemo.java",
              code: `import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

public class StreamTransferDemo {
    public static void main(String[] args) throws IOException {
        byte[] sourceData = "High-speed zero-copy stream transfer introduced in Java 9!".getBytes();

        try (ByteArrayInputStream in = new ByteArrayInputStream(sourceData);
             ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            
            // Java 9 transferTo(): pipes all remaining bytes from 'in' directly to 'out'
            long transferred = in.transferTo(out);
            System.out.println("Bytes transferred: " + transferred);
            System.out.println("Output payload:    " + out.toString());
        }
    }
}`,
              output: `Bytes transferred: 58
Output payload:    High-speed zero-copy stream transfer introduced in Java 9!`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "in.transferTo(out) eliminates the need to write manual while-read-write loops, leveraging optimized native buffer sizes."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "تغني دالة in.transferTo(out) عن كتابة حلقات القراءة والكتابة اليدوية، وتقوم بنسخ المجاري بأقصى سرعة مدعومة بالعتاد."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: PrintStream vs PrintWriter Comparison (المثال 10: مقارنة تفصيلية بين PrintStream و PrintWriter)"
            },
            {
              type: "paragraph",
              text: "PrintStream (byte-oriented, does not throw IOException) vs PrintWriter (character-oriented, supports charsets)."
            },
            {
              type: "code",
              language: "java",
              filename: "PrintStreamVsWriterDemo.java",
              code: `import java.io.ByteArrayOutputStream;
import java.io.PrintStream;
import java.io.PrintWriter;
import java.io.StringWriter;

public class PrintStreamVsWriterDemo {
    public static void main(String[] args) {
        // 1. PrintStream (Byte stream, used by System.out & System.err)
        // Never throws IOException; uses checkError() instead
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PrintStream ps = new PrintStream(baos);
        ps.println("PrintStream writes to byte sinks.");
        System.out.println("PrintStream had error? " + ps.checkError());

        // 2. PrintWriter (Character stream, internationalized)
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw);
        pw.println("PrintWriter writes to character sinks with Unicode.");
        System.out.println("PrintWriter output: " + sw.toString().trim());
    }
}`,
              output: `PrintStream had error? false
PrintWriter output: PrintWriter writes to character sinks with Unicode.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "System.out is a PrintStream. For internationalized file writing, prefer PrintWriter because it works directly on character abstractions."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "كائن System.out الشهير هو PrintStream. أما لكتابة الملفات متعددة اللغات، فيُفضل PrintWriter لتعامله المباشر مع الحروف."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Enterprise Stream Pipe and Checksum Verification (المثال 11: أنبوب معالجة المجاري والتحقق من سلامة البيانات)"
            },
            {
              type: "paragraph",
              text: "Combining input streams, digest checksum calculation, and filtered storage in one pipeline."
            },
            {
              type: "code",
              language: "java",
              filename: "ChecksumStreamDemo.java",
              code: `import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.security.DigestInputStream;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class ChecksumStreamDemo {
    public static void main(String[] args) throws NoSuchAlgorithmException, IOException {
        byte[] payload = "Critical Enterprise Transaction Payload #9021".getBytes();

        MessageDigest md = MessageDigest.getInstance("SHA-256");
        ByteArrayOutputStream storage = new ByteArrayOutputStream();

        // Wrap stream in a DigestInputStream to compute SHA-256 hash on-the-fly while reading!
        try (ByteArrayInputStream bais = new ByteArrayInputStream(payload);
             DigestInputStream dis = new DigestInputStream(bais, md)) {
            dis.transferTo(storage);
        }

        byte[] hash = md.digest();
        StringBuilder hexString = new StringBuilder();
        for (byte b : hash) {
            hexString.append(String.format("%02x", b));
        }

        System.out.println("Stream processed and saved: " + storage.size() + " bytes");
        System.out.println("On-the-fly SHA-256 Hash:   " + hexString);
    }
}`,
              output: `Stream processed and saved: 46 bytes
On-the-fly SHA-256 Hash:   7e78dc7116bdae3f885e3505c21ec6fa034032d8479e0fbaea39c71c4805e26c`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "DigestInputStream demonstrates the power of stream decorators: computing cryptographic hashes on-the-fly without reading the file twice."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "يوضح DigestInputStream قوة نمط Decorator بحساب بصمة SHA-256 المشفرة للبيانات أثناء تدفقها دون الحاجة لقراءة الملف مرتين."
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
                "Mistake 1: Using Byte Streams (FileInputStream/FileOutputStream) directly for international text, which splits multi-byte UTF-8 characters and corrupts Arabic or Asian text. Use Readers and Writers instead.",
                "خطأ 1: استخدام مجاري البايتات المباشرة لنصوص متعددة اللغات، مما يكسر محارف UTF-8 متعددة البايت ويشوه العربية؛ البديل هو Reader و Writer.",
                "Mistake 2: Forgetting to declare 'private static final long serialVersionUID' in Serializable classes, leading to InvalidClassException when class bytecode changes.",
                "خطأ 2: نسيان تعريف serialVersionUID في الأصناف المتسلسلة، مما يسبب InvalidClassException عند أي تعديل طفيف في الصنف.",
                "Mistake 3: Marking sensitive data fields as standard instead of 'transient', leading to passwords or session tokens accidentally leaking into serialized disk files."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Binary Packet Encoder & Decoder (التحدي العملي: مشفر ومحلل الحزم الثنائية)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Build a binary packet protocol: 1) Class 'PacketEncoder': method 'encode(short magic, int packetId, String payload)' returns byte[]; 2) Class 'PacketDecoder': method 'decode(byte[] bytes)' prints parsed magic code, packetId, and payload string; 3) In main(), test encoding and decoding a packet."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: صمم بروتوكول حزم ثنائية: 1) فئة PacketEncoder بها دالة encode تستقبل magic و packetId و payload وتعيد byte[]؛ 2) فئة PacketDecoder بها دالة decode تستخرج وتطبع البيانات؛ 3) اختبر التشفير وفك التشفير في main."
            },
            {
              type: "code",
              language: "java",
              filename: "BinaryPacketChallenge.java",
              code: `import java.io.*;

public class BinaryPacketChallenge {
    static class PacketEncoder {
        public static byte[] encode(short magic, int packetId, String payload) throws IOException {
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            try (DataOutputStream dos = new DataOutputStream(baos)) {
                dos.writeShort(magic);
                dos.writeInt(packetId);
                dos.writeUTF(payload);
            }
            return baos.toByteArray();
        }
    }

    static class PacketDecoder {
        public static void decode(byte[] data) throws IOException {
            try (DataInputStream dis = new DataInputStream(new ByteArrayInputStream(data))) {
                short magic = dis.readShort();
                int packetId = dis.readInt();
                String payload = dis.readUTF();

                System.out.println("=== Decoded Packet ===");
                System.out.printf("Magic Header: 0x%04X%n", magic);
                System.out.println("Packet ID:    " + packetId);
                System.out.println("Payload:      " + payload);
            }
        }
    }

    public static void main(String[] args) {
        try {
            byte[] packetBytes = PacketEncoder.encode((short) 0xCAFE, 10042, "PING_HEARTBEAT_ACK");
            System.out.println("Encoded packet size: " + packetBytes.length + " bytes");
            PacketDecoder.decode(packetBytes);
        } catch (IOException e) {
            System.out.println("Packet error: " + e.getMessage());
        }
    }
}`,
              output: `Encoded packet size: 26 bytes
=== Decoded Packet ===
Magic Header: 0xCAFE
Packet ID:    10042
Payload:      PING_HEARTBEAT_ACK`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "The solution leverages ByteArrayOutputStream and DataOutputStream/DataInputStream to encode and decode structured binary network packets with exact byte boundaries."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "يستفيد الحل من ByteArrayOutputStream ومجاري البيانات لتشفير وفك الحزم الثنائية بدقة متناهية وحدود بايتات واضحة."
            }
          ],
          quiz: [
          {
                    "id": "q1",
                    "question": "Which design pattern is fundamentally implemented by the Java I/O Streams library to wrap and combine stream features? (ما هو نمط التصميم الأساسي المستخدم في مكتبة مجاري بيانات جافا لتغليف ودمج الميزات؟)",
                    "options": [
                              "Singleton Pattern (نمط الكائن المفرد)",
                              "Decorator Pattern (نمط المزيّن/المغلّف)",
                              "Factory Method Pattern (نمط المصنع)",
                              "Observer Pattern (نمط المراقب)"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Java I/O is a textbook example of the Gang-of-Four Decorator Pattern. Wrapper classes like BufferedInputStream and DataInputStream take an underlying InputStream and decorate it with buffering or primitive reading capabilities without modifying the core stream. (نمط Decorator يسمح بتغليف مجرى بمجرى آخر لإضافة إمكانيات جديدة مثل التخزين المؤقت دون تعديل الكود الأصلي)."
          },
          {
                    "id": "q2",
                    "question": "What is the primary architectural difference between Byte Streams and Character Streams in Java? (ما هو الفرق المعماري الأساسي بين مجاري البايت ومجاري المحارف في جافا؟)",
                    "options": [
                              "Byte Streams (InputStream/OutputStream) process raw 8-bit bytes, while Character Streams (Reader/Writer) process 16-bit Unicode characters with automatic charset decoding/encoding.",
                              "Byte Streams only work with in-memory arrays, while Character Streams work exclusively with hard drive files.",
                              "Character Streams do not require closing with try-with-resources, whereas Byte Streams do.",
                              "Byte Streams were deprecated in Java 8 and replaced entirely by Reader/Writer."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! Byte streams handle raw 8-bit bytes (ideal for binary files like images, audio, and compiled classes), whereas Character streams handle 16-bit Unicode characters and automatically convert between byte representations and characters using a specified Charset. (مجاري البايت تتعامل مع بايتات خام 8 بت للملفات الثنائية، بينما مجاري المحارف تتعامل مع حروف يونيكود 16 بت مع تحويل الترميز)."
          },
          {
                    "id": "q3",
                    "question": "Consider the following code snippet:\nByteArrayOutputStream baos = new ByteArrayOutputStream();\nbaos.write(new byte[]{65, 66, 67});\nbaos.close();\nbaos.write(68);\nSystem.out.println(baos.toString());\nWhat is the behavior and output? (ما هو سلوك ومخرجات الكود التالي؟)",
                    "options": [
                              "It throws an IOException on the second write because the stream was closed.",
                              "It prints 'ABCD' without error because close() has no effect on ByteArrayOutputStream.",
                              "It prints 'ABC' because writes after close() are silently ignored.",
                              "It causes a compilation error because write(int) cannot take an integer."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! The close() method of ByteArrayOutputStream has no effect. The methods in this class can be called after the stream has been closed without generating an IOException. Thus, writing 68 ('D') succeeds and baos.toString() outputs 'ABCD'. (دالة close في ByteArrayOutputStream ليس لها تأثير، ولا تطلق أي استثناء، وتبقى الذاكرة قابلة للكتابة والاسترجاع)."
          },
          {
                    "id": "q4",
                    "question": "When serializing an object using ObjectOutputStream, how can you prevent a sensitive field (such as a credit card number) from being persisted? (عند حفظ كائن بواسطة ObjectOutputStream، كيف تمنع حقلاً حساساً مثل رقم البطاقة من التسلسل؟)",
                    "options": [
                              "Declare the field with the 'volatile' modifier.",
                              "Declare the field with the 'transient' modifier.",
                              "Make the field 'final' and 'private'.",
                              "Override the clone() method to return null for that field."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! The 'transient' keyword prevents an instance variable from being serialized. During deserialization, transient fields are initialized to their default values (e.g., null for objects, 0 for numeric primitives). (الكلمة المفتاحية transient تمنع تسلسل وحفظ المتغير، وتتم استعادته كـ null أو القيمة الافتراضية)."
          },
          {
                    "id": "q5",
                    "question": "What happens when you close an outer decorator stream in a chained stream architecture, such as: try (DataInputStream dis = new DataInputStream(new BufferedInputStream(new FileInputStream(\"data.bin\")))) { ... }? (ماذا يحدث عند إغلاق مجرى التغليف الخارجي في سلسلة المجاري؟)",
                    "options": [
                              "Only the DataInputStream is closed; the programmer must explicitly close BufferedInputStream and FileInputStream separately.",
                              "Closing the outermost decorator automatically closes all underlying wrapped streams in the chain.",
                              "An exception is thrown unless the innermost stream is closed first.",
                              "The underlying file descriptor remains locked by the operating system."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Following the Decorator pattern contract in Java I/O, invoking close() on the outermost decorator propagates down and closes all wrapped inner streams, releasing all underlying file descriptors. (إغلاق المجرى الخارجي يغلق تلقائياً كافة المجاري الداخلية المغلّفة وصولاً إلى مقبض الملف بنظام التشغيل)."
          },
          {
                    "id": "q6",
                    "question": "Which method introduced in Java 9 allows copying all bytes directly from an InputStream to an OutputStream without writing a manual buffer loop? (أي دالة أضيفت في جافا 9 تسمح بنسخ جميع البيانات من InputStream إلى OutputStream مباشرة دون حلقة تكرار يدوية؟)",
                    "options": [
                              "in.pipeTo(out);",
                              "in.transferTo(out);",
                              "in.copyAll(out);",
                              "out.consume(in);"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! The transferTo(OutputStream out) method reads all bytes from the input stream and writes them to the given output stream in the order they are read, returning the number of bytes transferred. (تقوم دالة in.transferTo(out) بنقل جميع البايتات بسرعة وكفاءة عالية بين المجرى الداخل والخارج)."
          },
          {
                    "id": "q7",
                    "question": "Why does DataOutputStream write strings using writeUTF(String) instead of standard writeBytes(String) when exchanging data across network or files? (لماذا يُفضل استخدام writeUTF في DataOutputStream بدلاً من writeBytes؟)",
                    "options": [
                              "writeUTF prepends a 2-byte length header and uses modified UTF-8 encoding, allowing DataInputStream.readUTF() to safely decode the exact string length without delimiters.",
                              "writeUTF compresses the text using GZIP automatically.",
                              "writeBytes only works on Linux and causes an IOException on Windows.",
                              "writeUTF is encrypted using AES-128."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! writeUTF() writes a two-byte length prefix followed by the string in modified UTF-8 format. This allows DataInputStream.readUTF() to know exactly how many bytes to read, preserving characters and boundaries reliably. (تكتب writeUTF بادئة من 2 بايت تحدد طول النص بدقة بترميز UTF-8، مما يمكن readUTF من قراءة النص كاملاً بدقة دون حاجة لفواصل)."
          },
          {
                    "id": "q8",
                    "question": "What is a key difference between PrintStream and PrintWriter in Java? (ما هو الفارق الجوهري بين PrintStream و PrintWriter في جافا؟)",
                    "options": [
                              "PrintStream throws checked IOExceptions on every write, while PrintWriter suppresses all exceptions.",
                              "PrintStream is a Byte Stream that suppresses IOExceptions (providing checkError()), while PrintWriter is a Character Stream designed for internationalized character output.",
                              "PrintWriter cannot write newline characters, while PrintStream can.",
                              "PrintStream is an interface, while PrintWriter is a final class."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! PrintStream is a byte stream decorator (like System.out) that swallows IOExceptions and provides checkError(), while PrintWriter is a character stream that properly handles 16-bit characters and character encodings. (يعتبر PrintStream مجرى بايت يبتلع أخطاء IO، بينما PrintWriter مجرى محارف مخصص للتعامل السليم مع الحروف وتعدد اللغات)."
          },
          {
                    "id": "q9",
                    "question": "Which classes serve as the in-memory counterparts to FileReader and FileWriter, allowing character I/O on StringBuffer or String data? (أي الفئات تمثل المقابل في الذاكرة لـ FileReader و FileWriter للتعامل مع نصوص الذاكرة؟)",
                    "options": [
                              "CharArrayInputStream and CharArrayOutputStream",
                              "StringReader and StringWriter",
                              "MemoryReader and MemoryWriter",
                              "BufferReader and BufferWriter"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! StringReader reads characters from a String, and StringWriter writes characters into an internal StringBuffer that can be retrieved via toString() or getBuffer(). (فئتا StringReader و StringWriter توفران قراءة وكتابة المحارف داخل الذاكرة باستخدام نصوص جافا)."
          },
          {
                    "id": "q10",
                    "question": "Which bridge class converts an incoming Byte Stream (InputStream) into a Character Stream (Reader) with a specified character set? (أي فئة تعمل كجسر تحويل من مجرى بايتات إلى مجرى محارف بترميز محدد؟)",
                    "options": [
                              "StreamDecoder",
                              "InputStreamReader",
                              "ByteToCharReader",
                              "CharsetReader"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! InputStreamReader is a bridge from byte streams to character streams: it reads bytes and decodes them into characters using a specified charset (such as StandardCharsets.UTF_8). (فئة InputStreamReader هي الجسر الرسمي لقراءة البايتات وفك ترميزها إلى حروف يونيكود)."
          },
          {
                    "id": "q11",
                    "question": "What is the primary performance benefit of using BufferedInputStream over raw FileInputStream? (ما الفائدة الرئيسية في الأداء لاستخدام BufferedInputStream بدلاً من FileInputStream المباشر؟)",
                    "options": [
                              "It compresses data before passing it to the application.",
                              "It reduces the number of expensive operating system kernel read calls by loading large chunks (default 8192 bytes) into a memory buffer at once.",
                              "It runs the read operation on a background GPU thread.",
                              "It prevents all IOExceptions from ever being thrown."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Reading byte-by-byte from a raw FileInputStream triggers a system call for every byte, which is extremely slow. BufferedInputStream maintains an internal 8KB buffer in user space, fetching blocks of bytes in single kernel calls. (التخزين المؤقت يقلل استدعاءات نواة نظام التشغيل عبر قراءة كتل كبيرة 8192 بايت دفعة واحدة إلى الذاكرة RAM)."
          },
          {
                    "id": "q12",
                    "question": "Review the following code:\nDataOutputStream dos = new DataOutputStream(new ByteArrayOutputStream());\ndos.writeInt(65);\nHow many bytes does writeInt(65) write to the underlying stream? (كم بايت يكتب الاستدعاء writeInt(65) إلى المجرى الداخلي؟)",
                    "options": [
                              "1 byte (0x41, ASCII for 'A')",
                              "2 bytes (16-bit short)",
                              "4 bytes (standard 32-bit big-endian integer: 0x00, 0x00, 0x00, 0x41)",
                              "8 bytes (64-bit word)"
                    ],
                    "correctIndex": 2,
                    "explanation": "Correct! In Java, an int is 32 bits (4 bytes). DataOutputStream.writeInt(v) writes the integer as four bytes, high byte first (Big-Endian order). (يكتب writeInt القيمة في 4 بايتات بترتيب Big-Endian من البايت الأعلى إلى الأدنى)."
          },
          {
                    "id": "q13",
                    "question": "Why was the readLine() method on DataInputStream deprecated in modern Java? (لماذا تم تصنيف الدالة readLine في DataInputStream كدالة مهملة deprecated؟)",
                    "options": [
                              "Because it does not correctly convert bytes to characters according to any specified Charset encoding (it merely casts 8-bit bytes directly to 16-bit chars).",
                              "Because it causes an irreversible memory leak in the JVM heap.",
                              "Because it is unable to detect newline characters on Linux.",
                              "Because it was renamed to readNextLine()."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! DataInputStream.readLine() cannot properly handle multi-byte Unicode encodings (like UTF-8) because it blindly casts each byte to a char. Developers should wrap the InputStream in an InputStreamReader and BufferedReader instead. (الدالة مهملة لأنها لا تدعم ترميزات اليونيكود وتقوم فقط بتحويل كل بايت مباشرة إلى محرف، والبديل الصحيح هو BufferedReader)."
          },
          {
                    "id": "q14",
                    "question": "What is the purpose of FilterOutputStream and FilterInputStream in java.io? (ما هو الغرض من FilterOutputStream و FilterInputStream في مكتبة java.io؟)",
                    "options": [
                              "They are base classes for stream decorators, providing pass-through implementations of all stream methods so subclasses can override only the specific methods they wish to augment.",
                              "They filter out malicious viruses from input streams.",
                              "They prevent null bytes (0x00) from being written to disk.",
                              "They only accept connections from local IP addresses."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! FilterInputStream and FilterOutputStream wrap an underlying stream and override all methods by simply delegating to the contained stream. Subclasses (like BufferedOutputStream, CipherOutputStream, or custom tee streams) override only methods they need to customize. (هما الفئتان الأساسيتان لنمط Decorator حيث تمرران كافة العمليات للمجرى الداخلي، مما يتيح للفئات المشتقة تعديل ما يلزم فقط)."
          },
          {
                    "id": "q15",
                    "question": "Which pair of classes in java.io allows passing data between two concurrent threads where one thread writes data and the other thread reads it? (أي زوج من الفئات في java.io يتيح تبادل البيانات بين خيطين متزامنين حيث يكتب أحدهما ويقرأ الآخر؟)",
                    "options": [
                              "ThreadInputStream and ThreadOutputStream",
                              "PipedInputStream and PipedOutputStream",
                              "ConcurrentInputStream and ConcurrentOutputStream",
                              "ChannelInputStream and ChannelOutputStream"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! PipedInputStream and PipedOutputStream form a communication pipe between two threads: one thread writes to the PipedOutputStream, and another thread reads from the connected PipedInputStream. (فئتا PipedInputStream و PipedOutputStream تشكلان قناة أنابيب لتبادل البيانات بين خيوط المعالجة المتزامنة)."
          }
]
        }
      ]
    }
  ];
})();
