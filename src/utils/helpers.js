/**
 * returns a properly formatted price to avoid any issues with prices/money
 * @param {*} price price from API
 * @returns formatted price
 */
export const formatPrice = (price) => {
    const newPrice = Intl.NumberFormat('en-CA', {
        style: 'currency',
        currency: 'CAD'
    }).format(price / 100)
    return newPrice
};

export const getUniqueValues = (data, type) => {
    let types = data.map((item) => {
        return item[type]
    });

    // handling the colors arrys
    if (type === 'colors') {
        types = types.flat()
    }
    return ['all', ...new Set(types)] // set to remove duplicates
};
