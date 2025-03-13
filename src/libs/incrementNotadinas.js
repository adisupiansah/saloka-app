 export const incrementNomorNotaDinas = (lastnumber) => {
    const format = /B\/ND-(\d+)\//;  // fokus penambahahan di  antara B/-ND
    const match = lastnumber.match(format); 

    // jika tidak ada match
    if (!match) {
        throw new Error("Format nomor tidak sesuai");
    }

    const number = parseInt(match[1], 10) + 1; // penambahan angka
    const padingNumber = String(number).padStart(2, "0"); // penambahan 0 di depan angka

    // ganti hanya baggian angka dalam format
    return lastnumber.replace(format, `B/ND-${padingNumber}/`);
}   
