---
name: okr-builder
language: id
description: "Susun OKR (Objectives and Key Results) yang terstruktur dengan baik untuk tim produk, startup, dan individu. Gunakan saat diminta menulis OKR, menetapkan target kuartalan, mendefinisikan key result, atau meninjau OKR yang sudah ada. Menghasilkan set OKR lengkap dengan objective, key result yang terukur, baseline, dan panduan penilaian."
---

> Terjemahan bahasa Indonesia dari [okr-builder](../../../skills/okr-builder/SKILL.md). Versi bahasa Inggris adalah versi kanonis.

# Skill Penyusun OKR

Tulis OKR yang ambisius dan terukur, yang menghubungkan pekerjaan produk dengan strategi perusahaan. Hindari vanity metric, key result yang berfokus pada output, dan objective yang terdengar seperti daftar tugas.

## Membaca dari / Menulis ke Brain

Jika ada [`professional-brain`](../../../skills/professional-brain/SKILL.md) (`brain/`), berpijaklah padanya alih-alih menanyakan ulang hal yang sudah Anda ketahui:

- **Baca dulu:** `context.md` (definisi metrik), `knowledge/strategy.md` (arah produk), dan `hypotheses/` yang masih terbuka. Jalankan `python3 ../professional-brain/scripts/brain_query.py ./brain "<objective theme>"` dan bawa tag provenans setiap fakta: jangan menetapkan key result dari sebuah `[hunch]` seolah-olah itu `[data]`.
- **📥 Usulkan ke Brain:** setelah selesai, usulkan untuk mencatat objective + target KR yang dipilih sebagai catatan `decisions/` (taruhan untuk periode ini) dan definisi metrik baru ke `knowledge/`, masing-masing dengan tag provenans. Tunjukkan dulu, minta persetujuan, lalu tulis dengan `../professional-brain/scripts/brain_write.py … --commit` (hanya menambah, dry-run secara default).

## Bekerja dari brief

Anda sering akan menerima brief singkat tanpa detail lengkap (tanpa baseline, tanpa angka pasti). **Selalu berikan set OKR yang lengkap dan spesifik** tanpa berhenti untuk bertanya, dan jangan meninggalkan placeholder dalam kurung seperti `[target]`. Jika baseline atau angka tidak ada, perkirakan nilai yang realistis dari brief dan domainnya, lalu tandai *(asumsi, mohon konfirmasi)*. Baseline asumsi yang diberi label jelas (mis. "aktivasi 40% *(asumsi)* → 60%") selalu lebih baik daripada kolom kosong atau angka karangan yang disajikan sebagai fakta.

## Materi Lanjutan

- **[`references/bad-okr-gallery.md`](../../../skills/okr-builder/references/bad-okr-gallery.md)**: enam contoh OKR buruk yang realistis beserta diagnosis dan penulisan ulangnya (roadmap terselubung, objective yang tidak bisa difalsifikasi, sandbagging, KR di luar kendali, kebun binatang metrik, tanpa guardrail), diakhiri diagnostik 5 pertanyaan. Gunakan saat *meninjau* OKR yang sudah ada: cocokkan dengan galeri sebelum menulis masukan.
- **[`templates/okr-worksheet.md`](../../../skills/okr-builder/templates/okr-worksheet.md)**: lembar kerja isian yang kolom-kolomnya menegakkan gerbang kualitas (sumber baseline, uji drift, uji kendali, guardrail) plus rubrik penilaian akhir kuartal yang ditetapkan di awal. Tawarkan jika tim ingin menyusun OKR sendiri.

## Dasar-Dasar OKR

**Objective:** Kualitatif, menginspirasi, dan terikat waktu. Menjawab "ke mana kita akan pergi?"
**Key Result:** Kuantitatif, spesifik, dan terukur. Menjawab "bagaimana kita tahu kita sudah sampai?"

### Uji untuk KR yang Baik
- Bisakah dinilai 0,0-1,0 di akhir periode?
- Apakah mengukur hasil (outcome), bukan output? ("Pendapatan dari pelanggan baru naik 30%", bukan "Meluncurkan 3 fitur")
- Apakah ambisius tetapi bisa dicapai? (Targetkan pencapaian 70% sebagai standar emas)
- Apakah berada dalam kendali tim?

## Anti-Pola OKR Umum yang Perlu Ditandai dan Diperbaiki

| Anti-Pola | Contoh | Versi yang Lebih Baik |
|---|---|---|
| Tugas yang menyamar sebagai KR | "Meluncurkan desain ulang onboarding" | "Tingkat aktivasi pengguna baru naik dari 42% ke 65%" |
| Vanity metric | "Mendapatkan 10.000 unduhan aplikasi" | "Retensi 30 hari pengguna baru mencapai 40%" |
| KR biner | "Merilis API v2" | "API v2 diadopsi oleh 80% integrasi aktif" |
| Terlalu banyak KR | 6+ per objective | Maksimal 3-4 KR per objective |
| Tanpa baseline | "Meningkatkan NPS" | "NPS naik dari 32 ke 50" |

Selalu tandai anti-pola dan tawarkan versi tulis ulang.

## Format Output

### OKR [Kuartal] - [Tim/Area Produk]

---

**Objective 1: [Pernyataan kualitatif yang menginspirasi]**

*Mengapa ini penting:* [Konteks strategis 1-2 kalimat]

