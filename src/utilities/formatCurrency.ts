const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {currency: "EUR", style: "currency"})
/*Intl.NumberFormat undefined checks where you live to check how to print the nuber. Euro is the currency; style is the symbol. */
export function formatCurrency (number: number) {
    return CURRENCY_FORMATTER.format(number)
}