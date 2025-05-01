// Mendapatkan waktu sekarang di zona waktu Jakarta
export const jakartaTime = () => {
    const now = new Date();
    return now.toLocaleString("id-ID", { timeZone: "Asia/Jakarta" });
  };
  
  // Konversi waktu Jakarta ke UTC dalam format ISO
  export const utcTime = () => {
    const now = new Date();
    return now.toISOString(); // Otomatis dalam UTC
  };
  