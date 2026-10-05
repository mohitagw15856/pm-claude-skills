---
name: prd-template
language: id
description: "Membuat Product Requirements Document (PRD) dengan struktur template PM yang sudah terbukti. Gunakan saat diminta menulis PRD, spesifikasi produk, spesifikasi fitur, atau dokumen kebutuhan untuk fitur atau produk baru. Menghasilkan PRD lengkap berisi problem statement, user story, kebutuhan fungsional, pertimbangan teknis, dan metrik keberhasilan."
version: 1.0.0
---

> Terjemahan bahasa Indonesia dari [prd-template](../../../skills/prd-template/SKILL.md). Versi bahasa Inggris adalah versi kanonis.

# Skill Template PRD

Skill ini membantu membuat Product Requirements Document yang profesional sesuai praktik terbaik industri.

## Posisi skill ini: bagian tengah alur utama

Urutan kedua dalam alur keputusan produk: **`/assumption-mapper` → `prd-template` →
`/rice-prioritisation` → `/roadmap-narrative`**. Skill ini menerima **asumsi paling berisiko**
dari `/assumption-mapper` (jika skill itu sudah dijalankan, baca peta asumsinya alih-alih menebak ulang risikonya)
dan menyerahkan ke `/rice-prioritisation` **metrik keberhasilan PRD**: satu angka dengan baseline
yang menjadi *Impact* dalam RICE. Istilah bersama (problem statement, hipotesis, metrik
keberhasilan, provenance) didefinisikan sekali di
[`docs/craft/product-decisions.md`](../../../docs/craft/product-decisions.md); gunakan istilah itu
persis seperti didefinisikan.

## Siklus kerja

PRD ditulis dari luar ke dalam (masalah sebelum solusi, selalu) dalam empat fase. Fase 1
adalah fondasinya: PRD yang dibangun di atas masalah yang kabur akan rapi dari atas sampai bawah tetapi tetap
salah.

1. **Kunci problem statement.** Satu kalimat: siapa punya masalah apa, kapan, dan berapa
   biayanya jika dibiarkan. Tanpa bahasa solusi. Semua bagian di bawah harus bermuara ke sini.
   **Selesai jika:** problem statement bisa berdiri sendiri tanpa menyebut fitur apa pun, dan
   orang luar bisa memahami apa arti "terselesaikan".
2. **Tetapkan baseline metrik keberhasilan.** Satu angka yang membuktikan masalahnya terselesaikan,
   lengkap dengan *baseline saat ini* dan pergerakan yang dianggap berhasil. Bawa risiko apa pun dari
   `/assumption-mapper` di hulu ke sini sebagai Pertanyaan Terbuka, bukan taruhan diam-diam.
   **Selesai jika:** metrik punya baseline (atau ditandai secara eksplisit belum punya baseline),
   dan metrik itu mengukur masalahnya, bukan aktivitas.
3. **Susun setiap bagian, masing-masing tertelusur ke atas.** Isi template (di bawah) sehingga setiap
   kebutuhan dan story tertelusur ke problem statement; buang apa pun yang tidak.
   Beri tag asal-usul pada fakta: angka hasil tebakan adalah [hunch], dan harus diberi label.
   **Selesai jika:** setiap kebutuhan tertelusur ke problem statement, dan setiap fakta yang diklaim
   memuat [data]/[hunch]/[assumption].
4. **Serahkan.** Tampilkan metrik keberhasilan dan inisiatifnya agar
   `/rice-prioritisation` bisa menilai Impact dari metrik *ini*, bukan metrik yang dibuat ulang.
   **Selesai jika:** PRD menyebutkan metrik dan cakupan yang dibutuhkan `/rice-prioritisation`
   untuk menilainya tanpa perlu bertanya lagi.

## Input yang Diperlukan

Tanyakan hal berikut kepada pengguna jika belum diberikan:
- **Nama fitur atau produk**
- **Masalah yang diselesaikan** (dari sudut pandang pengguna)
- **Target pengguna** (peran, konteks, apa yang ingin mereka capai)
- **Metrik keberhasilan** (bagaimana Anda tahu ini berhasil?)
- **Cakupan** (MVP vs visi penuh: apa yang masuk dan tidak masuk cakupan)
- **Stakeholder utama** (siapa yang perlu mereview dan menyetujui)

