// ========================
//  Utility Function
// ========================
function formatDate(date) {
  return date.toLocaleString("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

// ========================
//  Contoh Class
// ========================
class App {
  constructor() {
    this.titleElement = document.getElementById("title");
    this.button = document.getElementById("btn");
    this.clickCount = 0;

    this.initEvents();
    this.showWelcome();
  }

  // Tampilkan pesan awal
  showWelcome() {
    console.log("Aplikasi dimulai pada:", formatDate(new Date()));
  }

  // Event listener
  initEvents() {
    this.button.addEventListener("click", () => this.onButtonClick());
  }

  // Aksi ketika tombol diklik
  onButtonClick() {
    this.clickCount++;
    this.titleElement.textContent = `Tombol diklik ${this.clickCount} kali`;
  }
}

// ========================
//  Jalankan aplikasi
// ========================
document.addEventListener("DOMContentLoaded", () => {
  const app = new App();
});
