# Privacy Note — Flashcard Quiz App

## Summary

The Flashcard Quiz App does **not** collect, transmit, or share any personal data. All information you enter stays on your device.

---

## What Data the App Handles

| Data | Where It's Stored | Who Can Access It |
|------|-------------------|-------------------|
| Flashcard questions and answers | Browser `localStorage` | You only (local device) |
| Quiz scores | Browser memory (session only) | You only — cleared on refresh |
| User identity | Not collected | N/A |

---

## Detailed Breakdown

### Flashcard Content
- Questions and answers are saved to `localStorage` on your browser.
- This data never leaves your device.
- Clearing your browser data or using private/incognito mode will erase it.

### Quiz Results
- Quiz scores are held in React component state only.
- They are not written to `localStorage` and are lost when the page is refreshed or closed.
- No result data is sent anywhere.

### No Accounts or Tracking
- The app has no login system.
- No cookies are set for tracking or analytics purposes.
- No third-party analytics services (e.g., Google Analytics) are integrated.

---

## Third-Party Libraries and Privacy

The app uses third-party JavaScript libraries (React, Testing Library, web-vitals) solely for UI rendering and development testing. These libraries do not collect or transmit user data in this application's configuration.

See [ip-and-attribution.md](ip-and-attribution.md) for a full list of libraries.

---

## Future Considerations

If a backend, user accounts, or cloud sync feature is added in a future release:

- Users must be presented with a clear, plain-language privacy policy before any data is transmitted.
- Explicit opt-in consent must be obtained before storing data remotely.
- The app must comply with applicable data protection regulations (e.g., GDPR, PDPA, or equivalent).

---

## Contact

For questions about data handling, contact the development team at: pendon.josephjr@gmail.com

---

*Last updated: 2026-05-07*
