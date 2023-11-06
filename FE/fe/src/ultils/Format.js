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

export function getDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    return today
}
export const formatDate = (date) => {
    const originalDate = new Date(date);
    const day = originalDate.getDate().toString().padStart(2, '0');
    const month = (originalDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based, so we add 1.
    const year = originalDate.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate
}