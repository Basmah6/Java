/**
 * Java Curriculum Module - Part 27
 * Topics:
 * 53. Java FileOutputStream
 * 54. Java BufferedReader
 * 
 * 100% Offline, Pure JavaScript. Complete educational content with full bilingual (English & Arabic) explanations.
 */

(function () {
  'use strict';

  window.JAVA_TOPICS_PART27 = [
    /* ==========================================================================
       TOPIC 53: Java FileOutputStream
       ========================================================================== */
    {
      id: "java-fileoutputstream",
      title: "53. Java FileOutputStream",
      description: "Mastering FileOutputStream in Java: writing raw bytes, append vs overwrite mode, flushing buffers, force-flushing with FileDescriptor.sync(), creating binary files, and wrapping with BufferedOutputStream & DataOutputStream.",
      lessons: [
        {
          id: "java-fileoutputstream-mastery",
          title: "Complete Guide to Java FileOutputStream",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "Writing Binary Data with FileOutputStream (كتابة البيانات الثنائية عبر FileOutputStream)"
            },
            {
              type: "paragraph",
              text: "FileOutputStream is Java's core byte-oriented destination stream for writing raw binary data directly to files on disk. It handles images, compressed archives, binary serialization formats, and raw protocol bytes. When creating a FileOutputStream, if the file does not exist, Java attempts to create it automatically; if it already exists, its contents are overwritten by default unless the append flag is explicitly set to true. Like all streams, proper closing via try-with-resources is essential to prevent locking files and exhausting OS file descriptors."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "تُعد فئة FileOutputStream صنف الإخراج الأساسي في جافا المخصص لكتابة البيانات الثنائية (البايتات الخام) مباشرة إلى الملفات على القرص الصلب. تُستخدم للتعامل مع ملفات الوسائط المتعددة، والملفات المضغوطة، والبيانات المشفرة. عند إنشاء كائن FileOutputStream، إذا كان الملف غير موجود تحاول جافا إنشاءه تلقائياً؛ وإذا كان موجوداً مسبقاً، يتم استبدال محتواه ومسحه بالكامل افتراضياً إلا إذا تم تفعيل وضع الإلحاق (append = true). ويعد استخدام try-with-resources واجباً لتحرير مقابض الملفات ومنع قفلها."
            },
            {
              type: "paragraph",
              text: "Key Operational Modes: 1) Overwrite vs Append: new FileOutputStream(file, true) appends data to the end rather than truncating the file to zero bytes; 2) Disk Durability: Operating systems buffer disk writes in OS page caches; calling fos.getFD().sync() forces physical hardware sync; 3) Layering: Pair with BufferedOutputStream for high-speed batched writes."
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
              text: "Example 1: Basic Byte Writing & Overwrite Behavior (المثال 1: الكتابة الأساسية للبايتات ووضع الاستبدال الافتراضي)"
            },
            {
              type: "paragraph",
              text: "Writing a byte array to a new file and observing default overwrite behavior."
            },
            {
              type: "code",
              language: "java",
              filename: "BasicFosDemo.java",
              code: `import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class BasicFosDemo {
    public static void main(String[] args) throws IOException {
        File file = File.createTempFile("fos_basic_", ".txt");
        file.deleteOnExit();

        // 1. Initial write
        try (FileOutputStream fos = new FileOutputStream(file)) {
            byte[] msg = "First Message".getBytes();
            fos.write(msg);
        }

        // 2. Overwrite with new message (truncates file to zero bytes before writing)
        try (FileOutputStream fos = new FileOutputStream(file)) {
            byte[] newMsg = "Overwritten Content".getBytes();
            fos.write(newMsg);
        }

        // Verify result
        try (FileInputStream fis = new FileInputStream(file)) {
            System.out.println("Final content: " + new String(fis.readAllBytes()));
        }
    }
}`,
              output: `Final content: Overwritten Content`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "By default, new FileOutputStream(file) truncates the file immediately to 0 bytes upon creation, completely replacing previous contents."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "يقوم منشئ FileOutputStream(file) الافتراضي بمسح محتويات الملف فوراً وتصفيره لكتابة البيانات الجديدة مكانه بالكامل."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Appending Data with append = true (المثال 2: وضع الإلحاق لحفظ السجلات دون مسح القديم)"
            },
            {
              type: "paragraph",
              text: "Passing the second boolean argument 'true' to preserve existing data and append to the end."
            },
            {
              type: "code",
              language: "java",
              filename: "AppendFosDemo.java",
              code: `import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class AppendFosDemo {
    public static void main(String[] args) throws IOException {
        File logFile = File.createTempFile("audit_", ".log");
        logFile.deleteOnExit();

        // Pass 'true' for append mode
        try (FileOutputStream fos = new FileOutputStream(logFile, true)) {
            fos.write("Entry 1: System Booted\\n".getBytes());
        }

        try (FileOutputStream fos = new FileOutputStream(logFile, true)) {
            fos.write("Entry 2: User Authenticated\\n".getBytes());
        }

        try (FileOutputStream fos = new FileOutputStream(logFile, true)) {
            fos.write("Entry 3: Request Handled\\n".getBytes());
        }

        // Verify all 3 entries are retained
        try (FileInputStream fis = new FileInputStream(logFile)) {
            System.out.println("Log file contents:\\n" + new String(fis.readAllBytes()));
        }
    }
}`,
              output: `Log file contents:
Entry 1: System Booted
Entry 2: User Authenticated
Entry 3: Request Handled`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "Setting the append parameter to true preserves existing file bytes and directs writes to the current end of the file."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "تمرير القيمة true يفعّل وضع الإلحاق (Append Mode)، فيتم الحفاظ على السطور السابقة وإضافة السطور الجديدة في نهاية الملف."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Writing Sub-Array Slices with write(b, off, len) (المثال 3: كتابة جزء محدد من مصفوفة البايتات)"
            },
            {
              type: "paragraph",
              text: "Writing only a designated window of bytes from a larger array."
            },
            {
              type: "code",
              language: "java",
              filename: "SliceWriteDemo.java",
              code: `import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class SliceWriteDemo {
    public static void main(String[] args) throws IOException {
        File file = File.createTempFile("slice_demo_", ".txt");
        file.deleteOnExit();

        byte[] alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".getBytes();

        try (FileOutputStream fos = new FileOutputStream(file)) {
            // Write only letters 'G' through 'N' (offset 6, length 8)
            fos.write(alphabet, 6, 8);
        }

        try (FileInputStream fis = new FileInputStream(file)) {
            System.out.println("Extracted slice in file: " + new String(fis.readAllBytes()));
        }
    }
}`,
              output: `Extracted slice in file: GHIJKLMN`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "write(byte[] b, int off, int len) prevents redundant array allocations when writing parts of a buffer."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "تتيح write(b, off, len) كتابة جزء محدد من المصفوفة بدقة دون الحاجة لإنشاء مصفوفات فرعية إضافية في الذاكرة."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Generating a Valid 1x1 Transparent GIF Image (المثال 4: إنشاء ملف صورة GIF ثنائي سليم برمجياً)"
            },
            {
              type: "paragraph",
              text: "Writing binary image byte structures directly to disk with FileOutputStream."
            },
            {
              type: "code",
              language: "java",
              filename: "BinaryImageGeneratorDemo.java",
              code: `import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

public class BinaryImageGeneratorDemo {
    public static void main(String[] args) throws IOException {
        File gif = File.createTempFile("pixel_", ".gif");
        gif.deleteOnExit();

        // Exact binary specification for a 1x1 transparent GIF89a
        byte[] transparentPixelGif = new byte[] {
            0x47, 0x49, 0x46, 0x38, 0x39, 0x61, 0x01, 0x00, 0x01, 0x00,
            (byte) 0x80, 0x00, 0x00, (byte) 0xFF, (byte) 0xFF, (byte) 0xFF,
            0x00, 0x00, 0x00, 0x21, (byte) 0xF9, 0x04, 0x01, 0x00,
            0x00, 0x00, 0x00, 0x2C, 0x00, 0x00, 0x00, 0x00,
            0x01, 0x00, 0x01, 0x00, 0x00, 0x02, 0x02, 0x44,
            0x01, 0x00, 0x3B
        };

        try (FileOutputStream fos = new FileOutputStream(gif)) {
            fos.write(transparentPixelGif);
            fos.flush();
        }

        System.out.println("Generated valid 1x1 GIF binary file: " + gif.getName());
        System.out.println("Physical file length on disk: " + gif.length() + " bytes");
    }
}`,
              output: `Generated valid 1x1 GIF binary file: pixel_...gif
Physical file length on disk: 43 bytes`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "FileOutputStream gives you raw, uncorrupted byte-level access, essential for generating binary assets like images and fonts."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "يوفر FileOutputStream كتابة دقيقة على مستوى البايت بدون أي تشويه، وهو ما تحتاجه لبناء ملفات الصور والخطوط برمجياً."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Guaranteed Hardware Persistence with FileDescriptor.sync() (المثال 5: الحفظ الإجباري على القرص الصلب عبر sync)"
            },
            {
              type: "paragraph",
              text: "Ensuring transaction logs are physically written to the storage platter or SSD controller."
            },
            {
              type: "code",
              language: "java",
              filename: "FileSyncDemo.java",
              code: `import java.io.File;
import java.io.FileDescriptor;
import java.io.FileOutputStream;
import java.io.IOException;

public class FileSyncDemo {
    public static void writeTransactionRecord(File file, String transactionData) throws IOException {
        try (FileOutputStream fos = new FileOutputStream(file, true)) {
            fos.write(transactionData.getBytes());
            fos.flush(); // Empties Java application-level buffers

            // Force the underlying OS page cache to flush to physical hardware storage
            FileDescriptor fd = fos.getFD();
            fd.sync();
            System.out.println("Hardware sync complete: Transaction persisted to physical disk.");
        }
    }

    public static void main(String[] args) throws IOException {
        File journal = File.createTempFile("journal_", ".wal");
        journal.deleteOnExit();

        writeTransactionRecord(journal, "TX_101: COMMIT balance=5000 USD\\n");
    }
}`,
              output: `Hardware sync complete: Transaction persisted to physical disk.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "fos.flush() only pushes bytes to OS caches. Calling fd.sync() triggers an fsync system call, guaranteeing durability across power outages."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "تقوم flush() بتفريغ البفر لذاكرة نظام التشغيل فقط؛ أما fd.sync() فتجبر القرص الصلب (SSD/HDD) على كتابة البيانات فعلياً لضمان عدم ضياعها."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: High-Speed Batched Writes with BufferedOutputStream (المثال 6: الكتابة المجمعة فائقة السرعة بالبفر)"
            },
            {
              type: "paragraph",
              text: "Wrapping FileOutputStream with BufferedOutputStream to write thousands of records efficiently."
            },
            {
              type: "code",
              language: "java",
              filename: "BufferedFosDemo.java",
              code: `import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

public class BufferedFosDemo {
    public static void main(String[] args) throws IOException {
        File dataFile = File.createTempFile("sensors_", ".dat");
        dataFile.deleteOnExit();

        int recordCount = 50_000;
        long startTime = System.currentTimeMillis();

        // Wrap FileOutputStream in an 8KB BufferedOutputStream
        try (BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(dataFile))) {
            for (int i = 0; i < recordCount; i++) {
                bos.write(i % 256);
            }
            bos.flush();
        }

        long elapsed = System.currentTimeMillis() - startTime;
        System.out.println("Wrote " + recordCount + " bytes via BufferedOutputStream in " + elapsed + " ms.");
        System.out.println("Target file size verified: " + dataFile.length() + " bytes");
    }
}`,
              output: `Wrote 50000 bytes via BufferedOutputStream in 8 ms.
Target file size verified: 50000 bytes`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "BufferedOutputStream groups individual write calls into 8192-byte chunks, reducing OS interrupts from 50,000 down to roughly 6."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "يقوم BufferedOutputStream بتجميع عمليات الكتابة في كتل بحجم 8KB، مما يقلل مقاطعات نظام التشغيل من 50,000 إلى 6 استدعاءات فقط."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Writing Primitive Values with DataOutputStream (المثال 7: كتابة البيانات الأولية ثنائياً عبر DataOutputStream)"
            },
            {
              type: "paragraph",
              text: "Serializing primitives (int, double, UTF strings) in big-endian binary format."
            },
            {
              type: "code",
              language: "java",
              filename: "DataFosDemo.java",
              code: `import java.io.DataOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

public class DataFosDemo {
    public static void main(String[] args) throws IOException {
        File binFile = File.createTempFile("player_", ".bin");
        binFile.deleteOnExit();

        try (DataOutputStream dos = new DataOutputStream(new FileOutputStream(binFile))) {
            dos.writeInt(9982);           // 4 bytes
            dos.writeLong(1692837465123L); // 8 bytes
            dos.writeDouble(98.75);        // 8 bytes
            dos.writeBoolean(true);        // 1 byte
            dos.writeUTF("Archmage");      // 2 bytes length + string bytes
            dos.flush();
        }

        System.out.println("Primitives written to binary file successfully.");
        System.out.println("Total binary payload size: " + binFile.length() + " bytes");
    }
}`,
              output: `Primitives written to binary file successfully.
Total binary payload size: 31 bytes`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "DataOutputStream converts Java primitive types directly into machine-independent big-endian byte sequences on disk."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "يحول DataOutputStream الأنواع الأولية (int, double, إلخ) إلى بايتات ثنائية موحدة مستقلة عن نوع المعالج والنظام."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Atomic File Write Pattern (المثال 8: نمط الكتابة الذري الآمن لمنع تلف الملفات)"
            },
            {
              type: "paragraph",
              text: "Writing to a temporary file first and renaming atomically to guarantee file integrity during crashes."
            },
            {
              type: "code",
              language: "java",
              filename: "AtomicFileWriteDemo.java",
              code: `import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;

public class AtomicFileWriteDemo {
    public static void writeSafely(File targetFile, byte[] payload) throws IOException {
        // 1. Write to temporary sibling file first
        File tempSibling = new File(targetFile.getParentFile(), targetFile.getName() + ".tmp");

        try (FileOutputStream fos = new FileOutputStream(tempSibling)) {
            fos.write(payload);
            fos.flush();
            fos.getFD().sync(); // Ensure written to disk
        }

        // 2. Atomically move/rename temporary file over target
        Files.move(tempSibling.toPath(), targetFile.toPath(),
                StandardCopyOption.ATOMIC_MOVE,
                StandardCopyOption.REPLACE_EXISTING);

        System.out.println("Atomically replaced " + targetFile.getName() + " with verified data.");
    }

    public static void main(String[] args) throws IOException {
        File config = File.createTempFile("system_cfg_", ".json");
        config.deleteOnExit();

        writeSafely(config, "{\\"status\\":\\"HEALTHY\\",\\"workers\\":4}".getBytes());
    }
}`,
              output: `Atomically replaced system_cfg_...json with verified data.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "Writing directly to critical files risks corrupting them if the JVM crashes mid-write. The temp-file + ATOMIC_MOVE pattern guarantees all-or-nothing updates."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "الكتابة المباشرة في ملفات الإعدادات قد تتلفها إن انقطع التيار أثناء الكتابة؛ يضمن نمط الكتابة في ملف مؤقت ثم النقل الذري (Atomic Move) سلامة البيانات دائماً."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Exclusive File Locking with FileChannel.lock() (المثال 9: قفل الملف لمنع التعديل المتزامن)"
            },
            {
              type: "paragraph",
              text: "Acquiring an exclusive OS-level file lock using fos.getChannel().lock()."
            },
            {
              type: "code",
              language: "java",
              filename: "FileLockDemo.java",
              code: `import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.channels.FileChannel;
import java.nio.channels.FileLock;

public class FileLockDemo {
    public static void main(String[] args) throws IOException {
        File sharedFile = File.createTempFile("shared_resource_", ".lock");
        sharedFile.deleteOnExit();

        try (FileOutputStream fos = new FileOutputStream(sharedFile);
             FileChannel channel = fos.getChannel();
             FileLock lock = channel.lock()) { // Acquire exclusive lock

            System.out.println("Acquired exclusive lock? " + lock.isValid());
            System.out.println("Is lock shared? " + lock.isShared());

            fos.write("Process A exclusive output\\n".getBytes());
            fos.flush();

            System.out.println("Critical write completed under exclusive lock.");
        } // Lock is automatically released upon closing channel/stream

        System.out.println("File lock released.");
    }
}`,
              output: `Acquired exclusive lock? true
Is lock shared? false
Critical write completed under exclusive lock.
File lock released.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "channel.lock() prevents other processes on the operating system from simultaneously writing to or corrupting the shared file."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "تمنع channel.lock() العمليات الأخرى في نظام التشغيل من الكتابة المتزامنة في الملف وتضمن حماية الملف من التداخل."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Writing Zip Archives using ZipOutputStream (المثال 10: إنشاء وضغط ملفات ZIP عبر ZipOutputStream)"
            },
            {
              type: "paragraph",
              text: "Decorating FileOutputStream with ZipOutputStream to create compressed zip files."
            },
            {
              type: "code",
              language: "java",
              filename: "ZipOutputStreamDemo.java",
              code: `import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

public class ZipOutputStreamDemo {
    public static void main(String[] args) throws IOException {
        File zipFile = File.createTempFile("bundle_", ".zip");
        zipFile.deleteOnExit();

        try (ZipOutputStream zos = new ZipOutputStream(new FileOutputStream(zipFile))) {
            // Add entry 1
            ZipEntry entry1 = new ZipEntry("readme.txt");
            zos.putNextEntry(entry1);
            zos.write("Welcome to the compressed package!".getBytes());
            zos.closeEntry();

            // Add entry 2
            ZipEntry entry2 = new ZipEntry("data/info.json");
            zos.putNextEntry(entry2);
            zos.write("{\\"version\\": 1}".getBytes());
            zos.closeEntry();

            zos.finish();
        }

        System.out.println("ZIP archive created: " + zipFile.getName());
        System.out.println("Archive size: " + zipFile.length() + " bytes");
    }
}`,
              output: `ZIP archive created: bundle_...zip
Archive size: 260 bytes`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "ZipOutputStream directly compresses bytes into standard ZIP format before handing them off to the underlying FileOutputStream."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "يقوم ZipOutputStream بضغط البيانات تلقائياً وتنسيقها في بنية ZIP القياسية ثم إرسالها إلى FileOutputStream."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Converting Text with OutputStreamWriter (UTF-8) (المثال 11: ربط كتابة النصوص بالترميز المخصص OutputStreamWriter)"
            },
            {
              type: "paragraph",
              text: "Bridging character writes to byte writes using OutputStreamWriter and BufferedWriter."
            },
            {
              type: "code",
              language: "java",
              filename: "FosWriterBridgeDemo.java",
              code: `import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.nio.charset.StandardCharsets;

public class FosWriterBridgeDemo {
    public static void main(String[] args) throws IOException {
        File file = File.createTempFile("utf8_text_", ".txt");
        file.deleteOnExit();

        // Bridge byte stream to character stream with explicit UTF-8
        try (FileOutputStream fos = new FileOutputStream(file);
             OutputStreamWriter osw = new OutputStreamWriter(fos, StandardCharsets.UTF_8);
             BufferedWriter bw = new BufferedWriter(osw)) {

            bw.write("Line 1: High precision character streaming.");
            bw.newLine();
            bw.write("Line 2: جافا تدعم تعدد اللغات وترميز يونيكود بسلاسة.");
            bw.newLine();
            bw.flush();
        }

        try (FileInputStream fis = new FileInputStream(file)) {
            System.out.println("Written bytes length: " + fis.readAllBytes().length);
            System.out.println("Verified encoding safety across platforms.");
        }
    }
}`,
              output: `Written bytes length: 147
Verified encoding safety across platforms.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "OutputStreamWriter transforms Unicode chars into UTF-8 bytes, providing full internationalization support on top of raw FileOutputStream."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "يحول OutputStreamWriter الحروف إلى بايتات UTF-8 سليمة، مما يتيح كتابة النصوص بجميع اللغات العالمية على FileOutputStream بأمان تام."
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
                "Mistake 1: Forgetting that new FileOutputStream(file) erases all existing contents if append=true is omitted.",
                "خطأ 1: نسيان أن منشئ FileOutputStream(file) يمسح محتوى الملف القديم بالكامل ما لم يُحدد append=true.",
                "Mistake 2: Writing strings using str.getBytes() without specifying StandardCharsets.UTF_8, causing character corruption on machines with differing default encodings.",
                "خطأ 2: استخدام str.getBytes() دون تحديد UTF-8، مما يسبب تشوه النصوص عند تشغيل البرنامج على خوادم بأنظمة ترميز مختلفة.",
                "Mistake 3: Relying on fos.flush() alone for crash-resilient databases without calling fos.getFD().sync() to bypass OS page caching.",
                "خطأ 3: الاكتفاء بـ flush() وحدها دون sync() عند بناء قواعد بيانات؛ فالبيانات تظل في كاش نظام التشغيل وتضيع عند انقطاع الكهرباء.",
                "Mistake 4: Writing thousands of single bytes directly with fos.write(b) without wrapping in BufferedOutputStream."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Rolling Binary Audit Logger (التحدي العملي: مسجل الأحداث الثنائي المتدحرج)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Create a class 'RollingAuditLogger' that writes timestamped binary audit records (8-byte long timestamp + 2-byte short event code) to a file in append mode. If the file size exceeds 100 bytes, roll over to a new file '<name>.1'. Test in main() by logging 10 events (each 10 bytes) and verify rollover occurs."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: قم بإنشاء فئة RollingAuditLogger تكتب سجلات تدقيق ثنائية في وضع الإلحاق (طابع زمني long بحجم 8 بايت + كود الحدث short بحجم 2 بايت). وإذا تجاوز حجم الملف 100 بايت، يتم إنشاء ملف جديد متدحرج. اختبر الكلاس بكتابة 10 سجلات في main وتأكد من التدحرج التلقائي."
            },
            {
              type: "code",
              language: "java",
              filename: "RollingAuditLoggerChallenge.java",
              code: `import java.io.DataOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

public class RollingAuditLoggerChallenge {
    static class RollingAuditLogger {
        private final File baseFile;
        private final long maxBytes;
        private int rollIndex = 0;

        public RollingAuditLogger(File baseFile, long maxBytes) {
            this.baseFile = baseFile;
            this.maxBytes = maxBytes;
        }

        private File getCurrentFile() {
            if (rollIndex == 0) return baseFile;
            return new File(baseFile.getParent(), baseFile.getName() + "." + rollIndex);
        }

        public void logEvent(short eventCode) throws IOException {
            File target = getCurrentFile();
            if (target.exists() && target.length() >= maxBytes) {
                rollIndex++;
                target = getCurrentFile();
                System.out.println("==> Rolled over to new file: " + target.getName());
            }

            try (DataOutputStream dos = new DataOutputStream(new FileOutputStream(target, true))) {
                dos.writeLong(System.currentTimeMillis()); // 8 bytes
                dos.writeShort(eventCode);                 // 2 bytes
                dos.flush();
            }
        }
    }

    public static void main(String[] args) throws IOException {
        File auditFile = File.createTempFile("audit_roll_", ".dat");
        auditFile.deleteOnExit();

        RollingAuditLogger logger = new RollingAuditLogger(auditFile, 50); // Max 50 bytes (5 records per file)

        System.out.println("Logging 8 events (10 bytes each)...");
        for (short code = 101; code <= 108; code++) {
            logger.logEvent(code);
        }

        System.out.println("Base file size: " + auditFile.length() + " bytes.");
    }
}`,
              output: `Logging 8 events (10 bytes each)...
==> Rolled over to new file: audit_roll_...dat.1
Base file size: 50 bytes.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "Each event writes exactly 10 bytes (8 + 2). After 5 writes (50 bytes), the logger automatically rolls over to a new sequentially numbered file, preserving storage limits."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "يكتب كل حدث 10 بايتات؛ وبعد 5 عمليات كتابة (50 بايت) يكتشف المسجل تجاوز الحد الأقصى ويتدحرج تلقائياً لملف جديد."
            }
          ],
          quiz: [
          {
                    "id": "q1",
                    "question": "What is the default behavior of new FileOutputStream(\"output.txt\") if the file already exists on disk? (ما هو السلوك الافتراضي لـ new FileOutputStream إذا كان الملف موجوداً مسبقاً؟)",
                    "options": [
                              "It appends new data to the end of the existing file.",
                              "It truncates (overwrites) the file, resetting its length to zero.",
                              "It throws a FileAlreadyExistsException.",
                              "It prompts the user in the console to confirm replacement."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! By default, the single-argument constructor new FileOutputStream(file) opens the file in overwrite mode, truncating any existing file to 0 bytes. To append, you must pass true: new FileOutputStream(file, true). (الوضع الافتراضي هو مسح واستبدال محتوى الملف بالكامل وتصفير حجمه، وللإلحاق يجب تمرير true)."
          },
          {
                    "id": "q2",
                    "question": "What happens if you construct new FileOutputStream(\"dir/sub/file.bin\") when the parent directory 'dir/sub' does not exist? (ماذا يحدث عند محاولة إنشاء FileOutputStream داخل مجلدات غير موجودة؟)",
                    "options": [
                              "FileOutputStream automatically creates all missing parent directories.",
                              "It throws a FileNotFoundException because the parent directory path does not exist.",
                              "It writes the file directly into the root directory instead.",
                              "It creates a virtual in-memory file."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! FileOutputStream will create the file if the parent directory already exists, but it will NOT create missing directories. If the parent path does not exist, a FileNotFoundException is thrown. You must call parent.mkdirs() first. (ينشئ FileOutputStream الملف نفسه فقط إن كان المجلد الأب موجوداً، ولكنه لا ينشئ المجلدات المفقودة ويطلق FileNotFoundException إذا لم تكن موجودة)."
          },
          {
                    "id": "q3",
                    "question": "Why doesn't calling fos.flush() on a direct, unbuffered FileOutputStream guarantee that data is physically written to the hard drive platter/SSD? (لماذا لا يضمن استدعاء fos.flush على FileOutputStream غير مغلّف كتابة البيانات على القرص الصلب فعلياً؟)",
                    "options": [
                              "Because flush() on unbuffered FileOutputStream is an inherited empty no-op; data may still reside in the OS kernel page cache until fsync is called.",
                              "Because flush() only works on Mondays.",
                              "Because FileOutputStream deletes data when flushed.",
                              "Because SSDs do not support write operations."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! FileOutputStream does not maintain a user-space buffer, so its flush() does nothing. The data is handed to the operating system kernel cache. To force the OS to sync data to physical media, you must call fos.getFD().sync(). (دالة flush في FileOutputStream فارغة ولا تفعل شيئاً لأن التخزين في كاش نظام التشغيل، ولإجبار الحفظ على القرص الصلب يجب استدعاء getFD().sync())."
          },
          {
                    "id": "q4",
                    "question": "Which method guarantees that all pending OS kernel buffers for a FileOutputStream are flushed and committed to the physical storage hardware? (أي دالة تضمن كتابة كافة بيانات كاش نظام التشغيل إلى وسيط التخزين الفيزيائي مباشرة؟)",
                    "options": [
                              "fos.flushHard()",
                              "fos.getFD().sync()",
                              "fos.commit()",
                              "fos.persistNow()"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! FileDescriptor.sync() forces all system buffers to synchronize with the underlying physical device, ensuring durability against unexpected power failure or OS crashes. (استدعاء sync() على FileDescriptor يجبر نظام التشغيل على كتابة كافة البيانات من الذاكرة المؤقتة إلى القرص الفيزيائي فوراً)."
          },
          {
                    "id": "q5",
                    "question": "What is the primary benefit of wrapping FileOutputStream in a BufferedOutputStream? (ما الفائدة الأساسية من تغليف FileOutputStream بـ BufferedOutputStream؟)",
                    "options": [
                              "It automatically compresses the data using ZIP format.",
                              "It batches small individual writes into an internal memory buffer (typically 8KB), reducing the frequency of costly OS write system calls.",
                              "It prevents unauthorized users from viewing the file.",
                              "It allows writing to read-only partitions."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Writing single bytes or small arrays directly to FileOutputStream incurs an OS kernel transition on every call. BufferedOutputStream collects data in an 8KB memory buffer, executing write system calls only when the buffer fills up. (يقوم بتجميع عمليات الكتابة الصغيرة في الذاكرة RAM وكتابتها على دفعات 8KB، مما يقلل استدعاءات نظام التشغيل البطيئة)."
          },
          {
                    "id": "q6",
                    "question": "What fatal bug occurs in this code?\nFileOutputStream fos = new FileOutputStream(\"log.txt\");\nBufferedOutputStream bos = new BufferedOutputStream(fos);\nbos.write(\"Transaction approved\".getBytes());\n// No flush or close called\n(ما الخطأ الفادح في هذا الكود؟)",
                    "options": [
                              "A compilation error occurs on getBytes().",
                              "Because the buffer was neither flushed nor closed, the written data remains in the 8KB memory buffer and may never be written to disk, leaving an empty or truncated file.",
                              "The operating system restarts unexpectedly.",
                              "BufferedOutputStream automatically deletes log.txt."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! BufferedOutputStream holds written data in its memory buffer until it reaches 8192 bytes. Without calling flush() or close(), data remaining in the buffer is lost when the program terminates. Using try-with-resources avoids this bug. (البيانات تظل عالقة في البفر لأن حجمها أقل من 8KB ولم يتم استدعاء flush أو close، مما يؤدي لضياعها وظهور الملف فارغاً)."
          },
          {
                    "id": "q7",
                    "question": "In the atomic file write pattern, why do enterprise systems write to a temporary file before renaming it to the final destination? (في نمط الكتابة الذري، لماذا تكتب الأنظمة لملف مؤقت أولاً ثم تعيد تسميته للملف النهائي؟)",
                    "options": [
                              "To confuse virus scanners.",
                              "To ensure that if the application or server crashes mid-write, the existing original destination file remains completely intact rather than left partially written or corrupted.",
                              "Because FileOutputStream cannot write to files with the .txt extension directly.",
                              "To automatically encrypt the file with Windows BitLocker."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Writing directly to the target file risks leaving it corrupted or truncated if a power failure or exception occurs halfway through. Writing to a temp file and performing an atomic rename (Files.move with ATOMIC_MOVE) guarantees all-or-nothing durability. (الكتابة المباشرة قد تترك الملف تالفاً إذا انقطعت الكهرباء أو حدث خطأ أثناء الكتابة، بينما الكتابة في ملف مؤقت ثم النقل الذري يضمن سلامة الملف الأصلي)."
          },
          {
                    "id": "q8",
                    "question": "Consider the following code snippet:\ntry (FileOutputStream fos = new FileOutputStream(\"nums.dat\")) {\n    fos.write(260);\n}\nWhat byte value is actually stored in nums.dat? (ما هي قيمة البايت المخزنة فعلياً في الملف؟)",
                    "options": [
                              "260 (stored as a 32-bit integer across 4 bytes)",
                              "4 (the lower 8 bits: 260 % 256 = 4)",
                              "255 (the maximum byte limit)",
                              "An IllegalArgumentException is thrown at runtime."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! FileOutputStream.write(int b) writes only the eight low-order bits of the argument; the 24 high-order bits are discarded. 260 in binary is 0x00000104, so only 0x04 (4) is written. To write full ints, use DataOutputStream. (دالة write تأخذ فقط أول 8 بت من العدد وتتجاهل الباقي: 260 تعادل 4 بعد أخذ البايت الأخير فقط)."
          },
          {
                    "id": "q9",
                    "question": "How do you acquire an exclusive lock on a file being written with FileOutputStream to prevent other processes from modifying it? (كيف تحصل على قفل استئثاري لمنع العمليات الأخرى من تعديل الملف أثناء الكتابة؟)",
                    "options": [
                              "fos.getChannel().lock();",
                              "fos.setExclusive(true);",
                              "synchronized(fos.getFile()) { }",
                              "File.setReadOnly(true);"
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! fos.getChannel().lock() acquires an exclusive lock on the file associated with the channel, blocking other processes from acquiring overlapping locks until released. (دالة lock على قناة FileChannel تمنح قفلاً استئثارياً يمنع العمليات الأخرى من تعديل الملف حتى فك القفل)."
          },
          {
                    "id": "q10",
                    "question": "When constructing a Zip file archive using ZipOutputStream over a FileOutputStream, what must be called before and after writing data for each file inside the archive? (عند إنشاء ملف ZIP، ماذا يجب استدعاؤه قبل وبعد كتابة بيانات كل ملف داخله؟)",
                    "options": [
                              "zos.startFile() and zos.endFile()",
                              "zos.putNextEntry(new ZipEntry(\"name\")) and zos.closeEntry()",
                              "zos.openZip() and zos.saveZip()",
                              "zos.newFolder() and zos.commitFolder()"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! ZipOutputStream requires defining entries sequentially: call zos.putNextEntry(new ZipEntry(\"filename.txt\")), write the payload bytes, and call zos.closeEntry() before beginning the next file. (تتطلب مكتبة ZIP استدعاء putNextEntry لفتح ترويسة الملف ثم كتابة بايتاته ثم استدعاء closeEntry لإنهاء المدخلة والانتقال لغيرها)."
          },
          {
                    "id": "q11",
                    "question": "Which code snippet correctly writes UTF-8 encoded text to a FileOutputStream? (أي من الخيارات التالية يكتب نصوصاً بترميز UTF-8 بشكل صحيح وآمن إلى FileOutputStream؟)",
                    "options": [
                              "fos.write(\"Hello\".getBytes()); // relies on platform default charset",
                              "try (Writer writer = new OutputStreamWriter(fos, StandardCharsets.UTF_8)) { writer.write(\"Hello\"); }",
                              "fos.writeChars(\"Hello\");",
                              "fos.writeUTF8(\"Hello\");"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Using OutputStreamWriter with explicit StandardCharsets.UTF_8 is the standard, robust pattern for writing text to an output stream without depending on the operating system's default encoding. (استخدام OutputStreamWriter مع تحديد الترميز UTF-8 صراحة يضمن سلامة الحروف وعدم الاعتماد على ترميز نظام التشغيل الافتراضي)."
          },
          {
                    "id": "q12",
                    "question": "What is the result of running this code twice?\ntry (FileOutputStream fos = new FileOutputStream(\"test.txt\", true)) {\n    fos.write(\"AB\".getBytes());\n}\n(ما هي النتيجة بعد تشغيل هذا الكود مرتين؟)",
                    "options": [
                              "test.txt contains \"AB\"",
                              "test.txt contains \"ABAB\"",
                              "The second run throws a FileAlreadyExistsException.",
                              "test.txt is corrupted and unreadable."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Because append = true is passed to the constructor, subsequent writes are appended to the end of the existing file rather than truncating it. Two runs will result in \"ABAB\". (بسبب تمرير true في المعامل الثاني لوضع الإلحاق، ستتم إضافة النص في نهاية الملف بدلاً من مسحه فيكون المحتوى ABAB)."
          },
          {
                    "id": "q13",
                    "question": "What exception is thrown if you try to open a FileOutputStream on a file that is marked as read-only by the operating system? (ما الاستثناء الذي يُطلق عند محاولة فتح FileOutputStream على ملف مخصص للقراءة فقط؟)",
                    "options": [
                              "ReadOnlyFileException",
                              "FileNotFoundException (with a message indicating Access is denied)",
                              "NullPointerException",
                              "SecurityBypassException"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! In Java standard I/O, attempting to open a read-only file with FileOutputStream throws a FileNotFoundException (historically named), typically with the message '(Access is denied)'. (تطلق جافا استثناء FileNotFoundException مع رسالة تفيد برفض الوصول Access is denied)."
          },
          {
                    "id": "q14",
                    "question": "What does fos.write(byte[] b, int off, int len) do if off is 2 and len is 3 for byte[] b = {10, 20, 30, 40, 50, 60}? (ما الذي تكتبه الدالة عندما يكون off=2 و len=3؟)",
                    "options": [
                              "It writes 10, 20, 30",
                              "It writes 30, 40, 50",
                              "It writes 20, 30, 40",
                              "It throws an IndexOutOfBoundsException."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! The offset off=2 specifies starting at index 2 (value 30), and len=3 specifies writing 3 bytes (indices 2, 3, 4 -> values 30, 40, 50). (نبدأ من الإزاحة 2 وهي القيمة 30 ونكتب 3 بايتات وهي 30 و 40 و 50)."
          },
          {
                    "id": "q15",
                    "question": "In a rolling audit log system where logs must be rotated when reaching 5MB, how should you check the current file size before writing? (في نظام السجلات المتدحرجة، كيف تتحقق من حجم الملف للتدوير عند بلوغ 5MB؟)",
                    "options": [
                              "Check fos.getChannel().size() or new File(logPath).length() against the 5MB threshold before appending.",
                              "Read the whole file into an array with fis.readAllBytes() every time.",
                              "Check fos.available().",
                              "Check Runtime.getRuntime().freeMemory()."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! You can query fos.getChannel().size() on the active channel or File.length() to accurately get the physical size on disk without reading file content into memory. (التحقق من حجم الملف عبر channel.size أو File.length() يعطي الحجم الحالي بدقة فائقة دون استهلاك للذاكرة)."
          }
]
        }
      ]
    },

    /* ==========================================================================
       TOPIC 54: Java BufferedReader
       ========================================================================== */
    {
      id: "java-bufferedreader",
      title: "54. Java BufferedReader",
      description: "Master Java BufferedReader: 8192-character internal buffer, readLine() iteration, stream integration via lines(), character-by-character reading, mark()/reset() lookahead, bridging from System.in and files, and large file processing.",
      lessons: [
        {
          id: "java-bufferedreader-mastery",
          title: "Complete Guide to Java BufferedReader",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "High-Efficiency Character Reading with BufferedReader (القراءة النصية عالية الكفاءة عبر BufferedReader)"
            },
            {
              type: "paragraph",
              text: "BufferedReader is Java's premier character-stream reader class. It wraps any underlying Reader (such as FileReader or InputStreamReader) with a default 8,192-character (8 KB) in-memory buffer. This buffering eliminates frequent disk reads or network trips. Its flagship method, 'readLine()', parses characters until encountering a line feed ('\\n'), carriage return ('\\r'), or EOF, returning clean String instances without newline characters. In modern Java (Java 8+), its 'lines()' method produces a lazy Stream<String>, enabling declarative functional pipelines."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "تُعد فئة BufferedReader الصنف الرائد في جافا لقراءة النصوص والمحارف بكفاءة متناهية. تقوم بتغليف أي قارئ نصوص آخر (مثل FileReader أو InputStreamReader) بمخزن مؤقت داخلي بحجم افتراضي 8,192 محرفاً. وتبرز أهميتها في دالة 'readLine()' التي تقرأ سطراً كاملاً حتى الوصول إلى علامة نهاية السطر ('\\n' أو '\\r') وتُرجع النص بدون علامة السطر. وفي جافا الحديثة توفر دالة 'lines()' التي تُرجع Stream<String> لمعالجة الملفات الضخمة برمجياً وتدريجياً دون استهلاك مفرط للذاكرة."
            },
            {
              type: "paragraph",
              text: "Key Architectural Highlights: 1) readLine() returns null at EOF: Unlike InputStream.read() which returns -1, readLine() signals end-of-file with null; 2) Lookahead Parsing: BufferedReader fully supports mark(readAheadLimit) and reset() for tokenizer lookaheads; 3) Bridging System.in: BufferedReader wrapped around new InputStreamReader(System.in) is the standard high-performance alternative to Scanner for competitive programming."
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
              text: "Example 1: Classic Line-by-Line Reading with readLine() (المثال 1: القراءة الكلاسيكية سطراً بسطر عبر readLine)"
            },
            {
              type: "paragraph",
              text: "The standard while ((line = br.readLine()) != null) loop."
            },
            {
              type: "code",
              language: "java",
              filename: "ClassicReadLineDemo.java",
              code: `import java.io.BufferedReader;
import java.io.StringReader;
import java.io.IOException;

public class ClassicReadLineDemo {
    public static void main(String[] args) {
        String text = "First Line\\nSecond Line\\nThird Line";

        try (BufferedReader br = new BufferedReader(new StringReader(text))) {
            String line;
            int lineNum = 1;

            // readLine() returns null when EOF is reached
            while ((line = br.readLine()) != null) {
                System.out.println("Line " + lineNum++ + ": " + line);
            }
        } catch (IOException e) {
            System.err.println("I/O Error: " + e.getMessage());
        }
    }
}`,
              output: `Line 1: First Line
Line 2: Second Line
Line 3: Third Line`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "readLine() strips line terminators (\\n, \\r) automatically and returns null to signal the end of the character stream."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "تتخلص readLine() تلقائياً من علامات نهايات السطور وتُرجع null للدلالة على الوصول لنهاية النص المقروء."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Reading Files with Custom Buffer Size (المثال 2: تحديد حجم المخزن المؤقت يدوياً)"
            },
            {
              type: "paragraph",
              text: "Configuring a custom buffer capacity (e.g., 32,768 characters) for heavy I/O workloads."
            },
            {
              type: "code",
              language: "java",
              filename: "CustomBufferSizeDemo.java",
              code: `import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

public class CustomBufferSizeDemo {
    public static void main(String[] args) throws IOException {
        File temp = File.createTempFile("large_text_", ".txt");
        temp.deleteOnExit();

        try (FileWriter fw = new FileWriter(temp)) {
            for (int i = 1; i <= 500; i++) {
                fw.write("Record item index #" + i + "\\n");
            }
        }

        // Initialize with custom 32KB buffer size (32768 chars)
        int customBufferChars = 32 * 1024;
        try (BufferedReader br = new BufferedReader(new FileReader(temp), customBufferChars)) {
            String firstLine = br.readLine();
            System.out.println("First line: " + firstLine);

            int count = 1;
            while (br.readLine() != null) {
                count++;
            }
            System.out.println("Total records processed with 32KB buffer: " + count);
        }
    }
}`,
              output: `First line: Record item index #1
Total records processed with 32KB buffer: 500`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "The constructor BufferedReader(reader, size) allows tuning memory allocations for specific disk block sizes (e.g. 16KB, 32KB, 64KB)."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "يتيح المنشئ تحديد حجم البفر بالذاكرة لمطابقة أحجام كتل القرص وتحقيق أقصى سرعة ممكنة في معالجة الملفات الضخمة."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Functional Stream Processing with br.lines() (Java 8+) (المثال 3: المعالجة الوظيفية عبر br.lines وتدفقات Stream)"
            },
            {
              type: "paragraph",
              text: "Filtering and transforming text lines declaratively with Stream<String>."
            },
            {
              type: "code",
              language: "java",
              filename: "BufferedReaderStreamDemo.java",
              code: `import java.io.BufferedReader;
import java.io.StringReader;
import java.util.List;
import java.util.stream.Collectors;

public class BufferedReaderStreamDemo {
    public static void main(String[] args) {
        String logEntries = "INFO: Server started\\n" +
                            "DEBUG: Loading configuration\\n" +
                            "ERROR: Database connection timeout\\n" +
                            "INFO: Retrying connection\\n" +
                            "ERROR: Authentication token invalid";

        try (BufferedReader br = new BufferedReader(new StringReader(logEntries))) {
            // Lazy stream pipeline
            List<String> errors = br.lines()
                    .filter(line -> line.startsWith("ERROR:"))
                    .map(String::toUpperCase)
                    .collect(Collectors.toList());

            System.out.println("Extracted Errors (" + errors.size() + "):");
            errors.forEach(err -> System.out.println(" -> " + err));
        }
    }
}`,
              output: `Extracted Errors (2):
 -> ERROR: DATABASE CONNECTION TIMEOUT
 -> ERROR: AUTHENTICATION TOKEN INVALID`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "br.lines() returns a lazily populated Stream<String> that reads lines from the file on-demand as terminal stream operations pull them."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "تُرجع br.lines() تدفق Stream كسولاً يقرأ السطور من الملف عند الحاجة فقط، مما يوفر الذاكرة ويسهل الفلترة الوظيفية."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Bridging System.in with InputStreamReader (المثال 4: القراءة السريعة من لوحة المفاتيح System.in)"
            },
            {
              type: "paragraph",
              text: "The classic competitive programming pattern for ultra-fast console input."
            },
            {
              type: "code",
              language: "java",
              filename: "FastConsoleReaderDemo.java",
              code: `import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.IOException;

public class FastConsoleReaderDemo {
    public static void main(String[] args) throws IOException {
        // Simulating System.in with a ByteArrayInputStream
        String simulatedInput = "Alice\\n42\\n99.5\\n";
        InputStream simulatedIn = new ByteArrayInputStream(simulatedInput.getBytes());

        // Standard pattern: BufferedReader wrapping InputStreamReader(System.in)
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(simulatedIn))) {
            String name = reader.readLine();
            int age = Integer.parseInt(reader.readLine());
            double score = Double.parseDouble(reader.readLine());

            System.out.println("Name:  " + name);
            System.out.println("Age:   " + age);
            System.out.println("Score: " + score);
        }
    }
}`,
              output: `Name:  Alice
Age:   42
Score: 99.5`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "BufferedReader + InputStreamReader is significantly faster than Scanner because it avoids regular expression tokenizing overhead."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "يُعتبر هذا النمط أسرع بكثير من Scanner لأنه يتجنب معالجة التعبيرات النمطية المعقدة في كل عملية إدخال."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Lookahead Parsing with mark() and reset() (المثال 5: استشراف السطور المستقبلية والتراجع بـ mark و reset)"
            },
            {
              type: "paragraph",
              text: "Peeking at the next line and rewinding if it doesn't match expected criteria."
            },
            {
              type: "code",
              language: "java",
              filename: "LookaheadReaderDemo.java",
              code: `import java.io.BufferedReader;
import java.io.StringReader;
import java.io.IOException;

public class LookaheadReaderDemo {
    public static void main(String[] args) throws IOException {
        String doc = "TITLE: Financial Report\\n" +
                     "AUTHOR: Jane Doe\\n" +
                     "DATA: 1000, 2000, 3000\\n";

        try (BufferedReader br = new BufferedReader(new StringReader(doc))) {
            System.out.println("Read: " + br.readLine()); // Reads TITLE

            // Mark current position with a read-ahead limit of 100 chars
            br.mark(100);

            String peek = br.readLine();
            System.out.println("Inspecting next line: [" + peek + "]");

            if (peek.startsWith("AUTHOR:")) {
                System.out.println("Detected author metadata. Rewinding to parse with dedicated parser.");
                br.reset(); // Rewind back!
            }

            // Read again from marked point
            String reRead = br.readLine();
            System.out.println("Re-read line after reset: [" + reRead + "]");
        }
    }
}`,
              output: `Read: TITLE: Financial Report
Inspecting next line: [AUTHOR: Jane Doe]
Detected author metadata. Rewinding to parse with dedicated parser.
Re-read line after reset: [AUTHOR: Jane Doe]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "BufferedReader supports mark() and reset() natively. The read-ahead limit specifies how many characters may be read before the mark becomes invalid."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "يدعم BufferedReader ميزتي mark و reset أصلياً، مما يتيح استكشاف السطر التالي ثم التراجع لقراءته مجدداً."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Character-by-Character Reading with br.read() (المثال 6: قراءة محرف تلو الآخر عبر المخزن المؤقت)"
            },
            {
              type: "paragraph",
              text: "Reading individual characters from the buffer without incurring disk penalties."
            },
            {
              type: "code",
              language: "java",
              filename: "CharByCharReaderDemo.java",
              code: `import java.io.BufferedReader;
import java.io.StringReader;
import java.io.IOException;

public class CharByCharReaderDemo {
    public static void main(String[] args) throws IOException {
        String input = "Java 21!";

        try (BufferedReader br = new BufferedReader(new StringReader(input))) {
            int ch;
            System.out.print("Reading individual characters: ");
            while ((ch = br.read()) != -1) {
                System.out.print((char) ch + " ");
            }
            System.out.println();
        }
    }
}`,
              output: `Reading individual characters: J a v a   2 1 ! `
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "br.read() returns individual characters from memory rather than disk, making character-level parsing efficient."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "تقرأ br.read() المحارف من الذاكرة المؤقتة (RAM) مباشرة دون الرجوع للقرص في كل محرف، مما يجعلها فائقة السرعة."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Skipping Characters with br.skip() (المثال 7: تخطي عدد من المحارف باستخدام br.skip)"
            },
            {
              type: "paragraph",
              text: "Bypassing leading comments or prefixes using skip()."
            },
            {
              type: "code",
              language: "java",
              filename: "SkipCharsReaderDemo.java",
              code: `import java.io.BufferedReader;
import java.io.StringReader;
import java.io.IOException;

public class SkipCharsReaderDemo {
    public static void main(String[] args) throws IOException {
        String raw = "### COMMENT: Secret key = 8872910";

        try (BufferedReader br = new BufferedReader(new StringReader(raw))) {
            // Skip the first 13 characters ("### COMMENT: ")
            long skipped = br.skip(13);
            System.out.println("Skipped characters: " + skipped);

            String remaining = br.readLine();
            System.out.println("Extracted secret line: " + remaining);
        }
    }
}`,
              output: `Skipped characters: 13
Extracted secret line: Secret key = 8872910`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "br.skip(n) skips up to n characters in the buffer and stream, returning the actual number of characters skipped."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "تتخطى br.skip(n) عدداً محدداً من المحارف داخل المخزن المؤقت وتُرجع العدد الحقيقي للمحارف التي تم تجاوزها."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Parsing CSV Records Line-by-Line (المثال 8: قراءة وتحليل ملفات CSV سطراً بسطر)"
            },
            {
              type: "paragraph",
              text: "Processing structured tabular data without loading the entire CSV into memory."
            },
            {
              type: "code",
              language: "java",
              filename: "CsvParserDemo.java",
              code: `import java.io.BufferedReader;
import java.io.StringReader;
import java.io.IOException;

public class CsvParserDemo {
    public static void main(String[] args) throws IOException {
        String csvData = "id,name,role,salary\\n" +
                         "101,John Smith,Engineer,85000\\n" +
                         "102,Sara Connor,Manager,95000\\n" +
                         "103,Alex Murphy,Security,78000";

        try (BufferedReader br = new BufferedReader(new StringReader(csvData))) {
            String header = br.readLine(); // Read header line
            System.out.println("CSV Header: " + header);

            String line;
            while ((line = br.readLine()) != null) {
                String[] columns = line.split(",");
                System.out.printf("Employee: ID=%s | Name=%-12s | Role=%-10s | Salary=$%s%n",
                        columns[0], columns[1], columns[2], columns[3]);
            }
        }
    }
}`,
              output: `CSV Header: id,name,role,salary
Employee: ID=101 | Name=John Smith   | Role=Engineer   | Salary=$85000
Employee: ID=102 | Name=Sara Connor  | Role=Manager    | Salary=$95000
Employee: ID=103 | Name=Alex Murphy  | Role=Security   | Salary=$78000`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "Streaming CSV rows through BufferedReader allows parsing multi-gigabyte datasets with a constant, tiny memory footprint."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "تتيح قراءة ملفات CSV سطراً بسطر معالجة ملفات عملاقة بحجم مئات الجيجابايت دون استهلاك ذاكرة الجهاز."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Modern Files.newBufferedReader (NIO.2) (المثال 9: إنشاء BufferedReader في NIO.2 بترميز UTF-8 القياسي)"
            },
            {
              type: "paragraph",
              text: "The modern, recommended factory method in java.nio.file.Files."
            },
            {
              type: "code",
              language: "java",
              filename: "NioBufferedReaderDemo.java",
              code: `import java.io.BufferedReader;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;

public class NioBufferedReaderDemo {
    public static void main(String[] args) throws IOException {
        File file = File.createTempFile("nio_br_", ".txt");
        file.deleteOnExit();

        try (FileWriter fw = new FileWriter(file, StandardCharsets.UTF_8)) {
            fw.write("NIO.2 Factory Method Demo\\nMultilingual: أهلاً بكم في جافا الحديثة");
        }

        Path path = file.toPath();

        // Modern approach: Files.newBufferedReader with UTF-8
        try (BufferedReader br = Files.newBufferedReader(path, StandardCharsets.UTF_8)) {
            String line;
            while ((line = br.readLine()) != null) {
                System.out.println("Decoded line: " + line);
            }
        }
    }
}`,
              output: `Decoded line: NIO.2 Factory Method Demo
Decoded line: Multilingual: أهلاً بكم في جافا الحديثة`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "Files.newBufferedReader(path, charset) is the modern best practice. It defaults to UTF-8 and handles path resolution cleanly."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "تُعد Files.newBufferedReader الطريقة الحديثة الفضلى لإنشاء قارئ نصوص بترميز UTF-8 الافتراضي بدقة وأمان."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Counting Lines, Words, and Characters (wc Utility) (المثال 10: حساب عدد السطور والكلمات والحروف wc)"
            },
            {
              type: "paragraph",
              text: "Building an in-memory word count utility powered by BufferedReader."
            },
            {
              type: "code",
              language: "java",
              filename: "WordCountUtilityDemo.java",
              code: `import java.io.BufferedReader;
import java.io.StringReader;
import java.io.IOException;

public class WordCountUtilityDemo {
    public static void main(String[] args) throws IOException {
        String essay = "The Java Virtual Machine executes bytecode.\\n" +
                       "BufferedReader provides efficient character caching.\\n" +
                       "Performance is critical for high-scale enterprise backends.";

        try (BufferedReader br = new BufferedReader(new StringReader(essay))) {
            int lines = 0;
            int words = 0;
            int characters = 0;

            String line;
            while ((line = br.readLine()) != null) {
                lines++;
                characters += line.length();
                String[] tokens = line.trim().split("\\\\s+");
                if (!tokens[0].isEmpty()) {
                    words += tokens.length;
                }
            }

            System.out.println("=== Document Statistics ===");
            System.out.println("Total Lines:      " + lines);
            System.out.println("Total Words:      " + words);
            System.out.println("Total Characters: " + characters);
        }
    }
}`,
              output: `=== Document Statistics ===
Total Lines:      3
Total Words:      20
Total Characters: 147`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "Iterating through BufferedReader line by line makes building text analysis tools fast and memory-efficient."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "المعالجة سطراً بسطر تمكن من إحصاء وتحليل النصوص والملفات العملاقة بسرعة استثنائية."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Reading URL / Web Responses via BufferedReader (المثال 11: قراءة الردود والبيانات الشبكية عبر BufferedReader)"
            },
            {
              type: "paragraph",
              text: "Streaming lines from an arbitrary InputStream (e.g. simulated network connection)."
            },
            {
              type: "code",
              language: "java",
              filename: "NetworkResponseReaderDemo.java",
              code: `import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

public class NetworkResponseReaderDemo {
    public static void main(String[] args) throws IOException {
        // Simulating HTTP Response payload
        String httpPayload = "HTTP/1.1 200 OK\\r\\n" +
                             "Content-Type: application/json\\r\\n" +
                             "\\r\\n" +
                             "{\\"status\\":\\"SUCCESS\\",\\"code\\":200}";

        InputStream netStream = new ByteArrayInputStream(httpPayload.getBytes(StandardCharsets.UTF_8));

        try (BufferedReader br = new BufferedReader(new InputStreamReader(netStream, StandardCharsets.UTF_8))) {
            String statusLine = br.readLine();
            System.out.println("HTTP Status: " + statusLine);

            // Read headers until empty line
            String header;
            while ((header = br.readLine()) != null && !header.isEmpty()) {
                System.out.println("Header: " + header);
            }

            // Read JSON body
            String body = br.readLine();
            System.out.println("Response Body: " + body);
        }
    }
}`,
              output: `HTTP Status: HTTP/1.1 200 OK
Header: Content-Type: application/json
Response Body: {"status":"SUCCESS","code":200}`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "BufferedReader handles mixed CRLF (\\r\\n) and LF (\\n) line endings transparently, making it ideal for protocol parsers like HTTP and SMTP."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "يتعامل BufferedReader مع مختلف نهايات السطور (\\r\\n و \\n) بسلاسة وتلقائية، مما يجعله مثالياً لبناء محللات بروتوكولات الشبكة."
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
                "Mistake 1: Comparing line == \"\" instead of line == null to detect End of File (EOF). An empty string \"\" represents a blank line, not EOF!",
                "خطأ 1: مقارنة السطر بنص فارغ \"\" بدلاً من null لمعرفة نهاية الملف؛ فالنص الفارغ يعني سطراً خالياً وليس نهاية الملف.",
                "Mistake 2: Forgetting that readLine() strips the trailing newline character (\\n). If writing lines back out, you must add newlines manually.",
                "خطأ 2: نسيان أن readLine() تحذف علامة السطر الجديد (\\n)؛ لذا يجب إضافتها يدوياً عند إعادة الكتابة.",
                "Mistake 3: Creating a FileReader without specifying StandardCharsets.UTF_8 on Java versions older than 18.",
                "خطأ 3: إنشاء FileReader دون تحديد UTF-8 على إصدارات جافا الأقدم من 18 مما يسبب مشاكل في قراءة المحارف الخاصة.",
                "Mistake 4: Calling br.lines() on an unclosed reader without a try-with-resources statement, leading to leaked file handles."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Comment-Stripping Code Cleaner (التحدي العملي: منظف الشفرات البرمجية من التعليقات)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Create a static method 'stripSingleLineComments(BufferedReader reader)' that reads a source file line-by-line, ignores blank lines and lines beginning with '//', trims leading/trailing whitespace, and returns the cleaned lines as a List<String>. Test in main() with sample source code and print the cleaned result."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: صمم دالة stripSingleLineComments(BufferedReader reader) تقرأ كوداً سطراً بسطر، وتتجاهل السطور الفارغة والسطور التي تبدأ بتعليق أحادي '//'، وتقوم بتنظيف الفراغات وإرجاع السطور الصافية في List<String>. اختبر الدالة في main واطبع النتيجة."
            },
            {
              type: "code",
              language: "java",
              filename: "CodeCleanerChallenge.java",
              code: `import java.io.BufferedReader;
import java.io.StringReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class CodeCleanerChallenge {
    public static List<String> stripSingleLineComments(BufferedReader reader) throws IOException {
        List<String> cleanLines = new ArrayList<>();
        String line;

        while ((line = reader.readLine()) != null) {
            String trimmed = line.trim();
            // Skip empty lines and single-line comment lines
            if (trimmed.isEmpty() || trimmed.startsWith("//")) {
                continue;
            }
            cleanLines.add(trimmed);
        }
        return cleanLines;
    }

    public static void main(String[] args) throws IOException {
        String dirtyCode = "// Application Config\\n" +
                           "public class App {\\n" +
                           "\\n" +
                           "    // Main entrypoint\\n" +
                           "    public static void main(String[] args) {\\n" +
                           "        System.out.println(\\"Clean!\\");\\n" +
                           "    }\\n" +
                           "}";

        try (BufferedReader br = new BufferedReader(new StringReader(dirtyCode))) {
            List<String> cleaned = stripSingleLineComments(br);
            System.out.println("Cleaned Code Lines (" + cleaned.size() + "):");
            cleaned.forEach(l -> System.out.println("  " + l));
        }
    }
}`,
              output: `Cleaned Code Lines (4):
  public class App {
  public static void main(String[] args) {
  System.out.println("Clean!");
  }`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "The method checks each line with trimmed.isEmpty() and trimmed.startsWith(\"//\"), filtering out empty lines and single-line comments while preserving code."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "تفحص الدالة كل سطر وتتجاوز السطور الفارغة أو التي تبدأ بـ '//' مع جمع سطور الشفرة الصافية وإرجاعها في قائمة."
            }
          ],
          quiz: [
          {
                    "id": "q1",
                    "question": "What does BufferedReader.readLine() return when it reaches the End of Stream (EOF)? (ما الذي تُرجعه دالة BufferedReader.readLine عند الوصول إلى نهاية الملف أو المجرى؟)",
                    "options": [
                              "An empty string (\"\")",
                              "null",
                              "Throws an EOFException",
                              "-1"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! readLine() returns a String containing the contents of the line, or null if the end of the stream has been reached. (تُرجع دالة readLine محتوى السطر كنص، وتُرجع null حصراً عند الوصول لنهاية المجرى)."
          },
          {
                    "id": "q2",
                    "question": "Does BufferedReader.readLine() include line-termination characters ('\\r', '\\n', or '\\r\\n') in the returned String? (هل يتضمن النص المُرجع من BufferedReader.readLine محارف نهاية السطر مثل r\\ أو n\\؟)",
                    "options": [
                              "Yes, it always retains the exact trailing newline character from the file.",
                              "No, it strips any line-termination characters (\\r, \\n, or \\r\\n) and returns only the line content.",
                              "It includes newline characters only on Windows.",
                              "It replaces newlines with a whitespace character."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! By specification, readLine() strips line-termination characters ('\\n', '\\r', or '\\r\\n') and returns only the text of the line without any trailing newline. (تقوم الدالة بحذف محارف نهاية السطر تماماً وإرجاع نص السطر الصافي فقط)."
          },
          {
                    "id": "q3",
                    "question": "What is the subtle defect in the following file reading loop?\ntry (BufferedReader br = new BufferedReader(new FileReader(\"data.txt\"))) {\n    while (br.readLine() != null) {\n        String line = br.readLine();\n        System.out.println(line);\n    }\n}\n(ما هو العيب الخفي في حلقة قراءة الملف التالية؟)",
                    "options": [
                              "It throws a NullPointerException on the very first line.",
                              "readLine() is called twice per iteration (once in the while condition and once in the loop body), skipping every alternate (odd-numbered) line and risking printing null on the last iteration.",
                              "BufferedReader cannot be wrapped around a FileReader.",
                              "The loop never terminates because readLine() never returns null."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Calling br.readLine() in both the while-condition and the body reads TWO lines per iteration. The condition consumes line 1, and the body reads and prints line 2, skipping half the lines and printing null if the file has an odd number of lines. The canonical idiom is: String line; while ((line = br.readLine()) != null) { ... }. (استدعاء readLine مرتين يؤدي لقراءة سطرين في كل دورة، مما يتخطى سطراً تلو الآخر وقد يطبع null في السطر الأخير)."
          },
          {
                    "id": "q4",
                    "question": "What is the default internal buffer size of BufferedReader in standard Java? (ما هو الحجم الافتراضي للمخزن المؤقت في فئة BufferedReader في جافا القياسية؟)",
                    "options": [
                              "256 characters",
                              "1024 characters",
                              "8192 characters (8K characters, typically 16KB in memory)",
                              "65536 characters"
                    ],
                    "correctIndex": 2,
                    "explanation": "Correct! The default buffer size is 8,192 characters (8K chars, which equates to 16KB of heap space since each Java char is 2 bytes). This size can be customized via the constructor: new BufferedReader(reader, sz). (الحجم الافتراضي للمخزن المؤقت هو 8192 محرفاً، مما يقلل بشكل كبير استدعاءات القراءة من القرص)."
          },
          {
                    "id": "q5",
                    "question": "When using Java 8's br.lines() Stream, what critical rule must be followed regarding resource management? (عند استخدام دفق الأسطر br.lines() في جافا 8+، ما القاعدة الأساسية لإدارة الموارد؟)",
                    "options": [
                              "br.lines() must always be collected into a LinkedList.",
                              "The BufferedReader must be opened inside a try-with-resources statement because the underlying Reader must be closed when the Stream terminates to prevent resource leaks.",
                              "br.lines() can only be called on files smaller than 1MB.",
                              "br.lines() automatically deletes the file after streaming."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! The stream returned by br.lines() reads lazily from the underlying reader. If the reader is not closed via try-with-resources, the open file handle will leak until garbage collection. (تدفق الأسطر يقرأ البيانات بكسل lazily، ويجب استخدامه داخل try-with-resources لضمان إغلاق مقبض الملف عند انتهاء المعالجة)."
          },
          {
                    "id": "q6",
                    "question": "Why is using BufferedReader with InputStreamReader preferred over Scanner when reading large amounts of competitive programming input from System.in? (لماذا يُفضل BufferedReader مع InputStreamReader على Scanner في المسابقات البرمجية؟)",
                    "options": [
                              "BufferedReader is multi-threaded while Scanner only works on a single CPU core.",
                              "BufferedReader simply buffers raw character input (large 8KB chunks) without overhead, whereas Scanner uses heavy regular expression parsing on every token, making Scanner significantly slower.",
                              "Scanner throws an exception on numbers greater than 1000.",
                              "BufferedReader automatically sorts the input numbers."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Scanner uses regex matching internally for every nextInt() / next() call and uses a small buffer (1024 chars). BufferedReader simply buffers raw characters in a large buffer, making it 5x to 10x faster for massive input sizes. (فئة BufferedReader أسرع بكثير لأنها تقرأ كتل المحارف مباشرة دون استهلاك المعالج في تحليل التعابير النمطية regex كما يفعل Scanner)."
          },
          {
                    "id": "q7",
                    "question": "What is the purpose of br.mark(int readAheadLimit) and br.reset() in BufferedReader? (ما الفائدة من دالتي mark و reset في BufferedReader؟)",
                    "options": [
                              "To bookmark a position in the stream, allowing the reader to peek ahead at future characters/lines and then rewind back to the marked position using reset().",
                              "To highlight text in the terminal with colored ANSI codes.",
                              "To encrypt the stream from that point forward.",
                              "To clear the buffer and reset it to empty."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! mark() sets a bookmark in the stream. You can read ahead up to readAheadLimit characters, and calling reset() will reposition the stream back to the marked position, which is invaluable for lookahead parsing. (تتيح mark وضع علامة استشراف تمكنك من قراءة سطور تالية ثم العودة لنفس النقطة بـ reset دون خسارة مكان القراءة)."
          },
          {
                    "id": "q8",
                    "question": "What is the return value and behavior of BufferedReader.read() when reading a single character? (ما هو سلوك وقيمة الإرجاع لدالة BufferedReader.read() لقراءة محرف فردي؟)",
                    "options": [
                              "Returns a char primitive, throwing EOFException at end of stream.",
                              "Returns an int representing the character code (0 to 65535), or -1 if the end of the stream has been reached.",
                              "Returns the total number of characters remaining in the file.",
                              "Returns a 1-character String."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Like InputStream.read(), Reader.read() returns an int from 0 to 65535 (representing the 16-bit char code), or -1 to signal that the end of the stream has been reached. (تُرجع الدالة int يمثل رمز المحرف من 0 إلى 65535 أو -1 عند بلوغ نهاية الملف)."
          },
          {
                    "id": "q9",
                    "question": "Which modern NIO.2 factory method creates a BufferedReader directly with UTF-8 encoding in a clean, single line? (أي دالة مصنعية حديثة في NIO.2 تنشئ BufferedReader بترميز UTF-8 بسطر واحد؟)",
                    "options": [
                              "BufferedReader.fromPath(path)",
                              "Files.newBufferedReader(path, StandardCharsets.UTF_8)",
                              "Path.toBufferedReader(path)",
                              "FileSystem.openReader(path)"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Files.newBufferedReader(Path, Charset) (or Files.newBufferedReader(Path) which defaults to UTF-8 in modern Java) provides a clean, standard way to instantiate a BufferedReader. (الدالة القياسية في حزمة NIO.2 هي Files.newBufferedReader وتستخدم ترميز UTF-8 افتراضياً)."
          },
          {
                    "id": "q10",
                    "question": "What happens if Files.newBufferedReader(path) encounters a byte sequence in the file that violates valid UTF-8 encoding? (ماذا يحدث إذا واجهت دالة newBufferedReader بايتات لا تتوافق مع ترميز UTF-8؟)",
                    "options": [
                              "It silently replaces the invalid bytes with spaces.",
                              "It throws a java.nio.charset.MalformedInputException.",
                              "It switches automatically to ISO-8859-1.",
                              "It deletes the corrupted line and continues."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! The CharsetDecoder configured by Files.newBufferedReader defaults to throwing a MalformedInputException (or CharacterCodingException) when encountering malformed byte sequences. (تطلق الدالة استثناء MalformedInputException فوراً عند وجود بايتات تالفة أو غير متوافقة مع ترميز UTF-8)."
          },
          {
                    "id": "q11",
                    "question": "When parsing a CSV file with line.split(\",\"), what happens to trailing empty fields (e.g., \"Alice,Engineering,\") if you do not supply a negative limit? (ماذا يحدث للحقول الفارغة في نهاية سطر CSV إذا لم تستخدم حد التجزئة السالب؟)",
                    "options": [
                              "Trailing empty strings are preserved in the array.",
                              "Trailing empty strings are discarded by default (resulting in an array of length 2 instead of 3). Using line.split(\",\", -1) preserves trailing empty fields.",
                              "It throws an IndexOutOfBoundsException.",
                              "The trailing empty field is replaced by the string \"null\"."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Default String.split(regex) discards trailing empty strings. To retain trailing empty columns in CSV parsing, specify a negative limit: line.split(\",\", -1). (تقوم دالة split الافتراضية بحذف الحقول الفارغة في نهاية السطر، وللاحتفاظ بها يجب تمرير -1 كمعامل ثانٍ)."
          },
          {
                    "id": "q12",
                    "question": "What does br.skip(long n) do in BufferedReader? (ما الذي تفعله دالة br.skip(n) في BufferedReader؟)",
                    "options": [
                              "Skips n lines of text.",
                              "Skips up to n characters of text, returning the actual number of characters skipped.",
                              "Skips n bytes on the physical disk partition.",
                              "Skips n words separated by whitespace."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! br.skip(n) skips up to n characters in the stream and returns the number of characters actually skipped. It works on character boundaries, not bytes or lines. (تتخطى الدالة عدداً يصل إلى n من المحارف وترجع العدد الفعلي للمحارف التي تم تجاوزها)."
          },
          {
                    "id": "q13",
                    "question": "Consider the following code snippet:\nString text = \"First\\r\\nSecond\\rThird\";\ntry (BufferedReader br = new BufferedReader(new StringReader(text))) {\n    int count = 0;\n    while (br.readLine() != null) count++;\n    System.out.println(count);\n}\nWhat is printed? (ما الذي يطبعه الكود التالي؟)",
                    "options": [
                              "1",
                              "2",
                              "3",
                              "Throws an IOException"
                    ],
                    "correctIndex": 2,
                    "explanation": "Correct! BufferedReader recognizes '\\r\\n' (Windows), '\\n' (Unix), and '\\r' (classic Mac) as valid line terminators. Thus, \"First\", \"Second\", and \"Third\" are recognized as 3 separate lines. count is 3. (يتعرف BufferedReader على أنماط نهايات الأسطر الثلاثة: r\\n\\ و n\\ و r\\ كفواصل أسطر معتمدة، فيكون عدد الأسطر 3)."
          },
          {
                    "id": "q14",
                    "question": "How can you count the total number of lines in a text file using Java Streams in a single functional statement? (كيف تحسب إجمالي عدد الأسطر في ملف نصي باستخدام تدفقات جافا بسطر واحد؟)",
                    "options": [
                              "br.lines().count()",
                              "br.getLineCount()",
                              "br.lines().size()",
                              "br.lines().sum()"
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! br.lines() returns a Stream<String>, and the terminal operation .count() counts all elements in the stream, giving the total number of lines. (دالة lines تُرجع Stream من الأسطر، واستدعاء count() عليها يحسب عدد الأسطر بدقة وكفاءة)."
          },
          {
                    "id": "q15",
                    "question": "Why is it safe and recommended to read web responses (like HTTP GET requests via URLConnection) through a BufferedReader? (لماذا يُنصح بقراءة ردود الويب من URLConnection عبر BufferedReader؟)",
                    "options": [
                              "Because it buffers incoming TCP packets, converting incoming UTF-8 network bytes into characters smoothly while allowing structured line-by-line JSON/HTML parsing.",
                              "Because BufferedReader bypasses HTTP firewall security.",
                              "Because it converts HTTP to HTTPS automatically.",
                              "Because BufferedReader does not throw network timeouts."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! Network streams arrive in fragmented TCP packets. Wrapping the connection's InputStream in an InputStreamReader and BufferedReader buffers network chunks and provides convenient line-based parsing for headers and payloads. (الشبكات ترسل البيانات في حزم مجزأة، واستخدام BufferedReader يجمع البيانات في بفر ويسمح بقراءتها سطراً بسطر بيسر)."
          }
]
        }
      ]
    }
  ];
})();
