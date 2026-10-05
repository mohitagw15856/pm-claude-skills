---
name: meeting-notes
language: id
description: "Menyusun dan memformat notulen rapat sesuai praktik terbaik PM. Gunakan saat diminta membuat notulen rapat, merapikan catatan diskusi, mencatat action item, atau mendokumentasikan keputusan dari jenis rapat apa pun. Menghasilkan notulen terstruktur berisi keputusan, action item (penanggung jawab + tenggat), pertanyaan terbuka, dan langkah selanjutnya."
version: 1.0.0
---

> Terjemahan bahasa Indonesia dari [meeting-notes](../../../skills/meeting-notes/SKILL.md). Versi bahasa Inggris adalah versi kanonis.

# Skill Notulen Rapat

Skill ini menyusun notulen rapat agar nilainya maksimal dan tindak lanjutnya benar-benar berjalan.

## Input yang Diperlukan

Tanyakan hal berikut kepada pengguna jika belum diberikan:
- **Judul dan tanggal rapat**
- **Peserta** (nama dan peran)
- **Catatan mentah atau transkrip** (tempel catatan diskusi, transkrip, atau jelaskan apa yang dibahas)
- **Jenis rapat** (1:1 / sprint planning / product review / sinkronisasi stakeholder / lainnya): menentukan template mana yang dipakai

## Membaca dari / Menulis ke Brain

Jika ada [`professional-brain`](../../../skills/professional-brain/SKILL.md) (`brain/`), di sinilah notulen menjadi memori yang tahan lama:

- **Baca dulu:** file `stakeholders/` yang relevan (agar Anda datang sudah tahu permintaan dan
  kekhawatiran terbuka setiap peserta) dan `decisions/` apa pun yang dibahas ulang dalam rapat.
- **Tulis sesudahnya:** tambahkan setiap **keputusan** (beserta alasannya dan `reopen-when`) ke
  `decisions/`, tambahkan **permintaan/kekhawatiran** baru ke file `stakeholders/` yang tepat, dan tandai
  **asumsi** baru apa pun ke `hypotheses/`. Beri tag asal-usul pada setiap fakta yang dicatat: sebagian besar
  pernyataan dalam rapat berstatus `[verbal]` sampai dikonfirmasi secara independen. Simpan catatan mentah ke `source/`.

## Template Standar Notulen Rapat

### Header Rapat
**Rapat**: [Judul Rapat]  
**Tanggal**: [Tanggal]  
**Peserta**: [Nama/Peran]  
**Notulis**: [Nama]  
**Durasi**: [Durasi aktual]

### Agenda
- [ ] Topik 1
- [ ] Topik 2
- [ ] Topik 3

*(Centang item saat sudah dibahas)*

### Keputusan yang Diambil
Dokumentasi keputusan yang jelas:

**Keputusan**: [Apa yang diputuskan]  
**Konteks**: [Mengapa keputusan ini diambil]  
**Penanggung jawab**: [Siapa yang bertanggung jawab mengeksekusi]  
**Tenggat**: [Kapan, jika relevan]  

Gunakan format ini untuk setiap keputusan yang diambil.

### Action Item
Semua action item harus:
- [ ] **[Action item]** - @Owner - Tenggat: [Tanggal]
- [ ] **[Action item]** - @Owner - Tenggat: [Tanggal]

Format:
- Tindakan yang jelas dan spesifik
- Satu penanggung jawab (bukan "tim")
- Tenggat yang konkret
- Kotak centang untuk pelacakan

### Catatan Diskusi
Poin-poin utama yang dibahas, dikelompokkan per topik:

**Topik 1: [Nama]**
- Poin utama atau sorotan diskusi
- Konteks penting atau kekhawatiran yang diangkat
- Data atau informasi yang dibagikan

**Topik 2: [Nama]**
- Poin-poin utama diskusi
- Keputusan atau kesimpulan yang dicapai

