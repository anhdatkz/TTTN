export function formatTien(n, currency) {
    return n.toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, "$1,") + currency;
}

export function caculate(data) {
    // return (data.gia - data.gia * data.ctGiamGiaLSP[0].phantram / 100)
    return (data.gia - data.gia * data.ctGiamGiaLSP[0].phantram / 100)
}

export const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

export const formatDate = (date) => {
    const originalDate = new Date("2022-12-31T17:00:00.000+00:00");
    const day = originalDate.getDate().toString().padStart(2, '0');
    const month = (originalDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based, so we add 1.
    const year = originalDate.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate
}

export let modalStyle = {
    display: 'block',
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
}
