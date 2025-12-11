<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Dashboard</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"/>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet"/>
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="dashboard.css">
</head>
<body>
  <div class="dashboard-container">
    <!-- Sidebar (sama seperti punya kamu) -->
    <div class="sidebar"> 
      <div class="sidebar-header">
          <img alt="Logo" class="sidebar-logo" src="https://housedesigninnepal.com/wp-content/uploads/2025/08/Construction-Calculator-LOGO.png?utm_source=chatgpt.com">
          <h1 class="sidebar-title">PORTABLE MATERIAL TRACKER</h1>
      </div>
      <nav class="sidebar-nav">
        <ul>
          <li class="nav-item active"><a href="dashboard.php" class="nav-link"><i class="fas fa-tachometer-alt me-2"></i>Dashboard</a></li>
          <li class="nav-item"><a href="material.php" class="nav-link"><i class="fas fa-box me-2"></i>Material</a></li>
          <li class="nav-item"><a href="stok.php" class="nav-link"><i class="fas fa-warehouse me-2"></i>Stok</a></li>
          <li class="nav-item"><a href="masuk.php" class="nav-link"><i class="fas fa-sign-in-alt me-2"></i>Material Masuk</a></li>
          <li class="nav-item"><a href="keluar.php" class="nav-link"><i class="fas fa-sign-out-alt me-2"></i>Material Keluar</a></li>
        </ul>
      </nav>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <header class="main-header">
        <div class="header-content">
          <h2 class="page-title"><i class="fas fa-home me-2"></i>Home &gt; Dashboard</h2>
          <div class="header-actions">
            <button class="btn btn-outline-primary me-2"><i class="fas fa-info-circle me-1"></i>About</button>
            <button class="btn btn-outline-danger" id="logoutBtn" onclick="location.href='../index.php'"><i class="fas fa-sign-out-alt me-1"></i>Logout</button>
          </div>
        </div>
      </header>

      <!-- Stats Cards -->
      <div class="stats-container">
        <div class="row g-3">
          <div class="col-md-3">
            <div class="stat-card stat-card-orange">
              <div class="stat-icon"><i class="fas fa-users"></i></div>
              <div class="stat-content">
                <h3 class="stat-title">Jumlah Karyawan</h3>
                <p class="stat-value">15</p>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="stat-card stat-card-green">
              <div class="stat-icon"><i class="fas fa-boxes"></i></div>
              <div class="stat-content">
                <h3 class="stat-title">Jumlah Material</h3>
                <p id="totalMaterial" class="stat-value">0</p>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="stat-card stat-card-blue">
              <div class="stat-icon"><i class="fas fa-exchange-alt"></i></div>
              <div class="stat-content">
                <h3 class="stat-title">Total Transaksi</h3>
                <p id="totalTransaksi" class="stat-value">0</p>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="stat-card stat-card-purple">
              <div class="stat-icon"><i class="fas fa-money-bill-wave"></i></div>
              <div class="stat-content">
                <h3 class="stat-title">Nilai Inventory</h3>
                <p class="stat-value">Rp 10.000</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Transactions -->
      <div class="content-section">
        <div class="section-header d-flex justify-content-between align-items-center">
          <h3 class="section-title"><i class="fas fa-list me-2"></i>Riwayat Transaksi Terbaru</h3>
          <div class="w-25"><input type="text" class="form-control search-input" id="searchTransaksi" placeholder="Cari/Filter transaksi..."></div>
        </div>

        <div class="table-responsive mt-3">
          <table class="table table-striped table-hover">
            <thead class="table-dark">
              <tr>
                <th>No</th>
                <th>Waktu Transaksi</th>
                <th>Jenis Transaksi</th>
                <th>Nama Material</th>
                <th>Jumlah</th>
                <th>Lokasi</th>
                <th>Status</th>
                <th>Stok Akhir</th>
              </tr>
            </thead>
            <tbody id="tabelTransaksi">
              <!-- diisi oleh script.js -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <!-- bootstrap -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
  <script src="script.js"></script>
  <script>
    // inisialisasi sample data jika kosong
    initSampleData();

    const tbody = document.getElementById("tabelTransaksi");
    const totalMaterialEl = document.getElementById("totalMaterial");
    const totalTransaksiEl = document.getElementById("totalTransaksi");
    renderDashboard(tbody, totalMaterialEl, totalTransaksiEl);

    // search/filter sederhana
    document.getElementById("searchTransaksi").addEventListener("input", function(e){
      const q = e.target.value.toLowerCase();
      const all = getTransaksi();
      const mats = getMaterials();
      const filtered = all.filter(t => {
        const m = mats.find(x => x.id === t.materialId);
        return (m && m.nama.toLowerCase().includes(q)) ||
               t.jenis.toLowerCase().includes(q) ||
               (t.lokasi && t.lokasi.toLowerCase().includes(q)) ||
               (t.status && t.status.toLowerCase().includes(q));
      });
      // render filtered
      const rows = filtered
        .sort((a,b)=> new Date(b.waktu)-new Date(a.waktu))
        .map((t, idx) => {
          const m = mats.find(x => x.id===t.materialId) || {nama:"-", satuan:""};
          const waktu = new Date(t.waktu).toLocaleString();
          const jenisBadge = t.jenis === "Masuk" ? 'success' : 'danger';
          const statusBadge = t.status === "Selesai" ? 'success' : 'warning text-dark';
          const stokAkhir = (m.stok !== undefined) ? `${m.stok} ${m.satuan}` : "-";
          return `
            <tr>
              <td>${idx+1}</td>
              <td>${waktu}</td>
              <td><span class="badge bg-${jenisBadge}">${t.jenis}</span></td>
              <td>${m.nama}</td>
              <td>${t.jumlah} ${m.satuan}</td>
              <td>${t.lokasi||"-"}</td>
              <td><span class="badge bg-${statusBadge}">${t.status}</span></td>
              <td>${stokAkhir}</td>
            </tr>
          `;
        }).join("");
      tbody.innerHTML = rows;
    });
  </script>
</body>
</html>


