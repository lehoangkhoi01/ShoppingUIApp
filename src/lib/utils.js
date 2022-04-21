export const formatPriceWithSymbol = (price) => {
    return "$" + parseFloat(price).toFixed(2);
}