### Pertanyaan Terbuka / Tindak Lanjut
Pertanyaan yang belum bisa dijawab:
- **Pertanyaan**: [Apa yang perlu kita ketahui]
- **Penanggung jawab**: [Siapa yang akan mencari tahu]
- **Paling lambat**: [Tenggat]

### Langkah Selanjutnya
Ringkasan jelas tentang apa yang terjadi berikutnya:
1. [Tindakan berikutnya yang segera]
2. [Rapat lanjutan jika diperlukan]
3. [Proses lebih luas yang perlu dimulai]

## Praktik Terbaik

**Selama rapat:**
- Fokus pada keputusan dan action item, bukan pada dialog
- Catat komitmen yang spesifik, bukan diskusi umum
- Catat pendapat yang berbeda pada keputusan penting
- Minta kejelasan atas komitmen yang samar ("Nanti saya cek" → "Saya akan menganalisis datanya dan membagikan temuannya paling lambat Jumat")

**Setelah rapat:**
- Kirim notulen dalam 2 jam selagi masih segar
- Tag penanggung jawab action item (@mention mereka)
- Sertakan tautan ke dokumen yang relevan
- Tindak lanjuti action item yang terlambat

**Apa yang dicatat:**
✅ Keputusan yang diambil
✅ Action item beserta penanggung jawab dan tenggatnya
✅ Poin-poin utama diskusi
✅ Pertanyaan terbuka
✅ Langkah selanjutnya

**Apa yang dilewati:**
❌ Transkrip kata per kata
❌ Obrolan yang keluar topik
❌ Diskusi pendahuluan sebelum keputusan
❌ Informasi yang berulang

## Jenis Rapat & Penyesuaiannya

### Rapat 1:1
Fokus pada:
- Diskusi pengembangan karier
- Feedback (dua arah)
- Tantangan saat ini
- Action item untuk kedua pihak

Tambahan template:
- **Pencapaian Terbaru**: Apa yang berjalan baik
- **Tantangan**: Apa yang tidak berjalan baik
- **Diskusi Karier**: Topik pengembangan diri
- **Feedback**: Untuk kedua pihak

### Sprint Planning
Fokus pada:
- Acceptance criteria story
- Keputusan sizing/estimasi
- Identifikasi dependensi
- Komitmen sprint

Tambahan template:
- **Sprint Goal**: Apa yang kita komitmenkan
- **Story Point**: Kapasitas dan estimasi
- **Dependensi**: Penghambat eksternal
- **Definition of Done**: Acceptance criteria

### Product Review
Fokus pada:
- Keputusan desain
- Feedback pengguna yang dibahas
- Perubahan yang diminta
- Penilaian kesiapan peluncuran

Tambahan template:
- **Keputusan Desain**: Apa yang disetujui/ditolak
- **Feedback Pengguna**: Insight utama yang dibahas
- **Pertanyaan Desain Terbuka**: Apa yang perlu diiterasi
- **Kriteria Peluncuran**: Persyaratan yang tersisa

### Sinkronisasi Stakeholder
Fokus pada:
- Update status yang disampaikan
- Kekhawatiran yang diangkat
- Persetujuan yang diberikan
- Kebutuhan eskalasi

Tambahan template:
- **Gambaran Status**: Progres secara umum
- **Persetujuan yang Diperoleh**: Sign-off yang diterima
- **Eskalasi**: Isu yang diangkat ke stakeholder
- **Sinkronisasi Berikutnya**: Kapan dan apa yang akan dibahas

## Contoh Notulen Rapat

