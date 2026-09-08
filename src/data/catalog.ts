// The JSON data file uses a distinct basename (catalog.data.json) so that
// screens importing '../data/catalog' resolve to THIS typed accessor
// (catalog.ts) rather than the raw JSON — Metro's resolver would otherwise
// pick catalog.json over catalog.ts for a bare '../data/catalog' import.
import rawCatalog from './catalog.data.json';

/**
 * Generic, domain-agnostic content model.
 *
 * All user-facing wording lives in `catalog.json` so the app can be
 * repurposed (recharge, airline booking, shopping, ...) by editing only
 * the JSON — screens never hardcode domain-specific copy.
 */
export interface AppConfig {
  /** App / brand title shown on the login screen. */
  title: string;
  /** Short supporting line under the title. */
  tagline: string;
  /** Small badge highlighting the platform/build type (e.g. "React Native CLI Demo"). */
  platformNote: string;
  /** Currency symbol prefixed to every price, e.g. "₹" or "$". */
  currencySymbol: string;
  /** Section heading for the product list on Home. */
  listTitle: string;
  /** Primary action button label on the details screen. */
  primaryActionLabel: string;
  /** Label for the checkout button on the cart screen. */
  checkoutLabel: string;
  /** Message shown in the success alert after checkout. */
  orderSuccessMessage: string;
  /** Title shown when the cart is empty. */
  emptyCartMessage: string;
  /** Hint text shown under the empty-cart title. */
  emptyCartHint: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  /** Remote image URL. */
  image: string;
  description: string;
  category: string;
}

export interface Catalog {
  app: AppConfig;
  products: Product[];
}

const catalog: Catalog = rawCatalog;

/** Typed app configuration block (all user-facing wording). */
export const appConfig: AppConfig = catalog.app;

/** Typed list of products. */
export const products: Product[] = catalog.products;

/** Look up a single product by id. */
export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

/** Format a numeric price using the configured currency symbol. */
export function formatPrice(amount: number): string {
  return `${appConfig.currencySymbol}${amount.toLocaleString('en-IN')}`;
}

export default catalog;
