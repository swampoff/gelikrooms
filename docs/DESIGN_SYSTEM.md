# GelikRooms Admin / Premium UI system v3

## Brand foundation

- Primary deep navy: `#102B39`
- Primary teal: `#168283` / `#147F7E`
- Teal hover: `#12696C`
- Warm gold: `#C6A06D`
- Canvas: `#F5F7F6`
- Surface: `#FFFFFF`
- Primary text: `#1A3541`
- Muted text: `#829599`
- Border: `#E7EEEC`
- Success soft: `#E6F3EF`
- Warning soft: `#FBF1DB`
- Refund soft: `#FCF0EC`

## Typography and geometry

Font family: Manrope with DM Sans and system fallbacks. Numbers use high weight, clean tracking, and Russian-format rubles. Desktop title 30-40 px. Mobile title approximately 26 px. Components use soft corners from 10 to 21 px. Cards have thin borders and subtle shadows. Information density is balanced with generous spacing.

## Responsive layout

- Desktop: fixed 246 px navy sidebar, sticky 73 px topbar, spacious content surface.
- Tablet: cards adapt to available width; reports stack as needed.
- Mobile: bottom tab bar for overview, bookings, calendar and rooms, plus `Ещё` for other sections. Full-screen-height sheets for forms, horizontal calendar scrolling, card representation of dense tables.
- Small mobile: special width rules for 320-375 px.
- Modal actions are accessible on touch devices and use larger hit targets.

## Shared components

- Header, page title and breadcrumbs
- KPI tiles with semantic colors
- Primary teal and secondary outline buttons
- Segmented controls, status chips and filter bars
- Bookings table / mobile cards
- Month timeline calendar and blocked ranges
- Room cards and custom SVG placeholder illustration
- Form modal and booking details drawer
- Payments ledger and refundable entry indicator
- Rate periods and 7-day pricing previews
- Report horizontal meters and period selector
- Audit timeline and guest notes
- Empty states, confirmations, toasts, CSV and JSON export

## Data safety states

All interface data is illustrative. The shell displays `DEMO · V3`. Sensitive data must never be copied from production into this client prototype. No message or payment button executes a real-world action. Production must implement authorization, server validation, access logs, and consent policies.

## QA notes

The `previews/v3` directory contains **conceptual screen illustrations**, not a verified pixel-perfect browser capture of v3. Older preview files under `previews/` show the original v1. Full Chrome/Safari visual regression remains a separate pre-release requirement.