## Membaca dari / Menulis ke Brain

Jika ada [`professional-brain`](../../../skills/professional-brain/SKILL.md) (`brain/`), gunakan alih-alih menanyakan konteks yang sudah Anda miliki:

- **Baca dulu:** `context.md` (produk, definisi metrik, gaya bahasa), `knowledge/strategy.md`
  (arah produk), `hypotheses/` yang terkait, dan file fitur `entities/` yang sesuai.
  Jalankan `python3 ../professional-brain/scripts/brain_query.py ./brain "<feature>"` untuk menarik
  fakta yang berdasar, lalu bawa tag asal-usulnya ke dalam PRD (jangan sajikan `[hunch]` sebagai
  kebutuhan yang sudah pasti).
- **Tulis sesudahnya:** simpan fitur sebagai/ke dalam `entities/<feature>.md`, catat setiap keputusan cakupan ke
  `decisions/`, dan tambahkan asumsi baru ke `hypotheses/`. Beri tag asal-usul pada masing-masing.

## Materi Pendalaman

Skill ini disertai dua file pendukung, gunakan jika tersedia:

- **[`templates/prd-skeleton.md`](../../../skills/prd-template/templates/prd-skeleton.md)**: kerangka PRD yang tinggal diisi, dengan petunjuk "seperti apa yang baik" di setiap bagian. Mulai dari sini saat pengguna ingin dokumen yang mereka lengkapi sendiri alih-alih draf yang dibuatkan.
- **[`references/success-metrics-guide.md`](../../../skills/prd-template/references/success-metrics-guide.md)**: kalibrasi untuk bagian Metrik Keberhasilan: uji metrik empat bagian, set standar adopsi/hasil/bisnis/guardrail, dan jebakan yang umum. Rujuk setiap kali menulis atau mereview tabel metrik.

## Struktur Template

Setiap PRD harus memuat bagian-bagian berikut secara berurutan:

### 1. Ikhtisar
- **Problem Statement**: Masalah apa yang kita selesaikan? (2-3 kalimat)
- **Solusi yang Diusulkan**: Gambaran umum apa yang kita bangun (2-3 kalimat)
- **Metrik Keberhasilan**: Cara kita mengukur keberhasilan (3-5 metrik utama)

### 2. Konteks & Latar Belakang
- **Mengapa Sekarang**: Mengapa ini waktu yang tepat?
- **Keselarasan Strategis**: Bagaimana ini selaras dengan tujuan perusahaan?
- **Ringkasan Riset Pengguna**: Insight utama dari riset (jika ada)

### 3. User Story & Use Case
Format: "Sebagai [jenis pengguna], saya ingin [tindakan] agar [manfaat]"
- Sertakan 3-7 user story utama
- Tambahkan acceptance criteria untuk masing-masing

### 4. Kebutuhan
**Kebutuhan Fungsional:**
- Fitur wajib (P0)
- Fitur yang sebaiknya ada (P1)
- Fitur tambahan yang bagus jika ada (P2)

**Kebutuhan Non-Fungsional:**
- Ekspektasi performa
- Pertimbangan keamanan
- Kebutuhan aksesibilitas

### 5. Desain & Pengalaman Pengguna
- Tautan ke mockup desain atau wireframe
- User flow utama
- Edge case dan kondisi error

### 6. Pertimbangan Teknis
- Implikasi arsitektur
- Dependensi pada sistem lain
- Risiko teknis dan mitigasinya

### 7. Rencana Implementasi
- **Fase 1 (MVP)**: Apa yang masuk ke versi pertama
- **Fase 2**: Apa yang menyusul
- **Fase 3**: Peningkatan di masa depan

### 8. Pertanyaan Terbuka
- Keputusan yang masih perlu diambil
- Stakeholder yang perlu dikonsultasikan
- Riset yang dibutuhkan

