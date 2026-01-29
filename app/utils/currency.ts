// Currency conversion utility using live exchange rates
// Free API: https://api.exchangerate-api.com/v4/latest/USD

interface ExchangeRates {
    [key: string]: number;
}

let cachedRates: { rates: ExchangeRates; timestamp: number } | null = null;
const CACHE_DURATION = 3600000; // 1 hour in milliseconds

/**
 * Fetch live exchange rates from API
 * Caches results for 1 hour to avoid excessive API calls
 */
async function fetchExchangeRates(): Promise<ExchangeRates> {
    const now = Date.now();

    // Return cached rates if still valid
    if (cachedRates && now - cachedRates.timestamp < CACHE_DURATION) {
        return cachedRates.rates;
    }

    try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD', {
            next: { revalidate: 3600 }, // Revalidate every hour
        });

        if (!response.ok) {
            throw new Error('Failed to fetch exchange rates');
        }

        const data = await response.json();
        const rates = data.rates as ExchangeRates;

        // Cache the rates
        cachedRates = {
            rates,
            timestamp: now,
        };

        return rates;
    } catch (error) {
        console.error('Error fetching exchange rates:', error);

        // Fallback to approximate rates if API fails
        return {
            USD: 1,
            INR: 83.12,
            EUR: 0.92,
            GBP: 0.79,
            AUD: 1.52,
            CAD: 1.35,
            SGD: 1.34,
            JPY: 149.50,
            CNY: 7.24,
        };
    }
}

/**
 * Convert amount from any currency to INR
 * @param amount - The amount to convert
 * @param fromCurrency - The source currency code (e.g., 'USD', 'EUR')
 * @returns The amount converted to INR
 */
export async function convertToINR(amount: number, fromCurrency: string): Promise<number> {
    // If already in INR, return as is
    if (fromCurrency.toUpperCase() === 'INR') {
        return amount;
    }

    const rates = await fetchExchangeRates();

    // Get the rate for the source currency relative to USD
    const fromRate = rates[fromCurrency.toUpperCase()] || 1;

    // Get the INR rate relative to USD
    const inrRate = rates['INR'] || 83.12;

    // Convert: amount in source currency -> USD -> INR
    const amountInUSD = amount / fromRate;
    const amountInINR = amountInUSD * inrRate;

    return Math.round(amountInINR * 100) / 100; // Round to 2 decimal places
}

/**
 * Convert multiple amounts to INR
 * @param items - Array of {amount, currency} objects
 * @returns Total amount in INR
 */
export async function convertMultipleToINR(
    items: Array<{ amount: number; currency: string }>
): Promise<number> {
    const rates = await fetchExchangeRates();
    const inrRate = rates['INR'] || 83.12;

    let totalInUSD = 0;

    for (const item of items) {
        if (item.currency.toUpperCase() === 'INR') {
            // Convert INR to USD first, then add to total
            totalInUSD += item.amount / inrRate;
        } else {
            const fromRate = rates[item.currency.toUpperCase()] || 1;
            totalInUSD += item.amount / fromRate;
        }
    }

    // Convert total USD to INR
    return Math.round(totalInUSD * inrRate * 100) / 100;
}

/**
 * Format currency amount with symbol
 */
export function formatINR(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(amount);
}
