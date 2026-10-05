---
name: stakeholder-update
language: id
description: "Membuat update stakeholder untuk eksekutif yang ringkas dengan kerangka BLUF (Bottom Line Up Front). Gunakan saat diminta menulis update status, laporan progres, komunikasi proyek, atau briefing eksekutif untuk pimpinan atau stakeholder. Menghasilkan update yang diawali BLUF berisi status, metrik utama, risiko, milestone mendatang, dan keputusan yang dibutuhkan, bisa dibaca dalam waktu kurang dari 2 menit."
version: 1.0.0
---

> Terjemahan bahasa Indonesia dari [stakeholder-update](../../../skills/stakeholder-update/SKILL.md). Versi bahasa Inggris adalah versi kanonis.

# Skill Update Stakeholder

Skill ini membuat update status yang efektif untuk eksekutif dan stakeholder dengan prinsip BLUF (Bottom Line Up Front: kesimpulan di depan).

## Input yang Diperlukan

Tanyakan hal berikut kepada pengguna jika belum diberikan:
- **Proyek atau produk yang dilaporkan**
- **Audiens** (CEO, direksi/dewan, pimpinan lintas fungsi, investor: memengaruhi kedalaman dan format)
- **Periode** (minggu ini / sprint ini / bulan ini)
- **Status saat ini** (sesuai jalur / berisiko / terhambat)
- **Metrik utama** beserta nilai saat ini vs. target

## Membaca dari / Menulis ke Brain

Jika ada [`professional-brain`](../../../skills/professional-brain/SKILL.md) (`brain/`), gunakan sebelum bertanya:

- **Baca dulu:** file `stakeholders/` yang relevan (apa yang dipedulikan setiap orang dan permintaan mereka sebelumnya), `context.md` (gaya bahasa/nada), dan `decisions/` terbaru untuk melihat apa yang berubah sejak update terakhir.
- **Tulis sesudahnya:** tambahkan setiap permintaan, kekhawatiran, atau komitmen baru yang muncul ke file `stakeholders/` yang relevan, dengan tag asal-usul (`[verbal]` untuk sesuatu yang diucapkan dalam rapat tetapi belum didokumentasikan).

## Materi Pendalaman

- **[`references/status-honesty-guide.md`](../../../skills/stakeholder-update/references/status-honesty-guide.md)**: kalibrasi untuk penentuan 🟢/🟡/🔴 (masalah "semangka", aturan 🟡 berturut-turut, re-baseline secara jujur) dan pola kalimat fakta → dampak → tindakan → permintaan untuk kabar buruk. Terapkan setiap kali statusnya 🟡/🔴 atau catatan input terasa lebih optimis daripada metriknya.
- **[`templates/update-skeleton.md`](../../../skills/stakeholder-update/templates/update-skeleton.md)**: update satu halaman yang tinggal diisi, dengan quality gate langsung di dalamnya dan checklist sebelum kirim. Tawarkan kepada pengguna yang ingin menulis update sendiri.

## Struktur Update

### 1. BLUF (Bottom Line Up Front)
Mulai dengan informasi paling penting:
- **Status**: 🟢 Sesuai jalur / 🟡 Berisiko / 🔴 Terhambat / ✅ Selesai
- **Poin Utama**: Ringkasan satu kalimat tentang kondisi saat ini
- **Tindakan yang Dibutuhkan**: Apa yang Anda perlukan dari stakeholder (jika ada)

### 2. Ringkasan Progres
Gambaran singkat pencapaian:
- Apa yang dirilis pada periode ini
- Milestone yang tercapai
- Pergerakan metrik utama

Maksimal 3-5 poin.

### 3. Dashboard Metrik

**Metrik Utama**
| Metrik | Saat Ini | Target | Tren | Status |
|--------|---------|--------|-------|--------|
| [Nama metrik] | [Nilai] | [Target] | ↑/→/↓ | 🟢/🟡/🔴 |

Cantumkan hanya 3-5 metrik terpenting.

### 4. Risiko & Hambatan

**Isu Prioritas Tinggi:**
- **Isu**: Deskripsi singkat
- **Dampak**: Apa yang dipertaruhkan
- **Mitigasi**: Apa yang sedang Anda lakukan
- **Bantuan yang Dibutuhkan**: Apa yang bisa dilakukan stakeholder (jika relevan)

Cantumkan hanya isu yang penting di level eksekutif.

### 5. Milestone Mendatang

