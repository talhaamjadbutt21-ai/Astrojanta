/**
 * Topic clusters for internal linking. Each cluster lists blog slugs; the first slug is the
 * cluster's pillar (hub) page. Used by:
 * - the blog post "Related guides" block (pillar shows its whole cluster; other posts show the
 *   pillar plus their ring neighbours, so every post gets links regardless of publish date), and
 * - the tool pages and homepage guide lists.
 * When you add a post, append its slug to the cluster(s) it belongs to.
 */
import { getPost, POSTS, type Post } from "./blog";

export type Cluster = { id: string; label: string; slugs: string[] };

export const CLUSTERS: Cluster[] = [
  {
    id: "gun-milan",
    label: "Kundli milan aur gun milan guides",
    slugs: [
      "kundli-milan-online-free",
      "kitne-gun-milne-chahiye",
      "nadi-dosha",
      "bhakoot-dosha",
      "gana-dosha",
      "graha-maitri",
      "yoni-koota",
      "varna-koota-meaning",
      "manglik-dosha-meaning",
      "naam-se-gun-milan",
      "janmakshar-matching",
    ],
  },
  {
    id: "2027",
    label: "2027 rashifal, muhurat aur grahan",
    slugs: [
      "saal-2027-kaisa-rahega",
      "rashifal-2027",
      "vivah-muhurat-2027",
      "griha-pravesh-muhurat-2027",
      "mundan-muhurat-2027",
      "grahan-2027",
      "sade-sati-2027",
    ],
  },
  {
    id: "rashi-shani",
    label: "Rashi, Shani aur gochar",
    slugs: [
      "rashi-kaise-pata-kare",
      "shani-sade-sati-2026",
      "sade-sati-2027",
      "rashifal-2027",
      "mercury-retrograde-2026",
      "janmakshar-matching",
    ],
  },
  {
    id: "kundli",
    label: "Kundli padhna, dasha aur dosh",
    slugs: [
      "free-ai-kundli-online",
      "ai-kundli-reader",
      "vimshottari-mahadasha",
      "kaal-sarp-dosh",
      "manglik-dosha-meaning",
      "ai-astrologer-free-hindi",
      "ask-astrologer-free",
    ],
  },
];

const RELATED_COUNT = 6;

/** Resolve slugs to posts, silently skipping unknown slugs. */
export function postsFor(slugs: string[]): Post[] {
  return slugs.map((s) => getPost(s)).filter((p): p is Post => Boolean(p));
}

export function clusterById(id: string): Cluster | undefined {
  return CLUSTERS.find((c) => c.id === id);
}

/**
 * Related posts for a blog post.
 * - A cluster pillar links to every other post in its cluster (it is the hub).
 * - Any other post links to its cluster pillar(s) first, then the next posts after it in each
 *   cluster (wrapping round), so links are spread evenly instead of always pointing at the newest.
 * - Falls back to the newest posts if the post is in no cluster.
 */
export function relatedPosts(slug: string): Post[] {
  const mine = CLUSTERS.filter((c) => c.slugs.includes(slug));
  const picked: string[] = [];
  const add = (s: string) => {
    if (s !== slug && !picked.includes(s) && getPost(s)) picked.push(s);
  };

  const pillarOf = mine.filter((c) => c.slugs[0] === slug);
  if (pillarOf.length > 0) {
    for (const c of pillarOf) for (const s of c.slugs) add(s);
    for (const c of mine) add(c.slugs[0]);
    return postsFor(picked);
  }

  for (const c of mine) add(c.slugs[0]);
  // Ring neighbours, interleaved across clusters.
  const rings = mine.map((c) => {
    const i = c.slugs.indexOf(slug);
    return [...c.slugs.slice(i + 1), ...c.slugs.slice(0, i)].filter((s) => s !== c.slugs[0]);
  });
  for (let step = 0; picked.length < RELATED_COUNT && rings.some((r) => step < r.length); step++) {
    for (const r of rings) if (step < r.length && picked.length < RELATED_COUNT) add(r[step]);
  }

  if (picked.length < RELATED_COUNT) {
    const newest = [...POSTS].sort((a, b) => b.published.localeCompare(a.published));
    for (const p of newest) if (picked.length < RELATED_COUNT) add(p.slug);
  }
  return postsFor(picked);
}
