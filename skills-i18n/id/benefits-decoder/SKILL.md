---
name: benefits-decoder
language: id
description: "Uraikan paket tunjangan kerja menjadi berapa nilai sebenarnya dan di mana ketentuan kecilnya menggigit. Gunakan ketika seseorang bertanya 'apakah tawaran ini bagus', 'tolong uraikan paket tunjangan saya', 'sebenarnya apa arti saham (equity) saya', atau 'apa yang perlu saya tanyakan ke HR sebelum tanda tangan'. Menghasilkan penguraian per tunjangan dengan nilai uang yang nyata, tanda bahaya yang diurutkan (vesting cliff, clawback, bonus 'diskresioner', hitungan ekonomi cuti tanpa batas), dan pertanyaan untuk HR sebelum tanda tangan."
---

> Terjemahan bahasa Indonesia dari [benefits-decoder](../../../skills/benefits-decoder/SKILL.md). Versi bahasa Inggris adalah versi kanonis.

# Skill Benefits Decoder

Slide "total kompensasi" adalah materi pemasaran. Skill ini membaca bahasa ketentuan program seperti teman
yang pernah dirugikan sebelumnya: berapa nilai sebenarnya setiap tunjangan, janji mana yang punya pintu
darurat, dan apa yang perlu diminta secara tertulis sebelum Anda tanda tangan.

## Apa yang Dihasilkan Skill Ini

- Penguraian per tunjangan dengan nilai tahunan yang nyata jika bisa dihitung
- Tanda bahaya yang diurutkan: vesting cliff, clawback, serba "diskresioner", celah pertanggungan
- Hitungan matching 401k/dana pensiun dan hitungan equity, dengan aritmetika yang ditunjukkan
- Pertanyaan untuk HR sebelum tanda tangan, dan jawaban mana yang perlu diminta secara tertulis

## Input yang Diperlukan

Tanyakan hal berikut hanya jika belum diberikan:

- **Dokumen tunjangan**: surat penawaran kerja, ringkasan tunjangan, ketentuan pemberian equity, kutipan ketentuan program. Uraikan yang diberikan; daftar apa yang masih dibutuhkan (rencana equity, ringkasan manfaat asuransi, ketentuan program bonus).
- **Gaji pokok dan detail pemberian equity** jika tidak ada di teks; dibutuhkan untuk hitungannya.
- **Situasi mereka**: tanggungan/kebutuhan kesehatan, berapa lama mereka secara realistis berencana bertahan.

## Kerangka: Skala Keparahan

- 🔴 **Bisa merugikan Anda secara finansial**: vesting cliff dibandingkan perkiraan masa kerja mereka, clawback (bonus tanda tangan, relokasi, biaya pendidikan, bahkan equity yang sudah vested jika ada pemicu "cause"), bonus yang hanya dibayarkan jika "masih bekerja pada tanggal pembayaran", jendela waktu exercise equity yang singkat setelah keluar, deductible tinggi di balik judul yang menarik, matching yang hangus karena vesting.
- 🟡 **Tidak lazim, perjelas sebelum tanda tangan**: bahasa bonus "diskresioner" (uraikan secara gamblang: itu target, bukan janji), cuti tanpa batas (uraikan hitungan ekonominya: tidak ada pembayaran sisa cuti saat keluar), tunjangan yang bisa diubah "atas kebijakan perusahaan", masa tunggu.
- 🟢 **Standar**: masa pendaftaran yang normal, bentuk vesting standar, klausul baku program yang lazim; beri label agar pembaca tahu mana yang aman.