**30 Hari ke Depan:**
- Milestone (perkiraan tanggal)
- Milestone (perkiraan tanggal)

**90 Hari ke Depan:**
- Milestone besar (bulan)
- Milestone besar (bulan)

### 6. Keputusan yang Dibutuhkan (jika relevan)
- **Keputusan**: Deskripsi yang jelas
- **Opsi**: 2-3 opsi beserta kelebihan/kekurangannya
- **Rekomendasi**: Apa yang Anda rekomendasikan dan alasannya
- **Timeline**: Kapan keputusan dibutuhkan

## Panduan Penulisan

**Nada**: Profesional, ringkas, berorientasi tindakan
**Panjang**: Kurang dari 1 halaman (atau 2 menit waktu baca)
**Frekuensi**: Mingguan untuk proyek aktif, dua mingguan untuk tahap pemeliharaan

**Prinsip Komunikasi Eksekutif:**

1. **Awali dengan kesimpulan, bukan proses**
   - ❌ "Minggu ini kami menjalankan 5 eksperimen dan menganalisis datanya..."
   - ✅ "Conversion rate naik 15% berkat pekerjaan optimasi"

2. **Fokus pada dampak, bukan aktivitas**
   - ❌ "Melakukan 12 wawancara pelanggan"
   - ✅ "Menemukan hambatan adopsi #1 (setup yang rumit)"

3. **Tampilkan masalah sejak dini**
   - Jangan memperhalus risiko
   - Ajukan solusi, bukan hanya masalah
   - Spesifik tentang bantuan yang dibutuhkan

4. **Gunakan data untuk bercerita**
   - Kuantifikasi sebisa mungkin
   - Tunjukkan tren, bukan hanya potret sesaat
   - Hubungkan metrik dengan hasil bisnis

5. **Buat mudah dipindai**
   - Gunakan judul dan poin-poin
   - Tebalkan informasi kunci
   - Gunakan indikator visual (🟢🟡🔴, ↑→↓)

## Panduan Status

**🟢 Sesuai Jalur**: Memenuhi semua target, tidak ada risiko signifikan
**🟡 Berisiko**: Ada potensi masalah yang bisa memengaruhi delivery
**🔴 Terhambat**: Masalah kritis menghalangi progres, perlu intervensi

## Contoh Update

```
# Update Produk: Redesain Onboarding Pelanggan
**Minggu 20 Jan 2026**

## BLUF
**Status**: 🟡 Berisiko  
**Poin Utama**: Alur onboarding baru menunjukkan hasil baik dalam pengujian (+35% penyelesaian), tetapi peluncuran tertunda satu minggu karena masalah integrasi dengan sistem billing.  
**Tindakan yang Dibutuhkan**: Perlu keputusan apakah onboarding diluncurkan terpisah atau menunggu perbaikan integrasi billing.

## Ringkasan Progres
- Menyelesaikan user testing dengan 24 partisipan (94% feedback positif)
- Mengimplementasikan peningkatan pengalaman pengguna pertama kali
- Menyelesaikan 12 dari 15 bug yang ditemukan saat QA
- Engineering mengalokasikan sumber daya untuk perbaikan integrasi billing

## Metrik Utama
| Metrik | Saat Ini | Target | Tren | Status |
|--------|---------|--------|-------|--------|
| Penyelesaian Onboarding | 45% | 60% | → | 🟡 |
| Time to First Value | 4,2 menit | 3,0 menit | ↓ | 🟢 |
| Tiket Support Setup | 45/minggu | <30/minggu | ↓ | 🟢 |
| Tingkat Aktivasi Pengguna | 52% | 65% | → | 🟡 |

## Risiko & Hambatan

**TINGGI: Keterlambatan Integrasi Sistem Billing**
- **Dampak**: Pengguna tidak bisa menyelesaikan alur onboarding; peluncuran mundur 1-2 minggu
- **Akar Masalah**: API dihentikan (deprecated) oleh payment processor, kode harus ditulis ulang
- **Mitigasi**: Tim engineering merealokasi sumber daya, perkiraan perbaikan 3 Feb
- **Keputusan yang Dibutuhkan**: Luncurkan onboarding tanpa integrasi pembayaran atau tunggu perbaikan? (Lihat di bawah)

**SEDANG: Cakupan Pengujian Mobile**
- **Dampak**: Beberapa edge case di perangkat Android lama belum diuji
- **Mitigasi**: Bekerja sama dengan QA untuk memperluas matriks pengujian; menjalankan beta dengan pengguna internal di berbagai perangkat

## Milestone Mendatang

**30 Hari ke Depan:**
- Menyelesaikan integrasi billing (3 Feb)
- Meluncurkan redesain onboarding (5 Feb atau 12 Feb tergantung keputusan)
- Mulai mengukur dampak pada konversi (12 Feb)

**90 Hari ke Depan:**
- Iterasi berdasarkan data produksi (Maret)
- Perluas ke aplikasi mobile (April)
- Luncurkan fitur lanjutan (Mei)

## Keputusan yang Dibutuhkan

**Apakah onboarding perlu diluncurkan terpisah dari integrasi billing?**

**Opsi A: Luncurkan Sekarang (Direkomendasikan)**
- Kelebihan: Peningkatan tingkat penyelesaian 35% langsung dirasakan pengguna, mengumpulkan data produksi, menjaga momentum
- Kekurangan: Pengguna harus menyelesaikan pembayaran di alur lama, pengalaman sedikit terputus
- Timeline: Peluncuran 5 Feb

**Opsi B: Tunggu Perbaikan Billing**
- Kelebihan: Pengalaman terintegrasi penuh sejak hari pertama, tanpa technical debt
- Kekurangan: Manfaat tertunda 2 minggu, target metrik Q1 berisiko, momentum tim hilang
- Timeline: Peluncuran 12 Feb

**Rekomendasi**: Opsi A. Peningkatan onboarding bernilai dengan sendirinya, dan alur pembayaran lama masih berfungsi baik. Menunggu berisiko membuat target Q1 terlewat dan menunda peningkatan yang sudah tervalidasi sampai ke pengguna.

**Timeline**: Keputusan dibutuhkan paling lambat 22 Jan untuk peluncuran 5 Feb.

---

**Ada pertanyaan?** Balas email ini atau hubungi saya di Slack.
```

