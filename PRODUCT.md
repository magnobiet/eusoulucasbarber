# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Three confirmed audiences, all arriving on a phone and all wanting to reach Lucas quickly:

- **New client from Instagram.** Taps the link in the `@eusoulucasbarber` bio. Does not know Lucas yet and is deciding whether to book.
- **Returning client.** Already cuts with Lucas. Uses the page as a shortcut to rebook, check the hours, or find the address.
- **Referral or QR code.** Got the link from someone or scanned a code on a card or at the chair. Arrives with a recommendation but little other context.

Google local search was offered as an audience and not selected; it is not a primary entry point.

## Product Purpose

A single-page link hub for Lucas Xavier, a barber in Caxias do Sul, RS. It turns a visit into a WhatsApp conversation to book a time, and gives clients one place to save his contact, open his Instagram, find the address, and see his hours.

Success is a visitor starting the booking conversation on WhatsApp. Saving the contact is the secondary outcome.

## Positioning

Personal brand. The client chooses Lucas, not a salon: his name and the relationship with him are the product. The page represents one person, not a barbershop with a rotating team.

## Operating Context

- Booking is by appointment only ("Atendimento com hora marcada") and happens in WhatsApp, not on the page. The primary action opens a chat with a prefilled message asking about availability.
- Instagram (`@eusoulucasbarber`) is both an entry point and where his work is shown.
- Location: Av. Rio Branco, 588 - Rio Branco, Caxias do Sul, RS. Maps link: `https://maps.app.goo.gl/krQih7gZrjmCiw2SA`.
- Hours: Segunda a Sábado, das 09h às 20h.
- Phone / WhatsApp: +55 54 99190-9175.

## Capabilities and Constraints

- Content language is pt-BR.
- Current capabilities: book via WhatsApp, save contact as vCard, share the page, open Instagram, open the address in Maps, read operating hours. Installable as a PWA with a service worker; generated Open Graph image.
- Services offered: corte de cabelo, barba, visagismo masculino.
- Business facts (name, tagline, bio, phone, booking message, address, maps link, hours) live in `src/config/config.ts`, validated by `src/config/schema.ts`. Components read from it; do not hardcode them in markup.
- The contact card is served at `/contato.vcf`.
- Undecided: whether the page grows beyond a link hub (price list, gallery, online scheduling). Nothing in the product commits to these today.

## Brand Commitments

- Name: Lucas Xavier. Title: Barbeiro. Handle: `@eusoulucasbarber`.
- Monogram "LX", source at `favicon/logo.svg`.
- Existing descriptor copy: "Corte de cabelo, barba e visagismo masculino em Caxias do Sul. Atendimento com hora marcada."

## Evidence on Hand

- Profile photo: `public/profile.jpg`.
- Logo and generated icons: `favicon/logo.svg`, `public/favicon.*`, `public/web-app-manifest-*.png`.
- Not on hand, and not to be fabricated: testimonials or reviews, prices, service durations, photos of finished cuts, client counts, years of experience, awards or certifications.

## Product Principles

1. **The person is the product.** Lucas's name and face lead; nothing should make the page read as a generic barbershop.
2. **One tap to the conversation.** Booking on WhatsApp outranks every other action on the page.
3. **Serve the client who already knows him as well as the one who doesn't.** Address, hours, and contact stay immediately reachable, not buried behind persuasion.
4. **Only say what is true.** No invented proof, prices, or claims; gaps stay gaps until Lucas supplies the facts.
