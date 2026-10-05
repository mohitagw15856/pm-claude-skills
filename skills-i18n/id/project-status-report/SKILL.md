---
name: project-status-report
language: id
description: "Tulis laporan status proyek yang terstruktur untuk proyek apa pun. Gunakan saat diminta menulis update proyek, laporan status, laporan RAG, narasi dasbor proyek, atau komunikasi proyek mingguan. Menghasilkan laporan status yang jelas dengan peringkat RAG, kemajuan milestone, risiko, dan keputusan yang dibutuhkan."
---

> Terjemahan bahasa Indonesia dari [project-status-report](../../../skills/project-status-report/SKILL.md). Versi bahasa Inggris adalah versi kanonis.

# Skill Laporan Status Proyek

Menghasilkan laporan status proyek yang jelas dan terstruktur: komunikasi mingguan yang membuat pemangku kepentingan tetap mendapat informasi tanpa perlu rapat.

## Input yang Dibutuhkan
- **Nama proyek**
- **Periode pelaporan**
- **Status RAG saat ini** (Merah / Kuning / Hijau)
- **Milestone utama** (jatuh tempo, sudah diserahkan, akan datang)
- **Masalah atau hambatan**
- **Keputusan yang dibutuhkan dari pemangku kepentingan**
- **Status anggaran** (jika dipantau)
- **Audiens** (steering committee / sponsor / PMO / seluruh tim)

## Struktur Output

---

# Laporan Status Proyek: [Nama Proyek]
**Periode:** [Rentang tanggal] | **Penulis:** [PM] | **Laporan berikutnya:** [Tanggal]

---

### Status Keseluruhan

| Dimensi | Status | Periode lalu | Tren |
|---|---|---|---|
| Keseluruhan | Merah / Kuning / Hijau | [Sebelumnya] | Membaik / Stabil / Menurun |
| Jadwal | | | |
| Anggaran | | | |
| Lingkup | | | |
| Risiko | | | |

Definisi RAG:
- Hijau: Sesuai rencana. Tidak ada masalah signifikan.
- Kuning (Amber): Berisiko. Masalah sudah teridentifikasi tetapi mitigasi sudah berjalan.
- Merah: Keluar jalur. Butuh eskalasi atau keputusan untuk pemulihan.

---

### Ringkasan Eksekutif
[3-5 kalimat. Cerita utamanya. Jika statusnya Merah, sampaikan langsung beserta alasannya. Jangan pernah mengubur kabar buruk di balik kabar baik.]

---

### Kemajuan Milestone

| Milestone | Tanggal jatuh tempo | Status | Komentar |
|---|---|---|---|
| [Milestone] | [Tanggal] | Selesai / Berisiko / Tertunda / Sesuai rencana | [Satu baris] |

**Selesai periode ini:** [Apa yang telah diserahkan]
**Jatuh tempo periode berikutnya:** [Apa yang diharapkan]

---

### Masalah dan Hambatan

**[Judul masalah] - Kritis / Tinggi / Rendah**
- **Deskripsi:** [Apa masalahnya]
- **Dampak:** [Apa yang terjadi jika tidak diselesaikan]
- **Penanggung jawab:** [Siapa yang menyelesaikan]
- **Tindakan:** [Apa yang sedang dilakukan]
- **Tanggal penyelesaian:** [Kapan akan ditutup]

---

### Risiko

| Risiko | Kemungkinan | Dampak | Mitigasi | Penanggung jawab |
|---|---|---|---|---|
| [Risiko] | T/S/R | T/S/R | [Tindakan] | [Nama] |

---

### Keputusan yang Dibutuhkan

| Keputusan | Latar belakang | Opsi | Rekomendasi | Dibutuhkan paling lambat |
|---|---|---|---|---|
| [Keputusan] | [Konteks] | [Opsi] | [Rekomendasi] | [Tanggal] |

---

### Ringkasan Anggaran

| | Anggaran | Realisasi s.d. saat ini | Proyeksi | Selisih |
|---|---|---|---|---|
| Total | £ | £ | £ | £ F/A |

---

### Rencana Periode Berikutnya
[3-5 poin spesifik: apa yang akan terjadi pada periode berikutnya]

## Aturan Penulisan
- Jangan pernah memperhalus status Merah
- Milestone bersifat biner: selesai atau belum selesai
- Keputusan harus benar-benar bisa ditindaklanjuti
- Usahakan cukup satu halaman

## Pemeriksaan Kualitas

- [ ] Status Merah disampaikan langsung (tidak dikubur setelah hal-hal positif)
- [ ] Setiap masalah punya penanggung jawab bernama dan tanggal penyelesaian
- [ ] Keputusan yang dibutuhkan benar-benar bisa ditindaklanjuti oleh audiens
- [ ] Milestone bersifat biner (selesai atau belum selesai, tidak ada "85% selesai")
- [ ] Ringkasan eksekutif bisa berdiri sendiri bagi pemangku kepentingan yang tidak membaca bagian lain

## Anti-Pola

- [ ] Jangan memberi status kesehatan proyek Hijau sambil mencantumkan hambatan kritis yang belum terselesaikan
- [ ] Jangan melaporkan kemajuan milestone dalam persentase: milestone bersifat biner, selesai atau belum selesai
- [ ] Jangan mengubur risiko di bagian bawah: jika sesuatu berisiko tinggi, tempatnya di ringkasan eksekutif
- [ ] Jangan biarkan keputusan yang dibutuhkan tanpa menyebut siapa yang harus memutuskan dan kapan batasnya
- [ ] Jangan menulis ringkasan eksekutif yang baru bisa dipahami setelah membaca laporan lengkap: ringkasan itu harus berdiri sendiri

## Contoh Frasa Pemicu
- "Buatkan laporan status proyek untuk [proyek]"
- "Buat update status RAG untuk [proyek]"
- "Tuliskan laporan steering committee untuk [proyek]"