## Panduan Frekuensi

**Daily standup**: 
- Sangat singkat (3 poin)
- Apa yang dirilis kemarin
- Apa yang dirilis hari ini
- Hambatan

**Update mingguan**:
- Gunakan template lengkap di atas
- Fokus pada progres dan risiko
- Maksimal 1 halaman

**Review bulanan**:
- Analisis metrik yang lebih dalam
- Refleksi strategis
- Progres tujuan kuartalan
- Format lebih panjang (2-3 halaman) masih bisa diterima

**Quarterly business review**:
- Analisis menyeluruh
- Tren dari waktu ke waktu
- Rekomendasi strategis
- Format presentasi

## Penyesuaian Berdasarkan Audiens

### Untuk C-Suite
- Awali dengan dampak bisnis
- Hubungkan dengan OKR perusahaan
- Fokus pada strategi dan hasil
- Minimalkan detail teknis

### Untuk Pimpinan Produk/Engineering
- Sertakan konteks teknis
- Tunjukkan progres sprint/milestone
- Bahas implikasi arsitektur
- Singgung technical debt

### Untuk Tim Lintas Fungsi
- Seimbangkan konteks teknis dan bisnis
- Soroti dependensi
- Sebutkan kebutuhan kolaborasi
- Buat permintaan secara eksplisit

### Untuk Direksi/Investor
- Fokus pada metrik dan traksi
- Posisi kompetitif
- Peluang pasar
- Implikasi finansial

## Rubrik Penilaian (0-40)

Nilai setiap output skill ini sebelum diserahkan; skor 32+ berarti layak kirim.

| Dimensi | 0 | 5 | 10 |
|---|---|---|---|
| **BLUF & kejujuran status** | Status tersembunyi atau tidak ada; update terbaca seperti buku harian aktivitas | Status dan poin utama ada di depan, tetapi emoji-nya mempercantik metrik (hijau di luar, merah di dalam) | Tiga baris pertama memuat status, poin utama satu kalimat, dan permintaan; penentuan 🟢/🟡/🔴 sesuai dengan metrik material terburuk dan menjelaskan alasannya |
| **Konteks metrik** | Angka mentah tanpa target, tren, atau perbandingan periode | Target ada, tetapi metriknya berupa hitungan aktivitas yang tidak terhubung dengan hasil bisnis | 3-5 metrik, masing-masing dengan target, tren, dan status, dan metrik yang penting dikaitkan dengan uang, pelanggan, atau tujuan yang dipertaruhkan |
| **Risiko yang bisa ditindaklanjuti** | Risiko dicantumkan sebagai kekhawatiran tanpa penanggung jawab, mitigasi, atau dampak | Mitigasi disebutkan, tetapi dampaknya tidak dikuantifikasi dan tidak jelas apakah pembaca perlu melakukan sesuatu | Setiap risiko punya dampak yang dikuantifikasi, mitigasi dengan tanggal atau kondisi keberhasilan, dan "bantuan yang dibutuhkan" yang eksplisit (atau "tidak ada") |
| **Pembingkaian keputusan** | Pertanyaan terbuka dilemparkan ke eksekutif, atau tidak ada keputusan yang diangkat sama sekali | Opsi dicantumkan, tetapi tanpa biaya/trade-off atau rekomendasi | Setiap keputusan punya 2-3 opsi lengkap dengan biayanya, rekomendasi yang jelas beserta alasannya, dan tanggal keputusan dibutuhkan, termasuk apa yang membuat tanggal itu mendesak |

