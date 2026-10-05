---
name: tos-decoder
language: id
description: "Uraikan syarat dan ketentuan layanan atau kebijakan privasi menjadi apa yang sebenarnya Anda setujui, diurutkan berdasarkan dampak nyatanya. Gunakan ketika seseorang bertanya 'sebenarnya saya menyetujui apa', 'tolong uraikan kebijakan privasi ini', 'apakah ToS ini buruk', atau 'perlukah saya klik setuju'. Menghasilkan tabel temuan yang diurutkan dengan putusan 'perlukah saya peduli?' untuk setiap temuan, mencakup penjualan kembali data, arbitrase dan pengesampingan gugatan kelompok, perubahan sepihak, lisensi konten, dan apa arti penghapusan yang sebenarnya."
---

> Terjemahan bahasa Indonesia dari [tos-decoder](../../../skills/tos-decoder/SKILL.md). Versi bahasa Inggris adalah versi kanonis.

# Skill ToS Decoder

Tidak ada yang membaca syarat dan ketentuan, dan memang itulah model bisnisnya. Skill ini membacanya dan
menjawab satu-satunya pertanyaan yang penting untuk setiap klausul: *apakah Anda benar-benar perlu peduli?*
Sebagian besar ToS adalah klausul baku yang bersifat defensif; nilainya ada pada menemukan tiga klausul yang bukan.

## Apa yang Dihasilkan Skill Ini

- Temuan yang diurutkan berdasarkan dampak nyata, bukan urutan dokumen
- Penjelasan "apa yang Anda setujui" dalam bahasa sehari-hari untuk setiap temuan, dengan putusan "perlukah saya peduli?"
- Kesimpulan akhir: setujui / setujui dengan mata terbuka / hindari
- Apa yang sebenarnya bisa Anda lakukan terhadap bagian yang buruk (pengaturan, opsi menolak, alternatif)

## Input yang Diperlukan

Tanyakan hal berikut hanya jika belum diberikan:

- **Teks ToS / kebijakan privasi**: ditempel lengkap atau per bagian. Jika hanya kutipan, uraikan yang ada dan daftar topik berdampak tinggi mana (arbitrase, berbagi data, lisensi, penghapusan) yang tidak ada dalam teks yang dibagikan.
- **Layanan apa itu** dan bagaimana mereka akan menggunakannya (sekadar iseng vs. untuk bisnis, mengunggah karya orisinal, menyimpan data sensitif).
- **Apa yang paling mereka khawatirkan**, jika ada yang spesifik.

## Kerangka: Skala Keparahan

Urutkan temuan berdasarkan apa yang terjadi pada orang sungguhan, yang terburuk lebih dulu:

- 🔴 **Bisa merugikan uang atau hak Anda**: arbitrase mengikat + pengesampingan gugatan kelompok (Anda tidak bisa ikut gugatan bersama saat terjadi masalah), penjualan atau pembagian data pribadi kepada pihak ketiga/pialang data, lisensi luas dan abadi atas konten Anda (terutama yang bisa disublisensikan/untuk pelatihan AI), klausul perubahan sepihak dengan "terus menggunakan = setuju", penutupan akun disertai hangusnya saldo berbayar atau konten.
- 🟡 **Tidak lazim, ketahui sebelum klik**: "penghapusan" yang sebenarnya hanya penonaktifan atau tidak mencakup cadangan, perpanjangan otomatis dengan pembatalan yang sulit, penyimpanan data setelah akun ditutup, yurisdiksi/tempat penyelesaian sengketa yang jauh dari tempat tinggal, klausul masukan-menjadi-milik-kami.
- 🟢 **Klausul baku standar**: penafian jaminan, batas tanggung jawab, aturan penggunaan yang wajar; sebutkan agar pembaca bisa berhenti mengkhawatirkannya.

Untuk setiap temuan 🔴/🟡, tulis putusan satu baris **"Perlukah saya peduli?"** yang disesuaikan dengan penggunaan *pengguna ini* sebagaimana disebutkan, misalnya "Ya jika Anda mengunggah karya orisinal; abaikan jika Anda hanya melihat-lihat." Periksa secara khusus: data yang dikumpulkan vs. dibagikan vs. dijual; cakupan persis lisensi konten (abadi? bisa disublisensikan? tetap berlaku setelah penghapusan?); bagaimana sengketa harus diselesaikan; bagaimana ketentuan bisa berubah; apa yang benar-benar dihapus oleh penghapusan.

## Format Output

### ToS Decode: [nama layanan]

**1. Kesimpulan akhir**: setujui / setujui dengan mata terbuka / hindari, dalam dua kalimat, ditambah satu klausul terburuk.

**2. Temuan, diurutkan berdasarkan dampak**

| # | Apa yang Anda setujui (bahasa sehari-hari) | Di mana (kutipan kalimat/bagian) | Keparahan | Perlukah saya peduli? |
|---|---|---|---|---|

**3. Kenyataan penghapusan**: apa yang sebenarnya terjadi saat "hapus akun/data saya", menurut teksnya.

**4. Apa yang bisa Anda lakukan**: opsi menolak, pengaturan, jendela waktu untuk menolak arbitrase jika teksnya menyediakan, dan apa yang memang harus diterima atau ditinggalkan.

Akhiri artefak dengan kalimat ini, kata per kata: *"Ini adalah pembacaan dalam bahasa sehari-hari, bukan nasihat hukum/keuangan; hukum berbeda-beda menurut yurisdiksi, jadi pastikan setiap hal penting dengan profesional yang berkualifikasi."*

## Pemeriksaan Kualitas

- [ ] Temuan diurutkan berdasarkan dampak nyata, bukan urutan dokumen itu sendiri
- [ ] Setiap temuan 🔴/🟡 mengutip teks klausul atau nomor bagian yang sebenarnya
- [ ] Setiap temuan mendapat putusan "perlukah saya peduli?" yang terkait dengan penggunaan yang disebutkan pengguna
- [ ] Klausul baku standar diberi label 🟢 secara eksplisit; memberi rasa tenang adalah bagian dari produk
- [ ] Topik berdampak tinggi yang tidak ada dalam teks yang diberikan dicantumkan sebagai belum ditinjau, tidak diasumsikan aman
- [ ] Kalimat penafian muncul kata per kata di dalam artefak

## Anti-Pola

- [ ] Jangan mengarang klausul yang tidak ada di dokumen; uraikan hanya teks yang diberikan
- [ ] Jangan melunakkan tanda bahaya demi terlihat seimbang; "semua orang melakukannya" tidak membuatnya tidak berbahaya
- [ ] Jangan menyajikan aturan yang bergantung pada yurisdiksi (hak privasi, batasan arbitrase) sebagai hal universal
- [ ] Jangan berlagak marah pada klausul baku biasa; terlalu sering berteriak serigala akan mengubur temuan yang sebenarnya
- [ ] Jangan melewatkan putusan; daftar klausul tanpa "perlukah saya peduli?" hanyalah ToS yang lebih pendek

## Dasar

Praktik peninjauan kontrak konsumen: triase klausul berdasarkan dampak, pembacaan cakupan lisensi, analisis klausul sengketa.
