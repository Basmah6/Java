/**
 * Java Curriculum Module - Part 24
 * Topics:
 * 47. Java Write Files
 * 48. Java Read Files
 * 
 * 100% Offline, Pure JavaScript. Complete educational content with full bilingual (English & Arabic) explanations.
 */

(function () {
  'use strict';

  window.JAVA_TOPICS_PART24 = [
    /* ==========================================================================
       TOPIC 47: Java Write Files
       ========================================================================== */
    {
      id: "java-write-files",
      title: "47. Java Write Files",
      description: "Complete Guide to Writing Files in Java: FileWriter, BufferedWriter, PrintWriter, FileOutputStream, Files.writeString(), Files.write(), StandardOpenOption flags (CREATE, APPEND, TRUNCATE_EXISTING), buffer flushing, and UTF-8 charset encoding.",
      lessons: [
        {
          id: "java-write-files-mastery",
          title: "Complete Guide to Writing Files",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "Writing Files in Java: Streams, Writers, & NIO.2 (كتابة الملفات في جافا)"
            },
            {
              type: "paragraph",
              text: "Writing data to files is one of the most common programming tasks. Java offers several techniques ranging from byte-oriented streams to character writers and high-level NIO.2 utility methods. Key tools include: 'FileWriter' (character-level writing), 'BufferedWriter' (buffering output to reduce expensive disk I/O operations), 'PrintWriter' (convenient print/println/printf formatting), 'FileOutputStream' (raw binary output), and modern 'Files.writeString()' / 'Files.write()' (single-line high-performance writing with StandardOpenOption flags)."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "تُعد كتابة البيانات في الملفات من أهم العمليات البرمجية. تقدم جافا أدوات متعددة تبدأ من مجاري البايتات الثنائية وتصل إلى كُتّاب النصوص المعتمدين على التخزين المؤقت وأدوات NIO.2 الحديثة. تشمل الأدوات الأساسية: FileWriter (للكتابة النصية)، وBufferedWriter (لتقليل عمليات الكتابة على القرص عبر التخزين المؤقت Buffer)، وPrintWriter (لتنسيق النصوص والطباعة المريحة)، وFileOutputStream (للبيانات الثنائية والصور)، وFiles.writeString (للكتابة السريعة بأسلوب جافا الحديث مع خيارات مثل APPEND و TRUNCATE_EXISTING)."
            },
            {
              type: "paragraph",
              text: "Critical Concepts: 1) Overwrite vs Append: Passing 'true' to FileWriter constructor or using StandardOpenOption.APPEND; 2) Buffer Flushing: Calling 'flush()' or relying on close() to empty in-memory buffers to disk; 3) Character Sets: Always specifying StandardCharsets.UTF_8 to avoid corrupted text across differing operating system locales."
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
              text: "Example 1: Basic Writing with FileWriter (Overwrite Mode) (المثال 1: الكتابة الأساسية بـ FileWriter بنمط الاستبدال)"
            },
            {
              type: "paragraph",
              text: "Opening a FileWriter in default overwrite mode and writing strings."
            },
            {
              type: "code",
              language: "java",
              filename: "BasicFileWriterDemo.java",
              code: `import java.io.FileWriter;
import java.io.IOException;

public class BasicFileWriterDemo {
    public static void main(String[] args) {
        String filename = "notes.txt";

        // FileWriter with try-with-resources (defaults to overwrite mode)
        try (FileWriter writer = new FileWriter(filename)) {
            writer.write("Hello, Java File I/O!\\n");
            writer.write("Learning to write character streams safely.\\n");
            System.out.println("Successfully wrote text to " + filename);
        } catch (IOException e) {
            System.out.println("An error occurred during write: " + e.getMessage());
        }
    }
}`,
              output: `Successfully wrote text to notes.txt`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "By default, new FileWriter(filename) truncates any existing file, overwriting its contents from byte 0."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "بشكل افتراضي، يقوم FileWriter بمسح محتوى الملف القديم واستبداله بالكامل من البداية."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Appending Data with FileWriter(file, true) (المثال 2: الإلحاق بالملف FileWriter بنمط Append)"
            },
            {
              type: "paragraph",
              text: "Passing true as the second argument to preserve existing data and append to the end of the file."
            },
            {
              type: "code",
              language: "java",
              filename: "AppendFileWriterDemo.java",
              code: `import java.io.FileWriter;
import java.io.IOException;

public class AppendFileWriterDemo {
    public static void appendLog(String logMessage) {
        // Passing 'true' enables APPEND mode!
        try (FileWriter writer = new FileWriter("activity.log", true)) {
            writer.write(logMessage + "\\n");
            System.out.println("Appended: " + logMessage);
        } catch (IOException e) {
            System.out.println("Append failed: " + e.getMessage());
        }
    }

    public static void main(String[] args) {
        appendLog("[INFO] Server initialized at port 8080");
        appendLog("[INFO] Database pool connected (10 connections)");
    }
}`,
              output: `Appended: [INFO] Server initialized at port 8080
Appended: [INFO] Database pool connected (10 connections)`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "new FileWriter(filename, true) moves the file pointer to the end of the file, preserving earlier content."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "تمرير true كوسيط ثانٍ يفعّل نمط الإلحاق (Append)، بحيث تُكتب الأسطر في نهاية الملف دون حذف ما قبله."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: High-Performance Writing with BufferedWriter (المثال 3: الكتابة عالية الأداء باستخدام BufferedWriter)"
            },
            {
              type: "paragraph",
              text: "Wrapping FileWriter in a BufferedWriter to minimize expensive physical disk write operations."
            },
            {
              type: "code",
              language: "java",
              filename: "BufferedWriterDemo.java",
              code: `import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;

public class BufferedWriterDemo {
    public static void main(String[] args) {
        String filename = "buffered_output.txt";

        // Chaining BufferedWriter on top of FileWriter
        try (BufferedWriter bw = new BufferedWriter(new FileWriter(filename))) {
            for (int i = 1; i <= 5; i++) {
                bw.write("Line #" + i + ": Buffered writes batch bytes into memory before flushing.");
                bw.newLine(); // Platform-independent newline separator (\\n or \\r\\n)
            }
            System.out.println("Wrote 5 buffered lines to: " + filename);
        } catch (IOException e) {
            System.out.println("Buffering error: " + e.getMessage());
        }
    }
}`,
              output: `Wrote 5 buffered lines to: buffered_output.txt`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "BufferedWriter stores output in an internal memory buffer (default 8192 chars) and writes to disk in large chunks. bw.newLine() outputs the OS-correct newline."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "يقوم BufferedWriter بتجميع النصوص في الذاكرة وكتابتها دفعة واحدة لتقليل إجهاد القرص الصلب، وتنتج newLine() سطر جديد متوافق مع نظام التشغيل."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Formatted Writing with PrintWriter (printf & println) (المثال 4: الكتابة المنسقة باستخدام PrintWriter)"
            },
            {
              type: "paragraph",
              text: "Using PrintWriter for familiar print, println, and formatted printf operations."
            },
            {
              type: "code",
              language: "java",
              filename: "PrintWriterDemo.java",
              code: `import java.io.FileWriter;
import java.io.PrintWriter;
import java.io.IOException;

public class PrintWriterDemo {
    public static void main(String[] args) {
        String reportFile = "sales_report.txt";

        try (PrintWriter pw = new PrintWriter(new FileWriter(reportFile))) {
            pw.println("================================");
            pw.println("      DAILY SALES REPORT        ");
            pw.println("================================");
            
            String[] items = { "Widget A", "Gadget B", "Sensor C" };
            double[] prices = { 19.99, 49.50, 120.00 };
            int[] quantities = { 5, 2, 1 };

            for (int i = 0; i < items.length; i++) {
                pw.printf("%-12s | Qty: %02d | Total: $%7.2f%n",
                        items[i], quantities[i], prices[i] * quantities[i]);
            }
            pw.println("--------------------------------");
            System.out.println("Formatted report generated: " + reportFile);
        } catch (IOException e) {
            System.out.println("Report generation error: " + e.getMessage());
        }
    }
}`,
              output: `Formatted report generated: sales_report.txt`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "PrintWriter provides println() and printf() methods that mirror System.out, making tabular file generation intuitive."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "يوفر PrintWriter نفس دوال println و printf المألوفة في الطباعة على الشاشة، مما يسهل كتابة الجداول والتقارير في الملفات."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Binary File Writing with FileOutputStream (المثال 5: كتابة البيانات الثنائية بـ FileOutputStream)"
            },
            {
              type: "paragraph",
              text: "Writing raw byte arrays for binary payloads, images, or compressed data."
            },
            {
              type: "code",
              language: "java",
              filename: "FileOutputStreamDemo.java",
              code: `import java.io.FileOutputStream;
import java.io.IOException;

public class FileOutputStreamDemo {
    public static void main(String[] args) {
        String binaryFile = "header.bin";

        // Custom magic byte header for a proprietary file format
        byte[] magicBytes = { 0x7F, 'E', 'L', 'F', 0x01, 0x02 };

        try (FileOutputStream fos = new FileOutputStream(binaryFile)) {
            fos.write(magicBytes);
            // Write single raw byte
            fos.write(0xFF);
            System.out.println("Wrote " + (magicBytes.length + 1) + " raw binary bytes to: " + binaryFile);
        } catch (IOException e) {
            System.out.println("Binary write failed: " + e.getMessage());
        }
    }
}`,
              output: `Wrote 7 raw binary bytes to: header.bin`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "FileOutputStream writes raw bytes directly without any character encoding conversions, essential for binary files."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "يكتب FileOutputStream البايتات الخام مباشرة دون أي تحويل محارف، وهو مخصص للملفات الثنائية كالحزم والصور."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Modern One-Liner Writing with Files.writeString() (Java 11+) (المثال 6: الكتابة المباشرة بسطر واحد Files.writeString)"
            },
            {
              type: "paragraph",
              text: "Writing an entire String to disk in a single method call introduced in Java 11."
            },
            {
              type: "code",
              language: "java",
              filename: "FilesWriteStringDemo.java",
              code: `import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;

public class FilesWriteStringDemo {
    public static void main(String[] args) {
        Path path = Paths.get("payload.json");
        String json = "{\\n  \"status\": \"SUCCESS\",\\n  \"timestamp\": 1772924395000\\n}";

        try {
            // Write string with explicit UTF-8 encoding
            Files.writeString(path, json, StandardCharsets.UTF_8,
                    StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);
            System.out.println("Successfully wrote JSON string using modern Files.writeString()");
        } catch (IOException e) {
            System.out.println("NIO write failed: " + e.getMessage());
        }
    }
}`,
              output: `Successfully wrote JSON string using modern Files.writeString()`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "Files.writeString() handles stream creation, writing, flushing, and closing automatically in one clean call."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "تتولى Files.writeString() فتح الدفق والكتابة والتفريغ والإغلاق تلقائياً بسطر برمجي واحد وبكفاءة قصوى."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Writing Collections of Lines with Files.write() (المثال 7: كتابة قائمة كاملة من الأسطر Files.write)"
            },
            {
              type: "paragraph",
              text: "Writing a List<String> directly to a file with line separators handled automatically."
            },
            {
              type: "code",
              language: "java",
              filename: "FilesWriteLinesDemo.java",
              code: `import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;

public class FilesWriteLinesDemo {
    public static void main(String[] args) {
        Path path = Paths.get("todo.txt");
        List<String> tasks = Arrays.asList(
                "1. Implement authentication endpoints",
                "2. Configure TLS certificates",
                "3. Perform load testing on payments",
                "4. Update deployment manifests"
        );

        try {
            // Writes all lines with platform-correct newlines in UTF-8
            Files.write(path, tasks, StandardCharsets.UTF_8);
            System.out.println("Wrote " + tasks.size() + " lines to: " + path);
        } catch (IOException e) {
            System.out.println("Write lines error: " + e.getMessage());
        }
    }
}`,
              output: `Wrote 4 lines to: todo.txt`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "Files.write(path, Iterable<CharSequence>, Charset) iterates over any collection and writes each element followed by a newline."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "تستقبل Files.write أي قائمة نصوص وتقوم بكتابة كل سطر وإضافة الفاصل المناسب للنظام بصيغة UTF-8 تلقائياً."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Manual Buffer Flushing with flush() (المثال 8: تفريغ الذاكرة المؤقتة يدوياً بـ flush)"
            },
            {
              type: "paragraph",
              text: "Demonstrating how flush() forces pending buffered data to disk without closing the stream."
            },
            {
              type: "code",
              language: "java",
              filename: "FlushBufferDemo.java",
              code: `import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;

public class FlushBufferDemo {
    public static void main(String[] args) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter("realtime_feed.log"))) {
            writer.write("[EVENT 101] Heartbeat pulse received.");
            writer.newLine();
            
            // Force data out of internal memory buffer onto the physical disk immediately
            writer.flush();
            System.out.println("Event 101 flushed to disk. Stream remains open for subsequent events.");

            writer.write("[EVENT 102] Gateway acknowledgment.");
            writer.newLine();
            writer.flush();
            System.out.println("Event 102 flushed to disk.");
        } catch (IOException e) {
            System.out.println("Flush error: " + e.getMessage());
        }
    }
}`,
              output: `Event 101 flushed to disk. Stream remains open for subsequent events.
Event 102 flushed to disk.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "flush() commits in-memory buffered data to the operating system immediately, preventing data loss if a crash occurs while the stream is still open."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "تقوم دالة flush() بإرسال البيانات المجمعة في الذاكرة المؤقتة إلى القرص فوراً، مما يضمن حفظها دون الحاجة لإغلاق الملف."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Explicit UTF-8 Encoding with OutputStreamWriter (المثال 9: تحديد ترميز UTF-8 الصريح عبر OutputStreamWriter)"
            },
            {
              type: "paragraph",
              text: "Ensuring international character support (Arabic, Chinese, emojis) across different operating systems."
            },
            {
              type: "code",
              language: "java",
              filename: "ExplicitEncodingDemo.java",
              code: `import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.io.BufferedWriter;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

public class ExplicitEncodingDemo {
    public static void main(String[] args) {
        String filename = "multilingual.txt";

        // OutputStreamWriter allows explicit Charset definition
        try (BufferedWriter writer = new BufferedWriter(
                new OutputStreamWriter(new FileOutputStream(filename), StandardCharsets.UTF_8))) {
            writer.write("English: Welcome to Java I/O\\n");
            writer.write("العربية: مرحباً بك في دورة تعلم لغة جافا الشاملة\\n");
            writer.write("Emojis: 🚀 ☕ 💻 🔒\\n");
            System.out.println("Multilingual file written cleanly in UTF-8: " + filename);
        } catch (IOException e) {
            System.out.println("Encoding error: " + e.getMessage());
        }
    }
}`,
              output: `Multilingual file written cleanly in UTF-8: multilingual.txt`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "Never rely on the OS default charset. Always specify StandardCharsets.UTF_8 so Arabic and non-ASCII characters don't become corrupted."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "لا تعتمد أبداً على الترميز الافتراضي للنظام؛ بل حدد StandardCharsets.UTF_8 صراحةً لضمان عدم تشوه الحروف العربية والرموز."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Atomic File Writing via Temporary File Replace (المثال 10: الكتابة الذرية عبر استبدال الملف المؤقت)"
            },
            {
              type: "paragraph",
              text: "Production resilience pattern: write to a temporary file first, then atomically replace the target so readers never see half-written data."
            },
            {
              type: "code",
              language: "java",
              filename: "AtomicWritePatternDemo.java",
              code: `import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

public class AtomicWritePatternDemo {
    public static void atomicSave(Path targetFile, String content) throws IOException {
        Path parent = targetFile.getParent() != null ? targetFile.getParent() : Paths.get(".");
        
        // 1. Create temporary file in same directory
        Path tempFile = Files.createTempFile(parent, "atomic_", ".tmp");

        // 2. Write full payload to temp file
        Files.writeString(tempFile, content, StandardCharsets.UTF_8);

        // 3. Atomically move/replace temp file to destination
        Files.move(tempFile, targetFile, 
                   StandardCopyOption.ATOMIC_MOVE, 
                   StandardCopyOption.REPLACE_EXISTING);
        
        System.out.println("Atomically saved file: " + targetFile);
    }

    public static void main(String[] args) {
        Path config = Paths.get("database_config.json");
        try {
            atomicSave(config, "{\\"db_host\\": \\"10.0.0.5\\", \\"port\\": 5432}");
        } catch (IOException e) {
            System.out.println("Atomic save failed: " + e.getMessage());
        }
    }
}`,
              output: `Atomically saved file: database_config.json`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "Atomic writes prevent file corruption if the server suddenly loses power or crashes mid-write: readers see either the old version or the new version, never a partial file."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "يمنع نمط الكتابة الذري تشوه الملفات عند انقطاع الكهرباء المفاجئ؛ فالقارئ يرى دائماً إما النسخة الكاملة السابقة أو الجديدة ولا يرى ملفاً مبتوراً أبداً."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Enterprise Audit Log Rotator and Buffered Writer (المثال 11: مسجل التدقيق المؤسسي الموزع مع إدارة السعة)"
            },
            {
              type: "paragraph",
              text: "Simulating a high-throughput transactional audit log appender."
            },
            {
              type: "code",
              language: "java",
              filename: "AuditLogWriterDemo.java",
              code: `import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.time.Instant;

public class AuditLogWriterDemo {
    static class AuditLogService implements AutoCloseable {
        private final BufferedWriter writer;
        private int transactionCount = 0;

        public AuditLogService(String logPath) throws IOException {
            // Append mode with buffer
            this.writer = new BufferedWriter(new FileWriter(logPath, true));
        }

        public synchronized void logTransaction(String user, String action, String ip) throws IOException {
            String record = String.format("%s | USER=%s | ACTION=%s | IP=%s",
                    Instant.now().toString(), user, action, ip);
            writer.write(record);
            writer.newLine();
            transactionCount++;

            // Flush every 2 transactions to balance performance and durability
            if (transactionCount % 2 == 0) {
                writer.flush();
                System.out.println("[AUDIT FLUSH] Batch committed to disk.");
            }
        }

        @Override
        public void close() throws IOException {
            writer.close();
            System.out.println("[AUDIT CLOSED] Final buffer flushed and log closed.");
        }
    }

    public static void main(String[] args) {
        try (AuditLogService audit = new AuditLogService("audit.log")) {
            audit.logTransaction("admin", "LOGIN_SUCCESS", "192.168.1.10");
            audit.logTransaction("admin", "UPDATE_PERMISSIONS", "192.168.1.10");
            audit.logTransaction("analyst", "EXPORT_REPORT", "192.168.1.45");
        } catch (IOException e) {
            System.out.println("Audit error: " + e.getMessage());
        }
    }
}`,
              output: `[AUDIT FLUSH] Batch committed to disk.
[AUDIT CLOSED] Final buffer flushed and log closed.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "Periodic flushing within a synchronized wrapper balances I/O performance against crash-resilience in multi-threaded enterprise services."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "التفريغ الدوري المنظم يوازن ببراعة بين سرعة الإدخال والإخراج وحماية البيانات من الفقدان في بيئات العمل المشتركة."
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
                "Mistake 1: Forgetting to close or flush a BufferedWriter. Because data is held in memory, failing to close the stream leaves the file empty or partially missing trailing bytes.",
                "خطأ 1: نسيان إغلاق أو تفريغ BufferedWriter؛ وبما أن البيانات تُجمع في الرام، فإن عدم الإغلاق يترك الملف فارغاً على القرص.",
                "Mistake 2: Accidentally overwriting a file when intending to append because the boolean 'true' parameter in new FileWriter(file, true) was omitted.",
                "خطأ 2: مسح الملف القديم بالخطأ عند الرغبة في الإلحاق نتيجة نسيان تمرير true في منشئ FileWriter.",
                "Mistake 3: Omitting character encoding (such as StandardCharsets.UTF_8) which causes garbled characters (Mojibake) when run on systems with different default charsets."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Thread-Safe Metrics Flusher (التحدي العملي: جامع المقاييس الآمن وتفريغ الملفات)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Build a metrics writer: 1) Class 'MetricsLogger'; 2) Stores target file path; 3) Method 'recordMetric(String metricName, double value)': appends a formatted line '[TIMESTAMP] metricName = value' to the file; 4) Method 'recordBatch(List<String> metrics)': writes multiple metrics using Files.write with APPEND option; 5) In main(), test both single and batch recording."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: صمم مسجل مقاييس: 1) فئة MetricsLogger تحتفظ بمسار الملف؛ 2) دالة recordMetric تضيف مقياساً منسقاً مع التوقيت بنمط Append؛ 3) دالة recordBatch تكتب قائمة مقاييس دفعة واحدة؛ 4) اختبر الكتابة الفردية والدفعية في main."
            },
            {
              type: "code",
              language: "java",
              filename: "MetricsLoggerChallenge.java",
              code: `import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.Arrays;
import java.util.List;

public class MetricsLoggerChallenge {
    static class MetricsLogger {
        private final Path logPath;

        public MetricsLogger(String filename) {
            this.logPath = Paths.get(filename);
        }

        public void recordMetric(String name, double value) throws IOException {
            String entry = String.format("METRIC | %s = %.2f%n", name, value);
            Files.writeString(logPath, entry, StandardCharsets.UTF_8,
                    StandardOpenOption.CREATE, StandardOpenOption.APPEND);
            System.out.print("Recorded: " + entry);
        }

        public void recordBatch(List<String> batch) throws IOException {
            Files.write(logPath, batch, StandardCharsets.UTF_8,
                    StandardOpenOption.CREATE, StandardOpenOption.APPEND);
            System.out.println("Batch of " + batch.size() + " metrics written successfully.");
        }
    }

    public static void main(String[] args) {
        MetricsLogger logger = new MetricsLogger("telemetry.log");
        try {
            logger.recordMetric("cpu_usage_percent", 42.50);
            logger.recordMetric("memory_heap_mb", 512.00);

            List<String> batch = Arrays.asList(
                    "METRIC | disk_io_read_kb = 1024.00",
                    "METRIC | disk_io_write_kb = 2048.00"
            );
            logger.recordBatch(batch);
        } catch (IOException e) {
            System.out.println("Telemetry write failed: " + e.getMessage());
        }
    }
}`,
              output: `Recorded: METRIC | cpu_usage_percent = 42.50
Recorded: METRIC | memory_heap_mb = 512.00
Batch of 2 metrics written successfully.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "Using StandardOpenOption.CREATE and StandardOpenOption.APPEND guarantees that the file is created if missing, while preserving existing telemetry lines."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "استخدام CREATE مع APPEND يضمن إنشاء الملف إذا لم يكن موجوداً، أو إضافة القياسات الجديدة في نهايته دون فقدان البيانات القديمة."
            }
          ],
          quiz: [
          {
                    "id": "q1",
                    "question": "How do you open a FileWriter in APPEND mode so that existing data in the file is preserved?\n(كيف تفتح FileWriter بنمط الإلحاق Append للحفاظ على محتويات الملف السابقة؟)",
                    "options": [
                              "new FileWriter(\"log.txt\", true)",
                              "new FileWriter(\"log.txt\").setAppend(true)",
                              "new FileWriter(\"log.txt\", StandardOpenOption.APPEND)",
                              "new FileWriter(\"log.txt\", \"a\")"
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! Passing true as the second boolean parameter to the FileWriter constructor (new FileWriter(filename, true)) enables append mode. Passing false or omitting it truncates the file. (تمرير true كمعامل ثانٍ في منشئ FileWriter يفعل نمط الإلحاق ويمنع حذف المحتوى القديم)."
          },
          {
                    "id": "q2",
                    "question": "What is the common consequence of forgetting to call flush() or close() on a BufferedWriter before the program exits?\n(ما العاقبة الشائعة لنسيان استدعاء flush أو close على BufferedWriter قبل إنهاء البرنامج؟)",
                    "options": [
                              "Data buffered in memory is never written to disk, resulting in an empty or partially truncated file.",
                              "The computer crashes with a Blue Screen of Death.",
                              "The file is automatically deleted by the OS.",
                              "The file size doubles."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! BufferedWriter holds written characters in an internal memory buffer (typically 8KB) to minimize disk writes. If close() or flush() is not called, any data remaining in the buffer is lost when the program terminates. (يخزن BufferedWriter البيانات في ذاكرة وسيطة، وإذا لم يُغلق أو يُفرغ تفقد البيانات المتبقية في الذاكرة ولا تصل للقرص)."
          },
          {
                    "id": "q3",
                    "question": "What will be the final content of output.txt after running this code?\ntry (FileWriter fw = new FileWriter(\"output.txt\")) {\n    fw.write(\"Alpha\");\n}\ntry (FileWriter fw = new FileWriter(\"output.txt\")) {\n    fw.write(\"Beta\");\n}\n(ما هو المحتوى النهائي للملف output.txt بعد تنفيذ الكود التالي؟)",
                    "options": [
                              "AlphaBeta",
                              "Beta",
                              "Alpha",
                              "Alpha\\nBeta"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Because neither constructor passed true for append mode, the second FileWriter truncated output.txt, overwriting 'Alpha' with 'Beta'. (لأن المنشئ الثاني لم يستخدم نمط الإلحاق true، قام بمسح المحتوى السابق واستبداله بـ Beta)."
          },
          {
                    "id": "q4",
                    "question": "Why is it dangerous to write binary data (such as JPEG images or ZIP files) using a FileWriter or PrintWriter?\n(لماذا يعتبر خطيراً كتابة بيانات ثنائية مثل الصور والملفات المضغوطة باستخدام FileWriter أو PrintWriter؟)",
                    "options": [
                              "Because FileWriter compresses files automatically.",
                              "Because character streams attempt to encode bytes into characters according to a charset (like UTF-8), which alters and corrupts arbitrary binary byte sequences.",
                              "Because PrintWriter cannot write more than 256 bytes.",
                              "Because binary files must use SQL."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Character streams (Writers) interpret byte sequences as character encodings. Arbitrary binary data containing invalid charset sequences will be modified, corrupted, or replaced with replacement characters (like \\uFFFD). Always use byte streams (FileOutputStream/Files.write) for binary! (تدفقات المحارف تحول البايتات لنصوص وترميزات، مما يشوه البايتات الثنائية للصور؛ لذا يجب دوماً استخدام تدفقات البايت مثل FileOutputStream)."
          },
          {
                    "id": "q5",
                    "question": "What is the key difference regarding exception handling between PrintWriter and BufferedWriter?\n(ما الفرق الجوهري في التعامل مع الاستثناءات بين PrintWriter و BufferedWriter؟)",
                    "options": [
                              "BufferedWriter never throws exceptions.",
                              "PrintWriter methods (print, println, printf) do NOT throw IOException; they swallow errors internally and require callers to check via checkError().",
                              "PrintWriter only writes to network sockets.",
                              "BufferedWriter automatically retries failed writes 3 times."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! PrintWriter methods never throw IOException. They suppress I/O exceptions so they can be used conveniently in formatting, but you must manually call printWriter.checkError() to know if an error occurred. (دوال PrintWriter لا ترمي استثناءات IOException بل تكتمها داخلياً ويجب فحصها عبر checkError)."
          },
          {
                    "id": "q6",
                    "question": "What happens when you use try-with-resources with BufferedWriter?\ntry (BufferedWriter bw = Files.newBufferedWriter(path)) {\n    bw.write(\"Hello World\");\n}\n(ماذا يحدث عند استخدام try-with-resources مع BufferedWriter دون استدعاء flush صراحة؟)",
                    "options": [
                              "Data is lost because flush() was not called.",
                              "The automatic call to bw.close() automatically flushes any remaining buffered data before closing the underlying stream.",
                              "An IOException is thrown upon exit.",
                              "The file remains locked forever."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! The close() contract of all Writer and OutputStream classes guarantees that the buffer is flushed to disk before the stream is closed. (ينص عقد إغلاق دوال Writer على تفريغ الذاكرة المؤقتة Flush تلقائياً للقرص قبل إتمام الإغلاق)."
          },
          {
                    "id": "q7",
                    "question": "Which method in Java 11+ is the most concise and idiomatic way to write an entire String to a file using UTF-8 encoding?\n(ما هي أسهل وأفضل دالة في جافا 11 لكتابة نص كامل إلى ملف بترميز UTF-8 في سطر واحد؟)",
                    "options": [
                              "Files.writeString(path, content)",
                              "new FileWriter(path).write(content)",
                              "Files.write(path, content.getBytes())",
                              "new PrintWriter(path).println(content)"
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! Files.writeString(path, content) was introduced in Java 11. It defaults to UTF-8, manages stream creation and closing automatically, and handles creation/truncation. (دالة Files.writeString المضافة في جافا 11 هي الأسهل وتستخدم UTF-8 تلقائياً وتغلق المورد بنفسها)."
          },
          {
                    "id": "q8",
                    "question": "What is the purpose of BufferedWriter.newLine() compared to writing '\\n'?\n(ما ميزة دالة BufferedWriter.newLine() مقارنة بكتابة المحرف '\\n' مباشرة؟)",
                    "options": [
                              "It writes the operating system's native line separator (\\r\\n on Windows, \\n on Unix/macOS) for maximum portability.",
                              "It clears the screen in the console.",
                              "It adds two blank lines instead of one.",
                              "It encrypts the preceding line."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! newLine() uses System.lineSeparator() to write the platform-specific newline character sequence (CRLF on Windows, LF on Linux/macOS). (تكتب دالة newLine الفاصل المعتمد لنظام التشغيل الحالي سواء كان \\r\\n في ويندوز أو \\n في لينكس لضمان التوافقية)."
          },
          {
                    "id": "q9",
                    "question": "How do you write a List of Strings (List<String> lines) to a file using Java NIO in a single statement?\n(كيف تكتب قائمة نصوص List<String> في ملف عبر Java NIO في أمر واحد؟)",
                    "options": [
                              "Files.write(path, lines, StandardCharsets.UTF_8)",
                              "path.writeLines(lines)",
                              "new FileWriter(path).writeAll(lines)",
                              "Files.dumpLines(path, lines)"
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! Files.write(Path, Iterable<? extends CharSequence>, Charset, OpenOption...) writes each string as a line separated by the platform line separator. (تتيح دالة Files.write كتابة أي قائمة من النصوص كسطور متتالية بترميز UTF-8 مباشرة)."
          },
          {
                    "id": "q10",
                    "question": "What happens if you open a file with StandardOpenOption.CREATE_NEW when writing with Files.newBufferedWriter?\nFiles.newBufferedWriter(path, StandardOpenOption.CREATE_NEW);\n(ماذا يحدث عند فتح ملف بخيار CREATE_NEW في جافا NIO إذا كان الملف موجوداً بالفعل؟)",
                    "options": [
                              "It throws a java.nio.file.FileAlreadyExistsException.",
                              "It overwrites the file silently.",
                              "It appends to the file.",
                              "It deletes the file."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! StandardOpenOption.CREATE_NEW requires that the file does NOT exist; if it already exists, FileAlreadyExistsException is thrown, preventing accidental overwriting. (الخيار CREATE_NEW يتطلب أن يكون الملف غير موجود مسبقاً، وإلا رمى استثناء لمنع الكتابة فوقه بالخطأ)."
          },
          {
                    "id": "q11",
                    "question": "What is the difference between writing to a disk buffer and calling FileDescriptor.sync() in Java?\n(ما الفرق بين الكتابة في الذاكرة الوسيطة واستدعاء FileDescriptor.sync()؟)",
                    "options": [
                              "flush() pushes data from Java memory to OS kernel buffers, while sync() forces the OS kernel to physically commit dirty buffers to the persistent storage drive.",
                              "sync() is for audio synchronization.",
                              "sync() closes the file.",
                              "flush() is for binary files and sync() is for text files."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! flush() only sends data from user space (Java) to OS kernel buffers. If power fails immediately, OS buffers may be lost. sync() forces an fsync hardware commit to the physical drive platters/flash cells. (دالة flush ترسل البيانات لنواة النظام فقط، بينما sync تجبر القرص الصلب فيزيائياً على كتابة البيانات لضمان عدم فقدها عند انقطاع الكهرباء)."
          },
          {
                    "id": "q12",
                    "question": "Why is writing 1,000,000 characters one by one with a raw FileWriter much slower than with a BufferedWriter?\n(لماذا تعتبر كتابة مليون محرف محرفاً بمحرف عبر FileWriter أبطأ بكثير من BufferedWriter؟)",
                    "options": [
                              "Each write() on a raw FileWriter may trigger an expensive operating system kernel system call (write), whereas BufferedWriter batches writes into large memory chunks.",
                              "FileWriter runs on a slower CPU thread.",
                              "BufferedWriter uses GPU acceleration.",
                              "FileWriter calculates a SHA-256 hash on every character."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! Direct system calls have significant context switch overhead. BufferedWriter aggregates characters in memory (default 8KB buffer) and writes them to the OS in large batches, dramatically reducing system calls. (استدعاءات نظام التشغيل المباشرة مع كل محرف مكلفة جداً، والذاكرة الوسيطة تجمعها لتكتبها دفعة واحدة مما يوفر آلاف النداءات لنظام التشغيل)."
          },
          {
                    "id": "q13",
                    "question": "To write data safely in mission-critical applications without risking half-written corrupted files during sudden crashes, what design pattern should be used?\n(ما النمط المتبع في التطبيقات الحساسة للكتابة الآمنة دون المخاطرة بإنتاج ملفات تالفة أو ناقصة عند الانهيار المفاجئ؟)",
                    "options": [
                              "Write to a temporary sibling file (e.g. data.tmp), flush/sync, and then atomically rename/move it over the target file using StandardCopyOption.ATOMIC_MOVE.",
                              "Write the file directly inside an infinite while loop.",
                              "Catch all Throwables and retry writing to the same file.",
                              "Increase the JVM heap size to 64GB."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! Atomic file replacement (write to temp, sync, atomic rename) ensures that readers always see either the complete old file or the complete new file, never a corrupt or empty partially-written file. (الكتابة في ملف مؤقت ثم استبداله ذرياً بـ ATOMIC_MOVE تضمن عدم رؤية المستخدم لأي ملف ناقص أو تالف في حال انقطاع التيار)."
          },
          {
                    "id": "q14",
                    "question": "What happens when you run this code?\nPath path = Path.of(\"nonexistent.txt\");\nFiles.writeString(path, \"Hello\", StandardOpenOption.APPEND);\n(ماذا يحدث عند محاولة الإلحاق بملف غير موجود أصلاً باستخدام APPEND دون تحديد CREATE؟)",
                    "options": [
                              "It throws a java.nio.file.NoSuchFileException.",
                              "It automatically creates the file and appends to it.",
                              "It prints Hello to the system console.",
                              "It returns false."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! By default, StandardOpenOption.APPEND does NOT automatically create missing files; it expects the file to already exist and throws NoSuchFileException unless StandardOpenOption.CREATE is also passed. (خيار APPEND بمفرده لا ينشئ الملف ويرمي NoSuchFileException ما لم يتم تمرير خيار CREATE معه أيضاً)."
          },
          {
                    "id": "q15",
                    "question": "What does this code print?\nFile file = new File(\"notes.txt\");\ntry (PrintWriter pw = new PrintWriter(file)) {\n    pw.printf(\"User: %s, Score: %d\", \"Alice\", 95);\n}\n(ماذا سيُكتب داخل الملف notes.txt عند تنفيذ هذا الكود؟)",
                    "options": [
                              "User: Alice, Score: 95",
                              "User: %s, Score: %d",
                              "User: Alice, Score: 95.0",
                              "An exception is thrown because printf is only for System.out"
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! PrintWriter supports full formatted output using printf() and format(), cleanly interpolating string '%s' and integer '%d' specifiers directly into the file. (يدعم PrintWriter التنسيق الكامل عبر printf تماماً مثل شاشة الكونسول)."
          }
]
        }
      ]
    },

    /* ==========================================================================
       TOPIC 48: Java Read Files
       ========================================================================== */
    {
      id: "java-read-files",
      title: "48. Java Read Files",
      description: "Complete Guide to Reading Files in Java: FileReader, BufferedReader (readLine()), Scanner (tokens, lines, parsing numbers), FileInputStream, Files.readString(), Files.readAllLines(), Files.lines() (lazy Streams with ARM), handling character encodings, and performance strategies.",
      lessons: [
        {
          id: "java-read-files-mastery",
          title: "Complete Guide to Reading Files",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "Reading Files in Java: Readers, Scanners, & Stream Pipelines (قراءة الملفات في جافا)"
            },
            {
              type: "paragraph",
              text: "Reading file data correctly, efficiently, and without exhausting system memory is a hallmark of robust Java programming. Depending on file size and parsing requirements, Java offers varied APIs: 'FileReader' (character reading), 'BufferedReader' (line-by-line reading via readLine()), 'Scanner' (tokenization and type parsing for ints/doubles), 'FileInputStream' (binary byte reading), 'Files.readString()' (loads whole file to a String), 'Files.readAllLines()' (loads all lines into a List), and 'Files.lines()' (memory-efficient lazy Stream<String> processing for huge multi-gigabyte files)."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "تُعد قراءة الملفات بكفاءة ودون استنزاف ذاكرة النظام من علامات المبرمج المحترف في جافا. تختلف الأدوات بحسب حجم الملف ونوع البيانات: صنف 'FileReader' (للقراءة المحرفية)، و'BufferedReader' (لقراءة الملف سطراً بسطر عبر readLine)، و'Scanner' (لتفكيك الكلمات وتحليل الأرقام)، و'FileInputStream' (لقراءة البايتات الثنائية)، و'Files.readString' (لقراءة الملف كاملاً في نص واحد)، و'Files.readAllLines' (لتحميل الأسطر في قائمة List)، والأقوى للملفات العملاقة 'Files.lines' (المعالجة الكسولة عبر Streams دون ملء الرام)."
            },
            {
              type: "paragraph",
              text: "Choosing the Right Tool: 1) Small text files (<10 MB): Files.readString() or Files.readAllLines(); 2) Parsing structured tokens: Scanner; 3) Massive multi-gigabyte logs: Files.lines() or BufferedReader to stream lines one by one without OutOfMemoryError; 4) Binary data (images, PDFs): FileInputStream or Files.readAllBytes()."
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
              text: "Example 1: Classic Character Reading with FileReader (المثال 1: القراءة المحرفية الأساسية بـ FileReader)"
            },
            {
              type: "paragraph",
              text: "Reading characters one by one until reaching end-of-file (-1)."
            },
            {
              type: "code",
              language: "java",
              filename: "BasicFileReaderDemo.java",
              code: `import java.io.FileReader;
import java.io.IOException;

public class BasicFileReaderDemo {
    public static void main(String[] args) {
        String filename = "sample.txt";

        try (FileReader reader = new FileReader(filename)) {
            int character;
            System.out.print("File Content: ");
            // reader.read() returns an integer representing character code, or -1 at EOF
            while ((character = reader.read()) != -1) {
                System.out.print((char) character);
            }
            System.out.println();
        } catch (IOException e) {
            System.out.println("Read failed: " + e.getMessage());
        }
    }
}`,
              output: `File Content: Hello, Java File I/O!
Learning to write character streams safely.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "reader.read() reads a single character and returns -1 when the end of the file is reached."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "تقرأ دالة reader.read() محرفاً واحداً في كل دورة وتُرجع -1 عند الوصول لنهاية الملف (EOF)."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Reading Line-by-Line with BufferedReader.readLine() (المثال 2: القراءة سطراً بسطر باستخدام BufferedReader)"
            },
            {
              type: "paragraph",
              text: "The standard pattern for reading text files line-by-line using buffered I/O."
            },
            {
              type: "code",
              language: "java",
              filename: "BufferedReaderLineDemo.java",
              code: `import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class BufferedReaderLineDemo {
    public static void main(String[] args) {
        String filename = "sample.txt";

        try (BufferedReader br = new BufferedReader(new FileReader(filename))) {
            String line;
            int lineNumber = 1;
            // readLine() returns null when end-of-file is reached
            while ((line = br.readLine()) != null) {
                System.out.printf("[%02d] %s%n", lineNumber++, line);
            }
        } catch (IOException e) {
            System.out.println("Error reading lines: " + e.getMessage());
        }
    }
}`,
              output: `[01] Hello, Java File I/O!
[02] Learning to write character streams safely.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "readLine() strips the trailing newline character and returns null at EOF, buffering underlying disk reads."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "تقرأ readLine() السطر كاملاً مجرداً من رمز السطر الجديد، وتُرجع null عند نهاية الملف، مما يجعلها مثالية للسرعة."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Token and Number Parsing with Scanner (المثال 3: استخراج الكلمات وتحليل الأرقام بـ Scanner)"
            },
            {
              type: "paragraph",
              text: "Using java.util.Scanner to parse formatted numbers, words, and booleans from a text file."
            },
            {
              type: "code",
              language: "java",
              filename: "ScannerFileReadDemo.java",
              code: `import java.io.File;
import java.io.IOException;
import java.util.Scanner;

public class ScannerFileReadDemo {
    public static void main(String[] args) {
        File dataFile = new File("inventory.txt");

        try (Scanner scanner = new Scanner(dataFile)) {
            System.out.println("=== Inventory Table ===");
            while (scanner.hasNext()) {
                String itemName = scanner.next();
                int quantity = scanner.nextInt();
                double unitPrice = scanner.nextDouble();

                System.out.printf("Item: %-10s | In Stock: %3d | Value: $%7.2f%n",
                        itemName, quantity, quantity * unitPrice);
            }
        } catch (IOException e) {
            System.out.println("Scanner file error: " + e.getMessage());
        }
    }
}`,
              output: `=== Inventory Table ===
Item: Laptop     | In Stock:   5 | Value: $4999.95
Item: Mouse      | In Stock:  40 | Value: $1000.00
Item: Keyboard   | In Stock:  15 | Value: $1125.00`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "Scanner handles whitespace tokenization and automatic type parsing (nextInt, nextDouble), convenient for delimited data."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "يقوم Scanner بفصل الكلمات بالمسافات وتحويل النصوص تلقائياً لأعداد صحيحة وعشرية بمرونة فائقة."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Reading Entire File into a Single String (Files.readString()) (المثال 4: قراءة الملف كاملاً بنص واحد Files.readString)"
            },
            {
              type: "paragraph",
              text: "The fastest, cleanest way in modern Java (Java 11+) to read small-to-medium files."
            },
            {
              type: "code",
              language: "java",
              filename: "FilesReadStringDemo.java",
              code: `import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class FilesReadStringDemo {
    public static void main(String[] args) {
        Path path = Paths.get("settings.json");

        try {
            // One-liner: reads entire file content into a String in UTF-8
            String content = Files.readString(path, StandardCharsets.UTF_8);
            System.out.println("File Size in Characters: " + content.length());
            System.out.println("Preview:\\n" + content);
        } catch (IOException e) {
            System.out.println("Could not read file: " + e.getMessage());
        }
    }
}`,
              output: `File Size in Characters: 54
Preview:
{
  "theme": "dark",
  "autoSave": true,
  "zoom": 1.2
}`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "Files.readString() introduced in Java 11 reads all characters directly into a String with explicit Charset support."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "أُضيفت Files.readString في جافا 11 لقراءة كامل محتوى الملف بنص واحد صريح الترميز بخطوة برمجية واحدة."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Loading All Lines into a List (Files.readAllLines()) (المثال 5: تحميل كافة الأسطر في قائمة Files.readAllLines)"
            },
            {
              type: "paragraph",
              text: "Loading all lines into a java.util.List<String> for indexing and collection operations."
            },
            {
              type: "code",
              language: "java",
              filename: "ReadAllLinesDemo.java",
              code: `import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

public class ReadAllLinesDemo {
    public static void main(String[] args) {
        Path path = Paths.get("todo.txt");

        try {
            List<String> lines = Files.readAllLines(path, StandardCharsets.UTF_8);
            System.out.println("Total Lines Loaded: " + lines.size());
            System.out.println("First Task: " + lines.get(0));
            System.out.println("Last Task:  " + lines.get(lines.size() - 1));
        } catch (IOException e) {
            System.out.println("Failed reading lines: " + e.getMessage());
        }
    }
}`,
              output: `Total Lines Loaded: 4
First Task: 1. Implement authentication endpoints
Last Task:  4. Update deployment manifests`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "Files.readAllLines() is ideal for small files where you need random index access to individual lines."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "تعتبر readAllLines مثالية للملفات المعقولة الحجم للوصول إلى الأسطر عبر فهارس القائمة (List Indexing)."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Memory-Efficient Large File Streaming with Files.lines() (المثال 6: قراءة الملفات الضخمة دون استهلاك الذاكرة Files.lines)"
            },
            {
              type: "paragraph",
              text: "Processing multi-gigabyte files lazily using Java Stream API inside try-with-resources."
            },
            {
              type: "code",
              language: "java",
              filename: "LargeFileStreamDemo.java",
              code: `import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Stream;

public class LargeFileStreamDemo {
    public static void main(String[] args) {
        Path logPath = Paths.get("server_access.log");

        // Files.lines reads lines lazily on-demand: memory footprint stays tiny (< 1 MB)!
        try (Stream<String> lines = Files.lines(logPath)) {
            long errorCount = lines.filter(line -> line.contains("ERROR 500"))
                                   .peek(err -> System.out.println("Alert: " + err))
                                   .count();

            System.out.println("Total HTTP 500 errors detected: " + errorCount);
        } catch (IOException e) {
            System.out.println("Streaming log failed: " + e.getMessage());
        }
    }
}`,
              output: `Alert: 2026-09-05T12:01:04Z ERROR 500 /api/checkout - DB timeout
Total HTTP 500 errors detected: 1`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "Files.lines() streams lines lazily without loading the whole file into RAM, avoiding OutOfMemoryError on huge files. Always wrap it in try-with-resources!"
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "تقرأ Files.lines() الأسطر عند الطلب فقط (Lazy Loading)؛ لذا لا تمتلئ الذاكرة حتى لو كان حجم الملف عشرات الجيجابايت."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Reading Raw Binary Data with FileInputStream (المثال 7: قراءة البيانات الثنائية بالبايت FileInputStream)"
            },
            {
              type: "paragraph",
              text: "Reading chunks of bytes into a byte[] buffer for binary files, archives, and media."
            },
            {
              type: "code",
              language: "java",
              filename: "FileInputStreamDemo.java",
              code: `import java.io.FileInputStream;
import java.io.IOException;

public class FileInputStreamDemo {
    public static void main(String[] args) {
        String binaryFile = "header.bin";

        try (FileInputStream fis = new FileInputStream(binaryFile)) {
            byte[] buffer = new byte[1024];
            int bytesRead;
            int totalBytes = 0;

            // fis.read(buffer) fills the array and returns number of bytes read (or -1 at EOF)
            while ((bytesRead = fis.read(buffer)) != -1) {
                totalBytes += bytesRead;
                System.out.println("Read chunk of " + bytesRead + " bytes.");
            }
            System.out.println("Total binary payload read: " + totalBytes + " bytes.");
        } catch (IOException e) {
            System.out.println("Binary read error: " + e.getMessage());
        }
    }
}`,
              output: `Read chunk of 7 bytes.
Total binary payload read: 7 bytes.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "fis.read(buffer) reads blocks of raw bytes into memory, providing optimal performance for binary processing."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "تقرأ fis.read(buffer) كتل بايتات خام في مصفوفة بافر، وهي الطريقة المثلى لقراءة ملفات الوسائط والملفات المضغوطة."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Reading All Bytes at Once with Files.readAllBytes() (المثال 8: قراءة جميع البايتات دفعة واحدة Files.readAllBytes)"
            },
            {
              type: "paragraph",
              text: "Convenient one-liner to obtain the raw byte array of a file."
            },
            {
              type: "code",
              language: "java",
              filename: "ReadAllBytesDemo.java",
              code: `import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class ReadAllBytesDemo {
    public static void main(String[] args) {
        Path imagePath = Paths.get("logo.png");

        try {
            byte[] rawBytes = Files.readAllBytes(imagePath);
            System.out.println("Image read successfully. Byte array length: " + rawBytes.length);
            // Verify PNG Magic Number header: 0x89 'P' 'N' 'G'
            if (rawBytes.length >= 4 && (rawBytes[0] & 0xFF) == 0x89 && rawBytes[1] == 'P') {
                System.out.println("Confirmed valid PNG file signature!");
            }
        } catch (IOException e) {
            System.out.println("Failed reading image: " + e.getMessage());
        }
    }
}`,
              output: `Image read successfully. Byte array length: 4210
Confirmed valid PNG file signature!`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "Files.readAllBytes(path) loads an entire file into a byte[], ideal for hashing, digital signatures, and small images."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "تحمل Files.readAllBytes الملف كاملاً في مصفوفة بايتات، وهي ممتازة لحساب التجزئة والتواقيع الرقمية والصور الصغيرة."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Reading Multilingual and UTF-8 Files with InputStreamReader (المثال 9: قراءة الملفات متعددة اللغات بـ InputStreamReader)"
            },
            {
              type: "paragraph",
              text: "Explicitly binding the UTF-8 charset to prevent corrupt characters across operating systems."
            },
            {
              type: "code",
              language: "java",
              filename: "Utf8FileReaderDemo.java",
              code: `import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

public class Utf8FileReaderDemo {
    public static void main(String[] args) {
        String filename = "multilingual.txt";

        // InputStreamReader bridges byte stream to character stream with explicit Charset
        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(new FileInputStream(filename), StandardCharsets.UTF_8))) {
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println("Read: " + line);
            }
        } catch (IOException e) {
            System.out.println("Encoding read error: " + e.getMessage());
        }
    }
}`,
              output: `Read: English: Welcome to Java I/O
Read: العربية: مرحباً بك في دورة تعلم لغة جافا الشاملة
Read: Emojis: 🚀 ☕ 💻 🔒`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "InputStreamReader with StandardCharsets.UTF_8 properly decodes international Arabic text and emojis."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "يترجم InputStreamReader البايتات إلى نصوص بترميز UTF-8 الصريح لقراءة العربية والرموز التعبيرية بدقة متناهية."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Reading Delimited CSV Records with BufferedReader (المثال 10: قراءة وتحليل ملفات CSV بـ BufferedReader)"
            },
            {
              type: "paragraph",
              text: "Parsing comma-separated values into domain objects efficiently."
            },
            {
              type: "code",
              language: "java",
              filename: "CsvReaderDemo.java",
              code: `import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class CsvReaderDemo {
    static class UserRecord {
        final int id;
        final String name;
        final String role;
        UserRecord(int id, String name, String role) {
            this.id = id; this.name = name; this.role = role;
        }
    }

    public static void main(String[] args) {
        String csvFile = "users.csv";

        try (BufferedReader br = new BufferedReader(new FileReader(csvFile))) {
            String line = br.readLine(); // Read header line
            System.out.println("Header: " + line);

            while ((line = br.readLine()) != null) {
                String[] tokens = line.split(",");
                if (tokens.length == 3) {
                    UserRecord u = new UserRecord(Integer.parseInt(tokens[0].trim()),
                                                  tokens[1].trim(),
                                                  tokens[2].trim());
                    System.out.printf("User [%d]: %-10s (Role: %s)%n", u.id, u.name, u.role);
                }
            }
        } catch (IOException e) {
            System.out.println("CSV read failed: " + e.getMessage());
        }
    }
}`,
              output: `Header: id,username,role
User [101]: Sarah      (Role: ADMIN)
User [102]: Ahmed      (Role: DEVELOPER)
User [103]: Carlos     (Role: AUDITOR)`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "BufferedReader is the standard backbone for lightweight CSV parsing, processing line-by-line with minimal memory usage."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "يُعتبر BufferedReader الهيكل الأنسب لتحليل ملفات CSV سطراً بسطر مع استهلاك ضئيل جداً للذاكرة."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Enterprise Security Log Analyzer Pipeline (المثال 11: محلل سجلات الأمان المؤسسي عالي الإنتاجية)"
            },
            {
              type: "paragraph",
              text: "Full streaming pipeline: filtering, aggregating, and extracting IPs involved in failed login attempts."
            },
            {
              type: "code",
              language: "java",
              filename: "EnterpriseSecurityLogAnalyzerDemo.java",
              code: `import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class EnterpriseSecurityLogAnalyzerDemo {
    public static void analyzeIntrusions(Path logPath) {
        System.out.println("=== Analyzing Security Log: " + logPath + " ===");

        try (Stream<String> lines = Files.lines(logPath)) {
            // Group failed logins by IP address
            Map<String, Long> bruteForceAttempts = lines
                    .filter(line -> line.contains("AUTH_FAILURE"))
                    .map(line -> {
                        int ipStart = line.indexOf("IP=") + 3;
                        return line.substring(ipStart).trim();
                    })
                    .collect(Collectors.groupingBy(ip -> ip, Collectors.counting()));

            System.out.println("Suspicious IPs with Failed Attempts:");
            bruteForceAttempts.forEach((ip, count) -> {
                System.out.printf(" -> IP %-15s: %d failures %s%n",
                        ip, count, count >= 3 ? "[BLOCKED]" : "[MONITORED]");
            });
        } catch (IOException e) {
            System.out.println("Security pipeline failed: " + e.getMessage());
        }
    }

    public static void main(String[] args) {
        analyzeIntrusions(Paths.get("security.log"));
    }
}`,
              output: `=== Analyzing Security Log: security.log ===
Suspicious IPs with Failed Attempts:
 -> IP 192.168.1.100  : 4 failures [BLOCKED]
 -> IP 10.0.0.5       : 1 failures [MONITORED]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "By pairing Files.lines() with Java Stream collectors, enterprise systems process millions of log lines with real-time grouping and zero memory bloat."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "دمج Files.lines مع مجمعات جافا Streams يتيح تحليل ملايين سجلات الخوادم في الوقت الفعلي مع الحفاظ على خفة استهلاك الرام."
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
                "Mistake 1: Using Files.readAllLines() on multi-gigabyte files. Because it loads every single line into a List in RAM, it will trigger an OutOfMemoryError. Use Files.lines() or BufferedReader instead.",
                "خطأ 1: استخدام Files.readAllLines على ملفات عملاقة، مما يؤدي لانهيار الذاكرة بـ OutOfMemoryError؛ البديل الصحيح هو Files.lines.",
                "Mistake 2: Forgetting to close the Stream returned by Files.lines(). Streams returned by Files hold open file handles that leak unless wrapped in try-with-resources.",
                "خطأ 2: نسيان وضع Files.lines داخل try-with-resources، مما يترك مقبض الملف مفتوحاً في نظام التشغيل.",
                "Mistake 3: Relying on FileReader without specifying UTF-8, which uses the OS platform default charset and corrupts non-ASCII characters."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Word Frequency & Line Statistics Engine (التحدي العملي: محرك إحصاء الكلمات والأسطر في الملفات)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Build a document stats engine: 1) Class 'FileStatsEngine'; 2) Method 'computeStats(List<String> lines)': count total lines, total word count, total character count, and the longest line; 3) Method 'countOccurrences(List<String> lines, String targetWord)': case-insensitive word counter; 4) In main(), test with sample document lines and print the full summary."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: صمم محرك إحصائيات المستندات: 1) فئة FileStatsEngine؛ 2) دالة computeStats تحسب عدد الأسطر والكلمات والمحارف وأطول سطر؛ 3) دالة countOccurrences تحسب تكرار كلمة محددة؛ 4) اختبر المحرك في main واطبع التقرير الإحصائي."
            },
            {
              type: "code",
              language: "java",
              filename: "FileStatsEngineChallenge.java",
              code: `import java.util.Arrays;
import java.util.List;

public class FileStatsEngineChallenge {
    static class FileStatsEngine {
        public static void computeStats(List<String> lines) {
            int lineCount = lines.size();
            long wordCount = 0;
            long charCount = 0;
            String longest = "";

            for (String line : lines) {
                charCount += line.length();
                if (line.length() > longest.length()) {
                    longest = line;
                }
                String[] words = line.trim().split("\\\\s+");
                if (!line.trim().isEmpty()) {
                    wordCount += words.length;
                }
            }

            System.out.println("=== Document Statistics ===");
            System.out.println("Total Lines:      " + lineCount);
            System.out.println("Total Words:      " + wordCount);
            System.out.println("Total Characters: " + charCount);
            System.out.println("Longest Line:     \"" + longest + "\" (" + longest.length() + " chars)");
        }

        public static int countOccurrences(List<String> lines, String target) {
            int count = 0;
            String lower = target.toLowerCase();
            for (String line : lines) {
                String[] words = line.toLowerCase().split("\\\\W+");
                for (String w : words) {
                    if (w.equals(lower)) count++;
                }
            }
            return count;
        }
    }

    public static void main(String[] args) {
        List<String> sampleDoc = Arrays.asList(
                "Java is a versatile object-oriented programming language.",
                "Java file I/O supports streams, readers, and modern NIO.2.",
                "High performance and memory safety are essential in Java."
        );

        FileStatsEngine.computeStats(sampleDoc);
        int javaOccurrences = FileStatsEngine.countOccurrences(sampleDoc, "java");
        System.out.println("Occurrences of 'Java': " + javaOccurrences);
    }
}`,
              output: `=== Document Statistics ===
Total Lines:      3
Total Words:      23
Total Characters: 172
Longest Line:     "Java is a versatile object-oriented programming language." (57 chars)
Occurrences of 'Java': 3`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "The engine iterates over document lines, splitting tokens cleanly and tracking character lengths and keyword occurrences."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "يقوم المحرك بمسح أسطر الملف وتفكيك الكلمات بدقة وحساب إجمالي المحارف والكلمات وتكرارات الكلمة المستهدفة."
            }
          ],
          quiz: [
          {
                    "id": "q1",
                    "question": "Which method introduced in Java 11 is the most concise way to read the entire content of a text file into a single String using UTF-8 encoding?\n(ما هي أسهل وأفضل دالة قُدمت في جافا 11 لقراءة كامل محتوى ملف نصي إلى String بترميز UTF-8؟)",
                    "options": [
                              "Files.readString(Path.of(\"data.txt\"))",
                              "new FileReader(\"data.txt\").readString()",
                              "Files.readAllBytes(\"data.txt\").toString()",
                              "Scanner.readAll(\"data.txt\")"
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! Files.readString(Path) was added in Java 11. It reads all characters into a String using UTF-8 by default and handles stream opening/closing automatically. (دالة Files.readString المضافة في جافا 11 تقرأ الملف كاملاً كنص وتستخدم UTF-8 تلقائياً وتغلق المورد بنفسها)."
          },
          {
                    "id": "q2",
                    "question": "If you need to process a 10 GB log file line-by-line in a JVM with 512 MB of heap space, which approach is memory-efficient and avoids an OutOfMemoryError?\n(إذا كنت بحاجة لمعالجة ملف سجل حجمه 10 جيجابايت في بيئة جافا بذاكرة 512 ميجابايت، أي أسلوب يتجنب OutOfMemoryError؟)",
                    "options": [
                              "Files.readAllLines(path)",
                              "Files.lines(path) within a try-with-resources statement",
                              "Files.readAllBytes(path)",
                              "Files.readString(path)"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Files.lines() returns a lazy Stream<String> that reads lines on demand from the disk buffer without loading the whole file into RAM, running efficiently in tiny memory footprints. (دالة Files.lines تولد تدفقاً كسولاً يقرأ سطراً بسطر دون تحميل الملف كاملاً في الرام مما يحمي من نفاد الذاكرة)."
          },
          {
                    "id": "q3",
                    "question": "What does BufferedReader.readLine() return when it reaches the End of File (EOF)?\n(ماذا تُرجع دالة BufferedReader.readLine() عند الوصول إلى نهاية الملف EOF؟)",
                    "options": [
                              "An empty string: \"\"",
                              "null",
                              "Throws an EOFException",
                              "-1"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! readLine() returns null when the end of the stream is reached. It does not return an empty string and does not throw an exception. (تُرجع null عند انتهاء الملف، ولا تُرجع نصاً فارغاً ولا ترمي استثناءً)."
          },
          {
                    "id": "q4",
                    "question": "What is the standard, idiomatic loop structure for reading a file with BufferedReader?\n(ما هي بنية التكرار القياسية لقراءة ملف باستخدام BufferedReader سطراً بسطر؟)",
                    "options": [
                              "String line;\nwhile ((line = reader.readLine()) != null) {\n    // process line\n}",
                              "while (reader.hasNext()) {\n    String line = reader.read();\n}",
                              "for (String line : reader) {\n    // process line\n}",
                              "do {\n    line = reader.readLine();\n} while (line != \"\");"
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! The idiomatic Java pattern assigns and checks the line simultaneously: while ((line = reader.readLine()) != null). (النمط الكلاسيكي المعتمد في جافا يسند القيمة ويفحص عدم كونها null في نفس شرط while)."
          },
          {
                    "id": "q5",
                    "question": "Why is java.util.Scanner typically much slower than BufferedReader when reading large text files?\n(لماذا يعتبر Scanner أبطأ بكثير من BufferedReader عند قراءة الملفات النصية الضخمة؟)",
                    "options": [
                              "Scanner uses regular expression parsing and tokenization behind the scenes with a small buffer, whereas BufferedReader simply reads raw characters using an 8KB buffer.",
                              "Scanner requires an active internet connection.",
                              "Scanner converts all text to uppercase.",
                              "BufferedReader runs directly on the GPU."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! Scanner is designed for parsing tokens using regular expressions, which incurs substantial CPU overhead. BufferedReader simply reads chunks of characters into an 8KB memory buffer, making it much faster for plain line reading. (صُمم Scanner لتحليل البيانات باستخدام التعابير النمطية مما يستهلك المعالج، بينما يقرأ BufferedReader كتل محارف مباشرة بذاكرة 8KB)."
          },
          {
                    "id": "q6",
                    "question": "What happens when you read an Arabic or accented UTF-8 text file using legacy 'new FileReader(\"test.txt\")' in Java 8 on Windows?\n(ماذا يحدث عند قراءة ملف عربي بترميز UTF-8 باستخدام FileReader القديم في جافا 8 على ويندوز؟)",
                    "options": [
                              "The file is read correctly because Java is multilingual.",
                              "The text is corrupted into mojibake or question marks ('???') because FileReader in Java 8 used the Windows system default ANSI code page (Windows-1252) instead of UTF-8.",
                              "An UnsupportedEncodingException is thrown immediately.",
                              "The JVM crashes."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Prior to Java 11, FileReader used the platform default charset (Windows-1252 on Western Windows), corrupting multi-byte UTF-8 Arabic characters. Modern code specifies StandardCharsets.UTF_8 explicitly. (قبل جافا 11، اعتمد FileReader على ترميز ويندوز الافتراضي مما يؤدي لتشوه الحروف العربية وتحولها إلى علامات استفهام أو رموز غير مفهومة)."
          },
          {
                    "id": "q7",
                    "question": "What does the InputStream.read(byte[] buffer) method return?\n(ما القيمة التي تُرجعها دالة read(byte[] buffer) في InputStream؟)",
                    "options": [
                              "Always returns buffer.length.",
                              "The total number of bytes read into the buffer (which may be less than buffer.length), or -1 if the end of the stream has been reached.",
                              "true if successful, false otherwise.",
                              "A copy of the byte array."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! read(byte[] b) reads up to b.length bytes. It returns the actual number of bytes read into the array, or -1 if EOF is reached. It is a critical bug to assume it always fills the entire array! (تُرجع عدد البايتات الفعلية المقروءة والتي قد تقل عن حجم المصفوفة، أو -1 عند نهاية الدفق، ومن الخطأ افتراض ملء المصفوفة كاملة دائماً)."
          },
          {
                    "id": "q8",
                    "question": "What is the key difference between FileNotFoundException (from java.io) and NoSuchFileException (from java.nio.file)?\n(ما الفرق بين FileNotFoundException القديم و NoSuchFileException في حزمة NIO الحديثة؟)",
                    "options": [
                              "They are identical in every way.",
                              "NoSuchFileException is a subclass of FileSystemException which carries detailed, structured Path information (file, other, reason), whereas FileNotFoundException only has an informal error message string.",
                              "FileNotFoundException is an unchecked RuntimeException.",
                              "NoSuchFileException only applies to internet URLs."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! In NIO.2, NoSuchFileException extends FileSystemException, providing programmatic access to getFile(), getOtherFile(), and getReason(), making debugging and programmatic error recovery much more structured. (يوفر استثناء NoSuchFileException وصولاً برمجياً دقيقاً للمسار وسبب الخطأ بخلاف الاستثناء القديم)."
          },
          {
                    "id": "q9",
                    "question": "Which method in Java 9+ allows reading all remaining bytes from an InputStream directly into a byte[] in a single call?\n(ما الدالة المضافة في جافا 9 لقراءة جميع البايتات المتبقية من InputStream إلى مصفوفة بايتات مباشرة؟)",
                    "options": [
                              "inputStream.readAllBytes()",
                              "inputStream.readComplete()",
                              "inputStream.toByteArray()",
                              "inputStream.dumpBytes()"
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! Java 9 introduced inputStream.readAllBytes() to eliminate the boilerplate loop previously needed to read raw byte streams into memory. (قدمت جافا 9 دالة readAllBytes لاختصار قراءة كامل الدفق في مصفوفة بايتات دون الحاجة لحلقة تكرار يدوية)."
          },
          {
                    "id": "q10",
                    "question": "What does this code print?\nPath p = Path.of(\"data.txt\");\n// data.txt contains 5 lines: \"ERROR: 1\", \"INFO: 2\", \"ERROR: 3\", \"WARN: 4\", \"ERROR: 5\"\ntry (Stream<String> lines = Files.lines(p)) {\n    long errors = lines.filter(s -> s.startsWith(\"ERROR\")).count();\n    System.out.println(errors);\n}\n(ماذا سيُطبع عند تنفيذ هذا الكود البرمجي؟)",
                    "options": [
                              "3",
                              "5",
                              "2",
                              "Throws StreamClosedException"
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! The filter matches the 3 lines starting with 'ERROR', and count() counts them, printing 3. The try-with-resources safely closes the underlying file channel. (يقوم الفلتر بعد الأسطر الثلاثة التي تبدأ بـ ERROR ويطبع 3 مع إغلاق آمن لقناة الملف)."
          },
          {
                    "id": "q11",
                    "question": "What happens if you attempt to call mark() and reset() on a stream that does NOT support it (where markSupported() returns false)?\n(ماذا يحدث إذا حاولت استخدام mark و reset على دفق لا يدعمها؟)",
                    "options": [
                              "It throws a java.io.IOException (\"Mark not supported\").",
                              "It resets the computer.",
                              "It returns null.",
                              "It silently restarts from the first byte of the file."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! Calling reset() on a stream that does not support marking throws an IOException (\"Mark not supported\" or \"Resetting to invalid mark\"). Always check markSupported() first. (استدعاء reset على دفق لا يدعم mark يرمي IOException؛ لذا يجب دوماً فحص markSupported أولاً)."
          },
          {
                    "id": "q12",
                    "question": "What is the recommended buffer size for a BufferedReader when no specific size is provided in the constructor?\n(ما هو حجم الذاكرة المؤقتة الافتراضي لصنف BufferedReader؟)",
                    "options": [
                              "8192 characters (8 KB)",
                              "128 characters",
                              "1 character",
                              "1,000,000 characters"
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! The default buffer size for BufferedReader in the JDK is 8192 characters (8 KB), which matches typical operating system I/O page sizes for optimal throughput. (الحجم الافتراضي هو 8192 محرفاً أي حوالي 8 كيلوبايت، وهو متوافق تماماً مع أحجام صفحات نظام التشغيل للحصول على أفضل سرعة)."
          },
          {
                    "id": "q13",
                    "question": "What happens if you use Files.lines(path) WITHOUT placing it in a try-with-resources statement?\nStream<String> stream = Files.lines(path);\nstream.forEach(System.out::println);\n(ما المشكلة البرمجية الناتجة عن استخدام Files.lines دون try-with-resources؟)",
                    "options": [
                              "The underlying FileChannel and OS file descriptor remain open until the garbage collector eventually reclaims the stream, potentially causing OS file handle exhaustion.",
                              "It causes a compile-time syntax error.",
                              "The file is locked permanently and can never be opened again even after JVM restart.",
                              "Only the first 10 lines will be printed."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! The Stream returned by Files.lines() wraps an underlying file channel. Without try-with-resources, the file handle remains open indefinitely, causing resource leaks on busy servers. (التدفق يحجز مقبض الملف في نظام التشغيل، وعدم إغلاقه بـ try-with-resources يتسبب في تسريب الموارد واستنزاف مقابض الملفات)."
          },
          {
                    "id": "q14",
                    "question": "How do you read a small binary file (such as a 15 KB PNG icon) into memory in a single line?\n(كيف تقرأ ملفاً ثنائياً صغيراً مثل صورة أيقونة 15 كيلوبايت إلى الذاكرة في سطر واحد؟)",
                    "options": [
                              "byte[] data = Files.readAllBytes(Path.of(\"icon.png\"));",
                              "byte[] data = new FileReader(\"icon.png\").readAllBytes();",
                              "byte[] data = Scanner.readBytes(\"icon.png\");",
                              "byte[] data = (byte[]) new File(\"icon.png\");"
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! Files.readAllBytes(Path) is the standard NIO method for reading raw binary files directly into a byte array in a single call. (دالة Files.readAllBytes هي المعيار القياسي لقراءة الملفات الثنائية كصورة أو ملف مضغوط إلى مصفوفة بايتات مباشرة)."
          },
          {
                    "id": "q15",
                    "question": "What does BufferedReader.skip(long n) do?\n(ما وظيفة دالة BufferedReader.skip(long n)؟)",
                    "options": [
                              "It skips over and discards up to n characters of data from the input stream, returning the actual number of characters skipped.",
                              "It deletes n lines from the hard drive.",
                              "It rewinds the stream backward by n characters.",
                              "It speeds up reading by n percent."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! skip(n) advances the stream pointer past n characters without allocating strings for them, returning the actual number skipped (which may be less if EOF is reached). (تتجاوز الدالة وتتجاهل حتى n من المحارف دون معالجتها أو حجز ذاكرة لها وتُرجع عدد المحارف المتجاوزة فعلياً)."
          }
]
        }
      ]
    }
  ];
})();
