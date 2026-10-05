---
name: insurance-policy-decoder
language: id
description: "Uraikan polis asuransi rumah, penyewa, atau kendaraan menjadi apa yang benar-benar ditanggung, apa yang dikecualikan, dan seperti apa hitungan pembayaran klaimnya sebelum Anda membutuhkannya. Gunakan ketika seseorang bertanya 'sebenarnya asuransi saya menanggung apa', 'tolong uraikan polis saya', 'apakah risiko sendiri (deductible) ini wajar', atau 'nilai tunai aktual vs biaya penggantian'. Menghasilkan penguraian pertanggungan dengan skenario pembayaran nyata, tanda bahaya pengecualian yang diurutkan, hitungan ACV vs biaya penggantian, dan pertanyaan untuk agen Anda sebelum perpanjangan."
---

> Terjemahan bahasa Indonesia dari [insurance-policy-decoder](../../../skills/insurance-policy-decoder/SKILL.md). Versi bahasa Inggris adalah versi kanonis.

# Skill Insurance Policy Decoder

Polis asuransi dibaca dua kali: saat tanda tangan (oleh tidak seorang pun) dan setelah kerugian terjadi (sudah terlambat). Skill ini melakukan pembacaan pertama dengan benar: berapa yang dibayar setiap baris pertanggungan dalam skenario nyata, pengecualian mana yang menelan janji mana, dan apakah "ditanggung" berarti diganti baru atau disusutkan hingga tinggal receh. Halaman ikhtisar polis (declarations page) adalah materi pemasaran; bagian pengecualian dan definisi itulah polis yang sebenarnya.

## Apa yang Dihasilkan Skill Ini

- Penguraian per pertanggungan dengan skenario pembayaran konkret untuk masing-masing ("kebakaran dapur, kerusakan $40k → polis membayar X karena…")
- Tanda bahaya yang diurutkan: pengecualian yang mengosongkan pertanggungan utama, sublimit, jebakan ACV, penalti koasuransi
- Hitungan ACV vs. biaya penggantian, diterapkan pada properti pengguna yang sebenarnya
- Pertanyaan untuk agen: celah yang ditemukan, endorsemen yang layak ditanyakan harganya, dan apa yang perlu diminta secara tertulis

## Input yang Diperlukan

Tanyakan hal berikut hanya jika belum diberikan:

- **Dokumen polis**: minimal halaman ikhtisar polis; bagian pengecualian/definisi jika ada. Jika hanya ada halaman ikhtisar, uraikan yang terlihat dan daftar bagian yang masih dibutuhkan; justru di pengecualianlah pembacaan ini paling penting.
- **Apa yang dilindungi**: perkiraan nilai rumah dan isinya, atau kendaraan + cara penggunaannya; apa pun yang tidak biasa (usaha rumahan, peralatan mahal, ruang bawah tanah jadi di daerah rawan hujan).
- **Daftar kekhawatiran mereka**: kerugian yang benar-benar mereka takutkan; penguraian diurutkan berdasarkan itu.

## Kerangka: Skala Keparahan

- 🔴 **Bisa merugikan Anda secara finansial**: penyelesaian klaim berdasarkan nilai tunai aktual (ACV) untuk atap/isi rumah (penyusutan menggerus pembayaran), pengecualian air/banjir/luapan saluran pembuangan (celah yang paling sering baru ketahuan terlambat; banjir hampir tidak pernah termasuk dalam polis standar), sublimit jauh di bawah nilai properti yang dinyatakan ("perhiasan: total $1.500"), klausul koasuransi (mengasuransikan di bawah X% nilai → setiap klaim dipotong secara proporsional), celah ordinance-of-law (membangun ulang sesuai peraturan bangunan terbaru tidak ditanggung secara default), pengecualian penggunaan bisnis yang membatalkan klaim untuk peralatan kantor di rumah atau kegiatan mengantar barang.
- 🟡 **Tidak lazim, telusuri sebelum perpanjangan**: risiko sendiri angin/hujan es yang tinggi atau berbasis persentase (2% dari nilai bangunan ≠ 2% dari klaim), penyusutan pada klaim atap sebagian, pertanggungan isi rumah berbasis bahaya yang disebutkan (named perils) yang menyamar sebagai pertanggungan menyeluruh, batas mobil sewaan dan kehilangan hak pakai yang habis di tengah masa perbaikan.
- 🟢 **Standar**: struktur tanggung gugat yang normal, risiko sendiri standar, pengecualian bernama yang biasa (perang, keausan); beri label agar pembaca bisa berhenti khawatir.