```
# Review Roadmap Produk - Q1 2026
**Tanggal**: 20 Januari 2026  
**Peserta**: Sarah (CPO), Mike (Eng Lead), Jennifer (Desain), Tom (PM)  
**Notulis**: Tom  
**Durasi**: 45 menit

## Agenda
- [x] Review fitur yang direncanakan untuk Q1
- [x] Bahas keterbatasan sumber daya
- [x] Diskusi prioritas
- [x] Penyelarasan timeline

## Keputusan yang Diambil

**Keputusan**: Pindahkan dashboard multi-channel ke Q2, prioritaskan peningkatan aplikasi mobile untuk Q1  
**Konteks**: Feedback pelanggan menunjukkan pengalaman mobile sangat berdampak pada retensi (65% pengguna terutama memakai mobile). Tim engineering hanya bisa menangani satu inisiatif besar kuartal ini.  
**Penanggung jawab**: Tom (PM) mengomunikasikan ke stakeholder  
**Tenggat**: 22 Januari

**Keputusan**: Alokasikan 20% waktu engineering untuk technical debt  
**Konteks**: Technical debt yang menumpuk memperlambat pengembangan fitur. Velocity tim turun 30% kuartal lalu.  
**Penanggung jawab**: Mike (Eng Lead) membuat backlog technical debt  
**Tenggat**: 27 Januari

**Keputusan**: Jalankan beta mobile dengan 100 pengguna sebelum peluncuran penuh
**Konteks**: Perlu memvalidasi peningkatan di berbagai jenis perangkat
**Penanggung jawab**: Jennifer (Desain) berkoordinasi dengan QA
**Tenggat**: 10 Februari

## Action Item
- [ ] **Perbarui deck roadmap Q1 dengan prioritas baru** - @Tom - Tenggat: 22 Jan
- [ ] **Jadwalkan rapat penyelarasan dengan tim support soal penundaan dashboard** - @Tom - Tenggat: 24 Jan
- [ ] **Buat rubrik prioritas technical debt** - @Mike - Tenggat: 27 Jan
- [ ] **Lakukan user testing untuk desain mobile** - @Jennifer - Tenggat: 3 Feb
- [ ] **Dokumentasikan alasan keputusan untuk para eksekutif** - @Sarah - Tenggat: 23 Jan
- [ ] **Identifikasi 100 pengguna beta untuk mobile** - @Tom - Tenggat: 1 Feb

## Catatan Diskusi

**Prioritas Fitur Q1**
- Retensi pelanggan adalah prioritas #1 perusahaan kuartal ini
- Skor NPS aplikasi mobile 6,2 (vs 8,1 untuk web)
- Mobile menyumbang 65% pengguna aktif harian
- Dashboard multi-channel butuh 8 minggu kerja engineering
- Peningkatan mobile diperkirakan 6 minggu kerja engineering dengan ROI lebih tinggi
- Tim sales punya 3 deal enterprise yang menunggu fitur dashboard

**Keterbatasan Sumber Daya**
- Saat ini ada 4 engineer (turun dari 6 kuartal lalu karena attrition)
- Tim desain bisa mendukung kedua inisiatif, tetapi dengan kapasitas terbatas
- Tim QA butuh 2 minggu untuk pengujian mobile yang menyeluruh
- Satu engineer dipinjamkan ke tim security sampai Februari

**Diskusi Risiko**
- Menunda dashboard bisa berdampak pada penjualan enterprise (3 deal menunggu)
- Sarah mencatat: "Kita bisa memposisikan peningkatan mobile sebagai fondasi untuk fitur enterprise"
- Mike menyampaikan kekhawatiran soal stabilitas tech stack mobile - ditangani lewat alokasi technical debt
- Perlu komunikasi yang jelas dengan tim Sales soal perubahan timeline

**Rencana Implementasi Mobile**
- Minggu 1-2: Penyempurnaan desain berdasarkan feedback pengguna
- Minggu 3-4: Implementasi engineering
- Minggu 5: Pengujian internal
- Minggu 6: Beta dengan 100 pengguna
- Minggu 7: Rollout penuh

## Pertanyaan Terbuka
- **Pertanyaan**: Apa dampaknya pada pipeline enterprise jika dashboard ditunda?  
  **Penanggung jawab**: Sarah akan mengecek ke pimpinan Sales  
  **Paling lambat**: 23 Januari

- **Pertanyaan**: Bisakah kita menjalankan beta terbatas dashboard untuk pelanggan enterprise?  
  **Penanggung jawab**: Tom akan menjajaki cakupan MVP bersama Mike  
  **Paling lambat**: 25 Januari

- **Pertanyaan**: Apa rencana kita jika peningkatan mobile tidak mencapai target metrik?
  **Penanggung jawab**: Tom akan menyusun rencana kontingensi
  **Paling lambat**: 27 Januari

## Langkah Selanjutnya
1. Tom mengirim roadmap terbaru ke pimpinan paling lambat akhir hari Rabu (22 Jan)
2. Tim mulai sprint planning untuk peningkatan mobile Senin depan (27 Jan)
3. Rapat lanjutan pada 1 Feb untuk meninjau progres dan memvalidasi prioritas
4. Sarah mempresentasikan alasan keputusan ke tim eksekutif pada 24 Jan

---

**Rapat Berikutnya**: 1 Februari 2026 - Check-in Progres
**Notulen Dikirim**: 20 Januari 2026 17.30
```

