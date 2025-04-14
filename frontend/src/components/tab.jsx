import styles from "./tab.module.css";

const spacing = 4;
const maxLineWidth = 60;

export function Tab({ tabJson = [] }) {
  const generateTabs = (tabJson) => {
    const lines = {
      G: [],
      D: [],
      A: [],
      E: [],
    };

    for (const note of tabJson) {
      const fret = String(note.fret);
      const pad = "-".repeat(spacing - fret.length);

      for (const string of ["G", "D", "A", "E"]) {
        if (string === note.string) {
          lines[string].push(fret + pad);
        } else {
          lines[string].push("-".repeat(spacing));
        }
      }
    }

    // Chunking tab lines into wrapped segments
    const wrapped = [];
    const totalSteps = lines.G.length;
    for (let i = 0; i < totalSteps; i += maxLineWidth / spacing) {
      const chunk = Object.entries(lines).map(([string, segments]) => {
        const segmentSlice = segments.slice(i, i + maxLineWidth / spacing).join("");
        return `${string}|${segmentSlice}`;
      });
      wrapped.push(chunk.join("\n"));
    }

    return wrapped.join("\n\n"); // separate wrapped chunks with spacing
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Tablature</h3>
      <div className={styles.tabContainer}>
        <pre className={styles.tabContent}>
          {tabJson.length > 0 ? generateTabs(tabJson) : "No tabs to show."}
        </pre>
      </div>
    </div>
  );
}