Selalu tunjukkan hitungannya: **contoh ACV** (atap berusia 10 tahun, biaya penggantian $30k, umur pakai 25 tahun → pembayaran setelah penyusutan ≈ $12k dikurangi risiko sendiri; hitung); **contoh koasuransi** jika klausulnya ada; **audit sublimit** terhadap barang berharga pengguna yang sebenarnya. Jika suatu istilah didefinisikan di bagian definisi, makna yang didefinisikan itu yang berlaku, bukan makna sehari-harinya; kutip definisinya.

## Format Output

### Policy Decode: [jenis, perusahaan asuransi, periode polis]

**1. Putusan**: tiga temuan yang paling mengubah pemahaman pengguna tentang apa yang mereka miliki, dalam kalimat sederhana.

**2. Penguraian pertanggungan**

| Baris pertanggungan | Limit / dasar | Apa yang dibayar dalam skenario nyata | Keparahan |
|---|---|---|---|

**3. 🚩 Tanda bahaya, diurutkan**: kutipan teks pengecualian/definisi, skenario saat klausul itu menggigit, dan selisih uangnya.

**4. Bagian hitungan**: ACV vs. penggantian dihitung pada properti mereka; kenyataan risiko sendiri (risiko sendiri persentase dalam uang); sublimit vs. barang berharga mereka yang sebenarnya.

**5. Pertanyaan untuk agen**: celah pertanggungan yang perlu ditanyakan harganya (banjir, luapan saluran pembuangan, barang berharga terjadwal, endorsemen biaya penggantian), dan jawaban mana yang perlu diminta secara tertulis.

Akhiri artefak dengan kalimat ini, kata per kata: *"Ini adalah pembacaan dalam bahasa sehari-hari, bukan nasihat hukum/keuangan; hukum berbeda-beda menurut yurisdiksi, jadi pastikan setiap hal penting dengan profesional yang berkualifikasi."*

## Pemeriksaan Kualitas

- [ ] Setiap baris pertanggungan mendapat skenario pembayaran konkret, bukan sekadar mengulang limitnya
- [ ] ACV vs. biaya penggantian dihitung dengan angka pengguna, bukan dijelaskan secara abstrak
- [ ] Risiko sendiri berbasis persentase dikonversi ke dalam uang
- [ ] Pengecualian dikutip, dan istilah yang didefinisikan memakai definisi polis
- [ ] Bagian yang tidak diberikan (pengecualian, definisi) disebut sebagai celah, tidak diasumsikan standar
- [ ] Kalimat penafian muncul kata per kata di dalam artefak

## Anti-Pola

- [ ] Jangan mengarang ketentuan atau limit pertanggungan yang tidak ada di dokumen
- [ ] Jangan melunakkan tanda bahaya demi terlihat seimbang; atap berusia 15 tahun dengan dasar ACV berarti pembayaran kecil, katakan saja
- [ ] Jangan menyajikan aturan yang bergantung pada yurisdiksi (batas waktu klaim, standar itikad buruk) sebagai hal universal
- [ ] Jangan mengurutkan berdasarkan urutan bagian; urutkan berdasarkan kekhawatiran yang disebutkan pengguna dan selisih uangnya
- [ ] Jangan merekomendasikan perusahaan asuransi atau menaksir harga pertanggungan; uraikan polis ini, berbelanja asuransi adalah langkah pengguna

## Dasar

Praktik peninjauan pertanggungan dari sisi pemegang polis: rekonsiliasi ikhtisar polis/pengecualian, pengujian skenario pembayaran, audit sublimit.
