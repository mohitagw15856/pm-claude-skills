---
name: loan-decoder
language: id
description: "Uraikan penawaran pinjaman pribadi, kendaraan, atau KPR menjadi biaya sebenarnya dan di mana letak jebakannya. Gunakan ketika seseorang bertanya 'apakah pinjaman ini menguntungkan', 'tolong uraikan penawaran pinjaman saya', 'sebenarnya saya menandatangani apa', atau 'berapa sebenarnya biaya KPR ini'. Menghasilkan angka total biaya pinjaman, rekonsiliasi APR dengan suku bunga yang diiklankan, tanda bahaya yang diurutkan (denda pelunasan dipercepat, biaya tidak wajar, risiko penyesuaian suku bunga), dan tiga pertanyaan yang paling mengubah kesepakatan."
---

> Terjemahan bahasa Indonesia dari [loan-decoder](../../../skills/loan-decoder/SKILL.md). Versi bahasa Inggris adalah versi kanonis.

# Skill Loan Decoder

Dokumen pinjaman disusun di sekitar angka yang ingin mereka tunjukkan (cicilan bulanan) dan beberapa
angka yang lebih suka tidak Anda lihat. Skill ini menghitung berapa total yang benar-benar akan Anda bayar,
lalu mengurutkan semua hal dalam penawaran yang diam-diam bisa menggeser angka itu merugikan Anda.

## Apa yang Dihasilkan Skill Ini

- Angka total biaya pinjaman: semua yang dibayar sepanjang masa pinjaman, plus total bunga + biaya
- APR dibandingkan suku bunga yang diiklankan, direkonsiliasi: dari mana selisihnya berasal
- Tanda bahaya yang diurutkan: denda pelunasan dipercepat, biaya tidak wajar, risiko penyesuaian suku bunga mengambang, produk tambahan
- Tiga pertanyaan yang paling mengubah kesepakatan khusus ini, plus apa yang bisa dinegosiasikan

## Input yang Diperlukan

Tanyakan hal berikut hanya jika belum diberikan:

- **Teks dokumen penawaran**: estimasi pinjaman, term sheet, atau kontrak. Jika dokumennya tidak lengkap, uraikan yang ada dan daftar angka yang masih dibutuhkan (APR, rincian biaya, ketentuan denda).
- **Data dasar pinjaman jika tidak ada di teks**: jumlah, suku bunga, jangka waktu, tetap atau mengambang.
- **Rencana mereka**: berapa lama mereka akan memegang pinjaman/aset, dan apakah mungkin melunasi lebih awal.

## Kerangka: Skala Keparahan

- 🔴 **Bisa merugikan Anda secara finansial**: denda pelunasan dipercepat (kutip rumusnya, hitung contohnya), bunga yang dihitung di muka / Rule of 78s, produk tambahan wajib yang dimasukkan ke pokok pinjaman (asuransi kredit, garansi, GAP), pembayaran balon, risiko suku bunga mengambang tanpa batas atas, markup suku bunga.
- 🟡 **Tidak lazim, tawar balik**: biaya tidak wajar (biaya dokumen/proses/administrasi di luar biaya pihak ketiga yang sebenarnya), arbitrase wajib, jaminan silang (cross-collateralization), penumpukan denda keterlambatan.
- 🟢 **Standar**: struktur biaya provisi yang biasa, biaya pihak ketiga yang sebenarnya (appraisal, pencatatan); beri label agar pembaca bisa tenang.

Selalu tunjukkan hitungannya:
1. **Total biaya pinjaman** = semua pembayaran + semua biaya yang diambil pemberi pinjaman; tunjukkan cicilan bulanan × jumlah bulan + biaya, dan subtotal bunganya.
2. **APR vs. suku bunga yang diiklankan**: jelaskan selisihnya sebagai biaya yang dinyatakan dalam bentuk suku bunga; jika APR tidak dicantumkan, tandai, jangan diperkirakan diam-diam.
3. **Pembingkaian penyesuaian suku bunga mengambang**: indeks + margin, batas atas, dan cicilan pada batas atas. Bingkai sebagai paparan risiko ("cicilan bisa naik dari X menjadi Y"), bukan prediksi.
4. **Hitungan keluar lebih awal**: biaya melunasi dalam jangka waktu yang disebutkan pengguna, termasuk dendanya.

## Format Output

### Loan Decode: [jenis pinjaman, jumlah]

**1. Putusan**: ambil / negosiasikan ketentuan ini dulu / cari di tempat lain, dengan angka total biaya di depan.

**2. Angka sebenarnya**: total biaya, total bunga, total biaya-biaya, APR vs. suku bunga yang diiklankan dengan penjelasan selisihnya; cicilan terburuk setelah penyesuaian jika suku bunganya mengambang.

**3. Tabel penguraian**

| Ketentuan / biaya | Apa kata dokumen | Apa artinya bagi Anda | Keparahan |
|---|---|---|---|

**4. 🚩 Tanda bahaya, diurutkan**: kutipan kalimatnya, kerugiannya dalam uang pada skenario yang realistis, dan perbaikan yang perlu diminta.

**5. Tiga pertanyaan yang paling mengubah kesepakatan**: khusus untuk penawaran ini (misalnya "Berapa suku bunganya tanpa produk tambahan?", "Apakah ada denda pelunasan dipercepat, secara tertulis?", "Biaya mana yang milik Anda dan mana yang biaya pihak ketiga?").

**6. Yang bisa dinegosiasikan**: suku bunga, biaya, produk tambahan, penghapusan denda, dan tuas mana yang paling menggerakkan total biaya.

Akhiri artefak dengan kalimat ini, kata per kata: *"Ini adalah pembacaan dalam bahasa sehari-hari, bukan nasihat hukum/keuangan; hukum berbeda-beda menurut yurisdiksi, jadi pastikan setiap hal penting dengan profesional yang berkualifikasi."*

## Pemeriksaan Kualitas

- [ ] Total biaya pinjaman dihitung dengan aritmetika yang terlihat, bukan sekadar dinyatakan
- [ ] APR vs. suku bunga yang diiklankan direkonsiliasi atau secara eksplisit ditandai tidak ada
- [ ] Risiko suku bunga mengambang ditunjukkan sebagai jumlah cicilan konkret pada batas atas
- [ ] Setiap tanda bahaya mengutip dokumen dan menghitung kerugiannya dalam uang
- [ ] Angka yang hilang dicantumkan sebagai `[to confirm]`, tidak pernah diperkirakan diam-diam
- [ ] Kalimat penafian muncul kata per kata di dalam artefak

## Anti-Pola

- [ ] Jangan mengarang ketentuan, suku bunga, atau biaya yang tidak ada di dokumen
- [ ] Jangan melunakkan tanda bahaya demi terlihat seimbang; denda pelunasan dipercepat adalah biaya, sebutkan namanya
- [ ] Jangan menyajikan aturan pinjaman yang bergantung pada yurisdiksi sebagai hal universal
- [ ] Jangan membandingkan dengan "suku bunga pasar pada umumnya" sebagai fakta; bingkai perbandingan sebagai rentang yang perlu diverifikasi
- [ ] Jangan biarkan cicilan bulanan menentukan putusan; total biaya adalah judul utamanya

## Dasar

Praktik peninjauan pinjaman dari sisi peminjam: hitungan total biaya, rekonsiliasi APR, audit biaya, pembingkaian skenario penyesuaian suku bunga.
