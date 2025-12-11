<!DOCTYPE html>
<html>
<head>
  <title>Material Keluar</title>
  <script src="script.js"></script>
</head>

<body>
  <h2>Input Material Keluar</h2>

  <form id="formKeluar">
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

  document.getElementById("formKeluar").addEventListener("submit", function(e){
    e.preventDefault();
    tambahKeluar(
      document.getElementById("material").value,
      Number(document.getElementById("jumlah").value),
      document.getElementById("lokasi").value
    );
    alert("Material keluar tersimpan!");
  });
</script>
</body>
</html>

