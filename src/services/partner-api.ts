
export class PartnerApiService {
  private static baseUrl = process.env.NEXT_PUBLIC_API_URL || "/api";

  static async subscribeToNewsletter(
    email: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/newsletter/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Newsletter API Error:", error);
      throw new Error("Failed to subscribe to newsletter.");
    }
  }
}
