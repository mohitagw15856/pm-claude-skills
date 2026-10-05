---
name: offer-comparison
language: id
description: "Bandingkan dua tawaran kerja atau lebih sebagai kurva total kompensasi selama empat tahun: cliff vesting, bonus, match 401(k) (program pensiun AS, mirip iuran DPLK dari pemberi kerja), dan tahun persilangan dihitung, bukan dikira-kira. Gunakan saat diminta membandingkan tawaran kerja, tawaran mana yang membayar lebih besar dari waktu ke waktu, memodelkan vesting ekuitas saya, atau apakah tawaran startup ini benar-benar sepadan. Menghasilkan tabel kompensasi per tahun dan kumulatif untuk setiap tawaran, analisis persilangan, dan tuas negosiasi yang diurutkan berdasarkan dampak dalam dolar."
---

> Terjemahan bahasa Indonesia dari [offer-comparison](../../../skills/offer-comparison/SKILL.md). Versi bahasa Inggris adalah versi kanonis.

# Skill Perbandingan Tawaran

Tawaran sering disampaikan sebagai perasaan ("startup-nya punya potensi lebih besar"), padahal ujungnya adalah angka dengan tanggal. Skill ini menghitung kurvanya: berapa yang dibayar setiap tawaran di masing-masing empat tahun ke depan, di mana garisnya bersilangan, dan tuas mana pada tawaran yang lebih lemah yang benar-benar bisa menggesernya.

## Apa yang Dihasilkan Skill Ini

- **Tabel kompensasi**: total per tahun dan kumulatif untuk setiap tawaran, dari skrip
- **Analisis persilangan**: tawaran mana yang unggul kapan, dan asumsi apa yang menyandera peringkat tersebut
- **Terjemahan risiko**: ekuitas perusahaan privat dinyatakan ulang secara jujur, bukan pada nilai nominalnya
- **Tuas negosiasi**: diurutkan berdasarkan dampak dalam dolar per satuan rasa canggung saat memintanya

## Input yang Dibutuhkan

Tanyakan jika belum diberikan:
- **Per tawaran:** gaji pokok, % bonus, nilai hibah ekuitas, tahun vesting, bulan cliff, frekuensi vesting, match 401(k) (% dan batasnya), refresher yang dijanjikan
- **Horizon pengguna**: berencana bertahan 2 tahun atau 4 tahun mengubah jawabannya, karena cliff juga berpengaruh
- **Pandangan risiko ekuitas**: RSU perusahaan publik dihitung pada nilai nominal; untuk ekuitas privat, sepakati diskon dengan pengguna (misalnya potongan 50-75% sebelum Series B) dan masukkan angka yang sudah didiskon ke skrip *dengan label yang jelas*

## Skrip Pembantu

```bash
python3 scripts/offer_comparison.py offers.json
cat offers.json | python3 scripts/offer_comparison.py - --json
```

Bentuk input ada di docstring skrip. Skrip menghitung vesting bulan demi bulan (cliff 12 bulan mencairkan akumulasi satu tahun), bonus dan match secara tahunan, lalu melaporkan pemimpin kumulatif dan tahun persilangan. **Skrip menilai ekuitas persis pada angka yang Anda berikan**: penyesuaian risiko adalah input Anda, terlihat, tidak pernah menjadi asumsi tersembunyi.

## Kerangka: Penilaian di Sekitar Perhitungan

- **Cliff vs horizon**: masa kerja yang diperkirakan 18 bulan membuat ekuitas tahun ke-4 menjadi fiksi; bandingkan pada horizon nyata pengguna, bukan horizon hibahnya
- **Satu dolar berisiko ≠ satu dolar gaji**: jangan pernah membandingkan saham kertas perusahaan privat dengan uang tunai 1:1; tampilkan perbandingan pada 2-3 tingkat diskon jika pengguna enggan memilih satu
- **Refresher adalah kebijakan, bukan janji**: modelkan hanya jika tertulis; selain itu sebutkan sebagai potensi tambahan di luar tabel
- **Urutan tuas:** gaji pokok (berlipat ke bonus dan match) → hibah ekuitas → signing bonus (sekali bayar, paling mudah disetujui) → penyesuaian cliff/tanggal mulai

## Format Output

---

# Offer Comparison: [A] vs [B]

## Kurvanya
[Script output: per-year, cumulative, leader, crossover]

## Asumsi yang Menyandera Peringkat
[1-2 asumsi yang membalik jawabannya, biasanya diskon ekuitas privat dan horizon masa kerja, masing-masing ditampilkan bersama hasil yang terbalik.]

## Tuas Negosiasi
| Tuas | Diterapkan pada | Menggeser total 4 tahun sebesar | Tingkat kesulitan meminta |
|---|---|---|---|

*Model edukatif, bukan nasihat keuangan. Verifikasi dengan profesional berlisensi sebelum bertindak berdasarkan model ini.*

---

## Pemeriksaan Kualitas

- [ ] Diskon ekuitas untuk perusahaan privat dinyatakan secara eksplisit dan disetujui pengguna
- [ ] Perbandingan ditampilkan pada horizon yang dinyatakan pengguna, bukan hanya pada 4 tahun
- [ ] Bagian asumsi penyandera menampilkan peringkat yang terbalik, bukan sekadar menyebut risikonya
- [ ] Tuas memuat dampak dalam dolar yang dihitung dari tawaran sebenarnya
- [ ] Baris disclaimer muncul di hasil akhir

## Anti-Pola

- [ ] Jangan membandingkan satu dolar ekuitas berisiko dengan satu dolar gaji secara 1:1: diskon itulah analisisnya
- [ ] Jangan sembunyikan cliff vesting di dalam rata-rata tahunan: tahun pertama dengan cliff punya ceritanya sendiri
- [ ] Jangan memodelkan refresher yang tidak tertulis sebagai pendapatan
- [ ] Jangan menyatakan pemenang tanpa menyebut asumsi apa yang menjadi sandaran kemenangan itu
- [ ] Jangan menyajikan hasil model tanpa melampirkan asumsinya
