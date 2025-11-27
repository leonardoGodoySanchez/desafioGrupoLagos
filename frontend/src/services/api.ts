const API_URL = "http://localhost:8000";

export const api = {
  async getProducts() {
    const res = await fetch(`${API_URL}/products`);
    return res.json();
  },

  async getProduct(barcode: string) {
    const res = await fetch(`${API_URL}/products/${barcode}`);
    return res.json();
  },

  async getSubstitutes(barcode: string) {
    const res = await fetch(`${API_URL}/products/${barcode}/substitutes`);
    return res.json();
  },

  async optimizeList(payload: any) {
    const res = await fetch(`${API_URL}/optimize`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.json();
  }
};
