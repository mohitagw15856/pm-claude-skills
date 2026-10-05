---
name: email-triage
language: id
description: "Lakukan triase kotak masuk Gmail sampai tersisa hanya yang benar-benar butuh Anda. Gunakan saat diminta men-triase email, membersihkan kotak masuk, mencari email yang perlu dibalas, atau meringkas email terbaru. Menghasilkan daftar prioritas item yang perlu ditindaklanjuti (balasan, keputusan, tindak lanjut) untuk rentang waktu yang bisa diatur (default 8 jam terakhir), sambil menyaring struk, notifikasi, dan newsletter."
---

> Terjemahan bahasa Indonesia dari [email-triage](../../../skills/email-triage/SKILL.md). Versi bahasa Inggris adalah versi kanonis.

# Triase Email

## Masalahnya

Kebanyakan dari kita menghabiskan banyak waktu memilah email yang sebenarnya bisa dipilah otomatis. Menggulir kotak masuk yang campur aduk berisi newsletter, konfirmasi pesanan, notifikasi Jira, dan permintaan sungguhan dari manusia adalah beban bagi fokus. Dari 40 email sejak makan siang, mungkin hanya 4 yang benar-benar butuh Anda; skill ini menemukan 4 email itu.

## Prasyarat

| Persyaratan | Detail |
|-------------|---------|
| Konektor Gmail | Harus aktif di pengaturan Claude (Settings → Connectors → Gmail) |
| Akun Gmail | Akun yang ingin di-triase |

Jika konektor Gmail belum terhubung, Claude akan meminta Anda menghubungkannya sebelum melanjutkan.

## Input yang Dibutuhkan

| Input | Wajib | Default | Catatan |
|-------|----------|---------|-------|
| Rentang waktu | Tidak | 8 jam terakhir | Menerima: "8 jam terakhir", "24 jam terakhir", "hari ini", "sejak Senin", "3 hari terakhir" |
| Pengirim yang selalu ditampilkan | Tidak | Tidak ada | Nama atau alamat email tertentu yang selalu dimunculkan, apa pun isinya |
| Pengirim yang selalu diabaikan | Tidak | Tidak ada | Domain atau alamat yang selalu disembunyikan (mis. noreply@*, jira@company.com) |
| Area fokus | Tidak | Tidak ada | Konteks opsional: "fokus ke apa pun dari klien" atau "tandai apa pun soal peluncuran" |

## Yang Disaring

Claude menyembunyikan kategori berikut. Jumlahnya dihitung dalam ringkasan, tetapi isinya tidak ditampilkan:

- Konfirmasi pesanan dan notifikasi pengiriman
- Email pemasaran dan promosi (termasuk email penawaran "sekali saja")
- Langganan newsletter dan email digest
- Notifikasi sistem otomatis (peringatan monitoring, CI/CD, laporan build)
- Undangan kalender yang sudah diterima atau ditolak
- Tanda terima baca dan konfirmasi pengiriman
- Notifikasi media sosial (LinkedIn, Twitter/X, dll.)
- Update tiket internal, kecuali tiket itu ditugaskan kepada Anda dan butuh tindakan
- Rekening koran dan laporan keuangan (hanya jumlahnya yang ditampilkan, bukan isinya)

## Yang Dimunculkan

Claude hanya memunculkan email yang memenuhi satu atau lebih kriteria berikut:

- Ada orang yang menunggu balasan
- Ada keputusan yang diminta
- Ada tenggat atau permintaan yang sensitif waktu, eksplisit maupun tersirat
- Pengirimnya orang yang biasanya tidak mengirim email kepada Anda (sinyal prioritas potensial)
- Email berasal dari pengirim dalam daftar selalu-ditampilkan Anda

## Format Output

