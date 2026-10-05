---
name: salary-negotiation
language: id
description: "Rencanakan negosiasi kompensasi yang berpijak pada angka dan daya tawar, bukan rasa gugup. Gunakan saat diminta menegosiasikan gaji, mengevaluasi atau membalas tawaran kerja (counter offer), menyiapkan pembicaraan soal kompensasi, atau membandingkan tawaran. Menghasilkan rencana negosiasi: perbandingan total kompensasi antar-tawaran, target/batas mundur dan BATNA Anda, justifikasi berbasis nilai, naskah counter, dan hal yang bisa dinegosiasikan di luar gaji pokok."
---

> Terjemahan bahasa Indonesia dari [salary-negotiation](../../../skills/salary-negotiation/SKILL.md). Versi bahasa Inggris adalah versi kanonis.

# Skill Negosiasi Gaji

Kebanyakan orang kehilangan uang karena bernegosiasi dari rasa cemas, bukan dari persiapan. Skill
ini mengganti rasa gugup dengan rencana: bandingkan tawaran berdasarkan **total kompensasi** (bukan hanya gaji pokok), tetapkan target dan
batas mundur yang berpijak pada BATNA Anda, dukung permintaan dengan nilai yang Anda bawa, dan siapkan naskah counter, termasuk
tuas di luar gaji pokok yang sering lebih mudah dimenangkan.

## Input yang Dibutuhkan

Tanyakan hanya jika belum diberikan:

- **Tawaran**: gaji pokok, bonus, ekuitas, sign-on, dan komponen lain (serta tawaran pesaing, jika ada).
- **Situasi Anda**: kompensasi saat ini, BATNA Anda (alternatif terbaik: tawaran pesaing, tetap di tempat sekarang), dan seberapa besar kedua pihak saling membutuhkan.
- **Data pasar**: rentang pembanding untuk posisi/level/lokasi (levels.fyi, Glassdoor, rekan sejawat), jika Anda punya.
- **Apa yang penting bagi Anda**: uang tunai sekarang vs. potensi ekuitas, fleksibilitas, jabatan, tanggal mulai.

## Format Output

### Negotiation Plan: [role] at [company]

**1. Perbandingan total kompensasi**: jangan pernah membandingkan gaji pokok dengan gaji pokok. Susun total kompensasi tahunan dari tawaran-tawaran dan kondisi saat ini/alternatif Anda (gunakan skrip pembantu). Ekuitas dan bonus sering membalik peringkat.

**2. Angka Anda**: **target** (ambisius tetapi dapat dibenarkan), **batas mundur** (di bawah angka ini Anda menolak), dan **jangkar** (buka sedikit di atas target). Ketiganya berpijak pada pasar + BATNA Anda.

**3. Membaca daya tawar**: seberapa besar daya tawar Anda (ada tawaran pesaing? keahlian langka? mereka sudah banyak berinvestasi dalam proses?) dan cara memakainya tanpa menggertak.

**4. Justifikasi**: argumen berbasis nilai untuk permintaan Anda: bukti Anda (dampak, kompensasi pembanding, tawaran pesaing), dibingkai secara kolaboratif ("Saya antusias; agar ini bisa berjalan…").

**5. Naskah counter**: kalimat persis untuk: membalas tawaran gaji pokok, menanggapi "itu batas maksimal kami", dan **tuas di luar gaji pokok** (sign-on, ekuitas, jabatan/level, tanggal mulai, remote, jadwal review) yang sering bisa bergerak saat gaji pokok tidak bisa.

**6. Rencana mundur**: apa yang Anda lakukan jika mereka tidak memenuhi batas mundur (dan mengapa memutuskannya sejak awal adalah kekuatan Anda yang sebenarnya).

## Skrip Pembantu

`scripts/comp_compare.py` (hanya stdlib) menghitung total kompensasi tahunan antar-tawaran agar perbandingannya setara (ekuitas diamortisasi, sign-on disetahunkan):

```bash
# offers.json: [{"name":"Offer A","base":160000,"bonus":24000,"equity_total":200000,"equity_years":4,"signing":20000}, ...]
python3 scripts/comp_compare.py offers.json
python3 scripts/comp_compare.py offers.json --signing-years 1 --json
```

## Pemeriksaan Kualitas

- [ ] Tawaran dibandingkan berdasarkan **total kompensasi**, bukan gaji pokok saja (ekuitas + bonus + sign-on disertakan)
- [ ] Target, batas mundur, dan jangkar semuanya ditetapkan, dan dikaitkan dengan pasar + BATNA
- [ ] Justifikasi berbasis nilai dan didukung bukti, bukan "saya butuh lebih"
- [ ] Tuas di luar gaji pokok disertakan (sign-on, ekuitas, jabatan, tanggal mulai, remote)
- [ ] Keputusan batas mundur dibuat *sebelum* pembicaraan

## Anti-Pola

- [ ] Jangan membandingkan gaji pokok dengan gaji pokok: total kompensasi adalah angka sebenarnya, dan ekuitas/bonus sering mengubah tawaran mana yang unggul
- [ ] Jangan bernegosiasi tanpa batas mundur yang sudah diputuskan: itulah sumber daya tawar Anda
- [ ] Jangan menggertak dengan tawaran pesaing yang tidak Anda miliki: jika ketahuan, seluruh kredibilitas Anda hilang
- [ ] Jangan menjangkar terlalu rendah atau menerima angka pertama: tawaran pertama hampir selalu masih ada ruang
- [ ] Jangan terpaku hanya pada gaji pokok: sign-on, ekuitas, level, dan tanggal mulai sering bisa bergerak saat gaji pokok sudah mentok

## Dasar Rujukan

Praktik negosiasi berprinsip (*Getting to Yes*, Fisher & Ury: BATNA, kepentingan di atas posisi) yang diterapkan pada kompensasi.
