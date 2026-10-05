---
name: company-tailored-cv
language: id
description: "Buat CV yang dibentuk untuk satu perusahaan dan posisi sasaran: applicant tracking system yang dipakai, konvensi negara, norma sektor, nilai-nilai yang dipublikasikan, dan iklan lowongan, dengan setiap pilihan dijelaskan. Gunakan saat diminta menulis CV saya untuk perusahaan tertentu, menyesuaikan CV saya untuk Google, Amazon, atau pemberi kerja mana pun yang disebut namanya, menyesuaikan CV saya dengan format perusahaan ini, atau mengubah pengalaman saya menjadi CV untuk lowongan ini. Menghasilkan CV yang disesuaikan, alasan format singkat yang mengutip sumber publik beserta tanggalnya, dan daftar klaim yang harus siap dipertahankan orang tersebut. Tidak pernah mengarang pengalaman atau informasi orang dalam."
version: 1.0.0
---

> Terjemahan bahasa Indonesia dari [company-tailored-cv](../../../skills/company-tailored-cv/SKILL.md). Versi bahasa Inggris adalah versi kanonis.

# CV yang Disesuaikan per Perusahaan

Hampir tidak ada perusahaan yang memublikasikan format CV. Yang sebenarnya menentukan CV yang tepat untuk sebuah perusahaan adalah lima hal: applicant tracking system yang dipakai, konvensi negaranya, norma sektornya, nilai-nilai yang dipublikasikannya, dan iklan lowongannya. Skill ini menelusuri kelimanya dari informasi publik dan pengalaman orang tersebut sendiri, lalu menulis satu CV untuk satu lamaran.

Skill inti dari bundle pm-cv. Membaca output `career-inventory` jika ada.

## Apa yang Dihasilkan Skill Ini

- **CV yang disesuaikan**, siap ditempel atau diekspor dengan `cv-docx-export`
- **Alasan format**: kelima faktor, apa yang diubah oleh masing-masing, dan sumber publik untuk tiap faktor, beserta tanggal pengecekan
- **Peta kata kunci**: persyaratan dari iklan lowongan dan bagian CV mana yang menjawab masing-masing
- **Daftar yang harus dipertahankan**: setiap klaim yang kemungkinan akan digali pewawancara, beserta bukti di baliknya

## Input yang Dibutuhkan

Tanyakan jika belum diberikan:
- **Pengalaman orang tersebut**: file `career-inventory`, CV yang sudah ada, atau jawaban dari wawancara singkat
- **Perusahaan dan posisi sasaran**
- **Iklan lowongan**: tautan atau teks lengkapnya. Tanpa itu, sampaikan bahwa CV akan bersifat generik dan tanyakan sekali lagi
- **Negara tempat posisi tersebut**, yang bisa berbeda dari negara asal perusahaan
- **Apa pun yang ingin dirahasiakan**: pemberi kerja saat ini, jeda karier, status visa

## Kerangka: Lima Faktor

Telusuri dengan urutan ini, dan catat sumber masing-masing.

1. **Applicant tracking system.** Baca tautan lamarannya. Gunakan aturan `ats-detector`: `myworkdayjobs.com` adalah Workday, `boards.greenhouse.io` adalah Greenhouse, `jobs.lever.co` adalah Lever, dan seterusnya. Jika tidak diketahui, asumsikan parser yang ketat: satu kolom, judul bagian standar, tanpa tabel, teks bukan gambar.
2. **Negara.** Terapkan `country-cv-format`: panjang, foto, data pribadi, format tanggal, ejaan, ukuran kertas.
3. **Sektor.** Konsultan dan perbankan menginginkan satu halaman dengan pendidikan di awal. Akademisi menginginkan CV lengkap. Posisi pemerintahan mungkin mensyaratkan formulir tertentu. Startup menginginkan bukti keluasan kemampuan dan kecepatan.
4. **Nilai-nilai yang dipublikasikan.** Jika perusahaan memublikasikan nilai atau prinsip, gunakan `values-mapped-cv` untuk memilih pencapaian mana yang ditampilkan lebih dulu. Kutip halamannya dan tanggalnya. Jika tidak ada, lewati faktor ini dan sebutkan.
5. **Iklan lowongan.** Ambil syarat wajib dan syarat tambahannya. Setiap syarat wajib dijawab di separuh atas halaman pertama, dengan kata-kata dari iklan itu sendiri bila pengalaman orang tersebut benar-benar sesuai.