| # | Key Result | Baseline | Target | Metode Pengukuran |
|---|---|---|---|---|
| KR1 | [Hasil yang terukur] | [Kondisi saat ini] | [Target] | [Cara mengukur] |
| KR2 | [Hasil yang terukur] | [Kondisi saat ini] | [Target] | [Cara mengukur] |
| KR3 | [Hasil yang terukur] | [Kondisi saat ini] | [Target] | [Cara mengukur] |

*Penanggung jawab:* [Nama/Peran]
*Frekuensi check-in:* Mingguan

---

Ulangi untuk setiap objective. Rekomendasikan 2-4 objective per tim per kuartal.

## Panduan Penilaian yang Perlu Disertakan

Di akhir kuartal, nilai setiap KR:
- 0,7-1,0 = Sangat baik (0,7 adalah "titik ideal": jika semua KR bernilai 1,0, berarti targetnya kurang ambisius)
- 0,4-0,6 = Ada kemajuan tetapi meleset
- 0,0-0,3 = Meleset, perlu dibahas dalam retrospektif

## Input (perkirakan yang tidak diberikan, beri label asumsi)

- **Tim atau individu** pemilik OKR
- **Kuartal dan tahun**
- **North Star metric perusahaan atau produk** (OKR harus terhubung ke sini; jika tidak diberikan, perkirakan yang masuk akal dan beri label *(asumsi)*)
- **3 prioritas atau tujuan utama kuartal ini** (catatan kasar tidak masalah)
- **OKR yang sudah ada untuk ditinjau atau diperbaiki** (opsional)

## Pedoman

- Hubungkan OKR ke North Star perusahaan/produk; jika tidak diberikan, perkirakan yang masuk akal dan beri label *(asumsi)* alih-alih bertanya
- Rekomendasikan tidak lebih dari 3 objective per tim per kuartal
- Jika pengguna memberikan tujuan berbasis output, selalu bingkai ulang menjadi outcome
- Sertakan bagian "health check" yang menandai KR mana yang belum punya data baseline saat ini
- Ingatkan pengguna: OKR bukan penilaian kinerja; OKR harus cukup ambisius sehingga meleset pun tidak masalah

## Rubrik Penilaian (0-40)

Nilai setiap output skill ini sebelum diserahkan; 32+ berarti layak dikirim.

| Dimensi | 0 | 5 | 10 |
|---|---|---|---|
| Orientasi outcome | KR berupa daftar tugas fitur yang dirilis ("luncurkan X", "selesaikan Y") | Sebagian besar outcome, tetapi satu atau lebih KR berupa output atau biner rilis/tidak rilis | Setiap KR adalah metrik outcome yang bisa dinilai 0,0-1,0 berdasarkan tingkat pencapaian |
| Baseline & keterukuran | Tanpa baseline atau metode pengukuran; KR tidak bisa dinilai di akhir kuartal | Target ada tetapi beberapa baseline hilang atau tanpa sumber, tanpa tanda health check | Setiap KR punya baseline, target, dan metode pengukuran; data yang hilang ditandai di health check dengan rencana instrumentasi |
| Kalibrasi ambisi | Target hanya garis tren kuartal lalu (sandbagging) atau khayalan tanpa jalur | Ada sedikit stretch, tetapi tidak ada yang bisa menjelaskan seperti apa skor 0,7 | Dikalibrasi sehingga pencapaian 0,7 adalah kuartal yang baik sesuai harapan; usulan sandbagging dan moonshot ditunjukkan dan dikoreksi |
| Fokus strategis & kendali | Tidak terhubung ke North Star; 5+ objective atau kebun binatang KR; KR bergantung pada pekerjaan tim lain | Terhubung longgar ke strategi tetapi objective terlalu sarat atau satu KR gagal uji kendali | ≤3 objective dengan ≤4 KR masing-masing, setiap objective terhubung jelas ke North Star, dan setiap KR berada dalam kendali tim |

## Pemeriksaan Kualitas

- [ ] Setiap KR terukur dengan baseline dan target
- [ ] Tidak ada KR berbasis output (tidak ada "luncurkan X" atau "selesaikan Y")
- [ ] Maksimal 4 KR per objective
- [ ] OKR terhubung ke North Star perusahaan atau produk
- [ ] Cukup ambisius sehingga pencapaian 0,7 adalah skor yang diharapkan

## Anti-Pola

- [ ] Jangan menerima key result berbasis output: KR apa pun yang berbunyi "luncurkan X" atau "selesaikan Y" harus ditulis ulang menjadi outcome dengan baseline dan target
- [ ] Jangan menulis OKR tanpa menanyakan North Star perusahaan atau produk: OKR yang terlepas dari konteks strategis hanyalah latihan menetapkan target
- [ ] Jangan menulis lebih dari 4 KR per objective: terlalu banyak KR mengencerkan fokus dan membuat penilaian akhir kuartal ambigu
- [ ] Jangan memakai KR biner (rilis/tidak rilis): setiap KR harus bisa dinilai pada skala 0,0-1,0 berdasarkan tingkat pencapaian
- [ ] Jangan melewatkan bagian health check untuk baseline: OKR tanpa baseline saat ini tidak bisa dinilai secara objektif di akhir kuartal

## Contoh Frasa Pemicu

- "Tuliskan OKR."
- "Tetapkan target kuartalan."
- "Tentukan key result."
- "Tinjau OKR yang ada."
