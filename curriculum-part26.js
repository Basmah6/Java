/**
 * Java Curriculum Module - Part 26
 * Topics:
 * 51. Java InputStream / OutputStream
 * 52. Java FileInputStream
 * 
 * 100% Offline, Pure JavaScript. Complete educational content with full bilingual (English & Arabic) explanations.
 */

(function () {
  'use strict';

  window.JAVA_TOPICS_PART26 = [
    /* ==========================================================================
       TOPIC 51: Java InputStream / OutputStream
       ========================================================================== */
    {
      id: "java-inputstream-outputstream",
      title: "51. Java InputStream / OutputStream",
      description: "Master the root abstractions of Java Byte I/O: InputStream and OutputStream base classes, read(), write(), flush(), close(), available(), skip(), mark()/reset(), transferTo(), and custom stream implementations.",
      lessons: [
        {
          id: "java-inputstream-outputstream-mastery",
          title: "Complete Guide to InputStream & OutputStream",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "Java Byte Stream Foundations: InputStream & OutputStream (أساسيات مجاري البايت في جافا)"
            },
            {
              type: "paragraph",
              text: "In the Java I/O system, java.io.InputStream and java.io.OutputStream are the abstract superclasses representing all directed byte-oriented data streams. An InputStream represents an ordered sequence of bytes flowing into your program from a source (file, network socket, memory buffer, pipe, or hardware device). An OutputStream represents a destination sink where bytes can be written sequentially. Both classes implement Closeable and AutoCloseable, making them fully compatible with try-with-resources statements."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "في بيئة جافا، يُعتبر كلاس InputStream وكلاس OutputStream هما الفئتان التجريديتان الأساسيتان لجميع مجاري البيانات القائمة على البايتات (Byte Streams). يمثل InputStream تدفقاً تسلسلياً للبايتات القادمة من مصدر خارجي (مثل ملف، أو مقبس شبكة Socket، أو مصفوفة في الذاكرة) إلى داخل البرنامج. بينما يمثل OutputStream الوجهة (Sink) التي يتم إرسال البايتات إليها بالتتابع. كلاهما يطبق واجهة AutoCloseable، مما يوجب إغلاقهما تلقائياً عبر try-with-resources لضمان تحرير موارد النظام ومقابض الملفات."
            },
            {
              type: "paragraph",
              text: "Key Architectural Principles: 1) The -1 Sentinel: The read() method returns an integer from 0 to 255 for a valid byte, or -1 when the End of Stream (EOS) is reached; 2) Chunked Transfers: Always prefer reading and writing byte arrays (byte[] buffer) rather than individual single bytes to avoid thousands of slow native system calls; 3) Flushing: OutputStreams often cache bytes; invoking flush() forces pending buffered data to the underlying destination."
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
              text: "Example 1: Single Byte Reading & The -1 Sentinel (المثال 1: قراءة بايت تلو الآخر وقيمة -1 لنهاية المجرى)"
            },
            {
              type: "paragraph",
              text: "Demonstrating how InputStream.read() returns an int (0–255) and indicates End of File with -1."
            },
            {
              type: "code",
              language: "java",
              filename: "SingleByteReadDemo.java",
              code: `import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

public class SingleByteReadDemo {
    public static void main(String[] args) {
        byte[] sourceData = { 74, 97, 118, 97 }; // ASCII for "Java"

        try (InputStream in = new ByteArrayInputStream(sourceData)) {
            int byteVal;
            System.out.println("Reading byte by byte until -1:");
            while ((byteVal = in.read()) != -1) {
                System.out.println("  Byte value: " + byteVal + " -> Character: " + (char) byteVal);
            }
            System.out.println("End of stream reached (-1 returned).");
        } catch (IOException e) {
            System.err.println("I/O Error: " + e.getMessage());
        }
    }
}`,
              output: `Reading byte by byte until -1:
  Byte value: 74 -> Character: J
  Byte value: 97 -> Character: a
  Byte value: 118 -> Character: v
  Byte value: 97 -> Character: a
End of stream reached (-1 returned).`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "The read() method returns an integer, not a byte, so that the value -1 can uniquely signify the end-of-stream condition without colliding with the valid byte value 0xFF (255)."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "تُرجع دالة read() القيمة كـ int وليس byte لكي تتمكن القيمة -1 من الدلالة على نهاية المجرى دون أن تتعارض مع البايت 255 (0xFF)."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Block Reading with Byte Array Buffers (المثال 2: القراءة السريعة عبر مصفوفات البايتات)"
            },
            {
              type: "paragraph",
              text: "Reading chunks of data into a byte[] buffer for high performance."
            },
            {
              type: "code",
              language: "java",
              filename: "BlockReadDemo.java",
              code: `import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

public class BlockReadDemo {
    public static void main(String[] args) throws IOException {
        byte[] payload = "High-Performance Stream Processing with Java byte arrays.".getBytes();

        try (InputStream in = new ByteArrayInputStream(payload)) {
            byte[] buffer = new byte[16]; // 16-byte chunk size
            int bytesRead;
            int cycle = 1;

            while ((bytesRead = in.read(buffer)) != -1) {
                String chunk = new String(buffer, 0, bytesRead);
                System.out.println("Cycle " + cycle++ + " (" + bytesRead + " bytes): [" + chunk + "]");
            }
        }
    }
}`,
              output: `Cycle 1 (16 bytes): [High-Performance ]
Cycle 2 (16 bytes): [Stream Processin]
Cycle 3 (16 bytes): [g with Java byte]
Cycle 4 (9 bytes): [ arrays.]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "in.read(buffer) fills the buffer and returns the actual count of bytes read. Always use String(buffer, 0, bytesRead) to avoid trailing garbage from previous reads."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "تقوم in.read(buffer) بملء المصفوفة وإرجاع عدد البايتات الفعلية المقروءة. يجب دائماً استخدام الطول الفعلي (bytesRead) لتفادي بقايا البيانات السابقة."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: OutputStream.write() Single Byte vs Array (المثال 3: كتابة البايت الفردي مقابل مصفوفة بايتات)"
            },
            {
              type: "paragraph",
              text: "Writing raw bytes and byte arrays to an OutputStream destination."
            },
            {
              type: "code",
              language: "java",
              filename: "OutputStreamWriteDemo.java",
              code: `import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;

public class OutputStreamWriteDemo {
    public static void main(String[] args) throws IOException {
        try (ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            // 1. Write single byte
            out.write(65); // ASCII 'A'

            // 2. Write entire byte array
            byte[] msg = " - Hello Streams! - ".getBytes(StandardCharsets.UTF_8);
            out.write(msg);

            // 3. Write sub-array slice (offset 2, length 5)
            byte[] slice = "0123456789".getBytes();
            out.write(slice, 2, 5); // writes "23456"

            System.out.println("Resulting Output: " + out.toString(StandardCharsets.UTF_8.name()));
            System.out.println("Total bytes in buffer: " + out.size());
        }
    }
}`,
              output: `Resulting Output: A - Hello Streams! - 23456
Total bytes in buffer: 26`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "OutputStream provides write(int), write(byte[]), and write(byte[], off, len) for exact control over binary data emission."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "يوفر OutputStream ثلاث دوال للكتابة: كتابة بايت منفرد، وكتابة مصفوفة كاملة، وكتابة جزء محدد من المصفوفة (الإزاحة والطول)."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Checking Available Bytes with in.available() (المثال 4: فحص البايتات المتاحة للقراءة الفورية)"
            },
            {
              type: "paragraph",
              text: "Estimating how many bytes can be read without blocking the current thread."
            },
            {
              type: "code",
              language: "java",
              filename: "AvailableBytesDemo.java",
              code: `import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

public class AvailableBytesDemo {
    public static void main(String[] args) throws IOException {
        byte[] payload = new byte[] { 10, 20, 30, 40, 50, 60 };

        try (InputStream in = new ByteArrayInputStream(payload)) {
            System.out.println("Initial bytes available: " + in.available());

            in.read(); // Read 1 byte
            in.read(); // Read 1 byte
            System.out.println("Bytes available after reading 2 bytes: " + in.available());

            byte[] rest = new byte[in.available()];
            int count = in.read(rest);
            System.out.println("Read remaining " + count + " bytes in one batch.");
            System.out.println("Bytes available now: " + in.available());
        }
    }
}`,
              output: `Initial bytes available: 6
Bytes available after reading 2 bytes: 4
Read remaining 4 bytes in one batch.
Bytes available now: 0`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "available() gives an estimate of readable bytes without blocking. Note: in network streams, available() might return 0 even if more bytes arrive later."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "تُعطي دالة available() تقديراً للبايتات المتاحة فوراً دون تجميد المسار؛ وفي مجاري الشبكة قد تُرجع 0 حتى لو كانت هناك حزم في طريقها للوصول."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Skipping Bytes with in.skip() (المثال 5: تخطي بايتات معينة أثناء القراءة)"
            },
            {
              type: "paragraph",
              text: "Fast-forwarding past headers or unwanted metadata using InputStream.skip()."
            },
            {
              type: "code",
              language: "java",
              filename: "SkipBytesDemo.java",
              code: `import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

public class SkipBytesDemo {
    public static void main(String[] args) throws IOException {
        // Imaginary packet: 4 bytes header [0xFF, 0xFF, 0x00, 0x01] followed by ASCII payload
        byte[] packet = { -1, -1, 0, 1, 'P', 'a', 'y', 'l', 'o', 'a', 'd' };

        try (InputStream in = new ByteArrayInputStream(packet)) {
            // Skip header (4 bytes)
            long skipped = in.skip(4);
            System.out.println("Skipped header bytes count: " + skipped);

            // Read the real payload
            byte[] body = new byte[in.available()];
            in.read(body);
            System.out.println("Extracted packet body: " + new String(body));
        }
    }
}`,
              output: `Skipped header bytes count: 4
Extracted packet body: Payload`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "skip(n) moves the read position forward by up to n bytes, returning the actual count of bytes skipped."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "تتخطى دالة skip(n) عدداً محدداً من البايتات للأمام، وتُرجع العدد الفعلي للبايتات التي تم تخطيها."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Mark and Reset in Supported Streams (المثال 6: وضع علامة والرجوع إليها عبر mark و reset)"
            },
            {
              type: "paragraph",
              text: "Bookmarking a position in a stream and rewinding back using markSupported(), mark(), and reset()."
            },
            {
              type: "code",
              language: "java",
              filename: "MarkResetDemo.java",
              code: `import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

public class MarkResetDemo {
    public static void main(String[] args) throws IOException {
        byte[] data = "ABCDEFGH".getBytes();

        try (InputStream in = new ByteArrayInputStream(data)) {
            if (!in.markSupported()) {
                System.out.println("Mark/Reset is not supported by this stream.");
                return;
            }

            System.out.print("First two chars: " + (char)in.read() + (char)in.read()); // Reads A, B
            System.out.println();

            // Set mark with a read-ahead limit of 10 bytes
            in.mark(10);
            System.out.println("Mark placed after 'B'.");

            System.out.print("Next three chars: " + (char)in.read() + (char)in.read() + (char)in.read()); // Reads C, D, E
            System.out.println();

            // Reset back to marked position
            in.reset();
            System.out.println("Stream reset back to mark.");

            System.out.print("Reading again after reset: " + (char)in.read() + (char)in.read()); // Reads C, D again!
            System.out.println();
        }
    }
}`,
              output: `First two chars: AB
Mark placed after 'B'.
Next three chars: CDE
Stream reset back to mark.
Reading again after reset: CD`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "Always verify in.markSupported() before using mark() and reset(). ByteArrayInputStream and BufferedInputStream support mark/reset; raw FileInputStream does not."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "يجب التحقق من markSupported() دائماً؛ حيث تدعم فئات مثل ByteArrayInputStream و BufferedInputStream خاصية التراجع، بينما لا تدعمها مجاري الملفات المباشرة."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Fast Stream Piping with Java 9+ transferTo() (المثال 7: نقل البيانات الفوري بين المجاري بـ transferTo)"
            },
            {
              type: "paragraph",
              text: "Piping an entire InputStream directly into an OutputStream in a single optimized call."
            },
            {
              type: "code",
              language: "java",
              filename: "TransferToDemo.java",
              code: `import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

public class TransferToDemo {
    public static void main(String[] args) throws IOException {
        String original = "Stream piping via transferTo() in modern Java!";
        byte[] inputBytes = original.getBytes(StandardCharsets.UTF_8);

        try (InputStream in = new ByteArrayInputStream(inputBytes);
             ByteArrayOutputStream out = new ByteArrayOutputStream()) {

            // Single method transfer: reads all bytes from 'in' and writes them to 'out'
            long transferredBytes = in.transferTo(out);

            System.out.println("Total bytes transferred: " + transferredBytes);
            System.out.println("Output stream content: " + out.toString(StandardCharsets.UTF_8.name()));
        }
    }
}`,
              output: `Total bytes transferred: 46
Output stream content: Stream piping via transferTo() in modern Java!`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "in.transferTo(out) was introduced in Java 9. It replaces manual while-read-write loops with an optimized internal 8KB buffer transfer."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "تمت إضافة دالة transferTo() في جافا 9 لتلغي الحاجة لكتابة حلقة while تقليدية، وتقوم بنقل البيانات داخلياً عبر بفر 8KB عالي الكفاءة."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Flushing Buffered Streams with flush() (المثال 8: تفريغ المخزن المؤقت باستخدام دالة flush)"
            },
            {
              type: "paragraph",
              text: "Understanding why and when OutputStream.flush() is mandatory for reliable data transmission."
            },
            {
              type: "code",
              language: "java",
              filename: "FlushDemo.java",
              code: `import java.io.BufferedOutputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

public class FlushDemo {
    public static void main(String[] args) throws IOException {
        ByteArrayOutputStream destination = new ByteArrayOutputStream();
        BufferedOutputStream buffered = new BufferedOutputStream(destination, 64); // Small 64-byte buffer

        // Write 15 bytes (smaller than the 64-byte buffer threshold)
        buffered.write("Pending data...".getBytes());

        System.out.println("Bytes in destination BEFORE flush: " + destination.size());

        // Force the buffered stream to push cached bytes to the underlying destination
        buffered.flush();

        System.out.println("Bytes in destination AFTER flush:  " + destination.size());
        System.out.println("Destination content: " + destination.toString());

        buffered.close();
    }
}`,
              output: `Bytes in destination BEFORE flush: 0
Bytes in destination AFTER flush:  15
Destination content: Pending data...`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "Without flush(), data written to buffered streams remains stuck in RAM until the buffer fills up or the stream is closed."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "بدون استدعاء flush()، تظل البيانات عالقة في الذاكرة المؤقتة ولا تنتقل للوجهة إلا عند امتلاء البفر أو إغلاق المجرى."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Safe Reading with readNBytes() (Java 9 & 11+) (المثال 9: القراءة الدقيقة لعدد محدد من البايتات بـ readNBytes)"
            },
            {
              type: "paragraph",
              text: "Guaranteeing exact byte counts without partial read vulnerabilities using readNBytes."
            },
            {
              type: "code",
              language: "java",
              filename: "ReadNBytesDemo.java",
              code: `import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

public class ReadNBytesDemo {
    public static void main(String[] args) throws IOException {
        byte[] raw = "Java 11 readNBytes ensures exact byte retrieval.".getBytes();

        try (InputStream in = new ByteArrayInputStream(raw)) {
            // 1. readNBytes(int len) returns a newly allocated byte[] containing up to len bytes
            byte[] firstSeven = in.readNBytes(7);
            System.out.println("Exact 7 bytes read: [" + new String(firstSeven) + "]");

            // 2. readNBytes(byte[] b, int off, int len) blocks until exactly len bytes are read or EOF
            byte[] target = new byte[10];
            int actualCount = in.readNBytes(target, 0, 10);
            System.out.println("Target read count: " + actualCount + " -> [" + new String(target, 0, actualCount) + "]");
        }
    }
}`,
              output: `Exact 7 bytes read: [Java 11 ]
Target read count: 10 -> [readNBytes ]`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "Standard in.read(buf) may read fewer bytes than requested due to network packet fragmentation. in.readNBytes() blocks until the exact count is fulfilled or EOF."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "قد تقرأ in.read(buf) التقليدية بايتات أقل من المطلوب بسبب تجزئة الشبكة؛ بينما تضمن readNBytes قراءة العدد المطلوب بالكامل أو وصول نهاية الملف."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Custom Encrypting FilterOutputStream (المثال 10: بناء مجرى تشفير مخصص مشتق من FilterOutputStream)"
            },
            {
              type: "paragraph",
              text: "Subclassing FilterOutputStream to create a transparent XOR encryption filter."
            },
            {
              type: "code",
              language: "java",
              filename: "XorOutputStreamDemo.java",
              code: `import java.io.ByteArrayOutputStream;
import java.io.FilterOutputStream;
import java.io.IOException;
import java.io.OutputStream;

public class XorOutputStreamDemo {
    // Custom stream that XORs every outgoing byte with a secret key
    static class XorOutputStream extends FilterOutputStream {
        private final byte key;

        public XorOutputStream(OutputStream out, byte key) {
            super(out);
            this.key = key;
        }

        @Override
        public void write(int b) throws IOException {
            super.write(b ^ key); // XOR encrypt before passing down
        }

        @Override
        public void write(byte[] b, int off, int len) throws IOException {
            for (int i = 0; i < len; i++) {
                write(b[off + i]);
            }
        }
    }

    public static void main(String[] args) throws IOException {
        byte secretKey = 0x5A;
        ByteArrayOutputStream encryptedSink = new ByteArrayOutputStream();

        try (XorOutputStream xorOut = new XorOutputStream(encryptedSink, secretKey)) {
            xorOut.write("ConfidentialData".getBytes());
        }

        byte[] cipherBytes = encryptedSink.toByteArray();
        System.out.println("Cipher bytes generated (length): " + cipherBytes.length);

        // XOR again with the same key to decrypt
        StringBuilder decrypted = new StringBuilder();
        for (byte b : cipherBytes) {
            decrypted.append((char) (b ^ secretKey));
        }
        System.out.println("Decrypted string: " + decrypted);
    }
}`,
              output: `Cipher bytes generated (length): 16
Decrypted string: ConfidentialData`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "FilterOutputStream lets you intercept and transform bytes on-the-fly (e.g., encryption, compression, checksumming) while adhering to the standard OutputStream API."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "يتيح FilterOutputStream اعتراض وتعديل البايتات أثناء خروجها (كالتشفير أو الضغط) مع الحفاظ على التوافق التام مع واجهة OutputStream العامة."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Java 9+ InputStream.nullInputStream() & OutputStream.nullOutputStream() (المثال 11: المجاري الخالية القياسية في جافا الحديثة)"
            },
            {
              type: "paragraph",
              text: "Using standard discard sinks (like /dev/null) and empty sources without third-party libraries."
            },
            {
              type: "code",
              language: "java",
              filename: "NullStreamsDemo.java",
              code: `import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

public class NullStreamsDemo {
    public static void main(String[] args) throws IOException {
        // 1. nullOutputStream() discards all written bytes (equivalent to /dev/null)
        try (OutputStream devNull = OutputStream.nullOutputStream()) {
            devNull.write("This binary data will be completely discarded.".getBytes());
            devNull.flush();
            System.out.println("Successfully wrote to standard nullOutputStream (data discarded).");
        }

        // 2. nullInputStream() contains no bytes; read() immediately returns -1
        try (InputStream emptySource = InputStream.nullInputStream()) {
            int firstByte = emptySource.read();
            System.out.println("nullInputStream read() result: " + firstByte + " (Immediate EOF)");
        }
    }
}`,
              output: `Successfully wrote to standard nullOutputStream (data discarded).
nullInputStream read() result: -1 (Immediate EOF)`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "Java 9 added nullInputStream() and nullOutputStream(), ideal for benchmarking, stubbing, and discarding output without creating dummy files or custom mock classes."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "توفر جافا 9 مجاري خالية قياسية تمثل مكافئاً لـ /dev/null لاختبار الأداء وتجاهل المخرجات غير المرغوبة بسهولة واحترافية."
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
                "Mistake 1: Casting read() directly to byte before checking for -1. (byte) -1 is 0xFF (255), causing an infinite loop when checking for EOF!",
                "خطأ 1: تحويل قيمة read() إلى byte مباشرة قبل فحص -1؛ إذ يتحول البايت -1 إلى 255 مما يؤدي إلى حلقة لا نهائية.",
                "Mistake 2: Assuming in.read(buffer) always fills the entire buffer. Network packets and pipes return partial data; always verify the return value (bytesRead).",
                "خطأ 2: افتراض أن read(buffer) تملأ المصفوفة كاملة دوماً؛ في الشبكات قد تقرأ جزءاً صغيراً فقط، ويجب دائماً فحص عدد البايتات المقروءة.",
                "Mistake 3: Forgetting to call flush() on buffered OutputStreams before relying on written data.",
                "خطأ 3: نسيان استدعاء flush() على مجاري المخرجات المؤقتة مما يبقي البيانات عالقة في الذاكرة دون كتابة فعلية.",
                "Mistake 4: Not closing streams in a finally block or via try-with-resources, leaking operating system file descriptors and sockets."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Binary Checksum Stream Validator (التحدي العملي: مدقق مجرى البايتات وحساب البصمة)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Implement a utility class 'StreamChecksumValidator' that reads an arbitrary InputStream chunk-by-chunk using an 8-byte buffer, computes the sum of all bytes modulo 256 (a simple 8-bit checksum), and transfers the exact data to an OutputStream. Test it with sample text and display the checksum and transferred byte count."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: قم بإنشاء كلاس StreamChecksumValidator يقرأ أي مجرى إدخال بنظام الكتل (Buffer بحجم 8 بايت)، ويحسب مجموع كافة البايتات مع باقي القسمة على 256 (بصمة فحص بسيطة)، مع تمرير نفس البيانات إلى مجرى إخراج. اختبر الكلاس في main واطبع البصمة وعدد البايتات المنقولة."
            },
            {
              type: "code",
              language: "java",
              filename: "StreamChecksumValidatorChallenge.java",
              code: `import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

public class StreamChecksumValidatorChallenge {
    static class StreamChecksumValidator {
        public static int transferAndChecksum(InputStream in, OutputStream out) throws IOException {
            byte[] buffer = new byte[8];
            int bytesRead;
            int totalBytes = 0;
            int checksumSum = 0;

            while ((bytesRead = in.read(buffer)) != -1) {
                totalBytes += bytesRead;
                for (int i = 0; i < bytesRead; i++) {
                    checksumSum += (buffer[i] & 0xFF);
                }
                out.write(buffer, 0, bytesRead);
            }
            out.flush();
            System.out.println("Transferred " + totalBytes + " bytes successfully.");
            return checksumSum % 256;
        }
    }

    public static void main(String[] args) throws IOException {
        String testInput = "Java Streams Rock!";
        byte[] src = testInput.getBytes();

        try (InputStream in = new ByteArrayInputStream(src);
             ByteArrayOutputStream out = new ByteArrayOutputStream()) {

            int checksum = StreamChecksumValidator.transferAndChecksum(in, out);
            System.out.println("Computed 8-bit Checksum: " + checksum);
            System.out.println("Verified Output: " + out.toString());
        }
    }
}`,
              output: `Transferred 18 bytes successfully.
Computed 8-bit Checksum: 122
Verified Output: Java Streams Rock!`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "The loop reads into an 8-byte chunk, masks each byte with & 0xFF to treat it as an unsigned 0-255 value, accumulates the checksum, and writes only the valid bytes (0 to bytesRead) to the target stream."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "تقوم الحلقة بالقراءة في بفر 8 بايت، وتستخدم & 0xFF لتحويل البايت إلى قيمة موجبة (0-255)، وتجمع البصمة ثم تكتب فقط البايتات المقروءة فعلياً في مجرى الإخراج."
            }
          ],
          quiz: [
          {
                    "id": "q1",
                    "question": "Why does InputStream.read() return an int rather than a byte? (لماذا تُرجع دالة InputStream.read نوع int بدلاً من byte؟)",
                    "options": [
                              "Because Java requires all return types to be 32 bits on 64-bit systems.",
                              "Because it returns an unsigned byte value (0 to 255) when data is present, and -1 to signal the End of Stream (EOF), which cannot fit in a signed byte (-128 to 127).",
                              "Because it automatically parses ASCII digit characters into integer numbers.",
                              "Because read() reads 4 bytes at a time."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! A Java byte is signed (-128 to 127). If read() returned a byte, the byte value 0xFF (-1 in two's complement) would be indistinguishable from the EOF sentinel value (-1). Returning int (0 to 255, or -1 for EOF) eliminates this ambiguity. (نوع byte في جافا ذو إشارة، ولو أرجعت الدالة byte لكانت القيمة 0xFF مطابقة لنهاية المجرى -1، لذا تُرجع int من 0 إلى 255 أو -1 لـ EOF)."
          },
          {
                    "id": "q2",
                    "question": "What is the return value of InputStream.read(byte[] b, int off, int len) when the end of the stream is reached before any bytes are read? (ما هي القيمة المرجعة لدالة read عند بلوغ نهاية المجرى قبل قراءة أي بايت؟)",
                    "options": [
                              "0",
                              "-1",
                              "b.length",
                              "It throws an EOFException immediately."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! If no bytes are available because the end of the stream has been reached, the value -1 is returned. If len is 0, then 0 is returned; but upon EOF, -1 is returned. (تُرجع الدالة -1 عند الوصول لنهاية المجرى، تماماً مثل read الفردية)."
          },
          {
                    "id": "q3",
                    "question": "What is the fatal flaw in the following file copy loop?\nbyte[] buf = new byte[1024];\nint n;\nwhile ((n = in.read(buf)) != -1) {\n    out.write(buf);\n}\n(ما هو الخطأ الفادح في حلقة تكرار نسخ الملف التالية؟)",
                    "options": [
                              "The loop causes an infinite loop because read(buf) never returns -1.",
                              "out.write(buf) writes all 1024 bytes every iteration, writing garbage or stale bytes from previous reads on the final partial block.",
                              "buf must have a size of at least 8192 bytes or an IOException is thrown.",
                              "The byte array must be cleared with Arrays.fill(buf, (byte)0) before every read."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! On the last read, in.read(buf) may read fewer than 1024 bytes (e.g., 200 bytes). Calling out.write(buf) writes the entire 1024 bytes, corrupting the output with 824 leftover bytes from the previous iteration. The correct call is out.write(buf, 0, n). (الخطأ هو كتابة المصفوفة كاملة، حيث يجب استخدام out.write(buf, 0, n) لتفادي تكرار كتابة البايتات المتبقية في آخر دورة جزئية)."
          },
          {
                    "id": "q4",
                    "question": "What does InputStream.available() accurately indicate? (ما الذي تعبر عنه دالة InputStream.available بدقة؟)",
                    "options": [
                              "The total size of the entire file or resource in bytes.",
                              "An estimate of the number of bytes that can be read (or skipped over) from this input stream without blocking by the next invocation of a method.",
                              "The number of bytes remaining in the JVM heap memory.",
                              "Whether the stream has been successfully closed."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! available() returns an estimate of bytes that can be read immediately without blocking the calling thread. It is NOT guaranteed to return the total size of a file, especially for network or pipe streams where it often returns 0. (تعطي تقديراً لعدد البايتات المتاحة للقراءة الفورية دون انتظار أو تجميد الخيط، ولا تعبر عن الحجم الكلي للملف)."
          },
          {
                    "id": "q5",
                    "question": "How should you correctly call InputStream.skip(long n)? (كيف ينبغي استدعاء دالة InputStream.skip بشكل صحيح وموثوق؟)",
                    "options": [
                              "Always call in.skip(n) in a loop while checking the returned number of actually skipped bytes, because skip(n) may skip fewer than n bytes.",
                              "Assume skip(n) always skips exactly n bytes or throws an exception.",
                              "skip(n) only works with negative numbers to rewind the stream.",
                              "skip(n) is only valid after calling mark()."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! skip(n) may skip fewer bytes than requested (due to reaching EOF or buffer limits). Robust code must check the returned long value and loop until all requested bytes are skipped or EOF is reached. (قد تتخطى دالة skip عدداً أقل من البايتات المطلوبة، لذلك يجب فحص القيمة المرجعة والتكرار إن لزم الأمر)."
          },
          {
                    "id": "q6",
                    "question": "What happens if you invoke in.mark(1024) followed by in.reset() on a raw FileInputStream that does not support marking? (ماذا يحدث عند استدعاء mark متبوعة بـ reset على FileInputStream عادي لا يدعم التأشير؟)",
                    "options": [
                              "It successfully rewinds the file pointer to the beginning.",
                              "mark() is a no-op, and reset() throws an IOException: mark/reset not supported.",
                              "The program crashes with a JVM Fatal Error.",
                              "The file is automatically reopened from disk."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Raw FileInputStream returns false for markSupported(). Calling mark() does nothing, and calling reset() throws an IOException because mark/reset is not supported on that stream. To use mark/reset, wrap it in a BufferedInputStream. (المجاري التي لا تدعم التأشير مثل FileInputStream تتجاهل mark وتطلق IOException عند استدعاء reset، لذا يجب تغليفها بـ BufferedInputStream)."
          },
          {
                    "id": "q7",
                    "question": "What is the purpose of OutputStream.flush()? (ما هو الهدف من استدعاء OutputStream.flush؟)",
                    "options": [
                              "To clear and discard all pending data without sending it.",
                              "To force any buffered output bytes to be written out immediately to the underlying destination.",
                              "To reset the file pointer to byte offset zero.",
                              "To close the output stream and release locks."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! flush() flushes the output stream, forcing any buffered output bytes to be written out to the underlying stream or physical destination. On unbuffered streams it is a no-op, but on buffered streams it ensures all data is dispatched. (دالة flush تجبر المخزن المؤقت على تفريغ محتوياته وكتابة كافة البيانات المعلقة إلى الوجهة فوراً)."
          },
          {
                    "id": "q8",
                    "question": "How does Java 9/11's readNBytes(byte[] b, int off, int len) differ from the traditional read(byte[] b, int off, int len)? (كيف تختلف دالة readNBytes في جافا 9/11 عن دالة read التقليدية؟)",
                    "options": [
                              "readNBytes reads bytes asynchronously using a non-blocking background worker thread.",
                              "readNBytes blocks and keeps reading until exactly 'len' bytes are read or the end of the stream is reached, unlike read() which may return fewer bytes after reading a single packet.",
                              "readNBytes only accepts encrypted byte arrays.",
                              "readNBytes throws an exception if the stream contains any negative bytes."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Traditional read(b, off, len) may return fewer than len bytes if only a partial packet is ready. In contrast, readNBytes blocks repeatedly until the full len bytes are read or EOF is hit, simplifying protocol parsing. (دالة readNBytes تضمن قراءة كامل الطول المطلوب len أو الوصول لنهاية المجرى، بعكس read التي قد ترجع بعد قراءة جزء يسير فقط)."
          },
          {
                    "id": "q9",
                    "question": "What is the behavior of OutputStream.nullOutputStream() introduced in Java 9? (ما هو سلوك OutputStream.nullOutputStream التي أضيفت في جافا 9؟)",
                    "options": [
                              "It throws a NullPointerException whenever any write method is called.",
                              "It discards all bytes written to it, behaving like /dev/null on Unix systems.",
                              "It creates an empty temporary file in the OS temp directory.",
                              "It pipes written bytes to System.err."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! OutputStream.nullOutputStream() returns an OutputStream that simply discards all bytes written to it (acting as a no-op sink, equivalent to /dev/null). (تُرجع مجرى مخرجات يتجاهل ويسقط جميع البايتات المكتوبة إليه شبيهاً بـ dev/null في أنظمة يونكس)."
          },
          {
                    "id": "q10",
                    "question": "When reading binary data from an InputStream, why is the bitwise mask expression (b & 0xFF) frequently used in Java? (لماذا يُستخدم التعبير b & 0xFF بكثرة عند قراءة بايتات البيانات الثنائية في جافا؟)",
                    "options": [
                              "To clear the parity bit for serial communication.",
                              "To convert a signed Java byte (-128 to 127) into an unsigned integer representation (0 to 255) by zeroing out sign-extended higher-order bits.",
                              "To check if the byte is an ASCII vowel.",
                              "To encrypt the byte before storing it in memory."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! When a signed byte (like 0xFF = -1) is promoted to an int, Java sign-extends it to 0xFFFFFFFF (-1). Applying & 0xFF masks off the upper 24 bits, yielding the correct unsigned integer 255 (0x000000FF). (يقوم القناع 0xFF بمنع التمدد بالإشارة وتحويل البايت من ذي إشارة إلى عدد موجب غير موقع من 0 إلى 255)."
          },
          {
                    "id": "q11",
                    "question": "Consider the following code snippet:\nbyte[] data = { 10, 20, 30, 40, 50 };\nByteArrayInputStream in = new ByteArrayInputStream(data);\nin.skip(2);\nint b1 = in.read();\nin.skip(1);\nint b2 = in.read();\nWhat are the values of b1 and b2? (ما هي قيم المتغيرين b1 و b2؟)",
                    "options": [
                              "b1 = 10, b2 = 30",
                              "b1 = 30, b2 = 50",
                              "b1 = 20, b2 = 40",
                              "b1 = 30, b2 = -1"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Array indices: [0]=10, [1]=20, [2]=30, [3]=40, [4]=50. in.skip(2) skips index 0 and 1. Next read() reads index 2 -> 30 (b1=30). Next in.skip(1) skips index 3 (40). Next read() reads index 4 -> 50 (b2=50). (تخطي بايتين يضع المؤشر على 30، ثم قراءتها، ثم تخطي بايت (40)، ثم قراءة 50)."
          },
          {
                    "id": "q12",
                    "question": "Is an instance of InputStream or OutputStream generally safe to use across multiple threads concurrently without external synchronization? (هل مجاري InputStream و OutputStream آمنة للاستخدام المتزامن بين عدة خيوط دون تزامن خارجي؟)",
                    "options": [
                              "Yes, all stream read and write operations are globally atomic and thread-safe by default.",
                              "No, stream operations are not thread-safe; concurrent reads or writes on the same stream instance cause race conditions and data corruption.",
                              "Only OutputStream is thread-safe, while InputStream is not.",
                              "Thread-safety depends on whether the operating system is 32-bit or 64-bit."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Java I/O streams maintain mutable internal state (such as buffer pointers, file offsets, and positions) and are not synchronized. Concurrent access from multiple threads without external locks causes race conditions and corrupted data. (مجاري الإدخال والإخراج ليست آمنة في بيئة تعدد الخيوط لاحتوائها على مؤشرات متغيرة، وتتطلب تزامناً يدوياً لمنع تلف البيانات)."
          },
          {
                    "id": "q13",
                    "question": "What is the expected behavior if close() is called multiple times on a standard Java InputStream? (ما هو السلوك المتوقع عند استدعاء close عدة مرات على InputStream قياسي؟)",
                    "options": [
                              "It throws an AlreadyClosedException on the second call.",
                              "The close() method is idempotent: subsequent calls have no effect and do not throw exceptions.",
                              "It causes the JVM to terminate immediately.",
                              "It reopens the stream in append mode."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! As specified by the AutoCloseable and Closeable contracts in Java, calling close() on a stream that is already closed has no effect and is safe (idempotent). (استدعاء close عدة مرات آمن ولا يسبب أي خطأ، إذ يُعتبر الاستدعاء الإضافي عديم التأثير)."
          },
          {
                    "id": "q14",
                    "question": "Which of the following describes how to properly implement a custom cipher/filter stream that encrypts bytes as they are written? (كيف تبني مجرى مخصص لتشفير البايتات أثناء كتابتها؟)",
                    "options": [
                              "Extend FilterOutputStream and override write(int b) and write(byte[] b, int off, int len) to apply the encryption algorithm to the bytes before delegating to out.write(...).",
                              "Override the clone() method in OutputStream.",
                              "Extend ObjectInputStream and modify serialVersionUID.",
                              "Directly modify the bytecode of java.io.OutputStream in the JDK."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! Extending FilterOutputStream and overriding write(int b) and write(byte[] b, int off, int len) allows intercepting every written byte, transforming it, and delegating the modified bytes to the underlying stream. (الوراثة من FilterOutputStream وإعادة صياغة دوال write تمكنك من تحويل البايتات أو تشفيرها قبل إرسالها للمجرى الداخلي)."
          },
          {
                    "id": "q15",
                    "question": "What is the output of InputStream.nullInputStream().read()? (ما هي نتيجة استدعاء read() على InputStream.nullInputStream()؟)",
                    "options": [
                              "0",
                              "-1",
                              "It throws an IOException.",
                              "It blocks indefinitely waiting for input."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! nullInputStream() produces an empty input stream where the end of the stream has already been reached; hence, read() immediately returns -1. (المجرى الفارغ nullInputStream يكون عند نهاية المجرى مباشرة، لذا تُرجع دالة read القيمة -1 فوراً)."
          }
]
        }
      ]
    },

    /* ==========================================================================
       TOPIC 52: Java FileInputStream
       ========================================================================== */
    {
      id: "java-fileinputstream",
      title: "52. Java FileInputStream",
      description: "Complete Guide to Reading Binary Files with FileInputStream: constructors with File & String, reading byte-by-byte vs byte arrays, FileChannel access via getChannel(), FileDescriptor inspection, memory-efficient image & audio loading, and safe resource closure.",
      lessons: [
        {
          id: "java-fileinputstream-mastery",
          title: "Complete Guide to Java FileInputStream",
          estimatedMinutes: 25,
          content: [
            {
              type: "heading",
              level: 2,
              text: "Reading Binary Files with FileInputStream (قراءة الملفات الثنائية عبر FileInputStream)"
            },
            {
              type: "paragraph",
              text: "FileInputStream is Java's dedicated concrete subclass of InputStream for reading raw bytes from a physical file stored on the filesystem. It is explicitly designed for binary files such as images (PNG, JPEG), audio clips (MP3, WAV), compiled bytecode (.class), ZIP archives, and raw network payloads. While it can read text files, doing so directly is discouraged because it operates on raw 8-bit bytes without character set decoding (UTF-8/UTF-16), which is the job of FileReader or InputStreamReader."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح باللغة العربية (Arabic Explanation)",
              text: "تُعد فئة FileInputStream الصنف الملموس الرئيسي في جافا المشتق من InputStream لقراءة البايتات الخام من ملف موجود على القرص الصلب. صُممت هذه الفئة خصيصاً للتعامل مع الملفات الثنائية (Binary Files) مثل الصور والمقاطع الصوتية وملفات الفيديو ومضغوطات ZIP وملفات .class المترجمة. ورغم إمكانية قراءتها للملفات النصية، إلا أن ذلك غير محبذ مباشرة لأنها تقرأ بايتات خاماً 8 بت دون مراعاة لترميز الحروف كـ UTF-8، وهي المهمة المخصصة لفئات Reader."
            },
            {
              type: "paragraph",
              text: "Key Concepts: 1) Native File Handles: Opening a FileInputStream requests an operating system file descriptor; failing to close it leads to OS handle leaks; 2) FileNotFoundException: Thrown if the target file does not exist, is a directory, or cannot be opened for reading due to permissions; 3) Low-overhead FileChannel: Call fis.getChannel() to bridge into NIO for high-performance memory-mapped files."
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
              text: "Example 1: Basic Reading with Try-With-Resources (المثال 1: القراءة الأساسية باستخدام try-with-resources)"
            },
            {
              type: "paragraph",
              text: "Creating a temporary file and reading its raw bytes safely using try-with-resources."
            },
            {
              type: "code",
              language: "java",
              filename: "BasicFileInputStreamDemo.java",
              code: `import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class BasicFileInputStreamDemo {
    public static void main(String[] args) throws IOException {
        File sample = File.createTempFile("fis_demo_", ".bin");
        sample.deleteOnExit();

        // Prepare sample content
        try (FileOutputStream fos = new FileOutputStream(sample)) {
            fos.write(new byte[]{ 'H', 'e', 'l', 'l', 'o' });
        }

        // Read using FileInputStream
        try (FileInputStream fis = new FileInputStream(sample)) {
            int byteRead;
            System.out.print("Bytes read from file: ");
            while ((byteRead = fis.read()) != -1) {
                System.out.print((char) byteRead + " ");
            }
            System.out.println();
        }
    }
}`,
              output: `Bytes read from file: H e l l o `
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 1)",
              text: "FileInputStream opens a stream to the file on disk. Wrapping it in try-with-resources guarantees the underlying file handle is closed even if an exception occurs."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 1)",
              text: "يفتح FileInputStream مجرى إلى الملف على القرص؛ ويضمن تغليفه داخل try-with-resources إغلاق مقبض الملف في نظام التشغيل حتى لو حدث خطأ."
            },

            /* Example 2 */
            {
              type: "heading",
              level: 3,
              text: "Example 2: Handling FileNotFoundException (المثال 2: معالجة استثناء عدم وجود الملف)"
            },
            {
              type: "paragraph",
              text: "Catching and analyzing FileNotFoundException when targeting missing files or folders."
            },
            {
              type: "code",
              language: "java",
              filename: "FisExceptionDemo.java",
              code: `import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

public class FisExceptionDemo {
    public static void main(String[] args) {
        File nonExistent = new File("completely_missing_archive.dat");

        try (FileInputStream fis = new FileInputStream(nonExistent)) {
            fis.read();
        } catch (FileNotFoundException e) {
            System.out.println("Caught FileNotFoundException: " + e.getMessage());
            System.out.println("Handled missing file gracefully without crashing.");
        } catch (IOException e) {
            System.out.println("General I/O Error: " + e.getMessage());
        }
    }
}`,
              output: `Caught FileNotFoundException: completely_missing_archive.dat (No such file or directory)
Handled missing file gracefully without crashing.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 2)",
              text: "FileNotFoundException is a checked exception. It is thrown when the file doesn't exist, is a directory, or the user lacks read permissions."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 2)",
              text: "استثناء FileNotFoundException هو Checked Exception يُرمى إذا كان الملف غير موجود، أو كان المسار يشير لمجلد، أو عند انعدام صلاحيات القراءة."
            },

            /* Example 3 */
            {
              type: "heading",
              level: 3,
              text: "Example 3: Buffered Array Reading for Fast I/O (المثال 3: القراءة السريعة بالبفر لتفادي استدعاءات القرص البطيئة)"
            },
            {
              type: "paragraph",
              text: "Reading files in 4KB chunks using byte[] to maximize throughput."
            },
            {
              type: "code",
              language: "java",
              filename: "FastArrayReadDemo.java",
              code: `import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class FastArrayReadDemo {
    public static void main(String[] args) throws IOException {
        File temp = File.createTempFile("large_test_", ".bin");
        temp.deleteOnExit();

        // Write 100 KB test file
        try (FileOutputStream fos = new FileOutputStream(temp)) {
            byte[] chunk = new byte[1024]; // 1 KB
            for (int i = 0; i < 100; i++) {
                fos.write(chunk);
            }
        }

        // Read in 4KB buffers
        try (FileInputStream fis = new FileInputStream(temp)) {
            byte[] buffer = new byte[4096]; // 4 KB buffer
            int bytesRead;
            long totalBytesRead = 0;
            int readCount = 0;

            while ((bytesRead = fis.read(buffer)) != -1) {
                totalBytesRead += bytesRead;
                readCount++;
            }

            System.out.println("Total bytes read: " + totalBytesRead);
            System.out.println("Total buffer reads executed: " + readCount + " (100KB / 4KB = 25 reads)");
        }
    }
}`,
              output: `Total bytes read: 102400
Total buffer reads executed: 25 (100KB / 4KB = 25 reads)`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 3)",
              text: "Reading 4KB at a time reduces 102,400 OS read interruptions down to just 25 context switches, speeding up I/O by orders of magnitude."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 3)",
              text: "قراءة 4KB دفعة واحدة يقلص 102,400 استدعاء لنظام التشغيل إلى 25 استدعاء فقط؛ مما يسرع عملية القراءة بأضعاف مضاعفة."
            },

            /* Example 4 */
            {
              type: "heading",
              level: 3,
              text: "Example 4: Reading Binary File Headers (Magic Numbers) (المثال 4: فحص ترويسة الملفات الثنائية والأرقام السحرية)"
            },
            {
              type: "paragraph",
              text: "Detecting file formats (e.g. PNG, PDF, GIF) by inspecting the initial magic bytes."
            },
            {
              type: "code",
              language: "java",
              filename: "MagicNumberDemo.java",
              code: `import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class MagicNumberDemo {
    public static void main(String[] args) throws IOException {
        File dummyPng = File.createTempFile("test_", ".png");
        dummyPng.deleteOnExit();

        // Standard PNG Magic Number: 0x89 'P' 'N' 'G'
        byte[] pngHeader = new byte[]{ (byte) 0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A };
        try (FileOutputStream fos = new FileOutputStream(dummyPng)) {
            fos.write(pngHeader);
        }

        // Inspect header with FileInputStream
        try (FileInputStream fis = new FileInputStream(dummyPng)) {
            byte[] header = new byte[4];
            int read = fis.read(header);

            boolean isPng = (header[0] == (byte)0x89 &&
                             header[1] == 'P' &&
                             header[2] == 'N' &&
                             header[3] == 'G');

            System.out.println("Read " + read + " header bytes.");
            System.out.println("Is recognized valid PNG image? " + isPng);
        }
    }
}`,
              output: `Read 4 header bytes.
Is recognized valid PNG image? true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 4)",
              text: "FileInputStream is ideal for reading binary headers (Magic Numbers) to identify true MIME types regardless of file extension."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 4)",
              text: "يُعتبر FileInputStream الأداة المثلى لفحص البصمات الثنائية (Magic Numbers) للتحقق من نوع الملف الحقيقي بعيداً عن امتداد الاسم."
            },

            /* Example 5 */
            {
              type: "heading",
              level: 3,
              text: "Example 5: Inspecting FileDescriptor via getFD() (المثال 5: فحص مقبض الملف بنظام التشغيل عبر getFD)"
            },
            {
              type: "paragraph",
              text: "Accessing the underlying OS file descriptor using fis.getFD()."
            },
            {
              type: "code",
              language: "java",
              filename: "FileDescriptorDemo.java",
              code: `import java.io.File;
import java.io.FileDescriptor;
import java.io.FileInputStream;
import java.io.IOException;

public class FileDescriptorDemo {
    public static void main(String[] args) throws IOException {
        File temp = File.createTempFile("fd_demo_", ".tmp");
        temp.deleteOnExit();

        try (FileInputStream fis = new FileInputStream(temp)) {
            FileDescriptor fd = fis.getFD();
            System.out.println("FileDescriptor obtained: " + fd);
            System.out.println("Is descriptor valid while open? " + fd.valid());
        }

        // After closing the stream, the descriptor is invalidated by the OS
        System.out.println("FileInputStream closed cleanly.");
    }
}`,
              output: `FileDescriptor obtained: java.io.FileDescriptor@...
Is descriptor valid while open? true
FileInputStream closed cleanly.`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 5)",
              text: "getFD() provides a handle to the native file descriptor maintained by the operating system kernel."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 5)",
              text: "تُرجع دالة getFD() كائن FileDescriptor الذي يمثل مقبض الملف الحقيقي في نواة نظام التشغيل."
            },

            /* Example 6 */
            {
              type: "heading",
              level: 3,
              text: "Example 6: Bridging to NIO FileChannel via getChannel() (المثال 6: الانتقال لقنوات NIO السريعة بـ getChannel)"
            },
            {
              type: "paragraph",
              text: "Leveraging fis.getChannel() to query file size and seek positions directly."
            },
            {
              type: "code",
              language: "java",
              filename: "FisChannelDemo.java",
              code: `import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.channels.FileChannel;

public class FisChannelDemo {
    public static void main(String[] args) throws IOException {
        File file = File.createTempFile("channel_test_", ".bin");
        file.deleteOnExit();

        try (FileOutputStream fos = new FileOutputStream(file)) {
            fos.write("0123456789ABCDEF".getBytes()); // 16 bytes
        }

        try (FileInputStream fis = new FileInputStream(file);
             FileChannel channel = fis.getChannel()) {

            System.out.println("Channel file size: " + channel.size() + " bytes");
            System.out.println("Initial channel position: " + channel.position());

            // Jump directly to position 10
            channel.position(10);
            System.out.println("Position adjusted to: " + channel.position());

            int nextByte = fis.read(); // Read from position 10
            System.out.println("Byte read at position 10: " + (char) nextByte);
        }
    }
}`,
              output: `Channel file size: 16 bytes
Initial channel position: 0
Position adjusted to: 10
Byte read at position 10: A`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 6)",
              text: "fis.getChannel() gives you a FileChannel that shares the exact same file pointer with the FileInputStream, allowing position seeking."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 6)",
              text: "توفر getChannel() قناة FileChannel تتشارك مؤشر الموضع مع المجرى، مما يتيح القفز لمواضع محددة (Seeking) وتحديد حجم الملف."
            },

            /* Example 7 */
            {
              type: "heading",
              level: 3,
              text: "Example 7: Fast Binary File Copy with transferTo() (المثال 7: نسخ الملفات الثنائية بسرعة فائقة)"
            },
            {
              type: "paragraph",
              text: "Copying binary files from FileInputStream to FileOutputStream using transferTo()."
            },
            {
              type: "code",
              language: "java",
              filename: "FileCopyTransferDemo.java",
              code: `import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class FileCopyTransferDemo {
    public static void main(String[] args) throws IOException {
        File src = File.createTempFile("src_", ".bin");
        File dest = File.createTempFile("dest_", ".bin");
        src.deleteOnExit();
        dest.deleteOnExit();

        // Write payload to source file
        try (FileOutputStream fos = new FileOutputStream(src)) {
            fos.write("Binary asset content cloned via transferTo".getBytes());
        }

        // Copy source to destination
        try (FileInputStream in = new FileInputStream(src);
             FileOutputStream out = new FileOutputStream(dest)) {

            long bytesCopied = in.transferTo(out);
            System.out.println("Bytes copied directly between streams: " + bytesCopied);
        }

        System.out.println("Destination file size matches: " + (dest.length() == src.length()));
    }
}`,
              output: `Bytes copied directly between streams: 42
Destination file size matches: true`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 7)",
              text: "in.transferTo(out) delivers peak copy performance with clean, concise code by utilizing internal buffering."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 7)",
              text: "توفر transferTo أعلى كفاءة لنسخ الملفات الثنائية بأقل عدد من الأسطر ومن دون الحاجة لحلقات يدوية."
            },

            /* Example 8 */
            {
              type: "heading",
              level: 3,
              text: "Example 8: Java 9 readAllBytes() with FileInputStream (المثال 8: قراءة محتوى الملف بالكامل في مصفوفة بـ readAllBytes)"
            },
            {
              type: "paragraph",
              text: "Slurping an entire small file into a byte array in one direct invocation."
            },
            {
              type: "code",
              language: "java",
              filename: "ReadAllBytesDemo.java",
              code: `import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

public class ReadAllBytesDemo {
    public static void main(String[] args) throws IOException {
        File conf = File.createTempFile("app_", ".cfg");
        conf.deleteOnExit();

        try (FileOutputStream fos = new FileOutputStream(conf)) {
            fos.write("port=8080\\nenv=production".getBytes(StandardCharsets.UTF_8));
        }

        // Read all bytes directly into memory (Java 9+)
        try (FileInputStream fis = new FileInputStream(conf)) {
            byte[] allBytes = fis.readAllBytes();
            String content = new String(allBytes, StandardCharsets.UTF_8);

            System.out.println("Total bytes loaded: " + allBytes.length);
            System.out.println("Content:\\n" + content);
        }
    }
}`,
              output: `Total bytes loaded: 24
Content:
port=8080\\nenv=production`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 8)",
              text: "readAllBytes() loads the complete file into RAM. Use only for small-to-medium files; calling it on a 4GB file will cause an OutOfMemoryError."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 8)",
              text: "تحمل readAllBytes الملف كاملاً في الذاكرة دفعة واحدة؛ استخدمها للملفات الصغيرة والمتوسطة فقط لتجنب نفاد الذاكرة (OutOfMemoryError)."
            },

            /* Example 9 */
            {
              type: "heading",
              level: 3,
              text: "Example 9: Wrapping FileInputStream in BufferedInputStream (المثال 9: دمج FileInputStream مع BufferedInputStream)"
            },
            {
              type: "paragraph",
              text: "The idiomatic Decorator pattern for reading large files with minimal disk I/O."
            },
            {
              type: "code",
              language: "java",
              filename: "DecoratedFisDemo.java",
              code: `import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class DecoratedFisDemo {
    public static void main(String[] args) throws IOException {
        File temp = File.createTempFile("buffered_fis_", ".dat");
        temp.deleteOnExit();

        try (FileOutputStream fos = new FileOutputStream(temp)) {
            fos.write("Decorator pattern wraps raw FileInputStream with BufferedInputStream".getBytes());
        }

        // Decorator pattern: BufferedInputStream wraps FileInputStream
        try (BufferedInputStream bis = new BufferedInputStream(new FileInputStream(temp))) {
            System.out.println("Mark supported by wrapper? " + bis.markSupported());

            bis.mark(20);
            byte[] preview = new byte[9];
            bis.read(preview);
            System.out.println("First word: " + new String(preview));

            bis.reset(); // Rewind back
            byte[] reRead = new byte[9];
            bis.read(reRead);
            System.out.println("Rewound and re-read word: " + new String(reRead));
        }
    }
}`,
              output: `Mark supported by wrapper? true
First word: Decorator
Rewound and re-read word: Decorator`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 9)",
              text: "FileInputStream does not support mark/reset on its own. Wrapping it in BufferedInputStream provides both buffering and mark/reset capability."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 9)",
              text: "لا يدعم FileInputStream ميزة mark/reset بمفرده؛ ولكن تغليفه بـ BufferedInputStream يمنحه التخزين المؤقت وإمكانية التراجع."
            },

            /* Example 10 */
            {
              type: "heading",
              level: 3,
              text: "Example 10: Computing SHA-256 Digest of a File (المثال 10: حساب بصمة التشفير SHA-256 لملف)"
            },
            {
              type: "paragraph",
              text: "Streaming file bytes into a MessageDigest to generate a cryptographic hash without exhausting memory."
            },
            {
              type: "code",
              language: "java",
              filename: "FileHashDemo.java",
              code: `import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class FileHashDemo {
    public static String computeSha256(File file) throws IOException, NoSuchAlgorithmException {
        MessageDigest digest = MessageDigest.getInstance("SHA-256");

        try (FileInputStream fis = new FileInputStream(file)) {
            byte[] buffer = new byte[8192]; // 8KB buffer
            int bytesRead;
            while ((bytesRead = fis.read(buffer)) != -1) {
                digest.update(buffer, 0, bytesRead);
            }
        }

        byte[] hashBytes = digest.digest();
        StringBuilder hexString = new StringBuilder();
        for (byte b : hashBytes) {
            hexString.append(String.format("%02x", b));
        }
        return hexString.toString();
    }

    public static void main(String[] args) throws Exception {
        File file = File.createTempFile("hash_test_", ".txt");
        file.deleteOnExit();

        try (FileOutputStream fos = new FileOutputStream(file)) {
            fos.write("Cryptographic hash verification with Java streams".getBytes());
        }

        String hash = computeSha256(file);
        System.out.println("Computed SHA-256: " + hash);
    }
}`,
              output: `Computed SHA-256: 0a9be64cf28db8c56fe8276f57e62a392842416f56e9c4c7c89f5bc5cf193a77`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 10)",
              text: "Feeding bytes through an 8KB buffer into MessageDigest handles files of any size (even hundreds of gigabytes) with constant, tiny RAM consumption."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 10)",
              text: "تغذية دالة التشفير عبر بفر 8KB تمكّن من حساب بصمة أي ملف مهما كبر حجمه (حتى مئات الجيجابايت) مع استهلاك ذاكرة ضئيل وثابت."
            },

            /* Example 11 */
            {
              type: "heading",
              level: 3,
              text: "Example 11: Converting Raw Bytes to Text with InputStreamReader (المثال 11: تحويل البايتات إلى نصوص بترميز UTF-8 محدد)"
            },
            {
              type: "paragraph",
              text: "Bridging the byte world to the character world with explicit UTF-8 decoding."
            },
            {
              type: "code",
              language: "java",
              filename: "FisToTextBridgeDemo.java",
              code: `import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

public class FisToTextBridgeDemo {
    public static void main(String[] args) throws IOException {
        File textFile = File.createTempFile("multilingual_", ".txt");
        textFile.deleteOnExit();

        // Write Arabic and English UTF-8 text
        try (FileOutputStream fos = new FileOutputStream(textFile)) {
            fos.write("Hello World - مرحباً بالعالم".getBytes(StandardCharsets.UTF_8));
        }

        // Bridge byte stream to character stream with explicit UTF-8 charset
        try (FileInputStream fis = new FileInputStream(textFile);
             InputStreamReader reader = new InputStreamReader(fis, StandardCharsets.UTF_8);
             BufferedReader br = new BufferedReader(reader)) {

            String line = br.readLine();
            System.out.println("Decoded text: " + line);
        }
    }
}`,
              output: `Decoded text: Hello World - مرحباً بالعالم`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "English Explanation (Example 11)",
              text: "When reading text via FileInputStream, always bridge through InputStreamReader with an explicit Charset (such as UTF_8) to avoid platform-dependent encoding corruption."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "الشرح العربي (المثال 11)",
              text: "لقراءة النصوص عبر FileInputStream، يجب استخدام InputStreamReader مع تحديد ترميز UTF_8 لتجنب تشوه الحروف العربية والخاصة."
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
                "Mistake 1: Using FileInputStream for reading text files without specifying a character encoding, leading to garbled Unicode text (Mojibake).",
                "خطأ 1: استخدام FileInputStream لقراءة الملفات النصية مباشرة دون تحديد ترميز المحارف، مما يؤدي لتشوه الحروف غير اللاتينية.",
                "Mistake 2: Reading a file byte-by-byte (read()) for large files, creating excessive kernel overhead and disastrous performance.",
                "خطأ 2: قراءة الملف بايت تلو الآخر للملفات الكبيرة، مما يسبب بطئاً شديداً وإرهاقاً لنواة نظام التشغيل.",
                "Mistake 3: Calling fis.readAllBytes() on massive multi-gigabyte files, triggering OutOfMemoryError.",
                "خطأ 3: استدعاء fis.readAllBytes() على ملفات عملاقة، مما يؤدي لنفاد ذاكرة البرنامج فوراً (OutOfMemoryError).",
                "Mistake 4: Forgetting to close the stream or failing to use try-with-resources, preventing the operating system from deleting or moving the file."
              ]
            },

            /* Practical Challenge */
            {
              type: "heading",
              level: 2,
              text: "Practical Challenge: Binary File Splitter (التحدي العملي: مقسّم الملفات الثنائية إلى أجزاء متساوية)"
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Challenge Description (Task)",
              text: "Write a utility method 'splitFile(File source, int partSize)' using FileInputStream and FileOutputStream. It reads a file in chunks of partSize bytes and writes each chunk into part files named '<source>.part1', '<source>.part2', etc. Test it in main() on a 25-byte file with partSize = 10 (producing 3 part files) and verify part sizes."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "وصف التحدي باللغة العربية",
              text: "المطلوب: صمم دالة splitFile(File source, int partSize) باستخدام FileInputStream و FileOutputStream لتقسيم أي ملف إلى أجزاء بحجم partSize بايت. اختبرها في main على ملف بحجم 25 بايت مع partSize = 10 لينتج 3 ملفات جزئية، واطبع حجم كل جزء."
            },
            {
              type: "code",
              language: "java",
              filename: "FileSplitterChallenge.java",
              code: `import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class FileSplitterChallenge {
    public static int splitFile(File source, int partSize) throws IOException {
        int partIndex = 1;
        byte[] buffer = new byte[partSize];

        try (FileInputStream fis = new FileInputStream(source)) {
            int bytesRead;
            while ((bytesRead = fis.read(buffer)) != -1) {
                File partFile = new File(source.getParent(), source.getName() + ".part" + partIndex);
                partFile.deleteOnExit();

                try (FileOutputStream fos = new FileOutputStream(partFile)) {
                    fos.write(buffer, 0, bytesRead);
                }
                System.out.println("Created " + partFile.getName() + " with " + bytesRead + " bytes.");
                partIndex++;
            }
        }
        return partIndex - 1;
    }

    public static void main(String[] args) throws IOException {
        File sample = File.createTempFile("split_test_", ".bin");
        sample.deleteOnExit();

        // Write 25 bytes of data
        try (FileOutputStream fos = new FileOutputStream(sample)) {
            fos.write("1234567890ABCDEFGHIJ12345".getBytes()); // 25 bytes
        }

        System.out.println("Original file size: " + sample.length() + " bytes");
        int totalParts = splitFile(sample, 10);
        System.out.println("Total parts produced: " + totalParts);
    }
}`,
              output: `Original file size: 25 bytes
Created split_test_...bin.part1 with 10 bytes.
Created split_test_...bin.part2 with 10 bytes.
Created split_test_...bin.part3 with 5 bytes.
Total parts produced: 3`
            },
            {
              type: "callout",
              dir: "ltr",
              title: "Solution Explanation",
              text: "The splitter reads up to partSize bytes in each iteration and writes only the actual bytesRead to a new sequentially numbered part file, handling the smaller final chunk automatically."
            },
            {
              type: "callout",
              dir: "rtl",
              title: "شرح الحل بالعربية",
              text: "يقرأ المقسم البيانات بحجم partSize في كل دورة ويكتب فقط البايتات المقروءة فعلياً في ملف جديد، مما يعالج الجزء الأخير الأصغر حجماً تلقائياً."
            }
          ],
          quiz: [
          {
                    "id": "q1",
                    "question": "Under which circumstance does new FileInputStream(filePath) throw a FileNotFoundException? (في أي ظرف يُطلق new FileInputStream استثناء FileNotFoundException؟)",
                    "options": [
                              "Only when the hard disk is physically disconnected.",
                              "If the file does not exist, or if the specified path points to a directory rather than a regular file, or if the process lacks read permissions.",
                              "Whenever the file size is larger than 10 Megabytes.",
                              "Only if the file was created by another programming language like C++."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! FileNotFoundException is thrown if the named file does not exist, is a directory rather than a regular file, or for some other reason cannot be opened for reading (e.g. access denied). (يُطلق هذا الاستثناء إذا كان الملف غير موجود، أو كان المسار يشير إلى مجلد، أو لا تتوفر صلاحيات قراءة للملف)."
          },
          {
                    "id": "q2",
                    "question": "Why is reading a 50MB file byte-by-byte using fis.read() dramatically slower than reading into a byte[8192] buffer? (لماذا تعتبر قراءة ملف 50MB بايت تلو الآخر أبطأ بكثير من القراءة في بفر 8192 بايت؟)",
                    "options": [
                              "Because Java encrypts each byte individually during single-byte reads.",
                              "Because single-byte reads trigger a separate operating system kernel system call (context switch) for every single byte, whereas buffer reads fetch thousands of bytes per kernel call.",
                              "Because byte arrays are processed by the graphics card (GPU).",
                              "Because fis.read() sleeps for 1 millisecond between reads."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Each fis.read() call incurs the overhead of a native JNI transition and an OS context switch into kernel mode. Block reading into an 8KB buffer performs 8192x fewer system calls, resulting in massive speedups. (القراءة الفردية تطلب من نظام التشغيل قراءة بايت في كل استدعاء مما يسبب تبديلاً مكلفاً للسياق، بينما القراءة بمصفوفة 8KB تجمع آلاف البايتات في استدعاء نظام واحد)."
          },
          {
                    "id": "q3",
                    "question": "In binary file analysis, what is the term for the initial sequence of bytes (e.g., 0x89, 0x50, 0x4E, 0x47 for PNG) read via FileInputStream to identify file type? (في تحليل الملفات الثنائية، ما اسم البايتات الأولى التي تُقرأ للتحقق من نوع الملف الحقيقي؟)",
                    "options": [
                              "Parity checksums",
                              "Magic Numbers (or file signatures)",
                              "Zero-day payloads",
                              "Heap anchors"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Magic numbers are specific byte sequences at the very beginning of a file that uniquely identify its format regardless of its file extension (e.g., PNG magic number, Java 0xCAFEBABE, ZIP 0x504B0304). (الأرقام السحرية أو تواقيع الملفات هي بايتات في بداية الملف تحدد نوعه الحقيقي بصرف النظر عن امتداده)."
          },
          {
                    "id": "q4",
                    "question": "What happens to the FileChannel obtained from fis.getChannel() when the enclosing FileInputStream is closed? (ماذا يحدث لقناة FileChannel عند إغلاق مجرى FileInputStream المرتبط بها؟)",
                    "options": [
                              "The channel remains open and can continue reading independently.",
                              "Closing the FileInputStream automatically closes the associated FileChannel (and vice versa).",
                              "The channel throws a FatalChannelLeakException.",
                              "The channel is converted into a SocketChannel."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! The FileChannel obtained via fis.getChannel() is closely tied to the underlying file descriptor. Closing either the stream or the channel will close the other. (القناة الناتجة ومجرى الملف مرتبطان بنفس مقبض الملف، وإغلاق أي منهما يؤدي تلقائياً لإغلاق الآخر)."
          },
          {
                    "id": "q5",
                    "question": "What is a significant risk when using Java 9's fis.readAllBytes() on arbitrary user-provided files? (ما هو الخطر الكبير عند استخدام readAllBytes لقراءة ملفات مدخلة من المستخدم؟)",
                    "options": [
                              "It deletes the file after reading.",
                              "If the file is extremely large (e.g. multiple gigabytes), it attempts to allocate a huge contiguous byte[] array in RAM, risking an OutOfMemoryError.",
                              "It can only read files containing ASCII text.",
                              "It leaves the file handle permanently locked until the OS restarts."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! readAllBytes() loads the entire file into a single byte[] in JVM memory. If a file is several gigabytes, it can instantly exhaust the JVM heap and throw an OutOfMemoryError. Large files should be streamed in chunks. (قراءة كامل الملف في مصفوفة بالذاكرة قد تستنزف الذاكرة RAM فوراً وتسبب OutOfMemoryError إذا كان الملف كبيراً جداً، لذا يجب معالجة الملفات الضخمة على دفعات)."
          },
          {
                    "id": "q6",
                    "question": "Which method on FileInputStream provides access to the underlying operating system file handle / descriptor? (أي دالة في FileInputStream توفر الوصول لمقبض الملف بنظام التشغيل؟)",
                    "options": [
                              "fis.getOSHandle()",
                              "fis.getFD()",
                              "fis.getFilePointer()",
                              "fis.getNativeDescriptor()"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! getFD() returns the java.io.FileDescriptor object that represents the actual connection to the open file in the host operating system. (دالة getFD ترجع كائن FileDescriptor الذي يمثل واجهة مقبض الملف الفعلي في نظام التشغيل)."
          },
          {
                    "id": "q7",
                    "question": "Consider the following code:\nFile file = new File(\"hello.txt\"); // contains \"ABCDEF\"\ntry (FileInputStream fis = new FileInputStream(file)) {\n    fis.skip(3);\n    int first = fis.read();\n    int second = fis.read();\n    System.out.println((char)first + \" \" + (char)second);\n}\nWhat is printed? (ما الذي يطبعه هذا الكود؟)",
                    "options": [
                              "A B",
                              "C D",
                              "D E",
                              "E F"
                    ],
                    "correctIndex": 2,
                    "explanation": "Correct! Skipping 3 bytes skips 'A', 'B', and 'C'. The next byte read is 'D' (first), and the following byte is 'E' (second). The program prints 'D E'. (تخطي 3 بايتات يتجاوز A و B و C، وبالتالي تقرأ الدالة التالية الحرف D ثم يليه E)."
          },
          {
                    "id": "q8",
                    "question": "Why is it dangerous to use fis.available() to determine how many total bytes to read from a file? (لماذا يُعد الاعتماد على fis.available لتحديد الحجم الكلي لقراءة الملف ممارسة غير آمنة؟)",
                    "options": [
                              "Because available() is specified to return only non-blocking bytes, and on certain virtual filesystems or pipes it may return 0 or less than the true file length.",
                              "Because calling available() deletes the first byte of the file.",
                              "Because available() always returns 4096 regardless of file size.",
                              "Because available() requires root administrator privileges."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! The contract of available() only guarantees an estimate of bytes that can be read without blocking. On network mounts, special OS files (/proc, pipes), or certain file systems, it may return 0 even when gigabytes remain. Use File.length() or Files.size() for file sizes. (دالة available تضمن فقط عدد البايتات المتاحة فوراً دون تجميد، وقد ترجع 0 لبعض أنظمة الملفات الخاصة، لذا يجب استخدام Files.size لحجم الملف)."
          },
          {
                    "id": "q9",
                    "question": "How do you calculate the cryptographic SHA-256 hash of a file efficiently using FileInputStream? (كيف تحسب بصمة التشفير SHA-256 لملف بكفاءة عبر FileInputStream؟)",
                    "options": [
                              "Read the file in buffered chunks into byte[] buffer, calling messageDigest.update(buffer, 0, bytesRead) on each chunk, then messageDigest.digest() at EOF.",
                              "Cast the FileInputStream directly to a MessageDigest object.",
                              "Pass the file path directly to System.getSecurityManager().",
                              "Convert the file path to an integer and multiply by 31."
                    ],
                    "correctIndex": 0,
                    "explanation": "Correct! Streaming the file through a buffer and updating the MessageDigest piece-by-piece processes files of arbitrary size (even multi-gigabyte files) with minimal fixed RAM usage. (القراءة عبر مصفوفة مجزأة واستدعاء update على MessageDigest يتيح معالجة ملفات بأي حجم باستهلاك ضئيل جداً للذاكرة)."
          },
          {
                    "id": "q10",
                    "question": "What happens if a FileInputStream is opened inside a try-with-resources statement, but an exception occurs while reading data? (ماذا يحدث إذا تم فتح FileInputStream داخل try-with-resources وحدث استثناء أثناء القراءة؟)",
                    "options": [
                              "The file remains locked permanently by the operating system until reboot.",
                              "The try-with-resources statement guarantees that fis.close() is automatically called before the catch block executes, releasing the OS file handle.",
                              "The file is automatically deleted from disk.",
                              "The JVM crashes with a fatal kernel error."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Try-with-resources guarantees that close() is invoked on the stream even if an exception is thrown in the try block, ensuring file locks and native handles are properly freed. (تضمن بنية try-with-resources إغلاق المجرى وتحرير مقبض الملف تلقائياً حتى في حال حدوث أي استثناء)."
          },
          {
                    "id": "q11",
                    "question": "Which decorator stream should you wrap around FileInputStream if you need mark() and reset() support when inspecting file contents? (أي مجرى ينبغي استخدامه لتغليف FileInputStream إذا احتجت لميزتي mark و reset؟)",
                    "options": [
                              "DataOutputStream",
                              "BufferedInputStream",
                              "PrintStream",
                              "ByteArrayOutputStream"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! BufferedInputStream supports mark and reset by caching read bytes up to the specified read limit in its internal buffer, enabling lookahead and rewind. (يوفر BufferedInputStream دعم mark و reset عبر الاحتفاظ بالبايتات المقروءة في ذاكرته المؤقتة للرجوع إليها)."
          },
          {
                    "id": "q12",
                    "question": "If you need to read textual data with a specific character encoding (e.g. UTF-8) from a FileInputStream, which bridge class is the standard choice? (إذا احتجت لقراءة نصوص بترميز محدد مثل UTF-8 من FileInputStream، فما هي الفئة المناسبة؟)",
                    "options": [
                              "new FileReader(file) without options",
                              "new InputStreamReader(fis, StandardCharsets.UTF_8)",
                              "new DataOutputStream(fis)",
                              "new CharArrayReader(fis.readAllBytes())"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! InputStreamReader acts as a bridge from byte streams to character streams, accepting the charset parameter (StandardCharsets.UTF_8) to correctly decode multi-byte characters. (فئة InputStreamReader هي الجسر المخصص لتحويل بايتات الملف إلى محارف بنظام ترميز محدد كـ UTF-8)."
          },
          {
                    "id": "q13",
                    "question": "What is the return value of fis.read() when reading reaches the exact end of the file? (ما هي القيمة المرجعة لدالة fis.read() عند الوصول إلى نهاية الملف تماماً؟)",
                    "options": [
                              "0",
                              "-1",
                              "255",
                              "Throws EOFException"
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! Unlike DataInputStream which throws EOFException on end of file, raw FileInputStream.read() returns -1 to signal EOF. (تُرجع الدالة -1 عند الوصول لنهاية الملف، ولا تطلق استثناء EOFException خلافاً لـ DataInputStream)."
          },
          {
                    "id": "q14",
                    "question": "When splitting a large binary file into 1MB chunks using FileInputStream and FileOutputStream, what must be done to prevent writing partial garbage on the last chunk? (عند تقسيم ملف ثنائي إلى أجزاء بحجم 1MB، كيف تمنع كتابة بايتات زائدة تالفة في الجزء الأخير؟)",
                    "options": [
                              "Fill the last chunk with zeros until it reaches exactly 1MB.",
                              "Use out.write(buffer, 0, bytesRead) using the exact count returned by fis.read(buffer, 0, bytesToRead).",
                              "Set the file system block size to 1MB.",
                              "Call Thread.sleep() between chunks."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! The write method must always specify the exact number of valid bytes read: out.write(buffer, 0, bytesRead). Otherwise, whatever leftover data remained in the buffer from previous reads will be appended. (يجب دائماً استخدام out.write(buffer, 0, bytesRead) لتحديد عدد البايتات الفعلية المقروءة فقط)."
          },
          {
                    "id": "q15",
                    "question": "Can you lock a file for exclusive reading using a FileInputStream channel? (هل يمكنك قفل ملف لمنع تعديله أثناء القراءة عبر قناة FileInputStream؟)",
                    "options": [
                              "No, FileInputStream channels cannot acquire locks.",
                              "Yes, by calling fis.getChannel().lock(0, Long.MAX_VALUE, true) to acquire a shared (read) lock.",
                              "Yes, by calling fis.lockFile(true).",
                              "Only by encrypting the file on disk first."
                    ],
                    "correctIndex": 1,
                    "explanation": "Correct! FileChannel obtained from FileInputStream allows acquiring a shared lock by passing 'true' as the third argument to channel.lock(position, size, shared). Exclusive locks (shared=false) require write access. (يمكن الحصول على قفل مشارك للقراءة shared lock عبر تمرير true إلى دالة lock في FileChannel)."
          }
]
        }
      ]
    }
  ];
})();
