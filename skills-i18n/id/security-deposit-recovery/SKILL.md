---
name: security-deposit-recovery
language: id
description: "Dapatkan kembali uang jaminan sewa (deposit) Anda: dokumentasi saat pindah keluar yang memenangkan sengketa sebelum dimulai, sanggahan atas potongan yang dirinci, tangga surat tuntutan, dan titik keputusan gugatan sederhana (small claims). Gunakan ketika ditanya bagaimana cara mendapatkan kembali deposit saya, pemilik rumah menahan deposit saya, sanggah potongan deposit ini, atau tuliskan surat tuntutan deposit. Menghasilkan protokol bukti saat pindah keluar, sanggahan per potongan dengan garis batas keausan wajar yang jelas, tangga eskalasi beserta suratnya, dan lembar persiapan gugatan sederhana."
---

> Terjemahan bahasa Indonesia dari [security-deposit-recovery](../../../skills/security-deposit-recovery/SKILL.md). Versi bahasa Inggris adalah versi kanonis.

# Skill Security Deposit Recovery

Sengketa deposit dimenangkan saat pindah keluar, berminggu-minggu sebelum pemilik memutuskan apa pun: penyewa yang punya foto bertanda waktu dari setiap dinding, inspeksi bersama yang sudah selesai, dan alamat penerusan secara tertulis akan mendapatkan uangnya; penyewa yang hanya mengandalkan ingatan terpaksa bernegosiasi. Skill ini menjalankan kedua fase: protokol bukti selagi masih punya akses, dan tangga sanggahan-dan-eskalasi ketika daftar potongan datang, dengan berpijak pada pembedaan yang menentukan hampir setiap sengketa: keausan wajar (biaya usaha pemilik, di sebagian besar yurisdiksi tidak boleh dipotong) versus kerusakan (tanggungan Anda).

## Apa yang Dihasilkan Skill Ini

- **Protokol pindah keluar**: penyisiran foto/video, permintaan inspeksi bersama, berkas kuitansi pembersihan, surat alamat penerusan
- **Sanggahan potongan**: setiap potongan yang diklaim dipilah menjadi keausan, kerusakan, atau tidak berdasar, beserta tanggapannya
- **Tangga eskalasi**: permintaan rincian, surat tuntutan, dan hitungan tenggat (ditandai bergantung pada yurisdiksi)
- **Lembar persiapan gugatan sederhana**: kapan jumlahnya layak diperjuangkan, apa yang perlu dibawa, dan bagaimana sidang semacam ini sebenarnya berjalan

## Input yang Diperlukan

Tanyakan hal berikut jika belum diberikan:
- **Fasenya**: masih tinggal di unit (jalankan protokol, kasus bernilai paling tinggi), sudah pindah dan menunggu deposit, atau sudah memegang daftar potongan yang dirinci (kasus sanggahan)
- **Dokumen sejauh ini**: klausul sewa tentang deposit, laporan inspeksi saat masuk jika ada (ketiadaannya pun berguna), foto saat masuk dan saat keluar, semua komunikasi
- **Angka-angkanya**: jumlah deposit, potongan yang diklaim, waktu yang telah berlalu sejak pindah keluar (tenggat pengembalian berbeda menurut yurisdiksi dan sering singkat; jam yang terus berjalan bisa jadi argumen terbaik penyewa)
- **Bentuk pemiliknya**: pemilik perorangan vs. perusahaan pengelola properti; nada tangganya sama, tetapi perusahaan merespons proses sedangkan pemilik perorangan merespons hal-hal spesifik

## Kerangka: Aturan Keausan vs. Kerusakan

