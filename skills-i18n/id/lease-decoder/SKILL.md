---
name: lease-decoder
language: id
description: "Uraikan perjanjian sewa hunian ke dalam bahasa sehari-hari dan urutkan klausul yang bisa merugikan Anda. Gunakan ketika seseorang bertanya 'sebenarnya saya menandatangani apa', 'tolong uraikan kontrak sewa saya', 'apakah perjanjian sewa ini wajar', atau 'apakah pemilik rumah benar-benar boleh melakukan ini'. Menghasilkan tabel penguraian per klausul, daftar tanda bahaya yang diurutkan, hitungan biaya putus kontrak dan uang jaminan, pertanyaan yang perlu diajukan sebelum tanda tangan, serta hal-hal yang benar-benar bisa dinegosiasikan."
---

> Terjemahan bahasa Indonesia dari [lease-decoder](../../../skills/lease-decoder/SKILL.md). Versi bahasa Inggris adalah versi kanonis.

# Skill Lease Decoder

Perjanjian sewa ditulis oleh pihak pemilik, untuk kepentingan pihak pemilik. Skill ini membacanya
seperti teman cerdas yang sehari-hari membaca kontrak sewa: apa arti setiap klausul, mana yang bisa
menguras uang Anda, dan apa yang perlu ditawar sebelum Anda tanda tangan, bukan sesudahnya.

## Apa yang Dihasilkan Skill Ini

- Tabel penguraian per klausul dalam bahasa sehari-hari
- Tanda bahaya yang diurutkan menurut tingkat keparahan, lengkap dengan hitungan uangnya (denda putus kontrak, perpanjangan otomatis, syarat pengembalian uang jaminan)
- Pertanyaan untuk diajukan ke pemilik sebelum tanda tangan
- Daftar singkat hal-hal yang benar-benar bisa dinegosiasikan

## Input yang Diperlukan

Tanyakan hal berikut hanya jika belum diberikan:

- **Teks perjanjian sewa**: ditempel langsung, hasil transkripsi foto, atau sebagian saja. Kerjakan dengan apa yang ada dan sebutkan dengan jelas klausul standar mana yang tidak ada atau tidak terbaca.
- **Harga sewa, uang jaminan (deposit), dan jangka waktu** jika tidak ada di teks.
- **Lokasi kira-kira** (negara bagian/negara): jangan pernah menebaknya; keberlakuan klausul sangat berbeda antarwilayah.
- Opsional: apa yang paling mereka pedulikan (hewan peliharaan, menyewakan ulang, keluar lebih awal, bekerja dari rumah).

## Kerangka: Skala Keparahan

Nilai setiap temuan dengan skala ini, diurutkan menurut biaya nyatanya:

- 🔴 **Bisa merugikan Anda secara finansial**: perpanjangan otomatis ke masa sewa penuh yang baru, denda putus kontrak melebihi biaya mencari penyewa baru, beban perbaikan/perawatan yang dialihkan ke penyewa, syarat pengembalian uang jaminan yang dirancang untuk gagal (misalnya wajib kuitansi "pembersihan profesional"), penumpukan biaya, pengesampingan tanggung jawab (liability waiver).
- 🟡 **Tidak lazim, tawar balik**: masuk ke unit dengan pemberitahuan singkat atau tanpa pemberitahuan, larangan tamu secara menyeluruh, kewajiban memakai perusahaan asuransi pilihan pemilik, perubahan aturan sepihak, istilah kabur "kerusakan di luar keausan wajar".
- 🟢 **Klausul baku standar**: katakan dengan jelas, agar pembaca tahu mana yang tidak perlu dikhawatirkan.

Telusuri perjanjian sewa secara khusus untuk: **jebakan perpanjangan otomatis** (batas waktu pemberitahuan; apa akibatnya jika Anda diam saja), **pengalihan beban perbaikan**, **hak masuk** (masa pemberitahuan, alasan), **hitungan klausul putus kontrak** (hitung biaya keluar yang sebenarnya dalam angka uang), **syarat pengembalian uang jaminan** (daftar setiap syarat yang disebutkan). Jika suatu klausul sering tidak dapat diberlakukan (misalnya mengesampingkan kelayakan huni), tandai sebagai: *"sering kali tidak dapat diberlakukan; tanyakan ke organisasi penyewa setempat; keberlakuannya berbeda-beda menurut yurisdiksi."* Jangan pernah menyatakan suatu klausul batal sebagai fakta universal.

## Format Output

### Lease Decode: [alamat atau "perjanjian sewa Anda"]

**1. Putusan satu paragraf**: tanda tangan / negosiasikan dulu / tinggalkan, beserta alasannya.

**2. Penguraian per klausul**

| Klausul (§) | Apa bunyinya | Apa artinya bagi Anda | Keparahan |
|---|---|---|---|

**3. 🚩 Tanda bahaya, diurutkan**: yang terburuk lebih dulu, masing-masing dengan kutipan kalimatnya, skenario terburuk yang realistis dalam uang atau kerepotan, dan perbaikan yang perlu diminta.

**4. Hitungan keluar & uang jaminan**: berapa sebenarnya biaya keluar lebih awal, dan setiap syarat yang melekat untuk mendapatkan kembali uang jaminan.

**5. Pertanyaan sebelum tanda tangan**: 3 sampai 6 pertanyaan, diurutkan menurut daya tawarnya.

**6. Yang bisa dinegosiasikan**: klausul yang biasanya mau diubah pemilik jika diminta.

Akhiri artefak dengan kalimat ini, kata per kata: *"Ini adalah pembacaan dalam bahasa sehari-hari, bukan nasihat hukum/keuangan; hukum berbeda-beda menurut yurisdiksi, jadi pastikan setiap hal penting dengan profesional yang berkualifikasi."*

## Pemeriksaan Kualitas

- [ ] Setiap tanda bahaya mengutip bahasa perjanjian sewa yang sebenarnya, berupa nomor pasal atau teks kata per kata
- [ ] Hitungan putus kontrak dan uang jaminan dihitung dengan angka nyata, bukan dijelaskan secara samar
- [ ] Poin yang bergantung pada yurisdiksi ditandai demikian, dengan kalimat rujukan ke organisasi penyewa
- [ ] Bagian yang hilang atau tidak terbaca disebutkan secara eksplisit, tidak ditutup-tutupi
- [ ] Klausul yang memang standar ditandai 🟢 agar pembaca tidak takut pada klausul baku
- [ ] Kalimat penafian muncul kata per kata di dalam artefak

## Anti-Pola

- [ ] Jangan mengarang klausul yang tidak ada di dokumen; uraikan hanya apa yang ada
- [ ] Jangan melunakkan tanda bahaya demi terlihat seimbang; jika bisa merugikan secara finansial, katakan terus terang
- [ ] Jangan menyajikan aturan yang bergantung pada yurisdiksi sebagai hal universal; tandai dan rujuk ke pihak lain
- [ ] Jangan menandai semuanya 🔴; penguraian yang serba alarm sama tidak bergunanya dengan tanpa penguraian
- [ ] Jangan memberi strategi litigasi atau putusan "ini ilegal"; itu wewenang pengacara

## Dasar

Praktik peninjauan perjanjian sewa dari sisi penyewa: triase klausul, hitungan biaya keluar, audit syarat uang jaminan.

## Contoh Frasa Pemicu

- "Apa yang akan saya tanda tangani?"
- "Jelaskan perjanjian sewa saya."
- "Apakah perjanjian sewa ini wajar?"
- "Apakah pemilik rumah benar-benar boleh melakukan ini?"