## Pemeriksaan Kualitas

- [ ] Update diawali BLUF: status, poin utama, dan tindakan yang dibutuhkan sebelum detail apa pun
- [ ] Setiap metrik punya perbandingan dengan target (bukan sekadar angka mentah)
- [ ] Setiap risiko punya mitigasi dan penanda "bantuan yang dibutuhkan" jika perlu tindakan stakeholder
- [ ] Keputusan yang dibutuhkan punya opsi spesifik dan rekomendasi yang jelas
- [ ] Panjang total kurang dari 1 halaman / 2 menit waktu baca

## Anti-Pola

- [ ] Jangan menaruh penilaian status di bagian bawah: BLUF berarti informasi terpenting datang lebih dulu
- [ ] Jangan melaporkan metrik tanpa target atau perbandingan dengan periode sebelumnya: angka mentah tanpa konteks tidak berguna
- [ ] Jangan mencantumkan risiko tanpa tindakan mitigasi dan penanda jelas soal bantuan yang dibutuhkan dari stakeholder
- [ ] Jangan menulis keputusan yang dibutuhkan sebagai pertanyaan tanpa rekomendasi yang jelas: eksekutif butuh opsi, bukan pertanyaan terbuka
- [ ] Jangan biarkan update melebihi satu halaman: jika butuh lebih, pesannya yang perlu disunting, bukan diperpanjang

## Eksekusi

Untuk agen yang menggunakan tool dan bisa menjangkau channel komunikasi tim (Slack, email). Mengirim update bersifat **keluar (outward-facing)**: tidak pernah otomatis. Runtime tanpa akses tool mengabaikan bagian ini. Lihat [SKILLSPEC.md §5](../../../SKILLSPEC.md).

### Prasyarat
- Teks update final sudah ditunjukkan kepada manusia **apa adanya** dan disetujui secara eksplisit, termasuk channel/daftar penerima yang persis.
- Channel atau daftar penerima disebutkan oleh pengguna, bukan disimpulkan dari riwayat.
- Jika statusnya 🔴 atau memuat Keputusan yang Dibutuhkan, pastikan pengambil keputusan yang disebutkan termasuk di antara penerima.

### Tindakan yang Diizinkan
- Kirim teks yang disetujui, tanpa diubah, ke satu channel yang disetujui, atau kirim sebagai satu email ke penerima yang disetujui dengan subjek yang disetujui.
- Simpan salinan ke lokasi yang disebutkan pengguna (dokumen, Brain, file repo).
- Tidak ada yang lain: tidak menjadwalkan pengiriman berulang (lihat `schedule-recipe` untuk itu, dengan gate-nya sendiri), tidak ada @-mention yang tidak ada di teks yang disetujui, tidak ada cross-posting.

### Verifikasi
- Pastikan pesan ada di channel/thread (ambil permalink-nya) dan laporkan tautannya kembali.
- Pastikan teks yang dikirim identik byte demi byte dengan teks yang disetujui.

### Rollback
- Jika platform memungkinkan, penghapusan pesan yang baru dikirim diizinkan **hanya** atas instruksi eksplisit dari manusia; jika tidak, kirim balasan koreksi.
- Berhenti dan tanya manusia jika: channel tidak ditemukan, pengiriman gagal sebagian, atau teks yang disetujui tidak lagi sama dengan yang akan dikirim.

## Contoh Frasa Pemicu

- "Tuliskan update status."
- "Tuliskan laporan progres untuk pimpinan."
- "Tuliskan update proyek untuk pemangku kepentingan."
- "Tuliskan ringkasan untuk eksekutif."
