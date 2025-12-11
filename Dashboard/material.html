<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Material</title>
  <link rel="stylesheet" href="style.css">
  <script src="script.js"></script>
</head>

<body>
  <h2>Data Material</h2>

  <form id="addForm">
    <input type="text" id="nama" placeholder="Nama Material" required>
    <input type="text" id="satuan" placeholder="Satuan (kg, sak, batang)" required>
    <button type="submit">Tambah</button>
  </form>

  <table border="1" width="100%">
    <thead>
      <tr>
        <th>No</th>
        <th>Nama Material</th>
        <th>Satuan</th>
        <th>Stok</th>
        <th>Aksi</th>
      </tr>
    </thead>
    <tbody id="materialBody"></tbody>
  </table>

<script>
  function render() {
    const data = getMaterials();
    document.getElementById("materialBody").innerHTML =
      data.map((m,i)=>`
        <tr>
          <td>${i+1}</td>
          <td>${m.nama}</td>
          <td>${m.satuan}</td>
          <td>${m.stok}</td>
          <td><button onclick="hapus(${m.id})">Hapus</button></td>
        </tr>
      `).join("");
  }

  document.getElementById("addForm").addEventListener("submit", function(e){
    e.preventDefault();
    addMaterial(
      document.getElementById("nama").value,
      document.getElementById("satuan").value
    );
    render();
  });

  function hapus(id){
    if(confirm("Hapus material ini?")) {
      deleteMaterial(id);
      render();
    }
  }

  render();
</script>
</body>
</html>



