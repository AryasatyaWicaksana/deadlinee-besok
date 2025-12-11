<!DOCTYPE html>
<html>
<head>
  <title>Material Masuk</title>
  <script src="script.js"></script>
</head>

<body>
  <h2>Input Material Masuk</h2>

  <form id="formMasuk">
    <select id="material"></select>
    <input type="number" id="jumlah" placeholder="Jumlah" required>
    <input type="text" id="lokasi" placeholder="Lokasi" required>
    <button type="submit">Simpan</button>
  </form>

<script>
  function loadMaterial(){
    const mats = getMaterials();
    document.getElementById("material").innerHTML =
      mats.map(m=>`<option value="${m.id}">${m.nama}</option>`).join("");
  }
  loadMaterial();

  document.getElementById("formMasuk").addEventListener("submit", function(e){
    e.preventDefault();
    tambahMasuk(
      document.getElementById("material").value,
      Number(document.getElementById("jumlah").value),
      document.getElementById("lokasi").value
    );
    alert("Berhasil disimpan!");
  });
</script>
</body>
</html>






