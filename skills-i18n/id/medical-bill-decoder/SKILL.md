---
name: medical-bill-decoder
language: id
description: "Uraikan tagihan medis terperinci atau EOB ke dalam bahasa sehari-hari dan temukan biaya yang layak disanggah. Gunakan ketika seseorang bertanya 'kenapa tagihan medis saya mahal sekali', 'tolong uraikan tagihan rumah sakit saya', 'EOB ini maksudnya apa', atau 'bisakah tagihan ini ditawar'. Menghasilkan penguraian per baris, tanda duplikasi dan unbundling, tanda bahaya balance billing, serta naskah siap baca untuk meminta tagihan terperinci, bantuan keuangan, dan panggilan negosiasi."
---

> Terjemahan bahasa Indonesia dari [medical-bill-decoder](../../../skills/medical-bill-decoder/SKILL.md). Versi bahasa Inggris adalah versi kanonis.

# Skill Medical Bill Decoder

Tagihan medis ditulis dalam kode, secara harfiah, dan kesalahannya cukup sering sehingga membaca
tagihan Anda dengan teliti bisa menghemat uang sungguhan. Skill ini menerjemahkan setiap baris, menandai
biaya yang tampak keliru, dan memberikan kata-kata persis yang perlu diucapkan di telepon.

## Apa yang Dihasilkan Skill Ini

- Penguraian biaya per baris ke dalam bahasa sehari-hari
- Tanda bahaya yang diurutkan: duplikasi, unbundling, balance billing, biaya yang tidak masuk akal
- Tiga naskah: meminta tagihan terperinci, menanyakan bantuan keuangan, menegosiasikan sisa tagihan
- Daftar tindakan berprioritas: apa yang disanggah lebih dulu dan kepada siapa

## Input yang Diperlukan

Tanyakan hal berikut hanya jika belum diberikan:

- **Teks tagihan dan/atau EOB**: ditempel atau ditranskripsi. Jika hanya berupa tagihan ringkasan, katakan demikian dan mulai dengan naskah permintaan tagihan terperinci; uraikan yang terlihat.
- **Status asuransi**: berasuransi (di dalam/di luar jaringan, jika diketahui), tidak berasuransi, atau tidak yakin.
- **Konteks**: untuk apa kunjungannya, dan apakah fasilitasnya dipilih dalam keadaan darurat.

## Kerangka: Skala Keparahan

Nilai setiap temuan:

- 🔴 **Bisa merugikan Anda secara finansial**: biaya duplikat, unbundling (satu prosedur ditagih sebagai beberapa kode komponen), balance billing untuk layanan di luar jaringan di fasilitas dalam jaringan atau dalam keadaan darurat, biaya untuk layanan yang tidak pernah diberikan, ketidakcocokan tagihan vs. EOB, ditagih lebih dari "tanggungan pasien" di EOB.
- 🟡 **Tidak lazim, tawar balik**: baris yang kabur ("perlengkapan", "biaya fasilitas") dengan angka besar, tanda upcoding tingkat layanan (kode kunjungan tingkat tertinggi untuk kunjungan sederhana), biaya yang jauh di atas kewajaran.
- 🟢 **Standar**: copay, penerapan deductible, dan baris tagihan yang tampak normal; katakan demikian.

Uraikan kode dengan pembingkaian, bukan tabel pencarian: jelaskan arti *jenis* kode CPT/HCPCS atau kode pendapatan berdasarkan konteksnya di tagihan, dan tandai kode yang tidak bisa Anda tafsirkan dengan yakin sebagai `[to confirm - ask billing what this covers]`. Jangan pernah mengarang standar harga per kode. Selalu bandingkan tagihan dengan EOB jika keduanya ada; selisih di antara keduanya adalah tempat uangnya berada.

## Format Output

### Medical Bill Decode: [penyedia layanan / tanggal layanan]

**1. Putusan**: total tagihan, apa yang tampak sah, apa yang bisa disanggah, dan angka target yang realistis.

**2. Penguraian per baris**

| Baris / kode | Tampaknya untuk apa | Jumlah | Penilaian | Keparahan |
|---|---|---|---|---|

**3. 🚩 Tanda bahaya, diurutkan**: masing-masing dengan kutipan baris spesifiknya, mengapa dicurigai, dan kepada siapa harus diajukan (bagian penagihan, perusahaan asuransi, atau keduanya).

**4. Naskah Anda**: tiga naskah singkat kata per kata: (a) meminta tagihan terperinci lengkap dengan kodenya, (b) menanyakan bantuan keuangan / charity care dan diskon pembayaran cepat, (c) panggilan negosiasi: buka dengan sanggahan, lalu minta pengurangan dan rencana cicilan; minta semuanya secara tertulis.

**5. Urutan tindakan**: langkah berikutnya bernomor, dengan tenggat waktunya (jangan sampai diserahkan ke penagih utang selama masa sanggahan; sarankan untuk meminta penangguhan).

Akhiri artefak dengan kalimat ini, kata per kata: *"Ini adalah pembacaan dalam bahasa sehari-hari, bukan nasihat hukum/keuangan; hukum berbeda-beda menurut yurisdiksi, jadi pastikan setiap hal penting dengan profesional yang berkualifikasi."*

## Pemeriksaan Kualitas

- [ ] Setiap biaya yang ditandai menunjuk ke baris spesifik di tagihan, dikutip atau diberi nomor
- [ ] Tagihan dan EOB dicocokkan jika keduanya diberikan; ketidakcocokan menjadi tanda teratas
- [ ] Kode yang tidak bisa ditafsirkan ditandai `[to confirm]`, tidak pernah ditebak menjadi diagnosis
- [ ] Ketiga naskah bisa dipakai kata per kata, bukan ringkasan tentang apa yang harus dikatakan
- [ ] Tanda balance billing mencatat bahwa perlindungannya bergantung pada yurisdiksi dan jenis polis
- [ ] Kalimat penafian muncul kata per kata di dalam artefak

## Anti-Pola

- [ ] Jangan mengarang biaya, kode, atau harga yang tidak ada di dokumen
- [ ] Jangan melunakkan tanda bahaya demi terlihat seimbang; kemungkinan duplikat ya kemungkinan duplikat
- [ ] Jangan menyajikan perlindungan penagihan yang bergantung pada yurisdiksi sebagai hal universal
- [ ] Jangan mendiagnosis atau meragukan perawatan medisnya; uraikan penagihannya saja
- [ ] Jangan menjanjikan hasil ("mereka pasti akan menghapus ini"); bingkai naskah sebagai permintaan dengan peluang yang baik

## Dasar

Praktik advokasi penagihan pasien: audit tagihan terperinci, rekonsiliasi EOB, penyusunan naskah negosiasi.

## Contoh Frasa Pemicu

- "Kenapa tagihan medis saya setinggi ini?"
- "Jelaskan tagihan rumah sakit saya."
- "Apa isi EOB ini?"
- "Bisakah saya menegosiasikan tagihan ini?"
