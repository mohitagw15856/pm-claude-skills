---
name: claim-denial-decoder
language: id
description: "Uraikan surat penolakan klaim asuransi: apa arti sebenarnya dari alasan yang dikutip, apakah penolakan seperti itu umumnya bisa dibatalkan, dan surat banding yang menjawabnya poin demi poin. Gunakan ketika seseorang bertanya 'klaim asuransi saya ditolak, apa yang harus saya lakukan', 'tolong uraikan surat penolakan ini', 'bisakah saya mengajukan banding atas penolakan ini', atau 'tuliskan surat banding asuransi saya'. Menghasilkan penguraian penolakan dengan pembingkaian peluang pembatalan, daftar periksa bukti, surat banding poin demi poin, dan tangga eskalasi di luar perusahaan asuransi."
---

> Terjemahan bahasa Indonesia dari [claim-denial-decoder](../../../skills/claim-denial-decoder/SKILL.md). Versi bahasa Inggris adalah versi kanonis.

# Skill Claim Denial Decoder

Surat penolakan ditulis untuk mengakhiri percakapan; banding ada karena sering kali percakapan itu tidak seharusnya berakhir. Sebagian berarti dari penolakan, terutama kesalahan pengodean, "tidak diperlukan secara medis", dan kekurangan dokumentasi, dibatalkan ketika seseorang menjawab *alasan yang dinyatakan* dengan bukti, bukan dengan amarah. Skill ini menguraikan apa yang sebenarnya diklaim oleh penolakan itu, mencocokkan setiap klaim dengan bukti yang menjawabnya, dan menulis surat banding yang terbaca seperti disusun oleh seseorang yang siap melakukan eskalasi.

## Apa yang Dihasilkan Skill Ini

- Penolakan yang diuraikan: alasan yang dikutip dalam bahasa sederhana, dan apa arti jenis alasan itu bagi peluang banding
- Daftar periksa bukti yang disesuaikan dengan jenis penolakan: apa yang perlu dikumpulkan sebelum menulis
- Surat banding: poin demi poin, mengutip dokumen, sadar tenggat waktu
- Tangga eskalasi: tingkat banding internal, peninjauan eksternal/independen, pengaduan ke regulator (di Indonesia misalnya OJK), secara berurutan

## Input yang Diperlukan

Tanyakan hal berikut hanya jika belum diberikan:

- **Teks surat penolakan**: kode/bahasa alasan yang dikutip, dan tenggat banding yang dinyatakan. Belum ada surat? Langkah pertama adalah meminta penolakan secara tertulis beserta dasar polis yang spesifik.
- **Cerita klaimnya**: apa yang diklaim, kapan, kerugian atau perawatannya, dan setiap persetujuan sebelumnya atau interaksi dengan penilai kerugian (adjuster).
- **Bahasa polis** jika ada: kalimat terkuat dalam banding adalah yang mengutip polis untuk melawan penolakan.
- **Apa yang sudah dikirim**: dan apa yang diklaim perusahaan asuransi tidak pernah diterima (kasus klasik).

## Kerangka: Skala Keparahan

Baca alasan yang dikutip dalam penolakan dan klasifikasikan:

- 🔴 **Umumnya bisa dijawab, ajukan banding dengan bukti**: "tidak diperlukan secara medis" (dijawab dengan surat dokter yang merawat + rekam medis + pedoman), kesalahan pengodean/penagihan (dijawab dengan kode yang dikoreksi dari penyedia layanan), "dokumentasi tidak diterima" (dijawab dengan mengirim ulang disertai bukti pengiriman), klaim "kondisi yang sudah ada sebelumnya" atau "kerusakan sebelumnya" tanpa bukti (dijawab dengan catatan bertanggal), penilaian yang terlalu rendah (dijawab dengan estimasi independen; ini sengketa, bukan penolakan, dan surat harus membingkainya ulang demikian).
- 🟡 **Lebih sulit tetapi bisa dipersoalkan**: perawatan "eksperimental/investigasional" (perlu pedoman dan dukungan riset yang ditelaah sejawat), pengajuan terlambat dengan alasan yang sah, tafsiran pengecualian ketika bahasa polisnya ambigu (ambiguitas umumnya ditafsirkan merugikan pihak penyusun; tandai sebagai bergantung pada yurisdiksi, layak diperjuangkan).
- 🟢 **Penolakan yang kemungkinan kuat**: bahaya/perawatan yang jelas dikecualikan, pertanggungan sudah berakhir pada tanggal kerugian, klaim di luar periode polis; katakan dengan jujur, karena banding yang sia-sia menghabiskan tenggat untuk opsi yang mungkin berhasil (negosiasi, rencana cicilan, pertanggungan lain).