```
## Triase Kotak Masuk - [Rentang waktu] | [Tanggal], [Waktu]
**Total email dipindai:** X | **Perlu tindakan:** Y | **Disaring:** Z

---

### 🔴 Prioritas Tinggi - Perlu balasan atau keputusan hari ini

**Dari:** [Nama] <email@domain.com>
**Subjek:** [Baris subjek]
**Diterima:** [Waktu, mis. 14.14]
**Yang mereka butuhkan:** [Satu kalimat: permintaan sebenarnya, bukan ringkasan email]
**Pembuka balasan:** "[Draf pembuka yang bisa dilanjutkan, maksimal 1 kalimat]"

---

**Dari:** [Nama] <email@domain.com>
**Subjek:** [Baris subjek]
**Diterima:** [Waktu]
**Yang mereka butuhkan:** [Satu kalimat]
**Pembuka balasan:** "[Draf pembuka]"

---

### 🟡 Prioritas Sedang - Balas dalam 24-48 jam

**Dari:** [Nama] <email@domain.com>
**Subjek:** [Baris subjek]
**Diterima:** [Waktu]
**Yang mereka butuhkan:** [Satu kalimat]
**Pembuka balasan:** "[Draf pembuka]" *(atau "Tidak perlu dibalas, cukup tindakan: [apa yang harus dilakukan]")*

---

### 🟢 FYI - Perlu diketahui, tidak perlu tindakan

- **[Nama]** perihal: [Subjek] - [Ringkasan satu baris mengapa ini mungkin relevan]
- **[Nama]** perihal: [Subjek] - [Ringkasan satu baris]

---

### ⚪ Disaring - [Z email]
Struk: X | Newsletter: X | Notifikasi: X | Otomatis lainnya: X
*(Tidak perlu tindakan, tidak ditampilkan secara rinci)*
```

## Instruksi untuk Claude

### Langkah 1: Hubungkan dan konfirmasi rentang waktu

Pastikan konektor Gmail aktif. Uraikan rentang waktu yang diminta dan terjemahkan ke rentang tanggal-waktu yang tepat (mis. "8 jam terakhir" = [waktu sekarang dikurangi 8 jam] sampai sekarang). Cantumkan rentang tersebut di bagian atas output.

### Langkah 2: Baca kotak masuk

Ambil email dari kotak masuk untuk rentang waktu yang ditentukan. Sertakan: nama pengirim, email pengirim, subjek, waktu diterima, dan isi email (atau 500 kata pertama jika panjang). Jangan mengambil email yang lebih lama dari rentang tersebut.

### Langkah 3: Terapkan aturan pengabaian

Jika pengguna menentukan pengirim atau domain yang selalu diabaikan, langsung sembunyikan. Jika tidak ada daftar pengabaian, terapkan penyaringan standar (lihat Yang Disaring). Catat jumlahnya untuk ringkasan penyaringan.

### Langkah 4: Klasifikasikan setiap email yang tersisa

Untuk setiap email yang tidak disaring, klasifikasikan ke salah satu dari empat kategori:

- **Prioritas Tinggi**: Ada orang yang menunggu balasan hari ini, atau ada tenggat eksplisit dalam 24 jam
- **Prioritas Sedang**: Perlu dibalas tetapi tidak mendesak, atau ada permintaan tersirat tanpa tenggat pasti
- **FYI**: Tidak perlu tindakan, tetapi pengguna kemungkinan ingin mengetahuinya
- **Disaring**: Termasuk kategori yang disembunyikan; tambahkan ke hitungan, jangan ditampilkan

Terapkan daftar selalu-ditampilkan setelah klasifikasi: email apa pun dari pengirim yang ditandai tetap muncul apa pun kategorinya, dengan klasifikasi sebenarnya.

### Langkah 5: Tulis baris "Yang mereka butuhkan"

Ini bagian paling bernilai dari output. Tulis tepat satu kalimat yang menangkap permintaan sebenarnya: bukan ringkasan email, melainkan permintaannya.

Buruk: "Sarah mengirim email tentang laporan Q3."
Baik: "Sarah butuh persetujuan Anda atas laporan Q3 sebelum ia mengirimkannya ke dewan direksi pukul 17.00."

Jika tidak ada permintaan yang jelas, kemungkinan itu FYI atau perlu disaring.

### Langkah 6: Tulis pembuka balasan