1. **Garis batasnya, ditarik secara konkret:** cat yang memudar, goresan kecil, jalur karpet yang aus, lubang paku kecil = keausan (waktu yang menyebabkannya, umumnya tidak boleh dipotong). Noda, bekas terbakar, lubang, perlengkapan yang rusak, cat yang tidak disetujui = kerusakan (suatu kejadian yang menyebabkannya). Nat keramik yang kusam adalah keausan; ubin yang retak adalah kerusakan. Setiap potongan dipilah berdasarkan garis ini, dengan tanda "berbeda menurut yurisdiksi" pada kasus-kasus di perbatasan.
2. **Penyusutan juga berlaku untuk kerusakan:** pemilik yang menagih penggantian penuh untuk karpet berusia 8 tahun yang rusak karena noda sedang menagih biaya peningkatan kualitas; prorata umur pakai adalah tanggapan standarnya, dan surat sanggahan menyampaikannya dengan hitungan.
3. **Bukti mengalahkan kata sifat:** penyisiran saat pindah keluar dilakukan secara sistematis: setiap ruangan, setiap dinding, bagian dalam peralatan, meteran, bertanda waktu, dicadangkan di luar ponsel. Foto pasangan saat masuk (atau laporan inspeksi masuk dari pemilik yang tidak ada, padahal diwajibkan) membingkai setiap argumen berikutnya.
4. **Prosedur adalah senjata bermata dua:** tenggat untuk mengembalikan atau merinci, kewajiban kuitansi, aturan alamat penerusan; semuanya berbeda menurut yurisdiksi, sering menguntungkan penyewa, kadang disertai ganti rugi berlipat untuk penahanan beritikad buruk. Surat-surat mengutip *kategori* aturan ini dengan tanda "verifikasi secara lokal"; tenggat yang terlewat dikutip dengan jumlah hari yang telah berlalu.
5. **Tangga naik sesuai jadwal, bukan sesuai amarah:** (a) permintaan tertulis atas rincian dan kuitansi, (b) surat sanggahan: per potongan, bukti terlampir, jumlah yang dituntut, tenggat diberikan, langkah berikutnya disebutkan, (c) surat tuntutan resmi yang terbaca seperti berkas gugatan sederhana yang akan menyusulnya, (d) gugatan sederhana: dirancang tepat untuk jumlah sebesar ini, tidak perlu pengacara, dan lembar persiapannya sebagian besar adalah berkas bukti yang sudah disusun.

## Format Output

# Deposit Recovery: [jumlah], fase: [protokol / menunggu / menyanggah]

## [Fase 1] Protokol Pindah Keluar
[Daftar periksa penyisiran per ruangan · kalimat permintaan inspeksi bersama · kuitansi yang perlu disimpan · surat alamat penerusan, bertanggal]

## Sanggahan Potongan
| Potongan yang diklaim | Jumlah | Keausan / kerusakan / tidak berdasar | Tanggapan (dengan hitungan penyusutan jika berlaku) |
|---|---|---|---|

## Tangga Eskalasi
[Setiap anak tangga dengan suratnya yang dirancang kata per kata, tenggatnya, dan kutipan waktu yang telah berlalu jika jamnya sudah habis · kategori ganti rugi berlipat ditandai verifikasi secara lokal]

## Persiapan Gugatan Sederhana (jika sampai ke sana)
[Hitungan ekonominya (biaya pendaftaran vs. jumlah) · urutan map bukti · bagaimana sidang berjalan · pola damai di menit terakhir di depan pengadilan yang perlu diantisipasi]

> Tenggat deposit, aturan potongan, dan ketentuan sanksi berbeda menurut yurisdiksi; verifikasi ketentuan lokal sebelum mengutip angka pasti; surat-surat di sini mengutip kategori aturan justru karena alasan itu. Bukan nasihat hukum.

## Pemeriksaan Kualitas

- [ ] Setiap potongan dipilah menjadi keausan/kerusakan/tidak berdasar dengan alasannya, tidak digabung-gabungkan
- [ ] Hitungan penyusutan muncul di setiap tempat penggantian penuh ditagihkan untuk barang yang sudah tua
- [ ] Surat-surat makin tegas secara bertahap, tetapi tetap layak dibaca di pengadilan sepanjang waktu
- [ ] Aturan yang bergantung pada yurisdiksi muncul sebagai kategori yang ditandai, tidak pernah sebagai angka yang dipastikan
- [ ] Bagian gugatan sederhana mencakup hitungan ekonomi yang jujur, bukan hanya cara-caranya

## Anti-Pola

- [ ] Jangan mengalah pada pos keausan wajar demi terlihat masuk akal; garis itulah inti seluruh sengketa
- [ ] Jangan menulis dengan marah; setiap surat adalah Bukti A, biarkan fakta yang membawa panasnya
- [ ] Jangan mengutip pasal atau jumlah hari tertentu sebagai fakta; gunakan kategori dengan tanda verifikasi secara lokal
- [ ] Jangan lewatkan anak tangga permintaan rincian; banyak penahanan deposit runtuh begitu kuitansi diminta pertama kali
- [ ] Jangan biarkan amarah yang sudah terlanjur menentukan keputusan gugatan sederhana; baris pertama lembar persiapan adalah hitungannya

## Contoh Frasa Pemicu

- "Bagaimana cara mendapatkan kembali uang deposit saya?"
- "Pemilik rumah menahan deposit saya."
- "Bantah potongan deposit ini."
- "Tuliskan surat tuntutan pengembalian deposit."