Lalu tulis:
- **Ringkasan**: tiga baris, jabatan sesuai iklan, lama pengalaman, dua bukti terkuat
- **Pengalaman**: terbaru di atas; tiga sampai lima poin per peran terbaru, dipilih untuk iklan ini; peran lama dipersingkat
- **Keahlian**: hanya yang memiliki bukti di bagian pengalaman
- **Pendidikan dan lainnya**: dengan urutan yang lazim di negara dan sektor tersebut

Jika akses web tidak tersedia, sampaikan hal itu, minta orang tersebut menempelkan iklan lowongan dan halaman nilai perusahaan, dan jangan menebak keduanya.

## Format Output

### Tailored CV: [name] for [role], [company]

**1. CV-nya** (lengkap, dalam teks biasa atau markdown yang terkonversi dengan rapi)

**2. Alasan format**
| Faktor | Wujudnya untuk lamaran ini | Apa yang diubah | Sumber, tanggal dicek |

**3. Peta kata kunci**
| Persyaratan dari iklan | Wajib atau tambahan | Dijawab oleh | Kekuatan: langsung / berdekatan / tidak ada |

**4. Daftar yang harus dipertahankan**
| Klaim di CV | Pertanyaan yang mungkin muncul | Bukti yang perlu disiapkan |

**5. Persyaratan yang belum terpenuhi**: celah yang jujur, masing-masing dengan pembingkaian jujur terbaik atau "jangan diklaim"

## Pemeriksaan Kualitas
- [ ] Setiap syarat wajib dari iklan dijawab atau dicantumkan sebagai belum terpenuhi
- [ ] Setiap faktor dalam alasan format memiliki sumber dan tanggal, atau menyebut "tidak dipublikasikan"
- [ ] Tidak ada pengalaman, jabatan, tanggal, atau angka yang muncul tanpa diberikan oleh orang tersebut
- [ ] Layout mengikuti aturan tracking system: satu kolom, judul bagian standar, tanpa tabel atau gambar
- [ ] Data pribadi mengikuti aturan negara tersebut, termasuk apa yang harus dihilangkan
- [ ] Daftar yang harus dipertahankan mencakup setiap angka di CV

## Anti-Pola
- **Mengklaim "format" perusahaan yang sebenarnya tidak ada.** Sebutkan apa yang disimpulkan dan dari mana.
- **Menjejalkan kata kunci.** Gunakan kata-kata dari iklan hanya jika pengalamannya benar-benar sesuai. Penyaring maupun pewawancara akan menyadarinya.
- **Mengarang untuk menutup celah.** Cantumkan celahnya dengan pembingkaian yang jujur.
- **Menyalin nilai perusahaan sebagai kata sifat.** "Customer-obsessed" tidak membuktikan apa pun. Pencapaian yang menunjukkannya, itulah buktinya.
- **Satu CV untuk semua lamaran.** Skill ini sengaja menulis satu CV untuk satu lowongan.
- **Menuliskan fakta perusahaan dari ingatan.** Tracking system, nilai perusahaan, dan iklan lowongan berubah. Periksa setiap kali dan cantumkan tanggalnya.

## Contoh Frasa Pemicu
- "Tuliskan CV saya untuk posisi senior product manager di Monzo. Ini iklan lowongannya."
- "Sesuaikan CV saya untuk lowongan Amazon ini, dengan format apa pun yang mereka harapkan."
- "Saya sudah punya career inventory. Buatkan CV untuk posisi di Siemens, Munich ini."
- "Ubah pengalaman saya menjadi CV untuk perusahaan ini."