Untuk email Prioritas Tinggi dan Sedang, tulis pembuka balasan satu kalimat. Pembuka tersebut harus:
- Menyesuaikan nada pengirim (formal atau santai)
- Menanggapi permintaannya secara langsung
- Bisa langsung dikirim pengguna dengan sedikit suntingan

Contoh: "Terima kasih sudah mengabari, saya cek dulu dengan tim dan kabari Anda paling lambat akhir hari ini."

Jika email membutuhkan tindakan, bukan balasan (mis. "tolong setujui pengeluaran ini"), tulis: "Tidak perlu dibalas, cukup tindakan: [jelaskan tindakannya]."

### Langkah 7: Susun dan sampaikan output

Gunakan format output persis seperti yang ditentukan. Jangan menambah bagian, memberi opini, atau menjelaskan alasan Anda. Output harus bisa dipindai dalam waktu kurang dari 60 detik.

### Langkah 8: Tawarkan langkah selanjutnya

Setelah output triase, tawarkan salah satu dari:
- "Mau saya buatkan draf balasan untuk salah satunya?"
- "Ketik 'balas ke [nama]' dan saya akan menyusun drafnya."

Cukup satu baris. Jangan diperpanjang.

## Pemeriksaan Kualitas

- [ ] Rentang waktu diterapkan dengan benar: tidak ada email di luar rentang yang ikut masuk
- [ ] Konektor Gmail dipastikan aktif sebelum membaca
- [ ] Setiap email Prioritas Tinggi punya kalimat "Yang mereka butuhkan" yang spesifik dan konkret, bukan ringkasan samar
- [ ] Pembuka balasan sesuai dengan nada email aslinya (formal/informal)
- [ ] Jumlah yang disaring akurat dan dirinci per kategori
- [ ] Bagian FYI hanya berisi email yang tidak perlu tindakan: tidak ada yang perlu ditindaklanjuti terselip di sini
- [ ] Pengirim yang selalu ditampilkan muncul apa pun kategorinya
- [ ] Pengirim/domain yang selalu diabaikan benar-benar disembunyikan
- [ ] Output mudah dipindai: tanpa prosa yang tidak perlu, tanpa basa-basi
- [ ] Laporan keuangan dan konten sensitif dihitung tetapi tidak ditampilkan lengkap

## Anti-Pola

- [ ] Jangan memunculkan email FYI di bagian Prioritas Tinggi atau Sedang: mencampur item yang perlu tindakan dengan yang sekadar informasi menggagalkan tujuan triase
- [ ] Jangan menulis ringkasan "Yang mereka butuhkan" yang samar ("Sarah mengirim email tentang laporan"): setiap ringkasan harus menyatakan permintaan sebenarnya, bukan deskripsi email
- [ ] Jangan memakai nada yang sama untuk setiap pembuka balasan: email formal dari klien butuh pembuka yang berbeda dari email santai ala Slack dari rekan kerja
- [ ] Jangan menyertakan email di luar rentang waktu yang diminta: akurasi rentang waktu adalah sinyal kepercayaan utama skill ini
- [ ] Jangan menghilangkan jumlah email yang disaring: pengguna perlu tahu berapa banyak yang dipindai, bukan hanya yang dimunculkan, agar yakin triasenya lengkap

## Penggunaan Dispatch / Seluler

Skill ini bisa dipakai dari aplikasi seluler Claude (Dispatch). Di ponsel, output tampil rapi dengan penanda prioritas emoji sebagai jangkar visual untuk pemindaian cepat. Pemicu seluler yang direkomendasikan: "Cek email saya" atau "/email-triage".

## Contoh Frasa Pemicu

- `/email-triage`
- "Cek email saya"
- "Email mana yang perlu saya perhatikan?"
- "Triase kotak masuk saya untuk 8 jam terakhir"
- "Apa saja yang masuk sejak tadi pagi?"
- "Ada email mendesak yang harus saya urus?"
- "Triase kotak masuk saya, abaikan semua dari Jira dan domain marketing"
- "Cek email 24 jam terakhir, tandai apa pun dari [nama klien]"
- "Apa saja yang perlu saya balas hari ini?"