### 9. Lampiran
- Tautan riset
- Dokumen terkait
- Analisis kompetitor

## Panduan Penulisan

**Nada**: Jelas, ringkas, bisa ditindaklanjuti
**Audiens**: Engineer, desainer, stakeholder
**Panjang**: Targetkan 3-6 halaman untuk fitur, 8-12 halaman untuk produk

**Praktik Terbaik:**
- Gunakan contoh konkret alih-alih abstraksi
- Sertakan "mengapa", bukan hanya "apa"
- Buat kebutuhan yang bisa diuji
- Tautkan ke materi pendukung
- Perbarui seiring keputusan diambil

## Ciri PRD yang Baik

✅ **Lakukan:**
- Tulis dari sudut pandang pengguna
- Sertakan metrik keberhasilan yang spesifik
- Tangani edge case
- Tautkan ke riset dan data
- Buat trade-off menjadi eksplisit

❌ **Jangan:**
- Menulis detail implementasi (itu ranah tech spec)
- Menganggap semua orang sudah punya konteks
- Membiarkan kebutuhan ambigu
- Melewatkan "mengapa"
- Melupakan aksesibilitas

## Rubrik Penilaian (0-40)

Nilai setiap output skill ini sebelum diserahkan; skor 32+ berarti layak kirim.

| Dimensi | 0 | 5 | 10 |
|---|---|---|---|
| **Landasan masalah** | Masalah dinyatakan dari sudut pandang perusahaan, atau diklaim tanpa bukti | Masalah dibingkai dari sisi pengguna, tetapi data pendukungnya samar ("pengguna frustrasi") dan riset tidak dikutip | Masalahnya milik pengguna, dikuantifikasi dengan data kondisi saat ini, dan Mengapa Sekarang menjelaskan apa yang berubah; klaim tertelusur ke riset yang dikutip |
| **Kebutuhan yang bisa diuji** | Kebutuhan berupa kualitas samar ("cepat", "intuitif") yang tidak bisa diverifikasi reviewer | Sebagian besar kebutuhan konkret, tetapi acceptance criteria tipis dan kebutuhan non-fungsional hanya boilerplate | Setiap item P0/P1/P2 dan NFR bisa diverifikasi (ambang batas, persentil, standar), dan masing-masing tertelusur ke user story atau temuan riset |
| **Ketelitian metrik** | Metrik keberhasilan tidak ada, atau berupa persentase tanpa baseline | Baseline dan target ada, tetapi metrik hanya mengukur adopsi: tidak ada yang bisa mendeteksi fitur berhasil sementara bisnis merugi | Setiap metrik punya baseline → target, set metrik mencakup hasil sekaligus adopsi, dan minimal satu guardrail mencegah menang di metrik sambil merugikan pengguna |
| **Kejujuran cakupan & risiko** | MVP dan fase mendatang bercampur; tidak ada pertanyaan terbuka yang dicantumkan | Fase dipisahkan, tetapi alasan batas pemotongannya tidak ada dan perbedaan pendapat dihaluskan | Setiap batas fase punya alasan yang dinyatakan, permintaan di luar cakupan dicatat beserta syarat untuk masuk kembali, dan pertanyaan terbuka punya penanggung jawab, tenggat, dan biaya dari setiap jawaban |

## Pemeriksaan Kualitas

- [ ] Problem statement ditulis dari sudut pandang pengguna (bukan perusahaan)
- [ ] Metrik keberhasilan spesifik dan terukur
- [ ] User story menyertakan acceptance criteria
- [ ] Kebutuhan bisa diuji (tidak samar)
- [ ] Pertanyaan terbuka dicantumkan secara eksplisit
- [ ] Rencana implementasi membedakan MVP dari fase mendatang

## Anti-Pola

