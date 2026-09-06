/**
 * Java Curriculum Module - Part 28
 * Topics:
 * 55. Java BufferedWriter
 * 56. Java Data Structures
 * 
 * 100% Offline, Pure JavaScript. Complete educational content with full bilingual (English & Arabic) explanations.
 */

(function () {
  'use strict';

  window.JAVA_TOPICS_PART28 = [
    /* ==========================================================================
       TOPIC 55: Java BufferedWriter
       ========================================================================== */
    {
      id: "java-bufferedwriter",
      title: "55. Java BufferedWriter",
      description: "Complete Guide to Java BufferedWriter: 8192-char in-memory buffering, platform-independent newLine(), writing strings and char arrays, append mode, flushing buffers, performance comparison with raw FileWriter, and modern NIO Files.newBufferedWriter.",
      lessons: [
        {
          id: "java-bufferedwriter-mastery",
          title: "Complete Guide to Java BufferedWriter",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "High-Performance Character Output with BufferedWriter (الكتابة النصية عالية الكفاءة عبر BufferedWriter)"
            },
            {
              type: "paragraph",
              text: "BufferedWriter writes text to a character-output stream, buffering characters to provide for the efficient writing of single characters, arrays, and strings. By default, it allocates an 8,192-character internal buffer in RAM. Instead of invoking native operating system file writes for every small text string, BufferedWriter batches characters and flushes them to the physical disk only when the buffer is full or when flush()/close() is invoked. It also provides the vital 'newLine()' method, which automatically emits the platform-specific line separator (CRLF on Windows, LF on Linux/macOS)."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "تُعد فئة BufferedWriter الصنف الأساسي في جافا لكتابة النصوص بكفاءة عالية وسرعة فائقة من خلال التخزين المؤقت (Buffering) في الذاكرة (بحجم افتراضي 8,192 محرفاً). بدلاً من استدعاء عمليات الكتابة البطيئة على القرص الصلب لكل جملة صغيرة، يجمع BufferedWriter النصوص في الرام ويكتبها دفعة واحدة عند امتلاء المخزن أو استدعاء flush() أو close(). كما يوفر دالة 'newLine()' الهامة التي تكتب فاصل السطر الخاص بنظام التشغيل الحالي تلقائياً (\\r\\n في ويندوز و \\n في لينكس وماك)."
            },
            {
              type: "paragraph",
              text: "Core Architectural Rules: 1) Cross-Platform Line Feeds: Never hardcode '\\n' if Windows compatibility is required; use bw.newLine() or System.lineSeparator(); 2) Mandatory Flushing: Data in the buffer is lost if the application exits abruptly without closing or flushing; 3) Decorator Harmony: Wrap around FileWriter, OutputStreamWriter, or use Files.newBufferedWriter()."
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
              text: "Example 1: Basic Writing & Cross-Platform newLine() (المثال 1: الكتابة الأساسية وفاصل الأسطر التلقائي newLine)"
            },
            {
              type: "paragraph",
              text: "Writing multiple lines of text using bw.write() and bw.newLine()."
            },
            {
              type: "code",
              language: "java",
              filename: "BasicBufferedWriterDemo.java",
              code: `import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;

public class BasicBufferedWriterDemo {
    public static void main(String[] args) throws IOException {
        File file = File.createTempFile("bw_basic_", ".txt");
        file.deleteOnExit();

        try (BufferedWriter bw = new BufferedWriter(new FileWriter(file))) {
            bw.write("Line 1: High-performance text streaming.");
            bw.newLine(); // Platform-independent newline (\\n or \\r\\n)
            bw.write("Line 2: Buffering dramatically accelerates disk output.");
            bw.newLine();
            bw.write("Line 3: Finished cleanly.");
        }

        System.out.println("Written content verified:");
        Files.readAllLines(file.toPath()).forEach(System.out::println);
    }
}`,
              output: `Written content verified:
Line 1: High-performance text streaming.
Line 2: Buffering dramatically accelerates disk output.
Line 3: Finished cleanly.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "bw.newLine() uses System.lineSeparator() internally, ensuring your files look correct whether opened on Windows, Linux, or macOS."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "تستخدم دالة newLine() فاصل الأسطر الخاص بنظام التشغيل المستضيف تلقائياً؛ مما يضمن توافق الملفات عبر جميع الأنظمة."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Appending to Files in BufferedWriter (المثال 2: الكتابة في وضع الإلحاق لحفظ السجلات)"
            },
            {
              type: "paragraph",
              text: "Enabling append mode by configuring the underlying FileWriter(file, true)."
            },
            {
              type: "code",
              language: "java",
              filename: "AppendBufferedWriterDemo.java",
              code: `import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;

public class AppendBufferedWriterDemo {
    public static void main(String[] args) throws IOException {
        File logFile = File.createTempFile("service_events_", ".log");
        logFile.deleteOnExit();

        // 1. Initial write
        try (BufferedWriter bw = new BufferedWriter(new FileWriter(logFile))) {
            bw.write("[BOOT] Server initialized.");
            bw.newLine();
        }

        // 2. Append mode: pass true to FileWriter
        try (BufferedWriter bw = new BufferedWriter(new FileWriter(logFile, true))) {
            bw.write("[AUTH] User 'admin' logged in.");
            bw.newLine();
            bw.write("[SHUTDOWN] Maintenance triggered.");
            bw.newLine();
        }

        System.out.println("Combined log lines:");
        Files.readAllLines(logFile.toPath()).forEach(l -> System.out.println("  " + l));
    }
}`,
              output: `Combined log lines:
  [BOOT] Server initialized.
  [AUTH] User 'admin' logged in.
  [SHUTDOWN] Maintenance triggered.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "BufferedWriter itself does not manage append mode; it inherits this behavior from the wrapped FileWriter(file, true)."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "لا يحدد BufferedWriter وضع الإلحاق بنفسه بل يستمد هذا السلوك من فئة FileWriter(file, true) المغلفة بداخله."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Performance Benchmark: Raw FileWriter vs BufferedWriter (المثال 3: مقارنة السرعة بين FileWriter و BufferedWriter)"
            },
            {
              type: "paragraph",
              text: "Measuring the massive speed advantage of buffering 50,000 text lines."
            },
            {
              type: "code",
              language: "java",
              filename: "BufferedWriterBenchmarkDemo.java",
              code: `import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

public class BufferedWriterBenchmarkDemo {
    public static void main(String[] args) throws IOException {
        File file1 = File.createTempFile("unbuffered_", ".txt");
        File file2 = File.createTempFile("buffered_", ".txt");
        file1.deleteOnExit();
        file2.deleteOnExit();

        int lines = 50_000;

        // 1. Unbuffered FileWriter
        long startUnbuf = System.currentTimeMillis();
        try (FileWriter fw = new FileWriter(file1)) {
            for (int i = 0; i < lines; i++) {
                fw.write("Line index " + i + "\\n");
            }
        }
        long timeUnbuf = System.currentTimeMillis() - startUnbuf;

        // 2. Buffered BufferedWriter
        long startBuf = System.currentTimeMillis();
        try (BufferedWriter bw = new BufferedWriter(new FileWriter(file2))) {
            for (int i = 0; i < lines; i++) {
                bw.write("Line index " + i);
                bw.newLine();
            }
        }
        long timeBuf = System.currentTimeMillis() - startBuf;

        System.out.println("Unbuffered FileWriter Time:   " + timeUnbuf + " ms");
        System.out.println("Buffered BufferedWriter Time: " + timeBuf + " ms");
        System.out.println("Speedup factor: " + (timeUnbuf / Math.max(1, timeBuf)) + "x faster!");
    }
}`,
              output: `Unbuffered FileWriter Time:   145 ms
Buffered BufferedWriter Time: 18 ms
Speedup factor: 8x faster!`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "BufferedWriter batches thousands of string operations in RAM before writing, reducing expensive native disk I/O calls."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "يجمع BufferedWriter آلاف النصوص في الذاكرة المؤقتة، مما يقلل استدعاءات القرص البطيئة ويسرع الإخراج بعدة أضعاف."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Writing Substrings with write(String, off, len) (المثال 4: كتابة جزء محدد من النص الأصلي)"
            },
            {
              type: "paragraph",
              text: "Writing a slice of a string directly to disk without creating substring objects."
            },
            {
              type: "code",
              language: "java",
              filename: "SubstringWriteDemo.java",
              code: `import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;

public class SubstringWriteDemo {
    public static void main(String[] args) throws IOException {
        File file = File.createTempFile("substring_demo_", ".txt");
        file.deleteOnExit();

        String rawHeader = "TIMESTAMP=2026-09-05;USER=SarahConnor;ROLE=Leader;";

        try (BufferedWriter bw = new BufferedWriter(new FileWriter(file))) {
            // Write only "USER=SarahConnor" (starts at index 21, length 16)
            bw.write(rawHeader, 21, 16);
            bw.newLine();
        }

        System.out.println("Content written to file:");
        Files.readAllLines(file.toPath()).forEach(System.out::println);
    }
}`,
              output: `Content written to file:
USER=SarahConnor`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "bw.write(str, off, len) writes slices directly without calling str.substring(), avoiding redundant heap object allocations."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "تكتب bw.write(str, off, len) أجزاء النصوص مباشرة دون استدعاء substring()، مما يوفر استهلاك الذاكرة وتخصيص الكائنات."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Modern NIO Files.newBufferedWriter() with UTF-8 (المثال 5: الطريقة الحديثة عبر Files.newBufferedWriter)"
            },
            {
              type: "paragraph",
              text: "Using java.nio.file.Files with StandardCharsets.UTF_8."
            },
            {
              type: "code",
              language: "java",
              filename: "NioBufferedWriterDemo.java",
              code: `import java.io.BufferedWriter;
import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;

public class NioBufferedWriterDemo {
    public static void main(String[] args) throws IOException {
        File file = File.createTempFile("modern_nio_bw_", ".txt");
        file.deleteOnExit();
        Path path = file.toPath();

        // Modern NIO.2 pattern: specifies Path, Charset, and Open Options
        try (BufferedWriter bw = Files.newBufferedWriter(path, StandardCharsets.UTF_8,
                StandardOpenOption.CREATE, StandardOpenOption.APPEND)) {

            bw.write("Standard UTF-8 multilingual text: مرحباً بكم في جافا الحديثة!");
            bw.newLine();
            bw.write("Second line generated via NIO.2.");
            bw.newLine();
        }

        System.out.println("File length: " + Files.size(path) + " bytes.");
        Files.readAllLines(path, StandardCharsets.UTF_8).forEach(System.out::println);
    }
}`,
              output: `File length: 119 bytes.
Standard UTF-8 multilingual text: مرحباً بكم في جافا الحديثة!
Second line generated via NIO.2.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "Files.newBufferedWriter(path, charset, options) is the industry standard in modern Java, ensuring explicit encoding and robust option flags."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "تُعد Files.newBufferedWriter المعيار الصناعي الحديث في جافا؛ حيث تضمن تحديد ترميز UTF-8 بدقة وخيارات فتح متعددة."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Manual Flushing with flush() (المثال 6: التفريغ اليدوي للمخزن المؤقت)"
            },
            {
              type: "paragraph",
              text: "Pushing buffered text to disk before long-running tasks without closing the stream."
            },
            {
              type: "code",
              language: "java",
              filename: "ManualFlushDemo.java",
              code: `import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

public class ManualFlushDemo {
    public static void main(String[] args) throws IOException {
        File file = File.createTempFile("flush_test_", ".txt");
        file.deleteOnExit();

        BufferedWriter bw = new BufferedWriter(new FileWriter(file));
        bw.write("Small status message."); // 21 chars, far below 8192 buffer threshold

        System.out.println("File length on disk BEFORE flush: " + file.length() + " bytes");

        // Force buffer to empty into file
        bw.flush();

        System.out.println("File length on disk AFTER flush:  " + file.length() + " bytes");

        bw.close();
    }
}`,
              output: `File length on disk BEFORE flush: 0 bytes
File length on disk AFTER flush:  21 bytes`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "Without flush(), small writes remain held in memory until the 8KB buffer fills up or the writer is closed."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "بدون استدعاء flush()، تظل الكتابات الصغيرة معلقة في الذاكرة ولا تظهر على القرص حتى يمتلئ المخزن أو يُغلق الكاتب."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Writing Character Arrays with write(char[]) (المثال 7: كتابة مصفوفات المحارف مباشرة)"
            },
            {
              type: "paragraph",
              text: "Emitting char[] arrays and slices into the buffered output stream."
            },
            {
              type: "code",
              language: "java",
              filename: "CharArrayWriteDemo.java",
              code: `import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;

public class CharArrayWriteDemo {
    public static void main(String[] args) throws IOException {
        File file = File.createTempFile("char_array_", ".txt");
        file.deleteOnExit();

        char[] chars = { 'J', 'A', 'V', 'A', '-', '2', '1', '!', '!', '!' };

        try (BufferedWriter bw = new BufferedWriter(new FileWriter(file))) {
            // 1. Write entire char array
            bw.write(chars);
            bw.newLine();

            // 2. Write sub-array (offset 0, length 7 -> "JAVA-21")
            bw.write(chars, 0, 7);
            bw.newLine();
        }

        System.out.println("File contents:");
        Files.readAllLines(file.toPath()).forEach(System.out::println);
    }
}`,
              output: `File contents:
JAVA-21!!!
JAVA-21`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "BufferedWriter accepts raw char[] arrays, which is useful when working with sensitive data like passwords that shouldn't be stored in immutable Strings."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "يقبل BufferedWriter مصفوفات char[] مباشرة، وهو أمر مفيد عند التعامل مع كلمات المرور التي يُفضل عدم تخزينها كنصوص غير قابلة للتعديل."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Custom Buffer Capacity for Enterprise Workloads (المثال 8: تخصيص سعة المخزن للأحمال الضخمة)"
            },
            {
              type: "paragraph",
              text: "Configuring a 64KB character buffer (65,536 chars) for massive export jobs."
            },
            {
              type: "code",
              language: "java",
              filename: "CustomBufferCapacityDemo.java",
              code: `import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

public class CustomBufferCapacityDemo {
    public static void main(String[] args) throws IOException {
        File exportFile = File.createTempFile("bulk_export_", ".csv");
        exportFile.deleteOnExit();

        int bufferSizeChars = 64 * 1024; // 64K characters buffer

        try (BufferedWriter bw = new BufferedWriter(new FileWriter(exportFile), bufferSizeChars)) {
            bw.write("transaction_id,account_id,amount,status");
            bw.newLine();

            for (int i = 1; i <= 10_000; i++) {
                bw.write("TX" + i + ",ACC" + (1000 + i) + "," + (i * 1.25) + ",CONFIRMED");
                bw.newLine();
            }
        }

        System.out.println("Export complete: " + exportFile.length() + " bytes written with 64KB buffer.");
    }
}`,
              output: `Export complete: 418894 bytes written with 64KB buffer.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "The two-argument constructor BufferedWriter(writer, size) allows setting larger buffers for bulk data export routines."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "يتيح المنشئ ذو المعاملين تحديد حجم بفر كبير لمطابقة احتياجات تصدير البيانات الضخمة بأعلى كفاءة ممكنة."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Generating Formatted HTML / XML Documents (المثال 9: توليد مستندات HTML و XML منسقة برمجياً)"
            },
            {
              type: "paragraph",
              text: "Constructing structured markup documents with clean indented lines."
            },
            {
              type: "code",
              language: "java",
              filename: "HtmlGeneratorDemo.java",
              code: `import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;

public class HtmlGeneratorDemo {
    public static void main(String[] args) throws IOException {
        File htmlFile = File.createTempFile("report_", ".html");
        htmlFile.deleteOnExit();

        try (BufferedWriter bw = new BufferedWriter(new FileWriter(htmlFile))) {
            bw.write("<!DOCTYPE html>");
            bw.newLine();
            bw.write("<html lang=\\"en\\">");
            bw.newLine();
            bw.write("  <head><title>System Report</title></head>");
            bw.newLine();
            bw.write("  <body>");
            bw.newLine();
            bw.write("    <h1>Execution Metrics</h1>");
            bw.newLine();
            bw.write("    <p>Status: <strong>Operational</strong></p>");
            bw.newLine();
            bw.write("  </body>");
            bw.newLine();
            bw.write("</html>");
            bw.newLine();
        }

        System.out.println("Generated HTML file (" + htmlFile.length() + " bytes):");
        Files.readAllLines(htmlFile.toPath()).forEach(System.out::println);
    }
}`,
              output: `Generated HTML file (179 bytes):
<!DOCTYPE html>
<html lang="en">
  <head><title>System Report</title></head>
  <body>
    <h1>Execution Metrics</h1>
    <p>Status: <strong>Operational</strong></p>
  </body>
</html>`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "BufferedWriter is well-suited for code and template generators, emitting clean lines and markup structures with minimal overhead."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "يُعتبر BufferedWriter ممتازاً لبناء مولدات الشفرات وملفات الويب وتصدير وسوم HTML بسلاسة وسرعة."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Combining with OutputStreamWriter for Internationalization (المثال 10: التكامل مع OutputStreamWriter لدعم اللغات)"
            },
            {
              type: "paragraph",
              text: "Pairing with FileOutputStream and OutputStreamWriter for strict UTF-8 control."
            },
            {
              type: "code",
              language: "java",
              filename: "I18nWriterDemo.java",
              code: `import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;

public class I18nWriterDemo {
    public static void main(String[] args) throws IOException {
        File file = File.createTempFile("i18n_", ".txt");
        file.deleteOnExit();

        // Chaining: FileOutputStream -> OutputStreamWriter(UTF-8) -> BufferedWriter
        try (BufferedWriter bw = new BufferedWriter(
                new OutputStreamWriter(new FileOutputStream(file), StandardCharsets.UTF_8))) {

            bw.write("English: Hello World");
            bw.newLine();
            bw.write("العربية: أهلاً وسهلاً بكم في عالم البرمجة");
            bw.newLine();
            bw.write("日本語: こんにちは世界");
            bw.newLine();
        }

        System.out.println("File decoded back with UTF-8:");
        Files.readAllLines(file.toPath(), StandardCharsets.UTF_8).forEach(System.out::println);
    }
}`,
              output: `File decoded back with UTF-8:
English: Hello World
العربية: أهلاً وسهلاً بكم في عالم البرمجة
日本語: こんにちは世界`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "Chaining FileOutputStream -> OutputStreamWriter -> BufferedWriter allows complete control over character encoding, supporting any language or script."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "سلسلة المجاري تمنح تحكماً مطلقاً في ترميز الحروف، مما يضمن حفظ النصوص العربية واليابانية والإنجليزية بأمان تام."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Auto-Flushing Line Writer Helper (المثال 11: كاتب أسطر يفرغ المخزن تلقائياً بعد كل سطر)"
            },
            {
              type: "paragraph",
              text: "Encapsulating auto-flushing behavior for interactive consoles or network sockets."
            },
            {
              type: "code",
              language: "java",
              filename: "AutoFlushLineWriterDemo.java",
              code: `import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;

public class AutoFlushLineWriterDemo {
    static class InteractiveLineWriter implements AutoCloseable {
        private final BufferedWriter writer;

        public InteractiveLineWriter(File file) throws IOException {
            this.writer = new BufferedWriter(new FileWriter(file));
        }

        public void writeLineAndFlush(String line) throws IOException {
            writer.write(line);
            writer.newLine();
            writer.flush(); // Guaranteed immediate availability
        }

        @Override
        public void close() throws IOException {
            writer.close();
        }
    }

    public static void main(String[] args) throws IOException {
        File session = File.createTempFile("session_", ".log");
        session.deleteOnExit();

        try (InteractiveLineWriter ilw = new InteractiveLineWriter(session)) {
            ilw.writeLineAndFlush("Command 1: CONNECT");
            System.out.println("Command 1 flushed to disk. Size: " + session.length() + " bytes.");

            ilw.writeLineAndFlush("Command 2: QUERY SELECT * FROM USERS");
            System.out.println("Command 2 flushed to disk. Size: " + session.length() + " bytes.");
        }

        System.out.println("Session finalized successfully.");
    }
}`,
              output: `Command 1 flushed to disk. Size: 19 bytes.
Command 2 flushed to disk. Size: 56 bytes.
Session finalized successfully.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "Pairing bw.newLine() with bw.flush() ensures each line is visible immediately to external readers or monitoring tools."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "دمج newLine() مع flush() يضمن ظهور السطور فوراً لبرامج المراقبة الخارجية دون انتظار انتهاء البرنامج."
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
                "Mistake 1: Hardcoding '\\n' instead of calling bw.newLine(). On Windows, notepad might display all text on a single unbroken line if CRLF is expected.",
                "خطأ 1: كتابة '\\n' يدوياً بدلاً من استدعاء bw.newLine()؛ مما قد يفسد فواصل الأسطر عند فتح الملف على أنظمة ويندوز.",
                "Mistake 2: Forgetting to close or flush the BufferedWriter. Because it buffers up to 8KB, unwritten data at the end of the file will simply be lost!",
                "خطأ 2: نسيان إغلاق أو تفريغ كائن BufferedWriter؛ فالبيانات تظل في الذاكرة (حتى 8KB) وتضيع عند إغلاق البرنامج.",
                "Mistake 3: Using FileWriter without specifying StandardCharsets.UTF_8 on Java versions older than 18.",
                "خطأ 3: استخدام FileWriter دون تحديد UTF-8 على الإصدارات الأقدم من جافا 18 مما يسبب مشاكل في حفظ الحروف غير اللاتينية.",
                "Mistake 4: Passing append=true to BufferedWriter instead of the underlying FileWriter or StandardOpenOption."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Thread-Safe Buffered CSV Writer (التحدي العملي: كاتب ملفات CSV آمن في بيئة تعدد الخيوط)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Create a class 'ThreadSafeCsvWriter' wrapping a BufferedWriter. It provides a synchronized method 'writeRow(String... columns)' that joins column values with commas, escapes any internal commas with quotes if necessary, writes the row, adds a platform newline, and flushes every 5 rows. Test in main() with sample rows and print the file output."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: صمم فئة ThreadSafeCsvWriter تغلف كائن BufferedWriter، وتوفر دالة متزامنة writeRow(String... columns) لدمج الأعمدة بفواصل وكتابة السطر مع تفريغ البفر كل 5 صفوف. اختبرها في main على بيانات تجريبية واطبع محتوى الملف النهائي."
            },
            {
              type: "code",
              language: "java",
              filename: "ThreadSafeCsvWriterChallenge.java",
              code: `import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;

public class ThreadSafeCsvWriterChallenge {
    static class ThreadSafeCsvWriter implements AutoCloseable {
        private final BufferedWriter writer;
        private int rowCount = 0;

        public ThreadSafeCsvWriter(File file) throws IOException {
            this.writer = new BufferedWriter(new FileWriter(file));
        }

        public synchronized void writeRow(String... columns) throws IOException {
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < columns.length; i++) {
                String col = columns[i];
                if (col.contains(",")) {
                    sb.append('"').append(col).append('"');
                } else {
                    sb.append(col);
                }
                if (i < columns.length - 1) {
                    sb.append(',');
                }
            }
            writer.write(sb.toString());
            writer.newLine();
            rowCount++;

            if (rowCount % 5 == 0) {
                writer.flush();
                System.out.println("Flushed at row count: " + rowCount);
            }
        }

        @Override
        public synchronized void close() throws IOException {
            writer.close();
        }
    }

    public static void main(String[] args) throws IOException {
        File csv = File.createTempFile("challenge_csv_", ".csv");
        csv.deleteOnExit();

        try (ThreadSafeCsvWriter csvWriter = new ThreadSafeCsvWriter(csv)) {
            csvWriter.writeRow("id", "product", "price");
            csvWriter.writeRow("1", "Keyboard, Mechanical", "89.99");
            csvWriter.writeRow("2", "Mouse, Optical", "29.99");
            csvWriter.writeRow("3", "Monitor 27-inch", "249.99");
            csvWriter.writeRow("4", "USB Cable", "9.99");
            csvWriter.writeRow("5", "Webcam, 4K", "129.99");
        }

        System.out.println("=== Generated CSV File ===");
        Files.readAllLines(csv.toPath()).forEach(System.out::println);
    }
}`,
              output: `Flushed at row count: 5
=== Generated CSV File ===
id,product,price
1,"Keyboard, Mechanical",89.99
2,"Mouse, Optical",29.99
3,Monitor 27-inch,249.99
4,USB Cable,9.99
5,"Webcam, 4K",129.99`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "The method synchronizes access, encloses values containing commas in quotation marks, emits rows with newLine(), and flushes every 5 rows to maintain disk synchronization."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "تؤمّن الدالة الوصول المتزامن (synchronized)، وتضع علامات تنصيص حول النصوص الحاوية على فواصل، وتكتب السطور مع تفريغ دوري لكل 5 صفوف."
            }
          ],
          quiz: [
          {
                    "id": "q1",
                    "question": "Why should you use bw.newLine() instead of writing \"\\n\" when writing lines with BufferedWriter? (لماذا ينبغي استخدام bw.newLine بدلاً من كتابة n\\ عند الكتابة بواسطة BufferedWriter؟)",
                    "options": [
                              "Because \"\\n\" causes an immediate OutOfMemoryError in BufferedWriter.",
                              "Because bw.newLine() outputs the platform's native line separator (e.g., \\r\\n on Windows, \\n on Unix/Linux/macOS), ensuring cross-platform compatibility.",
                              "Because bw.newLine() flushes the buffer automatically, while \"\\n\" does not.",
                              "Because write(\"\\n\") is deprecated in Java 17."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! bw.newLine() uses the system property 'line.separator' (System.lineSeparator()). On Windows it writes '\\r\\n', while on UNIX-like systems it writes '\\n'. This ensures files display properly in native text editors across operating systems. (تضمن دالة newLine كتابة فاصل الأسطر الخاص بنظام التشغيل الحالي سواء كان Windows أو Linux مما يحقق التوافقية)."
          },
          {
                    "id": "q2",
                    "question": "What is the primary architectural reason why BufferedWriter is significantly faster than raw FileWriter for repeated write operations? (ما هو السبب المعماري الرئيسي لكون BufferedWriter أسرع بكثير من FileWriter المباشر؟)",
                    "options": [
                              "BufferedWriter compiles Java strings to assembly instructions.",
                              "BufferedWriter batches characters into an in-memory buffer (default 8192 chars), converting thousands of fine-grained write calls into a single batch OS system call.",
                              "BufferedWriter writes directly to the CPU L1 cache.",
                              "BufferedWriter automatically deletes duplicate words."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Writing directly with FileWriter invokes character-to-byte conversion and native OS write calls on every invocation. BufferedWriter stores characters in a memory buffer, executing costly disk I/O system calls only when the buffer is full or flushed. (يجمع المحارف في مخزن مؤقت بالذاكرة RAM وينفذ استدعاءات كتابة القرص دفعة واحدة عند امتلاء البفر بدلاً من استدعاء النظام مع كل كلمة أو حرف)."
          },
          {
                    "id": "q3",
                    "question": "How do you construct a BufferedWriter that appends to an existing file rather than overwriting it? (كيف تنشئ BufferedWriter يقوم بإلحاق النصوص بالملف بدلاً من مسح محتواه القديم؟)",
                    "options": [
                              "new BufferedWriter(new FileWriter(\"app.log\", true))",
                              "new BufferedWriter(\"app.log\", \"append\")",
                              "new BufferedWriter(new FileWriter(\"app.log\")).setAppend(true)",
                              "BufferedWriter.openAppend(\"app.log\")"
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! Passing true as the second parameter to the FileWriter constructor (new FileWriter(path, true)) instructs it to open the file in append mode. The outer BufferedWriter decorator inherits this behavior. (تمرير true في مُنشئ FileWriter يفتح الملف بوضع الإلحاق append mode، ويحافظ على البيانات السابقة)."
          },
          {
                    "id": "q4",
                    "question": "What is the advantage of using bw.write(String s, int off, int len) over bw.write(s.substring(off, off + len))? (ما ميزة استخدام bw.write(s, off, len) مقارنة باستخراج نص فرعي بـ substring ثم كتابته؟)",
                    "options": [
                              "bw.write(s, off, len) avoids creating an unnecessary intermediate String object in the JVM heap, saving memory allocations during high-throughput writing.",
                              "s.substring() is deprecated in modern Java.",
                              "write(s, off, len) automatically encrypts the slice.",
                              "There is no difference; both allocate the exact same memory."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! The three-argument write() method writes a slice of the string directly from the original string's internal backing array into the buffer, without allocating a new substring on the heap. (كتابة الشريحة مباشرة توفر استهلاك الذاكرة وتتفادى إنشاء كائنات نصوص مؤقتة إضافية في الـ Heap)."
          },
          {
                    "id": "q5",
                    "question": "What happens if a program terminates normally without calling bw.close() or bw.flush() when writing 100 characters via BufferedWriter? (ماذا يحدث إذا انتهى البرنامج دون استدعاء bw.close أو bw.flush بعد كتابة 100 محرف؟)",
                    "options": [
                              "The JVM automatically flushes all buffers on exit under all conditions.",
                              "The 100 characters remain trapped inside the un-flushed 8192-character memory buffer and are lost, leaving the target file empty on disk.",
                              "The operating system crashes.",
                              "The program throws an UnflushedBufferException."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Because 100 characters is far less than the default 8,192-character capacity, the buffer never triggers an automatic flush. If close() or flush() is not called (or if try-with-resources is omitted), the buffered data is lost when the process terminates. (تضيع البيانات تماماً لأن حجمها أقل من سعة البفر 8KB ولم تُفرغ يدوياً، مما يترك الملف فارغاً على القرص)."
          },
          {
                    "id": "q6",
                    "question": "Which modern NIO method creates a BufferedWriter for a Path using UTF-8 charset cleanly? (أي دالة في حزمة NIO تنشئ كائن BufferedWriter لمسار Path بترميز UTF-8 القياسي؟)",
                    "options": [
                              "Files.newBufferedWriter(path, StandardCharsets.UTF_8)",
                              "Path.createBufferedWriter()",
                              "BufferedWriter.create(path)",
                              "FileSystem.getWriter(path)"
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! Files.newBufferedWriter(Path, Charset, OpenOption...) is the modern, standard NIO factory method for creating a BufferedWriter with guaranteed charset encoding. (الدالة القياسية في NIO هي Files.newBufferedWriter وتتيح تحديد الترميز وخيارات الفتح مثل APPEND و CREATE)."
          },
          {
                    "id": "q7",
                    "question": "What is the specific role of bw.flush()? (ما هو الدور الدقيق لدالة bw.flush في BufferedWriter؟)",
                    "options": [
                              "It empties the buffer and permanently closes the writer.",
                              "It forces all characters currently held in the internal memory buffer to be written immediately to the underlying writer/stream without closing it.",
                              "It deletes the written content from the file.",
                              "It resets the buffer pointer to zero, discarding unwritten data."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! flush() flushes the buffer: it immediately writes out any buffered characters to the underlying writer, leaving the writer open for further writing. (تقوم دالة flush بإجبار تفريغ البفر وكتابة كافة المحارف المعلقة إلى الوجهة فوراً مع إبقاء الكاتب مفتوحاً)."
          },
          {
                    "id": "q8",
                    "question": "How can you specify a custom buffer capacity of 64KB (32768 chars) for an enterprise bulk export with BufferedWriter? (كيف تحدد سعة مخصصة للمخزن المؤقت في BufferedWriter للأحمال الضخمة؟)",
                    "options": [
                              "new BufferedWriter(writer, 32768)",
                              "BufferedWriter.setBufferSize(32768)",
                              "writer.setCapacity(65536)",
                              "new BufferedWriter(writer).allocate(32768)"
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! The constructor new BufferedWriter(Writer out, int sz) allows specifying a custom buffer size (in number of characters). Passing 32768 allocates a 32K-char buffer (~64KB RAM). (المُنشئ الثاني new BufferedWriter(writer, size) يتيح تخصيص حجم المخزن بالمحارف لتسريع عمليات التصدير الضخمة)."
          },
          {
                    "id": "q9",
                    "question": "Consider this code:\ntry (BufferedWriter bw = new BufferedWriter(new StringWriter())) {\n    bw.write(\"Hello World\", 6, 5);\n}\nWhat portion of the string is written? (ما هو الجزء المكتوب من النص بواسطة هذا الاستدعاء؟)",
                    "options": [
                              "\"Hello\"",
                              "\"World\"",
                              "\"World!\"",
                              "\" World\""
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Offset 6 is the letter 'W' (indices: 0='H', 1='e', 2='l', 3='l', 4='o', 5=' ', 6='W'). Length 5 captures 'W', 'o', 'r', 'l', 'd'. Thus, \"World\" is written. (الإزاحة 6 تبدأ من الحرف W والطول 5 يأخذ 5 محارف فتكون النتيجة بالضبط \"World\")."
          },
          {
                    "id": "q10",
                    "question": "How can you wrap a network Socket's OutputStream with a BufferedWriter using UTF-8? (كيف يمكنك ربط مخرجات مقبس الشبكة Socket بـ BufferedWriter بترميز UTF-8؟)",
                    "options": [
                              "new BufferedWriter(new OutputStreamWriter(socket.getOutputStream(), StandardCharsets.UTF_8))",
                              "new BufferedWriter(socket.getOutputStream())",
                              "socket.getBufferedWriter()",
                              "new BufferedWriter(new FileWriter(socket.getInetAddress()))"
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! An OutputStream (byte stream) must first be adapted to a Writer (character stream) via OutputStreamWriter with explicit UTF-8, and then decorated with BufferedWriter for efficient line output. (يجب أولاً تحويل مجرى البايتات إلى كاتب محارف عبر OutputStreamWriter بترميز UTF-8 ثم تغليفه بـ BufferedWriter)."
          },
          {
                    "id": "q11",
                    "question": "Is an instance of BufferedWriter thread-safe when multiple threads concurrently write lines to it? (هل كائن BufferedWriter آمن للعمل المتزامن إذا كتبت عدة خيوط أسطراً في نفس الوقت؟)",
                    "options": [
                              "Yes, all operations across multiple lines are fully atomic without any danger of interleaving.",
                              "Individual write/newLine methods synchronize on an internal lock object, but multi-step operations (e.g. write text followed by newLine) can interleave between threads unless the caller synchronizes externally.",
                              "No, it throws a ConcurrentModificationException immediately.",
                              "BufferedWriter cannot be used in multi-threaded programs."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Although internal methods synchronize on the lock field, high-level composite operations (writing text + newLine) can be interleaved by other threads (thread A writes text, thread B writes text, thread A writes newline), resulting in garbled lines unless synchronized externally. (رغم وجود قفل داخلي للعمليات الفردية، إلا أن العمليات المتعددة ككتابة نص ثم سطر جديد قد تتداخل بين الخيوط ما لم يتم التزامن خارجياً)."
          },
          {
                    "id": "q12",
                    "question": "What is the output in the file after running the following code?\ntry (BufferedWriter bw = new BufferedWriter(new FileWriter(\"out.txt\"))) {\n    char[] chars = {'J', 'A', 'V', 'A', '2', '1'};\n    bw.write(chars, 0, 4);\n}\n(ما هي النتيجة في الملف بعد تنفيذ هذا الكود؟)",
                    "options": [
                              "JAVA21",
                              "JAVA",
                              "21",
                              "AV"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! bw.write(chars, 0, 4) starts at index 0 and writes 4 characters: 'J', 'A', 'V', 'A'. The remaining characters '2' and '1' are not written. (البدء من الإزاحة 0 وكتابة 4 محارف يعني كتابة JAVA فقط)."
          },
          {
                    "id": "q13",
                    "question": "How do you create an auto-flushing line writer pattern with BufferedWriter? (كيف تبني نمط كاتب أسطر يفرغ المخزن تلقائياً بعد كل سطر؟)",
                    "options": [
                              "Create a helper method that calls bw.write(line); bw.newLine(); bw.flush(); on every line, or wrap it in a PrintWriter(bw, true).",
                              "Set the buffer size to 0.",
                              "Set System.setProperty(\"bufferedwriter.autoflush\", \"true\").",
                              "Call bw.setAutoFlush(true)."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! BufferedWriter does not have a built-in auto-flush toggle. You can achieve this by calling flush() after newLine(), or by wrapping it in a PrintWriter with auto-flush enabled: new PrintWriter(bw, true). (لا تحتوي BufferedWriter على خاصية autoflush مدمجة، والحل هو استدعاء flush بعد كل سطر أو تغليفها بـ PrintWriter(bw, true))."
          },
          {
                    "id": "q14",
                    "question": "What happens if an IOException occurs midway through writing with BufferedWriter inside a try-with-resources statement? (ماذا يحدث إذا وقع IOException أثناء الكتابة داخل try-with-resources؟)",
                    "options": [
                              "The try-with-resources statement attempts to close the writer, flushing whatever unwritten data remains before closing.",
                              "The JVM terminates abnormally without closing any handles.",
                              "The file is automatically deleted.",
                              "The entire operating system enters recovery mode."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! try-with-resources guarantees that bw.close() will be invoked. In close(), BufferedWriter flushes any buffered characters before closing the underlying stream, ensuring as much data as possible is persisted. (تضمن بنية try-with-resources استدعاء close الذي يحاول تفريغ ما تبقى في البفر وإغلاق المجرى بأمان قبل معالجة الاستثناء)."
          },
          {
                    "id": "q15",
                    "question": "Why is BufferedWriter preferred over PrintWriter for performance-critical batch text output? (لماذا يُفضل BufferedWriter على PrintWriter في معالجة وكتابة النصوص عالية الأداء؟)",
                    "options": [
                              "BufferedWriter exposes IOExceptions directly to the caller (enabling immediate error handling), has less formatting overhead, and writes raw char buffers faster.",
                              "PrintWriter cannot write strings longer than 100 characters.",
                              "BufferedWriter automatically converts text to binary bytecode.",
                              "PrintWriter only writes to System.out."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! PrintWriter swallows all IOExceptions and requires manual checkError() polling, which is dangerous in mission-critical systems. Furthermore, PrintWriter adds overhead from character checks and formatting, making BufferedWriter lighter and faster. (توفر BufferedWriter معالجة مباشرة للأخطاء بإطلاق IOExceptions بدلاً من ابتلاعها، كما أنها أخف وزناً وأسرع في كتابة كتل المحارف)."
          }
]
        }
      ]
    },

    /* ==========================================================================
       TOPIC 56: Java Data Structures
       ========================================================================== */
    {
      id: "java-data-structures",
      title: "56. Java Data Structures",
      description: "Master Data Structures Architecture in Java: Linear vs Non-Linear, Contiguous Array vs Linked Node memory models, Big-O Asymptotic Complexity (Time & Space), custom Stack, Queue, and Singly Linked List implementations, and selecting the optimal structure.",
      lessons: [
        {
          id: "java-data-structures-mastery",
          title: "Complete Guide to Java Data Structures",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "Java Data Structures: Principles, Memory Models & Complexity (هياكل البيانات في جافا: المبادئ ونماذج الذاكرة والتعقيد)"
            },
            {
              type: "paragraph",
              text: "A data structure is a specialized format for organizing, processing, retrieving, and storing data in computer memory. In Java, data structures are categorized fundamentally into: 1) Linear Structures (Arrays, Linked Lists, Stacks, Queues) where elements form a sequential order; and 2) Non-Linear Structures (Trees, Binary Search Trees, Heaps, Graphs) where elements are organized hierarchically or relationally. Understanding memory layouts—contiguous blocks with direct index addressing vs heap-allocated nodes connected via object references—is crucial for making correct algorithmic tradeoffs."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "تُعرَّف هياكل البيانات بأنها أسلوب برمجي وتنظيمي لتخزين البيانات ومعالجتها واسترجاعها في ذاكرة الحاسوب بكفاءة. تنقسم هياكل البيانات في جافا إلى نوعين رئيسيين: 1) الهياكل الخطية (Linear Structures) مثل المصفوفات، القوائم المترابطة، المكدسات (Stacks)، وأرتال الانتظار (Queues) حيث تترتب العناصر بتسلسل متتابع؛ و2) الهياكل غير الخطية (Non-Linear) مثل الأشجار (Trees) والمخططات (Graphs). ويعد فهم كيفية توزع البيانات في الذاكرة (سواء كانت متجاورة ومفهرسة أو عقد متفرقة في الرام مرتبطة بمراجع) الأساس لاختيار الهيكل الأمثل وتحقيق أعلى سرعة."
            },
            {
              type: "paragraph",
              text: "Core Trade-offs: 1) Random Access: Arrays provide O(1) instantaneous access via index math; Linked nodes require O(n) pointer traversal; 2) Insertion/Deletion: Inserting into an array requires shifting elements (O(n)); inserting at a known node in a linked list is O(1); 3) Memory Overhead: Arrays carry minimal overhead; nodes carry pointer reference overhead."
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
              text: "Example 1: Contiguous Array Memory Model (O(1) Access) (المثال 1: نموذج المصفوفة المتجاورة في الذاكرة والوصول الفوري O(1))"
            },
            {
              type: "paragraph",
              text: "Demonstrating how contiguous memory allocation enables constant time O(1) index lookups."
            },
            {
              type: "code",
              language: "java",
              filename: "ArrayMemoryModelDemo.java",
              code: `public class ArrayMemoryModelDemo {
    public static void main(String[] args) {
        // Fixed-size contiguous block of memory allocated in JVM heap
        int[] scores = new int[]{ 95, 82, 99, 74, 88 };

        // O(1) Constant Time Random Access via memory offset calculation:
        // address = base_address + (index * 4 bytes)
        int thirdScore = scores[2]; // Index 2 -> Instantaneous
        System.out.println("Element at index 2 (O(1) access): " + thirdScore);

        // O(1) Constant Time Update
        scores[2] = 100;
        System.out.println("Updated element at index 2: " + scores[2]);
    }
}`,
              output: `Element at index 2 (O(1) access): 99
Updated element at index 2: 100`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "Arrays store elements contiguously. The CPU calculates the exact memory location using basic pointer arithmetic: base + (index * size), achieving O(1) access time."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "تُخزن المصفوفات في كتل متجاورة بالذاكرة؛ مما يسمح للمعالج بحساب عنوان العنصر بعملية حسابية بسيطة فورية بزمن O(1)."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Dynamic Array Resizing Mechanics (المثال 2: آلية توسيع حجم المصفوفات الديناميكية)"
            },
            {
              type: "paragraph",
              text: "How dynamic collections grow when capacity is exceeded (Amortized O(1))."
            },
            {
              type: "code",
              language: "java",
              filename: "DynamicArrayGrowthDemo.java",
              code: `import java.util.Arrays;

public class DynamicArrayGrowthDemo {
    static class SimpleDynamicIntArray {
        private int[] data = new int[2]; // Initial small capacity
        private int size = 0;

        public void add(int value) {
            if (size == data.length) {
                grow();
            }
            data[size++] = value;
        }

        private void grow() {
            int newCapacity = data.length * 2; // Double the capacity
            int[] newData = new int[newCapacity];
            System.arraycopy(data, 0, newData, 0, data.length);
            System.out.println("Capacity doubled: " + data.length + " -> " + newCapacity);
            data = newData;
        }

        public int size() { return size; }
        public int capacity() { return data.length; }
    }

    public static void main(String[] args) {
        SimpleDynamicIntArray list = new SimpleDynamicIntArray();
        System.out.println("Initial capacity: " + list.capacity());

        for (int i = 1; i <= 5; i++) {
            list.add(i * 10);
            System.out.println("Added " + (i * 10) + " | Size: " + list.size() + " | Capacity: " + list.capacity());
        }
    }
}`,
              output: `Initial capacity: 2
Added 10 | Size: 1 | Capacity: 2
Added 20 | Size: 2 | Capacity: 2
Capacity doubled: 2 -> 4
Added 30 | Size: 3 | Capacity: 4
Added 40 | Size: 4 | Capacity: 4
Capacity doubled: 4 -> 8
Added 50 | Size: 5 | Capacity: 8`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "When a dynamic array is full, it creates a new array of double the size and copies elements over. This costs O(n) during growth, but averages to Amortized O(1) per insertion."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "عند امتلاء المصفوفة الديناميكية، يتم إنشاء مصفوفة جديدة بضعف الحجم ونسخ العناصر القديمة؛ وهو ما يمنح إضافة العناصر زمناً استهلاكياً Amortized O(1)."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Linked Node Structure (Singly Linked List) (المثال 3: بنية العقد المترابطة للقائمة الأحادية)"
            },
            {
              type: "paragraph",
              text: "Building a linked node data structure in memory from scratch."
            },
            {
              type: "code",
              language: "java",
              filename: "SinglyLinkedListDemo.java",
              code: `public class SinglyLinkedListDemo {
    static class Node {
        int data;
        Node next;

        Node(int data) {
            this.data = data;
            this.next = null;
        }
    }

    public static void main(String[] args) {
        // Manually linking nodes in memory
        Node head = new Node(10);
        head.next = new Node(20);
        head.next.next = new Node(30);

        System.out.print("Traversing Linked Nodes: ");
        Node current = head;
        while (current != null) {
            System.out.print(current.data + (current.next != null ? " -> " : " -> NULL"));
            current = current.next;
        }
        System.out.println();
    }
}`,
              output: `Traversing Linked Nodes: 10 -> 20 -> 30 -> NULL`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "Linked structures allocate nodes independently anywhere in the heap. Elements do not need to be contiguous; each node holds a reference to the next node."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "تُوزع العقد المترابطة بشكل مستقل في الذاكرة وترتبط ببعضها عبر المؤشرات والمراجع؛ فلا تشترط وجود مساحة متصلة في الرام."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Custom LIFO Stack (Array-Based) (المثال 4: بناء مكدس المخرجات الأخير أولاً LIFO)"
            },
            {
              type: "paragraph",
              text: "Implementing a Last-In, First-Out (LIFO) Stack with push(), pop(), and peek() operations in O(1)."
            },
            {
              type: "code",
              language: "java",
              filename: "CustomStackDemo.java",
              code: `public class CustomStackDemo {
    static class ArrayStack {
        private final int[] elements;
        private int top = -1;

        public ArrayStack(int capacity) {
            this.elements = new int[capacity];
        }

        public void push(int value) {
            if (top == elements.length - 1) throw new IllegalStateException("Stack Overflow!");
            elements[++top] = value;
        }

        public int pop() {
            if (isEmpty()) throw new IllegalStateException("Stack Underflow!");
            return elements[top--];
        }

        public int peek() {
            if (isEmpty()) throw new IllegalStateException("Stack is empty!");
            return elements[top];
        }

        public boolean isEmpty() {
            return top == -1;
        }
    }

    public static void main(String[] args) {
        ArrayStack stack = new ArrayStack(5);

        stack.push(100);
        stack.push(200);
        stack.push(300);

        System.out.println("Top element peek(): " + stack.peek());
        System.out.println("Popped element:     " + stack.pop());
        System.out.println("Popped element:     " + stack.pop());
        System.out.println("Remaining top:      " + stack.peek());
    }
}`,
              output: `Top element peek(): 300
Popped element:     300
Popped element:     200
Remaining top:      100`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "A Stack enforces LIFO (Last-In, First-Out). Push, pop, and peek all operate in O(1) constant time."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "يطبق المكدس (Stack) مبدأ ما يدخل آخراً يخرج أولاً (LIFO)؛ وتعمل كافة عملياته (push, pop, peek) بزمن ثابت O(1)."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Custom FIFO Queue (Circular Array) (المثال 5: بناء طابور الانتظار الدائري FIFO)"
            },
            {
              type: "paragraph",
              text: "Building a First-In, First-Out (FIFO) queue utilizing modulo arithmetic for circular buffer wrapping."
            },
            {
              type: "code",
              language: "java",
              filename: "CircularQueueDemo.java",
              code: `public class CircularQueueDemo {
    static class CircularQueue {
        private final int[] data;
        private int front = 0;
        private int rear = 0;
        private int count = 0;

        public CircularQueue(int capacity) {
            this.data = new int[capacity];
        }

        public void enqueue(int item) {
            if (count == data.length) throw new IllegalStateException("Queue is full!");
            data[rear] = item;
            rear = (rear + 1) % data.length; // Wrap around
            count++;
        }

        public int dequeue() {
            if (count == 0) throw new IllegalStateException("Queue is empty!");
            int item = data[front];
            front = (front + 1) % data.length; // Wrap around
            count--;
            return item;
        }

        public int size() { return count; }
    }

    public static void main(String[] args) {
        CircularQueue queue = new CircularQueue(3);

        queue.enqueue(10);
        queue.enqueue(20);
        queue.enqueue(30);

        System.out.println("Dequeued: " + queue.dequeue()); // Removes 10
        System.out.println("Dequeued: " + queue.dequeue()); // Removes 20

        // Enqueue more elements utilizing circular wrap-around
        queue.enqueue(40);
        queue.enqueue(50);

        System.out.println("Dequeued: " + queue.dequeue()); // Removes 30
        System.out.println("Dequeued: " + queue.dequeue()); // Removes 40
        System.out.println("Remaining items in queue: " + queue.size());
    }
}`,
              output: `Dequeued: 10
Dequeued: 20
Dequeued: 30
Dequeued: 40
Remaining items in queue: 1`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "Circular queues use modulo arithmetic (index % capacity) to reuse empty slots at the front of the array, ensuring O(1) enqueue and dequeue operations."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "يستخدم الطابور الدائري باقي القسمة (%) لإعادة استخدام الخانات المحررة في بداية المصفوفة؛ مما يضمن زمناً ثابتاً O(1) لجميع العمليات."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Doubly Linked List Node Representation (المثال 6: العقد المزدوجة في القوائم ثنائية الاتجاه)"
            },
            {
              type: "paragraph",
              text: "Connecting nodes with both 'next' and 'prev' pointers for bidirectional navigation."
            },
            {
              type: "code",
              language: "java",
              filename: "DoublyLinkedListDemo.java",
              code: `public class DoublyLinkedListDemo {
    static class DNode {
        String data;
        DNode prev;
        DNode next;

        DNode(String data) {
            this.data = data;
        }
    }

    public static void main(String[] args) {
        DNode first = new DNode("First");
        DNode second = new DNode("Second");
        DNode third = new DNode("Third");

        // Link forward
        first.next = second;
        second.next = third;

        // Link backward
        third.prev = second;
        second.prev = first;

        System.out.println("Forward traversal: " + first.data + " -> " + first.next.data + " -> " + first.next.next.data);
        System.out.println("Backward traversal: " + third.data + " -> " + third.prev.data + " -> " + third.prev.prev.data);
    }
}`,
              output: `Forward traversal: First -> Second -> Third
Backward traversal: Third -> Second -> First`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "Doubly linked lists store both 'prev' and 'next' references, allowing bidirectional traversal at the expense of an extra pointer reference per node."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "تتضمن العقد ثنائية الاتجاه مرجعين (next و prev) للتنقل للأمام والخلف بحرية مقابل استهلاك ذاكرة إضافي لكل عقدة."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Binary Search Tree (BST) Node Structure (المثال 7: بنية عقد شجرة البحث الثنائية)"
            },
            {
              type: "paragraph",
              text: "A non-linear hierarchical data structure offering O(log n) search on balanced trees."
            },
            {
              type: "code",
              language: "java",
              filename: "BinarySearchTreeDemo.java",
              code: `public class BinarySearchTreeDemo {
    static class TreeNode {
        int key;
        TreeNode left, right;

        public TreeNode(int item) {
            key = item;
            left = right = null;
        }
    }

    static class SimpleBST {
        TreeNode root;

        public void insert(int key) {
            root = insertRec(root, key);
        }

        private TreeNode insertRec(TreeNode current, int key) {
            if (current == null) return new TreeNode(key);
            if (key < current.key) current.left = insertRec(current.left, key);
            else if (key > current.key) current.right = insertRec(current.right, key);
            return current;
        }

        public void inOrder(TreeNode node) {
            if (node != null) {
                inOrder(node.left);
                System.out.print(node.key + " ");
                inOrder(node.right);
            }
        }
    }

    public static void main(String[] args) {
        SimpleBST bst = new SimpleBST();
        bst.insert(50);
        bst.insert(30);
        bst.insert(20);
        bst.insert(40);
        bst.insert(70);
        bst.insert(60);

        System.out.print("In-Order BST Traversal (Sorted Output): ");
        bst.inOrder(bst.root);
        System.out.println();
    }
}`,
              output: `In-Order BST Traversal (Sorted Output): 20 30 40 50 60 70 `
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "Binary Search Trees order nodes such that left < parent < right. In-order traversal naturally visits all keys in sorted order."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "ترتب شجرة البحث الثنائية العقد بحيث يكون الابن الأيسر أصغر والأيمن أكبر؛ وينتج عن المسح الداخلي (In-Order) ترتيب العناصر تصاعدياً."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Hash Table Collision Handling (Chaining) (المثال 8: معالجة تصادمات جداول التجزئة بسلسلة القوائم)"
            },
            {
              type: "paragraph",
              text: "Understanding how hash tables achieve average O(1) key lookups and resolve collisions."
            },
            {
              type: "code",
              language: "java",
              filename: "HashTableChainingDemo.java",
              code: `public class HashTableChainingDemo {
    static class Entry {
        String key;
        int value;
        Entry next;

        Entry(String key, int value) {
            this.key = key;
            this.value = value;
        }
    }

    static class SimpleHashMap {
        private final Entry[] buckets = new Entry[4]; // Small table to force collision

        private int getBucketIndex(String key) {
            return Math.abs(key.hashCode()) % buckets.length;
        }

        public void put(String key, int value) {
            int idx = getBucketIndex(key);
            Entry head = buckets[idx];

            // Check if key already exists in bucket chain
            while (head != null) {
                if (head.key.equals(key)) {
                    head.value = value;
                    return;
                }
                head = head.next;
            }

            // Insert new entry at the head of the chain (O(1))
            Entry newEntry = new Entry(key, value);
            newEntry.next = buckets[idx];
            buckets[idx] = newEntry;
        }

        public Integer get(String key) {
            int idx = getBucketIndex(key);
            Entry current = buckets[idx];
            while (current != null) {
                if (current.key.equals(key)) return current.value;
                current = current.next;
            }
            return null;
        }
    }

    public static void main(String[] args) {
        SimpleHashMap map = new SimpleHashMap();
        map.put("Alice", 95);
        map.put("Bob", 88);
        map.put("Charlie", 92);

        System.out.println("Retrieved Alice's score:   " + map.get("Alice"));
        System.out.println("Retrieved Bob's score:     " + map.get("Bob"));
        System.out.println("Retrieved Charlie's score: " + map.get("Charlie"));
    }
}`,
              output: `Retrieved Alice's score:   95
Retrieved Bob's score:     88
Retrieved Charlie's score: 92`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "Hash tables map keys to bucket indices via hash functions. When two keys map to the same bucket, separate chaining links entries via linked lists."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "تربط جداول التجزئة المفاتيح بالخانات عبر دوال التجزئة؛ وعند حدوث تصادم لمفتاحين في نفس الخانة يتم ربطهما في قائمة متصلة (Chaining)."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Time Complexity Comparison: Array vs LinkedList (المثال 9: مقارنة التعقيد الزمني بين المصفوفات والقوائم المترابطة)"
            },
            {
              type: "paragraph",
              text: "Benchmark showing why insertion at index 0 is O(n) in ArrayList and O(1) in LinkedList."
            },
            {
              type: "code",
              language: "java",
              filename: "ListComplexityBenchmarkDemo.java",
              code: `import java.util.ArrayList;
import java.util.LinkedList;

public class ListComplexityBenchmarkDemo {
    public static void main(String[] args) {
        int operations = 30_000;

        // 1. Prepend to ArrayList (O(n) each, shifts all elements)
        ArrayList<Integer> arrayList = new ArrayList<>();
        long startArray = System.currentTimeMillis();
        for (int i = 0; i < operations; i++) {
            arrayList.add(0, i); // Insert at beginning
        }
        long timeArray = System.currentTimeMillis() - startArray;

        // 2. Prepend to LinkedList (O(1) each, updates pointers only)
        LinkedList<Integer> linkedList = new LinkedList<>();
        long startLinked = System.currentTimeMillis();
        for (int i = 0; i < operations; i++) {
            linkedList.addFirst(i); // Insert at beginning
        }
        long timeLinked = System.currentTimeMillis() - startLinked;

        System.out.println("ArrayList prepend time (O(n)):  " + timeArray + " ms");
        System.out.println("LinkedList prepend time (O(1)): " + timeLinked + " ms");
        System.out.println("LinkedList is faster at prepending: " + (timeArray > timeLinked));
    }
}`,
              output: `ArrayList prepend time (O(n)):  85 ms
LinkedList prepend time (O(1)): 3 ms
LinkedList is faster at prepending: true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "Adding to the front of an ArrayList requires shifting all n elements to the right (O(n)). Adding to a LinkedList only rewires head pointers (O(1))."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "الإضافة في بداية ArrayList تتطلب إزاحة كافة العناصر لليمين بزمن O(n)؛ بينما تتطلب في LinkedList تعديل مؤشر الرأس فقط بزمن O(1)."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Graph Representation via Adjacency List (المثال 10: تمثيل المخططات البيانية عبر قوائم التجاور)"
            },
            {
              type: "paragraph",
              text: "Modeling complex networks (social graphs, road networks) using adjacency lists."
            },
            {
              type: "code",
              language: "java",
              filename: "GraphAdjacencyDemo.java",
              code: `import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class GraphAdjacencyDemo {
    static class Graph {
        private final Map<String, List<String>> adjList = new HashMap<>();

        public void addVertex(String label) {
            adjList.putIfAbsent(label, new ArrayList<>());
        }

        public void addEdge(String src, String dest) {
            adjList.get(src).add(dest);
            adjList.get(dest).add(src); // Undirected graph
        }

        public void printGraph() {
            for (Map.Entry<String, List<String>> entry : adjList.entrySet()) {
                System.out.println("Vertex [" + entry.getKey() + "] connected to: " + entry.getValue());
            }
        }
    }

    public static void main(String[] args) {
        Graph socialNetwork = new Graph();
        socialNetwork.addVertex("Alice");
        socialNetwork.addVertex("Bob");
        socialNetwork.addVertex("Charlie");
        socialNetwork.addVertex("David");

        socialNetwork.addEdge("Alice", "Bob");
        socialNetwork.addEdge("Alice", "Charlie");
        socialNetwork.addEdge("Bob", "David");

        socialNetwork.printGraph();
    }
}`,
              output: `Vertex [Bob] connected to: [Alice, David]
Vertex [Charlie] connected to: [Alice]
Vertex [David] connected to: [Bob]
Vertex [Alice] connected to: [Bob, Charlie]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "Adjacency lists represent graphs by storing a list of neighbors for each vertex, optimizing space complexity to O(V + E)."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "تمثل قوائم التجاور المخططات بتخزين قائمة الجيران لكل نقطة، مما يوفر استهلاك الذاكرة بتعقيد O(V + E)."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Priority Queue & Min-Heap Concept (المثال 11: طابور الأولوية وشجرة الكومة الصغرى Min-Heap)"
            },
            {
              type: "paragraph",
              text: "Using a PriorityQueue to always extract the minimum or highest priority element in O(log n)."
            },
            {
              type: "code",
              language: "java",
              filename: "PriorityQueueHeapDemo.java",
              code: `import java.util.PriorityQueue;

public class PriorityQueueHeapDemo {
    public static void main(String[] args) {
        // PriorityQueue in Java is backed by a balanced Min-Heap array
        PriorityQueue<Integer> taskQueue = new PriorityQueue<>();

        // Enqueue items with different priority numbers (lower number = higher urgency)
        taskQueue.offer(40);
        taskQueue.offer(10); // Highest priority
        taskQueue.offer(30);
        taskQueue.offer(20);

        System.out.println("Extracting tasks in priority order (Min-Heap):");
        while (!taskQueue.isEmpty()) {
            System.out.println("  Processed urgent task with priority: " + taskQueue.poll());
        }
    }
}`,
              output: `Extracting tasks in priority order (Min-Heap):
  Processed urgent task with priority: 10
  Processed urgent task with priority: 20
  Processed urgent task with priority: 30
  Processed urgent task with priority: 40`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "Java's PriorityQueue implements a binary heap. poll() always extracts the minimum element in O(log n) time."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "يعتمد PriorityQueue في جافا على شجرة الكومة (Binary Heap)؛ وتستخرج دالة poll() العنصر ذا الأولوية القصوى بزمن O(log n)."
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
                "Mistake 1: Choosing LinkedList for random element access. get(i) in a LinkedList requires traversing i nodes from the head (O(n)), whereas ArrayList takes O(1).",
                "خطأ 1: اختيار LinkedList عند الحاجة للوصول العشوائي المتكرر؛ فدالة get(i) تتطلب المرور على كافة العقد السابقة بزمن O(n) بينما المصفوفة تحتاج O(1).",
                "Mistake 2: Assuming insertion at the end of an ArrayList is always O(1). While usually O(1), it is occasionally O(n) when array resizing and copying occurs.",
                "خطأ 2: افتراض أن الإضافة في نهاية ArrayList هي O(1) دوماً دون إدراك أنها تتطلب O(n) عند امتلاء المصفوفة ومضاعفة حجمها.",
                "Mistake 3: Forgetting node memory overhead: In a 64-bit JVM, each linked node requires 24 to 32 bytes of heap overhead just for object headers and pointers.",
                "خطأ 3: إغفال استهلاك الذاكرة في القوائم المترابطة؛ فكل عقدة تستهلك مساحة إضافية لمراجع العناوين وترويسة الكائن بالرام.",
                "Mistake 4: Not handling empty structure edge cases in pop() or dequeue(), leading to NullPointerExceptions or ArrayIndexOutOfBoundsExceptions."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Balanced Parentheses Syntax Checker (التحدي العملي: مدقق توازن الأقواس باستخدام المكدس)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Implement a static method 'isBalanced(String expr)' using a Stack data structure. The method verifies whether every opening parenthesis '(', '{', '[' has a matching closing parenthesis in the correct order. Test with valid and invalid expressions in main() and print verification results."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: صمم دالة isBalanced(String expr) باستخدام هيكل بيانات المكدس (Stack) للتحقق مما إذا كانت الأقواس '(', '{', '[' متوازنة ومغلقة بالترتيب الصحيح. اختبر الدالة على نصوص سليمة وأخرى غير سليمة في main واطبع النتائج."
            },
            {
              type: "code",
              language: "java",
              filename: "BalancedParenthesesChallenge.java",
              code: `import java.util.ArrayDeque;
import java.util.Deque;

public class BalancedParenthesesChallenge {
    public static boolean isBalanced(String expression) {
        Deque<Character> stack = new ArrayDeque<>();

        for (char ch : expression.toCharArray()) {
            if (ch == '(' || ch == '{' || ch == '[') {
                stack.push(ch);
            } else if (ch == ')' || ch == '}' || ch == ']') {
                if (stack.isEmpty()) return false;
                char top = stack.pop();
                if ((ch == ')' && top != '(') ||
                    (ch == '}' && top != '{') ||
                    (ch == ']' && top != '[')) {
                    return false;
                }
            }
        }
        return stack.isEmpty();
    }

    public static void main(String[] args) {
        String[] testCases = {
            "{ [ ( a + b ) * c ] }",
            "( [ ) ]",
            "{ [ ( ] ) }",
            "( { [ ] } )"
        };

        for (String test : testCases) {
            boolean balanced = isBalanced(test);
            System.out.printf("Expression: %-22s -> Balanced? %b%n", test, balanced);
        }
    }
}`,
              output: `Expression: { [ ( a + b ) * c ] } -> Balanced? true
Expression: ( [ ) ]                -> Balanced? false
Expression: { [ ( ] ) }            -> Balanced? false
Expression: ( { [ ] } )            -> Balanced? true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "Opening brackets are pushed onto the stack. When a closing bracket is encountered, the stack is popped and checked for a matching pair. If unmatched or non-empty at the end, the expression is invalid."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "تُضاف الأقواس المفتوحة للمكدس؛ وعند مصادفة قوس إغلاق يتم سحب العنصر ومطابقته، فإذا اختلف النوع أو لم يفرغ المكدس بالنهاية يكون التعبير غير متوازن."
            }
          ],
          quiz: [
          {
                    "id": "q1",
                    "question": "Why does a standard array provide O(1) constant-time access to any element by index? (لماذا تتيح المصفوفة التقليدية الوصول الفوري O(1) لأي عنصر عبر الفهرس؟)",
                    "options": [
                              "Because arrays are stored as a binary search tree in the JVM.",
                              "Because array elements are stored in contiguous memory locations, allowing the memory address of any index to be computed in a single mathematical operation: baseAddress + (index * elementSize).",
                              "Because array indices are hashed using MD5.",
                              "Because modern CPUs search all elements simultaneously in parallel."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Arrays are allocated in contiguous memory blocks. Finding an element requires only a single multiplication and addition: address = base + index * size, which executes in constant O(1) CPU cycles. (تُخزن عناصر المصفوفة في مواقع ذاكرة متجاورة، مما يسمح بحساب عنوان الذاكرة فورياً بعملية حسابية بسيطة O(1))."
          },
          {
                    "id": "q2",
                    "question": "What is the amortized time complexity of adding an element to the end of a dynamic array (like ArrayList)? (ما هو التعقيد الزمني الإجمالي المقسّط لإضافة عنصر في نهاية مصفوفة ديناميكية؟)",
                    "options": [
                              "O(n) on every single append",
                              "Amortized O(1), because expensive array resize operations (copying to a 1.5x/2x larger array) occur infrequently.",
                              "O(log n)",
                              "O(n^2)"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! While resizing an array requires allocating a new array and copying n elements (an O(n) operation), doubling or growing by 1.5x occurs infrequently enough that across N insertions, the average cost per insertion is amortized O(1). (رغم أن عملية التوسيع تستغرق O(n)، إلا أنها تحدث على فترات متباعدة مما يجعل التكلفة المقسطة لإضافة كل عنصر هي O(1))."
          },
          {
                    "id": "q3",
                    "question": "In a Singly Linked List with head and tail pointers, what are the time complexities for inserting at the head vs deleting from the tail? (في قائمة مترابطة أحادية تحتوي على مؤشري الرأس والذيل، ما هو التعقيد الزمني للإضافة في الرأس مقابل الحذف من الذيل؟)",
                    "options": [
                              "Insert at head: O(1); Delete from tail: O(n) (because finding the node prior to the tail requires traversing the entire list).",
                              "Insert at head: O(n); Delete from tail: O(1)",
                              "Insert at head: O(1); Delete from tail: O(1)",
                              "Insert at head: O(n); Delete from tail: O(n)"
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! Inserting at the head is O(1) by updating head.next. However, deleting from the tail requires updating the second-to-last node's next pointer to null; in a singly linked list, reaching that predecessor node requires traversing all n nodes from the head (O(n)). (الإضافة في الرأس O(1) فورية، لكن الحذف من الذيل يتطلب الوصول للعقدة التي تسبق الذيل لتصفير مؤشرها وهو ما يتطلب المرور على كافة العقد O(n))."
          },
          {
                    "id": "q4",
                    "question": "How does a circular array queue prevent the 'creeping queue' problem where empty space at the front cannot be reused? (كيف يحل طابور المصفوفة الدائري مشكلة هدر المساحات الفارغة في مقدمة المصفوفة؟)",
                    "options": [
                              "By shifting all remaining elements to index 0 on every dequeue (O(n) shift).",
                              "By using modulo arithmetic for head and tail pointers: tail = (tail + 1) % capacity, wrapping pointers back to index 0 when reaching the end.",
                              "By continuously allocating a new array on every enqueue.",
                              "By sorting the queue after each removal."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! A circular queue uses the modulo operator (index = (index + 1) % capacity) to wrap the pointers around to the beginning of the array, achieving O(1) enqueue and dequeue without shifting elements. (تستخدم المصفوفة الدائرية معامل باقي القسمة % لتدوير المؤشرات نحو البداية مجدداً، مما يتيح استغلال الفراغات بكفاءة O(1) دون إزاحة العناصر)."
          },
          {
                    "id": "q5",
                    "question": "What major memory advantage does an Array-based list have over a Doubly Linked List for storing 1,000,000 integers? (ما هي الميزة الكبرى للمصفوفة مقارنة بالقائمة المترابطة المزدوجة عند تخزين مليون عدد صحيح؟)",
                    "options": [
                              "The Array requires vastly less memory because it stores raw numbers contiguously without per-element node object overhead (which requires ~24-32 bytes per node for object headers, prev pointer, and next pointer).",
                              "The Doubly Linked List uses less memory because it does not need indices.",
                              "Arrays are compressed by the JVM garbage collector automatically.",
                              "Doubly Linked Lists cannot store integers."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! In a Doubly Linked List, each element requires a Node object with an object header, data reference, prev pointer, and next pointer (~24-32 bytes of overhead per node). An int[] array takes only 4 bytes per integer with zero per-element object overhead. (تتطلب العقدة في القائمة المزدوجة مساحة إضافية للترويسة ومؤشري السابق والتالي مما يضاعف استهلاك الذاكرة 6 إلى 8 مرات مقارنة بالمصفوفة المتجاورة)."
          },
          {
                    "id": "q6",
                    "question": "What is the result of performing an In-Order traversal (Left, Root, Right) on a valid Binary Search Tree (BST)? (ما هي نتيجة المرور المتتالي In-Order على شجرة بحث ثنائية سليمة؟)",
                    "options": [
                              "Elements are visited in reverse sorted order.",
                              "Elements are visited in strictly ascending (sorted) order.",
                              "Elements are visited in level-by-level breadth-first order.",
                              "The root node is always visited first."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! By definition, in a BST, all nodes in the left subtree are smaller than the root, and all nodes in the right subtree are greater. Traversing Left -> Root -> Right produces elements in ascending sorted order. (المرور In-Order يزور الفرع الأيسر (الأصغر) ثم الجذر ثم الأيمن (الأكبر)، مما ينتج العناصر مرتبة تصاعدياً بدقة)."
          },
          {
                    "id": "q7",
                    "question": "What is the worst-case time complexity of searching in an un-balanced Binary Search Tree (BST), and when does it occur? (ما هو أسوأ تعقيد زمني للبحث في شجرة بحث ثنائية غير متوازنة ومتى يحدث؟)",
                    "options": [
                              "O(log n), occurring when all elements are randomly distributed.",
                              "O(n), occurring when elements are inserted in already sorted (or reverse sorted) order, causing the tree to degenerate into a linked list.",
                              "O(1), occurring when searching for the minimum element.",
                              "O(n log n), occurring on duplicates."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! If elements are inserted in sorted order (e.g. 1, 2, 3, 4, 5), each node is added as the right child of the previous node. The tree degenerates into a linear chain (linked list) with depth n, making search O(n). (إدخال عناصر مرتبة مسبقاً يحول الشجرة إلى خط مستقيم شبيه بالقائمة المترابطة بعمق n وتصبح تكلفة البحث O(n))."
          },
          {
                    "id": "q8",
                    "question": "In a Hash Table utilizing Separate Chaining for collision resolution, what enhancement was introduced in Java 8 to handle heavily collided buckets? (ما التحسين الذي أُضيف في جافا 8 للتعامل مع تصادمات جداول التجزئة في الحاويات المزدحمة؟)",
                    "options": [
                              "Buckets with more than 8 colliding entries transform from a linked list into a balanced Red-Black Tree, improving worst-case search from O(n) to O(log n).",
                              "The JVM automatically restarts and rehashes with a different algorithm.",
                              "Collided items are discarded to save memory.",
                              "The hash table converts to an unmodifiable array."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! In Java 8, when a bucket in HashMap exceeds TREEIFY_THRESHOLD (8 entries) and table capacity is at least 64, the linked list is converted into a balanced red-black tree (TreeNode), reducing worst-case collision search time from O(n) to O(log n). (في جافا 8، عندما يزيد عدد عناصر الحاوية عن 8، تتحول القائمة المترابطة إلى شجرة حمراء-سوداء متوازنة ليتحسن البحث من O(n) إلى O(log n))."
          },
          {
                    "id": "q9",
                    "question": "Why is iterating through an array or ArrayList significantly faster in real CPU hardware than iterating through a LinkedList of identical size, even though both are O(n)? (لماذا يُعد التكرار عبر مصفوفة أسرع بكثير على معالج الحاسوب من القائمة المترابطة رغم أن كلاهما O(n)؟)",
                    "options": [
                              "Because LinkedList requires sorting on each step.",
                              "Due to CPU Cache Locality: contiguous array memory allows hardware CPU caches to prefetch cache lines (e.g., 64 bytes) into L1/L2 cache, while LinkedList nodes are scattered randomly in heap memory causing frequent CPU cache misses.",
                              "Because arrays run on hardware threads while LinkedList runs in software emulation.",
                              "Because Java ignores loop bounds on arrays."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Contiguous memory layout exhibits strong spatial cache locality. When reading array[0], the CPU automatically loads the surrounding 64-byte cache line containing the next several elements into fast L1 cache. LinkedList nodes are scattered across the heap, triggering a CPU cache miss on almost every node hop. (المصفوفات المتجاورة تستفيد من الذاكرة المخبأة للمعالج CPU Cache Locality حيث يتم تحميل العناصر التالية مسبقاً، بينما عقد القوائم المترابطة مبعثرة في الذاكرة وتسبب Cache Miss متكرراً)."
          },
          {
                    "id": "q10",
                    "question": "What is the preferred graph representation when representing a sparse graph with V vertices and relatively few edges E (where E << V^2)? (ما هو التمثيل الأفضل للمخطط البياني المتناثر قليل الحواف؟)",
                    "options": [
                              "Adjacency Matrix (مصفوفة التجاور) which takes O(V^2) memory regardless of edge count.",
                              "Adjacency List (قائمة التجاور) which takes O(V + E) memory, storing only edges that actually exist.",
                              "Complete Binary Tree",
                              "Edge-disjoint Stack"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! For sparse graphs, an Adjacency List uses O(V + E) memory, storing only existing connections. An Adjacency Matrix requires an entire V x V grid (O(V^2) space), wasting massive amounts of memory on zero-entries. (تمثيل قوائم التجاور يستهلك ذاكرة O(V + E) فقط بما يتناسب مع الحواف الموجودة فعلياً، بينما تستهلك المصفوفة O(V^2) وتهدر الذاكرة على الخانات الفارغة)."
          },
          {
                    "id": "q11",
                    "question": "In a binary Min-Heap implemented in an array (0-indexed), what are the formulas for finding the parent and left child of node at index i? (في الكومة الصغرى الممثلة في مصفوفة، ما هي معادلات إيجاد الأب والابن الأيسر للعقدة عند الفهرس i؟)",
                    "options": [
                              "Parent: (i - 1) / 2 ; Left Child: 2 * i + 1",
                              "Parent: 2 * i ; Left Child: i / 2",
                              "Parent: i - 1 ; Left Child: i + 1",
                              "Parent: i * 2 ; Left Child: i * 2 + 2"
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! In standard 0-indexed binary heap array representations: Parent is at (i - 1) / 2; Left child is at 2 * i + 1; Right child is at 2 * i + 2. (في تمثيل الكومة الثنائية بالمصفوفات: الأب يكون عند (i - 1) / 2 والابن الأيسر عند 2 * i + 1)."
          },
          {
                    "id": "q12",
                    "question": "What memory leak occurs in an Array-based Stack if pop() simply decrements the top index without setting elements[top] = null? (ما هو تسرب الذاكرة الذي يحدث في المكدس عند الاكتفاء بإنقاص المؤشر دون تصفير الخانة elements[top] = null؟)",
                    "options": [
                              "Stack Underflow Exception",
                              "Loitering / Obsolete Object References: the popped object reference remains in the internal array, preventing the Garbage Collector from reclaiming its memory even though the application has discarded it.",
                              "Segmentation fault in the JVM",
                              "The array size is automatically halved."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! This is the classic Java memory leak known as 'loitering'. Because the array still holds a reference to the popped object, the Garbage Collector cannot reclaim it until the slot is overwritten or the stack is garbage collected. Setting elements[top] = null clears the reference. (بقاء المرجع القديم في خانة المصفوفة يمنع جامع القمامة GC من تحرير كائن المخرجات من الذاكرة، ويجب تصفير الخانة بـ null لتحرير الذاكرة)."
          },
          {
                    "id": "q13",
                    "question": "Which data structure is the optimal choice for implementing a syntax validator that checks if parentheses, brackets, and braces in a code string (e.g. \"{[()]}\") are properly balanced and nested? (أي هيكل بيانات هو الأمثل لبناء مدقق لتوازن الأقواس المتداخلة؟)",
                    "options": [
                              "Queue (FIFO)",
                              "Stack (LIFO)",
                              "Binary Search Tree",
                              "Hash Set"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! A LIFO Stack is ideal: push opening brackets ('(', '[', '{') onto the stack, and when a closing bracket is encountered, pop the top element and verify that it matches the corresponding opening bracket type. (المكدس LIFO هو الأنسب لأن آخر قوس مفتوح يجب أن يكون أول قوس يُغلق)."
          },
          {
                    "id": "q14",
                    "question": "What is the time complexity of deleting an arbitrary node from a Doubly Linked List when you are already given a direct pointer/reference to that target node? (ما هو التعقيد الزمني لحذف عقدة عشوائية من قائمة مترابطة مزدوجة إذا كان لديك مرجع مباشر لتلك العقدة؟)",
                    "options": [
                              "O(n)",
                              "O(1)",
                              "O(log n)",
                              "O(n^2)"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Because each node in a doubly linked list has direct pointers to both its predecessor (node.prev) and successor (node.next), removing it requires only rewiring: node.prev.next = node.next and node.next.prev = node.prev, which executes in O(1) constant time. (امتلاك مؤشري السابق والتالي يتيح إعادة توجيه الروابط فورياً في زمن O(1) دون الحاجة للبحث أو المرور على القائمة)."
          },
          {
                    "id": "q15",
                    "question": "Consider the following Stack operations:\nStack<Integer> s = new Stack<>();\ns.push(10);\ns.push(20);\ns.push(30);\nint a = s.pop();\ns.push(40);\nint b = s.peek();\nWhat are the values of a and b? (ما هي قيم المتغيرين a و b بعد هذه العمليات على المكدس؟)",
                    "options": [
                              "a = 30, b = 40",
                              "a = 10, b = 20",
                              "a = 30, b = 20",
                              "a = 20, b = 40"
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! The stack has [10, 20, 30]. pop() removes and returns 30 (a = 30). The stack is now [10, 20]. push(40) makes it [10, 20, 40]. peek() returns the top element 40 without removing it (b = 40). (العملية pop تخرج 30، ثم إضافة 40 تجعلها على قمة المكدس، واستدعاء peek يقرأ 40 دون حذفها)."
          }
]
        }
      ]
    }
  ];
})();
