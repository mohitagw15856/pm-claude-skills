---
name: retro-analysis
language: id
description: "Menganalisis data delivery sprint dan menghasilkan brief retrospektif yang terstruktur. Gunakan saat diminta menjalankan retrospektif, menganalisis data sprint, menyiapkan brief retro, atau mengubah metrik sprint menjadi pemantik diskusi. Menghasilkan brief retrospektif berbasis data dengan statistik penyelesaian, analisis pola, pemantik Start/Stop/Continue, dan satu eksperimen konkret untuk sprint berikutnya."
---

> Terjemahan bahasa Indonesia dari [retro-analysis](../../../skills/retro-analysis/SKILL.md). Versi bahasa Inggris adalah versi kanonis.

# Skill Analisis Retrospektif

Hasilkan brief retrospektif berbasis data yang memisahkan fakta dari perasaan, agar tim memakai waktu retro untuk mencari solusi, bukan memperdebatkan apa yang terjadi.

## Input yang Dibutuhkan

Tanyakan kepada pengguna jika belum diberikan:
- **Tiket sprint: direncanakan vs. selesai**
- **Tiket carry-over dan alasannya** (jika diketahui)
- **Tiket yang dibuka ulang setelah ditutup** (sinyal kualitas)
- **Insiden atau pekerjaan tak terencana** (sinyal scope creep)
- **Velocity sprint vs. rata-rata historis** (konteks tren)

## Proses
1. Hitung: tingkat penyelesaian, tingkat carry-over, persentase pekerjaan tak terencana
2. Identifikasi pola: jenis tiket apa yang paling sering carry-over? Mana yang menyebabkan hambatan?
3. Catat kegagalan proses atau komunikasi yang terlihat dari data
4. Siapkan 3 pemantik "Start / Stop / Continue" berdasarkan data: bukan generik, melainkan spesifik untuk sprint ini
5. Usulkan 1 eksperimen konkret untuk sprint berikutnya berdasarkan titik gesekan terbesar
6. **Validasi**: Pastikan setiap pemantik spesifik untuk sprint ini (bukan pemantik generik yang didaur ulang), dan eksperimen yang direkomendasikan konkret serta terukur

## Struktur Output

### Brief Retrospektif Sprint [Nomor]

**Dalam Angka:**
- Direncanakan: [n] tiket | Selesai: [n] | Carry-over: [n] | Tingkat penyelesaian: [%]
- Pekerjaan tak terencana: [n] tiket ([%] dari kapasitas)
- Velocity: [poin] vs. rata-rata [rata-rata]

**Apa yang Ditunjukkan Data:**
[2-3 observasi yang berpijak pada angka di atas]

**Pemantik Diskusi:**
- Start: [pemantik spesifik berdasarkan data sprint ini]
- Stop: [pemantik spesifik berdasarkan data sprint ini]
- Continue: [pemantik spesifik berdasarkan data sprint ini]

**Usulan Eksperimen untuk Sprint Berikutnya:**
[Satu perubahan proses yang konkret dan bisa diuji, dengan metrik keberhasilan yang spesifik]

## Materi Lanjutan

Skill ini dilengkapi file pendukung; gunakan jika tersedia:

- **[`references/root-cause-vs-symptom.md`](../../../skills/retro-analysis/references/root-cause-vs-symptom.md)**: Retro yang Mengubah Keadaan, akar masalah vs gejala. Terapkan saat menghasilkan output; file ini memuat kalibrasi dan pertimbangan yang dipadatkan dalam ringkasan metode di atas.
- **[`templates/retro-board.md`](../../../skills/retro-analysis/templates/retro-board.md)**: versi isian dari hasil akhir dengan gerbang kualitas di dalamnya. Tawarkan jika pengguna ingin mengerjakan dokumennya sendiri alih-alih dibuatkan.

## Rubrik Penilaian (0-40)

Nilai setiap output skill ini sebelum diserahkan; 32+ berarti layak dikirim.

| Dimensi | 0 | 5 | 10 |
|---|---|---|---|
| **Berpijak pada data** | Angka hilang atau salah; observasi berupa opini tanpa sumber yang bisa dilacak | Rasio inti dihitung dengan benar, tetapi observasi hanya mengulang angka tanpa analisis pola (jenis tiket, perbandingan historis) | Setiap observasi bisa dilacak ke angka yang dihitung, carry-over dirinci per jenis/penyebab, dan velocity dibandingkan dengan tren historis, bukan hanya rata-rata |
| **Tanpa menyalahkan** | Brief menyebut atau menyiratkan individu/disiplin tertentu sebagai penyebab ("QA melewatkannya") | Kata-katanya netral, tetapi kerangkanya masih mengarah ke usaha atau ketekunan, bukan kondisi sistemik | Mode kegagalan dibingkai ulang sebagai pola proses/cakupan/penjadwalan yang benar-benar didukung data; pembaca yang defensif pun tidak menemukan apa pun yang ditujukan kepadanya |
| **Kespesifikan pemantik** | Start/Stop/Continue berupa kategori generik daur ulang ("komunikasi lebih baik") | Pemantik merujuk sprint ini tetapi tetap di level kategori, tanpa angka, tanpa perilaku yang disebut | Setiap pemantik terikat erat dengan data sprint ini, menyebut satu perilaku spesifik, dan dirumuskan untuk membuka diskusi, bukan mendikte jawabannya |
| **Kualitas eksperimen** | Tidak ada eksperimen, atau inisiatif multi-kuartal yang dikemas sebagai eksperimen | Satu perubahan konkret, tetapi keberhasilannya tidak terukur atau tidak bisa dievaluasi di retro berikutnya | Satu perubahan proses yang bisa diuji dalam satu sprint, dengan metrik keberhasilan eksplisit dan biaya jika salah yang dinyatakan, dan bisa dicek di retro berikutnya |

## Pemeriksaan Kualitas

- [ ] Setiap pemantik Start/Stop/Continue menyebut perilaku spesifik, bukan kategori samar
- [ ] Eksperimen yang direkomendasikan bisa diuji dalam satu sprint
- [ ] Analisis carry-over mengidentifikasi jenis tiket atau penyebabnya, bukan hanya jumlahnya
- [ ] Observasi data tidak menyalahkan siapa pun: yang dijelaskan adalah pola
- [ ] Tren velocity disebut dalam konteks (apakah ini kejadian sekali atau sebuah pola?)

## Anti-Pola

- [ ] Jangan menyalahkan individu dalam brief retrospektif: observasi harus menjelaskan pola, bukan orang
- [ ] Jangan menghasilkan pemantik Start/Stop/Continue yang berupa kategori samar: masing-masing harus menyebut perilaku spesifik
- [ ] Jangan merekomendasikan eksperimen yang tidak bisa diselesaikan dalam satu sprint: hanya eksperimen kecil yang bisa diuji
- [ ] Jangan memperlakukan tiket carry-over sebagai masalah velocity sebelum mengidentifikasi kategori akar masalahnya
- [ ] Jangan menjalankan format retrospektif yang sama setiap sprint: variasikan formatnya untuk mencegah kejenuhan

## Contoh Frasa Pemicu

- "Jalankan retrospektif."
- "Analisis data sprint."
- "Siapkan bahan retro."
- "Ubah metrik sprint menjadi bahan diskusi."