- [ ] Jangan menulis kebutuhan dari sudut pandang perusahaan: setiap kebutuhan harus bisa ditelusuri kembali ke kebutuhan pengguna
- [ ] Jangan memasukkan kebutuhan samar seperti "sistem harus cepat": setiap kebutuhan harus bisa diuji
- [ ] Jangan mencampuradukkan MVP dengan fase mendatang: tegaskan apa yang masuk dan tidak masuk cakupan rilis pertama
- [ ] Jangan biarkan metrik keberhasilan berupa persentase tanpa baseline: sebutkan kondisi saat ini dan targetnya
- [ ] Jangan melewatkan pertanyaan terbuka: asumsi yang belum terselesaikan adalah risiko; mengangkatnya adalah tugas PM

## Contoh Pembuka PRD

```
# PRD: Dashboard Customer Support Multi-Channel

## Ikhtisar

**Problem Statement**: Tim support saat ini menangani pertanyaan pelanggan dari email, chat, dan media sosial menggunakan tiga tool terpisah, sehingga respons tertunda, pekerjaan terduplikasi, dan pengalaman pelanggan tidak konsisten. Rata-rata, agen support membuang 2,3 jam per hari untuk berpindah antar-tool dan melacak riwayat percakapan secara manual.

**Solusi yang Diusulkan**: Membangun dashboard terpadu yang menggabungkan pertanyaan pelanggan dari semua channel ke dalam satu antarmuka, menyimpan riwayat percakapan lintas channel, dan menyediakan routing cerdas berdasarkan keahlian dan ketersediaan agen.

**Metrik Keberhasilan**:
- Menurunkan rata-rata waktu respons dari 4 jam menjadi 1 jam
- Mengurangi waktu berpindah antar-tool sebesar 80% (dari 2,3 menjadi <0,5 jam)
- Meningkatkan skor kepuasan pelanggan dari 3,8 menjadi 4,5 (dari 5)
- Meningkatkan produktivitas agen support sebesar 35%

## Konteks & Latar Belakang

**Mengapa Sekarang**: Kepuasan pelanggan turun 15% dalam 6 bulan terakhir, terutama karena waktu respons yang lambat. Kompetitor utama kita meluncurkan dashboard support terpadu kuartal lalu, dan hal ini sering disebut dalam sales call. Turnover tim support mencapai 45% per tahun, dengan "kerumitan tool" disebut sebagai salah satu sumber frustrasi utama.

**Keselarasan Strategis**: Ini selaras dengan tujuan perusahaan Q1 untuk "Meningkatkan retensi pelanggan sebesar 10%" dan OKR tim support untuk "Menurunkan average handle time sebesar 25%."

**Ringkasan Riset Pengguna**: Kami mewawancarai 12 agen support dan mengamati 20 jam sesi support. Temuan utama:
- Agen menghabiskan 35% waktunya untuk mencari konteks dari interaksi sebelumnya
- 65% eskalasi terjadi karena tidak adanya riwayat percakapan
- Agen menilai berpindah antar-tool sebagai frustrasi harian #1 mereka (tingkat kesulitan 9,2/10)
- NPS saat ini untuk pengalaman support adalah -12

## User Story & Use Case

**US1: Inbox Terpadu**
Sebagai agen support, saya ingin melihat semua pertanyaan pelanggan di satu tempat agar tidak melewatkan permintaan mendesak dan bisa memprioritaskan dengan efektif.

Acceptance Criteria:
- Inbox menampilkan pertanyaan dari email, chat, dan media sosial
- Pertanyaan diurutkan berdasarkan prioritas (mendesak, tinggi, normal, rendah)
- Agen bisa memfilter berdasarkan channel, pelanggan, atau status
- Pembaruan real-time saat pertanyaan baru masuk

**US2: Konteks Lintas Channel**
Sebagai agen support, saya ingin melihat riwayat percakapan lengkap apa pun channel-nya agar bisa memberikan respons yang konsisten dan berbasis informasi tanpa meminta pelanggan mengulang cerita mereka.

Acceptance Criteria:
- Tampilan timeline menunjukkan semua interaksi secara kronologis
- Setiap interaksi menampilkan channel, waktu, dan isi
- Profil pelanggan menampilkan data demografis dan informasi akun
- Masalah dan penyelesaian sebelumnya bisa diakses

[Lanjutkan hingga total 5-7 user story...]
```