## Materi Pendalaman

Skill ini disertai file pendukung, gunakan jika tersedia:

- **[`references/decisions-vs-discussion.md`](../../../skills/meeting-notes/references/decisions-vs-discussion.md)**: Memisahkan Keputusan dari Diskusi. Terapkan saat menyusun output; file ini memuat kalibrasi dan pertimbangan yang diringkas oleh penjelasan metode di atas.
- **[`templates/notes-skeleton.md`](../../../skills/meeting-notes/templates/notes-skeleton.md)**: versi deliverable yang tinggal diisi, dengan quality gate langsung di dalamnya. Tawarkan saat pengguna ingin mengerjakan dokumennya sendiri alih-alih dibuatkan.

## Rubrik Penilaian (0-40)

Nilai setiap output skill ini sebelum diserahkan; skor 32+ berarti layak kirim.

| Dimensi | 0 | 5 | 10 |
|---|---|---|---|
| Akuntabilitas action item | Tindakan diberikan ke "tim" atau tidak ke siapa pun, tanpa tanggal | Ada nama penanggung jawab tetapi tenggat samar ("minggu depan", "segera") atau dimiliki bersama tanpa pembagian jelas | Setiap tindakan punya tepat satu penanggung jawab bernama dan tanggal konkret; pekerjaan bersama dipecah menjadi item dengan penanggung jawab masing-masing |
| Ketertelusuran keputusan | Keputusan tenggelam dalam diskusi atau dicatat tanpa alasan sama sekali | Keputusan tercantum dengan penanggung jawab tetapi alasannya tipis; perbedaan pendapat tidak terlihat | Setiap keputusan memuat konteks, penanggung jawab, dan tenggat; perbedaan pendapat dicatat di dalam keputusan beserta kondisi peninjauan ulang, bukan dihaluskan |
| Sintesis, bukan transkrip | Mencatat kata per kata siapa bilang apa, secara berurutan | Transkrip yang dipangkas dan dikelompokkan per topik, tetapi masih berupa dialog, bukan saripati | Diskusi diringkas menjadi poin-poin yang menentukan; kutipan hanya muncul jika berbobot bagi keputusan |
| Penutupan loop | Pertanyaan terbuka, topik yang ditunda, dan eskalasi hilang begitu saja | Item terbuka tercantum tetapi tanpa penanggung jawab atau tanggal; item yang ditunda lenyap dari langkah selanjutnya | Setiap pertanyaan terbuka punya penanggung jawab dan batas waktu; item yang ditunda muncul kembali di langkah selanjutnya dengan tanggal; notulen dikirim dalam jendela 2 jam |

## Pemeriksaan Kualitas

- [ ] Setiap action item punya satu penanggung jawab bernama (bukan "tim")
- [ ] Setiap action item punya tenggat yang konkret
- [ ] Keputusan menyertakan konteks (mengapa keputusan diambil)
- [ ] Pertanyaan terbuka punya penanggung jawab dan batas waktu
- [ ] Tidak ada transkrip kata per kata, hanya sintesis

