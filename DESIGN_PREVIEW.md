# Assigned page design preview

Branch: `design/assigned-pages-figma`, based on `main` at `cdd8eb0`.

PR #41 was closed without merging and its source branch was deleted. This preview
rebuilds the assigned pages against the current Figma sections:

| Route                        | Figma frame | Implemented                                                                                                                  |
| ---------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `/teaching-learning`         | `622:547`   | Hero, governance, curriculum tabs and explorer, faculty summary, four organization cards, alumni carousel, graduate outcomes |
| `/planning`                  | `663:1199`  | Hero, benchmarking, click-to-load video, priorities, core functions, process cards, photo strip, rankings and SDG tooltips   |
| `/teaching-learning/faculty` | `839:1452`  | Hero, profile count, activity strip, named portraits and accessible profile dialogs                                          |

Source: [DIT Accreditation Website](https://www.figma.com/design/Ma2UNXGCWnKC4yMu5yCEV7/DIT-Accreditation-Website?node-id=0-1).

The shared navbar and footer are reused. Downloaded Figma assets are local under
`static/design`, `static/teaching-learning/figma`,
`static/teaching-learning/faculty/figma` and `static/planning/figma`.
Domingo uses the supplied Cloudflare CDN original because the Figma card repeats
Comendador's photograph. Other portrait crops follow their Figma cards.

## Content still requiring confirmation

- Eight distinct faculty profiles are named in the updated portrait design.
  The remaining full-time cards and part-time section repeat prototype entries;
  they are not presented as verified people. The displayed count is the number
  of published profiles, not the department's total faculty headcount.
- Faculty subjects, certifications, research and roles need authoritative content.
  The old shared sample certifications and invented directory names were removed.
- Alumni names, jobs and graduate statistics remain the existing design samples;
  they need content approval before publication.
- Planning's narrative-report button is disabled and marked “Coming soon” until
  an approved document URL is supplied. No report URL was guessed.

## Local review

Run `npm run dev -- --host 127.0.0.1 --port 5173`, then visit the three routes above.
This iteration implements the design; the content confirmations above remain open.