Struktur banding selalu sama: **ulangi kata-kata persis penolakan → jawab alasan itu secara spesifik dengan bukti terlampir → kutip bahasa polis yang mendukung pertanggungan → minta tindakan spesifik → sebutkan tenggat yang sedang Anda jalani dan langkah berikutnya yang akan Anda ambil jika tidak dijawab.** Jangan pernah membantah alasan yang tidak dikutip dalam surat; itu mengajari mereka dasar penolakan baru.

## Format Output

### Denial Decode & Appeal: [nomor klaim, perusahaan asuransi]

**1. Penguraian**: alasan yang dikutip dalam bahasa sehari-hari, jenisnya, dan pembingkaian peluang banding yang jujur (bisa dijawab / bisa dipersoalkan / kemungkinan kuat).

**2. Daftar periksa bukti**

| Pernyataan penolakan | Bukti yang menjawabnya | Di mana mendapatkannya | Status |
|---|---|---|---|

**3. Surat banding**: teks lengkap, siap dikirim: kepala surat berisi detail klaim · "surat Anda tertanggal [tanggal] menyatakan: '[kutipan]'" · tanggapan poin demi poin dengan rujukan lampiran · kutipan bahasa polis · permintaan spesifik · catatan bahwa surat dikirim dengan cara yang bisa dilacak.

**4. Tangga eskalasi**: tingkat banding internal beserta tenggatnya → hak peninjauan eksternal/independen (bergantung pada yurisdiksi dan jenis polis; periksa bagian hak dalam surat penolakan itu sendiri) → pengaduan ke regulator → ambang untuk surat somasi/pengacara.

**5. Kotak tenggat**: setiap tanggal yang penting, dari surat dan dari polis.

Akhiri artefak dengan kalimat ini, kata per kata: *"Ini adalah pembacaan dalam bahasa sehari-hari, bukan nasihat hukum/keuangan; hukum berbeda-beda menurut yurisdiksi, jadi pastikan setiap hal penting dengan profesional yang berkualifikasi."*

## Pemeriksaan Kualitas

- [ ] Surat banding menjawab kata-kata persis yang dikutip dalam penolakan, dengan mengutipnya kembali
- [ ] Setiap pernyataan dalam surat banding merujuk ke dokumen terlampir
- [ ] Pembingkaian peluang banding jujur; penolakan yang tidak ada harapan disebut demikian, beserta jalur alternatifnya
- [ ] Tangga eskalasi mencatat anak tangga mana yang bergantung pada yurisdiksi/jenis polis
- [ ] Semua tenggat dikumpulkan dalam satu kotak, dengan rekomendasi tanggal pengiriman di dalam rentang itu
- [ ] Kalimat penafian muncul kata per kata di dalam artefak

## Anti-Pola

- [ ] Jangan menulis surat penuh amarah; penilai klaim menaruh surat marah di tumpukan paling bawah, bukti yang menggerakkan berkas
- [ ] Jangan membantah dasar yang tidak dikutip dalam penolakan; jawab apa yang dinyatakan, tidak lebih
- [ ] Jangan menjanjikan peluang pembatalan dalam persentase; bingkai sebagai pola jenis alasan, bukan statistik
- [ ] Jangan biarkan banding melewati tenggat karena menunggu bukti yang sempurna; ajukan yang memadai dan tepat waktu, lengkapi setelahnya
- [ ] Jangan lewatkan pembingkaian ulang jika ini sengketa penilaian; "ditolak" dan "dinilai terlalu rendah" punya strategi yang berbeda

## Dasar

Praktik banding dari sisi pemegang polis: triase alasan penolakan, pencocokan bukti, penyusunan banding poin demi poin, urutan eskalasi.
