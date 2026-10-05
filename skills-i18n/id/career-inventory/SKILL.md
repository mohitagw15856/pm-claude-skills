---
name: career-inventory
language: id
description: "Wawancarai seseorang tentang perjalanan kariernya dan ubah jawabannya menjadi inventaris CV induk: setiap peran, proyek, dan pencapaian dengan angka nyata, sebelum CV apa pun disesuaikan. Gunakan saat diminta membuat CV induk saya, mencatat pengalaman saya dengan benar, saat seseorang bilang 'saya tidak tahu harus menulis apa di CV', atau sebagai langkah pertama sebelum CV yang disesuaikan. Menghasilkan inventaris terstruktur berisi peran, pencapaian dalam bentuk baku dengan bukti dan angka, keahlian beserta buktinya, dan daftar celah yang perlu dilengkapi. Tidak pernah mengarang angka."
version: 1.0.0
---

> Terjemahan bahasa Indonesia dari [career-inventory](../../../skills/career-inventory/SKILL.md). Versi bahasa Inggris adalah versi kanonis.

# Inventaris Karier

Kebanyakan CV yang lemah sebenarnya lemah di bahan mentahnya, bukan di penulisannya. Orang mengingat tugas, bukan hasil, dan mereka meremehkan angka yang sebenarnya mereka ketahui. Skill ini mewawancarai orang tersebut, satu peran demi satu peran, dan membangun inventaris induk yang menjadi sumber bagi setiap CV yang disesuaikan.

Langkah pertama dari bundle pm-cv. `company-tailored-cv` dan skill-skill format membaca output-nya.

## Apa yang Dihasilkan Skill Ini

- **Inventaris induk**: setiap peran beserta periode, cakupan, dan pencapaian di dalamnya
- **Pencapaian dalam satu bentuk**: apa yang berubah, seberapa besar, lewat tindakan apa, dengan bukti apa
- **Keahlian beserta bukti**: setiap keahlian dikaitkan dengan tempat ia digunakan, bukan daftar kata kunci kosong
- **Daftar celah**: angka dan fakta yang sebenarnya bisa dicari orang tersebut tetapi belum dicari
- **File tersimpan** (`career-inventory.md`) agar wawancara tidak perlu diulang

## Input yang Dibutuhkan

Tanyakan jika belum diberikan:
- **Apa yang sudah ada**: CV lama, ekspor LinkedIn, atau tidak ada sama sekali
- **Peran yang akan dicakup**: mulai dari sepuluh tahun terakhir kecuali orang tersebut meminta lain
- **Apakah untuk pindah arah karier**, karena itu mengubah apa yang layak digali

## Kerangka: Wawancaranya

Kerjakan satu peran pada satu waktu, dari yang terbaru. Untuk setiap peran tanyakan, dengan urutan ini:

1. **Cakupan**: ukuran tim, anggaran, pengguna, pendapatan, atau volume yang menjadi tanggung jawab Anda
2. **Kondisi sebelumnya**: apa yang rusak, lambat, kurang, atau berisiko saat Anda datang
3. **Apa yang Anda lakukan**: keputusan dan tindakan yang merupakan milik Anda, bukan milik tim
4. **Kondisi sesudahnya**: apa yang berubah, dan bagaimana orang bisa melihatnya
5. **Angkanya**: jika ada. Jika tidak, tanyakan proksi jujur yang paling dekat (waktu yang dihemat, jumlah, persentase, peringkat, sebelum dan sesudah)
6. **Buktinya**: dokumen, dashboard, kutipan, penghargaan, referensi

Aturan penggalian:
- Tanyakan "bagaimana Anda tahu?" sekali untuk setiap hasil yang diklaim. Pertanyaan ini mengubah kata sifat menjadi bukti.
- Terima jawaban "saya tidak tahu angkanya". Catat di daftar celah beserta tempat mencarinya.
- Pisahkan "saya" dari "kami". Keduanya boleh di CV; orang tersebut harus tahu mana yang mana.
- Satu pencapaian per jawaban. Pecah jawaban yang bertumpuk.

Bentuk pencapaian:
**[Hasil, dengan angka] lewat [tindakan yang Anda ambil], [konteks atau kendala].** Bukti: [sumber].

## Format Output

### Career inventory: [name], updated [date]

**Role: [title], [organisation], [start] to [end]**
- Cakupan: [tim, anggaran, pengguna, volume]
- Pencapaian:
  1. [pencapaian dalam bentuk di atas] · Bukti: [sumber] · Keyakinan: terkonfirmasi / estimasi / perlu dicari
- Keahlian yang dipakai di sini: [keahlian, dengan nomor pencapaian yang membuktikannya]

(ulangi untuk setiap peran)

**Indeks keahlian**: | Keahlian | Terbukti di | Contoh terkuat |

**Celah yang perlu dilengkapi**: | Fakta yang dibutuhkan | Peran | Tempat mencarinya |

**Langkah berikutnya**: "Jalankan `company-tailored-cv` dengan inventaris ini dan lowongan yang Anda lamar."

## Pemeriksaan Kualitas
- [ ] Setiap pencapaian memuat tindakan yang diambil sendiri oleh orang tersebut
- [ ] Setiap angka ditandai terkonfirmasi, estimasi, atau perlu dicari
- [ ] Tidak ada angka yang muncul tanpa diberikan oleh orang tersebut
- [ ] Setiap keahlian di indeks merujuk ke setidaknya satu pencapaian
- [ ] Daftar celah ada, meskipun pendek

## Anti-Pola
- **Mengarang atau membulatkan angka ke atas.** Estimasi diberi label estimasi. Angka yang hilang masuk ke daftar celah.
- **Mencatat tugas.** "Bertanggung jawab atas pelaporan" adalah deskripsi pekerjaan, bukan pencapaian. Tanyakan apa yang berubah.
- **Mewawancarai semua peran sekaligus.** Satu peran pada satu waktu menghasilkan detail; rentetan pertanyaan hanya menghasilkan ringkasan.
- **Menyesuaikan terlalu dini.** Inventaris bersifat lengkap dan netral. Penyesuaian dilakukan belakangan, per lowongan.
- **Sanjungan.** Akurat lebih berguna daripada mengesankan. Pewawancara akan menguji setiap baris.

## Contoh Frasa Pemicu
- "Bantu saya mencatat semua pengalaman saya sebelum menulis CV."
- "Saya selalu bingung mau menulis apa di CV. Wawancarai saya."
- "Buatkan CV induk saya dari CV lama dan profil LinkedIn saya."
- "Saya mau pindah karier. Sebenarnya apa saja yang sudah saya capai?"
