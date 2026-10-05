---
name: sop-writer
language: id
description: "Tulis Standard Operating Procedure (SOP) untuk tugas operasional apa pun. Gunakan saat diminta menulis SOP, prosedur operasi standar, instruksi kerja, atau manual operasional. Menghasilkan SOP formal dengan tujuan, ruang lingkup, langkah prosedur, pemeriksaan kualitas, dan kontrol versi."
---

> Terjemahan bahasa Indonesia dari [sop-writer](../../../skills/sop-writer/SKILL.md). Versi bahasa Inggris adalah versi kanonis.

# Skill Penulis SOP

Menghasilkan SOP formal yang siap diaudit, cocok untuk industri yang diregulasi, sertifikasi ISO, atau penskalaan operasional.

## Input yang Dibutuhkan
- **Judul SOP** (mis. "SOP-001: Onboarding Klien Baru")
- **Departemen / fungsi**
- **Deskripsi proses**
- **Standar regulasi atau mutu** (ISO 9001, GMP/CPOB, CQC, FCA, dll.)
- **Peran yang terlibat**
- **Alat atau peralatan yang digunakan**

## Struktur Output

---

**[NAMA PERUSAHAAN] - Standard Operating Procedure**

| ID Dokumen | [SOP-XXX] |
|---|---|
| Judul | [Judul] |
| Departemen | [Departemen] |
| Versi | 1.0 |
| Tanggal berlaku | [Tanggal] |
| Tanggal tinjauan | [Tanggal] |
| Status | Draf / Dalam tinjauan / Disetujui |

---

### 1. Tujuan
[1-2 kalimat. Mengapa SOP ini ada?]

### 2. Ruang Lingkup
**Berlaku untuk:** [Peran, departemen, lokasi]
**Tidak berlaku untuk:** [Pengecualian yang eksplisit]

### 3. Definisi
| Istilah | Definisi |
|---|---|
| [Istilah] | [Definisi dalam bahasa sederhana] |

### 4. Tanggung Jawab
| Peran | Tanggung jawab |
|---|---|
| [Peran] | [Tanggung jawab spesifik] |

### 5. Bahan / Alat / Akses yang Dibutuhkan
- [Item]

### 6. Prosedur

| Langkah | Tindakan | Penanggung jawab | Catatan/Output |
|---|---|---|---|
| 6.1.1 | [Tindakan dalam bentuk perintah: "Buka [sistem] lalu masuk ke [lokasi]"] | [Peran] | [Apa yang dicatat] |

CATATAN: Langkah harus ditulis dalam bentuk kalimat perintah. Setiap langkah hanya boleh berisi satu tindakan.

### 7. Pemeriksaan Kualitas

| Titik pemeriksaan | Apa yang diverifikasi | Kriteria lolos | Jika gagal |
|---|---|---|---|
| [Setelah langkah X] | [Apa yang diperiksa] | [Seperti apa hasil yang baik] | [Apa yang harus dilakukan] |

### 8. Ketidaksesuaian (Non-Conformance)
1. [Tindakan segera]
2. [Siapa yang harus diberi tahu]
3. [Cara mendokumentasikan penyimpangan]

### 9. Referensi
[SOP, kebijakan, dan standar terkait]

### 10. Riwayat Dokumen

| Versi | Tanggal | Penulis | Perubahan |
|---|---|---|---|
| 1.0 | [Tanggal] | [Nama] | Rilis awal |

## Pemeriksaan Kualitas
- [ ] Semua langkah ditulis dalam bentuk perintah ("Buka...", "Masuk ke...", "Konfirmasi...")
- [ ] Setiap langkah berisi tepat satu tindakan
- [ ] Peran ditentukan untuk setiap langkah
- [ ] Ada titik pemeriksaan kualitas di tahap-tahap kritis
- [ ] Proses ketidaksesuaian menetapkan siapa yang diberi tahu dan cara mendokumentasikannya
- [ ] Tabel riwayat dokumen dan tanggal tinjauan disertakan

## Contoh Frasa Pemicu
- "Buatkan SOP untuk [proses]"
- "Susun prosedur operasi standar untuk [tugas]"
- "Tuliskan instruksi kerja untuk [proses]"

## Anti-Pola

- [ ] Jangan menulis langkah yang berisi lebih dari satu tindakan: setiap langkah harus berupa satu tindakan tunggal yang bisa diaudit, dalam bentuk perintah
- [ ] Jangan menghilangkan peran dari langkah mana pun: setiap tindakan harus ditugaskan ke peran tertentu, atau SOP tidak bisa ditegakkan
- [ ] Jangan melewatkan bagian ketidaksesuaian: SOP tanpa proses penanganan penyimpangan tidak bisa memenuhi persyaratan audit atau regulasi
- [ ] Jangan menghasilkan SOP tanpa tanggal tinjauan dan riwayat versi: dokumen tanpa tanggal tidak bisa diandalkan untuk kepatuhan
- [ ] Jangan memakai kalimat pasif dalam langkah prosedur: tulis "Buka sistem", bukan "Sistem sebaiknya dibuka"