Selalu tunjukkan hitungannya:
1. **Hitungan matching**: misalnya "50% dari 6% pertama" = X/tahun pada gaji mereka; catat vesting dari matching itu sendiri dan apa yang hangus jika keluar pada tahun ke-N.
2. **Hitungan equity**: nilai pemberian ÷ tahun vesting = nilai tahunan pada valuasi yang disebutkan, dengan skenario cliff ("keluar di bulan ke-11 = 0"); tandai angka yang bergantung pada valuasi sebagai `[to confirm]`.
3. **Pembacaan pertanggungan asuransi yang sebenarnya**: porsi premi, deductible, batas maksimum biaya sendiri: tahun terburuk dalam uang, bukan kalimat brosur.
4. **Hitungan ekonomi cuti**: tanpa batas vs. akrual: selisih pembayaran saat keluar dalam uang.

## Format Output

### Benefits Decode: [perusahaan / tawaran]

**1. Putusan**: berapa sebenarnya nilai paket ini per tahun (rentang, dengan asumsi yang dinyatakan), dan dua hal yang perlu diselesaikan sebelum tanda tangan.

**2. Penguraian per tunjangan**

| Tunjangan | Apa kata dokumen | Nilai sebenarnya / arti sebenarnya | Keparahan |
|---|---|---|---|

**3. 🚩 Tanda bahaya, diurutkan**: kutipan bahasanya, skenario saat klausul itu menggigit, dan kerugiannya dalam uang.

**4. Bagian hitungan**: matching, equity, skenario terburuk asuransi, cuti; aritmetika ditunjukkan.

**5. Pertanyaan untuk HR sebelum tanda tangan**: 4 sampai 7 pertanyaan, diurutkan berdasarkan uang yang dipertaruhkan; tandai jawaban mana yang perlu diminta secara tertulis (ketentuan bonus, dokumen rencana equity, pemicu clawback).

**6. Yang bisa dinegosiasikan**: biasanya pos sekali bayar (bonus tanda tangan, equity, tanggal mulai, relokasi) lebih daripada programnya sendiri.

Akhiri artefak dengan kalimat ini, kata per kata: *"Ini adalah pembacaan dalam bahasa sehari-hari, bukan nasihat hukum/keuangan; hukum berbeda-beda menurut yurisdiksi, jadi pastikan setiap hal penting dengan profesional yang berkualifikasi."*

## Pemeriksaan Kualitas

- [ ] Setiap valuasi ditunjukkan sebagai aritmetika dengan asumsi yang dinyatakan, bukan sekadar dinyatakan
- [ ] Bahasa "diskresioner" dan "masih bekerja pada tanggal pembayaran" dikutip dan diuraikan secara terus terang
- [ ] Tanda cliff/clawback dikaitkan dengan perkiraan masa kerja yang disebutkan pengguna
- [ ] Dokumen yang hilang dan angka yang tidak bisa diverifikasi dicantumkan sebagai `[to confirm]`
- [ ] Ketentuan yang memang standar ditandai 🟢; tidak semuanya jebakan
- [ ] Kalimat penafian muncul kata per kata di dalam artefak

## Anti-Pola

- [ ] Jangan mengarang tunjangan atau ketentuan yang tidak ada di dokumen
- [ ] Jangan melunakkan tanda bahaya demi terlihat seimbang; "diskresioner" berarti tidak ada bonus yang wajib dibayar, katakan saja
- [ ] Jangan menyajikan aturan yang bergantung pada yurisdiksi (pembayaran sisa cuti, clawback) sebagai hal universal
- [ ] Jangan menerima nilai equity begitu saja tanpa menandai asumsi valuasinya
- [ ] Jangan biarkan judul "total kompensasi" berdiri apa adanya; susun ulang dari bahasa ketentuan programnya

## Dasar

Praktik peninjauan tawaran kerja: rekonstruksi total kompensasi, penguraian bahasa ketentuan program, daftar pertanyaan sebelum tanda tangan.

## Contoh Frasa Pemicu

- "Apakah tawaran ini bagus?"
- "Jelaskan paket tunjangan saya."
- "Apa arti saham saya sebenarnya?"
- "Apa yang harus saya tanyakan ke HR sebelum tanda tangan?"
