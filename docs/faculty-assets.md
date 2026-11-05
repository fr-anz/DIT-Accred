# DIT faculty assets and remaining content

Verified on 2026-11-05 for the Teaching & Learning update.

The approved source is the **DIT Faculty** subfolder of the supplied
[CCIS faculty folder](https://drive.google.com/drive/folders/11qbvIeTLsWlaa12qJvhQURSie-nc_HGW).
The [DIT Faculty subfolder](https://drive.google.com/drive/folders/1kxJ-S6cRYwv5Mj3zEpJCWO9QIQVIkF_Q)
contains 13 PNG portraits. The sibling DCS and CCIS PT folders are outside the
initial scope described by the team.

## CDN inventory

Account: Franzemmanuelbaes's Cloudflare account. Bucket: `dit-documents`.
Public domain: `https://cdn.theavenir.dev`.

Original photos use this path prefix:

```text
https://cdn.theavenir.dev/images/teaching-learning/faculty/originals/
```

All 13 originals have been uploaded. Their public URLs returned HTTP 200, and
their content lengths and ETags matched the downloaded source files. Objects use
`image/png` with `Cache-Control: public, max-age=86400`.

| Source filename | CDN filename   | Drive file ID                     |
| --------------- | -------------- | --------------------------------- |
| Aguila.png      | aguila.png     | 1jaVs45P_6Y-ivac3fNdF60q0jhfe90u4 |
| Amata.png       | amata.png      | 1P7V9cwmUuaAKneBnEh4Y-Fz2mXstU2jY |
| Canlas R.png    | canlas-r.png   | 1o3_i4SUEIo27KcKQcmh8HORGe7DT2eid |
| Comendador.png  | comendador.png | 1lQwrttduC0IKpf0pffUc0BiDVZsCyPId |
| Domingo.png     | domingo.png    | 1hiyjkxf_rVTFZyl6Pw2lXWW39LfDJCGE |
| Espineli.png    | espineli.png   | 1noZ_4g-YgOFB693ltMi8xXeJmYkCaMvK |
| Mayor.png       | mayor.png      | 1L6hEfd8FznevfTe0_j4olw46AjV4qxPT |
| Miclat.png      | miclat.png     | 13C9CEARwjEb0qn_4YkpA6RL4h3b8jlYR |
| Munsayac.png    | munsayac.png   | 1tJ0MCClYy6UsdYgNZiin0hkHPAdanWWX |
| Nayre.png       | nayre.png      | 13lCwHnbV4FhyhECjNloSd5gMzB8i7ch3 |
| Reyes.png       | reyes.png      | 1KUS8repLPVe7HwIYCa9OU-asWGIogu-i |
| Sagum J.png     | sagum-j.png    | 1gCr3vQTIF2uQ5AV3Jiio_u7bKi1V5JMR |
| Santos.png      | santos.png     | 1g8QogDalR1rdEpIPV6ck1gq-uld8agMY |

Every original is 2667 by 4000 pixels. Together they occupy approximately 118 MB.
Keep these as source-quality originals and prepare smaller delivery images before
connecting them to directory cards. The binary files belong in R2 rather than Git.

The filenames establish photo labels only. They do not establish full names,
full-time or part-time status, specializations, subjects, certifications, research
titles, publications, or institutional roles. Verify those details against the
official faculty roster before replacing the sample directory records.

## Design source

[DIT Accreditation Website in Figma](https://www.figma.com/design/Ma2UNXGCWnKC4yMu5yCEV7/DIT-Accreditation-Website)

| Page                         | Figma node |
| ---------------------------- | ---------- |
| Teaching & Learning          | `622:547`  |
| Faculty directory            | `839:1452` |
| Planning & Quality Assurance | `663:1199` |

The current token cleanup follows the canonical values already documented in
`DESIGN_SYSTEM.md` and defined in `src/routes/layout.css`. A live Figma comparison
remains pending because this conversation does not expose the Figma MCP tools.

## Narrative reports and remaining content

The supplied Drive folder contains faculty photos. The initial R2 inventory
contained only `videos/`, `videos/dji.MP4`, and `videos/home.mov`; it contained no
narrative reports. No verified Community or Planning & Quality Assurance report
URL is available yet.

Once the reports are supplied, add the Community narrative-report button and the
Planning narrative-report button below Core Functions using the verified links.
An absent report should not be replaced with a guessed URL or unrelated page.

Additional content still needs an authoritative source: the faculty roster and
profile details, notable alumni list, research/publication links, and the intended
destination of Learn More About DIT. The team notes do not establish that the
research repository should be removed.

Official sources worth cross-checking against the roster include the
[PUP eMabini training course staff list](https://emabini.pup.edu.ph/course/index.php?categoryid=2354)
and [PUP institutional contact information](https://www.pup.edu.ph/about/contactinformation).
Course-specialist listings are leads for matching names; they do not establish
current teaching assignments or the identity of a specific portrait.