## Anti-Pola

- [ ] Jangan memberikan action item ke "tim" atau "semua orang": setiap action item harus punya tepat satu penanggung jawab bernama, kalau tidak, item itu tidak akan selesai
- [ ] Jangan mencatat isi transkrip kata per kata: notulen rapat mencatat keputusan dan komitmen, bukan seluruh alur percakapan untuk sampai ke sana
- [ ] Jangan menghilangkan konteks keputusan: keputusan tanpa alasan tidak berguna ketika enam bulan kemudian ada yang bertanya "kenapa dulu kita melakukan itu?"
- [ ] Jangan biarkan pertanyaan terbuka tanpa penanggung jawab dan tenggat: pertanyaan yang belum terjawab tanpa tindak lanjut yang ditugaskan adalah keputusan yang tertahan
- [ ] Jangan menunda pengiriman notulen lebih dari 2 jam setelah rapat: notulen yang dikirim keesokan harinya melewatkan momen ketika penanggung jawab action item bisa bertindak atas komitmen selagi masih segar

## Distribusi Notulen

**Format Subjek**: "Notulen [Jenis Rapat] - [Tanggal] - [Topik Utama]"

Contoh: "Notulen Review Roadmap Produk - 20 Jan - Prioritas Q1"

**Penerima**:
- Semua peserta
- Siapa pun yang disebut dalam action item
- Siapa pun yang meminta notulen

**Tindak Lanjut**:
- Kirim pengingat 3 hari sebelum tenggat action item
- Ringkasan mingguan semua action item yang masih terbuka
- Tandai action item yang sudah selesai dan bagikan update-nya

## Eksekusi

Untuk agen yang menggunakan tool dengan server MCP terhubung (Notion, Linear/Jira, Slack). Runtime tanpa akses tool mengabaikan bagian ini dan cukup menyerahkan dokumennya. Lihat [SKILLSPEC.md §5](../../../SKILLSPEC.md) dan [connectors/mcp-pairings.md](../../../connectors/mcp-pairings.md).

### Prasyarat
- Notulen terstruktur di atas sudah ditunjukkan kepada manusia dan **disetujui secara eksplisit**, termasuk tujuannya (database/halaman Notion mana, proyek tracker mana).
- Server MCP sudah terhubung dan terautentikasi di lingkungan agen.
- Setiap action item punya penanggung jawab bernama: item tanpa penanggung jawab diselesaikan dulu bersama manusia, jangan pernah ditugaskan berdasarkan tebakan.

### Tindakan yang Diizinkan
- Buat SATU halaman di database Notion yang disetujui (atau tool dokumen setara) berisi notulen yang disetujui, apa adanya.
- Buat satu issue tracker untuk setiap action item yang disetujui (judul, penanggung jawab, tenggat dari notulen) di proyek yang disetujui.
- Kirim tautan halaman (hanya tautan dan ringkasan satu baris) ke channel yang disetujui, jika manusia menyebutkannya.
- Tidak ada yang lain: tidak mengedit halaman/issue yang sudah ada, tidak mengundang atau memberi notifikasi kepada orang di luar channel yang disebutkan, tidak menulis ke kalender.

### Verifikasi
- Ambil halaman yang dibuat dan setiap issue yang dibuat; pastikan judul, penanggung jawab, dan tanggal sesuai dengan notulen yang disetujui.
- Laporkan semua URL yang dibuat kepada manusia dalam satu daftar.

### Rollback
- Membatalkan = mengarsipkan/menghapus halaman dan issue yang baru dibuat, hanya atas instruksi eksplisit dari manusia.
- Berhenti dan tanya manusia jika: database/proyek tujuan tidak ditemukan, pembuatan issue gagal di tengah jalan (laporkan apa yang SUDAH dibuat), atau penanggung jawab action item tidak ada di tracker.
